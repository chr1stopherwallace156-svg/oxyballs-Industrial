# Physical Acquisition Plan — Sprint 7 Template

**Status:** `TEMPLATE_ONLY` — not executed  
**Triggered when:** Research Saturation declared for a subsystem (public digital evidence exhausted)  
**Decision reference:** `DT-D049`  
**Does not authorize:** Invented scan hashes, teardown photos, or geometry promotion

## Purpose

Spend physical scanning / teardown resources **only** where the research execution pipeline has exhausted public digital evidence and recorded explicit gaps (`UNRESOLVED_SOURCE_REQUIRED`, `CANDIDATE_UNVERIFIED`, open `KG-*`).

## Entry criteria (all required)

1. Scope Lock active on exact `configuration_id` / `CFGCOMP-*` set.
2. Public discovery lanes for the subsystem marked saturated (estimate or measured coverage — say which).
3. Open knowledge gaps listed with property keys (geometry cavity, harness routing, wall thickness, etc.).
4. No pending `SOURCE_DISCOVERED` commercial manuals that purchasing could still convert to `SOURCE_ACQUIRED`.

## Plan fields (fill per subsystem)

| Field | Value |
|---|---|
| `subsystem_id` | e.g. FL door inner cavity |
| `configuration_id` | `CFG-2019-F450-REG-CAB-4X2-60CA-DRW` / kernel `CFG-000001` |
| `open_kg_ids` | `KG-…` |
| `acquisition_methods` | photogrammetry / lidar / manual measure / teardown |
| `target_outputs` | hashed scan package, measurement sheet, photos |
| `promotes_to` | `SOURCE_ACQUIRED` → parse → EGS claims / passport links |
| `procedure_generation` | remains `NOT_AUTHORIZED` until `ASSERTION_VERIFIED` |

## Exit criteria

- Bytes hashed and inventoried under Evidence Acquisition Engine rules.
- New claims attached with evidence assertion IDs; no silent fill of missing torque/routing.
- Updated evidence coverage matrix counts (acquired/required) — not narrative “complete.”

## Current F-450 posture

Sprint 7 **not started**. Door FL geometry remains `ABSENT`. EWD/WSM still `NOT_ACQUIRED` (`MISN-000001`).
