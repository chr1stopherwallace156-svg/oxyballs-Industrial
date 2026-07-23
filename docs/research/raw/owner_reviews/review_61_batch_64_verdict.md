# Owner review_61 — verdict on batch 64 (Research Hunter "62:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I). This is
> the owner's own review/verdict text. The OSHA/NHTSA references are
> owner-paraphrased and UNVERIFIED — NeedsExactSource. The raw Research
> Hunter payload is archived at
> `../research_hunter/batch_64_gate05mc1_mc2ab_corrected.md`.

---

MY REPSOND

My verdict: this is much better. You applied the big safety fixes correctly:
Hand-lock wheel removed ✅
dT_command/dt corrected ✅
Rollback split into 05M-C2B ✅
Fault latch now requires diagnostic review + approved clear ✅
Proof Artifact / Authority Status / Build Engine Status columns added ✅
05M-C3 no longer automatically unlocks speed ✅
This is now a serious first ground-contact movement gate. Because this stage involves live HV and actual vehicle movement, it should stay under qualified personnel, LOTO/hazardous-energy controls, controlled test area, spotters, and remote E-stop. OSHA's LOTO standard covers unexpected energization or stored-energy release during service/maintenance, OSHA electrical work-practice rules require qualified-person procedures for electrical work, and NHTSA warns to assume EV high-voltage components may be energized and can pose shock hazards.
What is strongest now
The new safety rules are excellent:
Response windows instead of "instant"
Wheel-speed data read-only unless Ford-authorized
First movement on predictable-traction controlled surface
No hands near rotating components
dT_command/dt standard
Motion-related faults cannot clear by hard reset
That is exactly the kind of doctrine the Build Engine needs.
Remaining cleanup before baseline
1. "Authority Status" should not say "Approved by" yet
Your table says things like:
Approved by Lead Controls Engineer
Approved by Safety Director
But these tests have not actually been executed yet. Change that column to:
Required Approver
Example:
Required Approver: Lead Controls Engineer
Authority Status: SIGNOFF_REQUIRED / NOT_EXECUTED
Build Engine Status: PENDING_EXECUTION
That avoids implying a test already passed.
2. Add the numeric-threshold authority rule
You still need the global rule above 05M-C2A:
All numeric values in Gate 05M-C2A / 05M-C2B are INITIAL_TARGET_PROFILE values unless upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.

This includes:
0–5% APPS dead-band
≤20 Nm/sec dT_command/dt
≤30 Nm creep clamp
15–25 Nm breakaway range
≤5% parity window
≤10 Nm brake-hold request
≤1 meter creep distance
<2° incline

No threshold creates gate authority until tied to supplier data, calibrated measurement method, proof artifact, and engineering signoff.
3. Be careful with the 15–25 Nm breakaway range
For a heavy platform like an F-450/F-550, 15–25 Nm may be too light depending on gearing, tire load, brake drag, axle ratio, grade, tire pressure, and drivetrain configuration.
Change:
confirming controlled forward/reverse steps within the 15–25 Nm breakaway envelope
to:
mapping the actual breakaway torque baseline. Values outside the initial expected range trigger NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not automatic failure.
4. Replace "absolute control" language
This line:
vehicle crawls forward under absolute control
should become:
vehicle crawls forward within approved creep-speed, torque, and runout limits
Same idea for:
full steering and braking assistance remains completely active
Use:
steering and braking assist remain within approved pressure, voltage, and response thresholds
5. Static brake-hold should have a measurable threshold
Instead of:
Mechanical service brakes must completely hold the vehicle static
Use:
Vehicle displacement remains below approved measurement threshold during brake-hold torque request.
That lets you measure it with wheel-speed, hub marker, video, or external position sensor.
Corrected status
Use this:
Gate 05M-C2A — Flat-Ground Restricted Creep

Status:
FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE
LIVE_HV_PRESENT
GROUND_CONTACT_PRESENT
RESTRICTED_CREEP_ONLY
PREDICTABLE_TRACTION_SURFACE_REQUIRED
REMOTE_ESTOP_REQUIRED
SPOTTERS_REQUIRED
BRAKE_ASSIST_VERIFICATION_REQUIRED
STEERING_ASSIST_VERIFICATION_REQUIRED
CAN_1_PASSIVE_ONLY
TORQUE_CLAMP_INITIAL_TARGET_ONLY
RAMP_RATE_INITIAL_TARGET_ONLY
REQUIRED_APPROVERS_DEFINED
PROOF_ARTIFACTS_DEFINED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY
And:
Gate 05M-C2B — Controlled Incline / Rollback Hold Validation

Status:
PROVISIONAL_LOCKED
UNLOCKS_ONLY_AFTER_05M_C2A_SIGNOFF
GROUND_CONTACT_PRESENT
CONTROLLED_INCLINE_ONLY
ROLLBACK_LIMITS_SUPPLIER_OR_ENGINEERING_APPROVED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
Bottom line
Yes — this is now very close to baseline.
Fix these final items:
1. Change "Approved by" to "Required Approver."
2. Add numeric-threshold authority rule.
3. Treat 15–25 Nm as expected range, not final pass envelope.
4. Replace "absolute/completely" with measurable thresholds.
5. Define brake-hold displacement threshold.
After that, Gate 05M-C2A / C2B is clean enough to baseline, and the next gate should be 05M-C3 — Controlled Closed-Area Low-Speed Movement, but still with speed/ramp limits held as initial targets only.
