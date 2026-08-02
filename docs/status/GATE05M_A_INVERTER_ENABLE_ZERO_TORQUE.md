# INVERTER ENABLE READINESS / ZERO-TORQUE VALIDATION (Gate 05M-A)

The first rung of the staged 05M traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_53/54) for the F-450/F-550 EV
conversion (Gate 05M-A, batch_57 + owner review_54). Gate 05M-A is the boundary
between static HV distribution testing (Gate 05L) and dynamic inverter drive.
The HV bus is energized, but the inverter gating is bound by software +
hardware locks. It validates **handshake synchronisation, sensor plausibility,
and the supplier-defined torque-disabled state only** — it is **readiness, not
spin (owner review_54): NO intentional motor rotation · NO vehicle movement ·
NO driver torque authority · NO power-stage switching unless the supplier
documentation explicitly defines it as part of a safe zero-torque readiness
state and engineering approves it.**

**Status (owner review_56): `INVERTER_READY_ZERO_TORQUE_VALIDATION_READY` /
`LIVE_HV_PRESENT` / `TORQUE_DISABLED_STATE_ONLY` /
`NO_DRIVER_TORQUE_AUTHORITY` / `NO_INTENTIONAL_MOTOR_ROTATION` /
`NO_VEHICLE_MOVEMENT` / `SUPPLIER_INVERTER_STATE_DEFINITIONS_REQUIRED` /
`WATCHDOG_TARGETS_PENDING_SUPPLIER_DATA` / `PHASE_CURRENT_OFFSET_CHECK_REQUIRED`
/ `RESOLVER_BASELINE_CHECK_REQUIRED` / `NO_ROAD_TEST_AUTHORITY`.** Ladder:
**05J → 05K → 05L-A → 05L-B → 05L-C → 05M-A (THIS GATE — inverter enable /
zero-torque readiness) → 05M-B (no-load motor spin) → 05M-C1/C2/C3 (staged
controlled low-speed traction)** (D-008, amended review_56). (05M-A-004 already
uses the supplier-defined ready/torque-disabled wording — the Hunter re-emitted
"Ready-to-Drive" in batch_59; RC-271→275 regression watch.)

## Value doctrine (owner review_54, RC-260) — read first

Every numeric threshold in Gates 05L-B, 05L-C, and 05M-A is an
**`INITIAL_TARGET_PROFILE`** value only: ≤50 ms inverter watchdog, 0 A phase
current, 0% PWM, zero resolver drift, ≤50 ms contactor feedback, ΔV ≤5%, ≥95%
V_batt, 500 ms pre-charge timeout, >60 V discharge, ≤20 ms E-stop dropout, ≤2
retries, 10 cycles (eighteenth artifact of the invented-values family).
**Final limits require `SUPPLIER_DATA` + `ENGINEERING_REVIEW` +
`LIVE_HV_TEST_PLAN_APPROVAL` + `BENCH/CHASSIS PROOF`.** The inverter
"enabled/ready/gate-enabled/torque-enabled/PWM-active" state definitions are
supplier-specific and must be obtained before this gate runs (RC-265).

## The inverter-state rule (owner review_54, RC-265) — read second

Different inverters define "enabled," "ready," "gate enabled," "torque
enabled," and "PWM active" differently — **some switch even at zero torque**, so
**do not assume 0% PWM is the correct safe state.** Gate 05M-A validates the
**supplier-defined inverter ready / torque-disabled state**. There is **no
power-stage switching** unless the supplier documentation explicitly defines it
as part of a safe zero-torque readiness state and engineering approves it. No
traction torque command; no intentional rotation; no vehicle movement; no
driver torque authority.

## Authority (carried from Gate 05L-B/05L-C, RC-247)

The **BMS/PDU owns** contactor + pre-charge execution and the HV safe-state; the
**inverter controls its own gating/power-stage** per its supplier state
machine; the **VCU requests/monitors** (transmits the authenticated enable
token + interlock confirmation, never drives the power stage); the **hardwired
safety loop owns** the emergency-interruption path (RC-247/205/227; BQ-27).

---

## What Gate 05M-A proves (owner review_54, RC-266)

- the inverter boots correctly with a live DC bus;
- the VCU/inverter handshake is aligned (Pre-Ready → Ready only on an
  authenticated enable token + closed hardwired interlock confirmation);
- the inverter remains **torque-disabled** in the supplier-defined ready state;
- phase-current sensors read within the supplier offset limits;
- resolver feedback is plausible (stable baseline, no LV-coupled noise);
- watchdog/heartbeat loss forces the **supplier-defined safe state**;
- **no unintended torque, rotation, or current generation occurs.**

## Gate 05M-A verification matrix (HV bus live, ZERO rotation)

All thresholds `INITIAL_TARGET_PROFILE` (RC-260). Inverter state definitions
supplier-specific (RC-265). No intentional rotation; no torque authority.

| Test | Scenario | Procedure | Target (INITIAL_TARGET_PROFILE) | Expected safe output | Blocked (MUST NEVER OCCUR) | Proof |
|---|---|---|---|---|---|---|
| 05M-A-001 | inverter power-up handshake | nominal HV power-up (per 05L-B/05L-C) → live DC bus; key to drive mode | inverter boots through its supplier state machine and reports its **supplier-defined Pre-Ready** on CAN_2 | handshake bits match; inverter awaits the authenticated enable token + interlock confirmation | inverter enabling gating paths automatically / comms timeout on boot | timestamped CAN trace of handshake bytes |
| 05M-A-002 | phase-current sensor offset zeroing | with the power stage disabled, query the inverter phase-current calibration registers | offset drift ≤ the **supplier-defined** noise spec | inverter nulls analog offsets; baselines accepted | offset drift beyond supplier limits (sensor degradation) | UDS register calibration dump |
| 05M-A-003 | static resolver baseline audit | monitor raw resolver position over a window with the shaft static | resolver electrical angle stable within the **supplier-defined** drift/noise tolerance (not literally "zero deviation") | correct static angle, no LV-coupled EMI | resolver drift / noise spikes while the shaft is locked | resolver telemetry trace |
| 05M-A-004 | **supplier-defined torque-disabled verification (RC-265/271, NOT "enable to active / 0% PWM / Ready-to-Drive")** | VCU clamps the torque command at 0 Nm; **step the inverter into its supplier-defined ready / torque-disabled state — driver torque authority remains masked, no traction command is enabled (RC-271, not "Ready-to-Drive")**; no power-stage switching unless the supplier defines it as a safe zero-torque state + engineering approves | **actual motor phase current within the supplier-defined zero-current threshold (RC-270, not literal 0.0 A); no torque-producing current beyond the approved threshold; no unintended shaft movement**; DC bus stable; the inverter stays in the supplier torque-disabled state | torque-disabled state holds; current within the supplier zero-current threshold; **no unintended shaft movement** | inverter bridge switching / torque-producing current beyond the supplier threshold / **any unintended shaft movement** | inverter phase-current trace + CAN command-byte log |
| 05M-A-005 | watchdog disruption response | drop CAN_2 (unplug) during the Pre-Ready state | inverter → its **supplier-defined Safe-Off state** within the supplier target (≤50 ms target) of the last valid frame | inverter disables enable loops, drops drive flags, logs a comms-loss DTC | inverter holding last state / remaining in an active ready mode | scope capture of bus drop vs inverter fault-line transition |

## Gate 05M-A exit criteria (owner review_54)

The system cannot exit Gate 05M-A and proceed to Gate 05M-B unless:

1. The inverter state machine is fully synchronised with the VCU request
   protocol across CAN_2 (supplier-defined states, RC-265).
2. Phase-current sensor offsets are within supplier spec and stable.
3. Static resolver telemetry is a clean, plausible baseline within the
   supplier drift/noise tolerance (RC-260).
4. The **supplier-defined torque-disabled state** holds with zero active phase
   current and **no unintended rotation** — no assumed 0% PWM (RC-265).
5. Watchdog/frame loss forces the inverter to its supplier-defined Safe-Off
   state within the supplier target (RC-260).
6. All telemetry captures, calibration offsets, handshake logs, and engineering
   signoffs are archived.

**Successful Gate 05M-A completion permits engineering review for Gate 05M-B
only** (No-Load Motor Spin Validation). It does **not** authorize motor spin ·
traction command · vehicle movement · road testing · customer operation.
(Never "certified safe," RC-224.)

## Standing checks

- **HV bus live, ZERO intentional rotation, torque-disabled** (owner
  review_54). No numeric threshold is final gate logic until supplier docs +
  engineering review + a live-HV test-plan approval upgrade it (RC-260); the
  inverter enabled/ready/PWM-active state definitions are supplier-specific and
  no power-stage switching is assumed safe (RC-265); the VCU requests/monitors
  while the inverter owns its gating and the BMS/PDU owns contactors/pre-charge
  and the hardwired loop owns emergency interruption (RC-247/205/227; BQ-27);
  the inverter/motor supplier data (state definitions, phase-current offset
  spec, resolver drift tolerance, watchdog target, torque map) is required
  before any spin (BQ-27); the stored-energy discharge-wait rule applies after
  any exposure (RC-242); never "certified safe" (RC-224). Do not jump to Gate
  05M-B until 05M-A is proven (RC-266).
- **Nothing ingested; nothing Confirmed; no motor spin; no torque authority;
  no "certified safe"/compliance claim; ODRs untouched.**

## Next — Gate 05M-B (No-Load Motor Spin Validation)

Owner review_54: only after 05M-A proves the inverter can be live,
synchronised, torque-disabled, and fault-responsive **without unintended
current or rotation**, Gate 05M-B is the **first controlled no-load spin** —
the motor shaft uncoupled from the drivetrain: resolver offset-angle
calibration under low-torque spin, electrical phase-rotation-sequence
verification, phase-current harmonic monitoring, and hardware over-current
protection validation. Engineer-gated, live-HV, motor uncoupled (no vehicle
movement). Then Gate 05M-C (Controlled Low-Speed Traction Readiness).
