# RL-032 — GLB acquisition specification (EDTS-SPEC-3D-001)

**Decision:** DT-D063  

## Question

What technical criteria gate purchase / authoring of the VPR-2 demonstrator GLB?

## Findings

1. Config boundary locked to Regular Cab 4×2 DRW 145.3 WB / 60 CA bare chassis.
2. Delivery: GLB, meters, +Y up, front-axle origin, &lt;25 MB, ≤150k tris, ≤30 materials.
3. Separable `GEO_*` nodes mapped in `mesh_mapping_manifest.json` (≥5 `comp_id`s).
4. `verifyMeshMapping()` + QA checklist required before Tier-2 admit.
5. Powertrain PROXY naming; cab name without material assertion.
6. No GLB binary admitted yet — procedural placeholders remain.

## Status

DT-D063 — `SPEC_3D_001_ACCEPTED_GLB_NOT_YET_ACQUIRED`.
