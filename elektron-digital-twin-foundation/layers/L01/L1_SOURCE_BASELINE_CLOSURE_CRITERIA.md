# EDTS Layer 1 Source Baseline Closure Criteria

**Status:** `ACTIVE`  
**Current gate verdict:** `L1_BLOCKED_BY_SOURCE_ACCESS`  
**Reference acquisition activity:** `READY` (templates, grading, lens standards, measurement defs in place)

| Field | Value |
|---|---|
| Research draft | `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE` |
| Phase | `L1_FACTUAL_VERIFICATION_REQUIRED` |
| Evidence gate | `L1_REQUIRES_MORE_REFERENCE_DATA` |
| Access gate | **`L1_BLOCKED_BY_SOURCE_ACCESS`** |
| Acquisition activity | **`READY`** |

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
Status Code: L1_BLOCKED_BY_SOURCE_ACCESS
Reference Acquisition Activity Status: READY
```

**Reasoning:** All structural planning assets, checklists, and measurement methodologies have been structurally updated. Modeling work and coordinate lock remain blocked pending physical document retrieval. Templates are ready to receive primary research material.

### Explicitly suspended

- L01 mesh / glTF production
- Coordinate lock / geometry freeze
- Promotion of claims to VERIFIED without extraction results locators

### Unblocks when

Priority 1 sources are acquired and hashed; modular closure rules above are satisfied claim-by-claim; signed baseline record created (future: `L1_SOURCE_BASELINE_APPROVAL.md`).
