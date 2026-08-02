Part 1: Scientific, Academic, & OEM Engineering Registries
The values and engineering behaviors captured below establish the technical parameters for the current engineering phase:
1. Medium-Duty Electro-Hydraulic Power Steering (EHPS) Performance Architecture
Title: Powerful, Flexible, Compact! - ZF Race Engineering Factsheet EPHS MPU 100-C
URL: [https://www.zf.com/products/media/zfraceengineering/about_us_3/downloads_9/ZF_RE_Factsheet_EPHS-MPU-100-C_EN_001508000140_Screen.pdf](https://www.zf.com/products/media/zfraceengineering/about_us_3/downloads_9/ZF_RE_Factsheet_EPHS-MPU-100-C_EN_001508000140_Screen.pdf)
Source Type: OEM Supplier Product Datasheet
Page/Section/Table: Page 1, Technical Specifications Table & Performance Mapping Text
Context Type: Supplier-specific (ZF Friedrichshafen AG)
Pressure Rating: 1,638.9\text{ PSI to }1,805.7\text{ PSI} (113\text{ bar to }124.5\text{ bar}) max operating/relief limit.
Flow Rating: 1.32\text{ GPM to }3.17\text{ GPM} (5\text{ to }12\text{ L/min}) variable speed delivery.
Current Draw: Peak transient drawing limits estimated up to 90\text{A}–110\text{A} at max pressure boundaries (12\text{V} nominal configuration).
Duty Cycle: Designed for commercial vehicle validation, with thermal tracking optimized by on-demand motor speed control.
Exact Quote: Flexible flow rate from 5 to 12 l/min at variable speeds ranging from 2,500 to 6,000 rpm. Operating pressure of 113 to 124.5 bar.
Claim Supported: Advanced, brushless-motor EHPS units can modulate flow up to 3.17\text{ GPM} and pressures up to 1,805\text{ PSI}, matching the flow limits of typical mid-tier mechanical utility pumps.
Build Engine Impact: Metric / Rule
Verification Status: ModelingFramework
Missing Data Still Needed: Exact current-versus-pressure performance maps, explicit duty cycle time limits under continuous deadhead loading, and detailed fault code structures.
2. Factory Ford Power Steering/Hydroboost Pressure Threshold Baseline
Title: CII Power Steering Pump Replacement For Ford Vehicles - Dual Return Reservoir
URL: [https://leepowersteering.com/products/cii-power-steering-pump-replacement-r-metric](https://leepowersteering.com/products/cii-power-steering-pump-replacement-r-metric)
Source Type: Heavy-Duty Hydraulic Component Technical Specification
Page/Section/Table: Component Fitment Index, Part #PUMP-CII-HB
Context Type: Ford-specific and Supplier-specific
Pressure Rating: 1,750\text{ PSI} (120.6\text{ bar}) max relief pressure.
Flow Rating: 3.25\text{ GPM} (12.3\text{ L/min}) nominal displacement.
Current Draw: Not applicable (Mechanical input drive).
Duty Cycle: 100\% Continuous Engine-Driven Mechanical.
Exact Quote: Dual Return Reservoir for Gearbox with Hydro Boost: 1750PSI / 3.25GPM / 16x1.5MM Hose - Lee Part #PUMP-CII-HB (METRIC)
Claim Supported: The stock engine-driven infrastructure uses a 1,750\text{ PSI} structural relief setting and a 3.25\text{ GPM} flow target to safely supply the combined requirements of the steering gear and hydroboost circuit under heavy vehicle loads.
Build Engine Impact: Rule / Metric
Verification Status: ModelingFramework
Missing Data Still Needed: Precise mechanical pump efficiency curves across the low engine idle spectrum (650\text{ RPM} to 1,000\text{ RPM}).
Part 2: Upstream-Downstream Logic Linkages
+--------------------------------------------------------------------------------------------------+
|                            EHPS FULL-SYSTEM MECHANICAL INTEGRATION BALANCING                      |
+--------------------------------------------------------------------------------------------------+
| SYSTEM CONSTRAINT MAPPING:                                                                       |
| - Ford Baseline Requirement: 3.25 GPM at 1,750 PSI to avoid simultaneous starvation.             |
| - Candidate Unit (ZF MPU 100-C): Delivers up to 3.17 GPM at 1,805 PSI via 6,000 RPM CAN control. |
+--------------------------------------------------------------------------------------------------+
| DOWNSTREAM POWER LOAD CASCADE:                                                                   |
| - Running the ZF MPU at maximum capacity requires substantial electrical power.                  |
| - Fluid power calculations show that supplying ~3.2 GPM at over 1,700 PSI requires around        |
|   2.5 kW to 3.3 kW of raw mechanical shaft power.                                                |
| - On a standard low-voltage 12V bus, this draws approximately 250A to 300A during peak lock-to-  |
|   lock steering maneuvers or sudden panic stops.                                                 |
| - This massive peak current draw mandates scaling up the 800V-to-12V DC-DC converter             |
|   (Block 2 / Gate 01) or incorporating a dedicated auxiliary ultra-capacitor assembly.            |
+--------------------------------------------------------------------------------------------------+
Part 3: Supplier Verification & Engineering Inquiries
To fill the remaining open gaps for Gate 04, the following official inquiries have been prepared for technical submission to the component manufacturer and steering/OEM experts:
Technical Inquiry Packet: ZF Race Engineering (EPHS MPU 100-C Application Review)
Current Draw vs. Pressure and Flow: Can you provide a complete engineering chart mapping electric current draw (\text{Amperes}) against operating pressures from 0\text{ to }124.5\text{ bar} across distinct flow steps (5\text{, }8\text{, and }12\text{ L/min})?
Max Continuous Current: What is the maximum continuous current rating (\text{A}) under steady-state operation at an ambient fluid temperature of 80^{\circ}\text{C}?
Max Peak Current and Duration: What is the absolute peak current draw during system pressure relief deadhead conditions (124.5\text{ bar}), and what is the maximum safe electronic duration (\text{milliseconds}) for this peak before over-current tripping occurs?
Duty Cycle at Maximum Limits: What is the maximum allowable continuous run-time or percentage duty cycle when operating at a full flow rate of 12\text{ L/min} and maximum pressure of 124.5\text{ bar}?
Thermal Derating Curve: Can you share the internal temperature-versus-performance derating curves showing exactly when and how much the system limits motor RPM or output pressure to protect internal electronics?
Hydroboost Co-Braking Approval: Is this specific EPHS module approved for applications that combine hydraulic brake assist (hydroboost) with a mechanical steering gear, where rapid pedal travel can cause sharp, sudden drops in fluid volume?
Simultaneous Transient Load Support: Can the internal control processor adapt its speed fast enough to prevent a loss of steering feel if a driver applies maximum braking pressure while turning the steering wheel lock-to-lock?
Plumbing and Fluid Requirements: What are the factory requirements for the minimum fluid reservoir volume, low-pressure return line hose diameter, high-pressure fitting threads, and approved hydraulic fluid types?
Fault Outputs & Diagnostic Interface: Can you provide the CAN bus database file (.dbc) outlining the diagnostic trouble codes (DTCs), thermal warning flags, and internal sensor feedback signals?
Electrical Protection Architecture: What are the recommended sizing specifications for the main circuit fuse, system control relay, and low-voltage power supply wiring gauge?
Technical Inquiry Packet: Ford Fleet / Lee Power Steering / Specialist Group
2020–2026 Factory Pump Profile: What are the exact factory flow-versus-RPM curves and maximum pressure relief limits for the mechanical pump used on 2020–2026 Ford F-450/F-550 trucks?
Steering Gear Demand Limits: What are the peak flow (\text{GPM}) and pressure (\text{PSI}) requirements for the F-450/F-550 steering box during low-speed maneuvering at maximum front Gross Axle Weight Rating (GAWR)?
Hydroboost Consumption Rate: What is the maximum fluid volume displacement (\text{cm}^3) required by the hydroboost cylinder during a sudden, fast panic brake application?
Return Line Backpressure Limits: What is the maximum allowable backpressure (\text{PSI}) in the low-pressure return lines before it causes fluid to bypass internal seals or affects how quickly the brake pedal returns?
Accumulator Energy Capacity: What is the exact internal volume and nitrogen gas pre-charge pressure of the factory hydroboost accumulator cylinder used on Class 4/5 trucks?
Part 4: Open Gaps & Missing Values Tracker
The parameters below remain unverified and must be addressed using supplier responses or field testing data before finalizing system designs:
ZF Current-vs-Pressure Map: Sourced manufacturer engineering charts detailing input amperage across all operating pressures.
ZF Duty Cycle at Max Pressure / Max Flow: Documented operational limits when running at continuous high-pressure bounds.
ZF Thermal Derating Curve: Performance scaling charts based on rising internal component temperatures.
ZF Controller/Fault Outputs: Complete CAN bus message matrix and diagnostic trouble code definitions.
Proof of Simultaneous Feeding: Physical testing or supplier confirmation proving the unit can supply both systems without fluid starvation.
Ford Exact F-450/F-550 Pump Curve: Factory performance charts across the entire engine operating RPM range.
Ford Steering Gear Flow/Pressure Requirement: Minimum fluid parameters needed to avoid heavy spots in the steering during tight maneuvers.
Hydroboost Accumulator Reserve Capacity: Measurable volume available for power-off emergency braking stops.
Manual Steering Torque Without Assist: Physical rotational force required to turn the steering wheel if hydraulic pressure drops completely.
12V DC-DC Sizing and Buffer Strategy: Electrical integration layout to safely manage high-amp steering transients without voltage drops.
FMVSS 105 Brake Test Mapping: Explicit stopping distances and deceleration targets required for a modified Class 4/5 chassis.
Loaded Low-Speed Steering Test Procedure: Field validation rules to verify steering performance under maximum weight loads at slow speeds.
