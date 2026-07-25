# IR-0001: AVFoundation Manual Exposure & Focus Controls

## 1. Metadata & Source

| Field | Value |
|---|---|
| **Candidate Source** | Apple AVFoundation (first-party SDK) |
| **Target Subsystem** | Professional Camera (v2.0A) |
| **License & Language** | Apple SDK / Swift |
| **Status** | `APPROVED_FOR_ISOLATED_SPIKE` — execution after Specs 1–6 `BASELINE_APPROVED` |
| **Spike folder** | `Research/Spikes/IR-0001/` (**non-production** only) |
| **Spec gate** | `BASELINE_APPROVAL_PENDING_FINAL_SIGN_OFF` (not yet `BASELINE_APPROVED`) |

## 2. Technical Evaluation

### Problem Solved

Eliminates exposure drift and focus hunting across multi-angle vehicle inspection shots by locking lens position, ISO, and shutter duration programmatically.

### APIs Evaluated

- `AVCaptureDevice.lockForConfiguration()`
- `setExposureModeCustom(duration:ISO:completionHandler:)`
- `setFocusModeLocked(lensPosition:completionHandler:)`
- Capability queries: `isExposureModeSupported(.custom)`, `isFocusModeSupported(.locked)`

### Sensor Framework Fit

Implements `EvidenceSensor`? **Planned Yes** — wrapped by camera sensor adapter; capability matrix gates UI controls.

### Performance Profile

| Dimension | Assessment |
|---|---|
| Memory | Expected low (no frame copies beyond normal capture) — **unprofiled** |
| CPU/GPU | Expected less continuous AF/AE hunting when locked — **unprofiled** |
| Thermal | **`UNMEASURED`** until Instruments / device thermal profiling; do not claim reduced load |
| Battery | **`UNMEASURED`** |

This IR does **not** prove “direct hardware register locking” beyond AVFoundation configuration APIs listed above.

### Failure Modes & Stability

- Unsupported modes on some lenses → must degrade via capability registry (no crash)
- `lockForConfiguration` contention → retry/backoff; never force unlock of another owner
- Interruption (call / background) → restore lock policy after `AVCaptureSession` resume

### Security & Calibration

- No network; on-device only
- Does not alter RAW bytes after freeze; only pre-capture device configuration

## 3. Provenance & Adoption Decision

| Field | Value |
|---|---|
| **Decision** | `REFERENCE ONLY` (Apple SDK patterns) + `ALGORITHM REIMPLEMENTATION` (Elektron capability registry / lock orchestration) |
| **Source Code Copied** | No |
| **Algorithm Independently Implemented** | Yes (registry + lock state machine) |
| **API Patterns Referenced** | Yes |
| **Attribution Required** | No (Apple SDK) |
| **License Notice Required** | No beyond Apple SDK terms |
| **Production Files Affected** | None yet (spike / v2.0A pending) |

## 4. Integration Strategy

Wrap capability queries inside `CaptureDeviceCapabilityRegistry` so UI exposes only supported controls per physical lens. Orchestrate locks through the camera `EvidenceSensor` so Session Coordinator owns lifecycle.

## 5. Next Spike

Execute only under `Research/Spikes/IR-0001/`. Confirm on physical devices from Capability Matrix (wide / ultra-wide / tele where present). Fill `RESULTS.md`. Do **not** merge sandbox code into production targets until Specs 4–6 review + explicit promotion gate.

## 6. Sequencing

```text
Specs 1–3 hardened → Specs 4–6 drafted → IR-0001 isolated spike → (later) v2.0A production
```
