# F-450 Door FL Acceptance Tests V2

**Subject:** `CMPINST-VEH000001-DOOR-FL` on `VEH-000001` / `CFG-000001`  
**Supersedes:** `kernel/F450_DOOR_FL_ACCEPTANCE_TESTS.md`

| ID | Test | Pass criteria | Result |
|---|---|---|---|
| T01 | Identified by exact instance ID | `CMPINST-VEH000001-DOOR-FL` resolves; refs `VEH-000001` and `CFG-000001` | `PASS_SCHEMA` |
| T02 | No illegal applicability fields | No `model_year_range`; no other years/models/cabs on instance | `PASS_SCHEMA` |
| T03 | Geometry record honest | `validation_status` is `NOT_EXECUTED` until bytes exist; metrics null | `PASS_SCHEMA` |
| T04 | Interaction class correct | `PROTOTYPE` or `VISUAL_PREVIEW_ONLY`; disassembly `NOT_VERIFIED` | `PASS_SCHEMA` |
| T05 | Renderer displays asset | Mesh visible in Three.js | `NOT_EXECUTED` |
| T06 | Isolate hides others | Isolate toggle works | `NOT_EXECUTED` |
| T07 | Visual removal preview | Preview move only — **not** engineering-verified disassembly | `NOT_EXECUTED` |

## Vocabulary

```text
PASS_SCHEMA   — instance/schema structure satisfies the check
NOT_EXECUTED  — runtime/mesh not available; do not claim pass
FAIL          — assertion failed
```

No test in this document is claimed as runtime-executed.
