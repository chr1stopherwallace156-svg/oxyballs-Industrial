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
