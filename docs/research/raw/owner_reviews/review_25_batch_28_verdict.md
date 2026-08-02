[Owner framing before the payload — a restatement of the review_24
corrections (separate diesel vs gas → 001A/001B; "three-pad" → certified
axle scale or four-corner LF/RF/LR/RR; add left/right + transverse CG +
side-to-side warning; add payload/passenger operating states incl. the
500 lb FMVSS-105 allowance) followed by the Gate 07C prompt (build the
Axle Moment Calculator + CG Calculation Method: front/rear axle-moment
equations, four-corner method, longitudinal + transverse + vertical CG,
tilt-table/lift CG-height method, removed/added mass modeling,
GVWR/GAWR/tire/wheel overload flags, CG→FMVSS-105/stability link; output
allowed equations, required/blocked input fields, nominal assumptions,
physical-verification steps, Build-Engine pass/block logic) — "28:75".]

[Owner verdict delivered AFTER the batch-28 payload:]

My response

My verdict: Gate 07C is strong, but do not let this become "pass/fail" yet. This is a good calculator architecture, not a verified CG system.
Gate 07C status:
Axle moment logic = correct
Four-corner tracking = correct
CG framework = good
Vertical CG method = needs official test procedure
FMVSS 105 link = real, but needs IVM-specific equations
Final status = calculation-ready, not road-test-ready
What is strongest
The best part is that you split the donor truck correctly:
Platform 001A = 7.3L gas donor
Platform 001B = 6.7L diesel donor
That matters because diesel removed mass, DEF, DPF/SCR, front axle loading, and cooling package are totally different from the 7.3L gas path.
The second strong part is requiring four-corner scale data: LF, RF, LR, RR. Ford's General BBLB defines front axle weight as LF + RF, rear axle weight as LR + RR, track widths, wheelbase, and CG definitions. It also says Ford BBLB/BBAS data can provide base curb weights, GAWRs, chassis CG, passenger CG, wheelbase, ride heights, and track width.
Main corrections
1. The equations need to be explicitly filled in
Your equation section is directionally right, but the actual formulas are missing in the payload. Add these:
Total weight:
W = LF + RF + LR + RR

Front axle:
F = LF + RF

Rear axle:
R = LR + RR

Longitudinal CG from front axle:
CGh = (R × WB) / W

Rear axle load from a component:
ΔR = (w × x) / WB

Front axle load from a component:
ΔF = w - ΔR

For removed mass:
use negative w
For transverse CG, use a clear sign convention:
Let right side be positive and left side be negative.

CGt =
[(RF - LF) × Tf/2 + (RR - LR) × Tr/2] / W
Ford's BBLB says transverse CG can be determined from the four corner weights and front/rear track widths, and for DRW vehicles rear track is measured to the center of the wheel pair.
2. Vertical CG should stay blocked
Do not hard-code the rear-lift formula yet.
Ford's General BBLB says vertical CG calculations are more complex because of suspension compliance, and for accurate vertical CG measurement Ford points to a physical CG-height test procedure in the Transit BEMM / BBAS materials. It also says physical CG measurement should be done by a certified test facility or at least a trained/qualified technician.
So this line:
rear axle must be raised a minimum of 10 inches
should be:
rear-axle lift height and method must follow an approved CG-height test procedure; 10 inches may be a candidate test setup, not a final rule.
3. Do not use one generic "Factory_Maximum_Allowable_Height_Threshold"
This is a big one.
Your logic says:
IF CG_v > Factory_Maximum_Allowable_Height_Threshold → BLOCK
That is too simple.
Ford says some IVM statements of conformity provide FMVSS 105-related Max and Min CGv equations as a function of horizontal CG location and wheelbase, and the calculated CGv must be between those results for all loading conditions. Those values are compliance checks, not general vehicle CG targets.
Replace it with:
IF IVM_CGv_MinMax_Equations_Available:
    calculate Min_CGv(CGh, WB)
    calculate Max_CGv(CGh, WB)
    IF CGv < Min_CGv OR CGv > Max_CGv → BLOCK / ENGINEERING REVIEW

ELSE:
    STATUS = NEEDS_IVM_OR_ENGINEERING_REVIEW
4. Change "Final Safety Compliance Status"
Do not let the Build Engine claim compliance.
Change:
Final_Safety_Compliance_Status
to:
Weight_CG_Gate_Status
And change:
OPERATIONAL_ALPHA
to:
NOMINAL_CALCULATION_PASS / PHYSICAL_VERIFICATION_REQUIRED
That keeps the language honest.
FMVSS 105 connection is real
FMVSS 105 applies to trucks and buses over 3,500 kg GVWR with hydraulic or electric brake systems, and its purpose is braking performance under normal and emergency conditions. It also defines "lightly loaded vehicle weight" as unloaded vehicle weight plus 500 lb for vehicles over 10,000 lb GVWR, including driver and instrumentation.
So your 500 lb passenger/instrumentation assumption is valid as a FMVSS 105 test-reference input, not as a universal fleet payload assumption.
Correct label:
FMVSS_105_LIGHTLY_LOADED_ALLOWANCE:
500 lb for >10,000 lb GVWR vehicles
RegulatoryTestInput / NeedsVehicleCategoryMapping
Correct Build Engine pass/block logic
Use this instead:
Gate 07C — Weight / Axle Load / CG

BLOCK if:
- total weight > GVWR
- front axle weight > Front GAWR
- rear axle weight > Rear GAWR
- any tire/wheel load > rating
- door-label data missing
- final scale ticket missing before road test
- IVM CGv equations required but missing
- CGv outside IVM allowed range, if equations exist

WARNING if:
- side-to-side imbalance > 5%
- front steering axle percentage drops below engineering target
- battery mass location is still NominalAssumption
- four-corner data unavailable and only axle data exists

ALLOW SIMULATION ONLY if:
- all values are estimates
- no scale ticket exists
- vertical CG is approximated
Corrected Gate 07C status
Gate 07C — Axle Moment / CG Calculator v0.3

Known:
- Four-corner scale data is preferred.
- Axle scale data is minimum required.
- Door-label GVWR / GAWR governs the donor truck.
- FMVSS 105 500 lb lightly loaded allowance is valid for >10,000 lb GVWR test context.
- Longitudinal and transverse CG equations are allowed for simulation.
- Vertical CG requires Ford BEMM / BBAS method or qualified physical test.

Still blocked:
- actual donor door label
- actual wheelbase / track measurements
- baseline four-corner scale ticket
- final four-corner scale ticket
- official IVM CGv limits/equations
- vertical CG physical test
- final battery enclosure CG coordinates
Bottom line
This is a very good Gate 07C calculator framework.
The only thing I would not allow yet is a final "pass." The correct outcome is:
Axle moment calculator: ready for simulation
CG pass/fail logic: partially mapped
Vertical CG: blocked pending official method or physical test
Road-test clearance: blocked pending scale tickets + IVM CG review
Next research after this should be Gate 08 — Failure Modes + Test Procedures, because you now have HV, powertrain, cooling, brake/steering, and weight gates all structured with blockers.
