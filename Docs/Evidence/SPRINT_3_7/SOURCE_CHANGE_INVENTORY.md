# Sprint 3.7 — Source change inventory

Relative to Sprint 3.6A delivery ZIP (`DOWNLOAD-elektron-capture-ios-sprint-3-6-apple-validation.zip`).

## Added
- `App/Domain/SpatialEvidence/PackageIdentitySecurityTypes.swift`
- `App/Domain/SpatialEvidence/PackageSignatureVerifier.swift`
- `App/Domain/SpatialEvidence/CaptureEpochJournal.swift`
- `App/Domain/SpatialEvidence/AdaptiveCapturePolicy.swift`
- `App/Domain/SpatialEvidence/SecureEnclavePackageSigner.swift` (Apple source candidate / Linux stub)
- `App/Domain/SpatialEvidence/AppleAppAttestClient.swift` (Apple source candidate / Linux stub)
- `App/Domain/SpatialEvidence/FixtureJournaledCapturePackageBuilder.swift`
- `Tests/Unit/Phase37ResilienceTests.swift`
- `make phase3-7-resilience-verify`
- `Docs/Evidence/SPRINT_3_7/**`
- `Docs/Capture/SPRINT_3_7_EVIDENCE_IDENTITY_RECOVERY_RESILIENCE.md`

## Modified
- `App/Domain/SpatialEvidence/SpatialEvidenceError.swift` — journal/signature/attestation cases
- `Makefile` — `phase3-7-resilience-verify`
