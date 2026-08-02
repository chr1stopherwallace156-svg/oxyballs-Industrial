/**
 * Canonical-SI unit model (RC-385) + authority-class eligibility (RC-412/267/300).
 * Display unit may vary; every comparison happens in canonical SI.
 */

export type Unit =
  | 'm' | 'mm' | 'in' | 'm/s' | 'm/s^2' | 'm/s^3'
  | 'Nm' | 'Nm/s' | 'Nm/s^2'
  | 'deg' | 'deg/s' | 'rad' | 'rad/s'
  | 'A' | 'A/s' | 'V' | 'V/s'
  | 'Pa' | 'kPa' | 'bar'
  | 'ms' | 's' | 'kg' | 'lb' | 'percent';

export type AuthorityClass =
  | 'MEASURED' | 'CALCULATED' | 'SUPPLIER_DEFINED' | 'ENGINEERING_APPROVED' | 'INITIAL_TARGET_PROFILE';

/** Physical dimension a unit belongs to (comparisons only permitted within one). */
export type Dimension =
  | 'length' | 'velocity' | 'acceleration' | 'jerk'
  | 'torque' | 'torque_rate' | 'torque_accel'
  | 'angle' | 'angular_velocity'
  | 'current' | 'current_rate' | 'voltage' | 'voltage_rate'
  | 'pressure' | 'time' | 'mass' | 'ratio';

interface UnitSpec { dimension: Dimension; toCanonical: number; canonicalUnit: Unit; }

const UNITS: Record<Unit, UnitSpec> = {
  m:        { dimension: 'length', toCanonical: 1, canonicalUnit: 'm' },
  mm:       { dimension: 'length', toCanonical: 0.001, canonicalUnit: 'm' },
  in:       { dimension: 'length', toCanonical: 0.0254, canonicalUnit: 'm' },
  'm/s':    { dimension: 'velocity', toCanonical: 1, canonicalUnit: 'm/s' },
  'm/s^2':  { dimension: 'acceleration', toCanonical: 1, canonicalUnit: 'm/s^2' },
  'm/s^3':  { dimension: 'jerk', toCanonical: 1, canonicalUnit: 'm/s^3' },
  Nm:       { dimension: 'torque', toCanonical: 1, canonicalUnit: 'Nm' },
  'Nm/s':   { dimension: 'torque_rate', toCanonical: 1, canonicalUnit: 'Nm/s' },
  'Nm/s^2': { dimension: 'torque_accel', toCanonical: 1, canonicalUnit: 'Nm/s^2' },
  deg:      { dimension: 'angle', toCanonical: Math.PI / 180, canonicalUnit: 'rad' },
  rad:      { dimension: 'angle', toCanonical: 1, canonicalUnit: 'rad' },
  'deg/s':  { dimension: 'angular_velocity', toCanonical: Math.PI / 180, canonicalUnit: 'rad/s' },
  'rad/s':  { dimension: 'angular_velocity', toCanonical: 1, canonicalUnit: 'rad/s' },
  A:        { dimension: 'current', toCanonical: 1, canonicalUnit: 'A' },
  'A/s':    { dimension: 'current_rate', toCanonical: 1, canonicalUnit: 'A/s' },
  V:        { dimension: 'voltage', toCanonical: 1, canonicalUnit: 'V' },
  'V/s':    { dimension: 'voltage_rate', toCanonical: 1, canonicalUnit: 'V/s' },
  Pa:       { dimension: 'pressure', toCanonical: 1, canonicalUnit: 'Pa' },
  kPa:      { dimension: 'pressure', toCanonical: 1_000, canonicalUnit: 'Pa' },
  bar:      { dimension: 'pressure', toCanonical: 100_000, canonicalUnit: 'Pa' },
  ms:       { dimension: 'time', toCanonical: 0.001, canonicalUnit: 's' },
  s:        { dimension: 'time', toCanonical: 1, canonicalUnit: 's' },
  kg:       { dimension: 'mass', toCanonical: 1, canonicalUnit: 'kg' },
  lb:       { dimension: 'mass', toCanonical: 0.45359237, canonicalUnit: 'kg' },
  percent:  { dimension: 'ratio', toCanonical: 0.01, canonicalUnit: 'percent' },
};

export function isKnownUnit(u: string): u is Unit {
  return Object.prototype.hasOwnProperty.call(UNITS, u);
}

/** Convert a value to canonical SI. Throws on unknown unit. */
export function toCanonical(value: number, unit: Unit): number {
  const spec = UNITS[unit];
  if (!spec) throw new Error(`UNKNOWN_UNIT:${unit}`);
  return value * spec.toCanonical;
}

export function dimensionOf(unit: Unit): Dimension {
  return UNITS[unit].dimension;
}

/**
 * Authority classes eligible to authorize physical movement / a boundary used for
 * AUTHORIZED or ACTIVE (RC-412). INITIAL_TARGET_PROFILE is NOT eligible
 * (RC-267/300: it has no movement/pass/fail/block/release authority).
 */
const ELIGIBLE_AUTHORITY: ReadonlySet<AuthorityClass> = new Set<AuthorityClass>([
  'ENGINEERING_APPROVED', 'SUPPLIER_DEFINED', 'MEASURED', 'CALCULATED',
]);

export function isAuthorityClassEligible(cls: AuthorityClass): boolean {
  return ELIGIBLE_AUTHORITY.has(cls);
}

/** DistanceComponent.authority_status values eligible for L_min membership (RC-401/402). */
const ELIGIBLE_COMPONENT_AUTHORITY: ReadonlySet<string> = new Set([
  'ARTIFACT_DEFINED', 'ENGINEERING_APPROVED',
]);

export function isComponentAuthorityEligible(status: string): boolean {
  return ELIGIBLE_COMPONENT_AUTHORITY.has(status);
}
