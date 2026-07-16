# AGENTS.md — Elektron Digital Twin Foundation

Rules for every AI agent working in `elektron-digital-twin-foundation/`.

## Read order (mandatory)

Before modifying any file, read:

1. [README.md](README.md)
2. [AGENTS.md](AGENTS.md) (this file)
3. [STATUS.json](STATUS.json)
4. [DECISIONS.md](DECISIONS.md)
5. [REQUIREMENTS.md](REQUIREMENTS.md)
6. [ARCHITECTURE.md](ARCHITECTURE.md)
7. [DATA_MODEL.md](DATA_MODEL.md)
8. [THREE_D_SPEC.md](THREE_D_SPEC.md)
9. [QUALITY_STANDARD.md](QUALITY_STANDARD.md)
10. The active layer doc under `layers/`

## Non-negotiables

- **Never invent dimensions.** Unknown values become open questions in [research/OPEN_QUESTIONS.md](research/OPEN_QUESTIONS.md) or assumptions in [research/ASSUMPTIONS.md](research/ASSUMPTIONS.md) — never silent guesses in locked fields.
- **Never skip gates.** A layer advances only when all five gates are recorded in [STATUS.json](STATUS.json) and the layer doc.
- **Never delete evidence.** Research log, decisions, and changelog entries are append-only.
- **L00 must be owner-approved** before L01 geometry work begins. Provisional recommendations are not locks.
- **Ford OEM CAD** obtained via BBAS is internal-use only; do not commit Ford-controlled CAD into this repo without explicit licensing review.
- **Align with Build Engine** where applicable — do not contradict confirmed engineering doctrine on the docs branch without a new decision entry.

## Gate workflow

For each layer:

1. Complete layer scope per the layer doc.
2. Self-check against [QUALITY_STANDARD.md](QUALITY_STANDARD.md).
3. Record gate results in the layer doc and [STATUS.json](STATUS.json).
4. Append [CHANGELOG.md](CHANGELOG.md).
5. If a lasting choice was made, append [DECISIONS.md](DECISIONS.md).
6. Update [STATUS.json](STATUS.json) `active_layer` and `next_action`.

## Research protocol

- New findings → [research/RESEARCH_LOG.md](research/RESEARCH_LOG.md) using [templates/RESEARCH_ENTRY.md](templates/RESEARCH_ENTRY.md).
- Unresolved items → [research/OPEN_QUESTIONS.md](research/OPEN_QUESTIONS.md).
- Working assumptions → [research/ASSUMPTIONS.md](research/ASSUMPTIONS.md) with confidence and expiry.

## Approval

Owner approval for L00 and major reference changes uses [templates/APPROVAL_RECORD.md](templates/APPROVAL_RECORD.md) and is recorded in [APPROVAL_GATES.md](APPROVAL_GATES.md).

## Status files

| File | Purpose |
|------|---------|
| [STATUS.json](STATUS.json) | Machine-readable phase, layer, gates |
| [CHANGELOG.md](CHANGELOG.md) | Human-readable change history |
| [DECISIONS.md](DECISIONS.md) | Locked decisions |
| [APPROVAL_GATES.md](APPROVAL_GATES.md) | Owner sign-off records |
