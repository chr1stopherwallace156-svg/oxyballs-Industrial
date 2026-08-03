# ADR-P3-002 — `PACKAGED` boundary vs `.edts-pkg` / `CAPTURE_SEALED`

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-002** |
| Date | 2026-08-03 |
| Sprint | 3.0 |

## Context

Phase 1 seals still-capture evidence and may export `.edts-pkg`. Phase 3 introduces a spatial `PACKAGED` boundary event. Dual package law must be avoided.

## Decision

1. **`PACKAGED`** is a **boundary transition event** and immutable package condition for `SpatialEvidencePackage`. It is **not** a mutable custody enum value and is **not** stored inside the hashed manifest as a custody status.
2. **`.edts-pkg`** remains the Phase 1 **transport export** format for still-capture / library packages. It is not the Spatial Evidence Package schema.
3. **`CAPTURE_SEALED` / `PACKAGE_EXPORTED`** remain Capture-side still-capture lifecycle codes (unchanged).
4. A spatial package may later be wrapped for EDTS transport under a future ADR; until then, spatial sealed directories + `manifest.json` are the authoritative Phase 3 artifact for the synthetic slice.
5. Inspection envelope v1 and PackageInventory 1.0.0 are **not** redefined by this ADR.

## Consequences

Code and docs must not treat `.edts-pkg` validation as spatial package closure, or vice versa.
