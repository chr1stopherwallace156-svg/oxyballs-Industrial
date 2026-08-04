# Phase 4D — Source change inventory

Relative to Phase 4C delivery ZIP (`DOWNLOAD-elektron-reconstruction-phase-4c-dense-fusion.zip`).

## Added
- `App/Domain/Reconstruction/SurfaceReconstructionContracts.swift`
- `App/Domain/Reconstruction/SurfaceEligibilityAndPolicy.swift`
- `App/Domain/Reconstruction/DeterministicFixtureSurfaceBackend.swift`
- `App/Domain/Reconstruction/SurfaceTopologyBoundariesConfidence.swift`
- `App/Domain/Reconstruction/SurfaceLODVisualExports.swift`
- `App/Domain/Reconstruction/Phase4DPipeline.swift`
- `App/Domain/SpatialEvidence/FixtureSurfaceReconstructionPackageBuilder.swift`
- `Tests/Unit/Phase4DSurfaceReconstructionTests.swift`
- `Scripts/EmitPhase4DEvidence/main.swift`
- `make phase4d-surface-verify`
- `Docs/Evidence/PHASE_4D/**`
- `Docs/Capture/PHASE_4D_SURFACE_RECONSTRUCTION.md`
- `Docs/Capture/HANDOFF_PHASE_4D_SURFACE.md`

## Modified
- `App/Domain/SpatialEvidence/FixtureDenseFusionPackageBuilder.swift` — optional package/session/vehicle/geometry/privacy overrides
- `Package.swift` — `EmitPhase4DEvidence` executable
- `Makefile` — `phase4d-surface-verify`
