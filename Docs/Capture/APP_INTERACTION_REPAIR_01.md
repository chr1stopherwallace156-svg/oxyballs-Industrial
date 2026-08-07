# App Interaction Repair 01 — delivery record

## Artifact

| Field | Value |
|---|---|
| File | `DOWNLOAD-elektron-capture-ios-app-interaction-repair-01.zip` |
| SHA-256 | `1063df0e126ebde1982ee4defda66026b9dc061893553f4125e1b29ee11d3700` |
| Size | 3,916,189 bytes |
| Entries | 2,270 (baseline 2,258 + 12 added) |
| Root folder | `elektron-capture-ios/` |
| Baseline | `DOWNLOAD-elektron-reconstruction-phase-4d-surface-foundation.zip` sha256 `bb54c481da50c9c42e444b523eb8a1b7a810d257fc30d59d842af591734f5be4` (PR #68) |
| Branch | `fix/app-interactions-refresh-delete` |

## Scope

Repairs the audited app-interaction defects only: Refresh feedback, error handling and
terminal-session safety; durable Delete Inspection; destructive-confirmation identity races;
inspection-detail action targeting; deletion dismissal and error reporting; plus tests.

No reconstruction, camera, Phase 4E, constitutional or Sentinel work. No changes to PR #68,
PR #69 or PR #70.

## Change census against the baseline

**12 added · 9 modified · 0 removed**

Added — `App/Phase1/Inspection/`: `InspectionRecordStore.swift`, `InspectionTombstone.swift`,
`InspectionDeletionService.swift`, `InspectionRefreshOutcome.swift`,
`InspectionStoreMigration.swift`, `InspectionActionScope.swift`.
Added — `Tests/Unit/`: `InspectionRecordStoreTests.swift`, `InspectionDeletionTests.swift`,
`RefreshOutcomeTests.swift`, `InspectionActionScopeTests.swift`.
Added — `Docs/Capture/`: `INSPECTION_PERSISTENCE_CONTRACT.md`, `APP_REPAIR_01_NOTES.md`.

Modified: `App/Phase1/Inspection/CurrentSessionRepository.swift`,
`App/Phase1/Inspection/InspectionSessionService.swift`,
`Apps/Phase1StillCapture/{AppSessionContainer,InspectionActionRouter,InspectionSessionViewModel,
EvidenceLibraryViews,InspectionReviewView,InspectionSessionViews}.swift`, `CHANGELOG.md`.

`Package.swift` and `project.pbxproj` are unchanged — the Xcode open-and-build path is
untouched, and the new code lands in targets that already exist.

## Retention policy

Deleting an inspection removes the **inspection record only**. Capture photos, sidecars,
packages and library index rows are retained intact and stay individually verifiable; they
appear under *"Evidence from deleted inspections"*. Quarantining capture media remains a
separate, explicitly user-initiated evidence action.

## Persistence migration

Store layout v1 (single `current_session.json` slot) → v2 (`inspections/<sessionID>.json` +
`archive.json` + `tombstones.json`). Idempotent behind `migration_v2.json`; non-destructive —
the v1 file is copied, never moved or deleted. Rollback: `InspectionStoreMigration.rollback`.

The **envelope** schema version is deliberately unchanged at v1. Bumping it against an empty
migration registry would have made every pre-repair envelope fail with `missingMigrationPath`.

## Verification state

```
SOURCE_IMPLEMENTED   = YES
LINUX_STRUCTURAL     = PASS (5 checks — NOT tests)
LINUX_COMPILED       = NOT_POSSIBLE (no Swift toolchain; download.swift.org blocked by policy)
AUTOMATED_TEST_STATE = NOT_RUN (39 tests shipped, never executed)
MAC_BUILD_STATE      = PENDING
MAC_RUNTIME_STATE    = PENDING
IPHONE_RUNTIME_STATE = PENDING
```

Linux structural checks performed: brace/paren/bracket balance across all 18 changed files;
`unarchiveSession` absent from every deletion path; no commit handler re-reading shared
`pending*` state; protocol-conformance completeness for all `InspectionRecordStore` and
`CurrentSessionRepository` implementations; `load()` free of any `clear()` call. Plus ZIP
integrity: extract round-trip byte-identical over all 1,905 files, and the recorded SHA-256
re-verified with `sha256sum -c`.

**No automated test has been executed.** First execution is on the reviewer's Mac.

## Mac instructions

```bash
cd ~/Downloads
shasum -a 256 DOWNLOAD-elektron-capture-ios-app-interaction-repair-01.zip
unzip -q DOWNLOAD-elektron-capture-ios-app-interaction-repair-01.zip
cd elektron-capture-ios
swift build && swift test
open Phase1StillCapture.xcworkspace
```
