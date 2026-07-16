# SCHEMA_FREEZE_FOR_VERTICAL_SLICE

**Effective with:** `edts-kernel-v1.0.0-rc1`  
**Status:** `ACTIVE`

The Exact-Vehicle Kernel schema set is temporarily frozen so the project can prove a real 3D vertical slice on `CMPINST-VEH000001-DOOR-FL` without returning to architectural churn.

## Allowed

- Blocking bug fixes
- Validator defects
- Fields proven necessary by the real vertical slice (with decision log)

## Prohibited

- Speculative future fields
- Telemetry expansion
- EV conversion expansion
- Broad compatibility logic
- New platform abstractions

See `KERNEL_RELEASE_MANIFEST.json`.
