# Elektron Digital Twin Foundation

Authoritative documentation scaffold for building a layered, gate-governed 3D digital twin of Elektron Industrial's gas-to-EV conversion reference vehicle.

## Start here

Agents and humans must read these files **in order** before any layer work:

1. [AGENTS.md](AGENTS.md) — operating rules
2. [STATUS.json](STATUS.json) — machine-readable project state
3. [DECISIONS.md](DECISIONS.md) — locked decisions
4. [REQUIREMENTS.md](REQUIREMENTS.md) — what the twin must deliver
5. [ARCHITECTURE.md](ARCHITECTURE.md) — system structure
6. [DATA_MODEL.md](DATA_MODEL.md) — entities and relationships
7. [THREE_D_SPEC.md](THREE_D_SPEC.md) — 3D asset rules
8. [QUALITY_STANDARD.md](QUALITY_STANDARD.md) — acceptance criteria

## Layer progression

Every layer passes five gates before advancing:

| Gate | Question |
|------|----------|
| Visual | Does it look correct at review distance? |
| Dimensional | Do critical dimensions match the reference? |
| Structural | Are mounts, interfaces, and hierarchy sound? |
| Interaction | Do disassembly, selection, and views work? |
| Documentation | Is provenance, status, and handoff complete? |

| Layer | Name | Doc |
|-------|------|-----|
| L00 | Reference Lock | [layers/L00_REFERENCE_LOCK.md](layers/L00_REFERENCE_LOCK.md) |
| L01 | Exterior | [layers/L01_EXTERIOR.md](layers/L01_EXTERIOR.md) |
| L02 | Chassis | [layers/L02_CHASSIS.md](layers/L02_CHASSIS.md) |
| L03 | OEM Mechanical | [layers/L03_OEM_MECHANICAL.md](layers/L03_OEM_MECHANICAL.md) |
| L04 | Disassembly | [layers/L04_DISASSEMBLY.md](layers/L04_DISASSEMBLY.md) |
| L05 | Battery | [layers/L05_BATTERY.md](layers/L05_BATTERY.md) |
| L06 | EV Propulsion and Charging | [layers/L06_PROPULSION_CHARGING.md](layers/L06_PROPULSION_CHARGING.md) |
| L07 | Wiring and Cooling | [layers/L07_WIRING_COOLING.md](layers/L07_WIRING_COOLING.md) |
| L08 | Workflow and Evidence | [layers/L08_WORKFLOW.md](layers/L08_WORKFLOW.md) |
| L09 | Diagnostics and Telemetry | [layers/L09_DIAGNOSTICS.md](layers/L09_DIAGNOSTICS.md) |
| L10 | Spatial Presentation | [layers/L10_SPATIAL_PRESENTATION.md](layers/L10_SPATIAL_PRESENTATION.md) |

## Current stage

**L00 — Reference Lock** (in progress). See [STATUS.json](STATUS.json).

## Related work

This foundation is a sibling to the Elektron Build Engine documentation on branch `claude/docs-structure-large-projects-b6vxx5`. Where engineering research already exists (Ford BBAS paths, regulatory lanes), L00 cites it but does not duplicate ingestion work.
