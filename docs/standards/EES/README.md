# ELEKTRON Enterprise Standards (EES) — `ELEK-QUAL-STD-0000`

Quick-start orientation for the EES volume. This directory is the **canonical,
version-controlled home** of the ELEKTRON Enterprise Standards. The hosted HTML page
is a *presentation artifact*; the authoritative source is the Markdown here.

## What this is

The EES is the foundational constitution governing all technical, operational,
architectural, and business documentation across the ELEKTRON enterprise ecosystem
(all eight volumes of the ELEKTRON Enterprise Architecture, EEA).

## Required reading (in order)

1. [`ELEK-QUAL-STD-0000.md`](ELEK-QUAL-STD-0000.md) — **the standard itself** (master).
2. [`GUARDRAILS.md`](GUARDRAILS.md) — the non-negotiable "never do these things".
3. [`ARCHITECTURAL_INTENT.md`](ARCHITECTURAL_INTENT.md) — why it is shaped this way.
4. [`HANDOFF.md`](HANDOFF.md) — current status, open risks, next steps.

## Current status — DRAFT (not Validated)

| | |
|---|---|
| Lifecycle state (repo) | **DRAFT** — see [`document-metadata.json`](document-metadata.json) |
| Authored target status | "Validated Release (v1.0)" — *target, not achieved* |
| Why not Validated | §7.2 sign-off chain (Author → Director of Quality → ERB) not recorded; no validation evidence attached (Principle 1) |
| Introduced by | Decision [`D-018`](../../DECISION_REGISTER.md) |

Promotion to VALIDATED is gated on the §7.2 approvals plus recorded evidence. Until
then, treat every figure and status inside as a **working target**, per the EES's own
lifecycle rules (§3.1).

## Directory contents

```
docs/standards/EES/
├── ELEK-QUAL-STD-0000.md      Master standard (canonical source)
├── document-metadata.json     Machine-readable governance metadata
├── README.md                  This file
├── ARCHITECTURAL_INTENT.md    Rationale, trade-offs, design philosophy
├── CHANGELOG.md               Change history for this volume
├── DECISIONS.md               ADR index for the EES volume
├── GUARDRAILS.md              Explicit negative constraints
├── HANDOFF.md                 Status, open risks, next steps
├── ROADMAP.md                 Near / medium / long-term plan
├── FUTURE_WORK.md             Speculative / uncommitted proposals
├── KNOWN_LIMITATIONS.md       Honest gap analysis, pending validation
├── TRACEABILITY.md            Source-content → repo-artifact mapping
├── LESSONS_LEARNED.md         Empirical findings
├── schemas/
│   ├── document-metadata.schema.json
│   └── canonical-object-id.schema.json
└── generated/
    ├── README.md              "generated — do not edit by hand"
    └── ELEK-QUAL-STD-0000.v1.0.html   Presentation artifact (derived)
```

## Relationship to the rest of the repository

The EES is a **new, separate initiative** from the Build Engine (`engine/`) and the
Revision 07 / M10 work. It governs documentation discipline; it does not change any
engineering value, resolve any Open Data Requirement, or make any approval/safety
claim. It is subordinate to the repository's
[Engineering Constitution](../../ENGINEERING_CONSTITUTION.md).
