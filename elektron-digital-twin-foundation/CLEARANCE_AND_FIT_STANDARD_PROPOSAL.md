# CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md — Packaging Separation Rules

## Status

**PROPOSAL**

This proposal defines the safety envelope and separation rule for vehicle packaging and interference checks. It ensures that measurement uncertainties and assembly variances are mechanically accounted for during layout design.

All formulas in this document conform to [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

---

## Structural Packaging Separation Rule

### Minimum Clearance Envelope

**Copyable Formula**

```text
C_min >= U_meas + V_mfg + M_dyn + M_thermal + S_safety
```

**Read in Words**

> The minimum clearance envelope C_min must be greater than or equal to the sum of the combined measurement uncertainty U_meas, the combined manufacturing tolerance limit V_mfg, the dynamic operational movement allowance M_dyn, the thermal expansion displacement allowance M_thermal, and the absolute engineering safety margin S_safety.

**Engineering Meaning**

This rule ensures that packaging clearances account for measurement error, manufacturing variation, dynamic deflection, thermal expansion, and an explicit safety margin. Without this sum, interference checks would accept nominally sufficient gaps that fail under real operating conditions.

**Variables**

- C_min = minimum required clearance between two mechanical components, measured in UNIT-MM
- U_meas = combined measurement uncertainty derived from Measurement Conformance Class, measured in UNIT-MM
- V_mfg = combined manufacturing tolerance limit from CAD nominal drawings, measured in UNIT-MM
- M_dyn = dynamic operational movement allowance under peak structural load, measured in UNIT-MM
- M_thermal = thermal expansion displacement allowance, measured in UNIT-MM
- S_safety = absolute engineering safety margin, measured in UNIT-MM

**Acceptable Range or Result**

C_min must be strictly positive and must meet or exceed the tabulated target values in the envelope allowances table below for each interface condition.

**EDTS Application**

Applied in L02 chassis packaging reviews, L03 OEM mechanical clearance checks, and L07 wiring/cooling routing validation. Referenced by `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md` in the README required reading order.

**Machine-Readable Form**

```json
{
  "formula_id": "FORMULA-CLEARANCE-MIN-001",
  "expression": "C_min >= U_meas + V_mfg + M_dyn + M_thermal + S_safety",
  "variables": {
    "C_min": "UNIT-MM",
    "U_meas": "UNIT-MM",
    "V_mfg": "UNIT-MM",
    "M_dyn": "UNIT-MM",
    "M_thermal": "UNIT-MM",
    "S_safety": "UNIT-MM"
  }
}
```

---

## Envelope Allowances by Subsystem Interface

| Interface Condition | U_meas (Combined) | V_mfg (Combined) | M_dyn | M_thermal | S_safety | C_min (Target) |
|---|---|---|---|---|---|---|
| Exhaust Piping to Wiring Harness | +/- 3.0 mm (Class C) | +/- 1.5 mm | 20.0 mm (Engine Rock) | 8.0 mm (600 degC rise) | 15.0 mm | 47.5 mm |
| Tire Outer Envelope to Inner Fender | +/- 3.0 mm (Class C) | +/- 5.0 mm (Tire swell) | 50.0 mm (Full bump/steer) | 0.0 mm | 25.0 mm | 83.0 mm |
| Driveshaft to Midship Fuel Tank | +/- 1.5 mm (Class B) | +/- 2.0 mm | 15.0 mm (Axle wrap) | 1.0 mm | 10.0 mm | 29.5 mm |

Conformance classes are defined in `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`.

---

## Related Documents

- `FORMULA_AND_SYMBOL_STANDARD.md` — formula presentation template
- `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md` — Class A through Class D targets
- `registries/UNIT_REGISTRY.json` — controlled unit vocabulary
