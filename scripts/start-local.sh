#!/usr/bin/env bash
# Open the static site and print the local operations menu. Fully offline.
set -euo pipefail
. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_common.sh"
detect_platform

echo "Elektron — start local"
[ -d "$ENGINE/node_modules" ] || warn "Not installed yet. Run 'Install Elektron.command' first."
if [ -f "$ROOT/index.html" ]; then
  section "Static site"
  info "$ROOT/index.html"
  if [ "$OS" = macos ] && need_cmd open; then open "$ROOT/index.html" && ok "opened in browser"
  elif need_cmd xdg-open; then xdg-open "$ROOT/index.html" >/dev/null 2>&1 & ok "opened in browser"
  else info "Open it manually in your browser."; fi
fi
section "Local operations (offline)"
cat <<'MENU'
  Generate Platform 001   ->  double-click "Generate Platform 001.command"
  Verify everything       ->  double-click "Verify Elektron.command"
  Back up / restore       ->  "Backup Elektron.command" / "Restore Elektron.command"
  Health check            ->  bash scripts/doctor.sh
  Engine (cd engine):     npm run migrate | npm test | npm run platform001:generate
  Twin validation:        ../.local/venv/bin/python verification/run_kernel_validation.py
MENU
echo; ok "Ready. Nothing here needs the internet once installed."
