# Component Passports (EDTS-OS Hard Rule 0)

Independent, reusable component registries. Vehicles do not own these files; vehicle configurations **point** to them.

| Component ID | Passport | Status |
|---|---|---|
| `CMP-SD-044-L` | [CMP_PASS_FR_DOOR_L.json](CMP_PASS_FR_DOOR_L.json) | `DRAFT_CANDIDATE` |
| `CMP-AXL-M300` | [CMP_AXL_M300.json](CMP_AXL_M300.json) | `DRAFT_CANDIDATE` (Team B discovery) |
| `CMP-FR-145` | [CMP_FR_145.json](CMP_FR_145.json) | `DRAFT_CANDIDATE` (placeholder frame) |

Schema: [`../schemas/component-passport.schema.json`](../schemas/component-passport.schema.json)

**Rules**

1. Never mark `FROZEN` / `PRODUCTION_APPROVED` without lifecycle completion + owner gate.  
2. Geometry fields null/`NOT_STARTED` beat invented coordinates.  
3. Link dimensional claims to Evidence Graph parameter IDs.  
4. Cross-platform compatibility lists are candidates until `CONFIGURATION_MATCHED`.
