# Elektron Knowledge Package (EKP)

**Status:** `EKP_CONTRACT_DEFINED`  
**Subsystem:** Capture (`elektron-capture-ios`)  
**Future aggregate:** Elektron Master Knowledge Package (EMKP) — out of scope here

An **EKP** is not a coding-session handoff. It is a complete snapshot of a subsystem’s
knowledge at a point in time so another AI, developer, or Elektron subsystem can
answer: *“Tell me everything about Capture.”* without replaying thousands of commits.

---

## Artifact hierarchy (do not collapse)

| Artifact | File / output | Audience | Cadence |
|---|---|---|---|
| Implementation handoff | `IMPLEMENTATION_HANDOFF.md` | Next coding session | Every implementation |
| Executive snapshot | `PROJECT_STATE.md` | “What’s going on?” (< 2 min) | Every implementation |
| Repository memory | `REPOSITORY_MEMORY.md` | Process/status diary | Significant events |
| Decision history | `Docs/Decisions/DECISION_LOG.md` | Why choices were made | When deciding |
| Changelog / change records | `CHANGELOG.md`, `Docs/Changes/` | What shipped | Every change |
| Distribution handoff | `dist/HANDOFF-XXXX/` | Verified zip/bundle of tip | When packaging commits |
| **EKP** | `dist/EKP-CAPTURE-XXXX/` + `capture-ekp-*.zip` | Other subsystems / full understanding | When a knowledge snapshot is required |

---

## EKP contents (Capture)

Assembled under `dist/EKP-CAPTURE-<id>/Capture/`:

```text
Capture/
├── Overview.md
├── Architecture.md          # or Docs/Architecture/*
├── Specifications/
├── Research/
├── Changelog/               # CHANGELOG.md + Docs/Changes/
├── Decisions/               # Docs/Decisions/
├── Current Status.md        # from PROJECT_STATE.md
├── Roadmap.md               # pointers / known roadmap docs
├── Known Issues.md
├── Open Gates.md
├── Evidence/                # selected Docs/Evidence + Validation
├── Validation/
├── Instructions/            # runbooks / freeze protocol
├── Build/                   # Package.swift pointers, Makefile help
├── Git/                     # REPOSITORY_STATE, recent commits summary
├── Handoffs/                # IMPLEMENTATION_HANDOFF + Docs/Handoffs
├── Decision History/        # copy of Decisions
├── API/                     # Docs/Integration when present
├── Schemas/                 # pointers / selected schema docs
├── Package Inventory/
├── Repository State/
├── Recent Commits.md
├── Recent PRs.md
└── Memory/                  # REPOSITORY_MEMORY.md
```

Envelope root also includes:

```text
dist/EKP-CAPTURE-<id>/
├── Capture/ …                 # tree above
├── capture-ekp-<commit>.zip   # full EKP tree archive
├── capture-ekp-<commit>.bundle
├── VERIFICATION_REPORT.md
└── SHA256SUMS.txt
```

---

## Two-stage EKP execution

Same anti-circularity rule as handoffs:

```bash
make ekp-prepare    # refresh living docs + KnowledgePackage/ index (commit)
make ekp-package    # clean HEAD → dist/EKP-CAPTURE-<id>/
```

`dist/` is gitignored. Never commit EKP binaries into the source tree.

---

## Relationship to EMKP (future)

Each subsystem (Capture, EDTS, Builder, Cloud, …) publishes its own EKP.  
A future **Elektron Master Knowledge Package** aggregates the latest EKP from every
subsystem into one platform snapshot. Capture only produces `EKP-CAPTURE-*`.

---

## Status invariants (must appear in every Capture EKP)

```text
PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE
BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
IR_0001_EXECUTION_NOT_YET_AUTHORIZED
```

Until those gates clear, the EKP must not claim Phase 1 frozen or Specs baseline-approved.
