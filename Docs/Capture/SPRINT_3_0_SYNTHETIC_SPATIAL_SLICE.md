# Sprint 3.0 — Synthetic Spatial Evidence Vertical Slice

| Field | Value |
|---|---|
| Authoritative source ZIP (pre-work) | `DOWNLOAD-elektron-capture-ios-sprint-2-3-xcodebuild-errortext.zip` |
| Pre-work ZIP SHA-256 | `23672c5a521e593df423c5ade7609f3b1a2b78de2da8a795b2e31456499bf0b2` |
| Pre-work tip (ZIP manifest) | `09a3c36f8413ac59608572d665d08c0b3c4e2c75` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Delivery ZIP SHA-256 | `02d26c55da3535bbbdb2ecb2ccf5f001305fddfcdf1a53dc8d2fcefa5b7aaa68` |
| Package content SHA-256 | `da1df63fe76e4e303a86f23ad190da9e5a0c7505557efffb9fdec7b9da4b3b18` |
| Linux tests | 359 executed, 2 skipped, 0 failures (baseline 338 / 1 skip / 0 fail; +20 new Phase 3 + 1 skippable golden writer) |
| Mac xcodebuild | `BLOCKED_HOST_CAPABILITY` |
| Device | `BLOCKED_HOST_CAPABILITY` |
| Phase 4 code | None |

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip
cd elektron-capture-ios
swift test
```

## Mac gate (when host available)

```bash
xcodebuild \
  -project Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO \
  clean build
```
