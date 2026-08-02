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

---

## L-005 — M10 final evidence-pack reconciliation + two proven-defect fixes

- Date: 2026-07-22
- Agent: Claude Code
- Status: Verified
- Commits: the reconciliation commit on `claude/docs-structure-large-projects-b6vxx5`
  (see `git log`), on top of `c97b3ac`
- Evidence: **re-runnable** — from `engine/`:
  `npm run migrate && npm run verify:attack && npm run verify:determinism &&
  npm run verify:perf && npm test && npm run build` → migrate PASS (4 migrations,
  33 tables); attack 11/12 BLOCKED (A9 residual); determinism ALL PASS; perf
  fully index-driven (100k join ~0.013 ms/query, median+p95 reported, query plan
  captured); **test 40/40**; build exit 0. Full 10-item answer in
  `engine/EVIDENCE_PACK.md`.
- Verified by: Claude Code 2026-07-22 via the cited commands (re-runnable). This
  round: (1) reconciled the finding count to **6 groups / 7 probes**; (2) built the
  full A1–A12 matrix; (3–4) recorded exact commit/branch/status + verbatim command
  outputs; (5) added median/p95 + `EXPLAIN QUERY PLAN` to `verify:perf`, exposing a
  **proven O(n) join defect** fixed by `migrations/004_join_indexes.sql` (two
  non-semantic FK indexes); (6) documented the EvidenceLedger threat model; (7)
  pinned the VIN finding to `IndividualVehicle.vin` (001) + partial-unique fix
  (003); (8) verified and **fixed the M1 atomicity defect** with a nestable SAVEPOINT
  `atomic()` wrapper around `applyTransition`/`activate`/`aggregate`, proven by a new
  rollback test. **Honest status unchanged: `M10 IMPLEMENTATION FOUNDATION VERIFIED
  (bounded)` — prototype-grade, NOT production, NOT HIL-ready** (D-014). M11 not
  started; ODR-001..003 open; the broad rev07 baseline M10, M10G SIL, M10H HIL
  remain gated; seed still 0 approvals/0 passes. No engineering value invented.

---

## L-006 — Platform 001 Build Package v0.1 (vertical slice)

- Date: 2026-07-22
- Agent: Claude Code
- Status: Verified
- Commits: the Platform 001 slice commit on `claude/docs-structure-large-projects-b6vxx5`
  (see `git log`), on top of `d44b6bd`
- Evidence: **re-runnable** — from `engine/`:
  `npm run migrate && npm test && npm run build && npm run verify:attack &&
  npm run verify:determinism && npm run verify:attack:package && npm run platform001:generate`
  → migrate PASS (5 migrations, 40 tables); **test 54/54**; build clean; M10 attack
  11/12 BLOCKED (A9 residual, unchanged); M10 determinism ALL PASS; package attack
  **9/9 BLOCKED, 0 findings**; generate PASS (DRAFT_INCOMPLETE, determinism PASS).
  Generated artifact: `engine/output/platform-001/build-package.{md,json}`
  (`BP_PLATFORM-001_d64d1b6a434a`). Milestone record: `docs/status/PLATFORM_001_STATUS.md`.
- Verified by: Claude Code 2026-07-22 via the cited commands (re-runnable). Built the
  first end-to-end Build Engine workflow as a NEW layer above M10 (no M10 behavior
  change). A build package is CHECK-locked to `DRAFT_INCOMPLETE` (no approval status
  possible); every unknown becomes a tracked ODR + deterministic block reason; all
  decisions/ids/hashes are deterministic. Two proven defects fixed with regression
  tests (un-approvable status; package-scoped child ids). **Honest status:
  DRAFT_INCOMPLETE — NOT an approval, NOT prototype/procurement readiness, NOT a
  safety claim** (D-015). No engineering value invented; no supplier data entered;
  ODR-001..003 untouched; M11 not started; 7 new open ODRs registered (ODR-004..010).
