# THREE_CAMERA_AND_WORLD_STANDARD.md — World Frame vs Camera Presets

## Status

**PROPOSAL — Supersedes corrective root-transform approach in THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md**

Decouples physical asset placement from camera presentation so visualization engines do not mutate vehicle coordinates to satisfy a view.

---

## 1. Three Distinct Entities

| Entity | Role |
|---|---|
| `THREE_WORLD_FRAME` | Scene spatial organization; preserves loaded glTF asset coordinates |
| `THREE_CAMERA_LOCAL_FRAME` | Default Three.js camera local axes |
| `CAMERA_VIEW_PRESET` | Presentation-only camera pose; does not alter asset transforms |

---

## 2. THREE_WORLD_FRAME

Preserves loaded glTF asset coordinates directly (no unversioned corrective root rotation):

```text
Up Axis:      +Y
Forward Axis: +Z
Right Axis:   -X  (Left is +X)
Linear Units: meters (UNIT-M)
```

Asset export remains `TF-ISO-TO-GLTF-ASSET`. World frame equals glTF asset frame at load time.

---

## 3. THREE_CAMERA_LOCAL_FRAME

Default Three.js camera local frame:

```text
Up Axis:      +Y
Forward Axis: -Z  (looking into the screen)
Right Axis:   +X
```

This describes camera-local axes only. It is not a vehicle transform edge.

---

## 4. CAMERA_VIEW_PRESET

Presentation parameter defining viewport start orientation without altering vehicle spatial transforms.

Example: place camera at a positive Z offset looking toward origin `[0, 0, 0]` to face the front of a glTF vehicle without corrective root transforms on the asset.

Presets: `registries/CAMERA_VIEW_PRESET_REGISTRY.json`

---

## 5. Deprecated Approach

`TF-ISO-TO-THREE-SCENE` and `THREE_SCENE_FRAME` (V3) applied a corrective root transform to face -Z-forward cameras. That conflated world coordinates with presentation. Prefer:

1. Load assets in `GLTF_ASSET_FRAME` / `THREE_WORLD_FRAME`
2. Aim cameras via `CAMERA_VIEW_PRESET`
