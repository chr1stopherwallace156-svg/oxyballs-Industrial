# F-450 Door FL — Acceptance Tests

**Entity:** `CMP-FORD-SD-DOOR-FL-001`  
**Slice status:** `EDTS_KERNEL_VERTICAL_SLICE_READY`  
**Runtime certification:** tests may be `NOT_EXECUTED` until Three.js harness exists

| ID | Test | Pass criteria | Current result |
|---|---|---|---|
| **T01** | Component identifiable by ID | Lookup `CMP-FORD-SD-DOOR-FL-001` resolves entity + passport minimum | `PASS_SCHEMA` (instance present) |
| **T02** | Asset links to correct evidence | `GEO-00001.entity_id` matches; `EVL-00001` SUPPORTS_GEOMETRY → `SRC-ASSET-00031` | `PASS_SCHEMA` (link seeded CANDIDATE) |
| **T03** | Renderer displays asset in Three.js viewport | Mesh visible at expected transform | `NOT_EXECUTED` |
| **T04** | Isolate hides all other components | Only door entity remains visible | `NOT_EXECUTED` |
| **T05** | Remove moves door out of assembly frame | Mesh translates/rotates per interaction def | `NOT_EXECUTED` |

## Result vocabulary

```text
PASS_SCHEMA     — data structures satisfy the test without runtime
PASS_RUNTIME    — executed in Three.js harness
FAIL            — failed assertion
NOT_EXECUTED    — harness or mesh bytes not available
BLOCKED         — missing dependency (file, pivot, license)
```

## Notes

- T01/T02 can pass at schema level before GLB bytes land.
- T03–T05 remain `NOT_EXECUTED` until Team D binder + Team C separation deliver mesh.
- Do not mark slice COMPLETE until T03–T05 are `PASS_RUNTIME` or explicitly waived by owner decision.
