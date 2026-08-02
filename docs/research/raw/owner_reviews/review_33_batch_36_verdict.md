[Owner framing before the payload — the review_32 recap (park Gate 08C;
tighten "Model Accepts"; Gate 05A DBC reality — no Certified Ford
proprietary DBC, EV-side DBCs realistic; accel-pedal + brake-switch use
restrictions; Gate 05A status) and the instruction to build Gate 05B —
Controls Dependency Map (Ford-side signals needed, EV-side signals
needed, VCU decisions, driver warnings, fault states, receive-only,
transmit-only on EV side, completely blocked) — "36:36".]

[Owner verdict delivered AFTER the batch-36 payload:]

My responds

My verdict: this is very strong now. You corrected the main architecture problem: Gate 08C is parked as simulation-only, and Gate 05A/05B is starting with listen-only, no active transmissions, no factory safety-bus control.
Gate 08C:
Correctly parked
Gate 05A:
Signal registry started correctly
Gate 05B:
Controls dependency map started correctly
Main cleanup:
Keep Ford-side signals receive/listen-only.
Keep EV-side transmit commands isolated.
Do not let unverified Ford signals command torque, pre-charge, shutdown, or driver warnings.
What is strongest
This part is exactly right:
No direct routing of unverified CAN_1 Ford data to CAN_2 inverter torque command.
No packet injection from custom EV systems onto Ford factory safety networks.
No unauthorized J1939 messages or upfitter command overrides.
That is the correct safety lane.
Your Gate 05A registry also has the right structure:
signal name
source document
bus/channel
protocol
PGN or ID
byte/bit mapping
direction
allowed use
blocked use
verification status
proof artifact
That is exactly what the Build Engine needs.
Main correction: "custom VCU configurations on body-builder bus"
This ledger line is still a little too strong:
Unlocks custom VCU configurations on the vehicle's body-builder bus.
Change it to:
Unlocks authorized receive/listen-only VCU awareness from the body-builder bus.

Transmit behavior remains blocked unless official Ford documentation explicitly allows the exact message, address, timing, bus, and use case.
That keeps Gate 05 clean.
Gate 05A status should be
Gate 05A - Source-Backed Signal Registry

Status:
SIGNAL_REGISTRY_STARTED
UNVERIFIED_STAGE
LISTEN_ONLY_RESEARCH
NO_ACTIVE_TRANSMISSIONS
NO_FACTORY_SAFETY_BUS_CONTROL
NO_PROPRIETARY_DBC_ASSUMPTIONS
Good.
Gate 05B is good, but tighten the VCU decisions
This section is the most important one:
VCU Decisions:
- Torque Demand Arbitration
- Pre-Charge Sequence Management
- Thermal Management Loop Derating
These are fine inside simulation, but they need strict authority labels.
Use this:
Torque Demand Arbitration:
SimulationOnly until verified pedal source, brake override, plausibility checks, inverter DBC, BMS limits, and controls engineer review exist.

Pre-Charge Sequence Management:
SimulationOnly until BMS/PDU supplier architecture confirms whether VCU, BMS, or PDU owns pre-charge authority.

Thermal Derating:
SimulationOnly until supplier derating curves and component temperature limits are loaded.
Especially pre-charge: do not assume the VCU is allowed to directly control contactors or pre-charge. That may belong to the BMS/PDU safety controller.
Driver warnings need one correction
This line:
EV Malfunction Indicator Trigger
should not imply use of the Ford factory cluster yet.
Change it to:
EV warning output candidate:
isolated display node / service laptop / prototype dashboard only.

Factory cluster warning integration:
BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE.
Same for thermal warnings and SOC display. They can exist in your EV-side display, but not be injected into Ford factory cluster until authorized.
Fault Level 3 wording
This line is directionally right:
Emergency Shutdown: Immediate command sequence to open high-voltage loops if critical safety thresholds are broken.
But make it cleaner:
Fault Level 3:
Request EV-side contactor open / torque inhibit / restart lockout through the authorized BMS-PDU safety architecture.

Status:
SimulationOnly until BMS/PDU ownership and contactor control authority are confirmed.
Do not say the VCU can automatically own final HV shutdown unless your supplier architecture confirms that.
Signal registry rows are good, with one repeated caution
For these Ford-side signals:
wheel speed
accelerator pedal
brake switch
ignition state
Keep them as:
J1939SignalCandidate
ListenOnlyCandidate
UnverifiedStage
NoControlAuthority
Do not assume those PGNs are actually available on the Ford upfitter bus until captured or documented.
Corrected Gate 05B status
Gate 05B - Controls Dependency Map

Status:
CONTROL_DEPENDENCY_MAP_STARTED
SIMULATION_ONLY
FORD_SIDE_RECEIVE_ONLY
EV_SIDE_ISOLATED_CONTROL_ONLY
PRECHARGE_AUTHORITY_UNCONFIRMED
DRIVER_WARNING_OUTPUT_UNCONFIRMED
NO_PHYSICAL_TORQUE_CONTROL
NO_FACTORY_CLUSTER_INJECTION
What comes next
Next should be:
Gate 05C - Controls State Machine
That maps every operating state:
OFF
ACCESSORY
READY_REQUEST
PRECHARGE_REQUEST
READY_TO_DRIVE
DRIVE_ENABLED
DERATE
FAULT_LATCHED
SERVICE_MODE
CHARGE_CONNECTED
EMERGENCY_SHUTDOWN
For each state, define:
required inputs
allowed EV-side outputs
blocked Ford-side outputs
fault transitions
proof artifact
verification status
Bottom line
This payload is very good. I would mark it:
Gate 08C:
PARKED_FOR_SUPPLIER_DATA
Gate 05A:
SIGNAL_REGISTRY_STARTED
Gate 05B:
CONTROL_DEPENDENCY_MAP_STARTED
NEEDS STATE MACHINE NEXT
The main rule going forward: Ford-side signals can inform the model, but EV-side authority must stay isolated until every source, DBC, safety condition, and test path is proven.
