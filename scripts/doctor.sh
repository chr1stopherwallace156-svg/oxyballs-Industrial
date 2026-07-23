#!/usr/bin/env bash
# Read-only diagnostics. Mutates nothing.
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
detect_platform; detect_python311 || true

echo "Elektron — doctor (read-only)"
section "Platform"
info "OS=$OS ARCH=$ARCH python-platform=${PYPLAT:-unsupported for offline wheels}"
[ "$OS" = macos ] || warn "Target is macOS; this machine is $OS."

section "Toolchain"
need_cmd git  && ok "git   $(git --version | awk '{print $3}')" || fail "git missing (xcode-select --install)"
if need_cmd node; then NV="$(node -v | sed 's/^v//')"; ver_ge "$NV" 22.5.0 && ok "node  $NV (>= 22.5.0)" || fail "node $NV < 22.5.0"; else fail "node missing (>= 22.5.0)"; fi
need_cmd npm && ok "npm   $(npm -v)" || fail "npm missing"
if [ -n "$PY311" ]; then ok "python 3.11 ($PY311)"; elif need_cmd python3; then warn "python3 is $(python3 -c 'import sys;print("%d.%d.%d"%sys.version_info[:3])') — vendored wheels need 3.11"; else warn "python3 missing (only for digital-twin)"; fi
hash_tool >/dev/null 2>&1 && ok "sha256 tool: $(hash_tool)" || warn "no shasum/sha256sum"

section "Offline vendors"
[ -d "$NPM_CACHE" ] && ok "npm cache ($(du -sh "$NPM_CACHE" 2>/dev/null | awk '{print $1}'))" || warn "no vendored npm cache"
if [ -n "$PYPLAT" ] && [ -d "$WHEELS/$PYPLAT" ]; then ok "python wheels for $PYPLAT ($(ls "$WHEELS/$PYPLAT" | wc -l | tr -d ' '))"; else warn "no offline wheels for ${PYPLAT:-this platform}"; fi
[ -f "$WHEELS/requirements-kernel-validation.lock" ] && ok "hash-locked python requirements present" || warn "no python lockfile"

section "Integrity"
if [ -f "$IMMUTABLE_MANIFEST" ]; then verify_immutable && ok "immutable payload verified" || fail "immutable payload MISMATCH"; else warn "no immutable manifest"; fi

section "Install state"
[ -d "$ENGINE/node_modules" ] && ok "engine/node_modules present" || info "not installed (run Install Elektron)"
[ -f "$ENGINE/data/engine.db" ] && ok "engine/data/engine.db present" || info "database not yet created"
[ -d "$VENV_DIR" ] && ok "python venv present" || info "python venv absent"
[ -f "$LOG_DIR/last-setup-report.txt" ] && { echo; info "Last setup:"; sed 's/^/        /' "$LOG_DIR/last-setup-report.txt"; }
echo; ok "doctor finished (no changes made)"
