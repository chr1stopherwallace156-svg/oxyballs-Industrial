Part 1: The Blocked Questions Ledger
Gate
Question / Parameter Gap
Source / Expert Needed
Why It Matters
What Process It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
08
Exact high-voltage isolation fault resistance detection threshold (R_iso in Ohm/V)
Pack BMS & Inverter Firmware Suppliers
Sets the safety trigger point before an automated shutdown response occurs during an isolation loss.
Unlocks the isolation monitoring system compliance validation logic.
NeedsSupplierData
Prior to bench integration
Standard UN ECE R100 or FMVSS 305 baseline regulatory defaults (100 Ohm/V DC, 500 Ohm/V AC).
08
Minimum remaining hydraulic circuit volume/pressure reserve curve under complete auxiliary pump failure
Brake System Upfitter / Hydraulic Engineer
Dictates the number of legal power-assisted stops remaining under full mechanical vehicle load.
Unlocks the physical staging plan for closed-course vehicle brake safety testing.
NeedsBrakeEngineerMapping
Prior to dyno testing
Theoretical accumulator pressure decay equations based on volume displacement.
Part 2: Clean Build Engine Status
Gate 07C — Weight / Axle Load / Center of Gravity
Status: CALCULATOR_FRAMEWORK_READY / PHYSICAL_DATA_REQUIRED
Prerequisite Rule: Gate 07C must reach a status of PHYSICAL_VERIFICATION_REQUIRED or better before any dynamic track or closed-course road testing under Gate 08 is authorized.
Gate 08 — Failure Modes + Test Procedures
Status: GATE_08_FRAMEWORK_STARTED
Known: Core failure modes are mapped to a structured registry requiring progressive step-by-step verification (Simulation -> HIL -> Bench/Dyno -> Closed-Course).
Still Blocked: Exact supplier firmware response timing metrics, specialized electrical isolation thresholds, and formal engineering test plans.
Part 3: Engineering Equations & Mathematical Framework (Prerequisite Library)
The plain-text mathematical equations below are locked into the calculation engine and are referenced by Gate 08 as prerequisite conditions:
W = LF + RF + LR + RR
F = LF + RF
R = LR + RR
CGh = (R * WB) / W
CGt = (((RF - LF) * Tf / 2) + ((RR - LR) * Tr / 2)) * (1 / W) (Right side positive / Left side negative)
Delta_R = (w * x) / WB
Delta_F = w - Delta_R (Negative weight -w for removed masses)
Part 4: High-Voltage Safety & Core Regulatory Rules
CRITICAL HIGH-VOLTAGE SAFETY COMPLIANCE MANDATE
Simulation pass does not equal physical test pass.
HIL pass does not equal road-test approval.
Live high-voltage (HV) physical testing is strictly prohibited without: a documented Lockout/Tagout (LOTO) program, appropriate Class 0/00 insulated PPE, an approved engineering test plan, a dedicated manual emergency shutdown system (ESD), and an executive engineering signoff. No timing thresholds or compliance marks are assumed or pre-calculated.
Part 5: Failure Mode and Effects Analysis (FMEA) Registry
1. HVIL Open / Service Disconnect Fault
Subsystem: High-Voltage Safety
Trigger: Low-voltage loop continuity break at manual service disconnect (MSD) or component harness connector.
Hazard: Live high-voltage pins exposed or unsecured connectors un-mating while current is flowing (arcing risk).
Detection Method: VCU / BMS digital input transition (high-to-low logic shift).
Expected System Response: Command primary pack contactors to open, log diagnostic trouble code (DTC), inhibit drivetrain inverter.
Driver Warning: Red master warning lamp illumination + audible alert + "HV FAULT - STOP SAFELY" dashboard message.
Test Method Sequence: Simulation -> Hardware-in-the-Loop (HIL) -> Bench Test (Chassis Level LOTO)
Required Proof Artifact: Oscilloscope capture of low-voltage loop break relative to contactor dropping open.
Pass/Block Criteria: Pass: Contactors transition to open state following loop break without structural component arcing. Block: Contactors remain closed or weld.
Required Source / Verification Status: Firmware Engineer / NeedsExactTimingSource
Missing Supplier Data: Exact firmware latency maps for the loop-to-contactor opening sequence.
2. Isolation Resistance Fault
Subsystem: High-Voltage Safety / Isolation Monitoring
Trigger: Isolation monitoring insulation value drops below the lower boundary threshold between the high-voltage bus and vehicle chassis ground.
Hazard: Vehicle chassis becomes live; severe shock hazard to occupants or service technicians.
Detection Method: High-voltage isolation monitoring insulation asset periodic calculation reading via CAN.
Expected System Response: Log internal fault code. If vehicle is stationary: prevent contactor closure. If vehicle is in motion: allow controlled pull-over state, then prevent restart.
Driver Warning: Amber or Red alert illumination + "ISOLATION FAULT DETECTED" diagnostic message.
Test Method Sequence: Simulation -> HIL Simulation (Resistor Injection network).
Required Proof Artifact: CAN log showing detection of precision test resistor injection value matching the safety fault limit.
Pass/Block Criteria: Pass: Diagnostic flag trips within defined parameters when a calibrated resistance leak is applied. Block: Failure to register isolation drop below the safety limit.
Required Source / Verification Status: BMS/VCU Integration Supplier / NeedsSupplierData
Missing Supplier Data: Exact programmable resistance threshold limits (Ohm/V).
3. Contactor Weld
Subsystem: High-Voltage Distribution / Contactors
Trigger: Internal structural welding or fusion of contactor tips due to excessive current or severe arcing.
Hazard: High-voltage bus remains live to auxiliary systems or inverters even after an open command or system shutdown.
Detection Method: Voltage differential check across contactor plates during pre-charge or shutdown sequencing.
Expected System Response: Lock out the reciprocal contactor, inhibit drive commands, flash latching system fault.
Driver Warning: Red master safety warning + "SYSTEM ERROR - DO NOT ATTEMPT TO DRIVE" dashboard notice.
Test Method Sequence: Simulation -> HIL Simulation.
Required Proof Artifact: VCU debug trace logging a pre-charge timeout/welded contactor fault code during system boot.
Pass/Block Criteria: Pass: System locks out further high-voltage commands and prevents complementary contactor activation. Block: Drive loop attempts to operate with a stuck contactor.
Required Source / Verification Status: VCU Integration Group / NeedsSupplierData
Missing Supplier Data: Minimum voltage differential window parameters for contactor open verification.
4. Pre-Charge Failure
Subsystem: High-Voltage Distribution / Inverter Stage
Trigger: Inverter DC-link capacitance fails to charge up to minimum threshold within the designated startup window.
Hazard: Extreme in-rush current damage to primary contactors, resulting in severe contactor degradation or immediate welding.
Detection Method: Voltage comparison checks across the primary battery pack vs. the inverter input side during startup.
Expected System Response: Command pre-charge contactor open, keep primary main contactors open, abort system power-up.
Driver Warning: Amber service lamp + "STARTUP FAILED - SYSTEM REBOOT REQUIRED" dashboard message.
Test Method Sequence: Simulation -> HIL Bench Simulation.
Required Proof Artifact: Automated VCU capture log tracking the aborted startup cycle due to pre-charge timeout.
Pass/Block Criteria: Pass: System safely aborts startup if voltage fails to clear the boundary curve. Block: Main contactors slam shut despite uncharged bus.
Required Source / Verification Status: Power Electronics Engineer / NeedsSupplierData
Missing Supplier Data: Maximum allowable pre-charge duration time curves.
5. Battery Overcurrent
Subsystem: Energy Storage System (BMS)
Trigger: Current draw from the main battery pack exceeds the maximum safe continuous or peak current limit values.
Hazard: Accelerated thermal runaway, battery cell degradation, or immediate high-voltage fuse failure.
Detection Method: Precision internal current shunt sensor telemetry reporting to the primary master BMS.
Expected System Response: Throttle traction inverter torque request map, open contactors if overcurrent exceeds the maximum safety fuse curve.
Driver Warning: Red flashing master warning + "POWER REDUCED - EXCESSIVE LOAD" dashboard warning.
Test Method Sequence: Simulation -> HIL Configuration Verification.
Required Proof Artifact: Transmitted CAN bus current log tracking the exact millisecond torque reduction occurs relative to the current spike.
Pass/Block Criteria: Pass: Inverter cuts power or contactors disconnect safely according to the programmed load matrix. Block: Current exceeds cell ratings without system intervention.
Required Source / Verification Status: Pack Cell Manufacturer Data / NeedsSupplierData
Missing Supplier Data: Multi-tier transient overcurrent time-duration threshold tables.
6. Inverter Shutdown During Regen
Subsystem: Drivetrain / Braking Systems
Trigger: Inverter encounters an internal fault (e.g., overvoltage, overtemperature, gate driver error) while in an active regenerative braking state.
Hazard: Instant loss of braking force on the drive axle, leading to an unexpected forward pitch-moment weight transfer or stopping distance expansion.
Detection Method: Loss of inverter status heartbeat or direct torque transmission response flag over the CAN bus.
Expected System Response: Zero out the regen torque request, request immediate mechanical friction brake compensation, flag hydraulic backup systems.
Driver Warning: Red brake warning light + "REGEN UNAVAILABLE - PUSH BRAKE PEDAL" dashboard notification.
Test Method Sequence: Simulation -> HIL -> Dyno / Wheel-Lift Testing.
Required Proof Artifact: Vehicle controller time-stamped logs showing torque drop matched with hydraulic pressure actuation.
Pass/Block Criteria: Pass: Friction brakes seamlessly blend or step in to fulfill the vehicle's stopping requirement without wheel-lock up. Block: Brake force drops completely with no compensation.
Required Source / Verification Status: Brake Systems Upfitter Engineer / NeedsBrakeEngineerMapping
Missing Supplier Data: Brake pedal stroke sensor to hydraulic fluid volume conversion ratio tables.
7. ABS / ESC Interaction with Regen Loss
Subsystem: Vehicle Dynamics / Active Chassis Control
Trigger: Factory anti-lock braking (ABS) or electronic stability control (ESC) event triggers while electric motor is performing heavy regenerative braking.
Hazard: Rear-axle wheel slip, lockup, spin-out, or loss of vehicle control due to fighting torque requests between friction and regen systems.
Detection Method: ABS/ESC active flag state changes detected via factory CAN network monitoring.
Expected System Response: Drop regenerative braking torque to zero immediately, returning full slip-control authority back to the factory hydraulic ABS module.
Driver Warning: Standard factory ABS/ESC dashboard indicator lamp flashing.
Test Method Sequence: Simulation -> HIL Integration Testing -> Dyno Testing.
Required Proof Artifact: Synchronized high-speed CAN logs mapping the ABS active status bit against the inverter torque drop response.
Pass/Block Criteria: Pass: Regen drops out instantly upon ABS activation, enabling factory stability controls to manage tire slip. Block: Motor torque fights or delays ABS modulation.
Required Source / Verification Status: Chassis Calibration Group / NeedsBrakeEngineerMapping
Missing Supplier Data: Proprietary factory ABS/ESC intervention CAN identifiers and broadcast rates.
8. EHPS Pump Failure
Subsystem: Auxiliary Steering System
Trigger: Complete power loss, internal lockup, or mechanical shaft failure within the Electro-Hydraulic Power Steering (EHPS) pump assembly.
Hazard: Immediate, unexpected increase in steering effort, which can lead to handling difficulties on heavy Class 4/5 commercial trucks.
Detection Method: Low-voltage current loop feedback drops out or low pressure sensor switch changes state.
Expected System Response: Send high-priority dashboard alarm, trigger redundant auxiliary pump circuit if equipped.
Driver Warning: Flashing steering wheel icon + audible alert chime + "STEERING ASSIST FAILURE - STOP VEHICLE" warning.
Test Method Sequence: Simulation -> Low-Energy Bench Pressure Test -> Low-Speed Closed-Course Empty Run (Post Review).
Required Proof Artifact: Signed engineering evaluation checking physical steering effort thresholds under full auxiliary pump un-powering.
Pass/Block Criteria: Pass: System registers the failure condition within bounds and maintains mechanical manual steering tracking. Block: Hydraulic fluid path binds, locking up steering mechanical inputs.
Required Source / Verification Status: Upfitter Systems Group / NeedsPhysicalVerification
Missing Supplier Data: Real-world fluid flow rate curves under hot continuous duty cycle operations.
9. Brake Assist Pressure Loss
Subsystem: Auxiliary Pneumatic / Hydraulic Braking Assist
Trigger: Assist system pressure drops below minimum threshold due to a line rupture, check-valve failure, or pump failure.
Hazard: Drastic increase in the pedal force required to slow down the vehicle, resulting in longer stopping distances that may violate FMVSS 105.
Detection Method: Analog or digital fluid/air pressure sensor monitoring on the brake accumulator circuit.
Expected System Response: Activate auxiliary backup pressure source, limit vehicle max top speed, log high-priority diagnostic fault.
Driver Warning: Red master brake warning lamp + loud continuous cabin buzzer + "LOW BRAKE ASSIST PRESSURE" warning.
Test Method Sequence: Simulation -> Hydraulic Bench Accumulator Isolation Test -> Low-Energy Low-Speed Track Test.
Required Proof Artifact: Pressure transducer tracking logs proving system warning activation occurs before assist reserve falls below baseline thresholds.
Pass/Block Criteria: Pass: System alerts the driver with enough auxiliary pressure reserve remaining to complete safe, assisted stops. Block: Pressure drops below safe levels without warning.
Required Source / Verification Status: Hydraulic Engineering Specialist / NeedsBrakeEngineerMapping
Missing Supplier Data: Minimum pressure requirement thresholds needed to satisfy FMVSS 105 stopping runs.
10. Steering Assist Pressure Loss
Subsystem: Steering Systems
Trigger: Structural fluid leak or hydraulic fitting failure resulting in a loss of line pressure to the primary steering gear assembly.
Hazard: Heavy, stiff steering response during low-speed maneuvers, increasing the risk of an accident in tight work zones.
Detection Method: Inline hydraulic line fluid pressure transducer out-of-bounds voltage feedback.
Expected System Response: Log system fault code, restrict maximum allowable motor acceleration rates to manage speed limits.
Driver Warning: Red indicator warning + "LOW STEERING PRESSURE - RESTRAIN SPEED" dashboard message.
Test Method Sequence: Simulation -> Mechanical Bench Pressure Decay Mapping.
Required Proof Artifact: Data logging chart showing fault code validation relative to physical system pressure drops.
Pass/Block Criteria: Pass: Warning is generated within parameters before the hydraulic fluid reservoir empties completely. Block: Fluid level or pressure drops below operational metrics without logging a fault.
Required Source / Verification Status: Chassis Controls Group / NeedsPhysicalVerification
Missing Supplier Data: Accurate fluid pressure baseline maps under peak lock-to-lock steering turns.
11. Low-Voltage DC-DC Brownout
Subsystem: Auxiliary Power / Low-Voltage Infrastructure
Trigger: Internal component failure within the high-voltage to low-voltage DC-DC converter, causing output voltage to drop below operational limits.
Hazard: Brownout or power loss to critical low-voltage vehicle controllers (VCU, ABS, steering pumps), leading to an uncommanded vehicle shutdown.
Detection Method: VCU monitoring of the low-voltage network rail input voltage pins.
Expected System Response: Switch system load tracking to the low-voltage backup buffer battery, shed non-essential loads, command an orderly vehicle stop.
Driver Warning: Low battery indicator + "LOW VOLTAGE SYSTEM ERROR - CHARGE FAULT" dashboard text.
Test Method Sequence: Simulation -> Low-Voltage Load Bench Shed Testing.
Required Proof Artifact: Multimeter and CAN logs mapping low-voltage rail decay trends against the system's load-shedding response.
Pass/Block Criteria: Pass: Backup battery system maintains power to safety-critical controllers long enough to bring the vehicle to a safe, controlled stop. Block: Critical systems drop offline immediately, causing a total blackout.
Required Source / Verification Status: Low Voltage System Integrator / NeedsSupplierData
Missing Supplier Data: Minimum input operating voltage cut-off points for the factory Ford modules.
12. Coolant Pump Failure
Subsystem: Thermal Management / Cooling Systems
Trigger: Mechanical stall, electrical open circuit, or impeller blockage within the primary power electronics or battery coolant loop pumps.
Hazard: Localized hot spots and rapid thermal buildup in the battery pack or inverters, which can lead to thermal runaway or component damage.
Detection Method: Missing pump speed feedback signal (PWM/LIN/CAN) or unexpected current draw metrics.
Expected System Response: Derate maximum traction torque capacity, increase auxiliary radiator fan speeds, modify cooling path routing.
Driver Warning: Amber service icon + "THERMAL MANAGEMENT FAULT - PERFORMANCE REDUCED" dashboard message.
Test Method Sequence: Simulation -> Component Level Bench Testing.
Required Proof Artifact: Telemetry logs proving that the inverter cuts motor power when a pump failure is detected.
Pass/Block Criteria: Pass: System reduces the thermal load to match the lost cooling capacity, protecting components from overheating. Block: System maintains full performance until components overheat and fail.
Required Source / Verification Status: Thermal Systems Group / NeedsSupplierData
Missing Supplier Data: Exact pump diagnostic fault code mapping and LIN bus telemetry definitions.
13. Battery/Inverter/Motor Overtemperature
Subsystem: Thermal Management / Powertrain
Trigger: Internal temperatures of core powertrain components climb past maximum operational safety limits due to extreme ambient or heavy operational loads.
Hazard: Permanent battery cell degradation, internal permanent magnet demagnetization, or power semiconductor breakdown.
Detection Method: Continuous monitoring of internal thermistor sensor arrays (NTC/PT100) embedded within components.
Expected System Response: Step-down power limits via an automated inverse thermal curve (derating engine), maximize cooling loop performance.
Driver Warning: Flashing thermal temperature indicator + "PROPULSION POWER REDUCED DUE TO OVERHEAT" dashboard alert.
Test Method Sequence: Simulation -> HIL Thermal Profile Overrides.
Required Proof Artifact: VCU debug logs proving that powertrain current limits decrease as simulated temperature inputs are increased.
Pass/Block Criteria: Pass: Thermal performance scaling prevents component temperatures from crossing absolute structural safety limits. Block: Powertrain continues running at full capacity until thermal failure occurs.
Required Source / Verification Status: Powertrain Component Suppliers / NeedsSupplierData
Missing Supplier Data: Absolute thermal derating curves and maximum component temperature limits.
14. CAN Communication Loss
Subsystem: Controls / Network Infrastructure
Trigger: Physical network wire open/short circuit, or bus errors causing a critical powertrain control node to stop communicating.
Hazard: Loss of control over torque commands, battery connection state, or driver display metrics, leading to an unpredictable vehicle state.
Detection Method: Node heartbeat timeout counters rolling over inside the receiving control module firmware.
Expected System Response: Command all affected powertrain nodes into a predefined safe state, zero out torque requests, safely open high-voltage contactors once vehicle is stopped.
Driver Warning: Master warning illumination + complete dashboard instrumentation freeze + "NETWORK ERROR - SAFE MODE ACTIVE" dashboard message.
Test Method Sequence: Simulation -> HIL Network Interruption Injection.
Required Proof Artifact: CAN log trace demonstrating a safe powertrain torque shutdown within designated time windows after a node heartbeat is dropped.
Pass/Block Criteria: Pass: Powertrain defaults to a safe, neutral torque condition without jumping or lunging when a network wire is disconnected. Block: Components lock into their last commanded state or behave unpredictably.
Required Source / Verification Status: Software Systems Architecture / NeedsSupplierData
Missing Supplier Data: Master timeout counter configuration parameters for each critical CAN message group.
15. Water Intrusion / IP Seal Failure
Subsystem: Enclosures / High-Voltage Structural Shells
Trigger: Breakdown of physical seals or gaskets on high-voltage enclosures (battery, inverter, or junction boxes), allowing water or moisture to enter.
Hazard: Internal electrical short circuits, high-voltage component arc flashes, or rapid loss of high-voltage isolation.
Detection Method: Enclosure internal moisture/humidity sensors or early-stage isolation monitoring resistance fault triggers.
Expected System Response: Prevent high-voltage system activation if detected at startup; trigger an immediate safe shutdown if an isolation fault develops while driving.
Driver Warning: Amber or Red safety warning lamp + "HV ENCLOSURE SYSTEM FAULT - SERVICE REQUIRED" dashboard message.
Test Method Sequence: Simulation -> Physical Bench Subsystem Seal Leak Testing (Zero Live HV Voltage).
Required Proof Artifact: Signed laboratory engineering test documentation verifying enclosure compliance with target IP67 / IP69K sealing standards.
Pass/Block Criteria: Pass: Enclosure integrity blocks external moisture or internal monitoring sensors catch moisture entry before an arc event occurs. Block: Water accumulates inside live enclosures without triggering any system alerts or protections.
Required Source / Verification Status: Mechanical Design Group / NeedsPhysicalVerification
Missing Supplier Data: Air-density leak test reference metrics and structural gasket compression profiles.
Part 6: Build Engine Step-by-Step Validation & Stage Gate Flow
 [STAGE 1: HARDWARE IDENTIFICATION]
   └── Confirm Donor Asset Selection (Platform 001A vs Platform 001B)
        │
 [STAGE 2: WEIGHT & CG CALCULATOR CHECK]
   └── Ensure Gate 07C Status == PHYSICAL_VERIFICATION_REQUIRED (All scale entries locked)
        │
 [STAGE 3: FAILURE MODE REGISTRY SIMULATION VALIDATION]
   ├── Run VCU Firmware Failure Model Simulations
   ├── Evaluate Isolation, Current, and Communication Drop-Out Scenarios
   └── IF Simulation Models Fail --> STATUS: BLOCK [Reason: Control Loop Logic Errors Found]
        │
 [STAGE 4: HARDWARE-IN-THE-LOOP (HIL) TESTING]
   ├── Flash Firmware onto HIL Test Benches
   ├── Inject Synthetic Low-Voltage and Communication System Faults
   └── IF HIL Waveform Response Latency In-Bounds == FALSE --> STATUS: BLOCK [Reason: Real-Time Hardware Timing Mismatch]
        │
 [STAGE 5: BENCH & DYNO ISOLATED VERIFICATION]
   ├── Mount Powertrain onto Dynamometer Systems (LOTO, PPE, and Sign-Off active)
   ├── Validate Inverter Regen Losses and Auxiliary Pump Pressure Drops Under Load
   └── IF Braking Force Shift Exceeds Safety Bounds --> STATUS: BLOCK [Reason: Insufficient Braking Compensation]
        │
 [STAGE 6: LOW-SPEED CLOSED-COURSE VEHICLE RUNS]
   ├── Track Test Empty Chassis Cab Assembly (Under 15 mph / 24 km/h)
   ├── Track Test Fully Loaded Upfit Configuration (Under 15 mph / 24 km/h)
   └── IF Dynamic Steering/Braking Stability Check Fails --> STATUS: BLOCK [Reason: FMVSS 105 Compliance Risk]
        │
 [STAGE 7: MOTOR VEHICLE SAFETY SIGN-OFF]
   └── STATUS: GATE_08_FRAMEWORK_STARTED --> Proceed to Gate 05 Controller Deep Dive
