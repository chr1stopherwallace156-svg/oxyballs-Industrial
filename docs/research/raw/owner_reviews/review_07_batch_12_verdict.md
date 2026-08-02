[Owner framing before the payload — remaining upstream data + the 8-item follow-up ask with hard rules:]

Question asked 

Still do not have the most important upstream data:

battery voltage
battery current
battery short-circuit current
inverter current
main fuse sizing
pre-charge sizing
physical routing path
grounding/bonding test method
engineer signoff

We are still closing the HV Wiring Package.

Find primary supplier datasheets and engineering sources for:

1. main traction battery fuse sizing
2. high-voltage contactor make/break duty
3. pre-charge resistor sizing
4. pre-charge relay/contactor selection
5. HV cable datasheets for 35 mm² and 50 mm² cable
6. HV connector datasheets compatible with those cable sizes
7. bonding/grounding test methods for EV HV enclosures
8. IP67/IP6K9K validation procedures for underbody HV components

Do not use auxiliary fuse data as main traction fuse data.
Do not apply 6.0 mm² cable bend radius to 35 mm² or 50 mm² cable unless the exact datasheet supports it.
For every source, provide exact title, URL, quote, page/section/table, component rating, Build Engine impact, and verification status.

[Owner verdict delivered AFTER the batch-12 payload:]

My reason thoughts 

This is the best HV wiring package so far. You are now doing the right kind of research: not “EV wiring in general,” but actual component candidates, exact ratings, exact missing data, and what still blocks the build.
My verdict:
HV Wiring Package: partially closed
Component-level sourcing: started strong
Build-ready wiring design: not yet
Main blocker: battery/inverter/pre-charge/fault-current data
Second-stage filter: required before anything enters Build Engine
What got stronger
You now have usable candidate sources for:
main EV fuse family
main contactor
35 mm² HV cable
bend radius from exact cable datasheet
isolation monitoring
bonding resistance target
MSD/HVIL from prior payload
That is real progress. This is no longer vague research.
Row-by-row thoughts
1. Eaton Bussmann EV fuse
This is a real main-fuse candidate lane, not the auxiliary fuse mistake from before. Eaton’s EV fuse portfolio covers 500–1,000 Vdc and a wide current range, and Eaton describes the product line as applicable to passenger cars, commercial vehicles, and high-capacity battery systems.  
Correct status:
SupplierCandidate
NeedsEngineeringReview
Needs battery max voltage
Needs battery short-circuit current
Needs continuous/peak current
Needs thermal derating review
Do not pick the exact fuse size yet. Fuse sizing waits for battery/inverter/fault-current data.
2. TE/Kilovac EV200 contactor
This is a strong contactor candidate. The datasheet supports 12–900 Vdc rated operating voltage, 500 A typical continuous carry at 85°C with 400 mcm conductors, 2,000 A break current at 320 Vdc for one cycle, and notes the maximum make current is 650 A to avoid contact welding.  
This is very useful because it gives your system a pre-charge no-go logic:
If pre-charge is not complete, main contactor closing can weld contacts.
But it still needs:
battery voltage
controller capacitance
inverter current
fault current
pre-charge resistor sizing
coil voltage selection
aux contact selection
thermal mounting condition
3. Coroflex 35 mm² HV cable
This is the cleanest cable row so far. The Coroflex 35 mm² sheet supports the actual cable cross-section, 600 V AC / 1000 V DC nominal voltage, orange shielded construction, 14.4 mm outer diameter, and max conductor resistance.  
It also supports the bend-radius rule for this exact 35 mm² cable: minimum 3× cable diameter for static installation and 6× cable diameter for dynamic installation. It lists the cable weight around 485 g/m and operating temperature from -40°C to +180°C.  
This can become:
RuleCandidate: static bend ≥ 3× OD
RuleCandidate: dynamic bend ≥ 6× OD
MetricCandidate: OD = 14.4 mm
MetricCandidate: nominal voltage = 600 VAC / 1000 VDC
But only for that exact 35 mm² Coroflex cable.
4. Fuse / contactor / cable are still not enough
This is the key point: you have candidate parts, but you still do not have the upstream numbers that decide if they are right.
You still need:
battery nominal voltage
battery maximum voltage
battery continuous discharge current
battery peak discharge current
battery short-circuit current
inverter continuous DC input current
inverter peak DC input current
motor/controller capacitance
cooling/ambient derating conditions
physical cable route length
Without those, the system can only say “candidate,” not “selected.”
5. Bonding / 0.1 Ω row
This is useful but should remain RegulatoryCandidate / NeedsEngineeringReview.
UNECE GTR No. 20 includes the 0.1 Ω upper resistance-limit rationale for chassis bonding, tied to electric-shock protection and shunting harmful currents to the chassis if isolation is lost.  
For Build Engine, this becomes:
TestCandidate: bonding resistance test
MetricCandidate: ≤ 0.1 Ω candidate threshold
Review required: engineering/regulatory
Do not call it “final pass/fail” until mapped against the exact U.S. FMVSS/ISO context and your measurement method.
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
So status should stay:
Pre-charge resistor sizing: OpenGap
Pre-charge completion target: CandidateRule from EV200 datasheet
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
What to ask next
You are very close to finishing the research side of the HV wiring package. The next prompt should be narrow:
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
Bottom line
This is real progress.
Your HV wiring package has moved from:
open research topic
to:
candidate component architecture with exact remaining blockers
You are not build-ready yet, but you are finally collecting the kind of source data that can become real Build Engine rules, metrics, and tests after filtering.
