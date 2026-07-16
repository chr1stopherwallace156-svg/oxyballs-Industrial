# F-450 Door FL Acceptance Tests V2

**Kernel:** `1.0.0-rc1`  
**Subject:** `CMPINST-VEH000001-DOOR-FL` on `VEH-000001` / `CFG-000001`  
**Automated:** `verification/isolation/run_isolation_tests.py`

| ID | Test | Pass criteria | Result |
|---|---|---|---|
| **Test 01 (Isolation)** | Search/bind `VEH-000001` | Returns `CMPINST-VEH000001-DOOR-FL` without leakage from other vehicle IDs | `PASS_SCHEMA` (automated) |
| **Test 02 (Integrity)** | `model_year` integrity | Instance vehicle record `model_year` is strictly `2019` | `PASS_SCHEMA` (automated) |
| **Test 03 (Visualization)** | Three.js transform | Viewport handles transform matrix of `CMPINST-VEH000001-DOOR-FL` without reference to external cab models | `NOT_EXECUTED` |
| **Test 04 (Interaction)** | Removal preview | `removal_preview` / visual preview triggers without asserting a verified service procedure | `PASS_SCHEMA` for flags; runtime `NOT_EXECUTED` |
| **Test 05 (Fingerprint)** | CFG fingerprint | `configuration_fingerprint` matches SHA-256 of published canonical string | `PASS_SCHEMA` (automated) |

## Vocabulary

```text
PASS_SCHEMA   — structure satisfies the check without runtime
NOT_EXECUTED  — renderer/harness not run; do not claim runtime pass
```
