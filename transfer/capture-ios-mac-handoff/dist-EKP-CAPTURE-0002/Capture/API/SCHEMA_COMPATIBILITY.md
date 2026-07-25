# SCHEMA_COMPATIBILITY.md

| Field | Value |
|---|---|
| Status | **APPROVED** (Phase 0 baseline) |
| Version | 1.1.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All versioned contracts under `Contracts/` |
| Supersedes | 1.0.0 (clarifies operation axes; no payload change) |

## Purpose

Prevent silent reinterpretation of historical evidence. Compatibility is **not** a single vague `SUPPORTED` flag.

Every schema version decision must state four independent operations:

| Operation | Meaning |
|---|---|
| `READ_SUPPORT` | May this version be loaded/validated as-is? |
| `WRITE_SUPPORT` | May new packages be **emitted** in this version? |
| `MIGRATION_SUPPORT` | Is there a documented migrator **from** this version to a write version? |
| `REJECTION_POLICY` | If not readable/migratable, how do we fail? |

Reading an older version and writing new records in that older version are **different** capabilities.

## Desired behavior

```
Current write version
  → READ_SUPPORT = yes, WRITE_SUPPORT = yes, MIGRATION_SUPPORT = not required

Older recognized version
  → READ_SUPPORT = yes (direct) OR MIGRATION_SUPPORT = yes → then validate at write version
  → WRITE_SUPPORT = no (do not emit obsolete versions)

Unknown future version
  → READ_SUPPORT = no, WRITE_SUPPORT = no, MIGRATION_SUPPORT = no
  → REJECTION_POLICY = FAIL_CLOSED (UNSUPPORTED_SCHEMA_VERSION)

Unregistered / corrupted / missing version
  → READ_SUPPORT = no, WRITE_SUPPORT = no, MIGRATION_SUPPORT = no
  → REJECTION_POLICY = FAIL_CLOSED (UNREGISTERED_OR_CORRUPT_SCHEMA_VERSION)
```

## EvidenceManifest matrix (capture app 0.1.3)

| Schema version | READ_SUPPORT | WRITE_SUPPORT | MIGRATION_SUPPORT | Result |
|---|---|---|---|---|
| `1.0.0` | Yes | Yes | Not required | Current supported |
| older recognized (none yet) | — | No | — | Would migrate when registered |
| unknown future (e.g. `1.1.0`, `2.0.0`) | No | No | No | Fail closed |
| missing / empty / unregistered | No | No | No | Fail closed |

The same four-axis pattern applies to CapturePlan, CaptureRequirement, ArtifactMetadata, CoordinateTransform, CalibrationProfile, MeasurementObservation, CaptureDeviceProvenance, and portable-package version.

Machine-readable registry: `Contracts/Compatibility/schema-compatibility.1.0.0.json`

## Rejection error shape

```json
{
  "error_code": "UNSUPPORTED_SCHEMA_VERSION",
  "schema_id": "EvidenceManifest",
  "found_version": "2.0.0",
  "write_version": "1.0.0",
  "read_versions": ["1.0.0"],
  "migration_paths": []
}
```

## Rules

1. Never change field meaning in-place — bump `schema_version`.
2. Do not treat “optional new fields” as automatic backward compatibility without a registry row.
3. Additive minor bumps require dual-read tests before `WRITE_SUPPORT` moves.
4. Breaking changes require major bump + migrator **or** hard reject of old writes.
5. Joint contracts need `XREPO-CAP-EDTS-####` before bumping.
6. `Scripts/test-schema-migration` must pass on every release candidate.

See also: `SCHEMA_MIGRATION.md`, `ACCEPTANCE_CRITERIA.md`.
