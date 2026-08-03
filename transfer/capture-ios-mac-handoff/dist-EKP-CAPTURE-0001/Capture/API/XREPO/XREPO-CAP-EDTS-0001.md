# XREPO-CAP-EDTS-0001

| Field | Value |
|---|---|
| Request ID | **XREPO-CAP-EDTS-0001** |
| Title | **Canonical compatibility** |
| Status | **OPEN** |
| Date | 2026-07-23 |
| Origin repository | `elektron-capture-ios` |
| Origin version | `0.1.4` |
| Origin commit | tip at publish time (Phase 1 directive ≥ `19d4c07`) |
| Target repository | `edts-core` (and/or future `edts-capture-api`) |

## Distinct purpose (do not merge with XREPO-0002)

This request proves **semantic and cryptographic compatibility** of evidence contracts — not secure ZIP quarantine.

Must prove:

| Gate | Requirement |
|---|---|
| Schema resolution | EvidenceManifest / related schemas resolve at declared versions |
| Canonical JSON equivalence | Swift vs EDTS canonical bytes + SHA-256 identical on shared fixtures |
| Manifest parsing | Fields load without reinterpretation |
| Hash recomputation | Artifact digests recomputed from bytes match manifest |
| Identifier preservation | `SESSION-` / `ART-` / enrollment IDs survive |
| Authority preservation | No silent promotion to `ENGINEERING_VERIFIED` |
| Provenance preservation | Device provenance IDs and display-name separation survive |

A package may pass **0001** and still fail **0002** (secure ingestion).

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

Prefer this over a single opaque `INVALID_PACKAGE`.

## Problem

Capture can export packages locally (`PACKAGE_EXPORT_READY`), but EDTS has not independently proven canonical compatibility. Do not set `EDTS_COMPATIBLE` until this request’s gates pass.

## Golden package

`TestFixtures/GoldenEvidencePackages/GOLDEN_CAPTURE_001/`

## Definition of `EDTS_COMPATIBLE` (partial — requires 0001)

Minimum for compatibility claim (with 0002 for Phase 1 still transport):

1. 0001 gates pass on golden (and later real) packages  
2. Dual-repo recorded test date + commits  
3. No manual reinterpretation  

Secure archive handling is **XREPO-0002**, not this request.

## Forbidden

- Implementing EDTS importer inside `elektron-capture-ios`
- Letting the capture client assert `INGESTED_INTEGRITY_VERIFIED`
