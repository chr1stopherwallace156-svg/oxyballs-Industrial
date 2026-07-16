# EDTS: Entire Vehicle Digital Twin System (Layer 0 Baseline)

This repository contains the authoritative schemas, standards, and registries establishing the baseline data model and coordinate frameworks for the F-450 physical vehicle intake and digital reconstruction.

**Kernel:** `EDTS_KERNEL_VERTICAL_SLICE_READY` — [kernel/EDTS_KERNEL_SCOPE.md](kernel/EDTS_KERNEL_SCOPE.md)  
**Test subject:** `CMP-FORD-SD-DOOR-FL-001` (F-450 Regular Cab FL door)  
**First evidence link:** `EVL-00001` → `SRC-ASSET-00031` (`SUPPORTS_GEOMETRY`, `CANDIDATE`)  
**Architecture:** `EDTS-OS v3` — [EDTS_OS.md](EDTS_OS.md) · [Blueprint](EDTS_OS_ARCHITECTURE_BLUEPRINT.md)  
**Research protocol:** `ACTIVE` v2 — [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md)  
**Confidence %:** `DEPRECATED`  
**Modeling baseline:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`  
**Acceptance:** T01/T02 PASS_SCHEMA · T03–T05 NOT_EXECUTED  
See [STATUS.json](STATUS.json), [kernel/instances/f450_door_fl/](kernel/instances/f450_door_fl/).

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

Also read: [EDTS_OS.md](EDTS_OS.md), [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md), [EDTS_OS_PLATFORM_CONFIGURATOR.md](EDTS_OS_PLATFORM_CONFIGURATOR.md), [TRANSFORM_QUATERNION_CORRECTION_REPORT.md](TRANSFORM_QUATERNION_CORRECTION_REPORT.md), [THREE_CAMERA_AND_WORLD_STANDARD.md](THREE_CAMERA_AND_WORLD_STANDARD.md), [REGRESSION_AUDIT.md](REGRESSION_AUDIT.md), [layers/L01_RESEARCH_DOSSIER_PLAN.md](layers/L01_RESEARCH_DOSSIER_PLAN.md), [layers/L01/README.md](layers/L01/README.md).

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

**L01 — EDTS Kernel vertical slice READY.** Primary subject `CMP-FORD-SD-DOOR-FL-001`. First evidence link EVL-00001 (ASSET-00031). T03–T05 not executed. Geometry freeze blocked. See [kernel/EDTS_KERNEL_SCOPE.md](kernel/EDTS_KERNEL_SCOPE.md).

## Related work

This foundation is a sibling to the Elektron Build Engine documentation on branch `claude/docs-structure-large-projects-b6vxx5`. Where engineering research already exists (Ford BBAS paths, regulatory lanes), L00 cites it but does not duplicate ingestion work.
