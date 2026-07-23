[Owner framing before the payload — the review_34 recap/corrections carried
into the Gate 05D prompt: Ford-side signals stay listen-only; for physical
control use verified EV-side input / supplier-confirmed input / hardwired
safety input / authorized upfitter input; emergency-shutdown wording is too
strong ("Direct command to isolate high-voltage systems instantly" →
"Request or trigger EV-side torque inhibit, contactor-open sequence, and
restart lockout through the authorized BMS/PDU safety architecture"; the VCU
should not assume it owns final HV shutdown unless the hardware documents
say so); DRIVE_ENABLED needs the full required-input set (charger
disconnected, HVIL valid, isolation valid, no active fault latch, pre-charge
complete, contactors confirmed closed by safety controller, brake override
logic available, accelerator plausibility valid, low-voltage rail healthy,
BMS allows discharge, inverter ready — not just "Shift position == D" +
"verified driver demand inputs"); and the biggest upgrade — add ownership
labels to every state (Owner ∈ {VCU, BMS, PDU, Inverter, Charger, Ford
module, Hardwired safety circuit, Unknown/Pending supplier architecture} +
VCU Role + Authority Status). The prompt then defines Gate 05D — State
Transition + Ownership Matrix, with the doctrine "Coordinator ≠ Owner |
Requesting ≠ Commanding | Monitoring ≠ Approving | Seeing a signal ≠ having
authority to act on it", the role vocabulary (OWNER / REQUESTER / MONITOR /
DISPLAY_ONLY / BLOCKED / PENDING), five worked examples (PRECHARGE_REQUEST,
READY_TO_DRIVE, DRIVE_ENABLED, EMERGENCY_SHUTDOWN, driver warnings), the
final responsibility table, the Build Engine rule ("No state transition may
become physical-control authority until every action inside that transition
has an assigned owner, allowed requester, blocked controller list, and proof
artifact") and the fallback ("If ownership is unknown, the VCU may simulate,
monitor, or request only. It may not directly control"). The 12-field matrix
format: state name / major action / primary owner / VCU role (owner /
requester / monitor / display-only / blocked / pending) / allowed inputs /
allowed EV-side outputs / blocked Ford-side outputs / fault transition /
ownership status / supplier-Ford data needed / proof artifact / Build Engine
status. Hard rules: unknown ownership = SimulationOnly; VCU may coordinate
but not own safety actions without documentation; Ford-side factory networks
remain listen-only unless officially authorized; EV-side outputs stay
isolated from Ford safety networks. States to map: OFF, ACCESSORY,
READY_REQUEST, PRECHARGE_REQUEST, READY_TO_DRIVE, DRIVE_ENABLED, DERATE,
FAULT_LATCHED, SERVICE_MODE, CHARGE_CONNECTED, EMERGENCY_SHUTDOWN — "38:75".]

[Owner verdict delivered AFTER the batch-38 payload:]

My response

My verdict: this is a major upgrade. Gate 05D is doing exactly what it should: it separates coordination, ownership, request authority, monitoring, and blocked control paths.
Gate 05D:
STATE TRANSITION + OWNERSHIP MATRIX CREATED ✅
VCU GOD-CONTROLLER RISK REDUCED ✅
FORD-SIDE AUTHORITY BLOCKED ✅
EV-SIDE OWNERSHIP STILL PENDING SUPPLIER DATA ✅
The strongest line is this:
Coordinator ≠ Owner
Requesting ≠ Commanding
Monitoring ≠ Approving
Seeing a signal ≠ having authority to act on it.
That should become a permanent Build Engine doctrine line.
What is strongest
Your Final Responsibility Matrix is very good. This is the right architecture:
Ford wheel speed / brake switch / accelerator:
MONITOR only

Ford cluster:
BLOCKED

ABS/ESC:
MONITOR only / NO_CONTROL

Pre-charge / contactors / HV shutdown:
PENDING_SUPPLIER ownership

EV display:
isolated owner path

Inverter torque:
pending owner only on isolated EV loop
That is exactly the safe separation.
Main corrections
1. READY_TO_DRIVE should not mention torque command yet
In this state:
READY_TO_DRIVE
Action: Close main positive/negative contactors.
This line is slightly early:
VCU may command torque only after confirmed ready state
Better:
Allowed EV-side Outputs:
- VCU may request drive-enable state confirmation.
- Torque command remains blocked until DRIVE_ENABLED state is entered and all torque-authority conditions are satisfied.
Keep torque strictly in DRIVE_ENABLED.



2. OFF state needs low-voltage ownership detail
In OFF, if the VCU is truly asleep, it cannot monitor much. Add:
Low-voltage supervisor / BMS keep-alive may own sleep-state monitoring.
VCU monitor role applies only if awake in low-power supervisory mode.
So:
VCU Role:
MONITOR only if low-power supervisor mode is active; otherwise dormant.



3. ACCESSORY state should not assume pumps can run freely
This line is okay:
Power delivery to thermal cooling pumps
But it needs a limit:
Thermal pumps may run only if low-voltage power budget, pump ownership, and thermal controller authority are verified.
Otherwise the VCU could accidentally become the thermal-controller owner too early.



4. SERVICE_MODE needs LOTO / absence-of-voltage language
This state should explicitly say:
Physical maintenance actions require:
- HV de-energized
- LOTO active
- service disconnect removed if applicable
- absence-of-voltage verification complete
- technician signoff
The VCU can provide diagnostics, but it should not make physical service “safe” by software alone.



5. EMERGENCY_SHUTDOWN should say “request de-energization”
This line:
Remove propulsion torque and de-energize HV system.
Should become:
Remove propulsion torque and request HV de-energization through the authorized BMS/PDU/hardwired safety architecture.
Because you already correctly said the VCU may not own final HV isolation.
Correct Gate 05D status
Use this:
Gate 05D — State Transition + Ownership Matrix

Status:
STATE_OWNERSHIP_MATRIX_CREATED
VCU_ROLE_LIMITS_DEFINED
FORD_SIDE_CONTROL_BLOCKED
EV_SIDE_CONTROL_ISOLATED
CONTACTOR_OWNER_PENDING
PRECHARGE_OWNER_PENDING
HV_SHUTDOWN_OWNER_PENDING
TORQUE_AUTHORITY_PENDING
SERVICE_MODE_PHYSICAL_SAFETY_PENDING
SIMULATION_ONLY
Add this rule
A state may be simulated if ownership is pending.
A state may not control physical hardware until every action inside the state has:
- owner
- requester
- monitor
- blocked controllers
- proof artifact
- verified source
- test status
That gives the Build Engine a clean stop sign.
What comes next
Next gate should be:
Gate 05E — Interface Control Document / Signal Authority Table
Gate 05D says who owns what.
Gate 05E should say what signal is allowed to cross what boundary.
Use this structure:
Signal:
Source controller:
Destination controller:
Bus:
Direction:
Owner:
Requester:
Allowed use:
Blocked use:
Physical authority:
Verification status:
Proof artifact:
Example:
Signal: M_EV_Torque_Command_Nm
Source: VCU
Destination: Inverter
Bus: CAN_2 isolated EV loop
Direction: Transmit
Owner: VCU/Inverter pending supplier DBC
Allowed use: isolated EV torque command after all enable checks
Blocked use: Ford factory network, unverified pedal pass-through
Physical authority: BLOCKED until DBC + HIL + controls review
Bottom line
This is very good. I would mark it:
Gate 05D:
CREATED / SIMULATION_ONLY / OWNERSHIP PENDING
Then move to:
Gate 05E:
Interface Control Document + Signal Authority Table
That will make the system even tighter because it prevents signals from crossing from Ford-side monitoring into EV-side control without permission.
