# Sprint 3.1 — Mac/Device Gate + RGB/Motion Foundation

| Field | Value |
|---|---|
| Industrial baseline | `1c03663e42fee02ac206d77c7d4e8fbfded99b3c` |
| Source ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-0-synthetic-spatial.zip` |
| Source ZIP SHA-256 | `e0576c87a0d61ffe5d7a780943c9a6b2342ba37e9db26f9e8bda0aced914e47c` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip` |
| Delivery ZIP SHA-256 | `adfcfd9b4c92fcc58167e86e8dfe64ca108dffed1156ef320f7549ea4bbf47f2` |
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` |
| VALIDATION_STATE | `LINUX_FIXTURE_VALIDATED` |
| MAC_COMPILATION | `PENDING` |
| PHYSICAL_DEVICE_RUNTIME | `PENDING` |
| PRODUCTION_VALIDATION_CLAIM | `FORBIDDEN` |
| Merge classification | `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` |
| Fixture package | `SPKG-FIXTURE-RGBMOTION-000001` |
| Fixture package SHA-256 | `727aa3ddead42a8089a4413013d58b90a53bbf5ea8f7cc6293c6e73f4438c3e7` |
| Mac xcodebuild | `BLOCKED_HOST_CAPABILITY` (log SHA-256 `2dee1e4ca98ac3224433120d28442aca345baf38eee7dc647765bdbd853f7bdb`) |

See `Docs/Evidence/SPRINT_3_1/` and `Docs/Architecture/PHASE_3_VALIDATION_BACKLOG.md`.

## Restore

```bash
shasum -a 256 -c DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip.sha256
unzip DOWNLOAD-elektron-capture-ios-sprint-3-1-rgb-motion.zip
cd elektron-capture-ios
make phase3-synthetic-verify
make phase3-1-rgb-motion-verify
swift test
```
