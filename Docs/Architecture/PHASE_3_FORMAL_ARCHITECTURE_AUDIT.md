# Phase 3 — Formal Architecture Audit (Charter vs Phase 0–2.3)

| Field | Value |
|---|---|
| Status | **AUDIT OPEN — BLOCKS PHASE 3 CODING** |
| Version | **1.0.0** |
| Date | 2026-07-27 |
| Charter under audit | `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md` **v1.5.0** |
| Scope | Map Phase 3 charter contracts against Phase 0–2.3; list conflicts, naming drift, ADRs; recommend first vertical slice |
| Constraint | Audit / specification only — **no** production Swift, tests, or build-setting changes in this pass |

---

## 0. Verdict

Most Phase 3 philosophy **extends** locked Phase 0–2.3 contracts (hashing, OCC, soft-delete, frames/timestamps, `GUIDANCE_ESTIMATE`).

**Do not write Phase 3 feature Swift** until:

1. Sprint 2.3 Mac `xcodebuild` gate **PASSED**  
2. Charter reaches `ARCHITECTURE_ACCEPTED`  
3. **P0 ADRs** below are filed (especially custody naming vs EDTS `PACKAGE_QUARANTINED`)  
4. First vertical slice scope approved (synthetic driver)

---

## 1. Contract inventory (Phase 0–2.3)

| Path | Summary |
|---|---|
| `Docs/Architecture/COORDINATE_FRAME_STANDARD.md` | Transform semantics; `GUIDANCE_ESTIMATE` example |
| `Docs/Architecture/TIMESTAMP_STANDARD.md` | Clock domains; no cross-domain compare without mapping |
| `Docs/Architecture/SYSTEM_BOUNDARIES.md` | Capture owns acquisition/manifests/hashes; no Build Engine / silent metrology |
| `Docs/Architecture/ENGINEERING_GUARDRAILS.md` | Never overwrite originals; never invent uncertainty; observation→evidence |
| `Docs/Architecture/STATUS_TAXONOMY.md` | Separate status planes; **`PACKAGE_QUARANTINED` owner: EDTS** |
| `Docs/Architecture/CAPTURE_SESSION_STATE_MACHINE.md` | Technician CaptureSession FSM (`SEALED` … `SERVER_VERIFIED`) |
| `Docs/Architecture/VISION.md` / `ARCHITECTURE.md` | Evidence instrument; ARKit/LiDAR = guidance |
| `Docs/Evidence/EVIDENCE_STANDARD.md` | Authority classes; hash-lineaged derivatives |
| `Docs/Decisions/ADR-SESSION-REVISION-OCC.md` | S2-004 `expectedRevision` + repository assignment |
| `Docs/Decisions/ADR-SESSION-RECOVERY-AND-QUARANTINE.md` | Quarantine disposition matrix; recovery monotonicity |
| `Docs/Decisions/ADR-CANONICAL-IDENTITY-PATTERN.md` | Single canonical identity + invariant tests |
| `Docs/Decisions/DECISION_LOG.md` | S2-002/003/004; envelope v1 untouched by revision |
| `Docs/Capture/SPRINT_2_SNAPSHOT_HASH_LOCK.md` | S2-002 `sha256-canonical-json-v1` |
| `Docs/Capture/AUTHORITATIVE_COMMIT_PROPAGATION_CONTRACT.md` | Persist → adopt; OCC; delete then quarantine binary |
| `Docs/Capture/SPRINT_2_1_ARCHITECTURE.md` | Locked UDF; soft-delete media policy; envelope v1 |
| `Docs/Capture/SPRINT_2_3_SUCCESS_GATE.md` | Six invariants; **NOT COMPLETE** (xcodebuild unmet) |
| `Docs/Capture/SPRINT_2_3_FOUNDATION_AUDIT.md` | OCC landed; session JSON quarantine still ABSENT |
| `Docs/Capture/PHASE_1C_EVIDENCE_LIBRARY.md` | Write-once originals; `.quarantine/`; SHA read-back |
| `Docs/VERIFICATION_STATES.md` | Process/device verification claims (`*_VERIFIED`) |
| `Docs/Validation/CANONICAL_JSON.md` | Deterministic JSON for hash-bound metadata |
| `Docs/Audits/CAPABILITY_MATRIX.md` | Spatial/depth/ARKit = docs/stubs; packaging mature |
| `Contracts/Compatibility/status-owner-registry.json` | Machine ownership: `PACKAGE_QUARANTINED` → EDTS |
| `App/Domain/Models/DeviceCapabilitySnapshot.swift` | Portable capability freeze (`schema_version` 1.0.0) |
| `App/Domain/Protocols/DeviceCapabilitySnapshotProviding.swift` | Hardware-neutral capability capture protocol |
| `App/Spatial|Motion|Calibration/**/README.md` | Deferred stubs; `GUIDANCE_ESTIMATE` |

---

## 2. Alignment map

| Charter concept | Result | Evidence / note |
|---|---|---|
| Determinism boundary | **EXTENDS** | Aligns with `CANONICAL_JSON.md` + S2-002; correctly refuses physical bit-for-bit replay |
| Hash-bound lineage | **ALIGNED** | Matches `EVIDENCE_STANDARD.md` + “never overwrite originals”; sharpens “hash ≠ authorship” |
| `PACKAGED` vs custody | **EXTENDS** + **GAP** | Write-once / seal exist; no `EvidenceCustodyRecord` or `PACKAGED` token; mapping to `CAPTURE_SEALED` / `.edts-pkg` undefined |
| Scoped quarantines | **EXTENDS** + **CONFLICT risk** | Media `.quarantine/` + recovery ADR exist; **must not** reuse EDTS `PACKAGE_QUARANTINED` wire code |
| `VerifiedSpatialEvidencePackage` | **GAP** / **PROPOSED** | New gateway; consistent with architecture-test culture |
| Hardware-neutral adapters / capability | **EXTENDS** | `DeviceCapabilitySnapshot*` exists; Declared→Final Outcome stages need schema extension ADR |
| Deterministic failure | **EXTENDS** | Mirrors Sprint 2.3 fail-closed / side-effect-free reject |
| Package closure / SHA-256 | **EXTENDS** | Generalizes Phase 1 inventory verify; spatial hash algo id needs ADR |
| Schema longevity | **ALIGNED** | Envelope v1 locked; spatial schema must stay distinct |
| OCC `expectedRevision` | **ALIGNED** | Session OCC locked; **custody OCC needs ADR** |
| Frames / timestamps | **ALIGNED** | Restates existing standards |
| `GUIDANCE_ESTIMATE` | **ALIGNED** | Locked across architecture + evidence standard |
| Soft-delete vs overwrite | **ALIGNED** | Phase 1C + Sprint 2.1 |
| Inspection binding → verified spatial ids | **CONFLICT** / **NEEDS_ADR** | Today: `storageKey` / library ids at approve — not spatial custody-verified packages |
| Status taxonomy / verification planes | **CONFLICT** + **GAP** | Lexical `VERIFIED` / `UNVERIFIED` / quarantine collisions across planes |

---

## 3. Naming collisions

| Token | Existing plane | Charter use | Risk |
|---|---|---|---|
| **`PACKAGE_QUARANTINED`** | EDTS ingest (`STATUS_TAXONOMY`, registry, `CaptureSideStatusGuard`) | Must **not** be Capture custody wire code | **P0 hard collision** if reused |
| `EvidenceCustodyStatus.quarantined` | — | Capture-side custody (charter v1.5) | OK if namespaced and **not** registered as EDTS code |
| `DraftAcquisitionStatus.quarantined` | — | Draft only | Keep distinct from media `.quarantine/` soft-delete |
| Media soft-delete `.quarantine/` | Evidence Library | Unchanged | Third quarantine **scope** — disposition matrix must list all three |
| `VERIFIED` / `UNVERIFIED` | EDTS / library / uncertainty / process `*_VERIFIED` | Custody states | Keep planes separate; prefer prefixed types in APIs |
| `PACKAGED` vs `CAPTURE_SEALED` / `SEALED` / `PACKAGE_CREATED` | Capture / verification | Boundary event | Mapping ADR required |
| `revision` / `expectedRevision` | Inspection session OCC | Package/custody commits | Do not overload session wire field |
| Envelope schema v1 vs spatial schema | Inspection | Spatial package | Explicit non-conflation |
| `DERIVED_VERIFIED` / `SERVER_VERIFIED` | Capture session / derived FSM | Separate FSMs | Never collapse into STATUS_TAXONOMY capture plane |

**Charter v1.5.0 correction applied:** custody quarantine is `EvidenceCustodyStatus.quarantined`; Capture **must not** emit EDTS `PACKAGE_QUARANTINED`.

---

## 4. Required ADRs (prioritized)

### P0 — block coding

| ADR | Why |
|---|---|
| **Capture custody vocabulary vs status-owner-registry** | Prevent Capture from emitting EDTS `PACKAGE_QUARANTINED`; register Capture-owned custody codes if wire-visible |
| **`PACKAGED` vs Phase 1 seal/export** | Define relationship to `CAPTURE_SEALED`, library `packageState`, `.edts-pkg` — avoid dual package law |
| **Inspection binding to spatial evidence** | Reconcile “bind only verified spatial ids” with Sprint 2.1 `storageKey` / envelope v1 Option A |
| **Custody OCC tokens** | How concurrency applies to `EvidenceCustodyRecord` without colliding with `InspectionSession.revision` |

### P1 — before non-synthetic seal path

| ADR | Why |
|---|---|
| Spatial package schema version id + unknown-field/migration | Distinct from envelope v1 and DeviceCapabilitySnapshot `1.0.0` |
| Hash algorithm id for package closure | Binary content hash vs canonical-JSON manifest digest; version like S2-002 |
| Capability stages vs `DeviceCapabilitySnapshot` | Extend/version existing snapshot — do not fork |
| Dual quarantine disposition vs recovery ADR | Add draft-acquisition + spatial-custody rows alongside media/session |

### P2 — before depth/metrology-adjacent claims

| ADR | Why |
|---|---|
| RGB↔depth sync tolerance / association method | |
| Device-floor engineering vs guidance modes | |
| Digital signatures / attestations for lineage authorship | Separate from hash-bound content linkage |

---

## 5. Safe first vertical slice (synthetic)

After gates + P0 ADRs (or with custody names provisional and **not** EDTS codes):

1. **Domain contracts only** — clock/frame IDs, envelope stubs, schema-version placeholder, capability stage enums (SPM-gated; no vendor SDKs in domain).  
2. **Synthetic driver** — fixed byte payloads + canonical manifest **without** custody fields in hashed JSON.  
3. **Closure verifier** — recompute SHA-256 of referenced payloads (algorithm id from ADR or clearly `TEST_ONLY`).  
4. **In-memory custody record** — keyed by content hash (`UNVERIFIED` → verify / fail / Capture-scoped quarantine).  
5. **Harness outline** — deterministic replay mode from Hardware Matrix “Synthetic / Simulator” row; failure-path cases for hash mismatch, orphan file, incomplete finalization, stale revision.

**Explicitly out of first slice:** Apple Camera/Pose/Depth adapters, inspection binding changes, envelope v1 bump, live sensors, mesh/SfM, weakening `.edts-pkg` / S2-002 / S2-004.

---

## 6. Vertical-slice harness outline (draft)

```text
SyntheticSpatialCaptureDriver
  → emit CameraSample / MotionSample / PoseSample envelopes (fixed fixtures)
  → DraftAcquisition FSM (CAPTURING → … → VALIDATING)
  → PackageBuilder.seal() → SpatialEvidencePackage (closure checked)
  → EvidenceCustodyStore.verify() → VERIFIED | VERIFICATION_FAILED | quarantined
  → VerifiedSpatialEvidenceProviding.verifiedPackage(id)  // Phase 4 stub consumer
Failure injectors: permission-deny stub, drop optional depth, truncate payload,
  mutate byte, omit referenced file, inject orphan, stale expectedRevision
Evidence: JSON execution manifest (claims evidence-bounded; no false MET)
```

Harness implementation remains **unauthorized** until §0 gates clear.

---

## 7. Conflicts that block coding now

| Blocker | Evidence |
|---|---|
| Sprint 2.3 success gate open | `SPRINT_2_3_SUCCESS_GATE.md` — Mac `xcodebuild` unmet |
| Charter not `ARCHITECTURE_ACCEPTED` | Status still implementation-gated |
| EDTS `PACKAGE_QUARANTINED` ownership | `STATUS_TAXONOMY.md` + `status-owner-registry.json` |
| P0 ADRs missing | §4 |
| Inspection verified-only binding vs 2.1 `storageKey` | Unresolved authority |
| `PACKAGED` vs `.edts-pkg` / `CAPTURE_SEALED` undefined | Dual package law risk |

**Non-blocking gaps:** session JSON quarantine still ABSENT; Supported Device Matrix file path unset; dual quarantine disposition not yet in recovery ADR.

---

## 8. Audit closure checklist

- [ ] Charter `ARCHITECTURE_ACCEPTED` recorded  
- [ ] Sprint 2.3 Mac gate PASSED  
- [ ] P0 ADRs filed and linked from Decision Register  
- [ ] Naming: Capture custody quarantine ≠ EDTS `PACKAGE_QUARANTINED` confirmed in registry  
- [ ] First vertical slice scope written and approved  
- [ ] This audit status → `AUDIT_CLOSED`  

**Current classification:** `AUDIT_OPEN_BLOCKS_PHASE_3_CODING`
