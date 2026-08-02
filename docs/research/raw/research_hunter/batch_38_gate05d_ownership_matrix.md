Gate 05D - State Transition + Ownership Matrix
Core Architectural Guardrails
The Coordination Principle: Coordinator != Owner | Requesting != Commanding | Monitoring != Approving | Seeing a signal != having authority to act on it.
The Build Engine Authority Law: No state transition may become physical-control authority until every action inside that transition has an assigned owner, allowed requester, blocked controller list, and proof artifact. If ownership is unknown, the VCU may simulate, monitor, or request only. It may not directly control.
Part 1: State Matrix Blocks
1. State: OFF
Action: Maintain baseline isolation and open-circuit status across all high-voltage sub-systems.
Primary Owner: BMS / Hardwired Safety Circuit.
VCU Role: MONITOR only.
Allowed Inputs: E_Ignition_State_Discrete == OFF (Listen-Only via CAN_1); M_CHG_Plug_Connected == FALSE (Verified EV-side input)
Allowed EV-side Outputs: Isolated low-voltage supervisory telemetry log state tracking.
Blocked Outputs: Any frame transmission or packet injection on Ford factory networks (CAN_1). Direct hardware control of battery containment arrays.
Fault Transitions: Move to FAULT_LATCHED if low-voltage standby metrics fail baseline plausibility bounds.
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Final PDU/BMS interior electrical schematics.
Proof Artifact: Software register state logging trace exports showing idle system loops.
Build Engine Status: SIMULATION_ONLY
2. State: ACCESSORY
Action: Power low-voltage sub-components, thermal management elements, and isolated auxiliary devices.
Primary Owner: Ford Module (Factory Ignition Hub) / VCU for isolated EV auxiliary relays.
VCU Role: OWNER of isolated EV-side relays; MONITOR of Ford network status.
Allowed Inputs: E_Ignition_State_Discrete == ACC (Listen-Only via CAN_1); HVIL circuit validated complete (Hardwired safety input)
Allowed EV-side Outputs: Power delivery to thermal cooling pumps, low-voltage component controllers, and isolated EV cabin displays.
Blocked Outputs: Transmission of vehicle propulsion parameters, torque requests, or cluster state overrides on native Ford networks.
Fault Transitions: Transition to FAULT_LATCHED if hardwired HVIL continuity breaks or if sub-component CAN handshakes time out.
Ownership Status: PENDING_SUPPLIER_DATA (for thermal power limits)
Supplier/Ford Data Needed: Component-level power consumption limits and cooling pump pinout allocations.
Proof Artifact: Low-voltage startup sequence trace showing active low-power hardware bus handshakes.
Build Engine Status: SIMULATION_ONLY
3. State: READY_REQUEST
Action: Process driver intent parameters to determine readiness for high-voltage system wake-up.
Primary Owner: VCU (State Coordination Layer).
VCU Role: REQUESTER / COORDINATOR only.
Allowed Inputs: E_Ignition_State_Discrete == START/RUN (Listen-Only via CAN_1); E_Brake_Switch_Discrete == TRUE (Simulation-Only baseline check); M_BMS_Pack_Volt inside nominal window (Supplier DBC input)
Allowed EV-side Outputs: Outbound wake-up request flags dispatched over isolated EV-side CAN loops.
Blocked Outputs: Interfacing, flashing, or injecting frames onto the factory Ford instrument cluster or chassis arrays.
Fault Transitions: Route to FAULT_LATCHED if the sub-system response timer expires before component handshake confirmation.
Ownership Status: UNVERIFIED_STAGE
Supplier/Ford Data Needed: Verified Ford Pro Upfitter Network interface specifications for wake confirmation.
Proof Artifact: Initialization state routine telemetry log matrix.
Build Engine Status: SIMULATION_ONLY
4. State: PRECHARGE_REQUEST
Action: Charge inverter DC-link / HV bus through pre-charge path.
Primary Owner: PENDING - BMS/PDU/Inverter supplier architecture required.
VCU Role: REQUESTER / MONITOR only.
Allowed Inputs: Charger disconnected (Verified EV-side input); HVIL valid (Hardwired safety input); Isolation valid (Supplier-confirmed input); No active fault latch; Low-voltage rail healthy; BMS awake, PDU awake, Inverter awake; BMS/PDU says pre-charge allowed
Allowed EV-side Outputs: VCU request_precharge signal on isolated EV-side network, if supplier permits; VCU log pre-charge state; EV-side display: "Pre-charge in progress"
Blocked Outputs: VCU directly energizing contactor coils unless supplier architecture explicitly assigns that authority; Any Ford factory network transmission; Any factory cluster injection
Fault Transitions: If pre-charge timeout -> FAULT_LATCHED; If voltage mismatch -> FAULT_LATCHED; If HVIL opens -> EMERGENCY_SHUTDOWN_REQUEST; If isolation fault -> FAULT_LATCHED / shutdown request
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Final supplier-defined pre-charge target curves and hardware timing thresholds.
Proof Artifact: Supplier wiring diagram, BMS/PDU contactor ownership document, DBC signal map, simulation state trace.
Build Engine Status: SIMULATION_ONLY
5. State: READY_TO_DRIVE
Action: Close main positive/negative contactors.
Primary Owner: PENDING - Likely BMS/PDU safety controller, not assumed.
VCU Role: REQUESTER / MONITOR only.
Allowed Inputs: Pre-charge complete; BMS discharge allowed; Isolation valid (Supplier-confirmed input); HVIL valid (Hardwired safety input); No active critical faults; Inverter ready; Low-voltage rail healthy; Brake pressed or required start condition met (Authorized upfitter input); Shift state valid
Allowed EV-side Outputs: VCU may request drive enable to BMS/PDU/inverter only on isolated EV-side bus; VCU may command torque only after confirmed ready state
Blocked Outputs: Direct contactor coil control without supplier approval; Ford PCM/ABS/ESC spoofing; Factory cluster "ready" message injection
Fault Transitions: Contactor does not close -> FAULT_LATCHED; Contactor feedback mismatch -> FAULT_LATCHED; Weld detection -> FAULT_LATCHED; HVIL opens -> EMERGENCY_SHUTDOWN_REQUEST
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Structural contactor internal feedback channel descriptions and verification constraints.
Proof Artifact: BMS/PDU contactor state signals, contactor feedback loop map, supplier startup sequence, HIL trace.
Build Engine Status: SIMULATION_ONLY
6. State: DRIVE_ENABLED
Action: Send motor torque request.
Primary Owner: VCU may become OWNER only on isolated EV inverter CAN after inverter DBC, BMS limits, pedal source, brake override, and controls review are verified.
VCU Role: PENDING_OWNER on EV-side isolated torque loop; NO_AUTHORITY on Ford factory torque/powertrain bus.
Allowed Inputs: Drive enabled / Contactor close complete; Inverter ready; BMS discharge allowed (Supplier-confirmed input); No fault latch; Brake override logic valid (Verified EV-side input); Accelerator plausibility valid (Verified EV-side input / Authorized upfitter input); Charger disconnected (Verified EV-side input); HVIL valid & Isolation valid (Hardwired safety inputs); Shift state valid & Low-voltage rail healthy
Allowed EV-side Outputs: Torque command to inverter on CAN_2 only; Torque limit command based on BMS/inverter constraints; Torque zero command during faults
Blocked Outputs: Forwarding unverified Ford pedal signal directly to inverter; Transmitting torque-related messages onto Ford chassis/powertrain network; Spoofing PCM or ABS/ESC messages
Fault Transitions: Brake pressed with accelerator conflict -> torque inhibit; BMS current limit -> derate; Inverter fault -> torque zero; CAN timeout -> torque zero / FAULT_LATCHED; Low-voltage brownout -> controlled stop request
Ownership Status: UNVERIFIED_STAGE (Awaiting full subsystem validation loop)
Supplier/Ford Data Needed: Verified accelerator pedal scaling mapping curves and brake validation protocols.
Proof Artifact: Inverter DBC, accelerator source verification, brake override logic test, pedal plausibility test, HIL torque trace.
Build Engine Status: SIMULATION_ONLY
7. State: DERATE
Action: Contract performance limits based on active safety threshold warnings.
Primary Owner: VCU / Inverter / BMS Shared Performance Loop.
VCU Role: PENDING_OWNER (for isolated mapping algorithms only).
Allowed Inputs: Temperature tracking indices crossing warning marks (Supplier DBC input); BMS current limit boundary constraints (Supplier-confirmed input)
Allowed EV-side Outputs: Throttled or scaled torque requests routed strictly on the isolated CAN_2 inverter network. Limit warnings targeted to isolated EV displays.
Blocked Outputs: Constructing or flashing fake MIL, temperature, or diagnostic fault frames on the native Ford cluster bus.
Fault Transitions: Advance directly to EMERGENCY_SHUTDOWN requests if critical thermal or current lines are breached.
Ownership Status: PENDING_SUPPLIER_DATA
Supplier/Ford Data Needed: Validated component engineering thermal performance charts and current derating steps.
Proof Artifact: Software torque clamp execution logic trace capture.
Build Engine Status: SIMULATION_ONLY
8. State: FAULT_LATCHED
Action: Secure a safe, non-operational software lock state to block drive activation.
Primary Owner: Shared (VCU / BMS / PDU Independent Diagnostic Registers).
VCU Role: OWNER of internal fault state logic; MONITOR of external safety node registers.
Allowed Inputs: Active diagnostic code registration from any verified EV-side sensor loop.
Allowed EV-side Outputs: Isolated fault code generation, fault code streaming to service laptops, error message output to isolated EV displays.
Blocked Outputs: Generating Ford factory Diagnostic Trouble Codes (DTCs) or active packet streaming on the vehicle's factory networks.
Fault Transitions: Permanent latching. System must remain in this block until cleared by an authorized technician configuration routine.
Ownership Status: UNVERIFIED_STAGE
Supplier/Ford Data Needed: Supplier diagnostic address parameters and structural clearing requirements.
Proof Artifact: Non-volatile error register state map test report.
Build Engine Status: SIMULATION_ONLY
9. State: SERVICE_MODE
Action: Configure low-voltage networks for maintenance access and physical loop tracking.
Primary Owner: Certified Technician via Specialized Diagnostic Tool.
VCU Role: CONTROLLED_INTERFACE node only.
Allowed Inputs: Valid maintenance key identifier handshake (Authorized upfitter input); E_Ignition_State_Discrete == OFF (Listen-Only via CAN_1); Vehicle velocity == 0
Allowed EV-side Outputs: Maintenance configuration status tracking on specialized diagnostic tools.
Blocked Outputs: All network transmission arrays across factory channels completely disabled.
Fault Transitions: Force to FAULT_LATCHED if isolation checks show unmapped live voltage spikes.
Ownership Status: PENDING_SUPPLIER_DATA
Supplier/Ford Data Needed: Master safe isolation procedures and physical test validation documentation.
Proof Artifact: Diagnostic tool interface communications trace log.
Build Engine Status: SIMULATION_ONLY
10. State: CHARGE_CONNECTED
Action: Manage vehicle isolation parameters during active high-voltage charging profiles.
Primary Owner: Charger Subsystem Controller / BMS.
VCU Role: MONITOR / System Lockout Coordinator.
Allowed Inputs: M_CHG_Plug_Connected == TRUE (Verified EV-side input); Vehicle velocity == 0; E_Ignition_State_Discrete == OFF (Listen-Only via CAN_1)
Allowed EV-side Outputs: Drivetrain propulsion lockout activation. Forward charging state statistics strictly to the isolated EV display.
Blocked Outputs: Propulsion commands or network manipulation targeting native Ford chassis, powertrain, or vehicle stability systems.
Fault Transitions: Transition immediately to EMERGENCY_SHUTDOWN if plug continuity breaks while active current loops remain closed.
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Charger CAN control protocol profiles and interlock timing specifications.
Proof Artifact: Charger isolation flag status tracking report.
Build Engine Status: SIMULATION_ONLY
11. State: EMERGENCY_SHUTDOWN
Action: Remove propulsion torque and de-energize HV system.
Primary Owner: Split ownership: Torque inhibit: VCU/Inverter; Contactor open: BMS/PDU or hardwired E-stop; HVIL break: hardwired safety circuit; Restart lockout: BMS/PDU/VCU depending on architecture
VCU Role: REQUESTER / COORDINATOR. May command torque zero on isolated inverter loop. May request contactor open. May latch internal fault. May not assume final HV isolation ownership until supplier docs prove it.
Entry Conditions: HVIL breach (Hardwired safety input); Isolation fault (Supplier-confirmed input); Contactor weld detection; Critical overcurrent / Critical overtemperature; Manual E-stop (Hardwired safety input); Brake/steering assist critical failure; CAN control loss
Allowed Outputs: Request or trigger EV-side torque inhibit, contactor-open sequence, and restart lockout through the authorized BMS/PDU safety architecture. Torque zero command on isolated inverter bus; Shutdown request to BMS/PDU; EV-side warning display; Internal fault latch, service log
Blocked Outputs: Ford factory cluster injection; Factory ABS/ESC/airbag/security bus transmission; Direct contactor control without authority; Clearing fault automatically without inspection
Exit Conditions: Physical inspection complete; Fault source identified; Service clear performed; Supplier-defined restart conditions satisfied
Ownership Status: PENDING_SUPPLIER_ARCHITECTURE
Supplier/Ford Data Needed: Hardwired safety loop wiring diagrams and certified BMS shutdown protocol scripts.
Proof Artifact: E-stop wiring diagram, BMS/PDU shutdown sequence, contactor feedback logs, HIL emergency shutdown trace, later bench proof.
Build Engine Status: SIMULATION_ONLY
Part 2: Final Responsibility Matrix Summarization
Action Block | Absolute Functional Owner | VCU Internal Role Assignment | Authority Status | Upgrade Requirement / Proof Block
Read Ford Wheel Speed | Ford Module | MONITOR only | UNVERIFIED_STAGE | Passive network capture data trace validation log.
Read Ford Brake Switch | Ford / UIM Architecture | MONITOR only | UNVERIFIED_STAGE | Functional check logs mapping physical pedal application vs bits.
Read Ford Accelerator | Ford / UIM Architecture | MONITOR only | UNVERIFIED_STAGE | Passive capture trace validation tracking noise and bounds.
Command Inverter Torque | VCU / Inverter Setup | PENDING_OWNER | UNVERIFIED_STAGE | Clean Inverter DBC, verified pedal source mapping, and peer review.
Request Pre-Charge | BMS / PDU Sub-System | REQUESTER / MONITOR | PENDING_SUPPLIER | Documented validation of supplier architecture authority.
Close Main Contactors | BMS / PDU Safety Node | REQUESTER / MONITOR | PENDING_SUPPLIER | Supplier interface trace documentation and loop logic maps.
Open Main Contactors | BMS / PDU / E-Stop Loop | REQUESTER / MONITOR | PENDING_SUPPLIER | Schematic sign-off detailing hardware-level open execution.
Run Coolant Pumps | VCU / Thermal Controller | PENDING_OWNER | UNVERIFIED_STAGE | Component wiring interface documents and thermal load profiles.
Derate Torque Limits | VCU / Inverter / BMS | PENDING_OWNER | UNVERIFIED_STAGE | Signed-off parameter array maps and HIL validation profiles.
Display EV Warning | EV Display Controller | OWNER (Isolated Node) | UNVERIFIED_STAGE | Wiring layout maps validating standalone display isolation.
Warn on Ford Cluster | Ford Factory Modules | BLOCKED | NO_AUTHORITY | Official written authorization from Ford Pro / Upfitter engineering.
ABS/ESC Intervention | Ford Factory Modules | MONITOR only | NO_CONTROL | Absolute blocking confirmation trace showing no injected CAN frames.
Fault Latch Action | VCU / BMS / PDU Array | SHARED_RECORDER | UNVERIFIED_STAGE | Comprehensive register address database map documentation.
Service Clear Interface | Technician Core Tooling | CONTROLLED Mode | UNVERIFIED_STAGE | Safe servicing step-by-step procedure reference manual.
Part 3: Parallel Gate Summary Metrics
 [GATE 08C: VALIDATION ENGINE] --> [GATE 05A: SIGNAL REGISTRY] --> [GATE 05B: CONTROLS MAP] --> [GATE 05C/D: MACHINE MATRIX]
  Status:                           Status:                       Status:                     Status:
  SIMULATION_SWEEP_MATRIX_CREATED   SIGNAL_REGISTRY_STARTED       LOGIC_BOUNDS_TIGHTENED      COORDINATOR_ROLES_ISOLATED
  PARKED_FOR_SUPPLIER_DATA          UNVERIFIED_STAGE              SIMULATION_ONLY_RESTRICTION PENDING_SUPPLIER_DATA
