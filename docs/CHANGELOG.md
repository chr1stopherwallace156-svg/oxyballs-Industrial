# CHANGELOG

Documented history of changes to doctrine, structure, schemas, and
milestones. Append-only; newest entries first.

---

## 2026-07-21 — RH batch 74 ("72:75") + owner review_70: Gate 05M-C3 Revision 06 (RC-383..397)

- Archived RH batch 74 + owner review_70 1:1 (commit `531671f`) — owner label
  "72:75": re-issued review_69 corrections, the Hunter's re-emit ("Global
  Engineering Safety Amendments (Revision 05)"), and a detailed "My verdict" with
  17 items placing Gate 05M-C3 "at formal baseline-candidate quality … strong,
  deterministic, database-centered." New PROVENANCE row +
  `owner_reviews/review_70_batch_74_verdict.md` (17 items verbatim).
- **15 corrections applied to `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  (Revision 06) + RH01 RC-383..397 + D-008 amendment (review_70):** complete
  overlap enforcement + full `PHYSICAL_MOVEMENT_BLOCKED` conditions (RC-383);
  `allowed_steering_band` bounded min/max record + angle frame (RC-384); `unit`
  controlled enum + canonical-SI comparison (RC-385); `AUTHORIZED → ACTIVE`
  activation preconditions + single-ACTIVE rule (RC-386); `COMPLETED` moved to
  execution status, three status enums separated (RC-387); `EXPIRED` authorization
  state (RC-388); `ProcedureApproval_ID` signed record (RC-389); C3A-008 E-stop
  raw-trace timestamps + profile artifacts (RC-390); `IndependentSensorHealthResult`
  schema, invalid channel → `INVERTER_PHYSICAL_STATE = UNKNOWN` (RC-391);
  deterministic three-axis steering resolution, no catch-all row (RC-392);
  per-state steering recovery model (RC-393); `FaultExecutionAuthorization_ID`
  execution/result lifecycle fields (RC-394); paired faults keyed by exact
  `fault_1_id`/`fault_2_id` (RC-395); database foreign-key enforcement, orphaned
  references hard-blocked (RC-396); and the scope-limitation no-reuse clause
  (RC-397).
- Owner items 1 (`L_min` equation OCR text) and 3 (typographical field-name
  corruption) targeted the Hunter's delivered text only — **already
  clean/canonical** in the deliverable (RC-340/351 + canonical field names). Noted,
  no duplicate RC rows minted.
- Deliverable relabelled
  `GATE_05M_C3_REVISION_06_READY_FOR_CONTROLLED_SPECIFICATION_FREEZE` — the
  controlled-validation architecture is mature and ready to freeze the
  specification while all physical pass claims remain correctly unproven. **The
  owner's downstream sequence — `DATABASE_SCHEMA_IMPLEMENTATION → RULE_ENGINE_TESTS
  → HIL_VALIDATION` — is M10/production work and is NOT performed during Rev 07
  ingestion.** Every value stays `INITIAL_TARGET_PROFILE`; nothing Confirmed; no
  public road / no customer operation / no compliance claim; ODRs untouched.

---

## 2026-07-21 — RH batch 73 ("71:75") + owner review_69: Gate 05M-C3 Revision 05 (RC-369..382)

- Archived RH batch 73 + owner review_69 1:1 (commit `e0837c6`) — owner label
  "71:75": re-issued batch_72 corrections + a detailed verdict on Gate 05M-C3
  **Revision 05**, classified `FORMAL_ENGINEERING_BASELINE_CANDIDATE` ("the
  strongest and most internally consistent version yet"). New PROVENANCE row +
  `owner_reviews/review_69_batch_73_verdict.md` (16 items verbatim).
- **14 corrections applied to `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  (Revision 05) + RH01 RC-369..382 + D-008 amendment (review_69):** units + hard
  validation on every numeric authorization field (RC-369); immutable
  `AuthorizationTransition_ID` audit events + `SUSPENDED → AUTHORIZED` revalidation
  (RC-370); `COMPLETED` ≠ `SIGNED_PASS`, "COMPLETED shall not clear a gate"
  (RC-371); a `RunoutAggregationResult` summary with hard blocks (RC-372);
  distance boundary/geometry validation (RC-373); append-only evidence —
  annotations are new linked records, never overwrites (RC-374); the zero-regen
  residual envelope conditioned by operating state + `ZERO_REGEN_REQUEST` command
  state (RC-375); C3A-008 separate E-stop outcomes (RC-376); C3C-007 measurement
  uncertainty + channel health, not "definitively" (RC-377); deterministic
  steering-state precedence (RC-378); steering fault recovery rules — no
  auto-restore of propulsion (RC-379); per-fault `FaultExecutionAuthorization_ID`
  (RC-380); paired-fault result + lifecycle fields (RC-381); and the explicit
  no-claim rule (RC-382).
- Owner items 1 (`L_min` equation transcription) and 5 (prefilled approvals) were
  **already clean** in the deliverable (RC-340/351, RC-355) — noted, no duplicate
  RC row minted.
- Deliverable relabelled
  `GATE_05M_C3_REVISION_05_READY_FOR_CONTROLLED_MULTIDISCIPLINARY_BASELINE_REVIEW`
  — the validation architecture is nearly ready to freeze while all physical pass
  claims remain correctly unproven. Every value stays `INITIAL_TARGET_PROFILE`;
  nothing Confirmed; no public road / no customer operation / no compliance claim;
  ODRs untouched; no production code / no M10 during ingestion.

---

## 2026-07-21 — Owner directive_02 (side-bar): fault-record & error-library architecture (D-009)

- Archived owner directive_02 1:1 (commit `304fa9c`) — the finished Build Engine
  must record faults as structured, configuration-bound evidence
  (`FaultRecord_ID` + full identity + Telemetry Synchronicity Packet +
  applicability envelope), never a bare "Error: torque too high" conclusion.
- **New doctrine artifact `docs/doctrine/FAULT_LIBRARY_ARCHITECTURE.md` +
  Decision Register `D-009` + RH01 RC-364..368:** a 7-level vehicle identity
  hierarchy (VehicleFamily → Platform → VehicleConfiguration → ConversionPackage
  → IndividualVehicle → TestConfiguration → FaultRecord, RC-365); a four-layer
  error library where only layer-1 definitions are reusable and layers 2–4 are
  configuration-bound (RC-366); similarity is a review-routing input only, never
  auto-reuse across platforms (RC-367); VIN/label scans seed the upper IDs only —
  the configuration must be independently measured (RC-368); faults are
  structured evidence, not conclusions (RC-364).
- Maps onto existing doctrine: Test Configuration Lock (RC-325), Test Result
  Validity (RC-339/353), Telemetry Synchronicity Packet (RC-326), platform
  separation (D-006), and the arrow-is-a-review-path rule (RC-361).
- **Guardrails:** doctrine only — NOT an implemented M10 fault library (no
  production code / no M10 during Rev 07 ingestion); every example ID / envelope
  / similarity percentage is an `INITIAL_TARGET_PROFILE` placeholder, no invented
  values; donor 7.3L gas (001A) still to confirm (BQ-27). Nothing Confirmed; ODRs
  untouched.

## 2026-07-16 — RH batch 72 ("70:75") + review_68: Gate 05M-C3 Revision 04 + 13 pre-baseline corrections

- Archived batch_72 (Gate 05M-C3 Revision 04) and review_68 1:1 (commit
  `2f9fe2b`); PROVENANCE row inserted newest-first. Owner: "Revision 04 is very
  strong and is now close to a controlled engineering baseline."
- **Revision 04 applied the 11 batch_71 corrections (RC-340..350)** — the `L_min`
  equation, `distance_component_method` enum, movement-authorization gate,
  `TestCellAuthorization_ID` archetype + status enum,
  `INVALIDATED_FOR_CURRENT_CONFIGURATION`, ±2 Nm residual candidate, split C3A-006
  + C3A/C3B correlation, supplier-defined Neutral, C3C-007 ownership matrix +
  comms-loss cross-validation, steering freshness STALE, fault execution-domain
  tags, paired-fault prerequisites. C3A-009B cleanly `APPROVAL_REQUIRED`/`LOCKED`.
- **RC-351..363 added; 13 corrections applied verbatim to
  `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`:** preserve distance-component values, no
  zero-clamp (RC-351); Distance Accounting Integrity Rule + component schema
  (RC-352); immutable result lifecycle (RC-353); `TestCellAuthorization` status
  transitions (RC-354); procedure approval requires real signatures (RC-355);
  ±2 Nm strictly non-authoritative + DC-bus current + remove field-weakening
  (RC-356); measurable C3A-006 braking control (RC-357); C3A-009B block
  prerequisites (RC-358); independent physical evidence after comms loss (RC-359);
  steering validity vs freshness (RC-360); execution arrows are review paths
  (RC-361); tighter moving-fault limits (RC-362); full `PairedFaultAuthorization_ID`
  schema (RC-363). (The `L_min` transcription cleanup was already clean.)
- Status upgrades to `FORMAL_BASELINE_CANDIDATE / REVISION_04_APPLIED / … /
  MULTI_FAULT_AUTHORIZATION_SCHEMA_DEFINED`; post-edit label
  `GATE_05M_C3_REVISION_04_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` — ready
  for multidisciplinary engineering review, not physical-pass evidence.
- RH01 section 80; D-008 amended (review_68); RESEARCH_MAP + GATE_RESEARCH_QUEUE
  updated; handoff rotated. Next = 05M-C3A execution + Envelope Cell 1
  authorization / formal engineering baseline review. Nothing Confirmed; no
  normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 71 ("69:75") + review_67: Gate 05M-C3 Revision 03 + 11 pre-baseline corrections

- Archived batch_71 (Gate 05M-C3 Revision 03) and review_67 1:1 (commit
  `abca1d6`); PROVENANCE row inserted newest-first. Owner: "Revision 03 is the
  strongest version so far … a formal engineering baseline candidate."
- **Revision 03 applied the 13 batch_70 corrections (RC-327..339)** — full
  RunoutCalculations_ID field tree, Test Result Validity & Configuration Lock
  Rule, Regenerative Command Baseline, stepped-cell pipeline, C3A-005 command
  envelope, split C3A-006 result, C3A-009B LOCKED, C3C coexistence/blending lanes,
  C3C-004 BMS authority, no-arbitrary-injection C3C-005, C3C-007 driver/brake
  response, steering-signal state matrix, listed C3E hierarchy.
- **RC-340..350 added; 11 corrections applied verbatim to
  `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`:** insert + govern the actual `L_min`
  equation (RC-340); ±2 Nm zero-regen residual a candidate not universal (RC-341);
  remove the circular C3A→C3B dependency (RC-342); remove "immediate" from
  steering states (RC-343); define `STALE` by signal freshness (RC-344);
  supplier-defined Neutral envelope (RC-345); C3C-007 fault ownership + comms-loss
  ≠ shutdown (RC-346); C3E fault-execution-domain classification (RC-347);
  paired/compound-fault prerequisites + order/timing (RC-348); preserve
  invalidated evidence `INVALIDATED_FOR_CURRENT_CONFIGURATION` (RC-349); full
  `TestCellAuthorization_ID` schema (RC-350). (The C3A-009B contradiction fix was
  already applied via RC-328.)
- Status upgrades to `FORMAL_BASELINE_CANDIDATE / REVISION_03_APPLIED / … /
  C3E_EXECUTION_DOMAIN_CLASSIFICATION_DEFINED`; post-edit label
  `GATE_05M_C3_REVISION_03_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` — ready
  for controlled multidisciplinary review, not physical-pass evidence.
- RH01 section 79; D-008 amended (review_67); RESEARCH_MAP + GATE_RESEARCH_QUEUE
  updated; handoff rotated. Next = 05M-C3A execution + Envelope Cell 1
  authorization / formal engineering baseline review. Nothing Confirmed; no
  normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 70 ("68:75") + review_66: Gate 05M-C3 Revision 02 + 13 pre-baseline corrections

- Archived batch_70 (Gate 05M-C3 Revision 02) and review_66 1:1 (commit
  `31647fd`); PROVENANCE row inserted newest-first. Owner: "Revision 02 is very
  strong and materially safer … mature enough for formal engineering review."
- **Revision 02 applied the 14 batch_68 corrections (RC-313..326)** — the
  RunoutCalculations_ID artifact, Config Lock Rule, Telemetry Clock & Sync
  Mandate, stepped cell escalation, C3A-009A/009B split, revised governor test,
  rewritten C3B-004, contact thermocouples, C3C two-lane rule, road-wheel
  geometry, cell-based C3E escalation.
- **RC-327..339 added; 13 corrections applied verbatim to
  `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`:** complete the RunoutCalculation_ID field
  list + `L_min` (RC-327); keep C3A-009B `LOCKED` (RC-328); command envelope not
  "linear" (RC-329); BOS ≠ foundation-brake stop (RC-330); regen-disabled a
  command state (RC-331); coexistence ≠ blending (RC-332); BMS-permission not high
  SOC (RC-333); no arbitrary bus injection (RC-334); driver/brake response after
  regen loss (RC-335); no premature C3D numbers / "immediate" (RC-336);
  steering-signal validity states (RC-337); listed C3E fault hierarchy L1–L4
  (RC-338); Test Result Validity Rule (RC-339).
- Status upgrades to `PROCEDURE_ARCHITECTURE_MATURE / REVISION_02_APPLIED / … /
  C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED / FORMAL_ENGINEERING_REVIEW_REQUIRED`;
  post-edit label
  `GATE_05M_C3_REVISION_02_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` — the
  architecture is mature, not physical-pass evidence.
- RH01 section 78; D-008 amended (review_66); RESEARCH_MAP + GATE_RESEARCH_QUEUE
  updated; handoff rotated. Next = 05M-C3A execution + Envelope Cell 1
  authorization / formal engineering baseline review. Nothing Confirmed; no
  normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH delivery "67:75": duplicate re-send of batch 68 ("66:75") — no new corrections, no new RC rows

- Recorded delivery "67:75" as a **duplicate re-send of batch_68** (commit
  `188bdfc`, PROVENANCE "no separate file" note): content-identical owner framing
  + Gate 05M-C3 modular sequence (still carrying the 14 uncorrected items) + the
  identical 14-correction verdict. Content preserved 1:1 in the batch_68 archive;
  no re-archive.
- **No new RC rows, no deliverable changes** — all 14 corrections (RC-313..326)
  were already applied to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` in batch 68. RH01
  section 77 records the duplicate; flagged to the owner as a likely mis-send.
- Next unchanged = 05M-C3A execution + Envelope Cell 1 authorization. Nothing
  Confirmed; no normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 68 ("66:75") + review_65: NEW GATE 05M-C3 (Closed-Area Movement, modular C3A–C3E) + 14 corrections

- Archived batch_68 (Gate 05M-C3 modular subgate sequence) and review_65 1:1
  (commit `db796b9`); PROVENANCE row inserted newest-first. Owner: "this is a
  major improvement and the C3 architecture is now correctly modular."
- **NEW deliverable `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md`** — Gate
  05M-C3 (Controlled Closed-Area Low-Speed Movement) built as five linear
  subgates: **05M-C3A** straight-line tracking → **05M-C3B** coast-down +
  foundation brakes (regen disabled) → **05M-C3C** restricted regeneration
  (supplemental only) → **05M-C3D** steering-angle / propulsion-envelope map
  (observation/derating, NOT torque-vectoring) → **05M-C3E** closed-area fault +
  abort. Includes the Telemetry Synchronicity Packet and the Critical Abort
  Hierarchy. The Hunter applied the batch_67 corrections (RC-307..312) globally.
- **RC-313..326 added; 14 corrections applied verbatim:** approved Runout
  Calculation Record not a hard-coded 50 m (RC-313); cell-by-cell envelope
  escalation (RC-314); governor proven first off-track (RC-315); split
  path-deviation observation vs torque-inhibit (RC-316); C3B-004 rewritten so
  brakes never fight sustained torque, SAFETY-CRITICAL (RC-317); contact
  thermocouples over IR (RC-318); ABS/ESC two-lane rule (RC-319); no
  "instant/immediate" regen (RC-320); brake-blend continuity/jerk envelope not
  "linear" (RC-321); remove premature C3D numbers (RC-322); road-wheel geometry
  not SWA alone (RC-323); C3E cell-based fault escalation (RC-324); Test
  Configuration Lock Rule (RC-325); telemetry time-synchronization proof (RC-326).
- Post-edit label
  `GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
  procedure architecture is ready for disciplined engineering review, not
  physical-pass evidence.
- RH01 section 76; D-008 amended (review_65, ladder extended to 05M-C3A..C3E);
  RESEARCH_MAP + GATE_RESEARCH_QUEUE updated; handoff rotated. Next = subgate
  execution / cell authorizations (C3A first). Nothing Confirmed; no normal
  driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 67 ("65:75") + review_64: Gate 05M-C2A/05M-C2B procedure baseline + 6 pre-lock corrections

- Archived batch_67 (Gate 05M-C2A/05M-C2B procedure-baseline re-emit) and
  review_64 1:1 (commit `8d6a94b`); PROVENANCE row inserted newest-first. Owner:
  "this is now legitimately strong enough to call a formal baseline candidate."
- **Convergence:** the Hunter now carries all of RC-297..306 (incl. the split
  05M-C2A-005A/005B torque-command vs phase-current rows). **Two residuals**
  recorded, not re-registered: the draft still shows "Approved by <role>"
  (RC-299) and lacks an explicit Numeric Threshold Authority Rule (RC-300) — both
  already in the deliverable. The owner extended RC-299 with a new `INVALID_TEST`
  signoff value and RC-300's authority list with "release".
- **RC-307..312 added; six corrections applied verbatim to
  `GATE05M_C2_RESTRICTED_CREEP.md`:** APPS preconditions "within their approved
  operating windows", not "completely valid" (RC-307); phase-current response
  judged against the supplier tracking envelope with expected latency included
  (RC-308); architecture-dependent E-stop, not universal contactor interruption
  (RC-309); Neutral defined by zero propulsion torque, not a universal switching
  ban (RC-310); C2B rollback abort rule — latch `FAIL`/`NEEDS_REVIEW`, no
  automatic second attempt (RC-311); brake-hold "approved test torque profile",
  not "full torque application" (RC-312).
- Status: 05M-C2A upgrades to `FORMAL_ENGINEERING_REVIEW_REQUIRED` and adds
  `DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED / CAN_1_ELECTRICALLY_PASSIVE_ONLY /
  PROCEDURE_APPROVAL_REQUIRED / EXECUTION_NOT_YET_PROVEN /
  RESULT_SIGNOFF_NOT_YET_ELIGIBLE`; 05M-C2B adds `ROLLBACK_ABORT_RULE_REQUIRED /
  PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED`. Post-edit label:
  `GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
  procedure is ready to be reviewed and controlled, not physical-pass evidence.
- RH01 section 75; D-008 amended (review_64); RESEARCH_MAP + GATE_RESEARCH_QUEUE
  updated; handoff rotated. Next = Gate 05M-C3 (speed/ramp under engineering
  manual + proof artifacts only). Nothing Confirmed; no normal driving; no
  public road; ODRs untouched.

## 2026-07-16 — RH batch 66 ("64:75") + review_63: Gate 05M-C2A/05M-C2B baseline-candidate + 10 record-integrity/measurement-authority corrections

- Archived batch_66 (Gate 05M-C2A/05M-C2B baseline-candidate re-emit) and
  review_63 1:1 (commit `30ee754`); PROVENANCE row inserted newest-first. Owner:
  "this is essentially at baseline-candidate quality now … the actual gate logic
  is no longer the main weakness."
- **RC-297..306 added; ten corrections applied verbatim to
  `GATE05M_C2_RESTRICTED_CREEP.md`:** bounded/supplier-supported/simulation
  fault injection (RC-297); brake+steering assist as a pre-movement HARD
  interlock + monitored, and the block itself tested (RC-298/306); four-field
  approval record — `Required Approver` / `Procedure Approval Status` /
  `Execution Status` / `Result Signoff Status`, a GLOBAL rule, no `SIGNED_PASS`
  until `EXECUTED` (RC-299); expanded Numeric Threshold Authority linkage
  (RC-300); software "Restricted Creep Torque Clamp" not "hard/absolute clamp"
  (RC-301); dual-channel APPS plausibility (RC-302); torque-rate ≠
  current-response validation (RC-303); electrical CAN_1 passivity (RC-304); C2B
  Rollback Containment Rule + hill-hold ≠ parking-hold (RC-305).
- Status: 05M-C2A adds `BASELINE_CANDIDATE / PROCEDURE_REVIEW_REQUIRED /
  BRAKE_ASSIST_INTERLOCK_REQUIRED / STEERING_ASSIST_INTERLOCK_REQUIRED /
  NUMERIC_LIMITS_INITIAL_TARGET_PROFILE / CONTROLLED_FAULT_INJECTION_ONLY /
  NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`; 05M-C2B adds
  `UNLOCKS_ONLY_AFTER_C2A_SIGNED_PASS / ROLLBACK_CONTAINMENT_PLAN_REQUIRED /
  SECONDARY_RESTRAINT_REQUIRED / TEMPORARY_HILL_HOLD_ONLY /
  PARKING_HOLD_AUTHORITY_NOT_GRANTED`. Post-edit label:
  `GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — a procedure
  baseline, not physical-pass evidence.
- RH01 section 74; D-008 amended (review_63); RESEARCH_MAP + GATE_RESEARCH_QUEUE
  updated; handoff rotated. Next = Gate 05M-C3 (speed/ramp under engineering
  manual + proof artifacts only, RC-291/293/300). Nothing Confirmed; no normal
  driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 65 ("63:75") + review_62: Gate 05M-C2A/05M-C2B convergence re-emit (corrections 3/4/5 applied, no new corrections)

- Archived batch_65 (Gate 05M-C2A/05M-C2B re-emit) and review_62 1:1 (commit
  `ca512b0`); PROVENANCE row inserted newest-first. Owner: "Gate 05M-C2A / C2B
  is clean enough to baseline, and the next gate should be 05M-C3."
- **Convergence — no new RC rows, no deliverable changes.** The Hunter applied
  review_61 corrections 3/4/5, already applied to
  `GATE05M_C2_RESTRICTED_CREEP.md` in batch 64: breakaway is an empirical
  baseline → MECHANICAL_BINDING_CHECK not auto-fail (RC-294); measurable
  creep-speed/torque/runout + pressure/voltage/response thresholds replace
  "absolute control"/"completely active" (RC-295); static brake-hold
  displacement threshold (RC-296).
- **Residual (recorded, not re-registered):** the Hunter's Authority Status
  column still reads "Approved by <role>" — the RC-292 Required-Approver
  correction is not applied in the draft, and the draft has no explicit Numeric
  Threshold Authority Rule (RC-293); the deliverable already carries both and is
  ahead of the draft. RH01 section 73 records the convergence + residual with no
  register inflation.
- Next = Gate 05M-C3 (speed/ramp `INITIAL_TARGET_PROFILE` only, RC-291/293).
  Nothing Confirmed; no normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 64 ("62:75") + review_61: Gate 05M-C1/05M-C2A/05M-C2B corrected re-emit + 5 pre-baseline cleanups

- Archived batch_64 (Gate 05M-C1 + newly-split 05M-C2A/05M-C2B, now applying
  all eight previously-corrected fixes) and review_61 1:1 (commit `a1bb83e`);
  PROVENANCE row inserted newest-first. Owner: "this is much better … you
  applied the big safety fixes correctly."
- **Regression cleared:** after three batches (§§70–71: 3× RC-279
  safety-critical + two full-draft 05M-C2 regressions), the Hunter finally
  applied the hand-lock removal, `dT_command/dt`, zero-torque threshold,
  response-window E-stop/neutral, diagnostic-review fault latch, rollback split
  (05M-C2B), the Proof/Authority/Build-Engine-Status columns, and no
  auto-15-km/h.
- **RC-292..296 added; five corrections applied verbatim to
  `GATE05M_C2_RESTRICTED_CREEP.md`:** Authority Status names a `Required
  Approver` with `SIGNOFF_REQUIRED / NOT_EXECUTED` + `PENDING_EXECUTION`, never
  "Approved by" (RC-292); Numeric Threshold Authority Rule over 05M-C2A/C2B
  (RC-293); 15–25 Nm breakaway is an expected range, not a pass envelope →
  out-of-range NEEDS_REVIEW, not auto-fail (RC-294); measurable thresholds
  replace "absolute control"/"completely active" (RC-295); static brake-hold
  displacement threshold, not "completely hold static" (RC-296). Status adds
  `REQUIRED_APPROVERS_DEFINED` + `PROOF_ARTIFACTS_DEFINED`; 05M-C2B status =
  `PROVISIONAL_LOCKED / UNLOCKS_ONLY_AFTER_05M_C2A_SIGNOFF / …`.
- RH01 section 72; D-008 amended (review_61); handoff rotated. Next = Gate
  05M-C3 (speed/ramp `INITIAL_TARGET_PROFILE` only, RC-291/293). Nothing
  Confirmed; no normal driving; no public road; ODRs untouched.

## 2026-07-16 — RH batch 63 ("61:75") + review_60: Gate 05M-C1/05M-C2 re-emit (continued regression, no new corrections)

- Archived batch_63 (Gate 05M-C1 + 05M-C2 re-emit) and review_60 1:1 (commit
  `54625c0`). **No new RC rows, no new deliverable, no deliverable changes** —
  RH01 section 71 records the recurrence only. Owner: "the direction is right,
  but this draft did not fully apply the last cleanup yet."
- **Continued regression:** the Hunter re-emitted both gates and **still carries
  the previously-corrected defects** — 05M-C1-005 "hand-lock one lifted wheel"
  (RC-279 — SAFETY-CRITICAL, third recurrence), `dQ/dt` (RC-284), "absolute
  0 Nm" (RC-288), "immediate stop" (RC-288), "immediately revoke" (RC-288),
  "hard reset" recovery (RC-290), rollback in the first gate (RC-286), missing
  evidence columns (RC-289), auto "15 km/h" in the 05M-C3 preview (RC-291). The
  owner re-issued the identical eight corrections — all already applied. The
  deliverables `GATE05M_C1_*` + `GATE05M_C2_*` did NOT regress.
- No register inflation: adding duplicate RC rows for already-recorded
  corrections would violate register integrity, so the recurrence is tracked
  in PROVENANCE + RH01 section 71 against the existing
  RC-279/282/283/284/286/288/289/290/291. This is the strongest standing M10
  regression-scanner case (three RC-279 recurrences + two consecutive
  full-draft 05M-C2 regressions).
- RESEARCH_MAP + GATE_RESEARCH_QUEUE next remains → **Gate 05M-C3** (Controlled
  Closed-Area Low-Speed Movement; 15 km/h INITIAL_TARGET_PROFILE, no
  auto-unlock). Nothing Confirmed; no normal driving; no public road; no
  customer operation; never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 62 ("60:60") + review_59: Gate 05M-C2 re-emit (full-draft regression) + 3 new cleanups

- Archived batch_62 (Gate 05M-C2 re-emit) and review_59 1:1 (commit
  `0e5b555`). New rows RC-289..291 (no new CS). Section 70. **No new deliverable
  — cleanups to `docs/status/GATE05M_C2_RESTRICTED_CREEP.md`.** Owner: "Gate
  05M-C2 is the right next gate … strong … but it still has a few cleanup items
  before it becomes baseline."
- **FULL-DRAFT REGRESSION — strongest M10 regression-scanner case:** the Hunter
  re-answered the Gate 05M-C2 question with a draft that **lost every review_58
  correction at once** — low-friction surface (RC-283), `dQ/dt` (RC-284),
  "absolute 0 Nm" + "immediate stop" (RC-288), rollback in the first gate
  (RC-286), and the 05M-C1 "hand-lock one lifted wheel" line (RC-279 —
  SAFETY-CRITICAL). The owner re-issued every correction. The `GATE05M_C2_*` +
  `GATE05M_C1_*` deliverables already held the corrected wording and did NOT
  regress.
- **New owner corrections (RC-289..291):**
  - RC-289 — the 05M-C2 matrix carries Proof Artifact + Authority Status +
    Build Engine Status columns (same evidence structure as earlier gates).
  - RC-290 — a failed-creep / motion-related fault stays blocked until
    diagnostic review + fault-source correction + approved service clear +
    engineering/test-lead authorization; a hard reset alone does not clear it.
  - RC-291 — Gate 05M-C2 completion does NOT automatically "unlock 15 km/h";
    it permits engineering review for 05M-C3 only, and any speed ceiling stays
    INITIAL_TARGET_PROFILE until engineering-approved.
- Gate 05M-C2 status adds `CAN_1_PASSIVE_ONLY` + `FAULT_LATCH_REQUIRED`.
  **D-008 amended.** RESEARCH_MAP + GATE_RESEARCH_QUEUE next remains → **Gate
  05M-C3** (Controlled Closed-Area Low-Speed Movement). Nothing Confirmed; no
  normal driving; no public road; no customer operation; never "certified safe"
  (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 61 ("59A") + review_58: Gate 05M-C1 re-emit + Gate 05M-C2 Restricted Creep Torque Validation

- Archived batch_61 (Gate 05M-C1 re-emit + Gate 05M-C2) and review_58 1:1
  (commit `54aa6d8`). New rows RC-284..288 (no new CS). Section 69. New
  deliverable `docs/status/GATE05M_C2_RESTRICTED_CREEP.md` — the **first powered
  ground-contact movement gate** (tires touch the ground under live traction),
  **split 05M-C2A (Flat-Ground Restricted Creep, 12-row matrix) / 05M-C2B
  (Controlled Incline / Rollback Hold) / 05M-C2C (Faulted Creep Recovery)**.
  Owner: "yes, proceed with Gate 05M-C2 — but this draft needs a few important
  corrections … this is now the first powered ground-contact movement gate."
- **CRITICAL regression:** the Hunter re-emitted the 05M-C1-005 "hand-lock one
  lifted wheel" line — the exact SAFETY-CRITICAL instruction rejected in
  review_57 (RC-279); the `GATE05M_C1_*` deliverable already holds the corrected
  rated-fixture wording and did NOT regress. The low-friction-surface default
  (RC-283) also re-appeared in the 05M-C2 body.
- **Owner corrections (RC-284..288):**
  - RC-284 — torque ramp rate is `dT_command/dt`, not `dQ/dt`; the limiter acts
    on VCU torque output, not raw pedal slope.
  - RC-285 — the Ground Movement Precondition: no creep torque unless
    brake/brake-assist/steering-assist verified, E-stop armed + remote active,
    spotters + runout clear, clamp + ramp active, engineer/test-lead explicit
    start authorization.
  - RC-286 — split 05M-C2 into 05M-C2A/B/C; rollback/incline deferred out of the
    first ground-contact gate.
  - RC-287 — breakaway torque above the clamp → NEEDS_REVIEW /
    MECHANICAL_BINDING_CHECK, not an automatic "binding" diagnosis.
  - RC-288 — no "absolute 0 Nm"/"instantly" wording; supplier zero-torque
    threshold + response window.
  - Numeric Threshold Authority Rule (RC-267) + predictable-traction surface
    (RC-283) applied.
- Gate 05M-C2 status `FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE /
  GROUND_CONTACT_PRESENT / RESTRICTED_CREEP_ONLY / PREDICTABLE_TRACTION_SURFACE_REQUIRED
  / BRAKE_ASSIST_VERIFICATION_REQUIRED / STEERING_ASSIST_VERIFICATION_REQUIRED /
  … / NO_NORMAL_DRIVING_AUTHORITY`; permits **Gate 05M-C3 only** (after
  05M-C2A/B/C). **D-008 amended.** RESEARCH_MAP + GATE_RESEARCH_QUEUE next →
  **Gate 05M-C3** (Controlled Closed-Area Low-Speed Movement). Nothing
  Confirmed; no normal driving; no public road; no customer operation; never
  "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 60 + review_57: Gate 05M-B cleanup + Gate 05M-C1 Coupled Driveline / Lifted-Wheel Readiness

- Archived batch_60 (Gate 05M-B cleanup + Gate 05M-C1 + Gate 05M-C2 preview)
  and review_57 1:1 (commit `ad3f489`). New rows RC-279..283 (no new CS).
  Section 68. New deliverable `docs/status/GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md`
  — the first coupled test: the traction motor coupled to gearbox/half-shafts/
  hubs/wheels but the **driven axle lifted + locked, zero ground contact**;
  5-row matrix (05M-C1-001..005). `GATE05M_B` status label. Owner: "a strong
  next stage … the right risk progression: 05M-B uncoupled → 05M-C1 coupled but
  wheels lifted → 05M-C2 first restricted ground creep."
- The Hunter realized RC-276 (05M-B-005 coasting-not-failure) but re-emitted
  the 05M-B over-speed live-limit-edit wording (RC-277 recurrence); the
  `GATE05M_B` deliverable already held the corrected supplier-supported wording.
- **Owner safety corrections (RC-279..283):**
  - RC-279 (SAFETY-CRITICAL) — "hand-lock one lifted wheel" is forbidden; use a
    rated mechanical wheel restraint / differential / hub-locking fixture only;
    no hands near rotating wheels/shafts/hubs/belts/couplers, ever.
  - RC-280 — the Lifted Chassis Safety Rule: rated chassis lift or rated
    heavy-duty stands approved for the GVWR/axle load; secured against roll;
    suspension droop accounted for; guarded rotation zones; no personnel
    inline; no one under the vehicle during energized rotation tests.
  - RC-281 — 05M-C1 brake override within the approved response window, not
    "instantly."
  - RC-282 — wheel-speed data is read-only / verification only; factory ABS/ESC
    never becomes traction-control authority without Ford-authorized docs +
    engineering review (extends CAN_1 listen-only RC-172/230).
  - RC-283 — Gate 05M-C2 (first ground contact) uses a flat, controlled, closed
    surface with predictable traction, runout, chocks/barriers, spotters
    outside the path, and a remote E-stop — never a default low-friction
    surface.
  - Numeric Threshold Authority Rule (RC-267) applied to 05M-B/05M-C1.
- Corrected status labels applied to 05M-B
  (`NO_LOAD_MOTOR_SPIN_VALIDATION_DEFINED …`) and 05M-C1
  (`COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED / RATED_LIFT_OR_STANDS_REQUIRED
  / NO_GROUND_CONTACT …`). **D-008 amended.** RESEARCH_MAP + GATE_RESEARCH_QUEUE
  next → **Gate 05M-C2** (Restricted Creep Torque Validation). Nothing
  Confirmed; no ground contact; no open-floor movement; never "certified safe"
  (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 59 + review_56: Gate 05L-B/05L-C/05M-A/05M-B cleanups + Gate 05M-C split

- Archived batch_59 (Gate 05L-B/05L-C/05M-A/05M-B cleanups + Gate 05M-C
  preview) and review_56 1:1 (commit `a3bdcd0`). New rows RC-273..278 (no new
  CS). Section 67. **No new deliverable** — cleanups to `GATE05L_B/05L_C/05M_A/
  05M_B` + the split of Gate 05M-C into 05M-C1/C2/C3. Owner: "very strong … the
  architecture is now in the right order … a solid baseline path."
- The Hunter realized RC-268 (05L-C supplier shutdown + feedback-mismatch),
  RC-269 (05L-B pre-charge envelope), RC-270 (05M-A supplier tolerances), and
  RC-272 (05M-B guarded/uncoupled boundary), and added four amendment rules.
  **Regression watch — "Ready-to-Drive" re-emitted (RC-271→275)**, joining the
  05L-C shutdown-order (3×) and RC-curve (2×) recurrences.
- **Owner corrections (RC-273..278):**
  - Global **Numeric Threshold Authority Rule** (RC-267 formalized): all
    05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE; no gate
    authority until tied to supplier docs + engineering review + calibrated
    measurement method + raw proof + signed approval.
  - RC-273 — 05L-B-005 no "absolute 0.0 V"/"immediately"; supplier OFF state
    below the approved off-state leakage threshold.
  - RC-274 — 05L-C-004 no "immediate"; isolation shutdown within the
    supplier-defined IMD/BMS/PDU response window.
  - RC-275 — 05M-A "Ready-to-Drive" recurrence (RC-271); supplier-defined
    ready/torque-disabled state.
  - RC-276 — 05M-B watchdog: coasting is not the failure; continuing to be
    powered is.
  - RC-277 — 05M-B over-speed via a supplier-supported test mode / pre-approved
    calibration profile; no live safety-limit edit during rotation.
  - RC-278 — Gate 05M-C split: 05M-C1 (coupled driveline static / lifted-wheel
    readiness) → 05M-C2 (restricted creep) → 05M-C3 (controlled closed-area
    low-speed movement); the first coupled test proves coupling/backlash/
    wheel-speed/brake-override/torque-clamp with wheels lifted before any
    open-floor movement.
- Corrected status labels applied to 05L-B
  (`CONTROLLED_HV_PRECHARGE_OBSERVATION_READY / SUPPLIER_LIMITS_REQUIRED …`),
  05L-C (`HV_SHUTDOWN_DISCHARGE_REPEATABILITY_READY …`), 05M-A
  (`INVERTER_READY_ZERO_TORQUE_VALIDATION_READY / TORQUE_DISABLED_STATE_ONLY …`),
  05M-B (`NO_LOAD_MOTOR_SPIN_READY_FOR_DETAILING …`). **D-008 amended.**
  RESEARCH_MAP + GATE_RESEARCH_QUEUE next → **Gate 05M-C1** (Coupled Driveline
  Static / Lifted-Wheel Readiness). Nothing Confirmed; no wheel torque path; no
  vehicle movement; never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 58 + review_55: Gate 05L-B/05L-C/05M-A cleanups + Gate 05M-B No-Load Motor Spin

- Archived batch_58 (Gate 05L-B/05L-C/05M-A cleanups + Gate 05M-B) and
  review_55 1:1 (commit `2fec1bc`). New rows RC-267..272 (no new CS). Section
  66. New deliverable `docs/status/GATE05M_B_NO_LOAD_MOTOR_SPIN.md` — the first
  physical rotation of the traction motor, **shaft uncoupled from the
  drivetrain**; 5-row matrix (05M-B-001..005). `GATE05M_A_*` RC-270/271
  wording; status-label updates on `GATE05L_B/05L_C`. Owner: "very strong now …
  the correct order … the only things I'd fix before baselining."
- The Hunter realized RC-262 (05L-B-007 E-stop failure conditions), RC-264
  (05L-C-004 rated IMD fixture), RC-265 (05M-A torque-disabled constraints).
  **Regression watch — the 05L-C shutdown-order rule re-emitted a THIRD time
  (RC-257→263→268) and the perfect RC curve a SECOND time (RC-261→269);** the
  `GATE05L_B/05L_C` deliverables already held the corrected wording (strongest
  M10 regression-scanner cases).
- **Owner corrections (RC-267..272):**
  - RC-267 — global target-profile rule for 05L-B/05L-C/05M-A/05M-B
    (nineteenth artifact): all numbers are INITIAL_TARGET_PROFILE; no threshold
    creates gate authority until tied to supplier docs + engineering review +
    test-instrument method + raw proof artifact + signed approval.
  - RC-268 — 05L-C shutdown order still supplier-specific (third recurrence); +
    the command↔aux-contact feedback-mismatch block.
  - RC-269 — 05L-B RC curve is a comparison model only (second recurrence);
    supplier-approved pre-charge envelope.
  - RC-270 — 05M-A tolerance wording (supplier zero-current threshold +
    resolver noise-drift tolerance), not perfect zero.
  - RC-271 — 05M-A must not say "Ready-to-Drive"; supplier-defined
    ready/torque-disabled state, driver torque authority masked.
  - RC-272 — 05M-B stronger physical boundary: guarded shaft, no driveline
    attachment, no wheel torque path, no vehicle-movement path, E-stop +
    exclusion zone active, supplier-defined spin profile only, no cabin pedal
    authority; ≤2% torque / 500 RPM are initial targets pending supplier
    approval.
- Corrected status labels applied to 05L-B
  (`CONTROLLED_HV_PRECHARGE_OBSERVATION_READY_WITH_SUPPLIER_LIMITS_PENDING …`),
  05L-C (`HV_SHUTDOWN_DISCHARGE_REPEATABILITY_DEFINED …`), 05M-A
  (`INVERTER_READY_ZERO_TORQUE_VALIDATION_DEFINED …`), 05M-B
  (`NO_LOAD_MOTOR_SPIN_DRAFTED …`). **D-008 amended.** RESEARCH_MAP +
  GATE_RESEARCH_QUEUE next → **Gate 05M-C** (Controlled Low-Speed Traction
  Readiness). Nothing Confirmed; no wheel torque path; no vehicle movement;
  never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 57 + review_54: Gate 05L-B/05L-C cleanups + Gate 05M-A Inverter Enable / Zero-Torque

- Archived batch_57 (Gate 05L-B/05L-C cleanups + Gate 05M-A) and review_54 1:1
  (commit `030a360`). New rows RC-260..266 (no new CS). Section 65. New
  deliverable `docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` — the
  boundary between static HV distribution and dynamic inverter drive: HV bus
  live, inverter gating locked, **readiness NOT spin** (no intentional motor
  rotation, no vehicle movement, no driver torque authority); 5-row matrix
  (05M-A-001..005). `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` RC-261/262
  wording. Owner: "the best version so far … the correct chain: 05L-A → 05L-B
  → 05L-C → 05M-A → 05M-B."
- The Hunter realized three 05L-B cleanups (V_caps not 0.0 V RC-253, corrected
  timeout RC-254, dropout measured RC-255) and the weld FP/FN split (RC-258).
  **Regression watch — RC-263/264:** it re-emitted the 05L-C shutdown-order
  (RC-257) and IMD-fixture (RC-256) wording UNFIXED; the `GATE05L_C_*`
  deliverable already held the corrected wording from batch_56 — recorded as
  the two strongest M10 regression-scanner cases in the HV series.
- **Owner corrections (RC-260..266):**
  - RC-260 — all 05L-B/05L-C/05M-A numbers are target profiles (eighteenth
    artifact; adds 50 ms watchdog, 0 A phase current, 0% PWM, zero resolver
    drift): final limits require SUPPLIER_DATA + ENGINEERING_REVIEW +
    LIVE_HV_TEST_PLAN_APPROVAL + BENCH/CHASSIS PROOF.
  - RC-261 — pre-charge RC-curve wording too perfect → supplier-approved
    pre-charge envelope; RC curve is a first-order comparison model only.
  - RC-262 — 05L-B-007 E-stop failure wording explicit: no automatic retry
    after E-stop ever; coil supply must not remain energised.
  - RC-263 — 05L-C-001 shutdown order still supplier-specific (RC-257
    recurrence).
  - RC-264 — 05L-C IMD fault injection still needs approved-fixture wording
    (RC-256 recurrence); no ad-hoc resistor on a live rail.
  - RC-265 — 05M-A must not assume 0% PWM / enable real switching; validates
    the supplier-defined inverter ready/torque-disabled state; no power-stage
    switching unless the supplier defines it safe + engineering approves.
  - RC-266 — 05M-A is readiness, not spin; do not jump to 05M-B until 05M-A is
    proven.
- Gate 05M-A status `DRAFT_CREATED / LIVE_HV_PRESENT /
  INVERTER_READY_STATE_UNDER_TEST / TORQUE_DISABLED_STATE_REQUIRED / …`;
  permits **Gate 05M-B only**. **D-008 amended.** RESEARCH_MAP +
  GATE_RESEARCH_QUEUE next → **Gate 05M-B** (No-Load Motor Spin Validation).
  Nothing Confirmed; no motor spin; never "certified safe" (RC-224); ODRs
  untouched.

## 2026-07-16 — RH batch 56 + review_53: Gate 05L-B ownership realization + Gate 05L-C Shutdown/Discharge/Repeatability

- Archived batch_56 (Gate 05L-B ownership/current-limit + Gate 05L-C) and
  review_53 1:1 (commit `4a6e9ee`). New rows RC-252..259 (no new CS). Section
  64. New deliverable `docs/status/GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` —
  repeat-cycle stability + off-nominal fault handling of the HV sequencing loop
  (live-HV, **zero motor RPM, no inverter switching**); 6-row matrix
  (05L-C-001..004, 005A/005B). `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md`
  ownership realized + cleanups. Owner: "a big improvement … you corrected the
  ownership problem, fixed the jump from 05L-B to 05L-C."
- **Gate 05L-B ownership realized:** VCU = Requester/Monitor only; **BMS/PDU
  owns the contactor + pre-charge execution state machines**; the hardwired
  safety loop owns the emergency-interruption path (RC-247). Current-limit
  prerequisites formally declared (R_pre, E_pulse, C_link, V_batt_max, I_peak,
  thermal-recovery interval, retry ≤2) — gate blocked until engineering-approved
  (RC-248). Status → `DRAFT_READY_WITH_REVISIONS`.
- **Owner corrections (RC-252..259):**
  - RC-252 — 05L-B/05L-C numbers (≤50 ms, ΔV ≤5%, ≥95%, ≤500 ms, >60 V, ≤20 ms
    E-stop, ≤2 retry, 10 cycles) are target profiles only (seventeenth artifact
    of the invented-values family): INITIAL_TARGET_PROFILE / SUPPLIER_DATA_
    REQUIRED / ENGINEERING_REVIEW_REQUIRED / LIVE_HV_AUTHORITY_PENDING.
  - RC-253 — 05L-B-001 must not require V_caps = 0.0 V → "no unintended DC-link
    rise beyond the approved leakage/noise threshold; match supplier topology."
  - RC-254 — 05L-B-004 timeout wording was backwards (a timeout = elapsed
    exceeds the limit); corrected to fail-to-reach-threshold-before-expiry →
    abort/open/log/block.
  - RC-255 — E-stop must not say "instantly"; measured dropout vs the
    supplier-approved target, no auto retry.
  - RC-256 — 05L-C IMD fault injection only via an approved, rated,
    current-limited HV isolation-test fixture / IMD supplier method; manual
    ad-hoc resistance insertion onto live HV rails is forbidden (NHTSA).
  - RC-257 — 05L-C-001 shutdown order is supplier-specific (not universal
    main-positive-first); blocked if it creates DC-link persistence / an unsafe
    energized path.
  - RC-258 — 05L-C-005 weld test split into 005A false-positive (bounce must
    not falsely trigger) + 005B false-negative (simulated weld always detected,
    blocks re-energization).
  - RC-259 — the 05M traction phase is staged: 05M-A (inverter enable /
    zero-torque) → 05M-B (no-load spin) → 05M-C (low-speed traction); the first
    05M gate proves inverter enable with ZERO torque + ZERO rotation, not
    "low-speed traction."
- Gate 05L-C status `SHUTDOWN_REPEATABILITY_MATRIX_CREATED / LIVE_HV_PRESENT /
  ZERO_MOTOR_RPM / …`; permits **Gate 05M-A only**. **D-008 amended** (ladder:
  05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A → 05M-B → 05M-C). RESEARCH_MAP +
  GATE_RESEARCH_QUEUE next → **Gate 05M-A**. Nothing Confirmed; no motor spin;
  never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 55 + review_52: Gate 05L-B Controlled HV First-Energization / Current-Limited Pre-Charge Observation

- Archived batch_55 (Gate 05L-B) and review_52 1:1 (commit `6a4c351`). New
  rows RC-245..251 (no new CS). Section 63. New deliverable
  `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` — **the first gate with LIVE
  HV PRESENT**, purely observational (first LOTO-pin removal + MSD connect +
  current-limited pre-charge closure; **no inverter switching, zero motor RPM,
  no vehicle movement**), attempted only after a signed Gate 05L-A
  authorization. 7-row matrix (05L-B-001..007) + exit criteria. Owner: "the
  right next direction, but too aggressive in a few spots … do not proceed to
  05M yet."
- The 05L-A cleanups were re-emitted and realized: the stored-energy discharge
  mandate (RC-242) and the IMD isolation-resistance disambiguation (RC-243) —
  with candidate final insulation thresholds (100 Ω/V or 500 Ω/V) recorded as
  pending (RC-251).
- **Owner corrections (RC-245..251):**
  - RC-245 — 05L-B thresholds (≥95% pre-charge, ≤500 ms timeout, ≤50 ms
    feedback, ≤60 V discharge, ≤5% ΔV) are initial bench targets only →
    supplier-defined completion threshold + timeout; SUPPLIER_DATA_PENDING /
    ENGINEERING_REVIEW_REQUIRED (sixteenth artifact of the invented-values
    family).
  - RC-246 — contactor sequence is supplier-specific (negative-first /
    positive-first / pre-charge-first / integrated BDU-PDU), not universal;
    final needs the supplier wiring diagram + controls-engineer approval.
  - RC-247 — the VCU does not own contactor/pre-charge closure unless the
    supplier architecture assigns it: VCU = REQUESTER/MONITOR, BMS/PDU likely
    owns execution, the hardwired loop owns emergency interruption; each test
    split request/owner/feedback/response/abort.
  - RC-248 — "current-limited" needs a real current-limit definition
    (SUPPLIER_DEFINED/ENGINEERING_APPROVED: resistor R, pulse energy, DC-link
    C, pack max V, peak pre-charge current, thermal-recovery interval, retry
    limit); 05L-B blocked without them.
  - RC-249 — added the manual E-stop abort row (05L-B-007): hardwired loop
    interrupts, VCU logs if powered, BMS/PDU → safe state, no auto retry; the
    first live-HV gate must prove the human abort path.
  - RC-250 — do not jump to Gate 05M; insert Gate 05L-C (Controlled HV
    Shutdown, Discharge, and Re-Energization Repeatability); inverter/spin only
    after 05L-C.
  - RC-251 — IMD insulation thresholds (candidate 100/500 Ω/V) pending the IMD
    supplier manual + system voltage + engineering review + FMVSS 305/ISO
    6469-3 mapping.
- Gate 05L-B status `DRAFT_CREATED / LIVE_HV_PRESENT / … /
  VCU_AUTHORITY_REQUESTER_ONLY_UNLESS_DOCUMENTED / NO_INVERTER_SWITCHING /
  ZERO_MOTOR_RPM / …`; permits **Gate 05L-C only**. **D-008 amended** (ladder:
  05J → 05K → 05L-A → 05L-B → 05L-C → (later) 05M). RESEARCH_MAP +
  GATE_RESEARCH_QUEUE next → **Gate 05L-C**. Nothing Confirmed; no motor spin;
  never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 54 + review_51: Gate 05L-A HV First-Energization Authorization & Safety Readiness

- Archived batch_54 (Gate 05L-A HV authorization) and review_51 1:1 (commit
  `80f4680`). New rows RC-238..244 (no new CS). Section 62. New deliverable
  `docs/status/GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` — **the first gate
  that contemplates live HV, a strict pre-energization authorization gate; NO
  HV energization** (7-row matrix 05L-A-001..007 + 12-item hard-stop list +
  exit criteria). Owner: "the right move … a strong safety-readiness gate …
  keep 05L-A as authorization only. It does not energize."
- **Permanent rule (owner):** *no high-voltage potential may be introduced to
  the vehicle chassis until every line item is physically verified, signed
  off, and archived.*
- **Owner safety corrections (RC-238..244, grounded in OSHA electrical
  work-practice/LOTO + NHTSA EV HV-hazard guidance — NeedsExactSource):**
  - RC-238 — "certified HV technicians" → "qualified / authorized HV
    personnel" with role evidence (documented HV training, task authorization,
    equipment-specific training, emergency-response briefing, assigned lead +
    safety observer).
  - RC-239 — PPE/tools/meters are voltage-matched, not universal Class 0; the
    gate blocks if the system exceeds the glove/tool rating.
  - RC-240 — fire/emergency response assets are AHJ/facility-safety-officer/
    fire-marshal-selected per battery chemistry/pack/config/supplier ERG (not
    simply "Class D"); fire watch adds shutoff plan, evacuation route,
    upwind/uphill staging, 911 protocol, supplier ERG, re-ignition monitoring.
  - RC-241 — Live-Dead-Live uses an approved proving source appropriate to
    meter function/range (not just a 12 V source); "0.0 V exactly" → "below
    the approved AVV threshold, meter resolution/noise considered"; the >0.5 V
    abort is INITIAL_AVV_ABORT_TARGET (fifteenth artifact of the
    invented-values family).
  - RC-242 — stored-energy discharge-wait rule: after any HV exposure or
    failed energization attempt, wait the supplier-defined discharge interval
    and re-verify with Live-Dead-Live (DC-link caps stay charged after
    isolation).
  - RC-243 — IMD isolation status is "within the supplier-defined acceptable
    range," not "nominal high insulation"; final thresholds pending supplier
    manual + system voltage + engineering review + standard mapping.
  - RC-244 — the pre-charge loop test in 05L-A is low-voltage logic/coil
    verification only; no HV bus charging, no DC-link rise, no live pre-charge
    event.
- Gate 05L-A status `HV_AUTHORIZATION_GATE_CREATED / NO_HV_ENERGIZATION / …`.
  **D-008 amended** (Gate 05L splits: 05L-A authorization → 05L-B
  energization). RESEARCH_MAP + GATE_RESEARCH_QUEUE next → **Gate 05L-B**
  (Controlled HV First-Energization / Current-Limited Pre-Charge Observation —
  supplier-defined pre-charge target/timeout, current-limited, remote
  observation; no vehicle movement / wheels-on-ground drive / road test /
  traction command / customer operation). Nothing Confirmed; no HV energized;
  never "certified safe" (RC-224); ODRs untouched.

## 2026-07-16 — RH batch 53 + review_50: Gate 05J cleanups + Gate 05K Low-Voltage Vehicle Power-On (No-HV)

- Archived batch_53 (Gate 05J cleanups + Gate 05K power-on) and review_50 1:1
  (commit `465e2ad`). New rows RC-233..237 (no new CS). Section 61. New
  deliverable `docs/status/GATE05K_VEHICLE_POWER_ON.md` — the second rung of
  the D-008 ladder and the first formal LV vehicle power-on gate (9-test
  matrix 05K-001..009, HV under LOTO). `docs/status/GATE05J_VEHICLE_FITMENT.md`
  cleanups applied. Owner: "a strong Gate 05J → 05K transition … fitment
  first, low-voltage vehicle power-on second, HV later."
- **Gate 05K** built from the owner-preferred 9-test version (ignition-off
  quiescent draw, accessory transition, key-on/run wake, CAN_1 passive
  monitoring, isolated CAN_2/CAN_3 comms, UDS session access, HV lockout
  enforcement, Ford system error immunity, in-chassis fault-latch survival
  across a power cycle), CAN_1 strictly listen-only (register + TXD proof).
- **Owner corrections (RC-233..237, no new CS):**
  - RC-233 — two Gate 05K sections delivered; keep the cleaner 9-test second
    version, the 5-test first version is archived-superseded (raw only).
  - RC-234 — 05J-003 parasitic-draw row still read "Total sleep current draw
    ≤4.0 mA" → conversion_added ≤4.0 mA + OEM_baseline + total_vehicle
    measured/logged separately (recurrence of RC-231).
  - RC-235 — 05J/05K hard numbers still target profiles (fourteenth artifact
    of the invented-values family): 50/100 mm, <0.1 Ω, ≤4.0 mA, ≤2.0 s,
    ≤200 ms wake, ≤500 ms display, ≤50 ms UDS, ≤0.5 V drop, ≤5% APPS,
    ≤100 ms brake override → INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_
    REQUIRED / NO_HV_AUTHORITY / NO_VEHICLE_MOTION_AUTHORITY.
  - RC-236 — Gate 05K must explicitly block real HV contactor closure (coils
    disconnected / dummy loads / mechanically unable to close; drive pins held
    at 0.0 V) even with the HV battery disconnected.
  - RC-237 — Gate 05L must not open with "exact HV pre-charge timing"; it
    splits so it begins with **Gate 05L-A — HV First-Energization
    Authorization & Safety Readiness** (qualified personnel, LOTO, PPE,
    insulated tools, e-stop, exclusion zone, fire/emergency plan,
    absence-of-voltage verification, supplier docs, engineer signoff) before
    any energization sequence. Owner cited OSHA LOTO + NHTSA EV HV-hazard
    guidance (NeedsExactSource — owner-paraphrased, not archived). **Amends
    D-008.**
- Gate 05J status → `CONTROLLED_VEHICLE_FITMENT_DEFINED / … /
  CAN_1_PASSIVE_ONLY / FORD_POST_CONNECTION_SCAN_REQUIRED /
  CONVERSION_ADDED_PARASITIC_DRAW_TRACKED / …`; exit criterion 7 adds
  firmware/register dumps + reviewer signoffs. Gate 05K status
  `LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED / NO_HV_CONNECTED /
  NO_REAL_HV_CONTACTOR_CLOSURE / …`. RESEARCH_MAP + GATE_RESEARCH_QUEUE next →
  **Gate 05L-A**. Nothing Confirmed; no HV; never "certified safe" (RC-224);
  ODRs untouched.

## 2026-07-16 — RH batch 52 + review_49: Gate 05I-D (final) + Gate 05J Controlled Vehicle Fitment (No-HV)

- Archived batch_52 (Gate 05I-D finalized + Gate 05J) and review_49 1:1
  (commit `e188f68`). New rows RC-229..232 (no new CS). Section 60. New
  deliverable `docs/status/GATE05J_VEHICLE_FITMENT.md` — the first rung of the
  D-008 post-bench ladder and **the first gate where the conversion physically
  touches the vehicle** (5-row no-HV in-chassis matrix + exit criteria). Owner:
  "controlled vehicle fitment with no HV connected … make 05J clearly about
  physical fitment + passive/no-HV chassis verification, not actual vehicle
  commissioning yet."
- **Gate 05J is fitment, not commissioning (RC-229):** the Hunter's "before any
  low-voltage power-on checks are executed on-vehicle" framing conflicted with
  05J already doing parasitic draw + CAN_1 silence with ignition on →
  reworded to **"Gate 05J verifies controlled physical installation and
  passive/no-HV in-chassis checks; it does not authorize active conversion
  control, traction enable, live HV, vehicle movement, or road testing."** The
  first formal LV vehicle power-on is deferred to **Gate 05K**.
- **CAN_1 live-Ford connection precondition + passive-only (RC-230):** Gate 05J
  is the first point the VCU CAN_1 transceiver touches the **live OEM Ford
  CAN_1 network**. Permitted **only** after the Gate 05H listen-only proof +
  Gate 05I-C CAN_1 silence proof (TXD monitored, no TX mailboxes, silent
  register verified, no bench ACK). Procedure = **Ford baseline scan → connect
  VCU passive listen-only → Ford post-connection scan → compare DTCs / network
  errors / cluster warnings** (a clean cluster alone is insufficient — capture
  baseline + post scan + TXD scope + CAN analyzer log + firmware/register
  dump). Hard rule: passive listen-only only — no transmit path, no ACK, no
  active error frames, no wake commands, no spoofed Ford modules.
- **Parasitic draw separated OEM/conversion/total (RC-231):** the ≤4.0 mA is
  the **conversion-added** target, not the whole truck — measure/log
  `OEM_baseline_sleep_current` / `conversion_added_sleep_current` /
  `total_vehicle_sleep_current` separately.
- **Fitment values are target profiles + "live OEM Ford" wording (RC-232,
  thirteenth artifact of the invented-values family):** 50/100 mm clearance,
  <0.1 Ω ground bond, ≤4.0 mA, ≤2.0 s labelled `INITIAL_TARGET_PROFILE /
  ENGINEERING_REVIEW_REQUIRED / FINAL_LIMIT_PENDING / NO_HV_AUTHORITY`;
  "production-level Ford network channels" → "live OEM Ford CAN_1 network."
- Gate 05J status `CONTROLLED_VEHICLE_FITMENT_STARTED / NO_HV_CONNECTED /
  NO_TRACTION_ENABLE / NO_VEHICLE_MOTION / PASSIVE_CAN1_ONLY / …`. Exit
  criteria permit **Gate 05K only** (LV Vehicle Power-On / No-HV
  Commissioning) — no live HV, traction enable, vehicle movement, chassis
  dyno, road testing, customer operation, or compliance claims (never
  "certified safe," RC-224). Next: **Gate 05K**.

## 2026-07-16 — RH batch 51 + review_48: Gate 05I-D Integrated Fault Cascades + post-bench gate ladder (D-008)

- Archived batch_51 (Gate 05I-D) and review_48 1:1 (commit `78c98cf`). New
  rows RC-224..228 (no new CS). Decision **D-008** added. Section 59. New
  deliverable `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` (10-row
  integrated-fault-cascade matrix + exit criteria). Owner: "the correct next
  gate … testing the system as a system."
- **The critical correction — never "certified safe" (RC-224 + D-008):** the
  Hunter's exit line "the low-voltage bench assembly is certified safe for
  installation into the physical vehicle chassis" was rejected → "eligible
  for engineering review for controlled low-voltage vehicle fitment only;
  does not authorize live HV / vehicle movement / road testing / chassis-dyno
  / customer operation / factory Ford bus transmission / compliance or
  certification claims." The owner defined a **staged post-bench gate ladder
  (D-008): Gate 05J** (Controlled Vehicle Fitment / No-HV Installation
  Readiness — no HV battery, no traction enable, CAN_1 listen-only, verify
  grounds/shields/routing/no-chafing/service-access/LOTO/12 V parasitic
  draw/no Ford bus disturbance) **→ Gate 05K** (LV Vehicle Power-On / No-HV
  Commissioning) **→ Gate 05L** (Controlled HV First-Energization,
  engineer-approved only). This **redefines the old "Gate 05J = live vehicle
  commissioning" placeholder** — HV is now Gate 05L, behind two no-HV gates.
- Other corrections: test IDs 05D-### → 05I-D-### + timing labels + no
  "immediate" (RC-225, twelfth artifact of the invented-values family);
  charger-plug detect+reject not "ignore" (RC-226); E-stop hardwired loop
  owns physical interruption, VCU observes/commands/logs/latches (RC-227);
  sleep-current node (≤1.0 mA VCU) vs total-system (≤4.0 mA) consistency
  (RC-228).
- Gate 05I-D status = `INTEGRATED_FAULT_SEQUENCE_MATRIX_CREATED /
  LOW_VOLTAGE_BENCH_ONLY / REAL_VCU_DUT_REQUIRED /
  SUPPLIER_LOGIC_BOARDS_REQUIRED / CAN_1_SILENCE_REQUIRED_DURING_ALL_CASCADES
  / TIMING_TARGETS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
  NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`.
- Nothing ingested; nothing marked Confirmed; no "certified safe"/compliance
  claim; scripts are pseudocode not production code; no live HV before Gate
  05L engineer approval; ODRs untouched. Next = Gate 05J (Controlled Vehicle
  Fitment / No-HV Installation Readiness).

## 2026-07-16 — RH batch 50 + review_47: Gate 05I-C v2 (full 05I-C1 + 05I-C2)

- Archived batch_50 (Gate 05I-C v2) and review_47 1:1 (commit `fa3e411`).
  New rows RC-220..223 (no new CS). Section 58. Deliverable updated:
  `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`. Owner: "a strong Gate 05I-C
  draft … now a real bench network-integrity gate; the DBC version hash +
  TXD-pin proof are excellent."
- **review_46 fixes realized in the re-emit:** the C1/C2 split; CAN_1 TXD-pin
  ACK proof (RC-216); physical/protocol vs application-layer fault split
  (RC-217); DBC version hash stored in the Build Engine + firmware-declared +
  bench-logged, mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW (RC-218);
  per-node sleep-current targets.
- **Recurrence + new corrections:** values still act like rules (RC-220,
  eleventh artifact) — all 05I-C timings/percentages/currents →
  BENCH_TARGET_PROFILE, sleep-current list made explicit per node
  (VCU/BMS/PDU/Inverter/Display/Total_system); CAN_1 diagram
  simulated/protected only, no live Ford network (RC-221); bad CRC/bit-
  stuffing via a CAN fault-injection tool below the app layer vs app-layer
  wrong-ID/DBC/counter (RC-222); brownout NVM-save needs verified
  early-warning threshold + hold-up capacitance + write-time budget + memory
  endurance (RC-223).
- Gate 05I-C status = `NETWORK_INTEGRITY_MATRIX_CREATED /
  SLEEP_WAKE_MATRIX_CREATED / LOW_VOLTAGE_BENCH_ONLY /
  CAN_1_LISTEN_ONLY_PROOF_REQUIRED / DBC_VERSION_HASH_REQUIRED /
  APPLICATION_LAYER_VALIDATION_DEFINED / PHYSICAL_CAN_FAULT_INJECTION_DEFINED
  / SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW /
  HEARTBEAT_TIMEOUTS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
  NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`.
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; Gate 05J NOT YET; ODRs untouched. Next = Gate 05I-D
  (Low-Voltage End-to-End Bench Run / Integrated Fault Cascades, 12
  cascades).

## 2026-07-16 — RH batch 49 + review_46: Gate 05I-C full comms + sleep/wake matrix ("48:75 B follow-up")

- Archived batch_49 (Gate 05I-C full matrix) and review_46 1:1 (commit
  `bffed4d`). New rows RC-215..219 (no new CS). Section 57. Deliverable
  updated: `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`. Delivered as the
  "48:75 B follow-up" — realizes the queued 05I-C1 (Communication Network
  Integrity) + 05I-C2 (Sleep/Wake). Owner: "exactly the right next gate …
  the real hidden-failure layer."
- 8-row verification matrix (CAN_1 silent mode, bus loading & error
  integrity, DBC schema/scale mismatch, wrong-ID/corrupted-packet rejection,
  loss-of-heartbeat timeout, diagnostic/UDS sessions, sleep/wake & quiescent
  current, network-induced wakeup) + stress profiles (120 Ω 1% termination,
  twisted-shielded 110 turns/m, ≥10 m harness, 0-30/30-75/75-90% bus stress)
  + DBC version control + sleep/wake transition. Expected-Safe-Output vs
  Blocked-Outputs columns throughout.
- **Recurrence caught — invented values, tenth artifact (RC-215):** all the
  timings/percentages/currents (>15 ms, 100 ms, 50 ms, ≤2.0 s, ≤1.0 mA,
  ≤200 ms, 75-90%, 10 m, 110 turns/m, >4.5 V, >150 °C) labeled
  `BENCH_TARGET_PROFILE`; sleep current split per-node + total-system; IF
  logic made variable (`approved_latency_limit_ms` / `approved_bus_load_
  target`).
- Other corrections: CAN_1 ACK proof via the VCU TXD/transceiver path, not
  just decoded bus logs — other sim OEM nodes may ACK, the VCU must not
  (RC-216); frame-fault layering — bad CRC/DLC are controller-level,
  wrong-ID/source/DBC/counter/checksum/out-of-range are app-level (RC-217);
  DBC version hash stored in the Build Engine + declared by firmware +
  logged by the bench, mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW (RC-218);
  CAN_1 bench interface simulated OEM / protected bench only, no live Ford
  network during 05I-C (RC-219).
- Gate 05I-C status = `NETWORK_INTEGRITY_MATRIX_CREATED /
  SLEEP_WAKE_VALIDATION_INCLUDED / LOW_VOLTAGE_BENCH_ONLY /
  CAN_1_LISTEN_ONLY_PROOF_REQUIRED / DBC_VERSION_CONTROL_REQUIRED /
  HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW /
  SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW / NO_LIVE_HV /
  NO_VEHICLE_MOTION / NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`.
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; Gate 05J NOT YET; ODRs untouched. Next = Gate 05I-D
  (Low-Voltage End-to-End Bench Run / Integrated Fault Sequence).

## 2026-07-16 — RH batch 48 + review_45: Gate 05I-A (final baseline) + 05I-B (refined) + 05I-C (Comms, split C1/C2)

- Archived batch_48 and review_45 1:1 (commit `dfbf49e`). New rows
  RC-210..214 (no new CS). Section 56. Deliverables:
  `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (updated),
  `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (updated),
  `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (new). Owner: "very strong …
  Gate 05I-C is the correct next move; the table structure is now the right
  Build Engine format; the Service Clear Operational Law is excellent."
- **The good — blocked-outputs column split finally landed (RC-203/208
  realized):** 05I-A + 05I-B matrices now separate Expected Safe Output
  ("CAN_2 torque → zero") from Blocked Outputs (MUST NEVER OCCUR: non-zero
  torque post-fault, CAN_1 transmission, factory-cluster injection,
  automatic fault clear, direct contactor control by VCU).
- **Recurrences caught:** "immediate" wording still present (RC-211,
  recurrence of RC-175/198/204) → measured-within-a-configured-window; hard
  values still acting as rules (RC-212, ninth artifact of the
  invented-values family) — all 05I-A/05I-B numbers + new >75% bus
  utilization + >100 ms heartbeat → BENCH_TARGET_PROFILE / SUPPLIER_DATA_
  PENDING / ENGINEERING_REVIEW_REQUIRED; breach limits are variables.
- Other corrections: 05I-C intro "validated" → "matrices defined + bench
  evidence collected" (RC-210); DBC terminology — a DBC is a database/map,
  not a packet; reject wrong-arbitration-ID / wrong-PGN / wrong-DBC-version
  / bad-checksum / rolling-counter / out-of-range / unexpected-diagnostic-
  request (RC-213); Gate 05I-C split into 05I-C1 (Communication Network
  Integrity) + 05I-C2 (Sleep/Wake/Parasitic Drain) (RC-214).
- Status: 05I-A = `FINAL_BASELINE_MATRIX_CREATED / BENCH_EVIDENCE_PENDING`;
  05I-B = `MECHANICAL_INTERLOCK_MATRIX_CREATED / BENCH_EVIDENCE_PENDING`;
  05I-C = `STARTED / … / NETWORK_INTEGRITY_MATRIX_PENDING /
  SLEEP_WAKE_MATRIX_PENDING / … / NO_VEHICLE_CLEARANCE`. Chain: logic →
  interlocks → communications → sleep/wake → later physical bench
  integration review.
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; Gate 05J NOT YET; ODRs untouched. Next = Gate 05I-C1
  (Communication Network Integrity).

## 2026-07-16 — RH batch 47 + review_44: Gate 05I-A (revised) + Gate 05I-B Mechanical Interlocks

- Archived batch_47 (Gate 05I-A revised + Gate 05I-B) and review_44 1:1
  (commit `595bbbe`). New rows RC-208..209 (no new CS). Section 55.
  Deliverables: `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (updated) +
  `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (new). Owner: "a very
  strong 05I-A + 05I-B package … serious bench-validation structure; still
  not vehicle/HV/road-test approval."
- **05I-A review_43 fixes realized in the re-emit:** HVIL ownership (RC-205
  — VCU requests, BMS/PDU/hardwired loop owns isolation), the **Service
  Clear Operational Law** (RC-206 — UDS 0x14 clears software records only,
  six preconditions; owner: "excellent … protects against a laptop 'clear'
  becoming a fake safety reset"), and the 4-step RCA/corrective-action/
  repeat-test/engineering-signoff flow (RC-207). Gate 05I-A now adds
  `SERVICE_CLEAR_RULES_DEFINED / ROOT_CAUSE_FLOW_DEFINED`.
- **New: Gate 05I-B** — 12-row mechanical-interlock matrix (E-stop circuit,
  HVIL connectors [made-last/broken-first], service-disconnect LOTO,
  charge-port interlock, contactor-simulator coil path, safety-relay
  dropout, fuse/PDB, strain relief, connector keying, ground continuity,
  shield continuity, bench LOTO) + traceability package.
- **Recurrence caught + new criteria (RC-208):** the re-emitted 05I-A matrix
  STILL carried hard timing/percentages and the mis-used "Blocked Outputs"
  column (RC-202/203 not applied by the Hunter), and 05I-B added new numeric
  criteria (<0.1 Ω / <0.02 Ω / ≤20 ms / 5 A-10 A). All labeled
  `BENCH_TARGET_PROFILE` / `TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_DATASHEET
  / NEEDS_ENGINEERING_REVIEW`; the torque-zero response is an expected safe
  output, not a blocked output; "direct contactor control by VCU" added to
  blocked outputs. Invented-values family's eighth artifact
  (RC-116/133/169/174/180/188/202/208).
- **05I-B breach logic (RC-209):** `IF ground_resistance_ohms >= 0.02 OR
  safety_relay_dropout_ms > 20.0` → `approved_ground_limit` /
  `approved_datasheet_limit` variables.
- Gate 05I-B status = `MECHANICAL_INTERLOCK_MATRIX_CREATED /
  PHYSICAL_SAFETY_LOOP_TESTS_DEFINED / PRODUCTION_INTENT_HARNESS_REQUIRED /
  BENCH_LOTO_REQUIRED / TARGET_CRITERIA_PENDING_SOURCE_REVIEW / NO_LIVE_HV /
  NO_VEHICLE_CLEARANCE`.
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; the VCU requests but does not own HV isolation; Gate 05J
  NOT YET; ODRs untouched. Next = Gate 05I-C (Low-Voltage Communications
  Integration).

## 2026-07-16 — RH batch 46 + review_43: Gate 05I-A Low-Voltage Driver Safety Logic Verification

- Archived batch_46 (Gate 05I-A) and review_43 1:1 (commit `09d1c55`). New
  rows RC-202..207 (no new CS). Section 54. New deliverable
  `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (13-row driver-safety
  verification matrix + brake-override script + calibration record). Owner:
  "the correct next subgate … very strong."
- **Recurrence caught — invented timing/percentages, seventh artifact
  (RC-202):** the batch embedded >10% / >25% / >5% APPS thresholds,
  13.5→8.5 V / ≥20 V/ms, and 50/15/10 ms timings as rules — same defect
  family as RC-116/133/169/174/180/188. Downgraded to `BENCH_TARGET_PROFILE
  / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED`; script window made
  configurable. The invented-timing family has now recurred across seven
  artifacts — the strongest standing case for the M10 regression scanner.
- Other corrections: expected-safe-output vs blocked-outputs split — a
  torque-zero response is the safe output, not a "blocked output" (tests
  001/002/004/007/008/010) (RC-203); no "immediate" — zero-torque within a
  configured window, measured latency (RC-204); HVIL ownership — VCU
  requests, BMS/PDU/hardwired loop owns isolation execution (RC-205);
  service-clear may clear software records only, never active
  hardwired/HVIL/E-stop/BMS/isolation faults or a live latch, and requires
  safe/neutral + technician authorization + fault source reviewed (RC-206);
  `PERMANENTLY_BLOCKED` → `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` +
  root-cause / corrective-action / re-test / signoff / versioned record
  (RC-207); script returns BENCH categories not HIL/PASS (RC-197).
- Gate 05I-A status = `BENCH_TEST_MATRIX_CREATED / LOW_VOLTAGE_BENCH_ONLY /
  DRIVER_INPUT_LOGIC_UNDER_TEST / NO_LIVE_HV / NO_VEHICLE_MOTION /
  NO_LIVE_FORD_CAN_TRANSMISSION / TIMING_VALUES_TARGET_PROFILE_ONLY /
  BENCH_EVIDENCE_PENDING / NO_VEHICLE_CLEARANCE`.
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; the VCU requests but does not own HV isolation; Gate 05J
  NOT YET; ODRs untouched. Next = Gate 05I-B (Mechanical Interlocks &
  Physical Safety Loop Verification).

## 2026-07-16 — RH batch 45 + review_42: Gate 05I Physical Bench Integration

- Archived batch_45 (Gate 05I) and review_42 1:1 (commit `ca466ac`). New
  rows RC-197..201 (no new CS). Section 53. New deliverable
  `docs/status/GATE05I_BENCH_INTEGRATION.md`. Owner: "yes, begin Gate 05I —
  but keep it low-voltage physical bench integration only; do not move to
  Gate 05J / live vehicle commissioning yet."
- Gate 05I = production-like **low-voltage** bench integration (real
  harness & PDU, real VCU, supplier BMS/PDU + inverter logic boards on LV
  power only, hardwired E-stop / dual-channel relays). Three RESTRICTED
  constraints held: HV traction battery forbidden + isolated; vehicle road
  testing forbidden; live Ford factory-bus (CAN_1) injection forbidden.
  Bench fault-injection matrix (BENCH-05I-001..004), transceiver-protection
  script, and a bench-integration artifact dossier with instrument
  calibration records.
- Owner corrections: BENCH (not HIL) result categories —
  `BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY` /
  `BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` / `BENCH_HARD_BLOCK` /
  `BENCH_INVALID_RUN` (RC-197); E-stop measured not "instant" — coil decay +
  relay drop-out time measured against schematic + datasheets (RC-198);
  "production-spec harness" → "production-intent bench harness" /
  `NOT_RELEASED_FOR_VEHICLE_INSTALL` (RC-199); CAN_1 fault injection
  protected-bench-only, forbidden on a live Ford vehicle network (RC-200);
  driver-safety stays bench-level → sub-gate Gate 05I-A (RC-201).
- Gate 05I status = `LOW_VOLTAGE_BENCH_INTEGRATION_STARTED /
  PRODUCTION_INTENT_HARNESS_REQUIRED / REAL_VCU_REQUIRED /
  SUPPLIER_LOGIC_NODES_REQUIRED / HARDWIRED_ESTOP_REQUIRED /
  NO_HV_TRACTION_BATTERY / NO_VEHICLE_ROAD_TESTING /
  NO_LIVE_FORD_BUS_TRANSMISSION / NO_VEHICLE_CLEARANCE /
  PENDING_ENGINEERING_REVIEW`. **Gate 05J / live vehicle commissioning
  explicitly NOT YET.**
- Nothing ingested; nothing marked Confirmed; scripts are pseudocode not
  production code; no vehicle / live-HV clearance; ODRs untouched. Next =
  Gate 05I-A (Low-Voltage Driver Safety Logic Verification, bench-only).

## 2026-07-16 — RH batch 44 + review_41: Gate 05H v3 (physical HIL/bench evidence)

- Archived batch_44 (Gate 05H v3) and review_41 1:1 (commit `5690e91`).
  New rows RC-190..196 (no new CS). Section 52. Deliverable **updated**:
  `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`. Owner: "the best Gate
  05H version so far … the direction is right." (Also handled a duplicate
  re-send of "43:75" just before — recorded as a PROVENANCE
  duplicate-delivery note, commit `58d155b`, no new evidence/rows/section.)
- **The upgrade — HIL is now real bench evidence, cleaned of
  vehicle-approval language:** evidence boundary (RC-190) — HIL results are
  real low-voltage HIL / bench evidence scoped to this DUT / firmware /
  harness / simulated-node setup, never vehicle-level control authority,
  live-HV approval, road-test approval, or compliance proof without
  engineering review + supplier confirmation + later gates; stricter result
  categories (RC-191) — `…_NO_VEHICLE_AUTHORITY`, `HIL_HARD_BLOCK` (CAN_1
  TXD activity / factory-bus transmit leakage), `HIL_INVALID_RUN` (missing
  artifact package).
- Bench-safety corrections: CAN-H/CAN-L 500 ms short is bench-only
  (protected harness, simulated OEM nodes, current-limited; forbidden on a
  live Ford network / customer vehicle) (RC-192); non-destructive TX fault
  — controlled stuck-dominant/TXD through a protected path, no destructive
  MCU/transceiver-pin shorting unless the fixture is designed for it
  (RC-193); instrument calibration records added to the artifact package
  (RC-194); mandatory Gate 05H pre-test safety checklist — no live HV / no
  battery pack / no contactor coil unless part of the LV test /
  current-limited supply / bench E-stop / fused DUT / wiring reviewed /
  firmware hash / CAN_1 to sim nodes only / raw logging before fault
  injection (RC-195).
- **Gate 05I defined low-voltage (RC-196):** production-like LV bench
  integration (real harness / VCU / BMS-PDU / inverter controller) with no
  traction-battery HV, no vehicle road testing, no Ford factory bus
  transmission — 05I must not jump to live HV or vehicle testing.
- Corrected Gate 05H status = `HIL_VALIDATION_PROTOCOL_CREATED /
  REAL_VCU_DUT_ALLOWED / LOW_VOLTAGE_HIL_ONLY /
  PHYSICAL_TRANSCEIVER_EVIDENCE_REQUIRED / CAN_1_LISTEN_ONLY_PROOF_REQUIRED
  / NO_LIVE_HV / NO_REAL_VEHICLE_NETWORK / NO_VEHICLE_TESTING /
  NO_COMPLIANCE_AUTHORITY / PENDING_ENGINEERING_REVIEW`.
- Nothing ingested; nothing marked Confirmed; no placeholder timing has
  gate authority; scripts are pseudocode not production code; no vehicle /
  live-HV / compliance authority; ODRs untouched. Next = Gate 05I (Physical
  low-voltage Bench Integration).

## 2026-07-16 — RH batch 43 + review_40: Gate 05H v2 (HIL refinement; 05H-A/05H-B/05I split)

- Archived batch_43 (Gate 05H v2) and review_40 1:1 (commit `c075641`).
  New rows RC-185..189 (no new CS). Section 51. Deliverable **updated**:
  `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`. Owner: "strong Gate 05H
  draft … the right direction."
- **Main structural upgrade — 05H is not "simulation only" (RC-185):** a
  real VCU DUT + transceivers + supply + oscilloscope + FIU is bench/HIL
  evidence → split into **Gate 05H-A** (simulation script draft), **Gate
  05H-B** (low-voltage HIL bench execution with a real VCU →
  `HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE`), **Gate 05I** (physical bench
  proof, NOT STARTED). A real run returns `HIL_OBSERVED_VALID / NO_LIVE_HV /
  NO_VEHICLE_CLEARANCE / NO_COMPLIANCE_AUTHORITY`, never just
  SIMULATION_ONLY or PASS.
- Other corrections: ACK/listen-only proof must watch the VCU TX/TXD line
  (a shared-slot CAN analyzer can't prove which node ACKed) — criterion
  "VCU_TXD inactive during the ACK slot and all frame periods," not
  `f.is_ack_asserted` (RC-186); CAN-H/CAN-L 500 ms short is bench-only,
  forbidden on a live Ford network (RC-187); every HIL timing carries a
  Timing Authority label (SimulationSweepOnly / SupplierDataPending /
  HILObservedOnly) and scripts return `…_NO_GATE_AUTHORITY` — fourth-gate
  recurrence of the invented-timing family (RC-116/133/169/174/180) now
  labeled (RC-188); LV rail profiles (11.8–14.2 V, ≥20 V/ms, 0–5 V APPS) =
  TestBenchProfileCandidate / NotFinalVehicleRequirement / NeedsComponentSpec
  (RC-189).
- Corrected Gate 05H status = `HIL_TEST_PROTOCOL_DRAFTED /
  LOW_VOLTAGE_HIL_ONLY / REAL_VCU_DUT_ALLOWED / NO_LIVE_HV /
  NO_VEHICLE_TESTING / NO_FACTORY_BUS_TRANSMISSION /
  TIMING_VALUES_NOT_GATE_AUTHORITY / ARTIFACT_PACKAGE_DEFINED /
  BENCH_EXECUTION_PENDING`.
- Nothing ingested; nothing marked Confirmed; no placeholder timing has
  gate authority; scripts are pseudocode not production code; ODRs
  untouched. Next = Gate 05I (Physical Bench Proof).

## 2026-07-16 — RH batch 42 + review_39: Gate 05H HIL / Bench Test Protocol

- Archived batch_42 (Gate 05H) and review_39 1:1 (commit `1b06fcb`). New
  rows RC-180..184 (no new CS). Section 50. New deliverable
  `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (HIL harness
  architecture, fault-injection matrix HIL-05G-001..006, two illustrative
  Python scripts, per-run proof-artifact package). Owner: "strong first
  draft … the right Gate 05H direction."
- **Recurrence caught — invented timing as gate logic, fourth gate
  (RC-180):** the HIL matrix + scripts embedded `10/20/50/100/2 ms` and
  `3-cycle/30 ms` as real pass/fail limits — same defect family as RC-116
  (200 ms HVIL), RC-133 (Gate 08C), RC-169/173 (Gate 05F), RC-174 (Gate
  05G). Downgraded to `SimulationSweepOnly / SupplierDataPending`; matrix
  header "Pass Criteria Metric" → "HIL Observation Metric / Candidate Pass
  Criteria" + Authority Status row. This defect has now recurred across
  five artifacts — the strongest case yet for the M10 regression scanner.
- Other corrections: HIL-result language — `[HIL_OBSERVED]` /
  `HIL_OBSERVED_NO_GATE_AUTHORITY`, never `[PASS]` /
  `VERIFICATION_STAGE_PASSED_SIM` (RC-181); CAN_1 short test simulated /
  bench-replica only, forbidden on a live Ford network, strongest proof =
  silent-mode register + no TX mailbox + no ACK + analyzer + oscilloscope
  (RC-182); power-loss safe-state measured not assumed — depends on
  output-stage design, pull-ups/downs, relay topology, hardware fail-safe
  (RC-183); per-HIL-run proof-artifact package + configurable script
  timeout (RC-184).
- Kept: HIL architecture, fault-injection matrix, listen-only proof,
  automation scripts, proof artifacts, and the HIL gate rule. Scripts
  remain illustrative pseudocode (no firmware exists yet), not production
  code.
- Gate 05H status = `HIL_TEST_PROTOCOL_DRAFTED / LOW_VOLTAGE_BENCH_ONLY /
  NO_LIVE_HV / NO_VEHICLE_TESTING / NO_FACTORY_BUS_TRANSMISSION /
  TIMING_VALUES_SIMULATION_SWEEP_ONLY / HIL_PROOF_ARTIFACTS_DEFINED /
  BENCH_EXECUTION_NOT_STARTED`.
- Nothing ingested; nothing marked Confirmed; no placeholder timing has
  gate authority; scripts are pseudocode not production code; ODRs
  untouched. Next = owner's call (a further Gate 05 proof step, or the Gate
  06 deep dive per the order 06 → 09 → 10 → 11).

## 2026-07-16 — RH batch 41 + review_38: Gate 05G Fault Containment / Gateway Failsafe Matrix

- Archived batch_41 (Gate 05G) and review_38 1:1 (commit `f2163e1`). New
  rows RC-174..179 (no new CS). Section 49. New deliverable
  `docs/status/GATE05G_FAILSAFE_MATRIX.md` (13-row failsafe matrix +
  failsafe gate rule + default-safe rule). Owner: "strong … architecture
  right, failsafe categories right."
- **Recurrence caught — invented timing as gate logic, third time
  (RC-174):** the batch's `50 ms` (inverter zero-torque), `100 ms`
  (CAN_2/CAN_3 silence), `2 ms` (dominant-timeout DTO) numbers still read
  like sourced timing — same defect family as RC-116 (200 ms HVIL), RC-133
  (Gate 08C placeholder-authority), and RC-169/173 (Gate 05F). Downgraded
  to `SupplierDataPending / SimulationSweepOnly`
  (`TransceiverSupplierDataPending` for the DTO); rows reworded to
  supplier-defined behavior pending inverter docs + HIL. Now recurred
  across four gates — strongly recommended for the M10 regression scanner.
- Other corrections: no "instant" for mechanical / E-stop contactor
  actions — supplier-defined + bench/HIL-verified (coil decay, spring
  travel, arc suppression, contact separation) (RC-175); CAN_1
  transmit-attempt rejected by firmware policy AND physically unable to
  drive the bus (RC-176); bad-checksum stale data cannot preserve torque
  authority — reject frame, safe-fallback only within supplier timeout
  else torque zero / FAULT_LATCHED (RC-177); wrong-source-address reject +
  log, latch only on repeat / safety-critical / forbidden-pattern (RC-178).
- **New default-safe rule (RC-179):** no failsafe timing controls physical
  hardware until upgraded from SimulationSweepOnly to SupplierConfirmed /
  BenchVerified; any torque / contactor / BMS-discharge / HVIL / isolation
  / e-stop fault defaults toward torque inhibit + restart lockout +
  engineering review. Critical containment kept: BMS no-discharge → clamp
  torque to zero; inverter ignores torque-zero → escalate to shutdown
  request + FAULT_LATCHED on current/torque-feedback conflict.
- Gate 05G status = `FAILSAFE_MATRIX_MAPPED / SIMULATION_ONLY /
  TIMEOUT_VALUES_PENDING_SUPPLIER_DATA / HIL_BENCH_PROOF_REQUIRED /
  CAN_1_LISTEN_ONLY_PROOF_REQUIRED / NO_PHYSICAL_GATEWAY_DEPLOYMENT /
  NO_FACTORY_BUS_TRANSMISSION / NO_PLACEHOLDER_TIMING_AUTHORITY`.
- Nothing ingested; nothing marked Confirmed; no placeholder timing has
  gate authority; no factory-bus transmission; no physical gateway
  deployment; ODRs untouched. Next = Gate 05H (Gateway Proof Plan / HIL
  Bench Test Matrix).

## 2026-07-16 — RH batch 40 + review_37: Gate 05F Network Boundary / Gateway Safety Rules

- Archived batch_40 (Gate 05F) and review_37 1:1 (commit `d0428d9`). New
  rows RC-169..173 (no new CS). Section 48. New deliverable
  `docs/status/GATE05F_NETWORK_BOUNDARY.md` (3-bus isolation architecture,
  routing rules, failure protocols A/B/C, listen-only proof dossier,
  gateway gate rule). Owner: "excellent structurally … very good."
- **Recurrence caught — invented timing as gate logic (RC-169):** the
  batch's hard `50 ms` (inverter zero-torque) / `100 ms` (CAN_2/CAN_3
  silence) timeouts were acting like sourced safety boundaries — same
  defect family as the 200 ms HVIL fabrication (RC-116) and the Gate 08C
  placeholder-authority rule (RC-133). Downgraded to
  `t_inverter/can2/can3_timeout = SupplierDataPending`, sweep-only,
  labeled **No Gate Authority**; Protocols A/B/C reworded to
  supplier-defined timeouts. General rule **RC-173:** no timeout /
  heartbeat / alive-counter / torque-zero / shutdown / contactor-open
  timing becomes physical gate logic until supplier docs or HIL/bench
  proof confirm it. Flagged for the M10 regression scanner.
- Other corrections: "academic engineering wiring protocol" / "manual OEM
  academic research protocol" → "supplier wiring diagram + ICD +
  controls-engineer review confirm request authority" (RC-170);
  `VCU_Precharge_Request` + `VCU_Shutdown_Request_To_BMS` split Signal
  Owner (VCU, request generation) vs Action Owner (BMS/PDU/hardwired
  safety, execution), VCU Authority = requester only (RC-171); CAN_1
  "transceiver must be modified" → "selected, wired, or configured for
  listen-only / silent monitoring with no transmit capability enabled"
  (RC-172).
- Architecture kept: CAN_1 Ford listen-only / no transmit; CAN_2 isolated
  VCU↔inverter; CAN_3 isolated VCU↔BMS/PDU; forbidden crossings (EV
  torque, HV metrics, thermal alerts, any Ford PCM/ABS/ESC/airbag ID
  spoof). Gateway gate rule kept verbatim.
- Gate 05F status = `NETWORK_BOUNDARY_RULES_CREATED /
  CAN_1_LISTEN_ONLY_REQUIREMENT_DEFINED / EV_SIDE_BUSES_ISOLATED /
  PRECHARGE_SIGNAL_DECOMPOSED / SHUTDOWN_SIGNAL_DECOMPOSED /
  TIMEOUT_VALUES_PENDING_SUPPLIER_DATA / NO_FACTORY_BUS_TRANSMISSION /
  NO_PHYSICAL_GATEWAY_DEPLOYMENT / SIMULATION_ONLY`.
- Nothing ingested; nothing marked Confirmed; no timeout has physical
  authority; no factory-bus transmission; no physical gateway deployment;
  ODRs untouched. Next = Gate 05G (Fault Containment and Gateway Failsafe
  Matrix).

## 2026-07-16 — RH batch 39 + review_36: Gate 05E Interface Control Document / Signal Authority Table

- Archived batch_39 (Gate 05E ICD) and review_36 1:1 (commit `4bdbe37`).
  New rows RC-164..168 (no new CS). Section 47. New deliverable
  `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` (10-row signal-authority
  table after the owner's splits + the ICD gate rule). Owner: "strong Gate
  05E draft."
- **The ICD gate rule (owner: "exactly right"):** `IF authority_status ==
  UNVERIFIED_STAGE OR owner == PENDING → PHYSICAL_HARDWARE_DRIVE = BLOCKED,
  BUS_TRANSMISSION_FACTORY = BLOCKED, EVALUATION_MODE =
  SIMULATION_ICD_VERIFICATION_ONLY`. A signal never jumps from "mapped in
  software" to "allowed to control hardware."
- Owner corrections: (1) **split pre-charge into three signals** —
  VCU_Precharge_Request (transmit request, blocked until supplier
  protocol), BMS_Precharge_Status (receive/monitor), Precharge_Relay_Coil_
  Control (hardware actuation, blocked for VCU unless supplier arch
  assigns it) (RC-164); (2) **split emergency shutdown into four signals**
  and drop the confusing "inhibit" — VCU_Torque_Zero_Request,
  VCU_Shutdown_Request_To_BMS, Hardwired_EStop_Open_Circuit (no software
  override), BMS_Contactor_Open_Status (RC-165); (3) **Ford source
  controllers stay generic** — "Ford factory module / UIM path — pending
  verification" (RC-166); (4) **listen-only proof requirement** —
  silent/listen-only mode + no ACK + no transmit mailbox + capture log +
  hardware-config screenshot (RC-167); (5) **signal-decomposition
  doctrine** — a signal cannot be both a request and a hardware actuation
  unless the source says so; every safety-critical action decomposes into
  request/status/feedback/actuation/fault (RC-168).
- Gate 05E status = `ICD_SIGNAL_BOUNDARIES_MAPPED / SIMULATION_ONLY /
  FORD_SIDE_LISTEN_ONLY / EV_SIDE_ISOLATED_CONTROL_PENDING /
  PRECHARGE_SIGNALS_NEED_SPLIT / SHUTDOWN_SIGNALS_NEED_SPLIT /
  NO_FACTORY_BUS_TRANSMISSION / NO_PHYSICAL_HARDWARE_DRIVE`.
- Nothing ingested; nothing marked Confirmed; no factory-bus transmission;
  no physical-hardware drive; ODRs untouched. Next = Gate 05F (Network
  Boundary / Gateway Safety Rules).

## 2026-07-16 — RH batch 38 + review_35: Gate 05D State Transition + Ownership Matrix

- Archived batch_38 (Gate 05D ownership matrix) and review_35 1:1 (commit
  `158dcba`). New rows RC-160..163 (no new CS). Section 46. New deliverable
  `docs/status/GATE05D_OWNERSHIP_MATRIX.md` (11-state ownership matrix +
  Final Responsibility Matrix). Owner: "major upgrade — VCU god-controller
  risk reduced."
- **Permanent doctrine promoted (Decision Register D-007):** the owner
  elevated **Coordinator ≠ Owner · Requesting ≠ Commanding · Monitoring ≠
  Approving · Seeing a signal ≠ having authority to act on it** to a
  permanent Build Engine doctrine line, paired with the **Build Engine
  Authority Law** (no state transition becomes physical-control authority
  until every action has an owner, requester, blocked-controller list, and
  proof artifact; unknown ownership → simulate/monitor/request only).
- Owner corrections: READY_TO_DRIVE must not command torque — torque stays
  strictly in DRIVE_ENABLED (RC-160); OFF is MONITOR only if a low-power
  supervisor mode is awake, otherwise dormant (RC-161); ACCESSORY thermal
  pumps run only if LV power budget + pump ownership + thermal-controller
  authority are verified (RC-162); SERVICE_MODE requires HV de-energized +
  LOTO + service disconnect removed + absence-of-voltage verification +
  technician signoff (RC-163); EMERGENCY_SHUTDOWN "de-energize HV" →
  "request HV de-energization through the authorized BMS/PDU/hardwired
  safety architecture."
- Gate 05D status = `STATE_OWNERSHIP_MATRIX_CREATED /
  VCU_ROLE_LIMITS_DEFINED / FORD_SIDE_CONTROL_BLOCKED /
  EV_SIDE_CONTROL_ISOLATED / CONTACTOR_OWNER_PENDING /
  PRECHARGE_OWNER_PENDING / HV_SHUTDOWN_OWNER_PENDING /
  TORQUE_AUTHORITY_PENDING / SERVICE_MODE_PHYSICAL_SAFETY_PENDING /
  SIMULATION_ONLY`. Owner bottom line: CREATED / SIMULATION_ONLY /
  OWNERSHIP PENDING.
- Nothing ingested; nothing marked Confirmed; the VCU owns nothing
  safety-critical; no invented threshold; no factory-cluster injection;
  ODRs untouched. Next = Gate 05E (Interface Control Document / Signal
  Authority Table).

## 2026-07-16 — RH batch 37 + review_34: Gate 05C Controls State Machine

- Archived batch_37 (Gate 05C state machine) and review_34 1:1 (commit
  `95179a8`). New rows RC-154..159 (no new CS). Section 45. New
  deliverable `docs/status/GATE05C_STATE_MACHINE.md` (11 states). Owner:
  "strong draft."
- **Biggest upgrade — ownership labels (RC-158):** every state carries an
  Owner (VCU / BMS / PDU / Inverter / Charger / Ford module / Hardwired
  safety / Unknown-Pending) + VCU Role + Authority Status. The VCU
  coordinates but cannot assume ownership of contactors / pre-charge / HV
  shutdown / factory signals / cluster warnings; PRECHARGE_REQUEST,
  READY_TO_DRIVE, EMERGENCY_SHUTDOWN owned by BMS/PDU/safety controller —
  pending supplier arch (BQ-27).
- Other corrections: Ford-side signals are `SimulationOnly /
  CandidateSignal`, not real state-transition authority (RC-155);
  pre-charge ">95%/timeout" → ParameterPending / SupplierDataRequired
  (RC-156); EMERGENCY_SHUTDOWN requests through the authorized BMS/PDU
  safety architecture + SERVICE_MODE requires HV de-energized/LOTO/
  absence-of-voltage (RC-157); DRIVE_ENABLED gets the full pre-drive input
  set.
- Gate 05C status: STATE_MACHINE_DRAFTED / SIMULATION_ONLY /
  AUTHORITY_OWNERSHIP_UNRESOLVED / FORD_SIDE_SIGNALS_LISTEN_ONLY /
  EV_SIDE_OUTPUTS_ISOLATED / PRECHARGE_OWNER_PENDING /
  HV_SHUTDOWN_OWNER_PENDING / NO_PHYSICAL_TORQUE_CONTROL /
  NO_FACTORY_CLUSTER_INJECTION (RC-159).
- Research Map + queue updated; **next = Gate 05D State Transition +
  Ownership Matrix**; Gate 08C stays parked.
- Nothing ingested; nothing Confirmed; no VCU-owned HV shutdown; no
  invented threshold; no factory-cluster injection; ODRs untouched.

## 2026-07-16 — RH batch 36 + review_33: Gate 05B Controls Dependency Map

- Archived batch_36 (Gate 05B controls dependency map) and review_33 1:1
  (commit `ef1f337`). New rows RC-148..153 (no new CS). Section 44. New
  deliverable `docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md`; Gate 05A
  registry updated (S7–S11 EV-side receive signals; status +
  NO_PROPRIETARY_DBC_ASSUMPTIONS). Owner: "very strong now."
- **Gate 05A transmit-config recurrence (RC-148):** the "custom VCU
  configurations on the body-builder bus" line reappeared → re-corrected
  to authorized receive/listen-only awareness; transmit blocked unless
  Ford docs allow the exact message/address/timing/bus/use case.
- **Gate 05B authority corrections:** VCU decisions = SimulationOnly
  (RC-150) — torque arbitration, pre-charge, thermal derating carry
  authority conditions; **pre-charge/contactor/HV-shutdown authority may
  belong to the BMS/PDU, not the VCU** (BQ-27). Driver warnings → EV-side
  display only; factory cluster BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE
  (RC-151). Fault Level 3 emergency shutdown routes through the authorized
  BMS-PDU safety architecture (RC-152). Directionality held (Ford
  receive-only; EV transmit isolated; no CAN_1→CAN_2 routing of unverified
  data; no factory-safety-bus injection).
- Gate 05B status: CONTROL_DEPENDENCY_MAP_STARTED / SIMULATION_ONLY /
  FORD_SIDE_RECEIVE_ONLY / EV_SIDE_ISOLATED_CONTROL_ONLY /
  PRECHARGE_AUTHORITY_UNCONFIRMED / DRIVER_WARNING_OUTPUT_UNCONFIRMED /
  NO_PHYSICAL_TORQUE_CONTROL / NO_FACTORY_CLUSTER_INJECTION (RC-153).
- Research Map + queue updated; **next = Gate 05C Controls State Machine**
  (11 states); Gate 08C stays parked.
- Nothing ingested; nothing Confirmed; no confirmed Ford signal; no
  VCU-owned HV shutdown; no factory-cluster injection; ODRs untouched.

## 2026-07-16 — RH batch 35 + review_32: Gate 08C parked + Gate 05A signal registry

- Archived batch_35 (Gate 08C parked + Gate 05A registry) and review_32
  1:1 (commit `a8b8c5e`). New rows RC-143..147 (no new CS). Section 43.
  New deliverable `docs/status/GATE05A_SIGNAL_REGISTRY.md`; Gate 08C
  parked. Owner: "one of the cleanest versions so far."
- **Gate 08C parked (RC-143):** status `SIMULATION_SWEEP_MATRIX_CREATED /
  … / PARKED_FOR_SUPPLIER_DATA`; the term "Model Accepts" → **"Within
  Draft Stress Envelope / No Gate Authority"** (never read as approval).
- **Gate 05A (RC-144/145/146/147):** DBC reality — Ford factory systems =
  AuthorizedSourcePending / ListenOnlyCandidate / NoTransmitAuthority
  (Ford may not give a clean proprietary DBC); EV-side DBCs
  (BMS/inverter/VCU/DC-DC/charger) realistic + owned; "unlocks transmit
  configs" → unlocks listen-only registry + receive-only VCU state +
  authorized upfitter mapping (transmit blocked). 6 signals registered
  (S1 wheel-speed PGN 65215, S2 accel-pedal 61443, S3 brake-switch 61441,
  S4 ignition, S5 inverter CAN_2, S6 BMS SOC CAN_3) — Ford-side =
  Public/Standard J1939 Candidate / UnverifiedStage / Listen-Only / No
  control authority. Accel-pedal (compare driver-demand trend in sim only)
  and brake-switch (sim-only regen-decay study) use restricted. Status
  SIGNAL_REGISTRY_STARTED / LISTEN_ONLY_RESEARCH / UNVERIFIED_STAGE /
  NO_ACTIVE_TRANSMISSIONS / NO_FACTORY_SAFETY_BUS_CONTROL.
- Research Map + queue updated; **next = Gate 05B Controls Dependency
  Map**; Gate 08C stays parked.
- Nothing ingested; nothing Confirmed; no placeholder authority; no
  confirmed Ford signal; no transmit/bypass; ODRs untouched.

## 2026-07-16 — RH batch 34 + review_31: Gate 08C sweep cleanup + Gate 05 signal candidates

- Archived batch_34 (Gate 08C sweep + Gate 05 signals) and review_31 1:1
  (commit `49f6e59`). New rows RC-138..142 (no new CS). Section 42.
  Deliverables updated: `docs/status/DRAFT_VALIDATION_08C.md` and
  `docs/status/GATE05_CONTROLS.md`. Owner: "much cleaner."
- **Gate 08C wording cleanup (RC-138/139):** "stable/unstable" (still
  reads as approval) → **Simulation Response Category (Model Accepts /
  Model Needs Review / Model Stress Failure / Supplier Data Required)**,
  each "No Gate Authority." Status → SIMULATION_SWEEP_ACTIVE /
  PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY / SUPPLIER_THRESHOLDS_REQUIRED.
- **Gate 05 biggest correction (RC-140/141):** the Ford PGNs (61444
  engine speed, 61443 accel-pedal, 65265 wheel speed, UIM ignition-key,
  CAN_1 500k J1939) are **candidates** → J1939SignalCandidate /
  NeedsOfficialFordUIMSource / ListenOnlyCandidate / NoTransmitAuthority.
  "Accel pedal scaled directly into inverter torque" softened — pedal may
  only inform a VCU torque-demand model (plausibility + brake-override +
  fault-handling + controls-engineer review).
- **Gate 05 transmit rule + VCU boundary + labels (RC-142):** transmit
  BLOCKED until Ford/UIM docs allow the exact message/bus/address/use
  case; VCU reads authorized signals, commands only conversion-side;
  factory safety modules authoritative. Labels STARTED /
  LISTEN_ONLY_RESEARCH / AUTHORIZED_CHANNELS_ONLY /
  NO_FACTORY_SAFETY_BUS_TRANSMIT / NO_IMMOBILIZER_OR_SECURITY_BYPASS /
  NO_PROPRIETARY_DBC_ASSUMPTIONS.
- Research Map + queue updated; **next = Gate 05A source-backed signal
  registry** (find official Ford UIM/BBAS/J1939 docs); Gate 08C sweeps
  continue in parallel.
- Nothing ingested; nothing Confirmed; no placeholder authority; no
  confirmed Ford signal; no transmit/bypass; ODRs untouched.

## 2026-07-16 — RH batch 33 + review_30: Gate 08C draft validation + Gate 05 initiation

- Archived batch_33 (Gate 08C draft validation + Gate 05 init) and
  review_30 1:1 (commit `3d2b9ec`). **Two new deliverables:
  `docs/status/DRAFT_VALIDATION_08C.md` (Gate 08C sweep engine) and
  `docs/status/GATE05_CONTROLS.md` (Gate 05 authorized-controls).** New
  rows RC-133..137 (no new CS). Section 41. BQ-25/26 added.
- **Correction 1 (RC-133/134/135):** placeholder numbers have **no
  pass/block authority** — a nominal value yields
  `ASSUMPTION_STRESS_RESULT_ONLY / GATE_AUTHORITY = NONE`; numeric fields
  reformatted as sweep inputs; engine reports **Simulation Sweep Result
  (stable/unstable/needs-review/missing-source/supplier-data-required)**,
  not PASS/BLOCK; PASS/BLOCK reserved for SupplierConfirmed/
  PhysicallyVerified. Gate 08C = DRAFT_VALIDATION_STARTED / SIMULATION_ONLY
  / NO_PLACEHOLDER_PASS_BLOCK_AUTHORITY / SUPPLIER_DATA_PENDING /
  NO_PHYSICAL_TEST_CLEARANCE / NO_COMPLIANCE_CLAIMS.
- **Correction 2 (RC-136/137, SAFETY-CRITICAL):** the Gate 05 "Ford
  proprietary CAN DBC via Vehicle Reverse Engineering Group / sniffing"
  framing corrected to **authorized, listen-only** — ALLOWED: authorized
  Ford-compatible integration, listen-only capture, public/authorized
  J1939/OBD-II, upfitter docs, supplier DBC files; **BLOCKED:
  proprietary-DBC assumptions, anti-theft bypass, fake/spoofed ABS/ESC
  messages, transmitting onto factory Ford safety buses without
  approval** (same class as the PATS prohibition). DBC-IDs row →
  NeedsAuthorizedSource (BQ-25).
- Gate 05 = STARTED (parallel deep dive). Research Map + queue updated;
  **next = continue Gate 05 deep dive + Gate 08C sweeps in parallel.**
- Nothing ingested; nothing Confirmed; no placeholder pass/block; no
  compliance claim; no live-HV/track testing; no bus spoofing; ODRs
  untouched.

## 2026-07-16 — RH batch 32 + review_29: Gate 08B source-backed test-procedure mapping (parked)

- Archived batch_32 (Gate 08B test mapping) and review_29 1:1 (commit
  `6731d62`). The 15 FMEA modes mapped to candidate standards; recorded
  in `docs/status/FMEA_REGISTRY.md` (new Gate 08B section). New rows
  RC-127..132 (no new CS — the standards are `NeedsExactQuote` leads, not
  verified sources). Section 40.
- **Big correction (RC-127):** every standard "Exact Quote" is a
  **`Claim Summary / NeedsExactQuote / NeedsPageSectionTable`** — upgrade
  to `ExactQuoteVerified` only after the official PDF + exact
  page/section/table.
- **"COMPLETED" rejected (RC-132):** Gate 08B = `SOURCE_CANDIDATES_MAPPED
  / NOT_FINAL / NEEDS_EXACT_QUOTES / NEEDS_PAGE_SECTION_TABLE /
  NEEDS_SUPPLIER_THRESHOLDS / NO_LIVE_HV / NO_TRACK / NO_COMPLIANCE`;
  Gate 08C = NOT STARTED; **08B parked, move to Gate 05 in parallel.**
- Wrong/weak source matches downgraded (RC-129): EHPS→ISO 5010
  (earth-moving)=NeedsBetterSource; coolant→IEC 60529/ISO 16750-4
  (environmental)=NeedsThermalSupplierData; regen→ISO 26262-4=Functional
  SafetyFrameworkCandidate; ABS/ESC→ECE R13-H=ContextCheckNeeded;
  steering→SAE J2672=NeedsExactStandardVerification. FM-07 wording
  reworded (RC-130); water pressure-decay ≠ IP cert (RC-131). BQ-23/24
  added.
- Research Map + queue updated; **next = Gate 05 CAN/Controls deep dive**
  (parallel with parked 08B).
- Nothing ingested; nothing Confirmed; no compliance claim; no verified
  standard quote; no live-HV/track testing; ODRs untouched.

## 2026-07-16 — RH batch 31 + review_28: Gate 08 FMEA registry (15 modes)

- Archived batch_31 (full FMEA registry) and review_28 1:1 (commit
  `f626e91`). **`docs/status/FMEA_REGISTRY.md` populated with all 15
  failure modes.** New rows RC-120..126 (no new CS). Section 39. Owner:
  "the best Gate 08 structure so far."
- **No recurrence:** the 200 ms HVIL limit did not return (timing kept
  `NeedsExactTimingSource`); staged testing + LOTO/PPE held.
- Owner's 6 corrections: (1) invented dashboard messages →
  `DriverWarningCandidate / NeedsControlsIntegration` (RC-121); (2)
  isolation Riso 100/500 Ω/V → `RegulatoryReferenceCandidate /
  NeedsSystemContext / NeedsSupplierBMSMapping` (RC-122, context-split);
  (3) HVIL timing stays `NeedsExactTimingSource`; (4) brake assist is
  **hydraulic, not pneumatic** (RC-123); (5) regen-loss "seamless blend"
  → "friction braking remains available without destabilizing brake
  balance" (RC-124); (6) FMVSS 105 = **test-mapping lane**
  (`FMVSS_105_TEST_MAPPING_REQUIRED / BrakeEngineerReviewRequired`,
  RC-125), never "compliance satisfied."
- Gate 08 relabelled (RC-126): `FMEA_REGISTRY_CREATED / TEST_SEQUENCE_
  MAPPED / SUPPLIER_DATA_REQUIRED / NO_LIVE_HV_TESTING_APPROVED /
  NO_TRACK_TESTING_APPROVED / NO_COMPLIANCE_CLAIMS` + a stronger
  BLOCK/WARNING/SIMULATION-ONLY rule set. BQ-21 (Riso threshold) and
  BQ-22 (hydraulic reserve curve) added.
- Research Map + queue updated; **next = Gate 08B (source-backed
  test-procedure mapping)** with the owner's verbatim prompt captured;
  then Gate 05 CAN deep dive.
- Nothing ingested; nothing Confirmed; no compliance claim; no invented
  thresholds; no live-HV/track testing approved; ODRs untouched.

## 2026-07-16 — RH batch 30 + review_27: Gate 08 v0.1 transition (Failure Modes + Test Procedures)

- Archived batch_30 (Gate 08 transition) and review_27 1:1 (commit
  `df2f4c3`). **New deliverable: `docs/status/FMEA_REGISTRY.md`** (FMEA
  framework + staged-testing safety rules). New rows RC-115..119 (no new
  CS). Section 38. Gate 07C parked; Gate 08 = **FMEA_FRAMEWORK_STARTED**.
- **Two safety-critical defects caught:** (1) a **fabricated 200 ms HVIL
  disconnect-latency limit** (`IF HVIL_LOOP_INTERRUPT_TIMING > 200 →
  BLOCK`) with no source → **`NeedsExactSource`** (RC-116, BQ-20) — the
  Constitution's never-invent-values rule; (2) **unsafe live-HV
  fault-test wording** → **staged testing** (Stage 1 bench/HIL LV-mock →
  Stage 2 component test HV-isolated → Stage 3 supervised integrated test
  only after engineering safety plan + LOTO + PPE + emergency shutdown) —
  RC-117.
- Other corrections: weight/CG CHECK 1/2 belong to Gate 07C (Gate 08
  references them as prerequisites) — RC-119; regen/ABS/ESC test staging
  (sim → HIL → dyno → closed-course → loaded after brake-engineer review)
  — RC-118; `GATE_08_OPEN` → `FMEA_FRAMEWORK_STARTED`; Gate 08 must be a
  proper FMEA registry (RC-115).
- Gate 07C park-status extended (VERTICAL_CG_TEST_REQUIRED added). BQ-20
  added. Research Map + queue updated with the owner's **15-mode FMEA
  prompt**; next = the full Gate 08 registry.
- Nothing ingested; nothing Confirmed; no compliance claim; no invented
  thresholds; no live-HV/track testing approved; ODRs untouched.

## 2026-07-16 — RH batch 29 + review_26: Gate 07C v0.4 refinement (parked)

- Archived batch_29 (Gate 07C v0.4 refinement) and review_26 1:1 (commit
  `75523c8`). The Hunter re-delivered the calculator with the **explicit
  equations shown**. Owner parks Gate 07C as **CALCULATOR_FRAMEWORK_READY
  / PHYSICAL_DATA_REQUIRED / NO_ROAD_TEST_CLEARANCE** (RC-114).
- **Two recurrences caught:** the payload re-used
  `Final_Safety_Compliance_Status` / `OPERATIONAL_ALPHA` and the naive
  `IF CG_v > Max_Allowable_Height → BLOCK`, both corrected in review_25 —
  re-corrected (RC-110/RC-112 recurrence markers). The calculator
  `AXLE_CG_CALCULATOR.md` already held the honest labels + IVM logic, so
  nothing regressed in the register. Fourth distinct recurring item for
  the M10 regression-scanner case.
- Genuine refinements: track widths Tf/Tr → **NeedsOfficialFordSource OR
  PhysicalMeasurement** (RC-113, BQ-18), not supplier-only; the regen/ABS/
  ESC dynamic fault-injection item **moved to Gate 08** (BQ-19). Section
  37.
- Calculator bumped to v0.4 (park-status flags; WARNING gained diesel/gas
  branch mismatch; SIMULATION-ONLY gained generic track widths). Confirmed
  next order: **Gate 08 → 05 deep dive → 06 deep dive → 09 → 10 → 11.**
- Nothing ingested; nothing Confirmed; no compliance claim; ODRs
  untouched.

## 2026-07-16 — RH batch 28 + review_25: Gate 07C v0.3 (Axle Moment + CG Calculator)

- Archived batch_28 (Gate 07C axle-moment/CG) and review_25 1:1 (commit
  `12491b7`). Owner label: **Gate 07C — Axle Moment / CG Calculator
  v0.3** — a good calculator architecture, not a verified CG system;
  calculation-ready, not road-test-ready.
- **New deliverable: `docs/status/AXLE_CG_CALCULATOR.md`** (allowed
  equations, data-entry matrix, nominal assumptions, physical-verification
  steps, pass/block logic). New rows CS-62 (YouTube CG-height video →
  LeadOnly), RC-107..112. Section 36.
- **D-006 gas/diesel split resolved in-payload** — the removed-ICE
  profiles now carry both branches; the 001A gas figures (engine ~540 lb,
  exhaust ~65 lb, NominalAssumption) populate `MASS_LEDGER.md`.
- Owner's corrections applied: (1) explicit equations (W/F/R,
  CGh=(R×WB)/W, ΔR/ΔF, transverse CGt — RC-107/108); (2) **vertical CG
  stays BLOCKED** pending an approved CG-height procedure (Transit
  BEMM/BBAS) — RC-109; (3) **IVM CGv Min/Max equations** replace the naive
  single max-height threshold — RC-110; (4) honest labels
  (`Weight_CG_Gate_Status`; `NOMINAL_CALCULATION_PASS /
  PHYSICAL_VERIFICATION_REQUIRED`) — **no compliance claim** — RC-112;
  (5) 500 lb = FMVSS-105 **lightly-loaded allowance**, not fleet payload
  (RC-111, refines RC-105).
- Blocked Questions Ledger gained BQ-16 (bare-chassis CGv + official
  method) and BQ-17 (IVM CGv equations + ESC constants). Research Map +
  queue updated; **next = Gate 08 (Failure Modes + Test Procedures)**.
- Nothing ingested; nothing Confirmed; no compliance claim; no "vehicle
  is safe"; ODRs untouched.

## 2026-07-16 — RH batch 27 + review_24: Gate 07B v0.2 (Removed / Added Mass Ledger)

- Archived batch_27 (Gate 07B mass ledger) and review_24 1:1 (commit
  `766b77d`). Owner label: **Gate 07B — Removed / Added Mass Ledger
  v0.2.**
- **New deliverable: `docs/status/MASS_LEDGER.md`** — living RM-01..06
  (removed) / AM-01..05 (added) tracker, 3-phase scale-ticket procedure
  (baseline → stripped → final), operating-state weight cases, and the
  release gate. New rows RC-103..106 (no new CS — all Ford General BBLB,
  CS-07): four-corner axle defs (RC-103), transverse CG (RC-104), FMVSS
  105 500 lb passenger load (RC-105), the "no road test until…" release
  NoGo (RC-106). Section 35.
- **D-006 gas/diesel split RECURRED** — the ledger was again built on the
  6.7L diesel + DEF/DPF; the donor is 7.3L gas → the removal ledger is
  tagged Platform 001B, and the **001A gas removal ledger is flagged
  OUTSTANDING**. Third corrected-claim recurrence in the project (after
  PATS and ZF-CAN) — another M10 regression-scanner data point.
- Owner's 5 corrections applied: split gas/diesel; **"three-pad" → axle
  scale (front+rear+total) minimum / four-corner (LF/RF/LR/RR)
  preferred**; add left/right + transverse CG + side-to-side warning;
  real milestone dates (pre-teardown/mid-build/final; suppliers 7/14/21d);
  operating-state payload/passenger cases (500 lb FMVSS-105 passenger
  load). Release-gate rule added (RC-106). BQ-15 (battery-pack CG coords)
  added to the Blocked Questions Ledger.
- Research Map + queue updated; **next = Gate 07C (axle-moment calculator
  + CG method)** with the owner's verbatim prompt captured.
- Nothing ingested; nothing Confirmed; no weight marked safe; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 26 + review_23: Gate 07 v0.1 (Weight / Axle Load / CG)

- Archived batch_26 (Gate 07 weight/axle/CG) and review_23 1:1 (commit
  `ab5c16b`). Owner label: **Gate 07 v0.1** — properly structured around
  the right truth source (door label + scale tickets + component mass
  ledger), not closed.
- New rows CS-60 (Work Truck/NTEA axle-moment method →
  ModelingFrameworkCandidate/AxleMomentMethod/NeedsPhysicalMeasurements),
  CS-61 (RC Lacy dealer page → FleetBackground/DoorLabelReminder/
  NotForFinalRule); RC-99 (Super Duty GVWR bands via Scribd BBLB —
  NoGo/NeedsOfficialFordCopy), RC-100 (axle-moment method), RC-101
  (door-label + baseline-scale procedure), RC-102 (Ford BBLB GAWR/GVWR
  definitions — door label governs). Section 34.
- **Platform split (D-006):** the Hunter cited 6.7L diesel + 10R140 data,
  but the donor is **7.3L gas** → Platform 001A (gas, active) vs 001B
  (diesel); no diesel weight/CG in the gas model.
- Owner corrections: Scribd BBLB downgraded (NeedsOfficialFordCopy);
  dealer page → FleetBackground; Work Truck method →
  ModelingFrameworkCandidate; ledger dates made real (Jul 17/24/31 2026);
  **factory engine CG demoted from supplier-only to NominalAssumption-
  allowed** (BQ-13; physical weighing before final layout). Gate 07 split
  into sub-gates **07A** (door label + baseline scale), **07B** (removed/
  added mass ledger), **07C** (axle-moment calculator). Enclosure mounting
  tied back to the Gate 06 frame rules (RC-97/RC-22).
- Blocked Questions Ledger gained BQ-13/BQ-14 (Gate 07 supplier-preferred
  items); Research Map + queue updated; **next = Gate 07B** with the
  owner's verbatim prompt captured.
- Nothing ingested; nothing Confirmed; no weight marked safe; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 25 + review_22: Gate 04B/04C/05/06 first pass (parallel research)

- Archived batch_25 (four-gate test-plan payload) and review_22 1:1
  (commit `654b111`). First "do-not-wait" payload under directive_01.
- **ZF "CAN control" regression resolved in-payload** (Part 2 now reads
  "no active CAN connection is required") — the recurrence caught in
  review_20/21 is closed for ZF.
- New rows CS-55..CS-59, RC-88..RC-98: FMVSS/TSD 105 (CS-55 —
  RegulatoryTestSource/NeedsBrakeEngineerMapping; RC-88 inoperative-assist
  stop, RC-89 fade/recovery), NHTSA nht78-1.13 brake-circuit isolation
  NoGo (CS-56/RC-90), Ford General BBLB electrical-load rule as the real
  Gate 04C anchor (RC-91) + Gate 05 PCM/ignition/stop-lamp rules (RC-94)
  + ESC/traction (RC-96) + frame-drilling rule refining RC-22 (RC-97),
  BenchForce/FS1Inc low-voltage background downgraded to
  TechnicalBackground/LeadOnly/NotForFinalRule (CS-57/58, RC-92/93),
  2026 Super Duty BBLB via Scribd downgraded to CandidateSourcePath/
  NeedsOfficialFordCopy (CS-59, RC-95/98). Section 33.
- **Provenance defect caught:** the "Ford General BBLB" rows were cited
  via an NHTSA ODI investigation PDF, not the BBLB (title/URL mismatch) —
  all anchored to CS-07 and flagged NeedsOfficialFordCopy/NeedsExactQuote.
- Owner's 5 corrections applied: real follow-up dates (7/14/21-day
  cadence, applied to the Blocked Questions Ledger); FMVSS 105 regulatory
  not modeling (no hard-coded 400 ft/150 lb until the exact table row is
  matched); vendor low-voltage sources → LeadOnly; Scribd →
  NeedsOfficialFordCopy; Gate 05 = authorized serviceable integration
  (not "clearing dashboard lights").
- Gate flags: 04=BLOCKED_PENDING_SUPPLIER_RESPONSE; 04B=REGULATORY_TEST_
  SOURCE_FOUND/NEEDS_BRAKE_ENGINEER_MAPPING; 04C=OEM_ELECTRICAL_RULE_
  SOURCE_FOUND/DC_DC_SIZING_OPEN; 05=STARTED/NEEDS_OFFICIAL_FORD_SUPER_
  DUTY_SOURCE; 06=OFFICIAL_FRAME_RULE_CANDIDATES_FOUND/NEEDS_PLATFORM_
  SPECIFIC_CONFIRMATION/NEEDS_STRUCTURAL_ENGINEER_REVIEW. Research Map
  snapshot + queue updated; **next = Gate 07 (weight/axle/CG)** with the
  owner's verbatim prompt captured.
- PATS "bypass" language did not recur. Nothing ingested; nothing
  Confirmed; no compliance claim; no "vehicle is safe"; ODRs untouched.

## 2026-07-16 — Owner directive_01: park-and-proceed; Blocked Questions Ledger + gate research queue

- Owner operating directive ("do not sit and wait on emails"): mark
  Gate 04 BLOCKED_PENDING_SUPPLIER_RESPONSE, park supplier-only values,
  and keep researching supplier-independent work. Archived 1:1 at
  `docs/research/raw/owner_directives/directive_01_park_and_proceed.md`.
- New **Blocked Questions Ledger** (`docs/status/BLOCKED_QUESTIONS_LEDGER.md`,
  owner's 8-field structure) — BQ-01..BQ-12 parking every current
  supplier-only value (ZF hydroboost+steering, ZF current/duty/thermal/
  control, Ford pump curve, steering-gear demand, accumulator reserve,
  panic-brake displacement, manual-steering torque, and the Webasto/Dana
  powertrain items B-003/B-004), each with a follow-up date and an
  allowed alternative-research path.
- New **Gate Research Queue** (`docs/roadmaps/GATE_RESEARCH_QUEUE.md`) —
  the owner's ordered plan **04B → 04C → 05 → 06 → 07 → 08** with the
  verbatim research prompts for 04B, 04C, 05, 06 (07/08 prompts pending).
- New **Gate 04C** (EHPS low-voltage / DC-DC architecture) added to the
  Research Map roadmap; the stale "next expected batch" pointer updated
  from the (already-processed) modeling-frameworks payload to the
  **Gate 04B** validation-test payload.
- Decision **D-005** recorded (park-and-proceed operating rule +
  ledger + ordered queue). Nothing ingested; nothing Confirmed; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 24 + review_21: Gate 04 v0.4 supplier-inquiry prep + regression catch

- Archived batch_24 (supplier-inquiry prep) and review_21 1:1 (commit
  `5abd8a8`). **No new sources** — the batch re-cited ZF (CS-53) and
  Lee (CS-51) and prepared two supplier packets.
- **Regression caught (owner):** the payload re-asserted two claims
  already corrected in review_20 — "6000 RPM CAN control" (the ZF
  factsheet says "No connection to the CAN bus required"; the ZF Q9
  also again demanded a `.dbc` file) and "Designed for commercial
  vehicle validation" (ZF is a motorsport pump). Both re-corrected;
  RC-83 and RC-84 updated with recurrence markers. This is the **second
  corrected-claim recurrence** in the project (after the PATS "bypass"
  language, batches 20→21) — recorded as the leading use-case for the
  proposed M10 corrected-claim regression scanner.
- Re-affirmed unchanged: Lee = FordStyleHydroboostPumpReference /
  NeedsFordExactSource; power ~2.5–3.3 kW / ~250–300 A stays
  EngineeringEstimate / NeedsZFCurrentMap (do NOT hard-code 250–300 A);
  FMVSS 105 needs a brake-engineer test plan before any compliance claim.
- **Gate-state transitions (owner):** Gate 04 flags set —
  `CANDIDATE_EHPS_FOUND` / `FINAL_SELECTION_HALTED` /
  `BLOCKED_PENDING_SUPPLIER_RESPONSE` (stays v0.4). New sub-gate
  **Gate 04B = FMVSS 105 brake test mapping + loaded low-speed steering
  test procedure** — the next research target ("not more generic
  hydroboost").
- Outreach: ZF packet already drafted (`SUPPLIER_INQUIRY_ZF_01.md`);
  new Ford/Lee/steering-specialist packet drafted
  (`SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`, DRAFT). Both await owner
  approval — sending is an owner action.
- PATS "bypass" language did not recur. Nothing ingested; nothing
  Confirmed; ODRs untouched.

## 2026-07-16 — RH batch 23 + review_20: Brake/Steering Gate v0.4 (complete EHPS candidate)

- Archived batch_23 (complete EHPS candidates) and review_20 1:1
  (commit `0508bce`). Owner label adopted: **Brake/Steering Gate
  v0.4** — architecture strong, a **complete** EHPS candidate now
  exists, but the replacement system is not proven and final selection
  is halted.
- New rows CS-53 (ZF EPHS MPU 100-C — **first complete EHPS
  candidate**; CompleteEHPSCandidate / MotorsportSupplierCandidate /
  NeedsCommercialDutyReview / NeedsHydroboostCompatibilityReview /
  NeedsCurrentMap / NeedsThermalDeratingData), CS-54 (Ford.com power-
  steering return-line hose — FordProductReference / NeedsFordExactSource
  / NeedsExactQuote); RC-82 (ZF hydraulic envelope 1.32–3.17 GPM /
  113–124.5 bar / 2500–6000 rpm), RC-83 (**defect-catch:** the batch's
  "CAN control" claim is refuted by the ZF factsheet's "No connection
  to the CAN bus required" → control/diagnostics = NeedsSupplierData),
  RC-84 (ZF is a **motorsport** pump, not proven commercial-duty),
  RC-85 (~2.5–3.3 kW / ~250–300 A → EngineeringEstimate /
  NeedsZFCurrentMap — do not size DC-DC from it alone), RC-86 (Ford
  hose corroborates ~1750 psi envelope but is not the pump curve),
  RC-87 (FMVSS 105 test map must cover partial-failure/fade-recovery/
  water-recovery/stability/parking-brake/warning-lamp, not just
  stopping distance). Section 31 added.
- Lee CS-51 reaffirmed (FordStyleHydroboostPumpReference /
  NeedsFordExactSource — not the native Super Duty spec).
- **Register cleanup:** removed an orphaned, truncated duplicate of
  section 28 (an earlier draft that had been appended after section 30
  and cut off mid-word); the canonical section 28 at its proper
  position is complete and unchanged. No evidence lost (raw evidence is
  under `docs/research/raw/`).
- ZF supplier packet (owner's 10 questions) drafted as
  `SUPPLIER_INQUIRY_ZF_01.md` (DRAFT, awaiting owner approval). Next
  research (owner): FMVSS 105 brake test mapping + loaded low-speed
  steering test procedure while supplier questions wait.
- PATS "bypass" language did **not** recur (second consecutive clean
  batch). Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-16 — RH batch 22 + review_19: Brake/Steering Gate v0.2 (EHPS pumps)

- Archived batch_22 (Gate 04 EHPS/hydraulic pumps) and review_19 1:1
  (commit `6a57c95`). Owner label adopted: **Brake/Steering Gate
  v0.2** — architecture problem proven, replacement system not yet
  proven. Hydroboost dependency mapped; vacuum path rejected; EHPS
  path confirmed correct; Ford-specific final values still missing;
  EHPS final candidate not selected.
- New rows CS-51 (Lee Power Steering — SupplierBackground /
  Ford-StyleComponentCandidate / NeedsFordExactSource; **not** the
  native Ford Super Duty spec), CS-52 (TRW 14-20358-010 —
  HydraulicPumpCandidate / NeedsElectricMotorDriveData; a pump end,
  not a complete EHPS); RC-79 (Ford-style 1750 psi / 3.25 GPM),
  RC-80 (TRW 2683 psi / 6.30 GPM / 25 cc-rev — "will not bottleneck
  or overheat" downgraded to NeedsEngineeringReview), RC-81 (DC-DC
  load linkage OpenGap / RuleInput — ~2–3.5 kW → ~160–290 A at 12 V,
  loops Gate 04 back to Gate 01 low-voltage architecture). Section 30
  added to the filter register.
- Owner's corrections applied verbatim: Lee and PartsForHotRods
  sources downgraded off "final Ford rule"; TRW kept as a hydraulic
  pump end only; simultaneous brake+steering demand promoted as a
  NoGoConditionCandidate; vacuum-pump rejection as RuleCandidate;
  eight OpenGaps carried (Ford pump curve, steering-gear req,
  accumulator reserve, complete EHPS pressure-flow-current map, EHPS
  duty/derating, DC-DC sizing, FMVSS 105 mapping, loaded low-speed
  steering test).
- PATS-language did **not** recur in batch_22 (held one batch after
  the review_17/review_18 escalation). Nothing ingested; nothing
  Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 21 + review_18: Brake/Steering Gate v0.1; PATS-language recurrence escalated

- Archived batch_21 (Gate 04 brake/steering) and review_18 1:1. Owner
  label adopted: **Brake/Steering Gate v0.1** — hydraulic dependency
  identified, vacuum-pump path rejected, EHPS path opened,
  Ford-specific data still missing. First CP#1 (physical-safety) gate.
- New rows CS-46..50, RC-74..78: combined brake+steering demand NoGo
  (RC-74 — owner's "biggest win"); general hydroboost minimums as
  EngineeringBackground/NeedsFordExactSource (RC-75); loss-of-assist
  and accumulator-reserve NoGo/Test candidates; EHPS LeadOnly path.
- Owner's 7 corrections applied: generic/aftermarket sources
  downgraded (NeedsFordExactSource); **TOP 2-2-607 rejected for Gate
  04 (self-citation error — it is a cooling doc)**; **FMVSS 105 added
  as the primary brake regulation lane** (CS-49); OpenGaps created.
- **PATS-language recurrence escalated:** batch_21 repeated "digital
  bypass frameworks for PATS" one batch after review_17 made it a
  standing rule — re-corrected; recorded as the leading candidate for
  an M10 forbidden-phrase scanner (bypass/override/defeat on
  anti-theft contexts + the Validated reserved-vocab check).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 20 + review_17: Cooling Modeling Framework v0.1

- Archived batch_20 (10-row modeling payload) and review_17 1:1. Owner
  label adopted: **Cooling Modeling Framework v0.1**
  (ModelingFrameworkCandidate; not validated/locked/selection-ready).
  First batch under the review_16 lane doctrine — held cleanly.
- New rows CS-39..45, RC-66..73: Bernardi (RC-66), I²R loss (RC-67),
  ε-NTU radiator (RC-68), Darcy-Weisbach (RC-69), two-state thermal
  (RC-70), tractive balance (RC-71), serial-loop principle (RC-72),
  TOP 2-2-607 test (RC-73) — all modeling/principle candidates, none
  component-selection-ready.
- Owner's 7 filter tasks applied: "validated baselines" prose rejected
  (RESERVED-vocab); **NeedsExactQuote** set on equation rows lacking
  verbatim quotes; Reddit → LeadOnly; towing article → FieldContext /
  NeedsBetterSource; thermal-runaway → anomaly detection (containment
  = OpenGap); **Gate 04 vacuum-pump → hydroboost/EHPS**; **Gate 05
  "PATS bypass" → authorized Ford-compatible integration** (standing
  terminology rule: never frame anti-theft work as "bypass").
- Permitted design-time modeling modules listed (framework specs only,
  no production code; wait for M10 + supplier data).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Owner follow-up (review_16): research-vs-supplier lane doctrine

- Archived review_16 1:1. Standing doctrine applied repo-wide:
  academic/scientific sources build modeling frameworks (statuses
  EngineeringBackground / AcademicPrincipleCandidate /
  ModelingFramework / NeedsSupplierData / NeedsPhysicalVerification;
  never Confirmed / FinalRule / BuildReady) — **they can never close a
  supplier gate**. 13 supplier-only closure items recorded.
- Gate label unified: HV wiring + powertrain + cooling →
  **BLOCKED_PENDING_SUPPLIER_DATA** (B-003/B-004) with the owner's
  allowed/not-allowed work lists.
- Gate roadmap 4–11 recorded in the Research Map; next expected batch
  = the 10-topic modeling-frameworks payload (impact vocabulary
  restricted to Model/Test/OpenGap/NominalAssumption).
- Supplier follow-up cadence (7 days post-send, then weekly) recorded
  in both outreach letters. (A scheduled in-session reminder could not
  be set autonomously — tool requires owner approval; cadence is
  tracked in the handoff instead.)
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 19 + review_15: Cooling Package Gate v0.1; "Validated" rejected

- Archived batch_19 (thermal framework) and review_15 1:1. Owner label
  adopted: **Cooling Package Gate v0.1** (architecture mapped,
  calculations halted, supplier thermal maps required; no
  pump/radiator/chiller picks).
- **Status-inflation escalation caught:** first "Validated / RuleInput"
  labels on unconfirmed supplier metrics — rejected; owner replacement
  labels applied; "Validated" flagged as a RESERVED term for the M10
  controlled-vocabulary check.
- Owner corrections 1–5 applied: 25–35 °C → ThermalTargetAssumption;
  10 l/min×N → hydraulic assumption (manifold-dependent); 65 °C inlet
  → NeedsOfficialDanaSource; **heat load = LOSSES, not output**
  (RC-65 CandidateRule; ~6.4 kW best-case fenced as illustration);
  TONFUL background / ISO 20653 LabProcedureRequired.
- New rows CS-38, RC-62..65 (Dana guide cooling metrics, Webasto
  thermal envelope — all sourceless); pump names lead-only; "CO200"
  designation unverified. Thermal addenda (9+10 owner-authored
  questions) appended to both outreach letters.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Owner follow-up (review_14): gate marked BLOCKED_PENDING_SUPPLIER_RESPONSE; cooling opens

- Archived review_14 1:1. Gate-closure correction applied: the
  question set does not close the powertrain gate — supplier replies +
  datasheets + engineering review do. B-003 carries the owner's gate
  label `BLOCKED_PENDING_SUPPLIER_RESPONSE` with the 16 required
  answer fields (8 Webasto / 8 Dana).
- **Dana/TM4 letter drafted** from the owner's field lists at
  `docs/research/outreach/SUPPLIER_INQUIRY_DANA_01.md` — status DRAFT,
  awaiting owner approval (sending is an owner action; Webasto letter
  remains READY_TO_SEND).
- **Active focus pivots to Cooling Package Gap Closure (Domain
  Priority Block 3)** per owner authorization — L6 checklist extended
  (incl. Cajon/mountain-grade heat load, underbody airflow,
  fan/radiator placement); mapping may proceed, sizing may not (same
  pending powertrain choices).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 18 + review_13: Webasto inquiry READY_TO_SEND

- Archived batch_18 (supplier-inquiry draft) and review_13 1:1;
  created `docs/research/outreach/SUPPLIER_INQUIRY_WEBASTO_01.md` —
  the owner's 9-question supplier-ready letter (READY_TO_SEND; sending
  is an owner action; replies archived 1:1 under
  `docs/research/raw/supplier_replies/`).
- Owner softenings applied — new defect flavor recorded (**commitment
  language**, outward-facing sibling of status inflation): "selected"
  → "candidate under evaluation"; "approve" → "application-approved
  configuration or integration guideline"; VIG "eliminates throttling"
  → "may reduce the bottleneck" ("no HV limitation" fenced); CAN ask
  upgraded to DBC/PGN/SPN/NDA.
- RC-61: VIG/VIG Plus figures (1,215 A cont / 1,400 A peak, 18 packs)
  — owner-corroborated, still sourceless (MissingSourceLink).
- Owner status block recorded (PowertrainCompatibility =
  BLOCKED_PENDING_SUPPLIER_REPLY; 5 OpenGaps). Dana/TM4 letter not yet
  drafted.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 17 + review_12: topology correction; B-004 filed

- Archived batch_17 (Powertrain Compatibility Check) and review_12 1:1.
- **Owner topology correction supersedes the batch's "3 packs
  minimum":** 800 V requires 2sNp series pairing → practical minimum
  4 packs (2s2p, ~160 kWh) = strongest minimum candidate; 1s3p/400 V
  risky (peak ≈663 A exceeds VIB 580 A); 2s1p underpowered. RC-60
  records the full corrected ranking as DerivedRiskAnalysis (lossless,
  unverified inputs, pending supplier approval + review).
- **B-004 INTERFACE_SELECTION_REQUIRED filed** (VIB vs VIG/VIG Plus —
  interface choice changes every current limit); B-003 extended with
  owner blockers 04–08 (topology, interface, minimum-voltage current,
  loss correction, weight/space/axle/cooling).
- RC-59: Pro 40 per-pack (55/112 kW) + VIB (380/580 A) figures —
  2nd consecutive sourceless batch; everything MissingSourceLink;
  RC-56's system figures superseded as apparently mislabeled.
- Supplier outreach package now 24 questions; "800V should be chosen"
  softened per owner; conduct watch item added (topology conclusions
  require series/parallel constraint checks).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 16 + review_11: powertrain candidates; B-003 compatibility blocker filed

- Archived batch_16 (Webasto CV Standard + VIB / Dana TM4 SUMO MD
  candidate profiles) and review_11 1:1.
- **B-003 POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED filed** (owner
  directive): face-value P=V×I check shows ≤60/100 kW available vs the
  130/250 kW Dana target (≈325/625 A needed at 400 V) — RC-58 records
  the arithmetic as a DerivedRiskFlag; component selection everywhere
  stays blocked until configuration is established and reviewed.
- New rows CS-36/37 + RC-56/57 — all values NeedsExactSource: batch_16
  delivered a **sourceless data matrix** (zero URLs/quotes — 5th
  defect variant, wholesale provenance failure); Webasto data
  additionally flagged **LegacyCandidate** (Standard Battery Pro 40
  successor question).
- Owner downgrades applied (VIB currents, coolant figures, Dana DC
  specs, S-Box pre-charge, J1939 claims); 20 supplier questions
  recorded as the first external-outreach work package.
- Next payload: the Powertrain Compatibility Check (owner prompt).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 15 + review_10: HV Wiring Package v0.1; pivot to powertrain definition

- Archived batch_15 (HV Wiring Decision Matrix, 10×7, all rows
  OPEN/Halted) and review_10 1:1. No new sources/claims — matrix
  references only registered rows; accepted as candidate decision
  logic **v0.1** (owner label: architecture mapped, families
  identified, blockers documented, selection halted, review required).
- Corrections binding on the matrix: "hard-coded" → "decision logic is
  mapped"; "selection locked" (3rd recurrence); **"peak phase demand"
  → "DC link continuous and peak current demand"** (battery DC side ≠
  motor phase side — technical correction); Sendyne "hard danger
  boundary" re-fenced (2nd recurrence).
- Recurrence ledger recorded for future M10 mechanical checks;
  Metrel mislabel absent this batch (improvement).
- Phase pivot: L5 HELD at v0.1; active research focus →
  **powertrain definition (L9/L6)** with the owner's full extraction
  field lists (battery 14 / inverter 10 / motor 9 fields).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 14 + review_09 reconciled: connector ask closed; blocked-state benchmark

- Archived batch_14 (blocked-state Balancing Form + Amphenol HVBI) and
  review_09 1:1.
- CS-35/RC-55: Amphenol Excel|Mate HVBI — first official-server
  supplier document; connector ask closed at candidate level with the
  owner's dual-candidate structure (03R8 180 A vs 05R10 250 A; final
  choice blocked by battery + inverter current); HVBI keying satisfies
  the RC-39 mis-mate concern at supplier level.
- RC-52 updated: OD 15.8 mm + computed part-scoped bend envelopes
  (≥47.4 mm static / ≥94.8 mm dynamic — owner-verified arithmetic).
  Precedent recorded: derived values admissible only when both inputs
  are datasheet-sourced and the arithmetic is owner/engineer-checked.
- Conduct benchmark recorded: the Balancing Form's honest BLOCKED
  state ("an empty form honestly blocked beats a filled form
  dishonestly complete").
- Regressions re-corrected: Metrel/TONFUL RegulatoryCandidate labels
  (2nd occurrence — added to recurring-error watchlist) and "Candidate
  selection locked" language.
- Research Map: L5 next step = owner's HV Wiring Decision Matrix
  prompt; framing question recorded (which pack/inverter?).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 13 + review_08 reconciled: pre-charge math + 50 mm² cable

- Archived batch_13 and review_08 1:1. Delivered 5 of the owner's
  6-item ask; HV connectors remain the only untouched item.
- New rows: CS-30/RC-50 Miba pre-charge formulas (CandidateRule —
  resistor selection stays OpenGap); CS-31/RC-51 TE Mini K pre-charge
  relay (**voltage-suitability OpenGap: 400 VDC contact / 450 VDC max
  switching vs unknown pack voltage**); CS-32/RC-52 Coroflex 50 mm²
  datasheet (closes the 50 mm² gap at candidate level; supplier's own
  suitability-testing disclaimer recorded); CS-33/RC-53 TONFUL IP
  explainer (TechnicalBackground; ISO 20653 stays the gate);
  CS-34/RC-54 Metrel MI3132 (**InstrumentationCandidate /
  TestMethodCandidate** per owner — 4-wire Kelvin ≥1 A method).
- All 7 owner corrections applied, incl. status-language reversion
  ("Marked Closed" → partially sourced; "selection locked" → selected
  for evaluation) and rejection of Sendyne "absolute" phrasing.
- Conduct: status-inflation language identified as the dominant
  residual defect (4th packaging-drift variant); none entered the
  register. Research Map L5 → CANDIDATE ARCHITECTURE STAGE.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 12 + review_07 reconciled: main-fuse lane + GTR 20

- Archived batch_12 (HV wiring datasheets) and review_07 1:1.
- New rows: CS-26/RC-46 Eaton EV fuse catalogue (real main-fuse family
  lane — no size selected until upstream data exists); RC-47 EV200
  make/break duty → **pre-charge NO-GO candidate** (650 A max make,
  80–90% completion before close; owner correction: curves set the
  completion target, they do NOT size the resistor — sizing stays
  OpenGap); CS-27/RC-48 Coroflex 35 mm² datasheet (part-scoped
  rules/metrics); CS-28/RC-49 UNECE GTR 20 (first official-server
  standard PDF; ≤0.1 Ω bonding Test+Metric candidates, p.60);
  CS-29 ISO 20653 path opened.
- Held: unsourced matrix cells (50 mm² bend radius — cross-gauge
  transfer forbidden; Amphenol connector — no datasheet; pre-charge
  relay — conflated cell). Same defect family as batch 11.
- New standing reconciliation flag: GTR 20 ≤0.1 Ω bonding vs FMVSS
  <0.2 Ω exposed-part figures are context-distinct — never merged.
- Research Map L5 updated to the owner's narrow 6-item remaining ask.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 11 + review_06 reconciled: first component candidates

- Archived batch_11 (component-level HV wiring) and review_06 1:1.
- New SupplierCandidates: Coroflex 9-2611/6.0 mm² cable (CS-23/RC-43 —
  first datasheet-sourced bend radius, **part-number-scoped**: 3× OD
  static / 6× OD dynamic for this cable only), Kilovac EV200 contactor
  (CS-24/RC-44, held behind 9-item needs list), Eaton EV **auxiliary**
  fuse (CS-25/RC-45 — batch's "Traction" title corrected; main
  traction fuse remains OpenGap). Sendyne gains
  NeedsCANProtocolDocument.
- Owner's authoritative 13-row HV wiring status table recorded
  (section 18); L5 status → PARTIALLY CLOSED with 8-item hole list;
  owner directive: do not move to cooling until closed.
- Conduct: review_05 corrections took hold in one batch; residual
  defect = row-title inflation / matrix-cell overreach (caught).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 10 + review_05 reconciled: universal isolation threshold rejected

- Archived batch_10 (HV wiring gap analysis) and review_05 1:1.
- **Safety-relevant catch:** batch_10's "hard fault below 500 Ω/V"
  action rejected as a universal rule per owner correction. Register
  now carries split RegulatoryCandidates (RC-42): ≥500 Ω/V AC,
  ≥100 Ω/V DC, 500 Ω/V charge inlet, <0.2 Ω exposed-part bonding
  (context-scoped test candidate) — all locator-pending (B-002),
  final values gated on exact FMVSS 305a/eCFR extraction + ISO test
  mapping + engineering review.
- Downgraded: Feichun 6–8× OD bend radius → TechnicalBackground /
  preliminary routing screen only (CS-21/RC-40); EV Builder's Guide
  500 Ω/V → TechnicalBackground, superseded (CS-22/RC-41).
- Gap items promoted with owner statuses (NeedsSupplierData /
  PhysicalVerificationRequired / OpenGap / NeedsExactSource).
- Conduct note recorded: Hunter failure mode has shifted from fake
  sources to enforcement overreach in "next action" columns — watch
  that column. Numbering shift "10:175" noted.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 09 (HV wiring gap closure) + review_04 reconciled

- Archived batch_09 (first single-gap payload) and review_04 (owner
  gap-package checklists + gap-closure prompt template + verdict) 1:1.
- Owner instructions applied: Sendyne SIM100MLP promoted
  (SupplierCandidate/MetricCandidate — CS-20/RC-38, with the **100 Ω/V
  figure fenced**: datasheet safety discussion, not a system threshold
  until cross-checked vs FMVSS 305a / ISO 6469-3 / selected
  components); ALL Lectromec-derived rows (RC-27/28/39) downgraded to
  TechnicalBackground/NeedsExactSource; fifth Chilye rule candidate
  added (service accessibility); standing rejections extended.
- Candidate Build Engine items table added (3 RuleCandidates, 1
  MetricCandidate, 1 TestCandidate, 4 OpenGaps) — all pre-rule.
- Research Map updated: gap-closure mode with owner's execution order;
  L5 HV wiring EMPTY → PARTIALLY MAPPED with the 15-item still-missing
  list; detailed checklists recorded for all six gap packages.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 08 + owner review_03 archived and reconciled

- Archived batch_08 (first focused payload, gaps 1–6) and review_03
  1:1. Priorities 1/3/4 advanced; 2/5/6 honestly reported empty.
- Owner instructions applied verbatim: promoted Chilye MSD
  (SupplierCandidate + NeedsEngineeringReview), Brogen EHPS
  (SupplierCandidate / CP#1 candidate, EngineeringReviewRequired +
  PhysicalVerificationRequired), Ford Q-251R2 (CandidateSource for UIM
  behavior ONLY), ISO 6469-3 (CandidateSourcePath / NeedsExactSource);
  downgraded SAE J1742-via-Scribd (NeedsOfficialSource) and EV West
  EPS (BackgroundSupplier / WrongPlatformRisk).
- UIM inference split: "PCM delete requires mimicking 28 messages"
  recorded as unsupported inference (EngineeringReviewRequired /
  MISSING_SOURCE) — no claim row created; UIM-behavior quote promoted
  as RC-36.
- New rows CS-14..CS-19, RC-32..RC-37; MSD candidate rules recorded
  component-family-scoped; supplier numbers fenced as non-design
  values; CP#1 10-item missing list recorded on CS-17.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 07 + owner review_02 archived and reconciled

- Archived batch_07 ("Comprehensive Research Discovery Map") and the
  owner verdict (review_02) 1:1 (same-message delivery noted).
- Owner directives applied: batch-07 FMVSS row marked
  `NeedsURLCorrection` (2025-02584 is the wrong FR document — verified
  citations CS-02/CS-03 stand); Lectromec stays TechnicalBackground/
  NeedsExactSource; xr793 mirror lead-only; EngineCert background-only/
  NeedsSupplierData.
- New sources CS-10 (Q-356R2 — first Super-Duty-specific OEM document
  path), CS-11 (HVIP Solicitation 2026-03), CS-12/CS-13 (third-party
  mirror / background explainer — held as leads). New claims RC-30 (Q-356R2 MIL/box-
  removal — CP#2-relevant), RC-31 (Appendix C reference — **B-vs-C
  discrepancy flag** vs RC-25).
- Regression flagged: NPRM "Proposed…" quote under a Final Rule title
  (third proposal/final mix). Third bend-radius variant fenced.
- Owner's six focused research priorities added to the Research Map.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 06 archived and reconciled (first lane-bucketed batch)

- Archived batch_06 ("Deep-Dive Source Payload") 1:1.
- Register: RC-01 completed with full CARB applicability quote (MY2021+,
  "may be certified" nuance flagged); RC-04 summary language attributed
  to 90 FR 9609 (confirms §9 splice finding); added CS-08 (Lectromec
  J1673 review — secondary, LeadOnly-class) and CS-09 (Transit BEMM via
  **unofficial mirror** — provenance concern, official copy required);
  added RC-27..RC-29 (cable-sizing factors, splice avoidance,
  cross-member rule with cross-match flag).
- Held: FR doc URL 2025-02584 (conflicts with verified 2025-02582);
  second CARB PDF URL (governing-version question opened); derived
  Sept-1-2029 compliance date (arithmetic + unestablished alterer
  classification); cert-family-split inference; zero-splice rule
  proposal; 6×–8× bend multiplier (contradicts batch_05's fenced
  4×/6× — both fenced).
- All rows lane-bucketed per the Research Map (first batch under the
  lane system). Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Research Map established (10 required lanes)

- Added `docs/research/RESEARCH_MAP.md` per owner instruction: L1
  OEM/Ford, L2 regulatory/certification/incentive, L3 core EV
  conversion engineering, L4 mechanical/structural/bracket/frame/
  fatigue, L5 electrical/HV wiring, L6 battery/BMS/thermal, L7
  controls/CAN/diagnostics, L8 quantitative modeling/simulation, L9
  supplier data, L10 physical truck measurements — all required, none
  optional. Quantum-inspired optimization fenced as FUTURE ONLY
  outside the numbered lanes.
- Standing rules encoded: quantum cannot approve engineering; sim
  cannot replace physical proof; academic → PrincipleCandidate unless
  tied to Rule/Metric/Test/NoGo; supplier datasheets →
  NeedsVerification; OEM/regulatory outrank academic; full claim field
  requirements.
- Current coverage mapped per lane (most lanes empty). Mapping gaps
  escalated to owner: L2 regulatory module (standing), L4 mechanical
  module (new gap), L6 battery/thermal module (new gap), L9 lane-name
  truncation ("Supplier b") to confirm.

## 2026-07-15 — System Audit 01 recorded

- Added `docs/audits/AUDIT_01_2026-07-15_SYSTEM_STATUS.md`: full
  status check against what verifiably exists. Headlines: repo safety
  PASS; build/database/StageGate/M8/FinalVerification NOT PRESENT (no
  software exists — expected in ingestion phase); research ingestion
  PASS at document level (7 CS / 26 RC rows, 0 Confirmed, 4 guardrail
  catch types with evidence); forbidden-language scan: docs PASS,
  **index.html FAIL** (certified/warranty/turnaround/pricing claims
  unsupported by any evidence); scope mismatch flagged — audit brief
  references an `elektron-os-clean` repo that does not exist here
  (owner decision required); verification debt (B-002) and
  self-verifying-agent risk recorded.
- No files outside `docs/audits/` modified; nothing marked Confirmed;
  ODRs untouched.

## 2026-07-15 — Handoff protocol amended (D-004)

- Added operational fallback triggers (batch completed / meaningful
  commit / two hours / unresolved contradiction / dirty tree before
  agent switch) so continuity does not depend on predicting usage
  limits.
- Added branch single-writer rule with `Agent owner` field in the
  handoff (template + live handoff updated; receiving-agent checklist
  now verifies ownership first). Mirrored in AGENTS.md, the Cursor
  rule, and AI_INSTRUCTIONS.md.
- Handoff validity hashes deferred to M10 start (recorded in AGENTS.md
  and the M10 roadmap; not implemented now, per owner instruction).

## 2026-07-15 — Owner review of batch 05 archived and applied (verdict: filter yes, ingestion no)

- Archived `docs/research/raw/owner_reviews/review_01_batch_05_verdict.md`
  1:1 (citation markers stripped in transit noted in provenance).
- Applied owner instructions: per-claim statuses explicit;
  `NeedsVehicleSpecificBBLB` vocabulary adopted; CS-07 scope corrected
  to general Ford guidance (not Super Duty); FMVSS rows fenced to
  "requirements must be mapped" (never "we comply"); HVIP rows fenced
  to "path requires EO/eligibility review" (never voucher promises).
- New owner-relayed candidate claims RC-22..RC-26 (frame-rail web
  drilling limits, flange welding prohibition, HVIP ZEV Conversions
  section, Appendix B exemption-EO requirement, fleet-class
  restriction) — all locator-pending, unusable until located.
- Frame-rail downgrade upgraded `NeedsExactSource` →
  `NeedsVerification` + `NeedsVehicleSpecificBBLB` (content candidates
  on file; exact quote/page still required).
- Section 12 adds the owner-requested outputs: Rule/Metric/Test/NoGo
  candidate preview, holds, needs-vehicle-specific list, engineering
  review list. "Artifact Intake Form" noted as future step, not built.
- Still: nothing ingested, nothing Confirmed, no SQLite, no StageGate
  changes, ODRs untouched.

## 2026-07-15 — RH batch 05 archived and reconciled into filter register

- Archived batch_05 ("un-paraphrased data payload") 1:1.
- Register updates: RC-02 extended with EO-per-family clause; RC-07
  gains part 561 quote + Executive Summary locator; RC-08 upgraded to
  the full per-class DATES sentence — 2027/2028 structure resolved at
  candidate level (2027 ≤ 4,536 kg; 2028 > 4,536 kg), with the "For
  all other requirements" prefix flagged as an open nuance.
- New candidate claims RC-17..RC-21: BBLB cross-member prohibition,
  fastener grades, welding precautions (truncation flag), CARB §2.2.1
  ESS fragment (truncation flag), first HVIP Manual-internal quote
  (fleet-level access, not conversion eligibility).
- Section 11: frame-rail downgrade explicitly NOT upgraded (quote
  covers cross members only); J1673 "4×/6×" example multipliers fenced
  as non-values; hydroboost gains PhysicalVerificationRequired; PATS
  upgrade path named (real-vehicle CAN capture).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Delivery "4:75" verified as exact duplicate of batch 03

- Diff-verified byte-identical to `batch_03_finalized_output.md`; not
  duplicated on disk — receipt recorded in the raw archive's
  PROVENANCE.md, duplicate notice added to the filter file (section 10).
- No register changes; flagged to owner as possible mis-send.

## 2026-07-15 — RH batch 03 archived and reconciled into filter register

- Archived batch_03 ("Finalized Research Hunter Output" — the run the
  owner graded PASS) 1:1 under `docs/research/raw/research_hunter/`.
- Filter register updates: candidate citation **89 FR 104318** attached
  to CS-02 (missing-source 3 candidate-resolved); RC-08/RC-09 now carry
  Hunter-supplied DATES-section quotes and locators (verification flags
  remain — B-002); RC-10 locator set to 90 FR 9609 DATES; RC-09 scope
  widened to include small-volume manufacturers per the quoted text.
- Section 9 reconciliation: rejected sentence did not recur; NPRM
  framing and date conflation superseded; flags recorded for the
  spliced Claim-1 paraphrase, the BBAS title/URL mismatch, the dropped
  (but retained) Appendix B locator, the deferred Part 561 template
  next-action, and the non-authoritative "un-hallucinated"
  self-assessment.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 02 archived and reconciled into filter register

- Archived batch_02 ("Strict Technical Source Map") 1:1 under
  `docs/research/raw/research_hunter/`; PROVENANCE updated.
- Filter register updates: added CS-06 (FMVSS 305a NPRM —
  supplementary, proposal-stage only) and CS-07 (Ford General BBLB);
  attached Hunter-supplied quotes as **candidate locators** to
  RC-02/RC-03 (CARB cert-family, monitoring/diagnostics), RC-09
  (NPRM corroboration), RC-11 (FAQ verbatim); added RC-13..RC-16.
- Section 8 reconciliation: re-rejected the recurring broad incentive
  sentence; rejected the "Sept 1, 2027 effective date" conflation
  (effective date was 2025-03-20 per delay notice; 2027-09-01 is
  mandatory-applicability language — RC-08 flag stays open); rejected
  the ELK-BuildEngine-Doctrine-StageGate.pdf upload suggestion as a
  research action (internal doctrine enters only via owner ingestion).
- Missing-source list: added hydroboost bracket metrology
  (measurement-only) and ISO 6469-3 alternate; sharpened the UIM item.
- All Hunter quotes remain unverified against source PDFs (B-002);
  nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Raw RH-01 Research Hunter output archived 1:1

- Archived the raw RH-01 "Research Map & Candidate Ingestion" document
  unchanged at `docs/research/raw/research_hunter/batch_01_research_map.md`,
  with `PROVENANCE.md`; resolves missing-source item 1 of the RH-01
  filter file.
- Added delta-review addendum to `RH01_SECOND_STAGE_FILTER.md`:
  rejected the *Internal NDA* supplier-datasheet row (unverifiable
  values — potential invented engineering values), the Hunter's
  self-asserted "filter evaluation" and direct-ingestion routing, and
  the raw document's incorrect FMVSS 305a subtitle; retained "Appendix
  B" as a candidate locator for the HVIP claim; listed unfiltered
  candidate topics (HVIL, UL 2580, fasteners, IVM/SVE, BAR/DMV, ACF,
  hydroboost CP#1, metrology, QUBO-future-only).
- Still nothing ingested into rev07; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH-01 second-stage research filter output recorded

- Added `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`:
  5 CandidateSource rows (CARB ZEP procedure; FMVSS 305a final rule;
  FMVSS 305a delay notice, 90 FR 9609–9610; HVIP FAQ/Manual as
  RegulatoryCandidate; Ford BBAS as CandidateSourcePath), 12 candidate
  claim rows (none Confirmed), 4 claims kept downgraded, 2 rejections,
  missing-source list, next-action list.
- **Nothing ingested into rev07; no database writes; ODRs untouched;
  SourceClaims.md untouched.**
- Filed B-002: verbatim .gov/CARB source extraction blocked by the
  current environment's network policy.

## 2026-07-15 — Cross-agent handoff protocol installed (D-003)

- Added `AGENTS.md` (cross-agent rules) and
  `.cursor/rules/elektron-build-engine.mdc` (Cursor mirror) — Claude
  Code and Cursor use the same handoff format.
- Added `docs/handoffs/`: `CURRENT_HANDOFF.md` (initialized with real
  repository state), append-only `HANDOFF_LOG.md`, and
  `templates/HANDOFF_TEMPLATE.md`.
- Added `docs/status/`: `CURRENT_PHASE.md` (phase source of truth),
  `IMPLEMENTATION_LEDGER.md` (claimed vs verified; L-001),
  `BLOCKERS.md` (B-001).
- Wired the protocol into `CLAUDE.md`, `docs/AI_INSTRUCTIONS.md`, and
  the README layout map.
- No specification content ingested; no production code; ODRs remain
  Open.

## 2026-07-15 — Revision 07 modularized; ingestion phase opened (D-002)

- Split Revision 07 into modules `docs/specifications/rev07/00..12`
  (all shells, status `AWAITING SOURCE INGESTION`); `Revision_07.md`
  is now the ACTIVE_SPECIFICATION index over them.
- Added `roadmaps/REV07_SOURCE_INGESTION.md` — current phase: per-batch
  archive → consolidate → extract procedure, consolidation quality bar,
  and the ODR-001..ODR-003 resolution gate (requires explicit owner
  approval).
- Added `docs/research/raw/` archive with immutability rules.
- Updated README baseline (Current Phase → Revision 07 Source Ingestion
  and Consolidation), AI_INSTRUCTIONS and CLAUDE.md roadmap pointers,
  and M10 entry conditions.
- ODR-001..ODR-003 remain **Open**; register now carries the resolution
  gate.

## 2026-07-15 — Documentation structure established

- Restructured repository documentation: README reduced to an entry
  point; doctrine moved under `/docs`.
- Added Engineering Constitution (Articles I–VIII).
- Added AI Instructions (permanent operating manual for AI tooling).
- Added Decision Register (D-001) and this Changelog.
- Added `specifications/Revision_07.md` as `ACTIVE_SPECIFICATION`
  (governance shell; doctrine content to be imported — see
  OpenDataRequirements ODR-001..ODR-003).
- Added roadmaps: `M10_IMPLEMENTATION.md` (current),
  `M11_OPEN_DATA_REGISTER.md` (deferred).
- Added research registers: `OpenResearchRegister.md`,
  `SourceClaims.md`.
