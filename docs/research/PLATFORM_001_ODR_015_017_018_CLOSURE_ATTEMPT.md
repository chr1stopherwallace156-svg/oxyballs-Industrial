# PLATFORM 001 — documentary closure attempt: ODR-018, ODR-015, ODR-017

| Field | Value |
|---|---|
| Task | Attempt closure of ODR-018 and ODR-015 from **already-archived primary evidence only**; check ODR-017 |
| Method | Exhaustive search of the archived corpus. No network retrieval. No new sources. |
| Decision | D-036 |
| `CURRENT_SCREENING_LEADER` | **HV2800-6P NEW / 4.30** |
| `POWERTRAIN_SELECTION_STATE` | **NOT_SELECTED** |
| Outcome | None of the three closes from documentation. Two require physical evidence; one has a documentary route that Dana's own policy names. |

**These two states are distinct and are never collapsed.** `CURRENT_SCREENING_LEADER`
identifies which unresolved candidate currently ranks first under the D-034 ranking rule.
`POWERTRAIN_SELECTION_STATE = NOT_SELECTED` is the engineering fact: nothing is chosen, no
candidate has passed its gates, and the leader carries no authority of any kind. A leader
is a bookmark, not a decision.

All prior screening results are preserved unchanged. Nothing in D-035 or
`PLATFORM_001_DANA_VARIANT_SCREENING_v0.1.md` is withdrawn, edited or superseded here.

---

## 1. Evidence corpus searched — complete

Every archived primary artifact in the repository, with digests recomputed from the
archived bytes on 2026-08-08. All five match their acquisition manifests.

| Source ID | Document | sha256 (verified) | Relevant to |
|---|---|---|---|
| `SRC-DANA-000001` | Dana TM4 SUMO MD sheet `CORTM4-JRT2495-SUMOMD-0124` | `e3f3f9ba…44af28` | ODR-018 |
| `SRC-CAND-000010` | 2019 F-350/450/550 Chassis Cabs fleet specification | `7a92e4ea…b9c030` | ODR-015, ODR-017 |
| `SRC-CAND-000011` | 2019 Super Duty Chassis Cab brochure | `f71e9eeb…c6589f` | ODR-015, ODR-017 |
| `SRC-CAND-000001` | 2019 Ford Body Application Guide | `4c7a4bf1…04df922` | ODR-015, ODR-017 |
| `SRC-NHTSA-17S33` | NHTSA Safety Recall 17S33 (door latch) | manifest `fb3eda01…4a59fba` | none — subject matter unrelated |

**There is no Dana or Spicer *axle* document in the repository at all.** `SRC-DANA-000001`
is a motor/inverter sheet. This is stated as a fact about the corpus, not a claim that such
documentation does not exist externally.

Search method: full text extraction (`pdftotext -layout`) of every artifact, plus a
repository-wide grep across `*.md`, `*.json` and `*.ts` for every road-load, axle-torque and
voltage-derating term. `SRC-DANA-000001` was additionally checked for graphed data that
text extraction would miss — it contains exactly one embedded raster image, which is the
product photograph, and its vector content is the dimension callouts already recorded in
SC-024/SC-025. **There is no torque-speed curve, efficiency map or derating chart anywhere
in the document.**

Note: the acquisition manifests for `SRC-CAND-000001` and `SRC-NHTSA-17S33` carry
`page_extraction_status: NOT_EXECUTED` / `parser_status: PENDING_PARSER`. Those are fields
owned by the EDTS acquisition pipeline and are **left untouched** — a targeted keyword
search performed here is not the token-anchor parse that those fields track.

---

## 2. ODR-018 — Dana voltage-dependent performance

### 2.1 What the archived document contains, in full

`SRC-DANA-000001` publishes, for each variant, exactly six numbers — peak power, continuous
power, peak torque, continuous torque, maximum operating speed, DC voltage range — under
one footnote:

```text
600 Vdc, 45°C / *350 Vdc, 45°C / **650 Vdc, 45°C
Specifications are subject to change
```

That is a **single rated operating point per variant**, not a characteristic. The document
contains no torque-speed curve, no efficiency map, no power-versus-bus-voltage data, no
base-speed or field-weakening information, no derating table, and no peak-power duration.

### 2.2 Dana's own Application Policy

Quoted verbatim from the archived artifact:

> *Capacity ratings, features, and specifications vary depending upon the model and type of
> service. Application approvals must be obtained from Dana TM4; contact your
> representative for application approval.*

This is decisive and it is Dana's own statement, not an inference. The sheet does not
present itself as an application rating. It directs the reader to obtain application
approval for a specific service — which is precisely what Platform 001 requires and does
not have.

### 2.3 Per-variant result

Every surviving candidate returns the same structure, because the document treats them
identically.

```
VARIANT                    = SUMO MD HV2200-6P
OPERATING_RANGE_COMPATIBLE = YES  (300-750 Vdc accepts 333-407 V)
PUBLISHED_RATING_VOLTAGE   = 600 Vdc, 45 C
PERFORMANCE_AT_333_407_V   = NOT_RATED_AT_THIS_OPERATING_POINT
PRIMARY_EVIDENCE           = SRC-DANA-000001 only; no curve, map or derating data
ODR_018_STATE              = CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED

VARIANT                    = SUMO MD HV2600-6P
OPERATING_RANGE_COMPATIBLE = YES  (300-750 Vdc accepts 333-407 V)
PUBLISHED_RATING_VOLTAGE   = 600 Vdc, 45 C
PERFORMANCE_AT_333_407_V   = NOT_RATED_AT_THIS_OPERATING_POINT
PRIMARY_EVIDENCE           = SRC-DANA-000001 only; no curve, map or derating data
ODR_018_STATE              = CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED

VARIANT                    = SUMO MD HV2800-6P NEW
OPERATING_RANGE_COMPATIBLE = YES  (300-800 Vdc accepts 333-407 V)
PUBLISHED_RATING_VOLTAGE   = 650 Vdc, 45 C
PERFORMANCE_AT_333_407_V   = NOT_RATED_AT_THIS_OPERATING_POINT
PRIMARY_EVIDENCE           = SRC-DANA-000001 only; no curve, map or derating data
ODR_018_STATE              = CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED

VARIANT                    = SUMO MD HV3000-6P
OPERATING_RANGE_COMPATIBLE = YES  (300-750 Vdc accepts 333-407 V)
PUBLISHED_RATING_VOLTAGE   = 600 Vdc, 45 C
PERFORMANCE_AT_333_407_V   = NOT_RATED_AT_THIS_OPERATING_POINT
PRIMARY_EVIDENCE           = SRC-DANA-000001 only; no curve, map or derating data
ODR_018_STATE              = CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED
```

`OPERATING_RANGE_COMPATIBLE` and `PERFORMANCE_RATED_AT_333_407_V` are preserved as separate
findings throughout. The first is `YES` for all four on published DC input range; the second
is `NO` for all four. **A variant accepting a voltage is not a variant rated at it.**

### 2.4 What was deliberately not done

No field-weakening curve inferred. No linear scaling of power with voltage. No derating
factor of any kind derived, assumed, or carried forward. No family maximum (SC-018) used to
fill a per-variant gap. No cross-variant borrowing. The four candidates remain exactly as
SC-022 records them, with an explicit `UNKNOWN` at the governed operating point.

---

## 3. ODR-015 — Platform 001 road-load evidence

### 3.1 Term-by-term classification

Searched across `SRC-CAND-000001`, `SRC-CAND-000010`, `SRC-CAND-000011` for: drag
coefficient, `Cd`, frontal area, aerodynamic, rolling resistance, `Crr`, coastdown, road
load, revolutions per mile, loaded radius, driveline efficiency.

| Road-load term | Classification | Finding |
|---|---|---|
| Aerodynamic drag — `Cd`, `CdA`, or frontal area | **PHYSICAL_MEASUREMENT_REQUIRED** | No value in any archived source. The single textual hit for "frontal area" is a Body Application Guide footnote directing the reader to the VECI label for restrictions on curb weight and frontal area — a constraint pointer, not a coefficient. The donor is a **bare cab-and-chassis**, so no frontal area exists until the body is specified (DR-OD-03). |
| Rolling resistance / equivalent road-load term | **PHYSICAL_MEASUREMENT_REQUIRED** | No `Crr` and no road-load coefficients published. Ford publishes tyre load limits and static loaded radius (SC-031), which are not rolling-resistance data. |
| Driveline efficiency | **PHYSICAL_MEASUREMENT_REQUIRED** | No value in any archived source. Not separable from a coastdown in any case — see §3.3. |
| Effective rolling radius | **PHYSICAL_MEASUREMENT_REQUIRED** (ODR-014) | Only static loaded radius 15.00 in is published (SC-031). Bounded above by the unloaded radius implied by the governed 225/70R19.5 designation; the bound is retained, the value is not. |
| Vehicle test mass applicability | **PRIMARY_DOCUMENT_SUPPORTED**, with a caveat | Published curb and GVWR data exist for the exact configuration (SC-028), and `TARGET_GVWR` 16,000 lb (SC-035) sits on the published ladder. The caveat is that these are model-configuration values: ODR-004/005/006 keep the donor's actual axle weights and label GVWR open, and the converted vehicle's mass does not yet exist. |

**The SC-036 sensitivity band is not promoted.** It remains
`SENSITIVITY_BAND_NOT_EVIDENCE`. No `Cd`, frontal area, `Crr` or driveline efficiency is
fabricated anywhere in this document.

### 3.2 A governed coastdown already exists — and it is only a partial answer

The repository already contains an approved subgate whose stated purpose is exactly this
measurement: **Gate 05M-C3B — Coast-Down + Foundation Brakes**, item **C3B-001 Zero-Torque
Coast-Down**, described in `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md` as mapping
"baseline rolling resistance and mechanical losses to validate the vehicle drag model". A
prior owner review (`review_17_batch_20_verdict.md`) already fixed the tractive-power
relation `P = v × (rolling resistance + aero drag + grade force + acceleration force)` as
the governing model.

So the minimum physical evidence for ODR-015 does not need a new test programme invented for
it — but **C3B-001 alone cannot close ODR-015**, for a reason that must not be glossed:

> C3B-001 is a **closed-area, low-speed** procedure. At the low speeds Gate 05M-C3 authorises,
> the aerodynamic term is negligible, so the run separates rolling resistance and mechanical
> losses but yields **no usable `CdA`**. The duty points that actually bind — D1 at 55 mph,
> D4 at 65 mph, D5 at 70 mph — are squarely in the speed range where aero dominates.

Gate 05M-C3 is explicitly bounded `NO_PUBLIC_ROAD / NO_NORMAL_DRIVING_AUTHORITY`. Closing
the aerodynamic term therefore requires an evidence activity **that the currently authorised
gate ladder does not contain**. That is a scope finding for the owner, not something to be
quietly absorbed into an existing gate.

### 3.3 Minimum physical evidence to close ODR-015

| # | Evidence | Closes | Note |
|---|---|---|---|
| 1 | **Low-speed zero-torque coastdown** at the applicable test mass, per the existing C3B-001 | rolling resistance + mechanical losses | Already governed. Test Configuration Lock Rule (RC-325) already requires archiving mass, axle load, tyre, ambient and surface. |
| 2 | **High-speed coastdown** across the 55–70 mph range, both directions, on a graded and characterised surface with wind measurement | separates `CdA` from the speed-independent term | **Not covered by any authorised gate.** Requires a separate owner authorisation and a facility with the necessary speed authority. |
| 3 | **Wheel-speed against independently measured ground speed** during (1) and (2) | ODR-014 — effective rolling radius / revolutions per mile | Comes free with the coastdown instrumentation; no separate activity. |
| 4 | **Driveline loss separation** — dynamometer or in-line torque measurement at the axle input against wheel output | driveline efficiency | A coastdown returns *combined* losses. Efficiency cannot be separated from it, so this is a distinct activity and it overlaps the ODR-018 bench work (§5). |

Applicability caveat that must travel with any of this: a coastdown on the **donor ICE
vehicle** transfers to the converted vehicle only for terms unchanged by the conversion —
aerodynamics (if the body is unchanged) and tyre rolling resistance. It does **not** transfer
for driveline losses, because the driveline is what the conversion replaces.

---

## 4. ODR-017 — retained rear axle input torque

Searched every archived Ford artifact for input torque, torque capacity, pinion torque and
maximum input. **Result: nothing.**

What the corpus does publish for the F-450 DRW rear axle (SC-029): Dana **M300**,
full-floating, SPL-55 end yoke, cast-centre housing, 4.5 in tube diameter, 11.8 in ring-gear
pitch diameter, and a maximum rating **@ ground** of 13,660 lbs.

That last figure is a **vertical load** limit. It is not a torque rating and the two are not
convertible.

```
ODR_017_STATUS = OPEN
```

**No inference was made** from gross axle weight rating, from ring-gear pitch diameter, from
the donor engine's torque output, from GCWR, or from any other Dana or Spicer axle family.
Each of those was available in the corpus and each was deliberately not used. The ring-gear
diameter in particular is recorded in SC-029 and is *not* a basis for a torque estimate.

Closing ODR-017 requires an applicable primary document for the exact retained axle — Dana/
Spicer axle application data, or Ford powertrain/body-builder documentation stating an input
torque limit for this axle in this application. **No such document is archived**, and none
was retrievable from the archived corpus.

Screening consequence, unchanged from D-035: gate S4 stays `INDETERMINATE` for every
candidate. The useful bound also stands — the *demand* at the governed duty points peaks at
~1,513 Nm (D3 at i = 4.10), well below what any survivor can produce, so the question put to
the evidence is narrow: does the M300 accept ~1.5 kNm continuously and transiently in this
application?

---

## 5. Characterization requirement definition (ODR-018)

Defined here as **required evidence outputs only**. This is not a test procedure, contains no
energized-HV operating instructions, and bypasses no existing safety or test control. Any
execution runs inside the existing governed framework — the Test Configuration Lock Rule
(RC-325), the data-synchronisation requirement (RC-326), and a qualified controlled HV test
environment as required by the Platform 001 baseline Phase D.

Authority class of the result: **`CONTROLLED_BENCH_CHARACTERIZATION`** — an independent class
that per baseline invariant 1 is never aliased to `MANUFACTURER_VERIFIED` or
`VEHICLE_VERIFIED`.

### 5.1 Required measured quantities

| Quantity | Requirement |
|---|---|
| DC bus voltage | Measured at the inverter DC terminals, not commanded or inferred. Test points across the governed window: 333 V, ~370 V, 407 V. |
| DC current and DC power | Measured, with the shunt/transducer calibration recorded. Closes the DC-draw gap that currently blocks gate S5. |
| Motor shaft speed | Measured. Must cover 2,527–3,007 rpm (D1 across all three ratios) and the D4/D5 speeds. |
| Motor shaft torque | Calibrated in-line torque transducer. Not an inverter-estimated value — inverter torque estimation is explicitly non-authoritative under RC-341/356. |
| Continuous-duration capability | Hold at the D1-equivalent operating point until thermal steady state, for **not less than the 20 minutes** SC-035 requires, with the derating state logged throughout. |
| Inverter and motor temperatures | Measured at supplier-defined locations. |
| Coolant inlet/outlet temperature, flow rate, pressure drop | Also closes the SC-026 flow/pressure-drop gap and feeds ODR-016. |
| Fault and derating state | Every active limit, derate flag and fault code, timestamped. A silent derate invalidates the run. |
| Exact hardware/firmware identity | Variant and inverter part numbers and revisions, firmware and calibration identifiers with hashes, per RC-325. |

### 5.2 Correlation requirement

The programme must include **the variant's own published rating point** (600 Vdc or 650 Vdc
at 45 °C) alongside the 333–407 V points. Without it the bench result cannot be tied back to
`SRC-DANA-000001`, and an uncorrelated bench number is not evidence that the sheet's figures
were reproduced — it is only a number from a bench.

### 5.3 The documentary alternative, which is cheaper

`SRC-DANA-000001`'s Application Policy directs the reader to obtain application approval
from Dana TM4. **A Dana-issued application data sheet or torque-speed/efficiency curve set
for the exact variant across 333–407 Vdc would close ODR-018 documentarily**, at
`VERIFIED_COMPONENT_DOCUMENTATION`, without any bench programme.

This is consistent with B-006, not a regression to it. B-006 removed the *dependency* on a
supplier reply — it did not make supplier documentation inadmissible. Dana's own document
says application approval is required for a specific service, so this route is the one the
manufacturer names. It should be attempted before a bench programme is scoped, while the
bench route remains the fallback that keeps the project independent of a reply.

---

## 6. Required output

```
CURRENT_SCREENING_LEADER    = HV2800-6P NEW / 4.30
POWERTRAIN_SELECTION_STATE  = NOT_SELECTED

ODR_018:
  HV2200_6P     = OPERATING_RANGE_COMPATIBLE = YES / PERFORMANCE_RATED_AT_333_407_V = NO
                  -> CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED
  HV2600_6P     = OPERATING_RANGE_COMPATIBLE = YES / PERFORMANCE_RATED_AT_333_407_V = NO
                  -> CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED
  HV2800_6P_NEW = OPERATING_RANGE_COMPATIBLE = YES / PERFORMANCE_RATED_AT_333_407_V = NO
                  -> CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED
  HV3000_6P     = OPERATING_RANGE_COMPATIBLE = YES / PERFORMANCE_RATED_AT_333_407_V = NO
                  -> CONTROLLED_BENCH_CHARACTERIZATION_REQUIRED

ODR_015_PRIMARY_SUPPORTED_INPUTS =
  vehicle test mass applicability only (SC-028 configuration ratings + SC-035 target GVWR),
  and that with the ODR-004/005/006 donor caveat attached.
  NONE of Cd / CdA / frontal area / Crr / driveline efficiency / rolling radius is
  supported by any archived primary document.

ODR_015_PHYSICAL_MEASUREMENTS_REQUIRED =
  1. low-speed zero-torque coastdown  -> rolling resistance + mechanical losses
     (already governed as Gate 05M-C3B / C3B-001)
  2. high-speed coastdown, 55-70 mph, bidirectional, wind-corrected -> CdA
     (NOT covered by any currently authorised gate - needs separate owner authorisation)
  3. wheel speed vs independent ground speed during 1 and 2 -> effective rolling
     radius (also closes ODR-014)
  4. dynamometer / in-line torque measurement -> driveline efficiency
     (cannot be separated from a coastdown; overlaps the ODR-018 bench work)

ODR_017_STATE = OPEN
  No applicable input-torque rating exists in the archived corpus. No Dana/Spicer axle
  document is archived at all. Nothing inferred from GAWR, ring-gear size, engine
  torque, GCWR, or another axle family.

SMALLEST_DOCUMENTARY_EVIDENCE_SET =
  1. Dana application data for HV2200-6P / HV2600-6P / HV2800-6P NEW / HV3000-6P at
     333-407 Vdc - torque-speed and efficiency across the window, with continuous
     rating and duration. Dana's own Application Policy names this route.
  2. Dana/Spicer or Ford documentation stating the M300 rear-axle input torque limit
     for this application (ODR-017).
  Item 1 alone converts the screening from a ranking into a decidable comparison.

SMALLEST_PHYSICAL_EVIDENCE_SET =
  1. Controlled bench characterization of the surviving variants at 333 / 370 / 407 Vdc
     plus their published rating point for correlation, per section 5 - if and only if
     the documentary route fails.
  2. High-speed coastdown for CdA, plus the already-governed low-speed coastdown for the
     rolling-resistance term (ODR-015, and ODR-014 as a by-product).

CAN_DANA_SELECTION_PROCEED = NO

EXACT_REASON =
  Every surviving candidate is an HV variant, and SRC-DANA-000001 - the only Dana
  document archived - publishes a single rated operating point per variant at 600 or
  650 Vdc with no curve, map, or derating data. The governed pack window is 333-407 V.
  The binding duty point D1 requires 142.9-179.4 kW continuous at 2,527-3,007 rpm, which
  is the high-speed corner where available power is governed by bus voltage. Selecting a
  variant now would require inferring its output at roughly half its rating voltage, and
  that inference is exactly what is forbidden. The road-load band compounds it: the
  25%-wide requirement is itself unmeasured, so even a fully rated motor could not be
  scored against a settled target.
```

---

## 7. Architecture-change rule

Acknowledged and recorded as binding.

**No escalation is triggered at this time.** The surviving candidates are `INDETERMINATE`,
not disqualified — the evidence to judge them has not been gathered, which is a different
condition from having been judged and failed.

The escalation condition, stated in advance so it cannot be quietly avoided later:

> If ODR-018 resolves such that **no** surviving variant meets the D1 continuous-power
> requirement at 333–407 Vdc, that is **not** an occasion to edit ODR-012 or SC-035. It
> opens a separate trade study covering: an alternate Dana voltage class; an alternate
> battery/system voltage architecture; an alternate inverter/motor architecture; an
> alternate propulsion supplier.

**ODR-012 and SC-035 may change only through an explicit owner decision that changes the
Platform 001 mission.** Neither may be relaxed to make a candidate pass. Any future document
that weakens a duty figure must cite the owner decision that authorised it; absent that
citation, the change is invalid.

The screening already carries one standing signal relevant to this rule: the only variant
whose published figures are rated inside the governed pack window, MV2500-6P, is eliminated
on duty. That is a genuine tension between the Webasto voltage architecture and the duty
requirement, and it is the shape a trade study would take if ODR-018 resolves unfavourably.
Webasto topology selection remains **NOT_STARTED**.

---

## 8. Standing constraints honoured

No Dana motor selected. No Webasto topology started. No cables, fuses, contactors, PDU,
precharge hardware, cooling hardware or mounting geometry selected. No energized-HV
procedure written and no safety or test control bypassed. No `Cd`, frontal area, `Crr`,
driveline efficiency, derating factor or axle torque rating fabricated. The SC-036
sensitivity band is not promoted. All prior screening results preserved.
`engine/src/platform/platform001.ts` untouched.
