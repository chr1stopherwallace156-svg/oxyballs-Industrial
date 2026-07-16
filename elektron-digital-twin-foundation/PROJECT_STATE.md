# EDTS Project State

**Updated:** 2026-07-16  
**Authoritative machine form:** `STATUS.json`

| Concern | Status |
|---|---|
| Kernel | `VALIDATED AND FROZEN` (`EDTS_EXACT_VEHICLE_KERNEL_VALIDATED` · tag `edts-kernel-v1.0.0-rc1` · `SCHEMA_FREEZE_FOR_VERTICAL_SLICE`) |
| Component Passport rc1 | `ACTIVE` (`schemas/component-passport.schema.json` · `COMPONENT_PASSPORT_RC1_SUFFICIENT`) |
| Component Passport v1.1 | `OPTIONAL PROPOSAL` (`NOT_ACTIVATED` · `EMPIRICAL_TRIGGER_REQUIRED`) |
| Door component identity | `ACTIVE` (`CMPINST-VEH000001-DOOR-FL` · `PP-VEH000001-DOOR-FL-001`) |
| Door candidates | `DISCOVERED / NOT ACQUIRED` (`CAND-00031-CGT`, `CAND-771-GRAB` in Lane A catalog) |
| Door geometry | `ABSENT` |
| Door interaction | `ABSENT` |
| Vertical slice | `BLOCKED_BY_MISSING_ASSET` |

## Active vs proposal separation

| Layer | Path | Authority |
|---|---|---|
| Active rc1 passport schema | `schemas/component-passport.schema.json` | Frozen / runtime-eligible schema |
| Active door passport instance | `examples/2019_f450/door-fl-component-passport.example.json` | Active silo example |
| v1.1 schema draft | `proposals/component-passport-v1.1.schema.json` | Proposal only |
| v1.1 illustrative instance | `proposals/examples/` | `authority_status: ILLUSTRATIVE_ONLY`, `runtime_eligible: false` |

## Change-control records

- `decisions/DT-D030_COMPONENT_PASSPORT_V1_1_PROPOSAL_ONLY.json`
- `decisions/DT-D031_COMPONENT_PASSPORT_RC1_SUFFICIENT.json`
- Narrative index: `DECISIONS.md`
