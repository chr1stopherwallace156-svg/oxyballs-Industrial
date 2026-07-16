# ELEKTRON BUILD ENGINE — RESEARCH MAP

**Standing:** core structure of the research effort, per owner
instruction 2026-07-15. These lanes are **required** for the EV
conversion knowledge base — none is optional. Every incoming research
batch is bucketed against these lanes; every lane feeds the
[second-stage filter register](candidates/RH01_SECOND_STAGE_FILTER.md)
and, after consolidation, the rev07 modules.

**Nothing in this map is doctrine.** Lanes define where to look and how
to classify — they assert no engineering content.

---

## Standing rules (apply to every lane)

1. **Quantum-inspired research cannot approve engineering.** Ever.
2. **Simulation cannot replace physical proof.**
3. **Academic research becomes `PrincipleCandidate`** unless tied to a
   Rule, Metric, Test, or NoGoCondition.
4. **Supplier datasheets are `NeedsVerification`.**
5. **OEM/regulatory sources outrank academic sources** for direct
   vehicle requirements.
6. **Every claim must include:** title, URL, exact quote,
   page/section/table, source type, confidence, verification status,
   and Build Engine impact.
7. Existing register rules continue to apply: web/forum/video =
   LeadOnly unless pointing to a primary source; regulations =
   RegulatoryCandidate; placeholders rejected; truncated quotes held;
   platform-specific application of general OEM guidance =
   NeedsVehicleSpecificBBLB.

## Lane index

| # | Lane | rev07 consolidation target | Coverage today |
|---|---|---|---|
| L1 | OEM / Ford vehicle-specific data | 05 (CAN), plus **mechanical module — GAP, see below** | CS-05/CS-07 paths; RC-15..19, RC-22/23 (locator-pending) |
| L2 | Regulatory / certification / incentive data | **module undecided — standing GAP (13_REGULATORY…?)** | CS-01..04, CS-06; RC-01..14, RC-21, RC-24..26 |
| L3 | Core EV conversion engineering | 01, 03, 07, 08 | none |
| L4 | Mechanical / structural / bracket / frame / fatigue | **no module exists — GAP** | RC-17/18/22/23 only (frame/fasteners) |
| L5 | Electrical / HV wiring / safety architecture | 06 | J1673/ISO 6469-3 NeedsExactSource; HVIL unfiltered topic |
| L6 | Battery / BMS / thermal | **no dedicated module — partial fit 06/07; GAP** | UL 2580 unfiltered topic; CARB cert-family rows RC-02/20 |
| L7 | Controls / CAN / diagnostics | 05, 09 | PATS/UIM downgraded rows; MISSING_SOURCE (bus captures) |
| L8 | Quantitative modeling / simulation / failure testing | 03, 04, 10 (methods) | none |
| L9 | Supplier data *(owner text "Supplier b" — truncated; interpreted as supplier data/baselines — confirm)* | 12 (as ODRs until verified) | NEEDS_SUPPLIER_DATA entries only; fake datasheet rejected |
| L10 | Physical truck data and real measurements | 10 | hydroboost/UIM measurement gaps (PhysicalVerificationRequired) |

---

## L1 — OEM / Ford vehicle-specific data

Sources: Super Duty / F-450/F-550 BBLB, BEMM, SVE bulletins, IVD, UIM
documentation, CAD (via upfitter access).
Rule: general-BBLB guidance never binds to a platform without the
vehicle-specific document (`NeedsVehicleSpecificBBLB`).

## L2 — Regulatory / certification / incentive data

FMVSS 305a + part 561; CARB ZEPCert; HVIP Manual/Appendix B; BAR/DMV
fuel-type-change; ACF fleet rules. All claims `RegulatoryCandidate`.
Fences: never "we comply"; never voucher promises.

## L3 — Core EV conversion engineering

- vehicle electrification architecture
- EV conversion failure modes
- system-level design verification
- stage-gate engineering validation
- test methods for converted vehicles

## L4 — Mechanical / structural engineering (brackets are core, not optional)

For brackets, battery boxes, motor mounts, and frame interfaces:

- battery enclosure mounting; battery retention
- bracket design; mounting failure modes
- fastener preload; fastener grade; torque
- frame drilling/welding limits; frame alteration rules
- fatigue; vibration; corrosion
- crash/impact and retention thinking
- FEA methods; materials engineering; manufacturing standards
- physical inspection and test methods

## L5 — Electrical / high-voltage wiring engineering

- HV cable routing; clearance; bend radius; abrasion protection
- orange cable identification; service labeling
- fuses; contactors; pre-charge circuits
- HVIL; isolation monitoring; grounding; shielding
- service disconnects; connector ratings
- water intrusion; fault response

## L6 — Battery / BMS / thermal engineering

- battery pack architecture; cell chemistry; module construction
- BMS monitoring; state of charge / state of health
- thermal management; cooling loops; thermal derating
- thermal runaway mitigation; pack enclosure testing (e.g. UL 2580 —
  NeedsExactSource)

## L7 — Controls / CAN / diagnostics

- Ford CAN architecture; PATS; gateway modules; cluster behavior
- ABS/ESC communication; OBD-II
- BMS CAN; inverter CAN; charger CAN
- fault codes; limp mode; diagnostic reporting
Evidence rule: proprietary message behavior requires real-vehicle bus
capture (MISSING_SOURCE until captured).

## L8 — Quantitative modeling / simulation / failure testing

- range modeling; route energy modeling; gradeability
- axle loading; GVWR/GAWR modeling; battery mass effects; center of
  gravity
- thermal stress modeling; FEA; CFD
- Monte Carlo stress testing; design-of-experiments; optimization
Fence: **simulation output can never make a real build stage pass —
physical proof only** (standing rule 2).

## L9 — Supplier data

Datasheets, derating curves, thermal coefficients, connector/cable
ratings — all `NeedsVerification` on arrival; anonymous or placeholder
supplier rows are rejected outright (precedent: batch_01 rejection).
*(Lane name truncated in owner instruction ("Supplier b") —
interpretation "supplier data" pending owner confirmation.)*

## L10 — Physical truck data and real measurements

Real F-450/F-550 measurements: hydroboost geometry, frame hole
patterns, hardpoints, driveline centers, bus captures. Method, device,
calibration status, and uncertainty required with every measurement;
scan data is candidate-only until verified (per M8 doctrine-to-be).

## Quantum-inspired optimization — FUTURE ONLY (not a numbered lane)

Candidate future applications: battery placement, cable routing,
weight distribution, cooling layout, fleet charging, route/range,
supplier selection. **May never approve engineering, verify safety,
fitment, or compliance** (standing rule 1). Kept out of the required
lanes so it can never gate or substitute for them.

---

## Current research priorities — gap-closure mode (owner, reviews 02/04)

Broad mapping is done. One gap per payload, using the owner's
gap-closure prompt template (archived in
`raw/owner_reviews/review_04_batch_09_verdict.md`). Owner's execution
order (CAN/PATS deliberately last — proprietary depth): **HV wiring →
MSD/contactors/fuses/pre-charge/HVIL → cooling → EHPS brake/steering →
supplier datasheets → CAN/PATS.**

1. **HV wiring** (L5) — **CANDIDATE ARCHITECTURE STAGE** (batches
   09–13): Coroflex 6.0/35/50 mm² cables (part-scoped bend radii),
   Kilovac EV200 (+ pre-charge no-go candidate), Eaton EV fuse family
   + aux fuses, TE Mini K pre-charge relay (**voltage-suitability
   OpenGap: 400/450 VDC vs pack**), Miba pre-charge calculation
   CandidateRule (U, C, t, Imax, E), Sendyne SIM100MLP
   (+NeedsCANProtocolDocument), Chilye MSD, GTR 20 ≤0.1 Ω bonding
   candidate, Metrel 4-wire Kelvin method (InstrumentationCandidate),
   ISO 20653 path, **Amphenol HVBI connectors (03R8 180 A / 05R10
   250 A dual candidates — batch_14, official Amphenol server)**.
   **STATUS: HV Wiring Package v0.1 (batch_15 Decision Matrix,
   owner-labeled)** — candidate architecture mapped, component families
   identified, open blockers documented, final selection halted,
   engineering review required. **L5 research is HELD** (no more broad
   HV wiring payloads). Research-side residue: official ISO 20653/lab
   IP procedure; official bonding threshold + full procedure incl.
   surface prep. Everything else waits on the powertrain definition
   below.

   **ACTIVE FOCUS → POWERTRAIN DEFINITION (L9/L6, owner review_10):**
   candidate battery pack / inverter / motor supplier datasheets for a
   Class 4/5 conversion. Extraction fields — Battery: nominal V, max V,
   usable kWh, cont./peak discharge I, short-circuit I or internal R,
   BMS diagnostics, thermal derating, coolant needs, mass, dimensions,
   mounting, CAN protocol, supplier status. Inverter: DC input V range,
   cont./peak DC I, phase I, DC-link capacitance, derating, coolant,
   pre-charge requirements, CAN, fault outputs. Motor: cont./peak
   power + torque, max RPM, cooling, mass, mounting, duty-cycle
   limits. Outputs: candidate powertrain table, missing-datasheet
   list, values-to-unlock mapping, per-value Build Engine status.
   **No final parts, nothing Confirmed.**

   **Status (batch_16):** first candidates named — Webasto CV Standard
   Battery + VIB (**LegacyCandidate** — Pro 40 successor question) and
   Dana TM4 SUMO MD — but delivered **sourceless** (no URLs/quotes;
   everything NeedsExactSource) and with a face-value **power
   mismatch** (owner P=V×I check: ≤60/100 kW available vs 130/250 kW
   target → **blocker B-003 POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED**).
   **Next payload: the Powertrain Compatibility Check** (8 checks,
   compatibility table, mismatch warnings, supplier questions). The 20
   recorded supplier questions (10 Webasto / 10 Dana, review_11) are
   owner/business outreach actions. Component selection everywhere
   stays blocked until B-003 resolves.
2. **Cooling** (L6) — EMPTY: battery/motor/inverter/charger/DC-DC
   loops, pump + radiator sizing, flow, pressure drop, derating,
   high-ambient testing.
3. **Brake/steering CP#1** (L10/L4) — CANDIDATE PATH ONLY (Brogen
   EHPS): Ford hydroboost pressure/flow requirements, LV backup
   behavior, failure modes, mounting/fitment measurement, test
   procedure.
4. **CAN/PATS CP#2** (L7) — OPEN: Super Duty CAN behavior, PCM delete,
   PATS/cluster/gateway impact, UIM limitations, real capture plan,
   expert diagnostics.
5. **Supplier datasheets** (L9) — actual PDFs required: battery pack,
   BMS, motor, inverter, charger, DC-DC, contactors, fuses, HV cable,
   MSD, coolant pump, radiator/heat exchanger, EHPS pump.
6. **Failure modes / test methods** (L8/L3) — EMPTY: isolation fault,
   cable abrasion, water intrusion, pre-charge failure, contactor
   weld, cooling failure, thermal derating, BMS fault, CAN fault,
   brake/steer assist failure, post-drive inspection.

## Open mapping gaps (owner decision required)

1. **L2 regulatory module** — standing question (Module 01 vs new
   `13_REGULATORY_AND_INCENTIVES`).
2. **L4 mechanical/structural module** — no rev07 module covers
   frames/brackets/enclosure mounting/fatigue; propose
   `14_MECHANICAL_STRUCTURAL` or explicit assignment.
3. **L6 battery/BMS/thermal module** — only partially covered by 06
   (HV precharge/shutdown) and 07 (inverter/motor); propose
   `15_BATTERY_BMS_THERMAL` or explicit assignment.
4. **L9 lane name** — confirm "Supplier data" interpretation.
