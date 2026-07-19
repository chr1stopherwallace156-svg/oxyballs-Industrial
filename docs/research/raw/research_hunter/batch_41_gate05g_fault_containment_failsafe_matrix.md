Part 1: Signal Authority Realignment (Verification & Specific Language Adjustments)
1. Pre-Charge Subsystem Refinements
Signal: VCU_Precharge_Request
Source controller: Conversion VCU
Destination controller: BMS / PDU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Transmit request only
Signal Owner: VCU owns request generation.
Action Owner: BMS / PDU / hardwired safety owns pre-charge execution.
VCU Authority: Requester only.
Allowed use: Dispatching low-voltage software readiness requests to the standalone battery controller during initialization cycles.
Blocked use: Forcing or overriding battery internal safety steps, closing high-voltage circuits directly.
Physical authority: BLOCKED until wiring diagram, interface control document, and controls engineer review confirm request authority.
Verification status: UNVERIFIED_STAGE
Proof artifact: Simulation state validation code trace capture.
2. Emergency Shutdown Subsystem Refinements
Signal: VCU_Shutdown_Request_To_BMS
Source controller: Conversion VCU
Destination controller: BMS / PDU
Bus: CAN_3 (Isolated EV Battery Control Loop)
Direction: Transmit request only
Signal Owner: VCU owns request generation.
Action Owner: BMS / PDU / hardwired safety owns shutdown execution.
VCU Authority: Requester only.
Allowed use: Dispatching high-level soft isolation tracking system check messages.
Blocked use: Direct control over battery contactor internal drive coils.
Physical authority: BLOCKED until wiring diagram, interface control document, and controls engineer review confirm request authority.
Verification status: UNVERIFIED_STAGE
Proof artifact: Safe-state diagnostic frame log validation script.
3. Network Physical Safety Realignment
CAN_1 (Ford Factory / Body Builder Gateway Node): Logically and Structurally Listen-Only. The CAN_1 hardware must be selected, wired, or configured for listen-only/silent monitoring with no transmit capability enabled. This constraint allows implementing silent-mode controller registers, utilizing receive-only transceiver chipsets, removing physical TX copper paths, or locking the hardware gating array.
Part 2: Gate 05G — Fault Containment and Gateway Failsafe Matrix
No timeout, heartbeat, alive-counter, torque-zero, shutdown, or contactor-open timing may become physical gate logic until confirmed by documentation or HIL/bench proof. Until then, all behaviors below are restricted to Simulation-Only Model Assertions.
                           ┌───────────────────────────┐
                           │    GATEWAY FAULT DESCRIPTOR   │
                           └─────────────┬─────────────┘
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   ▼                                           ▼
      [CRITICAL HARDWARE FAULT]                   [PROTOCOL / DATA ANOMALY]
   ┌──────────────────────────────┐            ┌──────────────────────────────┐
   │ • VCU Crash / Power Loss     │            │ • Bad Checksum / Counter     │
   │ • Bus Stuck Dominant/Recess  │            │ • Message Replay / Adr Wrong │
   │ • CAN_1 Transmit Attempt     │            │ • BMS/Inverter Command Fault │
   └───────────────┬──────────────┘            └───────────────┬──────────────┘
                   │                                           │
                   ▼                                           ▼
      [HARDWARE / ISOLATION FAILSAFE]             [SOFTWARE CONVERSION LATCH]
   ┌──────────────────────────────┐            ┌──────────────────────────────┐
   │ • Transceiver High-Impedance │            │ • Torque Command Zeroed      │
   │ • Inverter Auto-Zero (50ms)  │            │ • System State: FAULT_LATCHED│
   │ • BMS Contactor Drop-Out     │            │ • Flag Downstream Shutdown   │
   └──────────────────────────────┘            └──────────────────────────────┘
Fault Condition
Immediate Hardware/Logical Reaction
Downstream System Safe-State Action
Required Failsafe Lockout Level
Verification Status / Proof Constraint
VCU Crash / Lockup
Watchdog timer expires; transceivers transition to high-impedance state.
Inverter drops to zero torque (<= 50ms); BMS opens contactors via heartbeat loss.
System Lockout: Permanent Latch until low-voltage cycling occurs.
SIMULATION_ONLY / Requires HIL interrupt test proof.
CAN_1 Accidentally Attempts Transmit
Hardware silent-mode/wiring restriction sinks TX line; error register blocks bus driving.
Zero impact on OEM network; no ACK or dominant bits injected.
System Lockout: Instant VCU internal shutdown request.
SIMULATION_ONLY / Requires protocol analyzer silent verification log.
CAN_2 Inverter Loop Silent
VCU flags timeout (>= 100ms); zero torque value written internally.
Inverter shuts down IGBT gates autonomously due to loss of control frame.
System State: FAULT_LATCHED. Manual service clear mandatory.
SIMULATION_ONLY / Requires HIL bus disconnect log verification.
CAN_3 BMS Loop Silent
VCU drops internal drive requests and commands torque zero to inverter.
BMS handles independent open execution; VCU enters safe-state routine.
System State: FAULT_LATCHED. Manual service clear mandatory.
SIMULATION_ONLY / Requires BMS heartbeat dropout test validation.
Gateway Power Loss
All VCU relays drop open; transceiver lines collapse to unbiased state.
Inverter enters safe coast mode; BMS opens main pack contactors due to interlock/power collapse.
System Lockout: Total hardware dormancy until power restoration.
SIMULATION_ONLY / Requires power rail interrupt bench log.
Gateway Stuck Dominant (Tx Grounded)
VCU hardware/transceiver internal dominant timeout (DTO) circuit activates (<= 2ms).
Isolates faulty VCU node from permanently stalling the physical network bus.
System Lockout: Permanent Latch. Replacement or hardware inspection required.
SIMULATION_ONLY / Requires electrical bench scope trace mapping DTO cutoff.
Gateway Stuck Recessive (Tx Open)
Bus behaves as an open circuit; node acts as completely disconnected.
Inverter and BMS identify cyclic message loss and execute individual safe shutdowns.
System State: FAULT_LATCHED. Normal initialization loops blocked.
SIMULATION_ONLY / Requires open-circuit simulation validation logs.
Bad Checksum / Alive Counter
Gateway discards the individual corrupted frame instantly; uses last valid safe data.
If consecutive mismatches persist (>= 3 cycles), torque is zeroed.
System State: FAULT_LATCHED if threshold breached.
SIMULATION_ONLY / Requires bad-packet injection test trace log.
Message Replay Interception
VCU security/freshness counters match historical logs; duplicates are rejected.
Engine ignores outdated driver intent commands; shifts toward zero torque.
System Lockout: Temporary frame rejection moving to FAULT_LATCHED.
SIMULATION_ONLY / Requires packet replay injection validation trace.
Wrong Source Address Injection
Internal filter registers reject the unexpected node frame identifier.
No processing of unauthorized node variables occurs; VCU registers error code.
System State: FAULT_LATCHED upon unexpected ID reception.
SIMULATION_ONLY / Requires identification filtering test report.
BMS Says No-Discharge
VCU intercepts flag and clamps inverter torque requests to exactly zero.
Prevents pack over-discharge or cellular collapse under load conditions.
System Lockout: VCU enters FAULT_LATCHED state immediately.
SIMULATION_ONLY / Requires BMS flag response test validation log.
Inverter Ignores Torque-Zero
VCU monitors active current return; detects torque application error.
VCU sends redundant backup shutdown request over CAN_3 to the BMS layer.
System Lockout: Redundant emergency de-energization path request.
SIMULATION_ONLY / Requires current feedback mismatch response trace.
E-Stop Asserted
Hardwired loop breaks low-voltage supply to contactor coils instantly.
Contacts mechanical drop-out; high-voltage link isolation happens instantly.
System Lockout: Hardwired mechanical isolation override (No software clear).
SIMULATION_ONLY / Requires mechanical loop continuity validation report.
Part 3: Parallel Gate Summary Metrics
 [GATE 05E: ICD REGISTRY] ──► [GATE 05F: BOUNDARY SAFETY] ──► [GATE 05G: FAULT & FAILSAFE CONTAINMENT]
  Status:                     Status:                         Status:
  SIGNAL_BOUNDARIES_MAPPED    ISOLATION_RULES_ESTABLISHED     FAILSAFE_MATRIX_MAPPED
  SIMULATION_ONLY_RESTRICTION SIMULATION_ONLY_RESTRICTION     SIMULATION_ONLY_RESTRICTION
IF FAILSAFE_EVALUATION == "05G_MATRIX":
    IF failsafe_timing_confirmed == "FALSE" OR hil_bench_proof == "MISSING":
        PHYSICAL_HARDWARE_INTEGRATION = "BLOCKED"
        SYSTEM_EXECUTION_MODE = "SIMULATION_FAULTS_ONLY"
