# ADR-P3-003 — Session / vehicle / package binding

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-003** |
| Date | 2026-08-03 |
| Sprint | 3.0 |

## Context

Spatial packages must bind identities without silently rewriting Sprint 2.1 inspection envelope binding (`storageKey` / library ids).

## Decision

1. At seal, `SpatialEvidenceManifest` **requires**:
   - `vehicle_id`
   - `capture_session_id`
   - `package_id`
2. Optional: `pilot_id` (reference-pilot execution identity; distinct from `vehicle_id`).
3. Sprint 2.1 inspection approve/bind paths continue to use library `storageKey` / envelope v1 — **unchanged** in Sprint 3.0.
4. Binding inspection points exclusively to `VerifiedSpatialEvidencePackage` ids is **deferred** (future ADR). Synthetic slice records binding fields only inside the spatial package.

## Consequences

No envelope v1 bump. No silent overwrite of inspection evidence ids with spatial package hashes in this sprint.
