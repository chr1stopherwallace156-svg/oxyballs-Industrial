/**
 * Build-package generator (Platform 001 slice) — the end-to-end orchestrator:
 *   load platform + claims + candidates
 *   → compatibility evaluation (rules)
 *   → open-data requirements
 *   → draft BOM
 *   → deterministic release blockers
 *   → persist one DRAFT_INCOMPLETE package + children in ONE transaction.
 *
 * Determinism: all ids and both hashes are pure functions of the canonical inputs;
 * wall-clock timestamps are recorded on rows but excluded from every hash. Re-running
 * with identical inputs replaces the same package_id with byte-identical decisions.
 */
import { DB, atomic, sha256, canonicalSerialize } from '../db';
import { ENGINE_VERSION, buildPackageId, evalId, PLATFORM_001, OdrCategory } from './model';
import { validatePlatformConfig } from './platform001';
import { runRules, EvaluationDraft } from './rules';
import { generateOdrs, OdrDraft } from './odr';
import { generateBom, BomDraft } from './bom';
import { BlockReasonRecord, PackageBlockReason, renderBlocker } from './blockReasons';

export interface GenerateOptions { requestedRevision?: string; now?: Date; }

export interface PackageSummary {
  buildPackageId: string;
  platformId: string;
  platformRevision: string;
  status: 'DRAFT_INCOMPLETE';
  inputHash: string;
  packageHash: string;
  engineVersion: string;
  evaluations: EvaluationDraft[];
  odrs: OdrDraft[];
  bom: BomDraft[];
  blockers: string[];        // rendered tokens, sorted
  counts: {
    claimsByStatus: Record<string, number>;
    evalByResult: Record<string, number>;
    bomByStatus: Record<string, number>;
    odrOpen: number;
  };
}

function loadPlatform(db: DB, platformId: string): any {
  const p = db.prepare('SELECT * FROM VehiclePlatform WHERE platform_id = ?').get(platformId);
  if (!p) throw new Error(`PLATFORM_NOT_LOADED:${platformId} — seed it first (seedPlatform001)`);
  return p;
}

/** ODR categories that are themselves hard platform/component release blockers. */
function odrBlocker(o: OdrDraft): BlockReasonRecord | null {
  const cat = o.category as OdrCategory;
  if (cat === 'BASELINE_AXLE_WEIGHT')
    return { code: PackageBlockReason.BASELINE_AXLE_WEIGHT_REQUIRED, scope: 'PLATFORM', subject: 'PLATFORM', detail: o.subject };
  if (cat === 'PHYSICAL_MEASUREMENT')
    return { code: PackageBlockReason.PHYSICAL_FRAME_MEASUREMENT_REQUIRED, scope: 'PLATFORM', subject: 'PLATFORM', detail: o.subject };
  if (cat === 'COMPONENT_MASS')
    return { code: PackageBlockReason.MASS_REQUIRED, scope: 'COMPONENT', subject: o.subject, detail: 'mass missing' };
  return null;
}

function tally<T>(items: T[], key: (t: T) => string): Record<string, number> {
  const r: Record<string, number> = {};
  for (const it of items) { const k = key(it); r[k] = (r[k] ?? 0) + 1; }
  return r;
}

export function generateBuildPackage(db: DB, opts: GenerateOptions = {}): PackageSummary {
  const platform = loadPlatform(db, PLATFORM_001.platform_id);
  validatePlatformConfig(db, platform.platform_id); // step 2: validate the configuration identity
  const requestedRevision = opts.requestedRevision ?? platform.revision;
  const now = (opts.now ?? new Date()).toISOString();

  const claims = db.prepare('SELECT * FROM EngineeringClaim WHERE platform_id = ? ORDER BY claim_id')
    .all(platform.platform_id) as any[];
  const candidates = db.prepare('SELECT * FROM ComponentCandidate ORDER BY component_candidate_id').all() as any[];

  // Canonical input → input_hash (drives the deterministic package id).
  const canonicalInput = {
    platform: {
      platform_id: platform.platform_id, revision: platform.revision,
      requestedRevision, source_authority: platform.source_authority,
      wheelbase_value: platform.wheelbase_value, wheelbase_unit: platform.wheelbase_unit,
      cab_to_axle_value: platform.cab_to_axle_value, cab_to_axle_unit: platform.cab_to_axle_unit,
      drive_configuration: platform.drive_configuration, rear_wheel_configuration: platform.rear_wheel_configuration,
    },
    claims: claims.map((c) => ({ claim_id: c.claim_id, subject: c.subject, value: c.value ?? null, unit: c.unit ?? null, status: c.status })),
    candidates: candidates.map((c) => ({ id: c.component_candidate_id, type: c.component_type, engineering_status: c.engineering_status, dimensions: c.dimensions ?? null, mass: c.mass ?? null })),
  };
  const inputHash = sha256(canonicalSerialize(canonicalInput as any));
  const packageId = buildPackageId(platform.platform_id, inputHash);

  // Evaluate → ODRs → BOM (all deterministic, in memory).
  const evaluations = runRules({ platform, requestedRevision, candidates });
  const odrs = generateOdrs(packageId, platform, claims, candidates);
  const bom = generateBom(packageId, candidates, evaluations, odrs);

  // Release blockers = evaluation blockers ∪ bom blockers ∪ ODR-derived blockers.
  const blockerRecords: BlockReasonRecord[] = [];
  for (const e of evaluations) if (e.blocker) blockerRecords.push(e.blocker);
  for (const b of bom) blockerRecords.push(...b.blockers);
  for (const o of odrs) { const rb = odrBlocker(o); if (rb) blockerRecords.push(rb); }
  const blockers = [...new Set(blockerRecords.map(renderBlocker))].sort();

  // Deterministic package content (excludes timestamps) → package_hash.
  const content = {
    platform_id: platform.platform_id, platform_revision: platform.revision,
    status: 'DRAFT_INCOMPLETE', input_hash: inputHash,
    evaluations: [...evaluations]
      .map((e) => ({ ruleId: e.ruleId, candidate: e.componentCandidateId ?? null, result: e.result, blocker: e.blocker ? renderBlocker(e.blocker) : null }))
      .sort((a, b) => (a.ruleId + (a.candidate ?? '')).localeCompare(b.ruleId + (b.candidate ?? ''))),
    odrs: odrs.map((o) => ({ odrId: o.odrId, category: o.category, subject: o.subject, status: 'OPEN' })),
    bom: bom.map((b) => ({ category: b.category, status: b.selectionStatus, selected: b.selectedComponentId ?? null, blockers: b.blockers.map(renderBlocker).sort() })),
    block_reasons: blockers,
  };
  const packageHash = sha256(canonicalSerialize(content as any));

  // Counts (derived from the same in-memory drafts that get persisted).
  const counts = {
    claimsByStatus: tally(claims, (c: any) => c.status),
    evalByResult: tally(evaluations, (e) => e.result),
    bomByStatus: tally(bom, (b) => b.selectionStatus),
    odrOpen: odrs.length,
  };

  // Persist everything as ONE atomic unit (rollback prevents partial packages).
  atomic(db, () => {
    db.prepare('DELETE FROM BomItem WHERE build_package_id = ?').run(packageId);
    db.prepare('DELETE FROM CompatibilityEvaluation WHERE build_package_id = ?').run(packageId);
    db.prepare('DELETE FROM OpenDataRequirement WHERE build_package_id = ?').run(packageId);
    db.prepare('DELETE FROM BuildPackage WHERE build_package_id = ?').run(packageId);

    db.prepare(
      `INSERT INTO BuildPackage
        (build_package_id, platform_id, platform_revision, status, component_selections, bom_items,
         compatibility_results, open_data_requirements, block_reasons, generated_at, engine_version, input_hash, package_hash)
       VALUES (?,?,?, 'DRAFT_INCOMPLETE', ?,?,?,?,?,?,?,?,?)`,
    ).run(
      packageId, platform.platform_id, platform.revision,
      JSON.stringify(bom.map((b) => ({ category: b.category, selected: b.selectedComponentId, status: b.selectionStatus }))),
      JSON.stringify(bom), JSON.stringify(content.evaluations),
      JSON.stringify(odrs.map((o) => ({ odrId: o.odrId, category: o.category, subject: o.subject }))),
      JSON.stringify(blockers), now, ENGINE_VERSION, inputHash, packageHash,
    );

    for (const e of evaluations) {
      db.prepare(
        `INSERT INTO CompatibilityEvaluation
          (evaluation_id, build_package_id, platform_id, platform_revision, component_candidate_id, rule_id,
           result, block_reason, input_snapshot, calculation_snapshot, evidence_references, evaluated_at, engine_version)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      ).run(
        evalId(packageId, platform.revision, e.componentCandidateId, e.ruleId), packageId,
        platform.platform_id, platform.revision, e.componentCandidateId, e.ruleId, e.result,
        e.blocker ? renderBlocker(e.blocker) : null, JSON.stringify(e.inputSnapshot),
        JSON.stringify(e.calculationSnapshot), null, now, ENGINE_VERSION,
      );
    }

    for (const o of odrs) {
      db.prepare(
        `INSERT INTO OpenDataRequirement
          (odr_id, build_package_id, category, subject, reason, required_for_rule, required_evidence_type, status, blocking_scope, created_at, resolved_by_claim_id)
         VALUES (?,?,?,?,?,?,?, 'OPEN', ?,?, NULL)`,
      ).run(o.odrId, packageId, o.category, o.subject, o.reason, o.requiredForRule, o.requiredEvidenceType, o.blockingScope, now);
    }

    for (const b of bom) {
      db.prepare(
        `INSERT INTO BomItem
          (bom_item_id, build_package_id, category, selected_component_id, selection_status, quantity, unit,
           required_by_rule, source_authority, open_data_requirements, block_reasons)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      ).run(
        b.bomItemId, packageId, b.category, b.selectedComponentId, b.selectionStatus, b.quantity, b.unit,
        b.requiredByRule, b.sourceAuthority, JSON.stringify(b.openDataRequirementIds), JSON.stringify(b.blockers.map(renderBlocker)),
      );
    }
  });

  return {
    buildPackageId: packageId, platformId: platform.platform_id, platformRevision: platform.revision,
    status: 'DRAFT_INCOMPLETE', inputHash, packageHash, engineVersion: ENGINE_VERSION,
    evaluations, odrs, bom, blockers, counts,
  };
}
