/**
 * Loads the locked Platform 001 reference dataset: the platform row, its
 * engineering claims, and the honest component-candidate slots. Idempotent
 * (delete-then-insert of the platform-scoped rows) so re-seeding is deterministic.
 *
 * HONESTY NOTE: no engineering value is invented here. The only values present are
 * the owner-locked nominal geometry (marked CANDIDATE / not physically verified).
 * Every other quantity is a claim with value = NULL and status RESEARCH_REQUIRED.
 * The component "candidates" are empty slots (all specs NULL, status UNVERIFIED) —
 * they represent "we know we need this; we have no verified data," which is the
 * opposite of fabricating a part. The report and governance state this explicitly.
 */
import { DB, atomic } from '../db';
import { PLATFORM_001 } from './model';

export interface ClaimSeed {
  claim_id: string;
  subject: string;
  value: number | null;
  unit: string | null;
  claim_type: string;
  status: string;
  physical_verification_status: string;
  source_reference: string | null;
}

/** Fixed claim IDs (deterministic). */
export const PLATFORM_001_CLAIMS: ClaimSeed[] = [
  {
    claim_id: 'CLAIM-P001-WHEELBASE', subject: 'wheelbase',
    value: PLATFORM_001.wheelbase_value, unit: PLATFORM_001.wheelbase_unit,
    claim_type: 'VEHICLE_GEOMETRY', status: 'CANDIDATE',
    physical_verification_status: 'NOT_PHYSICALLY_VERIFIED',
    source_reference: 'OWNER_LOCKED_REFERENCE_CONFIG',
  },
  {
    claim_id: 'CLAIM-P001-CAB-TO-AXLE', subject: 'cab_to_axle',
    value: PLATFORM_001.cab_to_axle_value, unit: PLATFORM_001.cab_to_axle_unit,
    claim_type: 'VEHICLE_GEOMETRY', status: 'CANDIDATE',
    physical_verification_status: 'NOT_PHYSICALLY_VERIFIED',
    source_reference: 'OWNER_LOCKED_REFERENCE_CONFIG',
  },
  {
    claim_id: 'CLAIM-P001-FRONT-AXLE-WEIGHT', subject: 'baseline_front_axle_weight',
    value: null, unit: null, claim_type: 'BASELINE_AXLE_WEIGHT', status: 'RESEARCH_REQUIRED',
    physical_verification_status: 'NOT_PHYSICALLY_VERIFIED', source_reference: null,
  },
  {
    claim_id: 'CLAIM-P001-REAR-AXLE-WEIGHT', subject: 'baseline_rear_axle_weight',
    value: null, unit: null, claim_type: 'BASELINE_AXLE_WEIGHT', status: 'RESEARCH_REQUIRED',
    physical_verification_status: 'NOT_PHYSICALLY_VERIFIED', source_reference: null,
  },
  {
    claim_id: 'CLAIM-P001-GVWR', subject: 'gvwr',
    value: null, unit: null, claim_type: 'BASELINE_AXLE_WEIGHT', status: 'RESEARCH_REQUIRED',
    physical_verification_status: 'NOT_PHYSICALLY_VERIFIED', source_reference: null,
  },
];

export interface CandidateSeed {
  component_candidate_id: string;
  component_type: string;
  model: string | null;
  engineering_status: string;
  dimensions: string | null;
}

/**
 * Honest candidate slots. The motor slot exists but its dimensions are unknown
 * (→ DIMENSIONS_REQUIRED). Every other required category has NO candidate and is
 * therefore UNSELECTED. Nothing here claims a real, sourced product.
 */
export const PLATFORM_001_CANDIDATES: CandidateSeed[] = [
  {
    component_candidate_id: 'CC-P001-MOTOR-SLOT',
    component_type: 'TRACTION_MOTOR',
    model: 'PLACEHOLDER_MOTOR_SLOT — NO SUPPLIER DATA',
    engineering_status: 'UNVERIFIED',
    dimensions: null,
  },
];

/**
 * Validate that the loaded platform still matches the locked Platform 001 identity
 * (manufacturer/model/year/cab/drive/rear-wheels/body/revision + nominal geometry
 * VALUES). Throws PLATFORM_CONFIG_MISMATCH listing every differing field. This is a
 * configuration-identity guard — it does NOT check unit acceptance (that is the
 * unit-validity compatibility rule's job).
 */
export function validatePlatformConfig(db: DB, platformId: string = PLATFORM_001.platform_id): void {
  const p = db.prepare('SELECT * FROM VehiclePlatform WHERE platform_id = ?').get(platformId) as any;
  if (!p) throw new Error(`PLATFORM_NOT_LOADED:${platformId}`);
  const checks: [string, unknown, unknown][] = [
    ['manufacturer', p.manufacturer, PLATFORM_001.manufacturer],
    ['model', p.model, PLATFORM_001.model],
    ['model_year', p.model_year, PLATFORM_001.model_year],
    ['cab_configuration', p.cab_configuration, PLATFORM_001.cab_configuration],
    ['drive_configuration', p.drive_configuration, PLATFORM_001.drive_configuration],
    ['rear_wheel_configuration', p.rear_wheel_configuration, PLATFORM_001.rear_wheel_configuration],
    ['body_state', p.body_state, PLATFORM_001.body_state],
    ['revision', p.revision, PLATFORM_001.revision],
    ['wheelbase_value', p.wheelbase_value, PLATFORM_001.wheelbase_value],
    ['cab_to_axle_value', p.cab_to_axle_value, PLATFORM_001.cab_to_axle_value],
  ];
  const mismatched = checks.filter(([, actual, expected]) => actual !== expected).map(([f]) => f);
  if (mismatched.length > 0) throw new Error(`PLATFORM_CONFIG_MISMATCH:${mismatched.join(',')}`);
}

/**
 * Delete every Platform 001 build package and its children in foreign-key-safe
 * order (BomItem → CompatibilityEvaluation → OpenDataRequirement → BuildPackage).
 * Scoped strictly to Platform-001 packages; unrelated platforms and all core M10
 * tables (EvidenceLedger, IndividualVehicle, VehicleBuild, TestResult, signoffs,
 * authorizations, telemetry…) are left completely intact. Caller supplies the
 * transaction (used inside seedPlatform001's atomic block).
 */
export function clearPlatform001Derived(db: DB): void {
  const pkgIds = db
    .prepare('SELECT build_package_id FROM BuildPackage WHERE platform_id = ?')
    .all(PLATFORM_001.platform_id)
    .map((r: any) => r.build_package_id as string);
  for (const pid of pkgIds) {
    db.prepare('DELETE FROM BomItem WHERE build_package_id = ?').run(pid);
    db.prepare('DELETE FROM CompatibilityEvaluation WHERE build_package_id = ?').run(pid);
    db.prepare('DELETE FROM OpenDataRequirement WHERE build_package_id = ?').run(pid);
    db.prepare('DELETE FROM BuildPackage WHERE build_package_id = ?').run(pid);
  }
}

export function seedPlatform001(db: DB): void {
  atomic(db, () => {
    const now = new Date().toISOString();

    // Clear the prior Platform 001 DERIVED build-package records first, in
    // foreign-key-safe order, so a re-seed on a persistent database does not fail
    // an FK constraint (BomItem/CompatibilityEvaluation/BomItem reference the
    // candidate + platform rows we are about to replace). This deletes ONLY
    // Platform-001 build packages and their children — it never touches unrelated
    // core tables (EvidenceLedger, IndividualVehicle, TestResult, authorizations…).
    clearPlatform001Derived(db);

    // Clear platform-scoped rows for a clean, deterministic re-seed.
    db.prepare('DELETE FROM EngineeringClaim WHERE platform_id = ?').run(PLATFORM_001.platform_id);
    for (const c of PLATFORM_001_CANDIDATES)
      db.prepare('DELETE FROM ComponentCandidate WHERE component_candidate_id = ?').run(c.component_candidate_id);
    db.prepare('DELETE FROM VehiclePlatform WHERE platform_id = ?').run(PLATFORM_001.platform_id);

    db.prepare(
      `INSERT INTO VehiclePlatform
        (platform_id, manufacturer, model, model_year, cab_configuration, drive_configuration,
         rear_wheel_configuration, cab_to_axle_value, cab_to_axle_unit, wheelbase_value, wheelbase_unit,
         body_state, status, revision, source_authority, created_at, released_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NULL)`,
    ).run(
      PLATFORM_001.platform_id, PLATFORM_001.manufacturer, PLATFORM_001.model, PLATFORM_001.model_year,
      PLATFORM_001.cab_configuration, PLATFORM_001.drive_configuration, PLATFORM_001.rear_wheel_configuration,
      PLATFORM_001.cab_to_axle_value, PLATFORM_001.cab_to_axle_unit, PLATFORM_001.wheelbase_value,
      PLATFORM_001.wheelbase_unit, PLATFORM_001.body_state, PLATFORM_001.status, PLATFORM_001.revision,
      PLATFORM_001.source_authority, now,
    );

    for (const c of PLATFORM_001_CLAIMS) {
      db.prepare(
        `INSERT INTO EngineeringClaim
          (claim_id, platform_id, subject, value, unit, applicability, claim_type, status, confidence,
           source_reference, source_revision, uncertainty, physical_verification_status, supersedes_claim_id, created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NULL,?)`,
      ).run(
        c.claim_id, PLATFORM_001.platform_id, c.subject, c.value, c.unit, 'PLATFORM-001',
        c.claim_type, c.status, c.value === null ? 'NONE' : 'NOMINAL', c.source_reference,
        c.source_reference ? PLATFORM_001.revision : null, null, c.physical_verification_status, now,
      );
    }

    for (const c of PLATFORM_001_CANDIDATES) {
      db.prepare(
        `INSERT INTO ComponentCandidate
          (component_candidate_id, component_type, manufacturer, model, revision, supplier_reference,
           engineering_status, dimensions, mass, electrical_limits, thermal_limits,
           communication_requirements, mounting_requirements, source_references, created_at)
         VALUES (?,?,NULL,?,NULL,NULL,?,?,NULL,NULL,NULL,NULL,NULL,NULL,?)`,
      ).run(c.component_candidate_id, c.component_type, c.model, c.engineering_status, c.dimensions, now);
    }
  });
}
