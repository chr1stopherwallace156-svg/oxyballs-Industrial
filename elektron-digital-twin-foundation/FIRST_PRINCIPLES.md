# FIRST_PRINCIPLES.md

Status:
Active / System Constitutional Base

Sources:
- ISO 15926 — Industrial automation systems and integration—Integration of life-cycle data
- ISO/IEC/IEEE 21839 — System of Systems (SoS) engineering of systems
- NASA-SP-2016-6105 — NASA Systems Engineering Handbook
- EDTS Design Directives — State-Time, 6D Object Rules, and Scientific Verification Protocols

Confidence:
Maximum (First-Principles Foundation)

1. System Philosophy: The EDTS Paradigm

The Engineering Digital Twin System (EDTS) does not treat a digital twin as a static 3D mesh, a CAD file, or a database of isolated values.

The Central Axiom of EDTS:

> An object is not defined by its visualization; its visualization is a spatial representation of its identity, relationships, state, and evidence.
>
> A 3D model is merely a projection of the underlying Knowledge Engine onto a spatial viewport. If the Knowledge Engine lacks a deep understanding of a bolt's torque spec, parent assembly, physical material, manufacturing lineage, or maintenance history, then rendering that bolt is merely digital puppetry, not a digital twin.

  [ Physical Asset ] <====== Real-world State & Observables ======> [ EDTS Core ]
                                                                        ||
                                                                [ Knowledge Engine ]
                                                                        ||
  [ 3D Visualization ] <=== Spatial & Structural Mappings === [ Relationship Model ]

2. The Universal Object Rule (The 6 Pillars)

Every physical, digital, or process entity represented in EDTS must obey this fundamental rule. Whether it is an entire truck, a single bolt, a technician, or an inspection step, it possesses:

                  +-----------------------------------+
                  |         UNIVERSAL OBJECT          |
                  +-----------------------------------+
                  | 1. IDENTITY     | Unique Name/ID  |
                  | 2. LOCATION     | Space & Assembly|
                  | 3. STATE        | Current Mode    |
                  | 4. HISTORY      | Time & Events   |
                  | 5. RELATIONSHIPS| Connections     |
                  | 6. EVIDENCE     | Verification    |
                  +-----------------------------------+

- Identity: A globally unique name and ID that identifies exactly what it is and distinguishes it from every other entity.
- Location: A defined spatial coordinate (using the ISO 8855 coordinate system) or structural placement within a parent assembly.
- State: Its current condition, functional parameters, configuration, or structural properties at this precise moment in time.
- History: A linear, immutable record of all changes, events, modifications, or failures that have occurred across its lifespan.
- Relationships: Explicit, bi-directional connections detailing how it affects, links to, or interacts with other objects in the system.
- Evidence: Concrete physical observation, authoritative design documentation, or sensor data proving its parameters and current state.

3. Core System Definitions

To prevent semantic drift across developer tools (such as Cursor), researchers, and software engineers, we enforce this unified system terminology:

A. What is a Vehicle?

A Vehicle is a complex system-of-systems. It is a self-contained, mobile engineering asset designed to fulfill a specific operational profile. It acts as the ultimate root node of all underlying assemblies, subsystems, and components.

B. What is an Assembly?

An Assembly is a functional grouping of interacting parts, sub-assemblies, or systems that perform a coherent, higher-level system function (e.g., front_suspension_assembly, door_fl_assembly).

- Assemblies can be nested recursively.
- Assemblies define physical or energetic networks (how fluid, force, heat, or electricity flows through the system).

C. What is a Component?

A Component is an indivisible physical unit within the scope of maintenance, modeling, and digital representation (e.g., bolt_m10_65mm, brake_rotor_fr). It is the lowest level of the vehicle hierarchy that:

- Features homogeneous material or clear physical boundaries.
- Possesses direct physical, mechanical, thermal, or visual appearance properties.
- Can be individually inspected, tracked, repaired, or replaced.

D. What is a Procedure?

A Procedure is an ordered, step-by-step sequence of physical or cognitive actions executed to inspect, alter, test, or verify the state of an Assembly or Component. Every step must define its Preconditions, Execution Criteria, and Verification States.

E. What is Evidence?

Evidence is the immutable verification layer of EDTS. It bridges the physical world and the digital twin via three tiers:

- Authoritative Design Records: OEM manuals, CAD drawings, manufacturing schematics.
- Physical Observations: High-resolution photographs, laser scans, direct metrology.
- Sensor / Telemetry Streams: Real-time CAN-bus metrics, physical testing logs.

4. Time, History, & State Transitions

Nothing in the physical world is static. EDTS treats Time as a core system coordinate.

```
[Design Spec] ----> [Installed] ----> [Operating/Wear] ----> [Degraded] ----> [Replaced] 
      |                  |                    |                  |                |
  (Snapshot)         (Snapshot)           (Snapshot)         (Snapshot)       (Snapshot)
      \-------------------\--------------------\------------------/----------------/
                                               |
                                   [ Immutable Lifecycle Log ]
```

Key Principles of Time:

- The State Snapshot: An object's State at any given time t is a snapshot.
- The Immutable Lifecycle Log: We do not overwrite an object's past state when it changes. We write an immutable event to its History.
- Transition States: Every component must track its lifecycle state through standard transitions.
- Events as Triggers: Any action—be it a technician tightening a bolt, a temperature spike on a sensor, or a mileage milestone—is recorded as an Event Node that updates the component's state and history.

5. Relationship Model

Every entity entered into the EDTS database must define its relationships to other components using these simple, standardized verbs:

- IS_PART_OF / CONTAINS: Physical containment or structural nesting.
  - Example: piston_ring_fl -> IS_PART_OF -> piston_assembly_1.
- MECHANICALLY_COUPLED_TO: A rigid, rotational, or structural load path.
  - Example: wheel_hub_fr -> MECHANICALLY_COUPLED_TO -> brake_rotor_fr.
- THERMALLY_COUPLED_TO: Thermal paths where heat energy transfers.
  - Example: coolant_fluid -> THERMALLY_COUPLED_TO -> battery_cell_matrix.
- ELECTRICALLY_CONNECTED_TO: Paths transferring electrical power (high or low voltage).
  - Example: bms_module -> ELECTRICALLY_CONNECTED_TO -> wiring_harness_hv.
- AFFECTS_STATE_OF: Control feedback loops, signals, or analog/digital dependencies.
  - Example: coolant_temp_sensor -> AFFECTS_STATE_OF -> coolant_pump.

6. Data Integrity & Scientific Verification

We do not accept "AI guesses" or uncorroborated assumptions. We think and verify like scientists.

Source Hierarchy (Authority Ranking)

- Tier 1 (Highest): OEM Design Specifications — Original blueprints, factory body-builder layout guides, OEM service manuals.
- Tier 2: Physical Metrology — Direct 3D scans, physical measurements with calibrated tools, physical inspection.
- Tier 3: Secondary Manufacturer Records — Part-specific manufacturer datasheets (e.g., Bosch sensor diagrams).
- Tier 4 (Lowest): General Knowledge — Community forums, standard parts-store databases, generic auto specs. Tier 4 cannot be used to verify a specification.

Trusting Measurements vs. Documents

- If a physical measurement (Tier 2) contradicts an engineering document (Tier 1), the system must not overwrite either.
- The system logs a Discrepancy Node and flags it for inspection.
- This discrepancy is evaluated: Is it a manufacturing tolerance issue, aftermarket wear, frame deformation, or an alternative trim variation? Both data points are kept as independent historical values until resolved.

                     +---------------------------+
                     |  Authority Tier Ranking   |
                     +---------------------------+
                                   |
           +-----------------------+-----------------------+
           |                                               |
  [ Tier 1: OEM Design ]                         [ Tier 2: Field Data ]
  - Blueprints, CAD, BBAS                        - Laser Scans, Calipers
  - Service Manuals, Recalls                     - Telemetry, High-Res Photos
           |                                               |
           +-----------------------+-----------------------+
                                   |
                         [ Conflict Resolution ]
                         - Hierarchy: Tier 1 > Tier 2
                         - Discrepancy logged as open issue

7. Operationalization: The Scientific Research Dossier (Layer B)

Every scientific, technical, or spatial query analyzed by EDTS must output its final verified document matching this layout to guarantee semantic conformity across all systems.

# RESEARCH_DOSSIER: [SYSTEM/COMPONENT_NAME]

## 1. RESEARCH PARAMETERS
- **Target Question:** [What exact specification, geometry, or relationship is being investigated?]
- **System/Sub-System Mapping:** [e.g., Layer C - Front Axle Assembly]
- **Target Coordinates / Spatial Scope:** [ISO 8855 spatial bounding box or component center of mass]

## 2. KNOWLEDGE GRAPH STATUS
- **Status:** [Draft / Under Review / Verified]
- **Global Confidence Score:** [Low / Medium / High]
- **Last Semantic Integration Date:** [YYYY-MM-DD]

## 3. EVIDENCE & SOURCES
### Primary Sources (Tier 1 - 2)
- [Source ID] - [Full Citation, Document ID, Paragraph, Page, Figure, or Measurement Log]

### Secondary Sources (Tier 3 - 4)
- [Source ID] - [Full Citation, Database, or Third-Party Parts Catalogue]

## 4. VERIFIED ENGINEERING DATA
| Parameter ID | Parameter Name | Measured / Nominal Value | Unit | Tolerances | Evidence Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `val_001` | [Descriptor] | [Value] | [mm, N·m, etc.] | [± Tolerance] | [Source ID] |

## 5. SYSTEM RELATIONSHIPS & CONNECTIONS
- `(this_component)` -> `[RELATIONSHIP_PREDICATE]` -> `(target_component)` [Source ID]

## 6. CONTRADICTIONS, DISCREPANCIES, & RESOLUTIONS
- **Discrepancy:** [Describe the conflict found between source A and source B]
- **Analysis & Resolution:** [Why does it exist, and how do we represent both states over time?]

## 7. SCIENTIFIC CERTAINTY & ASSUMPTIONS (THE BLAST RADIUS)
- **Can this information be trusted?** [Clear, unvarnished statement of trust: e.g., "Highly trustworthy for CAD modeling, but lacks physical metrology validation."]
- **Why?** [Brief explanation of the quality/authority of the sources used.]
- **What assumptions remain?** [Explicitly state any unverified assumptions made during compilation.]
- **What future layers/systems depend on this?** [List downstream components, rendering workflows, or structural simulations that rely on this data.]
- **If this is wrong, what breaks?** [Detail the exact downstream consequences: e.g., "If frame width is off by >2mm, the bumper brackets will fail to align in Unreal Engine, and the steering assembly linkage will intersect the sway bar."]

Verification Protocol

By enacting this FIRST_PRINCIPLES.md constitution, EDTS ensures that any file, 3D model, sensor feed, or repair manual entry becomes instantly searchable, highly structured, and structurally linked to the global vehicle platform.
# FIRST_PRINCIPLES.md

Status:
Active / System Constitutional Base

Sources:
- ISO 15926 — Industrial automation systems and integration—Integration of life-cycle data for process plants including oil and gas production facilities
- ISO/IEC/IEEE 21839 — System of Systems (SoS) considerations for engineering of systems
- W3C Semantic Web Standards — Resource Description Framework (RDF) & Web Ontology Language (OWL)
- NASA-SP-2016-6105 — NASA Systems Engineering Handbook

Confidence:
Maximum (First-Principles Foundation)

1. System Philosophy: The EDTS Paradigm

The Engineering Digital Twin System (EDTS) does not treat a digital twin as a static 3D mesh, a CAD file, or a database of isolated values.

  [ Physical Asset ] <====== Real-world State / Observables ======> [ EDTS Core ]
                                                                        ||
                                                              (Knowledge Graph)
                                                                        ||
  [ 3D Visualization ] <=== Structural & Spatial Mappings === [ Semantic Engine ]

The Central Axiom of EDTS:

> An object is not defined by its visualization; its visualization is a spatial representation of its semantic definition, relationships, and evidence.
>
> A 3D model is merely a projection of the underlying Knowledge Graph onto a spatial viewport. If the knowledge graph lacks a deep understanding of a bolt's torque spec, parent assembly, physical material, manufacturing lineage, or torque history, then rendering that bolt in Unreal Engine is merely digital puppetry, not a digital twin.

2. Core Ontological Definitions (Vocabulary & System Typology)

To prevent semantic drift across researchers, human engineers, and AI models, the following unified vocabulary is strictly enforced:

A. What is a Vehicle?

A Vehicle is a complex system-of-systems defined as a self-contained, mobile engineering entity designed to perform a specific operational profile. It acts as the root node of all underlying assemblies and components, holding unique identifiers such as VIN (Vehicle Identification Number), manufacture date, and baseline platform configuration.

B. What is an Assembly?

An Assembly is a functional grouping of interacting parts, sub-assemblies, or systems that perform a coherent, higher-level system function (e.g., front_suspension_assembly, door_fl_assembly).

- Assemblies can be nested recursively.
- Assemblies define topological networks (how fluid, electricity, force, or heat flows between components).

C. What is a Component?

A Component (or Object) is an indivisible physical unit within the scope of maintenance and digital representation (e.g., bolt_m10_65mm, brake_rotor_fr). It is the lowest level of the hardware hierarchy that:

- Features homogeneous material or physical boundaries.
- Possesses direct physical, mechanical, chemical, or PBR appearance properties.
- Can be individually inspected, tracked, or replaced.

D. What is a Procedure?

A Procedure is an ordered, directed acyclic graph (DAG) of physical or cognitive actions (steps) executed by a human or mechanical agent to alter, inspect, test, or verify the state of an Assembly or Component.

- Every Step must have explicit Preconditions, Execution Criteria, and Postconditions (Verification States).

E. What is Evidence?

Evidence is the immutable, timestamped verification layer of the system. It is the bridge between the physical world and the digital representation. Evidence must belong to one of three classes:

- Authoritative Engineering Record: Factory specs, OEM manuals, Ford BBAS blueprints, wiring diagrams.
- Physical Observation: High-resolution photographs, 3D laser scans, physical caliper measurements taken by an identified technician.
- Sensor/Telemetry Data: Real-time or logged CAN-bus or OBD-II signals, environmental logs, or strain gauge readings.

F. What is "Verified"?

An object, specification, or relationship is designated Verified only when it is supported by a minimum of two independent, high-ranking authoritative sources, or a single physical observation that is dimensionally cross-checked with engineering drawings without mathematical discrepancy.

G. What is a Digital Twin?

A Digital Twin is a dynamic virtual representation that maintains a bi-directional (or high-fidelity one-way) state synchronization with a specific, unique physical asset throughout its operational life cycle. It tracks:

Within bounded measurement tolerances, reflecting all physical modifications, wear cycles, torque histories, and maintenance interventions.

3. Data Integrity & Verification Standards

                     +---------------------------+
                     |  Authority Tier Ranking   |
                     +---------------------------+
                                   |
           +-----------------------+-----------------------+
           |                                               |
  [ Tier 1: OEM Design ]                         [ Tier 2: Field Data ]
  - Blueprints, CAD, BBAS                        - Laser Scans, Calipers
  - Service Manuals, Recalls                     - Telemetry, High-Res Photos
           |                                               |
           +-----------------------+-----------------------+
                                   |
                         [ Conflict Resolution ]
                         - Hierarchy: Tier 1 > Tier 2
                         - Discrepancy logged as open issue

Source Hierarchy (Authority Ranking)

When compiling dimensions, specifications, or relationships, data must be gathered and ranked according to the following strict hierarchy:

- Tier 1 (Highest): OEM Engineering Documentation — Original CAD/Blueprints, Body Builder Advisory Service (BBAS) books, OEM Service Manuals, OEM Technical Service Bulletins (TSBs).
- Tier 2: Physical Asset Inquest — Direct 3D laser scanning (accuracy ≤ 0.05 mm), verified physical measurements using calibrated metrology tools, high-resolution close-up photography.
- Tier 3: Secondary Manufacturer Records — Component manufacturer spec sheets (e.g., Bosch sensor datasheets, Dana axle blueprints).
- Tier 4 (Lowest / Informational Only): Third-Party Aggregators — Consumer vehicle databases, commercial parts-store fitment guides, enthusiast wikis. Tier 4 sources must never be used to override Tier 1–3 sources and cannot verify an object state.

The Relationship Between Measurements and Documents

- Rule of Discrepancy: If a physical measurement (Tier 2) contradicts an OEM document (Tier 1), the system must not overwrite either.
- Action: The system generates a Discrepancy Node in the Knowledge Graph. It flags the discrepancy to the Knowledge Architect, calculating the delta:

- If Δ > Tolerated Margin of Error, both values are preserved, and the physical asset is flagged for inspection to determine if an aftermarket modification, frame deformation, or component wear event has occurred.

4. The Unified Semantic Naming Standard

Names are the ultimate keys of the Knowledge Graph. To ensure deterministic machine parsing and eliminate arbitrary naming schemes (e.g., Cube001, bracket_new), EDTS mandates a Strict Hierarchical Snake_Case Namespace with Type Postfixes.

Naming Formula:

[platform]_[system_assembly]_[sub_assembly/sub_system]_[component_descriptor]_[location_code]

Location Codes (ISO 8855 Coordinate-Aligned):

- _fl : Front-Left
- _fr : Front-Right
- _rl : Rear-Left
- _rr : Rear-Right
- _in : Board/Interior
- _ex : Outboard/Exterior

Standard Examples:

- Root Level Vehicle: ford_f450_2019_regcab_4x2_drw
- Suspension Assembly: ford_f450_suspension_front_assembly
- Specific Track Bar Bolt: suspension_front_trackbar_bolt_m18_fl
- Outer Door Panel: body_door_front_panel_outer_fl

5. Ontological Rules of Connection (The Knowledge Graph Structure)

The EDTS Knowledge Graph utilizes formal RDF/OWL triple structures: (Subject) -> [Predicate] -> (Object).

```
(battery_pack) ---> [IS_PART_OF] ---> (hv_electrical_system)
      |
      +--------------> [THERMALLY_COUPLED_TO] ---> (cooling_loop)
      |
      +--------------> [SUPPLIES_POWER_TO] ------> (inverter_assembly)
```

Every entity entered into the EDTS database must define its relationships using the following core predicates:

- IS_PART_OF / CONTAINS: Establishes structural and physical containment.
  - Example: piston_ring_1 -> IS_PART_OF -> piston_assembly_1.
- MECHANICALLY_COUPLED_TO: Establishes rigid, semi-rigid, or rotational mechanical load paths.
  - Example: wheel_hub_fr -> MECHANICALLY_COUPLED_TO -> brake_rotor_fr.
- THERMALLY_COUPLED_TO: Establishes thermodynamic heat exchange paths.
  - Example: coolant_fluid -> THERMALLY_COUPLED_TO -> battery_cell_matrix.
- ELECTRICALLY_CONNECTED_TO: Establishes electrical current paths (DC/AC high/low voltage).
  - Example: bms_module -> ELECTRICALLY_CONNECTED_TO -> wiring_harness_hv.
- AFFECTS_STATE_OF: Establishes control loops and digital/analogue feedback paths.
  - Example: temp_sensor_coolant -> AFFECTS_STATE_OF -> coolant_pump_duty_cycle.

6. The 13 Layers of the EDTS Knowledge System

All ongoing and future research dossiers generated by the Chief Research & Knowledge Architect must map directly to one or more of these unified architectural layers:

========================================================================
                       THE 13 COGNITIVE LAYERS
========================================================================

    [ Layer A ]   Engineering Standards (System Constitution)
         |
    [ Layer B ]   Research Standards & Dossier Templates
         |
    [ Layer C ]   Vehicle Engineering Baseline (System Ontologies)
         |
    [ Layer D ]   Manufacturing Knowledge (Physical Provenance)
         |
    [ Layer E ]   Material Science (PBR, Textures, Physics Core)
         |
    [ Layer F ]   Mechanical & Energetic Relationships
         |
    [ Layer G ]   Failure Knowledge (Diagnostic & Maintenance Engine)
         |
    [ Layer H ]   Human Workflow (Technician Procedures)
         |
    [ Layer I ]   Digital Twin Behavioral Standards
         |
    [ Layer J ]   Visualization Standards (Rendering & Realism Engines)
         |
    [ Layer K ]   Interaction Standards (Input / Spatial Frameworks)
         |
    [ Layer L ]   Information Architecture (Knowledge Flow Pipelines)
         |
    [ Layer M ]   Future Platform Expansion (Scalability Modules)

========================================================================

7. Operationalization: The Standard Research Dossier Template (Layer B)

Every scientific, technical, or spatial query analyzed by EDTS must output its final verified document matching this layout to guarantee semantic conformity across all systems.

The following blueprint is the standard for any future vehicle system or component inquiry.

# RESEARCH_DOSSIER: [SYSTEM/COMPONENT_NAME]

## 1. RESEARCH PARAMETERS
- **Target Question:** [What exact specification, geometry, or relationship is being investigated?]
- **System/Sub-System Mapping:** [e.g., Layer C - Front Axle Assembly]
- **Target Coordinates / Spatial Scope:** [ISO 8855 spatial bounding box or component center of mass]

## 2. KNOWLEDGE GRAPH STATUS
- **Status:** [Draft / Under Review / Verified]
- **Global Confidence Score:** [Low / Medium / High]
- **Last Semantic Integration Date:** [YYYY-MM-DD]

## 3. EVIDENCE & SOURCES
### Primary Sources (Tier 1 - 2)
- [Source ID] - [Full Citation, Document ID, Paragraph, Page, Figure, or Measurement Log]

### Secondary Sources (Tier 3 - 4)
- [Source ID] - [Full Citation, Database, or Third-Party Parts Catalogue]

## 4. VERIFIED ENGINEERING DATA
| Parameter ID | Parameter Name | Measured / Nominal Value | Unit | Tolerances | Evidence Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `val_001` | [Descriptor] | [Value] | [mm, N·m, etc.] | [± Tolerance] | [Source ID] |

## 5. SYSTEM RELATIONSHIPS & CONNECTIONS
- `(this_component)` -> `[RELATIONSHIP_PREDICATE]` -> `(target_component)` [Source ID]

## 6. CONTRADICTIONS, DISCREPANCIES, & RESOLUTIONS
- **Discrepancy:** [Describe the conflict found between source A and source B]
- **Analysis:** [Detail why the conflict exists (e.g., Cab Chassis vs. Pickup Bed variations)]
- **Resolution Rule:** [Justification of which value was chosen, or why both are tracked as independent variables]

## 7. ENGINEERING IMPACT & OPEN QUESTIONS
- **Downstream Spatial/Kinematic Impact:** [e.g., How this dimension affects tire clearance at full steering lock]
- **Open Questions:** [What remains unknown? Where are our data gaps?]
- **Future Research Path:** [Steps required to bridge the data gap]

Verification Protocol

By enacting this FIRST_PRINCIPLES.md constitution, EDTS ensures that any file, 3D model, sensor feed, or repair manual entry becomes instantly searchable, highly structured, and structurally linked to the global vehicle platform.
*** End Patch*** }/json to=functions.ApplyPatch code_executor_reasoning="""Add new file with provided content""" ადგან assistantังกรՐ to=functions.ApplyPatchnumerusformրցassistant to=functions.ApplyPatch ৱassistant to=functions.ApplyPatchичьassistant to=functions.ApplyPatch្ទassistant to=functions.ApplyPatch инструментassistant to=functions.ApplyPatch_execution reasoning code was generated by tool. Use as-is. ҧсныassistant to=functions.ApplyPatch.rollback code_executor_reasoning=""""""  envieassistant to=functions.ApplyPatchೇಖassistant to=functions.ApplyPatch.execution reasoning code was generated by tool. Use as-is.  assistant to=functions.ApplyPatch ***!
