# MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md — Measurement Accuracy Classes (MAC)

## Status

**PROPOSED — Supersedes universal ≤ 0.05 mm tolerance claims**

---

## Strategy Overview

```
                  [ FULL VEHICLE SCANNING STRATEGY ]
                                |
       +------------------------+------------------------+
       |                                                 |
[ RIGID HARD-POINTS ]                             [ BODY ENVELOPE ]
       |                                                 |
     MAC-A                                             MAC-B
  (suspension, cab mounts)                        (doors, fenders, panels)
  Req: Structured-light / Tracker                 Req: Handheld high-res laser
  Target: ±0.5 mm                                 Target: ±2.0 mm
```

---

## MAC-A — Rigid Structural Hardpoints

- **Scope:** Suspension hangers, engine mount centerlines, cab-to-frame interface points, and steering box locating pins.
- **Physical Target:** ± 0.5 mm spatial accuracy.
- **Instrument Requirements:** Arm-based contact metrology (e.g., FaroArm) or calibrated high-resolution structured-light scanning with photogrammetric scale-bar registration.

---

## MAC-B — Exterior Aerodynamic & Styling Surfaces

- **Scope:** Exterior sheet metal panels, glass transitions, and cabin shell profiles.
- **Physical Target:** ± 2.0 mm spatial accuracy.
- **Instrument Requirements:** Handheld high-resolution structured-light or blue-laser line scanner.

---

## MAC-C — Global Volume, Envelope, & Chassis Packaging

- **Scope:** Frame rail spacing, overall vehicle envelope, cab-to-axle distance, and spare tire carriage clearance.
- **Physical Target:** ± 5.0 mm spatial accuracy.
- **Instrument Requirements:** Class-1 Terrestrial LiDAR (e.g., Leica RTC360 or Focus3D) combined with multi-station spherical target registration.

---

## MAC-D — Visual/Textural Only

- **Scope:** Interior trim textures, engine bay non-structural wiring looms, and aesthetic branding markers.
- **Physical Target:** No dimensional authority.
- **Instrument Requirements:** DSLR photogrammetry without scale constraint (used purely for texture projection onto low-poly meshes).

---

## Relationship to DT-D002

DT-D002 established tiered accuracy (±2 / ±5 / ±10 mm). MAC classes refine that strategy with instrument requirements and feature-scope tagging. When both apply, **MAC class governs metrology claims**; DT-D002 tiers govern modeling tolerance budgets.

---

## Rejected Claim

Universal ≤ 0.05 mm tolerance (METRO-001) is **rejected** as unphysical for full-vehicle terrestrial LiDAR. See `L00_ADVERSARIAL_AUDIT.md` §3.
