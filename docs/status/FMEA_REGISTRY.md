# FAILURE-MODE + TEST-PROCEDURE REGISTRY (Gate 08)

The failure-mode / effects / test registry for the F-450/F-550 EV
conversion (Gate 08, batch_30 + owner review_27). Gate 08 asks: **what
can fail → how do we detect it → how does the system respond → how do we
test it → what proof is required → what blocks the build.**

**Status (owner review_27): `FMEA_FRAMEWORK_STARTED` /
`FAULT_TEST_PROCEDURES_REQUIRED` / `NO_LIVE_HV_TESTING_APPROVED` /
`NO_TRACK_TESTING_APPROVED` / `SUPPLIER_TIMING_LIMITS_REQUIRED`.** Gate 08
is **started, not open**. Nothing here is Confirmed; no compliance is
claimed; no timing threshold is invented.

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

## Registry (v0.1 — framework; example rows, all unverified)

*Seeded from the owner's example rows; the full 15-mode registry is the
next Gate 08 payload (prompt in `GATE_RESEARCH_QUEUE.md`). Every row is
`NeedsSupplierData` / `NeedsExactSource` / `NeedsPhysicalVerification`
until proven — nothing Confirmed.*

| # | Failure mode | Subsystem | Detection | System response | Test (staged) | Verification status |
|---|---|---|---|---|---|---|
| FM-01 | HVIL open / service disconnect | HV safety | BMS / VCU input change | open contactors, log fault, inhibit drive | HIL first → controlled integrated test | **NeedsSupplierData / NeedsExactTimingSource** (200 ms is NOT a source) |
| FM-02 | Regen unavailable during braking | Braking / controls | inverter torque-unavailable flag | friction brakes carry braking demand | sim → HIL → dyno → closed course | **NeedsBrakeEngineerMapping** |
| FM-03 | EHPS power loss | Brake/steering assist | pressure sensor / LV rail / pump fault | warning, reserve braking, controlled stop | bench pressure test + loaded low-speed steering test | **NeedsPhysicalVerification** |

**Next-payload coverage (owner's 15 modes):** HVIL open / service
disconnect; isolation-resistance fault; contactor weld; pre-charge
failure; battery overcurrent; inverter shutdown during regen; ABS/ESC
interaction with regen loss; EHPS pump failure; brake-assist pressure
loss; steering-assist pressure loss; LV DC-DC brownout; coolant-pump
failure; battery/inverter/motor overtemperature; CAN communication loss;
water intrusion / IP seal failure.

## Regulatory lanes

- **FMVSS 305a** — EV high-voltage electrical safety (CS from batch_03).
  The HVIL/isolation/contactor rows map here — **no invented numbers**.
- **FMVSS 105** — hydraulic/electric brake performance (CS-49/CS-55).
  The regen/ABS/EHPS/brake rows map here — brake-engineer plan required.

## Hard rules (standing)

- Do not run or recommend live high-voltage tests.
- Do not mark anything Confirmed; do not claim compliance.
- **Do not invent timing thresholds** — all limits `NeedsExactSource`.
- Simulation pass ≠ physical pass; HIL pass ≠ road-test approval.
- Live HV testing requires LOTO, PPE, a test plan, emergency shutdown,
  and engineering signoff.
