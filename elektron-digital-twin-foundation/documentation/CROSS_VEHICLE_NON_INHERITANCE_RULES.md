# Cross-Vehicle Non-Inheritance Rules

**Status:** `ACTIVE`  
**Law:** [HARD_RULE_EXACT_VEHICLE_ISOLATION.md](HARD_RULE_EXACT_VEHICLE_ISOLATION.md)  
**Version:** `2.0.0`

---

## Core law

**Similarity is never evidence.**  
**Cross-vehicle comparison is allowed. Cross-vehicle inheritance is prohibited.**

```text
Vehicle A  →  Comparison Record  →  Vehicle B     ✅
Vehicle A  →  inherits directly  →  Vehicle B     ❌
```

---

## Non-leakage inventory

A vehicle dataset must never automatically inherit any of the following from another vehicle:

- geometry  
- materials  
- measurements  
- procedures  
- evidence  
- assemblies  
- interactions  
- shaders  
- pivots  
- tolerances  
- fasteners  
- service procedures  
- torque values  
- dimensions  
- CAD  
- scans  

---

## Promotion path

```text
observe similarity (discovery only)
  → write cross-vehicle-comparison (reuse_status = NOT_EVALUATED)
  → gather independent evidence on EACH exact vehicle
  → optionally set reuse_status = PROVEN
  → only then link reusable_component_definition_id on each instance
```

Skipping steps is a constitutional violation.

---

## Universal examples (illustrative only)

These pairs are always distinct datasets until independently proven:

- 2019 F-450 Regular Cab vs 2018 F-450 Regular Cab  
- 2019 F-450 4x2 vs 2019 F-450 4x4  
- F-450 DRW vs F-450 SRW  
- 2021 Transit vs 2022 Transit  
- Model 3 Long Range vs Model 3 Performance  
- Silverado 2500HD vs 3500HD  
- Camry LE vs Camry XSE  
