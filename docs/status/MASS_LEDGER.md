# REMOVED / ADDED MASS LEDGER (Gate 07B)

The living weight/axle/CG record for the F-450/F-550 EV conversion
(Gate 07B, batch_27 + owner review_24). Every part removed from or added
to the chassis is tracked here with a measurement method, data class,
axle-moment relationship, and verification status.

**Truth hierarchy (hard):** certified scale tickets > VIN door-label
GVWR/GAWR > any catalog/supplier estimate. **Estimates are
`NominalAssumption` only** and may never become final proof. **Nothing
here is Confirmed; no weight condition is marked safe** without a
certified scale ticket + engineering signoff.

**Platform branches (D-006 — do NOT mix):**

- **Platform 001A — 7.3L GAS donor** (the active build direction): **no
  DEF, no DPF/SCR**, gas engine weight, gas exhaust/cooling/fuel system.
- **Platform 001B — 6.7L DIESEL donor** (separate): DEF system, DPF/SCR,
  heavier engine package, different front-axle baseline.

> **Recurrence note:** the batch_27 removal ledger below was delivered
> built on the **6.7L diesel** (DEF/DPF/SCR). It is therefore tagged
> **Platform 001B** as received. **The Platform 001A (gas) removal ledger
> is still OUTSTANDING** — the gas engine/exhaust/cooling/fuel weights and
> the absence of DEF/DPF must be researched/measured separately. This is
> the second time the gas/diesel split had to be corrected (see D-006).

---

## Section A — Removed Mass (Platform 001B diesel as received; 001A gas OUTSTANDING)

All target weights are **NominalAssumption** — placeholders for
simulation, to be replaced by physical load-cell / scale weighing before
final layout. **None are donor-truck values.**

| Code | Component (001B diesel) | Measurement method | Data class | Axle-moment relationship | Status |
|---|---|---|---|---|---|
| RM-01 | Engine assembly, dressed (6.7L Power Stroke V8, turbos, manifolds, accessories) | Engine-hoist load-cell crane scale | NominalAssumption (~1,100 lb / 499 kg wet) | Front-axle overhang moment (fwd of / spanning front wheel CL) | OpenGap |
| RM-02 | Transmission + torque converter (10R140, w/ fluid) | Transmission-jack platform scale | NominalAssumption (~350 lb / 159 kg) | Mid-chassis span, splits front/rear | OpenGap |
| RM-03 | Fuel storage (tank, brackets, remaining diesel) | Floor scale after draining | NominalAssumption (~250–350 lb, WB-dependent) | Concentrated over rear axle | OpenGap |
| RM-04 | Exhaust aftertreatment (SCR, DPF, muffler, tailpipes) — **001B only** | Component floor scale | NominalAssumption (~150–200 lb) | Asymmetric side-rail, biased behind cab | OpenGap |
| RM-05 | Engine cooling (radiators, CAC, fan shroud, oil coolers) | Dry weigh + drained-fluid calc | NominalAssumption (~120 lb) | Forward-most front-axle moment arm | OpenGap |
| RM-06 | DEF sub-system (tank, fluid, brackets, injection) — **001B only** | Floor scale | NominalAssumption (~50–70 lb) | Localized rear-axle load point | OpenGap |

**Platform 001A (gas) removal ledger — TO RESEARCH/MEASURE:** 7.3L gas
engine (dressed), transmission (gas application), fuel system (gasoline),
gas exhaust (no DPF/SCR/DEF), engine cooling, accessories. Do not copy
the diesel figures.

## Section B — Added Mass (both platforms)

| Code | Component | Measurement method | Data class | Axle-moment relationship | Status |
|---|---|---|---|---|---|
| AM-01 | HV battery enclosure modules (cells, busbars, thermal plates, box) | Hoist load-cell before install | NominalAssumption → from tier-1 supplier docs | Rigid mid-rail moment arm; distributed across webs by CoM offset | NeedsSupplierData |
| AM-02 | Electric drive unit (traction motor + reduction gearset) | Industrial platform scale | NominalAssumption (supplier sheet) | Fixed vs permanent cross-members | OpenGap |
| AM-03 | Traction inverter + power electronics (inverter, DC-DC, PDU) | Precision component scale | NominalAssumption | Distributed front-bay | OpenGap |
| AM-04 | Auxiliary thermal (chillers, EV pumps, coolant lines, HX) | Dry weigh + fluid density calc | NominalAssumption | Front-bay structural load | OpenGap |
| AM-05 | LV buffer + network hardware (EHPS backup buffer / ultracap) | Floor scale | NominalAssumption | Under-cab / mid-chassis cavity | OpenGap |

## Operating-state weight cases (owner review_24 — must judge loaded, not just empty)

The final EV weight must be evaluated across operating states, not curb
only: **curb EV weight; driver/passenger allowance; tools/equipment;
fleet payload; body/upfit weight; coolant full; washer fluid full; LV
battery installed; spare tire/tools if retained.** Per the Ford General
BBLB, **FMVSS 105 passenger load = 500 lb for vehicles >10,000 lb GVWR**
(RC-105) — use this in the brake/CG cases.

---

## Scale-Ticket Procedure (3 phases)

**Scale method (owner correction):** the "three-pad" framing is wrong —
the layout is two axle pads. Use a **certified axle scale (front axle +
rear axle + total)** as the *minimum*, and a **four-corner scale (LF, RF,
LR, RR)** as *preferred*. Per the Ford General BBLB: front axle = LF+RF,
rear axle = LR+RR; four-corner weights + track widths give **transverse
CG** (RC-103/104).

**Also capture left/right:** LF, RF, LR, RR wheel loads; transverse-CG
estimate; **side-to-side balance warning** (battery boxes, cooling loops,
HV junction boxes, and asymmetric ICE-removal offsets can bias one side).

### Phase 1 — Pre-teardown (baseline), milestone: **before first wrench**
1. Drive the complete operational donor onto a certified axle/four-corner
   scale; fluids topped off.
2–3. Log front-axle and rear-axle baseline curb weights (and LF/RF/LR/RR
   if four-corner).
4. Record combined total; confirm axle sum = total (integrity check).
5. Physically capture the door-jamb label: VIN-specific **GVWR, front
   GAWR, rear GAWR** (these govern — RC-101/102).

### Phase 2 — Post-teardown (stripped), milestone: **before final bracket welding/bolting**
1. Return the bare rolling chassis to the scale after ICE removal
   (RM-01..06 for the correct platform).
2–3. Log stripped front/rear (and four-corner) loads.
4. Subtract stripped from baseline to cross-verify actual mass removed
   against the line-item ledger.

### Phase 3 — Post-final-build (completed EV), milestone: **before road test**
1. Roll the finished EV (all added modules, HV enclosures, upfits, fluids)
   onto the certified scale.
2–4. Capture final front, rear (and four-corner) and total certified mass.
5. Release checks below.

---

## Release gate — NO ROAD TEST until (owner review_24)

- [ ] final front-axle weight ≤ front GAWR
- [ ] final rear-axle weight ≤ rear GAWR
- [ ] final total weight ≤ GVWR
- [ ] each tire/wheel load ≤ rated capacity
- [ ] side-to-side imbalance reviewed
- [ ] certified scale ticket uploaded/archived
- [ ] engineering signoff complete

*(This is a NoGoCondition — RC-106. It is a release rule, not a claim of
safety; all boxes require physical evidence + signoff.)*

---

## Still blocked (physical / supplier)

Donor VIN / door label · baseline scale ticket · stripped-chassis scale
ticket · final EV scale ticket · four-corner weight data · actual removed
component weights (per platform) · actual added component weights · final
battery-enclosure CG (X/Y/Z) coordinates · tire/wheel/suspension load
check. Supplier-preferred items are parked in
`BLOCKED_QUESTIONS_LEDGER.md` (BQ-13..BQ-15).
