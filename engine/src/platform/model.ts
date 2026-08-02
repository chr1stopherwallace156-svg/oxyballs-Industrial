/**
 * Platform-package layer: shared types, the locked Platform 001 reference
 * configuration, the required BOM category list, and deterministic ID helpers.
 *
 * Determinism doctrine for this slice: every generated identifier (evaluation,
 * ODR, BOM item, build package) is a pure function of its canonical inputs — no
 * clock, no randomness — so identical canonical inputs produce identical decisions
 * and an identical package_hash. Wall-clock timestamps are recorded on rows but are
 * NEVER part of any hash.
 */
import { sha256, canonicalSerialize } from '../db';

/** Engine version stamped on every generated evaluation and package. */
export const ENGINE_VERSION = 'platform-slice-0.1.0';

export type ClaimStatus =
  | 'UNVERIFIED' | 'RESEARCH_REQUIRED' | 'CANDIDATE'
  | 'VERIFIED_DOCUMENT' | 'VERIFIED_PHYSICAL' | 'CONFLICT' | 'SUPERSEDED';

export type EvalResult = 'PASS' | 'FAIL' | 'BLOCKED_MISSING_DATA' | 'NOT_APPLICABLE';

export type SelectionStatus = 'UNSELECTED' | 'CANDIDATE' | 'BLOCKED' | 'VERIFIED_CANDIDATE';

export type OdrCategory =
  | 'VEHICLE_GEOMETRY' | 'BASELINE_AXLE_WEIGHT' | 'COMPONENT_MASS'
  | 'COMPONENT_DIMENSIONS' | 'MOUNTING_ENVELOPE' | 'ELECTRICAL_LIMIT'
  | 'THERMAL_LIMIT' | 'COOLING_REQUIREMENT' | 'COMMUNICATION_INTERFACE'
  | 'SUPPLIER_DOCUMENTATION' | 'PHYSICAL_MEASUREMENT';

export type OdrStatus =
  | 'OPEN' | 'EVIDENCE_RECEIVED' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED' | 'SUPERSEDED';

/**
 * The single locked reference configuration for this milestone (owner-provided).
 * These are the ONLY externally supplied values in this slice; every other
 * engineering value remains explicitly unresolved. Geometry is the nominal
 * published configuration identity, NOT a physical measurement — physical frame
 * verification is still required (a PHYSICAL_MEASUREMENT ODR is always raised).
 */
export const PLATFORM_001 = {
  platform_id: 'PLATFORM-001',
  manufacturer: 'Ford',
  model: 'F-450 Super Duty Chassis Cab',
  model_year: 2019,
  cab_configuration: 'Regular Cab',
  drive_configuration: '4x2',
  rear_wheel_configuration: 'DRW',
  cab_to_axle_value: 60,
  cab_to_axle_unit: 'in',
  wheelbase_value: 145.3,
  wheelbase_unit: 'in',
  body_state: 'Bare cab-and-chassis',
  status: 'LOCKED_REFERENCE',
  revision: 'R1',
  source_authority: 'OWNER_LOCKED_REFERENCE_CONFIG',
} as const;

/**
 * The required BOM categories for a Class-4/5 gas→EV conversion package (owner
 * list). A package must contain exactly one slot per category (enforced by the
 * BomItem UNIQUE(build_package_id, category) constraint).
 */
export const BOM_CATEGORIES: readonly string[] = [
  'TRACTION_BATTERY',
  'TRACTION_MOTOR',
  'INVERTER',
  'REDUCTION_OR_TRANSMISSION_INTERFACE',
  'HV_JUNCTION',
  'CONTACTORS',
  'PRECHARGE',
  'HV_FUSES',
  'ONBOARD_CHARGER',
  'DC_DC_CONVERTER',
  'CHARGE_INLET',
  'VEHICLE_CONTROL_UNIT',
  'COOLING_PUMPS',
  'COOLING_HEAT_EXCHANGER',
  'EXPANSION_TANK',
  'HV_CABLING',
  'LOW_VOLTAGE_HARNESS',
  'MOUNTING_STRUCTURE',
  'PROTECTION_AND_CONTAINMENT',
  'INSTRUMENTATION',
] as const;

/** 16-hex-char stable id fragment from canonical content. */
export function sid(parts: unknown): string {
  return sha256(canonicalSerialize({ v: parts as any })).slice(0, 16);
}

// Child ids are scoped by build_package_id: two packages (e.g. different revisions
// or inputs) must never collide on a global PK, while identical inputs → identical
// package_id → identical child ids (determinism preserved).
export const evalId = (packageId: string, platformRev: string, candidateId: string | null, ruleId: string): string =>
  `EVAL_${sid([packageId, platformRev, candidateId ?? 'PLATFORM', ruleId])}`;

export const odrId = (packageId: string, category: string, subject: string, rule: string | null): string =>
  `ODR_${sid([packageId, category, subject, rule ?? ''])}`;

export const bomItemId = (packageId: string, category: string): string =>
  `BOM_${sid([packageId, category])}`;

export const buildPackageId = (platformId: string, inputHash: string): string =>
  `BP_${platformId}_${inputHash.slice(0, 12)}`;
