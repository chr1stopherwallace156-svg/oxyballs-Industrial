# GLTF_FRAME_CORRECTION.md — Official glTF 2.0 Asset Coordinate Convention

## Status

**ACTIVE — Corrects prior GLTF_RUNTIME_FRAME conflation with WebGL camera space**

This document separates the official glTF 2.0 **asset** coordinate convention from runtime viewing frames (Three.js). Implementation parsers must use `TF-ISO-TO-GLTF-ASSET` from `registries/TRANSFORM_REGISTRY_V3_PROPOSAL.json`.

---

## 1. Official glTF 2.0 Asset Coordinate Convention

Under the official glTF 2.0 specification, the asset coordinate system is a right-handed system where:

| Axis | Direction |
|---|---|
| Up | Positive Y (+Y) |
| Forward | Positive Z (+Z) |
| Right | Negative X (-X) — meaning Positive X (+X) points Left |

This is the canonical coordinate space in which 3D assets must be authored, packaged, and stored. It is distinct from runtime-specific camera-facing orientation matrices (which often treat -Z as forward to align with standard viewing projections).

**Frame ID:** `GLTF_ASSET_FRAME`

---

## 2. ISO 8855 to glTF Asset Frame Derivation

Canonical engineering frame: `EDTS_ISO_ALIGNED_VEHICLE_FRAME`

| ISO direction | Unit vector |
|---|---|
| Forward (longitudinal) | +X_iso = [1, 0, 0] |
| Left (lateral) | +Y_iso = [0, 1, 0] |
| Up (vertical) | +Z_iso = [0, 0, 1] |

### Basis mapping

| ISO basis | glTF Asset direction | glTF unit vector |
|---|---|---|
| Forward [1, 0, 0] | Forward (+Z) | [0, 0, 1] |
| Left [0, 1, 0] | Left (+X) | [1, 0, 0] |
| Up [0, 0, 1] | Up (+Y) | [0, 1, 0] |

### Rotation matrix R

```text
R =
[ 0.0, 1.0, 0.0 ]
[ 0.0, 0.0, 1.0 ]
[ 1.0, 0.0, 0.0 ]
```

**Determinant:** +1 (handedness preserved: right-handed to right-handed).

**Basis tests:**

```text
R * [1, 0, 0]^T = [0, 0, 1]^T   (forward)
R * [0, 1, 0]^T = [1, 0, 0]^T   (left)
R * [0, 0, 1]^T = [0, 1, 0]^T   (up)
```

### Unit scaling (millimeters to meters)

```text
input_unit = UNIT-MM
output_unit = UNIT-M
scale_factor = 0.001
```

### Complete affine matrix M_ISO_TO_GLTF_ASSET

```text
[ 0.000, 0.001, 0.000, 0.000 ]
[ 0.000, 0.000, 0.001, 0.000 ]
[ 0.001, 0.000, 0.000, 0.000 ]
[ 0.000, 0.000, 0.000, 1.000 ]
```

### Quaternion (WXYZ)

Corresponds to 120-degree rotation about normalized axis [1/sqrt(3), 1/sqrt(3), 1/sqrt(3)]:

```text
q = [0.5, 0.5, 0.5, 0.5]
```

### Known test point

```text
input_iso_mm = [1000.0, 500.0, 200.0]
output_gltf_m = [0.5, 0.2, 1.0]
```

---

## 3. Deprecation of Prior Mapping

The prior `GLTF_RUNTIME_FRAME` / `TF-ISO-TO-GLTF` mapping in `TRANSFORM_REGISTRY_V2_PROPOSAL.json` incorrectly used -Z as glTF asset forward (WebGL camera convention). That mapping is retained only as `TF-ISO-TO-THREE-SCENE` for Three.js viewing space.

| Prior ID | Disposition |
|---|---|
| `GLTF_RUNTIME_FRAME` | Superseded by `GLTF_ASSET_FRAME` + `THREE_SCENE_FRAME` |
| `TF-ISO-TO-GLTF` (v2) | Do not use for asset export; use `TF-ISO-TO-GLTF-ASSET` |

See also: `THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md`
