# Phase 4C — Dense Fusion and Point-Cloud Filtering

Deterministic fixture fusion of Phase 4B refined-pose registered observations into a confidence-aware consolidated point cloud suitable for Phase 4D surface candidates.

## Mathematical policy (fixture)
- Voxel size default: 0.005 m
- Weight: `w_i = c_depth * c_pose * max(0, cos(θ_i))^γ` (γ = 1.5)
- Normals: covariance PCA (Jacobi eigen-decomposition)
- Outliers: voxel-index k-NN (`d_k > μ + α·σ`)
- Numeric compare: `|a-b| < (1e-7 + 1e-5·max(|a|,|b|))` — test rule only
- Truth file: `fixture_truth.json` (committed offsets; no platform PRNG)

## Verify
```
make phase4c-dense-fusion-verify
swift run EmitPhase4CEvidence Docs/Evidence/PHASE_4C
```

## Authorities
- evidence_origin_authority = TEST_FIXTURE
- geometry_reference_authority = TEST_FIXTURE_GROUND_TRUTH
- fusion_output_authority = RECONSTRUCTION_ESTIMATE

## Non-claims
No production mesh, metrology, component recognition, or digital twin.
