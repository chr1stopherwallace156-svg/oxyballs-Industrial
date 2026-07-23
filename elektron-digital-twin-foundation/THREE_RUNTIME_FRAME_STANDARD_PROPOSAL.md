# THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md — Three.js WebGL Runtime Frame

## Status

**PROPOSAL**

Separates Three.js scene viewing space from the official glTF 2.0 asset frame. See `GLTF_FRAME_CORRECTION.md` for asset export. Use `TF-ISO-TO-THREE-SCENE` from `registries/TRANSFORM_REGISTRY_V3_PROPOSAL.json` for WebGL root-node placement.

---

## 1. Three.js WebGL Runtime Frame

In many interactive WebGL environments, the camera looks down the negative Z-axis (-Z) by default. Consequently, runtime engines like Three.js project a virtual space where:

| Axis | Direction |
|---|---|
| Up | Positive Y (+Y_three) |
| Forward | Negative Z (-Z_three) |
| Right | Positive X (+X_three) — meaning Left is -X_three |

**Frame ID:** `THREE_SCENE_FRAME`

Passing a raw `GLTF_ASSET_FRAME` into this scene without a corrective root-node transformation results in the vehicle facing backward relative to the default viewing camera.

---

## 2. ISO to Three.js Scene Frame Derivation

### Basis mapping

| ISO basis | Three.js direction | Three.js unit vector |
|---|---|---|
| Forward [1, 0, 0] | Forward (-Z) | [0, 0, -1] |
| Left [0, 1, 0] | Left (-X) | [-1, 0, 0] |
| Up [0, 0, 1] | Up (+Y) | [0, 1, 0] |

### Rotation matrix R

```text
R =
[  0.0, -1.0,  0.0 ]
[  0.0,  0.0,  1.0 ]
[ -1.0,  0.0,  0.0 ]
```

**Determinant:** +1 (handedness preserved; both systems are right-handed).

**Basis tests:**

```text
R * [1, 0, 0]^T = [0, 0, -1]^T  (forward)
R * [0, 1, 0]^T = [-1, 0, 0]^T (left)
R * [0, 0, 1]^T = [0, 1, 0]^T  (up)
```

### Quaternion (WXYZ)

```text
q = [0.5, -0.5, 0.5, 0.5]
```

### Unit scaling

```text
scale_factor = 0.001
```

### Complete affine matrix M_ISO_TO_THREE_SCENE

```text
[  0.000, -0.001,  0.000,  0.000 ]
[  0.000,  0.000,  0.001,  0.000 ]
[ -0.001,  0.000,  0.000,  0.000 ]
[  0.000,  0.000,  0.000,  1.000 ]
```

### Known test point

```text
input_iso_mm = [1000.0, 500.0, 200.0]
output_three_m = [-0.5, 0.2, -1.0]
```

---

## 3. Relationship to glTF Asset Frame

| Concern | Frame | Transform ID |
|---|---|---|
| Authoring / packaging / storage | `GLTF_ASSET_FRAME` | `TF-ISO-TO-GLTF-ASSET` |
| Three.js default camera viewing | `THREE_SCENE_FRAME` | `TF-ISO-TO-THREE-SCENE` |

Do not conflate these frames. Asset files must use `GLTF_ASSET_FRAME`. Scene root nodes may apply an additional transform from asset frame to scene frame when loading into Three.js.
