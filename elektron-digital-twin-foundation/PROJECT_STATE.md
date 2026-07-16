# EDTS Project State

**Updated:** 2026-07-16  
**Authoritative machine form:** `STATUS.json`

| Concern | Status |
|---|---|
| Kernel | `VALIDATED AND FROZEN` (`EDTS_EXACT_VEHICLE_KERNEL_VALIDATED` · tag `edts-kernel-v1.0.0-rc1` · `SCHEMA_FREEZE_FOR_VERTICAL_SLICE`) |
| Component Passport rc1 | `ACTIVE` (`COMPONENT_PASSPORT_RC1_SUFFICIENT`) |
| Component Passport v1.1 | `OPTIONAL PROPOSAL` |
| Door component identity | `ACTIVE` (`CMPINST-VEH000001-DOOR-FL`) |
| Door candidates | `DISCOVERED / NOT ACQUIRED` (`CAND-00031-CGT`, `CAND-771-GRAB`) |
| Door geometry | `ABSENT` |
| Door interaction | `ABSENT` |
| Vertical slice | `BLOCKED_BY_MISSING_ASSET` |
| Current posture | `EVIDENCE_ACQUISITION_IN_PROGRESS` |

## Active vs proposal separation

| Layer | Path | Authority |
|---|---|---|
| Active rc1 passport schema | `schemas/component-passport.schema.json` | Frozen |
| Active door passport instance | `examples/2019_f450/door-fl-component-passport.example.json` | Active silo example |
| v1.1 illustrative | `proposals/examples/` | `ILLUSTRATIVE_ONLY` / `runtime_eligible: false` |
| Evidence Acquisition Engine | `tools/evidence_acquisition/` | Operational (not a kernel schema) |

## Latest evidence engine run

Both door candidates: **`BLOCKED_BY_MISSING_SOURCE_URL`**  
Report: `verification/results/EVIDENCE_ACQUISITION_ENGINE_REPORT.md`  
Decision: `decisions/DT-D032_EVIDENCE_ACQUISITION_ENGINE.json`

## Change-control records

- `decisions/DT-D030_COMPONENT_PASSPORT_V1_1_PROPOSAL_ONLY.json`
- `decisions/DT-D031_COMPONENT_PASSPORT_RC1_SUFFICIENT.json`
- `decisions/DT-D032_EVIDENCE_ACQUISITION_ENGINE.json`
