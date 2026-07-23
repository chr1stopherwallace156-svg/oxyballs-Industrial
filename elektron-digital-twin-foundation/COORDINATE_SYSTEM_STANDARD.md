# COORDINATE_SYSTEM_STANDARD.md — Coordinate Frames (Deprecated)

## Status

**DEPRECATED — Rejected per adversarial audit (COORD-001)**

This document incorrectly labeled +X rear / +Y right / +Z up as "ISO 8855." That axis convention is **not** ISO 8855 and has been rejected.

**Use instead:** `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md`

---

## Deprecation Notice (2026-07-16)

| Finding | Detail |
|---|---|
| Claim ID | COORD-001 |
| Error | +X Rear, +Y Right, +Z Up labeled as ISO 8855 |
| Correct ISO 8855 | +X Forward, +Y Left, +Z Up |
| Impact | Would cause catastrophic rotation matrix and Unreal import bugs without explicit transforms |

All new spatial claims must declare `coordinate_frame_id` per `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json`.

---

## Historical Content (Do Not Use)

The following was the previous proposed convention. It is preserved for audit traceability only.

### Previous Vector Convention (Rejected)

- +Z: Up
- -Z: Down
- -X: Forward
- +X: Rear
- -Y: Left
- +Y: Right

Handedness: Right-Handed Coordinate System (RHS) — but **not ISO 8855**.

### Previous Origin (Rejected as sole standard)

- Origin (0,0,0): Front Axle Centerline / Longitudinal Centerplane

### Previous System Frame Matrix (Rejected)

| System | Origin Location | Axis Directions | Unit | Handedness |
|---|---|---|---|---|
| Vehicle Frame | Front axle centerline / centerplane | +X Rear, +Y Right, +Z Up | mm | RHS |
| World Frame | Scan floor ground datum (project defined) | +X North, +Y East, +Z Up | mm | RHS |
| CAD Frame | Front bumper center plane offset | +X Forward, +Y Left, +Z Up | mm | RHS |
| Display/Unreal | Center of bounding box (symmetrical) | +X Forward, +Y Right, +Z Up | cm | LHS |
