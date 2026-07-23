Part 1: The Blocked Questions Ledger
Gate
Question
Source/Expert Needed
Why It Matters
What Calculation It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
07C
Track widths (T_f and T_r) for targeted F-450/F-550 dual-rear-wheel (DRW) configurations
Ford Pro Upfitter Publications Portal OR Physical Measurement
Crucial for mapping transverse lateral offsets and side-to-side chassis lean limits.
Transverse center of gravity (CG_t) structural verification.
NeedsOfficialFordSource / PhysicalMeasurement
Immediate
Real-world physical track-width capture using digital vernier calipers across tire centerlines.
08
Dynamic control-loop latency for high-voltage isolation fault detection via the central VCU
Inverter / Battery Management Firmware Group
Determines safe high-voltage shutdown windows during a catastrophic containment breach.
Pass/block status for low-voltage signal tracing and functional system safety boundaries.
NeedsSupplierData
Prior to commissioning
Hardware-in-the-loop (HIL) bench simulation using automated digital fault injection cards.
Part 2: Clean Build Engine Status
Gate 08 — Failure Modes + Test Procedures v0.1
Known:
The structural math engine maps out individual component shift balances across Platform 001A (Gas) and Platform 001B (Diesel).
Track widths can be extracted cleanly from Ford Pro Body Builder Layout Books (BBLB) or verified via a manual mechanical tape measure.
The regenerative braking handshake failure mode, including its interaction with anti-lock braking (ABS) and electronic stability control (ESC) logic, is officially reallocated to Gate 08.
Still Blocked:
Firmware-level high-voltage interlock loop (HVIL) response timing metrics during a hard chassis grounding event.
Verified functional test routines to evaluate mechanical backup systems under steering or braking hydraulic power losses.
Dynamic track test matrices to physically satisfy the complex requirements of FMVSS 105.
Part 3: Engineering Equations & Mathematical Framework
The plain-text equations below must be hard-coded directly into the script parser without modification.
1. Static Vehicle Weight Distribution
W = LF + RF + LR + RR
F = LF + RF
R = LR + RR
2. Center of Gravity Layout Calculations
CGh = (R * WB) / W
CGt = (((RF - LF) * Tf / 2) + ((RR - LR) * Tr / 2)) * (1 / W)
Sign Convention: Right side values are calculated as positive (+); left side values are calculated as negative (-).
3. Delta Component Mass Changes
Delta_R = (w * x) / WB
Delta_F = w - Delta_R
Sign Convention: All removed hardware masses must utilize a negative weight input (-w).
Part 4: Data Entry Fields Matrix
Required Input Fields
DONOR_CHASSIS_CONFIG: Structural switch string [Platform_001A_73L_Gas or Platform_001B_67L_Diesel].
FACTORY_SAFETY_RATINGS: Stamped placard specifications: GVWR, Front_GAWR, Rear_GAWR, Tire_Load_Max.
MANUAL_TRACK_MEASUREMENTS: Verified real-world widths: Front_Track_Tf, Rear_Track_Tr_DRW_Center.
FOUR_CORNER_LEVEL_DATA: Ground scale readings: LF_Level, RF_Level, LR_Level, RR_Level.
FOUR_CORNER_RAISED_DATA: Elevated scale readings: LF_Raised, RF_Raised, Axle_Lift_Delta_Height.
Blocked Fields (Do Not Edit)
Calculated_Total_Mass: Automatically set via the formula string W.
Calculated_Longitudinal_Meters: Auto-calculated via the formula string CGh.
Nominal Assumptions
FMVSS_105_PASSENGER_LOAD: Standard regulatory occupant weight factor (500\text{ lbs} / 227\text{ kg}).
REMOVED_MASS_INDEX:
Platform 001A (Gas): Powertrain asset weight = 540\text{ lbs} (245\text{ kg}); Fuel and basic exhaust = 65\text{ lbs} (29\text{ kg}).
Platform 001B (Diesel): Powertrain asset weight = 1,100\text{ lbs} (499\text{ kg}); DPF filter core = 180\text{ lbs} (82\text{ kg}); Loaded DEF system = 70\text{ lbs} (32\text{ kg}).
Part 5: Build Engine Validation & Pass/Block Logic
START MECHANICAL & FUNCTIONAL EVALUATION (Gate 08)
 │
 ├── [CHECK 1: WEIGHT VALIDATION LOOP]
 │     ├── IF W > GVWR ──────────────────────────────► STATUS: BLOCK [Reason: Chassis Frame Overloaded]
 │     ├── IF F > Front_GAWR ────────────────────────► STATUS: BLOCK [Reason: Front Axle Overload]
 │     └── IF R > Rear_GAWR ─────────────────────────► STATUS: BLOCK [Reason: Rear Axle Overload]
 │
 ├── [CHECK 2: VERTICAL CENTER OF GRAVITY SAFETY GATE]
 │     ├── IF FORD_OFFICIAL_CGV_EQUATIONS_AVAILABLE == TRUE
 │     │     ├── Compute Allowed_CGv_Range = Function(CGh, WB)
 │     │     └── IF CG_v > Allowed_CGv_Range ────────► STATUS: BLOCK [Reason: Dynamic Rollover / Brake Bias Failure]
 │     └── IF FORD_OFFICIAL_CGV_EQUATIONS_AVAILABLE == FALSE
 │           └── STATUS: NEEDS_ENGINEERING_REVIEW / PHYSICAL_TEST_REQUIRED
 │
 └── [CHECK 3: FAILURE MODE COMPLIANCE]
       ├── IF REGEN_ABS_ESC_HANDSHAKE_VALIDATED == FALSE ──► STATUS: BLOCK [Reason: High Risk of Rear-Axle Lockup During Braking Event]
       └── IF HVIL_LOOP_INTERRUPT_TIMING > 200 ────────────► STATUS: BLOCK [Reason: High Voltage Disconnect Latency Exceeds 200ms Limit]

IF ALL CRITERIA CLEARED ──► STATUS: GATE_08_OPEN
Part 6: Physical Verification Steps
Verify Software Platform Branch: Ensure the chosen parameters align with the target donor truck hardware (Platform_001A_Gas or Platform_001B_Diesel).
Perform Baseline Track Width Capture: Measure track parameters directly from the inner-to-outer centerlines of the tires or extract the exact specifications from Ford Pro upfitter publications to fill the Tf and Tr variables.
Execute Live High-Voltage Interlock Loop (HVIL) Interruption Testing: Manually trigger a low-voltage circuit opening at an inverter service plug connector. Measure the exact time delay until the primary pack contactors open to confirm that the high-voltage system disconnects within the safe boundary limits.
Execute Controlled Regenerative Braking Fault Injections: Conduct low-speed test runs on a closed track. Use a safe diagnostic interface to manually force a total inverter shutdown while checking that the stock hydraulic ABS controller catches the brake balance shift without locking up the wheels or causing vehicle instability.
Part 7: Open Gaps & Missing Values Tracker
Verified Wheel Weights: Missing the official scale house printouts for the individual four-corner tires across all operational test states.
Physical Elevation Calculations: Real-world wheel weight numbers from physical vehicle lift testing are required to calculate and verify the vertical center of gravity height.
Supplier Component Center-of-Gravity Data: Missing the verified 3D center of mass coordinate points from the supplier for the high-voltage battery pack assemblies.
