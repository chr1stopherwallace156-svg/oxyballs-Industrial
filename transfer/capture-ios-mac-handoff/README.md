# capture-ios Mac handoff

## Track A — Phase 1 freeze (Commit A isolation)

**Status:** `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`  
**Lineage:** `cursor/phase1c-freeze-commit-a-d881`

| Artifact | SHA-256 |
|---|---|
| freeze-prep.zip | `8990c7407e742fc47f75770c57d18a7f4d1f0e7ccfddc2159c88a85f24855e7f` |
| freeze-prep.bundle | `3116f4b7ca43ca5aad0857c62a631c277072e28615b7e81a7bcbeca9deb869f1` |

## Track B — Specs & two-stage handoff

**Status:** `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW`  
**Spike:** `IR_0001_EXECUTION_NOT_YET_AUTHORIZED`  
**Lineage:** `cursor/phase1c-evidence-library-handoff-d881` @ `205c080`

| Field | Value |
|---|---|
| Handoff | HANDOFF-0034 |
| Stage 1 | `HANDOFF_METADATA_COMMITTED` |
| Stage 2 | `dist-HANDOFF-0034/` (`DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED`) |
| ZIP SHA-256 | `fcd40dad195b24d3bb946ec1503924b456dfd59d7d80ff7fa6729b8cb42ca9fb` |
| Bundle SHA-256 | `ae1a9165173c55c30cc21573e50671e9905926c8bf6a5c39d969be13800ea6e2` |

```bash
make handoff-prepare   # commit metadata
make handoff-package   # clean HEAD → dist/HANDOFF-XXXX/
```

Single-shot `make handoff` is retired.
