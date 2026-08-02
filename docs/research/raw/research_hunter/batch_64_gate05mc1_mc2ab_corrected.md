# Research Hunter — batch 64 (owner label "62:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, numeric values, and the OSHA/NHTSA references
> are Hunter-supplied and UNVERIFIED against source documents. Owner framing
> and the owner verdict are archived separately at
> `../owner_reviews/review_61_batch_64_verdict.md`.
>
> Context: this delivery FINALLY applies the eight corrections that had been
> re-issued across batches 61/62/63 (the 05M-C1 "hand-lock one lifted wheel"
> removal, `dQ/dt`→`dT_command/dt`, absolute-0-Nm→zero-torque threshold,
> immediate-stop→response-window, immediate-revoke→response-window, hard-reset
> →diagnostic review + approved clear, rollback split → 05M-C2B, and the
> Proof/Authority/Build-Engine-Status evidence columns). The owner confirms
> the big safety fixes are correct and issues FIVE new pre-baseline cleanups.

---

## Owner framing (chat, label "62:75")

**QUESTION TOLD**

But these fixes are still required

1. Remove "hand-lock one lifted wheel"

This is still in 05M-C1:

Hand-lock one lifted wheel safely.

That must be deleted. Replace it with:

Use an approved mechanical wheel restraint, rated hub-locking fixture, or differential test fixture.

Manual hand restraint near rotating wheels, shafts, hubs, or driveline components is strictly forbidden.

If Torque Ramp-Rate Filter (dQ/dt) is what is back by research manual  and accurate keep it

Torque Ramp-Rate Filter (dQ/dt)

If this is better switch it

Torque Ramp-Rate Filter (dT_command/dt)

T = torque. Q usually means charge, heat, or quantity.

4. Fix E-stop row

This line is still wrong:

vehicle coasts safely to an immediate stop

A vehicle has inertia. The safety goal is not "instant stop." The safety goal is drive torque removed within the approved response window.

Use

Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command transitions to zero and phase current decays within the approved threshold. Vehicle coasts or is braked according to the test plan.

5. Fix neutral interrupt wording

You wrote:

VCU must immediately revoke...

Change to

VCU revokes inverter enable / torque command within the approved response window.

6. Fault latch after failed creep cannot clear by "hard reset"

This line is too weak:

blocks re-energization or creep retries until a hard reset occurs

Use

blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization.

A hard reset alone should never clear a motion-related fault.

7. Rollback should be split out

05M-C2-009 should not be part of the first flat-ground creep gate.

Use

05M-C2A — Flat-Ground Restricted Creep
05M-C2B — Controlled Incline / Rollback Hold Validation

Mark rollback as

PROVISIONAL — only after flat-ground restricted creep passes.

8. Add missing evidence columns

Your 05M-C2 table needs:

Proof Artifact
Authority Status
Build Engine Status

Right now it has the test logic, but not the evidence ledger structure.

1. Remove hand-lock wheel.
2. Change dQ/dt to dT_command/dt.
3. Replace absolute 0 Nm with zero-torque threshold.
4. Replace immediate stop with response-window language.
5. Replace hard reset with diagnostic review + approved clear.
6. Split rollback into 05M-C2B.
7. Add Proof Artifact / Authority Status / Build Engine Status columns.
8. Do not automatically unlock 15 km/h for 05M-C3.

---

## RESEARCHER RESPOND

Architectural Safety Amendments & Engineering Rules
The following structural corrections and explicit safety rules are incorporated into the Build Engine to govern the boundaries between lifted dynamic drivetrain testing, low-speed restricted ground-creep validation, and network interface integrity.
1. Real-Time Response Window Terminology Standard
To eliminate unsafe or unmeasurable non-technical abstractions such as "instant" or "immediate" from engineering documentation:
Response Window Mandate: All safety-critical control interventions—including Brake Override Systems (BOS), emergency stops, and fault-induced shutdowns—must have their performance evaluated against a quantitative, supplier-defined or engineering-approved response window.
2. Wheel Speed Sensor Network Ingress Limits
To prevent unauthorized or unvalidated control frames from disrupting production chassis stability systems:
Chassis Network Ingress Rule: Wheel speed data may be observed only through an authorized read-only path, passive network logging path, or independent external instrumentation. Integration or use of factory ABS/ESC data for active traction-control authority is strictly blocked until official Ford-authorized documentation is secured and an engineering review formally approves the interface.
3. Ground Rollout Surface and Environmental Safety Enclosure
To mitigate hazards associated with unexpected vehicle directional changes, low-friction tire spin, or loss of control:
First Ground Movement Boundary: The default test environment for first ground contact must not utilize a low-friction surface. Testing is restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote hardware E-stop available.
4. Mechanical Separation of Personnel and Rotating Elements
To prevent severe personal injury from entrapment during differential or hub validation:
Rotational Restraint Safety Rule: Manual hand restraint near rotating wheels, shafts, hubs, or driveline components is strictly forbidden. Any test calling for asymmetrical speed restraint or mechanical clamping must utilize an approved mechanical wheel restraint, rated hub-locking fixture, or differential test fixture.
5. Torque Differentiation Signal Nomenclature
To conform to standard automotive engineering calculus notations:
Signal Metric Calculus Standard: The derivative of traction torque commands over time must be explicitly designated as dT_{command}/dt. The letter identifier Q is reserved exclusively for thermal heat values or physical electrical charge capacities.
6. Permanent Safety Fault Latching Domain
To avoid unsafe field bypasses or unintended hazard clearings via low-voltage power interruptions:
Fault Latch Persistence Protocol: A motion-related or drivetrain-integration fault must never be cleared by a simple power cycle or hard reset. The state machine must maintain the active fault latch until a comprehensive diagnostic review is performed, the physical fault-source is corrected, an approved service tool clear is executed, and formal engineering/test-lead authorization is logged.

Gate 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness
This gate governs the initial physical integration of the traction motor with the vehicle's secondary mechanical elements (gearbox, half-shafts, hubs, and wheels) under a zero-ground-contact profile. The entire driven axle of the vehicle must be lifted and securely locked on heavy-duty jack stands or a chassis lift, ensuring that the vehicle wheels can spin freely with zero road friction and zero traction-propulsion authority.

Verification Matrix: Gate 05M-C1
- 05M-C1-001 Mechanical Driveline Backlash Mapping — Deliver alternating, low-amplitude (<=1%) forward/reverse torque steps to the lifted drivetrain. Record CAN position metrics and physical angular displacement at the wheel hub to chart mechanical play boundaries. The drivetrain transitions smoothly between gears without loud impact or excessive slop. Blocked: High-current spikes or harsh mechanical binding during torque direction shifts. Proof: CAN data log tracing torque command vs. resolver position transitions.
- 05M-C1-002 Elevated Wheel Speed Parity Audit — Spin the lifted assembly up to a steady calibration speed (100 RPM). Log all speed loops. Wheel speed metrics observed via approved read-only or external paths must align in direction and match motor velocity within <=5%. Blocked: Left/right wheel speed direction inversion; discrepancies exceeding the tracking tolerance. Proof: Unified CAN data chart plotting resolver velocity vs. wheel sensor signals.
- 05M-C1-003 Brake Override System (BOS) Validation — While maintaining a steady torque request (<=5% micro-clamp limit), tap the vehicle service brake pedal. VCU must clear traction torque commands within the approved brake-override response window. Inverter phase current decays within the approved threshold. Mechanical brakes slow or stop the lifted wheels without the inverter fighting the service brakes. Blocked: Inverter continues to drive phase currents or fight the service brakes outside the response window. Proof: High-speed log showing brake switch transition vs. phase current decay.
- 05M-C1-004 Micro-Scale Torque Clamp Enforcement — Apply full travel to the driver pedal position sensor. Monitor VCU torque output registers over CAN. VCU torque requests must clamp tightly at the defensive software limit threshold (<=5%). Blocked: Torque requests or active inverter scaling breaking past the 5% guardrail. Proof: Diagnostic snapshot file of VCU internal control parameters.
- 05M-C1-005 Lifted Asymmetry & Differential Scan — Use an approved mechanical wheel restraint, rated hub-locking fixture, or differential test fixture on one side. Inject a minimal torque pulse (<=2%). Opposite elevated wheel must rotate smoothly at differential speed. Torque tracking remains stable. Blocked: Mechanical lock-up of the differential gear matrix or abnormal phase current spikes. Proof: Engineering run data log sheet tracking individual hub speed metrics.

Gate 05M-C2A — Flat-Ground Restricted Creep
This gate governs the critical execution where the vehicle tires touch the ground for the first time under live traction power. Testing is strictly restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote E-stop available.
The focus of this gate is limited strictly to restricted creep torque profiling on level terrain—this is not a normal driving gate. It validates the fundamental control, shifting, safety overrides, and steering/braking assistance functions required to manage initial crawling mechanics safely.
Global Constraints:
APPS Dead-Band Layer: Strict 0% to 5% travel dead-band. Any signal noise or travel below 5% maps to the zero-torque threshold.
Torque Ramp-Rate Filter (dT_{command}/dt): Throttled to a maximum derivative cap of <=20 Nm/sec.
Absolute Creep Torque Clamp: Hard-clamped at a defensive boundary of <=30 Nm.
Network Passivity: CAN_1 (Factory Chassis Bus) must remain strictly passive (listen-only).

Verification Matrix: Gate 05M-C2A (columns: Test ID | Element | Procedure | Target | Expected Safe Output | Blocked States | Proof Artifact | Authority Status | Build Engine Status)
- 05M-C2A-001 Static Brake-Hold — Fully apply the mechanical service brakes, shift to Drive mode, and apply minor torque request (<=10 Nm). Track wheel speed sensor outputs and physical hub placement. Mechanical service brakes must completely hold the vehicle static against the torque request. Blocked: Any tire creep, vehicle rollout, or brake slippage. Proof: CAN log mapping brake pressure vs. wheel speed; physical encoder trace. Authority: Approved by Lead Controls Engineer. Build Engine: LOCKED / UNDER REVIEW.
- 05M-C2A-002 Forward Creep — Release the service brake pedal and allow the vehicle to transition into a tiny forward creep step (<=1 meter). Measure physical breakaway torque baseline (target: 15--25 Nm). Driveline overcomes static friction smoothly; vehicle crawls forward under absolute control. Blocked: Vehicle surging, hopping, or accelerating past crawl speeds. Proof: High-speed time series plot of breakaway torque metrics. Authority: Approved by Lead Mechanical Engineer. Build Engine: STAGED FOR LOG.
- 05M-C2A-003 Reverse Creep — Stop the vehicle, shift to Reverse, and execute a tiny reverse creep step (<=1 meter). Verify direction parameters and evaluate rearward breakaway torque consistency. Driveline transitions smoothly into reverse crawl; matching directional velocity is logged. Blocked: Erratic reverse acceleration or directional mismatch against command. Proof: Directional register state printout; velocity delta log. Authority: Approved by Test Lead. Build Engine: STAGED FOR LOG.
- 05M-C2A-004 Accelerator Map Clamp — In Drive mode, manually step the pedal position past 50% travel for a duration of <500 ms. Verify VCU internal command limits and active inverter current tracking via network log. Torque requests and scaling remain tightly clamped at the defensive <=30 Nm threshold. Blocked: Torque generation or current vectors breaking past the hard safety clamp. Proof: VCU parametric snapshot file over UDS. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-005 Current Ramp-Rate Limit — Step the pedal rapidly from 0% to 20% travel. Evaluate the current development slope. Inverter phase current development slope must reflect the linear <=20 Nm/sec constraint profile (dT_{command}/dt). Current rises slowly and predictably; no sudden current step-functions occur. Blocked: Sudden, unfiltered current spikes or un-attenuated torque steps. Proof: High-bandwidth oscilloscope current probe trace graph. Authority: Approved by Systems Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-006 Brake Override During Creep — While the vehicle is actively crawling in forward creep, firmly depress the service brake pedal. VCU must clear traction torque commands within the approved brake-override response window. Inverter phase current decays within approved threshold. Mechanical brakes slow or stop the wheels without the inverter fighting the service brakes. Blocked: Inverter continuing to push drive current against the active friction brakes outside the response window. Proof: Time-correlated log tracking brake switch vs. phase current decay. Authority: Approved by Controls Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-007 E-Stop During Creep — While the vehicle is moving at steady creep speed, actuate the hardwired or remote E-stop button. Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command transitions to zero and phase current decays within the approved threshold. Vehicle coasts or is braked according to the test plan. Blocked: Inverter continues actively driving the motor; automatic retry sequence executes after E-stop. Proof: High-speed data recording of hardware interlock voltage drop. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-008 Shifter Neutral Interrupt — While the vehicle is maintaining a steady forward creep state, manually shift the PRND selector to Neutral. VCU revokes inverter enable / torque command within the approved response window. Inverter drops to standby/disabled mode within the response window; traction torque falls to the zero-torque threshold. Blocked: Inverter maintaining torque generation or bridge switching while in Neutral. Proof: Time-aligned CAN transaction trace log. Authority: Approved by Test Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-009 Wheel-Speed / Motor Parity — Log wheel speed inputs vs. motor resolver tracking metrics during continuous forward/reverse crawl cycles. Speed data from read-only paths and resolver angular velocity must track within a <=5% parity window. Parity verification bit remains valid; no speed calculation mismatches are flagged. Blocked: Mismatches or tracking deviations exceeding the allowed tolerance window. Proof: Unified CAN data chart plotting resolver velocity vs. wheel sensor signals. Authority: Approved by Calibration Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-010 Steering / Brake Assist — Before and during crawl execution, cycle the steering wheel and check hydraulic/electronic booster pressures. Low-voltage 12V auxiliary networks must maintain power supply stability to steering and brake assistance nodes. Full steering and braking assistance remains completely active and present throughout the test sequence. Blocked: Heavy steering stiffness or diminished braking power due to 12V brownout or drops. Proof: 12V auxiliary bus rail diagnostic voltage data log. Authority: Approved by Electrical Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-011 CAN_1 Passive Integrity — Run continuous bus diagnostic audits on the factory CAN_1 node throughout all creep execution blocks. Validate that the test-platform instrumentation node transmits zero frames onto the production network. CAN_1 remains strictly listen-only and completely passive; zero network collisions or errors are injected. Blocked: Any active frame transmission or error generation onto the production CAN_1 bus. Proof: Bus analyzer interface statistics file. Authority: Approved by Integration Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-012 Fault Latch After Failed Creep — Artificially inject a minor tracking fault (e.g., exceed sensor parity limits) during an active crawl step. System enters a hard fault state within the approved window. System completely blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization. Blocked: Clearing the fault autonomously or allowing an immediate creep retry after a trip or hard power cycle. Proof: UDS non-volatile fault memory validation log. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.

Gate 05M-C2B — Controlled Incline / Rollback Hold Validation
PROVISIONAL TESTING INFRASTRUCTURE: This gate is strictly unlocked only after all verification entries under Gate 05M-C2A (Flat-Ground Restricted Creep) receive documented engineer signoff and complete validation clearance in the Build Engine.
This gate introduces minor structural grades (<2 degrees incline) to ensure the vehicle state engine correctly manages high-inertia anti-rollback and low-speed hill-start handover dynamics under ground contact without unmitigated backward drift.
Verification Matrix: Gate 05M-C2B
- 05M-C2B-001 Incline Breakaway Tracking — Move the platform to the closed test-ramp area. Hold on brake, release, and command forward crawl. Measure the modified breakaway torque delta induced by the structural incline vector. Driveline scales up torque smoothly to counter incline gravity vector; vehicle moves forward under control. Blocked: Mechanical rolling slip backwards exceeding supplier-specified safety distances. Proof: Incline breakaway torque profile CAN graph. Authority: Approved by Calibration Lead. Build Engine: PROVISIONAL / LOCKED.
- 05M-C2B-002 Rollback Prevention / Active Hold — Bring the vehicle to a stop on the incline and fully release the service brake pedal. Monitor motor velocity direction bits and tracking parity indicators. Anti-rollback control prevents free-rolling or stabilizes the vehicle within supplier-defined limits. Blocked: Unmitigated backwards free-rolling down the incline or abrupt high-torque surges. Proof: Wheel speed encoder direction bits synced with VCU logs. Authority: Approved by Safety Director. Build Engine: PROVISIONAL / LOCKED.

Gate 05M-C2A & Gate 05M-C2B Exit Criteria
The system cannot exit this verification tier and progress to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement) unless:
Static brake-holds and bidirectional creep parameters are mapped successfully on flat ground, confirming controlled steps within the 15--25 Nm breakaway envelope.
The APPS dead-band (0--5%), torque map clamp (<=30 Nm), and dT_{command}/dt limits (<=20 Nm/sec) are validated under real-world vehicle inertia.
Brake override circuits, shifter neutral interrupts, and remote/hardwired E-stop loops consistently drop torque within approved response windows with zero automatic retries or step-function current transients.
Anti-rollback logic and speed/motor resolver tracking parity remain fully synchronized within the <=5% engineering window under active tire-to-surface loading on inclines.
Control loop faults correctly latch into non-volatile memory, cleanly blocking autonomous retries, hard resets, or unvalidated re-power routines.
All evidence ledgers—including Proof Artifacts, signed Authority Status, and Build Engine Status columns—are fully complete and validated by their respective discipline owners.
Crucial Engineering Authorization: Successful completion of both Gate 05M-C2A and Gate 05M-C2B satisfies the initial ground-contact, rate-limited creep validation milestones. It officially permits a comprehensive safety audit to establish the baseline constraints for Gate 05M-C3.

Next Gate: Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement
Following the validation of ultra-low speed ground mechanics, shifting limits, incline rollbacks, and control loop fault latching, the platform prepares for track movement:
[Dynamic Deceleration Audits] — Coasting drag profile analysis; Low-speed regenerations (Restricted); Foundation brake cross-checks.
[Multi-Turn Cross-Checks] — Steering angle vs. wheel slip maps; Cornering torque vector limits; Path deviation abort sweeps.
In Gate 05M-C3, the vehicle is authorized to initiate track testing within a physically secure, closed-circuit test track area. This gate governs multi-turn steering geometry torque compliance, dynamic friction and baseline regenerative braking deceleration windows, and initial active traction stability logging. Specific speed boundaries and ramp targets are held under engineering restriction and will not automatically unlock until initial low-speed straight-line tracking is verified.
Would you like to detail the specific safety boundaries, dynamic deceleration criteria, steering-angle torque cross-checks, and track-surface runout limitations for Gate 05M-C3 next?
