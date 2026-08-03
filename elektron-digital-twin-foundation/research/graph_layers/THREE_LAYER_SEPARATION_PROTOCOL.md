# Three-Layer Knowledge Graph Separation Protocol

**Decision:** `DT-D056` · **Status:** `ACTIVE` · **Sprint:** `RL-025`  
**Does not mutate frozen EDTS Kernel schemas.**

## Principle

Mixing observational truth with analytical derivation and design intent destroys digital-twin integrity. Layer 2/3 must **never inherit into** Layer 1.

```
LAYER 1  VEHICLE ENGINEERING TRUTH     ← OEM facts + explicit UNKNOWN
         (read-only to lower layers)
              │
LAYER 2  ENGINEERING ANALYSIS          ← estimates, FEA, load cases
              │
LAYER 3  ENGINEERING DECISIONS         ← proposals, placements, routing
```

## Layer rules

| Layer | May contain | Must not contain |
|---|---|---|
| **L1 Truth** | Token-anchored OEM assertions; explicit `UNKNOWN` / `NOT_ACQUIRED`; exact-config applicability | Estimates, confidence %, design intent, “MUST_REMOVE”, packaging boxes, FEA results |
| **L2 Analysis** | Derived metrics citing L1 inputs; `CALCULATED_ESTIMATE` / `SIMULATION_REQUIRED` | Promotion of estimates into L1; invented OEM specs |
| **L3 Decisions** | Conversion proposals, constraints, risks | Claims that L3 choices are OEM truth |

## Relationship to existing EDTS planes

| This protocol | Existing EGS planes | Notes |
|---|---|---|
| L1 Truth | Feeds PHYSICAL/FUNCTIONAL facts | Not the same as EGS plane enum |
| L2 Analysis | Outside structural edge promotion | Analysis nodes are non-kernel |
| L3 Decisions | May later spawn PROCEDURAL candidates | Procedures still `NOT_AUTHORIZED` until evidence |

## Hard Rule 5 reminder

Engineering confidence **% is not truth**. L2 may record a hunt/estimate index; it must never appear on L1 nodes as verification.

## ID conventions

| Layer | Prefix | Example |
|---|---|---|
| L1 | `CFGCOMP-…` / `IFACE-…` / truth properties | radiator existence UNKNOWN dims |
| L2 | `ANL-…` | `ANL-2019-F450-FORWARD-BAY-ENVELOPE` |
| L3 | `PROP-…` | `PROP-2019-F450-EV-CONV-BATTERY-AFT` |

## Enforcement

1. L1 property promotion requires `ASSERTION_EXTRACTED` or stronger with source IDs — else `UNKNOWN`.
2. L2/L3 nodes must cite L1 inputs by ID; they cannot write back into L1.
3. MEPQ items close L1 UNKNOWNs (or L2 inputs that require OEM loads) — they do not authorize L3 execution alone.
