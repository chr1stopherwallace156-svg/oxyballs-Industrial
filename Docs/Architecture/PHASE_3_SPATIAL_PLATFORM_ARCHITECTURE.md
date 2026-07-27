# Phase 3 — Spatial & Sensor Platform Architecture

| Field | Value |
|---|---|
| Status | **ARCHITECTURE_DRAFT — IMPLEMENTATION GATED** |
| Version | 1.0.0 |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED**); OCC / authoritative commit contracts remain in force |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `ADR-SESSION-REVISION-OCC.md` (S2-004), `ADR-SESSION-RECOVERY-AND-QUARANTINE.md` |

**This document is an architectural blueprint only.** It must not be treated as authorization to land production ARKit / AVFoundation / LiDAR workflows. Zero production or test code is required to accept this draft.

---

## 1. Mission & boundaries

### 1.1 Mission

Acquire **deterministic spatial evidence datasets** — images, pose metadata, LiDAR/depth maps, IMU/motion samples, and calibration — and package them so downstream phases can trust provenance, time, and geometry **without re-deriving missing sensor truth**.

Phase 3 does **not** reconstruct the world. It **captures and packages** what the sensors observed.

```text
Physical vehicle
  → SensorManager (ARKit / AVFoundation / CoreMotion)
  → Spatial Capture Pipeline
  → Spatial Evidence Package + SpatialManifest
  → Evidence Repository / EDTS intake
```

### 1.2 In scope (Phase 3)

| ID | Workstream | Deliverable class |
|---|---|---|
| **3.1** | Sensor abstraction | `SensorManager` + typed stream contracts |
| **3.2** | Spatial capture session | `SpatialCaptureSession` lifecycle + frame records |
| **3.3** | Calibration framework | Intrinsics \(K\), distortion, extrinsic relationships |
| **3.4** | Photogrammetry capture | Raw multi-view images + per-frame pose / \(K\) |
| **3.5** | LiDAR / depth capture | Raw depth (or depth maps) + confidence + pose |
| **3.6** | Spatial manifest | Deterministic hashes, coordinate frames, OCC-safe package identity |

### 1.3 Explicitly out of scope (Phases 4–8+)

| Deferred capability | Target phase (indicative) |
|---|---|
| Mesh generation / surface reconstruction | Phase 4+ |
| Structure-from-Motion (SfM) / dense point clouds | Phase 4+ |
| Point-cloud densification / fusion solvers | Phase 5+ |
| CAD / vehicle-frame alignment as engineering verdict | Phase 6+ |
| AI segmentation / semantic labeling | Phase 7–8+ |
| Certified metrology claims from ARKit/LiDAR alone | **Never by default** (`GUIDANCE_ESTIMATE`) |

### 1.4 Authority posture (non-negotiable)

- ARKit / LiDAR / visual-inertial pose default to **`GUIDANCE_ESTIMATE`**, never unlabeled certified metrology.
- Capture owns evidence acquisition; it does **not** authorize conversions, designs, structural adequacy, or Build Engine policy (`SYSTEM_BOUNDARIES.md`).
- Sprint 2.3 OCC lessons apply to spatial package commits: repository-assigned revision / sequence tokens; no silent LWW; no adopt-before-durable-persist.

---

## 2. Layered architecture

### 2.1 Hardware → abstraction → storage

```text
┌──────────────────┐
│ ARKit            │
├──────────────────┤
│ AVFoundation     │ ──► [ SensorManager ] ──► [ Spatial Capture Pipeline ]
├──────────────────┤              │                        │
│ CoreMotion       │              │                        ▼
└──────────────────┘              │              [ SpatialEvidencePackage ]
                                  │                        │
                                  ▼                        ▼
                         capability probes          [ SpatialManifest ]
                         (DeviceCapability*)                 │
                                                             ▼
                                                  Evidence Repository
                                                  (domain never imports
                                                   ARKit / AVFoundation)
```

### 2.2 Dependency rule

| Layer | May depend on | Must not depend on |
|---|---|---|
| Domain / Evidence Repository | Spatial **contracts** (DTO / protocols) | ARKit, AVFoundation, CoreMotion, RealityKit |
| Sensor adapters (`App/Spatial`, `App/Capture`, `App/Motion`, `App/Calibration`) | Apple frameworks + contracts | EDTS DB, Build Engine |
| UI / guided overlay | SensorManager façade + presentation DTOs | Raw framework session objects (prefer ports) |

`EvidenceRepository` (and Sprint 2 session stores) consume **already-normalized** spatial records. They never open an `ARSession`.

### 2.3 Existing scaffolding (status today)

| Path | Role today | Phase 3 expectation |
|---|---|---|
| `App/Spatial/*` | README stubs; excluded from SPM library | Become adapter implementations behind `SensorManager` |
| `App/Motion/*` | README stubs | CoreMotion recorder + timestamp alignment |
| `App/Calibration/*` | README stubs; AVCameraCalibration-first | Intrinsics / distortion pipeline |
| `DeviceCapabilitySnapshotProviding` | LiDAR / depth capability probe | Feed SensorManager capability gate |

---

## 3. Phase 3.1 — Sensor abstraction (`SensorManager`)

### 3.1 Mission

Unify Apple framework churn behind a single capture-facing port so domain logic is insulated from ARKit / AVFoundation / CoreMotion API drift.

### 3.2 Port sketch (contracts — not production code)

```text
SensorManager
  ├─ prepare(configuration: SpatialCaptureConfiguration) throws
  ├─ startStreams(mask: SensorStreamMask) throws
  ├─ stopStreams()
  ├─ currentCapability: SpatialSensorCapability
  └─ events: AsyncSequence<SensorEvent>

SensorStreamMask: photo | videoFrame | depth | pose | imu | calibration

SensorEvent (discriminated):
  .frame(SpatialFrameSample)
  .depth(SpatialDepthSample)
  .pose(SpatialPoseSample)
  .imu(SpatialIMUSample)
  .calibration(SpatialCalibrationSample)
  .trackingState(SpatialTrackingState)
  .fault(SpatialSensorFault)
```

### 3.3 Adapter map

| Apple API | Adapter responsibility | Output contract |
|---|---|---|
| ARKit | World tracking, camera pose, optional scene depth | `SpatialPoseSample`, optional `SpatialDepthSample` |
| AVFoundation | Photo / video frames, exposure metadata, calibration data when available | `SpatialFrameSample`, `SpatialCalibrationSample` |
| CoreMotion | Accelerometer / gyro / attitude windows | `SpatialIMUSample` |

### 3.4 Capability gate

Before engineering spatial capture:

1. Resolve `DeviceCapabilitySnapshot` / `SpatialSensorCapability`.
2. If required streams (e.g. LiDAR depth for a LiDAR plan point) are unsupported → **refuse** engineering capture or enter labeled **demo** mode (never silent degrade).
3. v1 target profile remains a controlled LiDAR-equipped iPhone Pro class device unless a later ADR widens the matrix.

---

## 4. Phase 3.2 — Spatial capture session

### 4.1 Session role

`SpatialCaptureSession` is the **unit of field acquisition** for spatial evidence. It is distinct from (but may reference) an `InspectionSession`:

| Concept | Owns |
|---|---|
| `InspectionSession` | Plan assignment, progression, evidence bindings, lifecycle OCC (Sprint 2) |
| `SpatialCaptureSession` | Sensor streams, frame sequence, calibration snapshot, spatial package identity |

Binding rule: a spatial session **may** carry `inspectionSessionID` + optional `inspectionPointID` when created under guided inspection. Spatial packaging must not invent inspection authority.

### 4.2 Lifecycle (sketch)

```text
idle
  → preparing (capability + calibration lock)
  → capturing (streams active)
  → finalizing (flush samples, hash artifacts, write manifest)
  → sealed (immutable package on disk)
  → failed / canceled
```

Sealed packages are **append-only at the package identity**. Corrections create a **new** spatial package id (same posture as capture-id retake / soft-delete quarantine — never overwrite originals in place).

### 4.3 `SpatialCaptureSession` contract fields (minimum)

| Field | Requirement |
|---|---|
| `spatialSessionID` | Stable typed id |
| `schemaVersion` | Explicit int/semver for envelope |
| `createdAt` / `sealedAt` | Timestamp + `clock_domain` per `TIMESTAMP_STANDARD.md` |
| `deviceCapabilityDigest` | Hash of capability snapshot used to authorize capture |
| `calibrationID` | References locked calibration record |
| `coordinateFrameSet` | Declared frames used in this session |
| `streamMask` | Which sensors were armed |
| `inspectionSessionID` | Optional link |
| `revision` / package sequence | OCC token for package commits (repository-assigned; see §7) |

---

## 5. Per-frame / per-sample metadata (Phase 3.2 & 3.4–3.5)

Every retained sample declares enough geometry and time for Phase 4+ to avoid post-hoc guessing.

### 5.1 `SpatialFrameSample` (image / video frame)

| Member | Spec |
|---|---|
| `sampleID` | Stable id |
| `timestamp` | Prefer **monotonic nanoseconds** in declared `clock_domain` (`avfoundation_capture` or `arkit_frame`) + optional wall mapping |
| `imageArtifactRef` | Package-relative path to original bytes |
| `intrinsicsK` | \(3 \times 3\) camera matrix |
| `distortion` | Model id + parameter vector (AVCameraCalibration-first; OpenCV coeffs are derivatives only) |
| `extrinsicPose` | \(4 \times 4\) transform with full frame semantics (`COORDINATE_FRAME_STANDARD.md`) |
| `imageSizePx` | Width / height |
| `exposure` / ISO / lens | When available from AV metadata |
| `authority` | Default `GUIDANCE_ESTIMATE` unless a later calibration ADR elevates |

### 5.2 `SpatialDepthSample` (LiDAR / scene depth)

| Member | Spec |
|---|---|
| `sampleID` | Stable id |
| `timestamp` | Same sync rules as frames |
| `depthArtifactRef` | Raw depth map / point buffer path |
| `confidenceArtifactRef` | Optional confidence map |
| `pose` | Pose at depth epoch |
| `depthUnit` | Meter |
| `alignment` | Explicit relationship to paired RGB frame id (if any) |
| `authority` | `GUIDANCE_ESTIMATE` |

### 5.3 `SpatialPoseSample`

| Member | Spec |
|---|---|
| `source_frame` / `target_frame` | Never anonymous |
| `matrix_layout` | `column_major` \| `row_major` |
| `handedness` | Explicit (ARKit world is typically right-handed; record, do not assume silently) |
| `translation_unit` | Meter |
| `timestamp` + `clock_domain` | Required |
| `trackingQuality` | Enum + optional residual |
| `authority` | `GUIDANCE_ESTIMATE` |

### 5.4 `SpatialIMUSample`

Windowed CoreMotion evidence: capture timestamp, window start/end, sample count, clock domain `core_motion`, mapping residual to camera/ARKit domain when a mapping exists. Do **not** claim exact camera/IMU sync without a documented validation method (`TIMESTAMP_STANDARD.md`).

---

## 6. Phase 3.3 — Calibration & determinism contracts

### 6.1 Calibration record

`SpatialCalibrationSample` / calibration lock record must include:

- Intrinsics \(K\)
- Distortion model + parameters
- Extrinsic relationships needed for RGB↔depth (when both armed)
- Capture of `AVCameraCalibrationData` fields when present (canonical source)
- `calibrationAuthority` and device/capability linkage

OpenCV-style coefficients, if produced, are **derivatives** with lineage back to AV calibration — never unlabeled replacements.

### 6.2 Verification checks (Phase 3 acceptance, not recon)

| Check | Requirement |
|---|---|
| RGB↔depth time sync | Document tolerance; fail closed or flag if exceeded |
| Pose continuity | Detect tracking resets; mark affected samples |
| Frame semantics | Reject anonymous \(4 \times 4\) without `source_frame`/`target_frame` |
| Handedness / axis | Persist explicit convention; no silent flip |
| Capability match | Sealed package must hash the capability snapshot used |

### 6.3 Coordinate frames

Reuse `COORDINATE_FRAME_STANDARD.md` frame ids (`arkit_world`, `camera`, `device`, `vehicle`, …). Phase 3 **records** transforms; it does not invent `edts_canonical` alignments as certified truth.

---

## 7. Phase 3.6 — Spatial manifest, hashing & OCC

### 7.1 `SpatialManifest`

Package-level index that makes a spatial dataset auditable:

| Section | Contents |
|---|---|
| Identity | `spatialSessionID`, schema version, sealed timestamp |
| Artifacts | Path, media type, byte size, content hash |
| Samples | Frame / depth / pose / IMU indices with sample digests |
| Calibration | Calibration record hash |
| Capability | Device capability digest |
| Integrity | Manifest digest over canonical encoding |
| Linkage | Optional inspection session / point ids |

### 7.2 Hashing rules

- Artifact bytes: content-addressed hash (algorithm id versioned, e.g. `sha256`).
- Manifest: hash of **canonical JSON** of the manifest payload (exclude self-digest field), algorithm id versioned — same spirit as S2-002 / envelope integrity.
- Never treat Swift `Hasher` / `hashValue` as persisted identity.

### 7.3 OCC / persistence rules for spatial packages

Aligned with Sprint 2.3 S2-004:

1. Durable writes go through a **repository boundary** (spatial package store), not ad-hoc file drops from UI.
2. Sequence / revision tokens are **repository-assigned**; callers supply `expectedRevision` (or equivalent).
3. Rejected commits are side-effect free (no adopt, no partial promote).
4. Different package identity replacement is explicit — no silent overwrite of sealed packages.
5. Recovery must not install a lower package revision over a higher durable head (monotonicity).
6. Soft-delete / supersede quarantines originals; retake = new ids.

### 7.4 Evidence unit upgrade

| Legacy (Phase 1 still) | Phase 3 spatial unit |
|---|---|
| Flat photo + sidecar metadata | `SpatialEvidencePackage` = originals + depth/pose/IMU + calibration + `SpatialManifest` |
| Optional inspection context | Explicit linkage fields; still not EDTS authority |

Downstream Phase 4 photogrammetry and Phase 5 LiDAR fusion **must not** need to invent missing \(K\), poses, or sync — if Phase 3 sealed correctly.

---

## 8. Data flow (end-to-end)

```text
1. Technician starts guided point (InspectionSession) requiring spatial evidence
2. SensorManager.prepare + capability gate
3. Calibration lock recorded
4. Streams emit SensorEvent → Capture Pipeline normalizes to Spatial*Sample
5. Originals written to package staging (atomic I/O)
6. Finalize → SpatialManifest + integrity digests
7. Repository commit (expectedRevision) → sealed package
8. Inspection binding references spatial package / sample ids (domain)
9. Export / EDTS intake consumes sealed package only
```

Failure at step 6–7: no inspection binding to a partial package; staging quarantined per recovery ADR disposition (when implemented).

---

## 9. Subsystem → artifact map

| Subsystem | Phase 3 target artifact | Why early |
|---|---|---|
| 3.1 Sensor abstraction | Unified stream interfaces | Decouples domain from OS API churn |
| 3.3 Calibration | \(K\) + distortion + extrinsics lineage | Prevents Phase 4 recalibration archaeology |
| 3.4 Photogrammetry capture | Raw views + pose + \(K\) | Immutable multi-view evidence |
| 3.5 LiDAR / depth | Raw depth + confidence + pose | Immutable depth evidence |
| 3.6 Spatial manifest | Hashes + frames + OCC | Preserves auditability across spatial datasets |

---

## 10. Implementation gates (when coding is allowed)

Do **not** begin Phase 3 production coding until:

1. Sprint 2.3 success gate invariant 5: Mac `xcodebuild` **PASSED** in execution manifest  
2. This architecture draft reviewed / accepted (status → `ARCHITECTURE_ACCEPTED`)  
3. Narrow ADR(s) for: spatial package schema version, hash algorithm ids, RGB↔depth sync tolerance  
4. Sensor adapters land behind ports with capability fail-closed tests  

Suggested first implementation slices (post-acceptance):

1. Contracts-only Swift package target (no ARKit link in domain)  
2. File-backed `SpatialPackageStore` with OCC + manifest hashing (simulator fixtures)  
3. AVFoundation photo path + calibration lock  
4. ARKit pose path (guidance authority)  
5. Depth path on LiDAR devices only  

---

## 11. Deferred work reminder

Broader app integration UITests, device validation harnesses, transaction journal engines, and session-JSON quarantine **implementation** remain Sprint 2.3 / follow-on hardening tracks. They are **not** Phase 3 spatial scope, but Phase 3 packaging must remain compatible with those recovery/OCC invariants.

---

## 12. Document control

| Change | Rule |
|---|---|
| Widen device matrix | New ADR |
| Elevate authority above `GUIDANCE_ESTIMATE` | New ADR + validation evidence |
| Add mesh/SfM into Phase 3 | **Rejected** — belongs in Phase 4+ |
| Mutate sealed package in place | **Forbidden** |

**Classification while draft:** `PHASE_3_ARCHITECTURE_DRAFT_IMPLEMENTATION_PENDING`
