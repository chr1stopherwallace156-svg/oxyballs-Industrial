[Owner framing before the payload — the Ford-specific/supplier-specific Gate 04 closure prompt + still-missing list ("22:75").]

[Owner verdict delivered AFTER the batch-22 payload:]

My response 

My verdict: this is a big improvement, but Gate 04 is still not closed. You are now close to the right brake/steering architecture, but a few claims are being promoted too high.
Gate 04 status:
Hydroboost dependency: mapped
Vacuum pump path: rejected
EHPS path: correct
Ford-specific final values: still missing
EHPS final candidate: not selected yet
DC-DC impact: now clearly identified
What is strong
The best part is this:
EHPS sizing must support brake assist + steering assist together.
That is the right rule. The HydroBoost instructions directly support that the pump powers both the HydroBoost and steering gear, needs at least 2 GPM, should make at least 1200 psi, and low flow can delay brake assist or cause steering assist to fall off when brakes are applied.  
Your DC-DC warning is also correct. If an EHPS pump needs roughly 2–3.5 kW mechanical/hydraulic power, then a 12V system can easily become a hundreds-of-amps problem. That means brake/steering is no longer just a hydraulic gate — it also loops back into:
low-voltage architecture
DC-DC converter sizing
12V battery buffering
thermal derating
fault warning logic
What needs correction
1. Lee Power Steering is useful, but not Ford F-450/F-550 proof
The Lee source supports the existence of Ford-style CII pump configurations and a dual-return hydroboost option at 1750 psi / 3.25 GPM. But the page itself also says Ford used many different pressure/flow settings depending on the vehicle, and the visible fitment list is not a direct 2020–2026 F-450/F-550 OEM source.  
So mark it:
SupplierBackground / Ford-StyleComponentCandidate
NeedsFordExactSource
Not final Ford F-450/F-550 value
Do not call it the native Ford Super Duty specification yet.
2. The Hot Rods HydroBoost source stays generic
It is useful because it explains pump flow, pressure, combined steering/brake interaction, accumulator behavior, and failure symptoms. But it is not official Ford data. It should not become your final F-450/F-550 rule by itself.  
Correct status:
EngineeringBackground
HydroboostPrincipleCandidate
NeedsFordExactSource
3. The TRW pump is not an EHPS system yet
The TRW row is useful because the listing gives real hydraulic pump values: 2683 psi relief pressure, 6.30 GPM flow rate, 25 cc/rev displacement, and -40°C to +135°C working temperature range.  
But it is still a hydraulic pump assembly, not a complete electric-hydraulic steering system. It does not give:
electric motor voltage
current draw
controller logic
PWM/CAN control
duty cycle
thermal cutback
mounting
reservoir
noise
failure response
So mark it:
HydraulicPumpCandidate
NeedsElectricMotorDriveData
Not final EHPS candidate
4. “Will not bottleneck or overheat” is too strong
Change this:
This ensures the unit will not bottleneck or overheat.
To this:
This suggests the hydraulic section has enough pressure/flow capacity to evaluate, but suitability depends on the electric motor drive, duty cycle, plumbing, reservoir, fluid temperature, and Ford-specific requirements.
Corrected Gate 04 state
Use this:
Gate 04 — Brake / Steering Assist v0.2

Known:
- Vacuum pump is wrong for a hydroboost-based truck.
- Brake assist and steering assist share hydraulic supply.
- EHPS must support simultaneous brake + steering demand.
- Low-voltage power demand may be severe.

Candidate data:
- Generic hydroboost minimum: 2 GPM / 1200 psi.
- Ford-style dual-return pump candidate: 1750 psi / 3.25 GPM.
- Medium-duty hydraulic pump candidate: 2683 psi / 6.30 GPM.

Still blocked:
- exact Ford F-450/F-550 pump curve
- exact Ford steering gear requirement
- exact hydroboost accumulator reserve
- true EHPS motor/controller data
- DC-DC sizing
- FMVSS 105 test mapping
What you should ask next
Now the research should narrow to complete EHPS systems, not just hydraulic pumps.
Use this:
We are still closing Gate 04: Brake / Steering Assist.

Do not research generic hydroboost anymore unless it gives exact pressure-flow-current data.

Find complete electric-hydraulic power steering / brake-assist pump candidates suitable for Class 4/5 hydroboost + steering systems.

For each candidate, extract:
- manufacturer
- exact model
- voltage input: 12V / 24V / HV
- continuous current draw
- peak current draw
- hydraulic flow curve
- hydraulic pressure curve
- relief pressure
- duty cycle
- thermal derating
- control method: PWM / CAN / analog / fixed speed
- reservoir requirements
- fluid type
- port/fitting data
- fault outputs
- mounting requirements
- whether it supports simultaneous hydroboost + steering assist
- whether it is designed for medium-duty/commercial vehicles

Also find Ford/OEM sources for:
- F-450/F-550 factory power steering pump pressure and flow
- steering gear pressure/flow requirements
- hydroboost accumulator reserve capacity
- loaded low-speed steering test method
- FMVSS 105 brake test mapping

Hard rules:
- Hydraulic pump data alone is not enough.
- A Dodge/Mopar EHPS example is LeadOnly unless pressure, flow, current, and duty cycle are proven.
- Do not mark anything Confirmed.
- Do not claim compliance.
Second-stage filter correction
Process Gate 04 payload.

Promote:
- Vacuum pump rejection as RuleCandidate.
- Simultaneous brake + steering hydraulic demand as NoGoConditionCandidate.
- DC-DC load impact as OpenGap / RuleInput.

Downgrade:
- Lee Power Steering row to SupplierBackground / NeedsFordExactSource.
- PartsForHotRods HydroBoost rows to EngineeringBackground / NeedsFordExactSource.
- TRW pump row to HydraulicPumpCandidate / NeedsElectricMotorDriveData.
- Any claim of “will not bottleneck or overheat” to NeedsEngineeringReview.

Create OpenGaps:
- Ford factory pump pressure-flow curve.
- Ford steering gear pressure-flow requirement.
- Hydroboost accumulator reserve capacity.
- Complete EHPS pressure-flow-current map.
- EHPS duty cycle and thermal derating.
- DC-DC converter sizing.
- FMVSS 105 brake test mapping.
- Loaded low-speed steering test procedure.
Bottom line
This is not junk — it is actually a strong Gate 04 v0.2.
But the honest status is:
You have proven the architecture problem. You have not yet proven the replacement system.
The next step is to find a complete EHPS system with pressure, flow, current draw, duty cycle, and control data — then compare it against the Ford hydroboost + steering requirements.
