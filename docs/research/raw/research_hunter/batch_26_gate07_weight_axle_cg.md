Part 1: The Blocked Questions Ledger
Gate
Question
Supplier/Expert Needed
Why It Matters
What Calculation It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
07
Exact center-of-gravity (CG) height of factory 6.7L Power Stroke V8 and 10R140 transmission assembly
Ford Fleet / Powertrain Engineering
Establishes the exact vertical milestone shift from removing the OEM mechanical core.
3D vertical CG composite mapping for rollover threshold stability and kinetic pitch-moment modeling.
NeedsSupplierData
Q3 2026
Sizing using standard engine block dimensional volumes and uniform center-point approximations.
07
Factory structural chassis frame vertical section modulus limits under concentrated midpoint battery bracket loading
Ford Body Builder Advisory Service
Prevents structural frame bucking, flange wrinkling, or localized cross-member fatigue failure.
Maximum concentrated battery box mass distribution profile over distinct sections of the web channel.
NeedsSupplierData
Q3 2026
Nominal assumption modeling based on standard ASTM A1011 High-Strength Low-Alloy (HSLA) steel parameters.
Part 2: Clean Build Engine Status
Gate 07 — Weight / Axle Load / Center of Gravity v0.1
Known:
Vehicle structural ratings must never be exceeded (GVWR, Front/Rear GAWR, tire maximum load limits, and wheel structural ratings).
All early engineering estimates are tracked exclusively as a NominalAssumption until physical validation is executed.
A certified physical scale ticket is the definitive engineering document of record and completely overrides all analytical weight models or estimates.
Still Blocked:
Physical, vin-specific door-label data capture for the targeted vehicle platform.
Detailed baseline and post-build multi-point scale tickets.
Exact center-of-gravity (CG) height data for both the removed factory components and the newly integrated high-voltage powertrain systems.
Part 3: Deep-Dive Technical Research
Gate 07 — Weight / Axle Load / Center of Gravity
1. Factory Structural Weight Rating Infrastructure
Title: 2026 Ford Super Duty Body Builders Guide
URL: [https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final](https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final)
Source Type: OEM Vehicle Specification and Body Builder Manual
Page/Section/Table: Page 84-85, Chassis Cab Model Lineup (Weights: GVWR, Payload, GAWR, Curb)
Test Condition: Base unladen curb weight validation configuration compared to maximum gross design parameters.
Pass/Fail Item: Maximum loaded vehicle weight (including crew, high-voltage battery enclosures, electric drive units, traction inverters, fluid auxiliary loops, and remaining body upfits) cannot exceed the factory structural limits: F-450 Class 4 maximum limits span 14,000\text{ to }16,500\text{ lbs.} (6,350\text{ to }7,484\text{ kg}) GVWR; F-550 Class 5 maximum limits span 17,500\text{ to }19,500\text{ lbs.} (7,938\text{ to }8,845\text{ kg}) GVWR.
Build Engine Impact: Rule / NoGoCondition
Verification Status: ModelingFramework
Missing Data Still Needed: Model-year-specific component configurations matching selected wheelbases (145\text{", }169\text{", or }193\text{" WB}).
2. Standardized Axle Moment and Center of Gravity Balancing Methodology
Title: Calculating Commercial Vehicle Weight Distribution & Payload Made Easy
URL: [https://www.worktruckonline.com/articles/calculating-commercial-vehicle-weight-distribution-payload-made-easy](https://www.worktruckonline.com/articles/calculating-commercial-vehicle-weight-distribution-payload-made-easy)
Source Type: Industry Engineering and Body Modification Reference
Page/Section/Table: Section: Longitudinal Center of Gravity & Moments Matrix
Test Condition: Static, level-ground horizontal load alignment mapping across variable wheelbases.
Pass/Fail Item: To compute the exact weight imposed on the rear axle, all component moments must be calculated around the front axle centerline centerline using the structural formula: \text{Moment} = \text{Component Weight} \times \text{Distance from Front Axle Line} The total rear axle weight is determined via: \text{Rear Axle Weight} = \frac{\sum \text{Moments}}{\text{Wheelbase (WB)}} The remaining mass is allocated via: \text{Front Axle Weight} = \text{Total Vehicle Weight} - \text{Rear Axle Weight} The calculated front-axle loading must always remain below the Front Gross Axle Weight Rating (Front GAWR), while retaining at least 20\% to 30\% of the total vehicle weight on the front steering axle to preserve safe steering control and handling characteristics.
Build Engine Impact: Rule / Test
Verification Status: ModelingFramework
Missing Data Still Needed: Precise 3D packaging layout drawings mapping the exact physical center points for every added structural chassis bracket.
3. OEM Door Label Verification & Baseline Weigh-In Procedure
Title: Ford F-450 vs. Ford F-550: Specs & Payload
URL: [https://www.rclacyford.com/ford-f450-vs-f550/](https://www.rclacyford.com/ford-f450-vs-f550/)
Source Type: Fleet Application Specification Guide
Page/Section/Table: Section: Door Jamb Certification Label Index
Test Condition: Physical inspection of the vehicle Safety Compliance Certification Label followed immediately by a three-pad multi-point scale weigh-in sequence.
Pass/Fail Item: The initial physical data collection must capture the exact vin-specific Front GAWR, Rear GAWR, and overall GVWR directly from the door-jamb label. This specific local data completely overrides any generic marketing brochure values. The vehicle must then be driven onto certified scales to record three baseline weight targets: Front Axle Curb Weight, Rear Axle Curb Weight, and Total Curb Weight.
Build Engine Impact: Rule / OpenGap
Verification Status: NeedsEngineeringReview
Missing Data Still Needed: A physical, certified scale ticket from the donor truck before beginning the conversion teardown.
Part 4: Open Gaps & Missing Values Tracker
The parameters below remain unverified and must be addressed using physical vehicle evaluation or direct component measurements before finalizing structural layouts:
Door-Label Data Capture Procedure: A formalized physical inspection step to catalog the exact compliance labels on the specific donor chassis cab.
Scale-Ticket Procedure: A structured tracking method for capturing official multi-point scale weights at the baseline stage, intermediate conversion step, and final configuration check.
Removed Component Weights: The precise scale weight of the specific removed powertrain components, including the internal combustion engine (dressed), transmission assembly, torque converter, exhaust aftertreatment lines, DEF systems, and full fuel tanks.
Added Structural Powertrain Component Weights: Verified weight metrics for the selected high-voltage battery modules, structural sub-enclosures, electric drive units, inverters, power distribution blocks, and coolant fluid volumes.
Center-of-Gravity Height Calculation: Executing physical tilt testing or full 3D mass distribution tracking to calculate the composite vertical and lateral center-of-gravity shifts resulting from mounting battery assemblies low inside the frame rails.
Suspension and Tire Load-Rating Checks: Checking that individual wheel loads do not exceed the stamped capacity limits on the factory springs, dual-rear-wheel rims, or specialized commercial tires (19.5\text{" Load Range G/H}).
Brake Performance Dependency on Final Weight: Evaluating how shifting the vehicle's unladen weight profile affects the front-to-rear hydraulic brake bias balance under full load conditions.
Post-Build Weigh-In Validation: A final, mandatory verification gate using certified scale metrics to confirm the completed vehicle stays within all factory GAWR and GVWR parameters before conducting road track evaluations.
