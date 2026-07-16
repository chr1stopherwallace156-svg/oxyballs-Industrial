# Evidence Acquisition Engine

**Status:** `PARTIAL` — see `verification/results/EAE_READINESS_REPORT.md`  
**Readiness:** `EDTS_EAE_SPECIFICATION_READY_IMPLEMENTATION_PENDING`  
**Kernel:** frozen (`edts-kernel-v1.0.0-rc1`) — this subsystem does **not** expand schemas  
**Decisions:** `DT-D032`, `DT-D033`  

Do **not** claim full operational readiness. Do **not** score `CAND-00031-CGT` / `CAND-771-GRAB` while `NOT_ACQUIRED`.

## Purpose

Reusable pipeline that turns discovered candidates into hashed, inventoried, graded evidence — for 3D assets **and** other evidence types (OEM docs, photos, scans, procedures, etc.).

```text
SEARCH → DISCOVER → ACQUIRE → INTEGRITY → METADATA → PARSE
  → INVENTORY → GRADE → EXTRACT_COMPONENTS → ATTACH_EVIDENCE
  → UPDATE_PASSPORT → RUNTIME_READY
```

## Run

```bash
python3 tools/evidence_acquisition/run_evidence_acquisition.py \
  --candidates CAND-00031-CGT,CAND-771-GRAB
```

Place local bytes (when licensed/accessible) under:

`research/incoming/l01_lane_a_assets/<candidate_or_asset_id>/source/`

Optional source URL in catalog (`url`) or sidecar `source_url.txt` in the candidate staging folder.

## Honesty gates

| Condition | Engine behavior |
|---|---|
| No URL and no local bytes | `BLOCKED_BY_MISSING_SOURCE_URL` / `BLOCKED_BY_MISSING_LOCAL_BYTES` — writes audit trail only |
| Bytes present | Hash → metadata → best-effort parse/inventory → grade |
| Door not separable | `PROMOTED_TO_REFERENCE_ONLY` + extractability report |
| Passport update | **Skipped** until geometry is acquired and inventoried |

## Outputs

Per candidate under `research/incoming/l01_lane_a_assets/<id>/pipeline/<run_id>/`.
