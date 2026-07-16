# SCHEMA_FREEZE_FOR_VERTICAL_SLICE

**Effective with:** `edts-kernel-v1.0.0-rc1`  
**Status:** `ACTIVE`  
**Kernel milestone:** `COMPLETE_FOR_DEFINED_SCOPE`  
**Validation status:** `EDTS_EXACT_VEHICLE_KERNEL_VALIDATED`

The Exact-Vehicle Kernel schema set is frozen. Do **not** change the kernel now. Leave git tag `edts-kernel-v1.0.0-rc1` and this freeze intact.

## Milestone verdict (v1.0.0-rc1)

Kernel v1.0.0-rc1 is **complete for its defined scope**. It has proven:

* Exact-vehicle configuration isolation
* Deterministic configuration fingerprinting
* Schema validity
* Rejection of invalid and cross-vehicle records
* Referential integrity between vehicle, configuration, assembly, and component records
* Preservation of audit history
* Honest blocking when physical geometry is absent

**Out of scope / still PENDING:** Runtime 3D door vertical slice (`CMPINST-VEH000001-DOOR-FL`).

## Allowed (only)

- Blocking bug fixes
- Validator defects
- Fields proven necessary by the **real** geometry / vertical-slice workflow (with decision log)

## Prohibited

- Speculative future fields (“sounds useful”)
- Telemetry expansion
- EV conversion expansion
- Broad compatibility logic
- New platform abstractions
- Schema reopening for convenience or research architecture

## Reopen rule

Reopen the kernel **only** if the real geometry workflow exposes a **blocking defect** — not merely because a new field sounds useful.

See `KERNEL_RELEASE_MANIFEST.json` and `verification/results/KERNEL_VALIDATION_SUMMARY.md`.
