# LOW-VOLTAGE HIL VALIDATION PROTOCOL (Gate 05H)

The bench-proof layer for the F-450/F-550 EV conversion controls (Gate 05H,
batch_42 → 43 → refined by batch_44 + owner review_41). Gates 05F/05G
defined the network boundary and the failsafe matrix; Gate 05H defines how
to prove that behavior on a **low-voltage bench with the real VCU as the
Device Under Test (DUT)** — real transceivers, a physical fault-injection
unit (FIU), and calibrated lab instruments. This is genuine low-voltage
HIL / bench evidence, **not** vehicle-level control authority, live-HV
approval, road-test approval, or compliance proof.

## Sub-gate split (owner review_40/41, RC-185)

| Sub-gate | Scope | Status |
|---|---|---|
| **Gate 05H-A** | HIL protocol + script formulation (this document) | `SIMULATION_SCRIPT_DRAFT` → protocol created |
| **Gate 05H-B** | low-voltage HIL bench execution with a real VCU | after a run: `HIL_RUN_OBSERVED / RAW_LOGS_CAPTURED / ARTIFACT_PACKAGE_COMPLETE / ENGINEERING_REVIEW_PENDING / NO_VEHICLE_CLEARANCE` |
| **Gate 05I** | production-like **low-voltage** bench integration (RC-196) | `NOT STARTED` |

**Status (owner review_41 — Gate 05H): `HIL_VALIDATION_PROTOCOL_CREATED` /
`REAL_VCU_DUT_ALLOWED` / `LOW_VOLTAGE_HIL_ONLY` /
`PHYSICAL_TRANSCEIVER_EVIDENCE_REQUIRED` / `CAN_1_LISTEN_ONLY_PROOF_REQUIRED`
/ `NO_LIVE_HV` / `NO_REAL_VEHICLE_NETWORK` / `NO_VEHICLE_TESTING` /
`NO_COMPLIANCE_AUTHORITY` / `PENDING_ENGINEERING_REVIEW`.** Owner: "the best
Gate 05H version so far … bench evidence path opened, no vehicle authority
yet."

---

## Evidence boundary (owner review_41, RC-190) — read first

> Timing limits, thresholds, and electrical behaviors **measured** here
> constitute real low-voltage HIL / bench evidence **for this DUT, firmware
> version, harness, and simulated-node setup**. They **do not** become
> vehicle-level control authority, live-HV approval, road-test approval, or
> compliance proof without engineering review, supplier confirmation where
> required, and later physical bench / vehicle gates.

## Result categories (owner review_41, RC-191)

- `HIL_OBSERVED_VALID_NO_VEHICLE_AUTHORITY` — behavior observed on this
  bench setup; **not** vehicle approval.
- `HIL_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` — e.g. measured latency exceeded
  the configured (sweep) threshold.
- `HIL_HARD_BLOCK` — a dangerous bench violation: **CAN_1 TXD activity
  detected** or **factory-bus transmit leakage**.
- `HIL_INVALID_RUN` — missing/incomplete artifact package.

## The HIL run rule (kept)

```
IF artifact_package_complete == "FALSE" OR result_category == "NEEDS_REVIEW":
    BENCH_INTEGRATION_APPROVAL = "BLOCKED"
    SYSTEM_EXECUTION_MODE      = "HARDWARE_RE-RUN_REQUIRED"
```

## Timing doctrine (kept, RC-180/188)

Every timing (`10/20/50/100/2 ms`, 3-cycle, DTO window) is a
`SimulationSweepOnly / SupplierDataPending / HILObservedOnly` value with a
**Timing Authority** label — "we measured 42.17 ms under this bench setup"
never becomes the official safety limit (invented-timing family
RC-116/133/169/174/180).

---

## Mandatory Gate 05H pre-test safety checklist (owner review_41, RC-195)

Before **any** 05H run:

- [ ] No live HV connected
- [ ] No real battery pack connected
- [ ] No real contactor coil connected unless explicitly part of the
      low-voltage bench test
- [ ] Current-limited power supply active
- [ ] Bench E-stop available
- [ ] Fused DUT supply
- [ ] Test-bench wiring reviewed
- [ ] Firmware hash recorded
- [ ] CAN_1 connected only to simulated / bench OEM nodes
- [ ] Raw logging enabled **before** fault injection

## 1. Physical HIL harness + boundary controls

Real-time HIL engine interfaces the VCU's physical pins across a **physical
voltage & signal boundary**: CAN simulators (CAN_1 silent, CAN_2 inverter,
CAN_3 BMS); analog/digital IO (brake-switch, accel-pedal, HVIL continuity);
FIU (inline relays, protected short-to-GND/VCC, bus open-circuits); real
VCU as DUT.

**LV control profiles — `TARGET_BENCH_PROFILE` /
`TestBenchProfileCandidate / NotFinalVehicleRequirement / NeedsComponentSpec`
(RC-189):** LV rail 11.8–14.2 V + ≥20 V/ms slew; APPS 0–5 V dual-channel
skew; brake-switch 12 V dry-contact; HVIL solid-state continuity break.

## 2. Physical fault-injection & measurement matrix

Headers: **VCU Hardware Observed Response / Physical Verification Metric /
Timing Authority**. Every row is bench-only, `NO_VEHICLE_CLEARANCE`, timing
`SimulationSweepOnly / SupplierDataPending / HILObservedOnly`.

| Test ID | Target | Fault insertion | Observed response (record) | Bench-safety rule |
|---|---|---|---|---|
| HIL-05G-001 | CAN_1 (Ford gateway) | FIU hard differential short CAN-H↔CAN-L (sweep duration) | register exception logs + driver survival; zero frame leakage / retry | **bench-only: protected HIL harness, simulated OEM nodes, current-limited equipment, replaceable/protected transceivers; forbidden on a live Ford network or customer vehicle (RC-192)** |
| HIL-05G-002 | CAN_2 inverter loop silent | stop cyclic inverter heartbeat | measure state-migration time + line reaction; torque payload change | timing SimulationSweepOnly / HILObservedOnly |
| HIL-05G-003 | CAN_3 BMS loop silent | terminate BMS status/safety frames | record shutdown-frame structure + rate; vs configurable timeout | timing SimulationSweepOnly / HILObservedOnly |
| HIL-05G-004 | VCU main power (`V_SYS`) | FIU opens inline power relay at DUT pins | **measure driver-output behaviour after power loss — safe state depends on output-stage design / pull-ups-downs / relay topology / hardware fail-safe; timing + final state require bench proof (RC-183)** | current-limited supply, fused DUT |
| HIL-05G-005 | CAN_2 TX physical layer | **FIU injects a controlled stuck-dominant / stuck-TXD fault through a protected fault-injection path approved for the transceiver circuit** (RC-193) | monitor transceiver dominant-timeout (DTO) footprint; record bus-recovery window | **direct destructive shorting of MCU/transceiver pins forbidden unless the bench fixture is designed for that fault mode** |
| HIL-05G-006 | CAN_3 corrupted counter/checksum | inject inverted checksum + rolling-counter fault | measure frame-rejection rate + state-transition timing vs corruption index | latch threshold no gate authority |

## 3. Validation scripts + the ACK / TXD-line listen-only proof (RC-186)

Illustrative HIL-automation pseudocode (Hunter-supplied, **not runnable
production code**):

- **Script A — multi-layer silent-mode audit:** register dump
  (`LISTEN_ONLY_MODE`) + zero TX-mailbox allocation + protocol-analyzer
  leakage check + **oscilloscope probe on the physical VCU TXD line**
  (falling-edge/dominant-bit trigger). Criterion: **"VCU_TXD line remains
  inactive during the ACK slot and all frame periods,"** not the decoded
  `f.is_ack_asserted` flag. Any TXD activity → `HIL_HARD_BLOCK`; else
  `HIL_OBSERVED_VALID_NO_VEHICLE_AUTHORITY`.
- **Script B — configurable inverter-timeout tracking:**
  `timeout_threshold_ms` parameter; reports measured latency; returns
  `HIL_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` when latency exceeds the
  configured sweep threshold, else `HIL_OBSERVED_VALID_NO_VEHICLE_AUTHORITY`.

## 4. Per-HIL-run proof-artifact dossier (RC-184 + calibration, RC-194)

Every run compiles + signs: **HIL Run ID · firmware version · VCU hardware
revision · test-script version · bench wiring-diagram ref · simulated-node
config · fault injected · raw CAN log · oscilloscope capture · VCU TXD-pin
scope log · power-rail log · state-transition log · configured threshold ·
measured latency · expected response · result category · authority status
(`PENDING_CONTROLS_SIGN_OFF`) · engineer reviewer** — **plus instrument
calibration records (RC-194): oscilloscope serial/cal date · CAN-analyzer
serial/firmware · programmable-supply serial/cal date · FIU hardware
revision.**

---

## Owner corrections applied (review_41)

1. **Evidence boundary (RC-190)** — HIL results are DUT/firmware/harness-
   scoped bench evidence, not vehicle/live-HV/compliance authority.
2. **Stricter result categories (RC-191)** —
   `…_NO_VEHICLE_AUTHORITY` / `HIL_HARD_BLOCK` / `HIL_INVALID_RUN`.
3. **CAN short bench-only hard rule (RC-192)** — protected harness,
   simulated OEM nodes, current-limited; forbidden on a live Ford network /
   customer vehicle.
4. **Non-destructive TX fault (RC-193)** — controlled stuck-dominant/TXD
   fault through a protected path; no destructive pin shorting unless the
   fixture is designed for it.
5. **Calibration records (RC-194)** + **mandatory pre-test safety checklist
   (RC-195)**.
6. **Gate 05I defined low-voltage (RC-196)** — see below.

## Standing checks

- Low-voltage HIL only; real VCU DUT allowed but no live HV, no real
  vehicle network, no vehicle testing, no compliance authority; CAN_1
  listen-only (bench/simulated, TXD-line proof); destructive fault
  injection only on a fixture designed for it; no HIL timing becomes a gate
  limit until engineering review / supplier confirmation upgrades it.
- **Nothing ingested; nothing Confirmed; no placeholder timing has gate
  authority; scripts are illustrative pseudocode, not production code; ODRs
  untouched.**

## Next — Gate 05I (production-like LOW-VOLTAGE bench integration)

Gate 05I must **not** jump to live HV or vehicle testing (RC-196).
It means production-like **low-voltage** bench integration: real harness,
real VCU, real or supplier-representative BMS/PDU controller, real inverter
controller if possible — with **no traction-battery HV, no vehicle road
testing, no Ford factory bus transmission**. Runs only after Gate 05H-B HIL
bench observation + engineering review; still no live HV without a staged
safety plan + LOTO/PPE (RC-117).
