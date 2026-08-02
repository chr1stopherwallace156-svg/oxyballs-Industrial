# REVISION 07 — SOURCE INGESTION AND CONSOLIDATION

**Status:** Current phase
**Precedes:** [M10 — Database Implementation](M10_IMPLEMENTATION.md)
(M10 must not begin until this phase completes)
**Governed by:** [Engineering Constitution](../ENGINEERING_CONSTITUTION.md)

Approximately 75 research exchanges will be provided by the owner in
topic-based Markdown batches. **They are raw research evidence, not
automatically active specifications** — research informs; evidence
authorizes (Constitution, Article III).

---

## Per-batch procedure

For each batch received:

1. **Archive raw.** Store the material **unchanged** under
   `docs/research/raw/<module_name>/`. Raw archives are evidence:
   immutable, never edited, never deleted (Article I).
2. **Consolidate.** Produce or extend the corresponding module under
   `docs/specifications/rev07/`, and update its status in the
   [Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md).
3. **Extract into the module's standard sections:**
   - permanent requirements
   - deterministic guardrails
   - schemas and state machines
   - block conditions
   - evidence requirements
   - open data requirements
   - rejected or superseded alternatives
   - unresolved contradictions
4. **Maintain traceability.** Every consolidated requirement cites its
   raw research source in the module's traceability table.
5. **Invent nothing.** No engineering values, approvals, supplier
   limits, test results, or missing doctrine may be fabricated. Gaps
   become OpenDataRequirements in the
   [Open Research Register](../research/OpenResearchRegister.md).

## Consolidation quality bar

Consolidation is not transcription. For each module:

- duplicates are consolidated,
- contradictions are identified and **recorded, not silently resolved**,
- superseded rules are marked as such (never deleted),
- terminology is normalized to one canonical form,
- active rules are separated from historical discussion,
- traceability back to the raw research is preserved throughout.

## ODR-001..ODR-003 resolution gate

These may **not** be marked resolved until **all** of the following
hold:

- [ ] Every source batch has been processed (archived + consolidated).
- [ ] All recorded contradictions have been reviewed.
- [ ] The [Revision 07 Baseline Index](../specifications/rev07/00_BASELINE_INDEX.md)
      is complete (every module `CONSOLIDATED`).
- [ ] The owner has **explicitly approved** the resolution.

No partial or implied resolution. AI tooling cannot satisfy the approval
condition itself (Article III).

## Do NOT during this phase

- Do not implement production code (M10 or otherwise).
- Do not treat any raw research statement as active doctrine before
  consolidation.
- Do not resolve or close ODRs.
- Do not begin M11 in any form.

## Exit criteria

The phase is complete when the ODR resolution gate above is fully
satisfied. On completion, propose (do not silently apply) a README
update moving the Current Phase to M10 — Database Implementation.
