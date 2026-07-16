# Layer 1 Research Dossier Plan — Visual Reference Data

## Status

**PLANNING — Authorized after L00 specification freeze**

L00 readiness: `L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY`. This dossier plan does not authorize L01 geometry production.

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
