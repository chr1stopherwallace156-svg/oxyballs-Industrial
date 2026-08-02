#!/usr/bin/env bash
# Runtime regression harness for the safety-critical behaviors reviewers require:
#   1. `npm run clean` preserves engine/data/engine.db (removes only build output).
#   2. A failed pre-restore safety backup aborts the restore (fail closed).
#   3. A restored database that fails its integrity check aborts, leaving the ACTIVE
#      database byte-for-byte unchanged (proves the temp-file + atomic-rename design).
#   4. A failed post-restore verification returns OUTCOME: FAIL and a non-zero exit.
# (The canonical-hash-vs-file-hash regression lives in the engine test suite.)
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
set +e   # this harness DELIBERATELY runs failing commands and inspects $? (override _common's set -e)
detect_platform
PASS=0; FAILN=0
check() { if [ "$1" = "$2" ]; then ok "$3"; PASS=$((PASS+1)); else fail "$3 (got '$1', want '$2')"; FAILN=$((FAILN+1)); fi; }
TOOL="$(hash_tool)"

echo "Elektron — runtime self-test (safety regressions)"
[ -d "$ENGINE/node_modules" ] || { fail "run Install first"; exit 1; }
( cd "$ENGINE" && npm run migrate >/dev/null 2>&1 )

section "1. npm run clean preserves the database"
( cd "$ENGINE" && npm run build >/dev/null 2>&1; npm run clean >/dev/null 2>&1 )
[ -f "$ENGINE/data/engine.db" ]; check "$?" "0" "engine.db survives npm run clean"
[ -d "$ENGINE/dist" ]; [ "$?" -ne 0 ] && ok "dist removed by clean" && PASS=$((PASS+1)) || { fail "dist not removed"; FAILN=$((FAILN+1)); }
( cd "$ENGINE" && npm run migrate >/dev/null 2>&1 )   # rebuild db+dist for following tests

# Make a known-good backup to work from.
bash "$SCRIPT_DIR/backup.sh" >/dev/null 2>&1
GOOD="$(ls -1t "$BACKUP_DIR"/elektron-backup-*.tar.gz | head -1)"
ACTIVE_SUM_BEFORE="$($TOOL "$ENGINE/data/engine.db" | awk '{print $1}')"

section "2. Failed pre-restore backup aborts (fail closed)"
CACHED="$CACHE_DIR/good-backup.tar.gz"; cp "$GOOD" "$CACHED"
# Deterministic seam (chmod is bypassed when running as root): force the pre-restore backup to fail.
printf 'y\n' | ELEKTRON_TEST_FORCE_PREBACKUP_FAIL=1 bash "$SCRIPT_DIR/restore.sh" "$CACHED" >"$CACHE_DIR/st2.txt" 2>&1; RC=$?
check "$RC" "1" "restore exits non-zero when pre-restore backup fails"
grep -q 'pre-restore safety backup FAILED' "$CACHE_DIR/st2.txt"; check "$?" "0" "reports the pre-restore backup failure"
ACTIVE_AFTER_ST2="$($TOOL "$ENGINE/data/engine.db" | awk '{print $1}')"
check "$ACTIVE_AFTER_ST2" "$ACTIVE_SUM_BEFORE" "active db unchanged after pre-backup-failure abort"

section "3. Corrupt restored DB aborts; active DB unchanged (atomic design)"
WORK="$CACHE_DIR/corrupt"; rm -rf "$WORK"; mkdir -p "$WORK"; ( cd "$WORK" && tar -xzf "$GOOD" )
CDIR="$(ls -d "$WORK"/elektron-backup-*)"
head -c 4096 /dev/urandom > "$CDIR/engine-data/engine.db"     # corrupt the backed-up db
( cd "$CDIR" && find . -type f ! -name CHECKSUMS.sha256 -exec $TOOL {} + | LC_ALL=C sort -k2 > CHECKSUMS.sha256 )  # re-seal so checksum passes
( cd "$WORK" && tar -czf corrupt.tar.gz "$(basename "$CDIR")" )
printf 'y\n' | bash "$SCRIPT_DIR/restore.sh" "$WORK/corrupt.tar.gz" >"$CACHE_DIR/st3.txt" 2>&1; RC=$?
check "$RC" "1" "restore exits non-zero on corrupt restored database"
grep -q 'integrity_check — active database left UNCHANGED' "$CACHE_DIR/st3.txt"; check "$?" "0" "reports integrity failure + unchanged active db"
ACTIVE_SUM_AFTER="$($TOOL "$ENGINE/data/engine.db" | awk '{print $1}')"
check "$ACTIVE_SUM_AFTER" "$ACTIVE_SUM_BEFORE" "active engine.db is byte-for-byte unchanged after aborted restore"
[ -e "$ENGINE/data/engine.db.restore-new" ] && { fail "staged temp db left behind"; FAILN=$((FAILN+1)); } || { ok "no staged temp db left behind"; PASS=$((PASS+1)); }

section "4. Failed post-restore verification => OUTCOME: FAIL"
printf 'y\n' | ELEKTRON_TEST_FORCE_POSTRESTORE_FAIL=1 bash "$SCRIPT_DIR/restore.sh" "$GOOD" >"$CACHE_DIR/st4.txt" 2>&1; RC=$?
check "$RC" "1" "restore exits non-zero when post-restore verification fails"
grep -q 'OUTCOME: FAIL' "$CACHE_DIR/st4.txt"; check "$?" "0" "prints OUTCOME: FAIL (never 'Restore complete')"
grep -q 'Restore complete' "$CACHE_DIR/st4.txt" && { fail "printed 'Restore complete' on failure"; FAILN=$((FAILN+1)); } || { ok "did not print 'Restore complete' on failure"; PASS=$((PASS+1)); }

section "RESULT"
if [ "$FAILN" -eq 0 ]; then ok "SELF-TEST FULL_PASS ($PASS checks)"; exit 0; else fail "SELF-TEST FAIL ($FAILN failed / $((PASS+FAILN)))"; exit 1; fi
