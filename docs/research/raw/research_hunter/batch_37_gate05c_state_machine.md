Part 1: Updates to Gate 05A & 05B Protocols
VCU Decisions (Internal Processing Logic Updates)
Torque Demand Arbitration: SimulationOnly until verified pedal source, brake override, plausibility checks, inverter DBC, BMS limits, and controls engineer review exist.
Pre-Charge Sequence Management: SimulationOnly until BMS/PDU supplier architecture confirms whether VCU, BMS, or PDU owns pre-charge authority. Note: The VCU shall not assume direct control over contactors or pre-charge loops until explicit functional safety ownership is established by hardware documentation.
Thermal Derating: SimulationOnly until supplier derating curves and component temperature limits are loaded.
Driver Warnings (Visual Display Boundary Update)
Aesthetic & Thermal Signaling: System state warnings, thermal limit flags, and battery State of Charge (SOC) tracking may exist exclusively on isolated, EV-side custom displays. Interfacing, flashing, or injecting frames onto the factory Ford instrument cluster is strictly blocked until officially authorized.
Part 2: Gate 05C - Controls State Machine
1. OFF Baseline Rest State
Required Inputs: E_Ignition_State_Discrete == OFF, M_CHG_Plug_Connected == FALSE.
Allowed EV-side Outputs: All internal nodes unpowered or in deep sleep. Low-voltage awake signals active only for supervisory keep-alive telemetry.
Blocked Ford-side Outputs: Frame transmission completely disabled on CAN_1.
Fault Transitions: Immediate jump to FAULT_LATCHED if low-voltage terminal metrics fail baseline plausibility window checks.
Proof Artifact: Software register state logging trace exports showing idle system loops.
Verification Status: UNVERIFIED_STAGE
2. ACCESSORY Low Voltage Initialization
Required Inputs: E_Ignition_State_Discrete == ACC, High-Voltage Interlock Loop (HVIL) circuit validated complete.
Allowed EV-side Outputs: Power delivery enabled to thermal cooling pumps, accessory controllers, and isolated EV cabin displays.
Blocked Ford-side Outputs: Active vehicle movement commands or torque arbitration messaging on any network interface.
Fault Transitions: Drop directly to FAULT_LATCHED if HVIL continuity breaks or if sub-component CAN nodes fail to handshake.
Proof Artifact: Low-voltage startup sequence trace showing active low-power hardware bus handshakes.
Verification Status: UNVERIFIED_STAGE
3. READY_REQUEST System Readiness Assessment
Required Inputs: E_Ignition_State_Discrete == START/RUN, E_Brake_Switch_Discrete == TRUE (Simulation-Only baseline check), M_BMS_Pack_Volt inside nominal window.
Allowed EV-side Outputs: Send initialization wake requests to the isolation components.
Blocked Ford-side Outputs: Any active vehicle drive parameters or cluster state manipulation.
Fault Transitions: Shift to FAULT_LATCHED if startup timeout counter expires before response frames clear.
Proof Artifact: Initialization state routine telemetry log matrix.
Verification Status: UNVERIFIED_STAGE
4. PRECHARGE_REQUEST High Voltage Bus Equalization
Required Inputs: Authority verification confirmed via BMS/PDU interface data structure. M_BMS_Pack_Volt visible on inputs.
Allowed EV-side Outputs: Monitor pre-charge voltage slope parameters (SimulationOnly tracking until owner authority is finalized by supplier review).
Blocked Ford-side Outputs: Transmission onto factory network nodes remains blocked.
Fault Transitions: Transition to FAULT_LATCHED if bus voltage fails to climb to >95% of pack voltage within specified threshold limits.
Proof Artifact: Simulated pre-charge curve slope trace data logs.
Verification Status: UNVERIFIED_STAGE
5. READY_TO_DRIVE High Voltage Contactor Closure
Required Inputs: Main high-voltage positive and negative contactor confirmation received from safety controller.
Allowed EV-side Outputs: Traction inverter high-voltage bus active flag, auxiliary DC-DC converter startup tracking.
Blocked Ford-side Outputs: Outbound driver display commands or chassis frame manipulation.
Fault Transitions: Route to EMERGENCY_SHUTDOWN if contactor status drops out unexpectedly during check.
Proof Artifact: State machine execution logging capture.
Verification Status: UNVERIFIED_STAGE
6. DRIVE_ENABLED Active Propulsion Loop
Required Inputs: Shift position state == D, verified driver demand inputs (SimulationOnly scaling rules apply).
Allowed EV-side Outputs: Regulated torque demand commands transmitted strictly on isolated CAN_2 to the inverter.
Blocked Ford-side Outputs: Directly routing unverified accelerator inputs to physical torque paths or commanding native Ford systems.
Fault Transitions: Move to DERATE on minor out-of-bounds metrics; drop instantly to EMERGENCY_SHUTDOWN on major safety metric violations.
Proof Artifact: Isolated loop torque reference vs response software chart capture.
Verification Status: UNVERIFIED_STAGE
7. DERATE Performance Mitigation Mode
Required Inputs: Temperature flags crossing initial warning map markers or secondary sensor tracking deviations.
Allowed EV-side Outputs: Apply a scaling factor to reduce torque authority on the isolated motor network.
Blocked Ford-side Outputs: Message mapping to the factory cluster or stock driver warning system.
Fault Transitions: Escalate directly to EMERGENCY_SHUTDOWN if critical safe thermal bounds are breached.
Proof Artifact: Software torque clamp execution logic trace capture.
Verification Status: UNVERIFIED_STAGE
8. FAULT_LATCHED Safe Non-Operational Lockout
Required Inputs: Active system fault flag registration.
Allowed EV-side Outputs: Isolated fault code storage, transmission of diagnostic status registers to EV-side auxiliary display tools.
Blocked Ford-side Outputs: Zero transmission activity permitted on the primary vehicle network.
Fault Transitions: System remains locked in this configuration until a dedicated low-voltage hard power cycle or clear routine is issued.
Proof Artifact: Non-volatile error register state map test report.
Verification Status: UNVERIFIED_STAGE
9. SERVICE_MODE Technician Diagnostic Configuration
Required Inputs: Valid service key identifier handshake, E_Ignition_State_Discrete == OFF, vehicle velocity == 0.
Allowed EV-side Outputs: Open high-voltage interlock lines for physical maintenance validation checking.
Blocked Ford-side Outputs: All network transmission arrays completely disabled.
Fault Transitions: Drop into FAULT_LATCHED if structural interlocks detect unexplained line activity.
Proof Artifact: Diagnostic tool interface communications trace log.
Verification Status: UNVERIFIED_STAGE
10. CHARGE_CONNECTED High Voltage Charging Interlock
Required Inputs: M_CHG_Plug_Connected == TRUE, vehicle velocity == 0, E_Ignition_State_Discrete == OFF.
Allowed EV-side Outputs: Isolate drivetrain components and hand control authority over to the charging subsystem controller stack.
Blocked Ford-side Outputs: Propulsion commands or forward powertrain drive request messaging.
Fault Transitions: Move to EMERGENCY_SHUTDOWN if plug detection status drops out abruptly while charge current remains active.
Proof Artifact: Charger isolation flag status tracking report.
Verification Status: UNVERIFIED_STAGE
11. EMERGENCY_SHUTDOWN Rapid De-Energization Sequence
Required Inputs: Major safety line breach or manual emergency stop assertion detected by monitoring algorithms.
Allowed EV-side Outputs: Direct command to isolate high-voltage systems instantly, dropping torque command to 0 Nm over the isolated motor sub-loop.
Blocked Ford-side Outputs: All frame interactions on factory networks are cut to prevent bus interference during line collapse.
Fault Transitions: Latches into this configuration until a physical inspection and master diagnostic hard clear routine is performed.
Proof Artifact: Fault interrupt handler code log timeline capture.
Verification Status: UNVERIFIED_STAGE
