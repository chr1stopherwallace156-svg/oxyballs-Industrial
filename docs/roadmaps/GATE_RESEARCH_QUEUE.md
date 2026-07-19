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

## Gate 05 — CAN / Controls / Cluster Integration  · STATUS: STARTED — DEEP DIVE (batch_33)

Deep dive **started** (batch_33) — deliverable `docs/status/GATE05_CONTROLS.md`
(authorized-controls doctrine + candidate listen-only topology). Runs in
parallel with the Gate 08C sweep engine and parked Gate 08B. **Authorized
Ford-compatible, listen-only only — NEVER "PATS bypass"; no spoofing/
transmitting onto factory Ford safety buses; forum posts LeadOnly; Ford/
OEM/supplier DBC docs preferred.** Prompt below (unchanged); continue the
deep dive against authorized sources.

## Gate 08C — Draft Validation  · STATUS: SIMULATION_SWEEP_MATRIX_CREATED — PARKED_FOR_SUPPLIER_DATA (batch_33/34/35)

Draft-validation sweep engine `docs/status/DRAFT_VALIDATION_08C.md` — 15
placeholder sweep inputs with **no gate authority** (RC-133); reports the
**Simulation Response Category** (Within Draft Stress Envelope / Needs
Review / Model Stress Failure / Supplier Data Required, each "No Gate
Authority" — RC-138/143), never PASS/BLOCK. **Parked "done enough to keep
moving"** — reopens toward FINAL_VALIDATED as supplier thresholds land
(upgrades sweep inputs → SupplierConfirmed / PhysicallyVerified).

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

## Gate 05A — Source-Backed Signal Registry  · STATUS: SIGNAL_REGISTRY_STARTED — UNVERIFIED_STAGE (batch_35)

Deliverable `docs/status/GATE05A_SIGNAL_REGISTRY.md` (6 signals). Status
(review_32): `SIGNAL_REGISTRY_STARTED / LISTEN_ONLY_RESEARCH /
UNVERIFIED_STAGE / NO_ACTIVE_TRANSMISSIONS / NO_FACTORY_SAFETY_BUS_CONTROL`.
Ford factory signals = AuthorizedSourcePending / ListenOnlyCandidate /
NoTransmitAuthority (RC-144); EV-side DBCs owned; accel-pedal/brake-switch
use restricted (RC-146). All Ford PGN/byte/rate mappings stay
`J1939SignalCandidate / NeedsOfficialFordUIMSource` until an official
source + a vehicle capture prove them.

**Owner prompt (verbatim):**

> Gate 05A — Source-Backed Signal Registry
>
> For every signal:
> - signal name
> - source document
> - bus/channel
> - protocol
> - PGN or ID
> - byte/bit mapping
> - direction: listen-only / receive / transmit
> - allowed use
> - blocked use
> - verification status
> - required proof artifact

## Gate 05B — Controls Dependency Map  · STATUS: CONTROL_DEPENDENCY_MAP_STARTED (batch_36)

Deliverable `docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md`. Status
(review_33): `CONTROL_DEPENDENCY_MAP_STARTED / SIMULATION_ONLY /
FORD_SIDE_RECEIVE_ONLY / EV_SIDE_ISOLATED_CONTROL_ONLY /
PRECHARGE_AUTHORITY_UNCONFIRMED / DRIVER_WARNING_OUTPUT_UNCONFIRMED /
NO_PHYSICAL_TORQUE_CONTROL / NO_FACTORY_CLUSTER_INJECTION`. VCU decisions
are SimulationOnly (pre-charge/contactor/HV-shutdown authority may belong
to the BMS/PDU — BQ-27, RC-150/152); driver warnings EV-side only, factory
cluster BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE (RC-151).

## Gate 05C — Controls State Machine  · STATUS: STATE_MACHINE_DRAFTED (batch_37)

Deliverable `docs/status/GATE05C_STATE_MACHINE.md` (11 states). Status
(review_34): `STATE_MACHINE_DRAFTED / SIMULATION_ONLY /
AUTHORITY_OWNERSHIP_UNRESOLVED / FORD_SIDE_SIGNALS_LISTEN_ONLY /
EV_SIDE_OUTPUTS_ISOLATED / PRECHARGE_OWNER_PENDING /
HV_SHUTDOWN_OWNER_PENDING / NO_PHYSICAL_TORQUE_CONTROL /
NO_FACTORY_CLUSTER_INJECTION`. Every state carries an ownership label
(RC-158); Ford signals don't gate real transitions (RC-155); pre-charge
threshold ParameterPending (RC-156); E-shutdown/service-mode safety-worded
(RC-157).

## Gate 05D — State Transition + Ownership Matrix  · STATUS: CREATED / SIMULATION_ONLY / OWNERSHIP PENDING (batch_38)

Deliverable `docs/status/GATE05D_OWNERSHIP_MATRIX.md` (11-state ownership
matrix + Final Responsibility Matrix). Status (review_35):
`STATE_OWNERSHIP_MATRIX_CREATED / VCU_ROLE_LIMITS_DEFINED /
FORD_SIDE_CONTROL_BLOCKED / EV_SIDE_CONTROL_ISOLATED /
CONTACTOR_OWNER_PENDING / PRECHARGE_OWNER_PENDING /
HV_SHUTDOWN_OWNER_PENDING / TORQUE_AUTHORITY_PENDING /
SERVICE_MODE_PHYSICAL_SAFETY_PENDING / SIMULATION_ONLY`. Owner: "major
upgrade — VCU god-controller risk reduced." Corrections: READY_TO_DRIVE
must not command torque (RC-160); OFF monitor-only-if-supervisor-awake
(RC-161); ACCESSORY thermal-pump limits (RC-162); SERVICE_MODE
LOTO/absence-of-voltage (RC-163); EMERGENCY_SHUTDOWN "request HV
de-energization." The coordination principle + Build Engine Authority Law
promoted to permanent doctrine (Decision Register **D-007**).

## Gate 05E — Interface Control Document / Signal Authority Table  · STATUS: ICD_SIGNAL_BOUNDARIES_MAPPED / SIMULATION_ONLY (batch_39)

Deliverable `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` (10-row signal-
authority table after the owner's splits + the ICD gate rule). Status
(review_36): `ICD_SIGNAL_BOUNDARIES_MAPPED / SIMULATION_ONLY /
FORD_SIDE_LISTEN_ONLY / EV_SIDE_ISOLATED_CONTROL_PENDING /
PRECHARGE_SIGNALS_NEED_SPLIT / SHUTDOWN_SIGNALS_NEED_SPLIT /
NO_FACTORY_BUS_TRANSMISSION / NO_PHYSICAL_HARDWARE_DRIVE`. Owner: "strong
Gate 05E draft." Corrections applied in the deliverable: split pre-charge
into request/status/relay-coil-control (RC-164); split emergency shutdown
into torque-zero/shutdown-request/hardwired-E-stop/contactor-open-status
(RC-165); Ford sources stay generic "Ford factory module / UIM path —
pending verification" (RC-166); listen-only proof requirement (RC-167);
signal-decomposition doctrine — a signal cannot be both a request and a
hardware actuation unless the source says so (RC-168). The ICD gate rule:
`authority == UNVERIFIED_STAGE OR owner == PENDING → hardware drive +
factory transmit BLOCKED, evaluation SIMULATION_ONLY`.

## Gate 05F — Network Boundary / Gateway Safety Rules  · STATUS: NETWORK_BOUNDARY_RULES_CREATED / SIMULATION_ONLY (batch_40)

Deliverable `docs/status/GATE05F_NETWORK_BOUNDARY.md` (3-bus isolation
architecture, routing rules, failure protocols A/B/C, listen-only proof
dossier, gateway gate rule). Status (review_37):
`NETWORK_BOUNDARY_RULES_CREATED / CAN_1_LISTEN_ONLY_REQUIREMENT_DEFINED /
EV_SIDE_BUSES_ISOLATED / PRECHARGE_SIGNAL_DECOMPOSED /
SHUTDOWN_SIGNAL_DECOMPOSED / TIMEOUT_VALUES_PENDING_SUPPLIER_DATA /
NO_FACTORY_BUS_TRANSMISSION / NO_PHYSICAL_GATEWAY_DEPLOYMENT /
SIMULATION_ONLY`. Owner: "excellent structurally … very good." **Main
correction (recurrence): the 50 ms / 100 ms timeouts were acting like
sourced safety boundaries** → downgraded to SupplierDataPending sweep-only
"No Gate Authority" (RC-169); general rule RC-173 forbids any
timeout/heartbeat/alive-counter/torque-zero/shutdown/contactor-open timing
from becoming physical gate logic until supplier docs or HIL/bench proof.
Other corrections: authority-chain language (RC-170); signal-owner ≠
action-owner for the VCU request signals (RC-171); CAN_1
"selected/wired/configured for listen-only" not "modified" (RC-172). The
gateway gate rule: `listen_only_proof == MISSING OR isolation == UNVERIFIED
→ deployment + physical-injection BLOCKED, evaluation SIMULATION_ONLY`.

## Gate 05G — Fault Containment and Gateway Failsafe Matrix  · STATUS: NEXT (owner review_37)

Gate 05F says what may cross the network boundary; Gate 05G says what
happens when something fails.

**Owner scope (review_37) — the failsafe matrix must cover:**

> - VCU crash
> - CAN_1 accidentally attempts transmit
> - CAN_2 inverter loop silent
> - CAN_3 BMS loop silent
> - gateway power loss
> - gateway stuck dominant
> - gateway stuck recessive
> - bad checksum / alive counter
> - message replay
> - wrong source address
> - BMS says no-discharge
> - inverter ignores torque-zero
> - E-stop asserted

Keep the discipline — every failsafe response stays SIMULATION_ONLY; no
timeout/threshold has physical authority until supplier docs or HIL/bench
proof confirm it (RC-173); CAN_1 stays listen-only; EV-side outputs stay
isolated; the VCU coordinates but owns nothing safety-critical (BQ-27);
D-007 + RC-168 decomposition bind throughout.

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

## Gate 07C — Axle Moment Calculator + CG Method  · STATUS: v0.4 PARKED (batch_28/29)

Parked (owner review_26): **CALCULATOR_FRAMEWORK_READY /
PHYSICAL_DATA_REQUIRED / NO_ROAD_TEST_CLEARANCE.** batch_29 re-delivered
the calculator with explicit equations and two recurrences (compliance
labels + naive CGv) that were re-corrected; refinements: track widths =
NeedsOfficialFordSource OR PhysicalMeasurement (BQ-18); regen/ABS/ESC
fault item moved to Gate 08 (BQ-19). **Confirmed post-08 order: Gate 08 →
05 deep dive → 06 deep dive → 09 (3D scan) → 10 (supplier second-source)
→ 11 (fleet readiness).**

Deliverable is the living **`docs/status/AXLE_CG_CALCULATOR.md`** (allowed
equations, data-entry matrix, nominal assumptions, pass/block logic).
Owner corrections applied: explicit equations (RC-107/108); vertical CG
BLOCKED pending an approved CG-height procedure (RC-109); IVM CGv Min/Max
instead of a single threshold (RC-110); honest status labels — no
compliance claim (RC-112); 500 lb = FMVSS-105 lightly-loaded allowance,
not fleet payload (RC-111). Gas/diesel split now honored in-payload (001A
gas removal figures populated in `MASS_LEDGER.md`).

**Original Gate 07C prompt (verbatim, batch_28):**

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

## Gate 08 — Failure Modes + Test Procedures  · STATUS: FMEA_REGISTRY_CREATED (batch_30/31)

batch_30 transitioned into Gate 08 (framework); batch_31 populated the
full **15-mode FMEA registry** (`docs/status/FMEA_REGISTRY.md`). Status
(review_28): **FMEA_REGISTRY_CREATED / TEST_SEQUENCE_MAPPED /
SUPPLIER_DATA_REQUIRED / NO_LIVE_HV_TESTING_APPROVED /
NO_TRACK_TESTING_APPROVED / NO_COMPLIANCE_CLAIMS.** Owner corrections
applied: driver-warning messages → candidates; Riso 100/500 Ω/V →
RegulatoryReferenceCandidate; brake assist = hydraulic not pneumatic;
regen-loss wording softened; FMVSS 105 = test-mapping lane. Final
validation not started. Next = Gate 08B.

**Owner prompt for the full FMEA registry (verbatim, review_27):**

> We are starting Gate 08: Failure Modes + Test Procedures.
>
> Do not run or recommend live high-voltage tests.
> Do not mark anything Confirmed.
> Do not claim compliance.
> Do not invent timing thresholds.
>
> Create a failure-mode registry for the EV conversion covering:
> 1. HVIL open / service disconnect fault
> 2. isolation resistance fault
> 3. contactor weld
> 4. pre-charge failure
> 5. battery overcurrent
> 6. inverter shutdown during regen
> 7. ABS / ESC interaction with regen loss
> 8. EHPS pump failure
> 9. brake assist pressure loss
> 10. steering assist pressure loss
> 11. low-voltage DC-DC brownout
> 12. coolant pump failure
> 13. battery/inverter/motor overtemperature
> 14. CAN communication loss
> 15. water intrusion / IP seal failure
>
> For each failure mode, output:
> - subsystem
> - trigger
> - hazard
> - detection method
> - expected system response
> - driver warning
> - test method: simulation / HIL / bench / dyno / closed-course
> - required proof artifact
> - pass/block criteria
> - required source
> - verification status
> - missing supplier data
>
> Hard rules:
> - Simulation pass does not equal physical test pass.
> - HIL pass does not equal road-test approval.
> - Live HV testing requires LOTO, PPE, test plan, emergency shutdown, and engineering signoff.

## Gate 08B — Source-backed test-procedure mapping  · STATUS: SOURCE_CANDIDATES_MAPPED — PARKED (batch_32)

First pass (batch_32) mapped all 15 modes to candidate standards; owner
rejected the Hunter's "COMPLETED" → **`SOURCE_CANDIDATES_MAPPED /
NOT_FINAL / NEEDS_EXACT_QUOTES / NEEDS_PAGE_SECTION_TABLE /
NEEDS_SUPPLIER_THRESHOLDS / NO_LIVE_HV / NO_TRACK / NO_COMPLIANCE`**;
Gate 08C = NOT STARTED. Every standard "Exact Quote" is a
`Claim Summary / NeedsExactQuote` (RC-127). Per-source corrected statuses
in `docs/status/FMEA_REGISTRY.md`. **Parked, not closed — proceed to
Gate 05 in parallel.** Reopen 08B when official standard PDFs + supplier
thresholds + an engineering test plan land.

**Owner prompt (verbatim):**

> We are continuing Gate 08: Failure Modes + Test Procedures.
>
> Do not mark anything Confirmed.
> Do not claim compliance.
> Do not invent timing thresholds.
> Do not recommend live HV testing.
>
> For each failure mode in the registry, find the strongest source-backed test procedure or test-method reference.
>
> Failure modes:
> 1. HVIL open
> 2. isolation resistance fault
> 3. contactor weld
> 4. pre-charge failure
> 5. battery overcurrent
> 6. inverter shutdown during regen
> 7. ABS/ESC interaction with regen loss
> 8. EHPS pump failure
> 9. brake assist pressure loss
> 10. steering assist pressure loss
> 11. low-voltage DC-DC brownout
> 12. coolant pump failure
> 13. battery/inverter/motor overtemperature
> 14. CAN communication loss
> 15. water intrusion/IP seal failure
>
> For each one, output:
> - best source
> - exact quote
> - test stage: simulation / HIL / bench / dyno / closed-course
> - required equipment
> - required proof artifact
> - pass/block candidate
> - missing supplier data
> - verification status
