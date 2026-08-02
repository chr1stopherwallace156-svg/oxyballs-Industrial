# XREPO-CAP-EDTS-0002

| Field | Value |
|---|---|
| Request ID | **XREPO-CAP-EDTS-0002** |
| Title | **Secure package ingestion** |
| Status | **OPEN** |
| Date | 2026-07-23 |
| Origin repository | `elektron-capture-ios` |
| Origin version | `0.1.4` |
| Depends on | XREPO-CAP-EDTS-0001 for schema/canonical gates (reuse; do not re-scope) |
| Target repository | `edts-core` / `edts-capture-api` |

## Distinct purpose (do not merge with XREPO-0001)

This request proves **hostile-input-safe intake** of `.edts-pkg` transport archives.

Must prove:

| Gate | Requirement |
|---|---|
| Quarantine intake | Packages land in quarantine before trust |
| Archive limits | Max compressed/expanded size and file count enforced |
| Path safety | No `..`, absolute paths, or symlinks |
| Inventory enforcement | Only declared paths; no undeclared files |
| Staged extraction | Isolated staging; never extract to permanent storage first |
| MIME and size checks | Declared MIME/size match extracted bytes |
| Atomic commit | Commit or reject without partial durable corruption |
| Structured rejection | Clear rejection codes; cleanup after failure |

Canonical JSON / schema equivalence remain **0001**. A package can be canonically valid and still be rejected here.

## Dual-gate result tuple

```json
{
  "canonical_compatibility": "PASS",
  "secure_ingestion": "FAIL",
  "committed": false,
  "reason_code": "ARCHIVE_PATH_COLLISION",
  "xrepo_gates": {
    "XREPO-CAP-EDTS-0001": "PASS",
    "XREPO-CAP-EDTS-0002": "FAIL"
  }
}
```

## EDTS-assigned states only

After successful secure ingest, EDTS (not the phone) may assign:

- `INGESTED_INTEGRITY_VERIFIED`
- `CONTENT_UNVERIFIED`

Capture may only claim up to `PACKAGE_EXPORTED` / `CAPTURE_SEALED`.

HTTP `201` or `202` allowed; response must include `ingestion_id` + status. Success = ingestion state, not status code alone.

## References

- `Docs/Evidence/EDTS_PKG_FORMAT.md`
- `Docs/Capture/PHASE_1_FIRST_VERIFIED_CAPTURE_ARTIFACT.md`
- `Docs/Architecture/STATUS_TAXONOMY.md`
- Contracts: `PackageInventory`, `IngestionStatus`

## Forbidden

- Implementing this importer inside `elektron-capture-ios`
- Zero Build Engine / engineering approval calls (must remain zero)
- Collapsing 0001 and 0002 into one vague “import works” checkbox
