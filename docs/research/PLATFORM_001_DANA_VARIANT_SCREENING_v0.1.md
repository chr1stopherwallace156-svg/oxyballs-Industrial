# PLATFORM 001 — Dana SUMO MD variant screening against the v0.1 duty requirement

| Field | Value |
|---|---|
| Duty requirement | `PLATFORM_001_DUTY_REQUIREMENT_v0.1` + owner design requirements adopted 2026-08-08 (SC-035) |
| Variants screened | Ten, exactly as provenance-locked in SC-022. None blended. |
| Axle ratios screened | 4.10 / 4.30 / 4.88 (SC-030) |
| Decision | D-035 |
| Outcome | `PREFERRED_EXACT_SUMO_MD_VARIANT = NOT_YET_DEFENSIBLE` — three candidates survive, one blocker separates them from a decision |
| Webasto topology | `NOT_STARTED` — Dana screening completes here and points at it; no topology is selected |

---

## 1. Adopted owner design requirements (SC-035)

Authority class: `OWNER_DESIGN_REQUIREMENT`. Not a measurement and not a derivation — an
owner-issued target that the engineering must meet.

| ID | Requirement | Value |
|---|---|---|
| OR-01 | `TARGET_GVWR` | 16,000 lb (7,257.5 kg) |
| OR-02 | `TOWING_REQUIREMENT` | `NONE_FOR_PLATFORM_001_V1` |
| OR-03 | `MAXIMUM_ROAD_SPEED_TARGET` | 70 mph |
| OR-04 | `SUSTAINED_HIGHWAY_SPEED_TARGET` | 65 mph |
| OR-05 | `SUSTAINED_GRADE` | 6 % @ 55 mph for 20 minutes |
| OR-06 | `LOW_SPEED_GRADE` | 15 % @ 15 mph |
| OR-07 | `STARTABILITY_GRADE` | 20 % |

OR-01 sits on the published 16,000 lb rung of the GVWR ladder (SC-028), so the
configuration supports it documentarily. It does **not** close ODR-006 — the donor's label
GVWR is still unmeasured.

Duration is stated only for OR-05. OR-06 carries no duration, so it is evaluated against
both the continuous and the peak rating and reported as such. OR-07 is treated as a
short-duration peak-torque event.

## 2. Calculation basis

### 2.1 Evidence-backed inputs

| Input | Value | Source |
|---|---|---|
| Vehicle mass | 7,257.5 kg | OR-01 |
| Final-drive ratios | 4.10 / 4.30 / 4.88 | SC-030 |
| Static loaded radius | 15.00 in = 0.3810 m | SC-031 |
| Reduction between motor and wheel | final drive only — direct axle interface, no gearbox | SC-017 |
| Variant ratings | per-variant, never blended | SC-022, SC-023 |

### 2.2 Provisional basis and its bound (ODR-014 preserved)

Static loaded radius is used as the **provisional** calculation basis. It is not converted
into a verified rolling radius and ODR-014 stays Open.

Rolling radius is bounded from above by the tyre's unloaded radius, which follows
geometrically from the governed size designation 225/70R19.5 (SC-031):

```text
r_unloaded = 19.5 in / 2 + 0.70 * 225 mm = 247.65 mm + 157.5 mm = 405.15 mm = 15.951 in
```

So `0.3810 m <= r_roll <= 0.4051 m`, a +6.34 % span. Every road-speed figure below is
reported at both ends, and a third column adds +1.5 % for overall-diameter manufacturing
tolerance. **A candidate is never failed on a speed margin that lies inside that span** —
those cells read `INDETERMINATE`, not `FAIL`, exactly as instructed. Authority for the
bound: `DERIVED_CALCULATION` from the size designation. Note Ford publishes a measured
section width of 8.7 in against the nominal 225 mm, so the nominal geometry is an
approximation and the tolerance column matters.

### 2.3 Sensitivity band — **not evidence** (ODR-015 preserved)

`Cr`, `CdA` and driveline efficiency are unresolved. They are **not** given values. A band
is carried through every calculation and every result is reported as a range:

| Input | Low | High | Note |
|---|---:|---:|---|
| Rolling resistance `Cr` | 0.006 | 0.010 | radial truck tyres on paved road |
| `Cd × A` | 2.4 m² | 4.3 m² | frontal area 4.0–4.8 m², `Cd` 0.6–0.9; body is unspecified (DR-OD-03) |
| Driveline efficiency `η` | 0.90 | 0.96 | final drive + driveline |
| Air density `ρ` | 1.225 kg/m³ | — | sea level, standard; altitude unspecified (DR-OD-10) |

Authority class: `SENSITIVITY_BAND_NOT_EVIDENCE`. These bands must never be cited as
values, promoted to claims, or written into `platform001.ts`. Closing ODR-015 replaces the
band with a point and decides most of the `INDETERMINATE` cells below.

### 2.4 Relations

```text
F  = m*g*sin(atan(G)) + Cr*m*g*cos(atan(G)) + 0.5*rho*Cd*A*v^2
P_wheel = F*v          T_wheel = F*r_roll
n_motor = v/(2*pi*r_roll)*60*i
T_motor = T_wheel/(i*eta)      P_shaft = P_wheel/eta
```

## 3. Duty-point requirements (derived, SC-037)

| Duty point | Total force | Wheel power | Shaft power required | Axle-shaft rpm |
|---|---|---|---|---|
| **D1** 6 % @ 55 mph, 20 min *(OR-05)* | 5.58–6.57 kN | 137.1–161.4 kW | **142.9–179.4 kW** | 616.2 |
| **D2** 15 % @ 15 mph *(OR-06)* | 11.05–11.38 kN | 74.1–76.3 kW | 77.2–84.8 kW | 168.1 |
| **D3** 20 % startability *(OR-07)* | 14.38–14.66 kN | 12.9–13.1 kW | 13.4–14.6 kW | 22.4 |
| **D4** 65 mph level *(OR-04)* | 1.67–2.94 kN | 48.5–85.3 kW | 50.5–94.8 kW | 728.3 |
| **D5** 70 mph level *(OR-03)* | 1.87–3.29 kN | 58.4–103.0 kW | 60.8–114.4 kW | 784.3 |

Motor-side requirements per ratio:

| Duty point | i = 4.10 | i = 4.30 | i = 4.88 |
|---|---|---|---|
| D1 — rpm / torque | 2,527 rpm · 540–678 Nm | 2,650 rpm · 515–646 Nm | 3,007 rpm · 454–570 Nm |
| D2 — rpm / torque | 689 rpm · 1,069–1,175 Nm | 723 rpm · 1,020–1,120 Nm | 820 rpm · 898–987 Nm |
| D3 — rpm / torque | 92 rpm · 1,392–1,513 Nm | 96 rpm · 1,327–1,443 Nm | 109 rpm · 1,169–1,272 Nm |
| D4 — rpm | 2,986 rpm | 3,132 rpm | 3,554 rpm |
| D5 — rpm | 3,216 rpm | 3,373 rpm | 3,827 rpm |

D1 shaft power is **ratio-independent** — power is power. This matters more than anything
else below: **no choice of axle ratio can repair a continuous-power shortfall.**

## 4. Voltage semantics applied (S1)

As directed:

- **MV2500-6P — `PASS`** for both operating-range compatibility and published rating
  condition (350 Vdc) near the governed 333–407 V window.
- **All nine HV variants — `PASS_FOR_OPERATING_RANGE`.** Their 300–750 / 300–800 Vdc
  ranges accept 333–407 V.
- Their **performance** at 333–407 Vdc is `UNKNOWN / NOT_RATED_AT_THIS_OPERATING_POINT`.
- No HV variant is rejected below solely because its figures are quoted at 600/650 Vdc.

**One asymmetry is used, and it is reasoning, not evidence.** A variant that fails a
power-at-speed gate *at its own rating condition* fails it at any lower bus voltage too:
at 2,527–3,007 rpm the machine's back-EMF must be supported by the available bus, so
reducing the bus cannot increase power at that speed. This is a stronger basis than "the
figure is quoted at 600 V", and it is the only place derating logic is used to eliminate
anything. Low-speed torque gates (D2, D3) are current-limited rather than voltage-limited,
so published torque may be largely preserved at 333–407 V — but that is engineering
expectation, not evidence, and no derate factor is asserted anywhere.

## 5. Candidate × axle-ratio matrix

### 5.1 Gate S2a — maximum road speed, 70 mph (OR-03)

Achievable road speed at maximum motor speed, as *SLR basis / geometric bound / bound
+1.5 % tolerance* (mph):

| Variant | n_max | i = 4.10 | i = 4.30 | i = 4.88 |
|---|---:|---|---|---|
| MV2500-6P | 3,000 | 65.3 / 69.4 / 70.5 → **INDET** | 62.3 / 66.2 / 67.2 → **FAIL** −4.0 % | 54.9 / 58.3 / 59.2 → **FAIL** −15.4 % |
| HV1800-3P | 3,250 | 70.7 / 75.2 / 76.4 → **PASS** | 67.5 / 71.7 / 72.8 → **INDET** | 59.4 / 63.2 / 64.2 → **FAIL** −8.3 % |
| HV2200-3P | 2,700 | 58.8 / 62.5 / 63.4 → **FAIL** −9.4 % | 56.0 / 59.6 / 60.5 → **FAIL** −13.6 % | 49.4 / 52.5 / 53.3 → **FAIL** −23.9 % |
| HV2200-3P NEW | 2,700 | **FAIL** −9.4 % | **FAIL** −13.6 % | **FAIL** −23.9 % |
| HV2200-6P | 3,700 | 80.5 / 85.6 / 86.9 → **PASS** | 76.8 / 81.7 / 82.9 → **PASS** | 67.7 / 72.0 / 73.0 → **INDET** |
| HV2400-6P | 3,500 | 76.2 / 81.0 / 82.2 → **PASS** | 72.6 / 77.3 / 78.4 → **PASS** | 64.0 / 68.1 / 69.1 → **INDET** |
| HV2600-6P | 3,500 | **PASS** | **PASS** | **INDET** |
| HV2800-6P NEW | 3,500 | **PASS** | **PASS** | **INDET** |
| HV3000-6P | 3,000 | 65.3 / 69.4 / 70.5 → **INDET** | **FAIL** −4.0 % | **FAIL** −15.4 % |
| HV3300-6P NEW | 3,000 | **INDET** | **FAIL** −4.0 % | **FAIL** −15.4 % |

`INDET` cells are those the rolling-radius span (§2.2) can still flip. `FAIL` percentages
are shortfalls measured at the **most favourable** end of that span including tolerance —
i.e. these fail even if ODR-014 resolves as favourably as physics allows. The 2,700 rpm
variants fail by 9.4–23.9 %, which no rolling-radius resolution touches.

### 5.2 Gate S2b — sustained 65 mph (OR-04), and S2c — reaching 55 mph for D1

| Variant | S2b @ 4.10 / 4.30 / 4.88 | S2c @ 4.10 / 4.30 / 4.88 |
|---|---|---|
| MV2500-6P | PASS / INDET / FAIL | PASS / PASS / INDET |
| HV1800-3P | PASS / PASS / INDET | PASS / PASS / PASS |
| HV2200-3P · HV2200-3P NEW | INDET / FAIL / FAIL | PASS / PASS / FAIL |
| HV2200-6P | PASS / PASS / PASS | PASS / PASS / PASS |
| HV2400-6P · HV2600-6P · HV2800-6P NEW | PASS / PASS / INDET | PASS / PASS / PASS |
| HV3000-6P · HV3300-6P NEW | PASS / INDET / FAIL | PASS / PASS / INDET |

Both columns use the same tolerance rule as §5.1, so a cell is `INDET` wherever the
rolling-radius span can still flip it. Note MV2500-6P, HV3000-6P and HV3300-6P NEW at
i = 4.88 may not even hold the 55 mph of D1: that duty point needs 3,007 rpm on the SLR
basis against a 3,000 rpm limit, and only 2,828 rpm at the favourable end of the span —
`INDETERMINATE` on ODR-014, and moot for all three since each is eliminated by S3 anyway.

### 5.3 Gate S3 — continuous shaft power at D1 (ratio-independent)

Required: **142.9–179.4 kW**.

| Variant | Continuous kW | Verdict | Reason |
|---|---:|---|---|
| MV2500-6P | 115 | **FAIL** | 27.9 kW short of the *most favourable* road load |
| HV1800-3P | 100 | **FAIL** | 42.9 kW short |
| HV2400-6P | 120 | **FAIL** | 22.9 kW short |
| HV3300-6P NEW | 130 | **FAIL** | 12.9 kW short |
| HV2200-3P | 145 | **INDET** | covers only the bottom 6 % of the band |
| HV2200-3P NEW | 145 | **INDET** | covers only the bottom 6 % of the band |
| HV3000-6P | 145 | **INDET** | covers only the bottom 6 % of the band |
| HV2600-6P | 155 | **INDET** | covers the bottom 33 % of the band |
| HV2800-6P NEW | 180 | **PASS at rated V** | covers the whole band |
| HV2200-6P | 190 | **PASS at rated V** | covers the whole band |

These four `FAIL`s are the strongest results in this document: they hold at the variants'
own rating conditions, they are ratio-independent, and they survive the most favourable
end of the ODR-015 band. No further evidence rescues them for this duty requirement.

### 5.4 Gate S3b — continuous torque at D1

Required 540–678 Nm (4.10), 515–646 Nm (4.30), 454–570 Nm (4.88). Every variant passes at
every ratio except **HV2400-6P** (605 Nm continuous → `INDET` at 4.10 and 4.30, `PASS` at
4.88). Torque is not the binding continuous constraint — power is.

### 5.5 Gate S4 — peak torque at D3 (20 % startability) and D2 (15 % @ 15 mph)

Worst-case requirement is 1,513 Nm at i = 4.10. **All ten variants clear it on published
peak torque**, with 1.17× (HV1800-3P) to 2.19× (HV3300-6P NEW) headroom. D2 needs
1,069–1,175 Nm at 4.10; all ten clear that on peak, and six of ten clear it on
*continuous* torque, which matters because OR-06 carries no stated duration.

**S4 overall verdict is `INDETERMINATE` for every candidate**, on ODR-017: the Dana M300
rear axle's maximum input torque rating is not published anywhere, and the motor drives it
directly without a gearbox. The useful narrowing is that the *demand* is bounded at
~1,513 Nm — the axle question is whether it accepts 1.5 kNm, not the 2.4–3.3 kNm the
variants can produce, and a VCU torque limit is available as a design lever.

### 5.6 Gate S5 — continuous power against the pack

| Band end | Shaft kW | Packs (losses **excluded**) | Dry pack mass | Installed energy | 20 min at D1 |
|---|---:|---:|---:|---:|---|
| Low | 142.9 | ≥ 2.60 → **3** | 891 kg / 1,964 lb | 120 kWh | 47.6 kWh = 40 % |
| High | 179.4 | ≥ 3.26 → **4** | 1,188 kg / 2,619 lb | 160 kWh | 59.8 kWh = 37 % |

`INDETERMINATE` for every candidate. Motor/inverter efficiency is unpublished (SC-022 gap
list), so DC draw cannot be derived from shaft power and B-003 owner blocker 07 forbids
treating this as ideal `P = V × I`. The counts above are **lower bounds** that ignore all
losses; the true count is higher. Independently of the motor choice, OR-05 costs 37–40 %
of installed energy in twenty minutes — a result that will interact with DR-OD-09 (range),
still unanswered.

### 5.7 Gate S6 — mass and packaging

All four surviving candidates use casing L2 (225 kg) with inverter CO200 (25 kg) =
**250 kg / 551 lb**. With packs:

| Packs | HV dry total | Share of 9,350 lb payload (gas) | Share of 8,610 lb (diesel) |
|---:|---:|---:|---:|
| 3 | 1,141 kg / 2,515 lb | 27 % | 29 % |
| 4 | 1,438 kg / 3,170 lb | 34 % | 37 % |

`PARTIAL` — arithmetic is available, but the verdict needs DR-OD-03 (body mass) and the
removed-ICE mass credit, which is a Gate 07 ledger item not in evidence here. Payload
figures are the published 16,000 lb GVWR rung (SC-028), not donor measurements.

### 5.8 Gates S7 and S8

- **S7 thermal — `INDETERMINATE`**, ODR-016. Dana publishes max coolant inlet 65 °C and
  40/60 water-glycol but no flow or pressure drop; Webasto publishes 10 L/min and
  < 50 mbar but no coolant type or inlet limit. The two sets do not compose, and the
  ambient envelope (DR-OD-10) is unanswered.
- **S8 regen — `INDETERMINATE`**, DR-OD-12 unanswered. Worth flagging concretely: a 6 %
  descent at 55 mph returns roughly the D1 magnitude, and pack continuous **charge** is
  45 kW per pack (SC-006) against 55 kW discharge — the charge side is the tighter limit
  and no variant has been screened against it.

## 6. Result

### 6.1 Eliminated — six of ten

| Variant | Eliminated by | Not recoverable because |
|---|---|---|
| MV2500-6P | S3 | 115 kW vs ≥ 142.9 kW; ratio-independent; fails at its own rating condition |
| HV1800-3P | S3 | 100 kW vs ≥ 142.9 kW |
| HV2400-6P | S3 | 120 kW vs ≥ 142.9 kW |
| HV3300-6P NEW | S3 | 130 kW vs ≥ 142.9 kW |
| HV2200-3P | S2a | 2,700 rpm → 62.5 mph at the most favourable rolling radius, 9.4 % short of OR-03 |
| HV2200-3P NEW | S2a | as above |

### 6.2 Surviving candidate × axle-ratio combinations

| Candidate | Ratio | S1 | S2a | S2b | S3 | S3b | S4 | S5 | S6 | S7 | S8 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **HV2200-6P** (190 kW) | 4.10 | RANGE-OK | PASS | PASS | PASS@V | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2200-6P** | 4.30 | RANGE-OK | PASS | PASS | PASS@V | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2200-6P** | 4.88 | RANGE-OK | INDET | PASS | PASS@V | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2800-6P NEW** (180 kW) | 4.10 | RANGE-OK | PASS | PASS | PASS@V | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2800-6P NEW** | 4.30 | RANGE-OK | PASS | PASS | PASS@V | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2600-6P** (155 kW) | 4.10 | RANGE-OK | PASS | PASS | INDET | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| **HV2600-6P** | 4.30 | RANGE-OK | PASS | PASS | INDET | PASS | INDET | INDET | PARTIAL | INDET | INDET |
| HV3000-6P (145 kW) | 4.10 | RANGE-OK | INDET | PASS | INDET | PASS | INDET | INDET | PARTIAL | INDET | INDET |

`RANGE-OK` = `PASS_FOR_OPERATING_RANGE`; performance at 333–407 Vdc `UNKNOWN`.
`PASS@V` = passes at the variant's published rating condition (600 or 650 Vdc).

### 6.3 Is one variant + ratio defensible?

```
DEFENSIBLE_SELECTION = NO
```

Not because the field is wide — it is down to three plus one marginal — but because of a
single structural fact:

> **Every surviving candidate is an HV variant, and no HV variant's output is published at
> the governed pack operating point of 333–407 Vdc.** The one variant whose published
> figures *are* valid there — MV2500-6P at 350 Vdc — fails the duty requirement by at
> least 27.9 kW of continuous power.

The binding duty point, D1, sits at 2,527–3,007 rpm and 142.9–179.4 kW continuous. That is
precisely the high-speed, high-power corner where bus voltage governs available power. So
the unresolved derate is not a footnote on the surviving candidates — it is the term that
decides whether any of them meets OR-05 at all.

Provisional ranking, held **only** for when that blocker clears, and following the ranking
rule fixed in advance (smallest continuous power that still passes every gate):
**HV2800-6P NEW (180 kW) ahead of HV2200-6P (190 kW)**, at **i = 4.30 ahead of i = 4.10**.

The ratio reasoning is a trade, not a preference: 4.10 leaves more speed headroom at OR-03
(3,216 rpm required against 3,500 available, 8.8 %) while 4.30 leaves less (3,373 rpm,
3.8 %) — but 4.30 lowers the torque the motor must put into the axle at every duty point,
including the sizing case D3 (1,327–1,443 Nm vs 1,392–1,513 Nm at 4.10). With ODR-017 open,
the ratio that demands less axle input torque is worth more than the ratio that banks
surplus rpm above a target already cleared outright. 4.88 would lower axle torque further
still but cannot clear OR-03.

HV2600-6P (155 kW) would displace both if ODR-015 resolves toward the low end of the
road-load band. **This is a ranking of unresolved candidates, not a selection.**

### 6.4 Smallest blocking evidence set

In order of how much each one decides:

1. **ODR-018 (new) — HV-variant output at 333–407 Vdc.** Continuous and peak power and
   torque for HV2200-6P, HV2600-6P and HV2800-6P NEW at the governed pack operating point.
   **Alone, this is the difference between a ranking and a selection.** Closing it decides
   S3 for every survivor.
2. **ODR-015 — road-load coefficients.** The 142.9–179.4 kW band is 25 % wide, and that
   width is the sole reason HV2600-6P and HV3000-6P read `INDETERMINATE` rather than
   decided. A coastdown on the donor closes it.
3. **ODR-017 — Dana M300 axle input torque rating.** Gates S4 for all candidates. The
   demand is bounded at ~1,513 Nm, so this is a yes/no against a known number.
4. **Motor/inverter efficiency map** (SC-022 gap, already recorded) — gates S5 and with it
   the pack count, the mass budget and the Webasto topology question.
5. **ODR-014 — rolling radius.** Decides only the marginal cells: HV2200-6P at 4.88,
   HV3000-6P at 4.10. It changes no elimination.

Items 1 and 2 together move all three surviving candidates from `INDETERMINATE` to a
verdict on S2/S3 — the smallest set that yields a defensible answer.

### 6.5 What this screening hands to the topology question

Not started, not selected, and recorded here only because the Dana screening result points
straight at it: the surviving candidates are rated at 600–650 Vdc, the governed pack gives
333–407 V in one series string and 666–814 V in two, and 814 V exceeds the 750/800 Vdc
maximum of every listed variant (§SC-022). Whether the survivors can be operated at their
rated condition at all is therefore a pack-topology question. **No topology is chosen
here**, and B-004 (VIB vs VIG/VIG Plus) remains open.

---

## 7. Standing constraints honoured

No cables, fuses, contactors, PDU, precharge hardware, cooling hardware or mounting
geometry are selected. No Webasto topology is selected. Withdrawn SC-020 / SC-021 values
are used nowhere. No variant specifications are blended — every row is one exact variant.
No sensitivity-band figure is presented as a value or promoted to a claim.
`engine/src/platform/platform001.ts` is untouched.
