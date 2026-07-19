Gate 05H — Hardware-in-the-Loop (HIL) Test Environment & Automated Validation Protocol
No timeout, heartbeat, alive-counter, torque-zero, shutdown, or contactor-open timing validated in this protocol may become physical gate logic until confirmed by bench proof or physical HIL run-time executions. Until then, all behaviors, scripts, and parameters below are restricted to Simulation-Only Model Assertions.
1. HIL Test Harness Architecture & Parameter Controls
To safely validate the network boundaries and state transitions defined in Gates 05F and 05G without exposing hardware to high voltage, the real-time HIL simulator must replicate physical signals through direct I/O and communication interfaces.
       ┌─────────────────────────────────────────────────────────┐
       │             HIL REAL-TIME SIMULATION ENGINE             │
       └─────┬───────────────────┬─────────────────────────┬─────┘
             │                   │                         │
     [CAN Simulators]     [Analog/Digital IO]       [Fault Injection Unit]
     • CAN_1: Silent      • Brake Switch Sim        • FIU Inline Relays
     • CAN_2: Inverter    • Accel Pedal Sim         • Short-to-GND/VCC
     • CAN_3: BMS         • HVIL Continuity         • Bus Open Circuits
             │                   │                         │
             └───────────────────┼─────────────────────────┘
                                 ▼
                     ┌───────────────────────┐
                     │  CONVERSION VCU (DUT) │
                     └───────────────────────┘
Real-Time Simulator Parameter Controls
Low-Voltage Rail Simulation (V_sys): Programmable DC power supply controlled via EtherCAT/LAN. Normal operational range: 11.8V to 14.2V. Slew rate capability: >= 20V/ms to simulate cranking drops and total low-voltage power loss.
Accelerator Pedal Sensor Simulation (APPS): Dual-channel isolated analog outputs (0V to 5V) with programmable independent channel skewing to simulate tracking errors.
Brake Switch Simulation: Digital dry-contact relay outputs mimicking unverified Ford UIM/factory path discrete transitions.
HVIL Loop Continuity: A closed-loop digital output driving a solid-state switch to simulate physical hardware loop breaks (< 1ms response time).
2. Automated HIL Fault Injection Matrix Template
This matrix defines the automated test execution parameters for the HIL Fault Injection Unit (FIU) to validate the containment rules established in Gate 05G.
Test ID
Target Domain / Interface
Fault Insertion Method
VCU Expected Response
Downstream Verification Target
Pass Criteria Metric
HIL-05G-001
CAN_1 (Ford Chassis Gateway Interface)
FIU forces physical short between CAN-H and CAN-L for 500ms.
VCU internal error flags increment; no attempts to reset transmission lines.
Zero frame leakage or network degradation on simulated OEM nodes.
VCU CAN_1 error counter increments without frame transmission attempts.
HIL-05G-002
CAN_2 (Isolated EV Inverter Sub-Loop)
Stop cyclic inverter heartbeat injection from HIL side.
VCU drops internal target torque to 0Nm within 10ms; moves to FAULT_LATCHED.
Sim Inverter enters safety gate disable block via timeout tracking.
CAN_2 VCU Torque Command payload == 0x0000 within <= 20ms of drop.
HIL-05G-003
CAN_3 (Isolated EV Battery Control Loop)
Drop BMS status and safety frame injection sequence.
VCU commands immediate emergency torque zero; changes state to FAULT_LATCHED.
Sim BMS independently drops virtual contactor logic outputs.
Emergency shutdown request frame sent on CAN_3 before timeout expiration.
HIL-05G-004
Main Power Interface (V_SYS_VCU)
FIU opens inline power supply relay to VCU hardware pins.
VCU drops to unpowered state; all communication nodes terminate.
Sim Inverter enters safe coast mode; Sim BMS drops contactor command outputs.
All physical VCU low-side and high-side driver pins float open within < 2ms.
HIL-05G-005
CAN_2 Physical Layer Topology
FIU shorts CAN_2 Tx pin directly to Ground at VCU transceiver input.
VCU internal Transceiver Dominant Timeout (DTO) circuit activates.
Physical bus released; other simulated loop participants continue error-free.
Total bus lockup duration <= 2ms before node auto-isolation occurs.
HIL-05G-006
CAN_3 Data Stream Protocol
Inject corrupted Rolling Counter and inverted Checksum inside BMS frames.
VCU rejects individual corrupted frames; falls back to last verified safe value.
If condition persists >= 3 cycles, VCU executes soft torque zero request.
System state changes to FAULT_LATCHED exactly 30ms (3 x frame period) after injection.
3. Cyclic Performance & Failsafe Validation Scripts
These Python-based execution scripts run natively on the HIL automation server to enforce boundary conditions, monitor timing constraints, and confirm the listen-only proof rules defined in Gate 05F.
Script A: Automated Listen-Only Verification & Silent Mode Audit
import time
import hil_system_api as hil
import can_bus_analyzer as can

def run_gate_05f_silent_audit():
    print("[INIT] Starting Gate 05F Listen-Only Physical/Logical Verification...")
    
    # Step 1: Initialize HIL Environment and start logging CAN_1
    hil.set_power_rail(voltage=13.5)
    can.start_logging(channel="CAN_1", output_file="gate_05f_audit.blf")
    
    # Step 2: Trigger state machine sweeps to induce potential transmit leakage
    hil.set_digital_output("Ford_Ignition_Proxy", "ACC")
    time.sleep(1.0)
    hil.set_analog_output("APPS_Ch1", 4.5) # Simulate full pedal request
    hil.set_analog_output("APPS_Ch2", 2.25)
    
    # Step 3: Stop capture and analyze buffer for transmit attempts
    time.sleep(5.0)
    can.stop_logging(channel="CAN_1")
    frames = can.parse_log("gate_05f_audit.blf")
    
    transmitted_frames = [f for f in frames if f.direction == "TX" or f.is_ack_asserted]
    
    # Enforce Gate 05F Proof Requirement: Zero TX packets, Zero ACKs
    if len(transmitted_frames) > 0:
        print(f"[FAIL] Transmit violation detected! Frame count: {len(transmitted_frames)}")
        for f in transmitted_frames:
            print(f"       Violating ID: {hex(f.id)} | Payload: {f.data}")
        return "GATEWAY_DEPLOYMENT_BLOCKED"
    
    print("[PASS] Listen-only confirmation validated. Zero transmission/ACK footprints found.")
    return "VERIFICATION_STAGE_PASSED_SIM"
Script B: Inverter Heartbeat Timeout and Dynamic Auto-Zero Tracking
def run_gate_05g_timeout_tracking():
    print("[INIT] Executing CAN_2 Inverter Dropout Timing Analysis...")
    
    # Ensure system is simulated in dynamic drive state
    hil.set_power_rail(voltage=13.5)
    hil.set_state("DRIVE_ENABLED")
    hil.start_cyclic_frame_injection(bus="CAN_2", id=0x201, period_ms=10) # Sim Inverter Live
    time.sleep(0.5)
    
    # Verify baseline torque request is active in simulation loop
    hil.set_analog_output("APPS_Ch1", 2.5) 
    time.sleep(0.2)
    
    # Step 1: Assert fault by stopping the simulated inverter feedback loop
    print("[ACTION] Injecting Inverter Silent Fault Event...")
    hil.stop_cyclic_frame_injection(bus="CAN_2", id=0x201)
    fault_time = hil.get_high_resolution_timestamp()
    
    # Step 2: Monitor CAN_2 Bus for VCU auto-zero assertion
    torque_zeroed = False
    while (hil.get_high_resolution_timestamp() - fault_time) < 0.100: # 100ms window max
        latest_frame = can.get_latest_frame(bus="CAN_2", id=0x101) # VCU Torque Command ID
        if latest_frame and latest_frame.data[0:2] == [0x00, 0x00]:
            zero_time = hil.get_high_resolution_timestamp()
            latency = (zero_time - fault_time) * 1000
            print(f"[PASS] Torque command zeroed successfully in {latency:.2f} ms.")
            torque_zeroed = True
            break
            
    if not torque_zeroed:
        print("[FAIL] VCU failed to clear torque command within safety allocation limits.")
        return "SYSTEM_EXECUTION_MODE_BLOCKED"
        
    return "VERIFICATION_STAGE_PASSED_SIM"
Part 4: Parallel Gate Summary Metrics
 [GATE 05F: BOUNDARY SAFETY] ──► [GATE 05G: FAULT CONTAINMENT] ──► [GATE 05H: HIL TESTING & SCRIPTS]
  Status:                         Status:                           Status:
  ISOLATION_RULES_ESTABLISHED     FAILSAFE_MATRIX_MAPPED            HIL_TEST_HARNESS_CONFIGURED
  SIMULATION_ONLY_RESTRICTION     SIMULATION_ONLY_RESTRICTION       SIMULATION_ONLY_RESTRICTION
IF HIL_SCRIPT_CHECK == "05H_VALIDATION":
    IF logic_trace_captured == "FALSE" OR script_execution_status == "UNRUN":
        BENCH_INTEGRATION_APPROVAL = "BLOCKED"
        MONITOR_MODE = "SIMULATION_SCRIPTS_ONLY"
