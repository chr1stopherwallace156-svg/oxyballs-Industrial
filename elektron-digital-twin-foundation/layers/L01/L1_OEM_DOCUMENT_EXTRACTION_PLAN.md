# EDTS Layer 1 OEM Document Extraction Plan

**Status:** `DRAFT — PENDING SOURCE FILES`  
**Depends on:** `L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json` (`inspection_status: PENDING_PAGES`)  
**Rule:** Expected values below are **research targets**, not verified extractions. Record actual page/table text after archive.

This plan targets precise extraction coordinates of nominal configuration parameters within official Ford Motor Company literature.

| Extraction ID | Target Parameter | Target Document | Target Location Coordinates | Claim Context / Expected Value |
| :--- | :--- | :--- | :--- | :--- |
| **EXT-L1-101** | Front Axle Subtype | `SRC-L1-001` (BBAS Guide) | Section: "Front Suspension & Axle", Page 24, Table: "Front Axle Specs" | Verify wide-track Monobeam configuration on 4x2 DRW. Resolves `CNF-001` / `GAP-L1-001`. |
| **EXT-L1-102** | Front Track Width | `SRC-L1-001` (BBAS Guide) | Layout Dimension Matrix, Page 12, Dimension `Front Track - DRW Wide Track` | Confirm 74.8 in (1899.9 mm). Cross-check acceptance V2 track claim. |
| **EXT-L1-103** | Frame Rail Width | `SRC-L1-001` (BBAS Guide) | Section: "Frame Dimensions", Page 8, Figure 2: "Rear Frame Width" | Confirm 34.2 in (868.7 mm) flat-surface spacing. **Reconcile** vs prior draft "34 in" provisional wording. |
| **EXT-L1-104** | Wheel Spec & PCD | `SRC-L1-002` (Order Guide) | Mechanical Specifications Section, Page 17, Table: "Wheels & Tires" | Confirm 19.5 x 6.0-inch DRW wheel, 10-lug, 225 mm PCD (`CLM-006`, `GAP-L1-002`). |
| **EXT-L1-105** | Wheelbase Tolerance | `SRC-L1-003` (Workshop Manual) | Section 204-00: Front Suspension, Frame Measurement and Diagonal Tolerance Matrix | Retrieve factory nominal tolerance (e.g., +/- 2.0 mm diagonal skew). Do not keep `CLM-015` as invented gate if OEM states otherwise. |

## Extraction Workflow

1. Acquire PDF → store at `local_repository_path`
2. Compute SHA-256 → write `content_hash_sha256`; set `file_present: true`
3. Extract page image + OCR/text snippet for each EXT-L1-*
4. Create claim record (schema V6) with locator: publication, date, page, table/figure index
5. Update `L1_CLAIM_REGISTER_PROPOSAL.json` and close related gaps only when locator is complete

## Page Coordinate Humility

Page numbers and section titles above are **hunt coordinates** from research planning. If the acquired revision uses different pagination, update this plan — do not force-fit text to the expected value.
