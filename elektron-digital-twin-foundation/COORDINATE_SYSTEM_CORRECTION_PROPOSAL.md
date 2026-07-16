# COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md — Superseded

## Status

**REJECTED — `EDTS_MODELING_FRAME` rejected (DT-D007)**

The custom modeling frame (+X rear, +Y right) is rejected. Use:

- `COORDINATE_AND_DATUM_STANDARD_V2_PROPOSAL.md` — `EDTS_ISO_ALIGNED_VEHICLE_FRAME`
- `registries/COORDINATE_FRAME_REGISTRY.json` — machine-readable frame definitions
- `registries/TRANSFORM_REGISTRY.json` — machine-readable transforms
- `DATUM_CONSTRUCTION_STANDARD.md` — datum construction protocols

Retained for audit traceability only.

---

## Definition of Frames

To eliminate coordinate ambiguity across scanning, CAD layout, and the Unreal Engine simulation environment, the following transform dictionary is established:

| Coordinate Frame | Standard | Handedness | X Axis | Y Axis | Z Axis | Origin Datum |
|---|---|---|---|---|---|---|
| ISO_8855_VEHICLE_FRAME | ISO 8855 | Right-handed | Forward | Left | Up | Center of front axle projected to ground plane |
| EDTS_MODELING_FRAME | EDTS Internal | Right-handed | Rearward | Right | Up | Center of front axle on the frame top surface |
| SCAN_FRAME | Metrology Raw | Right-handed | Scanner-arbitrary | Scanner-arbitrary | Gravity vector | Active target/origin of primary scanner station |
| UNREAL_FRAME | Unreal Engine | Left-handed | Forward | Right | Up | Center of bounding box base |

---

## Rigorous Rotation Logic

### ISO_8855_VEHICLE_FRAME → EDTS_MODELING_FRAME

Converting from ISO_8855_VEHICLE_FRAME to the internally used EDTS_MODELING_FRAME requires a **180° rotation around the Z-axis**.

Given a position vector **P_ISO** = [x, y, z, 1]ᵀ:

```
P_EDTS = T_ISO→EDTS × P_ISO

T_ISO→EDTS = [ -1   0   0   0 ]
             [  0  -1   0   0 ]
             [  0   0   1   0 ]
             [  0   0   0   1 ]
```

Result: x_EDTS = −x_ISO, y_EDTS = −y_ISO, z_EDTS = z_ISO

### EDTS_MODELING_FRAME → UNREAL_FRAME

For asset export to UNREAL_FRAME (F_UE), the transformation requires mapping the coordinate space from right-handed to left-handed:

```
T_EDTS→UE = [ -1   0   0   0 ]
            [  0   1   0   0 ]
            [  0   0   1   0 ]
            [  0   0   0   1 ]
```

This systematically flips the lateral axis to prevent inversion of CAD components (e.g., left and right brake calipers swapping places during import).

### Composite: ISO_8855 → UNREAL

```
T_ISO→UE = T_EDTS→UE × T_ISO→EDTS
```

---

## Relationship to DATA_MODEL.md

`DATA_MODEL.md` declares a rear-axle / ground-plane origin (shop convention). That datum remains valid for L02 chassis work but must be expressed as an explicit offset transform from ISO_8855_VEHICLE_FRAME, not as an alternate "ISO 8855" definition.

**Status:** RESEARCH_REQUIRED — document `T_ISO→REAR_AXLE_DATUM` once platform is locked.

---

## Deprecation Notice

`COORDINATE_SYSTEM_STANDARD.md` incorrectly labeled +X rear / +Y right as "ISO 8855." That document is **deprecated** and must not be used for new claims. All new spatial claims must declare `coordinate_frame_id` per `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json`.
