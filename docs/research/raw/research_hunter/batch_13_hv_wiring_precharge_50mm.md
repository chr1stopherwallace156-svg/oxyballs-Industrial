# Elektron Build Engine: Gap-Closure Execution Payload
**Domain Priority Block:** 1. HV Wiring Package (Targeted Gap Resolution)
**System Status:** Automated Database Writes Halted. All data fields derived below are classified under NeedsEngineeringReview or NeedsVerification statuses. No entries are labeled as Confirmed.
### Part 1: Architecture State Boundary Track (Closed vs. Open)
#### Partially Sourced / Candidate Selections (Marked Closed for This Execution Run)
 * **35 mm² HV Cable Candidate:** Coroflex 9-2611 FHLR2GCB2G (Candidate selection locked).
 * **35 mm² Bend-Radius Candidate:** Static: \ge 3\times \text{ OD} | Dynamic: \ge 6\times \text{ OD}.
 * **Primary Contactor Candidate:** TE Kilovac EV200 Series (500A Carry Continuous at 85°C).
 * **Eaton EV Fuse Family Candidate:** Bussmann EV Series (Up to 1000Vdc, 10A to 1600A options).
 * **Bonding Path Upper Constraint:** UNECE GTR No. 20 Rationale (0.1\ \Omega maximum threshold).
 * **MSD/HVIL Interface Concept:** Chilye Mini MSD low-voltage loop separation sequencing logic.
 * **Isolation Monitoring Subsystem:** Sendyne SIM100MLP (100\ \Omega/\text{V} absolute defect boundary tracking).
#### High-Voltage Wiring Package Structural Gaps (Still Open / Halted)
 * **Battery Power Parameters:** Battery Nominal Voltage, Maximum Packed Voltage, Continuous Discharge Current, Peak Discharge Current, and Maximum Pack Short-Circuit Current (I_{sc}) remain completely **NeedsExactSource**.
 * **Inverter Operating Demands:** Inverter Continuous and Peak DC Input Amperage metrics remain **NeedsExactSource**.
 * **Main Fuse Selection:** Exact fuse rating selection remains **OpenGap** until upstream pack short-circuit metrics (I_{sc}) are confirmed.
 * **Pre-Charge Component Loop:** Exact pre-charge resistor ohmic calculation and matching power dissipation profile remain an **OpenGap** pending pack voltage and motor controller input capacitance (C) fields.
 * **Chassis Physical Route Length:** Absolute cross-sectional routing path mapping onto the truck frame is **OpenGap** (*PhysicalVerificationRequired*).
### Part 2: High-Quality Core Reference Extractions
#### [Source Row 1] Pre-Charge Circuit Resistor Math Framework & Sizing Parameters
 * **Exact Title:** Precharge resistor calculation: Formulas & Practical Guide — Miba
 * **URL:** https://www.miba.com/en/product-areas/power-electronics/precharge-resistor-calculation
 * **Source Type:** Supplier Technical Application Analysis Guide
 * **Exact Quote:** "The formula: R = t / (5 * C)... Example: If a 2,000 µF capacitor is to be charged in 1 s, we calculate: 1 s / (5 * 0.002 F) = 100 Ω... The highest current flows exactly at the moment of energization (t = 0). This value must not exceed the load limits of your contactors and fuses. The formula: I_max = U / R... The resistor must be able to convert all the energy from the charging process into heat without being damaged. The formula: E = 0.5 * C * U²"
 * **Page / Section / Table:** Section 1: Determine the resistance value (R), Section 2: Check maximum inrush current, Section 3: Calculate energy intake (E)
 * **Component Rating:** Application Dependent: Sized via Inverter Capacitance (C), Total Voltage (U), and Target Pre-charge Windows (t).
 * **What Claim It Supports:** Establishes the standard engineering calculus required to specify the pre-charge resistor's nominal resistance value (R), absolute peak instant current profile (I_{\text{max}}), and minimum single-pulse energy capacity (E in Joules).
 * **Build Engine Impact:** Rule, Metric
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Inverter/Motor controller DC-link capacitance value (C) and Maximum Battery Pack Voltage (U) to resolve specific component choices.
#### [Source Row 2] High-Voltage Auxiliary Pre-Charge Relay Component Baseline
 * **Exact Title:** High Voltage Relays & Contactors, High Voltage Relay, Mini K HV Precharge Relay Datasheet
 * **URL:** https://www.te.com/en/product-2-1904058-5.html
 * **Source Type:** Supplier Component Datasheet
 * **Exact Quote:** "AMP+ Mini K HV Precharge Relay... Contact Arrangement : 1 Form X SPST-NO-DM. Current Type : DC. Contact Current Rating (A): 20... Insulation Initial Dielectric Between Contacts & Coil (Vrms): 2000... Environmental Category of Protection : RTIII. Operating Temperature Range : -40 – 85 °C"
 * **Page / Section / Table:** Configuration Features & Usage Conditions Matrix
 * **Component Rating:** Max Continuous Switching Class up to 20A, Initial Dielectric Strength 2000 Vrms between circuit contacts and the low-voltage coil loop.
 * **What Claim It Supports:** Standardizes the auxiliary switching hardware choice for isolation of the capacitive pre-charge current path, validating a standalone component rating capable of completing loops up to 20A before primary traction contactor activation.
 * **Build Engine Impact:** Metric, NominalAssumption
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Target low-voltage system master control coil drive voltage verification (e.g., 12V vs 24V supply logic architecture).
#### [Source Row 3] High-Voltage 50 mm² Shielded Cabling Cross-Section Profile
 * **Exact Title:** 9-2611 / 50 mm² Technical Information Seite / Page: 1/5 Automotive Leitung geschirmt
 * **URL:** https://citini.com/wp-content/uploads/2022/07/HV50SSC.pdf
 * **Source Type:** Supplier Production Specification Sheet
 * **Exact Quote:** "COROFLEX [nnn] 9-2611 FHLR2GCB2G 50 mm²/T180 ATTENTION HIGH VOLTAGE MAX 600 V AC / 1000 V DC... Shielded cable for automotive electric powertrain... Specification: LV 216-2... Our specifications shall not release you from your obligation to test the products supplied regarding their suitability for the intended purpose of use."
 * **Page / Section / Table:** Page 1, Main Dimensional Core Specifications
 * **Component Rating:** 50\text{ mm}^2 Nominal Copper Section, 600V AC / 1000V DC Max Isolation Boundary, T180 Temperature Class (180^\circ\text{C} Continuous Thermal Outer Wall Limit).
 * **What Claim It Supports:** Identifies the geometric baseline parameters and industrial standard tracking (LV 216-2) for the larger gauge traction run candidate.
 * **Build Engine Impact:** Metric, Rule
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Complete continuous and peak ampacity curves indexed directly against ambient truck carriage thermal limits (40^\circ\text{C} \text{ to } 60^\circ\text{C} chassis environments).
#### [Source Row 4] High-Voltage Component Mechanical Ingress Testing Protocol
 * **Exact Title:** IP67 vs. IP69K: Waterproof Ratings Guide for Off-Road Vehicles | TONFUL
 * **URL:** https://tonful.com/ip67-vs-ip69k-waterproof-ratings-guide-for-off-road-vehicles-tonful/
 * **Source Type:** Technical Validation Standards Analysis
 * **Exact Quote:** "ISO 20653 introduced the “K” designation in IP69K, which specifies more rigorous testing conditions specifically designed for vehicles requiring high-pressure cleaning... The “K” designation comes from ISO 20653 and indicates testing against water jets at 80°C (176°F) delivered at 100 bar (1450 PSI) pressure from multiple angles while the component rotates on a turntable... IP67 tests involve static immersion in room-temperature water... up to 1m depth, 30 minutes."
 * **Page / Section / Table:** Protection Capabilities Comparison Section & Dust Protection Matrix
 * **Component Rating:** IP6K9K (ISO 20653 standard): 100 bar high-pressure spray resistance at an 80°C water temperature boundary.
 * **What Claim It Supports:** Directs the physical layout test design guidelines for all frame-rail or under-cab enclosures on the vehicle, dictating that underbody conversion elements must endure localized dynamic high-pressure washing procedures rather than simple static fluid submersions.
 * **Build Engine Impact:** Test, Rule
 * **Verification Status:** RegulatoryCandidate
 * **Missing Data Still Needed:** Independent test laboratory verification logs for selected sub-enclosure interface seal gaskets under dynamic load deformation.
#### [Source Row 5] Equipotential Bonding Path Measurement Methods for Electric Vehicles
 * **Exact Title:** Metrel MI3132 EV — Electric Vehicle Tester Specification Sheet
 * **URL:** https://www.test-meter.co.uk/metrel-mi3132-ev-electric-vehicle-tester
 * **Source Type:** Industrial Instrumentation Operational Protocol
 * **Exact Quote:** "The Metrel MI3132 EV - Electric Vehicle Tester is a portable battery powered test instrument... designed specially for use in electronic vehicle testing supporting the UN ECE R100 Annex 4A, 4B and ISO 6469-3 standards, intended for measurement of insulation resistance of electric vehicles. Function µΩ - Meter... 1 A, 2 A: Measuring range: 0.000 mΩ - 1.999 mΩ... Kelvin testing method together with automatic"
 * **Page / Section / Table:** Device Test Selection Block: Micro-Ohm Meter (\mu\Omega) Performance Specifications
 * **Component Rating:** Testing loop validation current options at 1A and 2A continuous injection utilizing a 4-wire Kelvin measurement method.
 * **What Claim It Supports:** Defines the precise diagnostic verification technique needed to evaluate grounding bond safety, forcing the deployment of a low-resistance Kelvin 4-wire test instrument injecting at least 1A across frame connections to bypass simple digital multimeter contact errors.
 * **Build Engine Impact:** Test
 * **Verification Status:** RegulatoryCandidate
 * **Missing Data Still Needed:** Complete step-by-step documentation detailing physical mechanical preparation (e.g., e-coat scraping or chemical corrosion inhibiting application criteria) for the structural chassis rail bonding junctions.
### Part 3: Explicit Missing Data Gaps (OpenGap / NeedsExactSource)
 * **HV Connector Gauge Sub-Family Mapping:** **OpenGap**. Specific supplier assembly prints and internal model numbers for terminal block connections or bulkhead shields explicitly mated to 35\text{ mm}^2 or 50\text{ mm}^2 Coroflex cables are unpopulated.
*Data payload mapping for this domain complete. Handing off to the Second-Stage Research Filter.*
