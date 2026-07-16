# L00_RUNTIME_READINESS_REPORT.md — Runtime Frame and Schema Readiness

## Status

**ACTIVE**

---

## 1. Detailed System Audit Summary

| Item | Result |
|---|---|
| Official glTF axis mapping | Derived and locked to +Y up, +Z forward, -X right. Separated from WebGL viewing space. |
| Three.js viewing frame | ISO vectors map to -Z forward scene space without reflection (determinant +1). |
| Plain-text formula enforcement | LaTeX-only notation eliminated from governance files; copyable strings required. |
| Conditional schema protections | `PHYSICAL_ASSET_INTAKE_SCHEMA_V3_PROPOSAL.json` handles VIN omission states and six DRW tire pressures. |

---

## 2. Transform Registry Authority

| Registry | Status |
|---|---|
| `TRANSFORM_REGISTRY.json` (v1) | REJECTED_DO_NOT_USE |
| `TRANSFORM_REGISTRY_V2_PROPOSAL.json` | SUPERSEDED — conflated glTF asset with Three.js scene |
| `TRANSFORM_REGISTRY_V3_PROPOSAL.json` | **AUTHORITATIVE PROPOSAL** |
| `COORDINATE_BASIS_TESTS_V2.json` | **ACTIVE TEST MATRIX** |

---

## 3. Readiness Determination

```
                 [ L00_VISUAL_INTAKE_ONLY_READY ]
```

Visual-reference intake may proceed under `VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md`. Engineering metrology intake remains provisional for Layer 2. L00 closure remains REJECTED until physical evidence gates are satisfied.

---

## 4. Related Artifacts

- `GLTF_FRAME_CORRECTION.md`
- `THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md`
- `FULL_FORMULA_COMPLIANCE_REPORT.md`
- `schemas/tests/` — claim schema fixtures
