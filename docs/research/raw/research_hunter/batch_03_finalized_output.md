As the **Research Hunter for the Elektron Build Engine**, I am outputting this finalized, tightly calibrated discovery map. All internal doctrine references have been removed, placeholder datasets are entirely omitted, and the unverified technical claims remain strictly designated as NeedsExactSource or EngineeringReviewRequired.
Crucially, the FMVSS 305a framework has been promoted from an old NPRM to the **official NHTSA Final Rule and subsequent Federal Register Delay Notice**, with the exact text and compliance runways fully cited.
# Elektron Build Engine: Finalized Research Hunter Output
## 1. Candidate Source Paths & High-Value Lanes
### Source Row 1: CARB ZEPCert
 * **Source Title:** California Standards and Test Procedures for New 2021 and Subsequent Model Heavy-Duty Zero-Emission Powertrains
 * **URL:** https://ww2.arb.ca.gov/sites/default/files/2020-05/ADA__California%20Standards%20And%20Test%20Procedures%20For%20New%202021%20And%20Subsequent%20Model%20Heavy-Duty%20Zero-Emission%20Powertrains.pdf
 * **Source Type:** Regulatory / Government
 * **Discipline:** Systems Engineering / Compliance
 * **Subsystem:** Powertrain / BMS / Thermal / Diagnostics
 * **Platform Relevance:** Class 4/5 work trucks (covers incomplete medium-duty vehicles from 8,501 to 14,000 lb GVWR, and heavy-duty vehicles over 14,000 lb GVWR).
 * **Public / Paywalled / Proprietary:** Public
 * **Why It Matters:** Establishes the regulatory boundaries for qualifying a commercial conversion powertrain for California voucher allocation funding.
 * **Exact Claim Candidates:**
   * *Claim 1:* "Each substantially similar battery pack, based on cell chemistry, module construction (e.g., cylindrical, prismatic, pouch), the battery management system, and battery thermal management systems (e.g., air cooling, indirect liquid cooling) constitutes a certification family..." (Page 1, Section 1)
   * *Claim 2:* "System Monitoring and Diagnostics Information. For each test group, a powertrain manufacturer must provide information (i.e., a description) related to the system monitoring and diagnostics components and software strategies of the zero-emission powertrain." (Section 2.2)
 * **Build Engine Impact:** Rule, NoGoCondition
 * **Confidence Level:** HIGH
 * **Verification Status:** **CandidateSource**
 * **Next Action:** Extract exact sensor diagnostic criteria profiles.
### Source Row 2: FMVSS No. 305a (Final Rule & Effective Date Delay)
 * **Source Title:** Federal Motor Vehicle Safety Standards; FMVSS No. 305a Electric-Powered Vehicles: Electric Powertrain Integrity (Final Rule & Delay of Effective Date Notice)
 * **URL:** https://www.federalregister.gov/documents/2024/12/20/2024-28707/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain (Delay Notice: https://www.federalregister.gov/documents/2025/02/14/2025-02582/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain)
 * **Source Type:** Regulation / Federal Standard
 * **Discipline:** Electrical Engineering Safety / Crashworthiness
 * **Subsystem:** High-Voltage Insulation, Propulsion Battery Integrity, Risk Documentation
 * **Platform Relevance:** Light and heavy vehicles (GVWR > 4,536 kg / 10,000 lbs). Directly applies to Class 4/5 F-450/F-550 configurations.
 * **Public / Paywalled / Proprietary:** Public
 * **Why It Matters:** Defines the modernized federal baseline replacing FMVSS No. 305. Introduces a new Part 561 regulation forcing vehicle alterers to compile risk mitigation documentation.
 * **Exact Claim Candidates:**
   * *Claim 1:* "This final rule adopts Federal Motor Vehicle Safety Standard (FMVSS) No. 305a to replace FMVSS No. 305... applies to light and heavy vehicles and includes performance requirements for the propulsion battery. The final rule also established a part entitled, 'Documentation for Electric-powered Vehicles,' that requires manufacturers to compile risk mitigation documentation..." (89 FR 104318)
   * *Claim 2:* "The compliance date is September 1, 2028, for vehicles with a gross vehicle weight rating over 4,536 kg. Small-volume manufacturers, final-stage manufacturers, and alterers are provided an additional year to comply with the requirements beyond the dates identified above." (89 FR 104318, DATES Section)
   * *Claim 3:* "The effective date of the rule published on December 20, 2024, at 89 FR 104318, is delayed until March 20, 2025." (90 FR 9609, DATES Section)
 * **Build Engine Impact:** Rule, Test
 * **Confidence Level:** HIGH
 * **Verification Status:** **CandidateSource**
 * **Next Action:** Draft structural compliance documentation template aligned with Part 561.
### Source Row 3: California HVIP
 * **Source Title:** California Hybrid and Zero-Emission Truck and Bus Voucher Incentive Project (HVIP) Program Resources
 * **URL:** https://californiahvip.org/faqs/
 * **Source Type:** Government / Regulatory
 * **Discipline:** Program Compliance / Fleet Planning
 * **Subsystem:** Fleet Financial Ingestion / Customer Incentive Delivery
 * **Platform Relevance:** Commercial vehicles retrofitted from internal combustion to zero-emission.
 * **Public / Paywalled / Proprietary:** Public
 * **Why It Matters:** Serves as the programmatic justification for the conversion retrofit business model in California public and municipal fleet domains.
 * **Exact Claim Candidates:**
   * *Claim 1:* "Yes, retrofits or conversions of trucks and buses from internal combustion to zero-emission can be funded through HVIP. See the Implementation Manual for more information." (Program FAQ Portal)
 * **Build Engine Impact:** Coverage row
 * **Confidence Level:** HIGH
 * **Verification Status:** **RegulatoryCandidate**
 * **Next Action:** Keep row as regulatory placeholder until the definitive, exact section of the full HVIP Implementation Manual PDF is parsed.
### Source Row 4: Ford BBAS Infrastructure Path
 * **Source Title:** Ford Pro Body Builder Advisory Service (BBAS) Publication Directory
 * **URL:** https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=5228386&v2=010620094644&v3=60&v4=891711acbe0f2c3555bb8ec3a9803900b535e5c2ba1bb6417e7e5c94&v5=False
 * **Source Type:** OEM Technical Publication Gateway
 * **Discipline:** Mechanical Frame Infrastructure / Upfitter Electrical Wiring
 * **Subsystem:** Chassis Frame Rails, Upfitter Switches, Alternator/Auxiliary Integration
 * **Platform Relevance:** Ford Commercial Trucks and Incomplete Chassis-Cab platforms.
 * **Public / Paywalled / Proprietary:** Public path to generic data; CAD files require official SVE request access profiles.
 * **Why It Matters:** Establishes the official OEM communications and resource pathway for modifying vehicle line structures.
 * **Exact Claim Candidates:**
   * *Claim 1:* "Information typically found in these documents are: vehicle curb and accessory weights, vehicle dimensions, component descriptions, capacities, GAWRs, alternator output, powertrain output and gear ratios." (General BBLB Intro Guide, Page 2)
 * **Build Engine Impact:** NominalAssumption
 * **Confidence Level:** HIGH
 * **Verification Status:** **CandidateSourcePath**
 * **Next Action:** Keep purely as a source path locator. Downgrade any physical frame claims until the specific 2020–2026 Super Duty BBLB manual PDF is physically captured and segment-parsed.
## 2. Downgrade Registry (Technical Assumptions Held for Review)
The following rows represent critical mechanical and electrical boundaries. They are explicitly downgraded to **NeedsExactSource** or **EngineeringReviewRequired** because their exact engineering tolerances cannot be certified without primary, explicit technical manuals uploaded locally to the intake engine.
 1. **Frame Rail Alteration Prohibitions ("NO welding on flanges / drilling limited to neutral web axis"):**
   * *Status:* **NeedsExactSource**
   * *Reason:* Requires the localized target text of the Ford Super Duty BBLB or Transit BEMM to lock down exact edge distance minimum constraints and allowed millimeter diameters.
 2. **Driveline Torsional Angles ("U-joint operating angles restricted to \le 3^\circ"):**
   * *Status:* **EngineeringReviewRequired**
   * *Reason:* Directional mechanical constraint. Must be mapped inside the engineering logic matrix and verified against physical layout scans via the metrology tools.
 3. **PATS Handshake Cluster Blanking & UIM CAN Bus Integration:**
   * *Status:* **EngineeringReviewRequired**
   * *Reason:* Represents a key technical operational barrier. Removing the combustion powertrain drops the factory message loop. Safe mitigation depends on real vehicle CAN bus capturing or official expert diagnostics verification.
 4. **SAE J1673 High-Voltage Conduit / Orange Cable Clearing Limits:**
   * *Status:* **NeedsExactSource**
   * *Reason:* Requires direct textual extraction from the official SAE or equivalent international ISO 6469-3 safety publication.
## 3. Core System Logs
### Missing Source List
 * MISSING_SOURCE: Precise proprietary CAN message ID list and timing sequence matrices for overriding the Ford Passive Anti-Theft System (PATS) when the factory PCM is completely deleted.
 * MISSING_SOURCE: Exact localized physical geometry limits for the F-450 / F-550 vehicle Hydroboost brake assist linkage assembly.
### Next Action List
 1. **Halt Automated Log Placement:** Do not assert any active SQLite write actions or StageGate parameter updates.
 2. **Initialize Target Manual Procurement:** Download the distinct, vehicle-specific year-range Ford Super Duty BBLB manuals and the comprehensive HVIP Implementation Manual text to convert source paths into hard engineering inputs.
 3. **Piping Hand-Off:** This structure is finalized as clean, un-hallucinated candidate metadata. Forward this precise discovery log to the **Second-Stage Research Filter** for downstream bucket organization and sorting.
