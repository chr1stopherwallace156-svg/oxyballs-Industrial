# Relationship Graph (EGS)

Non-kernel dependency graph with multi-level hierarchy, interface entities, and isolated graph planes.

## Authoritative implementation (DT-D048)

| Artifact | Path |
|---|---|
| Proposal module | [`proposals/egs-v1/`](../../proposals/egs-v1/) |
| Architecture | `proposals/egs-v1/EGS_1_0_0_PROPOSAL_2_ARCHITECTURE.md` |
| Schema | `EGS-1.0.0-proposal.2` |
| F-450 REL-REG audit | `proposals/egs-v1/samples/f450_fl_door_edges_candidate_unverified.json` |
| Status | `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY` / edges `REAL_DATA_PROMOTION_BLOCKED` |

**Reference edges use `CFGCOMP-` / `IFACE-` / `OP-`**, not `AID-*` or VIN `CMPINST-*`. Frozen kernel `schemas/assembly-relationship.schema.json` is untouched.

## Research history

| Artifact | Status |
|---|---|
| DT-D046 illustrative `REL-00000N` (EDTS-COMP) | ILLUSTRATIVE history |
| DT-D047 CMPINST-first proposal.1 | Superseded by proposal.2 hierarchy |
| Legacy `schemas/relationship-graph-edge.egs-v1.schema.json` | Superseded for implementation |

Do **not** promote candidate edges or generate procedures without hashed OEM assertions.
