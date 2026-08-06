# ELEKTRON-ENG-CONST-001 — Compatibility Statement

| Field | Value |
|---|---|
| Candidate | `ELEKTRON-ENG-CONST-001` rev `1.1.0-candidate` · `NOT_ACTIVE` |
| Foundational Authority | `ELEKTRON-ENG-CONST-BASE-001` — **remains `ACTIVE_FOUNDATIONAL_CONSTITUTION`** |
| Application | **Prospective only** |

## Impact statement

```
No source-code or runtime behavior is intentionally changed.
Foundational governance remains active and unchanged in substance.
The candidate adds operational governance, terminology, review,
compatibility and future-development acceptance requirements.
```

## Prospective application

New operational requirements introduced by this candidate apply **prospectively**, from ratification
forward. They do not reach backwards into merged history.

Existing merged phases remain **historically valid under their accepted contracts**. They require
compatibility review before modification, or before downstream reliance on a newly governed claim.

**Phases 4A–4D are NOT retroactively classified as nonconformant.** They were delivered under the
contracts in force at their acceptance and remain valid on those terms. Where this candidate
introduces a stricter operational requirement (determinism classification, evidence-chain fields,
controlled-interpolation declarations, architectural review records), that requirement attaches at the
next point of change or reliance — not retroactively.

## Compatibility review triggers

A compatibility review under this standard is required when any of the following occurs:

1. A merged phase artifact is **modified**.
2. A **new phase or subsystem** consumes a prior phase's output as the basis of a *newly governed*
   engineering claim.
3. An **authority state is elevated** on the basis of a historical artifact.
4. A historical artifact is proposed for promotion into a **Governed Execution Output**.
5. A **schema migration** reinterprets historical bytes.

Review outcome is recorded additively; it never edits the historical artifact.

## Preserved guarantees

- **Immutable history.** Nothing in this candidate authorizes rewriting, deleting or destructively
  overwriting any historical evidence, locked release, or merged phase output.
- **Foundational continuity.** `BASE-001` is not deactivated, deprecated, weakened, reclassified or
  reinterpreted. Ratification of this candidate leaves its status unchanged.
- **Citation stability.** Existing citations to `BASE-001` articles remain valid; the qualified
  citation form removes ambiguity going forward without invalidating prior references.
- **No enforcement introduced.** This PR adds no CI, sentinel, hook, script or automated gate. Nothing
  begins failing on merge.

## In-flight work

PR #69 (Phase 4E specification candidate) is **not modified** by this PR and remains a frozen draft.
Any alignment of that specification with this standard belongs to its own governance track and
requires its own authorization.
