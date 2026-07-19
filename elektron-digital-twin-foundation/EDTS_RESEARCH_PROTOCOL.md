# EDTS Research & Evidence Protocol

**Status:** `ACTIVE`  
**Effective Date:** 2026-07-16  
**Version:** `2.6.0`  
**Architecture host:** [EDTS_OS.md](EDTS_OS.md) v3.0.0+ (EDTS-OS)  
**Isolation law:** [documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md)  
**Binding for:** all research, acquisition, geometry development, and software logic operations under `elektron-digital-twin-foundation/`

**Changelog from 2.0.0:** Constitutional **Hard Rule — Exact Vehicle Isolation (HR-EVI)**; vehicle datasets under `examples/<oem>/<exact_config>/`; similarity never evidence; Hard Rule 0 sharing clarified as non-automatic.  
**Changelog from 2.1.0:** Hard Rule 0 adds **Component-First Acquisition** (no assumption of a complete exact-vehicle marketplace asset; admit components only after verification).  
**Changelog from 2.1.1:** Hard Rule 11 — Evidence Acquisition Efficiency (search complete-vehicle **and** component levels; prefer exact complete assets when they exist; never forbid complete-vehicle search).  
**Changelog from 2.1.2:** **Hard Rule 13** — Research Never Stops at One Source; **Research Confidence (RC)** for SRC-CAND search prioritization (not engineering verification %); immutable **`SRC-CAND-######`** IDs.  
**Changelog from 2.2.0:** **Hard Rule 15** — Every Major Claim Must Have Its Own Claim Record; vector blueprints are **2D dimensional / profile reference**, never “ground-truth geometry.”  
**Changelog from 2.3.0:** **Hard Rule 16** — Asset Intelligence Database; every internet asset gets an `AID-*` passport; listing URLs are acquisition **inputs**, not answers.  
**Changelog from 2.4.0:** **Hard Rule 17** — Deconstructed Assembly Sourcing + Supplier-First Lane + **AJR** purchase gate.  
**Changelog from 2.5.0:** **Component Sourcing Passports (`CSP-*`)** + **Knowledge Gap Register (`KG-*`)**; operator maturity % bars = research draft estimates only.

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

The system shall **not assume** that a complete exact-vehicle digital asset always exists — and shall **not refuse** to search for one when it might.

Each candidate component is evaluated on its own evidence merits and admitted into the exact-vehicle silo only after passing the established verification workflow (Hard Rule 4 lifecycle + HR-EVI). When evidence arrives as a complete-vehicle package, usable components are still admitted **individually** (keep/discard/build); the package is never inherited as automatic silo truth.

Search order and completeness rules: **Hard Rule 11**.

Operational homes (do **not** create parallel shortlist/gap/next-action files):

| Concern | Authoritative home |
|---|---|
| Marketplace candidate register (thin pointers) | `layers/L01/L1_LANE_A_ASSET_CATALOG.json` |
| **Asset Intelligence passports (`AID-*`)** | **`research/asset_intelligence/ASSET_INTELLIGENCE_REGISTER.json`** |
| Document / source candidates (`SRC-CAND-*`) | `research/src_candidates/SRC_CANDIDATE_REGISTER.json` |
| Per-asset evaluation | AID passport + optional `layers/L01/L1_ASSET_EVALUATION_<ASSET-ID>.md` + `research/incoming/l01_lane_a_assets/<ASSET-ID>/` |
| Search attempts | `research/RESEARCH_LOG.md` (append-only) and/or catalog `notes` |
| Exact vs related | HR-EVI + `schemas/cross-vehicle-comparison.schema.json` + AID `exact_configuration_match` |
| Acquisition sequence / next actions | `layers/L01/L1_REFERENCE_ACQUISITION_QUEUE.md` + `STATUS.json` + SRC-CAND / AID queues |
| Evidence gaps | existing L1 gap matrix / final gap report + AID `known_deficiencies` |
| Component truth surface | Component Passport (`components/` + exact-vehicle passport examples) |

Do **not** recreate rejected DT-D027 shortlist files (`L1_ASSET_CANDIDATE_DATABASE.json`, door/cab shortlists, etc.). AID is the structured intelligence layer; the Lane A catalog remains the thin pointer register.

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

**Deprecated for engineering claims:** parameter-level confidence percentages (`confidence_score`, weighted % engines) that pretend a claim is verified.  
Do **not** use % scores to promote Hard Rule 4 lifecycle stages or to freeze geometry.

**Allowed (search only):** **Research Confidence (RC)** on `SRC-CAND-*` records — a 0–100 **hunt / prioritization** score with a mandatory Reasoning Log. RC never means `VERIFIED_EVIDENCE`. See Hard Rule 13 + §V-bis.

Machine form:

- Primary: [`layers/L01/L1_EVIDENCE_GRAPH.json`](layers/L01/L1_EVIDENCE_GRAPH.json)
- Passports: [`components/`](components/)
- Source candidates: [`research/src_candidates/`](research/src_candidates/)
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

Works with Hard Rule 11: prefer the highest-quality *available* evidence — including a complete exact-vehicle package when one exists — then adapt at component granularity.

### Hard Rule 11 — Evidence Acquisition Efficiency

Research shall maximize evidence acquisition efficiency. Search for the highest-quality available evidence at **both** the complete-vehicle level and the individual-component level.

**Order of preference (soft, not exclusive):**

1. **Exact complete-vehicle asset** for the locked configuration — evaluate first when discovered. Legitimate sources include OEM CAD, manufacturer scan, photogrammetry dataset, teardown scan, museum scan, and engineering-supplier CAD.
2. If no exact complete asset exists — or it is incomplete / wrong-configuration / unlicensed — **acquire evidence component-by-component** while preserving exact-vehicle isolation (HR-EVI).
3. Related-year or platform-family assets remain **discovery-only** until configuration match is proven; they never auto-inherit into the silo.

**Hard Rule 11 does *not* say:** “Never search for a complete vehicle.” Complete-vehicle search is encouraged when quality and configuration match justify it.

**Immediate next build priority:** operate the **Evidence Acquisition Engine** (`tools/evidence_acquisition/`, `documentation/EVIDENCE_ACQUISITION_ENGINE.md`) to move candidates from `DISCOVERED` toward `PARSED` / `COMPONENTIZED` — without inventing URLs, hashes, or reopening the frozen kernel. Deepen the Component Passport only after real evidence is acquired and inventoried.

### Hard Rule 12 — Reserved

*(Number reserved for continuity; no independent constitutional text in v2.2.0.)*

### Hard Rule 13 — Research Never Stops at One Source

Discovering a candidate source **does not terminate** a research lane.

A `SRC-CAND-*` discovery is a **trigger** to propagate parallel tasks across research lanes until the Evidence Graph approaches saturation for the locked configuration — or until remaining gaps are explicitly marked `RESEARCH_REQUIRED` / `PRIMARY_SOURCE_REQUIRED` with no inventable substitute.

**Parallel research lanes (examples):**

| Lane ID | Focus | Typical evidence |
|---|---|---|
| `LANE_A_DOC` | OEM documents (BBAS, order guides) | Layout diagrams, frame/axle mounts |
| `LANE_SVC` | Service / workshop manuals | Steering topology, alignment specs |
| `LANE_ENG` | Engineering / dimensional publications | Track, mount coordinates |
| `LANE_PRT` (E) | Parts catalogs (VIN-filtered when possible) | Knuckle / radius-arm / axle PN |
| `LANE_DIM` | Dimensional cross-checks | Measured vs document deltas |
| `LANE_VIS` (D-visual) | Visual teardown / photo / video of exact config | 4x2 front-end architecture cues |

**Note:** Research lane `LANE_VIS` is **not** Team D (Software) under Hard Rule 8. Team letters and research-lane letters may differ; always use the `LANE_*` ID in machine records.

**Immutable source-candidate IDs:**

- Pattern: `SRC-CAND-######` (zero-padded, monotonically assigned).
- The ID is an immutable **handle**. Year, title, publisher, tier, RC, and access status are **metadata** and may be corrected without renaming the ID.
- Do not encode year/type into the ID string.
- Register: `research/src_candidates/SRC_CANDIDATE_REGISTER.json`.

**Saturation (exit conditions for a topic):**

1. At least one Tier A (or Tier B measured) edge reaches `CONFIGURATION_MATCHED`+ for the claim, **or**
2. Contradictions are logged and the claim remains `PRIMARY_SOURCE_REQUIRED` / `RESEARCH_REQUIRED` without fabricated closure, **and**
3. Parallel lanes have been tasked (or explicitly deferred with reason).

Finding BBAS alone is never “research complete.”

### Hard Rule 14 — Reference Geometry Vocabulary

Commercial **vector blueprints** and similar 2D drawings are:

- **`2D_DIMENSIONAL_REFERENCE`**, or  
- **`PROFILE_REFERENCE`**

They are **not** OEM engineering geometry and must **not** be called “ground-truth geometry,” “engineering ground truth,” or equivalent.

OEM engineering geometry requires Tier A drawings / BBAS / measured Tier B evidence under Hard Rule 4.

### Hard Rule 15 — Every Major Claim Must Have Its Own Claim Record

Do not bury major engineering or interchange statements only in prose paragraphs.

Every major claim must have a machine-readable record under `research/claims/` with at least:

| Field | Meaning |
|---|---|
| `claim_id` | Immutable handle (`CL-###` or `CL-<topic>-###`) |
| `claim` | Exact statement under evaluation |
| `evidence_level` | Tier A–F (claimed/target — not automatic verification) |
| `configuration` | Exact silo binding (`VEH` / `CFG` / component as applicable) |
| `supporting_sources` | Sources that appear to support the claim |
| `conflicting_sources` | Sources that contradict (or `[]` if none yet) |
| `status` | e.g. `CANDIDATE`, `RESEARCH_REQUIRED`, `PRIMARY_SOURCE_REQUIRED`, … |
| `next_verification_step` | Concrete next proof action(s) |

Optional but recommended: `reported_oem_identifiers`, `forbidden_downstream`, `hr_evi_classification`.

**Register:** `research/claims/CLAIM_REGISTER.json`  
**Schema:** `schemas/research-claim.schema.json`

Example shape (shell interchange):

```text
Claim ID: CL-001
Claim: Outer door shell shared with F-150 (same design generation panel family)
Evidence Level: Tier A (OEM Parts Catalog — claimed)
Configuration: VEH-000001 / CFG-000001 / CMPINST-VEH000001-DOOR-FL
Supporting Sources: Ford Parts Catalog (interchange — not yet locally hashed)
Conflicting Sources: none yet identified
Status: CANDIDATE
Next Verification Step: OEM body repair manual; OEM engineering drawing; physical comparison
```

### Hard Rule 16 — Asset Intelligence Database (every asset gets a passport)

Marketplace finds, CAD listings, scans, and vector blueprints are **inputs into EDTS**, not answers.

1. Every discovered internet asset receives an immutable **`AID-######`** passport.
2. Passports live under `research/asset_intelligence/` and conform to `schemas/asset-intelligence-passport.schema.json` (non-kernel).
3. Required intelligence surface includes at least: source, vehicle/configuration claims, `exact_configuration_match`, geometry types, ordinal completeness (exterior / interior / mechanical / electrical / hierarchy / mesh separation / topology), engineering & visual usefulness, license, price, acquired / parsed / verified lifecycle, component coverage, known deficiencies, evidence links.
4. Completeness uses **ordinals** (`NOT_EVALUATED` / `NONE` / `LOW` / `PARTIAL` / `HIGH`) — never engineering confidence percentages (Hard Rule 5).
5. `exact_configuration_match = CONFIGURATION_MATCHED` requires Hard Rule 4 + HR-EVI — never a listing title alone.
6. Listing-only rows must set `completeness.evaluation_basis = LISTING_ONLY` until local bytes are parsed.
7. AID does **not** revive rejected DT-D027 shortlist files and does **not** activate deferred multi-axis scoring engines (DT-D029).

**Register:** `research/asset_intelligence/ASSET_INTELLIGENCE_REGISTER.json`

### Hard Rule 17 — Deconstructed Assembly Sourcing, Supplier-First Lane, AJR

1. **Deconstructed Assembly Sourcing:** build the twin from best-documented sub-system assets under assembly hubs (axle, door, steering, …). A complete marketplace vehicle package is never automatic silo truth.
2. **Supplier-First Lane (`LANE_SUPPLIER`):** hunt Tier-1 supplier manuals, flange drawings, connector schematics, and supplier CAD in parallel with OEM vehicle docs — matrix rows are hunt drafts until hashed.
3. **Acquisition Justification Report (AJR):** any paid or download-clearance candidate must pass AJR gates:
   - adds new engineering data?
   - unique vs existing library?
   - resolves priority gaps?
4. Purchase / download clearance requires `purchase_clearance = CLEARED`. Missing URL ⇒ `BLOCKED`.
5. Optional AID `score_claims` (0–1) remain `RESEARCH_CLAIM` / `LISTING_CLAIM` until local bytes are parsed — they do **not** revive Hard Rule 5 confidence percentages.

**Homes:**  
`research/sourcing/DECONSTRUCTED_ASSEMBLY_SOURCING.md`  
`research/sourcing/TIER1_SUPPLIER_MATRIX_2019_F450.json`  
`research/asset_intelligence/ajr/AJR_REGISTER.json`  
`schemas/acquisition-justification-report.schema.json`

### Deferred architecture (do not implement under schema freeze)

These improve long-term rigor but must **not** expand frozen kernel schemas unless a blocking defect from the real geometry workflow requires it (DT-D028):

| Idea | Disposition |
|---|---|
| Multi-axis quality scores (exterior/interior geometry, dimensions, topology, textures, materials, animation, separation, scan/metadata quality, license, provenance, evidence strength) | Numeric rubric engines remain deferred / `NOT_AUTHORIZED_UNTIL_ACQUIRED`. **AID ordinals** (Hard Rule 16) are the authorized pre-bytes intelligence surface — not Geometry A/B scores. |
| First-class geometry roles (Visual Exterior, Engineering Surface, Scan, CAD, LOD0–2, Collision, Proxy, Repair, Simulation, AR, Exploded) | Multiple simultaneous **registry** assets per component (IDs on passport); frozen `geometry-asset.asset_role` unchanged; do not invent roles without bytes |
| Dependency Graph (structural / connection / procedure) | Separate record types; procedure edges `NOT_EVALUATED` until verified — **not** embedded remove-lists on the passport; see proposals design |
| Passport v1.1 schema | **Proposal only** at `proposals/component-passport-v1.1.schema.json` — do **not** edit active rc1 `schemas/component-passport.schema.json` |

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

## V. Confidence Scoring — DEPRECATED (engineering claims)

Section retained for historical audit of protocol v1.0.0 only.

```text
# DEPRECATED — do not use for new parameters or UI
confidence_percent = 100 * sum(weight_i for VERIFIED_ACTIVE) / sum(target_weight_i)
```

Replacement query model for **verified engineering claims**: traverse Evidence Graph relationships for a parameter node; report tier counts, SUPPORTS vs CONTRADICTS, and max verification_status among active edges.

---

## V-bis. Research Confidence Protocol (SRC-CAND search only)

**Purpose:** Prioritize the **Next Search Queue**.  
**Not purpose:** Prove geometry, promote lifecycle stages, or replace Evidence Tiers.

| Field | Rule |
|---|---|
| `research_confidence_rc` | Integer 0–100 on a `SRC-CAND-*` record |
| `reasoning_log` | Required append-only list explaining the RC |
| Effect | Orders hunt tasks; never sets `VERIFIED_EVIDENCE` |
| Recalculation | Allowed when metadata changes; ID stays immutable |

**Indicative RC bands (hunt utility, not truth):**

| RC | Meaning |
|---|---|
| 80–100 | High-value OEM/service target for the locked config; acquire first |
| 60–79 | Useful secondary (parts/visual) to cross-check after primary |
| 40–59 | Speculative; keep lane open |
| 0–39 | Weak / wrong-config risk; do not prioritize |

**Hard Rule 5 still forbids** using these percentages as engineering verification scores on twin parameters.

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
| `layers/L01/L1_LANE_A_ASSET_CATALOG.json` | Lane A marketplace candidate catalog (thin pointers) |
| `research/asset_intelligence/ASSET_INTELLIGENCE_REGISTER.json` | Hard Rule 16 `AID-*` asset intelligence passports |
| `research/asset_intelligence/ajr/AJR_REGISTER.json` | Hard Rule 17 Acquisition Justification Reports |
| `research/sourcing/DECONSTRUCTED_ASSEMBLY_SOURCING.md` | Assembly Orchestrator / deconstructed sourcing model |
| `research/sourcing/TIER1_SUPPLIER_MATRIX_2019_F450.json` | Tier-1 supplier hunt matrix |
| `research/component_sourcing/COMPONENT_SOURCING_REGISTER.json` | Component Sourcing Passports (`CSP-*`) + maturity channels |
| `research/knowledge_gaps/KNOWLEDGE_GAP_REGISTER.json` | Knowledge Gap Register (`KG-*`) |
| `research/media_candidates/MEDIA_CANDIDATE_REGISTER.json` | Video/photo media candidates |
| `research/src_candidates/SRC_CANDIDATE_REGISTER.json` | Immutable `SRC-CAND-*` register + Next Search Queue |
| `research/claims/CLAIM_REGISTER.json` | Hard Rule 15 major-claim index |
| `layers/L01/L1_SOURCE_PACK_01_AUTHENTICITY_AUDIT.md` | Pack verification posture |
