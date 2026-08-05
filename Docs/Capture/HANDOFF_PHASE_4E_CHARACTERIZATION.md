# Phase 4E — Characterization Handoff (specification proposal)

| Field | Value |
|---|---|
| Baseline (main) | `48e6c1e0dff665dfbb13208991f31664b8c2456f` (PR #68 merge, Phase 4D, D-031) |
| Decision | D-032 (**Proposed**) |
| Deliverable | Specification + governance documents only |
| Engine | **Not implemented.** Future Swift work in the established canonical source architecture |
| Validation | **Not executed** |

## Inherited input (read-only)

```
Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001/phase4e_handoff.json
schema_id             = Phase4EHandoffContract
surface_output_id     = SURFACE-OUT-FIXTURE-000001
output_closure_sha256 = fe043fdb7d2ce97562b8144826a873023c4f12417c2595dbfc058daa6366c641
phase4e_readiness     = READY_WITH_UNRESOLVED_BOUNDARIES
surface               = 47 vertices / 63 triangles / 2 boundaries / 1 hole
claims at handoff     = engineering metrology FORBIDDEN, production mesh FORBIDDEN,
                        complete digital twin FORBIDDEN
open item at handoff  = SCALE_DATUM_PENDING_PHASE4E
```

Inherited Phase 4C → Phase 4D lineage (`4d92e539…`, `RECON-OUT-FIXTURE-DENSE-FUSION-000001`) is
lineage context only, never the Phase 4E primary input. No Phase 4D evidence is copied or
duplicated by Phase 4E.

## What this handoff delivers

- `Docs/Capture/PHASE_4E_CHARACTERIZATION_AND_MEASUREMENT_AUTHORITY.md` — authority order,
  six separated authority dimensions, declared-use-specific conclusions, authority-elevation
  requirements, required capabilities, claim locks.
- `Docs/Evidence/PHASE_4E/` — status, PR body of record, change inventory, source-tree manifest,
  and a **proposed** failure matrix (every case `SPECIFIED_NOT_EXECUTED`).

## What this handoff does NOT deliver

No engine, package manifest, source file, schema file, executable, fixture payload, delivery
archive, or test evidence. No test was executed. No metrology, manufacturing-release, production-mesh
or digital-twin claim is made or implied.

## Next gate (requires separate approval)

Implement the canonical Swift characterization engine in the established canonical source
architecture, derived from the approved specification — not from any verification tool — then
deliver evidence following the Phase 4A–4D pattern.

## Specification pass 02A — spatial authority hardening

The specification was hardened in place (documentation only; no status change, no implementation).
Added normative content:

- **Normative-language convention** — MUST / SHOULD / MAY; examples non-normative unless labelled;
  prose cannot override a closed vocabulary, transition table, or invariant.
- **Six closed authority vocabularies** — geometry, scale, datum, measurement, characterization and
  engineering-use, each with meaning, minimum evidence basis, ordering-vs-categorical designation,
  and prohibited cross-dimension implications. Unknown values are rejected, never coerced. There is
  no generic authorized state; authorization is envelope- and declared-use-bound.
- **Transition laws** — permitted edges per dimension, no skipped elevation without complete
  independent evidence, demotion/revocation on invalid or contradictory evidence, monotonicity
  within an evaluation except for recorded integrity-triggered revocation, a seven-field transition
  record, and the implication (prohibited) vs prerequisite (permitted) distinction with four
  normative prerequisite laws.
- **Identity and reference laws** — closed ID grammars, case sensitivity, no whitespace
  normalization, uniqueness scope, duplicates and orphans as distinct hard failures with distinct
  error identifiers, prohibition of last-write-wins and of silently nulled references, and
  relationship identity defined by canonical feature identities rather than control labels.
- **Scale model** — separation from the datum transform, `S = diag(sx, sy, sz, 1)`, characterization
  of uniform / per-axis / anisotropic / regional residual distortion, retention of regional
  residuals, non-mutation of Phase 4D vertices, and per-state evidence bases.
- **Fitting vs validation controls** — closed role set, overlap as a deterministic contract failure.
- **Datum frames and transforms** — required frame declaration fields, explicit inheritance of the
  Phase 4D convention, canonical unit **millimetres** with explicit recorded conversion, normative
  operation order `p_engineering = T_datum × S_scale × p_phase4d` (column vectors), SE(3) validity
  criteria, and `UNRESOLVED` on reflection/singularity/instability/ambiguity.
- **Execution semantics** — execution status vs engineering disposition, thirteen stable
  specification identifiers, fail-closed behaviour, and prohibition of partial authoritative output.
- **Deterministic canonicalization** — encoding, ordering, non-finite prohibition, negative-zero
  normalization, exclusion of environment-dependent fields from hashed payloads, byte-identical
  reproducibility, and canonicalization policy identity in lineage.

All numeric thresholds, tolerances, conditioning bounds and decimal precision remain **versioned
configuration or policy values** requiring separate approval. None is fixed in this pass.

Deferred to specification pass 02B: measurement-record schemas; GUM uncertainty budgets;
engineering-use policy registries and decision-rule identity; guard-band semantics; the closed
disposition and reason-code vocabularies; recapture-contract schemas; and the characterization-report
schema.
