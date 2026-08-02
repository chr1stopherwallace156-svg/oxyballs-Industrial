import { DB } from './db';
import { BlockReason, block } from './blockReasons';

/** RC-403: full failure-response set when a required channel is invalid/saturated. */
export const SENSOR_FAILURE_RESPONSE = {
  INVERTER_PHYSICAL_STATE: 'UNKNOWN',
  INDEPENDENT_SENSOR_HEALTH: 'INVALID',
  TEST_RESULT: 'INVALID_TEST',
  MOVEMENT_AUTHORITY: 'BLOCKED',
  FAULT_ESCALATION: 'PROHIBITED',
  ENGINEERING_REVIEW_REQUIRED: true,
} as const;

interface InstrumentationRow {
  current_probe_calibration_status: string;
  current_probe_range_valid: string;
  dc_bus_sensor_status: string;
  dc_bus_sensor_range_valid: string;
  motor_speed_sensor_status: string;
  wheel_speed_sensor_status: string;
  time_sync_status: string;
  saturation_detected: number;
  clipping_detected: number;
  sensor_fault_detected: number;
  result_status: string;
}

/** RC-391: derive VALID/INVALID from channel health (independent of stored result). */
export function evaluateSensorHealth(r: InstrumentationRow): 'VALID' | 'INVALID' {
  const ok =
    r.current_probe_calibration_status === 'VALID' &&
    r.current_probe_range_valid === 'PASS' &&
    r.dc_bus_sensor_status === 'VALID' &&
    r.dc_bus_sensor_range_valid === 'PASS' &&
    r.motor_speed_sensor_status === 'VALID' &&
    r.wheel_speed_sensor_status === 'VALID' &&
    r.time_sync_status === 'SYNCHRONIZED' &&
    r.saturation_detected === 0 &&
    r.clipping_detected === 0 &&
    r.sensor_fault_detected === 0;
  return ok ? 'VALID' : 'INVALID';
}

/**
 * RC-391/403: an unhealthy independent channel cannot resolve physical state.
 * Throws INSTRUMENTATION_HEALTH_INVALID (implying the full RC-403 response set).
 */
export function assertInstrumentationHealthy(db: DB, instrumentationRecordId: string): void {
  const r = db.prepare('SELECT * FROM InstrumentationRecord WHERE instrumentation_record_id = ?')
    .get(instrumentationRecordId) as unknown as InstrumentationRow | undefined;
  block(!!r, BlockReason.ORPHANED_REFERENCE, `InstrumentationRecord ${instrumentationRecordId} not found`);
  block(evaluateSensorHealth(r!) === 'VALID', BlockReason.INSTRUMENTATION_HEALTH_INVALID,
    JSON.stringify(SENSOR_FAILURE_RESPONSE));
}
