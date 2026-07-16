# RL-011 — Asset Intelligence Database

**Date:** 2026-07-16  
**Decision:** `DT-D042`  
**Pivot:** From “find vehicle answers on the internet” → **build a world-class acquisition intelligence system**.

## Thesis

Direct URLs and marketplace finds are useful, but they are **inputs into EDTS**, not conclusions.  
Every asset on the internet should have a **passport**.

## Delivered

| Artifact | Path |
|---|---|
| Schema (non-kernel) | `schemas/asset-intelligence-passport.schema.json` |
| Register | `research/asset_intelligence/ASSET_INTELLIGENCE_REGISTER.json` |
| Passports | `research/asset_intelligence/passports/AID-*.json` |
| README | `research/asset_intelligence/README.md` |

## Seeded assets

| AID | Alias | Role | URL status |
|---|---|---|---|
| AID-000001 | EDTS-CAND-001 / SRC-CAND-000004 | `PROFILE_REFERENCE` | `URL_RECORDED` |
| AID-000002 | EDTS-CAND-002 / CAND-000042-EOG | `VISUAL_CANDIDATE` | `URL_FETCH_CONFIRMED` (SKU) |
| AID-000003 | EDTS-COMP-CAD-001 | `CAD_CANDIDATE` | `NOT_RECORDED` |
| AID-000004 | EDTS-COMP-CAD-002 | `VISUAL_CANDIDATE` | Marketplace ID only |
| AID-000005 | ASSET-00031 | `VISUAL_CANDIDATE` | `NOT_RECORDED` |
| AID-000006 | CAND-771-GRAB | `CAD_CANDIDATE` | `NOT_RECORDED` |
| AID-000007 | Outlines 30638 (CA 108) | related input | Incomplete slug |
| AID-000008 | Outlines 30639 (CA 120) | related input | Incomplete slug |

## Direct URLs recorded this sprint

1. **AID-000001** — https://getoutlines.com/vector-drawings/30637/2017-2022-ford-f-450-super-duty-drawings  
2. **AID-000002** — https://www.cgtrader.com/3d-models/vehicle/truck/ford-f350-f550-super-duty-dually-eog-complete-model  

Related CA listings 30638 / 30639: marketplace IDs recorded only — **full slugs not invented** (Hard Rule 6).

## Passport field contract (summary)

Asset ID · Source · Vehicle · Configuration · Exact configuration match · Geometry type(s) · Exterior/Interior/Mechanical/Electrical completeness · Hierarchy quality · Mesh separation · Topology quality · Engineering/Visual usefulness · License · Price · Acquired · Parsed · Verified · Component coverage · Known deficiencies · Evidence links

Completeness = **ordinals** (`NOT_EVALUATED` / `NONE` / `LOW` / `PARTIAL` / `HIGH`) — not confidence %.

## Governance boundaries

- Does **not** revive rejected DT-D027 shortlist pack (`L1_ASSET_CANDIDATE_DATABASE.json`)
- Does **not** activate multi-axis scoring engines (DT-D029 deferral)
- Does **not** mutate frozen kernel / component-passport rc1
- Lane A catalog remains thin pointer register; AID holds intelligence depth
- `CONFIGURATION_MATCHED` never set from listing title alone

## Next actions

1. Purchase / acquire **AID-000001** (profile reference) → EAE local ingest + hash  
2. Isolate GrabCAD URL for **AID-000003** before acquire  
3. Optionally acquire **AID-000002** as visual complete-vehicle package → keep/discard map  
4. Create AID passport for every new discovery going forward  
5. After bytes: promote `evaluation_basis` from `LISTING_ONLY` → `LOCAL_BYTES_PARSED`
