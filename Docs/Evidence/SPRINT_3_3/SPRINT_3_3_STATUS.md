# Sprint 3.3 — Depth and RGB/Depth Association

| Field | Value |
|---|---|
| Official name | `SPRINT_3_3_DEPTH_AND_RGB_DEPTH_ASSOCIATION` |
| Industrial baseline SHA | `79eaea609a62179c321654d4b170ad1282a0d9dd` (PR #57 **MERGED**) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-3-depth-rgb-depth.zip` |
| Delivery ZIP SHA-256 | `640df9abc19d3b7d73e59f5ee84f605e18fd7caccae5f9ef4c7ad03309787357` |
| Linux `swift test` | 455 executed, 5 skipped, 0 failures |
| Phase33 filter | 27 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-DEPTH-000001` |
| Non-LiDAR fixture | `SPKG-FIXTURE-NONLIDAR-DEPTH-000001` |
| Capability schema | `SpatialCapabilitySnapshot@1.0.0-phase3-fixture` |
| Apple depth | `APPLE_DEPTH_SOURCE_CANDIDATE_UNCOMPILED` |
| Validation | `APPLE_RUNTIME_UNVALIDATED` / deferred to Sprint 3.6 |
| Phase 4 / Sprint 3.4 | **None** |

## Digests (primary camera+depth)

| Field | Value |
|---|---|
| `fixture_payload_content_sha256` | `97b5cf8bcdabeca614a65d49becd4b09e1dd8d777b67cd9953c1d7d46cd9ab2f` |
| `fixture_manifest_sha256` | `0a36f094704ac5bbdf53ebd2a7b7a019adbba35195d2ae7f5716a42f72c9f9b1` |
| `fixture_package_closure_sha256` | `258ecc8bfe365d5576c7a3fc4871ee71968ce1693bb3a2f45483b99c06d2ba8a` |
| `closure_digest_algorithm` | `sha256-canonical-inventory-v1` |

## Digests (non-LiDAR)

| Field | Value |
|---|---|
| `fixture_payload_content_sha256` | `159b4f666037a9c317e53f55cc2057082a2e2bda5e3a04f1cdd48f2b916c3a3f` |
| `fixture_manifest_sha256` | `e13a1f54d346a24ff126148dd3074b78c83d2a0ca21f8bba2a1eba330952526a` |
| `fixture_package_closure_sha256` | `b061d6990fc9e37f6a3f40b30796c595e824a0fe47b3847e38263a18b59c8e60` |
| depth outcome | `UNAVAILABLE_DEVICE` |
| fake depth present | `false` |

## Capture lineage

| Field | Value |
|---|---|
| `capture_parent_git_tip` | `NOT_AVAILABLE` |
| `capture_new_git_tip` | `NOT_AVAILABLE` |
| `parent_delivery_zip_name` | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| `parent_delivery_zip_sha256` | `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` |
| `final_delivery_zip_sha256` | `640df9abc19d3b7d73e59f5ee84f605e18fd7caccae5f9ef4c7ad03309787357` |

## Dual planes

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` |
| VALIDATION_STATE | `LINUX_FIXTURE_VALIDATED` (Apple runtime unvalidated) |

## Official completion status

```text
DEPTH_DOMAIN_CONTRACTS             = IMPLEMENTED
DEPTH_CALIBRATION_VALIDATOR        = IMPLEMENTED
RGB_DEPTH_ASSOCIATION_VALIDATOR    = IMPLEMENTED
NON_LIDAR_TRUTHFUL_MODE            = IMPLEMENTED
ARKit_DEPTH_SOURCE_CANDIDATE       = IMPLEMENTED (Gated)
ARKit_COMPILED_ON_MAC              = PENDING (Deferred to 3.6)
ARKit_PHYSICAL_RUNTIME             = PENDING (Deferred to 3.6)
MERGE_CLASSIFICATION               = SOURCE_FOUNDATION_MERGED / APPLE_RUNTIME_UNVALIDATED
```
