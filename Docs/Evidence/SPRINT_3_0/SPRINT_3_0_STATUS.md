# Sprint 3.0 — Gate Closure + Synthetic Spatial Evidence Vertical Slice

| Field | Value |
|---|---|
| Source base ZIP | `DOWNLOAD-elektron-capture-ios-sprint-2-3-xcodebuild-errortext.zip` |
| Source ZIP SHA-256 | `23672c5a521e593df423c5ade7609f3b1a2b78de2da8a795b2e31456499bf0b2` |
| Source tip (manifest inside ZIP) | `09a3c36f8413ac59608572d665d08c0b3c4e2c75` |
| Reviewed pre-hardening Industrial tip | `d9aea20c8c4b8339edf293470f4dd82c0ec8b3b1` |
| Audit | `AUDIT_CLOSED` (v1.0.0 archived from base `a1982ed`) |
| Charter | `ARCHITECTURE_ACCEPTED` v1.6.0 (synthetic scope) |
| Linux `swift test` | 361 executed, 2 skipped, 0 failures |
| Mac `xcodebuild` | `BLOCKED_HOST_CAPABILITY` |
| Device | `BLOCKED_HOST_CAPABILITY` |
| Phase 4 / production adapters | **None** |
| package_content_sha256 | `b11c9e73d1569102b14dd1c36a93b64a9735b6c88ea13bb639d49567fb14c09d` |
| capture_session_id | `SESS-SYNTHETIC-000001` |
| stream_id rule | camera / depth / motion / pose |
| adapter_id rule | synth.camera / synth.depth / synth.motion / synth.pose |

## Package

See `package_inventory.json` and `synthetic_spatial_package/`.
Custody proof: `custody_hash_separation_proof.json`.
