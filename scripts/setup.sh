#!/usr/bin/env bash
# Product scope: Elektron Development Environment (EDE)
# Purpose: Configure a source-workstation from a clean clone.
# Not the macOS offline installer (see scripts/setup-macos.sh / Install Elektron.command).
# Usage: ./scripts/setup.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
mkdir -p logs
LOG="logs/setup-$(date -u +%Y%m%dT%H%M%SZ).log"
exec > >(tee -a "$LOG") 2>&1

echo "== Elektron Developer Environment setup =="
echo "root=$ROOT"

bash "$ROOT/scripts/bootstrap.sh"
bash "$ROOT/scripts/git/install-hooks.sh"
bash "$ROOT/scripts/setup/install-node-deps.sh"
bash "$ROOT/scripts/setup/install-python-venv.sh"
bash "$ROOT/scripts/setup/link-editor-config.sh"

echo
echo "Setup complete. Next:"
echo "  source config/shell/elektron-aliases.sh"
echo "  npm run ede:doctor"
echo "  npm run dashboard"
echo
echo "Note: npm run doctor / npm run backup are Local Runtime tools."
echo "      EDE uses npm run ede:doctor / npm run ede:snapshot."
