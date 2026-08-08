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
