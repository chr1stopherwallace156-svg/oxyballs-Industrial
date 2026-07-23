Part 1: The Blocked Questions Ledger
Gate
Question / Parameter Gap
Source / Expert Needed
Why It Matters
What Process It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
08C
Firm Sourced Safety Boundaries
Component Suppliers / Certified Test Engineers
Required to convert exploratory simulation results into definitive safety pass/fail criteria.
Unlocks the transition from simulation sweeps to physical test plan approval.
PARKED_FOR_SUPPLIER_DATA
Prior to track readiness
None. No placeholder data can grant physical testing clearance under current rules.
05A
Verified Ford UIM / J1939 Message Architecture
Ford Pro Upfitter Network / Official Manuals
Confirms explicit message layouts and timing requirements on factory-supported networks without assuming full proprietary DBC access.
Unlocks custom VCU configurations on the vehicle's body-builder bus.
SourcePending
Immediate
Reference to published Ford Body Builder Layout Books and public J1939-specific standards.
Part 2: Parallel Gate Matrix Status
 [GATE 07C: WEIGHT & CG] ------> [GATE 08B: TEST MAPPING] ------> [GATE 08C: VALIDATION ENGINE] <---- [PARALLEL TRACK]
  Status:                         Status:                         Status:                               Gate 05A: SIGNAL REGISTRY
  CALCULATOR_FRAMEWORK_READY      SOURCE_CANDIDATES_MAPPED        SIMULATION_SWEEP_MATRIX_CREATED       SIGNAL_REGISTRY_STARTED
  PHYSICAL_DATA_REQUIRED          PARKED_FOR_NOW                  PLACEHOLDER_VALUES_HAVE_NO_AUTHORITY  LISTEN_ONLY_RESEARCH
                                                                  SUPPLIER_THRESHOLDS_REQUIRED          UNVERIFIED_STAGE
                                                                  NO_PHYSICAL_TEST_CLEARANCE            NO_ACTIVE_TRANSMISSIONS
                                                                  NO_COMPLIANCE_CLAIMS                  NO_FACTORY_SAFETY_BUS_CONTROL
                                                                  PARKED_FOR_SUPPLIER_DATA
Part 3: Updated Gate 05A - Source-Backed Signal Registry
1. Wheel Speed Flanks
Signal Name: E_Wheel_Speed_Flanks_Raw
Source Document: Public SAE J1939-71 (Vehicle Application Layer Baseline)
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 65215 (Electronic Wheel Speed 1 - EWS1)
Byte/Bit Mapping: Unverified_Pending_Signal_Freeze
Direction: Listen-Only
Allowed Use: Secondary speed tracking comparison math in draft model simulations.
Blocked Use: Injecting fake wheel slip override arguments or feeding functional safety traction loops.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: Serial terminal text export of passive network capture without transceiver ack activation.
2. Accelerator Pedal Position
Signal Name: E_Accel_Pedal_Pos_Pct
Source Document: Public SAE J1939-71 Baseline Framework
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 61443 (Electronic Engine Controller 2 - EEC2)
Byte/Bit Mapping: Unverified_Pending_Signal_Freeze
Direction: Listen-Only
Allowed Use: Compare driver-demand trend in simulation.
Blocked Use: Direct inverter torque command, physical torque arbitration, or road-test torque control unless backed by specific research meant for it. The VCU should not use a raw unverified Ford accelerator signal as physical torque authority.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: Hex data trace parsing validation report from local hardware simulation tests.
3. Brake Switch State
Signal Name: E_Brake_Switch_Discrete
Source Document: Public SAE J1939-71 Framework Core Definitions
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 61441 (Electronic Brake Controller 1 - EBC1)
Byte/Bit Mapping: Unverified_Pending_Signal_Freeze
Direction: Listen-Only
Allowed Use: Simulation-only regen decay logic study.
Blocked Use: Physical regen disable, braking validation, or safety control without confirmed signal source, debounce logic, and brake engineer review unless further evidence and research are provided.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: Passive monitoring test capture tracking simulation node states.
4. Ignition Switch Status
Signal Name: E_Ignition_State_Discrete
Source Document: Ford Pro Upfitter Electrical Design Resource Guidelines (Structural Framework Only)
Bus/Channel: CAN_1 (Body Builder Interface Hardware Port)
Protocol: Upfitter Customized Communication Profile Framework
PGN or ID: Unverified_Pending_Official_Upfitter_Verification
Byte/Bit Mapping: Unverified_Pending_Signal_Freeze
Direction: Listen-Only
Allowed Use: Pre-charge sequence coordination logic verification testing on virtual models.
Blocked Use: Controlling vehicle high-voltage system main coil closure commands.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: Hardware state model execution log capture files.
5. Powertrain Desired Torque Loop
Signal Name: M_EV_Torque_Command_Nm
Source Document: Conversion Component Powertrain Integration Manual Database
Bus/Channel: CAN_2 (Isolated EV Inverter Sub-Loop Network Only)
Protocol: Inverter Proprietary CAN Profile Structure
PGN or ID: Sourced_via_Inverter_DBC
Byte/Bit Mapping: Loaded from Inverter DBC
Direction: Receive / Transmit (Strictly internal isolated loop containment environment)
Allowed Use: Internal traction inverter performance loop modeling.
Blocked Use: Forwarding commands outside the isolated subsystem onto factory Ford chassis components.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: Component interface emulator structural code layout tracking tests.
6. Battery Pack State of Charge
Signal Name: M_BMS_Pack_SOC_Pct
Source Document: Conversion Supplier BMS Interface Configuration Guidelines
Bus/Channel: CAN_3 (Isolated EV Battery Control Loop Network Only)
Protocol: BMS Proprietary CAN Network Layout
PGN or ID: Sourced_via_BMS_DBC
Byte/Bit Mapping: Loaded from BMS DBC
Direction: Receive (Strictly internal isolated loop containment environment)
Allowed Use: Cabin state estimation display and dynamic performance tracking simulations.
Blocked Use: High-voltage contactor physical disconnection line management execution commands.
Verification Status: UNVERIFIED_STAGE
Required Proof Artifact: BMS virtual state matrix code logic map exports.
Part 4: Gate 05B - Controls Dependency Map
1. Input Mapping Architecture (Ford-Side Signals Needed)
Ford Accelerator Pedal Position (E_Accel_Pedal_Pos_Pct): Received via CAN_1 (Listen-Only). Used to monitor intended driver demand behavior strictly inside the VCU simulation layer.
Ford Brake Switch State (E_Brake_Switch_Discrete): Received via CAN_1 (Listen-Only). Used to flag deceleration trends for simulated model decay evaluations.
Ford Ignition Switch Status (E_Ignition_State_Discrete): Received via CAN_1 (Listen-Only). Monitors key position trends to map structural startup routines within the software model environment.
Ford Wheel Speed Flanks (E_Wheel_Speed_Flanks_Raw): Received via CAN_1 (Listen-Only). Tracks baseline vehicle roll trends against simulated chassis curves.
2. Input Mapping Architecture (EV-Side Signals Needed)
Inverter Measured Motor Speed (M_Inverter_Rpm): Sourced from CAN_2 via Inverter DBC (Receive). Tracks real-time machine speed inside the VCU state machine.
BMS Pack Voltage (M_BMS_Pack_Volt): Sourced from CAN_3 via BMS DBC (Receive). Feeds VCU input voltage monitoring thresholds.
BMS Current Draw (M_BMS_Pack_Current): Sourced from CAN_3 via BMS DBC (Receive). Monitored by the VCU to trace electrical energy consumption trends.
DC-DC Operating Temperature (M_DCDC_Temp): Sourced via DC-DC DBC (Receive). Monitored for localized thermal trends inside the VCU low-voltage supervisor block.
Charger Plug Status (M_CHG_Plug_Connected): Sourced via Charger DBC (Receive). Alerts the VCU control system to isolate high-voltage systems during active charging configurations.
3. VCU Decisions (Internal Processing Logic)
Torque Demand Arbitration: Evaluates simulated driver inputs against active battery state constraints. Because Ford-side pedal configurations are unverified, this algorithm maps theoretical power requirements without commanding physical hardware elements.
Pre-Charge Sequence Management: Coordinates timing checks between the main power rail voltage levels and the closing of isolation contactors based on state-machine rules.
Thermal Management Loop Derating: Monitors temperature inputs across the VCU message map to dynamically throttle torque bounds when component thresholds are approached.
4. Driver Warnings (Downstream Signaling Output)
EV Malfunction Indicator Trigger: Set when any safety monitoring parameter lands in a Model Stress Failure category inside the simulation.
Thermal Limit Warning: Active whenever temperature parameters require torque reduction interventions within the state logic.
State of Charge Indicator Driver Message: Transforms internal BMS messages into a simplified display format for the isolated dashboard node.
5. Fault States (Protective Transition Modes)
Fault Level 1 (Soft Derate): Enters a safety-limited output mode when secondary sensor signals deviate from expected simulation bounds.
Fault Level 2 (Pre-Charge Timeout Failure): Transitions to a safe lockout configuration if voltage parameters do not normalize within target timing windows.
Fault Level 3 (Emergency Shutdown): Immediate command sequence to open high-voltage loops if critical safety thresholds are broken.
6. Signal Directionality and Isolation Constraints
Receive-Only Signals (EV Side): M_BMS_Pack_SOC_Pct, M_BMS_Pack_Volt, M_BMS_Pack_Current, M_DCDC_Temp. These are entirely read-only items designed to guide VCU calculations without altering device firmware settings.
Transmit-Only Signals (EV Side): M_EV_Torque_Command_Nm (Routed strictly over CAN_2 to the inverter loop), M_VCU_Precharge_Enable (Routed to the isolated battery containment box).
Completely Blocked Configurations:
No direct routing of unverified CAN_1 Ford data to the CAN_2 inverter torque command pathway.
Any form of frame bridging or packet injection from custom EV subsystems onto factory Ford safety networks is strictly blocked.
Transmission of unauthorized J1939 messages or custom upfitter command overrides on the vehicle chassis control network is completely blocked.
