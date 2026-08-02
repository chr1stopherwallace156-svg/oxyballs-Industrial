# M10 Adversarial Verification — Final Evidence-Pack Reconciliation

**Commissioned by:** owner final directive ("Perform a final evidence-pack
reconciliation for the M10 adversarial verification"). **Target:** the bounded
Gate 05M-C3 Deterministic Rule Engine (`engine/`, frozen source spec Gate
05M-C3 Revision 08, RC-313..425). **Rule:** every claim below is reproduced by a
runnable command or an inspectable artifact — nothing is asserted on narrative.

This pack does **not** start M11 and makes **no** hardware-in-the-loop (HIL) or
physical-safety claim. It reconciles and closes the adversarial-verification
round (D-013 / L-004) plus two proven, reproducible defects corrected here
(atomicity M1; a missing-index O(n) join). Honest status is unchanged:
**verified, deterministic, tamper-evident records foundation — prototype-grade,
NOT production-grade; software does not establish physical safety.**

---

## Item 1 — Finding count reconciliation (6 vs 7)

**Reconciled answer: six distinct finding groups (root causes) spanning seven
probes.** Both earlier phrasings are reconcilable to this:

- The **Phase-1 architecture table** and Executive Summary say **"6 real
  weaknesses"** — that counts *root causes*.
- The **state-machine root cause is exercised by two probes** (A1 = precondition
  bypass, A2 = SUPERSEDED→ACTIVE resurrection), so a *probe*-level count is seven.

The six groups and their probes:

| # | Finding group (root cause) | Severity | Probe(s) | Status |
|---|---|---|---|---|
| 1 | State machine enforced only in service layer (graph + activation preconditions) | CRITICAL | A1, A2 | FIXED (003) |
| 2 | Single-active check racy for NULL sessions | HIGH | A6 | FIXED (003) |
| 3 | Evidence not chained / no verify routine | HIGH | A12 | FIXED (003 + ledger.ts) |
| 4 | Revoked runout could be flipped back to SIGNED_RELEASE | MEDIUM | A4 | FIXED (003) |
| 5 | VIN non-unique (two vehicles could share a VIN) | MEDIUM | A8 | FIXED (003) |
| 6 | Clock trust — caller-supplied `now` defeats expiry | MEDIUM | A9 | RESIDUAL (accept-risk) |

So: **6 finding groups, 7 probes, 5 fixed at the DB layer, 1 residual (A9).**
The attack harness prints `1 open finding(s) across 12 probes` — the single open
item is A9 (the other 11 probes are BLOCKED). The "12 probes" total includes
five non-finding regression probes (A3, A5, A7, A10, A11) that were BLOCKED from
the start and are kept as guards.

---

## Item 2 — Final A1–A12 probe matrix

Setup/operation are the literal probe bodies in `verify/attack.ts`; each probe
runs against a **fresh migrated in-memory DB**. "Baseline" = behaviour before
migration `003_hardening.sql`. Reproduce all rows: `npm run verify:attack`.

| Probe | Requirement tested | Exact setup | Exact attack operation | Expected | Baseline (pre-003) | Corrective migration / code path | Final | Residual risk | Linked test |
|---|---|---|---|---|---|---|---|---|---|
| **A1** | Activation preconditions cannot be skipped | `buildAuthorizedChain({signRunout:false})` (runout DRAFT, cell AUTHORIZED) | `UPDATE TestCellAuthorization SET status='ACTIVE'` | BLOCKED | BYPASS | `003` `trg_tca_status_transition` + `trg_tca_activation_preconditions` | **BLOCKED** | none | `HARDENING A1: AUTHORIZED->ACTIVE with an unreleased runout is blocked by the DB` |
| **A2** | No resurrection of a terminal state | `buildAuthorizedChain`, then set status `SUPERSEDED` | `UPDATE ... SET status='ACTIVE'` | BLOCKED | BYPASS | `003` `trg_tca_status_transition` (graph from `AllowedAuthTransition`) | **BLOCKED** | none | `HARDENING A2: a SUPERSEDED cell (reached via legal transitions) cannot be resurrected to ACTIVE` |
| **A3** | Signed signoff is immutable | Insert one `SignoffRecord` | `UPDATE SignoffRecord SET signer_identity='x'` | BLOCKED | BLOCKED | `002` append-only trigger | **BLOCKED** | none | `NEG: signed evidence is append-only (triggers block UPDATE/DELETE)` |
| **A4** | Revoked runout cannot re-release | `buildAuthorizedChain` → `activate` → `applyConfigurationChange` (runout → REVOKED_PENDING_RECALCULATION) | `UPDATE RunoutAggregationResult SET authorization_status='SIGNED_RELEASE'` | BLOCKED | BYPASS | `003` `trg_rar_no_resurrect` | **BLOCKED** | none | `HARDENING A4: a REVOKED_PENDING_RECALCULATION runout cannot be resurrected to SIGNED_RELEASE` |
| **A5** | No ready-made ACTIVE insert | `insertBase` | `INSERT TestCellAuthorization(... status='ACTIVE')` | BLOCKED | BLOCKED | `003` `trg_tca_initial_status_insert` | **BLOCKED** | none | `HARDENING: a ready-made ACTIVE cell cannot be inserted directly (must transition)` |
| **A6** | Single ACTIVE incl. NULL session | `insertBase` | `INSERT ... test_session_id=NULL, status='ACTIVE'` | BLOCKED | BYPASS | `003` `trg_tca_initial_status_insert` + NULL-safe `trg_tca_single_active_*` | **BLOCKED** | none | `HARDENING A6: DB blocks a second cell transitioning to ACTIVE on the same vehicle/subgate/session` |
| **A7** | FK integrity | fresh DB | `INSERT VehicleBuild(individual_vehicle_id='MISSING')` | BLOCKED | BLOCKED | `001` FK + `PRAGMA foreign_keys=ON` | **BLOCKED** | none | `foreign keys are enforced (invalid FK rejected)` |
| **A8** | VIN uniqueness | Insert `IV1` with `VIN-DUP` | `INSERT IV2` with same `VIN-DUP` | BLOCKED | BYPASS | `003` `ux_individual_vehicle_vin` (partial unique) | **BLOCKED** | none | `HARDENING A8: VIN maps to at most one IndividualVehicle` |
| **A9** | Expiry survives clock rollback | `buildAuthorizedChain`, set `authorization_expiry` 1 s in the past | `activate(..., now = now-3600s)` (attacker supplies a past `now`) | BYPASS-IS-FINDING | BYPASS | **none** — needs attested/monotonic time; `now` is a test seam | **BYPASS (residual)** | in-process caller can defeat expiry (R1) | *(none — documented residual; not a passing guard)* |
| **A10** | Geometry sanity | `insertBase` + a `RunoutCalculations` | `INSERT DistanceComponent(zone_start=10, zone_end=0, value=-10)` | BLOCKED | BLOCKED | `001` CHECK (`zone_end >= zone_start`, value ≈ span) | **BLOCKED** | float epsilon (m1, LOW) | `NEG: distance component whose value != (end-start) is rejected by the DB CHECK` |
| **A11** | Transition event immutable | `buildAuthorizedChain` → `activate` (writes a transition) | `DELETE FROM AuthorizationTransition` | BLOCKED | BLOCKED | `002` append-only trigger on `AuthorizationTransition` | **BLOCKED** | none | *(probe A11 in `verify:attack`; 002 trigger)* |
| **A12** | Evidence chain detects tampering | `buildAuthorizedChain` → `activate` (appends a ledger row) | `INSERT EvidenceLedger(... prev_hash='WRONG_PREV')` then `verifyLedgerChain` | detected (BLOCKED) | BYPASS (no chain existed) | `003` `EvidenceLedger` + `src/ledger.ts` (`appendLedger`/`verifyLedgerChain`) | **BLOCKED** | chain covers transitions only (H3) | `HARDENING A12: evidence hash chain verifies and detects tampering` |

---

## Item 3 — Repository commit, branch, clean status

- **Branch:** `claude/docs-structure-large-projects-b6vxx5`
- **Prior verified HEAD (adversarial round, D-013/L-004):**
  `c97b3acdeba81832f07d26a76c036d0a75eef6d2`
- **This reconciliation** adds: `migrations/004_join_indexes.sql`, the SAVEPOINT
  `atomic()` helper + its use in `authorization.ts`/`runout.ts`, the M1 rollback
  test, the enhanced `verify/perf.ts`, this document, the `VERIFICATION_REPORT.md`
  M1 status update, and the handoff/decision/ledger updates.
- **Verify after the reconciliation commit lands** (working tree must be clean):
  ```
  git rev-parse HEAD        # the reconciliation commit
  git status --porcelain    # empty output = clean
  git log --oneline -1
  ```

---

## Item 4 — Exact command outputs (captured this run)

Environment: **Node v22.22.2, npm 10.9.7, Linux 6.18.5 x86_64.** `node:sqlite`
`DatabaseSync` (experimental, `--no-warnings`). Commands from `engine/`.

**`npm run migrate`** (fresh `data/engine.db`):
```
[migrate] db=/home/user/Elektron-Indsutrial/engine/data/engine.db
[migrate] newly applied: 001_core_schema.sql, 002_append_only_triggers.sql, 003_hardening.sql, 004_join_indexes.sql
[migrate] migrations recorded: 4; tables: 33
[migrate] PASS
```

**`npm run verify:attack`**:
```
  A1   CRITICAL  BLOCKED  BLOCKED   direct AUTHORIZED->ACTIVE write skipping activation preconditions (runout not released)
  A2   CRITICAL  BLOCKED  BLOCKED   authorization resurrection: SUPERSEDED->ACTIVE via direct SQL
  A3   HIGH      BLOCKED  BLOCKED   mutate signed SignoffRecord
  A4   MEDIUM    BLOCKED  BLOCKED   revoked runout resurrection: REVOKED_PENDING_RECALCULATION->SIGNED_RELEASE
  A5   HIGH      BLOCKED  BLOCKED   direct insert of a ready-made ACTIVE cell (skips activation)
  A6   HIGH      BLOCKED  BLOCKED   multiple ACTIVE cells via direct insert (NULL session)
  A7   HIGH      BLOCKED  BLOCKED   orphan FK insert (VehicleBuild with missing IndividualVehicle)
  A8   MEDIUM    BLOCKED  BLOCKED   VIN reuse across two IndividualVehicle rows
  A9   MEDIUM    BYPASS   BYPASS-IS-FINDING   clock rollback resurrects an expired authorization (caller-supplied now)  <-- FINDING
  A10  LOW       BLOCKED  BLOCKED   negative / zero-length geometry (zone_end < zone_start)
  A11  HIGH      BLOCKED  BLOCKED   delete immutable AuthorizationTransition event
  A12  HIGH      BLOCKED  BLOCKED   evidence hash chain detects a forged ledger row
[attack] 1 open finding(s) across 12 probes
```

**`npm run verify:determinism`**:
```
[determinism] L_min value stable across 2000 identical runs: PASS (value=30)
[determinism] calculation hash is a pure, key-order-free function of inputs: PASS
[determinism] state-machine routing identical across 192 evaluations: PASS
[determinism] identical invalid input -> single block reason: PASS (INSUFFICIENT_TRACK_LENGTH)
[determinism] ALL DETERMINISTIC — PASS
```

**`npm run verify:perf`** — see Item 5 (query plan + median/p95 table).

**`npm test`**:
```
# tests 40
# suites 0
# pass 40
# fail 0
# skipped 0
```

**`npm run build`**: `tsc -p tsconfig.json` → exit 0 (no diagnostics).

> Note on shell exit codes: piping any command through `grep` makes `$?`/`PIPESTATUS`
> reflect grep's exit (1 when it filters out all lines), not the program's. Build/test
> success is read from `# fail 0` and the clean `tsc` output, captured without a grep
> pipe: `npm run build; echo BUILD_EXIT=$?` → `BUILD_EXIT=0`.

---

## Item 5 — Benchmark methodology

**Harness:** `verify/perf.ts` (`npm run verify:perf`). **Environment:** Node
v22.22.2, `node:sqlite` single file on the container's writable disk, one
synchronous connection. **Dataset shape:** per vehicle, 4 rows —
`IndividualVehicle` + `VehicleBuild` + `ConfigurationPacket` +
`RunoutCalculations` — inserted in one `BEGIN…COMMIT`. Scales: 10 / 100 / 1,000 /
10,000 / 100,000 vehicles (40 → 400,000 rows).

**Read benchmark:** the fixed 3-way FK-indexed join resolving a random vehicle to
its `RunoutCalculations` row. **Iterations:** 1,000 random point-lookups per
scale. Each query is individually timed with `performance.now()`; the 1,000
samples are sorted and reduced to **mean, median (p50), and p95** (nearest-rank).

**Query plan** (`EXPLAIN QUERY PLAN`, captured by the harness):

*Before* migration 004:
```
SEARCH iv USING COVERING INDEX sqlite_autoindex_IndividualVehicle_1 (individual_vehicle_id=?)
SCAN rc
SEARCH cp USING INDEX sqlite_autoindex_ConfigurationPacket_1 (configuration_packet_id=?)
```
`SCAN rc` = a full scan of `RunoutCalculations` per query → time grew linearly
with fleet size (proven defect, corrected below).

*After* migration 004 (`idx_config_packet_vehicle`, `idx_runout_calc_config`):
```
SEARCH iv USING COVERING INDEX sqlite_autoindex_IndividualVehicle_1 (individual_vehicle_id=?)
SEARCH cp USING INDEX idx_config_packet_vehicle (individual_vehicle_id=?)
SEARCH rc USING INDEX idx_runout_calc_config (configuration_packet_id=?)
```
Fully index-driven; per-query time is ~constant across scale.

**Results (after 004):**

| vehicles | rows | insert (ms) | join mean (ms) | join median (ms) | join p95 (ms) | db size |
|---:|---:|---:|---:|---:|---:|---:|
| 10 | 40 | 5 | 0.0060 | 0.0044 | 0.0093 | 0.33 MB |
| 100 | 400 | 5 | 0.0060 | 0.0048 | 0.0069 | 0.34 MB |
| 1,000 | 4,000 | 16 | 0.0061 | 0.0053 | 0.0105 | 0.64 MB |
| 10,000 | 40,000 | 107 | 0.0098 | 0.0081 | 0.0185 | 3.48 MB |
| 100,000 | 400,000 | 1,028 | 0.0134 | 0.0121 | 0.0201 | 34.32 MB |

**Before 004** (same harness, for the proven-defect record): the same join was
O(n) — 1,000 → 0.11 ms, 10,000 → 1.22 ms, 100,000 → **16.5 ms** median-ish per
query. Migration 004 reduced the 100k per-query time ~1,200×. Bulk insert remains
transaction-bound (linear in rows, expected). Standing scale caveats
(single-writer, telemetry growth) are unchanged — see `VERIFICATION_REPORT.md`.

---

## Item 6 — EvidenceLedger threat model

**What it is:** an append-only `EvidenceLedger` table (INSERT-only via `002`/`003`
triggers) plus a SHA-256 hash chain (`src/ledger.ts`). Each row stores
`content_hash`, `prev_hash` (the previous row's `record_hash`), and its own
`record_hash = SHA256(canonical_content | prev_hash | artifact_hashes | timestamp
| signer_identity)`. Every authorization transition appends one row inside the
same atomic unit as the transition (Item 8).

**What it DETECTS** (via `verifyLedgerChain`):
- **Deletion** of a chained row — the successor's `prev_hash` no longer matches,
  chain breaks at that seq.
- **Reordering / insertion** of a forged row — a wrong `prev_hash` is detected
  (probe A12: an inserted row with `prev_hash='WRONG_PREV'` makes the chain
  report `ok:false`).
- **In-place mutation** of a chained row — the `002`/`003` UPDATE/DELETE triggers
  reject it outright (`APPEND_ONLY_VIOLATION`); even if bypassed, the recomputed
  linkage would diverge.

**What it does NOT detect / out of scope:**
- **Authorship / authenticity.** `signer_identity` is a plaintext string, not a
  cryptographic signature. The ledger proves *"these records form an unbroken
  chain,"* not *"approver X actually signed this."* A writer who appends a fully
  self-consistent forged tail (recomputing every `record_hash` forward) produces
  a chain that `verifyLedgerChain` accepts — because there is no external anchor
  to contradict it. This is the H1/H3 gap.
- **Coverage.** Only authorization *transitions* are chained today; results,
  artifacts, and signoffs are not yet appended (H3).
- **External tamper of the whole DB file.** A single trusted process holding the
  file can rewrite history end-to-end; nothing outside the file disagrees.

**Why PKI and external anchoring remain deferred (M10.1, not this scope):**
- **PKI (per-approver signing keys)** would bind each record to an identity that a
  verifier can check without trusting the writer — closing the authorship gap.
  It needs a key-management story (issuance, rotation, revocation) that is a
  module above the rule engine, not part of the bounded Gate 05M-C3 schema.
- **External anchoring** (publishing periodic chain roots to an independent
  append-only store / notary) would make full-chain rewrites detectable by a
  party who does not trust the DB file. It needs an external service and a trust
  root, both outside this bounded scope.

**Current trust boundary (honest):** the ledger is *tamper-evident within a
single trusted writer* — it catches accidental/opportunistic edits and deletions,
not a determined insider with full write access and no external witness. Risks
R3 (opaque signatures) and the H1/H3 items track the closure path.

---

## Item 7 — VIN non-uniqueness: exact table and pre-fix schema

**Table:** `IndividualVehicle` (`migrations/001_core_schema.sql`, lines 12–17):
```sql
CREATE TABLE IndividualVehicle (
  individual_vehicle_id       TEXT PRIMARY KEY,
  vin                         TEXT,
  platform_id                 TEXT NOT NULL,
  status                      TEXT NOT NULL DEFAULT 'DRAFT'
);
```
**Pre-fix behaviour:** `vin` is a plain nullable `TEXT` column with **no UNIQUE
constraint and no index**. Two distinct `individual_vehicle_id` rows could
therefore carry the **same** VIN (probe A8 baseline: BYPASS), making vehicle
identity ambiguous and letting cross-record equality checks pass against the
wrong vehicle.

**Fix (`migrations/003_hardening.sql`, line 95):**
```sql
CREATE UNIQUE INDEX ux_individual_vehicle_vin ON IndividualVehicle(vin) WHERE vin IS NOT NULL;
```
A **partial** unique index: it forbids duplicate non-NULL VINs while still
allowing multiple rows with an unknown (NULL) VIN — consistent with BQ-27 (donor
VIN not yet confirmed; an unknown value must not be forced unique). Probe A8 is
now BLOCKED; test `HARDENING A8: VIN maps to at most one IndividualVehicle`.

---

## Item 8 — Atomicity of activation / transition / ledger writes

**Baseline defect (proven, reproducible):** `applyTransition()` issued three
separate writes — INSERT `AuthorizationTransition`, UPDATE
`TestCellAuthorization.status`, `appendLedger(...)` — with **no** enclosing
transaction; `activate()` added a fourth (activation-timestamp UPDATE); and
`aggregate()` wrote a `RunoutAggregationResult` followed by an unwrapped loop of
`RunoutAggregationComponent` snapshot rows. A failure (or a trigger `RAISE`)
partway through left partial state: an orphan transition row, or a ledger entry
for a status that never landed, or a result row with an incomplete frozen
snapshot. Recorded as finding **M1** in `VERIFICATION_REPORT.md`.

**Correction (deterministic; permitted proven-defect fix):** a nestable
`atomic(db, fn)` helper in `src/db.ts` wraps writes in a named **SAVEPOINT**
(nestable so `activate()` can wrap `applyTransition()`), releasing on success and
`ROLLBACK TO` + `RELEASE` on any throw. Now:
- `applyTransition()` — transition INSERT + status UPDATE + ledger append are one
  unit.
- `activate()` — the transition (with its nested unit) + activation-timestamp
  UPDATE are one unit.
- `aggregate()` — the result INSERT + the whole component-snapshot loop are one
  unit.
- `applyConfigurationChange()` was already transactional (`BEGIN…COMMIT`); it
  uses its own top-level transaction and is unchanged.

**Proof (reproducible):** test `M1 atomicity: a failure mid-unit leaves no orphan
transition or ledger row (SAVEPOINT rollback)` reproduces the exact three-write
set inside `atomic()`, throws after all three writes, and asserts the TCA status,
the `AuthorizationTransition` count, and the `EvidenceLedger` count are all
**unchanged** — then confirms the DB is still usable by completing a real
`activate()`. `npm test` → **40/40 pass**.

---

## Item 9 — Handoff

`docs/handoffs/CURRENT_HANDOFF.md` is updated with the exact evidence references
above (commands, commit/branch, migration 004, the M1 fix + test, and this
document). Decision Register **D-014** and Implementation Ledger **L-005** record
this reconciliation.

---

## Item 10 — Scope guard (unchanged)

- **M11 not started.** No baseline-schema broad-M10 work
  (`M10_IMPLEMENTATION.md` entry conditions remain unmet). ODR-001..ODR-003
  remain open and unresolved.
- **No HIL / physical-safety claim.** M10G SIL and M10H HIL remain gated; no
  software test in this pack establishes hardware, movement, or production
  release safety.
- **No invented engineering values; no fake approvals/passes.** Seed remains 0
  approvals / 0 passes. The only additions are non-semantic indexes, a
  transaction wrapper, tests, and documentation.

**Verdict (unchanged):** the bounded Gate 05M-C3 rule engine is a verified,
deterministic, tamper-evident **records** foundation whose integrity is enforced
at the database layer, now with atomic multi-write service operations and a
fully index-driven read path. **Prototype-grade for governance/records, not
production-grade; software does not establish physical safety.** Next:
M10.1 hardening (PKI/H1, concurrency/H2, ledger coverage/H3, attested time/A9),
then — separately — M10G SIL / M10H HIL.
