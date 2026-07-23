# INTERFACE CONTROL DOCUMENT / SIGNAL AUTHORITY TABLE (Gate 05E)

The signal-boundary layer for the F-450/F-550 EV conversion controls
(Gate 05E, batch_39 + owner review_36). Gate 05D said *who owns each
action*; Gate 05E says *what signal is allowed to cross which boundary* —
so a signal cannot jump from "mapped in software" to "allowed to control
hardware." Simulation-only ICD draft.

**Status (owner review_36): `ICD_SIGNAL_BOUNDARIES_MAPPED` /
`SIMULATION_ONLY` / `FORD_SIDE_LISTEN_ONLY` /
`EV_SIDE_ISOLATED_CONTROL_PENDING` / `PRECHARGE_SIGNALS_NEED_SPLIT`* /
`SHUTDOWN_SIGNALS_NEED_SPLIT`* / `NO_FACTORY_BUS_TRANSMISSION` /
`NO_PHYSICAL_HARDWARE_DRIVE`.** (*The pre-charge and shutdown splits the
owner asked for are **applied below**.) Every signal is
`UNVERIFIED_STAGE`.

---

## The ICD gate rule (owner: "exactly right")

```
IF authority_status == "UNVERIFIED_STAGE" OR owner == "PENDING":
    PHYSICAL_HARDWARE_DRIVE     = "BLOCKED"
    BUS_TRANSMISSION_FACTORY    = "BLOCKED"
    EVALUATION_MODE             = "SIMULATION_ICD_VERIFICATION_ONLY"
```

A signal never crosses from software-mapped to hardware-controlling while
its owner is PENDING or its status is UNVERIFIED_STAGE.

## Decomposition doctrine (owner review_36, RC-168)

- **A signal cannot be both a request and a hardware actuation unless the
  source document explicitly says so.**
- **Every safety-critical action must be decomposed into:** request signal
  · status signal · feedback signal · hardware-actuation signal · fault
  signal. One signal name may not imply more authority than it has.

## Listen-only proof requirement (owner review_36, RC-167)

A Ford-side listen-only claim is not accepted until the proof pack shows:
interface configured in **silent / listen-only mode**; **no ACK
participation**; **no transmit mailbox enabled**; **capture log attached**;
**hardware-configuration screenshot attached**. (Strengthens Gate 05A.)

## Bus map

- **CAN_1** — Ford factory network (body-builder isolation gateway):
  **listen-only**, never transmitted onto.
- **CAN_2** — isolated EV inverter sub-loop.
- **CAN_3** — isolated EV battery-control loop (BMS/PDU) + isolated display
  loop.

---

## Signal Authority Table

| # | Signal | Source | Destination | Bus | Direction | Owner | VCU role / requester | Allowed use | Blocked use | Physical authority | Verify |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Ford Accelerator Pedal Input | **Ford factory module / UIM path — pending verification** (RC-166) | Conversion VCU (listen-only deck) | CAN_1 | Listen-only | Ford / factory network | none (passive capture) | compare driver-demand trend in sim only | direct inverter torque cmd / physical torque arbitration / road-test torque control | BLOCKED / NO_AUTHORITY | UNVERIFIED_STAGE |
| 2 | Ford Brake Switch State | **Ford factory module / UIM path — pending verification** (RC-166) | Conversion VCU (listen-only deck) | CAN_1 | Listen-only | Ford / factory network | none (passive capture) | sim-only regen-decay logic study | physical regen disable / braking validation / safety control w/o confirmed source + debounce + brake-engineer review | BLOCKED / NO_AUTHORITY | UNVERIFIED_STAGE |
| 3 | EV Traction Torque Command | Conversion VCU | EV traction inverter | CAN_2 | Transmit (isolated loop only) | PENDING_OWNER — VCU on isolated EV torque loop | VCU control-loop logic | dynamic performance/response eval in sim sweeps + HIL | transmit onto Ford safety/powertrain bus; driving hardware before final code review + pedal/brake override verification | SIMULATION_ONLY (blocked from road-test) | UNVERIFIED_STAGE |
| 4a | **VCU_Precharge_Request** (RC-164) | VCU | BMS/PDU | CAN_3 | Transmit request only | PENDING — BMS/PDU/Inverter supplier arch | VCU = requester | request pre-charge in sim; log | direct relay closure; forcing pre-charge w/o supplier protocol | BLOCKED until supplier protocol confirms request allowed | UNVERIFIED_STAGE |
| 4b | **BMS_Precharge_Status** (RC-164) | BMS/PDU | VCU | CAN_3 | Receive | BMS/PDU | VCU = monitor | monitor pre-charge slope / status flag (sim) | treating a status frame as an actuation grant | MONITOR | UNVERIFIED_STAGE |
| 4c | **Precharge_Relay_Coil_Control** (RC-164) | BMS/PDU or hardwired safety controller | Pre-charge relay | Direct hardware IO | Hardware actuation | BMS/PDU / hardwired safety controller | **VCU = none** | (owned by supplier controller) | **VCU energizing the relay coil unless supplier arch explicitly assigns it** | BLOCKED for VCU | UNVERIFIED_STAGE |
| 5 | HV Contactor Close Request | Conversion VCU | BMS safety module / PDU gateway | CAN_3 | Transmit request only | PENDING — assumed BMS/PDU internal functional-safety controller | VCU = requester (LV coordinator) | handshake sequencing in simulated logic loops | directly driving contactor coils; forcing state-bypass overrides | BLOCKED / NO_DIRECT_COMMAND_AUTHORITY | UNVERIFIED_STAGE |
| 6 | Battery Management State of Charge | BMS safety module | Conversion VCU / isolated cabin display | CAN_3 → display loop | Receive | BMS safety module | isolated EV display controller = requester | route to **isolated EV-side display only** | frame injection / bridging / translation to Ford factory cluster | DISPLAY_ONLY (isolated node) | UNVERIFIED_STAGE |
| 7a | **VCU_Torque_Zero_Request** (RC-165) | VCU | EV inverter | CAN_2 | Transmit request | VCU / Inverter | VCU = requester | zero simulated torque tables; soft torque inhibit on isolated loop | bridging onto factory Ford safety nets | pending inverter DBC + HIL review | UNVERIFIED_STAGE |
| 7b | **VCU_Shutdown_Request_To_BMS** (RC-165) | VCU | BMS/PDU | CAN_3 | Transmit request | BMS/PDU | VCU = requester only | request HV de-energization through authorized safety arch | assuming final HV isolation ownership | pending supplier protocol | UNVERIFIED_STAGE |
| 7c | **Hardwired_EStop_Open_Circuit** (RC-165) | Hardwired safety loop | Contactor / HVIL | Hardwired | Hardware actuation | Hardwired safety loop | **VCU = monitor only** | monitor E-stop state | **any software override** | NO SOFTWARE OVERRIDE | UNVERIFIED_STAGE |
| 7d | **BMS_Contactor_Open_Status** (RC-165) | BMS/PDU | VCU | CAN_3 | Receive | BMS/PDU | VCU = monitor | confirm contactor-open feedback (sim) | treating a status frame as an actuation grant | receive only | UNVERIFIED_STAGE |

Every row is `Build Engine Status: SIMULATION_ONLY`. Nothing crosses onto
CAN_1; nothing drives physical hardware.

### Owner corrections applied (review_36)

1. **Pre-charge split (RC-164)** — the single "Pre-Charge Inception Flag"
   (which mixed request + status + hardware actuation) is decomposed into
   **4a request / 4b status / 4c relay-coil control**; only the supplier
   controller may own the coil control, and the VCU may not energize it
   unless supplier architecture explicitly assigns that authority.
2. **Emergency-shutdown split + rename (RC-165)** — the confusingly named
   "Emergency Shutdown Inhibit Command" is decomposed into **7a torque-zero
   request / 7b shutdown request to BMS / 7c hardwired E-stop open (no
   software override) / 7d contactor-open status**, keeping torque inhibit
   separate from HV de-energization.
3. **Generic Ford sources (RC-166)** — Ford accelerator and brake-switch
   sources are **"Ford factory module / UIM path — pending verification,"**
   not a specific "Ford PCM / Accelerator Hub" or "Ford ABS / Brake Pedal
   Sensor Module," until the Ford source or a passive capture proves the
   exact module.
4. **Listen-only proof rule (RC-167)** — see the requirement above; the
   "no transceiver ACK activation" proof artifact is now a hard rule, not a
   nicety.

---

## Standing checks

- Ford-side signals are listen-only (no torque/braking authority); Ford
  cluster + Ford safety networks BLOCKED; EV torque on the isolated CAN_2
  loop only; pre-charge / contactors PENDING supplier ownership (BQ-27);
  emergency shutdown is split-ownership; the hardwired E-stop takes no
  software override.
- **Nothing ingested; nothing Confirmed; no factory-bus transmission; no
  physical-hardware drive; no invented threshold; ODRs untouched.**

## Next — Gate 05F (Network Boundary / Gateway Safety Rules)

Gate 05E maps the signals; Gate 05F defines what the gateway is physically
and logically allowed to do. It should answer: which buses are physically
isolated; which are listen-only; which can transmit; which signals may
cross Ford-side → EV-side; which are forbidden from crossing; what happens
if the gateway crashes; what happens if CAN_2 or CAN_3 goes silent; and
what proof shows CAN_1 never transmits.
