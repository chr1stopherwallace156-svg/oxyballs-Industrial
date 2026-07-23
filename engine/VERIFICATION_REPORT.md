# M10 Engineering Verification & Stress Test — Report

**Commissioned by:** owner directive_04 (adversarial verification; "break the Build
Engine"). **Target:** the bounded Gate 05M-C3 Deterministic Rule Engine
(`engine/`, frozen source spec Gate 05M-C3 Revision 08, RC-313..425).
**Stance:** adversarial. **Evidence rule:** every finding is reproduced by a
runnable harness, not asserted.

**Reproduce everything (repo root):**
```
cd engine && npm ci
npm run migrate && npm run seed && npm run verify && npm test && npm run build
npm run verify:attack        # adversarial probe matrix
npm run verify:determinism   # identical input -> identical output
npm run verify:perf          # scaled timing + db size
```

---

## Executive Summary

The engine's **data-integrity and rule-determinism are strong** and are now
enforced **at the database layer**, not just in the service layer. Adversarial
probing found **6 real weaknesses** (2 Critical, 2 High, 2 Medium); **5 were
closed this round** by DB-level hardening (migration `003_hardening.sql`) and **1
residual finding (A9, clock trust) is accepted-risk / M10.1** because it cannot be
fixed inside a single trusted process. After hardening, **11 of 12 attack probes
are BLOCKED**, **39/39 tests pass**, and the rule engine is **provably
deterministic**.

**This is NOT production-ready and NOT proven safe for hardware.** It is a verified
records/governance foundation. No software test establishes physical HV safety.

| Score | /100 | One-line rationale |
|---|---|---|
| Architecture | 82 | Clean, normalized, deterministic; bounded scope; service+DB double enforcement |
| Safety (data-integrity) | 80 | Strong evidence immutability + state enforcement; **physical safety NOT established by software** |
| Database design | 85 | FKs, CHECKs, triggers, append-only, indexed; missing partition/archival + concurrency config |
| Enterprise readiness | 46 | No PKI/auth, no telemetry ingestion, no backup/restore tooling, single-file, bounded scope |
| Prototype readiness | 74 | Suitable as a records/rule prototype behind a trusted service |
| Production readiness | 34 | Gaps: identity/PKI, concurrency story, DR, telemetry, SIL/HIL |

---

## Phase 1 — Architecture Audit

| Area | Severity | Finding | Consequence | Correction | Status |
|---|---|---|---|---|---|
| State machine (DB) | **CRITICAL** | Pre-hardening, the transition graph + activation preconditions were enforced only in the service layer; a direct SQL `UPDATE status` bypassed them (probe A1/A2). | Any code path or actor with DB write could force `ACTIVE`, skipping runout release / procedure approval / single-active. | DB triggers: `trg_tca_status_transition` (graph, data-driven from `AllowedAuthTransition`), `trg_tca_activation_preconditions` (runout SIGNED_RELEASE + procedure APPROVED + readiness), `trg_tca_initial_status_insert` (no ready-made ACTIVE inserts). | **FIXED** |
| Concurrency / single-active | **HIGH** | The partial unique index excluded NULL sessions; the service check was racy for them (probe A6). | Two ACTIVE cells for one vehicle → conflicting live limits. | `trg_tca_single_active_update/insert` (NULL-safe). | **FIXED** |
| Cryptographic chain | **HIGH** | `recordHash()` existed but nothing chained evidence; no verify routine (probe A12). | Evidence deletion/reordering undetectable. | `EvidenceLedger` (append-only) + `appendLedger()` + `verifyLedgerChain()`, wired into every authorization transition. | **FIXED (transitions)** |
| Append-only evidence | MEDIUM | A `REVOKED_PENDING_RECALCULATION` runout could be flipped back to `SIGNED_RELEASE` (probe A4). | Revoked authority resurrected after a config change. | `trg_rar_no_resurrect` + `trg_rar_no_delete`. | **FIXED** |
| Vehicle identity | MEDIUM | `vin` was non-unique; two IndividualVehicle rows could share a VIN (probe A8). | Ambiguous vehicle identity; cross-record equality could pass wrongly. | `ux_individual_vehicle_vin` (unique where not null). | **FIXED** |
| Time / clock trust | MEDIUM | Expiry uses a caller-supplied `now`; a rolled-back clock resurrects an expired authorization (probe A9). | An in-process caller can defeat expiry. | **Residual** — needs an attested/monotonic time source; the injectable `now` is a test seam. Accept-risk + M10.1. | **OPEN** |
| Normalization / FK integrity | INFO | 3NF; all critical refs FK-constrained; junction tables with composite PKs; orphan inserts rejected (A7). | — | — | OK |
| Rule engine determinism | INFO | Pure functions; no RNG in decisions; `now` injected; identical input → identical output (Phase 4). | — | — | OK |
| Transaction safety | MEDIUM | Pre-fix, `aggregate()` / `activate()` / `applyTransition()` issued multiple writes **without** an explicit outer transaction (`applyConfigurationChange` was already transactional). | A mid-sequence failure could leave partial state (orphan transition, ledger entry for a status that never landed, result with a partial snapshot). | **FIXED** — nestable `atomic()` SAVEPOINT wrapper (`src/db.ts`) around `applyTransition`/`activate`/`aggregate` writes. Proof: test `M1 atomicity …` (rollback leaves no orphan row). See `EVIDENCE_PACK.md` Item 8. | **FIXED** |
| Signatures | HIGH (design) | `signature_hash` / signoff are opaque strings; no real cryptographic signature verification (no PKI). | Approvals are trust-by-string. | M10.1: real signing (per-approver keys) + verification. | OPEN |
| Concurrency model | MEDIUM | `node:sqlite` `DatabaseSync` is single-connection synchronous; multi-process concurrency (WAL, busy-timeout, ret/serialize) is not configured or tested. | Multi-writer deployments unproven. | M10.1: WAL + busy_timeout + documented single-writer or serialized-writer model. | OPEN |
| Telemetry scale | MEDIUM | `TelemetryLog` is a hash-anchored stub; no payload schema/validation, no partition/archival. | Millions of rows unmanaged. | M10.1: telemetry ingestion + partition/archival (Phase 6). | DEFERRED_WITH_BLOCK |

---

## Phase 2 & 3 — Safety Attack Simulation + Database Destruction (`npm run verify:attack`)

**11 / 12 probes BLOCKED after hardening; 1 residual finding (A9).**

| ID | Sev | Result | Attack |
|---|---|---|---|
| A1 | CRITICAL | **BLOCKED** | direct `AUTHORIZED→ACTIVE` skipping activation preconditions |
| A2 | CRITICAL | **BLOCKED** | authorization resurrection `SUPERSEDED→ACTIVE` via direct SQL |
| A3 | HIGH | **BLOCKED** | mutate signed `SignoffRecord` |
| A4 | MEDIUM | **BLOCKED** | revoked-runout resurrection `REVOKED_PENDING_RECALCULATION→SIGNED_RELEASE` |
| A5 | HIGH | **BLOCKED** | direct insert of a ready-made ACTIVE cell |
| A6 | HIGH | **BLOCKED** | multiple ACTIVE cells via direct insert (NULL session) |
| A7 | HIGH | **BLOCKED** | orphan FK insert |
| A8 | MEDIUM | **BLOCKED** | VIN reuse across two vehicles |
| A9 | MEDIUM | **BYPASS (finding)** | clock-rollback resurrects an expired authorization |
| A10 | LOW | **BLOCKED** | negative / zero-length geometry |
| A11 | HIGH | **BLOCKED** | delete immutable `AuthorizationTransition` |
| A12 | HIGH | **BLOCKED** | forged/reordered evidence-ledger row detected by the hash chain |

Also verified blocked (test suite): duplicate junction membership (composite PK),
double-count overlap, circular nesting, cross-runout host, mutation/deletion of the
frozen runout snapshot, config-packet + vehicle-identity mismatch, unsigned
procedure, expired-at-activation, INITIAL_TARGET_PROFILE-as-authority.

---

## Phase 4 — Rule Engine Verification (`npm run verify:determinism`) — ALL PASS

- **L_min value stable across 2000 identical runs** (value = 30), independent of
  non-deterministic record IDs.
- **calculation_hash is a pure, key-order-free function** of its inputs (canonical
  serialization). It intentionally embeds record IDs, so two *different* records
  hash differently — correct, not non-determinism.
- **State-machine routing identical** across every state pair × 3 rounds.
- **Identical invalid input → a single block reason** (`INSUFFICIENT_TRACK_LENGTH`).

No randomness, hidden state, AI memory, or conversation-context dependence exists
in the rule paths (verified by construction: rule functions are pure; `now` is an
explicit parameter; ids are the only non-determinism and they do not affect
decisions).

---

## Phase 5 — Edge Cases

| Edge case | Status |
|---|---|
| negative / zero-length geometry | Blocked (CHECK `zone_end >= zone_start`; value ≈ span) |
| incorrect units | Controlled `unit` enum + canonical-SI comparison |
| float precision / rounding | Fixed epsilon (1e-6 geometry, 1e-9 overlap); **residual LOW** — recommend integer-millimetre storage (M10.1) |
| VIN reuse / vehicle rebuilt / battery replaced / firmware rollback | VIN unique; `IndividualVehicle 1:N VehicleBuild 1:N ConfigurationPacket` supports re-config; a firmware-hash change triggers the config-lock cascade |
| component supersession | `supersession_id` self-FK present (supersession flow: IMPLEMENTED_NOT_TESTED) |
| clock skew / DST / expired signatures | ISO-8601 UTC throughout; **clock-trust residual A9** |
| partial telemetry / sensor disagreement / missing evidence | Instrumentation health → `INVALID_TEST` + movement blocked (RC-403) |
| two technicians editing simultaneously / SQLite locking / disk full | **Concurrency + durability unproven** — single synchronous connection; no WAL/busy-timeout; disk-full/power-loss not tested → M10.1 |
| hash-collision assumptions | SHA-256; collision resistance assumed (standard) |
| thousands of annotations / millions of telemetry rows | Annotations fine; telemetry scale unmanaged (DEFERRED_WITH_BLOCK) |

---

## Phase 6 — Performance (`npm run verify:perf`, node:sqlite single file)

**Update (final reconciliation):** the perf harness now reports **median + p95**
(1,000 per-query samples) and captures **`EXPLAIN QUERY PLAN`**. Doing so exposed
a proven defect — the benchmarked join planned `SCAN rc` (full scan of
`RunoutCalculations`), so per-query time was **O(n)** (100k → ~16.5 ms), not the
O(log n) previously claimed. Root cause: two FK columns on the join path were
unindexed. **Migration `004_join_indexes.sql`** (`idx_config_packet_vehicle`,
`idx_runout_calc_config`) makes the plan fully index-driven; per-query time is now
~constant. Full methodology + before/after plans in `EVIDENCE_PACK.md` Item 5.

Post-004 (mean / median / p95 per query):

| vehicles | rows | insert (ms) | join mean (ms) | join p95 (ms) | db size |
|---:|---:|---:|---:|---:|---:|
| 10 | 40 | 5 | 0.0060 | 0.0093 | 0.33 MB |
| 100 | 400 | 5 | 0.0060 | 0.0069 | 0.34 MB |
| 1,000 | 4,000 | 16 | 0.0061 | 0.0105 | 0.64 MB |
| 10,000 | 40,000 | 107 | 0.0098 | 0.0185 | 3.48 MB |
| 100,000 | 400,000 | 1,028 | 0.0134 | 0.0201 | 34.32 MB |

Indexed FK joins now scale ~O(log n) (verified by the query plan); bulk insert is
transaction-bound. **Bottlenecks at scale:** telemetry rows (unbounded), and the
single-file/single-writer model.
**Recommended:** WAL mode; per-vehicle/per-session archival of closed telemetry;
scheduled `VACUUM`; file-copy backup + `.backup`/restore test in CI; a partition
(or separate DB per platform/fleet) strategy for >100k vehicles.

---

## Phase 7 — Future-Proofing

**Supports without redesign:** multiple platforms/classes (add `platform_id` /
`platform_configuration_id` rows + a Platform table; the identity chain already
carries platform), different inverters/motors/batteries (VehicleComponentInstance
registry + FaultDefinition are config-bound), service history (append TestResult
lineage), predictive maintenance (read-only over evidence).

**Needs new modules (not redesign):** supplier APIs / inventory / customer portal /
AI diagnostics / digital twin / 3D-CAD / AR — these sit **above** the rule engine
and consume it; they must never be granted write authority that bypasses the DB
triggers. OTA/firmware updates map cleanly onto the config-lock cascade.

**Requires redesign IF:** (a) multi-writer, multi-node concurrency at fleet scale
(needs a server DB — Postgres — with the same constraints/triggers ported); (b)
real cryptographic signing (PKI) replacing opaque signature strings; (c) telemetry
at millions of rows/day (needs a time-series store, not `TelemetryLog`).

---

## Phase 8 — Scores (rationale)

- **Architecture 82** — clean 3NF, deterministic, now double-enforced (service +
  DB). Bounded to Gate 05M-C3; not a full platform.
- **Safety 80 (data-integrity only)** — evidence immutability + state machine +
  config-lock are strong and DB-enforced. **Physical/functional safety is 0 from
  software alone; SIL/HIL pending.**
- **Data integrity 86** — FKs, CHECKs, append-only, hash chain, cross-record
  equality. Minus concurrency/durability proof.
- **Database design 85** — normalized + indexed + triggered. Minus partition/
  archival + WAL config.
- **Rule engine 88** — pure, deterministic, machine-readable blocks, full negative
  coverage.
- **Maintainability 80** — small, typed, documented; migrations versioned. Minus a
  migration-down/rollback story.
- **Scalability 62** — fine to ~100k vehicles for records; telemetry + single-writer
  cap it.
- **Testing 84** — 39 tests + attack + determinism + perf harnesses, all runnable.
  Minus concurrency/durability tests.
- **Fault tolerance 55** — transactional config-lock; but no crash/power-loss/
  disk-full testing; partial-commit windows in `aggregate()`/`activate()`.
- **Documentation 88** — spec, report, traceability matrix, ledger, decisions.
- **Cyber resilience 50** — tamper-evident chain + append-only; but no auth, no
  PKI, opaque signatures, no encryption-at-rest.
- **Future expansion 78** — extends without redesign except the three items above.
- **Commercial readiness 40** / **Prototype readiness 74** / **Production
  readiness 34**.

---

## Critical Issues

- **C1 — State machine was service-only (A1/A2).** **FIXED** (DB triggers). Verify:
  `npm run verify:attack` (A1/A2 BLOCKED) + tests `HARDENING A1/A2`.

## High-Priority Improvements

- **H1 — Real signatures / PKI.** Replace opaque `signature_hash` strings with
  verifiable per-approver signatures. (OPEN → M10.1)
- **H2 — Concurrency model.** WAL + `busy_timeout` + documented single-writer (or
  serialized) policy + concurrency tests. (OPEN → M10.1)
- **H3 — Extend the evidence ledger** to results, artifacts, and signoffs (only
  authorization transitions are chained today). (PARTIAL → M10.1)

## Medium Improvements

- **M1 — Wrap `aggregate()`/`activate()` in explicit transactions** (partial-commit
  safety). **DONE** (SAVEPOINT `atomic()`; test `M1 atomicity …`; `EVIDENCE_PACK.md` Item 8).
- **M2 — Clock trust (A9):** attested/monotonic time source; treat wall-clock as
  untrusted for expiry.
- **M3 — Telemetry ingestion + partition/archival** (Phase 6).
- **M4 — Backup/restore + `VACUUM` + crash/power-loss/disk-full tests.**

## Minor Improvements

- **m1 — Integer-millimetre geometry** to remove float epsilons.
- **m2 — Test the supersession flows** (TestResult/FaultExecutionAuthorization).
- **m3 — Migration-down / rollback story** for schema evolution.

---

## Technical Debt Report

| Debt | Severity | Interest (cost of delay) |
|---|---|---|
| No PKI; approvals trust-by-string | HIGH | Grows once real approvers/auditors exist |
| Single-writer / no WAL config | HIGH | Blocks multi-user/fleet deployment |
| Ledger chains only transitions | MEDIUM | Partial tamper-evidence |
| No DR (backup/restore) tooling | MEDIUM | Data-loss exposure |
| Telemetry unmanaged | MEDIUM | Scale wall at high row counts |
| Float geometry epsilons | LOW | Rare edge mis-sums |

---

## Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner-decision |
|---|---|---|---|---|---|
| R1 | In-process caller defeats expiry via clock (A9) | Low | Medium | Attested time (M10.1); meanwhile trust boundary = the process | Accept / schedule |
| R2 | Multi-writer corruption (no WAL) | Med (if deployed multi-user) | High | WAL + single-writer policy (H2) | Before any multi-user use |
| R3 | Opaque signatures forged upstream | Med | High | PKI (H1) | Before real approvals |
| R4 | Telemetry growth degrades DB | Med at scale | Medium | Partition/archival (M3) | Before fleet telemetry |
| R5 | Power-loss partial commit | Low | Medium | Transactions (M1) **DONE** (SAVEPOINT `atomic()`); crash/power-loss/disk-full tests (M4) still pending | Before production |
| R6 | Overclaiming readiness | — | High | This report + honest status labels | Standing |

---

## Recommended M10.1 improvements (prioritized)

1. **PKI signatures** (H1) + extend the evidence ledger to all signed records (H3).
2. **Concurrency hardening**: WAL, `busy_timeout`, single-writer policy, tests (H2).
3. **Transaction-wrap** `aggregate()`/`activate()` (M1) + crash/power-loss/disk-full
   + backup/restore tests (M4).
4. **Attested time** for expiry (M2 / R1).
5. **Telemetry ingestion + partition/archival** (M3).
6. **Integer-millimetre geometry** (m1); **supersession-flow tests** (m2);
   **migration-down** (m3).

## Verdict

The bounded Gate 05M-C3 rule engine is a **verified, deterministic, tamper-evident
records foundation** whose integrity guarantees are now enforced at the database
layer. It is **prototype-grade for governance/records**, **not production-grade**,
and **does not establish physical safety**. Proceed to M10.1 hardening (above) and,
separately, M10G SIL / M10H HIL before any statement about hardware, movement, or
production release.
