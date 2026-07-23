# Research Hunter — batch 76 (owner label "74:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). The owner framing ("QUESTION TOLD", re-issued
> review_71 corrections) and the owner verdict ("My RESPONSE … 20 items") are
> archived separately at `../owner_reviews/review_72_batch_76_verdict.md`.
>
> NOTE ON THIS DELIVERY: the Hunter emitted **"Global Engineering Safety
> Amendments (Revision 07)"** as a nine-section relational-database specification.
> It still carries OCR/transcription corruption in places — the `L_min` equation
> ("Umin"/"Lworst_case_coastor.stop"/"Lresponse allowance"), blank-bullet
> `PHYSICAL_MOVEMENT_BLOCKED` conditions, the empty TestCell hard-constraint
> bullets in §2.3, the truncated Suspended-revalidation list, the empty
> zero-regen dimensions, and the truncated independent-sensor failure action.
> All of these are already clean/canonical in the deliverable
> `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. The Hunter DID land several new schema
> pieces: the `RunoutAggregationComponent` junction table + the derivation query,
> the `DistanceComponent.authority_status` enum, the E-stop per-outcome result
> fields, the `VehicleComponentInstance` registry with the corrected paired-fault
> FK, the `TestResult` attempt schema, the junction-table set (§7.1), and the
> Section 8 scope statement + Section 9 next-phase pipeline.

---

## Owner framing (chat, label "74:75") — QUESTION TOLD (re-issued review_71 corrections)

Re-issues review_71 items 2, 3, 5, 7, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20 (runout
hard-block list; corrected/added validation expressions incl.
`maximum_test_distance.value <= available_track_length` and `<= calculated
authorized movement envelope`; COMPLETED belongs to execution status not
authorization; arrays → junction tables; component membership derived not a typed
array; `authority_status` enum + approver reference; ZeroRegenEnvelope dimensions;
complete independent-sensor failure response; E-stop per-outcome decomposition;
paired-fault component FK → VehicleComponentInstance; test-result attempt identity +
applicability; explicit transition table + no ACTIVE→COMPLETED; cross-record
configuration equality; strengthened scope statement) plus the "next correct phase"
list (normalize schemas → repair → separate auth/exec/result → arrays → junction
tables → DB constraints + append-only ledgers → rule-engine tests → SIL/HIL). These
are the RC-398..411 corrections already applied to the deliverable at Revision 07.

## RESEACHER RESPONSE — Global Engineering Safety Amendments (Revision 07)

The Hunter's Revision 07 amendment restructures Gate 05M-C3 as a normalized
relational-database specification, in nine sections:

- **Section 1 — Track Length, Summation Integrity & Runout Aggregation:** the
  7-term `L_min` (OCR-corrupted in this copy); the `DistanceComponent` schema with
  the `authority_status` enum (`DRAFT | MISSING_SOURCE | UNVERIFIED |
  INITIAL_TARGET_PROFILE_ONLY | ARTIFACT_DEFINED | ENGINEERING_APPROVED | REVOKED |
  SUPERSEDED`) and `overlap_review_approver_id` FK; the boundary geometry validation
  rules; the `RunoutAggregationResult` schema + the `RunoutAggregationComponent`
  junction table with the derivation query (`SELECT component_id FROM
  DistanceComponent WHERE RunoutCalculations_ID = :active AND included_in_L_min =
  true AND authority_status IN ('ARTIFACT_DEFINED','ENGINEERING_APPROVED')`);
  `PHYSICAL_MOVEMENT_BLOCKED` conditions (blank-bullet corrupted in this copy).
- **Section 2 — Unified Engineering Units and Database Validation:** the
  `TypedNumericField`; the 22-value unit enum + canonical-SI conversion; the
  `AllowedSteeringBand`; the `TestCellAuthorization` schema (arrays stripped to
  junction tables; `status` enum now includes `EXPIRED`, drops `COMPLETED`); the
  hard-validation constraints (blank-bullet corrupted in this copy).
- **Section 3 — State Machines & Transition Validation:** the state diagram (drawn
  with an `ACTIVE → SUPERSEDED` edge); the explicit allowed-transition TABLE
  (`ACTIVE → SUSPENDED | REVOKED`; `AUTHORIZED → ACTIVE | SUSPENDED | REVOKED |
  EXPIRED`; `SUSPENDED → AUTHORIZED | REVOKED | EXPIRED`; `REVOKED → SUPERSEDED`;
  `EXPIRED → SUPERSEDED`); execution-progression separation (COMPLETED execution
  does not mutate authorization); activation rules; single-ACTIVE; the
  `AuthorizationTransition` schema; the Suspended-revalidation heading (list
  dropped).
- **Section 4 — Result Sign-off & Evidence Preservation:** the three status enums
  (Authorization / Execution / Result); the gate-clearance rule; the `TestResult`
  schema with `attempt_number` / `applicability_status` / `superseded_by_result_id`;
  the immutable-evidence rule.
- **Section 5 — Regenerative Command Baseline Residuals:** `ZERO_REGEN_REQUEST`;
  ±2 Nm `INITIAL_TARGET_PROFILE` / `NO_PASS_FAIL_AUTHORITY`; the ZeroRegenEnvelope
  dimensions (empty in this copy).
- **Section 6 — Gate 05M-C3 subgate sequence:** C3A-006 / C3A-008 (with the
  expanded E-Stop Telemetry Log Split now carrying the ten per-outcome PASS/FAIL
  result fields) / C3A-009B locked + pre-execution gates; C3C-007 +
  `IndependentSensorHealthResult` (failure action truncated in this copy); C3D
  three-axis steering resolution + recovery; C3E `FaultExecutionAuthorization` +
  the `VehicleComponentInstance` registry (subsystem enum VCU/INVERTER/BMS/PDU/
  APPS/BRAKE_ASSIST_UNIT/STEERING_ASSIST_UNIT/DC_DC_CONVERTER/WHEEL_SPEED_SENSOR)
  + the corrected `PairedFaultAuthorization` with `fault_1_component_id` /
  `fault_2_component_id` FK → `VehicleComponentInstance.component_id`.
- **Section 7 — Relational Database Integrity Rules:** the junction-table set
  (`TestCellRequiredApprover`, `TestCellAllowedFault`, `AuthorizationTransitionEvidence`,
  `FaultAuthorizationAbortCondition`); the ER reference map + FK list; the
  multi-record ConfigurationPacket equality constraint.
- **Section 8 — Safety Scope & Boundary Limitations:** the exact-binding
  SIGNED_PASS scope (VIN/build · ConfigurationPacket · hashes · envelope ·
  mass/tire · env window · procedure revision) + the out-of-scope statement.
- **Section 9 — Next Phase Sequence and Verification Pipeline:** normalize schemas
  → rule-engine implementation → automated constraint testing → append-only
  ledgers → SIL/HIL validation → `CONTROLLED_SPECIFICATION_FREEZE → DATABASE
  MIGRATION PENDING → REVISION 07 COMMITTED`.

*(Full delivered text — including all ASCII schema trees, the ER diagram, the
state-machine diagram and the pipeline diagram — is preserved as delivered. The
owner's verdict with 20 items is archived in review_72.)*
