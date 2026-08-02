# Elektron Build Engine: Gap-Closure Execution Payload
**Targeted Isolation Domain:** [1. HV Wiring Package - Supplier Datasheets & Engineering Sources]
**System Status:** Automated Database Writes Halted. All data profiles derived below are classified under NeedsEngineeringReview or NeedsVerification statuses. No entries are labeled as Confirmed.
### Part 1: Primary Sourced Technical Data Matrix
| Parameter Track | Database Baseline Technical Value | Source Citation / Document Type | Verification Status | Build Engine Impact |
|---|---|---|---|---|
| **Main Traction Fuse Sizing** | Bussmann EV Series (Up to 1000Vdc, 10A to 1600A) | Eaton EV Fuse Catalogue | NeedsEngineeringReview | Metric / Rule |
| **Main Contactor Make/Break Duty** | SPST-NO, Max Make: 650A (prevent welding) | Interrupt: 2000A @ 320Vdc | TE Kilovac EV200 Datasheet | NeedsEngineeringReview | NoGoCondition |
| **Pre-Charge Resistor Sizing** | Dynamic Cap Curves (Capacitive Make Curves) | TE EV200 Capacitive Make Test Curves | NeedsEngineeringReview | Metric |
| **Pre-Charge Relay Selection** | Minimum 80% to 90% Voltage Delta Target | TE Kilovac Specification Suite | NeedsEngineeringReview | Rule |
| **HV Cable 35\text{ mm}^2 Datasheet** | Coroflex 9-2611 FHLR2GCB2G 35\text{ mm}^2 | Coroflex Technical Information | NeedsEngineeringReview | NominalAssumption |
| **HV Cable 35\text{ mm}^2 Bend Radius** | Static: \ge 3\times\text{ OD} | Dynamic: $\ge 6\times\text{ OD | Coroflex 35mm² Specification Sheet | NeedsEngineeringReview | Rule |
| **HV Cable 50\text{ mm}^2 Bend Radius** | Static: \ge 3\times\text{ OD} | Dynamic: $\ge 6\times\text{ OD | Coroflex Multi-Gauge Specification | NeedsEngineeringReview | Rule |
| **HV Connector Compatibility** | Amphenol Excel | Mate MSD (Up to 400A, 1500Vdc) | Amphenol MSD Datasheet | NeedsEngineeringReview |
| **Enclosure Bonding Resistance** | Maximum 0.1\ \Omega (100 Milliohms) upper limit | UNECE GTR / ECE/TRANS/180/Add.20 | RegulatoryCandidate | Test / Rule |
| **IP67/IP6K9K Validation** | ISO 20653 Test Probes & Mated Enclosure Seals | ISO 20653 Road Vehicle Framework | RegulatoryCandidate | Test |
### Part 2: High-Quality Reference Extractions
#### [Source Row 1] Main Traction Battery Fuse Configuration Bounds
 * **Exact Title:** Eaton Bussmann series EV fuses catalogue (Product Profile Section)
 * **URL:** https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/fuses/bussmann-electric-vehicles-fuses/catalogs/eaton-ev-fuse-catalogue-emob0062-en-us.pdf
 * **Source Type:** Supplier Product Specification Document
 * **Exact Quote:** "Our series of EV fuses offers a wide range of options, supporting voltages from 500V to 1,000V DC and current ratings between 10A and 1,600A to ensure safe, efficient operation... Temperature & altitude effects: Operates from -40 °C to 100 °C; current ratings are based on 20°C; higher ambient temperatures and altitudes above 2000 m require current derating."
 * **Page / Section / Table:** Page 1, Features and Sizing Parameters
 * **Component Rating:** 500Vdc to 1000Vdc, 10A to 1600A continuous capabilities.
 * **What Claim It Supports:** Standardizes the primary DC high-voltage overcurrent protection envelope, identifying the ambient thermal limits (20^\circ\text{C} test baseline, derating required from 40^\circ\text{C} to 100^\circ\text{C}).
 * **Build Engine Impact:** Metric, Rule
 * **Verification Status:** NeedsEngineeringReview
#### [Source Row 2] High-Voltage Main Contactor Make/Break Duty Boundaries
 * **Exact Title:** EV200 series contactor data sheet - KILOVAC - Tyco Electronics
 * **URL:** https://www.rec-bms.com/datasheet/Technical_datasheet_Kilovac.pdf
 * **Source Type:** Supplier Component Datasheet
 * **Exact Quote:** "Continuous (Carry) Current, Typical... 500 @ 85°C... Break Current at 320VDC... 2,000, 1 cycle... The maximum make current is 650A to avoid contact welding... Estimated Make & Break Power Switching Ratings... 80% Minimum Pre Charge, 90% Nominal Pre Charge."
 * **Page / Section / Table:** Page 1-2, Performance Ratings Matrix & Load Life Notes
 * **Component Rating:** 12 - 900 Vdc, 500A continuous carry at 85°C, 2000A fault interruption limit at 320Vdc.
 * **What Claim It Supports:** Enforces a rigid system layout constraint: the main contactors must not experience peak closing inrush transients exceeding 650A to mitigate immediate arm welding hazards. Pre-charge controls must achieve a minimum of 80% to 90% source-voltage convergence prior to completing the main contactor coil loop circuit.
 * **Build Engine Impact:** NoGoCondition, Metric, Rule
 * **Verification Status:** NeedsEngineeringReview
#### [Source Row 3] High-Voltage 35 mm² Shielded Conductor Geometry Profile
 * **Exact Title:** Technische Information Coroflex Part No.: 9-2611 / 35 mm² Technical Information Seite / Page: 1/6 Automotive Leitung geschirmt
 * **URL:** https://citini.com/wp-content/uploads/2022/07/HV35SSC.pdf
 * **Source Type:** Supplier Production Line Datasheet
 * **Exact Quote:** "COROFLEX [nnn] 9-2611 FHLR2GCB2G 35 mm²/T180 ATTENTION HIGH VOLTAGE MAX 600 V AC / 1000 V DC... Bend radius: - min. 3 x cable-ø: static installation. - min. 6 x cable-ø: dynamic installation. Weight of cable: approx. 485 g/m."
 * **Page / Section / Table:** Page 1, Mechanical and Structural Matrix
 * **Component Rating:** 35\text{ mm}^2 Conductor Area, 600V AC / 1000V DC Max Rating, -40^\circ\text{C}\text{ to }+180^\circ\text{C} continuous thermal operating bound.
 * **What Claim It Supports:** Establishes the precise bend envelope for 35\text{ mm}^2 system cabling runs. Dynamic articulation segments (such as transmission cradle mounting transitions) are bound by a minimum 6\times\text{ outer diameter (OD)} tracking run.
 * **Build Engine Impact:** Rule, Metric
 * **Verification Status:** NeedsEngineeringReview
#### [Source Row 4] Enclosure Bonding and Ground Loop Impedance Cutoffs
 * **Exact Title:** ECE/TRANS/180/Add.20 - Global Technical Regulation No. 20 (Electric Vehicle Safety)
 * **URL:** https://unece.org/fileadmin/DAM/trans/main/wp29/wp29wgs/wp29gen/wp29registry/ECE-TRANS-180a20e.pdf
 * **Source Type:** International Regulatory Standard Framework
 * **Exact Quote:** "Specification of the 0.1 Ω upper resistance limit for chassis bonding provides protection from electric shock by shunting any harmful electrical currents to the vehicle chassis should any electrically charged components lose isolation within the protective barrier. For in-use protection against direct contact with high voltage components test probes are specified that conform to ISO 20653..."
 * **Page / Section / Table:** Page 60, Section II (Technical Rationale and Justification)
 * **Component Rating:** Max 0.1\ \Omega (100\text{ m}\Omega) electrical resistance path constraint between any metal high-voltage component structural shield and the vehicle's reference chassis frame ground.
 * **What Claim It Supports:** Quantifies the target pass/fail parameter for micro-ohmmeter testing of the conversion sub-enclosures, establishing that physical connection plates or ground straps must present an impedance profile below 100 milliohms.
 * **Build Engine Impact:** Rule, Test
 * **Verification Status:** RegulatoryCandidate
### Part 3: Explicit System Data Deficiencies (OpenGap / NeedsExactSource)
 * **Upstream Power Parameters:** **NeedsExactSource**. The final selection values for *Battery Nominal/Max Voltage*, *Battery Peak Continuous Amperage*, *Battery Max Short-Circuit Current*, and *Inverter Phase Demands* remain completely unpopulated. These variables are necessary to lock the exact cross-sections (35\text{ mm}^2\text{ vs } 50\text{ mm}^2) and fuse selection parameters.
 * **Pre-Charge Relay Selection:** **OpenGap**. While contactor capacitance curves are mapped, a specific supplier datasheet for an auxiliary pre-charge relay rated to break high-voltage capacitive loop transients is missing.
 * **HV Connector Layout Keying:** **OpenGap**. Interface mating dimensions and mechanical key options for the traction pack bulkhead connector units matching 35\text{ mm}^2\text{ or } 50\text{ mm}^2 shields are unpopulated.
*Data payload mapping for this domain complete. Handing off to the Second-Stage Research Filter.*
