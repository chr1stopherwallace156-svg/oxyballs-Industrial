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

## Gate 05G — Fault Containment and Gateway Failsafe Matrix  · STATUS: FAILSAFE_MATRIX_MAPPED / SIMULATION_ONLY (batch_41)

Deliverable `docs/status/GATE05G_FAILSAFE_MATRIX.md` (13-row failsafe
matrix + failsafe gate rule + default-safe rule). Status (review_38):
`FAILSAFE_MATRIX_MAPPED / SIMULATION_ONLY / TIMEOUT_VALUES_PENDING_SUPPLIER_
DATA / HIL_BENCH_PROOF_REQUIRED / CAN_1_LISTEN_ONLY_PROOF_REQUIRED /
NO_PHYSICAL_GATEWAY_DEPLOYMENT / NO_FACTORY_BUS_TRANSMISSION /
NO_PLACEHOLDER_TIMING_AUTHORITY`. Owner: "strong … architecture right,
failsafe categories right." **Main correction (THIRD recurrence): the 50 ms
/ 100 ms / 2 ms timeouts still read like sourced timing** → downgraded to
SupplierDataPending / SimulationSweepOnly (RC-174). Other corrections: no
"instant" for mechanical/E-stop contactor actions — supplier-defined +
bench/HIL-verified (RC-175); CAN_1 transmit-attempt rejected by firmware
policy AND physically unable to drive the bus (RC-176); bad-checksum stale
data cannot preserve torque authority (RC-177); wrong-source-address
reject+log, latch only on repeat (RC-178). New default-safe rule RC-179: no
failsafe timing controls hardware until SupplierConfirmed/BenchVerified; any
torque/contactor/BMS-discharge/HVIL/isolation/e-stop fault defaults to
torque inhibit + restart lockout + engineering review. Failsafe gate rule:
`failsafe_timing_confirmed == FALSE OR hil_bench_proof == MISSING →
PHYSICAL_HARDWARE_INTEGRATION = BLOCKED, SYSTEM_EXECUTION_MODE =
SIMULATION_FAULTS_ONLY`.

## Gate 05H — HIL / Bench Test Protocol  · STATUS: HIL_TEST_PROTOCOL_DRAFTED / BENCH_EXECUTION_NOT_STARTED (batch_42)

Deliverable `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (HIL harness
architecture, fault-injection matrix HIL-05G-001..006, two illustrative
Python scripts, per-run proof-artifact package). Status (review_39):
`HIL_TEST_PROTOCOL_DRAFTED / LOW_VOLTAGE_BENCH_ONLY / NO_LIVE_HV /
NO_VEHICLE_TESTING / NO_FACTORY_BUS_TRANSMISSION /
TIMING_VALUES_SIMULATION_SWEEP_ONLY / HIL_PROOF_ARTIFACTS_DEFINED /
BENCH_EXECUTION_NOT_STARTED`. Owner: "strong first draft … the right Gate
05H direction." **Main correction (FOURTH recurrence): the 10/20/50/100/2 ms
+ 3-cycle HIL timings were written like real pass/fail limits** → downgraded
to SimulationSweepOnly / SupplierDataPending; "Pass Criteria Metric" → "HIL
Observation Metric / Candidate Pass Criteria" + Authority Status (RC-180).
Other corrections: `[HIL_OBSERVED]` not `[PASS]`, return
`HIL_OBSERVED_NO_GATE_AUTHORITY` (RC-181); CAN_1 short test simulated/bench
only, forbidden on a live Ford bus (RC-182); power-loss safe-state measured
not assumed (RC-183); per-HIL-run proof-artifact package + configurable
script timeout (RC-184). HIL gate rule kept:
`logic_trace_captured == FALSE OR script_execution_status == UNRUN →
BENCH_INTEGRATION_APPROVAL = BLOCKED, MONITOR_MODE = SIMULATION_SCRIPTS_ONLY`.

### Gate 05H refinement (batch_43 + review_40) — sub-gate split

Gate 05H is not "simulation only" — a real VCU DUT + transceivers + supply +
scope + FIU is bench/HIL evidence (RC-185). Split: **05H-A** simulation
script draft (`SIMULATION_SCRIPT_DRAFT`); **05H-B** low-voltage HIL bench
execution with a real VCU (`HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE`);
**05I** physical bench proof (NOT STARTED). Corrected Gate 05H status:
`HIL_TEST_PROTOCOL_DRAFTED / LOW_VOLTAGE_HIL_ONLY / REAL_VCU_DUT_ALLOWED /
NO_LIVE_HV / NO_VEHICLE_TESTING / NO_FACTORY_BUS_TRANSMISSION /
TIMING_VALUES_NOT_GATE_AUTHORITY / ARTIFACT_PACKAGE_DEFINED /
BENCH_EXECUTION_PENDING`. ACK proof now watches the VCU TX/TXD line
(RC-186); CAN-H/CAN-L short bench-only (RC-187); Timing Authority field +
`…_NO_GATE_AUTHORITY` returns (RC-188); LV rail profiles
TestBenchProfileCandidate (RC-189). Deliverable updated
`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`.

### Gate 05H v3 refinement (batch_44 + review_41)

Owner: "the best Gate 05H version so far." Now framed as **real low-voltage
HIL / bench evidence** (real VCU DUT + transceivers + FIU + calibrated
instruments), cleaned of vehicle-approval language. Corrected status:
`HIL_VALIDATION_PROTOCOL_CREATED / REAL_VCU_DUT_ALLOWED / LOW_VOLTAGE_HIL_ONLY
/ PHYSICAL_TRANSCEIVER_EVIDENCE_REQUIRED / CAN_1_LISTEN_ONLY_PROOF_REQUIRED /
NO_LIVE_HV / NO_REAL_VEHICLE_NETWORK / NO_VEHICLE_TESTING /
NO_COMPLIANCE_AUTHORITY / PENDING_ENGINEERING_REVIEW`. Corrections: evidence
boundary — HIL results are DUT/firmware/harness-scoped, not vehicle/live-HV/
compliance authority (RC-190); result categories `…_NO_VEHICLE_AUTHORITY` /
`HIL_HARD_BLOCK` / `HIL_INVALID_RUN` (RC-191); CAN short bench-only hard rule
(RC-192); non-destructive TX fault (RC-193); calibration records (RC-194);
mandatory pre-test safety checklist (RC-195). Deliverable updated
`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`.

## Gate 05I — Physical (LOW-VOLTAGE) Bench Integration  · STATUS: LOW_VOLTAGE_BENCH_INTEGRATION_STARTED (batch_45)

Deliverable `docs/status/GATE05I_BENCH_INTEGRATION.md` (production-like LV
integration environment, bench fault-injection & driver-safety matrix,
transceiver-protection script, bench-integration artifact dossier with
calibration records). Status (review_42):
`LOW_VOLTAGE_BENCH_INTEGRATION_STARTED / PRODUCTION_INTENT_HARNESS_REQUIRED /
REAL_VCU_REQUIRED / SUPPLIER_LOGIC_NODES_REQUIRED / HARDWIRED_ESTOP_REQUIRED
/ NO_HV_TRACTION_BATTERY / NO_VEHICLE_ROAD_TESTING /
NO_LIVE_FORD_BUS_TRANSMISSION / NO_VEHICLE_CLEARANCE /
PENDING_ENGINEERING_REVIEW`. Owner: "begin Gate 05I — but keep it
low-voltage physical bench integration only." Corrections: BENCH (not HIL)
result categories (RC-197); E-stop measured not "instant" (RC-198);
production-intent (not production-spec) harness (RC-199); CAN_1 fault
injection protected-bench-only (RC-200); driver-safety stays bench-level →
Gate 05I-A (RC-201). **Gate 05J / live vehicle commissioning explicitly NOT
YET.**

## Gate 05I-A — Low-Voltage Driver Safety Logic Verification  · STATUS: BENCH_TEST_MATRIX_CREATED (batch_46)

Deliverable `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (13-row
driver-safety verification matrix + brake-override script + calibration
record). Status (review_43): `BENCH_TEST_MATRIX_CREATED /
LOW_VOLTAGE_BENCH_ONLY / DRIVER_INPUT_LOGIC_UNDER_TEST / NO_LIVE_HV /
NO_VEHICLE_MOTION / NO_LIVE_FORD_CAN_TRANSMISSION /
TIMING_VALUES_TARGET_PROFILE_ONLY / BENCH_EVIDENCE_PENDING /
NO_VEHICLE_CLEARANCE`. Owner: "the correct next subgate … very strong."
Corrections: timing/percentages → BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING
/ CONTROLS_REVIEW_REQUIRED (RC-202, seventh invented-timing recurrence);
expected-safe-output vs blocked-outputs split (RC-203); no "immediate" —
measured latency within a configured window (RC-204); HVIL — VCU requests,
BMS/PDU/hardwired loop owns isolation (RC-205); UDS service-clear must not
clear active hardwired/HVIL/E-stop/BMS/isolation faults or a live latch
(RC-206); `PERMANENTLY_BLOCKED` → `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW`
(RC-207); script returns BENCH categories not HIL (RC-197).

**Owner prompt was (verbatim, now fulfilled):**

> Begin Gate 05I-A: Low-Voltage Driver Safety Logic Verification.
>
> This is not vehicle road testing.
> This is not live high-voltage testing.
> This does not approve real driver operation.
>
> Create a bench-only verification matrix for:
> 1. accelerator pedal plausibility
> 2. brake override
> 3. shift-state inhibit
> 4. charger-plug drive lockout
> 5. E-stop hardwired interrupt
> 6. HVIL open detection
> 7. BMS no-discharge response
> 8. inverter fault response
> 9. low-voltage brownout
> 10. fault latch persistence
> 11. service clear routine
> 12. isolated EV display warning behavior
> 13. CAN_1 listen-only maintained during all driver-input tests
>
> For each test include:
> - test ID
> - driver-safety function
> - bench setup
> - fault/input injected
> - expected VCU behavior
> - expected hardwired behavior
> - blocked outputs
> - measurement method
> - proof artifact
> - result category
> - authority status
> - Build Engine status
>
> Hard rules:
> - No live HV.
> - No vehicle motion.
> - No real Ford factory bus transmission.
> - No road-test approval.
> - Bench evidence only.

Enforce throughout — BENCH result categories not HIL (RC-197); E-stop
measured not "instant" (RC-198/204); CAN_1 protected-bench-only + listen-only
(RC-200); no timeout/threshold/percentage gains authority until proven
(RC-173/179/180/188/202); the VCU coordinates but owns nothing
safety-critical (BQ-27); D-007 + RC-168 bind. Blocked: real propulsion, live
HV, wheels-on-ground, Ford ABS/ESC intervention, factory-cluster injection,
road-test driver-safety claims (RC-201).

## Gate 05I-B — Mechanical Interlocks & Physical Safety Loop Verification  · STATUS: MECHANICAL_INTERLOCK_MATRIX_CREATED (batch_47)

Deliverable `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (12-row
mechanical-interlock matrix + bench-run traceability package). Status
(review_44): `MECHANICAL_INTERLOCK_MATRIX_CREATED /
PHYSICAL_SAFETY_LOOP_TESTS_DEFINED / PRODUCTION_INTENT_HARNESS_REQUIRED /
BENCH_LOTO_REQUIRED / TARGET_CRITERIA_PENDING_SOURCE_REVIEW / NO_LIVE_HV /
NO_VEHICLE_CLEARANCE`. Owner: "the correct 'real harness' layer before
anything touches the vehicle." Corrections: numeric criteria (<0.1 Ω / <0.02 Ω
/ ≤20 ms / 5 A-10 A) → `TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_DATASHEET /
NEEDS_ENGINEERING_REVIEW` (RC-208); breach IF logic uses
`approved_ground_limit` / `approved_datasheet_limit` variables, not
hard-coded 0.02 Ω / 20 ms (RC-209). The re-emitted 05I-A also realized the
review_43 fixes (HVIL ownership RC-205, Service Clear Operational Law RC-206,
RCA flow RC-207) — Gate 05I-A now adds `SERVICE_CLEAR_RULES_DEFINED /
ROOT_CAUSE_FLOW_DEFINED`.

## Gate 05I-C — Low-Voltage Communication Network Integrity & Sleep/Wake Validation  · STATUS: STARTED, split C1/C2 (batch_48)

Deliverable `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`. Status (review_45):
`STARTED / LOW_VOLTAGE_BENCH_ONLY / NETWORK_INTEGRITY_MATRIX_PENDING /
SLEEP_WAKE_MATRIX_PENDING / DBC_VERSION_CONTROL_REQUIRED /
HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`. Owner: "Gate 05I-C is
the correct next move … should also include sleep/wake." Corrections: intro
"validated" → "matrices defined + bench evidence collected" (RC-210); no
"immediate" (RC-211); bench values incl. >75% bus-util + >100 ms heartbeat
are BENCH_TARGET_PROFILE (RC-212); a DBC is a database not a packet — reject
wrong-ID / wrong-PGN / wrong-DBC-version / bad-checksum / rolling-counter /
out-of-range / unexpected-diagnostic-request (RC-213). Split into 05I-C1 +
05I-C2 (RC-214). (05I-A + 05I-B also gained the Expected-Safe-Output vs
Blocked-Outputs column split, RC-203/208 realized.)

## Gate 05I-C1 / 05I-C2 — Communications & Power State Integrity  · STATUS: NETWORK_INTEGRITY_MATRIX_CREATED + SLEEP_WAKE_MATRIX_CREATED (batch_50)

Deliverable `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (v2: 05I-C1
physical/protocol + application-layer + 6-row matrix; 05I-C2 per-node sleep
current + 6-row matrix). Status (review_47): `NETWORK_INTEGRITY_MATRIX_CREATED
/ SLEEP_WAKE_MATRIX_CREATED / LOW_VOLTAGE_BENCH_ONLY /
CAN_1_LISTEN_ONLY_PROOF_REQUIRED / DBC_VERSION_HASH_REQUIRED /
APPLICATION_LAYER_VALIDATION_DEFINED / PHYSICAL_CAN_FAULT_INJECTION_DEFINED /
SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW /
HEARTBEAT_TIMEOUTS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`. Owner: "now a real
bench network-integrity gate; the DBC version hash + TXD-pin proof are
excellent." review_46 fixes realized (RC-216/217/218 + C1/C2 split);
review_47 corrections: values BENCH_TARGET_PROFILE + explicit per-node sleep
current (RC-220); CAN_1 diagram simulated/protected only (RC-221);
physical/protocol vs app-layer fault-injection wording (RC-222); brownout
NVM-save needs early-warning hardware (RC-223).

## Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated Fault Cascades  · STATUS: INTEGRATED_FAULT_SEQUENCE_MATRIX_CREATED (batch_51)

Deliverable `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` (10-row
integrated-fault-cascade matrix + exit criteria). Status (review_48):
`INTEGRATED_FAULT_SEQUENCE_MATRIX_CREATED / LOW_VOLTAGE_BENCH_ONLY /
REAL_VCU_DUT_REQUIRED / SUPPLIER_LOGIC_BOARDS_REQUIRED /
CAN_1_SILENCE_REQUIRED_DURING_ALL_CASCADES / TIMING_TARGETS_PENDING_SOURCE_
REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION / NO_LIVE_FORD_CAN_TRANSMISSION /
NO_VEHICLE_CLEARANCE`. Owner: "testing the system as a system." **Critical
correction: never "certified safe"** → "eligible for engineering review for
controlled low-voltage vehicle fitment only" (RC-224). Other corrections:
test IDs 05D-### → 05I-D-### + timing labels + no "immediate" (RC-225);
charger-plug detect+reject not "ignore" (RC-226); E-stop hardwired loop owns
physical interruption (RC-227); sleep-current node vs total-system (RC-228).

## The post-bench gate ladder (Decision Register D-008)

The path from the LV bench to HV is **staged + engineer-gated** — no jump to
live commissioning:

## Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness  · STATUS: CONTROLLED_VEHICLE_FITMENT_DEFINED (batch_52 + cleanups batch_53)

Deliverable `docs/status/GATE05J_VEHICLE_FITMENT.md` (5-row fitment matrix +
CAN_1 live-Ford precondition + exit criteria). The **first gate where the
conversion physically touches the vehicle (no HV connected/energized)**.
Status (review_50): `CONTROLLED_VEHICLE_FITMENT_DEFINED / NO_HV_CONNECTED /
NO_TRACTION_ENABLE / NO_VEHICLE_MOTION / CAN_1_PASSIVE_ONLY /
FORD_BASELINE_SCAN_REQUIRED / FORD_POST_CONNECTION_SCAN_REQUIRED /
CONVERSION_ADDED_PARASITIC_DRAW_TRACKED / GROUNDING_AND_SHIELDING_UNDER_REVIEW
/ NO_ROAD_TEST_AUTHORITY`. Owner: "controlled vehicle fitment with no HV
connected." Corrections (review_49): 05J is fitment + passive/no-HV
verification, not commissioning — 05K is the first formal LV power-on gate
(RC-229); **CAN_1 connects to the live OEM Ford bus only in passive
listen-only after the Gate 05H + 05I-C proofs, with a Ford baseline scan →
connect → post-connection scan → compare (RC-230)**; parasitic draw separated
OEM/conversion/total (RC-231/234); fitment values are INITIAL_TARGET_PROFILE +
"live OEM Ford CAN_1 network" wording (RC-232). Cleanups (review_50): 05J-003
row uses conversion_added ≤4.0 mA + OEM_baseline + total_vehicle separately
(RC-234); exit criterion 7 adds firmware/register dumps + reviewer signoffs.
Permits **Gate 05K only**; never "certified safe" (RC-224).

## Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning  · STATUS: LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED (batch_53)

Deliverable `docs/status/GATE05K_VEHICLE_POWER_ON.md` — the first formal
low-voltage vehicle power-on gate, **still no HV, no real HV contactor
closure, no traction enable, no vehicle motion.** Built from the
owner-preferred 9-test version (05K-001..009; the duplicate 5-test version was
kept archived-superseded, RC-233). Status (review_50):
`LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED / NO_HV_CONNECTED /
NO_REAL_HV_CONTACTOR_CLOSURE / NO_TRACTION_ENABLE / NO_VEHICLE_MOTION /
CAN_1_PASSIVE_MONITORING_ONLY / IN_CHASSIS_DRIVER_INPUTS_UNDER_TEST /
IN_CHASSIS_FAULT_LATCH_UNDER_TEST / FORD_DTC_DELTA_REQUIRED /
NO_ROAD_TEST_AUTHORITY`.

**Owner scope (review_49/50) — tested (05K-001..009):** ignition-off quiescent
draw · accessory transition · key-on/run wake (VCU + display) · CAN_1 passive
monitoring · isolated CAN_2/CAN_3 comms · UDS diagnostic session access · HV
lockout enforcement (**no real contactor closure — coils disconnected / dummy
loads / mechanically blocked, RC-236**) · Ford system error immunity (DTC
delta vs the 05J baseline) · in-chassis fault-latch survival across a power
cycle. All target values are INITIAL_TARGET_PROFILE (RC-235); CAN_1 strictly
listen-only (register + TXD proof). Permits **Gate 05L-A only**.

## Gate 05L-A — Controlled HV First-Energization Authorization & Safety Readiness  · STATUS: HV_AUTHORIZATION_GATE_CREATED (batch_54)

Deliverable `docs/status/GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` — the
**pre-energization authorization gate**, the first rung of the split Gate 05L
(RC-237 amends D-008). **The first gate that contemplates live HV — but NO HV
energization.** Permanent rule (review_51): *no HV potential may be introduced
to the chassis until every line item is physically verified, signed off, and
archived.* 7-row matrix (05L-A-001..007: qualified personnel, PPE/tool
certification, exclusion perimeter, Live-Dead-Live absence check, IMD
readiness, hardwired E-stop verification, pre-charge loop integrity) + a
12-item hard-stop list. Status (review_51):
`HV_AUTHORIZATION_GATE_CREATED / NO_HV_ENERGIZATION / QUALIFIED_PERSONNEL_
REQUIRED / LOTO_REQUIRED / LIVE_DEAD_LIVE_REQUIRED / PPE_VOLTAGE_RATING_REVIEW_
REQUIRED / INSULATED_TOOLING_REQUIRED / IMD_READINESS_REQUIRED / ESTOP_
HARDWIRED_PROOF_REQUIRED / PRECHARGE_OWNERSHIP_PENDING_CONFIRMATION / CONTACTOR_
OWNERSHIP_PENDING_CONFIRMATION / SUPPLIER_DOCS_REQUIRED / EMERGENCY_RESPONSE_
PLAN_REQUIRED / ENGINEERING_SIGNOFF_REQUIRED`. Corrections (review_51):
qualified/authorized personnel not "certified" (RC-238); voltage-matched PPE,
gate blocks above rating (RC-239); fire assets AHJ/supplier-ERG-selected
(RC-240); Live-Dead-Live via an approved proving source + resolution-aware
threshold, >0.5 V = INITIAL_AVV_ABORT_TARGET (RC-241); stored-energy discharge
wait (RC-242); IMD supplier-defined thresholds (RC-243); pre-charge test
low-voltage-only, no DC-link rise (RC-244). Owner cited **OSHA** electrical
work-practice/LOTO + **NHTSA EV HV-hazard** guidance (NeedsExactSource —
owner-paraphrased). Permits **Gate 05L-B only**, after signed engineering
authorization; authorizes no energization by itself.

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation  · STATUS: DRAFT_CREATED / LIVE_HV_PRESENT (batch_55)

Deliverable `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` — the **first
gate with LIVE HV PRESENT**: first LOTO-pin removal + MSD connect + software-
controlled current-limited pre-charge closure, **purely observational — no
inverter switching, zero motor RPM, no vehicle movement**, only after a signed
Gate 05L-A authorization. 7-row matrix (05L-B-001..007: main-negative closure,
pre-charge inrush/curve audit, delta-V validation, pre-charge timeout, weld-
fault sim, passive stored-energy discharge, manual E-stop abort). Status
(review_52): `DRAFT_CREATED / LIVE_HV_PRESENT / QUALIFIED_PERSONNEL_REQUIRED /
SUPPLIER_PRECHARGE_DATA_REQUIRED / CONTACTOR_SEQUENCE_PENDING_SUPPLIER_
ARCHITECTURE / VCU_AUTHORITY_REQUESTER_ONLY_UNLESS_DOCUMENTED /
NO_INVERTER_SWITCHING / ZERO_MOTOR_RPM / NO_VEHICLE_MOVEMENT / NO_ROAD_TEST /
NO_TRACTION_COMMAND / TIMING_THRESHOLDS_TARGET_ONLY / ENGINEERING_REVIEW_
REQUIRED`. Corrections (review_52): thresholds (95%/500 ms/50 ms/60 V/5% ΔV)
are initial bench targets only — supplier-defined completion + timeout (RC-245);
contactor sequence is supplier-specific (RC-246); VCU = REQUESTER/MONITOR, the
BMS/PDU owns execution (RC-247); "current-limited" needs a real current-limit
definition — 05L-B blocked without it (RC-248); added the manual E-stop abort
row (RC-249); IMD thresholds candidate/pending (RC-251). Permits **Gate 05L-C
only**; does not authorize motor spin / inverter switching / traction command /
vehicle movement / chassis dyno / road testing / customer operation.

## Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability  · STATUS: NEXT (owner review_52)

Owner review_52: do **not** jump to Gate 05M — insert Gate 05L-C first. After
first energization, prove the **shutdown/discharge/repeatability** layer before
any inverter enable or motor spin.

**Owner scope (review_52) — that gate proves:**

> - normal shutdown
> - emergency shutdown
> - stored-energy discharge
> - restart lockout
> - pre-charge retry limits
> - IMD fault response
> - contactor feedback consistency
> - no weld detection false negatives
> - repeat cycle stability

Enforce throughout — engineer-gated, live-HV, **still no motor spin / no
inverter switching / no vehicle movement**; no threshold (discharge time,
retry limit, IMD trip) is final gate logic until supplier docs + engineering
review upgrade it (RC-245/248/251); the stored-energy discharge-wait rule
applies after any exposure or failed attempt (RC-242); the VCU requests but
does not own contactor/pre-charge/HV isolation — the BMS/PDU owns execution,
the hardwired loop owns emergency interruption (RC-247/205/227; BQ-27); the
human E-stop abort path stays proven with no auto retry (RC-249); never
"certified safe" / no compliance claim (RC-224). **Only after Gate 05L-C** may
Gate 05M (Traction Inverter Control Loop & Low-Speed Spin Validation) even be
considered — under controlled spin profiles, engineer-approved, staged safety
plan + LOTO/PPE (RC-117/RC-250).

Enforce throughout — no HV / no traction enable / no vehicle motion at
05J-05K; CAN_1 stays listen-only + passive on the live OEM Ford bus (TXD-pin
proof + baseline/post scan, RC-186/216/230); the VCU requests but does not
own HV isolation — the hardwired loop owns physical interruption (RC-205/227;
BQ-27); no timing/threshold/fitment value becomes a rule until controls
review + supplier/vehicle-package confirmation upgrades it
(RC-202/208/212/215/220/225/232); **never "certified safe" / no
compliance/certification claim (RC-224)**; no real HV contactor closure at
05K (RC-236); every torque/contactor/HVIL/isolation/e-stop fault defaults to
torque inhibit + restart lockout + engineering review (RC-179). **Gate 05L
(HV first-energization) is engineer-approved only and begins with the 05L-A
authorization gate (RC-237/D-008), NOT before 05J + 05K + 05L-A.**

Enforce throughout — every proof bench/HIL, no vehicle, no live-HV without a
staged safety plan + LOTO/PPE (RC-117); no timeout/threshold/HIL timing
gains physical authority until a source/HIL requirement upgrades it from
SimulationSweepOnly/HILObservedOnly to SupplierConfirmed/BenchVerified
(RC-173/179/180/188); report HIL-observed, never PASS (RC-181/188); CAN_1
listen-only with the TXD-line proof (RC-186), bench-only fault injection
(RC-187); EV-side isolated; the VCU owns nothing safety-critical (BQ-27);
D-007 + RC-168 bind.

### Standing alternatives (any order)

- The **Gate 06 deep dive** (Mechanical Mounting / Battery Enclosure) per
  the standing order after Gate 05: **06 → 09 → 10 → 11**.
- A supplier reply, a Gate 08C reopen (supplier thresholds), a Gate 08B
  reopen (official standard PDFs), or Gate 07A/07C field data.

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
