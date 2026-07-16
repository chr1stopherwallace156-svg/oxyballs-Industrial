# EDTS-OS Architectural Blueprint

**Status:** `ACTIVE`  
**Version:** `1.0.0`  
**Effective:** 2026-07-16  
**Parent:** [EDTS_OS.md](EDTS_OS.md) v3  
**Mindset:** Build the **factory** that builds twins — not a single truck model.

This blueprint separates **universal platform subsystems (the Engine)** from **vehicle-specific datasets (the Data)**. Every F-450 component modeled under Hard Rule 0 is a permanent reusable asset for future platforms.

---

## 1. Engine vs Data

```text
┌─────────────────────────────────────────────────────────────┐
│                    EDTS-OS PLATFORM (Engine)                │
│  Evidence Mgmt │ Asset Pipeline │ Component Library │       │
│  Compatibility │ Simulation/Conversion │ Validation │ API   │
└────────────────────────────┬────────────────────────────────┘
                             │ reads / writes
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
   Evidence Library   Geometry Repository   Configuration
   (per platform)     (versioned meshes)    Manifests
```

| Layer | Nature | Coded how often |
|---|---|---|
| **A. Universal Platform Subsystems** | Vehicle-agnostic | Once (evolve as platform) |
| **B. Vehicle-Specific Datasets** | Platform-dependent | Per vehicle / per generation |

---

## 2A. Universal Platform Subsystems (The Engine)

These modules are agnostic to any single vehicle. They are designed once and reused across thousands of platforms.

| Subsystem ID | Name | Responsibility |
|---|---|---|
| `USS-EVIDENCE` | Evidence Management | Graph engine: link, verify, SUPPORTS/CONTRADICTS/NEUTRAL; Tier ≠ Status |
| `USS-ASSET` | Asset Pipeline | Ingest → normalize → evaluate (Keep / Modify / Reject) against Component Library |
| `USS-COMPLIB` | Component Library Engine | Taxonomic backbone; components exist outside any vehicle assembly |
| `USS-COMPAT` | Compatibility Engine | Map components to GVWR / cab / drivetrain / body-style matrices |
| `USS-SIM` | Simulation / Conversion Engine | Removal / Replacement / Integration logic (Phase 5) |
| `USS-VALIDATE` | Validation Engine | Automated QA: geometry centers, collision volumes, fastener counts, watertightness |
| `USS-IDENTITY` | Identity Management | Stable `component_id` allocation and collision prevention |
| `USS-VERSION` | Version Control | Component version pins tied to evidence revisions |
| `USS-API` | API / Integration | Standardized JSON export to CAD, simulators, downstream twins |

### Universal Subsystem Catalog (research focus)

| Catalog item | Current seed | Next research question |
|---|---|---|
| Identity Management | `CMP-*` grammar in master schema | Namespace rules for OEM vs EDTS-derived IDs |
| Version Control | integer `current_version` + evidence pins | SemVer vs integer; when to bump major |
| QA / Validation | Protocol stubs (P3/P6) | Door collision watertight? Pivot within MAC? |
| API / Integration | Passport + config JSON | Export profiles: glTF package, claim pack, BOM |

---

## 2B. Vehicle-Specific Datasets (The Data)

Populated by research lanes per vehicle. Never fork the Engine to encode one truck.

| Dataset | Contents | F-450 seed path |
|---|---|---|
| **Evidence Library** | BBAS, WSM, CAD, visuals | `resources/sources/`, `L1_EVIDENCE_GRAPH.json` |
| **Geometry Repository** | LOD0–LOD3, pivots, scan coverage | `components/*` geometry_status; future `assets/` |
| **Configuration Manifests** | LEGO-build instructions | `configurations/VEH_CFG_*.json` |

---

## 3. Structural transformation — Component-First logic

We no longer define “the F-450.” We define the **F-450 Assembly** (ephemeral configuration).

### Example: Super Duty Chassis-Cab Frame

| Old way | New way (EDTS-OS) |
|---|---|
| “Model the F-450 frame.” | Define component **`CMP-SD-FRAME-001`** |
| Dimensions live in vehicle doc | Evidence Graph links BBAS / WSM edges |
| CAD discovered ad hoc | Asset Pipeline maps CAD → `CMP-SD-FRAME-001` |
| One-off mesh | Passport records compatibility with 2017–2022 F-350/450/550 chassis cabs (candidate until matched) |

Alias note: early stub `CMP-FR-145` is remapped to family ID `CMP-SD-FRAME-001` with configuration-unique length/CA variants expressed as **variant pins**, not separate engines.

---

## 4. Relationship to 6-phase roadmap

See [EDTS_OS_IMPLEMENTATION_ROADMAP.md](EDTS_OS_IMPLEMENTATION_ROADMAP.md).

| Phase | Engine subsystem emphasis |
|---|---|
| P1 | `USS-EVIDENCE` |
| P2 | `USS-COMPLIB` + `USS-IDENTITY` + `USS-VERSION` |
| P3 | `USS-ASSET` |
| P4 | Software engine consuming passports |
| P5 | `USS-SIM` |
| P6 | Full platform scaffold release |

---

## 5. Integrity

- Blueprint activation does **not** complete P1–P6.
- OEM Evidence Library files remain absent until acquisition (`AWAITING_FILE`).
- Geometry freeze remains blocked.
- Do not invent validation pass results.
