# TRANSFORM_QUATERNION_CORRECTION_REPORT.md — Specification Verification

## Status

**SPECIFICATION VERIFIED — Executable regression PENDING**

Incorrect historical derivation traces are archived only in `verification/known_failures/TF-FAIL-001_QUATERNION_MATRIX_MISMATCH.md`.

---

## 1. Scope

Documents specification-level verification of the coordinate transformation between `EDTS_ISO_ALIGNED_VEHICLE_FRAME` and `GLTF_ASSET_FRAME`.

---

## 2. Mathematical Definition

Target orthogonal rotation matrix maps:

```text
ISO Forward [1, 0, 0]^T -> glTF Asset Forward [0, 0, 1]^T (+Z)
ISO Left    [0, 1, 0]^T -> glTF Asset Left    [1, 0, 0]^T (+X)
ISO Up      [0, 0, 1]^T -> glTF Asset Up      [0, 1, 0]^T (+Y)
```

### Plain-Text Representation of Matrix (Authoritative)

```text
R_ISO_TO_GLTF = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 0, 0]
]
```

### LaTeX Presentation (Optional, Non-Authoritative)

```text
R_ISO_TO_GLTF = [[0, 1, 0], [0, 0, 1], [1, 0, 0]]
```

---

## 3. Correct Quaternion Representations (WXYZ)

### Plain-Text (Authoritative)

```text
q_wxyz = [-0.5, 0.5, 0.5, 0.5]
q_wxyz_alternate = [0.5, -0.5, -0.5, -0.5]
```

### LaTeX Presentation (Optional)

```text
q_wxyz = [-0.5, 0.5, 0.5, 0.5]
q_wxyz_alternate = [0.5, -0.5, -0.5, -0.5]
```

---

## 4. Quaternion-to-Matrix Verification

Let `q = [w, x, y, z] = [-0.5, 0.5, 0.5, 0.5]`.

### Plain-Text Formula (Authoritative)

```text
R_00 = 1 - 2*(y^2 + z^2)
R_01 = 2*(x*y - w*z)
R_02 = 2*(x*z + w*y)
R_10 = 2*(x*y + w*z)
R_11 = 1 - 2*(x^2 + z^2)
R_12 = 2*(y*z - w*x)
R_20 = 2*(x*z - w*y)
R_21 = 2*(y*z + w*x)
R_22 = 1 - 2*(x^2 + y^2)
```

### Substitution Step

```text
w = -0.5, x = 0.5, y = 0.5, z = 0.5

R_00 = 1 - 2*(0.25 + 0.25) = 0.0
R_01 = 2*(0.25 - (-0.25))  = 1.0
R_02 = 2*(0.25 + (-0.25))  = 0.0
R_10 = 2*(0.25 + (-0.25))  = 0.0
R_11 = 1 - 2*(0.25 + 0.25) = 0.0
R_12 = 2*(0.25 - (-0.25))  = 1.0
R_20 = 2*(0.25 - (-0.25))  = 1.0
R_21 = 2*(0.25 + (-0.25))  = 0.0
R_22 = 1 - 2*(0.25 + 0.25) = 0.0
```

This produces the target matrix. Mathematical relationship verified at specification level. Executable regression testing remains pending.
