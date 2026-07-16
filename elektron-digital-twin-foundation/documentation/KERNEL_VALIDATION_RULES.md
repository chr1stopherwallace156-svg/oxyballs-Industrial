# Kernel Validation Rules

**Status:** `ACTIVE`  
**Law:** HR-EVI  
**Enforcement:** `verification/isolation/`

---

## VR-001 — Schema universality

`schemas/*.schema.json` (exact-vehicle kernel set) must:

- use JSON Schema Draft 2020-12
- include `$id`, `type`, `properties`, `required`, `additionalProperties: false`
- contain **no** manufacturer names, model names, or model-year literals as schema assumptions

## VR-002 — Dataset path isolation

Vehicle datasets must live under:

```text
examples/<manufacturer_slug>/<exact_configuration_slug>/
```

Not under the kernel schema tree.

## VR-003 — Exact configuration binding

Every `component-instance` must reference exactly one `vehicle_instance_id` and one `configuration_id`.

## VR-004 — No year ranges on instances

`model_year_range` must not appear on component instances or exact configurations.

## VR-005 — No cross-dataset field copy

A dataset must not contain foreign `vehicle_instance_id` values as inherited authorities for geometry, materials, measurements, procedures, evidence, assemblies, interactions, shaders, pivots, tolerances, fasteners, torque, dimensions, CAD, or scans.

## VR-006 — Comparison ≠ inheritance

`cross-vehicle-comparison` records may exist; `reuse_status` defaults to `NOT_EVALUATED`.  
No schema path allows Vehicle A to become Vehicle B’s evidence.

## VR-007 — Unknown over fabrication

Missing facts use `null`, `UNKNOWN`, `NOT_EVALUATED`, or `REQUIRES_EVIDENCE`.

## VR-008 — Evidence IDs must exist

`evidence_link.source_id` must match an ID present in an in-repo registry/manifest, or the link must not be created.

## VR-009 — Runtime honesty

Do not assert `PASS` / `ENGINEERING_VERIFIED` disassembly or runtime tests without execution records.

## VR-010 — Negative isolation suite

`verification/isolation/run_isolation_tests.py` must pass before claiming kernel isolation readiness.
