# Research Hunter — batch 70 (owner label "68:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_66_batch_70_verdict.md`.
>
> Context: **Gate 05M-C3 Revision 02.** The Hunter APPLIED the 14 batch_68
> corrections (RC-313..326) — RunoutCalculations_ID artifact, Test Configuration
> Lock Rule, Telemetry Clock & Sync Mandate, Stepped Operating-Envelope
> Escalation, C3A-009A/009B split, revised governor test (C3A-004), rewritten
> C3B-004 (brakes never fight sustained torque), contact-thermocouples-over-IR
> (C3B-006), the C3C two-lane ABS/ESC rule + response-window regen, brake-blend
> continuity/jerk (C3C-003), road-wheel geometry (C3D), cell-based C3E fault
> escalation. The owner's verdict ("very strong and materially safer") adds 13
> further corrections before baseline lock (reconciled as RC-327..339).

---

## Owner framing (chat, label "68:75") — QUESTION TOLD

The owner re-issued the batch_68 correction set (the RunoutCalculation_ID
artifact field list; cell-by-cell envelope escalation with a separate
`TestCellAuthorization` per cell; the revised C3A-004 governor test proven first
via HIL/SIL/lifted-wheel/dyno/lowered ceiling; the C3A-009 observation vs
torque-inhibit split; the C3B-004 rewrite so brakes never fight sustained motor
torque; contact thermocouples over IR; the C3C ABS/ESC two-lane rule; removal of
"instant/immediate" regen wording; brake-blend continuity/jerk not "linear";
road-wheel kinematic inputs; cell-based C3E fault escalation; the Test
Configuration Lock Rule; and the telemetry clock/synchronization proof). Full
framing text preserved in the owner chat; the substantive content is reproduced
in the RESEARCH RESPOND below and in the review_66 verdict.

---

## RESEARCH RESPOND — Global Engineering Safety Amendments (Revision 02)

The following revisions are permanently injected into the core Build Engine, overriding all previous dynamic envelope guidelines for Gate 05M-C3.

1. Formally Quantified Runout Calculations & Evidence Record
The fixed 50-meter runout fallback is deprecated. All test track operations must compile and link a structured RunoutCalculations_ID artifact prior to any track movement. This artifact must mathematically map the following parameters:
RunoutCalculations_ID = { vehicle_test_mass (kg), authorized_speed (m/s), authorized_torque/ramp (Nm, Nm/s), coast_distance (m), foundation-brake_distance (m), response_allowance (s), surface/grade_condition, measurement_uncertainty (m), safety_margin (m), approved_physical_containment_plan }

2. Test Configuration Lock Rule
Before any dynamic test run within Gate 05M-C3 is executed, the test engineer must archive and seal a non-volatile configuration record containing:
Firmware & Software Hashes: VCU firmware hash, inverter firmware/version, BMS/PDU firmware/version, calibration file hash, and active DBC/network mapping version hash.
Physical State Record: Vehicle mass and axle-load distribution record, active test-cell limits, tire size/pressure/condition, and ambient/track surface conditions.
Instrumentation Integrity: Instrumentation hardware IDs and active calibration status certificates.

3. Telemetry Clock & Synchronization Mandate
All metrics captured within the Telemetry Synchronicity Packet must share an approved common clock source or a documented post-processing time-alignment method to prevent causal ordering inversion (e.g., ensuring brake pedal activation, torque removal, phase-current decay, and longitudinal deceleration are sequenced accurately). The data pipeline must explicitly prove:
Signal-specific sampling rates and master timestamp sources.
Maximum synchronization error margins and active dropped-frame detection metrics.
Sensor latency compensation models and automated start/stop event markers.

Gate 05M-C3 — Closed-Area Low-Speed Movement Sequence
Stepped Operating-Envelope Escalation Rule
Subgates 05M-C3A through 05M-C3E shall not execute at the maximum provisional cell parameters initially. Testing must follow a strict, stepped cell authorization structure:
- Envelope Cell 1: Minimal authorized speed and torque constraints.
- Envelope Cell 2: Expanded straight-line cell parameters.
- Envelope Cell 3: Maximum approved subgate boundary parameters.
Escalation Constraint: Passing an individual cell does not automatically unlock or authorize downstream cells. Progression to an expanded performance boundary requires an independent TestCellAuthorization record signed off by the required engineering disciplines.

Subgate 05M-C3A — Straight-Line Low-Speed Tracking
Legend: PAS (Procedure Approval Status) | ES (Execution Status) | RSS (Result Signoff Status). All rows: PAS=APPROVED_FOR_CONTROLLED_EXECUTION, ES=PENDING_EXECUTION, RSS=NOT_ELIGIBLE.
- C3A-001 Pre-Run Controls & Route — Verify track clearance boundaries against the active RunoutCalculations_ID artifact; pre-flight VCU diagnostic sweep. Target: clear linear runway meeting or exceeding calculated L_min limits. Safe: baseline systems clear; track clear. Blocked: spotters in path / inadequate runout. Test Lead.
- C3A-002 Straight-Line Forward — Command a linear forward path up to the active TestCellAuthorization limit, steering centred; track drift via external camera/survey markers vs VCU coordinates. Chassis Dynamics Lead.
- C3A-003 Straight-Line Reverse — Command a linear reverse path up to the active TestCellAuthorization limit, steering centred; verify reverse-direction register + tracking. Test Lead.
- C3A-004 Speed Ceiling Enforcement — Issue a commanded-speed/torque request exceeding the currently authorized software ceiling while approaching the boundary from below. Prove first via HIL/SIL, lifted-wheel/dynamometer, or lowered thresholds prior to track confirmation. Safe: VCU torque attenuation begins before physical speed crosses the authorized limit. Blocked: velocity overshoot past the calibrated governor boundary. Systems Safety Lead.
- C3A-005 Torque Ramp & Accel — Step pedal rapidly from 0% to the active cell threshold limit; evaluate the command path and acceleration data. Target: check command slope against the approved limit envelope; map against physical acceleration. Safe: commands rise linearly; real-world acceleration corresponds to the mass model. Blocked: sudden step-function torque commands bypassing filters. Systems Engineer.
- C3A-006 Brake Override (Straight) — While maintaining a forward tracking command, firmly apply the service brake. Target: VCU BOS priority logic. Safe: traction torque requests clear within the approved response window; vehicle stops. Blocked: inverter commanding drive current against active brakes. Controls Director.
- C3A-007 Neutral Interruption — At straight-line forward crawl, shift PRND → Neutral. Safe: torque-producing current drops within the window; propulsion torque → zero. Blocked: torque-producing current / active drive commands persisting in Neutral. Test Lead.
- C3A-008 E-Stop / Torque Removal — At steady forward speed, actuate the remote/hardwired E-stop. Safe: hardwired loop forces the supplier-defined emergency torque-inhibit + isolation response. Blocked: delayed torque removal / uncoordinated loop response. Safety Director.
- C3A-009A Path-Deviation Observation — Straight-line runs while external instrumentation logs lateral offset tracking alignment; survey marks / camera / independent positioning act as evidence logs. Safe: external tracking matches VCU path models within acceptable tracking parameters. Blocked: relying on unvalidated external tracking data for closed-loop VCU control. Systems Safety Lead. (PAS=APPROVED_FOR_CONTROLLED_EXECUTION, ES=PENDING_EXECUTION, RSS=NOT_ELIGIBLE)
- C3A-009B Path-Deviation Torque-Inhibit Integration — Introduce direct external tracking inputs into the VCU safety bus only after latency, integrity, and failures are approved; verify automated shutdown loop when external positioning logs out-of-bounds metrics. Safe: VCU drops torque requests to zero on a path error outside tolerances. Blocked: axle driven through an uncoordinated or unmapped path deviation. Systems Safety Lead. (PAS=APPROVED_FOR_CONTROLLED_EXECUTION, ES=PENDING_EXECUTION, RSS=NOT_ELIGIBLE)
- C3A-010 Repeated-Run Consistency — 5 consecutive straight-line accel/decel sequences; evaluate variability across phase current + torque tracking logs. Calibration Engineer.

Subgate 05M-C3B — Coast-Down and Foundation Brakes
Regenerative braking remains disabled (0 Nm) throughout this entire subgate.
- C3B-001 Zero-Torque Coast-Down — accelerate to the active cell velocity limit, transition to Neutral or zero-torque request, log the natural deceleration curve to validate the drag model.
- C3B-002 Foundation-Brake Stop — straight-line stops from the cell velocity limit using only mechanical friction brakes; measure stopping distances + deceleration tracking.
- C3B-003 Brake-Assist Stability under Repeated Stops — consecutive braking cycles confirm boosters maintain stable line pressures without low-voltage bus brownouts.
- C3B-004 Brake Override with Minimal Authorized Propulsion Request — (1) apply the lowest approved propulsion request for the current active test cell; (2) apply the service brake; (3) verify BOS removes the torque command within the approved response window; (4) after command removal is verified, independently measure foundation-brake stopping distances. Note: a simulated BOS latency fault must be comprehensively evaluated in HIL or another bounded, static test environment prior to any physical moving-vehicle tests. Brakes must not be forced to fight sustained motor torque during on-track validation.
- C3B-005 Stopping-Distance Repeatability — chart consistency across multiple foundation-brake applications to bound pad burnish + tire-to-surface grip consistency.
- C3B-006 Brake Temperature Observation — log thermal conditions using calibrated contact thermocouples or approved embedded sensors as the primary instrumentation source, utilizing infrared imaging exclusively as supplemental evidence.

Subgate 05M-C3C — Restricted Regeneration
Only after 05M-C3B SIGNED_PASS. Regeneration Dominance Rule: regen is supplemental only; foundation brakes remain the primary validated stopping authority; no regen strategy or blend may reduce/delay/interfere with required mechanical-brake clamping authority. During all blending evaluations the data acquisition architecture must independently track: requested regen torque, actual regen torque, hydraulic brake pressure, vehicle deceleration, deceleration jerk, pedal position, wheel-speed disagreement metrics, and the active BMS charge-current limit.
- C3C-001 Minimum Regenerative Request — minimal step-down negative torque (<=5 Nm) verifies the inverter handles phase-current inversion smoothly without torque ripples.
- C3C-002 Pedal-Lift Regenerative Response — map the negative-torque deceleration envelope during a manual pedal tip-out; verify negative torque commands respect the tracking cap within the artifact-defined or engineering-approved regen-inhibit response window.
- C3C-003 Brake-Blend Boundary Observation — log the crossover region where the mechanical master-cylinder pressure overlays with the inverter's electrical braking torque; the transition must remain within the approved deceleration continuity, pedal-response, pressure-response, and jerk envelope.
- C3C-004 Regen Inhibit at High State of Charge (SOC) — verify the VCU and BMS actively attenuate or suppress regen requests when the HV pack resides at its upper operating capacity boundary.
- C3C-005 Regen Inhibit during BMS Restriction — manually simulate a pack thermal or voltage cell limit over the internal bus; confirm the VCU pulls back regeneration requests within the artifact-defined or engineering-approved regen-inhibit response window.
- C3C-006 Regen Removal during ABS/ESC-Related Conditions — Lane A (Factory Status Path): blocked unless Ford-specific technical documentation and formal interface approvals are engineering-established. Lane B (Conversion-Side Independent Wheel-Slip Plausibility): use approved independent sensors or bounded simulation to inhibit regeneration requests within the artifact-defined or engineering-approved response window.
- C3C-007 Regen Fault Transition to Foundation Braking — force a simulated inverter communication fault during active regeneration; the vehicle must transition cleanly to pure coasting and mechanical braking with no lingering negative torque or uncommanded drag.

Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map
Steering input is an observation and derating envelope input only; it does not act as active stability control; factory ABS/ESC remains fully authoritative over wheel slip. To map inner/outer wheel-speed relationships accurately, the tracking model must integrate: steering-wheel angle, steering ratio, measured or derived road-wheel angle, wheelbase, front/rear track width, tire rolling radius, axle ratio, differential type, expected inner/outer wheel-speed ratio, vehicle yaw rate (if independently measured), and body/upfit load distributions affecting tire deflection.
Cells (Speed Band | Steering-Angle Band | Steering-Angle-Rate Band | Max Traction Request | Max Traction Ramp Rate | Max Regen Request | Wheel-Speed Disagreement Threshold | Path-Deviation Threshold | Abort Response | Authority Status):
- Initial Low-Speed | Near-Center | <=Calibrated Limit | Restricted | Limited | Disabled initially (0 Nm) | <=5% Parity Window | <=Calibrated Tolerance | Zero Propulsion Request | INITIAL_TARGET_PROFILE
- Initial Low-Speed | Moderate Turn | <=Calibrated Limit | Further Derated | Limited | Disabled (0 Nm) | Geometric Open-Diff Delta | <=Calibrated Tolerance | Zero Propulsion Request | INITIAL_TARGET_PROFILE
- Initial Low-Speed | High Steering Angle | All Rates | Minimum / Blocked Pending Proof | Hard Clamped | Disabled (0 Nm) | Geometric Open-Diff Delta | Minimum Window | Immediate Torque Cutout | BLOCKED_PENDING_TEST
- Any Band | Implausible Steering Signal | All Rates | Zero Propulsion Request | N/A | Zero Regen Request | N/A | N/A | HARD_BLOCK | HARD_BLOCK

Subgate 05M-C3E — Closed-Area Fault and Abort Sequences
Integrates the previous blocks under compound-fault conditions. Fault Escalation Rule: all fault sequences must originate at the lowest signed operating-envelope cell. No fault test may be repeated at a higher cell parameter until the lower cell has achieved a complete SIGNED_PASS status, fault containment has been physically proven, the track runout envelope remains valid, the thermal state is acceptable, and the test lead separately authorizes cell escalation in writing.
Testing must progress strictly through the following sequential fault-pairing hierarchy: Single Fault Evaluation -> Repeated Single Fault Validation -> Paired Fault Sequences -> Compound Fault Testing.
The system passes only if faults cleanly latch into non-volatile memory, traction torque is successfully removed via the designated abort hierarchy, and all automated retry attempts or unvalidated re-power routines are completely blocked pending engineering diagnostic clearance.
