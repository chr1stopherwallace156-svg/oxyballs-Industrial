# EDTS-OS — Engineering Digital Twin Operating System

**Status:** `ACTIVE`  
**Architecture version:** `3.1.0`  
**Effective Date:** 2026-07-16  
**Supersedes process posture:** Version 2 (Engineering Process) for system framing  
**Binding protocol:** [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md) v2.2.0+  
**Constitutional isolation law:** [documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md)  
**Blueprint:** [EDTS_OS_ARCHITECTURE_BLUEPRINT.md](EDTS_OS_ARCHITECTURE_BLUEPRINT.md)  
**Roadmap:** [EDTS_OS_IMPLEMENTATION_ROADMAP.md](EDTS_OS_IMPLEMENTATION_ROADMAP.md)  
**Master schema:** [schemas/edts-os-platform-master.schema.json](schemas/edts-os-platform-master.schema.json)  
**Platform instance:** [registries/EDTS_OS_PLATFORM_INSTANCE.json](registries/EDTS_OS_PLATFORM_INSTANCE.json)

**Mindset:** The kernel is a **universal factory**. Every vehicle is an **isolated, evidence-backed dataset**. The kernel never changes; only datasets change.

---

## Mission shift

Version 2 treated work as a **vehicle engineering process**.  
Version 3 treats the product as an **operating system**: reusable, versioned, passport-backed **components** assembled by ephemeral **vehicle configurations**, with every numeric claim resolved through a bidirectional **Evidence Graph**.

```text
Vehicle configuration  →  points to component graph
Component passport     →  geometry / materials / runtime / provenance
Evidence graph         →  parameter ↔ source relationships (SUPPORTS / CONTRADICTS / NEUTRAL)
```

---

## Hard Rule 0 — Component First (Constitutional)

> The EDTS models **components**, not vehicles. A vehicle is an assembly of verified components with configuration-specific relationships. Every reusable component must exist independently of any single vehicle and may be shared across multiple compatible platforms.

Implications:

1. Do not compile a monolithic mesh authority per marketing “platform family.”
2. Every assembly element on a vehicle is a **vehicle-bound component instance** first.
3. Optional reusable definitions may exist, but cross-vehicle use requires proven interchangeability + comparison records — **never automatic inheritance** (HR-EVI).
4. Configuration files / datasets are **thin, isolated** — they do not own dimensional truth without evidence, and they do not inherit from siblings.
5. **Component-First Acquisition + Hard Rule 11:** do not *assume* a complete exact-vehicle asset always exists — and do not *forbid* searching for one. Prefer an exact complete-vehicle package (OEM CAD, scans, photogrammetry, supplier CAD, etc.) when available; otherwise acquire component-by-component. Admit each component only after verification; never inherit a marketplace package as automatic silo truth. (Protocol Hard Rule 0 corollary + Hard Rule 11; catalog = `layers/L01/L1_LANE_A_ASSET_CATALOG.json`.)
6. **Component Passport** is the primary truth surface for a component instance (evidence / geometry / interaction status + links). Prefer passport depth over speculative schema expansion.
7. **Hard Rule 13 — Research Never Stops at One Source:** a `SRC-CAND-*` discovery triggers parallel research lanes (document / service / parts / dimensional / visual) until Evidence Graph saturation or explicit `PRIMARY_SOURCE_REQUIRED`. Immutable IDs live under `research/src_candidates/`. Research Confidence (RC) prioritizes the search queue only — it is not engineering verification %.

---

## Core schema upgrades

| Concern | V2 posture | V3 posture |
|---|---|---|
| Confidence % | Weighted percent on parameters | **Deprecated** |
| Authority | Mixed with “how verified” | **Evidence Tier A–F** only |
| Process depth | Mixed into level/score | **Verification Status** / expanded lifecycle |
| Parameter refs | Inline on variables | **Evidence Graph** edges |
| Geometry ownership | Vehicle-centric | **Component Passport** |

### Evidence Tier vs Verification Status

- **Evidence Tier** — where the information originated (authority class).
- **Verification Status** — how far *this specific evidence artifact / edge* has progressed through ingestion and matching.
- These axes are independent. A Tier A source can still be `DISCOVERED` only; a Tier E source can be `CONFIGURATION_MATCHED` for architecture.

### Expanded Candidate Lifecycle

```text
DISCOVERED
  → INGESTED
  → NORMALIZED
  → CONFIGURATION_MATCHED
  → CROSS_VERIFIED
  → COMPONENT_VERIFIED
  → ENGINEERING_VERIFIED / PRODUCTION_APPROVED
  → FROZEN (optional lock; requires owner gate)
```

No edge or passport field may jump stages. Missing files remain `DISCOVERED` or `AWAITING_FILE`.

---

## Primary machine artifacts

| Artifact | Path |
|---|---|
| Evidence Graph | [`layers/L01/L1_EVIDENCE_GRAPH.json`](layers/L01/L1_EVIDENCE_GRAPH.json) |
| Evidence Graph schema | [`schemas/evidence-graph.schema.json`](schemas/evidence-graph.schema.json) |
| Component passports | [`components/`](components/) |
| Passport schema | [`schemas/component-passport.schema.json`](schemas/component-passport.schema.json) |
| Vehicle configs (ephemeral) | [`configurations/`](configurations/) |
| Platform configurator roadmap | [`EDTS_OS_PLATFORM_CONFIGURATOR.md`](EDTS_OS_PLATFORM_CONFIGURATOR.md) |
| Parameter DB (legacy bridge) | [`layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json`](layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json) |

---

## Integrity guard (non-negotiable)

Illustrative examples that show Tier A `NORMALIZED` edges with page quotes, SHA-256 hashes, or frozen passports are **templates only** unless:

1. `file_exists === true` for the cited local artifact, and  
2. hash computation is executed, and  
3. page evidence is recorded in `L1_PAGE_EVIDENCE_MANIFEST.json`.

Source Pack 01 remains **`L1_SOURCE_PACK_01_NOT_VERIFIED`**. Do not re-assert voided hashes or page quotes.

---

## Geometry gate

EDTS-OS activation does **not** approve geometry freeze.  
`modeling_baseline_status` remains `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE` until Hard Rule 4 / expanded lifecycle completion for dimensional claims.
