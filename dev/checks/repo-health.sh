#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
test -f PROJECT_MANIFEST.json
test -f ENVIRONMENT.md
test -x scripts/setup.sh
test -d docs/cto
test -d docs/runbooks
test -d history
# Ensure we did not require moving foundation
test -d elektron-digital-twin-foundation -o -f index.html
echo "repo-health ok"
