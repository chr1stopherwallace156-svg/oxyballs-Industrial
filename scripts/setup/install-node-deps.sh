#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
echo "== npm deps =="
if [[ -f package-lock.json ]]; then npm ci; else npm install; fi
