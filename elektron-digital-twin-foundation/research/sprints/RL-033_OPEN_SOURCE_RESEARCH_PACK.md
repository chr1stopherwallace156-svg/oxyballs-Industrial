# RL-033 — Open-source maximum-leverage research pack

**Decision:** DT-D064  

## Question

Which open-source tools, scan pipelines, math methods, and backlog steps maximize EDTS leverage for `CFG-2019-F450-REG-CAB-4X2-60CA-DRW` without bloating production or inventing claims?

## Findings

1. Catalog locked: COLMAP, Open3D, RTAB-Map, R3F, vPIC = REUSE_DIRECTLY; Nerfstudio ADAPT (viz only); Quantum REFERENCE_ONLY.
2. Mobile `.edts-scan` schema + AprilTag scale + vehicle SOP documented.
3. FPFH→ICP QA thresholds documented as future gates, not achieved results.
4. vPIC match matrix + door-jamb OCR fallback; no invented GAWR lock.
5. WLS / RANSAC plane / symmetry methods formulated; CRS note on centerline normal.
6. 90-day backlog proposed; Sprint 5 continuity with existing VPR-2; **tasks not executed**.
7. **Zero production code mutation** this pass.

## Status

DT-D064 — `OPEN_SOURCE_RESEARCH_PACK_ACCEPTED_BACKLOG_NOT_EXECUTED`.
