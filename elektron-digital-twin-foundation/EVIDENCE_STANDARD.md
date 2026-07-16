# EVIDENCE_STANDARD.md — Evidence Types & Verification Standards

## Status

**Active / Architecture Material (Non-binding for current Layer 0 lock)**

## 1. Evidence Types & Classification

EDTS recognizes three structural categories of evidence:

```
                    +---------------------------+
                    |  Evidence Classification  |
                    +---------------------------+
                                  |
        +---------------------------+---------------------------+
        |                           |                           |
 [ Tier 1: Design ]          [ Tier 2: Physical ]           [ Tier 3: Telemetry ]
 - Blueprints, CAD, BBAS     - Metrology Laser Scans        - CAN-bus & Sensors
 - Service Manuals           - Calibrated Calipers        - Dynamic Testing Logs
```

### Authoritative Design Records (Tier 1)
- OEM blueprints, Body Builder Advisory Service (BBAS) books, technical specifications
- Official service manuals and OEM technical documentation

### Physical Observations (Tier 2)
- High-precision laser scans, structured-light captures, and verified metrology
- Caliper measurements using calibrated metrology gear
- Verified on-site photography suitable for traceability

### Sensor/Telemetry Streams (Tier 3)
- CAN-bus logging (controller area network)
- OBD-II logs
- Dynamic testing telemetry and instrumentation outputs

## 2. Chain of Custody & Verification Criteria

An engineering claim (component dimension, mechanical configuration, or operational parameter) is considered **Verified** only if it satisfies at least one of the following:

1) It is corroborated by at least two independent Tier 1 sources with no geometric mismatch.

OR

2) It is captured via Tier 2 physical observation at the appropriate **Measurement Accuracy Class (MAC)** for the feature scope, and matches a Tier 1 baseline within the documented manufacturing variance window.

### Measurement Conformance Classes

Per `MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md` (provisionally accepted):

| Class | Target Accuracy | Typical Scope |
|---|---|---|
| Class A / MAC-A | ± 0.5 mm | Structural interfaces, kinematic datums |
| Class B / MAC-B | ± 1.5 mm | Rigid packaging clearances, mounting planes |
| Class C / MAC-C | ± 3.0 mm | Volumetric envelope, exterior styling |
| Class D / MAC-D | Reference only | Non-structural routing, visual context |

Unit identifiers must reference `registries/UNIT_REGISTRY.json`. Frame identifiers must reference `registries/COORDINATE_FRAME_REGISTRY.json`.

> **Audit note (METRO-001):** A universal ≤ 0.05 mm tolerance over a full commercial vehicle envelope is rejected as unphysical.

## 3. Notes on “Tier 1 Use” vs Licensing

This document defines evidence strength. It does **not** imply redistribution rights for Tier 1 artifacts. Licensing constraints remain governed by `LEGAL_LICENSES.md` (and associated counsel policy).

