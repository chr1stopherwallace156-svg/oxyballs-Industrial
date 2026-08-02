Gate 05H — Hardware-in-the-Loop (HIL) Test Environment & Automated Validation Protocol
No timeout, heartbeat, alive-counter, torque-zero, shutdown, contactor-open timing, or pin-state transition validated in this protocol may become physical gate logic until confirmed by bench proof or physical HIL run-time executions. Until then, all behaviors, scripts, and parameters below are restricted to Simulation-Only Model Assertions.
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
HVIL Loop Continuity: A closed-loop digital output driving a solid-state switch to simulate physical hardware loop breaks.
2. Automated HIL Fault Injection Matrix Template
This matrix defines the automated test execution parameters for the HIL Fault Injection Unit (FIU) to document the containment behaviors established in Gate 05G.
Test ID
Target Domain / Interface
Fault Insertion Method
VCU Observed Response
Downstream Verification Target
Baseline Target Metric
HIL-05G-001
CAN_1 (Ford Chassis Gateway Interface)
FIU forces physical short between CAN-H and CAN-L for 500ms.
Monitor internal register tracking; record any transmit attempt flags.
Verify isolation limits on simulated OEM nodes.
CAN_1 error counters increment; zero frame leakage observed.
HIL-05G-002
CAN_2 (Isolated EV Inverter Sub-Loop)
Stop cyclic inverter heartbeat injection from HIL side.
Record transition timing to updated internal state.
Sim Inverter monitors safety gate disable block via timeout tracking.
CAN_2 VCU Torque Command payload changes matching model configuration.
HIL-05G-003
CAN_3 (Isolated EV Battery Control Loop)
Drop BMS status and safety frame injection sequence.
Record shutdown command transmission profile.
Sim BMS tracks virtual contactor logic outputs.
Emergency shutdown request frame dispatched based on configurable timeout.
HIL-05G-004
Main Power Interface (V_SYS_VCU)
FIU opens inline power supply relay to VCU hardware pins.
Measure driver output behavior after VCU power loss.
Expected safe state depends on output stage design, pull-ups/pull-downs, relay topology, and hardware fail-safe design.
Timing and final expected state require bench proof.
HIL-05G-005
CAN_2 Physical Layer Topology
FIU shorts CAN_2 Tx pin directly to Ground at VCU transceiver input.
Monitor for transceiver dominant timeout (DTO) circuit activation footprint.
Track stabilization duration of remaining simulated loop participants.
Record bus recovery timeframe following node auto-isolation.
HIL-05G-006
CAN_3 Data Stream Protocol
Inject corrupted Rolling Counter and inverted Checksum inside BMS frames.
Record frame rejection rate and subsequent state transition timing.
Track torque adjustment execution profiles.
Compare state transition timestamps against frame corruption index.
3. Cyclic Performance & Failsafe Validation Scripts
These Python-based execution scripts run natively on the HIL automation server to enforce boundary conditions, monitor timing constraints, and execute the listen-only proof rules defined in Gate 05F.
Script A: Automated Listen-Only Verification & Multi-Layer Silent Mode Audit
import time
import hil_system_api as hil
import can_bus_analyzer as can
import scope_interface as scope

def run_gate_05f_silent_audit():
    print("[INIT] Starting Gate 05F Multi-Layer Listen-Only Structural Verification...")
    
    # Step 1: Initialize HIL Environment, read MCU registers, and check mailbox config
    hil.set_power_rail(voltage=13.5)
    reg_dump = hil.read_mcu_registers(controller="CAN_1")
    tx_mailboxes = hil.get_allocated_tx_mailboxes(controller="CAN_1")
    
    # Core architectural register checks
    silent_mode_active = reg_dump.check_bit("LISTEN_ONLY_MODE", expected=1)
    zero_tx_alloc = (tx_mailboxes == 0)
    
    can.start_logging(channel="CAN_1", output_file="gate_05f_audit.blf")
    scope.arm_trigger(channel="CAN_1_DIFF", trigger_type="DOMINANT_EDGE")
    
    # Step 2: Trigger state machine sweeps to stress the model boundary
    hil.set_digital_output("Ford_Ignition_Proxy", "ACC")
    time.sleep(1.0)
    hil.set_analog_output("APPS_Ch1", 4.5) 
    hil.set_analog_output("APPS_Ch2", 2.25)
    
    # Step 3: Gather protocol logs and physical oscilloscope validation data
    time.sleep(5.0)
    can.stop_logging(channel="CAN_1")
    frames = can.parse_log("gate_05f_audit.blf")
    scope_triggered = scope.check_trigger_status()
    
    transmitted_frames = [f for f in frames if f.direction == "TX" or f.is_ack_asserted]
    
    # Analyze and log multi-layer proof criteria
    print("\n--- LISTEN-ONLY DOSSIER LOG ---")
    print(f"[-] Silent-Mode Register Dump Verified: {silent_mode_active}")
    print(f"[-] No TX Mailbox Allocation Confirmed: {zero_tx_alloc}")
    print(f"[-] Protocol Analyzer Captured TX/ACK Frames: {len(transmitted_frames)}")
    print(f"[-] Scope Confirmed No Dominant-Bit Drive from VCU: {not scope_triggered}")
    print("--------------------------------\n")
    
    if len(transmitted_frames) > 0 or scope_triggered or not silent_mode_active or not zero_tx_alloc:
        print("[STATUS] Dynamic signature detected or register verification mismatch.")
        return "MODEL_STRESS_FAILURE"
    
    print("[STATUS] Listen-only structural constraints confirmed in simulated test sequence.")
    return "HIL_OBSERVED_VALID"
Script B: Configurable Inverter Heartbeat Timeout and Dynamic Tracking
def run_gate_05g_timeout_tracking(timeout_threshold_ms=100.0):
    print(f"[INIT] Executing CAN_2 Inverter Dropout Timing Analysis. Configured Threshold: {timeout_threshold_ms}ms")
    
    # Ensure system is simulated in dynamic drive state
    hil.set_power_rail(voltage=13.5)
    hil.set_state("DRIVE_ENABLED")
    hil.start_cyclic_frame_injection(bus="CAN_2", id=0x201, period_ms=10) 
    time.sleep(0.5)
    
    hil.set_analog_output("APPS_Ch1", 2.5) 
    time.sleep(0.2)
    
    # Step 1: Assert fault by stopping the simulated inverter feedback loop
    print("[ACTION] Injecting Inverter Silent Fault Event...")
    hil.stop_cyclic_frame_injection(bus="CAN_2", id=0x201)
    fault_time = hil.get_high_resolution_timestamp()
    
    # Step 2: Monitor CAN_2 Bus for VCU adjustment response
    response_captured = False
    # Monitor for double the configured threshold to catch delayed responses
    monitoring_window = (timeout_threshold_ms * 2.0) / 1000.0 
    
    while (hil.get_high_resolution_timestamp() - fault_time) < monitoring_window:
        latest_frame = can.get_latest_frame(bus="CAN_2", id=0x101) 
        if latest_frame and latest_frame.data[0:2] == [0x00, 0x00]:
            zero_time = hil.get_high_resolution_timestamp()
            latency = (zero_time - fault_time) * 1000.0
            print(f"[STATUS] Torque command modification observed at latency: {latency:.2f} ms.")
            response_captured = True
            break
            
    if not response_captured:
        print("[STATUS] VCU update loop did not capture frame modifications within monitored execution window.")
        return "MODEL_STRESS_FAILURE"
        
    if latency > timeout_threshold_ms:
        print(f"[STATUS] Measured latency ({latency:.2f}ms) exceeded target configuration threshold ({timeout_threshold_ms}ms).")
        return "NEEDS_REVIEW"
        
    return "HIL_OBSERVED_VALID"
4. Mandatory HIL Run Proof Artifact Package
Every automated or manual hardware-in-the-loop test run must compile, archive, and sign a standardized validation record containing the components below before the run can be integrated into the main tracking matrix.
┌────────────────────────────────────────────────────────────────────────────┐
│                  HIL RUN ARTIFACT VERIFICATION DOSSIER                     │
├────────────────────────────────────────────────────────────────────────────┤
│  [ENVIRONMENT METADATA]                                                    │
│  • HIL Run ID: HIL-RUN-20260711-05G022                                     │
│  • Firmware Version: v2.4.1-rc3                                            │
│  • VCU Hardware Revision: Rev C-3 (Isolated Architecture)                 │
│  • Test Script Version: v1.08                                              │
│  │                                                                         │
│  [TOPOLOGY & STIMULUS]                                                     │
│  • Test Bench Wiring Diagram Ref: WD-EE-CONV-004_Rev2                      │
│  • Simulated Node Configuration Profile: CFG-SILENT-FORD-INVERTER-BMS-V1   │
│  • Fault Injected: FIU_CAN_2_HEARTBEAT_DROPOUT                             │
│  │                                                                         │
│  [RAW EXECUTION DATA]                                                      │
│  • Raw CAN Log Reference: /logs/hil/20260711_CAN2_drop.blf                 │
│  • Oscilloscope Capture Binary: /scope/hil/20260711_CAN2_drop.wfm          │
│  • Power Rail Log Signature: CSV-PWR-13_5V-STEP-LOG                        │
│  • State Transition Sequence Log: [INIT] -> [DRIVE] -> [FAULT_LATCHED]      │
│  │                                                                         │
│  [METRICS & EVALUATION]                                                    │
│  • Observed Latency: 42.17 ms                                              │
│  • Expected Response: Torque command parameter zeroed on CAN_2 sub-loop     │
│  • Result Category: HIL_OBSERVED_VALID                                     │
│  • Authority Status: SIMULATION_RESTRICTED_PENDING_BENCH_PROOF             │
│  │                                                                         │
│  [SIGN-OFF]                                                                │
│  • Engineer Reviewer: ___________________________                          │
└────────────────────────────────────────────────────────────────────────────┘
Part 5: Parallel Gate Summary Metrics
 [GATE 05G: FAULT CONTAINMENT] ──► [GATE 05H: HIL TESTING & SCRIPTS] ──► [GATE 05I: PHYSICAL BENCH PROOF]
  Status:                           Status:                             Status:
  FAILSAFE_MATRIX_MAPPED            HIL_TEST_HARNESS_CONFIGURED         PROVISIONAL_STEPS_PENDING
  SIMULATION_ONLY_RESTRICTION       SIMULATION_ONLY_RESTRICTION         SIMULATION_ONLY_RESTRICTION
IF HIL_RUN_EVALUATION == "05H_VALIDATION":
    IF artifact_package_complete == "FALSE" OR result_category == "NEEDS_REVIEW":
        BENCH_INTEGRATION_APPROVAL = "BLOCKED"
        SYSTEM_EXECUTION_MODE = "SIMULATION_RE-RUN_REQUIRED"
