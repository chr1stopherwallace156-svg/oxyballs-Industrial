# UNMERGED_TRUTH_CONFLICTS.md

**Context:** Merge of `origin/main` (`675e48a` — AJR / Asset Intelligence #3) into branch `cursor/reference-lock-l00-d881` (`6aee8e6` — DT-D067 VIN resolver).  
**Status:** Merge was **aborted** after simple conflicts were resolved, so the working tree is clean. These nine files remain **decision-required** before a clean merge to `main`.

## Why these are not “simple”

They are **same-entity truth fights**: both sides wrote different authoritative values for the same IDs/keys. Union-by-append would invent a false combined history.

## The nine files

| # | Path | Ours (feature branch) | Theirs (`main` / #3) | Conflict type |
|---:|---|---|---|---|
| 1 | `STATUS.json` | v**0.41.0**; next = P0 GLB; VIN shipped; Monobeam `ASSERTION_EXTRACTED`; gates through DT-D067 | v**0.17.0**; next = AJR URL hunt; front axle `PRIMARY_SOURCE_REQUIRED`; stops ~RL-012 | Project authority / next action |
| 2 | `PROJECT_STATE.md` | VPR-2 / GLB / audit / VIN narrative | AJR / Hard Rules 13–17 / CONTINUE_RESEARCH | Human status rewrite |
| 3 | `layers/L01/L1_CONFIGURATION_CONFLICT_REGISTER.json` | CNF-001 **PARTIALLY_RESOLVED** (series Monobeam) | CNF-001 still **OPEN** | Conflict resolution claim |
| 4 | `layers/L01/L1_OPEN_QUESTIONS.md` | Q3 partially resolved | Q3 still OPEN | Same question, opposite posture |
| 5 | `research/asset_intelligence/ASSET_INTELLIGENCE_REGISTER.json` | v1.3; AID-000011 **REJECTED_INPUT** | v1.1; AID-000011 **VISUAL_CANDIDATE** | Register role / version |
| 6 | `research/asset_intelligence/passports/AID-000009.json` | Rejected operator-acquired path; RL-013 narrative | Older DISCOVERED / leaner scores | Passport claim state |
| 7 | `research/asset_intelligence/passports/AID-000011.json` | **HOLD_REJECTED** / paid Hum3D reject | Still **VISUAL_CANDIDATE** | Purchase / rejection posture |
| 8 | `research/src_candidates/SRC-CAND-000001.json` | **ACQUIRED** + hashed PDF path/URL | **NOT_ACQUIRED** | Acquisition truth |
| 9 | `research/src_candidates/SRC_CANDIDATE_REGISTER.json` | Architecture extracted; candidates through 000011 | Older RESEARCH_REQUIRED; next_id 000008 | Register + architecture status |

## Simple conflicts already resolved (for reference)

Kept **ours** (append / schema extension / strict superset):

- `DECISIONS.md` (DT-D044–D067)
- `research/RESEARCH_LOG.md` (RL-013–RL-036)
- `EDTS_RESEARCH_PROTOCOL.md` (newer protocol)
- `schemas/acquisition-justification-report.schema.json` (`HOLD_REJECTED`)
- `ajr/AJR_REGISTER.json`, `ajr/AJR-000001.json`
- `src_candidates/SRC-CAND-000006.json` (formatting)

`CHANGELOG.md` auto-merged cleanly.

## Recommended resolution (needs human confirm)

Because this branch already continued the AJR line through DT-D067, the usual successor choice is **take ours** on all nine, then spot-check that no unique `main`-only fields are lost (AJR register already kept ours as superset).

Do **not** mark geometry or configuration `CONFIGURATION_CONFIRMED` as a side effect of merging.

## How to reproduce the conflicted merge

```bash
git fetch origin main
git checkout cursor/reference-lock-l00-d881
git merge origin/main
# resolve or abort
```
