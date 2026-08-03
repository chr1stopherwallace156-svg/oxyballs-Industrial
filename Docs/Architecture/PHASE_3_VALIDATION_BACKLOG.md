# Phase 3 — Validation Backlog (dual status planes)

Every Phase 3 sprint tracks two independent planes:

| Plane | Meaning |
|---|---|
| **IMPLEMENTATION_STATE** | Source contracts, fixtures, Apple `#if canImport` candidates may advance on Linux |
| **VALIDATION_STATE** | Mac compilation + physical-device runtime proof |

## Policy for Sprints 3.2–3.5

```text
SOURCE_IMPLEMENTATION       = MAY_ADVANCE
LINUX/FIXTURE_VALIDATION     = REQUIRED
MAC_COMPILATION             = PENDING
PHYSICAL_DEVICE_RUNTIME      = PENDING
PRODUCTION_VALIDATION_CLAIM  = FORBIDDEN
```

Merge classification when Linux gates pass:

```text
SOURCE_FOUNDATION_MERGED
APPLE_RUNTIME_UNVALIDATED
```

Fixtures must use `SPKG-FIXTURE-*`, `TEST_FIXTURE` authority, and `host_claim=NO_PHYSICAL_DEVICE_EXECUTION`.  
`SPKG-DEVICE-*` and `DEVICE_REPORTED` are reserved for Sprint 3.6 physical evidence.

## Sprint roadmap

| Sprint | Official name | IMPLEMENTATION focus | VALIDATION |
|---|---|---|---|
| 3.0 | Synthetic spatial evidence | Proven on Linux | N/A (synthetic) |
| 3.1 | RGB + Motion foundation | AVFoundation/CoreMotion candidates + fixtures | Mac/device → Sprint 3.6 |
| 3.2 | Pose + spatiotemporal correlation | ARKit pose candidate + clocks/frames | Mac/device → Sprint 3.6 |
| 3.3 | Depth + RGB/depth association | LiDAR depth candidate + non-LiDAR honesty | Mac/device → Sprint 3.6 |
| 3.4 | Multi-stream capture orchestration | Coordinator + recovery | Mac/device → Sprint 3.6 |
| 3.5 | Capture quality + coverage guidance | Guidance engine (no engineering completeness) | Characterization → Sprint 3.6 |
| 3.6 | Apple hardware validation + first real package | Repair/compile/promote accumulated sources | **REQUIRED PASSED** |

## Sprint 3.6 promotion criteria

Before 3.6: `SOURCE_IMPLEMENTED` / `APPLE_COMPILE_PENDING` / `DEVICE_RUNTIME_PENDING`  
After 3.6 evidence: `APPLE_COMPILED` / `SIMULATOR_VALIDATED` / `PHYSICAL_DEVICE_VALIDATED` / `REAL_PACKAGE_EXPORTED` / `TRANSFER_HASH_VERIFIED` / `CLEAN_REOPEN_VERIFIED`

## Explicit Phase 3 non-goals

mesh · photogrammetry · point-cloud interpretation · CAD alignment · component segmentation · engineering twin (Phase 4+)

## Sprint 3.3 — Depth / RGB-depth (Linux complete; Apple deferred)

- [x] Foundation depth contracts + validators (Linux)
- [x] Primary camera+depth fixture + non-LiDAR UNAVAILABLE_DEVICE fixture
- [x] Digest law (`fixture_payload_content_sha256` / manifest / closure)
- [ ] Mac `xcodebuild` compile of `AppleARKitDepthSensorAdapter` (Sprint 3.6)
- [ ] Physical LiDAR / sceneDepth runtime evidence (Sprint 3.6)
- [ ] Production validation claim (FORBIDDEN until 3.6)

## Sprint 3.4 — Multi-stream orchestration (Linux complete; Apple deferred)

- [x] Session coordinator + policy + state machine (Linux)
- [x] Coordinated primary fixture + degraded NODEPTH/POSEINT fixtures
- [x] Required-failure / cancellation non-seal behavior
- [ ] Mac compile sweep of coordinated adapters (Sprint 3.6)
- [ ] Physical multi-stream runtime (Sprint 3.6)

## Sprint 3.5 — Quality / coverage / guidance (Linux complete; Apple deferred)

| Gate | Status |
|---|---|
| Linux fixture quality/coverage/guidance | COMPLETE (this PR) |
| Mac compilation | PENDING → Sprint 3.6 |
| Physical characterization of thresholds | PENDING → Sprint 3.6 |
| Production validation claim | FORBIDDEN |

