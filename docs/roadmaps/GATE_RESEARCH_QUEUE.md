# GATE RESEARCH QUEUE

The ordered, supplier-independent research plan for proceeding while
supplier answers are parked in
[`docs/status/BLOCKED_QUESTIONS_LEDGER.md`](../status/BLOCKED_QUESTIONS_LEDGER.md)
(owner directive, 2026-07-16 —
`docs/research/raw/owner_directives/directive_01_park_and_proceed.md`).

Each entry holds the **owner's verbatim research prompt** so the next
Research Hunter batch can be run without loss. The Build Engine reconciles
each returned batch through the normal second-stage filter; the standing
rules (nothing Confirmed, no compliance claim, modeling statuses, name
the missing supplier data) still apply.

## Order (owner "best order from here")

1. **Gate 04B** — Brake / Steering validation tests *(next target)*
2. **Gate 04C** — EHPS low-voltage / DC-DC impact
3. **Gate 05** — CAN / Controls / Cluster integration
4. **Gate 06** — Mechanical mounting / Battery enclosure
5. **Gate 07** — Weight / Axle load / CG
6. **Gate 08** — Failure modes + test procedures

---

## Gate 04B — Brake / Steering Test Plan  · STATUS: FIRST PASS DONE (batch_25)

First pass reconciled in batch_25 → `REGULATORY_TEST_SOURCE_FOUND /
NEEDS_BRAKE_ENGINEER_MAPPING` (CS-55 FMVSS/TSD 105; RC-88/89/90). Still
open: parse the exact 49 CFR §571.105 table rows and get a brake
engineer to map the stopping-distance / partial-failure / fade-recovery /
parking-brake / warning-lamp requirements to this vehicle class.

Focus: FMVSS 105 brake test procedure, loaded low-speed steering test,
hydroboost failure response, loss-of-EHPS-pump behavior, low-voltage
failure behavior, brake warning-lamp requirements, stopping-distance
tests, parking-brake tests, partial-failure tests, power-off reserve
stops.

**Owner prompt (verbatim):**

> We are continuing Gate 04: Brake / Steering Assist while supplier responses are pending.
>
> Do not select final parts.
> Do not mark anything Confirmed.
>
> Research only validation tests and failure-mode procedures for a converted Ford F-450/F-550 hydraulic brake/steering system.
>
> Find sources for:
> 1. FMVSS 105 hydraulic brake test procedure
> 2. stopping distance requirements
> 3. fade and recovery testing
> 4. partial failure brake testing
> 5. warning lamp requirements
> 6. parking brake testing
> 7. power-off brake reserve testing
> 8. loaded low-speed steering test methods
> 9. steering assist loss failure behavior
> 10. EHPS pump failure response
> 11. low-voltage power failure response
> 12. pressure sensor / warning logic
>
> For every source, provide:
> - exact title
> - URL
> - source type
> - exact quote
> - page/section/table
> - test condition
> - pass/fail item
> - Build Engine impact: Test / NoGoCondition / OpenGap / Rule
> - verification status
> - missing data still needed
>
> Hard rules:
> - Do not claim compliance.
> - Do not say the vehicle is safe.
> - Do not create final pass/fail numbers unless the source is primary regulation, OEM, or accepted test standard.

## Gate 04C — EHPS Electrical / Low-Voltage Architecture  · STATUS: FIRST PASS DONE (batch_25)

Focus: 800V→12V DC-DC converter sizing, 12V battery buffer, ultracapacitor
buffer, high-current 12V fuse sizing, low-voltage brownout risk,
pump relay/contactor control, emergency fallback power, pressure-sensor
warning logic.

**Owner prompt (verbatim):**

> We are researching the low-voltage power impact of an EHPS brake/steering assist system.
>
> Do not select final parts.
> Do not mark Confirmed.
>
> Research engineering sources for:
> 1. 800V-to-12V DC-DC converter sizing for high-current auxiliary loads
> 2. 12V bus voltage sag under transient loads
> 3. ultracapacitor or auxiliary battery buffering
> 4. high-current fuse and relay sizing
> 5. low-voltage fault detection
> 6. emergency backup power for steering/brake assist
> 7. pressure sensor integration
> 8. warning lamp or driver alert logic
> 9. safe shutdown behavior if EHPS power fails
>
> Output:
> - modeling rules
> - candidate tests
> - OpenGaps
> - what supplier data is still required

## Gate 05 — CAN / Controls / Cluster Integration  · STATUS: FIRST PASS DONE (batch_25)

**Terminology rule (standing):** authorized Ford-compatible controls
integration, immobilizer-safe architecture, diagnostic compatibility,
cluster serviceability. **NEVER "PATS bypass/override."**

**Owner prompt (verbatim):**

> We are starting Gate 05: CAN / Controls / Cluster Integration.
>
> Do not provide anti-theft bypass instructions.
> Do not use bypass language.
> Do not mark anything Confirmed.
>
> Research only authorized Ford-compatible controls integration for a Ford F-450/F-550 EV conversion candidate.
>
> Find sources for:
> 1. Ford Super Duty CAN architecture
> 2. body control module dependencies
> 3. instrument cluster dependencies
> 4. ABS / traction / stability communication dependencies
> 5. PCM removal risks
> 6. upfitter interface module limits
> 7. J1939 gateway options
> 8. EV inverter/BMS J1939 integration
> 9. diagnostic trouble code behavior
> 10. immobilizer-safe serviceable architecture
> 11. warning lamp strategy
> 12. post-conversion scan tool/service requirements
>
> For every source, provide:
> - exact title
> - URL
> - source type
> - exact quote
> - page/section/table
> - what claim it supports
> - Build Engine impact
> - verification status
> - missing data still needed
>
> Hard rules:
> - Do not instruct how to defeat anti-theft.
> - Do not claim OEM compatibility.
> - Forum posts are LeadOnly.
> - Ford/OEM/service documentation is preferred.

## Gate 06 — Mechanical Mounting / Battery Enclosure  · STATUS: FIRST PASS DONE (batch_25)

Focus: Ford frame modification rules, battery tray design, bracket
fatigue, fastener preload, welding/drilling restrictions, vibration
testing, corrosion protection, underbody impact protection, service
access, water drainage, pack venting direction.

**Owner prompt (verbatim):**

> We are starting Gate 06: Mechanical Mounting / Battery Enclosure.
>
> Research only Class 4/5 battery enclosure, frame mounting, bracket, and structural integration requirements for a Ford F-450/F-550 EV conversion.
>
> Find sources for:
> 1. Ford body builder frame modification guidance
> 2. frame drilling and welding restrictions
> 3. battery tray / enclosure mounting methods
> 4. bracket fatigue and vibration standards
> 5. fastener preload and locking methods
> 6. corrosion protection
> 7. road debris and underbody impact shielding
> 8. water drainage and service access
> 9. pack venting direction
> 10. FEA validation methods
> 11. physical pull / vibration / road test validation
>
> Hard rules:
> - Do not invent bracket thickness.
> - Do not invent bolt sizes.
> - Do not approve welding or drilling without Ford/OEM or engineering review.
> - Mark all structural conclusions NeedsEngineeringReview.

## Gate 07 — Weight / Axle Load / CG  · STATUS: v0.1 FIRST PASS DONE (batch_26)

First pass reconciled in batch_26 → Gate 07 v0.1 (CS-59/60/61,
RC-99..102). Truth hierarchy set (scale > door label > marketing);
platform split D-006 (001A gas / 001B diesel); source downgrades applied.
**Split into three sub-gates:**

- **Gate 07A — Door Label + Baseline Scale Ticket** (the real first
  closure step; field capture, not a Hunter batch): VIN, wheelbase, cab
  config, GVWR, front GAWR, rear GAWR, tire size/load rating, wheel
  rating, baseline front/rear/total axle weights.
- **Gate 07B — Removed / Added Mass Ledger** → **STATUS: NEXT** (prompt
  below).
- **Gate 07C — Axle Moment Calculator** (RC-100): moment = weight ×
  distance-from-front-axle; rear = Σmoments ÷ WB; front = total − rear;
  keep ≥20–30% on the front steering axle; **simulation-only until scale
  tickets verify.**

**Original Gate 07 prompt (verbatim, batch_26):**

> We are starting Gate 07: Weight / Axle Load / Center of Gravity.
>
> Research only Ford F-450/F-550 Class 4/5 weight, axle load, payload, and CG validation for an EV conversion.
>
> Find sources for:
> 1. GVWR and front/rear GAWR by model year and wheelbase
> 2. door-label data capture procedure
> 3. scale-ticket procedure
> 4. removed engine/transmission/fuel/exhaust component weights
> 5. added battery/motor/inverter/enclosure/cooling system weights
> 6. front/rear axle load calculation
> 7. center-of-gravity height and longitudinal CG calculation
> 8. suspension and tire load-rating checks
> 9. brake performance dependency on final weight
> 10. post-build weigh-in validation
>
> Hard rules:
> - Physical scale ticket overrides estimates.
> - Do not mark any weight condition safe without actual scale data.
> - Do not exceed GVWR, front GAWR, rear GAWR, tire rating, or wheel rating.
> - All estimates are NominalAssumption until measured.

## Gate 07B — Removed / Added Mass Ledger  · STATUS: v0.2 FIRST PASS DONE (batch_27)

Deliverable is the living **`docs/status/MASS_LEDGER.md`** (RM-01..06 /
AM-01..05 tracker, 3-phase scale procedure, operating-state cases,
release gate). Owner corrections applied: gas/diesel split (D-006 —
gas 001A ledger still OUTSTANDING); four-corner (LF/RF/LR/RR) + transverse
CG instead of "three-pad"; milestone dates; 500 lb FMVSS-105 passenger
load; the "no road test until…" release gate (RC-106).

**Original Gate 07B prompt (verbatim, batch_27):**

> We are continuing Gate 07: Weight / Axle Load / Center of Gravity.
>
> Do not mark anything Confirmed.
> Do not use generic specs as final donor-truck data.
>
> Create a Removed / Added Mass Ledger for a Ford F-450/F-550 EV conversion.
>
> Research and structure:
> 1. removed engine/transmission/fuel/exhaust/cooling/DEF component weight categories
> 2. added battery/motor/inverter/enclosure/cooling/HV/LV component weight categories
> 3. required measurement method for each item
> 4. whether supplier datasheet, physical scale, or estimate is allowed
> 5. how each mass links to front/rear axle moment calculations
> 6. what must be captured before teardown
> 7. what must be captured after teardown
> 8. what must be captured after final build
>
> Hard rules:
> - Physical scale values override estimates.
> - Estimates are NominalAssumption only.
> - Final validation requires certified front axle, rear axle, and total vehicle scale tickets.

## Gate 07C — Axle Moment Calculator + CG Method  · STATUS: NEXT (owner review_24)

**Owner prompt (verbatim):**

> We are continuing Gate 07: Weight / Axle Load / Center of Gravity.
>
> Build the Axle Moment Calculator and CG Calculation Method.
>
> Do not mark anything Confirmed.
> Do not use estimates as final values.
>
> Research and structure:
> 1. front/rear axle moment equations
> 2. four-corner weight method
> 3. longitudinal CG calculation
> 4. transverse CG calculation
> 5. vertical CG measurement methods
> 6. tilt-table or lift-based CG height method
> 7. how to model removed component mass
> 8. how to model added battery/enclosure mass
> 9. how to flag GVWR/GAWR/tire/wheel overload
> 10. how to connect CG results to FMVSS 105 brake testing and stability concerns
>
> Output:
> - allowed equations
> - required input fields
> - blocked fields
> - nominal assumptions
> - physical verification steps
> - Build Engine pass/block logic

## Gate 08 — Failure Modes + Test Procedures  · STATUS: QUEUED

*(Owner prompt not yet supplied; sequence position 6. To be researched
after Gate 07.)*
