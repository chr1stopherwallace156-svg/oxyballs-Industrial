# EVIDENCE_STANDARD.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All capture artifacts and manifests |
| Supersedes | (none) |

## Authority classes

| Class | Meaning |
|---|---|
| RAW_OBSERVATION | Bytes/metadata as captured |
| DEVICE_REPORTED | Vendor/framework-reported (e.g. AV intrinsics) |
| GUIDANCE_ESTIMATE | ARKit pose/depth, coverage guidance |
| ALGORITHM_ESTIMATE | Derived by app algorithms |
| PHYSICAL_REFERENCE | External metrology input |
| FIELD_VALIDATED | Checked in field per procedure |
| ENGINEERING_VERIFIED | Approved engineering dimension (EDTS-side) |
| REJECTED | Explicitly rejected |
| UNKNOWN | Must remain unknown |

No automatic promotion between classes.

## Original vs derived

**Original:** HEIC/DNG, original metadata, depth, confidence, Apple calibration, ARKit pose samples, Core Motion samples, system timestamps.

**Derived:** undistorted/normalized/thumbnail images, feature maps, point clouds, meshes, measurements, annotations, coverage/blur scores, reconstruction outputs.

Derivatives never replace originals. Lineage: parent hash → operation → algorithm version → parameters → derived hash.

## Uncertainty

Quantitative claims must support `value`, `unit`, `uncertainty_plus_minus` or `uncertainty_status=UNKNOWN`, `authority`, `method`, `evidence_ids`, applicability.

Never invent a tolerance.

## Metrology language

Do not claim mm-accurate / metrology-grade / certified unless validation exists for exact device, workflow, environment, distance, target, and software version.

## Chain of custody

`captured → written → hashed → manifested → signed → sealed → queued → uploaded → received → verified → accepted|rejected`

Each transition: actor, timestamp, software version, identity, previous/new state, reason. Sealed sessions are immutable; corrections use amendments.
