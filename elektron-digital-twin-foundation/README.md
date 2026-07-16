# EDTS: Entire Vehicle Digital Twin System (Layer 0 Baseline)

This repository contains the authoritative schemas, standards, and registries establishing the baseline data model and coordinate frameworks for the F-450 physical vehicle intake and digital reconstruction.

**Readiness:** `L1_EXTERIOR_RESEARCH_FOUNDATION_READY`  
**L00 residual:** `L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY` (closure REJECTED; runtime transforms NOT_EXECUTED)  
**L01 geometry:** BLOCKED — research documentation only  
See [STATUS.json](STATUS.json), [layers/L01/README.md](layers/L01/README.md), and [L00_TRUE_RUNTIME_READINESS_REPORT.md](L00_TRUE_RUNTIME_READINESS_REPORT.md).

---

## Required Reading Order

All systems, agents, and engineers must consume the core specification files in the following sequence:

1. **[FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md)**  
   Establishes the copyability, structure, and machine-readability rules for all mathematical and tolerance statements.

2. **[registries/UNIT_REGISTRY_V3_CORE_PROPOSAL.json](registries/UNIT_REGISTRY_V3_CORE_PROPOSAL.json)**  
   Core unit vocabulary (SI bases: length, mass, time, electric current, temperature, amount, luminous intensity).

3. **[registries/COORDINATE_FRAME_REGISTRY.json](registries/COORDINATE_FRAME_REGISTRY.json)**  
   Frames including `GLTF_ASSET_FRAME` and `THREE_WORLD_FRAME`.

4. **[registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json](registries/TRANSFORM_REGISTRY_V4_PROPOSAL.json)**  
   Transform graph. Quaternion corrected (TF-FAIL-001). **Do not use** V1–V3.

5. **[schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json](schemas/CLAIM_SCHEMA_ROOT_V6_PROPOSAL.json)**  
   Modular claim schema root (`schemas/claim/*`).

6. **[DATUM_CONSTRUCTION_STANDARD.md](DATUM_CONSTRUCTION_STANDARD.md)**  
   Repeatable physical metrology routines for establishing vehicle origins.

7. **[CLEARANCE_STANDARD_V2_PROPOSAL.md](CLEARANCE_STANDARD_V2_PROPOSAL.md)**  
   Formula-compliant clearance envelope rules (CLR-001, CLR-002).

Also read: [TRANSFORM_QUATERNION_CORRECTION_REPORT.md](TRANSFORM_QUATERNION_CORRECTION_REPORT.md), [THREE_CAMERA_AND_WORLD_STANDARD.md](THREE_CAMERA_AND_WORLD_STANDARD.md), [REGRESSION_AUDIT.md](REGRESSION_AUDIT.md), [layers/L01_RESEARCH_DOSSIER_PLAN.md](layers/L01_RESEARCH_DOSSIER_PLAN.md), [layers/L01/README.md](layers/L01/README.md).

### Extended governance reading

After the core sequence above, read:

- [AGENTS.md](AGENTS.md) — agent operating rules
- [DECISIONS.md](DECISIONS.md) — locked decisions
- [L00_CONFIRMED_CORRECTIONS.md](L00_CONFIRMED_CORRECTIONS.md) — accepted corrections
- [L00_PROVISIONAL_CORRECTIONS.md](L00_PROVISIONAL_CORRECTIONS.md) — provisional dimensional claims
- [L00_PRE_INTAKE_READINESS_REPORT.md](L00_PRE_INTAKE_READINESS_REPORT.md) — final gate assessment
- [VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md](VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md) — Layer 1 visual capture (authorized)
- [ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md](ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md) — Layer 2 metrology (provisional)

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
