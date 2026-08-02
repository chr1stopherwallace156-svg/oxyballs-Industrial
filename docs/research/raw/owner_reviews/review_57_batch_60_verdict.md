# Owner review 57 — batch 60 ("59:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_60_gate05mb_cleanup_gate05mc1_lifted.md`.

---

[Owner framing before the payload — the review_56 corrections carried into the
Gate 05M-B-cleanup + Gate 05M-C1 prompt: cleanup 5 (05M-B watchdog blocked
state — coasting is not the failure; blocked = inverter continues actively
driving / phase current persists beyond approved decay window / torque command
remains active after watchdog loss / inverter fails to enter supplier-defined
safe state); cleanup 7 (05M-C should not jump to open-floor movement — split
05M-C1 Coupled Driveline Static / Lifted-Wheel Readiness → 05M-C2 Restricted
Creep Torque Validation → 05M-C3 Controlled Closed-Area Low-Speed Movement; the
first coupled test proves mechanical coupling, backlash, wheel-speed sensing,
brake override, and torque clamp before open-floor operation) — "59:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is a strong next stage, and 05M-C1 is the right bridge before ground movement. You correctly separated:
05M-B = motor spins uncoupled
05M-C1 = driveline coupled but wheels lifted
05M-C2 = first restricted ground creep
That is the right risk progression.
But there are a few important safety/wording fixes before you baseline this.

Biggest issue: "hand-lock one lifted wheel" must go
This line is dangerous:
Hand-lock one lifted wheel safely.
Replace it with:
Use an approved mechanical wheel restraint / differential test fixture / rated hub-locking fixture. Manual hand restraint near rotating driveline components is forbidden.
No hands near rotating wheels, shafts, hubs, belts, or couplers. Ever.

05M-C1 is good, but add a lift safety rule
Since the vehicle is now coupled to wheels, even lifted, this is a major mechanical hazard. Add:
Lifted Chassis Safety Rule:
05M-C1 may only run on a rated chassis lift or rated heavy-duty stands approved for the vehicle GVWR/axle load. Vehicle must be secured against roll, suspension droop must be accounted for, wheel rotation zones must be guarded, and no personnel may stand inline with rotating tires, shafts, or hubs.
Also add:
No person may be under the vehicle while energized rotation tests are active.

Fix "immediately" language again
You still have:
VCU must instantly clear traction torque commands.
Brake activation immediately overrides...
Use:
within supplier-defined / engineering-approved response window
So 05M-C1-003 should say:
VCU clears traction torque commands within the approved brake-override response window. Inverter phase current decays within approved threshold. Mechanical brakes slow or stop the lifted wheels without the inverter fighting the service brakes.

Wheel speed sensor warning
This line needs caution:
VCU pulls speed data independently from ABS/wheel encoders.
Because earlier your rule was CAN_1 listen-only and no factory control injection.
Use:
Wheel speed data may be observed only through an authorized read-only path, passive logging path, or independent external instrumentation. Factory ABS/ESC data must not become traction-control authority unless Ford-authorized documentation and engineering review approve it.
For now, wheel-speed parity should be verification, not control authority.

05M-B over-speed test still needs supplier-supported wording
This line:
Temporarily lower the software over-speed limit threshold below current RPM.
Replace with:
Use a supplier-supported test mode or pre-approved calibration profile to trigger over-speed protection at a controlled low RPM.
No casual live editing of safety limits while spinning.

05M-C2 "low-friction surface" is questionable
You wrote:
flat, unobstructed testing surface with a low-friction profile
For first ground movement, I would not make "low-friction" the default. Low-friction can cause wheel slip, weird ABS/ESC reactions, and poor steering/brake feedback.
Use:
flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and remote E-stop available.
If you intentionally test low friction later, make that a separate future gate.

Add global target rule to 05M-B / 05M-C1
All these are still initial targets:
≤2% torque
500 RPM
±1.0° electrical
≤3% phase balance
≤1% torque pulse
100 RPM
≤5% wheel speed tolerance
≤5% torque clamp
Add:
All numeric values are INITIAL_TARGET_PROFILE values until upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED with proof artifacts.

Correct status labels
Use this:
Gate 05M-B:
NO_LOAD_MOTOR_SPIN_VALIDATION_DEFINED
MOTOR_UNCOUPLED_REQUIRED
GUARDED_SHAFT_REQUIRED
SUPPLIER_SPIN_PROFILE_REQUIRED
NO_DRIVELINE_TORQUE_PATH
NO_VEHICLE_MOVEMENT

Gate 05M-C1:
COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED
RATED_LIFT_OR_STANDS_REQUIRED
ROTATING_WHEEL_GUARDS_REQUIRED
NO_GROUND_CONTACT
NO_OPEN_FLOOR_MOVEMENT
NO_CAN_1_CONTROL_AUTHORITY
BRAKE_OVERRIDE_REQUIRED
MICRO_TORQUE_LIMIT_TARGET_ONLY

Gate 05M-C2:
RESTRICTED_CREEP_TORQUE_CONCEPT_STARTED
GROUND_CONTACT_PRESENT
CLOSED_CONTROLLED_TEST_AREA_REQUIRED
REMOTE_ESTOP_REQUIRED
SPOTTERS_REQUIRED
NO_PUBLIC_ROAD
NO_CUSTOMER_OPERATION

Bottom line
This is the right map. 05M-C1 is exactly the gate you need before first ground creep.
Main fixes:
1. Remove "hand-lock wheel" — use rated fixture only.
2. Add rated lift / stand / rotating wheel guard rule.
3. Keep wheel speed data read-only unless authorized.
4. Replace "instantly" with approved response window.
5. Make 05M-C2 controlled predictable traction, not default low-friction.
6. Keep every number as INITIAL_TARGET_PROFILE.
After those edits, this becomes a strong baseline for moving from no-load spin to coupled lifted driveline validation.
