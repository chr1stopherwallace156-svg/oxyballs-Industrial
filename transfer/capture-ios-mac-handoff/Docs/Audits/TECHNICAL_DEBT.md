<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# TECHNICAL_DEBT

## Executive summary

Debt is mostly **scaffolding theater** (README feature trees) and **branch divergence** (Commit A vs Track B vs UX), not a swamp of TODOs in production Swift. Production TODO/FIXME count is near zero; explicit incomplete markers exist (`NOT_IMPLEMENTED` seal, unavailable motion).

## Evidence

| Category | Examples | Action |
|---|---|---|
| TODOs in prod Swift | Essentially none; `fatalError` only `CameraPreviewView.init(coder:)` | Keep |
| Stubs | Entire excluded App subtrees | Leave until authorized; don't populate casually |
| Deprecated/legacy | `StillPhotoCaptureService`, `FileEvidenceExporter` | Cleanup CHANGE post-freeze |
| Incomplete markers | `packageSealStatus = NOT_IMPLEMENTED` | Honest — retain until crypto phase |
| Mock crypto | `MockAttestationVerifier` always true | Must never ship as real attest |
| Legacy models | Phase1-named domain types vs Spec 002 names | Map during v2 impl; don't dual-write yet |
| Duplicate docs | Root ↔ KNOWLEDGE_PACKAGE ↔ Handoff mirrors | Expected; automate sync via prepare scripts |
| Branch debt | freeze-commit-a, professional-ux, blackframe unmerged | Explicit merge plan |
| Validation placeholders | `PHASE_1C_FINAL_VALIDATION.md` `[INSERT …]` | Operator fill |
| Spec 4–6 draft | Not frozen | Review then CHANGE-0003 |

## Findings

1. Highest-cost debt is **governance divergence**, not code ugliness.
2. Filling stub folders early would create the worst debt.
3. Dual CanonicalJSON modules need a single ownership note (Application owns algorithm).

## Risk level

Medium

## Recommended action

Track cleanup candidates in ROADMAP; forbid “drive-by” stub implementations.

## Priority

P1

## Confidence

High
