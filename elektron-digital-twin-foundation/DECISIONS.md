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
