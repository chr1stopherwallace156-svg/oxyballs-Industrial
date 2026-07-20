# COUPLED DRIVELINE STATIC / LIFTED-WHEEL READINESS (Gate 05M-C1)

The first rung of the split 05M-C traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_56/57) for the F-450/F-550 EV
conversion (Gate 05M-C1, batch_60 + owner review_57). Gate 05M-C1 is the
**first coupled test** — the traction motor is physically integrated with the
vehicle's secondary mechanical elements (gearbox, half-shafts, hubs, wheels) —
but the **driven axle is lifted and locked with zero ground contact**. It maps
backlash/drag, verifies wheel-speed-sensor parity, enforces a micro-scale
torque clamp, and validates brake override — **before any tire touches the
ground.**

**Status (owner review_57): `COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED` /
`RATED_LIFT_OR_STANDS_REQUIRED` / `ROTATING_WHEEL_GUARDS_REQUIRED` /
`NO_GROUND_CONTACT` / `NO_OPEN_FLOOR_MOVEMENT` / `NO_CAN_1_CONTROL_AUTHORITY` /
`BRAKE_OVERRIDE_REQUIRED` / `MICRO_TORQUE_LIMIT_TARGET_ONLY`.** Ladder: **… →
05M-B (no-load spin, uncoupled) → 05M-C1 (THIS GATE — coupled, wheels lifted) →
05M-C2 (restricted creep, first ground contact) → 05M-C3 (controlled
closed-area low-speed movement)** (D-008, amended review_57).

## Numeric Threshold Authority Rule (RC-267) — applies here

**Every numeric value in this gate is `INITIAL_TARGET_PROFILE` until upgraded
to `SUPPLIER_DEFINED` or `ENGINEERING_APPROVED` with proof artifacts** (≤1%
torque pulse, 100 RPM cold-drag speed, ≤5% wheel-speed tolerance, ≤5% torque
clamp). No numeric threshold creates gate authority until tied to supplier
documentation + engineering review + calibrated measurement method + raw proof
artifact + signed approval.

## Lifted Chassis Safety Rule (owner review_57, RC-280) — HARD prerequisites

Because the vehicle is now coupled to the wheels, even lifted, this is a major
mechanical hazard. Gate 05M-C1 may **only** run when all of the following hold:

- **rated lift/stands:** a rated chassis lift **or** rated heavy-duty stands
  **approved for the vehicle GVWR / axle load**;
- **secured against roll**; **suspension droop accounted for**;
- **wheel-rotation zones guarded** (physical guards around the spinning
  tires/shafts/hubs);
- **no personnel inline** with rotating tires, shafts, or hubs;
- **no person may be under the vehicle while energized rotation tests are
  active**;
- emergency stop active; exclusion zone active (qualified/authorized HV
  personnel only).

## No manual restraint of rotating parts (owner review_57, RC-279) — HARD BLOCK

**Manual hand restraint near rotating driveline components is forbidden.** Any
wheel/hub restraint (e.g. the differential/asymmetry test) uses an **approved
mechanical wheel restraint / differential test fixture / rated hub-locking
fixture** only. **No hands near rotating wheels, shafts, hubs, belts, or
couplers — ever.**

## Wheel-speed data is read-only, not control authority (owner review_57, RC-282)

Wheel-speed data may be observed **only** through an authorized read-only path,
a passive logging path, or independent external instrumentation. **Factory
ABS/ESC data must not become traction-control authority** unless Ford-authorized
documentation **and** engineering review approve it (extends the CAN_1
listen-only / no-factory-injection rule, RC-172/230). For now, wheel-speed
parity is **verification, not control authority.**

## Authority (carried from 05M-A/05M-B, RC-247/265)

The **inverter owns** its gating/power stage per its supplier state machine; the
**BMS/PDU owns** contactors/pre-charge; the **hardwired safety loop + service
brakes own** the emergency-interruption / stopping path; the **VCU
requests/monitors** and enforces the torque clamp (RC-247/265/205/227; BQ-27).
The torque command is issued via the service/calibration tool, not driver pedal
authority (except the explicit pedal-clamp test 05M-C1-004).

---

## Gate 05M-C1 verification matrix (driven axle lifted, zero ground contact)

All values `INITIAL_TARGET_PROFILE` (RC-267). The RC-280 lifted-chassis safety
rule and the RC-279 no-manual-restraint rule hold for every test.

| Test | Scenario | Procedure | Target (INITIAL_TARGET_PROFILE) | Expected safe output | Blocked (MUST NEVER OCCUR) | Proof |
|---|---|---|---|---|---|---|
| 05M-C1-001 | mechanical driveline backlash mapping | deliver alternating low-amplitude (≤1% target) forward/reverse torque steps to the lifted drivetrain via the service tool | record CAN position metrics + physical angular displacement at the hub to chart mechanical play | the drivetrain transitions smoothly between gears without loud impact or excessive slop | high-current spikes / harsh mechanical binding during direction shifts | CAN log: torque command vs resolver position transitions |
| 05M-C1-002 | elevated wheel-speed parity audit | spin the lifted assembly to a steady calibration speed (100 RPM target); log all speed loops (**wheel-speed read-only, RC-282**) | individual wheel-speed sensors align in direction + match the motor-shaft velocity within the supplier/engineering tolerance (≤5% target) | all sensor tracks update uniformly; calculated speed correlates with motor RPM | left/right wheel-speed direction inversion / discrepancy beyond the tolerance / wheel-speed used as control authority (RC-282) | CAN chart: resolver velocity vs wheel-sensor signals |
| 05M-C1-003 | brake-override system (BOS) validation | while maintaining a steady torque request (≤5% micro-clamp target), press the service brake pedal | **the VCU clears traction torque commands within the approved brake-override response window (RC-281, not "instantly"); inverter phase current decays within the approved threshold; the mechanical brakes slow/stop the lifted wheels without the inverter fighting the service brakes** | phase current decays to the approved threshold; wheels stopped by mechanical friction | inverter continues to drive phase currents or fights the service brakes | high-speed log: brake-switch transition vs phase-current decay |
| 05M-C1-004 | micro-scale torque-clamp enforcement | apply full travel to the driver pedal-position sensor; monitor VCU torque output over CAN | VCU torque requests clamp at the defensive software limit (≤5% target) | inverter respects the clamped boundary; phase currents structurally limited | torque requests or inverter scaling breaking past the clamp guardrail | diagnostic snapshot of VCU internal control parameters |
| 05M-C1-005 | lifted asymmetry & differential scan | **restrain one lifted wheel with an approved mechanical wheel restraint / differential test fixture / rated hub-locking fixture — NO manual hand restraint (RC-279)**; inject a minimal torque pulse (≤2% target) to check open-differential operation | the opposite elevated wheel rotates smoothly at differential speed; torque tracking stable | power transfers across the differential without severe vibration or binding | manual hand restraint of any rotating part (RC-279) / differential lock-up / abnormal phase-current spikes | engineering run-data log: individual hub-speed metrics |

## Gate 05M-C1 exit criteria (owner review_57)

The system cannot exit Gate 05M-C1 unless:

1. The backlash + rotational-drag profiles of the lifted driveline are fully
   mapped, analysed, and engineering-approved (targets only, RC-267).
2. Wheel-speed sensors and the motor-position sensor show tracking parity —
   used as **verification, not control authority** (RC-282).
3. The Brake Override System confirms that service-brake activation drops the
   active torque command **within the approved brake-override response window**
   (RC-281), with the inverter not fighting the brakes.
4. The micro-scale software torque clamp (≤5% target) restricts motor output
   during a wide-open pedal request.
5. The full RC-280 lifted-chassis safety rule held (rated lift/stands, roll
   secured, guards, no personnel inline, no one under the vehicle during
   energized rotation) and no manual restraint of rotating parts occurred
   (RC-279).
6. All elevated test-run data logs, sensor-parity charts, override timestamps,
   and engineering signoffs are archived.

**Successful Gate 05M-C1 completion permits engineering review for Gate 05M-C2
only** (Restricted Creep Torque Validation — first ground contact). It does
**not** authorize ground contact · open-floor movement · road testing ·
customer operation. (Never "certified safe," RC-224.)

## Standing checks

- **Driven axle LIFTED, zero ground contact, no open-floor movement** (owner
  review_57). Rated lift/stands + guards + no personnel inline + no one under
  the vehicle during energized rotation (RC-280); **no manual restraint of
  rotating parts — rated fixtures only (RC-279)**; wheel-speed data read-only,
  not control authority (RC-282); brake override within the approved response
  window, not "instantly" (RC-281); every value is INITIAL_TARGET_PROFILE until
  supplier/engineering upgrade it (RC-267); the inverter owns its gating, the
  BMS/PDU owns contactors/pre-charge, the hardwired loop + service brakes own
  the stopping path, the VCU requests/monitors + enforces the clamp
  (RC-247/265/205/227; BQ-27); never "certified safe" (RC-224).
- **Nothing ingested; nothing Confirmed; no ground contact; no open-floor
  movement; no "certified safe"/compliance claim; ODRs untouched.**

## Next — Gate 05M-C2 (Restricted Creep Torque Validation)

Owner review_57: only after 05M-C1 proves the coupled/lifted mechanical +
sensing + safety layer, Gate 05M-C2 is the **first ground contact** — restricted
low-speed creep. The test surface must be **flat, controlled, closed, with
predictable traction, clear runout distance, wheel chocks/barriers staged,
spotters outside the movement path, and a remote E-stop available** — **not a
default "low-friction" surface** (RC-283; low-friction causes wheel slip / weird
ABS/ESC reactions / poor steering-brake feedback, and is a separate future gate
if ever tested). Status target
`RESTRICTED_CREEP_TORQUE_CONCEPT_STARTED / GROUND_CONTACT_PRESENT /
CLOSED_CONTROLLED_TEST_AREA_REQUIRED / REMOTE_ESTOP_REQUIRED / SPOTTERS_REQUIRED
/ NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION`. Then Gate 05M-C3 (Controlled
Closed-Area Low-Speed Movement).
