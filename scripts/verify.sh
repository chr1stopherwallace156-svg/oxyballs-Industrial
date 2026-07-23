#!/usr/bin/env bash
# Product scope: Elektron Development Environment (EDE)
# Purpose: Pre-push / release verification for the source workstation.
# Runs EDE doctor (not local-runtime doctor) plus shared repo checks.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
bash "$ROOT/scripts/dev/ede/doctor.sh"
bash "$ROOT/dev/checks/run-all.sh"
echo "verify ok"
