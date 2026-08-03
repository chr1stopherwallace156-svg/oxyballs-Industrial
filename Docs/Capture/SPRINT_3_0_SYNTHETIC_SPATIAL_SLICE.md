# Sprint 3.0 — Synthetic Spatial Evidence Vertical Slice

| Field | Value |
|---|---|
| Authoritative source ZIP (pre-work) | `DOWNLOAD-elektron-capture-ios-sprint-2-3-xcodebuild-errortext.zip` |
| Pre-work ZIP SHA-256 | `23672c5a521e593df423c5ade7609f3b1a2b78de2da8a795b2e31456499bf0b2` |
| Pre-work tip (ZIP manifest) | `09a3c36f8413ac59608572d665d08c0b3c4e2c75` |
| Reviewed pre-hardening PR tip | `d9aea20c8c4b8339edf293470f4dd82c0ec8b3b1` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Delivery ZIP SHA-256 | `e0576c87a0d61ffe5d7a780943c9a6b2342ba37e9db26f9e8bda0aced914e47c` |
| Package content SHA-256 | `b11c9e73d1569102b14dd1c36a93b64a9735b6c88ea13bb639d49567fb14c09d` |
| Linux tests | 361 executed, 2 skipped, 0 failures |
| Mac xcodebuild | `BLOCKED_HOST_CAPABILITY` |
| Device | `BLOCKED_HOST_CAPABILITY` |
| Phase 4 / production adapters | None |
| Audit v1.0 archive SHA-256 | `b4be3f54363ad669abbcba9d5eef1206e65c2960df003ee9a48f71c0d295b132` |

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip
cd elektron-capture-ios
make phase3-synthetic-verify
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
