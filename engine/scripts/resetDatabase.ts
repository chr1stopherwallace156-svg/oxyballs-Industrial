/**
 * DESTRUCTIVE database reset — the ONLY command that may delete the operational
 * database, and never as a side effect. It:
 *   1. displays the exact database path,
 *   2. creates a verified backup FIRST and aborts if the backup fails,
 *   3. requires an explicit typed confirmation ("RESET"),
 *   4. states clearly that it is destructive,
 * then removes the database. After this, run `npm run migrate` to recreate it.
 *
 * `npm run clean` intentionally does NOT touch the database — it removes only the
 * compiled build output (dist/).
 */
import { join } from 'node:path';
import { existsSync, mkdirSync, copyFileSync, statSync, readFileSync } from 'node:fs';
import { rmSync } from 'node:fs';
import { createHash } from 'node:crypto';

const DB_PATH = join(process.cwd(), 'data', 'engine.db');
const BACKUP_DIR = join(process.cwd(), 'data', 'backups');

function sha256File(p: string): string {
  return createHash('sha256').update(readFileSync(p)).digest('hex');
}

function main(): void {
  console.log('*** DESTRUCTIVE OPERATION: engine database reset ***');
  console.log(`Database path: ${DB_PATH}`);

  if (!existsSync(DB_PATH)) {
    console.log('No database exists yet — nothing to reset. Run `npm run migrate` to create one.');
    process.exit(0);
  }

  // 1. Verified backup FIRST — abort if it fails.
  mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = join(BACKUP_DIR, `engine-${stamp}.db`);
  try {
    copyFileSync(DB_PATH, backup);
    const srcSize = statSync(DB_PATH).size;
    const dstSize = statSync(backup).size;
    if (srcSize !== dstSize || sha256File(DB_PATH) !== sha256File(backup)) {
      throw new Error('backup verification mismatch');
    }
    console.log(`Verified backup created: ${backup} (${dstSize} bytes)`);
  } catch (e) {
    console.error(`ABORTED — could not create a verified backup: ${(e as Error).message}`);
    console.error('The database was NOT modified.');
    process.exit(1);
  }

  // 2. Explicit typed confirmation.
  console.log('This will PERMANENTLY DELETE the database above (a verified backup was just made).');
  process.stdout.write('Type exactly RESET to proceed (anything else aborts): ');
  let answer = '';
  try { answer = readFileSync(0, 'utf8').trim(); } catch { answer = ''; }
  if (answer !== 'RESET') {
    console.error('\nABORTED — confirmation not given. The database was NOT modified.');
    console.error(`(Your backup remains at ${backup}.)`);
    process.exit(1);
  }

  // 3. Delete (backup already secured).
  rmSync(DB_PATH, { force: true });
  console.log('Database deleted. Run `npm run migrate` to recreate the schema.');
  console.log(`Backup preserved at: ${backup}`);
}

main();
