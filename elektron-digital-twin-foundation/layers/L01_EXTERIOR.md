# L01 — Exterior

**Status:** Research draft complete — `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`  
**Phase:** `L1_FACTUAL_VERIFICATION_REQUIRED`  
**Gate:** `L1_REQUIRES_MORE_REFERENCE_DATA`  
**Geometry / mesh production:** Blocked  
**Prerequisites for geometry:** factual verification track closes gaps + visual intake evidence archived + owner approval

## Scope

Exterior body shell, doors, hood, fenders, bumpers, mirrors, glass, lighting, wheels/tires, bare C-channel chassis presentation, and Tier C dimensional envelope for the locked Candidate C1 configuration:

- 2019 Ford F-450 Chassis Cab
- Regular Cab / 4x2 / DRW
- 145.3 in WB / 60 in CA
- Bare cab-and-chassis

## Research package

Authoritative L1 docs: [`layers/L01/`](L01/README.md)

- Adversarial audit: [`L1_ADVERSARIAL_SOURCE_AUDIT.md`](L01/L1_ADVERSARIAL_SOURCE_AUDIT.md)
- Claim register: [`L1_CLAIM_REGISTER_PROPOSAL.json`](L01/L1_CLAIM_REGISTER_PROPOSAL.json)
- Prefer V2 hierarchy / registries / acceptance / capture grid

Planning sequence: [`L01_RESEARCH_DOSSIER_PLAN.md`](L01_RESEARCH_DOSSIER_PLAN.md)

## Deliverables

### Research

- [x] Exterior research plan and dossiers (draft)
- [x] Adversarial source audit + claim/conflict registers
- [x] V2 hierarchy, object/landmark registries, landmark classification
- [x] Capture coverage grid + PBR metalness correction
- [x] Visual acceptance V2 + final gap report
- [ ] Tier 1 source archive (hashed BBAS / order guide / T&RA)
- [ ] Physical verification of open claims / conflicts
- [ ] Footprint/envelope claim records (schema V6) promoted beyond DRAFT

### Production (blocked)

- [ ] Exterior glTF assembly `L01_ROOT`
- [ ] Material manifest (authored assets)
- [ ] ≥5 dimension spot-checks vs OEM
- [ ] Gate records promoted beyond research

## Gate checklist

| Gate | Status |
|------|--------|
| Visual | requires_more_reference_data |
| Dimensional | factual_verification_required |
| Structural | research_only |
| Interaction | blocked |
| Documentation | draft_complete |

## Notes

- Frame powdercoat metalness corrected to **0.0** (dielectric); do not use draft 0.8.
- Front axle remains `CONFIGURATION_UNRESOLVED` despite AUTHORITATIVE monobeam ranking.
- Hub ornaments are `VISUAL_POSE_LANDMARK` only — not engineering datums.
