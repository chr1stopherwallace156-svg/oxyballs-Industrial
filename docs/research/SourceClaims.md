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

## SC-028 — Published weight ratings for the Platform 001 configuration (F-450 DRW Chassis Cab, Reg. Cab, 4x2, 145.3 in WB)

- Recorded: 2026-08-08
- Source: `SRC-CAND-000010` (2019 F-350/F-450/F-550 Super Duty Chassis Cabs, Ford fleet
  specification printout; archived at
  `elektron-digital-twin-foundation/research/incoming/chassis_frame_ab/`, sha256
  `7a92e4ea839a3a7d163e2c374e6cfde0a24d277e1ee40013217cc6b3cab9c030`), page 28, table
  "F-450 DRW Chassis Cab > Weight Ratings", row `Reg. Cab 4x2 — 145.3`
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT — see note)
- Status: Unverified (published)
- Claim, 6.8L V10 gas: Max. GVWR 16,500 / 16,000 / 15,000 lbs; Max. payload 9,850 /
  9,350 / 8,350 lbs; Max. std. GAWR front 4,800 lbs, rear 12,880 lbs; base curb weight
  front 3,672 lbs, rear 2,969 lbs, total 6,641 lbs.
  6.7L Power Stroke diesel: Max. GVWR 16,500 / 16,000 / 15,000 lbs; Max. payload 9,110 /
  8,610 / 7,610 lbs; Max. std. GAWR front 5,200 lbs, rear 12,880 lbs; base curb weight
  front 4,254 lbs, rear 3,136 lbs, total 7,390 lbs.
- Note (provenance): the archived byte stream was retrieved from a third-party CDN mirror
  of Ford's `dealerconnection` printable spec pages, not from a ford.com URL. The sha256
  fixes the archived artifact and is not the digest of Ford's own hosted file.
- Note (scope): these are **model-configuration** values. They do **NOT** close ODR-004
  (donor front axle weight), ODR-005 (donor rear axle weight) or ODR-006 (donor GVWR),
  which still require a door-jamb label reading or calibrated scale measurement per the
  Platform 001 baseline instruction not to replace ODR-004…ODR-007 with model-family
  values.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-02; mass budget envelope

## SC-029 — F-450 DRW axle component ratings are distinct from the standard GAWRs

- Recorded: 2026-08-08
- Source: `SRC-CAND-000010` pages 55 and 57 (Front Axle Specifications — 4x2; Rear Axle
  Specifications); `SRC-CAND-000011` page 21 (Mechanical, "Max. Axle rating @ ground")
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT)
- Status: Unverified (published)
- Claim: F-450 DRW maximum axle rating @ ground is 7,000 lbs front and 13,660 lbs rear.
  The F-450/F-550 4x2 front axle is a Dana forged-steel monobeam, spring centres 46.45 in,
  listed at 7,000/7,500 lbs. The rear axle is a **Dana M300**, full-floating, SPL-55 end
  yoke, cast-centre housing, 4.5 in tube diameter, 11.8 in ring-gear pitch diameter,
  13,660 lbs max rating @ ground.
- Note: these component ratings are **not** the GAWRs in SC-028. Standard GAWR is
  spring/tyre/wheel-limited for the configuration (4,800 or 5,200 lbs front, 12,880 lbs
  rear); the axle rating is a component limit. The brochure's "class-best 7,500 lbs.
  front GAWR" refers to an upgraded front spring/GAWR package, not to the standard
  145.3 in Reg. Cab 4x2 configuration.
- Note: the M300 **maximum input torque rating is NOT published** in either source and
  remains UNKNOWN — filed as ODR-017.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-03, screening gate S4

## SC-030 — F-450 DRW 4x2 Regular Cab available final-drive ratios and ICE GCWR

- Recorded: 2026-08-08
- Source: `SRC-CAND-000011` (2019 Super Duty Chassis Cab brochure; archived at
  `elektron-digital-twin-foundation/research/incoming/chassis_frame_ab/`, sha256
  `f71e9eebf97ebe4f90ab5aaa5d780504e73df63d5008a7f5af8e4e35c8c6589f`), page 21,
  5th-Wheel Towing table, Regular Cab rows, `F-450 DRW 4x2` column; corroborated by
  `SRC-CAND-000010` page 55 (available ratios 4.10 / 4.30 / 4.88)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT — Skeeter Emergency
  Vehicles mirror of the Ford brochure)
- Status: Unverified (published)
- Claim: 6.8L 3-valve gas V10 — axle ratio 4.88, GCWR 28,000 lbs, max loaded 5th-wheel
  trailer 20,600 lbs. 6.7L Power Stroke diesel — axle ratio 4.10, GCWR 32,000 lbs,
  trailer 23,900 lbs; axle ratio 4.30, GCWR 34,500 lbs, trailer 26,400 lbs.
- Note: the GCWR and trailer figures are **ICE ratings for the Ford powertrain**. They do
  not transfer to a converted powertrain and must not be carried forward as a conversion
  requirement. The claim is used here only to establish which final-drive ratios exist for
  this chassis.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-04, DR-M-01, DR-OD-11

## SC-031 — F-450 Chassis Cab standard wheel and tyre, with static loaded radius

- Recorded: 2026-08-08
- Source: `SRC-CAND-000010` page 50 (F-450 Chassis Cab standard equipment — Tires/Wheels)
  and page 64 (Tire Specifications)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT)
- Status: Unverified (published)
- Claim: six 225/70Rx19.5G steel-belted radial all-season BSW tyres on six 19.5 in x 6 in
  10-hole steel disc wheels. Tyre specification (Continental, A/S-BSW and Traction-BSW):
  rim width 6.0 in, section width 8.7 in, load limits at maximum inflation pressure
  3,970 / 3,750 lbs (single rear wheel / dual rear wheel), **static loaded radius
  15.00 in**.
- Note: **rolling radius and revolutions-per-mile are NOT published** and remain UNKNOWN —
  filed as ODR-014. Static loaded radius is not the same quantity.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-05, DR-M-01, DR-M-02

## SC-032 — F-450 145.3 in wheelbase frame data

- Recorded: 2026-08-08
- Source: `SRC-CAND-000011` page 21 (Frames; Brakes; Wheels)
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT)
- Status: Unverified (published)
- Claim: section modulus 12.7 cu in (cross-sectional modulus calculated at back of cab);
  frame-rail yield strength 50,000 psi; maximum side-rail section (height x width x
  thickness, measured to inside of metal) 7.50 in x 2.74 in x 0.32 in for F-450/F-550 at
  145.3 in wheelbase; 7 crossmembers at 145.3 in wheelbase. Brake rotor diameter
  15.39 in front / 15.74 in rear; lining area 68.8 / 64.8 sq in. Wheels: 10 studs,
  8.85 in bolt-circle diameter.
- Note: nominal published geometry. Does **NOT** close ODR-007 (physical frame geometry
  measurement of the donor).
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-06, screening gate S6

## SC-033 — The Platform 001 configuration is a Class 5 vehicle

- Recorded: 2026-08-08
- Source: `SRC-CAND-000010`, vehicle class table — class 5 covers 16,001 to 19,500 lbs and
  lists "F-450 Chassis Cab (16,500 lbs.)"
- Authority class: OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT)
- Status: Unverified (published)
- Claim: the F-450 Chassis Cab at 16,500 lbs GVWR is a Class 5 vehicle.
- Note: this places Platform 001 inside the Dana SUMO MD stated application range of
  Class 4-7 (SC-016), which is a necessary condition and **not** a variant-selection
  criterion.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-E-02

## SC-034 — Derived motor-speed to road-speed relation for Platform 001 (calculation, not a published figure)

- Recorded: 2026-08-08
- Source: DERIVED from SC-017 (direct axle interface, no gearbox), SC-022 (per-variant
  maximum speed), SC-030 (available final-drive ratios) and SC-031 (static loaded radius)
- Authority class: DERIVED_CALCULATION
- Status: Unverified (derived)
- Claim: `v [mph] = (n_motor / i_axle) * (2*pi*r_roll[in]/12) * 60 / 5280`. With
  `r_roll = 15.00 in`, the constant is 0.089250 mph per axle-shaft RPM. Resulting maxima
  (motor max speed x ratio): 2,700 RPM -> 58.8 / 56.0 / 49.4 mph; 3,000 RPM -> 65.3 /
  62.3 / 54.9 mph; 3,250 RPM -> 70.7 / 67.5 / 59.4 mph; 3,500 RPM -> 76.2 / 72.6 /
  64.0 mph; 3,700 RPM -> 80.5 / 76.8 / 67.7 mph, for i = 4.10 / 4.30 / 4.88 respectively.
- **Stated assumption, not evidence:** rolling radius is set equal to the published static
  loaded radius. Ford does not publish rolling radius or revolutions-per-mile for this
  tyre (ODR-014). Dynamic rolling radius is normally slightly larger than SLR, so these
  figures are expected to be mildly conservative, but the margin is UNKNOWN and is not
  asserted. A variant must not be rejected on a margin of a few mph until ODR-014 closes.
- Used by: `PLATFORM_001_DUTY_REQUIREMENT_v0.1.md` DR-M-01, screening gate S2

## SC-035 — Platform 001 owner design requirements v0.1

- Recorded: 2026-08-08
- Source: owner-issued design requirements for Platform 001, adopted verbatim
- Authority class: OWNER_DESIGN_REQUIREMENT
- Status: Adopted (owner-issued target, not a measurement and not a derivation)
- Claim: `TARGET_GVWR` = 16,000 lb; `TOWING_REQUIREMENT` = `NONE_FOR_PLATFORM_001_V1`;
  `MAXIMUM_ROAD_SPEED_TARGET` = 70 mph; `SUSTAINED_HIGHWAY_SPEED_TARGET` = 65 mph;
  `SUSTAINED_GRADE` = 6 % @ 55 mph for 20 minutes; `LOW_SPEED_GRADE` = 15 % @ 15 mph;
  `STARTABILITY_GRADE` = 20 %.
- Note: 16,000 lb is a published rung of the GVWR ladder for this configuration (SC-028),
  so the target is documentarily supported. It does **NOT** close ODR-006 — the donor's
  label GVWR remains unmeasured.
- Note: a duration is stated only for `SUSTAINED_GRADE`. `LOW_SPEED_GRADE` carries none and
  is therefore evaluated against both the continuous and the peak rating.
- Note: this partially resolves ODR-012. Payload target, drive-cycle basis and ambient
  envelope are still not stated — see the ODR-012 entry.
- Used by: `PLATFORM_001_DANA_VARIANT_SCREENING_v0.1.md`; D-035

## SC-036 — Road-load sensitivity band for Platform 001 screening (NOT EVIDENCE)

- Recorded: 2026-08-08
- Source: none — no archived source establishes any of these for Platform 001
- Authority class: **SENSITIVITY_BAND_NOT_EVIDENCE**
- Status: Provisional band, ODR-015 remains Open
- Claim: for screening only, results are carried as ranges across `Cr` 0.006–0.010,
  `Cd x A` 2.4–4.3 m2 (frontal area 4.0–4.8 m2, `Cd` 0.6–0.9), driveline efficiency
  0.90–0.96, air density 1.225 kg/m3 at sea level.
- **These are bands, not values.** They must never be cited as engineering values,
  promoted to any other authority class, used to close a gate, or written into
  `engine/src/platform/platform001.ts`. They exist so that screening reports a range
  instead of inventing a point. Closing ODR-015 replaces the band with a measurement.
- Note: the frontal-area band is wide because the body is unspecified (DR-OD-03), and the
  altitude assumption is unbacked because the ambient envelope is unstated (DR-OD-10).
- Used by: `PLATFORM_001_DANA_VARIANT_SCREENING_v0.1.md` §2.3

## SC-037 — Derived Platform 001 duty-point requirements at 16,000 lb

- Recorded: 2026-08-08
- Source: DERIVED from SC-035 (duty points), SC-030 (ratios), SC-031 (static loaded
  radius), SC-017 (direct axle interface, no gearbox), and the SC-036 sensitivity band
- Authority class: DERIVED_CALCULATION
- Status: Unverified (derived); range-valued pending ODR-014 and ODR-015
- Claim, required shaft power: D1 (6 % @ 55 mph) **142.9–179.4 kW**; D2 (15 % @ 15 mph)
  77.2–84.8 kW; D3 (20 % startability) 13.4–14.6 kW; D4 (65 mph level) 50.5–94.8 kW;
  D5 (70 mph level) 60.8–114.4 kW.
  Required motor torque at D1: 540–678 Nm (i=4.10), 515–646 Nm (4.30), 454–570 Nm (4.88).
  At D3: 1,392–1,513 Nm (4.10), 1,327–1,443 Nm (4.30), 1,169–1,272 Nm (4.88).
  Required motor speed at D5: 3,216 / 3,373 / 3,827 rpm for i = 4.10 / 4.30 / 4.88 on the
  static-loaded-radius basis.
- **Key structural property: D1 shaft power is ratio-independent.** No choice of final-drive
  ratio can repair a continuous-power shortfall.
- Note: rolling radius is bounded by `0.3810 m <= r_roll <= 0.4051 m`, the upper end being
  the unloaded radius implied by the governed 225/70R19.5 designation (a +6.34 % span).
  Speed results are reported at both ends and no candidate is failed on a margin inside it.
- Used by: `PLATFORM_001_DANA_VARIANT_SCREENING_v0.1.md` §3, screening gates S2–S5
