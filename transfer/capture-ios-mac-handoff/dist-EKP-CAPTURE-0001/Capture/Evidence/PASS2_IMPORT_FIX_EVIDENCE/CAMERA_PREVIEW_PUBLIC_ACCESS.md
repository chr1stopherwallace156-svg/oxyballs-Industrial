# Access-control fix — CameraPreviewView package boundary

| Field | Value |
|---|---|
| Parent tip | `d41e513f90475aff9d6b9699bd4545c4969c8746` |
| Symptom after import fix | `Cannot find 'CameraPreviewView' in scope` at RootView |
| Prior ZIP `50b5f8e` / `9ee9951f…` | **Did NOT include this fix** (still internal `struct`) |

## Root cause
`CameraPreviewView` lived in module `ElektronCapture` as an internal `struct`. The app target imports `ElektronCapture` but cannot see internal types.

## Fix
Make `CameraPreviewView`, its `init(session:)`, `UIViewRepresentable` methods, and nested `PreviewUIView` `public`. Do not move/duplicate into the app target.

## Mac
`xcodebuild` still required; Linux prints `HANDOFF_XCODE_BUILD_SKIPPED`. Physical-device export remains HARD STOP.
