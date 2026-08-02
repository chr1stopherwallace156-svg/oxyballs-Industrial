#!/usr/bin/env bash
# Restore local runtime state from a backup created by backup.sh — FAIL CLOSED.
#   usage: restore.sh [backup.tar.gz] [--force]
# Guarantees:
#   - rejects unsafe archive entries (absolute paths, .., symlinks, unexpected tops)
#   - aborts on checksum mismatch by default (--force to override deliberately)
#   - a FAILED pre-restore safety backup ABORTS the restore
#   - the database is restored via a temp file + integrity check + ATOMIC rename
#     (a corrupt restored db aborts and leaves the active database unchanged)
#   - a failed post-restore integrity check or engine build/test => OUTCOME: FAIL
#     and a non-zero exit. "Restore complete" is printed only on success.
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"

FORCE=0; ARCHIVE=""
for a in "$@"; do case "$a" in --force) FORCE=1;; *) ARCHIVE="$a";; esac; done
TOOL="$(hash_tool)" || { fail "no sha256 tool"; echo "OUTCOME: FAIL"; exit 1; }
echo "Elektron — restore (fail-closed)"

if [ -z "$ARCHIVE" ]; then
  section "Available backups"
  ls -1t "$BACKUP_DIR"/elektron-backup-*.tar.gz 2>/dev/null | sed 's/^/  /' || { fail "no backups in $BACKUP_DIR"; echo "OUTCOME: FAIL"; exit 1; }
  ARCHIVE="$(ls -1t "$BACKUP_DIR"/elektron-backup-*.tar.gz 2>/dev/null | head -1)"; info "Most recent: $ARCHIVE"
fi
[ -f "$ARCHIVE" ] || { fail "not a file: $ARCHIVE"; echo "OUTCOME: FAIL"; exit 1; }
STAGE=""
abort() { fail "$1"; echo "OUTCOME: FAIL"; [ -n "$STAGE" ] && rm -rf "$STAGE"; exit 1; }

# 1. Validate the archive listing BEFORE extracting.
section "1. Validating archive (pre-extraction)"
LIST="$(tar -tzf "$ARCHIVE" 2>/dev/null)" || abort "cannot read archive (corrupt gzip/tar)"
printf '%s\n' "$LIST" | grep -qE '(^/|(^|/)\.\.(/|$))' && abort "archive contains absolute or parent paths — refusing"
TOP="$(printf '%s\n' "$LIST" | sed 's#/.*##' | sort -u)"
[ "$(printf '%s\n' "$TOP" | grep -c .)" -eq 1 ] || abort "archive has unexpected multiple top-level entries — refusing"
case "$TOP" in elektron-backup-*) ok "single expected top-level: $TOP";; *) abort "unexpected top-level '$TOP' — refusing";; esac
tar -tvzf "$ARCHIVE" | awk '{print substr($1,1,1)}' | grep -qE '[lhbcps]' && abort "archive contains symlink/special entries — refusing"
ok "no symlinks or special entries"

# 2. Extract to a private staging area.
STAGE="$CACHE_DIR/restore-$$"; rm -rf "$STAGE"; mkdir -p "$STAGE"
tar -xzf "$ARCHIVE" -C "$STAGE" || abort "extraction failed"
SRC="$STAGE/$TOP"; [ -d "$SRC" ] || abort "malformed archive"

# 3. Verify checksums; abort on mismatch unless --force.
section "2. Checksum verification"
if [ -f "$SRC/CHECKSUMS.sha256" ]; then
  if ( cd "$SRC" && $TOOL -c CHECKSUMS.sha256 >/dev/null 2>&1 ); then ok "checksums verified"
  elif [ "$FORCE" -eq 1 ]; then warn "checksum MISMATCH — proceeding because --force was given"
  else abort "checksum MISMATCH — aborting (re-run with --force to override deliberately)"; fi
else [ "$FORCE" -eq 1 ] && warn "no checksum file (allowed by --force)" || abort "backup has no checksum file — refusing without --force"; fi

# 4. Confirm.
printf 'Restore from %s ? Overwrites engine database + outputs. [y/N] ' "$(basename "$ARCHIVE")"
read -r ANS; case "$ANS" in y|Y|yes|YES) ;; *) echo "Aborted (not confirmed)."; rm -rf "$STAGE"; exit 0;; esac

# 5. Pre-restore safety backup — FAIL CLOSED if it fails.
section "3. Pre-restore safety backup"
if [ -f "$ENGINE/data/engine.db" ] || [ -d "$ENGINE/output" ]; then
  if [ "${ELEKTRON_TEST_FORCE_PREBACKUP_FAIL:-0}" = 1 ]; then abort "pre-restore safety backup FAILED (test seam) — refusing to restore over unbacked-up state"; fi
  if bash "$SCRIPT_DIR/backup.sh" >/dev/null 2>&1; then ok "current state backed up to .local/backups/"
  else abort "pre-restore safety backup FAILED — refusing to restore over unbacked-up state"; fi
else info "nothing to back up yet (fresh install)"; fi

# 6. Restore the database via temp file + integrity check + ATOMIC rename.
section "4. Restoring (atomic)"
if [ -d "$SRC/engine-data" ]; then
  NEWDB="$(ls "$SRC/engine-data/"*.db 2>/dev/null | head -1)"
  if [ -n "$NEWDB" ]; then
    mkdir -p "$ENGINE/data"; STAGED="$ENGINE/data/engine.db.restore-new"
    cp -f "$NEWDB" "$STAGED"
    if db_integrity_ok "$STAGED"; then
      mv -f "$STAGED" "$ENGINE/data/engine.db"; ok "engine/data/engine.db (validated + atomically replaced)"
    else
      rm -f "$STAGED"; abort "restored database FAILED integrity_check — active database left UNCHANGED"
    fi
  fi
fi
if [ -d "$SRC/engine-output" ]; then rm -rf "$ENGINE/output.restore-new"; cp -R "$SRC/engine-output" "$ENGINE/output.restore-new"; rm -rf "$ENGINE/output"; mv "$ENGINE/output.restore-new" "$ENGINE/output"; ok "engine/output (atomic)"; fi
if [ -d "$SRC/local-data" ]; then mkdir -p "$DATA_DIR"; ( cp -R "$SRC/local-data/." "$DATA_DIR/" 2>/dev/null ) && ok ".local/data"; fi
rm -rf "$STAGE"

# 7. Post-restore verification — failures => OUTCOME: FAIL.
section "5. Post-restore verification"
if [ -f "$ENGINE/data/engine.db" ]; then db_integrity_ok "$ENGINE/data/engine.db" && ok "database integrity_check ok" || abort "post-restore database integrity_check FAILED"; fi
if [ "${ELEKTRON_TEST_FORCE_POSTRESTORE_FAIL:-0}" = 1 ]; then abort "post-restore verification forced-fail (test seam)"; fi
if [ -d "$ENGINE/node_modules" ]; then ( cd "$ENGINE" && npm run build >/dev/null 2>&1 && npm test >/dev/null 2>&1 ) && ok "engine build+test pass after restore" || abort "engine build/test FAILED after restore"; fi

echo; ok "OUTCOME: FULL_PASS — Restore complete."
