# NETWORK BOUNDARY / GATEWAY SAFETY RULES (Gate 05F)

The network-boundary layer for the F-450/F-550 EV conversion controls
(Gate 05F, batch_40 + owner review_37). Gate 05E mapped the signals;
Gate 05F defines what the CAN gateway is physically and logically allowed
to do — which buses are isolated, which are listen-only, which may
transmit, which signals may cross Ford-side → EV-side, and what happens
when the gateway or a bus fails. Simulation-only network-boundary gate.

**Status (owner review_37): `NETWORK_BOUNDARY_RULES_CREATED` /
`CAN_1_LISTEN_ONLY_REQUIREMENT_DEFINED` / `EV_SIDE_BUSES_ISOLATED` /
`PRECHARGE_SIGNAL_DECOMPOSED` / `SHUTDOWN_SIGNAL_DECOMPOSED` /
`TIMEOUT_VALUES_PENDING_SUPPLIER_DATA` / `NO_FACTORY_BUS_TRANSMISSION` /
`NO_PHYSICAL_GATEWAY_DEPLOYMENT` / `SIMULATION_ONLY`.** Owner: "excellent
structurally … very good."

---

## The gateway gate rule (owner: "exactly right")

```
IF listen_only_proof == "MISSING" OR isolation_status == "UNVERIFIED":
    GATEWAY_DEPLOYMENT       = "BLOCKED"
    PHYSICAL_INJECTION_TEST  = "FORBIDDEN"
    EXECUTION_MODE           = "SIMULATION_BOUNDARY_LOGIC_ONLY"
```

## Timing doctrine (owner review_37, RC-173) — read first

**No timeout, heartbeat, alive-counter, torque-zero, shutdown, or
contactor-open timing may become physical gate logic until confirmed by
supplier documentation or HIL/bench proof.** If a timeout is estimated it
may be used **only in simulation sweeps** and must be labelled **"No Gate
Authority."**

The batch's inline `50 ms` / `100 ms` numbers are therefore **downgraded**
(recurrence of the invented-timing defect — cf. the 200 ms HVIL fabrication
RC-116 and the Gate 08C placeholder-authority rule RC-133):

| Placeholder | Value | Status |
|---|---|---|
| `t_inverter_timeout` | SupplierDataPending | sweep-only (50/100/250 ms exploratory) — **No Gate Authority** |
| `t_can2_timeout` | SupplierDataPending | sweep-only — **No Gate Authority** |
| `t_can3_timeout` | SupplierDataPending | sweep-only — **No Gate Authority** |

---

## 1. Physical + logical isolation architecture

Three isolated buses prevent accidental injection or cross-talk between the
OEM chassis and the aftermarket EV powertrain.

| Bus | Scope | Mode |
|---|---|---|
| **CAN_1** — Ford factory / body-builder gateway | Ford factory modules | **Listen-only.** Hardware must be **selected, wired, or configured for listen-only / silent monitoring with no transmit capability enabled** (RC-172) — options: silent-mode controller, receive-only transceiver setup, removed TX path, or hardware gating |
| **CAN_2** — isolated EV inverter sub-loop | VCU ↔ traction inverter | Transmit + receive (isolated) |
| **CAN_3** — isolated EV battery-control loop | VCU ↔ BMS ↔ PDU | Transmit + receive (isolated) |

## 2. Network-boundary routing rules

**Cross-boundary allowed (Ford-side → EV-side)** — only passive
driver-intent proxies, for **simulation comparison only**:

- `Ford_Accel_Pedal_Raw_Proxy` → target-value mapping comparisons (sim).
- `Ford_Brake_Switch_Raw_Proxy` → deceleration-request trend monitoring
  (sim).
- `Ford_Ignition_State_Raw_Proxy` → trigger low-power VCU wake-up.

**Forbidden from crossing (EV-side → Ford-side):**

- All `EV_Torque_Command` / motor-performance parameters.
- All HV metrics (`BMS_Pack_Voltage`, `BMS_Current`,
  `Inverter_DC_Link_Voltage`).
- All aftermarket cooling / thermal error + alert frames.
- **Any frame attempting to spoof a Ford PCM / ABS / ESC / airbag
  controller ID.**

## 3. Gateway failure + timeout protocols (timeouts SupplierDataPending)

- **Protocol A — gateway processor crash / lockup:** VCU CAN transceivers
  drop to **high-impedance** (open lines, no bus lockup). The traction
  inverter detects loss of the VCU cyclic frame and transitions to
  **supplier-defined zero-torque behaviour — timeout pending inverter DBC /
  supplier safety manual**. The BMS/PDU detects the absent
  `VCU_Precharge_Request` / alive-counter frame and runs a **controlled HV
  shutdown under its own safety rules**.
- **Protocol B — CAN_2 (inverter loop) silent:** VCU detects absent
  inverter telemetry **after a supplier-defined timeout (placeholder values
  simulation-only)** → `FAULT_LATCHED`, downstream activation halted, comms
  fault logged, further HV-close attempts blocked.
- **Protocol C — CAN_3 (battery loop) silent:** VCU detects absent BMS
  heartbeat **after a supplier-defined timeout (placeholder values
  simulation-only)** → sets torque demand to zero on CAN_2, transitions to
  `FAULT_LATCHED`. **BMS independent contactor-opening behaviour pending
  supplier architecture** — the BMS opens contactors under its own safety
  rules on loss of the VCU supervisor.

## 4. Mandatory listen-only proof dossier (CAN_1 never transmits)

Five-part verification, required before moving past simulation (RC-167):

1. **Silent-mode register configuration** — CAN_1 init code explicitly
   configures the peripheral into Silent / Listen-Only mode, separating the
   internal TX line from the physical TX pin.
2. **No ACK participation** — transceiver configured / wired so it does not
   pull the bus dominant during the ACK slot of a received frame.
3. **No transmit-mailbox allocation** — firmware allocates **zero** TX
   mailboxes to the CAN_1 controller instance.
4. **Capture-log attachment** — ≥ 10-minute continuous raw CAN log showing
   zero frame errors and zero injected IDs from the VCU node during active
   bus operation.
5. **Hardware-configuration screenshot** — register-map settings showing
   the controller operating-mode bits set to listen-only.

---

## Owner corrections applied (review_37)

1. **Timeouts stripped of authority (RC-173/169)** — see the timing
   doctrine table; `50 ms / 100 ms` are sweep-only "No Gate Authority"
   placeholders, not gateway rules.
2. **Authority language (RC-170)** — "academic engineering wiring
   protocol" / "manual OEM academic research protocol" → **"BLOCKED until
   supplier wiring diagram, interface control document, and controls
   engineer review confirm request authority."**
3. **Signal-owner vs action-owner split (RC-171)** — for
   `VCU_Precharge_Request` and `VCU_Shutdown_Request_To_BMS`:
   **Signal Owner = VCU (owns request generation); Action Owner =
   BMS/PDU/hardwired safety (owns execution); VCU Authority = requester
   only.**
4. **CAN_1 hardware language (RC-172)** — "transceiver must be modified" →
   **"selected, wired, or configured for listen-only / silent monitoring
   with no transmit capability enabled."**

## Standing checks

- CAN_1 listen-only (no transmit); EV-side buses isolated; pre-charge +
  shutdown signals decomposed; Ford PCM/ABS/ESC/airbag ID spoofing
  forbidden; no EV torque or HV metric crosses to the Ford side.
- **Nothing ingested; nothing Confirmed; no timeout has physical
  authority; no factory-bus transmission; no physical gateway deployment;
  ODRs untouched.**

## Next — Gate 05G (Fault Containment and Gateway Failsafe Matrix)

Gate 05F says what may cross the boundary; Gate 05G says what happens when
something fails — VCU crash, CAN_1 accidental transmit, CAN_2/CAN_3 silent,
gateway power loss, gateway stuck dominant/recessive, bad checksum /
alive-counter, message replay, wrong source address, BMS says no-discharge,
inverter ignores torque-zero, E-stop asserted.
