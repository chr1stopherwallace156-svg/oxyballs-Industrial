# SRC-CAND — Immutable source candidates

**Hard Rule 13:** discovering one source does not end research.  
**IDs:** `SRC-CAND-######` are immutable handles. Metadata (title, year, RC, access) may change.

| File | Role |
|---|---|
| `SRC_CANDIDATE_REGISTER.json` | Register + Next Search Queue |
| `SRC-CAND-00000N.json` | Per-candidate records |
| `schemas/src-candidate.schema.json` | Contract |

**RC (`research_confidence_rc`)** = hunt prioritization 0–100 with `reasoning_log`.  
It is **not** engineering verification and does **not** authorize geometry extraction.
