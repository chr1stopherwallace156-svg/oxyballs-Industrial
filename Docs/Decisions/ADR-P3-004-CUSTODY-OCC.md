# ADR-P3-004 — EvidenceCustodyRecord ownership and OCC

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-004** |
| Date | 2026-08-03 |
| Sprint | 3.0 |
| Related | S2-004 `ADR-SESSION-REVISION-OCC.md` |

## Context

Custody is mutable repository state keyed by sealed package content hash. It must not overload `InspectionSession.revision`.

## Decision

1. **Owner:** Capture custody repository (`EvidenceCustodyStore`).
2. **Key:** `package_content_sha256` of the sealed spatial package (custody-free closure hash).
3. **OCC:** callers supply `expectedRevision`; repository assigns `N+1` on success; stale rejects are **side-effect free** (status/revision unchanged).
4. **Plane separation:** custody `revision` is independent of `InspectionSession.revision`.
5. Custody transitions **never** rewrite package bytes or hashed `manifest.json`.
6. Lifecycle: `UNVERIFIED → VERIFIED → ARCHIVED` (plus `VERIFICATION_FAILED` / `EVIDENCE_CUSTODY_QUARANTINED`).

## Consequences

Tests must prove stale OCC leaves prior custody record unchanged and package digests stable across verify/archive.
