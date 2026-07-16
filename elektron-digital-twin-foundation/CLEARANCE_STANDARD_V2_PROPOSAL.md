# CLEARANCE_STANDARD_V2_PROPOSAL.md — Worst-Case Clearance Envelope Rules

## Status

**PROPOSAL — Supersedes `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md`**

All formulas conform to [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md). Machine-readable entries: `registries/FORMULA_REGISTRY.json`.

---

## Worst-Case Clearance Envelope Rule

### Required Clearance Envelope (CLR-001)

**Copyable Formula**

```text
C_required = U_meas + V_mfg + M_dyn + M_thermal + S_safety
```

**Read in Words**

> The total required clearance envelope equals the sum of the combined physical measurement uncertainty, the expected manufacturing variation, the maximum operational dynamic movement, the maximum calculated thermal expansion displacement, and the specified engineering safety margin.

**Engineering Meaning**

To prevent destructive interference between component interfaces, a worst-case clearance envelope is constructed. This calculation ensures that even if all factors combine in their least-favorable directions, mechanical contact is avoided. This rule is a foundational parameter for vehicle packaging.

**Variables**

- C_required = total required protection envelope clearance boundary, measured in UNIT-MM
- U_meas = combined dimensional measurement uncertainty of the instrumentation class, measured in UNIT-MM
- V_mfg = maximum manufacturing drawing tolerance variation of the components, measured in UNIT-MM
- M_dyn = maximum dynamic operational displacement (suspension, steering, chassis flex), measured in UNIT-MM
- M_thermal = thermal expansion movement of the assembly, measured in UNIT-MM
- S_safety = additional project design safety factor margin, measured in UNIT-MM

**Acceptable Range or Result**

C_required must be a positive real limit. The computed value defines the spatial keep-out zone around a component.

**EDTS Application**

Integrated into automated design clearance checkers inside the CAD environment and the digital twin collision mesh validators.

**Machine-Readable Form**

```json
{
  "formula_id": "CLR-001",
  "expression": "C_required = U_meas + V_mfg + M_dyn + M_thermal + S_safety",
  "variables": {
    "C_required": "UNIT-MM",
    "U_meas": "UNIT-MM",
    "V_mfg": "UNIT-MM",
    "M_dyn": "UNIT-MM",
    "M_thermal": "UNIT-MM",
    "S_safety": "UNIT-MM"
  }
}
```

---

## Design Acceptance Clearance Condition (CLR-002)

**Copyable Formula**

```text
C_available > C_required
```

**Read in Words**

> The actual measured or modeled available clearance between two components must be strictly greater than the calculated required clearance envelope.

**Engineering Meaning**

This condition is the pass-fail validation rule for any spatial layout within the digital twin. If this condition is met, the layout is certified; if not, it is rejected.

**Variables**

- C_available = minimum physical distance measured between the two components, measured in UNIT-MM
- C_required = calculated required clearance envelope, measured in UNIT-MM

**Acceptable Range or Result**

Binary check: true (valid assembly layout) or false (interference hazard detected).

**EDTS Application**

Executed by the clearance engine of the digital twin during design changes.

**Machine-Readable Form**

```json
{
  "formula_id": "CLR-002",
  "expression": "C_available > C_required",
  "variables": {
    "C_available": "UNIT-MM",
    "C_required": "UNIT-MM"
  }
}
```

---

## Subsystem Keep-Out Allowances (Reference Values Only)

> **Status:** EXAMPLE_ONLY | NOT_APPROVED_FOR_DESIGN | RESEARCH_REQUIRED
>
> These values represent nominal approximations. Dynamic displacement must be refined through kinematic simulation, suspension testing, and physical thermal logging.

| Interface Condition | U_meas (Class) | V_mfg | M_dyn | M_thermal | S_safety | C_required (Total) |
|---|---|---|---|---|---|---|
| Exhaust to Wire Harness | +/- 3.0 mm (Class C) | +/- 1.5 mm | 20.0 mm | 8.0 mm | 15.0 mm | 47.5 mm |
| Tire Outer to Fender | +/- 3.0 mm (Class C) | +/- 5.0 mm | 50.0 mm | 0.0 mm | 25.0 mm | 83.0 mm |
| Driveshaft to Fuel Tank | +/- 1.5 mm (Class B) | +/- 2.0 mm | 15.0 mm | 1.0 mm | 10.0 mm | 29.5 mm |

---

## Superseded

- `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md` — superseded by this document
