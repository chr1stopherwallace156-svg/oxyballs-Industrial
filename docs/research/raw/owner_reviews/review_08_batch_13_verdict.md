[Owner framing before the payload — restated pre-charge/upstream needs lists and the narrow 6-item ask (verbatim in the chat message of 2026-07-15, "13:75"); the ask matches the one archived in review_07 and is not re-duplicated here beyond its header:]

question asked This is very useful because it gives your system a pre-charge no-go logic: If pre-charge is not complete, main contactor closing can weld contacts.

But still needs :; battery voltage
controller capacitance
inverter current
fault current
pre-charge resistor sizing
coil voltage selection
aux contact selection
thermal mounting condition

4. Fuse / contactor / cable are still not enough

This is the key point: you have candidate parts, but you still do not have the upstream numbers that decide if they are right.
You still need battery nominal voltage
battery maximum voltage
battery continuous discharge current
battery peak discharge current
battery short-circuit current
inverter continuous DC input current
inverter peak DC input current
motor/controller capacitance
cooling/ambient derating conditions
physical cable route length

One correction in the payload

This line is too strong:

Pre-Charge Resistor Sizing | Dynamic Cap Curves | TE EV200 Capacitive Make Test Curves

The EV200 curve helps define how much pre-charge is needed before closing the main contactor. It does not by itself size the pre-charge resistor.

To size pre-charge, you still need:

pack voltage
controller/inverter capacitance
target pre-charge time
allowed inrush current
resistor power/energy rating
relay/contactor voltage/current rating
thermal duty cycle

What I would mark as “closed” vs “still open”

Partially closed:
- 35 mm² HV cable candidate
- 35 mm² bend-radius candidate
- EV200 contactor candidate
- Eaton EV fuse family candidate
- bonding resistance candidate
- MSD/HVIL concept from Chilye prior payload
- isolation monitor candidate from Sendyne prior payload

Still open:
- battery voltage/current
- battery short-circuit current
- inverter current
- main fuse exact part/rating
- pre-charge resistor sizing
- pre-charge relay selection
- 50 mm² cable datasheet
- HV connector compatibility
- grounding/bonding test procedure
- IP67/IP6K9K exact test procedure
- actual physical cable routing on truck

We are still closing the HV Wiring Package.

Focus only on the remaining unresolved HV wiring items:

1. Pre-charge resistor sizing formulas and supplier datasheets
2. Pre-charge relay/contactor supplier datasheets
3. 50 mm² Coroflex or equivalent HV cable datasheet
4. HV connector datasheets compatible with 35 mm² and 50 mm² shielded cable
5. IP67/IP6K9K exact validation procedures for underbody HV components
6. Bonding/grounding test procedure and measurement method

Do not research broad EV conversion topics.
Do not repeat already-sourced EV200, Eaton EV fuse, Coroflex 35 mm², Sendyne, or Chilye rows unless comparing compatibility.

For every source, provide exact title, URL, exact quote, page/section/table, component rating, Build Engine impact, verification status, and missing data still needed.

[Owner verdict delivered AFTER the batch-13 payload:]

My response 

This is a major step forward. Your HV wiring package is now close to a real candidate architecture, but I would change the wording from:
Marked Closed
to:
Partially sourced / candidate identified
Because nothing is truly “closed” until the upstream battery, inverter, fault-current, routing, and engineer review are done.
My verdict
HV Wiring research quality: strong
Component candidate maturity: strong
Build-ready status: not yet
Main remaining blockers: battery/inverter data, pre-charge actual values, HV connectors, physical route, engineering review
What is strong
1. Pre-charge math is now real
The Miba source is useful. It gives the exact framework you need:
R = t / (5C)
Imax = U / R
E = 0.5 × C × U²
That is exactly what the Build Engine needs for a pre-charge calculation module. But you still need the inverter/controller DC-link capacitance C, max pack voltage U, desired pre-charge time t, allowed inrush current, and resistor pulse-energy rating before selecting a real resistor. Miba specifically says capacitor pre-charge needs C, U, and t, and that energy/pulse/derating must be checked in the datasheet.  
Correct status:
Pre-charge formula: CandidateRule
Specific resistor selection: OpenGap
2. TE Mini K pre-charge relay is useful, but voltage may be a problem
The TE Mini K row is useful as a pre-charge relay candidate, but don’t assume it works for your whole pack yet. TE lists this part as a 20 A DC high-voltage relay, 12 VDC coil, 400 VDC contact voltage rating, and 450 VDC max contact switching voltage, with -40°C to 85°C operating range.  
So if your final battery pack is above that voltage, this exact relay may not work.
Correct status:
Pre-charge relay: SupplierCandidate
Needs pack max voltage check
Needs pre-charge current check
Needs coil voltage architecture check
3. 50 mm² Coroflex cable is a real candidate now
This is strong. The 50 mm² Coroflex sheet supports:
50 mm² conductor
600 VAC / 1000 VDC max
static bend radius ≥ 3× cable OD
dynamic bend radius ≥ 6× cable OD
approx. 630 g/m
-40°C to +180°C operating temperature
The datasheet also includes continuous-current load curves by ambient temperature, which means this can become a real metric source once the curve values are extracted cleanly.  
Correct status:
50 mm² cable: SupplierCandidate
Bend radius: CandidateRule for this exact cable only
Ampacity: Needs curve extraction + engineering review
4. IP67 / IP6K9K research is useful, but not official enough
TONFUL is useful as a background explanation. It says IP69K involves high-temperature, high-pressure water jets around 80°C and 100 bar, while IP67 is static immersion up to 1 m for 30 minutes.  
But it is not the ISO 20653 standard itself.
Correct status:
TechnicalBackground
NeedsExactSource
Do not create final IP test rule yet
Use it to guide the test requirement, but final test parameters should come from ISO 20653 or a certified test lab procedure.
What I would correct
“Candidate selection locked” is too strong
Change this:
Candidate selection locked
To this:
Candidate selected for evaluation
You are not locked until the battery/inverter/fault-current data proves the component fits.
Sendyne 100 Ω/V should not be “absolute”
Change:
100 Ω/V absolute defect boundary
To:
100 Ω/V supplier-datasheet hazard boundary for this isolation-monitor context; final threshold must be mapped against FMVSS/ISO and system design.
Bonding / Metrel tester should be an instrument candidate, not a regulatory source
A tester spec helps show how you might measure, not what the legal threshold is. So classify it as:
InstrumentationCandidate / TestMethodCandidate
Not:
RegulatoryCandidate
What is still open
The HV wiring package still cannot be build-ready until these are filled:
battery nominal voltage
battery max voltage
battery continuous current
battery peak current
battery short-circuit current
inverter continuous DC current
inverter peak DC current
inverter/controller DC-link capacitance
final main fuse part number
final pre-charge resistor part number
final pre-charge relay part number
HV connector model for 35/50 mm² cable
physical cable route on the F-450/F-550
bonding/grounding exact test method
IP67/IP6K9K official procedure or lab process
engineer review
What the second-stage filter should say
Paste this:
Process this HV Wiring Package payload as candidate research only.

Do not ingest into SQLite.
Do not mark Confirmed.
Do not change StageGates.

Corrections:
1. Change “candidate selection locked” to “candidate selected for evaluation.”
2. TE Mini K relay must be checked against final pack voltage because the cited product page lists 400 VDC contact voltage and 450 VDC max switching voltage.
3. Miba pre-charge formulas can become CandidateRules, but specific resistor selection remains OpenGap until U, C, t, Imax, energy, pulse rating, and duty cycle are known.
4. Coroflex 50 mm² bend-radius rules apply only to that exact cable datasheet.
5. TONFUL IP67/IP69K article is TechnicalBackground only; official ISO 20653 or lab procedure is still NeedsExactSource.
6. Metrel tester is InstrumentationCandidate/TestMethodCandidate, not RegulatoryCandidate.
7. Sendyne 100 Ω/V is supplier-context data, not a universal final legal threshold.

Create:
- CandidateRule: pre-charge calculation requires U, C, t, Imax, and energy.
- OpenGap: final pre-charge resistor part number.
- OpenGap: final pre-charge relay suitability above pack voltage.
- OpenGap: HV connector model for 35/50 mm² cable.
- OpenGap: physical route path.
- OpenGap: official IP67/IP6K9K procedure.
- OpenGap: official bonding/grounding threshold and test procedure.
Bottom line
This is strong progress.
You are now close to saying:
The HV wiring package has candidate components and known blockers.
But not yet:
The HV wiring package is build-ready.
Next, either finish the last HV connector/pre-charge details, or move to the cooling package gap closure while keeping HV wiring in NeedsEngineeringReview.
