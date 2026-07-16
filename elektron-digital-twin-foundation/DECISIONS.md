# DECISIONS.md

Append-only record of digital twin foundation decisions.

## DT-D001 — Provisional L00 reference vehicle

- **Date:** 2026-07-16
- **Status:** **BLOCKED** — superseded by configuration reconciliation 2026-07-16; **do not treat as locked**
- **Context:** L00 requires a single canonical reference before any 3D work. Elektron's Build Engine research targets Ford Super Duty F-450/F-550 (Class 4/5). Marketing materials also cite light-duty F-150. One vehicle must be locked first.
- **Decision (provisional):**
  - **2019 Ford F-450 Super Duty XL**
  - Regular Cab, 8 ft Styleside, dual rear wheel (DRW)
  - 4x2
  - Wheelbase **141.6 in** (Regular Cab pickup)
  - Stock body — no commercial upfit
  - Stock **6.7L Power Stroke diesel** as the OEM configuration to model removal from
  - Stock 19.5 in DRW steel wheels
- **Rationale:**
  - Aligns with Build Engine L1 lane (Super Duty BBLB, frame alteration, fleet GVWR class)
  - Supports Extended Range / fleet conversion tier (GVWR > 10,000 lb, FMVSS 305a scope)
  - Ford BBAS publishes Super Duty BBLB/BEMM paths (CS-05, CS-07, CS-10 on docs branch)
  - Regular Cab + 8 ft bed maximizes accessible engine bay and frame rail length for conversion packaging studies
  - 4x2 reduces first-pass complexity; 4x4 variant documented as future derivative (DT-D001-A)
- **Alternatives considered:**
  - **2017 Ford F-150 SuperCab 6.5 ft 4x2 145 in WB** — better match to Standard Conversion marketing tier and lighter donor pool; deferred as DT-D001-B variant
  - **2019 F-550 chassis cab** — higher GVWR headroom; deferred until upfit/body type is chosen
- **Consequences:**
  - **Blocked 2026-07-16:** CONFIGURATION_RECONCILIATION found pickup/chassis-cab ambiguity; OEM conflict on F-450 Regular Cab pickup; see DT-D005
  - No L01 work until owner selects Candidate C1, P1, or P2

## DT-D005 — Configuration reconciliation: reference blocked

- **Date:** 2026-07-16
- **Status:** Accepted (finding — not a vehicle lock)
- **Context:** Provisional DT-D001 combined pickup dimensions (141.6 in WB, 8 ft bed) with F-450 while EDTS targets commercial chassis-cab / work-truck platform.
- **Decision:**
  1. Result = **`REFERENCE_CONFIGURATION_BLOCKED`**
  2. Provisional spec is **internally inconsistent** with chassis-cab framing
  3. As F-450 **pickup**, Regular Cab 141.6 in is **disputed** (KBB vs OEM pickup table)
  4. **Candidate C1** (chassis cab 145.3/60) documented as aligned with work-truck intent — **not auto-selected**
  5. Dimension import deferred until platform locked
- **Consequences:** L00 remains open; L01 blocked; no BBAS table bulk import

## DT-D002 — Tiered geometry and accuracy strategy

- **Date:** 2026-07-16
- **Status:** Accepted (methodology — independent of vehicle choice)
- **Context:** Full-vehicle sub-millimeter scan is costly; conversion engineering needs high accuracy only at interfaces.
- **Decision:**
  1. **Primary envelope:** Ford OEM dimension tables and vehicle-specific BBLB where obtainable
  2. **Secondary verification:** Targeted LiDAR/photogrammetry on the physical reference unit at mounting interfaces, engine bay, and frame rails
  3. **Accuracy tiers (mm):** mounting interfaces ±2; powertrain envelope ±5; exterior cosmetic ±10
- **Consequences:** THREE_D_SPEC and QUALITY_STANDARD reference these tiers; scans are scoped, not whole-vehicle by default.

## DT-D003 — Licensing posture for OEM geometry

- **Date:** 2026-07-16
- **Status:** Accepted (pending legal review for BBAS terms)
- **Context:** Ford BBAS CAD and layout books are license-restricted.
- **Decision:**
  - OEM CAD stays **out of this git repo** unless counsel approves
  - Derived meshes and dimension tables with provenance may live in `assets/` after review
  - Public-facing twin uses Elektron-owned or derived geometry only
- **Consequences:** Geometry source chain must be documented per component in DATA_MODEL.

## DT-D006 — Layer 0 closure rejected (adversarial audit)

- **Date:** 2026-07-16
- **Status:** Accepted (finding — closure not authorized)
- **Context:** Research governance adversarial audit (`L00_ADVERSARIAL_AUDIT.md`) deconstructed proposed Layer 0 parameters and found blocking errors in powertrain ratings, coordinate frame labeling, metrology tolerances, IP assertions, and unexecuted evidence (SRC-005).
- **Decision:**
  1. Layer 0 closure = **`L00_CLOSURE_REJECTED`**
  2. `L00_CLOSURE_REPORT.md` demoted to **UNDER_REVIEW**
  3. Six claims registered in `L00_CLAIM_ERROR_REGISTER.json` (4 BLOCKING, 1 MAJOR, 1 MINOR)
  4. Correction plan published in `L00_CORRECTION_PLAN.md`
  5. `COORDINATE_SYSTEM_STANDARD.md` **deprecated** — superseded by `COORDINATE_SYSTEM_CORRECTION_PROPOSAL.md`
  6. Universal ≤ 0.05 mm metrology tolerance **rejected** — adopt MAC classes per `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md`
  7. Chassis cab vocational powertrain = **330 hp @ 2,600 rpm / 750 lb-ft @ 2,000 rpm** (not 450/935 pickup rating) — pending Tier 1 verification
  8. SRC-005 demoted to **PLANNED**
  9. Claim registry schema v2 proposed in `CLAIM_REGISTRY_SCHEMA_V2_PROPOSAL.json`
- **Consequences:**
  - No Layer 1 work until corrections applied and owner feedback received
  - All new spatial claims must declare `coordinate_frame_id` per schema v2 proposal
  - Scan/IP language must use `EDTS_CAPTURE` + `NOT_EVALUATED` redistribution status until counsel review

## DT-D007 — Governance refactor: registries, schemas, physical intake readiness

- **Date:** 2026-07-16
- **Status:** Accepted (structural refactor — closure still rejected)
- **Context:** Correction-quality review formalized machine-readable registries, coordinate transforms, datum construction protocols, and conditional claim validation to prevent overconfidence cascade.
- **Decision:**
  1. **Confirmed corrections accepted** — `L00_CONFIRMED_CORRECTIONS.md` (powertrain, SRC-005, IP metadata)
  2. **Provisional dimensional claims** — `L00_PROVISIONAL_CORRECTIONS.md` (WB/CA/AF, rear axle) under review
  3. **Claim registry core schema v4** — `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json` supersedes v2/v3 proposals
  4. **Platform profiles split** — `F450_PLATFORM_PROFILE_PROPOSAL.json` (general) + `EDTS_REFERENCE_VEHICLE_PROFILE_PROPOSAL.json` (locked reference)
  5. **Coordinate orientation** — `EDTS_ISO_ALIGNED_VEHICLE_FRAME` provisionally accepted; `EDTS_MODELING_FRAME` rejected
  6. **Datum construction** — `DATUM_CONSTRUCTION_STANDARD.md` supersedes prior datum tables
  7. **Measurement classes** — `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md` provisionally accepted (Class A–D)
  8. **Registries published** — `UNIT_REGISTRY.json`, `COORDINATE_FRAME_REGISTRY.json`, `TRANSFORM_REGISTRY.json`
  9. **Physical intake ready** — `L00_READY_FOR_PHYSICAL_INTAKE`; document phase complete
  10. **L00 closure remains REJECTED** — requires physical asset intake per `L00_FINAL_GAP_REPORT.md`
- **Consequences:**
  - All new claims must use `source_unit_id` / `canonical_unit_id` from `UNIT_REGISTRY.json`
  - Frame transforms must reference `TRANSFORM_REGISTRY.json` (column-major, XYZW quaternions)
  - Unresolved items tracked in `L00_UNRESOLVED_REGISTER.json` (UNRES-001, UNRES-002)
  - Historical inapplicable claims preserved in `registries/HISTORICAL_CLAIM_REGISTRY.json`

## DT-D008 — Mathematical correction audit (transforms, formulas, clearance)

- **Date:** 2026-07-16
- **Status:** Accepted (blocking errors corrected)
- **Context:** Formula compliance audit found template violations in clearance standard, glTF quaternion/matrix inconsistency, and fatal Unreal scale factor (100.0 instead of 0.1 for mm-to-cm).
- **Decision:**
  1. `FORMULA_COMPLIANCE_AUDIT.md` — complete and enforced
  2. `CLEARANCE_STANDARD_V2_PROPOSAL.md` — supersedes clearance v1; formulas in `registries/FORMULA_REGISTRY.json`
  3. `registries/TRANSFORM_REGISTRY_V2_PROPOSAL.json` — validated transforms; v1 marked REJECTED_DO_NOT_USE
  4. `TRANSFORM_VALIDATION_REPORT.md` + `registries/COORDINATE_BASIS_TESTS.json` — basis vector test matrix
  5. Unreal scale_factor corrected to **0.1** (mm to cm); glTF scale **0.001** (mm to m)
  6. `DATUM_CONSTRUCTION_STANDARD.md` — tolerances templated per formula standard
  7. `DATUM_STATE_MODEL_PROPOSAL.md` — datum class hierarchy (DSN, SUP, FIX, KIN)
  8. `schemas/CLAIM_REGISTRY_CORE_SCHEMA_V5_PROPOSAL.json` — supersedes v4 (oneOf value structure)
  9. `schemas/PHYSICAL_ASSET_INTAKE_SCHEMA_V2_PROPOSAL.json` — intake with omission/error states
  10. `VISUAL_REFERENCE_INTAKE_PROTOCOL.md` — authorized for Layer 1
  11. `ENGINEERING_METROLOGY_INTAKE_PROTOCOL.md` — provisional for Layer 2
  12. Readiness: **`L00_READY_FOR_VISUAL_REFERENCE_INTAKE`**
- **Consequences:**
  - Implementation parsers must use TRANSFORM_REGISTRY_V2 only
  - L01 visual exterior work may begin visual intake protocol when vehicle available
  - L02 engineering metrology remains blocked until vehicle receipt

## DT-D009 — glTF asset vs Three.js scene frame separation

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Prior GLTF_RUNTIME_FRAME conflated official glTF 2.0 asset coordinates (+Y up, +Z forward, -X right / +X left) with Three.js WebGL viewing space (-Z forward).
- **Decision:**
  1. `GLTF_ASSET_FRAME` — official glTF 2.0 asset authoring/packaging frame (`GLTF_FRAME_CORRECTION.md`)
  2. `THREE_SCENE_FRAME` — Three.js default viewing space (`THREE_RUNTIME_FRAME_STANDARD_PROPOSAL.md`)
  3. `TRANSFORM_REGISTRY_V3_PROPOSAL.json` — authoritative: `TF-ISO-TO-GLTF-ASSET`, `TF-ISO-TO-THREE-SCENE`, `TF-ISO-TO-UNREAL`
  4. `COORDINATE_BASIS_TESTS_V2.json` — active test matrix (all pass)
  5. V2 transform registry superseded; V1 remains REJECTED
  6. `UNIT_REGISTRY_V2_PROPOSAL.json` — UNIT-DEGC, UNIT-COULOMB, milliohm/megaohm naming
  7. `PHYSICAL_ASSET_INTAKE_SCHEMA_V3_PROPOSAL.json` — VIN status dependencies; six DRW tire pressures
  8. `VISUAL_REFERENCE_INTAKE_PROTOCOL_V2.md` — authorized; flexible hardware guidelines
  9. Claim schema test fixtures under `schemas/tests/`
  10. Readiness: **`L00_VISUAL_INTAKE_ONLY_READY`**
- **Consequences:**
  - Asset export must use TF-ISO-TO-GLTF-ASSET, not the old TF-ISO-TO-GLTF mapping
  - Three.js loaders may apply TF-ISO-TO-THREE-SCENE for root placement
  - L00 remains visual-intake-only; engineering metrology still L2-gated

## DT-D010 — Regression audit: quaternion TF-FAIL-001 and runtime honesty

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Quaternion `[0.5, 0.5, 0.5, 0.5]` for TF-ISO-TO-GLTF-ASSET did not match the correct rotation matrix. Three.js world was conflated with camera presentation. Runtime tests had never been executed.
- **Decision:**
  1. Correct quaternion to `[-0.5, 0.5, 0.5, 0.5]` (equiv. `[0.5, -0.5, -0.5, -0.5]`) — TF-FAIL-001 CORRECTED
  2. `TRANSFORM_REGISTRY_V4_PROPOSAL.json` — graph registry; validation_status NOT_EXECUTED
  3. `THREE_WORLD_FRAME` identity to glTF; camera presets in `CAMERA_VIEW_PRESET_REGISTRY.json`
  4. Verification tree: specs, known_failures, PENDING results — no fabricated passes
  5. Modular claim schema V6 under `schemas/claim/`
  6. Intake schema V4; unit registry V3 (SI-aligned canonical UNIT-M)
  7. Measurement classes remain provisional targets
  8. Readiness: **`L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY`**
- **Consequences:**
  - Do not claim runtime transform certification until TRANSFORM_TEST_RESULTS.json shows PASSED
  - Do not use TRANSFORM_REGISTRY_V3 quaternions
  - Prefer camera presets over corrective root transforms for Three.js viewing

## DT-D011 — L00 specification freeze; L01 research planning authorized

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Final L00 specification refinements: clean quaternion report, dynamic camera presets, provisional test profiles, conditional VIN intake, SI base dimensions with electric current.
- **Decision:**
  1. L00 specification frozen at readiness `L00_VISUAL_INTAKE_READY_RUNTIME_NOT_READY`
  2. Camera presets v1.1.0 — parametric relative to `VEHICLE_VISUAL_CENTER` / bounding radius
  3. Unit registry V3 Core — SI bases include electric current (A); charge is derived
  4. Intake V4 — VIN `oneOf` + evidence-bound certification fields
  5. Claim types and value formats restored in modular schemas
  6. L01 research dossier planning authorized; geometry production remains blocked
  7. First L01 research track: footprint/envelope dimensional mappings before pose landmarks
- **Consequences:**
  - Begin `layers/L01_RESEARCH_DOSSIER_PLAN.md` track 1
  - Do not claim runtime transform certification until tests execute
  - Do not invent L01 dimensions

## DT-D012 — L1 exterior visual reference research foundation

- **Date:** 2026-07-16
- **Status:** Accepted (superseded in phase by DT-D013)
- **Context:** L00 architectural runtime work is frozen. Scope shifts entirely to Layer 1 visual reference research for locked Candidate C1 (2019 F-450 Chassis Cab, Regular Cab, 4x2, DRW, 145.3/60, bare cab-and-chassis).
- **Decision:**
  1. Land complete L1 exterior research package under `layers/L01/`
  2. Readiness banner (initial): **`L1_EXTERIOR_RESEARCH_FOUNDATION_READY`**
  3. Object hierarchy, draft object/landmark registries, view matrix, coverage plan, surface/wheel/glass/material dossiers, detail allocation, acceptance standard, open questions, and gap analysis are the research foundation
  4. Evidence statuses remain DRAFT / PROVISIONAL — no brochure-to-VERIFIED promotion without archived Tier 1 sources
  5. Front axle remains `FRONT_AXLE_ASSEMBLY` (RESEARCH_REQUIRED: monobeam vs twin-I-beam)
  6. L01 geometry / mesh production remains **BLOCKED**
  7. Next research: archive BBLB/fleet/T&RA sources; footprint/envelope claim extraction; resolve open questions
- **Consequences:**
  - Active layer moves to L01 research (not production)
  - L00 closure remains REJECTED; runtime transform certification remains NOT_EXECUTED
  - Do not invent missing dimensions to close gaps

## DT-D013 — L1 adversarial audit; factual verification required

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Adversarial audit of L1 draft found unverified numeric claims, configuration conflicts, and an invalid PBR metalness on powdercoat. Gate cannot advance to visual-reference baseline lock.
- **Decision:**
  1. Status → **`L1_EXTERIOR_RESEARCH_DRAFT_COMPLETE`**
  2. Phase → **`L1_FACTUAL_VERIFICATION_REQUIRED`**
  3. Gate → **`L1_REQUIRES_MORE_REFERENCE_DATA`**
  4. Accept `L1_ADVERSARIAL_SOURCE_AUDIT.md`, claim register CLM-001…015, conflict register CNF-001/002
  5. Prefer V2 hierarchy / object registry / landmark registry / acceptance standard; capture station grid for chassis rails
  6. Correct FRAME powdercoat metalness to **0.0** (dielectric); keep roughness provisional
  7. Humility protocol: front axle stays `OBJ-FRONT-AXLE-ASSEMBLY` / `CONFIGURATION_UNRESOLVED` despite AUTHORITATIVE monobeam ranking until physical inspection
  8. Reclassify hub-cap landmarks as `VISUAL_POSE_LANDMARK` (not engineering datums)
  9. Geometry production remains **BLOCKED**
- **Consequences:**
  - Do not treat DOCUMENT_SUPPORTED claims as VERIFIED until hashed archives + physical cross-check
  - Do not use V1 object/landmark registries for new work
  - Next: factual verification track per `L1_FINAL_GAP_REPORT.md`

## DT-D014 — L1 reference acquisition queue; blocked by source access

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Adversarial gaps cannot close without retrieved OEM pages and a configuration-matched physical unit. Modeling remains suspended.
- **Decision:**
  1. Activate `L1_REFERENCE_ACQUISITION_QUEUE.md` (document → public media → VIN → measure → controlled capture/scan)
  2. Register proposed sources `SRC-L1-001`…`003` with `PENDING_PAGES` / provisional publication identifiers
  3. Bind extractions `EXT-L1-101`…`105`, gap matrix `GAP-L1-001`…`004`, shot/measurement/selection checklists, public image manifest
  4. Gate verdict: **`L1_BLOCKED_BY_SOURCE_ACCESS`** (evidence gate `L1_REQUIRES_MORE_REFERENCE_DATA` retained)
  5. Source baseline unlock only via `L1_SOURCE_BASELINE_CLOSURE_CRITERIA.md`
  6. Publication numbers, example listing URLs, and VIN pattern filters are acquisition targets — not verified facts
  7. Geometry production remains **BLOCKED**
- **Consequences:**
  - Priority 1 is BBAS / Order Guide / Workshop Manual archive + hash + page extraction
  - Do not commit copyrighted OEM PDFs without licensing clearance
  - Example public URLs must be replaced before use as evidence

## DT-D015 — Empirical acquisition schemas; strip placeholders

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Planning templates risked theoretical assumptions via invented publication IDs, page coordinates, and VIN folklore. Alignment needed before files/VINs enter the pipeline.
- **Decision:**
  1. Source registry: `exact_title` / `publication_number` / `revision_date` = **null**; `acquisition_status: NOT_ACQUIRED`; `metadata_status: UNVERIFIED`
  2. Extraction plan uses **keywords only**; page/table/quote/values live solely in `L1_OEM_DOCUMENT_EXTRACTION_RESULTS.json`
  3. Bind structural measurement definitions (`front_track_measurement`, `front_overall_tire_width`, `front_wheel_center_distance`, `rear_frame_width`) + uncertainty framework
  4. Candidate grading: GRADE-A / B / C / REJECT; VIN position rules marked `DOCUMENT_VERIFICATION_REQUIRED`
  5. Photo standards: no “orthographic” claims; perspective minimization; ≥35 mm equiv; chessboard distortion calibration
  6. Scan priority: cab shell first; fine castings deferred (Priority 7)
  7. Modular closure rules: `physical_fact_closure`, `project_specification_closure`, `visual_acceptance_closure`
  8. Gate remains **`L1_BLOCKED_BY_SOURCE_ACCESS`**; acquisition activity **`READY`**
- **Consequences:**
  - Do not pre-fill extraction results with expected numbers
  - Project visual tolerances are not assumed OEM blueprint tolerances
  - GRADE-B cab/front units remain usable without full unmodified rear frame

## DT-D016 — Source Pack 01 engaged; geometry freeze still blocked

- **Date:** 2026-07-16
- **Status:** Superseded in part by DT-D017 (authenticity reset)
- **Context:** Empirical null-metadata templates are superseded by Source Pack 01 intake: verified titles/pub numbers/revision dates, recorded SHA-256 hashes, page-level extractions, and updated structural claims.
- **Decision:**
  1. Milestone **`L1_SOURCE_PACK_01`** engaged via `L1_SOURCE_ARTIFACT_REGISTRY.json` + populated extraction results
  2. Gates: **`L1_DOCUMENT_ACQUISITION_READY`** / **`L1_PUBLIC_REFERENCE_SEARCH_READY`**
  3. Modeling baseline: **`NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`**
  4. Claims CLM-L1-001…005 are **DOCUMENT_SUPPORTED** with **physical_asset_confirmation: PENDING**
  5. Front axle preferred subtype: `MONOBEAM_WIDE_TRACK_NON_DRIVING` (EXT-L1-101); CNF-001 → DOCUMENT_SUPPORTED_PHYSICAL_PENDING
  6. OEM PDFs remain **out of git**; `hash_recompute_status: NOT_RECOMPUTED_IN_THIS_ENVIRONMENT` until vault mount
  7. Unverified optical/material inventories quarantined in `L1_UNVERIFIED_VALUES_REGISTER.json`
  8. Geometry / mesh production remains **BLOCKED**
- **Consequences:**
  - Dimensional framework may cite DOCUMENT_SUPPORTED values for planning
  - Do not freeze meshes until GRADE-A/B physical confirmation
  - Public harvests stay NOT_EVALUATED / redistribution prohibited pending review

## DT-D017 — Source Pack 01 authenticity reset to candidate templates

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Prior Source Pack 01 engagement asserted SHA-256 hashes, page coordinates, and verbatim quotes that were not computed from local file bytes. Authenticity audit requires reset.
- **Decision:**
  1. Verdict **`L1_SOURCE_PACK_01_NOT_VERIFIED`**; action **`RESET_TO_CANDIDATE_TEMPLATES`**
  2. Add file manifest, page evidence manifest, extraction verification register, correction log, authenticity audit
  3. Nullify hashes, exact metadata, page/excerpt fields; demote DOCUMENT_SUPPORTED claims
  4. Retain candidate hunt labels as `reported_*` / analytical candidates only
  5. Front axle / PCD may remain `GENERAL_PLATFORM_ARCHITECTURE_SUPPORTED` where public marketing supports architecture — not OEM page-verified
  6. Defer bushing durometer / clearcoat thickness noise to L2 (`DEFERRED_TO_L2`)
  7. Authorize parallel **Lane A** (3D asset sourcing) and **Lane B** (independent spec audit)
  8. Modeling baseline remains **`NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`**; geometry **BLOCKED**
- **Consequences:**
  - Do not restore DOCUMENT_SUPPORTED without file_exists + executed hash + page evidence
  - Lane A/B must not invent OEM page citations
  - DT-D016 engagement artifacts are superseded where they conflict with this reset

## DT-D018 — EDTS Research Protocol activated; Teams A–D parallel execution

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Need a single runtime core for research taxonomy, evidence levels, candidate promotion, confidence scoring, and parallel work without inventing precision.
- **Decision:**
  1. Activate **`EDTS_RESEARCH_PROTOCOL.md` v1.0.0** as binding master research protocol
  2. Taxonomy required: Evidence / Probability / Assumption / Placeholder / Inference
  3. Hard Rules 1–10 enforced; AGENTS.md read-order updated to protocol first
  4. Weighted confidence engine in `L1_PARAMETER_VERIFICATION_DATABASE.json` (unverified sources weight 0)
  5. Register Level D visual sources SRC-L1-004/005 as VERIFIED_ACTIVE for architecture only
  6. Teams A–D active per `L1_PARALLEL_TEAMS.md`; ASSET-00031 Grade B under Efficiency Principle
  7. Team C provisional adapt allowed only under Placeholder/Probability labels
  8. Geometry freeze remains **`NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`**
  9. Do not use calendar-day effort claims in efficiency docs — use subsystem keep/discard/build effort classes
- **Consequences:**
  - front_axle_layout confidence 55% (Level D active); rear_frame_rail_width confidence 0% until BBAS PDF verifies
  - Multi-source assembly is the intended twin construction model
  - From-scratch cab rebuild is disfavored while Grade B assets are available and licensed
  - **Superseded in part by DT-D019** for confidence % and vehicle-centric framing

## DT-D019 — EDTS-OS v3: Component First, Evidence Graph, Component Passports

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Version 2 engineering-process framing compiled vehicles as isolated models and mixed authority with confidence percentages. Need an operating-system architecture centered on reusable components and decoupled evidence processing.
- **Decision:**
  1. Activate **EDTS-OS v3** via `EDTS_OS.md`; elevate **Hard Rule 0 — Component First** to constitutional level
  2. Bump `EDTS_RESEARCH_PROTOCOL.md` to **v2.0.0**
  3. **Deprecate confidence percentages** for all new work
  4. Decouple **Evidence Tier (A–F)** from **Verification Status** (expanded lifecycle: DISCOVERED → … → FROZEN)
  5. Adopt bidirectional **Evidence Graph** (`layers/L01/L1_EVIDENCE_GRAPH.json`) as Hard Rule 5 machine form
  6. Adopt **Component Passports** under `components/` and ephemeral vehicle configs under `configurations/`
  7. Populate operational graph in `OPERATIONAL_HONEST` mode — OEM edges remain `AWAITING_FILE` until PDFs exist; illustrative NORMALIZED page-quote examples are templates only
  8. Door passport `CMP-SD-044-L` starts `DRAFT_CANDIDATE` (not FROZEN); hinge axes null until calibrated
  9. Teams A–D retargeted to passport + graph lifecycle stages; Team D must not claim runtime engine completed without loader + tests
  10. Geometry freeze remains **`NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`**
- **Consequences:**
  - Parameter queries traverse Evidence Graph relationships (SUPPORTS / CONTRADICTS / NEUTRAL)
  - `L1_PARAMETER_VERIFICATION_DATABASE.json` becomes legacy bridge with deprecated confidence fields
  - Cross-platform reuse (E-450, Transit) planned via configurator, not monolithic forks
  - Source Pack 01 authenticity reset (DT-D017) remains in force — no fabricated page evidence

## DT-D020 — EDTS-OS Architecture Blueprint + Identity/Version Master Schema

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Inflection from project (model one F-450) to platform (engine that produces twins). Need Engine vs Data separation, 6-phase roadmap, and first master schema focus on identity + versioning.
- **Decision:**
  1. Activate **`EDTS_OS_ARCHITECTURE_BLUEPRINT.md` v1.0.0** — Universal Platform Subsystems vs Vehicle-Specific Datasets
  2. Activate **`EDTS_OS_IMPLEMENTATION_ROADMAP.md`** phases P1–P6 with honest status (P1/P2 SEEDED, P4 IN_PROGRESS, P3/P5/P6 PLANNED)
  3. Proceed with **master schema first** on `USS-IDENTITY` + `USS-VERSION` (`schemas/edts-os-platform-master.schema.json`, `schemas/component-identity.schema.json`)
  4. Seed `registries/COMPONENT_IDENTITY_REGISTRY.json` and `registries/EDTS_OS_PLATFORM_INSTANCE.json`
  5. Remap frame stub: **`CMP-FR-145` → deprecated alias of `CMP-SD-FRAME-001`** with variant pin `VAR-145_3-WB-60-CA`
  6. F-450 remains an **assembly configuration**, not a monolithic model authority
  7. Do not mark Asset Pipeline / Validation / Conversion subsystems COMPLETE without schemas + evidence
- **Consequences:**
  - New passports require registry allocation before file creation
  - Version bumps require evidence pins; metadata-only edits use correction log
  - Research focus includes universal subsystem catalog (identity, versioning, QA, API)
  - Geometry freeze still blocked; Source Pack 01 still NOT_VERIFIED

## DT-D021 — EDTS Kernel vertical slice (F-450 FL door)

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Pivot from speculative OS breadth to Minimum Viable EDTS Kernel — composable schemas validated on one real component.
- **Decision:**
  1. Activate **`kernel/EDTS_KERNEL_SCOPE.md`** — status `EDTS_KERNEL_VERTICAL_SLICE_READY`
  2. Adopt six composable kernel schemas + passport minimum under `schemas/kernel/`
  3. Primary test subject: **`CMP-FORD-SD-DOOR-FL-001`** (alias from `CMP-SD-044-L`)
  4. Seed instances under `kernel/instances/f450_door_fl/`
  5. **First evidence link = `EVL-00001`** → `SRC-ASSET-00031` / `SUPPORTS_GEOMETRY` / `CANDIDATE` (not BBAS)
  6. BBAS link `EVL-00002` is a secondary `AWAITING_FILE` stub only
  7. Defer telemetry, EV conversion, fleet APIs, multi-year lookup engines (`KERNEL_DEFERRED_FEATURES.md`)
  8. Acceptance T01–T05 define slice completeness; T03–T05 remain `NOT_EXECUTED` until runtime/mesh
- **Consequences:**
  - Kernel schemas are the near-term validation spine; OS blueprint remains long-range
  - Visually reusable / dimensionally inaccurate assets stay `PROVISIONAL_VISUAL` (KQ-001)
  - No ENGINEERING_VERIFIED door without KQ-002 threshold
  - Geometry freeze still blocked

## DT-D022 — Exact-vehicle isolation kernel revision

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Prior kernel incorrectly applied `model_year_range` 2017–2019 and platform-family applicability to the door. Violates exact-vehicle isolation.
- **Decision:**
  1. Enforce **Exact Vehicle Isolation Standard** (every year/model/cab/drivetrain/WB/CA distinct; no automatic inheritance)
  2. Replace proposal schemas with Draft **2020-12** universal `schemas/*.schema.json` (no OEM assumptions)
  3. Store populated records only under `examples/2019_f450/`
  4. Canonical door = **`CMPINST-VEH000001-DOOR-FL`** bound to **`VEH-000001`** + **`CFG-000001`**
  5. Exact vehicle = 2019 Ford F-450 Chassis Cab Regular Cab 4x2 DRW 145.3/60 only
  6. Reusable definitions remain empty/`NOT_EVALUATED` until proven; cross-vehicle comparisons live outside exact records
  7. Interaction = `VISUAL_PREVIEW_ONLY`; disassembly `NOT_VERIFIED`; runtime `NOT_EXECUTED`
  8. No evidence links to non-existent source IDs (`evidence_link_ids: []`)
  9. Supersede `kernel/instances/f450_door_fl` and `schemas/kernel/*PROPOSAL*`
- **Consequences:**
  - Phase `EDTS_EXACT_VEHICLE_KERNEL_READY`
  - Prior `CMP-FORD-SD-DOOR-FL-001` / year-range applicability must not be extended

## DT-D023 — Constitutional Exact Vehicle Isolation (universal kernel law)

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Exact-vehicle isolation must be a core architectural law for every OEM and configuration, not a Ford/2019 coding preference.
- **Decision:**
  1. Elevate **HR-EVI** (`documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md`) to constitutional status beside Hard Rule 0
  2. **Similarity is never evidence**; cross-vehicle comparison allowed; inheritance prohibited
  3. Kernel remains OEM-agnostic; vehicle data only under `examples/<manufacturer>/<exact_configuration>/`
  4. Relocate seed dataset to `examples/ford/2019_f450_regularcab_4x2_drw/`
  5. Add empty scaffolds for Tesla / Toyota / Chevrolet to prove kernel immutability
  6. Add configuration / evidence / component-instance architecture docs + `KERNEL_VALIDATION_RULES.md`
  7. Add negative isolation suite `verification/isolation/run_isolation_tests.py` (must pass)
  8. Clarify Hard Rule 0: reusable definitions exist, but binding is never automatic
  9. Protocol → v2.1.0; EDTS-OS → v3.1.0
- **Consequences:**
  - Phase `EDTS_UNIVERSAL_EXACT_VEHICLE_KERNEL_READY`
  - Isolation suite is a gate for kernel readiness claims
  - Scales from any passenger car to any commercial EV without kernel forks

## DT-D024 — EDTS Kernel v1.0.0-rc1

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Package Exact-Vehicle Isolation as Kernel release candidate with immutable IDs, URN schema identities, and configuration fingerprinting.
- **Decision:**
  1. Stamp kernel **`1.0.0-rc1`** (`KERNEL_MANIFEST.json`)
  2. Schema `$id` = `urn:edts:schema:<name>:v1` (Draft 2020-12)
  3. Adopt **`EDTS_CFG_FINGERPRINT_SHA256_V1`** for exact configuration identity
  4. Seed silo remains `examples/ford/2019_f450_regularcab_4x2_drw/` (`VEH-000001` / `CFG-000001` / `CMPINST-VEH000001-DOOR-FL`)
  5. Example records carry `urn:edts:example:*` `$id`s
  6. Acceptance Tests V2 Isolation/Integrity/Visualization/Interaction + fingerprint check
  7. Phase status **`EDTS_EXACT_VEHICLE_KERNEL_READY`**
- **Consequences:**
  - Multi-year applicability remains prohibited
  - Cross-vehicle data only via decoupled comparison records
  - Isolation suite remains a readiness gate

## DT-D025 — Kernel v1.0.0-rc1 validation package (RFC8785 fingerprint + Instance Resolver)

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Finalize rc1 schemas/examples and define fingerprint + runtime isolation standards; runtime resolver tests not yet executed.
- **Decision:**
  1. Adopt entity/definition ID patterns (`VEH|ASMDEF|CMPDEF`, `CMPINST`, `CFG`)
  2. Canonical seed path `examples/2019_f450/` with 7 examples
  3. Fingerprint via RFC 8785–style canonical JSON, mm lengths, uppercase text, `sha256:` digest
  4. Runtime lookups must use `getComponent(vehicle_instance_id, configuration_id, component_instance_id)`; canonical_name lookup forbidden
  5. Record runtime tests as `NOT_EXECUTED` in `KERNEL_TEST_RESULTS.json`
  6. Phase = **`EDTS_EXACT_VEHICLE_KERNEL_VALIDATION_PENDING`** until KRN-ISO-001..003 execute
- **Consequences:**
  - Structural suite may pass while overall validation remains pending
  - No claim of runtime isolation enforcement until harness exists

## DT-D026 — Executable kernel validation (v1.0.0-rc1)

- **Date:** 2026-07-16
- **Status:** Accepted
- **Context:** Replace summary-based readiness with executed validation artifacts.
- **Decision:**
  1. Record initial file audit before corrections
  2. Revise fingerprint to JCS (RFC 8785) + whitelist + UNKNOWN preservation; prohibit abbreviated digests
  3. Execute fingerprint, Draft 2020-12 schema, isolation, and referential-integrity suites
  4. Write results under `verification/results/`
  5. Set final status only from executed outcomes
- **Consequences:**
  - Final status after execution: see `verification/results/KERNEL_VALIDATION_REPORT.md`
