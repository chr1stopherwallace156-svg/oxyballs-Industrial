# Runtime Vehicle Isolation Standard

**Status:** `ACTIVE`  
**Kernel:** `1.0.0-rc1`  
**Law:** HR-EVI

---

## Rule

All component lookups must utilize the **Instance Resolver** pattern:

```text
getComponent(vehicle_instance_id, configuration_id, component_instance_id)
```

Optional hardening (recommended):

```text
getComponent(vehicle_instance_id, configuration_id, configuration_fingerprint, component_instance_id)
```

---

## Forbidden

| Pattern | Status |
|---|---|
| Lookup by `canonical_name` alone | **Explicitly forbidden** |
| Lookup by `component_definition_id` without vehicle + configuration IDs | **Forbidden** |
| Falling back to another vehicle’s instance when IDs miss | **Forbidden** |
| Resolving “similar” year/platform automatically | **Forbidden** |

---

## Resolver contract (plain text)

```text
INPUT:
  vehicle_instance_id   (required)
  configuration_id      (required)
  component_instance_id (required)
  configuration_fingerprint (optional; if present must match CFG record)

PROCESS:
  1. Load vehicle instance silo by vehicle_instance_id
  2. Assert vehicle.configuration_id == configuration_id
  3. Load component instance where all three IDs match
  4. If fingerprint provided, assert equality with component/configuration fingerprint
  5. On any mismatch → MISS (do not substitute another vehicle)

OUTPUT:
  component instance record OR NOT_FOUND
```

---

## Runtime tests

See `KERNEL_TEST_RESULTS.json`. Runtime isolation tests are recorded as `NOT_EXECUTED` until a resolver harness exists.
