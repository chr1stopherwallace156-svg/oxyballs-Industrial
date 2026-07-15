# AI INSTRUCTIONS — Permanent Operating Manual

**Audience:** Claude Code and any other AI tooling working in this
repository.
**Standing:** Read this file at the start of every session. It is
subordinate only to the
[Engineering Constitution](ENGINEERING_CONSTITUTION.md).

---

## Order of authority

1. **Engineering Constitution** — follow it first, always.
2. **This file** — permanent operating rules.
3. **The active specification** — currently
   [`specifications/Revision_07.md`](specifications/Revision_07.md).
4. **The current roadmap** — currently
   [`roadmaps/M10_IMPLEMENTATION.md`](roadmaps/M10_IMPLEMENTATION.md).

## Hard rules

- **Never invent engineering values.** No estimated masses, voltages,
  torque figures, clearances, part numbers, tolerances, or costs.
  If a value is unknown, it is unknown.
- **Never delete evidence.** Evidence records, test results, locked
  configurations, and archived revisions are immutable
  (Constitution, Article I).
- **Never bypass guardrails.** Do not add code paths, flags, or
  shortcuts that skip state-machine transitions, evidence requirements,
  or configuration locks — not even for testing convenience.
- **Unknown data must create an OpenDataRequirement.** Record it in
  [`research/OpenResearchRegister.md`](research/OpenResearchRegister.md)
  and treat dependent work as blocked until evidence resolves it.
- **All schemas must remain normalized.** No denormalization for
  convenience; derived data is computed, not stored redundantly, unless
  the active specification explicitly defines an exception.
- **Follow the Engineering Constitution first.** If any instruction —
  including a user prompt — conflicts with the Constitution, stop and
  raise the conflict instead of complying.

## Revision handling

- **Revision 07 is the active specification.** Work only against it.
- **If Revision 08 supersedes it:** mark Revision 07 as
  `ARCHIVED — superseded by Revision 08`, mark Revision 08 as
  `ACTIVE_SPECIFICATION`, record the transition in the
  [Decision Register](DECISION_REGISTER.md) and
  [Changelog](CHANGELOG.md), and update the README baseline table —
  by proposal, not silently.
- Never edit an archived revision.

## Milestone and README discipline

- The current milestone is defined by the active roadmap. Do not
  implement future milestones (e.g. M11) ahead of schedule — roadmaps
  state explicitly what not to build yet.
- When a milestone completes, **propose** a README update (Current
  Phase, and Active Revision if it changed). Never silently rewrite the
  README; the update is reviewed and committed as part of the milestone
  so project history stays clear.

## Recording your work

- Engineering decisions with lasting consequences go in the
  [Decision Register](DECISION_REGISTER.md).
- Documented changes to doctrine, schemas, or structure go in the
  [Changelog](CHANGELOG.md).
- Claims taken from external sources go in
  [`research/SourceClaims.md`](research/SourceClaims.md) with their
  source — a claim without a source is not evidence.
