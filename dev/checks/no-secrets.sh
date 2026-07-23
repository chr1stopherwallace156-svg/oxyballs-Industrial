#!/usr/bin/env bash
# Scan for accidental secret-like tokens (heuristic).
# Excludes this script, vendor trees, and documentation examples.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

EXCLUDE='(^\.git/|node_modules/|\.venv/|vendor/|Pods/|DerivedData/|logs/|backups/|dev/checks/no-secrets\.sh$|\.md$|\.json$)'

FOUND=0
while IFS= read -r -d '' f; do
  if echo "$f" | grep -Eq "$EXCLUDE"; then
    continue
  fi
  if grep -Eq \
    -e '-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----' \
    -e 'AKIA[0-9A-Z]{16}' \
    -e 'ghp_[A-Za-z0-9]{20,}' \
    -e 'xox[baprs]-[A-Za-z0-9-]{10,}' \
    -e 'sk_live_[A-Za-z0-9]{16,}' \
    "$f" 2>/dev/null; then
    echo "Possible secret pattern in: $f" >&2
    FOUND=1
  fi
done < <(find . -type f -print0 2>/dev/null | head -z -n 5000)

if [[ "$FOUND" -ne 0 ]]; then
  echo "no-secrets: FAIL" >&2
  exit 1
fi
echo "no-secrets: ok"
exit 0
