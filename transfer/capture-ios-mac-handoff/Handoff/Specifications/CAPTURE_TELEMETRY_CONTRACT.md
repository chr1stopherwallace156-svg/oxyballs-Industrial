# CAPTURE TELEMETRY CONTRACT

**Document ID:** EC-V2-SPEC-005  
**Status:** `DRAFT_FOR_BASELINE_REVIEW` — correction pass applied  
**Applies To:** Capture v2.0A and later  
**Gate:** `BASELINE_APPROVAL_PENDING_CORRECTION_PASS`  
**Depends on:** EC-V2-SPEC-001, EC-V2-SPEC-002, EC-V2-SPEC-003  
**Production code:** None

## 1. Purpose

This specification defines the timestamp, synchronization, provenance,
calibration, storage, and integrity requirements for telemetry recorded by
Elektron Capture.

Telemetry provides evidence about capture conditions. It does not diagnose
vehicle state or infer component identity.

## 2. Telemetry Principles

1. Every sample must identify its source.
2. Every sample must carry a timestamp and timestamp-domain identifier.
3. Missing telemetry must be represented explicitly.
4. Samples must not be silently interpolated into RAW evidence.
5. Derived telemetry must preserve input lineage and processor version.
6. Original sensor-native timestamps must be retained when available.
7. Clock uncertainty must never be represented as zero unless proven.
8. High-rate streams must not duplicate wall-clock stamps per sample unless required.

## 3. Typed evidence values

Optional or conditionally present measurements use an explicit wrapper.
The **wrapper field** may be required on a record; the underlying value must
not be fabricated.

```swift
struct EvidenceValue<T> {
  var availability: AvailabilityState
  var value: T?
  var reasonCode: String?
}
```

### Availability states

- `AVAILABLE`
- `NOT_SUPPORTED`
- `NOT_AUTHORIZED`
- `TEMPORARILY_UNAVAILABLE`
- `SENSOR_ERROR`
- `NOT_REQUESTED`
- `UNKNOWN`

A missing numeric measurement must never be encoded as zero.

Examples:

- an authorization event has no measurement unit;
- an image-state event may not have a coordinate frame;
- a sensor may not expose a native timestamp;
- not every record has calibration.

## 4. Timestamp Taxonomy

### `monotonicTimestamp`

Local monotonic time used for ordering and duration measurement.

Required fields when present as a concrete stamp:

- `value`
- `timescale`
- `clockDomain`
- `bootSessionID`

### `wallClockTimestamp`

UTC-oriented civil timestamp as `EvidenceValue`.

When present and `AVAILABLE`, required components:

- `value`
- `source` (see §5)
- `uncertainty`
- `timezoneOffsetAtCapture`

UTC values must not erase locally observed timezone metadata.

### `sensorNativeTimestamp`

Timestamp emitted by the sensor or framework as `EvidenceValue`.

When `AVAILABLE`:

- `value`
- `timescale`
- `sensorClockDomain`
- `wraparoundMetadata`
- `conversionStatus`

### High-rate sample policy

For accelerometer, gyroscope, and similar high-rate streams, each sample SHOULD carry:

- sensor-native **or** monotonic timestamp;
- `clockAnchorID`;

and MUST NOT require a per-sample wall-clock timestamp.

Derived wall-clock projection (when needed) is **CAPTURE_DERIVED** (or equivalent
derived class), must cite `clockAnchorID`, and must include uncertainty.

### `ClockAnchor`

Maps two clock domains at an observed instant.

Required fields:

- `anchorID`
- `monotonicTimestamp`
- `wallClockTimestamp` (`EvidenceValue`)
- `wallClockSource`
- `sourceEvidenceReference`
- `uncertainty`
- `captureMethod`
- `createdAt`
- `bootSessionID`

A clock anchor is evidence of an observed mapping, not proof of trusted global time.

## 5. Clock Sources

Permitted wall-clock source identifiers:

- `SYSTEM_WALL_CLOCK`
- `EXTERNAL_NETWORK_TIME_MEASUREMENT`
- `EXTERNAL_GNSS_TIME_MEASUREMENT`
- `EXTERNAL_SENSOR_CLOCK`
- `UNKNOWN`

`EXTERNAL_NETWORK_TIME_MEASUREMENT` and `EXTERNAL_GNSS_TIME_MEASUREMENT` may be
used **only** when the app receives evidence of those sources.
Core Location coordinates/timestamps do **not** automatically prove direct GNSS time.

Network connectivity alone does not prove NTP synchronization.

## 6. Core Telemetry Record

### `TelemetryRecord`

Required structural fields:

- `recordID`
- `sessionID`
- `attemptID` (`EvidenceValue` / nullable binding)
- `sensorID`
- `sensorType`
- `sampleType`
- `schemaVersion`
- `sourceAPI`
- `processingClass` — one of `SENSOR_REPORTED` · `FRAMEWORK_FUSED` · `CAPTURE_DERIVED` · `EXTERNAL_DERIVED`
- `monotonicTimestamp` **or** `sensorNativeTimestamp` (at least one `AVAILABLE`)
- `clockAnchorID`
- `clockUncertainty` (`EvidenceValue`)

Conditionally present as `EvidenceValue<T>` (wrapper present; value not fabricated):

- `wallClockTimestamp`
- `sensorNativeTimestamp`
- `measurementValue`
- `measurementUnit`
- `coordinateFrame`
- `calibrationReferenceID`
- `qualityFlags`

## 7. Coordinate Frames & Transforms

Every vector or pose must declare its coordinate frame when geometrically meaningful.

Minimum frame identifiers:

- `DEVICE_BODY`
- `CAMERA_OPTICAL`
- `IMAGE_PIXEL`
- `WORLD_SESSION`
- `GRAVITY_ALIGNED`
- `SENSOR_NATIVE`
- `UNKNOWN`

Transformations between frames are derived evidence and must record:

- source frame
- destination frame
- transformation matrix
- `matrixLayout` (e.g. `column-major`, `row-major`)
- `vectorConvention` (e.g. `column-vector`, `row-vector`)
- `handedness` (e.g. `right-handed`, `left-handed`)
- `axisDefinitions`
- `unit` (e.g. `meters`)
- `transformDirection` (e.g. `source-to-destination`)
- processor version
- calibration reference
- input record IDs

A bare 4×4 matrix without convention metadata is non-conformant.

## 8. Sensor Sampling Contracts

### 8.1 Camera

Record when available (as `EvidenceValue`): presentation timestamp, exposure
duration, ISO, lens position, white-balance gains, orientation, active format,
focus/exposure adjustment state, intrinsic matrix, calibration reference.

### 8.2 Motion

Record separately:

- accelerometer (classify via `processingClass` + source API — **not** assumed “uncalibrated RAW”)
- gyroscope
- magnetometer
- device-motion attitude
- gravity
- user acceleration
- rotation rate

Framework-fused values must be `FRAMEWORK_FUSED` or `CAPTURE_DERIVED`, never
labeled as unmodified sensor hardware bytes unless proven.

### 8.3 Location and Heading

Record coordinate, altitude, accuracies, course, speed, headings, authorization
state, and source timestamp as `EvidenceValue`s. Location failure must not fabricate coordinates.

### 8.4 Depth and Pose

Record depth/disparity representation, dimensions, pixel format, calibration
reference, camera transform (with §7 metadata), tracking state, timestamp
association, and confidence representation when available.

## 9. Synchronization

Telemetry association with a committed artifact must define:

- target artifact timestamp;
- permitted pre-capture window;
- permitted post-capture window;
- nearest-sample rule;
- interpolation policy;
- missing-data policy;
- maximum tolerated uncertainty.

Interpolation is derived evidence and must not replace retained sensor-reported samples.

## 10. Data Segmentation

Telemetry must be segmented by application launch, device boot session,
inspection session, capture attempt, and sensor lifecycle instance.

Records from different boot sessions must not be joined on monotonic time
without a documented clock anchor.

## 11. Integrity and Packaging

Sensor-reported and packaged telemetry streams must include:

- byte count
- SHA-256
- encoding
- schema version
- record count
- start timestamp
- end timestamp

The manifest must declare all telemetry files and their
**relationships to artifacts, capture attempts, sensors, and clock anchors**.

## 12. Privacy and Minimization

Location, heading, and external identifiers must be collected only when enabled
by the workflow, authorized by the user, and required by the declared evidence
contract. Disabled or unauthorized collection must be explicitly represented.

## 13. Acceptance Criteria

This specification passes review when:

- every timestamp declares a clock domain;
- wall-clock and monotonic time remain distinct;
- high-rate samples are not forced to carry wall-clock stamps;
- boot-session boundaries are represented;
- missing values cannot masquerade as zero (`EvidenceValue`);
- `SENSOR_REPORTED` / `FRAMEWORK_FUSED` / derived classes are distinguishable;
- transform convention metadata is complete;
- artifact association rules are deterministic;
- interpolation remains regenerable and lineage-preserving.
