# EDTS Layer 1 Reference Acquisition Queue

**Status:** `ACTIVE — templates ready; Source Pack 01 NOT_VERIFIED`  
**Source pack:** `L1_SOURCE_PACK_01_NOT_VERIFIED`  
**Document gate:** `L1_DOCUMENT_ACQUISITION_READY`  
**Public search:** `L1_PUBLIC_REFERENCE_SEARCH_READY`  
**Modeling baseline:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`  
**Parallel:** Lane A + Lane B authorized  
**Milestone:** `L1_SOURCE_PACK_01`  
**Vehicle:** 2019 Ford F-450 Chassis Cab — Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA

This queue prioritizes and sequences all missing reference data required to close Layer 1 evidence gaps.

**Related:** `L1_EVIDENCE_GAP_PRIORITY_MATRIX.json`, `L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md`, `L1_FINAL_GAP_REPORT.md`

---

## Acquisition Timeline (relative sequence)

Relative offsets are phase order only — not calendar commitments.

```mermaid
gantt
    title EDTS Layer 1 Reference Acquisition Timeline
    dateFormat  X
    axisFormat %d
    section Phase 1: Documents
    OEM Specs and Order Guides  :active, p1, 0, 5
    BBAS Layout Book Extracts :active, p2, 0, 5
    section Phase 2: Public Media
    Dealer Auction Photo Hunt  :after p1, p3, 5
    section Phase 3: Physical Prep
    Vehicle Selection and VIN   :after p2, p4, 8
    Manual Measurements       :after p4, p5, 12
    section Phase 4: Controlled Capture
    Controlled Photo Shoot    :after p5, p6, 15
    3D Photogrammetry and Scan  :after p6, p7, 20
```

---

## Acquisition Hierarchy

### Priority 1 — Exact OEM Documents and Page-Level Extraction (`DOCUMENT_ACQUISITION`)

- **Gap addressed:** Absolute dimensional verification of front axle configuration (Monobeam/solid non-driving beam vs Twin-I-Beam — **undecided**), frame rails, and wheel mounting PCD.
- **DT-D037/D038 · RL-006/007 posture:** **`PRIMARY_SOURCE_REQUIRED`** + **Hard Rule 13**. Architecture = `RESEARCH_REQUIRED`. Geometry extraction forbidden until Tier A applicability verified.
- **Immutable source candidates** (`research/src_candidates/`):
  - **`SRC-CAND-000001`** BBAS Guide — RC 85 — Priority 1 (`NOT_ACQUIRED`)
  - **`SRC-CAND-000002`** Workshop Manual — RC 90 — Priority 2 (`NOT_ACQUIRED`)
  - **`SRC-CAND-000003`** Parts Catalog (Front Axle) — RC 75 — Priority 3 / `LANE_PRT` (`NOT_ACQUIRED`)
  - Priority 4: `LANE_VIS` visual teardown refs for exact 4x2 front end
- **Also:** Order Guide `SRC-L1-002` remains a document hunt stub.
- **Verification objective:** Establish nominal baseline **only after** hashed local bytes + page extracts bound to CFG-000001.
- **Contamination guards:** No 4x4 driven-beam / no 169.3 in WB mounts; VIN-filtered parts before `CONFIGURATION_MATCH`.
- **Authoritative queue:** `research/src_candidates/SRC_CANDIDATE_REGISTER.json`
- **Sprint records:** `RL-006`, `RL-007`

### Priority 2 — High-Resolution Exterior Image Sets (`PUBLIC_PHOTO_ACQUISITION`)

- **Gap addressed:** Visible details of configuration-dependent standard/optional exterior objects (tow hooks, roof cab lamps, transit lights, badging).
- **Target artifacts:**
  - High-resolution press-kit exterior images of the 2019 Chassis Cab
  - Ford Fleet marketing brochures containing clean profiles
- **Verification objective:** Build visual reference boards for panel lines, outer trim transitions, and standard visual shapes.
- **Manifest:** `L1_PUBLIC_REFERENCE_IMAGE_MANIFEST_PROPOSAL.json`

### Priority 3 — Dealer & Auction Photogrammetry Harvests (`PUBLIC_PHOTO_ACQUISITION`)

- **Gap addressed:** Underside layout, frame rail corridors, fuel-filler neck routing, and standard exhaust tailpipe exits for the exact 145.3-inch wheelbase 4x2 DRW.
- **Target artifacts:**
  - Detailed chassis-cab listings on Commercial Truck Trader, Machinery Trader, and salvage auction portals (Copart, IAAI)
  - Undercarriage walks, frame-rail corridor photos, and spring pack layouts
- **Verification objective:** Spot actual configuration-dependent variances before inspecting the selected reference truck.

### Priority 4 — Physical Reference Vehicle Selection and VIN/Label Intake (`PHYSICAL_VEHICLE_INSPECTION`)

- **Gap addressed:** Discrepancies between theoretical fleet-guide standard offerings and real-world assembly variances.
- **Target artifacts:**
  - FMVSS safety certification label photograph (door jamb)
  - Ford Window Sticker / VIN build sheet
  - Axle differential housing tag (Dana S110)
- **Verification objective:** Tie nominal engineering drawings directly to an in-the-flesh chassis serial number.
- **Checklist:** `L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md`

### Priority 5 — Controlled Reference Photography, Measurement & Scans (`CONTROLLED_PHOTOGRAPHY` / `PHYSICAL_MEASUREMENT` / `3D_SCAN`)

- **Gap addressed:** Surface geometry of complex-casting components (axle castings, wider-track front hub flares) and precise coordinate control.
- **Target artifacts:**
  - 3D photogrammetric scans of the front steering knuckles and Dana rear housing
  - Calibrated digital caliper records of frame widths and axle hubs
- **Verification objective:** Final sign-off on 3D mesh alignment (only after source baseline closure).
- **Lists:** `L1_REQUIRED_PHOTO_SHOT_LIST.md`, `L1_PHYSICAL_MEASUREMENT_CHECKLIST.md`

---

## Priority 1b — Evidence Acquisition Engine (Lane A + broader evidence)

**Subsystem:** `tools/evidence_acquisition/` · `documentation/EVIDENCE_ACQUISITION_ENGINE.md` · DT-D032  

Pipeline: Search → Discover → Acquire → Integrity → **Metadata** → Parse → Inventory → Grade → Extract → Attach Evidence → Update Passport → Runtime Ready.

## Priority 1b-legacy note — Component-First Marketplace Asset Acquisition (Lane A)

**Gap addressed:** No local geometry bytes for `CMPINST-VEH000001-DOOR-FL` (blocks door vertical slice).  
**Rule:** Hard Rule 11 — search complete-vehicle **and** component levels; evaluate an exact complete asset first when found; otherwise acquire component-by-component under HR-EVI.  
**Register:** `L1_LANE_A_ASSET_CATALOG.json`  
**Immediate actions (STATUS-owned; no separate next-actions file):**

1. Search for exact complete-vehicle packages (OEM CAD, manufacturer/teardown/museum scans, photogrammetry, supplier CAD) **and** door/cab component assets in parallel.
2. Record a real source URL (or local path) for `ASSET-00031` or a better exact candidate — never invent listing URLs.
3. Acquire/license file bytes; compute SHA-256; inventory meshes/materials/textures/bbox/counts into the availability audit.
4. Confirm whether the front-left door is a separately extractable mesh before Team C adaptation.
5. Deepen Component Passport `PP-VEH000001-DOOR-FL-001` (status + links) as the primary truth surface — **ahead of** OEM part-number chase alone.
6. OEM parts-catalog part-number check remains useful before promoting related-year STEP candidates to `CONFIGURATION_MATCHED` (discovery-only until then).
7. On ingest: link geometry only to the exact component instance under `VEH-000001` + `CFG-000001`.

**Current gate:** `ASSET-00031` = `CANDIDATE_NOT_ACQUIRED` → `F450_DOOR_FL_VERTICAL_SLICE_BLOCKED_BY_MISSING_ASSET`.

---

## Binding Rules

1. Do not invent page contents, publication numbers, or revision dates before files are acquired.
2. Source registry keeps `exact_title` / `publication_number` / `revision_date` as **null** until read from the artifact (`NOT_ACQUIRED`).
3. Extraction page locators live only in `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json`.
4. Geometry / mesh production remains **BLOCKED** until modeling baseline approval.
5. Priority 1 document extractions for `GAP-L1-001` are DOCUMENT_SUPPORTED; physical capture still required.
6. Scan work follows `L1_SCAN_PRIORITY_SEQUENCE.md` (fine castings deferred).
7. Do not invent marketplace URLs, SHA-256 hashes, or mesh inventories for Lane A candidates (Hard Rule 6).
