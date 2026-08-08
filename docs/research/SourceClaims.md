# SOURCE CLAIMS

Register of claims taken from external sources (papers, standards,
vendor datasheets, regulations, measurements). A claim without a source
is not evidence; a claim recorded here is *research* — it informs, but
only evidence authorizes (Constitution, Article III).

Entries are append-only and never deleted; a discredited claim is marked
`Withdrawn` with a note, not removed.

**Entry format:**

```
## SC-NNN — <the claim, stated precisely>
- Recorded: YYYY-MM-DD
- Source: full citation / document reference / measurement record
- Status: Unverified | Verified (evidence ref) | Withdrawn (note)
- Used by: which ODRs, specifications, or decisions rely on it
```

---
## SC-001 — Webasto Standard Battery Pro 40 pack dimensions are 960 x 687 x 302 mm

- Recorded: 2026-08-08
- Source: Webasto, *Standard Battery Pro 40* datasheet, `2024_EB_Datasheet_Standard Battery Pro 40.pdf`, and product page `https://www.webasto.com/en-int/battery/standardized-battery-and-thermo-management/standard-battery-pro-40.html`
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published value; not yet confirmed by NONENERGIZED_PHYSICAL_METROLOGY on the exact unit)
- Used by: Platform 001 packaging study; `PLATFORM_001_EMPIRICAL_EVIDENCE_CLOSURE.md` §5; supersedes the non-promoted 960 x 780 x 310 mm draft value (SC-020)

## SC-002 — Webasto Standard Battery Pro 40 dry weight is 297 kg

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published; pending calibrated mass measurement)
- Used by: Platform 001 mass ledger / axle-load work; supersedes the non-promoted 290 kg draft value (SC-020)

## SC-003 — Webasto Standard Battery Pro 40 installed energy is ~40 kWh

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: Platform 001 energy budget; supersedes the non-promoted 35 kWh gross / ~30.8 kWh usable draft values (SC-020)

## SC-004 — Webasto Standard Battery Pro 40 nominal capacity is 116 Ah

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: Platform 001 energy budget

## SC-005 — Webasto Standard Battery Pro 40 normal operating voltage range is 333–407 V

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: B-003 current-at-minimum-voltage check (owner blocker 06); SC-015 derived current envelope; supersedes the non-promoted 350 V nominal / 300–400 V draft values (SC-020)

## SC-006 — Webasto Standard Battery Pro 40 continuous charge / discharge power is 45 / 55 kW at 25 C, SoC dependent

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: SC-015; powertrain compatibility evaluation; supersedes the non-promoted 150 A continuous / 100 A charge draft ratings (SC-020)

## SC-007 — Webasto Standard Battery Pro 40 peak charge / discharge power is 60 / 112 kW for 10 s at 25 C, SoC dependent

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: SC-015; supersedes the non-promoted 300 A 10-second draft rating (SC-020)

## SC-008 — Webasto Standard Battery Pro 40 coolant volume flow is 10 L/min

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: cooling package sizing; supersedes the non-promoted 15–20 L/min draft value (SC-020)

## SC-009 — Webasto Standard Battery Pro 40 coolant pressure loss is <50 mbar

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: cooling package sizing; supersedes the non-promoted 15–25 kPa draft value (SC-020)

## SC-010 — Webasto Standard Battery Pro 40 uses prismatic NMC cells

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: thermal-runaway / failure-mode work (Gate 08 FMEA registry)

## SC-011 — Webasto Standard Battery Pro 40 operating temperature range is -30 C to +55 C

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: thermal envelope; supersedes the non-promoted 35 C maximum coolant inlet draft value (SC-020)

## SC-012 — Webasto Standard Battery Pro 40 environmental protection is IP67 / IP6K9K

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Used by: enclosure / mounting requirements

## SC-013 — Webasto Standard Battery Pro 40 vehicle communication is CAN bus conforming to ISO 11898

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published). The proprietary CAN map is **not** published and remains UNKNOWN.
- Used by: Gate 05 comms matrix; supersedes the non-promoted "J1939 at 250 kbps" draft value (SC-020)

## SC-014 — Webasto Standard Battery Pro 40 provides insulation measurement, HVIL, and contactor monitoring

- Recorded: 2026-08-08
- Source: as SC-001
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published). Supports the **existence** of pack-level precharge/contactor/fuse functions only; resistor value, timing, control state machine, fuse coordination curve and any pyrofuse claim are **not** published.
- Used by: Gate 05 interlock work; B-003 precharge-responsibility question

## SC-015 — Derived current envelope for the Standard Battery Pro 40 (calculation, not a manufacturer current rating)

- Recorded: 2026-08-08
- Source: DERIVED from SC-005, SC-006, SC-007. Continuous 55 kW / 407 V = 135.1 A; 55 kW / 333 V = 165.2 A. Ten-second peak 112 kW / 407 V = 275.2 A; 112 kW / 333 V = 336.3 A.
- Authority class: DERIVED_CALCULATION_FROM_OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified — **must never be restated as a Webasto-published fixed current limit.**
- Used by: B-003 compatibility evaluation; conductor/fuse candidate sizing (selection remains blocked)

## SC-016 — Dana TM4 SUMO MD is intended for Class 4–7 commercial vehicles, bus platforms, and off-highway applications

- Recorded: 2026-08-08
- Source: Dana, motor and inverter systems product page `https://www.dana.com/product/commercial-vehicle/motor-and-inverter-systems-for-commercial-vehicles/`; sell sheet `https://dml.dana.com/assetbank-dana/assetfile/9819.pdf`
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (family-level claim; not variant-specific)
- Used by: powertrain candidate screening

## SC-017 — Dana TM4 SUMO MD is designed to interface directly with standard axles without a gearbox

- Recorded: 2026-08-08
- Source: as SC-016
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (family-level claim)
- Used by: driveline interface study

## SC-018 — Dana advertises SUMO MD family maxima of up to 265 kW peak power, 3320 Nm peak torque, 3700 RPM

- Recorded: 2026-08-08
- Source: as SC-016
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified — **family maxima, not a variant specification.** Exact compatibility must be tied to a specific current sell-sheet variant row. Specifications from multiple SUMO MD variants must not be blended into one candidate.
- Used by: powertrain candidate screening; B-003

## SC-019 — Platform 001 donor configuration (owner-locked reference config)

- Recorded: 2026-08-08
- Source: Build Engine locked configuration — 2019 Ford F-450 Super Duty Chassis Cab, Regular Cab, 4x2, DRW, cab-to-axle 60 in, wheelbase 145.3 in, bare cab-and-chassis
- Authority class: OWNER_LOCKED_REFERENCE_CONFIG (candidate nominal geometry — **not** physical donor metrology)
- Status: Unverified — actual front axle weight, actual rear axle weight, exact applicable GVWR, and physical frame geometry / mounting envelope remain open. ODR-004 … ODR-007 must **not** be replaced with broad model-family values.
- Used by: ODR-004 … ODR-007; mass ledger; packaging study

## SC-020 — Webasto draft values explicitly NOT promoted by the Platform 001 baseline

- Recorded: 2026-08-08
- Source: prior draft/candidate material retained at `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` and the research batches under `docs/research/raw/research_hunter/`
- Authority class: none — unsupported by the reviewed current public material
- Status: **Withdrawn** — recorded here so the prior values remain traceable and cannot be silently reintroduced. Withdrawn set: 350 V nominal; 300–400 V operating range; 35 kWh gross / ~30.8 kWh usable; 96S configuration; 150 A fixed continuous discharge; 300 A fixed 10-second discharge; 100 A continuous charge; J1939 at 250 kbps; integrated pyrofuse; 15–20 L/min coolant flow; 15–25 kPa coolant pressure drop; 35 C maximum coolant inlet temperature; 960 x 780 x 310 mm; 290 kg. Each may return only with a separate applicable source recorded as its own claim.
- Used by: supersession lineage for SC-001 … SC-014; D-033

## SC-021 — Dana draft values explicitly NOT promoted by the Platform 001 baseline

- Recorded: 2026-08-08
- Source: prior draft/candidate material retained at `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` and the research batches under `docs/research/raw/research_hunter/`
- Authority class: none — not established as exact component facts by the reviewed current public material
- Status: **Withdrawn** — recorded so the prior values remain traceable. Withdrawn set: 650 uF DC-link capacitance; 20 L/min coolant flow requirement; 85 C thermal-trip threshold; J1939 250/500 kbps configuration; proprietary torque-request PGN/SPN map; exact precharge completion threshold/timing; exact internal DC-link precharge responsibility; generic 125 kg SUMO MD motor mass; generic 22 kg inverter mass.
- Used by: supersession lineage for SC-016 … SC-018; D-033; blocks the Phase E precharge calculation (C is not established)

## SC-022 — Dana TM4 SUMO MD variant performance table (verbatim, ten variants)

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` — Dana TM4 official public specification sheet, document ID
  `CORTM4-JRT2495-SUMOMD-0124`, © 2024 Dana TM4 Inc., page 2, archived at
  `docs/research/raw/platform001_primary_sources/SRC-DANA-000001_CORTM4-JRT2495-SUMOMD-0124.pdf`
  (sha256 `e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28`)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published; no unit measured)
- Claim — reproduced exactly as published, one row per exact variant, never blended:

  | System | Casing Size | Inverter | Peak Power | Continuous Power | Peak Torque | Continuous Torque | Max Operating Speed | Voltage Range |
  |---|---|---|---|---:|---:|---:|---:|---|
  | SUMO MD MV2500-6P* | L2 | CO200 | 230 kW | 115 kW | 2500 Nm | 1140 Nm | 3000 RPM | 130-450 Vdc |
  | SUMO MD HV1800-3P | L1 | CO150 | 170 kW | 100 kW | 1775 Nm | 680 Nm | 3250 RPM | 300-750 Vdc |
  | SUMO MD HV2200-3P | L2 | CO150 | 215 kW | 145 kW | 2430 Nm | 1275 Nm | 2700 RPM | 300-750 Vdc |
  | SUMO MD HV2200-3P** NEW | L2 | CO150 | 200 kW | 145 kW | 2200 Nm | 955 Nm | 2700 RPM | 300-800 Vdc |
  | SUMO MD HV2200-6P | L2 | CO200 | 255 kW | 190 kW | 2355 Nm | 990 Nm | 3700 RPM | 300-750 Vdc |
  | SUMO MD HV2400-6P | L1 | CO200 | 240 kW | 120 kW | 2300 Nm | 605 Nm | 3500 RPM | 300-750 Vdc |
  | SUMO MD HV2600-6P | L2 | CO200 | 265 kW | 155 kW | 2760 Nm | 970 Nm | 3500 RPM | 300-750 Vdc |
  | SUMO MD HV2800-6P** NEW | L2 | CO200 | 300 kW | 180 kW | 2860 Nm | 1050 Nm | 3500 RPM | 300-800 Vdc |
  | SUMO MD HV3000-6P | L2 | CO200 | 235 kW | 145 kW | 3100 Nm | 1055 Nm | 3000 RPM | 300-750 Vdc |
  | SUMO MD HV3300-6P** NEW | L2 | CO200 | 235 kW | 130 kW | 3320 Nm | 960 Nm | 3000 RPM | 300-800 Vdc |

- Used by: exact-variant evaluation; supersedes SC-018's family maxima as the governing
  source for per-variant figures. SC-018 remains valid as a family-level statement only.

## SC-023 — Dana SUMO MD published rating conditions for the SC-022 table

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` page 2 footnote, verbatim: `600 Vdc, 45°C / *350 Vdc, 45°C / **650 Vdc, 45°C`
  and `Specifications are subject to change`
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Claim: the SC-022 figures are stated **at a specific DC voltage and 45 °C**. Unmarked rows
  are rated at 600 Vdc; the `*` row (MV2500-6P) at 350 Vdc; the `**` rows (HV2200-3P NEW,
  HV2800-6P NEW, HV3300-6P NEW) at 650 Vdc. **The published power and torque values do not
  transfer to operation at a materially different DC voltage.**
- Used by: every compatibility evaluation against the Webasto pack voltage window

## SC-024 — Dana SUMO MD motor casing dimensions and masses

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` page 2 dimension figure (confirmed by rendered page inspection)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published; not confirmed by NONENERGIZED_PHYSICAL_METROLOGY)
- Claim: casing L1 length 426 mm, mass 180 kg. Casing L2 length 510 mm, mass 225 kg.
  Motor diameter Ø 400 mm (both casings).
- Used by: ODR-008 (motor dimensions), ODR-009 (motor mass), mass ledger, packaging study

## SC-025 — Dana SUMO MD inverter dimensions and masses

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` page 2 dimension figure (confirmed by rendered page inspection)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Claim: inverter CO150 — 432 mm x 304 mm x 111 mm, 13 kg. Inverter CO200 — 676 mm x 450 mm
  x 135 mm, 25 kg.
- Used by: packaging study; mass ledger. Supersedes the withdrawn generic 22 kg inverter
  mass (SC-021)

## SC-026 — Dana SUMO MD published standards, protection and cooling

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` page 1, verbatim
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Claim: system protection IP67 / IP6K9K; automotive components AEC-Q100 / AEC-Q101 /
  AEC-Q200; EMC to main automotive international standards; shock and vibration GMW3172
  sprung masses; **maximum coolant inlet temperature 65 °C**; **coolant type 40/60
  water-glycol**.
- Used by: cooling package framework. Supersedes the withdrawn 85 °C thermal-trip value
  (SC-021). **Coolant flow rate and pressure drop are NOT published** and remain UNKNOWN —
  the withdrawn 20 L/min figure is not reinstated.

## SC-027 — Dana SUMO MD published motor, inverter and system features

- Recorded: 2026-08-08
- Source: `SRC-DANA-000001` pages 1-2, verbatim
- Authority class: OFFICIAL_PUBLIC_DOCUMENT
- Status: Unverified (published)
- Claim: permanent magnet motor, outer rotor topology, four-quadrant operation, designed to
  interface directly with standard axles (no gearbox required). Inverter: 3-phase or 6-phase
  high-voltage, variable switching frequency, Reflex(TM) gate driver technology, EMI filter.
  Latest system features marked NEW: voltage increase 750 V to 800 V; Quick Connect with
  HVIL; increased performance range; KITAS option on demand.
- Used by: driveline interface study; Gate 05 interlock work (HVIL). **Communications /
  control protocol, CAN bit rate, torque-command map, DC-link capacitance, efficiency map
  and DC input current are NOT published in this document** and remain UNKNOWN.
