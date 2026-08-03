# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Official name | `SPRINT_3_2_POSE_AND_SPATIOTEMPORAL_CORRELATION` |
| Industrial baseline | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `ee46ffb7d8f986b508fe11486e2fddedb6afb740faa924c61d1fe7d6c7b63e21` |
| Linux tests (full) | 405 executed, 4 skipped, 0 failures |
| Phase32 filter | 22 executed, 1 skipped, 0 failures |
| Fixture package SHA-256 | `b4f595285825e0ab6264ea8eeb84b555812515ccd1c46a33e695c5f9fdd0ed16` |
| ARKit / device | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` until Sprint 3.6 |
| Merge class (when accepted) | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |
| Phase 4 / mesh / SfM / CAD | **None** |

## Dual planes

- **IMPLEMENTATION_STATE** = `SOURCE_IMPLEMENTED`
- **VALIDATION_STATE** = `APPLE_RUNTIME_UNVALIDATED` (Linux fixtures passed; Mac/device deferred to 3.6)

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip
cd elektron-capture-ios
make phase3-2-pose-verify
make phase3-1-rgb-motion-verify
make phase3-synthetic-verify
swift test
```

See `Docs/Evidence/SPRINT_3_2/`.
