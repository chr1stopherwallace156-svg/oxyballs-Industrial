# Layer 1 Research Dossier Plan — Visual Reference Data

## Status

**DRAFT COMPLETE — factual verification required**

| Field | Value |
|---|---|
| Status | `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE` |
| Phase | `L1_FACTUAL_VERIFICATION_REQUIRED` |
| Evidence gate | `L1_REQUIRES_MORE_REFERENCE_DATA` |
| Access gate | `L1_BLOCKED_BY_SOURCE_ACCESS` |

L00 remains frozen at `L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY`. This plan does **not** authorize L01 geometry production.

Primary package: [`layers/L01/`](L01/README.md)  
Acquisition: [`L1_REFERENCE_ACQUISITION_QUEUE.md`](L01/L1_REFERENCE_ACQUISITION_QUEUE.md)  
Closure: [`L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md`](L01/L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md)  
Audit: [`L1_ADVERSARIAL_SOURCE_AUDIT.md`](L01/L1_ADVERSARIAL_SOURCE_AUDIT.md)  
Gap report: [`L1_FINAL_GAP_REPORT.md`](L01/L1_FINAL_GAP_REPORT.md)

---

## Recommended First Research Track

**Start with spatial analysis of standard vehicle footprints** (Ford F-Series dimensional mappings), then proceed to image feature-matching points for pose estimation.

### Why footprints first

1. Dynamic camera presets require `VEHICLE_VISUAL_CENTER` and `r_bounding` — footprint envelopes define those scales.
2. Tier 1 document research can proceed before physical intake.
3. Pose-estimation landmarks need a dimensional scaffold so feature points are placed in ISO millimeters, not invented pixel space.

### Sequenced dossier topics

| Order | Topic | Output path |
|---|---|---|
| 0 | Exterior research foundation (hierarchy, registries, coverage, dossiers) | `layers/L01/` — **COMPLETE (DRAFT)** |
| 1 | F-Series footprint / envelope mappings (Candidate C1 applicable) | `research/incoming/l01_footprint_envelope/` |
| 2 | Exterior panel silhouette and gap zones | `research/incoming/l01_panel_silhouette/` |
| 3 | Image feature-matching / pose landmarks | `research/incoming/l01_pose_landmarks/` |
| 4 | Visual intake photo plan alignment | `research/incoming/l01_visual_intake_plan/` |

---

## Gate Rules

- No invented dimensions — mark `RESEARCH_REQUIRED` / `UNVERIFIED`
- Claims use schema V6 modular modules
- Units from `UNIT_REGISTRY_V3_CORE_PROPOSAL.json`
- Do not begin L01 mesh work until visual intake protocol executes
- Draft registries in `layers/L01/` are proposals until Tier 1 sources are archived
