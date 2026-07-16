# EDTS: Entire Vehicle Digital Twin System (Layer 0 Baseline)

This repository contains the authoritative schemas, standards, and registries establishing the baseline data model and coordinate frameworks for digital twin construction.

**Constitutional law:** [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](documentation/HARD_RULE_EXACT_VEHICLE_ISOLATION.md) — every vehicle is an independent engineering dataset; similarity is never evidence.  
**Kernel:** universal Draft 2020-12 schemas under `schemas/` (vehicle-agnostic)  
**Datasets:** `examples/<manufacturer>/<exact_configuration>/` — seed: [examples/ford/2019_f450_regularcab_4x2_drw/](examples/ford/2019_f450_regularcab_4x2_drw/)  
**Isolation tests:** `python3 verification/isolation/run_isolation_tests.py`  
**Protocol:** [EDTS_RESEARCH_PROTOCOL.md](EDTS_RESEARCH_PROTOCOL.md) v2.1  
**Modeling baseline:** `NOT_YET_APPROVED_FOR_GEOMETRY_FREEZE`  
See [STATUS.json](STATUS.json).
