# SCHEMA_MIGRATION.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Contract version upgrades |
| Supersedes | (none) |

## Migration registry (Phase 0)

No historical payload versions exist yet besides `1.0.0`.

| Migrator ID | From | To | Status | Notes |
|---|---|---|---|---|
| *(none)* | — | — | — | First write version is `1.0.0` |

When `1.1.0` is introduced, add a row **before** shipping writers, for example:

| Migrator ID | From | To | Status | Notes |
|---|---|---|---|---|
| `MIG-EM-1.0.0-1.1.0` | EvidenceManifest `1.0.0` | `1.1.0` | PLANNED | Additive fields only; fill defaults |

## Migrator contract

Each migrator must:

1. Declare `from_version` and `to_version`.
2. Be pure given fixed inputs (deterministic).
3. Preserve artifact hashes and lineage (unless the migration’s purpose is a documented re-hash with parent linkage).
4. Never invent `ENGINEERING_VERIFIED` or Build Engine tokens.
5. Emit a migration record in package `amendments/` when transforming sealed historical packages offline.
6. Have golden fixtures: input `1.0.0` + expected `1.1.0` (when applicable).

## Rejection behavior

```
unsupported schema_version
  → reject
  → error code: UNSUPPORTED_SCHEMA_VERSION
  → include: schema_id, found_version, supported_versions[]
```

## Implementation placeholders

- Registry file: `Contracts/Compatibility/schema-compatibility.1.0.0.json`
- Tests: `Scripts/test-schema-migration`
- Swift (future): `SchemaMigrationRegistry` — not required until a second version exists

## Forbidden shortcuts

- Silent field-meaning changes
- Accepting unknown versions as “compatible enough”
- Migrating by deleting uncertainty / authority / frames
