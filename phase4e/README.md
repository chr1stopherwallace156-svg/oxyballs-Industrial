# Phase 4E — Characterization / Governance / Measurement-Authority (Tier 1, contract foundation)

Phase 4E evaluates the **immutable Phase 4D surface** (`SURFACE-OUT-FIXTURE-000001`,
`Phase4EHandoffContract`) against declared engineering uses. It never mutates geometry and never
asserts engineering metrology. Swift SPM, matching the Phase 4D runtime
(`App/Domain/Reconstruction/*.swift`, `Package.swift`, `swift test`) — Phase 4A–4D are Swift.

## Immutable input (verified from committed main bytes, NOT copied from a PR body)
- Handoff: `Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001/phase4e_handoff.json`
- `output_closure_sha256 = fe043fdb…` (handoff == output_closure.json)
- canonical mesh (`surface_mesh_candidate.json`) recomputed = `9da47db6…` (== lineage manifest)
- lineage `LINEAGE-PHASE4D-000001`; inherited parent 4C closure `ae0887c6…` (**lineage only**,
  not the 4D→4E handoff). The `4d92e539…`/`CONTRADICTORY`/`LOW_CONFIDENCE`/`DUP-VX` values are the
  upstream 4C→4D `phase4d_handoff_contract.json` — inherited parent lineage, never validated here.

## Canonical engine vs out-of-band governance
- **Canonical numerical characterization engine:** the Swift package (`Sources/Phase4E*`). It is the
  authority for measurement/uncertainty/policy. *Authored here, NOT compiled* — the authoring host has
  no Swift toolchain; build/test on a Swift host: `swift build && swift test`.
- **Out-of-band governance / CI validators** (`bin/*.mjs`, pure Node, dependency-free): read-only
  digest/lineage/claim-lock verification for CI gating. **NOT** the canonical numerical engine.

## Verified here (REPRODUCED, deterministic) — `bash phase4e/verify-phase4e.sh` → 9/9 PASS
- `phase4e-handoff-verify.mjs` recomputes the real handoff/closure/inventory(29 files)/mesh/lineage → PASS.
- Tamper matrix all fail for the right reason: 4D closure mismatch · canonical mesh digest mismatch ·
  surface-ID substitution · metrology-authority elevation · ACCEPTABLE violating its decision rule ·
  orphaned recapture reference · impermissible governance enum.
- Evidence: `phase4e/evidence/validator_log.txt`, `phase4e/evidence/summary.json`.

## Authority ceilings (locked; enforced by the validators)
`ENGINEERING_USE_AUTHORITY = FIXTURE_ONLY` · `ENGINEERING_METROLOGY_CLAIM = FORBIDDEN` ·
`MANUFACTURING_RELEASE_CLAIM = FORBIDDEN` · `PRODUCTION_MESH_CLAIM = FORBIDDEN`. Software determinism
is separate from physical reproducibility (`UNVERIFIED` until Tier 3). No metrology/physical claim.

## Scope
Tier 1 contract foundation: schemas + governance/CI validators + input contracts + fixtures + tamper
matrix. Tier 1B/1C (SE(3) datum, GUM covariance/Welch–Satterthwaite, policy/recapture engines in Swift)
and Tier 2 (adversarial fixture suite) are **not** in this PR.
