# CONTROLS STATE MACHINE (Gate 05C)

The operating-state machine for the F-450/F-550 EV conversion controls
(Gate 05C, batch_37 + owner review_34). The VCU may **coordinate** the
state machine, but it **cannot assume ownership** of contactors,
pre-charge, HV shutdown, factory signals, or cluster warnings until
supplier/Ford documentation proves it.

**Status (owner review_34): `STATE_MACHINE_DRAFTED` / `SIMULATION_ONLY` /
`AUTHORITY_OWNERSHIP_UNRESOLVED` / `FORD_SIDE_SIGNALS_LISTEN_ONLY` /
`EV_SIDE_OUTPUTS_ISOLATED` / `PRECHARGE_OWNER_PENDING` /
`HV_SHUTDOWN_OWNER_PENDING` / `NO_PHYSICAL_TORQUE_CONTROL` /
`NO_FACTORY_CLUSTER_INJECTION`.** Every state is `UNVERIFIED_STAGE`.

---

## Standing labels (owner review_34)

- **Ownership (RC-158):** every state carries **Owner ∈ {VCU, BMS, PDU,
  Inverter, Charger, Ford module, Hardwired safety circuit, Unknown /
  Pending supplier architecture}**, plus a **VCU Role** and an
  **Authority Status**. The VCU is not assumed to own contactors,
  pre-charge, or HV shutdown (BQ-27).
- **Ford-side inputs (RC-155):** listen-only Ford signals
  (`E_Ignition_State_Discrete`, `E_Brake_Switch_Discrete`, …) are
  **`SimulationOnly / CandidateSignal`** — **not** real
  state-transition authority until an official Ford/UIM source or a
  verified capture exists. Physical control uses **verified EV-side /
  supplier-confirmed / hardwired-safety / authorized-upfitter** inputs.
- **No invented thresholds (RC-156):** the pre-charge ">95% / timeout"
  is **`ParameterPending / SupplierDataRequired`** — supplier-defined
  target within a supplier-defined timeout.

## States

| # | State | Owner | VCU role | Key required inputs (candidate) | Allowed EV-side outputs | Blocked Ford-side | Fault transitions |
|---|---|---|---|---|---|---|---|
| 1 | OFF | VCU (LV supervisor) | coordinate | ignition OFF (candidate), charger not connected | deep sleep + keep-alive telemetry | all CAN_1 transmit | → FAULT_LATCHED on LV plausibility fail |
| 2 | ACCESSORY | VCU + BMS | coordinate | ignition ACC (candidate), HVIL valid | cooling pumps, accessory ctrl, EV displays | movement/torque msgs | → FAULT_LATCHED on HVIL break / node handshake fail |
| 3 | READY_REQUEST | VCU | request | ignition START/RUN + brake (candidate, sim-only), pack V nominal | wake requests to isolation components | drive params / cluster | → FAULT_LATCHED on startup timeout |
| 4 | PRECHARGE_REQUEST | **BMS/PDU — pending supplier arch** | **request/monitor only** | authority confirmed via BMS/PDU; pack V visible | monitor pre-charge slope (sim only) | factory transmit | → FAULT_LATCHED if V fails supplier-defined target within supplier-defined timeout (RC-156) |
| 5 | READY_TO_DRIVE | **safety controller (BMS/PDU) — pending** | monitor | +/- contactor confirmation **from safety controller** | inverter HV-active flag, DC-DC startup | display cmds / chassis | → EMERGENCY_SHUTDOWN on unexpected contactor drop |
| 6 | DRIVE_ENABLED | VCU (coordinate) + Inverter | coordinate torque request | **full set:** charger disconnected, HVIL valid, isolation valid, no fault latch, pre-charge complete, contactors confirmed by safety controller, brake override available, accel plausibility valid, LV rail healthy, BMS allows discharge, inverter ready; shift == D | regulated torque request on CAN_2 (isolated) | routing unverified accel to physical torque; commanding Ford systems | → DERATE (minor) / → EMERGENCY_SHUTDOWN (major) |
| 7 | DERATE | VCU + Inverter | coordinate | temp/secondary-sensor warning markers | torque-scaling on isolated motor net | factory cluster / stock warning | → EMERGENCY_SHUTDOWN on critical thermal breach |
| 8 | FAULT_LATCHED | VCU | latch/log | active fault flag | isolated fault-code storage; EV-side diagnostic display | all primary-network transmit | stays latched until LV hard cycle / clear routine |
| 9 | SERVICE_MODE | **Hardwired safety + technician** | permit diagnostics | **only after HV de-energized + LOTO active + service disconnect removed + absence-of-voltage verification (RC-157)**; ignition OFF, velocity 0 | service diagnostics | all network transmit | → FAULT_LATCHED on unexplained line activity |
| 10 | CHARGE_CONNECTED | **Charger controller** | hand off / monitor | plug connected, velocity 0, ignition OFF | isolate drivetrain; hand authority to charger stack | propulsion / drive-request msgs | → EMERGENCY_SHUTDOWN on abrupt plug drop w/ current active |
| 11 | EMERGENCY_SHUTDOWN | **BMS/PDU / hardwired E-stop — pending supplier arch** | **request only** | major safety-line breach or manual E-stop | **request/trigger** EV-side torque inhibit + contactor-open + restart lockout **through the authorized BMS/PDU safety architecture** (RC-157); torque → 0 Nm on isolated loop | all factory-network frames | latches until physical inspection + master hard-clear |

**Emergency-shutdown authority (RC-157):** *Final HV isolation authority
= BMS/PDU / hardwired E-stop — pending supplier architecture.* The VCU
does not assume it owns final HV shutdown unless the hardware documents
say so.

**Proof artifacts:** per-state software register / trace / log exports —
all `UNVERIFIED_STAGE` (simulation) until physical + supplier-confirmed.

## Next — Gate 05D (State Transition + Ownership Matrix)

Per state: state · owner · entry conditions · exit conditions · allowed
outputs · blocked outputs · fault transitions · required proof artifact ·
authority status · supplier data needed.
