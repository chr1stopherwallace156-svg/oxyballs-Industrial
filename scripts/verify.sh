#!/usr/bin/env bash
# verify.sh — Pre-push / release verification entrypoint.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
bash "$ROOT/scripts/doctor.sh"
bash "$ROOT/dev/checks/run-all.sh"
echo "verify ok"
