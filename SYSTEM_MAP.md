# SYSTEM MAP

One-page end-to-end data flow with **explicit boundaries, authorities, and gates**.

This is a navigation map, not a claim that every box is production-complete. For honesty of maturity, see [`CURRENT_STATE.md`](CURRENT_STATE.md).

---

## End-to-end flow

```text
+------------------+     +--------------------+     +---------------------+
|   Capture iOS    | --> | Evidence path      | --> |    EDTS Kernel      |
|  (Mobile App)    |     | (EAE / XREPO)      |     | (Vehicle Truth)     |
+------------------+     +--------------------+     +---------------------+
  Input: Sensors/Photos    Input: Raw packages      Input: Verified pkg /
  Output: Signed pkg       Output: Digests /          config candidates
  Auth: Device / ARKit       quarantine / reject      Auth: EDTS schema /
  Gate: Device build +     Auth: Parser / hash        layer register
        layout verify      Gate: Digest + layout      Gate: Layer / geometry
                                                      acceptance (when due)
           │
           ▼
+------------------+     +--------------------+
|  Build Engine    | --> | Visible Progress   |
| (Compatibility)  |     |  (3D / Twin UI)    |
+------------------+     +--------------------+
  Input: EDTS / locked     Input: Derived /
         platform claims          provisional twin
  Output: Draft BOM /      Output: Visual render
          blockers         Auth: Provisional only
  Auth: Engine rules       Gate: Real engineering
  Gate: Data openness /           GLB / mesh absent
        DRAFT_INCOMPLETE          today — demo only
```

---

## Authority boundaries (do not collapse)

| Subsystem | May claim | Must not claim |
|---|---|---|
| **Capture** | Device-observed evidence, digests, session identity | Engineering twin complete; OEM geometry truth |
| **EAE / XREPO** | Package parse, hash match, quarantine | Vehicle configuration approval |
| **EDTS** | Layer-gated configuration / twin documentation | Phone LiDAR as CMM-grade metrology |
| **Build Engine** | Deterministic blockers + draft BOM from locked inputs | Procurement / fabrication / energization authority |
| **Visible Progress** | Provisional visualization | Engineering digital twin |

---

## Evidence → truth doctrine (short)

1. **Photos + SHA-256** are immutable condition evidence (high authority for *presence / condition*, not for micron geometry).  
2. **Phone LiDAR / ARKit** are provisional spatial layout tools (~±10 mm class — visual / envelope).  
3. **Manual metrology** (caliper / tape) overrides LiDAR for critical dimensions when recorded.  
4. **OEM / supplier docs** are the authoritative baseline for factory patterns.  

Full pilot staging: [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md).

---

## Where the code / artifacts live

| Box | Industrial path |
|---|---|
| Capture delivery | `transfer/capture-ios-mac-handoff/`, root `DOWNLOAD-elektron-capture-ios-*.zip` |
| EDTS foundation | `elektron-digital-twin-foundation/` |
| Build Engine | `engine/` + `docs/` governance |
| Visible Progress | `edts-visible-progress/` |
| VIN candidates | `edts-vin-resolver/` |
| Local runtime / EDE | `scripts/`, `*.command`, `docs/runbooks/` |

---

## Related deeper maps

- Phase 3 spatial charter (docs only; coding gated): `Docs/Architecture/PHASE_3_SPATIAL_PLATFORM_ARCHITECTURE.md`  
- Engineering Constitution: `docs/ENGINEERING_CONSTITUTION.md`  
- Structure freeze: `docs/STRUCTURE_FREEZE.md`
