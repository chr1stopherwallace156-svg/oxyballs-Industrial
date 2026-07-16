# CLEARANCE_AND_FIT_STANDARD_PROPOSAL.md — Packaging Separation Rules

## Status

**PROPOSAL**

This proposal defines the safety envelope and separation rule for vehicle packaging and interference checks. It ensures that measurement uncertainties and assembly variances are mechanically accounted for during layout design.

---

## Structural Packaging Separation Rule

For all engineering packaging reviews, the minimum clearance envelope (C_min) between two separate mechanical components must exceed the sum of their worst-case manufacturing and physical measurement variations plus a design margin:

```
C_min ≥ U_meas + V_mfg + M_dyn + M_thermal + S_safety
```

Where:

| Symbol | Definition |
|---|---|
| U_meas | Combined measurement uncertainty (derived from Measurement Conformance Class) |
| V_mfg | Combined manufacturing tolerance limit (extracted from CAD nominal drawings) |
| M_dyn | Dynamic operational movement allowance (kinematic deflection under peak structural load) |
| M_thermal | Thermal expansion displacement allowance (critical for exhaust system routing) |
| S_safety | Absolute engineering safety margin |

---

## Envelope Allowances by Subsystem Interface

| Interface Condition | U_meas (Combined) | V_mfg (Combined) | M_dyn | M_thermal | S_safety | C_min (Target) |
|---|---|---|---|---|---|---|
| Exhaust Piping to Wiring Harness | ± 3.0 mm (Class C) | ± 1.5 mm | 20.0 mm (Engine Rock) | 8.0 mm (600 °C rise) | 15.0 mm | 47.5 mm |
| Tire Outer Envelope to Inner Fender | ± 3.0 mm (Class C) | ± 5.0 mm (Tire swell) | 50.0 mm (Full bump/steer) | 0.0 mm | 25.0 mm | 83.0 mm |
| Driveshaft to Midship Fuel Tank | ± 1.5 mm (Class B) | ± 2.0 mm | 15.0 mm (Axle wrap) | 1.0 mm | 10.0 mm | 29.5 mm |

Conformance classes are defined in `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md`.

---

## Related Documents

- `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md` — Class A through Class D targets
- `registries/UNIT_REGISTRY.json` — controlled unit vocabulary
