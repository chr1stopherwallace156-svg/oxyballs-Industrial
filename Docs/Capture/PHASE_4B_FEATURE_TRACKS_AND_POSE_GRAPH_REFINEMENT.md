# Phase 4B — Feature Tracks and Pose-Graph Refinement

## Objective

Extend Phase 4A with deterministic multi-frame features, correspondences, tracks, and fixture-proven pose-graph refinement. Source SPKG poses remain immutable; refined poses are `RECONSTRUCTION_ESTIMATE` only.

## Commands

```bash
make phase4b-feature-pose-verify
swift test
swift run EmitPhase4BEvidence Docs/Evidence/PHASE_4B
```

## Authorities

- `evidence_origin_authority = TEST_FIXTURE`
- `geometry_reference_authority = TEST_FIXTURE_GROUND_TRUTH`
- `refined_pose_authority = RECONSTRUCTION_ESTIMATE`

## Explicit exclusions

- Production photogrammetry — FORBIDDEN
- Engineering metrology — FORBIDDEN
- Complete digital twin / dense fusion / production mesh — FORBIDDEN
- Physical device reconstruction — PENDING `SPKG-DEVICE-000001`

## Decision

D-029 in `docs/DECISION_REGISTER.md`.
