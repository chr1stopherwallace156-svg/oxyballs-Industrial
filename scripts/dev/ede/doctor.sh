#!/usr/bin/env bash
# Product scope: Elektron Development Environment (EDE)
# Purpose: Validate source-workstation development prerequisites.
# Not an installed-runtime health check.
#
# Prefer: npm run ede:doctor
# Do not confuse with scripts/doctor.sh (local runtime / operator doctor).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"
# shellcheck source=dev/checks/lib.sh
source "$ROOT/dev/checks/lib.sh"

FAIL=0
pass() { printf '✓ %s\n' "$1"; }
fail() { printf '✗ %s — %s\n' "$1" "$2"; FAIL=1; }
skip() { printf '○ %s — %s\n' "$1" "$2"; }

echo "== Elektron EDE doctor (workstation) =="

if command -v node >/dev/null; then pass "Node ($(node -v))"; else fail "Node" "not installed"; fi
if command -v sqlite3 >/dev/null; then pass "SQLite ($(sqlite3 --version | awk '{print $1}'))"; else fail "SQLite" "not installed"; fi

if [[ -f "$ROOT/logs/ede-scaffold.sqlite" ]] || bash "$ROOT/scripts/database/health.sh" >/dev/null 2>&1; then
  pass "Database"
else
  if bash "$ROOT/scripts/database/health.sh"; then pass "Database"; else fail "Database" "health check failed"; fi
fi

if [[ -f "$ROOT/elektron-digital-twin-foundation/package.json" ]]; then
  skip "Build" "foundation has no root build yet"
elif [[ -d "$ROOT/elektron-digital-twin-foundation" ]]; then
  pass "Build (foundation tree present; TS builds are package-local)"
else
  fail "Build" "foundation tree missing"
fi

if command -v python3 >/dev/null && [[ -d "$ROOT/elektron-digital-twin-foundation/tests/eae" ]]; then
  if [[ -x "$ROOT/.venv/bin/python" ]]; then PY="$ROOT/.venv/bin/python"; else PY=python3; fi
  if (cd "$ROOT/elektron-digital-twin-foundation" && "$PY" -m pytest tests/eae -q --tb=no >/tmp/ede-pytest.out 2>&1); then
    pass "Tests (foundation eae)"
  else
    if ! "$PY" -c "import pytest" 2>/dev/null; then
      skip "Tests" "pytest not installed in venv — run npm run setup"
    else
      fail "Tests" "foundation eae pytest failed (see /tmp/ede-pytest.out)"
    fi
  fi
else
  skip "Tests" "no foundation eae tests found"
fi

if command -v git >/dev/null && git -C "$ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  pass "Git ($(git -C "$ROOT" rev-parse --abbrev-ref HEAD))"
else
  fail "Git" "not a git work tree"
fi

if [[ -f "$ROOT/PROJECT_MANIFEST.json" && -f "$ROOT/ENVIRONMENT.md" && -x "$ROOT/scripts/setup.sh" ]]; then
  pass "Workspace"
else
  fail "Workspace" "EDE manifests/scripts missing"
fi

if [[ -d "$ROOT/.venv" ]] || [[ -d "$ROOT/node_modules" ]]; then
  pass "Environment"
else
  skip "Environment" "run npm run setup to create .venv / node_modules"
fi

echo
if [[ "$FAIL" -ne 0 ]]; then
  echo "EDE doctor FAILED"
  exit 1
fi
echo "EDE doctor PASSED"
exit 0
