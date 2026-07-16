# Kernel Revision Log

## 2026-07-16 — Kernel v1.0.0-rc1 (DT-D024)

### Release candidate

- Kernel stamped **`1.0.0-rc1`** via `KERNEL_MANIFEST.json`
- Schema `$id` URNs: `urn:edts:schema:<name>:v1`
- Configuration identity fingerprinting (`EDTS_CFG_FINGERPRINT_SHA256_V1`) on `CFG-000001`
- Example records carry `urn:edts:example:*` `$id`s
- Primary directive remains Exact-Vehicle Isolation (HR-EVI)
- Multi-year applicability fields remain removed
- Schema definitions remain separated from populated instance examples
- Status target: **`EDTS_EXACT_VEHICLE_KERNEL_READY`**

## 2026-07-16 — Constitutional Exact Vehicle Isolation (DT-D023)

### Strengthening

Elevated Exact Vehicle Isolation from dataset preference to **constitutional Hard Rule (HR-EVI)** applying to every OEM, year, trim, and option package.

### Changes

1. Added `documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md`
2. Relocated seed dataset to `examples/ford/2019_f450_regularcab_4x2_drw/`
3. Added OEM scaffolds: Tesla / Toyota / Chevrolet (claims-empty)
4. Added configuration / evidence / component-instance architecture docs
5. Added `verification/isolation/` negative test suite
6. Reconciled Hard Rule 0 (Component First): sharing allowed only after per-vehicle proof — never automatic inheritance

### Status

`EDTS_UNIVERSAL_EXACT_VEHICLE_KERNEL_READY` when isolation suite passes.

### Defect corrected

Prior kernel applicability used `model_year_range: { from: 2017, to: 2019 }` and platform-family framing for the door. **Prohibited** under exact-vehicle isolation.

### Changes

1. Introduced Draft **2020-12** universal schemas under `schemas/` (11 files) with **no** Ford/F-450/Super Duty/year-range assumptions in schema structure.
2. Moved populated records to `examples/2019_f450/`.
3. Door identity → vehicle-bound `CMPINST-VEH000001-DOOR-FL` (not generic Super Duty door).
4. Exact vehicle `VEH-000001` + config `CFG-000001` (2019 F-450 Regular Cab 4x2 DRW 145.3/60 Chassis Cab only).
5. Interaction labeled `VISUAL_PREVIEW_ONLY`; disassembly `NOT_VERIFIED`; runtime `NOT_EXECUTED`.
6. Evidence links empty — no invented source IDs.
7. Reusable definition only as unlinked `EMPTY_CANDIDATE`.
8. Added isolation documentation under `documentation/`.
9. Prior `kernel/instances/f450_door_fl/*` and `schemas/kernel/*PROPOSAL.json` → **SUPERSEDED** (retain for audit; do not extend).
10. Renamed OS passport schema to `component-passport-os-v1.schema.json` to free `component-passport.schema.json` for kernel Draft 2020-12.

### Acceptance checklist

- [x] No `model_year_range` on 2019 component instance
- [x] No platform-family auto-population on exact vehicle
- [x] Instance refs `VEH-000001` and `CFG-000001`
- [x] Cross-year candidates outside exact vehicle record
- [x] Visual interaction `PROTOTYPE` or `VISUAL_PREVIEW_ONLY`
- [x] Schema files structurally separate from examples
