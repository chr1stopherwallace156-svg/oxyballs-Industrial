# EDTS VIN Resolution Report

**VIN:** `1HTKHPVK8KH805188`
**Decision:** DT-D067
**Outcome:** NO_MATCH
**Lifecycle:** REJECTED

## Honesty

VIN decoding does **not** prove physical geometry, wheelbase, cab-to-axle, frame holes, torque, modifications, or current component condition.
NHTSA vPIC data is manufacturer-reported. Missing fields are UNKNOWN — not invented.
This report must **not** be treated as `CONFIGURATION_CONFIRMED` or engineering-Verified from VIN alone.

## Decoded identity

| Field | Value |
|---|---|
| Manufacturer | INTERNATIONAL MOTORS, LLC |
| Make | GM |
| Model year | 2019 |
| Model | GM515 |
| Series | GM - Chevrolet Silverado Medium Duty |
| Body class | Incomplete - Chassis Cab (Single Cab) |
| Cab type | MDHD: Conventional |
| Drive type | 4x2 |
| GVWR | Class 5: 16,001 - 19,500 lb (7,258 - 8,845 kg) |
| Engine | GM / 6.6 L |
| Plant | SPRINGFIELD, OHIO, UNITED STATES (USA) |
| ErrorCode | 0 |
| ErrorText | 0 - VIN decoded clean. Check Digit (9th position) is correct |

## Decoder notes

0 - VIN decoded clean. Check Digit (9th position) is correct

## Configuration comparisons

### CFG-2019-F450-REG-CAB-4X2-60CA-DRW

Result: **REJECTED_REFERENCE_MATCH** · score=-110

| Field | Expected | Observed | Status | Mandatory |
|---|---|---|---|---|
| make_or_manufacturer | FORD|Ford | GM | MISMATCH | true |
| modelYear | 2019 | 2019 | MATCH | true |
| model | F-450|F450|F-450 Super Duty|Super Duty | GM515 | MISMATCH | true |
| bodyClass | Chassis Cab|Incomplete - Chassis Cab | Incomplete - Chassis Cab (Single Cab) | MATCH | true |
| cabType | Regular|Single Cab|Conventional | MDHD: Conventional | MATCH | true |
| driveType | 4x2|4X2|RWD|Rear Wheel | 4x2 | MATCH | true |
| wheelbase_in | 145.3 | UNKNOWN | UNKNOWN | false |
| cab_to_axle_in | 60 | UNKNOWN | UNKNOWN | false |
| rear_wheels | DRW | UNKNOWN | UNKNOWN | false |

## Conflicts

- CFG-2019-F450-REG-CAB-4X2-60CA-DRW.make_or_manufacturer: expected=FORD|Ford observed=GM
- CFG-2019-F450-REG-CAB-4X2-60CA-DRW.model: expected=F-450|F450|F-450 Super Duty|Super Duty observed=GM515

## Unknowns

- CFG-2019-F450-REG-CAB-4X2-60CA-DRW.cab_to_axle_in
- CFG-2019-F450-REG-CAB-4X2-60CA-DRW.rear_wheels
- CFG-2019-F450-REG-CAB-4X2-60CA-DRW.wheelbase_in
- identity.engineModel
- identity.numberOfAxles
- identity.trim
- physical.cab_to_axle_in
- physical.frame_geometry
- physical.modification_state
- physical.wheelbase_in

## Confidence explanation

- VIN decoding uses manufacturer-reported NHTSA vPIC data only.
- Absent fields are UNKNOWN — never invented.
- VIN evidence alone cannot mark configuration CONFIGURATION_CONFIRMED or geometry Verified.
- Outcome: NO_MATCH
- Top comparison CFG-2019-F450-REG-CAB-4X2-60CA-DRW: matches=4 mismatches=2 unknowns=3 score=-110
- Mandatory mismatches: make_or_manufacturer, model
- Decoder note: 0 - VIN decoded clean. Check Digit (9th position) is correct
- Further physical verification required before engineering twin claims (labels, WB/CA, axle, drivetrain observation).

## Required physical verification

- **certification-label-photograph**: Driver-side door jamb / certification label photograph — NHTSA notes labels may carry information not present in vPIC
- **wheelbase-measurement**: Wheelbase measurement (laser tape / caliper method) — Exact WB is not reliably proven by VIN decode alone
- **cab-to-axle-measurement**: Cab-to-axle (CA) measurement — CA typically absent from vPIC for chassis-cab packages
- **axle-configuration-observation**: Axle configuration observation (e.g. DRW vs SRW) — Rear-wheel configuration must be physically confirmed
- **drivetrain-observation**: Drivetrain observation (4x2 vs 4x4) — Confirm decoded DriveType against vehicle
- **cross-configuration-documentation**: Document that this VIN is outside the EDTS reference configuration lock — Manufacturer/model mismatch against registered CFG expectations

## Artifacts

- Evidence: `/workspace/edts-vin-resolver/data/evidence/vin/1HTKHPVK8KH805188.raw.json`
- Vehicle: `/workspace/edts-vin-resolver/data/vehicles/VEH-1HTKHPVK8KH805188.json`
