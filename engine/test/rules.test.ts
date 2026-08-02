import { test } from 'node:test';
import assert from 'node:assert/strict';

import { freshMemoryDb, atomic } from '../src/db';
import { appendLedger } from '../src/ledger';
import { BlockReason } from '../src/blockReasons';
import { buildAuthorizedChain, insertBase } from '../src/fixtures';
import {
  activate, assertConfigEquality, assertSingleActive, assertMovementAllowed, transition,
} from '../src/authorization';
import { aggregate, signRelease, lMinFromTerms, LMIN_TERMS } from '../src/runout';
import { assertTransition, isTransitionAllowed } from '../src/stateMachine';
import { assertGateCleared } from '../src/results';
import { applyConfigurationChange } from '../src/configLock';
import { assertFaultExecutionAuthorized, createPairedFaultAuthorization } from '../src/faults';
import { assertInstrumentationHealthy, evaluateSensorHealth } from '../src/instrumentation';
import { expectBlock, expectThrowsMessage } from './helpers';

// ── Canonical equation (RC-340) ──────────────────────────────────────────────
test('L_min equation sums the seven canonical terms (RC-340)', () => {
  assert.equal(LMIN_TERMS.length, 7);
  const v = lMinFromTerms({
    L_acceleration: 1, L_stabilization: 2, L_braking_target: 3, L_worst_case_coast_or_stop: 4,
    L_response_allowance: 5, L_measurement_uncertainty: 6, L_containment_margin: 7,
  });
  assert.equal(v, 28);
});

// ── POSITIVE: a fully valid chain activates and permits movement ─────────────
test('POSITIVE: valid chain reaches ACTIVE and movement is allowed', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  activate(db, ids.testCellAuthorizationId, 'test.lead');
  const row = db.prepare('SELECT status FROM TestCellAuthorization WHERE test_cell_authorization_id = ?')
    .get(ids.testCellAuthorizationId) as any;
  assert.equal(row.status, 'ACTIVE');
  assert.doesNotThrow(() => assertMovementAllowed(db, ids.testCellAuthorizationId));
  // an immutable AuthorizationTransition event was recorded (RC-370)
  const trans = db.prepare('SELECT COUNT(*) c FROM AuthorizationTransition WHERE test_cell_authorization_id = ?')
    .get(ids.testCellAuthorizationId) as any;
  assert.ok(trans.c >= 1);
});

// ── NEGATIVE 1: INITIAL_TARGET_PROFILE used for movement (RC-412/267) ─────────
test('NEG: INITIAL_TARGET_PROFILE boundary cannot authorize movement', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { authorityClass: 'INITIAL_TARGET_PROFILE' });
  expectBlock(() => activate(db, ids.testCellAuthorizationId, 'x'),
    BlockReason.INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY);
});

// ── NEGATIVE 2: insufficient track length (RC-383) ───────────────────────────
test('NEG: insufficient track length blocks signed release', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { signRunout: false, availableTrackLength: 20 }); // L_min = 30
  expectBlock(() => signRelease(db, ids.runoutAggregationResultId), BlockReason.INSUFFICIENT_TRACK_LENGTH);
});

// ── NEGATIVE 3: insufficient remaining margin (RC-372) ───────────────────────
test('NEG: insufficient remaining margin blocks signed release', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { signRunout: false, availableTrackLength: 31, approvedMinimumMargin: 5 });
  expectBlock(() => signRelease(db, ids.runoutAggregationResultId), BlockReason.INSUFFICIENT_REMAINING_MARGIN);
});

// ── NEGATIVE 4: missing runout component (RC-372) ────────────────────────────
test('NEG: aggregate with no components blocks', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_EMPTY', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  expectBlock(() => aggregate(db, {
    runoutCalculationsId: 'RC_EMPTY', configurationPacketId: base.configurationPacketId,
    testCellAuthorizationId: null, availableTrackLength: 100, approvedMinimumMargin: 5,
  }), BlockReason.MISSING_RUNOUT_COMPONENT);
});

// ── NEGATIVE 5: malformed geometry — now rejected at the SQL layer (review_73 pt 9)
test('NEG: distance component whose value != (end-start) is rejected by the DB CHECK', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_BAD', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  expectThrowsMessage(() => db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run('DC_BAD', 'RC_BAD', 0, 10, 999, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', 'ENGINEERING_APPROVED'),
    'CHECK constraint failed');
});

// ── review_73 pt 9: ARTIFACT_DEFINED requires proof_artifact_id (SQL CHECK) ───
test('NEG: ARTIFACT_DEFINED component without proof_artifact_id is rejected by the DB', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_PA', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  expectThrowsMessage(() => db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run('DC_PA', 'RC_PA', 0, 10, 10, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', 'ARTIFACT_DEFINED'),
    'CHECK constraint failed');
});

// ── review_73 pt 11: two separately-included components double-count the track ─
test('NEG: two INCLUDED_SEPARATELY components covering the same metre block (OVERLAP_CHECK_FAILED)', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_DUP', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  const mk = (id: string, s: number, e: number) => db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run(id, 'RC_DUP', s, e, e - s, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', 'ENGINEERING_APPROVED');
  mk('DC_A', 0, 10);
  mk('DC_B', 5, 15); // overlaps DC_A on [5,10]
  expectBlock(() => aggregate(db, {
    runoutCalculationsId: 'RC_DUP', configurationPacketId: base.configurationPacketId,
    testCellAuthorizationId: null, availableTrackLength: 100, approvedMinimumMargin: 5,
  }), BlockReason.OVERLAP_CHECK_FAILED);
});

// ── review_73 pt 10: required L_min term category missing ─────────────────────
test('NEG: aggregate blocks when a required L_min term category is absent', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { signRunout: false }); // has L_braking_target + L_worst_case_coast_or_stop
  expectBlock(() => aggregate(db, {
    runoutCalculationsId: ids.runoutCalculationsId, configurationPacketId: ids.configurationPacketId,
    testCellAuthorizationId: null, availableTrackLength: 100, approvedMinimumMargin: 5,
    requiredTypes: ['L_acceleration', 'L_braking_target'], // L_acceleration is missing
  }), BlockReason.REQUIRED_COMPONENT_INCOMPLETE);
});

// ── NEGATIVE 6: overlap host belongs to a different RunoutCalculations (RC-383)
//    (a dangling self-FK is already blocked at insert by foreign_keys=ON — this
//    exercises the service-layer check where the host EXISTS but is cross-runout.)
test('NEG: INCLUDED_IN_OTHER_COMPONENT whose host is in another runout blocks', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_HOST', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_OV', base.configurationPacketId, 'DRAFT', new Date().toISOString());
  db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run('DC_HOST', 'RC_HOST', 0, 10, 10, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', 'ENGINEERING_APPROVED');
  db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run('DC_OV', 'RC_OV', 0, 10, 10, 'ENGINEERING_APPROVED', 0.5, 0, 'DC_HOST', 'INCLUDED_IN_OTHER_COMPONENT', 'ENGINEERING_APPROVED');
  expectBlock(() => aggregate(db, {
    runoutCalculationsId: 'RC_OV', configurationPacketId: base.configurationPacketId,
    testCellAuthorizationId: null, availableTrackLength: 100, approvedMinimumMargin: 5,
  }), BlockReason.OVERLAP_HOST_INVALID);
});

// ── NEGATIVE 7: missing source (component authority not eligible) (RC-383) ───
test('NEG: MISSING_SOURCE required component blocks signed release', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { signRunout: false, componentAuthority: 'MISSING_SOURCE' });
  expectBlock(() => signRelease(db, ids.runoutAggregationResultId), BlockReason.REQUIRED_COMPONENT_INCOMPLETE);
});

// ── NEGATIVE 8: configuration packet mismatch (RC-409) ───────────────────────
test('NEG: runout under a different config triggers CONFIGURATION_PACKET_MISMATCH', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  const other = insertBase(db);
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run('RC_OTHER', other.configurationPacketId, 'DRAFT', new Date().toISOString());
  db.prepare('UPDATE TestCellAuthorization SET runout_calculations_id = ? WHERE test_cell_authorization_id = ?')
    .run('RC_OTHER', ids.testCellAuthorizationId);
  expectBlock(() => assertConfigEquality(db, ids.testCellAuthorizationId), BlockReason.CONFIGURATION_PACKET_MISMATCH);
});

// ── NEGATIVE 9: expired authorization (RC-388/424) ───────────────────────────
test('NEG: expired authorization cannot activate', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  db.prepare('UPDATE TestCellAuthorization SET authorization_expiry = ? WHERE test_cell_authorization_id = ?')
    .run(new Date(Date.now() - 1000).toISOString(), ids.testCellAuthorizationId);
  expectBlock(() => activate(db, ids.testCellAuthorizationId, 'x'), BlockReason.AUTHORIZATION_EXPIRED);
});

// ── NEGATIVE 10: unsigned procedure (RC-355/389) ─────────────────────────────
test('NEG: unsigned procedure blocks activation', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { procedureApproved: false });
  expectBlock(() => activate(db, ids.testCellAuthorizationId, 'x'), BlockReason.PROCEDURE_APPROVAL_MISSING);
});

// ── NEGATIVE 11: illegal state transition (RC-408) ───────────────────────────
test('NEG: illegal state transition rejected; ACTIVE->COMPLETED forbidden', () => {
  assert.equal(isTransitionAllowed('DRAFT', 'ACTIVE'), false);
  expectBlock(() => assertTransition('DRAFT', 'ACTIVE'), BlockReason.ILLEGAL_STATE_TRANSITION);
  expectBlock(() => assertTransition('ACTIVE', 'COMPLETED' as any),
    BlockReason.EXECUTION_COMPLETION_CANNOT_MUTATE_AUTHORIZATION);
});

// ── NEGATIVE 12: two active cells for the same vehicle/session (RC-386) ───────
test('NEG: a second ACTIVE cell on the same vehicle/subgate/session is blocked', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  activate(db, ids.testCellAuthorizationId, 'x'); // first cell ACTIVE
  // second AUTHORIZED cell sharing the same vehicle/subgate/session identity
  const b = buildAuthorizedChain(db);
  db.prepare(
    `UPDATE TestCellAuthorization SET individual_vehicle_id = ?, subgate_id = ?, test_session_id = ?
       WHERE test_cell_authorization_id = ?`,
  ).run(ids.individualVehicleId, '05M-C3A', ids.testSessionId, b.testCellAuthorizationId);
  expectBlock(() => assertSingleActive(db, b.testCellAuthorizationId), BlockReason.MULTIPLE_ACTIVE_TEST_CELLS);
});

// ── NEGATIVE 13: missing prior SIGNED_PASS (RC-386) ──────────────────────────
test('NEG: prior SIGNED_PASS required but absent blocks activation', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { requiresPreviousSignedPass: true });
  expectBlock(() => activate(db, ids.testCellAuthorizationId, 'x'), BlockReason.PREVIOUS_CELL_SIGNED_PASS_REQUIRED);
});

// ── NEGATIVE 14: invalid instrumentation health (RC-391/403) ─────────────────
test('NEG: unhealthy independent channel blocks (full RC-403 response)', () => {
  const db = freshMemoryDb();
  db.prepare(
    `INSERT INTO InstrumentationRecord(instrumentation_record_id, current_probe_calibration_status, current_probe_range_valid,
      dc_bus_sensor_status, dc_bus_sensor_range_valid, motor_speed_sensor_status, wheel_speed_sensor_status,
      time_sync_status, dropped_frame_count, saturation_detected, clipping_detected, sensor_fault_detected, result_status)
     VALUES (?, 'VALID','PASS','VALID','PASS','VALID','VALID','UNSYNCHRONIZED', 3, 1, 0, 0, 'INVALID')`,
  ).run('IR_BAD');
  expectBlock(() => assertInstrumentationHealthy(db, 'IR_BAD'), BlockReason.INSTRUMENTATION_HEALTH_INVALID);
  assert.equal(evaluateSensorHealth({
    current_probe_calibration_status: 'VALID', current_probe_range_valid: 'PASS', dc_bus_sensor_status: 'VALID',
    dc_bus_sensor_range_valid: 'PASS', motor_speed_sensor_status: 'VALID', wheel_speed_sensor_status: 'VALID',
    time_sync_status: 'SYNCHRONIZED', saturation_detected: 0, clipping_detected: 0, sensor_fault_detected: 0,
    result_status: 'VALID',
  }), 'VALID');
});

// ── NEGATIVE 15: attempt to update/delete signed evidence (RC-374/410/422) ───
test('NEG: signed evidence is append-only (triggers block UPDATE/DELETE)', () => {
  const db = freshMemoryDb();
  db.prepare('INSERT INTO SignoffRecord(signoff_record_id, signer_identity, signature_hash, timestamp) VALUES (?,?,?,?)')
    .run('SO1', 'eng', 'hash', new Date().toISOString());
  expectThrowsMessage(() => db.prepare("UPDATE SignoffRecord SET signer_identity = 'x' WHERE signoff_record_id = 'SO1'").run(), 'APPEND_ONLY_VIOLATION');
  expectThrowsMessage(() => db.prepare("DELETE FROM SignoffRecord WHERE signoff_record_id = 'SO1'").run(), 'APPEND_ONLY_VIOLATION');
});

test('NEG: a signed TestResult row is immutable; corrections append', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  db.prepare('INSERT INTO TestSession(test_session_id, configuration_packet_id, individual_vehicle_id, status) VALUES (?,?,?,?)')
    .run('TS_X', ids.configurationPacketId, ids.individualVehicleId, 'OPEN');
  db.prepare(
    `INSERT INTO TestExecution(test_execution_id, test_cell_authorization_id, configuration_packet_id, test_session_id, attempt_number, execution_status)
     VALUES (?,?,?,?,?,?)`,
  ).run('TE1', ids.testCellAuthorizationId, ids.configurationPacketId, 'TS_X', 1, 'EXECUTED');
  db.prepare(
    `INSERT INTO TestResult(test_result_id, test_execution_id, attempt_number, configuration_packet_id, test_cell_authorization_id, result_status)
     VALUES (?,?,?,?,?,?)`,
  ).run('TR1', 'TE1', 1, ids.configurationPacketId, ids.testCellAuthorizationId, 'SIGNED_PASS');
  expectThrowsMessage(() => db.prepare("UPDATE TestResult SET result_status = 'SIGNED_FAIL' WHERE test_result_id = 'TR1'").run(), 'APPEND_ONLY_VIOLATION');
  expectThrowsMessage(() => db.prepare("DELETE FROM TestResult WHERE test_result_id = 'TR1'").run(), 'APPEND_ONLY_VIOLATION');
});

// ── NEGATIVE 16: fault executed outside its authorized domain (RC-380) ───────
test('NEG: fault executed outside its authorized domain is blocked', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  db.prepare("INSERT INTO HazardAnalysis(hazard_analysis_id, status) VALUES ('HA1','APPROVED')").run();
  db.prepare("INSERT INTO FaultDefinition(fault_id, fault_code, fault_name, status) VALUES ('F1','APPS_PLAUS','APPS plausibility','ACTIVE')").run();
  db.prepare(
    `INSERT INTO FaultExecutionAuthorization(fault_execution_authorization_id, fault_id, execution_domain, hazard_analysis_id,
      configuration_packet_id, test_cell_authorization_id, procedure_approval_status, status)
     VALUES (?,?,?,?,?,?,?,?)`,
  ).run('FEA1', 'F1', 'HIL_ONLY', 'HA1', ids.configurationPacketId, ids.testCellAuthorizationId, 'APPROVED', 'AUTHORIZED');
  expectBlock(() => assertFaultExecutionAuthorized(db, 'FEA1', 'LOWEST_MOVING_CELL_ALLOWED'),
    BlockReason.FAULT_EXECUTED_OUTSIDE_AUTHORIZED_DOMAIN);
  assert.doesNotThrow(() => assertFaultExecutionAuthorized(db, 'FEA1', 'HIL_ONLY'));
});

// ── NEGATIVE 17: paired fault without HazardAnalysis_ID (RC-363) ─────────────
test('NEG: paired fault without HazardAnalysis_ID is blocked', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  expectBlock(() => createPairedFaultAuthorization(db, {
    pairedFaultAuthorizationId: 'PFA1', hazardAnalysisId: null, allowedExecutionDomain: 'HIL_ONLY',
    activeTestCellId: ids.testCellAuthorizationId, fault1Id: 'F1', fault1ComponentId: null,
    fault2Id: 'F2', fault2ComponentId: null, targetInjectionOrder: 'FAULT_1_THEN_FAULT_2',
  }), BlockReason.PAIRED_FAULT_HAZARD_ANALYSIS_MISSING);
});

// ── NEGATIVE 18: changed firmware hash after authorization (RC-425) ──────────
test('NEG: configuration change suspends authorizations + revokes runout (RC-425)', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  activate(db, ids.testCellAuthorizationId, 'x');
  assert.doesNotThrow(() => assertMovementAllowed(db, ids.testCellAuthorizationId));

  const res = applyConfigurationChange(db, ids.configurationPacketId, 'inverter firmware hash changed');
  assert.ok(res.suspendedAuthorizations.includes(ids.testCellAuthorizationId));
  assert.ok(res.revokedRunout.includes(ids.runoutAggregationResultId));

  const tca = db.prepare('SELECT status FROM TestCellAuthorization WHERE test_cell_authorization_id = ?')
    .get(ids.testCellAuthorizationId) as any;
  assert.equal(tca.status, 'SUSPENDED');
  // movement is now blocked (cell no longer ACTIVE)
  expectBlock(() => assertMovementAllowed(db, ids.testCellAuthorizationId), BlockReason.ILLEGAL_STATE_TRANSITION);
});

// ── Gate clearance (RC-371) ──────────────────────────────────────────────────
test('RC-371: only SIGNED_PASS clears a gate; COMPLETED/EXECUTED does not', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  db.prepare('INSERT INTO TestSession(test_session_id, configuration_packet_id, individual_vehicle_id, status) VALUES (?,?,?,?)')
    .run('TS_G', ids.configurationPacketId, ids.individualVehicleId, 'OPEN');
  db.prepare(
    `INSERT INTO TestExecution(test_execution_id, test_cell_authorization_id, configuration_packet_id, test_session_id, attempt_number, execution_status)
     VALUES (?,?,?,?,?,?)`,
  ).run('TE_G', ids.testCellAuthorizationId, ids.configurationPacketId, 'TS_G', 1, 'COMPLETED');
  db.prepare(
    `INSERT INTO TestResult(test_result_id, test_execution_id, attempt_number, configuration_packet_id, test_cell_authorization_id, result_status)
     VALUES (?,?,?,?,?,?)`,
  ).run('TR_G', 'TE_G', 1, ids.configurationPacketId, ids.testCellAuthorizationId, 'NEEDS_REVIEW');
  expectBlock(() => assertGateCleared(db, 'TR_G'), BlockReason.RESULT_NOT_SIGNED_PASS);
});

// ── Junction composite key blocks duplicate membership (RC-417) ──────────────
test('RC-417: duplicate junction membership is rejected by the composite key', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  db.prepare("INSERT INTO FaultDefinition(fault_id, fault_code, fault_name, status) VALUES ('FD1','C','n','ACTIVE')").run();
  db.prepare('INSERT INTO TestCellAllowedFault(test_cell_authorization_id, fault_id) VALUES (?,?)')
    .run(ids.testCellAuthorizationId, 'FD1');
  expectThrowsMessage(() => db.prepare('INSERT INTO TestCellAllowedFault(test_cell_authorization_id, fault_id) VALUES (?,?)')
    .run(ids.testCellAuthorizationId, 'FD1'), 'UNIQUE');
});

// ── Foreign key enforcement ──────────────────────────────────────────────────
test('foreign keys are enforced (invalid FK rejected)', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  expectThrowsMessage(() => db.prepare(
    'INSERT INTO VehicleBuild(vehicle_build_id, individual_vehicle_id, platform_configuration_id) VALUES (?,?,?)',
  ).run('VB_X', 'IV_NONEXISTENT', base.platformConfigId), 'FOREIGN KEY');
});

// ── review_73 pt 7: previous_cell_signed_result_id FK enforced (forward ref) ──
test('review_73 pt 7: TestCellAuthorization.previous_cell_signed_result_id FK is enforced', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  expectThrowsMessage(() => db.prepare(
    `INSERT INTO TestCellAuthorization(test_cell_authorization_id, subgate_id, cell_number, configuration_packet_id,
      individual_vehicle_id, vehicle_build_id, platform_configuration_id, previous_cell_signed_result_id, status)
     VALUES (?,?,?,?,?,?,?,?,?)`,
  ).run('TCA_FK', '05M-C3A', 1, base.configurationPacketId, base.individualVehicleId, base.vehicleBuildId,
    base.platformConfigId, 'TR_NONEXISTENT', 'DRAFT'), 'FOREIGN KEY');
});

// ── directive_04 hardening: a post-authoring state cannot be INSERTed directly ─
test('HARDENING: a ready-made ACTIVE cell cannot be inserted directly (must transition)', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  expectThrowsMessage(() => db.prepare(
    `INSERT INTO TestCellAuthorization(test_cell_authorization_id, subgate_id, cell_number, configuration_packet_id,
      individual_vehicle_id, vehicle_build_id, platform_configuration_id, test_session_id, status)
     VALUES (?,?,?,?,?,?,?,?,'ACTIVE')`,
  ).run('TCA_ACT', '05M-C3A', 1, base.configurationPacketId, base.individualVehicleId, base.vehicleBuildId,
    base.platformConfigId, 'TS'), 'ILLEGAL_INITIAL_STATUS');
});

// ── directive_04 hardening: activation preconditions enforced at the DB ───────
test('HARDENING A1: AUTHORIZED->ACTIVE with an unreleased runout is blocked by the DB', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db, { signRunout: false }); // runout DRAFT, cell AUTHORIZED
  expectThrowsMessage(() => db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id=?")
    .run(ids.testCellAuthorizationId), 'ACTIVATION_PRECONDITIONS_NOT_MET');
});

// ── directive_04 hardening: DB single-active via the UPDATE path ──────────────
test('HARDENING A6: DB blocks a second cell transitioning to ACTIVE on the same vehicle/subgate/session', () => {
  const db = freshMemoryDb();
  const a = buildAuthorizedChain(db);
  activate(db, a.testCellAuthorizationId, 'x'); // first cell ACTIVE
  const b = buildAuthorizedChain(db);
  // give b the same vehicle/subgate/session identity as a (b keeps its own runout+procedure)
  db.prepare('UPDATE TestCellAuthorization SET individual_vehicle_id=?, subgate_id=?, test_session_id=? WHERE test_cell_authorization_id=?')
    .run(a.individualVehicleId, '05M-C3A', a.testSessionId, b.testCellAuthorizationId);
  db.prepare('UPDATE TestCellAuthorization SET test_session_id=? WHERE test_cell_authorization_id=?').run(a.testSessionId, a.testCellAuthorizationId);
  expectThrowsMessage(() => db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id=?")
    .run(b.testCellAuthorizationId), 'MULTIPLE_ACTIVE_TEST_CELLS');
});

// ── directive_04 hardening: DB-level enforcement (migration 003) ─────────────
test('HARDENING A1: a direct SQL DRAFT->ACTIVE jump is rejected by the DB state-machine trigger', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare(`INSERT INTO TestCellAuthorization(test_cell_authorization_id,subgate_id,cell_number,configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,status) VALUES (?,?,?,?,?,?,?,?)`)
    .run('TCA_D','05M-C3A',1,base.configurationPacketId,base.individualVehicleId,base.vehicleBuildId,base.platformConfigId,'DRAFT');
  expectThrowsMessage(() => db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id='TCA_D'").run(), 'ILLEGAL_STATE_TRANSITION');
});

test('HARDENING A2: a SUPERSEDED cell (reached via legal transitions) cannot be resurrected to ACTIVE', () => {
  const db = freshMemoryDb();
  const base = insertBase(db);
  db.prepare(`INSERT INTO TestCellAuthorization(test_cell_authorization_id,subgate_id,cell_number,configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,status) VALUES (?,?,?,?,?,?,?,'AUTHORIZED')`)
    .run('TCA_R','05M-C3A',1,base.configurationPacketId,base.individualVehicleId,base.vehicleBuildId,base.platformConfigId);
  db.prepare("UPDATE TestCellAuthorization SET status='REVOKED' WHERE test_cell_authorization_id='TCA_R'").run();     // AUTHORIZED -> REVOKED (legal)
  db.prepare("UPDATE TestCellAuthorization SET status='SUPERSEDED' WHERE test_cell_authorization_id='TCA_R'").run();  // REVOKED -> SUPERSEDED (legal)
  expectThrowsMessage(() => db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id='TCA_R'").run(), 'ILLEGAL_STATE_TRANSITION');
});

test('HARDENING A4: a REVOKED_PENDING_RECALCULATION runout cannot be resurrected to SIGNED_RELEASE', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  activate(db, ids.testCellAuthorizationId, 'x');
  applyConfigurationChange(db, ids.configurationPacketId, 'firmware changed');
  expectThrowsMessage(() => db.prepare("UPDATE RunoutAggregationResult SET authorization_status='SIGNED_RELEASE' WHERE runout_aggregation_result_id=?").run(ids.runoutAggregationResultId), 'RUNOUT_RELEASE_RESURRECTION_FORBIDDEN');
});

test('HARDENING: a direct NULL-session ACTIVE insert is forbidden', () => {
  const db = freshMemoryDb();
  const b = insertBase(db);
  expectThrowsMessage(() => db.prepare(`INSERT INTO TestCellAuthorization(test_cell_authorization_id,subgate_id,cell_number,configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,test_session_id,status) VALUES (?,?,?,?,?,?,?,NULL,'ACTIVE')`)
    .run('N1','05M-C3A',1,b.configurationPacketId,b.individualVehicleId,b.vehicleBuildId,b.platformConfigId), 'ILLEGAL_INITIAL_STATUS');
});

test('HARDENING A8: VIN maps to at most one IndividualVehicle', () => {
  const db = freshMemoryDb();
  db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)').run('IVa','VIN-X','P');
  expectThrowsMessage(() => db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)').run('IVb','VIN-X','P'), 'UNIQUE');
});

test('HARDENING A12: evidence hash chain verifies and detects tampering', async () => {
  const { verifyLedgerChain } = await import('../src/ledger');
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  activate(db, ids.testCellAuthorizationId, 'x'); // appends a ledger row
  const good = verifyLedgerChain(db);
  assert.equal(good.ok, true);
  assert.ok(good.length >= 1);
  // forge a row with a wrong prev_hash (INSERT is allowed; the chain must detect it)
  db.prepare(`INSERT INTO EvidenceLedger(record_type,record_id,content_hash,prev_hash,record_hash,signer_identity,created_at) VALUES ('X','forged','h','WRONG_PREV','rh','attacker',?)`).run(new Date().toISOString());
  const bad = verifyLedgerChain(db);
  assert.equal(bad.ok, false);
});

// ── review_73 pt 17: the frozen runout snapshot is append-only ───────────────
test('review_73 pt 17: RunoutAggregationComponent snapshot cannot be deleted', () => {
  const db = freshMemoryDb();
  buildAuthorizedChain(db); // aggregate() froze a snapshot
  const row = db.prepare('SELECT distance_component_id FROM RunoutAggregationComponent LIMIT 1').get() as any;
  expectThrowsMessage(() => db.prepare('DELETE FROM RunoutAggregationComponent WHERE distance_component_id = ?').run(row.distance_component_id), 'APPEND_ONLY_VIOLATION');
});

// ── FINDING M1 (atomicity): transition + status + ledger are one unit ─────────
test('M1 atomicity: a failure mid-unit leaves no orphan transition or ledger row (SAVEPOINT rollback)', () => {
  const db = freshMemoryDb();
  const ids = buildAuthorizedChain(db);
  const tcaId = ids.testCellAuthorizationId;
  const status0 = (db.prepare('SELECT status FROM TestCellAuthorization WHERE test_cell_authorization_id=?').get(tcaId) as any).status;
  const trans0 = (db.prepare('SELECT COUNT(*) c FROM AuthorizationTransition WHERE test_cell_authorization_id=?').get(tcaId) as any).c;
  const ledg0 = (db.prepare('SELECT COUNT(*) c FROM EvidenceLedger').get() as any).c;

  // Reproduce applyTransition's exact write set (INSERT transition + UPDATE status +
  // appendLedger), then throw AFTER all three writes — the precise M1 defect scenario.
  assert.throws(() => atomic(db, () => {
    const tid = `AT_${tcaId}_rollback`;
    db.prepare(
      `INSERT INTO AuthorizationTransition
        (authorization_transition_id, test_cell_authorization_id, from_status, to_status, transition_reason, actor_identity, timestamp)
       VALUES (?,?,?,?,?,?,?)`,
    ).run(tid, tcaId, status0, 'SUSPENDED', 'injected failure', 'test', new Date().toISOString());
    db.prepare('UPDATE TestCellAuthorization SET status=? WHERE test_cell_authorization_id=?').run('SUSPENDED', tcaId);
    appendLedger(db, 'AuthorizationTransition', tid, { tcaId }, 'test');
    throw new Error('INJECTED_MID_UNIT_FAILURE');
  }), /INJECTED_MID_UNIT_FAILURE/);

  // Nothing persisted: status unchanged, no orphan transition, no orphan ledger row.
  const status1 = (db.prepare('SELECT status FROM TestCellAuthorization WHERE test_cell_authorization_id=?').get(tcaId) as any).status;
  const trans1 = (db.prepare('SELECT COUNT(*) c FROM AuthorizationTransition WHERE test_cell_authorization_id=?').get(tcaId) as any).c;
  const ledg1 = (db.prepare('SELECT COUNT(*) c FROM EvidenceLedger').get() as any).c;
  assert.equal(status1, status0);
  assert.equal(trans1, trans0);
  assert.equal(ledg1, ledg0);

  // And the DB is still usable afterwards — a real activation still commits atomically.
  activate(db, tcaId, 'test.lead');
  const status2 = (db.prepare('SELECT status FROM TestCellAuthorization WHERE test_cell_authorization_id=?').get(tcaId) as any).status;
  assert.equal(status2, 'ACTIVE');
});

// ── Automatic expiry sweep (RC-424) ──────────────────────────────────────────
test('RC-424: automatic expiry moves AUTHORIZED->EXPIRED and ACTIVE->SUSPENDED', async () => {
  const { applyAutomaticExpiry } = await import('../src/authorization');
  const db = freshMemoryDb();
  const a = buildAuthorizedChain(db);                 // stays AUTHORIZED
  const b = buildAuthorizedChain(db);
  activate(db, b.testCellAuthorizationId, 'x');        // ACTIVE
  const past = new Date(Date.now() - 1000).toISOString();
  db.prepare('UPDATE TestCellAuthorization SET authorization_expiry = ? WHERE test_cell_authorization_id IN (?,?)')
    .run(past, a.testCellAuthorizationId, b.testCellAuthorizationId);
  const r = applyAutomaticExpiry(db);
  assert.ok(r.expired.includes(a.testCellAuthorizationId));
  assert.ok(r.suspended.includes(b.testCellAuthorizationId));
});
