# M10 — DATABASE IMPLEMENTATION

**Status:** Current milestone (pending)
**Prerequisite:** Architecture Frozen under
[Revision 07](../specifications/Revision_07.md)
**Governed by:** [Engineering Constitution](../ENGINEERING_CONSTITUTION.md)

This roadmap tells implementation (human or AI) what to build, in what
order, with completion criteria and explicit non-goals.

---

## Entry conditions

M10 work may not begin until:

- [ ] The [Revision 07 Source Ingestion phase](REV07_SOURCE_INGESTION.md)
      is complete: every source batch processed, contradictions
      reviewed, the
      [Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md)
      fully `CONSOLIDATED`.
- [ ] ODR-001..ODR-003 are resolved **with explicit owner approval**
      per the resolution gate in the ingestion roadmap. Schemas cannot
      be implemented from specification shells.

## Build order

1. **Schema layer** — implement the normalized schemas exactly as
   defined in Revision 07. No denormalization, no speculative fields.
2. **Migration/versioning layer** — every schema change is versioned;
   no destructive migrations against evidence-bearing tables.
3. **Evidence store** — append-only storage honoring Article I
   (evidence is immutable): inserts and supersession only, no update or
   delete paths.
4. **Configuration lock storage** — locked configurations persisted as
   immutable, versioned records per Article V.
5. **State persistence** — storage for state-machine state that only
   the defined transition logic can write to.

## Completion criteria

M10 is complete when all of the following hold:

- All Revision 07 schemas exist, normalized, with versioned migrations.
- The evidence store demonstrably rejects mutation and deletion.
- Locked configurations demonstrably cannot be modified in place.
- State records cannot be written outside defined transitions.
- Each criterion above is demonstrated by recorded evidence, not by
  assertion.

## Dependencies

- Revision 07 doctrine content (ODR-001..ODR-003).
- Any missing engineering data discovered during implementation must be
  filed as an OpenDataRequirement in the
  [Open Research Register](../research/OpenResearchRegister.md) — never
  guessed.

## Do NOT implement yet

- Anything scoped to [M11 — Open Data Register](M11_OPEN_DATA_REGISTER.md).
- Any UI, reporting, or integration layers not listed above.
- Any convenience path that bypasses guardrails, even behind a flag.

## On completion

Propose (do not silently apply) a README update:

```
Current Phase:
M10 - Database Implementation
    ↓
Current Phase:
M11 - Open Data Register
```
