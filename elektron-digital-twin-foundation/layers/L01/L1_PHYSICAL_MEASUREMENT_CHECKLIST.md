# EDTS Layer 1 Physical Measurement Checklist

**Status:** `DRAFT — EXECUTE ONLY ON ACCEPTED GRADE-A OR GRADE-B VIN`  
**Definitions:** `L1_STRUCTURAL_MEASUREMENT_DEFINITIONS.md`  
**Uncertainty:** `L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json`  
**OEM numeric targets:** leave blank until `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` is populated

```text
                  +----------------------------------------------+
                  |              Cab Width Reference             |
               +--+-+                                          +-+--+
               | LH | <======= front_track_measurement ========> | RH |
               |Wheel|    (Between Left & Right Wheel Center)   |Wheel|
               +--+-+                                          +-+--+
                  | <========== front_overall_tire_width =======> |
```

## Required Instrument Grade

| Instrument | Resolution (framework) | Calibration uncertainty (framework) |
|---|---|---|
| Digital caliper >=300 mm jaw | 0.01 mm | +/- 0.03 mm |
| Laser distance meter | 1.00 mm | +/- 1.50 mm |
| Digital angle gauge | 0.05 deg | record per device cert |

Record instrument serial and calibration date on every session sheet.

---

## Frame and Structure

- [ ] **M-FRM-01 (`rear_frame_width`)**: Outer lateral faces of C-channel webs, aft of cab corner (exclude bolt heads/brackets).
  - *OEM extracted target*: `868.7` mm — from `EXT-L1-103` / `CLM-L1-003` (DOCUMENT_SUPPORTED)
  - *Definition class from OEM*: `OUTSIDE_TO_OUTSIDE_FRAME_WEB`
  - *Actual field measure*: `_______` mm
  - *Process uncertainty class*: `chassis_frame_spans` (+/- 1.00 mm)
- [ ] **M-FRM-02 (Frame Rail Height/Depth)**: Vertical web profile depth directly behind cab transition.
  - *OEM extracted target*: `_______` mm
  - *Actual field measure*: `_______` mm
- [ ] **M-FRM-03 (Flange Width)**: Horizontal frame flange lip width.
  - *Actual field measure*: `_______` mm

## Hub and Wheel Interfaces

- [ ] **M-WHL-01A (`front_track_measurement`)**: Wheel center planes (rim midpoints).
  - *OEM extracted target*: `1899.92` mm — from `EXT-L1-102` / `CLM-L1-002` (DOCUMENT_SUPPORTED)
  - *Actual field measure*: `_______` mm
  - *Process uncertainty class*: `wheel_center_alignment` (+/- 1.50 mm)
- [ ] **M-WHL-01B (`front_overall_tire_width`)**: Extreme outer sidewall bulges; yaw = 0.0 deg; level pad; curb-weight.
  - *Actual field measure*: `_______` mm
- [ ] **M-WHL-01C (`front_wheel_center_distance`)**: Interior faces of wheel mounting flanges (hub/rotor).
  - *Actual field measure*: `_______` mm
- [ ] **M-WHL-02 (Wheel Hub PCD)**: Cross-stud pitch circle diameter.
  - *OEM extracted target*: `225.0` mm — from `EXT-L1-104` / `CLM-L1-004` (DOCUMENT_SUPPORTED)
  - *Actual field measure*: `_______` mm
- [ ] **M-WHL-03 (Wheel Center Bore)**: Pilot opening diameter.
  - *Actual field measure*: `_______` mm

## Suspension Coordinates

- [ ] **M-SUS-01 (Front Axle Tube OD)**: Only if monobeam architecture confirmed.
  - *Architecture observed*: `MONOBEAM / TWIN_I_BEAM / OTHER: ____`
  - *Actual field measure*: `_______` mm
- [ ] **M-SUS-02 (Front Stabilizer Bar Diameter)**:
  - *OEM extracted target*: `_______` mm (blank until cited)
  - *Actual field measure*: `_______` mm

## Session Header

| Field | Value |
|---|---|
| VIN | |
| Grade | GRADE-A / GRADE-B |
| Ambient temp (C) | |
| Surface (level pad?) | |
| Tire pressures (FL/FR/RLI/RLO/RRI/RRO) | |
| Steering yaw confirmed 0.0 deg? | |
| Operator | |
| Date (ISO) | |
| Evidence folder | `research/intake/<VIN>/measurements/` |
