# Research Execution Pipeline Capability & Bottleneck Audit

**Document:** `EDTS-PIPELINE-AUDIT-2026-07`  
**Decision:** `DT-D049` · **Sprint:** `RL-018`  
**Date:** 2026-07-20  
**Recommended decision:** `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`  
**Machine form:** [`EDTS-PIPELINE-AUDIT-2026-07.json`](EDTS-PIPELINE-AUDIT-2026-07.json)

Answering these six questions honestly is the difference between building a functioning engineering tool and creating a sophisticated hallucination engine.

The architecture (EGS-1.0.0-proposal.2, Asset Intelligence Database, Component Passports, and Evidence Coverage Matrices) defines the rules of physics for the digital twin. This audit records how the **research execution pipeline** performs across six dimensions — including hard human/API limits.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                           RESEARCH EXECUTION PIPELINE                             │
└───────────────────────────────────────────────────────────────────────────────────┘
        │                                                                   │
        ▼                                                                   ▼
┌──────────────────────────────┐                   ┌──────────────────────────────┐
│  AUTOMATED AI CAPABILITIES   │                   │    HARD HUMAN / API LIMITS   │
├──────────────────────────────┤                   ├──────────────────────────────┤
│ • Multi-lane discovery       │                   │ • Paid paywalls (Helm Inc.)  │
│ • Scope Lock gating          │                   │ • Physical teardowns/scans   │
│ • Contradiction tracking     │                   │ • Proprietary Tier 1 CAD     │
│ • Schema-compliant JSON graph│                   │ • Direct physical measurement│
└──────────────────────────────┘                   └──────────────────────────────┘
```

## 1. Can it acquire real primary evidence?

> **Verdict:** Partially. Fully automated for public OEM/Government records; gated for commercial & physical evidence.

- **What works:** Discover, index, and extract from publicly accessible Tier A/B sources (NHTSA, Ford BBAS guides, USPTO, public TSBs, open parts APIs, open-source CAD) when URLs are real.
- **Bottleneck:** Cannot bypass commercial paywalls (e.g. Helm Inc.) or dealer service networks.
- **Boundary:** Engine pushes to `SOURCE_DISCOVERED`. `SOURCE_ACQUIRED` needs credentialed crawler or human-in-the-loop byte handoff.

## 2. Can it extract assertions correctly?

> **Verdict:** High accuracy on structured text & tables; requires OCR verification on complex engineering drawings.

- **What works:** Text / parts-catalog / workshop-table extraction into EGS claims.
- **Bottleneck:** Non-vector EWD PDFs and multi-view assembly drawings.
- **Boundary:** New extracts = `ASSERTION_EXTRACTED`. `ASSERTION_VERIFIED` requires validation (e.g. token anchors in source PDF).

## 3. Can it resolve applicability to one exact configuration?

> **Verdict:** Yes — among the pipeline’s strongest capabilities.

- **What works:** Pass 1 Scope Lock; refuse merging near-config manuals into `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`.
- **Guardrail:** Cross-year/model data → `CROSS_CONFIGURATION_COMPARISON` / `SOURCE_APPLICABILITY_CANDIDATE` with `NOT_INHERITED`.

## 4. Can it survive contradictory sources?

> **Verdict:** Yes, by design. Logs conflicts rather than guessing.

- **What works:** No majority-vote blending. Property claims may carry `conflicting_assertions`; status → `CONTRADICTED`.
- **Guardrail:** Blocks `PROCEDURE_GENERATION_AUTHORIZED`; opens `KG-XXX`.

## 5. Can it create useful graph records without excessive manual effort?

> **Verdict:** Yes via schema templating; intake must stay validator-bound.

- **What works:** Auto-template `CFGCOMP-` / `IFACE-` / claim structures.
- **Bottleneck:** Unbounded LLMs invent plausible edges.
- **Boundary:** `egs_v1.validate` + JSON Schema reject structural failures and unlinked assertions.

## 6. Can it produce a complete assembly representation?

> **Verdict:** Incrementally — evidence-backed, never artificially complete.

- **What works:** Modular passports stitched through interfaces across twin planes.
- **Reality:** Public discovery saturates on external/OEM parts (~80–90% **estimate**) and stays low on internal cavity / harness routing (~0–20% **estimate**) — `RESEARCH_ESTIMATE_NOT_MEASURED`.
- **Handoff:** At saturation → [`PHYSICAL_ACQUISITION_PLAN_SPRINT7_TEMPLATE.md`](PHYSICAL_ACQUISITION_PLAN_SPRINT7_TEMPLATE.md).

## Executive Summary Matrix

| Pipeline Milestone | Current Capability Status | Primary Failure Vector | Mitigation Strategy |
|---|---|---|---|
| 1. Primary Evidence Acquisition | `PARTIALLY_AUTOMATED` | Paid paywalls & physical assets | `SOURCE_DISCOVERED` handoff to human/purchasing agent |
| 2. Assertion Extraction | `AUTOMATED_TEXT_ONLY` | Visual ambiguity in scanned PDFs | Token-anchor cross-referencing & OCR validation |
| 3. Exact-Vehicle Isolation | `FULLY_CAPABLE` | Human pressure to “borrow” data | Hard locks on `CFGCOMP-` nodes |
| 4. Contradiction Resolution | `FULLY_CAPABLE` | Generative AI “smoothing” | Force `CONTRADICTED` + log KG |
| 5. Graph Generation Efficiency | `AUTOMATED_SCHEMA_TEMPLATES` | Schema drift & hallucinated edges | Strict JSON-Schema validation at intake |
| 6. Assembly Representation | `PROGRESSIVE_SYNTHESIS` | Expecting 100% digital saturation | Physical Acquisition Planner (Sprint 7) |

## Honesty gate

- This audit locks **pipeline operational boundaries**. It does **not** acquire WSM/EWD bytes or promote F-450 edges.
- F-450 REL-REG samples remain `REAL_DATA_PROMOTION_BLOCKED` / `PROCEDURE_GENERATION_NOT_AUTHORIZED`.
- Frozen kernel schemas untouched.
