# Sprint 3.2 — Pose + Spatiotemporal Correlation (domain refinements)

| Field | Value |
|---|---|
| Official name | `SPRINT_3_2_POSE_AND_SPATIOTEMPORAL_CORRELATION` |
| Industrial baseline SHA | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 **MERGED**) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `266d386d1ec7fa702c92bbd3c3da6be98e726dad15d816feedeccb8a893d4685` |
| Draft PR | https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/pull/57 |
| Linux `swift test` | 411 executed, 4 skipped, 0 failures |
| Phase32 filter | 28 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| Fixture package SHA-256 | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Phase 4 / mesh / SfM / CAD | **None** |

## Dual planes

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` |
| VALIDATION_STATE | `APPLE_RUNTIME_UNVALIDATED` / `DEFERRED_TO_3_6` |

## Domain refinements (locked)

1. **Authority separation:** `evidence_origin_authority=TEST_FIXTURE` vs `pose_estimate_authority=GUIDANCE_ESTIMATE`
2. **Cycle logic:** reciprocal transforms permitted when consistent inverses; reject inconsistent/ambiguous/degenerate (zero) transforms; reject length≥3 cycles
3. **ARKit world epochs:** `frame_epoch_id`, `session_run_id`, `world_origin_revision` — cross-epoch joins fail closed
4. **Integration fixture:** dual-stream camera+pose `SPKG-FIXTURE-CAMERA-POSE-000001` (motion/depth `NOT_REQUESTED`)

## Official completion status

```text
POSE_DOMAIN_CONTRACTS              = IMPLEMENTED
FRAME_GRAPH_VALIDATOR              = IMPLEMENTED
CLOCK_CORRELATION_VALIDATOR        = IMPLEMENTED
ARKit_SOURCE_CANDIDATE             = IMPLEMENTED (Gated)
ARKit_COMPILED_ON_MAC              = PENDING (Deferred to 3.6)
ARKit_PHYSICAL_RUNTIME             = PENDING (Deferred to 3.6)
MERGE_CLASSIFICATION               = SOURCE_FOUNDATION_MERGED / APPLE_RUNTIME_UNVALIDATED
```
