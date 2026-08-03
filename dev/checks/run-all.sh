#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
FAIL=0
run() {
  echo "-- $1"
  if bash "$2"; then echo "   ok"; else echo "   FAIL"; FAIL=1; fi
}
run "repo-health" "$ROOT/dev/checks/repo-health.sh"
run "no-secrets" "$ROOT/dev/checks/no-secrets.sh"
run "no-critical-todos" "$ROOT/dev/checks/no-critical-todos.sh"
run "formatting" "$ROOT/dev/checks/formatting.sh"
run "database" "$ROOT/scripts/database/health.sh"
# Optional heavier checks
if [[ -d elektron-digital-twin-foundation/tests/eae ]]; then
  run "foundation-pytest-quick" "$ROOT/dev/checks/foundation-tests.sh"
fi
exit "$FAIL"
