# Known Failure Record: TF-FAIL-001

| Field | Value |
|---|---|
| Failure ID | TF-FAIL-001 |
| Status | CORRECTED |
| Component | Coordinate Transform Registry |
| Discovered | 2026-07-16 |
| Regression guard added | Yes |

---

## 1. Issue Description

The quaternion `q_wxyz = [0.5, 0.5, 0.5, 0.5]` declared for `TF-ISO-TO-GLTF-ASSET` was mathematically inconsistent with the target rotation matrix:

```text
R =
[ 0, 1, 0 ]
[ 0, 0, 1 ]
[ 1, 0, 0 ]
```

Quaternion-based rotation engines would rotate incorrectly, producing axis orientation errors. The affine matrix itself was already correct.

---

## 2. Resolution

Corrected quaternion:

```text
q_wxyz = [-0.5, 0.5, 0.5, 0.5]
```

Equivalent dual:

```text
q_wxyz = [0.5, -0.5, -0.5, -0.5]
```

Registered in `registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json` edge version `2.0.0`. Offline quaternion-to-matrix check: PASS. Formal runner: NOT_EXECUTED.

---

## 3. Prevention Rule

Every transform added to the registry must pass quaternion-to-matrix equivalence checks within float64 precision limits before registration.

See: `TRANSFORM_QUATERNION_CORRECTION_REPORT.md`
