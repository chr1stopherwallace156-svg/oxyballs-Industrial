# EDTS: Entire Vehicle Digital Twin System (Layer 0 Baseline)

This repository contains the authoritative schemas, standards, and registries establishing the baseline data model and coordinate frameworks for the F-450 physical vehicle intake and digital reconstruction.

**Readiness:** `L00_READY_FOR_PHYSICAL_INTAKE`  
**Closure:** `L00_CLOSURE_REJECTED` — physical asset intake required before re-closure  
See [STATUS.json](STATUS.json) for machine-readable project state.

---

## Required Reading Order

All systems, agents, and engineers must consume the core specification files in the following sequence:

1. **[FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md)**  
   Establishes the copyability, structure, and machine-readability rules for all mathematical and tolerance statements.

2. **[registries/UNIT_REGISTRY.json](registries/UNIT_REGISTRY.json)**  
   The controlled vocabulary of all measurement units.

3. **[registries/COORDINATE_FRAME_REGISTRY.json](registries/COORDINATE_FRAME_REGISTRY.json)**  
   Defines spatial systems, handedness, and core platform datums.

4. **[registries/TRANSFORM_REGISTRY.json](registries/TRANSFORM_REGISTRY.json)**  
   Provides machine-readable 4x4 matrix transforms for engine, CAD, and runtime rendering.

5. **[schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json](schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json)**  
   Core JSON schema with Draft 7 conditional validations for validating engineering claims.

6. **[DATUM_CONSTRUCTION_STANDARD.md](DATUM_CONSTRUCTION_STANDARD.md)**  
   Repeatable physical metrology routines for establishing vehicle origins.

7. **[CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md](CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md)**  
   Formulas and tables governing dynamic packaging buffers.

### Extended governance reading

After the core sequence above, read:

- [AGENTS.md](AGENTS.md) — agent operating rules
- [DECISIONS.md](DECISIONS.md) — locked decisions
- [L00_CONFIRMED_CORRECTIONS.md](L00_CONFIRMED_CORRECTIONS.md) — accepted corrections
- [L00_PROVISIONAL_CORRECTIONS.md](L00_PROVISIONAL_CORRECTIONS.md) — provisional dimensional claims
- [L00_FINAL_GAP_REPORT.md](L00_FINAL_GAP_REPORT.md) — remaining gaps (GAP-001 through GAP-004)
- [VIN_AND_LABEL_CAPTURE_PROTOCOL.md](VIN_AND_LABEL_CAPTURE_PROTOCOL.md) — physical intake protocol

---

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

**L00 — Reference Lock** (document phase complete; physical intake pending). See [STATUS.json](STATUS.json).

## Related work

This foundation is a sibling to the Elektron Build Engine documentation on branch `claude/docs-structure-large-projects-b6vxx5`. Where engineering research already exists (Ford BBAS paths, regulatory lanes), L00 cites it but does not duplicate ingestion work.
