Gate 05I-D — Low-Voltage End-to-End Bench Run & Integrated Fault Sequences
This subgate represents the culmination of the isolated bench-testing phase. Rather than evaluating isolated nodes or individual code blocks, Gate 05I-D exercises the entire integrated low-voltage system under dynamic, off-nominal operating conditions.
Every test scenario in this gate operates under a strict, non-negotiable global constraint:
CAN_1 Isolation = ACTIVE (V_TXD_CAN1 = Vcc recessive, 0 frames transmitted)
                                  [SYSTEM MONITORING LAYER]
                       +----------------------+----------------------+
                       v                                             v
          [CAN_1 Passive Snooping]                      [Isolated EV Display]
        - Probed at microcontroller                       - Translates active DTCs
        - Verified absolute silence                       - Real-time fault warnings
        - 0 Transmit / 0 ACK / 0 Active Errors            - Correct state machine visualizer
Integrated Fault Sequence Matrix
Columns: Test ID | Scenario | Initial Bench State | Trigger / Fault Injection | Expected Coordinated Safety Cascade | Display Action | CAN_1 Status | Pass/Fail Verification Criteria
05I-D-001 | Accelerator & Brake Override (APTO) | Active Drive State. APPS commanded to 50%. | Press and hold Brake Pedal input (>10% brake pressure) while holding APPS at 50%. | VCU overrides throttle request, drops commanded torque to 0 Nm, and flags an override state within configured bench target window. | "Brake Override Active". | Remains completely silent (no active frames, V_TXD_CAN1 = Vcc). | Torque drops to 0 Nm within <= 100 ms of brake assertion. Normal throttle does not recover until APPS is returned to <5%.
05I-D-002 | Torque Request + HVIL Open | Active Drive State. VCU commanding active torque. | Open the physical HVIL circuit loop at the bench interface box. | VCU drops torque command to 0 Nm, opens safe-state logic lines, and enters a Safe Fault Lock state within configured bench target window. | "HVIL Open Circuit". | Silent (V_TXD_CAN1 = Vcc). | Torque command drops to 0 Nm within <= 50 ms (measured by timestamped CAN/scope trace).
05I-D-003 | Torque Request + BMS No-Discharge | Active Drive State. VCU commanding active torque. | BMS logic board asserts a "No-Discharge" fault frame on CAN_3. | VCU reads the fault flag, drops torque command to 0 Nm, and enters a soft-shutdown state within configured bench target window. | "BMS Fault - Discharge Inhibited". | Silent (V_TXD_CAN1 = Vcc). | VCU transitions to zero-torque within <= 100 ms of receiving the BMS error frame.
05I-D-004 | Torque Request + Inverter Fault | Active Drive State. VCU commanding active torque. | Inverter logic board asserts an internal hardware fault flag on CAN_2. | VCU halts active control loop, enters a Safe-Fault state, and opens the main line contactor requests within configured bench target window. | "Inverter System Fault". | Silent (V_TXD_CAN1 = Vcc). | Torque commands cease. Interlock request line drops to logic low within <= 20 ms (measured by timestamped CAN/scope trace).
05I-D-005 | Torque Request + CAN_2 Heartbeat Loss | Active Drive State. VCU commanding active torque. | Physically disconnect the CAN_2 bus harness or halt inverter periodic frames. | VCU detects loss of inverter communication, commands 0 Nm, transitions to Comm Fault state, and records DTC within configured bench target window. | "Inverter Comm Lost". | Silent (V_TXD_CAN1 = Vcc). | State machine transitions to Comm Safe state within <= 100 ms of the last expected frame.
05I-D-006 | Charge Plug Insertion During Drive | Active Drive State. VCU commanding active torque. | Simulate charge plug insertion by asserting the Charge Proximity/Pilot hardware line. | VCU recognizes charger-plug active during drive-state simulation, declares illegal-state fault, drops torque request to zero, blocks drive-enable logic, and blocks charge-path enablement until safe state is restored. | "Drive Error: Charger Connected". | Silent (V_TXD_CAN1 = Vcc). | Torque drops to 0 Nm in <= 50 ms. VCU blocks all contactor closure signals to the charge port interface.
05I-D-007 | E-Stop During Active Torque | Active Drive State. VCU commanding active torque. | Depress the physical Bench E-stop button (breaks logic supply loop to line contactors). | Hardwired E-stop loop owns physical low-voltage interruption. VCU observes feedback loss, commands torque-zero on isolated CAN_2 if still powered, logs E-stop fault, and latches restart lockout. | "Emergency Stop Active". | Silent (V_TXD_CAN1 = Vcc). | Software torque command matches hardware state drop within <= 50 ms to prevent inverter voltage spikes.
05I-D-008 | Brownout During Active Fault Latch | Active Drive State. System in a critical software-latched fault state. | Drop the main bench 12V supply to 6.0V for 1.0 s, then ramp back up to 12.0V. | VCU preserves active fault state in non-volatile memory through the power dip. Upon reboot, it recovers to the Safe-Fault Lock state. | "Fault Recovery: System Latched". | Silent (V_TXD_CAN1 = Vcc). | System does not clear the active latch on boot. Contactor drive signals remain locked in open/disabled states.
05I-D-009 | Service Clear Attempt During Fault | System in active Safe-Fault Lock state with physical fault present. | Send a UDS clear diagnostic information (0x14) command via the diagnostic tool. | VCU rejects the clear request as long as the physical fault stimulus remains active. | "Clear Rejected - Active Fault Present". | Silent (V_TXD_CAN1 = Vcc). | VCU returns NRC 0x22 (Conditions Not Correct) or clears and instantly re-latches the DTC in < 10 ms.
05I-D-010 | Sleep Request with Stuck-Awake Node | System operating nominally. Sleep command initiated (Ignition OFF). | Inject persistent background traffic on CAN_2 representing a babbling/stuck inverter transceiver. | VCU attempts sleep transition. Detects continuous traffic/current draw. Logs a "Stuck Awake" DTC, and isolates local power networks. | "Entering Power Save - Stuck Node". | Silent (V_TXD_CAN1 = Vcc). | VCU transitions to sleep within 5.0 seconds of command. VCU_sleep_current_target <= 1.0 mA (initial bench target); Total_system_sleep_current_target <= 4.0 mA (initial bench target).
Gate 05I-D Exit Criteria
The system cannot exit Gate 05I-D unless:
CAN_1 silence is proven across all integrated fault cascades.
Torque-zero behavior is observed within configured bench target windows.
Fault latches survive brownout and power-cycle tests.
Service clear commands cannot clear active physical or unresolved safety faults.
Display warnings match the active fault state.
All raw logs, scope captures, CAN traces, firmware hashes, harness revisions, and reviewer signoffs are archived.
Crucial Threshold Warning: Successful Gate 05I-D completion permits engineering review for controlled low-voltage vehicle fitment only.
Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness
This gate marks the transition from the synthetic lab bench to physical vehicle chassis integration. At this boundary, no high-voltage (HV) systems are connected or energized. This stage strictly verifies mechanical fitment, electrical routing safety, grounding integrity, and silent vehicle-bus integration before any low-voltage power-on checks are executed on-vehicle.
                  [VEHICLE CHASSIS FITMENT BOUNDARY]
          (Physical LV Harness Installation - NO HV CONNECTED)
                                   |
       +---------------------------+---------------------------+
       v                           v                           v
[Harness & Route Protection] [Grounding & Shielding]     [Low-Voltage LOTO]
- No pinching/chafing        - Single-point isolation    - Physical lockouts
- Minimum bend radius        - Shield terminations verified - Service disconnects
- Heat/abrasion protection   - Ground bond resistance    - No Ford CAN disturbance
1. Mechanical & Routing Verification
Harness Protection & Routing: The VCU and integrated test logic harnesses must be routed along designated structural paths. Wiring must maintain a clearance of >= 50 mm from moving components (steering shafts, suspension joints) and >= 100 mm from potential heat sources. Minimum bend radiuses must be verified at all connector strain reliefs.
Chafing & Pinch Point Audit: Inspect all wire entry points through bulkheads. Double-sided rubber grommets must be seated securely, and high-wear areas must be wrapped in abrasion-resistant braided sleeving.
Service & Tool Access: VCU hardware, diagnostic ports, and test breakout panels must be physically accessible with standard service tools without requiring the removal of structural elements or safety covers.
2. Electrical & Grounding Integrity
Chassis Ground Bonding: Low-voltage logic grounds must terminate at designated chassis ground studs. Resistance between the VCU logic ground pins and the primary battery ground terminal must measure < 0.1 ohm.
Shield Integrity: Communication bus shields (CAN_2, CAN_3, and diagnostics) must be continuous, insulated, and terminated at a single ground reference point to prevent ground loops.
Parasitic 12V Draw in Chassis: With all low-voltage nodes installed in-vehicle and the ignition turned off, the total parasitic current draw from the 12V battery must be verified against the chassis target.
3. Safety Controls & Silent Bus Integration
No Ford Bus Disturbance: Connect the VCU CAN_1 transceiver to the OEM Ford CAN network. With the vehicle ignition turned on, verify that the VCU generates zero active frames, error flags, or ACK signals. The OEM vehicle must operate without triggering network-related DTCs or dash warnings.
Lockout/Tagout (LOTO): Physical HV lockouts and mechanical service disconnects must be installed and verified in their disconnected, locked state. No HV connection points may be exposed or uninsulated.
Verification Matrix: Gate 05J
Columns: Test ID | Domain | Evaluation Procedure | Target Measurement Criteria | Expected Safe Output | Blocked States (MUST NEVER OCCUR) | Proof Artifact
05J-001 | Physical Routing & Chafing Audit | Trace all low-voltage wire paths from VCU to sensors, displays, and logic interfaces. | Verify clearances: >= 50 mm from moving parts, >= 100 mm from hot zones. No wire tension at full lock. | Complete clearance; no tight wires or sharp bends. | Wire tension on full suspension travel / Contact with moving chassis parts | Photo-documentation log of routing path and connector boots.
05J-002 | Ground Bond Resistance | Measure resistance from the VCU chassis case and ground pins to the primary chassis battery ground post using a micro-ohmmeter. | Resistance must be < 0.1 ohm. | Clean, low-impedance path to ground. | Ground loop path or resistance >= 0.1 ohm. | Micro-ohmmeter test record sheet.
05J-003 | Parasitic 12V Draw (In-Chassis) | Place a current clamp or inline ammeter at the primary 12V battery terminal. Initiate sleep transition. | Total sleep current draw must be <= 4.0 mA (matching the bench-validated system target). | Total system enters low-power sleep within <= 2.0 seconds. | In-vehicle parasitic draw >4.0 mA after 5.0 seconds. | Ammeter recording over 10-minute sleep duration.
05J-004 | CAN_1 Silence (Chassis Verification) | Connect the VCU to the OEM Ford CAN bus network. Monitor the bus with a diagnostic scanner. | Observe zero active frame transmission or ACK interference from the VCU on the OEM network. | No OEM vehicle faults or communications DTCs triggered on the Ford cluster. | VCU asserting dominant state on Ford CAN / Ford cluster lighting up with network errors | Ford-side OBD-II diagnostic scan report (clean status).
05J-005 | Lockout/Tagout Verification | Perform physical audit of all high-voltage connection points and safety isolations. | Verify all HV orange connectors are physically unplugged, capped, and tagged. Verify the manual service disconnect (MSD) is removed and locked. | Complete mechanical isolation of the high-voltage system. | Uncapped HV terminals / MSD installed or unlocked | Completed and signed LOTO safety audit checklist.
Gate 05J Exit Criteria
The system cannot exit Gate 05J and proceed to Gate 05K (Low-Voltage Vehicle Power-On) unless:
Mechanical installation of the VCU, harness, and displays is complete with zero interference or chafing risk.
Grounding integrity is physically verified at < 0.1 ohm connection resistance.
No Ford network disruption is confirmed via diagnostic scanning.
Physical LOTO is verified and signed off for the entire HV powertrain loop.
