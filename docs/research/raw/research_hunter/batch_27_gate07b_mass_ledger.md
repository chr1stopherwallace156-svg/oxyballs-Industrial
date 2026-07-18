Part 1: The Blocked Questions Ledger
Gate
Question
Supplier/Expert Needed
Why It Matters
What Calculation It Unlocks
Current Status
Follow-Up Date
Alternative Research Allowed
07B
Vin-specific production baseline curb weights for individual front/rear tire tracks before upfitting
Donor Truck Scale Station
Overrides generalized catalog specifications with unladen truth data.
Absolute calculation of initial mechanical moment-arms around the front axle centerline.
NeedsScaleData
Pre-teardown
NominalAssumption engineering guide metrics.
07B
Precise physical center-of-gravity (X, Y, Z coordinate markers) for the high-voltage battery cell carrier frame
Pack Structural Fabricator
Direct tracking of structural moment forces acting on the side frame rails.
Final physical calculations for vehicle pitch-moment stability and rollover tracking.
NeedsEngineeringReview
Mid-build
CAD layout geometry uniform density approximation models.
Part 2: Clean Build Engine Status
Gate 07B — Weight / Axle Load / Center of Gravity v0.2
Known:
Estimates derived from manufacturer datasheets or packaging configurations are treated strictly as a NominalAssumption.
Physical scale-house printouts represent the only acceptable vehicle validation metric.
Exceeding OEM-certified GVWR, front GAWR, rear GAWR, or structural wheel/tire capacity ratings triggers a complete design rejection.
Still Blocked:
Physical, three-pad certified scale ticket printouts for the designated donor chassis cab.
Empirical, component-by-component scale verification tracking weights of stripped sub-assemblies.
Final physical assembly scale verification.
Part 3: Removed / Added Mass Ledger Framework
Every individual line item added to or removed from the chassis cab structural architecture must be documented precisely using this formal tracing matrix.
Section A: Removed Mass Sub-System Tracker
[System Code: RM-01]
Component Category: Engine Assembly (Dressed 6.7L Power Stroke V8 Diesel, including turbochargers, manifolds, and initial accessories)
Measurement Method: Heavy-duty engine hoist load cell crane scale (suspended tare configuration)
Data Classification: NominalAssumption (Target baseline: ~1,100 lbs / 499 kg wet)
Axle Moment Relationship: Front axle overhang moment offset factor (located forward of or directly spanning front wheel centerline)
Verification Status: OpenGap

[System Code: RM-02]
Component Category: Transmission & Torque Converter Assembly (TorqShift 10R140 10-speed automatic with fluid)
Measurement Method: Hydraulic transmission jack flat-bed platform scale check
Data Classification: NominalAssumption (Target baseline: ~350 lbs / 159 kg)
Axle Moment Relationship: Mid-chassis center span moment distribution dividing load between front and rear axle tracks
Verification Status: OpenGap

[System Code: RM-03]
Component Category: Fuel Storage System (Main tank, tank brackets, remaining ultra-low sulfur diesel fuel mass)
Measurement Method: Single-point floor scale verification after full system draining procedure
Data Classification: NominalAssumption (Varies widely by wheelbase configuration; typically 250–350 lbs combined)
Axle Moment Relationship: Predominantly acts as a high concentration load force over the rear axle assembly
Verification Status: OpenGap

[System Code: RM-04]
Component Category: Exhaust Aftertreatment Infrastructure (SCR catalyst, Diesel Particulate Filter (DPF), muffler, and tailpipes)
Measurement Method: Component floor scale tracking
Data Classification: NominalAssumption (Target baseline: ~150–200 lbs)
Axle Moment Relationship: Asymmetric side-rail frame loading, heavily biased behind the passenger cab envelope
Verification Status: OpenGap

[System Code: RM-05]
Component Category: Engine Cooling Packages (Primary radiatiors, charge-air coolers, fan shroud assembly, and engine oil cooling blocks)
Measurement Method: Dry component weighing plus calculation of drained fluid weight
Data Classification: NominalAssumption (Target baseline: ~120 lbs)
Axle Moment Relationship: Absolute forward-most front axle moment arm force multiplier
Verification Status: OpenGap

[System Code: RM-06]
Component Category: Diesel Exhaust Fluid (DEF) Sub-system (DEF tank, fluid content, mounting brackets, and injection lines)
Measurement Method: Floor scale checkout
Data Classification: NominalAssumption (Target baseline: ~50–70 lbs)
Axle Moment Relationship: Localized rear axle sector structural load point
Verification Status: OpenGap
Section B: Added Mass Sub-System Tracker
[System Code: AM-01]
Component Category: High-Voltage Battery Enclosure Modules (Cells, internal busbars, thermal plates, and structural box protection frames)
Measurement Method: Overhead multi-point hoist load-cell check prior to frame installation
Data Classification: NominalAssumption (To be populated directly from final tier-1 supplier engineering documentation)
Axle Moment Relationship: Rigid mid-rail moment-arm application; distributed evenly across frame webs based on center of mass offset
Verification Status: NeedsSupplierData

[System Code: AM-02]
Component Category: Electric Drive Unit (EDU / Traction Motor & Integrated Reduction Gearset)
Measurement Method: Industrial platform shipping scale
Data Classification: NominalAssumption (Supplier specification target sheet check)
Axle Moment Relationship: Fixed placement calculations relative to permanent frame cross-members
Verification Status: OpenGap

[System Code: AM-03]
Component Category: Traction Inverter & Power Electronics (Inverter, DC-DC converters, PDU blocks)
Measurement Method: Desktop precision component scale check
Data Classification: NominalAssumption
Axle Moment Relationship: Distributed front bay layout profile
Verification Status: OpenGap

[System Code: AM-04]
Component Category: Auxiliary Thermal Management Infrastructure (Chillers, EV pumps, coolant lines, and specialized cabin climate heat exchangers)
Measurement Method: Component dry mass verification plus complete fluid volume density calculation
Data Classification: NominalAssumption
Axle Moment Relationship: Front-bay engine room structural loading area
Verification Status: OpenGap

[System Code: AM-05]
Component Category: Low-Voltage Power Buffer & Network Hardware (EHPS backup battery buffer packs / Ultracapacitor arrays)
Measurement Method: Floor scale check
Data Classification: NominalAssumption
Axle Moment Relationship: Under-cab or mid-chassis frame cavity loading
Verification Status: OpenGap
Part 4: Standardized Automotive Scale-Ticket Procedure
A rigorous verification sequence consisting of three mandatory phases is established to track the structural center-of-gravity shifts and cross-axle load distributions.
                     [ FRONT CENTERLINE ]                       [ REAR CENTERLINE ]
                             │                                          │
    ◄─── FRONT OVERHANG ────►│◄────────────── WHEELBASE (WB) ──────────►│◄── REAR OVERHANG ──►
                             │                                          │
                             ▼                                          ▼
                      ┌──────────────┐                           ┌──────────────┐
                      │  PAD 1 ONLY  │                           │  PAD 2 ONLY  │
                      └──────────────┘                           └────────Vest──┘
                             ▲                                          ▲
                             └────────────── TOTAL VEHICLE ─────────────┘
                                        [ COMBINED PAD 1 + 2 ]
Phase 1: Pre-Teardown Verification Checklist (Baseline State)
Execution Step 1: Drive the complete, operational donor truck onto a certified three-pad vehicle scale assembly. Ensure the fluid levels (such as fuel, coolant, and DEF) are fully topped off to mimic maximum possible unladen operating conditions.
Execution Step 2: Isolate and log the standalone Front Axle Baseline Curb Weight on Pad 1.
Execution Step 3: Isolate and log the standalone Rear Axle Baseline Curb Weight on Pad 2.
Execution Step 4: Record the combined total baseline mass output. Verify that the sum of Pad 1 and Pad 2 matches the total scale printout exactly to ensure measurement integrity.
Execution Step 5: Perform a full physical capture of the door-jamb federal safety labels. Document the exact VIN-specific GVWR, Front GAWR, and Rear GAWR figures into the engineering record.
Phase 2: Post-Teardown Structural Verification Checklist (Stripped State)
Execution Step 1: Following the complete removal of all designated ICE components (tracked under System Codes RM-01 through RM-06), return the bare rolling chassis to the certified scales.
Execution Step 2: Log the stripped front-axle load track profile on Pad 1 to determine the baseline weight removal bias.
Execution Step 3: Log the stripped rear-axle load track profile on Pad 2.
Execution Step 4: Subtract the stripped weight metrics from the baseline metrics to cross-verify the actual physical mass removed against the individual line-item tracking sheets.
Phase 3: Post-Final Build Compliance Gate (Completed EV State)
Execution Step 1: Roll the fully converted EV truck chassis (including all added powertrain modules, high-voltage battery enclosures, upfits, and operational fluid loops) onto the certified multi-pad scale network.
Execution Step 2: Capture the final Front Axle Converted Weight on Pad 1.
Execution Step 3: Capture the final Rear Axle Converted Weight on Pad 2.
Execution Step 4: Generate and log the official Total Certified EV Vehicle Mass from the combined scale values.
Execution Step 5: Execute the final safety evaluation:
Check A: Confirm that the final Front Axle Weight does not exceed the Front GAWR door-label threshold.
Check B: Confirm that the final Rear Axle Weight does not exceed the Rear GAWR door-label threshold.
Check C: Confirm that the overall Total Certified EV Vehicle Mass remains strictly below the master vehicle GVWR limit.
Part 5: Open Gaps & Missing Values Tracker
The parameters below remain unverified and must be addressed using direct physical vehicle measurements or field testing data before structural layouts can be finalized:
Physical Scale Verification: Obtaining official, stamped printouts from a certified scale facility to validate all baseline, intermediate, and final vehicle weight parameters.
Exact Component Scale Data: Capturing the actual physical weights of the removed diesel engine block and transmission via precision load-cell crane tracking.
Supplier Component Weight Tracking: Obtaining finalized assembly weight specifications from the tier-1 suppliers for the high-voltage battery modules and the primary traction drive units.
