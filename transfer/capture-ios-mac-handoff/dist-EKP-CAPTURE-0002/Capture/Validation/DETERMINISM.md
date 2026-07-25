# DETERMINISM.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.1.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Manifests, hashes, exporters |
| Supersedes | 1.0.0 |

Canonical serialization rules live in **`CANONICAL_JSON.md`**. This file covers what must be fixed in tests vs production.

## Controlled fields (must be injectable in tests)

| Field | Production source | Test control |
|---|---|---|
| `session_id` | Generated / assigned | Fixed fixture string |
| `artifact_id` | Generated / assigned | Fixed fixture string |
| `created_at_utc` | Wall clock | `EvidenceExportOptions.createdAtUTC` |
| `captured_at_utc` | Capture clock | Fixed `Date` / ISO string in fixtures |
| App Attest signature | Device + server | Mock / omitted in golden |
| Server challenge | Server | Injected or absent in golden |

## Must be deterministic given fixed inputs

- Artifact SHA-256 digests (file bytes — independent of JSON)
- `checksums.sha256` line set (sorted)
- Canonical JSON per `CANONICAL_JSON.md` (not pretty-print; not Dictionary iteration order)
- Authority / schema version / frame / clock_domain fields
- Parent lineage arrays (sorted on export)

## Verifier independence

`Scripts/verify-evidence-package` and `Scripts/test-determinism` recompute hashes from files. They must not trust exporter memory.
