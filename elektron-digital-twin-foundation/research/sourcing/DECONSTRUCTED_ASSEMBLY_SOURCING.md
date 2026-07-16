# EDTS Global Component-Sourcing Model

**Status:** `ACTIVE` (DT-D043)  
**Locked silo:** `VEH-000001` / `CFG-000001` — 2019 F-450 Chassis Cab Regular Cab 4x2 DRW 145.3 WB / 60 CA

## Thesis

No single marketplace 3D model can represent a true physical vehicle.  
EDTS builds the twin via a **Deconstructed Assembly Sourcing Strategy**: the absolute best-documented representation for each unique sub-system, admitted individually under HR-EVI + Hard Rule 4.

```text
       [EDTS Assembly Orchestrator]
                    │
   ┌────────────────┼────────────────┬──────────────┐
   ▼                ▼                ▼              ▼
[Dana M300]   [FL Alum Door]   [TRW Steering]  [Bosch ABS]  ...
 (axle hub)    (skin passport)  (linkage hub)  (module hub)
```

## What this is not

- Not “collect the best complete F-450 mesh and inherit it”
- Not automatic promotion of supplier CAD into silo GEO
- Not a revival of rejected DT-D027 shortlist packs

## Orchestration rule

1. Discover at **assembly hub** level (rear axle, FL door, steering, …).  
2. Prefer **Tier-1 supplier** documentation/CAD when it beats OEM consumer manuals (Hard Rule 17).  
3. Catalog every find as an **AID** passport.  
4. Purchase only after **AJR** clearance.  
5. Admit components individually after Hard Rule 4 — never as a monolithic vehicle package.
