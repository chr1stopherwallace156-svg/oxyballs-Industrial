# L1 Structural Measurement Definitions

**Status:** `DRAFT`  
**Purpose:** Eliminate mathematical ambiguity during physical inspection  
**Binding for:** `L1_PHYSICAL_MEASUREMENT_CHECKLIST.md`  
**Uncertainty:** `L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json`

---

## Spatial Diagram

```text
                  ┌──────────────────────────────────────────────┐
                  │              Cab Width Reference             │
               ┌──┴─┐                                          ┌─┴──┐
               │ LH │ <======= front_track_measurement ========> │ RH │
               │Wheel│    (Between Left & Right Wheel Center)   │Wheel│
               └──┬─┘                                          └─┬──┘
                  │ <========== front_overall_tire_width =======> │
```

## Defined Quantities

### `front_track_measurement`

Lateral distance between the left and right **wheel center planes** (midpoints of the rim widths) at the front axle, using an approved construction method recorded on the session sheet.

- Checklist ID: `M-WHL-01A`
- Process uncertainty class: `wheel_center_alignment`

### `front_overall_tire_width`

Lateral distance between the extreme outer sidewall bulges of the left and right front tires when steering is locked at **0.0° yaw** (straight ahead), vehicle on a level surface under nominal curb-weight load.

- Checklist ID: `M-WHL-01B`
- Must not be labeled “track width” without qualification

### `front_wheel_center_distance`

Linear distance between the interior faces of the wheel mounting flanges on the left and right brake rotors/hubs.

- Checklist ID: `M-WHL-01C`

### `rear_frame_width`

Horizontal distance between the outer lateral faces of the C-channel frame **webs** (excluding bolt heads or brackets) at a reference point directly aft of the cab corner.

- Checklist ID: `M-FRM-01`
- Do not assume equivalence to any draft “34 in / 34.2 in” figure until `EXT-L1-103` defines the OEM measurement class

## Plain-text formulas

```text
front_track_measurement = distance(wheel_center_plane_LH, wheel_center_plane_RH)
front_overall_tire_width = distance(outer_sidewall_LH, outer_sidewall_RH)  at yaw = 0.0 deg
front_wheel_center_distance = distance(hub_flange_inner_face_LH, hub_flange_inner_face_RH)
rear_frame_width = distance(outer_web_face_LH, outer_web_face_RH)  at station = aft_of_cab_corner
```

## Reporting Rule

Every recorded value must cite: quantity ID, method ID, instrument ID, process uncertainty class, and ambient session header. Mixing sidewall overall width into a track claim is a protocol violation.
