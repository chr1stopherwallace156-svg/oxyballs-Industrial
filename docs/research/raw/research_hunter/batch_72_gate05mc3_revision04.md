# Research Hunter — batch 72 (owner label "70:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents (note the payload contains visible
> transcription errors — "Umin", "Lworst_case_coastor.stop", "containment margi"
> — preserved 1:1). Owner framing and the owner verdict are archived separately
> at `../owner_reviews/review_68_batch_72_verdict.md`.
>
> Context: **Gate 05M-C3 Revision 04.** The Hunter APPLIED the 11 batch_71
> corrections (RC-340..350) — the `L_min` equation, the `distance_component_method`
> enum, the movement-authorization gate, the `TestCellAuthorization_ID`
> archetype, `INVALIDATED_FOR_CURRENT_CONFIGURATION`, the ±2 Nm residual as an
> "Initial Residual Candidate", the split C3A-006 + post-run correlation,
> supplier-defined Neutral, C3C-007 ownership matrix + comms-loss cross-validation,
> the steering freshness/frame-counter STALE rule, the `FAULT_EXECUTION_DOMAIN`
> categories with per-fault domain tags, and the paired-fault prerequisites.
> C3A-009B is now cleanly `APPROVAL_REQUIRED / LOCKED / NOT_ELIGIBLE`. The owner's
> verdict ("Revision 04 is very strong … close to a controlled engineering
> baseline") adds 13 corrections before baseline lock (reconciled as RC-351..363;
> the equation-transcription cleanup is already clean in the deliverable).

---

## Owner framing (chat, label "70:75") — question told

The owner re-issued the batch_71 correction set (insert + govern the actual
`L_min` equation with the no-double-count rule / `distance_component_method`
enum / movement-authorization gate; remove the circular C3A→C3B dependency;
remove "immediate" from steering states; supplier-defined Neutral; C3C-007 fault
ownership + comms-loss ≠ shutdown; C3E fault-execution-domain classification;
paired/compound-fault prerequisites; preserve invalidated evidence; full
`TestCellAuthorization_ID` schema). Full framing text preserved in the owner
chat; the substantive content is reproduced in the RESEARCHER RESPONSE below and
in the review_68 verdict.

---

## RESEARCHER RESPONSE — Global Engineering Safety Amendments (Revision 04)

The following structural corrections are permanently injected into the Build Engine core validation logic, overriding all previous dynamic configurations for Gate 05M-C3.

1. Quantified Track Length Formulations (L_min)
The absolute minimum physical track length (L_min) required to authorize a test run must be explicitly evaluated for each RunoutCalculations_ID before track movement is enabled.
[RAW, 1:1 — transcription errors preserved] "Umin =Lacceleration + Lstabilization + Lbraking_target + Lworst_case_coastor.stop + Lresponse allowance + Lmeasurement uncertainty + containment margi"
To protect the sequence from geometric compounding errors, the Build Engine must isolate overlapping physical distances. If a downstream element (e.g., L_worst_case_coast_or_stop) already incorporates driver and control response latencies, the core engine must clamp L_response_allowance to zero for that component to prevent double-counting physical track distance.
Each individual distance parameter within the calculation must map to an explicit tracking field:
distance_component_method: MEASURED / CALCULATED / SUPPLIER_DEFINED / ENGINEERING_APPROVED / INITIAL_TARGET_PROFILE
Runout Authorization Constraint: No RunoutCalculations_ID may authorize track movement if any required distance component is flagged as MISSING_SOURCE, UNVERIFIED, or INITIAL_TARGET_PROFILE_ONLY.

2. Test Cell Authorization & Configuration Records
Progress through individual subgate cells requires an explicit, structured tracking schema:
TestCellAuthorization_ID Archetype:
- Identification: [subgate_id, cell_number, TestCellAuthorization_ID]
- Hard Boundaries: [maximum_speed, maximum_positive_torque, maximum_negative_torque, maximum_torque_rate, maximum_jerk]
- Track & Operational Constraints: [maximum_test_distance, allowed_steering_band, allowed_regen_state, allowed_fault_set]
- Dependent Pre-Execution Locks: [RunoutCalculations_ID, ConfigurationPacket_ID, previous_cell_signed_result]
- Environmental Window: [thermal_state_requirement, surface/environmental_window]
- Governance: [authorization_expiry, required_approvers, status]
Status in {DRAFT, APPROVAL_REQUIRED, AUTHORIZED, ACTIVE, SUSPENDED, COMPLETED, REVOKED, SUPERSEDED}
A signed test result applies exclusively to the archived ConfigurationPacket_ID. If any parameter changes, the system flags the previous status as INVALIDATED_FOR_CURRENT_CONFIGURATION.
Immutable Evidence Preservation Rule: Under no circumstances shall historical test data or trace logs be deleted or cleared from the database. The life cycle for configuration deviations must follow a permanent, unalterable ledger: [LEDGER NOT SHOWN — incomplete in payload]

3. Regenerative Command Baseline Residuals
All references to a regenerative braking disabled state specify a software command structure outputting a zero-torque profile.
- Initial Residual Candidate: A tolerance band of +/-2 Nm is utilized strictly for initial model grading to absorb real-world bridge-switching noise and reactive field-weakening states without triggering a false script abort.
- Authority Baseline: The operational boundaries for regeneration must be dynamically bounded by active BMS charge-power/current permissions, pack voltage ceilings, cell-voltage limits, temperature states, contactor conditions, and supplier-defined operating limits, rather than a generic State of Charge (SOC) percentage.

Gate 05M-C3 — Closed-Area Low-Speed Movement Sequence
Subgate 05M-C3A — Straight-Line Low-Speed Tracking (all rows PAS=APPROVED_FOR_CONTROLLED_EXECUTION / ES=PENDING_EXECUTION / RSS=NOT_ELIGIBLE except C3A-009B = APPROVAL_REQUIRED / LOCKED / NOT_ELIGIBLE):
- C3A-001 Pre-Run Controls & Route — verify track clearance against the active RunoutCalculations_ID; clear linear runway meeting or exceeding calculated L_min. Test Lead.
- C3A-002 Straight-Line Forward — forward path up to the active TestCellAuthorization limit, steering centred. Chassis Dynamics Lead.
- C3A-003 Straight-Line Reverse — reverse path up to the active TestCellAuthorization limit. Test Lead.
- C3A-004 Speed Ceiling Enforcement — request exceeding the authorized ceiling from below; prove first via HIL/SIL / lifted-wheel/dyno / lowered thresholds; attenuation begins before physical speed crosses the limit. Systems Safety Lead.
- C3A-005 Torque Ramp & Accel — step pedal 0% to the active cell threshold; commanded torque within the approved time-domain command envelope (torque-rate + jerk); track [T_command, dT/dt, d²T/dt², reported_torque, phase_current, longitudinal_accel, jerk]. Systems Engineer.
- C3A-006 Brake Override (Straight) — firmly apply the service brake; verify VCU-side BOS priority logic + physical master-cylinder tracking pressure. C3A BOS Acceptance: traction command removed within response window; torque feedback/phase current decay within envelope; driver maintains braking control; no propulsion opposition. Controls Director.
- C3A-007 Neutral Interruption — shift PRND -> Neutral; propulsion torque remains within the supplier-defined Neutral zero-propulsion envelope. Blocked: active propulsion request asserted; torque-producing current exceeds Neutral envelope; unintended vehicle acceleration. Test Lead.
- C3A-008 E-Stop / Torque Removal — actuate the remote/hardwired E-stop; hardwired loop forces the supplier-defined emergency torque-inhibit + isolation response. Safety Director.
- C3A-009A Path-Deviation Observation — external instrumentation logs lateral offset; survey/camera/independent positioning act as evidence logs; provides human abort indication. Blocked: open/closed-loop automated correction using unvalidated data. Systems Safety Lead.
- C3A-009B Path-Deviation Torque-Inhibit Integration — STRICTLY BLOCKED; closed-loop VCU torque-inhibit authority driven by external tracking is unapproved; locked pending formal approval of the external interface/latency/failure-modes. Controls Director. PAS=APPROVAL_REQUIRED / ES=LOCKED / RSS=NOT_ELIGIBLE.
- C3A-010 Repeated-Run Consistency — 5 consecutive straight-line accel/decel sequences. Calibration Engineer.
C3A / C3B Post-Run Correlation Review: once 05M-C3B achieves SIGNED_PASS, execute a post-run regression analysis comparing the archived C3A-006 brake-override trace against the newly baseline-validated C3B foundation-brake stopping envelope.

Subgate 05M-C3B — Coast-Down and Foundation Brakes. Regenerative braking remains in a commanded zero-torque state (0 Nm) throughout.
- C3B-004 Brake Override with Minimal Authorized Propulsion Request — lowest approved request -> service brake -> BOS removes torque within the approved response window -> after removal, independently measure foundation-brake stopping. Note: a simulated BOS-latency fault is evaluated in HIL / another bounded static environment before any physical moving-vehicle tests; brakes must not fight sustained motor torque on-track.
- C3B-006 Brake Temperature Observation — calibrated contact thermocouples / approved embedded sensors primary; IR supplemental only.

Subgate 05M-C3C — Restricted Regeneration. Track: requested regen torque, actual regen torque, hydraulic brake pressure, vehicle deceleration, deceleration jerk, pedal position, wheel-speed disagreement, active BMS charge-current limit.
Brake Blending Lanes: Lane 1 (Independent Regen Coexistence Observation) — observe only; transition within the approved continuity/pedal/pressure/jerk envelope. Lane 2 (Coordinated Brake Blending) — STRICTLY BLOCKED until the pedal model, hydraulic pressure tracking model, deceleration target, failure modes, and control ownership are formally engineered + approved.
- C3C-005 Regen Inhibit during BMS Restriction — use an engineering-supported test mode / approved signal-substitution fixture / HIL interface / bounded conversion-side simulation; VCU pulls back regen within the approved response window; arbitrary/unauthorized internal-bus message injection strictly banned.
- C3C-007 Regen Fault Transition & Safety Domain Boundaries — force a simulated inverter communication fault during active regen. Independent Loss vs Inverter Shutdown: if network comms disappear, the VCU cannot assume the physical state of the power stage; it must cross-validate phase-current sensors and DC-bus voltage behaviours to establish empirical torque metrics before altering system state. Ownership Matrix: Inverter reports comms/fault state over remaining channels where hardware supports; VCU explicitly removes the active regen request and records the NVM operational fault latch; Build Engine stores the complete trace event, configuration hashes, and engineering clearance logs. Driver & Vehicle Response: regen request removed; no lingering torque-producing/braking current outside the approved decay envelope; driver warning asserts; full foundation-brake authority remains available; driver applies the mechanical service brake manually per the test plan; the fault latches and completely blocks automatic regeneration restoration until supplier-defined recovery conditions + approved service-clear processes are satisfied.

Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map. Tracking model integrates: steering-wheel angle, steering ratio, measured/derived road-wheel angle, wheelbase, front/rear track width, tire rolling radius, axle ratio, differential type, expected inner/outer wheel-speed ratio, vehicle yaw rate, body/upfit load distributions.
Steering Signal State Matrix & Safety Windows:
- VALID: operates normally within the approved active test cell boundaries.
- DEGRADED: derating occurs within the approved degraded-state response window; inhibits cell expansion.
- IMPLAUSIBLE: torque-inhibit request occurs within the approved steering-fault response window; NVM fault latches.
- UNAVAILABLE: locks active tracking parameters; blocks all steering-dependent envelope expansion.
- STALE: determined strictly by message timestamp freshness and frame counters; if signal age exceeds the approved millisecond timeout window it is classified invalid; the VCU drops propulsion authority within the safety response window to prevent frozen/outdated steering metrics from authorizing torque.

Subgate 05M-C3E — Closed-Area Fault and Abort Sequences. A fault being listed within this subgate escalation matrix does not automatically authorize its physical injection during vehicle movement. Every fault injection vector must map to a strict execution boundary constraint.
FAULT_EXECUTION_DOMAIN Categories: SIL_ONLY / HIL_ONLY / STATIC_VEHICLE_ONLY / LIFTED_WHEEL_ONLY / LOWEST_MOVING_CELL_ALLOWED / HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS.
C3E Fault Escalation Matrix (Level 1 single fault, per-fault domain tags):
- APPS plausibility fault [HIL -> STATIC_VEHICLE_ONLY -> LOWEST_MOVING_CELL_ALLOWED]
- Steering signal invalid/stale [HIL -> STATIC_VEHICLE_ONLY -> LOWEST_MOVING_CELL_ALLOWED]
- Wheel-speed disagreement injection [HIL -> LOWEST_MOVING_CELL_ALLOWED]
- Inverter heartbeat communication loss [HIL -> LOWEST_MOVING_CELL_ALLOWED]
- BMS charge-permission removal [HIL -> LOWEST_MOVING_CELL_ALLOWED]
- Brake-assist-not-ready [HIL -> STATIC_VEHICLE_ONLY; moving allowed only via approved safety method]
- Steering-assist-not-ready [HIL -> STATIC_VEHICLE_ONLY; DO NOT remove assist while moving]
- Auxiliary-voltage low [HIL -> STATIC_VEHICLE_ONLY -> LOWEST_MOVING_CELL_ALLOWED via bounded supply]
- Test-boundary alert [LOWEST_MOVING_CELL_ALLOWED]
- E-stop activation [STATIC_VEHICLE_ONLY -> LOWEST_MOVING_CELL_ALLOWED]
- Level 2 Repeated Single Fault Validation [Cell-Based Escalation per Level 1 Clearances]
Multi-Fault Integration Prerequisites (Levels 3 & 4): progression requires an independent PairedFaultAuthorization_ID linked to a formal HazardAnalysis_ID mapping the precise fault-injection order + timing offsets (low-voltage then comms-loss logged/evaluated separately from comms-loss then low-voltage), common-cause failure assessments, expected response sequences, primary driver abort methods, independent containment boundaries, and active runout/thermal validation checks linked to the configuration hash.
