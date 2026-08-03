# EVIDENCE_PACKAGE_STANDARD.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.1.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | Path A portable packages + Phase 1 `.edts-pkg` |
| Supersedes | 1.0.0 |

## Phase 1 transport (`.edts-pkg`)

Normative for Phase 1 still ingest. See **`EDTS_PKG_FORMAT.md`**.

```
EVD-<id>.edts-pkg/
├── manifest.json
├── package_inventory.json
├── capture_device.json
├── payload/
│   └── artifact_original.jpg   # APPLE_ENCODED_JPEG (or .heic)
└── sidecars/                   # optional metadata / calibration / motion
```

ZIP is **transport only**. Evidence identity = artifact bytes + canonical manifest + inventory hashes.

## Full session layout (richer offline / multi-artifact)

```
SESSION-<id>/
├── manifest.json
├── session.json
├── capture-plan.json
├── capture_device.json
├── calibration/
├── originals/
│   ├── images/
│   ├── depth/
│   ├── motion/
│   └── metadata/
├── derivatives/
├── quality/
├── signatures/
├── amendments/
└── checksums.sha256
```

`capture_device.json` uses stable machine-readable IDs (`device_profile_id`, `hardware_model_identifier`, `lens_profile_id`, enrollment/installation). Display names are non-authoritative.

## Rules

- Self-describing: EDTS must not need private app knowledge.
- Originals immutable; derivatives under `derivatives/` with parent references.
- Never label JPEG/HEIF as RAW unless representation is explicitly `APPLE_RAW`.
- Calibration may be `NOT_AVAILABLE` and still valid.
- Package remains supported after Path B API exists (offline/recovery/diagnostic).

## Golden fixtures

- `TestFixtures/GoldenEvidencePackages/GOLDEN_CAPTURE_001` — foundation Path A synthetic package  
- Phase 1 physical still golden — produced during Phase 1 execution (not claimed until then)
