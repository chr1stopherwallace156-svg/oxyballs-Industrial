# Sprint 3.6 — Apple Hardware Validation

## Host requirement

Sprint 3.6 **requires** macOS + Xcode + physical iPhone. This Linux cloud agent recorded:

`BLOCKED_APPLE_HOST_UNAVAILABLE`

No `SPKG-DEVICE-*` package may be invented on Linux.

## What this delivery includes

- Sprint 3.5 ZIP restoration proof
- Apple adapter production IDs (`apple.avfoundation.camera`, `apple.coremotion.motion`, `apple.arkit.pose`, `apple.arkit.depth`)
- Coordinator protocol wiring + `appleProductionSession` factory
- `DeviceSpatialPackageBuilder` identity law (DEVICE only; refuses fixtures)
- Info.plist motion/world-sensing usage strings
- `Scripts/sprint-3-6-apple-validation.sh` + `make phase3-6-apple-validation-verify`
- Phase36 Linux gate tests
- Honest BLOCKED evidence under `Docs/Evidence/SPRINT_3_6/`

## Mac operator next steps

1. Restore this delivery ZIP on a Mac.
2. Run `make phase3-6-apple-validation-verify`.
3. Follow physical capture for `SESS-DEVICE-000001` / `SPKG-DEVICE-000001`.
4. Fill remaining evidence JSON with measured values.
5. Do not promote fixture thresholds to production without characterization.
