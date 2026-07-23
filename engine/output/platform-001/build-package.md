# PLATFORM 001 BUILD PACKAGE — DRAFT

> **DRAFT — INCOMPLETE**
> **NOT AUTHORIZED FOR PROCUREMENT**
> **NOT AUTHORIZED FOR FABRICATION**
> **NOT AUTHORIZED FOR INSTALLATION**
> **NOT AUTHORIZED FOR ENERGIZATION**

- Build package: `BP_PLATFORM-001_d64d1b6a434a`
- Engine version: `platform-slice-0.1.0`
- Generated at: 2026-07-22T08:02:21.515Z
- Input hash: `d64d1b6a434aa71b877a4dbed8923711b983fb350800478d2f252298e589c7a1`
- Package hash: `76ddce5254507eed09ee23a502038974e7c5fc2af8117513aa85dd30e4bb9034`

## Vehicle identity
- **MATCHED** — Ford F-450 Super Duty Chassis Cab (2019), Regular Cab, 4x2, DRW
- Cab-to-axle: 60 in · Wheelbase: 145.3 in · Body: Bare cab-and-chassis
- Source authority: OWNER_LOCKED_REFERENCE_CONFIG

## Configuration revision
- **LOCKED** — revision `R1` (platform status LOCKED_REFERENCE)

## Engineering claims
- Verified (document): 0
- Verified (physical): 0
- Unverified / candidate: 5
- Conflict: 0
- Total claims: 5

## Component categories
- Resolved candidates: 0
- Blocked candidates: 1
- Unselected: 19
- Total categories: 20

## Compatibility
- PASS: 4
- FAIL: 1
- BLOCKED_MISSING_DATA: 1
- NOT_APPLICABLE: 0

## Open-data requirements
- 7 OPEN

| ODR | Category | Subject | Evidence needed |
|---|---|---|---|
| `ODR_b0d74e951a6a6763` | BASELINE_AXLE_WEIGHT | baseline_front_axle_weight | MANUFACTURER_DOCUMENT_OR_SCALE_MEASUREMENT |
| `ODR_d09e027ca5148d20` | BASELINE_AXLE_WEIGHT | baseline_rear_axle_weight | MANUFACTURER_DOCUMENT_OR_SCALE_MEASUREMENT |
| `ODR_f3a12fa0d16d71a4` | BASELINE_AXLE_WEIGHT | gvwr | MANUFACTURER_DOCUMENT_OR_SCALE_MEASUREMENT |
| `ODR_b07b84ac90a2807e` | COMPONENT_DIMENSIONS | TRACTION_MOTOR | SUPPLIER_DOCUMENTATION |
| `ODR_1ff7630463115e92` | COMPONENT_MASS | TRACTION_MOTOR | SUPPLIER_DOCUMENTATION |
| `ODR_2b88fc1cb89f5e89` | PHYSICAL_MEASUREMENT | vehicle_frame_geometry | PHYSICAL_MEASUREMENT |
| `ODR_b56dfa9811a54a04` | SUPPLIER_DOCUMENTATION | TRACTION_MOTOR | SUPPLIER_DOCUMENTATION |

## Overall result
- **DRAFT_INCOMPLETE**

## Release blockers
- Total: 24

| Category | Count | Meaning |
|---|---:|---|
| RESEARCH | 3 | obtain a value / document (specs, weights, supplier data) |
| CONFIGURATION | 0 | the platform / config setup is wrong or incomplete |
| COMPONENTS | 19 | select a component (or replace a superseded one) |
| VERIFICATION | 2 | physically measure / verify something already present |

**RESEARCH (3)**
- BLOCKED:BASELINE_AXLE_WEIGHT_REQUIRED
- BLOCKED:MOTOR_DIMENSIONS_REQUIRED
- BLOCKED:MOTOR_MASS_REQUIRED

**COMPONENTS (19)**
- BLOCKED:BATTERY_CANDIDATE_NOT_SELECTED
- BLOCKED:CHARGE_INLET_CANDIDATE_NOT_SELECTED
- BLOCKED:CHARGER_CANDIDATE_NOT_SELECTED
- BLOCKED:CONTACTORS_CANDIDATE_NOT_SELECTED
- BLOCKED:CONTAINMENT_CANDIDATE_NOT_SELECTED
- BLOCKED:COOLING_PUMPS_CANDIDATE_NOT_SELECTED
- BLOCKED:DCDC_CANDIDATE_NOT_SELECTED
- BLOCKED:DRIVE_INTERFACE_CANDIDATE_NOT_SELECTED
- BLOCKED:EXPANSION_TANK_CANDIDATE_NOT_SELECTED
- BLOCKED:HEAT_EXCHANGER_CANDIDATE_NOT_SELECTED
- BLOCKED:HV_CABLING_CANDIDATE_NOT_SELECTED
- BLOCKED:HV_FUSES_CANDIDATE_NOT_SELECTED
- BLOCKED:HV_JUNCTION_CANDIDATE_NOT_SELECTED
- BLOCKED:INSTRUMENTATION_CANDIDATE_NOT_SELECTED
- BLOCKED:INVERTER_CANDIDATE_NOT_SELECTED
- BLOCKED:LV_HARNESS_CANDIDATE_NOT_SELECTED
- BLOCKED:MOUNTING_CANDIDATE_NOT_SELECTED
- BLOCKED:PRECHARGE_CANDIDATE_NOT_SELECTED
- BLOCKED:VCU_CANDIDATE_NOT_SELECTED

**VERIFICATION (2)**
- BLOCKED:MOTOR_COMPONENT_UNVERIFIED
- BLOCKED:PHYSICAL_FRAME_MEASUREMENT_REQUIRED

## What prevents release
This package is a controlled DRAFT. It is **not** an approval and makes **no**
claim that the conversion is safe, complete, or authorized. Release is blocked
until every open-data requirement above is closed with verified evidence and
every category has a verified component selection. Nothing here authorizes
procurement, fabrication, installation, or energization.
