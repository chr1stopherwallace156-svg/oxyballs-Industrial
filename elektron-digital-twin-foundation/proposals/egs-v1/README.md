# EGS Proposal Module

**Schema version:** `EGS-1.0.0-proposal.2`  
**Decision:** `DT-D048`  
**Recommended decision:** `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`

Authoritative **implementation home** for the EDTS Relationship Graph Standard proposal. Does **not** modify frozen EDTS Kernel schemas.

See [`EGS_1_0_0_PROPOSAL_2_ARCHITECTURE.md`](EGS_1_0_0_PROPOSAL_2_ARCHITECTURE.md) for hierarchy, interface layer, planes, lifecycle, and cycle policy.

## Package layout

| Path | Role |
|---|---|
| `schema/relationship-edge.schema.json` | Proposal.2 JSON Schema |
| `egs_v1/` | Hierarchy, planes, lifecycle aggregation, validation, graph queries |
| `fixtures/` | Synthetic `CFGCOMP-SYN-*` / `IFACE-*` / `OP-*` fixtures |
| `samples/f450_fl_door_edges_candidate_unverified.json` | REL-REG-01..06 audit edges — `REAL_DATA_PROMOTION_BLOCKED` |

## Constraints (enforced)

1. Reference edges use **CFGCOMP-/IFACE-/OP-**, not `AID-*` / VIN `CMPINST-*`
2. Explicit **IFACE-*** intermediate nodes for connectors/mounts
3. **PHYSICAL / FUNCTIONAL / PROCEDURAL** plane isolation; no transient state on structural edges
4. Structural classes require only `relationship_existence`; missing torque/fasteners → knowledge gaps
5. Deterministic claim → edge_status aggregation; unread index ≠ verified
6. Cycle kinds reported; never auto-resolved
7. F-450 samples locked `CANDIDATE_UNVERIFIED` + `PROCEDURE_GENERATION_NOT_AUTHORIZED`

## Tests

```bash
python3 -m pytest tests/egs_v1 -q
```
