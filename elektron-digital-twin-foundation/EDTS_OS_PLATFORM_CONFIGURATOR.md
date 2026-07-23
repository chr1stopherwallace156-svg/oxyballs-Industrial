# EDTS-OS Platform Configurator

**Status:** `ACTIVE_ROADMAP`  
**Architecture:** EDTS-OS v3 (Hard Rule 0 — Component First)

Vehicles are **assemblies**, not monoliths. Importing a new platform means wiring reusable component passports plus configuration-unique parts.

```text
                  [ EDTS-OS PLATFORM CONFIGURATOR ]
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  [ 2019 Ford F-450 ]      [ 2021 Ford E-450 ]      [ Ford Transit Van ]
  - Inherits: Cab doors    - Inherits: HD wheels   - Inherits: hinge logic
  - Inherits: Axle class   - Inherits: Dana M300   - Inherits: PBR rubber
  - Unique: 145.3 WB CC    - Unique: E-Series cab  - Unique: unibody shell
```

---

## Platform rows (planning)

### 2019 Ford F-450 Chassis Cab (active seed)

| Role | Component / config |
|---|---|
| Configuration | `configurations/VEH_CFG_F450_2019_REG_CAB_145_3.json` |
| Door (L) | `components/CMP_PASS_FR_DOOR_L.json` (`CMP-SD-044-L`) |
| Frame (unique length) | `CMP-FR-145` — passport stub / placeholder |
| Rear axle class | `CMP-AXL-M300` — discovery lane (Team B) |

### 2021 Ford E-450 (future assembly)

**Reuse targets (not yet passport-verified):**

- 19.5 in heavy-duty wheel/tire material templates  
- EPDM rubber PBR materials  
- Dana M300-class rear DRW assembly patterns from F-450 pipeline  

**Unique:** E-Series cab shell; frame-rail length / CA packaging.

Effort characterization: **adaptation-dominant** (unique cab + frame length) vs full rebuild — do not cite calendar percentages as engineering fact until measured against actual passport reuse counts.

### Ford Transit Van (future assembly)

**Reuse targets:**

- Door hinge interaction templates (`ACTIVATE_HINGE_ROTATE` family)  
- Primer / glass / rubber PBR profiles  
- Vehicle-to-assembly interaction routines in React/Three.js  

**Unique:** Unibody shell geometry and packaging.

---

## Configurator rules

1. A vehicle config may only reference `component_id` + version pins.  
2. Dimensional truth lives on Evidence Graph parameter nodes, not in the vehicle JSON.  
3. Cross-platform inherit edges require `CONFIGURATION_MATCHED` or higher on shared interfaces.  
4. Geometry freeze remains blocked until dimensional claims reach required lifecycle stages.
