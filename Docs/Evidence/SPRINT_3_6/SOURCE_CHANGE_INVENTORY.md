# Sprint 3.6 — Source change inventory

Relative to Sprint 3.5 delivery ZIP:

## Added
- `App/Domain/SpatialEvidence/DeviceSpatialPackageBuilder.swift`
- `Tests/Unit/Phase36AppleValidationGateTests.swift`
- `Scripts/sprint-3-6-apple-validation.sh`
- `make phase3-6-apple-validation-verify`
- `Docs/Evidence/SPRINT_3_6/**`
- `Docs/Capture/SPRINT_3_6_APPLE_HARDWARE_VALIDATION.md`

## Modified
- `App/Domain/SpatialEvidence/SpatialCaptureSessionCoordinator.swift` — protocol adapters + `appleProductionSession`
- `App/Domain/SpatialEvidence/SpatialEvidenceError.swift` — device identity / Apple host errors
- `App/Domain/SpatialEvidence/FixtureCoordinatedPackageBuilder.swift` — DEVICE seal restricted to iOS
- `App/AppleSensors/AppleProductionMotionSensorAdapter.swift` — adapter ID `apple.coremotion.motion`
- `Apps/Phase1StillCapture/Info.plist` — motion / world-sensing usage descriptions
- `Makefile`
