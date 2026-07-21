# CONTROLLED CLOSED-AREA LOW-SPEED MOVEMENT (Gate 05M-C3)

The final rung of the split 05M-C traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_65) for the F-450/F-550 EV conversion
(Gate 05M-C3, batch_68 + owner review_65). Gate 05M-C3 is **controlled
closed-area low-speed movement** — the first time the vehicle drives under its
own power in a closed test area, only after Gate 05M-C2 (05M-C2A flat-ground
creep → 05M-C2B incline/rollback → 05M-C2C faulted-creep recovery) is proven. It
is built as **five linear modular subgates**, NOT one large "track movement"
gate (owner review_65), so straight-line propulsion, braking, regeneration,
steering, and fault behaviour are never approved together prematurely.

**Status (owner review_65): `MODULAR_ARCHITECTURE_DEFINED` /
`GLOBAL_AUDIT_SCHEMA_DEFINED` / `TELEMETRY_PACKET_DEFINED` /
`CONFIGURATION_LOCK_REQUIRED` / `TIME_SYNCHRONIZATION_REQUIREMENTS_PENDING` /
`C3A_STRAIGHT_LINE_PROCEDURE_DRAFTED` /
`C3B_FOUNDATION_BRAKE_PROCEDURE_NEEDS_REVISION` /
`C3C_REGEN_INTERFACE_AUTHORITY_PENDING` / `C3D_KINEMATIC_CELL_VALUES_PENDING` /
`C3E_FAULT_ESCALATION_MATRIX_PENDING` / `NUMERIC_LIMITS_INITIAL_TARGET_PROFILE` /
`RUNOUT_CALCULATION_REQUIRED` / `NO_ACTIVE_ABS_ESC_AUTHORITY` /
`NO_TORQUE_VECTORING_AUTHORITY` / `NO_PUBLIC_ROAD` / `NO_CUSTOMER_OPERATION` /
`NO_NORMAL_DRIVING_AUTHORITY`.** After all fourteen review_65 corrections the
gate labels `GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW`
— **the procedure architecture is ready for disciplined engineering review, NOT
evidence that the physical vehicle has passed** (nothing Confirmed). Ladder: **…
→ 05M-C2 (05M-C2A → 05M-C2B → 05M-C2C) → 05M-C3 (THIS GATE — 05M-C3A → 05M-C3B →
05M-C3C → 05M-C3D → 05M-C3E)** (D-008, amended review_65).

## Linear progression (owner review_65) — HARD BLOCK

Progression is **strictly linear**; no downstream subgate unlocks until the
preceding subgate reaches `SIGNED_PASS` across all ledger items:

1. **05M-C3A — Straight-Line Low-Speed Tracking** — prove straight travel,
   predictable acceleration, speed-limit enforcement, pedal tracking,
   forward/reverse direction, path deviation, brake override, neutral interrupt,
   remote E-stop, assist-system stability, no unexpected wheel-speed
   disagreement. **Steering and cornering do not unlock until a signed C3A pass.**
2. **05M-C3B — Coast-Down + Foundation Brakes** — mechanical-brake and natural-
   drag baseline; **regen disabled (0 Nm target)**.
3. **05M-C3C — Restricted Regeneration** — only after C3B `SIGNED_PASS`; regen is
   **supplemental deceleration only**, foundation brakes remain primary.
4. **05M-C3D — Steering-Angle / Propulsion-Envelope Map** — steering angle is an
   **observation and derating input only, NOT active torque-vectoring / stability
   authority** (`NO_TORQUE_VECTORING_AUTHORITY`); factory ABS/ESC stays
   authoritative (`NO_ACTIVE_ABS_ESC_AUTHORITY`).
5. **05M-C3E — Closed-Area Fault + Abort Sequences** — integrated compound-fault
   behaviour, cell-escalated (RC-324).

## Global governance (carried into every subgate)

- **Four-field approval/execution record (RC-299/307..312):** every row carries
  `Required Approver` · `Procedure Approval Status` (`APPROVAL_REQUIRED` →
  `APPROVED_FOR_CONTROLLED_EXECUTION`) · `Execution Status` (`NOT_EXECUTED` →
  `PENDING_EXECUTION` → `EXECUTED`) · `Result Signoff Status` (`NOT_ELIGIBLE` →
  `SIGNED_PASS` / `SIGNED_FAIL` / `NEEDS_REVIEW` / `INVALID_TEST`). "Approved by"
  alone is forbidden. **No `SIGNED_PASS` exists — nothing has been executed.**
- **Numeric Threshold Authority Rule (RC-267/293/300):** every number here
  (`V_max` ≤15 km/h, ≤40 Nm/sec ramp, ≤80 Nm traction, ≤5 Nm min-regen, ≤10 Nm
  regen cap, ≤5% parity, and all C3D cell values) is `INITIAL_TARGET_PROFILE`
  with no pass / fail / block / movement / release authority until linked to the
  applicable hardware/software configuration + an artifact source or engineering
  calculation + a calibrated measurement method + measurement tolerance and
  uncertainty + a proof artifact + an approved procedure revision + signed
  engineering authorization.
- **E-stop is architecture-dependent (RC-309):** the hardwired safety loop forces
  the supplier-defined emergency torque-inhibit + HV-isolation response;
  contactor coil-supply interruption only where the approved architecture
  requires it. **A path deviation or software fault must NOT automatically open
  the HV contactors** unless the approved emergency architecture dictates
  isolation for that fault class — controlled torque removal + foundation braking
  is the baseline mitigation path.
- **Neutral by zero propulsion torque (RC-310); no "instant"/"immediate" wording —
  supplier/engineering response windows (RC-288/320); CAN_1 stays electrically
  passive (RC-304); wheel-speed read-only (RC-282); never "certified safe"
  (RC-224).**

## Telemetry Synchronicity Packet (owner review_65) — required every run

Every C3 run continuously logs a synchronous array: **vehicle_speed ·
commanded_torque · reported_inverter_torque · phase_current · DC-bus_current ·
longitudinal_acceleration · steering_angle · steering_angle_rate ·
individual_wheel_speeds (×4) · motor_speed · brake_state · APPS_channels (×2) ·
12V_aux_voltage · brake-assist_pressure/status · steering-assist_pressure/current/status
· gear_state · fault_state · E-stop_state · test-area_boundary_position.**
**Torque request and longitudinal acceleration are separate but related
quantities** — vehicle mass and drivetrain ratio make the same motor torque
produce different acceleration across platforms, so neither is a proxy for the
other.

### Data-synchronization requirement (owner review_65, RC-326) — HARD BLOCK

The packet is not evidence until synchronization is proven. **All channels must
share an approved common clock or a documented time-alignment method**, with:
per-signal sampling rates · timestamp source · maximum synchronization error ·
dropped-frame detection · sensor-latency compensation · start/stop event markers.
Otherwise a brake event, torque removal, phase-current decay, and actual
deceleration may appear incorrectly ordered.

### Test Configuration Lock Rule (owner review_65, RC-325) — HARD BLOCK

Every C3 run archives: **VCU firmware hash · inverter firmware/version ·
BMS/PDU firmware/version · calibration-file hash · DBC/version hash · active
test-cell limits · vehicle mass + axle-load record · tire size/pressure/condition
· ambient + surface conditions · instrumentation IDs + calibration status.** Any
change invalidates reuse of a previous result unless an engineering impact review
explicitly allows it.

### Cell-by-cell operating-envelope escalation (owner review_65, RC-314) — HARD BLOCK

C3A (and every subgate) does **not** begin at the maximum provisional cell even
though 15 km/h / 80 Nm / 40 Nm/sec are `INITIAL_TARGET_PROFILE`. Authorization is
stepped — **Envelope Cell 1 (minimal authorized speed/torque) → Cell 2 (expanded
straight-line) → Cell 3 (higher approved)** — and **passing one cell does not
automatically unlock the next; each cell requires a separate
`TestCellAuthorization` record.**

## Critical Abort / Stop Authority Hierarchy (owner review_65)

- **Driver** — immediate manual service-brake application + mechanical steering
  control.
- **VCU** — software request removal, torque clamp, non-volatile fault latch.
- **Inverter** — supplier-defined safe torque-disabled / zero-torque response.
- **BMS/PDU** — supplier-defined HV-isolation sequence **where required by the
  architecture** (not automatic).
- **Hardwired E-stop** — supplier-defined emergency torque-inhibit / HV-isolation
  path.
- **Track team** — test-area boundary enforcement, physical containment, recovery.

---

## Subgate 05M-C3A — Straight-Line Low-Speed Tracking

Pure, non-turning, straight-line tracking on flat ground to isolate
forward/reverse propulsion, velocity limits, and VCU command interrupts **before
any steering-angle envelope or regeneration is introduced.** Independent tracking
infrastructure (survey markers / external camera / calibrated positioning)
cross-verifies path deviation alongside internal steering telemetry. Global
constraints (all `INITIAL_TARGET_PROFILE`, per-cell authorized): `V_max` ≤15
km/h · ramp ≤40 Nm/sec · traction ≤80 Nm.

Every row below sits at `Procedure Approval Status: APPROVED_FOR_CONTROLLED_EXECUTION`
· `Execution Status: NOT_EXECUTED` · `Result Signoff Status: NOT_ELIGIBLE`
(nothing executed).

| Test | Element | Procedure | Expected safe output | Blocked (MUST NEVER OCCUR) | Required Approver |
|---|---|---|---|---|---|
| C3A-001 | pre-run controls + route | pre-flight VCU diagnostic sweep; verify track clearance + runout buffers. **The required clear path + post-target runout is set by the approved Runout Calculation Record for the exact test cell (RC-313); a fixed 50 m is an `INITIAL_FACILITY_TARGET` only and cannot authorize execution by itself.** Artifact: `RunoutCalculation_ID` (test mass · authorized speed · authorized torque/ramp · coast distance · foundation-brake distance · response allowance · surface/grade · measurement uncertainty · safety margin · approved containment plan) | baseline systems clear; runout established by the Runout Calculation Record | execution with spotters in path / inadequate runout / no `RunoutCalculation_ID` | Test Lead |
| C3A-002 | straight-line forward | commanded forward path (per the authorized cell) with steering centred; track drift via external markers vs VCU coordinates | stable linear path; tracking predictable | abrupt lateral pull / uncommanded yaw | Chassis Dynamics Lead |
| C3A-003 | straight-line reverse | commanded reverse path (per the authorized cell) with steering centred; verify reverse-direction register + tracking | rearward path predictable; velocity registers match command | commanded↔actual vector discrepancy | Test Lead |
| C3A-004 | speed-ceiling enforcement | **prove the governor FIRST via HIL/SIL, lifted-wheel/dyno, or a temporarily lowered physical ceiling; then on track issue a commanded speed/torque request exceeding the currently authorized ceiling while approaching from below and verify torque attenuation begins before physical speed crosses the authorized limit (RC-315 — do NOT depend on nearly crossing the highest permitted speed)** | attenuation begins before the boundary; speed capped at the authorized ceiling | velocity overshoot past the authorized governor / first confirmation attempted only at the max cell | Systems Safety Lead |
| C3A-005 | torque ramp + accel correlation | step pedal per the authorized cell; check command slope vs the ≤40 Nm/sec target; map against physical acceleration (separate but related quantities) | commands rise within the envelope; acceleration corresponds to the mass model | sudden step-function commands bypassing the rate filter | Systems Engineer |
| C3A-006 | brake override (straight) | while tracking forward, firmly apply the service brake | traction torque clears within the approved BOS response window; vehicle stops on foundation brakes | inverter commanding drive current against active brakes | Controls Director |
| C3A-007 | neutral interruption | at straight-line forward crawl, shift PRND → Neutral | torque-producing current drops within the window; propulsion torque → zero | torque-producing current / active drive command persisting in Neutral (RC-310) | Test Lead |
| C3A-008 | E-stop / torque removal | at steady forward speed, actuate the remote/hardwired E-stop | **hardwired loop forces the supplier-defined emergency torque-inhibit + HV-isolation response (RC-309, architecture-dependent); inverter current decays within the approved window** | delayed torque removal / uncoordinated loop response / auto contactor-open outside the approved fault class | Safety Director |
| C3A-009A | path-deviation **observation** | external survey/camera system records deviation vs internal steering signals and provides a **test-team abort indication** | deviation is logged; the test team can abort manually | reliance on a steering-angle signal alone for deviation (RC-316) | Systems Safety Lead |
| C3A-009B | path-deviation **torque-inhibit integration** | **only after** the external system interface, latency, signal validity, failure modes, and control authority are formally approved: the external system drives an automatic VCU torque-inhibit | VCU drops torque to zero on a validated path error | any automatic VCU authority granted to the external system before its interface/latency/validity/failure-modes/authority are approved (RC-316) | Systems Safety Lead + Controls Director |
| C3A-010 | repeated-run consistency | 5 consecutive straight-line accel/decel sequences within the authorized cell | metrics tightly grouped within approved boundaries | tracking-latency drift / thermal accumulation / erratic response | Calibration Engineer |

**External tracking is EVIDENCE + human-abort support, not automatic VCU
authority, until C3A-009B's interface is formally approved (RC-316). Path
deviation is measured by independent means (survey marks / camera / calibrated
positioning), not a steering-angle signal alone.**

## Subgate 05M-C3B — Coast-Down + Foundation Brakes

Establishes the pure mechanical-deceleration + natural-drag baseline. **Regen
stays disabled (0 Nm target) throughout.** Covers: C3B-001 zero-torque coast-down
(rolling-resistance / drag model) · C3B-002 foundation-brake stops (mechanical
friction only) · C3B-003 brake-assist stability under repeated stops (no 12 V
brownout) · **C3B-004 (rewritten, RC-317)** · C3B-005 stopping-distance
repeatability · C3B-006 brake-temperature observation.

**C3B-004 — Brake Override with Minimal Authorized Propulsion Request (owner
review_65, RC-317).** The brakes must NOT be required to fight sustained
propulsion torque: (1) apply the **lowest approved propulsion request for the
test cell**; (2) apply the service brake; (3) verify BOS removes the torque
command within the approved response window; (4) **after command removal**,
independently measure foundation-brake stopping; (5) a simulated BOS-latency
fault is evaluated **in HIL or another bounded method, never on a physically
moving vehicle.** Blocked: sustained propulsion torque after a brake request ·
phase current outside the decay envelope · foundation brakes forced to stall a
persistent motor output · any physical simulation of a hazardous BOS delay during
motion.

**C3B-006 — Brake temperature (owner review_65, RC-318):** the thermal authority
is **calibrated contact thermocouples or approved embedded sensors**; infrared is
**supplemental** — IR-only results are labelled `SCREENING_EVIDENCE` /
`NOT_FINAL_THERMAL_AUTHORITY` (emissivity / angle / airflow / shielding / rotor
construction / timing distort IR).

## Subgate 05M-C3C — Restricted Regeneration

Only after C3B `SIGNED_PASS`. **Regeneration Dominance Rule:** regen is
**supplemental deceleration only**; the mechanical foundation brakes remain the
primary, fully-validated stopping authority; **no regen strategy or blend may
reduce, delay, or interfere with required mechanical-brake authority.** Covers:
C3C-001 minimum regen request (≤5 Nm target) · C3C-002 pedal-lift regen response
(≤10 Nm target) · C3C-003 brake-blend boundary · C3C-004 regen inhibit at high
SOC · C3C-005 regen inhibit under BMS restriction · C3C-006 regen removal under
ABS/ESC-related condition · C3C-007 regen fault → foundation braking.

- **ABS/ESC regen-removal two-lane rule (owner review_65, RC-319):** factory
  ABS/ESC stays authoritative, but that does not authorize Elektron to consume
  every observed message as a safety command. **Lane A — approved factory status
  path:** usable **only if Ford-authorized documentation and formal interface
  approval exist.** **Lane B — conversion-side independent wheel-slip
  plausibility:** approved independent sensors or bounded simulation inhibit
  regen **without transmitting to or impersonating ABS/ESC** (extends RC-282).
- **No "instant"/"immediate" regen wording (owner review_65, RC-320):** regen
  inhibit at high SOC / under BMS restriction / on an ABS-ESC condition occurs
  **within the supplier-defined or engineering-approved regen-inhibit response
  window**, not "instantly".
- **Brake-blend is not assumed "linear" (owner review_65, RC-321):** the
  crossover transition must stay **within the approved deceleration continuity,
  pedal-response, pressure-response, and jerk envelope** (blending may be
  nonlinear by design). Track separately: requested regen torque · actual regen
  torque · hydraulic pressure · vehicle deceleration · deceleration jerk · pedal
  position · wheel-speed disagreement · BMS charge-current limit.

## Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map

**Steering angle is an observation + derating envelope input ONLY — it does not
act as active torque-vectoring / stability control (`NO_TORQUE_VECTORING_AUTHORITY`);
factory ABS/ESC stays authoritative over wheel slip
(`NO_ACTIVE_ABS_ESC_AUTHORITY`).** The map defines a *maximum permitted request*
envelope. Boundaries are partitioned into distinct test cells.

**No numeric angles, speeds, or torque limits are populated until linked to track
geometry, tire sizing, axle ratios, supplier boundaries, and formal engineering
approval (owner review_65, RC-322):** each cell's Max Traction Request / Max Ramp
Rate reads `CELL_VALUE_PENDING_APPROVAL`; the wheel-speed envelope reads
`KINEMATIC_MODEL_PENDING`; the "Immediate Torque Cutout" abort becomes
"**torque-inhibit response within the approved response window**".

| Speed band | Steering-angle band | Max traction request | Max regen request | Abort response | Authority status |
|---|---|---|---|---|---|
| initial low-speed cell | near-center | `CELL_VALUE_PENDING_APPROVAL` | disabled (0 Nm) | zero propulsion request | `INITIAL_TARGET_PROFILE` |
| initial low-speed cell | moderate turn | `CELL_VALUE_PENDING_APPROVAL` (further derated) | disabled (0 Nm) | zero propulsion request | `INITIAL_TARGET_PROFILE` |
| initial low-speed cell | high steering angle | minimum / blocked pending proof | disabled (0 Nm) | torque-inhibit response within the approved response window | `BLOCKED_PENDING_TEST` |
| any band | implausible steering signal | zero propulsion request | zero regen request | `HARD_BLOCK` | `HARD_BLOCK` |

**C3D kinematic inputs (owner review_65, RC-323) — road-wheel geometry, not
steering-wheel angle alone:** steering-wheel angle · steering ratio · measured or
derived road-wheel angle · wheelbase · front/rear track width · tire rolling
radius · axle ratio · differential type · expected inner/outer wheel-speed ratio
· vehicle yaw rate (if independently measured). For a chassis-cab platform,
body/upfit loading affects tire deflection and tracking.

## Subgate 05M-C3E — Closed-Area Fault + Abort Sequences

Integrates the prior blocks under compound-fault conditions via
**simulation-controlled or supplier-supported methods only** (RC-297). Passes
only if faults latch cleanly into NVM, traction torque is removed via the
designated abort hierarchy, and all automated retry / unvalidated re-power is
blocked pending an engineering diagnostic clear (RC-290).

**Cell-based fault escalation (owner review_65, RC-324) — HARD BLOCK.** Faults
begin at the **lowest signed operating-envelope cell**, NOT automatically at 15
km/h. No fault repeats at a higher cell until: the lower cell has `SIGNED_PASS` ·
fault containment is proven · runout remains valid · thermal state is acceptable
· the test lead separately authorizes escalation. Fault order: **single fault →
repeated single fault → paired fault → compound fault** — never a jump straight
to multiple faults at the highest provisional speed.

## Standing checks

- **Controlled closed-area low-speed movement only, engineer-gated, live-HV,
  closed area only, no public road / no customer / no normal-driving authority.**
  Built as five linear subgates (C3A→C3E); each expansion needs separate evidence
  + signoff. Every number is `INITIAL_TARGET_PROFILE` with no authority until
  fully linked (RC-300); the four-field approval record separates procedure
  approval from result signoff (RC-299); nothing is `SIGNED_PASS`.
- **Steering angle is observation/derating only, never torque-vectoring authority
  (RC-323); factory ABS/ESC stays authoritative and is never consumed as a
  control command without Ford-authorized docs + engineering approval (RC-282/319);
  CAN_1 electrically passive (RC-304); wheel-speed read-only (RC-282); a path
  deviation / software fault does not auto-open HV contactors unless the approved
  architecture dictates (RC-309); regen is supplemental, foundation brakes primary
  (RC-321); no "instant/immediate" wording (RC-288/320); never "certified safe"
  (RC-224).**
- **Nothing ingested; nothing Confirmed; no normal driving; no public road; no
  customer operation; no "certified safe"/compliance claim; ODRs untouched.**

## Next — formal engineering review

After the fourteen review_65 corrections the gate labels
`GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
roadmap is mature enough for disciplined engineering review, **not** physical
pass evidence. Subgate execution and cell authorizations are defined when the
owner sends those batches; supplier data (Ford ABS/ESC interface, inverter/BMS
regen + isolation architecture, tire/axle/geometry, thermal sensors) remains
NeedsSupplierData.
