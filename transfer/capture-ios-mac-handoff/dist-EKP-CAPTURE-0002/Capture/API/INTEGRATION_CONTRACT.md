# INTEGRATION_CONTRACT.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Path A portable packages + future Path B API |
| Supersedes | (none) |

## Purpose

Define how `elektron-capture-ios` connects to EDTS **without** sharing source trees or databases.

```
Physical vehicle
  → Calibrated capture (this app)
  → Spatial evidence package
  → EDTS (interpret / verify)
  → Build Engine (deterministic rules)
```

## Path A — Portable evidence package (first)

Self-describing session directory ingested by an EDTS importer.

See `EVIDENCE_PACKAGE_STANDARD.md` and golden fixture `GOLDEN_CAPTURE_001`.

## Path B — Versioned API (later)

Illustrative operations (not live):

| Operation | Intent |
|---|---|
| `GET capture plan` | Data-driven requirements for a configuration |
| `POST session` | Create server-side session handle |
| `POST artifact` | Resumable artifact upload |
| `POST manifest` | Sealed manifest submit |
| `POST session seal` | Seal session |
| `GET verification result` | Normalized intake status |
| `GET configuration profile` | Nominal CFG metadata |
| `GET component dictionary` | Component catalog references |

Normalized intake statuses this app may surface:

`EVIDENCE_ACCEPTED` · `EVIDENCE_REJECTED` · `MORE_CAPTURE_REQUIRED` · `ENGINEERING_REVIEW_REQUIRED`

This app must **never** surface Build Engine authorizations.

## Non-goals

- Direct PostgreSQL / graph / object-store credential use
- Shared ORM models with `edts-core`
- Importing Build Engine as a Swift package

## Compatibility record

Recorded in `INTEGRATION_STATUS.md` and `Contracts/Compatibility/`.

## Change control

Silent contract edits are forbidden. Use `Docs/Integration/CROSS_REPO_REQUEST_TEMPLATE.md` (`XREPO-CAP-EDTS-####`).
