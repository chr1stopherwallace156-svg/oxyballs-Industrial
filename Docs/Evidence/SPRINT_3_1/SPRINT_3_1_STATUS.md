# Sprint 3.1 — Mac/Device Gate + RGB/Motion Sensor Foundation

## Dual status planes

| Plane | Value |
|---|---|
| **IMPLEMENTATION_STATE** | `SOURCE_IMPLEMENTED` |
| **VALIDATION_STATE** | `LINUX_FIXTURE_VALIDATED` |
| **MAC_COMPILATION** | `PENDING` |
| **PHYSICAL_DEVICE_RUNTIME** | `PENDING` |
| **PRODUCTION_VALIDATION_CLAIM** | `FORBIDDEN` |
| **Merge classification (when merged)** | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |

| Field | Value |
|---|---|
| Industrial baseline SHA | `1c03663e42fee02ac206d77c7d4e8fbfded99b3c` (PR #55) |
| Authoritative Capture source ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Source ZIP SHA-256 | `e0576c87a0d61ffe5d7a780943c9a6b2342ba37e9db26f9e8bda0aced914e47c` |
| Capture tip before work (Sprint 3.0 lineage) | `09a3c36f8413ac59608572d665d08c0b3c4e2c75` |
| `fixture_payload_content_sha256` | `727aa3ddead42a8089a4413013d58b90a53bbf5ea8f7cc6293c6e73f4438c3e7` |
| `fixture_manifest_sha256` | `793d769cef44dc02ebe9c67642b1dd74341048b0e5467a805d0c1b02846cd793` |
| Mac `xcodebuild` | `BLOCKED_HOST_CAPABILITY` (log SHA-256 `2dee1e4ca98ac3224433120d28442aca345baf38eee7dc647765bdbd853f7bdb`) |
| Simulator / physical smoke | `BLOCKED_HOST_CAPABILITY` |
| ARKit / LiDAR / pose production / Phase 4 | **None in Sprint 3.1 scope** |

## Stage A — Apple gate

Command (not executed on this host):

```bash
xcodebuild \
  -project Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS Simulator' \
  CODE_SIGNING_ALLOWED=NO \
  clean build
```

Exit status: **not_executed** — `BLOCKED_HOST_CAPABILITY`.

## Stages B–D

- Protocols: `CameraSensorAdapter`, `MotionSensorAdapter` (Foundation-portable)
- Apple implementations: `App/AppleSensors/*` (`#if canImport`) — **IMPLEMENTATION_STATE only**
- Controllable adapters + `DeviceRGBMotionPackageBuilder` prove RGB/motion-only package law on Linux
- Fixture uses **`SPKG-FIXTURE-*`** identities and **`TEST_FIXTURE`** authority (never `SPKG-DEVICE-*` / `DEVICE_REPORTED` for fixtures)

## Fixture identities (corrected)

```text
vehicle_id         = VEH-000001   # pilot reference identity only
pilot_id           = PILOT-000001
capture_session_id = SESS-FIXTURE-RGBMOTION-000001
package_id         = SPKG-FIXTURE-RGBMOTION-000001
adapter_id         = fixture.camera | fixture.motion
authority          = TEST_FIXTURE
host_claim         = NO_PHYSICAL_DEVICE_EXECUTION
```

`SPKG-DEVICE-*` remains reserved for Sprint 3.6 physical validation.
