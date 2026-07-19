Gate 05I-A — Low-Voltage Driver Safety Logic Verification
This gate defines the automated and manual verification protocol for core driver-safety functions. All operations are confined exclusively to a production-like low-voltage bench integration environment.
To prevent physical hazards, structural damage, or invalid safety claims, this verification is governed by three absolute constraints:
CRITICAL_RESTRICTION: Zero vehicle motion. Wheels-on-ground operation, chassis dynamometer testing, and real Ford factory bus transmission (CAN_1) are completely forbidden.
CRITICAL_RESTRICTION: Zero live high-voltage testing. All supplier controllers (Inverter and BMS logic boards) must run on low-voltage auxiliary power (12V nominal). High-voltage rails must remain completely unpowered.
CRITICAL_RESTRICTION: Zero road-test approval. This protocol validates low-voltage software and hardware logic paths only; it does not approve physical vehicle driving or driver operation.
1. Hardwired Fault & Signal Boundary Rules
CAN_1 Fault Injection Constraint: CAN_1 fault injection is permitted only on a protected bench harness or simulated OEM network. Direct short-circuiting of the production chassis interface pins is strictly prohibited.
Hardwired Interlock Interruption: The emergency stop mechanism removes the low-voltage control path through the approved hardwired safety loop. Coil voltage decay, relay drop-out time, and output behavior must be measured and compared against the verified schematic and component datasheets to account for physical induction and mechanical lag.
2. Low-Voltage Driver Safety Verification Matrix
This matrix establishes the bench-only tests required to prove control logic, hardware state transitions, and absolute output containment prior to vehicle integration.
Test ID | Driver-Safety Function | Bench Setup | Fault / Input Injected | Expected VCU Behavior | Expected Hardwired Behavior | Blocked Outputs | Measurement Method | Proof Artifact | Result Category | Authority Status | Build Engine Status
05I-A-001 | Accelerator Pedal Plausibility | Production-like harness, VCU DUT, dual APPS voltage source. | Apply >10% tracking skew between APPS Channel 1 and Channel 2 lines. | Flag APPS correlation fault; drop internal torque request target to zero. | None; logic containment level. | CAN_2 Inverter Torque Command payload bytes set to 0x0000. | Differential analog scope monitoring + CAN log tracking. | Dual-channel analog voltage trace matched against CAN_2 logs. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-002 | Brake Override Logic (Brake-Throttle Plausibility) | VCU DUT connected to APPS simulator and physical Ford brake switch circuit path. | Press brake switch input while maintaining >25% accelerator pedal request. | Prioritize braking; command immediate zero-torque state via internal software override. | None; logic containment level. | CAN_2 Inverter Torque Command payload bytes set to 0x0000. | Time-correlated CAN log capture of brake status vs torque output. | CAN frame timestamp analysis tracking brake transition to zero-torque latency. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-003 | Shift-State Inhibit | VCU DUT, supplier inverter logic board, physical or simulated gear selector. | Request transitions to Drive (D) or Reverse (R) while APPS input is >5%. | Reject shift request; force internal state machine to remain in Neutral (N). | None; logic containment level. | Inverter state control flags and active drive commands blocked. | Monitor VCU state variables via calibration tool interface over CAN_2. | Internal state machine transition register dump file. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-004 | Charger-Plug Drive Lockout | VCU DUT integrated with physical charge port proximity detection loop. | Inject ground engagement signal on proximity line while VCU is in Drive state. | Trigger immediate shift to Neutral/Safe state; inhibit all torque request processing. | None; logic containment level. | Drive state transition bytes and torque target fields. | Scope capture of proximity pin transition vs CAN_2 state flags. | Proximity circuit voltage capture matched to CAN_2 state frame logs. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-005 | E-Stop Hardwired Interrupt | Complete low-voltage harness, VCU DUT, real contactor simulators with coil loads. | Actuate physical cabin emergency mushroom button inline with the low-voltage control harness. | Detect loss of safety loop feedback voltage; log critical safety loop fault state. | E-stop removes the low-voltage control path through the approved hardwired safety loop. | 12V nominal power supply to all main contactor coils. | Dual-channel scope measuring coil voltage decay and relay drop-out time. | Oscilloscope capture of voltage decay curve vs datasheet specs. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-006 | HVIL Open Detection | VCU DUT, real or supplier-representative PDU/BMS logic board loop. | Break physical HVIL loop continuity at the bench test connector interface. | Transition internal state to Fault; command open sequence to control lines. | BMS logic board isolates internal low-voltage driving lines. | Contactor pilot relay drive signals and active inverter enable lines. | High-speed logic analyzer logging pin state transition sequence. | Logic analyzer capture verifying order of VCU/BMS output dropouts. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-007 | BMS No-Discharge Response | VCU DUT connected via CAN_3 to real supplier BMS logic board. | Inject BMS fault condition status frame indicating over-temperature or cell undervoltage. | Terminate operational drive state; command rapid ramp-down of all torque commands. | BMS logic board flags emergency open request internally. | Inverter active power control bits and torque command registers. | Real-time CAN bus monitoring logging CAN_3 input vs CAN_2 output latency. | Time-stamped network log showing delta from BMS fault to zero torque. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-008 | Inverter Fault Response | VCU DUT connected via CAN_2 to real supplier inverter controller board. | Inject hardware fault alert or over-current warning flag into inverter feedback stream. | Inhibit active vehicle operation; transition state machine to isolated fault hold. | None; logic containment level. | Torque requests and gate drive enablement instructions. | CAN bus logging tracking VCU frame modifications following fault receipt. | Network trace log capturing error flag processing execution window. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-009 | Low-Voltage Brownout | Production-like harness, VCU DUT, programmable linear DC power supply. | Slew system power supply down from 13.5V to 8.5V at a rate >= 20V/ms. | Gracefully save diagnostic logs; transition internal drivers to defined default states. | Hardware internal under-voltage lockout (UVLO) forces chip reset state. | All high-side/low-side digital switch outputs driven by VCU. | High-speed power rail voltage tracking vs digital output state scopes. | Multimeter data log and scope capture of UVLO trip point timeline. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-010 | Fault Latch Persistence | VCU DUT connected to local UDS diagnostic communication interface. | Simulate brief (50ms) critical APPS tracking fault, then return inputs to normal. | Keep torque output locked at zero; maintain fault active state despite input recovery. | None; logic containment level. | Torque requests and operational drive state flags remain blocked. | Direct continuous monitoring of CAN_2 torque byte states post-fault. | Log file showing input recovery with zero corresponding output recovery. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-011 | Service Clear Routine | VCU DUT connected to unified diagnostic services (UDS) testing tool. | Issue standard UDS Clear Diagnostic Information (0x14) routine command string. | Clear latched software faults only if vehicle state is verified as safe/neutral. | None; logic containment level. | Involves clearing blocks; torque output remains inhibited until cycle resets. | UDS session sequence verification logging via diagnostic tools. | Diagnostic tester command/response log confirming code clearance. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-012 | Isolated EV Display Warning Behavior | VCU DUT connected to target isolated EV display assembly module. | Inject active system fault codes into the VCU internal diagnostic tracker. | Transmit dedicated error codes and visual warning text arrays to display node. | None; logic containment level. | Normal operational display telemetry data streams. | Protocol analyzer log tracking status payload sent to display module. | Captured display bus log confirming transmission of correct fault screens. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
05I-A-013 | CAN_1 Listen-Only During Driver-Input Tests | VCU DUT, protected bench harness, active APPS/Brake driver input stimuli. | Apply full dynamic range changes across APPS, brake, shift, and charging signals. | Process all inputs internally; maintain strict passive silent listening mode on CAN_1. | None; physical transceiver/mailbox configuration level. | All transmit frames, retry loops, and ACK slot driving onto CAN_1. | Continuous oscilloscope probe tracking on the physical VCU CAN_1 TXD line pin. | Scope log showing VCU TXD pin remains idle/inactive across all input cycles. | BENCH_EVIDENCE_PENDING | BENCH_ONLY_RESTRICTED | UNVERIFIED_LOGIC_ASSERTS
3. Automated Logic Verification Script
This script executes on the low-voltage bench automation controller to validate the safety constraints of the Brake Override Logic (Test ID: 05I-A-002).
import time
import bench_system_api as bench
import can_bus_analyzer as can
import instrument_manager as im

def run_gate_05ia_brake_override_verification():
    print("[INIT] Starting Gate 05I-A Brake Override Logic Verification...")
    print("[SAFE] Enforcing Low-Voltage Bench Isolation Profile...")
    
    # Step 1: Initialize instrument logging and establish baseline drive state
    bench.verify_hv_lockout_active()
    bench.set_power_rail(voltage=13.5)
    
    # Establish dynamic driver state with active accelerator tip-in
    bench.set_analog_output("APPS_Ch1", 2.5) # Replicates >25% accelerator demand
    bench.set_analog_output("APPS_Ch2", 1.25)
    bench.set_digital_output("Brake_Switch_Physical_Line", 0) # Brake released
    time.sleep(0.5)
    
    # Confirm torque is active prior to fault insertion
    can.start_logging(channel="CAN_2", output_file="gate_05ia_brake_override.blf")
    baseline_frame = can.get_latest_frame(bus="CAN_2", id=0x101)
    if not baseline_frame or baseline_frame.data[0:2] == [0x00, 0x00]:
        print("[ERROR] Base torque request not detected. Bench setup mismatch.")
        return "BENCH_SETUP_ERROR"
        
    # Step 2: Inject physical brake pedal engagement signal
    print("[ACTION] Actuating physical low-voltage brake switch line signal...")
    brake_actuation_time = bench.get_high_resolution_timestamp()
    bench.set_digital_output("Brake_Switch_Physical_Line", 1) # Brake pressed
    
    # Step 3: Measure torque output modification latency on isolated CAN_2
    override_captured = False
    monitoring_window_ms = 50.0 # Target safety logic processing time window
    
    while (bench.get_high_resolution_timestamp() - brake_actuation_time) < (monitoring_window_ms / 1000.0):
        latest_frame = can.get_latest_frame(bus="CAN_2", id=0x101)
        if latest_frame and latest_frame.data[0:2] == [0x00, 0x00]:
            zero_torque_time = bench.get_high_resolution_timestamp()
            measured_latency = (zero_torque_time - brake_actuation_time) * 1000.0
            print(f"[STATUS] Torque command override observed at latency: {measured_latency:.2f} ms.")
            override_captured = True
            break
            
    # Reset signal lines to safe resting state
    bench.set_digital_output("Brake_Switch_Physical_Line", 0)
    bench.set_analog_output("APPS_Ch1", 0.0)
    bench.set_analog_output("APPS_Ch2", 0.0)
    can.stop_logging(channel="CAN_2")
    
    if not override_captured:
        print("[STATUS] Torque command output was not zeroed within the safety monitoring window.")
        return "MODEL_STRESS_FAILURE"
        
    return "HIL_OBSERVED_VALID"
4. Mandatory Bench Run Calibration & Traceability Package
Every execution pass under Gate 05I-A must log and bind these specific instrument calibration and component tracking records to the output dossier to establish valid evidence.
┌────────────────────────────────────────────────────────────────────────────┐
│             GATE 05I-A INSTRUMENT TRACEABILITY & CALIBRATION RECORD        │
├────────────────────────────────────────────────────────────────────────────┤
│  [INSTRUMENT VALIDATION STATUS]                                            │
│  • Oscilloscope Model: MSO44-B-983142      | Cal Date: 2025-11-14          │
│  • CAN Interface Node: VN1630-A-443210     | Firmware Version: v12.6.4     │
│  • DC Programmable Supply S/N: PWR-PL-44302| Cal Date: 2026-02-20          │
│  • Fault Injection Chassis Rev: FIU-CHASSIS-PRO-REV2                       │
│  │                                                                         │
│  [COMPONENT UNDER TEST SPECIFICS]                                          │
│  • DUT VCU Serial Identifier: VCU-REV-C3-PROTO-084                         │
│  • Supplier Inverter Logic Board S/N: INV-MCU-3.2-LOGIC-042                │
│  • Supplier BMS Control Board S/N: BMS-SUPPLIER-L2B-V4-991A                │
│  │                                                                         │
│  [TEST SPECIFIC COMPONENT DATASHEETS MANIFEST]                            │
│  • Safety Loop Pilot Relay Datasheet Ref: RELAY-DS-OMRON-G6B-v1.2          │
│  • Expected Coil Disintegration Delay: 15.0 ms max                         │
│  • Expected Mechanical Relay Drop-out Duration: 10.0 ms max                │
└────────────────────────────────────────────────────────────────────────────┘
Part 5: Parallel Gate Summary Metrics
 [GATE 05H: HIL VALIDATION] ──► [GATE 05I-A: LV SAFETY LOGIC VERIFICATION] ──► [GATE 05I-B: MECHANICAL INTERLOCKS]
  Status:                        Status:                                      Status:
  HIL_EVIDENCE_RECORDED          BENCH_TESTING_ACTIVE                         PROVISIONAL_STEPS_PENDING
  HARDWARE_EVALUATION_ACTIVE     LOW_VOLTAGE_BENCH_ONLY                       INTEGRATION_RESTRICTION
IF BENCH_LOGIC_EVALUATION == "05I-A_VALIDATION":
    IF vehicle_motion_detected == "TRUE" OR can_1_leakage_detected == "TRUE":
        VEHICLE_COMMISSIONING_APPROVAL = "PERMANENTLY_BLOCKED"
        SYSTEM_EXECUTION_MODE = "SAFETY_CONFLATION_HALT"
