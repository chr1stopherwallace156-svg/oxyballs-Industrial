# Evidence Acquisition Engine

**Status:** `ACTIVE_OPERATIONAL`  
**Not a kernel schema.** Frozen rc1 schemas are untouched.  
**Implementation:** `tools/evidence_acquisition/`  
**Decision:** `decisions/DT-D032_EVIDENCE_ACQUISITION_ENGINE.json`

## Shift

Architecture is frozen for the vertical slice. Effort moves to **empirical evidence**: acquire → verify → parse → inventory → grade → attach.

“Asset acquisition” is a special case of **Evidence Acquisition**. The same pipeline should eventually ingest CAD/meshes, OEM manuals, photos, scans, procedures, torque charts, material data, etc.

## Pipeline

```text
SEARCH → DISCOVER → ACQUIRE → INTEGRITY → METADATA → PARSE
  → INVENTORY → GRADE → EXTRACT_COMPONENTS → ATTACH_EVIDENCE
  → UPDATE_PASSPORT → RUNTIME_READY
```

### Lifecycle milestones

`DISCOVERED → ACQUIRED → VERIFIED → PARSED → INDEXED → COMPONENTIZED → EVIDENCE_LINKED → RUNTIME_READY`

Side states: `BLOCKED_BY_MISSING_SOURCE_URL`, `BLOCKED_BY_MISSING_LOCAL_BYTES`, `PROMOTED_TO_REFERENCE_ONLY`, `REJECTED`.

### Metadata stage (before deep geometry inspection)

software/exporter, author, dates, units, coordinate system, polygon/vertex counts, texture/material counts, hierarchy depth, pivot quality — recorded when readable; otherwise `UNKNOWN` / `NOT_EVALUATED`.

## Required outputs (successful acquire)

- `asset_manifest.json`
- `mesh_inventory.json`
- `asset_hash_record.json`
- `metadata_record.json`
- `door_extractability_report.md`
- `pipeline_run.json`

## Non-separable assets

If the door cannot be logically detached without destructive editing, grade **`PROMOTED_TO_REFERENCE_ONLY`** and continue searching for a separable candidate. The asset remains useful.

## Passport rule

Do **not** auto-write geometry hashes or invent links on `PP-VEH000001-DOOR-FL-001` until a real extract is acquired and inventoried. rc1 passport stays an honest index.

## Door sprint targets

| Candidate | Primary risk |
|---|---|
| `CAND-00031-CGT` | Visual-only / empty shell |
| `CAND-771-GRAB` | Merged mesh / unknown hierarchy |
