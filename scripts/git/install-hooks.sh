#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
mkdir -p "$ROOT/.githooks"
cp -f "$ROOT/scripts/git/pre-commit" "$ROOT/.githooks/pre-commit"
chmod +x "$ROOT/.githooks/pre-commit" "$ROOT/scripts/git/pre-commit"
# Relative hooksPath so the same clone works on every machine.
git -C "$ROOT" config --local core.hooksPath .githooks
echo "git hooks installed → .githooks/pre-commit"
