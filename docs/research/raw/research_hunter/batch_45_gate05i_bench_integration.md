Gate 05I — Physical Bench Integration & Low-Voltage Loop Verification
This gate establishes the final boundary before vehicle-level physical commissioning. All activities within Gate 05I are strictly restricted to a production-like low-voltage bench integration environment.
To prevent physical hazard and hardware degradation, the integration boundary is governed by the following strict execution constraints:
RESTRICTED: High-Voltage (HV) traction battery connection is completely forbidden at this stage. All inverter and battery controller logic must be powered via low-voltage auxiliary sources (12V nominal).
RESTRICTED: Vehicle road testing, closed-course mobility tracks, or wheels-on-ground operations are completely forbidden.
RESTRICTED: Direct injection of frames or physical transmission onto the live Ford factory vehicle bus (CAN_1) is completely forbidden.
1. Production-Like Low-Voltage Integration Environment
The test domain moves away from simulated HIL generic load cards and transitions to the physical control components that will be installed in the vehicle chassis.
       ┌──────────────────────────────────────────────────────────────┐
       │     PRODUCTION-LIKE LOW-VOLTAGE BENCH INTEGRATION HARNESS    │
       └──────┬──────────────────────┬──────────────────────────┬─────┘
              │                      │                          │
     [Real Harness & PDU]     [Real VCU hardware]       [Supplier Controllers]
     • Production Connectors  • Rev C-3 Base Node       • BMS/PDU Logic Board
     • Real E-Stop Interlock  • Multi-Bus Interface     • Inverter Control Unit
              │                      │                          │
              └──────────────────────┼──────────────────────────┘
                                     ▼
                ============================================
                 LOW-VOLTAGE OPERATION ONLY (HV ISOLATED)
                ============================================
Low-Voltage Integration Control Profiles
Physical Wiring Harness Topology: Execution requires the final production-spec wiring harness, utilizing identical wire gauges, shield grounding structures, pin crimps, and terminal connector housings specified in the vehicle master wiring diagram.
Supplier Logic Node Integration: The Conversion VCU (DUT) must communicate with a real or supplier-representative BMS/PDU controller and a real physical inverter controller board. Both supplier nodes must run on low-voltage logic power only; high-voltage rails are left entirely unpowered and mechanically isolated.
Hardwired Safety Interlock Loop: A physical emergency stop circuit, panel switches, and dual-channel safety relays are wired inline to verify structural low-voltage dropouts before harness integration.
2. Low-Voltage Bench Fault Injection & Driver Safety Matrix
This matrix details the physical bench operations conducted to verify actual circuit behavior, cross-talk characteristics, and structural safety logic without high-voltage risks.
Test ID
Target Interface / Domain
Fault Insertion Method
VCU Hardware Observed Response
Downstream Integration Target
Physical Integration Metric
BENCH-05I-001
CAN_1 Physical Transceiver Layer
FIU injects a controlled stuck-dominant / stuck-TXD fault through a protected fault-injection path approved for the transceiver circuit.
Monitor local node transceiver error tracking state; record register lock duration.
Verify local isolation behavior without creating bus-wide degradation.
Node enters passive error/bus-off state; zero physical damage or trace breakdown.
BENCH-05I-002
Physical Driver Output Stages
Systematically toggle power rail states while monitoring VCU high-side/low-side pins.
Measure driver output behavior after VCU power loss.
Expected safe state depends on output stage design, pull-ups/pull-downs, relay topology, and hardware fail-safe design.
Timing and final expected state match the verified hardware schematics.
BENCH-05I-003
Hardwired E-Stop Interlock Loop
Actuate physical cabin emergency mushroom button inline with the low-voltage control harness.
Instant physical path break cuts control voltage to simulated contactor coil circuits.
Total immediate mechanical drop-out of power distribution logic.
Coil voltage drops to 0V within circuit propagation time, bypassing software layers.
BENCH-05I-004
CAN_2 & CAN_3 Cross-Talk Boundary
Inject maximum allowable frame density across both isolated loops concurrently.
Monitor for frame dropouts, buffer overflows, or cross-bus latency inflation.
Ensure complete isolation between battery control and inverter control planes.
Zero message bleeding or frame collisions across physical bus boundaries.
3. Automated Validation & Calibration Proof Scripts
These bench verification routines process actual physical inputs, evaluate real register structures from the linked controller network, and validate environmental compliance metrics.
Script A: Physical Transceiver Protection & Diagnostic Status Check
import time
import bench_system_api as bench
import can_bus_analyzer as can
import instrument_manager as im

def run_gate_05i_transceiver_protection_audit():
    print("[INIT] Starting Gate 05I Physical Transceiver Protection Audit...")
    print("[ENV] Enforcing Low-Voltage Production-Like Bench Constraints...")
    
    # Step 1: Query instrument status and read initial baseline node parameters
    bench.verify_hv_lockout_active() # Enforce safety interlock validation check
    reg_before = bench.read_hardware_registers(node="VCU", block="CAN_1_CTRL")
    
    # Step 2: Inject controlled stuck-TXD fault via approved protected test path
    print("[ACTION] Stimulating approved protected stuck-dominant injection network...")
    bench.set_protected_fiu_state(fault_line="CAN_1_TXD_STUCK_DOMINANT", state=True)
    time.sleep(0.1) # Controlled dwell time to trigger internal transceiver timeout
    
    # Step 3: Extract physical bus diagnostics and register flags
    reg_after = bench.read_hardware_registers(node="VCU", block="CAN_1_CTRL")
    bench.set_protected_fiu_state(fault_line="CAN_1_TXD_STUCK_DOMINANT", state=False)
    
    dto_triggered = reg_after.check_bit("TXD_DOMINANT_TIMEOUT", expected=1)
    bus_off_status = reg_after.check_bit("BUS_OFF", expected=1)
    
    print("\n--- PHYSICAL TRANSCEIVER PROTECTION DOSSIER ---")
    print(f"[-] Pre-Fault Communication State Normal: {reg_before.is_status_ok()}")
    print(f"[-] Transceiver Internal DTO Flag Raised:  {dto_triggered}")
    print(f"[-] VCU Controller Local Bus-Off Enforced: {bus_off_status}")
    print("------------------------------------------------\n")
    
    if not dto_triggered or not bus_off_status:
        print("[STATUS] Transceiver failed to isolate node safely within the physical network boundary.")
        return "MODEL_STRESS_FAILURE"
        
    print("[STATUS] Controlled fault containment confirmed on physical transceiver test path.")
    return "HIL_OBSERVED_VALID"
4. Mandatory Bench Integration Run Proof Artifact Package
Every physical integration test execution loop must compile, archive, and sign a standardized validation folder containing the physical environment tracking parameters, software states, and instrument traceability records.
┌────────────────────────────────────────────────────────────────────────────┐
│                BENCH INTEGRATION ARTIFACT VERIFICATION DOSSIER             │
├────────────────────────────────────────────────────────────────────────────┤
│  [ENVIRONMENT METADATA]                                                    │
│  • Bench Run ID: BENCH-RUN-20260711-05I004                                 │
│  • Firmware Version: v2.4.1-rc3                                            │
│  • VCU Hardware Revision: Rev C-3 (Isolated Architecture)                 │
│  • Test Script Version: v2.01                                              │
│  │                                                                         │
│  [INTEGRATION TOPOLOGY & HARDWARE SUBSTRATES]                              │
│  • Harness Assembly Part Number: HARN-EV-CONV-MAIN-001_RevA                │
│  • Supplier BMS Logic Hardware Rev: BMS-SUPPLIER-L2B-V4                    │
│  • Supplier Inverter Logic Board Rev: INV-MCU-V3.2                         │
│  • High-Voltage Isolation Status: VERIFIED_DISCONNECTED                    │
│  • Fault Injected: FIU_PROTECTED_CAN1_TXD_STUCK_DOMINANT                   │
│  │                                                                         │
│  [INSTRUMENT CALIBRATION RECORDS]                                          │
│  • Oscilloscope S/N: MSO44-B-983142      | Cal Date: 2025-11-14            │
│  • CAN Analyzer S/N: VN1630-A-443210     | Firmware: v12.6.4               │
│  • Programmable Supply S/N: PWR-PL-44302 | Cal Date: 2026-02-20            │
│  • FIU Hardware Revision: FIU-CHASSIS-PRO-REV2                             │
│  │                                                                         │
│  [RAW MEASUREMENT & HARDWARE DATA]                                         │
│  • Raw CAN Log Reference: /logs/bench/20260711_CAN1_stuck_dom.blf          │
│  • Oscilloscope Capture Binary: /scope/bench/20260711_CAN1_txd_fault.wfm   │
│  • Driver Pin Multi-Meter Data Ref: CSV-DRV-PIN-POWERLOSS-LOG              │
│  │                                                                         │
│  [METRICS & EVALUATION]                                                    │
│  • Target Parameter Window: VCU Pin Safety States per Schematic Match      │
│  • Measured Latency / Behavior: Outputs stabilized to defined pull states  │
│  • Result Category: HIL_OBSERVED_VALID                                     │
│  │                                                                         │
│  [SIGN-OFF]                                                                │
│  • Engineer Reviewer: ___________________________                          │
└────────────────────────────────────────────────────────────────────────────┘
Part 5: Parallel Gate Summary Metrics
 [GATE 05H: HIL VALIDATION] ──► [GATE 05I: PHYSICAL BENCH INTEGRATION] ──► [GATE 05J: LIVE VEHICLE COMMISSIONING]
  Status:                        Status:                                   Status:
  HIL_EVIDENCE_RECORDED          LOW_VOLTAGE_HARNESS_VERIFIED              PROVISIONAL_STEPS_PENDING
  HARDWARE_EVALUATION_ACTIVE     RESTRICTED_TO_LV_BENCH                    HIGH_VOLTAGE_RESTRICTION
IF BENCH_RUN_EVALUATION == "05I_INTEGRATION":
    IF hv_lockout_breached == "TRUE" OR result_category == "NEEDS_REVIEW":
        VEHICLE_INTEGRATION_APPROVAL = "BLOCKED"
        SYSTEM_EXECUTION_MODE = "BENCH_RE-RUN_REQUIRED"
