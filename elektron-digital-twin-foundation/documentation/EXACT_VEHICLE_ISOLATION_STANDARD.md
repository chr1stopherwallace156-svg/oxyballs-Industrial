# Exact Vehicle Isolation Standard

**Status:** `ACTIVE` — primary directive  
**Kernel:** `1.0.0-rc1` ([KERNEL_MANIFEST.json](../KERNEL_MANIFEST.json))  
**Constitutional law:** [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](HARD_RULE_EXACT_VEHICLE_ISOLATION.md)

---

## Principle

No component or configuration may inherit attributes from another.

Data for an exact vehicle (for example the 2019 F-450 Chassis Cab Regular Cab 4x2 DRW 145.3/60 silo) is stored exclusively within its own instance space under:

```text
examples/<manufacturer>/<exact_configuration>/
```

Similarities to other model years or platforms are treated as **Comparison Records only**, never as functional data inheritance.

---

## Operational rules

1. Every unique configuration is a silo.
2. Cross-vehicle comparisons are explicitly decoupled records (`cross-vehicle-comparison.schema.json`).
3. Verification in one vehicle does not status-update another.
4. `configuration_id` is paired with an immutable fingerprint ([CONFIGURATION_FINGERPRINT_STANDARD.md](CONFIGURATION_FINGERPRINT_STANDARD.md)).
5. Schemas remain universal; populated values exist only in datasets.
6. Multi-year applicability fields are prohibited.

---

## Seed silo

| ID | Value |
|---|---|
| Path | `examples/ford/2019_f450_regularcab_4x2_drw/` |
| Vehicle | `VEH-000001` |
| Configuration | `CFG-000001` |
| Door instance | `CMPINST-VEH000001-DOOR-FL` |

Legacy folder `examples/2019_f450/` is a superseded pointer only.
