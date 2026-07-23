# Elektron Build Engine: Deep-Dive Technical Source Payload (Gaps 1–6)
**Pipeline Stage:** AI Research Hunter (Pre-Ingestion Technical Expansion)
**System Status:** Automated Database Writes Halted. All entries compiled below are classified strictly under Candidate, NeedsVerification, or EngineeringReviewRequired statuses.
## Section 1: High-Voltage (HV) Wiring Safety Architecture
### [Source Row 1] SAE J1742 Connection & Terminal Testing Standards
 * **Source Title:** SAE J1742: High Voltage Connection Systems for On-Board Road Vehicle Electrical Wiring Harnesses
 * **URL:** https://www.scribd.com/document/819729663/SAEJ1742v001 (Tracking performance metrics under industrial standard verification)
 * **Source Type:** Published Technical Standard (Reference Assessment)
 * **Source Hierarchy Level:** 4 (Published Standard: SAE / ISO / UL / NFPA)
 * **Discipline:** Electrical / High-Voltage Wiring Engineering
 * **Subsystem:** On-Board High Voltage Connectors & Terminal Harnesses
 * **Platform Relevance:** Vehicles operating at high-voltage class boundaries between 50V and 600V (AC or DC).
 * **Public / Paywalled / Proprietary / Requires Request:** Paywalled (Summary extracted via standard overview profiles)
 * **Exact Claim Candidate:** Connectors used in traction voltage distribution loops must adhere to rigid specifications governing connection/disconnection procedures and mechanical retention to safeguard operators during assembly or maintenance.
 * **Exact Quote:** SAE J1742 outlines recommended test methods and performance requirements for single-pole and multi-pole connectors used in high voltage on-board electrical wiring harnesses for electric and hybrid vehicles... to ensure their connectors meet industry standards for electrical connections in vehicles operating at voltages between 50 and 600 V AC or DC.
 * **Page / Section / Table:** Performance Requirements & Scope
 * **Build Engine Impact:** Rule, Test
 * **Confidence:** HIGH
 * **Verification Status:** CandidateSource
 * **Next Action:** Flag connector specifications as NeedsVerification until direct cross-checks confirm multi-pole interlock paths.
### [Source Row 2] Manual Service Disconnect (MSD) & HVIL Structural Integration
 * **Source Title:** Chilye MINI Manual Service Disconnect Specification Sheets
 * **URL:** https://citini.com/wp-content/uploads/2022/07/CL-Mini-MSD-Specification-EN.pdf
 * **Source Type:** Supplier Datasheet
 * **Source Hierarchy Level:** 5 (Supplier Datasheet)
 * **Discipline:** Electrical / High-Voltage Wiring Safety
 * **Subsystem:** Manual Service Disconnect (MSD) / High-Voltage Interlock Loop (HVIL)
 * **Platform Relevance:** Traction pack architectures requiring structural overcurrent protection up to 500A and 700Vdc.
 * **Public / Paywalled / Proprietary / Requires Request:** Public
 * **Exact Claim Candidate:** The disconnect assembly utilizes a staggered mechanical design requiring a two-stage actuation process that interrupts the low-voltage HVIL path prior to physical high-voltage terminal pin separation to prevent electrical arcing.
 * **Exact Quote:** ...it utilizes a two-stage lever which help to open the HVIL circuit prior to separation of HV connectors. This helps to control separation speed and guarantee the safety. ... Fuse Rated Voltage：600 to 700Vdc. Fuse Rated Current ：Up to 500A, depends on fuse.
 * **Page / Section / Table:** Page 2, "Applications and Electrical Specs"
 * **Build Engine Impact:** Rule, NoGoCondition
 * **Confidence:** HIGH
 * **Verification Status:** NeedsSupplierData
 * **Next Action:** Map the specific mechanical path timing limits to verify compatibility with internal software fault timers.
### [Source Row 3] ISO 6469-3 Isolation Monitoring Rules
 * **Source Title:** ISO 6469-3: Electrically propelled road vehicles — Safety specifications — Part 3: Protection of persons against electric shock
 * **URL:** https://www.iso.org/obp/ui/en/#!iso:std:81746:en
 * **Source Type:** Published Technical Standard
 * **Source Hierarchy Level:** 4 (Published Standard: SAE / ISO / UL / NFPA)
 * **Discipline:** Electrical Engineering Safety / Fault Diagnostics
 * **Subsystem:** Isolation Monitoring / Voltage Class B Systems
 * **Platform Relevance:** All Class B high-voltage vehicle electrical systems.
 * **Public / Paywalled / Proprietary / Requires Request:** Public OBP Preview / Main Text Paywalled
 * **Exact Claim Candidate:** Voltage Class B propulsion networks mandate standard testing specifications for isolation resistance monitoring equipment to continuously track defects against shock and thermal incidents.
 * **Exact Quote:** This document specifies electrical safety requirements for voltage class B electric circuits of electric propulsion systems... introduction of definitions and requirements for new voltage classes B1 and B2... new test specification for the isolation resistance monitoring system.
 * **Page / Section / Table:** Section 1: Scope & Foreword Updates
 * **Build Engine Impact:** Rule, Test
 * **Confidence:** HIGH
 * **Verification Status:** CandidateSource
 * **Next Action:** Incorporate the Class B insulation baseline into the hardware testing registry.
## Section 2: Cooling Loop Parameters
*No Empirical Public URL Data Sheets Extracted for Specific Pack/Inverter Volumetric Flow Rates.*
 * **Build Engine Impact:** OpenGap / NeedsSupplierData
 * **Verification Status:** NeedsSupplierData
 * **Next Action:** Issue documentation requests to battery and motor vendor engineering divisions for flow vs pressure drop curves.
## Section 3: Brake / Steering Redundancy Path
### [Source Row 4] Dual Power Supply Hydroboost/Power Steering Pumps
 * **Source Title:** Electric Hydraulic Power Steering (EHPS) Commercial Vehicle System Sizing
 * **URL:** https://brogenevsystem.com/parts/electric-power-steering-system/
 * **Source Type:** Supplier Engineering Matrix
 * **Source Hierarchy Level:** 5 (Supplier Datasheet)
 * **Discipline:** Mechanical / Brake & Steering Engineering
 * **Subsystem:** Electric-Hydraulic Power Steering (EHPS) Pump / Braking Assist Redundancy
 * **Platform Relevance:** Heavy and light truck electrification platforms replacing mechanical engine pumps.
 * **Public / Paywalled / Proprietary / Requires Request:** Public
 * **Exact Claim Candidate:** Heavy commercial retrofits require independent power path configurations split between traction and auxiliary voltage inputs to maintain active steering and fluid boost functionality in the event of primary propulsion system shutdowns.
 * **Exact Quote:** The dual power electric steering pump operates using both a high voltage battery pack (DC540V) and a low voltage battery (DC24V). If the high voltage supply disconnects suddenly, the low voltage system takes over, allowing the electric power steering to function seamlessly.
 * **Page / Section / Table:** "EHPS Operations & Vehicle Types"
 * **Build Engine Impact:** Rule, NoGoCondition
 * **Confidence:** HIGH
 * **Verification Status:** EngineeringReviewRequired
 * **Next Action:** Hold frame assembly space as PhysicalVerificationRequired until the physical block constraints of a dual-input pump are mapped against the empty engine compartment coordinates.
## Section 4: Controls / CAN Bus / PATS Architecture
### [Source Row 5] Ford Upfitter Interface Module (UIM) Network Parameters
 * **Source Title:** Ford Commercial Vehicle Bulletin Q-251R2: Upfitter Interface Module (UIM)
 * **URL:** https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=5405699&v2=060820094914&v3=60&v4=f5785dff32699c207928189560abaea217d868268fbcbe8b49e69555&v5=False
 * **Source Type:** OEM Engineering Bulletin
 * **Source Hierarchy Level:** 2 (OEM Official Manufacturer Source)
 * **Discipline:** Controls Engineering / Digital Architecture
 * **Subsystem:** CAN Bus Communication / Accessory Logic Controls
 * **Platform Relevance:** Ford Super Duty series platforms equipped with upfitter interface options.
 * **Public / Paywalled / Proprietary / Requires Request:** Public OEM Document
 * **Exact Claim Candidate:** The pre-installed Ford UIM allows custom logical mapping of auxiliary equipment outputs based on 28 read-only broadcast parameters harvested directly from the vehicle’s high-speed CAN network.
 * **Exact Quote:** The UIM receives 28 high speed CAN "read only" signals from various vehicle systems, providing upfitter access for aftermarket equipment needs... Note that the UIM has no interaction with vehicle feature functions (with the exception of horn chirp). It is strictly designed to provide outputs for aftermarket equipment.
 * **Page / Section / Table:** Page 2, "UIM Signals & Logic"
 * **Build Engine Impact:** Rule, OpenGap
 * **Confidence:** HIGH
 * **Verification Status:** EngineeringReviewRequired
 * **Next Action:** Log this operational constraint. Deleting the factory internal combustion PCM eliminates these baseline broadcast frames; specialized network nodes must mimic these 28 read-only messages to prevent auxiliary upfit lockouts.
## Section 5: Supplier Datasheets
### [Source Row 6] Universal Electric Power Steering Universal Couplings
 * **Source Title:** EV West Electric Power Steering Calibration Components
 * **URL:** https://evwest.com/electric-power-steering-unit-for-electric-vehicles
 * **Source Type:** Supplier Component Profile
 * **Source Hierarchy Level:** 5 (Supplier Datasheet)
 * **Discipline:** Mechanical Design / Steering Interfacing
 * **Subsystem:** Steering Input Spline & Input Shaft Couplers
 * **Platform Relevance:** Conversions integrating variable speed-dependent steering controllers.
 * **Public / Paywalled / Proprietary / Requires Request:** Public
 * **Exact Claim Candidate:** Steering column physical link retrofits require matching splines to prevent rotational slip; typical conversion kits standardize gear interfaces utilizing custom GM or universal profiles.
 * **Exact Quote:** On the ePowersteering Unit, the upper spline is Woodward #102 and the lower spline is Woodward #114... Input (Steering Wheel Side) Shaft: 3/4 inch, 36 spline GM.
 * **Page / Section / Table:** Specs Matrix / Installation Tips
 * **Build Engine Impact:** NominalAssumption
 * **Confidence:** MED
 * **Verification Status:** NeedsSupplierData
 * **Next Action:** Mark as PhysicalVerificationRequired to measure the exact input spline count of the factory Ford Super Duty box against available conversion couplers.
## Section 6: Failure Modes and Test Methods
*No Empirical Technical Manuals Extracted from Public Verification Indices Detailing Specific Water Intrusion (IP6K9K) High-Voltage Enclosure Step-by-Step Test Cycles.*
 * **Build Engine Impact:** OpenGap / RealTestRequired
 * **Verification Status:** RealTestRequired
 * **Next Action:** Retain insulation resistance failure protocols as high-priority gaps for laboratory test sequence generation.
## Compiled Candidate SourceClaim Data Payload Matrix
| Source Title | Discipline | Subsystem | Verification Status | Build Engine Impact |
|---|---|---|---|---|
| SAE J1742 Framework | Electrical | HV Connections | CandidateSource | Rule / Test |
| Chilye MSD Specs | Electrical Safety | MSD / HVIL Paths | NeedsSupplierData | Rule / NoGoCondition |
| ISO 6469-3:2021 | Electrical Safety | Isolation Sensors | CandidateSource | Rule / Test |
| EHPS Sizing Guide | Brake & Steering | Redundant Pump | EngineeringReviewRequired | Rule / NoGoCondition |
| Ford Bulletin Q-251R2 | Controls / CAN | UIM Logic Network | EngineeringReviewRequired | Rule / OpenGap |
| EV West Steering Unit | Mechanical | Shaft Couplers | NeedsSupplierData | NominalAssumption |
