# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Industrial baseline | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 merged) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` |
| Linux tests | 428 executed, 4 skipped, 0 failures |
| Phase32 | 45 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| `fixture_payload_content_sha256` | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| `fixture_manifest_sha256` | `4db6ce41015f3a1b3950e71e0f03e7c91844a9a3544011c19a3cb7a411e51c54` |
| `fixture_package_closure_sha256` | `571c22070db30d227b33eef8c8ff34f94870b7e393f5110e9d59daca8a8911a6` |
| `closure_digest_algorithm` | `sha256-canonical-inventory-v1` |
| Capability schema | `SpatialCapabilitySnapshot@1.0.0-phase3-fixture` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Merge class when accepted | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |

## Capture lineage

| Field | Value |
|---|---|
| `capture_parent_git_tip` | `NOT_AVAILABLE` |
| `capture_new_git_tip` | `NOT_AVAILABLE` |
| `parent_delivery_zip_name` | `DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip` |
| `parent_delivery_zip_sha256` | `adfcfd9b4c92fcc58167e86e8dfe64ca108dffed1156ef320f7549ea4bbf47f2` |
| `pre_hardening_delivery_zip_sha256` | `2201ec8e6f884d93f7031a20106f114367903a48a208dc25128d35570cdd415a` |
| `pre_closure_delivery_zip_sha256` | `c254db32b9d76d4bf00307f37f357a9ab81d985cd8e7a2a4248b26875d9eca77` |
| `final_delivery_zip_sha256` | `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` |

ZIP SHA-256 values are archive-byte identity only — never Git tips.

## Digest scope

- `fixture_payload_content_sha256`: `rehashPackageBytes` — manifest identity + artifact descriptors only.
- `fixture_package_closure_sha256`: `sha256-canonical-inventory-v1` — CanonicalJSON array of inventory entries (`relative_path`, `byte_length`, `sha256`), sorted by `relative_path`, excluding `package_inventory.json`.

## Hardening

- Capability standalone ≡ embedded (`1.0.0-phase3-fixture`)
- Primary package strips motion evidence while keeping motion `NOT_REQUESTED`
- Associations bound to `correlation_id` + epoch fields
- Transform edges bound to epoch + `source_sample_id`
- Cycle classifications include `UNSUPPORTED_COMPLEX_CYCLE`

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip
cd elektron-capture-ios
make phase3-synthetic-verify
make phase3-1-rgb-motion-verify
make phase3-2-pose-verify
swift test
```
