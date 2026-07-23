#!/usr/bin/env bash
# bootstrap.sh — Idempotent OS-level prerequisites check + minimal dirs.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "== bootstrap =="
mkdir -p logs backups .venv tools reference

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "MISSING required command: $1" >&2
    echo "See ENVIRONMENT.md" >&2
    return 1
  fi
  echo "  found $1 ($("$1" --version 2>/dev/null | head -1 || echo ok))"
}

need git
need node
need npm
need python3
need sqlite3

# Local git template (repo-scoped)
git config --local commit.template "$ROOT/config/git/commit-template.txt" || true
git config --local core.hooksPath "$ROOT/.githooks" || true

echo "bootstrap ok"
