# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Industrial baseline | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 merged) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `c254db32b9d76d4bf00307f37f357a9ab81d985cd8e7a2a4248b26875d9eca77` |
| Linux tests | 421 executed, 4 skipped, 0 failures |
| Phase32 | 38 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| Fixture package SHA-256 | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| Fixture manifest SHA-256 | `4db6ce41015f3a1b3950e71e0f03e7c91844a9a3544011c19a3cb7a411e51c54` |
| Capability schema | `SpatialCapabilitySnapshot@1.0.0-phase3-fixture` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Merge class when accepted | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |

## Hardening

- Capability standalone ≡ embedded (`1.0.0-phase3-fixture`)
- Primary package strips motion evidence while keeping motion `NOT_REQUESTED`
- Associations bound to `correlation_id` + epoch fields
- Transform edges bound to epoch + `source_sample_id`
- Cycle classifications include `UNSUPPORTED_COMPLEX_CYCLE`

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip
cd elektron-capture-ios
make phase3-synthetic-verify
make phase3-1-rgb-motion-verify
make phase3-2-pose-verify
swift test
```
