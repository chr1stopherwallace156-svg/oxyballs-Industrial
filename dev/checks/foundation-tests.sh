#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT/elektron-digital-twin-foundation"
if [[ -x "$ROOT/.venv/bin/python" ]]; then PY="$ROOT/.venv/bin/python"; else PY=python3; fi
if ! "$PY" -c "import pytest" 2>/dev/null; then
  echo "pytest missing — skip"
  exit 0
fi
"$PY" -m pytest tests/eae -q --tb=line
