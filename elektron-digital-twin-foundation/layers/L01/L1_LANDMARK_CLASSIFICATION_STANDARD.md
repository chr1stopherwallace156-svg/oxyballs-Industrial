# L1 Landmark Classification Standard

**Status:** `DRAFT`  
**Purpose:** Separate landmarks into classes so visual pose targets are not mistaken for engineering datums

---

## 1. Landmark Classes

```text
       [ ENGINEERING_DATUM_LANDMARK ]   --> Core theoretical coordinate center
                    |
       [ SCAN_REGISTRATION_LANDMARK ]   --> Immovable structural reference point
                    |
       [ PHOTOGRAMMETRY_LANDMARK ]      --> High-contrast surface visual anchor
                    |
       [ VISUAL_POSE_LANDMARK ]         --> Removable visual target for alignment
```

### A. Engineering Datum Landmark (`ENGINEERING_DATUM_LANDMARK`)

- **Definition:** A theoretical coordinate center (such as the wheel hub spin axis or vehicle centerline zero plane).
- **Properties:** Immovable, unalterable, and defined by design geometry.

### B. Scan Registration Landmark (`SCAN_REGISTRATION_LANDMARK`)

- **Definition:** An immovable, highly repeatable structural reference point (such as a frame rail corner or stamped frame hole).
- **Properties:** Extremely high physical repeatability. Cannot be easily altered or removed from the vehicle frame.

### C. Photogrammetry Landmark (`PHOTOGRAMMETRY_LANDMARK`)

- **Definition:** A high-contrast surface visual anchor (such as a metal seam intersection, glass corner, or rivet base).
- **Properties:** Good for matching points across overlapping photos. Highly visible but not a primary design datum.

### D. Visual Pose Landmark (`VISUAL_POSE_LANDMARK`)

- **Definition:** A visual feature useful for quick camera alignment (such as a wheel hub emblem or plastic brand badge).
- **Properties:** Easily modified or removed. These features can shift slightly on the physical truck and must **not** be used as primary engineering references.

---

## 2. Binding Rules

1. Pose estimation may use `VISUAL_POSE_LANDMARK` for approximate camera setup only.
2. Scan registration and metrology must prefer `SCAN_REGISTRATION_LANDMARK` or `ENGINEERING_DATUM_LANDMARK`.
3. V1 landmark registry entries that mixed hub ornaments with engineering roles are superseded by V2 class tagging.
4. Removable / trim-dependent features must set `removable_or_variable: true`.
