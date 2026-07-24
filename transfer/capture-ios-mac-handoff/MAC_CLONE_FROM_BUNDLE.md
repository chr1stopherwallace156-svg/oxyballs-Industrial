# Mac re-clone — Pass 2 import / evidence tip

## Current tip (code fix + process evidence)

| Field | Value |
|------|---------|
| Tip | `8fef5dce2a0099ad4311085d00192e945b10a861` |
| Code fix commit | `0e1408141df1580b8f4638c8c83b58c626b64152` |
| Parent | `c59b84da7795373a3f160245fee34325ce000523` |
| Branch | `cursor/pass2-import-elektroncapture-d881` |
| Claim level | **Leading hypothesis** until Mac `xcodebuild` confirms |

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-pass2-import-8fef5dc.bundle` | `84418ba59797fe77d1a1917c7b3375171807b51dd5fdf0b00f9131910037b8f8` |
| `elektron-capture-ios-pass2-import-8fef5dc-working-tree.zip` | `c557afbf9bc539a501fbd9f664c2b6f3af264a92f0f20ce6b4f06df7747e5a35` |

```bash
cd ~/Downloads
shasum -a 256 elektron-capture-ios-pass2-import-8fef5dc.bundle
# expect 84418ba59797fe77d1a1917c7b3375171807b51dd5fdf0b00f9131910037b8f8

git clone elektron-capture-ios-pass2-import-8fef5dc.bundle elektron-capture-ios-pass2-import
cd elektron-capture-ios-pass2-import
git checkout cursor/pass2-import-elektroncapture-d881
git rev-parse HEAD   # expect 8fef5dce2a0099ad4311085d00192e945b10a861
./Scripts/verify-xcode-handoff.sh
```

### Required Mac confirmation (do not skip)

```bash
xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS' \
  clean build | tee xcodebuild-clean-build.log

xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -showBuildSettings \
  | tee xcodebuild-showBuildSettings.txt
```

See `PASS2_IMPORT_FIX_EVIDENCE/ROOT_CAUSE_SWIFT_BUILD_VS_XCODE.md` for why `swift build` can pass while the app fails, and which handoff gate was missing.

## Prior import-only tip `0e14081`

Still valid as the code-change commit; prefer `8fef5dc` for the evidence package + hardened verifier.
