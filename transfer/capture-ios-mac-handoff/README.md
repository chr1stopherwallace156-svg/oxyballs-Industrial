# capture-ios Mac handoff

Verified transfer artifacts for the unpublished `elektron-capture-ios` repo.

| File | SHA-256 |
|------|---------|
| `elektron-capture-ios-complete.bundle` | `63721a127835c73dcb3897eb203dda5d9436408a5bd07fbf4986ed5507a5098d` |
| `elektron-capture-ios-c3581d04-working-tree.zip` | `77baf9f91f066745492d542028fd7e3e5deafa7501d7311d1893466b23b7f47b` |

**Reject** any file with SHA-256 `bb93af515087c6a2c7fe77e2a0ed93b22406e8415a8f3eb931ad4963dcf276b7` (wrong product: Industrial/EDTS runtime).

## Mac

```bash
git clone elektron-capture-ios-complete.bundle elektron-capture-ios
cd elektron-capture-ios
git checkout feature/phase1-single-still-runtime
open Apps/Phase1StillCapture/Phase1StillCapture.xcodeproj
```
