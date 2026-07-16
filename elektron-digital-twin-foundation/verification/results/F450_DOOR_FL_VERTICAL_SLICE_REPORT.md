# F450_DOOR_FL_VERTICAL_SLICE_REPORT

**component_instance_id:** `CMPINST-VEH000001-DOOR-FL`  
**execution_timestamp:** `2026-07-16T16:54:09.333199+00:00`  
**final_status:** `F450_DOOR_FL_VERTICAL_SLICE_BLOCKED_BY_MISSING_ASSET`

## Kernel prerequisite

- EDTS Exact-Vehicle Kernel `1.0.0-rc1`
- Validation: **49/49 PASS**
- Scope: Data integrity and exact-vehicle isolation
- Runtime 3D vertical slice: **PENDING / BLOCKED**
- Schema posture: `SCHEMA_FREEZE_FOR_VERTICAL_SLICE`

## Asset gate

`ASSET-00031` audited as **`CANDIDATE_NOT_ACQUIRED`**.

Evidence: `research/incoming/l01_lane_a_assets/ASSET-00031/ASSET_AVAILABILITY_AUDIT.json`

No GLB/GLTF/FBX/OBJ bytes were found. Geometry adaptation and Three.js interaction tests were **not executed**.

## Suite status

| Suite | Artifact | Status |
|---|---|---|
| Asset ingestion | door-asset-ingestion-tests.json | BLOCKED (7) |
| Runtime isolation (door) | door-runtime-isolation-tests.json | BLOCKED (6) |
| Three.js interaction | door-threejs-interaction-tests.json | BLOCKED (8) |
| Transform reset | door-transform-reset-tests.json | BLOCKED (6) |

## Next required action

Acquire a real candidate asset with source URL, local path, format, size, SHA-256, and mesh inventory — then resume Phase 3/4.
