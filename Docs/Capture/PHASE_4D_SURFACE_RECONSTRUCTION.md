# Phase 4D — Surface reconstruction (fixture)

Deterministic fixture surface meshing from Phase 4C fused point clouds + normals into a confidence-aware open mesh candidate suitable for Phase 4E scale/datum characterization.

## Boundary
- Input: Phase 4C fused cloud, normals, gaps, conflicts, lineage, `phase4d_handoff_contract.json`
- Output: surface mesh candidate (JSON + PLY/OBJ/GLB LODs), topology/boundaries/holes, Phase 4E handoff
- Does **not** claim production mesh, engineering metrology, manufacturing, or complete digital twin
- Automatic hole fill is forbidden in fixture policy

## Authorities
- Evidence origin: `TEST_FIXTURE`
- Geometry reference: `TEST_FIXTURE_GROUND_TRUTH`
- Surface estimate: `RECONSTRUCTION_ESTIMATE`
