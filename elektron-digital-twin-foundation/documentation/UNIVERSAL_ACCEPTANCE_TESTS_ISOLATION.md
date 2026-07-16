# Universal Acceptance Tests — Exact Vehicle Isolation

**Law:** HR-EVI  
**Seed dataset under test:** `examples/ford/2019_f450_regularcab_4x2_drw/`  
**Automated suite:** `verification/isolation/run_isolation_tests.py`

| ID | Test | Result mode |
|---|---|---|
| AT-01 | Kernel schemas Draft 2020-12 + universal (no OEM literals) | Automated |
| AT-02 | Component instance binds exact vehicle + config only | Automated |
| AT-03 | No `model_year_range` / cross-year tokens on instance | Automated |
| AT-04 | Interaction is `PROTOTYPE` or `VISUAL_PREVIEW_ONLY` | Automated |
| AT-05 | Evidence links empty or real in-repo source IDs only | Automated |
| AT-06 | Negative year-range fixture not present under `examples/` | Automated |
| AT-07 | Foreign OEM vehicle IDs absent from Ford dataset | Automated |
| AT-08 | Renderer displays mesh | `NOT_EXECUTED` until bytes + harness |
| AT-09 | Isolate / visual removal preview | `NOT_EXECUTED` |
| AT-10 | Scaffold OEM folders exist without inheriting Ford data | Manual / path check |

Runtime tests AT-08/AT-09 must remain `NOT_EXECUTED` until executed — do not claim pass.
