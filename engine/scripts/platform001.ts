/**
 * `npm run platform001:generate` — the first visible end-to-end Build Engine
 * workflow. Loads the locked Platform 001 configuration, evaluates it, generates
 * open-data requirements and a draft BOM, persists a DRAFT_INCOMPLETE build
 * package, and writes both a human-readable report and a machine-readable JSON
 * artifact. Also proves determinism by regenerating and comparing the package hash.
 */
import { join, dirname } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { openDatabase, migrate } from '../src/db';
import {
  seedPlatform001, generateBuildPackage, collectReportData, renderMarkdown, buildJsonArtifact,
} from '../src/platform';

const DB_PATH = join(process.cwd(), 'data', 'engine.db');
const OUT_DIR = join(process.cwd(), 'output', 'platform-001');
const MD_PATH = join(OUT_DIR, 'build-package.md');
const JSON_PATH = join(OUT_DIR, 'build-package.json');

function write(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function main(): void {
  const db = openDatabase(DB_PATH);
  migrate(db);
  seedPlatform001(db);

  const first = generateBuildPackage(db);
  // Determinism self-check: regenerate and compare the package hash.
  const second = generateBuildPackage(db);
  const deterministic = first.packageHash === second.packageHash && first.buildPackageId === second.buildPackageId;

  const data = collectReportData(db, first.buildPackageId);
  write(MD_PATH, renderMarkdown(data));
  write(JSON_PATH, `${JSON.stringify(buildJsonArtifact(db, first.buildPackageId), null, 2)}\n`);
  db.close();

  console.log('[platform001] PLATFORM 001 BUILD PACKAGE — DRAFT');
  console.log(`[platform001] build_package_id = ${first.buildPackageId}`);
  console.log(`[platform001] status           = ${first.status}`);
  console.log(`[platform001] input_hash        = ${first.inputHash}`);
  console.log(`[platform001] package_hash      = ${first.packageHash}`);
  console.log(`[platform001] determinism       = ${deterministic ? 'PASS (identical hash on regeneration)' : 'FAIL'}`);
  console.log(`[platform001] claims            = ${JSON.stringify(first.counts.claimsByStatus)}`);
  console.log(`[platform001] compatibility     = ${JSON.stringify(first.counts.evalByResult)}`);
  console.log(`[platform001] bom               = ${JSON.stringify(first.counts.bomByStatus)}`);
  console.log(`[platform001] open ODRs         = ${first.counts.odrOpen}`);
  console.log(`[platform001] release blockers  = ${first.blockers.length}`);
  console.log(`[platform001]   by category     = ${JSON.stringify(first.counts.blockersByCategory)}`);
  for (const b of first.structuredBlockers) console.log(`[platform001]   - [${b.category}] ${b.token}`);
  console.log(`[platform001] report            = ${MD_PATH}`);
  console.log(`[platform001] artifact          = ${JSON_PATH}`);
  if (!deterministic) { console.error('[platform001] FAIL — non-deterministic output'); process.exit(1); }
  console.log('[platform001] PASS');
}

main();
