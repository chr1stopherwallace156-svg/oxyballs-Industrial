# Phase 3 — Spatial & Sensor Platform Architecture

| Field | Value |
|---|---|
| Status | **ARCHITECTURE_DRAFT — IMPLEMENTATION GATED** |
| Version | **1.2.0** |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED** on `Phase1StillCapture`); OCC / authoritative commit contracts remain in force |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `ADR-SESSION-REVISION-OCC.md` (S2-004), `ADR-SESSION-RECOVERY-AND-QUARANTINE.md` |
| Supersedes | Draft 1.0.0 monolithic `SensorManager`; Draft 1.1.0 composable coordinator (lifecycle FSM + hardware-neutral adapters added below) |

**This document is an architectural blueprint only.** It does not authorize production ARKit / AVFoundation / LiDAR workflows. **Zero Swift code, test files, or build-setting changes** are in scope for this pass.

---

## 0. Core philosophy

> **The raw Spatial Evidence Package is permanent and authoritative; the digital twin / mesh is ephemeral and derived.**

Spatial data is treated with the same rigor as legal / forensic evidence:

- An improved reconstruction algorithm five years later **re-runs against the untouched, hash-verified evidence package** — it does not query a lossy pre-baked `.obj`.
- An audit of geometric integrity for a vehicle component returns to **immutable sensor truth**, not a replaceable twin snapshot.
- Phase 3 therefore owns **acquisition, synchronization, representation, persistence, and packaging** of evidence — not reconstruction.

Reconstruction, SfM, meshing, densification, CAD verdicts, and AI remain **strictly deferred to Phase 4+**, and may only consume packages that have reached **`VERIFIED` or `ARCHIVED`** (see §2).

---

## 1. Blueprint (normative topology)

```text
           [ Platform Sensor Adapters ]          ← hardware-neutral protocol
     (ARKit / AVFoundation / CoreMotion today;
      GigE Vision / thermal / structured-light later)
                           │
                           ▼
              [ Composable Sensor Sources ]
 ┌──────────┬──────────┬──────────┬──────────┐
 │ Camera   │  Depth   │  Motion  │   Pose   │
 │ Source   │  Source  │  Source  │  Source   │
 └──────────┴──────────┴──────────┴──────────┘
                           │
              [ ClockSynchronizer ]
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
│ ├── Lifecycle State + Capability Record & Device Floor   │
│ ├── Coordinate Frame Registry (Explicit Semantics)       │
│ ├── Synchronization & Clock Correlation Matrix           │
│ └── Hash-Indexed Artifact References (SHA-256)           │
├─────────────────────────────────────────────────────────┤
│ External Binary Payloads (permanent evidence bytes)      │
│ ├── Raw RGB Images (.heic / .png)                        │
│ ├── Binary Depth & Confidence Maps (.bin / .raw)         │
│ └── Motion & Pose Sample Batches (.bin)                  │
└─────────────────────────────────────────────────────────┘
                           │
          ─ ─ ─ structural firewall ─ ─ ─
                           │
                           ▼
     [ Phase 4+ Derived Twin / Mesh / Reprocess Outputs ]
     (ephemeral, versioned, lineage → source package hash)
```

---

## 2. Spatial Evidence Lifecycle (FSM)

Every spatial dataset advances through an explicit finite state machine. Transitions are durable events; illegal transitions are rejected.

```text
[ CAPTURING ] ──► [ CAPTURE_COMPLETE ] ──► [ VALIDATING ] ──► [ PACKAGED ] ──► [ VERIFIED ] ──► [ ARCHIVED ]
 (Streams open)    (Streams flushed)     (Hashes & bounds)   (Immutable)     (Integrity OK)    (Historical)
                                                                   │
                                                                   └──► [ REPROCESSED ]
                                                                        (Derived artifacts linked to source)
```

### 2.1 State definitions

| State | Meaning | Mutability |
|---|---|---|
| `CAPTURING` | Streams open; samples may still arrive | Staging only; **not** a package |
| `CAPTURE_COMPLETE` | Streams flushed; no further acquisition samples | Staging; still mutable until packaged |
| `VALIDATING` | Bounds, capability consistency, hash computation, schema checks | Staging |
| `PACKAGED` | Canonical manifest + binaries written; content identity fixed | **Immutable evidence bytes** |
| `VERIFIED` | Integrity check passed (manifest digests ↔ payload hashes) | Immutable |
| `ARCHIVED` | Historical retention; same integrity as verified | Immutable |
| `REPROCESSED` | **Derived** twin/mesh/reprocess outputs exist; **source package unchanged** | Derivatives replaceable; source immutable |

Terminal failure / cancel paths (`FAILED`, `CANCELED`, `QUARANTINED`) are disposition states for staging — they never become readable engineering inputs.

### 2.2 Transition invariants

| Transition | Required invariants |
|---|---|
| → `CAPTURE_COMPLETE` | All armed sources disarmed or explicitly ended; no open writers for required streams |
| → `VALIDATING` | Capability Record present; sample index closed; wall-epoch anchors recorded |
| → `PACKAGED` | External binaries flushed atomically; SHA-256 (or versioned algo) recorded for every artifact; canonical JSON written; OCC commit succeeds with `expectedRevision` |
| → `VERIFIED` | Recomputed payload hashes match manifest; schema/version accepted; Capability Record consistent with armed mask |
| → `ARCHIVED` | Prior `VERIFIED` (or equivalent verified import); retention policy applied without rewriting bytes |
| → `REPROCESSED` | **Only from** `VERIFIED` or `ARCHIVED` source; derivative declares `source_evidence_package_hash`, `pipeline_version`, `timestamp`; source package **never** mutated |

### 2.3 Downstream consumption rule (normative)

**Phase 4+ reconstruction / processing engines may accept datasets only in `VERIFIED` or `ARCHIVED`.**

- Incomplete, `CAPTURING`, `CAPTURE_COMPLETE`, `VALIDATING`, or unverified `PACKAGED` datasets are **physically unreadable** by downstream consumers (API / repository gate refuses open).
- Consumers must not open staging directories or partial packages by path convention alone.
- `REPROCESSED` labels the **derived** side of the lineage edge; engines that need sensor truth still open the parent `VERIFIED`/`ARCHIVED` package.

### 2.4 Relationship to session builder lifecycle

The capture-session builder’s operational states (`idle` → `preparing` → `capturing` → `finalizing` → …) are **implementation machinery** that produce transitions into the package FSM above. The package FSM is the durable authority recorded in the manifest.

---

## 3. Mission & boundaries

### 3.1 Mission

Acquire **deterministic spatial evidence datasets** — images, pose metadata, depth/LiDAR (when capable), IMU/motion samples, and calibration — and package them so Phases 4–5 can trust provenance, time, and geometry **without inventing missing sensor truth**.

Phase 3 does **not** reconstruct the world. It **captures and packages** what the sensors observed.

### 3.2 In scope

| ID | Workstream | Deliverable class |
|---|---|---|
| **3.1** | Hardware-neutral adapters + composable sources + coordinator | `SpatialSensorAdapter`, sources, `ClockSynchronizer`, `SpatialSensorCoordinator` |
| **3.2** | Spatial capture session builder + package FSM | Dual-clock session; lifecycle transitions |
| **3.3** | Calibration framework | Intrinsics \(K\), distortion, extrinsics; lineage |
| **3.4** | Photogrammetry capture | Raw multi-view RGB + per-frame pose / \(K\) |
| **3.5** | Depth / ranging capture | Raw depth + confidence + pose (**capability-gated**) |
| **3.6** | Spatial manifest + package + OCC | Canonical JSON + external binaries + integrity |

### 3.3 Explicitly out of scope (Phases 4–8+)

| Deferred | Phase |
|---|---|
| Mesh generation / surface reconstruction / digital twin baking | 4+ |
| Structure-from-Motion / dense reconstruction | 4+ |
| Point-cloud densification / fusion solvers | 5+ |
| CAD / vehicle-frame engineering alignment verdicts | 6+ |
| AI segmentation / semantics | 7–8+ |
| Certified metrology from ARKit/LiDAR alone | **Never by default** (`GUIDANCE_ESTIMATE`) |

### 3.4 Authority & Phase 2 integrity

- Pose / depth default authority: **`GUIDANCE_ESTIMATE`**.
- Capture does not authorize conversions, designs, or Build Engine policy (`SYSTEM_BOUNDARIES.md`).
- Sprint 2.3 OCC posture is preserved at spatial scale: repository-assigned sequence tokens, no silent LWW, no adopt-before-durable-persist, sealed packages never overwritten in place.
- **High-frequency payloads stay out of canonical JSON** so manifest hashing remains tractable and OCC digests stay stable as datasets grow.

---

## 4. Permanence vs. ephemerality (structural firewall)

| Class | Role | Rules |
|---|---|---|
| **Evidence Package** | Permanent, authoritative source of truth | Immutable once `PACKAGED`+; hashed; OCC-protected; soft-delete → quarantine; never overwritten in place |
| **Digital Twin / Mesh / Reprocess Output** | Ephemeral, derived | Versioned and **replaceable**; must carry `source_evidence_package_hash`, `pipeline_version`, `timestamp` (+ method id); may be deleted and regenerated without touching evidence |

**Forbidden:** promoting a mesh/twin to “source of truth”; mutating evidence bytes to “match” a later twin; in-place overwrite of sealed packages when a pipeline improves.

When algorithms improve, **reprocess** against the parent package → new derived artifact ids under `REPROCESSED` lineage — evidence remains untouched.

---

## 5. Layering & dependency rules

| Layer | May depend on | Must not depend on |
|---|---|---|
| Domain / Evidence Repository | Spatial **contracts** only | Apple SDKs, GigE SDKs, any vendor SDK |
| `SpatialSensorAdapter` implementations | Vendor SDKs | Domain stores, EDTS, Build Engine, twin pipelines |
| Composable sources | Adapter protocol + contracts | UI, inspection ViewModels, vendor types in public API |
| `SpatialSensorCoordinator` | Sources + Capability Model + `ClockSynchronizer` | Direct UIKit/SwiftUI; vendor SDK types |
| Package builder | Contracts + file I/O ports | Live sensor sessions; reconstruction engines |

Evidence Repository never opens an `ARSession` (or any vendor session). It only accepts packages that satisfy the lifecycle gate (`VERIFIED` / `ARCHIVED`).

### 5.1 Existing scaffolding (today)

| Path | Today | Phase 3 role |
|---|---|---|
| `App/Spatial/*` | README stubs; SPM-excluded | First `SpatialSensorAdapter` (ARKit) + pose/depth backing |
| `App/Motion/*` | README stubs | CoreMotion adapter → `MotionSource` / `PoseSource` |
| `App/Calibration/*` | README stubs; AVCameraCalibration-first | Calibration lock + derivative lineage |
| `DeviceCapabilitySnapshotProviding` | LiDAR/depth probes | Feeds Capability Model / device floor |

---

## 6. Hardware-neutral sensor layer

### 6.1 Design rule

Core protocols use **hardware-neutral terminology**. Apple frameworks are the **first adapter implementations**, not the domain vocabulary. Future GigE Vision cameras, external thermal arrays, and handheld structured-light scanners must plug in **without refactoring domain logic**.

### 6.2 Adapter contract (normative shape)

Specification-level contract (illustrative; not production code in this pass):

```text
protocol SpatialSensorAdapter {
    var sourceCapabilities: SensorCapabilityRecord { get }
    func startAcquisition() async throws -> AsyncStream<SpatialFrameSample>
    // stop / interruption signaling defined by companion InterruptionReporting
}
```

| Type | Meaning |
|---|---|
| `SpatialSensorAdapter` | Vendor-facing acquisition port |
| `SensorCapabilityRecord` | What this adapter can provide **now** (see §8) |
| `SpatialFrameSample` | Hardware-neutral sample envelope (payload ref or inline small meta + clock domain + source id) |

Adapters **must not** leak `ARFrame`, `CMSampleBuffer`, or vendor handles into domain / package layers. They translate into contract samples and binary payload writers.

### 6.3 Composable sources

| Source | Role | Typical first adapters |
|---|---|---|
| `CameraSource` | RGB / intensity frames | AVFoundation; later GigE Vision |
| `DepthSource` | Depth + confidence / quality | ARKit scene depth / LiDAR; later structured-light |
| `MotionSource` | IMU / dynamics windows | CoreMotion |
| `PoseSource` | 6-DoF poses with full frame semantics | ARKit pose; later external trackers |
| `ClockSynchronizer` | Correlation of vendor clock domains → monotonic session clock | Cross-cutting; not a sensor |

Each source:

- Declares its **required capability floor** subset  
- Surfaces **interruption** / tracking-loss for its domain only  
- Never writes package bytes directly (coordinator → session builder → package builder)  
- Speaks only contract types to the coordinator  

### 6.4 Rejected: monolithic `SensorManager`

A single god-object that owns camera + depth + motion + interruption + capability conflates failure domains and binds the domain to one vendor. **Normative design is composition behind `SpatialSensorAdapter`.**

### 6.5 `SpatialSensorCoordinator`

Responsibilities:

1. **Compose** the active source set from plan / capability requirements  
2. Apply **Capability Model** before arming (fail closed or labeled demo — never silent)  
3. Drive **`ClockSynchronizer`** so samples land on the monotonic timeline  
4. Fan-in source events into an ordered capture timeline  
5. Propagate **interruptions** without corrupting sealed / packaged state  
6. Expose a narrow façade to the Spatial Capture Session Builder  

```text
SpatialSensorCoordinator
  ├─ resolveCapabilities() -> SensorCapabilityRecord
  ├─ arm(sources: SourceMask) throws  // capability-checked
  ├─ disarm()
  ├─ events: AsyncSequence<CoordinatorEvent>
  └─ interruptionPolicy: InterruptionPolicy
```

UI and inspection coordinators speak to `SpatialSensorCoordinator`, never to vendor SDK types.

---

## 7. Spatial Capture Session Builder

### 7.1 Role

Consumes coordinator events and builds an in-progress session index:

- Assigns sample ids  
- Stamps **monotonic** capture times  
- Attaches wall epoch only at defined anchors  
- Enforces capability-consistent sample sets (no orphan “required” depth when depth unsupported)  
- Drives package FSM transitions through finalize / validate / package / verify  

### 7.2 Operational lifecycle (builder)

```text
idle → preparing (capability + calibration lock)
    → capturing          // package FSM: CAPTURING
    → finalizing         // CAPTURE_COMPLETE → VALIDATING → PACKAGED
    → verified | failed | canceled
```

Interruptions during `capturing` mark affected sample ranges; they must not silently rewrite already-flushed originals.

### 7.3 Linkage to inspection

Optional `inspectionSessionID` / `inspectionPointID`. Spatial packaging does not invent inspection authority. Inspection bindings reference **`VERIFIED` (or `ARCHIVED`)** package / sample ids only.

---

## 8. Capability Model & device floor

### 8.1 Device floor vs. feature options

| Concept | Meaning |
|---|---|
| **Device floor** | Minimum profile required for a given capture mode (e.g. “RGB+pose guidance” vs “RGB+depth engineering”) |
| **Feature option** | Optional stream (depth, high-rate IMU, external tracker) that may be `supported` / `unsupported` / `denied` / `degraded` / `unavailable_runtime` |

Non-LiDAR (and non-Apple) hardware is a **first-class path**:

- Plans that **require** depth refuse engineering capture when depth is unsupported — with an explicit reason code.  
- Plans that **allow** RGB+pose-only proceed with `DepthSource` recorded as `unsupported` — **no fake depth artifacts**.  
- Demo / unsupported / degraded modes must be **labeled**; never indistinguishable from engineering capture.

### 8.2 `SensorCapabilityRecord` (manifest section)

Minimum fields:

- Device / adapter class ids + capability snapshot digest  
- Per-source support matrix (`Camera`, `Depth`, `Motion`, `Pose`, …)  
- Armed vs. required mask  
- Per-feature state: `active` | `unsupported` | `denied` | `degraded` | `unavailable_runtime`  
- Refusal / demo reason codes when below floor  
- Authority defaults (`GUIDANCE_ESTIMATE`)

Hashed into the sealed package so downstream consumers can see what was physically possible at capture time.

---

## 9. Time, coordinate frames & calibration

### 9.1 Clocks — monotonic capture vs wall epoch

| Clock | Role | Used for |
|---|---|---|
| **Monotonic capture clock** | Ordering and sync within a session | Frame-to-frame deltas, RGB↔depth association, IMU windowing |
| **Wall-clock epoch** | Human/audit anchoring (UTC when available) | Package `createdAt` / `sealedAt` / `verifiedAt`, export labels |

**Forbidden:** using wall clock as the sole ordering key for high-rate samples, or comparing vendor clock domains without an explicit correlation record (`TIMESTAMP_STANDARD.md`).

### 9.2 Synchronization & clock correlation matrix (manifest)

| From domain | To domain | Method | Residual / uncertainty | Valid interval |
|---|---|---|---|---|
| vendor camera clock | monotonic session | documented | required | session span |
| vendor depth / tracker clock | monotonic session | documented | required | session span |
| vendor IMU clock | monotonic session | documented | required | session span |
| monotonic session | `wall` UTC | documented | required | epoch anchors only |

Do not claim “exact camera/IMU sync” without a named validation method and residual. Initial Apple domains (`avfoundation_capture`, `arkit_frame`, `core_motion`) are instances of this table, not the vocabulary limit.

### 9.3 Coordinate frames — explicit matrix semantics

Anonymous \(4\times4\) matrices are **rejected**. Every pose/transform record must carry (`COORDINATE_FRAME_STANDARD.md`):

| Field | Requirement |
|---|---|
| `source_frame` / `target_frame` (destination) | From registry |
| `matrix_layout` | `column_major` \| `row_major` |
| `handedness` | Explicit |
| `translation_unit` | Meter |
| `timestamp` + `clock_domain` | Required |
| `authority` | Default `GUIDANCE_ESTIMATE` |
| `trackingQuality` / uncertainty | When available |

Sealed packages embed the **Coordinate Frame Registry**. Frame-to-frame relationships are **named edges**, not implied by file adjacency.

### 9.4 Calibration (Phase 3.3)

- Prefer vendor-native calibration records as canonical when present (e.g. AVCameraCalibrationData on Apple).  
- OpenCV-style coefficients are **derived artifacts** with lineage pointers back to the native calibration record — never unlabeled replacements.  
- RGB↔depth extrinsics recorded as explicit frame-registry edges when both streams armed.  
- Calibration lock is hashed into the manifest.

---

## 10. Payload isolation & manifest structure

### 10.1 Split: canonical JSON vs external binaries

| In canonical Spatial Manifest (JSON) | External binary payloads |
|---|---|
| Lifecycle state (+ transition history summary) | Raw RGB (`.heic` / `.png`) |
| `SensorCapabilityRecord` & device floor | Depth & confidence maps (`.bin` / `.raw`) |
| Coordinate Frame Registry | Motion & pose sample batches (`.bin`) |
| Clock correlation matrix | Calibration sidecars if binary |
| Sample indices + metadata summaries | — |
| SHA-256 (or versioned algo) content hashes + package-relative paths | — |
| Package identity, schema version, OCC revision | — |

**High-frequency time series and image/depth rasters must not be inlined into canonical JSON.** Manifest entries are hash-indexed references only.

### 10.2 Suggested package-relative layout

```text
spatial-package/
  manifest.json                 # canonical Spatial Manifest
  payloads/
    rgb/…
    depth/…
    confidence/…
    motion/…
    pose/…
  calibration/…
```

Paths in the manifest are package-relative; integrity is by content hash, not path stability alone.

### 10.3 Per-sample metadata retained in the index (not the raster)

- Monotonic timestamp (+ clock domain)  
- Intrinsics \(K\) / distortion ref  
- Extrinsic pose with full frame semantics  
- Depth alignment to RGB sample id (when both present)  
- Authority + tracking quality  

---

## 11. Lineage & OCC integration

### 11.1 Evidence (permanent)

- Artifact bytes: content hash with versioned algorithm id (e.g. `sha256`).  
- Manifest digest: hash of **canonical JSON** excluding the self-digest field.  
- Package commits use repository-assigned revision / sequence tokens; callers supply `expectedRevision` (S2-004).  
- Rejected commits: side-effect free.  
- Recovery must not install lower package revision over higher durable head.  
- Swift `Hasher` / `hashValue` forbidden for persisted identity.  
- Soft-delete → quarantine; never overwrite sealed originals in place.

### 11.2 Derived twin / reprocess (ephemeral)

| Field on derived artifact | Requirement |
|---|---|
| `source_evidence_package_hash` | Parent package content / manifest digest |
| `pipeline_version` | Exact pipeline / algorithm identity |
| `timestamp` | Production time of the derivative |
| `derivedFrom` / method id | Transform identity |
| New artifact id | Always; never reuse evidence ids |

`REPROCESSED` does **not** alter the parent package’s lifecycle identity beyond recording outbound lineage edges (optional index). Parent remains `VERIFIED` or `ARCHIVED`.

### 11.3 Retake

New spatial package / sample ids (same posture as Phase 1 evidence retake). Prior package stays immutable for audit.

---

## 12. End-to-end data flow

```text
1. Guided point requests spatial evidence (InspectionSession)
2. Coordinator.resolveCapabilities → SensorCapabilityRecord
3. Below floor? refuse or labeled demo; else arm adapters/sources
4. Calibration lock; ClockSynchronizer armed
5. CAPTURING → samples → Session Builder (monotonic timeline)
6. CAPTURE_COMPLETE → VALIDATING (hashes & bounds)
7. PACKAGED (binaries + canonical manifest + OCC commit)
8. VERIFIED (integrity OK) — only now bindable / exportable to Phase 4+
9. Inspection binding references VERIFIED package ids only
10. Later: Phase 4+ reprocess → derived twin with lineage (REPROCESSED edge)
11. Optional ARCHIVED for historical retention
```

Failure before `PACKAGED`/`VERIFIED`: no inspection binding; staging disposition follows recovery ADR (quarantine when implemented).

---

## 13. Subsystem → artifact map

| Subsystem | Phase 3 artifact | Why early |
|---|---|---|
| Lifecycle FSM | Durable state + downstream gate | Forensic-grade consumption rules |
| Hardware-neutral adapters | Vendor isolation | GigE / thermal / scanner without domain rewrite |
| Composable sources + coordinator | Unified, capability-aware streams | Interruption hygiene |
| Capability Model | Device floor + support matrix | Honest non-LiDAR / degraded operation |
| Dual clocks + correlation matrix | Sync without wall-clock abuse | Deterministic temporal joins |
| Frame registry | Explicit matrix semantics | No anonymous transforms |
| Calibration | \(K\), distortion, extrinsics lineage | Phase 4 does not reverse-engineer sensors |
| Manifest + binaries + OCC | Permanent evidence package | Audit / reprocess forever |
| Derived twin firewall | Ephemeral lineage outputs | Algorithms may improve; evidence does not rot |

---

## 14. Implementation gates (coding not authorized yet)

Phase 3 production coding starts only when **all** hold:

1. Sprint 2.3 success gate: Mac `xcodebuild` on `Phase1StillCapture` **PASSED** and recorded in `sprint_2_3_execution_manifest.json`  
2. This architecture reaches `ARCHITECTURE_ACCEPTED`  
3. Narrow ADRs for: spatial package schema version, hash algorithm ids, RGB↔depth sync tolerance, device-floor matrix, lifecycle transition store  

Suggested post-acceptance slices:

1. Contracts-only target (`SpatialSensorAdapter`, capability, lifecycle enums — no vendor SDKs in domain)  
2. Package builder + OCC store + lifecycle gate with fixture binaries  
3. First Apple adapters behind the neutral protocol + `CameraSource` + calibration lock  
4. `MotionSource` / `PoseSource` path (`GUIDANCE_ESTIMATE`)  
5. `DepthSource` on LiDAR / ranging floor only  

---

## 15. Document control

| Change | Rule |
|---|---|
| Reintroduce monolithic SensorManager as sole API | **Rejected** |
| Bind domain types to ARKit/AVFoundation vocabulary | **Rejected** — adapters only |
| Inline high-rate samples into manifest JSON | **Rejected** |
| Let Phase 4+ read non-`VERIFIED`/`ARCHIVED` packages | **Rejected** |
| Treat mesh/twin as authoritative over evidence | **Rejected** |
| Elevate authority above `GUIDANCE_ESTIMATE` | New ADR + validation evidence |
| Add mesh/SfM into Phase 3 | **Rejected** — Phase 4+ |
| Mutate sealed package / originals in place | **Forbidden** |

**Classification:** `PHASE_3_ARCHITECTURE_DRAFT_IMPLEMENTATION_PENDING`
