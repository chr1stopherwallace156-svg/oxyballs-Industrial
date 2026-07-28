# Sprint 2.3 — Phase1StillCapture errorText build-gate repair

| Field | Value |
|---|---|
| Capture tip | `40e25e6` |
| Status | Package tests **PASSED** (338 executed, 1 skipped, 0 failures). Mac `xcodebuild` **BLOCKED_HOST_CAPABILITY** on Linux cloud agent. |
| ZIP | `DOWNLOAD-elektron-capture-ios-sprint-2-3-xcodebuild-errortext.zip` |

## Root cause

`InspectionSessionViewModel.errorText` is `@Published private(set)`, but presentation code assigned it from outside the type (`AppSessionContainer`, `InspectionReviewView`), which fails compilation under Xcode.

## Repair

- Keep `private(set)`
- Add `presentError(_:)` / `clearError()`
- Replace external writes with those methods
- Leave `EvidenceLibraryViews` model `errorText` writable (unrelated type)

## External mutations replaced

1. `Apps/Phase1StillCapture/AppSessionContainer.swift` — identity-divergence → `presentError(...)`
2. `Apps/Phase1StillCapture/InspectionReviewView.swift` — alert Binding set → `clearError()`
3. `Apps/Phase1StillCapture/InspectionReviewView.swift` — OK button → `clearError()`

## Mac gate (run on Mac)

```bash
set -o pipefail
xcodebuild \
  -project Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO \
  clean build 2>&1 | tee build.log
```

## Classification (this host)

`SPRINT_2_3_MAC_XCODEBUILD_FAILED` — blocked: host lacks `xcodebuild` (`BLOCKED_HOST_CAPABILITY`). Repair is compiled-in Capture tip `40e25e6`; Mac must re-run the gate to claim PASSED.
