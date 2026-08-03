# CAPTURE DEVICE CAPABILITY MATRIX

**Document ID:** EC-V2-SPEC-004  
**Status:** `DRAFT_FOR_BASELINE_REVIEW` — correction pass applied  
**Applies To:** Capture v2.0A and later  
**Gate:** `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW`  
**Depends on:** EC-V2-SPEC-001, EC-V2-SPEC-003  
**Production code:** None

## 1. Purpose

This specification defines how Elektron Capture discovers, records, compares,
and exposes hardware capabilities without assuming that every supported device,
lens, operating-system version, or sensor configuration provides identical
features.

The capability system reports observable device support. It does not infer
hardware behavior from model names alone.

## 2. Governing Rules

1. Every configurable feature must be capability-queried before use.
2. Unsupported controls must not be presented as available.
3. Capability discovery must not modify active capture configuration.
4. Capability records are immutable after creation.
5. Hardware changes create a new capability snapshot.
6. No capability may be inferred solely from an iPhone product model.
7. Runtime capability results override static compatibility tables.
8. Static references may inform research; they must not override runtime observations.

## 3. Core Entities

### `DeviceCapabilitySnapshot`

Required fields:

- `snapshotID`
- `sessionID`
- `configurationID`
- `sensorLifecycleInstanceID`
- `previousSnapshotID` (null for the initial session snapshot)
- `triggerEventID`
- `deviceID`
- `deviceType`
- `devicePosition`
- `capturedAtMonotonicTimestamp`
- `capturedAtWallClockTimestamp` (as `EvidenceValue`; may be unavailable)
- `operatingSystemVersion`
- `applicationVersion`
- `captureFrameworkVersion`
- `activeFormatID`
- `snapshotReason`
- `snapshotSchemaVersion`
- `discoveredCapabilities`
- `configuredCapabilities`
- `activeRuntimeState`

#### Capability partitions

| Partition | Meaning |
|---|---|
| `discoveredCapabilities` | What the runtime API reports as generally available on the device/format |
| `configuredCapabilities` | What the current session configuration has enabled / requested |
| `activeRuntimeState` | What is usable **now** (may be temporarily unavailable though discovered) |

A device may support custom exposure in `discoveredCapabilities` while
`activeRuntimeState` reports `UNAVAILABLE_DURING_CURRENT_STATE` for the active format.

### `CapabilityValue<T>`

Each capability entry contains:

- `capabilityID`
- `supportState`
- `reportedValue` (typed; may be absent per availability)
- `sourceAPI`
- `queriedAt`
- `failureReason`
- `observationAuthority`
- `observationCompleteness`
- `queryResult`

#### `supportState`

- `SUPPORTED`
- `UNSUPPORTED`
- `UNAVAILABLE_DURING_CURRENT_STATE`
- `QUERY_FAILED`
- `UNKNOWN`

`UNKNOWN` must never be converted to `UNSUPPORTED`.

#### `observationAuthority`

- `DIRECT_RUNTIME_QUERY`
- `STATIC_REFERENCE_ONLY`
- `EXTERNAL_SENSOR_DECLARATION`
- `UNKNOWN_AUTHORITY`

Runtime observations (`DIRECT_RUNTIME_QUERY`) always override static references.

#### `observationCompleteness`

- `COMPLETE`
- `PARTIAL`
- `FAILED`
- `NOT_QUERIED`

#### `queryResult`

- `SUCCESS`
- `API_UNSUPPORTED`
- `API_ERROR`
- `PERMISSION_DENIED`
- `NOT_APPLICABLE`

Do **not** use a generic subjective `confidence` field.

## 4. Snapshot Reasons

A new immutable snapshot is required when:

- a session begins;
- the active camera changes;
- the active lens changes;
- the active format changes;
- frame-rate configuration changes;
- depth delivery configuration changes;
- an interruption is recovered;
- media services reset;
- an external sensor reconnects;
- thermal restriction materially changes available capture modes;
- the operating system reports a material capability change.

Each new snapshot MUST set `previousSnapshotID` to the prior active snapshot
(when one exists), a new `configurationID` / `triggerEventID` as applicable,
and preserve full history.

## 5. Camera Capability Categories

### 5.1 Device Discovery

Record:

- unique device identifier
- localized device name
- device type
- physical position
- virtual-device membership
- constituent devices
- connected state
- suspended state

### 5.2 Focus

Record support for:

- continuous autofocus
- single autofocus
- locked focus
- lens-position control
- autofocus range restriction
- smooth autofocus
- subject-area monitoring
- minimum focus distance when available

Ranges must include minimum, maximum, step/precision when exposed, and active value at snapshot time.

### 5.3 Exposure

Record support for:

- continuous auto exposure
- single auto exposure
- locked exposure
- custom exposure
- exposure target bias
- active / min / max ISO
- active / min / max exposure duration

### 5.4 White Balance

Record support for continuous AWB, locked WB, temperature/tint conversion,
device-gain control, and supported gain ranges.

### 5.5 Format and Frame Rate

For every discoverable format, record media subtype, dimensions, frame-rate
ranges, FOV, stabilization modes, HDR, color space, depth support, highest
photo dimensions, and video binned state where reported.

### 5.6 Photo Output

Record support for:

- RAW capture
- processed capture
- supported codecs
- flash modes
- calibration data delivery
- depth data delivery
- bracketed capture
- quality prioritization modes

Support must only be recorded when exposed by the runtime API.

#### Semantic segmentation mattes — production prohibition

```text
SEMANTIC_MATTE_CAPABILITY_DETECTED_BUT_PRODUCTION_USE_PROHIBITED
```

The capability registry may report that semantic matte delivery is exposed by
the platform, but Capture v2 production workflows must not request, consume,
package, or use semantic mattes while the learned-interpretation prohibition
remains active.

Any research into platform mattes belongs under `Research/Deferred/` with **no**
production interfaces.

### 5.7 Spatial and Depth Capabilities

Record depth-capable formats, depth data types, calibration-data availability,
intrinsic-matrix availability, disparity versus depth representation, filtering
support, and LiDAR availability **as directly reported by the device**.

No spatial capability may be inferred from marketing model names.

## 6. External Sensor Capability Records

External sensors use the same capability-value semantics (transport, vendor/product
IDs, firmware, channels, resolution, unit, sample rate, timestamp support,
calibration support, connection state, required permissions).

## 7. Capability Matrix Presentation

The UI-facing matrix must preserve distinction between unsupported, temporarily
unavailable, query failure, unknown, and supported — never collapsed into one
generic disabled state without an accessible reason.

## 8. Required Compatibility Behavior

When a requested feature is unsupported:

1. preserve the requested workflow intent;
2. select only an explicitly authorized fallback;
3. record the fallback;
4. record the unsupported capability;
5. never silently substitute a different capture mode.

## 9. Acceptance Criteria

This specification passes review when:

- all v2.0A controls map to explicit capability entries;
- snapshot creation triggers and history links (`previousSnapshotID`, etc.) are defined;
- discovered / configured / active partitions are distinct;
- static model-name assumptions are prohibited;
- `observationAuthority` replaces subjective confidence;
- semantic mattes cannot enter production packaging;
- `UNKNOWN` and `UNSUPPORTED` remain distinct;
- capability changes cannot overwrite previous snapshots.
