# AXLE MOMENT + CG CALCULATOR (Gate 07C)

The axle-moment and center-of-gravity calculation framework for the
F-450/F-550 EV conversion (Gate 07C, batch_28/29 + owner review_25/26).
This is a **calculator architecture for simulation only** — not a verified
CG system and **not a compliance determination**. Nothing here is
Confirmed; no result may be read as "the vehicle is safe."

**Park status (owner review_26, v0.4):** `CALCULATOR_FRAMEWORK_READY` /
`PHYSICAL_DATA_REQUIRED` / `NO_ROAD_TEST_CLEARANCE`. The equations are
ready for simulation; road-test clearance stays blocked (see the release
gate in `MASS_LEDGER.md`, RC-106) until physical scale data + IVM CG
review land.

> **Recurrence note (review_26):** the batch_29 payload re-used
> `Final_Safety_Compliance_Status` / `OPERATIONAL_ALPHA` and the naive
> `IF CG_v > Max_Allowable_Height → BLOCK`, both corrected one batch
> earlier (review_25). This document keeps the corrected forms — honest
> labels (§ status) and the IVM Min/Max CGv check (§5). Second/third
> corrected-claim recurrences on the same items; regression-scanner
> candidates.

**Status labels (owner review_25 — honest naming):**

- The gate output field is **`Weight_CG_Gate_Status`** (NOT
  "Final_Safety_Compliance_Status").
- A passing simulation is **`NOMINAL_CALCULATION_PASS /
  PHYSICAL_VERIFICATION_REQUIRED`** (NOT "OPERATIONAL_ALPHA"). The Build
  Engine must never claim compliance.

**Platform branches (D-006):** `Platform_001A_73L_Gas` (active) vs
`Platform_001B_67L_Diesel`. Select the branch that matches the actual
donor before any calculation.

---

## 1. Allowed equations (simulation only)

Wheel loads: `LF, RF, LR, RR` (left/right front, left/right rear).

```
Total weight:            W   = LF + RF + LR + RR
Front axle:              F   = LF + RF
Rear axle:               R   = LR + RR
Longitudinal CG          CGh = (R × WB) / W        (distance rearward from front axle CL)
  (from front axle)

Component axle transfer:
  Rear-axle share:       ΔR  = (w × x) / WB        (x = distance from front axle)
  Front-axle share:      ΔF  = w − ΔR
  Removed mass:          use negative w

Transverse CG            CGt = [(RF − LF) × Tf/2 + (RR − LR) × Tr/2] / W
  (sign convention: right = +, left = −)
  Tf = front track width; Tr = rear track width.
  DRW rear track is measured to the CENTER of the dual-wheel pair (Ford BBLB).
```

These longitudinal/transverse equations (RC-107/108) are **allowed for
simulation**. Ford General BBLB (CS-07) defines F = LF+RF, R = LR+RR, and
transverse CG from four-corner weights + track widths.

## 2. Vertical CG — BLOCKED (RC-109)

The rear-axle-lift method is **NOT hard-coded**. Ford's General BBLB notes
vertical-CG calculation is complicated by suspension compliance and points
to a physical CG-height test procedure in the Transit BEMM / BBAS
materials, performed by a **certified test facility or qualified
technician**.

- The batch's "raise the rear axle a minimum of 10 in" is a **candidate
  test setup, not a final rule**.
- `CGv` stays **`BlockedPendingOfficialMethod / NeedsPhysicalTest`** until
  an approved CG-height procedure is obtained and a physical test is run.
- Interim only: a `NominalAssumption` bare-chassis `CGv` (~22–24 in per
  BBLB standard models, BQ-16) may be used to keep simulation moving —
  never as a verified value.

## 3. Data-entry fields

**Required inputs:** `DONOR_PLATFORM_SELECTION`; `FACTORY_VEHICLE_RATINGS`
(door-label GVWR, Front_GAWR, Rear_GAWR, Max_Tire_Load, Max_Wheel_Load);
`VEHICLE_DIMENSIONAL_BASELINES` (WB, Front_Track, Rear_Track_DRW_Center);
`FOUR_CORNER_LEVEL_SCALE_VALUES` (LF/RF/LR/RR level);
`FOUR_CORNER_RAISED_SCALE_VALUES` (LF/RF raised + Rear_Axle_Lift_Height —
**only via an approved procedure**); `OPERATING_STATE_MASS_ELEMENTS`
(upfit body wt+CG, battery pack wt+CG, coolant-full mass, LV buffer wt).

**Blocked / computed-only fields:** `Calculated_Total_EV_Curb_Weight`
(= Σ four corners); `Weight_CG_Gate_Status` (engine-controlled, never
hand-edited).

## 4. Nominal assumptions (placeholders, not values)

- **`FMVSS_105_LIGHTLY_LOADED_ALLOWANCE` = 500 lb** for >10,000 lb GVWR
  vehicles (unloaded weight + 500 lb incl. driver + instrumentation).
  **RegulatoryTestInput / NeedsVehicleCategoryMapping** (RC-111) — this is
  the FMVSS-105 *lightly-loaded test* reference, **NOT** a universal fleet
  payload.
- `FLEET_OPERATING_PAYLOAD_TARGET` ≈ 2,500 lb — a layout placeholder until
  a specific upfit body is selected (separate from the 500 lb allowance).
- **Removed-ICE mass placeholders (NominalAssumption):**
  - **001A gas:** 7.3L V8 engine dry ≈ 540 lb; exhaust + single converter
    ≈ 65 lb.
  - **001B diesel:** 6.7L Power Stroke wet ≈ 1,100 lb; DPF/SCR ≈ 180 lb;
    filled DEF system ≈ 70 lb.
  (Mirrored in `MASS_LEDGER.md`; all replaced by physical weighing.)

## 5. Pass / block logic (owner review_25)

```
Gate 07C — Weight / Axle Load / CG    →  Weight_CG_Gate_Status

BLOCK if:
  - W (Σ four corners) > GVWR
  - F (LF+RF) > Front_GAWR
  - R (LR+RR) > Rear_GAWR
  - max(LF,RF,LR,RR) > Max_Tire/Wheel_Load_Rating
  - door-label data missing
  - final scale ticket missing before road test
  - IVM CGv equations required but missing
  - CGv outside IVM allowed range (if equations exist)

WARNING if:
  - side-to-side imbalance |CGt| > 5% of max(Tf, Tr)  (or |(LF+LR)−(RF+RR)|/W > 5%)
  - front steering-axle % drops below the engineering target
  - battery/enclosure CG is still NominalAssumption
  - only axle data exists (four-corner data unavailable)
  - diesel/gas donor branch does not match the actual donor vehicle (D-006)

ALLOW SIMULATION ONLY if:
  - all values are estimates
  - no scale ticket exists
  - vertical CG is approximated
  - using generic (non-measured) track widths (RC-113)
  → Weight_CG_Gate_Status = NOMINAL_CALCULATION_PASS /
                            PHYSICAL_VERIFICATION_REQUIRED
```

### Vertical-CG check — IVM equations, not a single threshold (RC-110)

```
IF IVM_CGv_MinMax_Equations_Available:
    Min_CGv = f_min(CGh, WB)       # Ford IVM statement-of-conformity
    Max_CGv = f_max(CGh, WB)       # FMVSS-105-related, per loading condition
    IF CGv < Min_CGv OR CGv > Max_CGv → BLOCK / ENGINEERING_REVIEW
ELSE:
    Weight_CG_Gate_Status = NEEDS_IVM_OR_ENGINEERING_REVIEW
```

Do **not** use one generic `Factory_Maximum_Allowable_Height_Threshold` —
the Ford IVM Min/Max CGv equations are a *compliance check* as a function
of horizontal CG and wheelbase, not a general vehicle CG target.

## 6. Physical verification steps

1. Confirm the active software branch matches the real donor (001A gas vs
   001B diesel).
2. Four-corner baseline weigh-in (LF/RF/LR/RR) at full unladen curb.
3. Post-teardown: weigh every removed assembly on a certified scale; clear
   the NominalAssumption placeholders.
4. Integration: weigh all HV enclosures, motors, aux cooling, mounting
   plates before install.
5. Vertical-CG profiling **only via an approved CG-height procedure**
   (Transit BEMM/BBAS), certified facility / qualified technician.

## 7. Still blocked

Actual donor door label; wheelbase + track measurements; baseline
four-corner scale ticket; final four-corner scale ticket; official IVM
CGv limits/equations; vertical-CG physical test; final battery-enclosure
CG (X/Y/Z). Supplier-preferred items: `BLOCKED_QUESTIONS_LEDGER.md`
(BQ-16/BQ-17). The road-test release gate lives in `MASS_LEDGER.md`
(RC-106).

**Honest outcome (owner):** axle-moment calculator = ready for simulation;
CG pass/fail logic = partially mapped; vertical CG = blocked pending
official method or physical test; road-test clearance = blocked pending
scale tickets + IVM CG review.
