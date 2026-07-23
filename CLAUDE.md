# Claude Code — start here

Before doing anything in this repository, read and follow
[`docs/AI_INSTRUCTIONS.md`](docs/AI_INSTRUCTIONS.md). It is the
permanent operating manual and is subordinate only to
[`docs/ENGINEERING_CONSTITUTION.md`](docs/ENGINEERING_CONSTITUTION.md).

Non-negotiables (full versions in the files above):

- Never invent engineering values.
- Never delete evidence.
- Never bypass guardrails, state machines, or configuration locks.
- Unknown data → file an OpenDataRequirement in
  `docs/research/OpenResearchRegister.md`; do not guess.
- Work against the active specification
  (`docs/specifications/Revision_07.md`). The Rev 07 ingestion batch
  sequence is complete (75/75); the owner has opened a **bounded M10
  scope** — the Gate 05M-C3 Deterministic Rule Engine Foundation
  (`docs/roadmaps/M10_RULE_ENGINE_FOUNDATION.md`, D-011), whose frozen
  source spec is Gate 05M-C3 Revision 08 (`GATE05M_C3_CLOSED_AREA_MOVEMENT.md`,
  RC-313..425). Production code for that bounded scope lives under
  `engine/`. STILL FORBIDDEN: resolving ODR-001..ODR-003; the broad
  Revision 07 baseline-schema M10 (`docs/roadmaps/M10_IMPLEMENTATION.md`,
  entry conditions unmet); M11; any invented engineering value or fake
  approval/pass (seed data contains none).
- Propose README baseline updates; never rewrite the README silently.
- Follow the cross-agent handoff protocol in [`AGENTS.md`](AGENTS.md):
  verify git state, active spec, and tests before modifying files;
  update `docs/handoffs/CURRENT_HANDOFF.md` and commit valid work
  before stopping, nearing context limits, switching agents, or
  completing a milestone. Never mark work complete based only on an
  agent's statement.
