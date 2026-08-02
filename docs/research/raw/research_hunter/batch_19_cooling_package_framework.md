Elektron Build Engine: Thermal Management Framework
Domain Priority Block: 3. Cooling Package Gap Closure System Status: Automated Calculations Suspended. Physical integration and loop configurations are locked under NeedsEngineeringReview or NeedsVerification because they are heavily bound to the pending 800V 4-pack battery array structural confirmation.
The structure below maps the cross-dependencies between the chosen powertrain architecture and the thermal systems needed to survive peak sustained operations (e.g., California's Cajon Pass mountain-grade heat load).
Part 1: High-Voltage Cooling Package Logic & Variable Matrix
This matrix documents the structural parameters required to select heat exchangers, sizing methodologies, pumps, and placement boundaries.
Row: Thermal Layer
Column 1: Required Input Value
Column 2: Current Status
Column 3: Candidate Source Metrics
Column 4: Blocker
Column 5: What Calculation Is Needed
Column 6: What Engineer Must Review
Column 7: Build Engine Status
Battery Cooling Loop
Battery optimal operational temp (25^\circ\text{C} to 35^\circ\text{C}); Max pack heat rejection under continuous discharge.
OPEN
Webasto Pro 40 data: 10\text{ l/min} volumetric flow rate per pack.
Missing total continuous heat generation matrix (kW loss) at maximum sustained C-rate.
Total minimum array loop flow rate: 10\text{ l/min} \times N_{\text{packs}} (or parallel division layout); Heat dissipation \dot{Q} = \dot{m} C_p \Delta T.
Verification of active chiller integration or isolated secondary loop to prevent cell degradation past 55^\circ\text{C}.
NominalAssumption / Halted
Inverter Cooling Loop
Max coolant inlet temp (65^\circ\text{C}); Peak switching losses.
OPEN
Dana TM4 SUMO MD troubleshooting manual: 1200\text{ l/h} (20\text{ l/min}) baseline.
Missing exact internal IGBT heat rejection rate (kW) at peak phase current switching frequencies.
Parallel flow matching; pressure drop curves vs pump head pressure capacity at max system temp.
Thermal isolation strategy since the inverter runs hotter (65^\circ\text{C}) than the battery cells (35^\circ\text{C}).
OpenGap / Halted
Motor Cooling Loop
Continuous thermal equilibrium constraints under full motor torque.
OPEN
Shared/serial fluid jacket with the CO200/SUMO MD inverter loop.
Missing internal permanent magnet thermal limit and long-duration torque-loss curves.
Stator winding thermal dissipation vs oil/glycol jacket heat transfer coefficient coefficients.
Shared cooling routing validation (Inverter \rightarrow Motor serial fluid path vs fully independent parallel path).
NeedsEngineeringReview / Halted
Coolant Flow & Pressure Drop
Total hydraulic loop plumbing lengths on F-450/F-550 chassis rails.
OPEN
Webasto: < 50\text{ mbar} (0.725\text{ psi}) drop per pack. Dana MCU: Max static input pressure limit 30\text{ psi}.
Missing definitive fitting, bend, and physical underbody routing CAD paths.
Total Loop Head Loss: \Delta P_{\text{total}} = \sum \Delta P_{\text{components}} + \Delta P_{\text{piping\_losses}} (Darcy-Weisbach verification).
Safety boundary checks preventing pump cavitation and ensuring pressures stay below the component structural limit of 30\text{ psi}.
OpenGap / Halted
Radiator Sizing
Frontal area packaging profile of Ford F-450/F-550 engine bay.
OPEN
Standard commercial multi-pass high-density aluminum cores.
Missing total combined powertrain heat load output (\dot{Q}_{\text{total}}) under continuous full throttle.
Core sizing vs airflow velocity: A_{\text{frontal}} = \dot{Q} / (U \times \Delta T_{lm} \times \eta_{\text{fin}}).
Air-side flow restrictions and structural clearance relative to low-voltage auxiliary systems.
NominalAssumption / Halted
Pump Sizing
Total loop hydraulic flow requirements (40\text{ l/min}+ combined).
OPEN
Pierburg CWA400 / Davies Craig EWP150 equivalent electric automotive pumps.
Missing complete total system pressure drop calculation at max volumetric flow.
Pump curve matching: Intersection of pump head pressure curve with total loop hydraulic resistance curve.
Operating voltage bounds (12V accessory bus load draw under peak thermal stress cycles).
OpenGap / Halted
Heat Exchanger Sizing
Active chiller capacity for low-temperature battery maintenance.
OPEN
Dual-circuit brazed plate configurations (Refrigerant-to-Liquid Glycol).
Missing vehicle A/C compressor displacement parameters and R134a/R1234yf system capacities.
Heat transfer NTU-effectiveness calculations for cabin priority vs battery priority cooling splits.
Operational modes logic sign-off (Active Chilling vs Passive Radiator bypass pathways).
NeedsEngineeringReview / Halted
Part 2: Critical Environmental Stress Analysis Gaps
1. Thermal Derating & High-Ambient Testing Gaps
The Problem: At ambient temperatures exceeding 45^\circ\text{C}, the Webasto battery packs enter aggressive continuous power throttling to mitigate internal NMC chemistry decomposition. Concurrently, the Dana inverter scales back phase current switching to preserve the silicon/SiC power modules.
Missing Rule Inputs: The exact overlapping slope showing power reduction vs. temperature for both components is completely unmapped in the build engine. Without this curve, the vehicle’s safe operational boundaries remain unknown.
2. Cajon Pass / Mountain-Grade Heavy Heat Load Simulation
The Problem: Sustaining a gross vehicle weight rating (GVWR) haul up a prolonged 6\% to 8\% highway grade at speed demands a prolonged 130\text{ kW} output.
The Blocker: At a continuous 130\text{ kW}, the powertrain creates steady-state heat generation. If the fluid loop cannot dissipate this heat faster than it builds up, the system will hit its thermal limits mid-grade. This forces a protective shutdown down to a lower limp-home power mode, posing a hazard for commercial operation.
3. Underbody Airflow & Fan/Radiator Placement Gaps
The Problem: Converting a traditional F-450/F-550 chassis to an EV changes the engine bay's airflow profile. Removing the mechanical engine fan alters the negative pressure zone behind the front grille.
The Blocker: We must determine whether the radiator stack can remain in the standard front position using high-output electric fans, or if the multi-loop setup requires side-mounted auxiliary cooling modules along the frame rails. Side mounting exposes the system to stagnant air pockets and underbody road debris.
Part 3: Missing Data & Supplier Verification Requirements
To clear the constraints blocking the cooling system design, the following exact metrics must be requested during the powertrain sign-off process:
Webasto Technical Request: "Provide the thermal generation map (Watts of heat rejected to the fluid loop) for the Pro 40 module across its continuous operating spectrum, along with the precise internal cell-to-coolant thermal resistance (\text{K/W})."
Dana TM4 Technical Request: "Provide the exact continuous heat rejection rating (kW) for the CO200 inverter and motor assembly at a sustained 130\text{ kW} load with a 65^\circ\text{C} coolant inlet temperature. Please also share the recommended parallel or serial cooling layout configuration guidelines for this specific core."
Internal Engineering Action: Perform a 3D CAD step-file clearance verification of the F-450/F-550 front engine bay envelope to establish maximum radiator core thickness limits before committing to specific heat exchanger parts.
Part 4: Build Engine Verification Tracker
Battery Target Volumetric Flow Rate (10\text{ l/min} per pack): Validated / RuleInput
Inverter Max Inlet Coolant Gate (65^\circ\text{C}): Validated / RuleInput
Combined System Peak Heat Load Calculations: OPEN / HardBlocked
Pump and Radiator Physical Component Selection: OPEN / Halted
Thermal framework mapped. Awaiting powertrain package confirmation to initiate continuous fluid velocity and heat exchanger calculations.
