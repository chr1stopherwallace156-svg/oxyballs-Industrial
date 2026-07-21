# Owner review_68 — verdict on batch 72 (Research Hunter "70:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is the
> owner's own review/verdict text. The raw Research Hunter payload (Gate 05M-C3
> Revision 04) is archived at
> `../research_hunter/batch_72_gate05mc3_revision04.md`.

---

MY RESPONSE

My verdict: Revision 04 is very strong and is now close to a controlled engineering baseline. The big architecture problems are largely resolved. What remains is mostly equation hygiene, database semantics, and preventing a few labels from accidentally implying authorization.
What is strongest now
You fixed several important issues cleanly:
Runout distance is calculated per test cell.
Overlapping distance components cannot be double-counted.
Test-cell boundaries receive separate authorization records.
Historical evidence is preserved after configuration changes.
C3A no longer depends on future C3B evidence for initial execution.
External path-tracking control authority remains locked.
Neutral behavior follows the supplier-defined propulsion envelope.
Steering-signal freshness uses timestamps/counters, not unchanged values.
Faults are assigned to SIL/HIL/static/lifted/moving execution domains.
Paired faults require hazard analysis, order and timing definitions.
The progression is becoming genuinely auditable:
ConfigurationPacket -> RunoutCalculations -> TestCellAuthorization -> Approved procedure -> Execution -> Evidence -> Result signoff -> Applicability/impact review after changes
That is the correct Build Engine chain.
Corrections still required
1. Correct the equation text
The formula currently contains transcription errors: Umin; Lworst_case_coastor.stop; containment margi
Use:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin
2. Do not erase a response value by "clamping it to zero"
This wording could make the record lose the original response-distance calculation: clamp L_response_allowance to zero
Better architecture: Every distance component retains its calculated or measured value.
The aggregation record separately defines whether that component is: INCLUDED_SEPARATELY / INCLUDED_IN_OTHER_COMPONENT / NOT_APPLICABLE / BLOCKED_PENDING_REVIEW
Add fields: distance_component_value; distance_component_method; included_in_L_min; included_within_component_id; overlap_review_status; overlap_review_approver
Example: L_response_allowance = 2.4 m; included_in_L_min = false; included_within_component_id = L_worst_case_coast_or_stop
This prevents double-counting without destroying the underlying value.
3. The overlap rule must cover more than response allowance
These may overlap: planned braking target; foundation-brake stopping distance; worst-case coast/stop allowance; driver response distance; control response distance; post-target runout; containment margin
Add: Distance Accounting Integrity Rule — Every physical meter may be counted only once in the L_min summation. Each component must declare its start boundary, end boundary, calculation method and overlap relationship with all other components.
A useful component schema: component_id; zone_start_reference; zone_end_reference; distance_m; method; uncertainty_m; included_in_total; parent_component_id; overlap_status; proof_artifact_id; authority_status
4. Finish the immutable ledger lifecycle sentence
The document currently ends this rule with: The life cycle for configuration deviations must follow a permanent, unalterable ledger: but the lifecycle is not shown.
Add: SIGNED_RESULT -> CONFIGURATION_CHANGE_DETECTED -> IMPACT_REVIEW_REQUIRED -> REUSABLE | PARTIALLY_REUSABLE | REPEAT_TEST_REQUIRED | INVALIDATED_FOR_CURRENT_CONFIGURATION -> REPLACEMENT_TEST_LINKED -> SUPERSEDED_FOR_CURRENT_CONFIGURATION
Important: Historical evidence remains immutable and searchable. Invalidated means unusable for the current configuration—not deleted.
5. Clarify the authorization lifecycle transitions
Add permitted transitions so software cannot jump directly from DRAFT to ACTIVE:
DRAFT -> APPROVAL_REQUIRED; APPROVAL_REQUIRED -> AUTHORIZED | DRAFT; AUTHORIZED -> ACTIVE | SUSPENDED | REVOKED; ACTIVE -> COMPLETED | SUSPENDED | REVOKED; SUSPENDED -> AUTHORIZED | REVOKED; COMPLETED -> SUPERSEDED; REVOKED -> SUPERSEDED
Also define:
ACTIVE: authorization is currently being used for one controlled execution session.
COMPLETED: the authorized execution scope has ended; result signoff remains separate.
REVOKED: authorization may no longer be used.
SUPERSEDED: a newer authorization replaces it, but the historical record remains.
6. Do not prefill procedure approvals unless signatures exist
The table is structurally correct now, but rows say: PAS = APPROVED_FOR_CONTROLLED_EXECUTION
That is only appropriate after an actual named approver, timestamp and revision signature exist.
Required fields: procedure_revision; procedure_approver_identity; approval_timestamp; approval_signature_record; approval_scope; approval_expiry
Until those exist: PAS: APPROVAL_REQUIRED; ES: NOT_EXECUTED; RSS: NOT_ELIGIBLE
7. Regeneration residual is correctly downgraded—but refine the rationale
You properly called +/-2 Nm an Initial Residual Candidate. Keep it strictly non-authoritative: ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE; NO_PASS_FAIL_AUTHORITY
Use this wording: Measured torque feedback, phase-current behavior and DC-bus current must remain within the supplier-defined or engineering-approved zero-regeneration tracking envelope.
I would remove "reactive field-weakening states" as a general justification unless your chosen inverter supplier documents that behavior in this low-speed test region. At low vehicle speed, field weakening may not be relevant.
8. C3A-006 is now correctly separated from C3B
One small improvement: C3A-006 should not claim "driver maintains braking control" without measuring pedal state, hydraulic pressure, assist availability and vehicle deceleration.
Use: Driver brake input, brake-assist state and hydraulic pressure remain within the approved C3A operating envelope throughout the event.
9. C3A-009B is correctly locked now
Add a formal block status: BlockReason: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED
And prerequisites: interface architecture approved; signal-integrity analysis complete; latency budget approved; stale/missing-data behavior approved; failure-mode analysis complete; independent control-authority review signed; HIL validation passed
10. C3C-007 needs independent physical-state evidence
Strengthen it: Loss of inverter communication is an unknown-state condition until independent evidence establishes torque/current behavior.
Evidence should include, as applicable: phase-current measurement; DC-bus current; motor acceleration/deceleration; shaft or wheel-speed response; inverter hardware fault output; contactor state where relevant
Do not rely only on a reported torque value from the link that just failed.
11. Steering STALE logic is now correct
Add one distinction: signal_validity_state; signal_freshness_state
A fresh signal can still be implausible, and an otherwise plausible value can be stale.
Suggested state evaluation: VALID_AND_FRESH; VALID_BUT_DEGRADED; IMPLAUSIBLE_BUT_FRESH; STALE; UNAVAILABLE
12. Fault-execution arrows must not imply automatic progression
This notation: HIL -> STATIC_VEHICLE_ONLY -> LOWEST_MOVING_CELL_ALLOWED could be misread as automatic authorization.
Add: Execution Domain Progression Rule — An arrow represents a possible review path, not automatic authorization. Each domain transition requires: prior-domain SIGNED_PASS; approved injection method; updated hazard analysis; valid runout calculation; active TestCellAuthorization; configuration lock; test-lead authorization
13. Some moving-fault categories need tighter limits
Brake-assist-not-ready: Moving execution is blocked by default. A moving test should only occur if engineering can simulate the status input without physically removing actual braking assistance.
Steering-assist-not-ready: DO NOT remove assist while moving. Any moving evaluation should use bounded logical status simulation while real steering assistance remains physically available.
Auxiliary-voltage low: A bounded supply test during movement needs minimum guaranteed brake-assist voltage; minimum guaranteed steering-assist voltage; independent supply protection; hardware undervoltage limits; abort threshold; recovery behavior. Do not let the test intentionally cross into actual loss of steering or brake assistance.
14. Add fault-injection ordering fields
Formalize: PairedFaultAuthorization_ID; primary_fault_id; secondary_fault_id; fault_order; inter_fault_delay_ms; injection_method; expected_state_sequence; abort_trigger; abort_owner; containment_method; allowed_execution_domain; active_test_cell; HazardAnalysis_ID; ConfigurationPacket_ID; RunoutCalculations_ID; required_approvers; status
The reverse ordering should be a separate record: LOW_VOLTAGE_THEN_CAN_LOSS != CAN_LOSS_THEN_LOW_VOLTAGE
Correct Build Engine status
Gate 05M-C3 — Revision 04
Status:
FORMAL_BASELINE_CANDIDATE
RUNOUT_EQUATION_PRESENT
RUNOUT_EQUATION_TEXT_CLEANUP_REQUIRED
DISTANCE_OVERLAP_ACCOUNTING_REQUIRED
RUNOUT_COMPONENT_METHOD_ENUM_DEFINED
TEST_CELL_AUTHORIZATION_SCHEMA_DEFINED
AUTHORIZATION_TRANSITION_RULES_REQUIRED
CONFIGURATION_LOCK_DEFINED
IMMUTABLE_EVIDENCE_PRESERVATION_DEFINED
LEDGER_LIFECYCLE_INSERTION_REQUIRED
REGEN_RESIDUAL_INITIAL_TARGET_ONLY
C3A_STRAIGHT_LINE_PROCEDURE_DEFINED
C3A_C3B_DEPENDENCY_RESOLVED
C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED
C3B_FOUNDATION_BRAKE_BASELINE_DEFINED
C3C_REGEN_FAULT_OWNERSHIP_DEFINED
C3D_SIGNAL_FRESHNESS_MODEL_DEFINED
C3E_EXECUTION_DOMAINS_DEFINED
C3E_DOMAIN_TRANSITIONS_REQUIRE_SEPARATE_AUTHORIZATION
MULTI_FAULT_AUTHORIZATION_SCHEMA_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
Bottom line
Revision 04 is excellent progress. The remaining corrections are highly specific:
1. Correct L_min equation transcription.
2. Preserve component values instead of zeroing overlap fields.
3. Add full distance-overlap accounting.
4. Insert the immutable result lifecycle.
5. Define allowed TestCellAuthorization status transitions.
6. Do not mark procedures approved without real signatures.
7. Keep +/-2 Nm non-authoritative and supplier-dependent.
8. Add formal blocking prerequisites to C3A-009B.
9. Require independent evidence after inverter communication loss.
10. Separate steering freshness from signal plausibility.
11. Make fault-domain arrows review paths, not automatic permission.
12. Formalize paired-fault order, timing and authorization.
After those changes, the correct designation is:
GATE_05M_C3_REVISION_04_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW
That means the controlled procedure architecture is ready for multidisciplinary engineering review. It does not mean any vehicle, calibration, brake system, regeneration strategy or moving fault test has physically passed.
