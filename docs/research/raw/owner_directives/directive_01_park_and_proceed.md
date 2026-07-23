[Owner standing operating directive, 2026-07-16 — delivered after the
review_21 (batch 24) reconciliation. Archived 1:1 as immutable evidence.
This is NOT a Research Hunter batch; it sets the operating rule for
proceeding while suppliers are pending and supplies the queued research
prompts for Gates 04B / 04C / 05 / 06.]

do not sit and wait on emails. The right move is:
Mark Gate 04 as:
BLOCKED_PENDING_SUPPLIER_RESPONSE

Then continue research in areas that do not require supplier answers yet.
Think of it like this:
Supplier data closes final numbers.
Research now builds the test plan, failure logic, and next gates.
What to research next while waiting
1. Gate 04B — Brake / Steering Test Plan
This is the best next step because it stays connected to the brake/steering gate without needing ZF or Ford replies yet.
Research:
FMVSS 105 brake test procedure
loaded low-speed steering test
hydroboost failure response
loss of EHPS pump behavior
low-voltage failure behavior
brake warning lamp requirements
stopping distance tests
parking brake tests
partial failure tests
power-off reserve brake stops
Use this prompt:
We are continuing Gate 04: Brake / Steering Assist while supplier responses are pending.

Do not select final parts.
Do not mark anything Confirmed.

Research only validation tests and failure-mode procedures for a converted Ford F-450/F-550 hydraulic brake/steering system.

Find sources for:
1. FMVSS 105 hydraulic brake test procedure
2. stopping distance requirements
3. fade and recovery testing
4. partial failure brake testing
5. warning lamp requirements
6. parking brake testing
7. power-off brake reserve testing
8. loaded low-speed steering test methods
9. steering assist loss failure behavior
10. EHPS pump failure response
11. low-voltage power failure response
12. pressure sensor / warning logic

For every source, provide:
- exact title
- URL
- source type
- exact quote
- page/section/table
- test condition
- pass/fail item
- Build Engine impact: Test / NoGoCondition / OpenGap / Rule
- verification status
- missing data still needed

Hard rules:
- Do not claim compliance.
- Do not say the vehicle is safe.
- Do not create final pass/fail numbers unless the source is primary regulation, OEM, or accepted test standard.
That gives your Build Engine a test framework even before the EHPS is selected.



2. Gate 04C — EHPS Electrical / Low-Voltage Architecture
This is also worth researching now because your steering/brake pump may hit the 12V system hard.
Research:
800V-to-12V DC-DC converter sizing
12V battery buffer
ultracapacitor buffer
high-current 12V fuse sizing
low-voltage brownout risk
pump relay / contactor control
emergency fallback power
pressure sensor warning logic
Prompt:
We are researching the low-voltage power impact of an EHPS brake/steering assist system.

Do not select final parts.
Do not mark Confirmed.

Research engineering sources for:
1. 800V-to-12V DC-DC converter sizing for high-current auxiliary loads
2. 12V bus voltage sag under transient loads
3. ultracapacitor or auxiliary battery buffering
4. high-current fuse and relay sizing
5. low-voltage fault detection
6. emergency backup power for steering/brake assist
7. pressure sensor integration
8. warning lamp or driver alert logic
9. safe shutdown behavior if EHPS power fails

Output:
- modeling rules
- candidate tests
- OpenGaps
- what supplier data is still required
This lets you keep moving without needing ZF's final current map yet.



3. Gate 05 — CAN / Controls / Cluster Integration
Start this next, but use clean language. No "PATS bypass." Say:
authorized Ford-compatible controls integration
immobilizer-safe architecture
diagnostic compatibility
cluster serviceability
Prompt:
We are starting Gate 05: CAN / Controls / Cluster Integration.

Do not provide anti-theft bypass instructions.
Do not use bypass language.
Do not mark anything Confirmed.

Research only authorized Ford-compatible controls integration for a Ford F-450/F-550 EV conversion candidate.

Find sources for:
1. Ford Super Duty CAN architecture
2. body control module dependencies
3. instrument cluster dependencies
4. ABS / traction / stability communication dependencies
5. PCM removal risks
6. upfitter interface module limits
7. J1939 gateway options
8. EV inverter/BMS J1939 integration
9. diagnostic trouble code behavior
10. immobilizer-safe serviceable architecture
11. warning lamp strategy
12. post-conversion scan tool/service requirements

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

Hard rules:
- Do not instruct how to defeat anti-theft.
- Do not claim OEM compatibility.
- Forum posts are LeadOnly.
- Ford/OEM/service documentation is preferred.



4. Gate 06 — Mechanical Mounting / Battery Enclosure
This is the next physical-build gate.
Research:
Ford frame modification rules
battery tray design
bracket fatigue
fastener preload
welding/drilling restrictions
vibration testing
corrosion protection
underbody impact protection
service access
water drainage
pack venting direction
Prompt:
We are starting Gate 06: Mechanical Mounting / Battery Enclosure.

Research only Class 4/5 battery enclosure, frame mounting, bracket, and structural integration requirements for a Ford F-450/F-550 EV conversion.

Find sources for:
1. Ford body builder frame modification guidance
2. frame drilling and welding restrictions
3. battery tray / enclosure mounting methods
4. bracket fatigue and vibration standards
5. fastener preload and locking methods
6. corrosion protection
7. road debris and underbody impact shielding
8. water drainage and service access
9. pack venting direction
10. FEA validation methods
11. physical pull / vibration / road test validation

Hard rules:
- Do not invent bracket thickness.
- Do not invent bolt sizes.
- Do not approve welding or drilling without Ford/OEM or engineering review.
- Mark all structural conclusions NeedsEngineeringReview.
How to not lose track
Create a Blocked Questions Ledger. Every time you hit a supplier-only value, park it there and keep moving.
Use this structure:
Gate:
Question:
Supplier needed:
Why it matters:
What calculation it unlocks:
Current status:
Follow-up date:
Alternative research allowed:
Example:
Gate: 04 Brake / Steering
Question: Can ZF MPU 100-C support hydroboost + steering simultaneously?
Supplier needed: ZF
Why it matters: determines EHPS candidate suitability
Unlocks: DC-DC sizing, pressure/flow validation, steering/brake assist architecture
Status: BLOCKED_PENDING_SUPPLIER_RESPONSE
Follow-up date: 7 days after first email
Alternative research allowed: FMVSS 105 test mapping, loaded steering test procedure
Best order from here
Right now:
1. Gate 04B — brake/steering validation tests
2. Gate 04C — EHPS low-voltage/DC-DC impact
3. Gate 05 — CAN / controls / cluster
4. Gate 06 — mechanical mounting / battery enclosure
5. Gate 07 — weight / axle load / CG
6. Gate 08 — failure modes + test procedures
Bottom line
Do not wait.
Your move is:
Park supplier-only questions.
Keep researching test plans, failure modes, controls, mechanical mounting, and weight.
Come back when supplier data arrives.
The next best research target is:
Gate 04B — FMVSS 105 Brake Test Mapping + Loaded Low-Speed Steering Test Procedure
I can also set a reminder to follow up with Webasto, Dana, ZF, and Ford/Lee in 7 days.
