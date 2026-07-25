# CAPTURE SENSOR FRAMEWORK CONTRACT

| Field | Value |
|---|---|
| Document ID | EC-V2-SPEC-003 |
| Status | **V2_CORE_SPECS_1_TO_3_HARDENED** (correction pass: lifecycle split) |
| Gate | `BASELINE_APPROVAL_PENDING_CORRECTION_PASS` |
| Depends on | `ELEKTRON_CAPTURE_V2_SPEC.md`, `CAPTURE_V2_DOMAIN_MODEL.md` |
| Next | `CAPTURE_DEVICE_CAPABILITY_MATRIX.md` |

## 1. Purpose

Guarantee every hardware or software provider — AVFoundation, CoreMotion, ARKit depth, CoreLocation, external thermal — conforms to identical **lifecycle, buffering, timestamp, actor ownership, and failure-handling** conventions.

## 2. Universal Interface

```swift
public protocol EvidenceSensor: AnyObject {
  var sensorID: String { get }
  var sensorType: SensorType { get }
  var currentState: SensorState { get }

  func prepare(configuration: SensorConfiguration) async throws
  func startStreaming(on timeline: CaptureTimeline) async throws
  func capturePayload() async throws -> SensorPayload
  func stopStreaming() async
}
```

No production subsystem talks to vendor SDKs except through an `EvidenceSensor` (or a typed adapter that presents as one).

## 3. Actor Ownership

Primary optical frame buffers and sensor data streams run in isolated Swift actors (illustrative names):

| Actor | Responsibility |
|---|---|
| `CameraActor` | AVFoundation session, still/video buffers, exposure/focus locks |
| `MotionActor` | CoreMotion / IMU streams |
| `LocationActor` | CoreLocation / heading |

Cross-actor publication uses typed `SensorPayload` / `SensorRecord` values crossing actor boundaries under Sendable contracts. Production modules implementing these actors remain gated until Specs 1–6 are baseline-approved and IR-0001 measured results exist.

## 4. Separated State Machines

`Verify` and `Commit` are **evidence orchestration** operations, not continuous-sensor lifecycle states. A camera may acquire one frame; a motion sensor may supply a time window — they must not share one overloaded operational machine.

### 4.1 Sensor lifecycle

```text
UNDISCOVERED
→ DISCOVERED
→ CONFIGURED
→ RUNNING
→ INTERRUPTED
→ STOPPED
→ FAILED
→ RECOVERING
```

Illegal transitions fail closed with typed errors. Auxiliary sensor `FAILED` / `INTERRUPTED` must not tear down the optical pipeline unless the optical sensor itself fails.

### 4.2 Evidence operation (orchestration)

```text
REQUEST
→ ACQUIRE
→ ASSOCIATE
→ VERIFY
→ COMMIT
```

Owned by the session / packaging coordinator. Maps acquired sensor windows or still frames onto `CaptureAttempt` / `CommittedArtifact` under Specs 2, 5, and 6.

## 5. Capability Snapshot Timing

`DeviceCapabilitySnapshot` (Spec 4) rules:

1. Capture an **initial** immutable snapshot at session initialization, before any sensor stream is started.
2. Capture **additional** immutable snapshots after material changes — including lens switching, format switching, frame-rate / depth configuration changes, interruption recovery, media-services reset, external-sensor reconnection, thermal restriction, or other OS-reported material capability changes.
3. Snapshot history is preserved; never overwrite a prior snapshot.
4. Streaming configuration must not claim capabilities absent from the **active** snapshot.
5. Discovery queries must not modify active capture configuration.

## 6. Precision Timebase Taxonomy

| Term | Domain | Definition / integrity guarantee |
|---|---|---|
| **`monotonicTimestamp`** | Process / hardware | `CACurrentMediaTime()` or `mach_absolute_time()`. Monotonic, strictly non-decreasing; used for relative frame ordering. **Not** globally synchronized or tamper-proof on its own. |
| **`wallClockTimestamp`** | Absolute time | Real-world UTC (or civil time) from system clock or NTP. |
| **`clockAnchor`** | System identity | Point-in-time mapping `(monotonicTimestamp, wallClockTimestamp)` recorded at session start (\(t_0\) bind). |
| **`clockSource`** | Provenance | Normative IDs in Spec 5 (`SYSTEM_WALL_CLOCK`, `EXTERNAL_NETWORK_TIME_MEASUREMENT`, …) |
| **`clockUncertainty`** | Precision | Estimated drift / uncertainty bounds; never fabricated as zero |
| **`sensorNativeTimestamp`** | Hardware stream | Timestamp emitted by device hardware (e.g. `CMSampleBufferGetPresentationTimeStamp`). |

### Rules

- Session sync backbone = **monotonic** (and/or sensor-native) time with `clockAnchorID`
- High-rate samples must not require per-sample wall-clock stamps (Spec 5)
- Wall-clock is a bound label via `ClockAnchor` + `sourceEvidenceReference`
- Anti-tamper / trust provenance is a **separate** contract — not implied by `CACurrentMediaTime()` alone
- Processing class (`SENSOR_REPORTED` / `FRAMEWORK_FUSED` / …) required on packaged records

## 7. Buffering & Backpressure

- Sensors may buffer bounded frames; overflow policy is drop-oldest with `WARN` telemetry
- Primary optical path has priority under thermal/memory pressure
- Coordinator owns flush-on-commit semantics

## 8. Multi-Tier Failure & Policy Escalation

```text
Sensor Failure Occurs
   │
   ├── Is Sensor marked OPTIONAL?
   │     └── Emit WARN → Record SensorRecord error → Continue Capture
   │
   ├── Is Sensor marked REQUIRED for CapturePoint?
   │     └── Emit BLOCK_CAPTURE → Prevent photo commit → Require user retry
   │
   └── Is Sensor required for Session Export?
         └── Mark Session INCOMPLETE → Emit BLOCK_EXPORT at package boundary
```

| Failure class | Capture-level | Session / export-level |
|---|---|---|
| Optional location / heading timeout | `WARN`; optical commit may proceed | Usually does not block export |
| Optional IMU sample gap | `WARN` | Per quality policy |
| Optional depth unavailable | Spatial channel skipped | Spatial export omitted |
| Optional thermal adapter disconnect | External channel stops | Thermal channel omitted |
| Required for CapturePoint | `BLOCK_CAPTURE` | Point incomplete |
| Required for Session Export | (may also `BLOCK_CAPTURE`) | `INCOMPLETE` → `BLOCK_EXPORT` |
| Optical pipeline failure | `BLOCK_CAPTURE` | `BLOCK_EXPORT` for that point |

Do **not** treat every auxiliary failure as `WARN`.

## 9. Verification Hook (evidence operation)

`VERIFY` / `COMMIT` run in the **evidence operation** machine (§4.2), not as sensor lifecycle states. Packaging runs deterministic checks (metadata completeness, calibration honesty, quality policy stage). Results attach as structured `QualityAssessment` / telemetry — not free-text AI summaries.

## 10. Relation to Phase 1

Phase 1 still capture remains the optical baseline. This framework **wraps and extends** it; it does not replace Phase 1A package contracts.
