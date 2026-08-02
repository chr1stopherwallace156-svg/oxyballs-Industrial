# Root cause record — `swift build` OK vs Xcode app unresolved types

| Field | Value |
|---|---|
| Capture tip (import fix) | `0e1408141df1580b8f4638c8c83b58c626b64152` |
| Parent tip | `c59b84da7795373a3f160245fee34325ce000523` |
| Status | **Leading hypothesis applied + process gap closed**; Mac `xcodebuild` still required for final confirmation |

---

## 1. What was verified (facts)

| Observation | Evidence |
|---|---|
| `swift build` succeeds | Linux toolchain on Pass 2 tips |
| Package types exist and are `public` | `InteractiveStillCaptureController`, `Phase1StillCaptureUIState`, `PendingStillCapture`, `ApprovedStillCapture` in `ElektronCapture` |
| Xcode app target reported unresolved symbols for those types | Operator Mac / Xcode diagnostics on tip `c59b84d` |
| `Phase1CaptureRootView.swift` lacked `import ElektronCapture` on `c59b84d` | `grep` on that tip |
| `Phase1StillCaptureApp.swift` already had `import ElektronCapture` | same tip |
| App target **declares** package product dependency | `project.pbxproj`: `ElektronCapture in Frameworks`, `packageProductDependencies`, `productName = ElektronCapture` |

## 2. What was **not** proven on Linux cloud

| Claim | Status |
|---|---|
| Missing import is the sole root cause | **Hypothesis** (strong, consistent) — not proven until Mac `xcodebuild` succeeds on `0e14081` |
| No other integration defect exists | **Unproven** — linkage/workspace/access-control remain alternate hypotheses until build settings + clean app build are captured on Mac |

Alternate hypotheses still possible until Mac confirmation:

- package product not actually linked at build time (despite pbxproj text)
- target membership / wrong file in compile sources
- module visibility / access control edge cases
- workspace vs project package resolution drift

## 3. Why `swift build` can pass while the Xcode app fails

```text
swift build / swift test
  → compiles SPM target(s) from Package.swift only
  → product: ElektronCapture library
  → does NOT compile Apps/Phase1StillCapture/*.swift

xcodebuild (Phase1StillCapture scheme)
  → compiles app target sources as module Phase1StillCapture
  → must `import ElektronCapture` in each app file that references package types
  → links local package product ElektronCapture
```

So a green `swift build` only proves the **library** compiles. It is silent about app-target module imports. That is the discrepancy class.

## 4. Leading hypothesis (applied fix)

`Phase1CaptureRootView.swift` is an **app-target** compile unit that referenced public package types without importing the package module. Swift does not re-export `ElektronCapture` into the app module via the `@main` file’s import.

Fix applied at `0e14081`: add `import ElektronCapture` to `Phase1CaptureRootView.swift`.  
Types were **not** duplicated into the app target. pbxproj product link was already present.

## 5. Missing verification step in the previous handoff

`Scripts/verify-xcode-handoff.sh` previously only grepped:

```bash
Apps/Phase1StillCapture/Phase1StillCaptureApp.swift
```

for `import ElektronCapture`, then printed `HANDOFF_LAYOUT_OK`. That let `Phase1CaptureRootView.swift` ship without the import while the handoff script stayed green.

**Process improvement (now in script):** require `import ElektronCapture` in both `Phase1StillCaptureApp.swift` and `Phase1CaptureRootView.swift`, and assert pbxproj Frameworks/product linkage lines.

## 6. Mac verification artifacts still required (operator)

After cloning tip `0e14081`:

```bash
xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS' \
  clean build

xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -showBuildSettings \
  | tee xcodebuild-showBuildSettings.txt
```

Inspect build settings for package linkage (names vary by Xcode version), e.g. presence of `ElektronCapture` in framework/search paths / package product dependencies. Attach `xcodebuild-showBuildSettings.txt` (or a filtered excerpt) to the approval evidence.

Linux cloud cannot run `xcodebuild`; pbxproj checks are a surrogate only.
