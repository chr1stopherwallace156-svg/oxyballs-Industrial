# Capture-iOS professional UX CANDIDATE

**Not Phase 1 complete.** Tip `2f61be34f37b72367b9a7945ff9e192dc2580789`

| Artifact | SHA-256 |
|----------|---------|
| elektron-capture-ios-pro-ux.bundle | `412ee5ed69803a27603122090dc0471ec7faff365801990937b1464d5d7ab99a` |
| elektron-capture-ios-pro-ux.zip | `26940209b3ba3c3e99f34b1eba7a0a0382f9e37ccc55789e80061d07839b08bd` |

Do **not** use generic `elektron-capture-ios-complete.bundle` / `elektron-capture-ios-working-tree.zip` for this tip (those names hold later handoff bytes on `main`).

Cloud `swift test`: 66 executed, 1 skipped, 0 failures.

Workflow: PREVIEWING → CAPTURING → REVIEWING → APPROVED → EXPORTED (package write only on Export Package after Use Photo).

```bash
git clone elektron-capture-ios-pro-ux.bundle elektron-capture-ios-pro-ux
cd elektron-capture-ios-pro-ux
git rev-parse HEAD   # must be 2f61be34f37b72367b9a7945ff9e192dc2580789
swift test
open Apps/Phase1StillCapture/Phase1StillCapture.xcworkspace
```
