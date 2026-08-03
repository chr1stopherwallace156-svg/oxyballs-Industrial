# CHANGE-0002 — Capture v2 Specifications 1–6 hardening and twelve-point correction pass

| Field | Value |
|---|---|
| **Change ID** | `CHANGE-0002` |
| **Title** | Capture v2 Specifications 1–6 hardening and twelve-point correction pass |
| **Status** | `IMPLEMENTED` / `FINAL_ARCHITECTURAL_REVIEW_PENDING` / `NOT_BASELINE_APPROVED` |
| **Scope** | Commit B+ (after Phase 1 tag) — must **not** enter `v1.0.0-phase1c` |
| **Related** | `CHANGE-0001` (Commit A freeze isolation); future `CHANGE-0003` (baseline + IR-0001 auth) |

## Status

```text
IMPLEMENTED
FINAL_ARCHITECTURAL_REVIEW_PENDING
NOT_BASELINE_APPROVED
```

Authoritative Specs gate:

```text
V2_SPECIFICATIONS_4_TO_6_DRAFTED
CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS
CORRECTION_PASS_APPLIED
BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
```

This record does **not** claim `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` or
`AUTHORIZED_FOR_IR_0001_EXECUTION`.

## Purpose

Document Capture v2 Specs 1–6 hardening and the twelve-point correction pass as
an implemented specification change pending final architectural review — without
premature baseline promotion.

## Records

- Specs 1–3 hardening (`EC-V2-SPEC-001`…`003`).
- Specs 4–6 drafting (`EC-V2-SPEC-004`…`006`).
- Twelve corrections from cross-spec review.
- Entity/state registry (`V2_CROSS_SPEC_ENTITY_STATE_REGISTRY.md`).
- Semantic-matte production exclusion (deferred research only).
- Sensor/evidence lifecycle separation.
- Telemetry and determinism refinements.
- Current baseline-review status (`NOT_BASELINE_APPROVED`).

## Explicit non-claims

- Not a baseline approval or status promotion.
- Does not authorize IR-0001 execution (that is future `CHANGE-0003`).
- Must not be included in Commit A / tag `v1.0.0-phase1c`.

## Previous / new behavior

| Aspect | Previous | New |
|---|---|---|
| Specs 1–3 | Hardened stubs / incomplete | Hardened contracts |
| Specs 4–6 | Missing / draft gaps | Drafted + correction pass |
| Baseline claim | Risk of premature APPROVED | Explicit `NOT_BASELINE_APPROVED` |
| Semantic mattes | Risk of production path | Production excluded |

## Compatibility impact

Documentation/contracts only. No production v2 camera/actor modules land until
baseline approval + IR-0001 measured results + implementation directive.

## Tests and evidence

- Specs are documentation; Linux/Mac `swift test` continues to exercise Phase 1 runtime.
- Consistency review: `Specifications/V2_SPECS_1_TO_6_CONSISTENCY_REVIEW.md`.

## Future `CHANGE-0003` (do not create until review passes)

```text
CHANGE-0003:
Capture v2 Specifications 1–6 baseline approval and IR-0001 authorization
```

## Remaining gates

1. Final architectural review → then `CHANGE-0003`.
2. Phase 1 Commit A + remote tag `v1.0.0-phase1c` before merging this Commit B tree into the freeze line.
3. Handoff refresh + hash verification under the governance rule for any follow-on change series.
