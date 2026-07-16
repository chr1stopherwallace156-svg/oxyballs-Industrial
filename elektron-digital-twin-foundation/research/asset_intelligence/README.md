# Asset Intelligence Database (AID)

**Status:** `RESEARCH_OPERATIONAL` (DT-D042)  
**Schema:** `schemas/asset-intelligence-passport.schema.json`  
**Register:** `ASSET_INTELLIGENCE_REGISTER.json`  
**Passports:** `passports/AID-*.json`

## Purpose

Every discovered internet asset gets a **passport**. Links and listings are **inputs into EDTS**, not answers.

AID is the intelligence layer that makes acquisition decisions machine-readable:

- What geometry types are claimed?
- How complete is exterior / interior / mechanical / electrical (ordinals)?
- Exact-config match class under HR-EVI?
- License, price, acquired / parsed / verified lifecycle?
- Component coverage and known deficiencies?

## Relationship to other homes

| Concern | Home | Notes |
|---|---|---|
| Marketplace listing pointer | `layers/L01/L1_LANE_A_ASSET_CATALOG.json` | Thin operational catalog (DT-D027) |
| Document / OEM hunt | `research/src_candidates/` | `SRC-CAND-*` |
| **Asset intelligence passport** | **this directory** | Full structured evaluation surface |
| Kernel component passport | frozen `schemas/component-passport.schema.json` | Silo truth — **untouched** |
| Geometry after verification | `GEO-*` / EAE | Only after Hard Rule 4 |

**DT-D027 still stands:** do not recreate rejected shortlist files (`L1_ASSET_CANDIDATE_DATABASE.json`, door/cab shortlists, etc.). AID is not that pack — it is a structured passport DB with honest `NOT_EVALUATED` defaults.

## Hard rules

- **Hard Rule 5:** Completeness fields are ordinals (`NONE`/`LOW`/`PARTIAL`/`HIGH`/`NOT_EVALUATED`) — never engineering confidence %. Optional `score_claims` (0–1) are `RESEARCH_CLAIM` / `LISTING_CLAIM` only until bytes.
- **Hard Rule 6:** No invented URLs or hashes.
- **Hard Rule 14:** Vector blueprints = `PROFILE_REFERENCE` only.
- **Hard Rule 17:** Deconstructed sourcing + supplier-first + **AJR** before purchase (`ajr/`).
- **HR-EVI:** Listing similarity ≠ `CONFIGURATION_MATCHED`.
- **Listing ≠ evaluated:** `completeness.evaluation_basis: LISTING_ONLY` until local bytes are parsed.

## ID policy

- Pattern: `AID-######`
- Immutable handle; metadata mutable
- May alias `EDTS-CAND-*`, `CAND-*`, `SRC-CAND-*`, `ASSET-*`
