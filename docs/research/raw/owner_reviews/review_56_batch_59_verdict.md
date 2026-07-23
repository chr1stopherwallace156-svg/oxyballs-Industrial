# Owner review 56 — batch 59 ("58:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_59_gate05lbc_ma_mb_cleanups_gate05mc_preview.md`.

---

[Owner framing before the payload — the review_55 corrections carried into the
Gate 05L-B/05L-C/05M-A/05M-B-cleanups prompt: cleanup 1 (05L-C shutdown order —
supplier-defined BMS/PDU shutdown architecture; blocked: violates supplier docs
/ leaves unintended energized path / prevents verified DC-link discharge /
feedback mismatch; exit reworded); cleanup 3 (05L-B RC curve is a comparison
model only; supplier-approved pre-charge envelope); cleanup 4 (05M-A tolerance
wording — supplier-defined zero-current threshold / resolver noise-drift
tolerance / no torque-producing current beyond approved threshold / no
unintended shaft movement); cleanup 6 (05M-B physical boundary — guarded shaft,
no driveline, no wheel torque path, no vehicle-movement path, E-stop active,
exclusion zone active, supplier spin profile only, no cabin pedal authority) —
"58:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is very strong, and the architecture is now in the right order. You fixed the major safety boundaries:
05L-B = live HV pre-charge observation
05L-C = shutdown / discharge / repeatability
05M-A = inverter ready / zero-torque validation
05M-B = no-load motor spin
05M-C = controlled low-speed traction readiness
That sequence makes sense. Because these gates involve live high voltage, keep the Build Engine language strict: qualified HV personnel, LOTO, supplier-defined limits, proof artifacts, and no customer/road authority. OSHA's lockout/tagout standard is specifically about controlling hazardous energy during servicing where unexpected energization or stored-energy release can injure workers, and OSHA electrical work-practice rules limit work on energized parts to qualified persons using appropriate PPE, insulating materials, and insulated tools. NHTSA also says to assume EV high-voltage batteries/components may be energized and that exposed HV parts can create shock hazards.

What is strongest
The four amendment rules are excellent:
Isolation fault injection = rated/current-limited fixture only
No automatic retry after manual E-stop
05M-A = torque-disabled readiness only
05M-B = guarded, uncoupled no-load spin only
That is exactly the right Build Engine doctrine. You are preventing the dangerous jump from "the HV bus is alive" to "let's spin / move the vehicle."

Main cleanup 1: add one global numeric-threshold rule
You still have hard values throughout:
≤50 ms
≤500 ms
ΔV ≤5%
>60 V
≤20 ms
≤2 attempts
10 cycles
≤2% torque
500 RPM
±1.0° electrical
≤3% phase balance
Keep them, but add this above the whole section:
Numeric Threshold Authority Rule:
All numeric values in Gates 05L-B, 05L-C, 05M-A, and 05M-B are INITIAL_TARGET_PROFILE values unless explicitly upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.
No threshold may create gate authority until tied to:
- supplier documentation
- engineering review
- calibrated measurement method
- raw proof artifact
- signed approval
That one rule protects every number in the document.

Main cleanup 2: 05L-B-005 still violates your own "no absolute zero" rule
This line:
Coil drive lines are strictly maintained at absolute 0.0V.
Power-up sequence is immediately blocked.
Change it to:
Coil drive lines remain in the supplier-defined OFF state and below the approved off-state leakage threshold.
Power-up sequence is blocked before any coil-output enable command is issued.
That is cleaner than "absolute 0.0V" and "immediate."

Main cleanup 3: 05L-C-004 still says "immediate"
This exit criterion says:
immediate, reliable system isolation shutdown
Change to:
system isolation shutdown within the supplier-defined IMD/BMS/PDU response window
That is better because IMD detection has real measurement time, filtering, CAN timing, and BMS/PDU decision delay.

Main cleanup 4: 05M-A should not say "Ready-to-Drive"
This row still says:
Step vehicle into an active "Ready-to-Drive" state
For 05M-A, use:
Step inverter into supplier-defined ready / torque-disabled state.
Driver torque authority remains masked.
No traction command is enabled.
No intentional motor rotation is permitted.
"Ready-to-Drive" sounds like propulsion authority. 05M-A is not that yet.

Main cleanup 5: 05M-B watchdog failure condition needs correction
This blocked state says:
Motor continuing to spin
That is not the right failure because an uncoupled motor shaft may coast from inertia after torque is removed.
Use:
Blocked States:
- inverter continues actively driving the motor
- phase current persists beyond approved decay window
- torque command remains active after watchdog loss
- inverter fails to enter supplier-defined safe state
Coasting is not the failure. Continuing to be powered is the failure.

Main cleanup 6: 05M-B over-speed test should be supplier-supported
This line:
Temporarily lower the software over-speed limit threshold below current RPM.
Could be okay in a controlled service mode, but it should not read like someone casually changes a safety limit while spinning.
Use:
Use supplier-supported test mode or pre-approved calibration profile to trigger over-speed protection at a controlled low RPM.
Live safety-limit modification during uncontrolled rotation is forbidden.

Main cleanup 7: 05M-C should not jump to open-floor movement yet
Your 05M-C description says wheels and gear reductions are fully linked. That is the next direction, but I would split it:
05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness
05M-C2 — Restricted Creep Torque Validation
05M-C3 — Controlled Closed-Area Low-Speed Movement
The first coupled test should prove mechanical coupling, backlash, wheel-speed sensing, brake override, and torque clamp before open-floor operation.

Correct status labels
Use these:
Gate 05L-B:
CONTROLLED_HV_PRECHARGE_OBSERVATION_READY
SUPPLIER_LIMITS_REQUIRED
LIVE_HV_PRESENT
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
NO_TRACTION_COMMAND

Gate 05L-C:
HV_SHUTDOWN_DISCHARGE_REPEATABILITY_READY
SUPPLIER_SHUTDOWN_SEQUENCE_REQUIRED
RATED_IMD_FIXTURE_REQUIRED
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
NO_TRACTION_COMMAND

Gate 05M-A:
INVERTER_READY_ZERO_TORQUE_VALIDATION_READY
TORQUE_DISABLED_STATE_ONLY
NO_DRIVER_TORQUE_AUTHORITY
NO_INTENTIONAL_MOTOR_ROTATION
NO_VEHICLE_MOVEMENT

Gate 05M-B:
NO_LOAD_MOTOR_SPIN_READY_FOR DETAILING
GUARDED_SHAFT_REQUIRED
MOTOR_UNCOUPLED_REQUIRED
SUPPLIER_SPIN_PROFILE_REQUIRED
NO_DRIVELINE_TORQUE_PATH
NO_VEHICLE_MOVEMENT

Bottom line
Yes — this is now a solid baseline path. The main fixes are small but important:
1. Add global numeric-threshold authority rule.
2. Remove "absolute 0.0V" and "immediate" wording.
3. Replace 05M-A "Ready-to-Drive" with "ready / torque-disabled."
4. Fix 05M-B watchdog wording: coasting is okay, powered torque is not.
5. Make over-speed test supplier-supported.
6. Split 05M-C before any real movement.
After those edits, you can detail 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness before actual creep movement.
