# AGENTS.md — EDTS AI Agent Guidelines

Rules for every AI agent, LLM engine, code generation pipeline, and automated validation loop operating inside `elektron-digital-twin-foundation/`.

## Read order (mandatory)

Before modifying any file, read:

1. [EDTS_OS.md](EDTS_OS.md) — **EDTS-OS v3 constitution** (Hard Rule 0 — Component First)
2. [kernel/EDTS_KERNEL_SCOPE.md](kernel/EDTS_KERNEL_SCOPE.md) — **Minimum Viable Kernel** (near-term validation spine)
3. [EDTS_OS_ARCHITECTURE_BLUEPRINT.md](EDTS_OS_ARCHITECTURE_BLUEPRINT.md) — Engine vs Data + universal subsystems
4. [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md) — research / evidence runtime core (v2+)
5. [README.md](README.md) — required reading order for core specifications
6. [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md)
7. [AGENTS.md](AGENTS.md) (this file)
8. [STATUS.json](STATUS.json)
9. [DECISIONS.md](DECISIONS.md)
10. [REQUIREMENTS.md](REQUIREMENTS.md)
11. [ARCHITECTURE.md](ARCHITECTURE.md)
12. [DATA_MODEL.md](DATA_MODEL.md)
13. [THREE_D_SPEC.md](THREE_D_SPEC.md)
14. [QUALITY_STANDARD.md](QUALITY_STANDARD.md)
15. The active layer doc under `layers/`

## Operational directives

### 1. Adhere to the Formula and Symbol Standard

You must strictly follow the rules in [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

- Never output LaTeX in isolation.
- Always output a copyable, plain-text version of any formula inside a `text` code block.
- Define every variable and provide its associated unit key from [registries/UNIT_REGISTRY.json](registries/UNIT_REGISTRY.json).
- Translate all mathematical operators (e.g. `>`, `<`, `+/-`) into explicit plain-language equivalents.

### 2. Guard the coordinate orientation baseline

Ensure transforms match [registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json](registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json).

- Asset export: `TF-ISO-TO-GLTF-ASSET` with `quaternion_wxyz = [-0.5, 0.5, 0.5, 0.5]` (TF-FAIL-001 corrected)
- Three.js world: identity from glTF (`THREE_WORLD_FRAME`); aim cameras via [registries/CAMERA_VIEW_PRESET_REGISTRY.json](registries/CAMERA_VIEW_PRESET_REGISTRY.json)
- Unreal: `TF-ISO-TO-UNREAL` (scale 0.1 mm to cm with Y reflection)

**Never use** V1–V3 transform registries. Do not claim runtime certification while `TRANSFORM_TEST_RESULTS.json` shows `NOT_EXECUTED`. See [TRANSFORM_QUATERNION_CORRECTION_REPORT.md](TRANSFORM_QUATERNION_CORRECTION_REPORT.md).

### 3. Use claim schema v6 for engineering claims

Prefer [schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json](schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json) and modular `schemas/claim/*` modules.

### 4. EDTS-OS component-first operations

- Allocate IDs via [`registries/COMPONENT_IDENTITY_REGISTRY.json`](registries/COMPONENT_IDENTITY_REGISTRY.json) before new passports.
- Follow version bump rules in [`schemas/edts-os-platform-master.schema.json`](schemas/edts-os-platform-master.schema.json).
- Vehicles are ephemeral configs in [`configurations/`](configurations/).
- Geometry / materials / runtime live on [`components/`](components/) passports.
- Parameter queries run against [`layers/L01/L1_EVIDENCE_GRAPH.json`](layers/L01/L1_EVIDENCE_GRAPH.json).
- **Do not** invent confidence percentages (deprecated).
- **Do not** promote edges to `NORMALIZED` / passports to `FROZEN` without file evidence + lifecycle completion.

## Non-negotiables

- **Obey EDTS_OS.md + EDTS_RESEARCH_PROTOCOL.md** — Hard Rule 0, taxonomy, Hard Rules 1–10, expanded lifecycle, Evidence Graph.
- **Never invent dimensions, page quotes, or hashes.** Prefer `UNKNOWN` / `AWAITING_FILE` / `REQUIRES ADDITIONAL EVIDENCE` (Hard Rule 6).
- **Never skip gates.** A layer advances only when all five gates are recorded in [STATUS.json](STATUS.json) and the layer doc.
- **Never delete evidence.** Research log, decisions, and changelog entries are append-only.
- **L00 must be owner-approved** before L01 geometry freeze. Provisional Team C adaptations are not locks.
- **Ford OEM CAD** obtained via BBAS is internal-use only; do not commit Ford-controlled CAD into this repo without explicit licensing review.
- **Prefer asset audit-and-correct** over from-scratch rebuilds when graded assets exist (Hard Rule 10).
- **Align with Build Engine** where applicable — do not contradict confirmed engineering doctrine on the docs branch without a new decision entry.

## Gate workflow

For each layer:

1. Complete layer scope per the layer doc.
2. Self-check against [QUALITY_STANDARD.md](QUALITY_STANDARD.md).
3. Record gate results in the layer doc and [STATUS.json](STATUS.json).
4. Append [CHANGELOG.md](CHANGELOG.md).
5. If a lasting choice was made, append [DECISIONS.md](DECISIONS.md).
6. Update [STATUS.json](STATUS.json) `active_layer` and `next_action`.

## Research & OS protocol

- **OS constitution:** [EDTS_OS.md](EDTS_OS.md) (ACTIVE v3)
- **Research protocol:** [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md) (ACTIVE v2)
- Evidence Graph → [layers/L01/L1_EVIDENCE_GRAPH.json](layers/L01/L1_EVIDENCE_GRAPH.json)
- Component passports → [components/](components/)
- Vehicle configs → [configurations/](configurations/)
- Teams A–D → [layers/L01/L1_PARALLEL_TEAMS.md](layers/L01/L1_PARALLEL_TEAMS.md)
- Legacy parameter DB (confidence deprecated) → [layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json](layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json)
- New findings → [research/RESEARCH_LOG.md](research/RESEARCH_LOG.md) using [templates/RESEARCH_ENTRY.md](templates/RESEARCH_ENTRY.md).
- Unresolved items → [research/OPEN_QUESTIONS.md](research/OPEN_QUESTIONS.md).
- Working assumptions → [research/ASSUMPTIONS.md](research/ASSUMPTIONS.md) with taxonomy Assumption (no confidence %).
- Research tolerances and measurements → [RESEARCH_STANDARD.md](RESEARCH_STANDARD.md) and [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

## Approval

Owner approval for L00 and major reference changes uses [templates/APPROVAL_RECORD.md](templates/APPROVAL_RECORD.md) and is recorded in [APPROVAL_GATES.md](APPROVAL_GATES.md).

## Status files

| File | Purpose |
|------|---------|
| [STATUS.json](STATUS.json) | Machine-readable phase, layer, gates |
| [CHANGELOG.md](CHANGELOG.md) | Human-readable change history |
| [DECISIONS.md](DECISIONS.md) | Locked decisions |
| [APPROVAL_GATES.md](APPROVAL_GATES.md) | Owner sign-off records |
