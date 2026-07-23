# CURRENT PHASE

**Single source of truth for what phase this project is in.** Agents
read this before doing anything and update it only at phase boundaries
(with a matching Changelog entry and a proposed README update — never a
silent one).

---

## Phase

**M10 (bounded) — Gate 05M-C3 Deterministic Rule Engine Foundation**
(opened by the owner, Decision Register **D-011**; Rev 07 ingestion
batch sequence complete 75/75, D-010)

- Roadmap: [`docs/roadmaps/M10_RULE_ENGINE_FOUNDATION.md`](../roadmaps/M10_RULE_ENGINE_FOUNDATION.md)
- Frozen source spec: **Gate 05M-C3 Revision 08**
  ([`GATE05M_C3_CLOSED_AREA_MOVEMENT.md`](GATE05M_C3_CLOSED_AREA_MOVEMENT.md),
  RC-313..425)
- Active specification (governance): [Revision 07](../specifications/Revision_07.md)
  (`ACTIVE_SPECIFICATION`)
- Code location: `engine/`
- Baseline: Architecture Frozen / bounded M10 in progress

## Allowed work in this phase

- Building the **bounded** Gate 05M-C3 rule engine under `engine/` from
  the frozen Rev 08 spec: normalized SQLite schema + migrations, foreign
  keys + junction tables, state-transition enforcement, runout engine,
  configuration-lock enforcement, append-only evidence ledger,
  machine-readable block reasons, positive + negative tests, seed data
  containing **no** approvals/passes/engineering values.
- Archiving owner-provided raw batches/directives under
  `docs/research/raw/` (unchanged, immutable).
- Documentation and governance maintenance (registers, handoffs,
  status files, implementation ledger).

## Explicitly NOT allowed in this phase

- Resolving ODR-001..ODR-003 (owner-approval gate — still closed).
- The **broad** Revision 07 baseline-schema M10
  ([`M10_IMPLEMENTATION.md`](../roadmaps/M10_IMPLEMENTATION.md)) — its
  entry conditions (full baseline consolidation + ODR resolution) are
  unmet.
- M11 work in any form.
- Inventing any engineering value; seeding any real approval or
  `SIGNED_PASS`; any UI work before the schema/rules/tests pass.
- Any convenience path that bypasses a guardrail, even behind a flag.

## Next phase

**M11 — Platform 001 Open Data Register and Supplier Closure**
([roadmap](../roadmaps/M11_OPEN_DATA_REGISTER.md)) — begins only after the
bounded M10 rule engine passes its completion criteria (migrate/seed/
verify/test/build) and the owner opens it.
