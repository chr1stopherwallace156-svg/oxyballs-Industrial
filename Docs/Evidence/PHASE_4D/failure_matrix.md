# Phase 4D failure matrix

| Case | Expected | Result |
|---|---|---|
| Invalid / missing Phase 4C fused cloud | INELIGIBLE_INVALID_POINT_CLOUD | PASS |
| Invalid normals | INELIGIBLE_INVALID_NORMALS | PASS |
| Phase 4C not READY_FOR_SYNTHETIC_SURFACE_CANDIDATE | ineligible / fail-closed | PASS |
| Quarantined inputs | excluded from mesh | PASS |
| Gap bridging triangles | REJECTED_GAP_BRIDGING | PASS |
| Degenerate / duplicate-vertex candidates | REJECTED_DEGENERATE (recorded) | PASS |
| Intentional hole / open boundary | hole + boundary records; no auto-fill | PASS |
| Cancellation during generation | no sealed output_closure | PASS |
| Phase 4C outputs mutated by Phase 4D | forbidden; byte-identical | PASS |
| Deterministic replay | identical digests | PASS |
| Inventory / closure | complete, no orphans | PASS |
