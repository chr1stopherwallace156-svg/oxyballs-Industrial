# RL-013 — Component Sourcing Passports + Knowledge Gaps + Hum3D AJR

**Date:** 2026-07-19  
**Decision:** `DT-D044`  
**Recommended decision:** `CONTINUE_RESEARCH` (focus **KG-001**)

## Honesty gate

| Operator claim | Project posture |
|---|---|
| Maturity 62%/82%/65%/47% / channel 100% bars | **RESEARCH_DRAFT_ESTIMATE** only — not verified saturation |
| AID-COMP-02 `ACQUIRED → PARSED` | **REJECTED** — no local STEP/sha256 → `NOT_ACQUIRED` |
| Exact Config Match = Yes (M300) | **REJECTED** → conditional / `UNKNOWN` |
| Supplier docs / parts lookup 100% | **REJECTED_WITHOUT_BYTES** |
| Hum3D $79 purchase | **AJR-000003 `HOLD_REJECTED`** |

## Delivered

| Artifact | Path |
|---|---|
| CSP register + passports | `research/component_sourcing/` (`CSP-000001..000003`) |
| Knowledge gaps | `research/knowledge_gaps/` (`KG-001`, `KG-002`) |
| Media candidate | `research/media_candidates/MEDIA-000001.json` |
| AJR Hum3D reject | `research/asset_intelligence/ajr/AJR-000003.json` |

## Alias map

| Operator ID | Machine ID |
|---|---|
| AID-COMP-01 | `CSP-000001` / asset `AID-000011` |
| AID-COMP-02 | `CSP-000002` / asset `AID-000009` |
| AID-COMP-03 | `CSP-000003` (harness — critical gap) |
| AJR-001 | `AJR-000003` |

## KG-001 focus

Door harness `HC3Z-14631-A` routing/clips. Next: EWD (`SRC-CAND-000006`), MEDIA-000001 frame review, salvage photos — **before** authorizing physical laser scan.

## Risks retained

- Outer-skin F-150 crossover ≠ inner harness / 22-pin mirror mounts  
- Wire routing blind spot remains critical for kinematic interference checks
