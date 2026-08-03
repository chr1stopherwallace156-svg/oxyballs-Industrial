## Summary

Sprint 3.2 — Pose + Spatiotemporal Correlation under dual status planes.

**PR #56 is merged.** Industrial baseline: `1213526724b926fed6663b2f0e7b7c096faa64c4`.

**IMPLEMENTATION_STATE** = `SOURCE_IMPLEMENTED`  
**VALIDATION_STATE** = `LINUX_FIXTURE_VALIDATED`  
**MAC_COMPILATION / PHYSICAL_DEVICE_RUNTIME** = `PENDING` (deferred to Sprint 3.6)  
**PRODUCTION_VALIDATION_CLAIM** = `FORBIDDEN`  
**Merge class (when accepted):** `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED`

## Delivered

- Expanded `PoseSample` (+ Vector3D / QuaternionD / tracking enums)
- `PoseSensorAdapter` + `ControllablePoseSensorAdapter` (`fixture.pose`)
- Frame graph + transform edges + cycle/missing-path validators
- Clock correlation validator (cross-domain / stale / ambiguous)
- `PoseAssociationRecord` bound to `correlation_id` + epoch proof
- `FixturePosePackageBuilder` → primary fixture `SPKG-FIXTURE-CAMERA-POSE-000001` / `TEST_FIXTURE`
- Motion/depth `NOT_REQUESTED` with **no** motion or depth evidence present
- `AppleARKitPoseSensorAdapter` candidate → `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` on Linux
- Capability schema `SpatialCapabilitySnapshot@1.0.0-phase3-fixture`
- Digest-scope closure: `fixture_payload_content_sha256` + `fixture_package_closure_sha256` (`sha256-canonical-inventory-v1`)
- Failure matrix tests (Phase32) + full Linux suite **428 executed / 4 skipped / 0 failed**

## Delivery

- ZIP: `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip`
- Final delivery ZIP SHA-256: `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090`
- `fixture_payload_content_sha256`: `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12`
- `fixture_manifest_sha256`: `4db6ce41015f3a1b3950e71e0f03e7c91844a9a3544011c19a3cb7a411e51c54`
- `fixture_package_closure_sha256`: `571c22070db30d227b33eef8c8ff34f94870b7e393f5110e9d59daca8a8911a6`
- `closure_digest_algorithm`: `sha256-canonical-inventory-v1`

## Capture lineage

- `capture_parent_git_tip` = `NOT_AVAILABLE`
- `capture_new_git_tip` = `NOT_AVAILABLE`
- `parent_delivery_zip_sha256` = `adfcfd9b4c92fcc58167e86e8dfe64ca108dffed1156ef320f7549ea4bbf47f2`
- `pre_hardening_delivery_zip_sha256` = `2201ec8e6f884d93f7031a20106f114367903a48a208dc25128d35570cdd415a`

ZIP SHA-256 values are archive-byte identity only — never Git tips.

## Cross-sprint normalization

Sprint 3.1 fixture metadata was regenerated only to maintain shared Phase 3
fixture-schema and correlation-ID consistency. No Sprint 3.1 Apple runtime
status, physical-device claim, payload bytes, or production validation status
was promoted.

- Sprint 3.1 `fixture_manifest_sha256`: `793d769cef44dc02ebe9c67642b1dd74341048b0e5467a805d0c1b02846cd793`
- Sprint 3.1 `fixture_payload_content_sha256`: `727aa3ddead42a8089a4413013d58b90a53bbf5ea8f7cc6293c6e73f4438c3e7` (unchanged)

## Exclusions

No LiDAR/depth Sprint 3.3 implementation, no orchestration (3.4), no quality guidance (3.5), no Phase 4, no mesh/SfM/CAD/photogrammetry/reconstruction/AI code, no physical DEVICE package, no Apple runtime validation claim.

Validation remains deferred to Sprint 3.6. This PR stays **draft** and **unmerged** until explicitly accepted.
