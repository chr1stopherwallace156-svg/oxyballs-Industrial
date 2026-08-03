# capture-ios Mac handoff


## Historical — Pass 2 preview/review gate (`e33bb21`) — HARD STOP

**Status:** submitted for operator review — **NOT operator-approved**. Do **not** start Pass 3 until operator approval after independent verification.

| Field | Value |
|---|---|
| Capture branch | `cursor/pass2-preview-review-gate-d881` |
| Tip | `e33bb212368858aeddb34743bb0947e84576bd23` |
| Pass 1 approved ancestor | `9c35de663f3a64543738b57bc49426cd46256da0` |
| Implementation commit | `a47739f1472e0e33779ed709a65adc4bb0ec72c4` |
| Bundle | `elektron-capture-ios-pass2-complete.bundle` |
| Bundle SHA-256 | `c07777b2a94255c80e29319b777a6ef8e3d1e3a69c150c85e52905f0284ece47` |
| ZIP | `elektron-capture-ios-pass2-working-tree.zip` |
| ZIP SHA-256 | `9da3f2bbe4a93776bd390996b466084be7d231d9762769bba5f01d8857eb320e` |
| Evidence | `PASS2_APPROVAL_EVIDENCE/` |
| Device checklist | `PASS2_DEVICE_VALIDATION.md` (`PENDING_OPERATOR_MAC`) |
| Fresh-clone logs | `pass2-fresh-clone-swift-test.log`, `pass2-fresh-clone-handoff-layout.log` |
| Cloud `swift test` | 61 executed, 1 skipped, 0 failures |

```bash
git clone elektron-capture-ios-pass2-complete.bundle elektron-capture-ios-pass2
cd elektron-capture-ios-pass2
git checkout cursor/pass2-preview-review-gate-d881
git rev-parse HEAD   # expect e33bb212368858aeddb34743bb0947e84576bd23
git merge-base --is-ancestor 9c35de663f3a64543738b57bc49426cd46256da0 HEAD && echo PASS1_ANCESTOR_OK
./Scripts/verify-xcode-handoff.sh
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Pass 1 accepted generic hashes remain:

```text
ae40b27146750ab879b59a299fe98f817f2449d7012a426d55338fc0d289d45c  elektron-capture-ios-complete.bundle
85db178d7fb24dea593a4480140acfc0cbccf844ba14293b954fe44d2c64612b  elektron-capture-ios-working-tree.zip
```


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

## Historical — P1R-001 incident record + repair (`21d24e81`)

Preserved under commit-scoped names so they do not overwrite the generic handoff bundle/zip paths.

| Field | Value |
|---|---|
| Capture tip | `21d24e8131426511d79dcda812721ac1e3104a7c` |
| Branch | `cursor/canonicalization-failed-repair-d881` |
| Includes | `Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md` (+ ADR-001) |
| Bundle | `elektron-capture-ios-21d24e81.bundle` |
| Bundle SHA-256 | `83b061ca2ced452bffe6b10277e6bb4f8aa0ffccb15678992066e5c9664589c7` |
| ZIP | `elektron-capture-ios-21d24e81-working-tree.zip` |
| ZIP SHA-256 | `34943780314eee07a6b0b3e7d4273e8116d97f47c30c43e26ec7d3acc47ecb77` |
| Status | `PENDING_PHYSICAL_DEVICE_RETEST` (not physical closure of P1R-001) |

```bash
git clone elektron-capture-ios-21d24e81.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
open Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

## Historical — P1R-001 retest CANDIDATE (`cca69f88`)

**Not** a physically validated release snapshot. Preserved under commit-scoped names so they do not overwrite the generic handoff bundle/zip paths.

| Field | Value |
|---|---|
| Capture tip | `cca69f88a7ffe1d4323da4da3bfc12126eb88977` |
| Branch | `cursor/canonicalization-failed-repair-d881` |
| Incident | P1R-001 OPEN / `PENDING_PHYSICAL_DEVICE_RETEST` |
| Bundle | `elektron-capture-ios-cca69f88.bundle` |
| Bundle SHA-256 | `b29ac788c227e85f7050d13dee655725f20fb31494111b906b38dfd8e54c81f1` |
| ZIP | `elektron-capture-ios-cca69f88-working-tree.zip` |
| ZIP SHA-256 | `efe71f14f032b5004cc9927bfdecb091338ab786afe508779e0057e5b1dc2e0e` |
| Reject | `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` |

```bash
git clone elektron-capture-ios-cca69f88.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
# or: git checkout cca69f88a7ffe1d4323da4da3bfc12126eb88977
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
# Build → Install on iPhone → Capture & Export
# Then fill Docs/Incidents/PHASE_1_RUNTIME_INCIDENT_001.md Acceptance Evidence
```

## Historical — fresh P1R-001 retest CANDIDATE (`4bc8ae65`)

**Not** a physically validated release snapshot. Artifacts landed on `main` via #14; README section restored here.

| Field | Value |
|---|---|
| Capture tip | `4bc8ae65be8c287c211aeab7b2ae7ba1dfd29e0d` |
| Branch | `cursor/canonicalization-failed-repair-d881` |
| Status | P1R-001 OPEN / `PENDING_PHYSICAL_DEVICE_RETEST` |
| Bundle | `elektron-capture-ios-4bc8ae65.bundle` |
| Bundle SHA-256 | `8765944f8c159ae3c26fbf496a0bc3a6a0abf7d93757d36118d69f6eaa3f8e00` |
| ZIP | `elektron-capture-ios-4bc8ae65-working-tree.zip` |
| ZIP SHA-256 | `d126abe3709f29297d326a49c6bcede2b4c6699c918b62a885d263d4ccc20a6e` |
| Reject | `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` |

```bash
git clone elektron-capture-ios-4bc8ae65.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

## Historical — CANDIDATE pin `005382b` (local package handoff harden)

**Not validated.** P1R-001 remains open until physical Capture & Export proof. Prefer pin-named files; do **not** use generic `elektron-capture-ios-complete.bundle` / `elektron-capture-ios-working-tree.zip` for this tip (those names hold later handoff bytes on `main`).

| Field | Value |
|---|---|
| Capture tip | `005382b06c0e88053aad298f4e4650cd45f49306` |
| Subject | fix(xcode): harden local ElektronCapture package handoff |
| Bundle | `elektron-capture-ios-005382b.bundle` |
| Bundle SHA-256 | `b04157c9e3060e7c218f2d70bf97c3f8f2e340d671da4d85bc510b9f74ecd7db` |
| ZIP | `elektron-capture-ios-005382b.zip` |
| ZIP SHA-256 | `863b070fa1be9d9fc62b31d683219d0ff265dde3c72b205e0e9b984004830c1d` |
| Manifest | `CANDIDATE_HANDOFF_MANIFEST.md` |
| Reject | `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` |

```bash
git clone elektron-capture-ios-005382b.bundle elektron-capture-ios-005382b
cd elektron-capture-ios-005382b
git rev-parse HEAD   # must be 005382b06c0e88053aad298f4e4650cd45f49306
./Scripts/verify-xcode-handoff.sh
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
```

## Historical — lifecycle / black-frame CANDIDATE (`413dfe5`)

**Not** Phase 1 complete. Black-frame root cause remains **UNDER INSTRUMENTATION**. Prefer pin-named files; do **not** use generic `elektron-capture-ios-complete.bundle` / `elektron-capture-ios-working-tree.zip` for this tip.

| Field | Value |
|---|---|
| Capture tip | `413dfe59efd567777e16d289d4f054d30c571fac` |
| Subject | feat(capture): lifecycle logs, preview shutter, black-frame guard |
| Bundle | `elektron-capture-ios-lifecycle.bundle` |
| Bundle SHA-256 | `1f39196a90e5e9d875bf47d093105b7f407a9faa52b39b207ba7536e2b2766a6` |
| ZIP | `elektron-capture-ios-lifecycle.zip` |
| ZIP SHA-256 | `ecab86c7b5b067e7661997b2338727e45f96d9c99f4a9fdc9a19c34fa7939a81` |
| Manifest | `CANDIDATE_HANDOFF_MANIFEST_413dfe5.md` |
| Cloud `swift test` | 58 executed, 1 skipped, 0 failures |

```bash
git clone elektron-capture-ios-lifecycle.bundle elektron-capture-ios-lifecycle
cd elektron-capture-ios-lifecycle
git rev-parse HEAD   # must be 413dfe59efd567777e16d289d4f054d30c571fac
./Scripts/verify-xcode-handoff.sh
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
```


## Historical — professional Take→Approve→Export UX CANDIDATE (`2f61be34`)

**Not** Phase 1 complete. Prefer pin-named files; do **not** use generic `elektron-capture-ios-complete.bundle` / `elektron-capture-ios-working-tree.zip` for this tip.

| Field | Value |
|---|---|
| Capture tip | `2f61be34f37b72367b9a7945ff9e192dc2580789` |
| Workflow | PREVIEWING → CAPTURING → REVIEWING → APPROVED → EXPORTED |
| Bundle | `elektron-capture-ios-pro-ux.bundle` |
| Bundle SHA-256 | `412ee5ed69803a27603122090dc0471ec7faff365801990937b1464d5d7ab99a` |
| ZIP | `elektron-capture-ios-pro-ux.zip` |
| ZIP SHA-256 | `26940209b3ba3c3e99f34b1eba7a0a0382f9e37ccc55789e80061d07839b08bd` |
| Manifest | `CANDIDATE_HANDOFF_MANIFEST_2f61be34.md` |
| Cloud `swift test` | 66 executed, 1 skipped, 0 failures |

```bash
git clone elektron-capture-ios-pro-ux.bundle elektron-capture-ios-pro-ux
cd elektron-capture-ios-pro-ux
git rev-parse HEAD   # must be 2f61be34f37b72367b9a7945ff9e192dc2580789
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
```
