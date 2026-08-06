# ELEKTRON-ENG-CONST-001 — Terminology Compatibility

`ENG-CONST-001` Article XI binds the definitions of **Verification** (implementation conforms to
specification under tested conditions) and **Validation** (empirical proof that specification and
system satisfy physical engineering requirements — specification ≡ physical reality).

Historical repository tokens predate that distinction. **Historical records remain unedited.** The
mapping below records canonical interpretation without rewriting history.

## Recorded mapping

```yaml
Legacy Token:
  VALIDATION_STATE = LINUX_FIXTURE_VALIDATED

Canonical Interpretation:
  SOFTWARE_VERIFICATION_STATE = LINUX_FIXTURE_VERIFIED

Artifact Role:
  VERIFICATION_ARTIFACT

Meaning:
  Evidence that the implementation conformed to the applicable
  specification under Linux synthetic-fixture conditions.

Physical Validation Meaning:
  NONE

Migration Policy:
  LEGACY_TERM_RETAINED_FOR_HISTORICAL_COMPATIBILITY
```

## Application rules

1. **Historical artifacts are not edited.** Existing occurrences of `VALIDATION_STATE` across merged
   phases remain exactly as recorded. This document supplies interpretation, not modification.
2. **The legacy token carries no physical-validation meaning.** `LINUX_FIXTURE_VALIDATED` asserts
   software verification under synthetic fixtures on Linux. It asserts **nothing** about physical
   reality, hardware, metrology, or field conditions.
3. **Prospective use.** New artifacts created after ratification should use the canonical
   verification terminology and reserve *validation* for empirical proof against physical reality.
4. **No retroactive nonconformance.** Use of the legacy token in Phases 4A–4D is not a violation and
   must not be reported as one.
5. **Reading historical records.** When a historical `VALIDATION_STATE` value is relied upon for a
   newly governed claim, it must be read through this mapping — as verification evidence, never as
   physical validation.

## Scope observed at analysis time

`VALIDATION_STATE` appears in **26** repository markdown files at `main` `48e6c1e`, including
`VALIDATION_STATE = LINUX_FIXTURE_VALIDATED` on merged reconstruction phases. None is modified by
this PR.
