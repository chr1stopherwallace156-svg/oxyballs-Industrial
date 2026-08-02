# Elektron Build Engine: Powertrain Compatibility Gate
**Domain Stage Gate:** 2. Powertrain Integration vs. HV Wiring Architecture
**System Status:** Automated Downstream Component Processing Halted. The powertrain coupling metrics below remain under NeedsEngineeringReview and are not marked Confirmed. The calculations below demonstrate the systemic dependency of high-voltage component specifications on the upstream battery and inverter layout.
### Part 1: Powertrain Compatibility Evaluation
#### Technical Formulas Employed:
#### 1. Compatibility Check Analysis
 * **Check 1: Battery Continuous Current vs. Motor Continuous Power:** * The Dana TM4 SUMO MD HV2100-6P traction core requires a continuous power baseline of **130 kW**. 
   * At the Webasto battery pack nominal voltage of **350 Vdc**, the continuous current required by the drive is:
     
   * A single Webasto Standard Battery Pro 40 pack delivers **55 kW** of continuous discharge power (157\text{ A} at 350\text{V}). Therefore, a single pack cannot satisfy the motor's continuous current demand. Paralleling multiple packs through the Vehicle Interface Box (VIB) is structurally required.
 * **Check 2: Battery Peak Current vs. Motor Peak Power:**
   * The Dana TM4 SUMO MD peak power rating is **250 kW** to **265 kW** (depending on model). 
   * Under transient load using a peak power of **265 kW** at a nominal 350\text{ V}, the peak current demand is:
     
   * At a maximum voltage of **400 Vdc** (full charge), the required peak current is:
     
   * A single Webasto pack yields a 10s peak discharge power of **112 kW**. Single-pack architecture is mathematically eliminated.
 * **Check 3: System Voltage Architecture:**
   * The Dana TM4 SUMO MD is configured for high-voltage operational boundaries up to **750 V – 800 V DC**. 
   * While individual Webasto packs possess a nominal voltage of 350\text{ V} (333\text{V} - 407\text{V} window), the Webasto platform can be stacked into series/parallel arrays through intelligent interface infrastructure to configure either a **400V or 800V** architecture. To maximize the efficiency and capabilities of the Dana core, the 800V system topology should be chosen.
 * **Check 4: Webasto VIB System Current Limitation:**
   * **Yes.** The Webasto Vehicle Interface Box (VIB) acts as a physical current bottleneck. The VIB datasheet explicitly limits continuous discharge current to **380 A**. 
   * Because the motor's continuous demand at 350\text{V} is 371.43\text{A} (per pack rail), running an 800V split topology lowers the continuous current draw across the VIB, preventing the system from running near its 380\text{A} electronic trip limit.
 * **Check 5: Number of Pack Modules Required:**
   * **Continuous Power Calculation:** To achieve the motor's 130\text{ kW} continuous rating using 55\text{ kW} packs, a minimum of \lceil 130 / 55 \rceil = \mathbf{3\text{ packs}} are required.
   * **Peak Power Calculation:** To hit the 265\text{ kW} transient vehicle performance peak using 112\text{ kW} peak capacity packs, a minimum of \lceil 265 / 112 \rceil = \mathbf{3\text{ packs}} are required.
   * **Chassis Range Target:** Due to Class 4/5 commercial vehicle duty-cycle loads, a 3-pack arrangement (105 - 120\text{ kWh}) represents the minimum energy floor.
 * **Check 6: Supplier Lifecycle Production Status:**
   * The Webasto Standard Battery Pro 40 and Dana TM4 SUMO MD series are active, **current production commercial systems** optimized for standardized fleet deployments.
### Part 2: Powertrain System Compatibility Matrix
| Parameter / Metric | Webasto CV Battery Pack Spec (Single Pack) | Dana TM4 SUMO MD Motor/Inverter Core | Verification & System Alignment Status |
|---|---|---|---|
| **Nominal Voltage** | 350 Vdc | Up to 750 Vdc – 800 Vdc max limit | MISMATCH if 1s1p. Requires series expansion via VIB to 800V system architecture. |
| **Continuous Power / Current** | 55 kW (~157 A continuous) | 130 kW (~371 A required at 350V) | MISMATCH for a single pack. Requires minimum 3 parallel/series packs to support motor. |
| **Peak Power / Current** | 112 kW (10-second peak) | 250 kW – 265 kW (~757 A required at 350V) | MISMATCH for a single pack. Minimum 3 packs required to prevent cells from entering high-temp derating. |
| **Current Control Interface** | VIB limit = 380A continuous | Dynamic phase-current variable switching | RESTRICTED. Operational continuous draw sits within 97.7% of VIB max safety threshold at 350V. |
#### Mismatch Warnings
 * ⚠️ **Current Bottleneck Threat:** Running the system at a 400V base architecture pushes continuous current loop requirements (371.43\text{ A}) to the ragged edge of the Webasto VIB's hard limit of 380\text{ A}.
 * ⚠️ **Voltage Derating Risks:** If the battery voltage dips toward its minimum threshold (280\text{V} - 333\text{V}), the inverter must pull higher current to fulfill torque maps, triggering overcurrent fault parameters on the main fuse or the contactor.
### Part 3: Open Data Registries & Engineering Tasks
#### 1. Missing Data List (OpenGap)
 * **Dana TM4 Inverter Continuous & Peak DC Input Amperage:** No clear values are listed for the maximum allowable entry currents into the DC bus terminals.
 * **Inverter Internal DC-Link Capacitance:** The precise internal capacitance (\mu\text{F}) value remains unstated on the SUMO MD general technical flier.
 * **Battery Pack Short-Circuit Capacity (I_{sc}):** Complete lack of maximum potential short-circuit current outputs under low-impedance terminal short faults.
#### 2. Supplier Question List
 1. *"What is the absolute maximum DC-link capacitance value (\mu\text{F}) across the positive and negative bus rails inside the Dana TM4 SUMO MD inverter enclosure?"*
 2. *"What is the internal impedance (m$\Omega$) or worst-case bolted short-circuit current (I_{sc}) output of the Webasto Pro 40 module when passing through the integrated Vehicle Interface Box (VIB) assembly?"*
 3. *"Does the Dana TM4 inverter gate driver firmware support a software-controlled passive or active pre-charge sequence, or must the upstream battery junction unit manage the pre-charge time curve externally?"*
#### 3. Build Engine Blocker List
 * **Blocker 01 — Short Circuit Value (I_{sc}):** Main fuse selection cannot determine maximum interrupt ratings.
 * **Blocker 02 — Capacitance Metric (C):** Pre-charge circuit validation calculations are on a hard structural hold.
 * **Blocker 03 — System Voltage Sign-off:** High-voltage cable runs cannot finalize a target outer diameter profile until the series/parallel layout (400V vs. 800V architecture) is locked by human design engineers.
### Part 4: High-Voltage Wiring Unlock Tracking
The validation status of downstream elements depends directly on these upstream parameters:
```
+--------------------------------------------------------------------------------------------------+
|                            HIGH-VOLTAGE WIRING DOWNSTREAM UNLOCK TRACKER                         |
+--------------------------------------------------------------------------------------------------+
| STATUS: PARTIALLY UNLOCKED INFRASTRUCTURE LND                                                    |
|   [UNLOCKED]  Battery Operational Voltage Range (280V - 400V base, scalable to 800V)    |
|   [UNLOCKED]  Candidate Pack Structural Mass & Dimensions (297 kg per Pro 40 module)      |
|   [UNLOCKED]  Cooling Loop Baseline Lane (Water/Glycol flow requirements matching loops)|
|   [UNLOCKED]  Communications Integration Lane (SAE J1939 network configuration profiles)  |
|   [UNLOCKED]  Possible Cable & Connector Minimum Insulation Ratings (Validated to 1000V DC) |
|                                                                                                  |
| STATUS: HARD HALTED (Calculations Blocked via Upstream Blocker Gaps)                            |
|   [BLOCKED]   Exact Cross-Sectional Cable Gauge (35 mm² vs 50 mm² thermal derating layout open)  |
|   [BLOCKED]   Main Overcurrent Fuse Interruption & Part Selection (Awaiting I_sc fault curves)   |
|   [BLOCKED]   Main Traction Contactor Suitability (Awaiting final DC continuous amp confirmation) |
|   [BLOCKED]   Pre-Charge Resistor Value / Energy Absorption Rating (Awaiting µF internal matrix)|
|   [BLOCKED]   Pre-Charge Relay Coil Duty Cycles (Awaiting system logic control confirmation)     |
+--------------------------------------------------------------------------------------------------+

```
*Data payload mapping for this verification gate complete. Handing off to the Powertrain Sign-Off Filter.*
