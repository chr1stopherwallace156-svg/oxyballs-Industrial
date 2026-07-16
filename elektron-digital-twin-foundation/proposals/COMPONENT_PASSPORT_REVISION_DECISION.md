# COMPONENT_PASSPORT_REVISION_DECISION

**Date:** 2026-07-16  
**Decision ID:** DT-D031  
**Executed validation:** `verification/results/component-passport-rc1-validation.json`

## Decisions

| Topic | Verdict |
|---|---|
| Passport-as-index principle | **ACCEPTED** |
| Frozen rc1 schema (`edts-kernel-v1.0.0-rc1`) | **ACCEPTED — do not alter** |
| Relationship separation (not CAD-inferred) | **ACCEPTED** (see relationship separation proposal) |
| Draft initial passport with non-rc1 fields | **REJECTED** (validation demonstrated FAIL) |
| Abbreviated fingerprint `sha256:d84f86f3...` | **REJECTED** |
| Active example fingerprint | **ACCEPTED** — full CFG-000001 value |
| v1.1 `allOf` extension over `additionalProperties:false` | **REQUIRES REVISION** (do not assume inheritance) |
| v1.1 activation now | **NOT JUSTIFIED** |

## Status labels

- Final: **`COMPONENT_PASSPORT_RC1_SUFFICIENT`**
- v1.1 parked as: `OPTIONAL_FUTURE_PROPOSAL` · `NOT_ACTIVATED` · `EMPIRICAL_TRIGGER_REQUIRED`

Do **not** use `COMPONENT_PASSPORT_V1_1_PROPOSAL_REQUIRED` — that implies rc1 is insufficient, which the executed audit contradicts.

## Rationale

rc1 already separates index/summary (`links.*_ids`, `status_summary`) from authoritative registries.  
Candidate assets stay in the Lane A catalog.  
Blocked geometry is represented by empty `geometry_asset_ids` and project/door-slice status — not by inventing passport fields.

## Reopen trigger

Only if a real acquired/parsed/inventoried geometry workflow exposes a **blocking defect** that rc1 cannot represent. Speculative role maps are not a trigger.
