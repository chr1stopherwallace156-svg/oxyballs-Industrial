# Research Hunter — batch 65 (owner label "63:75")

> Archived 1:1 as delivered by the owner (Constitution, Article I — evidence
> is immutable, never edited). This is the raw external Research Hunter
> payload. Quotes, equations, and numeric values are Hunter-supplied and
> UNVERIFIED against source documents. Owner framing and the owner verdict are
> archived separately at `../owner_reviews/review_62_batch_65_verdict.md`.
>
> Context: this delivery APPLIES the owner's corrections 3/4/5 from review_61
> (breakaway is an empirical baseline → MECHANICAL_BINDING_CHECK not auto-fail;
> "absolute control"/"completely active" → measurable creep-speed/torque/runout
> + pressure/voltage/response thresholds; static brake-hold → displacement
> below an approved measurement threshold). Those three are already applied to
> `GATE05M_C2_RESTRICTED_CREEP.md` (RC-294/295/296, batch 64). **The Hunter's
> Authority Status column STILL reads "Approved by <role>" — the RC-292
> Required-Approver correction (review_61) is NOT applied in this draft**, and
> the draft carries no explicit Numeric Threshold Authority Rule statement
> (RC-293). The deliverable already carries both; it is ahead of this draft.

---

## Owner framing (chat, label "63:75")

**QUESTION TOLD**

3. Be careful with the 15–25 Nm breakaway range

For a heavy platform like an F-450/F-550, 15–25 Nm may be too light depending on gearing, tire load, brake drag, axle ratio, grade, tire pressure, and drivetrain configuration.

Change

confirming controlled forward/reverse steps within the 15–25 Nm breakaway envelope

To

mapping the actual breakaway torque baseline. Values outside the initial expected range trigger MECHANICAL_BINDING_CHECK, not automatic failure.

4. Replace "absolute control" language unless it has been written proven artifact or engineering

This line:

vehicle crawls forward under absolute control

Should become

vehicle crawls forward within approved creep-speed, torque, and runout limits

Same idea for:

full steering and braking assistance remains completely active

Use

steering and braking assist remain within approved pressure, voltage, and response thresholds

5. Static brake-hold should have a measurable threshold

Instead of:

Mechanical service brakes must completely hold the vehicle static

Use

Vehicle displacement remains below approved measurement threshold during brake-hold torque request.

That lets you measure it with wheel-speed, hub marker, video, or external position sensor.

After that, Gate 05M-C2A / C2B is clean enough to baseline, and the next gate should be 05M-C3 — Controlled Closed-Area Low-Speed Movement,

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

Gate 05M-C2A — Flat-Ground Restricted Creep
This gate governs the critical execution where the vehicle tires touch the ground for the first time under live traction power. Testing is strictly restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote E-stop available.
Global Constraints:
APPS Dead-Band Layer: Strict 0% to 5% travel dead-band. Any signal noise or travel below 5% maps to the zero-torque threshold.
Torque Ramp-Rate Filter (dT_{command}/dt): Throttled to a maximum derivative cap of <=20 Nm/sec.
Absolute Creep Torque Clamp: Hard-clamped at a defensive boundary of <=30 Nm.
Network Passivity: CAN_1 (Factory Chassis Bus) must remain strictly passive (listen-only).

Verification Matrix: Gate 05M-C2A (columns: Test ID | Element | Procedure | Target | Expected Safe Output | Blocked States | Proof Artifact | Authority Status | Build Engine Status)
- 05M-C2A-001 Static Brake-Hold — Fully apply the mechanical service brakes, shift to Drive mode, and apply minor torque request (<=10 Nm). Track wheel speed sensor outputs and physical hub placement. Vehicle displacement remains below approved measurement threshold during brake-hold torque request. Blocked: Any tire creep, vehicle rollout, or brake slippage exceeding structural tolerances. Proof: CAN log mapping brake pressure vs. wheel speed; physical encoder trace. Authority: Approved by Lead Controls Engineer. Build Engine: LOCKED / UNDER REVIEW.
- 05M-C2A-002 Forward Creep — Release the service brake pedal and allow the vehicle to transition into a tiny forward creep step (<=1 meter). Map the empirical breakaway torque baseline. Values outside expected targets trigger MECHANICAL_BINDING_CHECK. Driveline overcomes static friction smoothly; vehicle crawls forward within approved creep-speed, torque, and runout limits. Blocked: Vehicle surging, hopping, or accelerating past crawl speed limits. Proof: High-speed time series plot of breakaway torque metrics. Authority: Approved by Lead Mechanical Engineer. Build Engine: STAGED FOR LOG.
- 05M-C2A-003 Reverse Creep — Stop the vehicle, shift to Reverse, and execute a tiny reverse creep step (<=1 meter). Verify direction parameters and evaluate rearward breakaway torque consistency. Driveline transitions smoothly into reverse crawl; matching directional velocity is logged within approved limits. Blocked: Erratic reverse acceleration or directional mismatch against command. Proof: Directional register state printout; velocity delta log. Authority: Approved by Test Lead. Build Engine: STAGED FOR LOG.
- 05M-C2A-004 Accelerator Map Clamp — In Drive mode, manually step the pedal position past 50% travel for a duration of <500 ms. Verify VCU internal command limits and active inverter current tracking via network log. Torque requests and scaling remain tightly clamped at the defensive <=30 Nm threshold. Blocked: Torque generation or current vectors breaking past the hard safety clamp. Proof: VCU parametric snapshot file over UDS. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-005 Current Ramp-Rate Limit — Step the pedal rapidly from 0% to 20% travel. Evaluate the current development slope. Inverter phase current development slope must reflect the linear <=20 Nm/sec constraint profile (dT_{command}/dt). Current rises slowly and predictably; no sudden current step-functions occur. Blocked: Sudden, unfiltered current spikes or un-attenuated torque steps. Proof: High-bandwidth oscilloscope current probe trace graph. Authority: Approved by Systems Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-006 Brake Override During Creep — While the vehicle is actively crawling in forward creep, firmly depress the service brake pedal. VCU must clear traction torque commands within the approved brake-override response window. Inverter phase current decays within approved threshold. Mechanical brakes slow or stop the wheels without the inverter fighting the service brakes. Blocked: Inverter continuing to push drive current against the active friction brakes outside the response window. Proof: Time-correlated log tracking brake switch vs. phase current decay. Authority: Approved by Controls Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-007 E-Stop During Creep — While the vehicle is moving at steady creep speed, actuate the hardwired or remote E-stop button. Hardwired safety loop interrupts contactor/control supply path within the approved response window. Inverter torque command transitions to zero and phase current decays within the approved threshold. Vehicle coasts or is braked according to the test plan. Blocked: Inverter continues actively driving the motor; automatic retry sequence executes after E-stop. Proof: High-speed data recording of hardware interlock voltage drop. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.
- 05M-C2A-008 Shifter Neutral Interrupt — While the vehicle is maintaining a steady forward creep state, manually shift the PRND selector to Neutral. VCU revokes inverter enable / torque command within the approved response window. Inverter drops to standby/disabled mode within the response window; traction torque falls to the zero-torque threshold. Blocked: Inverter maintaining torque generation or bridge switching while in Neutral. Proof: Time-aligned CAN transaction trace log. Authority: Approved by Test Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-009 Wheel-Speed / Motor Parity — Log wheel speed inputs vs. motor resolver tracking metrics during continuous forward/reverse crawl cycles. Speed data from read-only paths and resolver angular velocity must track within a <=5% parity window. Parity verification bit remains valid; no speed calculation mismatches are flagged. Blocked: Mismatches or tracking deviations exceeding the allowed tolerance window. Proof: Unified CAN data chart plotting resolver velocity vs. wheel sensor signals. Authority: Approved by Calibration Engineer. Build Engine: PENDING EXECUTION.
- 05M-C2A-010 Steering / Brake Assist — Before and during crawl execution, cycle the steering wheel and check hydraulic/electronic booster pressures. Low-voltage 12V auxiliary networks must maintain power supply stability to steering and brake assistance nodes. Steering and braking assist remain within approved pressure, voltage, and response thresholds throughout the sequence. Blocked: Heavy steering stiffness or diminished braking power due to 12V brownout or drops. Proof: 12V auxiliary bus rail diagnostic voltage data log. Authority: Approved by Electrical Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-011 CAN_1 Passive Integrity — Run continuous bus diagnostic audits on the factory CAN_1 node throughout all creep execution blocks. Validate that the test-platform instrumentation node transmits zero frames onto the production network. CAN_1 remains strictly listen-only and completely passive; zero network collisions or errors are injected. Blocked: Any active frame transmission or error generation onto the production CAN_1 bus. Proof: Bus analyzer interface statistics file. Authority: Approved by Integration Lead. Build Engine: PENDING EXECUTION.
- 05M-C2A-012 Fault Latch After Failed Creep — Artificially inject a minor tracking fault (e.g., exceed sensor parity limits) during an active crawl step. System enters a hard fault state within the approved window. System completely blocks re-energization or creep retries until diagnostic review, fault-source correction, approved service clear, and engineering/test-lead authorization. Blocked: Clearing the fault autonomously or allowing an immediate creep retry after a trip or hard power cycle. Proof: UDS non-volatile fault memory validation log. Authority: Approved by Safety Director. Build Engine: PENDING EXECUTION.

Gate 05M-C2B — Controlled Incline / Rollback Hold Validation
PROVISIONAL TESTING INFRASTRUCTURE: This gate is strictly unlocked only after all verification entries under Gate 05M-C2A (Flat-Ground Restricted Creep) receive documented engineer signoff and complete validation clearance in the Build Engine.
This gate introduces minor structural grades (<2 degrees incline) to ensure the vehicle state engine correctly manages high-inertia anti-rollback and low-speed hill-start handover dynamics under ground contact without unmitigated backward drift.
Verification Matrix: Gate 05M-C2B
- 05M-C2B-001 Incline Breakaway Tracking — Move the platform to the closed test-ramp area. Hold on brake, release, and command forward crawl. Map empirical breakaway torque requirements under loading. Deviations trigger MECHANICAL_BINDING_CHECK. Driveline scales up torque smoothly to counter incline gravity vector; vehicle moves forward within approved creep-speed and runout limits. Blocked: Mechanical rolling slip backwards exceeding supplier-specified safety distances. Proof: Incline breakaway torque profile CAN graph. Authority: Approved by Calibration Lead. Build Engine: PROVISIONAL / LOCKED.
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
In Gate 05M-C3, the vehicle is authorized to initiate track testing within a physically secure, closed-circuit test track area. This gate governs multi-turn steering geometry torque compliance, dynamic friction and baseline regenerative braking deceleration windows, and initial active traction stability logging. Specific speed boundaries and ramp targets are held under engineering restriction and will not automatically unlock until initial low-speed straight-line tracking is verified.
