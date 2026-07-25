# capture-ios Mac handoff

## Track A — Phase 1 freeze

**Status:** `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`  
**Lineage:** `cursor/phase1c-freeze-commit-a-d881`

| Artifact | SHA-256 |
|---|---|
| freeze-prep.zip | `8990c7407e742fc47f75770c57d18a7f4d1f0e7ccfddc2159c88a85f24855e7f` |
| freeze-prep.bundle | `3116f4b7ca43ca5aad0857c62a631c277072e28615b7e81a7bcbeca9deb869f1` |

## Track B — Specs & two-stage handoff

**Status:** `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW`  
**Spike:** `IR_0001_EXECUTION_NOT_YET_AUTHORIZED`  
**Lineage:** `cursor/phase1c-evidence-library-handoff-d881` @ `dcc8c62` (`dcc8c62c3ee1e84754f9e12a6a8cc55d772681a7`)

| Field | Value |
|---|---|
| Handoff | HANDOFF-0034 |
| Stage 1 | `HANDOFF_METADATA_COMMITTED` |
| Stage 2 | `dist-HANDOFF-0034/` — `DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED` |
| ZIP SHA-256 | `6b6640f56d6dcd87ee9aa053e8453342cec2bb281dcf28f6593d9dfc8539053a` |
| Bundle SHA-256 | `efb18d954fd7aaaa96084760d5aeb5f1a388bdb9d54d489809393dc90dfbc7e1` |

```bash
make handoff-prepare && git commit
make handoff-package   # → dist/HANDOFF-XXXX/
```
