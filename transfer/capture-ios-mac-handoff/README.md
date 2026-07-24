# capture-ios fresh handoff

Tip: `4bc8ae65be8c287c211aeab7b2ae7ba1dfd29e0d`
Branch: `cursor/canonicalization-failed-repair-d881`
Status: P1R-001 OPEN / PENDING_PHYSICAL_DEVICE_RETEST (candidate, not physically validated)

| File | SHA-256 | Size |
|------|---------|------|
| elektron-capture-ios-complete.bundle | `8765944f8c159ae3c26fbf496a0bc3a6a0abf7d93757d36118d69f6eaa3f8e00` | 247924 |
| elektron-capture-ios-working-tree.zip | `d126abe3709f29297d326a49c6bcede2b4c6699c918b62a885d263d4ccc20a6e` | 225791 |

Reject: `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7`

```bash
shasum -a 256 elektron-capture-ios-complete.bundle elektron-capture-ios-working-tree.zip
git clone elektron-capture-ios-complete.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```
