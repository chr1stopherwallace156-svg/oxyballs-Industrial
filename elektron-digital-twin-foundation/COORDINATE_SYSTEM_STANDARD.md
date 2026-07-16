# COORDINATE_SYSTEM_STANDARD.md — Coordinate Frames (Proposed)

## Status

**Architecture Material (Non-binding until owner resolves any origin convention conflicts)**

## 1. Vector Convention

This document defines a right-handed vehicle frame:

- +Z: Up
- -Z: Down
- -X: Forward
- +X: Rear
- -Y: Left
- +Y: Right

Handedness: Right-Handed Coordinate System (RHS).

## 2. Coordinate System Orientation Diagram

```
  +Z (Up)
     ^
    /|
   / |
  /  v
 -X  -Y  +Y
```

## 3. Origin (Proposed Vehicle Frame)

Proposed origin (per user-provided closure plan):
- Origin (0,0,0): Front Axle Centerline / Longitudinal Centerplane

## 4. Project Compatibility Note (DATA_MODEL.md)

Current repo `DATA_MODEL.md` declares a coordinate convention:
- Origin: Center of rear axle, ground plane (shop convention — confirm at L02)

This standard does **not** overwrite `DATA_MODEL.md`. Instead:
- Treat this as an interoperability reference.
- Mark the mapping between “Front-axle origin” and “Rear-axle origin” as **RESEARCH_REQUIRED** until unified.

## 5. System Frame Matrix

| System | Origin Location | Axis Directions | Unit | Handedness |
|---|---|---|---|---|
| Vehicle Frame | Front axle centerline / centerplane | +X Rear, +Y Right, +Z Up | mm | RHS |
| World Frame | Scan floor ground datum (project defined) | +X North, +Y East, +Z Up | mm | RHS |
| CAD Frame | Front bumper center plane offset | +X Forward, +Y Left, +Z Up | mm | RHS |
| Display/Unreal | Center of bounding box (symmetrical) | +X Forward, +Y Right, +Z Up | cm | LHS |

