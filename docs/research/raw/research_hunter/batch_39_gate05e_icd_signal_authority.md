Part 1: Revised Control State Definitions (Safety & Ownership Corrections)
1. State: OFF
Action: Maintain baseline isolation and open-circuit status across all high-voltage sub-systems.
Primary Owner: BMS / Hardwired Safety Circuit. Low-voltage supervisor / BMS keep-alive may own sleep-state monitoring.
VCU Role: MONITOR only if low-power supervisor mode is active; otherwise dormant.
Allowed Inputs: E_Ignition_State_Discrete == OFF (Listen-Only via CAN_1), M_CHG_Plug_Connected == FALSE (Verified EV-side input).
Allowed EV-side Outputs: Isolated low-voltage supervisory telemetry log state tracking (if awake in low-power supervisor mode).
Blocked Outputs: Any frame transmission or packet injection on Ford factory networks (CAN_1). Direct hardware control of battery containment arrays.
Fault Transitions: Move to FAULT_LATCHED if low-voltage standby metrics fail baseline plausibility bounds.
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Final PDU/BMS interior electrical schematics and low-voltage supervisor wake-up sleep current targets.
Proof Artifact: Software register state logging trace exports showing idle system loops.
Build Engine Status: SIMULATION_ONLY
2. State: ACCESSORY
Action: Power low-voltage sub-components, thermal management elements, and isolated auxiliary devices.
Primary Owner: Ford Module (Factory Ignition Hub) / VCU for isolated EV auxiliary relays.
VCU Role: OWNER of isolated EV-side relays; MONITOR of Ford network status.
Allowed Inputs: E_Ignition_State_Discrete == ACC (Listen-Only via CAN_1), High-Voltage Interlock Loop (HVIL) circuit validated complete (Hardwired safety input).
Allowed EV-side Outputs: Power delivery to low-voltage component controllers and isolated EV cabin displays. Thermal pumps may run only if low-voltage power budget, pump ownership, and thermal controller authority are verified.
Blocked Outputs: Transmission of vehicle propulsion parameters, torque requests, or cluster state overrides on native Ford networks.
Fault Transitions: Transition to FAULT_LATCHED if hardwired HVIL continuity breaks or if sub-component CAN handshakes time out.
Ownership Status: PENDING_SUPPLIER_DATA
Supplier/Ford Data Needed: Low-voltage DC budget validation tables, thermal controller firmware interface specifications, and pump pinout maps.
Proof Artifact: Low-voltage startup sequence trace showing active low-power hardware bus handshakes.
Build Engine Status: SIMULATION_ONLY
5. State: READY_TO_DRIVE
Action: Close main positive/negative contactors.
Primary Owner: PENDING — Likely BMS/PDU safety controller, not assumed.
VCU Role: REQUESTER / MONITOR only.
Allowed Inputs: Pre-charge complete, BMS discharge allowed, isolation valid, HVIL valid, no active critical faults, inverter ready, low-voltage rail healthy, brake pressed or required start condition met (Authorized upfitter input), shift state valid.
Allowed EV-side Outputs: VCU may request drive-enable state confirmation. Torque command remains blocked until DRIVE_ENABLED state is entered and all torque-authority conditions are satisfied.
Blocked Outputs: Direct contactor coil control without supplier approval, Ford PCM/ABS/ESC spoofing, factory cluster "ready" message injection. Torque commands are strictly blocked.
Fault Transitions: Contactor does not close -> FAULT_LATCHED, contactor feedback mismatch -> FAULT_LATCHED, weld detection -> FAULT_LATCHED, HVIL opens -> EMERGENCY_SHUTDOWN_REQUEST.
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Structural contactor internal feedback channel descriptions and verification constraints.
Proof Artifact: BMS/PDU contactor state signals, contactor feedback loop map, supplier startup sequence, HIL trace.
Build Engine Status: SIMULATION_ONLY
9. State: SERVICE_MODE
Action: Configure low-voltage networks for maintenance access and physical loop tracking.
Primary Owner: Certified Technician / Manual Lockout-Tagout (LOTO) Physical Hardware.
VCU Role: CONTROLLED_INTERFACE node only. The VCU can provide diagnostics, but it shall not make physical service "safe" by software alone; manual verification of the absence of voltage is mandatory.
Allowed Inputs: Valid maintenance key identifier handshake (Authorized upfitter input), E_Ignition_State_Discrete == OFF (Listen-Only via CAN_1), vehicle velocity == 0.
Allowed EV-side Outputs: Maintenance configuration status tracking and diagnostics streamed to service tools.
Blocked Outputs: All network transmission arrays across factory channels completely disabled. Software-asserted safety clear overrides are completely blocked.
Fault Transitions: Force to FAULT_LATCHED if isolation checks show unmapped live voltage spikes.
Ownership Status: PENDING_SUPPLIER_DATA
Supplier/Ford Data Needed: Manual LOTO procedure documentation and certified physical test protocols for checking the absence of high voltage.
Proof Artifact: Diagnostic tool interface communications trace log.
Build Engine Status: SIMULATION_ONLY
11. State: EMERGENCY_SHUTDOWN
Action: Remove propulsion torque and request HV de-energization through the authorized BMS/PDU/hardwired safety architecture.
Primary Owner: Split ownership: Torque inhibit (VCU/Inverter), Contactor open (BMS/PDU or hardwired E-stop), HVIL break (hardwired safety circuit), restart lockout (BMS/PDU/VCU depending on architecture).
VCU Role: REQUESTER / COORDINATOR. May command torque zero on isolated inverter loop. May request contactor open. May latch internal fault. May not assume final HV isolation ownership until supplier docs prove it.
Entry Conditions: HVIL breach, isolation fault, contactor weld detection, critical overcurrent/overtemperature, manual E-stop, brake/steering assist critical failure, CAN control loss.
Allowed Outputs: Request or trigger EV-side torque inhibit, contactor-open sequence, and restart lockout through the authorized BMS/PDU safety architecture; torque zero command on isolated inverter bus; shutdown request to BMS/PDU; EV-side warning display; internal fault latch; service log.
Blocked Outputs: Ford factory cluster injection, factory ABS/ESC/airbag/security bus transmission, direct contactor control without authority, clearing fault automatically without inspection.
Exit Conditions: Physical inspection complete, fault source identified, service clear performed, supplier-defined restart conditions satisfied.
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Hardwired safety loop wiring diagrams and certified BMS shutdown protocol scripts.
Proof Artifact: E-stop wiring diagram, BMS/PDU shutdown sequence, contactor feedback logs, HIL emergency shutdown trace.
Build Engine Status: SIMULATION_ONLY
Part 2: Gate 05E — Interface Control Document / Signal Authority Table
1. Signal: Ford Accelerator Pedal Input
Source controller: Ford PCM / Accelerator Hub Module
Destination controller: Conversion VCU (Listen-Only Interface Deck)
Bus: CAN_1 (Body Builder Isolation Gateway)
Direction: Listen-only
Owner: Ford Motor Company / Factory Network
Requester: None (Passively captured baseline frame)
Allowed use: Compare driver-demand trend in simulation only.
Blocked use: Direct inverter torque command, physical torque arbitration, or road-test torque control. The VCU should not use a raw unverified Ford accelerator signal as physical torque authority.
Physical authority: BLOCKED / NO_AUTHORITY
Verification status: UNVERIFIED_STAGE
Proof artifact: Serial terminal text export of passive network capture without transceiver ack activation.
2. Signal: Ford Brake Switch State
Source controller: Ford ABS / Brake Pedal Sensor Module
Destination controller: Conversion VCU (Listen-Only Interface Deck)
Bus: CAN_1 (Body Builder Isolation Gateway)
Direction: Listen-only
Owner: Ford Motor Company / Factory Network
Requester: None (Passively captured baseline frame)
Allowed use: Simulation-only regen decay logic study.
Blocked use: Physical regen disable, braking validation, or safety control without confirmed signal source, debounce logic, and brake engineer review unless further evidence and research are provided.
Physical authority: BLOCKED / NO_AUTHORITY
Verification status: UNVERIFIED_STAGE
Proof artifact: Passive monitoring test capture tracking simulation node states.
3. Signal: EV Traction Torque Command
Source controller: Conversion VCU
Destination controller: EV Traction Inverter
Bus: CAN_2 (Isolated EV Inverter Sub-Loop)
Direction: Transmit (Strictly within isolated loop environment)
Owner: PENDING_OWNER — VCU on the isolated EV-side torque loop.
Requester: VCU Control Loop Logic
Allowed use: Dynamic performance and response evaluation inside simulation sweeps and HIL tests.
Blocked use: Transmission onto factory Ford safety or powertrain buses. Driving physical hardware prior to final code review and pedal/brake override verification.
Physical authority: SIMULATION_ONLY (Blocked from real-world road-test tracking until upgraded)
Verification status: UNVERIFIED_STAGE
Proof artifact: Inverter DBC structure mapping, software torque request validation test report.
4. Signal: Pre-Charge Inception Flag
Source controller: PENDING — BMS, PDU, or Inverter pending supplier architecture mapping
Destination controller: High-Voltage Pre-Charge Relay Circuit
Bus: CAN_3 (Isolated EV Battery Control Loop) / Direct Hardware IO
Direction: PENDING (Depends on hardware ownership allocation)
Owner: PENDING — BMS/PDU/Inverter supplier architecture required.
Requester: VCU may act as a REQUESTER only if supplier documentation explicitly permits.
Allowed use: Monitoring pre-charge circuit thermal load boundaries inside simulation models.
Blocked use: Direct software-commanded relay closure from the VCU without supplier architectural verification.
Physical authority: BLOCKED / PENDING_SUPPLIER_DATA
Verification status: UNVERIFIED_STAGE
Proof artifact: Supplier electrical layout schema documents, BMS contactor integration blueprint.
5. Signal: High Voltage Contactor Close Request
Source controller: Conversion VCU
Destination controller: BMS Safety Module / PDU Control Gateway
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Transmit request only
Owner: PENDING — Assumed BMS/PDU internal functional safety controller.
Requester: VCU (As a low-voltage coordinator requesting a state change)
Allowed use: Handshake sequencing testing inside simulated logic loops.
Blocked use: Directly driving hardware contactor coils or forcing state bypass overrides.
Physical authority: BLOCKED / NO_DIRECT_COMMAND_AUTHORITY
Verification status: UNVERIFIED_STAGE
Proof artifact: Shared VCU-BMS diagnostic communication trace mapping matrix.
6. Signal: Battery Management State of Charge
Source controller: BMS Safety Module
Destination controller: Conversion VCU / Isolated Cabin Display Node
Bus: CAN_3 (Isolated EV Battery Control Loop) to Display Loop
Direction: Receive
Owner: BMS Safety Module
Requester: Isolated EV Cabin Display Controller
Allowed use: Routing data streams exclusively to the isolated EV-side display panel.
Blocked use: Frame injection, packet bridging, or translation mapping targeting the native Ford factory instrument cluster.
Physical authority: DISPLAY_ONLY (Isolated Node containment)
Verification status: UNVERIFIED_STAGE
Proof artifact: Standalone display system wiring layout diagram.
7. Signal: Emergency Shutdown Inhibit Command
Source controller: Conversion VCU
Destination controller: EV Traction Inverter / BMS Safety Node
Bus: CAN_2 & CAN_3 (Isolated Sub-Networks)
Direction: Transmit request
Owner: Split Ownership (Torque inhibit: VCU/Inverter; Contactor open: BMS/PDU/Hardwired Safety Loop)
Requester: VCU (Acting as system monitor coordinator)
Allowed use: Zeroing simulated torque tables and dispatching soft shutdown requests on isolated loops.
Blocked use: Bridging shutdown data onto factory Ford safety networks (ABS, ESC, Airbag, or Immobilizer loops).
Physical authority: REQUESTER / COORDINATOR only (No direct physical contactor coil override authority)
Verification status: UNVERIFIED_STAGE
Proof artifact: Hardwired E-stop loop schematic draft, HIL fault interrupt injection chart.
Part 3: Parallel Gate Summary Metrics
 [GATE 08C: VALIDATION ENGINE] ──► [GATE 05A/B: CONTROLS MATRIX] ──► [GATE 05C/D: OPERATING STATES] ──► [GATE 05E: ICD REGISTRY]
  Status:                           Status:                           Status:                         Status:
  SIMULATION_SWEEP_MATRIX_CREATED   LOGIC_BOUNDS_TIGHTENED            COORDINATOR_ROLES_ISOLATED      SIGNAL_BOUNDARIES_MAPPED
  PARKED_FOR_SUPPLIER_DATA          SIMULATION_ONLY_RESTRICTION       PENDING_SUPPLIER_DATA           SIMULATION_ONLY_RESTRICTION
IF INTERFACE_CONTROL_CHECK == "05E_ICD":
    IF authority_status == "UNVERIFIED_STAGE" OR owner == "PENDING":
        PHYSICAL_HARDWARE_DRIVE = "BLOCKED"
        BUS_TRANSMISSION_FACTORY = "BLOCKED"
        EVALUATION_MODE = "SIMULATION_ICD_VERIFICATION_ONLY"
