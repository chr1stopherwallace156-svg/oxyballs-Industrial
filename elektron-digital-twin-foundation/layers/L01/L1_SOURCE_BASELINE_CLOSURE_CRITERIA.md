# EDTS Layer 1 Source Baseline Closure Criteria

**Status:** `ACTIVE`  
**Current gate verdict:** `L1_BLOCKED_BY_SOURCE_ACCESS`  
**Prior banners retained:**

| Field | Value |
|---|---|
| Research draft | `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE` |
| Phase | `L1_FACTUAL_VERIFICATION_REQUIRED` |
| Evidence gate | `L1_REQUIRES_MORE_REFERENCE_DATA` |
| Access gate | **`L1_BLOCKED_BY_SOURCE_ACCESS`** |

The project will only transition out of `L1_REQUIRES_MORE_REFERENCE_DATA` / `L1_BLOCKED_BY_SOURCE_ACCESS` and establish an approved **Layer 1 Source Baseline** when all of the following closure conditions are met.

---

## 1. Documentation Sufficiency Criteria

- **axle_subtype_resolved**: Front axle model designation documented with page-level extractions from both `SRC-L1-001` and `SRC-L1-003` showing unanimous consensus for the target layout (`EXT-L1-101`). Physical inspection remains recommended but documents may close `GAP-L1-001` if consensus is clear and hashed.
- **dimension_database_resolution**: All dimensions flagged as provisional / quality-target must match exact extracted table values from authoritative documents **or** have tolerance ranges constrained via physical measurement cross-checks (`EXT-L1-102`…`105`, measurement checklist).
- **locator_coverage**: Every entry in the claim register that asserts a numeric OEM value must contain a completed locator: publication name, revision/date, page, and table/figure index (schema V6 claim modules).

## 2. Physical Inspection Sufficiency Criteria

- **target_vehicle_audit**: One physical asset fully checked off against `L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md` (Regular Cab, 145.3 in WB, 4x2, DRW, 60 in CA, bare chassis).
- **presence_validation**: Every visual-object hierarchy item currently `CONFIGURATION_DEPENDENT` or `PHYSICAL_REFERENCE_DEPENDENT` updated to `DOCUMENTED_STANDARD`, `DOCUMENTED_OPTIONAL`, or `NOT_APPLICABLE` based on the target vehicle.
- **control_plane_verification**: Caliper / laser measurements for track width, rear frame spacing, and bolt pattern diameter verify nominal targets within accepted engineering limits before any 3D model geometry freeze (`L1_PHYSICAL_MEASUREMENT_CHECKLIST.md`).

## 3. Artifact Integrity Criteria

- `file_present: true` and non-null `content_hash_sha256` for `SRC-L1-001`, `SRC-L1-002`, and `SRC-L1-003`
- Public harvest items used for presence decisions recorded in `L1_PUBLIC_REFERENCE_IMAGE_MANIFEST_PROPOSAL.json` with real URLs (not example placeholders) and counsel-approved license posture
- Controlled shot list completion is **not** required to clear source-access block, but is required before photogrammetry sign-off

---

## Project Gate Verdict (current)

```text
Status Code: L1_BLOCKED_BY_SOURCE_ACCESS
```

**Reasoning:** Transition from provisional research to baseline sign-off requires physical document retrieval of the specific target pages outlined in the Extraction Plan. Proceeding with 3D structural modeling is suspended until these source artifacts are located, archived, hashed, and recorded.

### Explicitly suspended

- L01 mesh / glTF production
- Promotion of DOCUMENT_SUPPORTED claims to VERIFIED without hashed locators
- Front axle subtype lock without `EXT-L1-101` consensus (or physical override with photos)

### Unblocks when

Priority 1 sources in `L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json` move from `PENDING_PAGES` to inspected extractions, and closure criteria §1–§3 are checked off in a signed baseline record (future: `L1_SOURCE_BASELINE_APPROVAL.md`).
