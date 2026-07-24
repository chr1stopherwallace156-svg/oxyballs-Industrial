# Capture-iOS Mac Handoff — CANDIDATE (not validated)

**Status:** `CANDIDATE_ONLY` — do **not** treat as physically validated.

| Field | Value |
|-------|-------|
| Pinned commit | `005382b06c0e88053aad298f4e4650cd45f49306` (`005382b`) |
| Commit subject | fix(xcode): harden local ElektronCapture package handoff |
| Minted (UTC) | 20260724T051200Z |
| Bundle file | `elektron-capture-ios-005382b.bundle` (also `elektron-capture-ios-complete.bundle`) |
| Bundle SHA-256 | `b04157c9e3060e7c218f2d70bf97c3f8f2e340d671da4d85bc510b9f74ecd7db` |
| Bundle bytes | 250507 |
| Bundle refs | `HEAD`, `main`, `master` → `005382b06c0e88053aad298f4e4650cd45f49306` |
| ZIP file | `elektron-capture-ios-005382b.zip` (also `elektron-capture-ios-working-tree.zip`) |
| ZIP SHA-256 | `863b070fa1be9d9fc62b31d683219d0ff265dde3c72b205e0e9b984004830c1d` |
| ZIP bytes | 242959 |
| Cloud layout verify | `HANDOFF_LAYOUT_OK` |
| Cloud `swift test` on clean clone of pin | Executed 47 tests, with 1 skipped and **0 failures** |
| Physical iPhone proof | **PENDING** |
| Validated label | **NOT APPLIED** |

## Required contents (verified in export)

- `Package.swift`
- `Phase1StillCapture.xcworkspace`
- `Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace`
- `Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj`
- `Scripts/verify-xcode-handoff.sh`

## Mac order (do not skip)

1. Fresh clone folder (do not reuse old Downloads tree)
2. `git rev-parse HEAD` must be `005382b06c0e88053aad298f4e4650cd45f49306`
3. `./Scripts/verify-xcode-handoff.sh` → `HANDOFF_LAYOUT_OK`
4. `swift test` → 0 failures
5. `open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace`
6. Build on physical iPhone → Capture & Export proof

## Clone

```bash
cd ~/Downloads
mv elektron-capture-ios elektron-capture-ios-old-20260723 2>/dev/null || true
git clone elektron-capture-ios-005382b.bundle elektron-capture-ios-005382b
# or: git clone elektron-capture-ios-complete.bundle elektron-capture-ios-005382b
cd elektron-capture-ios-005382b
git rev-parse HEAD
git status --short
chmod +x Scripts/verify-xcode-handoff.sh
./Scripts/verify-xcode-handoff.sh
swift test
```

Reject any prior tip based on `4bc8ae6` for this gate.
