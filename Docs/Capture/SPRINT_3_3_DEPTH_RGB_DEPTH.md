# Sprint 3.3 — Depth and RGB/Depth Association

| Field | Value |
|---|---|
| Industrial baseline | `79eaea609a62179c321654d4b170ad1282a0d9dd` (PR #57 merged) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-3-depth-rgb-depth.zip` |
| Delivery ZIP SHA-256 | `640df9abc19d3b7d73e59f5ee84f605e18fd7caccae5f9ef4c7ad03309787357` |
| Primary fixture | `SPKG-FIXTURE-CAMERA-DEPTH-000001` |
| Non-LiDAR fixture | `SPKG-FIXTURE-NONLIDAR-DEPTH-000001` (`UNAVAILABLE_DEVICE`) |
| Apple depth | `APPLE_DEPTH_SOURCE_CANDIDATE_UNCOMPILED` |
| Merge class when accepted | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-3-depth-rgb-depth.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-3-depth-rgb-depth.zip
cd elektron-capture-ios
make phase3-synthetic-verify
make phase3-1-rgb-motion-verify
make phase3-2-pose-verify
make phase3-3-depth-verify
swift test
```
