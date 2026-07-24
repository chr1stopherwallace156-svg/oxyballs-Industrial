# Capture-iOS Mac Handoff — CANDIDATE (lifecycle / black-frame instrumentation)

**Status:** `CANDIDATE_ONLY` — not Phase 1 complete; not physically revalidated after this change.

| Field | Value |
|-------|-------|
| Pinned commit | `413dfe59efd567777e16d289d4f054d30c571fac` (`413dfe5`) |
| Subject | feat(capture): lifecycle logs, preview shutter, black-frame guard |
| Minted (UTC) | 20260724T055241Z |
| Bundle SHA-256 | `1f39196a90e5e9d875bf47d093105b7f407a9faa52b39b207ba7536e2b2766a6` |
| ZIP SHA-256 | `ecab86c7b5b067e7661997b2338727e45f96d9c99f4a9fdc9a19c34fa7939a81` |
| Cloud `swift test` | Executed 58 tests, 1 skipped, **0 failures** |
| Physical black-frame root cause | **UNDER INSTRUMENTATION** (do not assume AE-only) |
| Phase 1 completion | **INCOMPLETE** |

## Mac gates

1. Fresh clone of bundle → `git rev-parse HEAD` = `413dfe59efd567777e16d289d4f054d30c571fac`
2. `./Scripts/verify-xcode-handoff.sh` → `HANDOFF_LAYOUT_OK`
3. `swift test` → 0 failures (incl. CrossLanguageCanonicalJSON on Darwin)
4. Open `Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace`
5. Preview → Shutter → Retake/Export; collect lifecycle log lines
6. If effectively black → expect `CAPTURE_QUALITY_IMAGE_EFFECTIVELY_BLACK` without mutating JPEG bytes
