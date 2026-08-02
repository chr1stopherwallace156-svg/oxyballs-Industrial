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
Final Production Firmware Verification Signature
Lead Systems Engineer / Sign-off Authority
Legal confirmation that firmware features match physical system wiring safety layouts.
Transitions the engine from simulation-only draft statuses to a final production clear.
SupplierDataPending
Prior to commissioning
None. LOTO and physical containment rules block alternative paths.
05
Factory Ford proprietary CAN DBC database arbitration IDs
Ford Pro Upfitter Network / Vehicle Reverse Engineering Group
Maps exact hex IDs for real-time traction control interventions, steering torque feedback, and dashboard alerts.
Unlocks custom CAN translation gateway layout mapping.
SourcePending
Immediate
Generic J1939 parameter groups (PGNs) sniffing and signal reverse engineering.
Part 2: Parallel Gate Matrix Status
 [GATE 07C: WEIGHT & CG] ------> [GATE 08B: TEST MAPPING] ------> [GATE 08C: DRAFT VALIDATION] <---- [PARALLEL TRACK]
  Status:                         Status:                         Status:                             Gate 05: CAN & Controls
  CALCULATOR_FRAMEWORK_READY      SOURCE_CANDIDATES_MAPPED        DRAFT_VALIDATION_STARTED            READY_TO_START_IN_PARALLEL
  PHYSICAL_DATA_REQUIRED          PARKED_FOR_NOW                  SIMULATION_ONLY                     (Signal mapping active)
Gate 08B Status: SOURCE_CANDIDATES_MAPPED / EXACT_QUOTE_VERIFICATION_REQUIRED / SUPPLIER_PARAMETERS_REQUIRED / PARKED_FOR_NOW
Gate 08C Status: DRAFT_VALIDATION_STARTED / NOMINAL_PARAMETERS_ALLOWED / SIMULATION_ONLY / NO_PHYSICAL_TEST_CLEARANCE / NO_COMPLIANCE_CLAIMS
Gate 05 Status: READY_TO_START_IN_PARALLEL
Part 3: Engine Execution Logic (Pass/Block Guardrails)
IF EXECUTION_MODE == "PHYSICAL_TEST_RUN" OR EXECUTION_MODE == "COMPLIANCE_CLAIM":
    IF VALUE_STATUS == "NominalEngineeringAssumption" OR VALUE_STATUS == "SupplierDataPending":
        FORCE_STATUS = "BLOCK"
        LOG_REASON = "Fatal: Execution blocked. Cannot use placeholder nominal data for physical vehicle approval or compliance claims."
        TERMINATE_ROUTINE()

IF EXECUTION_MODE == "SIMULATION_RUN" OR EXECUTION_MODE == "HIL_SCRIPT_DRAFT":
    ALLOW_EXECUTION = TRUE
    OUTPUT_MARKER = "SimulationOnly - Not Approved for Physical Testing"
Part 4: Simulation-Only Failure Mode Registry
1. HVIL Open
Missing Supplier Parameter: Loop propagation delay from input break to contactor coil power drop (t_hvil).
Placeholder Input Field: SIM_PARAM_HVIL_DELAY_MS = 20.0 ms (Range: 10.0 ms to 50.0 ms).
Status / Allowed Use: NominalEngineeringAssumption / Allowed solely for HIL script template drafting and VCU model parsing.
Blocked Use: Final safety clearing, physical track-test sign-off, or regulatory compliance verification.
Draft Pass/Block Logic:
IF SIM_PARAM_HVIL_DELAY_MS <= 50.0 ms -> PASS_PROPAGATION_MODEL
IF SIM_PARAM_HVIL_DELAY_MS > 50.0 ms -> BLOCK_MODEL (Reason: Inverter DC-link capacitance exposure risk)
Required Proof Artifact Template: Generated simulation log graph charting low-voltage fault pulse time delta against virtual contactor state drop.
Data Level Upgrade Requirement: Oscilloscope trace document signed by the BMS/Inverter firmware testing authority.
2. Isolation Resistance Fault
Missing Supplier Parameter: Minimum timing window from resistance drop recognition to fault transmission bit toggle (t_iso).
Placeholder Input Field: SIM_PARAM_ISO_RESPONSE_S = 2.0 s (Range: 1.0 s to 5.0 s).
Status / Allowed Use: SupplierDataPending / Simulation, virtual HIL network matrix development.
Blocked Use: High-voltage system commissioning validation or road clearance testing.
Draft Pass/Block Logic:
IF SIM_PARAM_ISO_RESPONSE_S <= 5.0 s -> PASS_SIMULATION
IF SIM_PARAM_ISO_RESPONSE_S > 5.0 s -> BLOCK_SIMULATION (Reason: Threshold exceeds safe chassis exposure timing model)
Required Proof Artifact Template: Virtual diagnostic CAN trace recording PGN transmission timings during an insulation decay event.
Data Level Upgrade Requirement: Manufacturer-certified isolation monitoring sensor data sheet validation.
3. Contactor Weld
Missing Supplier Parameter: Voltage check delta margin across terminals (V_weld_delta).
Placeholder Input Field: SIM_PARAM_WELDF_MARGIN_V = 5.0 V (Range: 2.0 V to 12.0 V).
Status / Allowed Use: SourcePending / Firmware model structure mapping.
Blocked Use: Pre-charge circuit sign-off or physical battery pack assembly activation.
Draft Pass/Block Logic:
IF SIM_PARAM_WELDF_MARGIN_V >= 2.0 V -> PASS_SIMULATION
IF SIM_PARAM_WELDF_MARGIN_V < 2.0 V -> BLOCK_SIMULATION (Reason: Delta noise margin too low; high risk of false checks)
Required Proof Artifact Template: Simulated pre-charge failure injection response map output.
Data Level Upgrade Requirement: Supplier battery distribution unit engineering specifications.
4. Pre-Charge Failure
Missing Supplier Parameter: Maximum duration permitted before pre-charge sequence timeout limits drop the circuit (tau_pre).
Placeholder Input Field: SIM_PARAM_PRECHG_TIMEOUT_MS = 500.0 ms (Range: 200.0 ms to 1000.0 ms).
Status / Allowed Use: NominalEngineeringAssumption / HIL automation path setup planning.
Blocked Use: Production circuit building or physical contactor testing.
Draft Pass/Block Logic:
IF SIM_PARAM_PRECHG_TIMEOUT_MS <= 1000.0 ms -> PASS_SIMULATION
IF SIM_PARAM_PRECHG_TIMEOUT_MS > 1000.0 ms -> BLOCK_SIMULATION (Reason: Pre-charge resistor thermal limits crossed)
Required Proof Artifact Template: Synthetic component model thermal load profiles.
Data Level Upgrade Requirement: Component developer engineering specification dataset matching the physical target system.
5. Battery Overcurrent
Missing Supplier Parameter: Safe continuous and peak overcurrent capacity profile curves (I_max over time t).
Placeholder Input Field: SIM_PARAM_PEAK_CURR_AMP = 450.0 A (Duration: 10.0 s).
Status / Allowed Use: SupplierDataPending / Inverter mapping software draft configuration.
Blocked Use: Dynamic current profile tracking or battery management system configuration locking.
Draft Pass/Block Logic:
IF SIM_PARAM_PEAK_CURR_AMP <= 500.0 A -> PASS_SIMULATION
IF SIM_PARAM_PEAK_CURR_AMP > 500.0 A -> BLOCK_SIMULATION (Reason: Current target calculation exceeds wire harness limit values)
Required Proof Artifact Template: Virtual multi-node electrical system overload trace graph.
Data Level Upgrade Requirement: Laboratory cell specifications and absolute current maps.
6. Inverter Shutdown During Regen
Missing Supplier Parameter: Regenerative torque ramp-down profile parameters under sudden component errors (dT_regen/dt).
Placeholder Input Field: SIM_PARAM_REGEN_DECAY_NM_PER_MS = 5.0 Nm/ms (Range: 2.0 to 20.0).
Status / Allowed Use: SourcePending / Control logic system stability simulation model mapping.
Blocked Use: Dynamic pitch stability vehicle track checks or road clearance verification.
Draft Pass/Block Logic:
IF SIM_PARAM_REGEN_DECAY_NM_PER_MS >= 2.0 Nm/ms -> PASS_SIMULATION
IF SIM_PARAM_REGEN_DECAY_NM_PER_MS < 2.0 Nm/ms -> BLOCK_SIMULATION (Reason: Vehicle pitch tracking response unstable)
Required Proof Artifact Template: Dynamic simulated axle torque trace spreadsheet output.
Data Level Upgrade Requirement: Inverter application manual data sheet.
7. ABS/ESC Interaction with Regen Loss
Missing Supplier Parameter: Minimum latency time for a full motor torque dump request following a factory traction intervention message (t_abs_dump).
Placeholder Input Field: SIM_PARAM_ABS_TORQUE_DROP_MS = 15.0 ms (Range: 5.0 ms to 40.0 ms).
Status / Allowed Use: NominalEngineeringAssumption / Control algorithm design modeling.
Blocked Use: Vehicle slip control loop calibration validation or test track operational clearance.
Draft Pass/Block Logic:
IF SIM_PARAM_ABS_TORQUE_DROP_MS <= 30.0 ms -> PASS_SIMULATION
IF SIM_PARAM_ABS_TORQUE_DROP_MS > 30.0 ms -> BLOCK_SIMULATION (Reason: High tire wheel-slip risk during hydraulic brake active phase)
Required Proof Artifact Template: Simulation network node timing analyzer text report.
Data Level Upgrade Requirement: Co-engineered Ford upfitter network messaging protocol verification logs.
8. EHPS Pump Failure
Missing Supplier Parameter: Driver steering input wheel torque delta under manual steering power backup transitions (delta_tau_steer).
Placeholder Input Field: SIM_PARAM_MANUAL_STEER_EFFORT_NM = 40.0 Nm (Range: 25.0 to 60.0).
Status / Allowed Use: SupplierDataPending / Ergonomic force analysis and virtual model generation.
Blocked Use: Real vehicle physical driver handling evaluations or field track clears.
Draft Pass/Block Logic:
IF SIM_PARAM_MANUAL_STEER_EFFORT_NM <= 50.0 Nm -> PASS_SIMULATION
IF SIM_PARAM_MANUAL_STEER_EFFORT_NM > 50.0 Nm -> BLOCK_SIMULATION (Reason: Exceeds steering manual control muscle load parameters)
Required Proof Artifact Template: Finite element driver manual loading simulation matrix report.
Data Level Upgrade Requirement: Signed lab test engineering report on steering box feedback characteristics.
9. Brake Assist Pressure Loss
Missing Supplier Parameter: Minimum hydraulic fluid volume requirement to execute a safe stop without power assist (V_min_fluid).
Placeholder Input Field: SIM_PARAM_MIN_BRAKE_VOL_CC = 35.0 cc (Range: 20.0 to 50.0).
Status / Allowed Use: NeedsBrakeEngineerMapping / Safety logic design and software simulation.
Blocked Use: Vehicle road-test or mechanical dyno braking track clearance sign-off.
Draft Pass/Block Logic:
IF SIM_PARAM_MIN_BRAKE_VOL_CC <= 45.0 cc -> PASS_SIMULATION
IF SIM_PARAM_MIN_BRAKE_VOL_CC > 45.0 cc -> BLOCK_SIMULATION (Reason: Exceeds standard fluid volume displacement design constraints)
Required Proof Artifact Template: Fluid displacement safety margin simulation diagram chart.
Data Level Upgrade Requirement: Stamped engineering drawings from the hydraulic system upfitter group.
10. Steering Assist Pressure Loss
Missing Supplier Parameter: Minimum line pressure baseline for power-assisted gear engagement (P_min_steer).
Placeholder Input Field: SIM_PARAM_MIN_STEER_PRESS_PSI = 300.0 PSI (Range: 150.0 to 500.0).
Status / Allowed Use: NominalEngineeringAssumption / Pump monitoring system control script mapping.
Blocked Use: Fleet hardware setup validation or live track runs.
Draft Pass/Block Logic:
IF SIM_PARAM_MIN_STEER_PRESS_PSI >= 200.0 PSI -> PASS_SIMULATION
IF SIM_PARAM_MIN_STEER_PRESS_PSI < 200.0 PSI -> BLOCK_SIMULATION (Reason: Below hydraulic power-assist threshold assumptions)
Required Proof Artifact Template: Pressure circuit monitoring sensor feedback simulation trace sheet.
Data Level Upgrade Requirement: Component supplier engineering calibration sheet data.
11. Low-Voltage DC-DC Brownout
Missing Supplier Parameter: Minimum input low-voltage threshold before auxiliary microcontrollers drop offline (V_low_mcu).
Placeholder Input Field: SIM_PARAM_MCU_DROP_VOLTAGE = 9.0 V (Range: 7.5 V to 10.5 V).
Status / Allowed Use: SupplierDataPending / Load-shedding algorithm simulation and state development.
Blocked Use: Vehicle hardware electrical design sign-off or live power grid connection runs.
Draft Pass/Block Logic:
IF SIM_PARAM_MCU_DROP_VOLTAGE <= 9.5 V -> PASS_SIMULATION
IF SIM_PARAM_MCU_DROP_VOLTAGE > 9.5 V -> BLOCK_SIMULATION (Reason: Component drops offline too early for load-shed safety windows)
Required Proof Artifact Template: Digital power rail depletion simulation logging metrics.
Data Level Upgrade Requirement: Silicon hardware specification data reference files from the module developer.
12. Coolant Pump Failure
Missing Supplier Parameter: Maximum allowable time window for a pump speed mismatch before flagging a fault (t_pump_err).
Placeholder Input Field: SIM_PARAM_PUMP_FAULT_WINDOW_S = 3.0 s (Range: 1.0 to 10.0).
Status / Allowed Use: SourcePending / Thermal system management software model loops.
Blocked Use: Thermal loop commissioning validation or physical continuous duty testing.
Draft Pass/Block Logic:
IF SIM_PARAM_PUMP_FAULT_WINDOW_S <= 5.0 s -> PASS_SIMULATION
IF SIM_PARAM_PUMP_FAULT_WINDOW_S > 5.0 s -> BLOCK_SIMULATION (Reason: Overheating risk for inverter semiconductors)
Required Proof Artifact Template: Thermal tracking profile simulator report data sheet.
Data Level Upgrade Requirement: Pump firmware LIN messaging documentation.
13. Overtemperature
Missing Supplier Parameter: Thermal current derating slope scaling factor (K_derate in A/degC).
Placeholder Input Field: SIM_PARAM_THERMAL_DERATE_SLOPE = 5.0 A/C (Range: 2.0 to 15.0).
Status / Allowed Use: SupplierDataPending / Vehicle performance estimation tracking models.
Blocked Use: Component thermal stress profile confirmation or real-world towing verification.
Draft Pass/Block Logic:
IF SIM_PARAM_THERMAL_DERATE_SLOPE >= 2.0 A/C -> PASS_SIMULATION
IF SIM_PARAM_THERMAL_DERATE_SLOPE < 2.0 A/C -> BLOCK_SIMULATION (Reason: Thermal safety current protection scaling is too weak)
Required Proof Artifact Template: Simulated power reduction curves versus rising virtual thermistor temperature arrays.
Data Level Upgrade Requirement: Traction package physical thermal mapping parameters.
14. CAN Communication Loss
Missing Supplier Parameter: Maximum allowable network node timeout counter window before triggering a hard safe state switch (t_can_timeout).
Placeholder Input Field: SIM_PARAM_CAN_TIMEOUT_MS = 100.0 ms (Range: 50.0 ms to 250.0 ms).
Status / Allowed Use: NominalEngineeringAssumption / Network management state tracking.
Blocked Use: System communications validation signature clear.
Draft Pass/Block Logic:
IF SIM_PARAM_CAN_TIMEOUT_MS <= 200.0 ms -> PASS_SIMULATION
IF SIM_PARAM_CAN_TIMEOUT_MS > 200.0 ms -> BLOCK_SIMULATION (Reason: Exceeds safety limits for uncommanded torque operations)
Required Proof Artifact Template: High-speed CAN simulation message architecture drop log.
Data Level Upgrade Requirement: Central network safety interface systems developer specification sheets.
15. Water Intrusion / IP Seal Failure
Missing Supplier Parameter: Maximum allowable vacuum decay rate parameter for structural high-voltage enclosure testing (delta_P_leak).
Placeholder Input Field: SIM_PARAM_VAC_LEAK_RATE_MBAR_MIN = 2.0 mbar/min (Range: 0.5 to 5.0).
Status / Allowed Use: SourcePending / Enclosure structural analysis modeling.
Blocked Use: Manufacturing line validation stamp or physical pack component tracking.
Draft Pass/Block Logic:
IF SIM_PARAM_VAC_LEAK_RATE_MBAR_MIN <= 3.0 mbar/min -> PASS_SIMULATION
IF SIM_PARAM_VAC_LEAK_RATE_MBAR_MIN > 3.0 mbar/min -> BLOCK_SIMULATION (Reason: Seal degradation rate too high to guarantee IP67 rating)
Required Proof Artifact Template: Simulated pressure decay curve structural worksheet logs.
Data Level Upgrade Requirement: Mechanical engineering structural seal laboratory validation data sheet.
Part 5: Gate 05 - CAN / Controls Deep Dive Initiation
Network Topology Setup
The interface requires a split multi-channel physical bus architecture map to sit between the factory Ford vehicle framework and the conversion powertrain nodes:
  [FACTORY FORD BACKBONE]                                      [CONVERSION EV POWERTRAIN]
   Ford Chassis CAN (500k) <---+                       +---> EV Traction Inverter Loop (500k)
                               |                       |
   Ford Body Builder CAN <-----+--> [CENTRAL VCU] <----+--> EV Battery Management (BMS) Loop (500k)
                               |    GATEWAY ROUTER     |
   Ford Comfort/Cab CAN <------+                       +---> EV Aux Monitoring Loop (250k J1939)
Initial Network Sniffing Interface Config Matrix
Channel Index | Target Physical Bus | Bit Rate / Protocol | Default Source Address Allocation | Essential Sniffing Targets
CAN_0 | Ford Secondary Chassis | 500 kbps / Standard | 0xEF (Diagnostic Tool Slot) | Wheel speed signals, accelerator pedal position, brake switch state.
CAN_1 | Ford Upfitter Gateway | 500 kbps / Standard | 0x22 (Aux Controls Module) | Dashboard warning status bytes, ignition power state, engine speed request feedback.
CAN_2 | Dedicated EV Drivetrain | 500 kbps / CAN FD Extended | 0x01 (Master VCU Engine Controller) | Inverter torque feedback, actual voltage/current loops, active diagnostic error arrays.
CAN_3 | Dedicated EV Battery | 500 kbps / Standard | 0x32 (Pack Master BMS Node) | Minimum/maximum cell voltage status strings, thermistor arrays, contactor state flags.
