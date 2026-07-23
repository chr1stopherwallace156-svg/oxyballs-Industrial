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

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation  · STATUS: DRAFT_READY_WITH_REVISIONS / LIVE_HV_PRESENT (batch_55 + ownership realized batch_56)

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

## Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability  · STATUS: SHUTDOWN_REPEATABILITY_MATRIX_CREATED / LIVE_HV_PRESENT (batch_56)

Deliverable `docs/status/GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` — repeat-cycle
stability + off-nominal fault handling of the HV sequencing loop, **live-HV but
zero motor RPM / no inverter switching / no vehicle movement**. 6-row matrix
(05L-C-001 normal coordinated shutdown, 002 pre-charge retry-limit lockout, 003
thermal cool-down enforcement, 004 live IMD fault isolation via approved
fixture, 005A weld-detection false-positive, 005B weld-detection false-negative).
Status (review_53): `CORRECT_NEXT_GATE / LIVE_HV_PRESENT / ZERO_MOTOR_RPM /
NO_INVERTER_SWITCHING / SHUTDOWN_SEQUENCE_PENDING_SUPPLIER_ARCHITECTURE /
DISCHARGE_WINDOW_PENDING_SUPPLIER_DATA / IMD_FAULT_INJECTION_FIXTURE_REQUIRED /
RETRY_LIMIT_TARGET_ONLY / THERMAL_RECOVERY_TIMER_REQUIRED / NO_TRACTION_COMMAND
/ NO_VEHICLE_MOVEMENT / NO_ROAD_TEST_AUTHORITY`. Corrections (review_53):
numbers are target profiles (RC-252); IMD fault injection via an approved,
rated, current-limited fixture only — no ad-hoc resistor on a live rail
(RC-256); shutdown order is supplier-specific (RC-257); weld test split into
false-positive (005A) + false-negative (005B) (RC-258). Permits **Gate 05M-A
only**.

## Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation  · STATUS: DRAFT_CREATED / LIVE_HV_PRESENT (batch_57)

Deliverable `docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` — the
boundary between static HV distribution (Gate 05L) and dynamic inverter drive:
HV bus live, inverter gating locked by software+hardware, **readiness not
spin** — no intentional motor rotation, no vehicle movement, no driver torque
authority. 5-row matrix (05M-A-001 inverter power-up handshake, 002
phase-current offset zeroing, 003 static resolver baseline, 004 supplier-defined
torque-disabled verification, 005 watchdog disruption → supplier Safe-Off).
Status (review_54): `DRAFT_CREATED / LIVE_HV_PRESENT /
INVERTER_READY_STATE_UNDER_TEST / TORQUE_DISABLED_STATE_REQUIRED /
NO_INTENTIONAL_MOTOR_ROTATION / NO_VEHICLE_MOVEMENT / NO_DRIVER_TORQUE_AUTHORITY
/ SUPPLIER_INVERTER_STATE_DEFINITIONS_REQUIRED / WATCHDOG_TARGETS_PENDING_
SUPPLIER_DATA / PHASE_CURRENT_OFFSET_CHECK_REQUIRED / RESOLVER_BASELINE_CHECK_
REQUIRED / NO_ROAD_TEST_AUTHORITY`. Corrections (review_54): all numbers are
target profiles (RC-260); the inverter enabled/ready/PWM-active state is
supplier-specific, no assumed 0% PWM / no power-stage switching unless the
supplier defines it safe + engineering approves (RC-265); 05M-A is readiness
not spin (RC-266). Permits **Gate 05M-B only**.

## Gate 05M-B — No-Load Motor Spin Validation  · STATUS: NO_LOAD_MOTOR_SPIN_READY_FOR_DETAILING (batch_58 + cleanups batch_59)

Deliverable `docs/status/GATE05M_B_NO_LOAD_MOTOR_SPIN.md` — the **first
physical rotation of the traction motor**, shaft **uncoupled** from the
drivetrain (driveshafts/axles/gearboxes): resolver offset-angle calibration,
phase-rotation-sequence verification, balanced three-phase sine/THD audit,
over-speed (supplier-supported test mode, RC-277) + watchdog-under-rotation
trips (coasting is not the failure, RC-276). 5-row matrix (05M-B-001..005).
Status (review_56): `NO_LOAD_MOTOR_SPIN_READY_FOR_DETAILING /
GUARDED_SHAFT_REQUIRED / MOTOR_UNCOUPLED_REQUIRED / SUPPLIER_SPIN_PROFILE_REQUIRED
/ NO_DRIVELINE_TORQUE_PATH / NO_VEHICLE_MOVEMENT`. **Physical boundary (RC-272,
HARD prerequisites):** guarded rotating shaft · no driveline attachment · no
wheel torque path · no vehicle-movement path · emergency stop active ·
exclusion zone active · supplier-defined spin profile only · no cabin driver
pedal authority. All numbers (≤2% torque, 500 RPM, ±1.0° electrical, ≤3% phase
balance, ≤50 ms watchdog) are `INITIAL_TARGET_PROFILE` pending supplier approval
(RC-267/Numeric Threshold Authority Rule). Spin commanded via the service/
calibration tool, not driver pedal (RC-271). Permits **Gate 05M-C1 only**.

## Gate 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness  · STATUS: COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED (batch_60)

Deliverable `docs/status/GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` — the first
coupled test: the traction motor coupled to gearbox/half-shafts/hubs/wheels but
the **driven axle lifted + locked, zero ground contact**. 5-row matrix
(05M-C1-001 backlash mapping, 002 elevated wheel-speed parity, 003
brake-override, 004 micro-scale torque clamp, 005 lifted asymmetry/differential
scan). Status (review_57): `COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED /
RATED_LIFT_OR_STANDS_REQUIRED / ROTATING_WHEEL_GUARDS_REQUIRED / NO_GROUND_CONTACT
/ NO_OPEN_FLOOR_MOVEMENT / NO_CAN_1_CONTROL_AUTHORITY / BRAKE_OVERRIDE_REQUIRED /
MICRO_TORQUE_LIMIT_TARGET_ONLY`. Safety corrections (review_57): **"hand-lock one
lifted wheel" forbidden — rated mechanical wheel restraint / differential / hub-
locking fixture only, no hands near rotating parts ever (RC-279)**; the Lifted
Chassis Safety Rule — rated lift/heavy-duty stands per GVWR/axle load, secured
against roll, guards, no personnel inline, no one under the vehicle during
energized rotation (RC-280); brake override within the approved response window,
not "instantly" (RC-281); wheel-speed data read-only, not traction-control
authority (RC-282); every value INITIAL_TARGET_PROFILE (RC-267). Permits **Gate
05M-C2 only**.

## Gate 05M-C2 — Restricted Creep Torque Validation  · STATUS: FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE (batch_61)

Deliverable `docs/status/GATE05M_C2_RESTRICTED_CREEP.md` — the **first powered
ground-contact movement gate**: tires touch the ground under live traction for
the first time, restricted creep only. **Split (RC-286): 05M-C2A Flat-Ground
Restricted Creep (12-row matrix 05M-C2A-001..012) → 05M-C2B Controlled Incline /
Rollback Hold Validation → 05M-C2C Faulted Creep Recovery.** Status (review_59):
`FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE / LIVE_HV_PRESENT /
GROUND_CONTACT_PRESENT / RESTRICTED_CREEP_ONLY / PREDICTABLE_TRACTION_SURFACE_REQUIRED
/ REMOTE_ESTOP_REQUIRED / SPOTTERS_REQUIRED / BRAKE_ASSIST_VERIFICATION_REQUIRED /
STEERING_ASSIST_VERIFICATION_REQUIRED / CAN_1_PASSIVE_ONLY /
TORQUE_CLAMP_INITIAL_TARGET_ONLY / RAMP_RATE_INITIAL_TARGET_ONLY /
FAULT_LATCH_REQUIRED / NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION /
NO_NORMAL_DRIVING_AUTHORITY`. Corrections (review_58): predictable-traction
surface, not low-friction (RC-283); `dT_command/dt` not `dQ/dt` (RC-284); the
Ground Movement Precondition — brake/brake-assist/steering-assist verified,
E-stop armed + remote active, spotters + runout clear, clamp + ramp active,
engineer/test-lead explicit start authorization (RC-285); rollback/incline
deferred to 05M-C2B (RC-286); breakaway above the clamp → NEEDS_REVIEW not an
auto diagnosis (RC-287); no "absolute 0 Nm"/"instantly" wording (RC-288); all
numbers INITIAL_TARGET_PROFILE (RC-267); wheel-speed read-only (RC-282); CAN_1
listen-only (RC-172/230). Cleanups (review_59): matrix carries Proof Artifact +
Authority Status + Build Engine Status columns (RC-289); a failed-creep /
motion fault needs diagnostic review + fault-source correction + approved
service clear + engineering/test-lead authorization, not a hard reset (RC-290);
no automatic "unlock 15 km/h" — 05M-C3 speed ceiling is INITIAL_TARGET_PROFILE
(RC-291). Baseline cleanups (review_61, RC-292..296): Authority Status names a
`Required Approver` with `SIGNOFF_REQUIRED / NOT_EXECUTED` + `PENDING_EXECUTION`,
never "Approved by" (RC-292); Numeric Threshold Authority Rule over 05M-C2A/C2B
(RC-293); 15–25 Nm breakaway an expected range, not a pass envelope — out-of-range
NEEDS_REVIEW not auto-fail (RC-294); measurable thresholds not "absolute
control"/"completely active" (RC-295); static brake-hold displacement threshold
(RC-296); status adds `REQUIRED_APPROVERS_DEFINED` + `PROOF_ARTIFACTS_DEFINED`;
05M-C2B = `PROVISIONAL_LOCKED / UNLOCKS_ONLY_AFTER_05M_C2A_SIGNOFF / …`.
**Regression cleared (batch_64): after the batch_62/63 full-draft regressions
(RC-279 safety-critical + RC-283/284/286/288), the Hunter finally applied all
eight prior fixes; the deliverable never regressed.** Baseline-candidate
corrections (review_63, RC-297..306): bounded fault injection (RC-297);
brake/steering pre-movement HARD interlock + tested inhibition 05M-C2A-010B
(RC-298/306); four-field approval record — `Required Approver` / `Procedure
Approval Status` / `Execution Status` / `Result Signoff Status`, a GLOBAL rule,
no `SIGNED_PASS` until `EXECUTED` (RC-299); expanded Numeric Threshold Authority
linkage (RC-300); software `Restricted Creep Torque Clamp` not "hard/absolute
clamp" (RC-301); dual-channel APPS plausibility (RC-302); torque-rate ≠
current-response (RC-303); electrical CAN_1 passivity (RC-304); C2B Rollback
Containment Rule + hill-hold ≠ parking-hold (RC-305). Pre-lock corrections
(review_64, RC-307..312 + `INVALID_TEST`): measurable APPS operating windows not
"completely valid" (RC-307); phase-current response inside a supplier tracking
envelope with expected latency, split as 05M-C2A-006A/006B (RC-308);
architecture-dependent E-stop, not universal contactor interruption (RC-309);
Neutral by zero propulsion torque, not a universal switching ban (RC-310); C2B
rollback abort rule latching `FAIL`/`NEEDS_REVIEW`, no automatic second attempt
(RC-311); brake-hold "approved test torque profile" not "full torque" (RC-312).
Status adds `BASELINE_CANDIDATE / FORMAL_ENGINEERING_REVIEW_REQUIRED /
DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED / *_INTERLOCK_REQUIRED /
CAN_1_ELECTRICALLY_PASSIVE_ONLY / CONTROLLED_FAULT_INJECTION_ONLY /
PROCEDURE_APPROVAL_REQUIRED / EXECUTION_NOT_YET_PROVEN /
RESULT_SIGNOFF_NOT_YET_ELIGIBLE / NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`; 05M-C2B
adds `ROLLBACK_ABORT_RULE_REQUIRED / PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED`;
post-edit label
`GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
procedure is ready to be reviewed and controlled, not physical-pass evidence.
Permits **Gate 05M-C3 only** (after 05M-C2A/B/C).

## Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement  · STATUS: REVISION 08 — safety architecture mature + relational-schema doctrine complete, controlled-specification-freeze candidate (owner review_72, batch_76)

Deliverable `docs/status/GATE05M_C3_CLOSED_AREA_MOVEMENT.md` — the **last rung of
the split 05M-C phase**, only after Gate 05M-C2 is proven. Built as **five linear
subgates** (owner review_65): **05M-C3A** straight-line low-speed tracking (10-row
matrix, four-field per row) → **05M-C3B** coast-down + foundation brakes (regen
disabled) → **05M-C3C** restricted regeneration (supplemental only) → **05M-C3D**
steering-angle / propulsion-envelope map (observation/derating, `NO_TORQUE_VECTORING_AUTHORITY`)
→ **05M-C3E** closed-area fault + abort (cell-escalated). Strictly linear — no
subgate unlocks without the prior one's `SIGNED_PASS`. Includes the Telemetry
Synchronicity Packet + data-sync proof (RC-326), the Test Configuration Lock Rule
(RC-325), cell-by-cell envelope escalation (RC-314), and the Critical Abort
Hierarchy. 14 review_65 corrections applied (RC-313..326): Runout Calculation
Record not a hard-coded 50 m (RC-313); governor proven off-track first (RC-315);
path-deviation observation vs torque-inhibit split (RC-316); **C3B-004 rewritten
so brakes never fight sustained torque — SAFETY-CRITICAL (RC-317)**; contact
thermocouples over IR (RC-318); ABS/ESC two-lane rule (RC-319); no
"instant/immediate" regen (RC-320); brake-blend continuity/jerk envelope (RC-321);
premature C3D numbers → `CELL_VALUE_PENDING_APPROVAL` (RC-322); road-wheel geometry
not SWA alone (RC-323); C3E cell-based fault escalation (RC-324). Status:
`MODULAR_ARCHITECTURE_DEFINED / … / RUNOUT_CALCULATION_REQUIRED /
NO_ACTIVE_ABS_ESC_AUTHORITY / NO_TORQUE_VECTORING_AUTHORITY / NO_PUBLIC_ROAD /
NO_CUSTOMER_OPERATION / NO_NORMAL_DRIVING_AUTHORITY`; post-edit label
`GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — the
architecture is ready for engineering review, NOT physical-pass evidence.
**Revision 02 (review_66, RC-327..339):** complete RunoutCalculation_ID field
list + `L_min` (RC-327); C3A-009B stays `LOCKED` until external-tracking control
authority is established (RC-328); torque command judged against an approved
time-domain envelope, not "linear" (RC-329); BOS torque removal separate from the
foundation-brake stop (RC-330); regen-disabled a command state not literal 0 Nm
(RC-331); C3C-003 coexistence observation, true blending BLOCKED until modelled
(RC-332); regen availability BMS-permission-bounded not high-SOC (RC-333); no
arbitrary bus injection (RC-334); C3C-007 driver/brake response (RC-335); no
premature C3D numbers / "immediate" (RC-336); steering-signal validity states
(RC-337); listed C3E fault hierarchy L1–L4 (RC-338); Test Result Validity Rule
(RC-339). Status upgrades to `PROCEDURE_ARCHITECTURE_MATURE / REVISION_02_APPLIED
/ C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED / FORMAL_ENGINEERING_REVIEW_REQUIRED`;
post-edit label
`GATE_05M_C3_REVISION_02_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW`.
**Revision 03 (review_67, RC-340..350):** insert + govern the actual `L_min`
equation (RC-340); ±2 Nm zero-regen residual a candidate not universal (RC-341);
remove the circular C3A→C3B dependency (RC-342); remove "immediate" from steering
states (RC-343); define `STALE` by signal freshness (RC-344); supplier Neutral
envelope (RC-345); C3C-007 fault ownership + comms-loss ≠ shutdown (RC-346); C3E
fault-execution-domain classification (RC-347); paired/compound-fault
prerequisites + order/timing (RC-348); preserve invalidated evidence (RC-349);
full `TestCellAuthorization_ID` schema (RC-350). Status becomes
`FORMAL_BASELINE_CANDIDATE / REVISION_03_APPLIED / … /
C3E_EXECUTION_DOMAIN_CLASSIFICATION_DEFINED`; post-edit label
`GATE_05M_C3_REVISION_03_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW`.
**Revision 04 (review_68, RC-351..363):** preserve distance-component values not
zero-clamp (RC-351); Distance Accounting Integrity Rule + component schema
(RC-352); immutable result lifecycle (RC-353); `TestCellAuthorization` status
transitions (RC-354); procedure approval requires real signatures (RC-355);
±2 Nm strictly non-authoritative + DC-bus + remove field-weakening (RC-356);
measurable C3A-006 braking (RC-357); C3A-009B block prerequisites (RC-358);
independent physical evidence after comms loss (RC-359); steering validity vs
freshness (RC-360); execution arrows are review paths (RC-361); tighter
moving-fault limits (RC-362); full `PairedFaultAuthorization_ID` schema (RC-363).
Status becomes `FORMAL_BASELINE_CANDIDATE / REVISION_04_APPLIED / … /
MULTI_FAULT_AUTHORIZATION_SCHEMA_DEFINED`; post-edit label
`GATE_05M_C3_REVISION_04_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW`.
**Revision 05 (review_69, RC-369..382):** units + hard validation constraints on
every numeric authorization field (RC-369); immutable `AuthorizationTransition_ID`
audit events + `SUSPENDED → AUTHORIZED` revalidation (RC-370); `COMPLETED` ≠
`SIGNED_PASS`, "`COMPLETED` shall not clear a gate" (RC-371); `RunoutAggregationResult`
summary + hard blocks (RC-372); distance boundary/geometry validation (RC-373);
append-only evidence — annotations are new linked records (RC-374); regen residual
conditioned by operating state + `ZERO_REGEN_REQUEST` command state (RC-375);
C3A-008 separate E-stop outcomes (RC-376); C3C-007 measurement uncertainty +
channel health (RC-377); deterministic steering-state precedence (RC-378);
steering fault recovery rules (RC-379); per-fault `FaultExecutionAuthorization_ID`
(RC-380); paired-fault result + lifecycle fields (RC-381); explicit no-claim rule
(RC-382). Owner items 1 & 5 were already clean (RC-340/351, RC-355). Status
becomes `FORMAL_BASELINE_CANDIDATE / REVISION_05_APPLIED / … / NO_CLAIM_RULE_DEFINED`;
post-edit label
`GATE_05M_C3_REVISION_05_READY_FOR_CONTROLLED_MULTIDISCIPLINARY_BASELINE_REVIEW`.
**Revision 06 (review_70, RC-383..397):** complete overlap enforcement + full
`PHYSICAL_MOVEMENT_BLOCKED` conditions (RC-383); `allowed_steering_band` bounded
min/max record + angle frame (RC-384); `unit` controlled enum + canonical-SI
comparison (RC-385); `AUTHORIZED → ACTIVE` activation preconditions + single-ACTIVE
(RC-386); `COMPLETED` moved to execution status, three enums separated (RC-387);
`EXPIRED` authorization state (RC-388); `ProcedureApproval_ID` signed record
(RC-389); C3A-008 E-stop raw-trace timestamps (RC-390); `IndependentSensorHealthResult`
schema + invalid-channel → UNKNOWN (RC-391); deterministic three-axis steering
resolution (RC-392); per-state steering recovery model (RC-393);
`FaultExecutionAuthorization_ID` lifecycle fields (RC-394); paired faults keyed by
exact fault IDs (RC-395); database foreign-key enforcement (RC-396); scope-limitation
no-reuse clause (RC-397). Owner items 1 & 3 targeted the Hunter's OCR/typographical
text only (already clean/canonical). Status becomes `FORMAL_BASELINE_CANDIDATE /
CORE_GOVERNANCE_ARCHITECTURE_MATURE / REVISION_06_APPLIED / … /
SCOPE_LIMITATION_NO_REUSE_DEFINED`; post-edit label
`GATE_05M_C3_REVISION_06_READY_FOR_CONTROLLED_SPECIFICATION_FREEZE`. The owner's
downstream `DATABASE_SCHEMA_IMPLEMENTATION → RULE_ENGINE_TESTS → HIL_VALIDATION` is
M10/production work NOT performed during Rev 07 ingestion.
**Revision 07 (review_71, RC-398..411):** the owner regressed the status to
`NOT_READY_FOR_SCHEMA_FREEZE` over schema-normalization + status-model defects, then
14 corrections re-reached freeze readiness — additional test-distance bounds
(RC-398); status-dependent validation (RC-399); arrays → junction tables (RC-400);
derived L_min membership + frozen snapshot (RC-401); `authority_status` enum +
approver reference (RC-402); complete independent-sensor failure response (RC-403);
E-stop per-outcome result decomposition (RC-404); paired-fault component FK →
`VehicleComponentInstance` not `DistanceComponent` (RC-405); one-to-many
test-attempt model (RC-406); test-result attempt identity + applicability (RC-407);
explicit allowed-transition table + no `ACTIVE→COMPLETED` edge (RC-408);
cross-record configuration equality (RC-409); append-only INSERT-only enforcement
(RC-410); exact-binding scope statement (RC-411). Owner items 1/2/5/6/10/11 targeted
the Hunter's OCR-corrupted copy or restated already-applied rules. RC-400/406/407/409/410
+ the downstream `DATABASE MIGRATION → RULE ENGINE IMPLEMENTATION → AUTOMATED
CONSTRAINT TESTING → SIL/HIL EVIDENCE` are relational-schema doctrine only — NOT
built as M10/production code during ingestion. Status becomes
`FORMAL_BASELINE_CANDIDATE / SAFETY_ARCHITECTURE_MATURE / REVISION_07_APPLIED /
RELATIONAL_SCHEMA_DOCTRINE_DEFINED / … / EXACT_BINDING_SCOPE_DEFINED`; post-edit
label `GATE_05M_C3_REVISION_07_READY_FOR_CONTROLLED_SPECIFICATION_FREEZE`.
**Revision 08 (review_72, RC-412..425):** the owner designated Revision 07
`CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE / DATABASE_IMPLEMENTATION_NOT_YET_COMPLETE`,
then 14 corrections completed the schema — added TestCell constraints +
authority-class eligibility (RC-412); transition table is source of truth (RC-413);
expanded SUSPENDED→AUTHORIZED revalidation set + artifact requirement (RC-414);
`TestExecution` schema (RC-415); TestResult cardinality corrected (RC-416);
junction-table composite keys (RC-417); `allowed_regen_state` enum (RC-418);
`FaultDefinition` registry (RC-419); `VehicleComponentInstance` config linkage
(RC-420); cross-record vehicle-identity equality (RC-421); append-only enforcement
mechanics (RC-422); hash-chain specification (RC-423); automatic expiry behaviour
(RC-424); configuration-change transaction rule (RC-425). Owner items 1/2/4/7/8/9
targeted the Hunter's OCR-corrupted copy or restated already-applied rules.
RC-415/416/417/419/420/421/422/423/425 + the owner's downstream SQL schema →
migrations → triggers → rule-engine → negative tests → SIL → HIL → signed evidence
are relational-schema doctrine only — NOT built as M10/production code during
ingestion. Status becomes `FORMAL_BASELINE_CANDIDATE / SAFETY_ARCHITECTURE_MATURE /
REVISION_08_APPLIED / CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE / … /
CONFIGURATION_CHANGE_TRANSACTION_DEFINED`; post-edit label
`GATE_05M_C3_REVISION_08_CONTROLLED_SPECIFICATION_FREEZE_CANDIDATE`.
**NEXT = 05M-C3A execution + Envelope Cell 1 authorization (signed
`TestCellAuthorization_ID`).** The Hunter's "15 km/h" is an
`INITIAL_TARGET_PROFILE` pending supplier + engineering approval
(RC-267/291/293/300 — no auto-unlock).

Enforce throughout — engineer-gated, live-HV, **closed controlled area only, no
public road, no customer operation, no normal-driving authority**; the Numeric
Threshold Authority Rule (RC-267) applies — no speed / torque / distance / fault
threshold is final gate logic until supplier docs + engineering review +
calibrated measurement method + raw proof + signed approval upgrade it; the
Ground Movement Precondition (RC-285) + predictable-traction surface (RC-283) +
spotters + remote E-stop hold; wheel-speed stays read-only (RC-282); CAN_1
listen-only (RC-172/230); the inverter owns its gating, the BMS/PDU owns
contactors/pre-charge, the hardwired loop + service brakes own the stopping
path, the VCU requests/monitors + enforces the clamp (RC-247/265/205/227;
BQ-27); no manual restraint of rotating parts (RC-279); no automatic retry after
an E-stop (RC-262); never "certified safe" / no compliance claim (RC-224). Owner
scope defined when the owner sends that batch. Then (later, well beyond Gate 05)
the wider road/commissioning phases stay engineer-gated under a staged safety
plan + LOTO/PPE (RC-117); no public-road or customer operation until fully
proven.

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
