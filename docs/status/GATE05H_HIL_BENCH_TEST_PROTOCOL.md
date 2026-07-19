# HIL / BENCH TEST PROTOCOL (Gate 05H)

The proof-plan layer for the F-450/F-550 EV conversion controls (Gate 05H,
batch_42 → refined by batch_43 + owner review_40). Gates 05F/05G defined
the network boundary and the failsafe matrix; Gate 05H defines **how to
prove that behavior on a bench — without a vehicle and without live high
voltage**. This gate observes and records behavior; it grants no vehicle
clearance, no compliance authority, and no timing gains physical authority
from a bench run alone.

## Sub-gate split (owner review_40, RC-185)

A real VCU DUT + real transceivers + power supply + oscilloscope + FIU is
**bench/HIL evidence, not "simulation only."** Gate 05H therefore splits:

| Sub-gate | Scope | Status |
|---|---|---|
| **Gate 05H-A** | HIL protocol + script formulation (this document) | `SIMULATION_SCRIPT_DRAFT` |
| **Gate 05H-B** | low-voltage HIL bench execution with a real VCU | `HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE` (after a run) |
| **Gate 05I** | physical bench proof with production-like harness/components | `NOT STARTED` |

**Status (owner review_40 — Gate 05H-A): `HIL_TEST_PROTOCOL_DRAFTED` /
`LOW_VOLTAGE_HIL_ONLY` / `REAL_VCU_DUT_ALLOWED` / `NO_LIVE_HV` /
`NO_VEHICLE_TESTING` / `NO_FACTORY_BUS_TRANSMISSION` /
`TIMING_VALUES_NOT_GATE_AUTHORITY` / `ARTIFACT_PACKAGE_DEFINED` /
`BENCH_EXECUTION_PENDING`.** After a real run, Gate 05H-B reports
`HIL_RUN_OBSERVED / RAW_LOGS_CAPTURED / NO_VEHICLE_CLEARANCE /
READY_FOR_ENGINEERING_REVIEW`, and each run returns `HIL_OBSERVED_VALID /
NO_LIVE_HV / NO_VEHICLE_CLEARANCE / NO_COMPLIANCE_AUTHORITY` — never just
`SIMULATION_ONLY` or `PASS`. Owner: "the right Gate 05H direction."

---

## The HIL run rule (kept)

```
IF artifact_package_complete == "FALSE" OR result_category == "NEEDS_REVIEW":
    BENCH_INTEGRATION_APPROVAL = "BLOCKED"
    SYSTEM_EXECUTION_MODE      = "SIMULATION_RE-RUN_REQUIRED"
```

## Timing + language doctrine (owner review_39/40) — read first

- **No HIL timing value is a limit (RC-180/188).** Every `10/20/50/100/2 ms
  / 3-cycle` number is a sweep window carrying a **Timing Authority** label:
  `SimulationSweepOnly / SupplierDataPending / HILObservedOnly`. "We
  observed 42.17 ms under this bench setup" never becomes the official
  safety limit — fourth recurrence of the invented-timing defect (RC-116,
  RC-133, RC-169/173, RC-174).
- **Result categories, never "PASS" (RC-181/188).** Scripts/rows return
  `HIL_OBSERVED_VALID_NO_GATE_AUTHORITY` / `HIL_NEEDS_REVIEW_NO_GATE_
  AUTHORITY` / `MODEL_STRESS_FAILURE` (the last only if the script crashed
  or violated a hard bench safety rule), never `PASS` /
  `VERIFICATION_STAGE_PASSED_SIM`.
- **CAN_1 fault injection is bench-only (RC-182/187).** The CAN-H/CAN-L
  500 ms short is **forbidden on a live Ford factory network**; bench
  harness / simulated OEM nodes only.
- **Power-loss safe-state is measured, not assumed (RC-183).**

---

## 1. HIL harness architecture + parameter controls

Real-time HIL simulator replicates physical signals through direct I/O and
comms so the VCU (DUT) is validated **without exposure to high voltage**:
CAN simulators (CAN_1 silent, CAN_2 inverter, CAN_3 BMS); analog/digital IO
(brake-switch, accel-pedal, HVIL continuity); fault-injection unit (inline
relays, short-to-GND/VCC, bus open-circuits); VCU as DUT.

**LV simulator parameter controls — `TestBenchProfileCandidate /
NotFinalVehicleRequirement / NeedsComponentSpec` (owner review_40, RC-189):**

| Control | Candidate bench profile | Label |
|---|---|---|
| LV rail `V_sys` | 11.8–14.2 V programmable, slew ≥ 20 V/ms | TestBenchProfileCandidate — not a final vehicle requirement |
| APPS (accel pedal) | dual-channel isolated 0–5 V, programmable skew | TestBenchProfileCandidate / NeedsComponentSpec |
| Brake switch | digital dry-contact relay | listen-only candidate (unverified Ford UIM/factory discrete) |
| HVIL loop continuity | closed-loop digital output → solid-state switch | response time is a bench-measured value, not a rule |

## 2. Automated HIL fault-injection matrix

Headers: **VCU Observed Response / Baseline Target Metric / Timing
Authority** (not "Pass Criteria"). Every row is
`HIL_BENCH_ONLY / NO_VEHICLE_CLEARANCE`, timing
`SimulationSweepOnly / SupplierDataPending / HILObservedOnly`.

| Test ID | Target | Fault insertion | VCU observed response (record) | Timing authority |
|---|---|---|---|---|
| HIL-05G-001 | CAN_1 (**bench harness / simulated OEM nodes only — forbidden on a live Ford bus**, RC-187) | FIU short CAN-H↔CAN-L (sweep duration) | monitor register tracking + any transmit-attempt flag; verify zero frame leakage | HILObservedOnly; strongest proof via §3 TXD method |
| HIL-05G-002 | CAN_2 inverter loop silent | stop cyclic inverter heartbeat | record transition timing to updated internal state; torque payload change | SimulationSweepOnly / SupplierDataPending |
| HIL-05G-003 | CAN_3 BMS loop silent | drop BMS status/safety frames | record shutdown-request transmission profile vs configurable timeout | SimulationSweepOnly / SupplierDataPending |
| HIL-05G-004 | VCU main power (`V_SYS`) | FIU opens inline power relay | **measure driver-output behaviour after power loss — safe state depends on output-stage design / pull-ups-downs / relay topology / hardware fail-safe; timing + final state require bench proof** (RC-183) | bench proof required |
| HIL-05G-005 | CAN_2 TX pin → GND (dominant) | short TX to GND at transceiver | monitor transceiver dominant-timeout (DTO) footprint; record bus-recovery time after auto-isolation | TransceiverSupplierDataPending / HILObservedOnly |
| HIL-05G-006 | CAN_3 corrupted counter/checksum | inject inverted checksum + rolling-counter fault | record frame-rejection rate + state-transition timing vs corruption index | SimulationSweepOnly; latch threshold no gate authority |

## 3. Validation scripts + the ACK / listen-only proof (owner review_40, RC-186)

Illustrative HIL-automation pseudocode (Hunter-supplied, **not runnable
production code** — no firmware exists yet):

- **Script A — multi-layer silent-mode audit:** register dump
  (`LISTEN_ONLY_MODE` bit) + zero TX-mailbox allocation + protocol-analyzer
  log + **oscilloscope dominant-edge trigger on the VCU TX/TXD line**.
  Returns `MODEL_STRESS_FAILURE` on any register mismatch / TX / dominant
  edge, else `HIL_OBSERVED_VALID_NO_GATE_AUTHORITY`.
- **Script B — configurable inverter-timeout tracking:**
  `timeout_threshold_ms` is a parameter (monitors 2× the window); reports
  measured latency; returns `HIL_NEEDS_REVIEW_NO_GATE_AUTHORITY` when the
  observed latency exceeds the configured sweep threshold, else
  `HIL_OBSERVED_VALID_NO_GATE_AUTHORITY`.

**Tighter ACK proof (RC-186):** a shared-slot CAN analyzer cannot prove
*which* node asserted the ACK. Truly-silent CAN_1 proof therefore requires
**all** of: CAN_1 controller register dump (listen-only/silent) · zero TX
mailbox allocation · TX pin disabled / disconnected / hardware-gated ·
**oscilloscope probe on the VCU TX pin / transceiver TXD line** · a
controlled bench bus with known ACK-capable nodes · analyzer log showing no
VCU-originated frames. The proof criterion is **"VCU_TXD line remains
inactive during the ACK slot and all frame periods,"** not the decoded
`f.is_ack_asserted` flag.

## 4. Per-HIL-run proof-artifact dossier (RC-184)

Every run compiles + signs: **HIL Run ID · firmware version · VCU hardware
revision · test-script version · bench wiring-diagram ref · simulated-node
config · fault injected · raw CAN log · oscilloscope capture · power-rail
log · state-transition log · observed latency · expected response · result
category (`HIL_OBSERVED_VALID / NEEDS_REVIEW / MODEL_STRESS_FAILURE`) ·
authority status (`SIMULATION_RESTRICTED_PENDING_BENCH_PROOF`) · engineer
reviewer.** This turns each run into reusable evidence.

---

## Owner corrections applied (review_40)

1. **Sub-gate split (RC-185)** — 05H-A simulation-script draft / 05H-B
   low-voltage HIL bench observation (real VCU) / 05I physical bench proof;
   runs return `HIL_OBSERVED_VALID / NO_LIVE_HV / NO_VEHICLE_CLEARANCE /
   NO_COMPLIANCE_AUTHORITY`.
2. **Tighter ACK/listen-only proof (RC-186)** — watch the VCU TX/TXD line,
   not just the decoded CAN log.
3. **CAN_1 short test bench-only hard warning (RC-187)** — forbidden on a
   live Ford network.
4. **Timing Authority field (RC-188)** — every timing carries
   SimulationSweepOnly / SupplierDataPending / HILObservedOnly; scripts
   return `…_NO_GATE_AUTHORITY`.
5. **Bench-profile labels (RC-189)** — LV rail / slew / APPS profiles are
   `TestBenchProfileCandidate / NotFinalVehicleRequirement /
   NeedsComponentSpec`.

## Standing checks

- Low-voltage HIL only; real VCU DUT allowed but no live HV, no vehicle, no
  compliance authority; CAN_1 listen-only (bench/simulated, TXD-line proof
  required); no factory-bus transmission; no HIL timing becomes a gate
  limit until a source/HIL-approved requirement upgrades it; bench
  execution pending.
- **Nothing ingested; nothing Confirmed; no placeholder timing has gate
  authority; scripts are illustrative pseudocode, not production code; ODRs
  untouched.**

## Next — Gate 05I (Physical Bench Proof)

Physical bench proof with production-like wiring / harness / components
(status NOT STARTED). Runs only after Gate 05H-B HIL bench observation +
engineering review; still no vehicle and no live HV without a staged safety
plan + LOTO/PPE (RC-117).
