import { join } from 'node:path';
import { openDatabase, migrate } from '../src/db';

const DB_PATH = join(process.cwd(), 'data', 'engine.db');

function main(): void {
  const db = openDatabase(DB_PATH);
  const applied = migrate(db);
  const count = (db.prepare('SELECT COUNT(*) c FROM schema_migrations').get() as any).c;
  const tables = (db.prepare("SELECT COUNT(*) c FROM sqlite_master WHERE type='table'").get() as any).c;
  db.close();
  console.log(`[migrate] db=${DB_PATH}`);
  console.log(`[migrate] newly applied: ${applied.length ? applied.join(', ') : '(none — already current)'}`);
  console.log(`[migrate] migrations recorded: ${count}; tables: ${tables}`);
  console.log('[migrate] PASS');
}

main();
