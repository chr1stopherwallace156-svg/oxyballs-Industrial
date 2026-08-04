# Phase 4A — Source change inventory

Relative to Sprint 3.8 delivery ZIP (`DOWNLOAD-elektron-capture-ios-sprint-3-8-privacy-field-transfer.zip`).

## Added
- `App/Domain/Reconstruction/ReconstructionFoundationTypes.swift`
- `App/Domain/Reconstruction/ReconstructionObservationAndFrames.swift`
- `App/Domain/Reconstruction/DepthPoseRegistrationEngine.swift`
- `App/Domain/Reconstruction/ReconstructionQualityAndLineage.swift`
- `App/Domain/Reconstruction/ReconstructionPipeline.swift`
- `App/Domain/SpatialEvidence/FixtureReconstructionPackageBuilder.swift`
- `Tests/Unit/Phase4AReconstructionTests.swift`
- `Scripts/EmitPhase4AEvidence/main.swift`
- `make phase4a-reconstruction-verify`
- `Docs/Evidence/PHASE_4A/**`
- `Docs/Capture/PHASE_4A_RECONSTRUCTION_INGESTION_AND_REGISTERED_POINT_FOUNDATION.md`
- `Docs/Capture/HANDOFF_PHASE_4A_RECONSTRUCTION_FOUNDATION.md`

## Modified
- `Package.swift` — `EmitPhase4AEvidence` executable target
- `Makefile` — `phase4a-reconstruction-verify`
