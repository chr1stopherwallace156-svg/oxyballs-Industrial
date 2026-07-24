# capture-ios Mac handoff

## Current — Pass 2 share-presentation fix (P2-004)

**Status:** submitted for operator device verification — share/AirDrop/Files hardening  
Preserves Pass 1 gates and Pass 2 freeze rules. Does **not** re-encode `artifact_original.jpg`.

| Field | Value |
|------|---------|
| Capture branch | `cursor/pass2-share-presentation-d881` |
| Tip | `c59b84da7795373a3f160245fee34325ce000523` |
| Parent (Pass 2 evidence tip) | `e33bb212368858aeddb34743bb0947e84576bd23` |
| Pass 1 approved ancestor | `9c35de663f3a64543738b57bc49426cd46256da0` |

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-share-complete.bundle` | `5669a1dae55baad26759c2bdc55896a05a1a30dab7873f2777619984953f8d6e` |
| `elektron-capture-ios-pass2-share-working-tree.zip` | `086e1b9828bc1d1b661dc1aaf0f54078817ca46ee31cd21841b5bf489de3a379` |

Fresh-clone: `pass2-share-fresh-clone-swift-test.log` — **66 executed, 1 skipped, 0 failures**; `HANDOFF_LAYOUT_OK`  
Evidence: `PASS2_SHARE_FIX_EVIDENCE/`  
Device checklist (updated Share/ZIP rows): see capture-ios `Docs/Evidence/PASS2_DEVICE_VALIDATION.md`

```bash
git clone elektron-capture-ios-pass2-share-complete.bundle elektron-capture-ios-pass2-share
cd elektron-capture-ios-pass2-share
git checkout cursor/pass2-share-presentation-d881
git rev-parse HEAD   # expect c59b84da7795373a3f160245fee34325ce000523
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

After export on device use:
1. **Share .edts-pkg** (AirDrop)
2. **Save .edts-pkg to Files**
3. **Export as ZIP copy** (diagnostic; same bytes, `.zip` extension; canonical `.edts-pkg` kept)

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
