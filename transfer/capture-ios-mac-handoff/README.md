# capture-ios Mac handoff

## Current — Phase 1C freeze-prep (Commit A isolation)

**Status:** `PHASE_1C_VALIDATION_PASSED_IN_ZIP_SNAPSHOT_PENDING_AUTHORITATIVE_REPOSITORY_EQUIVALENCE_AND_FREEZE`  
**Tree:** Phase 1 only — **no** `Specifications/` / `Research/` (keeps `v1.0.0-phase1c` clean).

| Field | Value |
|------|---------|
| Branch | `cursor/phase1c-freeze-commit-a-d881` |
| Tip | `c3dea9f8164704c8323d2c539133283bad4d6a18` |
| ZIP SHA-256 | `eb2603f1e6a47f0b62ad988397a9385c20711d49539d3eb01e93b98f82f3afb3` |
| Bundle SHA-256 | `ccf2494adc83237c6a823634a990cf1341e4eaeff5c773903612d6965dedf753` |
| Commit B staging (after remote tag) | `cursor/phase1c-evidence-library-d881` @ `a0b8299052743cb9fdaac970f9417800d6113aef` |

```bash
git clone elektron-capture-ios-phase1c-freeze-prep.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/phase1c-freeze-commit-a-d881
git rev-parse HEAD   # expect c3dea9f8164704c8323d2c539133283bad4d6a18
# Equivalence check → fill validation → Commit A → tag v1.0.0-phase1c → push
```

Protocol: `Docs/Capture/PHASE_1C_FREEZE_COMMIT_SEPARATION.md`  
Also mirrored as `elektron-capture-ios-phase1c-evidence-library.zip` / `.bundle` and root `DOWNLOAD-…`.

---




## Also — Commit B+ staging (governance adopted; after remote freeze tag)

**Not for `v1.0.0-phase1c`.** `HANDOFF_VERIFIED`. Specs baseline **pending final sign-off**.

| Field | Value |
|------|---------|
| Tip | `d6f8ec384594500d818157c1f06ac810f00953da` |
| ZIP SHA-256 | `1c20c17e0ed6fdbea62207fe784908f916c7330cf5e60fff3339c8b588e9f1a9` |
| Bundle SHA-256 | `4ac3c884f7ad011c8596adeb70cbce58c732f1a1d05d5bf5ee1c1fda0b3c0b73` |

```bash
git clone elektron-capture-ios-phase1c-commit-b-staging.bundle elektron-capture-ios-v2-specs
cd elektron-capture-ios-v2-specs
git checkout cursor/phase1c-evidence-library-d881
git rev-parse HEAD   # expect d6f8ec384594500d818157c1f06ac810f00953da
make handoff-verify
```


## Prior — Pass 2 share-presentation fix (P2-004)

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

```bash
git clone elektron-capture-ios-pass2-share-complete.bundle elektron-capture-ios-pass2-share
cd elektron-capture-ios-pass2-share
git checkout cursor/pass2-share-presentation-d881
git rev-parse HEAD   # expect c59b84da7795373a3f160245fee34325ce000523
```

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
