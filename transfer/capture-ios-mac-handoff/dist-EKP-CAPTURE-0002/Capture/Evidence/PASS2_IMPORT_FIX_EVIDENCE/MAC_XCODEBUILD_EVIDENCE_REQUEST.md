# Mac operator checklist — confirm import hypothesis + linkage

After cloning tip `bb6018dffc9517ff4c9f34b8895b2cfcb3e85181` (or at least `0e14081`):

```bash
# 1) Clean app build
xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -destination 'generic/platform=iOS' \
  clean build | tee xcodebuild-clean-build.log

# 2) Build settings evidence (package linkage)
xcodebuild -workspace Phase1StillCapture.xcworkspace \
  -scheme Phase1StillCapture \
  -showBuildSettings \
  | tee xcodebuild-showBuildSettings.txt

# Optional filter for review:
grep -E 'ElektronCapture|PACKAGE|FRAMEWORK_SEARCH|SWIFT_INCLUDE' xcodebuild-showBuildSettings.txt \
  | tee xcodebuild-package-linkage-excerpt.txt
```

Attach both logs to approval evidence. Until these succeed on Mac, treat the missing-import change as a **leading hypothesis**, not a proven sole root cause.

See also: `ROOT_CAUSE_SWIFT_BUILD_VS_XCODE.md`.
