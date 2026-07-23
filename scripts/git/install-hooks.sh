#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
mkdir -p "$ROOT/.githooks"
cp -f "$ROOT/scripts/git/pre-commit" "$ROOT/.githooks/pre-commit"
chmod +x "$ROOT/.githooks/pre-commit" "$ROOT/scripts/git/pre-commit"
git -C "$ROOT" config --local core.hooksPath "$ROOT/.githooks"
echo "git hooks installed → .githooks/pre-commit"
