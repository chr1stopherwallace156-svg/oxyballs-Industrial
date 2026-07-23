#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
echo "== python venv =="
if ! python3 -c "import ensurepip" 2>/dev/null; then
  echo "WARNING: python3 ensurepip/venv not available."
  echo "  Debian/Ubuntu: sudo apt-get install -y python3-venv python3-pip"
  echo "  macOS: brew install python"
  echo "Skipping venv creation (doctor will note Environment)."
  exit 0
fi
python3 -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate
pip install -U pip
pip install -r requirements-ede.txt
echo "venv ready: source .venv/bin/activate"
