import { test } from 'node:test';
import assert from 'node:assert/strict';

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { freshMemoryDb, atomic, openDatabase, migrate } from '../src/db';
import {
  seedPlatform001, validatePlatformConfig, generateBuildPackage, collectReportData,
  BOM_CATEGORIES, PLATFORM_001, ENGINE_VERSION,
} from '../src/platform';
import { expectThrowsMessage } from './helpers';

function setup() {
  const db = freshMemoryDb();
  seedPlatform001(db);
  return db;
}

// 1 — the exact Platform 001 configuration loads and validates
test('platform: exact Platform 001 configuration loads and validates', () => {
  const db = setup();
  const p = db.prepare('SELECT * FROM VehiclePlatform WHERE platform_id=?').get(PLATFORM_001.platform_id) as any;
  assert.equal(p.model, 'F-450 Super Duty Chassis Cab');
  assert.equal(p.drive_configuration, '4x2');
  assert.equal(p.wheelbase_value, 145.3);
  assert.equal(p.wheelbase_unit, 'in');
  assert.doesNotThrow(() => validatePlatformConfig(db));
});

// 2 — wrong wheelbase rejected by config-identity validation
test('platform: a wrong wheelbase is rejected', () => {
  const db = setup();
  db.prepare('UPDATE VehiclePlatform SET wheelbase_value=999 WHERE platform_id=?').run(PLATFORM_001.platform_id);
  expectThrowsMessage(() => validatePlatformConfig(db), 'PLATFORM_CONFIG_MISMATCH');
  expectThrowsMessage(() => generateBuildPackage(db), 'PLATFORM_CONFIG_MISMATCH');
});

// 3 — wrong drive configuration rejected
test('platform: a wrong drive configuration is rejected', () => {
  const db = setup();
  db.prepare("UPDATE VehiclePlatform SET drive_configuration='4x4' WHERE platform_id=?").run(PLATFORM_001.platform_id);
  expectThrowsMessage(() => validatePlatformConfig(db), 'PLATFORM_CONFIG_MISMATCH');
});

// 4 — unknown unit rejected by the unit-validity rule (result FAIL / UNKNOWN_UNIT)
test('platform: an unknown wheelbase unit produces a FAIL (UNKNOWN_UNIT)', () => {
  const db = setup();
  db.prepare("UPDATE VehiclePlatform SET wheelbase_unit='furlong' WHERE platform_id=?").run(PLATFORM_001.platform_id);
  const r = generateBuildPackage(db);
  const wb = r.evaluations.find((e) => e.ruleId === 'RULE_PLATFORM_WHEELBASE_PRESENT')!;
  assert.equal(wb.result, 'FAIL');
  assert.equal(wb.blocker?.code, 'UNKNOWN_UNIT');
  assert.ok(r.blockers.includes('BLOCKED:UNKNOWN_UNIT'));
});

// 5 — a missing required value creates an ODR
test('platform: a missing engineering value creates an OpenDataRequirement', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const axle = r.odrs.find((o) => o.category === 'BASELINE_AXLE_WEIGHT');
  assert.ok(axle, 'expected a BASELINE_AXLE_WEIGHT ODR');
  const persisted = db.prepare("SELECT COUNT(*) c FROM OpenDataRequirement WHERE category='BASELINE_AXLE_WEIGHT' AND status='OPEN'").get() as any;
  assert.ok(persisted.c >= 1);
});

// 6 — an unverified component cannot pass
test('platform: an UNVERIFIED component cannot pass', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const statusEvals = r.evaluations.filter((e) => e.ruleId === 'RULE_COMPONENT_ENGINEERING_STATUS');
  assert.ok(statusEvals.length >= 1);
  assert.ok(statusEvals.every((e) => e.result !== 'PASS'));
  assert.ok(statusEvals.some((e) => e.blocker?.code === 'COMPONENT_UNVERIFIED'));
});

// 7 — a superseded component cannot be selected
test('platform: a SUPERSEDED component cannot be selected', () => {
  const db = setup();
  const now = new Date().toISOString();
  db.prepare(`INSERT INTO ComponentCandidate(component_candidate_id,component_type,engineering_status,dimensions,created_at)
              VALUES ('CC-SUP','INVERTER','SUPERSEDED','{"l_mm":1}',?)`).run(now);
  const r = generateBuildPackage(db);
  const inv = r.bom.find((b) => b.category === 'INVERTER')!;
  assert.notEqual(inv.selectionStatus, 'VERIFIED_CANDIDATE');
  assert.notEqual(inv.selectionStatus, 'CANDIDATE');
  assert.equal(inv.selectedComponentId, null); // a superseded revision is never selected
  assert.ok(inv.blockers.some((b) => b.code === 'SUPERSEDED_COMPONENT_SELECTED'));
});

// 8 — missing dimensions produce BLOCKED_MISSING_DATA
test('platform: missing dimensions produce BLOCKED_MISSING_DATA', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const dim = r.evaluations.find((e) => e.ruleId === 'RULE_COMPONENT_DIMENSIONS_PRESENT')!;
  assert.equal(dim.result, 'BLOCKED_MISSING_DATA');
  assert.equal(dim.blocker?.code, 'DIMENSIONS_REQUIRED');
});

// 9 — identical canonical inputs produce identical decisions
test('platform: identical inputs produce identical package hash + id', () => {
  const db = setup();
  const a = generateBuildPackage(db);
  const b = generateBuildPackage(db);
  assert.equal(a.buildPackageId, b.buildPackageId);
  assert.equal(a.inputHash, b.inputHash);
  assert.equal(a.packageHash, b.packageHash);
});

// 10 — package hash changes when an engineering input changes
test('platform: package hash changes when an engineering input changes', () => {
  const db = setup();
  const before = generateBuildPackage(db);
  // Provide the previously-missing rear axle weight — an engineering input change.
  db.prepare("UPDATE EngineeringClaim SET value=?, unit='lb', status='VERIFIED_DOCUMENT' WHERE claim_id='CLAIM-P001-REAR-AXLE-WEIGHT'").run(4000);
  const after = generateBuildPackage(db);
  assert.notEqual(before.inputHash, after.inputHash);
  assert.notEqual(before.packageHash, after.packageHash);
});

// 11 — no package can receive an approved status (DB CHECK)
test('platform: a build package cannot be set to an approved status', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  for (const bad of ['APPROVED', 'RELEASED', 'AUTHORIZED_FOR_BUILD', 'AUTHORIZED_FOR_HV']) {
    expectThrowsMessage(
      () => db.prepare('UPDATE BuildPackage SET status=? WHERE build_package_id=?').run(bad, r.buildPackageId),
      'CHECK constraint failed',
    );
  }
  const still = db.prepare('SELECT status FROM BuildPackage WHERE build_package_id=?').get(r.buildPackageId) as any;
  assert.equal(still.status, 'DRAFT_INCOMPLETE');
});

// 12 — the BOM contains every required category, exactly once
test('platform: BOM contains every required category exactly once', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const cats = db.prepare('SELECT category FROM BomItem WHERE build_package_id=? ORDER BY category').all(r.buildPackageId).map((x: any) => x.category);
  assert.equal(cats.length, BOM_CATEGORIES.length);
  assert.deepEqual([...cats].sort(), [...BOM_CATEGORIES].sort());
});

// 13 — generated report counts match persisted records
test('platform: report counts match persisted database records', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const d = collectReportData(db, r.buildPackageId);
  const bomTotal = (db.prepare('SELECT COUNT(*) c FROM BomItem WHERE build_package_id=?').get(r.buildPackageId) as any).c;
  const evalTotal = (db.prepare('SELECT COUNT(*) c FROM CompatibilityEvaluation WHERE build_package_id=?').get(r.buildPackageId) as any).c;
  assert.equal(d.bom.total, bomTotal);
  assert.equal(d.compat.total, evalTotal);
  assert.equal(d.bom.resolved + d.bom.blocked + d.bom.unselected, bomTotal);
  assert.equal(d.compat.pass + d.compat.fail + d.compat.blockedMissing + d.compat.notApplicable, evalTotal);
  // report counts also agree with the in-memory generation result
  assert.equal(d.compat.pass, r.counts.evalByResult.PASS ?? 0);
  assert.equal(d.odrOpen, r.counts.odrOpen);
});

// 15 — release blockers are categorized and the category counts sum to the total
test('platform: release blockers are categorized (Research/Configuration/Components/Verification)', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const byCat = r.counts.blockersByCategory;
  const sum = Object.values(byCat).reduce((a, b) => a + b, 0);
  assert.equal(sum, r.blockers.length);
  // every structured blocker carries a known category
  const known = new Set(['RESEARCH', 'CONFIGURATION', 'COMPONENTS', 'VERIFICATION']);
  assert.ok(r.structuredBlockers.every((b) => known.has(b.category)));
  // the seeded locked config: most blockers are unselected components; motor drives
  // RESEARCH (dims/mass) + VERIFICATION (unverified); axle weights drive RESEARCH.
  assert.ok((byCat.COMPONENTS ?? 0) >= 1);
  assert.ok((byCat.RESEARCH ?? 0) >= 1);
  assert.ok((byCat.VERIFICATION ?? 0) >= 1);
  // the report exposes the same category counts read back from the DB
  const d = collectReportData(db, r.buildPackageId);
  assert.deepEqual(d.blockersByCategory, { ...{ RESEARCH: 0, CONFIGURATION: 0, COMPONENTS: 0, VERIFICATION: 0 }, ...byCat });
});

// 17 — PERSISTENT FILE DB: regenerating twice is idempotent, non-destructive, and
//      never fails an FK constraint; unrelated core records are preserved.
test('platform: repeat generation on a PERSISTENT file DB preserves unrelated data (no rm, no FK error)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'elektron-persist-'));
  const dbPath = join(dir, 'engine.db');
  try {
    const db = openDatabase(dbPath);
    migrate(db);

    // Sentinel records in unrelated CORE tables that must survive regeneration.
    db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)')
      .run('IV-SENTINEL', 'VIN-SENTINEL-001', 'PLATFORM-001');
    db.prepare('INSERT INTO VehicleBuild(vehicle_build_id,individual_vehicle_id,platform_configuration_id) VALUES (?,?,?)')
      .run('VB-SENTINEL', 'IV-SENTINEL', 'PLATFORM_001A');
    db.prepare(`INSERT INTO EvidenceLedger(record_type,record_id,content_hash,prev_hash,record_hash,signer_identity,created_at)
                VALUES ('SENTINEL','R-SENTINEL','ch','','rh','sentinel.signer',?)`).run(new Date().toISOString());

    // First generation.
    seedPlatform001(db);
    const a = generateBuildPackage(db);
    // Second generation on the SAME persistent DB — this used to throw
    // 'FOREIGN KEY constraint failed'. It must now succeed and be identical.
    seedPlatform001(db);
    const b = generateBuildPackage(db);

    assert.equal(a.buildPackageId, b.buildPackageId);
    assert.equal(a.packageHash, b.packageHash);        // deterministic across runs
    assert.equal(a.inputHash, b.inputHash);

    // Unrelated core records are fully intact (nothing was wiped).
    assert.equal((db.prepare("SELECT COUNT(*) c FROM EvidenceLedger WHERE record_id='R-SENTINEL'").get() as any).c, 1);
    assert.equal((db.prepare("SELECT COUNT(*) c FROM IndividualVehicle WHERE individual_vehicle_id='IV-SENTINEL'").get() as any).c, 1);
    assert.equal((db.prepare("SELECT COUNT(*) c FROM VehicleBuild WHERE vehicle_build_id='VB-SENTINEL'").get() as any).c, 1);

    // Platform data is correctly present (re-seeded, single copy).
    assert.equal((db.prepare("SELECT COUNT(*) c FROM VehiclePlatform WHERE platform_id='PLATFORM-001'").get() as any).c, 1);
    assert.equal((db.prepare("SELECT COUNT(*) c FROM BuildPackage WHERE platform_id='PLATFORM-001'").get() as any).c, 1);
    db.close();
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// 16 — transaction rollback prevents partial package creation
test('platform: a mid-persist failure rolls back — no partial package', () => {
  const db = setup();
  const r = generateBuildPackage(db);
  const pkgBefore = (db.prepare('SELECT COUNT(*) c FROM BuildPackage').get() as any).c;
  const bomBefore = (db.prepare('SELECT COUNT(*) c FROM BomItem').get() as any).c;
  // Simulate a partial persist: insert a new package + a duplicate-category BOM pair.
  assert.throws(() => atomic(db, () => {
    db.prepare(`INSERT INTO BuildPackage(build_package_id,platform_id,platform_revision,status,component_selections,bom_items,compatibility_results,open_data_requirements,block_reasons,generated_at,engine_version,input_hash,package_hash)
                VALUES ('BP-ROLLBACK',?, 'R1','DRAFT_INCOMPLETE','[]','[]','[]','[]','[]',?,?, 'ih','ph')`).run(PLATFORM_001.platform_id, new Date().toISOString(), ENGINE_VERSION);
    db.prepare("INSERT INTO BomItem(bom_item_id,build_package_id,category,selection_status) VALUES ('B1','BP-ROLLBACK','TRACTION_BATTERY','UNSELECTED')").run();
    db.prepare("INSERT INTO BomItem(bom_item_id,build_package_id,category,selection_status) VALUES ('B2','BP-ROLLBACK','TRACTION_BATTERY','UNSELECTED')").run(); // UNIQUE violation
  }));
  const pkgAfter = (db.prepare('SELECT COUNT(*) c FROM BuildPackage').get() as any).c;
  const bomAfter = (db.prepare('SELECT COUNT(*) c FROM BomItem').get() as any).c;
  assert.equal(pkgAfter, pkgBefore); // the failed package left nothing behind
  assert.equal(bomAfter, bomBefore);
  assert.equal((db.prepare("SELECT COUNT(*) c FROM BuildPackage WHERE build_package_id='BP-ROLLBACK'").get() as any).c, 0);
});
