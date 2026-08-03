# ARCHITECTURE.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 0.1.1 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | elektron-capture-ios |
| Supersedes | 0.1.0 architecture sketch |

## System relationship

```
elektron-capture-ios
        ↓  (portable package | capture API)
edts-capture-api
        ↓
edts-core
        ↓
build-engine
```

Physical chain:

```
Physical vehicle → Calibrated capture → Spatial evidence package → EDTS → Build Engine
```

## Apple-native capture path (target)

```
AVCaptureDevice
  → AVCaptureSession
       ├── AVCapturePhotoOutput
       ├── AVCaptureVideoDataOutput
       └── AVCaptureDepthDataOutput
            → Evidence Capture Coordinator
            → Original HEIC/DNG + metadata + depth + calibration + hash
            → Derived calibrated / normalized / thumbnail artifacts
```

ARKit guidance path (Phase 2+):

```
ARFrame { capturedImage, camera.transform, intrinsics, featurePoints, sceneDepth }
  → Vehicle Capture Envelope
  → Coverage map
  → Explainable R/Y/G guidance
```

ARKit/LiDAR = **GUIDANCE_ESTIMATE** by default. Validated physical measurement = engineering-authoritative only after documented validation.

## Layers

| Layer | Responsibility |
|---|---|
| UI (SwiftUI) | Technician clarity; never sole owner of session state |
| Application Services | Session state machine, sealing, review, exceptions |
| Domain | Elektron models, authority, uncertainty, identifiers |
| Adapters | AVFoundation, ARKit, Core Motion, CryptoKit/App Attest |
| Storage / Export | Immutable originals, derivatives, portable packages |
| EDTSClient | Protocol + Mock + future HTTPS |

## Framework isolation protocols

`CameraCaptureProvider` · `SpatialTrackingProvider` · `MotionSampleProvider` · `DepthProvider` · `CryptographicSigningProvider` · `AttestationProvider` · `EvidenceStore` · `EvidenceUploadClient`

Apple types (`ARFrame`, `AVCapturePhoto`, `CMDeviceMotion`) convert to Elektron domain structs inside adapters only.

## Security stack

| Mechanism | Role |
|---|---|
| Secure Enclave | Protect signing keys where supported |
| Keychain | Secrets / tokens |
| App Attest | Server verifies legitimate app instance + challenge binding |
| CryptoKit SHA-256 | Artifact and manifest digests |
| Installation ID + attested key ID + enrollment | Identity without permanent hardware UID |

## Standardize on one device first

Approved Elektron Capture Device profile: exact iPhone Pro model, rear camera, iOS range, app version, calibration, case geometry, lens inspection, last validation.
