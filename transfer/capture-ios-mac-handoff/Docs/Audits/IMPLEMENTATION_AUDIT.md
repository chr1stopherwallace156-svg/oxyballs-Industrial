<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# IMPLEMENTATION_AUDIT

## Executive summary

**~46 Swift files** under `App/` + `Apps/` constitute production/testable surface. Large `App/{Spatial,Motion,Calibration,Quality,...}` trees are **README-only and SPM-excluded**. Capture v2 feature code is **not implemented**. Partial/experimental work lives on unmerged branches (UX, black-frame).

## Evidence — classification

### Production (compiled, used by Phase1 app)

| Area | Key files |
|---|---|
| Camera | `Phase1CameraServices.swift`, `CameraPreviewView.swift` |
| Session / UI state | `Phase1StillCaptureUIState.swift`, `Phase1CaptureCoordinator.swift` |
| Package | `EvidencePackageBuilder`, `PackageInventoryBuilder`, `ZipPackageWriter`, validators |
| Evidence Library | `EvidenceLibraryStore` (actor) + integrity/paths/models |
| Canonical JSON / hash | `CanonicalJSON.swift`, `ArtifactHashingService`, `ContentHasher` |
| App shell | `Phase1StillCaptureApp`, `Phase1CaptureRootView`, library/share views |

### Partial

| Item | Notes |
|---|---|
| Motion | `MotionSampleService` records unavailable |
| Calibration sidecar | Written with null intrinsics / notAvailable |
| Spatial in manifest | Placeholder tracking_state |
| Device provenance | Hard-coded profile IDs pending hardware validation |
| Package seal | `packageSealStatus = "NOT_IMPLEMENTED"` |

### Stub / scaffolding (excluded)

All `App/Quality/**`, `App/Spatial/**`, `App/Motion/**` (except used services elsewhere), `App/Calibration/**`, DepthCapture, SecureEnclave, AppAttest, ManifestSigner, UploadQueue, Recovery, LocalEvidenceStore — README only.

### Experimental / unmerged

| Branch | Content |
|---|---|
| `cursor/professional-capture-ux-d881` | Take→Approve→Export UX polish |
| `cursor/lifecycle-blackframe-instrument-d881` | `CaptureImageQualityGuard` (black-frame) |

### Dead / legacy candidates

| Symbol | Why |
|---|---|
| `FileEvidenceExporter` | UI path uses coordinator/builder |
| `StillPhotoCaptureService` | Labeled legacy/tests |
| Domain mock providers | No production adapters |

### Duplicate implementations

- Root living docs mirrored under `KNOWLEDGE_PACKAGE/CurrentStatus/` (intentional EKP stubs).
- `Handoff/` tree mirrors Docs/Changes + Specs (packaging mirror).
- Dual CanonicalJSON paths: `App/Application/CanonicalJSON.swift` + Phase1 encoder wrapper — related, not rival v2 stacks.

## Findings

1. **v2 implementation progress ≈ 0% runtime** beyond Phase1 primitives that happen to align with Spec 001 integrity themes.
2. Stub directories should stay excluded until CHANGE + IR authorize code.
3. Unmerged UX/black-frame is Phase1 hardening, not Spec 006.

## Risk level

**Medium** — false sense of progress from folder names.

## Recommended action

- Inventory “compiled Swift file list” in PROJECT_STATE.
- Cherry-pick UX/black-frame only after freeze strategy decided.
- Remove or `@available` deprecate unused exporter after tests updated.

## Priority

P1

## Confidence

High
