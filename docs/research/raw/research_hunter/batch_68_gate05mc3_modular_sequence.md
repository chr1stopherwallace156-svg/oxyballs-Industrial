# Research Hunter — batch 68 (owner label "66:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_65_batch_68_verdict.md`.
>
> Context: this delivery introduces **Gate 05M-C3 — Closed-Area Low-Speed
> Movement**, split into the modular subgates C3A–C3E the owner recommended,
> and applies the batch_67 corrections (RC-307..312) at the global level. The
> owner's verdict calls it "a major improvement" and adds 14 corrections before
> baseline (reconciled as RC-313..326). Owner framing (re-issued review_64
> items + the C3 subgate recommendation + steering-as-observation-not-
> torque-vectoring + telemetry packet) is preserved in the review_65 file.

---

## RESEARCHER RESPOND

Global Engineering Safety Amendments
The following overarching governance policies are injected directly into the core Build Engine to enforce record integrity, strict numerical qualification, and architecture-agnostic safety boundaries.
1. Audit Trail & Record Integrity Architecture
Every verification entry must explicitly isolate procedural validity from live execution results. The table schema throughout all gates is structurally separated into the following four status vectors:
Required Approver: The specific discipline owner responsible for the engineering signoff.
Procedure Approval Status: APPROVAL_REQUIRED -> APPROVED_FOR_CONTROLLED_EXECUTION
Execution Status: NOT_EXECUTED -> PENDING_EXECUTION -> EXECUTED
Result Signoff Status: NOT_ELIGIBLE -> SIGNED_PASS | SIGNED_FAIL | NEEDS_REVIEW | INVALID_TEST
2. Numeric Threshold Authority Rule
All numeric thresholds, limits, and rates across all 05M gates are designated strictly as INITIAL_TARGET_PROFILE values. A threshold does not possess pass, fail, block, movement, or code-release authority until it is explicitly upgraded to ARTIFACT_DEFINED or ENGINEERING_APPROVED by linking it to the specific hardware/software configuration, verified calculation source, measurement tolerance/uncertainty profile, and an approved procedure revision.
3. Standardized Safety Phrasing Corrections
APPS Motion Authority: The unmeasurable phrase "completely valid" is removed. Zero-torque eligibility and motion-authority prerequisites instead require that: "All required brake-assist, steering-assist, auxiliary-voltage, and motion-authority prerequisites remain within their approved operating windows."
Inverter Dynamic Tracking (C2A-005B): "Measured inverter torque feedback and phase-current response must remain within the engineering-approved dynamic tracking envelope for the commanded dT_{command}/dt profile. Expected latency, filtering, current-loop bandwidth, and measurement delay must be included in the acceptance envelope."
Emergency Stop Boundary: To remain architecture-dependent and avoid universal conflicts with specific power distribution unit (PDU) or inverter shutdown sequencing: "The hardwired safety loop forces the supplier-defined emergency torque-inhibit and HV-isolation response. Where the approved architecture requires contactor coil-supply interruption, the hardwired loop must perform that function within the approved response window."
Neutral Logic Boundary: Zero-torque verification blocks propulsion output without universally banning bridge switching: Blocked states are restricted to "torque-producing current while Neutral is valid, active drive command remaining asserted, vehicle propulsion torque persisting, and inverter states inconsistent with supplier-defined Neutral behavior."
Static Brake-Hold (C2A-001): The reference to "full torque" is removed and replaced with "during the approved brake-hold test torque profile."
4. Rollback Test Abort Rule
Rollback Test Abort Rule: If at any point during incline validation the vehicle's rearward movement breaks the approved distance or speed threshold, the following automated and manual actions must immediately occur:
The test driver reapplies the mechanical service brake.
The independent physical restraint system captures vehicle movement if required.
The VCU actively removes all traction torque commands.
The test run is latched as FAIL / NEEDS_REVIEW inside the Build Engine.
No automatic second attempt or sequential retry is permitted by the control loop.

Gate 05M-C3 — Closed-Area Low-Speed Movement Sequence
The dynamic validation envelope is broken into modular subgates. Progression through this sequence is strictly linear; no downstream subgate may unlock until the preceding subgate has completed execution and achieved a SIGNED_PASS status across all ledger items.

Core Operating-Envelope Record Requirements
Every test run executed within any subgate of Gate 05M-C3 must continuously log a synchronous data array containing:
Telemetry Synchronicity Packet: [vehicle_speed, commanded_torque, reported_inverter_torque, phase_current, DC-bus_current, longitudinal_acceleration, steering_angle, steering_angle_rate, individual_wheel_speeds (4x), motor_speed, brake_state, APPS_channels (2x), 12V_aux_voltage, brake-assist_pressure/status, steering-assist_pressure/current/status, gear_state, fault_state, E-stop_state, test-area_boundary_position]
Note: Torque requests and longitudinal acceleration profiles must be assessed as separate but related quantities to account for vehicle mass and drivetrain ratio variances across platforms.

Subgate 05M-C3A — Straight-Line Low-Speed Tracking
This subgate restricts the platform to pure, non-turning, straight-line tracking on flat ground to isolate basic forward/reverse propulsion, velocity limits, and fundamental VCU command interrupts before any steering-angle envelope modifications or regeneration profiles are introduced. Independent tracking infrastructure (e.g., physical survey markers, external camera arrays, or calibrated ground-positioning networks) must be utilized to cross-verify path deviation alongside internal steering telemetry.
Global Constraints:
Max Velocity Boundary (V_max): Clamped in software at <=15 km/h (INITIAL_TARGET_PROFILE).
Active Acceleration Clamp (dT_command/dt): Throttled to <=40 Nm/sec (INITIAL_TARGET_PROFILE).
Maximum Traction Torque Request: Clamped at <=80 Nm (INITIAL_TARGET_PROFILE).
Legend: Procedure Approval Status (PAS) | Execution Status (ES) | Result Signoff Status (RSS). All rows: PAS=APPROVED_FOR_CONTROLLED_EXECUTION, ES=PENDING_EXECUTION, RSS=NOT_ELIGIBLE.
- C3A-001 Pre-Run Controls & Route — Verify track clearance boundaries, safety runout buffers, and perform pre-flight VCU diagnostic sweep. Target: Physical validation of clear linear runway >=50 m past braking target. Safe: all baseline vehicle systems report clear; track is clear. Blocked: execution with spotters in path or inadequate runout zone. Required Approver: Test Lead.
- C3A-002 Straight-Line Forward — Command a linear forward acceleration path up to 10 km/h with the steering wheel centered. Target: track physical path drift via external camera/survey markers vs VCU coordinates. Safe: vehicle maintains stable linear path; tracking is predictable. Blocked: abrupt lateral pulling or uncommanded yaw deviations. Required Approver: Chassis Dynamics Lead.
- C3A-003 Straight-Line Reverse — Command a linear reverse acceleration path up to 5 km/h with the steering wheel centered. Target: verify reverse direction register validation and directional tracking alignment. Safe: vehicle moves rearward predictably; velocity registers match command. Blocked: discrepancy between commanded and actual physical vector. Required Approver: Test Lead.
- C3A-004 Speed Ceiling Enforcement — Maintain full safe pedal input until the VCU velocity register approaches the 15 km/h governor. Target: monitor VCU torque reduction loop behavior at the threshold. Safe: VCU actively attenuates torque requests, capping speed at <=15 km/h. Blocked: velocity overshoot past the calibrated governor boundary. Required Approver: Systems Safety Lead.
- C3A-005 Torque Ramp & Accel — Step pedal rapidly from 0% to 40% travel. Evaluate the command path and acceleration data. Target: check command slope against the <=40 Nm/sec limit; map against physical acceleration. Safe: commands rise linearly; real-world acceleration corresponds to the mass model. Blocked: sudden step-function torque commands bypassing filters. Required Approver: Systems Engineer.
- C3A-006 Brake Override (Straight) — While maintaining a forward tracking command, firmly apply the service brake pedal. Target: VCU must process Brake Override System (BOS) priority logic. Safe: traction torque requests clear within the approved response window; vehicle stops. Blocked: inverter continuing to command drive current against active brakes. Required Approver: Controls Director.
- C3A-007 Neutral Interruption — While sustaining a straight-line forward crawl, manually transition the PRND selector to Neutral. Target: monitor inverter torque-producing current registers over internal loop. Safe: torque-producing current drops within the window; propulsion torque falls to zero. Blocked: torque-producing current or active drive commands persisting in Neutral. Required Approver: Test Lead.
- C3A-008 E-Stop / Torque Removal — While maintaining a steady forward speed, actuate the remote or hardwired E-stop mechanism. Target: check hardware loop propagation and active inverter current decay metrics. Safe: hardwired loop forces the supplier-defined emergency torque-inhibit and isolation response. Blocked: delayed torque removal or uncoordinated loop response. Required Approver: Safety Director.
- C3A-009 Path-Deviation Abort — Monitor independent survey marks/camera tracking against internal steering wheel angle signals. Target: deviations between physical path vector and steering alignment must flag. Safe: VCU drops torque requests to zero upon path error detection outside tolerances. Blocked: axle driven through an uncoordinated or unmapped path deviation. Required Approver: Systems Safety Lead.
- C3A-010 Repeated-Run Consistency — Perform 5 consecutive straight-line acceleration and deceleration sequences. Target: evaluate variability across phase current development and torque tracking logs. Safe: system performance metrics remain tightly grouped within approved boundaries. Blocked: drift in tracking latency, thermal accumulation, or erratic responses. Required Approver: Calibration Engineer.

Critical Abort and Stop Authority Hierarchy
To govern anomalies cleanly without causing secondary failures, the stop path execution duties are allocated across specific systems and operators. A path deviation or software fault must not automatically trigger high-voltage contactor opening unless the specific, approved emergency architecture dictates isolation for that fault class. Controlled torque removal and mechanical braking serve as the baseline mitigation path.
- Driver: Immediate manual service-brake application and mechanical steering control authority.
- VCU: Active software request removal, torque clamping, and non-volatile fault latching.
- Inverter: Immediate execution of supplier-defined safe torque-disabled or zero-torque response states.
- BMS / PDU: Execution of supplier-defined high-voltage isolation sequences where specifically required by architecture.
- Hardwired E-Stop: Direct, unmitigated enforcement of supplier-defined emergency torque-inhibit and safety isolation paths.
- Track Team: Enforcement of test-area boundaries, physical containment deployment, and recovery protocols.

Subgate 05M-C3B — Coast-Down and Foundation Brakes
Testing inside this subgate establishes the pure mechanical deceleration and natural aerodynamic/drivetrain drag profiles of the vehicle platform. Regenerative braking remains completely disabled (INITIAL_TARGET_PROFILE = 0 Nm) throughout this entire subgate.
- C3B-001 Zero-Torque Coast-Down: Accelerate to 15 km/h on the flat test strip, transition to Neutral or zero-torque request, and log the natural deceleration curve. Maps baseline rolling resistance and mechanical losses to validate the vehicle drag model.
- C3B-002 Foundation-Brake Stop: Execute a series of straight-line stops from 15 km/h using only the mechanical friction brakes. Measure physical stopping distances and verify deceleration rate tracking.
- C3B-003 Brake-Assist Stability under Repeated Stops: Perform consecutive mechanical braking cycles to confirm that auxiliary vacuum, hydraulic, or electronic brake boosters maintain stable line pressures and response times without inducing low-voltage bus brownouts.
- C3B-004 Brake Override with Propulsion Request: Apply a steady 40 Nm traction torque request, then step firmly on the service brake. Confirm that the mechanical friction pads override and stall the motor output smoothly even if the VCU software backup loop were to experience a simulated latency event.
- C3B-005 Stopping-Distance Repeatability: Document and chart consistency across multiple foundation brake applications to bound structural pad burnish factors and tire-to-surface grip consistency.
- C3B-006 Brake Temperature Observation: Log component thermal conditions via external infrared instrumentation following repeated stops to ensure the mechanical braking system remains within its optimal thermal operating window.

Subgate 05M-C3C — Restricted Regeneration
This subgate introduces low-level regenerative torque profiles only after subgate 05M-C3B has achieved a complete SIGNED_PASS clearance.
Regeneration Dominance Rule: Regenerative braking functions strictly as a supplemental deceleration system during this phase. The mechanical foundation brakes remain the primary, fully validated stopping authority. No regenerative strategy or blend routine may reduce, delay, or interfere with required mechanical-brake clamping authority.
- C3C-001 Minimum Regenerative Request: Apply a minimal step-down negative torque profile (<=5 Nm) to verify that the inverter handles phase current inversion transitions smoothly without torque ripples or chatter.
- C3C-002 Pedal-Lift Regenerative Response: Map the negative torque deceleration envelope during a manual accelerator pedal tip-out from 15 km/h. Verify that negative torque commands strictly respect the initial dynamic tracking cap (<=10 Nm).
- C3C-003 Brake-Blend Boundary Observation: Log the crossover region where the mechanical master cylinder pressure begins to overlay with the inverter's electrical braking torque to verify that transition states remain smooth and linear.
- C3C-004 Regen Inhibit at High State of Charge (SOC): Verify that the VCU and BMS actively attenuate or entirely suppress regenerative torque requests when the high-voltage pack resides at its upper operating capacity boundary.
- C3C-005 Regen Inhibit during BMS Restriction: Manually simulate a pack thermal or voltage cell limit over the internal bus. Confirm that the VCU pulls back regeneration requests instantly to protect the cell chemistry.
- C3C-006 Regen Removal during ABS/ESC-Related Conditions: Verify that any simulated wheel-slip trigger or factory traction-control flag immediately commands the inverter's electrical regeneration torque to zero, returning slip management entirely to the factory chassis brakes.
- C3C-007 Regen Fault Transition to Foundation Braking: Force a simulated inverter communication fault during active regeneration. The vehicle must transition cleanly to pure coasting and mechanical braking with no lingering negative torque or uncommanded drag.

Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map
Steering angle is utilized strictly as an observation and derating envelope input. This map defines a maximum permitted request boundary to prevent unvalidated torque-vectoring behaviors; it does not act as active stability control. The factory ABS/ESC infrastructure remains fully authoritative over wheel slip.
The operational boundaries are partitioned into distinct test cells. No numeric angles, speeds, or torque limits may be populated within these profiles until they are mathematically linked to track geometry, tire sizing, axle ratios, supplier boundaries, and receive formal engineering approval.
Cells (Speed Band | Steering-Angle Band | Steering-Angle-Rate Band | Max Traction Request | Max Traction Ramp Rate | Max Regen Request | Wheel-Speed Disagreement Threshold | Path-Deviation Threshold | Abort Response | Authority Status):
- Initial Low-Speed Band | Near-Center | <=Calibrated Limit | Restricted (<=40 Nm) | Limited (<=40 Nm/sec) | Disabled initially (0 Nm) | <=5% Parity Window | <=Calibrated Tolerance | Zero Propulsion Request | INITIAL_TARGET_PROFILE
- Initial Low-Speed Band | Moderate Turn | <=Calibrated Limit | Further Derated | Limited (<=20 Nm/sec) | Disabled (0 Nm) | Geometric Open-Diff Delta | <=Calibrated Tolerance | Zero Propulsion Request | INITIAL_TARGET_PROFILE
- Initial Low-Speed Band | High Steering Angle | All Rates | Minimum / Blocked Pending Proof | Hard Clamped | Disabled (0 Nm) | Geometric Open-Diff Delta | Minimum Window | Immediate Torque Cutout | BLOCKED_PENDING_TEST
- Any Band | Implausible Steering Signal | All Rates | Zero Propulsion Request | N/A | Zero Regen Request | N/A | N/A | HARD_BLOCK | HARD_BLOCK

Subgate 05M-C3E — Closed-Area Fault and Abort Sequences
This final subgate integrates the previous blocks to verify that the complete control loop behaves safely under compound fault conditions. Testing introduces simulated sensor tracking errors, low-voltage bus instability, and path boundary violations via simulation-controlled or supplier-supported methods while moving at 15 km/h.
The system passes only if faults cleanly latch into non-volatile memory, traction torque is successfully removed via the designated abort hierarchy, and all automated retry attempts or unvalidated re-power routines are completely blocked pending engineering diagnostic clear.
