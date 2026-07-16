# DECISIONS.md

Append-only record of digital twin foundation decisions.

## DT-D001 — Provisional L00 reference vehicle (pending owner approval)

- **Date:** 2026-07-16
- **Status:** Provisional — **not locked until owner approval**
- **Context:** L00 requires a single canonical reference before any 3D work. Elektron's Build Engine research targets Ford Super Duty F-450/F-550 (Class 4/5). Marketing materials also cite light-duty F-150. One vehicle must be locked first.
- **Decision (provisional):**
  - **2019 Ford F-450 Super Duty XL**
  - Regular Cab, 8 ft Styleside, dual rear wheel (DRW)
  - 4x2
  - Wheelbase **141.6 in** (Regular Cab pickup)
  - Stock body — no commercial upfit
  - Stock **6.7L Power Stroke diesel** as the OEM configuration to model removal from
  - Stock 19.5 in DRW steel wheels
- **Rationale:**
  - Aligns with Build Engine L1 lane (Super Duty BBLB, frame alteration, fleet GVWR class)
  - Supports Extended Range / fleet conversion tier (GVWR > 10,000 lb, FMVSS 305a scope)
  - Ford BBAS publishes Super Duty BBLB/BEMM paths (CS-05, CS-07, CS-10 on docs branch)
  - Regular Cab + 8 ft bed maximizes accessible engine bay and frame rail length for conversion packaging studies
  - 4x2 reduces first-pass complexity; 4x4 variant documented as future derivative (DT-D001-A)
- **Alternatives considered:**
  - **2017 Ford F-150 SuperCab 6.5 ft 4x2 145 in WB** — better match to Standard Conversion marketing tier and lighter donor pool; deferred as DT-D001-B variant
  - **2019 F-550 chassis cab** — higher GVWR headroom; deferred until upfit/body type is chosen
- **Consequences:**
  - All L01–L10 dimensions trace to this configuration until superseded
  - Physical reference unit, VIN, and Ford BBAS CAD access must be confirmed before L01
  - F-150 fleet work requires explicit variant decision (DT-D001-B) — not assumed

## DT-D002 — Tiered geometry and accuracy strategy

- **Date:** 2026-07-16
- **Status:** Accepted (methodology — independent of vehicle choice)
- **Context:** Full-vehicle sub-millimeter scan is costly; conversion engineering needs high accuracy only at interfaces.
- **Decision:**
  1. **Primary envelope:** Ford OEM dimension tables and vehicle-specific BBLB where obtainable
  2. **Secondary verification:** Targeted LiDAR/photogrammetry on the physical reference unit at mounting interfaces, engine bay, and frame rails
  3. **Accuracy tiers (mm):** mounting interfaces ±2; powertrain envelope ±5; exterior cosmetic ±10
- **Consequences:** THREE_D_SPEC and QUALITY_STANDARD reference these tiers; scans are scoped, not whole-vehicle by default.

## DT-D003 — Licensing posture for OEM geometry

- **Date:** 2026-07-16
- **Status:** Accepted (pending legal review for BBAS terms)
- **Context:** Ford BBAS CAD and layout books are license-restricted.
- **Decision:**
  - OEM CAD stays **out of this git repo** unless counsel approves
  - Derived meshes and dimension tables with provenance may live in `assets/` after review
  - Public-facing twin uses Elektron-owned or derived geometry only
- **Consequences:** Geometry source chain must be documented per component in DATA_MODEL.
