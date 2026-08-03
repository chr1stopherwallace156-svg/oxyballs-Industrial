# ADR-P3-005 — VerifiedSpatialEvidencePackage issuance authority

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-005** |
| Date | 2026-08-03 |
| Sprint | 3.0 |

## Context

Phase 4+ consumers must not open draft directories or unverified packages as authoritative spatial evidence.

## Decision

1. **Issuance authority:** Capture `EvidenceCustodyStore` (conforming to `VerifiedSpatialEvidenceProviding`).
2. A `VerifiedSpatialEvidencePackage` handle may issue only when custody status is `VERIFIED` or `ARCHIVED` (previously verified).
3. Handles reference package content hash + root URL; they do not embed mutable custody JSON into package bytes.
4. Direct filesystem / draft consumption for Phase 4 production entry points is prohibited by API + architecture tests (Swift cannot make FS access physically impossible).

## Consequences

`verifiedPackage(packageContentSHA256:)` fails closed for `UNVERIFIED` / `VERIFICATION_FAILED` / quarantine.
