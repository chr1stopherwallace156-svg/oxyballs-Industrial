# EDTS Layer 1 OEM Document Extraction Plan (Awaiting Source Access)

**Status:** `AWAITING_SOURCE_ACCESS`  
**Depends on:** `L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json` (`acquisition_status: NOT_ACQUIRED`)  
**Results file:** `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` (empty until documents acquired)

This plan **decouples hunt queries from verified locators**. Real page numbers, table IDs, and extracted values reside **only** in the results file after documents are acquired and metadata verified.

| Extraction ID | Target Parameter | Target Document | Target Section Keywords / Search Terms | Expected Evidence Target |
| :--- | :--- | :--- | :--- | :--- |
| **EXT-L1-101** | Front Axle Subtype | `SRC-L1-001` | "front axle", "monobeam", "twin-i-beam", "4x2 spec" | Establish axle configuration for the 4x2 DRW F-450 platform. |
| **EXT-L1-102** | Front Track Width | `SRC-L1-001` | "track width", "front track", "tread", "DRW wide track" | Acquire nominal front track width. |
| **EXT-L1-103** | Frame Rail Width | `SRC-L1-001` | "frame width", "rear frame width", "C-channel dimension" | Determine whether any stated width (e.g. research candidate 34.2 in) is outside-to-outside, web, or flange. |
| **EXT-L1-104** | Wheel Spec & PCD | `SRC-L1-002` | "wheel size", "bolt circle", "pitch circle", "10-lug" | Confirm standard PCD (research candidate 225 mm) on DRW configurations. |
| **EXT-L1-105** | Wheelbase Tolerance | `SRC-L1-003` | "wheelbase tolerance", "frame diagonal", "alignment limits" | Extract the factory allowed dimensional deviation. |

## Workflow

1. Acquire file → store under `local_repository_path` for the source ID
2. Read exact title / publication number / revision from the artifact → update source registry (`metadata_status: VERIFIED`)
3. Hash file → set `content_hash_sha256`, `acquisition_status: ACQUIRED`
4. Search using keywords above → fill `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` with page, table/figure, quote, and numeric value
5. Promote claims only from results locators — never from this plan's keyword table alone

## Forbidden

- Inventing page numbers or table titles before acquisition
- Writing expected numeric values into the results file without a verbatim locator
- Treating keyword hits as VERIFIED without archived hash + quote
