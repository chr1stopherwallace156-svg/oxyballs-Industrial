# EDTS Layer 1 Source Baseline Closure Criteria

**Status:** `ACTIVE`  
**Milestone:** `L1_SOURCE_PACK_01`  
**Document gate:** `L1_DOCUMENT_ACQUISITION_READY`  
**Public search gate:** `L1_PUBLIC_REFERENCE_SEARCH_READY`  
**Modeling baseline:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`

| Field | Value |
|---|---|
| Research draft | `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE` |
| Milestone | `L1_SOURCE_PACK_01` |
| Evidence gate | `L1_REQUIRES_MORE_REFERENCE_DATA` (physical still open) |
| Document acquisition | **`L1_DOCUMENT_ACQUISITION_READY`** |
| Public reference search | **`L1_PUBLIC_REFERENCE_SEARCH_READY`** |
| Modeling baseline | **`NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`** |

Closure is **claim-specific and modular**. Absolute unanimous consensus across every manual for every detail is **not** required.

---

## Closure Rules (modular)

### `physical_fact_closure`

At least one directly applicable, verified authoritative OEM source, with **zero unresolved conflicting authoritative sources**, supplemented by physical confirmation once a **GRADE-A** or **GRADE-B** reference vehicle is inspected.

Applies to facts such as axle subtype (`EXT-L1-101`), PCD (`EXT-L1-104`), and OEM track/frame definitions once extracted into `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json`.

### `project_specification_closure`

Visual and geometric modeling tolerances (e.g. `visual_model_error <= 2.0 mm`) must be justified by **delivery requirements and target capture capabilities**, rather than being forced to match nominal OEM blueprint tolerances.

See `L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json` → `PROVISIONAL_PROJECT_SPECIFICATION`.

### `visual_acceptance_closure`

Rendered shader parameters (roughness, metallic, coating type) must be mapped to **`PROVISIONAL_VISUAL_TUNING`** and calibrated through controlled reference photography under consistent lighting conditions (`L1_MATERIAL_PBR_CORRECTION.md`, shot list).

---

## Artifact Integrity (still required to clear access gate)

- `SRC-L1-001`…`003` move from `acquisition_status: NOT_ACQUIRED` to acquired with non-null hash and verified metadata (`exact_title`, `publication_number`, `revision_date` read from file)
- Extractions that close open gaps recorded in `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` with page/table/quote
- Public harvest evidence uses real URLs + counsel-approved license posture (no example placeholders)

## Physical Inspection Sufficiency (for physical_fact_closure supplements)

- Target vehicle graded via `L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md`
- Presence validation for configuration-dependent objects
- Control-plane measurements per `L1_STRUCTURAL_MEASUREMENT_DEFINITIONS.md`

---

## Project Gate Verdict (current)

```text
Document Gate: L1_DOCUMENT_ACQUISITION_READY
Public Search Gate: L1_PUBLIC_REFERENCE_SEARCH_READY
Modeling Baseline: NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE
Milestone: L1_SOURCE_PACK_01
```

**Reasoning:** Source Pack 01 metadata and DOCUMENT_SUPPORTED extractions are engaged. Geometry freeze remains paused until GRADE-A/B physical confirmation and modular closure rules are satisfied claim-by-claim. Hash recompute against vault bytes is still pending in this environment.

### Explicitly suspended

- L01 mesh / glTF production
- Coordinate lock / geometry freeze
- Promotion of DOCUMENT_SUPPORTED → physically VERIFIED without inspection

### Unblocks geometry freeze when

Physical confirmation of CLM-L1-001…005 on an accepted grade vehicle; hash recompute optional but recommended; signed baseline record (future: `L1_SOURCE_BASELINE_APPROVAL.md`).
