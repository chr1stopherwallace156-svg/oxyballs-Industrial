# F-450 Door FL — Vertical Slice Plan

**Entity:** `CMP-FORD-SD-DOOR-FL-001`  
**Config:** `CFG-F450-REG-2019`  
**Geometry candidate:** `GEO-00001` ← `ASSET-00031`  
**Status:** `EDTS_KERNEL_VERTICAL_SLICE_READY`

---

## Steps

### 1. Discovery
Locate the front-left door mesh region in **ASSET-00031** (Grade B Super Duty cab shell). Record keep/discard notes per `L1_ASSET_EVALUATION_ASSET-00031.md`.

### 2. Registration
Assign:
- Entity `CMP-FORD-SD-DOOR-FL-001` (alias from `CMP-SD-044-L`)
- Geometry asset `GEO-00001`
- Applicability `APP-00001`
- Assembly parent `ASM-FORD-SD-CAB-001` via `REL-00001`

### 3. Ingestion
Run **objective** checks when mesh bytes exist (do not invent counts):
- polygon / triangle count
- axis-aligned bounding box (mm)
- texture / material slot count

Until file present: `validation_status = NOT_EXECUTED`.

### 4. Integration
Import into Three.js with **provisional** pivot (`pivot_status = NOT_DEFINED` until calibrated). No invented hinge coordinates.

### 5. Validation
Execute acceptance tests 01–05 (`F450_DOOR_FL_ACCEPTANCE_TESTS.md`). Removal test requires isolatable + removable flags true and a defined offset or pivot — provisional offset allowed only as `PROTOTYPE`.

### 6. Documentation
Update `COMPONENT_PASSPORT_MINIMUM` status_summary after each gate.

---

## First evidence link (approved path)

| Field | Value |
|---|---|
| `evidence_link_id` | `EVL-00001` |
| `source_id` | `SRC-ASSET-00031` |
| `relationship` | `SUPPORTS_GEOMETRY` |
| `verification_status` | `CANDIDATE` |
| Rationale | Local candidate mesh is the only geometry-bearing source available without fabricating OEM pages |

**Deferred evidence (not first):** `SRC-BBAS-2019-SD` / `SRC-OEM-001` — create only as `AWAITING_FILE` stubs after EVL-00001 is registered; promote when PDF bytes + hash exist.
