# Sprint 3.3 — Source change inventory

Capture delivery changes relative to Sprint 3.2 ZIP (parent):

## Added
- `App/Domain/SpatialEvidence/DepthDomainContracts.swift`
- `App/Domain/SpatialEvidence/DepthValidators.swift`
- `App/Domain/SpatialEvidence/FixtureCameraDepthPackageBuilder.swift`
- `App/Domain/SpatialEvidence/FixtureNonLidarDepthPackageBuilder.swift`
- `App/AppleSensors/AppleARKitDepthSensorAdapter.swift`
- `Tests/Unit/Phase33DepthRGBAssociationTests.swift`
- `Docs/Evidence/SPRINT_3_3/**`
- `Docs/Capture/SPRINT_3_3_DEPTH_RGB_DEPTH.md`
- `make phase3-3-depth-verify`

## Modified
- `App/Domain/Models/EvidenceAuthority.swift` — `fixture_camera` / `fixture_depth` clock domains
- `App/Domain/SpatialEvidence/SpatialCapabilitySnapshot.swift` — UNAVAILABLE_DEVICE / CONFIG / ACTIVATION_FAILED / INTERRUPTED_AFTER_ACTIVATION
- `App/Domain/SpatialEvidence/SpatialSampleEnvelope.swift` — expanded `DepthSample`
- `App/Domain/SpatialEvidence/SpatialEvidenceError.swift` — depth errors
- `App/Domain/SpatialEvidence/SpatialEvidencePackage.swift` — DepthSample/Calibration fixture schemas
- `App/Domain/SpatialEvidence/ProductionSensorAdapters.swift` — depth error cases
- `App/Domain/SpatialEvidence/ControllableSensorAdapters.swift` — `ControllableDepthSensorAdapter` + camera clock override
- `Makefile` — phase3-3-depth-verify
