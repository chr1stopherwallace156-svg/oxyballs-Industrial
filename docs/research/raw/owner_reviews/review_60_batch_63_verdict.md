# Owner review 60 — batch 63 ("61:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_63_gate05mc1_mc2_reemit_regression.md`.

---

[Owner framing before the payload — the review_57 recap carried into the
re-emit: "This is the right map. 05M-C1 is exactly the gate you need before
first ground creep." + the fix-"immediately" wording (05M-C1-003 brake override
within the approved response window), the wheel-speed read-only rule, the
05M-C2 "low-friction surface" correction (flat/controlled/closed
predictable-traction surface), and "proceed to Gate 05M-C2, but keep it as
restricted creep torque validation, not normal driving" — "61:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: the direction is right, but this draft did not fully apply the last cleanup yet. It is close, but there are still a few hard safety wording issues that need to be fixed before baselining 05M-C2.
Because this stage combines live HV + actual vehicle movement, it stays in the high-risk category: qualified personnel, lockout/tagout controls, controlled area, remote E-stop, spotters, and no public-road/customer operation. OSHA's LOTO standard covers unexpected energization or stored-energy release during servicing/maintenance, and OSHA electrical work rules limit energized electrical work to qualified persons; NHTSA also says to assume EV high-voltage batteries/components may be energized and warns exposed HV components can create shock hazards.

What is strong
You fixed the surface language correctly:
First ground movement:
flat, controlled, closed test surface
predictable traction
clear runout distance
chocks/barriers staged
spotters outside movement path
remote E-stop available
That is much better than "low-friction floor."
The 05M-C2 matrix also has the right test families:
static brake-hold
forward creep
reverse creep
accelerator clamp
ramp-rate limit
brake override
E-stop
neutral interrupt
wheel-speed/motor parity
steering/brake assist
CAN_1 passive integrity
fault latch
That is the right coverage for first powered ground movement.

But these fixes are still required

1. Remove "hand-lock one lifted wheel"
This is still in 05M-C1:
Hand-lock one lifted wheel safely.
That must be deleted. Replace it with:
Use an approved mechanical wheel restraint, rated hub-locking fixture, or differential test fixture.
Manual hand restraint near rotating wheels, shafts, hubs, or driveline components is strictly forbidden.
That is not optional.

2. Change dQ/dt to dT_command/dt
You still have:
Torque Ramp-Rate Filter (dQ/dt)
Use:
Torque Ramp-Rate Filter (dT_command/dt)
T = torque. Q usually means charge, heat, or quantity.

3. Replace "absolute 0 Nm"
This line is still too perfect:
maps to absolute 0 Nm
Use:
maps to supplier-defined zero-torque threshold
And for current:
phase current remains within supplier-defined zero-current threshold

4. Fix E-stop row
This line is still wrong:
vehicle coasts safely to an immediate stop
A vehicle has inertia. The safety goal is not "instant stop." The safety goal is drive torque removed within the approved response window.
Use:
Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command transitions to zero and phase current decays within the approved threshold. Vehicle coasts or is braked according to the test plan.

5. Fix neutral interrupt wording
You wrote:
VCU must immediately revoke...
Change to:
VCU revokes inverter enable / torque command within the approved response window.

6. Fault latch after failed creep cannot clear by "hard reset"
This line is too weak:
blocks re-energization or creep retries until a hard reset occurs
Use:
blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization.
A hard reset alone should never clear a motion-related fault.

7. Rollback should be split out
05M-C2-009 should not be part of the first flat-ground creep gate.
Use:
05M-C2A — Flat-Ground Restricted Creep
05M-C2B — Controlled Incline / Rollback Hold Validation
Mark rollback as:
PROVISIONAL — only after flat-ground restricted creep passes.

8. Add missing evidence columns
Your 05M-C2 table needs:
Proof Artifact
Authority Status
Build Engine Status
Right now it has the test logic, but not the evidence ledger structure.

Add this global rule above 05M-C2
Numeric Threshold Authority Rule:
All numeric values in Gate 05M-C2 are INITIAL_TARGET_PROFILE values unless upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.
This includes:
- 0–5% APPS dead-band
- 20 Nm/sec torque ramp rate
- 30 Nm creep clamp
- 15–25 Nm breakaway range
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

On 05M-C3
Do not say it "authorizes 15 km/h" yet. Say:
Successful Gate 05M-C2 permits engineering review for Gate 05M-C3.
Any speed ceiling in 05M-C3 remains INITIAL_TARGET_PROFILE until engineering-approved.

Bottom line
Yes — the map is right, and 05M-C2 is the correct next gate.
But before baselining, fix these exact items:
1. Remove hand-lock wheel.
2. Change dQ/dt to dT_command/dt.
3. Replace absolute 0 Nm with zero-torque threshold.
4. Replace immediate stop with response-window language.
5. Replace hard reset with diagnostic review + approved clear.
6. Split rollback into 05M-C2B.
7. Add Proof Artifact / Authority Status / Build Engine Status columns.
8. Do not automatically unlock 15 km/h for 05M-C3.
Once those are corrected, 05M-C2 becomes a strong first-ground-movement gate: tiny creep only, brake/steering verified, remote abort active, torque heavily clamped, and no normal driving authority.
