[Owner framing before the payload — the review_48 recap carried into the
Gate 05I-D-final + Gate 05J prompt: change 05D-### → 05I-D-### IDs; fix
"immediately" → within configured bench target window / measured by
timestamped CAN/scope trace / pending approved timing threshold; charger-plug
row — VCU recognizes + rejects the illegal state (not "ignores"); E-stop row
— the hardwired loop owns physical LV interruption, the VCU observes/commands
torque-zero/logs/latches; sleep-current node (≤1.0 mA VCU) vs total-system
(≤4.0 mA) separated; corrected exit criteria (permits engineering review for
controlled low-voltage vehicle fitment only); then Gate 05J — Controlled
Vehicle Fitment / No-HV Installation Readiness (install VCU/harness, no HV
battery, no traction enable, CAN_1 listen-only, verify grounds/shields/
routing/no-chafing/service-access/LOTO/12 V parasitic draw/no Ford bus
disturbance) → Gate 05K (LV Vehicle Power-On / No-HV Commissioning) → Gate
05L (Controlled HV First-Energization, engineer-approved only) — "51:75".]

[Owner verdict delivered AFTER the batch payload:]

My verdict: this is strong and you’re structuring the transition correctly. Gate 05I-D is now a proper final low-voltage integrated bench cascade, and Gate 05J is the right next boundary: controlled vehicle fitment with no HV connected.
05I-D:
Integrated low-voltage fault cascade matrix ✅

05J:
Controlled vehicle fitment / no-HV readiness ✅

Main cleanup:
Do not let Gate 05J become “vehicle commissioning” too early.
Call it “controlled fitment + passive/no-HV verification.”
What is strongest
The corrected 05I-D exit language is much better:
Successful Gate 05I-D completion permits engineering review for controlled low-voltage vehicle fitment only.
That is exactly the right level. It does not claim road-ready, HV-ready, or certified safe.
The 05I-D integrated tests are also strong:
Brake override during active torque
HVIL open during active torque
BMS no-discharge during active torque
Inverter fault during active torque
CAN_2 heartbeat loss
Charge plug during drive state
E-stop during active torque
Brownout during fault latch
Service clear attempt during active fault
Sleep request with stuck-awake node
That is the right final low-voltage bench stress package.
Main correction 1: Gate 05J should be “fitment,” not commissioning yet
This line is good:
Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness
Keep that wording.
But be careful with this phrase:
before any low-voltage power-on checks are executed on-vehicle
Because your Gate 05J includes parasitic draw and CAN_1 silence with ignition on. That is already a form of controlled low-voltage verification.
Better wording:
Gate 05J verifies controlled physical installation and passive/no-HV in-chassis checks.

It does not authorize active conversion control, traction enable, live HV, vehicle movement, or road testing.
Then Gate 05K can be the first formal low-voltage vehicle power-on / no-HV commissioning gate.
Main correction 2: CAN_1 connection needs a precondition
This part is risky but valid if controlled:
Connect the VCU CAN_1 transceiver to the OEM Ford CAN network.
Before allowing that, add:
CAN_1 vehicle connection prerequisite:
- Gate 05H CAN_1 listen-only proof complete
- Gate 05I-C CAN_1 silence proof complete
- TXD pin monitored
- no TX mailboxes allocated
- silent/listen-only register verified
- no ACK participation verified on bench
- Ford baseline scan completed before VCU connection
Then during 05J:
Run Ford baseline scan before VCU connection.
Connect VCU in passive listen-only mode.
Run Ford post-connection scan.
Compare before/after DTCs, network errors, and cluster warnings.
A “clean cluster” alone is not enough. You want:
baseline OBD/Ford scan
post-connection scan
TXD scope capture
CAN analyzer log
firmware/register dump
Main correction 3: parasitic draw target
This line may be too strict if it means the whole truck:
Total sleep current draw must be ≤4.0 mA
Better:
Conversion-added parasitic draw target:
≤4.0 mA initial bench/chassis target.

Whole-vehicle parasitic draw:
Measured and logged separately against OEM baseline.
Because the Ford chassis itself may have its own normal sleep draw. You want to know how much Elektron adds, not confuse it with the whole vehicle’s OEM draw.
Use:
OEM_baseline_sleep_current
conversion_added_sleep_current
total_vehicle_sleep_current
Main correction 4: hard values still need target labels
These are still okay as starting targets:
50 mm moving-part clearance
100 mm heat-source clearance
<0.1 Ω ground bond
≤4.0 mA sleep current
≤2.0 s sleep transition
But label them:
INITIAL_TARGET_PROFILE
ENGINEERING_REVIEW_REQUIRED
FINAL_LIMIT_PENDING_SOURCE / TEST / VEHICLE PACKAGE
NO_HV_AUTHORITY
For example:
Ground bond target:
<0.1 Ω initial chassis fitment target.
Final approved limit pending grounding architecture, instrument method, and engineering review.
Same for harness clearance and heat source distance. The actual rule should depend on temperature, abrasion risk, movement envelope, and protection method.
Main correction 5: 05J should not say “production-level Ford network channels”
Use cleaner wording:
live OEM Ford CAN_1 network
And the hard rule:
VCU may only connect in passive listen-only mode.
No transmit path.
No ACK participation.
No active error frames.
No wake commands.
No spoofed Ford modules.
Corrected Gate 05J status
Use this:
Gate 05J — Controlled Vehicle Fitment / No-HV Installation Readiness

Status:
CONTROLLED_VEHICLE_FITMENT_STARTED
NO_HV_CONNECTED
NO_TRACTION_ENABLE
NO_VEHICLE_MOTION
PASSIVE_CAN1_ONLY
VCU_HARNESS_FITMENT_UNDER_REVIEW
GROUNDING_AND_SHIELDING_UNDER_REVIEW
IN_CHASSIS_PARASITIC_DRAW_BASELINE_REQUIRED
FORD_BASELINE_SCAN_REQUIRED
NO_ROAD_TEST_AUTHORITY
NO_CUSTOMER_OPERATION
Corrected 05J exit criteria
I would phrase it like this:
Gate 05J Exit Criteria

The system cannot exit Gate 05J unless:

1. VCU, display, and low-voltage harness are physically mounted without chafing, pinch points, heat exposure, or moving-part interference.
2. Grounding and shielding are verified against approved target profiles.
3. Ford baseline scan and post-connection scan show no new network faults caused by the passive VCU connection.
4. CAN_1 TXD pin remains inactive during all in-chassis passive monitoring checks.
5. Conversion-added parasitic draw is measured and within approved target.
6. All HV connectors remain disconnected, capped, tagged, and locked out.
7. All logs, photos, scans, scope traces, harness revisions, and signoffs are archived.

Successful Gate 05J completion permits Gate 05K only:
Low-Voltage Vehicle Power-On / No-HV Commissioning.

It does not authorize:
- live HV connection
- traction enable
- vehicle movement
- chassis dyno
- road testing
- customer operation
- compliance claims
What comes next
Your next gate after 05J should be:
Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning
That gate should test:
ignition off
accessory
key on / run
VCU wake
display wake
CAN_1 passive monitoring
CAN_2/CAN_3 isolated activity
diagnostic access
no HV contactor activity
no torque command
no Ford DTCs
parasitic draw after sleep
fault latch behavior in chassis
Bottom line: this is very strong. Gate 05I-D is now a legit final low-voltage bench cascade, and Gate 05J is the right next step. Just make 05J clearly about physical fitment + passive/no-HV chassis verification, not actual vehicle commissioning yet.
