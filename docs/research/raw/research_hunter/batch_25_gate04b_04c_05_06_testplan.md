Part 1: The Blocked Questions Ledger
Gate
Question
Supplier/Expert Needed
Why It Matters
What Calculation It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
04
Exact current draw vs. pressure/flow mapping (0\text{ to }124.5\text{ bar} across 5, 8, 12\text{ L/min})
ZF Race Engineering
Prevents vehicle electrical low-voltage brownouts.
Sizing of auxiliary battery/ultracapacitor buffers and DC-DC overhead matching.
NeedsSupplierData
Q3 2026
Sizing curves from comparable TRW/Gen2 EHPS commercial platforms.
04
Continuous duty cycle limits at 12\text{ L/min} and 124.5\text{ bar} before thermal shutdown
ZF Race Engineering
Ensures steering assist is not lost during prolonged low-speed tight maneuvering.
Maximum safe duration of maximum-load steering events without system derating.
NeedsSupplierData
Q3 2026
Thermal dissipation modeling of brushless motor casings under stagnant airflow.
04
2020–2026 Ford OEM factory pump displacement, flow, and exact pressure relief curve
Ford Fleet Engineering / Lee Steering
Establishes the baseline volume delivery standard the replacement system must replicate.
Fluid volume deficit modeling during simultaneous high-demand brake and turn events.
NeedsSupplierData
Q3 2026
Testing physical salvage units on an external hydraulic dynamometer bench.
04
Class 4/5 hydroboost internal accumulator reserve fluid volume and gas pre-charge
Ford Engineering / Bosch Braking
Defines the minimum number of emergency manual assist stops remaining after complete pump failure.
Transient brake-assist energy buffer calculation during sudden supply dropouts.
NeedsSupplierData
Q3 2026
Physical depressurization stroke volume measurement on a vehicle mock-up.
Part 2: Clean Build Engine Status
Gate 04 — Brake / Steering Assist v0.5
Known:
Vacuum pump path is rejected.
Hydroboost + steering share a common high-pressure hydraulic supply line loop.
EHPS conversion path is the correct strategic engineering direction.
The ZF MPU 100-C delivers 5\text{–}12\text{ L/min} at 2,500\text{–}6,000\text{ RPM} and 113\text{–}124.5\text{ bar}. Control/fault output details are marked NeedsSupplierData. The cited factsheet notes that no active CAN connection is required for basic standalone installation.
Lee 1,750\text{ PSI} / 3.25\text{ GPM} configuration serves as the relevant Class 4/5 hydroboost benchmark.
12V DC-DC peak electrical loading presents a severe transient constraint.
Still Blocked:
Ford exact F-450/F-550 pump curve.
Ford steering gear pressure/flow requirement parameters.
Hydroboost accumulator reserve capacity metrics.
ZF current-vs-pressure engineering map.
ZF internal duty cycle limits and thermal derating curves.
Empirical verification or manufacturer approval proving the ZF unit can feed hydroboost and steering simultaneously.
Detailed FMVSS 105 brake test parameter mapping.
Loaded low-speed steering physical test procedure specification.
Part 3: Deep-Dive Technical Research
Gate 04B — Brake / Steering Test Plan
1. FMVSS 105 Hydraulic Brake Standardized Protocol
Title: TECHNICAL STANDARDS DOCUMENT No. 105, Revision 6: Hydraulic and Electric Brake Systems
URL: [https://tc.canada.ca/sites/default/files/2025-08/105_TSD_rev_6_clean_CCV.pdf](https://tc.canada.ca/sites/default/files/2025-08/105_TSD_rev_6_clean_CCV.pdf)
Source Type: Regulatory Technical Standards Document (Harmonized with 49 CFR § 571.105)
Page/Section/Table: Section S5 / Table I / Table III
Test Condition: Section S5.1.2 defines partial failure and inoperative power assist criteria. The test mandates evaluating the vehicle's braking performance with the primary power-assist source disconnected or completely powered down.
Pass/Fail Item: For vehicles with a GVWR greater than 10,000\text{ lbs.} (4,536\text{ kg}), the vehicle must come to a complete stop from 60\text{ mph} within a maximum distance of 400\text{ feet} (121.9\text{ meters}) under an inoperative brake power-assist condition, utilizing a pedal force not exceeding 150\text{ lbs.} (667\text{ N}).
Build Engine Impact: Rule / Test
Verification Status: ModelingFramework
Missing Data Still Needed: Structural deflection limits of the stock pedal assembly under continuous 150\text{ lbs.} manual driver inputs without power assistance.
2. Fade, Recovery, and Thermal Duty Cycle Testing
Title: TECHNICAL STANDARDS DOCUMENT No. 105, Revision 6: Hydraulic and Electric Brake Systems
URL: [https://tc.canada.ca/sites/default/files/2025-08/105_TSD_rev_6_clean_CCV.pdf](https://tc.canada.ca/sites/default/files/2025-08/105_TSD_rev_6_clean_CCV.pdf)
Source Type: Regulatory Technical Standards Document
Page/Section/Table: Section S7.11 (Fade and Recovery Test Procedure)
Test Condition: The vehicle is subjected to a sequence of 10\text{ to }30 consecutive deceleration snubs from high operational speeds down to a near-stop, spaced at short time intervals to intentionally saturate the system thermally.
Pass/Fail Item: Following the thermal soak sequence, the baseline recovery stops must demonstrate that brake line pressure or mechanical pedal force variations do not deviate by more than \pm20\% compared to the cold baseline performance standards.
Build Engine Impact: Test
Verification Status: ModelingFramework
Missing Data Still Needed: Hydraulic fluid temperature logging at the EHPS reservoir inlet during consecutive heavy braking test applications.
3. Split-System Partial Hydraulic Failure Redundancy
Title: Interpretation ID: nht78-1.13 - NHTSA
URL: [https://www.nhtsa.gov/interpretations/nht78-113](https://www.nhtsa.gov/interpretations/nht78-113)
Source Type: Federal Agency Legal and Engineering Interpretation
Page/Section/Table: Section 1 (Hydraulic Fluid Isolation and Actuator Behavior)
Test Condition: Simulated physical rupture of a primary auxiliary line or a complete loss of fluid containment within the power steering/hydroboost supply sub-loop.
Pass/Fail Item: A structural failure, seal blowout, or fluid loss within the power steering pump or assist loop must not interfere with or degrade the isolated pressure integrity of the primary split master cylinder brake fluid circuits.
Build Engine Impact: NoGoCondition
Verification Status: ModelingFramework
Missing Data Still Needed: Chemical compatibility verification proving that accidental contact between synthetic EHPS fluids and standard glycol-based DOT 4 brake fluids will not cause rapid seal breakdown if a cross-leak occurs.
Gate 04C — EHPS Electrical / Low-Voltage Architecture
1. DC-DC Converter Matching and System Brownout Mitigation
Title: Understanding The Body Control Module
URL: [https://www.benchforce.com/blogs/news/understanding-the-body-control-module](https://www.benchforce.com/blogs/news/understanding-the-body-control-module)
Source Type: Automotive Electronics Engineering Technical Review
Page/Section/Table: Section: Data Input, Processing & Logic / Network Stability
Modeling Rule: The 12V low-voltage network must maintain a steady state between 12.0\text{V and }12.6\text{V} during peak current draws. If a high-draw component like an EHPS pump causes the voltage to drop below 10.5\text{V} (a voltage sag condition), it can cause critical vehicle safety modules like the BCM or ABS to reset.
Candidate Test: Execute high-frequency electrical load testing by logging the 12V rail at 1\text{ kHz} during a simultaneous lock-to-lock turn and a maximum-effort panic brake apply.
Open Gaps: The exact size (\text{Farads} or \text{Amp-hours}) of the ultracapacitor or auxiliary battery buffer needed to support the system while a 150\text{A} high-voltage DC-DC converter manages the load.
Supplier Data Required: Complete transient response times and current output curves for the selected high-voltage to low-voltage DC-DC converter unit.
2. Low-Voltage Overcurrent Protection and Emergency Shutdown Logic
Title: U0256 Code Symptoms, Causes, and Repair Cost Guide for ECM Check
URL: [https://www.fs1inc.com/blog/dtc-u0256-lost-communication-front-controls-interface-module/](https://www.fs1inc.com/blog/dtc-u0256-lost-communication-front-controls-interface-module/)
Source Type: Network Diagnostic and Module Service Analysis
Modeling Rule: If a low-voltage circuit loses power or drops off the network due to an overcurrent event, the vehicle control network can trigger immediate communication codes (such as U-series faults), which can place safety-critical modules into an unpredictable state.
Candidate Test: Install an inline fast-acting high-amperage fuse block and run testing to evaluate system behavior under simulated short-circuit conditions on the main pump power feed line.
Open Gaps: Determining the optimal electronic isolation strategy to keep the driver alert indicators functioning if the main power delivery circuit fails completely.
Supplier Data Required: The maximum current-over-time trip curves for the primary low-voltage distribution block fuses.
Gate 05 — CAN / Controls / Cluster Integration
1. Ford Commercial Chassis Frame and Module Integration Guidelines
Title: 2026 Ford Super Duty Body Builders Guide
URL: [https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final](https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final)
Source Type: OEM Body Builder Layout Manual
Page/Section/Table: Page 73, Section: Second Unit Body (SUB) Mounting Guidelines
What Claim It Supports: Standard Ford commercial truck platforms rely on an integrated network of specialized electronic control modules (such as the BCM, ABS, and Instrument Cluster) that require continuous configuration matching to remain fully operational and maintain safety functions.
Build Engine Impact: Rule
Verification Status: ModelingFramework
Missing Data Still Needed: Detailed CAN bus signal requirements needed to satisfy the Instrument Cluster assembly and keep the dashboard clear of warning lamps once the factory internal combustion engine control module is removed.
2. Powertrain Control Module (PCM) Removal and Safety System Management
Title: Ford General Body Builder Layout Book
URL: [https://static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf](https://static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf)
Source Type: Official OEM Design Specifications Documentation
Page/Section/Table: Section: Stability Control Calibration and Electrical Protection Warning
What Claim It Supports: Modifying or removing primary factory control modules significantly impacts the vehicle's electronic stability control and traction management systems, as these safety features are calibrated directly to the original factory weight distribution and powertrain configuration.
Build Engine Impact: NoGoCondition
Verification Status: ModelingFramework
Missing Data Still Needed: Determining the authorized software parameter updates required to preserve active ABS and stability control features without a factory engine controller present on the network.
Gate 06 — Mechanical Mounting / Battery Enclosure
1. Frame Alteration, Drilling, and Mechanical Fastener Constraints
Title: Ford General Body Builder Layout Book
URL: [https://static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf](https://static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf)
Source Type: Official OEM Design Specifications Documentation
Page/Section/Table: Section: Frame Modification Recommendations and Flange Restrictions
Technical Metric: Drill holes must never be placed in either the top or bottom structural flanges of the main chassis rail. Holes drilled into the vertical side rail web must maintain a minimum distance of 38\text{ mm} (1.5\text{ inches}) from the inside edge of the rail flange. The maximum allowable diameter for any added hole is 19\text{ mm} (0.75\text{ inches}).
Build Engine Impact: Rule / NeedsEngineeringReview
Verification Status: ModelingFramework
Missing Data Still Needed: Structural finite element analysis (FEA) models of the custom battery box mount brackets attached to the frame vertical web under a 3\text{g} vertical loading condition.
2. Structural Sub-Frame Spacing and Vocational Alignment Standards
Title: 2026 Ford Super Duty Body Builders Guide
URL: [https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final](https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final)
Source Type: OEM Body Builder Layout Manual
Page/Section/Table: Page 73, Figure C: Chassis Cab Sub-Mounting Spacer Layout
Technical Metric: Tapered isolation spacers are required between added vocational frame brackets and the factory structural side members. The recommended taper profile is a 0.5\text{-inch} thickness reduction starting at the front attachment area and transitioning smoothly back over a distance of 4\text{ to }6\text{ inches}.
Build Engine Impact: Rule / NeedsEngineeringReview
Verification Status: ModelingFramework
Missing Data Still Needed: Specification of the mechanical shear strength and thread locking requirements for heavy battery enclosure mounting hardware.
Part 4: Open Gaps & Missing Values Tracker
The parameters below remain unverified and must be addressed using specific supplier responses or field testing data before finalizing system designs:
Loaded Low-Speed Steering Test Method: A field test design to safely evaluate the steering assist capabilities at a complete stop while carrying maximum front axle weight.
Steering Assist Loss Failure Behavior: Physical force metrics defining exactly how much manual steering wheel torque is required to turn the vehicle if hydraulic pressure drops completely.
Pressure Sensor Warning Logic: Designing the software parameters to trigger an immediate, high-priority dashboard warning light the moment assist-loop pressure drops below a safe threshold.
Emergency Fallback Power Strategy: Sizing the secondary backup energy source to ensure the steering and brake systems remain fully operational if the main high-voltage traction battery disconnects.
Immobilizer-Safe Serviceable Architecture: Creating an authorized control interface that keeps the vehicle serviceable using standard workshop scan tools without tripping factory anti-theft faults.
Pack Venting Direction: Configuring the physical battery box pressure relief valves to direct any emergency cell gases safely down and away from the passenger cabin and high-temperature components.
