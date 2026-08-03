# SYSTEM_BOUNDARIES.md

| Field | Value |
|---|---|
| Status | **APPROVED** (Phase 0) |
| Version | 0.1.1 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | elektron-capture-ios |
| Supersedes | 0.1.0 |

## Responsible for

Guided vehicle capture; image/video acquisition; ARKit pose recording; available depth; camera-calibration metadata; Core Motion; technician guidance; local quality; original preservation; derivative creation; manifests; hashes; device/app attestation; offline storage; upload preparation; retry/recovery; completeness reporting.

## Not responsible for

Authorizing conversions; approving designs; structural adequacy; axle compliance; safety decisions; replacing physical metrology; final engineering confidence; modifying EDTS claims; executing Build Engine policy; silently resolving unknowns; inventing measurements; treating ARKit depth as certified measurement.

## Forbidden

- Direct EDTS PostgreSQL / graph / Build Engine DB / production object-store credentials / internal queues
- Importing Build Engine as a Swift package
- Emitting: `BUILD_AUTHORIZED`, `STRUCTURALLY_APPROVED`, `DESIGN_SAFE`, `VEHICLE_COMPLIANT`
- Shipping mock behavior as unlabeled production behavior
- Permanent iPhone hardware identifiers as identity

## Allowed EDTS intake tokens (examples)

`EVIDENCE_ACCEPTED` · `EVIDENCE_REJECTED` · `MORE_CAPTURE_REQUIRED` · `ENGINEERING_REVIEW_REQUIRED`

## Android boundary

Android repositories may be algorithm/UX **references** only. Production architecture is Apple-native and lives only in this repository.
