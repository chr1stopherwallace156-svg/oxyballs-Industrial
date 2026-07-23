import { freshMemoryDb } from '../src/db';
import { BlockError, BlockReason } from '../src/blockReasons';
import { buildAuthorizedChain, insertBase } from '../src/fixtures';
import { activate, assertConfigEquality, assertMovementAllowed } from '../src/authorization';
import { signRelease } from '../src/runout';
import { assertTransition } from '../src/stateMachine';
import { applyConfigurationChange } from '../src/configLock';
import { assertFaultExecutionAuthorized, createPairedFaultAuthorization } from '../src/faults';
import { assertInstrumentationHealthy } from '../src/instrumentation';

interface Check {
  rule: string;
  rc: string;
  kind: 'positive' | 'negative';
  reason?: BlockReason;
  run: () => void;
}

function neg(run: () => void, reason: BlockReason): void {
  try { run(); } catch (e) {
    if (e instanceof BlockError) {
      if (e.reason !== reason) throw new Error(`expected ${reason}, got ${e.reason}`);
      return;
    }
    throw e;
  }
  throw new Error(`expected BlockReason ${reason}, nothing thrown`);
}

const checks: Check[] = [
  {
    rule: 'valid chain activates + movement allowed', rc: 'RC-386/383', kind: 'positive',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); activate(db, i.testCellAuthorizationId, 'v'); assertMovementAllowed(db, i.testCellAuthorizationId); },
  },
  {
    rule: 'INITIAL_TARGET_PROFILE has no movement authority', rc: 'RC-412/267', kind: 'negative',
    reason: BlockReason.INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY,
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db, { authorityClass: 'INITIAL_TARGET_PROFILE' }); neg(() => activate(db, i.testCellAuthorizationId, 'v'), BlockReason.INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY); },
  },
  {
    rule: 'insufficient track length blocks release', rc: 'RC-383', kind: 'negative', reason: BlockReason.INSUFFICIENT_TRACK_LENGTH,
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db, { signRunout: false, availableTrackLength: 20 }); neg(() => signRelease(db, i.runoutAggregationResultId), BlockReason.INSUFFICIENT_TRACK_LENGTH); },
  },
  {
    rule: 'configuration packet mismatch blocked', rc: 'RC-409', kind: 'negative', reason: BlockReason.CONFIGURATION_PACKET_MISMATCH,
    run: () => {
      const db = freshMemoryDb(); const i = buildAuthorizedChain(db); const o = insertBase(db);
      db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id, configuration_packet_id, status, created_at) VALUES (?,?,?,?)')
        .run('RCX', o.configurationPacketId, 'DRAFT', new Date().toISOString());
      db.prepare('UPDATE TestCellAuthorization SET runout_calculations_id = ? WHERE test_cell_authorization_id = ?').run('RCX', i.testCellAuthorizationId);
      neg(() => assertConfigEquality(db, i.testCellAuthorizationId), BlockReason.CONFIGURATION_PACKET_MISMATCH);
    },
  },
  {
    rule: 'expired authorization cannot activate', rc: 'RC-388/424', kind: 'negative', reason: BlockReason.AUTHORIZATION_EXPIRED,
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); db.prepare('UPDATE TestCellAuthorization SET authorization_expiry = ? WHERE test_cell_authorization_id = ?').run(new Date(Date.now() - 1000).toISOString(), i.testCellAuthorizationId); neg(() => activate(db, i.testCellAuthorizationId, 'v'), BlockReason.AUTHORIZATION_EXPIRED); },
  },
  {
    rule: 'unsigned procedure blocks activation', rc: 'RC-355/389', kind: 'negative', reason: BlockReason.PROCEDURE_APPROVAL_MISSING,
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db, { procedureApproved: false }); neg(() => activate(db, i.testCellAuthorizationId, 'v'), BlockReason.PROCEDURE_APPROVAL_MISSING); },
  },
  {
    rule: 'illegal state transition rejected', rc: 'RC-408', kind: 'negative', reason: BlockReason.ILLEGAL_STATE_TRANSITION,
    run: () => neg(() => assertTransition('DRAFT', 'ACTIVE'), BlockReason.ILLEGAL_STATE_TRANSITION),
  },
  {
    rule: 'ACTIVE->COMPLETED cannot mutate authorization', rc: 'RC-408', kind: 'negative', reason: BlockReason.EXECUTION_COMPLETION_CANNOT_MUTATE_AUTHORIZATION,
    run: () => neg(() => assertTransition('ACTIVE', 'COMPLETED' as any), BlockReason.EXECUTION_COMPLETION_CANNOT_MUTATE_AUTHORIZATION),
  },
  {
    rule: 'signed evidence is append-only', rc: 'RC-374/410/422', kind: 'negative', reason: BlockReason.SIGNED_EVIDENCE_IS_APPEND_ONLY,
    run: () => {
      const db = freshMemoryDb();
      db.prepare('INSERT INTO SignoffRecord(signoff_record_id, signer_identity, signature_hash, timestamp) VALUES (?,?,?,?)').run('SO', 'e', 'h', new Date().toISOString());
      try { db.prepare("UPDATE SignoffRecord SET signer_identity='x' WHERE signoff_record_id='SO'").run(); throw new Error('mutation was allowed'); }
      catch (e) { if (!(e as Error).message.includes('APPEND_ONLY_VIOLATION')) throw e; }
    },
  },
  {
    rule: 'fault executed outside authorized domain blocked', rc: 'RC-380', kind: 'negative', reason: BlockReason.FAULT_EXECUTED_OUTSIDE_AUTHORIZED_DOMAIN,
    run: () => {
      const db = freshMemoryDb(); const i = buildAuthorizedChain(db);
      db.prepare("INSERT INTO HazardAnalysis(hazard_analysis_id, status) VALUES ('HA','APPROVED')").run();
      db.prepare("INSERT INTO FaultDefinition(fault_id, fault_code, fault_name, status) VALUES ('F','C','n','ACTIVE')").run();
      db.prepare(`INSERT INTO FaultExecutionAuthorization(fault_execution_authorization_id, fault_id, execution_domain, hazard_analysis_id, configuration_packet_id, test_cell_authorization_id, procedure_approval_status, status) VALUES (?,?,?,?,?,?,?,?)`)
        .run('FEA', 'F', 'HIL_ONLY', 'HA', i.configurationPacketId, i.testCellAuthorizationId, 'APPROVED', 'AUTHORIZED');
      neg(() => assertFaultExecutionAuthorized(db, 'FEA', 'LOWEST_MOVING_CELL_ALLOWED'), BlockReason.FAULT_EXECUTED_OUTSIDE_AUTHORIZED_DOMAIN);
    },
  },
  {
    rule: 'paired fault without HazardAnalysis_ID blocked', rc: 'RC-363', kind: 'negative', reason: BlockReason.PAIRED_FAULT_HAZARD_ANALYSIS_MISSING,
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); neg(() => createPairedFaultAuthorization(db, { pairedFaultAuthorizationId: 'P', hazardAnalysisId: null, allowedExecutionDomain: 'HIL_ONLY', activeTestCellId: i.testCellAuthorizationId, fault1Id: 'a', fault1ComponentId: null, fault2Id: 'b', fault2ComponentId: null, targetInjectionOrder: 'FAULT_1_THEN_FAULT_2' }), BlockReason.PAIRED_FAULT_HAZARD_ANALYSIS_MISSING); },
  },
  {
    rule: 'unhealthy instrumentation blocked', rc: 'RC-391/403', kind: 'negative', reason: BlockReason.INSTRUMENTATION_HEALTH_INVALID,
    run: () => {
      const db = freshMemoryDb();
      db.prepare(`INSERT INTO InstrumentationRecord(instrumentation_record_id, current_probe_calibration_status, current_probe_range_valid, dc_bus_sensor_status, dc_bus_sensor_range_valid, motor_speed_sensor_status, wheel_speed_sensor_status, time_sync_status, dropped_frame_count, saturation_detected, clipping_detected, sensor_fault_detected, result_status) VALUES (?, 'VALID','FAIL','VALID','PASS','VALID','VALID','SYNCHRONIZED',0,0,0,0,'INVALID')`).run('IR');
      neg(() => assertInstrumentationHealthy(db, 'IR'), BlockReason.INSTRUMENTATION_HEALTH_INVALID);
    },
  },
  {
    rule: 'configuration change suspends + revokes (movement blocked)', rc: 'RC-425', kind: 'positive',
    run: () => {
      const db = freshMemoryDb(); const i = buildAuthorizedChain(db); activate(db, i.testCellAuthorizationId, 'v');
      const r = applyConfigurationChange(db, i.configurationPacketId, 'firmware changed');
      if (!r.suspendedAuthorizations.includes(i.testCellAuthorizationId)) throw new Error('cell not suspended');
      if (!r.revokedRunout.includes(i.runoutAggregationResultId)) throw new Error('runout not revoked');
    },
  },
];

function main(): void {
  let failed = 0;
  console.log('[verify] Gate 05M-C3 Deterministic Rule Engine — verification battery\n');
  console.log('  RESULT  KIND      RC             RULE');
  console.log('  ──────  ────────  ─────────────  ────────────────────────────────────────────');
  for (const c of checks) {
    let ok = true; let err = '';
    try { c.run(); } catch (e) { ok = false; err = (e as Error).message; }
    if (!ok) failed += 1;
    console.log(`  ${ok ? 'PASS  ' : 'FAIL  '}  ${c.kind.padEnd(8)}  ${c.rc.padEnd(13)}  ${c.rule}${ok ? '' : `  <-- ${err}`}`);
  }
  console.log(`\n[verify] ${checks.length - failed}/${checks.length} checks passed`);
  if (failed > 0) { console.error('[verify] FAIL'); process.exit(1); }
  console.log('[verify] PASS');
}

main();
