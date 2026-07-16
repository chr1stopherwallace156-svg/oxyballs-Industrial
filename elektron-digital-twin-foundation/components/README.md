# Component Passports (EDTS-OS Hard Rule 0)

Independent, reusable component registries. Vehicles do not own these files; vehicle configurations **point** to them.

**Next build priority (Hard Rule 11):** deepen the exact-vehicle door passport before chasing OEM part numbers alone. Frozen kernel schemas stay closed (DT-D028).

## Exact-vehicle instance passport (authoritative for VEH-000001)

| Passport | Component instance | Path | Status |
|---|---|---|---|
| `PP-VEH000001-DOOR-FL-001` | `CMPINST-VEH000001-DOOR-FL` | [`../examples/2019_f450/door-fl-component-passport.example.json`](../examples/2019_f450/door-fl-component-passport.example.json) | Exact instance exists; candidates discovered; **no usable geometry / no verified procedure** linked |

Active schema remains frozen `schemas/component-passport.schema.json` (rc1).  
v1.1 (proposal only): [`../proposals/COMPONENT_PASSPORT_V1_1_EXTENSION_PROPOSAL.md`](../proposals/COMPONENT_PASSPORT_V1_1_EXTENSION_PROPOSAL.md)  
Illustrative instances: [`../proposals/examples/`](../proposals/examples/) — never beside `examples/2019_f450/`.  
Change control: [`../decisions/DT-D030_COMPONENT_PASSPORT_V1_1_PROPOSAL_ONLY.json`](../decisions/DT-D030_COMPONENT_PASSPORT_V1_1_PROPOSAL_ONLY.json), [`../decisions/DT-D031_COMPONENT_PASSPORT_RC1_SUFFICIENT.json`](../decisions/DT-D031_COMPONENT_PASSPORT_RC1_SUFFICIENT.json).

Deepen links only after ACQUIRED→HASHED→PARSED→INVENTORIED→ROLE_EVALUATED. Do not invent mesh hashes, hinge coordinates, removal graphs, or numeric quality scores.

## Legacy / family draft passports

| Component ID | Passport | Status |
|---|---|---|
| `CMP-SD-044-L` | [CMP_PASS_FR_DOOR_L.json](CMP_PASS_FR_DOOR_L.json) | `DRAFT_CANDIDATE` — **non-isolated**; superseded for kernel work by `PP-VEH000001-DOOR-FL-001` |
| `CMP-SD-FRAME-001` | [CMP_SD_FRAME_001.json](CMP_SD_FRAME_001.json) | `DRAFT_CANDIDATE` (canonical frame family) |
| `CMP-AXL-M300` | [CMP_AXL_M300.json](CMP_AXL_M300.json) | `DRAFT_CANDIDATE` (Team B discovery) |
| `CMP-FR-145` | [CMP_FR_145.json](CMP_FR_145.json) | **DEPRECATED** → `CMP-SD-FRAME-001` |

Identity registry: [`../registries/COMPONENT_IDENTITY_REGISTRY.json`](../registries/COMPONENT_IDENTITY_REGISTRY.json)  
Passport schema: [`../schemas/component-passport.schema.json`](../schemas/component-passport.schema.json)  
Master platform schema: [`../schemas/edts-os-platform-master.schema.json`](../schemas/edts-os-platform-master.schema.json)

**Rules**

1. Allocate `component_id` in the identity registry **before** creating a passport.  
2. Never mark `FROZEN` / `PRODUCTION_APPROVED` without lifecycle completion + owner gate.  
3. Geometry fields null/`NOT_STARTED` beat invented coordinates.  
4. Link dimensional claims to Evidence Graph parameter IDs; pin versions to evidence.  
5. Cross-platform compatibility lists are candidates until `CONFIGURATION_MATCHED`.  
6. Configuration-unique length/CA → **variant pins**, not new component families.
7. Exact-vehicle instance passports (`PP-VEH…`) bind to `VEH-` + `CFG-` + `CMPINST-`; family drafts must not auto-inherit into the silo (HR-EVI).
