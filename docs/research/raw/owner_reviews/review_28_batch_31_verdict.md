[Owner framing before the payload — the review_27 recap (park Gate 07C;
restart Gate 08 as a clean FMEA + test-procedure registry; look for a
SUPPORTED 200 ms limit rather than inventing one; move regen/ABS/ESC into
staged testing) plus the FMEA row schema and the 15-failure-mode Gate 08
prompt with the hard rules (no live HV; nothing Confirmed; no compliance
claim; no invented timing thresholds) — "31:75".]

[Owner verdict delivered AFTER the batch-31 payload:]

My response

My verdict: this is the best Gate 08 structure so far. You finally have the right format:
failure mode -> trigger -> hazard -> detection -> response -> warning -> test method -> proof artifact -> pass/block -> missing data
That is exactly how the Build Engine should handle failure testing.
But it still needs a cleanup before it becomes a real gate.
What is strong
The staged test ladder is right:
Simulation -> HIL -> Bench/Dyno -> Low-speed closed-course
That prevents the system from jumping straight into dangerous live testing.
Your strongest failure rows are:
HVIL open
Isolation resistance fault
Contactor weld
Pre-charge failure
Battery overcurrent
Regen unavailable during braking
ABS/ESC regen interaction
EHPS failure
Low-voltage brownout
Coolant pump failure
CAN communication loss
Water intrusion
That is the correct failure universe for this conversion.
Corrections needed
1. Do not invent dashboard messages
Messages like:
HV FAULT - STOP SAFELY
SYSTEM ERROR - DO NOT ATTEMPT TO DRIVE
LOW STEERING PRESSURE - RESTRAIN SPEED
are good draft UI concepts, but they are not Ford-confirmed warnings.
Mark them:
DriverWarningCandidate / NeedsControlsIntegration
Not final.
2. Do not hard-code isolation thresholds as final
The 100 Ohm/V DC and 500 Ohm/V AC values are valid regulatory reference lanes, but the Build Engine should still split them by context and not treat them as one universal threshold. Federal rulemaking has referenced 500 Ohm/V for AC high-voltage sources and 100 Ohm/V for DC high-voltage sources in FMVSS electric-powertrain safety context.
Correct status:
Riso threshold:
RegulatoryReferenceCandidate
NeedsSystemContext
NeedsSupplierBMSMapping
3. HVIL timing cannot be invented
Good job removing the 200 ms hard limit. Keep it this way:
HVIL response timing:
NeedsExactTimingSource
NeedsSupplierFirmwareData
NeedsBench/HIL verification
Do not add a timing number until the BMS/VCU/inverter supplier gives it or an exact standard/test procedure supports it.
4. Brake assist row should say hydraulic, not pneumatic
This line:
Auxiliary Pneumatic / Hydraulic Braking Assist
should be:
Auxiliary Hydraulic Brake Assist
Your F-450/F-550 hydroboost lane is hydraulic, not pneumatic.
5. "Seamless friction brake compensation" may be too strong
For regen loss, change:
friction brakes seamlessly blend or step in
to:
friction braking remains available and the system removes regen torque without destabilizing brake balance.
Unless you are building a true blended-brake controller, do not imply seamless OEM-style blending.
6. FMVSS 105 should stay a test-mapping lane
FMVSS 105 is the right lane for hydraulic/electric service brake systems and parking brake systems, and its purpose is braking performance under normal and emergency conditions.
But Gate 08 should not say:
FMVSS compliance satisfied
It should say:
FMVSS_105_TEST_MAPPING_REQUIRED
BrakeEngineerReviewRequired
What I would relabel
Gate 08 — Failure Modes + Test Procedures v0.1

Status:
FMEA_REGISTRY_CREATED
TEST_SEQUENCE_MAPPED
SUPPLIER_DATA_REQUIRED
NO_LIVE_HV_TESTING_APPROVED
NO_TRACK_TESTING_APPROVED
NO_COMPLIANCE_CLAIMS
Stronger pass/block logic
Use this:
BLOCK if:
- failure mode has no detection method
- failure mode has no defined system response
- failure mode has no driver warning or service indication candidate
- failure mode has no test method
- failure mode has no proof artifact
- test requires live HV but lacks LOTO/PPE/engineering signoff
- brake/steering fault lacks brake engineer review
- regen/ABS interaction lacks simulation/HIL evidence before track testing

WARNING if:
- response timing is unknown
- supplier threshold is missing
- proof artifact is simulated only
- driver warning is a draft concept only

ALLOW SIMULATION ONLY if:
- supplier timing, thresholds, and CAN mappings are missing
What to do next
You are not ready to "finish" Gate 08 yet. The next step is Gate 08B: Source-backed test procedure mapping.
Use this prompt next:
We are continuing Gate 08: Failure Modes + Test Procedures.

Do not mark anything Confirmed.
Do not claim compliance.
Do not invent timing thresholds.
Do not recommend live HV testing.

For each failure mode in the registry, find the strongest source-backed test procedure or test-method reference.

Failure modes:
1. HVIL open
2. isolation resistance fault
3. contactor weld
4. pre-charge failure
5. battery overcurrent
6. inverter shutdown during regen
7. ABS/ESC interaction with regen loss
8. EHPS pump failure
9. brake assist pressure loss
10. steering assist pressure loss
11. low-voltage DC-DC brownout
12. coolant pump failure
13. battery/inverter/motor overtemperature
14. CAN communication loss
15. water intrusion/IP seal failure

For each one, output:
- best source
- exact quote
- test stage: simulation / HIL / bench / dyno / closed-course
- required equipment
- required proof artifact
- pass/block candidate
- missing supplier data
- verification status
Bottom line
This is good. Gate 08 has officially started in a professional way.
Correct status:
Gate 08:
FMEA registry built.
Testing ladder mapped.
Final validation not started.
Supplier thresholds and source-backed procedures still needed.
After Gate 08B, then move into the Gate 05 CAN / Controls deep dive.
