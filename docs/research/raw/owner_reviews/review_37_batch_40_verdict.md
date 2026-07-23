[Owner framing before the payload — the review_36 recap carried into the
Gate 05F prompt: the next gate is Gate 05F — Network Boundary / Gateway
Safety Rules, defining what the gateway is physically and logically allowed
to do (which buses are physically isolated / listen-only / transmit-capable;
which signals can cross Ford-side → EV-side; which are forbidden; what
happens if the gateway crashes; what happens if CAN_2 or CAN_3 goes silent;
what proof shows CAN_1 never transmits); plus the Gate 05E corrections
restated (split pre-charge into VCU_Precharge_Request / BMS_Precharge_Status
/ Precharge_Relay_Coil_Control; split emergency shutdown into
VCU_Torque_Zero_Request / VCU_Shutdown_Request_To_BMS /
Hardwired_EStop_Open_Circuit / BMS_Contactor_Open_Status; Ford brake-switch +
accelerator sources stay generic "Ford factory module / UIM path pending
verification"; the listen-only proof requirement — silent/listen-only mode +
no ACK participation + no transmit mailbox enabled + capture log +
hardware-configuration screenshot); and the doctrine "a signal cannot be
both a request and a hardware actuation unless the source document explicitly
says so" + "every safety-critical action must be decomposed into request /
status / feedback / hardware-actuation / fault signals" — "40:75".]

[Owner verdict delivered AFTER the batch-40 payload:]

My response

My verdict: Gate 05F is excellent structurally, but you have one major issue: the timeout numbers are starting to act like sourced safety boundaries again.
The architecture is right:
CAN_1 = Ford side / listen-only / no transmit
CAN_2 = isolated EV inverter loop / VCU ↔ inverter
CAN_3 = isolated EV battery loop / VCU ↔ BMS/PDU
And this rule is exactly right:
If listen-only proof is missing OR isolation is unverified:
    GATEWAY_DEPLOYMENT = BLOCKED
    PHYSICAL_INJECTION_TEST = FORBIDDEN
    EXECUTION_MODE = SIMULATION_BOUNDARY_LOGIC_ONLY
That should stay.
What is strongest
The signal decomposition is a big improvement.
Splitting pre-charge into:
VCU_Precharge_Request
BMS_Precharge_Status
Precharge_Relay_Coil_Control
is exactly the right move.
Splitting emergency shutdown into:
VCU_Torque_Zero_Request
VCU_Shutdown_Request_To_BMS
Hardwired_EStop_Open_Circuit
BMS_Contactor_Open_Status
is also correct. That prevents one vague “shutdown command” from pretending it owns torque, contactors, HVIL, and restart lockout all at once.
Main correction: remove authority from the 50 ms / 100 ms numbers
This section is risky:
Inverter drops to zero torque within 50ms.
VCU detects CAN_2 silence after 100ms.
VCU detects CAN_3 silence after 100ms.
Those numbers can stay only as simulation sweep placeholders, not gateway rules.
Change them to:
t_inverter_timeout = SupplierDataPending
t_can2_timeout = SupplierDataPending
t_can3_timeout = SupplierDataPending
And write:
Exploratory sweep values may include 50 ms, 100 ms, 250 ms, etc.
No timeout value has physical authority until supplier DBC, inverter/BMS documentation, or HIL validation confirms it.
So Protocol A should become:
The traction inverter detects loss of the VCU cyclic frame and transitions to supplier-defined zero-torque behavior. Timeout value pending inverter DBC / supplier safety manual.
Protocol B:
VCU detects absence of inverter status telemetry after supplier-defined timeout. Placeholder timeout values may be used for simulation sweeps only.
Protocol C:
VCU detects absence of BMS heartbeat after supplier-defined timeout. BMS independent contactor-opening behavior pending supplier architecture.
Second correction: “academic engineering wiring protocol”
This phrase appears here:
Physical authority: BLOCKED until academic engineering wiring protocol confirms request is allowed.
Use supplier/engineering language instead:
Physical authority: BLOCKED until supplier wiring diagram, interface control document, and controls engineer review confirm request authority.
“Academic” sounds too weak for a real build authority chain.
Third correction: VCU_Precharge_Request owner
You wrote:
Owner: Conversion VCU
For the request signal, yes, the VCU owns the request. But the pre-charge action is still owned by BMS/PDU/hardwired safety.
Make it explicit:
Signal Owner: VCU owns request generation.
Action Owner: BMS/PDU/hardwired safety owns pre-charge execution.
VCU Authority: Requester only.
Same for VCU_Shutdown_Request_To_BMS.
Fourth correction: CAN_1 “physically modified” language
This line is directionally right:
CAN_1 transceiver hardware must be modified or configured to prevent transmission.
But “modified” can be risky. Say:
CAN_1 hardware must be selected, wired, or configured for listen-only/silent monitoring with no transmit capability enabled.
That gives you options: silent-mode controller, receive-only transceiver setup, removed TX path, or hardware gating.
Correct Gate 05F status
Use this:
Gate 05F — Network Boundary / Gateway Safety Rules

Status:
NETWORK_BOUNDARY_RULES_CREATED
CAN_1_LISTEN_ONLY_REQUIREMENT_DEFINED
EV_SIDE_BUSES_ISOLATED
PRECHARGE_SIGNAL_DECOMPOSED
SHUTDOWN_SIGNAL_DECOMPOSED
TIMEOUT_VALUES_PENDING_SUPPLIER_DATA
NO_FACTORY_BUS_TRANSMISSION
NO_PHYSICAL_GATEWAY_DEPLOYMENT
SIMULATION_ONLY
Add this rule
No timeout, heartbeat, alive-counter, torque-zero, shutdown, or contactor-open timing may become physical gate logic until confirmed by supplier documentation or HIL/bench proof.
And:
If a timeout is estimated, it may be used only in simulation sweeps and must be labeled No Gate Authority.
What comes next
After 05F, the next logical step is:
Gate 05G — Fault Containment and Gateway Failsafe Matrix
Gate 05F says what can cross the network boundary.
Gate 05G should say what happens when something fails:
VCU crash
CAN_1 accidentally attempts transmit
CAN_2 inverter loop silent
CAN_3 BMS loop silent
gateway power loss
gateway stuck dominant
gateway stuck recessive
bad checksum / alive counter
message replay
wrong source address
BMS says no-discharge
inverter ignores torque-zero
E-stop asserted
Bottom line: this is very good. Keep the architecture. Just downgrade the 50 ms / 100 ms values back to supplier-pending simulation sweep inputs, and Gate 05F is clean enough to park as a simulation-only network-boundary gate.
