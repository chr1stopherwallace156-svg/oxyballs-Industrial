# iOS Phase 1 Runtime — Implementation Gap Report

Status after EDTS importer work: **capture repository tagged baseline remains frozen**.
No further speculative design changes to `elektron-capture-ios`.

## Already present in capture-ios (contracts / foundation)

- EvidenceManifest / PackageInventory / CaptureDeviceProvenance schemas
- Status owner registry + CaptureSideStatusGuard
- Canonical JSON rules (Swift)
- Phase 1 directive (approved, runtime not started)
- Mock exporters / golden Path A session package (not Phase 1 `.edts-pkg` zip yet)

## Gaps required for first real end-to-end still

| Gap | Notes |
|---|---|
| Xcode / SwiftUI application shell | Not started |
| AVFoundation camera permission + one still capture | Not started |
| Exact byte persistence (no UIImage round-trip) | Not started |
| Read-back + SHA-256 | Domain hashing exists; not wired to capture |
| Canonical manifest + inventory writer for `.edts-pkg` | Partial domain models; no Phase 1 packager |
| `package_status.json` with `PACKAGE_EXPORTED` only | Not started |
| Export/upload to EDTS quarantine endpoint | Mock client only |
| Device provenance filled from real enrollment | Fixture placeholders only |
| App Attest / attestation hooks | Not started |

## Explicitly out of Phase 1

ARKit, LiDAR, photogrammetry, AI, measurement inference, Build Engine integration,
multi-artifact sessions, guided coverage.

## Recommended sequence after importer green

1. Publish `elektron-capture-ios` (`main` + both baseline tags).
2. Keep EDTS importer fixtures as the acceptance oracle.
3. Build minimal iOS Phase 1 runtime only.
4. Capture one JPEG/HEIF → package → both EDTS gates → `CONTENT_UNVERIFIED`.

## EDTS side remaining (post this report)

- HTTP receive API in front of `ingest_edts_pkg` (not required for local fixture proof)
- Persistent object store / DB records for committed evidence
- Cross-language canonical byte proof against Swift `CanonicalJSON` on shared fixtures
