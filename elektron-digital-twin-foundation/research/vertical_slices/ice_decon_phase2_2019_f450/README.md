# ICE Decon Phase 2 — Lower Chassis & Fluidic Purge (DEFERRED)

**Mission:** `MISN-000005` (Mission E) — **still deferred**  
**Decision:** `DT-D055` · **Sprint:** `RL-024`  
**Operator label:** `EV-DECON-PHASE2`  
**CFGCOMP root (candidate):** `CFGCOMP-2019-F450-RC-4X2-60CA-DRW-THERMAL-FUEL-DECON`

## Verdict

This phase is **registered as a deferred conversion-intent trace**, not an authorized teardown procedure.

| Class | Result |
|---|---|
| MUST_REMOVE / RETAIN rules | **CONVERSION_INTENT_CANDIDATE** only |
| Frame width 34.2 in / aft fuel 40 gal | **ASSERTION_EXTRACTED** (fleet PDF) where cited correctly |
| Radiator envelope “38.3 × 30 × 8 in” | **REJECTED** — 38.3 in is front overhang (code B), not radiator bay size |
| M8 / M10 / M12 / torque / hanger counts | **REJECTED** — WSM not acquired |
| Knowledge graph “complete” | **REJECTED** — candidate stubs only |
| Mission E execution | **NOT authorized** |

## Option choice

- **Option 1 (Mission F):** Already opened as `MISN-000006` (DT-D054) — not re-initiated  
- **Option 2:** **SELECTED** — consolidated MEPQ export at [`../../mepq/exports/MEPQ_ACTIVE_CHECKLIST.md`](../../mepq/exports/MEPQ_ACTIVE_CHECKLIST.md)

## Artifacts

| File | Role |
|---|---|
| [`OPERATOR_CLAIM_SCRUB.json`](OPERATOR_CLAIM_SCRUB.json) | Honesty demotions |
| [`DECON_INTENT_MATRIX.json`](DECON_INTENT_MATRIX.json) | Candidate remove/retain matrix |
| [`STRUCTURAL_NODES.json`](STRUCTURAL_NODES.json) | Candidate COMPDEF/CFGCOMP stubs |
