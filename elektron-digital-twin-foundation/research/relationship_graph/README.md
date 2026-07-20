# Relationship Graph (EGS-v1)

Non-kernel dependency graph for **component-instance** nodes and typed edges.

## Authoritative implementation (DT-D047)

| Artifact | Path |
|---|---|
| Proposal module | [`proposals/egs-v1/`](../../proposals/egs-v1/) |
| Proposal schema | `proposals/egs-v1/schema/relationship-edge.schema.json` |
| Graph + validation | `proposals/egs-v1/egs_v1/` |
| F-450 sample edges | `proposals/egs-v1/samples/f450_fl_door_edges_candidate_unverified.json` (`CANDIDATE_UNVERIFIED`) |
| Tests | `tests/egs_v1/` |

**Endpoints must be `CMPINST-*`**, never `AID-*` / `EDTS-COMP-*` asset aliases. Frozen kernel `schemas/assembly-relationship.schema.json` is untouched.

## Research history (DT-D046 / RL-015) — illustrative only

| Artifact | Path | Status |
|---|---|---|
| Standard notes | `EGS_v1_STANDARD.md` | Research vocabulary |
| Legacy research schema | `schemas/relationship-graph-edge.egs-v1.schema.json` | Superseded for implementation by proposal module |
| Edges `REL-00000N` | `edges/` | `ILLUSTRATIVE_ONLY` (EDTS-COMP nodes) |
| Register | `RELATIONSHIP_GRAPH_REGISTER.json` | Points at research edges |

Do **not** promote illustrative research edges or candidate proposal samples to `VERIFIED` without hashed OEM evidence.
