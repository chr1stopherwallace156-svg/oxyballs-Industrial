# THREE_CAMERA_AND_WORLD_STANDARD.md — World Frame vs Camera Presets

## Status

**PROPOSAL**

Decouples physical asset placement from camera presentation. Presets are parametric relative to vehicle bounds, not absolute world coordinates.

---

## 1. Core Architecture

Three distinct entities:

| Entity | Role |
|---|---|
| `THREE_WORLD_FRAME` | World coordinate system of the WebGL scene; preserves loaded glTF asset coordinates |
| `THREE_CAMERA_LOCAL_FRAME` | Default Three.js camera local axes (looks along local -Z) |
| `CAMERA_VIEW_PRESET` | Initial position/target/view settings relative to vehicle bounding box |

---

## 2. Frame Specifications

### THREE_WORLD_FRAME

```text
Up Axis:      +Y
Forward Axis: +Z
Right Axis:   -X  (Left is +X)
Linear Units: meters (UNIT-M)
```

### THREE_CAMERA_LOCAL_FRAME

```text
Up Axis:      +Y
Forward Axis: -Z
Right Axis:   +X
```

---

## 3. Dynamic Camera Presets

Presets are defined relative to vehicle spatial bounds, not absolute static coordinates.

| Parameter | Definition |
|---|---|
| `target_anchor_id` | `VEHICLE_VISUAL_CENTER` — dynamically calculated bounding-box centroid |
| `distance_multiplier` | Scale factor applied to bounding sphere radius |

### Plain-Text Distance Rule

```text
d = 1.25 * r_bounding
```

**Read in Words:** Camera distance equals one point two five times the bounding sphere radius of the vehicle asset (example multiplier; each preset declares its own).

Presets: `registries/CAMERA_VIEW_PRESET_REGISTRY.json`
