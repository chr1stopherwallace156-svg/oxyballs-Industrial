# Elektron Build Engine: Focused Gap Analysis (HV Wiring Package)
**Domain Priority Block:** 1. HV Wiring Package
**System Status:** Automated Database Writes Halted. All data fields derived below are classified under NeedsEngineeringReview or NeedsVerification statuses. No properties are labeled as Confirmed.
### Part 1: Primary Engineering Parameter Gaps & Status Matrix
The following summary tracking matrix logs the exact parameter resolution requirements requested to clear the StageGate to build-ready wiring status.
| Parameter Track | Database Baseline Value | Source Citation / Document Type | Verification Status | Build Engine Impact |
|---|---|---|---|---|
| **Battery Max Voltage** | *MISSING_SOURCE* | *NeedsExactSource* | NeedsSupplierData | Metric |
| **Battery Continuous/Peak Current** | *MISSING_SOURCE* | *NeedsExactSource* | NeedsSupplierData | Metric |
| **Inverter Continuous/Peak Current** | *MISSING_SOURCE* | *NeedsExactSource* | NeedsSupplierData | Metric |
| **HV Cable Part Number** | Coroflex 180HV SSC (FHLR2GCB2G) | Supplier Data Sheet | NeedsEngineeringReview | NominalAssumption |
| **HV Cable Ampacity** | Cross-Section Dependent (35\text{ mm}^2 / 50\text{ mm}^2) | Coroflex Derating Table | NeedsEngineeringReview | Metric |
| **HV Cable Bend Radius** | Static: \ge 3\times\text{ OD} | Dynamic: $\ge 6\times\text{ OD | Coroflex 9-2611 Spec | NeedsEngineeringReview | Rule |
| **Fuse Volt/Current/Interrupt** | 500 Vdc / Application Dependent / 20 kA Max DC | Eaton Bussmann EV Series | NeedsEngineeringReview | Metric |
| **Contactor Volt/Current Rating** | 12 - 900 Vdc / 500 A Carry Continuous @ 85°C | TE Kilovac EV200 Series | NeedsEngineeringReview | Metric |
| **Pre-Charge Design Data** | *MISSING_SOURCE* | *NeedsExactSource* | NeedsSupplierData | OpenGap |
| **MSD/HVIL Sequence** | Low-Voltage Paths Separate Prior to HV Pins | Chilye Mini MSD Datasheet | NeedsEngineeringReview | NoGoCondition |
| **Isolation Monitor Threshold** | 100 \Omega/Volt Defect Line Boundary | Sendyne SIM100MLP Specs | NeedsEngineeringReview | NoGoCondition |
| **Bonding/Grounding Test** | Max Loop Resistance Specification Needed | *NeedsExactSource* | OpenGap | Test |
| **Physical Route Path** | Pending Truck Chassis Coordinate Integration | *PhysicalVerificationRequired* | OpenGap | OpenGap |
| **Engineer Review** | Mandatory Human Signoff Before Fabrication Loop | Process Requirement | EngineeringReviewRequired | StageGate |
### Part 2: High-Quality Core Reference Extractions
#### [Source Row 1] High-Voltage Shielded Cable Geometry and Bend Boundaries
 * **Exact Title:** 9-2611 / 6,0 mm² Technical Information Seite / Page: 1/4 Automotive Leitung geschirmt
 * **URL:** https://d2iompx231jv6o.cloudfront.net/userfiles/documents/products/22/92/26/229226.pdf
 * **Source Type:** Supplier Datasheet (Coroflex 180HV SSC Series)
 * **Exact Quote:** Bend radius: - min. 3 x cable-ø: static installation. - min. 6 x cable-ø: dynamic installation.
 * **Page / Section / Table:** Page 1, Properties Block
 * **What Claim It Supports:** Supports the strict geometry limitations for frame routing, clarifying that bending constraints depend directly on physical installation type (static framework vs dynamic vibration zones).
 * **Build Engine Impact:** Rule, Metric
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Exact Outer Diameter (OD) profiles for larger gauge arrays (35\text{ mm}^2 or 50\text{ mm}^2) required to calculate the absolute dimensional bend envelope on the chassis.
#### [Source Row 2] Primary High-Voltage Main Contactors Amperage Carry Sizing
 * **Exact Title:** EV200 series contactor data sheet - KILOVAC - Tyco Electronics
 * **URL:** https://www.rec-bms.com/datasheet/Technical_datasheet_Kilovac.pdf
 * **Source Type:** Supplier Datasheet
 * **Exact Quote:** Continuous (Carry) Current, Typical: 500 @ 85°C, 400 mcm conductors. Consult Factory for required conductors for higher (500+ A) currents. Make/Break Current at Various Voltages 1/... Rated Operating Voltage. VDC. 12 - 900.
 * **Page / Section / Table:** Page 1, Parameter Value Matrix
 * **What Claim It Supports:** Establishes the voltage safety boundary (900 Vdc max) and continuous current carrying limits under baseline thermal conditions (500\text{ A} at 85^\circ\text{C} utilizing heavy gauge terminals).
 * **Build Engine Impact:** Metric, Rule
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Inverter peak and continuous phase currents to verify the contactor thermal baseline under heavy truck towing conditions.
#### [Source Row 3] Traction Subsystem Auxiliary Overcurrent Interruption Profile
 * **Exact Title:** Bussmann series Pre-production and sample electric vehicle auxiliary fuses — 500 Vdc, 5-50 A data sheet no. 10864
 * **URL:** https://www.eaton.com/content/dam/eaton/products/emobility/fuses-electric-vehicle/bus-ele-ds-10864-ev-pre-production-sample-aux-fuses.pdf
 * **Source Type:** Supplier Datasheet
 * **Exact Quote:** Eaton's Bussmann™ series Electric Vehicle (EV) full range fuses for protecting auxiliary electrical systems up to 500 Vdc in ratings from 10 to 50 amps. Ratings. • Volts - 500 Vdc. • Amps. • 10-50 A. • Interrupting rating. • Max DC – 20 kA.
 * **Page / Section / Table:** Page 1, Description and Ratings Block
 * **What Claim It Supports:** Quantifies the precise physical fault clearing bounds for low-amperage sub-circuits, limiting peak overcurrent conditions to 20 kA maximum at 500 Vdc.
 * **Build Engine Impact:** Metric, Rule
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Main battery pack structural short-circuit calculation to ensure pack fault capacity does not exceed the interrupting threshold.
#### [Source Row 4] Low-Overload Fault Isolation Boundaries for Floating Networks
 * **Exact Title:** Sendyne Isolation Monitor For Unearthed (IT) DC Power Systems Datasheet
 * **URL:** https://dc-components.com/wp-content/uploads/Sendyne-SIM100MLP-Datasheet-V1.1a.pdf
 * **Source Type:** Supplier Datasheet / Technical Specification
 * **Exact Quote:** If either of the isolation resistances decreases below the threshold of 100 Ohms/Volt a hazard occurs if a person makes contact with the terminal 'opposite' to the leaking resistor.
 * **Page / Section / Table:** Page 2, Figure 2 Context Commentary
 * **What Claim It Supports:** Explicitly designates 100\ \Omega/\text{V} as a specific physical safety boundary for floating IT electrical networks.
 * **Build Engine Impact:** NoGoCondition, Metric
 * **Verification Status:** NeedsEngineeringReview
 * **Missing Data Still Needed:** Definitive hardware communication protocol mappings (CAN register updates) linking the isolation monitoring hardware directly to the primary battery management system master.
### Part 3: Explicit Missing Data Gaps (OpenGap / NeedsExactSource)
 * **Selected Battery Voltage & Discharge Capabilities:** **NeedsExactSource**. Complete pack specification maps are required to verify the voltage ceiling remains below the contactor (900 V) and fuse (500 V) hardware limits.
 * **Bonding and Grounding Test Methodology:** **OpenGap**. Direct experimental procedures mapping chassis frame-to-enclosure ground plane impedance boundaries are completely unpopulated.
 * **IP67 / IP6K9K Enclosure Ingress Validation:** **OpenGap**. Standard washdown verification and submersion test procedures for low-mounted under-chassis connection junctions must be added via official industrial regulatory frameworks before physical prototype assembly begins.
### Part 4: Technical Background Context
 * **High Voltage Thermal Cable Profiling:** *TechnicalBackground only.* General application notes for FHLR2GCB2G cable highlight that continuous current profiles vary significantly with ambient thermal boundaries up to 180^\circ\text{C}. These notes confirm that cross-sections should be finalized only after full thermal derating calculations are complete.
*Data payload mapping for this domain complete. Handing off to the Second-Stage Research Filter.*
