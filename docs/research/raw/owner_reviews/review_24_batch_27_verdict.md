[Owner framing before the payload — the "Do Gate 07B next" instruction +
the Gate 07B prompt (Removed / Added Mass Ledger: removed engine/trans/
fuel/exhaust/cooling/DEF categories; added battery/motor/inverter/
enclosure/cooling/HV/LV categories; measurement method per item; whether
supplier datasheet / physical scale / estimate is allowed; how each mass
links to front/rear axle moment; capture before teardown / after teardown
/ after final build) with the hard rules (physical scale overrides
estimates; estimates NominalAssumption only; final validation requires
certified front-axle, rear-axle, and total scale tickets) — "27:27".]

[Owner verdict delivered AFTER the batch-27 payload:]

My response

My verdict: this is a strong Gate 07B payload. You are doing the right thing: moving from "estimated truck weight" to a real mass ledger + scale-ticket workflow.
The core rule is perfect:
Door label + certified scale tickets override generic specs.
Estimates are NominalAssumption only.
Final vehicle must stay under GVWR, front GAWR, rear GAWR, tire rating, and wheel rating.
Ford's General BBLB backs this direction because it treats vehicle weight and center of gravity as key to regulatory requirements, GAWR/GVWR limits, steering feel, stability, and handling. It also says Ford BBAS documents provide curb weights, front/rear weights, GAWRs, chassis CG data, wheelbase, ride height, and track width, but the actual vehicle still needs its own validation.
What is strong
Your three-phase scale process is exactly right:
1. Baseline scale before teardown
2. Stripped scale after ICE removal
3. Final scale after EV build
That gives the Build Engine real before/after evidence.
Your Removed / Added Mass Ledger is also strong because every part gets:
component name
measurement method
data class
axle moment relationship
verification status
That is how you keep the system from lying to itself.
Corrections needed
1. Again: separate diesel vs gas
Your ledger is built around:
6.7L Power Stroke diesel + DEF + SCR/DPF
That is fine only if the donor truck is diesel.
But your original Platform 001 was leaning toward:
F-450/F-550 7.3L gas chassis cab
So the Build Engine needs two branches:
Platform 001A: 7.3L gas donor
- no DEF
- no DPF/SCR
- different engine weight
- different exhaust/cooling/fuel system

Platform 001B: 6.7L diesel donor
- DEF system
- DPF/SCR
- heavier engine package
- different front axle baseline
Do not mix the diesel removal ledger into the gas donor model.
2. Your "three-pad" scale language is off
Your diagram shows front pad + rear pad, which is basically two axle pads.
For your system, use two levels:
Minimum required:
front axle weight + rear axle weight + total weight

Preferred:
four-corner weights:
LF, RF, LR, RR
Ford's BBLB defines front axle weight as LF + RF and rear axle weight as LR + RR, and it uses those values for CG and axle calculations.
So change "three-pad" to:
certified axle scale or four-corner scale procedure
3. Add left/right balance
Right now you track front/rear well, but you also need left/right because battery boxes, cooling loops, HV junction boxes, and exhaust-removal offsets can create side imbalance.
Add:
Left front wheel load
Right front wheel load
Left rear wheel load
Right rear wheel load
Transverse CG estimate
Side-to-side balance warning
Ford's BBLB specifically defines transverse CG and notes that four corner weights plus front/rear track widths can be used to determine transverse center of gravity.
4. Follow-up dates should be real
Instead of:
Q3 2026
Use:
Pre-teardown: before first wrench
Mid-build: before final bracket welding/bolting
Final: before road test
For suppliers:
Follow-up 1: 7 days after request
Follow-up 2: 14 days after request
Escalation: 21 days after request
5. Add payload and passenger assumptions
Your final EV weight cannot be judged empty only. You need operating states:
curb EV weight
driver/passenger allowance
tools/equipment
fleet payload
body/upfit weight
coolant full
washer fluid full
low-voltage battery installed
spare tire/tools if retained
Ford's BBLB defines passenger load for FMVSS 105 as 500 lb for vehicles over 10,000 lb GVWR, which matters for brake/CG calculations.
Corrected Build Engine status
Use this:
Gate 07B — Removed / Added Mass Ledger v0.2

Known:
- Door-label GVWR/GAWR values govern the donor vehicle.
- Physical scale tickets override estimates.
- Removed and added components must be tracked individually.
- Front/rear axle weights are required.
- Four-corner weights are preferred.
- Vertical CG requires advanced measurement or qualified test procedure.

Downgrade:
- Diesel removal ledger applies only to diesel donor branch.
- Generic component weights remain NominalAssumption.
- Supplier weights remain NeedsSupplierData until verified.

Still blocked:
- donor VIN / door label
- baseline scale ticket
- stripped-chassis scale ticket
- final EV scale ticket
- four-corner weight data
- actual removed component weights
- actual added component weights
- final battery enclosure CG coordinates
- tire/wheel/suspension load check
Add this rule
No road test until:
final front axle weight ≤ front GAWR
final rear axle weight ≤ rear GAWR
final total weight ≤ GVWR
each tire/wheel load ≤ rated capacity
side-to-side imbalance reviewed
scale ticket uploaded
engineering signoff complete
What to research next
After Gate 07B, the next logical piece is:
Gate 07C — Axle Moment Calculator + CG Calculation Method
Use this prompt:
We are continuing Gate 07: Weight / Axle Load / Center of Gravity.

Build the Axle Moment Calculator and CG Calculation Method.

Do not mark anything Confirmed.
Do not use estimates as final values.

Research and structure:
1. front/rear axle moment equations
2. four-corner weight method
3. longitudinal CG calculation
4. transverse CG calculation
5. vertical CG measurement methods
6. tilt-table or lift-based CG height method
7. how to model removed component mass
8. how to model added battery/enclosure mass
9. how to flag GVWR/GAWR/tire/wheel overload
10. how to connect CG results to FMVSS 105 brake testing and stability concerns

Output:
- allowed equations
- required input fields
- blocked fields
- nominal assumptions
- physical verification steps
- Build Engine pass/block logic
Bottom line: this is good. Gate 07B is now properly structured. The main fixes are: split gas vs diesel, add four-corner/left-right tracking, use real milestone dates, and never let estimated weights become final proof.
