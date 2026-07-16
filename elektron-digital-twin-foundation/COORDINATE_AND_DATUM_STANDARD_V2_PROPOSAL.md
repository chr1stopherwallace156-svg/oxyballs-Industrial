# COORDINATE_AND_DATUM_STANDARD_V2_PROPOSAL.md — Coordinate Orientation Standard

## Status

**PROVISIONALLY ACCEPTED (orientation) — Datum definitions superseded by `DATUM_CONSTRUCTION_STANDARD.md`**

---

## 1. Rejection of Custom Modeling Frame

The previously proposed `EDTS_MODELING_FRAME` (+X rear, +Y right, +Z up) is rejected as a baseline standard. This custom coordinate frame introduces an unnecessary transformation step and increases the likelihood of integration error during CAD layout.

The engineering repository standardizes on **`EDTS_ISO_ALIGNED_VEHICLE_FRAME`**, which aligns with ISO 8855 orientation guidelines.

Machine-readable frame definitions: `registries/COORDINATE_FRAME_REGISTRY.json`  
Machine-readable transforms: `registries/TRANSFORM_REGISTRY.json`

---

## 2. Primary Coordinate Frame Standard

| Axis | Direction |
|---|---|
| +X | Forward (longitudinal travel direction) |
| +Y | Left (lateral direction) |
| +Z | Upward (vertical direction normal to the local ground plane) |

**Handedness:** Right-handed coordinate system.

```
                  +Z (Upward)
                     ^
                     |   +X (Forward)
                     |  /
                     | /
                     |/
   (Left) +Y <-------O (Origin Datum)
```

---

## 3. Origin and Datum Definitions

Because the coordinate system is aligned with ISO axes but its origin position is a project design choice, orientation conventions are separated from origin datums.

| Datum ID | Description | Location | Target Application |
|---|---|---|---|
| DTM-001 (Project Origin) | EDTS Primary Origin | Center of front axle projected vertically onto the flat ground plane | Master assembly alignment |
| DTM-002 (Front Axle) | Front Axle Centerline | Intersection of the front axle rotational centerline and the vehicle longitudinal centerplane | Suspension kinematics |
| DTM-003 (Frame Baseline) | Top of Frame Flange | Flat top surface of the main frame rail directly above the rear axle centerline | Upfit and body integration |
| DTM-004 (Scan Control) | Metrology Control Point | Local target anchor established by the metrology lead scan station | Spatial capture registration |

**Construction methods:** See `DATUM_CONSTRUCTION_STANDARD.md` (supersedes datum table construction detail in this document).

---

## Superseded Documents

- `COORDINATE_SYSTEM_STANDARD.md` — deprecated
- `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md` — `EDTS_MODELING_FRAME` rejected
