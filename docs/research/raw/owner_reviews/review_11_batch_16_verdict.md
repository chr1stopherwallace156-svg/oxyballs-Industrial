[Owner framing before the payload — the powertrain-definition prompt from review_10, restated as the ask ("16:75").]

[Owner verdict delivered AFTER the batch-16 payload:]

My response 


This is a major unlock, but it also exposes a possible power mismatch.
My verdict:
Powertrain research stage: started strong
HV wiring unlock: partially unlocked
Build-ready powertrain: not yet
Main risk: battery current may be too low for the Dana TM4 SUMO MD target
Next move: verify battery/inverter compatibility before going deeper
The good part
You did the correct next step. You moved from:
“What HV cable/fuse/contactor do we use?”
to the correct upstream question:
“What battery and inverter are we sizing around?”
That is exactly right.
The Dana SUMO MD lane makes sense for Class 4–7. Dana describes the SUMO MD system as designed for Class 4 to 7 commercial vehicles, bus platforms, and off-highway applications, with peak power up to 265 kW, peak torque up to 3320 Nm, and max speed up to 3700 rpm.  
The Webasto battery lane also makes sense as a commercial-vehicle battery lane. Webasto’s current Standard Battery Pro 40 is a successor to the CV Standard Battery System, and Webasto lists it as scalable in 400 V or 800 V system configurations, with up to 720 kWh using up to 18 batteries.   Webasto also states its Vehicle Interface Box can connect up to 10 standardized batteries at 400 V or 800 V.  
The big problem: current may not match power
Your payload says:
Battery: 350–400 V
Continuous discharge: 150 A
Peak discharge: 250 A
Motor/inverter: 130 kW continuous / 250 kW peak
That may not match.
Rough DC-side power check:
400 V × 250 A = 100 kW peak before losses
400 V × 150 A = 60 kW continuous before losses
350 V × 250 A = 87.5 kW peak before losses
350 V × 150 A = 52.5 kW continuous before losses
But the Dana target is around:
130 kW continuous
250 kW peak
To feed that at 400 V, ignoring losses, you would roughly need:
130 kW / 400 V = 325 A continuous
250 kW / 400 V = 625 A peak
So if the Webasto system is truly limited to 150 A continuous / 250 A peak at the VIB/system level, it may be underpowered for a SUMO MD setup. This does not mean Webasto is bad. It means the exact system configuration matters: number of packs, 400 V vs 800 V architecture, VIB limit, parallel/series arrangement, discharge limit, thermal limit, and supplier-approved configuration.
What this means for the Build Engine
This payload should trigger a new blocker:
POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED
Reason:
Candidate battery output current may not support candidate motor/inverter continuous and peak power demand.
That is a good blocker. It prevents you from building around mismatched parts.
What is strong in the payload
These are good rows:
Battery nominal/max voltage
Battery usable kWh
Battery mass/dimensions
Battery cooling requirement
Battery J1939/VIB path
Dana motor continuous/peak power
Dana motor torque/rpm range
Dana coolant temperature limit
Missing inverter DC-link capacitance
Missing battery short-circuit current
Missing DC bus current
The system is correctly saying:
I cannot calculate fuse, cable, contactor, or pre-charge until these upstream values are real.
That is excellent.
What must be downgraded
Some of the exact values need stronger source proof:
150 A continuous / 250 A peak
10 L/min coolant
pressure drop < 50 mbar
Dana DC input voltage
Dana inverter DC-link capacitance
integrated pre-charge through S-Box
J1939 registers
Keep those as:
NeedsExactSource / NeedsSupplierData / NeedsEngineeringReview
Do not let them become final unless the exact datasheet or supplier email proves them.
Also, Webasto’s current product line has moved toward the Standard Battery Pro 40, listed at about 40 kWh, 333–407 V, 297 kg, and 960 × 687 × 302 mm.   So if you are using older CV Standard Battery data, mark it:
LegacyCandidate / availability requires supplier confirmation
What this unlocks for HV wiring
It partially unlocks:
battery voltage range
candidate pack mass/dimensions
cooling requirement lane
CAN/J1939 lane
possible cable voltage rating
possible connector voltage rating
But it does not fully unlock:
cable gauge
main fuse exact rating
main contactor exact suitability
pre-charge resistor value
pre-charge relay
short-circuit protection
thermal derating
because you still need:
battery short-circuit current
actual allowed continuous/peak discharge current
inverter DC current
DC-link capacitance
controller pre-charge requirement
final system voltage architecture
The next question to ask
Do not ask for more general research yet. Ask this:
Run a Powertrain Compatibility Check.

Compare the candidate Webasto battery system with the Dana TM4 SUMO MD motor/inverter.

Do not select final components.
Do not mark Confirmed.

Check:
1. Does the battery continuous discharge current support the motor continuous power?
2. Does the battery peak discharge current support the motor peak power?
3. Is the system 400 V or 800 V?
4. Does the Webasto VIB limit system current?
5. How many packs are required for the Dana SUMO MD power target?
6. Is the battery candidate legacy/current production?
7. What values are missing from the datasheets?
8. What exact supplier questions must be asked?

Use formulas:
P = V × I
I = P / V

Output:
- compatibility table
- mismatch warnings
- missing data list
- supplier question list
- Build Engine blocker list
Supplier questions you need answered
Ask Webasto or battery supplier:
1. Is the CV Standard Battery System still available, or has it been replaced by Standard Battery Pro 40?
2. What is the exact continuous discharge current per pack?
3. What is the exact peak discharge current per pack and duration?
4. What is the maximum system discharge current through the VIB?
5. Can packs be configured for higher current output?
6. Is the system 400 V, 800 V, or both?
7. What is the battery short-circuit current or internal resistance?
8. What fuse/contactor/pre-charge architecture is recommended?
9. What is the CAN/J1939 protocol documentation?
10. What are coolant flow, pressure drop, and thermal derating curves?
Ask Dana/TM4:
1. What is the exact DC input voltage range for the selected SUMO MD inverter?
2. What is the continuous DC input current?
3. What is the peak DC input current and duration?
4. What is the DC-link capacitance?
5. What pre-charge resistor/relay/contactors are recommended?
6. What coolant flow rate and pressure drop are required?
7. What is the dry motor/inverter mass?
8. What CAN/J1939 messages are required?
9. What fault outputs must be monitored?
10. What battery current capability is recommended for 130 kW continuous / 250 kW peak operation?
Bottom line
This is a strong payload, but it discovered the most important thing:
Your HV wiring package cannot be finalized until the battery and inverter are proven compatible.
And right now, based on the numbers shown, the Webasto battery current limit may be too low for the Dana SUMO MD power target unless the system is configured differently.
So your next stage is:
Powertrain Compatibility Check
Not more cable research yet.
