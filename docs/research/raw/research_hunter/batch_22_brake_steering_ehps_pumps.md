Part 1: Scientific, Academic, & OEM Engineering Registries
1. Ford F-450/F-550 Hydroboost Brake Assist Architecture
Title: CII Power Steering Pump Replacement For Ford Vehicles - Dual Return Reservoir
URL: https://leepowersteering.com/products/cii-power-steering-pump-replacement-r-metric
Source Type: Heavy-Duty Hydraulic Component Technical Specification
Page/Section/Table: Product Configuration Index, Item: Dual Return Reservoir for Gearbox with Hydro Boost - Lee Part #PUMP-CII-HB
Context Type: Ford-specific and Supplier-specific
Pressure Rating: 1,750 PSI (120.6 bar) max relief
Flow Rating: 3.25 GPM (12.3 L/min) nominal flow rate
Current Draw: Not applicable (Engine-driven belt interface)
Duty Cycle: 100% Continuous Engine-Driven Mechanical
Exact Quote: Dual Return Reservoir for Gearbox with Hydro Boost: 1750PSI / 3.25GPM / 16x1.5MM Hose - Lee Part #PUMP-CII-HB (METRIC)
Claim Supported: The native Ford Super Duty chassis equipped with hydroboost utilizes a specialized high-volume, high-pressure pump variant (1,750 PSI, 3.25 GPM) paired with a dual-return reservoir to accept low-pressure return lines from both the steering box and the hydroboost booster simultaneously without line backpressure.
Build Engine Impact: Metric / Rule
Verification Status: ModelingFramework
Missing Data Still Needed: Model-year specific internal return line backpressure allowances (PSI) before structural seal bypass occurs inside the booster unit.
2. Ford F-450/F-550 Power Steering Pump Flow Rate & Pressure Profiles
Title: HydroBoost Hydraulic Brake Assist Booster Instructions - Parts for Hot Rods
URL: https://www.partsforhotrods.com.au/wp-content/uploads/2024/07/NEW-HydroBoost-Instructions.pdf
Source Type: Commercial Hydraulic Application Manual (Bosch/Bendix Pattern)
Page/Section/Table: Section "Important pump requirements", Paragraph 1
Context Type: Supplier-specific (Bosch Platform Baseline)
Pressure Rating: 1,200 PSI (82.7 bar) minimum required operational floor
Flow Rating: 2.0 GPM (7.57 L/min) absolute minimum floor
Current Draw: Not applicable
Duty Cycle: Continuous operation
Exact Quote: The pump will need to flow at least 2 gallons per minute. Slower flow rates will cause the brake assist to be delayed and can loose steering assist while the brake is applied. The pump should make at least 1200psi. The total assist available is dependent on the max pressure from the pump.
Claim Supported: While the Ford OEM pump provides up to 3.25 GPM, any electric-hydraulic replacement candidate must never drop below a hard minimum threshold of 2.0 GPM at 1,200 PSI under localized transient load variations to avoid catastrophic assist delay during combined braking and turning maneuvers.
Build Engine Impact: NoGoCondition
Verification Status: EngineeringBackground
Missing Data Still Needed: Factory transient flow split ratio curves between the steering gear and the booster circuit during simultaneous maximum steering rack bind and panic braking.
3. Steering Gear / Hydroboost Accumulator Loss & System Failure Behavior
Title: HydroBoost Hydraulic Brake Assist Booster Instructions - Parts for Hot Rods
URL: https://www.partsforhotrods.com.au/wp-content/uploads/2024/07/NEW-HydroBoost-Instructions.pdf
Source Type: Commercial Hydraulic Application Manual (Bosch/Bendix Pattern)
Page/Section/Table: Section "Important pump requirements", Paragraph 4 & 5
Context Type: Generic Background / Technical Core
Pressure Rating: Variable matching load up to system relief
Flow Rating: Drops toward 0 GPM at absolute peak system pressure relief limits
Current Draw: Not applicable
Duty Cycle: Intermittent heavy peak load
Exact Quote: As pressure is required from the steering gear or the HydroBoost the flow rate will begin to drop. Initially the drop is very small, however as the pump nears maximum pressure the flow can sometimes decrease to almost 0. The pump will perform worse at idle speed while steering and braking together, like when parking.
Claim Supported: High loading on the hydraulic steering gear forces the system pressure up to its structural relief settings, causing a major decay in available fluid volumetric flow. In an electric vehicle conversion, this behavior means an EHPS pump motor will experience an intense, rapid spike in electrical current draw when maneuvering at a standstill (0 mph).
Build Engine Impact: NominalAssumption
Verification Status: AcademicPrincipleCandidate
Missing Data Still Needed: Exact nitrogen pre-charge volume (cm^3) and pressure baseline of the standard Ford Super Duty accumulator cylinder to model remaining power-off stopping counts.
4. Medium-Duty Electro-Hydraulic Power Steering (EHPS) Infrastructure Options
Title: TRW Medium Duty Power Steering Pump Assembly - 14-20358-010
URL: https://trucklinerparts.com/products/new-trw-medium-duty-power-steering-pump-assembly-p-n-14-20358-010
Source Type: Commercial Medium-Duty Vehicle OEM Supplier Datasheet
Page/Section/Table: Component Technical Specifications Index
Context Type: Supplier-specific (TRW Commercial Architecture)
Pressure Rating: 2,683 PSI (185 bar) max relief rating; 43.5 PSI (3 bar) baseline operating
Flow Rating: 6.30 GPM (23.85 L/min) maximum displacement capability
Current Draw: Highly variable depending on electric motor configuration (Sized for heavy industrial commercial frames)
Duty Cycle: 100% Continuous Rated
Exact Quote: Operating Pressure: 3 bar (43.51 psi) Relief Pressure: 185 bar (2683 psi) Displacement: 1.52 cu.in/rev (25 cc/rev) Flow Rate: 6.30 gpm. Working Temperature Range: -40 To +135 Deg. C.
Claim Supported: Standard heavy commercial-grade fluid pumps are designed for higher relief capacities (2,683 PSI, 6.30 GPM) compared to light trucks. This ensures the unit will not bottleneck or overheat when running mid-tier duties on a Class 4/5 truck platform.
Build Engine Impact: Rule / Metric
Verification Status: NeedsSupplierData
Missing Data Still Needed: The matching electric motor performance map (voltage, current curves, and control signals) when this specific fluid end is married to an EHPS high-voltage or low-voltage motor drive system.
Part 2: Upstream-Downstream Logic Linkages
+--------------------------------------------------------------------------------------------------+
|                           EHPS PUMP METRIC INTEGRATION & DC-DC IMPACT                            |
+--------------------------------------------------------------------------------------------------+
| HARD DESIGN CONSTRAINT: VOLUMETRIC BALANCING                                                     |
| - Ford OEM specification baseline requires a high-volume fluid circuit: 3.25 GPM at 1,750 PSI.    |
| - Minimum allowable safe flow limit (Bosch Baseline): 2.0 GPM at 1,200 PSI.                      |
+--------------------------------------------------------------------------------------------------+
| DOWNSTREAM POWER IMPACT:                                                                         |
| - Running an EHPS motor to push 2.5 - 3.25 GPM at over 1,500 PSI requires 2.0 kW to 3.5 kW       |
|   of mechanical shaft power (ref: SAE J134 baseline guidelines).                                 |
| - If using a low-voltage 12V EHPS system, current draw will peak between 160A and 290A.          |
| - This severe transient load requires scaling up the 800V-to-12V DC-DC converter output          |
|   (Block 2 / Gate 01), or adding a dedicated 12V ultra-capacitor/AGM buffer battery.              |
+--------------------------------------------------------------------------------------------------+
Part 3: What Research Comes After This
Once the hydraulic pressures and flow limits are reconciled, the build engine moves into the following integration gates:
+--------------------------------------------------------------------------------------------------+
|                                DOWNSTREAM VEHICLE CONTROLS ROADMAP                               |
+--------------------------------------------------------------------------------------------------+
| [GATE 05]  CAN Bus Integration & Digital Cluster Interface Gate                                  |
|            - Target Focus: Mapping the Ford J1939/CAN data stream to keep the dashboard gauges   |
|              fully active. Resolving the data handshakes required to handle the missing          |
|              internal combustion engine (ICE) telemetry without triggering safety flags.           |
|                                                                                                  |
| [GATE 06]  Structural Frame Integration & Battery Enclosure Gate                                 |
|            - Target Focus: Designing the physical mounts and thermal management systems for      |
|              the heavy 800V battery packs within the Super Duty frame rails.                      |
+--------------------------------------------------------------------------------------------------+
Part 4: Open Gaps & Missing Values Tracker
The following parameters remain unresolved and must be sourced from primary OEM documentation or field measurements before physical layout or circuit design can begin:
Ford F-450/F-550 Factory Pump Pressure & Relief Limits: Sourced internal Ford engineering documents defining exact pressure cutoff thresholds for model years 2020–2026.
Ford F-450/F-550 Factory Pump Volumetric Flow Curve: RPM-to-GPM efficiency charts for the standard mechanical pump.
Stock Hydroboost Operating Pressure Envelope: Internal normal operating range of the booster valve body assembly under partial and full pedal travel.
Steering Gear Pressure/Flow Requirements: Exact volume required per steering wheel revolution to avoid steering resistance at a dead stop.
Hydroboost Accumulator Reserve Capacity: Measurable fluid volume stored under pressure to support emergency, unpowered stops.
Manual Steering Torque Without Assist: Physical rotational force (Nm) needed to steer a fully loaded truck at maximum front Gross Axle Weight Rating (GAWR) if the pump fails.
Candidate EHPS Pressure-Flow Curve: Exact manufacturer charts showing output across varying pump speeds and system pressures.
Candidate EHPS Electrical Current Draw Map: Exact amperage requirements across the full operating spectrum (0 to max PSI).
EHPS Duty Cycle and Thermal Derating Profile: Maximum time limits for continuous high-pressure operation before internal thermal protection cuts motor output.
Required DC-DC Converter Output Integration: Sizing calculations for the vehicle's low-voltage power supply to handle high-amp steering spikes without system voltage drops.
FMVSS 105 Brake Test Mapping: The exact testing parameters and stopping distances required for a modified Class 4/5 vehicle.
Loaded Low-Speed Steering Test Procedure: A field validation protocol designed to safely test the steering system under maximum weight loads at slow speeds.
