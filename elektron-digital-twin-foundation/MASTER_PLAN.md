# MASTER_PLAN.md

End-to-end plan for the Elektron digital twin from reference lock through spatial presentation.

## Vision

A single, gate-governed 3D reference that Elektron engineers, fabricators, and fleet customers can trust for conversion planning — grounded in a locked real-world vehicle, not a generic truck model.

## Phases

| Phase | Layers | Outcome |
|-------|--------|---------|
| 1 — Lock | L00 | Canonical vehicle defined and approved |
| 2 — Vehicle truth | L01–L03 | Exterior, chassis, OEM mechanical modeled |
| 3 — Conversion mechanics | L04–L07 | Disassembly, EV install, wiring, cooling |
| 4 — Operations | L08–L09 | Evidence workflow, diagnostic hooks |
| 5 — Delivery | L10 | Customer/engineering presentation |

## Milestone map

```
M0  Foundation docs (this repo)     ← current
M1  L00 owner approval
M2  L01–L02 envelope + chassis
M3  L03 OEM mechanical
M4  L04 disassembly graph
M5  L05–L07 EV stack
M6  L08–L09 workflow + diagnostics
M7  L10 presentation + LOD
```

## Dependencies on Build Engine

- Super Duty BBLB acquisition (parallel track on docs branch)
- Cooling / powertrain supplier decisions (inform L06–L07 placeholders)
- Measurement doctrine (rev07 module 10 when ingested)

## Success metrics

- One locked reference vehicle with full provenance chain
- Tier A dimensions verified for all conversion interfaces
- Interactive disassembly through OEM removal (L04)
- EV components installable in twin with documented clearances (L05–L07)
- Presentation modes operational (L10)

## Risks

| Risk | Mitigation |
|------|------------|
| No physical donor | Proceed OEM-only for L01–L02; defer Tier A to scan when available |
| BBAS access delay | Use published dimension tables; file DT-B003 |
| Scope creep (multi-vehicle) | Variants documented but not locked until v1 complete |
| License violation | DT-D003 — no OEM CAD in repo |

## Current focus

**L00 Reference Lock** — complete owner approval and gate records, then advance to L01 Exterior.
