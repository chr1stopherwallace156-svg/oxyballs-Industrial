# DIMENSION_DATABASE.md — L00 Canonical Dimensions

**Status:** BLOCKED — platform not locked. See [CONFIGURATION_RECONCILIATION.md](CONFIGURATION_RECONCILIATION.md).

**Rule:** No dimension may be used for modeling until `verification_status` = VERIFIED with OEM page/table citation for the **locked** configuration.

## Field definitions

| Field | Description |
|-------|-------------|
| `dimension_id` | Stable ID |
| `description` | Human label |
| `value` | Numeric or null |
| `unit` | in, mm, gal, lb, etc. |
| `configuration` | Platform + cab + WB + drive — must match locked reference |
| `source_document` | Full document title |
| `page` | Page or section |
| `table` | Table name or code |
| `verification_status` | VERIFIED \| UNVERIFIED \| RESEARCH_REQUIRED \| CONFLICT |
| `confidence` | high \| medium \| low |
| `physical_measurement_status` | not_measured \| scheduled \| measured |

---

## Platform A — F-450 Chassis Cab, Regular Cab DRW 4×2, 145.3 in WB (Candidate C1 — not locked)

| dimension_id | description | value | unit | configuration | source_document | page | table | verification_status | confidence | physical_measurement_status |
|--------------|-------------|------:|------|---------------|-----------------|------|-------|---------------------|------------|----------------------------|
| DIM-C1-WB | Wheelbase | 145.3 | in | 2019 F-450 CC Reg Cab DRW 4×2 | 2019 F-350/F-450/F-550 SD Chassis Cabs - Specs | Dimensions/Weights | Regular Cab Chassis Cab — Code A | VERIFIED | high | not_measured |
| DIM-C1-CA | Cab-to-axle (back-of-cab to rear axle center) | 60 | in | same | same | Dimensions/Weights | Regular Cab Chassis Cab | VERIFIED | high | not_measured |
| DIM-C1-AFX | Aft-axle frame extension | 42.2 | in | same | same | Dimensions/Weights | Footnote (3) | VERIFIED | high | not_measured |
| DIM-C1-OL | Overall length | 230.7 | in | same | same | Dimensions/Weights | Code E | VERIFIED | high | not_measured |
| DIM-C1-GVWR | Maximum GVWR | 16500 | lb | F-450 chassis cab class | same | Weight Ratings | Vehicle Class Ratings | VERIFIED | high | not_measured |
| DIM-C1-WIDTH-MIR | Width with mirrors | 105.9 | in | F-450 CC Reg Cab DRW | same | Dimensions/Weights | Width with Mirrors | VERIFIED | high | not_measured |
| DIM-C1-FUEL-AFT | Fuel tank aft-of-axle (standard) | 40.0 | gal | Reg Cab CC | same | Dimensions/Weights | Fuel tank table | VERIFIED | high | not_measured |
| DIM-C1-FUEL-MID | Fuel tank midship (optional 65C) | 26.5 | gal | DRW 6.7L diesel | same | Dimensions/Weights | Fuel tank table | VERIFIED | high | not_measured |
| DIM-C1-FRONT-OH | Front overhang | null | in | same | same | — | — | RESEARCH_REQUIRED | — | not_measured |
| DIM-C1-REAR-OH | Rear overhang | null | in | same | same | — | — | RESEARCH_REQUIRED | — | not_measured |
| DIM-C1-TRACK-F | Front track width | null | in | same | same | — | — | RESEARCH_REQUIRED | — | not_measured |
| DIM-C1-TRACK-R | Rear track width | null | in | same | same | — | — | RESEARCH_REQUIRED | — | not_measured |
| DIM-C1-FRAME | Frame rail section | null | — | same | BBLB | — | — | RESEARCH_REQUIRED | — | not_measured |

---

### Engineering Impact (C1 entries above)

This affects:
- Exterior Geometry
- Wheel Placement
- Fender Width
- Steering Geometry
- Suspension Modeling
- Camera Collision
- Future Battery Packaging

Does NOT currently affect:
- Telemetry
- Wiring
- Diagnostics

### Applicability

Applies To:
- 2019 Ford F-450
- Regular Cab
- DRW
- 4×2

Not Applicable To:
- F-350
- Pickup configurations that do not match the above
- Crew Cab configurations
- Other model years unless separately verified

---

## Platform B — F-250/F-350 Regular Cab Pickup 141.6 in WB (OEM reference — not provisional lock)

*Included because 141.6 in + 8 ft bed is documented here; **do not apply to F-450 without confirmation**.*

| dimension_id | description | value | unit | configuration | source_document | page | table | verification_status | confidence | physical_measurement_status |
|--------------|-------------|------:|------|---------------|-----------------|------|-------|---------------------|------------|----------------------------|
| DIM-P350-WB | Wheelbase | 141.6 | in | F-350 Reg Cab pickup | 2018 F-250/F-350/F-450 Super Duty Pickups | Configurations | Code A | VERIFIED | high | not_measured |
| DIM-P350-BCA | Back-of-cab to rear axle | 56.1 | in | F-350 Reg Cab pickup 8 ft | same | Configurations | Config table | VERIFIED | high | not_measured |
| DIM-P350-OL | Overall length | 231.8 | in | F-350 Reg Cab pickup | same | Exterior Dimensions | Code E | VERIFIED | high | not_measured |
| DIM-P350-FOH | Front overhang | 38.2 | in | same | same | Exterior Dimensions | Code B | VERIFIED | high | not_measured |
| DIM-P350-ROH | Rear overhang | 52.0 | in | same | same | Exterior Dimensions | Code C | VERIFIED | high | not_measured |

---

## Platform C — F-450 Pickup Crew Cab DRW 176.0 in WB (Candidate P2 — OEM confirmed, not provisional lock)

| dimension_id | description | value | unit | configuration | source_document | page | table | verification_status | confidence | physical_measurement_status |
|--------------|-------------|------:|------|---------------|-----------------|------|-------|---------------------|------------|----------------------------|
| DIM-P450CC-WB | Wheelbase | 176.0 | in | F-450 pickup Crew Cab DRW | 2018 F-250/F-350/F-450 Super Duty Pickups | Configurations | F-450 row | VERIFIED | high | not_measured |
| DIM-P450CC-GVWR | Max GVWR | 14000 | lb | F-450 DRW pickup Crew Cab 6.7L | same | Weight Ratings | F-450 DRW Styleside Pickup | VERIFIED | high | not_measured |

---

## Platform D — Provisional spec (F-450 Reg Cab pickup 141.6 in) — CONFLICT

| dimension_id | description | value | unit | configuration | source_document | page | table | verification_status | confidence | physical_measurement_status |
|--------------|-------------|------:|------|---------------|-----------------|------|-------|---------------------|------------|----------------------------|
| DIM-PROV-WB | Wheelbase | 141.6 | in | 2019 F-450 Reg Cab pickup (provisional) | KBB 2019 F-450 Regular Cab specs | web | — | CONFLICT | low | not_measured |
| DIM-PROV-WB-OEM | F-450 pickup Regular Cab in OEM table | null | in | F-450 pickup | 2018 Super Duty Pickups | Configurations | F-450 row | CONFLICT | high | not_measured |

**Conflict note:** OEM pickup configuration table does not list F-450 Regular Cab; only Crew Cab 176.0. KBB claims Regular Cab 141.6 exists for 2019. **Do not use provisional dimensions for modeling.**

---

## Import policy (per owner instruction)

Do **not** bulk-import BBAS tables. Add rows only when:

1. Configuration is owner-locked, and  
2. Row includes full applicability tag, and  
3. Source page/table is recorded.

---

## Candidate: Front Suspension Geometry (C1) — Research scaffold

Status: RESEARCH_REQUIRED (no values used for modeling)  
Sources (to confirm):  
- Ford Body Builder Advisory Service (BBAS) — 2019 Super Duty Chassis Cab Specs & Body Application Guide (official BBAS copy)  
- Ford Super Duty Order Guide (2019) — Mechanical & Suspension specs (official)  
- Ford OEM Service Manual (2019) — Front Suspension & Alignment Standards (official)

Applicability:
- 2019 Ford F-450 Regular Cab DRW 4×2 (Chassis Cab — Candidate C1)

Engineering Impact:
- Affects Exterior Geometry, Wheel Placement, Fender Width, Steering Geometry, Suspension Modeling, Camera Collision, Future Battery Packaging
- Does NOT currently affect Telemetry, Wiring, Diagnostics

Parameters (candidate — not verified for modeling):

| parameter_id | description | candidate_value | unit | source_document | page/table | verification_status | notes |
|--------------|-------------|----------------:|------|-----------------|-----------|---------------------|-------|
| C1-TRACK-F | Front track width | 74.8 | in | BBAS Layout Book (to be archived) | — | RESEARCH_REQUIRED | Wide-track claim appears in multiple references; confirm against 2019 CC specs |
| C1-FRAME-F-WIDTH | Frame rail width (front) | 34.2 | in | BBAS Chassis Cab Specs | — | RESEARCH_REQUIRED | Confirm section and datum definition |
| C1-FOH | Front overhang | 38.3 | in | BBAS Dimension Matrix | — | RESEARCH_REQUIRED | Pickup vs chassis-cab overhang definitions differ; confirm CC value |
| C1-WHEEL | Standard wheel size | 19.5×6.0 | in | 2019 Order Guide | — | RESEARCH_REQUIRED | Confirm for F-450 CC Reg Cab DRW 4×2 |
| C1-TIRE | Standard tire spec | 225/70R19.5G | — | 2019 Order Guide | — | RESEARCH_REQUIRED | Confirm load index and OEM line code |
| C1-FGAWR-STD | Front GAWR (std) | 5250 | lb | 2019 Chassis Cab Specs | — | RESEARCH_REQUIRED | Range depends on spring code; verify exact for chosen configuration |
| C1-FGAWR-HD | Front GAWR (max package) | 7500 | lb | 2019 Chassis Cab Specs | — | RESEARCH_REQUIRED | Verify package code and availability for 4×2 DRW Reg Cab |

Discrepancies to watch:
- Twin‑I‑Beam vs Monobeam claims on third-party sites — F‑450 CC 4×2 uses monobeam front axle (to verify from OEM)
- Track width confusion with F‑350 values — ensure F‑450 CC table is used
