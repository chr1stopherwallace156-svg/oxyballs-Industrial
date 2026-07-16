# Cross-Vehicle Non-Inheritance Rules

**Status:** `ACTIVE`  
**Kernel:** `1.0.0-rc1`  
**Law:** HR-EVI

---

## Zero-Inheritance

Any attribute (geometry, material, procedure, measurement, evidence, assembly, interaction, shader, pivot, tolerance, fastener, torque, dimension, CAD, scan) that appears related across model years or platforms must be documented in a **cross-vehicle-comparison** record.

It must never be copied as functional inheritance into another vehicle silo.

---

## Explicit Verification

Verification in one vehicle (e.g. 2019) does **not** status-update the component in another (e.g. 2018).

Every dataset earns its own verification status.

---

## Identity Fingerprinting

Every `configuration_id` must be paired with a canonical fingerprint of its specific physical attributes (wheelbase, CA, drivetrain, cab, rear-wheel configuration, etc.).

See [CONFIGURATION_FINGERPRINT_STANDARD.md](CONFIGURATION_FINGERPRINT_STANDARD.md).

```text
Vehicle A  →  Comparison Record  →  Vehicle B     ✅
Vehicle A  →  inherits directly  →  Vehicle B     ❌
```

---

## Similarity

Similarity permits discovery only. Similarity is never evidence.
