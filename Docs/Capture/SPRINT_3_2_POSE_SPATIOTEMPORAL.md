# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Industrial baseline | prior Sprint 3.1 draft lineage |
| Source worktree | `.scratch-elektron-capture-ios` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `ee46ffb7d8f986b508fe11486e2fddedb6afb740faa924c61d1fe7d6c7b63e21` |
| Linux tests (full) | 405 executed, 4 skipped, 0 failures |
| Phase32 filter | 22 executed, 1 skipped, 0 failures |
| Fixture package SHA-256 | `b4f595285825e0ab6264ea8eeb84b555812515ccd1c46a33e695c5f9fdd0ed16` |
| ARKit / device | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` until Sprint 3.6 |
| Phase 4 / mesh / SfM / CAD | **None** |

## Dual planes

- **IMPLEMENTATION_STATE** = `SOURCE_IMPLEMENTED`
- **VALIDATION_STATE** = `LINUX_FIXTURE_VALIDATED` (not physical-device)

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
