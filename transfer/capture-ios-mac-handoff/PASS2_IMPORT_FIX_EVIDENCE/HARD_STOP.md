# HARD STOP — Mac gates not closed on Linux cloud

This agent environment **cannot** produce:

1. `xcodebuild` `BUILD SUCCEEDED` log
2. `xcodebuild -showBuildSettings` package-linkage evidence
3. Physical iPhone install / capture / export / Files-or-Mac transfer logs
4. On-device proof that `artifact_original.jpg` matches the captured JPEG

## What Linux completed

- Root-cause ranking (missing RootView import; product link present)
- Minimal fix at `0e14081` (`import ElektronCapture`)
- Verifier runs `xcodebuild` on Darwin; prints `HANDOFF_XCODE_BUILD_SKIPPED` on Linux
- `swift test`: 66 executed, 1 skip, 0 failures
- `HANDOFF_LAYOUT_OK`

## Operator must run (then attach logs)

```bash
git clone elektron-capture-ios-pass2-import-d41e513.bundle elektron-capture-ios-pass2-import
cd elektron-capture-ios-pass2-import
git checkout cursor/pass2-import-elektroncapture-d881
git rev-parse HEAD  # d41e513f90475aff9d6b9699bd4545c4969c8746

./Scripts/verify-xcode-handoff.sh
# expect HANDOFF_LAYOUT_OK and HANDOFF_XCODE_BUILD_OK

# Device: capture → review → use photo → Share/Save .edts-pkg → Files/AirDrop
# shasum -a 256 payload/artifact_original.jpg  # must equal frozen review SHA
```

Do **not** mark Pass 2 import integration operator-approved until those Mac artifacts exist.
