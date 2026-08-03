# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Official name | `SPRINT_3_2_POSE_AND_SPATIOTEMPORAL_CORRELATION` |
| Industrial baseline SHA | `1213526724b926fed6663b2f0e7b7c096faa64c4` (PR #56 squash merge) |
| Prior Capture foundation | `DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `ee46ffb7d8f986b508fe11486e2fddedb6afb740faa924c61d1fe7d6c7b63e21` |
| Capture source tip | Content-bound to delivery ZIP SHA-256 (no separate Capture git remote on this host) |
| Draft PR | https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/pull/57 |
| Linux `swift test` | 405 executed, 4 skipped, 0 failures |
| Phase32 filter | 22 executed, 1 skipped, 0 failures |
| package_content_sha256 | `b4f595285825e0ab6264ea8eeb84b555812515ccd1c46a33e695c5f9fdd0ed16` |
| manifest_sha256 | `314440cf582fc70039ea2dde64fd6ee85c8e05616e1b062869d52970f48e90d2` |
| Mac / device ARKit | `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` until Sprint 3.6 |
| Phase 4 / mesh / SfM / CAD | **None** |

## Dual planes

| Plane | Value | Meaning |
|---|---|---|
| **IMPLEMENTATION_STATE** | `SOURCE_IMPLEMENTED` | Foundation-portable pose types, validators, controllable adapter, fixture package builder, and Apple ARKit candidate stub are in tree |
| **VALIDATION_STATE** | `APPLE_RUNTIME_UNVALIDATED` | Linux fixtures pass; Mac compilation + physical ARKit runtime deferred to Sprint 3.6 |

```text
SOURCE_IMPLEMENTATION       = MAY_ADVANCE / DONE for 3.2 source
LINUX/FIXTURE_VALIDATION     = PASSED (405/4 skip/0 fail)
MAC_COMPILATION             = PENDING
PHYSICAL_DEVICE_RUNTIME      = PENDING
PRODUCTION_VALIDATION_CLAIM  = FORBIDDEN
```

## Identities (fixture only)

```text
package_id         = SPKG-FIXTURE-POSE-000001
capture_session_id = SESS-FIXTURE-POSE-000001
adapter_id         = fixture.pose
authority          = TEST_FIXTURE
host_claim         = NO_PHYSICAL_DEVICE_EXECUTION
```

Frames: `FRAME_CAMERA_OPTICAL`, `FRAME_DEVICE_IMU`, `FRAME_AR_SESSION_WORLD`, `FRAME_CAPTURE_SESSION_ROOT`.

Pose estimate authority for non-fixture paths remains `GUIDANCE_ESTIMATE`.

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

## Makefile

```bash
make phase3-2-pose-verify
```
