# Sprint 3.1 — Mac/Device Gate + RGB/Motion Foundation

| Field | Value |
|---|---|
| Industrial baseline | `1c03663e42fee02ac206d77c7d4e8fbfded99b3c` |
| Source ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Source ZIP SHA-256 | `e0576c87a0d61ffe5d7a780943c9a6b2342ba37e9db26f9e8bda0aced914e47c` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip` |
| Delivery ZIP SHA-256 | `41d2f3f376c0afc5a7b63ae603d8a46b3b7c7ab426b8e54349851ad18983413e` |
| Linux tests | 383 executed, 3 skipped, 0 failures |
| Mac xcodebuild | `BLOCKED_HOST_CAPABILITY` (log SHA-256 `2dee1e4ca98ac3224433120d28442aca345baf38eee7dc647765bdbd853f7bdb`) |
| Device smoke | `BLOCKED_HOST_CAPABILITY` |
| Controllable device package SHA-256 | `b3466a2f49235f724cffb6114c094deecb2e29f9cde9413fc0da440a3c8d1f94` |
| Physical device package | **Not claimed** on this host |

See `Docs/Evidence/SPRINT_3_1/`.

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip
cd elektron-capture-ios
make phase3-synthetic-verify
make phase3-1-rgb-motion-verify
swift test
```
