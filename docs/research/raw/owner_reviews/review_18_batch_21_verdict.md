[Owner framing before the payload — Gate 04 correction restated + the Gate 04 closure prompt ("21:75").]

[Owner verdict delivered AFTER the batch-21 payload:]

My response 
My verdict: this is the right Gate 04 direction, but the source quality is not strong enough yet to close brake/steering.
You correctly identified the big truth:
Vacuum pump path = wrong lane for factory hydroboost.
EHPS / hydraulic assist replacement = correct lane.
But the current payload leans too much on generic hydroboost / aftermarket / forum-style conversion sources. That is okay for background, but not enough for Ford F-450/F-550 rules.
What is strong
The structure is very good:
hydroboost dependency
power steering pump dependency
combined brake + steering hydraulic demand
EHPS candidate path
accumulator / reserve-assist concern
12V DC-DC load impact
failure-mode behavior
validation test need
That is exactly the right Gate 04 architecture.
The biggest win is this rule:
Do not size steering assist alone.
The pump must support simultaneous brake assist + steering assist.
That should become a NoGoConditionCandidate.
What needs correction
1. The main source is not Ford-specific
The hydroboost instructions are useful, but they are not official Ford F-450/F-550 engineering data. They can support general hydroboost logic, like minimum pump flow/pressure requirements in a hydroboost-style system, but they cannot prove the exact Super Duty requirement. A similar published HydraStop instruction says the pump should flow at least 2.8 GPM and make at least 1200 psi, but that still does not make it a Ford F-550 value.  
So mark those rows:
EngineeringBackground
NeedsFordExactSource
NotForFinalRule
Not:
Verified baseline
2. Hydrosteer and Hang Tight should be downgraded
Hydrosteer is useful as a steering-flow concept source, but not a Ford-specific design source.
Hang Tight / Dodge EHPS is useful as a conversion idea, but it is not proof that a Mopar/TRW pump can support a loaded F-550 hydroboost + steering system.
Mark them:
LeadOnly / SupplierCandidatePath / NeedsDatasheet
Do not create final rules from them.
3. TOP 2-2-607 is not a brake/steering standard
TOP 2-2-607 is useful for vehicle cooling / mountain-road thermal validation context, but it is not a brake or steering compliance source. Keep it as:
TestContextBackground
NotBrakeComplianceSource
For brake performance, the correct primary lane is FMVSS 105 for hydraulic/electric brake systems. The regulation states it covers hydraulic and electric service brake systems and parking brake systems, with the purpose of ensuring braking performance under normal and emergency conditions.  
4. Fix the PATS language immediately
This line is a problem:
digital bypass frameworks for the Ford Passive Anti-Theft System
Replace it with:
authorized Ford-compatible controls integration, immobilizer-safe architecture, serviceability review, and diagnostic compatibility.
Your Build Engine should never frame the goal as bypassing anti-theft.
Correct Gate 04 status
Use this status:
Gate 04 — Brake / Steering Assist:
Architecture mapped.
Vacuum-pump path rejected as wrong assist type.
EHPS path identified.
Final pump sizing halted.
Ford-specific pressure/flow/accumulator data required.
Candidate EHPS datasheets required.
FMVSS brake test mapping required.
What is still missing
You still need these exact values:
Ford F-450/F-550 factory pump pressure
Ford F-450/F-550 factory pump flow rate
stock hydroboost operating pressure
steering gear pressure/flow requirement
relief valve pressure
return-line/reservoir requirements
hydroboost accumulator reserve capacity
manual steering torque without assist
candidate EHPS pressure-flow curve
candidate EHPS current draw
EHPS duty cycle and thermal derating
required DC-DC converter output
FMVSS 105 brake test mapping
loaded low-speed steering test procedure
What to ask next
The next research should be Ford-specific and supplier-specific, not more general hydroboost research.
Use this prompt:
We are still closing Gate 04: Brake / Steering Assist.

Do not research generic hydroboost conversions unless they point to OEM or supplier data.

Find Ford-specific or supplier-specific sources for:

1. Ford F-450/F-550 hydroboost brake assist architecture
2. Ford F-450/F-550 power steering pump flow rate
3. Ford F-450/F-550 power steering pump pressure / relief pressure
4. steering gear pressure and flow requirements
5. hydroboost accumulator reserve capacity
6. brake assist behavior when hydraulic pressure is lost
7. steering effort when hydraulic assist is lost
8. electric-hydraulic pump candidates for medium-duty hydroboost + steering
9. EHPS pressure-flow-current curves
10. EHPS thermal derating and duty cycle
11. required 12V or 24V DC-DC converter sizing
12. FMVSS 105 brake performance tests for modified hydraulic/electric brake systems

For every source, provide:
- exact title
- URL
- source type
- exact quote
- page/section/table
- whether it is Ford-specific, supplier-specific, or generic background
- pressure rating
- flow rating
- current draw, if EHPS
- duty cycle
- what claim it supports
- Build Engine impact
- verification status
- missing data still needed

Hard rules:
- Generic hydroboost articles are EngineeringBackground only.
- Dodge/Mopar EHPS examples are LeadOnly unless a datasheet proves pressure, flow, current, and duty cycle.
- Do not mark anything Confirmed.
- Do not claim FMVSS compliance.
- Do not use PATS bypass language.
Second-stage filter instruction
Process Gate 04 Brake / Steering Assist payload.

Corrections:
1. Downgrade generic hydroboost sources to EngineeringBackground / NeedsFordExactSource.
2. Downgrade Hydrosteer to ModelingFramework / NeedsFordExactSource.
3. Downgrade Hang Tight / Dodge EHPS to LeadOnly / NeedsSupplierDatasheet.
4. Reclassify TOP 2-2-607 as TestContextBackground, not brake compliance.
5. Add FMVSS 105 as the primary brake regulation lane.
6. Replace all PATS bypass language with authorized Ford-compatible controls integration.
7. Create OpenGaps for Ford pump pressure, Ford pump flow, hydroboost accumulator capacity, steering gear requirements, EHPS pressure-flow-current curves, DC-DC load, and FMVSS 105 test mapping.

Do not ingest.
Do not mark Confirmed.
Do not change StageGates.
Bottom line
This is a good Gate 04 architecture, but not a closed gate.
The next clean status is:
Brake / Steering Gate v0.1:
hydraulic dependency identified,
vacuum-pump path rejected,
EHPS path opened,
Ford-specific data still missing.
Now the goal is not "prove hydroboost exists." The goal is:
Get the exact Ford hydraulic requirements and candidate EHPS pressure-flow-current curves.
