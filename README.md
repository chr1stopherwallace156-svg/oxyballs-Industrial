# ELEKTRON BUILD ENGINE

**Current Engineering Baseline**

| | |
|---|---|
| Revision | 07 |
| Status | Architecture Frozen / M10 Pending |
| Current Phase | M10 — Database Implementation |
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
docs/
    ENGINEERING_CONSTITUTION.md   Rules that rarely change
    AI_INSTRUCTIONS.md            How Claude Code / AI tooling must behave
    DECISION_REGISTER.md          Record of engineering decisions
    CHANGELOG.md                  Documented change history
    specifications/
        Revision_07.md            ACTIVE_SPECIFICATION
    roadmaps/
        M10_IMPLEMENTATION.md     Current milestone implementation guide
        M11_OPEN_DATA_REGISTER.md Next milestone (do not implement yet)
    research/
        OpenResearchRegister.md   Open research items
        SourceClaims.md           Claims and their sources
```

## Maintaining this README

This README is the entry point, not the doctrine. It is updated **by
proposal, never silently**: when a milestone completes or a new revision
supersedes the active specification, an update to the "Current
Engineering Baseline" table above is proposed, reviewed, and committed
with the milestone. Detailed rules, guardrails, and revision content
live in `/docs` — do not add them here.
