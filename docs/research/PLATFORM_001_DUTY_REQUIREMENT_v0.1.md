# PLATFORM 001 — DUTY REQUIREMENT v0.1

| Field | Value |
|---|---|
| Document | `PLATFORM_001_DUTY_REQUIREMENT_v0.1` |
| Status | **DRAFT — OWNER DECISIONS OPEN.** Not a governed requirement until §4 is answered and the result is accepted. |
| Purpose | Supply the missing input to ODR-012 so the ten provenance-locked SUMO MD variants can be ranked against something other than "Class 4–7". |
| Reference configuration | SC-019 (`OWNER_LOCKED_REFERENCE_CONFIG`) |
| Chassis evidence | SC-028 … SC-034 (this document), from `SRC-CAND-000010` / `SRC-CAND-000011` |
| Pack evidence | SC-001 … SC-015 (Webasto Standard Battery Pro 40) |
| Motor evidence | SC-022 … SC-027 (`SRC-DANA-000001`) |
| Decision | D-034 |
| Selects a motor | **NO** |

**What this document is.** A duty requirement states what the converted vehicle must
*do*. It is the criterion the SUMO MD variants get measured against. Until it exists, a
choice between a 100 kW / 1775 Nm variant and a 190 kW / 3320 Nm variant is a preference,
not an engineering decision.

**What this document is not.** It selects no motor, no pack count, no topology, no cable,
fuse, contactor, precharge resistor, PDU, pump, radiator, chiller, and no mounting
geometry. It hard-codes nothing into `engine/src/platform/platform001.ts`. It does not
close ODR-004 … ODR-007: everything below drawn from Ford publications is a
**model-configuration** value, never a measurement of the exact donor.

---

## 1. Structure of this document

The parameters a duty requirement needs fall into exactly three classes, and this
document keeps them apart on purpose:

| Class | Meaning | Where |
|---|---|---|
| `DR-E-nn` | **Evidence-derived.** Fixed by an archived primary source or by calculation from one. No owner choice involved. | §3 |
| `DR-OD-nn` | **`OWNER_DECISION_REQUIRED`.** Cannot be derived from any evidence in this repository. Presented as a question with its evidence-bounded option space. Never guessed. | §4 |
| `DR-M-nn` | **Method.** The relation that converts §3 + §4 into a per-variant verdict. Stated now so the later evaluation is mechanical rather than narrative. | §5 |

An unanswered `DR-OD` does not become a default. It propagates as `INDETERMINATE`
through §6 and blocks whichever screening gate depends on it.

---

## 2. Primary sources used for the chassis side

Both were already archived in this repository with acquisition manifests. Digests
recomputed from the archived bytes on 2026-08-08; both match their manifests.

| Source ID | Document | sha256 | Bytes |
|---|---|---|---|
| `SRC-CAND-000010` | 2019 F-350/F-450/F-550 Super Duty Chassis Cabs — Ford fleet specification printout | `7a92e4ea839a3a7d163e2c374e6cfde0a24d277e1ee40013217cc6b3cab9c030` | 3,179,008 |
| `SRC-CAND-000011` | 2019 Super Duty Chassis Cab brochure | `f71e9eebf97ebe4f90ab5aaa5d780504e73df63d5008a7f5af8e4e35c8c6589f` | 4,372,621 |

**Provenance caveat — same discipline as `SRC-DANA-000001`.** Neither archived byte
stream was retrieved from a ford.com URL. `SRC-CAND-000010` came from a third-party CDN
mirror of Ford's `dealerconnection` printable spec pages; `SRC-CAND-000011` came from a
Skeeter Emergency Vehicles mirror of the Ford brochure. The content carries Ford
authorship and the `ford.com` footer, and the figures are internally consistent across
the two independent mirrors — which is the strongest cross-check available without
network access. The SHA-256 values fix the *archived artifacts* and must not be presented
as digests of Ford's own hosted files. Authority is therefore recorded as
`OFFICIAL_PUBLIC_DOCUMENT (MIRRORED ARTIFACT)`.

---

## 3. Evidence-derived envelope (`DR-E`)

### DR-E-01 — Vehicle configuration

From SC-019, unchanged: 2019 Ford F-450 Super Duty Chassis Cab, Regular Cab, 4x2, DRW,
cab-to-axle 60 in, wheelbase 145.3 in, bare cab-and-chassis.
Authority: `OWNER_LOCKED_REFERENCE_CONFIG` — candidate nominal geometry, **not** donor
metrology.

### DR-E-02 — Published weight ratings for this exact configuration

`SRC-CAND-000010` p.28, table "F-450 DRW Chassis Cab › Weight Ratings", row
**Reg. Cab 4x2 — 145.3**. Recorded as SC-028.

| | 6.8L V10 gas | 6.7L Power Stroke diesel |
|---|---:|---:|
| Max. GVWR std./avail. (lbs.) | 16,500 / 16,000 / 15,000 | 16,500 / 16,000 / 15,000 |
| Max. payload std./avail. (lbs.) | 9,850 / 9,350 / 8,350 | 9,110 / 8,610 / 7,610 |
| Max. std. GAWR — front (lbs.) | 4,800 | 5,200 |
| Max. std. GAWR — rear (lbs.) | 12,880 | 12,880 |
| Base curb weight — front (lbs.) | 3,672 | 4,254 |
| Base curb weight — rear (lbs.) | 2,969 | 3,136 |
| Base curb weight — total (lbs.) | **6,641** | **7,390** |

Vehicle class: **Class 5** (16,001–19,500 lbs), listed as "F-450 Chassis Cab (16,500
lbs.)" — SC-033.

**This does not close ODR-004 / ODR-005 / ODR-006.** These are published figures for the
configuration. The donor's actual front and rear axle weights and its label GVWR remain
open and require a door-jamb label reading or a calibrated scale measurement. The
baseline's instruction — "Do not replace ODR-004 through ODR-007 with broad model-family
values" — is honoured: the table above is an *envelope for requirement-setting*, not a
substitute for donor metrology.

### DR-E-03 — GAWR is not the axle's component rating

Two different limits appear in the sources and must not be conflated (SC-029):

| Limit | Front | Rear |
|---|---:|---:|
| Max. **standard GAWR** (spring / tyre / wheel–limited, as configured) | 4,800 lbs (gas) · 5,200 lbs (diesel) | 12,880 lbs |
| Max. **axle rating @ ground** (component rating, F-450 DRW) | 7,000 lbs | 13,660 lbs |

Rear axle: **Dana M300**, full-floating, SPL-55 end yoke, cast-centre housing, 4.5 in tube
diameter, 11.8 in ring-gear pitch diameter (`SRC-CAND-000010` p.57). Front axle on 4x2
F-450: Dana monobeam, forged steel, 46.45 in spring centres (p.55). The brochure's
"class-best 7,500 lbs. FGAWR" refers to an upgraded front spring/GAWR package, not to the
145.3 in Reg. Cab 4x2 standard configuration in DR-E-02.

Consistency check on the published figures: 4,800 + 12,880 = 17,680 ≥ 16,500 GVWR, which
matches the source's own note that front and rear GAWRs sum to at least the GVWR.

### DR-E-04 — Available axle ratios and ICE GCWR

`SRC-CAND-000011` p.21, 5th-Wheel Towing table, Regular Cab rows, F-450 DRW 4x2 column
(SC-030):

| Engine | Axle ratio | GCWR (lbs.) | Max. loaded 5th-wheel trailer (lbs.) |
|---|---:|---:|---:|
| 6.8L 3-valve gas V10 | 4.88 | 28,000 | 20,600 |
| 6.7L Power Stroke diesel | 4.10 | 32,000 | 23,900 |
| 6.7L Power Stroke diesel | 4.30 | 34,500 | 26,400 |

The F-450/F-550 front-axle table independently lists available ratios 4.10 / 4.30 / 4.88
(`SRC-CAND-000010` p.55).

**These GCWR figures are ICE ratings.** They describe what the Ford powertrain was
certified to pull. They do **not** transfer to a converted powertrain and may not be
carried forward as a conversion requirement. Their engineering use here is narrower and
legitimate: they establish which final-drive ratios physically exist for this chassis,
which is the term that converts motor speed into road speed (DR-M-01).

### DR-E-05 — Wheel and tyre

Standard on F-450 chassis cab: six **225/70R19.5G** steel-belted radials on six 19.5 × 6
in 10-hole steel disc wheels (`SRC-CAND-000010` p.50). Tyre specification table (p.64),
Continental A/S-BSW and Traction-BSW: **static loaded radius 15.00 in**, section width
8.7 in, rim width 6.0 in, load limits at maximum inflation **3,970 / 3,750 lbs** (single /
dual rear wheel). Recorded as SC-031.

Six dual-rear tyres at 3,750 lbs each give 22,500 lbs of rear tyre capacity — not the
limiting term against the 12,880 lbs rear GAWR.

### DR-E-06 — Frame

`SRC-CAND-000011` p.21 (SC-032): section modulus 12.7 cu in (calculated at back of cab);
frame-rail yield strength 50,000 psi; maximum side-rail section 7.50 × 2.74 × 0.32 in for
the F-450 145.3 in wheelbase; 7 crossmembers at 145.3 in wheelbase. Brakes: 15.39 in front
/ 15.74 in rear rotors, 68.8 / 64.8 sq in lining area. Wheels: 10 studs, 8.85 in bolt
circle.

These are packaging and mounting inputs. They do not replace ODR-007 (physical frame
geometry measurement of the donor).

### DR-E-07 — Traction pack envelope

Governed, unchanged, from SC-001 … SC-015. The terms that bind a duty requirement:

- Installed energy ≈ 40 kWh per pack; 116 Ah; normal operating voltage **333–407 V**.
- Continuous discharge **55 kW** per pack; 10-second peak **112 kW** per pack, at 25 °C,
  SoC dependent.
- Dry mass **297 kg (654.8 lbs)** per pack, before enclosure, mounting, cabling and
  cooling.
- Operating temperature −30 °C to +55 °C; coolant flow 10 L/min; pressure loss < 50 mbar.

### DR-E-08 — Motor envelope

Governed, unchanged, from SC-022 … SC-027 (`SRC-DANA-000001`). Across the ten variants:
continuous power 100–190 kW, peak power 170–300 kW, peak torque 1,775–3,320 Nm,
continuous torque 605–1,275 Nm, maximum speed 2,700–3,700 RPM. Motor mass 180 kg (L1) or
225 kg (L2); inverter 13 kg (CO150) or 25 kg (CO200). Maximum coolant inlet 65 °C;
coolant 40/60 water-glycol. Direct axle interface, no gearbox (SC-017).

### DR-E-09 — Thermal envelope intersection

Pack operating range −30 … +55 °C (SC-011) and Dana maximum coolant **inlet** 65 °C
(SC-026) are not the same quantity and do not yet compose into a system limit: Dana does
not publish coolant flow rate or pressure drop, and Webasto does not publish coolant type
or a maximum inlet temperature. Whether one loop can serve both, or two loops are
required, is **not derivable** — filed as ODR-016.

---

## 4. `OWNER_DECISION_REQUIRED`

Each item states the decision, why it is not derivable, what it unblocks, and — where the
evidence bounds the answer — the admissible option space. **No item below has a default.**

### DR-OD-01 — Target GVWR of the converted vehicle
- **Evidence-bounded options:** 15,000 / 16,000 / 16,500 lbs (the published ladder,
  DR-E-02). A different GVWR is an altered-vehicle certification question, not a
  selection from this list.
- **Not derivable because:** which rating the donor carries is ODR-006, and whether the
  conversion retains, lowers or re-certifies it is a programme decision.
- **Unblocks:** every road-load calculation; the mass budget that caps pack count.

### DR-OD-02 — Donor powertrain identity, and a contradiction that must be resolved
- **The contradiction.** D-006 names the active build direction as **Platform 001A =
  7.3L gas**. SC-019 locks a **2019** F-450. Both archived 2019 sources publish the gas
  engine for this chassis as the **6.8L 3-valve V10**; the 7.3L appears in neither. One
  of the two must give: either the donor is a later model year than SC-019 states, or the
  gas donor is a 6.8L V10 and D-006's engine label is wrong for MY2019.
- **Not derivable because:** resolving it requires knowing the actual donor, not
  reconciling two documents. Recording a guess here would corrupt the mass/CG ledger that
  D-006 exists to protect.
- **Consequences of each branch, from DR-E-02:** gas → 6,641 lbs curb, 4,800 lbs front
  GAWR, 9,850 lbs payload, 4.88 axle. Diesel → 7,390 lbs curb, 5,200 lbs front GAWR,
  9,110 lbs payload, 4.10 or 4.30 axle. The spread is 749 lbs of curb mass and a 19 %
  spread in final-drive ratio — enough to move the answer.
- **Unblocks:** removed-mass ledger tagging (D-006), curb-weight baseline, DR-OD-11.
- Filed as ODR-013.

### DR-OD-03 — Body / upfit mass, distribution and CG
- **Not derivable because:** the donor is a bare cab-and-chassis. No body is specified
  anywhere in `docs/`.
- **Unblocks:** available payload for the HV system; axle-load compliance; CG.

### DR-OD-04 — Is towing required, and if so at what GCWR?
- **Not derivable because:** the ICE GCWR figures in DR-E-04 do not transfer to a
  converted powertrain. A towing requirement for the conversion has to be stated, not
  inherited.
- **Unblocks:** the mass term in every gradeability and continuous-power calculation.
  This is the single largest lever on required continuous power; a 34,500 lbs combination
  is 2.1× the 16,500 lbs solo case.

### DR-OD-05 — Gradeability
Three separate numbers, all required, none derivable:
- **Sustained gradeability:** *X* % grade at *Y* mph at the DR-OD-01 weight (and DR-OD-04
  combination weight, if towing). Sizes **continuous** torque and power.
- **Startability:** maximum grade from standstill, at weight. Sizes **peak** torque.
- **Grade-hold / duration:** how long the sustained grade must be held. This is the term
  that decides whether a variant's *continuous* rating or its *peak* rating is the one
  being tested — and Dana does not publish peak-power duration (SC-022 gap), so an
  assumption cannot be substituted here.

### DR-OD-06 — Top speed and sustained cruise speed
- **Not derivable because:** no speed requirement is recorded anywhere in `docs/`.
- **Unblocks:** DR-M-01. This screens variants directly: with a 4.88 axle, a 2,700 RPM
  variant reaches ~49 mph and a 3,700 RPM variant ~68 mph (§5). A highway requirement
  eliminates variants outright; a vocational one does not.

### DR-OD-07 — Duty cycle / drive-cycle basis
- **Not derivable because:** no drive cycle is recorded. Needs either a named standard
  cycle or a stated profile (average speed, stops per mile, daily distance, idle/PTO
  fraction).
- **Unblocks:** energy consumption, thermal duty, and whether the RMS power over the
  cycle — not the peak — is the sizing case.

### DR-OD-08 — Required continuous-power duration and thermal soak assumption
- **Not derivable because:** it is a mission property, and the pack's 55 kW figure is
  stated at 25 °C and is SoC-dependent (SC-006), so the duration over which it must hold
  is a requirement input, not a datasheet lookup.

### DR-OD-09 — Range and usable SoC window
- **Not derivable because:** no range requirement exists in `docs/`; Webasto publishes
  installed energy (~40 kWh), not usable energy or an allowed depth of discharge.
- **Unblocks:** pack count, which sets both the mass budget and the system power ceiling
  that the motor's continuous rating must fit under.

### DR-OD-10 — Ambient operating envelope
- **Evidence-bounded ceiling:** the pack's own −30 … +55 °C (SC-011) bounds what can be
  claimed, but the required *operating* envelope is a mission statement.
- **Unblocks:** cooling-package sizing; the ODR-016 one-loop-or-two question.

### DR-OD-11 — Retained final-drive ratio and tyre size
- **Evidence-bounded options:** 4.10 / 4.30 / 4.88 (DR-E-04), tyre 225/70R19.5G
  (DR-E-05), or an explicit decision to change either.
- **Not derivable because:** the as-built donor ratio is unknown (ODR-013) and retention
  is a programme choice.
- **Unblocks:** DR-M-01 and DR-M-02 — every speed and torque conversion between motor and
  road passes through this ratio.

### DR-OD-12 — Regenerative braking requirement
- **Not derivable because:** whether regen must contribute to service braking or sustained
  descent retardation is a mission and homologation decision.
- **Unblocks:** the continuous *negative* power requirement, which the pack's 45 kW
  continuous **charge** limit (SC-006) constrains independently of the discharge side, and
  which no variant is screened against today.

### DR-OD-13 — Installed-energy target and HV mass allowance
- **Evidence-bounded arithmetic:** each pack is ~40 kWh and 297 kg / 654.8 lbs dry
  (SC-002, SC-003), before enclosure, mounting, cabling and cooling. Against a 9,850 lbs
  published payload, packs alone consume 6.6 % of payload each; against the 12,880 lbs
  rear GAWR the binding constraint is placement, not total.
- **Not derivable because:** the split of payload between body, cargo and HV system is
  DR-OD-03 plus a programme decision.

### DR-OD-14 — Charging requirement
- **Not derivable because:** no charging requirement is recorded. AC vs DC, power level
  and the time window drive pack count and topology, and therefore the system power
  ceiling the motor sits under.

### DR-OD-15 — Homologation and certification basis
- **Not derivable because:** whether the vehicle is certified as an altered vehicle, and
  under which requirements, is a legal/programme decision that bounds DR-OD-01.

### DR-OD-16 — Verification level for this requirement
- **Not derivable because:** whether each requirement is discharged by calculation, bench
  characterization, or vehicle test is an owner choice about evidence standard. Per the
  baseline hierarchy, a `DERIVED_CALCULATION` never promotes itself to `VEHICLE_VERIFIED`.

---

## 5. Method — how §3 and §4 combine (`DR-M`)

Stated now, with worked numbers where §3 alone permits them. **Nothing here selects a
variant.** Authority for every relation below: `DERIVED_CALCULATION`.

### DR-M-01 — Motor speed → road speed

Direct axle interface, no gearbox (SC-017), so the final-drive ratio is the only
reduction:

```text
v [mph] = (n_motor [RPM] / i_axle) * (2 * pi * r_roll [in] / 12) * 60 / 5280
```

With `r_roll` taken as the published static loaded radius 15.00 in (DR-E-05), the constant
is 0.089250 mph per axle-shaft RPM. Every variant's published maximum speed (SC-022)
against every available ratio (DR-E-04) — recorded as SC-034:

| Variant max speed | i = 4.10 | i = 4.30 | i = 4.88 |
|---|---:|---:|---:|
| 2,700 RPM — HV2200-3P, HV2200-3P NEW | 58.8 mph | 56.0 mph | 49.4 mph |
| 3,000 RPM — MV2500-6P, HV3000-6P, HV3300-6P NEW | 65.3 mph | 62.3 mph | 54.9 mph |
| 3,250 RPM — HV1800-3P | 70.7 mph | 67.5 mph | 59.4 mph |
| 3,500 RPM — HV2400-6P, HV2600-6P, HV2800-6P NEW | 76.2 mph | 72.6 mph | 64.0 mph |
| 3,700 RPM — HV2200-6P | 80.5 mph | 76.8 mph | 67.7 mph |

**Stated assumption, not evidence.** Rolling radius is set equal to static loaded radius.
Ford publishes the static loaded radius; it does not publish rolling radius or revolutions
per mile for this tyre. Dynamic rolling radius is normally slightly larger than SLR, so
the table is expected to be mildly conservative — but the size of that margin is unknown
and is **not** asserted here. Filed as ODR-014. If a requirement lands within a few mph of
a row, ODR-014 must be closed before the row is used to reject a variant.

This is already a live screening axis: on a 4.88 axle no listed variant reaches 70 mph,
and the 2,700 RPM variants do not reach 60 mph on any available ratio.

### DR-M-02 — Grade → wheel torque → motor torque

```text
F_required = m*g*sin(theta) + Cr*m*g*cos(theta) + 0.5*rho*Cd*A*v^2
T_wheel    = F_required * r_roll
T_motor    = T_wheel / (i_axle * eta_driveline)
```

`m` comes from DR-OD-01 / DR-OD-03 / DR-OD-04; `theta` and `v` from DR-OD-05 / DR-OD-06;
`i_axle` from DR-OD-11. `Cr`, `Cd`, `A` and `eta_driveline` are **not in evidence** —
filed as ODR-015. Note that `T_motor` computed this way is also the torque presented to
the **rear axle input**, whose maximum input torque rating Ford does not publish for the
Dana M300 — filed as ODR-017. A variant offering 3,320 Nm of peak torque is only usable to
the extent the retained axle accepts it.

### DR-M-03 — Shaft power → DC power → pack count

```text
P_shaft   = T_motor * omega
P_DC      = P_shaft / eta_motor_inverter
N_packs  >= P_DC / 55 kW           (continuous, SC-006)
N_packs  >= P_DC_peak / 112 kW     (10-second, SC-007)
```

`eta_motor_inverter` is **not published** for any variant (SC-022 gap list), so DC draw
cannot be derived from shaft power, and B-003 owner blocker 07 forbids treating this as
ideal `P = V × I`. This relation therefore stays open even after §4 is answered, unless
efficiency data is obtained.

The shape of the constraint, worked for one variant purely to show the mechanism and
**not** as a selection: MV2500-6P's 115 kW continuous shaft rating against a 55 kW
continuous pack needs ≥ 3 packs *ignoring losses* — ≥ 891 kg / 1,964 lbs of pack dry mass
against a 9,850 lbs published payload, before enclosures, cabling and cooling. Whether the
mission needs 115 kW continuous at all is exactly what DR-OD-05 … DR-OD-08 must state.

### DR-M-04 — Voltage compatibility

Already closed against evidence, unchanged from
`PLATFORM_001_SUMO_MD_VARIANT_EVALUATION.md` §3: MV2500-6P is the only variant whose
published rating condition (350 Vdc) lies inside the governed pack window 333–407 V; a
two-series Webasto string reaches 814 V, above the maximum DC input of all ten variants
(450 / 750 / 800 Vdc). This gate needs no owner decision.

---

## 6. Screening gates for the variant evaluation

When §4 is answered, each of the ten variants is scored against these gates. Each returns
exactly one of `PASS`, `FAIL`, `INDETERMINATE (<blocking reference>)`. **A gate is never
passed by assumption**; a missing input yields `INDETERMINATE`, and a variant with any
`INDETERMINATE` gate cannot be declared preferred.

| Gate | Test | Inputs | Status today |
|---|---|---|---|
| **S1** Voltage | Rating condition inside 333–407 V; DC range accepts the chosen topology | SC-005, SC-022, SC-023 | **Closed** — DR-M-04 |
| **S2** Speed | DR-M-01 result ≥ DR-OD-06 requirement | DR-OD-06, DR-OD-11, ODR-014 | Blocked on DR-OD-06 |
| **S3** Continuous torque | DR-M-02 at the sustained grade/speed ≤ variant continuous torque | DR-OD-01/03/04/05, ODR-015 | Blocked |
| **S4** Peak torque | DR-M-02 at startability grade ≤ variant peak torque **and** ≤ axle input limit | DR-OD-05, ODR-017 | Blocked |
| **S5** Continuous power vs pack | DR-M-03 `N_packs` ≤ the count DR-OD-13 permits | DR-OD-08/13, efficiency gap | Blocked |
| **S6** Mass & packaging | Motor + inverter mass and envelope inside payload and frame allowance | SC-024, SC-025, DR-E-06, DR-OD-03 | Partially available |
| **S7** Thermal | Coolant inlet ≤ 65 °C at the DR-OD-10 ambient; loop architecture feasible | SC-026, ODR-016 | Blocked |
| **S8** Regen | Continuous negative power ≤ 45 kW × N packs | DR-OD-12 | Blocked |

Ranking rule, fixed in advance so it cannot be chosen after seeing the answers: among
variants passing all gates, prefer the one with the **smallest** continuous power that
still passes S3 and S5 — lowest pack count, lowest mass, lowest thermal load. Peak
capability breaks ties only where S4 is the binding gate. Family maxima are never a
selection criterion (SC-018 is a family statement only).

---

## 7. Evidence obligations opened by this document

| ID | Requirement |
|---|---|
| ODR-013 | Donor powertrain identity — gas vs diesel, model year, as-built final-drive ratio and tyre size; resolves the D-006 / SC-019 engine contradiction (DR-OD-02) |
| ODR-014 | Rolling radius or revolutions-per-mile for the fitted 225/70R19.5G tyre (only static loaded radius is published) |
| ODR-015 | Road-load coefficients for the converted vehicle — rolling resistance, frontal area, drag coefficient, driveline efficiency |
| ODR-016 | Coolant-loop compatibility between the Webasto pack and the Dana system — coolant type, maximum inlet temperature and flow/pressure data are not jointly published |
| ODR-017 | Maximum input torque rating of the retained Dana M300 rear axle |

ODR-012 remains **Open**. This document is its *proposed* resolution and does not resolve
it; ODR-012 closes when §4 is answered and the result is accepted as governed.

---

## 8. Result

```
PLATFORM_001_DUTY_REQUIREMENT = v0.1 DRAFT
OWNER_DECISIONS_OPEN          = 16   (DR-OD-01 … DR-OD-16)
EVIDENCE_OBLIGATIONS_OPENED   = 5    (ODR-013 … ODR-017)
PREFERRED_EXACT_SUMO_MD_VARIANT = NOT_YET_DETERMINABLE
MOTOR_SELECTED                = NO
ODR-012                       = OPEN
```

**Smallest remaining blocker to a preferred variant.** Of the sixteen open decisions, the
evaluation does not need all sixteen to start narrowing. The minimum set that moves any
gate from `INDETERMINATE` is:

1. **DR-OD-06** (top / sustained speed) — alone, with DR-OD-11, closes gate S2 and can
   eliminate variants on published data.
2. **DR-OD-11** (retained axle ratio) — the multiplier on both S2 and S4.
3. **DR-OD-05** (gradeability: sustained grade at speed, startability, hold duration) —
   with DR-OD-01 and DR-OD-04 for the mass term, closes S3 and S4 subject to ODR-015 and
   ODR-017.

Answering those five (DR-OD-01, 04, 05, 06, 11) plus closing ODR-015 and ODR-017 is
sufficient to rank the ten variants on S1–S4. S5, S7 and S8 need the remainder.

No motor is selected. No cable, fuse, contactor, PDU, precharge resistance, pump, radiator,
chiller or mounting geometry is selected. Withdrawn SC-020 / SC-021 values are not used
anywhere in this document. No variant specifications are blended.
`engine/src/platform/platform001.ts` is untouched.
