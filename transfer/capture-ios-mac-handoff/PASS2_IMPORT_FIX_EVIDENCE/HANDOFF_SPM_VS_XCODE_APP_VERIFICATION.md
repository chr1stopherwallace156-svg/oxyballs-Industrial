# Handoff verification template — SPM library vs Xcode app

Use this checklist for every capture-iOS handoff that includes an Xcode host app.

## A. Library proof (Linux-capable)

1. `swift build`
2. `swift test` (full log, not a summary line)
3. Confirm public types exist in package sources

## B. App integration proof (must not be inferred from A)

1. Every app compile unit that references package types has `import ElektronCapture`
2. `project.pbxproj` links product `ElektronCapture` (Frameworks + packageProductDependencies)
3. `./Scripts/verify-xcode-handoff.sh` → `HANDOFF_LAYOUT_OK`
4. **Mac:** `xcodebuild … clean build` for `Phase1StillCapture`
5. **Mac:** `xcodebuild … -showBuildSettings` saved as evidence (package linkage)

## C. Discrepancy rule

> A green `swift build` does **not** prove the Xcode app target will compile.  
> Always treat app-target import/linkage as a separate gate.

## D. Root-cause writeup (required on app/Xcode failures)

Explain:

1. what `swift build` compiled vs what Xcode compiles,
2. which hypothesis was tested,
3. which handoff verification step was missing or too weak.
