# CHANGELOG.md

All notable changes to **elektron-capture-ios** only.

## [Unreleased]

### Fixed
- Evidence Library SwiftUI `NavigationLink(value:)`: synthesized `Hashable` on
  `EvidenceLibraryIndexRecord` and nested state enums.
- Package inventory “all files undeclared” on macOS: `PackageRelativePath` now
  resolves symlinks (`/var` vs `/private/var`) and canonicalizes `.` / `..`
  (Canonical Identity Pattern). Documented as `ERR-EDTS-0007`.
- Physical-device `CANONICALIZATION_FAILED`: `CaptureDeviceProvenance.asDictionary()` boxed nil
  `Optional`s as `Any` (`lidar_available`, calibration/attest fields). Use `NSNull()` instead.
- Canonical encoder diagnostics now preserve stage + underlying Swift error; UI shows detail and
  always clears Working via `defer`.
- `monotonic_ns` encoded as Int64/NSNumber (not bare UInt64).
- Incident record: `Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md` (P1R-001) + ADR-001.

### Added
- `CHANGE-0001` (Commit A / freeze-prep): Phase 1C completion retraction, freeze
  preparation, and Commit A isolation — `IMPLEMENTED` / `FREEZE_EXECUTION_PENDING`.
  Tag `v1.0.0-phase1c` must not include v2 files.
- `CHANGE-0002` (Commit B): Capture v2 Specifications 1–6 hardening and twelve-point
  correction pass — `IMPLEMENTED` / `FINAL_ARCHITECTURAL_REVIEW_PENDING` /
  `NOT_BASELINE_APPROVED`. Future `CHANGE-0003` only after architectural review.
- `Docs/Changes/TEMPLATE.md` for subsequent change records.
- Changelog + handoff governance **officially adopted** as primary engineering rule
  (`Docs/Governance/CHANGELOG_AND_HANDOFF_GOVERNANCE.md`,
  `CURSOR_OPERATING_RULES.md` § Changelog and handoff completion):
  completion requires change record + regenerated handoff + verified hashes;
  intermediate state `IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`;
  four invariants (changelog / handoff / verified hashes / authoritative tag).
- `make handoff` / `make handoff-verify` (`Scripts/generate-handoff.sh`,
  `Scripts/verify-handoff-package.sh`) regenerate `Handoff/` (HANDOFF.md, inventory,
  ZIP, Git bundle, SHA256SUMS) and append `Docs/Handoffs/HANDOFF_HISTORY.md`.
- PR template: Change Governance + Handoff Governance checklists
  (`.github/PULL_REQUEST_TEMPLATE.md`).
- Phase 1C Persistent Local Evidence Library (`App/Phase1/EvidenceLibrary/`, write-once
  `artifact_original.jpg`, orthogonal state dimensions, export under library root).
- ADR + decision log **P1-004** Canonical Identity Pattern; unit tests
  `CanonicalPathInvariantTests` / `CanonicalPackageIdentityTests`.
- Phase 1C freeze-prep docs: `PHASE_1C_FINAL_VALIDATION.md` (evidence-only template),
  `PHASE_1C_FREEZE_COMMIT_SEPARATION.md` (Commit A = Phase 1 freeze only; Commit B = v2
  after remote tag; ZIP≠git equivalence protocol).
- Capture v2 specification suite under `Specifications/` (EC-V2-SPEC-001…006), cross-spec
  entity/state registry, consistency review (correction pass applied).
- Research scaffolding: `Research/Spikes/IR-0001/` (isolated; non-production),
  `Research/Deferred/SemanticMattes/` (production use prohibited).
- Phase 1 single-still runtime (`App/Phase1/`, AVFoundation camera services, `Apps/Phase1StillCapture/` shell).
- `.edts-pkg` builder: canonical manifest/inventory, package_status, sidecars, ZIP transport.
- `CaptureSidePackageValidator` (capture-side only; never claims XREPO PASS).
- Python-independent canonical golden bytes for cross-language manifest check.
- `Phase1RuntimeTests` + synthetic JPEG fixture + `Scripts/build-phase1-fixture-package`.
- Physical-device / EDTS verification procedure (device pass **BLOCKED_BY_ENVIRONMENT** here).

### Changed
- `Package.swift` compiles Phase 1 runtime + AVFoundation camera sources (DepthCapture still excluded).
- `Phase1CStatus.current`:
  `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`
  (premature `PHASE_1C_COMPLETE` / `v1.0.0-phase1c` claims retracted until authoritative clone
  equivalence, Commit A, remote annotated tag, and GitHub protection).
- Capture v2 gate: `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW` after Specs 4–6 correction pass
  (not yet `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` / not yet `AUTHORIZED_FOR_IR_0001_EXECUTION`).
- Linux / Mac suite: **89** tests executed, 0 failures (1 skipped) on current tip.

### Notes
- Freeze tag must be cut from Phase 1–only tree (`cursor/phase1c-freeze-commit-a-d881`); do not
  include `Specifications/`, `Research/`, or `CHANGE-0002` in Commit A / `v1.0.0-phase1c`.
- Specs 1–6 + IR-0001 + governance staging live on `cursor/phase1c-evidence-library-d881`
  (Commit B+). Do not claim Specs baseline approval until `CHANGE-0003`.

## [0.1.4] - 2026-07-23

### Added
- Phase 1 directive: `PHASE_1_FIRST_VERIFIED_CAPTURE_ARTIFACT.md` (First Verified Capture Artifact).
- `.edts-pkg` format: `EDTS_PKG_FORMAT.md` + `PackageInventory` schema (ZIP = transport only).
- `IngestionStatus`, `CameraCalibrationRecord`, `MotionOrientationSample` contracts.
- Phase 1 domain types (`APPLE_ENCODED_JPEG`, calibration availability, ingest statuses).
- XREPO-CAP-EDTS-0002 (EDTS quarantine / hostile-archive ingest).
- 16-point Phase 1 acceptance gate (integrity verified ≠ content verified).

### Changed
- ROADMAP / ACCEPTANCE_CRITERIA: Phase 1 reframed away from “camera UI” to cryptographic witness pipeline.
- Evidence package standard documents Phase 1 minimal `.edts-pkg` layout.

### Compatibility
- Runtime status remains **PACKAGE_EXPORT_READY**.
- Phase 0 gate remains **APPROVED_FOR_PHASE_1_PREPARATION**.
- No claim of EDTS_COMPATIBLE, RAW JPEG, or automatic camera intrinsics.

### Integration Impact
- EDTS must implement archive hardening + inventory verification (XREPO-0002) before Phase 1 still packages can pass the 16-point gate.

## [0.1.3] - 2026-07-23

### Added
- `SCHEMA_COMPATIBILITY.md`, `SCHEMA_MIGRATION.md`, compatibility registry, `Scripts/test-schema-migration`.
- `CANONICAL_JSON.md` and strengthened `CanonicalJSON` (sorted keys only; reject non-finite; no Dictionary-order dependence).
- `CaptureDeviceProvenance` schema/model + golden `capture_device.json`.
- `ACCEPTANCE_CRITERIA.md` with objective Phase 0–7 checklists.
- Four-axis compatibility operations: `READ_SUPPORT`, `WRITE_SUPPORT`, `MIGRATION_SUPPORT`, `REJECTION_POLICY`.
- Stable device identity fields (`hardware_model_identifier`, `device_display_name`, `lens_profile_id`) — display names non-authoritative.
- `PHASE_0_APPROVAL.md` — **APPROVED_FOR_PHASE_1_PREPARATION** (not EDTS_COMPATIBLE / not production).
- Cross-language canonical JSON proof requirement on XREPO-CAP-EDTS-0001.

### Changed
- Evidence package standard requires device provenance for Phase 1+.
- Determinism doc points at canonical JSON rules.
- Compatibility registry uses per-version operation axes (not a vague single `SUPPORTED` flag).

### Compatibility
- Status remains **PACKAGE_EXPORT_READY**.
- Phase 0 gate: **APPROVED_FOR_PHASE_1_PREPARATION**.
- Still EvidenceManifest write/read `1.0.0` only (no migrators yet).

### Integration Impact
- EDTS importer (XREPO-0001) must accept Path A packages, preserve provenance IDs, and prove cross-language canonical bytes before any `EDTS_COMPATIBLE` claim.

## [0.1.2] - 2026-07-23

### Added
- `EvidenceManifestValidator` enforces AuthorityGuard on export/validation paths.
- `RuntimeEnvironment` + `ProductionConfigurationGuard` (PRODUCTION fail-closed on mocks).
- Strict schema `additionalProperties: false`, `contract_ownership` metadata, MeasurementObservation schema.
- Negative contract tests (`Scripts/test-contract-negatives`) and determinism checks (`Scripts/test-determinism`).
- `Docs/Integration/XREPO/XREPO-CAP-EDTS-0001.md` (EDTS golden-package importer request).
- `CONTRACT_OWNERSHIP.md`, `DETERMINISM.md`, `FOUNDATION_VERIFICATION_REPORT.md`.

### Changed
- EvidenceManifest / transforms / calibration / artifact schemas tightened; ENGINEERING_VERIFIED removed from capture-emittable authority enums.
- `FileEvidenceExporter` validates before write; injectable `createdAtUTC` for deterministic tests.

### Security
- Forbidden Build Engine claims and capture-emitted ENGINEERING_VERIFIED rejected on validated paths.

### Compatibility
- Integration status remains **PACKAGE_EXPORT_READY** (not EDTS_COMPATIBLE).
- XREPO-CAP-EDTS-0001 opened for EDTS-side importer handshake.

### Integration Impact
- EDTS importer must accept stricter joint schemas and Path A golden package without reinterpretation before any EDTS_COMPATIBLE claim.

## [0.1.1] - 2026-07-23

### Added
- Foundational Implementation Contract governance (`CURSOR_OPERATING_RULES.md`, `.cursor/rules/edts-capture.mdc`).
- Apple-native roadmap (Phases 0–7) and capture-session state machine.
- Evidence authority classes, uncertain values, Apple-native calibration model.
- Framework isolation protocols and labeled adapter mocks.
- Path A package layout (`originals/`, `derivatives/`, `checksums.sha256`, …).
- `INTEGRATION_CONTRACT.md`, `PHASE_0_REVIEW.md`.
- ADRs 0005–0008 (Apple-native platform, guidance-grade ARKit, single device profile, calibration storage).

### Changed
- Rewrote architecture/roadmap away from Android-translated sequencing.
- Golden package rebuilt to Path A layout; app version 0.1.1.
- EvidenceManifest schema requires `authority` and `is_original`.

### Compatibility
- Evidence schema `1.0.0` (fields extended; still DRAFT).
- Integration status remains `PACKAGE_EXPORT_READY` (not `EDTS_COMPATIBLE`).

### Known Limitations
- See `KNOWN_LIMITATIONS.md` — no production camera/ARKit yet.

### Integration Impact
- EDTS importer should expect Path A directory layout and authority fields.
- No production EDTS release coupling required yet.

## [0.1.0] - 2026-07-23

### Added
- Independent repository foundation (docs, contracts, domain boundaries, mocks, golden fixture scaffolding).
