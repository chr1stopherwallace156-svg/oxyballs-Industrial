# L1 Visual Acceptance Standard

**Status:** `SUPERSEDED by L1_VISUAL_ACCEPTANCE_STANDARD_V2_PROPOSAL.md`  
**Applies when:** L01 visual assets are produced (not yet authorized)  
**Vehicle footprint target:** 145.3 in (3690.6 mm) wheelbase configuration

---

## Acceptance Criteria

### Geometric Precision

- Modeled wheelbase must match 145.3 in (3690.6 mm) to within ± 2.0 mm.
- Formula form (plain text):

```text
| L_model_mm - L_target_mm | <= 2.0
where L_target_mm = 145.3 * 25.4 = 3690.62  (round/report as 3690.6 mm unless source requires more precision)
```

- CA = 60.0 in target must likewise be reconciled to source before production acceptance.
- Frame outer width claim (34 in flat-surface C-channel) must be confirmed from Body Builder book before hard gate.

### Material Accuracy

- Materials use PBR metalness/roughness workflow.
- Chrome / mirror-class components: minimum reflectivity target 95% (research acceptance target pending look-dev signoff).

### Texture Density

- Minimum 2048 pixels per meter (px/m) on cab exterior panels for close-up angles.

### Seam Alignments

- Panel gaps (e.g., hood-to-fender) remain consistent.
- No intersecting meshes.
- No visible texture seams across body panels.

## Gate Language

Meeting these criteria is required for L01 visual acceptance. Research dossiers alone do **not** satisfy acceptance. Physical / licensed evidence must still back critical dimensions.
