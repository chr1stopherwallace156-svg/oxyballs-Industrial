# Configuration Identity Architecture

**Status:** `ACTIVE`  
**Law:** HR-EVI (Exact Vehicle Isolation)

---

## Purpose

Define how an **exact configuration** is identified so that two nearly identical vehicles never collapse into one dataset.

---

## Identity stack

```text
vehicle_instance_id     → who / which exact vehicle identity (year + manufacturer + model + type)
configuration_id        → exact engineering configuration under that vehicle
component_instance_id   → part bound to that configuration only
```

### Vehicle instance axes (minimum)

- model_year (single integer — never a range)
- manufacturer
- model
- vehicle_type

### Configuration axes (minimum when applicable)

- cab
- body_type
- drivetrain
- rear_wheel_configuration
- wheelbase (value + unit)
- cab_to_axle or packaging equivalent (value + unit)
- series / trim (nullable → `null` / `UNKNOWN` if not yet known — still does not inherit)

Any change on a required axis ⇒ **new `configuration_id`**.

---

## Dataset directory identity

Directory slug must be sufficient for humans to see isolation without opening JSON:

```text
examples/ford/2019_f450_regularcab_4x2_drw/
examples/tesla/2022_model3_performance/
```

Do not use ambiguous folders like `examples/f450/` or `examples/super_duty/`.

---

## Collision rule

If two datasets would share the same slug but differ on any isolation axis, they are different configurations — mint a new slug and new IDs.

---

## Kernel independence

Schemas under `schemas/` define the shape of IDs and axes.  
They never enumerate OEM catalogs. OEM catalogs live only in datasets.
