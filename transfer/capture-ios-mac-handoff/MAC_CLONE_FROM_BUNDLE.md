# Mac re-clone — tip `d41e513` (HARD STOP until xcodebuild + device)

| Field | Value |
|------|---------|
| Tip | `d41e513f90475aff9d6b9699bd4545c4969c8746` |
| Code fix | `0e1408141df1580b8f4638c8c83b58c626b64152` |
| Branch | `cursor/pass2-import-elektroncapture-d881` |
| Bundle | `elektron-capture-ios-pass2-import-d41e513.bundle` |
| SHA-256 | `5551e6affaa12a2986516fb74a41a24f3722b2c118204f4cbeadb56cbd6cc209` |

```bash
cd ~/Downloads
shasum -a 256 elektron-capture-ios-pass2-import-d41e513.bundle
# expect 5551e6affaa12a2986516fb74a41a24f3722b2c118204f4cbeadb56cbd6cc209

git clone elektron-capture-ios-pass2-import-d41e513.bundle elektron-capture-ios-pass2-import
cd elektron-capture-ios-pass2-import
git checkout cursor/pass2-import-elektroncapture-d881
git rev-parse HEAD
./Scripts/verify-xcode-handoff.sh   # must print HANDOFF_XCODE_BUILD_OK on Mac
```

Root cause writeup: `PASS2_IMPORT_FIX_EVIDENCE/ROOT_CAUSE_DETERMINATION.md`  
Hard stop: `PASS2_IMPORT_FIX_EVIDENCE/HARD_STOP.md`
