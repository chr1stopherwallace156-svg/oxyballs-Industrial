# FORMULA_AND_SYMBOL_STANDARD.md — Mathematical Presentation Standard

## Status

**ACTIVE — Required for all EDTS mathematical expressions**

This standard establishes strict mathematical presentation requirements across the Entire Vehicle Digital Twin System (EDTS). It guarantees that all formulas, tolerances, coordinates, and matrix transforms remain fully copyable, searchable, and machine-readable for downstream automation, system integration, and software development.

---

## 1. The Core Mandate

No mathematical expression is complete in EDTS until it has:

1. A copyable plain-text form
2. Defined variables
3. Explicit units (from `registries/UNIT_REGISTRY.json`)
4. A complete written explanation
5. An engineering purpose

All mathematical outputs must strictly follow the schema structure defined in Section 2.

---

## 2. Output Template Structure

Every formula, inequality, or complex engineering relationship must be declared using the following sequential block structure:

### [Formula Name]

**Copyable Formula**

```text
[Plain-text formula using standard ASCII / keyboard characters]
```

**Read in Words**

> [Complete plain-language reading of the formula, translating all symbols to text.]

**Engineering Meaning**

[What the relationship means, why it matters operationally, and its engineering justification.]

**Variables**

- [Variable_1] = [Definition of variable], measured in [Specific Unit ID or Dimension]
- [Variable_2] = [Definition of variable], measured in [Specific Unit ID or Dimension]

**Acceptable Range or Result**

[Explicitly describe the resulting range, boundary conditions, or decision threshold.]

**EDTS Application**

[Explain where this formula is applied in the codebase, database schema, or physical validation gate.]

**Machine-Readable Form**

```json
{
  "formula_id": "FORMULA-ID-HEX-OR-INC",
  "expression": "Plain text copyable string",
  "variables": {
    "Variable_1": "unit_registry_id"
  }
}
```

**Mathematical Display Version (Optional)**

[LaTeX or formatted display may appear here only when accompanied by all required sections above. LaTeX alone is never sufficient.]

---

## 3. Symbol Translation and Spelling Rules

Mathematical symbols must never be left raw without a text-based spelling equivalent. Translate symbols as follows:

| Symbol | Plain-language equivalent |
|---|---|
| `>` | greater than |
| `<` | less than |
| `>=` | greater than or equal to |
| `<=` | less than or equal to |
| `+/-` | plus or minus |
| `Δ` | change in, or difference between |
| `Σ` | sum of |
| `≈` | approximately equal to |
| `=` | equals |
| `!=` | does not equal |

---

## 4. Tolerances, Intervals, and Temperature Formatting

Tolerances must never be written in shorthand without spelling out the bounding limits.

### Linear Tolerances

**Incorrect:** `+/- 0.5 mm` (standalone, without context)

**Correct plain-text form:**

```text
Tolerance: +/- 0.5 mm
```

**Correct read in words:**

> The permitted deviation is plus or minus zero point five millimeters. For a nominal value represented as X, the minimum acceptable value is X minus 0.5 mm and the maximum acceptable value is X plus 0.5 mm.

### Thermal Tolerances

**Incorrect:** `20°C +/- 3°C`

**Correct plain-text form:**

```text
nominal_temperature = 20 degC
temperature_tolerance = +/- 3 degC
acceptable_temperature_range = 17 degC to 23 degC
```

**Correct read in words:**

> The nominal temperature is twenty degrees Celsius, with an allowable deviation of plus or minus three degrees Celsius. This establishes an acceptable temperature range from seventeen degrees Celsius through twenty-three degrees Celsius.

---

## 5. EDTS Registry References

| Registry | Path | Use |
|---|---|---|
| Unit vocabulary | `registries/UNIT_REGISTRY.json` | All variable unit IDs |
| Coordinate frames | `registries/COORDINATE_FRAME_REGISTRY.json` | Spatial variable definitions |
| Frame transforms | `registries/TRANSFORM_REGISTRY.json` | Matrix transform expressions |
| Claim schema | `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json` | Machine-readable claim validation |

---

## 6. Compliance

Documents containing formulas (including `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md`, `DATUM_CONSTRUCTION_STANDARD.md`, `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`) must conform to this template for all new and revised formula blocks.
