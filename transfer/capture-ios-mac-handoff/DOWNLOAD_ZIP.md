# Download ZIP (regenerated after CameraPreviewView public fix)

| Field | Value |
|------|---------|
| Capture tip inside ZIP | `e37f5b7b14009bfdc71ca3145975c8e5db2976ac` |
| ZIP | `DOWNLOAD-elektron-capture-ios-pass2-import.zip` |
| SHA-256 | `4ba0fea7b810ca8e1a61686f85bfe47d42bf1b1dad8e7c4261d924a19e037e94` |
| Includes `public struct CameraPreviewView` | **YES** (regenerated after access-control fix) |
| Prior ZIP `9ee9951f…` / Industrial `50b5f8e` | **NO** — that was tip `d41e513` without this fix |

```bash
cd ~/Downloads
shasum -a 256 DOWNLOAD-elektron-capture-ios-pass2-import.zip
# expect 4ba0fea7b810ca8e1a61686f85bfe47d42bf1b1dad8e7c4261d924a19e037e94
unzip DOWNLOAD-elektron-capture-ios-pass2-import.zip
cd elektron-capture-ios
grep -n "public struct CameraPreviewView" App/Capture/AVFoundation/CameraPreviewView.swift
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
./Scripts/verify-xcode-handoff.sh   # Mac: HANDOFF_XCODE_BUILD_OK
```

Physical-device export remains HARD STOP until Mac verification.
