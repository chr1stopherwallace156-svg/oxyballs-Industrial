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


## Elektron Knowledge Package (EKP-CAPTURE-0001)

Not a coding-session handoff. Full subsystem knowledge snapshot.

| Field | Value |
|---|---|
| Capture tip | `792f6b4` |
| Envelope | `dist-EKP-CAPTURE-0001/` |
| ZIP | `capture-ekp-792f6b42430b87f7bbd09c88e922b4594436f579.zip` |
| ZIP SHA-256 | `2750ee0120def1ba56dd0ed831b5518de6f6f44e15ea8cd2f0b6191d1e1a10b4` |
| Bundle SHA-256 | `3ff9a04b1de00b9cc72c9a58df3faffa9e16b5fe4d3625b309a8729e0ab6be00` |
| Living docs | `PROJECT_STATE.md`, `IMPLEMENTATION_HANDOFF.md`, `REPOSITORY_MEMORY.md` |

```bash
make ekp-prepare && git commit
make ekp-package   # → dist/EKP-CAPTURE-XXXX/
```

