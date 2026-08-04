# Phase 4C — Dense Fusion and Point-Cloud Filtering

Deterministic fixture fusion of Phase 4B refined-pose registered observations into a confidence-aware consolidated point cloud suitable for Phase 4D surface candidates.

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
