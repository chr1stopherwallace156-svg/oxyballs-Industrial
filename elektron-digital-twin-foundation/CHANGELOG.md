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
