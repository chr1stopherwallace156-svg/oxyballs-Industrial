# AGENTS.md — Elektron Build Engine, cross-agent operating rules

**Applies to every AI coding agent working in this repository**
(Claude Code, Cursor, and any other tool). All agents follow the same
rules and the same handoff format — no agent-specific exceptions.

## Order of authority

1. [`docs/ENGINEERING_CONSTITUTION.md`](docs/ENGINEERING_CONSTITUTION.md)
2. [`docs/AI_INSTRUCTIONS.md`](docs/AI_INSTRUCTIONS.md)
3. The active specification — [`docs/specifications/Revision_07.md`](docs/specifications/Revision_07.md)
4. The current roadmap — see [`docs/status/CURRENT_PHASE.md`](docs/status/CURRENT_PHASE.md)

## Non-negotiables

- Never invent engineering values.
- Never delete evidence (including raw research archives and handoff
  logs).
- Never bypass guardrails, state machines, or configuration locks.
- Unknown data → file an OpenDataRequirement in
  `docs/research/OpenResearchRegister.md`; do not guess.
- No production code and no M10 work during the Revision 07 ingestion
  phase.
- Propose README baseline updates; never rewrite the README silently.

## Handoff protocol (mandatory)

The handoff protocol keeps work transferable between agents and
sessions. Full format:
[`docs/handoffs/templates/HANDOFF_TEMPLATE.md`](docs/handoffs/templates/HANDOFF_TEMPLATE.md).

### When you MUST write a handoff

Before any of the following, update
[`docs/handoffs/CURRENT_HANDOFF.md`](docs/handoffs/CURRENT_HANDOFF.md)
and **commit all valid work**:

- stopping or ending a session,
- nearing practical usage or context limits,
- switching to (or expecting) another agent,
- completing a milestone or phase.

Move the superseded handoff into
[`docs/handoffs/HANDOFF_LOG.md`](docs/handoffs/HANDOFF_LOG.md)
(append-only) before overwriting `CURRENT_HANDOFF.md`.

### What a handoff MUST contain

Branch; start commit; end commit; files changed; tests run; test
results; blockers; **next exact action**; forbidden actions. Use the
template — omitted fields make the handoff invalid.

### Receiving-agent duties (before modifying ANY file)

1. `git status` — confirm a clean tree and the expected branch.
2. `git log -1` — confirm HEAD matches the handoff's end commit; if it
   doesn't, reconcile before proceeding.
3. Read the active specification status
   (`docs/specifications/Revision_07.md` and
   `docs/specifications/rev07/00_BASELINE_INDEX.md`).
4. Run the tests the handoff claims were run and compare results. If no
   test suite exists, verify that explicitly rather than assuming.
5. Read `docs/status/CURRENT_PHASE.md` and `docs/status/BLOCKERS.md`.

### Trust rules

- **Never mark work complete based only on an agent's statement** —
  yours or a previous agent's. Completion requires verification
  evidence recorded in
  [`docs/status/IMPLEMENTATION_LEDGER.md`](docs/status/IMPLEMENTATION_LEDGER.md).
- A handoff describes state; it does not certify it. The receiver
  re-verifies.

## Status files

| File | Purpose |
|---|---|
| [`docs/status/CURRENT_PHASE.md`](docs/status/CURRENT_PHASE.md) | Single source of truth for the current phase |
| [`docs/status/IMPLEMENTATION_LEDGER.md`](docs/status/IMPLEMENTATION_LEDGER.md) | What is claimed vs verified complete |
| [`docs/status/BLOCKERS.md`](docs/status/BLOCKERS.md) | Active blockers and what unblocks them |
