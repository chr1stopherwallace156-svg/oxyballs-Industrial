# ADR-P3-001 — Capture custody vocabulary vs EDTS `PACKAGE_QUARANTINED`

| Field | Value |
|---|---|
| Status | **Accepted** |
| Decision ID | **P3-001** |
| Date | 2026-08-03 |
| Sprint | 3.0 |
| Related | `STATUS_TAXONOMY.md`, `status-owner-registry.json`, Phase 3 charter §1 invariant 4 |

## Context

EDTS owns wire code `PACKAGE_QUARANTINED` on the ingest plane. Phase 3 custody needs a Capture-side quarantine without colliding with EDTS ownership.

## Decision

1. Capture custody uses `EvidenceCustodyStatus` with wire value `EVIDENCE_CUSTODY_QUARANTINED` (owner **CAPTURE**, plane `runtime_custody`).
2. Capture **must not** emit `PACKAGE_QUARANTINED`.
3. Draft acquisition quarantine remains `DraftAcquisitionStatus.quarantined` → wire `DRAFT_ACQUISITION_QUARANTINED` (distinct from media `.quarantine/` and EDTS ingest).
4. Registry entries for Capture custody codes are added; EDTS `PACKAGE_QUARANTINED` unchanged.

## Consequences

`CaptureSideStatusGuard` / registry tests continue to reject Capture asserting EDTS codes. Spatial custody store refuses any attempt to set EDTS quarantine wire values.
