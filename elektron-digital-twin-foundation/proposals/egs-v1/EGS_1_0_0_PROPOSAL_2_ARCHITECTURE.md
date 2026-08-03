# EGS-1.0.0-proposal.2 — Architecture Design Package

**Status:** `EGS_V1_PROPOSAL_INFRASTRUCTURE_READY`  
**Decision:** `DT-D048`  
**Kernel policy:** Frozen `schemas/assembly-relationship.schema.json` **untouched**

## Multi-level hierarchy

```
COMPDEF-*     Conceptual definition (reusable)
    │
CFGCOMP-*     Exact configuration reference node  ← research/reference edges
    │
CMPINST-*     VIN-registered physical asset instance
```

Reference-graph edges connect **CFGCOMP- / IFACE- / OP-** nodes. They do **not** use `AID-*` or VIN `CMPINST-*` as primary endpoints.

## Interface layer

Component-to-component electrical/mechanical jumps are modeled via intermediate entities:

- `IFACE-CONNECTOR-*`
- `IFACE-GROMMET-*`
- `IFACE-MOUNT-HOLE-*`
- `IFACE-FLANGE-*`
- `IFACE-SERVICE-PORT-*`

Example: Harness → `IFACE-CONNECTOR-…-C309A` —`MATES_WITH`→ `IFACE-CONNECTOR-…-C309B` ← Regulator

## Graph planes

| Plane | Purpose | Example classes |
|---|---|---|
| PHYSICAL | Topology / mating / mounts | `BOLTED_TO`, `MATES_WITH`, `GUIDES_MOTION_OF` |
| FUNCTIONAL | Signal / data paths | `TRANSMITS_LIN_DATA_TO` |
| PROCEDURAL | Service ordering | `MUST_PRECEDE`, `ACCESSIBLE_WHEN` |

Transient states (`window_position`, battery disconnect) belong on procedural / access edges only — never on permanent structural edges.

## Exact-vehicle scope lock

`CONFIGURATION_REFERENCE` edges require a single `configuration_id` + `model_year` and forbid `model_year_range`. Cross-year similarity is confined to:

- `CROSS_CONFIGURATION_COMPARISON`
- `SOURCE_APPLICABILITY_CANDIDATE`
- `inheritance: NOT_INHERITED`

## Evidence lifecycle

```
SOURCE_DISCOVERED → SOURCE_ACQUIRED → SOURCE_APPLICABILITY_CONFIRMED
  → ASSERTION_EXTRACTED → ASSERTION_VERIFIED
```

Unread manual index = `SOURCE_DISCOVERED` only. Edge status aggregates from claims (`VERIFIED`, `PARTIALLY_VERIFIED`, `CANDIDATE_UNVERIFIED`, …). Missing optional torque/fastener claims create knowledge gaps without invalidating existence-only structural edges.

## Cycle handling

Traversal reports `HARD_CYCLE` | `CONDITIONAL_CYCLE` | `STATE_DEPENDENT_CYCLE` | `ALTERNATE_PATH_REQUIRED`. Cycles are **never** silently auto-resolved.

## F-450 sample lock

`samples/f450_fl_door_edges_candidate_unverified.json` (REL-REG-01..06): all `CANDIDATE_UNVERIFIED` + `PROCEDURE_GENERATION_NOT_AUTHORIZED` / `REAL_DATA_PROMOTION_BLOCKED` until primary WSM/EWD bytes are acquired and parsed.
