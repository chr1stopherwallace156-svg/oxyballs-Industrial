# EDTS_PKG_FORMAT.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios (format) / JOINT with EDTS (ingest) |
| Last Updated | 2026-07-23 |
| Applies To | Phase 1+ `.edts-pkg` transport packages |
| Supersedes | (none) |

## Purpose

Deterministic **content** evidence with a portable ZIP **transport** container.

ZIP bytes are **not** the canonical evidence identity (timestamps, entry order, compressor metadata may differ).

Canonical evidence identity:

```
exact artifact file bytes
+ canonical manifest bytes (CANONICAL_JSON.md)
+ package_inventory.json (declared paths, sizes, hashes)
```

Optional: `package_content_digest` = SHA-256 over the canonical inventory document (not over ZIP bytes).

## Phase 1 minimal layout

```
EVD-<id>.edts-pkg/          # directory before zip, or zip root
├── manifest.json
├── package_inventory.json
├── capture_device.json
├── payload/
│   └── artifact_original.jpg    # or .heic — exact AVFoundation output
└── sidecars/                    # optional but recommended
    └── avcapture_metadata.json  # preserved Apple metadata record
```

Allowed paths for Phase 1 (exact set; no others):

| Path | Required |
|---|---|
| `manifest.json` | Yes |
| `package_inventory.json` | Yes |
| `capture_device.json` | Yes |
| `payload/artifact_original.jpg` **or** `payload/artifact_original.heic` | Yes (one) |
| `sidecars/avcapture_metadata.json` | Recommended |
| `sidecars/camera_calibration.json` | If calibration available |
| `sidecars/motion_orientation.json` | If motion recorded |

Filename for the encoded still inside payload must match `artifact.path` in the manifest.

## package_inventory.json

```json
{
  "schema_id": "PackageInventory",
  "schema_version": "1.0.0",
  "package_format_version": "1.0.0",
  "package_id": "EVD-...",
  "entries": [
    {
      "path": "payload/artifact_original.jpg",
      "byte_size": 4194304,
      "sha256": "RECOMPUTE_FROM_BYTES"
    },
    {
      "path": "manifest.json",
      "byte_size": 2841,
      "sha256": "HASH_OF_ON_DISK_OR_CANONICAL_BYTES_PER_POLICY"
    },
    {
      "path": "capture_device.json",
      "byte_size": 512,
      "sha256": "..."
    },
    {
      "path": "package_inventory.json",
      "byte_size": 0,
      "sha256": "SELF_EXCLUDED_OR_DOCUMENTED"
    }
  ],
  "notes": [
    "Inventory entry for package_inventory.json itself must follow documented self-hash policy.",
    "ZIP is transport; compare entry hashes of extracted files."
  ]
}
```

**Self-hash policy (Phase 1):** `package_inventory.json` lists all other files; its own hash is omitted from the signed set **or** computed over the inventory with the self entry’s `sha256` field set to empty and excluded from digest input. Document the chosen policy in the package and tests. Default: **omit self from `entries`**; inventory hash is not required for Phase 1 transport integrity (artifact + manifest hashes are).

## MIME / representation

| representation | mime_type | notes |
|---|---|---|
| `APPLE_ENCODED_JPEG` | `image/jpeg` | Phase 1 default |
| `APPLE_ENCODED_HEIF` | `image/heic` | Allowed if capture config produces HEIF |
| `APPLE_RAW` | TBD | **Out of Phase 1** |

## EDTS importer archive hardening (normative for EDTS)

Before extract:

1. Enforce max compressed size, max expanded size, max file count  
2. Reject absolute paths, `..` segments, symlinks  
3. Reject duplicate paths and case-colliding paths on case-insensitive stores  
4. Reject nested `.zip` / `.edts-pkg`  
5. Extract only into isolated quarantine staging  
6. After extract: every on-disk file must appear in inventory; every inventory path must exist  
7. Recompute SHA-256 of each payload/sidecar file; compare to inventory + manifest  
8. Validate schemas; then commit or reject  

Never extract directly into permanent object storage.

## Relationship to SESSION-* layout

Full multi-artifact session trees (`originals/`, `derivatives/`, …) remain valid for richer offline packages. Phase 1 **minimum** transport is the `.edts-pkg` layout above. Session layout may wrap one or more `.edts-pkg` units later.
