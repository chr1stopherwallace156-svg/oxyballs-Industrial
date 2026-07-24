# capture-ios Mac handoff (canonicalization fix)

Commit: `1b132f4183d66d791ef94773201e3387cd2da747`
Branch: `cursor/canonicalization-failed-repair-d881`

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-complete.bundle` | `d13b317fe34f01f5924b8a1f31ee8d1d3755cd7feec450c45f769ac86aa9c892` |
| `elektron-capture-ios-working-tree.zip` | `f122dc26d79874afd2281d73c564edd6a05fef497710753e0844f797c9ffc7c5` |

**Reject** `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` (wrong product).

## Mac

```bash
git clone elektron-capture-ios-complete.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout cursor/canonicalization-failed-repair-d881
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```

Root cause fix: nil Optional fields in `capture_device.json` encoded as NSNull.
