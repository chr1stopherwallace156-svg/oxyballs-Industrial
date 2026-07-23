# Owner review_71 — verdict on batch 75 (Research Hunter "73:75", Gate 05M-C3 Revision 06 relational-schema amendment)

> Archived 1:1 as delivered by the owner (Constitution, Article I). Raw payload
> framing archived at `../research_hunter/batch_75_gate05mc3_revision06_schema.md`.

---

My verdict: Revision 06 is structurally mature and very close to specification freeze, but it still has several implementation-level defects that would cause ambiguous logic or broken database enforcement. The safety architecture is strong; the remaining work is primarily schema normalization, missing rule restoration, and status-model cleanup.

GATE_05M_C3_REVISION_06
FORMAL_BASELINE_CANDIDATE
NOT_READY_FOR_SCHEMA_FREEZE

What is now strong

You have a real deterministic chain:
ConfigurationPacket → RunoutCalculation → DistanceComponents → RunoutAggregationResult → TestCellAuthorization → ProcedureApproval → Controlled execution → TestResult → Fault authorization → Immutable evidence

Revision 06 correctly adds: Foreign-key relationships. Canonical units. Distance-overlap controls. Runout aggregation. Authorization activation prerequisites. Immutable transition events. Separation of execution from result signoff. Independent sensor-health validation. Steering-state resolution logic. Single-fault and paired-fault authorization. Explicit scope limitations.
That is much closer to a hard-coded engineering system than an AI-generated checklist.

Corrections required before freezing it

1. The L_min formula is still malformed
You still have: Lworst_case_coastor.stop / Lresponse allowance / containment margin
Use the exact canonical expression:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin
The software should reference canonical field IDs, never copied/OCR equation text.

2. The runout hard-block list is missing
This section currently contains blank bullets: Runout Execution Block Conditions: * * * * * * *
Insert the actual rules:
PHYSICAL_MOVEMENT_BLOCKED if:
- available_track_length < calculated_L_min
- remaining_margin < approved_minimum_margin
- overlap_check_result != PASS
- unit_consistency_result != PASS
- required_component_completion_result != PASS
- authorization_status != SIGNED_RELEASE
- ConfigurationPacket_ID mismatch exists
- TestCellAuthorization.status != ACTIVE
- any required component is MISSING_SOURCE
- any required component is UNVERIFIED
- any required component is INITIAL_TARGET_PROFILE_ONLY
- any required component is BLOCKED_PENDING_REVIEW
Without these, the aggregation record does not actually control movement.

3. Several validation expressions are corrupted or incomplete
Correct:
maximum_speed.value > 0
maximum_test_distance.value <= authorized_track_distance
maximum_positive_torque.value >= 0
maximum_negative_torque.value <= 0
authorization_expiry > activation_timestamp
RunoutCalculations.ConfigurationPacket_ID == TestCellAuthorization.ConfigurationPacket_ID
The current text includes O instead of zero and leaves the negative-torque constraint unfinished.
Also add:
maximum_test_distance.value <= available_track_length
maximum_test_distance.value <= calculated authorized movement envelope

4. Do not enforce final execution requirements when a record is still a draft
A DRAFT authorization may not yet have: activation_timestamp / authorization_expiry / source artifacts / signed approvers / previous result
Use status-dependent validation:
DRAFT: partial record permitted
APPROVAL_REQUIRED: all technical boundaries required
AUTHORIZED: all sources, approvals, runout and configuration links required
ACTIVE: all live environmental, thermal, personnel and containment checks required
Otherwise the database may reject legitimate draft creation.

5. COMPLETED still belongs in execution state, not authorization state
Your model currently contains: Authorization Status: ... ACTIVE | SUSPENDED | COMPLETED ... and a separate execution state.
Cleaner final model:
AuthorizationStatus: DRAFT / APPROVAL_REQUIRED / AUTHORIZED / ACTIVE / SUSPENDED / REVOKED / SUPERSEDED / EXPIRED
ExecutionStatus: NOT_STARTED / PENDING / EXECUTING / EXECUTED / ABORTED / COMPLETED
ResultStatus: NOT_ELIGIBLE / NEEDS_REVIEW / INVALID_TEST / SIGNED_FAIL / SIGNED_PASS
This removes the ambiguity of a "completed authorization."

6. Add EXPIRED
You have an expiry timestamp but no corresponding state.
AUTHORIZED → EXPIRED / SUSPENDED → EXPIRED when: current_timestamp >= authorization_expiry
An expired authorization cannot return to ACTIVE; it requires renewal or a superseding record.

7. Arrays weaken relational integrity
These fields are presented as arrays: component_ids / required_approvers / allowed_fault_set / linked_evidence / abort_conditions
In a relational database—especially SQLite—JSON arrays cannot provide strong normal foreign-key enforcement.
Use junction tables:
RunoutAggregationComponent (RunoutAggregationResult_ID, component_id)
TestCellRequiredApprover (TestCellAuthorization_ID, approver_role_id, approval_record_id)
TestCellAllowedFault (TestCellAuthorization_ID, fault_id)
AuthorizationTransitionEvidence (AuthorizationTransition_ID, artifact_id)
FaultAuthorizationAbortCondition (FaultExecutionAuthorization_ID, abort_condition_id)
This is necessary for the hard-data, non-AI architecture you want.

8. component_ids should not be stored as the source of truth
The aggregation components can be derived from the junction table and linked RunoutCalculations_ID.
Do not let a manually typed array determine what is included in L_min.
The calculation should use: DistanceComponent WHERE RunoutCalculations_ID = active ID AND included_in_L_min = true AND authority status is eligible
Then store the resulting component membership as a frozen calculation snapshot.

9. authority_status is still an unrestricted string
In DistanceComponent, define it explicitly:
authority_status: DRAFT / MISSING_SOURCE / UNVERIFIED / INITIAL_TARGET_PROFILE_ONLY / ARTIFACT_DEFINED / ENGINEERING_APPROVED / REVOKED / SUPERSEDED
Similarly, overlap_review_approver should reference an identity or approval record rather than free text.

10. The zero-regen dimensions section contains the wrong text
Section 5 currently repeats: Revalidation Requirements = {Configuration, Runout Calculations, Environmental Conditions...}
That does not describe the zero-regeneration envelope.
Restore:
ZeroRegenEnvelope = f(motor_speed, DC_bus_voltage, BMS_charge_permission, inverter_temperature, motor_temperature, gear_state, sampling_filtering_mode, torque_estimator_version, firmware_hash, calibration_hash)
The ±2 Nm candidate remains: INITIAL_TARGET_PROFILE / NO_PASS_FAIL_AUTHORITY

11. Procedure approvals still look prefilled
Rows such as C3A-006 and C3A-008 say: PAS = APPROVED_FOR_CONTROLLED_EXECUTION
Unless actual signed approval records exist, the baseline specification should default to:
PAS = APPROVAL_REQUIRED / ES = NOT_EXECUTED / RSS = NOT_ELIGIBLE
A real ProcedureApproval table should control the displayed status:
ProcedureApproval_ID / test_id / procedure_revision / approver_identity / signature_hash / approval_timestamp / approval_scope / expiry / status
Do not seed approvals into the application.

12. Complete the independent-sensor failure response
The current section ends after: the system sets the state to:
Add:
INVERTER_PHYSICAL_STATE = UNKNOWN
INDEPENDENT_SENSOR_HEALTH = INVALID
TEST_RESULT = INVALID_TEST
MOVEMENT_AUTHORITY = BLOCKED
FAULT_ESCALATION = PROHIBITED
ENGINEERING_REVIEW_REQUIRED = TRUE
If a required independent channel is missing or saturated, the system cannot conclude what the inverter physically did.

13. The E-stop result needs more than one combined pass/fail
This field is too broad: vehicle_stop_or_controlled_deceleration_result
Separate:
torque_inhibit_result / phase_current_decay_result / inverter_state_transition_result / HV_isolation_result_if_required / contactor_feedback_result_if_required / DC_bus_decay_result_if_required / vehicle_deceleration_result / vehicle_stopping_result_if_required / fault_latch_result / automatic_retry_block_result
An event can pass torque removal but fail isolation, or pass isolation but have invalid stopping evidence.

14. Paired-fault component foreign keys point to the wrong table
You currently define: fault_1_component_id → DistanceComponent / fault_2_component_id → DistanceComponent
A distance component represents track geometry, not vehicle hardware.
These should reference a subsystem/component registry: EngineeringComponent / Subsystem / VehicleComponentInstance
For example: fault_1_component_id → VehicleComponentInstance.component_id
Possible components: VCU / inverter / BMS / PDU / APPS / brake-assist unit / steering-assist unit / DC/DC converter / wheel-speed sensor
This is an important relational error.

15. TestResult should usually be one-to-many per authorization
A test authorization may have: attempt 1 = ABORTED / attempt 2 = INVALID_TEST / attempt 3 = SIGNED_PASS
Therefore: TestCellAuthorization 1:N TestExecution / TestExecution 1:1 or 1:N TestResultRevision
Do not force one authorization to one result unless each attempt receives a new authorization.
Recommended structure: TestSession / TestExecution / TestResult / TestResultAnnotation

16. Add test-result applicability and attempt identity
Each result needs:
TestResult_ID / TestExecution_ID / attempt_number / ConfigurationPacket_ID / TestCellAuthorization_ID / procedure_revision / telemetry_packet_id / execution_start / execution_end / result_status / signoff_record_id / applicability_status / superseded_by_result_id
This prevents one failed or aborted attempt from being overwritten by a later pass.

17. The status transition diagram still needs explicit transition rules
Define allowed transitions in code:
DRAFT → APPROVAL_REQUIRED
APPROVAL_REQUIRED → AUTHORIZED | DRAFT
AUTHORIZED → ACTIVE | SUSPENDED | REVOKED | EXPIRED
ACTIVE → SUSPENDED | REVOKED
SUSPENDED → AUTHORIZED | REVOKED | EXPIRED
REVOKED → SUPERSEDED
EXPIRED → SUPERSEDED
Execution completion should not mutate authorization into COMPLETED.
Every illegal transition must be rejected.

18. Add database constraints for cross-record configuration equality
Foreign keys prove the record exists, but they do not prove all linked records refer to the same configuration.
Hard-check:
RunoutCalculations.ConfigurationPacket_ID = RunoutAggregationResult.ConfigurationPacket_ID = TestCellAuthorization.ConfigurationPacket_ID = TestExecution.ConfigurationPacket_ID = FaultExecutionAuthorization.ConfigurationPacket_ID
The same applies to vehicle/build ID and platform ID.

19. Add append-only controls
"Immutable" needs technical enforcement:
raw artifact rows: INSERT only
signed test results: INSERT only
transition events: INSERT only
signoff records: INSERT only
Corrections occur through: Annotation / Supersession / ApplicabilityChange / ImpactReview / ReplacementResult
Never through UPDATE on signed records.

20. Strengthen the final scope statement
Your current scope limitation is good but still broad. Add:
A SIGNED_PASS in Gate 05M-C3 applies only to:
- the exact VIN/build record
- exact ConfigurationPacket_ID
- exact software/calibration hashes
- exact test-cell envelope
- exact mass/loading and tire configuration
- exact environmental and surface window
- exact approved procedure revision
It does not establish: public-road authorization / regulatory compliance / certified brake compliance / production release / customer-operation authority / full-speed validation / durability validation / crashworthiness / reuse on another vehicle

Correct Build Engine status
Gate 05M-C3 — Revision 06
Status:
FORMAL_BASELINE_CANDIDATE
SAFETY_ARCHITECTURE_MATURE
RUNOUT_COMPONENT_SCHEMA_DEFINED
RUNOUT_AGGREGATION_SCHEMA_DEFINED
RUNOUT_BLOCK_RULES_MISSING
CANONICAL_UNIT_MODEL_DEFINED
SCHEMA_NORMALIZATION_REQUIRED
ARRAY_TO_JUNCTION_TABLE_MIGRATION_REQUIRED
AUTHORIZATION_EXECUTION_STATUS_SEPARATION_REQUIRED
EXPIRED_STATE_REQUIRED
PROCEDURE_APPROVAL_RECORD_REQUIRED
ZERO_REGEN_DIMENSION_RESTORATION_REQUIRED
INDEPENDENT_SENSOR_FAILURE_ACTION_MISSING
ESTOP_RESULT_DECOMPOSITION_REQUIRED
PAIRED_FAULT_COMPONENT_REFERENCE_INCORRECT
TEST_ATTEMPT_MODEL_REQUIRED
CROSS_RECORD_CONFIGURATION_CONSTRAINTS_REQUIRED
APPEND_ONLY_DATABASE_ENFORCEMENT_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_PRODUCTION_RELEASE
NO NORMAL DRIVING AUTHORITY

Bottom line
Revision 06 is excellent conceptually. You should not continue expanding the narrative into new C3 features yet.
The next correct phase is:
1. Normalize the schemas.
2. Repair all missing and corrupted expressions.
3. Separate authorization, execution, and results.
4. Replace arrays with relational junction tables.
5. Implement database constraints and append-only ledgers.
6. Write automated rule-engine tests.
7. Run SIL/HIL validation against the implemented rules.
After those corrections:
CONTROLLED_SPECIFICATION_FREEZE → DATABASE MIGRATION → RULE ENGINE IMPLEMENTATION → AUTOMATED CONSTRAINT TESTING → SIL/HIL EVIDENCE
That is the position you have reached.
