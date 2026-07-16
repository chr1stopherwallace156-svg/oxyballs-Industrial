# Cross-Vehicle Non-Inheritance Rules

**Status:** `ACTIVE`  
**Version:** `1.0.0`

---

## Core law

**Similarity permits discovery only. It does not establish applicability.**

Cross-vehicle reuse remains `NOT_EVALUATED` until independently verified for each exact vehicle and exact configuration.

---

## What may live on an exact vehicle record

- Facts true for **that** `vehicle_instance_id` + `configuration_id` only
- Links to evidence/geometry/interaction for **that** component instance

## What must stay outside

| Content | Home |
|---|---|
| “Also fits 2017–2018” | `cross-vehicle-comparison` only, status ≠ PROVEN until verified |
| “Super Duty family door” | reusable definition candidate — empty until proven |
| F-350 / F-550 / Crew Cab / 4x4 listings | other vehicle/config records — never auto-copied |
| Platform marketing architecture | discovery notes / comparison — not applicability |

---

## Promotion path (plain text)

```text
DISCOVERY_ONLY similarity
  → cross-vehicle-comparison.reuse_status = NOT_EVALUATED
  → independent evidence on EACH exact vehicle
  → reuse_status = PROVEN (optional)
  → only then may reusable_component_definition link component instances
```

Skipping steps is prohibited.

---

## Door slice implication

`CMPINST-VEH000001-DOOR-FL` must **not** claim interchangeability with any other year, model, cab, or drivetrain.  
`reusable_link_status` starts at `NOT_EVALUATED` with `reusable_component_definition_id: null`.
