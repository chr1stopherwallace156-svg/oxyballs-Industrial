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
   Rule, Metric, Test, or NoGoCondition. **Lane doctrine (owner,
   review_16): academic/scientific sources build modeling frameworks —
   statuses `EngineeringBackground`, `AcademicPrincipleCandidate`,
   `ModelingFramework`, `NeedsSupplierData`,
   `NeedsPhysicalVerification` — and may NEVER be marked `Confirmed`,
   `FinalRule`, or `BuildReady`. Academic sources cannot close a
   supplier gate.**
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
   **Compatibility check done (batch_17, corrected by review_12):**
   single pack rejected; 400 V 1s3p risky (VIB 380 A cont / 580 A peak
   limits — peak demand ≈663 A exceeds it); 800 V 2s1p underpowered;
   **800 V 2s2p/4-pack = strongest minimum candidate for review**
   (RC-60 — derived, lossless, unverified inputs). **B-004
   INTERFACE_SELECTION_REQUIRED filed** (VIB vs VIG/VIG Plus changes
   all current limits); B-003 extended with blockers 04–08 (topology
   declaration, interface, minimum-voltage current check, loss
   correction, weight/space/axle/cooling for 4–6 packs). Supplier
   outreach package now 24 questions incl. the owner's combined
   configuration question. **Everything remains candidate-level:
   both powertrain batches were sourceless — official Webasto/Dana
   datasheets must be archived before any figure is usable.**

   **Outreach state (batch_18/review_13):** the consolidated Webasto
   inquiry is **READY_TO_SEND** at
   `docs/research/outreach/SUPPLIER_INQUIRY_WEBASTO_01.md`
   (owner-approved 9-question letter; sending is an owner action).
   VIG/VIG Plus figures on file (RC-61: 1,215 A cont / 1,400 A peak,
   18 packs — sourceless, "no HV limitation" fenced). Replies get
   archived 1:1 under `docs/research/raw/supplier_replies/` and are
   the first evidence class that can resolve B-003/B-004. A parallel
   Dana/TM4 inquiry (10 questions, review_11) is not yet drafted into
   a letter.
2. **Cooling** (L6) — **Cooling Package Gate v0.1** (batch_19,
   owner-labeled): architecture mapped (battery/inverter/motor loops,
   flow/pressure, radiator/pump/heat-exchanger sizing frames), source
   metrics partially identified (RC-62/63 — all sourceless),
   calculations halted, **supplier thermal maps required** (thermal
   addenda now on both outreach letters: 9 Webasto + 10 Dana
   questions). No pump/radiator/chiller may be picked. Canonical
   design case: **Cajon Pass sustained 6–8% grade at GVWR** — the
   battery-throttling/inverter-derating overlap curve is the key
   unmapped rule input. Owner corrections in force: cooling sizes to
   LOSSES (efficiency maps), not output; 10 l/min×N is a hydraulic
   assumption pending manifold approval; 25–35 °C is a
   ThermalTargetAssumption; 65 °C inlet NeedsOfficialDanaSource;
   "Validated" is a RESERVED term (M10 controlled vocabulary).
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

## Gate roadmap after cooling (owner, review_16; re-ordered directive_01)

While the HV wiring + powertrain + cooling gates sit at
**BLOCKED_PENDING_SUPPLIER_DATA**, the research sequence continues.

**Operating rule (owner directive_01, 2026-07-16 — "do not wait"):**
supplier-only values are parked in
[`docs/status/BLOCKED_QUESTIONS_LEDGER.md`](../status/BLOCKED_QUESTIONS_LEDGER.md)
and research keeps moving on supplier-independent work. The ordered,
supplier-independent plan with the owner's verbatim prompts lives in
[`docs/roadmaps/GATE_RESEARCH_QUEUE.md`](../roadmaps/GATE_RESEARCH_QUEUE.md).
**Best order from here:** Gate 04B → 04C → 05 → 06 → 07 → 08.

**Gate-state snapshot (owner review_22, batch_25 — first parallel pass):**

- **Gate 04 (Brake/Steering):** `BLOCKED_PENDING_SUPPLIER_RESPONSE`.
- **Gate 04B (Brake Test Mapping):** `REGULATORY_TEST_SOURCE_FOUND` /
  `NEEDS_BRAKE_ENGINEER_MAPPING` (CS-55 FMVSS/TSD 105; RC-88/89/90).
- **Gate 04C (Low-Voltage Architecture):** `OEM_ELECTRICAL_RULE_SOURCE_FOUND`
  / `DC_DC_SIZING_OPEN` (anchor RC-91 Ford BBLB electrical-load rule;
  vendor rows RC-92/93 LeadOnly).
- **Gate 05 (CAN/Controls):** `STARTED` /
  `NEEDS_OFFICIAL_FORD_SUPER_DUTY_SOURCE` / **NO SECURITY-BYPASS LANGUAGE**
  (RC-94/95/96; frame as authorized serviceable integration).
- **Gate 06 (Mechanical Mounting):** `OFFICIAL_FRAME_RULE_CANDIDATES_FOUND`
  / `NEEDS_PLATFORM_SPECIFIC_CONFIRMATION` / `NEEDS_STRUCTURAL_ENGINEER_REVIEW`
  (RC-97 refines RC-22; RC-98).
- **Next: Gate 07 (Weight / Axle Load / CG).**

4. **Brake / Steering Assist Gate (CP#1) — Gate 04 v0.4 (batch_23):**
   architecture strong; a **complete** EHPS candidate now exists, but
   the replacement system is NOT proven and final selection is halted.
   Core rule: EHPS must support simultaneous brake + steering demand
   (RC-74 — never size steering alone). **First complete EHPS candidate:
   ZF EPHS MPU 100-C** (CS-53 — 1.32–3.17 GPM / 113–124.5 bar /
   2500–6000 rpm; **CompleteEHPSCandidate / MotorsportSupplierCandidate
   / NeedsCommercialDutyReview / NeedsHydroboostCompatibilityReview /
   NeedsCurrentMap / NeedsThermalDeratingData**). Two owner defect-
   catches held it at altitude: the batch's "CAN control" claim is
   **refuted** by the ZF factsheet's "No connection to the CAN bus
   required" (RC-83 → control/diagnostics = NeedsSupplierData), and ZF
   is a **motorsport** pump, not proven commercial-duty (RC-84). Earlier
   candidates unchanged: Ford-style 1750 psi / 3.25 GPM (CS-51, now
   FordStyleHydroboostPumpReference / NeedsFordExactSource — **not** the
   native Super Duty spec); medium-duty 2683 psi / 6.30 GPM (CS-52,
   HydraulicPumpCandidate). Ford return-line hose corroborates the
   ~1750 psi envelope but is a hose spec, not the pump curve (CS-54).
   Power/current ~2.5–3.3 kW / ~250–300 A is **EngineeringEstimate /
   NeedsZFCurrentMap** (RC-85) — do NOT size the DC-DC from it alone
   (feeds RC-81). Primary brake regulation lane = **FMVSS 105** (CS-49);
   test map must cover partial-failure, fade/recovery, water recovery,
   stability/control, parking brake, warning lamp — not just stopping
   distance (RC-87). Still blocked: exact Ford F-450/F-550 pump curve,
   steering-gear requirement, hydroboost accumulator reserve, true EHPS
   motor/controller data, DC-DC sizing, FMVSS 105 test mapping, loaded
   low-speed steering test procedure. **Next payload (owner): FMVSS 105
   brake test mapping + loaded low-speed steering test procedure**, while
   the ZF/Ford/Lee supplier questions wait (ZF packet drafted as
   `SUPPLIER_INQUIRY_ZF_01.md`, DRAFT). Enforcement unchanged: hydraulic-
   pump data alone is not enough; a Dodge/Mopar EHPS example is LeadOnly
   until pressure/flow/current/duty are proven. *(owner correction,
   review_17: NOT "auxiliary vacuum pump" — F-450/F-550 use hydroboost
   / hydraulic brake + power-steering assist).* Scope: determine the
   factory Ford brake-assist and steering-assist architecture; identify
   what assist is lost when the engine-driven pump is removed; evaluate
   electric-hydraulic pump, accumulator/reserve assist, fault warning,
   low-speed steering load, brake-assist failure mode, and test plan.
   **State flags (owner review_21, batch_24): `CANDIDATE_EHPS_FOUND` /
   `FINAL_SELECTION_HALTED` / `BLOCKED_PENDING_SUPPLIER_RESPONSE`** — the
   candidate path is found but unproven; the gate now waits on ZF and
   Ford/Lee supplier answers (`SUPPLIER_INQUIRY_ZF_01.md` and
   `SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`, both DRAFT). **Regression
   watch:** the ZF "CAN control" and "commercial-duty validated" claims
   RECURRED in batch_24 one batch after correction (re-corrected — RC-83/
   RC-84); recorded as the second corrected-claim recurrence (after PATS)
   and a leading M10 regression-scanner use-case.
4B. **Brake/Steering Validation sub-gate — Gate 04B (owner review_21):**
   *FMVSS 105 Brake Test Mapping + Loaded Low-Speed Steering Test
   Procedure.* The next research target. **Owner instruction: the next
   research is NOT more generic hydroboost** — it is supplier
   confirmation (ZF/Ford/Lee) plus brake/steering validation testing.
   FMVSS 105 stays the brake-testing lane but needs a brake engineer /
   test plan before any compliance claim; the loaded low-speed steering
   test must exercise max front GAWR at slow speed.
4C. **EHPS Electrical / Low-Voltage Architecture — Gate 04C (owner
   directive_01):** the EHPS may hit the 12 V system hard, so its
   low-voltage impact is researched **now**, in parallel, without ZF's
   final current map. Scope: 800V→12V DC-DC converter sizing for
   high-current auxiliary loads, 12 V bus sag under transient loads,
   ultracapacitor / auxiliary-battery buffering, high-current fuse/relay
   sizing, low-voltage fault detection, emergency backup power for
   steering/brake assist, pressure-sensor integration, warning-lamp /
   driver-alert logic, safe shutdown if EHPS power fails. Output limited
   to modeling rules / candidate tests / OpenGaps + named supplier data
   still required. Loops with RC-81/RC-85 (the DC-DC OpenGap and the ZF
   current estimate — parked as BQ-02 in the Blocked Questions Ledger).
5. **CAN / Controls / Cluster / Immobilizer Gate (CP#2)** — *(owner
   correction, review_17: NEVER "PATS bypass / override" language —
   that reads as defeating anti-theft).* Scope: **authorized
   Ford-compatible controls integration, gateway compatibility,
   immobilizer-safe architecture, cluster/CAN diagnostics, and
   serviceability review.** Standing terminology rule for all future
   batches.
6. Mechanical Mounting / Battery Enclosure Gate
7. **Weight / Axle Load / CG Gate — v0.1 (batch_26):** structured around
   the right truth source (door label + scale tickets + component mass
   ledger), not closed. **Truth hierarchy:** certified scale data > VIN
   door-label GVWR/GAWR > marketing/dealer charts; GVWR / front GAWR /
   rear GAWR / tire / wheel are hard no-go boundaries (RC-99/102).
   **Platform split (D-006):** 001A = 7.3L **gas** (active) vs 001B =
   6.7L diesel — no diesel weight/CG in the gas model. Split into three
   sub-gates: **07A** door-label + baseline scale ticket (real first
   closure step); **07B** removed/added mass ledger (**next**); **07C**
   axle-moment calculator (RC-100, simulation-only until scale tickets
   verify). Downgrades: Scribd BBLB → CandidateSourcePath/
   NeedsOfficialFordCopy; dealer page → FleetBackground; factory engine
   CG → NominalAssumption until measured (not supplier-only). Enclosure
   mounting links back to the Gate 06 frame rules (RC-97/RC-22).
8. Failure Mode + Test Procedure Gate
9. Physical Measurement / 3D Scan Gate
10. Supplier Second-Source Comparison Gate
11. Business / Fleet Readiness Scan Package

**Next expected batch (owner review_34):** **Gate 05D — State Transition +
Ownership Matrix** — per state: state, owner, entry conditions, exit
conditions, allowed outputs, blocked outputs, fault transitions, required
proof artifact, authority status, supplier data needed. Keep the ownership
discipline — the VCU **coordinates** but owns nothing safety-critical
(contactors / pre-charge / HV shutdown) until the BMS/PDU supplier
architecture proves it (BQ-27); Ford signals don't gate real transitions;
**NEVER "PATS bypass"; no factory-cluster injection; no invented
thresholds.** Verbatim scope in
[`GATE_RESEARCH_QUEUE.md`](../roadmaps/GATE_RESEARCH_QUEUE.md); Gate 05C
state machine in `docs/status/GATE05C_STATE_MACHINE.md`. **Gate 08C is
parked**; Gate 07 artifacts + the 15-mode FMEA registry stay open. Order
after 05: Gate 06 deep dive → 09 → 10 → 11.

**Supplier follow-up cadence (owner):** if no response 7 days after a
letter is sent, follow up; repeat weekly until answered or redirected.
Tracked in the outreach files; a 7-day repository reminder is set.

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
