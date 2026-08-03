#!/usr/bin/env bash
# Terminal development dashboard
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
MILESTONE="$(grep -m1 'IN_PROGRESS' docs/cto/MILESTONE_TRACKER.md 2>/dev/null | sed 's/|/-/g' || echo 'see MILESTONE_TRACKER')"
BLOCKERS="$(grep -E 'BLOCKED|HIGH' docs/cto/RISK_REGISTER.md docs/cto/TECHNICAL_DEBT.md 2>/dev/null | head -5 || true)"
LAST_SNAPSHOT="$(ls -1dt artifacts/ede-snapshots/ede-snapshot-* 2>/dev/null | head -1 || echo none)"
DB_STATE="unknown"
if bash scripts/database/health.sh >/tmp/ede-db.out 2>&1; then DB_STATE="ok"; else DB_STATE="fail"; fi

cat <<EOF
======== Elektron dashboard ========
Repository:     $(basename "$ROOT")
Remote tip:     $(git rev-parse --short HEAD 2>/dev/null || echo n/a)
Current branch: $BRANCH
Current milestone (IN_PROGRESS):
  $MILESTONE
Outstanding risks/debt (sample):
$(echo "$BLOCKERS" | sed 's/^/  /')
Prototype readiness: see docs/cto/PROTOTYPE_STATUS.md
Last EDE snapshot: $LAST_SNAPSHOT
Database health: $DB_STATE
EDE version:    0.1.0
====================================
EOF
