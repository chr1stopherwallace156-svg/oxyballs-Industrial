## Summary

Sprint 3.6 Apple Hardware Validation gate scaffolding under dual status planes.

**Sprint 3.5 is merged.** Industrial baseline: `0c18e2c6789ec6ac289006c80b115efb68cbe327`.

**Honest host result:** `BLOCKED_APPLE_HOST_UNAVAILABLE` (Linux cloud agent; no macOS/Xcode/iPhone).

**IMPLEMENTATION_STATE** = `SOURCE_IMPLEMENTED` (restoration + adapter/coordinator/device-law repairs + Mac runbook scripts)  
**APPLE_COMPILATION_STATE** = `NOT_EXECUTED`  
**PHYSICAL_RUNTIME_STATE** = `NOT_EXECUTED`  
**PACKAGE_STATE** = `NO_DEVICE_PACKAGE` (SPKG-DEVICE-000001 **not emitted**)  
**PHASE_3_STATE** = `APPLE_VALIDATION_PENDING_MAC_HOST`  
**PRODUCTION_VALIDATION_CLAIM** = `FORBIDDEN`

## Delivered on this host

- Section A Sprint 3.5 ZIP restoration proof
- Production adapter IDs including `apple.coremotion.motion`
- Coordinator protocol wiring + `appleProductionSession`
- `DeviceSpatialPackageBuilder` identity law
- Info.plist motion/world-sensing strings
- `make phase3-6-apple-validation-verify` (exits 2 on Linux with BLOCKED record)
- Phase36 Linux gate tests
- Decision **D-025**

## Explicitly not claimed

- Mac xcodebuild PASS
- Simulator / physical-device PASS
- SPKG-DEVICE-000001
- Device-validated Phase 3 completion

## Delivery

- ZIP: `DOWNLOAD-elektron-capture-ios-sprint-3-6-apple-validation.zip`
- SHA-256: `11f43b42df55ebc6d7b5a439afd86a6a1f74c93378d0499da262ad1ab676b18a`
- Parent (3.5) SHA-256: `b2323ac018ab80effe45b85e14dbb4cc46f67704c6d588dd4c01efc25f497eed`
