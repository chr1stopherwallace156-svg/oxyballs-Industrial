# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Industrial baseline | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 merged) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `266d386d1ec7fa702c92bbd3c3da6be98e726dad15d816feedeccb8a893d4685` |
| Linux tests | 411 executed, 4 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| Fixture SHA-256 | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Merge class | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |

## Domain refinements

- Authority split: evidence origin vs pose estimate
- Reciprocal-safe transform graph validator
- AR world epoch identity fields
- Dual-stream camera+pose fixture (no fake motion/depth)

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip
cd elektron-capture-ios
make phase3-2-pose-verify
swift test
```
