#!/usr/bin/env bash
# Verify everything and report a TRUTHFUL outcome. Immutable-payload checksums are
# verified FIRST (before anything mutates generated outputs). Kernel-validation and
# checksum failures are real failures — they can never yield FULL_PASS.
# Outcome: FULL_PASS | PASS_WITH_WARNINGS | BUILD_ENGINE_ONLY | FAIL
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
detect_platform; detect_python311 || true
LOG="$LOG_DIR/verify-$(date +%Y%m%d-%H%M%S).log"
REQ_FAIL=0; INTEGRITY_FAIL=0; TWIN_RESULT=skipped; WARNINGS=0
step() { local l="$1"; shift; printf '\n### %s\n' "$l" >>"$LOG"; if "$@" >>"$LOG" 2>&1; then ok "$l"; else fail "$l (see $LOG)"; REQ_FAIL=$((REQ_FAIL+1)); fi; }

echo "Elektron — verify all"; echo "Log: $LOG"

section "0. Immutable payload integrity (before mutation)"
if [ -f "$IMMUTABLE_MANIFEST" ]; then
  if verify_immutable; then ok "immutable payload verified"; else fail "immutable payload MISMATCH (source/scripts/docs/vendor changed)"; INTEGRITY_FAIL=1; fi
else warn "no immutable manifest present"; WARNINGS=$((WARNINGS+1)); fi

[ -d "$ENGINE/node_modules" ] || { fail "engine not installed — run Install Elektron first"; echo "OUTCOME: FAIL"; exit 1; }
cd "$ENGINE"
section "Build Engine (required)"
step "build"                    npm run build
step "tests"                    npm test
step "verify:attack (M10)"      npm run verify:attack
step "verify:determinism (M10)" npm run verify:determinism
step "verify:attack:package"    npm run verify:attack:package
step "platform001:generate (persistent DB)" regen_platform001

if [ -n "$PY311" ] && [ -x "$VENV_DIR/bin/python" ] && [ -f "$TWIN/verification/run_kernel_validation.py" ]; then
  section "Digital-twin kernel validation"
  printf '\n### twin\n' >>"$LOG"
  if ( cd "$TWIN" && "$VENV_DIR/bin/python" verification/run_kernel_validation.py >>"$LOG" 2>&1 ); then ok "EDTS kernel validation"; TWIN_RESULT=pass; else fail "EDTS kernel validation FAILED"; TWIN_RESULT=fail; fi
else warn "digital-twin validation not run (needs Python 3.11 + installed venv)"; fi

section "RESULT"
OUTCOME=FULL_PASS
if [ "$REQ_FAIL" -gt 0 ] || [ "$INTEGRITY_FAIL" -gt 0 ]; then OUTCOME=FAIL
elif [ "$TWIN_RESULT" = fail ]; then OUTCOME=PASS_WITH_WARNINGS
elif [ "$TWIN_RESULT" = skipped ]; then OUTCOME=BUILD_ENGINE_ONLY
elif [ "$WARNINGS" -gt 0 ]; then OUTCOME=PASS_WITH_WARNINGS; fi
case "$OUTCOME" in
  FULL_PASS)          ok  "OUTCOME: FULL_PASS — every verification (engine + integrity + twin) passed.";;
  PASS_WITH_WARNINGS) warn "OUTCOME: PASS_WITH_WARNINGS — engine passed; twin=$TWIN_RESULT, warnings=$WARNINGS.";;
  BUILD_ENGINE_ONLY)  warn "OUTCOME: BUILD_ENGINE_ONLY — engine + integrity passed; twin not run (Python 3.11 needed).";;
  FAIL)               fail "OUTCOME: FAIL — required_failures=$REQ_FAIL integrity_failures=$INTEGRITY_FAIL (see $LOG)";;
esac
[ "$OUTCOME" = FAIL ] && exit 1 || exit 0
