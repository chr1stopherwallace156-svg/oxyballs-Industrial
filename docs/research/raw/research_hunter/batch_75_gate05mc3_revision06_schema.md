# Research Hunter — batch 75 (owner label "73:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). The owner framing ("QUESTION TOLD", re-issued
> review_70 corrections) and the owner verdict ("My response … 20 items") are
> archived separately at `../owner_reviews/review_71_batch_75_verdict.md`.
>
> NOTE ON THIS DELIVERY: the Hunter emitted **"Global Engineering Safety
> Amendments (Revision 06)"** TWICE in the same message — a first, cleaner copy
> (correct LaTeX `L_min`, full `PHYSICAL_MOVEMENT_BLOCKED` list, correct hard
> validation constraints, correct `ZeroRegenEnvelope` dimensions, complete
> IndependentSensorHealthResult failure action) and a second copy carrying OCR
> corruption ("Umin"/"Lworst_case_coastor.stop"/"containment margin",
> blank-bullet block conditions "* * * * * * *", "maximum_speed.value > O",
> an unfinished negative-torque constraint, and the wrong "Revalidation
> Requirements" text pasted into the zero-regen section). The owner's verdict is
> written against the corrupted copy. Both copies are the Hunter's; the
> authoritative Revision-07-equivalent lives in the deliverable
> `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`.

---

## Owner framing (chat, label "73:75") — QUESTION TOLD (re-issued review_70 corrections)

Re-issues review_70 items 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16 (units +
validation constraints; typographical field corruption; `allowed_steering_band`
bounded record + angle frame; unit enum + canonical SI; authorization activation
rules + single-ACTIVE; E-stop telemetry raw trace; IndependentSensorHealthResult;
deterministic three-axis steering resolution; per-state steering recovery;
FaultExecutionAuthorization lifecycle fields; paired faults keyed by exact fault
IDs; database foreign-key enforcement) plus the summary "final pass" list
(1 repair corrupted text/equations · 2 fill missing overlap + hard-block logic ·
3 normalize every field name · 4 canonical units/conversions · 5 activation +
expiration rules · 6 separate authorization completion from execution completion ·
7 prevent unsigned procedure approvals · 8 formalize sensor health · 9 deterministic
steering-state resolution · 10 complete single-fault authorization lifecycle
fields · 11 exact fault IDs in paired faults · 12 enforce database relationships ·
13 add the scope/no-claim rule). These are the RC-383..397 corrections already
applied to the deliverable at Revision 06.

## RESEACHER RESPONSE — Global Engineering Safety Amendments (Revision 06)

The Hunter's Revision 06 amendment applies the RC-383..397 architecture as a
relational-database specification, in seven sections:

- **Section 1 — Track Length, Summation Integrity & Runout Aggregation:** the
  7-term `L_min` (first copy correct LaTeX; second copy OCR-corrupted); the
  `DistanceComponent` schema with `RunoutCalculations_ID` FK + `included_within_component_id`
  self-FK; boundary geometry validation (`zone_end >= zone_start`,
  `distance_component_value ≈ zone_end − zone_start` within `uncertainty_m`); the
  INCLUDED_IN_OTHER_COMPONENT / INCLUDED_SEPARATELY resolution rules (host EXISTS +
  same `RunoutCalculations_ID`); the `RunoutAggregationResult` archetype
  (`authorization_status [DRAFT | SIGNED_RELEASE | REVOKED]`, `calculation_hash`
  SHA-256); `PHYSICAL_MOVEMENT_BLOCKED` conditions (first copy full; second copy
  blank-bullet corrupted).
- **Section 2 — Unified Engineering Units and Database Validation:** the
  `TypedNumericField` (value/unit-enum/authority_class/source_artifact_id/
  uncertainty/effective_revision); the 22-value unit enum + canonical-SI
  conversion before comparison; the `AllowedSteeringBand` schema (min/max angle in
  rad, `reference_frame [STEERING_WHEEL | ROAD_WHEEL | DERIVED_ROAD_WHEEL]`); the
  full `TestCellAuthorization_ID` schema with typed fields + `activation_timestamp`;
  the hard validation constraints (first copy correct; second copy "> O" +
  unfinished negative-torque).
- **Section 3 — State Machines & Transition Validation:** the DRAFT →
  APPROVAL_REQUIRED → AUTHORIZED → ACTIVE → {SUSPENDED | COMPLETED | REVOKED} →
  SUPERSEDED diagram; activation rules (before expiry · ConfigurationPacket
  unchanged · RunoutAggregationResult SIGNED_RELEASE · env/thermal valid ·
  prior-cell SIGNED_PASS · ProcedureApproval active+signed · personnel assigned ·
  emergency/containment ready); single-ACTIVE constraint; the
  `AuthorizationTransition_ID` schema; the SUSPENDED→AUTHORIZED revalidation set.
- **Section 4 — Result Sign-off & Evidence Preservation:** status segmentation
  (Authorization still listing COMPLETED / Execution / Result); the gate-clearance
  rule (COMPLETED or EXECUTED SHALL NOT clear a gate; only SIGNED_PASS); the
  immutable-evidence / append-only rule.
- **Section 5 — Regenerative Command Baseline Residuals:** `ZERO_REGEN_REQUEST`
  command state; ±2 Nm `ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE` /
  NO_PASS_FAIL_AUTHORITY; ZeroRegenEnvelope dimensions (first copy correct; second
  copy pasted the wrong "Revalidation Requirements" text).
- **Section 6 — Gate 05M-C3 subgate sequence:** C3A-006 / C3A-008 (with the
  E-Stop Telemetry Log Split + `vehicle_stop_or_controlled_deceleration_result`
  single PASS/FAIL) / C3A-009B locked + pre-execution gates; C3C-007 +
  `IndependentSensorHealthResult` schema (first copy with the full
  UNKNOWN/INVALID_TEST failure action; second copy truncated); C3D three-axis
  steering resolution + recovery rules; C3E `FaultExecutionAuthorization_ID`
  schema (full lifecycle fields) + execution-domain progression + the
  `PairedFaultAuthorization_ID` schema — **note its `fault_1_component_id` /
  `fault_2_component_id` FK point to `DistanceComponent` (track geometry), which
  the owner flags as a relational error.**
- **Section 7 — Relational Database Integrity Rules:** the ER diagram
  (ConfigurationPacket → TestCellAuthorization → TestResult → Fault/Paired
  authorizations) + the explicit foreign-key list; the safety-scope / boundary
  limitation statement.

*(Full delivered text — including both Revision 06 copies and all ASCII schema
trees, the ER diagram and the state-machine diagram — is preserved as delivered.
The owner's verdict with 20 items is archived in review_71.)*
