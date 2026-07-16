# EDTS Research & Evidence Protocol

**Status:** `ACTIVE`  
**Effective Date:** 2026-07-16  
**Version:** 1.0.0  
**Binding for:** all research, acquisition, geometry development, and software logic operations under `elektron-digital-twin-foundation/`

---

## I. Mission

To construct the most accurate, traceable, and evidence-backed Engineering Digital Twin (EDTS) possible. The system aggressively discovers, cross-verifies, and integrates existing technical evidence while maintaining strict, mathematical engineering traceability.

## II. Fundamental Taxonomy

Every parameter, value, or visual property in the database must be categorized into exactly one of the following:

1. **Evidence** — Direct, traceable data linked to an active source.
2. **Probability** — Highly likely, standard platform behavior backed by secondary/tertiary data but missing direct primary confirmation.
3. **Assumption** — Explicit, documented design baseline used when evidence is absent but necessary to maintain structural flow.
4. **Placeholder** — Highly visible, low-trust geometric/data anchors indicating where future validated data must be injected.
5. **Inference** — Analytical derivations mathematically computed from known engineering dimensions (e.g., track derived from hub face distance and wheel offset).

## III. Hard Rules Summary

### Hard Rule 1 — Evidence Hierarchy

All claims must receive a strict Level classification (**Level A through F**). See §IV.

### Hard Rule 2 — OEM Wins

Level A (OEM) data establishes the engineering baseline and overrides all lower tiers when configuration match is proven.

### Hard Rule 3 — Systematic Search Expectations

Assume existing information is available online; reverse engineering is the option of last resort.

### Hard Rule 4 — Candidate Promotion

No found value bypasses the lifecycle:

```text
FOUND → CANDIDATE → CONFIGURATION MATCH → CROSS VERIFIED → ENGINEERING VERIFIED
```

### Hard Rule 5 — Explicit Traceability Blocks

Technical specifications must display:

- Level
- Confidence (%)
- Configuration
- Source Count
- Status

Machine form: `layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json` (and successors).

### Hard Rule 6 — Honorable Ignorance

Flag parameters as `UNKNOWN` or `REQUIRES ADDITIONAL EVIDENCE` rather than fabricating precision.

### Hard Rule 7 — Multi-Source Assembly

Twin assembly is a multi-sourced block system (e.g., Level A cab + Level B frame scan + Level C supplier axle). Provenance per block is mandatory.

### Hard Rule 8 — Parallel Lanes

Keep Teams **A, B, C, and D** active. Research blockage must never paralyze asset acquisition, provisional geometry prep, or software architecture.

### Hard Rule 9 — Traceability Ledger

Log modifications, source revisions, and reviewer status changes in the correction log (`L1_SOURCE_PACK_01_CORRECTION_LOG.md` and successors).

### Hard Rule 10 — Efficiency Principle

Prioritize discovering, auditing, and correcting existing 3D/CAD/scan assets over recreating files from scratch. Characterize effort by subsystems touched (keep / discard / build), not calendar-day estimates.

---

## IV. Evidence Levels (A–F)

| Level | Class | Typical sources |
|---|---|---|
| **A** | OEM primary | BBAS layout books, order guides, workshop manuals, Ford-issued drawings |
| **B** | Licensed / measured physical | Hashed scans, metrology on GRADE-A/B VIN, counsel-cleared OEM extracts |
| **C** | Supplier / Tier-1 datasheets | Dana axle sheets, tire maker T&RA tables |
| **D** | Dealer / fleet / auction visual | Walkaround photos, inventory listings (architecture, not mm lock) |
| **E** | Aggregator / tertiary | Spec sites, forums — conflict monitoring only |
| **F** | Inference / assumption | Computed or explicit ASSUMPTION records |

**Note:** Declaring a *target* Level A source does **not** make a claim Level-A verified. `evidence_level` on a parameter is the highest level among **active verified** sources (or the aspirational class of the intended source, labeled separately as `target_evidence_level` when unverified).

---

## V. Confidence Scoring (Hard Rule 5)

```text
confidence_percent = 100 * sum(weight_i for sources with status VERIFIED_ACTIVE)
                         / sum(target_weight_i for all listed sources)
```

- Sources with `CANDIDATE_UNVERIFIED` / `NOT_PRESENT` contribute **0** to the numerator.
- Denominator uses target weights so missing OEM pages correctly drive confidence toward 0%.
- Do not round away from honesty; report integer percent.

Plain-text example (front axle layout with OEM candidate + two visual actives):

```text
numerator   = 6 + 5 = 11
denominator = 9 + 6 + 5 = 20
confidence  = 100 * 11 / 20 = 55%
```

---

## VI. Geometry Gate Interaction

- Protocol activation **does not** approve geometry freeze.
- Team C may prepare provisional adaptations of graded assets under **Placeholder / Probability** labeling.
- Mesh promotion to ENGINEERING VERIFIED requires Hard Rule 4 completion for dimensional claims plus `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE` clearance.

## VII. Related Operational Files

| File | Role |
|---|---|
| `AGENTS.md` | Agent binding to this protocol |
| `layers/L01/L1_PARALLEL_TEAMS.md` | Teams A–D sprint board |
| `layers/L01/L1_PARAMETER_VERIFICATION_DATABASE.json` | Weighted confidence engine |
| `layers/L01/L1_ASSET_EVALUATION_ASSET-00031.md` | Efficiency-principle asset profile |
| `layers/L01/L1_SOURCE_PACK_01_AUTHENTICITY_AUDIT.md` | Pack verification posture |
