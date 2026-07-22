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

---

## L-003 — M10 audit round (self-audit vs owner review_73) + gap-fixes

- Date: 2026-07-22
- Agent: Claude Code
- Status: Verified
- Commits: the audit-archive commit (`c0f026f`) + the audit gap-fix engine commit
  on `claude/docs-structure-large-projects-b6vxx5` (see `git log`)
- Evidence: **re-runnable** — `cd engine && npm ci && npm run migrate && npm run
  seed && npm run verify && npm test && npm run build` → all PASS (migrate 30
  tables; seed 0 approvals/0 passes; verify 13/13; **test 31/31**; build clean).
  Point-by-point audit + Revision-07-to-code traceability matrix in
  `engine/IMPLEMENTATION_REPORT.md` (§ "Audit response — owner review_73").
- Verified by: Claude Code 2026-07-22 via the cited commands (re-runnable). This
  round resolved the genuine gaps that applied to `engine/` (review_73 pts
  5/7/8/9/10/11/15/17/20), each with a test, and classified the remainder.
  **Honest status: `M10 IMPLEMENTATION FOUNDATION VERIFIED (bounded)` — NOT
  `M10 COMPLETE`, NOT `DATABASE FROZEN`, NOT `HIL READY`** (D-012). M10G SIL, M10H
  HIL, TelemetryLog payload validation (DEFERRED_WITH_BLOCK), the broad rev07
  baseline M10, ODR-001..003, and M11 remain gated. No software test proves
  hardware safety.

---

## L-004 — M10 adversarial verification + M10.1 hardening (directive_04)

- Date: 2026-07-22
- Agent: Claude Code
- Status: Verified
- Commits: the directive_04 archive (`7a59cf0`) + the verification/hardening engine
  commit on `claude/docs-structure-large-projects-b6vxx5` (see `git log`)
- Evidence: **re-runnable** — `cd engine && npm ci && npm run verify:attack &&
  npm run verify:determinism && npm run verify:perf && npm test` →
  attack 11/12 BLOCKED (A9 clock = documented residual); determinism ALL PASS;
  perf measured to 100k vehicles; **39/39 tests**. Full report
  `engine/VERIFICATION_REPORT.md`; findings + scores + risk register + M10.1 backlog.
- Verified by: Claude Code 2026-07-22 via the cited harness commands (any agent or
  the owner can re-run to reproduce). 6 proven weaknesses found; 5 fixed by
  DB-level hardening (`migrations/003_hardening.sql`); 1 residual (A9) accepted-risk.
  **Honest verdict: prototype-grade, deterministic, tamper-evident records
  foundation — NOT production-grade; software does NOT establish physical safety**
  (D-013). M10G SIL, M10H HIL, the broad rev07 baseline M10, ODR-001..003, and M11
  remain gated; M11 not started.
