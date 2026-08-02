# RL-016 — EGS-v1 proposal module (CMPINST graph)

**Date:** 2026-07-20  
**Decision:** `DT-D047`  
**Recommended decision:** `PROPOSAL_MODULE_ACTIVE`

## Honesty gate

| Claim | Project posture |
|---|---|
| F-450 torque / fastener / connector / removal values | **Not populated** — no verified OEM bytes |
| Sample edge lifecycle | **`CANDIDATE_UNVERIFIED`** until primary evidence |
| Draft door subcomponent CMPINST IDs | **Research placeholders** (except `CMPINST-VEH000001-DOOR-FL`) |
| Kernel `assembly-relationship` | **Frozen / untouched** |
| Research `REL-00000N` EDTS-COMP edges | **ILLUSTRATIVE history** — superseded for implementation |

## Delivered

| Artifact | Path |
|---|---|
| Proposal README | `proposals/egs-v1/README.md` |
| Edge schema | `proposals/egs-v1/schema/relationship-edge.schema.json` |
| Validate + graph API | `proposals/egs-v1/egs_v1/` |
| Synthetic fixtures | `proposals/egs-v1/fixtures/` |
| F-450 candidate sample | `proposals/egs-v1/samples/f450_fl_door_edges_candidate_unverified.json` |
| Unit tests | `tests/egs_v1/` (17 passed) |

## Graph queries

direct neighbors · dependency traversal · impacted-component traversal · cycle detection · topological ordering · `BLOCKS_REMOVAL_OF` helpers

## Parallel priority

`MISN-000001` (EWD / KG-001) remains the critical open acquisition mission. Do not promote candidate edges without hashed OEM pages.
