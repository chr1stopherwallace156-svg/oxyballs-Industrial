# DATA_DICTIONARY.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Domain identifiers and core fields |
| Supersedes | (none) |

## Identifier prefixes

| Prefix | Meaning |
|---|---|
| VEH- | Vehicle identity |
| CFG- | Configuration |
| SESSION- | Capture session |
| REQ- | Capture requirement |
| EVD- | Evidence record |
| ART- / IMG- / DEPTH- / MOTION- | Artifacts |
| CAL- | Calibration profile |
| COMP- / COMPINST- | Component / instance |
| MEAS- | Measurement observation |
| TRN- | Coordinate transform |
| DEVICE- / INSTALL- | Device profile / installation |
| OPERATOR- | Operator |
| REVIEW- | Review decision |
| MANIFEST- | Manifest |
| REC- | Capture record (manifest record_id) |

Do not use filenames, DB row numbers, Apple object pointers, or UI indexes as permanent identity.

## Core domain objects

`ApprovedDeviceProfile` · `CaptureInstallation` · `OperatorIdentity` · `VehicleIdentity` · `VehicleConfiguration` · `CaptureSession` · `CapturePlan` · `CaptureRequirement` · `EvidenceArtifact` · `ArtifactDerivative` · `CalibrationProfile` · `MotionSampleWindow` · `SpatialPose` · `CoordinateTransform` · `DepthArtifact` · `QualityAssessment` · `MeasurementObservation` · `ScaleAnchor` · `EvidenceManifest` · `EvidenceSignature` · `ReviewDecision` · `ExceptionRecord` · `UploadRecord` · `SessionAmendment`

No single giant `CaptureData` blob.
