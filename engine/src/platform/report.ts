/**
 * Report + artifact rendering for a persisted build package. Every count is read
 * back FROM THE DATABASE (not from the in-memory generation result), so the human
 * report and the machine artifact reflect exactly what was persisted.
 */
import { DB } from '../db';

const NOT_AUTHORIZED = [
  'DRAFT — INCOMPLETE',
  'NOT AUTHORIZED FOR PROCUREMENT',
  'NOT AUTHORIZED FOR FABRICATION',
  'NOT AUTHORIZED FOR INSTALLATION',
  'NOT AUTHORIZED FOR ENERGIZATION',
];

function count(db: DB, sql: string, ...args: any[]): number {
  return (db.prepare(sql).get(...args) as any).c as number;
}

export interface ReportData {
  pkg: any;
  platform: any;
  claims: { verifiedDocument: number; verifiedPhysical: number; unverified: number; conflict: number; total: number };
  bom: { resolved: number; blocked: number; unselected: number; total: number };
  compat: { pass: number; fail: number; blockedMissing: number; notApplicable: number; total: number };
  odrOpen: number;
  odrList: any[];
  blockers: string[];
}

export function collectReportData(db: DB, packageId: string): ReportData {
  const pkg = db.prepare('SELECT * FROM BuildPackage WHERE build_package_id = ?').get(packageId) as any;
  if (!pkg) throw new Error(`BUILD_PACKAGE_NOT_FOUND:${packageId}`);
  const platform = db.prepare('SELECT * FROM VehiclePlatform WHERE platform_id = ?').get(pkg.platform_id) as any;

  const claims = {
    verifiedDocument: count(db, "SELECT COUNT(*) c FROM EngineeringClaim WHERE platform_id=? AND status='VERIFIED_DOCUMENT'", pkg.platform_id),
    verifiedPhysical: count(db, "SELECT COUNT(*) c FROM EngineeringClaim WHERE platform_id=? AND status='VERIFIED_PHYSICAL'", pkg.platform_id),
    unverified: count(db, "SELECT COUNT(*) c FROM EngineeringClaim WHERE platform_id=? AND status IN ('UNVERIFIED','RESEARCH_REQUIRED','CANDIDATE')", pkg.platform_id),
    conflict: count(db, "SELECT COUNT(*) c FROM EngineeringClaim WHERE platform_id=? AND status='CONFLICT'", pkg.platform_id),
    total: count(db, 'SELECT COUNT(*) c FROM EngineeringClaim WHERE platform_id=?', pkg.platform_id),
  };
  const bom = {
    resolved: count(db, "SELECT COUNT(*) c FROM BomItem WHERE build_package_id=? AND selection_status IN ('CANDIDATE','VERIFIED_CANDIDATE')", packageId),
    blocked: count(db, "SELECT COUNT(*) c FROM BomItem WHERE build_package_id=? AND selection_status='BLOCKED'", packageId),
    unselected: count(db, "SELECT COUNT(*) c FROM BomItem WHERE build_package_id=? AND selection_status='UNSELECTED'", packageId),
    total: count(db, 'SELECT COUNT(*) c FROM BomItem WHERE build_package_id=?', packageId),
  };
  const compat = {
    pass: count(db, "SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=? AND result='PASS'", packageId),
    fail: count(db, "SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=? AND result='FAIL'", packageId),
    blockedMissing: count(db, "SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=? AND result='BLOCKED_MISSING_DATA'", packageId),
    notApplicable: count(db, "SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=? AND result='NOT_APPLICABLE'", packageId),
    total: count(db, 'SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=?', packageId),
  };
  const odrOpen = count(db, "SELECT COUNT(*) c FROM OpenDataRequirement WHERE build_package_id=? AND status='OPEN'", packageId);
  const odrList = db.prepare('SELECT odr_id, category, subject, required_evidence_type, status FROM OpenDataRequirement WHERE build_package_id=? ORDER BY category, subject').all(packageId) as any[];
  const blockers = JSON.parse(pkg.block_reasons) as string[];

  return { pkg, platform, claims, bom, compat, odrOpen, odrList, blockers };
}

export function renderMarkdown(d: ReportData): string {
  const p = d.platform;
  const L: string[] = [];
  L.push('# PLATFORM 001 BUILD PACKAGE — DRAFT');
  L.push('');
  for (const b of NOT_AUTHORIZED) L.push(`> **${b}**`);
  L.push('');
  L.push(`- Build package: \`${d.pkg.build_package_id}\``);
  L.push(`- Engine version: \`${d.pkg.engine_version}\``);
  L.push(`- Generated at: ${d.pkg.generated_at}`);
  L.push(`- Input hash: \`${d.pkg.input_hash}\``);
  L.push(`- Package hash: \`${d.pkg.package_hash}\``);
  L.push('');
  L.push('## Vehicle identity');
  L.push(`- **MATCHED** — ${p.manufacturer} ${p.model} (${p.model_year}), ${p.cab_configuration}, ${p.drive_configuration}, ${p.rear_wheel_configuration}`);
  L.push(`- Cab-to-axle: ${p.cab_to_axle_value} ${p.cab_to_axle_unit} · Wheelbase: ${p.wheelbase_value} ${p.wheelbase_unit} · Body: ${p.body_state}`);
  L.push(`- Source authority: ${p.source_authority}`);
  L.push('');
  L.push('## Configuration revision');
  L.push(`- **LOCKED** — revision \`${p.revision}\` (platform status ${p.status})`);
  L.push('');
  L.push('## Engineering claims');
  L.push(`- Verified (document): ${d.claims.verifiedDocument}`);
  L.push(`- Verified (physical): ${d.claims.verifiedPhysical}`);
  L.push(`- Unverified / candidate: ${d.claims.unverified}`);
  L.push(`- Conflict: ${d.claims.conflict}`);
  L.push(`- Total claims: ${d.claims.total}`);
  L.push('');
  L.push('## Component categories');
  L.push(`- Resolved candidates: ${d.bom.resolved}`);
  L.push(`- Blocked candidates: ${d.bom.blocked}`);
  L.push(`- Unselected: ${d.bom.unselected}`);
  L.push(`- Total categories: ${d.bom.total}`);
  L.push('');
  L.push('## Compatibility');
  L.push(`- PASS: ${d.compat.pass}`);
  L.push(`- FAIL: ${d.compat.fail}`);
  L.push(`- BLOCKED_MISSING_DATA: ${d.compat.blockedMissing}`);
  L.push(`- NOT_APPLICABLE: ${d.compat.notApplicable}`);
  L.push('');
  L.push('## Open-data requirements');
  L.push(`- ${d.odrOpen} OPEN`);
  L.push('');
  L.push('| ODR | Category | Subject | Evidence needed |');
  L.push('|---|---|---|---|');
  for (const o of d.odrList) L.push(`| \`${o.odr_id}\` | ${o.category} | ${o.subject} | ${o.required_evidence_type} |`);
  L.push('');
  L.push('## Overall result');
  L.push(`- **${d.pkg.status}**`);
  L.push('');
  L.push('## Release blockers');
  if (d.blockers.length === 0) L.push('- (none)');
  for (const b of d.blockers) L.push(`- ${b}`);
  L.push('');
  L.push('## What prevents release');
  L.push('This package is a controlled DRAFT. It is **not** an approval and makes **no**');
  L.push('claim that the conversion is safe, complete, or authorized. Release is blocked');
  L.push('until every open-data requirement above is closed with verified evidence and');
  L.push('every category has a verified component selection. Nothing here authorizes');
  L.push('procurement, fabrication, installation, or energization.');
  L.push('');
  return L.join('\n');
}

export function buildJsonArtifact(db: DB, packageId: string): Record<string, unknown> {
  const d = collectReportData(db, packageId);
  const evaluations = db.prepare('SELECT evaluation_id, rule_id, component_candidate_id, result, block_reason FROM CompatibilityEvaluation WHERE build_package_id=? ORDER BY evaluation_id').all(packageId);
  const odrs = db.prepare('SELECT odr_id, category, subject, reason, required_for_rule, required_evidence_type, status, blocking_scope FROM OpenDataRequirement WHERE build_package_id=? ORDER BY odr_id').all(packageId);
  const bom = db.prepare('SELECT bom_item_id, category, selected_component_id, selection_status, open_data_requirements, block_reasons FROM BomItem WHERE build_package_id=? ORDER BY category').all(packageId);
  return {
    disclaimer: NOT_AUTHORIZED,
    build_package: {
      build_package_id: d.pkg.build_package_id, platform_id: d.pkg.platform_id, platform_revision: d.pkg.platform_revision,
      status: d.pkg.status, engine_version: d.pkg.engine_version, generated_at: d.pkg.generated_at,
      input_hash: d.pkg.input_hash, package_hash: d.pkg.package_hash,
    },
    counts: { claims: d.claims, bom: d.bom, compatibility: d.compat, open_data_requirements_open: d.odrOpen },
    release_blockers: d.blockers,
    compatibility_evaluations: evaluations,
    open_data_requirements: odrs,
    bom_items: bom,
  };
}
