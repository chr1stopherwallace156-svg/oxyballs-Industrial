/**
 * Platform-package block reasons (Platform 001 vertical slice). These are DISTINCT
 * from the M10 movement/test-cell BlockReason enum: they describe why a build
 * package cannot be released. Every deterministic blocker the generator emits is
 * one of these codes, rendered to a stable token for the report/artifact.
 *
 * Rendering rule (matches the owner's sample blocker list):
 *   - platform-scope blockers render as `BLOCKED:<CODE>`
 *     e.g. BLOCKED:BASELINE_AXLE_WEIGHT_REQUIRED
 *   - component-scope blockers render as `BLOCKED:<SHORT>_<CODE>` where <SHORT> is
 *     the category's short label, e.g. BLOCKED:BATTERY_CANDIDATE_NOT_SELECTED,
 *     BLOCKED:MOTOR_DIMENSIONS_REQUIRED
 */

export enum PackageBlockReason {
  // Platform-scope
  REQUIRED_PLATFORM_DATA_MISSING = 'REQUIRED_PLATFORM_DATA_MISSING',
  BASELINE_AXLE_WEIGHT_REQUIRED = 'BASELINE_AXLE_WEIGHT_REQUIRED',
  PHYSICAL_FRAME_MEASUREMENT_REQUIRED = 'PHYSICAL_FRAME_MEASUREMENT_REQUIRED',
  UNKNOWN_UNIT = 'UNKNOWN_UNIT',
  PLATFORM_REVISION_CHANGED = 'PLATFORM_REVISION_CHANGED',
  SOURCE_AUTHORITY_MISSING = 'SOURCE_AUTHORITY_MISSING',

  // Component-scope
  CANDIDATE_NOT_SELECTED = 'CANDIDATE_NOT_SELECTED',
  DIMENSIONS_REQUIRED = 'DIMENSIONS_REQUIRED',
  MASS_REQUIRED = 'MASS_REQUIRED',
  COMPONENT_UNVERIFIED = 'COMPONENT_UNVERIFIED',
  SUPERSEDED_COMPONENT_SELECTED = 'SUPERSEDED_COMPONENT_SELECTED',
}

export type BlockScope = 'PLATFORM' | 'COMPONENT' | 'PACKAGE';

/**
 * Effort category for a blocker, so the report tells you WHERE effort belongs
 * instead of just how many blockers exist:
 *   RESEARCH      — a value/document must be obtained (specs, weights, supplier data)
 *   CONFIGURATION — the platform/config setup itself is wrong or incomplete
 *   COMPONENTS    — a component must be selected (or a superseded one replaced)
 *   VERIFICATION  — something present must be physically measured / verified
 */
export type BlockerCategory = 'RESEARCH' | 'CONFIGURATION' | 'COMPONENTS' | 'VERIFICATION';

export const BLOCKER_CATEGORIES: readonly BlockerCategory[] =
  ['RESEARCH', 'CONFIGURATION', 'COMPONENTS', 'VERIFICATION'] as const;

const BLOCKER_CATEGORY: Record<PackageBlockReason, BlockerCategory> = {
  [PackageBlockReason.REQUIRED_PLATFORM_DATA_MISSING]: 'RESEARCH',
  [PackageBlockReason.BASELINE_AXLE_WEIGHT_REQUIRED]: 'RESEARCH',
  [PackageBlockReason.DIMENSIONS_REQUIRED]: 'RESEARCH',
  [PackageBlockReason.MASS_REQUIRED]: 'RESEARCH',
  [PackageBlockReason.UNKNOWN_UNIT]: 'CONFIGURATION',
  [PackageBlockReason.PLATFORM_REVISION_CHANGED]: 'CONFIGURATION',
  [PackageBlockReason.SOURCE_AUTHORITY_MISSING]: 'CONFIGURATION',
  [PackageBlockReason.CANDIDATE_NOT_SELECTED]: 'COMPONENTS',
  [PackageBlockReason.SUPERSEDED_COMPONENT_SELECTED]: 'COMPONENTS',
  [PackageBlockReason.PHYSICAL_FRAME_MEASUREMENT_REQUIRED]: 'VERIFICATION',
  [PackageBlockReason.COMPONENT_UNVERIFIED]: 'VERIFICATION',
};

export function blockerCategory(code: PackageBlockReason): BlockerCategory {
  return BLOCKER_CATEGORY[code];
}

export interface BlockReasonRecord {
  code: PackageBlockReason;
  scope: BlockScope;
  /** For component-scope blockers, the BOM category (e.g. TRACTION_BATTERY). */
  subject: string;
  detail: string;
}

/** Short label per BOM category, used to render component-scope blocker tokens. */
export const CATEGORY_SHORT: Record<string, string> = {
  TRACTION_BATTERY: 'BATTERY',
  TRACTION_MOTOR: 'MOTOR',
  INVERTER: 'INVERTER',
  REDUCTION_OR_TRANSMISSION_INTERFACE: 'DRIVE_INTERFACE',
  HV_JUNCTION: 'HV_JUNCTION',
  CONTACTORS: 'CONTACTORS',
  PRECHARGE: 'PRECHARGE',
  HV_FUSES: 'HV_FUSES',
  ONBOARD_CHARGER: 'CHARGER',
  DC_DC_CONVERTER: 'DCDC',
  CHARGE_INLET: 'CHARGE_INLET',
  VEHICLE_CONTROL_UNIT: 'VCU',
  COOLING_PUMPS: 'COOLING_PUMPS',
  COOLING_HEAT_EXCHANGER: 'HEAT_EXCHANGER',
  EXPANSION_TANK: 'EXPANSION_TANK',
  HV_CABLING: 'HV_CABLING',
  LOW_VOLTAGE_HARNESS: 'LV_HARNESS',
  MOUNTING_STRUCTURE: 'MOUNTING',
  PROTECTION_AND_CONTAINMENT: 'CONTAINMENT',
  INSTRUMENTATION: 'INSTRUMENTATION',
};

/** Render a blocker to its stable token, e.g. `BLOCKED:MOTOR_DIMENSIONS_REQUIRED`. */
export function renderBlocker(b: BlockReasonRecord): string {
  if (b.scope === 'COMPONENT') {
    const short = CATEGORY_SHORT[b.subject] ?? b.subject;
    return `BLOCKED:${short}_${b.code}`;
  }
  return `BLOCKED:${b.code}`;
}
