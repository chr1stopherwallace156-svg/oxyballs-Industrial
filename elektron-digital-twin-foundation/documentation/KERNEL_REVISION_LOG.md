# Kernel Revision Log

## 2026-07-16 — Exact-vehicle isolation revision (DT-D022)

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
