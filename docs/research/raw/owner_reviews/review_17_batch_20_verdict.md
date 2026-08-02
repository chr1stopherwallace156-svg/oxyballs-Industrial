[Owner framing before the payload — the modeling-frameworks prompt from review_16, restated as the ask ("20:75").]

[Owner verdict delivered AFTER the batch-20 payload:]

My respond 
 My verdict: this is the right research layer, but it needs stricter labels before the Build Engine accepts it.
This payload should be treated as:
Cooling Modeling Framework v0.1
Status: ModelingFrameworkCandidate
Not validated
Not locked
Not component-selection-ready
Supplier data still required
What is strong
You are building the math brain behind cooling. That is exactly what should happen while Webasto and Dana supplier answers are pending.
The strongest rows are:
Battery heat generation model
Radiator sizing / NTU-effectiveness method
Pump and pressure-drop model
Two-state core/surface battery thermal model
High-ambient derating framework
Mountain-grade test logic
Validation test procedure logic
The Bernardi equation row is useful because the battery heat report explicitly lays out battery heat generation as irreversible resistance heating plus reversible entropic heat, using terms for current, internal resistance, temperature, and open-circuit voltage temperature coefficient.  
The MathWorks source is useful because it shows a full EV battery cooling example using cold plates, radiator, and refrigeration/evaporator branches, then sizes heat exchangers with fundamental heat-transfer calculations and harness models.   It also directly demonstrates radiator sizing assumptions and cross-flow heat-exchanger effectiveness/NTU calculations.  
The Penn State / Applied Energy paper is also a strong modeling source because it uses a two-state thermal model with core and surface temperature states and reconstructs heat-generation rate from measurements.  
What I would downgrade
1. Do not say “validated academic baselines”
Change:
validated academic, mathematical, and laboratory baselines
to:
candidate academic, mathematical, and laboratory modeling references
Academic papers help the model, but they do not validate your specific Webasto/Dana/F-550 cooling design.
2. The “Exact Quote” fields are blank
This is a big database problem.
For every source row, the Build Engine should reject the row unless it contains:
exact quote
page/section/table
claim supported
status
missing supplier data
Right now, many rows list “Exact Quote:” but no quote. That should trigger:
NeedsExactQuote
Do not convert into SourceClaim yet
3. Reddit should not be a professional source
The Reddit serial-vs-parallel coolant loop row can stay as a LeadOnly / SanityCheck, but not a real engineering source.
Change:
Professional Engineering Forum Verification Check
to:
LeadOnly / InformalDiscussion / NotForRuleCreation
For serial vs. parallel cooling, you need a real thermal-fluid textbook, SAE paper, supplier cooling guide, or automotive thermal management source.
4. The electric-truck towing article is not enough for mountain-grade modeling
The towing-range article can be used as field-context background, but not as your main mountain-grade model. Your model should be based on vehicle tractive-power equations:
P = v × (rolling resistance + aero drag + grade force + acceleration force)
grade force = m × g × sin(theta)
Use the article as proof that towing/load hurts EV range, not as the engineering source for Class 4/5 Cajon Pass heat load.
5. “Thermal runaway containment” is too strong
The Penn State two-temperature paper is good for heat-generation estimation / fault-detection modeling, but not enough for battery thermal runaway containment design.
Change:
Thermal Failure Modes (Thermal Runaway Containment)
to:
Thermal anomaly detection / heat-generation estimation
Thermal runaway containment needs UL, SAE, NFPA, supplier pack safety docs, propagation test data, venting design, and enclosure testing.
Important roadmap corrections
Brake / steering gate
This line is wrong for your F-450/F-550 direction:
Calculate auxiliary vacuum pump loads
For Class 4/5 Super Duty, your critical path is more likely hydroboost / hydraulic brake assist / power steering assist, not a simple vacuum pump.
Change Gate 04 to:
Brake / Steering Assist Gate:
- Determine existing Ford brake assist and steering assist architecture.
- Identify what assist is lost when the engine-driven pump is removed.
- Evaluate electric-hydraulic pump, accumulator/reserve assist, fault warning, low-speed steering load, brake assist failure mode, and test plan.
CAN / PATS gate
This phrase is dangerous:
PATS software override bypass design
Do not use “bypass” language. That can sound like defeating an anti-theft system.
Change it to:
authorized Ford-compatible controls integration, gateway compatibility, immobilizer-safe architecture, cluster/CAN diagnostics, and serviceability review
Your Build Engine should never frame it as bypassing security.
Correct Build Engine labels
I would mark the thermal package like this:
Battery Bernardi model:
AcademicPrincipleCandidate / NeedsSupplierData

MathWorks cooling model:
ModelingFrameworkCandidate / NeedsHardwareInputs

Radiator NTU method:
ModelingFrameworkCandidate / NeedsRadiatorSupplierData

Darcy-Weisbach pressure drop:
EngineeringPrincipleCandidate / NeedsPhysicalRouting

Penn State two-state thermal model:
AcademicPrincipleCandidate / NeedsSensorAndPackData

Mountain-grade duty cycle:
ModelingFrameworkCandidate / NeedsBetterSource

Reddit coolant loop discussion:
LeadOnly / NotForRuleCreation

Thermal runaway containment:
OpenGap / NeedsStandardsAndSupplierSafetyData

TOP 2-2-607 cooling test:
CandidateTestSource / NeedsExactSource
The Darcy-Weisbach row is directionally correct: it is a standard analytical way to estimate pressure drop using friction factor, length, hydraulic diameter, density, and velocity, but the same source also notes that complex cooling plates and bends may require CFD rather than simple formulas alone.  
What this unlocks
This does not unlock pump/radiator/chiller selection yet.
It unlocks the ability to build these modules:
Battery heat-generation estimator
Cooling-loop flow calculator
Pressure-drop calculator
Radiator sizing estimator
Mountain-grade thermal stress simulator
Thermal derating risk model
Cooling validation test-plan generator
That is big progress.
What to ask next
Ask for the second-stage filter to clean this:
Process the Cooling Modeling Framework payload.

Do not mark anything Confirmed.
Do not select final pumps, radiators, chillers, or loop layouts.
Do not treat academic sources as supplier data.

Tasks:
1. Downgrade any row with no exact quote to NeedsExactQuote.
2. Downgrade Reddit to LeadOnly / NotForRuleCreation.
3. Downgrade towing-range article to FieldContext / NeedsEngineeringSource.
4. Reclassify thermal runaway row as ThermalAnomalyDetection unless standards or supplier propagation data are provided.
5. Correct Gate 04 from vacuum pump to electric-hydraulic brake/steering assist.
6. Correct Gate 05 from PATS bypass to authorized Ford-compatible controls integration.
7. Create modeling modules only, not final component rules.

Output:
- accepted modeling references
- downgraded references
- rejected references
- equations allowed for simulation
- supplier data still required
- OpenGap list
Bottom line
This is the right move. You are not waiting around doing nothing while suppliers reply. You are building the physics framework.
But the safe status is:
Cooling theory mapped.
Simulation framework allowed.
Final cooling design blocked.
Supplier heat maps and physical testing still required.
That is exactly where you should be.
