[Owner framing before the payload — the Gate 05A source-backed signal
registry prompt (per signal: name, source document, bus/channel, protocol,
PGN/ID, byte/bit, direction listen-only/receive/transmit, allowed use,
blocked use, verification status, proof artifact) + the review_31 recap
(Gate 08C good but clean up "stable/unstable" → Simulation Response
Category; Gate 05 good safe-lane but do not assume Ford PGNs/bytes are
available/usable) — "35:75".]

[Owner verdict delivered AFTER the batch-35 payload:]

My respond

My verdict: this is one of the cleanest versions so far. You fixed the main problem: Gate 08C now clearly says the numbers are for simulation sweeps only and have no gate authority.
Gate 08C:
GOOD - simulation sweep engine is structured correctly.
GOOD - no placeholder pass/block authority.
GOOD - physical testing stays blocked.
GOOD - supplier data still required.

Gate 05A:
GOOD - listen-only / authorized channel doctrine is correct.
NEEDS CLEANUP - do not assume Ford will provide full DBCs or allow transmit configs.
What is strong
This part is exactly right:
Default_Stress_Value: null
Exploratory_Test_Values: [...]
Authority: None
Blocked Use: Final pass/fail / physical test approval
Upgrade Required: supplier timing specifications or measured proof
That is the correct Build Engine behavior.
You are no longer saying:
50 ms passes.
You are saying:
50 ms is one simulation sweep point with no authority.
That is much cleaner.
Gate 08C can be parked now
I would mark Gate 08C as:
Gate 08C - Draft Validation Engine

Status:
SIMULATION_SWEEP_MATRIX_CREATED
PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY
SUPPLIER_THRESHOLDS_REQUIRED
NO_PHYSICAL_TEST_CLEARANCE
NO_COMPLIANCE_CLAIMS
PARKED_FOR_SUPPLIER_DATA
That means you are not "done," but you are done enough to keep moving.
Small wording correction
Even though you fixed "stable / unstable," I would still make the categories slightly more strict:
Instead of:
Model Accepts
Model Needs Review
Model Stress Failure
Use:
Within Draft Stress Envelope / No Gate Authority
Needs Review / No Gate Authority
Model Stress Failure / No Gate Authority
That way nobody mistakes "Model Accepts" for actual approval.
Gate 05A is the right next move
Your safe-lane rule is very good:
No active transmissions.
No safety bus injection.
No fake ABS/ESC messages.
No anti-theft bypass.
Authorized channels only.
That is exactly the right tone for Gate 05.
Main Gate 05A correction
This line is still too strong:
Certified Ford UIM / J1939 DBC Matrix Documentation
Unlocks custom VCU transmit configurations on the vehicle's body-builder bus.
Change it to:
Authorized Ford UIM / J1939 Signal Documentation

Unlocks:
- listen-only signal registry
- receive-only VCU state awareness
- authorized upfitter interface mapping

Transmit remains blocked unless Ford documentation explicitly allows the exact message, bus, address, timing, and use case.
That is safer and more accurate.
DBC wording correction
Ford may not give you a clean full proprietary DBC. So do not make the system depend on:
Certified Ford proprietary DBC
Better:
Authorized Ford signal documentation / UIM documentation / J1939 source mapping / supplier DBCs for conversion-side devices
For your own EV-side systems, DBCs are realistic:
BMS DBC
Inverter DBC
VCU internal message map
DC-DC DBC
Charger DBC
For Ford factory systems, treat it as:
AuthorizedSourcePending
ListenOnlyCandidate
NoTransmitAuthority
Signal registry cleanup
Your 05A rows are structured correctly, but label the public J1939 rows like this:
Source Type:
Public/Standard J1939 Candidate

Verification Status:
UnverifiedStage / NeedsExactStandardText / NeedsVehicleCapture

Direction:
Listen-Only

Authority:
No control authority
Especially for:
Wheel speed
Accelerator pedal position
Brake switch state
Ignition state
Those can inform the VCU model, but they should not directly command torque, braking, pre-charge, or safety behavior until proven.
Strong correction for accelerator pedal
Current allowed use is okay, but I would make it stricter:
Allowed Use:
Compare driver-demand trend in simulation.

Blocked Use:
Direct inverter torque command, physical torque arbitration, or road-test torque control.
The VCU should not use a raw unverified Ford accelerator signal as physical torque authority.
Strong correction for brake switch
This line:
Allowed Use: Triggering regenerative auxiliary decay loops
Make it:
Allowed Use:
Simulation-only regen decay logic study.

Blocked Use:
Physical regen disable, braking validation, or safety control without confirmed signal source, debounce logic, and brake engineer review.
EV-side loops are good
These are correctly separated:
CAN_2: isolated EV inverter sub-loop
CAN_3: isolated EV battery loop
That is the right architecture. Your VCU can control conversion-side systems, but it should not transmit into Ford ABS/ESC/anti-theft/safety buses.
Clean status after this payload
Use this:
Gate 08C:
SIMULATION_SWEEP_MATRIX_CREATED
PARKED_FOR_SUPPLIER_DATA

Gate 05A:
SIGNAL_REGISTRY_STARTED
LISTEN_ONLY_RESEARCH
UNVERIFIED_STAGE
NO_ACTIVE_TRANSMISSIONS
NO_FACTORY_SAFETY_BUS_CONTROL
Bottom line
This is good enough to move deeper into Gate 05.
Next step:
Gate 05B - Controls Dependency Map
That should map:
Ford-side signals needed
EV-side signals needed
VCU decisions
driver warnings
fault states
what is receive-only
what is transmit-only on EV side
what is completely blocked
Your project is now moving correctly: 08C keeps simulating without authority, while Gate 05 starts building the actual control and communication architecture.
