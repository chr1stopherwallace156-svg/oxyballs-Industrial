# STATE TRANSITION + OWNERSHIP MATRIX (Gate 05D)

The state-transition ownership matrix for the F-450/F-550 EV conversion
controls (Gate 05D, batch_38 + owner review_35). Gate 05C said *what the
states are*; Gate 05D says *who owns each action inside a state*, who may
request it, who only monitors, and who is blocked — so the VCU does not
silently become a "god controller."

**Status (owner review_35): `STATE_OWNERSHIP_MATRIX_CREATED` /
`VCU_ROLE_LIMITS_DEFINED` / `FORD_SIDE_CONTROL_BLOCKED` /
`EV_SIDE_CONTROL_ISOLATED` / `CONTACTOR_OWNER_PENDING` /
`PRECHARGE_OWNER_PENDING` / `HV_SHUTDOWN_OWNER_PENDING` /
`TORQUE_AUTHORITY_PENDING` / `SERVICE_MODE_PHYSICAL_SAFETY_PENDING` /
`SIMULATION_ONLY`.** Owner bottom line: **CREATED / SIMULATION_ONLY /
OWNERSHIP PENDING.**

---

## Permanent Build Engine doctrine (Decision Register D-007)

> **Coordinator ≠ Owner · Requesting ≠ Commanding · Monitoring ≠
> Approving · Seeing a signal ≠ having authority to act on it.**

> **Build Engine Authority Law.** No state transition may become
> physical-control authority until every action inside that transition has
> an assigned **owner**, allowed **requester**, **blocked-controller**
> list, and **proof artifact**. If ownership is unknown, the VCU may
> **simulate, monitor, or request only** — it may **not** directly
> control.

The owner elevated the first block to "a permanent Build Engine doctrine
line" (review_35). See `docs/DECISION_REGISTER.md` D-007.

## Role vocabulary

- **OWNER** — documented authority to perform the action.
- **REQUESTER** — may request the action; another controller decides.
- **MONITOR** — may read / log the state only.
- **DISPLAY_ONLY** — may show the state on an isolated EV display.
- **BLOCKED** — not allowed to perform the action.
- **PENDING** — ownership unknown until supplier/Ford documentation proves
  it (= `SimulationOnly`).

## Hard rules (owner)

- Unknown ownership = **SimulationOnly**.
- The VCU may **coordinate** but not **own** safety actions without
  documentation.
- Ford-side factory networks remain **listen-only** unless officially
  authorized.
- EV-side outputs stay **isolated** from Ford safety networks.
- **A state may be simulated if ownership is pending; a state may not
  control physical hardware until every action inside it has: owner ·
  requester · monitor · blocked controllers · proof artifact · verified
  source · test status.** (Owner's "clean stop sign.")

---

## State ownership matrix

| # | State | Action | Primary owner | VCU role | Allowed inputs (candidate) | Allowed EV-side outputs | Blocked Ford-side | Fault transitions | Ownership status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | OFF | Maintain baseline isolation / open-circuit HV | BMS / hardwired safety circuit | **MONITOR only if low-power supervisor mode is awake; otherwise dormant** (RC-161) | ignition OFF (listen-only), charger not connected (EV-side) | isolated LV supervisory telemetry log | all CAN_1 transmit; direct HV containment control | → FAULT_LATCHED on LV plausibility fail | PENDING_SUPPLIER_ARCHITECTURE |
| 2 | ACCESSORY | Power LV / thermal / isolated aux | Ford ignition hub / VCU for **isolated** EV aux relays | OWNER of isolated EV relays; MONITOR of Ford status | ignition ACC (listen-only), HVIL valid (hardwired) | thermal pumps, LV controllers, isolated EV displays — **only if LV power budget + pump ownership + thermal-controller authority are verified** (RC-162) | propulsion/torque/cluster msgs | → FAULT_LATCHED on HVIL break / node timeout | PENDING_SUPPLIER_DATA |
| 3 | READY_REQUEST | Process driver intent → HV wake-up | VCU (state coordination) | **REQUESTER / COORDINATOR only** | ignition START/RUN (listen-only), brake TRUE (sim-only), pack V nominal (supplier DBC) | wake-request flags on isolated EV CAN | flashing/injecting factory cluster/chassis | → FAULT_LATCHED on handshake timeout | UNVERIFIED_STAGE |
| 4 | PRECHARGE_REQUEST | Charge inverter DC-link / HV bus | **PENDING — BMS/PDU/Inverter supplier arch** | **REQUESTER / MONITOR only** | charger disconnected, HVIL valid, isolation valid, no fault latch, LV rail healthy, BMS/PDU/inverter awake, BMS/PDU says pre-charge allowed | request_precharge on isolated EV net (if supplier permits); log; "Pre-charge in progress" display | VCU energizing contactor coils without assigned authority; any factory transmit/injection | timeout / V-mismatch → FAULT_LATCHED; HVIL open → EMERGENCY_SHUTDOWN_REQUEST; isolation fault → FAULT_LATCHED/shutdown | PENDING_SUPPLIER_ARCHITECTURE |
| 5 | READY_TO_DRIVE | Close main +/- contactors | **PENDING — likely BMS/PDU safety controller, not assumed** | **REQUESTER / MONITOR only** | pre-charge complete, BMS discharge allowed, isolation valid, HVIL valid, no critical faults, inverter ready, LV rail healthy, brake/start condition met, shift valid | **VCU may request drive-enable state confirmation only; torque command remains BLOCKED until DRIVE_ENABLED is entered and all torque-authority conditions are satisfied** (RC-160) | direct contactor coil control w/o supplier approval; PCM/ABS/ESC spoofing; cluster "ready" injection | contactor no-close / feedback mismatch / weld → FAULT_LATCHED; HVIL open → EMERGENCY_SHUTDOWN_REQUEST | PENDING_SUPPLIER_ARCHITECTURE |
| 6 | DRIVE_ENABLED | Send motor torque request | VCU may become OWNER **only** on isolated EV inverter CAN after inverter DBC + BMS limits + pedal source + brake override + controls review are verified | PENDING_OWNER on EV-side torque loop; **NO_AUTHORITY** on Ford torque/powertrain bus | drive enabled, inverter ready, BMS discharge allowed, no fault latch, brake override valid, accel plausibility valid, charger disconnected, HVIL+isolation valid, shift valid, LV rail healthy | torque command to inverter on **CAN_2 only**; torque-limit cmd; torque-zero on fault | forwarding unverified Ford pedal directly to inverter; torque msgs on Ford network; PCM/ABS/ESC spoofing | brake+accel conflict → torque inhibit; BMS limit → derate; inverter fault / CAN timeout → torque zero; LV brownout → controlled stop request | UNVERIFIED_STAGE |
| 7 | DERATE | Contract performance limits | VCU / Inverter / BMS shared loop | PENDING_OWNER (isolated mapping only) | temp warning markers (supplier DBC), BMS current-limit bounds (supplier-confirmed) | scaled torque on isolated CAN_2; limit warnings to isolated EV display | fake MIL/temp/DTC frames on factory cluster bus | critical thermal/current breach → EMERGENCY_SHUTDOWN request | PENDING_SUPPLIER_DATA |
| 8 | FAULT_LATCHED | Safe non-operational software lock | Shared (VCU / BMS / PDU diagnostic registers) | OWNER of internal fault logic; MONITOR of external safety-node registers | active diagnostic code from verified EV-side loop | isolated fault-code gen/stream to service laptop; EV-display error | generating Ford DTCs / streaming on factory nets | permanent latch until authorized technician clear routine | UNVERIFIED_STAGE |
| 9 | SERVICE_MODE | Configure LV nets for maintenance | Certified technician via diagnostic tool | **CONTROLLED_INTERFACE node only** | maintenance-key handshake (authorized upfitter), ignition OFF (listen-only), velocity 0 | maintenance-config status on diagnostic tool | all factory-channel transmit disabled | → FAULT_LATCHED on unmapped live-voltage spike | PENDING_SUPPLIER_DATA |
| 10 | CHARGE_CONNECTED | Manage isolation during HV charging | Charger subsystem controller / BMS | MONITOR / lockout coordinator | plug connected (EV-side), velocity 0, ignition OFF (listen-only) | drivetrain propulsion lockout; charging stats to isolated EV display | propulsion cmds / network manipulation of Ford chassis/powertrain/stability | plug continuity break w/ current active → EMERGENCY_SHUTDOWN | PENDING_SUPPLIER_ARCHITECTURE |
| 11 | EMERGENCY_SHUTDOWN | Remove propulsion torque and **request HV de-energization** (RC-*) | Split: torque inhibit VCU/Inverter · contactor open BMS/PDU or hardwired E-stop · HVIL break hardwired · restart lockout BMS/PDU/VCU per arch | **REQUESTER / COORDINATOR** — may command torque zero on isolated loop, request contactor open, latch fault; **may not assume final HV isolation ownership until supplier docs prove it** | HVIL breach, isolation fault, contactor weld, critical overcurrent/overtemp, manual E-stop, brake/steering assist critical failure, CAN control loss | **request/trigger** EV-side torque inhibit + contactor-open + restart lockout **through the authorized BMS/PDU/hardwired safety architecture**; torque zero on isolated inverter bus; shutdown request to BMS/PDU; EV-side warning; internal fault latch/log | Ford cluster injection; factory ABS/ESC/airbag/security transmit; direct contactor control w/o authority; auto-clearing fault w/o inspection | exits only on physical inspection + fault source ID + service clear + supplier-defined restart conditions | PENDING_SUPPLIER_ARCHITECTURE |

Every row is `Build Engine Status: SIMULATION_ONLY`.

### Owner corrections applied (review_35)

1. **READY_TO_DRIVE (RC-160)** — removed the early "VCU may command torque
   only after confirmed ready state." Torque command stays **strictly in
   DRIVE_ENABLED**; READY_TO_DRIVE only requests drive-enable state
   confirmation.
2. **OFF (RC-161)** — VCU is **MONITOR only if a low-power supervisor mode
   is awake, otherwise dormant**; sleep-state monitoring may be owned by
   the LV supervisor / BMS keep-alive.
3. **ACCESSORY (RC-162)** — thermal pumps may run **only if LV power
   budget + pump ownership + thermal-controller authority are verified**,
   so the VCU does not become the thermal-controller owner too early.
4. **SERVICE_MODE (RC-163)** — physical maintenance requires **HV
   de-energized + LOTO active + service disconnect removed (if applicable)
   + absence-of-voltage verification + technician signoff**; the VCU
   cannot make service "safe" by software alone.
5. **EMERGENCY_SHUTDOWN** — "de-energize HV system" → **"request HV
   de-energization through the authorized BMS/PDU/hardwired safety
   architecture"** (the VCU may not own final HV isolation — consistent
   with RC-157 from Gate 05C).

---

## Final Responsibility Matrix

| Action | Absolute functional owner | VCU role | Authority status | Upgrade requirement / proof |
|---|---|---|---|---|
| Read Ford wheel speed | Ford module | MONITOR only | UNVERIFIED_STAGE | passive-capture trace validation log |
| Read Ford brake switch | Ford / UIM architecture | MONITOR only | UNVERIFIED_STAGE | functional-check logs: physical pedal vs bits |
| Read Ford accelerator | Ford / UIM architecture | MONITOR only | UNVERIFIED_STAGE | passive-capture trace validation (noise/bounds) |
| Command inverter torque | VCU / Inverter | PENDING_OWNER | UNVERIFIED_STAGE | clean inverter DBC + verified pedal source + peer review |
| Request pre-charge | BMS / PDU subsystem | REQUESTER / MONITOR | PENDING_SUPPLIER | documented supplier-architecture authority |
| Close main contactors | BMS / PDU safety node | REQUESTER / MONITOR | PENDING_SUPPLIER | supplier interface trace + loop logic maps |
| Open main contactors | BMS / PDU / E-stop loop | REQUESTER / MONITOR | PENDING_SUPPLIER | schematic sign-off for hardware-level open |
| Run coolant pumps | VCU / thermal controller | PENDING_OWNER | UNVERIFIED_STAGE | component wiring docs + thermal load profiles |
| Derate torque limits | VCU / Inverter / BMS | PENDING_OWNER | UNVERIFIED_STAGE | signed-off parameter maps + HIL validation |
| Display EV warning | EV display controller | OWNER (isolated node) | UNVERIFIED_STAGE | wiring layout validating standalone display isolation |
| Warn on Ford cluster | Ford factory modules | **BLOCKED** | **NO_AUTHORITY** | official written Ford Pro / upfitter authorization |
| ABS/ESC intervention | Ford factory modules | MONITOR only | **NO_CONTROL** | blocking-confirmation trace: no injected CAN frames |
| Fault latch action | VCU / BMS / PDU array | SHARED_RECORDER | UNVERIFIED_STAGE | register-address database map documentation |
| Service clear interface | Technician core tooling | CONTROLLED mode | UNVERIFIED_STAGE | safe step-by-step servicing procedure manual |

---

## Standing blocks / pending owners

- **Contactor owner — PENDING** (BQ-27): likely BMS/PDU safety node, not
  the VCU.
- **Pre-charge owner — PENDING** (BQ-27): BMS/PDU/Inverter supplier
  architecture required.
- **HV-shutdown owner — PENDING** (BQ-27): final HV isolation authority =
  BMS/PDU / hardwired E-stop.
- **Torque authority — PENDING**: VCU may own only on the isolated EV
  inverter CAN after inverter DBC + BMS limits + pedal source + brake
  override + controls review.
- **Service-mode physical safety — PENDING**: LOTO + absence-of-voltage
  procedure required before any physical maintenance.

**Nothing ingested; nothing Confirmed; the VCU owns nothing
safety-critical; no invented threshold; no factory-cluster injection; no
Ford signal grants torque authority.**

## Next — Gate 05E (Interface Control Document / Signal Authority Table)

Per signal: signal · source controller · destination controller · bus ·
direction · owner · requester · allowed use · blocked use · physical
authority · verification status · proof artifact. Gate 05D says *who owns
what*; Gate 05E says *what signal may cross which boundary* — preventing
Ford-side monitoring signals from crossing into EV-side control without
permission.
