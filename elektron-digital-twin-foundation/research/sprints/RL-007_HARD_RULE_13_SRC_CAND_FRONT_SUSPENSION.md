# RL-007 — Hard Rule 13 + SRC-CAND front suspension hunt

**Date:** 2026-07-16  
**Decisions:** `DT-D037` (still `PRIMARY_SOURCE_REQUIRED`) · `DT-D038` (Hard Rule 13 / SRC-CAND / RC)  
**Target:** Front suspension geometry — locked 2019 F-450 Chassis Cab 4x2 DRW 145.3/60 only  
**Research engine status:** `OPERATIONAL`  
**Geometry extraction:** **FORBIDDEN** until primary OEM source acquired and applicability verified

## Baseline

| Field | Value |
|---|---|
| Config | 2019 Ford F-450 Chassis Cab · 4x2 · DRW · 145.3 in WB · 60 in CA |
| IDs | `VEH-000001` / `CFG-000001` |
| Architecture | **`RESEARCH_REQUIRED`** (contradictory secondary reports; no decision) |
| Axle / steering / mounts | **`NOT_ACQUIRED`** |

## Hard Rule 13 adoption

Discovering `SRC-CAND-000001` (BBAS) **does not close** the lane. It triggers parallel tasks: service (`SRC-CAND-000002`), parts (`SRC-CAND-000003`), visual (`LANE_VIS`).

## Candidate records (immutable IDs)

| Candidate ID | Title | Source type | RC | Access |
|---|---|---|---|---|
| `SRC-CAND-000001` | 2019 Super Duty Chassis Cab BBAS Guide | OEM BBAS | 85% | NOT_ACQUIRED |
| `SRC-CAND-000002` | 2019 F-Super Duty Workshop Manual | OEM Service | 90% | NOT_ACQUIRED |
| `SRC-CAND-000003` | 2019 F-450 Parts Catalog (Front Axle) | OEM Parts | 75% | NOT_ACQUIRED |

RC = Research Confidence (hunt priority) with Reasoning Log — **not** verified engineering confidence.

## Next Search Queue

| Priority | Task | Lane | Expected evidence |
|---|---|---|---|
| 1 | Locate/Acquire `SRC-CAND-000001` | `LANE_A_DOC` | Axle/frame mounting diagrams |
| 2 | Locate `SRC-CAND-000002` | `LANE_A_DOC` / `LANE_SVC` | Steering topology / alignment |
| 3 | Cross-reference `SRC-CAND-000003` | `LANE_PRT` | Knuckle / radius-arm PNs (VIN-filtered) |
| 4 | Initiate visual teardown refs | `LANE_VIS` | Photo/video of exact 4x2 front end |

Authoritative machine queue: `research/src_candidates/SRC_CANDIDATE_REGISTER.json`.

## Risks

- Marketplace mislabel 4x2↔4x4 → driven-axle contamination  
- Mitigation: VIN-filtered parts match before `CONFIGURATION_MATCH`  
- F-450 4x2 architecture may differ from F-350 4x2 — do not inherit

## Recommended decision

**`PRIMARY_SOURCE_REQUIRED`**

Current prioritization: search for **`SRC-CAND-000001`** first. No geometry extraction until BBAS (or equivalent Tier A) is acquired and applicability verified for this silo.
