# EDTS Layer 1 Reference Acquisition Queue

**Status:** `ACTIVE`  
**Gate:** `L1_BLOCKED_BY_SOURCE_ACCESS`  
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

- **Gap addressed:** Absolute dimensional verification of front axle configuration (Monobeam wide-track vs Twin-I-Beam), frame rails, and wheel mounting PCD.
- **Target artifacts:**
  - 2019 Ford Super Duty Body Builder Layout Book (Chassis Cab Specs) — `SRC-L1-001`
  - 2019 Ford Super Duty Order Guide (Mechanical & Suspension Sections) — `SRC-L1-002`
  - 2019 Ford OEM Workshop Manual (Front Suspension & Frame Alignment Standards) — `SRC-L1-003`
- **Verification objective:** Establish the nominal baseline ground truth for mathematical verification of modeling scales.
- **Plan:** `L1_OEM_DOCUMENT_EXTRACTION_PLAN.md`

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

## Binding Rules

1. Do not invent page contents before PDFs are archived and hashed.
2. Publication numbers in the source registry are **proposed acquisition targets** until the physical file is inspected.
3. Geometry / mesh production remains **BLOCKED** while gate is `L1_BLOCKED_BY_SOURCE_ACCESS`.
4. Prefer Priority 1 document resolution for `GAP-L1-001` before physical capture.
