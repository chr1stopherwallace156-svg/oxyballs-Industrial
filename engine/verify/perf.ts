/**
 * Performance harness (owner directive_04, Phase 6). Measures real insert/query
 * timing + on-disk size at increasing vehicle counts, on the actual schema.
 * Reproducible: `npm run verify:perf`.
 */
import { join } from 'node:path';
import { rmSync, statSync, existsSync } from 'node:fs';
import { openDatabase, migrate } from '../src/db';

function seedVehicles(dbPath: string, n: number): { insertMs: number; sizeBytes: number; joinQueryMs: number } {
  rmSync(dbPath, { force: true });
  const db = openDatabase(dbPath);
  migrate(db);
  const t0 = performance.now();
  db.exec('BEGIN');
  const iv = db.prepare('INSERT INTO IndividualVehicle(individual_vehicle_id,vin,platform_id) VALUES (?,?,?)');
  const vb = db.prepare('INSERT INTO VehicleBuild(vehicle_build_id,individual_vehicle_id,platform_configuration_id) VALUES (?,?,?)');
  const cp = db.prepare('INSERT INTO ConfigurationPacket(configuration_packet_id,individual_vehicle_id,vehicle_build_id,platform_configuration_id,config_hash,status,created_at) VALUES (?,?,?,?,?,?,?)');
  const rc = db.prepare('INSERT INTO RunoutCalculations(runout_calculations_id,configuration_packet_id,status,created_at) VALUES (?,?,?,?)');
  const now = new Date().toISOString();
  for (let i = 0; i < n; i += 1) {
    iv.run(`IV${i}`, `VIN${i}`, 'PLATFORM_001A');
    vb.run(`VB${i}`, `IV${i}`, 'PLATFORM_001A');
    cp.run(`CP${i}`, `IV${i}`, `VB${i}`, 'PLATFORM_001A', `H${i}`, 'ACTIVE', now);
    rc.run(`RC${i}`, `CP${i}`, 'DRAFT', now);
  }
  db.exec('COMMIT');
  const insertMs = performance.now() - t0;

  const q0 = performance.now();
  for (let k = 0; k < 1000; k += 1) {
    const i = Math.floor(Math.random() * n);
    db.prepare(
      `SELECT rc.runout_calculations_id FROM RunoutCalculations rc
        JOIN ConfigurationPacket cp ON cp.configuration_packet_id = rc.configuration_packet_id
        JOIN IndividualVehicle iv ON iv.individual_vehicle_id = cp.individual_vehicle_id
       WHERE iv.individual_vehicle_id = ?`,
    ).get(`IV${i}`);
  }
  const joinQueryMs = (performance.now() - q0) / 1000;

  db.close();
  const sizeBytes = existsSync(dbPath) ? statSync(dbPath).size : 0;
  rmSync(dbPath, { force: true });
  return { insertMs, sizeBytes, joinQueryMs };
}

function main(): void {
  const dbPath = join(process.cwd(), 'data', 'perf.db');
  const counts = [10, 100, 1000, 10000, 100000];
  console.log('[perf] Scaled insert + indexed-join timing (node:sqlite, single file)\n');
  console.log('  vehicles   rows*   insert(ms)   indexed join(ms/query)   db size');
  console.log('  ────────   ─────   ──────────   ──────────────────────   ───────');
  for (const n of counts) {
    const r = seedVehicles(dbPath, n);
    const rows = n * 4;
    const sizeMb = (r.sizeBytes / 1024 / 1024).toFixed(2);
    console.log(`  ${String(n).padStart(8)}   ${String(rows).padStart(5)}   ${r.insertMs.toFixed(0).padStart(10)}   ${r.joinQueryMs.toFixed(4).padStart(22)}   ${sizeMb} MB`);
  }
  console.log('\n  * rows = IndividualVehicle + VehicleBuild + ConfigurationPacket + RunoutCalculations (4 per vehicle).');
  console.log('[perf] indexed join is O(log n) per query (FK-indexed); insert is bulk-in-transaction.');
}

main();
