# Owner review_70 — verdict on batch 74 (Research Hunter "72:75", Gate 05M-C3 Revision 05 amendments)

> Archived 1:1 as delivered by the owner (Constitution, Article I). Raw payload
> framing archived at `../research_hunter/batch_74_gate05mc3_revision05_amendments.md`.

---

My verdict: this is now at formal baseline-candidate quality. The architecture is strong, deterministic, database-centered, and aligned with your goal of hard-coded guardrails rather than AI judgment.

The biggest remaining problems are no longer conceptual. They are text corruption, incomplete rules, and a few schema/status inconsistencies that must be corrected before implementation.

What is strongest

Revision 05 now gives the Build Engine a real control chain:
ConfigurationPacket_ID → RunoutCalculations_ID → RunoutAggregationResult → TestCellAuthorization_ID → Procedure approval → Controlled execution → Synchronized evidence → Result signoff → Configuration impact review

It also correctly separates:
authorization to conduct a test ≠ test execution completed ≠ test passed ≠ downstream gate cleared

Your strongest sections are:
Immutable transition and evidence records. Unit-aware numeric fields. Runout overlap accounting. Configuration-specific result validity. Separate E-stop outcome measurements. Unknown inverter state after communication loss. Steering validity and freshness separation. Fault-execution authorization by physical domain. Governed paired-fault order and timing.
This is exactly the kind of structure that reduces ambiguity.

Corrections before baseline lock

1. Repair the malformed equation permanently
The equation is still corrupted: Umin / Lworst_case_coastor.stop / containment margi
Use this exact searchable expression:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin
The software should use canonical field names, not OCR-derived equation text.

2. Several required logic lines are missing
These sections currently contain blank bullets or incomplete equations. Insert the actual rules:
If overlap_review_status = INCLUDED_IN_OTHER_COMPONENT:
- included_in_L_min = false
- included_within_component_id IS NOT NULL
- referenced host component exists
- host component belongs to the same RunoutCalculations_ID
If overlap_review_status = INCLUDED_SEPARATELY:
- included_in_L_min = true
- included_within_component_id IS NULL
Runout hard blocks — PHYSICAL_MOVEMENT_BLOCKED if:
- available_track_length < calculated_L_min
- remaining_margin < approved_minimum_margin
- overlap_check_result != PASS
- unit_consistency_result != PASS
- required_component_completion_result != PASS
- authorization_status != SIGNED_RELEASE
- ConfigurationPacket_ID mismatch exists
- TestCellAuthorization_ID is not ACTIVE
- any required component is MISSING_SOURCE, UNVERIFIED, INITIAL_TARGET_PROFILE_ONLY, or BLOCKED_PENDING_REVIEW
Without those lines, the schemas look complete but the actual enforcement remains incomplete.

3. Fix typographical field corruption
These must be cleaned before coding: zone_end reference / distance_component value / zone end reference / zone _start reference / authorized _track distance / maximum_negative _torque / ≤ O / Runout Calculations. Con figuration Packet_ID / TestCell Authorization. Con figuration Packet_ID / DC' — bus voltage / torque — estimator version / no saturation/dropped frames?
Use canonical names: zone_start_reference / zone_end_reference / distance_component_value / authorized_track_distance / maximum_negative_torque <= 0 / RunoutCalculations.ConfigurationPacket_ID / TestCellAuthorization.ConfigurationPacket_ID / DC_bus_voltage / torque_estimator_version / no_sensor_saturation / no_dropped_frames.
This matters because slight naming differences will create duplicate database fields and failed validation.

4. allowed_steering_band should not be one numeric value
A steering band normally needs lower and upper boundaries.
Use: allowed_steering_band: minimum_angle / maximum_angle / unit / reference_frame / authority_class / source_artifact_id / uncertainty
Also specify whether the angle means: STEERING_WHEEL_ANGLE / ROAD_WHEEL_ANGLE / DERIVED_ROAD_WHEEL_ANGLE.
Otherwise the same field may accidentally mix steering-wheel degrees and road-wheel degrees.

5. Add a unit enum instead of unrestricted strings
This is currently too open: unit (String)
Use controlled units: m / m/s / m/s^2 / m/s^3 / Nm / Nm/s / Nm/s^2 / deg / deg/s / rad / rad/s / A / A/s / V / V/s / Pa / kPa / bar / ms / s / kg / percent.
Then require conversion to internal canonical SI units before comparison. display unit may vary; database comparison unit must be canonical.

6. Add activation rules to the authorization state machine
You created transition events, but activation itself should require:
AUTHORIZED → ACTIVE only if: current timestamp is before authorization_expiry; ConfigurationPacket_ID is unchanged; RunoutAggregationResult = SIGNED_RELEASE; environmental window is valid; thermal state is valid; prior-cell SIGNED_PASS exists where required; required procedure approval exists; required personnel are assigned; emergency and containment systems are ready.
Also: Only one TestCellAuthorization_ID may be ACTIVE for the same vehicle/subgate/test session at one time. That prevents conflicting active operating limits.

7. COMPLETED should not be part of authorization status
You already explain that completed does not equal passed, which is good. But semantically, COMPLETED fits better as an execution/session state than an authorization state.
Cleaner model:
Authorization Status: DRAFT / APPROVAL_REQUIRED / AUTHORIZED / ACTIVE / SUSPENDED / REVOKED / SUPERSEDED / EXPIRED
Execution Status: NOT_STARTED / PENDING / EXECUTING / EXECUTED / ABORTED / COMPLETED
Result Status: NOT_ELIGIBLE / NEEDS_REVIEW / INVALID_TEST / SIGNED_FAIL / SIGNED_PASS
Keeping COMPLETED in both concepts increases confusion.

8. Add an EXPIRED authorization state
You have authorization_expiry, but no explicit state for expiration.
Add: EXPIRED. Rule: When current_time >= authorization_expiry: AUTHORIZED or SUSPENDED → EXPIRED. An expired record cannot become ACTIVE without a new approval or superseding authorization.

9. Prefilled procedure approvals still need protection
Your table says: PAS = APPROVED_FOR_CONTROLLED_EXECUTION. Those values must come from signed records, not document defaults.
A procedure approval record needs: ProcedureApproval_ID / test_id / procedure_revision / approver_identity / approval_scope / approval_timestamp / signature_hash / authorization_expiry / linked_hazard_analysis / status.
Until that record exists: PAS = APPROVAL_REQUIRED; ES = NOT_EXECUTED; RSS = NOT_ELIGIBLE.

10. E-stop telemetry field semantics need refinement
Some fields are rates, while others may be durations or final states: phase_current_decay (A/ms) / DC_bus_decay_if_required (V/ms). A single slope may not fully describe behavior. Store:
event_trigger_timestamp / torque_inhibit_request_timestamp / phase_current_below_threshold_timestamp / phase_current_peak_after_event / phase_current_decay_profile_artifact_id / inverter_state_before / inverter_state_after / HV_isolation_start_timestamp / contactor_feedback_open_timestamp / DC_bus_voltage_profile_artifact_id / vehicle_speed_at_event / vehicle_stop_or_controlled_deceleration_result.
Keep the raw trace rather than reducing everything to one number.

11. Sensor-health criteria should be formalized
The current expression is unfinished: no saturation/dropped frames?
Create IndependentSensorHealthResult: current_probe_calibration_status / current_probe_range_valid / DC_bus_sensor_status / DC_bus_sensor_range_valid / motor_speed_sensor_status / wheel_speed_sensor_status / time_sync_status / maximum_time_sync_error / dropped_frame_count / dropped_frame_rate / saturation_detected / clipping_detected / sensor_fault_detected / result_status.
If any required independent channel is invalid: INVERTER_PHYSICAL_STATE = UNKNOWN; TEST_RESULT = INVALID_TEST or NEEDS_REVIEW.

12. Steering precedence table has one logical ambiguity
This row: Any | Any | UNAVAILABLE would technically override all other rows.
Use a deterministic input model:
availability_state: AVAILABLE | UNAVAILABLE
freshness_state: FRESH | STALE
validity_state: VALID | DEGRADED | IMPLAUSIBLE
Resolution:
if availability = UNAVAILABLE: UNAVAILABLE
elif freshness = STALE: STALE
elif validity = IMPLAUSIBLE: IMPLAUSIBLE_BUT_FRESH
elif validity = DEGRADED: VALID_BUT_DEGRADED
else: VALID_AND_FRESH
That is easier to hard-code and test.

13. Recovery should distinguish temporary derating from latched faults
Suggested recovery model:
VALID_BUT_DEGRADED: may return after approved stabilization interval if not latched.
IMPLAUSIBLE_BUT_FRESH: latched; requires diagnostic review and approved clear.
STALE: requires freshness recovery plus stabilization; service clear required if fault policy marks it latched.
UNAVAILABLE: movement remains blocked until source restored and verified.
No state should silently restore propulsion authority while a conflicting fault remains active.

14. FaultExecutionAuthorization needs execution/result fields
Add: procedure_revision / procedure_approval_status / execution_status / result_signoff_status / authorization_expiry / configuration_impact_status / supersession_id / injection_fixture_id.
Otherwise the single-fault record is less governed than your paired-fault record.

15. Paired-fault records need fault IDs, not only component IDs
A component may have many different faults. Use: fault_1_id / fault_2_id. Optionally retain: fault_1_component_id / fault_2_component_id. The combination must identify the exact failure mode, not merely the affected component.

16. Add database-enforced references
All critical IDs should be foreign-key constrained: RunoutCalculations_ID / ConfigurationPacket_ID / TestCellAuthorization_ID / HazardAnalysis_ID / previous_cell_signed_result_id / source_artifact_id / proof_artifact_id / ProcedureApproval_ID / FaultExecutionAuthorization_ID / PairedFaultAuthorization_ID. Hard block orphaned references.

17. Add the explicit scope limitation
Place this at the end:
Gate 05M-C3 Scope Limitation — A SIGNED_PASS within Gate 05M-C3 proves only that the exact archived vehicle configuration performed within the signed closed-area operating envelope under the recorded conditions. It does not establish: public-road authorization; regulatory compliance; production release; customer-operation authorization; full-speed performance; durability; crashworthiness; certified braking compliance; reuse on another vehicle or configuration.

Correct status
Gate 05M-C3 — Revision 05
Status:
FORMAL_BASELINE_CANDIDATE
CORE_GOVERNANCE_ARCHITECTURE_MATURE
RUNOUT_COMPONENT_SCHEMA_DEFINED
RUNOUT_AGGREGATION_SCHEMA_DEFINED
RUNOUT_BLOCK_RULES_INCOMPLETE
EQUATION_TEXT_CORRECTION_REQUIRED
SCHEMA_TEXT_NORMALIZATION_REQUIRED
TYPED_NUMERIC_FIELDS_DEFINED
UNIT_ENUM_AND_CANONICAL_CONVERSION_REQUIRED
AUTHORIZATION_TRANSITION_LEDGER_DEFINED
AUTHORIZATION_ACTIVATION_RULES_REQUIRED
AUTHORIZATION_EXPIRY_STATE_REQUIRED
RESULT_STATUS_SEPARATED
RAW_EVIDENCE_IMMUTABLE
APPEND_ONLY_METADATA_DEFINED
ZERO_REGEN_INITIAL_TARGET_ONLY
ESTOP_SIGNAL_SPLIT_DEFINED
INDEPENDENT_SENSOR_HEALTH_SCHEMA_REQUIRED
STEERING_RESOLUTION_LOGIC_REFINEMENT_REQUIRED
FAULT_EXECUTION_AUTHORIZATION_PARTIALLY_DEFINED
PAIRED_FAULT_GOVERNANCE_DEFINED
DATABASE_FOREIGN_KEY_ENFORCEMENT_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_PRODUCTION_RELEASE

Bottom line
This is excellent architecture. You are very close to stopping the repeated rewriting of Gate 05M-C3.
The final pass should focus on implementation correctness:
1. Repair corrupted text and equations.
2. Fill the missing overlap and hard-block logic.
3. Normalize every field name.
4. Add canonical units and conversions.
5. Add activation and expiration rules.
6. Separate authorization completion from execution completion.
7. Prevent unsigned procedure approvals.
8. Formalize sensor health.
9. Make steering-state resolution deterministic.
10. Complete single-fault authorization lifecycle fields.
11. Use exact fault IDs in paired faults.
12. Enforce database relationships.
13. Add the scope/no-claim rule.
After those corrections, I would stop revising the narrative and move this into:
CONTROLLED_SPECIFICATION_FREEZE → DATABASE_SCHEMA_IMPLEMENTATION → RULE_ENGINE_TESTS → HIL_VALIDATION
That is the position you have reached.
