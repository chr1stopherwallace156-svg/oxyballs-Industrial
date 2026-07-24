# Phase 1C Evidence Library — Mac handoff

- Capture-iOS tip (branch HEAD): `8bf0e1776d747448dd654feb9ca2fe4cb8a50b4d`
- Feature commit: `e03fbc61330a5d1812e44ff29afc7d66befa0ccb`
- ZIP: `DOWNLOAD-elektron-capture-ios-phase1c-evidence-library.zip`
- SHA-256: `1c06c282125220dfa5c932716cab43a6fe87fd8e5250f49160eb5e981b4f3741`

## What this is

Persistent local Evidence Library under Application Support. Portable `.edts-pkg` export unchanged.

## Linux verified

- `swift test` — 74 tests, 1 skip, 0 failures (includes EvidenceLibraryTests)
- Mac `xcodebuild` / physical device: **HANDOFF_XCODE_BUILD_SKIPPED** / manual

## Open

```bash
unzip DOWNLOAD-elektron-capture-ios-phase1c-evidence-library.zip
cd elektron-capture-ios
make doctor
open Phase1StillCapture.xcworkspace
```

Tabs: Capture | Evidence Library
