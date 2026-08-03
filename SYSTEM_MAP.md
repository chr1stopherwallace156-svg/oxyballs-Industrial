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
  Output: Sealed, hash-    Output: Digests /          config candidates
           bound evidence    quarantine / reject      Auth: EDTS schema /
           packages          Auth: Parser / hash        layer register
  Observation source:      Gate: Digest + layout      Gate: Layer / geometry
    device sensors           + package closure          acceptance (when due)
  Validation authority:
    schema, package
    closure, artifact
    hashes
  Gate: Device build +
        layout verify
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
| **Capture** | Device-observed evidence, digests, session identity | Cryptographic signature / attestation / non-repudiation; engineering twin complete; OEM geometry truth |
| **EAE / XREPO** | Package parse, hash match, quarantine | Vehicle configuration approval |
| **EDTS** | Layer-gated configuration / twin documentation | Phone LiDAR as CMM-grade metrology |
| **Build Engine** | Deterministic blockers + draft BOM from locked inputs | Procurement / fabrication / energization authority |
| **Visible Progress** | Provisional visualization | Engineering digital twin |

---

## Evidence → truth doctrine (short)

1. **Guided photography** is strong evidence for *presence / condition* when sealed in a hash-bound package and held under custody controls.  
2. **SHA-256** verifies **content identity** of bytes. It does **not** by itself enforce immutability — immutability is a property of repository and custody controls (no silent overwrite, append-only ledgers, quarantine).  
3. **Phone LiDAR / ARKit** spatial outputs are classified:  
   `PROVISIONAL_SPATIAL_EVIDENCE` · `NO_SYSTEM_TOLERANCE_ASSIGNED` · `PENDING_CHARACTERIZATION`  
   Do **not** publish a universal millimetre tolerance for phone LiDAR.  
4. **Manual metrology** becomes engineering evidence **only** when recorded with: instrument, datum, method, units, calibration status, operator, and uncertainty.  
5. **Discrepancies** (LiDAR / manual / OEM) are resolved by applicability, vehicle specificity, instrument suitability, and uncertainty — **preserve every observation**; never silently overwrite one with another.  
6. **OEM / supplier docs** remain an authoritative *baseline class* when applicability to the exact vehicle is established.

Full pilot staging: [`Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md`](Docs/Architecture/VEHICLE_001_REFERENCE_PILOT.md).

---

## Where the code / artifacts live

| Box | Industrial path |
|---|---|
| Capture delivery | `transfer/capture-ios-mac-handoff/`, root versioned `DOWNLOAD-elektron-capture-ios-*.zip` (+ `.sha256`) |
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
