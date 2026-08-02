# Owner review_67 — verdict on batch 71 (Research Hunter "69:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is the
> owner's own review/verdict text. The raw Research Hunter payload (Gate 05M-C3
> Revision 03) is archived at
> `../research_hunter/batch_71_gate05mc3_revision03.md`.

---

My repsond

My verdict: Revision 03 is the strongest version so far. The overall C3 system is now structurally mature:
C3A -> straight-line tracking
C3B -> mechanical braking baseline
C3C -> restricted regeneration
C3D -> steering-based propulsion derating
C3E -> staged fault containment
You closed most of the major gaps: configuration validity, runout evidence, regenerative-control ownership, steering-signal states, and fault escalation. I would now call it a formal engineering baseline candidate, but not quite baseline-locked yet.
What is especially strong
The Build Engine can now answer five crucial questions for every test:
What exact configuration was tested?
What operating-envelope cell was authorized?
What synchronized evidence was captured?
What fault or limit was exercised?
Does the result remain valid after a configuration change?
The best additions are:
RunoutCalculations_ID
configuration-impact classifications
C3C coexistence separated from coordinated brake blending
BMS charge permission as regen authority
steering states: valid, degraded, implausible, unavailable and stale
single fault -> repeated fault -> paired fault -> compound fault
no automatic progression between operating cells
That is professional validation architecture.

1. The actual runout equation is still missing
You introduce:
The minimum absolute physical track length L_min is calculated via the following structural model:
But no equation appears afterward.
Add:
L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin
Be careful not to count the same physical distance twice. For example, if foundation_brake_stopping_distance already includes driver and control response distance, the Build Engine must not add that response distance again.
Add a calculation-method field:
distance_component_method: MEASURED / CALCULATED / SUPPLIER_DEFINED / ENGINEERING_APPROVED / INITIAL_TARGET_PROFILE
And:
No RunoutCalculations_ID may authorize movement if any required distance component is MISSING_SOURCE, UNVERIFIED, or INITIAL_TARGET_PROFILE_ONLY.

2. The +/-2 Nm residual should not be globally fixed
This rule currently says:
zero-torque command = 0 Nm; acceptable residual = +/-2 Nm
That can remain a candidate tolerance, but it cannot be universal across inverters, current sensors, motor sizes, torque estimators, speeds or field-control states.
Use:
Regeneration Command State: ZERO_REGEN_REQUEST
Measured torque feedback and phase-current behavior: must remain within the supplier-defined or engineering-approved zero-regeneration tracking envelope.
Then classify +/-2 Nm as: ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE
Also, be careful with "active field weakening." Field weakening normally pertains to higher-speed motor operation; whether it is relevant in this low-speed gate depends on the actual inverter and motor strategy.

3. C3A-006 creates a sequencing dependency problem
C3A is supposed to precede C3B, but C3A-006 says:
Vehicle decelerates within the approved C3B-derived envelope.
That envelope does not yet exist during the first C3A execution.
Split the result:
C3A BOS acceptance: traction command removed within approved response window; torque feedback and phase current decay within approved envelope; driver maintains foundation-brake control; no propulsion opposition to braking
Then after C3B is signed:
C3A/C3B correlation review: Compare the C3A brake-override run against the signed C3B foundation-brake stopping envelope.
C3A should not depend on evidence from a downstream gate to execute.

4. C3A-009B has contradictory status fields
It says: STRICTLY BLOCKED but also: PAS: APPROVED_FOR_CONTROLLED_EXECUTION
Correct it to:
Required Approver: Controls Director + Systems Safety Lead
Procedure Approval Status: APPROVAL_REQUIRED
Execution Status: LOCKED
Result Signoff Status: NOT_ELIGIBLE
Block Reason: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED
Observation-only C3A-009A may proceed. Closed-loop authority must remain locked.

5. "Immediate" has returned in the steering state matrix
These phrases conflict with your response-window doctrine:
immediate further derating; immediate torque-inhibit request
Replace them with:
DEGRADED: Derating occurs within the approved degraded-state response window.
IMPLAUSIBLE: Torque-inhibit request occurs within the approved steering-fault response window and a non-volatile fault is latched.
For STALE, define that the timestamp age is assessed against an approved timeout—not merely whether the value remains unchanged. A steering signal can legitimately remain unchanged while driving straight.
Better:
STALE: Timestamp age, alive counter, update cadence or freshness indicator exceeds its approved limit. A constant but freshly updated valid steering value is not stale.
That distinction is important.

6. C3A-007 should use supplier-defined Neutral behavior
The expected output says: propulsion torque falls to zero
Use: propulsion torque remains within the supplier-defined Neutral zero-propulsion envelope.
Blocked states should include:
- active propulsion request remains asserted
- torque-producing current exceeds approved Neutral envelope
- inverter state contradicts supplier-defined Neutral behavior
- unintended vehicle acceleration persists

7. C3C-007 should not say the fault "latches natively"
"Latches natively" is unclear. Does the inverter latch it? VCU? BMS? Build Engine?
Define ownership:
Inverter: reports communication/fault state where supported.
VCU: removes regen request and records the operational fault latch.
Build Engine: stores the event, evidence and clearance authorization.
Automatic regeneration restoration: blocked until the supplier-defined recovery conditions and approved service-clear process are satisfied.
Also distinguish an inverter communication loss from a verified inverter shutdown. If communications disappear, the VCU cannot assume what the inverter is physically doing; independent current/torque evidence is needed.

8. Some C3E faults should remain non-moving until proven elsewhere
The escalation hierarchy is good, but not every listed fault should first be introduced during actual motion.
Add a fault-execution classification:
FAULT_EXECUTION_DOMAIN: SIL_ONLY / HIL_ONLY / STATIC_VEHICLE_ONLY / LIFTED_WHEEL_ONLY / LOWEST_MOVING_CELL_ALLOWED / HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS
For example:
APPS plausibility fault: HIL -> static vehicle -> lowest moving cell if approved
Brake-assist-not-ready: HIL/static inhibition proof first; physical moving test only if a safe bounded method is approved
Steering-assist-not-ready: HIL/static inhibition proof first; do not intentionally remove steering assistance while moving
Low-voltage fault: HIL/bounded supply test first; moving execution only after voltage-transition containment is proven
The doctrine should be:
A fault being listed in C3E does not automatically authorize its physical injection during vehicle movement.

9. Add prerequisites to paired and compound faults
Level 3 and Level 4 need more than a general safety rationale.
Require:
PairedFaultAuthorization_ID; HazardAnalysis_ID; fault-order definition; common-cause assessment; expected response sequence; abort method; independent containment; runout validity confirmation; thermal-state confirmation; configuration hash; required approvers
Fault order matters. For example: low voltage -> communication loss may behave differently from: communication loss -> low voltage
The Build Engine should store order and timing offsets.

10. Configuration-result impact should not "clear" old evidence
You wrote: INVALIDATED — Data cleared
Do not delete or clear historical evidence. Preserve it as an immutable record.
Use: INVALIDATED_FOR_CURRENT_CONFIGURATION
The old result remains archived and traceable, but it cannot authorize the new configuration.
Correct lifecycle: historical result preserved -> applicability revoked -> replacement testing linked -> supersession chain recorded

11. Add a test-cell authorization schema
Since cell progression is now fundamental, define the record explicitly:
TestCellAuthorization_ID; subgate_id; cell_number; maximum_speed; maximum_positive_torque; maximum_negative_torque; maximum_torque_rate; maximum_jerk; maximum_test_distance; allowed steering band; allowed regen state; allowed fault set; RunoutCalculations_ID; ConfigurationPacket_ID; previous_cell_signed_result; thermal_state_requirement; surface/environmental window; authorization expiry; required approvers; status
The status should be: DRAFT / APPROVAL_REQUIRED / AUTHORIZED / ACTIVE / SUSPENDED / COMPLETED / REVOKED / SUPERSEDED

Correct Build Engine status
Gate 05M-C3 — Revision 03
Status:
FORMAL_BASELINE_CANDIDATE
RUNOUT_SCHEMA_DEFINED
RUNOUT_EQUATION_INSERTION_REQUIRED
CONFIGURATION_VALIDITY_RULE_DEFINED
HISTORICAL_EVIDENCE_RETENTION_REQUIRED
STEPPED_CELL_ESCALATION_DEFINED
TEST_CELL_AUTHORIZATION_SCHEMA_REQUIRED
C3A_STRAIGHT_LINE_DEFINED
C3A_C3B_DEPENDENCY_CLEANUP_REQUIRED
C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED
C3B_FOUNDATION_BRAKE_BASELINE_DEFINED
C3C_REGEN_COEXISTENCE_DEFINED
C3C_COORDINATED_BLENDING_LOCKED
C3D_STEERING_STATE_MATRIX_DEFINED
C3D_RESPONSE_WINDOW_LANGUAGE_CLEANUP_REQUIRED
C3E_FAULT_HIERARCHY_DEFINED
C3E_EXECUTION_DOMAIN_CLASSIFICATION_REQUIRED
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
Bottom line
Revision 03 is very good. The architecture itself is no longer the weak point. The final cleanup is mainly about closing contradictions and formalizing authority:
1. Insert and govern the actual L_min equation.
2. Downgrade +/-2 Nm to an initial residual candidate.
3. Remove the circular C3A dependency on C3B evidence.
4. Correct C3A-009B to APPROVAL_REQUIRED / LOCKED.
5. Remove "immediate" from steering states.
6. Define stale by signal freshness, not unchanged value.
7. Clarify Neutral and regen-fault ownership.
8. Classify which faults may be injected in which physical domain.
9. Add paired-fault order and authorization records.
10. Preserve invalidated historical evidence.
11. Define TestCellAuthorization_ID fully.
After these changes, the appropriate label is:
GATE_05M_C3_REVISION_03_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW
That means the procedure architecture is ready for controlled multidisciplinary review—not that physical movement, braking, regen or fault validation has passed.
