# Research Hunter — batch 74 (owner label "72:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). The owner framing ("Question TOLD", re-issued
> review_69 corrections) and the owner verdict ("My verdict … 17 corrections")
> are archived separately at
> `../owner_reviews/review_70_batch_74_verdict.md`.
>
> NOTE ON THIS DELIVERY: the Hunter re-emitted the Gate 05M-C3 material as
> **"Global Engineering Safety Amendments (Revision 05)"** — it applied the
> batch_73 corrections (RC-369..382) but the `L_min` equation is STILL delivered
> with OCR/transcription corruption ("Umin", "Lworst_case_coastor.stop",
> "containment margi") and several schema field names carry typographical
> corruption. The clean 7-term `L_min` equation and canonical field names are
> already correct in the deliverable `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
> (RC-340/351 and the RC-369..382 edits). The owner's verdict adds 17 further
> items before baseline lock.

---

## Owner framing (chat, label "72:75") — QUESTION TOLD (re-issued review_69 corrections)

2. Add units and validation constraints to authorization fields — every numeric
   field carries value · unit · authority_class · source_artifact_id ·
   measurement_or_calculation_uncertainty · effective_revision (e.g.
   maximum_speed: value / unit m/s / authority_class ENGINEERING_APPROVED /
   source_artifact_id). Hard validation: maximum_speed > 0; maximum_test_distance
   <= authorized_track_distance; maximum_positive_torque >= 0;
   maximum_negative_torque <= 0; authorization_expiry > activation_timestamp;
   RunoutCalculations.ConfigurationPacket_ID == TestCellAuthorization.ConfigurationPacket_ID.
3. The authorization state machine needs event records — AuthorizationTransition_ID ·
   TestCellAuthorization_ID · from_status · to_status · transition_reason ·
   actor_identity · timestamp · signature_record · linked_evidence; SUSPENDED →
   AUTHORIZED requires revalidation of configuration · runout · environment ·
   thermal state · procedure revision · authorization expiry.
4. COMPLETED does not mean passed — Authorization status = COMPLETED; Execution
   status = EXECUTED; Result status = SIGNED_PASS / SIGNED_FAIL / NEEDS_REVIEW /
   INVALID_TEST. Rule: COMPLETED SHALL NOT CLEAR A GATE. Only a matching
   SIGNED_PASS result may satisfy a gate requirement.
6. Add a runout aggregation result record — RunoutAggregationResult:
   RunoutCalculations_ID · ConfigurationPacket_ID · TestCellAuthorization_ID ·
   component_ids[] · calculated_L_min · available_track_length · remaining_margin ·
   overlap_check_result · unit_consistency_result ·
   required_component_completion_result · calculation_version · calculation_hash ·
   required_approvers · authorization_status. Hard block: available_track_length <
   calculated_L_min. Also block if remaining_margin < approved_minimum_margin;
   unit_consistency_result != PASS; overlap_check_result != PASS.
7. Add boundary ordering and geometry validation — zone_end_reference >=
   zone_start_reference; distance_component_value ≈ zone_end_reference −
   zone_start_reference within measurement tolerance. INCLUDED_IN_OTHER_COMPONENT ⇒
   included_in_L_min = false + included_within_component_id != null;
   INCLUDED_SEPARATELY ⇒ included_in_L_min = true + included_within_component_id =
   null; the database rejects inconsistent combinations.
8. "Completely unchanged" should mean immutable source evidence, not no
   annotations — Raw artifacts and signed result records are immutable;
   corrections, annotations, applicability changes, supersession records, and
   engineering interpretations must be appended as new linked records; they must
   never overwrite original evidence.
9. Regeneration residual needs operating-condition dimensions — motor speed ·
   DC-bus voltage · pack charge permission · inverter temperature · motor
   temperature · gear state · sampling/filtering mode · torque-estimator version ·
   firmware/calibration hash; replace "zero-torque profile" with "ZERO_REGEN_REQUEST
   command state".
10. C3A-008 should record separate outcomes — torque_inhibit_response ·
    phase_current_decay · inverter_state_transition · HV_isolation_response_if_required ·
    contactor_feedback_if_required · DC_bus_decay_if_required ·
    vehicle_coast_or_brake_response · fault_latch_behavior · automatic_retry_behavior.
11. C3C-007 wording should avoid "definitively" unless uncertainty is included —
    "independent evidence establishes torque/current behavior within the approved
    measurement uncertainty and detection envelope"; channel health: current probe
    range and calibration valid · DC-bus sensor valid · speed sensor valid · time
    synchronization valid · no saturation or dropped data.
12. Steering state evaluation needs precedence rules — deterministic precedence
    UNAVAILABLE > STALE > IMPLAUSIBLE_BUT_FRESH > VALID_BUT_DEGRADED >
    VALID_AND_FRESH, or validity + freshness computed independently and mapped
    through a decision table; must be deterministic.
13. Add recovery rules for steering faults — no steering fault state may
    automatically restore propulsion authority; recovery requires signal freshness
    restored · plausibility restored for approved stabilization interval ·
    fault-source review · approved recovery state transition · no active
    conflicting fault · test-lead authorization where required; latched faults
    require service clear.
14. Fault-domain progression needs an authorization record —
    FaultExecutionAuthorization_ID · fault_id · execution_domain · injection_method ·
    previous_domain_signed_result · HazardAnalysis_ID · ConfigurationPacket_ID ·
    TestCellAuthorization_ID · RunoutCalculations_ID · expected_response ·
    abort_conditions · containment_method · required_approvers · status.
15. Paired-fault schema needs result and lifecycle fields — allowed_execution_domain ·
    active_test_cell_id · injection_fixture_id · procedure_revision ·
    procedure_approval_status · execution_status · result_signoff_status ·
    authorization_expiry · configuration_impact_status · replacement_or_supersession_id;
    expected_response_sequence_map should be versioned and validated, not arbitrary
    ungoverned JSON.

## RESEACHER RESPONSE — Global Engineering Safety Amendments (Revision 05)

The structural rules within this amendment are permanently injected into the Build
Engine core validation logic, comprehensively overriding all previous definitions
for Gate 05M-C3.

### 1. Quantified Track Length Formulation & Summation Integrity

The absolute minimum physical track length (L_min) required to authorize a test
run must be explicitly evaluated for each RunoutCalculations_ID before track
movement is enabled using the following structural math model:

    Umin = Lacceleration + Lstabilization + Lbraking_target + Lworst_case_coastor.stop + Lresponse allowance + Lmeasurement uncertainty + containment margi

**Distance Accounting Integrity Rule** — Every physical meter of the test track
surface may be counted only once in the L_min summation. To eliminate geometric
compounding or double-counting errors without deleting underlying raw
calculations, every distance component must preserve its calculated or measured
value. Overlap accounting is managed strictly via separate aggregation variables.

Distance Component Schema:
- component_id (String)
- zone_start_reference (m)
- zone_end_reference (m)
- distance_component_value (m)
- distance_component_method [MEASURED | CALCULATED | SUPPLIER_DEFINED | ENGINEERING_APPROVED | INITIAL_TARGET_PROFILE]
- uncertainty_m (m)
- included_in_L_min (Boolean)
- included_within_component_id (String | NULL)
- overlap_review_status [INCLUDED_SEPARATELY | INCLUDED_IN_OTHER_COMPONENT | NOT_APPLICABLE | BLOCKED_PENDING_REVIEW]
- overlap_review_approver (String)
- proof_artifact_id (String)
- authority_status (String)

Data Integrity Constraint: If a downstream element (such as
L_worst_case_coast_or_stop) already incorporates driver and control response
latencies, included_in_L_min for the standalone L_response_allowance component must
evaluate to false, and its included_within_component_id must target the host
element ID. No RunoutCalculations_ID may authorize track movement if any required
distance component is flagged as MISSING_SOURCE, UNVERIFIED, or
INITIAL_TARGET_PROFILE_ONLY.

### 2. Test Cell Authorization States & Lifecycle Transitions

TestCellAuthorization_ID Archetype:
- Identification: [subgate_id, cell_number, TestCellAuthorization_ID]
- Hard Boundaries: [maximum_speed, maximum_positive_torque, maximum_negative_torque, maximum_torque_rate, maximum_jerk]
- Track & Operational Constraints: [maximum_test_distance, allowed_steering_band, allowed_regen_state, allowed_fault_set]
- Dependent Pre-Execution Locks: [RunoutCalculations_ID, ConfigurationPacket_ID, previous_cell_signed_result]
- Environmental Window: [thermal_state_requirement, surface/environmental_window]
- Governance: [authorization_expiry, required_approvers, status]

State machine: DRAFT → APPROVAL_REQUIRED → AUTHORIZED → ACTIVE →
{SUSPENDED | COMPLETED | REVOKED}; SUSPENDED → SUPERSEDED; COMPLETED → SUPERSEDED.

### 3. Immutable Evidence Preservation Ledger

A signed test result applies exclusively to the archived ConfigurationPacket_ID.
If any parameter changes, the system flags the previous status as
INVALIDATED_FOR_CURRENT_CONFIGURATION. Historical data is never deleted. Ledger
lifecycle: SIGNED_RESULT → CONFIGURATION_CHANGE_DETECTED → IMPACT_REVIEW_REQUIRED →
[REUSABLE | PARTIALLY_REUSABLE | REPEAT_TEST_REQUIRED |
INVALIDATED_FOR_CURRENT_CONFIGURATION] → REPLACEMENT_TEST_LINKED →
SUPERSEDED_FOR_CURRENT_CONFIGURATION.

Immutable Evidence Rule: Historical trace logs, execution vectors, and signed data
sets must remain completely unchanged and fully searchable within the archive.
INVALIDATED_FOR_CURRENT_CONFIGURATION states explicitly revoke authority to clear
downstream gates under the new configuration pack without destroying past baseline
evidence records.

### 4. Regenerative Command Baseline Residuals

All references to a regenerative braking disabled state specify a software command
structure outputting a zero-torque profile. Initial Residual Candidate: ±2 Nm
labeled ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE, NO_PASS_FAIL_AUTHORITY.
Authority Baseline: measured torque feedback, phase-current behavior, and DC-bus
current must remain within the supplier-defined or engineering-approved
zero-regeneration tracking envelope, dynamically controlled by active BMS
charge-power/current permissions, pack voltage ceilings, cell-voltage limits,
temperature states, and contactor conditions.

### Gate 05M-C3 subgate sequence (Hunter re-emit)

- **05M-C3A** — 10-row straight-line matrix (C3A-001..C3A-010); every non-locked
  row shows PAS APPROVED_FOR_CONTROLLED_EXECUTION / ES PENDING_EXECUTION / RSS
  NOT_ELIGIBLE; C3A-009B STRICTLY BLOCKED (EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED)
  with the seven pre-execution gates; C3A/C3B post-run correlation review after C3B
  SIGNED_PASS.
- **05M-C3B** — coast-down + foundation brakes, regen commanded zero-torque;
  C3B-004 brake override with minimal authorized propulsion, BOS-latency fault in
  HIL/bounded only.
- **05M-C3C** — restricted regeneration; Lane 1 independent coexistence observation
  only, Lane 2 coordinated blending STRICTLY BLOCKED; C3C-007 regen fault
  transition, "independent evidence definitively establishes torque/current
  behavior", ownership matrix Inverter/VCU/Build Engine.
- **05M-C3D** — steering signal evaluation across signal_validity_state and
  signal_freshness_state → VALID_AND_FRESH / VALID_BUT_DEGRADED /
  IMPLAUSIBLE_BUT_FRESH / STALE / UNAVAILABLE.
- **05M-C3E** — execution domain progression map (SIL_ONLY → HIL_ONLY →
  STATIC_VEHICLE_ONLY → LIFTED_WHEEL_ONLY → LOWEST_MOVING_CELL_ALLOWED →
  HIGHER_CELL_ALLOWED_AFTER…; arrows are review paths only, each needs prior-domain
  SIGNED_PASS + approved injection method + updated hazard analysis + valid runout
  calc + active TestCellAuthorization + configuration lock + test-lead
  authorization); L1/L2 fault escalation matrix with per-fault domains; moving
  fault containment limits (brake-assist / steering-assist / aux-voltage);
  PairedFaultAuthorization_ID schema (fault_1_component_id / fault_2_component_id /
  target_injection_order / inter_fault_timing_offset_ms / expected_response_sequence_map
  (JSON) / containment + verification hooks).

*(Full delivered text — including the ASCII state-machine and matrix diagrams — is
preserved as delivered. The owner's verdict with 17 corrections is archived in
review_70.)*
