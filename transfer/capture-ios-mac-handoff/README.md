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
**Lineage:** `cursor/phase1c-evidence-library-handoff-d881` @ `d78446b` (`d78446b689577964cd04e1c2447d208df30cbf99`)

| Field | Value |
|---|---|
| Handoff | HANDOFF-0034 |
| Stage 1 | `HANDOFF_METADATA_COMMITTED` |
| Stage 2 | `dist-HANDOFF-0034/` — `DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED` |
| ZIP SHA-256 | `09ace83f99417c09dccfe132261c05bf96d1a2ca438e791fe3dc0f1253ee09f1` |
| Bundle SHA-256 | `7becae4913a9d12af770e8f11b4472c47cb7db2c55a792bc3b5df17538d14746` |

```bash
make handoff-prepare && git commit
make handoff-package   # → dist/HANDOFF-XXXX/
```

Single-shot `make handoff` is retired. Digests live under `dist-HANDOFF-0034/`, not in tracked `Handoff/`.
