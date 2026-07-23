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
Firm Safety Boundary Thresholds
Component Suppliers / Certified Test Engineers
Required to convert exploratory simulation results into definitive safety pass/fail criteria.
Unlocks the transition from simulation sweeps to physical test plan approval.
SupplierDataPending
Prior to track readiness
None. No placeholder data can grant physical testing clearance under current rules.
05
Authorized Ford Network Architecture Mapping & DBCs
Ford Pro Upfitter Network / Official Manuals
Confirms explicit message layouts and timing requirements on factory-approved upfitter networks.
Unlocks custom VCU transmit configurations on the vehicle's body-builder bus.
SourcePending
Immediate
Reference to published Ford Body Builder Layout Books and public J1939-specific standards.
Part 2: Clean Build Engine Control Logic
IF CONTROL_GATE_CHECK == "08C_VAL":
    IF parameter_source == "NominalEngineeringAssumption":
        OUTPUT = "ASSUMPTION_STRESS_RESULT_ONLY"
        GATE_AUTHORITY = "NONE"
        PHYSICAL_TEST_CLEARANCE = "BLOCKED"
        COMPLIANCE_SIGN_OFF = "BLOCKED"
        EVALUATION_METHOD = "SIMULATION_SWEEP_ANALYSIS"
Part 3: Parallel Gate Matrix Status
 [GATE 07C: WEIGHT & CG] ------> [GATE 08B: TEST MAPPING] ------> [GATE 08C: VALIDATION ENGINE] <---- [PARALLEL TRACK]
  Status:                         Status:                         Status:                               Gate 05: CAN & Controls
  CALCULATOR_FRAMEWORK_READY      SOURCE_CANDIDATES_MAPPED        DRAFT_VALIDATION_STARTED              STARTED
  PHYSICAL_DATA_REQUIRED          PARKED_FOR_NOW                  SIMULATION_ONLY                       LISTEN_ONLY_RESEARCH
                                                                  SWEEP_TESTING_ACTIVE                  AUTHORIZED_CHANNELS
Gate 08B Status: SOURCE_CANDIDATES_MAPPED / PARKED_FOR_NOW
Gate 08C Status: DRAFT_VALIDATION_STARTED / SIMULATION_ONLY / PLACEHOLDER_VALUES_ALLOWED_FOR_STRESS_TESTING / NO_PLACEHOLDER_PASS_BLOCK_AUTHORITY / SUPPLIER_DATA_PENDING / NO_PHYSICAL_TEST_CLEARANCE / NO_COMPLIANCE_CLAIMS
Gate 05 Status: STARTED / AUTHORIZED CONTROLS / CAN DEEP DIVE
Part 4: Gate 08C - Simulation-Only Sweep Matrix
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
Sweep Results Mapping: [10ms-20ms]: stable | [50ms]: needs review | [100ms]: unstable (high-voltage exposure risk outside standard limits).
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
Sweep Results Mapping: [1.0s-2.0s]: stable | [5.0s]: needs review | [10.0s]: unstable (extended delay in fault propagation).
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
Sweep Results Mapping: [5.0V-12.0V]: stable | [2.0V]: needs review | [1.0V]: unstable (high risk of false welding detection due to sensor noise).
Required Proof Artifact Template: Pre-charge error-injection state transit matrix sheet.
4. Pre-Charge Failure
Missing Parameter: Maximum duration allowable before pre-charge sequence timeout dumps the circuit (tau_pre).
SIM_PARAM_PRECHG_TIMEOUT_MS:
Default_Stress_Value: null
Exploratory_Test_Values: [100 ms, 200 ms, 500 ms, 1000 ms]
Status: NominalEngineeringAssumption
Allowed Use: HIL script script structure drafting.
Blocked Use: Physical power electronics charging clearance.
Authority: None
Upgrade Required: Inverter hardware specifications.
Simulation Sweep Logic: Model thermal energy absorption on the pre-charge resistor over varying execution time windows.
Sweep Results Mapping: [100ms-500ms]: stable | [1000ms]: unstable (exceeds typical resistor thermal absorption limits).
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
Sweep Results Mapping: [300A-450A]: stable | [500A]: needs review | [600A]: unstable (exceeds nominal wiring system protection capacity).
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
Sweep Results Mapping: [5.0-20.0 Nm/ms]: stable | [1.0 Nm/ms]: unstable (torque reduction delay too sluggish for safety windows).
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
Upgrade Required: Ford upfitter network message performance specifications.
Simulation Sweep Logic: Simulate wheel-slip recovery characteristics across a range of electric motor torque elimination delays.
Sweep Results Mapping: [5ms-15ms]: stable | [30ms]: needs review | [60ms]: unstable (high risk of tire slip control corruption during ABS intervention).
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
Sweep Results Mapping: [20Nm-40Nm]: stable | [60Nm]: unstable (steering manual force inputs require review).
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
Sweep Results Mapping: [15cc-35cc]: stable | [55cc]: unstable (exceeds physical volume constraints of target cylinder models).
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
Sweep Results Mapping: [300PSI-600PSI]: stable | [100PSI]: unstable (below assisted tracking operational margins).
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
Sweep Results Mapping: [6.0V-9.0V]: stable | [11.0V]: unstable (microcontrollers shut down prematurely, clipping load-shed windows).
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
Sweep Results Mapping: [1.0s-5.0s]: stable | [15.0s]: unstable (thermal buildup tracks outside safe semiconductor parameters).
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
Sweep Results Mapping: [5 A/degC - 12 A/degC]: stable | [1 A/degC]: unstable (clamping is too weak, risking component thermal runaways).
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
Sweep Results Mapping: [20ms-100ms]: stable | [500ms]: unstable (excessive delay before system neutral state engagement).
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
Sweep Results Mapping: [0.5 - 2.0 mbar/min]: stable | [6.0 mbar/min]: unstable (leak rate parameter fails to confirm IP67 fluid ingress safety limits).
Required Proof Artifact Template: Vacuum decay curve analysis sheets.
Part 5: Gate 05 - Authorized Controls & CAN Research Framework
MANDATORY CONTROL SYSTEM INTEGRATION SAFE-LANE COMPLIANCE RULES
Listen-Only Operations Mandatory: All network exploration on factory lines must run in a non-acknowledging (listen-only) configuration.
Authorized Interfaces Only: Rely entirely on public/authorized J1939 protocols, Ford Pro Upfitter Portal reference data, and official Body Builder Layout books.
No Safety Bus Transmission: Directly injection messages onto factory ABS, ESC, airbag, or anti-theft immobilizer paths is strictly prohibited without written manufacturer authorization.
Upfitter Gateway Isolation Architecture Layout
This architecture ensures that conversion controls interact solely through factory-designated upfitter channels, preventing unfiltered access to core powertrain safety paths.
 [FORD BASE VEHICLE NETWORK]
  |-- Factory Anti-Lock Brakes (ABS)
  |-- Factory Stability Control (ESC)
  +-- Factory Powertrain Control Module (PCM)
        |
 [PHYSICAL ISOLATION GATEWAY]
  +-- Ford Pro Upfitter Interface Module (UIM Connector) <-- [Safe Lane Boundary]
        |
 [AUTHORIZED INTERFACE BUS] (Listen-Only Listening Deck)
  +-- CAN_1: Body Builder Connector Bus (500 kbps J1939 Frame Format)
        |
        v
   [CENTRAL VCU CONTROL GATEWAY] ---> Processes Allowed Messages Only
        |
 [CONVERSION SYSTEM CORES] (Isolated Sub-Loops)
  |-- CAN_2: EV Traction Inverter Controller Loop
  +-- CAN_3: EV Battery Management System Loop
Listen-Only Signal Logging Target Profiles (Authorized Inputs)
Public PGN / ID | Standard Bit Mapping | Expected Data Content | Intended VCU Routing Path
PGN 61444 (Electronic Engine Controller 1) | Bytes 3-4: Engine Speed | Used to parse engine synchronization metrics. | Relayed to EV cabin cluster display node maps.
PGN 61443 (Electronic Engine Controller 2) | Byte 2: Accelerator Pedal Position | Measures the driver's mechanical torque demand. | Scaled directly into the EV Inverter torque loop model.
PGN 65265 (Cruise Control/Vehicle Speed) | Bytes 2-3: Wheel-Based Vehicle Speed | Confirms physical vehicle velocity metrics. | Routed to the brake assist pump power control loops.
Ford UIM Status (Body Builder Port Output) | Byte 0, Bit 2: Ignition Key Position | Tracks vehicle power state status strings. | Coordinates main high-voltage pre-charge startup steps.
