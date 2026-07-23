# M10 Implementation Report — Gate 05M-C3 Deterministic Rule Engine Foundation

**Scope:** bounded M10 (Decision Register D-011) — the Gate 05M-C3 rule-engine
foundation. **Frozen source spec:** Gate 05M-C3 Revision 08
(`docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`, RC-313..425).
**Stack:** `node:sqlite` (built-in) + TypeScript + `node:test` (built-in). No AI
authority; `INITIAL_TARGET_PROFILE` has no authority; signed evidence append-only.

## Completion criteria — all PASS

| Command | Result |
|---|---|
| `npm run migrate` | PASS — 2 migrations, 30 tables |
| `npm run seed` | PASS — draft seed, 0 approvals / 0 passes / 0 released runout / 0 active cells |
| `npm run verify` | PASS — 13/13 rule checks |
| `npm test` | PASS — 25/25 (`node:test`) |
| `npm run build` | PASS — `tsc` clean |

## Sub-phase status

| Sub-phase | Status |
|---|---|
| M10A schema normalization | DONE — `migrations/001_core_schema.sql` (all directive_03 tables, FKs, junction tables, composite keys, enum CHECKs) |
| M10B state-machine + hard enforcement | DONE — `src/stateMachine.ts`, `src/authorization.ts`, machine-readable `src/blockReasons.ts` |
| M10C runout calculation engine | DONE — `src/runout.ts` (canonical L_min in code; select → exclude nested overlaps → validate → compute → compare → margin → freeze snapshot → hash → signed release) |
| M10D configuration-lock enforcement | DONE — `src/configLock.ts` (RC-425 cascade; historical evidence preserved) |
| M10E append-only evidence ledger | DONE — `migrations/002_append_only_triggers.sql` + `src/db.ts` hash-chain (RC-423) |
| M10F automated negative testing | DONE — `test/rules.test.ts` (every hard block has a negative test) |
| M10G SIL validation | PENDING — requires a SIL harness (next step) |
| M10H HIL readiness | PENDING — requires HIL rig + supplier data (NeedsSupplierData; BQ-27) |

## Rule → code → test map (every critical rule has schema and/or service enforcement, a machine-readable block reason, and an automated test)

| Rule (RC) | Schema enforcement | Service enforcement | Block reason | Test |
|---|---|---|---|---|
| Canonical L_min equation (RC-340) | — | `runout.ts:lMinFromTerms/LMIN_TERMS` | — | `rules.test.ts` #1 |
| Runout block conditions / insufficient track (RC-372/383) | — | `runout.ts:assertRunoutValid` | `INSUFFICIENT_TRACK_LENGTH`, `INSUFFICIENT_REMAINING_MARGIN` | #2,#3, verify |
| Missing runout component (RC-372) | — | `runout.ts:aggregate` | `MISSING_RUNOUT_COMPONENT` | #4 |
| Distance geometry (RC-373) | `DistanceComponent` CHECK (end≥start, overlap consistency) | `runout.ts:aggregate` | `DISTANCE_GEOMETRY_INVALID` | #5 |
| Overlap host / no double-count (RC-383/401) | self-FK `included_within_component_id` | `runout.ts:aggregate` | `OVERLAP_HOST_INVALID` | #6 |
| Component authority eligibility (RC-401/402) | `authority_status` CHECK enum | `units.ts:isComponentAuthorityEligible` | `REQUIRED_COMPONENT_INCOMPLETE` | #7 |
| Cross-record config + vehicle identity (RC-409/421) | FKs | `authorization.ts:assertConfigEquality` | `CONFIGURATION_PACKET_MISMATCH`, `VEHICLE_IDENTITY_MISMATCH` | #8, verify |
| Automatic expiry + expired activation (RC-388/424) | — | `stateMachine.ts:isExpired`, `authorization.ts:applyAutomaticExpiry` | `AUTHORIZATION_EXPIRED` | #9,#25 |
| Unsigned procedure (RC-355/389) | `ProcedureApproval.status` CHECK | `authorization.ts:activate` | `PROCEDURE_APPROVAL_MISSING` | #10 |
| State-transition table + no ACTIVE→COMPLETED (RC-408/413) | — | `stateMachine.ts:assertTransition` | `ILLEGAL_STATE_TRANSITION`, `EXECUTION_COMPLETION_CANNOT_MUTATE_AUTHORIZATION` | #11 |
| Single active cell (RC-386) | — | `authorization.ts:assertSingleActive` | `MULTIPLE_ACTIVE_TEST_CELLS` | #12 |
| Prior SIGNED_PASS required (RC-386) | — | `authorization.ts:activate` | `PREVIOUS_CELL_SIGNED_PASS_REQUIRED` | #13 |
| Instrumentation health (RC-391/403) | `InstrumentationRecord` CHECKs | `instrumentation.ts:assertInstrumentationHealthy` | `INSTRUMENTATION_HEALTH_INVALID` | #14 |
| Append-only signed evidence (RC-374/410/422) | triggers (`002_*.sql`) | `db.ts` hash-chain (RC-423) | `APPEND_ONLY_VIOLATION` (trigger) / `SIGNED_EVIDENCE_IS_APPEND_ONLY` | #15,#16, verify |
| Fault domain (RC-380/347) | `execution_domain` CHECK | `faults.ts:assertFaultExecutionAuthorized` | `FAULT_EXECUTED_OUTSIDE_AUTHORIZED_DOMAIN` | #17 |
| Paired fault HazardAnalysis + component registry (RC-363/405) | `hazard_analysis_id` NOT NULL FK; component FK→`VehicleComponentInstance` | `faults.ts:createPairedFaultAuthorization` | `PAIRED_FAULT_HAZARD_ANALYSIS_MISSING`, `PAIRED_FAULT_COMPONENT_REGISTRY_INVALID` | #18 |
| Configuration-change transaction (RC-425) | — | `configLock.ts:applyConfigurationChange` | (cascade → `RUNOUT_NOT_RELEASED` on re-check) | #19 |
| COMPLETED does not clear a gate (RC-371) | — | `results.ts:assertGateCleared` | `RESULT_NOT_SIGNED_PASS` | #20 |
| INITIAL_TARGET_PROFILE has no movement authority (RC-267/412) | — | `authorization.ts:assertAuthorityClassEligible` | `INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY` | verify + #3(NEG) |
| Junction composite keys (RC-400/417) | composite PRIMARY KEYs | — | (`UNIQUE`, DB) | #21 |
| Foreign-key enforcement (RC-396) | `PRAGMA foreign_keys=ON` + FKs | `db.ts:openDatabase` | (`FOREIGN KEY`, DB) | #22 |
| Unit enum + canonical SI (RC-385) | `TypedNumericField.unit` CHECK | `units.ts:toCanonical` | — | positive chain (#2 POS) |
| Movement gate = ACTIVE only (RC-383) | — | `authorization.ts:assertMovementAllowed` | `ILLEGAL_STATE_TRANSITION` (status≠ACTIVE) | #19 |

## Doctrine honored (Constitution)

- **Article I / RC-374/410/422** — signed evidence is INSERT-only (triggers); corrections append (`TestResultAnnotation`).
- **Article III** — no AI authority; no simulation result sets physical status; the engine is pure deterministic rules.
- **Article IV / RC-408/413** — the transition table is the single source of truth; illegal transitions rejected.
- **Article V / RC-425** — configuration lock: a config change suspends/revokes dependents and blocks movement; history preserved.
- **Article VI** — versioned migrations (`schema_migrations`).
- **Article VII / RC-267/412** — `INITIAL_TARGET_PROFILE` has no movement/pass/fail/release authority; unknown data creates obligations, not authority.

## Explicitly NOT in this bounded scope (still gated)

- ODR-001..ODR-003 resolution; the broad Revision 07 baseline-schema M10
  (`docs/roadmaps/M10_IMPLEMENTATION.md`); M11; any real approval / `SIGNED_PASS`
  / engineering value (seed has none); any UI. M10G (SIL) and M10H (HIL) are the
  next steps and need a SIL/HIL environment + supplier data (NeedsSupplierData).

---

# Audit response — owner review_73 (24-point M10 audit)

The owner's 24-point audit was written against a **separate coding-agent M10 draft**
that over-claimed "M10 Complete / SPECIFICATION FREEZE / HIL READY". This section
audits **this repo's `engine/` implementation** against the same 24 points and
records the outcome. **This implementation never claimed complete/frozen/HIL-ready**
(L-002 said "M10A–M10F verified; M10G/H pending"). Honest status:

**`M10 IMPLEMENTATION FOUNDATION VERIFIED (bounded)` — NOT `M10 COMPLETE`, NOT
`DATABASE FROZEN`, NOT `HIL READY`.** Full M10 freeze remains pending M10G SIL +
M10H HIL and owner sign-off.

## Point-by-point

| # | Audit point | Status in `engine/` |
|---|---|---|
| 1 | Prove it runs (real migrate/seed/verify/test/build) | RESOLVED — see the table above; re-runnable command in L-002/L-003 |
| 2 | Don't overclaim HIL readiness | ALREADY_SATISFIED — L-002 never claimed it; docs use the cautious framing |
| 3 | TypedNumericField (value/unit/authority/source/uncertainty/revision) + torque-rate/jerk/steering-band/regen/thermal/surface | ALREADY_SATISFIED — `TypedNumericField` + `AllowedSteeringBand` tables; TCA has all fields (RC-369/384/385/418) |
| 4 | VehicleComponentInstance config linkage | ALREADY_SATISFIED — config/vehicle/platform/install/fw/part/status (RC-420) |
| 5 | VehicleBuild 1:N (not one-per-VIN) | **RESOLVED (this round)** — `IndividualVehicle 1:N VehicleBuild`; migration reordered |
| 6 | TestExecution ConfigurationPacket linkage | ALREADY_SATISFIED — `TestExecution.configuration_packet_id` + attempt/operator/timestamps (RC-415) |
| 7 | `previous_cell_signed_result_id` FK | **RESOLVED (this round)** — forward FK → `TestResult`; test added |
| 8 | proof_artifact_id + ARTIFACT_DEFINED requires it | **RESOLVED (this round)** — column present; SQL CHECK added; test added |
| 9 | Geometry enforced in SQL | **RESOLVED (this round)** — `value ≈ end−start` CHECK added (was service-only); test updated |
| 10 | Required L_min term categories | **RESOLVED (this round)** — `distance_component_type` enum + `requiredTypes` verification; test added |
| 11 | Overlap-failure detection (double-count, circular nesting, cross-runout host) | **RESOLVED (this round)** — spatial-overlap + circular-nesting detection added; test added (host/cross-runout already covered) |
| 12 | Calculation hash generated | ALREADY_SATISFIED — `runout.ts:aggregate` SHA-256 over canonical inputs |
| 13 | Signed-release process | ALREADY_SATISFIED — `runout.ts:signRelease` gated on `assertRunoutValid` |
| 14 | Activation prerequisites (not just routing) | ALREADY_SATISFIED — `authorization.ts:activate` enforces all 10 |
| 15 | Multiple active-cell prevention (DB-level) | **RESOLVED (this round)** — partial UNIQUE index added (service check already present); test added |
| 16 | ProcedureApproval linked to test cell | ALREADY_SATISFIED — `TCA.procedure_approval_id` FK |
| 17 | Append-only telemetry/artifacts/signoff/transition/snapshot | ALREADY_SATISFIED + **EXTENDED** — triggers on SignoffRecord/AuthorizationTransition/DocumentArchive/TelemetryLog/TestResultAnnotation/signed TestResult; **RunoutAggregationComponent snapshot added this round** |
| 18 | Cryptographic hash chain | ALREADY_SATISFIED — `db.ts:recordHash` (canonical + prev-hash + artifact hashes + timestamp + signer) |
| 19 | TelemetryLog payload validation | DEFERRED_WITH_BLOCK — telemetry-ingestion (schema_version/clock/sampling/checksum) belongs to M10G/telemetry scope; `TelemetryLog` is a hash-anchored INSERT-only stub here |
| 20 | PairedFaultAuthorization completeness + fault FKs | ALREADY_SATISFIED + **EXTENDED** — lifecycle fields present (RC-381); `fault_1_id/fault_2_id` FK → FaultDefinition **added this round** |
| 21 | Highest execution domain present | ALREADY_SATISFIED — `HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS` in the enum |
| 22 | Comprehensive negative tests | ALREADY_SATISFIED + **EXTENDED** — all 16 required negatives + positives; now 31 tests |
| 23 | SQLite integration tests | ALREADY_SATISFIED — tests run against real `node:sqlite` (FKs, triggers, CHECKs, composite keys, partial index all exercised) |
| 24 | Seed has no fake approvals/passes | ALREADY_SATISFIED — `seed.ts` asserts 0 approvals / 0 passes / 0 released / 0 active |

## Revision-07-to-code classification (taxonomy per review_73)

- **IMPLEMENTED_AND_TESTED:** RC-340/369/372/373/383/385/386/387/388/399/401/402/
  403/408/409/412/413/417/421/424/425, RC-355/389 (procedure approval), RC-374/410/422/423
  (append-only + hash-chain), RC-380/391/396, review_73 pts 5/7/8/9/10/11/15/17/20.
- **IMPLEMENTED_NOT_TESTED (schema present, no dedicated test):** several
  PairedFaultAuthorization lifecycle fields; TestResultAnnotation supersession flow.
- **PARTIALLY_IMPLEMENTED:** RC-384 steering-band (min≤max tested; full band-vs-envelope
  derating is downstream); RC-405 component-registry check (service guard tested; not
  every insertion path routed through it).
- **DOCUMENT_ONLY:** the doctrine narrative in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  beyond what the engine enforces.
- **DEFERRED_WITH_BLOCK:** M10G SIL, M10H HIL (need environment + supplier data);
  TelemetryLog payload validation (pt 19); the broad rev07-baseline M10.
- **MISSING:** none within the bounded Gate 05M-C3 rule-engine scope known at audit time.

## Honest completion statement

The bounded Gate 05M-C3 rule engine (M10A–M10F) is **implemented and verified** —
all five completion-criteria scripts pass and every hard block has a machine-readable
reason + an automated negative test. This is **not** a full M10 freeze: M10G/M10H
and the deferred items above remain open, and **no software test proves hardware
safety**. Successful software verification may permit engineering review for M11
data population and later HIL-readiness planning — it does not authorize HIL
connection, live-HV testing, vehicle movement, physical fault injection, or
test-cell operation.
