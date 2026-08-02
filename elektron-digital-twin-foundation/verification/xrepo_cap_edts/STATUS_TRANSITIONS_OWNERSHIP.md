# StatusTransitions ownership (integration note)

| Field | Value |
|---|---|
| Date | 2026-07-24 |
| Mode | Proposal only — **do not** copy `status-transitions.json` into capture to “turn the report green” |
| Related | `MISSING_ON_PRODUCER` in `PRODUCER_CONSUMER_DIVERGENCE_REPORT.md` |

## Facts

- Consumer vendors `eae/contracts/capture_ios_0_1_4/status-transitions.json`.
- Producer has **no** tracked `status-transitions.json` at tag `capture-ios-phase1-directive-v0.1.4` or feature HEAD.
- Consumer file notes it was **derived from** capture `Docs/Architecture/STATUS_TAXONOMY.md`.
- Producer **does** track `status-owner-registry.json` (byte-identical to vendor).
- Producer asserts only capture-owned runtime statuses ending at `PACKAGE_EXPORTED`.
- Consumer alone assigns `INGESTED_INTEGRITY_VERIFIED` / `CONTENT_UNVERIFIED`.

## Ownership recommendation (pending human acceptance)

| Status plane | Owner | Machine artifact |
|---|---|---|
| Capture runtime transitions (`CAPTURE_*` → `PACKAGE_EXPORTED`) | CAPTURE (documented in taxonomy + enforced by `CaptureSideStatusGuard`) | Producer docs + registry; optional future subset file |
| EDTS ingest transitions (`PACKAGE_RECEIVED` … → integrity/content) | EDTS / importer | Consumer `status-transitions.json` (or rename to `edts-status-transitions.json`) |
| Status **ownership** codes | JOINT | Shared `status-owner-registry.json` (**already MATCH**) |

### Possibility A (preferred unless proven otherwise)

Consumer-owned transition policy for **post-ingestion** states. Producer must not carry the full EDTS graph. Classification `MISSING_ON_PRODUCER` remains accurate as a file presence fact, but is **not a defect** if ownership is Possibility A.

### Possibility B

Only if the producer begins asserting or validating the same transition edges. Then publish a versioned JOINT subset (or full table) on both sides with digest pin.

## Required decision before any file copy

1. Which statuses are producer-owned vs importer-owned vs shared?  
2. Does the producer need the entire transition table or only the capture-side chain?  
3. Are taxonomy markdown docs authoritative, or is the JSON the SoT?

Until that decision is recorded (e.g. EDTS decision register + capture CONTRACT_OWNERSHIP), **leave the producer without** `status-transitions.json`.
