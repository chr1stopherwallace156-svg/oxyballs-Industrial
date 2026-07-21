# RL-027 — EDTS Visible Progress Release 1

**Decision:** DT-D058  
**Date:** 2026-07-21  
**Layer:** visual demonstrator (parallel to L1 research; non-kernel)

## Question

Can EDTS ship an interactive 3D demonstrator before complete vehicle research, without inventing engineering truth or forcing a later rewrite?

## Answer

Yes — as a **provisional visual lane**:

1. Procedural stylized truck scaled to extracted WB / track / frame width / overhang / BOC only.
2. Three states: Factory ICE, Deconstruction, EV Proposal.
3. Per-component select / hide / remove / explode.
4. Mandatory data-status badges + inspector (ID, applicability, evidence, interfaces, missing props, MEPQ).
5. Factory vs EV proposal separation (family + color + catalog).
6. Catalog-driven metadata so evidence upgrades do not require viewer rewrite.

## Non-claims

- Not VERIFIED geometry
- Not L10 public demo approval
- Not procedure generation
- Not geometry freeze
- Does not unblock fabricated L1 (DT-D057 still stands)

## Artifacts

- `/edts-visible-progress/` (Vite + R3F app)
- `src/data/componentCatalog.json`
