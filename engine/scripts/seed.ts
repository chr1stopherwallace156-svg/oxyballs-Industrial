import { join } from 'node:path';
import { rmSync } from 'node:fs';
import { openDatabase, migrate } from '../src/db';
import { buildAuthorizedChain } from '../src/fixtures';

const DB_PATH = join(process.cwd(), 'data', 'engine.db');

/**
 * Seed: a clean, deterministic dataset for the frozen Gate 05M-C3 spec that
 * contains NO fake approvals and NO passes (RC-355/389). Everything is DRAFT /
 * unapproved / not-executed. This is the doctrine seed, not demo data.
 */
function main(): void {
  rmSync(DB_PATH, { force: true });
  const db = openDatabase(DB_PATH);
  migrate(db);

  // A draft chain: runout NOT released, procedure NOT approved, TCA in DRAFT.
  buildAuthorizedChain(db, {
    procedureApproved: false,
    signRunout: false,
    status: 'DRAFT',
  });

  // Invariant: seed contains no approvals and no passes.
  const approvedProcedures = (db.prepare("SELECT COUNT(*) c FROM ProcedureApproval WHERE status = 'APPROVED'").get() as any).c;
  const signedResults = (db.prepare("SELECT COUNT(*) c FROM TestResult WHERE result_status IN ('SIGNED_PASS','SIGNED_FAIL')").get() as any).c;
  const releasedRunout = (db.prepare("SELECT COUNT(*) c FROM RunoutAggregationResult WHERE authorization_status = 'SIGNED_RELEASE'").get() as any).c;
  const activeCells = (db.prepare("SELECT COUNT(*) c FROM TestCellAuthorization WHERE status = 'ACTIVE'").get() as any).c;

  if (approvedProcedures !== 0 || signedResults !== 0 || releasedRunout !== 0 || activeCells !== 0) {
    console.error(`[seed] FAIL — seed must contain no approvals/passes/active cells; found approved=${approvedProcedures} signed=${signedResults} released=${releasedRunout} active=${activeCells}`);
    process.exit(1);
  }

  const tca = (db.prepare('SELECT COUNT(*) c FROM TestCellAuthorization').get() as any).c;
  db.close();
  console.log(`[seed] db=${DB_PATH}`);
  console.log(`[seed] seeded a DRAFT chain (TestCellAuthorization rows: ${tca})`);
  console.log('[seed] invariants OK: 0 approvals, 0 signed passes, 0 released runout, 0 active cells');
  console.log('[seed] PASS');
}

main();
