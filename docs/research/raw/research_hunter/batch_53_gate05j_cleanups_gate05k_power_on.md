# Research Hunter — batch 53 ("52:75")

**Archived 1:1 as delivered by the owner via chat.** Immutable evidence
(Constitution, Article I). Quoted text, ASCII diagrams, and numeric values
are Hunter-supplied and unverified against any source document. The owner
framing that preceded this payload and the owner's verdict that followed it
are archived at `../owner_reviews/review_50_batch_53_verdict.md`.

---

## Gate 05J Technical Cleanups & Refinements

The following architectural updates and technical corrections are applied to Gate 05J to maintain trace evidence and verify network safety before introducing secondary systems onto the vehicle bus.

### 1. CAN_1 Vehicle Connection Prerequisites

To eliminate the risk of frame collisions, bus corruption, or unwanted diagnostic requests upon physical vehicle bus connection, the following prerequisites must be verified, logged, and signed off:

- Gate 05H Baseline Integration Execution: Verify that the isolated transceiver listen-only baseline testing is complete and archived.
- Gate 05I-C Communication Silence Execution: Verify that the dynamic application-layer silence proof is complete and archived.
- Microcontroller Register Verification: A firmware register dump must prove that zero transmission mailboxes are allocated for the CAN_1 peripheral and that the hardware CAN controller is strictly set to silent/listen-only mode.
- Physical Monitoring Configuration: The high-bandwidth oscilloscope probe configuration must remain actively connected to the VCU physical TXD pin during initial connection sequences.
- OEM Baseline Diagnostic Scan: A complete diagnostic vehicle scan across all Ford controllers must be executed and saved prior to connecting the VCU network lines.

### 2. Network Scan Sequence & Comparison

Verification of bus integrity must not rely on a "clean cluster" or the lack of visible dashboard warning lamps. A dual-stage scan protocol is required:

- Baseline OBD/Ford Scan: Execute a full network diagnostic read across all OEM control modules before VCU connection. Record all pre-existing diagnostic trouble codes (DTCs).
- Physical Connection: Connect the VCU to the OEM Ford CAN network in its passive listen-only mode.
- Post-Connection Scan: Re-run the full network diagnostic read across all modules.
- Differential Analysis: Compare before and after scans. The delta must show zero new network faults, zero communications dropouts (U-codes), and zero active error frames logged by Ford controllers.

### 3. Chassis Parasitic Draw Disambiguation

To prevent confusing OEM module sleep currents with the electric vehicle conversion architecture, parasitic drain measurements must isolate conversion-added loads:

- OEM_baseline_sleep_current: Measured at the 12V battery terminal with the OEM vehicle fully asleep, prior to conversion harness integration.
- conversion_added_sleep_current: Isolated measurement of the low-voltage conversion harness distribution loop. Target: ≤ 4.0 mA initial conversion-added target.
- total_vehicle_sleep_current: The final, absolute system draw measured at the primary 12V battery terminal post sleep transition.
- Equation: total_vehicle_sleep_current = OEM_baseline_sleep_current + conversion_added_sleep_current

---

## Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness

This gate marks the formal transition from the synthetic lab bench to physical vehicle chassis integration. At this boundary, no high-voltage (HV) systems are connected or energized. This stage strictly verifies mechanical fitment, electrical routing safety, grounding integrity, and silent vehicle-bus integration before any low-voltage power-on checks are executed on-vehicle.

```
                  [VEHICLE CHASSIS FITMENT BOUNDARY]
          (Physical LV Harness Installation - NO HV CONNECTED)
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       ▼                           ▼                           ▼
[Harness & Route Protection] [Grounding & Shielding]     [Low-Voltage LOTO]
- No pinching/chafing        - Single-point isolation    - Physical lockouts
- Minimum bend radius        - Shield terminations verified - Service disconnects
- Heat/abrasion protection   - Ground bond resistance    - No Ford bus disturbance
```

### 1. Mechanical & Routing Verification

- Harness Protection & Routing: The VCU and integrated test logic harnesses must be routed along designated structural paths. Wiring must maintain a clearance of ≥ 50 mm from moving components (steering shafts, suspension joints) and ≥ 100 mm from potential heat sources. Minimum bend radiuses must be verified at all connector strain reliefs.
- Chafing & Pinch Point Audit: Inspect all wire entry points through bulkheads. Double-sided rubber grommets must be seated securely, and high-wear areas must be wrapped in abrasion-resistant braided sleeving.
- Service & Tool Access: VCU hardware, diagnostic ports, and test breakout panels must be physically accessible with standard service tools without requiring the removal of structural elements or safety covers.

### 2. Electrical & Grounding Integrity

- Chassis Ground Bonding: Low-voltage logic grounds must terminate at designated chassis ground studs. Resistance between the VCU logic ground pins and the primary battery ground terminal must measure < 0.1 Ω.
- Shield Integrity: Communication bus shields (CAN_2, CAN_3, and diagnostics) must be continuous, insulated, and terminated at a single ground reference point to prevent ground loops.
- Parasitic 12V Draw in Chassis: With all low-voltage nodes installed in-vehicle and the ignition turned off, the total parasitic current draw from the 12V battery must be verified against the chassis target.

### 3. Safety Controls & Silent Bus Integration

- No Ford Bus Disturbance: Connect the VCU CAN_1 transceiver to the OEM Ford CAN network. With the vehicle ignition turned on, verify that the VCU generates zero active frames, error flags, or ACK signals. The OEM vehicle must operate without triggering network-related DTCs or dash warnings.
- Lockout/Tagout (LOTO): Physical HV lockouts and mechanical service disconnects must be installed and verified in their disconnected, locked state. No HV connection points may be exposed or uninsulated.

### Verification Matrix: Gate 05J

| Test ID | Domain | Evaluation Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05J-001 | Physical Routing & Chafing Audit | Trace all low-voltage wire paths from VCU to sensors, displays, and logic interfaces. | Verify clearances: ≥ 50 mm from moving parts, ≥ 100 mm from hot zones. No wire tension at full lock. | Complete clearance; no tight wires or sharp bends. | • Wire tension on full suspension travel • Contact with moving chassis parts | Photo-documentation log of routing path and connector boots. |
| 05J-002 | Ground Bond Resistance | Measure resistance from the VCU chassis case and ground pins to the primary chassis battery ground post using a micro-ohmmeter. | Resistance must be < 0.1 Ω. | Clean, low-impedance path to ground. | Ground loop path or resistance ≥ 0.1 Ω. | Micro-ohmmeter test record sheet. |
| 05J-003 | Parasitic 12V Draw (In-Chassis) | Place a current clamp or inline ammeter at the primary 12V battery terminal. Initiate sleep transition. | Total sleep current draw must be ≤ 4.0 mA (matching the bench-validated system target). | Total system enters low-power sleep within ≤ 2.0 seconds. | In-vehicle parasitic draw >4.0 mA after 5.0 seconds. | Ammeter recording over 10-minute sleep duration. |
| 05J-004 | CAN_1 Silence (Chassis Verification) | Connect the VCU to the OEM Ford CAN bus network. Monitor the bus with a diagnostic scanner. | Observe zero active frame transmission or ACK interference from the VCU on the OEM network. | No OEM vehicle faults or communications DTCs triggered on the Ford cluster. | • VCU asserting dominant state on Ford CAN • Ford cluster lighting up with network errors | Ford-side OBD-II diagnostic scan report (clean status). |
| 05J-005 | Lockout/Tagout Verification | Perform physical audit of all high-voltage connection points and safety isolations. | Verify all HV orange connectors are physically unplugged, capped, and tagged. Verify the manual service disconnect (MSD) is removed and locked. | Complete mechanical isolation of the high-voltage system. | • Uncapped HV terminals • MSD installed or unlocked | Completed and signed LOTO safety audit checklist. |

### Gate 05J Exit Criteria

The system cannot exit Gate 05J unless:

1. VCU, display, and low-voltage harness are physically mounted without chafing, pinch points, heat exposure, or moving-part interference.
2. Grounding and shielding are verified against approved target profiles.
3. Ford baseline scan and post-connection scan show no new network faults caused by the passive VCU connection.
4. CAN_1 TXD pin remains inactive during all in-chassis passive monitoring checks.
5. Conversion-added parasitic draw is measured and within the approved target.
6. All HV connectors remain disconnected, capped, tagged, and locked out.
7. All logs, photos, scans, scope traces, firmware/register dumps, harness revisions, and reviewer signoffs are archived.

Crucial Milestone Authorization: Successful Gate 05J completion permits Gate 05K only: Low-Voltage Vehicle Power-On / No-HV Commissioning.

---

## Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning (FIRST VERSION — superseded per owner, keep the second)

This gate governs the first formal power-on sequence of the conversion systems inside the physical vehicle chassis. All high-voltage energy storage and distribution units remain completely mechanically isolated, locked out, and unpowered.

This phase focuses entirely on verifying real-world signal distribution, driver command inputs, logic loop feedback, and network synchronization across the in-chassis low-voltage components.

```
                    [GATE 05K POWER-ON FLOW]
            (NO HIGH-VOLTAGE CONNECTED OR ENERGIZED)
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
 [12V Power Distribution]  [Driver Safety Loops]   [Network Interlock Sync]
 - Active key-on sweep     - Throttle correlation  - Inverter logic awake
 - Branch circuit loads    - Brake override check  - BMS logic awake
 - Voltage stability check - Shifter state limits  - Safe warning broadcast
```

### 1. In-Chassis Low-Voltage Power Distribution Checkout

- Key-On Sequencing & Wake Logic: Apply 12V auxiliary power to the chassis. Cycle the vehicle ignition switch between OFF, Accessory, Run, and Start positions. Verify that all conversion logic modules (VCU, BMS auxiliary board, inverter logic control card) boot in the correct sequence within configured window limits.
- Voltage Drop & Load Stability: Monitor the 12V power distribution rail during module initialization and low-voltage auxiliary sweeps (such as engaging water pumps or thermal management cooling fan relays). Voltage drop at the VCU input pins must not exceed 0.5V from nominal branch supply voltage.

### 2. Driver Input & Component Calibration (Chassis Layer)

- Dual APPS Linear Correlation: Calibrate the physical accelerator pedal assembly inside the cabin. Verify that the VCU maps pedal travel from 0% to 100% smoothly, tracking the channel-to-channel voltage delta to ensure that real-world pedal mounting does not introduce mechanical tracking skew.
- Brake Switch & Shift Interlock Processing: Verify that the VCU correctly processes the physical brake pedal switch transitions and prevents the shifter module from changing states unless the brake circuit is actively closed.

### 3. Integrated Vehicle Network Validation

- Internal Bus Synchronization: Verify that the VCU captures active, clean communications from the chassis-mounted inverter logic board over CAN_2 and the BMS logic module over CAN_3. Frame counter errors and bus timeouts must remain at zero over extended monitoring windows.
- Instrument Cluster & Warning Alignment: Confirm that the in-cabin display correctly reflects the real-time vehicle status variables, system fault alerts, and diagnostic codes broadcasted during the checkout.

### Verification Matrix: Gate 05K (first version)

| Test ID | Scenario Description | Evaluation Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|
| 05K-001 | Ignition Wakeup & Power Sequencing | Cycle the ignition switch from OFF to RUN. Measure the timing delta of module wake states. | All conversion nodes must be fully awake and communicating within ≤ 200 ms of ignition high signal. | Nodes initialize cleanly; internal communication streams stabilize. | • Node boot delay >200 ms • Initial hardware lockup states | Time-stamped CAN network log and scope capture of wake lines. |
| 05K-002 | In-Chassis APPS Calibration Check | Sweep the cabin accelerator pedal from 0% to 100% travel. Monitor internal VCU variables. | Channel 1 and Channel 2 voltage signals must maintain tracking correlation within ≤ 5% of each other. | VCU scales pedal request linearly to 100% target without error flags. | • Mismatched limits tracking • Spurious out-of-range safety trips | Calibration tool data register sweep dump file. |
| 05K-003 | Chassis Brake-Throttle Plausibility | Assert throttle pedal to >25%, then press the physical cabin brake pedal. | VCU must drop the active internal torque request target to 0 Nm within ≤ 100 ms of brake closure. | Commanded inverter torque drops to zero; override code is generated. | • Non-zero torque target processing • Vehicle drive state remaining active | High-speed CAN log capturing pedal inputs vs. torque target bytes. |
| 05K-004 | In-Chassis Safety Loop Continuity | Measure voltage at each test node along the hardwired cabin safety loop (E-stop, crash inertia switch, line interlocks). | Voltage drop across the entire safety loop run must be ≤ 0.2V under full relay coil load. | Full supply voltage arrives at the terminal coil simulator interfaces. | High loop resistance causing intermittent dropouts or low voltage. | Multimeter voltage drop inspection records. |
| 05K-005 | Diagnostic Read & Clear Boundary | Inject a mock low-voltage fault (e.g., unplug a sensor), verify latching, then clear via UDS command. | The VCU must maintain the latch until cleared, and reject clearance if the fault remains physically active. | Returns NRC 0x22 if fault is active; clears cleanly if fault is resolved. | Software clear bypassing an active physical fault state. | UDS session command response raw capture log. |

### Gate 05K Exit Criteria (first version)

The system cannot exit Gate 05K and proceed to Gate 05L (Controlled HV First-Energization) unless:

- All conversion-related low-voltage nodes power up, initialize, and enter stable operational states within timing specs.
- In-cabin driver inputs (APPS, Brake, Shifter) are calibrated, track accurately, and pass safety plausibility checks in the chassis.
- The hardwired safety loop maintains solid circuit continuity under active load with minimal voltage drop.
- The passive network link to the Ford bus continues to show zero unauthorized frame transmissions, error assertions, or ACK disruptions.
- All commissioning logs, diagnostic scans, calibration data files, and engineering signoffs are archived.

Crucial Milestone Authorization: Successful Gate 05K completion permits progression to Gate 05L only: Controlled HV First-Energization, subject to formal engineering review and on-site safety protocol activation.

---

## Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning (SECOND VERSION — owner: keep this one)

This gate governs the first formal power-on sequence of the conversion systems inside the physical vehicle chassis. All high-voltage (HV) energy storage and distribution units remain completely mechanically isolated, locked out, and unpowered via physical LOTO.

This phase focuses strictly on verifying real-world signal distribution, power-state behavior, driver inputs, logic feedback loops, and network synchronization across the in-chassis low-voltage components prior to any HV connection.

```
                                [IN-CHASSIS LOW-VOLTAGE BOUNDARY]
                       (NO HIGH-VOLTAGE CONNECTED - PHYSICAL LOTO ACTIVE)
                                                │
       ┌────────────────────────────────────────┼────────────────────────────────────────┐
       ▼                                        ▼                                        ▼
 [Power State Verification]           [Chassis Bus Verification]            [Safety Lockout Enforcement]
 - Ignition Off / Acc / Run           - CAN_1 Listen-Only Passivity          - Contactor drive lines open
 - VCU & Display boot sequences       - CAN_2 & CAN_3 isolated activity      - Zero-torque targets verified
 - Sleep/Parasitic draw profile       - UDS Diagnostic session access        - Fault latch validation
```

### Verification Matrix: Gate 05K (second version)

Every test scenario in this gate operates under the active precondition that the CAN_1 transceiver configuration remains strictly listen-only, verified via register checks and physical TXD monitoring.

| Test ID | Scenario Description | Initial Chassis State | Trigger Action / Input | Expected Coordinated Logic Behavior | Target Measurement Criteria | Blocked States (MUST NEVER OCCUR) | Proof Artifact |
|---|---|---|---|---|---|---|---|
| 05K-001 | Ignition-Off / Quiescent Draw | Low-voltage harness connected; key removed. | Measure baseline conversion current draw at the isolated 12V distribution block. | VCU and peripheral nodes remain in low-power sleep state. No bus traffic present. | conversion_added_sleep_current ≤ 4.0 mA after ≤ 2.0 seconds. | • Spurious wakeups • Stuck-awake state (>4.0 mA) • Active CAN frame transmission | Current logger trace over 15-minute window. |
| 05K-002 | Accessory State Transition | Ignition switch turned to ACC position. | Rotate key to Accessory mode. Monitor VCU and display lines. | Display node initializes; VCU checks low-voltage rail limits. Vehicle system status indicates non-driving state. | Display fully operational within ≤ 500 ms. VCU remains in basic logic mode. | • Main contactor driver pins changing state • Spurious error flags | Boot time-stamp measurement; CAN analyzer trace. |
| 05K-003 | Key-On / Run Awake Sequence | Ignition switch turned to RUN position. | Rotate key from ACC to RUN. | VCU wakes cleanly, initializes application loops, and wakes CAN_2 and CAN_3 networks. Display shows primary telemetry home screen. | VCU and display fully operational within ≤ 200 ms of RUN transition. | • Initialization delays (>200 ms) • Transceiver latch-up faults | Oscilloscope capture of IGN pin voltage vs. CAN active traffic. |
| 05K-004 | CAN_1 Passive Monitoring Check | VCU active in RUN state; OEM Ford vehicle running normal diagnostic cycles. | Monitor Ford network via diagnostic port while VCU is fully awake on CAN_2/CAN_3. | VCU CAN_1 transceiver runs in absolute silent mode. Generates zero transmissions, active errors, or ACK bits. | V_TXD_CAN1 = Vcc (recessive high state) continuously. | • VCU asserting dominant bits on CAN_1 • Dropped packets on Ford network | High-bandwidth scope capture of VCU CAN_1 TXD pin; Ford scan tool log. |
| 05K-005 | Isolated Network Communication | VCU active in RUN state. | Audit background traffic on CAN_2 and CAN_3 networks. | VCU establishes active, error-free communication loops with chassis-mounted inverter and BMS logic boards. | Frame counter errors and bus timeouts must remain at zero over a 5-minute window. | Bus errors, active error frames, or frame drop rates >0%. | Network error register statistics log. |
| 05K-006 | UDS Diagnostic Session Access | VCU active in RUN state; Diagnostic tool connected. | Initiate UDS diagnostic sessions (0x10, 0x22, 0x2E) to request internal chassis parameters. | VCU grants read access to all configured PIDs, calibration values, and low-voltage interlock states. | Response latency for UDS frames must be ≤ 50 ms. | VCU application loop slowing down or dropping control frames during diagnostics. | UDS transaction log capture text file. |
| 05K-007 | High-Voltage Lockout Enforcement | VCU active in RUN state; Shifter moved into DRIVE. | Attempt to command drive mode and apply throttle input (50% APPS). | VCU rejects drive-enable request because HV interlocks are open. VCU forces commanded torque to zero and blocks contactor drivers. | Commanded torque remains strictly at 0 Nm. Contactor drive pins remain at 0.0V. | • Non-zero torque target processing • Contactor command lines changing state (>0.5V) | Real-time CAN data trace of torque request bytes vs. physical pin meter read. |
| 05K-008 | Ford System Error Immunity | VCU active in RUN state; vehicle systems running for 30 minutes. | Perform a full Ford vehicle diagnostic scan across all OEM modules. | Ford factory modules show no new communication codes (U-codes), network dropouts, or module errors. | Zero new DTCs logged in OEM modules compared to the Gate 05J baseline scan. | Any newly introduced Ford network fault or module communication warning. | Post-power-on Ford factory tool diagnostic scan report. |
| 05K-009 | In-Chassis Fault Latch Behavior | VCU active in RUN state. Inject a low-voltage sensor fault (e.g., break an APPS wire). | Induce the physical fault condition, transition ignition to OFF, wait for sleep, then turn ignition back to RUN. | VCU latches the fault, displays the matching DTC, and must maintain the active fault state continuously across the power cycle. | Fault code present immediately on boot; system prevents drive pre-conditions from executing. | Fault state clearing or self-resetting due to ignition cycle alone. | VCU non-volatile memory error log read before and after key cycle. |

### Gate 05K Exit Criteria (second version)

The system cannot exit Gate 05K unless:

- VCU, display, and low-voltage conversion nodes transition cleanly across all power modes (OFF, ACC, RUN) within configured timing windows.
- Absolute CAN_1 silence is verified via physical TXD scope probes and network logs with zero OEM Ford DTC disruptions or U-code side-effects.
- No HV contactor activity or torque commands are produced under any driver input sequence or illegal state requests.
- Conversion-added parasitic draw drops to ≤ 4.0 mA initial chassis target within ≤ 2.0 seconds of sleep entry.
- Critical safety fault latches survive an ignition power cycle without clearing or causing state corruption.
- All diagnostics records, scope captures, vehicle scan differentials, and test engineer validations are archived.

Crucial Milestone Authorization: Successful Gate 05K completion permits progression to Gate 05L only: Controlled HV First-Energization.

### Next Gate: Gate 05L — Controlled HV First-Energization (Hunter preview)

Once the low-voltage network, power states, and safety lockout logic are structurally proven in the chassis (Gate 05K), the system transitions out of the unpowered-HV boundaries into the first physical energization phase:

```
  ┌──────────────────────────────────────────────────┐
  │ Gate 05L — Controlled HV First-Energization      │
  └────────────────────────┬─────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[Pre-Charge & Isolation]            [HVIL & Contactors Response]
- Isolation Monitoring Check        - Contactor weld detection checks
- Pre-charge duty cycle verification - Sequence timing validation
- DC bus voltage tracking (V_caps)  - Hardwired loop trip response
```

In Gate 05L, physical high-voltage locks are systematically removed under strict safety oversight. This gate will govern the sequential closing of the pre-charge circuit, validation of isolation metrics, monitoring of bus voltage rise times, and coordinated contactor logic under live potential for the first time.

Would you like to detail the specific voltage scaling verifications, insulation monitoring metrics, and exact pre-charge timing parameters for Gate 05L next?
