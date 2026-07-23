# Owner review 59 — batch 62 (owner label "60:60") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_62_gate05mc2_reemit_regression.md`.

---

[Owner framing before the payload — the question re-asked verbatim: "What
specific breakaway torque thresholds, ramp-rate filters, pedal dead-band
limits, and low-friction rollout tracking parameters are required under Gate
05M-C2 to govern the initial ground-contact move of the vehicle?" — "60:60".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: Gate 05M-C2 is the right next gate, and this draft is strong — but it still has a few cleanup items before it becomes baseline.
You are now at the first powered ground-contact movement gate, so this is a major boundary.
05M-B  = no-load motor spin
05M-C1 = coupled driveline, wheels lifted
05M-C2 = tires on ground, restricted creep only
05M-C3 = controlled closed-area low-speed movement

What is strong
You fixed the biggest surface issue:
flat, controlled, closed test surface
predictable traction
clear runout distance
chocks/barriers staged
spotters outside movement path
remote E-stop available
That is much better than "low-friction floor."
Your 05M-C2 test coverage is also good:
static brake-hold
forward creep
reverse creep
pedal clamp
current/torque ramp-rate
brake override
E-stop
neutral interrupt
rollback
wheel-speed/motor parity
steering/brake assist
CAN_1 passive integrity
fault latch after failed creep
That is the right matrix for first ground movement.

Critical cleanup 1: remove "hand-lock one lifted wheel"
This is still in 05M-C1:
Hand-lock one lifted wheel safely.
That must be removed.
Use:
Use an approved mechanical wheel restraint, rated hub-locking fixture, or differential test fixture.
Manual hand restraint near rotating wheels, shafts, hubs, or driveline components is strictly forbidden.
That is a hard safety correction.

Critical cleanup 2: use dT/dt, not dQ/dt
You still have:
Torque Ramp-Rate Filter (dQ/dt)
Change to:
Torque Ramp-Rate Filter (dT_command/dt)
T = torque. Q usually means charge, heat, or generic quantity. For torque slope, use dT/dt.

Critical cleanup 3: remove "absolute 0 Nm" language
You still have:
maps to absolute 0 Nm
Use:
maps to supplier-defined zero-torque threshold
Same idea for "phase current zero." Use:
phase current remains within supplier-defined zero-current threshold
Sensors and current readings always have noise. You want approved tolerance, not mathematical perfection.

Critical cleanup 4: E-stop wording
This row says:
High-voltage bus drops out; inverter torque drops to zero; vehicle coasts safely to an immediate stop.
Better:
Hardwired safety loop interrupts contactor/control supply path within approved response window. Inverter torque command transitions to zero and phase current decays within approved threshold. Vehicle coasts or is braked according to the test plan.
Do not say the vehicle stops "immediately." A moving vehicle has inertia. The safety goal is no active drive torque, not magic instant stopping.

Critical cleanup 5: rollback should be separate
This row is good, but I would split it out:
05M-C2A — Flat-Ground Restricted Creep
05M-C2B — Controlled Incline / Rollback Hold
First prove flat ground forward/reverse creep. Then do the incline/rollback. That is cleaner and safer.
So mark 05M-C2-009 as:
PROVISIONAL — only after flat-ground restricted creep passes.

Critical cleanup 6: add proof artifact column to 05M-C2
Your 05M-C2 matrix needs the same evidence structure as earlier gates.
Add:
Proof Artifact
Authority Status
Build Engine Status
For example:
05M-C2-006 Brake Override During Creep
Proof Artifact:
time-synced APPS/brake/CAN torque command log,
phase current decay trace,
vehicle speed trace,
video record,
test lead signoff.
Authority Status:
RESTRICTED_CREEP_ONLY / NO_NORMAL_DRIVING_AUTHORITY

Critical cleanup 7: "hard reset" is too weak for failed creep
This line:
blocks re-energization or creep retries until a hard reset occurs
Change to:
blocks re-energization or creep retries until diagnostic review, fault source correction, approved service clear, and engineering/test lead authorization.
A hard reset alone should not clear a motion-related fault.

Critical cleanup 8: don't "unlock 15 km/h" automatically
This line is too strong:
unlocking track-surface speeds up to 15 km/h
Use:
permits engineering review for Gate 05M-C3 controlled closed-area low-speed movement.
Any speed ceiling in 05M-C3 remains INITIAL_TARGET_PROFILE until engineering-approved.
Do not make 15 km/h automatic just because C2 passed.

Add this global rule above 05M-C2
Numeric Threshold Authority Rule:
All numeric values in Gate 05M-C2 are INITIAL_TARGET_PROFILE values unless upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.
This includes:
- 0–5% APPS dead-band
- 20 Nm/sec torque ramp rate
- 30 Nm creep clamp
- 15–25 Nm breakaway range
- 2 km/h slip threshold
- 5% sensor parity window
- 10 Nm brake-hold torque request
- 1 meter creep distance
- 2 degree incline
No threshold may create gate authority until tied to supplier documentation, calibrated measurement method, raw proof artifact, and engineering signoff.

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
CAN_1_PASSIVE_ONLY
TORQUE_CLAMP_INITIAL_TARGET_ONLY
RAMP_RATE_INITIAL_TARGET_ONLY
FAULT_LATCH_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION
NO_NORMAL_DRIVING_AUTHORITY

Bottom line
Yes — proceed with 05M-C2, but clean up these items first:
1. Remove "hand-lock wheel."
2. Change dQ/dt to dT/dt.
3. Replace absolute 0 Nm with zero-torque threshold.
4. Replace "immediate stop" with measured response window.
5. Split rollback into 05M-C2B.
6. Add proof artifact / authority status columns.
7. Replace "hard reset" with diagnostic review + authorized clear.
8. Do not automatically unlock 15 km/h.
After that, Gate 05M-C2 becomes a strong first-movement gate: tiny controlled creep, verified brakes, verified steering, strict torque clamp, rate-limited current, remote E-stop, and no normal driving authority.
