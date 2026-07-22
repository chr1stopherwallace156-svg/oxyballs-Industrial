import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

export type DB = DatabaseSync;

const MIGRATIONS_DIR = join(__dirname, '..', '..', 'migrations');
// When compiled, __dirname is dist/src; migrations live at repo-root/migrations.
const MIGRATIONS_DIR_CANDIDATES = [
  join(__dirname, '..', '..', 'migrations'),
  join(__dirname, '..', '..', '..', 'migrations'),
  join(process.cwd(), 'migrations'),
];

function resolveMigrationsDir(): string {
  for (const d of MIGRATIONS_DIR_CANDIDATES) if (existsSync(d)) return d;
  return MIGRATIONS_DIR;
}

/** Open a database with foreign keys and recursive triggers enforced. */
export function openDatabase(path: string): DB {
  if (path !== ':memory:') {
    const dir = dirname(path);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }
  const db = new DatabaseSync(path);
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA recursive_triggers = ON;');
  return db;
}

/** Apply all migrations in filename order, tracked in schema_migrations (Article VI). */
export function migrate(db: DB): string[] {
  db.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    version TEXT PRIMARY KEY, applied_at TEXT NOT NULL, checksum TEXT NOT NULL);`);
  const applied = new Set(
    db.prepare('SELECT version FROM schema_migrations').all().map((r: any) => r.version as string),
  );
  const dir = resolveMigrationsDir();
  const files = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  const newlyApplied: string[] = [];
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = readFileSync(join(dir, file), 'utf8');
    const checksum = sha256(sql);
    db.exec('BEGIN');
    try {
      db.exec(sql);
      db.prepare('INSERT INTO schema_migrations(version, applied_at, checksum) VALUES (?,?,?)')
        .run(file, new Date().toISOString(), checksum);
      db.exec('COMMIT');
      newlyApplied.push(file);
    } catch (e) {
      db.exec('ROLLBACK');
      throw new Error(`MIGRATION_FAILED:${file}: ${(e as Error).message}`);
    }
  }
  return newlyApplied;
}

/** Open + migrate a fresh in-memory DB (used by tests). */
export function freshMemoryDb(): DB {
  const db = openDatabase(':memory:');
  migrate(db);
  return db;
}

export function sha256(s: string): string {
  return createHash('sha256').update(s).digest('hex');
}

/**
 * Canonical serialization (RC-423): stable key ordering + JSON encoding so the
 * same record always produces the same hash.
 */
export function canonicalSerialize(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj).sort();
  return JSON.stringify(keys.map((k) => [k, obj[k] ?? null]));
}

/**
 * Hash-chain record hash (RC-423):
 * SHA256(canonical_record_content + previous_record_hash + artifact_hashes + timestamp + signer_identity).
 */
export function recordHash(input: {
  content: Record<string, unknown>;
  previousRecordHash: string;
  artifactHashes: string[];
  timestamp: string;
  signerIdentity: string;
}): string {
  const payload =
    canonicalSerialize(input.content) +
    '|' + input.previousRecordHash +
    '|' + [...input.artifactHashes].sort().join(',') +
    '|' + input.timestamp +
    '|' + input.signerIdentity;
  return sha256(payload);
}
