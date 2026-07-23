[Owner framing delivered BEFORE the batch-09 payload — gap-package checklists and gap-closure prompt template:]

I’m doing what I asked for and the respond 1. HV wiring package

You need exact sources for:

HV cable
fuses
contactors
pre-charge
HVIL
MSD/service disconnect
isolation monitoring
connector ratings
IP ratings
routing protection
bend radius
grounding/bonding

2. Cooling package

You need exact sources for:

battery cooling
motor cooling
inverter cooling
charger/DC-DC cooling
coolant pump sizing
radiator sizing
flow rate
pressure drop
thermal derating
high-ambient testing

3. Brake/steering CP#1

You need: Ford hydroboost pressure/flow requirements
electric-hydraulic pump candidates
low-voltage backup behavior
failure mode behavior
mounting/fitment measurements
test procedure

4. CAN/PATS CP#2

You need: Ford Super Duty CAN behavior
PCM delete behavior
PATS /cluster/gateway impact
UIM limitations
real CAN capture plan
expert diagnostics help

5. Supplier datasheets

You need actual PDFs for: 

battery pack
BMS
motor
inverter
charger
DC-DC
contactors
fuses
HV cable
MSD
coolant pump
radiator/heat exchanger
EHPS pump

6. Failure modes / test methods

You need sources for:

isolation fault
HV cable abrasion
water intrusion
pre-charge failure
contactor weld/failure
cooling failure
thermal derating
BMS fault
CAN fault
brake/steering assist failure
post-drive inspection

We are now in focused gap-closure mode for the Elektron Build Engine.

Do not create a broad research map.

Research only this gap:

[INSERT ONE GAP: HV wiring / cooling / hydroboost / CAN-PATS / supplier datasheets / failure tests]

For this gap, find only high-quality sources:
- OEM
- government/regulatory
- SAE/ISO/UL/NFPA
- supplier datasheets
- national lab
- peer-reviewed academic
- failure reports

For every source, provide:
- exact title
- URL
- source type
- exact quote
- page/section/table
- what claim it supports
- Build Engine impact
- verification status
- missing data still needed
- whether it creates Rule, Metric, Test, NoGoCondition, OpenGap, or NominalAssumption

Do not claim anything is Confirmed.
Do not claim anything was ingested.
Do not make broad summaries.
Reject weak sources.
Mark all unsupported claims NeedsExactSource.

What I would do first

I would not research CAN/PATS first because that can get deep and proprietary fast.

1. HV wiring package
2. MSD / contactors / fuses / pre-charge / HVIL
3. cooling package
4. EHPS brake/steering candidate
5. supplier datasheets
6. CAN/PATS

Why? Because wiring/cooling/supplier data is easier to source and gives you real build structure faster. CAN/PATS may require real vehicle logging or expert help.

[Owner verdict delivered AFTER the batch-09 payload:]

How I Responded 

Yes — this is the right kind of targeted gap-closure research.
This payload is much more useful than the broad maps because it is focused on one real build area:
HV wiring package: cable sizing, splices, MSD, HVIL, isolation monitoring, connector keying, and missing bend-radius/grounding/IP test data.
That is exactly how you should research from now on.
My verdict
Target focus: strong
Useful for Build Engine: yes
Ready for second-stage filter: yes
Ready for direct design rules: partly, but not fully
Main issue: Lectromec/SAE rows must stay NeedsExactSource
Best row: Chilye MSD
Most useful metric row: Sendyne isolation monitor
What this payload actually gives you
It gives you the beginning of a real HV wiring safety architecture:
HV cable sizing must consider load, duty cycle, fault conditions, connector fit, mechanical strength
splices in power cables should be avoided where possible
HV connectors near each other need unique keying / contact identification
MSD should open HVIL before HV terminal separation
MSD fuse/current/voltage/cable/IP/temp ranges can become supplier candidate metrics
isolation monitoring can track resistance to chassis and report fault status
ISO 6469-3 is the correct standard path for voltage class B shock protection
That is valuable.
Row-by-row thoughts
1. SAE J1673 / Lectromec
Useful, but not final.
Lectromec is a technical article discussing SAE J1673, not the SAE standard itself. It does support the research direction: J1673 covers HV wiring selection, cable sizing factors, splice considerations, connector keying, orange identification, routing/protection, splash areas, and overload protection.  
But the Build Engine should not treat it as the final standard.
Correct status:
TechnicalBackground
NeedsExactSource
Can create research tasks
Cannot create final HV wiring rule yet
So for Source Row 1 and Source Row 5, I would downgrade:
CandidateSource → TechnicalBackground / NeedsExactSource
2. Sendyne isolation monitor
This is a strong supplier datasheet row.
The Sendyne datasheet says the SIM100MLP continuously monitors isolation resistance between an IT power system and chassis, detects leakage/capacitive stored energy, communicates through isolated CAN 2.0B, and reports calculated isolation resistance in Ω/V. It also states that if either isolation resistance falls below 100 Ohms/Volt, a hazard can occur if a person contacts the opposite terminal.  
This can become a Metric candidate and Test candidate, but not a universal system rule yet.
Correct status:
SupplierCandidate
NeedsEngineeringReview
MetricCandidate: isolation warning/fault thresholds
TestCandidate: isolation monitor CAN/report validation
Important correction: the 100 Ω/V threshold is from this Sendyne datasheet’s safety discussion and references standards context. Do not use it as your final system threshold until it is cross-checked against FMVSS 305a / ISO 6469-3 / chosen component requirements.
3. Chilye MSD / HVIL
This is the best row.
The datasheet directly supports the two-stage lever claim: Chilye says the MSD opens the HVIL circuit before HV connector separation. It also provides usable candidate specs: two internal HVIL sets, M6 connection, fuse rated voltage 600–700 Vdc, fuse current up to 500 A depending on fuse, HV cable range 16–70 mm², HVIL cable 0.5 mm², IP67/IP6K9K, IP2XB, and operating temperature from -40°C to 125°C.  
This is exactly what you want in the Build Engine.
Correct status:
SupplierCandidate
NeedsSupplierData / NeedsEngineeringReview
Can create component-specific RuleCandidates and MetricCandidates
Candidate rules:
MSD must open HVIL before HV terminal separation.
MSD fuse rating must match pack voltage/current/fault analysis.
MSD cable range must match selected HV cable.
MSD environmental rating must match mounting location.
MSD must be physically accessible for service.
But again, these are candidate rules until component selected and engineer reviewed.
4. ISO 6469-3
Correct lane, but still not enough.
ISO 6469-3 is absolutely relevant for electric shock protection and voltage class B systems, but the public preview is not enough to extract final test thresholds.
Correct status:
CandidateSourcePath
NeedsExactSource
Cannot create exact isolation test threshold yet
What this tells you about your conversion
This is the first HV wiring payload that actually gives structure to the electrical safety part:
HV cable sizing logic
splice avoidance logic
HV connector keying logic
MSD/HVIL sequence
isolation monitoring
fuse range candidate
IP rating candidate
temperature range candidate
CAN isolation reporting candidate
That is real progress.
What is still missing for HV wiring
You still need these before build-ready wiring design:
selected battery voltage/current
selected motor/inverter current draw
selected HV cable datasheet
selected fuse datasheet
selected contactor datasheet
selected pre-charge resistor/relay datasheet
selected HV connector datasheet
chosen MSD part number
actual wire routing path on the truck
bend radius from supplier cable datasheet
thermal/current derating curve
fault-current calculation
grounding/bonding test method
IP test method for mounting location
engineer review
So the HV wiring research is no longer empty, but it is still not complete.
What to send to the second-stage filter
Process this HV Wiring Package payload as candidate research only.

Do not ingest into SQLite.
Do not mark Confirmed.
Do not change StageGates.

Promote:
1. Sendyne SIM100MLP as SupplierCandidate / MetricCandidate for isolation monitoring.
2. Chilye Mini MSD as SupplierCandidate / RuleCandidate / NoGoConditionCandidate for MSD + HVIL behavior.
3. ISO 6469-3 as CandidateSourcePath / NeedsExactSource for Class B shock protection and isolation monitor test specification.

Downgrade:
1. Lectromec SAE J1673 rows to TechnicalBackground / NeedsExactSource because Lectromec is not the official SAE standard.
2. Any bend-radius number to NeedsExactSource until supplier cable datasheets or official SAE/ISO text are provided.
3. Any universal safety claim to EngineeringReviewRequired.

Create candidate Build Engine items:
- RuleCandidate: HV power cable splices avoided where possible.
- RuleCandidate: adjacent HV connectors require unique keying or mis-mate prevention.
- RuleCandidate: MSD/HVIL must open interlock path before HV terminal separation.
- MetricCandidate: isolation monitoring threshold candidate, cross-check required.
- TestCandidate: isolation monitor reporting and CAN fault response.
- OpenGap: exact HV cable bend radius.
- OpenGap: grounding/bonding impedance threshold.
- OpenGap: IP67/IP6K9K test cycle.
- OpenGap: selected fuse/contactor/pre-charge ratings.

Reject:
- Any claim based only on a summary article if presented as final SAE text.
- Any claim saying the selected HV system is safe or compliant.
- Any universal rule not tied to a selected component, standard, or test.
Bottom line
This is good. This is exactly the stage you should be in:
One gap at a time. HV wiring is now partially mapped.
Do not jump to broad research again. Next you either:
finish HV wiring by getting fuse/contactor/pre-charge/HV cable datasheets
or move to:
cooling package gap closure
But this payload is progress. It is now giving you real pieces for the gas-to-EV conversion electrical architecture.
