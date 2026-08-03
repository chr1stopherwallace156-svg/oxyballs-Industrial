# RL-027 — EDTS Visible Progress Release 1

**Decision:** DT-D058  
**Date:** 2026-07-21  
**Layer:** visual demonstrator (parallel to L1 research; non-kernel)

## Question

Can EDTS ship an interactive 3D demonstrator before complete vehicle research, without inventing engineering truth or forcing a later rewrite?

## Answer

Yes — as a **provisional visual lane** implementing the Release 1 handoff architecture:

1. Procedural stylized truck scaled to extracted WB / track / frame width / overhang / BOC only.
2. Three states: Factory ICE, Deconstruction (retained translucent / extracted pulse + dependency lines), EV Proposal (muted factory + high-vis L3 pack).
3. Per-component select / isolate / hide / remove / explode.
4. Mandatory data-status badges (handoff color table) + passport inspector (evidence ledger, interfaces, KG, MEPQ).
5. Scene tree hierarchy from catalog.
6. Catalog-driven metadata so evidence upgrades do not require viewer rewrite.

## Handoff sample rejections

The sample `EDTSDemonstrator.jsx` data that claimed:

- `VERIFIED` frame / cab / Dana axle without ASSERTION_VERIFIED CAD
- Invented **110 kWh** pack / **250 kW** EDU / **1,100 lb** engine mass
- Aluminum cab as verified material

…is **rejected**. Architecture and UI schema are admitted; fabricated precision is not.

## Non-claims

- Not VERIFIED geometry
- Not L10 public demo approval
- Not procedure generation
- Not geometry freeze
- Does not unblock fabricated L1 (DT-D057 still stands)

## Artifacts

- `/edts-visible-progress/` (Vite + R3F app)
- `src/data/componentCatalog.json`
