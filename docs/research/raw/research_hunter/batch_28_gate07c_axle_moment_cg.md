Part 1: The Blocked Questions Ledger
Gate
Question
Supplier/Expert Needed
Why It Matters
What Calculation It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
07C
Exact vertical center of gravity (CG_v) of bare, fluid-drained Class 4/5 rolling chassis cab
Ford Body Builder Advisory Service
Forms the master base coordinate value for the composite 3D center of gravity calculations.
Unlocks the formal calculation for vertical CG displacement and its dynamic impact on FMVSS 105 stopping performance.
NeedsSupplierData
Prior to frame integration
NominalAssumption estimation derived from Ford BBLB standard models (~22 to 24 inches above ground level).
07C
Certified dynamic roll-stability thresholds and pitch-moment constants for the factory brake controller
Ford Chassis Control Systems / Active Safety Group
Prevents mismatch faults or premature triggering of the electronic stability control (ESC) systems.
Establishes the safe boundary limits for vertical and lateral center of gravity modifications under full payload.
NeedsSupplierData
Prior to track testing
None. Active ESC safety systems mandate absolute system parameters to prevent dynamic intervention errors.
Part 2: Clean Build Engine Status
Gate 07C — Weight / Axle Load / Center of Gravity v0.3
Known:
The structural engine logic branches into two paths: Platform 001A (7.3L Gas Engine Donor) and Platform 001B (6.7L Power Stroke Diesel Engine Donor).
Physical data collection requires a certified axle scale or four-corner scale procedure (LF, RF, LR, RR), completely overriding theoretical estimates.
Operating state calculations must include the FMVSS 105 passenger load assumption (500\text{ lbs} / 227\text{ kg} distributed for vehicles over 10,000\text{ lbs} GVWR) alongside all fluid loops, low-voltage buffers, tools, and upfit bodies.
Still Blocked:
Physical corner-weight scale ticket validations for the selected donor platform.
Empirical vertical center of gravity data derived via the physical lift-based vehicle measurement method.
Regulatory verification data for final FMVSS 105 brake testing compliance under maximum load.
Part 3: Engineering Equations & Mathematical Framework
1. Longitudinal Center of Gravity (CG_l) via Four-Corner Static Model
Calculated as a horizontal distance measured rearward from the front axle centerline:
CG_l = \frac{(LR + RR) \times WB}{WT_{\text{total}}}
Where:
LF, RF = Left Front and Right Front individual wheel loads (\text{lbs} or \text{kg})
LR, RR = Left Rear and Right Rear individual wheel loads (\text{lbs} or \text{kg})
WB = Vehicle Wheelbase Dimension (\text{inches} or \text{mm})
WT_{\text{total}} = Total Measured Vehicle Mass (LF + RF + LR + RR)
2. Transverse Center of Gravity (CG_t) & Lateral Asymmetry Tracking
Calculated as an offset distance from the vehicle longitudinal centerline (positive value indicates right-side bias, negative indicates left-side bias):
CG_t = \frac{[(RF + RR) - (LF + LR)] \times \left(\frac{TW}{2}\right)}{WT_{\text{total}}}
Where:
TW = Nominal Track Width (\text{inches} or \text{mm}). For Dual Rear Wheel (DRW) assemblies, use the track width measured to the transverse center point of the dual wheel pair as specified in Ford's Body Builder Layout Book (BBLB).
3. Vertical Center of Gravity (CG_v) via Lift-Based/Rear-Axle Elevation Method
Determined by weighing the front axle wheel loads while keeping the vehicle level, then raising the rear axle to a calculated height angle (\theta) and measuring the resulting weight transfer shift on the front scales:
CG_v = R_{\text{wheel}} + \left[ \frac{(LF_{\text{raised}} + RF_{\text{raised}}) - (LF_{\text{level}} + RF_{\text{level}})}{\tan(\theta)} \times \frac{WB}{WT_{\text{total}}} \right]
Where:
R_{\text{wheel}} = Static Rolling Radius of the tire assembly under load (\text{inches} or \text{mm})
\theta = Elevation tilt angle, calculated directly via: \arcsin\left(\frac{\text{Height Raised}}{WB}\right)
Requirement: The rear axle must be raised a minimum of 10\text{ inches} (254\text{ mm}) above the front scale plane to ensure clean data resolution.
Part 4: Data Entry Fields Matrix
Required Input Fields
DONOR_PLATFORM_SELECTION: Enumerated string config [Platform_001A_73L_Gas or Platform_001B_67L_Diesel].
FACTORY_VEHICLE_RATINGS: Stamped door-label metrics: GVWR, Front_GAWR, Rear_GAWR, Max_Tire_Load_Rating, Max_Wheel_Load_Rating.
VEHICLE_DIMENSIONAL_BASELINES: Physical chassis dimensions: Wheelbase_WB, Front_Track_Width, Rear_Track_Width_DRW_Center.
FOUR_CORNER_LEVEL_SCALE_VALUES: Array of real-world scale numbers: LF_Level, RF_Level, LR_Level, RR_Level.
FOUR_CORNER_RAISED_SCALE_VALUES: Array of values captured during tilt testing: LF_Raised, RF_Raised, Rear_Axle_Lift_Height.
OPERATING_STATE_MASS_ELEMENTS: Dedicated configuration values for conversion additions: Upfit_Body_Weight, Upfit_Body_CG_XYZ, Added_Battery_Pack_Weight, Added_Battery_Pack_CG_XYZ, Auxiliary_Coolant_Full_Mass, Low_Voltage_Battery_Buffer_Weight.
Blocked Fields (Do Not Edit)
Calculated_Total_EV_Curb_Weight: Generated strictly via mathematical summation: \sum(LF + RF + LR + RR).
Final_Safety_Compliance_Status: Hardcoded status logic variable controlled entirely by the core Build Engine validation rules.
Nominal Assumptions
FMVSS_105_PASSENGER_ALLOWANCE: Hardcoded reference value (500\text{ lbs} / 227\text{ kg}) distributed evenly across the front cab seating area positions for vehicles with a GVWR greater than 10,000\text{ lbs}.
FLEET_OPERATING_PAYLOAD_TARGET: Fixed placeholder value (2,500\text{ lbs} / 1,134\text{ kg}) utilized during layout simulation runs until a specific upfit body is selected.
REMOVED_ICE_MASS_PROFILES: Default values used for layout drafting before final teardown:
Gas Branch (001A): 7.3\text{L V8 Gas Engine Dry Asset} = 540\text{ lbs} (245\text{ kg}); Exhaust & single converter system = 65\text{ lbs} (29\text{ kg}).
Diesel Branch (001B): 6.7\text{L Power Stroke Wet Asset} = 1,100\text{ lbs} (499\text{ kg}); DPF/SCR assembly = 180\text{ lbs} (82\text{ kg}); Fully filled DEF tank system = 70\text{ lbs} (32\text{ kg}).
Part 5: Build Engine Validation & Pass/Block Logic
The execution logic block maps individual data checkpoints and manages warning thresholds across both donor platform configurations:
START COMPLIANCE EVALUATION (Gate 07C)
 │
 ├── [CHECK 1: STRUCTURAL RATINGS COMPLIANCE]
 │     ├── IF (LF_Level + RF_Level + LR_Level + RR_Level) > GVWR ──► STATUS: BLOCK [Reason: Exceeds Total Vehicle GVWR]
 │     ├── IF (LF_Level + RF_Level) > Front_GAWR ───────────────────► STATUS: BLOCK [Reason: Front Axle Overload]
 │     ├── IF (LR_Level + RR_Level) > Rear_GAWR ────────────────────► STATUS: BLOCK [Reason: Rear Axle Overload]
 │     └── IF Max(LF, RF, LR, RR) > Max_Tire_Load_Rating ──────────► STATUS: BLOCK [Reason: Individual Tire Overload]
 │
 ├── [CHECK 2: TRANSVERSE BALANCE STABILITY]
 │     ├── Target: Calculate Delta % = |(LF + LR) - (RF + RR)| / Total_Weight
 │     └── IF Delta % > 0.05 ───────────────────────────────────────► STATUS: WARNING [Reason: Side Imbalance Exceeds 5%]
 │
 └── [CHECK 3: FMVSS 105 BRAKE DYNAMICS & VERTICAL CG BOUNDARY]
       ├── Target: Extract Composite CG_v using Lift-Based Method
       └── IF CG_v > Factory_Maximum_Allowable_Height_Threshold ────► STATUS: BLOCK [Reason: High Rollover Risk / Brake Bias Failure]

IF ALL CONDITIONS PASSED ──► STATUS: OPERATIONAL_ALPHA (NominalAssumption Validation Only)
Part 6: Physical Verification Steps
Platform Selection Verification: Confirm that the active Build Engine software branch matches the actual donor truck configuration (Platform_001A_Gas vs. Platform_001B_Diesel). This matches the baseline frame weight maps to the right structural starting point.
Four-Corner Baseline Weigh-In: Roll the operational vehicle onto independent, calibrated scale pads. Record the baseline individual wheel loads (LF, RF, LR, RR) under the full unladen curb state.
Post-Teardown Material Verification: Weigh every single component assembly removed from the chassis using a certified platform scale. Log the actual measured weights directly into the ledger to clear the default NominalAssumption values.
Integration Component Verification: Weigh all high-voltage battery enclosures, electric motors, auxiliary cooling components, and mounting plates before final vehicle installation.
Physical Lift-Based CG_v Profiling: Position the completed EV prototype vehicle on level ground scales. Record the base level weights. Elevate the rear axle frame a minimum of 10\text{ inches} using an overhead lift or heavy-duty jack, ensuring the front tires remain centered on their scale pads. Input the exact lift height and modified front wheel weights into the vertical center of gravity calculator engine to determine the final vertical center of mass.
Part 7: Open Gaps & Missing Values Tracker
Four-Corner Dynamic Weight Metrics: Missing the actual scale house printouts for the individual wheel loads (LF, RF, LR, RR) across the three operational test states.
Physical Elevation Data: Real-world wheel weight numbers from physical vehicle lift testing are required to calculate and verify the vertical center of gravity height.
Supplier Component Center-of-Gravity Data: Missing the verified 3D center of mass coordinate points from the supplier for the high-voltage battery pack assemblies.
Calculate your Center of Gravity Height (https://www.youtube.com/watch?v=i2Q3DlDgeaA) This video provides a detailed walk-through of the physical mechanics and calculation steps used to determine a vehicle's vertical center of gravity height by applying the axle elevation method on scale pads.
