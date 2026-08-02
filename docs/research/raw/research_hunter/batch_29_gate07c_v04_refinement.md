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
Exact track widths (T_f and T_r) for targeted F-450/F-550 dual-rear-wheel (DRW) chassis cab configurations
Ford Body Builder Advisory Service
Essential for resolving lateral moment arms and transverse center of gravity offsets.
Transverse center of gravity (CG_t) precise positional placement relative to the frame longitudinal centerline.
NeedsSupplierData
Prior to module placement
NominalAssumption engineering guide measurements from the Ford BBLB specifications.
08
Specialized dynamic fault-injection protocols for integrated Class 4/5 electric drive regenerative braking handshakes
Traction Motor / Inverter Software Team
Insures FMVSS 105 compliance during severe ABS/ESC event activations with high torque transitions.
Deceleration pitch-moment load transfer profiles during multi-system component failures.
NeedsSupplierData
Prior to test track deployment
Desktop simulation of standard torque drop-outs and electronic freewheeling conditions.
Part 2: Clean Build Engine Status
Gate 07C — Weight / Axle Load / Center of Gravity v0.4
Known:
The platform architecture branches cleanly into Platform 001A (7.3L Gas Donor) and Platform 001B (6.7L Diesel Donor).
Physical data collection requires a certified axle scale or a four-corner scale procedure (LF, RF, LR, RR).
Operating state calculations must include the FMVSS 105 passenger load assumption (500\text{ lbs} / 227\text{ kg}) alongside all fluid loops, upfits, and tools.
Still Blocked:
Physical corner-weight scale ticket validation for the active chassis layout.
Empirical vertical center of gravity data derived from the physical lift-based vehicle measurement method.
Integrated dynamic fault-isolation verification protocols for active regeneration under maximum payload conditions.
Part 3: Explicit Mathematical Core & Physics Formulation
The calculations below form the central math core of the Build Engine payload processing. Every variable must use physical inputs from the scale infrastructure or component catalogs.
1. Baseline System Mass Summation
The absolute total vehicle weight (W) is the direct summation of the individual four-corner scale measurements: 
W = LF + RF + LR + RR
The individual total cross-axle load profiles are split via: 
\text{Front Axle Total }(F) = LF + RF \text{Rear Axle Total }(R) = LR + RR
2. Longitudinal Center of Gravity (CG_h)
The horizontal distance measured rearward from the front axle centerline to the composite center of gravity is defined by: 
CG_h = \frac{R \times WB}{W}
3. Component Moment Shifts & Axle Load Alterations
When adding or removing an individual component mass, the resulting load change at the rear axle (\Delta R) is determined by its position relative to the front axle centerline (x): 
\Delta R = \frac{w \times x}{WB}
The corresponding weight change at the front axle (\Delta F) is calculated via: 
\Delta F = w - \Delta R
Core Logic Rule: For all removed mass components (such as the engine block, exhaust lines, and fuel tanks), the component weight (w) must be input as a negative value (-w) to properly reflect the weight reduction on the frame rails.
4. Transverse Center of Gravity (CG_t) & Lateral Balance
To track structural side-to-side weight imbalances, the transverse center of gravity (CG_t) utilizes a explicit sign convention: the right side of the vehicle is positive (+) and the left side is negative (-):
CG_t = \frac{\left[(RF - LF) \times \left(\frac{T_f}{2}\right)\right] + \left[(RR - LR) \times \left(\frac{T_r}{2}\right)\right]}{W}
Where:
T_f = Front Track Width (\text{inches} or \text{mm})
T_r = Rear Track Width to the center of the dual-wheel assemblies (\text{inches} or \text{mm})
Part 4: Data Entry Fields Matrix
Required Input Fields
DONOR_PLATFORM_SELECTION: Config selection parameter [Platform_001A_73L_Gas or Platform_001B_67L_Diesel].
FACTORY_VEHICLE_RATINGS: Door label compliance parameters: GVWR, Front_GAWR, Rear_GAWR, Max_Tire_Load_Rating, Max_Wheel_Load_Rating.
VEHICLE_DIMENSIONAL_BASELINES: Structural layout measurements: Wheelbase_WB, Front_Track_Width_Tf, Rear_Track_Width_Tr.
FOUR_CORNER_LEVEL_SCALE_VALUES: Calibrated scale metrics: LF_Level, RF_Level, LR_Level, RR_Level.
FOUR_CORNER_RAISED_SCALE_VALUES: Tilting measurement values: LF_Raised, RF_Raised, Rear_Axle_Lift_Height.
Blocked Fields (Do Not Edit)
Calculated_Total_EV_Curb_Weight: System generated summation value (W).
Final_Safety_Compliance_Status: Automated safety output from the pass/block code engine.
Nominal Assumptions
FMVSS_105_PASSENGER_ALLOWANCE: Fixed compliance load value (500\text{ lbs} / 227\text{ kg}) positioned inside the cab.
REMOVED_ICE_MASS_PROFILES:
Gas Branch (001A): 7.3\text{L V8 Gas Engine} = 540\text{ lbs} (245\text{ kg}); Exhaust & catalytic converter system = 65\text{ lbs} (29\text{ kg}).
Diesel Branch (001B): 6.7\text{L Power Stroke} = 1,100\text{ lbs} (499\text{ kg}); DPF/SCR assembly = 180\text{ lbs} (82\text{ kg}); DEF Tank System = 70\text{ lbs} (32\text{ kg}).
Part 5: Build Engine Validation & Pass/Block Logic
START COMPLIANCE EVALUATION (Gate 07C)
 │
 ├── [CHECK 1: RECALCULATE WEIGHT BALANCES]
 │     ├── Compute W = LF + RF + LR + RR
 │     ├── Compute F = LF + RF
 │     └── Compute R = LR + RR
 │
 ├── [CHECK 2: STRUCTURAL LIMIT VERIFICATION]
 │     ├── IF W > GVWR ──────────────────────────────► STATUS: BLOCK [Reason: Exceeds Total Vehicle GVWR]
 │     ├── IF F > Front_GAWR ────────────────────────► STATUS: BLOCK [Reason: Front Axle Overload]
 │     ├── IF R > Rear_GAWR ─────────────────────────► STATUS: BLOCK [Reason: Rear Axle Overload]
 │     └── IF Max(LF, RF, LR, RR) > Tire_Rating ─────► STATUS: BLOCK [Reason: Individual Tire Overload]
 │
 ├── [CHECK 3: SIDE-TO-SIDE BIAS EVALUATION]
 │     ├── Compute Transverse Shift Delta via CGt Equation
 │     └── IF |CGt| > (0.05 * Max(Tf, Tr)) ──────────► STATUS: WARNING [Reason: Side-to-Side Imbalance Exceeds 5%]
 │
 └── [CHECK 4: DYNAMIC COMPLIANCE]
       └── IF CG_v > Max_Allowable_Height ───────────► STATUS: BLOCK [Reason: High Rollover Risk / FMVSS 105 Brake Degradation]

IF ALL CONDITIONS PASSED ──► STATUS: OPERATIONAL_ALPHA (NominalAssumption Validation Only)
Part 6: Physical Verification Steps
Verify Software Platform Branch: Ensure the chosen parameters align with the target donor truck hardware (Platform_001A_Gas or Platform_001B_Diesel).
Execute Level Four-Corner Scale Weigh-In: Place the complete vehicle onto four independent scale pads. Capture and log the initial level-ground individual wheel loads (LF, RF, LR, RR).
Execute Post-Teardown Component Weigh-In: Weigh every single component removed from the vehicle using a calibrated platform scale. Update the ledger entries with these actual numbers, replacing the temporary NominalAssumption values.
Execute Post-Build Final Weigh-In: Roll the converted vehicle back onto the four-corner scales. Log the final weights to verify compliance against all factory door label limits.
Part 7: Open Gaps & Missing Values Tracker
Four-Corner Calibrated Weight Metrics: Missing the actual scale house printouts for the individual wheel loads across the different configuration phases.
Empirical Elevation Data: Real-world wheel weight numbers from physical vehicle lift testing are required to calculate and verify the vertical center of gravity height.
Supplier Component Center-of-Gravity Data: Missing the verified 3D center of mass coordinate points from the supplier for the high-voltage battery pack assemblies.
Part 8: Strategic Gate Roadmap
The sequence below defines the next logical engineering gates for the vehicle build pipeline.
 [CURRENT]                                                    [NEXT LOGICAL PIECE]
 Gate 07C  ───────────────► Gate 08 ─────────────────────────► Gate 05 ─────────────────────────► Gate 06
 Weight & CG                Failure Modes & Test Procedures    CAN & Controls Deep Dive           Mechanical Mounting
                            (HV, Braking, Regeneration)        (Signal Tracing, Isolation)        (Battery Enclosures)
                                                                                                           │
                                                                                                           ▼
                            Gate 11 ◄───────────────────────── Gate 10 ◄───────────────────────── Gate 09
                            Fleet Readiness                    Supplier Comparison                3D Scan Procedure
