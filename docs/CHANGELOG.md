# CHANGELOG

Documented history of changes to doctrine, structure, schemas, and
milestones. Append-only; newest entries first.

---

## 2026-07-16 — RH batch 31 + review_28: Gate 08 FMEA registry (15 modes)

- Archived batch_31 (full FMEA registry) and review_28 1:1 (commit
  `f626e91`). **`docs/status/FMEA_REGISTRY.md` populated with all 15
  failure modes.** New rows RC-120..126 (no new CS). Section 39. Owner:
  "the best Gate 08 structure so far."
- **No recurrence:** the 200 ms HVIL limit did not return (timing kept
  `NeedsExactTimingSource`); staged testing + LOTO/PPE held.
- Owner's 6 corrections: (1) invented dashboard messages →
  `DriverWarningCandidate / NeedsControlsIntegration` (RC-121); (2)
  isolation Riso 100/500 Ω/V → `RegulatoryReferenceCandidate /
  NeedsSystemContext / NeedsSupplierBMSMapping` (RC-122, context-split);
  (3) HVIL timing stays `NeedsExactTimingSource`; (4) brake assist is
  **hydraulic, not pneumatic** (RC-123); (5) regen-loss "seamless blend"
  → "friction braking remains available without destabilizing brake
  balance" (RC-124); (6) FMVSS 105 = **test-mapping lane**
  (`FMVSS_105_TEST_MAPPING_REQUIRED / BrakeEngineerReviewRequired`,
  RC-125), never "compliance satisfied."
- Gate 08 relabelled (RC-126): `FMEA_REGISTRY_CREATED / TEST_SEQUENCE_
  MAPPED / SUPPLIER_DATA_REQUIRED / NO_LIVE_HV_TESTING_APPROVED /
  NO_TRACK_TESTING_APPROVED / NO_COMPLIANCE_CLAIMS` + a stronger
  BLOCK/WARNING/SIMULATION-ONLY rule set. BQ-21 (Riso threshold) and
  BQ-22 (hydraulic reserve curve) added.
- Research Map + queue updated; **next = Gate 08B (source-backed
  test-procedure mapping)** with the owner's verbatim prompt captured;
  then Gate 05 CAN deep dive.
- Nothing ingested; nothing Confirmed; no compliance claim; no invented
  thresholds; no live-HV/track testing approved; ODRs untouched.

## 2026-07-16 — RH batch 30 + review_27: Gate 08 v0.1 transition (Failure Modes + Test Procedures)

- Archived batch_30 (Gate 08 transition) and review_27 1:1 (commit
  `df2f4c3`). **New deliverable: `docs/status/FMEA_REGISTRY.md`** (FMEA
  framework + staged-testing safety rules). New rows RC-115..119 (no new
  CS). Section 38. Gate 07C parked; Gate 08 = **FMEA_FRAMEWORK_STARTED**.
- **Two safety-critical defects caught:** (1) a **fabricated 200 ms HVIL
  disconnect-latency limit** (`IF HVIL_LOOP_INTERRUPT_TIMING > 200 →
  BLOCK`) with no source → **`NeedsExactSource`** (RC-116, BQ-20) — the
  Constitution's never-invent-values rule; (2) **unsafe live-HV
  fault-test wording** → **staged testing** (Stage 1 bench/HIL LV-mock →
  Stage 2 component test HV-isolated → Stage 3 supervised integrated test
  only after engineering safety plan + LOTO + PPE + emergency shutdown) —
  RC-117.
- Other corrections: weight/CG CHECK 1/2 belong to Gate 07C (Gate 08
  references them as prerequisites) — RC-119; regen/ABS/ESC test staging
  (sim → HIL → dyno → closed-course → loaded after brake-engineer review)
  — RC-118; `GATE_08_OPEN` → `FMEA_FRAMEWORK_STARTED`; Gate 08 must be a
  proper FMEA registry (RC-115).
- Gate 07C park-status extended (VERTICAL_CG_TEST_REQUIRED added). BQ-20
  added. Research Map + queue updated with the owner's **15-mode FMEA
  prompt**; next = the full Gate 08 registry.
- Nothing ingested; nothing Confirmed; no compliance claim; no invented
  thresholds; no live-HV/track testing approved; ODRs untouched.

## 2026-07-16 — RH batch 29 + review_26: Gate 07C v0.4 refinement (parked)

- Archived batch_29 (Gate 07C v0.4 refinement) and review_26 1:1 (commit
  `75523c8`). The Hunter re-delivered the calculator with the **explicit
  equations shown**. Owner parks Gate 07C as **CALCULATOR_FRAMEWORK_READY
  / PHYSICAL_DATA_REQUIRED / NO_ROAD_TEST_CLEARANCE** (RC-114).
- **Two recurrences caught:** the payload re-used
  `Final_Safety_Compliance_Status` / `OPERATIONAL_ALPHA` and the naive
  `IF CG_v > Max_Allowable_Height → BLOCK`, both corrected in review_25 —
  re-corrected (RC-110/RC-112 recurrence markers). The calculator
  `AXLE_CG_CALCULATOR.md` already held the honest labels + IVM logic, so
  nothing regressed in the register. Fourth distinct recurring item for
  the M10 regression-scanner case.
- Genuine refinements: track widths Tf/Tr → **NeedsOfficialFordSource OR
  PhysicalMeasurement** (RC-113, BQ-18), not supplier-only; the regen/ABS/
  ESC dynamic fault-injection item **moved to Gate 08** (BQ-19). Section
  37.
- Calculator bumped to v0.4 (park-status flags; WARNING gained diesel/gas
  branch mismatch; SIMULATION-ONLY gained generic track widths). Confirmed
  next order: **Gate 08 → 05 deep dive → 06 deep dive → 09 → 10 → 11.**
- Nothing ingested; nothing Confirmed; no compliance claim; ODRs
  untouched.

## 2026-07-16 — RH batch 28 + review_25: Gate 07C v0.3 (Axle Moment + CG Calculator)

- Archived batch_28 (Gate 07C axle-moment/CG) and review_25 1:1 (commit
  `12491b7`). Owner label: **Gate 07C — Axle Moment / CG Calculator
  v0.3** — a good calculator architecture, not a verified CG system;
  calculation-ready, not road-test-ready.
- **New deliverable: `docs/status/AXLE_CG_CALCULATOR.md`** (allowed
  equations, data-entry matrix, nominal assumptions, physical-verification
  steps, pass/block logic). New rows CS-62 (YouTube CG-height video →
  LeadOnly), RC-107..112. Section 36.
- **D-006 gas/diesel split resolved in-payload** — the removed-ICE
  profiles now carry both branches; the 001A gas figures (engine ~540 lb,
  exhaust ~65 lb, NominalAssumption) populate `MASS_LEDGER.md`.
- Owner's corrections applied: (1) explicit equations (W/F/R,
  CGh=(R×WB)/W, ΔR/ΔF, transverse CGt — RC-107/108); (2) **vertical CG
  stays BLOCKED** pending an approved CG-height procedure (Transit
  BEMM/BBAS) — RC-109; (3) **IVM CGv Min/Max equations** replace the naive
  single max-height threshold — RC-110; (4) honest labels
  (`Weight_CG_Gate_Status`; `NOMINAL_CALCULATION_PASS /
  PHYSICAL_VERIFICATION_REQUIRED`) — **no compliance claim** — RC-112;
  (5) 500 lb = FMVSS-105 **lightly-loaded allowance**, not fleet payload
  (RC-111, refines RC-105).
- Blocked Questions Ledger gained BQ-16 (bare-chassis CGv + official
  method) and BQ-17 (IVM CGv equations + ESC constants). Research Map +
  queue updated; **next = Gate 08 (Failure Modes + Test Procedures)**.
- Nothing ingested; nothing Confirmed; no compliance claim; no "vehicle
  is safe"; ODRs untouched.

## 2026-07-16 — RH batch 27 + review_24: Gate 07B v0.2 (Removed / Added Mass Ledger)

- Archived batch_27 (Gate 07B mass ledger) and review_24 1:1 (commit
  `766b77d`). Owner label: **Gate 07B — Removed / Added Mass Ledger
  v0.2.**
- **New deliverable: `docs/status/MASS_LEDGER.md`** — living RM-01..06
  (removed) / AM-01..05 (added) tracker, 3-phase scale-ticket procedure
  (baseline → stripped → final), operating-state weight cases, and the
  release gate. New rows RC-103..106 (no new CS — all Ford General BBLB,
  CS-07): four-corner axle defs (RC-103), transverse CG (RC-104), FMVSS
  105 500 lb passenger load (RC-105), the "no road test until…" release
  NoGo (RC-106). Section 35.
- **D-006 gas/diesel split RECURRED** — the ledger was again built on the
  6.7L diesel + DEF/DPF; the donor is 7.3L gas → the removal ledger is
  tagged Platform 001B, and the **001A gas removal ledger is flagged
  OUTSTANDING**. Third corrected-claim recurrence in the project (after
  PATS and ZF-CAN) — another M10 regression-scanner data point.
- Owner's 5 corrections applied: split gas/diesel; **"three-pad" → axle
  scale (front+rear+total) minimum / four-corner (LF/RF/LR/RR)
  preferred**; add left/right + transverse CG + side-to-side warning;
  real milestone dates (pre-teardown/mid-build/final; suppliers 7/14/21d);
  operating-state payload/passenger cases (500 lb FMVSS-105 passenger
  load). Release-gate rule added (RC-106). BQ-15 (battery-pack CG coords)
  added to the Blocked Questions Ledger.
- Research Map + queue updated; **next = Gate 07C (axle-moment calculator
  + CG method)** with the owner's verbatim prompt captured.
- Nothing ingested; nothing Confirmed; no weight marked safe; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 26 + review_23: Gate 07 v0.1 (Weight / Axle Load / CG)

- Archived batch_26 (Gate 07 weight/axle/CG) and review_23 1:1 (commit
  `ab5c16b`). Owner label: **Gate 07 v0.1** — properly structured around
  the right truth source (door label + scale tickets + component mass
  ledger), not closed.
- New rows CS-60 (Work Truck/NTEA axle-moment method →
  ModelingFrameworkCandidate/AxleMomentMethod/NeedsPhysicalMeasurements),
  CS-61 (RC Lacy dealer page → FleetBackground/DoorLabelReminder/
  NotForFinalRule); RC-99 (Super Duty GVWR bands via Scribd BBLB —
  NoGo/NeedsOfficialFordCopy), RC-100 (axle-moment method), RC-101
  (door-label + baseline-scale procedure), RC-102 (Ford BBLB GAWR/GVWR
  definitions — door label governs). Section 34.
- **Platform split (D-006):** the Hunter cited 6.7L diesel + 10R140 data,
  but the donor is **7.3L gas** → Platform 001A (gas, active) vs 001B
  (diesel); no diesel weight/CG in the gas model.
- Owner corrections: Scribd BBLB downgraded (NeedsOfficialFordCopy);
  dealer page → FleetBackground; Work Truck method →
  ModelingFrameworkCandidate; ledger dates made real (Jul 17/24/31 2026);
  **factory engine CG demoted from supplier-only to NominalAssumption-
  allowed** (BQ-13; physical weighing before final layout). Gate 07 split
  into sub-gates **07A** (door label + baseline scale), **07B** (removed/
  added mass ledger), **07C** (axle-moment calculator). Enclosure mounting
  tied back to the Gate 06 frame rules (RC-97/RC-22).
- Blocked Questions Ledger gained BQ-13/BQ-14 (Gate 07 supplier-preferred
  items); Research Map + queue updated; **next = Gate 07B** with the
  owner's verbatim prompt captured.
- Nothing ingested; nothing Confirmed; no weight marked safe; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 25 + review_22: Gate 04B/04C/05/06 first pass (parallel research)

- Archived batch_25 (four-gate test-plan payload) and review_22 1:1
  (commit `654b111`). First "do-not-wait" payload under directive_01.
- **ZF "CAN control" regression resolved in-payload** (Part 2 now reads
  "no active CAN connection is required") — the recurrence caught in
  review_20/21 is closed for ZF.
- New rows CS-55..CS-59, RC-88..RC-98: FMVSS/TSD 105 (CS-55 —
  RegulatoryTestSource/NeedsBrakeEngineerMapping; RC-88 inoperative-assist
  stop, RC-89 fade/recovery), NHTSA nht78-1.13 brake-circuit isolation
  NoGo (CS-56/RC-90), Ford General BBLB electrical-load rule as the real
  Gate 04C anchor (RC-91) + Gate 05 PCM/ignition/stop-lamp rules (RC-94)
  + ESC/traction (RC-96) + frame-drilling rule refining RC-22 (RC-97),
  BenchForce/FS1Inc low-voltage background downgraded to
  TechnicalBackground/LeadOnly/NotForFinalRule (CS-57/58, RC-92/93),
  2026 Super Duty BBLB via Scribd downgraded to CandidateSourcePath/
  NeedsOfficialFordCopy (CS-59, RC-95/98). Section 33.
- **Provenance defect caught:** the "Ford General BBLB" rows were cited
  via an NHTSA ODI investigation PDF, not the BBLB (title/URL mismatch) —
  all anchored to CS-07 and flagged NeedsOfficialFordCopy/NeedsExactQuote.
- Owner's 5 corrections applied: real follow-up dates (7/14/21-day
  cadence, applied to the Blocked Questions Ledger); FMVSS 105 regulatory
  not modeling (no hard-coded 400 ft/150 lb until the exact table row is
  matched); vendor low-voltage sources → LeadOnly; Scribd →
  NeedsOfficialFordCopy; Gate 05 = authorized serviceable integration
  (not "clearing dashboard lights").
- Gate flags: 04=BLOCKED_PENDING_SUPPLIER_RESPONSE; 04B=REGULATORY_TEST_
  SOURCE_FOUND/NEEDS_BRAKE_ENGINEER_MAPPING; 04C=OEM_ELECTRICAL_RULE_
  SOURCE_FOUND/DC_DC_SIZING_OPEN; 05=STARTED/NEEDS_OFFICIAL_FORD_SUPER_
  DUTY_SOURCE; 06=OFFICIAL_FRAME_RULE_CANDIDATES_FOUND/NEEDS_PLATFORM_
  SPECIFIC_CONFIRMATION/NEEDS_STRUCTURAL_ENGINEER_REVIEW. Research Map
  snapshot + queue updated; **next = Gate 07 (weight/axle/CG)** with the
  owner's verbatim prompt captured.
- PATS "bypass" language did not recur. Nothing ingested; nothing
  Confirmed; no compliance claim; no "vehicle is safe"; ODRs untouched.

## 2026-07-16 — Owner directive_01: park-and-proceed; Blocked Questions Ledger + gate research queue

- Owner operating directive ("do not sit and wait on emails"): mark
  Gate 04 BLOCKED_PENDING_SUPPLIER_RESPONSE, park supplier-only values,
  and keep researching supplier-independent work. Archived 1:1 at
  `docs/research/raw/owner_directives/directive_01_park_and_proceed.md`.
- New **Blocked Questions Ledger** (`docs/status/BLOCKED_QUESTIONS_LEDGER.md`,
  owner's 8-field structure) — BQ-01..BQ-12 parking every current
  supplier-only value (ZF hydroboost+steering, ZF current/duty/thermal/
  control, Ford pump curve, steering-gear demand, accumulator reserve,
  panic-brake displacement, manual-steering torque, and the Webasto/Dana
  powertrain items B-003/B-004), each with a follow-up date and an
  allowed alternative-research path.
- New **Gate Research Queue** (`docs/roadmaps/GATE_RESEARCH_QUEUE.md`) —
  the owner's ordered plan **04B → 04C → 05 → 06 → 07 → 08** with the
  verbatim research prompts for 04B, 04C, 05, 06 (07/08 prompts pending).
- New **Gate 04C** (EHPS low-voltage / DC-DC architecture) added to the
  Research Map roadmap; the stale "next expected batch" pointer updated
  from the (already-processed) modeling-frameworks payload to the
  **Gate 04B** validation-test payload.
- Decision **D-005** recorded (park-and-proceed operating rule +
  ledger + ordered queue). Nothing ingested; nothing Confirmed; no
  compliance claim; ODRs untouched.

## 2026-07-16 — RH batch 24 + review_21: Gate 04 v0.4 supplier-inquiry prep + regression catch

- Archived batch_24 (supplier-inquiry prep) and review_21 1:1 (commit
  `5abd8a8`). **No new sources** — the batch re-cited ZF (CS-53) and
  Lee (CS-51) and prepared two supplier packets.
- **Regression caught (owner):** the payload re-asserted two claims
  already corrected in review_20 — "6000 RPM CAN control" (the ZF
  factsheet says "No connection to the CAN bus required"; the ZF Q9
  also again demanded a `.dbc` file) and "Designed for commercial
  vehicle validation" (ZF is a motorsport pump). Both re-corrected;
  RC-83 and RC-84 updated with recurrence markers. This is the **second
  corrected-claim recurrence** in the project (after the PATS "bypass"
  language, batches 20→21) — recorded as the leading use-case for the
  proposed M10 corrected-claim regression scanner.
- Re-affirmed unchanged: Lee = FordStyleHydroboostPumpReference /
  NeedsFordExactSource; power ~2.5–3.3 kW / ~250–300 A stays
  EngineeringEstimate / NeedsZFCurrentMap (do NOT hard-code 250–300 A);
  FMVSS 105 needs a brake-engineer test plan before any compliance claim.
- **Gate-state transitions (owner):** Gate 04 flags set —
  `CANDIDATE_EHPS_FOUND` / `FINAL_SELECTION_HALTED` /
  `BLOCKED_PENDING_SUPPLIER_RESPONSE` (stays v0.4). New sub-gate
  **Gate 04B = FMVSS 105 brake test mapping + loaded low-speed steering
  test procedure** — the next research target ("not more generic
  hydroboost").
- Outreach: ZF packet already drafted (`SUPPLIER_INQUIRY_ZF_01.md`);
  new Ford/Lee/steering-specialist packet drafted
  (`SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`, DRAFT). Both await owner
  approval — sending is an owner action.
- PATS "bypass" language did not recur. Nothing ingested; nothing
  Confirmed; ODRs untouched.

## 2026-07-16 — RH batch 23 + review_20: Brake/Steering Gate v0.4 (complete EHPS candidate)

- Archived batch_23 (complete EHPS candidates) and review_20 1:1
  (commit `0508bce`). Owner label adopted: **Brake/Steering Gate
  v0.4** — architecture strong, a **complete** EHPS candidate now
  exists, but the replacement system is not proven and final selection
  is halted.
- New rows CS-53 (ZF EPHS MPU 100-C — **first complete EHPS
  candidate**; CompleteEHPSCandidate / MotorsportSupplierCandidate /
  NeedsCommercialDutyReview / NeedsHydroboostCompatibilityReview /
  NeedsCurrentMap / NeedsThermalDeratingData), CS-54 (Ford.com power-
  steering return-line hose — FordProductReference / NeedsFordExactSource
  / NeedsExactQuote); RC-82 (ZF hydraulic envelope 1.32–3.17 GPM /
  113–124.5 bar / 2500–6000 rpm), RC-83 (**defect-catch:** the batch's
  "CAN control" claim is refuted by the ZF factsheet's "No connection
  to the CAN bus required" → control/diagnostics = NeedsSupplierData),
  RC-84 (ZF is a **motorsport** pump, not proven commercial-duty),
  RC-85 (~2.5–3.3 kW / ~250–300 A → EngineeringEstimate /
  NeedsZFCurrentMap — do not size DC-DC from it alone), RC-86 (Ford
  hose corroborates ~1750 psi envelope but is not the pump curve),
  RC-87 (FMVSS 105 test map must cover partial-failure/fade-recovery/
  water-recovery/stability/parking-brake/warning-lamp, not just
  stopping distance). Section 31 added.
- Lee CS-51 reaffirmed (FordStyleHydroboostPumpReference /
  NeedsFordExactSource — not the native Super Duty spec).
- **Register cleanup:** removed an orphaned, truncated duplicate of
  section 28 (an earlier draft that had been appended after section 30
  and cut off mid-word); the canonical section 28 at its proper
  position is complete and unchanged. No evidence lost (raw evidence is
  under `docs/research/raw/`).
- ZF supplier packet (owner's 10 questions) drafted as
  `SUPPLIER_INQUIRY_ZF_01.md` (DRAFT, awaiting owner approval). Next
  research (owner): FMVSS 105 brake test mapping + loaded low-speed
  steering test procedure while supplier questions wait.
- PATS "bypass" language did **not** recur (second consecutive clean
  batch). Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-16 — RH batch 22 + review_19: Brake/Steering Gate v0.2 (EHPS pumps)

- Archived batch_22 (Gate 04 EHPS/hydraulic pumps) and review_19 1:1
  (commit `6a57c95`). Owner label adopted: **Brake/Steering Gate
  v0.2** — architecture problem proven, replacement system not yet
  proven. Hydroboost dependency mapped; vacuum path rejected; EHPS
  path confirmed correct; Ford-specific final values still missing;
  EHPS final candidate not selected.
- New rows CS-51 (Lee Power Steering — SupplierBackground /
  Ford-StyleComponentCandidate / NeedsFordExactSource; **not** the
  native Ford Super Duty spec), CS-52 (TRW 14-20358-010 —
  HydraulicPumpCandidate / NeedsElectricMotorDriveData; a pump end,
  not a complete EHPS); RC-79 (Ford-style 1750 psi / 3.25 GPM),
  RC-80 (TRW 2683 psi / 6.30 GPM / 25 cc-rev — "will not bottleneck
  or overheat" downgraded to NeedsEngineeringReview), RC-81 (DC-DC
  load linkage OpenGap / RuleInput — ~2–3.5 kW → ~160–290 A at 12 V,
  loops Gate 04 back to Gate 01 low-voltage architecture). Section 30
  added to the filter register.
- Owner's corrections applied verbatim: Lee and PartsForHotRods
  sources downgraded off "final Ford rule"; TRW kept as a hydraulic
  pump end only; simultaneous brake+steering demand promoted as a
  NoGoConditionCandidate; vacuum-pump rejection as RuleCandidate;
  eight OpenGaps carried (Ford pump curve, steering-gear req,
  accumulator reserve, complete EHPS pressure-flow-current map, EHPS
  duty/derating, DC-DC sizing, FMVSS 105 mapping, loaded low-speed
  steering test).
- PATS-language did **not** recur in batch_22 (held one batch after
  the review_17/review_18 escalation). Nothing ingested; nothing
  Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 21 + review_18: Brake/Steering Gate v0.1; PATS-language recurrence escalated

- Archived batch_21 (Gate 04 brake/steering) and review_18 1:1. Owner
  label adopted: **Brake/Steering Gate v0.1** — hydraulic dependency
  identified, vacuum-pump path rejected, EHPS path opened,
  Ford-specific data still missing. First CP#1 (physical-safety) gate.
- New rows CS-46..50, RC-74..78: combined brake+steering demand NoGo
  (RC-74 — owner's "biggest win"); general hydroboost minimums as
  EngineeringBackground/NeedsFordExactSource (RC-75); loss-of-assist
  and accumulator-reserve NoGo/Test candidates; EHPS LeadOnly path.
- Owner's 7 corrections applied: generic/aftermarket sources
  downgraded (NeedsFordExactSource); **TOP 2-2-607 rejected for Gate
  04 (self-citation error — it is a cooling doc)**; **FMVSS 105 added
  as the primary brake regulation lane** (CS-49); OpenGaps created.
- **PATS-language recurrence escalated:** batch_21 repeated "digital
  bypass frameworks for PATS" one batch after review_17 made it a
  standing rule — re-corrected; recorded as the leading candidate for
  an M10 forbidden-phrase scanner (bypass/override/defeat on
  anti-theft contexts + the Validated reserved-vocab check).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 20 + review_17: Cooling Modeling Framework v0.1

- Archived batch_20 (10-row modeling payload) and review_17 1:1. Owner
  label adopted: **Cooling Modeling Framework v0.1**
  (ModelingFrameworkCandidate; not validated/locked/selection-ready).
  First batch under the review_16 lane doctrine — held cleanly.
- New rows CS-39..45, RC-66..73: Bernardi (RC-66), I²R loss (RC-67),
  ε-NTU radiator (RC-68), Darcy-Weisbach (RC-69), two-state thermal
  (RC-70), tractive balance (RC-71), serial-loop principle (RC-72),
  TOP 2-2-607 test (RC-73) — all modeling/principle candidates, none
  component-selection-ready.
- Owner's 7 filter tasks applied: "validated baselines" prose rejected
  (RESERVED-vocab); **NeedsExactQuote** set on equation rows lacking
  verbatim quotes; Reddit → LeadOnly; towing article → FieldContext /
  NeedsBetterSource; thermal-runaway → anomaly detection (containment
  = OpenGap); **Gate 04 vacuum-pump → hydroboost/EHPS**; **Gate 05
  "PATS bypass" → authorized Ford-compatible integration** (standing
  terminology rule: never frame anti-theft work as "bypass").
- Permitted design-time modeling modules listed (framework specs only,
  no production code; wait for M10 + supplier data).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Owner follow-up (review_16): research-vs-supplier lane doctrine

- Archived review_16 1:1. Standing doctrine applied repo-wide:
  academic/scientific sources build modeling frameworks (statuses
  EngineeringBackground / AcademicPrincipleCandidate /
  ModelingFramework / NeedsSupplierData / NeedsPhysicalVerification;
  never Confirmed / FinalRule / BuildReady) — **they can never close a
  supplier gate**. 13 supplier-only closure items recorded.
- Gate label unified: HV wiring + powertrain + cooling →
  **BLOCKED_PENDING_SUPPLIER_DATA** (B-003/B-004) with the owner's
  allowed/not-allowed work lists.
- Gate roadmap 4–11 recorded in the Research Map; next expected batch
  = the 10-topic modeling-frameworks payload (impact vocabulary
  restricted to Model/Test/OpenGap/NominalAssumption).
- Supplier follow-up cadence (7 days post-send, then weekly) recorded
  in both outreach letters. (A scheduled in-session reminder could not
  be set autonomously — tool requires owner approval; cadence is
  tracked in the handoff instead.)
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 19 + review_15: Cooling Package Gate v0.1; "Validated" rejected

- Archived batch_19 (thermal framework) and review_15 1:1. Owner label
  adopted: **Cooling Package Gate v0.1** (architecture mapped,
  calculations halted, supplier thermal maps required; no
  pump/radiator/chiller picks).
- **Status-inflation escalation caught:** first "Validated / RuleInput"
  labels on unconfirmed supplier metrics — rejected; owner replacement
  labels applied; "Validated" flagged as a RESERVED term for the M10
  controlled-vocabulary check.
- Owner corrections 1–5 applied: 25–35 °C → ThermalTargetAssumption;
  10 l/min×N → hydraulic assumption (manifold-dependent); 65 °C inlet
  → NeedsOfficialDanaSource; **heat load = LOSSES, not output**
  (RC-65 CandidateRule; ~6.4 kW best-case fenced as illustration);
  TONFUL background / ISO 20653 LabProcedureRequired.
- New rows CS-38, RC-62..65 (Dana guide cooling metrics, Webasto
  thermal envelope — all sourceless); pump names lead-only; "CO200"
  designation unverified. Thermal addenda (9+10 owner-authored
  questions) appended to both outreach letters.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Owner follow-up (review_14): gate marked BLOCKED_PENDING_SUPPLIER_RESPONSE; cooling opens

- Archived review_14 1:1. Gate-closure correction applied: the
  question set does not close the powertrain gate — supplier replies +
  datasheets + engineering review do. B-003 carries the owner's gate
  label `BLOCKED_PENDING_SUPPLIER_RESPONSE` with the 16 required
  answer fields (8 Webasto / 8 Dana).
- **Dana/TM4 letter drafted** from the owner's field lists at
  `docs/research/outreach/SUPPLIER_INQUIRY_DANA_01.md` — status DRAFT,
  awaiting owner approval (sending is an owner action; Webasto letter
  remains READY_TO_SEND).
- **Active focus pivots to Cooling Package Gap Closure (Domain
  Priority Block 3)** per owner authorization — L6 checklist extended
  (incl. Cajon/mountain-grade heat load, underbody airflow,
  fan/radiator placement); mapping may proceed, sizing may not (same
  pending powertrain choices).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 18 + review_13: Webasto inquiry READY_TO_SEND

- Archived batch_18 (supplier-inquiry draft) and review_13 1:1;
  created `docs/research/outreach/SUPPLIER_INQUIRY_WEBASTO_01.md` —
  the owner's 9-question supplier-ready letter (READY_TO_SEND; sending
  is an owner action; replies archived 1:1 under
  `docs/research/raw/supplier_replies/`).
- Owner softenings applied — new defect flavor recorded (**commitment
  language**, outward-facing sibling of status inflation): "selected"
  → "candidate under evaluation"; "approve" → "application-approved
  configuration or integration guideline"; VIG "eliminates throttling"
  → "may reduce the bottleneck" ("no HV limitation" fenced); CAN ask
  upgraded to DBC/PGN/SPN/NDA.
- RC-61: VIG/VIG Plus figures (1,215 A cont / 1,400 A peak, 18 packs)
  — owner-corroborated, still sourceless (MissingSourceLink).
- Owner status block recorded (PowertrainCompatibility =
  BLOCKED_PENDING_SUPPLIER_REPLY; 5 OpenGaps). Dana/TM4 letter not yet
  drafted.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 17 + review_12: topology correction; B-004 filed

- Archived batch_17 (Powertrain Compatibility Check) and review_12 1:1.
- **Owner topology correction supersedes the batch's "3 packs
  minimum":** 800 V requires 2sNp series pairing → practical minimum
  4 packs (2s2p, ~160 kWh) = strongest minimum candidate; 1s3p/400 V
  risky (peak ≈663 A exceeds VIB 580 A); 2s1p underpowered. RC-60
  records the full corrected ranking as DerivedRiskAnalysis (lossless,
  unverified inputs, pending supplier approval + review).
- **B-004 INTERFACE_SELECTION_REQUIRED filed** (VIB vs VIG/VIG Plus —
  interface choice changes every current limit); B-003 extended with
  owner blockers 04–08 (topology, interface, minimum-voltage current,
  loss correction, weight/space/axle/cooling).
- RC-59: Pro 40 per-pack (55/112 kW) + VIB (380/580 A) figures —
  2nd consecutive sourceless batch; everything MissingSourceLink;
  RC-56's system figures superseded as apparently mislabeled.
- Supplier outreach package now 24 questions; "800V should be chosen"
  softened per owner; conduct watch item added (topology conclusions
  require series/parallel constraint checks).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 16 + review_11: powertrain candidates; B-003 compatibility blocker filed

- Archived batch_16 (Webasto CV Standard + VIB / Dana TM4 SUMO MD
  candidate profiles) and review_11 1:1.
- **B-003 POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED filed** (owner
  directive): face-value P=V×I check shows ≤60/100 kW available vs the
  130/250 kW Dana target (≈325/625 A needed at 400 V) — RC-58 records
  the arithmetic as a DerivedRiskFlag; component selection everywhere
  stays blocked until configuration is established and reviewed.
- New rows CS-36/37 + RC-56/57 — all values NeedsExactSource: batch_16
  delivered a **sourceless data matrix** (zero URLs/quotes — 5th
  defect variant, wholesale provenance failure); Webasto data
  additionally flagged **LegacyCandidate** (Standard Battery Pro 40
  successor question).
- Owner downgrades applied (VIB currents, coolant figures, Dana DC
  specs, S-Box pre-charge, J1939 claims); 20 supplier questions
  recorded as the first external-outreach work package.
- Next payload: the Powertrain Compatibility Check (owner prompt).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 15 + review_10: HV Wiring Package v0.1; pivot to powertrain definition

- Archived batch_15 (HV Wiring Decision Matrix, 10×7, all rows
  OPEN/Halted) and review_10 1:1. No new sources/claims — matrix
  references only registered rows; accepted as candidate decision
  logic **v0.1** (owner label: architecture mapped, families
  identified, blockers documented, selection halted, review required).
- Corrections binding on the matrix: "hard-coded" → "decision logic is
  mapped"; "selection locked" (3rd recurrence); **"peak phase demand"
  → "DC link continuous and peak current demand"** (battery DC side ≠
  motor phase side — technical correction); Sendyne "hard danger
  boundary" re-fenced (2nd recurrence).
- Recurrence ledger recorded for future M10 mechanical checks;
  Metrel mislabel absent this batch (improvement).
- Phase pivot: L5 HELD at v0.1; active research focus →
  **powertrain definition (L9/L6)** with the owner's full extraction
  field lists (battery 14 / inverter 10 / motor 9 fields).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 14 + review_09 reconciled: connector ask closed; blocked-state benchmark

- Archived batch_14 (blocked-state Balancing Form + Amphenol HVBI) and
  review_09 1:1.
- CS-35/RC-55: Amphenol Excel|Mate HVBI — first official-server
  supplier document; connector ask closed at candidate level with the
  owner's dual-candidate structure (03R8 180 A vs 05R10 250 A; final
  choice blocked by battery + inverter current); HVBI keying satisfies
  the RC-39 mis-mate concern at supplier level.
- RC-52 updated: OD 15.8 mm + computed part-scoped bend envelopes
  (≥47.4 mm static / ≥94.8 mm dynamic — owner-verified arithmetic).
  Precedent recorded: derived values admissible only when both inputs
  are datasheet-sourced and the arithmetic is owner/engineer-checked.
- Conduct benchmark recorded: the Balancing Form's honest BLOCKED
  state ("an empty form honestly blocked beats a filled form
  dishonestly complete").
- Regressions re-corrected: Metrel/TONFUL RegulatoryCandidate labels
  (2nd occurrence — added to recurring-error watchlist) and "Candidate
  selection locked" language.
- Research Map: L5 next step = owner's HV Wiring Decision Matrix
  prompt; framing question recorded (which pack/inverter?).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 13 + review_08 reconciled: pre-charge math + 50 mm² cable

- Archived batch_13 and review_08 1:1. Delivered 5 of the owner's
  6-item ask; HV connectors remain the only untouched item.
- New rows: CS-30/RC-50 Miba pre-charge formulas (CandidateRule —
  resistor selection stays OpenGap); CS-31/RC-51 TE Mini K pre-charge
  relay (**voltage-suitability OpenGap: 400 VDC contact / 450 VDC max
  switching vs unknown pack voltage**); CS-32/RC-52 Coroflex 50 mm²
  datasheet (closes the 50 mm² gap at candidate level; supplier's own
  suitability-testing disclaimer recorded); CS-33/RC-53 TONFUL IP
  explainer (TechnicalBackground; ISO 20653 stays the gate);
  CS-34/RC-54 Metrel MI3132 (**InstrumentationCandidate /
  TestMethodCandidate** per owner — 4-wire Kelvin ≥1 A method).
- All 7 owner corrections applied, incl. status-language reversion
  ("Marked Closed" → partially sourced; "selection locked" → selected
  for evaluation) and rejection of Sendyne "absolute" phrasing.
- Conduct: status-inflation language identified as the dominant
  residual defect (4th packaging-drift variant); none entered the
  register. Research Map L5 → CANDIDATE ARCHITECTURE STAGE.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 12 + review_07 reconciled: main-fuse lane + GTR 20

- Archived batch_12 (HV wiring datasheets) and review_07 1:1.
- New rows: CS-26/RC-46 Eaton EV fuse catalogue (real main-fuse family
  lane — no size selected until upstream data exists); RC-47 EV200
  make/break duty → **pre-charge NO-GO candidate** (650 A max make,
  80–90% completion before close; owner correction: curves set the
  completion target, they do NOT size the resistor — sizing stays
  OpenGap); CS-27/RC-48 Coroflex 35 mm² datasheet (part-scoped
  rules/metrics); CS-28/RC-49 UNECE GTR 20 (first official-server
  standard PDF; ≤0.1 Ω bonding Test+Metric candidates, p.60);
  CS-29 ISO 20653 path opened.
- Held: unsourced matrix cells (50 mm² bend radius — cross-gauge
  transfer forbidden; Amphenol connector — no datasheet; pre-charge
  relay — conflated cell). Same defect family as batch 11.
- New standing reconciliation flag: GTR 20 ≤0.1 Ω bonding vs FMVSS
  <0.2 Ω exposed-part figures are context-distinct — never merged.
- Research Map L5 updated to the owner's narrow 6-item remaining ask.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 11 + review_06 reconciled: first component candidates

- Archived batch_11 (component-level HV wiring) and review_06 1:1.
- New SupplierCandidates: Coroflex 9-2611/6.0 mm² cable (CS-23/RC-43 —
  first datasheet-sourced bend radius, **part-number-scoped**: 3× OD
  static / 6× OD dynamic for this cable only), Kilovac EV200 contactor
  (CS-24/RC-44, held behind 9-item needs list), Eaton EV **auxiliary**
  fuse (CS-25/RC-45 — batch's "Traction" title corrected; main
  traction fuse remains OpenGap). Sendyne gains
  NeedsCANProtocolDocument.
- Owner's authoritative 13-row HV wiring status table recorded
  (section 18); L5 status → PARTIALLY CLOSED with 8-item hole list;
  owner directive: do not move to cooling until closed.
- Conduct: review_05 corrections took hold in one batch; residual
  defect = row-title inflation / matrix-cell overreach (caught).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 10 + review_05 reconciled: universal isolation threshold rejected

- Archived batch_10 (HV wiring gap analysis) and review_05 1:1.
- **Safety-relevant catch:** batch_10's "hard fault below 500 Ω/V"
  action rejected as a universal rule per owner correction. Register
  now carries split RegulatoryCandidates (RC-42): ≥500 Ω/V AC,
  ≥100 Ω/V DC, 500 Ω/V charge inlet, <0.2 Ω exposed-part bonding
  (context-scoped test candidate) — all locator-pending (B-002),
  final values gated on exact FMVSS 305a/eCFR extraction + ISO test
  mapping + engineering review.
- Downgraded: Feichun 6–8× OD bend radius → TechnicalBackground /
  preliminary routing screen only (CS-21/RC-40); EV Builder's Guide
  500 Ω/V → TechnicalBackground, superseded (CS-22/RC-41).
- Gap items promoted with owner statuses (NeedsSupplierData /
  PhysicalVerificationRequired / OpenGap / NeedsExactSource).
- Conduct note recorded: Hunter failure mode has shifted from fake
  sources to enforcement overreach in "next action" columns — watch
  that column. Numbering shift "10:175" noted.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 09 (HV wiring gap closure) + review_04 reconciled

- Archived batch_09 (first single-gap payload) and review_04 (owner
  gap-package checklists + gap-closure prompt template + verdict) 1:1.
- Owner instructions applied: Sendyne SIM100MLP promoted
  (SupplierCandidate/MetricCandidate — CS-20/RC-38, with the **100 Ω/V
  figure fenced**: datasheet safety discussion, not a system threshold
  until cross-checked vs FMVSS 305a / ISO 6469-3 / selected
  components); ALL Lectromec-derived rows (RC-27/28/39) downgraded to
  TechnicalBackground/NeedsExactSource; fifth Chilye rule candidate
  added (service accessibility); standing rejections extended.
- Candidate Build Engine items table added (3 RuleCandidates, 1
  MetricCandidate, 1 TestCandidate, 4 OpenGaps) — all pre-rule.
- Research Map updated: gap-closure mode with owner's execution order;
  L5 HV wiring EMPTY → PARTIALLY MAPPED with the 15-item still-missing
  list; detailed checklists recorded for all six gap packages.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 08 + owner review_03 archived and reconciled

- Archived batch_08 (first focused payload, gaps 1–6) and review_03
  1:1. Priorities 1/3/4 advanced; 2/5/6 honestly reported empty.
- Owner instructions applied verbatim: promoted Chilye MSD
  (SupplierCandidate + NeedsEngineeringReview), Brogen EHPS
  (SupplierCandidate / CP#1 candidate, EngineeringReviewRequired +
  PhysicalVerificationRequired), Ford Q-251R2 (CandidateSource for UIM
  behavior ONLY), ISO 6469-3 (CandidateSourcePath / NeedsExactSource);
  downgraded SAE J1742-via-Scribd (NeedsOfficialSource) and EV West
  EPS (BackgroundSupplier / WrongPlatformRisk).
- UIM inference split: "PCM delete requires mimicking 28 messages"
  recorded as unsupported inference (EngineeringReviewRequired /
  MISSING_SOURCE) — no claim row created; UIM-behavior quote promoted
  as RC-36.
- New rows CS-14..CS-19, RC-32..RC-37; MSD candidate rules recorded
  component-family-scoped; supplier numbers fenced as non-design
  values; CP#1 10-item missing list recorded on CS-17.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 07 + owner review_02 archived and reconciled

- Archived batch_07 ("Comprehensive Research Discovery Map") and the
  owner verdict (review_02) 1:1 (same-message delivery noted).
- Owner directives applied: batch-07 FMVSS row marked
  `NeedsURLCorrection` (2025-02584 is the wrong FR document — verified
  citations CS-02/CS-03 stand); Lectromec stays TechnicalBackground/
  NeedsExactSource; xr793 mirror lead-only; EngineCert background-only/
  NeedsSupplierData.
- New sources CS-10 (Q-356R2 — first Super-Duty-specific OEM document
  path), CS-11 (HVIP Solicitation 2026-03), CS-12/CS-13 (third-party
  mirror / background explainer — held as leads). New claims RC-30 (Q-356R2 MIL/box-
  removal — CP#2-relevant), RC-31 (Appendix C reference — **B-vs-C
  discrepancy flag** vs RC-25).
- Regression flagged: NPRM "Proposed…" quote under a Final Rule title
  (third proposal/final mix). Third bend-radius variant fenced.
- Owner's six focused research priorities added to the Research Map.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 06 archived and reconciled (first lane-bucketed batch)

- Archived batch_06 ("Deep-Dive Source Payload") 1:1.
- Register: RC-01 completed with full CARB applicability quote (MY2021+,
  "may be certified" nuance flagged); RC-04 summary language attributed
  to 90 FR 9609 (confirms §9 splice finding); added CS-08 (Lectromec
  J1673 review — secondary, LeadOnly-class) and CS-09 (Transit BEMM via
  **unofficial mirror** — provenance concern, official copy required);
  added RC-27..RC-29 (cable-sizing factors, splice avoidance,
  cross-member rule with cross-match flag).
- Held: FR doc URL 2025-02584 (conflicts with verified 2025-02582);
  second CARB PDF URL (governing-version question opened); derived
  Sept-1-2029 compliance date (arithmetic + unestablished alterer
  classification); cert-family-split inference; zero-splice rule
  proposal; 6×–8× bend multiplier (contradicts batch_05's fenced
  4×/6× — both fenced).
- All rows lane-bucketed per the Research Map (first batch under the
  lane system). Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Research Map established (10 required lanes)

- Added `docs/research/RESEARCH_MAP.md` per owner instruction: L1
  OEM/Ford, L2 regulatory/certification/incentive, L3 core EV
  conversion engineering, L4 mechanical/structural/bracket/frame/
  fatigue, L5 electrical/HV wiring, L6 battery/BMS/thermal, L7
  controls/CAN/diagnostics, L8 quantitative modeling/simulation, L9
  supplier data, L10 physical truck measurements — all required, none
  optional. Quantum-inspired optimization fenced as FUTURE ONLY
  outside the numbered lanes.
- Standing rules encoded: quantum cannot approve engineering; sim
  cannot replace physical proof; academic → PrincipleCandidate unless
  tied to Rule/Metric/Test/NoGo; supplier datasheets →
  NeedsVerification; OEM/regulatory outrank academic; full claim field
  requirements.
- Current coverage mapped per lane (most lanes empty). Mapping gaps
  escalated to owner: L2 regulatory module (standing), L4 mechanical
  module (new gap), L6 battery/thermal module (new gap), L9 lane-name
  truncation ("Supplier b") to confirm.

## 2026-07-15 — System Audit 01 recorded

- Added `docs/audits/AUDIT_01_2026-07-15_SYSTEM_STATUS.md`: full
  status check against what verifiably exists. Headlines: repo safety
  PASS; build/database/StageGate/M8/FinalVerification NOT PRESENT (no
  software exists — expected in ingestion phase); research ingestion
  PASS at document level (7 CS / 26 RC rows, 0 Confirmed, 4 guardrail
  catch types with evidence); forbidden-language scan: docs PASS,
  **index.html FAIL** (certified/warranty/turnaround/pricing claims
  unsupported by any evidence); scope mismatch flagged — audit brief
  references an `elektron-os-clean` repo that does not exist here
  (owner decision required); verification debt (B-002) and
  self-verifying-agent risk recorded.
- No files outside `docs/audits/` modified; nothing marked Confirmed;
  ODRs untouched.

## 2026-07-15 — Handoff protocol amended (D-004)

- Added operational fallback triggers (batch completed / meaningful
  commit / two hours / unresolved contradiction / dirty tree before
  agent switch) so continuity does not depend on predicting usage
  limits.
- Added branch single-writer rule with `Agent owner` field in the
  handoff (template + live handoff updated; receiving-agent checklist
  now verifies ownership first). Mirrored in AGENTS.md, the Cursor
  rule, and AI_INSTRUCTIONS.md.
- Handoff validity hashes deferred to M10 start (recorded in AGENTS.md
  and the M10 roadmap; not implemented now, per owner instruction).

## 2026-07-15 — Owner review of batch 05 archived and applied (verdict: filter yes, ingestion no)

- Archived `docs/research/raw/owner_reviews/review_01_batch_05_verdict.md`
  1:1 (citation markers stripped in transit noted in provenance).
- Applied owner instructions: per-claim statuses explicit;
  `NeedsVehicleSpecificBBLB` vocabulary adopted; CS-07 scope corrected
  to general Ford guidance (not Super Duty); FMVSS rows fenced to
  "requirements must be mapped" (never "we comply"); HVIP rows fenced
  to "path requires EO/eligibility review" (never voucher promises).
- New owner-relayed candidate claims RC-22..RC-26 (frame-rail web
  drilling limits, flange welding prohibition, HVIP ZEV Conversions
  section, Appendix B exemption-EO requirement, fleet-class
  restriction) — all locator-pending, unusable until located.
- Frame-rail downgrade upgraded `NeedsExactSource` →
  `NeedsVerification` + `NeedsVehicleSpecificBBLB` (content candidates
  on file; exact quote/page still required).
- Section 12 adds the owner-requested outputs: Rule/Metric/Test/NoGo
  candidate preview, holds, needs-vehicle-specific list, engineering
  review list. "Artifact Intake Form" noted as future step, not built.
- Still: nothing ingested, nothing Confirmed, no SQLite, no StageGate
  changes, ODRs untouched.

## 2026-07-15 — RH batch 05 archived and reconciled into filter register

- Archived batch_05 ("un-paraphrased data payload") 1:1.
- Register updates: RC-02 extended with EO-per-family clause; RC-07
  gains part 561 quote + Executive Summary locator; RC-08 upgraded to
  the full per-class DATES sentence — 2027/2028 structure resolved at
  candidate level (2027 ≤ 4,536 kg; 2028 > 4,536 kg), with the "For
  all other requirements" prefix flagged as an open nuance.
- New candidate claims RC-17..RC-21: BBLB cross-member prohibition,
  fastener grades, welding precautions (truncation flag), CARB §2.2.1
  ESS fragment (truncation flag), first HVIP Manual-internal quote
  (fleet-level access, not conversion eligibility).
- Section 11: frame-rail downgrade explicitly NOT upgraded (quote
  covers cross members only); J1673 "4×/6×" example multipliers fenced
  as non-values; hydroboost gains PhysicalVerificationRequired; PATS
  upgrade path named (real-vehicle CAN capture).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Delivery "4:75" verified as exact duplicate of batch 03

- Diff-verified byte-identical to `batch_03_finalized_output.md`; not
  duplicated on disk — receipt recorded in the raw archive's
  PROVENANCE.md, duplicate notice added to the filter file (section 10).
- No register changes; flagged to owner as possible mis-send.

## 2026-07-15 — RH batch 03 archived and reconciled into filter register

- Archived batch_03 ("Finalized Research Hunter Output" — the run the
  owner graded PASS) 1:1 under `docs/research/raw/research_hunter/`.
- Filter register updates: candidate citation **89 FR 104318** attached
  to CS-02 (missing-source 3 candidate-resolved); RC-08/RC-09 now carry
  Hunter-supplied DATES-section quotes and locators (verification flags
  remain — B-002); RC-10 locator set to 90 FR 9609 DATES; RC-09 scope
  widened to include small-volume manufacturers per the quoted text.
- Section 9 reconciliation: rejected sentence did not recur; NPRM
  framing and date conflation superseded; flags recorded for the
  spliced Claim-1 paraphrase, the BBAS title/URL mismatch, the dropped
  (but retained) Appendix B locator, the deferred Part 561 template
  next-action, and the non-authoritative "un-hallucinated"
  self-assessment.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 02 archived and reconciled into filter register

- Archived batch_02 ("Strict Technical Source Map") 1:1 under
  `docs/research/raw/research_hunter/`; PROVENANCE updated.
- Filter register updates: added CS-06 (FMVSS 305a NPRM —
  supplementary, proposal-stage only) and CS-07 (Ford General BBLB);
  attached Hunter-supplied quotes as **candidate locators** to
  RC-02/RC-03 (CARB cert-family, monitoring/diagnostics), RC-09
  (NPRM corroboration), RC-11 (FAQ verbatim); added RC-13..RC-16.
- Section 8 reconciliation: re-rejected the recurring broad incentive
  sentence; rejected the "Sept 1, 2027 effective date" conflation
  (effective date was 2025-03-20 per delay notice; 2027-09-01 is
  mandatory-applicability language — RC-08 flag stays open); rejected
  the ELK-BuildEngine-Doctrine-StageGate.pdf upload suggestion as a
  research action (internal doctrine enters only via owner ingestion).
- Missing-source list: added hydroboost bracket metrology
  (measurement-only) and ISO 6469-3 alternate; sharpened the UIM item.
- All Hunter quotes remain unverified against source PDFs (B-002);
  nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Raw RH-01 Research Hunter output archived 1:1

- Archived the raw RH-01 "Research Map & Candidate Ingestion" document
  unchanged at `docs/research/raw/research_hunter/batch_01_research_map.md`,
  with `PROVENANCE.md`; resolves missing-source item 1 of the RH-01
  filter file.
- Added delta-review addendum to `RH01_SECOND_STAGE_FILTER.md`:
  rejected the *Internal NDA* supplier-datasheet row (unverifiable
  values — potential invented engineering values), the Hunter's
  self-asserted "filter evaluation" and direct-ingestion routing, and
  the raw document's incorrect FMVSS 305a subtitle; retained "Appendix
  B" as a candidate locator for the HVIP claim; listed unfiltered
  candidate topics (HVIL, UL 2580, fasteners, IVM/SVE, BAR/DMV, ACF,
  hydroboost CP#1, metrology, QUBO-future-only).
- Still nothing ingested into rev07; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH-01 second-stage research filter output recorded

- Added `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`:
  5 CandidateSource rows (CARB ZEP procedure; FMVSS 305a final rule;
  FMVSS 305a delay notice, 90 FR 9609–9610; HVIP FAQ/Manual as
  RegulatoryCandidate; Ford BBAS as CandidateSourcePath), 12 candidate
  claim rows (none Confirmed), 4 claims kept downgraded, 2 rejections,
  missing-source list, next-action list.
- **Nothing ingested into rev07; no database writes; ODRs untouched;
  SourceClaims.md untouched.**
- Filed B-002: verbatim .gov/CARB source extraction blocked by the
  current environment's network policy.

## 2026-07-15 — Cross-agent handoff protocol installed (D-003)

- Added `AGENTS.md` (cross-agent rules) and
  `.cursor/rules/elektron-build-engine.mdc` (Cursor mirror) — Claude
  Code and Cursor use the same handoff format.
- Added `docs/handoffs/`: `CURRENT_HANDOFF.md` (initialized with real
  repository state), append-only `HANDOFF_LOG.md`, and
  `templates/HANDOFF_TEMPLATE.md`.
- Added `docs/status/`: `CURRENT_PHASE.md` (phase source of truth),
  `IMPLEMENTATION_LEDGER.md` (claimed vs verified; L-001),
  `BLOCKERS.md` (B-001).
- Wired the protocol into `CLAUDE.md`, `docs/AI_INSTRUCTIONS.md`, and
  the README layout map.
- No specification content ingested; no production code; ODRs remain
  Open.

## 2026-07-15 — Revision 07 modularized; ingestion phase opened (D-002)

- Split Revision 07 into modules `docs/specifications/rev07/00..12`
  (all shells, status `AWAITING SOURCE INGESTION`); `Revision_07.md`
  is now the ACTIVE_SPECIFICATION index over them.
- Added `roadmaps/REV07_SOURCE_INGESTION.md` — current phase: per-batch
  archive → consolidate → extract procedure, consolidation quality bar,
  and the ODR-001..ODR-003 resolution gate (requires explicit owner
  approval).
- Added `docs/research/raw/` archive with immutability rules.
- Updated README baseline (Current Phase → Revision 07 Source Ingestion
  and Consolidation), AI_INSTRUCTIONS and CLAUDE.md roadmap pointers,
  and M10 entry conditions.
- ODR-001..ODR-003 remain **Open**; register now carries the resolution
  gate.

## 2026-07-15 — Documentation structure established

- Restructured repository documentation: README reduced to an entry
  point; doctrine moved under `/docs`.
- Added Engineering Constitution (Articles I–VIII).
- Added AI Instructions (permanent operating manual for AI tooling).
- Added Decision Register (D-001) and this Changelog.
- Added `specifications/Revision_07.md` as `ACTIVE_SPECIFICATION`
  (governance shell; doctrine content to be imported — see
  OpenDataRequirements ODR-001..ODR-003).
- Added roadmaps: `M10_IMPLEMENTATION.md` (current),
  `M11_OPEN_DATA_REGISTER.md` (deferred).
- Added research registers: `OpenResearchRegister.md`,
  `SourceClaims.md`.
