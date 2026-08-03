# Sprint 3.2 — Pose + Spatiotemporal Correlation (hardening)

| Field | Value |
|---|---|
| Official name | `SPRINT_3_2_POSE_AND_SPATIOTEMPORAL_CORRELATION` |
| Industrial baseline SHA | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 **MERGED**) |
| Reviewed pre-hardening head | `6479758f6c724d71df0b504b15d380e576cc8c6a` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `c254db32b9d76d4bf00307f37f357a9ab81d985cd8e7a2a4248b26875d9eca77` |
| Draft PR | https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/pull/57 |
| Linux `swift test` | 421 executed, 4 skipped, 0 failures |
| Phase32 filter | 38 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| Fixture package SHA-256 | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| Fixture manifest SHA-256 | `4db6ce41015f3a1b3950e71e0f03e7c91844a9a3544011c19a3cb7a411e51c54` |
| Capability schema | `SpatialCapabilitySnapshot@1.0.0-phase3-fixture` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Validation | `APPLE_RUNTIME_UNVALIDATED` / `DEFERRED_TO_3_6` |
| Phase 4 / Sprint 3.3 | **None** |

## Dual planes

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` |
| VALIDATION_STATE | `LINUX_FIXTURE_VALIDATED` (Apple runtime unvalidated) |

## Hardening corrections

1. Capability schema `1.0.0-phase3-fixture` (standalone ≡ embedded)
2. Motion evidence stripped from primary camera-pose fixture (`NOT_REQUESTED`)
3. Pose associations bound to `correlation_id` + epoch proof
4. Transform edges bound to epoch + `source_sample_id`
5. Cycle classifications: CONSISTENT_RECIPROCAL / INCONSISTENT_RECIPROCAL / AMBIGUOUS / DEGENERATE / UNSUPPORTED_COMPLEX_CYCLE
6. D-020 Status: Proposed; Activation upon merge of PR #57

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
