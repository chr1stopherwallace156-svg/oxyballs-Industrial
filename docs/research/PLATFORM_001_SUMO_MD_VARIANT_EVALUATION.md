# PLATFORM 001 — Exact Dana TM4 SUMO MD variant evaluation

| Field | Value |
|---|---|
| Primary artifact | `SRC-DANA-000001` · `CORTM4-JRT2495-SUMOMD-0124` |
| Authority | `OFFICIAL_PUBLIC_DOCUMENT` |
| SHA-256 | `e3f3f9ba1b9e204a003fee3e300bab64da105dce622d86a4285984ba2144af28` |
| Retrieval date | 2026-08-08 |
| Battery-side authority | SC-001 … SC-015 (Webasto Standard Battery Pro 40), D-033 |
| Dana claims | SC-022 … SC-027 |
| Outcome | `PREFERRED_EXACT_SUMO_MD_VARIANT = NOT_YET_DETERMINABLE` — blocked on ODR-012 |

Withdrawn SC-020 / SC-021 values are not used anywhere in this evaluation. Variants are
never blended: every row below is one exact variant.

## 1. Provenance-locked variant table

Reproduced from SC-022. Rating conditions from SC-023: unmarked rows at **600 Vdc, 45 °C**;
`*` at **350 Vdc, 45 °C**; `**` at **650 Vdc, 45 °C**.

| System | Casing | Inverter | Peak Power | Cont. Power | Peak Torque | Cont. Torque | Max Speed | Voltage Range | Motor mass | Inverter mass |
|---|---|---|---:|---:|---:|---:|---:|---|---:|---:|
| SUMO MD MV2500-6P* | L2 | CO200 | 230 kW | 115 kW | 2500 Nm | 1140 Nm | 3000 RPM | 130-450 Vdc | 225 kg | 25 kg |
| SUMO MD HV1800-3P | L1 | CO150 | 170 kW | 100 kW | 1775 Nm | 680 Nm | 3250 RPM | 300-750 Vdc | 180 kg | 13 kg |
| SUMO MD HV2200-3P | L2 | CO150 | 215 kW | 145 kW | 2430 Nm | 1275 Nm | 2700 RPM | 300-750 Vdc | 225 kg | 13 kg |
| SUMO MD HV2200-3P** NEW | L2 | CO150 | 200 kW | 145 kW | 2200 Nm | 955 Nm | 2700 RPM | 300-800 Vdc | 225 kg | 13 kg |
| SUMO MD HV2200-6P | L2 | CO200 | 255 kW | 190 kW | 2355 Nm | 990 Nm | 3700 RPM | 300-750 Vdc | 225 kg | 25 kg |
| SUMO MD HV2400-6P | L1 | CO200 | 240 kW | 120 kW | 2300 Nm | 605 Nm | 3500 RPM | 300-750 Vdc | 180 kg | 25 kg |
| SUMO MD HV2600-6P | L2 | CO200 | 265 kW | 155 kW | 2760 Nm | 970 Nm | 3500 RPM | 300-750 Vdc | 225 kg | 25 kg |
| SUMO MD HV2800-6P** NEW | L2 | CO200 | 300 kW | 180 kW | 2860 Nm | 1050 Nm | 3500 RPM | 300-800 Vdc | 225 kg | 25 kg |
| SUMO MD HV3000-6P | L2 | CO200 | 235 kW | 145 kW | 3100 Nm | 1055 Nm | 3000 RPM | 300-750 Vdc | 225 kg | 25 kg |
| SUMO MD HV3300-6P** NEW | L2 | CO200 | 235 kW | 130 kW | 3320 Nm | 960 Nm | 3000 RPM | 300-800 Vdc | 225 kg | 25 kg |

Casing/inverter geometry (SC-024, SC-025): motor Ø 400 mm; L1 426 mm / 180 kg, L2 510 mm /
225 kg. CO150 432 x 304 x 111 mm / 13 kg; CO200 676 x 450 x 135 mm / 25 kg.

Common to all variants (SC-026, SC-027): IP67 / IP6K9K; AEC-Q100 / Q101 / Q200; GMW3172
sprung masses; **max coolant inlet 65 °C**; **coolant 40/60 water-glycol**; permanent magnet
outer-rotor motor, four-quadrant, direct axle interface without gearbox; 3-phase or 6-phase
inverter, variable switching frequency, Reflex gate driver, EMI filter. `NEW` rows carry the
750 V → 800 V increase, Quick Connect with HVIL, and a KITAS option.

## 2. Unresolved per-variant parameters (published nowhere in this artifact)

Identical for all ten variants — the sheet does not publish them:

- DC-link capacitance → Phase E precharge remains blocked (baseline §9)
- Coolant **flow rate** and **pressure drop** (only inlet temperature and coolant type are given)
- Efficiency map / DC input current → DC draw cannot be derived from shaft power
- Communications: CAN bit rate, protocol, torque-command map
- Peak-power **duration**
- Mechanical output interface detail beyond "interfaces directly with standard axles"
- Mounting geometry, bolt patterns, mounting-face datums
- Precharge responsibility (inverter-side vs pack-side)

## 3. Comparison — step 1: Dana variant vs the governed Webasto voltage window

Pack normal operating range is **333–407 V** (SC-005). Series arrangements give 1s = 333–407 V,
2s = 666–814 V. `DERIVED_CALCULATION` from SC-005 and SC-022/SC-023.

| Variant | 1s (333–407 V) inside DC range? | Rating condition inside pack window? | 2s (666–814 V) inside DC range? |
|---|---|---|---|
| MV2500-6P | YES (130–450) | **YES — 350 Vdc** | NO (666 and 814 both > 450) |
| HV1800-3P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV2200-3P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV2200-3P NEW | YES (300–800) | NO — 650 Vdc | NO (814 > 800) |
| HV2200-6P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV2400-6P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV2600-6P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV2800-6P NEW | YES (300–800) | NO — 650 Vdc | NO (814 > 800) |
| HV3000-6P | YES (300–750) | NO — 600 Vdc | NO (814 > 750) |
| HV3300-6P NEW | YES (300–800) | NO — 650 Vdc | NO (814 > 800) |

Two findings follow directly from governed evidence:

1. **MV2500-6P is the only variant whose published rating condition (350 Vdc) falls inside
   the governed pack window (333–407 V).** Its published figures therefore apply at
   approximately the voltage the pack actually delivers.
2. **A two-series Webasto string tops out at 814 V, above the maximum DC input of every
   listed variant** (450 / 750 / 800 Vdc). A simple 2s arrangement is not directly
   compatible with any of the ten without additional voltage management.

The nine HV variants do accept 333–407 V (all have 300 V minimums), but SC-023 states the
published figures are given at 600 or 650 Vdc. At roughly half to 60 % of the rating
voltage their actual output is **UNKNOWN** and cannot be inferred.

**Caveat.** 407 V is the published *normal operating* range top; the maximum charge or rest
voltage is not published in SC-001…SC-015. The 814 V figure is 2 × 407 V and the true series
maximum may differ.

## 4. Comparison — step 2: F-450 duty / performance requirement

**BLOCKED — ODR-012.** No governed duty or performance requirement exists in the repository.
ODR-004…ODR-010 cover axle weights, GVWR, frame geometry and motor documentation; none
states a duty requirement. Without it there is no criterion to rank ten variants that span
100–190 kW continuous and 1775–3320 Nm peak.

## 5. Comparison — step 3: DC power requirement

Cannot be closed. Two independent reasons:

- No duty requirement (§4), so the required shaft power is undefined.
- No efficiency map or DC input current (§2), so DC draw cannot be derived from shaft power.
  B-003 owner blocker 07 requires losses to be included, not ideal `P = V x I`.

Method, recorded for when ODR-012 lands — worked for one variant to show the shape, **not a
selection**: MV2500-6P at 115 kW continuous shaft against a 55 kW continuous pack (SC-006)
needs ≥ 3 packs *ignoring losses*, i.e. ≥ 891 kg of pack (SC-002) before enclosures, cabling
and cooling; with losses, more. Whether the vehicle needs 115 kW continuous at all is exactly
what ODR-012 must state. Pack count is derived from the specific variant's continuous power,
never from a family maximum.

## 6. Comparison — step 4: Webasto topology

`NOT_STARTED`. Depends on §3–§5 and on B-004 (VIB vs VIG/VIG Plus), which sets the true
system current ceiling above the per-pack figures.

## 7. Result

```
PREFERRED_EXACT_SUMO_MD_VARIANT = NOT_YET_DETERMINABLE
```

Ranking requires ODR-012. What the archived artifact *has* established is a hard
voltage-compatibility constraint that narrows the field independently of duty:

- `MV2500-6P` — the only variant rated at a voltage inside the governed pack window.
- The nine HV variants remain admissible only if either the pack topology is changed to
  reach ~600–650 Vdc without exceeding 750/800 Vdc, or their derated output at 333–407 V is
  established by evidence.

No cables, fuses, contactors, PDU, precharge resistor, pumps, radiator, chiller or mounting
geometry are selected here. `engine/src/platform/platform001.ts` is untouched.
