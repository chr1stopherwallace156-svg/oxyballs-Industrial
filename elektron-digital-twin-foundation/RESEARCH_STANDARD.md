# RESEARCH_STANDARD.md — Research Governance Foundation

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

This document establishes the inquiry lifecycle and file layout rules for EDTS research tasks. It does **not** automatically declare Layer 0 closed or validated.

## 1. The Scientific Research Directive

EDTS research is conducted as an empirical, high-precision investigation rather than a collection of static, narrative-driven summaries. This document establishes the strict lifecycle that every vehicle engineering research task must execute.

## 2. The Four-Pass Workflow

Every research topic must progress through four sequential, deterministic passes:

[ Pass 1: Discovery ] =======> [ Pass 2: Extraction ] =======> [ Pass 3: Reconciliation ] =======> [ Pass 4: Integration ]

* Identify raw sources, variants, and scope gaps.
* Extract measurements & relationships with citations.
* Isolate discrepancies, contradictions, & limits.
* Deliver complete JSON & Markdown files to git.

### Pass 1 — Discovery
- Identify raw source material, applicable vehicle variants, potential source conflicts, and scope gaps.

### Pass 2 — Extraction
- Extract exact measurements, physical properties, structural relationships, and applicability matrices.
- Every data point must be mapped to a verifiable source.

### Pass 3 — Reconciliation
- Group duplicate findings.
- Isolate dimensional contradictions.
- Calculate variance and identify configuration mismatches.

### Pass 4 — Integration Proposal
- Package resolved knowledge into machine-readable `.json` structures and human-readable `.md` dossiers.

## 4. Mathematical Representation in Technical Research

All parameters, measurements, dimensions, and limits compiled during technical research must be declared using the explicit structured template of [FORMULA_AND_SYMBOL_STANDARD.md](FORMULA_AND_SYMBOL_STANDARD.md).

### Measurement validation and tolerancing

1. Do not use un-templated ranges or shorthand tolerance limits (such as "approx 2m").
2. Transcribe all technical tolerances to include:
   - Nominal value
   - Symmetric or asymmetric deviation bounds
   - Written operational range (minimum and maximum bounds spelled out as text)
3. Ensure every calculated parameter includes an explicit citation of its measurement instrumentation class (MAC-A through MAC-D) as mapped in [schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json](schemas/CLAIM_REGISTRY_CORE_SCHEMA_V4_PROPOSAL.json).

## 5. Code / Directory Structure

All generated research must be written directly to the following git file paths, keeping data completely isolated from runtime logic:

`research/incoming/<topic_name>/`

```text
research/incoming/<topic_name>/
├── DISCOVERY.md
├── SOURCE_INDEX.md
├── CLAIMS.json
├── CONFLICTS.md
├── DOSSIER.md
└── INTEGRATION_PROPOSAL.md
```

