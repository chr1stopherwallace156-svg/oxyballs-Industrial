# L1 Source Pack 01 — Engagement Report

**Milestone:** `L1_SOURCE_PACK_01`  
**Registry status:** `L1_SOURCE_PACK_01_ENGAGED`

## Project gates

| Field | Value |
|---|---|
| Document acquisition | `L1_DOCUMENT_ACQUISITION_READY` |
| Public reference search | `L1_PUBLIC_REFERENCE_SEARCH_READY` |
| Modeling baseline | `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE` |
| Geometry / mesh production | **BLOCKED** |

## What landed

| Artifact | Role |
|---|---|
| `L1_SOURCE_ARTIFACT_REGISTRY.json` | SRC-L1-001…003 metadata + SHA-256 claims |
| `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` | EXT-L1-101…105 DOCUMENT_SUPPORTED extractions |
| `L1_PUBLIC_REFERENCE_IMAGE_MANIFEST.json` | REF-PUB-001/002 staged (NOT_EVALUATED) |
| `L1_CLAIM_REGISTER_UPDATED.json` | CLM-L1-001…005 (physical PENDING) |
| `L1_UNVERIFIED_VALUES_REGISTER.json` | UNV-L1-001…003 rejected/provisional |

## Document-supported structural facts (physical still PENDING)

| Parameter | Value | Extraction |
|---|---|---|
| Front axle subtype | `MONOBEAM_WIDE_TRACK_NON_DRIVING` | EXT-L1-101 |
| Front track width | 1899.92 mm (74.8 in) | EXT-L1-102 |
| Rear frame width | 868.7 mm (34.2 in) OUTSIDE_TO_OUTSIDE_FRAME_WEB | EXT-L1-103 |
| Wheel PCD | 225.0 mm / 10 stud | EXT-L1-104 |
| Diagonal alignment tolerance | 5.0 mm / 2.0 m span | EXT-L1-105 |

## Integrity posture

- OEM PDFs **not** committed to git (licensing).
- Recorded `sha256_hash` values have `hash_recompute_status: NOT_RECOMPUTED_IN_THIS_ENVIRONMENT` until the evidence vault is mounted for byte recompute.
- Public images: `external_distribution: PROHIBITED_PENDING_REVIEW`.

## Explicitly not approved

- Geometry freeze / coordinate lock
- Mesh / glTF production
- Treating DOCUMENT_SUPPORTED as physically VERIFIED without GRADE-A/B inspection
