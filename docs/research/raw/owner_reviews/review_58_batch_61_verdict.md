# Owner review 58 — batch 61 (owner label "59A") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_61_gate05mc1_reemit_gate05mc2_creep.md`.

---

[Owner framing before the payload — two phrasings of the same question:
"Thoughts? Proceed to Gate 05M-C2 detailed creep torque validation and rate
limit matrices?" and "What specific breakaway torque thresholds, ramp-rate
filters, pedal dead-band limits, and low-friction rollout tracking parameters
are required under Gate 05M-C2 to govern the initial ground-contact move of the
vehicle?" — "59A".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: yes, proceed with Gate 05M-C2 — but this draft needs a few important corrections before it becomes baseline. This is now the first powered ground-contact movement gate, so it has to be stricter than lifted-wheel testing.
Because this stage has live HV and the vehicle can physically move, it must stay under qualified HV personnel, LOTO controls, exclusion zone, spotters, remote E-stop, and no public-road/customer operation. OSHA's lockout/tagout standard is about controlling hazardous energy during servicing where unexpected energization can injure people, and OSHA electrical work-practice rules require qualified-person handling for energized electrical work; NHTSA also warns that exposed EV high-voltage components can create shock hazards.

The big correction: do not use "low-friction surface" as default
This line is the main problem:
flat, unobstructed, low-friction surface
polished concrete / epoxy test-bay floor
For first ground-contact creep, I would change it to:
flat, controlled, predictable-traction surface
clear runout zone
physical wheel chocks/barriers staged
remote E-stop active
spotters positioned outside the movement path
no public road
no customer operation
Low-friction testing should be a later separate gate, because low friction can create wheel slip, weird ABS/ESC reactions, poor brake feedback, and misleading breakaway torque data.

Second correction: use dT/dt, not dQ/dt
You wrote:
torque ramp filters (dQ/dt)
For torque, use:
dT/dt = torque ramp rate
Q usually reads like charge, heat, or generalized quantity. Since you mean torque command slope, call it:
Torque Ramp-Rate Filter:
dT_command/dt

Third correction: hard numbers are still initial target profiles
These values are useful, but they are not final authority yet:
0–5% pedal dead-band
20 Nm/sec torque ramp
30 Nm creep clamp
15–25 Nm breakaway expectation
2 km/h slip threshold
3 km/h creep speed
<2° incline
Add this rule above the gate:
Numeric Threshold Authority Rule:
All numeric values in Gate 05M-C2 are INITIAL_TARGET_PROFILE values unless upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.
No value may create gate authority until tied to:
- supplier documentation
- engineering review
- calibrated measurement method
- raw proof artifact
- signed approval

Fourth correction: brake/steering assist must be preconditions
Before any ground movement, add:
Ground Movement Precondition:
No creep torque may be commanded unless:
- service brake function is verified
- brake assist is verified
- steering assist is verified
- E-stop is armed
- remote E-stop is active
- spotters are clear
- runout path is clear
- torque clamp is active
- ramp-rate limit is active
- engineer/test lead gives explicit start authorization
This matters because this is the first time the vehicle can actually roll.

Fifth correction: rollback incline should probably move later
This row:
minor test-bay incline (<2°)
rollback / active hold
I would not put that in the first ground-contact gate. Do flat-ground creep first. Then make rollback a subgate:
05M-C2A — Flat Ground Restricted Creep
05M-C2B — Controlled Incline / Rollback Hold Validation
That keeps the first movement simple and controlled.

Fix the wording in your matrix
05M-C2-001 — Pedal Dead-Band
Change:
absolute 0 Nm
to:
torque request remains within supplier-defined zero-torque threshold
No sensor is truly perfect zero.
05M-C2-002 — Breakaway Mapping
Good concept. Change the failure condition:
Breakaway torque requirement >30 Nm indicates mechanical binding
to:
Breakaway torque above approved creep clamp triggers NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not automatic final diagnosis.
It could be tire pressure, slope, brake drag, gear ratio, curb weight, axle load, or calibration.
05M-C2-003 — Ramp Rate
Change:
dQ/dt
to:
dT_command/dt
And phrase it like:
Rapid APPS input is permitted only as a controlled test input. VCU torque output must rise according to the approved ramp-rate limiter, not raw pedal slope.
05M-C2-004 — Rollback
Move this to 05M-C2B or mark it provisional:
PROVISIONAL — only after flat-ground creep has passed.
05M-C2-005 — E-stop During Creep
Change:
Inverter torque drops to zero instantly
to:
Inverter torque command transitions to zero and phase current decays within supplier-approved response window. Vehicle coasts or is braked manually according to test plan.

Corrected 05M-C2 status
Use this:
Gate 05M-C2 — Restricted Creep Torque Validation
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
TORQUE_CLAMP_INITIAL_TARGET_ONLY
RAMP_RATE_INITIAL_TARGET_ONLY
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY

Better split for 05M-C2
I'd structure it like this:
05M-C2A — Flat-Ground Restricted Creep
- brake hold pre-check
- APPS dead-band
- forward inching
- reverse inching
- torque clamp
- torque ramp-rate limit
- E-stop during creep
- brake override during creep
- CAN_1 passive monitoring
05M-C2B — Controlled Rollback / Incline Hold
- tiny incline only
- rollback threshold
- brake hold
- anti-rollback response
- no surge correction
- manual brake recovery
05M-C2C — Faulted Creep Recovery
- failed creep event
- fault latch
- service clear blocked
- power cycle recovery
- no automatic re-drive

Bottom line
Yes — proceed to 05M-C2, but fix these before baselining:
1. Replace low-friction surface with predictable-traction controlled surface.
2. Use dT/dt, not dQ/dt.
3. Label all numbers INITIAL_TARGET_PROFILE.
4. Add brake assist + steering assist preconditions.
5. Move rollback/incline to 05M-C2B.
6. Replace "instant" and "absolute zero" wording with supplier-approved response/tolerance windows.
After that, Gate 05M-C2 becomes a strong first-movement gate: tiny creep, heavily clamped torque, verified brakes, verified steering, remote abort, no normal driving.
