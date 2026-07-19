# DRAFT VALIDATION ENGINE (Gate 08C)

The simulation-only draft-validation layer for the FMEA registry (Gate
08C, batch_33 + owner review_30). It lets the Build Engine build the
*logic* before supplier data exists — but **placeholder values have no
gate authority**. "You do not need supplier data to build the logic; you
need supplier data to approve the logic" (owner).

**Status (owner review_31): `DRAFT_VALIDATION_STARTED` /
`SIMULATION_SWEEP_ACTIVE` / `PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY` /
`SUPPLIER_THRESHOLDS_REQUIRED` / `NO_PHYSICAL_TEST_CLEARANCE` /
`NO_COMPLIANCE_CLAIMS`.** Cannot become `FINAL_VALIDATED` until supplier
data + exact standards + physical tests + engineering signoff are added.

---

## The core rule (owner review_30) — RC-133

A placeholder / nominal value **cannot create a PASS or BLOCK**. It runs a
**simulation sweep** only:

```
IF parameter_source == "NominalEngineeringAssumption":
    OUTPUT              = "ASSUMPTION_STRESS_RESULT_ONLY"
    GATE_AUTHORITY      = "NONE"
    PHYSICAL_TEST_CLEARANCE = "BLOCKED"
```

**Simulation Response Category (owner review_31 — RC-138)** — use these,
NOT PASS/BLOCK and NOT "stable/unstable" (which still reads as engineering
approval): **`Model Accepts` · `Model Needs Review` · `Model Stress
Failure` · `Supplier Data Required`**, each carrying `No Gate Authority`.
So a sweep point reports e.g. **"[100 ms]: Model Stress Failure / No Gate
Authority"**, never "unstable" or "PASS/BLOCK." Reserve `PASS` / `BLOCK`
for `SupplierConfirmed` or `PhysicallyVerified` values only.

**Corrected execution logic (owner):**

```
IF EXECUTION_MODE in ["SIMULATION_RUN", "HIL_SCRIPT_DRAFT"]:
    ALLOW_EXECUTION = TRUE
    OUTPUT_MARKER   = "SimulationOnly - No Gate Authority"

IF VALUE_STATUS in ["NominalEngineeringAssumption", "SourcePending", "SupplierDataPending"]:
    ALLOW_PASS_BLOCK    = FALSE
    ALLOW_SWEEP_ANALYSIS = TRUE

IF EXECUTION_MODE in ["PHYSICAL_TEST_RUN", "COMPLIANCE_CLAIM", "CUSTOMER_APPROVAL"]:
    IF VALUE_STATUS != "SupplierConfirmed" AND VALUE_STATUS != "PhysicallyVerified":
        FORCE_STATUS = "BLOCK"
```

## Parameter field format (owner review_30) — RC-134

Each placeholder is a **sweep input**, not a threshold:

```
<PARAM>:
  Default_Stress_Value: null
  Exploratory_Test_Values: [ ... ]      # e.g. [10 ms, 20 ms, 50 ms, 100 ms]
  Status: NominalEngineeringAssumption | SourcePending | SupplierDataPending
  Allowed Use: simulation sweep / HIL draft sensitivity
  Blocked Use: final pass/fail / physical test approval / compliance claim
  Authority: none
  Upgrade Required: <supplier spec or measured/verified artifact>
```

## Sweep registry (15 modes — exploratory values only, no authority)

*The Hunter's single "PASS if ≤ X" numbers are recorded here **only** as
exploratory sweep points; none is a boundary. Every row is
NominalEngineeringAssumption / SourcePending / SupplierDataPending.*

| FM | Sweep parameter | Exploratory values (no authority) | Upgrade requirement |
|---|---|---|---|
| FM-01 HVIL open | loop→contactor delay | 10 / 20 / 50 / 100 ms | signed oscilloscope trace (BMS/inverter firmware authority) |
| FM-02 Isolation fault | detect→fault-bit window | 1 / 2 / 5 s | certified isolation-monitor datasheet |
| FM-03 Contactor weld | terminal voltage-delta margin | 2 / 5 / 12 V | supplier PDU/BDU engineering spec |
| FM-04 Pre-charge failure | pre-charge timeout | 200 / 500 / 1000 ms | power-electronics spec (DC-link + resistor thermal) |
| FM-05 Battery overcurrent | peak current / duration | 450 A / 10 s (and sweep) | lab cell current-vs-time maps |
| FM-06 Inverter shutdown / regen | regen torque decay | 2 / 5 / 20 Nm·ms⁻¹ | inverter application manual |
| FM-07 ABS/ESC × regen | torque-dump latency | 5 / 15 / 40 ms | co-engineered Ford upfitter messaging logs |
| FM-08 EHPS pump failure | manual-steer effort | 25 / 40 / 60 Nm | signed steering-box lab report |
| FM-09 Brake-assist loss | min fluid volume | 20 / 35 / 50 cc | stamped hydraulic upfitter drawings |
| FM-10 Steering-assist loss | min line pressure | 150 / 300 / 500 psi | component supplier calibration sheet |
| FM-11 LV DC-DC brownout | MCU drop voltage | 7.5 / 9.0 / 10.5 V | Ford module silicon spec |
| FM-12 Coolant-pump failure | fault window | 1 / 3 / 10 s | pump firmware LIN docs |
| FM-13 Overtemperature | derate slope | 2 / 5 / 15 A·°C⁻¹ | traction-package thermal maps |
| FM-14 CAN loss | node timeout | 50 / 100 / 250 ms | network safety-interface spec |
| FM-15 Water/IP seal | vacuum decay rate | 0.5 / 2 / 5 mbar·min⁻¹ | seal lab validation + IP correlation (RC-131) |

Each mode keeps its **proof-artifact template** (simulation log / trace /
curve) from the FMEA registry — marked `SimulationOnly - No Gate
Authority` — and its **Data-Level-Upgrade Requirement** (the supplier /
measured artifact that turns a sweep input into a `SupplierConfirmed` or
`PhysicallyVerified` value with real authority).

## Hard rules

- Placeholder value → **sweep behavior only**, never a pass/block.
- No physical/road/dyno/HV test clearance; no compliance claim; no
  customer approval from nominal values.
- Upgrade path: `NominalEngineeringAssumption → SupplierConfirmed /
  PhysicallyVerified` before any PASS/BLOCK or physical clearance.
