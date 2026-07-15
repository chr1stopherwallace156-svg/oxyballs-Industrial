# RH-01 — SECOND-STAGE RESEARCH FILTER OUTPUT

**Input:** Research Hunter run RH-01 (external agent output, reviewed by
owner 2026-07-15)
**Filter status:** Research Hunter output: PASS · Second-stage filter:
APPLIED · Direct Build Engine ingestion: **NO**
**Hard statements:**

- Nothing in this file is ingested into `docs/specifications/rev07/`.
- No SQLite or database writes occurred or are claimed.
- **Nothing below is Confirmed.** Every row is candidate material.
- ODR-001..ODR-003 remain Open and untouched.
- These rows are NOT entries in `docs/research/SourceClaims.md`;
  promotion happens only after exact-locator extraction and owner
  approval.

**Traceability:** the raw RH-01 output is archived 1:1 at
[`docs/research/raw/research_hunter/batch_01_research_map.md`](../raw/research_hunter/batch_01_research_map.md)
(received from owner 2026-07-15; see the directory's `PROVENANCE.md`).
Every row below traces to that file. The raw document's own
"Second-Stage Research Filter Evaluation" section has no authority —
this file supersedes it (see Addendum, section 7).

---

## 1. Approved CandidateSource rows

| ID | Type | Document | Publisher / identifier | Exact URL | Status |
|---|---|---|---|---|---|
| CS-01 | CandidateSource | *California Standards and Test Procedures for New 2021 and Subsequent Model Heavy-Duty Zero-Emission Powertrains* | CARB; program page: Zero-Emission Powertrain Certification | Procedure PDF: <https://ww2.arb.ca.gov/sites/default/files/2020-05/ADA__California%20Standards%20And%20Test%20Procedures%20For%20New%202021%20And%20Subsequent%20Model%20Heavy-Duty%20Zero-Emission%20Powertrains.pdf> · Program: <https://ww2.arb.ca.gov/our-work/programs/zero-emission-powertrain-certification> | Candidate |
| CS-02 | CandidateSource | *FMVSS; FMVSS No. 305a Electric-Powered Vehicles: Electric Powertrain Integrity; GTR No. 20 Incorporation by Reference* — Final rule, published 2024-12-20, FR Doc. 2024-28707, **89 FR 104318** *(citation Hunter-supplied in batch_03; consistent with the delay notice's cross-reference; independent verification pending, B-002)* | NHTSA / Federal Register | <https://www.federalregister.gov/documents/2024/12/20/2024-28707/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain> | Candidate |
| CS-03 | CandidateSource | Same title — *Delay of effective date*, published 2025-02-14, FR Doc. 2025-02582, **90 FR 9609–9610** | NHTSA / Federal Register | <https://www.federalregister.gov/documents/2025/02/14/2025-02582/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain> | Candidate |
| CS-04 | **RegulatoryCandidate** (not final eligibility) | *FAQs — Clean Truck and Bus Voucher Incentive Project (California HVIP)*; details deferred to *HVIP Implementation Manual* (FY23-24, updated 2024-10-31) | CALSTART / CARB | FAQ: <https://californiahvip.org/faqs/> · Manual PDF: <https://californiahvip.org/wp-content/uploads/2024/10/FY23-24-HVIP-Implementation-Manual-103124.pdf> | Candidate — eligibility NOT concluded until the Manual's conversion section is extracted |
| CS-05 | **CandidateSourcePath** (path only, no claims) | *Ford Pro Body Builder Advisory Service (BBAS)* — portal to BBLBs, BEMM, CAD files | Ford Pro | BBAS: <https://www.fordpro.com/en-us/upfit/bbas/> · Publications: <https://www.fordpro.com/en-us/upfit/publications/> | Candidate path — **no physical frame claims** until the vehicle-specific Super Duty (F-450/F-550) BBLB is obtained and parsed |
| CS-06 | CandidateSource — **supplementary, proposal-stage only** | *FMVSS No. 305a — Notice of Proposed Rulemaking* (NHTSA web version, April 2024) | NHTSA | <https://www.nhtsa.gov/sites/nhtsa.gov/files/2024-04/FMVSS-305a-NPRM-Web-Version.pdf> | Candidate — NPRM text describes *proposals*; it can corroborate structure but **never instantiate rules**; the final rule (CS-02) governs (added from batch_02) |
| CS-07 | CandidateSource | *Ford General Body Builder Layout Book (BBLB)* — general edition, not vehicle-specific | Ford BBAS (public server asset; CAD requires upfitter login via fleet.ford.com/truckbbas) | <https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=5228386&v2=010620094644&v3=60&v4=891711acbe0f2c3555bb8ec3a9803900b535e5c2ba1bb6417e7e5c94&v5=False> | Candidate. **Scope (owner correction, review_01): general Ford modifier guidance — NOT "all Super Duty"; every platform-specific application of its claims is `NeedsVehicleSpecificBBLB` until the Super Duty / F-450/F-550 BBLB is parsed.** (URL is a tokenized asset link — verify stability, mirror the PDF into `docs/research/raw/` when obtainable) |
| CS-08 | CandidateSource — **secondary technical review (LeadOnly-class, points to primary)** | *Lectromec analysis of SAE J1673 (High Voltage Automotive Wiring Assembly Design)* | Lectromec (industry technical review) | <https://lectromec.com/hv_automotive_standard/> | Candidate (batch_06) — claims **about** J1673 only; the standard itself remains `NeedsExactSource`; no rule may be instantiated from this review — lane L5 |
| CS-09 | **CandidateSourcePath — provenance concern** | *Ford Transit & E-Transit Body and Equipment Mounting Manual (BEMM), MY2022, North America* | Ford (document) — but URL is an **unofficial third-party mirror** (library.mikesservers.com), not a Ford server | <https://library.mikesservers.com/F/Ford/Transit,%202022/MY2022%20Ford%20Transit%20&%20E-Transit%20Body%20Guide.pdf> | Candidate path only (batch_06). **Obtain the official copy via Ford BBAS before any claim promotion** — mirror provenance/currency unverifiable. Platform = Transit, NOT Super Duty — lanes L1/L4 |
| CS-10 | CandidateSourcePath | *Ford Commercial Vehicle Pickup Box Removal & Alterations Bulletin (Q-356R2)* — 2023MY+ Super Duty | Ford BBAS (marketingassociates tokenized asset URL — verify stability) | <https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=7729328&v2=031523085017&v3=60&v4=927125bfc7f5be0d249fcddad8ed63f05411a11e524eabd101788a31&v5=False> | Candidate (batch_07) — first **Super-Duty-specific** OEM document path on file — lane L1 |
| CS-11 | CandidateSource | *HVIP Grant Solicitation (ADA), 2026-03* — CARB solicitation referencing the Implementation Manual's appendix structure | CARB | <https://ww2.arb.ca.gov/sites/default/files/2026-03/HVIP-Solicitation_ADA.pdf> | Candidate (batch_07) — RegulatoryCandidate class — lane L2 |
| CS-12 | **CandidateSourcePath — provenance concern (third-party mirror)** | *2022 Ford Body Application Guide* (claimed) | URL is xr793.com, NOT a Ford server | <https://xr793.com/wp-content/uploads/2021/10/2022-Ford-Body-Application-Guide.pdf> | Lead only (batch_07; owner review_02: prefer Ford-controlled sources) — corroborates RC-16/RC-18 direction; no promotion from this mirror — lanes L1/L4 |
| CS-13 | **LeadOnly — background** | *EngineCert "What is ZEP certification…"* (industry explainer referencing UL 2580 / CARB concepts) | enginecert.com (commercial consultancy) | <https://enginecert.com/what-is-zep-certification-and-do-you-need-it/> | Background only (batch_07; owner review_02): concept identification only; **cooling/current/temperature/derating/BMS thresholds must come from supplier datasheets, CARB text, OEM data, or testing** — lane L6 |
| CS-14 | **NeedsOfficialSource** (owner review_03) | *SAE J1742: High Voltage Connection Systems for On-Board Road Vehicle Electrical Wiring Harnesses* — accessed via **Scribd**, not an SAE-controlled copy | SAE (standard); Scribd (uncontrolled host) | <https://www.scribd.com/document/819729663/SAEJ1742v001> | Technical-standard lead (batch_08). **No connector rule until the official SAE copy or supplier-certified test data is obtained** — lane L5 |
| CS-15 | **SupplierCandidate** (owner review_03 promotion) | *Chilye MINI Manual Service Disconnect (MSD) specification sheet* | Chilye / citini.com | <https://citini.com/wp-content/uploads/2022/07/CL-Mini-MSD-Specification-EN.pdf> | Candidate (batch_08) — `NeedsSupplierData` + `NeedsEngineeringReview`; **rule candidates are scoped to this component family only, and must be tied to a chosen part number** — lane L5/L9 |
| CS-16 | **CandidateSourcePath / NeedsExactSource** (owner review_03) | *ISO 6469-3:2021 — Electrically propelled road vehicles — Safety — Part 3: Protection of persons against electric shock* — OBP scope preview only; full text paywalled | ISO | <https://www.iso.org/obp/ui/en/#!iso:std:81746:en> | Candidate path (batch_08). **No isolation-resistance thresholds or monitoring test procedures until the actual standard text (or another official requirement) is on file** — lane L5 |
| CS-17 | **SupplierCandidate — CP#1 solution candidate** (owner review_03 promotion) | *Brogen dual-power Electric Hydraulic Power Steering (EHPS) system page* | Brogen | <https://brogenevsystem.com/parts/electric-power-steering-system/> | Candidate (batch_08) — `EngineeringReviewRequired` + `PhysicalVerificationRequired`. **Does NOT solve CP#1**: Ford hydroboost pressure/flow, steering gear and brake-assist requirements, reservoir, failure modes, mounting space, supply path, LV backup capability, and test procedure all still missing — lanes L10/L4/L9 |
| CS-18 | **CandidateSource — UIM behavior ONLY** (owner review_03) | *Ford Commercial Vehicle Bulletin Q-251R2: Upfitter Interface Module (UIM)* | Ford BBAS (tokenized asset URL) | <https://madocumentupload.marketingassociates.com/api/Document/GetFile?v1=5405699&v2=060820094914&v3=60&v4=f5785dff32699c207928189560abaea217d868268fbcbe8b49e69555&v5=False> | Candidate (batch_08). Proves UIM behavior and source path; **proves nothing about PCM-delete/PATS/cluster behavior** — lane L7 |
| CS-19 | **BackgroundSupplier — WrongPlatformRisk** (owner review_03 downgrade) | *EV West electric power steering unit* (12 V column EPS) | EV West | <https://evwest.com/electric-power-steering-unit-for-electric-vehicles> | Background (batch_08). Likely light-vehicle EPS — **not to be used for F-450/F-550 steering unless an engineer confirms applicability**; Brogen-style EHPS is the relevant truck lane — lane L9 |
| CS-20 | **SupplierCandidate — MetricCandidate** (owner review_04 promotion) | *Sendyne SIM100MLP isolation monitor for unearthed (IT) DC power systems — datasheet V1.1a* | Sendyne (PDF hosted at dc-components.com) | <https://dc-components.com/wp-content/uploads/Sendyne-SIM100MLP-Datasheet-V1.1a.pdf> | Candidate (batch_09) — `NeedsEngineeringReview`. Isolation-monitoring metric/test candidates only — lane L5/L9 |

## 2. Candidate SourceClaim rows

Status legend: `Candidate` = passed second-stage filter, exact
URL + title present, **not Confirmed**. `Locator` = page/section/table.
Locator extraction from .gov/CARB/Cornell hosts is currently blocked in
this execution environment (HTTP 403 via network proxy) — see B-002.

| ID | Claim (stated narrowly) | Source | Locator | Status |
|---|---|---|---|---|
| RC-01 | CARB ZEP applicability: "All Model Year (MY) 2021 and subsequent MY electric and hydrogen fuel-cell powertrains intended for use in heavy-duty vehicles (over 14,000 pounds gross vehicle weight rating) and incomplete medium-duty vehicles (from 8,501 through 14,000 pounds gross vehicle weight rating) **may be certified** to these procedures." *(Hunter-supplied full quote, batch_06 — note "may be certified": the procedure reads as an available certification pathway, not a blanket mandate; mandate-vs-option must be resolved from context)* | CS-01 | **Candidate locator (batch_06): Section 1** — unverified (B-002) | Candidate — lane L2 |
| RC-02 | The procedure defines battery certification families: "Each substantially similar battery pack, based on cell chemistry, module construction …, the battery management system, and battery thermal management systems … constitutes a certification family **and each family is required to obtain its own Executive Order.**" *(Hunter-supplied; batch_05 extends the batch_02 quote with the EO-per-family clause)* | CS-01 | **Candidate locator (batch_02/05): Page 1, Section 1** — quote unverified against the PDF (B-002) | Candidate |
| RC-03 | The procedure requires system monitoring and diagnostics information: "For each test group, a powertrain manufacturer must provide information … related to the system monitoring and diagnostics components and software strategies of the zero-emission powertrain." *(Hunter-supplied quote)* | CS-01 | **Candidate locator (batch_02): Section 2.2, System Monitoring and Diagnostics** — quote unverified against the PDF (B-002) | Candidate |
| RC-04 | FMVSS No. 305a replaces FMVSS No. 305 ("Electric-powered vehicles: electrolyte spillage and electrical shock protection") | CS-02, corroborated by CS-03 summary | Final rule SUMMARY. *Batch_06 attributes the recurring summary language to **90 FR 9609, Summary section** (delay notice) — consistent with the §9 splice finding; final-rule-native wording still to be extracted* | Candidate — lane L2 |
| RC-05 | FMVSS No. 305a expands applicability to vehicles with GVWR > 4,536 kg (10,000 lb) ("heavy vehicles") | CS-02 | Final rule SUMMARY / S2 Application | Candidate |
| RC-06 | FMVSS No. 305a adds REESS performance requirements applying to all vehicles regardless of GVWR | CS-02 | Pending extraction | Candidate |
| RC-07 | The final rule establishes 49 CFR part 561, "Documentation for Electric-powered Vehicles": "…requires manufacturers to compile risk mitigation documentation and to submit standardized emergency response information to assist first and second responders handling electric vehicles." *(Hunter-supplied quote, batch_05)* | CS-02 | **Candidate locator (batch_05): 89 FR 104318, Executive Summary** — unverified (B-002) | Candidate |
| RC-08 | Per-class compliance dates: "For all other requirements, the compliance date is September 1, 2027, for vehicles with a gross vehicle weight rating of 4,536 kilograms (kg) or less and September 1, 2028, for vehicles with a gross vehicle weight rating over 4,536 kg." *(Hunter-supplied, batch_05 — fuller sentence superseding the batch_03 fragment; resolves the 2027/2028 structure at candidate level: 2027 = light, 2028 = heavy, consistent with the codified heading)* | CS-02 | **Candidate locator (batch_03/05): 89 FR 104318, DATES section** — unverified (B-002). Open nuance: the "For all other requirements" prefix implies some requirements carry *different* dates — the preceding DATES text must be extracted before this row is complete | Candidate — **verification flag** |
| RC-09 | Small-volume manufacturers, final-stage manufacturers, and alterers receive an additional year to comply beyond the identified dates *(Hunter-supplied quote, batch_03; scope now includes small-volume manufacturers and reads as the full rule requirements, not only part 561 — earlier narrower phrasing superseded)* | CS-02 | **Candidate locator (batch_03): 89 FR 104318, DATES section** — quote unverified (B-002). Structure corroborated at proposal stage by CS-06 (NPRM Dates, p. 2) | Candidate — **verification flag** |
| RC-10 | The effective date of the 2024-12-20 final rule was delayed until March 20, 2025: "The effective date of the rule published on December 20, 2024, at 89 FR 104318, is delayed until March 20, 2025." *(Hunter-supplied quote, batch_03, consistent with the notice metadata verified 2026-07-15)* | CS-03 | 90 FR 9609, DATES section (notice spans 90 FR 9609–9610) | Candidate |
| RC-11 | The HVIP FAQ states that retrofits or conversions of trucks and buses from internal combustion to zero-emission can be funded through HVIP, and refers to the Implementation Manual for details | CS-04 | FAQ entry "Is retrofitting eligible for funding?" — verbatim supplied in batch_02 and consistent with the live FAQ summary verified 2026-07-15 | Candidate — **RegulatoryCandidate; NOT an eligibility conclusion** |
| RC-12 | *(Replacement for rejected R-01, owner-approved wording)* "CARB ZEPCert is a candidate regulatory path that **may** be required for certain California commercial retrofit/conversion incentive eligibility. Exact HVIP/ZEPCert relationship must be verified against the current HVIP Implementation Manual and CARB guidance." | Hypothesis over CS-01 + CS-04 | n/a — hypothesis, not a source claim | RegulatoryHypothesis — verification required |
| RC-13 | The NPRM *proposed* expanding FMVSS 305 applicability to vehicles with GVWR > 4,536 kg (10,000 lb) with added requirements and test procedures *(Hunter-supplied quote; proposal-stage corroboration of RC-05)* | CS-06 | **Candidate locator (batch_02): Executive Summary, Page 8** — unverified | Candidate — proposal-stage only |
| RC-14 | The NPRM *proposed* a compliance date two years after final-rule publication, with an additional year for small-volume manufacturers, final-stage manufacturers, and alterers *(Hunter-supplied quote; what the final rule adopted must come from CS-02 DATES)* | CS-06 | **Candidate locator (batch_02): Dates Section, Page 2** — unverified | Candidate — proposal-stage only |
| RC-15 | Each Ford Commercial Truck vehicle line has a program-specific Body Builders Layout Book for subsequent-stage manufacturers or alterers *(Hunter-supplied quote)* | CS-07 | **Candidate locator (batch_02): Reference Information, Page 2** — unverified | Candidate |
| RC-16 | General BBLB documents typically contain vehicle curb/accessory weights, dimensions, component descriptions, capacities, GAWRs, alternator output, powertrain output and gear ratios *(Hunter-supplied quote; documentation meta-claim, not an engineering value)* | CS-07 | **Candidate locator (batch_02): Reference Information, Page 2** — unverified | Candidate |
| RC-17 | "Adding holes or welding on frame **cross members** is not recommended." *(Hunter-supplied quote, batch_05 — cross members only; does NOT cover frame rails and does NOT upgrade downgrade 1)* | CS-07 | **Candidate locator (batch_05): Page 2, "Frame Alterations"** — unverified | Candidate |
| RC-18 | "All attaching fasteners, including flat washers, must be of high strength steel (Grade 8 for SAE fasteners, Property Class 10.9 for metric bolts, PC 10 for metric nuts)." *(Hunter-supplied quote, batch_05 — sources the batch_01 fastener assertion)* | CS-07 | **Candidate locator (batch_05): Page 2, "Frame Alterations"** — unverified | Candidate |
| RC-19 | Welding precautions: parts damageable by heat must be removed or shielded before welding; all batteries disconnected "…and sensitive" **[quote truncated mid-sentence in batch_05]** | CS-07 | **Candidate locator (batch_05): Page 2, "Frame Alterations"** — unverified; **incomplete quote — full sentence required before any use** | Candidate — **truncation flag** |
| RC-20 | §2.2 requires a listed description of monitoring/diagnostics components per powertrain subsystem, beginning "2.2.1 Energy Storage System (ESS) - Individual electronic inputs or…" **[quote truncated in batch_05]** | CS-01 | **Candidate locator (batch_05): Section 2.2 / 2.2.1** — unverified; **incomplete quote** | Candidate — **truncation flag** |
| RC-21 | HVIP Implementation Manual: "High-priority and public fleets using the milestones option may access HVIP for any zero-emission vehicles purchased in excess of their milestone requirement. Similarly, State and local agencies not using the milestones option may access HVIP for any vehicles purchased above their requirement." *(Hunter-supplied quote, batch_05 — first quote from inside the Manual; concerns fleet-level HVIP access relative to ACF-style requirements, NOT conversion eligibility; Appendix B extraction still pending)* | CS-04 | **Candidate locator (batch_05): Manual Section 1, "Fleet Regulations"** — unverified | Candidate — **RegulatoryCandidate** |
| RC-22 | General BBLB permits drilling in the vertical frame side-rail **web** with limits including ~1.5 in minimum distance from upper/lower flanges, max 0.75 in hole diameter, edge-distance limits, and avoiding closely-spaced vertical fastener succession *(owner-relayed, review_01 — citations stripped in transit; exact quote and page/line REQUIRED before any use)* | CS-07 | **Locator pending** — extraction target: General BBLB Frame Alterations | **NeedsVerification** + **NeedsVehicleSpecificBBLB** — Rule/NoGo/Measurement candidate; review: Fabricator/Engineer |
| RC-23 | General BBLB prohibits welding on frame **flanges**, including bend radii *(owner-relayed, review_01 — citations stripped; exact quote and page/line REQUIRED before any use)* | CS-07 | **Locator pending** — extraction target: General BBLB Frame Alterations | **NeedsVerification** + **NeedsVehicleSpecificBBLB** — Rule/NoGo candidate; review: Fabricator/Engineer |
| RC-24 | The HVIP Implementation Manual contains a **Zero-Emission Vehicle Conversions** section stating conversions to zero-emission are covered *(owner-relayed, review_01)* | CS-04 | **Locator pending** — extraction target: Manual, ZEV Conversions section | **RegulatoryCandidate**; review: HVIP/CARB program review |
| RC-25 | Appendix B materials state conversion kits must receive an **exemption Executive Order from CARB** *(owner-relayed, review_01 — substantiates the direction of batch_01's unpromoted EO claim; exact Appendix B text REQUIRED)* | CS-04 | **Locator pending** — extraction target: Manual Appendix B: Vehicle Eligibility | **RegulatoryCandidate**; review: HVIP/CARB program review |
| RC-26 | HVIP vehicles must be commercial, nonprofit, or public-fleet vehicles — not personal vehicles *(owner-relayed, review_01)* | CS-04 | **Locator pending** | **RegulatoryCandidate**; review: HVIP/CARB program review |
| RC-27 | Per the Lectromec review, J1673 §3.2.5 covers cable-size determination factors: temperature rise under operational load, steady-state vs duty cycle, fault conditions, mating-connection sizing, mechanical strength *(secondary-source claim ABOUT the standard)* | CS-08 | Review article; underlying standard section: **J1673 §3.2.5 — standard text NeedsExactSource** | Candidate — **NeedsExactSource** for the standard; lane L5 |
| RC-28 | Per the Lectromec review, J1673 states power-cable splices should be avoided where possible; a required splice must withstand fabrication, installation, and vehicle-environment abuse *(secondary-source claim ABOUT the standard)* | CS-08 | Review article; underlying: **J1673 §3.3 — standard text NeedsExactSource** | Candidate — **NeedsExactSource**; lane L5 |
| RC-29 | Transit/E-Transit BEMM §1.3.4 ("Drilling and Welding"): adding holes or welding on frame cross members is not recommended *(Hunter marked it "cross-matched from general commercial truck framework rules" — possibly NOT verbatim from this document; platform = Transit, corroborates RC-17's direction only)* | CS-09 | **Candidate locator (batch_06): §1.3.4** — unverified; source is an unofficial mirror | Candidate — **cross-match flag** + platform caveat; lanes L1/L4 |
| RC-30 | Q-356R2: "BBAS cannot provide support to eliminate error messages, warnings or MILs that are a result of removing the pickup box on vehicle configurations that are not supported for box removal… Refer to the Body Builder Layout Book for additional guidelines and recommendations." *(Hunter-supplied quote — directly relevant to CP#2: OEM confirms module/telltale consequences of unsupported configuration changes and offers no bypass support)* | CS-10 | **Candidate locator (batch_07): Page 2, Bulletin Q-356R2** — unverified | Candidate — lanes L1/L7 |
| RC-31 | HVIP Solicitation: "The current HVIP Implementation Manual (Appendix C) provides information on the current vehicle categories and requirements for HVIP implementation." *(Hunter-supplied quote — **conflicts with earlier Appendix B references** (RC-25, batch_01/review_01); appendix lettering may differ across manual years; the governing manual + appendix must be pinned)* | CS-11 | **Candidate locator (batch_07): Section III** — unverified | Candidate — **RegulatoryCandidate; appendix B-vs-C discrepancy flag** — lane L2 |
| RC-32 | SAE J1742 covers recommended test methods and performance requirements for single- and multi-pole HV connectors in EV/HEV on-board harnesses, 50–600 V AC/DC; connectors designed for disconnection in repair/maintenance; duty-cycle effects considered in design *(via uncontrolled Scribd copy)* | CS-14 | Scope/Performance Requirements — **NeedsOfficialSource** | Candidate — connector **test-checklist candidate only**; no rule until official copy — lane L5 |
| RC-33 | Chilye MSD: "…utilizes a two-stage lever which help to open the HVIL circuit prior to separation of HV connectors… Fuse Rated Voltage：600 to 700Vdc. Fuse Rated Current：Up to 500A, depends on fuse." *(supplier datasheet; values are THIS component family's specs, not design values)* | CS-15 | **Candidate locator (batch_08): page 2, "Applications and Electrical Specs"** — unverified | **SupplierCandidate** — `NeedsSupplierData` + `NeedsEngineeringReview`; component-family-scoped; part number required — lane L5/L9 |
| RC-34 | ISO 6469-3:2021 scope: electrical safety requirements for voltage class B electric-propulsion circuits; introduces voltage classes B1/B2 and a new test specification for the isolation-resistance monitoring system *(OBP preview text)* | CS-16 | Scope/Foreword — **NeedsExactSource** for all requirements | Candidate path — **no thresholds or test procedures may be derived yet** — lane L5 |
| RC-35 | Brogen EHPS: "The dual power electric steering pump operates using both a high voltage battery pack (DC540V) and a low voltage battery (DC24V). If the high voltage supply disconnects suddenly, the low voltage system takes over…" *(supplier marketing/engineering page; DC540V/DC24V are THIS supplier's example parameters, not requirements)* | CS-17 | "EHPS Operations & Vehicle Types" — unverified | **SupplierCandidate — CP#1 solution candidate**; `EngineeringReviewRequired` + `PhysicalVerificationRequired`; owner's 10-item missing list applies (see CS-17) — lanes L10/L4 |
| RC-36 | Ford Q-251R2: "The UIM receives 28 high speed CAN 'read only' signals from various vehicle systems… the UIM has no interaction with vehicle feature functions (with the exception of horn chirp). It is strictly designed to provide outputs for aftermarket equipment." *(OEM bulletin — proves UIM behavior only)* | CS-18 | **Candidate locator (batch_08): page 2, "UIM Signals & Logic"** — unverified | Candidate — **scope-limited to UIM behavior**; lane L7 |
| RC-37 | EV West EPS unit: upper spline Woodward #102, lower #114; input shaft 3/4 in, 36-spline GM *(supplier specs for a 12 V column-EPS unit)* | CS-19 | Specs matrix — unverified | **BackgroundSupplier — WrongPlatformRisk** for F-450/F-550; engineering confirmation required before any use — lane L9 |
| RC-38 | Sendyne SIM100MLP: "If either of the isolation resistances decreases below the threshold of 100 Ohms/Volt a hazard occurs if a person makes contact with the terminal 'opposite' to the leaking resistor." Monitor continuously tracks isolation resistance to chassis, reports in Ω/V over isolated CAN 2.0B *(owner correction, review_04: **the 100 Ω/V figure is this datasheet's safety discussion — NOT the system threshold** until cross-checked against FMVSS 305a / ISO 6469-3 / chosen component requirements)* | CS-20 | **Candidate locator (batch_09): page 2, Figure 2 context / parameters matrix** — unverified | **SupplierCandidate — MetricCandidate + TestCandidate**; `NeedsEngineeringReview`; threshold cross-check required — lane L5 |
| RC-39 | Per the Lectromec review, J1673 requires unique keying for connectors in close proximity (mis-mate prevention) and identification of all connector cavities/contacts *(secondary-source claim ABOUT the standard)* | CS-08 | Review article; underlying: **J1673 §3.3/3.4 — standard text NeedsExactSource** | **TechnicalBackground / NeedsExactSource** (owner review_04 downgrade applies to all Lectromec-derived rows incl. RC-27/RC-28) — lane L5 |

## 3. Downgraded claims (kept downgraded — NOT SourceClaims)

| Claim | Status | What would upgrade it |
|---|---|---|
| Ford frame alteration limits (drilling/welding restrictions) | `NeedsVerification` + `NeedsVehicleSpecificBBLB` *(upgraded from `NeedsExactSource` 2026-07-15: content candidates now on file as RC-22/RC-23 via owner review; exact General-BBLB quote + page/line still required, and platform-specific application still gated on the Super Duty BBLB)* | (1) exact quote + page/line from the General BBLB; (2) vehicle-specific Super Duty (F-450/F-550) BBLB obtained, archived, and parsed |
| U-joint operating angle ≤ 3° | `EngineeringReviewRequired` | Exact source (manufacturer/SAE document + section) **and** engineering review — no promotion on source alone |
| PATS handshake / cluster blanking; UIM CAN bus integration | `EngineeringReviewRequired` / `MISSING_SOURCE` | Official Ford documentation (BEMM/UIM section) archived + engineering review |
| SAE J1673 HV cable claim | `NeedsExactSource` | SAE J1673 document obtained; claim restated with clause/table reference |

## 4. Rejected

| Item | Reason |
|---|---|
| "A vehicle conversion cannot access primary California incentive networks without matching these identical testing boundaries." | Broad compliance/incentive conclusion not directly supported by source text. Replaced by RC-12 (narrow, verification-required hypothesis). |
| Any claim lacking exact source URL + document title + page/section/table | Categorical filter rule — such claims may re-enter only via the downgraded lists above with a concrete upgrade path. |

## 5. Missing-source list

1. ~~**Raw RH-01 output document**~~ — **RESOLVED 2026-07-15**:
   archived at `docs/research/raw/research_hunter/batch_01_research_map.md`.
2. **FMVSS 305a final rule verbatim DATES/S2 text** (RC-05, RC-06,
   RC-08, RC-09) — retrieval blocked in this environment (B-002).
3. ~~**89 FR start page** of the final rule~~ — **candidate value
   supplied 2026-07-15**: 89 FR 104318 (batch_03, Hunter-supplied;
   corroborated by the delay-notice text quoting "published on
   December 20, 2024, at 89 FR 104318"; independent verification still
   pending under B-002).
4. **CARB ZEP procedure verbatim applicability / cert-family /
   monitoring-diagnostics text with section numbers** (RC-01..RC-03).
5. **HVIP Implementation Manual (FY23-24) conversion/retrofit section**
   — required before CS-04 can move beyond RegulatoryCandidate.
6. **Ford Super Duty F-450/F-550 BBLB** — required for any physical
   frame claim.
7. **SAE J1673** document (batch_02 notes ISO 6469-3 as a possible
   alternative safety reference — also not on file).
8. **Ford BEMM/UIM documentation** for PATS/CAN integration claims —
   batch_02 sharpens this to: verbatim Super Duty upfitter bulletin
   text for UIM pinout and handshake timing.
9. **Calibrated metrology coordinates for F-450/F-550 hydroboost
   bracket geometry** (added from batch_02) — physical measurement
   data; can only come from the M8-style measurement capture on real
   hardware, never from documents.

## 6. Next-action list

1. Owner supplies the raw RH-01 output → archive unchanged under
   `docs/research/raw/` and link it from this file's traceability note.
2. Resolve B-002: extract verbatim DATES + S2 text of the final rule
   (owner-supplied PDF, or an agent/session with access to
   federalregister.gov / govinfo.gov / ecfr.gov), then reconcile the
   2027-09-01 (codified heading) vs 2028-09-01 (heavy vehicles) date
   structure and clear the RC-08/RC-09 verification flags.
3. Extract CARB procedure applicability, certification-family, and
   monitoring/diagnostics sections with section numbers (RC-01..03).
4. Extract the HVIP Implementation Manual conversion section; only then
   consider drafting a final eligibility claim (still owner-approved).
5. Obtain and archive the Super Duty BBLB; parse frame-alteration
   content; re-evaluate the downgraded Ford frame claims.
6. Obtain SAE J1673; restate the cable claim with clause reference.
7. Schedule engineering review for the U-joint angle and PATS/UIM/CAN
   items — source extraction alone does not upgrade them.
8. **Owner decision needed:** none of the rev07 modules (01–12) covers
   regulatory/incentive doctrine. Decide whether this stream maps into
   Module 01 (Global Doctrine) or a new module (e.g.
   `13_REGULATORY_AND_INCENTIVES`) before any consolidation of this
   material.

---

## 7. Addendum — delta review of the archived raw RH-01 (2026-07-15)

The archived raw document
(`docs/research/raw/research_hunter/batch_01_research_map.md`) contains
material beyond the rows filtered above. Filter dispositions:

### Rejected from the raw document

| Item (raw location) | Disposition |
|---|---|
| **"Supplier Traction Motor Datasheet" row** (section 12): *Internal NDA*, "150 kW at 65°C coolant inlet", "250 kW peak / 60-second window" | **REJECTED** — no source URL, no document title, no obtainable document; a placeholder supplier with specific numeric values is indistinguishable from invented engineering values (Constitution, Article III). Not carried as a CandidateSource. Real supplier data re-enters only as an archived, identified datasheet under NDA handling. |
| **"Second-Stage Research Filter Evaluation"** (final section), including "Conflict List: None" and "Route these structured candidate objects directly into the final review queue … for permanent logging" | **REJECTED** — agent self-assessment, not verification (AGENTS.md trust rules); the routing instruction violates the ingestion gate. Superseded by this file. Its "Conflict List: None" is contradicted by the discrepancies below. |
| **FMVSS 305a subtitle as given**: "(Electric Vehicle Dual-Voltage and High-Voltage Safety)" (section 1) | **REJECTED as a title claim** — the actual rule title is "Electric-Powered Vehicles: Electric Powertrain Integrity; GTR No. 20 Incorporation by Reference" (CS-02). Recorded as a raw-document inaccuracy. |
| **HVIP Appendix B eligibility-if-EO claim** (section 3): eligibility "if they hold an active CARB Executive Order" | **NOT PROMOTED** — more specific than the verified FAQ text (RC-11) and unverified against the Manual. "Appendix B" is retained as a **candidate locator** for next-action 4; the EO condition remains unconfirmed until the Manual section is extracted. |

### Unfiltered candidate topics (present in raw, not yet filtered rows)

These are research directions only — no rows created, no statuses
assigned; each needs its own source-and-locator pass:
HVIL convention; UL 2580; SAE Grade 8 / Class 10.9 fastener practice;
Ford IVM/IVD and SVE bulletins; BAR/DMV fuel-type-change requirements;
CARB ACF public-fleet rule; CP#1 hydroboost brake/steering assist loss
(raw correctly marks ENGINEERING_REVIEW_REQUIRED / REAL_TEST_REQUIRED);
scan-to-CAD metrology limits; QUBO fleet-optimization (raw correctly
marks FUTURE RESEARCH ONLY — never usable for safety/fitment/compliance).

### Raw missing-source entries carried forward

- MISSING_SOURCE: proprietary Ford Super Duty cluster CAN message
  IDs/timing (matches downgraded PATS/UIM row).
- NEEDS_SUPPLIER_DATA: verified low-temperature current derating curves
  for Tier-1 commercial BMS (no supplier engaged; no values on file).

---

## 8. Batch 02 reconciliation (2026-07-15)

Raw source: `docs/research/raw/research_hunter/batch_02_strict_source_map.md`.
Batch 02 is the Hunter's tightened second pass. It confirms the fake
supplier placeholder was removed and supplies quoted text with claim
locations. Dispositions beyond the row updates above (CS-06, CS-07,
RC-02/03/09/11 locators, RC-13..RC-16):

### Flags and rejections from batch 02

| Item (batch_02 location) | Disposition |
|---|---|
| Recurrence of "A vehicle conversion cannot access primary California incentive networks without matching these identical testing boundaries" (Source Row 1, Why It Matters) | **REMAINS REJECTED** (section 4). The Hunter keeps reasserting this broad conclusion; RC-12 is the approved narrow form. Watch for it in future batches. |
| "the effective date anchor is officially finalized for September 1, 2027" (Source Row 2, note) | **REJECTED as stated** — conflates dates. Per CS-03 the final rule's *effective date* was delayed to 2025-03-20; September 1, 2027 appears in the codified section heading as the start of *mandatory applicability*. The per-class compliance-date structure remains open under RC-08's verification flag. |
| FMVSS 305a cited via the NPRM as "Framework Baseline" (Source Row 2) | **Accepted only as CS-06, supplementary/proposal-stage.** NPRM quotes describe proposals ("Proposed FMVSS No. 305a would…"). No rule may be instantiated from NPRM text; the final rule (CS-02) governs. |
| "upload the local copy of ELK-BuildEngine-Doctrine-StageGate.pdf to extract exact validation scripts" (Next Action 1) | **REJECTED as a research action** — that is an internal doctrine document, not external research; it enters only via the owner through the REV07 ingestion pipeline, and "validation scripts" would be M10-adjacent work that is out of phase. |
| "Route this candidate array directly to your second-stage filter model" (Next Action 2) | Consistent with the actual pipeline (this file *is* the second-stage filter) — no action needed. |

### Consistency checks against batch 01

- Batch 02's downgrade registry matches the section-3 downgrades
  (frame rails, U-joint ≤ 3°, UIM/PATS, SAE J1673) — no status changes.
- Batch 02 explicitly states the NDA supplier placeholder was removed —
  consistent with its rejection in section 7.
- All Hunter-supplied quotes remain **unverified against the source
  documents** (B-002); candidate locators do not clear verification
  flags.

---

## 9. Batch 03 reconciliation (2026-07-15)

Raw source: `docs/research/raw/research_hunter/batch_03_finalized_output.md`
(the run the owner graded PASS). Row updates applied above: CS-02 and
missing-source 3 (candidate citation 89 FR 104318), RC-08/RC-09
(DATES-section quotes and locators), RC-10 (90 FR 9609 locator).

### Improvements confirmed in batch 03

- The rejected broad incentive sentence **did not recur** — Row 1's
  "Why It Matters" is now narrowed to voucher-qualification framing
  close to RC-12.
- FMVSS 305a is cited via the final rule + delay notice (matching
  CS-02/CS-03), superseding batch_02's NPRM framing; the batch_02 "Sept
  1, 2027 effective date" conflation does not recur.
- Its next-action list itself asserts the guardrails: no SQLite
  writes, no StageGate updates, hand-off to the second-stage filter —
  consistent with the pipeline.
- Downgrade registry unchanged and consistent (frame rails, U-joint,
  PATS/UIM, SAE J1673/ISO 6469-3); HVIP correctly held at
  RegulatoryCandidate; BBAS correctly held at CandidateSourcePath.

### Flags from batch 03

| Item (batch_03 location) | Disposition |
|---|---|
| Row 2, Claim 1 text ("This final rule adopts … applies to light and heavy vehicles … also established a part entitled…") | **Treated as paraphrase, not verbatim** — the tense mixing and ellipses match the *delay notice's* summary phrasing more than final-rule text. Supports RC-04/RC-07 as-is; verbatim extraction still required. |
| Row 4 title "BBAS Publication Directory" paired with the General BBLB asset URL (CS-07) | Title/URL mismatch noted — the URL is the General BBLB document, not a directory page. Claim 1 duplicates RC-16 (consistent). No new row. |
| Row 3 (HVIP) omits batch_02's Appendix B reference | No downgrade — the **Appendix B candidate locator from batch_02 is retained** for next-action 4; batch_03's "keep as regulatory placeholder until the Manual section is parsed" matches the standing disposition. |
| Row 2 next action: "Draft structural compliance documentation template aligned with Part 561" | **Deferred** — template drafting is downstream build work, not research; out of scope during the ingestion phase. Logged as a future work candidate only. |
| Closing self-assessment ("finalized as clean, un-hallucinated candidate metadata") | Noted, **not authoritative** — agent statements do not verify anything (AGENTS.md trust rules). Verification flags stand until source text is independently extracted. |

---

## 10. Delivery "4:75" — exact duplicate (2026-07-15)

The delivery labeled "4:75" was diff-verified **byte-identical to
batch_03**. Disposition: no new rows, no status changes, no register
edits; receipt recorded in `docs/research/raw/research_hunter/PROVENANCE.md`
with batch_03 serving as the archival copy for both deliveries.
Flagged to the owner as a possible mis-send — if a different batch 4
was intended, it should be resent.

---

## 11. Batch 05 reconciliation (2026-07-15)

Raw source: `docs/research/raw/research_hunter/batch_05_unparaphrased_payload.md`.
Row updates applied above: RC-02 (EO-per-family extension), RC-07
(part 561 quote + locator), RC-08 (full per-class DATES sentence);
new rows RC-17..RC-21.

### What batch 05 resolved (at candidate level — all still unverified, B-002)

- **The 2027/2028 date structure:** Sept 1, 2027 = GVWR ≤ 4,536 kg;
  Sept 1, 2028 = GVWR > 4,536 kg. Consistent with the codified heading
  and the batch_03 fragment — the apparent conflict from batch_02 is
  now fully explained at candidate level.
- **CARB EO-per-family:** each battery certification family requires
  its own Executive Order — strengthens the relevance of the RC-12
  ZEPCert/HVIP hypothesis.
- **First Manual-internal HVIP quote** (RC-21) and **first BBLB
  frame-alteration text** (RC-17..19).

### What batch 05 did NOT resolve

- **Downgrade 1 (frame rails) is NOT upgraded.** The new quote covers
  **cross members**, not frame rails; the "no welding on rail flanges /
  neutral-axis drilling" text with dimensional limits remains
  `NeedsExactSource`. The Frame Alterations section (p. 2) is now the
  concrete extraction target.
- **Conversion eligibility under HVIP** — RC-21 is about fleet-level
  access relative to purchase requirements; Appendix B extraction is
  still the gate.

### Flags from batch 05

| Item | Disposition |
|---|---|
| Claims quoted with visible truncation (RC-19 "…and sensitive"; RC-20 "…inputs or…") | **Truncation flags set** — incomplete sentences cannot support rules; full text required. |
| "For all other requirements…" prefix in the DATES quote | Implies some requirements carry different dates; preceding DATES text must be extracted (noted on RC-08). |
| Gaps-registry example values "e.g., 4× or 6× outer conductor diameter limits" for HV cable bend radius | **Illustrative multipliers inside a NeedsExactSource entry — not sourced values.** Must not leak into any rule or table; SAE J1673 / ISO 6469-3 text remains the only acceptable source. |
| Hydroboost gap now marked EngineeringReviewRequired / **PhysicalVerificationRequired** | Status refinement accepted — consistent with missing-source 9 (measurement-only data). |
| PATS gap sharpened to "physical bus analyzer capture log" | Accepted — upgrade path for the downgraded PATS/UIM row now names its evidence type (real-vehicle CAN capture). |
| Integrity report: "SQLite Operations Executed: None. StageGate Advancement: No gates passed." | Consistent with guardrails; noted as self-report (non-authoritative but matching repository state). |

---

## 12. Owner review of batch 05 — verdict applied (2026-07-15)

Raw source: `docs/research/raw/owner_reviews/review_01_batch_05_verdict.md`.
Owner verdict recorded: **Hunter quality strong · ready for
second-stage filter: yes · ready for direct ingestion: NOT YET · safe
to treat as Confirmed: NO.** Owner-relayed source content carries
stripped citations and is registered as candidate claims with locators
pending (RC-22..RC-26) — owner statements, like agent statements, do
not substitute for source text under the trust rules.

### Instructions applied

- **Per-claim statuses** are now explicit in the Status column
  (vocabulary: `Candidate`, `RegulatoryCandidate`, `NeedsVerification`,
  `NeedsVehicleSpecificBBLB`, truncation/verification flags).
- **Platform-scope correction:** CS-07 is general Ford modifier
  guidance. Every CS-07-derived claim (RC-15..RC-19, RC-22, RC-23) is
  platform-unbound until the vehicle-specific Super Duty BBLB is
  parsed.
- **FMVSS framing rule:** FMVSS 305a rows may only ever produce
  "documentation/test requirements must be mapped" outputs — never a
  "we comply" statement.
- **HVIP framing rule:** HVIP rows may only ever produce "path
  requires exact eligible-vehicle/conversion-kit/EO review" outputs —
  never a voucher promise.

### Rule / Metric / Test / NoGo candidates (consolidation preview — NOT rules yet)

| Candidate | Type | From | Gate |
|---|---|---|---|
| Frame side-rail web drilling limits (distances/diameter/spacing) | Rule + NoGo + Measurement | RC-22 | exact quote + vehicle-specific BBLB + Fabricator/Engineer review |
| No welding on frame flanges incl. bend radii | Rule + NoGo | RC-23 | same |
| Cross-member hole/weld prohibition | Rule + NoGo | RC-17 | verification + vehicle-specific BBLB |
| Fastener grade floor (Gr 8 / PC 10.9 / PC 10) | Rule | RC-18 | verification |
| FMVSS 305a requirement/test/documentation mapping | Rule + Test + Documentation | RC-04..09, RC-13/14 | regulatory/legal/engineering review |
| CARB cert-family + EO-per-family | Rule + NoGo | RC-02 | regulatory/powertrain review |
| CARB monitoring/diagnostics description set | Rule + Metric | RC-03, RC-20 | full §2.2 extraction |
| HVIP funding-path checklist (fleet class, conversion coverage, exemption EO) | Coverage + Metric | RC-21, RC-24..26 | Manual/Appendix B extraction + program review |

### Held under owner reject/hold rules

- **Truncated:** RC-19, RC-20 (unchanged — full extraction required;
  RC-20's expected full scope per owner: ESS, thermal management,
  regenerative braking, charging, motor/generator, fault/monitoring
  thresholds).
- **No exact page/line yet:** RC-22..RC-26 (registered but unusable
  until located).
- **"Applies directly to F-450/F-550" statements** in batches 02/03/05
  — held as unverified applicability; platform binding requires
  vehicle-specific data.
- **Broad eligibility/compliance conclusions** — standing rejection
  (section 4) unchanged.

### Needs vehicle-specific extraction list

1. Super Duty / F-450/F-550 BBLB: frame-rail drilling limits, flange
   welding prohibitions, cross-member rules (binds RC-17, RC-22, RC-23).
2. Super Duty upfitter/UIM bulletin: pinout + handshake timing.
3. F-450/F-550 hydroboost geometry: physical measurement only.

### Engineering review list

1. U-joint operating angle ≤ 3° — EngineeringReviewRequired (with
   metrology cross-check).
2. PATS/UIM/CAN mitigation — EngineeringReviewRequired (real-vehicle
   bus capture).
3. Hydroboost redundant brake/steer assist (CP#1) —
   EngineeringReviewRequired / PhysicalVerificationRequired /
   REAL_TEST_REQUIRED.
4. Frame claims RC-17/18/22/23 — Fabricator/Engineer sign-off after
   locator verification.

### Noted for later (not actioned)

The owner's "Artifact Intake Form" as the next pipeline step — not yet
specified in this repository; awaiting owner definition before
anything is built (no production code during ingestion).

---

## 13. Batch 06 reconciliation (2026-07-15)

Raw source: `docs/research/raw/research_hunter/batch_06_deep_dive_payload.md`.
Row updates above: RC-01 (full applicability quote, "may be certified"
nuance), RC-04 (summary language attributed to 90 FR 9609 — confirms
the §9 splice finding); new CS-08/CS-09 and RC-27..RC-29.

### Citation discrepancies (both HELD)

| Item | Disposition |
|---|---|
| FMVSS URL cites govinfo **FR doc 2025-02584** | **Conflicts with the verified delay-notice doc number 2025-02582** (federalregister.gov + 90 FR 9609–9610). Hunter URL held; verified CS-03 URL stands. 02584 may be a different same-day document — do not use. |
| CARB URL now `.../2019-05/GHG_Phase2_ZEP_cert.pdf` | **Second URL for the same procedure** (CS-01 carries the 2020-05 ADA version). Version question opened: which PDF is the governing text? Both URLs retained on CS-01 as candidates; governing-version determination required before verbatim verification. |

### Derived conclusions (HELD — not source text)

| Item | Disposition |
|---|---|
| "compliance boundary … fixed for **September 1, 2029** (2028 + 1-year alterer grace)" | **DerivedCandidate — held.** Arithmetic on two unverified candidates (RC-08 + RC-09), PLUS an unestablished legal classification (that Elektron is an "alterer/final-stage manufacturer" under 49 CFR — a regulatory/legal determination no source on file makes). Broad compliance conclusion per owner reject/hold rules. Regulatory/legal review required. |
| Altering cooling loop logic / cell arrangement "splits the hardware into separate certification families, mandating a discrete EO map" | **DerivedCandidate — held.** Plausible inference from RC-02's family definition; not quoted text. Requires CARB procedure verification. |
| "Zero-splice continuity becomes an operational rule" | **Rule proposal from a secondary source — held.** RC-28 supports the direction; no rule instantiates from a review article. |
| Bend-radius "typically 6×–8× Outer Diameter" | **Fenced — and now CONTRADICTS batch_05's fenced "4× or 6×".** Two conflicting illustrative multipliers across batches is exactly why fenced non-values never enter rules. Only J1673/ISO 6469-3 text settles it. |

### Other dispositions

- **Hunter confidence percentages ("100%")** on unverified rows: self-
  ratings, non-authoritative; register statuses govern.
- **Source Row 5 (internal doctrine):** correct self-fence ("stop
  referencing internal doctrine blocks as research sources") —
  accepted. But it references an internal "Ingestion Engine Framework
  and Stage-Gate Execution Doctrine" document that is NOT in this
  repository — feeds the Audit 01 two-universe question.
- **Source Row 6 (quantum):** FUTURE_ONLY, cold storage — matches the
  Research Map fence. No row created.
- **Next actions deferred as out-of-phase (M10-adjacent):** Part 561
  document-template architecture; JSON monitor field mapping.
- **Positive conduct:** batch declares "Database Action: HALTED";
  gaps section (derating curves, CAN/PATS, hydroboost) matches the
  register exactly.

### Lane bucketing (Research Map)

- L2: RC-01 update, RC-04 attribution, FMVSS/CARB discrepancy items
- L5: CS-08, RC-27, RC-28 (+ fenced multiplier conflict)
- L1/L4: CS-09, RC-29
- L9: derating-curve gap (supplier)
- L7: CAN/PATS gap · L10: hydroboost gap
- Quantum: outside lanes (FUTURE_ONLY fence)

---

## 14. Batch 07 + owner review_02 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_07_comprehensive_discovery_map.md`
and `docs/research/raw/owner_reviews/review_02_batch_07_verdict.md`
(delivered in one message). Row updates above: CS-10..CS-13, RC-30,
RC-31.

### Owner directives applied (review_02)

- **Batch-07 Source Row 1 status: `NeedsURLCorrection`** — quoted
  claims relate to FMVSS 305a but the cited PDF (govinfo 2025-02584)
  is a different Federal Register document. Matches the batch-06 hold;
  correct citations remain CS-02 (final rule, FR Doc 2024-28707) and
  CS-03 (delay notice, FR Doc 2025-02582, 90 FR 9609–9610). The
  correction is now owner-directed, not just filter-inferred.
- **Lectromec (CS-08): stays TechnicalBackground/NeedsExactSource** —
  may point at J1673 topics; may never create final HV cable rules.
- **xr793 mirror (CS-12): lead only** — fastener/mechanical claims
  stay NeedsVerification until sourced from Ford-controlled documents.
- **EngineCert (CS-13): background only / NeedsSupplierData** —
  concepts only; numeric thermal/current/derating/BMS values must come
  from supplier datasheets, CARB text, OEM data, or testing.

### Additional batch-07 dispositions

| Item | Disposition |
|---|---|
| "Exact Quote" under a "Final Rule" title beginning "**Proposed** FMVSS No. 305a expands…" | **Regression flagged** — NPRM proposal language presented under a final-rule heading (third occurrence of proposal/final mixing). Quote usable only as CS-06 (NPRM) corroboration of RC-13. |
| Appendix **C** cited for vehicle categories (RC-31) vs Appendix **B** in batch_01/review_01 (RC-25) | **Discrepancy recorded** — likely manual-year drift; pin the governing Implementation Manual edition + appendix before any eligibility claim promotes. |
| Bend radius "e.g., 6× outer cable diameter" | Fenced (third variant: 4×/6× → 6×–8× → 6×). The fence holds. |
| "FundingPathCandidate"/"BusinessAction" status labels (Source Row 9) | Mapped to RegulatoryCandidate class; ACF/HVIP milestones quote matches RC-21 verbatim — recorded as an alternate candidate locator (Solicitation §II) for RC-21, not a new claim. |
| Torque/GAWR/gear-ratio reconciliation claim (Source Row 8) | **Derived engineering methodology, held** — the quoted text (RC-16 contents list) does not state the reconciliation requirement; NominalAssumption pending engineering review. |
| Sections 8–16 open-gap declarations | **Accepted and commended** — first batch whose gap taxonomy mirrors the Research Map lanes (L5/L6/L7/L8/L9/L10 + failure modes). Nothing hidden. |
| Section 19 rejections (no cross-platform frame generalization; voucher approval ≠ component certification) | Consistent with standing register rules — recorded as convergence. |
| Missing-source additions | Engine-bay dimensional drawings for F-450/F-550 added to the vehicle-specific extraction list (joins UIM pinouts, derating curves). |

### Owner research priorities (review_02 — carried to Research Map)

Focused payloads next, in the owner's order: (1) HV wiring
protection/interlock chain (L5); (2) cooling loops (L6); (3)
hydroboost replacement/redundancy (L10/L4); (4) Ford CAN/PATS/gateway
(L7); (5) supplier datasheets (L9); (6) failure modes & test methods
(L8/L3).

---

## 15. Batch 08 + owner review_03 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_08_gaps_1-6_payload.md` and
`docs/research/raw/owner_reviews/review_03_batch_08_verdict.md`.
Row additions above: CS-14..CS-19, RC-32..RC-37. First payload scored
against the six owner priorities: **priorities 1 (HV wiring), 3
(brake/steering), and 4 (CAN) advanced; 2 (cooling), 5 (supplier
depth), and 6 (failure modes/test methods) still empty** — batch
honestly declared both empty lanes.

### Owner promote/downgrade/reject — applied verbatim

- **Promoted:** Chilye MSD → SupplierCandidate + NeedsEngineeringReview
  (CS-15/RC-33); Brogen EHPS → SupplierCandidate / **CP#1 candidate**
  with EngineeringReviewRequired + PhysicalVerificationRequired
  (CS-17/RC-35); Ford Q-251R2 → OEM CandidateSource **for UIM behavior
  only** (CS-18/RC-36); ISO 6469-3 → CandidateSourcePath /
  NeedsExactSource (CS-16/RC-34).
- **Downgraded:** SAE J1742 via Scribd → **NeedsOfficialSource**
  (CS-14/RC-32 — Scribd is not a controlled standard source); EV West
  EPS → **BackgroundSupplier / WrongPlatformRisk** (CS-19/RC-37);
  every PCM-delete/PATS/cluster/CAN-mimic claim →
  EngineeringReviewRequired unless backed by Ford service data or real
  CAN capture.
- **Rejected (standing):** any exact bend-radius/fuse/contactor/cable/
  isolation threshold not directly in source text or a datasheet; any
  F-450/F-550 suitability claim without pressure/flow/load/fitment
  verification; any inference that UIM CAN behavior proves PATS/PCM
  behavior.

### The UIM inference split (owner-directed)

Batch_08's "Next Action" claimed: *"Deleting the factory PCM
eliminates these baseline broadcast frames; specialized network nodes
must mimic these 28 read-only messages…"* — **split per review_03**:

- Supported (RC-36): UIM receives 28 read-only high-speed CAN signals
  and drives aftermarket outputs.
- **Unsupported inference (NO claim row created):** PCM deletion
  eliminates those frames / 28 messages must be mimicked. Status:
  `EngineeringReviewRequired / MISSING_SOURCE` — resolvable only by
  Ford service data or a real-vehicle CAN capture. Recorded here so it
  cannot re-enter as fact.

### Candidate rule preview additions (component-family-scoped, NOT rules)

From review_03, gated on part-number selection + engineering review:
MSD must interrupt HVIL before HV terminal separation; MSD fuse rating
must match pack voltage/current and fault study; MSD environmental
rating must match mounting location; MSD cable-size range must match
selected HV cable. **Scoped to the Chilye family only — never
universal MSD rules.**

### Fence notes

- Supplier numbers in RC-33/RC-35 (500 A, 600–700 Vdc, DC540V/DC24V)
  are **that supplier's specs, not design values** — nothing selects a
  component or sets a system parameter yet.
- CP#1 remains **unsolved**: owner's 10-item missing list (hydroboost
  pressure/flow, steering gear + brake assist requirements, reservoir,
  failure modes, mounting, supply path, LV backup, test procedure)
  recorded on CS-17.

### Still-open lanes after batch 08

Cooling curves (L6); battery/motor/inverter/charger/DC-DC datasheets
(L9); Ford hydroboost pressure/flow (L10); Ford CAN/PATS message
behavior (L7 — capture required); failure-mode test methods (L8/L3).

---

## 16. Batch 09 + owner review_04 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_09_hv_wiring_gap_closure.md`
and `docs/research/raw/owner_reviews/review_04_batch_09_verdict.md`
(one message: owner gap-package checklists + payload + verdict).
First single-gap payload (HV wiring, priority 1). Row additions:
CS-20, RC-38, RC-39.

### Owner instructions applied verbatim

- **Promoted:** Sendyne SIM100MLP → SupplierCandidate / MetricCandidate
  (CS-20/RC-38); Chilye MSD → RuleCandidate/NoGoConditionCandidate
  additions confirmed (CS-15/RC-33 — fifth candidate rule added: *MSD
  must be physically accessible for service*); ISO 6469-3 stays
  CandidateSourcePath / NeedsExactSource (no change needed).
- **Downgraded:** ALL Lectromec-derived rows (RC-27, RC-28, RC-39) →
  **TechnicalBackground / NeedsExactSource** — may create research
  tasks, may never create final HV wiring rules. Batch_09's
  "CandidateSource" labels on those rows are overridden.
- **Threshold fence (owner correction):** the **100 Ω/V** figure in
  RC-38 is the Sendyne datasheet's safety discussion, not a system
  threshold. It may not be used as a design value until cross-checked
  against FMVSS 305a / ISO 6469-3 / selected-component requirements.
- **Standing rejections extended:** summary articles presented as
  final SAE text; any "the selected HV system is safe/compliant"
  claim; any universal rule not tied to a selected component,
  standard, or test.

### Candidate Build Engine items (owner list — candidates, NOT rules)

| Item | Type | Source basis |
|---|---|---|
| HV power cable splices avoided where possible | RuleCandidate | RC-28 (TechnicalBackground — needs J1673 text) |
| Adjacent HV connectors require unique keying / mis-mate prevention | RuleCandidate | RC-39 (TechnicalBackground — needs J1673 text) |
| MSD/HVIL must open interlock path before HV terminal separation | RuleCandidate | RC-33 (component-family-scoped) |
| Isolation monitoring threshold (cross-check required) | MetricCandidate | RC-38 |
| Isolation monitor reporting + CAN fault response | TestCandidate | RC-38 |
| Exact HV cable bend radius | OpenGap | fenced multipliers (batches 05/06/07/09) |
| Grounding/bonding impedance threshold | OpenGap | none on file |
| IP67/IP6K9K test cycle | OpenGap | none on file |
| Selected fuse/contactor/pre-charge ratings | OpenGap | none on file (datasheets needed) |

### Notes

- Batch_09's own held-gaps section (bend radius, grounding impedance,
  IP cycles) matches the standing fences — fourth consecutive batch
  converging on the guardrails.
- Batch_09 Source Row 1 title anomaly: "Aerospace High Voltage
  Systems…" paired with the automotive Lectromec URL — title/URL
  mismatch noted; content matches the automotive article.
- Chilye extended specs relayed in review_04 (2 HVIL sets, M6,
  16–70 mm² HV cable range, 0.5 mm² HVIL cable, IP67/IP6K9K, IP2XB,
  −40…125 °C) recorded as owner-relayed datasheet values on RC-33 —
  still NeedsSupplierData verification against the PDF itself.
- **HV wiring lane (L5) status: EMPTY → PARTIALLY MAPPED.** Owner's
  15-item "still missing before build-ready wiring design" list
  recorded in the Research Map.
- Owner's recommended next: finish HV wiring (fuse/contactor/
  pre-charge/HV cable datasheets) or move to cooling; CAN/PATS
  deliberately last (proprietary depth — real logging/expert help).
