# STATUS_TAXONOMY.md

| Field | Value |
|---|---|
| Status | **APPROVED** |
| Version | 1.1.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | All status fields in docs and code |
| Supersedes | 1.0.0 |

Keep these planes **separate**. Never collapse them into one vague “supported” or “verified” flag.

**Critical inequality:**

```
PHASE_1_DIRECTIVE_APPROVED ≠ PHASE_1_IMPLEMENTATION_COMPLETE
```

Phase 1 directive approved.  
Phase 1 runtime implementation not started.

Machine-readable ownership: `Contracts/Compatibility/status-owner-registry.json`  
Enforced in code by `StatusOwnerRegistry` + `CaptureSideStatusGuard` (rejects any `owner: EDTS` status from the capture client).

## 1. Repository implementation status

Tracked in `INTEGRATION_STATUS.md` (EDTS connection readiness).

Examples: `NOT_CONNECTED` · `MOCK_ONLY` · `PACKAGE_EXPORT_READY` · `API_CLIENT_READY` · `INTEGRATION_TESTING` · `EDTS_COMPATIBLE`

Current honest value: **`PACKAGE_EXPORT_READY`**

## 2. Phase governance status

| Value | Meaning |
|---|---|
| `APPROVED_FOR_PHASE_1_PREPARATION` | Phase 0 foundation accepted |
| `PHASE_1_DIRECTIVE_APPROVED` | Phase 1 **specification** locked |
| `PHASE_1_IMPLEMENTATION_COMPLETE` | All 16 runtime gates passed (**not yet**) |

Current honest values:

- Phase 0 implementation: **Approved**
- Phase 1 specification: **`PHASE_1_DIRECTIVE_APPROVED`**
- Phase 1 runtime implementation: **Not started** (`PHASE_1_IMPLEMENTATION_COMPLETE` = false)
- EDTS compatibility: **Not established**

## 3. Runtime evidence / ingest result

### Capture-side only (`owner: CAPTURE`)

```
CAPTURE_CREATED
CAPTURE_PERSISTED
CAPTURE_HASHED
CAPTURE_SEALED
PACKAGE_EXPORTED
```

### EDTS-side only (`owner: EDTS`)

```
PACKAGE_RECEIVED
PACKAGE_QUARANTINED
PACKAGE_VALIDATED
REJECTED
VERIFIED_TRANSPORT_INTEGRITY
INGESTED_INTEGRITY_VERIFIED
CONTENT_UNVERIFIED
COMMITTED_UNVERIFIED_EVIDENCE
```

The phone must not assign EDTS-owned codes. Prefer registry lookup over a hard-coded deny list.

### Authority ladder (never equate)

| Observation | Does **not** mean |
|---|---|
| Captured successfully | Engineering verified |
| Hash verified | Content / subject verified |
| Package accepted | Physically measured |
| `INGESTED_INTEGRITY_VERIFIED` | Metrology or Build Engine approval |

## Lifecycle

```
CAPTURE_CREATED → CAPTURE_PERSISTED → CAPTURE_HASHED → CAPTURE_SEALED → PACKAGE_EXPORTED
  → PACKAGE_RECEIVED → PACKAGE_QUARANTINED → PACKAGE_VALIDATED
  → INGESTED_INTEGRITY_VERIFIED + CONTENT_UNVERIFIED   (EDTS only)
```

## Dual-gate result tuple (EDTS)

Do not collapse XREPO-0001 and XREPO-0002 into one `INVALID_PACKAGE`. Prefer:

```json
{
  "canonical_compatibility": "PASS",
  "secure_ingestion": "FAIL",
  "committed": false,
  "reason_code": "ARCHIVE_PATH_COLLISION",
  "ingestion_id": "ING-...",
  "xrepo_gates": {
    "XREPO-CAP-EDTS-0001": "PASS",
    "XREPO-CAP-EDTS-0002": "FAIL"
  }
}
```

A package can pass canonical compatibility and still fail secure ingestion.
