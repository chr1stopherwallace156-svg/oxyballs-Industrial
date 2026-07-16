# DATUM_CONSTRUCTION_STANDARD.md — Datum Construction Protocol

## Status

**PROPOSAL — Supersedes datum definitions in prior coordinate proposals**

This standard provides repeatable, step-by-step physical construction methods for the primary vehicle datums to eliminate coordinate frame variations between scanning teams.

Datum definitions are separated from axis orientation. Axis orientation is governed by `registries/COORDINATE_FRAME_REGISTRY.json` (`EDTS_ISO_ALIGNED_VEHICLE_FRAME`).

---

## DTM-001: EDTS Primary Origin

| Field | Value |
|---|---|
| Description | Primary spatial coordinate reference for all integrated vehicle assemblies |
| Frame reference | `EDTS_ISO_ALIGNED_VEHICLE_FRAME` |

**Construction method:**

1. Place the vehicle on certified, level, flat surface plates (deviation ≤ ± 0.5 mm across the footprint).
2. Establish the left and right wheel rotational centerlines of the front axle.
3. Compute the midpoint along the transverse line segment connecting these two centerlines to find the center of the axle.
4. Project this midpoint vertically down to the flat surface plane.

| Requirement | Specification |
|---|---|
| Required instruments | Laser tracker or high-accuracy optical total station |
| Input points | Minimum 6-point circular fit on left outer wheel hub face; minimum 6-point circular fit on right outer wheel hub face; minimum 4-point plane fit on surface plates beneath the wheels |
| Fitting method | Least-squares orthogonal regression for circle and plane boundaries |
| Environmental condition | Temperature stable at 20 °C ± 3 °C; vehicle in unladen design state (full fluids, empty cargo, no occupants) |
| Target uncertainty | ≤ ± 0.5 mm spatial positioning |

---

## DTM-002: Front Axle Centerline

| Field | Value |
|---|---|
| Description | Kinematic rotational centerline of the front wheel spindle assemblies |

**Construction method:**

1. Align the front wheels to the true longitudinal travel axis (steering zero angle).
2. Locate the center of the left wheel hub and the center of the right wheel hub.
3. Construct a 3D line segment connecting these two calculated center points.

| Requirement | Specification |
|---|---|
| Required instruments | Contact metrology arm (e.g., FaroArm) or laser tracker |
| Input points | Direct 8-point cylinder scan of left and right wheel spindle bearing locating surfaces (with wheels removed) |
| Fitting method | Least-squares cylinder extraction |
| Environmental condition | Suspended on frame jacks to isolate suspension compression variance |
| Target uncertainty | ≤ ± 0.25 mm spatial positioning |

---

## DTM-003: Frame Baseline

| Field | Value |
|---|---|
| Description | Flat upper interface surface of the chassis-cab main rails |

**Construction method:**

1. Locate the flat upper flange of the left and right frame rails directly above the rear axle centerline.
2. Measure a 1.0-meter span on both left and right rail top surfaces.
3. Construct a plane intersecting these spans.

| Requirement | Specification |
|---|---|
| Required instruments | High-resolution structured-light scanner or laser tracker |
| Input points | Grid point cloud (minimum 500 points per rail span) |
| Fitting method | Plane fit with outlier rejection (± 2σ noise threshold) |
| Environmental condition | Checked in both unladen state and dummy-loaded state to isolate local structural bending variance |
| Target uncertainty | ≤ ± 0.5 mm spatial positioning |

---

## DTM-004: Metrology Control Point

| Field | Value |
|---|---|
| Description | Local target anchor established by the metrology lead scan station |
| Frame reference | `SCAN_RAW_FRAME` |

Construction method is defined per scan session in the physical capture record. See `VIN_AND_LABEL_CAPTURE_PROTOCOL.md` and `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA.json`.

---

## Superseded Documents

- Datum table in `COORDINATE_AND_DATUM_STANDARD_V2_PROPOSAL.md` — superseded by this construction standard
- `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md` — `EDTS_MODELING_FRAME` rejected; use `EDTS_ISO_ALIGNED_VEHICLE_FRAME`
