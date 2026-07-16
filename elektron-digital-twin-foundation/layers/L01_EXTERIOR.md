# L01 — Exterior

**Status:** Research draft complete — `L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`  
**Milestone:** `L1_SOURCE_PACK_01`  
**Source pack:** `L1_SOURCE_PACK_01_NOT_VERIFIED`  
**Document gate:** `L1_DOCUMENT_ACQUISITION_READY`  
**Public search:** `L1_PUBLIC_REFERENCE_SEARCH_READY`  
**Modeling baseline:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`  
**Geometry / mesh production:** Blocked  
**Prerequisites for geometry:** verified PDF hashes + page evidence + physical confirmation + owner approval

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
- [x] Source Pack 01 authenticity reset to candidate templates
- [x] File/page manifests + extraction verification + parallel lanes A/B
- [ ] Real SRC PDF acquisition + executed SHA-256
- [ ] Page evidence restoration → DOCUMENT_SUPPORTED
- [ ] Physical verification on GRADE-A/B VIN
- [ ] Geometry freeze approval

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
