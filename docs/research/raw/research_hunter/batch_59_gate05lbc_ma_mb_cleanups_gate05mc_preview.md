# Research Hunter — batch 59 ("58:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_56_batch_59_verdict.md`.

---

## Architectural Safety Amendments & Engineering Rules

The following structural corrections and explicit safety rules are incorporated into the Build Engine to govern the boundaries between high-voltage (HV) distribution validation, inverter readiness, and traction system enablement.

### 1. Normal Shutdown Contactor Sequence Rule

Contactor Shutdown Command Rule: The normal shutdown contactor sequence must strictly follow the supplier-defined BMS/PDU shutdown architecture. There is no universal opening order (e.g., positive-first vs. negative-first); the sequence must conform entirely to the component manufacturer's engineering specifications to ensure uniform contact wear and correct arc suppression.

### 2. Pre-Charge Voltage Modeling Limits

RC Curve Modeling Domain: The ideal first-order RC curve equation V_caps(t) = V_batt × (1 − e^(−t/RC)) is an engineering comparison model only. The physical accepted pre-charge voltage rise envelope must be explicitly supplier-approved and account for R_pre tolerances, C_link tolerances, pack voltage sag under pulse load, analog measurement filtering characteristics, baseline leakage/bleeder paths, and internal BMS/PDU software sampling delays.

### 3. Noise and Drift Tolerances in Logic Signatures

Sensor Boundary Rule: Absolute mathematical terms such as literal zero current, zero deviation, or zero electromagnetic interference are strictly forbidden in firmware check routines. All telemetry lines must be evaluated against bounded, explainable, supplier-approved thresholds and noise/drift tolerances.

### 4. Physical Boundaries for No-Load Motor Testing

No-Load Spin Boundary Mandate: Gate 05M-B testing strictly requires a physically guarded rotating shaft, absolute exclusion of any driveline attachments (uncoupled from driveshafts, axles, and gearboxes), zero wheel torque path, and zero vehicle movement path. Testing must occur with an active hardware emergency stop loop, an active exclusion zone perimeter, a supplier-defined spin profile only, and complete masking of cabin driver pedal authority.

---

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation

Operational Constraints: TRACTION INVERTER SWITCHING IS DISABLED, ZERO MOTOR RPM.

### Verification Matrix: Gate 05L-B

| Test ID | Scenario Description | Request Signal (VCU) | Actual Owner (BMS/PDU) | Feedback Signal | Measured HV Response | Blocked / Failure Condition | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05L-B-001 | Main Negative Control Sequence | VCU broadcasts HV_Enable_Request = TRUE over CAN_3. | BMS/PDU validates pre-flight safety variables and energizes the Main Negative contactor coil line. | BMS/PDU polls Main Negative auxiliary mirror contact state. | Main Negative contactor mechanically closes. No unintended DC-link rise occurs beyond approved leakage/noise thresholds. V_caps must match supplier topology expectations. | Auxiliary feedback fails to transition high within ≤ 50 ms of coil drive. | CAN network log capturing request vs. feedback status bits; digital multimeter trace. |
| 05L-B-002 | Current-Limited Pre-Charge Engagement | VCU continues broadcasting HV_Enable_Request = TRUE. | BMS/PDU maintains Main Negative and energizes the Pre-Charge Relay coil loop. | BMS/PDU polls Pre-Charge auxiliary feedback status. | Current streams through R_pre. V_caps rise remains within the supplier-approved pre-charge envelope (modeled via baseline RC curve). | V_caps tracks an instantaneous step-voltage to pack potential (0 ms short-circuit indicator). | High-voltage differential scope capture of DC-link voltage rise profile. |
| 05L-B-003 | Delta-V Threshold Matching | VCU maintains HV_Enable_Request = TRUE. | BMS/PDU monitors ΔV. Once threshold condition is met, it commands Main Positive contactor closure. | BMS/PDU polls Main Positive auxiliary mirror contact state. | Main Positive contactor closes. Pre-Charge relay is de-energized. Live DC bus is established. | Main Positive coil is driven while the voltage delta condition is unsatisfied (ΔV > 5% of total V_batt). | Time-correlated log trace tracking V_batt, V_caps, and Main Positive Command status. |
| 05L-B-004 | Pre-Charge Timeout Protection | VCU broadcasts HV_Enable_Request = TRUE. | BMS/PDU attempts pre-charge sequence against an artificially induced bus leakage. | BMS/PDU monitors internal time counter and V_caps tracking. | V_caps fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout window expires (Initial target: 500 ms). | BMS/PDU aborts the sequence, opens contactor/pre-charge outputs, logs pre-charge timeout DTC, and blocks retry according to approved retry policy. | CAN error log capturing the exact time delta and pre-charge timeout DTC. |
| 05L-B-005 | Pre-Flight Contactor Weld Detection | VCU broadcasts initial boot sequencing status. | BMS/PDU executes pre-flight scan of auxiliary circuits before driving any coil lines. | BMS/PDU reads Main Positive mirror contact as "Closed" (simulated weld via hardware jump). | Coil drive lines are strictly maintained at absolute 0.0V. Power-up sequence is immediately blocked. | Any contactor coil driven while an unaligned, pre-power feedback state is asserted. | UDS fault register printout showing active contactor weld DTC lockout. |
| 05L-B-006 | Passive Stored Energy Decay | VCU transitions to HV_Enable_Request = FALSE (Normal Key-Off). | BMS/PDU opens Main Positive and Main Negative contactor coil lines. | BMS/PDU polls mirror contacts for complete open transition. | Main contactors open. High-voltage energy stored within C_link decays passively via internal bleeders. | V_caps remains above safe threshold (>60V DC) past the supplier-defined discharge window. | Continuous high-voltage scope monitoring capture of voltage decay over time. |
| 05L-B-007 | Manual Abort During Pre-Charge | VCU broadcasts HV_Enable_Request = TRUE; pre-charge active. | BMS/PDU actively cycling pre-charge loop. | Physical E-stop button is manually depressed during the active voltage rise phase. | Hardwired safety loop interrupts contactor/pre-charge coil supply power. Dropout timing is measured against supplier targets. | • Automatic retry occurs after manual E-stop • Dropout timing exceeds supplier-approved target • Contactor/pre-charge coil supply remains energized | Scope trace of control line drop; HV bus decay trace; E-stop event timestamp. |

### Gate 05L-B Exit Criteria

- The pre-charge voltage rise curve remains entirely bounded within the supplier-approved pre-charge envelope without erratic steps or oscillations.
- The Main Positive contactor closure is strictly locked out until the ΔV ≤ 5% target validation condition is verified by the BMS/PDU state machine.
- Pre-charge timeout constraints reliably abort the power-up sequence, isolate the pack, log a timeout DTC, and enforce the retry limit policy if thresholds expire.
- Contactor weld-detection logic successfully blocks coil drive signals when feedback lines show unaligned initialization states.
- The manual abort safety loop demonstrates a direct, hardware-driven drop-out of all contactor circuits within the supplier-approved timing target with zero automatic retries.
- All raw data logs, high-voltage scope captures, mathematical delta verifications, and engineering approvals are permanently archived.

Crucial Milestone Authorization: Successful Gate 05L-B completion permits progression to Gate 05L-C only.

---

## Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability

### Verification Matrix: Gate 05L-C

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05L-C-001 | Normal Coordinated Shutdown | Send an internal power-down request via vehicle ignition off. Monitor contactor drop sequence. | Normal shutdown contactor sequence must follow the supplier-defined BMS/PDU shutdown architecture. | Bus voltage decays cleanly via bleeders. No error codes are flagged on normal shutdown. | • Any shutdown sequence that violates supplier documentation • Leaves an unintended energized path • Prevents verified DC-link discharge • Command state/auxiliary contact feedback mismatch | Time-stamped CAN bus transaction trace log. |
| 05L-C-002 | Pre-Charge Retry Limit Lockout | Force a pre-charge failure condition twice consecutively (e.g., maintain a temporary bleed path). | On the third power-on request, the BMS/PDU must refuse to drive the pre-charge or negative coils. | The system enters a hard "Pre-Charge Attempt Lockout" state. Coils remain unpowered. | The system allowing an infinite number of consecutive pre-charge cycles. | VCU/BMS diagnostic status register printout. |
| 05L-C-003 | Thermal Cool-Down Enforcement | Execute a successful pre-charge and shutdown cycle. Attempt an immediate re-power request. | The BMS/PDU must delay coil engagement until the pre-charge resistor thermal recovery timer has expired. | Power-up sequence pauses automatically until the cooling window criteria is met. | Pre-charge relay closing before the thermal delay timer has cleared. | Microcontroller internal variable timing log. |
| 05L-C-004 | Rated IMD Fault Isolation | With the HV bus active, deploy an approved, rated, current-limited HV isolation-test fixture to step insulation down. | The IMD must flag an isolation fault over CAN within the specified detection window. | BMS/PDU acts on the IMD fault, opens contactor channels, and enters a latched isolation fault state. | • System ignoring active isolation faults • Delayed shutdown exceeding safety limits | CAN trace showing IMD fault flag insertion vs. contactor open events. |
| 05L-C-005A | Weld Detection False Positive Check | Execute 10 consecutive nominal power-on and power-down cycles back-to-back with required cooling delays. | Evaluate auxiliary contact feedback profiles across all 10 cycles for mechanical bounce signatures. | 10 out of 10 cycles execute flawlessly without normal contactor bounce falsely triggering a weld fault code. | Spurious weld alarms caused by mechanical contact bounce during normal activation. | Statistical test run data log summary sheet. |
| 05L-C-005B | Weld Detection False Negative Check | While unpowered, apply a hardware jumper to force a closed state on the contactor mirror feedback line. | Attempt an HV power-on request. Monitor BMS/PDU outputs. | The simulated welded feedback state is always detected by the pre-flight scan, blocking coil drive signals. | Power-up routine proceeding or failing to catch the forced auxiliary mismatch. | Captured UDS fault register printout showing specific weld fault lock active. |

### Gate 05L-C Exit Criteria

- Normal coordinated shutdowns follow the supplier-defined contactor opening sequence precisely under all standard key-off cycles.
- Pre-charge retry limitations (≤ 2 attempts) and thermal cool-down timers are strictly enforced by the BMS/PDU firmware.
- Rated, fixture-driven IMD fault injection demonstrates an immediate, reliable system isolation shutdown when an isolation leak is introduced to the chassis ground layer.
- Zero false-positive weld faults from mechanical contact bounce are recorded across 10 sequential, back-to-back operational cycles.
- Simulated welded states are caught 100% of the time during pre-flight checks, successfully blocking re-energization.
- All cycle run data logs, thermal metrics, IMD response captures, and engineer validation signoffs are permanently archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05L-C completion permits engineering review for Gate 05M-A.

---

## Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation

All high-voltage buses are energized, but the inverter control states are strictly torque-disabled.

### Verification Matrix: Gate 05M-A

Every test scenario in this gate operates under strict global constraints: NO TRACTION TORQUE COMMAND, NO INTENTIONAL MOTOR ROTATION, NO VEHICLE MOVEMENT, NO DRIVER TORQUE AUTHORITY.

| Test ID | Scenario Description | Initial Chassis State | Trigger Action / Input | Expected Coordinated Safety Cascade | Target Measurement Criteria | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05M-A-001 | Inverter Live DC Bus Boot | Execute nominal HV power-up sequence to establish live DC bus. Cycle key to drive mode. | Verify inverter microcontroller startup behavior and communication loops under live potential. | Inverter control card transitions cleanly through boot states and reports its supplier-defined readiness flags over CAN_2. | Handshake bits match across network. Inverter boots into a torque-disabled, safe standby mode. | Inverter enabling gating paths automatically without explicit command. | Time-stamped CAN trace of handshake initialization bytes. |
| 05M-A-002 | Phase Current Sensor Baseline | Inverter active in torque-disabled state. | Query the inverter phase current calibration registers under live DC bus conditions. | VCU reads inverter phase current telemetry to verify zero-point offsets remain within operational specs. | Phase current sensor offset readings must fall within the supplier-defined zero-current threshold. | Offset drift exceeding safety metrics, indicating hardware or thermal degradation. | UDS register calibration dump file. |
| 05M-A-003 | Static Resolver Plausibility | Inverter active in torque-disabled state. | Monitor raw motor resolver position feedback over a continuous 5-minute tracking window. | VCU evaluates the resolver raw sin/cos signal tracking registers to verify structural signal integrity. | Resolver electrical angle reading must remain stable within the supplier-defined resolver noise/drift tolerance. | Resolver angular drift, bit-flips, or noise spikes while the motor shaft is static. | Resolver telemetry trace capture spreadsheet. |
| 05M-A-004 | Zero-Torque Control Safeguard | VCU commands torque register value strictly to 0 Nm over network. | Step vehicle into an active "Ready-to-Drive" state while keeping driver controls fully masked. | Inverter internal control loop processes the 0 Nm clamp. Power-stage switching is blocked unless explicitly defined as part of a safe zero-torque readiness state by supplier docs. | No torque-producing current occurs beyond the approved threshold. No unintended shaft movement occurs. | Any unintended shaft twitch, magnetic dragging, or unapproved bridge switching. | Inverter phase current trace log; CAN command byte log. |
| 05M-A-005 | Watchdog Disruption Response | Inverter active in a torque-disabled ready state. | Force a communication dropout by cutting or disconnecting the CAN_2 bus link. | Inverter control card detects the watchdog timeout, halts state execution, and transitions to a supplier-defined safe state. | State transition occurs within ≤ 50 ms of the last valid network heartbeat frame. | Inverter holding its last known state or remaining in an active ready mode. | Oscilloscope capture of bus drop vs. inverter fault line transition. |

### Gate 05M-A Exit Criteria

- The inverter control card boots cleanly under live DC potential and initializes directly into a torque-disabled standby state.
- The VCU/inverter handshake alignment is validated across CAN_2 with matching network status bytes.
- Phase current sensors read within supplier-defined zero-current threshold limits under live potential.
- Static resolver angular telemetry confirms a plausible position baseline within the supplier-defined noise/drift tolerance.
- Network watchdog loops cleanly force the inverter to its supplier-defined safe state within ≤ 50 ms of frame loss.
- No unintended torque, rotation, or current generation occurs across any input combination during zero-torque readiness checks.
- All telemetry captures, calibration offsets, handshake data logs, and engineering signoffs are archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05M-A completion permits signed engineering authorization to proceed to Gate 05M-B.

---

## Gate 05M-B — No-Load Motor Spin Validation

This gate governs the first physical rotation of the traction motor shaft inside the vehicle chassis. At this stage, the motor shaft is completely uncoupled from the vehicle's secondary drivetrain elements to eliminate external mass inertia and load dynamics.

Every test scenario in this gate operates under strict global constraints: GUARDED ROTATING SHAFT, NO DRIVELINE ATTACHMENT, NO WHEEL TORQUE PATH, NO VEHICLE MOVEMENT PATH, EMERGENCY STOP ACTIVE, EXCLUSION ZONE ACTIVE, SUPPLIER-DEFINED SPIN PROFILE ONLY, NO CABIN DRIVER PEDAL AUTHORITY.

### Verification Matrix: Gate 05M-B

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-B-001 | Physical Phase Rotation Check | Command a minimal torque request (≤ 2% of nominal max via supplier profile). Observe shaft direction. | Physical rotation vector must strictly match the commanded software direction flag. | The guarded, uncoupled motor shaft turns smoothly in the designated direction without hesitation. | • Shaft spinning backwards relative to command • High-current shuddering or locking | Video recording of shaft rotation; CAN command/feedback sync log. |
| 05M-B-002 | Resolver Angle Offset Burn-In | Execute the inverter's automatic resolver alignment routine via service diagnostic command. | Calculated resolver alignment offset must fall within ± 1.0° electrical across 3 consecutive iterations. | Alignment value stabilizes; calibration parameter writes to non-volatile memory successfully. | Inconsistent or wandering offset readings across sequential alignment routines. | Diagnostic tool confirmation capture; parameter memory dump file. |
| 05M-B-003 | Balanced Phase Sine Wave Audit | Spin the motor shaft at a constant low speed (500 RPM). Scope active phase current lines. | Phase current amplitudes across U, V, W must balance within ≤ 3% of each other. THD must remain within supplier specs. | Clean, symmetrical sinusoidal current waves are captured on the scope traces. | • Severely distorted or clipped phase current waves • Single-phase current dropouts | High-bandwidth oscilloscope screen capture of phase current probes. |
| 05M-B-004 | Dynamic Over-Speed Protection | Spin the motor up slowly. Temporarily lower the software over-speed limit threshold below current RPM. | The inverter control card must immediately trip on an over-speed fault, shut down gating, and drop to safe state. | Torque command drops to zero; motor shaft coasts freely to a stop without active braking resistance. | Inverter failing to cross-check real-world RPM against safety limit boundaries. | CAN log tracking motor RPM vs. inverter state bits during trip sequence. |
| 05M-B-005 | Watchdog Loss Under Rotation | While the uncoupled shaft is spinning at 500 RPM, disconnect the CAN_2 bus link. | The inverter power stage must drop out gating and disable torque output within ≤ 50 ms of frame loss. | Motor transitions to unpowered coast mode. Inverter flags critical communication loss error. | Motor continuing to spin or maintaining its last known active torque command. | Time-stamped scope trace of bus drop vs. phase current decay. |

### Gate 05M-B Exit Criteria

- The uncoupled, guarded motor shaft rotates smoothly in direct mechanical alignment with software direction commands.
- The resolver alignment offset parameter is calibrated, stable, and successfully written to non-volatile memory.
- Active phase currents form balanced three-phase sine waves with matching amplitudes and no severe distortion signatures.
- Dynamic safety limits (over-speed, over-current, and network watchdog losses) successfully interrupt power-stage gating within specification thresholds.
- All raw data logs, high-bandwidth current scope traces, calibration parameter printouts, and engineer validation signoffs are permanently archived in the Build Engine.

Crucial Milestone Authorization: Successful Gate 05M-B completion permits engineering review for Gate 05M-C (Controlled Low-Speed Traction Readiness).

### Next Gate: Gate 05M-C — Controlled Low-Speed Traction Readiness (Hunter preview)

Once no-load motor spin characteristics, phase alignments, and boundary protections are proven (Gate 05M-B), the system transitions out of uncoupled bench profiles and couples to the primary vehicle mechanical elements for the first time:

```
  ┌──────────────────────────────────────────────────┐
  │ Gate 05M-C — Controlled Low-Speed Traction       │
  └────────────────────────┬─────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[Mechanical Coupling Verification]    [Torque-Table Ramping Limits]
- Axle and gearbox lash audit         - Set micro-scale cabin pedal maps
- Rotational drag profile mapping    - Implement aggressive dI/dt clamps
- Multi-link grounding verification   - Low-speed regen braking validation
```

In Gate 05M-C, wheels and mechanical gear reductions are fully linked to the electric power plant under heavily restricted calibration limits. This gate governs the tracking of initial vehicle creep torque maps, mechanical driveline backlash profiling, verification of vehicle service braking counterforces, and validation of low-speed regenerative torque control structures before open-floor track operations are sanctioned.

Would you like to detail the specific torque ramp parameters, pedal travel transfer mapping, and structural chassis load criteria for Gate 05M-C next?
