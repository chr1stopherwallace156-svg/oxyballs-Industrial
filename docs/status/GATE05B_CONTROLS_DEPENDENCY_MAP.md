# CONTROLS DEPENDENCY MAP (Gate 05B)

The control/communication dependency map for the F-450/F-550 EV
conversion (Gate 05B, batch_36 + owner review_33). Ford-side signals may
**inform** the model; **EV-side authority stays isolated** until every
source, DBC, safety condition, and test path is proven.

**Status (owner review_33): `CONTROL_DEPENDENCY_MAP_STARTED` /
`SIMULATION_ONLY` / `FORD_SIDE_RECEIVE_ONLY` /
`EV_SIDE_ISOLATED_CONTROL_ONLY` / `PRECHARGE_AUTHORITY_UNCONFIRMED` /
`DRIVER_WARNING_OUTPUT_UNCONFIRMED` / `NO_PHYSICAL_TORQUE_CONTROL` /
`NO_FACTORY_CLUSTER_INJECTION`.**

---

## 1. Ford-side inputs (RECEIVE / LISTEN-ONLY)

All `J1939SignalCandidate / ListenOnlyCandidate / UnverifiedStage /
NoControlAuthority` (RC-140/145) — captured on CAN_1 via the body-builder
isolation gateway; used **only inside the VCU simulation layer**:

- `E_Accel_Pedal_Pos_Pct` — monitor driver-demand behaviour (sim only)
- `E_Brake_Switch_Discrete` — flag deceleration trends (sim only)
- `E_Ignition_State_Discrete` — map startup routines (sim only)
- `E_Wheel_Speed_Flanks_Raw` — baseline roll trends (sim only)

## 2. EV-side inputs (RECEIVE, owned isolated loops)

Sourced from **our** DBCs (RC-144), read-only into the VCU:

- `M_Inverter_Rpm` — CAN_2, inverter DBC
- `M_BMS_Pack_Volt` — CAN_3, BMS DBC
- `M_BMS_Pack_Current` — CAN_3, BMS DBC
- `M_BMS_Pack_SOC_Pct` — CAN_3, BMS DBC
- `M_DCDC_Temp` — DC-DC DBC
- `M_CHG_Plug_Connected` — charger DBC

## 3. VCU decisions — **SimulationOnly with authority conditions (RC-150)**

- **Torque Demand Arbitration:** `SimulationOnly` until a verified pedal
  source, brake override, plausibility checks, the inverter DBC, BMS
  limits, and controls-engineer review all exist.
- **Pre-Charge Sequence Management:** `SimulationOnly` until the BMS/PDU
  supplier architecture confirms **whether the VCU, BMS, or PDU owns
  pre-charge authority**. **Do NOT assume the VCU may directly control
  contactors or pre-charge** — that may belong to the BMS/PDU safety
  controller (BQ-27).
- **Thermal Management / Derating:** `SimulationOnly` until supplier
  derating curves and component temperature limits are loaded.

## 4. Driver warnings — EV-side output only (RC-151)

- **EV warning output candidate:** isolated display node / service laptop
  / prototype dashboard **only** (EV malfunction indicator, thermal-limit
  warning, SOC display).
- **Factory cluster warning integration:
  `BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE`.** No warning is injected
  into the Ford factory cluster until an authorized Ford interface exists.

## 5. Fault states (protective transitions)

- **Fault Level 1 (Soft Derate):** safety-limited output when secondary
  sensor signals deviate from expected sim bounds.
- **Fault Level 2 (Pre-Charge Timeout):** safe lockout if voltage does not
  normalize within the target window (authority per §3 pre-charge).
- **Fault Level 3 (Emergency Shutdown) — RC-152:** **request** EV-side
  contactor open / torque inhibit / restart lockout **through the
  authorized BMS-PDU safety architecture.** `SimulationOnly` until BMS/PDU
  ownership + contactor-control authority are confirmed — **the VCU does
  NOT automatically own final HV shutdown** unless the supplier
  architecture confirms it.

## 6. Directionality + isolation constraints

- **Receive-only (EV side):** SOC, pack voltage, pack current, DC-DC temp.
- **Transmit-only (EV side, isolated):** `M_EV_Torque_Command_Nm` (CAN_2
  → inverter loop), `M_VCU_Precharge_Enable` (→ isolated battery box —
  **authority unconfirmed**, see §3/§5).
- **Completely blocked:**
  - no direct routing of unverified CAN_1 Ford data into the CAN_2
    inverter torque-command pathway;
  - no frame bridging / packet injection from EV subsystems onto factory
    Ford safety networks;
  - no unauthorized J1939 messages or custom upfitter command overrides
    on the vehicle chassis control network.

## Next — Gate 05C (Controls State Machine)

Map every operating state (OFF, ACCESSORY, READY_REQUEST,
PRECHARGE_REQUEST, READY_TO_DRIVE, DRIVE_ENABLED, DERATE, FAULT_LATCHED,
SERVICE_MODE, CHARGE_CONNECTED, EMERGENCY_SHUTDOWN) with: required inputs,
allowed EV-side outputs, blocked Ford-side outputs, fault transitions,
proof artifact, verification status.
