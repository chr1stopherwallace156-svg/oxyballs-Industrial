#!/usr/bin/env bash
# backup.sh — Timestamped backup of EDE docs/config (+ optional DB scaffold).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${ELEKTRON_BACKUP_DIR:-$ROOT/backups}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="$DEST/ede-backup-$STAMP"
mkdir -p "$OUT"

copy_tree() {
  local src="$1"
  if [[ -e "$src" ]]; then
    mkdir -p "$OUT/$(dirname "$src")"
    cp -a "$src" "$OUT/$src"
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

printf '%s\n' "$STAMP" > "$OUT/BACKUP_STAMP.txt"
echo "Backup written: $OUT"
