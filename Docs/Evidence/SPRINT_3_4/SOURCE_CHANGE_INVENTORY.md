# Sprint 3.4 — Source change inventory

Relative to Sprint 3.3 delivery ZIP:

## Added
- `App/Domain/SpatialEvidence/CaptureOrchestrationTypes.swift`
- `App/Domain/SpatialEvidence/SpatialCaptureSessionCoordinator.swift`
- `App/Domain/SpatialEvidence/FixtureCoordinatedPackageBuilder.swift`
- `Tests/Unit/Phase34OrchestrationTests.swift`
- `Docs/Evidence/SPRINT_3_4/**`
- `Docs/Capture/SPRINT_3_4_MULTISTREAM_ORCHESTRATION.md`
- `make phase3-4-orchestration-verify`

## Modified
- `App/Domain/SpatialEvidence/SpatialEvidenceError.swift` — orchestration errors
- `App/Domain/SpatialEvidence/ControllableSensorAdapters.swift` — motion clock / interrupt hooks
- `App/Domain/Models/EvidenceAuthority.swift` — `fixture_motion`
- `Makefile`

## Patch
- `Docs/Evidence/SPRINT_3_4/sprint-3-3-to-3-4.patch` — unified Sprint 3.3 → 3.4 source delta
