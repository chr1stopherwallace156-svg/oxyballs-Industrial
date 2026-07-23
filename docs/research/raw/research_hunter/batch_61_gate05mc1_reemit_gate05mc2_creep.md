# Research Hunter — batch 61 (owner label "59A")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_58_batch_61_verdict.md`.

> **Regression note (not part of the raw payload):** this Hunter payload
> re-emitted the 05M-C1-005 line "Hand-lock one lifted wheel safely" — the
> exact instruction the owner rejected as SAFETY-CRITICAL in review_57
> (RC-279). It is preserved 1:1 here as evidence; the deliverable
> `GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` already holds the corrected
> rated-fixture-only wording and is NOT regressed.

---

## Architectural Safety Amendments & Engineering Rules

### 1. Real-Time Response Window Terminology Standard

Response Window Mandate: All safety-critical control interventions—including Brake Override Systems (BOS), emergency stops, and fault-induced shutdowns—must have their performance evaluated against a quantitative, supplier-defined or engineering-approved response window.

### 2. Wheel Speed Sensor Network Ingress Limits

Chassis Network Ingress Rule: Wheel speed data may be observed only through an authorized read-only path, passive network logging path, or independent external instrumentation. Integration or use of factory ABS/ESC data for active traction-control authority is strictly blocked until official Ford-authorized documentation is secured and an engineering review formally approves the interface.

### 3. Ground Rollout Surface and Environmental Safety Enclosure

First Ground Movement Boundary: The default test environment for first ground contact must not utilize a low-friction surface. Testing is restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote hardware E-stop available.

---

## Gate 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness

This gate governs the initial physical integration of the traction motor with the vehicle's secondary mechanical elements (gearbox, half-shafts, hubs, and wheels) under a zero-ground-contact profile. The entire driven axle of the vehicle must be lifted and securely locked on heavy-duty jack stands or a chassis lift, ensuring that the vehicle wheels can spin freely with zero road friction and zero traction-propulsion authority.

### Verification Matrix: Gate 05M-C1

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-C1-001 | Mechanical Driveline Backlash Mapping | Deliver alternating, low-amplitude (≤ 1%) forward/reverse torque steps to the lifted drivetrain. | Record CAN position metrics and physical angular displacement at the wheel hub to chart mechanical play boundaries. | The drivetrain transitions smoothly between gears without loud impact or excessive slop. | High-current spikes or harsh mechanical binding during torque direction shifts. | CAN data log tracing torque command vs. resolver position transitions. |
| 05M-C1-002 | Elevated Wheel Speed Parity Audit | Spin the lifted assembly up to a steady calibration speed (100 RPM). Log all speed loops. | Wheel speed metrics observed via approved read-only or external paths must align in direction and match motor velocity within ≤ 5%. | All sensor tracks update uniformly. Calculated vehicle speed correlates correctly with motor RPM. | • Left/right wheel speed direction inversion • Discrepancies exceeding the tracking tolerance | Unified CAN data chart plotting resolver velocity vs. wheel sensor signals. |
| 05M-C1-003 | Brake Override System (BOS) Validation | While maintaining a steady torque request (≤ 5% micro-clamp limit), tap the vehicle service brake pedal. | VCU must clear traction torque commands within the approved brake-override response window. | Inverter phase current decays within the approved threshold. Mechanical brakes slow or stop the lifted wheels without the inverter fighting the service brakes. | Inverter continues to drive phase currents or fight the service brakes outside the response window. | High-speed log showing brake switch transition vs. phase current decay. |
| 05M-C1-004 | Micro-Scale Torque Clamp Enforcement | Apply full travel to the driver pedal position sensor. Monitor VCU torque output registers over CAN. | VCU torque requests must clamp tightly at the defensive software limit threshold (≤ 5%). | Inverter respects the clamped torque boundary; phase currents remain structurally limited. | Torque requests or active inverter scaling breaking past the 5% guardrail. | Diagnostic snapshot file of VCU internal control parameters. |
| 05M-C1-005 | Lifted Asymmetry & Differential Scan | Hand-lock one lifted wheel safely. Inject a minimal torque pulse (≤ 2%) to check open differential operation. | Opposite elevated wheel must rotate smoothly at differential speed. Torque tracking remains stable. | Power transfers as intended across the differential assembly without severe vibrations or binding. | Mechanical lock-up of the differential gear matrix or abnormal phase current spikes. | Engineering run data log sheet tracking individual hub speed metrics. |

---

## Gate 05M-C2 — Restricted Creep Torque Validation

This gate governs the critical execution where the vehicle tires touch the ground for the first time under live traction power. Testing is strictly restricted to a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and a remote E-stop available.

The focus of this gate is limited strictly to restricted creep torque profiling—this is not a normal driving gate. It validates the fundamental control, shifting, safety overrides, and steering/braking assistance functions required to manage initial crawling mechanics safely.

Global Constraints:
- APPS Dead-Band Layer: Strict 0% to 5% travel dead-band. Any signal noise or travel below 5% maps to absolute 0 Nm.
- Torque Ramp-Rate Filter (dQ/dt): Throttled to a maximum derivative cap of ≤ 20 Nm/sec.
- Absolute Creep Torque Clamp: Hard-clamped at a defensive boundary of ≤ 30 Nm.
- Network Passivity: CAN_1 (Factory Chassis Bus) must remain strictly passive (listen-only).

### Verification Matrix: Gate 05M-C2

| Test ID | Element Checked | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) |
|---|---|---|---|---|---|
| 05M-C2-001 | Static Brake-Hold | Fully apply the mechanical service brakes, shift to Drive mode, and apply minor torque request (≤ 10 Nm). | Track wheel speed sensor outputs and physical hub placement. | Mechanical service brakes must completely hold the vehicle static against the torque request. | Any tire creep, vehicle rollout, or brake slippage. |
| 05M-C2-002 | Forward Creep | Release the service brake pedal and allow the vehicle to transition into a tiny forward creep step (≤ 1 meter). | Measure physical breakaway torque baseline (target: 15–25 Nm). | Driveline overcomes static friction smoothly; vehicle crawls forward under absolute control. | Vehicle surging, hopping, or accelerating past crawl speeds. |
| 05M-C2-003 | Reverse Creep | Stop the vehicle, shift to Reverse, and execute a tiny reverse creep step (≤ 1 meter). | Verify direction parameters and evaluate rearward breakaway torque consistency. | Driveline transitions smoothly into reverse crawl; matching directional velocity is logged. | Erratic reverse acceleration or directional mismatch against command. |
| 05M-C2-004 | Accelerator Map Clamp | In Drive mode, manually step the pedal position past 50% travel for a duration of < 500 ms. | Verify VCU internal command limits and active inverter current tracking via network log. | Torque requests and scaling remain tightly clamped at the defensive ≤ 30 Nm threshold. | Torque generation or current vectors breaking past the hard safety clamp. |
| 05M-C2-005 | Current Ramp-Rate Limit | Step the pedal rapidly from 0% to 20% travel. Evaluate the current development slope. | Inverter phase current development slope must reflect the linear ≤ 20 Nm/sec constraint profile. | Current rises slowly and predictably; no sudden current step-functions occur. | Sudden, unfiltered current spikes or un-attenuated torque steps. |
| 05M-C2-006 | Brake Override During Creep | While the vehicle is actively crawling in forward creep, firmly depress the service brake pedal. | VCU must clear traction torque commands within the approved brake-override response window. | Phase current decays within approved threshold; brakes stop the vehicle without the inverter fighting them. | Inverter continuing to push drive current against the active friction brakes. |
| 05M-C2-007 | E-Stop During Creep | While the vehicle is moving at steady creep speed, actuate the hardwired or remote E-stop button. | Hardwired safety loop must interrupt coil supply power within the engineering-approved window. | High-voltage bus drops out; inverter torque drops to zero; vehicle coasts safely to an immediate stop. | • Inverter continues actively driving the motor • Automatic retry sequence executes after E-stop |
| 05M-C2-008 | Shifter Neutral Interrupt | While the vehicle is maintaining a steady forward creep state, manually shift the PRND selector to Neutral. | VCU must immediately revoke the inverter enable/torque command bit over the control bus. | Inverter drops to standby/disabled mode within the response window; traction torque falls to 0 Nm. | Inverter maintaining torque generation or bridge switching while in Neutral. |
| 05M-C2-009 | Rollback Prevention | Bring the vehicle to a stop on a minor incline (< 2°) and release the service brake pedal. | Monitor motor velocity direction bits and tracking parity indicators. | Anti-rollback control prevents free-rolling or stabilizes the vehicle within supplier-defined limits. | Unmitigated backwards free-rolling down the incline or abrupt high-torque surges. |
| 05M-C2-010 | Wheel-Speed / Motor Parity | Log wheel speed inputs vs. motor resolver tracking metrics during continuous forward/reverse crawl cycles. | Speed data from read-only paths and resolver angular velocity must track within a ≤ 5% parity window. | Parity verification bit remains valid; no speed calculation mismatches are flagged. | Mismatches or tracking deviations exceeding the allowed tolerance window. |
| 05M-C2-011 | Steering / Brake Assist | Before and during crawl execution, cycle the steering wheel and check hydraulic/electronic booster pressures. | Low-voltage 12V auxiliary networks must maintain power supply stability to steering and brake assistance nodes. | Full steering and braking assistance remains completely active and present throughout the test sequence. | Heavy steering stiffness or diminished braking power due to 12V brownout or drops. |
| 05M-C2-012 | CAN_1 Passive Integrity | Run continuous bus diagnostic audits on the factory CAN_1 node throughout all creep execution blocks. | Validate that the test-platform instrumentation node transmits zero frames onto the production network. | CAN_1 remains strictly listen-only and completely passive; zero network collisions or errors are injected. | Any active frame transmission or error generation onto the production CAN_1 bus. |
| 05M-C2-013 | Fault Latch After Failed Creep | Artificially inject a minor tracking fault (e.g., exceed sensor parity limits) during an active crawl step. | The control loop must trip, drop the inverter out of active mode, and assert a latched fault state. | System enters a hard fault state and completely blocks re-energization or creep retries until a hard reset occurs. | Clearing the fault autonomously or allowing an immediate creep retry after a trip. |

### Gate 05M-C2 Exit Criteria

The system cannot exit Gate 05M-C2 and proceed to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement) unless:

- Static brake-holds and bidirectional creep parameters are mapped successfully, confirming controlled forward/reverse steps within the 15–25 Nm breakaway envelope.
- The APPS dead-band (0–5%), torque map clamp (≤ 30 Nm), and current ramp-rate limits (≤ 20 Nm/sec) are validated under real-world vehicle inertia.
- Brake override circuits, shifter neutral interrupts, and remote/hardwired E-stop loops consistently drop torque within approved response windows with zero automatic retries.
- Anti-rollback logic and speed/motor resolver tracking parity remain fully synchronized within the ≤ 5% engineering window under active tire-to-surface loading.
- Steering and braking auxiliary power support systems demonstrate absolute voltage stability, remaining fully functional across all test blocks.
- The factory CAN_1 network maintains strict passive status with zero active frames transmitted by the build environment instrumentation.
- Control loop faults correctly latch into non-volatile memory, cleanly blocking autonomous retries or unvalidated re-power routines.
- All time-stamped CAN transaction logs, sensor parity traces, current ramp graphs, and engineer verification signatures are securely archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05M-C2 completion satisfies the initial ground-contact, rate-limited creep validation milestones. It officially permits signed engineering authorization to proceed to Gate 05M-C3 (Controlled Closed-Area Low-Speed Movement), unlocking track-surface speeds up to 15 km/h.
