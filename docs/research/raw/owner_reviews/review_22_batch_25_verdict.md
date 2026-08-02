[Owner framing before the payload — the "How to not lose track" Blocked
Questions Ledger structure, the Gate 04B/04C/05/06 research prompts, the
instruction to correct the ZF "6,000 RPM CAN control" line to "ZF MPU
100-C delivers 5–12 L/min at 2,500–6,000 rpm and 113–124.5 bar.
Control/fault output details are NeedsSupplierData. The cited factsheet
says no CAN connection is required.", and the clean Gate 04 v0.4 status
block — "25:75".]

[Owner verdict delivered AFTER the batch-25 payload:]

My response

My verdict: this is a very good "do-not-wait" payload. You're using the blocked time correctly: parking supplier-only questions, then moving into test plans, low-voltage architecture, controls, and mechanical structure.
But the second-stage filter should make a few corrections.
What is strong
The Blocked Questions Ledger is exactly what your Build Engine needs. It prevents the project from stalling and keeps each supplier-only question tied to a calculation it unlocks.
The Gate 04 status is clean. It correctly says:
Vacuum pump rejected.
EHPS path identified.
ZF candidate found.
Ford exact values still missing.
FMVSS 105 and loaded steering test still open.
The Gate 06 frame rules are strong. The Ford General BBLB says to use existing frame holes when possible, not drill top/bottom frame flanges, keep added holes in the vertical web, maintain 38 mm / 1.5 in from the rail flange, and keep added frame holes to 19 mm / 0.75 in max. That is a real rule-candidate lane.
Corrections needed
1. Follow-up date cannot be "Q3 2026"
That is too vague. Use real dates.
Follow-up date:
7 days after first email

Second follow-up:
14 days after first email

Escalation:
21 days after first email or contact distributor/engineering rep
2. FMVSS 105 row is strong, but label it regulatory, not just modeling
Your brake-test row is useful. FMVSS 105 includes stopping distance, partial failure, inoperative brake power-assist/power unit tests, fade/recovery, water recovery, stability/control, parking brake, and brake indicator lamp requirements.
So mark it:
RegulatoryTestSource / NeedsBrakeEngineerMapping
not just:
ModelingFramework
Also, be careful with the exact 400 ft / 150 lb claim. It may be correct depending on the table/vehicle class/test condition, but your Build Engine should not hard-code it until the specific FMVSS 105 table row is parsed and matched to the exact vehicle category/GVWR/brake condition.
3. Gate 04C sources are too weak
BenchForce and FS1Inc are okay as background, but they should not create real low-voltage safety rules.
Mark them:
TechnicalBackground / LeadOnly
NeedsOEMElectricalSource
NotForFinalRule
For low-voltage architecture, you already have a stronger source: Ford's General BBLB says an electrical load analysis must be done before adding loads, added circuit draw must not exceed certain OEM fused-circuit limits, BCM outputs should not be overloaded, and high-demand circuits should be powered directly from the 12V battery or added battery through relays.
That should become your real Gate 04C anchor.
4. Scribd should be downgraded
The 2026 Ford Super Duty BBLB from Scribd should not be treated as a clean OEM source. It may be useful for finding page numbers, but the Build Engine should prefer Ford Pro Upfitter / BBAS / NHTSA-hosted PDFs / official Ford publications. Ford Pro has the official upfitter publication portal.
Label Scribd as:
CandidateSourcePath / NeedsOfficialFordCopy
5. Gate 05 language is better, but still needs caution
This phrase is okay:
without triggering safety flags
But do not frame the goal as "clearing dashboard lights." Frame it as:
authorized serviceable integration that preserves diagnostics, warning lamps, ABS/stability behavior, and scan-tool visibility.
The Ford General BBLB is very clear that OEM wiring to the PCM should not be modified, the ignition circuit should not be altered, and stop-lamp switch splices can interfere with PCM, speed control, and ABS modules.
Correct Build Engine status
Use this:
Gate 04 — Brake / Steering Assist:
BLOCKED_PENDING_SUPPLIER_RESPONSE
Continue Gate 04B and 04C research.

Gate 04B — Brake Test Mapping:
REGULATORY_TEST_SOURCE_FOUND
NEEDS_BRAKE_ENGINEER_MAPPING

Gate 04C — Low-Voltage Architecture:
OEM_ELECTRICAL_RULE_SOURCE_FOUND
DC_DC_SIZING_OPEN

Gate 05 — CAN / Controls:
STARTED
NEEDS_OFFICIAL_FORD_SUPER_DUTY_SOURCE
NO SECURITY/BYPASS LANGUAGE

Gate 06 — Mechanical Mounting:
OFFICIAL_FRAME_RULE_CANDIDATES_FOUND
NEEDS_PLATFORM_SPECIFIC_CONFIRMATION
NEEDS_STRUCTURAL_ENGINEER_REVIEW
What to research next
Do Gate 07 next: Weight / Axle Load / Center of Gravity.
You already started mechanical structure, so now you need to prove the truck can carry the battery weight without blowing GVWR/GAWR, payload, braking, suspension, tire load, or center-of-gravity limits.
Use this prompt:
We are starting Gate 07: Weight / Axle Load / Center of Gravity.

Research only Ford F-450/F-550 Class 4/5 weight, axle load, payload, and CG validation for an EV conversion.

Find sources for:
1. GVWR and front/rear GAWR by model year and wheelbase
2. door-label data capture procedure
3. scale-ticket procedure
4. removed engine/transmission/fuel/exhaust component weights
5. added battery/motor/inverter/enclosure/cooling system weights
6. front/rear axle load calculation
7. center-of-gravity height and longitudinal CG calculation
8. suspension and tire load-rating checks
9. brake performance dependency on final weight
10. post-build weigh-in validation

Hard rules:
- Physical scale ticket overrides estimates.
- Do not mark any weight condition safe without actual scale data.
- Do not exceed GVWR, front GAWR, rear GAWR, tire rating, or wheel rating.
- All estimates are NominalAssumption until measured.
Bottom line: this is the right workflow. You're no longer "waiting"; you're building the next test and structure layers while supplier-only values stay parked.
Continue from where you left off.
