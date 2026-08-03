# ADR-P3-006 — Spatial schema compatibility with Phase 0–2.3

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-006** |
| Date | 2026-08-03 |
| Sprint | 3.0 |

## Context

Spatial package schemas must not silently reinterpret inspection envelope v1 or `DeviceCapabilitySnapshot` 1.0.0.

## Decision

1. Spatial schemas use distinct ids/versions, e.g. `SpatialEvidenceManifest@1.0.0-phase3-synthetic`, `SpatialCapabilitySnapshot@1.0.0-phase3-synthetic`.
2. `DeviceCapabilitySnapshot` 1.0.0 remains unchanged; spatial capability stages live on `SpatialCapabilitySnapshot`.
3. Inspection envelope v1 remains untouched.
4. Existing `ClockDomain` enum is **extended additively** with `synthetic_deterministic` for synthetic replay; historical raw values retain prior meaning.
5. Hash algorithm id for spatial closure: `sha256-content-v1` (content digests + ordered closure material) — distinct from S2-002 plan snapshot hashing id.
6. Unsupported / unknown spatial schema versions fail closed at seal and verify.

## Consequences

No migration of Phase 1 packages. Unknown spatial schemas reject explicitly.
