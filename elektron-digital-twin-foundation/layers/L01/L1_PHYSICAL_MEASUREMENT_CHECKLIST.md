# EDTS Layer 1 Physical Measurement Checklist

**Status:** `DRAFT — EXECUTE ONLY ON ACCEPTED REFERENCE VIN`  
**Purpose:** Calibrate coordinate reference planes and provide hard control markers for photogrammetry alignment.  
**OEM targets** listed below are research/extraction targets until `SRC-L1-*` pages are archived — blank cells mean measure-first.

```text
┌──────────────────────────────────────────────┐
│                                              │
┌──┴─┐                                          ┌─┴──┐
│ LH │ <========== Track Width: 74.8 in ========> │ RH │
└──┬─┘                                          └─┬──┘
│                                              │
└──────────────────────────────────────────────┘
```

## Required Instrument Grade

- Digital vernier calipers (minimum 300 mm jaw capacity, accuracy ± 0.02 mm)
- High-precision laser distance meter (accuracy ± 1.0 mm over 5 m)
- Digital angle gauge (0.05° resolution)
- Record instrument serial / calibration date on every session sheet

---

## Frame and Structure Dimensions

- [ ] **M-FRM-01 (Rear Frame Web Outer Width)**: Measure between top horizontal outer flanges behind cab corner.
  - *OEM Reference Target*: 34.2 in (868.7 mm) — pending `EXT-L1-103`
  - *Actual Field Measure*: `_______` mm
- [ ] **M-FRM-02 (Frame Rail Height/Depth)**: Measure vertical web profile depth directly behind cab transition.
  - *OEM Reference Target*: `_______` mm (extract from BBAS before treating as nominal)
  - *Actual Field Measure*: `_______` mm
- [ ] **M-FRM-03 (Flange Width)**: Width of horizontal frame flange lips.
  - *Actual Field Measure*: `_______` mm

## Hub and Wheel Interfaces

- [ ] **M-WHL-01 (Front Track Width)**: Measure distance between outer tire sidewall planes at center horizontal line **or** document exact metrology method used (sidewall vs wheel center).
  - *OEM Reference Target*: 74.8 in (1899.9 mm) — pending `EXT-L1-102`
  - *Actual Field Measure*: `_______` mm
  - *Method note*: `_______________________________`
- [ ] **M-WHL-02 (Wheel Hub Bolt Circle Diameter)**: Verify hub pitch circle diameter using cross-stud measurements.
  - *OEM Reference Target*: 225.0 mm (`CLM-006`)
  - *Actual Field Measure*: `_______` mm
- [ ] **M-WHL-03 (Wheel Center Bore)**: Diameter of center pilot opening.
  - *Actual Field Measure*: `_______` mm

## Suspension Coordinates

- [ ] **M-SUS-01 (Front Axle Tube Outer Diameter)**: Measure cylindrical housing tube diameter (only if monobeam architecture confirmed).
  - *Actual Field Measure*: `_______` mm
  - *Architecture observed*: `MONOBEAM / TWIN_I_BEAM / OTHER: ____`
- [ ] **M-SUS-02 (Front Stabilizer Bar Diameter)**: Measure standard bar diameter.
  - *OEM Reference Target*: 35.0 mm — **UNVERIFIED research target** until OEM cite archived
  - *Actual Field Measure*: `_______` mm

## Session Header

| Field | Value |
|---|---|
| VIN | |
| Ambient temp (°C) | |
| Surface (level pad?) | |
| Tire pressures (FL/FR/RLI/RLO/RRI/RRO) | |
| Operator | |
| Date (ISO) | |
| Evidence folder | `research/intake/<VIN>/measurements/` |
