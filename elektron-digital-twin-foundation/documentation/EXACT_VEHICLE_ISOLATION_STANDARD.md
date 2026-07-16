# Exact Vehicle Isolation Standard

**Status:** `ACTIVE`  
**Version:** `1.0.0`  
**Binding for:** EDTS Minimum Viable Kernel (exact-vehicle revision)

---

## Hard vehicle-isolation rules

1. Every **model year** is distinct.
2. Every **model** is distinct.
3. Every **series** is distinct.
4. Every **cab type** is distinct.
5. Every **body type** is distinct.
6. Every **drivetrain** is distinct.
7. Every **rear-wheel configuration** is distinct.
8. Every **wheelbase** is distinct.
9. Every **cab-to-axle** configuration is distinct.
10. No information may automatically inherit from a related platform, generation, or model year.
11. **Similarity permits discovery only.** It does not establish applicability.
12. Cross-vehicle reuse must remain `NOT_EVALUATED` until independently verified.

---

## Prohibited patterns

| Prohibited | Why |
|---|---|
| `model_year_range` on a component instance | Collapses distinct years |
| Platform-family facts auto-filling an exact vehicle | Inheritance by similarity |
| Listing F-350 / F-550 / Crew Cab / 4x4 / pickup on a 2019 F-450 Regular Cab 4x2 DRW 145.3/60 door instance | Wrong exact vehicle |
| Treating a “Super Duty door” as the primary identity | Genericizes a vehicle-bound part |
| Asserting cross-year interchangeability without a comparison record at `PROVEN` | Violates rule 12 |

---

## Required separation

| Layer | Schema | Role |
|---|---|---|
| 1 | `entity-definition.schema.json` | Universal entity definition (no vehicle facts) |
| 2 | `vehicle-instance.schema.json` | Exact vehicle instance |
| 3 | `exact-configuration.schema.json` | Exact configuration |
| 4 | `component-instance.schema.json` | Vehicle-bound component instance |
| 5 | `reusable-component-definition.schema.json` | Optional reusable definition (empty until proven) |
| 6 | `cross-vehicle-comparison.schema.json` | Comparison outside exact vehicle records |

---

## First exact vehicle (authoritative)

| Field | Value |
|---|---|
| vehicle_instance_id | `VEH-000001` |
| model_year | **2019** only |
| manufacturer | Ford |
| model | F-450 |
| vehicle_type | Chassis Cab |
| configuration_id | `CFG-000001` |
| cab | Regular Cab |
| drivetrain | 4x2 |
| rear_wheel_configuration | DRW |
| wheelbase | 145.3 in |
| cab_to_axle | 60 in |

**Door instance:** `CMPINST-VEH000001-DOOR-FL`  
Examples: `examples/2019_f450/`
