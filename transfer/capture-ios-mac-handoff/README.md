# capture-ios Mac handoff

## Current — Pass 2 import fix + discrepancy evidence

| Field | Value |
|------|---------|
| Tip | `8fef5dce2a0099ad4311085d00192e945b10a861` |
| Code fix | `0e1408141df1580b8f4638c8c83b58c626b64152` (`import ElektronCapture` in RootView) |
| Claim level | Leading hypothesis pending Mac `xcodebuild` + `-showBuildSettings` |

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-import-8fef5dc.bundle` | `84418ba59797fe77d1a1917c7b3375171807b51dd5fdf0b00f9131910037b8f8` |
| `elektron-capture-ios-pass2-import-8fef5dc-working-tree.zip` | `c557afbf9bc539a501fbd9f664c2b6f3af264a92f0f20ce6b4f06df7747e5a35` |

Evidence: `PASS2_IMPORT_FIX_EVIDENCE/` (`ROOT_CAUSE_SWIFT_BUILD_VS_XCODE.md`).  
Clone: [`MAC_CLONE_FROM_BUNDLE.md`](MAC_CLONE_FROM_BUNDLE.md).

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
