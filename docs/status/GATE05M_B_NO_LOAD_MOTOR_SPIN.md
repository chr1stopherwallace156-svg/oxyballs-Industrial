# NO-LOAD MOTOR SPIN VALIDATION (Gate 05M-B)

The second rung of the staged 05M traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_54/55) for the F-450/F-550 EV
conversion (Gate 05M-B, batch_58 + owner review_55). Gate 05M-B governs the
**first physical rotation of the traction motor shaft** — attempted only after
Gate 05M-A proves the inverter can be live, synchronised, torque-disabled, and
fault-responsive without unintended current or rotation. The motor shaft is
**completely uncoupled** from the vehicle's secondary drivetrain (driveshafts,
axles, gearboxes). It calibrates the resolver offset angle, verifies the
electrical phase-rotation sequence, monitors phase-current balance/THD, and
tests over-speed + watchdog trips **under a supplier-defined low-torque spin
profile only** — there is **no wheel torque path and no vehicle-movement path.**

**Status (owner review_56): `NO_LOAD_MOTOR_SPIN_READY_FOR_DETAILING` /
`GUARDED_SHAFT_REQUIRED` / `MOTOR_UNCOUPLED_REQUIRED` /
`SUPPLIER_SPIN_PROFILE_REQUIRED` / `NO_DRIVELINE_TORQUE_PATH` /
`NO_VEHICLE_MOVEMENT`.** Ladder: **05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A →
05M-B (THIS GATE — first no-load spin, motor uncoupled) → 05M-C1 (coupled
driveline static / lifted-wheel) → 05M-C2 (restricted creep) → 05M-C3
(controlled closed-area low-speed movement)** (D-008, amended review_56).
Numeric Threshold Authority Rule (RC-267): every value here is
`INITIAL_TARGET_PROFILE` until tied to supplier docs + engineering review +
calibrated measurement method + raw proof + signed approval. Watchdog/over-speed
wording per RC-276/277 (coasting is not the failure; over-speed via a
supplier-supported test mode only).

## Global value doctrine (owner review_55, RC-267) — read first

**All numeric values in Gates 05L-B, 05L-C, 05M-A, and 05M-B are
`INITIAL_TARGET_PROFILE` values** unless explicitly upgraded to
`SUPPLIER_DEFINED` or `ENGINEERING_APPROVED`. **No numeric threshold may create
gate authority until tied to: supplier documentation + engineering review +
test-instrument method + raw proof artifact + signed approval.** For Gate
05M-B specifically, the ≤2% torque spin command, the 500 RPM spin speed, the
±1.0° electrical resolver-offset tolerance, the ≤3% phase-current balance, the
over-speed limit, and the ≤50 ms watchdog target are **initial spin-profile
targets pending supplier approval** (nineteenth artifact of the invented-values
family).

## Physical boundary (owner review_55, RC-272) — HARD prerequisites

Gate 05M-B may **not** run unless all of the following are physically in place:

- **guarded rotating shaft** (physical guard around the spinning shaft);
- **no driveline attachment** (shaft uncoupled from driveshafts/axles/gearbox);
- **no wheel torque path** (no mechanical path from the motor to the wheels);
- **no vehicle-movement path** (the vehicle cannot move under any spin);
- **emergency stop active**;
- **exclusion zone active** (qualified/authorized HV personnel only);
- **supplier-defined spin profile only** (no ad-hoc speed/torque commands);
- **no cabin driver pedal authority** (the accelerator pedal is masked — the
  spin is commanded only via the service/calibration tool).

## Authority (carried from Gate 05L/05M-A, RC-247/265)

The **inverter owns** its gating/power stage per its supplier state machine
(the spin is commanded through the supplier's calibration/service interface,
not driver pedal authority); the **BMS/PDU owns** contactors/pre-charge; the
**hardwired safety loop owns** the emergency-interruption path; the **VCU
requests/monitors** (RC-247/265/205/227; BQ-27). The inverter/motor supplier
data (torque map, resolver/encoder offset, over-current spec, V/Hz limits,
over-speed limit) is required before any spin (BQ-27).

---

## Gate 05M-B verification matrix (motor uncoupled, LIVE HV, low-torque spin)

All thresholds `INITIAL_TARGET_PROFILE` pending supplier approval (RC-267). The
RC-272 physical boundary must hold for every test. Spin commanded via the
service/calibration tool, not driver pedal (RC-271).

| Test | Scenario | Procedure | Target (INITIAL_TARGET_PROFILE) | Expected safe output | Blocked (MUST NEVER OCCUR) | Proof |
|---|---|---|---|---|---|---|
| 05M-B-001 | physical phase-rotation check | command a minimal torque request (≤2% nominal max target) via the service tool; observe shaft direction | physical rotation vector strictly matches the commanded software direction | the uncoupled shaft turns smoothly in the designated direction | shaft spinning backwards vs command / high-current shuddering or locking | video of shaft rotation + CAN command/feedback sync log |
| 05M-B-002 | resolver angle-offset burn-in | run the inverter's automatic resolver-alignment routine via service diagnostic command | calculated offset within the **supplier** tolerance (±1.0° electrical target) across 3 consecutive iterations | offset stabilises; calibration parameter writes to NVM | inconsistent / wandering offset across sequential routines | diagnostic-tool confirmation + parameter memory dump |
| 05M-B-003 | balanced phase sine/THD audit | spin at a constant low speed (500 RPM target); scope active phase-current lines | phase-current amplitudes across U/V/W balance within the **supplier** tolerance (≤3% target); THD within supplier specs | clean, symmetrical sinusoidal current waves | severely distorted/clipped waves / single-phase dropouts | high-bandwidth scope capture of phase-current probes |
| 05M-B-004 | dynamic over-speed protection | **use a supplier-supported test mode or pre-approved calibration profile to trigger over-speed protection at a controlled low RPM (RC-277); live safety-limit modification during uncontrolled rotation is forbidden** | the inverter trips on over-speed within its supplier target, shuts down gating, drops to its supplier safe state | torque command → zero; shaft coasts freely to a stop (no active braking) | inverter failing to cross-check real RPM against the safety limit / live safety-limit edit during rotation | CAN log: motor RPM vs inverter state bits during trip |
| 05M-B-005 | watchdog loss under rotation | while the uncoupled shaft spins (500 RPM target), disconnect CAN_2 | the inverter power stage drops gating / disables torque within its supplier target (≤50 ms) of frame loss | motor → unpowered coast; inverter flags a critical comms-loss error | **any of (RC-276 — coasting is NOT the failure, continuing to be powered is): the inverter continues actively driving the motor · phase current persists beyond the approved decay window · torque command remains active after watchdog loss · the inverter fails to enter its supplier-defined safe state** | timestamped scope trace of bus drop vs phase-current decay |

## Gate 05M-B exit criteria (owner review_55)

The system cannot exit Gate 05M-B unless:

1. The uncoupled motor shaft rotates smoothly in direct mechanical alignment
   with software direction commands (RC-272 boundary held throughout).
2. The resolver alignment offset is calibrated, stable within the supplier
   tolerance, and written to NVM (targets only, RC-267).
3. Active phase currents form balanced three-phase sine waves within the
   supplier tolerance, with no severe distortion.
4. Dynamic safety limits (over-speed, over-current, network watchdog loss)
   interrupt power-stage gating within the supplier-defined thresholds.
5. The full RC-272 physical boundary (guarded, uncoupled, no-driveline, no
   wheel/vehicle path, E-stop + exclusion zone, supplier spin profile, no pedal
   authority) held for every test.
6. All raw data logs, high-bandwidth current scope traces, calibration
   parameter printouts, and engineer validation signoffs are archived.

**Successful Gate 05M-B completion permits engineering review for Gate 05M-C
only** (Controlled Low-Speed Traction Readiness). It does **not** authorize a
wheel torque path · vehicle movement · road testing · driver pedal authority ·
customer operation. (Never "certified safe," RC-224.)

## Standing checks

- **Motor UNCOUPLED, guarded, LIVE HV, supplier-defined low-torque spin only,
  no wheel/vehicle-movement path, no cabin pedal authority** (owner review_55,
  RC-272). No numeric value (≤2% torque, 500 RPM, ±1.0°, ≤3% balance,
  over-speed limit, ≤50 ms watchdog) is final gate logic until supplier docs +
  engineering review + a live-HV test-plan approval + signed approval upgrade
  it (RC-267); the inverter owns its gating per the supplier state machine, the
  BMS/PDU owns contactors/pre-charge, the hardwired loop owns emergency
  interruption, the VCU requests/monitors (RC-247/265/205/227; BQ-27); the spin
  is commanded via the service/calibration tool, not driver pedal (RC-271); the
  stored-energy discharge-wait rule applies after any exposure (RC-242); no
  automatic retry after an E-stop (RC-262); never "certified safe" (RC-224).
- **Nothing ingested; nothing Confirmed; no wheel torque path; no vehicle
  movement; no driver pedal authority; no "certified safe"/compliance claim;
  ODRs untouched.**

## Next — Gate 05M-C1 (Coupled Driveline Static / Lifted-Wheel Readiness)

Owner review_56: Gate 05M-C is **split** — do not jump to open-floor movement
(RC-278). After 05M-B proves clean uncoupled rotation, the traction phase
continues: **05M-C1 Coupled Driveline Static / Lifted-Wheel Readiness → 05M-C2
Restricted Creep Torque Validation → 05M-C3 Controlled Closed-Area Low-Speed
Movement.** The first coupled test (05M-C1) proves **mechanical coupling,
driveline backlash, wheel-speed sensing, brake override, and torque clamp** —
with the **wheels lifted / no ground contact** — *before* any open-floor
operation. Each rung is engineer-gated, live-HV, staged (no road testing / no
customer operation until proven). Its scope is defined when the owner sends
that batch.
