# Five Core Memory Artifacts — Canonical Structure

**Status:** `CANONICAL_MEMORY_ARCHITECTURE_ADOPTED`  
**Change:** `CHANGE-0006`

One file must not try to be developer session restore, executive summary,
ecosystem export, and immutable rationale at once. Capture uses five
single-responsibility artifacts:

```text
               ┌─────────────────────────────────────────────────────────┐
               │             ELEKTRON CAPTURE REPOSITORY                 │
               └────────────────────────────┬────────────────────────────┘
                                            │
   ┌───────────────────┬────────────────────┼────────────────────┬───────────────────┐
   │                   │                    │                    │                   │
   ▼                   ▼                    ▼                    ▼                   ▼
┌─────────────┐  ┌─────────────┐  ┌──────────────────┐  ┌─────────────────┐  ┌────────────────────┐
│ PROJECT_    │  │ CAPTURE_    │  │ REPOSITORY_      │  │ DECISION_       │  │ ELEKTRON KNOWLEDGE │
│ STATE.md    │  │ IMPL_HANDOFF│  │ MEMORY.md        │  │ LOG.md          │  │ PACKAGE (EKP)      │
└─────────────┘  └─────────────┘  └──────────────────┘  └─────────────────┘  └────────────────────┘
 Executive        Developer /      Repository           Architecture         Ecosystem Export
 Summary          Session          Timeline /           Rationale &          Package (.zip /
 (< 2 min)        Memory           Journal              Trade-offs           .bundle / hashes)
```

| # | Artifact | Path | Audience | Cadence |
|---|---|---|---|---|
| 1 | Executive snapshot | `PROJECT_STATE.md` | Leads, coordinators | Milestone / gate transitions |
| 2 | Session memory | `CAPTURE_IMPLEMENTATION_HANDOFF.md` | Next developer / agent | Every PR / commit series |
| 3 | Living journal | `REPOSITORY_MEMORY.md` | Retrospectives, audits | Significant events |
| 4 | Rationale log | `Docs/Decisions/DECISION_LOG.md` | Architects, maintainers | When deciding |
| 5 | Ecosystem export | `dist/EKP-CAPTURE-*/` + `ekp-capture-<sha>.zip` | Other subsystems | Knowledge snapshot |

## Repository layout

```text
Elektron Capture/
├── CHANGELOG.md
├── PROJECT_STATE.md
├── CAPTURE_IMPLEMENTATION_HANDOFF.md
├── REPOSITORY_MEMORY.md
├── Docs/
│   ├── Changes/
│   ├── Decisions/DECISION_LOG.md
│   ├── Handoffs/
│   └── Reviews/
└── KNOWLEDGE_PACKAGE/          # Stage-1 stubs for EKP assembly
    ├── Overview.md
    ├── Current Status/
    ├── Inventory/
    ├── Instructions/
    └── …
```

Full EKP assembly + digests: `make ekp-prepare` → commit → `make ekp-package`  
Contract: `Docs/Governance/ELEKTRON_KNOWLEDGE_PACKAGE.md`

## EMKP (future)

Each subsystem emits its own EKP. A future **Elektron Master Knowledge Package**
aggregates latest EKPs (Capture, Builder, EDTS, Cloud, …) into one platform snapshot.
