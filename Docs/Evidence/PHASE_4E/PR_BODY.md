# Phase 4E — Contract & Governance Proposal (D-032, Proposed)

**PR state:** frozen draft. **Nothing is implemented, compiled, executed, or validated.**

## Summary

Establishes Phase 4E as a **specification and governance proposal** over the immutable Phase 4D
surface. Documentation and governance records only — no engine, no source, no package manifest,
no schema file, no executable, no delivery archive, no test evidence.

Baseline: Industrial main `48e6c1e` (PR #68, Phase 4D, D-031).

## Status

```text
PHASE_4E_STATE                = CONTRACT_SPEC_PROPOSED
IMPLEMENTATION_STATE          = NOT_IMPLEMENTED
SWIFT_ENGINE_STATE            = NOT_STARTED
VALIDATION_STATE              = NOT_EXECUTED
PHYSICAL_VALIDATION_STATE     = NOT_EXECUTED
ENGINEERING_USE_AUTHORITY     = FIXTURE_ONLY
ENGINEERING_METROLOGY_CLAIM   = FORBIDDEN
MANUFACTURING_RELEASE_CLAIM   = FORBIDDEN
PRODUCTION_MESH_CLAIM         = FORBIDDEN
COMPLETE_DIGITAL_TWIN_CLAIM   = FORBIDDEN
```

## Bound Phase 4D input (read-only, referenced in place)

```
Docs/Evidence/PHASE_4D/SURFACE-OUT-FIXTURE-000001/phase4e_handoff.json
schema_id             = Phase4EHandoffContract
surface_output_id     = SURFACE-OUT-FIXTURE-000001
output_closure_sha256 = fe043fdb7d2ce97562b8144826a873023c4f12417c2595dbfc058daa6366c641
```

`4d92e539…` remains inherited Phase 4C → Phase 4D lineage only. No Phase 4D evidence is copied
or duplicated.

## What the specification defines

- **Authority order:** immutable Phase 4D evidence → approved contracts/specification → canonical
  Swift implementation → fixture truth → optional independent verification tools. Verification
  tools may verify outputs; they may never define canonical behaviour.
- **Six separated authority dimensions:** geometry, scale, datum, measurement, characterization,
  engineering-use. No overloaded single state.
- **Declared-use-specific conclusions:** one region may be acceptable for battery-envelope
  packaging, provisional for harness routing, and unsuitable for bracket-hole release. No
  universal region disposition.
- **Authority elevation requirements:** presence of an evidence identifier grants nothing;
  elevation requires verified existence, integrity, lineage, scope, operating envelope, and
  declared-use applicability.
- **Requirements for the future canonical implementation:** immutable input binding; verification
  against committed bytes; closure/inventory/mesh-digest/lineage consistency; surface-ID
  substitution detection; authority-ceiling enforcement; claim locks; execution errors separated
  from engineering dispositions; fitting controls separated from validation controls; calibration
  validity; recapture contracts; deterministic tamper-test requirements; no geometry mutation.

## Correction history on this branch

The initial commit `6d5648e` proposed an invalid parallel implementation (invented top-level
source tree, a second package manifest, Swift sources/tests, Node validator programs, a shell
verification script, schemas, fixtures, generated evidence, and delivery archives) and asserted a
Node behavioural specification above the canonical Swift implementation. The corrective commit
removes those components and that authority relationship entirely, retaining only the valid ideas
restated as specification requirements. `6d5648e` is preserved in branch history as the forensic
starting point.

## Explicitly not claimed

Engine implementation · compilation · test execution · production vehicle mesh · engineering
metrology · manufacturing geometry or release · complete digital twin · physical device validation.

## Out of scope for this PR

Canonical Swift engine; Tier 1B; Tier 1C; Tier 2; physical calibration.

---

## Specification pass 02A — spatial authority hardening

Documentation-only. **No status plane changed; D-032 remains Proposed; nothing is implemented,
compiled, executed or validated.**

Added normative precision to the foundational contract:

1. **Normative-language convention** — MUST / SHOULD / MAY; examples non-normative unless labelled;
   prose cannot override a closed vocabulary, transition table or invariant.
2. **Six closed authority vocabularies** — geometry, scale, datum, measurement, characterization,
   engineering-use; each with meaning, minimum evidence basis, ordering-vs-categorical designation,
   and prohibited implications into other dimensions. Unknown values are rejected, never coerced.
   No generic authorized state exists: authorization is envelope-bound and declared-use-bound.
3. **Transition laws** — permitted edges per dimension; no skipped elevation without complete
   independent evidence; elevation never inferred from another dimension; demotion/revocation on
   invalid, contradictory, superseded or out-of-scope evidence; monotonicity within an evaluation
   except for recorded integrity-triggered revocation; seven-field transition records; and the
   implication (prohibited) vs prerequisite (permitted) distinction with four prerequisite laws.
4. **Identity and reference laws** — closed ID grammars (uppercase ASCII, digits, hyphens),
   case-sensitive, no whitespace normalization, uniqueness per artifact scope, duplicates and
   orphans as **distinct** hard failures with distinct error identifiers, last-write-wins
   prohibited, unresolved references never nulled; relationship identity keyed on canonical feature
   identities rather than control labels.
5. **Scale model** — represented separately from the datum transform; `S = diag(sx, sy, sz, 1)`;
   uniform, per-axis, anisotropic and regional residual distortion all characterized; regional
   residuals retained rather than averaged; scale correction never mutates Phase 4D vertices.
6. **Fitting vs validation controls** — `FITTING_ONLY` / `VALIDATION_ONLY` / `EXCLUDED`; overlap of
   relationship identity is a deterministic contract failure; states above `SINGLE_ANCHOR` require
   at least one independent validation relationship.
7. **Datum frames and transforms** — required frame declaration fields; the Phase 4D convention is
   inherited explicitly, never assumed; canonical unit **millimetres** with explicit recorded
   conversion; normative order `p_engineering = T_datum × S_scale × p_phase4d` (column vectors);
   SE(3) validity criteria; reflection, scale-bearing, singular, unstable or ambiguous fits yield
   `UNRESOLVED` with no arbitrary candidate selected.
8. **Execution semantics** — execution status distinguished from engineering disposition; thirteen
   stable specification identifiers; fail-closed on identity/integrity/reference failure; partial
   authoritative output prohibited; diagnostic output explicitly non-authoritative.
9. **Deterministic canonicalization** — UTF-8 without BOM, canonical key and array ordering, no
   NaN/infinity, negative zero normalized, versioned numeric formatting policy, environment-dependent
   fields excluded from hashed payloads, byte-identical reproducibility, canonicalization policy
   identity in lineage.

The failure matrix now carries **20 cases**, each bound to a required execution identifier or
explicitly marked an engineering outcome; all remain `SPECIFIED_NOT_EXECUTED`.

**No numeric threshold is invented by this pass.** Anisotropy threshold, SE(3) tolerances,
conditioning bound, validation-control counts and canonical decimal precision are all versioned
configuration or policy values requiring separate approval.

**Deferred to pass 02B:** measurement-record schemas; GUM uncertainty budgets; engineering-use
policy registries and decision-rule identity; guard-band semantics; closed disposition and
reason-code vocabularies; recapture-contract schemas; characterization-report schema.
