# DECISION REGISTER

Record of engineering decisions with lasting consequences. Entries are
append-only: a decision is never edited or removed, only superseded by a
later entry that references it.

**Entry format:**

```
## D-NNN — <short title>
- Date: YYYY-MM-DD
- Status: Accepted | Superseded by D-NNN
- Context: why the decision was needed
- Decision: what was decided
- Consequences: what this binds or unblocks
```

---

## D-004 — Handoff fallback triggers, branch single-writer rule, deferred validity hashes

- Date: 2026-07-15
- Status: Accepted
- Context: "Nearing usage/context limits" is not reliably
  self-detectable by an agent, so continuity could fail on a missed
  prediction; and the protocol could still fail if two agents edited
  the same branch simultaneously.
- Decision: (1) Operational fallback triggers — a handoff is also
  mandatory after every completed source-ingestion batch, every
  meaningful commit, every two hours of uninterrupted work, any
  unresolved contradiction recorded, and any dirty working tree before
  switching agents. (2) Branch single-writer rule — only one agent may
  own and modify an active branch at a time; ownership lives in the
  handoff's `Agent owner` field; transfer requires commit-or-document,
  push, END_COMMIT, and owner reassignment; receivers must not edit
  until ownership names them. (3) Handoff validity hashes
  (handoff_file_hash, active_spec_hash, implementation_ledger_hash,
  blockers_file_hash) are deferred to M10 start — an enhancement, not
  a blocker; source ingestion is not delayed for it.
- Consequences: Continuity no longer depends on usage prediction;
  concurrent-edit conflicts are a protocol violation with a defined
  transfer procedure; the hash enhancement is tracked in the M10
  roadmap so it cannot be silently forgotten.

## D-003 — Install the Elektron cross-agent handoff protocol

- Date: 2026-07-15
- Status: Accepted
- Context: Multiple AI agents (Claude Code, Cursor) work in this
  repository across sessions with practical context limits. Without a
  shared handoff format, state is lost between agents and completion
  claims go unverified.
- Decision: One handoff format for all agents, defined in `AGENTS.md`
  (mirrored for Cursor in `.cursor/rules/elektron-build-engine.mdc`)
  with the template in `docs/handoffs/templates/`. Handoffs are
  mandatory before stopping, nearing usage/context limits, switching
  agents, or completing a milestone, and must include branch, start/end
  commit, files changed, tests run, test results, blockers, next exact
  action, and forbidden actions. Receiving agents verify git status,
  commit hash, active spec, and tests before modifying files. Work is
  never marked complete on agent statements alone — verification
  evidence goes in `docs/status/IMPLEMENTATION_LEDGER.md`. Phase truth
  lives in `docs/status/CURRENT_PHASE.md`; blockers in
  `docs/status/BLOCKERS.md`. `HANDOFF_LOG.md` is append-only evidence.
- Consequences: Any agent can resume from a cold start by reading
  `CURRENT_HANDOFF.md` and re-verifying. Unverified completion claims
  are structurally visible as `Claimed` ledger entries.

## D-002 — Modularize Revision 07; add source-ingestion phase before M10

- Date: 2026-07-15
- Status: Accepted
- Context: A single enormous Revision_07.md would be hard to review,
  version, and supersede. The approved Revision 07 doctrine exists as
  ~75 raw research exchanges that must be consolidated, not pasted in
  as-is.
- Decision: Revision 07 is constituted by modules 00–12 under
  `docs/specifications/rev07/`, indexed by `Revision_07.md` and
  `00_BASELINE_INDEX.md`; no module may override the Engineering
  Constitution. A dedicated phase — Revision 07 Source Ingestion and
  Consolidation (`roadmaps/REV07_SOURCE_INGESTION.md`) — precedes M10:
  raw batches are archived immutably under `docs/research/raw/`, then
  consolidated per module with full traceability. ODR-001..ODR-003 may
  not be resolved until all batches are processed, contradictions
  reviewed, the Baseline Index is complete, and the owner explicitly
  approves. No production code during ingestion.
- Consequences: M10 entry conditions now depend on the ingestion phase.
  Raw research is evidence (immutable); consolidated modules are the
  only path from research to active doctrine.

## D-001 — Adopt entry-point documentation structure

- Date: 2026-07-15
- Status: Accepted
- Context: Engineering doctrine will grow to hundreds of pages; a single
  README cannot hold it and remain maintainable.
- Decision: The README is the entry point only. Doctrine is split into
  the Engineering Constitution (stable rules), AI Instructions
  (operating manual), versioned specifications (one active), roadmaps
  (per milestone), and research registers, all under `/docs`.
- Consequences: Exactly one specification is marked
  `ACTIVE_SPECIFICATION` at a time; superseded revisions are archived in
  place. README baseline updates are made by proposal at milestone
  boundaries, never silently.
