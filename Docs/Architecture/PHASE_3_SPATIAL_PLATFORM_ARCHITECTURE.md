# Phase 3 — Spatial & Sensor Platform Architecture

| Field | Value |
|---|---|
| Status | **ARCHITECTURE_DRAFT — IMPLEMENTATION GATED** |
| Version | **1.1.0** |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED** on `Phase1StillCapture`); OCC / authoritative commit contracts remain in force |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `ADR-SESSION-REVISION-OCC.md` (S2-004), `ADR-SESSION-RECOVERY-AND-QUARANTINE.md` |
| Supersedes | Draft 1.0.0 monolithic `SensorManager` sketch (composition model below is normative) |

**This document is an architectural blueprint only.** It does not authorize production ARKit / AVFoundation / LiDAR workflows. **Zero Swift code, test files, or build-setting changes** are in scope for this pass.

---

## 0. Blueprint (normative topology)

```text
                    [ Apple Framework Adapters ]
              (ARKit / AVFoundation / CoreMotion)
                               │
                               ▼
                  [ Composable Sensor Sources ]
   ┌───────────────────┬───────────────────┬───────────────────┐
   │   CameraSource    │    DepthSource    │   MotionSource    │
   └───────────────────┴───────────────────┴───────────────────┘
                               │
                               ▼
                [ SpatialSensorCoordinator ]
             (Capability & Interruption Aware)
                               │
                               ▼
               [ Spatial Capture Session Builder ]
                  (Monotonic & Wall Clocks)
                               │
                               ▼
                  [ Evidence Package Builder ]
  ┌─────────────────────────────────────────────────────────┐
  │ Canonical Spatial Manifest (JSON)                        │
  │ ├── Capability Record & Device Floor                    │
  │ ├── Coordinate Frame Registry (Explicit Semantics)       │
  │ ├── Synchronization & Clock Correlation Matrix         │
  │ └── Hash-Indexed Artifact References (SHA-256)          │
  ├─────────────────────────────────────────────────────────┤
  │ External Binary Payloads                                │
  │ ├── Raw RGB Images (.heic / .png)                        │
  │ ├── Binary Depth & Confidence Maps (.bin / .raw)        │
  │ └── Motion & Pose Sample Batches (.bin)                 │
  └─────────────────────────────────────────────────────────┘
```

**Core philosophy:** bounded sensor acquisition and spatial packaging only. Reconstruction, SfM, meshing, densification, CAD verdicts, and AI remain **strictly deferred to Phase 4+**.

---

## 1. Mission & boundaries

### 1.1 Mission

Acquire **deterministic spatial evidence datasets** — images, pose metadata, depth/LiDAR (when capable), IMU/motion samples, and calibration — and package them so Phases 4–5 can trust provenance, time, and geometry **without inventing missing sensor truth**.

Phase 3 does **not** reconstruct the world. It **captures and packages** what the sensors observed.

### 1.2 In scope

| ID | Workstream | Deliverable class |
|---|---|---|
| **3.1** | Composable sensor sources + coordinator | `CameraSource` / `DepthSource` / `MotionSource` + `SpatialSensorCoordinator` |
| **3.2** | Spatial capture session builder | Dual-clock session; frame/sample indices |
| **3.3** | Calibration framework | Intrinsics \(K\), distortion, extrinsics; lineage to AV calibration |
| **3.4** | Photogrammetry capture | Raw multi-view RGB + per-frame pose / \(K\) |
| **3.5** | Depth / LiDAR capture | Raw depth + confidence + pose (**capability-gated**) |
| **3.6** | Spatial manifest + package | Canonical JSON index + external binaries + OCC |

### 1.3 Explicitly out of scope (Phases 4–8+)

| Deferred | Phase |
|---|---|
| Mesh generation / surface reconstruction | 4+ |
| Structure-from-Motion / dense reconstruction | 4+ |
| Point-cloud densification / fusion solvers | 5+ |
| CAD / vehicle-frame engineering alignment verdicts | 6+ |
| AI segmentation / semantics | 7–8+ |
| Certified metrology from ARKit/LiDAR alone | **Never by default** (`GUIDANCE_ESTIMATE`) |

### 1.4 Authority & Phase 2 integrity

- Pose / depth default authority: **`GUIDANCE_ESTIMATE`**.
- Capture does not authorize conversions, designs, or Build Engine policy (`SYSTEM_BOUNDARIES.md`).
- Sprint 2.3 OCC posture is preserved at spatial scale: repository-assigned sequence tokens, no silent LWW, no adopt-before-durable-persist, sealed packages never overwritten in place.
- **High-frequency payloads stay out of canonical JSON** so manifest hashing remains tractable and OCC digests stay stable as datasets grow.

---

## 2. Layering & dependency rules

| Layer | May depend on | Must not depend on |
|---|---|---|
| Domain / Evidence Repository | Spatial **contracts** only | ARKit, AVFoundation, CoreMotion, RealityKit |
| Framework adapters | Apple SDKs | Domain stores, EDTS, Build Engine |
| Composable sources | Adapters + contracts | UI, inspection ViewModels |
| `SpatialSensorCoordinator` | Sources + Capability Model | Direct UIKit/SwiftUI |
| Package builder | Contracts + file I/O ports | Apple sensor sessions |

Evidence Repository never opens an `ARSession`. It only accepts sealed package references and sample indices.

### 2.1 Existing scaffolding (today)

| Path | Today | Phase 3 role |
|---|---|---|
| `App/Spatial/*` | README stubs; SPM-excluded | ARKit adapter + pose/depth source backing |
| `App/Motion/*` | README stubs | CoreMotion adapter → `MotionSource` |
| `App/Calibration/*` | README stubs; AVCameraCalibration-first | Calibration lock + derivative lineage |
| `DeviceCapabilitySnapshotProviding` | LiDAR/depth probes | Feeds Capability Model / device floor |

---

## 3. Phase 3.1 — Composable sensor composition

### 3.1 Rejected: monolithic `SensorManager`

A single god-object that owns camera + depth + motion + interruption + capability conflates failure domains and forces LiDAR-shaped APIs onto non-LiDAR devices. **Normative design is composition.**

### 3.2 Discrete sources

| Source | Primary adapters | Emits |
|---|---|---|
| `CameraSource` | AVFoundation (+ ARKit camera frames when armed) | RGB frame refs, exposure metadata, calibration hooks |
| `DepthSource` | ARKit scene depth / LiDAR path | Depth + confidence buffers **or** explicit `unavailable` |
| `MotionSource` | CoreMotion (+ ARKit pose when armed) | IMU windows, pose samples |

Each source:

- Declares its **required capability floor** subset
- Surfaces **interruption** / tracking-loss events for its domain only
- Never writes package bytes directly (coordinator → session builder → package builder)

### 3.3 `SpatialSensorCoordinator`

Responsibilities:

1. **Compose** the active source set from plan/capability requirements  
2. Apply **Capability Model** before arming streams (fail closed or labeled demo — never silent)  
3. Fan-in source events into an ordered capture timeline  
4. Propagate **interruptions** (backgrounding, thermal, tracking reset, permission loss) without corrupting sealed state  
5. Expose a narrow façade to the Spatial Capture Session Builder  

```text
SpatialSensorCoordinator
  ├─ resolveCapabilities() -> SpatialCapabilityRecord
  ├─ arm(sources: SourceMask) throws  // capability-checked
  ├─ disarm()
  ├─ events: AsyncSequence<CoordinatorEvent>
  └─ interruptionPolicy: InterruptionPolicy
```

UI and inspection coordinators speak to `SpatialSensorCoordinator`, not to ARKit/AVFoundation types.

---

## 4. Capability Model (non-LiDAR gracefulness)

### 4.1 Device floor vs. feature options

| Concept | Meaning |
|---|---|
| **Device floor** | Minimum profile required for a given capture mode (e.g. “RGB+pose guidance” vs “RGB+depth engineering”) |
| **Feature option** | Optional stream (depth, high-rate IMU) that may be `supported` / `unsupported` / `denied` / `unavailable_runtime` |

Non-LiDAR hardware is a **first-class path**, not an afterthought:

- Plans that **require** depth refuse engineering capture on non-LiDAR with an explicit reason code.  
- Plans that **allow** RGB+pose-only proceed with `DepthSource` recorded as `unsupported` in the Capability Record — **no fake depth artifacts**.  
- Demo / unsupported modes must be **labeled**; never indistinguishable from engineering capture.

### 4.2 `SpatialCapabilityRecord` (manifest section)

Minimum fields:

- Device model class / capability snapshot digest  
- Per-source support matrix (`CameraSource`, `DepthSource`, `MotionSource`)  
- Armed vs. required mask  
- Refusal / demo reason codes when below floor  
- Authority defaults (`GUIDANCE_ESTIMATE`)

Capability Record is hashed into the sealed package so downstream consumers can see what was physically possible at capture time.

---

## 5. Clocks — monotonic capture vs wall epoch

### 5.1 Separation rule

| Clock | Role | Used for |
|---|---|---|
| **Monotonic capture clock** | Ordering and sync within a session | Frame-to-frame deltas, RGB↔depth association, IMU windowing |
| **Wall-clock epoch** | Human/audit anchoring (UTC when available) | Package `createdAt` / `sealedAt`, export labels |

**Forbidden:** using wall clock as the sole ordering key for high-rate samples, or comparing `arkit_frame`, `avfoundation_capture`, and `core_motion` domains without an explicit correlation record (`TIMESTAMP_STANDARD.md`).

### 5.2 Synchronization & clock correlation matrix (manifest)

The canonical manifest includes a **correlation matrix / mapping table**:

| From domain | To domain | Method | Residual / uncertainty | Valid interval |
|---|---|---|---|---|
| `avfoundation_capture` | monotonic session | documented | required | session span |
| `arkit_frame` | monotonic session | documented | required | session span |
| `core_motion` | monotonic session | documented | required | session span |
| monotonic session | `wall` UTC | documented | required | epoch anchors only |

Do not claim “exact camera/IMU sync” without a named validation method and residual.

---

## 6. Coordinate frames — explicit matrix semantics

Anonymous \(4\times4\) matrices are **rejected**. Every pose/transform record must carry (`COORDINATE_FRAME_STANDARD.md`):

| Field | Requirement |
|---|---|
| `source_frame` / `target_frame` | From registry (e.g. `camera` → `arkit_world`) |
| `matrix_layout` | `column_major` \| `row_major` |
| `handedness` | Explicit (do not assume ARKit convention silently) |
| `translation_unit` | Meter |
| `timestamp` + `clock_domain` | Required |
| `authority` | Default `GUIDANCE_ESTIMATE` |
| `trackingQuality` / uncertainty | When available |

### 6.1 Frame registry (manifest)

Sealed packages embed the **Coordinate Frame Registry** used for that session (frame ids + axis/handedness notes). Downstream Phase 4+ must not guess conventions.

Frame-to-frame relationships (RGB camera ↔ depth camera extrinsics, device ↔ ARKit world) are **named edges** in that registry, not implied by file adjacency.

---

## 7. Spatial Capture Session Builder

### 7.1 Role

Consumes coordinator events and builds an in-progress session index:

- Assigns sample ids  
- Stamps **monotonic** capture times  
- Attaches wall epoch only at defined anchors  
- Enforces capability-consistent sample sets (no orphan “required” depth when depth unsupported)  
- Hands a finalize request to the Evidence Package Builder  

### 7.2 Lifecycle

```text
idle → preparing (capability + calibration lock)
    → capturing
    → finalizing (flush binaries, write manifest, hash)
    → sealed | failed | canceled
```

Interruptions during `capturing` mark affected sample ranges; they must not silently rewrite already-flushed originals.

### 7.3 Linkage to inspection

Optional `inspectionSessionID` / `inspectionPointID`. Spatial packaging does not invent inspection authority. Inspection bindings reference **sealed** package / sample ids only.

---

## 8. Calibration (Phase 3.3)

- Prefer **AVCameraCalibrationData** as canonical intrinsics/distortion source when present.  
- OpenCV-style coefficients are **derived artifacts** with lineage pointers back to the AV calibration record — never unlabeled replacements.  
- RGB↔depth extrinsics recorded as explicit frame-registry edges when both streams armed.  
- Calibration lock is hashed into the manifest.

---

## 9. Evidence package structure (Phase 3.6)

### 9.1 Split: canonical JSON vs external binaries

| In canonical Spatial Manifest (JSON) | External binary payloads |
|---|---|
| Capability Record & device floor | Raw RGB (`.heic` / `.png`) |
| Coordinate Frame Registry | Depth & confidence maps (`.bin` / `.raw`) |
| Clock correlation matrix | Motion & pose sample batches (`.bin`) |
| Sample indices + metadata summaries | Calibration sidecars if binary |
| SHA-256 (or versioned algo) content hashes + package-relative paths | — |
| Package identity, schema version, OCC revision | — |

**High-frequency time series and image/depth rasters must not be inlined into canonical JSON.** Manifest entries are hash-indexed references only.

### 9.2 Lineage-preserving derived artifacts

| Rule | Requirement |
|---|---|
| Originals | Immutable once sealed; soft-delete → quarantine (never overwrite in place) |
| Derivatives | New artifact ids; must declare `derivedFrom` hash(es) + transform method id |
| Retake | New spatial package / sample ids (same posture as Phase 1 evidence retake) |

This keeps Phase 2 OCC and hash-integrity guarantees intact as spatial volume grows.

### 9.3 Hashing & OCC

- Artifact bytes: content hash with versioned algorithm id (e.g. `sha256`).  
- Manifest digest: hash of **canonical JSON** of the manifest payload excluding the self-digest field.  
- Package commits use repository-assigned revision / sequence tokens; callers supply `expectedRevision` (S2-004 posture).  
- Rejected commits: side-effect free.  
- Recovery must not install lower package revision over higher durable head.  
- Swift `Hasher` / `hashValue` forbidden for persisted identity.

### 9.4 Per-sample metadata retained in the index (not the raster)

Even with binaries externalized, the manifest index must still carry enough for Phase 4+:

- Monotonic timestamp (+ clock domain)  
- Intrinsics \(K\) / distortion ref  
- Extrinsic pose with full frame semantics  
- Depth alignment to RGB sample id (when both present)  
- Authority + tracking quality  

---

## 10. End-to-end data flow

```text
1. Guided point requests spatial evidence (InspectionSession)
2. Coordinator.resolveCapabilities → Capability Record
3. Below floor? refuse or labeled demo; else arm sources
4. Calibration lock
5. Sources emit → Coordinator → Session Builder (monotonic timeline)
6. Package Builder writes external binaries atomically
7. Write canonical Spatial Manifest + digests
8. Repository commit (expectedRevision) → sealed package
9. Inspection binding references sealed ids only
10. Export / EDTS intake consumes sealed package only
```

Failure before seal: no inspection binding to partial packages; staging disposition follows recovery ADR (quarantine when implemented).

---

## 11. Subsystem → artifact map

| Subsystem | Phase 3 artifact | Why early |
|---|---|---|
| Composable sources + coordinator | Unified, capability-aware streams | OS API isolation + interruption hygiene |
| Capability Model | Device floor + support matrix | Honest non-LiDAR operation |
| Dual clocks + correlation matrix | Sync without wall-clock abuse | Deterministic temporal joins |
| Frame registry | Explicit matrix semantics | No anonymous transforms |
| Calibration | \(K\), distortion, extrinsics lineage | Phase 4 does not reverse-engineer cameras |
| Manifest + binaries | Hash-indexed package | OCC/hash integrity at spatial scale |

---

## 12. Implementation gates (coding not authorized yet)

Phase 3 production coding starts only when **all** hold:

1. Sprint 2.3 success gate: Mac `xcodebuild` on `Phase1StillCapture` **PASSED** and recorded in `sprint_2_3_execution_manifest.json`  
2. This architecture reaches `ARCHITECTURE_ACCEPTED`  
3. Narrow ADRs for: spatial package schema version, hash algorithm ids, RGB↔depth sync tolerance, device-floor matrix  

Suggested post-acceptance slices:

1. Contracts-only target (no Apple frameworks in domain)  
2. Package builder + OCC store with fixture binaries  
3. `CameraSource` + calibration lock  
4. `MotionSource` / pose path (`GUIDANCE_ESTIMATE`)  
5. `DepthSource` on LiDAR floor only  

---

## 13. Document control

| Change | Rule |
|---|---|
| Reintroduce monolithic SensorManager as sole API | **Rejected** — coordinator + sources remain normative |
| Inline high-rate samples into manifest JSON | **Rejected** |
| Elevate authority above `GUIDANCE_ESTIMATE` | New ADR + validation evidence |
| Add mesh/SfM into Phase 3 | **Rejected** — Phase 4+ |
| Mutate sealed package / originals in place | **Forbidden** |

**Classification:** `PHASE_3_ARCHITECTURE_DRAFT_IMPLEMENTATION_PENDING`
