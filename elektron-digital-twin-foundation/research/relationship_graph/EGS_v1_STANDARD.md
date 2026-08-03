# EDTS Relationship Graph Standard (EGS-v1)

**Status:** `IMPLEMENTATION_HANDOFF_READY` (schema package) — DT-D046  
**Schema:** `schemas/relationship-graph-edge.egs-v1.schema.json`  
**Frozen kernel:** `schemas/assembly-relationship.schema.json` remains **unchanged** (narrow predicates only).

## Purpose

Transform AID / CSP inventories from isolated parts into a queryable dependency network: **nodes** = components; **edges** = physical/logical connections.

Every edge must be:
1. Typed from the closed vocabulary below (no custom informal labels)
2. Bound to the locked vehicle silo (`VEH-000001` / `CFG-000001`)
3. Tied to documentation with honest `evidence_confidence` + `local_hash_status`

## Edge vocabulary

### Mechanical & Structural
| Type | Direction | Meaning |
|---|---|---|
| `BOLTED_TO` | directional | Threaded fasteners; torque metadata when known |
| `MOUNTED_TO` | directional | Tabs/brackets/welds/rivets (non-threaded) |
| `HINGES_ON` | directional | Pivots about rotational centerline of target |
| `SUPPORTS` | directional | Bears weight/load of target |
| `OVERLAPS` | bidirectional | Surface overlap; sequence-sensitive |
| `CONTAINS` | directional | Target inside source cavity |

### Electrical & Fluid
| Type | Direction | Meaning |
|---|---|---|
| `CONNECTED_TO` | directional | Power/data terminal interface |
| `ROUTES_THROUGH` | directional | Bundle/line through guide/hole/channel |
| `PASSES_BEHIND` | directional | Hidden relative to exterior view |

### Kinematic & Geometric
| Type | Direction | Meaning |
|---|---|---|
| `INTERFERES_WITH` | directional | Motion sweep can block/hit target |
| `SLIDES_ALONG` | directional | Linear travel along track/channel |

### Procedural
| Type | Direction | Meaning |
|---|---|---|
| `BLOCKS_REMOVAL_OF` | directional | Source must be cleared before target extraction |

## Honesty gate

- Narrative `VERIFIED_EVIDENCE` citing `EDTS-OEM-003/004` while those SRC-CAND records are `NOT_ACQUIRED` → demote to `ILLUSTRATIVE_ONLY` / `RESEARCH_CLAIM`.
- Generated removal sequences from illustrative edges are **not** workshop-validated procedures.
- Missing `PASSES_BEHIND` / `ROUTES_THROUGH` edges risk damaging harnesses — do not execute physical teardown from ILLUSTRATIVE graphs alone.
