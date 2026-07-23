# Kernel Deferred Features

**Status:** Officially deferred to **Stage 3 (Generalization)** / later roadmap phases.  
**Do not** expand kernel schemas to absorb these during the door vertical slice.

| Feature | Rationale for deferral | Future home |
|---|---|---|
| Telemetry mapping | Not required to select/isolate/remove a door | L09 / Stage 3 |
| EV conversion logic | Conversion engine is P5; stalls kernel proof | `USS-SIM` / P5 |
| Fleet API integrations | External product surface | `USS-API` / Stage 3 |
| Multi-year compatibility lookup engines | Applicability rows are enough for one config | `USS-COMPAT` / P6 |
| Full Evidence Graph weighting UI | Kernel uses discrete Evidence Link rows | `USS-EVIDENCE` enhancement |
| Automated marketplace Asset Pipeline API | Manual ASSET-00031 path sufficient for slice | P3 |
| Diagnostics attachment points | Out of exterior door proof | L09 |

Kernel completeness is defined by **acceptance tests T01–T05**, not by platform breadth.
