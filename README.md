# ELEKTRON BUILD ENGINE

**Current Engineering Baseline**

| | |
|---|---|
| Revision | 07 |
| Status | Architecture Frozen / M10 Pending |
| Current Phase | [Revision 07 Source Ingestion and Consolidation](docs/roadmaps/REV07_SOURCE_INGESTION.md) |
| Next Phase | M10 — Database Implementation |
| Active Specification | [`/docs/specifications/Revision_07.md`](docs/specifications/Revision_07.md) |

This repository implements the deterministic Build Engine used for
vehicle conversion validation.

The Build Engine is governed by the Engineering Constitution and all
approved specifications contained within the [`/docs`](docs/) directory.

**Nothing may bypass guardrails, state machines, evidence requirements,
or configuration locking.**

## Read in this order

1. [Engineering Constitution](docs/ENGINEERING_CONSTITUTION.md) — rules that almost never change
2. [Project Instructions](docs/AI_INSTRUCTIONS.md) — permanent operating manual for AI assistance
3. [Current Revision Specification](docs/specifications/Revision_07.md) — the active engineering doctrine
4. [M10 Roadmap](docs/roadmaps/M10_IMPLEMENTATION.md) — what to build next, in what order
5. [Research Register](docs/research/OpenResearchRegister.md) — what evidence is still missing

## Repository layout

```
README.md                         Entry point (this file)
AGENTS.md                         Cross-agent rules + handoff protocol
.cursor/rules/                    Cursor rule mirroring AGENTS.md
docs/
    handoffs/
        CURRENT_HANDOFF.md        Live handoff between agents/sessions
        HANDOFF_LOG.md            Append-only archive of past handoffs
        templates/                Handoff template
    status/
        CURRENT_PHASE.md          Single source of truth for the phase
        IMPLEMENTATION_LEDGER.md  Claimed vs verified work
        BLOCKERS.md               Active blockers
    ENGINEERING_CONSTITUTION.md   Rules that rarely change
    AI_INSTRUCTIONS.md            How Claude Code / AI tooling must behave
    DECISION_REGISTER.md          Record of engineering decisions
    CHANGELOG.md                  Documented change history
    specifications/
        Revision_07.md            ACTIVE_SPECIFICATION (index)
        rev07/                    Modules that constitute Revision 07
            00_BASELINE_INDEX.md  Module list + consolidation status
            01..12_*.md           Topic modules
    roadmaps/
        REV07_SOURCE_INGESTION.md Current phase: ingest + consolidate
        M10_IMPLEMENTATION.md     Next milestone (blocked on ingestion)
        M11_OPEN_DATA_REGISTER.md Later milestone (do not implement yet)
    research/
        OpenResearchRegister.md   Open research items / ODRs
        SourceClaims.md           Claims and their sources
        raw/                      Immutable raw research batches
```

## Maintaining this README

This README is the entry point, not the doctrine. It is updated **by
proposal, never silently**: when a milestone completes or a new revision
supersedes the active specification, an update to the "Current
Engineering Baseline" table above is proposed, reviewed, and committed
with the milestone. Detailed rules, guardrails, and revision content
live in `/docs` — do not add them here.
