#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
DB="${EDE_SQLITE_PATH:-$ROOT/logs/ede-scaffold.sqlite}"
mkdir -p "$(dirname "$DB")"
sqlite3 "$DB" "CREATE TABLE IF NOT EXISTS ede_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL); INSERT OR REPLACE INTO ede_meta(key,value) VALUES('ede_version','0.1.0');"
COUNT="$(sqlite3 "$DB" "SELECT COUNT(*) FROM ede_meta;")"
echo "SQLite ok path=$DB rows=$COUNT"
