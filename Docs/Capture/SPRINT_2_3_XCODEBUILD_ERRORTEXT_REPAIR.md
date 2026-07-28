# Sprint 2.3 — Phase1StillCapture Mac build-gate repairs

| Field | Value |
|---|---|
| Capture tip | `0bf622d` |
| Package tests | **PASSED** (338 executed, 1 skipped, 0 failures) |
| Mac `xcodebuild` | Re-run on Mac (Linux host = `BLOCKED_HOST_CAPABILITY`) |
| ZIP | `DOWNLOAD-elektron-capture-ios-sprint-2-3-xcodebuild-errortext.zip` |

## Repair 1 — private(set) errorText (accepted)

- Kept `@Published private(set) var errorText`
- Added `presentError(_:)` / `clearError()`
- Replaced external writes in `AppSessionContainer` / `InspectionReviewView`

## Repair 2 — SwiftUI type-check timeout

**File:** `Apps/Phase1StillCapture/EvidenceLibraryViews.swift` (`InspectionEvidenceGroupDetailView`)

**Why the checker struggled:** one `body` expression combined a large `List` ViewBuilder (nested `ForEach` / `Section` / `Menu` / `Task` / `EvidenceActionModifier`) with a long chain of navigation, toolbar, confirmationDialog, sheet, and alert modifiers. Generic inference cost exploded; Xcode reported the failure near the add-required-photo `Button` (~line 481).

**What changed:** split into staged computed properties and `@ViewBuilder` helpers (`detailRoot`, `inspectionList`, `pointSection`, `pointActionsMenu`, `detailWithNavigation`, `detailWithSheetsAndAlerts`, `detailWithConfirmationDialogs`). Behavior preserved.

## Mac gate

```bash
cd /path/to/elektron-capture-ios
set -o pipefail
xcodebuild \
  -project Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO \
  clean build 2>&1 | tee build.log
```
