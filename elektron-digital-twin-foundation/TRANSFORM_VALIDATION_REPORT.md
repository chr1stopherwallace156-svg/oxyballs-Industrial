# TRANSFORM_VALIDATION_REPORT.md — Spatial Transform Derivation

## Status

**ACTIVE — Validates `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json`**

This report derives machine-readable spatial transforms from first principles and tests each using basis vectors. Automated parsers must use the v2 registry and pass `registries/COORDINATE_BASIS_TESTS.json`.

---

## 1. Reference Coordinate Frame (ISO 8855)

Canonical engineering frame: `EDTS_ISO_ALIGNED_VEHICLE_FRAME` (right-handed).

| Direction | Unit vector |
|---|---|
| Forward (longitudinal) | [1, 0, 0] |
| Left (lateral) | [0, 1, 0] |
| Up (vertical) | [0, 0, 1] |

**Target systems:**

| Frame | Handedness | Axes |
|---|---|---|
| glTF / Three.js | Right-handed | +X Right, +Y Up, -Z Forward |
| Unreal Engine | Left-handed | +X Forward, +Y Right, +Z Up |

---

## 2. ISO to glTF Transformation

### Basis mapping

| ISO basis | glTF direction | glTF unit vector |
|---|---|---|
| Forward [1, 0, 0] | Forward (-Z) | [0, 0, -1] |
| Left [0, 1, 0] | Left (-X) | [-1, 0, 0] |
| Up [0, 0, 1] | Up (+Y) | [0, 1, 0] |

### Rotation matrix R (3x3)

```text
R = [  0, -1,  0 ]
    [  0,  0,  1 ]
    [ -1,  0,  0 ]
```

**Basis tests:**

```text
R * [1, 0, 0]^T = [0, 0, -1]^T   (forward)
R * [0, 1, 0]^T = [-1, 0, 0]^T  (left)
R * [0, 0, 1]^T = [0, 1, 0]^T   (up)
```

Determinant = +1 (orthogonal rotation; right-handed preserved).

### Quaternion (WXYZ ordering)

```text
q = [0.5, -0.5, 0.5, 0.5]
```

Equivalent to 120-degree rotation about normalized axis [-0.577, 0.577, 0.577].

### Scale correction

```text
input_unit = UNIT-MM
output_unit = UNIT-M
scale_factor = 0.001
```

### Combined affine matrix M_gltf = R * S

```text
[  0.0, -0.001,  0.0,  0.0 ]
[  0.0,  0.0,   0.001, 0.0 ]
[ -0.001, 0.0,   0.0,  0.0 ]
[  0.0,  0.0,   0.0,  1.0 ]
```

---

## 3. ISO to Unreal Transformation

### Basis mapping

| ISO basis | Unreal direction | Unreal unit vector |
|---|---|---|
| Forward [1, 0, 0] | Forward (+X) | [1, 0, 0] |
| Left [0, 1, 0] | Left (-Y) | [0, -1, 0] |
| Up [0, 0, 1] | Up (+Z) | [0, 0, 1] |

### Reflection matrix R (3x3)

```text
R = [ 1,  0,  0 ]
    [ 0, -1,  0 ]
    [ 0,  0,  1 ]
```

Determinant = -1 (reflection; correct for RHS to LHS conversion).

### Quaternion note

Handedness change cannot be represented by a pure 3D rotation quaternion alone. Y-axis reflection is applied via `scale_reflection_vector: [0.1, -0.1, 0.1]`.

```text
q_rotation = [1.0, 0.0, 0.0, 0.0]  (identity rotation component)
```

### Scale correction

```text
input_unit = UNIT-MM
output_unit = UNIT-CM
scale_factor = 0.1
```

**Previous error:** scale_factor = 100.0 was incorrect (would inflate geometry by 100x).

### Combined affine matrix M_unreal = R * S

```text
[ 0.1,  0.0,  0.0, 0.0 ]
[ 0.0, -0.1,  0.0, 0.0 ]
[ 0.0,  0.0,  0.1, 0.0 ]
[ 0.0,  0.0,  0.0, 1.0 ]
```

**Known test point:** [1000, 500, 200] mm ISO → [100.0, -50.0, 20.0] cm Unreal.

---

## 4. Deprecated Registry

`registries/TRANSFORM_REGISTRY.json` (v1) contained blocking errors and must not be used by implementation parsers. Use `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json`.
