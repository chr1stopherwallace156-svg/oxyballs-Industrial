# MEASUREMENT_REQUIREMENTS_V2_PROPOSAL.md — Metrology Conformance Classes

## Status

**PROVISIONALLY ACCEPTED**

Target accuracy bounds are defined by downstream application consequence rather than raw physical component size. These targets are provisional and subject to formal uncertainty budget verification once metrology hardware is selected.

Supersedes universal ≤ 0.05 mm claims and refines `MEASUREMENT_ACCURACY_CLASS_PROPOSAL.md`.

---

## Strategy Overview

```
       +------------------------------------+
       |   METROLOGY CONFORMANCE CLASSES   |
       +------------------------------------+
                         |
      +------------------+------------------+
      |                                     |
[ CONSEQUENCE: HIGH ]             [ CONSEQUENCE: LOW ]
  Structural Interface,             Volumetric Envelope,
  Kinematic Pivots                  Aesthetic Styling
      |                                     |
  - CLASS A: ±0.5 mm                 - CLASS C: ±3.0 mm
  - CLASS B: ±1.5 mm                 - CLASS D: Reference Only
```

---

## Class A: Structural Interface and Kinematic Datums

| Field | Value |
|---|---|
| Downstream consequence | High — incorrect values lead to structural assembly failure, kinematic model error, or binding of mechanical joints |
| Applicable features | Bolt patterns, suspension pivot points, steering box locating pins, cab-to-frame mount interfaces |
| Provisional target | ± 0.5 mm spatial accuracy |
| Schema mapping | MAC-A |
| Validation plan | Requires validation against an uncertainty budget constructed for a local laser tracker or contact metrology arm |

---

## Class B: Rigid Packaging Clearances and Mounting Planes

| Field | Value |
|---|---|
| Downstream consequence | Medium — overly tight bounds cause interface rework; excessively loose bounds risk component collision under dynamic deflection |
| Applicable features | Engine block mounting bosses, frame rail profiles, transmission mounts, steering shaft clearances |
| Provisional target | ± 1.5 mm spatial accuracy |
| Schema mapping | MAC-B |
| Validation plan | Target accuracy evaluated using high-density structured-light scanning with local photogrammetric registration targets |

---

## Class C: Volumetric Envelope and Outer Body Styling

| Field | Value |
|---|---|
| Downstream consequence | Low — minor discrepancies do not affect mechanical assembly; high errors distort visual proportions |
| Applicable features | Exterior sheet metal surfaces, cab roof profiles, glass transitions, tyre visual envelopes |
| Provisional target | ± 3.0 mm spatial accuracy |
| Schema mapping | MAC-C |
| Validation plan | Terrestrial LiDAR scanning registered across multiple setups using a registration network |

---

## Class D: Non-Structural Routing and Visual Context

| Field | Value |
|---|---|
| Downstream consequence | Negligible — non-authoritative geometry used for visual asset generation |
| Applicable features | Wiring harness routing, low-pressure plumbing paths, bracket cosmetic fillets, interior trim details |
| Provisional target | Reference only; no dimensional authority |
| Schema mapping | MAC-D |
| Validation plan | Visual match to hand measurements or photogrammetric textured models |

---

## Relationship to DT-D002

DT-D002 tiered accuracy (±2 / ±5 / ±10 mm) remains a modeling tolerance budget. Conformance classes govern metrology claims and instrument selection. When both apply, conformance class governs physical capture; DT-D002 governs CAD modeling tolerance budgets.
