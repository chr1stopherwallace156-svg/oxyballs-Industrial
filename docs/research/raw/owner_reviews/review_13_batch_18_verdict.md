[Owner framing before the payload — corrected compatibility conclusion + the combined supplier question from review_12, restated as the ask ("18:75").]

[Owner verdict delivered AFTER the batch-18 payload:]

My response 

My verdict: this is very strong and almost supplier-ready, but I would soften a few phrases before sending so Webasto does not feel like you are asking them to “approve your whole conversion.” You want them to answer their product limits, not take responsibility for the entire vehicle.
The core logic is right. Webasto’s current public specs show Standard Battery Pro 40 can be configured at 400 V or 800 V, up to 720 kWh with up to 18 packs, with each pack around 40 kWh, 333–407 V, 55 kW continuous discharge, 112 kW peak discharge, 297 kg, and 10 L/min coolant flow.   Webasto also lists VIB at 380 A continuous discharge and 580 A peak discharge, while VIG is listed at 1,215 A continuous discharge and 1,400 A peak discharge, with up to 18 packs and “no HV limitation.”   Dana’s public SUMO MD page also supports your use case because it says SUMO MD is for Class 4–7 commercial vehicles and lists peak power up to 265 kW.  
What is excellent
Your questions hit the exact blockers:
VIB vs VIG/VIG Plus
400V vs 800V
2s2p pack topology
continuous discharge current
peak discharge current
short-circuit current
pre-charge responsibility
J1939 / CAN data
cooling flow and pressure drop
That is exactly what you need to unlock HV wiring calculations.
What I would change before sending
Change this:
selected traction drive is Dana TM4 SUMO MD
To:
candidate traction drive under evaluation is Dana TM4 SUMO MD
Change this:
does Webasto engineering approve a 2s2p 800V configuration
To:
does Webasto have an application-approved configuration or integration guideline for a 2s2p 800V arrangement
Change this:
VIG/VIG Plus eliminates hardware throttling downstream
To:
VIG/VIG Plus may reduce the VIB current bottleneck, pending Webasto-approved pack topology and current limits
Because VIG still has limits. It is much stronger than VIB, but it does not mean “unlimited system.”
Also, for CAN/J1939, do not ask only for “register addresses.” Ask for:
J1939 DBC file, CAN integration guide, PGN/SPN list, or NDA process for access
That sounds more professional.
Cleaner supplier-ready version
Subject: Technical Application Inquiry — Standard Battery Pro 40 Configuration for Dana TM4 SUMO MD Candidate Integration

Hello Webasto Commercial Vehicle Battery Systems Team,

My company is evaluating the Webasto Standard Battery Pro 40 system for a Class 4/5 commercial vehicle electrification prototype planning process.

The candidate traction drive under review is the Dana TM4 SUMO MD system. The target traction profile is approximately:

- 130 kW continuous traction power
- 250–265 kW transient peak traction power
- Minimum energy target: 120 kWh or higher
- Candidate system architecture: 400 V or 800 V
- Candidate preliminary topology under review: 2s2p / four Standard Battery Pro 40 modules

We are not requesting certification approval or final vehicle sign-off at this stage. We are requesting application engineering guidance and official technical documentation so our engineering team can determine whether this battery architecture is suitable for further review.

Could you please advise on the following:

1. For this load profile, should the Standard Battery Pro 40 system be integrated through the Vehicle Interface Box, Vehicle Interface Gateway, or Vehicle Interface Gateway Plus?

2. Does Webasto have an application-approved configuration or integration guideline for a 2s2p / 800 V arrangement using four Standard Battery Pro 40 modules?

3. What is the certified system-level continuous discharge current for the recommended interface and pack topology, especially in high-ambient chassis conditions around 50°C?

4. What is the certified system-level peak discharge current and allowed duration for the recommended configuration?

5. Can Webasto provide the pack internal resistance, worst-case bolted short-circuit current, or fuse coordination data needed for downstream main traction fuse selection?

6. Does the recommended Webasto interface provide integrated pre-charge control for an external traction inverter, or must pre-charge be managed externally inside the vehicle-side PDU?

7. Can Webasto provide the J1939 integration guide, DBC file, PGN/SPN list, or NDA process for CAN communication documentation?

8. Can Webasto confirm whether the 10 L/min coolant flow and pressure drop values are per pack, and how those requirements should be handled across a 2s2p multi-pack cooling manifold?

9. Are there any Webasto application notes, integration manuals, mounting guidelines, HV cable recommendations, fuse/contactor recommendations, or thermal derating curves available for this configuration?

Thank you. We are trying to determine whether this architecture is appropriate for a formal engineering review before any fabrication or vehicle integration work begins.
Build Engine status from this
I would mark this supplier inquiry as:
SupplierQuestionSet: READY_TO_SEND
PowertrainCompatibility: BLOCKED_PENDING_SUPPLIER_REPLY
HVWiringCalculations: HALTED
PackTopology: Candidate 2s2p / 800V
InterfaceChoice: OpenGap — VIB vs VIG/VIG Plus
PreChargeResponsibility: OpenGap
Isc/FuseCoordination: OpenGap
CANIntegration: OpenGap
CoolingManifold: OpenGap
Bottom line
Send it after softening the language.
This is the right move because you are no longer guessing. You are forcing the manufacturer to answer the exact fields that unlock:
fuse sizing
contactor selection
pre-charge design
cable gauge
connector rating
cooling layout
CAN integration
That is how the Build Engine should close this gate.
