# L01 — Exterior

**Status:** Research draft complete — `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`  
**Phase:** `L1_FACTUAL_VERIFICATION_REQUIRED`  
**Evidence gate:** `L1_REQUIRES_MORE_REFERENCE_DATA`  
**Access gate:** `L1_BLOCKED_BY_SOURCE_ACCESS`  
**Acquisition activity:** `READY`  
**Geometry / mesh production:** Blocked  
**Prerequisites for geometry:** source baseline closure + factual verification + visual intake evidence archived + owner approval

## Scope

Exterior body shell, doors, hood, fenders, bumpers, mirrors, glass, lighting, wheels/tires, bare C-channel chassis presentation, and Tier C dimensional envelope for the locked Candidate C1 configuration:

- 2019 Ford F-450 Chassis Cab
- Regular Cab / 4x2 / DRW
- 145.3 in WB / 60 in CA
- Bare cab-and-chassis

## Research package

Authoritative L1 docs: [`layers/L01/`](L01/README.md)

- Acquisition queue: [`L1_REFERENCE_ACQUISITION_QUEUE.md`](L01/L1_REFERENCE_ACQUISITION_QUEUE.md)
- Source closure: [`L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md`](L01/L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md)
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
- [x] Reference acquisition queue + source registry (null metadata until acquired)
- [x] Keyword extraction plan + empty results file; measurement defs/uncertainty; GRADE-A/B/C; scan priority
- [x] Photo lens/perspective standards; modular closure rules; acquisition activity READY
- [ ] Tier 1 source archive (hashed SRC-L1-001…003 with verified metadata)
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
