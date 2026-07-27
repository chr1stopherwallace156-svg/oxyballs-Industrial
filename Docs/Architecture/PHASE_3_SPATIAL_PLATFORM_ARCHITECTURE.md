# Phase 3 — Spatial & Sensor Platform Architecture

| Field | Value |
|---|---|
| Status | **ARCHITECTURE_DRAFT — IMPLEMENTATION GATED** |
| Version | **1.3.0** |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED** on `Phase1StillCapture`); Phase 0–2.3 contracts remain authoritative |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `ADR-SESSION-REVISION-OCC.md` (S2-004), `ADR-SESSION-RECOVERY-AND-QUARANTINE.md` |
| Supersedes | Drafts 1.0.0–1.2.0 (custody/package split, dual lifecycles, typed gateways, typed envelopes below are normative) |

**This document is an architectural blueprint only.** It does not authorize production ARKit / AVFoundation / LiDAR workflows. **Zero Swift code, test files, or build-setting changes** are in scope for this pass.

---

## 0. Core philosophy

> **The raw Spatial Evidence Package is permanent, immutable, and authoritative; the digital twin / mesh is ephemeral, versioned, and derived.**

Spatial data is treated with forensic rigor:

- An improved reconstruction algorithm years later **re-runs against the untouched, hash-verified evidence package** — it does not query a lossy pre-baked `.obj`.
- Audits of geometric integrity return to **immutable sensor truth**, not a replaceable twin snapshot.
- Phase 3 owns **acquisition, synchronization, representation, persistence, and packaging** of evidence — not reconstruction.

**Critical trap corrected:** never write custody statuses such as `VERIFIED` into the package manifest JSON. Hashing a file and then modifying that same file to record verification creates a **circular hash-invalidation loop**. Package bytes and custody state are therefore **decoupled** (§2).

Reconstruction, SfM, meshing, densification, CAD verdicts, and AI remain **strictly deferred to Phase 4+**, and may consume evidence **only** through a typed `VerifiedSpatialEvidencePackage` handle (§4).

---

## 1. Blueprint (normative topology)

```text
        [ Typed SpatialSensorAdapter implementations ]
     (ARKit / AVFoundation / CoreMotion today;
      GigE Vision / thermal / structured-light later)
                           │
                           ▼
     SpatialSampleEnvelope<CameraSample | DepthSample | …>
              (AsyncThrowingStream — typed payloads)
                           │
              [ ClockSynchronizer ]
                           │
                           ▼
            [ SpatialSensorCoordinator ]
     (Capability stages + interruption aware)
                           │
                           ▼
           [ Spatial Capture Session Builder ]
         Draft acquisition lifecycle (§3.1)
                           │
                           ▼
              [ Evidence Package Builder ]
┌─────────────────────────────────────────────────────────┐
│ SpatialEvidencePackage (IMMUTABLE after PACKAGED)        │
│ ├── Canonical Spatial Manifest (JSON) — no custody status│
│ ├── Capability / frames / clocks / sample index          │
│ └── External binary payloads (SHA-256 indexed)           │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │ referenced by package content hash
┌─────────────────────────────────────────────────────────┐
│ EvidenceCustodyRecord (MUTABLE — repository-owned)       │
│ └── VERIFIED / ARCHIVED / VERIFICATION_FAILED / …        │
└─────────────────────────────────────────────────────────┘
                           │
          ─ ─ type-safe gateway ─ ─
                           ▼
        VerifiedSpatialEvidencePackage handle
              (Phase 4+ only entry)
                           │
                           ▼
     [ Derived product lifecycle — separate FSM (§3.3) ]
```

---

## 2. Immutable package vs mutable custody (structural split)

### 2.1 The hash-stability rule

| Artifact | Mutability | Contents |
|---|---|---|
| **`SpatialEvidencePackage`** | **Immutable** after `PACKAGED` | Canonical manifest JSON + external binary payloads. Content hash (SHA-256 or versioned algo) is stable for the life of the package — including decades of archival storage. |
| **`EvidenceCustodyRecord`** | **Mutable** | Repository-owned custody state (`VERIFIED`, `ARCHIVED`, `VERIFICATION_FAILED`, `QUARANTINED`, …). References the package by **content hash**. Status changes **never** alter package bytes or content hashes. |

```text
┌─────────────────────────────────────────┐
│        SpatialEvidencePackage           │
│  (Immutable Content & Canonical JSON)   │
└─────────────────────────────────────────┘
                     ▲
                     │ (Referenced by SHA-256 Hash)
┌─────────────────────────────────────────┐
│          EvidenceCustodyRecord          │
│  (Mutable Repository State: VERIFIED)   │
└─────────────────────────────────────────┘
```

### 2.2 Forbidden patterns

| Pattern | Why rejected |
|---|---|
| Writing `status: "VERIFIED"` (or any custody field) into `manifest.json` after hashing | Invalidates the package hash; circular verification |
| Mutating package bytes to “upgrade” authority or calibration in place | Breaks forensic permanence |
| Soft-delete by overwriting sealed payloads | Use quarantine disposition on the custody record + media policy |
| Treating path presence as proof of verification | Only custody + typed handle (§4) |

### 2.3 What *may* appear in the immutable manifest

Lifecycle **acquisition outcome** facts that are true at package seal time (e.g. sample counts, capability final outcome snapshot, interruption ranges observed during capture) — **not** post-seal custody transitions. Post-seal verification and archival live only in `EvidenceCustodyRecord`.

OCC / revision tokens for package **commits** follow Sprint 2.3 posture (`expectedRevision`, repository-assigned sequence). Custody updates are separate repository mutations with their own concurrency rules (must not rewrite package blobs).

---

## 3. Dual lifecycles (source vs derived)

`REPROCESSED` is **not** a state of the source evidence package. Evidence permanence and twin ephemerality are enforced by **two FSMs**.

### 3.1 Draft acquisition lifecycle (pre-package)

Operates on a **draft session / staging workspace** — not yet an immutable package.

```text
CAPTURING → CAPTURE_COMPLETE → VALIDATING → (seal) → PACKAGED
```

**Explicit failure / disposition states** (draft side):

| State | Meaning |
|---|---|
| `INTERRUPTED` | Acquisition stopped by OS / thermal / tracking / permission; may resume or abort per policy |
| `CANCELLED` | Operator or system cancel before seal |
| `VALIDATION_FAILED` | Bounds / schema / capability consistency / hash prep failed |
| `QUARANTINED` | Staging retained for forensics; not promotable to package without explicit recovery path |

Invariants:

- Streams open only in `CAPTURING` (and controlled resume from `INTERRUPTED` when policy allows).  
- `CAPTURE_COMPLETE`: all armed sources ended; no further acquisition samples.  
- `VALIDATING`: capability consistency, sample index closed, hash computation, schema checks.  
- Illegal transitions are rejected; draft never pretends to be a `VerifiedSpatialEvidencePackage`.

### 3.2 Immutable package creation + custody lifecycle

**Package creation**

- Transition to **`PACKAGED`** means: canonical manifest + binaries are finalized and **immutable**.  
- Package content hash is computed over sealed bytes and recorded on the custody record (and any package index) — **custody status itself is not inside the hashed manifest as a mutable field**.

**Custody lifecycle** (`EvidenceCustodyRecord`, external to package bytes):

```text
(after PACKAGED) → VERIFIED | VERIFICATION_FAILED | QUARANTINED
VERIFIED → ARCHIVED
```

| Custody state | Meaning |
|---|---|
| `VERIFIED` | Recomputed payload hashes match; schema accepted; repository issues typed verified handle |
| `VERIFICATION_FAILED` | Integrity or schema check failed; package bytes unchanged; not consumable by Phase 4+ |
| `QUARANTINED` | Held out of normal consumption; bytes unchanged |
| `ARCHIVED` | Historical retention of a previously verified package; bytes unchanged |

Status changes **never** alter package bytes or content hashes.

### 3.3 Derived artifact lifecycle (mesh / twin / reprocess)

Separate FSM for ephemeral products:

```text
DERIVATION_REQUESTED → PROCESSING → DERIVED → DERIVED_VERIFIED
                                         └→ SUPERSEDED | ARCHIVED
```

| Rule | Requirement |
|---|---|
| Parent reference | Derived artifact stores `sourcePackageHash` (and optional sample subset ids) in its lineage block |
| Source mutation | **Never** — a 2030 mesh does not alter a 2026 capture package |
| Replaceability | New pipeline version → new derived artifact; prior may become `SUPERSEDED` |
| Consumption of source | Derivation engines obtain source **only** via `VerifiedSpatialEvidencePackage` (§4) |

Optional index edges on the custody/record side may note outbound derivatives; they must not rewrite package content.

---

## 4. Type-safe access control (compile-time gateway)

### 4.1 Rejected: “physically unreadable” as the sole control

Claiming draft folders are “physically unreadable” is insufficient and brittle. The normative control is a **compile-time boundary**.

### 4.2 Repository gateway

```text
protocol VerifiedSpatialEvidenceProviding {
    func verifiedPackage(id: PackageID) async throws -> VerifiedSpatialEvidencePackage
    // open by content hash, listing, etc. — all return typed verified handles only
}

struct VerifiedSpatialEvidencePackage {
    // opaque handle: package identity, content hash, read APIs for manifest + payloads
    // constructible ONLY by repository / custody layer after VERIFIED (or ARCHIVED-with-verify)
}
```

| Consumer may accept | Consumer must not accept |
|---|---|
| `VerifiedSpatialEvidencePackage` | Raw file `URL`s to draft/staging |
| Handles from `VerifiedSpatialEvidenceProviding` | Unverified `SpatialEvidencePackage` digests alone |
| | Draft session objects, temporary folders, “path conventions” |

Phase 4+ engine entry points are typed to require `VerifiedSpatialEvidencePackage`. Draft sessions, file URLs, and unverified packages are **unconsumable at compile time**.

`ARCHIVED` packages remain consumable only when the repository still issues a verified-class handle (archived ≠ unverified).

---

## 5. Mission & boundaries

### 5.1 Mission

Acquire **deterministic spatial evidence datasets** — images, pose metadata, depth/ranging (when capable), IMU/motion samples, and calibration — and package them so Phases 4+ can trust provenance, time, and geometry **without inventing missing sensor truth**.

Phase 3 does **not** reconstruct the world. It **captures and packages** what the sensors observed.

### 5.2 In scope

| ID | Workstream | Deliverable class |
|---|---|---|
| **3.1** | Hardware-neutral typed adapters + sources + coordinator | Adapters, envelopes, `ClockSynchronizer`, coordinator |
| **3.2** | Draft acquisition + package seal + custody records | Dual FSMs; `EvidenceCustodyRecord` |
| **3.3** | Calibration framework | Raw vs derived calibration separation |
| **3.4** | Photogrammetry capture | Raw multi-view RGB + per-frame pose / \(K\) |
| **3.5** | Depth / ranging capture | Capability-gated depth + confidence + pose |
| **3.6** | Manifest + binaries + OCC + verified gateway | Immutable package + typed Phase 4+ handle |

### 5.3 Explicitly out of scope (Phases 4–8+)

| Deferred | Phase |
|---|---|
| Mesh / surface reconstruction / digital twin baking | 4+ |
| Structure-from-Motion / dense reconstruction | 4+ |
| Point-cloud densification / fusion | 5+ |
| CAD / vehicle-frame engineering alignment verdicts | 6+ |
| AI segmentation / semantics | 7–8+ |
| Certified metrology from ARKit/LiDAR alone | **Never by default** (`GUIDANCE_ESTIMATE`) |

### 5.4 Authority & Phase 0–2.3 integrity

- Pose / depth default authority: **`GUIDANCE_ESTIMATE`**.  
- Capture does not authorize conversions, designs, or Build Engine policy (`SYSTEM_BOUNDARIES.md`).  
- Sprint 2.3 OCC posture preserved: repository-assigned sequence tokens, no silent LWW, no adopt-before-durable-persist, sealed packages never overwritten in place.  
- High-frequency payloads stay out of canonical JSON.

---

## 6. Layering & dependency rules

| Layer | May depend on | Must not depend on |
|---|---|---|
| Domain / Evidence Repository | Spatial **contracts** only | Vendor SDKs |
| `SpatialSensorAdapter` implementations | Vendor SDKs | Domain stores, EDTS, Build Engine, twin pipelines |
| Typed sources | Adapter protocols + envelopes | UI; vendor types in public API |
| `SpatialSensorCoordinator` | Sources + capability stages + `ClockSynchronizer` | UIKit/SwiftUI; vendor SDK types |
| Package builder | Contracts + file I/O ports | Live sensor sessions; reconstruction engines |
| Phase 4+ engines | `VerifiedSpatialEvidenceProviding` | Draft URLs; unverified packages |

Evidence Repository never opens an `ARSession` (or any vendor session).

### 6.1 Existing scaffolding (today)

| Path | Today | Phase 3 role |
|---|---|---|
| `App/Spatial/*` | README stubs; SPM-excluded | First adapters (ARKit) behind neutral protocols |
| `App/Motion/*` | README stubs | CoreMotion → `MotionSource` / `PoseSource` |
| `App/Calibration/*` | README stubs | Raw calibration lock + derived lineage |
| `DeviceCapabilitySnapshotProviding` | LiDAR/depth probes | Feeds capability stages / device floor |

---

## 7. Composable, hardware-neutral sensor layer

### 7.1 Design rule

Core protocols use **hardware-neutral terminology**. Apple frameworks are the **first adapter implementations**, not the domain vocabulary. GigE Vision, thermal arrays, and structured-light scanners must plug in without refactoring domain logic.

### 7.2 Rejected: optional-heavy mega-sample

A single `SpatialFrameSample` struct packed with optionals (maybe camera, maybe depth, maybe IMU) is rejected. It defeats exhaustiveness checking and stream-error handling.

### 7.3 Typed adapters and envelopes

Specification-level shapes (illustrative; not production code in this pass):

```text
protocol CameraSensorAdapter: SpatialSensorAdapter {
    var sourceCapabilities: SensorCapabilityRecord { get }
    func startAcquisition() async throws
        -> AsyncThrowingStream<SpatialSampleEnvelope<CameraSample>, Error>
}

protocol DepthSensorAdapter: SpatialSensorAdapter { /* DepthSample */ }
protocol MotionSensorAdapter: SpatialSensorAdapter { /* MotionSample */ }
protocol PoseSensorAdapter: SpatialSensorAdapter { /* PoseSample */ }

struct SpatialSampleEnvelope<Payload> {
    let sampleId: SampleID
    let monotonicNanos: UInt64          // acquisition clock
    let clockDomain: ClockDomainID
    let sourceId: SourceID
    let payload: Payload
    // interruption / quality flags as typed fields — not “nil means error”
}
```

| Rule | Requirement |
|---|---|
| Streams | Prefer `AsyncThrowingStream` (or equivalent throwing sequence) so preparation failure and mid-stream failure are typed |
| Payloads | Distinct `CameraSample`, `DepthSample`, `MotionSample`, `PoseSample` — no optional soup |
| Vendor leakage | Adapters must not expose `ARFrame`, `CMSampleBuffer`, etc. past the adapter boundary |

### 7.4 Composable sources

| Source | Role |
|---|---|
| `CameraSource` | RGB / intensity |
| `DepthSource` | Depth + confidence / quality |
| `MotionSource` | IMU / dynamics windows |
| `PoseSource` | 6-DoF poses with full frame semantics |
| `ClockSynchronizer` | Vendor clock domains → monotonic session clock |

Sources declare capability requirements, surface domain-local interruptions, and never write package bytes directly.

### 7.5 `SpatialSensorCoordinator`

1. Compose active source set from plan / capability requirements  
2. Advance **capability stages** (§8) before and during arming  
3. Drive `ClockSynchronizer`  
4. Fan-in typed envelopes onto the monotonic timeline  
5. Propagate interruptions without corrupting sealed packages or custody  
6. Façade for the Spatial Capture Session Builder  

UI speaks to the coordinator — never to vendor SDK types.

---

## 8. Capability & interruption lifecycle

Capabilities are tracked across **four stages** (not a single boolean):

| Stage | Meaning |
|---|---|
| **Declared** | What the plan / device floor claims to need or support before arming |
| **Activated** | What was successfully armed at session start |
| **Observed** | What actually produced samples / interruptions during capture |
| **Final Outcome** | Seal-time summary frozen into the **immutable** package capability snapshot |

Non-LiDAR and degraded hardware are first-class:

- Required depth missing → refuse engineering mode with reason code, or labeled demo — never silent fake depth.  
- Optional depth `unsupported` / `denied` / `degraded` / `unavailable_runtime` recorded honestly across stages.  
- Stream drops, thermal throttling, and background transitions update **Observed** / interruption ranges; valid RGB/IMU sessions must not be failed solely because an optional depth stream dropped.

Interruption policy marks affected sample ranges on the draft index; it must not rewrite already-sealed package bytes.

---

## 9. Time, coordinate frames & calibration

### 9.1 Clocks

| Clock | Role |
|---|---|
| **Monotonic acquisition nanoseconds** | Ordering and sync within a session |
| **Wall-clock epoch** | Human/audit anchors (`createdAt` / seal / custody transition times on the **custody record** or package creation metadata fixed at seal) |

**Forbidden:** wall clock as sole high-rate ordering key; comparing vendor domains without correlation metadata (`TIMESTAMP_STANDARD.md`).

Manifest includes a **clock correlation matrix** (method, residual/uncertainty, valid interval) from each vendor domain → monotonic session, and monotonic → wall at anchors only.

### 9.2 Coordinate frames — explicit matrix semantics

Anonymous \(4\times4\) matrices are rejected. Every pose/transform carries (`COORDINATE_FRAME_STANDARD.md`):

| Field | Requirement |
|---|---|
| `source_frame` / `destination_frame` | Registry ids |
| `matrix_layout` / storage order | `column_major` \| `row_major` |
| `handedness` | Explicit |
| `translation_unit` | Meter |
| Camera optical axis conventions | Explicit when camera frames involved |
| `timestamp` + `clock_domain` | Required |
| `authority` | Default `GUIDANCE_ESTIMATE` |
| Tracking quality / uncertainty | When available |

Frame-to-frame relationships are **named edges** in the package’s Coordinate Frame Registry.

### 9.3 Calibration — raw vs derived

| Class | Rule |
|---|---|
| **Raw calibration** | Vendor-native parameters locked at capture (e.g. AVCameraCalibrationData); stored as evidence (or hash-referenced sidecar); authoritative for the package |
| **Derived / reprocessed adjustments** | Separate derived artifacts with lineage to raw calibration + method id; **never** overwrite raw calibration in the sealed package |

---

## 10. Payload isolation & manifest layout

### 10.1 Split

| In canonical Spatial Manifest (JSON) | External binary payloads |
|---|---|
| Schema / package identity (no mutable custody status) | Raw RGB (`.heic` / `.png`) |
| Capability final-outcome snapshot | Depth & confidence (`.bin` / `.raw`) |
| Coordinate Frame Registry | Motion & pose batches (`.bin`) |
| Clock correlation matrix | Raw calibration sidecars if binary |
| Sample indices + metadata summaries | — |
| SHA-256 (or versioned) content hashes + package-relative paths | — |

High-frequency rasters and time series are **never** inlined into canonical JSON.

### 10.2 Suggested package-relative layout

```text
spatial-package/
  manifest.json
  payloads/
    rgb/…
    depth/…
    confidence/…
    motion/…
    pose/…
  calibration/…
```

Integrity is by content hash; paths are package-relative aids.

### 10.3 Per-sample index metadata (not the raster)

Monotonic timestamp + clock domain; \(K\) / distortion ref; extrinsic pose with full frame semantics; depth↔RGB linkage; authority + tracking quality.

---

## 11. Lineage & OCC integration

### 11.1 Evidence package (permanent)

- Content hash over sealed bytes; algorithm id versioned.  
- Manifest digest: canonical JSON **excluding** any self-digest field; **excluding** custody fields (custody is external).  
- Package commits: `expectedRevision` / repository-assigned tokens (S2-004).  
- Rejected commits side-effect free.  
- Swift `Hasher` / `hashValue` forbidden for persisted identity.

### 11.2 Custody record (mutable)

- Points at `packageContentHash`.  
- Transitions `VERIFIED` / `ARCHIVED` / failure / quarantine without touching blobs.  
- Concurrency: custody updates must not race into package blob writers (there are none after `PACKAGED`).

### 11.3 Derived products (ephemeral)

Required lineage block fields include at least:

- `sourcePackageHash`  
- `pipeline_version`  
- `timestamp`  
- method / transform id  
- new artifact id (never reuse evidence ids)

---

## 12. End-to-end data flow

```text
1. Guided point requests spatial evidence
2. Coordinator resolves Declared capabilities → arm Activated set
3. CAPTURING via typed AsyncThrowingStreams of envelopes
4. Observed interruptions / samples recorded on draft index
5. CAPTURE_COMPLETE → VALIDATING (or INTERRUPTED / CANCELLED / VALIDATION_FAILED)
6. Seal → PACKAGED (immutable bytes + content hash)
7. Custody record created; verification → VERIFIED | VERIFICATION_FAILED
8. Repository may issue VerifiedSpatialEvidencePackage
9. Inspection binding / export / Phase 4+ ONLY via verified handle
10. Later derivation: DERIVATION_REQUESTED → … → DERIVED_VERIFIED
    (lineage.sourcePackageHash = parent; parent bytes unchanged)
11. Optional custody ARCHIVED for retention
```

---

## 13. Implementation sequence (bounded, post-acceptance)

Coding remains unauthorized until gates in §14 hold. Suggested **9-step** order:

1. **Shared domain contracts** — package identity, sample ids, clock domains, frame registry types, envelope generics, capability stage enums (no vendor SDKs).  
2. **Draft acquisition state machine** — including `INTERRUPTED` / `CANCELLED` / `VALIDATION_FAILED` / `QUARANTINED`.  
3. **Package builder + content hashing** — immutable seal; fixture binaries; manifest without custody fields.  
4. **`EvidenceCustodyRecord` + OCC commit path** — verify/archive/fail without mutating blobs.  
5. **`VerifiedSpatialEvidenceProviding` gateway** — typed handle; compile-time refusal of URLs/drafts in Phase 4+ façades (even if Phase 4 code is stub-only).  
6. **`ClockSynchronizer` + correlation records** — monotonic nanos vs wall anchors.  
7. **First Apple adapters** — typed `Camera` / `Motion` / `Pose` streams behind neutral protocols; calibration raw lock.  
8. **`DepthSource` capability-gated path** — non-LiDAR honesty across Declared→Final Outcome.  
9. **Simulator / device verification harness** — evidence-bounded manifests; no false passes when host lacks Xcode/device.

---

## 14. Implementation gates (coding not authorized yet)

All must hold:

1. Sprint 2.3 success gate: Mac `xcodebuild` on `Phase1StillCapture` **PASSED** and recorded  
2. This architecture reaches `ARCHITECTURE_ACCEPTED`  
3. ADRs filed where the Decision Register marks `REQUIRES_ADR_BEFORE_IMPLEMENTATION`  

---

## 15. Decision Register

| Topic | Classification | Notes |
|---|---|---|
| S2-004 OCC / `expectedRevision` / no silent LWW | `LOCKED_FROM_EXISTING_CONTRACT` | Extend to spatial package commits |
| S2-002 snapshot hashing posture / envelope schema v1 for inspection | `LOCKED_FROM_EXISTING_CONTRACT` | Do not conflate with spatial package schema |
| Authority default `GUIDANCE_ESTIMATE` | `LOCKED_FROM_EXISTING_CONTRACT` | |
| Coordinate / timestamp standards docs | `LOCKED_FROM_EXISTING_CONTRACT` | |
| Immutable package bytes ≠ custody record | `PROPOSED_FOR_PHASE_3` | Normative in this draft |
| Dual FSMs (acquisition/custody vs derived) | `PROPOSED_FOR_PHASE_3` | |
| `VerifiedSpatialEvidencePackage` gateway | `PROPOSED_FOR_PHASE_3` | |
| Typed `SpatialSampleEnvelope<Payload>` + throwing streams | `PROPOSED_FOR_PHASE_3` | |
| Capability stages Declared→Final Outcome | `PROPOSED_FOR_PHASE_3` | |
| Spatial package schema version id | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Hash algorithm id versioning for spatial payloads | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| RGB↔depth sync tolerance / association method | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Device-floor matrix for engineering vs guidance modes | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Custody record concurrency / OCC tokens | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | May mirror session revision or distinct store |
| Mesh / SfM / densification / CAD / AI | `DEFERRED_TO_LATER_PHASE` | Phase 4+ |
| Non-Apple adapters (GigE, thermal, structured-light) | `DEFERRED_TO_LATER_PHASE` | Protocol must not block them |
| Certified metrology claims from phone LiDAR | `DEFERRED_TO_LATER_PHASE` | Not by default; needs separate authority model |
| Full journal replay / multi-stage quarantine UX | `DEFERRED_TO_LATER_PHASE` | Align with recovery ADR trajectory |

---

## 16. Document control

| Change | Rule |
|---|---|
| Put mutable custody status inside hashed manifest | **Forbidden** |
| Single FSM with `REPROCESSED` on the source package | **Rejected** — dual lifecycles |
| Phase 4+ APIs accepting raw URLs / draft folders | **Rejected** — typed verified handle only |
| Mega `SpatialFrameSample` with optional payload soup | **Rejected** — typed envelopes |
| Bind domain vocabulary to ARKit/AVFoundation | **Rejected** — adapters only |
| Monolithic `SensorManager` as sole API | **Rejected** |
| Inline high-rate samples into manifest JSON | **Rejected** |
| Treat mesh/twin as authoritative over evidence | **Rejected** |
| Add mesh/SfM into Phase 3 | **Rejected** — Phase 4+ |
| Mutate sealed package bytes in place | **Forbidden** |
| Elevate authority above `GUIDANCE_ESTIMATE` | New ADR + validation evidence |

**Classification:** `PHASE_3_ARCHITECTURE_DRAFT_IMPLEMENTATION_PENDING`
