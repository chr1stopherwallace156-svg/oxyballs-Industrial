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
4. **The current roadmap** — the Rev 07 ingestion batch sequence is
   complete (75/75). The owner has opened a **bounded M10 scope**
   ([`roadmaps/M10_RULE_ENGINE_FOUNDATION.md`](roadmaps/M10_RULE_ENGINE_FOUNDATION.md),
   Decision Register D-011): the Gate 05M-C3 Deterministic Rule Engine
   Foundation, whose frozen source spec is Gate 05M-C3 Revision 08
   (RC-313..425). Its production code lives under `engine/`. The broad
   Revision 07 baseline-schema M10
   ([`roadmaps/M10_IMPLEMENTATION.md`](roadmaps/M10_IMPLEMENTATION.md))
   and ODR-001..ODR-003 resolution remain gated (entry conditions unmet).

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

## Cross-agent handoff protocol

All agents (Claude Code, Cursor, others) use the same handoff format —
defined in [`../AGENTS.md`](../AGENTS.md) with the full template at
[`handoffs/templates/HANDOFF_TEMPLATE.md`](handoffs/templates/HANDOFF_TEMPLATE.md).

- **Before stopping, nearing practical usage/context limits, switching
  agents, or completing a milestone:** update
  [`handoffs/CURRENT_HANDOFF.md`](handoffs/CURRENT_HANDOFF.md) (append
  the superseded one to
  [`handoffs/HANDOFF_LOG.md`](handoffs/HANDOFF_LOG.md)) and commit all
  valid work. Every handoff includes branch, agent owner, start/end
  commit, files changed, tests run, test results, blockers, next exact
  action, and forbidden actions.
- **Operational fallback triggers** (continuity must not depend on
  predicting remaining usage): a handoff is also mandatory after every
  completed source-ingestion batch, every meaningful commit, every two
  hours of uninterrupted work, any unresolved contradiction recorded,
  and any dirty working tree before switching agents.
- **Branch ownership (single-writer rule):** only one agent may own
  and modify an active branch at a time — see AGENTS.md for the
  transfer procedure. Never edit a branch whose `Agent owner` is not
  you.
- **On receiving a handoff, before modifying any file:** verify
  `git status`, the end-commit hash, the active specification, and the
  claimed tests; read
  [`status/CURRENT_PHASE.md`](status/CURRENT_PHASE.md) and
  [`status/BLOCKERS.md`](status/BLOCKERS.md).
- **Never mark work complete based only on an agent's statement.**
  Completion requires verification evidence recorded in
  [`status/IMPLEMENTATION_LEDGER.md`](status/IMPLEMENTATION_LEDGER.md).

## Recording your work

- Engineering decisions with lasting consequences go in the
  [Decision Register](DECISION_REGISTER.md).
- Documented changes to doctrine, schemas, or structure go in the
  [Changelog](CHANGELOG.md).
- Claims taken from external sources go in
  [`research/SourceClaims.md`](research/SourceClaims.md) with their
  source — a claim without a source is not evidence.
