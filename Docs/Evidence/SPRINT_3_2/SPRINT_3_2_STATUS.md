# Sprint 3.2 — Pose + Spatiotemporal Correlation

| Field | Value |
|---|---|
| Capture worktree | `.scratch-elektron-capture-ios` |
| Prerequisite | Sprint 3.1 RGB/motion foundation (fixture corrections in progress) |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-2-pose-spatiotemporal.zip` |
| Delivery ZIP SHA-256 | `ee46ffb7d8f986b508fe11486e2fddedb6afb740faa924c61d1fe7d6c7b63e21` |
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
| **VALIDATION_STATE** | `LINUX_FIXTURE_VALIDATED` | Linux unit suite proves failure matrix + fixture package seal; **not** physical-device / ARKit runtime validation |

Physical `SPKG-DEVICE-*` identities and shared camera/motion/pose clock claims remain **forbidden** without Sprint 3.6 evidence and explicit `ClockCorrelation` records.

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

## Completion matrix

| Case | IMPLEMENTATION_STATE | VALIDATION_STATE |
|---|---|---|
| Expand `PoseSample` (+ Vector3D / QuaternionD / tracking enums) | COMPLETE | LINUX_FIXTURE_VALIDATED |
| `PoseSensorAdapter` protocol | COMPLETE | LINUX_FIXTURE_VALIDATED |
| `ControllablePoseSensorAdapter` (`fixture.pose`) | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Coordinate frame graph + transform edges | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Clock correlation validator (cross-domain / stale / ambiguous) | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Pose↔camera association records | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Quaternion / transform math validation | COMPLETE | LINUX_FIXTURE_VALIDATED |
| `FixturePosePackageBuilder` | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Apple ARKit pose candidate stub | COMPLETE (candidate) | UNCOMPILED_ON_LINUX / BLOCKED until 3.6 |
| Pose timestamp regression | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Tracking normal → limited → normal | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Tracking failure | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Session interruption | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Relocalization requested | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Unknown coordinate frame | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Duplicate frame ID | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Transform-cycle detection | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Missing transform path | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Invalid / non-normalized quaternion | COMPLETE | LINUX_FIXTURE_VALIDATED |
| NaN / infinite transform | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Camera without pose association | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Pose without camera association | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Cross-domain compare without correlation | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Stale correlation | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Ambiguous correlation path | COMPLETE | LINUX_FIXTURE_VALIDATED |
| Package seal + no DEVICE identities | COMPLETE | LINUX_FIXTURE_VALIDATED |

## Makefile

```bash
make phase3-2-pose-verify
```

## Official completion status

```text
POSE_DOMAIN_CONTRACTS              = IMPLEMENTED
FRAME_GRAPH_VALIDATOR              = IMPLEMENTED
CLOCK_CORRELATION_VALIDATOR        = IMPLEMENTED
ARKit_SOURCE_CANDIDATE             = IMPLEMENTED
ARKit_COMPILED_ON_MAC              = PENDING
ARKit_PHYSICAL_RUNTIME             = PENDING
```
