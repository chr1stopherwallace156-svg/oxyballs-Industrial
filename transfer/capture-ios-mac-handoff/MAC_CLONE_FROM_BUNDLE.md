# Mac re-clone instructions

## Current — Pass 2 import fix (Xcode unresolved types)

**Root cause:** `Phase1CaptureRootView.swift` used public `ElektronCapture` types without `import ElektronCapture`.  
**Fix tip:** `0e1408141df1580b8f4638c8c83b58c626b64152`  
**Parent:** `c59b84da7795373a3f160245fee34325ce000523`  
**Branch:** `cursor/pass2-import-elektroncapture-d881`

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-import-0e14081.bundle` | `24dfd54dc8d19fbdbfa1391a3b787304b43603b990c0979793da4d14f4964cd6` |
| `elektron-capture-ios-pass2-import-0e14081-working-tree.zip` | `42685b0304c0a36d91cb1b9c5bc6ad6b271f0c2eefe8e33c709734213092e6d7` |

```bash
cd ~/Downloads
shasum -a 256 elektron-capture-ios-pass2-import-0e14081.bundle
# expect 24dfd54dc8d19fbdbfa1391a3b787304b43603b990c0979793da4d14f4964cd6

git clone elektron-capture-ios-pass2-import-0e14081.bundle elektron-capture-ios-pass2-import
cd elektron-capture-ios-pass2-import
git checkout cursor/pass2-import-elektroncapture-d881
git rev-parse HEAD   # expect 0e1408141df1580b8f4638c8c83b58c626b64152
grep -n "import ElektronCapture" Apps/Phase1StillCapture/Phase1CaptureRootView.swift
# expect: 3:import ElektronCapture

# Mac verification
xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS' \
  clean build

open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

App target already links product `ElektronCapture` in `project.pbxproj` (unchanged). Types were **not** duplicated into the app target.

## Prior — share-presentation tip `c59b84d` (missing RootView import)

Use only for archaeology. Prefer `0e14081` above for Xcode.

## Industrial GitHub

```bash
git clone https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial.git
cd oxyballs-Industrial
git fetch origin cursor/pass2-import-elektroncapture-handoff-d881
git checkout cursor/pass2-import-elektroncapture-handoff-d881
```
