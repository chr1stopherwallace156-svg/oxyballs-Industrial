# Sprint 3.2 — Pose + Spatiotemporal Correlation (final record closure)

| Field | Value |
|---|---|
| Official name | `SPRINT_3_2_POSE_AND_SPATIOTEMPORAL_CORRELATION` |
| Industrial baseline SHA | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 **MERGED**) |
| Pre-closure reviewed head | `b77271522c86cb639cfc2dd2a0650e9876088b96` |
| Final closure head | branch tip of `cursor/phase3-2-pose-spatiotemporal-d881` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` |
| Draft PR | https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/pull/57 |
| Linux `swift test` | 428 executed, 4 skipped, 0 failures |
| Phase32 filter | 45 executed, 1 skipped, 0 failures |
| Primary fixture | `SPKG-FIXTURE-CAMERA-POSE-000001` |
| `fixture_payload_content_sha256` | `98c726864d5a0c90642f87f407b146d5dbf137c8c85002fa79204919f7aaba12` |
| `fixture_manifest_sha256` | `4db6ce41015f3a1b3950e71e0f03e7c91844a9a3544011c19a3cb7a411e51c54` |
| `fixture_package_closure_sha256` | `571c22070db30d227b33eef8c8ff34f94870b7e393f5110e9d59daca8a8911a6` |
| `closure_digest_algorithm` | `sha256-canonical-inventory-v1` |
| Capability schema | `SpatialCapabilitySnapshot@1.0.0-phase3-fixture` |
| ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` |
| Validation | `APPLE_RUNTIME_UNVALIDATED` / `DEFERRED_TO_3_6` |
| Phase 4 / Sprint 3.3 | **None** |

## Capture lineage (source-control vs archive-byte identity)

Capture source-control identity and archive-byte identity remain separate.
ZIP SHA-256 values are **not** Git tips.

| Field | Value |
|---|---|
| `capture_parent_git_tip` | `NOT_AVAILABLE` |
| `capture_new_git_tip` | `NOT_AVAILABLE` |
| `parent_delivery_zip_name` | `DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip` |
| `parent_delivery_zip_sha256` | `adfcfd9b4c92fcc58167e86e8dfe64ca108dffed1156ef320f7549ea4bbf47f2` |
| `pre_hardening_delivery_zip_sha256` | `2201ec8e6f884d93f7031a20106f114367903a48a208dc25128d35570cdd415a` |
| `pre_closure_delivery_zip_sha256` | `c254db32b9d76d4bf00307f37f357a9ab81d985cd8e7a2a4248b26875d9eca77` |
| `final_delivery_zip_sha256` | `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` |

## Delivery digest (Industrial record)

Concrete ZIP digest `3bcc630f8bb1c6b93f74beb48f66cced25ed42756eac0df7d34489cece77f090` is recorded here and in the basename-only sidecar `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip.sha256`. Copies of this status file inside the Capture delivery ZIP use `SEE_BASENAME_SIDECAR` to avoid a self-hash loop.

## Digest scope

Authoritative generator: `SpatialPackageClosureVerifier`.

### `fixture_payload_content_sha256` (formerly mislabeled “Fixture package SHA-256”)

Equals `rehashPackageBytes` / `packageContentHash`. Hashes **only**:

- manifest schema id@version
- `package_id`, `vehicle_id`, `capture_session_id`
- artifact descriptors from the manifest (`relative_path`, `sha256`, `byte_length`), sorted

Does **not** hash capability / clock / frames / sample_index / association / transform sidecar file bytes.
That is why this digest stayed `98c726…` while package metadata and the inventory changed.

### `fixture_package_closure_sha256`

Algorithm: `sha256-canonical-inventory-v1`

1. Collect package inventory entries excluding `package_inventory.json` (self-reference forbidden).
2. Fail closed on missing or orphan entries **before** digest issuance (declared inventory vs on-disk).
3. Normalize each entry to `{relative_path, byte_length, sha256}` only — no timestamps, no host/absolute paths.
4. Sort lexicographically by `relative_path`.
5. SHA-256 over the repository `CanonicalJSON` encoding of that array.

## Dual planes

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` |
| VALIDATION_STATE | `LINUX_FIXTURE_VALIDATED` (Apple runtime unvalidated) |

## Hardening + record-closure corrections

1. Capability schema `1.0.0-phase3-fixture` (standalone ≡ embedded)
2. Motion evidence stripped from primary camera-pose fixture (`NOT_REQUESTED`)
3. Pose associations bound to `correlation_id` + epoch proof
4. Transform edges bound to epoch + `source_sample_id`
5. Cycle classifications: CONSISTENT_RECIPROCAL / INCONSISTENT_RECIPROCAL / AMBIGUOUS / DEGENERATE / UNSUPPORTED_COMPLEX_CYCLE
6. D-020 Status: Proposed; Activation upon merge of PR #57
7. Capture lineage: git tips `NOT_AVAILABLE`; ZIP digests recorded separately
8. Public digest rename: `fixture_payload_content_sha256` + `fixture_package_closure_sha256`

## Cross-sprint normalization (Sprint 3.1 fixture metadata)

Sprint 3.1 fixture metadata was regenerated only to maintain shared Phase 3 fixture-schema and correlation-ID consistency. No Sprint 3.1 Apple runtime status, physical-device claim, payload bytes, or production validation status was promoted.

| Field | Value |
|---|---|
| Sprint 3.1 `fixture_manifest_sha256` | `793d769cef44dc02ebe9c67642b1dd74341048b0e5467a805d0c1b02846cd793` |
| Sprint 3.1 `fixture_payload_content_sha256` | `727aa3ddead42a8089a4413013d58b90a53bbf5ea8f7cc6293c6e73f4438c3e7` |
| Sprint 3.1 payload bytes changed | `false` |

## Official completion status

```text
POSE_DOMAIN_CONTRACTS              = IMPLEMENTED
FRAME_GRAPH_VALIDATOR              = IMPLEMENTED
CLOCK_CORRELATION_VALIDATOR        = IMPLEMENTED
ARKit_SOURCE_CANDIDATE             = IMPLEMENTED (Gated)
ARKit_COMPILED_ON_MAC              = PENDING (Deferred to 3.6)
ARKit_PHYSICAL_RUNTIME             = PENDING (Deferred to 3.6)
MERGE_CLASSIFICATION               = SOURCE_FOUNDATION_MERGED / APPLE_RUNTIME_UNVALIDATED
```
