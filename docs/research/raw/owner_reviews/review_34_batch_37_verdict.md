[Owner framing before the payload — the review_33 recap (tighten Gate 05B
VCU decisions to SimulationOnly with authority conditions; especially
pre-charge — do not assume the VCU controls contactors; driver warnings
EV-side only, factory cluster blocked) and the Gate 05C prompt (map every
operating state — OFF, ACCESSORY, READY_REQUEST, PRECHARGE_REQUEST,
READY_TO_DRIVE, DRIVE_ENABLED, DERATE, FAULT_LATCHED, SERVICE_MODE,
CHARGE_CONNECTED, EMERGENCY_SHUTDOWN — with required inputs, allowed
EV-side outputs, blocked Ford-side outputs, fault transitions, proof
artifact, verification status) — "37:75".]

[Owner verdict delivered AFTER the batch-37 payload:]

My respond

My verdict: this is a strong Gate 05C draft. The state machine is finally taking shape correctly, but a few lines still sound like the VCU has authority it may not legally/technically own yet.
Gate 05C:
Controls state machine drafted
SimulationOnly boundaries mostly correct
Ford-side transmit blocked
EV-side isolation mostly correct
Main cleanup:
Add ownership labels.
Do not let VCU assume contactor/pre-charge/HV shutdown authority.
Do not use unverified Ford signals as real state-transition requirements.
Strongest parts
This is good:
Torque Demand Arbitration:
SimulationOnly until verified pedal source, brake override, plausibility checks, inverter DBC, BMS limits, and controls engineer review exist.
Also strong:
Factory Ford cluster injection is blocked.
Ford-side CAN transmission is blocked.
EV-side displays only.
That keeps the system clean.
Main corrections
1. Ford-side listen-only signals cannot be hard "Required Inputs" yet
For example:
E_Ignition_State_Discrete == START/RUN
E_Brake_Switch_Discrete == TRUE
Those are okay for simulation, but not real control authority yet.
Change the label to:
Required Inputs:
SimulationOnly / CandidateSignal until official Ford/UIM source or verified capture exists.
For physical control, use:
Verified EV-side input
supplier-confirmed input
hardwired safety input
authorized upfitter input
2. Pre-charge threshold needs downgrade
This line:
bus voltage fails to climb to >95% of pack voltage within specified threshold limits
Good concept, but the 95% and timing should be:
ParameterPending / SupplierDataRequired
Better:
Transition to FAULT_LATCHED if pre-charge voltage fails to reach supplier-defined target within supplier-defined timeout.
3. Emergency shutdown wording is too strong
This line:
Direct command to isolate high-voltage systems instantly
Should be softened.
Use:
Request or trigger EV-side torque inhibit, contactor-open sequence, and restart lockout through the authorized BMS/PDU safety architecture.
And add:
Final HV isolation authority: BMS/PDU/hardwired E-stop ownership pending supplier architecture.
The VCU should not assume it owns final HV shutdown unless the hardware documents say so.
4. Service mode needs safety wording
This line is risky:
Open high-voltage interlock lines for physical maintenance validation checking.
Change it to:
Permit service diagnostics only after HV system is de-energized, LOTO is active, service disconnect is removed, and absence-of-voltage verification is complete.
Do not make "opening HVIL lines" sound like a normal software action during maintenance.
5. DRIVE_ENABLED needs more required inputs
Before active propulsion, add:
charger disconnected
HVIL valid
isolation valid
no active fault latch
pre-charge complete
contactors confirmed closed by safety controller
brake override logic available
accelerator plausibility valid
low-voltage rail healthy
BMS allows discharge
inverter ready
Right now it is too simple with only:
Shift position == D
verified driver demand inputs
Add ownership labels to every state
This is the biggest upgrade.
Use:
Owner:
- VCU
- BMS
- PDU
- Inverter
- Charger
- Ford module
- Hardwired safety circuit
- Unknown / Pending supplier architecture
Example:
PRECHARGE_REQUEST
Owner: BMS/PDU pending supplier architecture
VCU Role: request/monitor only until ownership confirmed
Authority Status: UNVERIFIED_STAGE
Corrected Gate 05C status
Gate 05C - Controls State Machine

Status:
STATE_MACHINE_DRAFTED
SIMULATION_ONLY
AUTHORITY_OWNERSHIP_UNRESOLVED
FORD_SIDE_SIGNALS_LISTEN_ONLY
EV_SIDE_OUTPUTS_ISOLATED
PRECHARGE_OWNER_PENDING
HV_SHUTDOWN_OWNER_PENDING
NO_PHYSICAL_TORQUE_CONTROL
NO_FACTORY_CLUSTER_INJECTION
Next step
You should now create:
Gate 05D - State Transition + Ownership Matrix
That should map:
state
owner
entry conditions
exit conditions
allowed outputs
blocked outputs
fault transitions
required proof artifact
authority status
supplier data needed
Bottom line: this is good. Keep it, but label every major action by ownership. The VCU can coordinate the state machine, but it cannot assume ownership of contactors, pre-charge, HV shutdown, factory signals, or cluster warnings until the supplier/Ford documentation proves it.
