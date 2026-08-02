/**
 * Adversarial harness for the Platform 001 build-package generator (owner exec
 * step 7 — "attack the package generator"). Each probe runs a real attack against a
 * fresh migrated + seeded database and reports BLOCKED (the engine stopped it) or
 * BYPASS (a weakness). Reproducible: `npm run verify:attack:package`.
 */
import { freshMemoryDb } from '../src/db';
import { seedPlatform001, generateBuildPackage, validatePlatformConfig, PLATFORM_001 } from '../src/platform';

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
interface Probe { id: string; name: string; severity: Severity; run: () => 'BLOCKED' | 'BYPASS'; }

function attempt(fn: () => void): 'BLOCKED' | 'BYPASS' {
  try { fn(); return 'BYPASS'; } catch { return 'BLOCKED'; }
}
function seeded() { const db = freshMemoryDb(); seedPlatform001(db); return db; }

const probes: Probe[] = [
  {
    id: 'P1', name: 'set a build package to APPROVED (must be impossible)', severity: 'CRITICAL',
    run: () => { const db = seeded(); const r = generateBuildPackage(db);
      return attempt(() => db.prepare('UPDATE BuildPackage SET status=? WHERE build_package_id=?').run('APPROVED', r.buildPackageId)); },
  },
  {
    id: 'P2', name: 'insert a build package with a forbidden AUTHORIZED_FOR_HV status', severity: 'CRITICAL',
    run: () => { const db = seeded();
      return attempt(() => db.prepare(`INSERT INTO BuildPackage(build_package_id,platform_id,platform_revision,status,component_selections,bom_items,compatibility_results,open_data_requirements,block_reasons,generated_at,engine_version,input_hash,package_hash) VALUES ('X',?, 'R1','AUTHORIZED_FOR_HV','[]','[]','[]','[]','[]','t','v','i','p')`).run(PLATFORM_001.platform_id)); },
  },
  {
    id: 'P3', name: 'missing-data evaluation is reported as PASS (must never happen)', severity: 'HIGH',
    run: () => { const db = seeded(); const r = generateBuildPackage(db);
      // BYPASS iff any BLOCKED_MISSING_DATA input was scored PASS anywhere.
      const bad = r.evaluations.some((e) => e.result === 'PASS' && e.blocker !== null);
      const missingPassed = r.evaluations.some((e) => e.ruleId === 'RULE_COMPONENT_DIMENSIONS_PRESENT'
        && e.componentCandidateId && e.result === 'PASS');
      return (bad || missingPassed) ? 'BYPASS' : 'BLOCKED'; },
  },
  {
    id: 'P4', name: 'regeneration is non-deterministic (hash differs for identical inputs)', severity: 'HIGH',
    run: () => { const db = seeded(); const a = generateBuildPackage(db); const b = generateBuildPackage(db);
      return (a.packageHash === b.packageHash && a.buildPackageId === b.buildPackageId) ? 'BLOCKED' : 'BYPASS'; },
  },
  {
    id: 'P5', name: 'input tamper is invisible (package hash unchanged after a claim change)', severity: 'HIGH',
    run: () => { const db = seeded(); const a = generateBuildPackage(db);
      db.prepare("UPDATE EngineeringClaim SET value=4000, status='VERIFIED_DOCUMENT' WHERE claim_id='CLAIM-P001-REAR-AXLE-WEIGHT'").run();
      const b = generateBuildPackage(db);
      return a.packageHash !== b.packageHash ? 'BLOCKED' : 'BYPASS'; },
  },
  {
    id: 'P6', name: 'a superseded component is selected into the BOM', severity: 'HIGH',
    run: () => { const db = seeded();
      db.prepare(`INSERT INTO ComponentCandidate(component_candidate_id,component_type,engineering_status,dimensions,created_at) VALUES ('CCS','INVERTER','SUPERSEDED','{"x":1}',?)`).run(new Date().toISOString());
      const r = generateBuildPackage(db); const inv = r.bom.find((b) => b.category === 'INVERTER')!;
      return inv.selectedComponentId === null ? 'BLOCKED' : 'BYPASS'; },
  },
  {
    id: 'P7', name: 'a BOM item accepts an out-of-enum selection status', severity: 'MEDIUM',
    run: () => { const db = seeded(); const r = generateBuildPackage(db);
      return attempt(() => db.prepare("UPDATE BomItem SET selection_status='APPROVED' WHERE build_package_id=?").run(r.buildPackageId)); },
  },
  {
    id: 'P8', name: 'a tampered platform config generates a package anyway', severity: 'HIGH',
    run: () => { const db = seeded();
      db.prepare("UPDATE VehiclePlatform SET drive_configuration='4x4' WHERE platform_id=?").run(PLATFORM_001.platform_id);
      return attempt(() => { validatePlatformConfig(db); generateBuildPackage(db); }); },
  },
  {
    id: 'P9', name: 'an ODR accepts an out-of-enum category', severity: 'MEDIUM',
    run: () => { const db = seeded(); const r = generateBuildPackage(db);
      return attempt(() => db.prepare("INSERT INTO OpenDataRequirement(odr_id,build_package_id,category,subject,reason,required_evidence_type,status,blocking_scope,created_at) VALUES ('OX',?, 'NONSENSE','s','r','e','OPEN','PLATFORM','t')").run(r.buildPackageId)); },
  },
];

function main(): void {
  console.log('[pkg-attack] Adversarial harness — Platform 001 build-package generator\n');
  console.log('  ID   SEV       RESULT   PROBE');
  console.log('  ───  ────────  ───────  ────────────────────────────────────────────────');
  let findings = 0;
  for (const p of probes) {
    const result = p.run();
    if (result === 'BYPASS') findings += 1;
    console.log(`  ${p.id.padEnd(3)}  ${p.severity.padEnd(8)}  ${result.padEnd(7)}  ${p.name}${result === 'BYPASS' ? '  <-- FINDING' : ''}`);
  }
  console.log(`\n[pkg-attack] ${findings} open finding(s) across ${probes.length} probes`);
  if (findings > 0) process.exit(1);
  console.log('[pkg-attack] PASS');
}

main();
