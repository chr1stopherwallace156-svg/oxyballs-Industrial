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
