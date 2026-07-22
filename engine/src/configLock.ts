import { DB } from './db';
import { appendAnnotation } from './results';

/**
 * M10D — Configuration-lock enforcement (RC-353/425). A configuration-hash change
 * atomically drives the dependent records; historical evidence is PRESERVED
 * (append-only). Returns the impact-review id + affected record ids.
 */
export interface ConfigChangeResult {
  impactReviewId: string;
  suspendedAuthorizations: string[];
  revokedRunout: string[];
  suspendedFaultAuthorizations: string[];
  invalidatedResults: string[];
}

function recordTransition(db: DB, tcaId: string, from: string, to: string, reason: string): void {
  const tid = `AT_${tcaId}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  db.prepare(
    `INSERT INTO AuthorizationTransition
      (authorization_transition_id, test_cell_authorization_id, from_status, to_status, transition_reason, actor_identity, timestamp)
     VALUES (?,?,?,?,?,?,?)`,
  ).run(tid, tcaId, from, to, reason, 'system:config-change', new Date().toISOString());
  db.prepare('UPDATE TestCellAuthorization SET status = ? WHERE test_cell_authorization_id = ?').run(to, tcaId);
}

export function applyConfigurationChange(db: DB, configurationPacketId: string, reason: string): ConfigChangeResult {
  const impactReviewId = `IMPACT_${configurationPacketId}_${Date.now()}`;

  db.exec('BEGIN');
  try {
    // Active/authorized cells for this config → SUSPENDED (movement authority → BLOCKED).
    const tcas = db.prepare(
      "SELECT test_cell_authorization_id, status FROM TestCellAuthorization WHERE configuration_packet_id = ? AND status IN ('ACTIVE','AUTHORIZED')",
    ).all(configurationPacketId) as any[];
    const suspendedAuthorizations: string[] = [];
    for (const t of tcas) {
      recordTransition(db, t.test_cell_authorization_id, t.status, 'SUSPENDED', `config-change: ${reason}`);
      suspendedAuthorizations.push(t.test_cell_authorization_id);
    }

    // SIGNED_RELEASE runout results for this config → REVOKED_PENDING_RECALCULATION.
    const rars = db.prepare(
      "SELECT runout_aggregation_result_id FROM RunoutAggregationResult WHERE configuration_packet_id = ? AND authorization_status = 'SIGNED_RELEASE'",
    ).all(configurationPacketId) as any[];
    const revokedRunout: string[] = [];
    for (const r of rars) {
      db.prepare("UPDATE RunoutAggregationResult SET authorization_status = 'REVOKED_PENDING_RECALCULATION' WHERE runout_aggregation_result_id = ?")
        .run(r.runout_aggregation_result_id);
      revokedRunout.push(r.runout_aggregation_result_id);
    }

    // Active fault authorizations for this config → SUSPENDED.
    const feas = db.prepare(
      "SELECT fault_execution_authorization_id FROM FaultExecutionAuthorization WHERE configuration_packet_id = ? AND status IN ('ACTIVE','AUTHORIZED')",
    ).all(configurationPacketId) as any[];
    const suspendedFaultAuthorizations: string[] = [];
    for (const f of feas) {
      db.prepare("UPDATE FaultExecutionAuthorization SET status = 'SUSPENDED', configuration_impact_status = 'INVALIDATED_FOR_CURRENT_CONFIGURATION' WHERE fault_execution_authorization_id = ?")
        .run(f.fault_execution_authorization_id);
      suspendedFaultAuthorizations.push(f.fault_execution_authorization_id);
    }

    // Signed results for this config → applicability INVALIDATED, recorded as an
    // APPLICABILITY_CHANGE annotation (append-only; the signed row is NOT mutated).
    const results = db.prepare(
      "SELECT test_result_id FROM TestResult WHERE configuration_packet_id = ? AND result_status IN ('SIGNED_PASS','SIGNED_FAIL')",
    ).all(configurationPacketId) as any[];
    const invalidatedResults: string[] = [];
    for (const res of results) {
      appendAnnotation(db, res.test_result_id, 'APPLICABILITY_CHANGE',
        `INVALIDATED_BY_CONFIGURATION_CHANGE (${impactReviewId}): ${reason}`, 'system:config-change');
      appendAnnotation(db, res.test_result_id, 'IMPACT_REVIEW', impactReviewId, 'system:config-change');
      invalidatedResults.push(res.test_result_id);
    }

    db.exec('COMMIT');
    return { impactReviewId, suspendedAuthorizations, revokedRunout, suspendedFaultAuthorizations, invalidatedResults };
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
}
