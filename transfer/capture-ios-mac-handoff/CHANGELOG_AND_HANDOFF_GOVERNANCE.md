# CHANGELOG AND HANDOFF GOVERNANCE

Every meaningful code, specification, contract, schema, workflow, status,
test, validation, evidence, or repository-governance change must update:

1. `CHANGELOG.md`
2. The relevant detailed change record
3. The handoff package (`Handoff/`)
4. The handoff manifest and file inventory
5. The SHA-256 digest list
6. The handoff status summary

These updates must occur in the same pull request or implementation commit
series as the underlying change.

A change is not complete merely because the source code or specification was
updated. It remains `IMPLEMENTED_PENDING_CHANGE_DOCUMENTATION_AND_HANDOFF`
until the changelog and handoff artifacts accurately reflect the new state.

## Completion rule

```text
IMPLEMENTATION_COMPLETE
requires
IMPLEMENTATION
+ TESTS
+ EVIDENCE
+ CHANGELOG
+ HANDOFF_REFRESH
+ HASH_VERIFICATION
```

Without the updated handoff:

```text
IMPLEMENTED_PENDING_HANDOFF_REFRESH
```

## Permanent rule

```text
NO CHANGE WITHOUT CHANGELOG
NO COMPLETION WITHOUT HANDOFF
NO HANDOFF WITHOUT VERIFIED HASHES
NO RELEASE WITHOUT AUTHORITATIVE TAG
```

## Commands

```bash
make handoff          # regenerate Handoff/ + ZIP + bundle + digests
make handoff-verify   # unpack and independently verify digests
```

## Phase 1 release distinction

A normal implementation handoff may be marked:

```text
HANDOFF_GENERATED
HANDOFF_VERIFIED
```

Phase 1C must remain:

```text
PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE
```

until authoritative validation, Commit A, annotated tag `v1.0.0-phase1c`, remote
confirmation, and GitHub protection are complete.

## History

Do not silently overwrite handoff history. Append to
`Docs/Handoffs/HANDOFF_HISTORY.md` on every regeneration.
