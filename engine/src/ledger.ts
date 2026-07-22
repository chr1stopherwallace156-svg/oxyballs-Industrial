import { DB, sha256, canonicalSerialize, recordHash } from './db';

/**
 * FINDING A12 fix — an enforced, verifiable evidence hash chain (RC-423). Each
 * appended row links to the previous by hash, so deletion/reordering of evidence
 * is detectable. The EvidenceLedger table is INSERT-only (triggers, migration 003).
 */
export function appendLedger(
  db: DB,
  recordType: string,
  recordId: string,
  content: Record<string, unknown>,
  signerIdentity: string,
): string {
  const last = db.prepare('SELECT record_hash FROM EvidenceLedger ORDER BY seq DESC LIMIT 1').get() as any;
  const prevHash = last ? (last.record_hash as string) : '';
  const contentHash = sha256(canonicalSerialize(content));
  const timestamp = new Date().toISOString();
  const rHash = recordHash({ content, previousRecordHash: prevHash, artifactHashes: [contentHash], timestamp, signerIdentity });
  db.prepare(
    `INSERT INTO EvidenceLedger (record_type, record_id, content_hash, prev_hash, record_hash, signer_identity, created_at)
     VALUES (?,?,?,?,?,?,?)`,
  ).run(recordType, recordId, contentHash, prevHash, rHash, signerIdentity, timestamp);
  return rHash;
}

export interface ChainVerification { ok: boolean; length: number; brokenAtSeq?: number; reason?: string; }

/** Verify prev_hash linkage across the whole ledger (tamper / reorder / gap detection). */
export function verifyLedgerChain(db: DB): ChainVerification {
  const rows = db.prepare('SELECT seq, prev_hash, record_hash FROM EvidenceLedger ORDER BY seq ASC').all() as any[];
  let expectedPrev = '';
  for (const r of rows) {
    if (r.prev_hash !== expectedPrev) {
      return { ok: false, length: rows.length, brokenAtSeq: r.seq, reason: `prev_hash mismatch at seq ${r.seq}` };
    }
    expectedPrev = r.record_hash;
  }
  return { ok: true, length: rows.length };
}
