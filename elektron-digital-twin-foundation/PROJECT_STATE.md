# EDTS Project State

**Updated:** 2026-07-16  
**Authoritative machine form:** `STATUS.json`

| Concern | Status |
|---|---|
| Kernel | `VALIDATED AND FROZEN` |
| Component Passport rc1 | `ACTIVE` / `UNCHANGED` |
| Locked config | 2019 F-450 CC Reg Cab 4x2 DRW 145.3/60 (`VEH-000001` / `CFG-000001`) |
| Door candidates | `DISCOVERED / NOT ACQUIRED` |
| Vertical slice | `BLOCKED_BY_MISSING_ASSET` |
| EAE CORE INGESTION | `VALIDATED` |
| Front suspension architecture | **`CANDIDATE_ASSERTION` — NOT DECIDED** |
| Front suspension decision | **`PRIMARY_SOURCE_REQUIRED` (DT-D037)** |
| BBAS / Service Manual candidates | `NOT_ACQUIRED` |
| Suspension geometry upload review | `NOT_EXECUTED` |
| Next build priority | **`PRIMARY_SOURCE_ACQUISITION_FRONT_SUSPENSION`** |

## Research sprint RL-006

- Report: `research/sprints/RL-006_FRONT_SUSPENSION_PRIMARY_SOURCE.md`
- Candidates: `research/candidates/CAND-FORD-BBAS-2019.json`, `CAND-FORD-SM-2019.json`
- Conflict: `CNF-001` → `OPEN_PRIMARY_SOURCE_REQUIRED`
- Decision: `decisions/DT-D037_PRIMARY_SOURCE_REQUIRED_FRONT_SUSPENSION.json`

No claims at `VERIFIED_EVIDENCE`. Do not import 4x4 or 169.3 in WB geometry into this silo.

## Change-control records

- `decisions/DT-D030_*.json` … `DT-D037_*.json`
