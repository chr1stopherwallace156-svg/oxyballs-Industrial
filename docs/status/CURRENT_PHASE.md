# CURRENT PHASE

**Single source of truth for what phase this project is in.** Agents
read this before doing anything and update it only at phase boundaries
(with a matching Changelog entry and a proposed README update — never a
silent one).

---

## Phase

**Revision 07 Source Ingestion and Consolidation**

- Roadmap: [`docs/roadmaps/REV07_SOURCE_INGESTION.md`](../roadmaps/REV07_SOURCE_INGESTION.md)
- Active specification: [Revision 07](../specifications/Revision_07.md)
  (`ACTIVE_SPECIFICATION`; all modules `AWAITING SOURCE INGESTION` —
  see [Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md))
- Baseline: Architecture Frozen / M10 Pending

## Allowed work in this phase

- Archiving owner-provided raw research batches under
  `docs/research/raw/` (unchanged, immutable).
- Consolidating archived batches into `docs/specifications/rev07/`
  modules with full traceability.
- Filing OpenDataRequirements and recording contradictions.
- Documentation and governance maintenance (registers, handoffs,
  status files).

## Explicitly NOT allowed in this phase

- M10 implementation or any production code.
- M11 work in any form.
- Resolving ODR-001..ODR-003 (owner-approval gate).
- Treating raw research as active doctrine before consolidation.

## Next phase

**M10 — Database Implementation**
([roadmap](../roadmaps/M10_IMPLEMENTATION.md)) — begins only when the
ingestion phase exit criteria are met, including explicit owner
approval of the ODR resolutions.
