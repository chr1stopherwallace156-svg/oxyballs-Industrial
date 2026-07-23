[Owner framing before the payload — the review_37 recap carried into the
Gate 05G prompt: the next gate is Gate 05G — Fault Containment and Gateway
Failsafe Matrix, covering VCU crash, CAN_1 accidental transmit, CAN_2/CAN_3
silent, gateway power loss, gateway stuck dominant/recessive, bad checksum /
alive counter, message replay, wrong source address, BMS says no-discharge,
inverter ignores torque-zero, E-stop asserted; plus the Gate 05F corrections
restated — use supplier/engineering language ("Physical authority: BLOCKED
until wiring diagram, interface control document, and controls engineer
review confirm request authority"); the VCU_Precharge_Request /
VCU_Shutdown_Request_To_BMS signal-owner ≠ action-owner split (Signal Owner =
VCU owns request generation, Action Owner = BMS/PDU/hardwired safety owns
execution, VCU Authority = requester only); the CAN_1 "modified" → "selected,
wired, or configured for listen-only/silent monitoring with no transmit
capability enabled" language; and the rule "no timeout, heartbeat,
alive-counter, torque-zero, shutdown, or contactor-open timing may become
physical gate logic until confirmed by documentation or HIL/bench proof" —
"41:75".]

[Owner verdict delivered AFTER the batch-41 payload:]

My responds

My verdict: Gate 05G is strong, but the timeout/instant-action wording still needs to be downgraded. The architecture is right. The failsafe categories are right. The issue is that a few rows still sound like they already know the inverter/BMS timing behavior.
Gate 05G:
FAILSAFE_MATRIX_MAPPED ✅
SIMULATION_ONLY_RESTRICTION ✅
NETWORK CONTAINMENT LOGIC GOOD ✅
TIMEOUT VALUES STILL NEED DOWNGRADE ⚠️
What is strong
The realignment is much cleaner now:
Signal Owner: VCU owns request generation.
Action Owner: BMS / PDU / hardwired safety owns execution.
VCU Authority: Requester only.
That is exactly the correct ownership separation.
The CAN architecture is also correct:
CAN_1 = Ford side / listen-only / no transmit
CAN_2 = isolated inverter loop
CAN_3 = isolated battery/BMS/PDU loop
And this rule should stay permanently:
If failsafe timing is not confirmed or HIL/bench proof is missing:
    PHYSICAL_HARDWARE_INTEGRATION = BLOCKED
    SYSTEM_EXECUTION_MODE = SIMULATION_FAULTS_ONLY
Main corrections
1. Remove authority from 50 ms / 100 ms / 2 ms
These lines need downgrade:
Inverter drops to zero torque ≤ 50ms
VCU flags timeout ≥ 100ms
DTO activates ≤ 2ms
Keep them only as simulation sweep inputs.
Better:
t_inverter_torque_zero = SupplierDataPending / SimulationSweepOnly
t_can2_timeout = SupplierDataPending / SimulationSweepOnly
t_can3_timeout = SupplierDataPending / SimulationSweepOnly
t_dominant_timeout = TransceiverSupplierDataPending / SimulationSweepOnly
So the row should say:
Inverter transitions to supplier-defined safe behavior after loss of VCU cyclic frame.
Timeout value pending inverter documentation and HIL proof.
Not:
Inverter drops to zero torque within 50ms.
2. Avoid “instantly” for mechanical contactor actions
This row is too strong:
E-Stop Asserted:
Hardwired loop breaks low-voltage supply to contactor coils instantly.
Contacts mechanical drop-out; high-voltage link isolation happens instantly.
Better:
Hardwired loop removes or interrupts the contactor control path through the approved safety circuit.
Actual contactor opening time is supplier-defined and must be verified by bench/HIL oscilloscope trace.
Because even mechanical contactors have coil decay, spring travel, arc suppression, and contact separation timing. “Instant” is not a safe engineering word here.
3. CAN_1 transmit attempt row is strong, but clarify the failure type
If CAN_1 is truly listen-only with no TX path, a software transmit attempt should never reach the Ford bus.
Use:
CAN_1 transmit attempt:
Software attempt is rejected by firmware policy and physically unable to drive the bus due to listen-only/silent hardware configuration.
Proof should include:
silent mode register
no transmit mailbox
no ACK participation
no dominant bit injection
protocol analyzer capture
That row is good.
4. “Use last valid safe data” needs caution
This line is risky:
Bad Checksum / Alive Counter:
uses last valid safe data.
For torque or driver-demand signals, do not keep using stale values for long.
Better:
Reject corrupted frame.
Use last known value only if it is explicitly a safe fallback value and only within supplier-defined timeout.
Otherwise transition toward torque zero / FAULT_LATCHED.
So the principle is:
Bad data cannot preserve torque authority unless timeout and fallback behavior are verified.
5. Wrong source address should not always hard-latch immediately
This row:
FAULT_LATCHED upon unexpected ID reception
might be too aggressive. On a real bus, unexpected frames can appear during diagnostics, service tools, or unrelated devices.
Better:
Reject unexpected source address.
Log event.
Escalate to FAULT_LATCHED only if repeated, safety-critical, or matching a forbidden control-path pattern.
Threshold pending controls/security review.
6. BMS says No-Discharge is a good row
This one is strong:
BMS Says No-Discharge → VCU clamps inverter torque request to zero.
That is the correct direction. Just label the timing and exact behavior:
SupplierDataPending / HILProofRequired
7. Inverter ignores torque-zero is one of the most important rows
This is very good:
If inverter ignores torque-zero, VCU requests shutdown through BMS/PDU path.
Keep it. This is a critical containment rule.
I would phrase it as:
If measured current/torque feedback conflicts with commanded torque-zero, VCU escalates to shutdown request and FAULT_LATCHED.
Corrected Gate 05G status
Use this:
Gate 05G — Fault Containment and Gateway Failsafe Matrix

Status:
FAILSAFE_MATRIX_MAPPED
SIMULATION_ONLY
TIMEOUT_VALUES_PENDING_SUPPLIER_DATA
HIL_BENCH_PROOF_REQUIRED
CAN_1_LISTEN_ONLY_PROOF_REQUIRED
NO_PHYSICAL_GATEWAY_DEPLOYMENT
NO_FACTORY_BUS_TRANSMISSION
NO_PLACEHOLDER_TIMING_AUTHORITY
Add this rule
No failsafe timing value may control physical hardware until it is upgraded from SimulationSweepOnly to SupplierConfirmed or BenchVerified.
And:
Any signal fault involving torque, contactors, BMS discharge permission, HVIL, isolation, or e-stop must default toward torque inhibit, restart lockout, and engineering review.
What comes next
Next should be:
Gate 05H — Gateway Proof Plan / HIL Bench Test Matrix
Gate 05G says what should happen when faults occur.
Gate 05H should define how you prove it without putting it in a vehicle yet:
- CAN_1 silent-mode proof
- CAN_2 inverter timeout test
- CAN_3 BMS heartbeat dropout test
- bad checksum injection
- wrong source address rejection
- torque-zero command trace
- BMS no-discharge response
- e-stop loop bench proof
- gateway power-loss behavior
- watchdog reset behavior
Bottom line: Gate 05G is good enough to keep. The only cleanup is: every timing number must be downgraded to SimulationSweepOnly / SupplierDataPending, and every “instant” physical action must become “supplier-defined and bench-verified.”
