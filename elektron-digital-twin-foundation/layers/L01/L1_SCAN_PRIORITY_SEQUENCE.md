# L1 Scan Priority Sequence

**Status:** `DRAFT`  
**Gate:** Modeling still `L1_BLOCKED_BY_SOURCE_ACCESS` — this sequence only orders work **after** source baseline path opens  
**Principle:** Lock the exterior envelope before fine castings / underbody detail

```text
       ┌─────────────────────────────────────────────────────────┐
       │                 SCAN PRIORITY SEQUENCE                  │
       └────────────────────────────┬────────────────────────────┘
                                    │
      [Priority 1: Cab Exterior Shell & Major Panel Surfaces]
                                    │
      [Priority 2: Front Grille, Bumper, Lamps & Fender Flares]
                                    │
      [Priority 3: Wheel & Tire Silhouette]
                                    │
      [Priority 4: Rear Cab Wall]
                                    │
      [Priority 5: Frame Rails & Frame Ends]
                                    │
      [Priority 6: Major Visible Axle Envelope]
                                    │
      [Priority 7: Fine Castings & Underbody Details (Deferred)]
```

| Priority | Scope | Typical grade need | Notes |
|---|---|---|---|
| 1 | Cab exterior shell & major panel surfaces | A / B / C | Foundation visual twin |
| 2 | Front grille, bumper, lamps, fender flares | A / B / C | Wide-track flare critical |
| 3 | Wheel & tire silhouette | A / B | Stance / DRW packaging |
| 4 | Rear cab wall | A / B / C | Bare chassis visibility |
| 5 | Frame rails & frame ends | A / B | GRADE-B may omit cut rear sections |
| 6 | Major visible axle envelope | A / B | Not fine casting texture |
| 7 | Fine castings & underbody details | A (preferred) | **Deferred** — Dana S110 / knuckle micro-detail (`GAP-L1-004`) |

## Binding Rules

1. Do not start Priority 7 until Priorities 1–4 are accepted for the reference VIN grade.
2. GRADE-C units may contribute only to Priorities 1–2 and 4 (panel/material).
3. Scan work does not override claim verification — OEM extractions still required for dimensional lock.
