# COMPONENT_PASSPORT_REVISION_DECISION

**Date:** 2026-07-16  
**Decision IDs:** `DT-D030`, `DT-D031`, `DT-D033`, `DT-D034`, `DT-D035`  
**Change-control records:** `decisions/DT-D030_*.json` … `DT-D035_*.json`

## Passport (rc1)

| Topic | Verdict |
|---|---|
| Passport-as-index principle | **ACCEPTED** |
| Frozen rc1 `component-passport.schema.json` | **UNCHANGED / SUFFICIENT** |
| Role-based geometry mapping / event-stream projection in active schema | **NOT REQUIRED NOW** |
| New structural proposals | **ARCHIVED under `proposals/` only** |
| Final passport label | **`COMPONENT_PASSPORT_RC1_SUFFICIENT`** |

## EAE (aligned with readiness report)

| Topic | Verdict |
|---|---|
| EAE specification | **ACCEPTED** |
| Full EAE executable implementation | **ABSENT** (pending) |
| EAE CORE INGESTION (local accept/hash/manifest/idempotency) | **`VALIDATED`** (`EDTS_EAE_CORE_INGESTION_VALIDATED`) |
| Full EAE / marketplace acquisition | **ABSENT** |
| Automated acquire/parse/score of CAND-00031 / CAND-771 | **NOT EXECUTED** (candidates remain NOT_ACQUIRED) |
| Rubric profiles | **DRAFT** (not activated) |
| Event model | **OPTIONAL PROPOSAL** (parked) |
| Door vertical slice | **BLOCKED_BY_MISSING_ASSET** |
| EAE readiness status | **`EDTS_EAE_CORE_INGESTION_VALIDATED`** (core only; full product still pending) |

## Rules

1. Do not mutate frozen rc1 for speculative geometry roles or event streams.
2. Do not treat “specification exists” as “working engine exists.”
3. Do not score or create `GEO-*` records for unacquired candidates.
4. CORE INGESTION v0 is validated; next increment is **archive-safe acquisition + metadata**, not scoring.
