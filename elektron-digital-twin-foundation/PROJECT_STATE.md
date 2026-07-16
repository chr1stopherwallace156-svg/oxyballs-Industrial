# EDTS Project State

**Updated:** 2026-07-16  
**Authoritative machine form:** `STATUS.json`

| Concern | Status |
|---|---|
| Kernel | `VALIDATED AND FROZEN` |
| Component Passport rc1 | `ACTIVE` / `UNCHANGED` |
| Component Passport v1.1 | `OPTIONAL PROPOSAL` |
| Door component identity | `ACTIVE` |
| Door candidates | `DISCOVERED / NOT ACQUIRED` |
| Door geometry | `ABSENT` |
| Door interaction | `ABSENT` |
| Vertical slice | `BLOCKED_BY_MISSING_ASSET` |
| EAE specification | `ACCEPTED` |
| EAE full executable | `ABSENT` |
| EAE CORE INGESTION | **`VALIDATED`** (`EDTS_EAE_CORE_INGESTION_VALIDATED`, 35 tests) |
| Rubric profiles | `DRAFT` (not activated) |
| Event model | `OPTIONAL PROPOSAL` (parked) |
| Current posture | `ACQUISITION_GATED_BY_MISSING_SOURCE` |
| Next build priority | **`EAE_ARCHIVE_SAFE_ACQUISITION_AND_METADATA`** |

## EAE CORE INGESTION (authoritative)

- Package: `eae/`
- Tests: `tests/eae/` (35 passed)
- Report: `verification/results/EAE_CORE_INGESTION_IMPLEMENTATION_REPORT.md`
- Machine results: `verification/results/eae-core-ingestion-tests.json`
- Kernel freeze audit: `verification/results/eae-core-kernel-freeze-audit.json`
- Decisions: `DT-D035`, `DT-D036`

**Not scored:** `CAND-00031-CGT`, `CAND-771-GRAB` (no local file, hash, parse, inventory, score, or GEO id).

## Change-control records

- `decisions/DT-D030_*.json` … `DT-D036_*.json`
