# Owner review_64 — verdict on batch 67 (Research Hunter "65:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is the
> owner's own review/verdict text. The raw Research Hunter payload is archived
> at `../research_hunter/batch_67_gate05mc2ab_procedure_baseline.md`.

---

My response !

My verdict: this is now legitimately strong enough to call a formal baseline candidate for 05M-C2A/C2B. The engineering logic is much cleaner, the unsafe shortcuts are gone, and the gate progression is disciplined.
You fixed the major structural issues:
Empirical breakaway mapping instead of fake universal torque assumptions
Measured brake-hold displacement
Dual-channel APPS plausibility
Brake/steering assist as pre-movement interlocks
Bounded fault injection only
Electrical definition of CAN passivity
Rollback containment with secondary restraint
Separate torque-command and phase-current validation
No automatic speed unlock into 05M-C3
What is strongest now
The best new addition is this:
A normalized pedal percentage alone cannot authorize traction torque.
That is exactly right. The system now requires:
APPS channel A valid
APPS channel B valid
channel correlation valid
idle stabilization satisfied
no plausibility fault
brake/steering prerequisites valid
That is much more defensible than a simple "below 5% equals zero torque" rule.
Your CAN rule is also much better. You now define passivity electrically:
no dominant-bit transmission
no ACK
no error flag
no wake request
no diagnostic request
no active influence
That is far stronger than simply saying "no logged errors."
The remaining items before baseline lock
1. You still have a record-integrity problem in the approval column
The table continues to say:
Approved by Lead Controls Engineer
Approved by Safety Director
while the tests are still:
PENDING EXECUTION
STAGED FOR LOG
LOCKED / UNDER REVIEW
This is the final major documentation issue.
A procedure may be approved before testing, but the system must clearly distinguish:
Required Approver
Procedure Approval Status
Execution Status
Result Signoff Status
Use this model:
Required Approver: Lead Controls Engineer
Procedure Approval Status: APPROVAL_REQUIRED
Execution Status: NOT_EXECUTED
Result Signoff Status: NOT_ELIGIBLE
After procedure review:
Procedure Approval Status: APPROVED_FOR_CONTROLLED_EXECUTION
Execution Status: PENDING_EXECUTION
Result Signoff Status: NOT_ELIGIBLE
After the test:
Execution Status: EXECUTED
Result Signoff Status:
SIGNED_PASS
SIGNED_FAIL
NEEDS_REVIEW
INVALID_TEST
Do not use "Approved by" alone. It is too ambiguous.
2. The numeric-threshold authority rule is still missing
You still have values that read like active limits:
≤20 Nm/sec
≤30 Nm
≤10 Nm
≤1 meter
≤5%
<2°
<500 ms
Add this immediately before the Global Constraints section:
Numeric Threshold Authority Rule

All numeric thresholds in Gate 05M-C2A and Gate 05M-C2B are
INITIAL_TARGET_PROFILE values unless explicitly upgraded to
SUPPLIER_DEFINED or ENGINEERING_APPROVED.

No threshold may create pass, fail, block, movement, or release authority
until linked to:

- applicable hardware and software configuration
- supplier source or engineering calculation
- calibrated measurement method
- measurement tolerance and uncertainty
- proof artifact
- approved procedure revision
- signed engineering authorization
Without this, the architecture is good but the numbers still appear more mature than they are.
3. APPS wording needs one small correction
You wrote:
All brake/steering preconditions remain completely valid.
You previously removed "completely" because it is not measurable.
Use:
All required brake-assist, steering-assist, auxiliary-voltage, and motion-authority prerequisites remain within their approved operating windows.
4. C2A-005B is still slightly too direct
You wrote:
Inverter phase current rise must dynamically map to the validated
dT_command/dt profile without lagging or oscillating.
Some lag is expected because of command filtering, current-loop bandwidth, torque estimation, bus voltage, motor speed, and sampling delay.
Use:
Measured inverter torque feedback and phase-current response must remain
within the supplier-approved dynamic tracking envelope for the commanded
dT_command/dt profile.

Expected latency, filtering, current-loop bandwidth, and measurement delay
must be included in the acceptance envelope.
Blocked states should become:
- phase-current overshoot beyond approved envelope
- sustained oscillation
- unexplained delay beyond approved response window
- torque feedback divergence
- command/current polarity mismatch
5. E-stop should not automatically require opening the HV contactors in every case unless supplier architecture says so
Your E-stop row says:
Hardwired safety loop interrupts contactor/control supply path
That may be correct for your chosen architecture, but it should stay architecture-dependent.
Safer wording:
The hardwired safety loop forces the supplier-defined emergency torque-inhibit and HV-isolation response.

Where the approved architecture requires contactor coil-supply interruption, the hardwired loop must perform that function within the approved response window.
This avoids creating a universal rule that could conflict with a supplier's inverter/BMS/PDU shutdown sequencing.
6. C2A-008 neutral behavior should not universally require disabling all bridge switching
You currently block:
bridge switching while in Neutral
Some systems may use switching for controlled zero-torque state, diagnostics, field control, or other supplier-defined behavior.
Use:
Blocked:
- torque-producing current while Neutral is valid
- active drive command remaining asserted
- vehicle propulsion torque persisting
- inverter state inconsistent with supplier-defined Neutral behavior
7. C2B rollback language needs a fail-safe brake rule
You added secondary restraint, which is excellent. Add this:
Rollback test abort rule:

If rollback exceeds the approved distance or speed threshold:
- driver reapplies service brake
- independent restraint captures movement if required
- torque command is removed
- test is latched FAIL / NEEDS_REVIEW
- no automatic second attempt is permitted
8. C2A-001 should say "test torque," not "full torque application"
Your amendment says:
during full torque application
But the actual test uses a restricted request such as ≤10 Nm.
Change it to:
during the approved brake-hold test torque profile
"Full torque" could be interpreted as full motor torque, which is not what this gate permits.
Correct status
Gate 05M-C2A — Flat-Ground Restricted Creep

Status:
BASELINE_CANDIDATE
FORMAL_ENGINEERING_REVIEW_REQUIRED
FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE
LIVE_HV_PRESENT
GROUND_CONTACT_PRESENT
RESTRICTED_CREEP_ONLY
DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED
BRAKE_ASSIST_INTERLOCK_REQUIRED
STEERING_ASSIST_INTERLOCK_REQUIRED
CAN_1_ELECTRICALLY_PASSIVE_ONLY
CONTROLLED_FAULT_INJECTION_ONLY
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
PROCEDURE_APPROVAL_REQUIRED
EXECUTION_NOT_YET_PROVEN
RESULT_SIGNOFF_NOT_YET_ELIGIBLE
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
Gate 05M-C2B — Controlled Incline / Rollback Hold

Status:
PROVISIONAL_LOCKED
UNLOCKS_ONLY_AFTER_C2A_SIGNED_PASS
SECONDARY_RESTRAINT_REQUIRED
ROLLBACK_ABORT_RULE_REQUIRED
TEMPORARY_HILL_HOLD_ONLY
PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
Bottom line
This is very good now. The technical architecture is largely there. The remaining work is about making the document impossible to misread:
1. Separate procedure approval from test-result signoff.
2. Add the global numeric-threshold authority rule.
3. Remove "completely valid."
4. Allow expected current-loop latency inside an approved envelope.
5. Make E-stop behavior supplier-architecture dependent.
6. Define Neutral by zero propulsion torque, not universal zero switching.
7. Add a rollback abort rule.
8. Replace "full torque application" with approved test torque profile.
After those changes, I would label this:
GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW
That means the procedure is ready to be reviewed and controlled, not that the physical vehicle has passed it.
