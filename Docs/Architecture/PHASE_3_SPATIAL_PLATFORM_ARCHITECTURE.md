# Phase 3 — Spatial & Sensor Platform Architecture

| Field | Value |
|---|---|
| Status | **ARCHITECTURE_DRAFT — IMPLEMENTATION GATED** |
| Version | **1.4.0** |
| Date | 2026-07-27 |
| Path | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` |
| Applies to | `elektron-capture-ios` Phase 3 |
| Prerequisite | Sprint 2.3 success gate closed (**Mac `xcodebuild` PASSED** on `Phase1StillCapture`); Phase 0–2.3 contracts remain authoritative |
| Related | `COORDINATE_FRAME_STANDARD.md`, `TIMESTAMP_STANDARD.md`, `SYSTEM_BOUNDARIES.md`, `ENGINEERING_GUARDRAILS.md`, `ADR-SESSION-REVISION-OCC.md` (S2-004), `ADR-SESSION-RECOVERY-AND-QUARANTINE.md` |
| Supersedes | Drafts 1.0.0–1.3.0 (determinism boundary, package closure, schema longevity, dual quarantine scopes, and honest gateway phrasing below are normative) |

**This document is an architectural charter / engineering constitution.** It does not authorize production ARKit / AVFoundation / LiDAR workflows. **Zero Swift code, test files, or build-setting changes** are in scope for this pass.

**Next action after acceptance:** architecture audit against every Phase 0–2.3 contract — list conflicts and new ADR requirements — then approve the first Phase 3 vertical slice **only** after those conflicts are resolved. Do **not** jump straight to production coding.

---

## 0. Core philosophy & authority chain

> **The raw Spatial Evidence Package is permanent, immutable, and authoritative; the digital twin / mesh is ephemeral, versioned, and derived.**

```text
Observation
    ↓
Verified evidence
    ↓
Versioned interpretation
    ↓
User-facing presentation
```

A mesh, AR overlay, or AI conclusion must **never** be confused with the original physical evidence.

Phase 3 owns **acquisition, synchronization, representation, persistence, and packaging** of evidence — not reconstruction. SfM, meshing, densification, CAD verdicts, and AI remain **strictly deferred to Phase 4+**.

**Critical trap corrected:** never write custody statuses such as `VERIFIED` into the package manifest JSON. Hashing a file and then modifying that same file to record verification creates a **circular hash-invalidation loop**. Package bytes and custody state are **decoupled** (§2).

### 0.1 Determinism boundary

Phase 3 guarantees **deterministic identifiers, ordering, serialization, manifest construction, package layout, hash calculation, and verification** for a fixed set of captured bytes and metadata.

Phase 3 does **not** claim that separate physical capture runs will produce identical sensor observations or identical compressed media bytes. Physical scene, sensor noise, compression, exposure, device motion, and OS timing vary.

**Normative priority statement:**

> Deterministic representation, ordering, serialization, identity, and verification take precedence over premature optimization. Physical sensor observations are not assumed to be repeatable across separate capture runs.

---

## 1. Normative invariants

| # | Invariant |
|---|---|
| **1** | Evidence package bytes are immutable after the `PACKAGED` boundary; custody status never mutates those bytes or their content hashes. |
| **2** | Every derived artifact has complete, **hash-bound** lineage to its source evidence package (`sourcePackageHash` + pipeline identity). Hash linkage proves **content** linkage — **not** authorship, authorization, or non-repudiation. Digital signatures / attestations are a **separate future decision** (§15). |
| **3** | Phase 4+ production entry points consume evidence only via `VerifiedSpatialEvidencePackage` (§5). |
| **4** | Domain contracts are hardware-neutral; vendor SDKs stop at adapter boundaries. |
| **5** | High-frequency payloads stay out of canonical JSON; manifests carry hash-indexed references only. |
| **6** | Pose / depth default authority remains `GUIDANCE_ESTIMATE` unless elevated by ADR + validation evidence. |
| **7** | Sprint 2.3 OCC posture holds: `expectedRevision`, no silent LWW, no adopt-before-durable-persist. |
| **8** | **Package closure:** a packaged dataset is closed under its manifest — every authoritative artifact is referenced and verified; every referenced artifact exists and matches its declared metadata; no unreferenced authoritative payload is present (§11.2). |
| **9** | **Schema longevity:** historical evidence is interpreted only under its declared schema and semantic version; incompatible schemas fail explicitly rather than being silently reinterpreted (§12). |

---

## 2. Immutable package vs mutable custody

### 2.1 Hash-stability rule

| Artifact | Mutability | Contents |
|---|---|---|
| **`SpatialEvidencePackage`** | **Immutable** after `PACKAGED` | Canonical manifest JSON + external binary payloads. Content hash stable for archival life. |
| **`EvidenceCustodyRecord`** | **Mutable** | Repository-owned custody (`UNVERIFIED` → `VERIFIED` → `ARCHIVED`, or failure/quarantine). References package by **content hash**. Status changes **never** alter package bytes. |

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

**`PACKAGED` is a boundary event and package condition, not a mutable custody status stored inside the package manifest.**

### 2.2 Forbidden patterns

| Pattern | Why rejected |
|---|---|
| Writing custody fields into hashed `manifest.json` after seal | Circular hash-invalidation |
| Mutating package bytes to “upgrade” authority/calibration | Breaks forensic permanence |
| Soft-delete by overwriting sealed payloads | Use scoped quarantine + media policy |
| Treating path presence as proof of verification | Only custody + typed verified handle |

---

## 3. Dual lifecycles (strict presentation)

Three distinct concerns — **do not collapse into one status list**.

### 3.1 Draft acquisition lifecycle

Operates on a **draft session / staging workspace**:

```text
CAPTURING → CAPTURE_COMPLETE → VALIDATING
```

**Draft failure / disposition** (`DraftAcquisitionStatus`):

| State | Meaning | Authority |
|---|---|---|
| `INTERRUPTED` | OS / thermal / tracking / permission stop; resume or abort per policy | Capture session / coordinator |
| `CANCELLED` | Operator or system cancel before seal | Capture session |
| `VALIDATION_FAILED` | Bounds / schema / capability / hash-prep failed | Package builder / validator |
| `DRAFT_QUARANTINED` | Staging retained for forensics; not sealable without explicit recovery | Draft recovery / quarantine policy |

### 3.2 Package boundary

```text
                    PACKAGED
         (immutable bytes + content hash created)
```

- Seal succeeds only after validation passes and **package closure** (§11.2) holds.  
- After `PACKAGED`, there are **no writers** to package blobs.  
- `PACKAGED` is **not** stored as a mutable field inside the hashed manifest’s custody section (there is no custody section in the manifest).

### 3.3 Custody lifecycle (`EvidenceCustodyRecord`)

```text
UNVERIFIED → VERIFIED → ARCHIVED
              └→ VERIFICATION_FAILED
              └→ PACKAGE_QUARANTINED
```

| State | Meaning | Authority |
|---|---|---|
| `UNVERIFIED` | Package exists; integrity not yet confirmed (or not yet run) | Repository default after seal |
| `VERIFIED` | Closure + hash checks passed; typed verified handle may be issued | Repository verification |
| `VERIFICATION_FAILED` | Integrity/schema/closure failed; bytes unchanged; not Phase 4+ consumable | Repository verification |
| `PACKAGE_QUARANTINED` | Held out of normal consumption; bytes unchanged; reason + deciding authority recorded | Custody / recovery policy |
| `ARCHIVED` | Historical retention of a previously verified package; bytes unchanged | Retention policy |

### 3.4 Quarantine scopes (no ambiguity)

| Scope | Name | Owns the decision | Typical reasons |
|---|---|---|---|
| Draft | `DRAFT_QUARANTINED` / `DraftAcquisitionStatus.quarantined` | Draft/session recovery path | Incomplete capture, suspected staging corruption, operator hold |
| Package | `PACKAGE_QUARANTINED` / `EvidenceCustodyStatus.quarantined` | Custody/repository path | Hash mismatch, policy hold, incident response |

Every quarantine record must store **why** and **which authority** decided.

### 3.5 Derived artifact lifecycle (separate)

```text
DERIVATION_REQUESTED → PROCESSING → DERIVED → DERIVED_VERIFIED
                                         └→ SUPERSEDED | ARCHIVED
```

| Rule | Requirement |
|---|---|
| Lineage | `sourcePackageHash`, `pipeline_version`, `timestamp`, method id |
| Source mutation | **Never** |
| Proof strength | Hash-bound content linkage only; signatures/attestations separate (§15) |
| Source access | Only via `VerifiedSpatialEvidencePackage` |

---

## 4. Blueprint (normative topology)

```text
        [ Typed SpatialSensorAdapter implementations ]
     (ARKit / AVFoundation / CoreMotion today;
      GigE / thermal / structured-light later — if in support matrix)
                           │
     SpatialSampleEnvelope<CameraSample | DepthSample | …>
              (AsyncThrowingStream — typed payloads)
                           │
              [ ClockSynchronizer ]
                           │
            [ SpatialSensorCoordinator ]
                           │
           [ Spatial Capture Session Builder ]  ← draft FSM
                           │
              [ Evidence Package Builder ]      ← PACKAGED boundary + closure
                           │
              SpatialEvidencePackage (immutable)
                           ▲
              EvidenceCustodyRecord (mutable)
                           │
        VerifiedSpatialEvidencePackage handle
                           │
     [ Derived product lifecycle — separate FSM ]
```

---

## 5. Type-safe access control (honest guarantee)

### 5.1 Normative production rule

Supported Phase 4+ **production entry points must require `VerifiedSpatialEvidencePackage`**. Direct URL- or draft-based consumption is **prohibited by module boundaries, API design, and executable architecture tests**.

### 5.2 Caveat (no overpromise)

Swift cannot make arbitrary filesystem access physically impossible. A developer could still intentionally bypass the intended API. The charter therefore requires:

- Module boundaries that do not export draft paths to Phase 4+ targets  
- API surfaces typed to verified handles only  
- Executable architecture / boundary tests that fail the build or gate when forbidden call patterns are introduced in supported modules  

“Physically unreadable folders” is **not** the control plane.

### 5.3 Gateway shape (illustrative)

```text
protocol VerifiedSpatialEvidenceProviding {
    func verifiedPackage(id: PackageID) async throws -> VerifiedSpatialEvidencePackage
}

struct VerifiedSpatialEvidencePackage { /* repository-issued opaque handle */ }
```

`ARCHIVED` remains consumable only when the repository still issues a verified-class handle.

---

## 6. Mission & boundaries

### 6.1 In scope

| ID | Workstream |
|---|---|
| **3.1** | Hardware-neutral typed adapters, envelopes, sources, `ClockSynchronizer`, coordinator |
| **3.2** | Draft acquisition FSM, `PACKAGED` boundary, `EvidenceCustodyRecord`, verified gateway |
| **3.3** | Calibration — raw vs derived separation |
| **3.4** | Photogrammetry capture (RGB + pose / \(K\)) |
| **3.5** | Depth/ranging capture (capability-gated) |
| **3.6** | Manifest + binaries + OCC + package closure + schema versioning |
| **3.7** | Versioned **Supported Device Matrix** + failure-path completion gates |

### 6.2 Out of scope (Phases 4–8+)

Mesh / SfM / densification / CAD verdicts / AI segmentation / certified metrology from phone LiDAR by default.

### 6.3 Phase 0–2.3 integrity

OCC, inspection envelope contracts, and recovery ADR trajectory remain authoritative. Spatial packaging extends them — it does not redefine them silently.

---

## 7. Layering & dependency rules

| Layer | May depend on | Must not depend on |
|---|---|---|
| Domain / Evidence Repository | Spatial **contracts** only | Vendor SDKs |
| Adapter implementations | Vendor SDKs | Domain stores, EDTS, Build Engine, twin pipelines |
| Typed sources / coordinator | Contracts + capability stages | UI; vendor types in public API |
| Package builder | Contracts + file I/O ports | Live sensor sessions; reconstruction engines |
| Phase 4+ engines | `VerifiedSpatialEvidenceProviding` | Draft URLs; unverified packages |

Existing scaffolding (`App/Spatial/*`, `App/Motion/*`, `App/Calibration/*`, `DeviceCapabilitySnapshotProviding`) becomes adapter/capability backing — still SPM-gated until implementation is authorized.

---

## 8. Hardware-neutral typed sensor layer

### 8.1 Design rule

Apple frameworks are the **first adapter implementations**, not the domain vocabulary. Future hardware fits only if listed (or explicitly extended) in the **Supported Device Matrix** (§14).

### 8.2 Rejected: optional-heavy mega-sample

Prefer typed adapters emitting `SpatialSampleEnvelope<CameraSample>`, `SpatialSampleEnvelope<DepthSample>`, etc., over `AsyncThrowingStream` (or equivalent throwing sequences).

### 8.3 Composable sources

`CameraSource`, `DepthSource`, `MotionSource`, `PoseSource`, `ClockSynchronizer` — compose under `SpatialSensorCoordinator`. No monolithic `SensorManager` as sole API.

---

## 9. Capability & interruption lifecycle

Four stages: **Declared → Activated → Observed → Final Outcome** (final outcome frozen into the immutable package capability snapshot at seal).

Non-LiDAR and degraded hardware are first-class: no fake depth; optional stream drops must not fail valid RGB/IMU sessions; interruptions mark sample ranges without rewriting sealed bytes.

---

## 10. Time, frames & calibration

### 10.1 Clocks

Monotonic acquisition nanoseconds for ordering/sync; wall-clock epochs for audit anchors. Correlation matrix required (method, residual, valid interval). Wall clock is never the sole high-rate ordering key.

### 10.2 Frames

Every \(4\times4\) carries source/destination frame ids, units, handedness, matrix storage order, optical-axis conventions when cameras are involved, timestamp + clock domain, authority, and quality/uncertainty when available. Anonymous matrices rejected.

### 10.3 Calibration

Raw vendor calibration is evidence (or hash-referenced sidecar). Derived/reprocessed adjustments are separate lineage artifacts — never overwrite raw calibration in the sealed package.

---

## 11. Payload isolation, closure & hashing

### 11.1 Manifest vs binaries

Canonical JSON: schema/package identity, capability final-outcome snapshot, frame registry, clock correlation, sample indices, hash-indexed paths. **No mutable custody status.**

External payloads: RGB, depth, confidence, motion/pose batches, binary calibration sidecars.

### 11.2 Package closure invariant

A finalized Spatial Evidence Package is **closed under its canonical manifest**:

- every referenced artifact exists;  
- every artifact matches its declared byte length and SHA-256 (or versioned algo);  
- every authoritative payload is referenced **exactly once**;  
- temporary, staging, and orphan files are excluded;  
- package verification is **independent** of mutable custody status.

Verification recomputes closure + hashes and updates **custody only**.

### 11.3 Suggested layout

```text
spatial-package/
  manifest.json
  payloads/{rgb,depth,confidence,motion,pose}/…
  calibration/…
```

### 11.4 OCC

Package commits use repository-assigned revision tokens and `expectedRevision`. Rejected commits are side-effect free. Swift `Hasher` / `hashValue` forbidden for persisted identity.

---

## 12. Schema longevity

Every package and record must declare a **schema version and semantic contract**.

| Requirement | Rule |
|---|---|
| Schema version | Present on every manifest and custody/derived record schema in use |
| Backward compatibility | Documented policy per major/minor |
| Unknown fields | Explicit ignore-or-fail policy (no silent semantic invention) |
| Unsupported version | **Fail explicitly** |
| Migration | Versioned, testable, recorded |
| Semantics | Historical coordinate, timing, calibration, and capability meanings must **never** be silently reinterpreted under newer assumptions |

A future Phase 6 implementation must not guess what a 2026 transform meant.

---

## 13. Lineage (hash-bound, not “cryptographic authorship”)

| Claim | Allowed? |
|---|---|
| Derivative references parent by content hash | **Required** |
| Hash proves the bytes of the source package | **Yes** (given algorithm + closure) |
| Hash alone proves who created the derivative | **No** |
| Hash alone provides non-repudiation | **No** |

Future authenticity (signatures, attestations, notarized custody) → Decision Register / ADR — not implied by SHA-256 references.

---

## 14. Supported Device Matrix

“All supported hardware sources operate behind hardware-neutral adapters” is meaningful **only** with a checked-in, versioned matrix.

### 14.1 Required fields (mechanism)

The architecture requires a versioned support matrix (path to be fixed at implementation kickoff, e.g. `Docs/Architecture/PHASE_3_SUPPORTED_DEVICE_MATRIX.md` or equivalent JSON) covering at least:

| Field | Purpose |
|---|---|
| Device family / class | e.g. non-LiDAR iPhone class, LiDAR iPhone/iPad class |
| Minimum OS | Floor for that row |
| RGB availability | supported / unsupported / degraded |
| Pose availability | idem |
| Motion (IMU) availability | idem |
| Depth / LiDAR availability | idem |
| Simulator / synthetic adapter behavior | what is emulated vs refused |
| Degraded modes | thermal, background, permission-limited |
| Unsupported modes | explicit refusals |
| Physical validation status | unvalidated / validated / blocked |

### 14.2 Physical-device / capability-class gate

One device is **not** enough. At minimum, Phase 3 completion validation must distinguish:

1. A **supported non-LiDAR iPhone** class  
2. A **supported LiDAR-capable iPhone or iPad** class  
3. **Simulator or synthetic adapter** validation  

This proves optional depth is truly modeled rather than accidentally assumed.

---

## 15. Completion criteria (success **and** failure paths)

Phase 3 is not complete merely because a good capture works. The platform is trustworthy when it **fails deterministically**.

### 15.1 Success-path gates (summary)

- Draft → validate → `PACKAGED` with closure  
- Custody `UNVERIFIED` → `VERIFIED` without mutating bytes  
- Verified handle issuance; inspection binding only to verified ids  
- Adapters for matrix-listed sources; high-frequency data externalized  
- Schema version present; OCC commit path green on authorized hosts  

### 15.2 Failure-path gates (required)

Executable / harness evidence for deterministic handling of at least:

| Failure class | Expected posture |
|---|---|
| Permission denial | No silent partial engineering package; labeled refusal / draft disposition |
| Non-LiDAR device | Depth unsupported honest; RGB/IMU path per matrix |
| Interruption and resume | Ranges marked; no sealed-byte rewrite |
| Cancellation | `CANCELLED` / no false `VERIFIED` |
| Low storage or write failure | Fail closed; no half-sealed “verified” package |
| Corrupted artifact detection | `VERIFICATION_FAILED` or `PACKAGE_QUARANTINED`; bytes unchanged |
| Hash mismatch | idem |
| Incomplete finalization | Never `PACKAGED` / never verified handle |
| Stale repository revision | OCC reject; side-effect free |
| Background transition | Interruption policy; no corrupt seal |

### 15.3 Host honesty

Missing Xcode / device capability → `BLOCKED_HOST_CAPABILITY` (or equivalent) — never a false pass.

---

## 16. End-to-end data flow

```text
1. Request spatial evidence
2. Declared → Activated capabilities (matrix-aware)
3. CAPTURING via typed throwing envelope streams
4. CAPTURE_COMPLETE → VALIDATING
   (or INTERRUPTED / CANCELLED / VALIDATION_FAILED / DRAFT_QUARANTINED)
5. Seal → PACKAGED (closure + content hash; immutable)
6. Custody UNVERIFIED → VERIFIED | VERIFICATION_FAILED | PACKAGE_QUARANTINED
7. Issue VerifiedSpatialEvidencePackage only on VERIFIED (or archived-verified policy)
8. Bind / export / Phase 4+ only via verified handle
9. Derived: DERIVATION_REQUESTED → … (hash-bound lineage; source untouched)
10. Optional custody ARCHIVED
```

---

## 17. Implementation sequence (post-acceptance, post-audit)

1. Shared domain contracts (ids, clocks, frames, envelopes, capability stages, schema version types)  
2. Draft acquisition state machine (including scoped draft quarantine)  
3. Package builder + closure + content hashing (manifest without custody fields)  
4. `EvidenceCustodyRecord` + OCC (`UNVERIFIED`/`VERIFIED`/…)  
5. `VerifiedSpatialEvidenceProviding` + module/boundary/architecture tests  
6. `ClockSynchronizer` + correlation records  
7. First Apple adapters (Camera / Motion / Pose) + raw calibration lock  
8. Depth path + **Supported Device Matrix** rows for non-LiDAR and LiDAR classes  
9. Simulator/synthetic + failure-path harness + multi-class device evidence  

---

## 18. Implementation gates (coding not authorized yet)

All must hold:

1. Sprint 2.3 Mac `xcodebuild` on `Phase1StillCapture` **PASSED** and recorded  
2. This charter reaches `ARCHITECTURE_ACCEPTED`  
3. **Architecture audit** vs Phase 0–2.3 complete; conflicts resolved or ADRs filed  
4. ADRs filed where Decision Register marks `REQUIRES_ADR_BEFORE_IMPLEMENTATION`  
5. First vertical slice scope approved explicitly  

---

## 19. Decision Register

| Topic | Classification | Notes |
|---|---|---|
| S2-004 OCC / `expectedRevision` | `LOCKED_FROM_EXISTING_CONTRACT` | |
| Inspection snapshot hashing / envelope v1 | `LOCKED_FROM_EXISTING_CONTRACT` | Do not conflate with spatial schema |
| `GUIDANCE_ESTIMATE` default authority | `LOCKED_FROM_EXISTING_CONTRACT` | |
| Coordinate / timestamp standards | `LOCKED_FROM_EXISTING_CONTRACT` | |
| Determinism boundary (representation ≠ physical replay) | `PROPOSED_FOR_PHASE_3` | |
| Custody ≠ package bytes; `PACKAGED` boundary | `PROPOSED_FOR_PHASE_3` | |
| Dual quarantine scopes | `PROPOSED_FOR_PHASE_3` | |
| Package closure invariant | `PROPOSED_FOR_PHASE_3` | |
| Schema longevity / explicit fail on incompatible version | `PROPOSED_FOR_PHASE_3` | |
| Hash-bound lineage (not authorship) | `PROPOSED_FOR_PHASE_3` | |
| Typed verified gateway + architecture tests | `PROPOSED_FOR_PHASE_3` | |
| Typed envelopes + throwing streams | `PROPOSED_FOR_PHASE_3` | |
| Capability stages Declared→Final Outcome | `PROPOSED_FOR_PHASE_3` | |
| Supported Device Matrix mechanism + fields | `PROPOSED_FOR_PHASE_3` | |
| Failure-path completion gates | `PROPOSED_FOR_PHASE_3` | |
| Spatial package schema version id | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Hash algorithm id versioning | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| RGB↔depth sync tolerance | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Device-floor engineering vs guidance modes | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Custody OCC / concurrency tokens | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Digital signatures / attestations for lineage authorship | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | Separate from hashing |
| Unknown-field & migration policy details | `REQUIRES_ADR_BEFORE_IMPLEMENTATION` | |
| Mesh / SfM / densification / CAD / AI | `DEFERRED_TO_LATER_PHASE` | |
| Non-matrix hardware (GigE, thermal, …) | `DEFERRED_TO_LATER_PHASE` | Protocol must not block later rows |
| Certified metrology from phone LiDAR | `DEFERRED_TO_LATER_PHASE` | |
| Full journal replay / multi-stage quarantine UX | `DEFERRED_TO_LATER_PHASE` | |

---

## 20. Document control

| Change | Rule |
|---|---|
| Claim bit-for-bit repeatability of physical captures | **Rejected** — use determinism boundary |
| Call hash lineage “cryptographic authorship / non-repudiation” | **Rejected** — hash-bound content linkage only |
| Store mutable custody inside hashed manifest | **Forbidden** |
| List `PACKAGED` as a mutable custody status | **Rejected** — boundary event / package condition |
| Ambiguous single `QUARANTINED` across draft and package | **Rejected** — scoped names |
| Promise OS-enforced “physically unreadable” drafts | **Rejected** — module/API/architecture-test guarantee |
| “Supported hardware” without versioned matrix | **Rejected** |
| Declare Phase 3 complete on success-path only | **Rejected** — failure-path gates required |
| Single-device validation for capability model | **Rejected** — multi-class gate |
| Silent reinterpretation of historical schemas | **Forbidden** |
| Single FSM with `REPROCESSED` on source package | **Rejected** |
| Mega optional `SpatialFrameSample` | **Rejected** |
| Mesh/SfM inside Phase 3 | **Rejected** |
| Mutate sealed package bytes in place | **Forbidden** |

**Classification:** `PHASE_3_ARCHITECTURE_DRAFT_IMPLEMENTATION_PENDING`

**Post-acceptance next step:** architecture audit vs Phase 0–2.3 → ADR gap list → first vertical slice approval — **not** immediate production coding.
