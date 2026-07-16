# EDTS-OS Implementation Roadmap (6 Phases)

**Status:** `ACTIVE`  
**Version:** `1.0.0`  
**Parent:** [EDTS_OS_ARCHITECTURE_BLUEPRINT.md](EDTS_OS_ARCHITECTURE_BLUEPRINT.md)

Move toward the platform vision **without stalling** the current F-450 baseline assembly.

| Phase | Focus | Deliverable | F-450 baseline status (2026-07-16) |
|---|---|---|---|
| **P1** | Evidence Library | Globally indexed Evidence Graph linking technical documents | **SEEDED** — `L1_EVIDENCE_GRAPH.json` operational-honest; OEM edges `AWAITING_FILE` |
| **P2** | Component Library | Independently versioned components (Cab, Axle, Frame) | **SEEDED** — draft passports + identity/version master schema |
| **P3** | Asset Pipeline | API-driven evaluate of marketplace assets vs Component Library | **PLANNED** — ASSET-00031 manual Grade B only |
| **P4** | Software Engine | Modular Three.js/React reads passports to assemble twins | **IN PROGRESS** — Team D hierarchy/loader (not completed) |
| **P5** | Conversion System | Teardown / EV integration (removal steps, weight tracking) | **PLANNED** |
| **P6** | EDTS Platform | Versioned EDTS-OS release that scaffolds a new vehicle | **PLANNED** |

---

## Phase gates (plain text)

```text
P1_GATE = evidence_graph_exists AND identity_of_sources_stable
P2_GATE = component_identity_registry_exists AND >=1_passport_per_critical_slot
P3_GATE = asset_eval_api_accepts_keep_modify_reject
P4_GATE = runtime_loads_config_plus_passports AND transform_tests_executed
P5_GATE = removal_replacement_integration_schemas_locked
P6_GATE = new_vehicle_scaffold_cli_or_template_produces_valid_empty_assembly
```

No phase is marked COMPLETE without its gate evidence recorded in `STATUS.json` / `DECISIONS.md`.

---

## Parallel with Teams A–D

| Team | Primary phase contribution |
|---|---|
| A Research | P1 Evidence Library population |
| B Assets | P3 Asset Pipeline inputs; feeds P2 passports |
| C Geometry | P2 geometry fields on passports |
| D Software | P4 Software Engine |

---

## Next schema priority

**Approved next deliverable:** Master Schema for **Identity Management + Version Control** (`USS-IDENTITY`, `USS-VERSION`) before expanding Asset Pipeline API schemas.

See:

- [`schemas/edts-os-platform-master.schema.json`](schemas/edts-os-platform-master.schema.json)
- [`schemas/component-identity.schema.json`](schemas/component-identity.schema.json)
- [`registries/COMPONENT_IDENTITY_REGISTRY.json`](registries/COMPONENT_IDENTITY_REGISTRY.json)
