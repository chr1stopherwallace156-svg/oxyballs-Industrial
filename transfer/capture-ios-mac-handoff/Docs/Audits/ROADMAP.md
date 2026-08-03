<!-- Audit package generated 2026-07-25 against Capture tip `b5fe020`. -->
# ROADMAP — Evidence-backed next actions

## Executive summary

Order of work is **gates before features**. Do not start Spec 003–006 implementation coding until baseline + IR-0001 authorization. Extend Phase 1 spine; do not rewrite.

## Priority order (build / decide next)

### P0 — Blocking now

1. **Mac operator: Phase 1 repository equivalence** against Commit A (`cursor/phase1c-freeze-commit-a-d881`).
2. Fill `PHASE_1C_FINAL_VALIDATION.md` placeholders with full digests / device matrix (no `[INSERT]` marked verified).
3. **Tag `v1.0.0-phase1c`** on Commit A only; push; protect tag.
4. **Final architectural review** of Specs 1–6 → only then create **`CHANGE-0003`** for baseline approval + IR-0001 authorization.

### P1 — Immediately after gates

5. Execute **IR-0001** (isolated spike) per research scaffold; record RESULTS with device evidence.
6. Decide fate of **professional UX + black-frame** branches (cherry-pick to post-freeze Phase1 line or defer).
7. Refresh living memory (`ekp-prepare` / `handoff-prepare`) after freeze.
8. Address audit doc hygiene (Specs README branch role; root README status).

### P2 — First implementation increments (post IR)

9. Spec 003 adapter skeleton **behind protocols** for one authorized sensor concern (only per IR outcomes + directive).
10. Streaming ZIP / package writer before large payloads.
11. Retire `FileEvidenceExporter` / legacy still service if still unused.
12. Draft Specs 7–10 only as needed for next IR — do not bulk-author unimplemented worlds.

### P3 — Later

13. Spec 005 telemetry records; Spec 006 quality metrics (not black-frame alone).
14. Spatial/ARKit/LiDAR depth pipeline.
15. Real attestation/seal (retire mocks).

## What not to do

- Do not create CHANGE-0003 early.
- Do not populate `App/Quality` or `App/Spatial` “to make progress.”
- Do not claim COMPLETE / BASELINE_APPROVED / IR authorized without artifacts.
- Do not rewrite Canonical JSON or inventory formats.

## Risk level

High if order inverted (coding before baseline).

## Recommended action

Treat this file as the operational queue; update statuses in PROJECT_STATE after each gate.

## Priority

P0

## Confidence

High
