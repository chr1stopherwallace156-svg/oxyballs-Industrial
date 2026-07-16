# Component Instance Architecture

**Status:** `ACTIVE`  
**Law:** HR-EVI

---

## Principle

Engineering parts are represented first as **vehicle-bound component instances**, not as generic platform parts.

Example (Ford dataset only — not a kernel constant):

`CMPINST-VEH000001-DOOR-FL` bound to `VEH-000001` + `CFG-000001`

---

## Required bindings

```text
component_instance_id
  ├── vehicle_instance_id   (exact)
  └── configuration_id      (exact)
```

Schemas forbid `model_year_range`, `platform_family`, and multi-model applicability fields on the instance.

---

## Optional reusable definition

`reusable_component_definition_id` may be:

- `null` with `reusable_link_status: NOT_EVALUATED` (default), or
- set only after interchangeability is proven for this exact vehicle

Empty candidate definitions may exist **outside** the instance link (`definition_status: EMPTY_CANDIDATE`).

---

## Interaction classes

| Class | Meaning |
|---|---|
| `PROTOTYPE` / `VISUAL_PREVIEW_ONLY` | Visual demo only |
| `CALIBRATED` | Pivot/transform measured for this instance |
| `ENGINEERING_VERIFIED` | Disassembly/procedure verified for this instance |

`disassembly_status: NOT_VERIFIED` until proven.  
`runtime_execution_status: NOT_EXECUTED` until harness runs.

---

## Scaling

Thousands of vehicles ⇒ thousands of component-instance datasets.  
Zero manufacturer forks of the kernel.
