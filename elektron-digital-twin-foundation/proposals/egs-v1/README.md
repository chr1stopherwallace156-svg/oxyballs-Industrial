# EGS-v1 Proposal Module

**Status:** `PROPOSAL` (non-kernel)  
**Decision:** `DT-D047`  
**Schema version:** `egs-v1.0.0-proposal`

Authoritative **implementation home** for the EDTS Relationship Graph Standard (EGS-v1). Does **not** modify frozen EDTS Kernel schemas (`schemas/assembly-relationship.schema.json` and other kernel freeze artifacts remain untouched).

## What this package provides

| Path | Role |
|---|---|
| `schema/relationship-edge.schema.json` | Proposal JSON Schema for typed edges |
| `egs_v1/` | Validation + in-memory graph queries |
| `fixtures/` | Synthetic `CMPINST-SYN-*` components/edges for tests |
| `samples/f450_fl_door_edges_candidate_unverified.json` | F-450 FL door sample edges — all `CANDIDATE_UNVERIFIED` |

## Hard constraints

1. **Endpoints are component-instance IDs only** (`CMPINST-*`). Validators reject `AID-*`, `EDTS-COMP-*`, and `ASSET-*`.
2. **Typed relationship classes** with closed membership (`MECHANICAL_STRUCTURAL`, `ELECTRICAL_FLUID`, `KINEMATIC_GEOMETRIC`, `PROCEDURAL`).
3. **Per-property evidence links** required; `relationship_existence` is mandatory. Populated torque / fastener / connector / removal fields require `evidence_status=BOUND`.
4. **Applicability** (`scope`, cab, options) and **lifecycle_status** on every edge.
5. **F-450 sample edges** stay `CANDIDATE_UNVERIFIED` with `engineering_properties: null` until primary hashed evidence exists. Draft subcomponent `CMPINST-*` IDs (except `CMPINST-VEH000001-DOOR-FL`) are research placeholders.
6. Research tree edges under `research/relationship_graph/edges/` (AID/`EDTS-COMP` nodes, illustrative torque claims) are **superseded for implementation** by this module — retain as historical ILLUSTRATIVE research only.

## Graph queries

`RelationshipGraph` supports:

- `direct_neighbors`
- `dependency_traversal` (outbound BFS)
- `impacted_component_traversal` (inbound BFS)
- `find_cycles`
- `topological_order`
- `removal_precedence_candidates` (`BLOCKS_REMOVAL_OF` inbound)

## Tests

From repo root (`elektron-digital-twin-foundation/`):

```bash
python3 -m pytest tests/egs_v1 -q
```

## Relation to research handoff (DT-D046 / RL-015)

DT-D046 delivered the research schema handoff and illustrative `REL-00000N` edges. DT-D047 promotes the **executable proposal module** here: CMPINST-only endpoints, validation rules, synthetic fixtures, and graph query API — without promoting any F-450 engineering specs to verified truth.
