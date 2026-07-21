# Owner review_63 — verdict on batch 66 (Research Hunter "64:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is the
> owner's own review/verdict text. The raw Research Hunter payload is archived
> at `../research_hunter/batch_66_gate05mc2ab_baseline_candidate.md`.

---

MY RESPONSE

My verdict: this is essentially at baseline-candidate quality now. You fixed the substantive safety architecture:
Empirical breakaway mapping instead of a fake universal range
Measurable vehicle-state language
Measured brake-hold displacement
Brake/steering assist as pre-movement interlocks
Bounded fault injection only
C2A flat-ground first
C2B incline testing locked behind C2A
C3 speed and calibration limits remain manually restricted
The gate sequence is now clean:
05M-C1  Coupled driveline / lifted wheels
05M-C2A Flat-ground restricted creep
05M-C2B Controlled incline and rollback
05M-C3  Controlled closed-area movement
What is especially strong
The two new rules are important:
No creep torque before brake and steering assist verification.
No random live hardware fault creation while the vehicle is moving.
Those close two major holes. Your breakaway-torque rule is also correctly framed: an unexpected value triggers investigation, not an unsupported automatic diagnosis.
The remaining corrections
1. The approval column is still not correct
You still have entries such as:
Approved by Lead Controls Engineer
Approved by Safety Director
while the tests are marked PENDING_EXECUTION or STAGED FOR LOG.
That creates a contradictory record. A procedure can be approved before execution, but the table must distinguish procedure approval from test-result signoff.
Use separate fields:
Required Approver
Procedure Approval Status
Execution Status
Result Signoff Status
Example:
Required Approver: Lead Controls Engineer
Procedure Approval Status: APPROVAL_REQUIRED
Execution Status: NOT_EXECUTED
Result Signoff Status: NOT_ELIGIBLE
After the written procedure is reviewed:
Procedure Approval Status: APPROVED_FOR_CONTROLLED_EXECUTION
Execution Status: PENDING_EXECUTION
Result Signoff Status: NOT_ELIGIBLE
Only after evidence is reviewed:
Execution Status: EXECUTED
Result Signoff Status: SIGNED_PASS / SIGNED_FAIL / NEEDS_REVIEW
This distinction should become a global Build Engine rule.
2. The numeric-authority rule is still missing
All these remain proposed values:
0–5% APPS dead-band
20 Nm/s torque rate
30 Nm creep clamp
10 Nm brake-hold request
1 m movement limit
5% speed parity
2° incline
500 ms pedal test
Add this before C2A:
Numeric Threshold Authority Rule

All numeric thresholds in Gates 05M-C2A and 05M-C2B are
INITIAL_TARGET_PROFILE values unless explicitly upgraded to
SUPPLIER_DEFINED or ENGINEERING_APPROVED.

No threshold has pass, fail, block, or movement authority until linked to:
- source or engineering calculation
- applicable hardware/software configuration
- calibrated measurement method
- uncertainty or tolerance
- proof artifact
- approved procedure revision
- signed engineering authorization
Without this rule, the text still makes several preliminary values sound final.
3. Rename "Absolute Creep Torque Clamp"
You still have:
Absolute Creep Torque Clamp
Change it to:
Restricted Creep Torque Clamp
And change:
Hard-clamped at a defensive boundary
to:
Software-limited to the approved restricted-creep boundary
"Hard clamp" may imply a hardware-independent safety mechanism when it is apparently a VCU software limit.
4. APPS dead-band needs channel plausibility, not only percentage
The dead-band rule should not rely on a single normalized percentage. Add:
APPS Dead-Band Acceptance Rule

Zero-torque eligibility requires:
- both APPS channels within approved idle ranges
- channel correlation within approved tolerance
- no stuck-high or implausible-transition fault
- approved idle stabilization time satisfied
- brake/steering preconditions valid

A normalized pedal percentage alone cannot authorize torque.
This makes the control rule robust against channel disagreement or sensor faults.
5. C2A-005 mixes torque slope and phase-current slope
You wrote:
Inverter phase current development slope must reflect the linear
≤20 Nm/sec constraint profile.
Torque slope and current slope are related but not identical. The inverter's torque estimate, current-loop behavior, motor constants, speed, filtering, and saturation matter.
Use:
VCU commanded torque must remain within the approved
dT_command/dt envelope.

Measured inverter torque feedback and phase-current response must remain
within the supplier-approved tracking envelope for that command profile.
Store both:
commanded torque slope
reported torque slope
phase-current rise and decay
DC-bus current
vehicle acceleration
6. C2A-011 should prove electrical passivity, not "zero errors"
A listen-only analyzer may observe existing network errors that it did not cause. Replace:
zero network collisions or errors are injected
with:
Instrumentation produces no dominant-bit transmission, acknowledgement,
error flag, wake request, diagnostic request, or other active influence on CAN_1.

Any observed OEM network errors are separately logged and attributed;
their mere presence does not prove instrumentation transmission.
This is more technically precise.
7. C2B active hold needs a separate failure-safe strategy
"Release the brake and see whether anti-rollback holds" needs more containment. Add prerequisites:
C2B Rollback Containment Rule

Before service-brake release:
- downhill runout zone clear
- independent secondary restraint or capture method available
- remote E-stop active
- driver ready to reapply service brake
- maximum permitted rollback distance defined
- maximum hold duration defined
- thermal limits defined
- no reliance on traction torque as the sole parking restraint
Also distinguish:
temporary hill-hold assistance
parking-hold function
They are not the same. The traction system should not become a substitute for a mechanical parking brake unless formally designed and approved for that role.
8. Add proof for the assistance interlock itself
C2A-010 currently verifies assistance, but you should also intentionally prove that failed assistance blocks movement:
05M-C2A-010B — Assistance Interlock Inhibition

Using an approved bounded simulation or low-voltage test method, assert:
- brake-assist-not-ready
- steering-assist-not-ready
- auxiliary-voltage-below-approved-window

Expected:
VCU remains torque-inhibited and records the specific blocking reason.

Blocked:
Any traction enable while a required assistance-ready state is invalid.
That turns the prerequisite into a tested interlock instead of an assumed one.
Correct status
Gate 05M-C2A — Flat-Ground Restricted Creep

Status:
BASELINE_CANDIDATE
PROCEDURE_REVIEW_REQUIRED
FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE
LIVE_HV_PRESENT
GROUND_CONTACT_PRESENT
RESTRICTED_CREEP_ONLY
BRAKE_ASSIST_INTERLOCK_REQUIRED
STEERING_ASSIST_INTERLOCK_REQUIRED
REMOTE_ESTOP_REQUIRED
SPOTTERS_REQUIRED
CAN_1_PASSIVE_ONLY
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
CONTROLLED_FAULT_INJECTION_ONLY
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
NO_PHYSICAL_PASS CLAIM UNTIL EXECUTED
Gate 05M-C2B — Controlled Incline / Rollback Hold

Status:
PROVISIONAL_LOCKED
UNLOCKS_ONLY_AFTER_C2A_SIGNED_PASS
ROLLBACK_CONTAINMENT_PLAN_REQUIRED
SECONDARY_RESTRAINT_REQUIRED
TEMPORARY_HILL_HOLD_ONLY
PARKING_HOLD_AUTHORITY_NOT_GRANTED
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE
NO_PUBLIC_ROAD
NO CUSTOMER OPERATION
Bottom line
This is very good and structurally mature. The actual gate logic is no longer the main weakness. The remaining work is chiefly record integrity and measurement authority:
1. Separate procedure approval from result signoff.
2. Add the global numeric-threshold authority rule.
3. Rename the software "absolute/hard" torque clamp.
4. Add dual-channel APPS plausibility.
5. Separate torque-rate validation from current-response validation.
6. Define CAN passivity electrically.
7. Strengthen incline rollback containment.
8. Test that failed brake/steering readiness truly inhibits torque.
After those edits, I would label it:
GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW
It would still be a procedure baseline, not evidence that the physical vehicle has passed the gates.
