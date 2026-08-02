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


## Canonical five-core memory artifacts (CHANGE-0006)

| Artifact | Path |
|---|---|
| Executive | `PROJECT_STATE.md` |
| Session | `CAPTURE_IMPLEMENTATION_HANDOFF.md` |
| Journal | `REPOSITORY_MEMORY.md` |
| Decisions | `Docs/Decisions/DECISION_LOG.md` |
| EKP | `dist-EKP-CAPTURE-0002/` + `ekp-capture-<sha>.zip` |

See `FIVE_CORE_MEMORY_ARTIFACTS.md`.

## EKP-CAPTURE-0002 @ Capture `b5fe020`

| Field | Value |
|---|---|
| ZIP | `ekp-capture-b5fe020c508e4588c90a865560e1ba783900fa4b.zip` |
| ZIP SHA-256 | `fa567bcb9825d2f959b9ee37c65b986ec13518ad35a133bd1d73fb3a191136f9` |
| Bundle SHA-256 | `8538f6449bec51ec7bc976966ed22a2ee6a44c7fe5714d2d50edbf69d7d90d2d` |
| Gates | `DIGESTS_VERIFIED` + `RESTORATION_TEST_PASSED` |

## Engineering audit (CHANGE-0007)

**Capture tip:** `58d4ba0` (`cursor/capture-v2-engineering-audit-d881`)  
**In-tree:** `Docs/Audits/` (executive + specialty reports + `FINAL_GAP_MATRIX.md`)  
**Download:** `DOWNLOAD-elektron-capture-v2-engineering-audit.zip`

| Field | Value |
|---|---|
| ZIP SHA-256 | `be6767806d09f5b9be9c0f251cec6cd57a763ff4e2325eb57ae9c9a2005a5886` |
| Non-claims | Does **not** approve baseline, authorize IR-0001, or freeze Phase 1 |
| Linux tests | `swift test` → 89 executed, 1 skipped, 0 failures |

One-line verdict: Phase 1 still-capture runtime is real and unit-tested; Capture v2 Specs 1–6 are documentation-only; Phase 1 is **not** frozen in git.

## Historical — CANONICALIZATION_FAILED Mac export (`1b132f41`)

Preserved under commit-scoped names so they do not overwrite the generic `elektron-capture-ios-complete.bundle` / `elektron-capture-ios-working-tree.zip` paths used by later handoffs.

| Field | Value |
|---|---|
| Capture tip | `1b132f4183d66d791ef94773201e3387cd2da747` |
| Branch | `cursor/canonicalization-failed-repair-d881` |
| Bundle | `elektron-capture-ios-1b132f41.bundle` |
| Bundle SHA-256 | `d13b317fe34f01f5924b8a1f31ee8d1d3755cd7feec450c45f769ac86aa9c892` |
| ZIP | `elektron-capture-ios-1b132f41-working-tree.zip` |
| ZIP SHA-256 | `f122dc26d79874afd2281d73c564edd6a05fef497710753e0844f797c9ffc7c5` |
| Reject | `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` |

```bash
git clone elektron-capture-ios-1b132f41.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Root cause: nil `Optional` fields in `capture_device.json` encoded as `NSNull` (was boxed as `Any` → `CanonicalJSON` rejected `Optional.none`).

