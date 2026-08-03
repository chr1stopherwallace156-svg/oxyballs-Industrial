# CONTRACT_OWNERSHIP.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All shared contracts |
| Supersedes | (none) |

| Contract | `contract_ownership` | Meaning |
|---|---|---|
| CapturePlan | `EDTS_OWNED_REQUEST` | EDTS controls meaning; capture hosts a copy for independent development |
| CaptureRequirement | `EDTS_OWNED_REQUEST` | Same |
| EvidenceManifest | `JOINT_CAPTURE_EDTS` | Changes require XREPO + dual review |
| CoordinateTransform | `JOINT_CAPTURE_EDTS` | Same |
| ArtifactMetadata | `CAPTURE_OWNED_OUTPUT` | Capture defines emission; EDTS consumes |
| CaptureDeviceProvenance | `CAPTURE_OWNED_OUTPUT` | Long-lived device/app provenance for packages |
| CalibrationProfile | `CAPTURE_OWNED_OBSERVATION` | Capture defines observation shape; EDTS consumes |
| MeasurementObservation | `CAPTURE_OWNED_OUTPUT` | Capture may emit observations only |
| Capture API stub | `JOINT_CAPTURE_EDTS` | Dual review |
| PackageInventory | `JOINT_CAPTURE_EDTS` | `.edts-pkg` inventory |
| IngestionStatus | `EDTS_OWNED_REQUEST` | EDTS ingest lifecycle tokens |
| CameraCalibrationRecord | `CAPTURE_OWNED_OBSERVATION` | Optional Apple calibration |
| MotionOrientationSample | `CAPTURE_OWNED_OUTPUT` | Guidance-grade motion |
| Build authorization | `BUILD_ENGINE_OWNED` | **Prohibited** in capture outputs |

Silent unilateral edits of EDTS-owned or joint contracts from this repository are forbidden. Use `XREPO-CAP-EDTS-####`.
