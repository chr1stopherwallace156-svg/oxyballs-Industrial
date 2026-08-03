# Sprint 3.1 — Mac/Device Gate + RGB/Motion Sensor Foundation

| Field | Value |
|---|---|
| Industrial baseline SHA | `1c03663e42fee02ac206d77c7d4e8fbfded99b3c` (PR #55) |
| Authoritative Capture source ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Source ZIP SHA-256 | `e0576c87a0d61ffe5d7a780943c9a6b2342ba37e9db26f9e8bda0aced914e47c` |
| Capture tip before work (Sprint 3.0 lineage) | `09a3c36f8413ac59608572d665d08c0b3c4e2c75` |
| Linux `swift test` | 383 executed, 3 skipped, 0 failures |
| Mac `xcodebuild` | `BLOCKED_HOST_CAPABILITY` (see `xcodebuild_attempt.log`) |
| Simulator | `BLOCKED_HOST_CAPABILITY` |
| Physical device smoke | `BLOCKED_HOST_CAPABILITY` |
| ARKit / LiDAR / pose / depth / Phase 4 | **None** |

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

Exit status: **not_executed** — `BLOCKED_HOST_CAPABILITY`  
Log: `xcodebuild_attempt.log` (SHA-256 in sidecar).

Physical-iPhone smoke path (create→capture→approve→Save & Exit→force close→reopen→review→export→transfer→hash→reopen) was **not** run on this host.

## Stages B–D (Foundation + Apple-gated code)

- Protocols: `CameraSensorAdapter`, `MotionSensorAdapter` (Foundation-portable)
- Apple implementations: `App/AppleSensors/*` (`#if canImport(AVFoundation|CoreMotion)`)
- Linux stubs throw `*_BLOCKED_HOST_CAPABILITY`
- Controllable adapters + `DeviceRGBMotionPackageBuilder` prove RGB/motion-only package law and failure matrix on Linux
- Fixture `SPKG-DEVICE-000001/` is **controllable-adapter evidence**, not a physical-device observation claim (`host_claim=BLOCKED_HOST_CAPABILITY_FOR_PHYSICAL_IPHONE`)

## Identities

```text
vehicle_id         = VEH-000001
pilot_id           = PILOT-000001
capture_session_id = SESS-DEVICE-000001
package_id         = SPKG-DEVICE-000001
```
