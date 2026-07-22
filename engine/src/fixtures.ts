import { DB } from './db';
import { aggregate, signRelease } from './runout';
import { AuthorityClass, Unit } from './units';

let counter = 0;
function uid(prefix: string): string {
  counter += 1;
  return `${prefix}_${counter}`;
}

const NOW = () => new Date().toISOString();
const FUTURE = () => new Date(Date.now() + 24 * 3600 * 1000).toISOString();

export interface BaseIds {
  vehicleBuildId: string;
  individualVehicleId: string;
  configurationPacketId: string;
  platformConfigId: string;
}

export function insertBase(db: DB, opts: { platform?: string } = {}): BaseIds {
  const platformConfigId = opts.platform ?? 'PLATFORM_001A';
  const vehicleBuildId = uid('VB');
  const individualVehicleId = uid('IV');
  const configurationPacketId = uid('CP');
  db.prepare('INSERT INTO VehicleBuild(vehicle_build_id, platform_configuration_id, status) VALUES (?,?,?)')
    .run(vehicleBuildId, platformConfigId, 'ACTIVE');
  db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id, vin, vehicle_build_id, platform_id, status) VALUES (?,?,?,?,?)')
    .run(individualVehicleId, uid('VIN'), vehicleBuildId, platformConfigId, 'ACTIVE');
  db.prepare(
    `INSERT INTO ConfigurationPacket(configuration_packet_id, individual_vehicle_id, vehicle_build_id,
      platform_configuration_id, config_hash, status, created_at) VALUES (?,?,?,?,?,?,?)`,
  ).run(configurationPacketId, individualVehicleId, vehicleBuildId, platformConfigId, uid('HASH'), 'ACTIVE', NOW());
  return { vehicleBuildId, individualVehicleId, configurationPacketId, platformConfigId };
}

export function insertField(db: DB, value: number, unit: Unit, authorityClass: AuthorityClass): string {
  const id = uid('TNF');
  db.prepare(
    'INSERT INTO TypedNumericField(typed_numeric_field_id, value, unit, authority_class) VALUES (?,?,?,?)',
  ).run(id, value, unit, authorityClass);
  return id;
}

export interface ChainOptions {
  authorityClass?: AuthorityClass;      // for TCA numeric boundaries (default ENGINEERING_APPROVED)
  componentAuthority?: string;          // DistanceComponent.authority_status (default ENGINEERING_APPROVED)
  availableTrackLength?: number;        // default 100
  approvedMinimumMargin?: number;       // default 5
  procedureApproved?: boolean;          // default true
  signRunout?: boolean;                 // default true
  status?: string;                      // TCA status (default AUTHORIZED)
  requiresPreviousSignedPass?: boolean; // default false
}

export interface ChainIds extends BaseIds {
  runoutCalculationsId: string;
  runoutAggregationResultId: string;
  procedureApprovalId: string;
  testSessionId: string;
  testCellAuthorizationId: string;
}

/** Build a full chain up to (default) AUTHORIZED that can legally activate(). */
export function buildAuthorizedChain(db: DB, opts: ChainOptions = {}): ChainIds {
  const base = insertBase(db);
  const authorityClass = opts.authorityClass ?? 'ENGINEERING_APPROVED';
  const componentAuthority = opts.componentAuthority ?? 'ENGINEERING_APPROVED';
  const available = opts.availableTrackLength ?? 100;
  const approvedMinimumMargin = opts.approvedMinimumMargin ?? 5;

  // Runout: two eligible components, L_min = 30.
  const runoutCalculationsId = uid('RC');
  db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
    .run(runoutCalculationsId, base.configurationPacketId, 'DRAFT', NOW());
  const c1 = uid('DC');
  const c2 = uid('DC');
  db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run(c1, runoutCalculationsId, 0, 10, 10, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', componentAuthority);
  db.prepare(
    `INSERT INTO DistanceComponent(distance_component_id, runout_calculations_id, zone_start_reference, zone_end_reference,
      distance_component_value, distance_component_method, uncertainty_m, included_in_l_min, included_within_component_id,
      overlap_review_status, authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  ).run(c2, runoutCalculationsId, 10, 30, 20, 'ENGINEERING_APPROVED', 0.5, 1, null, 'INCLUDED_SEPARATELY', componentAuthority);

  const agg = aggregate(db, {
    runoutCalculationsId,
    configurationPacketId: base.configurationPacketId,
    testCellAuthorizationId: null,
    availableTrackLength: available,
    approvedMinimumMargin,
  });
  if (opts.signRunout !== false) signRelease(db, agg.runoutAggregationResultId);

  // Procedure approval
  const procedureApprovalId = uid('PA');
  db.prepare(
    `INSERT INTO ProcedureApproval(procedure_approval_id, test_id, procedure_revision, approver_identity, signature_hash,
      approval_timestamp, status) VALUES (?,?,?,?,?,?,?)`,
  ).run(procedureApprovalId, 'C3A-002', 'r1',
    opts.procedureApproved === false ? null : 'eng.lead',
    opts.procedureApproved === false ? null : uid('SIG'),
    opts.procedureApproved === false ? null : NOW(),
    opts.procedureApproved === false ? 'DRAFT' : 'APPROVED');

  // Numeric boundaries
  const maxSpeed = insertField(db, 4, 'm/s', authorityClass);
  const maxPos = insertField(db, 80, 'Nm', authorityClass);
  const maxNeg = insertField(db, -10, 'Nm', authorityClass);
  const maxRate = insertField(db, 40, 'Nm/s', authorityClass);
  const maxJerk = insertField(db, 5, 'm/s^3', authorityClass);
  const maxDist = insertField(db, 30, 'm', authorityClass);
  const smin = insertField(db, -0.1, 'rad', 'ENGINEERING_APPROVED');
  const smax = insertField(db, 0.1, 'rad', 'ENGINEERING_APPROVED');
  const bandId = uid('ASB');
  db.prepare(
    `INSERT INTO AllowedSteeringBand(allowed_steering_band_id, minimum_angle_field_id, maximum_angle_field_id,
      reference_frame, authority_class) VALUES (?,?,?,?,?)`,
  ).run(bandId, smin, smax, 'ROAD_WHEEL_ANGLE', 'ENGINEERING_APPROVED');

  const testSessionId = uid('TS');
  db.prepare('INSERT INTO TestSession(test_session_id, configuration_packet_id, individual_vehicle_id, status) VALUES (?,?,?,?)')
    .run(testSessionId, base.configurationPacketId, base.individualVehicleId, 'OPEN');

  const testCellAuthorizationId = uid('TCA');
  db.prepare(
    `INSERT INTO TestCellAuthorization(test_cell_authorization_id, subgate_id, cell_number,
      maximum_speed_field_id, maximum_positive_torque_field_id, maximum_negative_torque_field_id,
      maximum_torque_rate_field_id, maximum_jerk_field_id, maximum_test_distance_field_id, allowed_steering_band_id,
      allowed_regen_state, runout_calculations_id, configuration_packet_id, runout_aggregation_result_id,
      procedure_approval_id, requires_previous_signed_pass, authorized_track_distance, available_track_length,
      environmental_window_valid, thermal_state_valid, personnel_assigned, containment_ready,
      individual_vehicle_id, vehicle_build_id, platform_configuration_id, test_session_id,
      authorization_expiry, status)
     VALUES (?,?,?, ?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?)`,
  ).run(
    testCellAuthorizationId, '05M-C3A', 1,
    maxSpeed, maxPos, maxNeg, maxRate, maxJerk, maxDist, bandId,
    'ZERO_REGEN_REQUEST', runoutCalculationsId, base.configurationPacketId, agg.runoutAggregationResultId,
    procedureApprovalId, opts.requiresPreviousSignedPass ? 1 : 0, available, available,
    1, 1, 1, 1,
    base.individualVehicleId, base.vehicleBuildId, base.platformConfigId, testSessionId,
    FUTURE(), opts.status ?? 'AUTHORIZED',
  );

  return {
    ...base,
    runoutCalculationsId,
    runoutAggregationResultId: agg.runoutAggregationResultId,
    procedureApprovalId,
    testSessionId,
    testCellAuthorizationId,
  };
}
