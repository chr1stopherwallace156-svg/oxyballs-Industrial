# ACCEPTANCE_CRITERIA.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.1.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Phase exit gates |
| Supersedes | 1.0.0 |

Objective pass/fail only. UI polish does not complete a phase.

Shared forever rules (all phases):

- [ ] Integration status honest (`PACKAGE_EXPORT_READY` until EDTS importer handshake succeeds)
- [ ] No Build Engine authorization tokens emitted
- [ ] No `ENGINEERING_VERIFIED` emitted by capture validators
- [ ] PRODUCTION build rejects mock EDTS/attestation/plan providers
- [ ] Original artifacts immutable
- [ ] Changelog + decision log updated for material changes

---

## Phase 0 — Foundation

- [x] Independent Git repository (not nested in EDTS / Build Engine)
- [x] Governing docs + Cursor rules present
- [x] Versioned contracts with ownership metadata
- [x] AuthorityGuard on validation/export path
- [x] Golden package + independent hash verification
- [x] Negative schema tests
- [x] Mock isolation (`TEST` / `DEVELOPMENT_MOCK` / `PRODUCTION`)
- [x] XREPO-CAP-EDTS-0001 drafted
- [x] Schema compatibility (READ/WRITE/MIGRATE/REJECT) + canonical JSON + acceptance criteria
- [x] Capture device provenance with stable machine-readable IDs
- [x] Human classification: **APPROVED_FOR_PHASE_1_PREPARATION** (`PHASE_0_APPROVAL.md`)
- [x] Phase 1 directive locked: `PHASE_1_FIRST_VERIFIED_CAPTURE_ARTIFACT.md`
- [ ] Empty GitHub remote created and history pushed
- [ ] Annotated tag `capture-ios-phase0-approved-v0.1.3` pushed to origin

**Phase 0 engineering baseline:** approved for Phase 1 *preparation*.  
Runtime integration status remains **PACKAGE_EXPORT_READY** until EDTS import succeeds.

---

## Phase 1 — First Verified Capture Artifact

Governing doc: `Docs/Capture/PHASE_1_FIRST_VERIFIED_CAPTURE_ARTIFACT.md`  
Package format: `Docs/Evidence/EDTS_PKG_FORMAT.md`

### Mindset gate

```
A photo appearing correctly in the UI  ≠  Phase 1 completion

Exact AVFoundation-produced encoded bytes preserved
+ metadata / provenance recorded
+ hash of read-back bytes
+ inventory + schema validation
+ EDTS safe ingest + independent hash recompute
+ INGESTED_INTEGRITY_VERIFIED + CONTENT_UNVERIFIED
= Phase 1 completion
```

### Deterministic checklist (all required)

| # | Gate | Pass condition |
|---|---|---|
| 1 | Physical capture | Supported approved iPhone captures one processed still via AVFoundation |
| 2 | Byte fidelity | Exact AVFoundation-produced encoded bytes persisted **once** |
| 3 | No Photos / no recompress | No `UIImageWriteToSavedPhotosAlbum`; no UIImage round-trip / resize / recompress before hash |
| 4 | Read-back hash | Persisted artifact read back; SHA-256 matches client-computed hash and `shasum -a 256` |
| 5 | Manifest binds read-back hash | Manifest `sha256` is hash of those read-back bytes |
| 6 | Provenance | Device profile, hardware model id, installation/enrollment, app, OS, lens profile, timestamps recorded |
| 7 | Calibration honesty | Missing calibration → `availability: NOT_AVAILABLE` (never fabricated) |
| 8 | Motion honesty | If present: reference frame + sync delta; quaternion authoritative; no ambiguous lone yaw |
| 9 | Decl paths only | Package contains only inventory-declared paths |
| 10 | Safe staging | EDTS importer quarantines; hostile-archive defenses applied |
| 11 | Schema + inventory | EDTS validates schemas and `package_inventory.json` |
| 12 | Server hash recompute | EDTS recomputes artifact hashes from extracted bytes; mismatch = hard fail |
| 13 | Canonical cross-proof | Swift and EDTS canonicalizers produce identical canonical manifest bytes + SHA-256 |
| 14 | Identity survival | IDs, authority, lineage, provenance unchanged across ingest |
| 15 | Commit status | EDTS commits `INGESTED_INTEGRITY_VERIFIED` + `CONTENT_UNVERIFIED` (or `COMMITTED_UNVERIFIED_EVIDENCE`) |
| 16 | No policy engine | Zero Build Engine / engineering approval / metrology claims |

### Explicit representation rules

- [ ] Artifact labeled `APPLE_ENCODED_JPEG` or `APPLE_ENCODED_HEIF` — **not** RAW unless separately scoped
- [ ] `pixel_processing_claim`: `NOT_ASSERTED`
- [ ] HTTP success may be 201 or 202; gate is ingestion **status**, not status code alone

**Phase 1 done when:** all 16 gates pass. Not when the preview looks fine. Not when “zip opens.”

---

## Phase 2 — Motion and spatial context

- [ ] Core Motion ring buffer recorded around captures
- [ ] ARKit session pose records with frames + clock domains
- [ ] Tracking-state recorded
- [ ] Timestamp mapping documented; no false “exact sync” claims
- [ ] ARKit data authority = `GUIDANCE_ESTIMATE` by default
- [ ] Interruption / backgrounding recovery tested
- [ ] Pose drift known-limitation documented
- [ ] Package export includes motion/pose originals without overwriting still originals

---

## Phase 3 — Depth and calibration

- [ ] Depth (+ confidence when available) captured on approved LiDAR profile
- [ ] Apple-native calibration record stored when available
- [ ] OpenCV coefficients only as versioned derivatives with parent hash
- [ ] Calibration expiration / invalidation rules enforced
- [ ] Depth authority remains non-metrology until validation procedure exists

---

## Phase 4 — Guided capture plan

- [ ] Data-driven `CaptureRequirement` execution (not hard-coded screens)
- [ ] Completion rules deterministic
- [ ] Quality checks modular and explainable
- [ ] Exception types logged with actor + reason
- [ ] No generic “continue anyway” bypass

---

## Phase 5 — Coverage estimation

- [ ] Graded coverage stages (not ray-through-voxel alone)
- [ ] R/Y/G UI includes readable reasons (not color-only)
- [ ] Pose quality / depth confidence / sharpness inputs recorded

---

## Phase 6 — EDTS integration

- [ ] Versioned API client behind protocol
- [ ] Resumable upload + ack verification
- [ ] Golden + real packages import on EDTS without reinterpretation
- [ ] `INTEGRATION_STATUS` → `EDTS_COMPATIBLE` only after recorded dual-repo test
- [ ] No direct database access

---

## Phase 7 — Measurement assistance

- [ ] Scale anchors + uncertainty mandatory
- [ ] Estimates labeled `ALGORITHM_ESTIMATE` / `GUIDANCE_ESTIMATE` until validated
- [ ] Comparison to physical references documented
- [ ] No automatic promotion to `ENGINEERING_VERIFIED`

---

## Anti-creep rule

If work is not on the current phase checklist, record it in `ROADMAP.md` — do not implement it “while we’re here.”
