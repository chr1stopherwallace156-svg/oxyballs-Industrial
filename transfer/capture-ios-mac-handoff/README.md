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

## Prior — Pass 2 approval package (still pending full approval)

Tip: `e33bb212368858aeddb34743bb0947e84576bd23`  
Artifacts: `elektron-capture-ios-pass2-complete.bundle` / `elektron-capture-ios-pass2-working-tree.zip`  
Evidence: `PASS2_APPROVAL_EVIDENCE/`

---

## Pass 1 — operator-approved (reference)

Approved tip: `9c35de663f3a64543738b57bc49426cd46256da0`  

```text
ae40b27146750ab879b59a299fe98f817f2449d7012a426d55338fc0d289d45c  elektron-capture-ios-complete.bundle
85db178d7fb24dea593a4480140acfc0cbccf844ba14293b954fe44d2c64612b  elektron-capture-ios-working-tree.zip
```

---

## Historical — tip `c3581d04` (PR #10)

`elektron-capture-ios-complete.bundle` / `elektron-capture-ios-c3581d04-working-tree.zip` on this tree are historical PR #10 artifacts.
