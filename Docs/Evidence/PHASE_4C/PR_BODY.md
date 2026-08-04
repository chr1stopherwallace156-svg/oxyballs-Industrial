# Phase 4C: Dense fusion and point-cloud filtering foundation

Stacks on Phase 4B tip `f54b63e3b920c9ce4ed94d4fa77602017d4545c3` (PR #65). Main remains Sprint 3.7 (`a62aa7f`); merge order when ready: #63 → #64 → #65 → this PR.

## What this delivers
Deterministic voxel-hash dense fusion over Phase 4B-shaped refined-pose registered observations:
- eligibility / coordinate / numeric policy contracts
- confidence-weighted contributions with versioned fixture weights
- duplicate consolidation with contributor lineage
- outlier rejection + contradictory quarantine (auditable)
- point normals where neighborhood permits
- density / gap classifications (no COMPLETE_SURFACE claims)
- Phase 4D handoff contract (`READY_FOR_SYNTHETIC_SURFACE_CANDIDATE`) — **no mesh**

## Fixture results
| Field | Value |
|---|---|
| input_package_id | `SPKG-FIXTURE-DENSE-FUSION-000001` |
| fixture_geometry_id | `GEOM-FIXTURE-MULTIVIEW-SURFACE-000001` |
| reconstruction_output_id | `RECON-OUT-FIXTURE-DENSE-FUSION-000001` |
| phase4b_input_point_count | 45 |
| fusion_contribution_count | 52 |
| accepted / rejected / quarantined | 49 / 3 / 1 |
| occupied_voxel_count | 15 |
| consolidated_point_count | 13 |
| valid_normal_count | 13 |
| phase4d_readiness | `READY_FOR_SYNTHETIC_SURFACE_CANDIDATE` |
| fused_point_cloud_sha256 | `e2864a73bb6a1a7df7235fed067a6fd3ad24036445eb8cb80f084634fd58ca2d` |
| output_closure_sha256 | `5b19f3fde3aa3d2d92b5174c22084505c37e84d97fe889a1a28fbceefb66cc03` |

## Verification
- Full suite: **678 executed / 7 skipped / 0 failed**
- `make phase4c-dense-fusion-verify` (22 tests)
- Clean ZIP restore of Phase 4C filter: PASS
- Delivery: `DOWNLOAD-elektron-reconstruction-phase-4c-dense-fusion.zip`
- Decision: **D-030**

## Non-claims (explicit)
Production dense fusion · surface mesh · engineering metrology · complete digital twin · physical device package
