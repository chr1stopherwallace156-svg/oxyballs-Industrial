# FORMULA_STANDARD_V2_PROPOSAL.md — Formula Representation Rules V2

## Status

**PROPOSAL — Extends FORMULA_AND_SYMBOL_STANDARD.md**

Balances technical rigor with runtime safety. Plain-text remains authoritative.

---

## 1. Syntax Rules

1. **Plain-text representation (mandatory and authoritative):** All mathematical expressions must use standard ASCII and programming-language operator patterns (`*`, `/`, `+`, `-`, `>`, `>=`, etc.).
2. **Written explanation (mandatory):** Every formula must include a clear plain-language explanation of its purpose.
3. **Variable and unit mapping (mandatory):** Every variable must be defined with physical units from the unit registry.
4. **LaTeX presentation (optional and non-authoritative):** LaTeX may be included for rendering only; it must not be the sole representation.
5. **Image-only representation (prohibited):** Math equations must never be provided solely as images.

---

## 2. Example Compliance Block

### Force Calculation Rule

**Plain-Text Formula:**

```text
F = m * a
```

**Written Meaning:** Force equals mass multiplied by acceleration.

**Variables:**

- `F` = calculated force, measured in UNIT-N (newtons)
- `m` = system mass, measured in UNIT-KG
- `a` = system acceleration, measured in meters per second squared

**LaTeX (Optional, Non-Authoritative):**

```text
F = m · a
```

---

## 3. Relationship to V1

`FORMULA_AND_SYMBOL_STANDARD.md` remains required for the six-part engineering formula template. This V2 proposal clarifies that plain-text is authoritative and LaTeX is optional decoration only.
