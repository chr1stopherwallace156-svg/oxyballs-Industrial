# RL-012 — Deconstructed assembly sourcing + supplier-first + AJR

**Date:** 2026-07-16  
**Decision:** `DT-D043`  
**Recommended project decision:** `CONTINUE_RESEARCH`

## Honesty gate

| Operator claim | Project posture |
|---|---|
| SPECIFICATION_READY / SOURCE_VERIFIED (M300) | **Rejected** — no URL/bytes → `DISCOVERED` / `NOT_ACQUIRED` |
| Engineering usefulness 0.95 / 0.98 | Stored as `score_claims` with status **`RESEARCH_CLAIM`** only — not EVALUATED |
| “Successfully isolated Dana/ZF CAD” | **Demoted** — hunt narrative without hashed artifacts |
| Hum3D / GrabCAD / TraceParts links | **Not invented** (Hard Rule 6) |
| Front monobeam architecture decided | **Forbidden** — still `PRIMARY_SOURCE_REQUIRED` (DT-D037) |

## Section deliverables

1. **Deconstructed Assembly Sourcing** — `research/sourcing/DECONSTRUCTED_ASSEMBLY_SOURCING.md`  
2. **Tier-1 supplier matrix (hunt)** — `research/sourcing/TIER1_SUPPLIER_MATRIX_2019_F450.json`  
3. **AID schema 1.1.0** — supplier hub, AJR link, optional score_claims, match_tri_state  
4. **AJR system** — `schemas/acquisition-justification-report.schema.json` + `research/asset_intelligence/ajr/`  
5. **New AID passports**
   - `AID-000009` ← `AID-AXLE-M300-01`
   - `AID-000010` ← `AID-STEER-GEAR-03`
   - `AID-000011` ← `AID-DOOR-SHELL-01` (Hum3D claim; related to `AID-000003`)

## AJR outcomes (this sprint)

| AJR | Asset | Clearance | Decision |
|---|---|---|---|
| AJR-000001 | AID-000009 | **NOT_CLEARED** | `CONTINUE_RESEARCH` |
| AJR-000002 | AID-000010 | **NOT_CLEARED** | `CONTINUE_RESEARCH` |

Purchase blocked until: real URL → engineering-data YES → duplication UNIQUE → priority-gap YES.

## Risks retained

- Polygonal shell (Hum3D/OBJ) vs NURBS supplier STEP workflow bottleneck  
- Mid-run Tier-1 supplier changes vs vehicle build date  
- Missing inner door stamping CAD (unchanged)

## Next actions

1. Locate **real** GrabCAD/Dana listing URL for `AID-000009` → re-run AJR-000001  
2. Locate **real** TraceParts/ZF URL for `AID-000010` → re-run AJR-000002  
3. Locate Hum3D URL for `AID-000011` or continue GrabCAD `AID-000003`  
4. Keep OEM PDF hunt + door physical scan plan in parallel  
5. Do not download until `purchase_clearance=CLEARED`
