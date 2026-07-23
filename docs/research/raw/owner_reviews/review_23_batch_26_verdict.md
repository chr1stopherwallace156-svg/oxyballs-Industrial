[Owner framing before the payload — the "Do Gate 07 next" instruction +
the Gate 07 research prompt (GVWR/GAWR, door-label capture, scale-ticket
procedure, removed/added component weights, axle-load + CG calculation,
suspension/tire load checks, brake dependency on weight, post-build
weigh-in) with the hard rules (scale ticket overrides estimates; nothing
safe without scale data; never exceed GVWR/GAWR/tire/wheel rating;
estimates NominalAssumption until measured) — "26:75".]

[Owner verdict delivered AFTER the batch-26 payload:]

My response

My verdict: Gate 07 is set up correctly, but a few sources and assumptions need downgrading before the Build Engine accepts it.
Gate 07 — Weight / Axle Load / CG:
Direction = correct
Physical scale-ticket logic = excellent
Ford rating logic = correct
Scribd/dealer sources = downgrade
Final status = not closed, but properly structured
The strongest part
This rule is exactly right:
Certified physical scale data overrides estimates.
Door-label GVWR / GAWR overrides generic online values.
Do not exceed GVWR, front GAWR, rear GAWR, tire rating, or wheel rating.
Ford's General Body Builders Layout Book defines GAWR as the manufacturer-specified load-carrying capacity of a single axle system and GVWR as the manufacturer-specified loaded weight of the single vehicle. So your Build Engine should treat the actual vehicle door label as the governing input, not a marketing chart.
Big correction: 6.7L diesel vs 7.3L gas
Your blocked ledger says:
Exact CG height of factory 6.7L Power Stroke V8 and 10R140 transmission
But your earlier Platform 001 direction was F-450/F-550 7.3L gas chassis cab.
So separate them:
Platform 001A: F-450/F-550 7.3L gas
Platform 001B: F-450/F-550 6.7L diesel
Do not mix diesel engine/trans weight or CG data into the gas-platform model unless the donor truck is actually diesel.
Source corrections
1. Scribd BBLB needs downgrade
The 2026 Super Duty BBLB from Scribd should be:
CandidateSourcePath / NeedsOfficialFordCopy
Use it to find what to look for, but do not make it the official source. Ford Pro's upfitter publication portal is the better official source path.
2. Dealer payload guide is background only
The RC Lacy Ford page is okay for general orientation, but it is not the source of truth for a specific donor vehicle. Mark it:
FleetBackground / DoorLabelReminder
NotForFinalRule
3. Work Truck / NTEA method is useful
The Work Truck article is a good modeling source because it explains that weight distribution analysis identifies proper axle loading before a truck is built, and it lays out the process: determine component weights and CG locations, multiply CG distance by weight to get moments, add moments, divide by wheelbase to get rear axle weight, then subtract from total weight to get front axle weight.
So mark it:
ModelingFrameworkCandidate / AxleMomentMethod
NeedsPhysicalMeasurements
What I would change in the ledger
Your blocked questions are good, but Q3 2026 is too vague.
Use real follow-up dates:
First follow-up: July 17, 2026
Second follow-up: July 24, 2026
Escalation: July 31, 2026
Also, don't make "factory engine CG height" a supplier-only blocker. You can approximate it for simulation, then replace it with physical measurements later.
Better:
Engine/trans CG:
NominalAssumption allowed for simulation.
Physical removed-component weighing required before final layout.
Supplier data preferred, but not mandatory to keep research moving.
Gate 07 should become three sub-gates
Gate 07A — Door Label + Baseline Scale Ticket
This is the real first closure step.
Capture:
- VIN
- wheelbase
- cab configuration
- GVWR
- front GAWR
- rear GAWR
- tire size/load rating
- wheel rating
- baseline front axle weight
- baseline rear axle weight
- baseline total weight
Gate 07B — Removed / Added Mass Ledger
Removed:
- engine
- transmission
- fuel tank/fuel
- exhaust/aftertreatment
- radiator/cooling
- DEF system if diesel
- accessories

Added:
- battery packs
- enclosures
- brackets
- motor/inverter
- HV cables
- coolant loops
- radiator/chiller
- EHPS pump
- DC-DC converter
Gate 07C — Axle Moment Calculator
Use:
component weight × distance from front axle = moment
total moment ÷ wheelbase = rear axle load contribution
total weight - rear axle load = front axle load
This should stay simulation-only until physical scale tickets verify it.
Strong extra rule to add
The Ford General BBLB gives you a good structural tie-in for Gate 06/07: use existing holes where possible; do not drill top or bottom frame flanges; vertical web holes must stay at least 38 mm / 1.5 inches from the flange; max added frame hole diameter is 19 mm / 0.75 inches.
That means any battery enclosure mounting plan should link Gate 07 weight results back into Gate 06 frame rules.
Correct Build Engine status
Gate 07 — Weight / Axle Load / CG v0.1

Known:
- GVWR / GAWR / tire / wheel limits are hard no-go boundaries.
- Door-label values govern the specific donor truck.
- Scale tickets override all estimates.
- Axle moment method is allowed for simulation.
- Physical verification is required before road testing.

Downgrade:
- Scribd BBLB → CandidateSourcePath / NeedsOfficialFordCopy.
- Dealer specs → FleetBackground only.
- Factory engine CG → NominalAssumption until measured.

Still blocked:
- actual donor VIN/door label
- baseline scale ticket
- removed component weights
- added component weights
- final battery placement coordinates
- post-build scale ticket
- tire/wheel/suspension load check
Next research after this
Do Gate 07B next: create the Removed / Added Mass Ledger and scale-ticket procedure.
Use this prompt:
We are continuing Gate 07: Weight / Axle Load / Center of Gravity.

Do not mark anything Confirmed.
Do not use generic specs as final donor-truck data.

Create a Removed / Added Mass Ledger for a Ford F-450/F-550 EV conversion.

Research and structure:
1. removed engine/transmission/fuel/exhaust/cooling/DEF component weight categories
2. added battery/motor/inverter/enclosure/cooling/HV/LV component weight categories
3. required measurement method for each item
4. whether supplier datasheet, physical scale, or estimate is allowed
5. how each mass links to front/rear axle moment calculations
6. what must be captured before teardown
7. what must be captured after teardown
8. what must be captured after final build

Hard rules:
- Physical scale values override estimates.
- Estimates are NominalAssumption only.
- Final validation requires certified front axle, rear axle, and total vehicle scale tickets.
Bottom line: this is good progress. Gate 07 is not closed, but it is now properly structured around the right truth source: door label + scale tickets + component mass ledger.
