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
SupplierDataPending
Prior to track readiness
None. No placeholder data can grant physical testing clearance under current rules.
05A
Certified Ford UIM / J1939 DBC Matrix Documentation
Ford Pro Upfitter Network / Official Manuals
Confirms explicit message layouts and timing requirements on factory-approved upfitter networks.
Unlocks custom VCU transmit configurations on the vehicle's body-builder bus.
SourcePending
Immediate
Reference to published Ford Body Builder Layout Books and public J1939-specific standards.
Part 2: Parallel Gate Matrix Status
 [GATE 07C: WEIGHT & CG] ------> [GATE 08B: TEST MAPPING] ------> [GATE 08C: VALIDATION ENGINE] <---- [PARALLEL TRACK]
  Status:                         Status:                         Status:                               Gate 05A: SIGNAL REGISTRY
  CALCULATOR_FRAMEWORK_READY      SOURCE_CANDIDATES_MAPPED        DRAFT_VALIDATION_STARTED              STARTED
  PHYSICAL_DATA_REQUIRED          PARKED_FOR_NOW                  SIMULATION_ONLY                       UNVERIFIED STAGE
                                                                  SWEEP_TESTING_ACTIVE                  NO ACTIVE TRANSMISSIONS
Part 3: Gate 08C - Refined Simulation-Only Sweep Matrix
1. HVIL Open
Missing Parameter: Loop propagation delay from input break to contactor coil power drop (t_hvil).
SIM_PARAM_HVIL_DELAY_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [10 ms, 20 ms, 50 ms, 100 ms]
Status: NominalEngineeringAssumption
Allowed Use: Simulation sweep / HIL draft timing sensitivity analysis.
Blocked Use: Final pass/fail / physical test approval.
Authority: None
Upgrade Required: Supplier timing specifications or measured oscilloscope trace.
Simulation Sweep Logic: Run sensitivity sweep. Evaluate inverter DC-link capacitor voltage discharge dissipation rate against input intervals.
Simulation Response Category:
[10ms-20ms]: Model Accepts / No Gate Authority
[50ms]: Model Needs Review / No Gate Authority
[100ms]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Simulated timing sweep plot tracking cap voltage decay relative to contactor relay drop delays.
2. Isolation Resistance Fault
Missing Parameter: Minimum timing window from insulation value deterioration to fault transmission bit toggle (t_iso).
SIM_PARAM_ISO_RESPONSE_S:
Default_Stress_Value: null
Exploratory_Test_Values: [1.0 s, 2.0 s, 5.0 s, 10.0 s]
Status: SupplierDataPending
Allowed Use: Network model timing evaluation.
Blocked Use: Isolation monitoring circuit sign-off / physical testing.
Authority: None
Upgrade Required: Manufacturer data sheet verification.
Simulation Sweep Logic: Inject step reductions in isolation resistance values; trace signal timing latency propagation across the virtual system network.
Simulation Response Category:
[1.0s-2.0s]: Model Accepts / No Gate Authority
[5.0s]: Model Needs Review / No Gate Authority
[10.0s]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Synthetic diagnostic CAN trace log demonstrating message transmission steps.
3. Contactor Weld
Missing Parameter: Voltage validation check delta window across terminals (V_weld_delta).
SIM_PARAM_WELDF_MARGIN_V:
Default_Stress_Value: null
Exploratory_Test_Values: [1.0 V, 2.0 V, 5.0 V, 12.0 V]
Status: SupplierDataPending
Allowed Use: Boot sequence state machine validation.
Blocked Use: Pre-charge logic approval.
Authority: None
Upgrade Required: Battery distribution unit specifications.
Simulation Sweep Logic: Sweep sensory reading variance parameters to look for overlapping voltage profiles that create false-positive weld diagnostics.
Simulation Response Category:
[5.0V-12.0V]: Model Accepts / No Gate Authority
[2.0V]: Model Needs Review / No Gate Authority
[1.0V]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Pre-charge error-injection state transit matrix sheet.
4. Pre-Charge Failure
Missing Parameter: Maximum duration allowable before pre-charge sequence timeout dumps the circuit (tau_pre).
SIM_PARAM_PRECHG_TIMEOUT_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [100 ms, 200 ms, 500 ms, 1000 ms]
Status: NominalEngineeringAssumption
Allowed Use: HIL script structure drafting.
Blocked Use: Physical power electronics charging clearance.
Authority: None
Upgrade Required: Inverter hardware specifications.
Simulation Sweep Logic: Model thermal energy absorption on the pre-charge resistor over varying execution time windows.
Simulation Response Category:
[100ms-500ms]: Model Accepts / No Gate Authority
[1000ms]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Resistor simulated temperature tracking curves.
5. Battery Overcurrent
Missing Parameter: Transient overcurrent duration limits (I_max time curve).
SIM_PARAM_PEAK_CURR_AMP:
Default_Stress_Value: null
Exploratory_Test_Values: [300 A, 450 A, 500 A, 600 A]
Status: SupplierDataPending
Allowed Use: Virtual drivetrain throttling logic testing.
Blocked Use: Overcurrent envelope setting confirmation.
Authority: None
Upgrade Required: Cell manufacturer application manual.
Simulation Sweep Logic: Inject transient current overload steps into the virtual VCU model to track software throttling intervention timings.
Simulation Response Category:
[300A-450A]: Model Accepts / No Gate Authority
[500A]: Model Needs Review / No Gate Authority
[600A]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Torque request limitation vs. overcurrent duration chart.
6. Inverter Shutdown During Regen
Missing Parameter: Regenerative torque decay profile curve (dT_regen/dt).
SIM_PARAM_REGEN_DECAY_NM_PER_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [1.0 Nm/ms, 5.0 Nm/ms, 10.0 Nm/ms, 20.0 Nm/ms]
Status: SupplierDataPending
Allowed Use: Pitch-moment estimation and control loop modeling.
Blocked Use: Vehicle track test approval.
Authority: None
Upgrade Required: Inverter dynamic firmware documentation.
Simulation Sweep Logic: Sweep torque drop rates to measure simulated chassis forward pitching and suspension reaction dynamics.
Simulation Response Category:
[5.0-20.0 Nm/ms]: Model Accepts / No Gate Authority
[1.0 Nm/ms]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Dynamic axle load-transfer calculation simulation reports.
7. ABS/ESC Interaction with Regen Loss
Missing Parameter: Motor torque dump latency following a traction control intervention flag (t_abs_dump).
SIM_PARAM_ABS_TORQUE_DROP_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [5 ms, 15 ms, 30 ms, 60 ms]
Status: NominalEngineeringAssumption
Allowed Use: Control algorithm structure drafting.
Blocked Use: Real-world braking control calibration.
Authority: None
Upgrade Required: Ford upfitter network performance specifications.
Simulation Sweep Logic: Simulate wheel-slip recovery characteristics across a range of electric motor torque elimination delays.
Simulation Response Category:
[5ms-15ms]: Model Accepts / No Gate Authority
[30ms]: Model Needs Review / No Gate Authority
[60ms]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Wheel speed slip tracking loop simulator spreadsheets.
8. EHPS Pump Failure
Missing Parameter: Driver steering input wheel torque under unassisted backup configurations (delta_tau_steer).
SIM_PARAM_MANUAL_STEER_EFFORT_NM:
Default_Stress_Value: null
Exploratory_Test_Values: [20 Nm, 40 Nm, 60 Nm]
Status: SupplierDataPending
Allowed Use: Steering system structural load modeling.
Blocked Use: Physical track test vehicle routing.
Authority: None
Upgrade Required: Steering box physical test validation documents.
Simulation Sweep Logic: Evaluate vehicle handling path deviations over varied levels of physical steering force requirements.
Simulation Response Category:
[20Nm-40Nm]: Model Accepts / No Gate Authority
[60Nm]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Finite element model manual loading calculation tables.
9. Brake Assist Pressure Loss
Missing Parameter: Minimum fluid volume requirement to achieve maximum vehicle retardation torque (V_min_fluid).
SIM_PARAM_MIN_BRAKE_VOL_CC:
Default_Stress_Value: null
Exploratory_Test_Values: [15 cc, 35 cc, 55 cc]
Status: SupplierDataPending
Allowed Use: Hydraulic circuit capacity calculations.
Blocked Use: FMVSS 105 physical test plan sign-off.
Authority: None
Upgrade Required: Certified upfitter hydraulic configuration blueprints.
Simulation Sweep Logic: Run sizing sweeps to map required master cylinder displacement limits against standard caliper fluid demand.
Simulation Response Category:
[15cc-35cc]: Model Accepts / No Gate Authority
[55cc]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Hydraulic line pressure vs. fluid displacement simulation reports.
10. Steering Assist Pressure Loss
Missing Parameter: Minimum baseline operating line pressure for steering gear power assistance (P_min_steer).
SIM_PARAM_MIN_STEER_PRESS_PSI:
Default_Stress_Value: null
Exploratory_Test_Values: [100 PSI, 300 PSI, 600 PSI]
Status: NominalEngineeringAssumption
Allowed Use: Pressure threshold monitoring script mockups.
Blocked Use: Physical pump deployment layout checking.
Authority: None
Upgrade Required: Upfitter steering hardware specifications.
Simulation Sweep Logic: Inject varying pressure drop decay rates to analyze sensor detection loop alertness.
Simulation Response Category:
[300PSI-600PSI]: Model Accepts / No Gate Authority
[100PSI]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Simulated sensor output data array sets.
11. Low-Voltage DC-DC Brownout
Missing Parameter: Minimum operating voltage threshold limit for internal system microcontrollers (V_low_mcu).
SIM_PARAM_MCU_DROP_VOLTAGE:
Default_Stress_Value: null
Exploratory_Test_Values: [6.0 V, 7.5 V, 9.0 V, 11.0 V]
Status: SupplierDataPending
Allowed Use: Load-shedding algorithm design prototyping.
Blocked Use: Electrical grid integration approval.
Authority: None
Upgrade Required: Silicon component standard operating datasheets.
Simulation Sweep Logic: Drop the simulation voltage rail across specific time durations to evaluate safety module stability bounds.
Simulation Response Category:
[6.0V-9.0V]: Model Accepts / No Gate Authority
[11.0V]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Low-voltage network discharge timing simulation logs.
12. Coolant Pump Failure
Missing Parameter: Maximum speed deviation timing window tolerated before setting a pump error code (t_pump_err).
SIM_PARAM_PUMP_FAULT_WINDOW_S:
Default_Stress_Value: null
Exploratory_Test_Values: [1.0 s, 3.0 s, 5.0 s, 15.0 s]
Status: SupplierDataPending
Allowed Use: Thermal system feedback modeling.
Blocked Use: Real pump integration validation.
Authority: None
Upgrade Required: Pump communication network reference guide.
Simulation Sweep Logic: Sweep delay windows during continuous high-load operations to map semiconductor junction temperature climbing characteristics.
Simulation Response Category:
[1.0s-5.0s]: Model Accepts / No Gate Authority
[15.0s]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Coolant circuit thermal trend generation charts.
13. Overtemperature
Missing Parameter: Component protection current reduction slope (K_derate).
SIM_PARAM_THERMAL_DERATE_SLOPE:
Default_Stress_Value: null
Exploratory_Test_Values: [1 A/degC, 5 A/degC, 12 A/degC]
Status: SupplierDataPending
Allowed Use: Drivetrain system simulation checking.
Blocked Use: Active thermal tuning sign-off.
Authority: None
Upgrade Required: Inverter/Motor engineering performance maps.
Simulation Sweep Logic: Sweep thermal response settings to observe torque clamping profiles during simulated uphill heavy trailer pulls.
Simulation Response Category:
[5 A/degC - 12 A/degC]: Model Accepts / No Gate Authority
[1 A/degC]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Component thermal scaling profile graphics.
14. CAN Communication Loss
Missing Parameter: Maximum node timeout counter allowance threshold window (t_can_timeout).
SIM_PARAM_CAN_TIMEOUT_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [20 ms, 50 ms, 100 ms, 500 ms]
Status: NominalEngineeringAssumption
Allowed Use: Network communication bus design mapping.
Blocked Use: Network architecture production freeze.
Authority: None
Upgrade Required: System master integration specifications.
Simulation Sweep Logic: Simulate intermittent dropouts in torque control frames to find vehicle surge limits.
Simulation Response Category:
[20ms-100ms]: Model Accepts / No Gate Authority
[500ms]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: High-speed communication drop simulation trace charts.
15. Water Intrusion / IP Seal Failure
Missing Parameter: Maximum air pressure decay limits for clean production enclosure tracking (delta_P_leak).
SIM_PARAM_VAC_LEAK_RATE_MBAR_MIN:
Default_Stress_Value: null
Exploratory_Test_Values: [0.5 mbar/min, 2.0 mbar/min, 6.0 mbar/min]
Status: SupplierDataPending
Allowed Use: Housing structural integrity study layouts.
Blocked Use: Physical leak-tester configuration.
Authority: None
Upgrade Required: Gasket joint laboratory stress reports.
Simulation Sweep Logic: Map air pressure test variables against theoretical water molecule ingress rates under environmental submersions.
Simulation Response Category:
[0.5 - 2.0 mbar/min]: Model Accepts / No Gate Authority
[6.0 mbar/min]: Model Stress Failure / No Gate Authority
Required Proof Artifact Template: Vacuum decay curve analysis sheets.
Part 4: Gate 05A - Source-Backed Signal Registry Draft
STRICT COMPLIANCE DIRECTIVE: Under unverified conditions, no parameters or bit offsets are treated as confirmed. All structures remain explicitly decoupled from safety bus control routing until official upfitter network manuals are appended.
1. Wheel Speed Flanks
Signal Name: E_Wheel_Speed_Flanks_Raw
Source Document: Public SAE J1939-71 (Vehicle Application Layer Baseline)
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 65215 (Electronic Wheel Speed 1 - EWS1)
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Listen-Only
Allowed Use: Secondary speed tracking comparison math in draft model simulations.
Blocked Use: Injecting fake wheel slip override arguments or feeding functional safety traction loops.
Verification Status: UnverifiedStage
Required Proof Artifact: Serial terminal text export of passive network capture without transceiver ack activation.
2. Accelerator Pedal Position
Signal Name: E_Accel_Pedal_Pos_Pct
Source Document: Public SAE J1939-71 Baseline Framework
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 61443 (Electronic Engine Controller 2 - EEC2)
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Listen-Only
Allowed Use: Input driving profile scaling mapping loops within pure simulation logic environments.
Blocked Use: Real torque execution command arbitration on active physical hardware components.
Verification Status: UnverifiedStage
Required Proof Artifact: Hex data trace parsing validation report from local hardware simulation tests.
3. Brake Switch State
Signal Name: E_Brake_Switch_Discrete
Source Document: Public SAE J1939-71 Framework Core Definitions
Bus/Channel: CAN_1 (Body Builder Isolation Gateway)
Protocol: J1939 Standard 29-bit Identifier
PGN or ID: PGN 61441 (Electronic Brake Controller 1 - EBC1)
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Listen-Only
Allowed Use: Triggering regenerative auxiliary decay loops in exploratory software profiles.
Blocked Use: Driving deceleration control overrides or vehicle stopping validation execution logs.
Verification Status: UnverifiedStage
Required Proof Artifact: Passive monitoring test capture tracking simulation node states.
4. Ignition Switch Status
Signal Name: E_Ignition_State_Discrete
Source Document: Ford Pro Upfitter Electrical Design Resource Guidelines (Structural Framework Only)
Bus/Channel: CAN_1 (Body Builder Interface Hardware Port)
Protocol: Upfitter Customized Communication Profile Framework
PGN or ID: Unverified_Pending_Ford_UIM_Access
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Listen-Only
Allowed Use: Pre-charge sequence coordination logic verification testing on virtual models.
Blocked Use: Controlling vehicle high-voltage system main coil closure commands.
Verification Status: UnverifiedStage
Required Proof Artifact: Hardware state model execution log capture files.
5. Powertrain Desired Torque Loop
Signal Name: M_EV_Torque_Command_Nm
Source Document: Conversion Component Powertrain Integration Manual Database
Bus/Channel: CAN_2 (Isolated EV Inverter Sub-Loop Network Only)
Protocol: Inverter Proprietary CAN Profile Structure
PGN or ID: Unverified_Pending_Inverter_DBC_Release
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Receive / Transmit (Strictly internal isolated loop containment environment)
Allowed Use: Internal traction inverter performance loop modeling.
Blocked Use: Forwarding commands outside the isolated subsystem onto factory Ford chassis components.
Verification Status: UnverifiedStage
Required Proof Artifact: Component interface emulator structural code layout tracking tests.
6. Battery Pack State of Charge
Signal Name: M_BMS_Pack_SOC_Pct
Source Document: Conversion Supplier BMS Interface Configuration Guidelines
Bus/Channel: CAN_3 (Isolated EV Battery Control Loop Network Only)
Protocol: BMS Proprietary CAN Network Layout
PGN or ID: Unverified_Pending_BMS_DBC_Release
Byte/Bit Mapping: Unverified_Pending_DBC_Freeze
Direction: Receive (Strictly internal isolated loop containment environment)
Allowed Use: Cabin state estimation display and dynamic performance tracking simulations.
Blocked Use: High-voltage contactor physical disconnection line management execution commands.
Verification Status: UnverifiedStage
Required Proof Artifact: BMS virtual state matrix code logic map exports.
