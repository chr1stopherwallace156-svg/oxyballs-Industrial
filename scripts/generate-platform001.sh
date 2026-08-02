#!/usr/bin/env bash
# Regenerate the Platform 001 build package locally (non-destructive: the engine
# clears only prior Platform-001 package rows in FK-safe order; the database and all
# unrelated records are preserved).
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
detect_platform                      # <-- set OS/ARCH before we use them
[ -d "$ENGINE/node_modules" ] || { fail "Not installed. Run 'Install Elektron.command' first."; exit 1; }
echo "Elektron — generate Platform 001 (persistent DB, deterministic)"
regen_platform001
echo
ok "Build package written:"
info "$ENGINE/output/platform-001/build-package.md   (human-readable)"
info "$ENGINE/output/platform-001/build-package.json  (machine-readable)"
if [ "$OS" = macos ] && need_cmd open; then open "$ENGINE/output/platform-001/build-package.md" 2>/dev/null || true; fi
