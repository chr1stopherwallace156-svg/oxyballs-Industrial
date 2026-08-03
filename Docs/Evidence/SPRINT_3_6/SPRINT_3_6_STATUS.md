# Sprint 3.6 — Apple Hardware Validation Gate

| Field | Value |
|---|---|
| Official name | `SPRINT_3_6_APPLE_HARDWARE_VALIDATION_AND_FIRST_REAL_SPATIAL_PACKAGE` |
| Industrial baseline SHA | `0c18e2c6789ec6ac289006c80b115efb68cbe327` (Sprint 3.5 **MERGED**) |
| Parent ZIP SHA-256 | `b2323ac018ab80effe45b85e14dbb4cc46f67704c6d588dd4c01efc25f497eed` |
| Source-tree SHA-256 | `edc25fe7d273610bb97c65826b71b2df6b99d6ad50561fd85435e36b3a79de6f` |
| Delivery ZIP | `DOWNLOAD-elektron-capture-ios-sprint-3-6-apple-validation.zip` |
| Delivery ZIP SHA-256 | `11f43b42df55ebc6d7b5a439afd86a6a1f74c93378d0499da262ad1ab676b18a` |
| Linux `swift test` | 514 executed, 7 skipped, 0 failures |
| Apple host gate | **BLOCKED_APPLE_HOST_UNAVAILABLE** |
| SPKG-DEVICE-000001 | **NOT EMITTED** (forbidden without physical host) |

## Dual planes (honest)

| Plane | Value |
|---|---|
| IMPLEMENTATION_STATE | `SOURCE_IMPLEMENTED` (gate scaffolding + adapter wiring repairs) |
| APPLE_COMPILATION_STATE | `NOT_EXECUTED` / blocked |
| PHYSICAL_RUNTIME_STATE | `NOT_EXECUTED` / blocked |
| PACKAGE_STATE | `NO_DEVICE_PACKAGE` |
| PHASE_3_STATE | `APPLE_VALIDATION_PENDING_MAC_HOST` |

## Section A restoration

| Field | Value |
|---|---|
| sidecar | PASS (basename-only) |
| clean extraction | PASS |
| restored file count | 1693 |
| restoration_result | PASS |
