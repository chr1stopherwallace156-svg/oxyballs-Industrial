# Phase 4C: Dense fusion and point-cloud filtering foundation

Stacks on Phase 4B tip `f54b63e`. Main remains Sprint 3.7; merge order: #63 → #64 → #65 → #66.

## Mathematical foundation (this revision)
- Weighted fusion `w_i = c_depth * c_pose * max(0, cos(θ_i))^γ` (γ=1.5)
- 5mm deterministic voxel grid (`fixture_default_voxel_size_meters = 0.005`)
- Voxel-index k-NN outlier detection (`d_k > μ + α·σ`)
- Covariance PCA normals (Jacobi 3×3 eigen-decomposition)
- Separated `fixture_truth.json` with committed offsets (no platform PRNG)
- Abs/rel epsilon numeric policy; CanonicalJSON unchanged

## Fixture results
| Field | Value |
|---|---|
| input_package_id | `SPKG-FIXTURE-DENSE-FUSION-000001` |
| consolidated_point_count | 47 |
| valid_normal_count | 47 |
| occupied_voxel_count | 49 |
| phase4d_readiness | `READY_FOR_SYNTHETIC_SURFACE_CANDIDATE` |
| fused_point_cloud_sha256 | `35b3c3b17a915b941db840a6d7facd221fffbc8eb35d0712b0474d66ae22433a` |
| output_closure_sha256 | `1c6da5ddbbfae1d7103d488a851d714fea72bd7d6312b04399ee1e5455ac80ab` |

## Verification
- Full suite: **682 / 7 skipped / 0 failed**
- `make phase4c-dense-fusion-verify` (26 tests)
- Decision: **D-030**

## Non-claims
Production dense fusion · surface mesh · metrology · digital twin · physical device package
