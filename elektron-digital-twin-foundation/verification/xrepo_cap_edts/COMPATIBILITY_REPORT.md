# XREPO-CAP-EDTS Compatibility Report

Generated: `2026-07-23T05:03:55.112082+00:00`

## Contract bundle

- Registry schema version: `1.0.0`
- Bundle digest: `8fb3e27f716225f9f585370ceb337e628f821f26dd1bfe4deb1042120c09de21`

## Golden package

### XREPO-0001 (canonical compatibility only)

```json
{
  "canonical_compatibility": "PASS",
  "secure_ingestion": "NOT_RUN",
  "committed": false
}
```

### XREPO-0002 (secure ingest + commit)

```json
{
  "canonical_compatibility": "PASS",
  "secure_ingestion": "PASS",
  "committed": true,
  "edts_status": [
    "INGESTED_INTEGRITY_VERIFIED",
    "CONTENT_UNVERIFIED"
  ]
}
```

## Negative fixtures (0001)

| Fixture | Result | Reason codes |
|---|---|---|
| `HASH_MISMATCH` | FAIL | HASH_MISMATCH |
| `NONCANONICAL_MANIFEST` | FAIL | NONCANONICAL_MANIFEST |
| `UNSUPPORTED_SCHEMA_VERSION` | FAIL | UNSUPPORTED_SCHEMA_VERSION |
| `CAPTURE_ASSERTED_EDTS_STATUS` | FAIL | CAPTURE_ASSERTED_EDTS_STATUS |
| `UNKNOWN_STATUS` | FAIL | UNKNOWN_STATUS |
| `IDENTIFIER_MUTATION` | FAIL | IDENTIFIER_MUTATION |
| `CONTRACT_BUNDLE_DIGEST_MISMATCH` | FAIL | CONTRACT_BUNDLE_DIGEST_MISMATCH |

## Hostile fixtures (0002)

| Fixture | secure_ingestion | committed | Reason codes |
|---|---|---|---|
| `PATH_TRAVERSAL` | FAIL | False | PATH_TRAVERSAL |
| `ABSOLUTE_PATH` | FAIL | False | ABSOLUTE_PATH |
| `SYMLINK_ENTRY` | FAIL | False | SYMLINK_ENTRY |
| `DUPLICATE_ENTRY` | FAIL | False | DUPLICATE_ENTRY |
| `CASE_COLLISION` | FAIL | False | CASE_COLLISION |
| `UNICODE_NORMALIZATION_COLLISION` | FAIL | False | UNICODE_NORMALIZATION_COLLISION |
| `NESTED_ARCHIVE` | FAIL | False | NESTED_ARCHIVE |
| `UNDECLARED_FILES` | FAIL | False | UNDECLARED_FILES |

## Pytest

Return code: `0`

```
...........................                                              [100%]
=============================== warnings summary ===============================
tests/eae/test_xrepo_cap_edts_0002.py::test_hostile_duplicate_entry
  /usr/lib/python3.12/zipfile/__init__.py:1620: UserWarning: Duplicate name: 'manifest.json'
    return self._open_to_write(zinfo, force_zip64=force_zip64)

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
27 passed, 1 warning in 0.12s
```

## Rules preserved

- Failures keep separate reason codes (never collapsed to `PACKAGE_INVALID`).
- Commit only when both gates PASS.
- XREPO-0001 alone never commits (`secure_ingestion: NOT_RUN`).
- Status ownership loaded from vendored `status-owner-registry.json` digests.
