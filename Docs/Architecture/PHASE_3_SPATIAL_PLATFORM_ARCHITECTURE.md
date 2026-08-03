# Phase 3 — Definitive Charter: Spatial Evidence Acquisition & Packaging

| Field | Value |
|---|---|
| Status | **DEFINITIVE CHARTER — IMPLEMENTATION GATED** |
| Version | **1.5.0** |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED** on `Phase1StillCapture`); Phase 0–2.3 contracts remain authoritative |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `STATUS_TAXONOMY.md`, `ADR-SESSION-REVISION-OCC.md`, `ADR-SESSION-RECOVERY-AND-QUARANTINE.md`, `Docs/Architecture/PHASE_3_FORMAL_ARCHITECTURE_AUDIT.md` |
| Supersedes | Drafts 1.0.0–1.4.0 |

**This document is the Phase 3 engineering constitution.** It does not authorize production ARKit / AVFoundation / LiDAR workflows. **Zero Swift feature code** until charter acceptance, Sprint 2.3 Mac gate, Formal Architecture Audit closure, and required ADRs.

**Strategic next step:** Formal Architecture Audit (`PHASE_3_FORMAL_ARCHITECTURE_AUDIT.md`) — map every contract in this charter against Phase 0–2.3, document conflicts/ADRs, then draft the synthetic vertical-slice harness. **Not** immediate production coding.

---

## 0. Core mission & authority chain

The purpose of Phase 3 is to establish an **uncompromised line of sight** between physical observation and persistent evidence. Output from Phase 3 is the **single source of truth** for all downstream spatial processing, reconstruction, and visualization.

```text
Observation
    ↓
Verified evidence
    ↓
Versioned interpretation
    ↓
User-facing presentation
```

**No** derived mesh, neural representation, AI analysis, or AR overlay may ever overwrite, mutate, or be confused with the primary spatial evidence.

> **The raw Spatial Evidence Package is permanent, immutable, and authoritative; the digital twin / mesh is ephemeral, versioned, and derived.**

Phase 3 establishes deterministic **acquisition, synchronization, representation, persistence, and packaging** of spatial sensor evidence. Reconstruction, SfM, meshing, densification, CAD alignment, and AI segmentation remain **strictly deferred to Phase 4+**.

**Hash-stability trap (corrected):** never write custody statuses such as `VERIFIED` into the hashed package manifest. Package bytes and custody state are decoupled (§2).

---

## 1. Core invariants

| # | Name | Statement |
|---|---|---|
| **1** | **Determinism Boundary** | Deterministic representation, ordering, serialization, identity, and verification take precedence over runtime optimization. Physical sensor observations are **not** assumed to be repeatable across separate physical capture runs. |
| **2** | **Hash-Bound Lineage** | Every derived artifact has complete, hash-bound lineage to its source spatial evidence package. Hash-binding proves **content** lineage; authorization, authorship, and non-repudiation are deferred to explicit attestation/signature layers. |
| **3** | **Boundary Isolation (`PACKAGED`)** | `PACKAGED` is a **boundary transition event and immutable package condition**, not a mutable custody status stored inside a package manifest. |
| **4** | **Scoped Quarantines** | Acquisition failures and custody validation failures are strictly isolated: `DraftAcquisitionStatus.quarantined` vs `EvidenceCustodyStatus.quarantined`. Each record stores reason + deciding authority. **Do not** emit the EDTS-owned status code `PACKAGE_QUARANTINED` from Capture (`STATUS_TAXONOMY.md` / `status-owner-registry.json`). |
| **5** | **Module-Enforced Consumption** | Supported Phase 4+ production entry points strictly require a `VerifiedSpatialEvidencePackage`. Direct filesystem, raw URL, or draft-based consumption is prohibited by Swift module visibility boundaries, API contracts, and architecture unit tests. (Swift cannot make arbitrary FS access physically impossible; intentional bypass remains possible — hence module/API/test enforcement.) |
| **6** | **Strict Hardware Abstraction** | All **supported** physical and synthetic sensor sources (per the versioned Hardware Matrix §5) interact solely through capability-aware, hardware-neutral adapters. |
| **7** | **Deterministic Failure** | System stability requires deterministic failure modes. Every interruption, permission denial, or validation error yields an explicit, non-recoverable, or cleanly recoverable diagnostic state. |
| **8** | **Package Closure** | A finalized Spatial Evidence Package is closed under its canonical manifest: every referenced artifact exists; every artifact matches its declared byte length and SHA-256; every authoritative payload is referenced exactly once; temporary/staging/orphan files are excluded; package verification is independent of mutable custody status. |
| **9** | **Schema Longevity & Versioning** | Every package and record must declare an explicit schema version and semantic contract. Historical coordinate, timing, calibration, and capability semantics must never be silently reinterpreted under newer assumptions; unsupported or incompatible schemas fail explicitly. |

**Also preserved from Phase 0–2.3 (non-renumbered locks):**

- Default pose/depth authority: `GUIDANCE_ESTIMATE`  
- Sprint 2.3 OCC: `expectedRevision`, repository-assigned sequence, side-effect-free reject  
- High-frequency payloads out of canonical JSON  
- Soft-delete never overwrites sealed originals in place  

---

## 2. Immutable package vs mutable custody

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

| Artifact | Rule |
|---|---|
| **`SpatialEvidencePackage`** | Immutable after `PACKAGED`. Content hash stable for archival life. Manifest contains **no** mutable custody status. |
| **`EvidenceCustodyRecord`** | Mutable; repository-owned; references package by content hash. Status changes never alter package bytes. |

---

## 3. Explicit lifecycles & boundary events

```text
[ DRAFT ACQUISITION LIFECYCLE ]
  CAPTURING → CAPTURE_COMPLETE → VALIDATING → [ DraftAcquisitionStatus.quarantined ]
                 │                    │
                 │                    └→ VALIDATION_FAILED / CANCELLED / INTERRUPTED
                 ↓
======================= [ BOUNDARY EVENT: PACKAGED ] =======================
                 ↓
[ IMMUTABLE EVIDENCE CUSTODY LIFECYCLE ]
  UNVERIFIED → VERIFIED → ARCHIVED
                └→ EvidenceCustodyStatus.quarantined / VERIFICATION_FAILED
```

### 3.1 Draft acquisition

| State | Meaning |
|---|---|
| `CAPTURING` | Streams open |
| `CAPTURE_COMPLETE` | Streams flushed |
| `VALIDATING` | Hashes, bounds, schema, closure prep |
| `INTERRUPTED` / `CANCELLED` / `VALIDATION_FAILED` | Explicit draft failure modes |
| `DraftAcquisitionStatus.quarantined` | Draft held; not sealable without recovery authority |

### 3.2 Boundary event: `PACKAGED`

Immutable bytes + canonical manifest + content hash created. **Not** a custody enum value inside the manifest.

### 3.3 Custody (`EvidenceCustodyRecord`)

| State | Meaning |
|---|---|
| `UNVERIFIED` | Sealed; integrity not yet confirmed |
| `VERIFIED` | Closure + hashes OK; typed verified handle may issue |
| `VERIFICATION_FAILED` | Integrity/schema/closure failed; bytes unchanged |
| `EvidenceCustodyStatus.quarantined` | Capture-side custody hold (namespaced; **≠** EDTS `PACKAGE_QUARANTINED`) |
| `ARCHIVED` | Historical retention of a previously verified package |

### 3.4 Derived artifact lifecycle (separate)

```text
DERIVATION_REQUESTED → PROCESSING → DERIVED → DERIVED_VERIFIED
                                         └→ SUPERSEDED | ARCHIVED
```

Derivatives store `sourcePackageHash`, `pipeline_version`, `timestamp`, method id. Source package never mutates.

---

## 4. Topology & sensor layer

```text
Typed SpatialSensorAdapter implementations
        → SpatialSampleEnvelope<Camera|Depth|Motion|Pose Sample>
        → ClockSynchronizer
        → SpatialSensorCoordinator (capability stages)
        → Spatial Capture Session Builder (draft FSM)
        → Evidence Package Builder (PACKAGED + closure)
        → SpatialEvidencePackage + EvidenceCustodyRecord
        → VerifiedSpatialEvidencePackage (Phase 4+ entry)
        → Derived product FSM (separate)
```

### 4.1 Typed envelopes (not mega-sample)

Prefer `CameraSensorAdapter` / `DepthSensorAdapter` / `MotionSensorAdapter` / `PoseSensorAdapter` emitting `AsyncThrowingStream<SpatialSampleEnvelope<Payload>, Error>`. Reject optional-heavy `SpatialFrameSample` soup.

### 4.2 Capability stages

**Declared → Activated → Observed → Final Outcome** (final outcome frozen into immutable package snapshot at seal).

Non-LiDAR and degraded hardware are first-class: no fake depth; optional stream drops must not fail valid RGB/IMU sessions.

### 4.3 Time, frames, calibration

- Monotonic acquisition nanoseconds vs wall-clock epochs + correlation matrix  
- Every \(4\times4\): source/destination frame, units, handedness, matrix storage order, optical-axis conventions, clock domain, authority  
- Raw calibration vs derived adjustments separated; raw never overwritten in sealed package  

### 4.4 Payload isolation

Canonical JSON = schema identity, capability final outcome, frame registry, clock correlation, sample indices, hash-indexed paths. Binaries external (RGB, depth, confidence, motion/pose).

---

## 5. Hardware & capability validation matrix

Invariant 6 is meaningful only with a **checked-in, versioned** matrix (path fixed at kickoff, e.g. `Docs/Architecture/PHASE_3_SUPPORTED_DEVICE_MATRIX.md`).

| Target/Class | Minimum OS | RGB | Camera Poses | IMU / Motion | Depth / LiDAR | Simulator Behavior | Degraded / Unsupported Modes |
|---|---|---|---|---|---|---|---|
| Non-LiDAR iPhone | iOS 17.0+ | Yes | Monocular | Yes | None | Mock RGB / Motion | Graceful fallback (no depth stream) |
| LiDAR iPhone / iPad | iOS 17.0+ | Yes | Full VIO | Yes | Hardware Depth | Mock Depth Stream | Explicit sensor recovery on frame drop |
| Synthetic / Simulator | macOS / iOS Sim | Synthetic | Mock Trajectory | Synthetic | Generated Point Cloud | Deterministic Replay | Replay harness mode only |

Physical / capability-class gate requires evidence across **all three** rows — one device is not enough.

---

## 6. Phase 3 completion criteria

To declare Phase 3 complete and unfreeze production execution beyond the gated vertical slice, the system must demonstrate:

### 6.1 Hardware matrix validation

All three capability classes in §5 exercised with recorded evidence (or honest `BLOCKED_HOST_CAPABILITY` — never a false pass).

### 6.2 Failure-path proof suite

Automated verification proving expected failures across:

- [ ] Hardware permission denials (Camera / Motion / Location)  
- [ ] Unsupported hardware gracefully falling back or halting with explicit status  
- [ ] In-flight interruptions (incoming calls, lock screen, background transitions)  
- [ ] User-initiated cancellations during active capture or package serialization  
- [ ] Low storage space / I/O write failures during draft streaming  
- [ ] Corrupted payload detection and SHA-256 hash mismatches during verification  
- [ ] Incomplete finalization / missing / orphan file checks (package closure)  
- [ ] Stale repository revision (OCC) or schema version mismatches  

Phase 3 is trustworthy when it **fails deterministically**, not only when it succeeds.

### 6.3 Success-path summary

Draft → validate → `PACKAGED` (closure) → custody `UNVERIFIED` → `VERIFIED` without mutating bytes → verified handle issuance → adapters only for matrix-listed sources → schema version present → OCC path green on authorized hosts.

---

## 7. Lineage, OCC & schema

| Topic | Rule |
|---|---|
| Derived lineage | `sourcePackageHash` + pipeline identity; hash ≠ authorship |
| Package OCC | Extend S2-004 posture; callers supply `expectedRevision` |
| Custody OCC | **Requires ADR** before implementation — must not overload `InspectionSession.revision` |
| Schema | Spatial package schema version **distinct** from inspection envelope v1 and DeviceCapabilitySnapshot `1.0.0` |
| Canonical JSON | Deterministic serialization for manifest digests (`Docs/Validation/CANONICAL_JSON.md`) |

---

## 8. Implementation sequence (post-audit, post-ADR)

1. Shared domain contracts (ids, clocks, frames, envelopes, capability stages, schema version types)  
2. Draft acquisition state machine (scoped draft quarantine)  
3. Package builder + closure + hashing (manifest without custody fields)  
4. `EvidenceCustodyRecord` + OCC (namespaced custody vocabulary)  
5. `VerifiedSpatialEvidenceProviding` + module/architecture tests  
6. `ClockSynchronizer` + correlation records  
7. First Apple adapters (Camera / Motion / Pose) + raw calibration lock  
8. Depth path + matrix rows for non-LiDAR and LiDAR classes  
9. Simulator/synthetic + failure-path harness + multi-class device evidence  

---

## 9. Implementation gates

All must hold before Phase 3 production coding:

1. Sprint 2.3 Mac `xcodebuild` on `Phase1StillCapture` **PASSED** and recorded  
2. This charter reaches `ARCHITECTURE_ACCEPTED`  
3. Formal Architecture Audit closed (conflicts resolved or ADRs filed)  
4. P0 ADRs from the audit Decision Register filed  
5. First vertical slice scope approved (synthetic driver preferred)  

---

## 10. Decision Register (charter-level)

| Topic | Classification |
|---|---|
| S2-004 OCC / S2-002 snapshot hashing / envelope v1 / `GUIDANCE_ESTIMATE` / frame & time standards / soft-delete | `LOCKED_FROM_EXISTING_CONTRACT` |
| Determinism boundary; `PACKAGED` vs custody; scoped quarantines; package closure; schema longevity; hash-bound lineage; typed gateway; typed envelopes; capability stages; hardware matrix; failure-path suite | `PROPOSED_FOR_PHASE_3` |
| Capture custody vocabulary vs EDTS `PACKAGE_QUARANTINED`; `PACKAGED` vs `.edts-pkg` / `CAPTURE_SEALED`; inspection binding to verified spatial ids; custody OCC; spatial schema id; hash algo id for closure; capability stages vs `DeviceCapabilitySnapshot`; RGB↔depth sync; signatures/attestations | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` |
| Mesh/SfM/CAD/AI; non-matrix hardware; certified phone-LiDAR metrology; full journal / multi-stage quarantine UX | `DEFERRED_TO_LATER_PHASE` |

Full conflict detail: `Docs/Architecture/PHASE_3_FORMAL_ARCHITECTURE_AUDIT.md`.

---

## 11. Document control

| Change | Rule |
|---|---|
| Claim bit-for-bit repeatability of physical captures | **Rejected** |
| Treat hash lineage as authorship / non-repudiation | **Rejected** |
| Store mutable custody inside hashed manifest | **Forbidden** |
| List `PACKAGED` as a mutable custody status | **Rejected** |
| Emit EDTS `PACKAGE_QUARANTINED` from Capture custody | **Forbidden** |
| Ambiguous single `quarantined` across draft, media soft-delete, and custody | **Rejected** — scoped names |
| Promise OS-enforced “physically unreadable” drafts | **Rejected** — module/API/architecture-test guarantee |
| “Supported hardware” without versioned matrix | **Rejected** |
| Complete Phase 3 on success-path only | **Rejected** |
| Single-device validation for capability model | **Rejected** |
| Silent reinterpretation of historical schemas | **Forbidden** |
| Mesh/SfM inside Phase 3 | **Rejected** |
| Mutate sealed package bytes in place | **Forbidden** |

**Classification:** `PHASE_3_DEFINITIVE_CHARTER_IMPLEMENTATION_PENDING`

**Post-acceptance next step:** Formal Architecture Audit → ADR gap list → synthetic vertical-slice harness approval — **not** immediate production coding.
