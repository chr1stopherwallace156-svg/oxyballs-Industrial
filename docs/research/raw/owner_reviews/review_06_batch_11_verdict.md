[Owner framing before the payload — HV-wiring closure order + focused prompt:]

what I asked It tells you the HV wiring package cannot move forward until these are known:

battery nominal/max voltage
battery max discharge current
inverter continuous/peak current
selected HV cable part number
selected fuse part number
selected contactor part number
selected pre-charge resistor/relay
selected connector/MSD
actual physical cable routing path
bend radius from cable datasheet
fault-current calculation
grounding/bonding test method
IP rating/test method

It is forcing the system to stop guessing.
Close in this order 1. battery voltage/current data
2. inverter/motor current data
3. HV cable datasheet
4. fuse datasheet
5. contactor datasheet
6. pre-charge resistor/relay datasheet
7. MSD/service disconnect datasheet
8. HV connector datasheet
9. isolation monitor datasheet
10. bonding/grounding test source
11. physical cable routing path

We are closing only the HV Wiring Package gap for the Elektron Build Engine.

Do not create a broad EV conversion research map.

Research only primary or high-quality sources for:

1. HV cable selection
2. HV cable ampacity/current derating
3. HV cable bend radius
4. traction fuse sizing and interrupt rating
5. main contactor sizing
6. pre-charge resistor and relay sizing
7. manual service disconnect / HVIL sequencing
8. HV connector ratings and keying
9. isolation monitoring thresholds
10. bonding/grounding test methods
11. IP67/IP6K9K ingress protection testing
12. HV cable routing protection against heat, abrasion, vibration, and water

Prefer:
- SAE
- ISO
- UL
- NFPA
- NHTSA / FMVSS
- supplier datasheets
- OEM manuals
- national lab papers
- peer-reviewed papers

For every source, provide:
- exact title
- URL
- source type
- exact quote
- page/section/table
- what claim it supports
- Build Engine impact: Rule / Metric / Test / NoGoCondition / OpenGap / NominalAssumption
- verification status
- missing data still needed

Hard rules:
- Do not invent cable size.
- Do not invent fuse size.
- Do not invent contactor size.
- Do not use 500 Ω/V as universal.
- Do not enforce 6x–8x OD bend radius unless directly supported by selected cable datasheet or official standard.
- Supplier datasheets are NeedsEngineeringReview.
- Background articles are TechnicalBackground only.
- No claim is Confirmed.

The HV wiring gap is not closed until you have this table filled:

Battery max voltage: sourced
Battery continuous/peak current: sourced
Inverter continuous/peak current: sourced
HV cable part number: sourced
HV cable ampacity: sourced
HV cable bend radius: sourced
Fuse voltage/current/interrupt rating: sourced
Contactor voltage/current rating: sourced
Pre-charge design data: sourced
MSD/HVIL sequence: sourced
Isolation monitor threshold/reporting: sourced
Bonding/grounding test: sourced
Physical route path: measured
Engineer review: required

[Owner verdict delivered AFTER the batch-11 payload:]

How I responded  
This is your best HV wiring payload so far. You are finally moving from “research topic” into component-level gap closure.
My verdict:
HV Wiring Package status: partially closed
Build-ready status: not yet
Quality of research: strong
Biggest remaining blocker: selected battery/inverter data
Second-stage filter: absolutely needed
What got much stronger
You now have actual component candidates:
Coroflex HV cable
TE/Kilovac EV200 contactor
Eaton Bussmann EV auxiliary fuse
Sendyne isolation monitor
Chilye MSD / HVIL from prior payload
That is the right direction. This is how the Build Engine starts becoming real: not “HV cable in general,” but which cable, which contactor, which fuse, which monitor, what rating, what missing data.
Important corrections
1. Coroflex source is 
6.0 mm²
, not 35 mm² / 50 mm²
The Coroflex PDF you cited is for 9-2611 / 6.0 mm² FHLR2GCB2G cable. It does support the bend-radius claim: minimum 3× cable outer diameter for static installation and 6× cable outer diameter for dynamic installation. It also lists nominal voltage as max 600 V AC / 1000 V DC, operating temperature range -40°C to +180°C, and current-load/derating curves.  
So the rule should say:
For Coroflex 9-2611 / 6.0 mm² only:
static bend radius candidate = ≥ 3× cable OD
dynamic bend radius candidate = ≥ 6× cable OD
Do not apply that to 35 mm² or 50 mm² until you have those exact datasheets.
2. Eaton fuse is 
auxiliary
, not main traction fuse
This is a big one.
The Eaton Bussmann source is for EV auxiliary electrical systems, rated 500 Vdc, 10–50 A, with max DC interrupting rating 20 kA. That is useful for auxiliary HV circuits, but it is not enough for the main traction battery fuse unless your pack/current/fault analysis proves it fits that circuit.  
So change this:
Traction Subsystem Auxiliary Overcurrent Interruption Profile
To:
Auxiliary HV Fuse Candidate
And status:
Main traction fuse: still NeedsSupplierData / OpenGap
Auxiliary HV fuse: SupplierCandidate
3. EV200 contactor is useful, but not automatically enough
The EV200 datasheet supports 12–900 VDC rated operating voltage and 500 A typical continuous carry current at 85°C with 400 mcm conductors. It also lists 2000 A break current at 320 VDC for 1 cycle, contact resistance, dielectric withstand, insulation resistance, shock, vibration, and temperature range.  
That is a strong candidate, but it still needs:
battery max voltage
inverter continuous current
inverter peak current
fault current
contactor make/break duty
pre-charge sequence
coil voltage
aux contact requirement
thermal mounting condition
So status should stay:
SupplierCandidate / NeedsEngineeringReview
4. Sendyne isolation monitor is strong
This row is good. The Sendyne datasheet supports the 100 Ω/V hazard discussion for floating IT DC systems. It also shows CAN 2.0B communication at 500 or 250 kbit/s, optional 120 Ω termination, connector details, and says separate CAN protocol documentation is needed for host-controller interaction.  
But keep this as a component-specific metric candidate, not a universal legal threshold.
Correct status:
SupplierCandidate
MetricCandidate
NeedsEngineeringReview
NeedsCANProtocolDocument
What this payload tells you
You are getting close to a candidate HV wiring architecture, but not a build-ready HV system.
You now have candidate answers for:
HV cable bend-radius logic
HV cable voltage/temp envelope
contactor voltage/current envelope
auxiliary fuse voltage/current/interrupt envelope
isolation monitor hazard threshold
isolation monitor CAN interface
But you still do not have the most important upstream data:
battery voltage
battery current
battery short-circuit current
inverter current
main fuse sizing
pre-charge sizing
physical routing path
grounding/bonding test method
engineer signoff
How I would mark the table
Battery Max Voltage:
MISSING_SOURCE / NeedsSupplierData

Battery Continuous/Peak Current:
MISSING_SOURCE / NeedsSupplierData

Inverter Continuous/Peak Current:
MISSING_SOURCE / NeedsSupplierData

HV Cable Part Number:
Candidate only for Coroflex 9-2611 / 6.0 mm²

HV Cable Bend Radius:
Candidate rule only for exact cable datasheet

Fuse:
Auxiliary fuse candidate only; main traction fuse still OpenGap

Contactor:
EV200 SupplierCandidate / NeedsEngineeringReview

Pre-Charge:
Still OpenGap

MSD/HVIL:
SupplierCandidate / NeedsEngineeringReview

Isolation Monitor:
Sendyne SupplierCandidate / NeedsCANProtocolDocument

Bonding/Grounding:
OpenGap

Physical Route:
PhysicalVerificationRequired

Engineer Review:
Required before fabrication
What you should ask next
Do not move to cooling yet. Close the remaining HV wiring holes first.
Ask this:
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
Bottom line
This is real progress.
You have not closed HV wiring yet, but you have moved from:
HV wiring = vague research topic
to:
HV wiring = component candidates + exact missing parameters
That is exactly the right path.
