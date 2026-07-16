# HARD RULE — Exact Vehicle Isolation

**Status:** `CONSTITUTIONAL`  
**Law ID:** `HR-EVI`  
**Effective:** 2026-07-16  
**Scope:** Every manufacturer, every platform, every model year, every trim, every drivetrain, every body style, every wheelbase, every cab, every suspension package, every axle package, every option package, every production variation.

This is a **core architectural law**, not a coding preference and not a Ford-only rule.

---

## Statement

Every unique vehicle configuration is treated as its own completely independent engineering dataset.

No vehicle is ever allowed to inherit engineering information from another vehicle simply because they appear similar.

**Similarity is never considered evidence.**

**Every vehicle stands on its own evidence.**

---

## Applies to every vehicle

This is not specific to Ford.  
This is not specific to 2019.  
This is not specific to trucks.

It applies equally to:

| Pair | Isolation |
|---|---|
| 2019 Ford F-450 Regular Cab vs 2018 Ford F-450 Regular Cab | Distinct |
| 2019 Ford F-450 4x2 vs 2019 Ford F-450 4x4 | Distinct |
| 2019 Ford F-450 DRW vs 2019 Ford F-450 SRW | Distinct |
| 2021 Ford Transit vs 2022 Ford Transit | Distinct |
| Tesla Model 3 Long Range vs Tesla Model 3 Performance | Distinct |
| Chevrolet Silverado 2500HD vs Silverado 3500HD | Distinct |
| Toyota Camry LE vs Camry XSE | Distinct |

Even if 99.9% of the vehicle appears identical:

- No automatic inheritance
- No automatic reuse
- No automatic assumptions

---

## Universal kernel

The kernel remains completely vehicle-agnostic.

It must never contain manufacturer-specific logic (Ford, Tesla, GM, Toyota, or any other).

The kernel only defines:

- identity  
- evidence  
- configuration  
- geometry  
- interaction  
- relationships  
- validation  
- lifecycle  
- traceability  

The kernel must represent any vehicle **without modification**.

---

## Vehicle data lives outside the kernel

```text
examples/
  ford/
    2019_f450_regularcab_4x2_drw/
  tesla/
    2022_model3_performance/
  toyota/
    2024_camry_xse/
  chevrolet/
    2020_silverado_2500hd/
```

**The kernel never changes. Only datasets change.**

---

## No cross-vehicle data leakage

A vehicle dataset may never automatically inherit from another vehicle:

geometry · materials · measurements · procedures · evidence · assemblies · interactions · shaders · pivots · tolerances · fasteners · service procedures · torque values · dimensions · CAD · scans

Everything must exist because it is supported for **that exact vehicle**.

---

## Cross-vehicle knowledge vs inheritance

| Allowed | Prohibited |
|---|---|
| Cross-vehicle **comparison** records | Cross-vehicle **inheritance** |
| Discovery notes that similarity was observed | Treating similarity as verification |

```text
Vehicle A  →  Comparison Record  →  Vehicle B     ✅
Vehicle A  →  inherits directly  →  Vehicle B     ❌
```

---

## Evidence hierarchy

Every parameter remains attached to evidence.  
Evidence is evaluated independently for every vehicle.  
A verified value for one vehicle does **not** verify another.  
Every dataset must earn its own verification status.

---

## Unknown is acceptable

If information is unavailable, use:

- `UNKNOWN`
- `REQUIRES_EVIDENCE`
- `NOT_EVALUATED`
- or JSON `null` where the schema allows

Do **not** copy values from another vehicle.  
Do **not** estimate.  
Do **not** interpolate.  
Do **not** fabricate precision.

---

## Relationship to Hard Rule 0 (Component First)

Component First allows **optional** reusable component definitions to exist outside any single vehicle.

Exact Vehicle Isolation forbids **automatic** binding of those definitions onto a vehicle.

Reusable definitions remain `EMPTY_CANDIDATE` / `NOT_EVALUATED` until interchangeability is proven **per exact vehicle** via independent evidence and an explicit comparison record when cross-vehicle claims are made.

---

## Machine enforcement

| Artifact | Role |
|---|---|
| `schemas/*.schema.json` | Universal Draft 2020-12 only |
| `examples/<oem>/<exact_config>/` | Isolated datasets |
| `verification/isolation/` | Negative tests proving no leakage |
| `documentation/KERNEL_VALIDATION_RULES.md` | Validation rules |

**Decision:** DT-D023
