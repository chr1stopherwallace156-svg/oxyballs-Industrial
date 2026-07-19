# HIL / BENCH TEST PROTOCOL (Gate 05H)

The proof-plan layer for the F-450/F-550 EV conversion controls (Gate 05H,
batch_42 + owner review_39). Gates 05F/05G defined the network boundary and
the failsafe matrix; Gate 05H defines **how to prove that behavior on a
bench — without a vehicle and without live high voltage**. Everything here
is a low-voltage HIL / bench protocol that *observes* behavior; it grants no
vehicle clearance and no timing gains physical authority from a bench run
alone.

**Status (owner review_39): `HIL_TEST_PROTOCOL_DRAFTED` /
`LOW_VOLTAGE_BENCH_ONLY` / `NO_LIVE_HV` / `NO_VEHICLE_TESTING` /
`NO_FACTORY_BUS_TRANSMISSION` / `TIMING_VALUES_SIMULATION_SWEEP_ONLY` /
`HIL_PROOF_ARTIFACTS_DEFINED` / `BENCH_EXECUTION_NOT_STARTED`.** Owner:
"strong first draft … the right Gate 05H direction."

---

## The HIL gate rule (kept)

```
IF logic_trace_captured == "FALSE" OR script_execution_status == "UNRUN":
    BENCH_INTEGRATION_APPROVAL = "BLOCKED"
    MONITOR_MODE               = "SIMULATION_SCRIPTS_ONLY"
```

## Timing + language doctrine (owner review_39) — read first

- **No HIL timing value is a limit (RC-180).** Every `10 ms / 20 ms / 50 ms
  / 100 ms / 2 ms / 3-cycle` number in the matrix and scripts is a
  `SimulationSweepOnly / SupplierDataPending` sweep window — the fourth
  recurrence of the invented-timing defect (cf. RC-116, RC-133, RC-169/173,
  RC-174). The bench **measures observed latency and compares against sweep
  windows only**; no final pass/fail authority until the inverter/VCU
  timing requirement is sourced.
- **"HIL result," never "PASS" (RC-181).** Scripts and rows report
  `[HIL_OBSERVED]` / `NEEDS_REVIEW` / `MODEL_STRESS_FAILURE`, never `PASS`;
  return `HIL_OBSERVED_NO_GATE_AUTHORITY`, never
  `VERIFICATION_STAGE_PASSED_SIM`.
- **Bench-only, simulated CAN_1 (RC-182).** Any CAN_1 fault-injection runs
  **only on simulated OEM nodes or bench-harness replicas — forbidden on a
  live Ford factory network.**
- **No "instant"/absolute hardware safe-state (RC-183).** Power-loss pin
  behavior is *measured*, not assumed; the safe state depends on the
  output-stage design.

---

## 1. HIL harness architecture + parameter controls

Real-time HIL simulator replicates physical signals through direct I/O and
comms so the VCU (DUT) is validated **without exposure to high voltage**:

- **CAN simulators** — CAN_1 (silent/listen-only), CAN_2 (inverter), CAN_3
  (BMS).
- **Analog/digital IO** — brake-switch sim, accel-pedal sim, HVIL
  continuity.
- **Fault-injection unit (FIU)** — inline relays, short-to-GND/VCC, bus
  open-circuits.

**Real-time simulator parameter controls (candidate sim ranges — not
vehicle limits):**

| Control | Candidate range / capability | Note |
|---|---|---|
| LV rail `V_sys` | 11.8–14.2 V programmable, slew ≥ 20 V/ms | simulate cranking drop + total LV loss |
| APPS (accel pedal) | dual-channel isolated 0–5 V, programmable channel skew | simulate tracking/plausibility errors |
| Brake switch | digital dry-contact relay | mimics unverified Ford UIM/factory discrete — listen-only candidate |
| HVIL loop continuity | closed-loop digital output → solid-state switch | simulate loop breaks; response time is a bench-measured value, not a rule |

## 2. Automated HIL fault-injection matrix

Headers per the owner: **HIL Observation Metric / Candidate Pass Criteria**
+ **Authority Status** (not "Pass Criteria Metric"). Every row is
`Build Engine status: HIL_BENCH_ONLY / NO_VEHICLE_CLEARANCE`, timing
`SupplierDataPending / SimulationSweepOnly`.

| Test ID | Target | Fault insertion | Expected VCU behaviour (directional) | HIL observation metric | Authority status |
|---|---|---|---|---|---|
| HIL-05G-001 | CAN_1 (Ford gateway, **simulated node / bench replica only — forbidden on live Ford bus**, RC-182) | FIU short CAN-H↔CAN-L (sweep duration) | error flags increment; **no transmit attempt, no line reset** | zero TX frames / zero ACK footprints on the sim OEM nodes | no gate authority; strongest proof = silent-mode register dump + no TX mailbox + no ACK + analyzer capture + oscilloscope no-dominant-bit |
| HIL-05G-002 | CAN_2 inverter loop silent | stop cyclic inverter heartbeat | torque request → 0 Nm; → FAULT_LATCHED | measured time from heartbeat loss to torque-zero frame vs sweep windows | timing SupplierDataPending / SimulationSweepOnly |
| HIL-05G-003 | CAN_3 BMS loop silent | drop BMS status/safety frames | emergency torque-zero; → FAULT_LATCHED; shutdown-request frame on CAN_3 | measured time to shutdown-request frame vs sweep windows | timing SupplierDataPending / SimulationSweepOnly |
| HIL-05G-004 | VCU main power (`V_SYS`) | FIU opens inline power relay | VCU unpowered; nodes terminate | **measure driver-output behaviour after power loss — safe state depends on output-stage design, pull-ups/downs, relay topology, hardware fail-safe (RC-183)** | timing + final state require bench proof |
| HIL-05G-005 | CAN_2 TX pin → GND (dominant) | short TX to GND at transceiver | transceiver dominant-timeout (DTO) isolates node | measured bus-lockup duration before auto-isolation vs sweep windows | timing TransceiverSupplierDataPending / SimulationSweepOnly |
| HIL-05G-006 | CAN_3 corrupted counter/checksum | inject inverted checksum + rolling-counter fault | **reject corrupted frame; safe-fallback only within a supplier-defined window, else soft torque-zero** (RC-177) | measured cycles-to-latch vs sweep threshold | latch threshold SimulationSweepOnly; no gate authority |

## 3. Cyclic performance / failsafe validation scripts

Illustrative HIL-automation pseudocode (Hunter-supplied, **not runnable
production code** — no firmware exists yet). Corrected to owner language:

- **Script A — listen-only silent-mode audit:** captures CAN_1 during
  state-machine sweeps; flags any TX / ACK footprint. On any transmit →
  `GATEWAY_DEPLOYMENT_BLOCKED`; on none → report
  `[HIL_OBSERVED] listen-only behaviour observed in this bench run` and
  return **`HIL_OBSERVED_NO_GATE_AUTHORITY`** (RC-181).
- **Script B — inverter heartbeat-timeout auto-zero tracking:** the timeout
  window is **configurable, not hardcoded** —
  `timeout_window_ms = hil.get_config("SIM_SWEEP_CAN2_TIMEOUT_MS")` — so it
  can sweep 20/50/100/250 ms without claiming any one is the real boundary;
  output `[HIL_OBSERVED] torque-zero observed in {latency} ms` +
  `[NO_GATE_AUTHORITY] timing threshold pending supplier/HIL requirement`
  (RC-180/181).

## 4. Per-HIL-run proof-artifact package (RC-184)

Every HIL run records: **HIL Run ID · firmware version · VCU hardware
revision · test-script version · test-bench wiring diagram · simulated-node
configuration · fault injected · raw CAN log · oscilloscope capture (if
relevant) · power-rail log · state-transition log · observed latency ·
expected response · result category (`HIL_OBSERVED / NEEDS_REVIEW /
MODEL_STRESS_FAILURE`) · authority status · engineer reviewer.** This makes
each bench run reusable evidence rather than a one-off print.

---

## Owner corrections applied (review_39)

1. **Timing downgraded (RC-180)** — matrix + scripts: sweep windows, not
   limits; header "Pass Criteria Metric" → "HIL Observation Metric /
   Candidate Pass Criteria" + Authority Status row.
2. **HIL-result language (RC-181)** — `[HIL_OBSERVED]` /
   `HIL_OBSERVED_NO_GATE_AUTHORITY`, never `[PASS]` /
   `VERIFICATION_STAGE_PASSED_SIM`.
3. **CAN_1 bench boundary (RC-182)** — simulated nodes / bench replicas
   only, forbidden on a live Ford network; five-part strongest proof.
4. **Power-loss safe-state measured, not assumed (RC-183)** — depends on
   hardware design; timing + final state require bench proof.
5. **Configurable script timeout + proof-artifact package (RC-184)** —
   Script B timeout from config; every run produces the artifact package.

## Standing checks

- Low-voltage bench only; no live HV; no vehicle testing; CAN_1 listen-only
  (simulated, proof required); no factory-bus transmission; no HIL timing
  becomes a gate limit until a source/HIL-approved requirement upgrades it;
  bench execution not started.
- **Nothing ingested; nothing Confirmed; no placeholder timing has gate
  authority; scripts are illustrative pseudocode, not production code; ODRs
  untouched.**

## Next — owner's call

The owner did not name a Gate 05I; expected next inputs are the owner's
next batch (a further Gate 05 proof step or the return to the Gate 06 deep
dive per the roadmap order 06 → 09 → 10 → 11), or a supplier reply / Gate
08B–08C reopen / Gate 07 field data. Queued in `GATE_RESEARCH_QUEUE.md`.
