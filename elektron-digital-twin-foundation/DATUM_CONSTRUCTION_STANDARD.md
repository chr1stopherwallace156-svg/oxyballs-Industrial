# DATUM_CONSTRUCTION_STANDARD.md — Datum Construction Protocol

## Status

**PROPOSAL — Supersedes datum definitions in prior coordinate proposals**

Repeatable physical construction methods for primary vehicle datums. Datum state classes: [DATUM_STATE_MODEL_PROPOSAL.md](DATUM_STATE_MODEL_PROPOSAL.md). Tolerances conform to [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

---

## DTM-DSN-001: EDTS Primary Origin (Design Datum)

| Field | Value |
|---|---|
| Description | Primary spatial coordinate reference for integrated vehicle assemblies |
| Frame reference | `EDTS_ISO_ALIGNED_VEHICLE_FRAME` |
| Datum class | DTM-DSN |

**Construction method:**

1. Place the vehicle on certified, level, flat surface plates per surface plate flatness tolerance below.
2. Establish left and right front wheel rotational centerlines.
3. Compute midpoint along transverse segment connecting centerlines.
4. Project midpoint vertically to flat surface plane.

### Surface Plate Flatness Tolerance

**Copyable Formula**

```text
surface_plate_deviation_tolerance = +/- 0.5 mm
```

**Read in Words**

> The permitted deviation across the surface plate footprint is plus or minus zero point five millimeters.

**Acceptable Range or Result**

For nominal flatness reference X, minimum = X minus 0.5 mm, maximum = X plus 0.5 mm.

### Environmental Temperature Range

**Copyable Formula**

```text
nominal_temperature = 20 degC
temperature_tolerance = +/- 3 degC
acceptable_temperature_range = 17 degC to 23 degC
```

**Read in Words**

> The nominal temperature is twenty degrees Celsius, with an allowable deviation of plus or minus three degrees Celsius. Acceptable range: seventeen degrees Celsius through twenty-three degrees Celsius.

### Target Spatial Uncertainty (DTM-DSN-001)

**Copyable Formula**

```text
target_uncertainty = +/- 0.5 mm
```

**Read in Words**

> The target spatial positioning uncertainty is plus or minus zero point five millimeters.

| Requirement | Specification |
|---|---|
| Required instruments | Laser tracker or high-accuracy optical total station |
| Input points | Minimum 6-point circular fit per wheel hub face; minimum 4-point plane fit on surface plates |
| Fitting method | Least-squares orthogonal regression |
| Vehicle state | Unladen design state (full fluids, empty cargo, no occupants) |

---

## DTM-KIN-001: Front Axle Centerline (Kinematic Datum)

| Field | Value |
|---|---|
| Description | Kinematic rotational centerline of front wheel spindle assemblies |
| Datum class | DTM-KIN |

**Construction method:**

1. Align front wheels to true longitudinal travel axis (steering zero angle).
2. Locate left and right wheel hub centers.
3. Construct 3D line segment connecting center points.

### Target Spatial Uncertainty (DTM-KIN-001)

**Copyable Formula**

```text
target_uncertainty = +/- 0.25 mm
```

**Read in Words**

> The target spatial positioning uncertainty is plus or minus zero point two five millimeters.

| Requirement | Specification |
|---|---|
| Required instruments | Contact metrology arm or laser tracker |
| Input points | 8-point cylinder scan per spindle bearing locating surface (wheels removed) |
| Fitting method | Least-squares cylinder extraction |
| Vehicle state | Suspended on frame jacks |

---

## DTM-FIX-001: Frame Baseline (Metrology Fixture Datum)

| Field | Value |
|---|---|
| Description | Flat upper interface surface of chassis-cab main rails |
| Datum class | DTM-FIX |

**Construction method:**

1. Locate flat upper flange of left and right frame rails above rear axle centerline.
2. Measure 1.0-meter span on each rail top surface.
3. Construct plane intersecting spans.

### Plane Fit Outlier Rejection

**Copyable Formula**

```text
outlier_rejection_threshold = +/- 2 sigma
```

**Read in Words**

> Points deviating beyond plus or minus two sigma from the fitted plane are rejected as outliers.

### Target Spatial Uncertainty (DTM-FIX-001)

**Copyable Formula**

```text
target_uncertainty = +/- 0.5 mm
```

| Requirement | Specification |
|---|---|
| Required instruments | Structured-light scanner or laser tracker |
| Input points | Minimum 500 points per rail span |
| Vehicle state | Unladen and dummy-loaded checks for bending variance |

---

## DTM-004: Metrology Control Point

Per-session anchor in `SCAN_RAW_FRAME`. See `ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md`.

---

## Superseded Documents

- `COORDINATE_AND_DATUM_STANDARD_V2_PROPOSAL.md` datum table detail — superseded by this standard and `DATUM_STATE_MODEL_PROPOSAL.md`
- Legacy DTM-001..DTM-003 IDs — mapped in `DATUM_STATE_MODEL_PROPOSAL.md`
