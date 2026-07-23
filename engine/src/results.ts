import { DB } from './db';
import { BlockReason, block } from './blockReasons';

/**
 * RC-371: COMPLETED / EXECUTED never clears a gate. Only a matching SIGNED_PASS
 * result satisfies a gate requirement. Throws otherwise.
 */
export function assertGateCleared(db: DB, testResultId: string): void {
  const r = db.prepare('SELECT result_status FROM TestResult WHERE test_result_id = ?').get(testResultId) as any;
  block(!!r, BlockReason.ORPHANED_REFERENCE, `TestResult ${testResultId} not found`);
  block(r.result_status === 'SIGNED_PASS', BlockReason.RESULT_NOT_SIGNED_PASS,
    `result_status=${r.result_status} (only SIGNED_PASS clears a gate)`);
}

/**
 * RC-374/410: corrections to signed evidence are appended, never overwritten.
 * Applicability changes + supersession are new TestResultAnnotation records.
 */
export function appendAnnotation(
  db: DB,
  testResultId: string,
  type: 'ANNOTATION' | 'SUPERSESSION' | 'APPLICABILITY_CHANGE' | 'IMPACT_REVIEW',
  body: string,
  actor: string,
): string {
  const id = `TRA_${testResultId}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  db.prepare(
    `INSERT INTO TestResultAnnotation (test_result_annotation_id, test_result_id, annotation_type, body, actor_identity, timestamp)
     VALUES (?,?,?,?,?,?)`,
  ).run(id, testResultId, type, body, actor, new Date().toISOString());
  return id;
}
