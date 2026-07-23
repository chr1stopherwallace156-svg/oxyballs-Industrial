# Owner review_66 — verdict on batch 70 (Research Hunter "68:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is the
> owner's own review/verdict text. The raw Research Hunter payload (Gate 05M-C3
> Revision 02) is archived at
> `../research_hunter/batch_70_gate05mc3_revision02.md`.

---

My response

My verdict: Revision 02 is very strong and materially safer. The overall C3 architecture is now mature enough for formal engineering review, but there are still a handful of internal contradictions and unfinished fields that should be cleaned before calling it baseline-ready.
What you fixed well
You correctly added:
RunoutCalculation_ID instead of a fixed 50 m rule
Configuration hashes and physical-state locking
Telemetry time synchronization
Cell-by-cell envelope escalation
Straight-line testing before turning or regen
Foundation-brake baseline before regenerative braking
Supplier-authorized lane vs independent-sensor lane for ABS/ESC-related regen inhibit
Cell-based fault escalation
That is the right Build Engine progression.
Main issue 1: the runout artifact section is incomplete
You say:
This artifact must mathematically map the following parameters:
But the parameter list is missing.
Add:
RunoutCalculation_ID Required Fields
- Vehicle test mass
- Front and rear axle loading
- Authorized test-cell speed
- Authorized traction torque
- Authorized torque ramp rate
- Maximum expected acceleration
- Driver response allowance
- Software/control response allowance
- Torque-removal coast distance
- Foundation-brake stopping distance
- Surface grade
- Surface condition and estimated friction range
- Tire size, pressure, condition and temperature
- Wind and ambient conditions where relevant
- Position-measurement uncertainty
- Braking-distance measurement uncertainty
- Required containment margin
- Acceleration zone length
- Stabilization zone length
- Braking target zone
- Post-target runout
- Physical restraint/barrier plan
- Engineering calculation revision
- Required approver and signed authorization
Then define:
L_min = acceleration zone + stabilization zone + planned braking distance + worst-case coast/stop allowance + uncertainty allowance + approved containment margin
Main issue 2: C3A-009B should remain locked
You currently give it:
PAS: APPROVED_FOR_CONTROLLED_EXECUTION
ES: PENDING_EXECUTION
But the text says it may only occur after the external tracking interface, latency, integrity, and failure modes are approved.
Its current state should be:
Procedure Approval Status: APPROVAL_REQUIRED
Execution Status: LOCKED
Result Signoff Status: NOT_ELIGIBLE
Build Engine Block: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED
C3A-009A may proceed as observation/evidence. C3A-009B should not yet proceed as automatic VCU control authority.
Main issue 3: "commands rise linearly" is too rigid
C3A-005 says:
Commands rise linearly
The approved torque profile may use a nonlinear rate limiter, jerk limiter, S-curve, speed-dependent map, or filtered ramp.
Use:
Commanded torque remains within the approved time-domain command envelope, including torque-rate and jerk limits where applicable.
Track:
T_command
dT_command/dt
d²T_command/dt²
reported torque
phase current
longitudinal acceleration
jerk
Main issue 4: C3A-006 still says "vehicle stops"
A brake-override test proves torque removal and controlled deceleration. It does not automatically prove a complete stop unless stopping is explicitly part of the approved route and distance.
Change:
Traction torque requests clear within the approved response window; vehicle decelerates and stops within the approved foundation-brake envelope.
Or separate the two outcomes:
BOS result: traction request removed.
Foundation-brake result: vehicle decelerates/stops within the approved C3B-derived distance envelope.
Main issue 5: C3B says regen is "0 Nm" despite global target doctrine
This should be framed as a control state rather than a universal measurement value:
Regeneration Command State: DISABLED
Allowed negative torque: within supplier-defined zero-regen / no-command tolerance only
There may still be measurement noise, drag torque, inverter estimation error, or supplier-defined switching behavior.
Main issue 6: C3C-003 may be premature "brake blending"
The phrase:
mechanical master-cylinder pressure overlays with inverter braking torque
could imply an actual integrated blending controller already exists.
Use:
Brake/Regeneration Coexistence Observation
unless an engineered blend controller has been formally defined.
Two distinct lanes:
Lane 1 — Independent regen plus normal friction braking: Observe coexistence only.
Lane 2 — Coordinated brake blending: BLOCKED until pedal model, pressure model, deceleration target, failure modes and control ownership are formally approved.
Main issue 7: C3C-004 "high SOC" must be supplier-defined
Do not create a generic high-SOC boundary.
Use:
Regen availability must be bounded by the active BMS charge-power/current permission, pack voltage, cell-voltage ceiling, temperature state, contactor state and supplier-defined operating limits.
The actual authority should come from the BMS permission—not a generic SOC percentage.
Main issue 8: C3C-005 should avoid "manually simulate over the internal bus"
That could sound like arbitrary message injection.
Use:
Use supplier-supported test mode, approved signal-substitution fixture, HIL interface, or bounded conversion-side simulation to assert a charge-acceptance restriction.
No guessed or unauthorized BMS message injection.
Main issue 9: C3C-007 needs a driver/brake response rule
An inverter communication fault during regeneration may cause an abrupt loss of deceleration. Add:
Expected response:
- regen request removed
- no lingering torque-producing or braking current outside approved decay envelope
- driver warning asserted
- foundation-brake authority remains available
- driver applies service brake as required by the test plan
- fault latches
- no automatic regen restoration
Do not imply the vehicle automatically transitions to mechanical braking unless a validated automatic brake-actuation system actually exists.
Main issue 10: C3D still contradicts its own no-number rule
You state numeric values must not be populated before approval, but the table includes:
≤5% parity
0 Nm
Immediate Torque Cutout
Hard Clamped
Replace with:
Wheel-Speed Envelope: KINEMATIC_MODEL_PENDING_APPROVAL
Maximum Regen Request: DISABLED_COMMAND_STATE
Abort Response: TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW
Maximum Torque / Ramp: TEST_CELL_VALUE_PENDING_APPROVAL
"Immediate" should be removed again.
Main issue 11: steering-angle map needs failure handling
Add a steering signal state matrix:
VALID
DEGRADED
IMPLAUSIBLE
UNAVAILABLE
STALE
Suggested authority:
VALID: operate within approved cell.
DEGRADED: further derate or inhibit progression.
IMPLAUSIBLE: torque-inhibit request and fault latch.
UNAVAILABLE: no steering-dependent envelope expansion.
STALE: treat as invalid after approved timeout.
Do not let an old/frozen steering value continue authorizing torque.
Main issue 12: C3E fault hierarchy is announced but not listed
You wrote:
Testing must progress strictly through the following sequential fault-pairing hierarchy:
But the actual hierarchy is missing.
Add:
C3E Fault Escalation Hierarchy
Level 1 — Single Fault
- APPS plausibility fault
- steering signal invalid/stale
- wheel-speed disagreement
- inverter heartbeat loss
- BMS charge-permission removal
- brake-assist-not-ready
- steering-assist-not-ready
- auxiliary-voltage low
- test-boundary alert
- E-stop activation
Level 2 — Repeated Single Fault
- repeat each approved Level 1 fault across permitted cells
- verify latch consistency
- verify no auto-retry
- verify thermal/recovery state
Level 3 — Approved Paired Fault
- signal fault + communication loss
- assist-system fault + torque request
- regen request + charge-permission removal
- steering plausibility fault + wheel-speed disagreement
- low-voltage event + active propulsion request
Level 4 — Compound Fault
Only after Level 1–3 signed passes and formal hazard review.
Every pair needs an approved rationale. Do not combine faults randomly.
Add a result-validity rule
Because you now lock configurations, add:
Test Result Validity Rule
A signed result applies only to the archived:
- hardware configuration
- firmware/software hashes
- calibration hashes
- active DBC version
- test-cell limits
- vehicle mass/loading
- tire configuration
- instrumentation set
- environmental window
Any change triggers: IMPACT_REVIEW_REQUIRED
The prior result may be:
- REUSABLE
- PARTIALLY_REUSABLE
- REPEAT_TEST_REQUIRED
- INVALIDATED
This will matter enormously when you update firmware or swap an inverter.
Correct Build Engine status
Gate 05M-C3
Status:
PROCEDURE_ARCHITECTURE_MATURE
REVISION_02_APPLIED
RUNOUT_ARTIFACT_SCHEMA_INCOMPLETE
CONFIGURATION_LOCK_DEFINED
TELEMETRY_SYNC_DEFINED
CELL_ESCALATION_DEFINED
C3A_PATH_OBSERVATION_READY
C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED
C3B_FOUNDATION_BRAKE_BASELINE_DEFINED
C3C_REGEN_CONTROL_OWNERSHIP_PARTIALLY_PENDING
C3D_CELL_VALUES_PENDING_APPROVAL
C3E_FAULT_HIERARCHY_INCOMPLETE
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
FORMAL_ENGINEERING_REVIEW_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
Bottom line
This is very good. Revision 02 fixed nearly every major architectural weakness. Before formal baseline lock, complete these remaining items:
1. Finish the RunoutCalculation_ID field list and equation.
2. Keep C3A-009B locked until external control authority is validated.
3. Replace "linear" with an approved command envelope.
4. Separate BOS torque removal from foundation-brake stopping.
5. Treat regen-disabled as a command state, not literal perfect 0 Nm.
6. Separate coexistence observation from true brake blending.
7. Use BMS charge permission, not generic high SOC.
8. Ban arbitrary internal-bus fault-message injection.
9. Add driver/brake response after regen loss.
10. Remove premature numeric values and "immediate" from C3D.
11. Add steering-signal validity states.
12. Complete the C3E single/paired/compound fault hierarchy.
13. Add configuration-change result-validity logic.
After those edits, the correct label is:
GATE_05M_C3_REVISION_02_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW
That means the procedure architecture is mature—not that any physical vehicle has passed it.
