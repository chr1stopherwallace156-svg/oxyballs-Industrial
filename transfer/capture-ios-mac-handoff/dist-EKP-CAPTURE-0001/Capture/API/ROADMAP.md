# ROADMAP.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 0.1.1 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | elektron-capture-ios development |
| Supersedes | 0.1.0 Android-translated sketch |

## Platform lock

**iPhone is the primary capture platform.** This roadmap is Apple-native (AVFoundation, ARKit, Core Motion, Secure Enclave / Keychain / App Attest, RealityKit/Metal where appropriate). Android Camera2/ARCore proposals are **reference only** — not a line-by-line translation target.

Overall EDTS chain remains:

```
Physical vehicle → Calibrated capture → Spatial evidence package → EDTS → Build Engine
```

Only device-side technology changes.

---

## Correct implementation order (locked)

1. EDTS evidence and coordinate-frame schema  
2. Native Swift iPhone application shell  
3. AVFoundation still-photo capture  
4. Immutable original storage and hashing  
5. Camera-calibration extraction (`AVCameraCalibrationData`)  
6. Core Motion recording (supporting evidence; ARKit pose primary for v1 guidance)  
7. App Attest and server challenge verification  
8. ARKit pose capture  
9. LiDAR depth capture  
10. Guided required-viewpoint workflow  
11. Surface/voxel coverage  
12. Measurement and scale-anchor validation  
13. Backend reconstruction (EDTS-side)  
14. Build Engine evidence gates (Build Engine-side — **not** this app)

---

## Phases

### Phase 0 — Foundation *(APPROVED_FOR_PHASE_1_PREPARATION)*

Documentation, architecture, domain models, identifiers, evidence schema, coordinate frames, timestamps, state machine, integration contract, test harness, mocks, golden package, Phase 1 directive.

**Exit:** Phase 0 approval + GitHub publish (recommended). No production camera until Phase 1 code starts under the locked directive.

### Phase 1 — First Verified Capture Artifact

**Directive:** `Docs/Capture/PHASE_1_FIRST_VERIFIED_CAPTURE_ARTIFACT.md`

One AVFoundation still; exact encoded bytes (not RAW-by-default); read-back SHA-256; honest calibration availability; optional motion with reference frame; `.edts-pkg` + inventory; EDTS quarantine ingest; commit `INGESTED_INTEGRITY_VERIFIED` + `CONTENT_UNVERIFIED`. No Photos library write. No Build Engine. No ARKit/LiDAR.

**Exit:** All 16 gates in `ACCEPTANCE_CRITERIA.md` Phase 1.

### Phase 2 — Motion and spatial context

Core Motion ring buffer; ARKit session; pose + tracking-state records; timestamp mapping; interruption/drift tests. ARKit pose = guidance-grade by default.

### Phase 3 — Depth and calibration

Depth + confidence; Apple-native calibration records; board workflow; field validation; expiration. OpenCV coefficients only as **derivatives**.

### Phase 4 — Guided capture plan

Data-driven `CaptureRequirement` plans; viewpoints; completion rules; quality checks; exception workflow.

### Phase 5 — Coverage estimation

Vehicle envelope; graded coverage stages (not “ray through voxel”); explainable R/Y/G UI.

### Phase 6 — EDTS integration

Versioned API client; resumable upload; server verification; golden-package ingestion without reinterpretation.

### Phase 7 — Measurement assistance *(validation-gated)*

Scale markers; dimensional estimates with uncertainty; comparison to physical references. No automatic engineering authority.

---

## Explicit non-goals (do not drift)

Complete EDTS; Build Engine; fleet portal; CAD authoring; simulation; social photo features; cloud analytics dashboards; Android production support; every vehicle; autonomous engineering approval.

---

## Phase exit criteria

Documented requirements · passing automated tests · known limitations · validation artifacts · no unresolved criticals · migration compatibility · security review · integration-contract review · manual checklist. UI alone does not complete a phase.
