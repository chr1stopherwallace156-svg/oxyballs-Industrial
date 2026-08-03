# Root-cause determination — unresolved ElektronCapture types in Xcode app

| Field | Value |
|---|---|
| Parent tip (failing on Mac Xcode) | `c59b84da7795373a3f160245fee34325ce000523` |
| Code fix tip | `0e1408141df1580b8f4638c8c83b58c626b64152` |
| Evidence / verifier tip | *(this branch tip after verifier update)* |
| Claim level after Linux analysis | **Root cause ranked; Mac xcodebuild still required to close** |

---

## Question

Is the app expected to `import ElektronCapture` directly, or is the product not linked?

## Answer (architecture)

**Yes — the app target must import `ElektronCapture` directly** in every app compile unit that references package types.

The Xcode app target (`Phase1StillCapture`) is a **separate Swift module** from the local package product (`ElektronCapture`). Linking the product makes the module *available*; it does **not** inject package declarations into app source files. `import ElektronCapture` in `Phase1StillCaptureApp.swift` does **not** re-export symbols into `Phase1CaptureRootView.swift`.

---

## Hypothesis ranking (against tip `c59b84d`)

| # | Hypothesis | Verdict on `c59b84d` | Evidence |
|---|---|---|---|
| H1 | Missing `import ElektronCapture` in `Phase1CaptureRootView.swift` | **Leading / applied** | File used public package types; `grep` showed no import; App.swift already imported |
| H2 | Package product not linked into app target | **Ruled out (pbxproj)** | `ElektronCapture in Frameworks`, `packageProductDependencies`, `productName = ElektronCapture`, local package `relativePath = ../..` |
| H3 | RootView not in target membership / Sources | **Ruled out (pbxproj)** | `Phase1CaptureRootView.swift in Sources` present |
| H4 | Types not public / wrong module | **Ruled out** | Types are `public` in package; `swift build` succeeds |
| H5 | Workspace/package resolution drift on Mac | **Open until Mac build** | Possible co-factor; not needed to explain missing import |

Minimal architectural fix: add `import ElektronCapture` to RootView. **Do not** duplicate package types into the app target.

---

## Why `swift build` passed

`swift build` / `swift test` compile **only** `Package.swift` targets (`ElektronCapture`). They never compile `Apps/Phase1StillCapture/*.swift`. Green SPM therefore cannot detect a missing app-module import.

---

## Verification status

| Gate | Status |
|---|---|
| SPM `swift build` / `swift test` | Pass on Linux |
| pbxproj product linkage | Pass |
| RootView import present (`0e14081+`) | Pass |
| `xcodebuild` workspace clean build | **NOT RUN** — no Xcode on Linux cloud |
| Physical device export | **NOT RUN** — no device on Linux cloud |

---

## Required Mac close-out (HARD STOP until done)

1. Clone evidence tip bundle.
2. `./Scripts/verify-xcode-handoff.sh` → must print `HANDOFF_LAYOUT_OK` **and** `HANDOFF_XCODE_BUILD_OK`.
3. Install on physical iPhone; capture → review → use photo → export `.edts-pkg` → Files/AirDrop.
4. Confirm `artifact_original.jpg` SHA-256 equals post-delegate freeze (no re-encode).
