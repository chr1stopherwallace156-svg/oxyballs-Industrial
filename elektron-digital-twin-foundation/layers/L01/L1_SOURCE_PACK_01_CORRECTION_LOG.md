# L1 Source Pack 01 Correction Log

**Status:** `L1_SOURCE_PACK_01_NOT_VERIFIED`  
**Action:** `RESET_TO_CANDIDATE_TEMPLATES`

| Date | Corrected File | Parameter / Section | Modification Details | Reason for Change |
| :--- | :--- | :--- | :--- | :--- |
| 2026-07-16 | `L1_SOURCE_ARTIFACT_FILE_MANIFEST.json` | All fields | Set all exact sizes, hashes, and page counts to `null` or `false` | Underlying files have not been locally parsed/calculated; prevents premature trust. |
| 2026-07-16 | `L1_PAGE_EVIDENCE_MANIFEST.json` | All fields | Reset page indices, excerpt texts, and status tags to `NOT_VERIFIED` or `null` | Exact textual citations and page mappings were candidate placeholders. |
| 2026-07-16 | `L1_SOURCE_ARTIFACT_REGISTRY.json` | metadata / hashes | Demoted from VERIFIED_AUTHENTIC / ACQUIRED_AND_HASHED to candidate/not-verified | Hashes and cover metadata were not computed from local bytes. |
| 2026-07-16 | `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` | EXT-L1-101…105 | Cleared page/table/quote fields; status `NOT_VERIFIED_FILE_ABSENT` | Extractions text was structurally generated, not file-inspected. |
| 2026-07-16 | `L1_CLAIM_REGISTER_UPDATED.json` | CLM-L1-001…005 | Demoted `DOCUMENT_SUPPORTED` → candidate / platform-architecture or UNVERIFIED | No verified page evidence remains. |
| 2026-07-16 | `L1_UNVERIFIED_VALUES_REGISTER.json` | Materials / Durometer | Deferred bushings and paint clear-coat measurements to L2 | Avoids unnecessary noise in the L1 exterior baseline framework. |
| 2026-07-16 | Hierarchy / CNF-001 / gaps | Front axle | Preferred subtype retained as candidate; not DOCUMENT_SUPPORTED | Aligns with authenticity audit. |

## Binding Rule Going Forward

A Source Pack entry may regain `DOCUMENT_SUPPORTED` only when:

1. `file_exists: true` at the declared path (or mounted vault path)
2. `hash_computation_status: EXECUTED` with recorded SHA-256 from those bytes
3. Cover-page metadata filled into exact_* fields from inspection
4. Page evidence row has non-null excerpt + page index and `reviewer_status` approved
