Part 1: The Blocked Questions Ledger
Gate
Question / Parameter Gap
Source / Expert Needed
Why It Matters
What Process It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
08B
Specific test parameter setup values for high-current transient pulse injection routines
Inverter & Cell Manufacturer Application Engineers
Dictates the exact duration and amplitude of transient pulses required to validate overcurrent shutdown profiles.
Unlocks step-by-step programming parameters within the HIL test bench simulation matrix.
NeedsSupplierData
Prior to HIL script freeze
Generic SAE J2464 thermal/electrical abuse profile baselines.
08B
Exact hydraulic brake line pressure transducer signal scaling maps (V to PSI)
Brake System Component Manufacturer
Allows the central vehicle control unit to accurately log and monitor safety-critical brake assist degradation loops.
Unlocks the bench pressure calibration run and logging process.
NeedsBrakeEngineerMapping
Prior to bench physical setup
Physical mechanical pressure gauge comparison mapping across known pedal displacements.
Part 2: Clean Build Engine Status
Gate 07C — Weight / Axle Load / Center of Gravity
Status: CALCULATOR_FRAMEWORK_READY / PHYSICAL_DATA_REQUIRED
Prerequisite Rule: Gate 07C math core validation remains an absolute blocking prerequisite. Real-world wheel-scale tickets must be completed and logged prior to launching any physical vehicle-level track tests mapped under Gate 08B.
Gate 08B — Source-Backed Test Procedure Mapping
Status: GATE_08_FRAMEWORK_STARTED
Known: The core 15 failure modes are systematically aligned with recognized automotive testing standards (SAE, ISO, FMVSS, UN ECE).
Still Blocked: Supplier-specific threshold parameters, production-level engineering test plans, and physical verification data records.
Part 3: Failure Mode Source-Backed Test Reference Registry
1. HVIL Open / Service Disconnect Fault
Best Source: SAE J1742 (Connections for High Voltage On-Board Road Vehicle Electrical Power Systems)
Exact Quote: "The high voltage interlock loop (HVIL) shall be designed to protect personnel from hazard by ensuring that the high voltage circuit is broken prior to exposure of live parts."
Test Stage: Hardware-in-the-Loop (HIL) -> Bench Test (Chassis Level LOTO, zero live voltage)
Required Equipment: High-speed multi-channel digital storage oscilloscope, breakaway test harness, breakout box.
Required Proof Artifact: Time-correlated oscilloscope waveform capturing the exact duration from the physical low-voltage loop open signal to the control signal drop at the primary pack contactor coils.
Pass/Block Candidate: Pass: Complete control signal cut to the contactor coils following a loop breach before physical connector pin extraction can occur. Block: Continued coil excitation or delay in contactor command output.
Missing Supplier Data: Supplier firmware processing propagation delay specification sheets.
Verification Status: NeedsExactTimingSource
2. Isolation Resistance Fault
Best Source: UN ECE R100 / FMVSS 305 (Electric Vehicle Safety Requirements)
Exact Quote: "The isolation resistance over the high voltage bus shall be at least 100 Ohm/V for DC circuits and at least 500 Ohm/V for AC circuits."
Test Stage: Simulation -> HIL Simulation
Required Equipment: Programmable resistor decade box, isolated CAN bus analyzer tool, digital multimeter.
Required Proof Artifact: Serial CAN bus diagnostic log files showing the exact point the isolation alarm bit flags transition from 0 to 1 relative to the injected resistance load step.
Pass/Block Candidate: Pass: The isolation error diagnostic bit trips within established regulatory tolerances when the insulation resistance value falls below the calculated minimum limit. Block: System fails to register an active isolation drop or logs no diagnostic fault code.
Missing Supplier Data: Exact programmable insulation monitoring sensor tracking frequency parameters.
Verification Status: NeedsSupplierData
3. Contactor Weld
Best Source: SAE J2344 (Guidelines for Electric Vehicle Safety)
Exact Quote: "Systems shall be capable of detecting a welded contactor condition during the normal power-up or power-down sequence and preventing further high-voltage operation."
Test Stage: Simulation -> HIL Simulation
Required Equipment: HIL fault injection system matrix, vehicle diagnostic display interface tool.
Required Proof Artifact: VCU debug trace printout tracking the initialization cycle, demonstrating an explicit system abort and a hard contactor closure lockout state.
Pass/Block Candidate: Pass: System detects the simulated stuck-closed contactor state during startup and immediately blocks all pre-charge and power-up sequences. Block: System blindly continues through the startup sequence despite a welded contactor.
Missing Supplier Data: Core baseline voltage differential check parameters across the contactor terminals.
Verification Status: NeedsSupplierData
4. Pre-Charge Failure
Best Source: ISO 6469-3 (Electrically propelled road vehicles - Safety specifications - Part 3: Electrical safety)
Exact Quote: "Inrush currents during power-on sequences shall be limited to avoid damage to components, especially electrical contacts, or unintended activation of overcurrent protection devices."
Test Stage: Simulation -> HIL Bench Simulation
Required Equipment: High-voltage differential voltage probe, digital storage oscilloscope, programmable DC-link load bank simulator.
Required Proof Artifact: Oscilloscope capture of the DC-link voltage curve plotted over time, showing a safe timeout abort if the voltage fails to reach the required target threshold.
Pass/Block Candidate: Pass: System opens the pre-charge circuit and isolates the main high-voltage bus if the capacitor voltage stays below limits when the timer expires. Block: Main contactors engage despite an incomplete pre-charge cycle, causing an unsafe current spike.
Missing Supplier Data: Maximum pre-charge circuit pulse duration parameters from the power electronics documentation.
Verification Status: NeedsSupplierData
5. Battery Overcurrent
Best Source: SAE J2464 / UL 2580 (Batteries for Use in Electric Vehicles)
Exact Quote: "The battery system shall incorporate overcurrent protection devices to prevent cell damage or thermal hazards resulting from current levels exceeding design limits."
Test Stage: Simulation -> HIL Configuration Verification
Required Equipment: High-current programmable power supply simulator, precision current shunt calibrator device, CAN diagnostic logger.
Required Proof Artifact: High-speed CAN bus trace data showing an automatic inverter torque reduction or command-level contactor trip when current limits are crossed.
Pass/Block Candidate: Pass: Automated torque limits or contactor disconnection triggers match the programmed multi-tier current limit profile. Block: Measured load current exceeds cell safe limits without any torque reduction or system intervention.
Missing Supplier Data: Cell-level continuous and transient current profile data sheets.
Verification Status: NeedsSupplierData
6. Inverter Shutdown During Regen
Best Source: ISO 26262-4 (Functional Safety - Part 4: Product development at the system level)
Exact Quote: "The system shall transition to a safe state within the fault tolerant time interval (FTTI) if a fault is detected that compromises the safe delivery of braking torque."
Test Stage: Simulation -> HIL -> Dynamometer Testing (Zero live vehicle road testing)
Required Equipment: Chassis dynamometer system, break-out box, high-speed CAN logging equipment.
Required Proof Artifact: Time-aligned data charts mapping the loss of inverter torque feedback alongside the hydraulic brake line pressure step change.
Pass/Block Candidate: Pass: Drivetrain controller sets a neutral torque state immediately upon fault detection and logs the appropriate system error. Block: System commands erratic torque or locks up the drive axle.
Missing Supplier Data: Inverter internal torque decay curves under a sudden gate-driver shutdown event.
Verification Status: NeedsBrakeEngineerMapping
7. ABS / ESC Interaction with Regen Loss
Best Source: FMVSS 105 / ECE R13-H (Braking Requirements for Passenger and Commercial Vehicles)
Exact Quote: "The braking system shall be design-integrated such that the action of the regenerative braking system does not adversely affect the vehicle stability or anti-lock braking performance."
Test Stage: Simulation -> HIL Integration Testing -> Dynamometer Testing
Required Equipment: Automated ABS wheel speed wheel-slip simulator bench, CAN bus signal generation deck.
Required Proof Artifact: CAN log analysis documenting the precise duration between the ABS active flag transition to true and the corresponding reduction of regenerative braking torque requests to zero.
Pass/Block Candidate: Pass: Regenerative torque drops out within specified timeframes upon an active ABS flag, transferring complete slip control to the hydraulic brakes. Block: Regenerative torque continues to fight or delay the hydraulic ABS modulation cycles.
Missing Supplier Data: Exact CAN bus message identifiers and transmission cycle speeds for the factory Ford ABS module.
Verification Status: NeedsBrakeEngineerMapping
8. EHPS Pump Failure
Best Source: ISO 5010 (Earth-moving machinery - Rubber-tyred machines - Steering requirements) / FMVSS 121/135 steering baselines
Exact Quote: "If an auxiliary power source fails, steering capability shall be maintained to allow the vehicle to be steered to a controlled stop."
Test Stage: Simulation -> Low-Energy Bench Pressure Testing -> Low-Speed Closed-Course Empty Run (Post Review)
Required Equipment: Mechanical steering effort torque sensor wheel, dual-beam fluid pressure gauges, safe low-speed test track.
Required Proof Artifact: Signed engineering test sheets logging measured driver steering input force against hydraulic pressure decay following pump power-down.
Pass/Block Candidate: Pass: Vehicle retains standard manual mechanical steering tracking within safe manual steering effort limits during pump power loss. Block: Power failure leads to mechanical binding or lockup within the steering gear box.
Missing Supplier Data: Flow rate and pressure requirements for the steering box across its complete mechanical range of travel.
Verification Status: NeedsPhysicalVerification
9. Brake Assist Pressure Loss
Best Source: FMVSS 105 (Hydraulic and Electric Brake Systems)
Exact Quote: "The vehicle shall meet the stopping distance requirements with the engine stopped or with a failure in the power assist system."
Test Stage: Simulation -> Hydraulic Bench Accumulator Isolation Test -> Low-Energy Low-Speed Track Test
Required Equipment: Hydraulic pressure transducer probes, inline fluid flow monitoring meters, pedal force measurement strain gauge.
Required Proof Artifact: Automated test bench data curves tracking accumulator pressure decay against the activation points of driver warning indicators.
Pass/Block Candidate: Pass: Low-pressure warning triggers with sufficient residual accumulator volume to provide the required number of power-assisted backup stops. Block: Assist pressure drops below safe operational baselines without triggering a warning.
Missing Supplier Data: Minimum fluid volume displacement requirement tables for full brake caliper engagement.
Verification Status: NeedsBrakeEngineerMapping
10. Steering Assist Pressure Loss
Best Source: SAE J2672 (Hydraulic Steering Systems Safety and Performance)
Exact Quote: "Monitoring systems shall provide a timely warning to the vehicle operator upon a significant drop in steering system operating pressure."
Test Stage: Simulation -> Mechanical Bench Pressure Decay Mapping
Required Equipment: Inline fluid pressure sensors, electronic load cell sensors, CAN logging tools.
Required Proof Artifact: VCU diagnostic capture files proving that out-of-bounds transducer voltages generate a latching system fault.
Pass/Block Candidate: Pass: Low pressure fault states are correctly registered and logged before the fluid circuit pressure drops completely to zero. Block: Pressure crosses below safe operating minimums with no system fault logged.
Missing Supplier Data: Transducer voltage scaling maps over the pump's complete operational temperature range.
Verification Status: NeedsPhysicalVerification
11. Low-Voltage DC-DC Brownout
Best Source: ISO 16750-2 (Road vehicles - Environmental conditions and testing for electrical and electronic equipment - Part 2: Electrical loads)
Exact Quote: "The device shall continue to operate properly or transition cleanly to a safe state during and after an input voltage drop or brownout condition."
Test Stage: Simulation -> Low-Voltage Load Bench Shed Testing
Required Equipment: Programmable DC electronic load bank, variable DC power supply, high-speed multichannel data logger.
Required Proof Artifact: Voltage and current strip-chart data proving that non-essential electrical loads drop offline sequentially as voltage falls, keeping critical safety modules powered.
Pass/Block Candidate: Pass: Low-voltage backup battery maintains power to safety-critical modules long enough to bring the vehicle to an orderly stop. Block: Safety-critical controllers drop offline instantly, causing a complete system blackout.
Missing Supplier Data: Absolute minimum operating voltage thresholds for the factory Ford network modules.
Verification Status: NeedsSupplierData
12. Coolant Pump Failure
Best Source: IEC 60529 / ISO 16750-4 (Climatic loads on automotive electronics)
Exact Quote: "Thermal control loops shall monitor auxiliary components for performance degradation to prevent cascading thermal overstress of core powertrain electronics."
Test Stage: Simulation -> Component Level Bench Testing
Required Equipment: LIN/CAN bus development analysis tool, external flow sensor loops, thermal diagnostic data logger.
Required Proof Artifact: CAN diagnostic report logging a verified pump speed mismatch or communication timeout fault, accompanied by a reduction in inverter current draw.
Pass/Block Candidate: Pass: System detects a pump stall or signal loss and automatically limits power to prevent component overheating. Block: Component power throughput remains unchecked until catastrophic thermal failure occurs.
Missing Supplier Data: Specific pump failure status bit locations and error handling structures in the LIN/CAN protocol.
Verification Status: NeedsSupplierData
13. Battery/Inverter/Motor Overtemperature
Best Source: UL 2580 / SAE J2289 (Electric Drive System Performance and Safety)
Exact Quote: "The electric propulsion system shall reduce power or shut down safely if internal operating temperatures exceed the manufacturer's specified maximum limits."
Test Stage: Simulation -> HIL Thermal Profile Overrides
Required Equipment: HIL environmental simulation rig, variable resistance emulator array, system diagnostic software interface.
Required Proof Artifact: Data logging charts proving that powertrain current limits match the programmed inverse thermal derating curve as emulated temperatures rise.
Pass/Block Candidate: Pass: Automated component power limits scale down smoothly to prevent temperatures from crossing absolute safety limits. Block: Powertrain maintains full power output until catastrophic component damage occurs.
Missing Supplier Data: Manufacturer-defined component thermal derating curves and absolute maximum temperature limits.
Verification Status: NeedsSupplierData
14. CAN Communication Loss
Best Source: SAE J1939-21 (Data Link Layer) / ISO 11898
Exact Quote: "A node that detects a continuous loss of communication from a critical network partner shall enter a predefined safe state within a specified timeout interval."
Test Stage: Simulation -> HIL Network Interruption Injection
Required Equipment: Controlled CAN bus error injection tool, automated high-speed network logger.
Required Proof Artifact: Time-stamped network logs capturing the exact time duration between the loss of a node's heartbeat signal and the target component transitioning to a safe neutral torque state.
Pass/Block Candidate: Pass: Affected nodes default safely to a zero-torque neutral condition without uncommanded torque surges or vehicle lunging. Block: System locks into its last known torque state or exhibits erratic behavior.
Missing Supplier Data: Heartbeat timeout counter duration settings for every high-priority control message group.
Verification Status: NeedsSupplierData
15. Water Intrusion / IP Seal Failure
Best Source: ISO 20653 (Road vehicles - Degrees of protection IP-Code)
Exact Quote: "Enclosures for electrical equipment on road vehicles shall provide protection against ingress of solid foreign objects and water to prevent electrical or safety failures."
Test Stage: Simulation -> Physical Bench Subsystem Seal Leak Testing (Zero live high-voltage present)
Required Equipment: Vacuum/pressure decay leak tester, calibrated precision mass flow meter, environmental spray booth.
Required Proof Artifact: Certified laboratory test documentation confirming that component enclosures maintain an IP67 or IP69K sealing rating under pressure decay testing.
Pass/Block Candidate: Pass: Enclosures maintain structural seals within specified pressure leak parameters, preventing moisture entry. Block: Air or fluid leak metrics cross outside acceptable boundaries during pressure verification.
Missing Supplier Data: Enclosure internal volume specifications and maximum allowable gasket deformation parameters.
Verification Status: NeedsPhysicalVerification
Part 4: Stage Gate Validation & Next Logical Step
 [GATE 08: FMEA REGISTRY] ------> [GATE 08B: TEST MAPPING] ------> [GATE 08C: FINAL VALIDATION]
  Status: COMPLETED              Status: COMPLETED                Status: NOT STARTED
  (Failure modes identified)     (Standards & methods aligned)   (Requires missing supplier data)
                                                                             |
                                                                             v
                                                                  [MOVE TO NEXT STUDY GATE]
                                                                  Gate 05 - CAN / Controls Deep Dive
