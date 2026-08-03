#!/usr/bin/env bash
# Fail if source files contain CRITICAL TODO markers.
# Documentation that describes the policy is excluded.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

FOUND="$(
  find . -type f \( \
    -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \
    -o -name '*.py' -o -name '*.swift' -o -name '*.sh' \
  \) \
    ! -path './.git/*' \
    ! -path './node_modules/*' \
    ! -path './.venv/*' \
    ! -path './dev/checks/no-critical-todos.sh' \
    -print0 2>/dev/null \
  | xargs -0 grep -nE 'TODO[[:space:]]*:?[[:space:]]*CRITICAL|CRITICAL[[:space:]]+TODO' 2>/dev/null || true
)"

if [[ -n "$FOUND" ]]; then
  echo "$FOUND" >&2
  echo "no-critical-todos: FAIL" >&2
  exit 1
fi
echo "no-critical-todos: ok"
exit 0
