# Known Failure Record: TF-FAIL-001

| Field | Value |
|---|---|
| Failure ID | TF-FAIL-001 |
| Failure Status | CORRECTED_IN_SPECIFICATION |
| Regression Guard | SPECIFIED |
| Executable Verification | PENDING |
| Component | Coordinate Transform Registry |
| Discovered | 2026-07-16 |

---

## 1. Issue Description

The quaternion `q_wxyz = [0.5, 0.5, 0.5, 0.5]` declared for `TF-ISO-TO-GLTF-ASSET` was mathematically inconsistent with the target rotation matrix:

```text
R = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 0]
]
```

### Derivation Error Trace (Archived)

Incorrect candidate assessed during development:

```text
Assuming w=0.5, x=0.5, y=0.5, z=0.5:
R_01 = 2*(x*y - w*z) = 2*(0.25 - 0.25) = 0.0
```

This failed to produce the target element `R_01 = 1.0`, resulting in a cyclic permutation error during transformation.

---

## 2. Correction

Registry updated to:

```text
q_wxyz = [-0.5, 0.5, 0.5, 0.5]
```

Manual substitution into the Hamilton quaternion-to-matrix formula produces the target matrix. Executable regression testing remains pending.

See: `TRANSFORM_QUATERNION_CORRECTION_REPORT.md`
