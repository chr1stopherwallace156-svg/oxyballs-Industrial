# QUALITY_STANDARD.md

Acceptance criteria for layer gates and deliverables.

## Gate definitions

### Visual gate

**Question:** Does it look correct at the intended review distance?

| Layer | Pass criteria |
|-------|---------------|
| L00 | Reference spec sheet is complete and internally consistent |
| L01+ | Silhouette and major surfaces match reference photos/OEM outline within Tier C |
| L10 | Presentation modes render without obvious artifacts at LOD1 |

Evidence: comparison renders or marked-up screenshots in layer doc.

### Dimensional gate

**Question:** Do critical dimensions match the reference?

| Tier | Tolerance | Minimum sample |
|------|-----------|----------------|
| A | ±2 mm | 100% of declared interface dims |
| B | ±5 mm | ≥90% of envelope dims |
| C | ±10 mm | Spot-check ≥5 exterior dims |

Evidence: dimension table with `source_id` per DATA_MODEL.

### Structural gate

**Question:** Are mounts, interfaces, and hierarchy sound?

- Parent/child tree matches DATA_MODEL conventions
- Removable parts (L04+) have valid pivot and no orphan nodes
- No intersecting Tier A geometry without documented clearance exception

Evidence: hierarchy export or manifest review.

### Interaction gate

**Question:** Do disassembly, selection, and views work?

| Layer | Requirement |
|-------|-------------|
| L00–L03 | N/A — mark `pass` with note "not applicable until L04" |
| L04+ | Disassembly sequence executes in documented order |
| L10 | All presentation modes reachable |

Evidence: screen recording or step checklist.

### Documentation gate

**Question:** Is provenance, status, and handoff complete?

- Layer doc sections filled
- STATUS.json gates updated
- CHANGELOG entry appended
- New decisions in DECISIONS.md
- Open questions not silently ignored

## Review roles

| Role | Responsibility |
|------|----------------|
| Agent | Self-check and record evidence |
| Owner | Approve L00 lock and any reference change |
| Engineer | Tier A dimensional sign-off (future) |

## Failure handling

- **Fail:** Gate stays `fail`; layer status stays `in_progress`; fix and re-review
- **Blocked:** External dependency documented in STATUS.json `blockers`
- **Waived:** Not allowed for Tier A dimensions; owner waiver recorded in APPROVAL_GATES for cosmetic only

## L00 specific checklist

- [ ] Model year chosen with rationale
- [ ] Cab configuration chosen
- [ ] 4x2 vs 4x4 chosen
- [ ] Wheelbase recorded with source
- [ ] Body/upfit defined
- [ ] Wheels and tires defined
- [ ] Engine configuration defined (stock OEM)
- [ ] Physical reference vehicle identified or blocker filed
- [ ] Geometry primary source identified
- [ ] Scanning/CAD strategy documented
- [ ] Licensing restrictions documented
- [ ] Accuracy requirements documented
- [ ] Owner approval recorded (for lock)

## Definition of done (per layer)

All five gates `pass` (or N/A documented for interaction on early layers), STATUS.json updated, no unresolved blocker for that layer.
