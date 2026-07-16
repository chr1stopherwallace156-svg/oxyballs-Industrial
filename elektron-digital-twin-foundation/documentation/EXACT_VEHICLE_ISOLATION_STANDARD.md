# Exact Vehicle Isolation Standard

**Status:** `ACTIVE` — implements constitutional law [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](HARD_RULE_EXACT_VEHICLE_ISOLATION.md)  
**Version:** `2.0.0`  
**Universality:** All OEMs, all years, all body styles, all option packages

---

## Hard rules (operational)

1. Every **model year** is distinct.
2. Every **manufacturer** is distinct.
3. Every **model** is distinct.
4. Every **series / trim** is distinct.
5. Every **cab type** is distinct.
6. Every **body type** is distinct.
7. Every **drivetrain** is distinct.
8. Every **rear-wheel configuration** is distinct.
9. Every **wheelbase** is distinct.
10. Every **cab-to-axle** (or equivalent packaging measure) is distinct.
11. Every **suspension package**, **axle package**, and **option package** that changes engineering truth is distinct.
12. No information may automatically inherit from a related platform, generation, or model year.
13. Similarity permits **discovery only**. It is never evidence.
14. Cross-vehicle reuse remains `NOT_EVALUATED` until independently verified for each exact vehicle.

---

## Six-layer separation

| # | Layer | Schema | May contain OEM facts? |
|---|---|---|---|
| 1 | Universal entity definition | `entity-definition.schema.json` | No |
| 2 | Exact vehicle instance | `vehicle-instance.schema.json` | Yes (dataset only) |
| 3 | Exact configuration | `exact-configuration.schema.json` | Yes (dataset only) |
| 4 | Vehicle-bound component instance | `component-instance.schema.json` | Yes (dataset only) |
| 5 | Optional reusable definition | `reusable-component-definition.schema.json` | Empty until proven |
| 6 | Cross-vehicle comparison | `cross-vehicle-comparison.schema.json` | Comparison only — never inheritance |

---

## Dataset path convention

```text
examples/<manufacturer_slug>/<exact_configuration_slug>/
```

Slugs are lowercase, underscore-separated, and must encode the isolation axes needed to prevent collision (year, model, cab, drivetrain, axle/wheel config, etc.).

First populated dataset:

`examples/ford/2019_f450_regularcab_4x2_drw/` → `VEH-000001` / `CFG-000001` / `CMPINST-VEH000001-DOOR-FL`

Scaffold-only datasets (empty of engineering claims) may exist for other OEMs to prove the kernel does not change.

---

## Prohibited in any exact vehicle dataset

- `model_year_range`
- Auto-copied geometry, materials, measurements, procedures, evidence, assemblies, interactions, shaders, pivots, tolerances, fasteners, torque values, dimensions, CAD, or scans from another vehicle
- Platform-family facts used as applicability
- Invented source IDs
- Runtime / disassembly claims without execution evidence
