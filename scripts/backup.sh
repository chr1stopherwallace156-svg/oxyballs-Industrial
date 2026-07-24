#!/usr/bin/env bash
# Product scope: Elektron Local Runtime
# Purpose: Create a checksum-sealed, restore-compatible archive of installed
# runtime state (engine.db, .local data/outputs) under .local/backups/.
# Not an EDE development snapshot (use scripts/dev/ede/snapshot.sh / npm run ede:snapshot).
#
# Source is recoverable from the git bundle / source ZIP, so this captures the
# state unique to THIS install. Fails loudly if sealing fails — never produces
# an unsealed backup.
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

TOOL="$(hash_tool)" || { fail "no sha256 tool (shasum/sha256sum) — cannot seal backup"; exit 1; }
TS="$(date +%Y%m%d-%H%M%S)"; STAGE="$BACKUP_DIR/elektron-backup-$TS"
mkdir -p "$STAGE"
echo "Elektron — backup ($TS)"

section "Collecting"
[ -f "$ENGINE/data/engine.db" ] && { mkdir -p "$STAGE/engine-data"; cp "$ENGINE/data/engine.db" "$STAGE/engine-data/"; ok "engine/data/engine.db"; } || info "no engine database yet"
[ -d "$ENGINE/output" ]         && { cp -R "$ENGINE/output" "$STAGE/engine-output"; ok "engine/output"; } || info "no engine output yet"
if find "$DATA_DIR" -mindepth 1 -print -quit 2>/dev/null | grep -q .; then cp -R "$DATA_DIR" "$STAGE/local-data"; ok ".local/data"; fi

section "Sealing (portable SHA-256)"
# macOS-BSD compatible: no 'sort -z'; -exec ... {} + ; sort by filename (field 2). No silent '|| true'.
( cd "$STAGE" && find . -type f ! -name CHECKSUMS.sha256 -exec $TOOL {} + | LC_ALL=C sort -k2 > CHECKSUMS.sha256 )
[ -s "$STAGE/CHECKSUMS.sha256" ] || { fail "checksum sealing produced no output — aborting"; rm -rf "$STAGE"; exit 1; }
ok "sealed $(wc -l < "$STAGE/CHECKSUMS.sha256" | tr -d ' ') files"

ARCHIVE="$BACKUP_DIR/elektron-backup-$TS.tar.gz"
( cd "$BACKUP_DIR" && tar -czf "$ARCHIVE" "elektron-backup-$TS" ) || { fail "tar failed"; exit 1; }
rm -rf "$STAGE"
ok "backup created: $ARCHIVE ($(du -sh "$ARCHIVE" | awk '{print $1}'))"
echo; ok "Done. Keep this on an external drive or cloud storage."
