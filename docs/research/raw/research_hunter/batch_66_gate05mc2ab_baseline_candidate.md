# Research Hunter — batch 66 (owner label "64:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_63_batch_66_verdict.md`.
>
> Context: this delivery reaches "baseline-candidate quality." The Hunter
> applied the owner's framing corrections 4/5/6 (restricted-creep torque-limit
> wording; bounded/supplier-supported fault injection; brake/steering assist as
> a pre-movement interlock + monitored check). The owner's verdict then adds
> EIGHT further corrections (four-field approval model; expanded Numeric
> Threshold Authority Rule; rename the "Absolute/Hard" clamp → software-limited
> "Restricted Creep Torque Clamp"; dual-channel APPS plausibility; separate
> torque-rate from phase-current-response validation; electrical CAN_1
> passivity definition; C2B rollback containment + hill-hold vs parking-hold;
> and an Assistance-Interlock-Inhibition test). Reconciled as RC-297..306.

---

## Owner framing (chat, label "64:75")

**QUESTION TOLD**

4. Change "hard safety clamp"

This line:

breaking past the hard safety clamp

Better:

exceeding the approved restricted-creep torque limit

5. Make fault injection safe and controlled

This row is good in concept:

Artificially inject a minor tracking fault

But word it more carefully:

Use a pre-approved, supplier-supported, or simulation-controlled fault-injection method to create a bounded tracking fault during restricted creep.

Do not let the Build Engine imply random live fault creation while the vehicle is moving.

6. Steering / brake assist should be a precondition and a monitored check

05M-C2A-010 is good, but add:

No creep torque may be commanded until brake assist and steering assist have passed pre-movement verification.

Then during creep, you monitor for voltage/pressure drops.

Bottom line

Final fixes:

Make fault injection supplier-supported / pre-approved.

Add brake/steering assist as pre-movement hard prerequisites.

After that, yes — 05M-C2A and 05M-C2B are clean enough to baseline, and you can proceed to detailing Gate 05M-C3, but only as controlled closed-area movement with speed/ramp targets still under engineering manual and artifact.

---

## RESEARCHER RESPOND

Architectural Safety Amendments & Engineering Rules
The following structural corrections and explicit safety rules are incorporated into the Build Engine to govern the boundaries between low-speed restricted ground-creep validation, physical component exceptions, and empirical tracking metrics.
1. Empirical Breakaway Tracking and Mechanical Audit Rules
To prevent false-positive safety flags or structural oversights on high-GVWR or highly geared truck platforms:
Breakaway Torque Evaluation Rule: Drivetrain breakaway assessments must map the actual baseline torque requirements empirically rather than enforcing a narrow static range. If measured torque inputs diverge from initial baseline estimates due to tire load, axle ratio variations, or cold brake drag, the platform must halt automated tracking and flag a MECHANICAL_BINDING_CHECK for physical evaluation rather than asserting an automatic component failure.
2. Quantitative System State Definitions
To eliminate unmeasurable qualifiers such as "absolute control" or "completely active" from engineering documentation:
State Quantification Rule: Operational parameters must be framed strictly within measurable engineering constraints. Vehicle dynamics must be bounded by specific creep-speed, torque, and physical runout limits, while auxiliary steering and braking support loops must be validated against explicit pressure, voltage, and response time thresholds.
3. Measurable Displacement During Static Holding Checks
To guarantee that static hold validations yield precise, scannable engineering data:
Brake-Hold Measurement Metric: Static brake-hold scenarios cannot rely on simple visual confirmation. The safety loop must explicitly confirm that physical vehicle displacement remains below approved structural measurement thresholds during full torque application, cross-verifying data across wheel-speed inputs, hub markers, and high-precision external position sensors.
4. Auxiliary System Interlocks and Pre-Movement Verification
To eliminate the risk of un-assisted rolling mass failures:
Pre-Movement Assistance Interlock: No creep torque may be commanded by the VCU or executed by the inverter until auxiliary power networks, hydraulic/electronic booster circuits, and steering assistance loops have passed formal pre-movement verification. Steering and braking infrastructure status registers function as active soft-start prerequisites.
5. Bounded Safety Fault Simulation Protocols
To prevent un-mitigated or destructive system behavior during software loop evaluation:
Fault Simulation Control Protocol: Random live hardware fault creation or uncontrolled wiring disconnections while the vehicle is moving are strictly forbidden. System response verification must utilize a pre-approved, supplier-supported, or simulation-controlled fault-injection method to introduce bounded, predictable tracking errors during restricted creep sequences.

Gate 05M-C2A — Flat-Ground Restricted Creep
This gate governs the critical execution where the vehicle tires touch the ground for the first time under live traction power. Testing is strictly restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote E-stop available.
Global Constraints:
APPS Dead-Band Layer: Strict 0% to 5% travel dead-band. Any signal noise or travel below 5% maps to the zero-torque threshold.
Torque Ramp-Rate Filter (dT_{command}/dt): Throttled to a maximum derivative cap of <=20 Nm/sec.
Absolute Creep Torque Clamp: Hard-clamped at a defensive boundary of <=30 Nm.
Network Passivity: CAN_1 (Factory Chassis Bus) must remain strictly passive (listen-only).

Verification Matrix: Gate 05M-C2A (columns: Test ID | Element | Procedure | Target | Expected Safe Output | Blocked States | Proof Artifact | Authority Status | Build Engine Status)
- 05M-C2A-001 Static Brake-Hold — Fully apply the mechanical service brakes, shift to Drive mode, and apply minor torque request (<=10 Nm). Track wheel speed sensor outputs and physical hub placement. Vehicle displacement remains below approved measurement threshold during brake-hold torque request. Blocked: Any tire creep, vehicle rollout, or brake slippage exceeding structural tolerances. Proof: CAN log mapping brake pressure vs. wheel speed; physical encoder trace. Authority: Approved by Lead Controls Engineer. Build Engine: LOCKED / UNDER REVIEW.
- 05M-C2A-002 Forward Creep — Enforce brake and steering assist pre-movement checks. Release service brake and allow <=1 meter forward step. Map the empirical breakaway torque baseline. Values outside expected targets trigger MECHANICAL_BINDING_CHECK. Driveline overcomes static friction smoothly; vehicle crawls forward within approved creep-speed, torque, and runout limits. Blocked: Vehicle surging, hopping, or accelerating past crawl speed limits. Proof: High-speed time series plot of breakaway torque metrics. Authority: Approved by Lead Mechanical Engineer. Build Engine: STAGED FOR LOG.
- 05M-C2A-003 Reverse Creep — Enforce brake and steering assist pre-movement checks. Shift to Reverse, execute <=1 meter reverse step. Verify direction parameters and evaluate rearward breakaway torque consistency. Driveline transitions smoothly into reverse crawl; matching directional velocity is logged within approved limits. Blocked: Erratic reverse acceleration or directional mismatch against command. Proof: Directional register state printout; velocity delta log. Authority: Approved by Test Lead. Build Engine: STAGED FOR LOG.
- 05M-C2A-004 Accelerator Map Clamp — In Drive mode, manually step the pedal position past 50% travel for a duration of <500 ms. Verify VCU internal command limits and active inverter current tracking via network log. Torque requests and scaling remain tightly clamped below the defensive <=30 Nm threshold. Blocked: Torque generation or current vectors exceeding the approved restricted-creep torque limit. Proof: VCU parametric snapshot file over UDS. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-005 Current Ramp-Rate Limit — Step the pedal rapidly from 0% to 20% travel. Evaluate the current development slope. Inverter phase current development slope must reflect the linear <=20 Nm/sec constraint profile (dT_{command}/dt). Current rises slowly and predictably; no sudden current step-functions occur. Blocked: Sudden, unfiltered current spikes or un-attenuated torque steps. Proof: High-bandwidth oscilloscope current probe trace graph. Authority: Approved by Systems Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-006 Brake Override During Creep — While the vehicle is actively crawling in forward creep, firmly depress the service brake pedal. VCU must clear traction torque commands within the approved brake-override response window. Inverter phase current decays within approved threshold. Mechanical brakes slow or stop the wheels without the inverter fighting the service brakes. Blocked: Inverter continuing to push drive current against the active friction brakes outside the response window. Proof: Time-correlated log tracking brake switch vs. phase current decay. Authority: Approved by Controls Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-007 E-Stop During Creep — While the vehicle is moving at steady creep speed, actuate the hardwired or remote E-stop button. Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command transitions to zero and phase current decays within the approved threshold. Vehicle coasts or is braked according to the test plan. Blocked: Inverter continues actively driving the motor; automatic retry sequence executes after E-stop. Proof: High-speed data recording of hardware interlock voltage drop. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-008 Shifter Neutral Interrupt — While the vehicle is maintaining a steady forward creep state, manually shift the PRND selector to Neutral. VCU revokes inverter enable / torque command within the approved response window. Inverter drops to standby/disabled mode within the response window; traction torque falls to the zero-torque threshold. Blocked: Inverter maintaining torque generation or bridge switching while in Neutral. Proof: Time-aligned CAN transaction trace log. Authority: Approved by Test Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-009 Wheel-Speed / Motor Parity — Log wheel speed inputs vs. motor resolver tracking metrics during continuous forward/reverse crawl cycles. Speed data from read-only paths and resolver angular velocity must track within a <=5% parity window. Parity verification bit remains valid; no speed calculation mismatches are flagged. Blocked: Mismatches or tracking deviations exceeding the allowed tolerance window. Proof: Unified CAN data chart plotting resolver velocity vs. wheel sensor signals. Authority: Approved by Calibration Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-010 Steering / Brake Assist Monitored Check — Cycle the steering wheel and check booster pressures before movement. Continuously monitor during creep. No creep torque may be commanded until brake assist and steering assist have passed pre-movement verification. Steering and braking assist remain within approved pressure, voltage, and response thresholds throughout the sequence. Blocked: Heavy steering stiffness or diminished braking power due to 12V brownout, voltage sags, or pressure drops. Proof: 12V auxiliary bus rail diagnostic voltage data log. Authority: Approved by Electrical Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-011 CAN_1 Passive Integrity — Run continuous bus diagnostic audits on the factory CAN_1 node throughout all creep execution blocks. Validate that the test-platform instrumentation node transmits zero frames onto the production network. CAN_1 remains strictly listen-only and completely passive; zero network collisions or errors are injected. Blocked: Any active frame transmission or error generation onto the production CAN_1 bus. Proof: Bus analyzer interface statistics file. Authority: Approved by Integration Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-012 Bounded Fault Latch Interlock — Use a pre-approved, supplier-supported, or simulation-controlled fault-injection method to create a bounded tracking fault during creep. System enters a hard fault state within the approved window. System completely blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization. Blocked: Clearing the fault autonomously or allowing an immediate creep retry after a trip or hard power cycle. Proof: UDS non-volatile fault memory validation log. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.

Gate 05M-C2B — Controlled Incline / Rollback Hold Validation
PROVISIONAL TESTING INFRASTRUCTURE: This gate is strictly unlocked only after all verification entries under Gate 05M-C2A (Flat-Ground Restricted Creep) receive documented engineer signoff and complete validation clearance in the Build Engine.
This gate introduces minor structural grades (<2 degrees incline) to ensure the vehicle state engine correctly manages high-inertia anti-rollback and low-speed hill-start handover dynamics under ground contact without unmitigated backward drift.
Verification Matrix: Gate 05M-C2B
- 05M-C2B-001 Incline Breakaway Tracking — Enforce brake and steering assist pre-movement checks. Hold on brake, release, and command forward crawl. Map empirical breakaway torque requirements under loading. Deviations trigger MECHANICAL_BINDING_CHECK. Driveline scales up torque smoothly to counter incline gravity vector; vehicle moves forward within approved creep-speed and runout limits. Blocked: Mechanical rolling slip backwards exceeding supplier-specified safety distances. Proof: Incline breakaway torque profile CAN graph. Authority: Approved by Calibration Lead. Build Engine: PROVISIONAL / LOCKED.
- 05M-C2B-002 Rollback Prevention / Active Hold — Bring the vehicle to a stop on the incline and fully release the service brake pedal. Monitor motor velocity direction bits and tracking parity indicators. Anti-rollback control prevents free-rolling or stabilizes the vehicle within supplier-defined limits. Blocked: Unmitigated backwards free-rolling down the incline or abrupt high-torque surges. Proof: Wheel speed encoder direction bits synced with VCU logs. Authority: Approved by Safety Director. Build Engine: PROVISIONAL / LOCKED.

Gate 05M-C2A & Gate 05M-C2B Exit Criteria
The system cannot exit this verification tier and progress to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement) unless:
Static brake-holds and bidirectional creep parameters are mapped successfully on flat ground, confirming that physical displacement remains below approved engineering thresholds.
The APPS dead-band (0--5%), torque map clamp (<=30 Nm), and dT_{command}/dt limits (<=20 Nm/sec) are validated under real-world vehicle inertia.
Brake override circuits, shifter neutral interrupts, and remote/hardwired E-stop loops consistently drop torque within approved response windows with zero automatic retries or step-function current transients.
Anti-rollback logic and speed/motor resolver tracking parity remain fully synchronized within the <=5% engineering window under active tire-to-surface loading on inclines.
Control loop faults correctly latch into non-volatile memory, cleanly blocking autonomous retries, hard resets, or unvalidated re-power routines until formal diagnostic review and authorization occur.
All evidence ledgers—including Proof Artifacts, signed Authority Status, and Build Engine Status columns—are fully complete and validated by their respective discipline owners.
Crucial Engineering Authorization: Successful completion of both Gate 05M-C2A and Gate 05M-C2B satisfies the initial ground-contact, rate-limited creep validation milestones. It officially permits a comprehensive safety audit to establish the baseline constraints for Gate 05M-C3.

Next Gate: Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement
Following the validation of ultra-low speed ground mechanics, shifting limits, incline rollbacks, and control loop fault latching, the platform prepares for track movement:
[Dynamic Deceleration Audits] — Coasting drag profile analysis; Low-speed regenerations (Restricted); Foundation brake cross-checks.
[Multi-Turn Cross-Checks] — Steering angle vs. wheel slip maps; Cornering torque vector limits; Path deviation abort sweeps.
In Gate 05M-C3, the vehicle is authorized to initiate track testing within a physically secure, closed-circuit test track area. This gate governs multi-turn steering geometry torque compliance, dynamic friction and baseline regenerative braking deceleration windows, and initial active traction stability logging. Specific speed boundaries and ramp targets are held under strict engineering restriction and will not automatically unlock; all limits must be managed by explicit manual calibration parameters backed by completed proof artifacts.
