# FAILURE-MODE + TEST-PROCEDURE REGISTRY (Gate 08)

The failure-mode / effects / test registry for the F-450/F-550 EV
conversion (Gate 08, batch_30 + owner review_27). Gate 08 asks: **what
can fail → how do we detect it → how does the system respond → how do we
test it → what proof is required → what blocks the build.**

**Status (owner review_28, v0.1): `FMEA_REGISTRY_CREATED` /
`TEST_SEQUENCE_MAPPED` / `SUPPLIER_DATA_REQUIRED` /
`NO_LIVE_HV_TESTING_APPROVED` / `NO_TRACK_TESTING_APPROVED` /
`NO_COMPLIANCE_CLAIMS`.** The FMEA registry is built and the test ladder
is mapped; **final validation has not started** and supplier thresholds +
source-backed procedures are still needed. Nothing here is Confirmed; no
compliance is claimed; no timing threshold is invented.

**Prerequisite:** Gate 07C must be at least `PHYSICAL_VERIFICATION_REQUIRED`
(scale + IVM CG review) before any track testing — Gate 08 references the
weight/CG checks in `AXLE_CG_CALCULATOR.md` as prerequisites, it does not
own them.

---

## Two safety-critical corrections (owner review_27)

1. **No invented timing thresholds (RC-116).** The batch's
   `IF HVIL_LOOP_INTERRUPT_TIMING > 200 → BLOCK` is a **fabricated 200 ms
   limit** with no standard/supplier/engineering source →
   **`HVIL_LOOP_INTERRUPT_TIMING_LIMIT = NeedsExactSource`.** FMVSS 305a
   is the EV HV-safety lane, but no numeric HVIL threshold may be derived
   from it without exact text / test mapping. All timing limits stay
   `NeedsExactSource` until a real source provides them.

2. **No live-HV fault testing (RC-117).** Manually opening a LV circuit
   at an inverter service plug, or forcing a total inverter shutdown on a
   moving vehicle, is **not an early physical step.** Testing is staged:
   - **Stage 1** — bench / HIL simulation with LV mock circuits.
   - **Stage 2** — controlled component-level test with HV disabled or an
     isolated test supply.
   - **Stage 3** — supervised integrated vehicle test **only after** an
     engineering safety plan, LOTO, PPE, defined test boundary, and an
     emergency-shutdown procedure are approved and signed off.
   **Simulation pass ≠ physical test pass; HIL pass ≠ road-test approval.**

**Brake/regen staging (RC-118):** simulation → HIL → dyno / wheel-lift
low-energy → closed-course low-speed → loaded test **only after brake-
engineer review**. FMVSS 105 is the brake-performance lane, but a brake
engineer / test plan is required before any result is said to satisfy it.

---

## FMEA row schema (owner review_27)

Every failure mode carries: **subsystem · failure event · cause · hazard
· detection method · system response · driver warning · test method
(simulation / HIL / bench / dyno / closed-course) · required proof
artifact · pass/block criteria · source · verification status · missing
supplier data.**

## Owner corrections applied to the registry (review_28)

- **Driver-warning messages are DRAFTS, not Ford-confirmed.** Every "…"
  dashboard message below is a **`DriverWarningCandidate /
  NeedsControlsIntegration`** — not a final warning (RC-121).
- **Isolation Riso thresholds are reference-only.** 100 Ω/V DC and
  500 Ω/V AC (FMVSS 305/305a context) are
  **`RegulatoryReferenceCandidate / NeedsSystemContext /
  NeedsSupplierBMSMapping`** — split by AC/DC/charge-inlet context, **not**
  one universal threshold (RC-122; consistent with the batch_10 500 Ω/V
  correction).
- **HVIL timing stays `NeedsExactTimingSource / NeedsSupplierFirmwareData`**
  — no number until a supplier/standard provides it (the 200 ms is
  fenced, RC-116).
- **FM-09 subsystem = Auxiliary HYDRAULIC Brake Assist**, not
  "pneumatic/hydraulic" — the F-450/F-550 hydroboost lane is hydraulic
  (RC-123).
- **FM-06 regen-loss response** = "friction braking remains available and
  the system removes regen torque **without destabilizing brake
  balance**" — NOT "seamless blend" (no blended-brake-controller claim,
  RC-124).
- **FMVSS 105 stays a test-mapping lane** — `FMVSS_105_TEST_MAPPING_REQUIRED
  / BrakeEngineerReviewRequired`, never "compliance satisfied" (RC-125).

## Registry (v0.1 — 15 modes populated; every row unverified)

*All rows are `NeedsSupplierData` / `NeedsExactTimingSource` /
`NeedsBrakeEngineerMapping` / `NeedsPhysicalVerification` as noted —
nothing Confirmed; no compliance claimed; all timing/threshold values are
`NeedsExactSource`.*

| # | Failure mode | Subsystem | Detection | System response (candidate) | Test ladder | Verification status |
|---|---|---|---|---|---|---|
| FM-01 | HVIL open / service disconnect | HV safety | VCU/BMS digital input transition | open contactors, log DTC, inhibit inverter | sim → HIL → bench (LOTO) | **NeedsExactTimingSource** (200 ms NOT a source) |
| FM-02 | Isolation-resistance fault | HV safety / isolation monitor | isolation monitor reading via CAN | log fault; stationary→block close; moving→controlled pull-over, prevent restart | sim → HIL (resistor injection) | **RegulatoryReferenceCandidate / NeedsSystemContext / NeedsSupplierBMSMapping** (100/500 Ω/V) |
| FM-03 | Contactor weld | HV distribution / contactors | voltage-differential check across plates | lock out reciprocal contactor, inhibit drive, latch fault | sim → HIL | **NeedsSupplierData** (differential window) |
| FM-04 | Pre-charge failure | HV distribution / inverter | pack-vs-inverter voltage comparison at startup | open pre-charge, keep mains open, abort power-up | sim → HIL bench | **NeedsSupplierData** (pre-charge duration curve) |
| FM-05 | Battery overcurrent | ESS / BMS | current-shunt telemetry to BMS | throttle torque map; open contactors above fuse curve | sim → HIL | **NeedsSupplierData** (transient overcurrent tables) |
| FM-06 | Inverter shutdown during regen | Drivetrain / braking | inverter heartbeat / torque-flag loss on CAN | zero regen torque; **friction braking remains available without destabilizing brake balance** | sim → HIL → dyno/wheel-lift | **NeedsBrakeEngineerMapping** |
| FM-07 | ABS/ESC × regen loss | Vehicle dynamics / chassis | ABS/ESC active flag on factory CAN | drop regen to zero, return slip authority to factory ABS | sim → HIL → dyno | **NeedsBrakeEngineerMapping** (proprietary ABS/ESC CAN IDs) |
| FM-08 | EHPS pump failure | Steering assist (EHPS) | LV current-loop drop / pressure switch | high-priority alarm; redundant pump if equipped | sim → bench pressure → low-speed closed-course (post review) | **NeedsPhysicalVerification** |
| FM-09 | Brake-assist pressure loss | **Auxiliary HYDRAULIC brake assist** (hydroboost) | fluid-pressure sensor on accumulator circuit | backup pressure source, limit top speed, log fault | sim → hydraulic bench accumulator test → low-energy low-speed track | **NeedsBrakeEngineerMapping** (FMVSS 105 test-mapping) |
| FM-10 | Steering-assist pressure loss | Steering | inline pressure transducer out-of-bounds | log fault, restrict accel/speed | sim → mechanical bench pressure-decay | **NeedsPhysicalVerification** |
| FM-11 | LV DC-DC brownout | Aux power / LV infrastructure | VCU monitors LV rail input | switch to LV buffer battery, shed loads, orderly stop | sim → LV load-shed bench | **NeedsSupplierData** (Ford module cut-off voltages) |
| FM-12 | Coolant-pump failure | Thermal / cooling | missing pump-speed feedback / current anomaly | derate torque, raise fan speed, reroute cooling | sim → component bench | **NeedsSupplierData** (pump fault codes / LIN telemetry) |
| FM-13 | Battery/inverter/motor overtemperature | Thermal / powertrain | internal thermistor arrays (NTC/PT100) | inverse-thermal derating, max cooling | sim → HIL thermal overrides | **NeedsSupplierData** (derating curves / max temps) |
| FM-14 | CAN communication loss | Controls / network | node heartbeat timeout counters | safe-state affected nodes, zero torque, open contactors once stopped | sim → HIL network-interrupt injection | **NeedsSupplierData** (timeout config per message group) |
| FM-15 | Water intrusion / IP seal failure | HV enclosures | enclosure moisture sensor / early isolation fault | block HV at startup; safe shutdown if isolation fault while driving | sim → **bench seal-leak test (zero live HV)** | **NeedsPhysicalVerification** (IP67/IP69K) |

**Regulatory mapping:** FM-01..05, FM-15 → FMVSS 305a (HV safety, no
invented numbers). FM-06..10 → FMVSS 105 (brake-engineer plan required;
test-mapping only).

## Regulatory lanes

- **FMVSS 305a** — EV high-voltage electrical safety (CS from batch_03).
  The HVIL/isolation/contactor rows map here — **no invented numbers**.
- **FMVSS 105** — hydraulic/electric brake performance (CS-49/CS-55).
  The regen/ABS/EHPS/brake rows map here — brake-engineer plan required.

## Pass / block logic (owner review_28)

```
BLOCK if:
  - a failure mode has no detection method
  - a failure mode has no defined system response
  - a failure mode has no driver-warning / service-indication candidate
  - a failure mode has no test method
  - a failure mode has no proof artifact
  - a test requires live HV but lacks LOTO / PPE / engineering signoff
  - a brake/steering fault lacks brake-engineer review
  - a regen/ABS interaction lacks simulation/HIL evidence before track testing

WARNING if:
  - response timing is unknown
  - a supplier threshold is missing
  - the proof artifact is simulated only
  - the driver warning is a draft concept only

ALLOW SIMULATION ONLY if:
  - supplier timing, thresholds, and CAN mappings are missing
```

## Hard rules (standing)

- Do not run or recommend live high-voltage tests.
- Do not mark anything Confirmed; do not claim compliance.
- **Do not invent timing thresholds** — all limits `NeedsExactSource`.
- Simulation pass ≠ physical pass; HIL pass ≠ road-test approval.
- Live HV testing requires LOTO, PPE, a test plan, emergency shutdown,
  and engineering signoff.
