#!/usr/bin/env bash
# Product scope: Elektron Development Environment (EDE)
# Purpose: Snapshot CTO docs, config, manifests, and scaffold DB for development convenience.
# Not a full runtime-restorable operational backup (see scripts/backup.sh → .local/backups/).
#
# Prefer: npm run ede:snapshot
# Output: artifacts/ede-snapshots/ (or ELEKTRON_EDE_SNAPSHOT_DIR)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
DEST="${ELEKTRON_EDE_SNAPSHOT_DIR:-$ROOT/artifacts/ede-snapshots}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="$DEST/ede-snapshot-$STAMP"
mkdir -p "$OUT"

copy_tree() {
  local src="$1"
  if [[ -e "$ROOT/$src" ]]; then
    mkdir -p "$OUT/$(dirname "$src")"
    cp -a "$ROOT/$src" "$OUT/$src"
  fi
}

cd "$ROOT"
copy_tree docs/cto
copy_tree docs/runbooks
copy_tree docs/architecture
copy_tree ENVIRONMENT.md
copy_tree PROJECT_MANIFEST.json
copy_tree config
copy_tree history
copy_tree package.json
[[ -f logs/ede-scaffold.sqlite ]] && copy_tree logs/ede-scaffold.sqlite

printf '%s\n' "$STAMP" > "$OUT/SNAPSHOT_STAMP.txt"
echo "EDE development snapshot written: $OUT"
echo "(This is NOT a sealed runtime recovery archive. Use npm run backup for that.)"
