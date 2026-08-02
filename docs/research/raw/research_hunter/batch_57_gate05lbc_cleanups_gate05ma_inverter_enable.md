# Research Hunter — batch 57 ("56:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_54_batch_57_verdict.md`.

---

## Gate 05L-B & 05L-C Technical Cleanups & Refinements

The following architectural updates and technical corrections are applied to Gates 05L-B and 05L-C to enforce precise engineering language and eliminate baseline topology assumptions:

### 1. Baseline Inverter Topology and Voltage Behavior

During the initial Main Negative contactor closure (05L-B-001), demanding an absolute 0.0V reading on the DC-link capacitor (V_caps) is structurally flawed. Depending on inverter/PDU component topologies, bleed resistor configurations, isolation measurement currents, or sensor noise references, a non-zero residual voltage or minimal leakage may be present.
Corrected Rule: There must be no unintended DC-link rise beyond the approved leakage/noise threshold. V_caps behavior must strictly match supplier-defined topology expectations.

### 2. Pre-Charge Timeout Limit Constraints

The timeout logic language is structurally inverted if it treats an inline counter crossing below a maximum threshold as the failure trigger.
Corrected Rule: If V_caps fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout window expires, the BMS/PDU aborts the sequence, opens all contactor and pre-charge outputs, logs a pre-charge timeout DTC, and blocks subsequent retries according to the approved retry policy.
Initial Observation Target: 500 ms. Final timeout remains supplier-defined.

### 3. Mechanical Contactor Dropout Timing

Using unmeasurable terms like "instantly" or "immediately" violates safety tracing requirements. Mechanical relays and contactors have definite arc suppression, coil de-energization, and physical spring return intervals.
Corrected Rule: The hardwired safety loop interrupts the contactor/pre-charge coil supply power. The physical contactor dropout timing must be actively measured via high-bandwidth tools and compared directly against the supplier-approved dropout target specification. No automatic retry is permitted.

---

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation

Operational Constraints: TRACTION INVERTER SWITCHING IS DISABLED, ZERO MOTOR RPM.

### Verification Matrix: Gate 05L-B

| Test ID | Scenario Description | Request Signal (VCU) | Actual Owner (BMS/PDU) | Feedback Signal | Measured HV Response | Abort / Failure Condition | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05L-B-001 | Main Negative Control Sequence | VCU broadcasts HV_Enable_Request = TRUE over CAN_3. | BMS/PDU validates pre-flight safety variables and energizes the Main Negative contactor coil line. | BMS/PDU polls Main Negative auxiliary mirror contact state. | Main Negative contactor mechanically closes. No unintended DC-link rise occurs beyond approved leakage/noise thresholds. V_caps must match supplier topology expectations. | Auxiliary feedback fails to transition high within ≤ 50 ms of coil drive. | CAN network log capturing request vs. feedback status bits; digital multimeter trace. |
| 05L-B-002 | Current-Limited Pre-Charge Engagement | VCU continues broadcasting HV_Enable_Request = TRUE. | BMS/PDU maintains Main Negative and energizes the Pre-Charge Relay coil loop. | BMS/PDU polls Pre-Charge auxiliary feedback status. | Current streams through R_pre. V_caps rises smoothly along a logarithmic curve matching: V_caps(t) = V_batt × (1 − e^(−t/RC)). | V_caps tracks an instantaneous step-voltage to pack potential (0 ms short-circuit indicator). | High-voltage differential scope capture of DC-link voltage rise profile. |
| 05L-B-003 | Delta-V Threshold Matching | VCU maintains HV_Enable_Request = TRUE. | BMS/PDU monitors ΔV. Once threshold condition is met, it commands Main Positive contactor closure. | BMS/PDU polls Main Positive auxiliary mirror contact state. | Main Positive contactor closes. Pre-Charge relay is de-energized. Live DC bus is established. | Main Positive coil is driven while the voltage delta condition is unsatisfied (ΔV > 5% of total V_batt). | Time-correlated log trace tracking V_batt, V_caps, and Main Positive Command status. |
| 05L-B-004 | Pre-Charge Timeout Protection | VCU broadcasts HV_Enable_Request = TRUE. | BMS/PDU attempts pre-charge sequence against an artificially induced bus leakage. | BMS/PDU monitors internal time counter and V_caps tracking. | V_caps fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout window expires (Initial target: 500 ms). | BMS/PDU aborts the sequence, opens contactor/pre-charge outputs, logs pre-charge timeout DTC, and blocks retry according to approved retry policy. | CAN error log capturing the exact time delta and pre-charge timeout DTC. |
| 05L-B-005 | Pre-Flight Contactor Weld Detection | VCU broadcasts initial boot sequencing status. | BMS/PDU executes pre-flight scan of auxiliary circuits before driving any coil lines. | BMS/PDU reads Main Positive mirror contact as "Closed" (simulated weld via hardware jump). | Coil drive lines are strictly maintained at absolute 0.0V. Power-up sequence is immediately blocked. | Any contactor coil driven while an unaligned, pre-power feedback state is asserted. | UDS fault register printout showing active contactor weld DTC lockout. |
| 05L-B-006 | Passive Stored Energy Decay | VCU transitions to HV_Enable_Request = FALSE (Normal Key-Off). | BMS/PDU opens Main Positive and Main Negative contactor coil lines. | BMS/PDU polls mirror contacts for complete open transition. | Main contactors open. High-voltage energy stored within C_link decays passively via internal bleeders. | V_caps remains above safe threshold (>60V DC) past the supplier-defined discharge window. | Continuous high-voltage scope monitoring capture of voltage decay over time. |
| 05L-B-007 | Manual Abort During Pre-Charge | VCU broadcasts HV_Enable_Request = TRUE; pre-charge active. | BMS/PDU actively cycling pre-charge loop. | Physical E-stop button is manually depressed during the active voltage rise phase. | Hardwired safety loop interrupts contactor/pre-charge coil supply power. | Dropout timing exceeds the supplier-approved dropout target. Automatic retries are executed. | Scope trace of control line drop; HV bus decay trace; E-stop event timestamp. |

### Gate 05L-B Exit Criteria

The system cannot exit Gate 05L-B unless:

- The pre-charge voltage rise curve conforms to the mathematically expected RC timeline without erratic steps, oscillations, or instant zero-resistance jumps.
- The Main Positive contactor closure is strictly locked out until the ΔV ≤ 5% target validation condition is verified by the BMS/PDU state machine.
- Pre-charge timeout constraints reliably abort the power-up sequence, isolate the pack, log a timeout DTC, and enforce the retry limit policy if thresholds expire.
- Contactor weld-detection logic successfully blocks coil drive signals when feedback lines show unaligned initialization states.
- The manual abort safety loop demonstrates a direct, hardware-driven drop-out of all contactor circuits within the supplier-approved timing target.
- All raw data logs, high-voltage scope captures, mathematical delta verifications, and engineering approvals are permanently archived.

Crucial Milestone Authorization: Successful Gate 05L-B completion permits progression to Gate 05L-C only.

---

## Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability

### 1. Repeat Cycle Stability & Thermal Recovery Rules

- Pre-Charge Resistor Thermal Protection: Rapid, consecutive cycling of the pre-charge circuit poses an immediate fire and component breakdown hazard due to excessive heat build-up inside the pre-charge resistor (R_pre). The BMS/PDU must enforce a mandatory cooling delay between cycles based on the supplier's thermal recovery specification.
- Pre-Charge Retry Limits: If the system fails to pre-charge on two consecutive attempts, the BMS/PDU must lock out further power-on requests. This lockout must persist across low-voltage ignition cycles and require an explicit diagnostic service tool clear command to unlatch.

### 2. Insulation Monitoring (IMD) Fault Injection

- Chassis Fault Response: While the high-voltage bus is established and stable, a real isolation fault must be introduced to the network using a specialized calibration tool that inserts a known impedance path between the live DC positive/negative rails and the chassis frame ground.
- Isolation Fault Interlock: The IMD must detect the isolation drop below the safety boundary threshold, broadcast the error state over the network bus, and cause the BMS/PDU to execute a controlled isolation shutdown.

### Verification Matrix: Gate 05L-C

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05L-C-001 | Normal Coordinated Shutdown | Send an internal power-down request via vehicle ignition off. Monitor contactor drop sequence. | Main Positive contactor must open first, followed by the Main Negative contactor within ≤ 50 ms. | Bus voltage decays cleanly via bleeders. No error codes are flagged on normal shutdown. | Main Negative contactor opening before Main Positive under normal load. | Time-stamped CAN bus transaction trace log. |
| 05L-C-002 | Pre-Charge Retry Limit Lockout | Force a pre-charge failure condition twice consecutively (e.g., maintain a temporary bleed path). | On the third power-on request, the BMS/PDU must refuse to drive the pre-charge or negative coils. | The system enters a hard "Pre-Charge Attempt Lockout" state. Coils remain unpowered. | The system allowing an infinite number of consecutive pre-charge cycles. | VCU/BMS diagnostic status register printout. |
| 05L-C-003 | Thermal Cool-Down Enforcement | Execute a successful pre-charge and shutdown cycle. Attempt an immediate re-power request. | The BMS/PDU must delay coil engagement until the pre-charge resistor thermal recovery timer has expired. | Power-up sequence pauses automatically until the cooling window criteria is met. | Pre-charge relay closing before the thermal delay timer has cleared. | Microcontroller internal variable timing log. |
| 05L-C-004 | Live IMD Fault Isolation | With the HV bus active, inject a resistance path between DC+ and chassis ground via test fixture. | The IMD must flag an isolation fault over CAN within the specified detection window. | BMS/PDU acts on the IMD fault, opens contactor channels, and enters a latched isolation fault state. | • System ignoring active isolation faults • Delayed shutdown exceeding safety limits | CAN trace showing IMD fault flag insertion vs. contactor open events. |
| 05L-C-005A | Weld Detection False Positive Check | Execute 10 consecutive nominal power-on and power-down cycles back-to-back with required cooling delays. | Evaluate auxiliary contact feedback profiles across all 10 cycles for mechanical bounce signatures. | 10 out of 10 cycles execute flawlessly without normal contactor bounce falsely triggering a weld fault code. | Spurious weld alarms caused by mechanical contact bounce during normal activation. | Statistical test run data log summary sheet. |
| 05L-C-005B | Weld Detection False Negative Check | While unpowered, apply a hardware jumper to force a closed state on the contactor mirror feedback line. | Attempt an HV power-on request. Monitor BMS/PDU outputs. | The simulated welded feedback state is always detected by the pre-flight scan, blocking coil drive signals. | Power-up routine proceeding or failing to catch the forced auxiliary mismatch. | Captured UDS fault register printout showing specific weld fault lock active. |

### Gate 05L-C Exit Criteria

The system cannot exit Gate 05L-C unless:

- Normal coordinated shutdowns drop out the Main Positive contactor channel prior to the Main Negative channel under all standard key-off cycles.
- Pre-charge retry limitations (≤ 2 attempts) and thermal cool-down timers are strictly enforced by the BMS/PDU firmware.
- Active IMD fault injection demonstrates an immediate, reliable system isolation shutdown when an isolation leak is introduced to the chassis ground layer.
- Zero false-positive weld faults from mechanical contact bounce are recorded across 10 sequential, back-to-back operational cycles.
- Simulated welded states are caught 100% of the time during pre-flight checks, successfully blocking re-energization.
- All cycle run data logs, thermal metrics, IMD response captures, and engineer validation signoffs are permanently archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05L-C completion satisfies the high-voltage distribution verification milestones and officially permits engineering review for Gate 05M-A (Inverter Enable Readiness / Zero-Torque Validation).

---

## Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation

This gate establishes the safe transition boundary between static high-voltage distribution testing and dynamic inverter drive operations. All high-voltage buses are energized, but the inverter gating signals are bound by software and hardware locks to prevent bridge switching, phase current generation, or magnetic field rotation.

This phase focuses exclusively on validating handshake synchronization, sensor plausibility, and zero-torque control tracking in the physical chassis.

```
                    [GATE 05M-A ENABLE READINESS LAYER]
           (HV Bus Established - NO INVERTER SWITCHING / 0 RPM)
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
[Handshake Alignment]       [Sensor Plausibility]       [Zero-Torque Safeguard]
- VCU ready state check     - Resolver offset baseline   - Gating commands locked
- Inverter response echo     - Temperature sensor telemetry - Drive request processing
- Timeout loops established  - Phase current offset zeroing - Confirm 0 Nm clamp
```

### 1. Inverter Handshake & Communications Coordination

- State Machine Alignment: The VCU and inverter control board must maintain strict state alignment over CAN_2. The inverter must not transition from Pre-Ready to Ready-to-Drive (gating enabled) unless the VCU explicitly transmits a serialized, authenticated enable token accompanied by a closed hardwired interlock circuit feedback confirmation.
- Network Boundary Diagnostics: If the heartbeat or watchdog signal from the VCU drops for >50 ms, the inverter control card must immediately drop its state to Safe-Off and discharge its gate driver power rails.

### 2. Sensor Offsets & Zero-Torque Enforcement

- Phase Current Sensor Calibration: With the inverter power stage disabled, the VCU reads the inverter's raw phase current telemetry lines. The system must execute an automatic offset zeroing routine to calibrate out analog reading drift. Any initial phase offset reading exceeding supplier spec limits flags an immediate initialization error.
- Resolver Alignment Verification: Read and log the static motor resolver position feedback. The system must verify that the resolver raw sin/cos signal tracking registers a stable baseline position without signal drift or electrical noise coupling from low-voltage chassis systems.
- Zero-Torque Request Verification: The VCU forces the commanded torque register value strictly to 0 Nm. The inverter internal control loop must register this demand, clamp its internal PWM duty cycles at null, and verify that actual phase current generation remains at zero.

### Verification Matrix: Gate 05M-A

| Test ID | Scenario Description | Evaluation & Testing Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05M-A-001 | Inverter Power-Up Handshake | Execute nominal HV power-up sequence to establish live DC bus. Cycle key to drive mode. | Inverter control card transitions cleanly through boot states and reports Pre-Ready on CAN_2. | Handshake bits match across network. Inverter stands ready for enable tokens. | • Inverter enabling gating paths automatically • Communication timeouts on boot | Time-stamped CAN trace of handshake initialization bytes. |
| 05M-A-002 | Phase Current Sensor Offset Zeroing | Query the inverter phase current calibration registers with gating disabled. | Phase current sensor offset readings must drift ≤ the supplier-defined noise specification. | Inverter nulls out analog reading offsets cleanly; system accepts sensor baselines. | Offset drift exceeding safety metrics, indicating hardware sensor degradation. | UDS register calibration dump file. |
| 05M-A-003 | Static Resolver Baseline Audit | Monitor the raw motor resolver position data over a 5-minute window with the vehicle static. | Resolver electrical angle reading must remain completely stable with zero signal deviation. | Static angular position is reported correctly without electromagnetic interference. | Resolver angular drift or noise spikes while the motor shaft is locked. | Resolver telemetry trace capture spreadsheet. |
| 05M-A-004 | Zero-Torque Command Verification | VCU clamps torque command byte at 0 Nm. Enable inverter state to active. | Inverter bridge power stage internal variables must confirm 0% PWM modulation across all legs. | DC bus voltage remains stable. Actual motor phase current readings measure 0.0 A. | • Inverter bridge switching or generating phase current • Spontaneous shaft movement | Inverter phase current trace log; CAN command byte log. |
| 05M-A-005 | Watchdog Disruption Response | Force a communication dropout by unplugging the CAN_2 bus link during the Pre-Ready state. | Inverter control loop must transition to Safe-Off state within ≤ 50 ms of the last valid frame. | Inverter disables enable loops, drops internal drive flags, and logs communication loss DTC. | Inverter holding its last known state or remaining in an active ready mode. | Oscilloscope capture of bus drop vs. inverter fault line transition. |

### Gate 05M-A Exit Criteria

The system cannot exit Gate 05M-A and proceed to Gate 05M-B (No-Load Motor Spin Validation) unless:

- The inverter state machine demonstrates complete synchronization with VCU software request protocols across CAN_2.
- Phase current sensor offsets are calibrated within supplier specifications and register stable null-point values.
- Static resolver angular telemetry confirms a clean, noise-free position baseline with zero coupled electromagnetic interference.
- Zero-torque command enforcement clamps PWM generation at null and guarantees zero active phase current generation.
- Network watchdog loops cleanly force the inverter control power stage to a Safe-Off mode within ≤ 50 ms of frame loss.
- All telemetry captures, calibration offsets, handshake data logs, and engineering signoffs are archived in the Build Engine.

### Next Gate: Gate 05M-B — No-Load Motor Spin Validation

Once zero-torque control stability and network synchronization are validated (Gate 05M-A), the commissioning sequence progresses to the first physical rotation of the traction motor under live potential:

```
  ┌──────────────────────────────────────────────────┐
  │ Gate 05M-B — No-Load Motor Spin Validation       │
  └────────────────────────┬─────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[Resolver Direction Checks]          [Phase Current Monitoring]
- Low-speed torque injection         - Monitor balanced three-phase sine waves
- Match encoder vs. resolver lines   - Verify V/Hz profile limits
- Confirm physical rotation vector   - Validate over-current trip loops
```

In Gate 05M-B, the motor shaft is uncoupled from the vehicle's secondary drivetrain elements. This gate governs the physical calibration of the resolver offset angle under low-torque spin profiles, verifies correct electrical phase rotation sequence, monitors active phase currents for harmonic distortion, and validates hardware-layer over-current protection response limits.
