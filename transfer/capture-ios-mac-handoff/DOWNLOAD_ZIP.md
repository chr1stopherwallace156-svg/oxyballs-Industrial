# Download ZIP (no git bundle required)

## File
`elektron-capture-ios-pass2-import-d41e513.zip`  
(also copied as `DOWNLOAD-elektron-capture-ios-pass2-import.zip`)

| Field | Value |
|------|---------|
| Tip contents | `d41e513f90475aff9d6b9699bd4545c4969c8746` |
| SHA-256 | `9ee9951f1ac916d6a30d1c4de0f27fac0de077db91b3b8f1366c6d74219105a4` |
| Format | `git archive` ZIP of the capture-iOS tree (no `.git`) |

## GitHub download (Industrial handoff branch)

After this commit is pushed, download from:

https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/raw/cursor/pass2-import-elektroncapture-handoff-d881/transfer/capture-ios-mac-handoff/DOWNLOAD-elektron-capture-ios-pass2-import.zip

or:

https://github.com/chr1stopherwallace156-svg/oxyballs-Industrial/raw/cursor/pass2-import-elektroncapture-handoff-d881/transfer/capture-ios-mac-handoff/elektron-capture-ios-pass2-import-d41e513.zip

(If the rename redirect applies, the same path under `Elektron-Indsutrial` also works.)

## On Mac

```bash
cd ~/Downloads
shasum -a 256 DOWNLOAD-elektron-capture-ios-pass2-import.zip
# expect 9ee9951f1ac916d6a30d1c4de0f27fac0de077db91b3b8f1366c6d74219105a4

unzip DOWNLOAD-elektron-capture-ios-pass2-import.zip
cd elektron-capture-ios
grep -n "import ElektronCapture" Apps/Phase1StillCapture/Phase1CaptureRootView.swift
# expect: 3:import ElektronCapture

open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
# or:
./Scripts/verify-xcode-handoff.sh
```

This ZIP is a source tree snapshot (no git history). For git operations use the `.bundle` if you can obtain it later.
