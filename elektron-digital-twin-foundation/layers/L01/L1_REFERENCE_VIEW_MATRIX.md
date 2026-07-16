# L1 Reference View Matrix

**Status:** `DRAFT`  
**Scope:** required camera views for exterior surface verification and photogrammetry planning  
**Vehicle:** 2019 Ford F-450 Chassis Cab — Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA  
**Coordinate convention:** Three.js Spherical relative to vehicle visual center (see `THREE_CAMERA_AND_WORLD_STANDARD.md`)

---

## 1. Goal

Define physical views required to capture the entire exterior of the F-450 chassis cab for surface verification and photogrammetry.

## 2. Spherical Coordinate System

Angle definitions (Three.js Spherical conventions):

### Polar Angle (θ)

Measured downward from the positive Y axis (world up):

- θ = 0 rad (0°): looking straight down from above (top-down)
- θ = π/2 rad (90°): eye-level view with the horizon

### Azimuth Angle (φ)

Measured around the Y axis:

- φ = 0 rad (0°): looking straight at the front of the vehicle (facing the grille)
- Positive azimuth (φ > 0) rotates counterclockwise when looking from above, swinging toward the vehicle left-hand side (viewer right)

```
         +Y (Up)
          |   / (Polar offset theta)
          |  /
          | /
          |/_____ +Z (Forward, Azimuth phi = 0)
         /
        /
      +X (Left, Azimuth phi = +pi/2)
```

**Note:** This Three.js camera spherical convention is for capture planning. Authoritative engineering frame remains `EDTS_ISO_ALIGNED_VEHICLE_FRAME` (+X forward, +Y left, +Z up).

## 3. Reference Captures

| Capture ID | Name | Polar θ (rad) | Azimuth φ (rad) | Target Anchor | View Description |
|---|---|---|---|---|---|
| CAP-FRONT | Direct Front | 1.5708 (90°) | 0.0 (0°) | VEHICLE_VISUAL_CENTER | Level view facing front grille and bumper |
| CAP-FRONT-LH | Front-Left 45 | 1.3963 (80°) | 0.7854 (45°) | VEHICLE_VISUAL_CENTER | Low-angle isometric showing front and left side |
| CAP-SIDE-LH | Left Profile | 1.5708 (90°) | 1.5708 (90°) | VEHICLE_VISUAL_CENTER | Profile perpendicular to driver door |
| CAP-REAR-LH | Rear-Left 45 | 1.3963 (80°) | 2.3562 (135°) | VEHICLE_VISUAL_CENTER | Three-quarter rear of C-channel frame rails |
| CAP-REAR | Direct Rear | 1.5708 (90°) | 3.1416 (180°) | VEHICLE_VISUAL_CENTER | Dead-on chassis frame ends |
| CAP-TOP | Ortho Zenith | 0.0000 (0°) | 0.0 (0°) | VEHICLE_VISUAL_CENTER | Top-down cab roof and bare frame rails |

## 4. Binding Notes

- Prefer dynamic camera presets over corrective root transforms (`THREE_CAMERA_AND_WORLD_STANDARD.md`).
- These captures are planning targets, not executed photogrammetry.
- Distance / FOV remain open until physical capture protocol is written.
