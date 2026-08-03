# Pass 2 approval request — reproducible evidence

**Status:** submitted for operator review — **NOT operator-approved**  
**HARD STOP:** Pass 3 must not start until operator approval of this package.

> Passing tests is not sufficient if achieved by weakening byte-identity, inventory completeness, status ownership, or artifact-integrity assertions.

Pass 1 gates remain in force (operator-approved tip `9c35de6`).

---

## Commit identity

| Field | SHA |
|---|---|
| Pass 1 approved tip (parent baseline for Pass 2) | `9c35de663f3a64543738b57bc49426cd46256da0` |
| Pass 2 implementation | `a47739f1472e0e33779ed709a65adc4bb0ec72c4` |
| Pass 2 evidence tip | *(see `IDENTITY.txt` after evidence commit)* |

Branch: `cursor/pass2-preview-review-gate-d881`

Tags **untouched** (Pass 1 / phase markers remain):
- `capture-ios-phase0-approved-v0.1.3`
- `capture-ios-phase1-directive-v0.1.4`

---

## Files changed vs Pass 1 tip `9c35de6`

| Path | Role |
|---|---|
| `App/Phase1/Phase1StillCaptureUIState.swift` | **Added** — UI state machine + Pending/Approved freeze types |
| `App/Capture/AVFoundation/Phase1CameraServices.swift` | Production — `InteractiveStillCaptureController` + post-delegate freeze |
| `App/Capture/AVFoundation/CameraPreviewView.swift` | **Added** — full-bleed `AVCaptureVideoPreviewLayer` |
| `App/Phase1/Phase1CaptureCoordinator.swift` | Production — `exportApproved` hash-invariance export |
| `Apps/Phase1StillCapture/Phase1CaptureRootView.swift` | Production — preview → Take → Retake/Use → Export UI |
| `Tests/Unit/Pass2PreviewReviewGateTests.swift` | **Added** — state machine + freeze + export invariance |
| `Docs/Capture/PHASED_EXECUTION_GATES.md` | Doc — Pass 2 submitted / hard stop |
| `Docs/Capture/PASS_APPROVAL_EVIDENCE_STANDARD.md` | Doc — Pass 2 hash timing |
| `Docs/Decisions/DECISION_LOG.md` | Doc — P2-001…P2-003 |
| `Docs/Evidence/PASS2_DEVICE_VALIDATION.md` | Doc — Mac device checklist |
| `Docs/Evidence/PASS2_APPROVAL_EVIDENCE/*` | This evidence package |

`git diff --name-status` for Tests/: only **A** `Pass2PreviewReviewGateTests.swift` — **zero deletions**. Pass 1 tests untouched.

---

## Production file explanations

### `Phase1StillCaptureUIState.swift`
Defines Pass 2 states and legal transitions. `PendingStillCapture.freezeFromDelegateBytes` hashes immediately; `promoteToApproved` copies bytes/SHA without recalculation.

### `Phase1CameraServices.swift`
Adds interactive preview session with warm-up shutter gate and interruption observers. Photo delegate freezes pending capture **before** continuation returns to UI.

### `CameraPreviewView.swift`
UIKit preview layer wrapper for full-bleed live preview.

### `Phase1CaptureCoordinator.swift`
`exportApproved` recomputes digest of frozen bytes, asserts equality with post-delegate SHA, builds package with those exact bytes, asserts `result.artifactSha256` matches.

### `Phase1CaptureRootView.swift`
Replaces one-button Capture & Export with Pass 2 flow. Review decode is throwaway `UIImage(data:)`. Export failure returns to `.approved` (P2-003). No Pass 3 flash/torch/lens UI (P2-002).

---

## Test explanations

### Added: `Pass2PreviewReviewGateTests.swift`
| Test | Purpose |
|---|---|
| `testHappyPathTransitions` | Full legal path to exported |
| `testRetakeFromReviewAndApproved` | Retake → previewing |
| `testExportFailureReturnsToApproved` | exporting → approved |
| `testIllegalSkipReviewRejected` | Cannot skip review/exporting |
| `testPackageWriteOnlyViaExporting` | approved ↛ exported directly |
| `testFreezeFromDelegateBytesComputesShaImmediately` | SHA at freeze |
| `testFreezeRejectsEmptyBytes` | Empty guard |
| `testPromoteDoesNotRecalculateOrReplaceBytes` | Promote identity |
| `testExportApprovedHashInvariance` | On-disk bytes == frozen SHA |
| `testExportApprovedDetectsTamperedFrozenSha` | Mismatch → HASH_READBACK_MISMATCH |

### Unchanged / not deleted
All Pass 1 and prior unit/golden tests remain. Linux CrossLanguage parse path still documented skip — not deleted.

---

## Bug / requirement narratives

### Requirement 1 — Post-delegate hash freeze (P2-001)

```text
Problem
  Late hashing / UI-held bytes can diverge from the captured still.

Root cause
  Hash must be bound to delegate fileDataRepresentation before review decode.

Fix
  PendingStillCapture.freezeFromDelegateBytes in delegate path; exportApproved asserts invariance.

Evidence
  Pass2PreviewReviewGateTests freeze + export tests; swift-test-full.log

Regression test
  testFreezeFromDelegateBytesComputesShaImmediately
  testExportApprovedHashInvariance
  testExportApprovedDetectsTamperedFrozenSha
```

### Requirement 2 — Review gate before export (P2-002 scope)

```text
Problem
  One-shot Capture & Export skips operator review.

Fix
  State machine requires reviewing → approved → exporting → exported.

Evidence
  testIllegalSkipReviewRejected, testPackageWriteOnlyViaExporting
```

### Requirement 3 — Export failure retains approved (P2-003)

```text
Problem
  Failed package write must not discard operator-approved still.

Fix
  Legal transition exporting → approved; UI keeps approvedCapture.

Evidence
  testExportFailureReturnsToApproved
```

---

## Integrity gates preserved

| Gate | Pass 2 stance |
|---|---|
| Byte-identity | Frozen JPEG bytes written exactly; SHA asserted at export |
| Inventory completeness | Unchanged builder/validator; Pass 1 tests still green |
| Status ownership | Still uses CaptureSideStatusGuard; no EDTS codes asserted |
| Artifact-integrity | HASH_READBACK_MISMATCH on tamper; no weakened assertions |
| Tests deleted | **None** |

---

## Automated evidence (this package)

| Artifact | Content |
|---|---|
| `swift-test-full.log` | Full terminal output — **61 executed, 1 skipped, 0 failures** |
| `handoff-layout.log` | `HANDOFF_LAYOUT_OK` |
| `git-evidence.txt` | rev-parse, log, show, diffstat |
| `tests-name-status.txt` | Per-case pass lines |
| `IDENTITY.txt` | Tip SHA + parent + bundle hashes (filled at mint) |

---

## Device validation

See `Docs/Evidence/PASS2_DEVICE_VALIDATION.md`.

Linux cloud agent: **cannot** run physical iPhone validation. Status: **PROCEDURE_SUBMITTED — PENDING_OPERATOR_MAC**.

Operator must run the Mac checklist before trusting capture UX on device. Automated `swift test` does not replace device validation.

---

## Decision Log IDs

- P2-001, P2-002, P2-003 (new)
- Pass 1 P1-001…P1-004 remain binding

---

## Bundle SHA-256

Filled in Industrial handoff `SHA256SUMS.txt` / `IDENTITY.txt` after mint.
