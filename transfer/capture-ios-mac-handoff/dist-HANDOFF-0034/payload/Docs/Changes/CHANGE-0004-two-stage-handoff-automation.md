# CHANGE-0004 — Two-stage handoff automation contract (prepare → package → dist/)

| Field | Value |
|---|---|
| **Change ID** | `CHANGE-0004` |
| **Title** | Two-stage handoff automation contract (prepare → package → dist/) |
| **Status** | `IMPLEMENTED` / `HANDOFF_AUTOMATION_CONTRACT_DEFINED` |
| **Branch** | `cursor/phase1c-evidence-library-handoff-d881` |
| **Scope** | Commit B+ automation — must not enter `v1.0.0-phase1c` |

## Status

```text
IMPLEMENTED
HANDOFF_AUTOMATION_CONTRACT_DEFINED
CORRECTED_TO_TWO_STAGE_MODEL
```

Toolchain classification:

```text
GOVERNANCE_MODEL_APPROVED
AUTOMATION_CONTRACT_REQUIRES_CORRECTION → CORRECTED_TO_TWO_STAGE_MODEL
HANDOFF_AUTOMATION_CONTRACT_DEFINED
HANDOFF_TWO_STAGE_SHELL_AUTOMATION_IMPLEMENTED
```

## Purpose

Eliminate stale-artifact and circular-hash paradoxes from single-shot in-tree
handoff packaging by separating tracked metadata (Stage 1) from external
distribution digests/archives (Stage 2).

## Records

- Retire `make handoff` / in-tree `Handoff/artifacts` + `SHA256SUMS.txt` packaging.
- Add `make handoff-prepare` → tracked `Handoff/` metadata + history append.
- Add `make handoff-package` → clean HEAD only → `dist/handoff-<id>/`.
- Diff-based `CHANGELOG.md` + `CHANGE-XXXX` gates vs `BASE_REF`.
- Deterministic digests + isolated bundle restoration verification.
- Intermediate completion state: `IMPLEMENTED_PENDING_COMPLETION_ARTIFACTS`.
- Track A / Track B status invariants reaffirmed (no premature baseline / freeze).

## Previous / new behavior

| Aspect | Previous | New |
|---|---|---|
| Packaging | Single-shot into `Handoff/` (dirty tree, circular hashes) | Two-stage; digests only in `dist/` |
| Completion state | `IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF` | `IMPLEMENTED_PENDING_COMPLETION_ARTIFACTS` + 12 sub-gates |
| Verification | In-tree `make handoff-verify` | Stage 2 digests + restoration in `dist/` |

## Compatibility impact

Operators must use prepare → commit → package. Legacy targets exit with migration instructions. `dist/` is gitignored.

## Explicit non-claims

- Does not freeze Phase 1 or create `v1.0.0-phase1c`.
- Does not approve Specs baseline or authorize IR-0001 (`CHANGE-0003` still future).

## Tests and evidence

- `make handoff-prepare` (swift test inside prepare)
- `make handoff-package` → `DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED`
- Linux suite: 89 executed / 0 failures (typical)

## Remaining gates

1. Operator Mac: Track A freeze sequence.
2. Architectural review → `CHANGE-0003`.
3. Optional future Swift-native generator may wrap the same contract; shell path is the audited procedure now.
