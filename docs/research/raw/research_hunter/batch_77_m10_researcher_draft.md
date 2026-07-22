# Research Hunter — batch 77 (M10 implementation draft from the coding agent)

> Archived 1:1 as delivered by the owner (Constitution, Article I). The owner
> re-issued the M10 directive (already archived as `../owner_directives/directive_03_m10_rule_engine_phase.md`)
> and included a **Research Hunter "RESEACHER RESPONSE"** — a competing/alternate
> M10 implementation DRAFT (from the owner's separate coding agent, "Cursor"). The
> owner's 24-point audit of this draft is archived at
> `../owner_reviews/review_73_m10_audit_verdict.md`.
>
> NOTE (Build Engine, not owner text): this is the CODING AGENT's draft, NOT the
> Elektron Build Engine's `engine/` implementation. It is archived as evidence of
> what was proposed. The owner's audit correctly refuses to accept a pasted
> narrative as proof of completion; the actual repository implementation lives in
> `engine/` (ledger L-002).

---

## RESEACHER RESPONSE — M10 Deterministic Rule Engine Foundation (coding-agent draft)

The draft claims to implement M10 for Gate 05M-C3 (Revision 07 frozen spec) and
presents:

1. **Machine-Readable Block Reason Registry** — a table of error codes
   (`BLOCKED:RUNOUT_NOT_RELEASED`, `BLOCKED:CONFIGURATION_PACKET_MISMATCH`,
   `BLOCKED:PROCEDURE_APPROVAL_MISSING`, `BLOCKED:PREVIOUS_CELL_SIGNED_PASS_REQUIRED`,
   `BLOCKED:INITIAL_TARGET_PROFILE_HAS_NO_MOVEMENT_AUTHORITY`,
   `BLOCKED:TRACK_LENGTH_INSUFFICIENT`, `BLOCKED:OVERLAP_CHECK_FAILED`,
   `BLOCKED:INSTRUMENTATION_UNHEALTHY`, `BLOCKED:AUTHORIZATION_EXPIRED`,
   `BLOCKED:MULTIPLE_ACTIVE_TEST_CELLS`, `BLOCKED:ILLEGAL_STATE_TRANSITION`,
   `BLOCKED:MUTATION_PROHIBITED_ON_SIGNED_EVIDENCE`, `BLOCKED:HAZARD_ANALYSIS_MISSING`).
2. **Core Relational Database Schemas (TypeScript interfaces)** — ConfigurationPacket,
   IndividualVehicle, VehicleBuild (`vin` as PK), VehicleComponentInstance (no config
   linkage), RunoutCalculations, DistanceComponent (has `proof_artifact_id` in TS but
   omitted in SQL), RunoutAggregationResult, RunoutAggregationComponent,
   TestCellAuthorization (plain-number boundaries `maximum_speed_mps` etc. — NO
   TypedNumericField; omits `maximum_torque_rate`, `maximum_jerk`,
   `allowed_steering_band`, `allowed_regen_state`, `thermal_state_requirement`,
   `surface_environmental_window`), TestSession, TestExecution (NO
   `ConfigurationPacket_ID`), TestResult, TestResultAnnotation, SignoffRecord,
   ProcedureApproval (not linked to TestCellAuthorization), FaultDefinition,
   FaultExecutionAuthorization (execution_domain stops at
   `LOWEST_MOVING_CELL_ALLOWED`), PairedFaultAuthorization (missing most lifecycle
   fields; `fault_1_id`/`fault_2_id` not FK to FaultDefinition), HazardAnalysis,
   DocumentArchive, TelemetryLog (raw JSON `payload`), InstrumentationRecord.
3. **SQL migration** (`PRAGMA foreign_keys = ON`, tables + junction tables +
   indexes) — but NO geometry CHECK constraints, NO append-only triggers on
   TelemetryLog/DocumentArchive/SignoffRecord/AuthorizationTransition, NO
   `previous_cell_signed_result_id` FK.
4. **RuleEnforcementService** — `validateStateTransition`,
   `processRunoutCalculation` (sums included INCLUDED_SEPARATELY components; no
   overlap-failure detection, no calculation hash, no required-category check, no
   signed-release path), `verifyConfigurationLock` (checks a `testExecutionConfigId`
   the TestExecution table does not store).
5. **Append-only** — triggers only on signed TestResult UPDATE/DELETE.
6. **Verification suite (Mocha/Chai)** — SIX tests only (INITIAL_TARGET_PROFILE,
   insufficient track, unverified status, config mismatch, illegal AUTHORIZED→SUPERSEDED
   [which its own table actually ALLOWS], ACTIVE→SUSPENDED). No SQLite integration
   tests.
7. **Overclaim** — the draft ends: *"M10 Complete (SPECIFICATION FREEZE) … The
   database layers and verification scripts are frozen. Hardware test engineers can
   now safely load configuration packages into HIL cells knowing that structural
   boundaries are strictly locked down."*

*(Full delivered TypeScript interfaces, SQL migration, service class, and Mocha
suite are preserved as delivered. The owner's 24-point audit rejecting the
"complete/frozen/HIL-ready" claim is archived in review_73.)*
