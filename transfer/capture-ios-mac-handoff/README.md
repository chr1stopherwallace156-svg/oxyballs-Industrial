# capture-ios Mac handoff

## Current — Pass 2 approval package (HARD STOP)

**Status:** submitted for operator review — **NOT operator-approved**  
Do **not** start Pass 3 until operator approval after independent verification.

| Field | Value |
|------|---------|
| Capture branch | `cursor/pass2-preview-review-gate-d881` |
| Tip | `e33bb212368858aeddb34743bb0947e84576bd23` |
| Pass 1 approved ancestor | `9c35de663f3a64543738b57bc49426cd46256da0` |
| Implementation commit | `a47739f1472e0e33779ed709a65adc4bb0ec72c4` |

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-complete.bundle` | `c07777b2a94255c80e29319b777a6ef8e3d1e3a69c150c85e52905f0284ece47` |
| `elektron-capture-ios-pass2-working-tree.zip` | `9da3f2bbe4a93776bd390996b466084be7d231d9762769bba5f01d8857eb320e` |

Fresh-clone logs:
- `pass2-fresh-clone-swift-test.log` — 61 executed, 1 skipped, 0 failures
- `pass2-fresh-clone-handoff-layout.log` — `HANDOFF_LAYOUT_OK`

Full evidence: `PASS2_APPROVAL_EVIDENCE/`  
Device checklist: `PASS2_DEVICE_VALIDATION.md` (**PENDING_OPERATOR_MAC**)

```bash
git clone elektron-capture-ios-pass2-complete.bundle elektron-capture-ios-pass2
cd elektron-capture-ios-pass2
git checkout cursor/pass2-preview-review-gate-d881
git rev-parse HEAD   # expect e33bb212368858aeddb34743bb0947e84576bd23
git merge-base --is-ancestor 9c35de663f3a64543738b57bc49426cd46256da0 HEAD && echo PASS1_ANCESTOR_OK
./Scripts/verify-xcode-handoff.sh
# then open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj on Mac
```

Pass 1 byte-identity / inventory / status / artifact-integrity gates are preserved.

---

## Pass 1 — operator-approved (reference)

Approved tip: `9c35de663f3a64543738b57bc49426cd46256da0`  
Industrial merge: `caeb8a8` on branch `cursor/pass1-canonical-inventory-handoff-d881`

Accepted hashes (do not regress):

```text
ae40b27146750ab879b59a299fe98f817f2449d7012a426d55338fc0d289d45c  elektron-capture-ios-complete.bundle
85db178d7fb24dea593a4480140acfc0cbccf844ba14293b954fe44d2c64612b  elektron-capture-ios-working-tree.zip
```

Pass 2 uses **versioned filenames** (`*-pass2-*`) so Pass 1 accepted artifacts are not overwritten on this branch.

---

## Historical — verified tip `c3581d04` (from main / PR #10)

| File | Notes |
|------|---------|
| `elektron-capture-ios-complete.bundle` | Historical product tip from PR #10 (not Pass 2) |
| `elektron-capture-ios-c3581d04-working-tree.zip` | Working tree for `c3581d04` |

**Reject** any file with SHA-256 `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` (wrong product: Industrial/EDTS runtime).
