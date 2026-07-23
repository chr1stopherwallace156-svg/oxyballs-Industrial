#!/usr/bin/env bash
# One-time local setup. Verifies the immutable payload BEFORE touching anything,
# installs pinned deps offline (hash-locked), migrates (additively — never deletes
# the database), runs the full suite, regenerates Platform 001, and prints an
# explicit outcome: FULL_PASS | PASS_WITH_WARNINGS | BUILD_ENGINE_ONLY | FAIL.
# Named -macos; also runs on Linux for self-test (it warns on other platforms).
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
LOG="$LOG_DIR/setup-$(date +%Y%m%d-%H%M%S).log"
REQ_FAIL=0; WARNINGS=0; TWIN_SCOPE="run"   # run | skip
die() { fail "$1"; echo; echo "Setup stopped. Log: $LOG"; echo "OUTCOME: FAIL"; exit 1; }
req() { local l="$1"; shift; printf '\n### %s\n' "$l" >>"$LOG"; if "$@" >>"$LOG" 2>&1; then ok "$l"; else fail "$l (see $LOG)"; REQ_FAIL=$((REQ_FAIL+1)); die "$l failed"; fi; }

echo "Elektron — local setup"; echo "Log: $LOG"
detect_platform; detect_python311 || true

# ---- 0. integrity BEFORE any mutation ------------------------------------
section "0. Payload integrity (before install)"
if [ -f "$IMMUTABLE_MANIFEST" ]; then
  if verify_immutable; then ok "immutable payload verified (source/scripts/docs/vendor)"; else fail "immutable payload MISMATCH — the bundle is corrupted or altered"; echo "OUTCOME: FAIL"; exit 1; fi
else warn "no immutable manifest — skipping pre-install integrity check"; WARNINGS=$((WARNINGS+1)); fi

# ---- 1. toolchain --------------------------------------------------------
section "1. Environment"
info "OS=$OS ARCH=$ARCH python-platform=${PYPLAT:-unsupported}"
[ "$OS" = macos ] && ok "macOS detected" || warn "Not macOS ($OS) — proceeding (macOS is the target)."
need_cmd git || die "git not found — run: xcode-select --install"
ok "git $(git --version | awk '{print $3}')"
need_cmd node || die "Node.js not found — install Node >= 22.5.0 (nodejs.org)"
NODE_V="$(node -v | sed 's/^v//')"; ver_ge "$NODE_V" 22.5.0 && ok "Node $NODE_V (>= 22.5.0)" || die "Node $NODE_V too old; need >= 22.5.0"
need_cmd npm && ok "npm $(npm -v)" || die "npm not found"
if [ -n "$PY311" ]; then ok "Python 3.11 ($PY311)"; else
  if need_cmd python3; then warn "python3 is $(python3 -c 'import sys;print("%d.%d.%d"%sys.version_info[:3])') — the vendored wheels are CPython 3.11; the digital-twin will be SKIPPED offline (install Python 3.11 to enable it)"; else warn "python3 not found — digital-twin validation SKIPPED (Build Engine does not need Python)"; fi
  TWIN_SCOPE="skip"; WARNINGS=$((WARNINGS+1))
fi

# ---- 2. Node deps (offline, pinned) --------------------------------------
section "2. Node dependencies (offline-first)"
cd "$ENGINE"
if [ -d "$NPM_CACHE" ] && npm ci --offline --cache "$NPM_CACHE" --no-audit --no-fund >>"$LOG" 2>&1; then ok "npm ci (offline, vendored cache)"
else warn "offline npm ci unavailable; using network"; WARNINGS=$((WARNINGS+1)); req "npm ci (network)" npm ci --no-audit --no-fund; fi

# ---- 3. Python venv + deps (offline, hash-locked) ------------------------
if [ "$TWIN_SCOPE" = run ]; then
  section "3. Python environment (hash-locked, offline)"
  [ -d "$VENV_DIR" ] || req "create venv (.local/venv)" "$PY311" -m venv "$VENV_DIR"
  PIP="$VENV_DIR/bin/pip"; LOCK="$WHEELS/requirements-kernel-validation.lock"; WDIR="$WHEELS/$PYPLAT"
  if [ -f "$LOCK" ] && [ -d "$WDIR" ] && "$PIP" install -q --no-index --require-hashes --find-links "$WDIR" -r "$LOCK" >>"$LOG" 2>&1; then
    ok "pip install (offline, --require-hashes, $PYPLAT)"
  elif [ -d "$WDIR" ] && "$PIP" install -q --no-index --find-links "$WDIR" -r "$TWIN/verification/requirements-kernel-validation.txt" >>"$LOG" 2>&1; then
    warn "installed offline without hash-locking (lock file missing)"; WARNINGS=$((WARNINGS+1))
  else
    warn "offline python install failed for ${PYPLAT:-?}; digital-twin will be SKIPPED"; TWIN_SCOPE=skip; WARNINGS=$((WARNINGS+1))
  fi
fi

# ---- 4. database (additive migrate — never deletes) ----------------------
section "4. Database + migrations (non-destructive)"
req "build (tsc)" npm run build
req "migrate (additive; creates engine/data/engine.db if absent)" npm run migrate

# ---- 5. tests + verification (required) -----------------------------------
section "5. Tests + verification"
req "npm test" npm test
req "verify:attack (M10)" npm run verify:attack
req "verify:determinism (M10)" npm run verify:determinism
req "verify:attack:package (Platform 001)" npm run verify:attack:package

# ---- 6. Platform 001 (no DB deletion) ------------------------------------
section "6. Generate Platform 001"
req "platform001:generate (persistent DB, FK-safe re-seed)" regen_platform001

# ---- 7. digital-twin validation (optional) -------------------------------
TWIN_RESULT="skipped"
if [ "$TWIN_SCOPE" = run ] && [ -x "$VENV_DIR/bin/python" ] && [ -f "$TWIN/verification/run_kernel_validation.py" ]; then
  section "7. Digital-twin kernel validation"
  if ( cd "$TWIN" && "$VENV_DIR/bin/python" verification/run_kernel_validation.py >>"$LOG" 2>&1 ); then ok "EDTS kernel validation"; TWIN_RESULT=pass
  else fail "EDTS kernel validation FAILED (see $LOG)"; TWIN_RESULT=fail; fi
fi

# ---- outcome -------------------------------------------------------------
section "RESULT"
OUTCOME=FULL_PASS
if [ "$REQ_FAIL" -gt 0 ]; then OUTCOME=FAIL
elif [ "$TWIN_RESULT" = fail ]; then OUTCOME=PASS_WITH_WARNINGS
elif [ "$TWIN_SCOPE" = skip ]; then OUTCOME=BUILD_ENGINE_ONLY
elif [ "$WARNINGS" -gt 0 ]; then OUTCOME=PASS_WITH_WARNINGS; fi
{ echo "OUTCOME: $OUTCOME"; echo "required_failures=$REQ_FAIL warnings=$WARNINGS twin=$TWIN_RESULT"; } > "$LOG_DIR/last-setup-report.txt"
case "$OUTCOME" in
  FULL_PASS)          ok "OUTCOME: FULL_PASS — Build Engine + digital-twin validation all passed.";;
  PASS_WITH_WARNINGS) warn "OUTCOME: PASS_WITH_WARNINGS — Build Engine passed; see warnings above (twin=$TWIN_RESULT).";;
  BUILD_ENGINE_ONLY)  warn "OUTCOME: BUILD_ENGINE_ONLY — Build Engine passed; digital-twin was not run (needs Python 3.11).";;
  FAIL)               fail "OUTCOME: FAIL — $REQ_FAIL required check(s) failed.";;
esac
info "Package: engine/output/platform-001/build-package.md   Database: engine/data/engine.db   Logs: .local/logs/"
[ "$OUTCOME" = FAIL ] && exit 1 || exit 0
