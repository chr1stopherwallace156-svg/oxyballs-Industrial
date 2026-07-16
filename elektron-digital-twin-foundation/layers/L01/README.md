# L01 Exterior — Visual Reference Research Package

**Status:** `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`  
**Phase:** `L1_FACTUAL_VERIFICATION_REQUIRED`  
**Evidence gate:** `L1_REQUIRES_MORE_REFERENCE_DATA`  
**Access gate:** `L1_BLOCKED_BY_SOURCE_ACCESS`  
**Acquisition activity:** `READY`

**Geometry production:** `BLOCKED`

**Locked vehicle:** 2019 Ford F-450 Chassis Cab — Regular Cab / 4x2 / DRW / 145.3 in WB / 60 in CA / bare cab-and-chassis

## Package Index

### Acquisition & source baseline (current focus)

| File | Role |
|---|---|
| [L1_REFERENCE_ACQUISITION_QUEUE.md](L1_REFERENCE_ACQUISITION_QUEUE.md) | Prioritized acquisition sequence |
| [L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json](L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json) | SRC-L1-001…003 (null metadata until acquired) |
| [L1_OEM_DOCUMENT_EXTRACTION_PLAN.md](L1_OEM_DOCUMENT_EXTRACTION_PLAN.md) | EXT-L1-101…105 keyword hunts |
| [L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json](L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json) | Page/table/quote results (empty) |
| [L1_STRUCTURAL_MEASUREMENT_DEFINITIONS.md](L1_STRUCTURAL_MEASUREMENT_DEFINITIONS.md) | Track / frame quantity definitions |
| [L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json](L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json) | Instrument + process uncertainty |
| [L1_REQUIRED_PHOTO_SHOT_LIST.md](L1_REQUIRED_PHOTO_SHOT_LIST.md) | Controlled photo checklist |
| [L1_SCAN_PRIORITY_SEQUENCE.md](L1_SCAN_PRIORITY_SEQUENCE.md) | Cab-first scan order |
| [L1_PUBLIC_REFERENCE_IMAGE_MANIFEST_PROPOSAL.json](L1_PUBLIC_REFERENCE_IMAGE_MANIFEST_PROPOSAL.json) | Public harvest manifest |
| [L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md](L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md) | GRADE-A/B/C candidate audit |
| [L1_PHYSICAL_MEASUREMENT_CHECKLIST.md](L1_PHYSICAL_MEASUREMENT_CHECKLIST.md) | Field metrology checklist |
| [L1_EVIDENCE_GAP_PRIORITY_MATRIX.json](L1_EVIDENCE_GAP_PRIORITY_MATRIX.json) | GAP-L1-001…004 priorities |
| [L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md](L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md) | Modular baseline unlock criteria |
| [L1_SOURCE_BASELINE_CLOSURE_RULES.json](L1_SOURCE_BASELINE_CLOSURE_RULES.json) | Machine-readable closure rules |

### Audit & verification (authoritative for claim state)

| File | Role |
|---|---|
| [L1_ADVERSARIAL_SOURCE_AUDIT.md](L1_ADVERSARIAL_SOURCE_AUDIT.md) | Adversarial source audit |
| [L1_CLAIM_REGISTER_PROPOSAL.json](L1_CLAIM_REGISTER_PROPOSAL.json) | Claim register CLM-001…015 |
| [L1_CONFIGURATION_CONFLICT_REGISTER.json](L1_CONFIGURATION_CONFLICT_REGISTER.json) | CNF-001 / CNF-002 |
| [L1_FINAL_GAP_REPORT.md](L1_FINAL_GAP_REPORT.md) | Post-audit gap / gate |

### Working proposals (prefer V2)

| File | Role |
|---|---|
| [L1_EXTERIOR_OBJECT_HIERARCHY_V2_PROPOSAL.md](L1_EXTERIOR_OBJECT_HIERARCHY_V2_PROPOSAL.md) | Layered object hierarchy |
| [L1_EXTERIOR_OBJECT_REGISTRY_V2_PROPOSAL.json](L1_EXTERIOR_OBJECT_REGISTRY_V2_PROPOSAL.json) | Object registry V2 |
| [L1_LANDMARK_CLASSIFICATION_STANDARD.md](L1_LANDMARK_CLASSIFICATION_STANDARD.md) | Landmark classes |
| [L1_LANDMARK_REGISTRY_V2_PROPOSAL.json](L1_LANDMARK_REGISTRY_V2_PROPOSAL.json) | Landmark registry V2 |
| [L1_CAPTURE_COVERAGE_GRID_PROPOSAL.json](L1_CAPTURE_COVERAGE_GRID_PROPOSAL.json) | Station capture grid |
| [L1_MATERIAL_PBR_CORRECTION.md](L1_MATERIAL_PBR_CORRECTION.md) | Dielectric metalness fix |
| [L1_VISUAL_ACCEPTANCE_STANDARD_V2_PROPOSAL.md](L1_VISUAL_ACCEPTANCE_STANDARD_V2_PROPOSAL.md) | Acceptance V2 |

### Research dossiers & V1 trail

| File | Role |
|---|---|
| [L1_EXTERIOR_RESEARCH_PLAN.md](L1_EXTERIOR_RESEARCH_PLAN.md) | Pass 1–4 research plan |
| [L1_EXTERIOR_OBJECT_HIERARCHY.md](L1_EXTERIOR_OBJECT_HIERARCHY.md) | V1 hierarchy (superseded) |
| [L1_EXTERIOR_OBJECT_REGISTRY_PROPOSAL.json](L1_EXTERIOR_OBJECT_REGISTRY_PROPOSAL.json) | V1 object registry (superseded) |
| [L1_EXTERIOR_LANDMARK_REGISTRY_PROPOSAL.json](L1_EXTERIOR_LANDMARK_REGISTRY_PROPOSAL.json) | V1 landmarks (superseded) |
| [L1_REFERENCE_VIEW_MATRIX.md](L1_REFERENCE_VIEW_MATRIX.md) | Spherical capture matrix |
| [L1_PHOTO_AND_SCAN_COVERAGE_PLAN.md](L1_PHOTO_AND_SCAN_COVERAGE_PLAN.md) | Three-ring coverage plan |
| [L1_BODY_SURFACE_AND_PANEL_FORM_DOSSIER.md](L1_BODY_SURFACE_AND_PANEL_FORM_DOSSIER.md) | Cab / flare form |
| [L1_WHEEL_TIRE_DRW_DOSSIER.md](L1_WHEEL_TIRE_DRW_DOSSIER.md) | Wheel / tire / DRW |
| [L1_GLASS_TRIM_LIGHTING_DOSSIER.md](L1_GLASS_TRIM_LIGHTING_DOSSIER.md) | Glass / trim / lights |
| [L1_MATERIAL_AND_MANUFACTURING_DOSSIER.md](L1_MATERIAL_AND_MANUFACTURING_DOSSIER.md) | Material classes |
| [L1_GEOMETRY_VS_NORMAL_MAP_VS_TEXTURE_MATRIX.md](L1_GEOMETRY_VS_NORMAL_MAP_VS_TEXTURE_MATRIX.md) | Detail allocation |
| [L1_VISUAL_ACCEPTANCE_STANDARD.md](L1_VISUAL_ACCEPTANCE_STANDARD.md) | V1 acceptance (superseded) |
| [L1_OPEN_QUESTIONS.md](L1_OPEN_QUESTIONS.md) | Unresolved items |
| [L1_GAP_ANALYSIS.md](L1_GAP_ANALYSIS.md) | Working evidence gaps |

## Next Research Actions

1. Acquire and hash `SRC-L1-001` / `002` / `003` — clear `L1_BLOCKED_BY_SOURCE_ACCESS`
2. Execute `EXT-L1-101`…`105` extractions with page locators
3. Public harvest with counsel-approved license posture
4. Select reference VIN via physical checklist; measure; controlled shots
5. Do **not** begin mesh production while access/evidence gates remain open
