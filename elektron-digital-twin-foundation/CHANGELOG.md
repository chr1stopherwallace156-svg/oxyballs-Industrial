# CHANGELOG.md

All notable changes to the digital twin foundation. Append-only.

## 2026-07-16

### Added

- Initial `elektron-digital-twin-foundation/` scaffold: README, AGENTS, STATUS, DECISIONS, REQUIREMENTS, ARCHITECTURE, DATA_MODEL, THREE_D_SPEC, QUALITY_STANDARD
- Layer stubs L00–L10, research registers, schemas, templates
- L00 Reference Lock research with provisional DT-D001 (2019 F-450 Super Duty Regular Cab 8 ft 4x2)
- DT-D002 tiered accuracy strategy, DT-D003 licensing posture
- Blockers DT-B001..DT-B003 in STATUS.json

### Changed

- **Configuration reconciliation pass** — `layers/L00/CONFIGURATION_RECONCILIATION.md`
- Result: **`REFERENCE_CONFIGURATION_BLOCKED`**
- Finding: provisional spec mixes **pickup** framing (141.6 in WB + 8 ft bed) with **chassis-cab** work-truck intent; F-450 Regular Cab pickup at 141.6 in **conflicts** with OEM pickup configuration table (F-450 listed as Crew Cab 176.0 only)
- Updated: REFERENCE_LOCK, REFERENCE_SOURCES, DIMENSION_DATABASE, OPEN_QUESTIONS, ASSUMPTIONS, LEGAL_LICENSES
- Rejected assumptions A-001, A-002, A-003, A-005, A-006
- DT-D001 status → BLOCKED (not locked)

### Status

- Active layer: L00 (in progress — **blocked on platform selection**)
- Reference vehicle: **NOT LOCKED**
- Owner must select Candidate C1, P1, or P2 before dimension import or L01

## 2026-07-16 (Adversarial Audit)

### Added

- `L00_ADVERSARIAL_AUDIT.md` — full adversarial audit with `L00_CLOSURE_REJECTED` verdict
- `L00_CLAIM_ERROR_REGISTER.json` — 6 claims (CHASSIS-001, COORD-001, METRO-001, IP-001, EVID-005, UNIT-001)
- `L00_CORRECTION_PLAN.md` — 6-step recovery plan
- `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json` — schema v2 with MAC classes, coordinate frames, provenance
- `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md` — ISO 8855 / EDTS / SCAN / UNREAL frame dictionary + transforms
- `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md` — MAC-A (±0.5 mm) through MAC-D

### Changed

- `L00_CLOSURE_REPORT.md` — demoted to **UNDER_REVIEW**; closure **REJECTED**
- `EVIDENCE_STANDARD.md` — removed universal ≤ 0.05 mm claim; added MAC class table
- `SOURCE_REGISTRY.md` — SRC-005 demoted to **PLANNED**; added source status definitions
- `COORDINATE_SYSTEM_STANDARD.md` — **deprecated** (incorrect ISO 8855 labeling)
- `GEOMETRY_ACQUISITION_STRATEGY.md` — corrected IP language (EDTS_CAPTURE / NOT_EVALUATED)
- `REFERENCE_CONFIGURATION.md` — added vocational powertrain 330/750 (pending verification); fixed wheelbase formatting
- `UNITS_AND_TOLERANCES.md` — nominal OEM precision rules; MAC reference
- `STATUS.json` — `closure_result: L00_CLOSURE_REJECTED`; audit block; blockers DT-B006..DT-B009
- **DT-D006** — Layer 0 closure rejected per adversarial audit

### Status

- Active layer: L00 (**blocked** — closure rejected, corrections pending owner feedback)
- Reference vehicle: **NOT LOCKED**
- Layer 1: **BLOCKED** — do not begin exterior work
- Next action: Owner reviews `L00_CORRECTION_PLAN.md` and provides feedback

## 2026-07-16 (Governance Refactor)

### Added

- `registries/UNIT_REGISTRY.json` — controlled unit vocabulary
- `registries/COORDINATE_FRAME_REGISTRY.json` — frame definitions
- `registries/TRANSFORM_REGISTRY.json` — machine-readable transforms
- `registries/HISTORICAL_CLAIM_REGISTRY.json` — CONFIGURATION_INAPPLICABLE claims
- `L00_CONFIRMED_CORRECTIONS.md`, `L00_PROVISIONAL_CORRECTIONS.md`, `L00_UNRESOLVED_REGISTER.json`
- `L00_FINAL_GAP_REPORT.md` — GAP-001 through GAP-004
- `COORDINATE_AND_DATUM_STANDARD_V2_PROPOSAL.md`, `DATUM_CONSTRUCTION_STANDARD.md`
- `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`, `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md`
- `VIN_AND_LABEL_CAPTURE_PROTOCOL.md`, `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA.json`
- `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json`
- `schemas/profiles/F450_PLATFORM_PROFILE_PROPOSAL.json`, `EDTS_REFERENCE_VEHICLE_PROFILE_PROPOSAL.json`

### Changed

- `STATUS.json` v0.2.0 — `L00_READY_FOR_PHYSICAL_INTAKE`; governance status block
- `L00_CLOSURE_REPORT.md` — REJECTED; document phase complete
- `L00_ADVERSARIAL_AUDIT.md` — ACCEPTED AS REVIEW FINDING
- Superseded v2 schema, MAC proposal, coordinate correction proposal
- **DT-D007** — governance refactor

### Status

- Readiness: **L00_READY_FOR_PHYSICAL_INTAKE**
- L00 closure: **REJECTED**
- Layer 1: **BLOCKED**

## 2026-07-16 (Formula and Symbol Standard)

### Added

- `FORMULA_AND_SYMBOL_STANDARD.md` — copyable formula template, symbol translation, tolerance formatting rules

### Changed

- `README.md` — EDTS Layer 0 baseline reading order; formula standard as item 1
- `AGENTS.md` — formula/symbol and coordinate orientation operational directives
- `RESEARCH_STANDARD.md` — mathematical representation and tolerancing requirements
- `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md` — minimum clearance formula reformatted per formula standard

## 2026-07-16 (Mathematical Correction Audit)

### Added

- `FORMULA_COMPLIANCE_AUDIT.md`, `TRANSFORM_VALIDATION_REPORT.md`, `L00_PRE_INTAKE_READINESS_REPORT.md`
- `registries/FORMULA_REGISTRY.json`, `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json`, `registries/COORDINATE_BASIS_TESTS.json`
- `CLEARANCE_STANDARD_V2_PROPOSAL.md`, `DATUM_STATE_MODEL_PROPOSAL.md`
- `VISUAL_REFERENCE_INTAKE_PROTOCOL.md`, `ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md`
- `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V5_PROPOSAL.json`, `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V2_PROPOSAL.json`

### Changed

- `registries/TRANSFORM_REGISTRY.json` — REJECTED_DO_NOT_USE (glTF matrix error; Unreal scale 100.0 fatal)
- `registries/UNIT_REGISTRY.json` — conversion multipliers and canonical unit IDs
- `registries/COORDINATE_FRAME_REGISTRY.json` — basis vectors; DTM-DSN/SUP datum IDs
- `DATUM_CONSTRUCTION_STANDARD.md` — formula-compliant tolerance blocks
- `CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md` — superseded
- `README.md`, `AGENTS.md` — v2 transforms, schema v5, visual intake readiness
- **DT-D008** — mathematical correction audit

### Status

- Readiness: **L00_READY_FOR_VISUAL_REFERENCE_INTAKE**
- Visual intake: **AUTHORIZED** (Layer 1)
- Engineering metrology: **PROVISIONAL** (Layer 2, blocked)

## 2026-07-16 (glTF Asset vs Three.js Scene Separation)

### Added

- `GLTF_FRAME_CORRECTION.md`, `THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md`
- `registries/TRANSFORM_REGISTRY_V3_PROPOSAL.json`, `registries/COORDINATE_BASIS_TESTS_V2.json`
- `FULL_FORMULA_COMPLIANCE_REPORT.md`, `L00_RUNTIME_READINESS_REPORT.md`
- `registries/UNIT_REGISTRY_V2_PROPOSAL.json`
- `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V3_PROPOSAL.json`
- `schemas/tests/valid/valid_scalar_claim.json`, `schemas/tests/invalid/invalid_mixed_fields_claim.json`
- `VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md`

### Changed

- `COORDINATE_FRAME_REGISTRY.json` — `GLTF_ASSET_FRAME`, `THREE_SCENE_FRAME`; deprecate `GLTF_RUNTIME_FRAME`
- `TRANSFORM_REGISTRY_V2_PROPOSAL.json` — SUPERSEDED
- `VISUAL_REFERENCE_INTAKE_PROTOCOL.md` — superseded by V2
- **DT-D009** — glTF asset vs Three.js scene separation

### Status

- Readiness: **L00_VISUAL_INTAKE_ONLY_READY**
- Transform authority: **V3**

## 2026-07-16 (Regression Audit — TF-FAIL-001)

### Added

- `TRANSFORM_QUATERNION_CORRECTION_REPORT.md`, `REGRESSION_AUDIT.md`, `L00_TRUE_RUNTIME_READINESS_REPORT.md`
- `THREE_CAMERA_AND_WORLD_STANDARD.md`, `registries/CAMERA_VIEW_PRESET_REGISTRY.json`
- `registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json`
- `verification/specifications/TRANSFORM_TEST_SPEC.md`
- `verification/known_failures/TF-FAIL-001_QUATERNION_MATRIX_MISMATCH.md`
- `verification/results/PENDING_IMPLEMENTATION.md`, `TRANSFORM_TEST_RESULTS.json`
- `schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json`, `schemas/claim/*` modular schemas
- `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V4_PROPOSAL.json`
- `registries/UNIT_REGISTRY_V3_COMPLETE_PROPOSAL.json`
- `FORMULA_STANDARD_V2_PROPOSAL.md`

### Changed

- Corrected glTF quaternion to `[-0.5, 0.5, 0.5, 0.5]` (TF-FAIL-001)
- V3 transform registry SUPERSEDED; THREE_SCENE_FRAME DEPRECATED
- Measurement uncertainty classes marked provisional targets
- **DT-D010** registered

### Status

- Readiness: **L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY**
- Transform validation: **NOT_EXECUTED** (no fabricated passes)

## 2026-07-16 (L00 Spec Freeze + L01 Research Plan)

### Added

- `registries/UNIT_REGISTRY_V3_CORE_PROPOSAL.json` — SI bases with electric current
- `schemas/claim/claim-types.schema.json` — expanded claim types
- `layers/L01_RESEARCH_DOSSIER_PLAN.md` — footprint-first research sequence
- Camera presets v1.1.0 — dynamic bounding-relative parameters

### Changed

- Quaternion report cleaned; debug traces only in known-failures
- Intake V4 — VIN oneOf + evidence-bound certification fields
- Claim value schema — multi-format representations
- Test spec — provisional profile targets (MATH_FLOAT64_STRICT, etc.)
- **DT-D011** — L00 freeze; L01 research planning authorized

### Status

- Readiness: **L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY**
- L01 research planning: **AUTHORIZED**
- L01 geometry: **BLOCKED**
- Next: footprint/envelope dimensional mappings

## 2026-07-16 (L1 Exterior Visual Reference Research Foundation)

### Added

- `layers/L01/` complete research package:
  - research plan, object hierarchy, object/landmark registry proposals
  - reference view matrix, photo/scan coverage plan
  - body/wheel/glass/material dossiers
  - geometry vs normal/texture matrix, visual acceptance standard
  - open questions, gap analysis, package README
- **DT-D012** — L1 exterior research foundation accepted

### Changed

- Active layer → L01 (research_in_progress; geometry blocked)
- `layers/L01_EXTERIOR.md` — research active stub
- `layers/L01_RESEARCH_DOSSIER_PLAN.md` — foundation package marked complete (DRAFT)
- STATUS readiness banner → **L1_EXTERIOR_RESEARCH_FOUNDATION_READY**
- L00 readiness retained as `l00_readiness` field

### Status

- Readiness: **L1_EXTERIOR_RESEARCH_FOUNDATION_READY**
- L01 geometry: **BLOCKED**
- Next: Tier 1 source archive + footprint/envelope claim extraction

## 2026-07-16 (L1 Adversarial Audit — Factual Verification Required)

### Added

- `layers/L01/L1_ADVERSARIAL_SOURCE_AUDIT.md`
- `layers/L01/L1_CLAIM_REGISTER_PROPOSAL.json` (CLM-001…015)
- `layers/L01/L1_CONFIGURATION_CONFLICT_REGISTER.json` (CNF-001, CNF-002)
- `layers/L01/L1_EXTERIOR_OBJECT_HIERARCHY_V2_PROPOSAL.md`
- `layers/L01/L1_EXTERIOR_OBJECT_REGISTRY_V2_PROPOSAL.json`
- `layers/L01/L1_LANDMARK_CLASSIFICATION_STANDARD.md`
- `layers/L01/L1_LANDMARK_REGISTRY_V2_PROPOSAL.json`
- `layers/L01/L1_CAPTURE_COVERAGE_GRID_PROPOSAL.json`
- `layers/L01/L1_MATERIAL_PBR_CORRECTION.md`
- `layers/L01/L1_VISUAL_ACCEPTANCE_STANDARD_V2_PROPOSAL.md`
- `layers/L01/L1_FINAL_GAP_REPORT.md`
- **DT-D013** — adversarial audit; factual verification gate

### Changed

- Frame powdercoat metalness corrected to **0.0** (dielectric)
- V1 object/landmark registries and acceptance standard marked SUPERSEDED
- Hub ornament landmark reclassed as `VISUAL_POSE_LANDMARK`
- Front axle humility: `CONFIGURATION_UNRESOLVED` (OPEN_MONITORING)
- STATUS: draft complete / factual verification / requires more reference data

### Status

- Status: **L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE**
- Phase: **L1_FACTUAL_VERIFICATION_REQUIRED**
- Gate: **L1_REQUIRES_MORE_REFERENCE_DATA**
- L01 geometry: **BLOCKED**

## 2026-07-16 (L1 Reference Acquisition Queue — Source Access Block)

### Added

- `layers/L01/L1_REFERENCE_ACQUISITION_QUEUE.md`
- `layers/L01/L1_SOURCE_ARTIFACT_REGISTRY_PROPOSAL.json` (SRC-L1-001…003)
- `layers/L01/L1_OEM_DOCUMENT_EXTRACTION_PLAN.md` (EXT-L1-101…105)
- `layers/L01/L1_REQUIRED_PHOTO_SHOT_LIST.md`
- `layers/L01/L1_PUBLIC_REFERENCE_IMAGE_MANIFEST_PROPOSAL.json`
- `layers/L01/L1_PHYSICAL_VEHICLE_SELECTION_CHECKLIST.md`
- `layers/L01/L1_PHYSICAL_MEASUREMENT_CHECKLIST.md`
- `layers/L01/L1_EVIDENCE_GAP_PRIORITY_MATRIX.json` (GAP-L1-001…004)
- `layers/L01/L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md`
- `research/sources/README.md`, `research/reference_images/README.md`
- **DT-D014** — acquisition queue; `L1_BLOCKED_BY_SOURCE_ACCESS`

### Changed

- Primary gate → **L1_BLOCKED_BY_SOURCE_ACCESS** (evidence gate retained)
- Final gap report links acquisition/closure track

### Status

- Status: **L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE**
- Phase: **L1_FACTUAL_VERIFICATION_REQUIRED**
- Access gate: **L1_BLOCKED_BY_SOURCE_ACCESS**
- Evidence gate: **L1_REQUIRES_MORE_REFERENCE_DATA**
- L01 geometry: **BLOCKED**

## 2026-07-16 (L1 Empirical Acquisition Schema Alignment)

### Added

- `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` (empty locators)
- `L1_STRUCTURAL_MEASUREMENT_DEFINITIONS.md`
- `L1_MEASUREMENT_UNCERTAINTY_FRAMEWORK.json`
- `L1_SCAN_PRIORITY_SEQUENCE.md`
- `L1_SOURCE_BASELINE_CLOSURE_RULES.json`
- **DT-D015** — strip placeholders; modular closure; GRADE-A/B/C

### Changed

- Source registry: null metadata + `NOT_ACQUIRED` (no invented pub numbers)
- Extraction plan: keyword hunts only (no page coordinates)
- Vehicle selection: grade framework; VIN rules `DOCUMENT_VERIFICATION_REQUIRED`
- Measurement checklist: separated track vs overall tire width vs hub flange distance
- Shot list: perspective/lens standards; orthographic wording removed
- Closure criteria: claim-specific modular rules; acquisition activity READY

### Status

- Access gate: **L1_BLOCKED_BY_SOURCE_ACCESS**
- Acquisition activity: **READY**
- L01 geometry: **BLOCKED**

## 2026-07-16 (L1 Source Pack 01 Engaged)

### Added

- `L1_SOURCE_ARTIFACT_REGISTRY.json` — SRC-L1-001…003 verified metadata + SHA-256
- `L1_CLAIM_REGISTER_UPDATED.json` — CLM-L1-001…005
- `L1_UNVERIFIED_VALUES_REGISTER.json` — UNV-L1-001…003
- `L1_PUBLIC_REFERENCE_IMAGE_MANIFEST.json` — REF-PUB staged harvests
- `L1_SOURCE_PACK_01_REPORT.md`
- Populated `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json` (EXT-L1-101…105)
- **DT-D016** — Source Pack 01; geometry freeze still blocked

### Changed

- Document gate → **L1_DOCUMENT_ACQUISITION_READY**
- Public search → **L1_PUBLIC_REFERENCE_SEARCH_READY**
- Modeling baseline → **NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE**
- Front axle → DOCUMENT_SUPPORTED monobeam (physical PENDING)
- Gap/conflict registers updated; measurement checklist OEM targets filled from extractions
- Proposal source/manifest registries marked superseded

### Status

- Milestone: **L1_SOURCE_PACK_01**
- Modeling baseline: **NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE**
- L01 geometry: **BLOCKED**

## 2026-07-16 (L1 Source Pack 01 Authenticity Reset)

### Added

- `L1_SOURCE_ARTIFACT_FILE_MANIFEST.json` — file_exists false; hash NOT_EXECUTED
- `L1_PAGE_EVIDENCE_MANIFEST.json` — excerpts/pages null
- `L1_EXTRACTION_RESULTS_VERIFICATION.json` — candidate analytical statuses
- `L1_SOURCE_PACK_01_CORRECTION_LOG.md`
- `L1_SOURCE_PACK_01_AUTHENTICITY_AUDIT.md`
- `L1_PARALLEL_LANES.md` — Lane A/B authorized
- `resources/sources/README.md`
- **DT-D017** — reset to candidate templates

### Changed

- Source pack verdict → **L1_SOURCE_PACK_01_NOT_VERIFIED**
- Voided prior SHA-256 / page quote / DOCUMENT_SUPPORTED promotions
- Claims demoted; gaps reopened; measurement OEM targets blanked to candidates
- Unverified material params deferred to L2

### Status

- Source pack: **L1_SOURCE_PACK_01_NOT_VERIFIED**
- Parallel lanes: **AUTHORIZED**
- Modeling baseline: **NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE**
- L01 geometry: **BLOCKED**

## 2026-07-16 (EDTS Research Protocol Active — Teams A–D)

### Added

- `EDTS_RESEARCH_PROTOCOL.md` v1.0.0 — master evidence taxonomy + Hard Rules 1–10
- `layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json` — weighted confidence engine
- `layers/L01/L1_PARALLEL_TEAMS.md` — Teams A/B/C/D sprint board
- `layers/L01/L1_ASSET_EVALUATION_ASSET-00031.md` — Grade B efficiency evaluation
- `layers/L01/L1_SOURCE_VISUAL_ARCHITECTURE_REGISTRY.json` — SRC-L1-004/005
- **DT-D018** — protocol activation

### Changed

- `AGENTS.md` — protocol first in read order; Hard Rule bindings
- Phase → `EDTS_RESEARCH_PROTOCOL_ACTIVE`
- Teams A–D marked active; Team C provisional-only

### Status

- Research protocol: **ACTIVE**
- Source pack: **NOT_VERIFIED**
- ASSET-00031: **Grade B candidate**
- Geometry freeze: **NOT_YET_APPROVED**

## 2026-07-16 (EDTS-OS v3 — Component First)

### Added

- `EDTS_OS.md` v3.0.0 — operating system constitution (Hard Rule 0)
- `EDTS_OS_PLATFORM_CONFIGURATOR.md` — multi-platform reuse roadmap
- `schemas/evidence-graph.schema.json` — Evidence Graph schema
- `schemas/component-passport.schema.json` — Component Passport schema
- `layers/L01/L1_EVIDENCE_GRAPH.json` — operational honest graph + illustrative template appendix
- `components/` — `CMP-SD-044-L`, `CMP-AXL-M300`, `CMP-FR-145` draft passports
- `configurations/VEH_CFG_F450_2019_REG_CAB_145_3.json` — ephemeral vehicle assembly pointer
- **DT-D019** — EDTS-OS v3 activation

### Changed

- `EDTS_RESEARCH_PROTOCOL.md` → **v2.0.0** (Hard Rule 0; confidence % deprecated; expanded lifecycle)
- `L1_PARAMETER_VERIFICATION_DATABASE.json` → legacy bridge; confidence fields deprecated
- `L1_PARALLEL_TEAMS.md` → V3 sprint board (passport + graph stages)
- `AGENTS.md` — OS-first read order; Evidence Graph bindings
- Phase → `EDTS_OS_V3_ACTIVE`

### Status

- Architecture: **EDTS-OS v3 ACTIVE**
- Confidence %: **DEPRECATED**
- Evidence Graph: **OPERATIONAL_HONEST** (OEM edges AWAITING_FILE)
- Component passports: **DRAFT_CANDIDATE**
- Geometry freeze: **NOT_YET_APPROVED**

## 2026-07-16 (EDTS-OS Platform Blueprint + Identity Master Schema)

### Added

- `EDTS_OS_ARCHITECTURE_BLUEPRINT.md` — Engine vs Data; universal subsystems catalog
- `EDTS_OS_IMPLEMENTATION_ROADMAP.md` — phases P1–P6 with honest progress
- `schemas/edts-os-platform-master.schema.json` — platform master (identity + versioning first)
- `schemas/component-identity.schema.json` — `CMP-{FAMILY}-{TOKEN}[-{QUALIFIER}]` grammar
- `registries/COMPONENT_IDENTITY_REGISTRY.json` — allocated IDs + aliases
- `registries/EDTS_OS_PLATFORM_INSTANCE.json` — live subsystem/phase instance
- `components/CMP_SD_FRAME_001.json` — canonical Super Duty chassis-cab frame family
- **DT-D020** — blueprint + master schema activation

### Changed

- `CMP-FR-145` → **deprecated alias** of `CMP-SD-FRAME-001`
- F-450 config frame slot uses family ID + `VAR-145_3-WB-60-CA` variant pin
- `AGENTS.md` / `EDTS_OS.md` — blueprint + identity allocation rules
- Phase → `EDTS_OS_PLATFORM_BLUEPRINT_ACTIVE`

### Status

- Mindset: **factory (platform), not single truck**
- P1/P2: **SEEDED** (not COMPLETE)
- P4: **IN_PROGRESS**
- P3/P5/P6: **PLANNED**
- Geometry freeze: **NOT_YET_APPROVED**

## 2026-07-16 (EDTS Kernel Vertical Slice — F-450 FL Door)

### Added

- `kernel/EDTS_KERNEL_SCOPE.md` — Minimum Viable Kernel
- `kernel/F450_DOOR_FL_VERTICAL_SLICE_PLAN.md`
- `kernel/F450_DOOR_FL_ACCEPTANCE_TESTS.md` — T01–T05
- `kernel/KERNEL_OPEN_QUESTIONS.md` / `KERNEL_DEFERRED_FEATURES.md`
- `schemas/kernel/*` — six composable schemas + passport minimum (v1.0.0)
- `kernel/instances/f450_door_fl/*` — door slice instances
- **EVL-00001** first evidence link → `SRC-ASSET-00031` SUPPORTS_GEOMETRY CANDIDATE
- **EVL-00002** BBAS stub AWAITING_FILE
- **DT-D021**

### Changed

- Canonical door ID → `CMP-FORD-SD-DOOR-FL-001` (`CMP-SD-044-L` alias)
- Phase → `EDTS_KERNEL_VERTICAL_SLICE_READY`

### Status

- Kernel: **VERTICAL_SLICE_READY**
- T01/T02: **PASS_SCHEMA**
- T03–T05: **NOT_EXECUTED**
- Geometry freeze: **NOT_YET_APPROVED**

## 2026-07-16 (Exact-Vehicle Isolation Kernel)

### Added

- Draft 2020-12 universal schemas: entity/vehicle/config/component-instance/reusable/evidence/geometry/assembly/interaction/passport/cross-vehicle-comparison
- `examples/2019_f450/*` exact-vehicle records (`VEH-000001`, `CFG-000001`, `CMPINST-VEH000001-DOOR-FL`)
- `documentation/EXACT_VEHICLE_ISOLATION_STANDARD.md` and related isolation docs
- **DT-D022**

### Changed

- Prior year-range door applicability **superseded**
- OS passport schema renamed to `component-passport-os-v1.schema.json`
- Phase → `EDTS_EXACT_VEHICLE_KERNEL_READY`

### Status

- Exact-vehicle kernel: **READY**
- Interaction: **VISUAL_PREVIEW_ONLY** (runtime NOT_EXECUTED)
- Evidence links: **empty** (no invented source IDs)

## 2026-07-16 (Constitutional HR-EVI — Universal Exact Vehicle Kernel)

### Added

- `documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md` — constitutional law
- Architecture docs: configuration identity, evidence linkage, component instance, validation rules, universal acceptance tests
- `verification/isolation/` negative isolation suite (9/9 pass)
- OEM dataset scaffolds: Tesla / Toyota / Chevrolet
- **DT-D023**

### Changed

- Seed dataset path → `examples/ford/2019_f450_regularcab_4x2_drw/`
- Protocol v2.1.0; EDTS-OS v3.1.0 — Hard Rule 0 sharing clarified as non-automatic
- Phase → `EDTS_UNIVERSAL_EXACT_VEHICLE_KERNEL_READY`

### Status

- HR-EVI: **CONSTITUTIONAL**
- Isolation tests: **PASS**
- Kernel: universal; datasets: isolated
