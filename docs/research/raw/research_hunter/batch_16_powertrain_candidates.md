# Elektron Build Engine: Upstream Powertrain Input Profile
**Domain Priority Block:** 2. Powertrain Design Integration (Upstream Variables Selection)
**System Status:** Halted via Stage-Gate. All technical metrics and component choices extracted below are classified under NeedsEngineeringReview or NeedsVerification status. No entries are marked Confirmed. These variables are gathered as candidate options to unlock the downstream High-Voltage Wiring Package calculations.
### Part 1: Candidate Powertrain Component Data Matrix
This matrix establishes the engineering baselines for a modular Class 4/5 commercial chassis gas-to-electric conversion using commercial vehicle supplier hardware.
```
+----------------------------------------------------------------------------------------------------------+
|                                    CANDIDATE POWERTRAIN TECHNICAL PROFILE                                |
+----------------------------------------------------------------------------------------------------------+
| COMPONENT 1: BATTERY PACK SYSTEM                                                                         |
| Candidate: Webasto CV Standard Battery System (NMC Prismatic) with Vehicle Interface Box (VIB)           |
|                                                                                                          |
|   - Nominal Voltage:                  350 Vdc (~350V nominal per pack; 1sNp topology)                    |
|   - Maximum Voltage:                  400 Vdc (Operational range: 280 V – 400 V per pack)                |
|   - Usable Capacity:                  35 kWh per pack (Scalable up to 10 packs/350 kWh via VIB)          |
|   - Continuous Discharge Current:     150 A (System-level continuous rating at VIB)                      |
|   - Peak Discharge Current:           250 A (System-level 10s transient peak rating at VIB)              |
|   - Short-Circuit / Internal Res.:    [OPEN] - Internal impedance not defined in brochure                |
|   - BMS Diagnostics:                  Integrated BMC/S-Box; cell-level thermal/voltage telemetry         |
|   - Thermal Derating:                 SoC & Temp dependent matrix; standards compliant to LV 123/124    |
|   - Coolant Requirements:             Liquid cooled/heated; 10 l/min flow rate; pressure drop < 50 mbar  |
|   - Pack Mass:                        650 lbs (295 kg) per pack module                                   |
|   - Dimensions (L x W x H):           37.8 x 27.0 x 11.9 in (960 x 686 x 302 mm)                         |
|   - Mounting Requirements:            Rugged housing designed for frame-rail / underbody off-highway     |
|   - CAN Protocol:                     SAE J1939 Architecture via Vehicle Interface Box (VIB)             |
|   - Supplier Status:                  Commercial Production / Standardized Fleet System                  |
|                                                                                                          |
| COMPONENT 2: INVERTER SYSTEM                                                                             |
| Candidate: Dana TM4 SUMO MD Inverter (Integrated with Outer Rotor PM Motor Core)                         |
|                                                                                                          |
|   - DC Input Voltage Range:           Up to 750V / 800V DC Max Operating Limits                          |
|   - Continuous DC Input Current:      [OPEN] - AC Phase current optimized; exact continuous DC bus A open |
|   - Peak DC Input Current:            [OPEN] - Transient maximum DC bus input limits unlisted            |
|   - Phase Current:                    Variable switching frequency; multi-phase (3-phase or 6-phase)     |
|   - DC-Link Capacitance:              [OPEN] - Internal capacitance (µF) rating not declared in flyer     |
|   - Thermal Derating:                 Max coolant inlet 65°C; de-rates linearly past baseline limits     |
|   - Coolant Requirements:             Water/Glycol mixture (40/60 ratio)                                 |
|   - Pre-Charge Requirements:          Integrated Pre-charge circuit validation within matching S-Box     |
|   - CAN Protocol:                     J1939 compliant tracking registers                                 |
|   - Fault Outputs:                    Reflex gate driver fault protection, overcurrent, overtemp flags |
|                                                                                                          |
| COMPONENT 3: TRACTION MOTOR                                                                              |
| Candidate: Dana TM4 SUMO MD HV2100-6P Permanent Magnet Motor                                             |
|                                                                                                          |
|   - Continuous Power:                 130 kW (Indefinite operating boundary)                             |
|   - Peak Power:                       250 kW / 265 kW (Transient peak curve)                             |
|   - Continuous Torque:                685 Nm                                                             |
|   - Peak Torque:                      2150 Nm / 3320 Nm (Direct drive configuration, no gearbox required)|
|   - Max RPM:                          3500 RPM / 3700 RPM operating limit                                |
|   - Cooling Requirements:             Liquid cooled via inverter loop; 65°C maximum inlet temperature     |
|   - Mass:                             [OPEN] - Exact dry mass unpopulated on core spec sheet             |
|   - Mounting Requirements:            Direct interface to standard rear differentials or e-axles         |
|   - Duty-Cycle Limits:                30-second peak power duration limit                                |
+----------------------------------------------------------------------------------------------------------+
| UPDATE CRITERIA LOG: COUPLING VERIFICATION PENDING BY DIRECT DESIGN ENGINEER                             |
+----------------------------------------------------------------------------------------------------------+

```
### Part 2: Missing Data & Unresolved Field Registries (OpenGap)
The following highly specific datasheet values are missing and are required to transition the build data state from candidate parameters to locked specifications:
 * **Battery Internal Short-Circuit Capacity (I_{sc}):** **NeedsExactSource**. The absolute fault delivery current (I_{sc}) under a direct terminal weld condition is unlisted in the standard product manual.
 * **Inverter Internal DC-Link Capacitance (C):** **NeedsExactSource**. The precise internal common-mode and differential-mode capacitance rating (measured in \mu\text{F}) for the Dana TM4 SUMO MD inverter core is missing.
 * **Continuous and Peak DC Bus Input Amperage:** **OpenGap**. While phase AC output currents are managed via variable switching frequencies, the exact steady-state and peak DC current draw limits pulled from the battery rails are unpopulated.
 * **Physical Motor Mass:** **OpenGap**. The total structural weight contribution of the SUMO MD traction casing is open, blocking secondary suspension and axle load calculations.
### Part 3: Downstream Variables Unlocked by Powertrain Input Profile
Once the human engineering authority completes a review and advances the statuses of these parameters to Confirmed, the following downstream variables can be calculated by the engine:
 1. **HV Cable Gauge Selection (35\text{ mm}^2\text{ vs } 50\text{ mm}^2):** Unlocked via the Webasto continuous load profile (150\text{A} continuous, 250\text{A} peak) cross-referenced against the physical routing length on the F-450/F-550 frame rail.
 2. **HV Connector Shell Rating:** Unlocked via the peak system boundaries (250\text{A} current cap at 400\text{V} Max DC), which sets the 180A vs. 250A Radsok pin terminal size boundary.
 3. **Main Traction Fuse Sizing:** Unlocked by calculating the clearance margin above the 250\text{A} 10s peak current profile, ensuring the fuse does not exceed its I^2t thermal threshold while still opening reliably below the battery short-circuit fault current (I_{sc}).
 4. **Pre-Charge Resistor Sizing (R and Joules):** Unlocked via the formula R = t / (5 \times C) using the inverter capacitance value (C), a target pre-charge time (t), and the 400\text{V} maximum pack potential to find the single-pulse adiabatic energy handling limit (E = 0.5 \times C \times U^2).
 5. **Main Contactor Selection:** Unlocked by verifying that the 250\text{A} peak current limits and 400\text{V} potential fall safely within the contactor's life curves and do not exceed its 650\text{A} maximum closing transient limit.
### Part 4: Build Engine Verification Status Tracker
 * **Webasto Pack Nominal/Max Voltage:** NeedsEngineeringReview / NominalAssumption
 * **Webasto Pack Peak Discharge Current (250A):** NeedsEngineeringReview / RuleInput
 * **Dana TM4 Motor Power Framework (130kW/250kW):** NeedsEngineeringReview / RuleInput
 * **Inverter DC-Link Capacitance Metric:** OpenGap / Halted
 * **Battery Short-Circuit Fault Threshold:** OpenGap / Halted
*Data payload mapping for this domain complete. Awaiting specific supplier internal engineering manual uploads to clear core capacitance and short circuit boundaries.*
