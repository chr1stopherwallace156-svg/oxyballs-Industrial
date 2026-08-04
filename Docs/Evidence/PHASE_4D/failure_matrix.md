# Phase 4D failure matrix

| Case | Expected | Result |
|---|---|---|
| Ambiguous / near-zero mean normals | QUARANTINED_AMBIGUOUS_TOPOLOGY / REJECTED_NORMAL_CONFLICT | PASS |
| Gap bridging | REJECTED_GAP_BRIDGING | PASS |
| Degenerate candidates | REJECTED_* recorded | PASS |
| Quarantined inputs | excluded | PASS |
| Automatic hole fill | forbidden | PASS |
| GLB empty / invalid | GLB_EXPORT_SKIPPED; JSON/PLY/OBJ retained | PASS |
| Cancellation | no sealed output | PASS |
| Phase 4C mutation | forbidden; byte-identical | PASS |
