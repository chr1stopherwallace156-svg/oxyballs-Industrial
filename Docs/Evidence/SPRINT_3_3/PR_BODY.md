## Summary

Sprint 3.3 — Depth and RGB/Depth Association under dual status planes.

**PR #57 is merged.** Industrial baseline: `79eaea609a62179c321654d4b170ad1282a0d9dd`.

**IMPLEMENTATION_STATE** = `SOURCE_IMPLEMENTED`  
**VALIDATION_STATE** = `LINUX_FIXTURE_VALIDATED`  
**MAC_COMPILATION / PHYSICAL_DEVICE_RUNTIME** = `PENDING` (deferred to Sprint 3.6)  
**PRODUCTION_VALIDATION_CLAIM** = `FORBIDDEN`  
**Merge class (when accepted):** `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED`

## Delivered

- Foundation-portable depth contracts (`DepthSample`, calibration, capability outcomes, associations)
- `DepthCalibrationValidator` + `RGBDepthAssociationValidator` + capability-truth gates
- Controllable `fixture.depth` adapter + primary fixture `SPKG-FIXTURE-CAMERA-DEPTH-000001`
- Non-LiDAR fixture `SPKG-FIXTURE-NONLIDAR-DEPTH-000001` (`UNAVAILABLE_DEVICE`, no fake depth)
- Motion/pose remain `NOT_REQUESTED` on the primary fixture (no evidence)
- `AppleARKitDepthSensorAdapter` → `APPLE_DEPTH_SOURCE_CANDIDATE_UNCOMPILED` on Linux
- Digest law: `fixture_payload_content_sha256` / `fixture_manifest_sha256` / `fixture_package_closure_sha256` (`sha256-canonical-inventory-v1`)
- Linux suite **455 executed / 5 skipped / 0 failed**

## Delivery

- ZIP: `DOWNLOAD-elektron-capture-ios-sprint-3-3-depth-rgb-depth.zip`
- Final delivery ZIP SHA-256: `640df9abc19d3b7d73e59f5ee84f605e18fd7caccae5f9ef4c7ad03309787357`
- Parent (Sprint 3.2) ZIP SHA-256: `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090`

### Primary fixture digests

- `fixture_payload_content_sha256`: `97b5cf8bcdabeca614a65d49becd4b09e1dd8d777b67cd9953c1d7d46cd9ab2f`
- `fixture_manifest_sha256`: `0a36f094704ac5bbdf53ebd2a7b7a019adbba35195d2ae7f5716a42f72c9f9b1`
- `fixture_package_closure_sha256`: `258ecc8bfe365d5576c7a3fc4871ee71968ce1693bb3a2f45483b99c06d2ba8a`

### Non-LiDAR fixture digests

- depth outcome: `UNAVAILABLE_DEVICE`
- `fixture_package_closure_sha256`: `b061d6990fc9e37f6a3f40b30796c595e824a0fe47b3847e38263a18b59c8e60`

## Exclusions

No Sprint 3.4 orchestration, no Phase 4 mesh/SfM/CAD/photogrammetry/reconstruction/AI, no universal phone-depth metrology claim, no Apple runtime validation claim.

Validation remains deferred to Sprint 3.6.
