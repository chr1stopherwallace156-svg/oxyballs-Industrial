Part 1: Official Supplier Inquiry Framework
To resolve the remaining upstream constraints blocking calculations for the High-Voltage Wiring Package, the formal inquiry below must be submitted to Webasto technical applications engineering.
Subject: Technical Application Engineering Inquiry: Webasto Pro 40 Array Configuration for Dana TM4 SUMO MD Integration (Class 4/5 Truck Conversion)
To: Webasto Commercial Vehicle Battery Systems Engineering CC: [Internal Engineering Project Control]
Project Context & Load Profile: We are finalizing the upstream powertrain package architectural sign-off for a Class 4/5 medium-duty commercial gas-to-EV conversion project. The selected traction drive is a Dana TM4 SUMO MD (HV2100-6P) system. The design validation profile dictates the following continuous and transient DC link inputs:
Continuous Traction Drive Power: 130 kW continuous (unlimited duty cycle)
Peak Traction Drive Power: 250 kW to 265 kW transient peak (30-second duration threshold)
Chassis Energy Capacity Target: \ge 120 kWh nominal footprint floor
System Topology Assessment (Internal Engineering Review): Our preliminary engineering balancing scripts indicate that a standard single-pack configuration is mathematically eliminated. Furthermore, running a 400V 3-pack parallel array via the Vehicle Interface Box (VIB) introduces operational risks, as a 130 kW continuous draw at 333V–350V nominal forces the system to operate at 371A to 390A, exceeding or riding the ragged edge of the VIB's hard continuous thermal/electronic limit of 380A.
To optimize efficiency, minimize copper cross-sectional mass (35\text{ mm}^2 vs. 50\text{ mm}^2), and matches the Dana TM4’s optimal operating voltage envelope (up to 750V–800V DC operating limits), an 800V 4-pack system topology (configured as a 2-series, 2-parallel [2s2p] matrix) is our strongest minimum architectural candidate for formal sign-off.
Explicit Engineering Data Requests: Please provide official supplier application approvals, technical documentation, or engineering manual clarifications for the following eight parameters:
Master Interface Specification (VIB vs. VIG/VIG Plus): For a Dana TM4 SUMO MD load profile pulling 130 kW continuous and 265 kW peak, should the Webasto Standard Battery Pro 40 system be integrated utilizing the Vehicle Interface Box (VIB), or does this boundary necessitate the high-power, unrestricted Vehicle Interface Gateway (VIG) or VIG Plus system architecture?
Recommended Voltage & Array Topology: Does Webasto engineering approve a 2s2p 800V nominal configuration utilizing four (4) Standard Battery Pro 40 modules to satisfy this commercial vehicle performance envelope?
Continuous Discharge Current Rating: What is the certified maximum system-level continuous discharge current rating (A) for the recommended multi-pack array through the selected master interface at a 50^\circ\text{C} localized chassis ambient operating gate?
Peak Transient Discharge Current Profile: What is the certified peak discharge current rating (A) for a 30-second duration window under maximum motor torque demands?
Worst-Case Bolted Short-Circuit Current (I_{sc}): What is the exact internal impedance (\text{m}\Omega) or peak bolted short-circuit fault current (I_{sc}) of the Standard Battery Pro 40 pack at cell-level maximum charge state, including the pass-through resistance of the internal sub-fuses, to allow our engineers to perform downstream I^2t thermal coordination calculations for the main traction fuse selection?
Pre-Charge Interface Requirements: Does the recommended Webasto master interface (VIB/VIG) feature an integrated, automated pre-charge relay and resistor circuit capable of managing the high inrush currents of a large-volume external motor controller, or must the pre-charge sequence time curve (R = t / [5 \times C]) be calculated, designed, and switched externally inside a custom high-voltage Power Distribution Unit (PDU)?
Thermal Derating Matrix & CAN Mappings: Can you provide the proprietary SAE J1939 CAN bus data register addresses mapping the dynamic State-of-Charge (SoC) and temperature-dependent current-limit boundaries transmitted to the vehicle controller?
Cooling Loop Volumetric Matching: Confirm that a standard 10 l/min water/glycol volumetric flow rate (< 50\text{ mbar} pressure drop) per pack remains linear when balanced across the recommended series/parallel manifold layout.
Part 2: Upstream-Downstream Status Mapping
The exact questions embedded within this supplier framework represent the final hard gates for the build engine:
+--------------------------------------------------------------------------------------------------+
|                            BUILD ENGINE RE-LOCK AND DEPENDENCY MAPPING                           |
+--------------------------------------------------------------------------------------------------+
| IF SUPPLIER CONFIRMS:                      | THEN BUILD ENGINE UNLOCKS DOWNSTREAM CALCULATIONS:  |
+--------------------------------------------------------------------------------------------------+
| VIB Selected (380A Continuous Boundary)   | Sets strict maximum continuous ampacity limits.     |
| VIG/VIG Plus Selected (1,215A Continuous) | Eliminates hardware throttling downstream.           |
| Final Short-Circuit Current (I_sc) Provided| Calculates Eaton Bussmann fuse interruption match.  |
| Array Voltage Locked (400V vs. 800V)       | Lock cable insulation class (600V AC vs 1000V DC).   |
| Pre-charge Internal Circuit Confirmed      | Automatically closes "PDU Pre-charge Component" gap.|
+--------------------------------------------------------------------------------------------------+
| ENGINE UPDATE STATE: WAITING ON MANUFACTURER DATA FIELD INPUTS                                   |
+--------------------------------------------------------------------------------------------------+
