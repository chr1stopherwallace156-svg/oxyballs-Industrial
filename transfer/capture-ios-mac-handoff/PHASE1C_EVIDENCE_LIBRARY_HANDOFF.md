# Phase 1C Evidence Library (Revised) — Mac handoff

- Status: `PHASE_1C_IMPLEMENTED_PENDING_DEVICE_VALIDATION`
- Capture-iOS tip: `4012df2dff631b161682b1273df9e51c403431ec`
- ZIP SHA-256: `16c8c63f584c6eb67305f6cc55e901243cc012b3ec0dde0e8371c766cdde63b6`
- Download: `DOWNLOAD-elektron-capture-ios-phase1c-evidence-library.zip`

## Architecture

- Truth: `captures/<id>/artifact_original.jpg` (write-once)
- Index: rebuildable catalog; relative paths only
- Staging: `.staging/<id>-<uuid>/` → read-back SHA → rename `captures/<id>/`
- States: capture · storage · package · export · integrity (orthogonal)
- Portable `.edts-pkg` export unchanged

## Linux verified

- `swift test` — 76 tests, 1 skip, 0 failures
- Mac xcodebuild / physical device: **pending** (do not claim `PHASE_1C_COMPLETE`)

## Device matrix (operator)

Force-quit, reboot, Airplane Mode, multi-capture isolation, package payload SHA, Share cancel — see Docs/Capture/PHASE_1C_EVIDENCE_LIBRARY.md
