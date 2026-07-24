# Mac re-clone instructions (replace stale 005382b origin)

Your local `elektron-capture-ios-new` points at an old bundle (`…-005382b.bundle`).  
`git fetch origin` cannot reach Pass 2. Use one of the options below.

## Option A — Capture-iOS Pass 2 tip (for Xcode) — recommended

Commit tip: `c59b84da7795373a3f160245fee34325ce000523`  
Branch: `cursor/pass2-share-presentation-d881`  
Bundle: `elektron-capture-ios-pass2-share-c59b84d.bundle`  
SHA-256: `f8987343830e8e91f8d607f57fd0393a1a1208164866e0a689b20afb7fc7bd8f`

```bash
cd ~/Downloads
shasum -a 256 elektron-capture-ios-pass2-share-c59b84d.bundle
# expect f8987343830e8e91f8d607f57fd0393a1a1208164866e0a689b20afb7fc7bd8f

git clone elektron-capture-ios-pass2-share-c59b84d.bundle elektron-capture-ios-pass2-share
cd elektron-capture-ios-pass2-share
git checkout cursor/pass2-share-presentation-d881
git rev-parse HEAD   # expect c59b84da7795373a3f160245fee34325ce000523
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Do **not** keep using the old `005382b` remote. This clone’s `origin` is the new bundle.

## Option B — Industrial handoff branch (includes merge `4b6ccc1`)

Commit tip: `4b6ccc1f1383035c65e71e73aeabf42de3b6bf38`  
Branch: `cursor/pass2-share-presentation-handoff-d881`  
Bundle: `oxyballs-industrial-pass2-share-handoff-4b6ccc1.bundle`  
SHA-256: `3d21389ef1478c5bff70403d42d5308acddd82932e236b0c834018c0bacabbdd`

```bash
cd ~/Downloads
shasum -a 256 oxyballs-industrial-pass2-share-handoff-4b6ccc1.bundle
# expect 3d21389ef1478c5bff70403d42d5308acddd82932e236b0c834018c0bacabbdd

git clone oxyballs-industrial-pass2-share-handoff-4b6ccc1.bundle oxyballs-industrial-pass2-handoff
cd oxyballs-industrial-pass2-handoff
git checkout cursor/pass2-share-presentation-handoff-d881
git rev-parse HEAD   # expect 4b6ccc1f1383035c65e71e73aeabf42de3b6bf38
```

Transfer artifacts (including Option A’s capture-ios bundle) live under  
`transfer/capture-ios-mac-handoff/`.

## Option C — Clone Industrial from GitHub (branch already pushed)

```bash
git clone https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial.git
cd oxyballs-Industrial
git fetch origin cursor/pass2-share-presentation-handoff-d881
git checkout cursor/pass2-share-presentation-handoff-d881
git rev-parse HEAD   # expect 4b6ccc1f1383035c65e71e73aeabf42de3b6bf38
```

Legacy redirect: `https://github.com/chr1stopherwallace156-svg/Elektron-Indsutrial`

Capture-iOS has **no** GitHub write remote in this environment; use Option A’s bundle for the app tip.
