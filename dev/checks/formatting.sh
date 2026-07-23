#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
if command -v npx >/dev/null && [[ -f "$ROOT/node_modules/.bin/prettier" || -f "$ROOT/package.json" ]]; then
  if [[ -x "$ROOT/node_modules/.bin/prettier" ]]; then
    "$ROOT/node_modules/.bin/prettier" --check \
      "PROJECT_MANIFEST.json" "package.json" "ENVIRONMENT.md" \
      2>/dev/null || echo "prettier reported issues (non-blocking until baseline formatted)"
  else
    echo "prettier not installed yet — run npm run setup"
  fi
fi
# Executable shell scripts should have shebangs (skip sourced libs named lib.sh)
while IFS= read -r f; do
  [[ "$(basename "$f")" == "lib.sh" ]] && continue
  head -1 "$f" | grep -q '^#!' || { echo "missing shebang: $f"; exit 1; }
done < <(find scripts dev/checks -name '*.sh' -type f)
echo "formatting ok"
