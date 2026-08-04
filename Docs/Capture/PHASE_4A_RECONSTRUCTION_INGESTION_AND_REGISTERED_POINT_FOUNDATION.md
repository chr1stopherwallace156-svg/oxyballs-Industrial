# Phase 4A — Reconstruction Ingestion and Registered Point Foundation

## Objective

Build the first deterministic reconstruction-engine foundation that consumes verified Spatial Evidence Packages and produces eligibility, normalized observations, keyframes, registered fixture points, quality records, and lineage.

## Commands

```bash
make phase4a-reconstruction-verify
swift test
swift run EmitPhase4AEvidence Docs/Evidence/PHASE_4A
```

## Authorities

- `evidence_origin_authority = TEST_FIXTURE`
- `geometry_reference_authority = TEST_FIXTURE_GROUND_TRUTH`
- Fixture thresholds: `DETERMINISTIC_TEST_FIXTURE` / `NO_SYSTEM_TOLERANCE_ASSIGNED`

## Explicit exclusions

- Engineering metrology / certified tolerances — FORBIDDEN
- Complete vehicle point cloud / production mesh / digital twin — FORBIDDEN
- Physical device reconstruction — PENDING `SPKG-DEVICE-000001`
- General SfM feature matching / pose optimization expansion — later Phase 4

## Decision

D-028 in `docs/DECISION_REGISTER.md`.
