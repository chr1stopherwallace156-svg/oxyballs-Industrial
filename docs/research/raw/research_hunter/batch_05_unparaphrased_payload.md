I am stepping into the role of the **Research Hunter**. The pipeline architecture demands hard structural boundaries: **No paraphrasing, no directional assumptions accepted as rule, and no placeholder metrics.** The top priority missing technical specifications have been gathered directly from the primary OEM manuals, official federal archives, and regulatory codebooks. Below is the un-paraphrased data payload pulled straight from the literature to populate the shelves of the **Elektron Build Engine**, formatted explicitly for ingestion by the *Second-Stage Research Filter*.
# Item 1: Ford Frame Modification, Alteration, & Fastener Constraints
 * **Document Title:** Ford General Body Builder Layout Book — Reference Information
 * **Source URL:** https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=5228386&v2=010620094644&v3=60&v4=891711acbe0f2c3555bb8ec3a9803900b535e5c2ba1bb6417e7e5c94&v5=False
 * **Source Type:** OEM Engineering Manual
 * **Discipline:** Mechanical Engineering / Structural Alterations
 * **Subsystem:** Chassis Frame Rails & Cross Members
 * **Platform Relevance:** All Ford Super Duty Commercial Vehicles / Incomplete Chassis
 * **Exact Quoted Text & Location (Page 2, "Frame Alterations"):**
   * *Claim 1 (Cross Member Alteration):* • Adding holes or welding on frame cross members is not recommended.
   * *Claim 2 (Fastener Grade Requirements):* • All attaching fasteners, including flat washers, must be of high strength steel (Grade 8 for SAE fasteners, Property Class 10.9 for metric bolts, PC 10 for metric nuts).
   * *Claim 3 (Welding Temperature Boundaries):* • Prior to welding, any parts which could be damaged by excessive temperatures should be removed or adequately shielded. Also, prior to welding, disconnect all batteries, and sensitive
 * **Build Engine Impact:** Rule, NoGoCondition
 * **Verification Status:** **CandidateSource** (Ready for exact geometric field cross-referencing).
# Item 2: FMVSS No. 305a — Federal Final Rule & Timing Restrictions
 * **Document Title:** Federal Motor Vehicle Safety Standards; FMVSS No. 305a Electric-Powered Vehicles: Electric Powertrain Integrity (Final Rule Framework / Delay of Effective Date Notice)
 * **Source URL:** https://www.federalregister.gov/documents/2024/12/20/2024-28707/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain
 * **Source Type:** Published Federal Standard / Part 561 Safety Rule
 * **Discipline:** Systems Engineering Safety / Crashworthiness Compliance
 * **Subsystem:** Propulsion Battery Retention / High-Voltage Electrical Isolation
 * **Platform Relevance:** Multi-class vehicles exceeding a GVWR of 4,536 kg (10,000 lbs). (Applies directly to Class 4/5 F-450/F-550 conversion variants).
 * **Exact Quoted Text & Location (89 FR 104318, Executive Summary & DATES):**
   * *Claim 1 (Standard Application & Risk Documentation):* Among other improvements, FMVSS No. 305a applies to light and heavy vehicles and includes performance requirements for the propulsion battery. NHTSA is also establishing a new regulation, part 561, "Documentation for Electric-powered Vehicles," that requires manufacturers to compile risk mitigation documentation and to submit standardized emergency response information to assist first and second responders handling electric vehicles.
   * *Claim 2 (Heavy Vehicle Compliance Deadlines):* For all other requirements, the compliance date is September 1, 2027, for vehicles with a gross vehicle weight rating of 4,536 kilograms (kg) or less and September 1, 2028, for vehicles with a gross vehicle weight rating over 4,536 kg. Small-volume manufacturers, final-stage manufacturers, and alterers are provided an additional year to comply with the requirements beyond the dates identified above.
   * *Claim 3 (Effective Date Delay Notice — 90 FR 9609):* The effective date of the rule published on December 20, 2024, at 89 FR 104318, is delayed until March 20, 2025.
 * **Build Engine Impact:** Rule, Test, NoGoCondition
 * **Verification Status:** **CandidateSource** (Enforces strict compliance timelines for Final-Stage Alterers).
# Item 3: CARB Heavy-Duty Zero-Emission Powertrain Certification Requirements
 * **Document Title:** California Standards and Test Procedures for New 2021 and Subsequent Model Heavy-Duty Zero-Emission Powertrains
 * **Source URL:** https://ww2.arb.ca.gov/sites/default/files/2020-05/ADA__California%20Standards%20And%20Test%20Procedures%20For%20New%202021%20And%20Subsequent%20Model%20Heavy-Duty%20Zero-Emission%20Powertrains.pdf
 * **Source Type:** State Regulatory Mandate
 * **Discipline:** Electrical Engineering Controls / Diagnostic Verification
 * **Subsystem:** Battery Management System (BMS) / Powertrain Diagnostics
 * **Platform Relevance:** Heavy-duty powertrains (>14,000 lbs GVWR) and incomplete medium-duty powertrains (8,501 to 14,000 lbs GVWR).
 * **Exact Quoted Text & Location (Section 1 & Section 2.2):**
   * *Claim 1 (Family Certification Constraints):* 1 Each substantially similar battery pack, based on cell chemistry, module construction (e.g., cylindrical, prismatic, pouch), the battery management system, and battery thermal management systems (e.g., air cooling, indirect liquid cooling) constitutes a certification family and each family is required to obtain its own Executive Order.
   * *Claim 2 (Diagnostic Architecture Mandate):* System Monitoring and Diagnostics Information. For each test group, a powertrain manufacturer must provide information (i.e., a description) related to the system monitoring and diagnostics components and software strategies of the zero-emission powertrain.
   * *Claim 3 (ESS Monitoring Point Specifics):* 2.2 The manufacturer shall provide a list of the system monitoring and diagnostics components of the following powertrain subsystems as well as a description of the function of each, if present: 2.2.1 Energy Storage System (ESS) - Individual electronic inputs or...
 * **Build Engine Impact:** Rule, Metric
 * **Verification Status:** **CandidateSource**
# Item 4: California HVIP Retrofit Financial Incentive Gateway
 * **Document Title:** California Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project (HVIP) Implementation Manual
 * **Source URL:** https://californiahvip.org/wp-content/uploads/2024/10/FY23-24-HVIP-Implementation-Manual-103124.pdf
 * **Source Type:** Public Program Funding Guidelines
 * **Discipline:** Fleet Fleet Optimization / Commercial Deployment
 * **Subsystem:** Financial Ingestion Checklist / Conversion Voucher Parameters
 * **Platform Relevance:** Public fleet return-to-base procurement strategies under California mandate limits.
 * **Exact Quoted Text & Location (Section 1, "Fleet Regulations"):**
   * *Claim 1 (Exceeding Minimum Compliance Thresholds):* High-priority and public fleets using the milestones option may access HVIP for any zero-emission vehicles purchased in excess of their milestone requirement. Similarly, State and local agencies not using the milestones option may access HVIP for any vehicles purchased above their requirement.
 * **Build Engine Impact:** Coverage row, Metric
 * **Verification Status:** **RegulatoryCandidate** (Requires extraction of Appendix B: Vehicle Eligibility documentation once vendor forms open).
# Item 5: Critical Open Gaps Registry (NeedsExactSource)
The following critical paths have been logged into the repository but remain assigned to raw physical testing, expert verification, or proprietary item ingestion. No functional software values have been written.
 1. **HV Cable Bend Radii & Clearances (SAE J1673 Boundaries):**
   * *Status:* **NeedsExactSource**
   * *Reason:* Exact minimum bend multi-factors for flexible or shielded high-voltage traction cabling (e.g., 4\times or 6\times outer conductor diameter limits) require the ingestion of the localized SAE standard text.
 2. **Ford CAN/PATS Key-On Engine Running (KOER) Immobilizer Defeat:**
   * *Status:* **EngineeringReviewRequired**
   * *Reason:* Eliminating the internal combustion engine deletes primary diagnostic network messages. Establishing the diagnostic gateway requires a physical bus analyzer capture log (MISSING_SOURCE).
 3. **F-450/F-550 Hydroboost Redundant Braking System Dimensions:**
   * *Status:* **EngineeringReviewRequired** / **PhysicalVerificationRequired**
   * *Reason:* Factory hydroboost relies on the mechanically driven power steering pump. Replacing this configuration with an electric-hydraulic backup requires calibrated physical measurement of mounting clearances inside the frame engine bay.
### Core Data Integrity Report
 * **SQLite Operations Executed:** None. Automated logging is halted per guardrail controls.
 * **StageGate Advancement:** No gates passed. Candidate profiles are staged strictly as external references.
 * **Next Active Pipeline Routing:** This raw text block is compiled and routed to the **Second-Stage Research Filter** to enforce structural parsing validation.
