# LOW-VOLTAGE COMMUNICATIONS INTEGRATION & NETWORK ROBUSTNESS (Gate 05I-C)

The low-voltage network-interface verification layer for the F-450/F-550 EV
conversion controls (Gate 05I-C, batch_48 → full matrix in batch_49 + owner
review_46). After the Gate 05I-A driver-safety-logic matrix and the Gate
05I-B mechanical-interlock matrix are **defined and bench evidence is
collected** (RC-210), Gate 05I-C proves the communication stacks,
frame-handling engines, transceiver configurations, DBC synchronization, and
sleep/wake controllers are robust against electrical and logical network
faults — **without ever exposing a live wire to CAN_1 leakage**. This is the
"hidden failure" layer (the vehicle works once, then the 12 V battery
drains, the bus locks up, or one wrong frame misbehaves).

**Status (owner review_46): `NETWORK_INTEGRITY_MATRIX_CREATED` /
`SLEEP_WAKE_VALIDATION_INCLUDED` / `LOW_VOLTAGE_BENCH_ONLY` /
`CAN_1_LISTEN_ONLY_PROOF_REQUIRED` / `DBC_VERSION_CONTROL_REQUIRED` /
`HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW` /
`SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW` / `NO_LIVE_HV` /
`NO_VEHICLE_MOTION` / `NO_LIVE_FORD_CAN_TRANSMISSION` /
`NO_VEHICLE_CLEARANCE`.** Chain: **logic → interlocks → communications →
sleep/wake → then later physical bench integration review** (Gate 05I-D).

## Sub-gates (owner review_45, RC-214)

- **Gate 05I-C1 — Communication Network Integrity** (tests 001–006, 008)
- **Gate 05I-C2 — Sleep / Wake / Parasitic Drain** (tests 007–008 + drain)

## Target-value doctrine (owner review_46, RC-215) — read first

Every value is a **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING /
CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** input, not a rule (tenth
artifact of the invented-values family
RC-116/133/169/174/180/188/202/208/212):

| Value | Bench target | Status |
|---|---|---|
| critical-frame latency rise @75% load | >15 ms | BENCH_TARGET_PROFILE |
| heartbeat-loss window | 100 ms | "initial bench target; final timeout pending supplier docs + controls review + bench evidence" |
| UDS response | 50 ms | BENCH_TARGET_PROFILE |
| sleep transition | ≤2.0 s | BENCH_TARGET_PROFILE |
| wakeup transition | ≤200 ms | BENCH_TARGET_PROFILE |
| bus-load stress | 75–90% | BENCH_TARGET_PROFILE |
| harness length / twist | 10 m / 110 turns/m | BENCH_TARGET_PROFILE |
| V_cell / temp bounds | >4.5 V / >150 °C | BENCH_TARGET_PROFILE |

**Sleep-current targets are per-node + total-system (RC-215):**
`VCU_sleep_current_target`, `BMS_logic_sleep_current_target`,
`Inverter_logic_sleep_current_target`, `Display_sleep_current_target`,
`Total_system_sleep_current_target` — the ≤1.0 mA figure may be too
aggressive for the whole system; final limits require supplier datasheets +
a parasitic-drain budget.

## The isolation-resolution rule (owner review_46, variables not constants)

```
IF BENCH_COMM_EVALUATION == "05I-C_VALIDATION":
    IF can_1_leakage_detected == "TRUE":
        VEHICLE_COMMISSIONING_APPROVAL = "HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW"
        SYSTEM_EXECUTION_MODE          = "SAFETY_CONFLATION_HALT"
    IF critical_message_latency_ms > approved_latency_limit_ms
       AND bus_utilization_percent <= approved_bus_load_target:
        SYSTEM_EXECUTION_MODE          = "BUS_LATENCY_RE-TUNING_REQUIRED"
```

`approved_latency_limit_ms` / `approved_bus_load_target` are variables, not
hard-coded 15.0 / 75.0 (RC-215). A CAN_1 leak reverts to the Gate 05I-A/05I-B
RCA recovery loop + a fresh bench run-cycle.

## Network topography / isolation boundary (owner review_46, RC-219)

**CAN_1 bench interface uses simulated OEM traffic or a protected bench
harness only — no live Ford vehicle network connection is allowed during
05I-C.** A physical isolation barrier cuts CAN_1; the VCU CAN_1 transceiver
is listen-only/silent. CAN_2 (VCU↔inverter) and CAN_3 (VCU↔BMS/PDU) are each
120 Ω-terminated; UDS/diagnostic + isolated EV display on their own lines.

---

## Gate 05I-C1 — Communication-integrity matrix (bench-only)

| Test | Domain | Fault / stimulus | Expected safe output | Blocked (MUST NEVER OCCUR) |
|---|---|---|---|---|
| 001 | CAN_1 active silent mode | active traffic on CAN_2/CAN_3 + diagnostics; scope on VCU CAN_1 TXD pin | **VCU CAN_1 does not transmit frames, assert TXD dominant, participate in ACK, or emit active error frames — verified by probing the VCU TXD/transceiver path (RC-216)** | any active transition on the VCU CAN_1 TXD pin / frame leakage / VCU ACK on CAN_1 |
| 002 | bus loading & error integrity | step CAN_2/CAN_3 to 50/75/90% (target) | critical frames within tolerance; no active error frames | bus-off / critical-ID frame drops / error-frame bursts (>1% target) |
| 003 | DBC schema & scale mismatch | inject out-of-range / wrong-offset / mismatched scale | VCU flags data-boundary fault; invalid frames discarded; state machine safe | acceptance of out-of-bounds scale / integer overflow / lockups or resets |
| 004 | frame-fault rejection (RC-217) | **physical/protocol faults** (bad CRC, bit-stuffing, bus error, DLC mismatch) rejected by the **CAN controller hardware before app parsing**; **application/data faults** (wrong ID, wrong source address, wrong DBC version, bad alive counter, bad app checksum, out-of-range decoded values) rejected by **app-layer validation** | bad frames ignored; fault counters increment; no crash/reset | processing bad-CRC/DLC frames / controller crash-reboot / incorrect state-machine jumps |
| 005 | loss-of-heartbeat timeout | sever CAN_2 / halt BMS stream | **VCU torque command transitions toward zero + sets comm-loss DTC after the configured heartbeat-loss target window (bench target 100 ms; final pending source review, RC-215)** | delayed safety action / holding last-known torque / unchecked run state |
| 006 | diagnostic routing & UDS | UDS 0x10/0x22/0x2E; PID cycle; security-access check | correct responses within target; unauthorized writes denied | unauthenticated calibration changes / diagnostic-induced lockup / interrupted comms |
| 008 | network-induced wakeup | voltage sags / IGN key-on / valid wakeup frames | comms resume; no frame corruption / initial latch faults | failure to wake on valid stimulus / unaligned init / spurious boot fault |

### DBC version control (owner review_46, RC-218)

Unified version-controlled DBC (`PROJECT_NAME_CAN_vX.Y.Z`); Motorola/Intel
endian alignment check; 0x5555/0xAAAA bit-pattern injection to confirm zero
byte-swap/bit-shift at the parser; scale-factor saturation limiters
(`Physical = Raw×Factor + Offset`, out-of-range trips a network-validation
DTC + zero-torque). **New:** the **DBC version hash/checksum is stored in the
Build Engine; the VCU firmware declares its expected DBC version; the bench
run logs the actual DBC version used by the test tools; a mismatch =
`BENCH_HARD_BLOCK_PENDING_REVIEW`** (prevents silent nonsense decoding when
the inverter/BMS DBC changes).

## Gate 05I-C2 — Sleep / Wake / Parasitic Drain

| Test | Stimulus | Expected safe output | Blocked |
|---|---|---|---|
| 007 | LV ignition sleep-state transition; inline ammeter | transceivers enter low-power standby; bus traffic halts; current to per-node + total-system targets (RC-215) | wakeup lockups / high sleep current (> target) / transceivers active on bus |
| — | key-off sleep entry, charger-plug/service-tool/fault-event wake, node sleep behaviour, stuck-awake detection, brownout recovery, total sleep-current measurement | orderly sleep/wake; measured drain within budget | **no unauthorized CAN_1 wake or transmit** |

---

## Owner corrections applied (review_46)

1. **Target-value labels (RC-215)** — all timings/percentages/currents are
   bench-target profiles; sleep current is per-node + total-system; the IF
   logic uses approved-limit variables.
2. **CAN_1 ACK proof (RC-216)** — probe the VCU TXD/transceiver path; other
   simulated OEM nodes may ACK, the VCU must not.
3. **Frame-fault layering (RC-217)** — bad CRC/DLC are controller-level;
   wrong-ID/source/DBC/counter/checksum/out-of-range are app-level.
4. **DBC version hash (RC-218)** — stored/declared/logged; mismatch hard-
   blocks.
5. **CAN_1 bench boundary (RC-219)** — simulated OEM / protected bench only;
   no live Ford network during 05I-C.

## Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + no leakage (TXD-line proof); a DBC is a
  database not a packet (RC-213); no timing/threshold/bus-load/current
  becomes a rule until controls review + supplier/DBC confirmation upgrades
  it; the VCU requests but does not own HV isolation (RC-205; BQ-27).
- **Nothing ingested; nothing Confirmed; Gate 05J / live vehicle
  commissioning NOT YET; ODRs untouched.**

## Next — Gate 05I-D (Low-Voltage End-to-End Bench Run / Integrated Fault Sequence)

Owner scope: test everything together as a **combined sequence** (not
isolated tests) — driver input · brake override · E-stop · HVIL open · BMS
no-discharge · inverter fault · CAN heartbeat loss · display warning ·
diagnostic lockout · sleep/wake recovery · CAN_1 silence. Bench-only; no
live HV, no vehicle motion, no Ford-bus transmission.
