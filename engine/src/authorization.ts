import { DB, atomic } from './db';
import { BlockReason, block, BlockError } from './blockReasons';
import { AuthStatus, assertTransition, isExpired } from './stateMachine';
import { assertRunoutValid } from './runout';
import { AuthorityClass, Unit, toCanonical, isAuthorityClassEligible } from './units';
import { appendLedger } from './ledger';

interface FieldRow { value: number; unit: Unit; authority_class: AuthorityClass; }

function getField(db: DB, fieldId: string | null): FieldRow | null {
  if (!fieldId) return null;
  const r = db.prepare('SELECT value, unit, authority_class FROM TypedNumericField WHERE typed_numeric_field_id = ?')
    .get(fieldId) as any;
  return r ? { value: r.value, unit: r.unit, authority_class: r.authority_class } : null;
}

function canonical(f: FieldRow): number {
  return toCanonical(f.value, f.unit);
}

function getTca(db: DB, id: string): any {
  const r = db.prepare('SELECT * FROM TestCellAuthorization WHERE test_cell_authorization_id = ?').get(id);
  block(!!r, BlockReason.ORPHANED_REFERENCE, `TestCellAuthorization ${id} not found`);
  return r;
}

/**
 * RC-412 + RC-267/300: every boundary used to reach AUTHORIZED/ACTIVE must carry an
 * eligible authority class. INITIAL_TARGET_PROFILE has no movement authority.
 */
export function assertAuthorityClassEligible(db: DB, tcaId: string): void {
  const tca = getTca(db, tcaId);
  const fieldIds = [
    tca.maximum_speed_field_id, tca.maximum_positive_torque_field_id, tca.maximum_negative_torque_field_id,
    tca.maximum_torque_rate_field_id, tca.maximum_jerk_field_id, tca.maximum_test_distance_field_id,
  ];
  for (const fid of fieldIds) {
    const f = getField(db, fid);
    if (!f) continue;
    block(f.authority_class !== 'INITIAL_TARGET_PROFILE',
      BlockReason.INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY, `field ${fid}`);
    block(isAuthorityClassEligible(f.authority_class),
      BlockReason.INELIGIBLE_AUTHORITY_CLASS, `field ${fid}: ${f.authority_class}`);
  }
}

/** RC-369/398/412/384: hard numeric + geometry constraints on a TestCellAuthorization. */
export function assertTestCellConstraints(db: DB, tcaId: string): void {
  const tca = getTca(db, tcaId);
  const speed = getField(db, tca.maximum_speed_field_id);
  if (speed) block(canonical(speed) > 0, BlockReason.TEST_DISTANCE_NON_POSITIVE, 'maximum_speed must be > 0');
  const posT = getField(db, tca.maximum_positive_torque_field_id);
  if (posT) block(canonical(posT) >= 0, BlockReason.INELIGIBLE_AUTHORITY_CLASS, 'maximum_positive_torque must be >= 0');
  const negT = getField(db, tca.maximum_negative_torque_field_id);
  if (negT) block(canonical(negT) <= 0, BlockReason.INELIGIBLE_AUTHORITY_CLASS, 'maximum_negative_torque must be <= 0');
  const dist = getField(db, tca.maximum_test_distance_field_id);
  if (dist) {
    const d = canonical(dist);
    block(d > 0, BlockReason.TEST_DISTANCE_NON_POSITIVE, 'maximum_test_distance must be > 0');
    if (tca.authorized_track_distance != null)
      block(d <= tca.authorized_track_distance, BlockReason.TEST_DISTANCE_EXCEEDS_TRACK, 'exceeds authorized_track_distance');
    if (tca.available_track_length != null)
      block(d <= tca.available_track_length, BlockReason.TEST_DISTANCE_EXCEEDS_TRACK, 'exceeds available_track_length');
  }
  if (tca.activation_timestamp && tca.authorization_expiry)
    block(new Date(tca.authorization_expiry).getTime() > new Date(tca.activation_timestamp).getTime(),
      BlockReason.AUTHORIZATION_EXPIRED, 'authorization_expiry must be after activation_timestamp');

  // RC-384: steering band min <= max (canonical rad)
  if (tca.allowed_steering_band_id) {
    const band = db.prepare('SELECT * FROM AllowedSteeringBand WHERE allowed_steering_band_id = ?')
      .get(tca.allowed_steering_band_id) as any;
    if (band) {
      const min = getField(db, band.minimum_angle_field_id);
      const max = getField(db, band.maximum_angle_field_id);
      if (min && max) block(canonical(min) <= canonical(max), BlockReason.STEERING_BAND_INVALID, 'min > max');
    }
  }
}

/** RC-409/421: cross-record ConfigurationPacket + vehicle/build/platform equality. */
export function assertConfigEquality(db: DB, tcaId: string): void {
  const tca = getTca(db, tcaId);
  const cfg = db.prepare('SELECT * FROM ConfigurationPacket WHERE configuration_packet_id = ?')
    .get(tca.configuration_packet_id) as any;
  block(!!cfg, BlockReason.ORPHANED_REFERENCE, 'ConfigurationPacket not found');
  block(cfg.individual_vehicle_id === tca.individual_vehicle_id, BlockReason.VEHICLE_IDENTITY_MISMATCH, 'individual_vehicle_id');
  block(cfg.vehicle_build_id === tca.vehicle_build_id, BlockReason.VEHICLE_IDENTITY_MISMATCH, 'vehicle_build_id');
  block(cfg.platform_configuration_id === tca.platform_configuration_id, BlockReason.VEHICLE_IDENTITY_MISMATCH, 'platform_configuration_id');

  if (tca.runout_calculations_id) {
    const rc = db.prepare('SELECT configuration_packet_id FROM RunoutCalculations WHERE runout_calculations_id = ?')
      .get(tca.runout_calculations_id) as any;
    block(!!rc && rc.configuration_packet_id === tca.configuration_packet_id,
      BlockReason.CONFIGURATION_PACKET_MISMATCH, 'RunoutCalculations config != TCA config');
  }
  if (tca.runout_aggregation_result_id) {
    const rar = db.prepare('SELECT configuration_packet_id FROM RunoutAggregationResult WHERE runout_aggregation_result_id = ?')
      .get(tca.runout_aggregation_result_id) as any;
    block(!!rar && rar.configuration_packet_id === tca.configuration_packet_id,
      BlockReason.CONFIGURATION_PACKET_MISMATCH, 'RunoutAggregationResult config != TCA config');
  }
}

/** Record an immutable transition event (RC-370) and update the TCA status. */
function applyTransition(db: DB, tcaId: string, from: AuthStatus, to: AuthStatus, actor: string, reason: string): void {
  // FINDING M1 (atomicity): the transition event, the status update and the
  // evidence-ledger append are one indivisible unit. If any statement (or a
  // trigger it fires) throws, the whole set rolls back — no orphaned
  // AuthorizationTransition row, no ledger entry for a status that never landed.
  atomic(db, () => {
    const tid = `AT_${tcaId}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    db.prepare(
      `INSERT INTO AuthorizationTransition
        (authorization_transition_id, test_cell_authorization_id, from_status, to_status, transition_reason, actor_identity, timestamp)
       VALUES (?,?,?,?,?,?,?)`,
    ).run(tid, tcaId, from, to, reason, actor, new Date().toISOString());
    db.prepare('UPDATE TestCellAuthorization SET status = ? WHERE test_cell_authorization_id = ?').run(to, tcaId);
    // FINDING A12: chain the transition event into the verifiable evidence ledger.
    appendLedger(db, 'AuthorizationTransition', tid, { tcaId, from, to, reason, actor }, actor);
  });
}

/** RC-386: at most one ACTIVE TestCellAuthorization per vehicle/subgate/session. */
export function assertSingleActive(db: DB, tcaId: string): void {
  const tca = getTca(db, tcaId);
  const activeCount = db.prepare(
    `SELECT COUNT(*) c FROM TestCellAuthorization
      WHERE status = 'ACTIVE' AND individual_vehicle_id = ? AND subgate_id = ?
        AND ((test_session_id IS NULL AND ? IS NULL) OR test_session_id = ?)
        AND test_cell_authorization_id != ?`,
  ).get(tca.individual_vehicle_id, tca.subgate_id, tca.test_session_id, tca.test_session_id, tcaId) as any;
  block(activeCount.c === 0, BlockReason.MULTIPLE_ACTIVE_TEST_CELLS,
    `${activeCount.c} other ACTIVE cell(s) for this vehicle/subgate/session`);
}

/** Generic guarded transition (records the event). */
export function transition(db: DB, tcaId: string, to: AuthStatus, actor: string, reason = '', ctx = {}): void {
  const tca = getTca(db, tcaId);
  assertTransition(tca.status as AuthStatus, to, ctx);
  applyTransition(db, tcaId, tca.status as AuthStatus, to, actor, reason);
}

/**
 * RC-386: AUTHORIZED → ACTIVE with ALL preconditions + single-ACTIVE per
 * vehicle/subgate/session. Also enforces config equality, authority-class
 * eligibility, numeric constraints, and runout SIGNED_RELEASE.
 */
export function activate(db: DB, tcaId: string, actor: string, now: Date = new Date()): void {
  const tca = getTca(db, tcaId);
  block(tca.status === 'AUTHORIZED', BlockReason.ILLEGAL_STATE_TRANSITION, `activate requires AUTHORIZED, got ${tca.status}`);
  block(!isExpired(tca.authorization_expiry, now), BlockReason.AUTHORIZATION_EXPIRED, 'expired before activation');

  assertConfigEquality(db, tcaId);
  assertAuthorityClassEligible(db, tcaId);
  assertTestCellConstraints(db, tcaId);

  // Runout must be SIGNED_RELEASE (RC-386/372).
  block(!!tca.runout_aggregation_result_id, BlockReason.RUNOUT_NOT_RELEASED, 'no RunoutAggregationResult linked');
  const rar = db.prepare('SELECT authorization_status FROM RunoutAggregationResult WHERE runout_aggregation_result_id = ?')
    .get(tca.runout_aggregation_result_id) as any;
  block(!!rar && rar.authorization_status === 'SIGNED_RELEASE', BlockReason.RUNOUT_NOT_RELEASED,
    `runout authorization_status=${rar?.authorization_status}`);
  assertRunoutValid(db, tca.runout_aggregation_result_id);

  block(tca.environmental_window_valid === 1, BlockReason.ENVIRONMENTAL_WINDOW_INVALID);
  block(tca.thermal_state_valid === 1, BlockReason.THERMAL_STATE_INVALID);
  block(tca.personnel_assigned === 1, BlockReason.PERSONNEL_NOT_ASSIGNED);
  block(tca.containment_ready === 1, BlockReason.CONTAINMENT_NOT_READY);

  // Procedure approval must exist and be APPROVED (RC-355/389).
  block(!!tca.procedure_approval_id, BlockReason.PROCEDURE_APPROVAL_MISSING, 'no ProcedureApproval linked');
  const pa = db.prepare('SELECT status FROM ProcedureApproval WHERE procedure_approval_id = ?')
    .get(tca.procedure_approval_id) as any;
  block(!!pa && pa.status === 'APPROVED', BlockReason.PROCEDURE_APPROVAL_MISSING, `ProcedureApproval status=${pa?.status}`);

  // Prior-cell SIGNED_PASS where required (RC-386).
  if (tca.requires_previous_signed_pass === 1) {
    block(!!tca.previous_cell_signed_result_id, BlockReason.PREVIOUS_CELL_SIGNED_PASS_REQUIRED, 'no previous result linked');
    const prev = db.prepare('SELECT result_status FROM TestResult WHERE test_result_id = ?')
      .get(tca.previous_cell_signed_result_id) as any;
    block(!!prev && prev.result_status === 'SIGNED_PASS', BlockReason.PREVIOUS_CELL_SIGNED_PASS_REQUIRED,
      `previous result_status=${prev?.result_status}`);
  }

  // Single ACTIVE per vehicle / subgate / session (RC-386).
  assertSingleActive(db, tcaId);

  assertTransition('AUTHORIZED', 'ACTIVE');
  // Activation writes (status transition + ledger append + activation timestamp)
  // commit or roll back together (FINDING M1). applyTransition() nests its own
  // SAVEPOINT inside this one.
  atomic(db, () => {
    applyTransition(db, tcaId, 'AUTHORIZED', 'ACTIVE', actor, 'activation preconditions satisfied');
    if (!tca.activation_timestamp)
      db.prepare('UPDATE TestCellAuthorization SET activation_timestamp = ? WHERE test_cell_authorization_id = ?')
        .run(now.toISOString(), tcaId);
  });
}

/**
 * RC-383 — the full PHYSICAL_MOVEMENT_BLOCKED gate. Throws the first applicable
 * BlockReason; returns cleanly only when movement is permitted.
 */
export function assertMovementAllowed(db: DB, tcaId: string, now: Date = new Date()): void {
  const tca = getTca(db, tcaId);
  block(tca.status === 'ACTIVE', BlockReason.ILLEGAL_STATE_TRANSITION, `TestCellAuthorization.status != ACTIVE (${tca.status})`);
  block(!isExpired(tca.authorization_expiry, now), BlockReason.AUTHORIZATION_EXPIRED);
  assertConfigEquality(db, tcaId);
  assertAuthorityClassEligible(db, tcaId);
  block(!!tca.runout_aggregation_result_id, BlockReason.RUNOUT_NOT_RELEASED, 'no RunoutAggregationResult');
  const rar = db.prepare('SELECT authorization_status FROM RunoutAggregationResult WHERE runout_aggregation_result_id = ?')
    .get(tca.runout_aggregation_result_id) as any;
  block(!!rar && rar.authorization_status === 'SIGNED_RELEASE', BlockReason.RUNOUT_NOT_RELEASED,
    `runout authorization_status=${rar?.authorization_status}`);
  assertRunoutValid(db, tca.runout_aggregation_result_id);
}

/** RC-424: automatic expiry sweep. Returns the ids affected. */
export function applyAutomaticExpiry(db: DB, now: Date = new Date()): { expired: string[]; suspended: string[] } {
  const rows = db.prepare(
    "SELECT test_cell_authorization_id, status, authorization_expiry FROM TestCellAuthorization WHERE status IN ('AUTHORIZED','SUSPENDED','ACTIVE')",
  ).all() as any[];
  const expired: string[] = [];
  const suspended: string[] = [];
  for (const r of rows) {
    if (!isExpired(r.authorization_expiry, now)) continue;
    if (r.status === 'AUTHORIZED' || r.status === 'SUSPENDED') {
      applyTransition(db, r.test_cell_authorization_id, r.status, 'EXPIRED', 'system:auto-expiry', 'authorization_expiry reached');
      expired.push(r.test_cell_authorization_id);
    } else if (r.status === 'ACTIVE') {
      // Default safe behaviour: ACTIVE -> SUSPENDED at a safe stopping boundary (RC-424).
      applyTransition(db, r.test_cell_authorization_id, 'ACTIVE', 'SUSPENDED', 'system:auto-expiry', 'expiry during ACTIVE — safe suspend');
      suspended.push(r.test_cell_authorization_id);
    }
  }
  return { expired, suspended };
}
