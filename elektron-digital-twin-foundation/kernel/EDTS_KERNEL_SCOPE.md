# EDTS Kernel Scope — Minimum Viable Kernel

**Status:** `SUPERSEDED` by exact-vehicle isolation revision  
**Successor:** [documentation/EXACT_VEHICLE_ISOLATION_STANDARD.md](../documentation/EXACT_VEHICLE_ISOLATION_STANDARD.md)  
**Canonical door:** `CMPINST-VEH000001-DOOR-FL` on `VEH-000001` / `CFG-000001`  
**Examples:** [examples/2019_f450/](../examples/2019_f450/)

This document retained for audit. Prior `model_year_range` applicability is **prohibited**.

---

## Mission

The EDTS Kernel is the **minimal foundation** required to track a component from discovery → evidence → geometry → assembly → interaction. It hardens data structures through rigorous engineering validation on one real part — not speculative platform sprawl.

```text
DISCOVER → REGISTER → LINK EVIDENCE → ATTACH GEOMETRY → ASSEMBLE → INTERACT → PASSPORT
```

---

## Deliberately excluded (not kernel)

| Excluded | Deferred to |
|---|---|
| EV-conversion / teardown weight engines | Stage 3 / P5 |
| Diagnostics & telemetry mapping | Stage 3 |
| Fleet APIs | Stage 3 |
| Multi-year compatibility lookup engines | Stage 3 / `USS-COMPAT` |
| Monolithic master-schema expansion | Prefer composable kernel schemas |

See [KERNEL_DEFERRED_FEATURES.md](KERNEL_DEFERRED_FEATURES.md).

---

## Composable schemas (six + passport minimum)

Kernel is **composable**, not monolithic:

| # | Schema | File |
|---|---|---|
| 1 | Entity Identity | `schemas/kernel/ENTITY_IDENTITY_SCHEMA_PROPOSAL.json` |
| 2 | Applicability | `schemas/kernel/APPLICABILITY_SCHEMA_PROPOSAL.json` |
| 3 | Evidence Link | `schemas/kernel/EVIDENCE_LINK_SCHEMA_PROPOSAL.json` |
| 4 | Geometry Asset | `schemas/kernel/GEOMETRY_ASSET_SCHEMA_PROPOSAL.json` |
| 5 | Assembly Relationship | `schemas/kernel/ASSEMBLY_RELATIONSHIP_SCHEMA_PROPOSAL.json` |
| 6 | Interaction Definition | `schemas/kernel/INTERACTION_DEFINITION_SCHEMA_PROPOSAL.json` |
| + | Passport Minimum | `schemas/kernel/COMPONENT_PASSPORT_MINIMUM_PROPOSAL.json` |

Instances for the door vertical slice: `kernel/instances/f450_door_fl/`.

---

## Relationship to EDTS-OS

| Layer | Role |
|---|---|
| EDTS-OS Blueprint / Roadmap | Long-range factory vision (P1–P6) |
| **EDTS Kernel** | **Near-term validation spine** — must pass acceptance tests on the door |
| Legacy passports (`CMP-SD-044-L`) | Aliased → `CMP-FORD-SD-DOOR-FL-001` for this slice |

OS subsystems remain planned; kernel schemas are the only structures required to prove the workflow.

---

## Vertical slice docs

- [F450_DOOR_FL_VERTICAL_SLICE_PLAN.md](F450_DOOR_FL_VERTICAL_SLICE_PLAN.md)
- [F450_DOOR_FL_ACCEPTANCE_TESTS.md](F450_DOOR_FL_ACCEPTANCE_TESTS.md)
- [KERNEL_OPEN_QUESTIONS.md](KERNEL_OPEN_QUESTIONS.md)

## First evidence link policy

Proceed with **asset-backed geometry evidence first** (`ASSET-00031` → `GEO-00001`), status `CANDIDATE`.  
Do **not** open with BBAS/WSM links as if ingested — OEM PDFs remain `AWAITING_FILE` (DT-D017).
