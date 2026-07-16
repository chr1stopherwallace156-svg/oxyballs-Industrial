# L1 Visual Acceptance Standard V2 Proposal

**Status:** `DRAFT — SUPERSEDES L1_VISUAL_ACCEPTANCE_STANDARD.md for ongoing gates`  
**Applies when:** L01 visual assets are produced (not yet authorized)

---

## 1. Geometric Tolerance Hierarchy

```text
                  GEOMETRIC TOLERANCE HIERARCHY

     [ nominal_design_geometry ]  --> Theoretical CAD coordinate space
                |
     [ physical_scan_geometry ]   --> Raw 3D point cloud measurements
                |
     [ visual_optimized_mesh ]    --> Rendered real-time asset
```

Do not conflate these layers. A visual mesh may meet provisional visual tolerance while still failing metrology against scan geometry.

---

## 2. Wheelbase Realignment

### Wording correction

Modeled wheelbase refers strictly to the **longitudinal distance between the front axle spindle centerline and the rear axle spindle centerline**. It does **not** refer to overall vehicle length.

### Nominal (locked configuration profile)

```text
wheelbase = 145.3 in
wheelbase = 3690.6 mm nominal
```

Plain-text check:

```text
| L_model_mm - L_target_mm | <= 2.0
where L_target_mm = 145.3 * 25.4 = 3690.62  (report as 3690.6 mm unless source requires more precision)
```

### Permitted visual-model tolerance

```text
visual_model_tolerance = +/- 2.0 mm
```

Status: **PROVISIONAL_SPECIFICATION_ONLY** (`CLM-015`).

---

## 3. Track Width Realignment

### Front track (research / document-supported pending archive)

```text
track_width_front = 74.8 in
track_width_front = 1900.0 mm nominal
```

**Authority:** DRAFT — must be reconciled against archived BBAS before VERIFIED. Do not treat as locked.

### Permitted tolerance

```text
track_width_tolerance = +/- 3.0 mm
```

Status: **PROVISIONAL**.

---

## 4. Material / Texture Gates (unchanged class, corrected PBR)

- PBR metalness/roughness workflow required.
- Coated surfaces: metalness = 0.0 (see `L1_MATERIAL_PBR_CORRECTION.md`).
- Chrome / mirror-class reflectivity target 0.95 remains **UNVERIFIED** (`CLM-013`).
- Texture density 2048 px/m remains **PROVISIONAL_SPECIFICATION_ONLY** (`CLM-014`).

## 5. Seam Alignments

- Panel gaps consistent; no intersecting meshes; no visible texture seams across body panels.
- Door gap numeric claim remains **RESEARCH_REQUIRED** (`CLM-001`).

## 6. Gate Language

Meeting these criteria is required for L01 visual acceptance **after** factual verification. Research dossiers alone do not satisfy acceptance. Current gate: `L1_REQUIRES_MORE_REFERENCE_DATA`.
