# EDTS Research & Evidence Protocol

**Status:** `ACTIVE`  
**Effective Date:** 2026-07-16  
**Version:** `2.1.1`  
**Architecture host:** [EDTS_OS.md](EDTS_OS.md) v3.0.0 (EDTS-OS)  
**Isolation law:** [documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md)  
**Binding for:** all research, acquisition, geometry development, and software logic operations under `elektron-digital-twin-foundation/`

**Changelog from 2.0.0:** Constitutional **Hard Rule — Exact Vehicle Isolation (HR-EVI)**; vehicle datasets under `examples/<oem>/<exact_config>/`; similarity never evidence; Hard Rule 0 sharing clarified as non-automatic.  
**Changelog from 2.1.0:** Hard Rule 0 adds **Component-First Acquisition** (no assumption of a complete exact-vehicle marketplace asset; admit components only after verification).

---

## I. Mission

To construct the most accurate, traceable, and evidence-backed Engineering Digital Twin (EDTS) possible — as an **operating system of reusable components**, not as isolated vehicle models. The system aggressively discovers, cross-verifies, and integrates existing technical evidence while maintaining strict, mathematical engineering traceability.

---

## II. Fundamental Taxonomy

Every parameter, value, or visual property in the database must be categorized into exactly one of the following:

1. **Evidence** — Direct, traceable data linked to an active source.
2. **Probability** — Highly likely, standard platform behavior backed by secondary/tertiary data but missing direct primary confirmation.
3. **Assumption** — Explicit, documented design baseline used when evidence is absent but necessary to maintain structural flow.
4. **Placeholder** — Highly visible, low-trust geometric/data anchors indicating where future validated data must be injected.
5. **Inference** — Analytical derivations mathematically computed from known engineering dimensions (e.g., track derived from hub face distance and wheel offset).

---

## III. Hard Rules Summary

### Hard Rule 0 — Component First (Constitutional)

The EDTS models **components**, not monolithic vehicles. A vehicle configuration is an assembly of **vehicle-bound component instances**. Optional reusable component definitions may exist outside any single vehicle, but **must not be automatically inherited**.

Binding a reusable definition to a vehicle requires independent evidence for that exact vehicle (see Hard Rule Exact Vehicle Isolation). Similarity never establishes applicability.

#### Component-First Acquisition (Hard Rule 0 corollary)

The system shall **not** assume that a complete, exact-vehicle digital asset exists. Research and marketplace hunting proceed **independently per component** (door, hood, frame rail, axle, mirror, dashboard, cab shell, etc.).

Each candidate component is evaluated on its own evidence merits and admitted into the exact-vehicle silo only after passing the established verification workflow (Hard Rule 4 lifecycle + HR-EVI). Vehicle assemblies are constructed from individually verified component records rather than inherited from a single marketplace model.

Operational homes (do **not** create parallel shortlist/gap/next-action files):

| Concern | Authoritative home |
|---|---|
| Marketplace candidate register | `layers/L01/L1_LANE_A_ASSET_CATALOG.json` |
| Per-asset evaluation | `layers/L01/L1_ASSET_EVALUATION_<ASSET-ID>.md` + `research/incoming/l01_lane_a_assets/<ASSET-ID>/` |
| Search attempts | `research/RESEARCH_LOG.md` (append-only) and/or catalog `notes` |
| Exact vs related | HR-EVI + `schemas/cross-vehicle-comparison.schema.json` + catalog `grade` / `estimated_configuration_match` |
| Acquisition sequence / next actions | `layers/L01/L1_REFERENCE_ACQUISITION_QUEUE.md` + `STATUS.json` |
| Evidence gaps | existing L1 gap matrix / final gap report + per-asset availability audit |

Machine form: `schemas/*` (universal) + `examples/<oem>/<exact_config>/` (datasets) + Lane A catalog (candidates).

### Hard Rule — Exact Vehicle Isolation (Constitutional) — HR-EVI

Every unique vehicle configuration is its own completely independent engineering dataset. No vehicle inherits engineering information from another because they appear similar. **Similarity is never evidence.** Every vehicle stands on its own evidence.

Applies to every manufacturer, year, trim, drivetrain, body style, wheelbase, cab, suspension/axle/option package, and production variation.

Full law: [documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md)

### Hard Rule 1 — Evidence Hierarchy (Tiers)

All claims must receive a strict **Evidence Tier** classification (**Tier A through F**). See §IV.  
Tier answers: *where did this originate?*

### Hard Rule 2 — OEM Wins

Tier A (OEM) data establishes the engineering baseline and overrides all lower tiers when configuration match is proven **and** the Tier A edge has reached at least `NORMALIZED`.

### Hard Rule 3 — Systematic Search Expectations

Assume existing information is available online; reverse engineering is the option of last resort.

### Hard Rule 4 — Expanded Candidate Lifecycle

No found value, evidence edge, or passport field bypasses:

```text
DISCOVERED
  → INGESTED
  → NORMALIZED
  → CONFIGURATION_MATCHED
  → CROSS_VERIFIED
  → COMPONENT_VERIFIED
  → ENGINEERING_VERIFIED / PRODUCTION_APPROVED
  → FROZEN (optional; owner gate)
```

Legacy alias (still accepted in older docs):  
`FOUND → CANDIDATE → CONFIGURATION MATCH → CROSS VERIFIED → ENGINEERING VERIFIED`

### Hard Rule 5 — Explicit Traceability Blocks (Decoupled)

Technical specifications must display:

| Field | Meaning |
|---|---|
| **Evidence Tier** | Authority class (A–F / TIER_*) |
| **Verification Status** | Lifecycle stage of *this* evidence edge or claim |
| **Configuration** | Applicability |
| **Source Count** | Number of graph relationships |
| **Relationship** | SUPPORTS / CONTRADICTS / NEUTRAL / SUPERSEDES |

**Deprecated:** Confidence percentages (`confidence_score`, weighted % engines).  
Do not compute or display confidence % for new work.

Machine form:

- Primary: [`layers/L01/L1_EVIDENCE_GRAPH.json`](layers/L01/L1_EVIDENCE_GRAPH.json)
- Passports: [`components/`](components/)
- Legacy bridge (confidence fields marked deprecated): [`layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json`](layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json)

### Hard Rule 6 — Honorable Ignorance

Flag parameters as `UNKNOWN` or `REQUIRES ADDITIONAL EVIDENCE` rather than fabricating precision.  
Never invent page numbers, SHA-256 hashes, hinge coordinates, or `NORMALIZED` OEM statuses without local file bytes.

### Hard Rule 7 — Multi-Source Assembly

Twin assembly is a multi-sourced component graph (e.g., Tier A cab door passport + Tier B frame scan + Tier C supplier axle). Provenance per component and per evidence edge is mandatory.

### Hard Rule 8 — Parallel Lanes

Keep Teams **A, B, C, and D** active. Research blockage must never paralyze asset acquisition, provisional geometry prep, or software architecture.

### Hard Rule 9 — Traceability Ledger

Log modifications, source revisions, and reviewer status changes in the correction log (`L1_SOURCE_PACK_01_CORRECTION_LOG.md` and successors).

### Hard Rule 10 — Efficiency Principle

Prioritize discovering, auditing, and correcting existing 3D/CAD/scan assets over recreating files from scratch. Characterize effort by subsystems touched (keep / discard / build), not calendar-day estimates.

Efficiency applies **per component** under Component-First Acquisition: prefer adapting a graded door or cab-shell candidate over rebuilding that subsystem, without treating a partial marketplace vehicle as automatic silo truth.

---

## IV. Evidence Tiers (A–F)

| Tier | Class | Typical sources | Graph enum |
|---|---|---|---|
| **A** | OEM primary | BBAS, order guides, workshop manuals | `TIER_A_AUTHORITATIVE` |
| **B** | Licensed / measured physical | Hashed scans, GRADE-A/B VIN metrology | `TIER_B_LICENSED_MEASURED` |
| **C** | Supplier / Tier-1 | Dana sheets, T&RA tables | `TIER_C_SUPPLIER` |
| **D** | Secondary technical | Aggregator spec DBs | `TIER_D_SECONDARY_TECHNICAL` |
| **E** | Visual reference | Dealer/fleet/auction walkarounds | `TIER_E_VISUAL_REFERENCE` |
| **F** | Inference / assumption | Computed or ASSUMPTION records | `TIER_F_INFERENCE_ASSUMPTION` |

**Decoupling note:** Declaring a *target* Tier A source does **not** make an edge Tier-A verified. An edge may be `TIER_A_AUTHORITATIVE` + `AWAITING_FILE` simultaneously.

---

## V. Confidence Scoring — DEPRECATED

Section retained for historical audit of protocol v1.0.0 only.

```text
# DEPRECATED — do not use for new parameters or UI
confidence_percent = 100 * sum(weight_i for VERIFIED_ACTIVE) / sum(target_weight_i)
```

Replacement query model: traverse Evidence Graph relationships for a parameter node; report tier counts, SUPPORTS vs CONTRADICTS, and max verification_status among active edges.

---

## VI. Geometry Gate Interaction

- Protocol / OS activation **does not** approve geometry freeze.
- Team C may prepare provisional adaptations of graded assets under **Placeholder / Probability** labeling and draft passports.
- Mesh promotion to `COMPONENT_VERIFIED` / `ENGINEERING_VERIFIED` requires Hard Rule 4 completion for dimensional claims plus `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE` clearance.

## VII. Related Operational Files

| File | Role |
|---|---|
| `EDTS_OS.md` | V3 operating system constitution |
| `EDTS_OS_PLATFORM_CONFIGURATOR.md` | Multi-platform reuse roadmap |
| `AGENTS.md` | Agent binding |
| `layers/L01/L1_EVIDENCE_GRAPH.json` | Bidirectional evidence graph |
| `components/` | Component passports |
| `configurations/` | Ephemeral vehicle configs |
| `layers/L01/L1_PARALLEL_TEAMS.md` | Teams A–D sprint board |
| `layers/L01/L1_ASSET_EVALUATION_ASSET-00031.md` | Efficiency-principle asset profile |
| `layers/L01/L1_LANE_A_ASSET_CATALOG.json` | Lane A marketplace candidate catalog |
| `layers/L01/L1_SOURCE_PACK_01_AUTHENTICITY_AUDIT.md` | Pack verification posture |
