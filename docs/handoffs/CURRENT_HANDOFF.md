# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-22
- Reason for handoff: **PLATFORM 001 BUILD PACKAGE v0.1 — VERTICAL SLICE BUILT
  (owner directive; D-015, L-006).** The first visible end-to-end Build Engine
  workflow now exists as a NEW layer above M10 (`engine/src/platform/`,
  `migrations/005_platform_package.sql` — 7 tables, `scripts/platform001.ts`,
  `test/platform.test.ts`, `verify/packageAttack.ts`). `npm run platform001:generate`
  loads the locked 2019 Ford F-450 SD Chassis Cab config and produces a controlled
  DRAFT_INCOMPLETE build package → `engine/output/platform-001/build-package.{md,json}`
  (`BP_PLATFORM-001_d64d1b6a434a`): vehicle identity MATCHED, revision LOCKED, 20 BOM
  categories (19 UNSELECTED / 1 BLOCKED), 6 compatibility evaluations (4 PASS / 1 FAIL
  / 1 BLOCKED_MISSING_DATA), 7 open ODRs, 24 deterministic release blockers. Status is
  CHECK-locked to DRAFT_INCOMPLETE (no approval status possible); every unknown → a
  tracked ODR + block reason; a missing value is NULL, never zero; all ids/hashes
  deterministic (regeneration self-check PASS). **54/54 tests** (40 M10 + 14 slice);
  package attack **9/9 BLOCKED**; **M10 attack/determinism unchanged** (12 probes / A9
  residual; ALL DETERMINISTIC). Two proven defects fixed with regression tests
  (un-approvable package status; package-scoped child ids). **No engineering value
  invented; no supplier data entered; ODR-001..003 untouched; M11 not started.**
  Governance: `docs/status/PLATFORM_001_STATUS.md`, D-015, L-006, ODR-004..010.
  **Next research target: baseline axle weights + GVWR for the donor (ODR-004..006),
  tied to BQ-27 donor confirmation.** Honest status: DRAFT_INCOMPLETE — not an
  approval, not prototype/procurement readiness, not a safety claim.
  **Follow-up (same milestone):** release blockers are now CATEGORIZED by effort
  bucket (RESEARCH 3 · CONFIGURATION 0 · COMPONENTS 19 · VERIFICATION 2) in the
  report + artifact + summary (55/55 tests). The owner's forward roadmap (Platform
  Calculator Library, functional digital twin, Build Package v0.2, guided prototype
  workflow) is recorded in `PLATFORM_001_STATUS.md` but NOT built.

- (prior) — **M10 FINAL EVIDENCE-PACK RECONCILIATION (owner final
  directive; D-014, L-005).** Produced `engine/EVIDENCE_PACK.md` answering all 10
  owner items with reproducible evidence: (1) finding count reconciled = **6 groups
  / 7 probes** (state-machine group = A1+A2); (2) full A1–A12 matrix; (3–4) exact
  commit/branch/status + verbatim `migrate/verify:attack/verify:determinism/
  verify:perf/test/build` outputs; (5) benchmark methodology (median/p95 +
  `EXPLAIN QUERY PLAN`) — which **exposed a proven O(n) join defect** (`SCAN rc`),
  fixed by `migrations/004_join_indexes.sql` (two non-semantic FK indexes; 100k
  per-query ~16.5 ms → ~0.013 ms); (6) EvidenceLedger threat model (detects
  delete/reorder/mutate within a trusted writer; does NOT prove authorship;
  PKI + external anchoring deferred); (7) VIN finding = `IndividualVehicle.vin TEXT`
  (001) + partial-unique fix (003); (8) **verified + fixed the M1 atomicity defect**
  — `applyTransition`/`activate`/`aggregate` now wrap their writes in a nestable
  SAVEPOINT `atomic()` (`src/db.ts`) so transition + status + ledger (and the runout
  snapshot) commit/roll back as one unit, proven by a new rollback test. **Now
  40/40 tests** (was 39). `VERIFICATION_REPORT.md` M1/R5/Phase-6 updated. **M11 not
  started; no HIL/physical-safety claim; ODR-001..003 open; seed 0 approvals/0
  passes.** Honest status unchanged: prototype-grade, deterministic, tamper-evident
  records foundation — NOT production-grade. Next: the M10.1 backlog + separately
  M10G SIL / M10H HIL.

- (prior) — **M10 ADVERSARIALLY VERIFIED + M10.1-HARDENED (directive_04,
  D-013, L-004).** Built an attack/perf/determinism harness (`engine/verify/`),
  found 6 real weaknesses (2 Critical/2 High/2 Medium), **fixed 5** via DB-level
  hardening (`migrations/003_hardening.sql`: state-machine + activation-precondition
  + single-active triggers, revoked-runout + evidence-ledger immutability, VIN
  uniqueness, verifiable hash chain), and left **1 residual** (clock trust,
  accepted-risk). Post-hardening: 11/12 attack probes BLOCKED, 39/39 tests,
  determinism ALL PASS, perf to 100k vehicles. Full report
  `engine/VERIFICATION_REPORT.md` (findings + /100 scores + risk register + M10.1
  backlog). Honest verdict: **prototype-grade records foundation, NOT
  production-grade; software does not establish physical safety.** Next: the M10.1
  backlog (PKI, concurrency/WAL, transaction-wrap, attested time, telemetry) and
  separately M10G SIL / M10H HIL. **M11 not started.**

- (prior) — **M10 (bounded) BUILT, VERIFIED, and AUDIT-HARDENED.** After
  the "75:75" phase transition (D-010) the owner opened the bounded M10 gate
  (D-011) and directed the build; the Gate 05M-C3 rule engine (M10A–M10F) is under
  `engine/` (L-002). The owner then relayed a coding-agent M10 draft (which
  over-claimed "complete/frozen/HIL-ready") + a 24-point audit (review_73); the
  Build Engine self-audited the actual `engine/` against all 24 points, resolved
  the genuine gaps (pts 5/7/8/9/10/11/15/17/20, each tested), produced a
  traceability matrix, and adopted the honest status **`FOUNDATION VERIFIED` — NOT
  `COMPLETE/FROZEN/HIL-READY`** (D-012, L-003). All five completion-criteria scripts
  PASS (**31 tests**). M10G SIL + M10H HIL remain pending (need a SIL/HIL
  environment + supplier data); **M11 not started.**

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `b958cb7` — Archive owner directive_03 ("75:75") 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1` (M10 build: `594936c`; gate-open: `bbab237`; adversarial
  verification: `c97b3ac`; evidence-pack reconciliation: `d44b6bd`; the Platform 001
  slice is the newest commit)
- Working tree at handoff: clean (everything committed). `engine/dist`,
  `engine/node_modules`, `engine/data` are gitignored build/runtime artifacts;
  `engine/output/platform-001/` (the generated build package) IS committed as the
  demonstration deliverable.
- Migrations now number **5** (`005_platform_package.sql` added this round); **40
  tables** (33 M10 + 7 Platform 001).

## Work performed

- **Owner directive_03 ("75:75") — M10 phase-transition directive.** The terminal
  "75:75" delivery is NOT a Gate 05M-C3 schema draft or a review verdict — it is an
  owner directive declaring the Rev 07 ingestion sequence complete ("The next phase
  is implementation, not more Gate 05M-C3 writing") and directing **M10 —
  Deterministic Rule Engine Foundation** (M10A schema normalization → M10H HIL
  readiness), with a full table list, hard-block rules + machine-readable block
  reasons, the canonical `L_min` equation "in code", a coding-agent prompt, required
  negative tests, and `npm run migrate/seed/verify/test/build` completion criteria.
  - Archived 1:1 (commit `b958cb7`):
    `owner_directives/directive_03_m10_rule_engine_phase.md` + a cross-reference
    PROVENANCE row for the "75:75" slot.
  - **Governance reconciliation (NO production code):** new Decision Register
    **D-010** (ingestion complete 75/75; Gate 05M-C3 Revision 08 = frozen source
    spec; M10 directed but the gate not yet opened); new plan-of-record roadmap
    `docs/roadmaps/M10_RULE_ENGINE_FOUNDATION.md` (captures the owner's M10A–M10H
    plan, doctrine, completion criteria, tied to RC-313..425); RESEARCH_MAP (ingestion
    complete; next = M10 gate), CHANGELOG, handoff updated.
- **Governance boundary held.** M10 is production code, forbidden during the Rev 07
  ingestion phase (CLAUDE.md / Constitution / AGENTS.md). Opening M10 is a formal
  gate requiring: the active-roadmap pointer to move from `REV07_SOURCE_INGESTION.md`
  to `M10_RULE_ENGINE_FOUNDATION.md`; a **proposed** (never silent) update to
  `AI_INSTRUCTIONS.md` + the `CLAUDE.md` "no M10 / no production code" rule; and
  explicit owner confirmation of who executes the build (the directive routes the
  prompt to "your coding agent"). No SQL / TypeScript / tests / migrations were
  written. No `CLAUDE.md` / `AI_INSTRUCTIONS.md` edits were made (proposal pending).
- **Nothing ingested; nothing Confirmed; no normal driving; no public road; no
  customer operation; no "certified safe"/compliance claim; ODRs untouched; no
  production code / no M10.**

## Verification

- Tests run: none — no test suite exists in this repository (and none was created;
  M10 test scaffolding is deferred pending the phase gate)
- Test results: n/a
- Verified vs claimed: directive_03 archived 1:1 against the owner's "75:75"
  message; the phase transition is recorded in D-010 + the M10 plan-of-record
  roadmap without writing any production code; the frozen source spec is Gate
  05M-C3 Revision 08 (RC-313..425); the no-M10/no-production-code guardrail is
  explicitly held and the gate-opening requirements are documented; nothing marked
  Confirmed

## State

- Current phase: **M10 (bounded) — Gate 05M-C3 Deterministic Rule Engine
  Foundation** (owner opened the gate, D-011; ingestion batch intake complete
  75/75, D-010). M10A–M10F are built + verified under `engine/` (ledger L-002);
  M10G SIL + M10H HIL pending. Roadmap: `docs/roadmaps/M10_RULE_ENGINE_FOUNDATION.md`;
  phase file `docs/status/CURRENT_PHASE.md`. Frozen source spec: Gate 05M-C3
  Revision 08 (RC-313..425). The broad Rev 07 baseline-schema M10
  (`M10_IMPLEMENTATION.md`), ODR-001..ODR-003, and M11 remain gated.
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-27).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED — 05A/05B done;
  05C..05G done; 05H (v3); 05I..05I-D matrices; 05J
  CONTROLLED_VEHICLE_FITMENT_DEFINED; 05K
  LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED / NO_REAL_HV_CONTACTOR_CLOSURE; 05L-A
  HV_AUTHORIZATION_GATE_CREATED; 05L-B
  CONTROLLED_HV_PRECHARGE_OBSERVATION_READY; 05L-C
  HV_SHUTDOWN_DISCHARGE_REPEATABILITY_READY; 05M-A
  INVERTER_READY_ZERO_TORQUE_VALIDATION_READY; 05M-B
  NO_LOAD_MOTOR_SPIN_VALIDATION_DEFINED; 05M-C1
  COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED / NO_GROUND_CONTACT; 05M-C2
  FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE / GROUND_CONTACT_PRESENT /
  RESTRICTED_CREEP_ONLY / CAN_1_ELECTRICALLY_PASSIVE_ONLY / BASELINE_CANDIDATE /
  FORMAL_ENGINEERING_REVIEW_REQUIRED / DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED /
  BRAKE_ASSIST_INTERLOCK_REQUIRED / STEERING_ASSIST_INTERLOCK_REQUIRED /
  CONTROLLED_FAULT_INJECTION_ONLY / PROCEDURE_APPROVAL_REQUIRED /
  EXECUTION_NOT_YET_PROVEN / RESULT_SIGNOFF_NOT_YET_ELIGIBLE /
  NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED; 05M-C2B adds ROLLBACK_ABORT_RULE_REQUIRED
  / PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED
  (`GATE05M_C2_RESTRICTED_CREEP.md`, split 05M-C2A/B/C — labels
  `GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` per
  review_64, NOT physical-pass evidence); **05M-C3 CREATED —
  MODULAR_ARCHITECTURE_DEFINED / NO_TORQUE_VECTORING_AUTHORITY /
  NO_ACTIVE_ABS_ESC_AUTHORITY / RUNOUT_CALCULATION_REQUIRED /
  NO_NORMAL_DRIVING_AUTHORITY — REVISION_08_APPLIED / FORMAL_BASELINE_CANDIDATE /
  SAFETY_ARCHITECTURE_MATURE / RELATIONAL_SCHEMA_DOCTRINE_DEFINED /
  CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE / DATABASE_IMPLEMENTATION_DEFERRED_M10 /
  FAULT_DEFINITION_REGISTRY_DEFINED / VEHICLE_COMPONENT_CONFIG_LINK_DEFINED /
  CROSS_RECORD_VEHICLE_IDENTITY_DEFINED / AUTHORITY_CLASS_ELIGIBILITY_DEFINED /
  TEST_EXECUTION_SCHEMA_DEFINED / AUTOMATIC_EXPIRY_BEHAVIOR_DEFINED /
  CONFIGURATION_CHANGE_TRANSACTION_DEFINED /
  C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED / AUTHORIZATION_TRANSITION_RULES_DEFINED
  / TRANSITION_RULE_TABLE_DEFINED / AUTHORIZATION_TRANSITION_AUDIT_DEFINED /
  AUTHORIZATION_FIELD_UNITS_AND_VALIDATION_DEFINED / STATUS_DEPENDENT_VALIDATION_DEFINED
  / UNIT_ENUM_AND_CANONICAL_CONVERSION_DEFINED / AUTHORIZATION_ACTIVATION_RULES_DEFINED
  / AUTHORIZATION_EXPIRY_STATE_DEFINED / RESULT_STATUS_SEPARATED /
  PROCEDURE_APPROVAL_RECORD_DEFINED / RUNOUT_BLOCK_RULES_DEFINED /
  RUNOUT_MEMBERSHIP_DERIVED_DEFINED / AUTHORITY_STATUS_ENUM_DEFINED /
  ESTOP_RAW_TRACE_DEFINED / ESTOP_RESULT_DECOMPOSED_DEFINED /
  INDEPENDENT_SENSOR_HEALTH_SCHEMA_DEFINED / SENSOR_FAILURE_RESPONSE_COMPLETE_DEFINED
  / STEERING_RESOLUTION_DETERMINISTIC_DEFINED / STEERING_RECOVERY_MODEL_DEFINED /
  FAULT_EXECUTION_LIFECYCLE_FIELDS_DEFINED / PAIRED_FAULT_COMPONENT_REGISTRY_CORRECTED
  / DATABASE_FOREIGN_KEY_ENFORCEMENT_DEFINED / ARRAY_TO_JUNCTION_TABLE_DOCTRINE_DEFINED
  / TEST_ATTEMPT_MODEL_DOCTRINE_DEFINED / CROSS_RECORD_CONFIG_EQUALITY_DEFINED /
  APPEND_ONLY_INSERT_ENFORCEMENT_DOCTRINE_DEFINED / SCOPE_LIMITATION_NO_REUSE_DEFINED
  / EXACT_BINDING_SCOPE_DEFINED / COMPLETED_NOT_SIGNED_PASS_RULE_DEFINED /
  RUNOUT_AGGREGATION_RESULT_SCHEMA_DEFINED / DISTANCE_GEOMETRY_VALIDATION_DEFINED /
  APPEND_ONLY_ANNOTATION_RULE_DEFINED / FAULT_EXECUTION_AUTHORIZATION_SCHEMA_DEFINED
  / PAIRED_FAULT_LIFECYCLE_FIELDS_DEFINED / NO_CLAIM_RULE_DEFINED /
  PROCEDURE_SIGNATURE_REQUIRED / IMMUTABLE_EVIDENCE_PRESERVATION_DEFINED /
  MULTI_FAULT_AUTHORIZATION_SCHEMA_DEFINED / FAULT_DEFINITION_REGISTRY_DEFINED /
  VEHICLE_COMPONENT_CONFIG_LINK_DEFINED / CROSS_RECORD_VEHICLE_IDENTITY_DEFINED /
  AUTOMATIC_EXPIRY_BEHAVIOR_DEFINED / CONFIGURATION_CHANGE_TRANSACTION_DEFINED per
  review_72
  (`GATE05M_C3_CLOSED_AREA_MOVEMENT.md`, five linear subgates 05M-C3A→C3E; labels
  `GATE_05M_C3_REVISION_08_CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE`
  per review_72, NOT physical-pass evidence; the owner's downstream SQL schema →
  migrations → triggers → rule-engine → negative tests → SIL → HIL → signed evidence
  + the relational-schema doctrine are deferred M10/production, NOT built
  during ingestion — `DATABASE_IMPLEMENTATION_NOT_YET_COMPLETE` = described, not
  built); 05M-C3A execution + Envelope-Cell-1
  authorization (signed `TestCellAuthorization_ID`) NEXT per D-008 (amended
  review_72)**; 07 v0.1 / 07B / 07C v0.4 PARKED; 08
  FMEA_REGISTRY_CREATED (15 modes); 08B PARKED; **08C
  SIMULATION_SWEEP_MATRIX_CREATED — PARKED_FOR_SUPPLIER_DATA**. Order after
  05: 06 deep dive → 09 → 10 → 11.
- Build artifacts: all `docs/status/GATE05*` files (through
  `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`), `MASS_LEDGER.md`,
  `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`,
  `docs/doctrine/FAULT_LIBRARY_ARCHITECTURE.md`.
- Doctrine: **D-009** (fault-record & error-library architecture — layered
  identity, four-layer library, similarity-is-review-only; doctrine not M10;
  `docs/doctrine/FAULT_LIBRARY_ARCHITECTURE.md`; RC-364..368) + **D-007**
  (controls-authority) + **D-008** (staged post-bench
  gate ladder to HV; never "certified safe"; amended review_65 — 05J → 05K →
  05L-A → 05L-B → 05L-C → 05M-A → 05M-B → 05M-C1 → 05M-C2 (05M-C2A → 05M-C2B →
  05M-C2C) → 05M-C3 (05M-C3A → 05M-C3B → 05M-C3C → 05M-C3D → 05M-C3E; Revision 08
  per review_72); each engineer-approved) + the **Numeric Threshold Authority
  Rule** (RC-267/293/300) + RC-168 + the invented-values family through RC-267 +
  RC-190/191/197
  (HIL/bench is evidence, not vehicle authority) + RC-205/227/247/265 (VCU
  requests/monitors; BMS/PDU owns contactor/pre-charge; the inverter owns its
  gating; hardwired loop + service brakes own the stopping/interruption path) +
  RC-206 (service-clear never clears active safety faults) + RC-213/218 (a DBC
  is a database, version hash enforced) + RC-224 (never "certified safe") + the
  Gate 05x chain RC-229..306 (incl. **RC-279 no manual restraint of rotating
  parts, RC-280 lifted-chassis safety, RC-282 wheel-speed read-only, RC-285
  Ground Movement Precondition, RC-286 05M-C2A/B/C split, RC-289 proof/authority
  columns, RC-290 authorized fault clear not a hard reset, RC-291 no auto
  speed-unlock, RC-292 Required Approver not "Approved by", RC-293 Numeric
  Threshold Authority Rule, RC-294 breakaway a range not a pass gate, RC-295
  measurable thresholds not absolutes, RC-296 brake-hold displacement threshold,
  RC-297 bounded fault injection, RC-298 brake/steering pre-movement interlock,
  RC-299 four-field approval record (procedure approval ≠ result signoff, GLOBAL),
  RC-300 expanded numeric-authority linkage, RC-301 software Restricted Creep
  Torque Clamp not "hard/absolute", RC-302 dual-channel APPS plausibility, RC-303
  torque-rate ≠ current-response, RC-304 electrical CAN passivity, RC-305 C2B
  rollback containment + hill-hold ≠ parking-hold, RC-306 tested assistance
  interlock, RC-307 measurable APPS operating windows not "completely valid",
  RC-308 current-loop latency inside an approved envelope, RC-309
  architecture-dependent E-stop not universal contactor-open, RC-310 Neutral =
  zero propulsion torque not universal switching ban, RC-311 C2B rollback abort
  rule, RC-312 test-torque-not-full-torque brake-hold, RC-313 approved runout
  calc not hard-coded 50 m, RC-314 cell-by-cell envelope escalation, RC-315
  governor proven off-track first, RC-316 path-deviation observation vs
  torque-inhibit split, RC-317 brakes never fight sustained torque
  (SAFETY-CRITICAL), RC-318 contact thermocouples over IR, RC-319 ABS/ESC
  two-lane rule, RC-320 no instant/immediate regen, RC-321 brake-blend
  continuity/jerk envelope, RC-322 no premature C3D numbers, RC-323 road-wheel
  geometry not SWA alone, RC-324 C3E cell-based fault escalation, RC-325 test
  configuration lock, RC-326 telemetry time-synchronization, RC-327 full runout
  field list + L_min, RC-328 C3A-009B stays LOCKED, RC-329 approved command
  envelope not "linear", RC-330 BOS ≠ foundation-brake stop, RC-331 regen-disabled
  a command state, RC-332 coexistence ≠ brake blending, RC-333 BMS-permission not
  high-SOC, RC-334 no arbitrary bus injection, RC-335 driver/brake response after
  regen loss, RC-336 no premature C3D numbers, RC-337 steering-signal validity
  states, RC-338 listed C3E fault hierarchy, RC-339 test-result validity rule,
  RC-340 explicit L_min equation + governance, RC-341 ±2 Nm zero-regen residual a
  candidate, RC-342 no circular C3A→C3B dependency, RC-343 no "immediate" steering
  wording, RC-344 STALE by signal freshness, RC-345 supplier Neutral envelope,
  RC-346 fault ownership + comms-loss ≠ shutdown, RC-347 C3E fault-execution
  domain, RC-348 paired-fault prerequisites, RC-349 invalidated evidence preserved,
  RC-350 TestCellAuthorization_ID schema, RC-351 preserve distance values not
  zero-clamp, RC-352 distance accounting integrity, RC-353 immutable result
  lifecycle, RC-354 authorization status transitions, RC-355 procedure approval
  needs signatures, RC-356 ±2 Nm non-authoritative + DC-bus, RC-357 measurable
  C3A-006 braking, RC-358 C3A-009B block prerequisites, RC-359 independent
  evidence after comms loss, RC-360 steering validity vs freshness, RC-361
  execution arrows are review paths, RC-362 tighter moving-fault limits, RC-363
  PairedFaultAuthorization_ID schema, RC-364 fault records are structured evidence
  not conclusions, RC-365 multi-level vehicle identity hierarchy, RC-366
  four-layer error library only layer-1 reusable, RC-367 similarity is review-only
  not auto-reuse, RC-368 VIN/label seeds upper IDs only / config must be measured
  (RC-364..368 = D-009 fault-library doctrine), RC-369 authorization-field units +
  hard validation, RC-370 immutable authorization-transition audit, RC-371
  COMPLETED ≠ SIGNED_PASS, RC-372 RunoutAggregationResult + hard blocks, RC-373
  distance boundary/geometry validation, RC-374 append-only evidence, RC-375 regen
  residual conditioned by operating state / ZERO_REGEN_REQUEST command state,
  RC-376 C3A-008 separate E-stop outcomes, RC-377 C3C-007 measurement uncertainty +
  channel health, RC-378 deterministic steering-state precedence, RC-379 steering
  fault recovery rules, RC-380 per-fault FaultExecutionAuthorization_ID, RC-381
  paired-fault result + lifecycle fields, RC-382 no-claim rule
  (RC-369..382 = Gate 05M-C3 Revision 05, review_69), RC-383 complete overlap
  enforcement + full movement-block conditions, RC-384 allowed_steering_band
  bounded record + angle frame, RC-385 unit controlled enum + canonical-SI
  comparison, RC-386 authorization activation preconditions + single-ACTIVE, RC-387
  COMPLETED is an execution state / three status enums separated, RC-388 EXPIRED
  authorization state, RC-389 ProcedureApproval_ID signed record, RC-390 C3A-008
  E-stop raw-trace timestamps, RC-391 IndependentSensorHealthResult schema, RC-392
  deterministic three-axis steering resolution, RC-393 per-state steering recovery
  model, RC-394 FaultExecutionAuthorization lifecycle fields, RC-395 paired faults
  keyed by exact fault IDs, RC-396 database foreign-key enforcement, RC-397 scope
  limitation + no-reuse clause (RC-383..397 = Gate 05M-C3 Revision 06, review_70 —
  the eventual schema/rule-engine/HIL implementation is deferred M10/production,
  not built during ingestion), RC-398 additional test-distance bounds, RC-399
  status-dependent validation, RC-400 arrays → junction tables, RC-401 derived
  L_min membership + frozen snapshot, RC-402 authority_status enum + approver
  reference, RC-403 complete independent-sensor failure response, RC-404 E-stop
  per-outcome result decomposition, RC-405 paired-fault component FK →
  VehicleComponentInstance not DistanceComponent, RC-406 one-to-many test-attempt
  model, RC-407 test-result attempt identity + applicability, RC-408 explicit
  allowed-transition table + no ACTIVE→COMPLETED authorization edge, RC-409
  cross-record configuration equality, RC-410 append-only INSERT-only enforcement,
  RC-411 exact-binding scope statement (RC-398..411 = Gate 05M-C3 Revision 07,
  review_71 — the junction-table / test-attempt / rule-engine / SIL-HIL
  implementation is deferred M10/production, captured as relational-schema doctrine
  only, not built during ingestion), RC-412 added TestCell constraints +
  authority-class eligibility, RC-413 transition table is source of truth, RC-414
  expanded SUSPENDED→AUTHORIZED revalidation set + artifact requirement, RC-415
  TestExecution schema, RC-416 TestResult cardinality correction, RC-417
  junction-table composite keys, RC-418 allowed_regen_state enum, RC-419
  FaultDefinition registry (D-009 layer-1 parent), RC-420 VehicleComponentInstance
  config linkage, RC-421 cross-record vehicle-identity equality, RC-422
  append-only enforcement mechanics, RC-423 cryptographic hash-chain specification,
  RC-424 automatic expiry behaviour, RC-425 configuration-change transaction rule
  (RC-412..425 = Gate 05M-C3 Revision 08, review_72 — the SQL schema / triggers /
  rule-engine / SIL-HIL implementation is deferred M10/production, captured as
  relational-schema doctrine only, not built during ingestion)**) bind all Gate 05x
  + downstream controls work.
- Open owner decisions (accumulated): (1) elektron-os-clean; (2) index.html;
  (3) L2; (4) L4; (5) L6; (6) L9 lane name; (7) Artifact Intake Form; (8)
  M10 forbidden-phrase + regression scanner (invented-values family through
  RC-267 — nineteen artifacts — the "instant/immediate" pattern
  RC-175/198/204/211/225/255/274/281/288, "certified safe" RC-224, and the
  **RC-257→263→268, RC-256→264, RC-261→269, RC-271→275, RC-277, RC-279 (safety-
  critical), RC-283 recurrences — the batch_62/63 FULL-DRAFT regression
  (RC-279/283/284/286/288 reverted, then re-emitted a third time), the strongest
  scanner case in the series, **CLEARED at batch_64 (the Hunter converged on the
  corrected wording after three re-issues); the batch_65 "Approved by" residual
  (RC-292) is now formally superseded at batch_66 by the RC-299 four-field
  approval record — `Required Approver` / `Procedure Approval Status` /
  `Execution Status` / `Result Signoff Status`, a GLOBAL Build Engine rule so
  procedure approval is never confused with result signoff**); (9)(10)(11)
  Dana / ZF / Ford-Lee letters; (12) supplier reminder; (13) official Ford BBLB
  + IVM + FMVSS 305a/305/105 + OSHA electrical/LOTO + NHTSA EV + ISO 6469-3 +
  rated-lift/rotating-machinery sources (RC-237..288, NeedsExactSource) + paid
  Gate 08B standards + Ford UIM/BBAS/J1939 docs + **Ford ABS/ESC wheel-speed
  authorization (RC-282)** + supplier BMS/inverter/VCU/DC-DC/charger DBCs + IMD
  supplier manual + pre-charge/contactor datasheets + inverter/motor +
  driveline (gear ratio, axle/GAWR, wheel-speed, brake-override response window,
  steering/brake assist, creep torque/ramp/breakaway) data for 05L-B/C/05M
  (RC-242..288; BQ-27); (14) brake engineer for FMVSS 105; (15) confirm donor
  is 7.3L gas (001A) + donor data; (16) inverter/BMS firmware timing + HV safety
  plan; (17) firmware signoff (BQ-26); (18) BMS/PDU pre-charge + contactor +
  HV-shutdown ownership (BQ-27).

## Next exact action

**M10 (bounded) is built, verified, adversarially hardened, and
evidence-pack-reconciled (D-011/D-013/D-014; L-002/L-004/L-005).** The Gate
05M-C3 rule engine lives under `engine/`; re-verify with `cd engine && npm ci &&
npm run migrate && npm run seed && npm run verify && npm test && npm run build`
(all PASS; **40/40 tests**, 4 migrations / 33 tables). Adversarial re-verify:
`npm run verify:attack && npm run verify:determinism && npm run verify:perf`
(11/12 BLOCKED, A9 residual; ALL DETERMINISTIC; perf fully index-driven). The
rule→code→test map is `engine/IMPLEMENTATION_REPORT.md`; the adversarial findings +
scores are `engine/VERIFICATION_REPORT.md`; the final 10-item reconciliation
(finding count, A1–A12 matrix, benchmark methodology, ledger threat model, VIN
schema, atomicity proof) is `engine/EVIDENCE_PACK.md`.

The next actions, owner-gated: (i) **M10G — SIL validation** and **M10H — HIL
readiness** (directive_03) — need a SIL/HIL environment + supplier data
(NeedsSupplierData; BQ-27); do NOT fabricate SIL/HIL results. (ii) After M10 fully
passes, **M11 — Platform 001 Open Data Register and Supplier Closure**
(`M11_OPEN_DATA_REGISTER.md`) — fill in the exact F-450/F-550 supplier data + resolve
BQ-01..BQ-27; this is where real engineering values enter, owner-approved. Still
gated (do NOT start without the owner opening them): the broad Rev 07 baseline-schema
M10 (`M10_IMPLEMENTATION.md`, entry conditions unmet), ODR-001..ODR-003, M11.
**Never invent an engineering value; seed/DB carry no real approvals or passes.**

Other still-possible inputs, in any order: (a) the **Gate 05M-C3 Controlled Closed-Area
Low-Speed Movement batch** (scope in `GATE_RESEARCH_QUEUE.md`; 05M-C2 in
`GATE05M_C2_RESTRICTED_CREEP.md`; ladder in D-008) — the last rung of the split
05M-C phase, only after Gate 05M-C2 (05M-C2A flat-ground creep → 05M-C2B
incline/rollback → 05M-C2C faulted-creep recovery). **Enforce: engineer-gated,
live-HV, CLOSED CONTROLLED AREA ONLY, NO public road / NO customer operation /
NO normal-driving authority; the Hunter's "up to 15 km/h" is
INITIAL_TARGET_PROFILE pending supplier + engineering approval (RC-267); the
Ground Movement Precondition (RC-285) + predictable-traction surface (RC-283) +
spotters + remote E-stop hold; wheel-speed stays read-only, not traction-control
authority (RC-282); CAN_1 listen-only (RC-172/230); the inverter owns its
gating, the BMS/PDU owns contactors/pre-charge, the hardwired loop + service
brakes own the stopping path, the VCU requests/monitors + enforces the clamp
(RC-247/265/205/227; BQ-27); no manual restraint of rotating parts (RC-279); no
automatic retry after an E-stop (RC-262); torque ramp-rate is `dT_command/dt`
(RC-284); breakaway anomalies → NEEDS_REVIEW not auto-diagnosis (RC-287); no
absolute-zero/instant wording (RC-288); never "certified safe" / compliance
claim (RC-224); OSHA/NHTSA/FMVSS/ISO citations are NeedsExactSource; NEVER "PATS
bypass"; nothing Confirmed.** (b) A detailed **05M-C2A/05M-C2B/05M-C2C** pass if
the owner sends one. (c) The **Gate 06 deep dive** (Mechanical Mounting /
Battery Enclosure) per the standing order after Gate 05 (06 → 09 → 10 → 11).
(d) A Gate 08C reopen if supplier thresholds land. (e) Gate 08B reopen if
official standard PDFs arrive. (f) Gate 07A/07C field data. (g) A supplier
reply — archive 1:1, reconcile, move the matching BQ to the Resolution log.
(h) The owner approves/sends a letter — record Sent + date, start that BQ's
7/14/21-day clock. Enforce throughout: nothing Confirmed; no
compliance/"safe"/"certified" claim; NEVER "PATS bypass" or bus spoofing;
NEVER invent a threshold / timeout / percentage / criterion / current /
clearance / AVV / pre-charge / discharge / inverter / spin / creep / dT/dt /
breakaway threshold or grant a placeholder pass-block; no Ford signal is
confirmed until an official source proves it; wheel-speed/ABS/ESC data never
becomes traction-control authority without Ford authorization; the VCU does not
own HV shutdown or inverter gating until supplier architecture confirms it;
keep diesel data out of the 001A gas model (D-006).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval; no standard quote is a rule until ExactQuoteVerified
  (RC-127); no Ford PGN/byte/rate is a rule until proven (RC-140/145).
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight/CGv as a donor value; the 200 ms HVIL limit
  RC-116; draft driver-warning strings RC-121; Gate 08B standard "quotes";
  any Gate 08C placeholder value as a pass/block RC-133; unverified
  Ford-side CAN IDs/rates/PGNs RC-137/140/145; the pre-charge >95% number
  RC-156/245/252/260/267; the gateway/failsafe/HIL timeouts RC-169/173/174/
  179/180/188; the bench profiles RC-189; the Gate 05I bench values RC-202/
  208/212/215/220/225; the Gate 05J fitment target profiles RC-232; the Gate
  05K power-on target profiles RC-235; the Gate 05L-A safety-readiness + AVV
  threshold RC-241; the Gate 05L-B/05L-C pre-charge/contactor/discharge/retry
  targets RC-245/252; the Gate 05M-A/05M-B inverter/spin targets RC-260/267;
  the Gate 05M-C1 lifted targets RC-267; the Gate 05M-C2A/C2B creep targets — 0–5%
  dead-band / ≤20 Nm/sec `dT_command/dt` / ≤30 Nm clamp / 15–25 Nm breakaway
  (a range, not a pass gate, RC-294) / ≤5% parity / ≤10 Nm brake-hold / ≤1 m
  creep / <2° incline / 15 km/h RC-267/284/293; the IMD 100/500 Ω/V candidates
  RC-251; the OSHA/NHTSA/FMVSS-305/ISO-6469-3 + rated-lift/rotating-machinery
  paraphrase RC-237..288).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05 (D-007 + D-008 + the Numeric Threshold Authority Rule + RC-168 +
  the invented-values family through RC-267 + RC-190/191/197 + RC-205/206/213/
  218/224/227/229/230/231/236/237..288 bind): authorized/listen-only only — no
  anti-theft bypass, no fake/spoofed ABS/ESC messages, no transmit onto factory
  Ford safety buses without approval (RC-136/142/148); **wheel-speed/ABS/ESC
  data is read-only / verification only and never becomes traction-control
  authority without Ford-authorized documentation + engineering review
  (RC-282)**; accel-pedal never drives inverter torque directly (RC-141/146),
  stays masked through 05M-A/05M-B (RC-271/272/275), and in 05M-C2 the pedal is
  a heavily clamped (≤30 Nm target) + ramp-limited (`dT_command/dt` ≤20 Nm/sec,
  RC-284) controlled test input under the Ground Movement Precondition (RC-285);
  no factory-cluster warning injection (RC-151); the VCU requests/monitors but
  does not own pre-charge / HV shutdown / contactors / HV isolation / inverter
  gating — the BMS/PDU owns contactor/pre-charge execution, the inverter owns
  its gating per its supplier state machine, and the hardwired loop + service
  brakes own the physical interruption / stopping path (RC-150/152/157/158/164/
  165/171/205/227/247/265; BQ-27); no real HV contactor closure at Gate 05K
  (RC-236); Gate 05L-A does not energize (RC-244); Gate 05L-B is live-HV but
  observational only (RC-245..250); the pre-charge/shutdown sequence is
  supplier-specific (RC-246/257/263/268) with a command↔aux-contact
  feedback-mismatch block (RC-268); no "absolute 0 Nm/V"/"immediately"/"instant"
  wording — supplier OFF state / zero-torque threshold + supplier response
  windows (RC-273/274/281/288), latency measured (RC-175/255); "current-limited"
  needs a real current-limit definition (RC-248); V_caps matches supplier
  topology not exact 0.0 V (RC-253) and the pre-charge rise is judged against a
  supplier envelope not a perfect RC curve (RC-261/269); timeout logic is
  elapsed-exceeds-limit (RC-254); the E-stop dropout is measured, allows no
  automatic retry ever (RC-255/262/249); 05L-C IMD fault injection uses an
  approved current-limited fixture only — never an ad-hoc resistor on a live
  rail (RC-256/264); weld detection splits false-positive vs false-negative
  (RC-258); Gate 05M-A is inverter-enable READINESS not spin — supplier-defined
  ready/torque-disabled state (never "Ready-to-Drive", RC-271/275), tolerance
  thresholds not perfect zero (RC-270), no assumed 0% PWM (RC-265/266); Gate
  05M-B is the first physical rotation with the motor UNCOUPLED + GUARDED
  (RC-272), coasting is not the watchdog failure (RC-276), over-speed via a
  supplier-supported test mode (RC-277); Gate 05M-C is split 05M-C1 (coupled,
  wheels lifted) → 05M-C2 (first ground contact; 05M-C2A/B/C) → 05M-C3 (RC-278/
  286); **Gate 05M-C1 forbids manual restraint of rotating parts — rated
  fixtures only, no hands near rotating parts ever (RC-279); it runs only on a
  rated lift / rated heavy-duty stands per GVWR/axle load, guarded, no personnel
  inline, no one under the vehicle during energized rotation (RC-280)**; **Gate
  05M-C2 is the first powered ground-contact gate — a flat/controlled/closed
  predictable-traction surface (never low-friction, RC-283), the Ground Movement
  Precondition gates every creep command (RC-285), torque is clamped + ramp-
  limited `dT_command/dt` (RC-284), rollback/incline is deferred to 05M-C2B
  (RC-286), breakaway anomalies → NEEDS_REVIEW not auto-diagnosis (RC-287),
  spotters + remote E-stop + runout, no public road / no customer / no
  normal-driving authority**; all numeric values across 05L-B..05M-C2 are
  INITIAL_TARGET_PROFILE with no gate authority until tied to supplier docs +
  engineering review + calibrated measurement method + raw proof + signed
  approval (RC-267); Ford signals don't gate real state transitions (RC-155);
  torque command stays strictly in DRIVE_ENABLED (RC-160); SERVICE_MODE + UDS
  service-clear require safe/neutral + LOTO / absence-of-voltage and must never
  clear active hardwired/HVIL/E-stop/BMS/isolation faults or a live latch
  (RC-163/206); a signal cannot be both a request and a hardware actuation
  unless the source says so (RC-168); a DBC is a database not a packet +
  version-hash enforced (RC-213/218); frame-fault layering (RC-217/222);
  charger-plug during drive = detect + reject (RC-226); Ford source controllers
  stay generic until proven (RC-166); CAN_1 stays listen-only (RC-172;
  simulated/bench + non-destructive fault injection only, RC-182/187/192/193/
  200/219/221; TXD-pin ACK proof, RC-186/216) with the RC-167 proof pack; the
  first connection to the live OEM Ford CAN_1 network (Gate 05J) is passive
  listen-only only, after the Gate 05H/05I-C proofs, via a Ford baseline scan →
  connect → post scan → compare (RC-230); parasitic draw measured/logged as
  OEM_baseline / conversion_added / total_vehicle (RC-231/234); the stored-
  energy discharge-wait rule guards DC-link caps (RC-242); PPE/tools/meters are
  voltage-matched, the gate blocks above rating (RC-239); personnel are
  qualified/authorized not "certified" (RC-238); fire assets are
  AHJ/supplier-ERG-selected (RC-240); Live-Dead-Live uses an approved proving
  source + resolution-aware threshold (RC-241); HIL scripts report
  `…_NO_VEHICLE_AUTHORITY` / `HIL_HARD_BLOCK`, Gate 05I* report BENCH
  categories, never PASS (RC-181/188/191/197); HIL/bench results are not
  vehicle/live-HV/compliance authority and **never "certified safe"**
  (RC-190/224); every run produces the proof-artifact package + calibration
  records (RC-184/194) + pre-test safety checklist (RC-195);
  expected-safe-output ≠ blocked-output (RC-203/208); a hard block is
  `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` (RC-207); breach limits are variables
  not hard-coded constants (RC-209/215); the post-bench ladder is staged +
  engineer-gated — 05J/05K no-HV, 05L-A authorization, 05L-B first-energization
  (observational), 05L-C shutdown/discharge/repeatability, 05M-A (inverter
  enable / zero-torque readiness) → 05M-B (no-load spin, uncoupled/guarded) →
  05M-C1 (coupled, wheels lifted) → 05M-C2 (first ground contact; 05M-C2A/B/C) →
  05M-C3 (closed-area low-speed movement) (D-008; RC-237..288); every torque /
  contactor / BMS-discharge / HVIL / isolation / e-stop fault defaults toward
  torque inhibit + restart lockout + engineering review (RC-179).**
- Do not recommend or run live-HV fault testing beyond the staged,
  engineer-gated scope; no ground contact / wheel torque path before Gate
  05M-C2 (05M-C1 is wheels-lifted only); no normal driving / open-floor / track
  / public road before the later engineer-gated road phases; staged testing only
  (RC-117) with LOTO/PPE/engineering signoff; no manual restraint of rotating
  parts (RC-279).
- Do not let the Build Engine claim compliance or mark anything safe /
  "certified safe" (RC-224).
- Do not let quantum-inspired material gate or approve anything.
- Do not implement M10, M11, or any production code; do not resolve
  ODR-001..ODR-003.

## Receiving-agent checklist (complete BEFORE modifying any file)

- [ ] **Agent owner field names ME** — if not, do not edit
- [ ] `git status` — clean tree, expected branch
- [ ] `git log -1` — HEAD matches end commit above
- [ ] Active spec checked (`docs/specifications/Revision_07.md`,
      `rev07/00_BASELINE_INDEX.md`)
- [ ] Claimed tests re-run and results compared (or absence of a test
      suite verified explicitly)
- [ ] `docs/status/CURRENT_PHASE.md`, `docs/status/BLOCKERS.md`,
      `docs/status/BLOCKED_QUESTIONS_LEDGER.md`, and the build artifacts
      (all `docs/status/GATE05*` files, `MASS_LEDGER.md`,
      `AXLE_CG_CALCULATOR.md`, `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`)
      read
