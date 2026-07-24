# capture-ios Mac handoff

> **Download ZIP (regenerated):** [`DOWNLOAD-elektron-capture-ios-pass2-import.zip`](DOWNLOAD-elektron-capture-ios-pass2-import.zip)  
> SHA-256 `4ba0fea7b810ca8e1a61686f85bfe47d42bf1b1dad8e7c4261d924a19e037e94` — tip `e37f5b7` with **`public struct CameraPreviewView`**.  
> Prior ZIP `9ee9951f…` / commit `50b5f8e` did **not** include this fix — discard it.


## Current — Pass 2 import root-cause tip `d41e513` (**HARD STOP**)

| Field | Value |
|------|---------|
| Tip | `d41e513f90475aff9d6b9699bd4545c4969c8746` |
| Code fix | `0e14081` — `import ElektronCapture` in RootView |
| Product linkage | Present in pbxproj (not the failure mode) |
| Linux | `HANDOFF_LAYOUT_OK` + `HANDOFF_XCODE_BUILD_SKIPPED` |
| Mac still required | `HANDOFF_XCODE_BUILD_OK` + physical export verification |

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-import-d41e513.bundle` | `5551e6affaa12a2986516fb74a41a24f3722b2c118204f4cbeadb56cbd6cc209` |
| `elektron-capture-ios-pass2-import-d41e513-working-tree.zip` | `91c20bd3479609a110ba35c349b9d486b7e63638165ad18b08cd8382575cda60` |

See [`MAC_CLONE_FROM_BUNDLE.md`](MAC_CLONE_FROM_BUNDLE.md) and `PASS2_IMPORT_FIX_EVIDENCE/HARD_STOP.md`.

---

## Prior — Pass 2 approval package (pending full Pass 2 approval)

Tip: `e33bb212368858aeddb34743bb0947e84576bd23`  
Artifacts: `elektron-capture-ios-pass2-complete.bundle` / `elektron-capture-ios-pass2-working-tree.zip`  
Evidence: `PASS2_APPROVAL_EVIDENCE/`

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-complete.bundle` | `c07777b2a94255c80e29319b777a6ef8e3d1e3a69c150c85e52905f0284ece47` |
| `elektron-capture-ios-pass2-working-tree.zip` | `9da3f2bbe4a93776bd390996b466084be7d231d9762769bba5f01d8857eb320e` |

---

## Pass 1 — operator-approved (merged to main via #18)

Tip: `9c35de663f3a64543738b57bc49426cd46256da0`  
Parent: `597ebb3db4317024a41e701412e1b635c0d6ce1e`  
Baseline: `31513ac1b12626e89020f8ac998247b68d84f1d6`

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-complete.bundle` | `ae40b27146750ab879b59a299fe98f817f2449d7012a426d55338fc0d289d45c` |
| `elektron-capture-ios-working-tree.zip` | `85db178d7fb24dea593a4480140acfc0cbccf844ba14293b954fe44d2c64612b` |

Fresh-clone `swift test` log: `fresh-clone-swift-test.log`  
Full evidence: `PASS1_APPROVAL_EVIDENCE/`

```bash
git clone elektron-capture-ios-complete.bundle elektron-capture-ios-pass1
cd elektron-capture-ios-pass1
git rev-parse HEAD   # expect 9c35de663f3a64543738b57bc49426cd46256da0
```

---

## Historical — verified tip `c3581d04` (from main / PR #10)

Preserved so earlier Mac-export artifacts are not overwritten by Pass 1 / Pass 2.

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-c3581d04.bundle` | `63721a127835c73dcb3897eb203dda5d9436408a5bd07fbf4986ed5507a5098d` |
| `elektron-capture-ios-c3581d04-working-tree.zip` | `77baf9f91f066745492d542028fd7e3e5deafa7501d7311d1893466b23b7f47b` |

```bash
git clone elektron-capture-ios-c3581d04.bundle elektron-capture-ios-c3581d04
cd elektron-capture-ios-c3581d04
git checkout feature/phase1-single-still-runtime
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

**Reject** any file with SHA-256 `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` (wrong product: Industrial/EDTS runtime).
