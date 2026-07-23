[Owner framing before the payload — a recap of the review_25 equation
corrections (W/F/R, CGh=(R×WB)/W, ΔR=(w×x)/WB, ΔF=w−ΔR, removed = negative
w; transverse CGt=[(RF−LF)×Tf/2+(RR−LR)×Tr/2]/W, right +/left −) and the
refined next-research order (Gate 08 → 05 deep dive → 06 deep dive → 09 →
10 → 11, best next = Gate 08 Failure Mode + Test Procedure) — "29:75".]

[Owner verdict delivered AFTER the batch-29 payload:]

My response

My verdict: this is a strong Gate 07C v0.4, but it needs a final cleanup before you move on to Gate 08.
Gate 07C status:
Axle moment calculator = strong
Four-corner method = strong
CG framework = useful
Vertical CG = still blocked
Dynamic regeneration failure = belongs in Gate 08
Final road-test clearance = not allowed yet
What is strong
The direction is right. You now have the core weight/CG system:
W = total vehicle weight
F = front axle load
R = rear axle load
CGh = longitudinal center of gravity
CGt = transverse center of gravity
CGv = vertical center of gravity
Ford's Body Builder Layout Book supports this general structure: it discusses GVWR/GAWR limits, front/rear axle weight calculations, horizontal CG, transverse CG from four-corner weights and track widths, and the need to keep axle loads inside GAWR limits.
Your roadmap is also good:
Gate 07C → Gate 08 → Gate 05 → Gate 06 → Gate 09 → Gate 10 → Gate 11
That is a functional order.
Main corrections
1. The equations still need to be shown explicitly
The payload says "defined by," but the formulas are missing visually. Put them in plain form so the Build Engine can encode them.
W = LF + RF + LR + RR

F = LF + RF

R = LR + RR

CGh = (R × WB) / W

ΔR = (w × x) / WB

ΔF = w - ΔR
For transverse CG:
CGt = [((RF - LF) × Tf / 2) + ((RR - LR) × Tr / 2)] / W
Where right side is positive and left side is negative.
2. Do not call track width "supplier-only"
This ledger row is okay:
Exact track widths for F-450/F-550 DRW chassis cab
But it should not be only NeedsSupplierData. Track width can come from:
official Ford BBLB / BBAS
physical measurement
door/VIN-specific configuration
So mark it:
NeedsOfficialFordSource OR PhysicalMeasurement
Not just:
NeedsSupplierData
Ford Pro's upfitter publications portal is the right official path for Body Builder Layout Books and upfitter resources.
3. Move the regen / ABS / ESC fault item to Gate 08
This ledger row:
Specialized dynamic fault-injection protocols for integrated Class 4/5 electric drive regenerative braking handshakes
is important, but it is not really Gate 07C. It belongs in:
Gate 08 — Failure Modes + Test Procedures
Gate 07C should stay focused on weight, axle load, CG, tire/wheel loading, and physical scale proof.
4. Rename "Final_Safety_Compliance_Status"
Do not let the Build Engine say "compliance" here.
Change:
Final_Safety_Compliance_Status
to:
Weight_CG_Gate_Status
And change:
OPERATIONAL_ALPHA
to:
NOMINAL_CALCULATION_PASS / PHYSICAL_VERIFICATION_REQUIRED
Because this calculator does not prove safety or compliance.
5. Replace the simple CGv block logic
This is too simple:
IF CG_v > Max_Allowable_Height → BLOCK
Better:
IF official IVM / Ford CGv equations are available:
    calculate allowed CGv range based on CGh and WB
    block if CGv is outside the allowed range

IF no official CGv equation is available:
    status = NEEDS_ENGINEERING_REVIEW / PHYSICAL_TEST_REQUIRED
FMVSS 105 is the correct braking-performance lane for hydraulic/electric brake systems, but the CG/weight result still needs mapping to the exact vehicle category and test condition.
Correct Gate 07C status
Use this:
Gate 07C — Axle Moment / CG Calculator v0.4

Known:
- Gas and diesel donor branches are separated.
- Four-corner scale data is preferred.
- Door-label GVWR / GAWR controls the donor truck.
- Axle moment equations are ready for simulation.
- Transverse CG can be calculated from four-corner weights and track widths.
- FMVSS 105 500-lb lightly-loaded allowance is a brake-test input, not a universal payload assumption.

Still blocked:
- actual donor VIN / door label
- actual wheelbase and track measurements
- baseline four-corner weights
- post-teardown weights
- final EV four-corner weights
- vertical CG physical test
- official IVM/Ford CGv limits or engineering review
Clean pass/block logic
BLOCK if:
- W > GVWR
- F > Front GAWR
- R > Rear GAWR
- any tire/wheel load > rating
- donor door-label data missing before final evaluation
- final scale ticket missing before road test
- CGv required but not measured
- official CGv limit exists and final CGv is outside range

WARNING if:
- side-to-side imbalance exceeds 5%
- four-corner data is missing and only axle data exists
- battery/enclosure CG is still NominalAssumption
- diesel/gas branch does not match donor vehicle

SIMULATION ONLY if:
- using estimated component weights
- using generic track widths
- using estimated CGv
Bottom line
This is good enough to park Gate 07C as:
CALCULATOR_FRAMEWORK_READY
PHYSICAL_DATA_REQUIRED
NO ROAD_TEST_CLEARANCE
Now move to:
Gate 08 — Failure Modes + Test Procedures
That is the right next gate because you already have HV, powertrain, cooling, brake/steering, and weight/CG all mapped with blockers. Gate 08 ties them together by asking: what can fail, how do we detect it, how do we test it, and what blocks the build?
