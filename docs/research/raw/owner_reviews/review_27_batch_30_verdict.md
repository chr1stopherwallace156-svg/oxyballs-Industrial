[Owner framing before the payload — a recap of the review_25/26
corrections (explicit equations; track width = NeedsOfficialFordSource OR
PhysicalMeasurement; move the regen/ABS/ESC fault item to Gate 08;
replace the simple CGv block with IVM-based logic) and the instruction to
move to Gate 08 — Failure Modes + Test Procedures — "30:30".]

[Owner verdict delivered AFTER the batch-30 payload:]

My response

My verdict: this is a good transition payload, but Gate 08 is not clean yet. You are halfway moving from Gate 07C into Gate 08, but some Gate 07 weight/CG logic is still mixed inside the Gate 08 failure-mode gate.
Gate 07C: calculator framework ready / physical data required
Gate 08: started / needs clean FMEA + test-procedure structure
Main correction: remove invented timing limits and unsafe live-test wording
What is strong
The first ledger correction is good:
Track widths can come from Ford Pro Upfitter publications OR physical measurement.
That is better than saying "supplier only." Ford Pro is the official place to look for Body Builder Layout Books and upfitter resources.
The math core is now much cleaner:
W = LF + RF + LR + RR
F = LF + RF
R = LR + RR
CGh = (R × WB) / W
CGt = (((RF - LF) × Tf / 2) + ((RR - LR) × Tr / 2)) / W
Delta_R = (w × x) / WB
Delta_F = w - Delta_R
That part can be parked as Gate 07C Calculator Framework Ready.
The main issue
This part should not be in Gate 08:
CHECK 1: Weight Validation Loop
CHECK 2: Vertical Center of Gravity Safety Gate
Those are still Gate 07C checks. Gate 08 should only reference them as prerequisites.
Better:
Gate 08 prerequisite:
Gate 07C must be PHYSICAL_VERIFICATION_REQUIRED or better before track testing.

But Gate 08 itself should focus on:
failure mode → detection → response → test → proof → pass/block.
Big correction: the 200 ms HVIL limit is unsupported
This line is dangerous:
IF HVIL_LOOP_INTERRUPT_TIMING > 200 → BLOCK
Unless you have a specific standard, supplier datasheet, or engineering requirement that says 200 ms, this must be changed to:
HVIL_LOOP_INTERRUPT_TIMING_LIMIT = NeedsExactSource
FMVSS 305a is the right regulatory lane for EV high-voltage safety because it establishes electric-powertrain safety requirements for light and heavy vehicles, but you cannot invent a 200 ms HVIL threshold from it without exact text/test mapping.
Big correction: do not manually trigger live HV faults yet
This line needs to be rewritten:
Manually trigger a low-voltage circuit opening at an inverter service plug connector.
That sounds like live HV fault testing. The Build Engine should not allow that as an early physical step.
Replace it with:
Stage 1: bench/HIL simulation using low-voltage mock circuits.
Stage 2: controlled component-level test with HV disabled or isolated test supply.
Stage 3: supervised integrated vehicle test only after engineering safety plan, LOTO, PPE, test boundary, and emergency shutdown procedure are approved.
Big correction: regen/ABS/ESC test is too aggressive for early Gate 08
This line is also too early:
force a total inverter shutdown during low-speed closed-track testing
That may eventually be a test, but not as the first test. It should be staged:
1. Software simulation
2. Hardware-in-the-loop
3. Dyno or wheel-lift low-energy test
4. Closed-course low-speed test
5. Loaded test only after brake engineer review
FMVSS 105 is the correct brake-performance lane because it applies to hydraulic and electric brake systems, including trucks and buses over 3,500 kg GVWR, but you still need a brake engineer/test plan before claiming any result satisfies it.
Rename the status
Change:
GATE_08_OPEN
to:
GATE_08_FRAMEWORK_STARTED
or:
FMEA_TEST_PLAN_REQUIRED
Because Gate 08 is not open/cleared yet.
What Gate 08 should look like
Use this format now:
Gate 08 — Failure Modes + Test Procedures

For every failure mode, require:
- subsystem
- failure event
- cause
- hazard
- detection method
- system response
- driver warning
- test method
- required proof artifact
- pass/block criteria
- source
- verification status
Example rows:
Failure Mode: HVIL open
Subsystem: HV safety
Detection: BMS / VCU input change
Response: open contactors, log fault, inhibit drive
Test: HIL first, then controlled integrated test
Status: NeedsSupplierData / NeedsExactTimingSource

Failure Mode: regen unavailable during braking
Subsystem: braking / controls
Detection: inverter torque unavailable flag
Response: friction brakes carry braking demand
Test: simulation → HIL → dyno → closed course
Status: NeedsBrakeEngineerMapping

Failure Mode: EHPS power loss
Subsystem: brake/steering assist
Detection: pressure sensor / low-voltage rail / pump fault
Response: warning, reserve braking, controlled stop
Test: bench pressure test + loaded low-speed steering test
Status: NeedsPhysicalVerification
Corrected Build Engine status
Gate 07C:
CALCULATOR_FRAMEWORK_READY
PHYSICAL_SCALE_DATA_REQUIRED
VERTICAL_CG_TEST_REQUIRED
NO ROAD_TEST_CLEARANCE

Gate 08:
FMEA_FRAMEWORK_STARTED
FAULT_TEST_PROCEDURES_REQUIRED
NO LIVE_HV_TESTING_APPROVED
NO TRACK_TESTING_APPROVED
SUPPLIER_TIMING_LIMITS_REQUIRED
Next prompt to use
We are starting Gate 08: Failure Modes + Test Procedures.

Do not run or recommend live high-voltage tests.
Do not mark anything Confirmed.
Do not claim compliance.
Do not invent timing thresholds.

Create a failure-mode registry for the EV conversion covering:
1. HVIL open / service disconnect fault
2. isolation resistance fault
3. contactor weld
4. pre-charge failure
5. battery overcurrent
6. inverter shutdown during regen
7. ABS / ESC interaction with regen loss
8. EHPS pump failure
9. brake assist pressure loss
10. steering assist pressure loss
11. low-voltage DC-DC brownout
12. coolant pump failure
13. battery/inverter/motor overtemperature
14. CAN communication loss
15. water intrusion / IP seal failure

For each failure mode, output:
- subsystem
- trigger
- hazard
- detection method
- expected system response
- driver warning
- test method: simulation / HIL / bench / dyno / closed-course
- required proof artifact
- pass/block criteria
- required source
- verification status
- missing supplier data

Hard rules:
- Simulation pass does not equal physical test pass.
- HIL pass does not equal road-test approval.
- Live HV testing requires LOTO, PPE, test plan, emergency shutdown, and engineering signoff.
Bottom line
This is good progress, but the fix is:
Park Gate 07C as calculator-ready.
Restart Gate 08 as a clean FMEA + test-procedure registry.
Remove the unsupported 200 ms limit.
Remove early live-fault testing language.
Move regen/ABS/ESC into staged simulation → HIL → dyno → track testing.
Then Gate 08 becomes extremely powerful.
