/**
 * Adversarial attack harness (owner directive_04, Phases 2–3 + 5). Each probe runs
 * a real attack against a fresh migrated database and reports BLOCKED (the engine
 * stopped it) or BYPASS (a proven weakness). Report generator — exits 0; findings
 * feed VERIFICATION_REPORT.md. Reproducible: `npm run verify:attack`.
 */
import { freshMemoryDb } from '../src/db';
import { buildAuthorizedChain, insertBase } from '../src/fixtures';
import { activate } from '../src/authorization';
import { applyConfigurationChange } from '../src/configLock';
import { verifyLedgerChain } from '../src/ledger';

type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
interface Probe { id: string; name: string; severity: Severity; expect: 'BLOCKED' | 'BYPASS-IS-FINDING'; run: () => 'BLOCKED' | 'BYPASS'; }

function attempt(fn: () => void): 'BLOCKED' | 'BYPASS' {
  try { fn(); return 'BYPASS'; } catch { return 'BLOCKED'; }
}

const probes: Probe[] = [
  {
    id: 'A1', name: 'direct AUTHORIZED->ACTIVE write skipping activation preconditions (runout not released)', severity: 'CRITICAL', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db, { signRunout: false }); return attempt(() =>
      db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id=?").run(i.testCellAuthorizationId)); },
  },
  {
    id: 'A2', name: 'authorization resurrection: SUPERSEDED->ACTIVE via direct SQL', severity: 'CRITICAL', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db);
      db.prepare("UPDATE TestCellAuthorization SET status='SUPERSEDED' WHERE test_cell_authorization_id=?").run(i.testCellAuthorizationId);
      return attempt(() => db.prepare("UPDATE TestCellAuthorization SET status='ACTIVE' WHERE test_cell_authorization_id=?").run(i.testCellAuthorizationId)); },
  },
  {
    id: 'A3', name: 'mutate signed SignoffRecord', severity: 'HIGH', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb();
      db.prepare('INSERT INTO SignoffRecord(signoff_record_id,signer_identity,signature_hash,timestamp) VALUES (?,?,?,?)').run('S','e','h',new Date().toISOString());
      return attempt(() => db.prepare("UPDATE SignoffRecord SET signer_identity='x' WHERE signoff_record_id='S'").run()); },
  },
  {
    id: 'A4', name: 'revoked runout resurrection: REVOKED_PENDING_RECALCULATION->SIGNED_RELEASE', severity: 'MEDIUM', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); activate(db, i.testCellAuthorizationId, 'x');
      applyConfigurationChange(db, i.configurationPacketId, 'firmware changed');
      return attempt(() => db.prepare("UPDATE RunoutAggregationResult SET authorization_status='SIGNED_RELEASE' WHERE runout_aggregation_result_id=?").run(i.runoutAggregationResultId)); },
  },
  {
    id: 'A5', name: 'direct insert of a ready-made ACTIVE cell (skips activation)', severity: 'HIGH', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const b = insertBase(db);
      return attempt(() => db.prepare(`INSERT INTO TestCellAuthorization(test_cell_authorization_id,subgate_id,cell_number,configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,test_session_id,status) VALUES (?,?,?,?,?,?,?,?,?)`)
        .run('T1','05M-C3A',1,b.configurationPacketId,b.individualVehicleId,b.vehicleBuildId,b.platformConfigId,'TS','ACTIVE')); },
  },
  {
    id: 'A6', name: 'multiple ACTIVE cells via direct insert (NULL session)', severity: 'HIGH', expect: 'BLOCKED',
    run: () => 'BLOCKED', // overridden below
  },
  {
    id: 'A7', name: 'orphan FK insert (VehicleBuild with missing IndividualVehicle)', severity: 'HIGH', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); return attempt(() =>
      db.prepare('INSERT INTO VehicleBuild(vehicle_build_id,individual_vehicle_id,platform_configuration_id) VALUES (?,?,?)').run('VB','MISSING','P')); },
  },
  {
    id: 'A8', name: 'VIN reuse across two IndividualVehicle rows', severity: 'MEDIUM', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb();
      db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)').run('IV1','VIN-DUP','P');
      return attempt(() => db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)').run('IV2','VIN-DUP','P')); },
  },
  {
    id: 'A9', name: 'clock rollback resurrects an expired authorization (caller-supplied now)', severity: 'MEDIUM', expect: 'BYPASS-IS-FINDING',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db);
      db.prepare('UPDATE TestCellAuthorization SET authorization_expiry=? WHERE test_cell_authorization_id=?').run(new Date(Date.now()-1000).toISOString(), i.testCellAuthorizationId);
      // attacker supplies a past "now" so isExpired() returns false
      return attempt(() => activate(db, i.testCellAuthorizationId, 'x', new Date(Date.now()-3600_000))); },
  },
  {
    id: 'A10', name: 'negative / zero-length geometry (zone_end < zone_start)', severity: 'LOW', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const b = insertBase(db);
      db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id,configuration_packet_id,status,created_at) VALUES (?,?,?,?)').run('RCn',b.configurationPacketId,'DRAFT',new Date().toISOString());
      return attempt(() => db.prepare(`INSERT INTO DistanceComponent(distance_component_id,runout_calculations_id,zone_start_reference,zone_end_reference,distance_component_value,distance_component_method,uncertainty_m,included_in_l_min,included_within_component_id,overlap_review_status,authority_status) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
        .run('DCn','RCn',10,0,-10,'MEASURED',0.5,1,null,'INCLUDED_SEPARATELY','ENGINEERING_APPROVED')); },
  },
  {
    id: 'A11', name: 'delete immutable AuthorizationTransition event', severity: 'HIGH', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); activate(db, i.testCellAuthorizationId, 'x');
      return attempt(() => db.prepare('DELETE FROM AuthorizationTransition WHERE test_cell_authorization_id=?').run(i.testCellAuthorizationId)); },
  },
  {
    id: 'A12', name: 'evidence hash chain detects a forged ledger row', severity: 'HIGH', expect: 'BLOCKED',
    run: () => { const db = freshMemoryDb(); const i = buildAuthorizedChain(db); activate(db, i.testCellAuthorizationId, 'x');
      db.prepare("INSERT INTO EvidenceLedger(record_type,record_id,content_hash,prev_hash,record_hash,signer_identity,created_at) VALUES ('X','forged','h','WRONG_PREV','rh','attacker',?)").run(new Date().toISOString());
      return verifyLedgerChain(db).ok ? 'BYPASS' : 'BLOCKED'; },
  },
];

// A6: a direct NULL-session ACTIVE insert is itself forbidden (post-authoring
// state may only be reached via a governed UPDATE transition).
probes[5].run = () => {
  const db = freshMemoryDb(); const b = insertBase(db);
  return attempt(() => db.prepare(
    `INSERT INTO TestCellAuthorization(test_cell_authorization_id,subgate_id,cell_number,configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,test_session_id,status)
     VALUES (?,?,?,?,?,?,?,NULL,'ACTIVE')`,
  ).run('N1', '05M-C3A', 1, b.configurationPacketId, b.individualVehicleId, b.vehicleBuildId, b.platformConfigId));
};

function main(): void {
  console.log('[attack] Adversarial harness — real probes vs the live engine\n');
  console.log('  ID   SEV       RESULT   EXPECT               PROBE');
  console.log('  ───  ────────  ───────  ───────────────────  ──────────────────────────────────────────');
  let findings = 0;
  for (const p of probes) {
    const result = p.run();
    const isFinding = (p.expect === 'BLOCKED' && result === 'BYPASS') || (p.expect === 'BYPASS-IS-FINDING' && result === 'BYPASS');
    if (isFinding) findings += 1;
    const flag = isFinding ? '  <-- FINDING' : '';
    console.log(`  ${p.id.padEnd(3)}  ${p.severity.padEnd(8)}  ${result.padEnd(7)}  ${p.expect.padEnd(19)}  ${p.name}${flag}`);
  }
  console.log(`\n[attack] ${findings} open finding(s) across ${probes.length} probes`);
}

main();
