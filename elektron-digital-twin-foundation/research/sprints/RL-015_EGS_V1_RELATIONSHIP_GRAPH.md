# RL-015 — EGS-v1 Relationship Graph Standard

**Date:** 2026-07-19  
**Decision:** `DT-D046`  
**Recommended decision:** `IMPLEMENTATION_HANDOFF_READY` (schema package only)

## Honesty gate

| Operator claim | Project posture |
|---|---|
| Edge `VERIFIED_EVIDENCE` via EDTS-OEM-003/004 | **Demoted** — SRC-CAND-000002/000006 `NOT_ACQUIRED` |
| Procedural removal sequence “verified” | **ILLUSTRATIVE_ONLY** / `NOT_EXECUTED` |
| Evidence matrix Geometry/Materials/Torque VERIFIED | **Demoted** to DOCUMENT_HUNT / OEM_CLAIMED / UNKNOWN |
| REL-REG suite “CONFIGURATION_EVALUATED baseline” | **ILLUSTRATIVE_ONLY** — not silo removal truth |
| IMPLEMENTATION_HANDOFF_READY | **Accepted for schema handoff** — not verified edge automation |

## Delivered

| Artifact | Path |
|---|---|
| EGS-v1 standard | `research/relationship_graph/EGS_v1_STANDARD.md` |
| Edge schema | `schemas/relationship-graph-edge.egs-v1.schema.json` |
| Edges REL-000001..000007 | `research/relationship_graph/edges/` |
| Illustrative removal sequence | `research/relationship_graph/FL_REGULATOR_REMOVAL_SEQUENCE_ILLUSTRATIVE.json` |
| MISN-000002 | Dashboard edge mapping (secondary) |
| KG-004 | Hinge shim interfaces |

## Handoff

Migration pipeline may begin linking CSP/AID nodes with EGS-v1 edge records.  
**Do not** promote illustrative edges to `VERIFIED_EVIDENCE` or drive physical teardown without hashed OEM pages.

## Parallel priority

`MISN-000001` (EWD / KG-001) remains the critical open acquisition mission.
