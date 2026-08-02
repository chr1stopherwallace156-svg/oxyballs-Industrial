# Research Hunter — batch 56 ("55:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, equations, and numeric
values are Hunter-supplied and unverified against any source document. The
owner framing that preceded this payload and the owner's verdict that followed
it are archived at `../owner_reviews/review_53_batch_56_verdict.md`.

---

## Gate 05L-B — Technical Prerequisites & Control Ownership Rules

Before executing the high-voltage (HV) first-energization sequence, the architectural control hierarchy and specific parametric current limits must be explicitly declared and stored in the Build Engine.

### 1. Architectural Control Ownership Rules

To eliminate conflation between software requests and physical execution authority, control ownership is strictly partitioned:

- VCU Role: Operational Requester and Monitor only. The VCU aggregates driver commands, low-voltage interlock states, and vehicle status to broadcast high-level system requests over CAN_2/CAN_3. It does not directly drive the high-voltage contactor coils unless specifically assigned direct control authority by an approved supplier architecture.
- BMS / PDU Role: The designated Logical and Physical Owner of the contactor and pre-charge execution state machines. The BMS/PDU receives the VCU network requests, evaluates local safety variables (cell temperatures, voltages, isolation indices), and directly commands the low-side/high-side drivers for the contactor coils.
- Hardwired Safety Loop Role: The absolute physical Owner of the Emergency Interruption Path. This circuit bypasses all software state machines and directly cuts coil supply power to drop the contactors in an emergency fault or manual shutdown event.

### 2. Pre-Charge Current Limit & Thermal Boundaries

The system is strictly blocked from entering Gate 05L-B until the following values are extracted from component datasheets, evaluated, and approved by engineering sign-off:

- Pre-charge Resistor Resistance (R_pre): SUPPLIER_DEFINED [Ω]
- Resistor Energy Pulse Rating (E_pulse): SUPPLIER_DEFINED [Joules]
- Total DC-Link Capacitance (C_link): SUPPLIER_DEFINED [µF]
- Pack Maximum Voltage (V_batt_max): ENGINEERING_APPROVED [V]
- Expected Peak Pre-Charge Current (I_peak = V_batt_max / R_pre): Must not exceed supplier limits.
- Resistor Thermal Recovery Interval: Mandatory cooling period required between consecutive pre-charge cycles.
- Pre-Charge Retry Limit: Maximum number of consecutive software-allowed retries before locking out the system (Initial Target: ≤ 2 attempts before hard lockout).

---

## Gate 05L-B — Controlled HV First-Energization / Current-Limited Pre-Charge Observation

This gate governs the first physical execution of the current-limited pre-charge cycle under live potential. This phase is purely observational and intended to analyze DC-link capacitor voltage rise curves, verify contactor coordination, validate weld-detection algorithms, and prove manual abort paths.

Operational Constraints: TRACTION INVERTER SWITCHING IS DISABLED, ZERO MOTOR RPM.

```
                           [GATE 05L-B PRE-CHARGE CYCLE PROFILE]
                                     (Observational Only)
                                              │
      ┌───────────────────────────────────────┼───────────────────────────────────────┐
      ▼                                       ▼                                       ▼
[Request Signal]                     [Actual Owner Logic]                   [Measured HV Response]
- VCU requests HV enablement        - BMS/PDU checks constraints           - Pre-charge relay engages
- Broadcasts via CAN_3               - Cycles negative & pre-charge coils    - V_caps tracks along RC curve
```

### Verification Matrix: Gate 05L-B

| Test ID | Scenario Description | Request Signal (VCU) | Actual Owner (BMS/PDU) | Feedback Signal | Measured HV Response | Abort / Failure Condition | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05L-B-001 | Main Negative Control Sequence | VCU broadcasts HV_Enable_Request = TRUE over CAN_3. | BMS/PDU validates pre-flight safety variables and energizes the Main Negative contactor coil line. | BMS/PDU polls Main Negative auxiliary mirror contact state. | Main Negative contactor mechanically closes. Inverter DC-link voltage (V_caps) remains at 0.0V. | Auxiliary feedback fails to transition high within ≤ 50 ms of coil drive. | CAN network log capturing request vs. feedback status bits; digital multimeter trace. |
| 05L-B-002 | Current-Limited Pre-Charge Engagement | VCU continues broadcasting HV_Enable_Request = TRUE. | BMS/PDU maintains Main Negative and energizes the Pre-Charge Relay coil loop. | BMS/PDU polls Pre-Charge auxiliary feedback status. | Current streams through R_pre. V_caps rises logs a smooth RC curve matching: V_caps(t) = V_batt × (1 − e^(−t/RC)). | V_caps tracks an instantaneous step-voltage to pack potential (0 ms short-circuit indicator). | High-voltage differential scope capture of DC-link voltage rise profile. |
| 05L-B-003 | Delta-V Threshold Matching | VCU maintains HV_Enable_Request = TRUE. | BMS/PDU monitors ΔV. Once threshold condition is met, it commands Main Positive contactor closure. | BMS/PDU polls Main Positive auxiliary mirror contact state. | Main Positive contactor closes. Pre-Charge relay is de-energized. Live DC bus is established. | Main Positive coil is driven while the voltage delta condition is unsatisfied (ΔV > 5% of total V_batt). | Time-correlated log trace tracking V_batt, V_caps, and Main Positive Command status. |
| 05L-B-004 | Pre-Charge Timeout Protection | VCU broadcasts HV_Enable_Request = TRUE. | BMS/PDU attempts pre-charge sequence against an artificially induced bus leakage. | BMS/PDU monitors internal time counter and V_caps tracking. | V_caps fails to cross ≥ 95% of V_batt due to the bleed path. | Time counter crosses ≤ 500 ms timeout limit. BMS/PDU drops all coils and flags fault. | CAN error log capturing the exact time delta and pre-charge timeout DTC. |
| 05L-B-005 | Pre-Flight Contactor Weld Detection | VCU broadcasts initial boot sequencing status. | BMS/PDU executes pre-flight scan of auxiliary circuits before driving any coil lines. | BMS/PDU reads Main Positive mirror contact as "Closed" (simulated weld via hardware jump). | Coil drive lines are strictly maintained at absolute 0.0V. Power-up sequence is immediately blocked. | Any contactor coil driven while an unaligned, pre-power feedback state is asserted. | UDS fault register printout showing active contactor weld DTC lockout. |
| 05L-B-006 | Passive Stored Energy Decay | VCU transitions to HV_Enable_Request = FALSE (Normal Key-Off). | BMS/PDU opens Main Positive and Main Negative contactor coil lines. | BMS/PDU polls mirror contacts for complete open transition. | Main contactors open. High-voltage energy stored within C_link decays passively via internal bleeders. | V_caps remains above safe threshold (>60V DC) past the supplier-defined discharge window. | Continuous high-voltage scope monitoring capture of voltage decay over time. |
| 05L-B-007 | Manual Abort During Pre-Charge | VCU broadcasts HV_Enable_Request = TRUE; pre-charge active. | BMS/PDU actively cycling pre-charge loop. | Physical E-stop button is manually depressed during the active voltage rise phase. | Hardwired safety loop breaks logic supply power to coils. All contactors drop out instantly. | Any automatic re-trials or delayed contactor dropouts (>20 ms from manual E-stop hit). | Scope trace of control line drop; HV bus decay trace; E-stop event timestamp. |

### Gate 05L-B Exit Criteria

The system cannot exit Gate 05L-B unless:

- The pre-charge voltage rise curve conforms to the mathematically expected RC timeline without erratic steps, oscillations, or instant zero-resistance jumps.
- The Main Positive contactor closure is strictly locked out until the ΔV ≤ 5% target validation condition is verified by the BMS/PDU state machine.
- Pre-charge timeout thresholds (≤ 500 ms) reliably abort the power-up sequence, isolate the pack, and enforce a hard restart lockout upon a failed attempt.
- Contactor weld-detection logic successfully blocks coil drive signals when feedback lines show unaligned initialization states.
- The manual abort safety loop demonstrates a direct, hardware-driven drop-out of all contactor circuits within ≤ 20 ms of an E-stop event.
- All raw data logs, high-voltage scope captures, mathematical delta validations, and engineering approvals are permanently archived.

Crucial Milestone Authorization: Successful Gate 05L-B completion permits progression to Gate 05L-C only: Controlled HV Shutdown, Discharge, and Re-Energization Repeatability.

---

## Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability

This gate validates the stability, cycle repeatability, and off-nominal fault-handling capability of the high-voltage power sequencing loop. Before the vehicle can move to traction system rotation, the battery management and power distribution networks must prove they can cycle between active states, normal shutdowns, emergency breaks, and active fault lockdowns reliably without triggering false negatives or components exceeding thermal budgets.

```
                    [GATE 05L-C CYCLE STABILITY BOUNDARY]
          (Repeated Power-On/Off Validation - ZERO MOTOR RPM)
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       ▼                           ▼                           ▼
[Shutdown & Active Bleed]   [Lockout & Retry Limits]    [IMD Injection Response]
- Normal sequence decay     - Enforce retry threshold   - Inject real chassis fault
- E-stop path validation    - Validate cooling delays   - Verify immediate isolation
```

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
| 05L-C-005 | No Weld Detection False Negatives | Execute 10 consecutive nominal power-on and power-down cycles back-to-back with cooling delays. | Evaluate auxiliary contact consistency across all 10 cycles. Check for signal bouncing. | 10 out of 10 cycles execute flawlessly with zero false weld detections or timing hiccups. | Intermittent false weld alarms triggered by normal contactor mechanical bounce. | Statistical test run data log sheet summary. |

### Gate 05L-C Exit Criteria

The system cannot exit Gate 05L-C unless:

- Normal coordinated shutdowns drop out the Main Positive contactor channel prior to the Main Negative channel under all standard key-off cycles.
- Pre-charge retry limitations (≤ 2 attempts) and thermal cool-down timers are strictly enforced by the BMS/PDU firmware.
- Active IMD fault injection demonstrates an immediate, reliable system isolation shutdown when an isolation leak is introduced to the chassis ground layer.
- Zero false-negative weld faults are observed over 10 sequential, back-to-back operational cycles.
- All cycle run data logs, thermal metrics, IMD response captures, and engineer validation signoffs are permanently archived in the Build Engine.

Crucial Engineering Authorization: Successful Gate 05L-C completion satisfies the high-voltage distribution verification milestones and officially permits engineering review for Gate 05M (Traction Inverter Control Loop & Low-Speed Spin Validation).
