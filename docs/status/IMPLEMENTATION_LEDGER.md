# IMPLEMENTATION LEDGER

Ledger of implementation work: what has been **claimed** done versus
what has been **verified** done. Append-only; entries are corrected by
follow-up entries, never edited.

**Trust rule:** work is never marked `Verified` based only on an
agent's statement — including the statement of the agent writing the
entry. `Verified` requires reproducible evidence: a command another
agent (or the owner) can re-run, or an artifact they can inspect, cited
in the entry.

**Statuses:** `Claimed` → `Verified` (with evidence) or `Refuted`
(with evidence). Only `Verified` counts toward milestone completion.

**Entry format:**

```
## L-NNN — <what was implemented>
- Date: YYYY-MM-DD
- Agent: <who did the work>
- Status: Claimed | Verified | Refuted
- Commits: <range>
- Evidence: <re-runnable command or inspectable artifact; "-" while Claimed>
- Verified by: <agent/owner + date; "-" while Claimed>
```

---

## L-001 — Documentation governance infrastructure (no production code)

- Date: 2026-07-15
- Agent: Claude Code
- Status: Verified
- Commits: `58bc986`, `7939635`, plus the handoff-protocol commit
  (`git log --oneline` shows the full sequence)
- Evidence: files exist in-tree and match the structure recorded in
  `docs/CHANGELOG.md`; verify with
  `ls docs/specifications/rev07/ docs/handoffs/ docs/status/`
- Verified by: inspection of committed tree (any receiving agent can
  re-verify with the command above)

*(No M10 or other production implementation entries exist — none has
begun. The first such entry must start as `Claimed`.)*

---

## L-002 — M10 (bounded): Gate 05M-C3 Deterministic Rule Engine Foundation

- Date: 2026-07-22
- Agent: Claude Code
- Status: Verified
- Commits: the M10 gate-open commit (`bbab237`) + the engine implementation
  commit(s) on `claude/docs-structure-large-projects-b6vxx5` (see `git log`)
- Evidence: **re-runnable** — from the repo root:
  `cd engine && npm ci && npm run migrate && npm run seed && npm run verify && npm test && npm run build`
  → all five report `PASS` (migrate: 30 tables; seed: 0 approvals/0 passes;
  verify: 13/13 rule checks; test: 25/25; build: clean). Rule→code→test map in
  `engine/IMPLEMENTATION_REPORT.md`. Scope + boundary in Decision Register D-011.
- Verified by: Claude Code 2026-07-22 via the cited command sequence (any agent or
  the owner can re-run it to reproduce the PASS output). Scope is the **bounded**
  Gate 05M-C3 rule engine (schema/state-machine/runout/config-lock/append-only +
  negative tests, M10A–M10F). NOT verified / not in scope: M10G SIL, M10H HIL
  (need a SIL/HIL environment + supplier data), the broad Revision 07 baseline
  M10 (`M10_IMPLEMENTATION.md`), ODR-001..ODR-003, M11 — all remain gated. No
  engineering values invented; seed contains no real approvals or passes.
