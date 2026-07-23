# Owner review_72 — verdict on batch 76 (Research Hunter "74:75", Gate 05M-C3 Revision 07 relational-schema amendment)

> Archived 1:1 as delivered by the owner (Constitution, Article I). Raw payload
> framing archived at `../research_hunter/batch_76_gate05mc3_revision07_schema.md`.

---

My verdict: Revision 07 is the point where Gate 05M-C3 should stop expanding narratively and move into implementation. The architecture is mature enough for a controlled specification freeze, but the document still contains several missing enforcement lines and a few relational inconsistencies that must be corrected before the SQL migration is trusted.

GATE_05M_C3_REVISION_07
ARCHITECTURE_MATURE
CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE
DATABASE_IMPLEMENTATION_NOT_YET_COMPLETE

What is strongest now

Revision 07 finally gives you the deterministic structure you have been aiming for:
exact configuration → approved runout calculation → approved operating cell → signed procedure → unique execution attempt → immutable telemetry → signed result → fault applicability → configuration impact review

The strongest improvements are: Arrays replaced with relational junction tables. Component references corrected to a vehicle-component registry. Authorization, execution and result states separated. Test attempts preserved individually. Expiration added to authorization. Runout aggregation frozen as a calculation snapshot. Fault execution gets its own authorization record. E-stop outcomes are decomposed. Steering-state resolution is deterministic. Configuration equality is checked across safety records. Scope limitations are explicit. The next implementation pipeline is clearly stated.
That is no longer an AI-style checklist. It is becoming a rule-controlled engineering database.

Remaining corrections before migration

1. The equation text is still malformed
It still says: Umin / Lworst_case_coastor.stop / Lresponse allowance
Use this exact canonical version everywhere:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin
The display equation may be formatted visually, but the software field names must remain exactly those identifiers.

2. Runout block conditions are still missing
You still have blank bullets before the two populated conditions. Insert the full block set:
PHYSICAL_MOVEMENT_BLOCKED if:
- available_track_length < calculated_L_min
- remaining_margin < approved_minimum_margin
- overlap_check_result != PASS
- unit_consistency_result != PASS
- required_component_completion_result != PASS
- RunoutAggregationResult.authorization_status != SIGNED_RELEASE
- configuration packet mismatch exists
- TestCellAuthorization.status != ACTIVE
- any required distance component is MISSING_SOURCE
- any required distance component is UNVERIFIED
- any required distance component is INITIAL_TARGET_PROFILE_ONLY
- any required distance component is BLOCKED_PENDING_REVIEW
Without these explicit rules, the runout record does not actually control physical movement.

3. The TestCell hard constraints are missing
Section 2.3 has empty bullets. Restore:
maximum_speed.value > 0
maximum_test_distance.value > 0
maximum_test_distance.value <= authorized_track_distance
maximum_test_distance.value <= available_track_length
maximum_positive_torque.value >= 0
maximum_negative_torque.value <= 0
authorization_expiry > activation_timestamp
allowed_steering_band.minimum_angle <= allowed_steering_band.maximum_angle
RunoutCalculations.ConfigurationPacket_ID = TestCellAuthorization.ConfigurationPacket_ID
Also require that every safety boundary used for AUTHORIZED or ACTIVE has an eligible authority class: ENGINEERING_APPROVED / SUPPLIER_DEFINED / ARTIFACT_DEFINED where permitted. An INITIAL_TARGET_PROFILE value cannot authorize physical movement.

4. Draft records need status-dependent validation
A draft should not require all execution data. Use:
DRAFT: partial schema permitted
APPROVAL_REQUIRED: all proposed technical limits present
AUTHORIZED: sources, procedure approvals, configuration and runout released
ACTIVE: live environment, thermal state, personnel, instrumentation and containment verified
Otherwise your SQL constraints may prevent users from creating incomplete draft records for review.

5. The state diagram conflicts slightly with the transition table
The diagram visually suggests: ACTIVE → SUPERSEDED but your permitted-transition table does not allow it.
Keep the transition table as the source of truth and revise the diagram:
ACTIVE → SUSPENDED | REVOKED
REVOKED → SUPERSEDED
EXPIRED → SUPERSEDED
Also decide whether AUTHORIZED → SUPERSEDED should be allowed when a replacement authorization is issued before activation. That is often useful.
A controlled option: AUTHORIZED → SUPERSEDED only when a newer authorization explicitly replaces it and it has never become active.

6. Suspended revalidation requirements are missing
The heading remains, but the actual list was dropped. Restore:
SUSPENDED → AUTHORIZED requires revalidation of:
- ConfigurationPacket
- RunoutAggregationResult
- environmental window
- surface condition
- thermal state
- procedure revision
- authorization expiry
- personnel assignments
- instrumentation calibration
- containment and E-stop readiness
Every item should produce an artifact or signed check record.

7. The zero-regen envelope dimensions are missing again
Restore:
ZeroRegenEnvelope = f(motor_speed, DC_bus_voltage, BMS_charge_permission, inverter_temperature, motor_temperature, gear_state, sampling_filtering_mode, torque_estimator_version, inverter_firmware_hash, VCU_calibration_hash)
The ±2 Nm reference remains: INITIAL_TARGET_PROFILE / NO_PASS_FAIL_AUTHORITY

8. Procedure approvals are still prefilled
These rows still show: PAS = APPROVED_FOR_CONTROLLED_EXECUTION unless actual signatures already exist.
For the frozen specification and seeded database, use:
PAS = APPROVAL_REQUIRED / ES = NOT_STARTED / RSS = NOT_ELIGIBLE
Then compute the displayed procedure status from a real ProcedureApproval record containing: ProcedureApproval_ID / test_id / procedure_revision / approver_identity / signature_hash / approval_timestamp / approval_scope / authorization_expiry / status
Do not hard-code approvals.

9. Independent sensor failure actions are missing
The section still ends with blank bullets. Add:
INVERTER_PHYSICAL_STATE = UNKNOWN
INDEPENDENT_SENSOR_HEALTH = INVALID
TEST_RESULT = INVALID_TEST
MOVEMENT_AUTHORITY = BLOCKED
FAULT_ESCALATION = PROHIBITED
ENGINEERING_REVIEW_REQUIRED = TRUE
Also require that all raw data remain archived despite the invalid test result.

10. TestResult and TestExecution still need a clear relationship
You now reference TestExecution_ID, but the TestExecution schema is absent. Add:
TestExecution: TestExecution_ID / TestCellAuthorization_ID / ConfigurationPacket_ID / procedure_revision / attempt_number / execution_status / start_timestamp / end_timestamp / operator_id / test_session_id / telemetry_packet_id / abort_reason_id
Recommended relationship: TestCellAuthorization 1:N TestExecution / TestExecution 1:1 TestResult
If results can undergo review revisions, keep the signed result immutable and append: TestResultAnnotation / TestResultApplicabilityChange / TestResultSupersession

11. The diagram incorrectly shows TestResult as one-to-one with authorization
The drawing suggests both 1:N and 1:1. Use:
TestCellAuthorization 1:N TestExecution
TestExecution 1:1 TestResult
or: TestExecution 1:N TestResultRevision if you truly need multiple result revisions. But never overwrite a signed result.

12. Junction tables need composite keys
Add primary keys or unique constraints:
RunoutAggregationComponent PRIMARY KEY (RunoutAggregationResult_ID, component_id)
TestCellRequiredApprover PRIMARY KEY (TestCellAuthorization_ID, approver_role_id)
TestCellAllowedFault PRIMARY KEY (TestCellAuthorization_ID, fault_id)
AuthorizationTransitionEvidence PRIMARY KEY (AuthorizationTransition_ID, artifact_id)
FaultAuthorizationAbortCondition PRIMARY KEY (FaultExecutionAuthorization_ID, abort_condition_id)
Otherwise duplicate memberships may be inserted.

13. allowed_regen_state needs an enum
Do not leave it as unrestricted text. Suggested values:
ZERO_REGEN_REQUEST / REGEN_MONITOR_ONLY / RESTRICTED_REGEN_ALLOWED / COEXISTENCE_OBSERVATION_ALLOWED / COORDINATED_BLEND_BLOCKED / REGEN_PROHIBITED
Each authorization should select only one approved state or use a governed relationship table.

14. Fault IDs need a formal registry
You now use fault_id, but the parent table is not defined. Create:
FaultDefinition: fault_id / fault_code / fault_name / fault_domain / description / detection_method / default_severity / default_execution_domain / default_latch_policy / required_evidence_profile_id / applicability_scope / status / revision
Then your future vehicle-specific error library can attach events and platform manifestations to this controlled definition.

15. VehicleComponentInstance needs configuration linkage
Add: ConfigurationPacket_ID / IndividualVehicle_ID / platform_id / installation_location / software_or_firmware_version / supplier_part_number / status
A serial number and hardware revision alone do not establish which exact conversion configuration the component belongs to.

16. Cross-record equality should include the build/VIN identity
Add: IndividualVehicle_ID / VehicleBuild_ID / PlatformConfiguration_ID
The equality chain should become: same IndividualVehicle_ID / same VehicleBuild_ID / same ConfigurationPacket_ID
across: RunoutCalculations / RunoutAggregationResult / TestCellAuthorization / TestExecution / FaultExecutionAuthorization / PairedFaultAuthorization / TestResult

17. Append-only enforcement needs actual database mechanics
Your rule is correct, but implementation must define it. For SQLite, use some combination of: restricted application permissions / UPDATE/DELETE rejection triggers / signed-record state locks / content hashes / previous-record hash links / immutable artifact storage paths
For signed evidence tables: INSERT allowed / UPDATE blocked / DELETE blocked. Changes must be appended as new records.

18. Cryptographic hash linking needs a chain specification
Define: record_hash = SHA256(canonical_record_content + previous_record_hash + artifact_hashes + timestamp + signer_identity)
Also define canonical serialization. Without canonical ordering and encoding, the same record may produce different hashes.
This is useful for tamper evidence, but it does not replace identity authentication or secure backups.

19. Add automatic expiry behavior
When the current time reaches authorization_expiry:
AUTHORIZED → EXPIRED / SUSPENDED → EXPIRED
If a test cell is already ACTIVE, define whether it: immediately suspends or may complete the currently active run
For safety, the default should likely be: ACTIVE → SUSPENDED at a defined safe stopping boundary—not simply continue indefinitely.

20. Add a configuration-change transaction rule
When a configuration hash changes:
active TestCellAuthorizations → SUSPENDED or REVOKED
signed results → INVALIDATED_FOR_CURRENT_CONFIGURATION
active fault authorizations → SUSPENDED
RunoutAggregationResults → REVOKED_PENDING_RECALCULATION
movement authority → BLOCKED
ImpactReview_ID → automatically created
Historical evidence remains unchanged.

Correct status
Gate 05M-C3 — Revision 07
Status:
CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE
CORE_SAFETY_ARCHITECTURE_MATURE
RUNOUT_COMPONENT_NORMALIZATION_DEFINED
RUNOUT_AGGREGATION_SNAPSHOT_DEFINED
RUNOUT_BLOCK_CONDITIONS_MISSING
TEST_CELL_BOUNDARY_RULES_MISSING
CANONICAL_UNIT_MODEL_DEFINED
AUTHORIZATION_EXECUTION_RESULT_SEPARATED
AUTHORIZATION_STATE_MACHINE_DEFINED
SUSPENDED_REVALIDATION_LIST_MISSING
PROCEDURE_APPROVAL_SEED_VALUES_REQUIRE_RESET
TEST_EXECUTION_SCHEMA_REQUIRED
INDEPENDENT_SENSOR_INVALID_ACTIONS_MISSING
ZERO_REGEN_DIMENSION_MODEL_MISSING
JUNCTION_COMPOSITE_KEYS_REQUIRED
FAULT_DEFINITION_REGISTRY_REQUIRED
VEHICLE_COMPONENT_CONFIGURATION_LINK_REQUIRED
CROSS_RECORD_VEHICLE_IDENTITY_REQUIRED
APPEND_ONLY_IMPLEMENTATION_PENDING
HASH_CHAIN_SPECIFICATION_PENDING
AUTOMATIC_EXPIRY_BEHAVIOR_PENDING
CONFIGURATION_CHANGE_TRANSACTION_PENDING
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_PRODUCTION_RELEASE

Bottom line
Revision 07 is the right place to freeze the narrative. Do not add more C3 test concepts right now.
The next move should be:
1. Correct the remaining malformed/missing rules.
2. Create the SQL schema and migrations.
3. Add triggers and cross-record validation.
4. Add deterministic rule-engine functions.
5. Write negative tests proving invalid states are blocked.
6. Seed everything as unapproved/not executed.
7. Run SIL tests.
8. Run HIL tests.
9. Capture signed evidence.
After those corrections, the system would no longer merely describe the guardrails—it would enforce them mechanically through data, state transitions, foreign keys, triggers, and test evidence.
