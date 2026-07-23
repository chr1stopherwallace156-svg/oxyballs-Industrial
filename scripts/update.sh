#!/usr/bin/env bash
# update.sh — Refresh EDE deps and pull tips carefully.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
echo "== update =="
if [[ -f package-lock.json ]]; then npm ci; else npm install; fi
if [[ -x .venv/bin/pip ]]; then
  .venv/bin/pip install -U pip
  if [[ -f requirements-ede.txt ]]; then .venv/bin/pip install -r requirements-ede.txt; fi
fi
echo "update ok — review git status before pulling remote branches"
