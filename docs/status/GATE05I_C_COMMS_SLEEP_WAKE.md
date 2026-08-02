# LOW-VOLTAGE COMMUNICATIONS & POWER STATE INTEGRITY (Gate 05I-C)

The low-voltage network-interface + power-state verification layer for the
F-450/F-550 EV conversion controls (Gate 05I-C, batch_48 → 49 → v2 in
batch_50 + owner review_47). After the Gate 05I-A driver-safety-logic matrix
and the Gate 05I-B mechanical-interlock matrix are defined and bench
evidence collected (RC-210), Gate 05I-C proves the communication stacks,
frame-handling engines, transceiver configs, DBC synchronization, **and
sleep/wake + parasitic-drain behaviour** are robust against electrical,
logical, and low-power fault states — **without ever exposing a live wire to
CAN_1 leakage**. The "hidden failure" layer.

**Status (owner review_47): `NETWORK_INTEGRITY_MATRIX_CREATED` /
`SLEEP_WAKE_MATRIX_CREATED` / `LOW_VOLTAGE_BENCH_ONLY` /
`CAN_1_LISTEN_ONLY_PROOF_REQUIRED` / `DBC_VERSION_HASH_REQUIRED` /
`APPLICATION_LAYER_VALIDATION_DEFINED` / `PHYSICAL_CAN_FAULT_INJECTION_DEFINED`
/ `SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW` /
`HEARTBEAT_TIMEOUTS_PENDING_SOURCE_REVIEW` / `NO_LIVE_HV` /
`NO_VEHICLE_MOTION` / `NO_LIVE_FORD_CAN_TRANSMISSION` /
`NO_VEHICLE_CLEARANCE`.** Owner: "now a real bench network-integrity gate;
the DBC version hash + TXD-pin proof are excellent." Chain: **logic →
interlocks → communications → sleep/wake → integrated fault cascades (05I-D)
→ later physical bench integration review.**

## Target-value doctrine (owner review_47, RC-220) — read first

Every value is a **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING /
CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** input, not a rule
(eleventh artifact of the invented-values family): ≤100 ms heartbeat, >15 ms
latency, 50 ms UDS, ≤2.0 s sleep, ≤4.0 mA total sleep, ≤200 ms wakeup, ≤5.0 s
stuck-awake, 6.0 V/9.0 V brownout, 75/90% bus load. E.g. the heartbeat line
reads "…within the configured bench target window; initial bench target
≤100 ms; final timeout pending supplier docs + controls review + bench
evidence." The IF logic uses `approved_*` variables, not constants.

## Network topography / isolation boundary (owner review_47, RC-221)

```
[Simulated OEM CAN_1 Traffic / Protected Bench Harness]
        X X X  physical isolation barrier  X X X
[VCU CAN_1 Transceiver — passive listen-only, TXD monitored]
```

**No live Ford vehicle network may be connected during Gate 05I-C.** CAN_2
(VCU↔inverter) + CAN_3 (VCU↔BMS/PDU) are each 120 Ω-terminated; UDS +
isolated EV display on their own lines.

---

## Gate 05I-C1 — Communication Network Integrity

### Physical & protocol layer (RC-222)

- **CAN_1 passive listen-only isolation** — the VCU CAN_1 controller **never
  transmits, asserts TXD dominant, participates in ACK, or emits active
  error frames**; proven by an oscilloscope probe on the **VCU physical TXD
  pin / transceiver path** (other bench OEM nodes may ACK — the VCU must not)
  (RC-216).
- **Physical/protocol fault filtering** — bad CRC, bit-stuffing, form, and
  bit errors are **physical/protocol-layer faults injected with a CAN
  fault-injection tool that corrupts frames below the application layer**,
  and are discarded by the **CAN controller hardware before app parsing**;
  they must not cause register lockups, buffer overflows, or app crashes
  (RC-217/222).

### Application layer (RC-217/218)

- **DBC version hash (RC-218)** — the expected DBC version hash/checksum is
  **stored in the Build Engine**; the **VCU firmware declares** its expected
  version; the **bench run logs the actual** version; **mismatch =
  `BENCH_HARD_BLOCK_PENDING_REVIEW`**.
- **Data-integrity wrappers** — Rolling Alive Counters (dropped/frozen
  frames) + Application-Layer Checksums (payload corruption bypassing
  physical CRCs); a mismatch invalidates the frame.
- **Application/data validation** — wrong arbitration ID / wrong source
  address / wrong DLC / bad alive counter / bad app checksum / out-of-range
  decoded values → reject, flag DTC, safe/zero-torque state.

### 05I-C1 matrix (bench-only, Expected Safe Output vs Blocked Outputs)

| Test | Domain | Fault/stimulus | Expected safe output | Blocked (MUST NEVER OCCUR) |
|---|---|---|---|---|
| 001 | CAN_1 active silent mode | active traffic + diagnostics; scope on VCU TXD pin | passive silence; VCU does not ACK | any active transition on the VCU CAN_1 TXD pin / VCU ACK on CAN_1 |
| 002 | protocol-level fault rejection | FIU inject bad CRC / bit-stuffing / bus faults | CAN hardware discards; app stays responsive, no reset | app crash/reboot / app parser processing a bad-CRC frame |
| 003 | application-layer data validation | wrong ID / PGN / alive counter / checksum / out-of-range | VCU flags validation DTC; invalid frames discarded; safe state | acceptance of out-of-range values / unexpected state jumps |
| 004 | loss-of-heartbeat timeout | sever CAN_2/CAN_3 / halt heartbeat | zero-torque + comm-loss DTC within the configured target window (≤100 ms bench target, RC-220) | latency beyond target before action / holding last-known torque |
| 005 | high bus-load stress | step to 50/75/90% (target) | critical frames in tolerance; no error frames; no safety-frame drops | bus-off / critical-ID frame drops (0% tolerance) |
| 006 | diagnostic routing & UDS security | UDS 0x10/0x22/0x2E; unauthorized writes; unexpected requests | correct responses within target; unauthorized writes denied | unauthenticated calibration changes / diagnostic-induced lockup |

## Gate 05I-C2 — Sleep / Wake / Parasitic Drain

### Per-node + total-system sleep-current targets (owner review_47, RC-220)

All `BENCH_TARGET_PROFILE`; final values require supplier datasheets +
parasitic-drain budget + engineering review:

- `VCU_sleep_current_target`
- `BMS_logic_sleep_current_target`
- `PDU_logic_sleep_current_target`
- `Inverter_logic_sleep_current_target`
- `Display_sleep_current_target`
- `Total_system_sleep_current_target` (≤4.0 mA initial bench target)

### Transition/wake rules

- Sleep transition window (≤2.0 s target); stuck-awake flag if a node fails
  to sleep within ~5.0 s (target) — log the offending node; brownout
  recovery — see the hardware caveat below.

### 05I-C2 matrix

| Test | Domain | Stimulus | Expected safe output | Blocked |
|---|---|---|---|---|
| 001 | key-off sleep entry | ignition OFF; inline ammeter | transceivers → standby; traffic halts; current to per-node/total target | node stuck awake (> target) / active CAN frames after sleep entry |
| 002 | charger-plug wakeup | assert charge proximity/pilot wake | wake to charge-monitoring within target; CAN_3 resumes cleanly | fail to wake on charge / wake into a driving state |
| 003 | service-tool wakeup | diagnostic wake frames | wake to diagnostic state within target; comms resume | unauthorized/unresponsive wake / state-machine lockup |
| 004 | fault-event wakeup | BMS thermal/digital fault trigger | wake, log fault, transmit fault frame, return to sleep if appropriate | failing to log a critical fault / indefinite awake |
| 005 | stuck-awake detection | force sleep while one node stays busy | detect within target; flag "Stuck Awake"; log the node | silent battery drain w/o flag / system hang on sleep |
| 006 | brownout recovery | ramp 12 V → ~6.0 V → recover ≥9.0 V | **VCU shall preserve NVM integrity; if a graceful save is required, the early-warning threshold + hold-up capacitance + write-time budget + memory endurance must be verified (RC-223)**; boot clean, no spurious trips | processor lockup / loss of NVM parameters / spurious safety/interlock trips on boot |

**Brownout hardware caveat (RC-223):** "save NVM before shutdown" only works
with adequate warning/time/energy reserve. Initial bench profile 6.0 V drop
/ 9.0 V recovery; final values pending VCU hardware design + bench proof.

---

## Owner corrections applied (review_47)

1. **Target-value labels + per-node sleep current (RC-220)** — all timings/
   percentages/currents are bench-target profiles; the sleep-current list is
   explicit per node (VCU/BMS/PDU/Inverter/Display/Total).
2. **CAN_1 diagram is simulated/protected only (RC-221)** — no live Ford
   network during 05I-C.
3. **Physical/protocol fault-injection wording (RC-222)** — bad CRC/bit-
   stuffing via a CAN fault-injection tool below the app layer; wrong-ID/
   DBC/counter are app-layer.
4. **Brownout early-warning hardware (RC-223)** — NVM save needs verified
   early-warning + hold-up + write-budget + endurance.

## Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + no leakage (TXD-pin proof); a DBC is a
  database not a packet + version-hash enforced (RC-213/218); no
  timing/threshold/bus-load/current becomes a rule until controls review +
  supplier/DBC confirmation upgrades it; the VCU requests but does not own HV
  isolation (RC-205; BQ-27).
- **Nothing ingested; nothing Confirmed; Gate 05J / live vehicle
  commissioning NOT YET; ODRs untouched.**

## Next — Gate 05I-D (Low-Voltage End-to-End Bench Run / Integrated Fault Cascades)

Stop testing one thing at a time; test **integrated fault cascades** with
all components (VCU, BMS logic, inverter logic, display, simulator
interfaces) running dynamically in real-time. Owner scope (12 cascades):
accel + brake override · active torque + HVIL open · active torque + BMS
no-discharge · active torque + inverter fault · active torque + CAN_2
heartbeat loss · charge-plug during drive state · E-stop during active
torque · brownout during fault latch · service-clear during active fault ·
sleep request with a stuck-awake node · **CAN_1 silence during every
cascade** · **display warning during every cascade**. Bench-only; no live
HV, no vehicle motion, no Ford-bus transmission.
