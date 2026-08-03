# FL Door Vertical Slice — 2019 F-450 RC 4x2 60CA DRW

**Decision:** `DT-D050` · **Sprint:** `RL-019`  
**Recommended decision:** `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`

## Scope lock

See [`SCOPE_LOCK.json`](SCOPE_LOCK.json). No pickup / Crew Cab / 4x4 / 2020+ inheritance as authoritative truth.

## Artifacts

| Artifact | Path |
|---|---|
| Source ledger | `SOURCE_ACQUISITION_LEDGER.json` |
| Findings RF-001/002 | `RESEARCH_FINDINGS.json` |
| Candidate components/IFACE | `CANDIDATE_COMPONENTS.json` |
| Candidate EGS edges | `CANDIDATE_EDGES.json` |
| Contradiction | `CONTR-2019-F450-DOOR-HARNESS-PINOUT.json` |
| Saturation | `RESEARCH_SATURATION.json` |
| Bytes | `research/incoming/fl_door_vertical_slice/` |

## Honesty highlights

- BAG + NHTSA PDFs **SOURCE_ACQUIRED** with real SHA-256; **parser PENDING**.
- Skeeter brochure URL **HTTP 404** → **NOT_ACQUIRED** (not claimed acquired).
- WSM/EWD → **SOURCE_DISCOVERED**; **MISN-000003** commercial handoff.
- Operator KG-002 (regulator fasteners) → repo **KG-005** (KG-002 is Dana M300).
- Pin conflict → **CONTRADICTION** + edge `CONTRADICTED` property; procedures blocked.
- Invented `EVD-PUBLIC-SPEC` 12 V claim **rejected** (voltage left unresolved).
