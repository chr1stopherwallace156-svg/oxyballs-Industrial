#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
echo "== editor config =="
mkdir -p .vscode
cp -f config/vscode/extensions.json .vscode/extensions.json
cp -f config/vscode/settings.json .vscode/settings.json
echo "VS Code / Cursor recommendations linked into .vscode/"
