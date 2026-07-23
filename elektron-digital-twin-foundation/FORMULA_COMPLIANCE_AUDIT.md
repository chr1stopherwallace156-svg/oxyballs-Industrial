# FORMULA_COMPLIANCE_AUDIT.md — Formula Representation Audit

## Status

**COMPLETE AND ENFORCED**

This document traces the audit and correction of mathematical representations across Layer 0 documents to align them with [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

---

## Violation Register

| Location of Violation | Description of Math Error | Correction Action Taken |
|---|---|---|
| `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md` | Displayed clearance inequality in non-compliant format; incomplete variable block relative to six-part template. | Converted to full compliance blocks in `CLEARANCE_STANDARD_V2_PROPOSAL.md`. Original file superseded. |
| `DATUM_CONSTRUCTION_STANDARD.md` | Used un-templated physical tolerance criteria as raw markdown prose. | Isolated all tolerance expressions into copyable plain-text declarations per formula standard. |
| `registries/TRANSFORM_REGISTRY.json` | glTF quaternion inconsistent with rotation matrix; Unreal scale factor 100.0 (incorrect mm-to-cm). | Superseded by `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json` with derived matrices and `TRANSFORM_VALIDATION_REPORT.md`. |

---

## Enforcement

- All new formulas must appear in `registries/FORMULA_REGISTRY.json` or be added there upon approval.
- Coordinate transforms must pass `registries/COORDINATE_BASIS_TESTS.json` before use in implementation parsers.
- Agents must reference `TRANSFORM_REGISTRY_V2_PROPOSAL.json`, not the deprecated v1 registry.

---

## Related Artifacts

| Artifact | Path |
|---|---|
| Formula registry | `registries/FORMULA_REGISTRY.json` |
| Transform validation | `TRANSFORM_VALIDATION_REPORT.md` |
| Transform registry v2 | `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json` |
| Basis tests | `registries/COORDINATE_BASIS_TESTS.json` |
| Clearance standard v2 | `CLEARANCE_STANDARD_V2_PROPOSAL.md` |
