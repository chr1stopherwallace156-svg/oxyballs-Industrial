[Owner framing before the payload — the review_35 recap carried into the
Gate 05E prompt: the next gate is Gate 05E — Interface Control Document /
Signal Authority Table, using the structure Signal / Source controller /
Destination controller / Bus / Direction / Owner / Requester / Allowed use /
Blocked use / Physical authority / Verification status / Proof artifact; plus
the five Gate 05D corrections restated (1) READY_TO_DRIVE should not mention
torque command yet — torque stays strictly in DRIVE_ENABLED; (2) OFF needs
low-voltage ownership detail — LV supervisor / BMS keep-alive may own
sleep-state monitoring, VCU Role = MONITOR only if low-power supervisor mode
is active, otherwise dormant; (3) ACCESSORY thermal pumps may run only if LV
power budget + pump ownership + thermal-controller authority are verified;
(4) SERVICE_MODE needs LOTO / absence-of-voltage language — the VCU can
provide diagnostics but must not make physical service "safe" by software
alone; (5) EMERGENCY_SHUTDOWN "de-energize HV system" → "request HV
de-energization through the authorized BMS/PDU/hardwired safety
architecture" — and the rule: a state may be simulated if ownership is
pending; a state may not control physical hardware until every action inside
it has owner · requester · monitor · blocked controllers · proof artifact ·
verified source · test status. Then move to Gate 05E — Interface Control
Document + Signal Authority Table — "39:75".]

[Owner verdict delivered AFTER the batch-39 payload:]

My response

My verdict: this is a strong Gate 05E draft. You now have the right concept: every signal has an owner, direction, allowed use, blocked use, authority level, verification status, and proof artifact.
Gate 05E:
SIGNAL_BOUNDARIES_MAPPED ✅
SIMULATION_ONLY_RESTRICTION ✅
PHYSICAL HARDWARE DRIVE BLOCKED ✅
FACTORY BUS TRANSMISSION BLOCKED ✅

Main cleanup:
Split “request,” “status,” and “hardware actuation” signals.
Do not let one signal name imply more authority than it has.
What is strongest
This logic is exactly right:
IF authority_status == "UNVERIFIED_STAGE" OR owner == "PENDING":
    PHYSICAL_HARDWARE_DRIVE = "BLOCKED"
    BUS_TRANSMISSION_FACTORY = "BLOCKED"
    EVALUATION_MODE = "SIMULATION_ICD_VERIFICATION_ONLY"
That is the Build Engine rule you want. It prevents a signal from jumping from “mapped in software” to “allowed to control hardware.”
Your Ford-side signal boundaries are also much cleaner now:
Ford accelerator: listen-only / no torque authority
Ford brake switch: listen-only / no braking authority
Ford cluster: blocked
Ford safety networks: blocked
EV torque command: isolated EV loop only
Pre-charge/contactors: pending supplier ownership
Emergency shutdown: split ownership
That is the right architecture.
Main corrections
1. Split pre-charge into three separate signals
Right now this one is too broad:
Signal: Pre-Charge Inception Flag
Destination: High-Voltage Pre-Charge Relay Circuit
That mixes request, status, and hardware actuation into one signal. Split it:
Signal 1:
VCU_Precharge_Request
Source: VCU
Destination: BMS/PDU
Direction: Transmit request only
Authority: BLOCKED until supplier protocol confirms request is allowed

Signal 2:
BMS_Precharge_Status
Source: BMS/PDU
Destination: VCU
Direction: Receive
Authority: MONITOR

Signal 3:
Precharge_Relay_Coil_Control
Source: BMS/PDU or hardwired safety controller
Destination: Pre-charge relay
Direction: Hardware actuation
Authority: BLOCKED for VCU unless supplier architecture explicitly assigns it
That makes the authority map much safer.
2. Split emergency shutdown too
This one should also be broken apart:
Signal: Emergency Shutdown Inhibit Command
The name is confusing because “inhibit” can sound like preventing shutdown. Rename it and split it:
Signal 1:
VCU_Torque_Zero_Request
Owner: VCU/Inverter
Bus: CAN_2 isolated EV loop
Authority: pending inverter DBC + HIL review

Signal 2:
VCU_Shutdown_Request_To_BMS
Owner: BMS/PDU
VCU Role: requester only
Authority: pending supplier protocol

Signal 3:
Hardwired_EStop_Open_Circuit
Owner: hardwired safety loop
VCU Role: monitor only
Authority: no software override

Signal 4:
BMS_Contactor_Open_Status
Owner: BMS/PDU
VCU Role: monitor
Authority: receive only
That keeps torque inhibit separate from HV de-energization.
3. Ford brake switch source should stay generic
This line may be too specific:
Source controller: Ford ABS / Brake Pedal Sensor Module
Until proven, better:
Source controller:
Ford factory module / UIM path pending verification
Same idea for accelerator pedal. Do not assume exact Ford module ownership until the Ford source or passive capture proves it.
4. “No transceiver ACK activation” is good, but make it a proof requirement
This proof artifact is strong:
passive network capture without transceiver ack activation
Add it as a hard rule:
Listen-only proof requires:
- interface configured in silent/listen-only mode
- no ACK participation
- no transmit mailbox enabled
- capture log attached
- hardware configuration screenshot attached
That makes Gate 05A much more enforceable.
Correct Gate 05E status
Use this:
Gate 05E — Interface Control Document / Signal Authority Table

Status:
ICD_SIGNAL_BOUNDARIES_MAPPED
SIMULATION_ONLY
FORD_SIDE_LISTEN_ONLY
EV_SIDE_ISOLATED_CONTROL_PENDING
PRECHARGE_SIGNALS_NEED_SPLIT
SHUTDOWN_SIGNALS_NEED_SPLIT
NO_FACTORY_BUS_TRANSMISSION
NO_PHYSICAL_HARDWARE_DRIVE
Strong rule to add
A signal cannot be both a request and a hardware actuation unless the source document explicitly says so.
And:
Every safety-critical action must be decomposed into:
request signal
status signal
feedback signal
hardware actuation signal
fault signal
That will stop ambiguity.
What comes next
Next should be:
Gate 05F — Network Boundary / Gateway Safety Rules
Gate 05E maps the signals. Gate 05F should define what the gateway is physically and logically allowed to do.
It should answer:
Which buses are physically isolated?
Which buses are listen-only?
Which buses can transmit?
Which signals can cross from Ford-side to EV-side?
Which signals are forbidden from crossing?
What happens if the gateway crashes?
What happens if CAN_2 or CAN_3 goes silent?
What proof shows CAN_1 never transmits?
Bottom line: Gate 05E is strong and usable as a simulation-only ICD draft. Clean up pre-charge and emergency shutdown by splitting request/status/actuation signals, then move to Gate 05F network-boundary rules.
