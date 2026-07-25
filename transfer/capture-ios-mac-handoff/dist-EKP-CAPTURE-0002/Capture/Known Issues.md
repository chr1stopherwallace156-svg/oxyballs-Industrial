# KNOWN_LIMITATIONS.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 0.1.1 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Version 0.1.1 Phase 0 |
| Supersedes | 0.1.0 |

- Phase 0 only: no production AVFoundation / ARKit / LiDAR capture path yet.
- Approved iPhone Pro profile ID not yet hardware-validated (`DECISION_REQUIRED`).
- App Attest server verification not implemented (mock only).
- Path B API not connected (`PACKAGE_EXPORT_READY`).
- Swift tests require Apple toolchain; Linux runs contract/package scripts.
- Full Xcode iOS app target pending Mac environment.
- Coverage engine, measurement assistance deferred to later phases.
- Golden package uses synthetic bytes — not sensor evidence.
