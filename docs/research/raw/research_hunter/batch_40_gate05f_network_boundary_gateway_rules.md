Part 1: Revised Signal Authority Mapping (Decomposition & Source Adjustments)
1. Pre-Charge Subsystem Decomposition
Signal: VCU_Precharge_Request
Source controller: Conversion VCU
Destination controller: BMS / PDU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Transmit request only
Owner: Conversion VCU
Requester: VCU State Machine Layer
Allowed use: Dispatching low-voltage software readiness requests to the standalone battery controller during initialization cycles.
Blocked use: Forcing or overriding battery internal safety steps, closing high-voltage circuits directly.
Physical authority: BLOCKED until academic engineering wiring protocol confirms request is allowed.
Verification status: UNVERIFIED_STAGE
Proof artifact: Simulation state validation code trace capture.
Signal: BMS_Precharge_Status
Source controller: BMS / PDU
Destination controller: Conversion VCU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Receive
Owner: BMS / PDU
Requester: None
Allowed use: Monitoring pre-charge stage execution timing metrics to update internal state sequencer logic.
Blocked use: Modifying safety internal limits or changing battery protection parameters.
Physical authority: MONITOR only
Verification status: UNVERIFIED_STAGE
Proof artifact: DBC matrix entry validation test report.
Signal: Precharge_Relay_Coil_Control
Source controller: BMS / PDU or hardwired safety controller
Destination controller: Physical Pre-charge Relay Coil
Bus: Direct Hardware Low-Side / High-Side Drive Lines
Direction: Hardware actuation
Owner: BMS / PDU / Hardwired Safety Subsystem
Requester: BMS internal state safety controller
Allowed use: Actuating physical electrical points based on hardwired sensor measurements.
Blocked use: Direct VCU software override execution. The VCU is blocked from intervening.
Physical authority: BLOCKED for VCU unless architecture explicitly assigns it.
Verification status: UNVERIFIED_STAGE
Proof artifact: Supplier electrical schematic and hardware control allocation log.
2. Emergency Shutdown Subsystem Decomposition
Signal: VCU_Torque_Zero_Request
Source controller: Conversion VCU
Destination controller: EV Traction Inverter
Bus: CAN_2 (Isolated EV Inverter Sub-Loop)
Direction: Transmit request
Owner: VCU / Inverter
Requester: VCU Emergency Management Supervisor
Allowed use: Zeroing active torque request values immediately upon detecting a fault condition.
Blocked use: Bridging onto native Ford platform vehicle dynamics networks.
Physical authority: PENDING inverter DBC + HIL review.
Verification status: UNVERIFIED_STAGE
Proof artifact: Inverter torque clamp script routine check log.
Signal: VCU_Shutdown_Request_To_BMS
Source controller: Conversion VCU
Destination controller: BMS / PDU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Transmit request only
Owner: BMS / PDU
Requester: VCU Coordination Layer
Allowed use: Dispatching high-level soft isolation tracking system check messages.
Blocked use: Direct control over battery contactor internal drive coils.
Physical authority: VCU role is requester only; pending manual OEM academic research protocol.
Verification status: UNVERIFIED_STAGE
Proof artifact: Safe-state diagnostic frame log validation script.
Signal: Hardwired_EStop_Open_Circuit
Source controller: Manual Emergency Stop Circuit Loop / Inertia Switches
Destination controller: BMS Power Supply Coil / PDU Power Delivery Interrupters
Bus: Hardwired Safety Loop (No software layer)
Direction: Hardware interrupt break
Owner: Hardwired safety loop
Requester: Physical Human Operator / G-Force Sensor Break
Allowed use: Breaking low-voltage power path to the main isolation coils, forcing them open regardless of software status.
Blocked use: Any VCU software modification, override, delay, or filtering.
Physical authority: VCU role is monitor only; no software override allowed.
Verification status: UNVERIFIED_STAGE
Proof artifact: Certified electrical safety design blueprint.
Signal: BMS_Contactor_Open_Status
Source controller: BMS / PDU
Destination controller: Conversion VCU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Receive only
Owner: BMS / PDU
Requester: None
Allowed use: Updating VCU operating states to match the actual status of the high-voltage pack contacts.
Blocked use: Software-commanded closure attempts.
Physical authority: VCU role is monitor; receive only.
Verification status: UNVERIFIED_STAGE
Proof artifact: Diagnostic state feedback logging test.
3. Source Controller Regularization
Signal: Ford Accelerator Pedal Input
Source controller: Ford factory module / UIM path pending verification
Remaining parameters retain simulation-only constraints from Gate 05E.
Signal: Ford Brake Switch State
Source controller: Ford factory module / UIM path pending verification
Remaining parameters retain simulation-only constraints from Gate 05E.
Part 2: Gate 05F — Network Boundary / Gateway Safety Rules
1. Physical and Logical Isolation Architecture
The communication infrastructure is partitioned into three isolated buses to prevent accidental data injection or cross-talk between the OEM chassis and the aftermarket electric powertrain components.
CAN_1 (Ford Factory / Body Builder Gateway): Physically and logically Listen-Only. The transceiver hardware must be modified or configured to prevent transmission.
CAN_2 (Isolated EV Inverter Sub-Loop): Transmit and Receive. Restrained entirely to the VCU and the traction inverter.
CAN_3 (Isolated EV Battery Control Loop): Transmit and Receive. Restrained entirely to the VCU, BMS, and PDU.
2. Network Boundary Routing Rules
Cross-Boundary Allowed Directory (Ford-side to EV-side)
Only unweighted, passive driver-intent variables are allowed to cross the boundary into the VCU processing layer, subject to strict boundary validation limits:
Ford_Accel_Pedal_Raw_Proxy -> Allowed crossing for target value mapping comparisons in simulation models.
Ford_Brake_Switch_Raw_Proxy -> Allowed crossing for monitoring deceleration request trends in simulation models.
Ford_Ignition_State_Raw_Proxy -> Allowed crossing to trigger low-power wake-up sequences within the VCU subsystem.
Forbidden Crossing Directory (EV-side to Ford-side)
The following signal types are forbidden from crossing from the EV side to the Ford side:
All EV_Torque_Command or motor performance parameters.
All high-voltage metrics, including BMS_Pack_Voltage, BMS_Current, or Inverter_DC_Link_Voltage.
All aftermarket cooling system errors or thermal system alerts.
Any frame attempting to spoof original Ford PCM, ABS, ESC, or airbag controller IDs.
3. Gateway Failure & Timeout Management Protocols
Protocol A: Gateway Processor Crash / Lockup
If the VCU gateway firmware hangs, crashes, or suffers a watch-dog reset, the system must default to a safe state:
Hardware Response: The VCU CAN transceivers must drop into high-impedance states, immediately opening the lines to prevent bus lockup.
System Action: The traction inverter detects the loss of the VCU cyclic frame and drops to a zero-torque output state within 50ms. The BMS/PDU identifies the absence of the VCU_Precharge_Request or alive counter frame and initiates a controlled high-voltage shutdown sequence.
Protocol B: CAN_2 (EV Inverter Sub-Loop) Goes Silent
VCU Detection: Absence of inverter status telemetry frames for more than 100ms.
Safety Action: VCU changes its internal operating state to FAULT_LATCHED. It halts any downstream system activation loops and logs a communication failure code.
System State: The vehicle transitions immediately out of any operational mode, blocking subsequent high-voltage close attempts.
Protocol C: CAN_3 (EV Battery Control Loop) Goes Silent
VCU Detection: Absence of BMS heartbeat or status telemetry frames for more than 100ms.
Safety Action: VCU sets internal torque demand values to zero immediately on CAN_2 to remove load from the system. It transitions its state sequencer to FAULT_LATCHED.
System State: The BMS, operating independently, opens contactors under its own safety rules due to loss of the VCU supervisor connection.
4. Mandatory Listen-Only Proof Requirements
To verify that CAN_1 cannot transmit under any operating condition, the following five-part verification dossier must be produced and attached before moving past simulation status:
Listen-Only Proof Requirements Directive:
Silent Mode Register Configuration: The CAN controller initialization code must explicitly configure the CAN_1 peripheral into Silent/Listen-Only mode, separating the internal transmit line from the external physical TX pin.
No ACK Participation: The hardware transceiver must be configured or wired so it does not pull the bus dominant during the ACK slot of a received frame.
No Transmit Mailbox Allocation: The VCU firmware must allocate zero transmit mailboxes to the CAN_1 controller hardware instance.
Capture Log Attachment: A minimum 10-minute continuous raw CAN log export showing zero frame errors and zero injected IDs from the VCU node during active bus operations.
Hardware Configuration Screenshot: A screenshot of the register map configuration settings showing the controller operating mode bits set to listen-only mode.
Part 3: Parallel Gate Summary Metrics
 [GATE 05C/D: OPERATING STATES] ──► [GATE 05E: ICD REGISTRY] ──► [GATE 05F: NETWORK SAFETY BOUNDARIES]
  Status:                           Status:                     Status:
  COORDINATOR_ROLES_ISOLATED        SIGNAL_BOUNDARIES_MAPPED    ISOLATION_RULES_ESTABLISHED
  PENDING_SUPPLIER_DATA             SIMULATION_ONLY_RESTRICTION SIMULATION_ONLY_RESTRICTION
IF GATEWAY_RULE_CHECK == "05F_BOUNDARIES":
    IF listen_only_proof == "MISSING" OR isolation_status == "UNVERIFIED":
        GATEWAY_DEPLOYMENT = "BLOCKED"
        PHYSICAL_INJECTION_TEST = "FORBIDDEN"
        EXECUTION_MODE = "SIMULATION_BOUNDARY_LOGIC_ONLY"
