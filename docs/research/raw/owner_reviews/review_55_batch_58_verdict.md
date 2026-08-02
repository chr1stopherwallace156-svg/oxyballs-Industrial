# Owner review 55 — batch 58 ("57:75") verdict

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). The Hunter payload this verdict grades is archived
at `../research_hunter/batch_58_gate05lbc_ma_cleanups_gate05mb_spin.md`.

---

[Owner framing before the payload — the review_54 corrections carried into the
Gate 05L-B/05L-C/05M-A-cleanups + Gate 05M-B prompt: the correct chain (05L-A →
05L-B → 05L-C → 05M-A → 05M-B); cleanup 3 (05L-B-007 failure wording — blocked:
automatic retry after manual E-stop / dropout exceeds target / coil supply
remains energized; no automatic retry after E-stop, ever); cleanup 5 (IMD fault
injection — approved rated current-limited HV isolation-test fixture or IMD
supplier method only; manual ad-hoc resistance insertion forbidden); cleanup 6
(05M-A must not enable real inverter switching — validates the supplier-defined
inverter ready / torque-disabled state; no traction torque command / no
intentional rotation / no vehicle movement / no driver torque authority / no
power-stage switching unless the supplier explicitly defines it safe +
engineering approves); corrected 05M-A intent (readiness not spin) — "57:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is very strong now. You fixed the biggest architecture problems and the sequence is finally professional:
05L-B = first controlled HV pre-charge observation
05L-C = shutdown / discharge / re-energization repeatability
05M-A = inverter ready / zero-torque validation
05M-B = no-load motor spin
05M-C = later controlled traction readiness
That is the correct order.
Because this is now live high-voltage work, keep it under qualified/authorized HV personnel only. OSHA's lockout/tagout rule covers unexpected energization or stored-energy release during servicing/maintenance, and OSHA electrical work-practice rules say only qualified persons may work on energized circuit parts that have not been de-energized; NHTSA also warns that exposed EV high-voltage components, wires, and batteries can present shock hazards.

What you fixed correctly
The best parts are now:
Isolation fault injection = rated/current-limited fixture only ✅
No manual jumpers on live HV rails ✅
No auto retry after E-stop ✅
VCU = requester / monitor ✅
BMS/PDU = contactor/pre-charge owner ✅
Hardwired loop = emergency interruption owner ✅
05M-A separated from 05M-B spin ✅
That is exactly how the Build Engine should think.

Main cleanup 1: still change 05L-C shutdown order
You still have this as a hard rule:
Main Positive contactor must open first,
followed by Main Negative within ≤50 ms.
That may be correct for one BMS/PDU, but it should not be universal.
Use this instead:
Normal shutdown contactor sequence must follow the supplier-defined BMS/PDU shutdown architecture.
Blocked:
- any shutdown sequence that violates supplier documentation
- any sequence that leaves an unintended energized path
- any sequence that prevents verified DC-link discharge
- any feedback mismatch between command state and auxiliary contact state
Then your exit criteria should say:
Normal coordinated shutdowns follow the supplier-defined contactor opening sequence under all standard key-off cycles.

Main cleanup 2: hard numbers still need global target label
You still have many hard numbers:
≤50 ms
≤500 ms
ΔV ≤5%
>60 V
≤20 ms
≤2 attempts
10 cycles
≤50 ms watchdog
≤2% torque
500 RPM
±1.0° electrical
≤3% phase balance
0.0 A
0 RPM
Keep them, but add this global rule above Gates 05L-B / 05L-C / 05M-A / 05M-B:
All numeric values in this section are INITIAL_TARGET_PROFILE values unless explicitly upgraded to SUPPLIER_DEFINED or ENGINEERING_APPROVED.
No numeric threshold may create gate authority until tied to:
- supplier documentation
- engineering review
- test instrument method
- raw proof artifact
- signed approval
That protects you from false precision.

Main cleanup 3: 05L-B RC curve wording
This line is still too perfect:
Vcaps(t) = Vbatt × (1 - e^(-t/RC))
Use:
The first-order RC curve is a comparison model only.
The accepted pre-charge envelope must be supplier-approved and account for:
- Rpre tolerance
- C_link tolerance
- pack voltage sag
- measurement filtering
- leakage paths
- bleeder paths
- BMS/PDU sampling delay
So the pass condition becomes:
Vcaps rise remains within the supplier-approved pre-charge envelope.
Not "perfectly follows the math equation."

Main cleanup 4: 05M-A needs tolerance wording
In 05M-A, replace absolute terms like:
0.0 A
zero signal deviation
zero coupled electromagnetic interference
with:
within supplier-defined zero-current threshold
within supplier-defined resolver noise/drift tolerance
no torque-producing current beyond approved threshold
no unintended shaft movement
Sensors always have noise. You want bounded, explainable, supplier-approved noise, not literal perfect zero.

Main cleanup 5: don't call 05M-A "Ready-to-Drive"
This row says:
Step vehicle into an active "Ready-to-Drive" state
For 05M-A, I'd avoid "Ready-to-Drive" because it sounds like propulsion authority.
Use:
Step inverter into supplier-defined ready / torque-disabled state.
Driver torque authority remains masked.
No traction command is enabled.
That keeps 05M-A clearly non-propulsive.

Main cleanup 6: 05M-B is right, but make the physical boundary stronger
This is the right idea:
motor shaft uncoupled from driveshafts, axles, gearboxes
Add:
05M-B requires:
- guarded rotating shaft
- no driveline attachment
- no wheel torque path
- no vehicle movement path
- emergency stop active
- exclusion zone active
- supplier-defined spin profile only
- no cabin driver pedal authority
Also, do not lock in ≤2% torque or 500 RPM as final. Call them initial spin-profile targets pending supplier approval.

Correct status labels
Use these:
Gate 05L-B:
CONTROLLED_HV_PRECHARGE_OBSERVATION_READY_WITH_SUPPLIER_LIMITS_PENDING
LIVE_HV_PRESENT
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
VCU_REQUESTER_MONITOR_ONLY
BMS_PDU_EXECUTION_OWNER
NO_TRACTION_COMMAND
NO_VEHICLE_MOVEMENT

Gate 05L-C:
HV_SHUTDOWN_DISCHARGE_REPEATABILITY_DEFINED
SUPPLIER_SHUTDOWN_SEQUENCE_REQUIRED
RATED_IMD_FIXTURE_REQUIRED
THERMAL_RECOVERY_REQUIRED
NO_INVERTER_SWITCHING
ZERO_MOTOR_RPM
NO_VEHICLE_MOVEMENT

Gate 05M-A:
INVERTER_READY_ZERO_TORQUE_VALIDATION_DEFINED
LIVE_HV_PRESENT
TORQUE_DISABLED_STATE_REQUIRED
NO_INTENTIONAL_MOTOR_ROTATION
NO_DRIVER_TORQUE_AUTHORITY
NO_VEHICLE_MOVEMENT

Gate 05M-B:
NO_LOAD_MOTOR_SPIN_DRAFTED
MOTOR_UNCOUPLED_REQUIRED
GUARDED_SHAFT_REQUIRED
SUPPLIER_SPIN_PROFILE_REQUIRED
NO_DRIVELINE_TORQUE_PATH
NO_VEHICLE_MOVEMENT

Bottom line
Yes — this is the right structure now.
The only things I'd fix before baselining:
1. Supplier-defined shutdown sequence, not fixed Main Positive first.
2. All numbers marked INITIAL_TARGET_PROFILE.
3. RC curve = comparison model, not exact pass curve.
4. 05M-A uses tolerance thresholds, not perfect zero.
5. 05M-A says ready / torque-disabled, not Ready-to-Drive.
6. 05M-B requires guarded, uncoupled, no-driveline spin boundary.
After those edits, you can proceed to build out 05M-B No-Load Motor Spin in detail.
