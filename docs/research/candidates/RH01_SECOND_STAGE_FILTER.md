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
| CS-21 | **TechnicalBackground** (owner review_05 downgrade) | *Feichun: "BEV Wiring: High-Voltage Orange Shielded Cables for Electric Loaders"* — trade article, mining-loader context | feichuncables.com | <https://feichuncables.com/blog/bev-wiring-high-voltage-orange-shielded-cables-for-sandvik-epiroc-electric-loaders/> | Background (batch_10) — `NeedsSupplierData`/`NeedsExactSource`; **wrong-platform context (articulated loaders, not Class 4/5 trucks)** — lane L5 |
| CS-22 | **TechnicalBackground** (owner review_05 downgrade) | *EV Builder's Guide: "Understanding Loss of Isolation (LOI) in Electric Vehicles"* — explainer article | evbuildersguide.com | <https://www.evbuildersguide.com/understanding-loss-of-isolation-loi-in-electric-vehicles-causes-testing-and-safety-measures/> | Background (batch_10) — learning material only; **FMVSS 305a / eCFR / ISO / monitor datasheets are the primary sources for isolation thresholds** — lane L5 |
| CS-23 | **SupplierCandidate** | *Coroflex 9-2611 / 6.0 mm² FHLR2GCB2G shielded HV cable — technical datasheet* | Coroflex (cloudfront-hosted PDF) | <https://d2iompx231jv6o.cloudfront.net/userfiles/documents/products/22/92/26/229226.pdf> | Candidate (batch_11) — `NeedsEngineeringReview`. **Owner correction (review_06): this datasheet covers 6.0 mm² ONLY — nothing from it applies to 35/50 mm² until those exact datasheets are on file.** Owner-relayed envelope: 600 V AC / 1000 V DC, −40…+180 °C, derating curves — lane L5/L9 |
| CS-24 | **SupplierCandidate** | *TE Connectivity / KILOVAC EV200 series contactor datasheet* | TE (PDF hosted at rec-bms.com — mirror; prefer TE-controlled copy) | <https://www.rec-bms.com/datasheet/Technical_datasheet_Kilovac.pdf> | Candidate (batch_11) — `NeedsEngineeringReview`; owner's 9-item needs list applies (battery max V, inverter cont./peak I, fault current, make/break duty, pre-charge sequence, coil voltage, aux contacts, thermal mounting) — lane L5/L9 |
| CS-25 | **SupplierCandidate — AUXILIARY fuse only** (owner review_06 correction) | *Eaton Bussmann series EV auxiliary fuses, 500 Vdc, 10–50 A — datasheet no. 10864* | Eaton | <https://www.eaton.com/content/dam/eaton/products/emobility/fuses-electric-vehicle/bus-ele-ds-10864-ev-pre-production-sample-aux-fuses.pdf> | Candidate (batch_11) — batch's "Traction Subsystem" title was WRONG: these are **auxiliary-circuit fuses; the main traction fuse remains NeedsSupplierData/OpenGap** — lane L5/L9 |
| CS-26 | **SupplierCandidate — main-fuse FAMILY lane** | *Eaton Bussmann series EV fuses catalogue (EMOB0062)* — 500–1000 Vdc, 10–1600 A portfolio | Eaton | <https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/fuses/bussmann-electric-vehicles-fuses/catalogs/eaton-ev-fuse-catalogue-emob0062-en-us.pdf> | Candidate (batch_12) — the real main-traction lane (fixes batch_11's aux mistake); `NeedsEngineeringReview`; **no fuse size selection until battery V, short-circuit current, cont./peak currents, and thermal derating review exist** — lane L5/L9 |
| CS-27 | **SupplierCandidate** | *Coroflex 9-2611 / 35 mm² FHLR2GCB2G shielded HV cable — technical datasheet* | Coroflex (PDF hosted at citini.com — mirror; prefer Coroflex-controlled copy) | <https://citini.com/wp-content/uploads/2022/07/HV35SSC.pdf> | Candidate (batch_12) — `NeedsEngineeringReview`; part-scoped (35 mm² only; 50 mm² datasheet still missing) — lane L5/L9 |
| CS-28 | **RegulatoryCandidate** | *UNECE Global Technical Regulation No. 20 (Electric Vehicle Safety), ECE/TRANS/180/Add.20* | UNECE (official server) | <https://unece.org/fileadmin/DAM/trans/main/wp29/wp29wgs/wp29gen/wp29registry/ECE-TRANS-180a20e.pdf> | Candidate (batch_12) — first official-server standard PDF in the register; also the GTR that CS-02 incorporates by reference — lane L2/L5 |
| CS-29 | **CandidateSourcePath / NeedsExactSource** | *ISO 20653 — Road vehicles: Degrees of protection (IP code)* — referenced by GTR 20 for test probes; text not on file | ISO | (no URL on file — paywalled standard) | Path only (batch_12) — the IP67/IP6K9K validation procedure lane; no test cycle derivable yet — lane L5/L8 |
| CS-30 | **SupplierCandidate — calculation framework** | *Miba: "Precharge resistor calculation: Formulas & Practical Guide"* | Miba (supplier application guide) | <https://www.miba.com/en/product-areas/power-electronics/precharge-resistor-calculation> | Candidate (batch_13) — formulas → CandidateRules; **specific resistor selection stays OpenGap** until U, C, t, Imax, energy, pulse rating, duty cycle known — lane L5/L8 |
| CS-31 | **SupplierCandidate — voltage-suitability flag** | *TE AMP+ Mini K HV Precharge Relay (product page 2-1904058-5)* | TE Connectivity | <https://www.te.com/en/product-2-1904058-5.html> | Candidate (batch_13) — **owner flag (review_08): TE lists 400 VDC contact / 450 VDC max switching, 12 VDC coil — this exact relay may NOT suit the final pack voltage**; pack-voltage, pre-charge current, and coil-architecture checks required — lane L5/L9 |
| CS-32 | **SupplierCandidate** | *Coroflex 9-2611 / 50 mm² FHLR2GCB2G shielded HV cable — technical datasheet (LV 216-2)* | Coroflex (PDF hosted at citini.com — mirror; prefer Coroflex copy) | <https://citini.com/wp-content/uploads/2022/07/HV50SSC.pdf> | Candidate (batch_13) — **closes the 50 mm² datasheet gap at candidate level**; part-scoped; ampacity curves need clean extraction + engineering review — lane L5/L9 |
| CS-33 | **TechnicalBackground** (owner review_08) | *TONFUL: "IP67 vs. IP69K: Waterproof Ratings Guide for Off-Road Vehicles"* | tonful.com (trade article) | <https://tonful.com/ip67-vs-ip69k-waterproof-ratings-guide-for-off-road-vehicles-tonful/> | Background (batch_13) — guides the test requirement; **final IP test parameters only from ISO 20653 text or a certified lab procedure** (CS-29 stays the gate) — lane L5/L8 |
| CS-34 | **InstrumentationCandidate / TestMethodCandidate** (owner reclassification — NOT RegulatoryCandidate; **re-affirmed after batch_14 regression**) | *Metrel MI3132 EV vehicle tester — spec listing (µΩ Kelvin 4-wire, 1 A/2 A; supports ECE R100 Annex 4A/4B, ISO 6469-3)* | Metrel (via test-meter.co.uk reseller page) | <https://www.test-meter.co.uk/metrel-mi3132-ev-electric-vehicle-tester> | Candidate (batch_13) — shows HOW to measure bonding (4-wire Kelvin ≥1 A), not WHAT the legal threshold is; surface-prep procedure still missing — lane L5/L10 |
| CS-35 | **SupplierCandidate — dual-candidate structure** (owner review_09) | *Amphenol Excel\|Mate Mono (HVBI series) product brochure* — HV connectors for 16–70 mm² shielded cable; HVIL; 360° shielding; IP67/IP6K9K mated; 1000 VDC; unique keying (30°/60°/90° color-coded) | Amphenol Industrial (**official Amphenol server**) | <https://www.amphenol-industrial.de/media/pages/downloads/ev/397e425cfa-1707818150/excelmate-mono-produktbroschuere.pdf> | Candidate (batch_14) — **closes the connector ask at candidate level.** Owner structure: **03R8 = 180 A candidate (35–50 mm²); 05R10 = 250 A candidate (50–70 mm²); final choice BLOCKED by battery + inverter current** — lane L5/L9 |
| CS-36 | **SupplierCandidate — LegacyCandidate + MissingSourceLink** | *Webasto CV Standard Battery System (NMC prismatic) + Vehicle Interface Box (VIB)* | Webasto — **NO URL/document on file (batch_16 supplied numbers without any source link)** | *(none on file — defect)* | Candidate (batch_16) — every value `NeedsExactSource`/`NeedsSupplierData`. **Owner flags: product line superseded by Standard Battery Pro 40 (~40 kWh, 333–407 V, 297 kg — owner-relayed) → LegacyCandidate, availability requires supplier confirmation** — lanes L9/L6 |
| CS-37 | **SupplierCandidate — MissingSourceLink** | *Dana TM4 SUMO MD (HV2100-6P PM motor + integrated inverter)* | Dana TM4 — **NO URL/document on file (batch_16)**; owner corroborates the Class 4–7 / 265 kW / 3320 Nm / 3700 rpm envelope from Dana's public descriptions | *(none on file — defect)* | Candidate (batch_16) — every value `NeedsExactSource`/`NeedsSupplierData`; DC-side currents and DC-link capacitance not published (supplier questions required) — lanes L9/L6 |
| CS-38 | **CandidateSourcePath — document named, not archived** | *Dana TM4 SUMO MD troubleshooting/service guide* (source of the 1200 l/h / 40-60 mix / 30 psi / 95.3% metrics) | Dana TM4 — **NO URL on file (batch_19)** | *(none on file — defect)* | Candidate path (batch_19) — obtain and archive the actual guide; until then RC-62 values stay DanaGuideMetricCandidate — lanes L6/L9 |
| CS-39 | **AcademicPrincipleCandidate** (owner label) | *"Passive Electric Vehicle Battery Thermal Management Solution"* — academic heat report (Bernardi equation; fin efficiency) | academic paper (personal-site hosting — provenance modest) | <https://amnehj.github.io/pdf-files/heat-report.pdf> | Candidate (batch_20) — modeling reference only; `NeedsSupplierData` — lanes L6/L8 |
| CS-40 | **ModelingFrameworkCandidate** (owner label) | *MathWorks: "EV Battery Cooling System Design"* — Simulink example (loss model; ε-NTU radiator sizing) | MathWorks (official docs) | <https://www.mathworks.com/help/hydro/ug/EVBatteryCoolingSystemDesign.html> | Candidate (batch_20) — `NeedsHardwareInputs` / `NeedsRadiatorSupplierData` — lanes L6/L8 |
| CS-41 | **EngineeringPrincipleCandidate** (owner label) | *Sinoextrud: "How to Calculate Pressure Drop in Liquid Cooling Plates?"* (Darcy-Weisbach; notes complex plates/bends may need CFD) | sinoextrud.com (industrial vendor article) | <https://sinoextrud.com/how-to-calculate-pressure-drop-in-liquid-cooling-plates/> | Candidate (batch_20) — `NeedsPhysicalRouting`; CFD caveat recorded — lanes L6/L8 |
| CS-42 | **AcademicPrincipleCandidate** (owner label) | *Zhang et al., "An online heat generation estimation method for lithium-ion batteries using dual-temperature measurements", Applied Energy 2020* (two-state core/surface thermal model; anomaly detection) | Penn State ECEC (university server) | <https://ecec.me.psu.edu/Pubs/2020_Zhang_Appl_Energy.pdf> | Candidate (batch_20) — `NeedsSensorAndPackData`; **anomaly-detection use only — NOT thermal-runaway containment** (owner task 4) — lanes L6/L8 |
| CS-43 | **FieldContext / NeedsEngineeringSource** (owner task 3) | *energy-solutions.co: "Electric Truck Range Under Load: Real Towing Tests"* | trade/field article | <https://energy-solutions.co/articles/sub/electric-trucks-towing-range-tests> | Background (batch_20) — proves load/towing hurts range and flags regen thermal loading; the mountain-grade MODEL must come from tractive-power equations in a proper engineering source (`NeedsBetterSource`) — lanes L8/L6 |
| CS-44 | **LeadOnly / InformalDiscussion / NotForRuleCreation** (owner task 2) | *Reddit r/AskEngineers thread on coolant velocity vs heat transfer* | reddit.com (forum) | <https://www.reddit.com/r/AskEngineers/comments/1izl7kl/can_an_increase_in_coolant_velocity_ever_lower/> | Sanity-check only (batch_20) — serial-vs-parallel doctrine needs a thermal-fluids textbook / SAE paper / supplier cooling guide — lane L6 |
| CS-45 | **CandidateTestSource (cooling only)** (owner label) | *US DoD TOP 2-2-607 "Cooling Systems" — Test Operations Procedure* | DTIC (**official server**) | <https://apps.dtic.mil/sti/pdfs/ADA640254.pdf> | Candidate (batch_20) — `NeedsExactSource` verification of quotes; the strongest **cooling** validation-test lane; maps onto the Cajon design case. **Owner (review_18): this is NOT a brake/steering or FMVSS source — batch_21's use of it for Gate 04 is rejected; TestContextBackground only outside cooling** — lanes L8/L3 |
| CS-46 | **EngineeringBackground / NeedsFordExactSource — NotForFinalRule** (owner review_18) | *"HydroBoost Hydraulic Brake Assist Booster Instructions"* (Bosch/Bendix-pattern aftermarket) | partsforhotrods.com.au (aftermarket) | <https://www.partsforhotrods.com.au/wp-content/uploads/2024/07/NEW-HydroBoost-Instructions.pdf> | Background (batch_21) — supports **general** hydroboost logic (min pump flow/pressure, combined brake+steering draw); **cannot prove the F-450/F-550 value** (a HydraStop equivalent says ≥2.8 GPM — different number, same point). No final rule — lanes L10/L4 |
| CS-47 | **ModelingFramework / NeedsFordExactSource** (owner review_18) | *"Steering Pump Flow Rate"* (commercial steering vendor) | hydrosteer.com.au | <https://www.hydrosteer.com.au/steering-pump-flow-rate/> | Background (batch_21) — steering-flow *concept* source (backpressure/temperature, low-RPM balking); not Ford-specific design data — lane L10 |
| CS-48 | **LeadOnly / SupplierCandidatePath / NeedsDatasheet** (owner review_18) | *"Dodge Electric Hydraulic Power Steering for your build!"* (Mopar 5154662AC EHPS + PSC controller) | hangtight.io (conversion vendor blog) | <https://hangtight.io/blogs/resources/upgrading-to-electric-hydraulic-power-steering-parts-list> | Lead only (batch_21) — an EHPS *idea*, NOT proof a Mopar/TRW pump supports a loaded F-550 hydroboost+steering system; needs a datasheet proving pressure, flow, current, duty cycle — lanes L9/L10 |
| CS-49 | **RegulatoryCandidate — primary brake lane** (owner review_18, added) | *FMVSS No. 105 — Hydraulic and electric brake systems (49 CFR 571.105)* | NHTSA / eCFR | (locator pending — B-002) | Candidate (owner-added) — the correct primary brake-performance regulation for this platform (covers hydraulic + electric service brakes and parking brakes, normal + emergency performance); replaces batch_21's mis-cited TOP 2-2-607 — lanes L2/L5 |
| CS-50 | **LeadOnly (video)** | *YouTube "Electric Commercial Vehicles and Powertrain Sizing"* | youtube.com | <https://www.youtube.com/watch?v=3PqEW2Pf90I> | LeadOnly (batch_21) — background video; per standing rule (batch_01) videos are LeadOnly, never rule sources — lane L3 |
| CS-51 | **FordStyleHydroboostPumpReference / SupplierBackground / Ford-StyleComponentCandidate / NeedsFordExactSource** (owner review_19; reaffirmed review_20, "FordStyleHydroboostPumpReference" label added) | *Lee Power Steering — CII pump replacement for Ford, dual-return reservoir for gearbox with hydroboost (PUMP-CII-HB)* | leepowersteering.com (aftermarket) | <https://leepowersteering.com/products/cii-power-steering-pump-replacement-r-metric> | Candidate (batch_22, re-cited batch_23) — a Ford-**style** CII/dual-return option (1750 psi / 3.25 GPM); **the page itself says Ford used many pressure/flow settings — NOT proof of the 2020–2026 F-450/F-550 OEM value** — lanes L10/L4 |
| CS-52 | **HydraulicPumpCandidate / NeedsElectricMotorDriveData** (owner review_19) | *TRW medium-duty power steering pump assembly 14-20358-010* | trucklinerparts.com (commercial parts reseller) | <https://trucklinerparts.com/products/new-trw-medium-duty-power-steering-pump-assembly-p-n-14-20358-010> | Candidate (batch_22) — real hydraulic values (185 bar/2683 psi relief, 6.30 GPM, 25 cc/rev, −40…+135 °C) but it is a **hydraulic pump end, NOT a complete EHPS**: no motor voltage/current/controller/duty/thermal/reservoir/fault data — not a final EHPS candidate — lanes L9/L10 |
| CS-53 | **CompleteEHPSCandidate / MotorsportSupplierCandidate / NeedsCommercialDutyReview / NeedsHydroboostCompatibilityReview / NeedsCurrentMap / NeedsThermalDeratingData** (owner review_20) | *ZF Race Engineering — EPHS MPU 100-C electro-hydraulic motor-pump-unit factsheet* | zf.com (ZF official server, ZF Race Engineering) | <https://www.zf.com/products/media/zfraceengineering/about_us_3/downloads_9/ZF_RE_Factsheet_EPHS-MPU-100-C_EN_001508000140_Screen.pdf> | Candidate (batch_23) — **first complete EHPS candidate** (self-contained motor+pump+reservoir): 5–12 L/min (1.32–3.17 GPM), 113–124.5 bar (~1639–1806 psi), 2500–6000 rpm, −40…+120 °C. In the general hydraulic range of the Ford-style hydroboost target but **NOT proven for F-450/F-550 hydroboost+steering**. Two owner defect-catches: (1) the factsheet states **"No connection to the CAN bus required"** — the batch's "6000 RPM CAN control" claim is **refuted by the cited source**; control/diagnostics/fault outputs = NeedsSupplierData; (2) it is a **motorsport** EPHS pump, **not** a proven Class 4/5 commercial hydroboost unit — do NOT label "commercial-duty validated" — lanes L9/L10/L5 |
| CS-54 | **FordProductReference / SupplierBackground / NeedsFordExactSource / NeedsExactQuote** | *Ford.com — power steering return line hose assembly (P4000028025)* | ford.com (Ford OEM parts catalog) | <https://www.ford.com/product/power-steering-return-line-hose-assembly-p4000028025> | Candidate (batch_23) — Ford-**listed** return-line hose; burst-tested >1750 psi, listed for hydroboost/commercial use (≈19,500 lb GVWR envelope). **Corroborates the ~1750 psi system-pressure envelope, but it is a hose spec — NOT the OEM pump pressure/flow curve** and not a steering-gear requirement. The batch's "Exact Quote" is garbled ("500 LB. With Or Less GVWR or 19 or 4 Wheel Disc Brake") → **NeedsExactQuote** before any use — lanes L10/L4 |
| CS-55 | **RegulatoryTestSource / NeedsBrakeEngineerMapping** (owner review_22) | *Technical Standards Document No. 105, Rev 6 — Hydraulic and Electric Brake Systems (harmonized with 49 CFR §571.105)* | Transport Canada (tc.canada.ca — a **harmonized TSD**, not the US CFR text itself) | <https://tc.canada.ca/sites/default/files/2025-08/105_TSD_rev_6_clean_CCV.pdf> | Candidate (batch_25) — the Gate 04B brake-testing lane. FMVSS/TSD 105 covers stopping distance, partial failure, inoperative power-assist, fade/recovery, water recovery, stability/control, parking brake, and indicator-lamp requirements. **Owner: for US application confirm against the 49 CFR §571.105 text; do NOT hard-code the 400 ft / 150 lb figure until the exact table row is parsed & matched to the vehicle class/GVWR/condition** — lanes L2/L8 |
| CS-56 | **RegulatoryInterpretation / NoGoConditionCandidate** | *NHTSA interpretation nht78-1.13 — hydraulic fluid isolation / split-system behavior* | nhtsa.gov (federal agency interpretation) | <https://www.nhtsa.gov/interpretations/nht78-113> | Candidate (batch_25) — supports a Gate 04B NoGo: a power-steering/hydroboost assist-loop fluid loss must **not** degrade the isolated split master-cylinder brake circuits. Batch-supplied locator ("Section 1") unverified → NeedsExactQuote — lanes L2/L8 |
| CS-57 | **TechnicalBackground / LeadOnly / NeedsOEMElectricalSource / NotForFinalRule** (owner review_22) | *BenchForce — "Understanding the Body Control Module"* | benchforce.com (vendor blog) | <https://www.benchforce.com/blogs/news/understanding-the-body-control-module> | Candidate (batch_25) — background only for Gate 04C 12 V brownout discussion; **must NOT create a low-voltage safety rule** — the real anchor is the Ford General BBLB electrical-load rule (RC-91) — lanes L5/L8 |
| CS-58 | **TechnicalBackground / LeadOnly / NeedsOEMElectricalSource / NotForFinalRule** (owner review_22) | *FS1Inc — DTC U0256 (lost communication, front controls interface module)* | fs1inc.com (vendor service blog) | <https://www.fs1inc.com/blog/dtc-u0256-lost-communication-front-controls-interface-module/> | Candidate (batch_25) — background only for Gate 04C overcurrent→comms-fault discussion; **NotForFinalRule** — lanes L5/L8 |
| CS-59 | **CandidateSourcePath / NeedsOfficialFordCopy** (owner review_22; re-cited batch_26 for GVWR/GAWR weight bands) | *2026 Ford Super Duty Body Builders Guide (BBLB)* | Scribd (NOT a clean OEM host) | <https://www.scribd.com/document/940429439/2026-Super-Duty-Bblb-Final> | Candidate (batch_25/26) — useful for finding page numbers only; **prefer the official Ford Pro Upfitter / BBAS / NHTSA-hosted copy** (CS-05 BBAS portal) before treating any claim as OEM. Used for Gate 05 module-config dependency (RC-95), Gate 06 sub-frame spacer (RC-98), Gate 07 GVWR bands (RC-99) — lanes L4/L1 |
| CS-60 | **ModelingFrameworkCandidate / AxleMomentMethod / NeedsPhysicalMeasurements** (owner review_23) | *Work Truck Online (NTEA) — "Calculating Commercial Vehicle Weight Distribution & Payload Made Easy"* | worktruckonline.com (industry / NTEA reference) | <https://www.worktruckonline.com/articles/calculating-commercial-vehicle-weight-distribution-payload-made-easy> | Candidate (batch_26) — the Gate 07C axle-moment **method** (moment = weight × distance-from-front-axle; rear axle = Σmoments/WB; front = total − rear; keep ≥20–30% on the front steering axle). A modeling framework only — needs the real 3D component positions + physical scale to become numbers — lanes L4 |
| CS-61 | **FleetBackground / DoorLabelReminder / NotForFinalRule** (owner review_23) | *RC Lacy Ford — "Ford F-450 vs. F-550: Specs & Payload"* | rclacyford.com (dealer page) | <https://www.rclacyford.com/ford-f450-vs-f550/> | Candidate (batch_26) — orientation only; **NOT the source of truth for a specific donor vehicle**. Useful only as a reminder that the VIN-specific door-jamb label governs GVWR/GAWR — lanes L4 |
| CS-62 | **LeadOnly / InformalReference / NotForRuleCreation** | *YouTube — "Calculate your Center of Gravity Height" (axle-elevation method walkthrough)* | youtube.com (video, uncredentialed) | <https://www.youtube.com/watch?v=i2Q3DlDgeaA> | Candidate (batch_28) — illustrates the physical lift-based CGv method conceptually; **not a rule source** — the CG-height procedure must come from the Ford Transit BEMM/BBAS or a certified test facility — lanes L4 |

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
| RC-40 | Feichun (loader context): dynamic-zone HV cable bends rated "≥ 100,000 cycles at minimum bend radius (typically 6–8× OD)" *(trade article, mining loaders — owner review_05: **preliminary routing-screen assumption ONLY**; final bend radius comes from the selected cable's datasheet or official standard text)* | CS-21 | Article section "Dynamic Bend Radius Standards Review" — unverified | **TechnicalBackground / NeedsSupplierData — never an enforced rule from this source**; lane L5 |
| RC-41 | EV Builder's Guide: "According to FMVSS 305, the minimum isolation resistance… is 500 ohms per volt" *(explainer article — owner review_05: **WRONG as a universal rule**; the article flattens the regulation's AC/DC/context structure)* | CS-22 | Article section "Why 500 Ohms Per 1 Volt?" | **TechnicalBackground only — superseded by RC-42's split structure**; lane L5 |
| RC-42 | FMVSS 305a isolation structure *(owner-relayed, review_05 — citations stripped)*: electrical isolation ≥ **500 Ω/V for AC** HV sources; ≥ **100 Ω/V for DC** HV sources; **500 Ω/V for the charge inlet** during charging-related measurement; plus a **< 0.2 Ω** resistance requirement between reachable exposed conductive parts in the barrier/direct-contact protection context. *(Note: the DC 100 Ω/V figure coincides with the Sendyne datasheet's discussion in RC-38 — corroborating, not confirming.)* | CS-02 (regulation) via owner relay | **Locator pending — FMVSS 305a / 49 CFR 571.305a section numbers required (B-002)** | **RegulatoryCandidate — split-threshold candidates; final values require exact FMVSS/ISO test mapping + engineering review; NO universal threshold permitted** — lane L5/L2 |
| RC-43 | Coroflex 9-2611 / 6.0 mm²: "Bend radius: - min. 3 x cable-ø: static installation. - min. 6 x cable-ø: dynamic installation." *(FIRST datasheet-sourced bend radius on file — **part-number-scoped**: valid for this 6.0 mm² cable only, per owner review_06; the general 4×/6×/8× fenced variants stay fenced)* | CS-23 | **Candidate locator (batch_11): page 1, Properties block** — unverified | **SupplierCandidate — part-scoped RuleCandidate**; `NeedsEngineeringReview`; OD values for larger gauges missing — lane L5 |
| RC-44 | Kilovac EV200: "Continuous (Carry) Current, Typical: 500 @ 85°C, 400 mcm conductors… Rated Operating Voltage. VDC. 12 - 900." *(supplier specs for THIS contactor family; owner relay adds 2000 A break @ 320 VDC 1-cycle and environmental data)* | CS-24 | **Candidate locator (batch_11): page 1 parameter matrix** — unverified | **SupplierCandidate** — `NeedsEngineeringReview`; unusable for selection until battery/inverter/fault data exists — lane L5/L9 |
| RC-45 | Eaton Bussmann EV **auxiliary** fuses: 500 Vdc, 10–50 A, max DC interrupting 20 kA *(owner correction: auxiliary-circuit candidate ONLY — never main-traction data)* | CS-25 | **Candidate locator (batch_11): page 1, Description/Ratings** — unverified | **SupplierCandidate — auxiliary HV circuits only**; main traction fuse = OpenGap — lane L5/L9 |
| RC-46 | Eaton EV fuse catalogue: "…supporting voltages from 500V to 1,000V DC and current ratings between 10A and 1,600A… current ratings are based on 20°C; higher ambient temperatures and altitudes above 2000 m require current derating." *(family envelope, not a selection)* | CS-26 | **Candidate locator (batch_12): page 1, Features/Sizing** — unverified | **SupplierCandidate — family lane**; exact fuse = OpenGap pending upstream data — lane L5/L9 |
| RC-47 | Kilovac EV200 duty: "Break Current at 320VDC… 2,000, 1 cycle… The maximum make current is 650A to avoid contact welding… 80% Minimum Pre Charge, 90% Nominal Pre Charge." *(gives the pre-charge NO-GO logic candidate: incomplete pre-charge → closing can weld contacts. Owner correction: these curves define the pre-charge COMPLETION target — they do NOT size the pre-charge resistor)* | CS-24 | **Candidate locator (batch_12): pages 1–2, ratings matrix / load-life notes** — unverified | **SupplierCandidate — NoGoCondition candidate (pre-charge completion 80–90% before main close, component-scoped)**; pre-charge resistor sizing = **OpenGap** (needs pack V, controller capacitance, target time, inrush limit, resistor power/energy, relay rating, thermal duty) — lane L5 |
| RC-48 | Coroflex 35 mm²: "MAX 600 V AC / 1000 V DC… Bend radius: - min. 3 x cable-ø: static installation. - min. 6 x cable-ø: dynamic installation. Weight of cable: approx. 485 g/m." *(owner relay adds OD 14.4 mm, −40…+180 °C — part-scoped to THIS 35 mm² cable; 50 mm² remains unsourced)* | CS-27 | **Candidate locator (batch_12): page 1, mechanical/structural matrix** — unverified | **SupplierCandidate — part-scoped Rule/Metric candidates** (static ≥3× OD, dynamic ≥6× OD, OD 14.4 mm, 600 VAC/1000 VDC); `NeedsEngineeringReview` — lane L5 |
| RC-49 | UNECE GTR 20: "Specification of the 0.1 Ω upper resistance limit for chassis bonding provides protection from electric shock by shunting any harmful electrical currents to the vehicle chassis should any electrically charged components lose isolation… test probes are specified that conform to ISO 20653…" | CS-28 | **Candidate locator (batch_12): page 60, Section II (rationale)** — unverified | **RegulatoryCandidate — TestCandidate (bonding resistance test) + MetricCandidate (≤ 0.1 Ω)**; NOT final pass/fail until mapped to the US FMVSS/ISO context and a measurement method. **Reconciliation flag: distinct from RC-42's <0.2 Ω exposed-part figure — different contexts (GTR bonding path vs FMVSS exposed-part resistance); never conflate** — lane L5/L2 |
| RC-50 | Miba pre-charge framework: "R = t / (5 * C)… I_max = U / R… E = 0.5 * C * U²" — with the inrush limit checked against contactor/fuse load limits and the resistor rated for full charging energy *(formulas are CandidateRules; they select nothing until U, C, t, allowed inrush, pulse-energy rating, and thermal duty are known)* | CS-30 | **Candidate locator (batch_13): guide sections 1–3** — unverified | **CandidateRule — pre-charge calculation module inputs: U, C, t, Imax, E**; resistor part = OpenGap — lane L5/L8 |
| RC-51 | TE Mini K pre-charge relay: 1 Form X SPST-NO-DM, 20 A DC contact rating, 2000 Vrms initial dielectric contacts–coil, −40…85 °C *(owner relay adds: 400 VDC contact voltage / 450 VDC max switching / 12 VDC coil — **suitability above that pack voltage NOT established**)* | CS-31 | **Candidate locator (batch_13): product configuration/usage matrix** — unverified | **SupplierCandidate — pack-voltage check REQUIRED (OpenGap: relay suitability above 400/450 VDC)**; coil architecture (12 vs 24 V) unresolved — lane L5/L9 |
| RC-52 | Coroflex 50 mm²: "MAX 600 V AC / 1000 V DC… Specification: LV 216-2… Our specifications shall not release you from your obligation to test the products supplied regarding their suitability for the intended purpose of use." *(owner relay adds: 3×/6× OD bend radii, ≈630 g/m, −40…+180 °C, max 0.368 mΩ/m conductor resistance, ambient-indexed load curves. Batch_14 adds **OD = 15.8 mm** → computed part-scoped bend envelopes **≥47.4 mm static / ≥94.8 mm dynamic** — arithmetic owner-verified. Part-scoped to THIS 50 mm² cable; note the datasheet's own suitability-testing disclaimer)* | CS-32 | **Candidate locators (batches 13/14): page 1, mechanical properties** — unverified | **SupplierCandidate — part-scoped Rule/Metric candidates (incl. computed bend envelopes); ampacity = needs curve extraction (50 °C ambient index) + engineering review** — lane L5 |
| RC-53 | TONFUL: IP69K (ISO 20653 "K") = 80 °C water jets at 100 bar, multiple angles, rotating fixture; IP67 = static immersion, 1 m, 30 min *(trade explainer — describes the tests, is not the standard)* | CS-33 | Article comparison section — unverified | **TechnicalBackground / NeedsExactSource** — guides underbody test design (dynamic washdown, not just immersion); final parameters from ISO 20653/lab only — lane L5/L8 |
| RC-54 | Metrel MI3132 EV: µΩ-meter function, 1 A / 2 A test currents, 4-wire Kelvin method, supports ECE R100 Annex 4A/4B and ISO 6469-3 *(instrument spec — shows a credible bonding measurement method: ≥1 A injection, Kelvin connection, not a DMM continuity check)* | CS-34 | **Candidate locator (batch_13): µΩ-meter spec block** — unverified | **InstrumentationCandidate / TestMethodCandidate** (owner reclassification); surface-prep procedure (e-coat, corrosion inhibitor) still missing — lane L5/L10 |
| RC-55 | Amphenol HVBI part-number system: "HVBI-7-03R8-XFC-X-XX-FG… 35mm2 to 50mm2. Shell type: 7: straight plug. 9: Right angle plug. Insert size: 03R8: 8mm Radsok (Rated current 180A)… Alternate keying positions: ARD: 30°, Red. BBK: 60°, Black. CYL: 90°, Yellow." *(owner adds from same brochure: 05R10 = 250 A / 50–70 mm² option; HVIL, EMI shield, IP67/IP6K9K mated, 1000 VDC)* — directly satisfies the J1673-style keying/mis-mate concern (RC-39) at supplier level | CS-35 | **Candidate locator (batch_14): page 3, part-number selection block** — unverified | **SupplierCandidate — dual candidates (03R8 180 A vs 05R10 250 A); selection BLOCKED by battery + inverter current**; `NeedsEngineeringReview` — lane L5/L9 |
| RC-56 | Webasto CV Standard Battery candidate profile *(batch_16, NO source link)*: ~350 V nominal / 280–400 V range per pack; 35 kWh/pack scalable to 10 packs (350 kWh) via VIB; **150 A continuous / 250 A 10 s peak at VIB (system level)**; liquid cooled 10 l/min, <50 mbar; 295 kg/pack; 960×686×302 mm; J1939 via VIB; LV 123/124 referenced. I_sc / internal resistance NOT published | CS-36 | **NO locator — MissingSourceLink defect; every value NeedsExactSource** | **SupplierCandidate — LegacyCandidate**; owner downgrade list applies (currents, coolant specs, J1939 registers all need datasheet or supplier-email proof) — lanes L9/L6 |
| RC-57 | Dana TM4 SUMO MD candidate profile *(batch_16, NO source link)*: 130 kW continuous / 250–265 kW peak (30 s duty limit); 685 Nm continuous / 2150–3320 Nm peak (direct drive); 3500–3700 rpm; up to 750–800 V DC; coolant inlet max 65 °C, water/glycol 40/60; pre-charge "integrated in S-Box" (unproven); J1939. Continuous/peak **DC bus currents, DC-link capacitance, and mass NOT published** | CS-37 | **NO locator — MissingSourceLink defect; every value NeedsExactSource** | **SupplierCandidate**; the four OPEN fields are exactly the HV-wiring unlock variables — supplier questions required — lanes L9/L6 |
| RC-58 | **Powertrain compatibility risk (owner-derived, review_11)**: at candidate face values, Webasto VIB limits (150 A cont / 250 A peak) yield ≤60 kW continuous / ≤100 kW peak at 400 V — versus the Dana target of 130 kW continuous / 250 kW peak, which needs ≈325 A cont / ≈625 A peak at 400 V (P=V×I, lossless). **Candidate battery output may not support candidate motor demand** unless configuration differs (pack count, 400 vs 800 V, parallel arrangement, VIB limit, supplier-approved setup) | derived over RC-56 + RC-57 (both unverified) | n/a — derived risk analysis, not a source claim | **DerivedRiskFlag → blocker B-003 (POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED)**; arithmetic owner-supplied; resolves only via supplier answers + engineering review — lanes L9/L6/L8 |
| RC-59 | Webasto Pro 40 per-pack + VIB figures *(batch_17/review_12 — corroborated across both, still NO source link)*: Pro 40 ≈ 40 kWh, 333–407 V, **55 kW continuous / 112 kW 10 s peak discharge per pack**, 297 kg, 10 l/min; **VIB: 380 A continuous / 580 A 30 s peak discharge, up to 10 packs**; VIG/VIG Plus: up to 18 packs, higher current capability (owner-relayed) | CS-36 | **MissingSourceLink — NeedsExactSource for every figure** | **SupplierCandidate values** — supersede RC-56's 150/250 A system figures (which now appear to have been mislabeled pack/system data); nothing usable until Webasto datasheets/emails archived — lanes L9/L6 |
| RC-60 | **Corrected architecture analysis (owner-derived, review_12 — supersedes batch_17's "3 packs minimum")**: pack count is topology-dependent. 1s1p/400 V: REJECTED (fails cont.+peak). 1s3p/400 V (~120 kWh): power may support but continuous ≈325–371 A is near the VIB 380 A limit and peak ≈663 A at 400 V EXCEEDS the VIB 580 A peak — risky. 2s1p/800 V (~80 kWh): ~110 kW cont / 224 kW peak — likely underpowered. **2s2p/800 V (4 packs, ~160 kWh): strongest minimum candidate for review.** 2s3p/800 V (6 packs, ~240 kWh): candidate if weight/space allow. All ideal P=V×I, lossless; real demand higher | derived over RC-57 + RC-59 (unverified inputs) | n/a — derived analysis | **DerivedRiskAnalysis — candidate topology ranking ONLY; pending supplier approval + engineering review (B-003/B-004); NOT a selection** — lanes L9/L6/L8 |
| RC-61 | Webasto VIG / VIG Plus figures *(batch_18 + review_13, owner-corroborated — still NO source link)*: **1,215 A continuous / 1,400 A peak discharge, up to 18 packs**; marketing phrase "no HV limitation" **fenced** (owner: VIG still has limits — much stronger than VIB, not "unlimited") | CS-36 (Webasto interface family) | **MissingSourceLink — NeedsExactSource** | **SupplierCandidate values** — the numbers that make B-004 decisive; unusable until Webasto documentation archived — lanes L9/L6 |
| RC-62 | Dana SUMO MD troubleshooting/service-guide cooling metrics *(batch_19 + review_15, owner-corroborated — guide named, NO link)*: motor coolant flow 1200 l/h; MCU coolant flow 1200 l/h; 40% deionized water / 60% glycol; 30 psi max working pressure (motor and MCU); max system efficiency 95.3% | CS-38 | **MissingSourceLink — guide must be archived** | **DanaGuideMetricCandidate / NeedsModelSpecificConfirmation** (owner statuses) — lanes L6/L9 |
| RC-63 | Webasto Pro 40 thermal envelope *(batch_19 + review_15, owner-corroborated — NO link)*: 10 l/min volume flow, <50 mbar pressure loss, operating −30…+55 °C, 333–407 V, ~40 kWh installed, 45/55 kW continuous charge/discharge at 25 °C **SoC-dependent** | CS-36 | **MissingSourceLink** | **SupplierMetricCandidate / NeedsEngineeringReview** — the 10 l/min figure is per-pack; **total system flow depends on the Webasto-approved manifold layout (hydraulic assumption fence, owner correction 2)** — lanes L6/L9 |
| RC-64 | Dana inverter max coolant inlet 65 °C *(appears in reseller/public listings, not confirmed in the Dana guide)* | CS-37 (reseller-tier) | No official Dana locator | **NeedsOfficialDanaSource / NeedsEngineeringReview** (owner correction 3) — lane L6 |
| RC-65 | **Heat-load principle (owner correction 4)**: the cooling loop rejects **LOSSES**, not the 130 kW mechanical output. Illustration only: at 95.3% max efficiency, input ≈136.4 kW → loss ≈6.4 kW best-case — **fenced as a rough illustration, NOT a design value**; real heat rejection comes from supplier efficiency maps and heat-rejection data across operating points | derived over RC-57/RC-62 (unverified) | n/a — principle + fenced illustration | **CandidateRule (cooling sizing basis = loss maps) + fenced number**; combined system heat load remains OpenGap/HardBlocked — lanes L6/L8 |
| RC-66 | **Bernardi equation** (battery heat generation): q̇_T = I²R_int + I·T·(∂U_avg/∂T) — irreversible Joulean + reversible entropic terms *(equation quoted; modeling logic only)* | CS-39 | "Modeling Approach", p.1 — unverified | **AcademicPrincipleCandidate / NeedsSupplierData** (needs Webasto R_int vs SoC + entropic coefficient matrix) — lanes L6/L8 |
| RC-67 | Component loss model Q = I²·R/1000 kW (quadratic in current) for inverter/motor thermal dissipation *(Simulink example)* | CS-40 | "Battery Harness" section — unverified | **ModelingFrameworkCandidate / NeedsHardwareInputs** (needs Dana efficiency maps, torque-vs-RPM heat to jacket) — lanes L6/L8 |
| RC-68 | **ε-NTU cross-flow radiator sizing**: q_max = C_min·ΔT_in; effectiveness = q/q_max; NTU relation for cross-flow unmixed exchangers *(Simulink example)* | CS-40 | "Radiator Harness" section — unverified | **ModelingFrameworkCandidate / NeedsRadiatorSupplierData** (fin density, louver angles, air-side ΔP) — lanes L6/L8 |
| RC-69 | **Darcy-Weisbach**: ΔP = f·(L/D)·(ρv²/2) for loop head loss; source itself notes complex plates/bends may require CFD | CS-41 | "How to Compute and Simulate Flow Loss?" — unverified | **EngineeringPrincipleCandidate / NeedsPhysicalRouting** (path lengths, fittings, channel geometry) — lanes L6/L8 |
| RC-70 | **Two-state (core/surface) battery thermal model** with heat-generation reconstruction from dual temperature measurements — usable for thermal-lag limits and **anomaly detection** | CS-42 | §2 "Two-state thermal model" — unverified | **AcademicPrincipleCandidate / NeedsSensorAndPackData**; anomaly-detection scope only — lanes L6/L8 |
| RC-71 | Tractive energy balance: E_total = E_rolling + E_aero + E_grade + E_accel with E_grade = m·g·sin(θ); regen 80–100 kW flagged as thermal risk *(from a towing field article — FieldContext; the model itself needs a proper engineering source)* | CS-43 | §3.1 — unverified | **ModelingFrameworkCandidate / NeedsBetterSource** (owner: use tractive-power equations from an engineering source; article = context only) — lanes L8/L6 |
| RC-72 | Serial-loop principle: Q̇ = ṁ·C_p·ΔT — downstream components in a serial loop receive pre-heated coolant, reducing local ΔT vs a balanced parallel loop *(forum sanity check ONLY)* | CS-44 | forum thread — n/a | **LeadOnly / NotForRuleCreation**; doctrine requires textbook/SAE/supplier source; supplier split tolerances needed — lane L6 |
| RC-73 | TOP 2-2-607: "Mountain road load course: To provide an average grade of 6% or greater and of sufficient continuous length to allow the vehicle to stabilize at a minimum speed for sustained operation." — steady-state thermal-equilibrium validation criterion | CS-45 | §1/§4, pp.1–5 — quote unverified | **CandidateTestSource — TestCandidate for the Cajon design case** (cooling valid only if temperatures stabilize on sustained grade); `NeedsPhysicalVerification` for component temperature limits — lanes L8/L3 |
| RC-74 | **Combined-demand NoGo (owner's "biggest win")**: an EHPS replacement must supply the SIMULTANEOUS brake-assist + steering-assist hydraulic demand — sizing for steering alone starves the steering gear on brake apply (hydroboost draws from the same fluid stream) | CS-46 (general hydroboost logic) | Aftermarket instructions §"pump requirements" — general, not Ford | **NoGoConditionCandidate** — do NOT size steering assist alone; needs the combined peak simultaneous flow-draw curve (Ford / test) — lanes L10/L4 |
| RC-75 | General hydroboost pump minimums (hydroboost-*pattern*, not Ford): "flow at least 2 gallons per minute… at least 1200psi"; assist delay / steering fall-off below that *(aftermarket value; a HydraStop equivalent says ≥2.8 GPM — variance proves it's not the Ford number)* | CS-46 | §"Important pump requirements", p.1 | **EngineeringBackground / NeedsFordExactSource — NOT a final rule**; the Ford F-450/F-550 pump pressure/flow/relief values are OpenGaps — lane L10 |
| RC-76 | Loss-of-assist failure behavior: steering effort rises nonlinearly when hydraulic flow is lost; near max front-axle rating a sudden loss can produce an unmanageable steering condition — dedicated mitigation required *(general principle)* | CS-46 | §"pump requirements", ¶2 | **NoGoConditionCandidate**; needs quantitative manual lock-to-lock steering torque (Nm) on a loaded F-550 at 0 mph (`NeedsPhysicalVerification`) — lanes L10/L4 |
| RC-77 | Accumulator reserve: the hydroboost gas/nitrogen accumulator stores energy for a limited number of engine-off/assist-off brake actuations *(general principle)* | CS-46 | §"pump requirements", ¶2 | **Rule/Test candidate**; needs the factory Super Duty accumulator pre-charge + reserve-actuation count across temperature (`NeedsSupplierData`) — lanes L10/L4 |
| RC-78 | EHPS candidate path: Mopar 5154662AC-class electric-hydraulic pumps run independent of engine speed on a high-amp DC circuit, PWM-modulated from vehicle speed *(vendor blog — idea only)* | CS-48 | vendor "Parts Available"/"Control" | **LeadOnly / NeedsSupplierDatasheet**; must prove pressure–flow–current–duty; est. 60–100 A 12 V transient load → forces DC-DC upsizing (recorded as a Gate 04→Gate 01 linkage, candidate) — lanes L9/L10 |
| RC-79 | Ford-**style** dual-return hydroboost pump candidate: 1750 psi / 3.25 GPM (Lee PUMP-CII-HB) *(supplier value for a Ford-style part; NOT the verified OEM F-450/F-550 number)* | CS-51 | product config index — vendor listing | **SupplierBackground / NeedsFordExactSource** — a candidate data point for the pump curve, not the Ford spec — lanes L10/L4 |
| RC-80 | Medium-duty hydraulic pump candidate: 185 bar (2683 psi) relief, 6.30 GPM, 25 cc/rev, −40…+135 °C (TRW 14-20358-010) *(hydraulic end only)* | CS-52 | spec index — vendor listing | **HydraulicPumpCandidate / NeedsElectricMotorDriveData**; hydraulic capacity looks adequate to *evaluate*, but suitability depends on the electric motor drive, duty cycle, plumbing, reservoir, fluid temp, and Ford requirements (owner: "will not bottleneck/overheat" claim → **NeedsEngineeringReview**) — lanes L9/L10 |
| RC-81 | **DC-DC / low-voltage load linkage (owner-promoted)**: an EHPS pushing ~2.5–3.25 GPM at >1500 psi needs ~2.0–3.5 kW; on a 12 V system that peaks ≈160–290 A — forcing an upsized 800V→12V DC-DC converter and/or a 12 V ultracap/AGM buffer. *(batch cites "SAE J134 baseline" without a verified quote — the kW/amp figures are estimates, not sourced values)* | derived over RC-79/80 (unverified) | n/a — engineering estimate | **OpenGap / RuleInput** — Gate 04 loops back into the low-voltage architecture (Gate 01/DC-DC); real numbers come from a complete EHPS datasheet + engineering review — lanes L5/L9 |
| RC-82 | ZF EPHS MPU 100-C hydraulic envelope: **5–12 L/min (1.32–3.17 GPM), 113–124.5 bar (~1639–1806 psi), variable 2500–6000 rpm, −40…+120 °C** *(complete self-contained EHPS motor-pump-unit)* | CS-53 | p.1 technical specs table; quote "Flexible flow rate from 5 to 12 l/min at variable speeds ranging from 2,500 to 6,000 rpm. Operating pressure of 113 to 124.5 bar" (Hunter-supplied, unverified vs PDF → NeedsExactQuote) | **CompleteEHPSCandidate / ModelingFramework** — in the same general hydraulic range as the Ford-style hydroboost target (3.25 GPM / 1750 psi), but its 3.17 GPM ceiling sits **just under** the Ford-style 3.25 GPM and peak simultaneous demand pushes toward relief; **NeedsHydroboostCompatibilityReview** before it can be called suitable — lanes L9/L5 |
| RC-83 | **ZF control / diagnostics correction (owner defect-catch)**: the ZF factsheet states **"No connection to the CAN bus required"** — the batch's "6000 RPM CAN control" and "DTCs broadcast over CAN" claims are **contradicted by the cited source**. | CS-53 | p.1 (owner-relayed factsheet statement) | **DefectCatch → NeedsSupplierData** — control mode, fault outputs, and diagnostic options are unknown; do NOT request a DBC/CAN map unless a *different* controller variant with CAN diagnostics is confirmed. **RECURRED in batch_24** (re-asserted "CAN control" + a `.dbc` request one batch after the review_20 correction — re-corrected in review_21; leading candidate for the M10 corrected-claim regression scanner) — lanes L9/L8 |
| RC-84 | **ZF duty classification (owner correction)**: the ZF document describes an **EPHS motorsport steering pump**, not a Class 4/5 commercial-truck hydroboost pump. | CS-53 | factsheet title/positioning | **MotorsportSupplierCandidate / NeedsCommercialDutyReview** — must NOT be labeled "designed for commercial vehicle validation"; commercial-duty high-load survival is unproven. **RECURRED in batch_24** ("Designed for commercial vehicle validation" re-asserted one batch after the review_20 correction — re-corrected in review_21) — lanes L9/L10 |
| RC-85 | **ZF power/current estimate**: running the MPU near max (≈3.17 GPM @ ~1806 psi ≈ 3.3 kW shaft) implies a large 12 V draw. *(The batch is internally inconsistent — item 1 estimates 90–110 A peak; Part 2 estimates 275–300 A. Both are unsourced.)* | derived over RC-82 (unverified) | n/a — engineering estimate | **EngineeringEstimate / NeedsZFCurrentMap** — actual current depends on pump/motor/controller efficiency, relief behavior, fluid temp, and duty cycle; **the Build Engine must NOT size the DC-DC converter from this estimate alone** (feeds RC-81) — lanes L5/L9 |
| RC-86 | Ford power-steering **return-line hose** burst-tested >1750 psi, listed for hydroboost/commercial use (≈19,500 lb GVWR) | CS-54 | product description index; quote garbled in batch → **NeedsExactQuote** | **FordProductReference / NeedsFordExactSource** — corroborates the ~1750 psi system-pressure envelope but is a **hose spec, not the OEM pump pressure/flow curve** and not a steering-gear requirement — lanes L10/L4 |
| RC-87 | **FMVSS 105 test-map scope (owner expansion)**: the brake test plan is **not just stopping distance** — it must map partial-failure behavior, fade/recovery, water recovery, stability/control during braking, parking brake, warning-lamp requirements, and the full test procedures; FMVSS 105 covers hydraulic/electric service + parking brakes on vehicles >3500 kg GVWR. | CS-49 (FMVSS 105 lane, batch_21) | 49 CFR 571.105 — **exact section/paragraph locators still needed** | **RegulatoryCandidate / TestMapInput / NeedsExactSource** — the primary Gate 04 brake-regulation lane; owner-relayed scope, not yet extracted from the regulation text — lanes L2/L8 |
| RC-88 | **FMVSS/TSD 105 inoperative-power-assist stop**: GVWR >10,000 lb (4,536 kg) — stop from 60 mph within 400 ft (121.9 m) with an inoperative brake power assist at a pedal force ≤150 lb (667 N) *(batch-supplied S5.1.2 / Tables I & III — Hunter locator unverified)* | CS-55 | S5 / Table I / Table III (harmonized TSD 105 Rev 6) | **RegulatoryTestSource / NeedsBrakeEngineerMapping / NeedsExactTableRowMatch** — owner: **do NOT hard-code the 400 ft / 150 lb figure** until the exact 49 CFR §571.105 table row is parsed and matched to the vehicle category/GVWR/brake condition; missing: stock-pedal deflection limit under sustained 150 lb manual input — lanes L2/L8 |
| RC-89 | **FMVSS/TSD 105 fade & recovery (S7.11)**: 10–30 consecutive high-speed deceleration snubs to thermally saturate the system; recovery stops must not deviate >±20% from the cold baseline *(batch-supplied — unverified)* | CS-55 | S7.11 (harmonized TSD 105 Rev 6) | **TestCandidate / NeedsBrakeEngineerMapping** — a Gate 04B test procedure; missing: EHPS reservoir-inlet fluid-temperature logging during the snub sequence — lanes L2/L8 |
| RC-90 | **Brake-circuit isolation NoGo (NHTSA nht78-1.13)**: a seal blowout / fluid loss in the power-steering / hydroboost assist loop must **not** degrade the isolated split master-cylinder brake circuits. | CS-56 | Section 1 (batch-supplied locator — unverified) | **NoGoConditionCandidate / NeedsExactQuote** — a hard Gate 04B design constraint; missing: EHPS-fluid vs glycol DOT-4 chemical-compatibility on a cross-leak — lanes L2/L8 |
| RC-91 | **Ford General BBLB electrical-load rule (owner's real Gate 04C anchor)**: an electrical load analysis must be done before adding loads; added circuit draw must not exceed OEM fused-circuit limits; do not overload BCM outputs; high-demand circuits should be fed directly from the 12 V battery / an added battery through relays. | CS-07 (General BBLB) | Frame/Electrical guidance — **exact page/section still required** | **RuleCandidate / NeedsOfficialFordCopy / NeedsExactQuote** — the Gate 04C anchor for the EHPS low-voltage feed; **note the batch cited this via `static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf`, an NHTSA ODI investigation PDF, NOT the BBLB (title/URL mismatch — provenance defect)** — lanes L5/L8 |
| RC-92 | 12 V bus brownout background: keep steady 12.0–12.6 V under peak draw; sag <10.5 V can reset BCM/ABS (BenchForce) *(vendor blog)* | CS-57 | "Network Stability" section (unverified) | **TechnicalBackground / LeadOnly / NotForFinalRule** (owner) — usable as a modeling cue only; the real threshold must come from an OEM electrical source — lanes L5/L8 |
| RC-93 | Low-voltage overcurrent → U-series comms faults can place safety modules in an unpredictable state (FS1Inc) *(vendor blog)* | CS-58 | U0256 article (unverified) | **TechnicalBackground / LeadOnly / NotForFinalRule** (owner) — lanes L5/L8 |
| RC-94 | **Gate 05 authorized-integration rules (Ford General BBLB)**: OEM wiring to the PCM must **not** be modified; the ignition circuit must **not** be altered; stop-lamp switch splices can interfere with the PCM, speed control, and ABS. | CS-07 (General BBLB) | Electrical guidance — **exact page/section still required** | **RuleCandidate / NoGoConditionCandidate / NeedsOfficialFordCopy** — frame Gate 05 as *authorized serviceable integration preserving diagnostics, warning lamps, ABS/stability, and scan-tool visibility* — **NOT "clearing dashboard lights"** (owner); same ODI-URL mis-citation as RC-91 — lanes L7/L8 |
| RC-95 | Ford Super Duty module-config dependency: BCM / ABS / instrument cluster require configuration matching; removing the factory ICE ECM affects the cluster and can raise warning lamps (2026 Super Duty BBLB) | CS-59 (Scribd) | p.73, SUB mounting section (unverified) | **CandidateSourcePath / NeedsOfficialFordCopy** — Gate 05 dependency claim; get the official Ford copy before use — lanes L7/L1 |
| RC-96 | Removing/modifying primary factory control modules impacts electronic stability + traction control (calibrated to factory weight/powertrain) → authorized software parameter updates needed to preserve ABS/ESC without a factory engine controller (Ford General BBLB) | CS-07 (General BBLB) | "Stability Control Calibration" section (unverified) | **NoGoConditionCandidate / NeedsOfficialFordCopy** — Gate 05; same ODI-URL mis-citation as RC-91 — lanes L7/L8 |
| RC-97 | **Gate 06 frame-drilling rule (Ford General BBLB)**: no holes in the top/bottom chassis-rail flanges; web holes ≥38 mm (1.5 in) from the flange inner edge; max added hole 19 mm (0.75 in); use existing frame holes where possible. | CS-07 (General BBLB) | Frame Modification section — exact page still required | **RuleCandidate / NeedsEngineeringReview / NeedsPlatformSpecificConfirmation / NeedsOfficialFordCopy** — **refines/echoes RC-22** (same 1.5 in / 0.75 in limits, now with the no-flange-drilling + use-existing-holes detail); same ODI-URL mis-citation; missing: FEA of the battery-box brackets on the web at 3g vertical — lanes L4 |
| RC-98 | Gate 06 sub-frame isolation spacer: tapered spacers between added vocational brackets and the factory side members, ~0.5 in thickness reduction transitioning over 4–6 in (2026 Super Duty BBLB) | CS-59 (Scribd) | p.73, Fig. C (unverified) | **RuleCandidate / NeedsEngineeringReview / NeedsOfficialFordCopy** — Gate 06; missing: mounting-hardware shear strength + thread-locking spec — lanes L4 |
| RC-99 | **Super Duty GVWR bands (Gate 07)**: F-450 Class 4 ≈ 14,000–16,500 lb; F-550 Class 5 ≈ 17,500–19,500 lb GVWR *(2026 Super Duty BBLB p.84-85 — Hunter-supplied, unverified)* | CS-59 (Scribd) | p.84-85 chassis-cab weights table | **RuleCandidate / NoGoConditionCandidate / NeedsOfficialFordCopy** — hard upper boundary the loaded conversion may not exceed; the **VIN-specific door label governs** (RC-101), these bands are a range not the donor value; missing: model-year/wheelbase-specific config (145/169/193 in WB) — lanes L4 |
| RC-100 | **Axle-moment method (Gate 07C)**: moment = component weight × distance from front-axle line; rear-axle weight = Σmoments ÷ wheelbase; front-axle weight = total − rear; front must stay < Front GAWR **and** retain ≥20–30% of total weight on the front steering axle for control *(NTEA/Work Truck)* | CS-60 | Longitudinal CG & Moments section | **ModelingFrameworkCandidate / AxleMomentMethod / NeedsPhysicalMeasurements** — simulation-only until physical scale tickets verify; needs the exact 3D center-points of every added bracket — lanes L4 |
| RC-101 | **Door-label + baseline-scale procedure (Gate 07A)**: capture VIN-specific Front GAWR / Rear GAWR / GVWR from the door-jamb Safety Compliance Certification Label (**overrides any marketing/dealer value**), then record baseline front-axle, rear-axle, and total curb weights on certified scales *(RC Lacy page describes the step)* | CS-61; def. cross-ref CS-07 | door-jamb label; 3-pad scale | **RuleCandidate / OpenGap / NeedsEngineeringReview** — the real first closure step; the donor VIN/label and a certified scale ticket are still to be captured (field task, not supplier) — lanes L4 |
| RC-102 | **GAWR/GVWR definitions (Ford General BBLB)**: GAWR = the manufacturer-specified load-carrying capacity of a single axle system; GVWR = the manufacturer-specified maximum loaded weight of the vehicle → the **actual vehicle door label is the governing input**, not a marketing chart | CS-07 (General BBLB) | definitions section — exact page still required | **RuleCandidate / NeedsOfficialFordCopy** — anchors the Gate 07 no-go boundaries; owner-relayed (same BBLB whose batch_25 copy was mis-cited via an ODI URL — get the official copy) — lanes L4 |
| RC-103 | **Four-corner / axle definitions (Ford General BBLB)**: front-axle weight = LF + RF; rear-axle weight = LR + RR — used for CG and axle calculations *(owner correction of the batch's wrong "three-pad" framing)* | CS-07 (General BBLB) | weight/CG section — exact page still required | **RuleCandidate / NeedsOfficialFordCopy** — Gate 07B scale method = certified axle scale (front+rear+total) minimum, four-corner (LF/RF/LR/RR) preferred; recorded in `docs/status/MASS_LEDGER.md` — lanes L4 |
| RC-104 | **Transverse CG (Ford General BBLB)**: four-corner weights + front/rear track widths determine the transverse (side-to-side) center of gravity → track left/right balance (battery boxes, cooling loops, HV junction boxes, asymmetric ICE-removal offsets can bias one side) | CS-07 (General BBLB) | CG section — exact page still required | **RuleCandidate / NeedsOfficialFordCopy** — adds LF/RF/LR/RR + transverse-CG + side-to-side balance warning to Gate 07B/07C — lanes L4 |
| RC-105 | **FMVSS 105 passenger load (Ford General BBLB)**: passenger load for FMVSS 105 = **500 lb for vehicles over 10,000 lb GVWR** — an input to the loaded brake/CG cases | CS-07 (General BBLB); links CS-55 (FMVSS 105) | FMVSS-105 reference — exact page still required | **RegulatoryInput / NeedsOfficialFordCopy** — feeds the operating-state weight cases in the mass ledger. **Refined by RC-111 (review_25):** this is the FMVSS-105 *lightly-loaded vehicle weight* test allowance, **not** a universal fleet-payload assumption — lanes L4/L2 |
| RC-106 | **Weight release-gate NoGo (owner review_24)**: **no road test until** final front-axle ≤ front GAWR, final rear-axle ≤ rear GAWR, final total ≤ GVWR, each tire/wheel ≤ rated, side-to-side imbalance reviewed, certified scale ticket archived, engineering signoff complete | owner-promoted (over RC-99/101/102/103) | n/a — release rule | **NoGoConditionCandidate** — a release gate, **not** a safety claim; every box requires physical evidence + signoff; recorded in `docs/status/MASS_LEDGER.md` — lanes L4 |
| RC-107 | **Axle-moment + longitudinal-CG equation set (owner review_25)**: W=LF+RF+LR+RR; F=LF+RF; R=LR+RR; CGh=(R×WB)/W; component ΔR=(w×x)/WB, ΔF=w−ΔR (removed mass = negative w) | owner-promoted; defs cross-ref CS-07 | n/a — equations | **ModelingFrameworkCandidate / AxleMomentMethod** — allowed for **simulation only**; needs four-corner scale + component positions to produce numbers; recorded in `docs/status/AXLE_CG_CALCULATOR.md` — lanes L4 |
| RC-108 | **Transverse-CG equation (owner review_25, corrected form)**: CGt=[(RF−LF)×Tf/2 + (RR−LR)×Tr/2]/W, sign convention right +/left −; DRW rear track measured to the center of the wheel pair (Ford BBLB) | owner-promoted; CS-07 | BBLB CG/track-width defs — exact page still required | **ModelingFrameworkCandidate / NeedsOfficialFordCopy** — simulation-only; supersedes the batch's own transverse formula — lanes L4 |
| RC-109 | **Vertical CG stays BLOCKED (owner review_25)**: the rear-axle-lift method must follow an **approved CG-height test procedure** (Ford Transit BEMM/BBAS), performed by a certified facility / qualified technician; the "raise ≥10 in" step is a **candidate setup, not a final rule** (suspension compliance complicates CGv) | CS-07 (General BBLB) → CS-05 (BBAS/BEMM portal) | BBLB CGv section — official method still required | **BlockedPendingOfficialMethod / NeedsPhysicalTest** — interim NominalAssumption CGv (~22–24 in, BQ-16) for simulation only, never verified — lanes L4 |
| RC-110 | **IVM CGv Min/Max compliance equations (owner review_25)**: some Ford IVM statements of conformity give FMVSS-105-related **Max and Min CGv as a function of horizontal-CG location and wheelbase**; the calculated CGv must fall between them for all loading conditions — a **compliance check, not a general CG target** | CS-07 (General BBLB); needs the IVM statement-of-conformity | IVM statement of conformity — **source still to obtain** | **RegulatoryComplianceInput / NeedsIVMSource / OpenGap** — **replaces the batch's single generic "Factory_Maximum_Allowable_Height_Threshold"**; else status = NEEDS_IVM_OR_ENGINEERING_REVIEW. **RECURRED in batch_29** (`IF CG_v > Max_Allowable_Height → BLOCK` re-used one batch after correction — re-corrected; the calculator holds the IVM form) — lanes L2/L4 |
| RC-111 | **FMVSS 105 "lightly loaded vehicle weight" (owner review_25)**: unloaded vehicle weight + **500 lb** for >10,000 lb GVWR (incl. driver + instrumentation) — a FMVSS-105 **test-reference** input, **NOT** a universal fleet-payload assumption | CS-07 (General BBLB); links CS-55 (FMVSS 105) | FMVSS 105 lightly-loaded def — exact locator still needed | **RegulatoryTestInput / NeedsVehicleCategoryMapping** — **refines RC-105** (which framed the 500 lb as passenger load); the ~2,500 lb fleet-payload placeholder is separate — lanes L2/L4 |
| RC-112 | **Gate 07C pass/block logic + honest labels (owner review_25)**: BLOCK / WARNING / ALLOW-SIMULATION-ONLY rule set; rename `Final_Safety_Compliance_Status` → `Weight_CG_Gate_Status`; `OPERATIONAL_ALPHA` → `NOMINAL_CALCULATION_PASS / PHYSICAL_VERIFICATION_REQUIRED`; **the Build Engine must not claim compliance** | owner-promoted (over RC-99/102/106/110) | n/a — gate logic | **NoGoConditionCandidate / GateLogic** — recorded in `docs/status/AXLE_CG_CALCULATOR.md`; a calculation-gate, not a safety verdict. **RECURRED in batch_29** (`Final_Safety_Compliance_Status` / `OPERATIONAL_ALPHA` re-used one batch after correction — re-corrected; the calculator holds the honest labels) — lanes L4 |
| RC-113 | **Track-width (Tf, Tr) sourcing (owner review_26)**: the F-450/F-550 DRW track widths needed for CGt are **NOT supplier-only** — they can come from the official Ford BBLB/BBAS, physical measurement, or the door/VIN-specific configuration | CS-07 (General BBLB) / CS-05 (BBAS) / physical | BBLB dimensions — official copy or measurement | **NeedsOfficialFordSource OR PhysicalMeasurement** (not NeedsSupplierData) — a Gate 07C input to RC-108; interim NominalAssumption BBLB values for simulation only (BQ-18) — lanes L4 |
| RC-114 | **Gate 07C park status (owner review_26; extended review_27)**: `CALCULATOR_FRAMEWORK_READY` / `PHYSICAL_SCALE_DATA_REQUIRED` / `VERTICAL_CG_TEST_REQUIRED` / `NO_ROAD_TEST_CLEARANCE` — the calculator is ready for simulation but proves neither safety nor compliance | owner-promoted (over RC-107..112) | n/a — gate status | **GateStatus** — parks Gate 07C; road-test clearance stays blocked (RC-106 release gate) until physical scale + IVM CG review — lanes L4 |
| RC-115 | **Gate 08 FMEA registry schema (owner review_27)**: every failure mode requires subsystem, failure event, cause, hazard, detection method, system response, driver warning, test method (sim/HIL/bench/dyno/closed-course), required proof artifact, pass/block criteria, source, verification status, missing supplier data | owner-promoted | n/a — gate schema | **FMEAFramework / GateSchema** — the required structure for Gate 08; recorded in `docs/status/FMEA_REGISTRY.md`; Gate 08 = FMEA_FRAMEWORK_STARTED, not open — lanes L8/L7 |
| RC-116 | **Fabricated 200 ms HVIL limit REJECTED (owner defect-catch)**: the batch's `IF HVIL_LOOP_INTERRUPT_TIMING > 200 → BLOCK` invents a disconnect-latency threshold with **no standard / supplier / engineering source** | batch_30 (no source) | n/a — invented value | **DerivedRiskFlag / FabricationCaught → `HVIL_LOOP_INTERRUPT_TIMING_LIMIT = NeedsExactSource`** — FMVSS 305a is the HV-safety lane but no numeric HVIL threshold may be derived from it without exact text/test mapping; **the 200 ms is fenced, never a rule** — lanes L1/L8 |
| RC-117 | **No live-HV fault testing — staged testing NoGo (owner review_27)**: manually opening a LV circuit at an inverter service plug, or forcing an inverter shutdown on a moving vehicle, is prohibited as an early step → **Stage 1 bench/HIL (LV mock) → Stage 2 component test HV-isolated → Stage 3 supervised integrated test only after engineering safety plan + LOTO + PPE + test boundary + emergency shutdown are approved** | owner-promoted | n/a — safety rule | **NoGoConditionCandidate / SafetyStaging** — simulation pass ≠ physical pass; HIL pass ≠ road-test approval; recorded in `FMEA_REGISTRY.md` — lanes L8 |
| RC-118 | **Brake/regen test staging (owner review_27)**: regen/ABS/ESC validation must go simulation → HIL → dyno/wheel-lift → closed-course low-speed → **loaded only after brake-engineer review** | owner-promoted; links CS-49/CS-55 (FMVSS 105) | n/a — test staging | **TestStagingRule / NeedsBrakeEngineerMapping** — no result satisfies FMVSS 105 without a brake-engineer plan — lanes L8/L2 |
| RC-119 | **Gate 08 status (owner review_27)**: `FMEA_FRAMEWORK_STARTED` / `FAULT_TEST_PROCEDURES_REQUIRED` / `NO_LIVE_HV_TESTING_APPROVED` / `NO_TRACK_TESTING_APPROVED` / `SUPPLIER_TIMING_LIMITS_REQUIRED` | owner-promoted (over RC-115..118) | n/a — gate status | **GateStatus** — Gate 08 is started, not open; weight/CG CHECK 1/2 belong to Gate 07C (referenced as prerequisites only). **Superseded by RC-126** (review_28 relabel) — lanes L8 |
| RC-120 | **Gate 08 FMEA registry populated (batch_31)**: all 15 failure modes (HVIL open, isolation fault, contactor weld, pre-charge failure, battery overcurrent, inverter shutdown during regen, ABS/ESC × regen loss, EHPS pump failure, brake-assist pressure loss, steering-assist pressure loss, LV DC-DC brownout, coolant-pump failure, battery/inverter/motor overtemp, CAN loss, water intrusion/IP seal) with the full FMEA schema | owner-promoted; batch_31 | n/a — registry | **FMEAFramework** — the correct failure universe; **every row NeedsSupplierData / NeedsExactTimingSource / NeedsBrakeEngineerMapping / NeedsPhysicalVerification** — recorded in `docs/status/FMEA_REGISTRY.md`; nothing Confirmed — lanes L8/L1 |
| RC-121 | **Driver-warning messages are drafts (owner review_28)**: dashboard strings ("HV FAULT - STOP SAFELY", "SYSTEM ERROR - DO NOT ATTEMPT TO DRIVE", etc.) are **not Ford-confirmed** | batch_31 (Hunter-drafted) | n/a — UI concept | **DriverWarningCandidate / NeedsControlsIntegration** — draft UI only; final warnings come from Ford controls integration (Gate 05) — lanes L7/L8 |
| RC-122 | **Isolation Riso thresholds are reference-only (owner review_28)**: 100 Ω/V DC and 500 Ω/V AC (FMVSS 305/305a) must be **split by context**, not treated as one universal threshold | CS (FMVSS 305a, batch_03); links the batch_10 500 Ω/V split | FMVSS 305a isolation text — exact locator still needed | **RegulatoryReferenceCandidate / NeedsSystemContext / NeedsSupplierBMSMapping** — the BMS/inverter supplier sets the programmable threshold; consistent with the AC/DC/charge-inlet split — lanes L1/L8 |
| RC-123 | **Brake-assist subsystem = hydraulic, not pneumatic (owner review_28)**: FM-09's "Auxiliary Pneumatic / Hydraulic Braking Assist" is corrected to **Auxiliary Hydraulic Brake Assist** — the F-450/F-550 hydroboost lane is hydraulic | batch_31 | n/a — classification | **Correction** — recurrence-adjacent to the rejected vacuum/pneumatic path (review_17/19); hydroboost is hydraulic — lanes L9 |
| RC-124 | **Regen-loss response wording (owner review_28)**: change "friction brakes seamlessly blend or step in" to **"friction braking remains available and the system removes regen torque without destabilizing brake balance"** — no seamless OEM-style blending is implied | batch_31 | n/a — wording | **StatusInflationCorrection** — do not imply a true blended-brake controller exists; FM-06 response reworded — lanes L8 |
| RC-125 | **FMVSS 105 stays a test-mapping lane (owner review_28)**: Gate 08 must say **`FMVSS_105_TEST_MAPPING_REQUIRED` / `BrakeEngineerReviewRequired`**, never "FMVSS compliance satisfied" | CS-49/CS-55 (FMVSS 105) | 49 CFR 571.105 — exact locators still needed | **RegulatoryTestMapping / BrakeEngineerReviewRequired** — no compliance claim from the Build Engine — lanes L2/L8 |
| RC-126 | **Gate 08 status relabel + stronger pass/block (owner review_28)**: `FMEA_REGISTRY_CREATED` / `TEST_SEQUENCE_MAPPED` / `SUPPLIER_DATA_REQUIRED` / `NO_LIVE_HV_TESTING_APPROVED` / `NO_TRACK_TESTING_APPROVED` / `NO_COMPLIANCE_CLAIMS`; plus BLOCK/WARNING/SIMULATION-ONLY rules (block if a mode lacks detection/response/warning-candidate/test/proof, needs live HV without LOTO/PPE/signoff, brake/steering lacks brake-engineer review, or regen/ABS lacks sim/HIL before track) | owner-promoted (supersedes RC-119) | n/a — gate logic | **GateStatus / GateLogic** — recorded in `docs/status/FMEA_REGISTRY.md`; final validation not started — lanes L8 |
| RC-127 | **"Exact Quote" → "Claim Summary / NeedsExactQuote" (owner review_29, STANDING)**: standard language stored by the Build Engine as an "Exact Quote" without the official PDF in hand is a **paraphrase**, not verified text | batch_32 (all 15 Gate 08B source rows) | n/a — standing rule | **NeedsExactQuote / NeedsPageSectionTable** — upgrade to `ExactQuoteVerified` only after the official (often paid) standard PDF is obtained and the exact page/section/table is cited; no standard quote is a final rule until then — lanes L1/L8 |
| RC-128 | **Gate 08B source-candidate mapping (batch_32)**: each of the 15 FMEA modes mapped to a candidate standard (SAE J1742, UN ECE R100/FMVSS 305, SAE J2344, ISO 6469-3, SAE J2464/UL 2580, ISO 26262-4, FMVSS 105/ECE R13-H, ISO 5010/FMVSS 121-135, FMVSS 105, SAE J2672, ISO 16750-2, IEC 60529/ISO 16750-4, UL 2580/SAE J2289, SAE J1939-21/ISO 11898, ISO 20653) | owner-promoted; batch_32 | n/a — source map | **SourceCandidateMapping** — leads only; per-source corrected statuses recorded in `docs/status/FMEA_REGISTRY.md`; none are verified sources (no CS rows minted — NeedsExactQuote) — lanes L8/L1 |
| RC-129 | **Wrong/weak source matches downgraded (owner review_29)**: EHPS→**ISO 5010 (earth-moving)** = NeedsBetterSource; coolant→**IEC 60529 / ISO 16750-4 (environmental)** = NeedsThermalSupplierData; regen→**ISO 26262-4** = FunctionalSafetyFrameworkCandidate (not a brake test); ABS/ESC→**ECE R13-H** = ContextCheckNeeded (passenger-car; Class 4/5 needs FMVSS 105 + heavy-vehicle review); steering→**SAE J2672** = NeedsExactStandardVerification | batch_32 | n/a — source corrections | **SourceMismatchCorrections** — the failure modes are correct; the source matches were wrong/weak — lanes L8 |
| RC-130 | **ABS/ESC regen wording (owner review_29)**: change "transferring complete slip control to the hydraulic brakes" to **"regen torque is removed or reduced so friction braking and factory ABS/ESC logic are not opposed by drive-axle motor torque"** | batch_32 (FM-07) | n/a — wording | **StatusInflationCorrection** — refines RC-124; do not imply the conversion takes over slip control — lanes L8 |
| RC-131 | **Water-intrusion IP correction (owner review_29)**: **pressure-decay leak testing ≠ IP67/IP69K certification** — it is a production/engineering leak screen; formal IP validation needs the ISO 20653 test method or a certified lab / supplier IP report | CS (ISO 20653, registered); FM-15 | ISO 20653 — exact method still needed | **ISO 20653 = StrongSourceLane; pressure-decay = ProductionScreenCandidate / NeedsCorrelationToIPTest** — final proof = certified lab IP67/IP69K report — lanes L8 |
| RC-132 | **Gate 08B status (owner review_29)**: `SOURCE_CANDIDATES_MAPPED` / `NOT_FINAL` / `NEEDS_EXACT_QUOTES` / `NEEDS_PAGE_SECTION_TABLE` / `NEEDS_SUPPLIER_THRESHOLDS` / `NO_LIVE_HV` / `NO_TRACK` / `NO_COMPLIANCE`; **Gate 08C = NOT STARTED**; **08B parked, not closed — move to Gate 05 in parallel** | owner-promoted | n/a — gate status | **GateStatus** — the Hunter's "Gate 08B COMPLETED" rejected; source authority (not workflow) is the gap — lanes L8 |
| RC-133 | **Placeholder values have NO gate authority (owner review_30, CRITICAL)**: a `NominalEngineeringAssumption` cannot create a PASS/BLOCK — it produces `ASSUMPTION_STRESS_RESULT_ONLY` with `GATE_AUTHORITY = NONE` and `PHYSICAL_TEST_CLEARANCE = BLOCKED`; PASS/BLOCK is reserved for `SupplierConfirmed` / `PhysicallyVerified` values | owner-promoted; batch_33 (the "PASS if ≤ 50 ms" logic) | n/a — gate guardrail | **NoGoConditionCandidate / GateLogic** — the Build Engine may **build** logic from placeholders but never **approve** with them; recorded in `docs/status/DRAFT_VALIDATION_08C.md` — lanes L8/L1 |
| RC-134 | **Gate 08C sweep vocabulary + parameter format (owner review_30)**: use **Simulation Sweep Result — stable / unstable / needs-review / missing-source / supplier-data-required**, NOT PASS/BLOCK; numeric fields become sweep inputs (Default null + Exploratory values + Status + Allowed/Blocked use + Authority=none + Upgrade Required) | owner-promoted | n/a — engine format | **SweepEngineFormat** — the 15 placeholder numbers are exploratory sweep points, not thresholds; recorded in `DRAFT_VALIDATION_08C.md` — lanes L8 |
| RC-135 | **Gate 08C status (owner review_30)**: `DRAFT_VALIDATION_STARTED` / `SIMULATION_ONLY` / `PLACEHOLDER_VALUES_ALLOWED_FOR_STRESS_TESTING` / `NO_PLACEHOLDER_PASS_BLOCK_AUTHORITY` / `SUPPLIER_DATA_PENDING` / `NO_PHYSICAL_TEST_CLEARANCE` / `NO_COMPLIANCE_CLAIMS` | owner-promoted | n/a — gate status | **GateStatus** — cannot become FINAL_VALIDATED without supplier data + exact standards + physical tests + engineering signoff — lanes L8 |
| RC-136 | **Gate 05 authorized-controls doctrine (owner review_30, SAFETY-CRITICAL)**: ALLOWED = authorized Ford-compatible integration, **listen-only** capture, public/authorized J1939/OBD-II, upfitter docs, supplier DBC files; **BLOCKED = proprietary-DBC assumptions, anti-theft bypass, fake/spoofed ABS/ESC messages, transmitting onto factory Ford safety buses without approval** | owner-promoted; batch_33 (corrects the "reverse-engineering group / sniffing" framing) | n/a — security/safety rule | **NoGoConditionCandidate / SecurityFraming** — same class as the standing PATS-bypass prohibition; the DBC-IDs row → **NeedsAuthorizedSource** (BQ-25); recorded in `docs/status/GATE05_CONTROLS.md` — lanes L7/L8 |
| RC-137 | **Gate 05 candidate network topology + CAN config (batch_33)**: split gateway architecture (Ford chassis/body/comfort CAN → VCU gateway → EV inverter/BMS/aux loops) + a 4-channel capture matrix (wheel-speed, pedal, brake-switch, dashboard, ignition, inverter/BMS telemetry) | batch_33 (Hunter-drafted) | n/a — candidate topology | **ListenOnlyCandidate / NeedsAuthorizedSource** — all Ford-side IDs/rates unverified; **no transmit onto Ford safety buses**; diagnostic slots are for listening, not injecting; recorded in `GATE05_CONTROLS.md` — lanes L7 |
| RC-138 | **Gate 08C sweep vocabulary cleanup (owner review_31)**: replace "stable/unstable" (still reads as approval) with **Simulation Response Category — `Model Accepts` / `Model Needs Review` / `Model Stress Failure` / `Supplier Data Required`**, each carrying **`No Gate Authority`** (e.g. "[100 ms]: Model Stress Failure / No Gate Authority") | owner-promoted | n/a — engine vocabulary | **SweepEngineFormat** — refines RC-134; PASS/BLOCK still reserved for SupplierConfirmed/PhysicallyVerified; recorded in `docs/status/DRAFT_VALIDATION_08C.md` — lanes L8 |
| RC-139 | **Gate 08C status (owner review_31)**: `DRAFT_VALIDATION_STARTED` / `SIMULATION_SWEEP_ACTIVE` / `PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY` / `SUPPLIER_THRESHOLDS_REQUIRED` / `NO_PHYSICAL_TEST_CLEARANCE` / `NO_COMPLIANCE_CLAIMS` | owner-promoted (refines RC-135) | n/a — gate status | **GateStatus** — sweep matrix active; no authority beyond stress testing — lanes L8 |
| RC-140 | **Gate 05 J1939 PGN candidates (batch_34)**: PGN 61444 (EEC1) engine speed, PGN 61443 (EEC2) accel-pedal, PGN 65265 (CCVS) wheel-based speed, Ford UIM byte0-bit2 ignition-key, CAN_1 500 kbps J1939 — Ford byte-maps **unverified** | batch_34 (Hunter-drafted); Ford Pro J1939 upfit path | n/a — candidate signals; **NeedsOfficialFordUIMSource** | **J1939SignalCandidate / NeedsOfficialFordUIMSource / ListenOnlyCandidate / NoTransmitAuthority** — do not treat any Ford PGN/byte/rate as confirmed until official Ford/UIM docs prove it (Gate 05A); recorded in `GATE05_CONTROLS.md` — lanes L7 |
| RC-141 | **Accel-pedal→torque caution (owner review_31)**: "accel pedal scaled **directly** into the EV inverter torque loop" is too strong → the pedal signal (from an authorized source) may only **inform** a VCU torque-demand model; **final torque requires pedal-plausibility checks, brake-override logic, fault handling, and controls-engineer review** | batch_34 (FM/controls) | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — never drive inverter torque directly from an unverified Ford signal — lanes L7/L8 |
| RC-142 | **Gate 05 transmit rule + VCU boundary + labels (owner review_31)**: transmit stays **BLOCKED** until Ford/UIM docs allow the exact message/bus/address/use case; VCU may **read** authorized signals, command **only conversion-side** unless Ford permits; **factory safety modules remain authoritative** for ABS/ESC/brake. Labels: STARTED / LISTEN_ONLY_RESEARCH / AUTHORIZED_CHANNELS_ONLY / NO_FACTORY_SAFETY_BUS_TRANSMIT / NO_IMMOBILIZER_OR_SECURITY_BYPASS / NO_PROPRIETARY_DBC_ASSUMPTIONS | owner-promoted | n/a — gate status/security | **GateStatus / SecurityFraming** — extends RC-136; recorded in `GATE05_CONTROLS.md` — lanes L7/L8 |
| RC-143 | **Gate 08C parked + wording tightened (owner review_32)**: status `SIMULATION_SWEEP_MATRIX_CREATED` / … / `PARKED_FOR_SUPPLIER_DATA` ("done enough to keep moving"); the Simulation Response Category term **"Model Accepts" → "Within Draft Stress Envelope / No Gate Authority"** (so it is never mistaken for approval) | owner-promoted (refines RC-138/139) | n/a — gate status/vocab | **GateStatus / SweepEngineFormat** — recorded in `docs/status/DRAFT_VALIDATION_08C.md` — lanes L8 |
| RC-144 | **Gate 05A DBC reality (owner review_32)**: Ford may not provide a clean proprietary DBC → Ford factory systems = **`AuthorizedSourcePending / ListenOnlyCandidate / NoTransmitAuthority`**; EV/conversion-side DBCs (BMS, inverter, VCU, DC-DC, charger) are realistic + **owned**; "Authorized Ford UIM/J1939 documentation" unlocks **listen-only registry + receive-only VCU state awareness + authorized upfitter mapping**, NOT "custom VCU transmit configs" | owner-promoted (extends RC-142) | n/a — controls doctrine | **ControlsDoctrine** — recorded in `GATE05A_SIGNAL_REGISTRY.md` — lanes L7 |
| RC-145 | **Gate 05A signal registry (batch_35)**: 6 signals — Ford-side S1 wheel-speed (PGN 65215 EWS1), S2 accel-pedal (61443 EEC2), S3 brake-switch (61441 EBC1), S4 ignition (Ford UIM); EV-side S5 inverter torque (CAN_2), S6 BMS SOC (CAN_3) | batch_35 (Hunter-drafted); public SAE J1939-71 | n/a — signal registry; **byte/bit Unverified** | **Ford-side: Public/Standard J1939 Candidate / UnverifiedStage / NeedsExactStandardText / NeedsVehicleCapture / Listen-Only / No control authority. EV-side: owned isolated loops.** Recorded in `GATE05A_SIGNAL_REGISTRY.md` — lanes L7 |
| RC-146 | **Signal-use restrictions (owner review_32)**: **accel-pedal (S2)** Allowed = compare driver-demand trend in **simulation**; Blocked = **direct inverter torque command, physical torque arbitration, road-test torque control**. **brake-switch (S3)** Allowed = **simulation-only** regen-decay study; Blocked = **physical regen disable, braking validation, or safety control without a confirmed source + debounce logic + brake-engineer review** | owner-promoted (extends RC-141) | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — an unverified Ford signal is never physical torque/brake authority — lanes L7/L8 |
| RC-147 | **Gate 05A status (owner review_32)**: `SIGNAL_REGISTRY_STARTED` / `LISTEN_ONLY_RESEARCH` / `UNVERIFIED_STAGE` / `NO_ACTIVE_TRANSMISSIONS` / `NO_FACTORY_SAFETY_BUS_CONTROL` | owner-promoted | n/a — gate status | **GateStatus** — next is Gate 05B (Controls Dependency Map) — lanes L7 |
| RC-148 | **Gate 05A transmit-config re-correction + status (owner review_33)**: "unlocks custom VCU configurations on the body-builder bus" → **unlocks authorized RECEIVE/LISTEN-ONLY VCU awareness; transmit blocked unless Ford docs allow the exact message/address/timing/bus/use case**; status adds **`NO_PROPRIETARY_DBC_ASSUMPTIONS`** | batch_36 (ledger line RECURRED) | n/a — gate doctrine | **GateStatus / SecurityFraming** — **RECURRENCE** of the RC-142/144 transmit rule (re-corrected); recorded in `docs/status/GATE05A_SIGNAL_REGISTRY.md` — lanes L7 |
| RC-149 | **Gate 05B controls dependency map (batch_36)**: Ford-side receive-only inputs (accel/brake/ignition/wheel-speed on CAN_1) + EV-side receive inputs (inverter rpm, BMS volt/current/SOC, DC-DC temp, charger plug — owned DBCs) + VCU decisions + driver warnings + fault levels 1–3 + directionality/isolation constraints | batch_36 (Hunter-drafted) | n/a — controls map | **ControlsDependencyMap** — recorded in `docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md`; Ford-side stays ListenOnlyCandidate; EV-side isolated — lanes L7 |
| RC-150 | **VCU decision authority = SimulationOnly (owner review_33)**: Torque Demand Arbitration (needs verified pedal source + brake override + plausibility + inverter DBC + BMS limits + controls-engineer review); **Pre-Charge (do NOT assume the VCU controls contactors — pre-charge authority may belong to the BMS/PDU safety controller)**; Thermal Derating (needs supplier curves + temp limits) | owner-promoted | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — VCU decisions carry no physical authority until sources + DBCs + supplier ownership are proven (BQ-27) — lanes L7/L8 |
| RC-151 | **Driver-warning output rule (owner review_33)**: EV warnings (malfunction indicator, thermal, SOC) → **isolated display node / service laptop / prototype dashboard ONLY**; **factory cluster warning integration = `BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE`** | owner-promoted | n/a — output rule | **NoGoConditionCandidate** — no warning injected into the Ford factory cluster until an authorized Ford interface exists — lanes L7 |
| RC-152 | **Emergency-shutdown authority (owner review_33)**: Fault Level 3 → **request** EV-side contactor open / torque inhibit / restart lockout **through the authorized BMS-PDU safety architecture**; `SimulationOnly` until BMS/PDU ownership + contactor-control authority confirmed; **the VCU does NOT automatically own final HV shutdown** unless the supplier architecture confirms it | owner-promoted | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — HV shutdown authority is a supplier-architecture question (BQ-27) — lanes L7/L8 |
| RC-153 | **Gate 05B status (owner review_33)**: `CONTROL_DEPENDENCY_MAP_STARTED` / `SIMULATION_ONLY` / `FORD_SIDE_RECEIVE_ONLY` / `EV_SIDE_ISOLATED_CONTROL_ONLY` / `PRECHARGE_AUTHORITY_UNCONFIRMED` / `DRIVER_WARNING_OUTPUT_UNCONFIRMED` / `NO_PHYSICAL_TORQUE_CONTROL` / `NO_FACTORY_CLUSTER_INJECTION` | owner-promoted | n/a — gate status | **GateStatus** — next is Gate 05C (Controls State Machine) — lanes L7 |
| RC-154 | **Gate 05C controls state machine (batch_37)**: 11 states (OFF, ACCESSORY, READY_REQUEST, PRECHARGE_REQUEST, READY_TO_DRIVE, DRIVE_ENABLED, DERATE, FAULT_LATCHED, SERVICE_MODE, CHARGE_CONNECTED, EMERGENCY_SHUTDOWN) each with required inputs / allowed EV-side outputs / blocked Ford-side outputs / fault transitions / proof artifact / verification status | batch_37 (Hunter-drafted) | n/a — state machine | **ControlsStateMachine** — recorded in `docs/status/GATE05C_STATE_MACHINE.md`; every state UNVERIFIED_STAGE — lanes L7 |
| RC-155 | **Ford-side signals cannot be hard Required Inputs (owner review_34)**: listen-only Ford signals (ignition, brake, etc.) are **`SimulationOnly / CandidateSignal`** — not real state-transition authority until an official Ford/UIM source or verified capture exists; physical control uses verified EV-side / supplier-confirmed / hardwired-safety / authorized-upfitter inputs | owner-promoted (extends RC-140/145) | n/a — controls rule | **ControlsSafety** — an unverified Ford signal never gates a real state transition — lanes L7 |
| RC-156 | **Pre-charge threshold is ParameterPending (owner review_34)**: the batch's ">95% of pack voltage / timeout" is **`ParameterPending / SupplierDataRequired`** → FAULT_LATCHED if pre-charge fails to reach the **supplier-defined target within the supplier-defined timeout** (no invented number) | batch_37 (invented threshold) | n/a — parameter | **NeedsSupplierData** — links BQ-27 (pre-charge ownership) — lanes L7/L8 |
| RC-157 | **Emergency-shutdown + service-mode safety wording (owner review_34)**: EMERGENCY_SHUTDOWN → **request/trigger EV-side torque inhibit + contactor-open + restart lockout through the authorized BMS/PDU safety architecture; final HV isolation authority = BMS/PDU / hardwired E-stop — pending supplier arch**. SERVICE_MODE → **diagnostics only after HV de-energized + LOTO active + service disconnect removed + absence-of-voltage verification** (not a normal software action) | owner-promoted (extends RC-152/117) | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — the VCU does not own final HV shutdown; opening HVIL is never a routine software step — lanes L7/L8 |
| RC-158 | **State ownership labels (owner review_34, biggest upgrade)**: every state carries **Owner ∈ {VCU, BMS, PDU, Inverter, Charger, Ford module, Hardwired safety circuit, Unknown/Pending supplier architecture}** + VCU Role + Authority Status; the VCU may **coordinate** but cannot assume ownership of contactors / pre-charge / HV shutdown / factory signals / cluster warnings until proven | owner-promoted | n/a — state-machine schema | **GateLogic** — recorded in `docs/status/GATE05C_STATE_MACHINE.md` — lanes L7 |
| RC-159 | **Gate 05C status (owner review_34)**: `STATE_MACHINE_DRAFTED` / `SIMULATION_ONLY` / `AUTHORITY_OWNERSHIP_UNRESOLVED` / `FORD_SIDE_SIGNALS_LISTEN_ONLY` / `EV_SIDE_OUTPUTS_ISOLATED` / `PRECHARGE_OWNER_PENDING` / `HV_SHUTDOWN_OWNER_PENDING` / `NO_PHYSICAL_TORQUE_CONTROL` / `NO_FACTORY_CLUSTER_INJECTION` | owner-promoted | n/a — gate status | **GateStatus** — next is Gate 05D (State Transition + Ownership Matrix) — lanes L7 |
| RC-160 | **READY_TO_DRIVE must not command torque (owner review_35)**: the batch_38 line "VCU may command torque only after confirmed ready state" is **too early** → replace with "VCU may request drive-enable state confirmation; **torque command remains BLOCKED until DRIVE_ENABLED is entered and all torque-authority conditions are satisfied**." Torque stays strictly in DRIVE_ENABLED | batch_38 (over-broad output) | n/a — controls-safety rule | **ControlsSafety** — recorded in `docs/status/GATE05D_OWNERSHIP_MATRIX.md`; links BQ-27 — lanes L7 |
| RC-161 | **OFF-state monitor scope (owner review_35)**: a truly asleep VCU cannot monitor much → VCU Role = **"MONITOR only if low-power supervisor mode is active; otherwise dormant."** Sleep-state monitoring may be owned by the **LV supervisor / BMS keep-alive** | batch_38 (over-stated monitor role) | n/a — ownership detail | **GateLogic** — recorded in `docs/status/GATE05D_OWNERSHIP_MATRIX.md` — lanes L7 |
| RC-162 | **ACCESSORY thermal-pump limit (owner review_35)**: "power delivery to thermal cooling pumps" needs a limit → **pumps may run only if LV power budget + pump ownership + thermal-controller authority are verified**, so the VCU does not become the thermal-controller owner too early | batch_38 (unbounded output) | n/a — ownership limit | **NeedsSupplierData / ControlsSafety** — recorded in `docs/status/GATE05D_OWNERSHIP_MATRIX.md` — lanes L7/L8 |
| RC-163 | **SERVICE_MODE physical-safety language (owner review_35)**: SERVICE_MODE must state that physical maintenance requires **HV de-energized + LOTO active + service disconnect removed (if applicable) + absence-of-voltage verification + technician signoff**; the VCU cannot make service "safe" by software alone | owner-promoted (extends RC-157) | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — recorded in `docs/status/GATE05D_OWNERSHIP_MATRIX.md` — lanes L7/L8 |
| RC-164 | **Pre-charge ICD signal must be split (owner review_36)**: the batch_39 "Pre-Charge Inception Flag" mixes request + status + hardware actuation in one signal → decompose into **VCU_Precharge_Request** (VCU→BMS/PDU, transmit request only, BLOCKED until supplier protocol confirms request allowed), **BMS_Precharge_Status** (BMS/PDU→VCU, receive, MONITOR), **Precharge_Relay_Coil_Control** (BMS/PDU or hardwired safety controller→relay, hardware actuation, **BLOCKED for VCU unless supplier architecture explicitly assigns it**) | batch_39 (over-broad signal) | n/a — ICD rule | **ControlsSafety** — recorded in `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` (4a/4b/4c); links BQ-27 — lanes L7 |
| RC-165 | **Emergency-shutdown ICD signal must be split + renamed (owner review_36)**: "Emergency Shutdown Inhibit Command" ("inhibit" wrongly reads as *preventing* shutdown) → decompose into **VCU_Torque_Zero_Request** (VCU/Inverter, CAN_2, pending inverter DBC + HIL), **VCU_Shutdown_Request_To_BMS** (owner BMS/PDU, VCU requester only, pending supplier protocol), **Hardwired_EStop_Open_Circuit** (owner hardwired safety loop, VCU monitor only, **no software override**), **BMS_Contactor_Open_Status** (owner BMS/PDU, VCU monitor, receive only) — keeps torque inhibit separate from HV de-energization | batch_39 (ambiguous signal) | n/a — ICD rule | **ControlsSafety** — recorded in `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` (7a/7b/7c/7d) — lanes L7 |
| RC-166 | **Ford source controllers stay generic (owner review_36)**: batch_39's "Ford PCM / Accelerator Hub Module" and "Ford ABS / Brake Pedal Sensor Module" are **too specific** → use **"Ford factory module / UIM path — pending verification"** until the Ford source or a passive capture proves the exact module | batch_39 (unproven module attribution) | n/a — ICD rule | **NeedsFordExactSource / ListenOnlyCandidate** — recorded in `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` — lanes L7 |
| RC-167 | **Listen-only proof requirement (owner review_36)**: a Ford-side listen-only claim requires **silent/listen-only interface mode + no ACK participation + no transmit mailbox enabled + capture log attached + hardware-configuration screenshot attached** (makes the "no transceiver ACK activation" artifact a hard rule; strengthens Gate 05A) | owner-promoted | n/a — proof rule | **ControlsSafety / ProofRequirement** — recorded in `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` — lanes L7 |
| RC-168 | **Signal-decomposition doctrine (owner review_36)**: **a signal cannot be both a request and a hardware actuation unless the source document explicitly says so**; every safety-critical action decomposes into **request · status · feedback · hardware-actuation · fault** signals — one signal name may not imply more authority than it has | owner-promoted (extends D-007) | n/a — controls doctrine | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` — lanes L7 |
| RC-169 | **Gateway timeouts have no authority (owner review_37, RECURRENCE of the invented-timing defect — cf. RC-116 200 ms HVIL, RC-133 Gate 08C placeholder-authority)**: the batch_40 `50 ms` inverter zero-torque + `100 ms` CAN_2/CAN_3 silence numbers are acting like sourced safety boundaries → downgrade to `t_inverter_timeout / t_can2_timeout / t_can3_timeout = SupplierDataPending`; exploratory sweep values (50/100/250 ms) allowed **simulation-only, labeled No Gate Authority**; Protocols A/B/C reworded to "supplier-defined timeout pending inverter DBC / supplier safety manual / BMS architecture" | batch_40 (invented timing) | n/a — parameter | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05F_NETWORK_BOUNDARY.md`; links BQ-27 — lanes L7/L8 |
| RC-170 | **Authority-chain language (owner review_37)**: "BLOCKED until **academic engineering wiring protocol** confirms request is allowed" / "pending **manual OEM academic research protocol**" → **"BLOCKED until supplier wiring diagram, interface control document, and controls-engineer review confirm request authority"** ("academic" is too weak for a real build authority chain) | batch_40 (weak authority language) | n/a — authority rule | **ControlsSafety** — recorded in `docs/status/GATE05F_NETWORK_BOUNDARY.md` — lanes L7 |
| RC-171 | **Signal-owner vs action-owner split (owner review_37)**: for `VCU_Precharge_Request` and `VCU_Shutdown_Request_To_BMS` the batch's "Owner: Conversion VCU" is incomplete → make it explicit — **Signal Owner = VCU (owns request generation); Action Owner = BMS/PDU/hardwired safety (owns execution); VCU Authority = requester only** | batch_40 (owner conflation) | n/a — ownership rule | **ControlsSafety** — recorded in `docs/status/GATE05F_NETWORK_BOUNDARY.md`; links BQ-27 — lanes L7 |
| RC-172 | **CAN_1 hardware language (owner review_37)**: "CAN_1 transceiver hardware must be **modified** or configured to prevent transmission" ("modified" is risky) → **"CAN_1 hardware must be selected, wired, or configured for listen-only / silent monitoring with no transmit capability enabled"** (options: silent-mode controller, receive-only transceiver, removed TX path, hardware gating) | batch_40 (over-narrow method) | n/a — boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05F_NETWORK_BOUNDARY.md` — lanes L7 |
| RC-173 | **No timing becomes gate logic unproven (owner review_37, new rule)**: **no timeout, heartbeat, alive-counter, torque-zero, shutdown, or contactor-open timing may become physical gate logic until confirmed by supplier documentation or HIL/bench proof**; an estimated timeout is **simulation-sweep-only and must be labeled No Gate Authority** | owner-promoted (generalizes RC-169; extends RC-133) | n/a — controls doctrine | **GateLogic / NoGateAuthority** — recorded in `docs/status/GATE05F_NETWORK_BOUNDARY.md` — lanes L7/L8 |
| RC-174 | **Failsafe timeouts have no authority (owner review_38, THIRD recurrence of the invented-timing defect — cf. RC-116/133/169/173)**: the batch_41 `50 ms` (inverter zero-torque), `100 ms` (CAN_2/CAN_3 silence), `2 ms` (dominant-timeout DTO) numbers still read like sourced timing → downgrade to `t_inverter_torque_zero / t_can2_timeout / t_can3_timeout = SupplierDataPending / SimulationSweepOnly`, `t_dominant_timeout = TransceiverSupplierDataPending / SimulationSweepOnly`; rows reworded to "supplier-defined safe behavior … timeout pending inverter documentation and HIL proof" | batch_41 (invented timing) | n/a — parameter | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md`; links BQ-27 — lanes L7/L8 |
| RC-175 | **No "instant" for mechanical / E-stop actions (owner review_38)**: "hardwired loop breaks LV supply to contactor coils **instantly**; HV link isolation happens **instantly**" → **"hardwired loop removes/interrupts the contactor control path through the approved safety circuit; actual contactor opening time is supplier-defined and must be verified by bench/HIL oscilloscope trace"** (mechanical contactors have coil decay, spring travel, arc suppression, contact-separation timing — "instant" is not a safe engineering word) | batch_41 (unsafe timing word) | n/a — failsafe rule | **NeedsSupplierData / ControlsSafety** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md` — lanes L7/L8 |
| RC-176 | **CAN_1 transmit-attempt failure type (owner review_38)**: clarify — a software transmit attempt is **rejected by firmware policy AND physically unable to drive the bus due to listen-only/silent hardware**; proof = silent-mode register + no transmit mailbox + no ACK participation + no dominant-bit injection + protocol-analyzer capture | batch_41 (under-specified) | n/a — failsafe rule | **ControlsSafety / ProofRequirement** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md` — lanes L7 |
| RC-177 | **Bad-checksum stale-data caution (owner review_38)**: "uses last valid safe data" is risky for torque / driver-demand → **reject the corrupted frame; use last known value only if it is an explicit safe fallback within a supplier-defined timeout, otherwise transition toward torque zero / FAULT_LATCHED**; **bad data cannot preserve torque authority unless timeout + fallback behavior are verified** | batch_41 (stale-data risk) | n/a — failsafe rule | **ControlsSafety** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md` — lanes L7 |
| RC-178 | **Wrong-source-address should not hard-latch immediately (owner review_38)**: "FAULT_LATCHED upon unexpected ID reception" is too aggressive (diagnostics / service tools / unrelated devices produce unexpected frames) → **reject the unexpected source address; log the event; escalate to FAULT_LATCHED only if repeated, safety-critical, or matching a forbidden control-path pattern — threshold pending controls/security review** | batch_41 (over-aggressive latch) | n/a — failsafe rule | **ControlsSafety / NeedsSecurityReview** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md` — lanes L7 |
| RC-179 | **Failsafe default-safe rule (owner review_38, new rule)**: **no failsafe timing value may control physical hardware until upgraded from SimulationSweepOnly to SupplierConfirmed or BenchVerified**; **any signal fault involving torque, contactors, BMS discharge permission, HVIL, isolation, or e-stop must default toward torque inhibit, restart lockout, and engineering review**. Critical containment kept: BMS no-discharge → clamp inverter torque to zero; inverter ignores torque-zero → escalate to shutdown request + FAULT_LATCHED on current/torque-feedback conflict | owner-promoted (extends RC-173) | n/a — controls doctrine | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05G_FAILSAFE_MATRIX.md` — lanes L7/L8 |

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

---

## 17. Batch 10 + owner review_05 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_10_hv_wiring_gap_analysis.md`
and `docs/research/raw/owner_reviews/review_05_batch_10_verdict.md`.
Row additions: CS-21, CS-22, RC-40..RC-42.

### THE catch of this batch — universal isolation threshold rejected

Batch_10's action log ordered: *"throw a hard fault state if isolation
drops below 500 Ω/V"*. **Owner correction applied — that rule is
rejected as written.** The regulation's structure is context-split,
and the register now carries it only as split candidates (RC-42):

| Context | Candidate threshold | Status |
|---|---|---|
| AC HV sources | ≥ 500 Ω/V | RegulatoryCandidate — locator pending |
| DC HV sources | ≥ 100 Ω/V | RegulatoryCandidate — locator pending (coincides with Sendyne discussion, RC-38) |
| Charge inlet (charging measurement) | 500 Ω/V | RegulatoryCandidate — locator pending |
| Exposed conductive parts (barrier/direct-contact context) | < 0.2 Ω bonding | Candidate TEST item, context-scoped only |

Final values require exact FMVSS 305a / eCFR section extraction
(B-002) + ISO test mapping + engineering review. **A universal
threshold is forbidden.** This is the pipeline's most safety-relevant
catch to date: a flattened regulatory number nearly became a hard
fault rule.

### Owner dispositions applied

- **Promoted as gap items (statuses per review_05):** battery/inverter
  current parameters → NeedsSupplierData; selected HV component
  datasheets (cable, fuse, contactors, pre-charge, connectors, MSD
  part number) → NeedsSupplierData; physical cable routing path →
  PhysicalVerificationRequired; fault-current + fuse interrupt rating
  → OpenGap; grounding/bonding threshold → NeedsExactSource; IP-rating
  validation → OpenGap.
- **Downgraded:** Feichun 6–8× OD → TechnicalBackground /
  NeedsSupplierData, usable ONLY as a preliminary routing screen
  (RC-40) — notable: the previously fenced multiplier variants now
  have a documentable trade-article origin, and remain non-rules;
  EV Builder's Guide 500 Ω/V → TechnicalBackground, superseded by the
  split structure (RC-41 → RC-42).
- **Rejected (standing, extended):** any universal HV wiring rule not
  tied to selected part datasheets, official standard text, or
  verified physical routing.

### Batch-10 conduct notes

- Batch's own section 3 self-held fault-current formulas ("no generic
  rules until cell internal resistance values are defined"), grounding
  thresholds, and IP cycles — continued guardrail convergence.
- The action-log error shows the failure mode has moved: not fake
  sources anymore, but **overreach in the "next action" column** —
  converting background numbers into enforcement language. Watch that
  column specifically in future batches.
- Numbering shift "10:175" (vs prior "n:75") noted in PROVENANCE —
  unexplained; owner may clarify total batch count.

---

## 18. Batch 11 + owner review_06 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_11_hv_wiring_components.md`
and `docs/research/raw/owner_reviews/review_06_batch_11_verdict.md`.
Row additions: CS-23..CS-25, RC-43..RC-45; RC-38 gains
`NeedsCANProtocolDocument`. **First component-level payload — HV
wiring moves from topic mapping to named parts with exact missing
parameters.**

### Owner corrections applied

1. **Coroflex gauge scoping:** the cited datasheet is 9-2611 /
   **6.0 mm² only**. Its 3×/6× OD bend radii are part-scoped rule
   candidates; batch_11's matrix implied 35/50 mm² coverage — wrong;
   nothing transfers to other gauges without their datasheets.
2. **Auxiliary ≠ traction fuse:** batch_11 titled the Eaton row
   "Traction Subsystem…" — the datasheet is for **auxiliary** fuses
   (10–50 A). Retitled; auxiliary fuse = SupplierCandidate; **main
   traction fuse remains OpenGap** (pack fault analysis required
   first).
3. **EV200 not automatically sufficient:** strong candidate, but held
   behind the 9-item needs list (battery V, inverter currents, fault
   current, make/break duty, pre-charge sequence, coil voltage, aux
   contacts, thermal mounting).
4. **Sendyne:** stays SupplierCandidate/MetricCandidate; new status
   `NeedsCANProtocolDocument` (host-controller protocol doc is a
   separate artifact to obtain).

### HV Wiring Package status table (owner-marked, authoritative)

| Parameter | Status |
|---|---|
| Battery max voltage | MISSING_SOURCE / NeedsSupplierData |
| Battery cont./peak current | MISSING_SOURCE / NeedsSupplierData |
| Inverter cont./peak current | MISSING_SOURCE / NeedsSupplierData |
| HV cable part number | Candidate only — Coroflex 9-2611 / 6.0 mm² |
| HV cable bend radius | Candidate rule only for the exact cable datasheet |
| Fuse | Auxiliary candidate only; **main traction fuse OpenGap** |
| Contactor | EV200 SupplierCandidate / NeedsEngineeringReview |
| Pre-charge | OpenGap |
| MSD/HVIL | SupplierCandidate / NeedsEngineeringReview |
| Isolation monitor | Sendyne SupplierCandidate / NeedsCANProtocolDocument |
| Bonding/grounding | OpenGap |
| Physical route | PhysicalVerificationRequired |
| Engineer review | **Required before fabrication** |

### Conduct notes

- Batch_11 obeyed the owner's hard rules (no invented sizes, no
  universal 500 Ω/V, no cross-gauge bend enforcement) — the review_05
  corrections took hold within one batch.
- Residual defect pattern: **row-title inflation** ("Traction
  Subsystem" over auxiliary data) and **matrix-cell overreach**
  (35/50 mm² in the ampacity cell against a 6.0 mm² source). Same
  family as batch_10's action-column overreach: headers/cells claiming
  more than the quoted source. Both caught by owner review.
- EV200 datasheet is hosted on a third-party mirror (rec-bms.com) —
  prefer the TE-controlled copy when obtainable (same policy as
  xr793/mikesservers mirrors).

### Owner directive — next payload

**Do not move to cooling.** Close remaining HV wiring holes first,
per the owner's 8-item follow-up ask (main traction fuse sizing,
contactor make/break duty, pre-charge resistor + relay selection,
35/50 mm² cable datasheets, matching connector datasheets,
bonding/grounding test methods, IP validation procedures) — recorded
in the Research Map.

---

## 19. Batch 12 + owner review_07 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_12_hv_wiring_datasheets.md`
and `docs/research/raw/owner_reviews/review_07_batch_12_verdict.md`.
Row additions: CS-26..CS-29, RC-46..RC-49.

### What batch 12 delivered (all candidates, nothing selected)

- **The real main-fuse lane** (CS-26/RC-46): Eaton EV fuse catalogue,
  500–1000 Vdc / 10–1600 A family — corrects batch_11's aux-as-traction
  mistake. Owner rule: **no fuse size is picked** until battery
  voltage, short-circuit current, continuous/peak currents, and
  thermal derating review exist.
- **Pre-charge NO-GO logic candidate** (RC-47): EV200 duty data — max
  make 650 A (weld prevention), 80–90% pre-charge completion before
  main-contactor close. Component-scoped.
- **35 mm² cable sheet** (CS-27/RC-48): the cleanest cable row so far;
  part-scoped rule/metric candidates (3×/6× OD, OD 14.4 mm,
  600 VAC/1000 VDC envelope).
- **First official-server standard** (CS-28/RC-49): UNECE GTR 20 —
  0.1 Ω bonding rationale at page 60, plus the ISO 20653 probe
  reference (CS-29 opened as the IP-validation path).

### Owner correction applied — pre-charge sizing overreach

Batch_12's matrix claimed pre-charge resistor sizing was covered by
"TE EV200 Capacitive Make Test Curves." **Rejected as stated**: the
curves define how much pre-charge is required, not the resistor.
Register state: pre-charge **completion target = CandidateRule**
(RC-47); pre-charge **resistor sizing = OpenGap** behind the owner's
7-item list (pack V, controller capacitance, target time, inrush
limit, resistor power/energy, relay rating, thermal duty).

### Held — unsourced matrix cells (same defect family as batch 11)

| Matrix cell | Problem | Disposition |
|---|---|---|
| "HV Cable 50 mm² Bend Radius: 3×/6× OD — Coroflex Multi-Gauge Specification" | **No 50 mm² datasheet exists on file**; cross-gauge transfer is exactly what the owner's hard rule forbids | HELD — 50 mm² row stays open until its sheet is produced |
| "HV Connector Compatibility: Amphenol Excel\|Mate MSD (400 A, 1500 Vdc)" | No URL, no quote, no datasheet | HELD — Amphenol recorded as a lead name only; connector row stays OpenGap |
| "Pre-Charge Relay Selection: 80–90% target — TE Kilovac Specification Suite" | Conflates completion target with relay selection; no relay datasheet | HELD — relay selection stays OpenGap |

### Threshold reconciliation flag (new standing item)

Two bonding/contact resistance figures now coexist: **GTR 20's
≤ 0.1 Ω chassis-bonding limit** (RC-49) and **FMVSS 305a's < 0.2 Ω
exposed-conductive-parts figure** (RC-42, owner-relayed). Different
regulations, different measurement contexts. Both stay
context-scoped candidates; the verification pass that extracts exact
FMVSS text must reconcile them explicitly. **Never merge them into
one "bonding number."**

### Owner's closed-vs-open accounting (authoritative)

Partially closed: 35 mm² cable + bend radius, EV200 contactor, Eaton
EV fuse family, bonding-resistance candidate, MSD/HVIL (Chilye),
isolation monitor (Sendyne).
Still open: battery V/I + short-circuit current; inverter currents;
main fuse exact part; pre-charge resistor sizing + relay selection;
50 mm² cable datasheet; HV connector compatibility;
grounding/bonding test procedure; IP67/IP6K9K exact procedure;
physical routing on truck.

### Next payload (owner's narrow 6-item ask — recorded in Research Map)

Pre-charge sizing formulas + datasheets; pre-charge relay datasheets;
50 mm² cable datasheet; connectors for 35/50 mm² shielded cable;
IP67/IP6K9K exact validation procedures; bonding/grounding test
procedure + measurement method. No repeats of already-sourced rows
except for compatibility comparison.

---

## 20. Batch 13 + owner review_08 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_13_hv_wiring_precharge_50mm.md`
and `docs/research/raw/owner_reviews/review_08_batch_13_verdict.md`.
Row additions: CS-30..CS-34, RC-50..RC-54. Of the owner's 6-item ask,
batch 13 delivered on 5 (pre-charge formulas, pre-charge relay, 50 mm²
cable, IP background, bonding measurement method) — **HV connectors
remain the only untouched item** (batch self-declared the gap).

### Owner corrections applied (7, per the review_08 paste-block)

1. **Status language reverted:** "Marked Closed" → *partially sourced /
   candidate identified*; "Candidate selection locked" → *candidate
   selected for evaluation*. Nothing closes before upstream data +
   engineer review.
2. **TE Mini K voltage flag:** owner-relayed TE specs (400 VDC
   contact / 450 VDC max switching / 12 VDC coil) mean this relay may
   not suit the final pack voltage — suitability check is an OpenGap
   on RC-51.
3. **Miba formulas** = CandidateRules; **resistor selection stays
   OpenGap** behind U, C, t, Imax, energy, pulse rating, duty cycle.
4. **50 mm² bend radii** part-scoped to that exact datasheet.
5. **TONFUL** = TechnicalBackground only; ISO 20653/lab procedure
   remains NeedsExactSource (CS-29 unchanged as the gate).
6. **Metrel** reclassified **InstrumentationCandidate /
   TestMethodCandidate** — measurement method, not regulatory source.
7. **Sendyne language:** batch_13's "100 Ω/V absolute defect boundary"
   REJECTED as phrasing — RC-38's fence stands (supplier-context
   hazard discussion; final threshold via FMVSS/ISO mapping).

### Owner "Create" items recorded

- CandidateRule: pre-charge calculation requires U, C, t, Imax, E
  (RC-50).
- OpenGaps: final pre-charge resistor part; pre-charge relay
  suitability above pack voltage; HV connector model for 35/50 mm²;
  physical route path; official IP67/IP6K9K procedure; official
  bonding/grounding threshold + test procedure.

### Conduct notes

- **Status-inflation language is now the dominant residual defect**
  ("Marked Closed", "selection locked", "absolute defect boundary") —
  fourth variant of packaging drift (splice → action-column →
  title/cell → status language). All caught; none entered the
  register.
- Coroflex 50 mm² sheet's own disclaimer ("shall not release you from
  your obligation to test…suitability") is recorded on RC-52 — the
  supplier itself demands application testing.
- Batch 13 correctly did not repeat already-sourced rows and
  self-declared the connector gap — instruction compliance improving.

### HV Wiring Package — remaining before build-ready (owner list)

Battery nominal/max V; battery cont./peak/short-circuit I; inverter
cont./peak DC I; DC-link capacitance; final main fuse part; final
pre-charge resistor part; final pre-charge relay part (voltage-
suitable); HV connector model for 35/50 mm²; physical route on the
F-450/F-550; bonding/grounding exact method; official IP procedure;
engineer review. Owner's stated options next: finish HV
connector/pre-charge details, or move to cooling with HV wiring held
in NeedsEngineeringReview.

---

## 21. Batch 14 + owner review_09 reconciliation (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_14_hv_wiring_blocked_state.md`
and `docs/research/raw/owner_reviews/review_09_batch_14_verdict.md`.
Row additions/updates: CS-35, RC-55 (new); RC-52 (OD + computed
envelopes).

### The connector ask closes at candidate level

Amphenol Excel|Mate HVBI (CS-35/RC-55) — **from the official Amphenol
server**, the first supplier document in this register not hosted on a
mirror. Owner's dual-candidate structure applied: 03R8 (180 A,
35–50 mm²) vs 05R10 (250 A, 50–70 mm²); **final choice blocked by
battery + inverter current** — a clean example of the register's core
principle: candidates parameterize the decision, upstream data makes
it. Bonus: HVBI's unique keying (30°/60°/90° color-coded) satisfies the
RC-39 J1673-style mis-mate concern at supplier level.

### Blocked-state conduct — the payload's real achievement

Batch_14's Balancing Form declares every upstream parameter `OPEN`,
every dependent part number `Halted`, and the validation state
`BLOCKED BY UPSTREAM DATA DEFICIENCIES` — refusing to calculate,
generate, or guess. Owner: "That is the right answer." Recorded as the
conduct benchmark for future payloads: **an empty form honestly
blocked beats a filled form dishonestly complete.**

### Corrections and regressions

| Item | Disposition |
|---|---|
| Metrel + TONFUL again labeled `RegulatoryCandidate` | **REGRESSION** — both were reclassified in review_08 (Instrumentation/TestMethod; TechnicalBackground). Re-corrected; register statuses unchanged. Second occurrence → these two rows added to the recurring-error watchlist (with the broad-incentive sentence from batches 1–2). |
| "Candidate selection locked" recurred | **REGRESSION** — re-corrected to "candidate selected for evaluation" (review_08 rule stands). |
| 50 mm² computed bend envelopes (47.4 / 94.8 mm) | **ACCEPTED as derived values** — first Hunter arithmetic admitted to the register: datasheet OD × datasheet multipliers, owner-verified, part-scoped. Precedent note: derived values are admissible ONLY when both inputs are datasheet-sourced and the arithmetic is owner/engineer-checked. |

### Owner's next step — HV Wiring Decision Matrix

Owner's prompt for the next payload: a 10-row decision matrix (cable
gauge, connector, main fuse, contactor, pre-charge resistor,
pre-charge relay, MSD, isolation monitor, bonding test, IP enclosure)
× 7 columns (required input, status, candidate source, blocker,
calculation needed, engineer review, Build Engine status) — **no final
selections, nothing Confirmed, show only what data is needed.**
Recorded in the Research Map. The owner's framing question stands
above all of it: *which battery pack and inverter is this being sized
around?* — an upstream business/engineering decision no research batch
can answer.

---

## 22. Batch 15 + owner review_10 — HV Wiring Package v0.1 (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_15_hv_wiring_decision_matrix.md`
and `docs/research/raw/owner_reviews/review_10_batch_15_verdict.md`.
**No new sources or claims** — the Decision Matrix references only
already-registered rows (CS-15/17/20/24/26/27/28/29/31/32/34/35 and
their RC rows). This section records the matrix's acceptance, the
corrections that bind any future consolidation of it, and the phase
pivot.

### Matrix accepted as candidate decision logic — v0.1

All 10 component rows correctly OPEN/Halted; every blocker matches the
register's OpenGaps; the closing question ("what battery pack and
inverter are we sizing this around?") is the right terminal state.
**Owner label adopted: HV Wiring Package v0.1 — candidate architecture
mapped, component families identified, open blockers documented, final
selection halted, engineering review required.**

### Corrections binding on any use of the matrix

| Matrix text | Corrected reading (owner review_10) |
|---|---|
| "decision rules are hard-coded" | **"decision logic is mapped"** — candidate logic until engineering review; nothing is final |
| "Candidate selection locked" *(3rd recurrence)* | "candidate selected for evaluation" — standing rule (review_08) |
| HV connector row: "peak **phase** demand" | **"DC link continuous and peak current demand"** — cable/connector/fuse/contactor live on the battery DC side; motor phase current ≠ DC input current. Technical correction; any consolidation of the matrix must carry it |
| Isolation monitor row: "the **hard** 100 Ω/V **danger boundary threshold**" *(2nd absolute-phrasing recurrence)* | RC-38 fence stands: supplier-context figure; final threshold via FMVSS 305a / ISO 6469-3 mapping + engineering review |

### Recurrence ledger (for the future mechanical checks at M10)

- "Candidate selection locked": 3 occurrences (batches 13, 14, 15).
- Sendyne absolute-threshold phrasing: 2 occurrences (13, 15).
- Metrel/TONFUL RegulatoryCandidate mislabel: 2 occurrences (13/14) —
  absent in batch 15's matrix (Metrel correctly under Bonding Test as
  instrument). Improvement noted.

### Phase pivot — L5 held, powertrain definition opens

Owner directive: stop broad HV wiring research. Next payloads define
the **upstream powertrain package** — candidate battery pack, inverter,
and motor datasheets for a Class 4/5 conversion, with the owner's
full extraction field lists (battery: 14 fields; inverter: 10; motor:
9) and outputs (candidate powertrain table, missing-datasheet list,
values-to-unlock mapping, per-value Build Engine status). This moves
the active research focus to lanes **L9 (supplier data) and L6
(battery/BMS/thermal)** while **L5 is held at v0.1 in
NeedsEngineeringReview**. What powertrain data unlocks, per owner:
cable gauge, connector rating, fuse family/rating, contactor
suitability, pre-charge resistor value, pre-charge relay suitability,
thermal/cooling load, range/gradeability simulation inputs.

---

## 23. Batch 16 + owner review_11 — powertrain candidates + compatibility blocker (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_16_powertrain_candidates.md`
and `docs/research/raw/owner_reviews/review_11_batch_16_verdict.md`.
Row additions: CS-36/37, RC-56..RC-58. **New blocker filed: B-003
(POWERTRAIN_COMPATIBILITY_REVIEW_REQUIRED)** — owner directive.

### The compatibility catch (owner P=V×I check)

Face-value candidate numbers don't close: Webasto VIB limits give
≤60 kW continuous / ≤100 kW peak at 400 V; the Dana target needs
130/250 kW (≈325/625 A at 400 V). RC-58 records the full arithmetic as
a **DerivedRiskFlag** — not a conclusion that the parts are wrong,
but a proof that **configuration must be established before any
component math runs** (pack count, 400 vs 800 V, VIB limit, parallel
arrangement, supplier-approved setup). This is the pipeline's first
system-level engineering catch — earlier catches were sourcing
discipline; this one is physics.

### New defect type: sourceless data matrix (5th variant)

Batch_16 delivered its entire numeric profile with **zero URLs and
zero quotes** — violating the standing "every claim must include
title, URL, exact quote, page/section" rule wholesale for the first
time. Disposition: CS-36/37 carry `MissingSourceLink`; every value in
RC-56/57 is `NeedsExactSource`; nothing from this batch can promote
until actual datasheets (or supplier emails) are archived. Defect
ledger: splice → action-column → title/cell → status-language →
**sourceless matrix**.

### Owner dispositions applied

- **Downgraded pending source proof:** 150/250 A VIB limits; 10 l/min
  and <50 mbar coolant figures; Dana DC input voltage; DC-link
  capacitance; "integrated pre-charge via S-Box"; J1939 register
  claims.
- **LegacyCandidate:** Webasto CV Standard data may describe a
  superseded product (Standard Battery Pro 40 successor: ~40 kWh,
  333–407 V, 297 kg, 400/800 V configs, up to 18 packs/720 kWh —
  owner-relayed, also unverified). Availability = supplier
  confirmation required.
- **Partially unlocked for HV wiring:** voltage-range lane, pack
  mass/dimensions, cooling lane, CAN/J1939 lane, cable/connector
  voltage class. **Still locked:** cable gauge, fuse rating, contactor
  suitability, pre-charge values, short-circuit protection, thermal
  derating — pending B-003 resolution.
- **Supplier outreach list recorded:** 10 Webasto + 10 Dana questions
  (verbatim in review_11) — the first concrete external-contact work
  package in the program. These are owner/business actions, not
  research actions.

### Conduct notes

- Batch_16 correctly held its own four OPEN fields (I_sc, DC-link C,
  DC bus currents, motor mass) and correctly framed Confirmed as a
  human-authority action. The failure was provenance, not honesty.
- Batch_16's "unlock" narrative (Part 3) treated the 150/250 A figures
  as the sizing basis — the owner's compatibility check shows why
  that's premature. Unlock claims from unverified inputs are now a
  watch item.

### Next payload (owner prompt): Powertrain Compatibility Check

Compare Webasto vs Dana candidates: 8 checks (current-vs-power both
ways, 400/800 V question, VIB limiting, pack count for target, legacy
status, missing values, supplier questions), P=V×I / I=P/V formulas,
outputs = compatibility table + mismatch warnings + missing data +
supplier questions + blocker list. **No selections, nothing
Confirmed.**

---

## 24. Batch 17 + owner review_12 — compatibility check corrected; B-004 filed (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_17_powertrain_compatibility_check.md`
and `docs/research/raw/owner_reviews/review_12_batch_17_verdict.md`.
Row additions: RC-59 (Pro 40/VIB/VIG figures — still sourceless),
RC-60 (owner-corrected architecture analysis). **B-004
INTERFACE_SELECTION_REQUIRED filed; B-003 extended with owner blockers
04–08.**

### The topology correction (owner) — supersedes batch_17's conclusion

Batch_17 concluded "minimum 3 packs" from simple power division. That
math only works for a 400 V parallel (1s3p) layout — **an 800 V
architecture requires series pairs (2sNp), so the practical minimum
becomes 4 packs (2s2p)**. RC-60 carries the owner's full corrected
ranking: 1s1p rejected; 1s3p/400 V risky (continuous near the VIB
380 A limit; peak ≈663 A EXCEEDS the VIB 580 A 30 s rating); 2s1p/800 V
likely underpowered (~110/224 kW); **2s2p/800 V strongest minimum
candidate**; 2s3p if weight/space allow. All lossless-ideal, all
pending supplier approval and engineering review. Batch_17's "800V
should be chosen" softened per owner to "appears more compatible…
requires supplier-approved series configuration."

### The interface catch — B-004

Batch_17 treated the VIB as the only battery interface. The owner
surfaced the **VIG / VIG Plus** (up to 18 packs, higher current
capability) — which could dissolve the entire current-bottleneck
analysis. Until the interface is supplier-confirmed with its datasheet
archived, **no battery-system current limit is accepted** (B-004
blocks B-003's resolution).

### Dispositions

- **RC-56 superseded in part:** batch_16's "150 A cont / 250 A peak
  system" figures now appear mislabeled; RC-59's 380/580 A VIB and
  55/112 kW per-pack figures replace them as the working candidates —
  all still `MissingSourceLink`/`NeedsExactSource` (2nd consecutive
  sourceless batch for Webasto/Dana numbers).
- **Production status:** batch_17 asserts "current production" for
  Pro 40 + SUMO MD — accepted as candidate only; the LegacyCandidate
  flag on CV-Standard-era data stands until supplier confirmation.
- **Low-voltage-at-load + efficiency blockers (06/07):** all existing
  current figures are nominal/full-charge ideal values; sizing at
  280–333 V floor with losses will be worse — recorded so no one
  sizes to the pretty numbers.
- **Supplier outreach updated:** batch_17's 3 technical questions
  (DC-link µF; Isc/impedance through VIB; pre-charge ownership —
  inverter firmware vs battery junction) + the owner's combined
  configuration question appended to the outreach package (now 24
  questions).
- **Unlock tracker accepted:** partially-unlocked lanes (voltage
  range, mass/dims, cooling, J1939, 1000 VDC insulation class)
  consistent with review_11; all five BLOCKED items remain blocked.

### Conduct notes

- Good: single-pack elimination is sound; mismatch warnings (VIB
  bottleneck, low-voltage current rise) are genuine engineering
  insight; OpenGaps honest; "Powertrain Sign-Off Filter" hand-off
  framing correct.
- Defects: **2nd consecutive sourceless payload** ("The VIB datasheet
  explicitly limits…" — which datasheet? no link); **engineering
  conclusions beyond inputs** ("3 packs minimum", "800V should be
  chosen") — new watch item: topology/architecture conclusions
  require the series/parallel constraint check the owner demonstrated.

---

## 25. Batch 18 + owner review_13 — supplier inquiry READY_TO_SEND (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_18_supplier_inquiry_draft.md`
and `docs/research/raw/owner_reviews/review_13_batch_18_verdict.md`.
Row addition: RC-61 (VIG/VIG Plus figures). **Canonical outreach
artifact created:**
`docs/research/outreach/SUPPLIER_INQUIRY_WEBASTO_01.md` — the owner's
9-question supplier-ready letter, status READY_TO_SEND.

### Owner softenings applied (commitment-language overreach — 6th defect flavor)

| Batch_18 text | Owner correction |
|---|---|
| "The **selected** traction drive is a Dana TM4 SUMO MD" | "**candidate** traction drive **under evaluation**" — nothing is selected |
| "does Webasto engineering **approve** a 2s2p 800V configuration" | "does Webasto have an **application-approved configuration or integration guideline**" — ask for their product limits, not vehicle responsibility |
| VIG "**eliminates hardware throttling** downstream" | VIG "**may reduce** the VIB current bottleneck, pending Webasto-approved pack topology and current limits" — VIG has limits too (RC-61 fence) |
| CAN ask: "register addresses" | Upgraded: **J1939 DBC file, CAN integration guide, PGN/SPN list, or NDA process** |

Defect-family note: commitment language ("selected", "approve",
"eliminates") is the outward-facing sibling of status inflation — it
tells a *supplier* decisions were made that weren't. Caught before
anything was sent. Ledger: splice → action-column → title/cell →
status-language → sourceless matrix → **commitment language**.

### What the letter gates (owner status block, recorded verbatim in the outreach file)

SupplierQuestionSet READY_TO_SEND; PowertrainCompatibility
BLOCKED_PENDING_SUPPLIER_REPLY (B-003); HVWiringCalculations HALTED;
PackTopology candidate 2s2p/800 V; InterfaceChoice OpenGap (B-004);
PreChargeResponsibility / Isc-FuseCoordination / CANIntegration /
CoolingManifold all OpenGap.

### Gate-closure correction (owner follow-up, review_14)

**The question set does not close the gate — supplier replies +
datasheets + engineering review do.** Gate label per owner:
`BLOCKED_PENDING_SUPPLIER_RESPONSE` (applied to B-003). The 16
required answer fields (8 Webasto / 8 Dana) are recorded in review_14
and mapped into the two outreach letters. Owner authorization: proceed
to **Cooling Package Gap Closure (Domain Priority Block 3)** in
parallel; no more HV wiring research — the blocker is manufacturer
data, not internet searching. Dana letter drafted by the filter from
the owner's field lists at
`docs/research/outreach/SUPPLIER_INQUIRY_DANA_01.md` — **status DRAFT,
awaiting owner approval of the wording** (only owner-approved text
gets READY_TO_SEND; only the owner sends).

### Process note — replies are evidence

Sending the letter is an **owner/business action** (external
communication — not performed by any agent without explicit owner
instruction). When a reply arrives: archive it 1:1 under
`docs/research/raw/supplier_replies/`, then reconcile — a supplier
email is the first evidence class that can begin resolving B-003/B-004
and converting RC-56/57/59/61 from MissingSourceLink to sourced
candidates. Unlock-dependency map (batch_18 Part 2) accepted with the
VIG row corrected per above.

---

## 26. Batch 19 + owner review_15 — Cooling Package Gate v0.1 (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_19_cooling_package_framework.md`
and `docs/research/raw/owner_reviews/review_15_batch_19_verdict.md`.
Row additions: CS-38, RC-62..RC-65. **Owner label adopted: Cooling
Package Gate v0.1 — architecture mapped, source metrics partially
identified, calculations halted, supplier thermal maps required.**
No pump/radiator/chiller may be picked.

### Status-inflation escalation — "Validated" REJECTED

Batch_19's tracker marked two unconfirmed supplier metrics
**"Validated / RuleInput"** — the first use of "Validated" in any
payload, on values with no archived source. Owner replacement labels
applied verbatim: battery flow → SupplierMetricCandidate /
NeedsEngineeringReview; inverter/motor flow → DanaGuideMetricCandidate
/ NeedsModelSpecificConfirmation; 65 °C inlet → NeedsOfficialDanaSource
/ NeedsEngineeringReview; combined heat load → OpenGap/HardBlocked;
pump/radiator/chiller → OpenGap/Halted. Recurrence ledger: this is the
status-inflation family's most serious instance — "Validated" is a
term the future Build Engine must RESERVE for evidence-backed states;
flagged for the M10 controlled-vocabulary check.

### Owner corrections 1–5 applied

1. Battery 25–35 °C "optimal" range →
   **ThermalTargetAssumption / NeedsSupplierConfirmation** (public
   spec says −30…+55 °C operating; 25 °C reference for power figures).
2. "10 l/min × N packs" → **hydraulic assumption**; total flow depends
   on the Webasto-approved manifold layout (series/parallel, hose
   diameter, pump curve, branch balancing, air bleeding, uniformity).
3. 65 °C max inlet → NeedsOfficialDanaSource (reseller-tier until Dana
   states it directly).
4. **Heat load ≠ output** (RC-65): cooling sizes to LOSSES from
   battery/inverter/motor/DC-DC/charger/wiring, from efficiency maps —
   the ~6.4 kW best-case figure is a fenced illustration only.
5. TONFUL stays TechnicalBackground; ISO 20653 → NeedsExactSource /
   **LabProcedureRequired** (owner-relayed IPX9K test conditions —
   80 °C ±5, 80–100 bar, 14–16 l/min, 100–150 mm, multiple angles —
   recorded as background, not procedure).

### Other dispositions

- Pump names (Pierburg CWA400, Davies Craig EWP150) = **lead names
  only** — no datasheets, no rows.
- "CO200" inverter designation appears in batch_19 without source —
  unverified model reference, flag for the Dana letter.
- Thermal question sets (9 Webasto + 10 Dana, owner-authored) →
  appended as thermal addenda to the two outreach letters.
- Batch_19's Cajon Pass framing corrected per owner but the *scenario*
  is accepted as the canonical high-ambient sustained-grade design
  case for L6/L8 (6–8% grade at GVWR, sustained output, derating
  overlap between battery throttling and inverter derating — the
  overlap curve is the unmapped rule input).

### Conduct notes

- Structure praised (correct loop separation; no premature component
  picks; honest cross-dependency on the pending powertrain gate).
- Defects: "Validated" labels (escalation, rejected); sourceless
  metrics (3rd consecutive powertrain/cooling batch); an unverified
  model designation (CO200).

---

## 27. Owner follow-up review_16 — the research-vs-supplier lane doctrine (2026-07-15)

Raw source:
`docs/research/raw/owner_reviews/review_16_batch_19_followup.md`.
Standing doctrine, applied repo-wide:

### The lane split

- **Academic/scientific research** → understands, estimates,
  simulates, designs the framework. Permitted statuses:
  `EngineeringBackground`, `AcademicPrincipleCandidate`,
  `ModelingFramework`, `NeedsSupplierData`,
  `NeedsPhysicalVerification`. Forbidden statuses: `Confirmed`,
  `FinalRule`, `BuildReady`. **Academic sources may create modeling
  logic; they can never close a gate.**
- **Supplier data** → finalizes real components, ratings, limits, test
  thresholds. The 13 supplier-only closure items (review_16): battery
  I_sc, internal resistance, current-limit maps, thermal derating map,
  approved pack topology, VIB-vs-VIG limits, inverter DC-link
  capacitance, DC input current limits, motor/inverter heat-rejection
  maps, pre-charge responsibility, CAN/J1939 documentation, coolant
  flow/pressure-drop curves, warranty/approved-integration
  requirements.

### Gate label unified

HV wiring + powertrain + cooling gates →
**BLOCKED_PENDING_SUPPLIER_DATA** (B-003/B-004 updated) with the
owner's allowed/not-allowed work lists. Research, modeling, decision
matrices, test plans, failure modes, supplier comparison, and
packaging study continue; final selections and any compliance/safety
claim wait.

### Roadmap + next batch

Gates 4–11 recorded in the Research Map (brake/steering → CAN/PATS →
mounting/enclosure → weight/axle/CG → failure modes/tests →
measurement/3D scan → second-source comparison → business/fleet
readiness). Next expected batch: the 10-topic modeling-frameworks
payload; impact vocabulary restricted to
Model/Test/OpenGap/NominalAssumption; every row must name the supplier
data still needed.

### Follow-up cadence

7 days after each letter is sent, follow up; weekly thereafter.
Cadence recorded in both outreach files; a repository-side 7-day
reminder is scheduled (checks send status and prompts follow-up).

---

## 28. Batch 20 + owner review_17 — Cooling Modeling Framework v0.1 (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_20_cooling_modeling_frameworks.md`
and `docs/research/raw/owner_reviews/review_17_batch_20_verdict.md`.
Row additions: CS-39..CS-45, RC-66..RC-73. **Owner label adopted:
Cooling Modeling Framework v0.1 — ModelingFrameworkCandidate; not
validated, not locked, not component-selection-ready; supplier data
still required.** First batch under the review_16 lane doctrine, and
it holds: the register gained a modeling **brain** while every gate
stayed BLOCKED_PENDING_SUPPLIER_DATA.

### Owner's 7 filter tasks — applied

1. **"Validated baselines" language rejected** — the payload's header
   ("validated academic, mathematical, and laboratory baselines")
   downgraded to *candidate modeling references*. This is a
   status-inflation instance in prose form; "validated" joins
   "Validated" (batch_19) on the RESERVED-vocabulary list for M10.
2. **Blank exact-quote fields → NeedsExactQuote.** Several rows list
   "Exact Quote:" with an equation but no verbatim source sentence.
   The `NeedsExactQuote` flag is set repo-wide: **no modeling row
   becomes a SourceClaim without a verbatim quote + page/section**
   (RC-66..73 carry equations as principles, not as verified quotes).
3. **Reddit (CS-44/RC-72) → LeadOnly / NotForRuleCreation.**
4. **Towing article (CS-43/RC-71) → FieldContext / NeedsBetterSource**
   — proves load hurts range; the mountain-grade *model* comes from
   tractive-power equations in a real engineering source.
5. **Thermal-runaway row reclassified (CS-42/RC-70):** the two-state
   paper supports **anomaly detection / heat-generation estimation**,
   NOT thermal-runaway containment. Containment = OpenGap needing
   UL/SAE/NFPA + supplier propagation/venting/enclosure data.
6. **Gate 04 corrected — vacuum pump → hydroboost/EHPS** (F-450/F-550
   are hydraulic-assist, not vacuum). Recorded in the Research Map
   roadmap.
7. **Gate 05 corrected — "PATS bypass/override" → authorized
   Ford-compatible controls integration, immobilizer-safe
   architecture, cluster/CAN diagnostics.** **Standing terminology
   rule: the Build Engine never frames anti-theft work as "bypass."**
   This is the most important correction in the batch — a security-
   framing error that could misrepresent the project's intent.

### Accepted vs downgraded vs rejected (owner-requested output)

- **Accepted modeling references:** Bernardi (RC-66), MathWorks loss +
  ε-NTU (RC-67/68), Darcy-Weisbach (RC-69), two-state thermal (RC-70),
  TOP 2-2-607 test (RC-73). Equations allowed for simulation **as
  modeling logic only** — none may size a real component.
- **Downgraded:** towing article → FieldContext; tractive model →
  NeedsBetterSource; thermal-runaway → anomaly detection.
- **Rejected for rule creation:** Reddit (LeadOnly). Personal-site and
  vendor-article hosting (CS-39/CS-41) noted as modest provenance —
  fine for principles, not for values.
- **Supplier data still required (unchanged, 13 items — §27):** every
  RC-66..73 row names its own NeedsSupplierData/PhysicalVerification.
- **OpenGap list:** thermal-runaway containment design; a proper
  mountain-grade tractive model source; serial-vs-parallel textbook/SAE
  source; verbatim quotes for the equation rows (NeedsExactQuote).

### What this unlocks (owner)

Permission to build MODELING MODULES (design-time, not M10 production):
battery heat-generation estimator, cooling-loop flow calculator,
pressure-drop calculator, radiator sizing estimator, mountain-grade
thermal stress simulator, thermal derating risk model, cooling
validation test-plan generator. **These are framework specs, not code
— no production code during the ingestion phase; they wait for M10 and
supplier data to run on real numbers.**

### Conduct notes

- The batch correctly stayed in the modeling lane and did not select
  components — the review_16 doctrine took hold on the first batch.
- Defects: "validated" prose inflation; blank exact-quote fields
  (structural — NeedsExactQuote); two low-provenance hosts; and two
  roadmap errors (vacuum pump; "PATS bypass") that were downstream
  roadmap text, not cooling claims, but corrected now so they can't
  propagate into Gates 04/05.

---

## 29. Batch 21 + owner review_18 — Brake/Steering Gate v0.1 (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_21_brake_steering_gate04.md`
and `docs/research/raw/owner_reviews/review_18_batch_21_verdict.md`.
Row additions: CS-46..CS-50, RC-74..RC-78. **Owner label adopted:
Brake/Steering Gate v0.1 — hydraulic dependency identified,
vacuum-pump path rejected, EHPS path opened, Ford-specific data still
missing.** First physical-safety critical path (CP#1).

### What batch 21 got right

- **Vacuum-pump path rejected** as the wrong assist type for
  F-450/F-550 (hydroboost, hydraulic) — the Gate 04 correction from
  review_17 took hold.
- **The combined-demand NoGo** (RC-74, owner's "biggest win"): size
  the EHPS for simultaneous brake + steering, never steering alone.
- Correct architecture coverage: dependency chains, accumulator
  reserve, loss-of-assist failure mode, the ~60–100 A EHPS load →
  DC-DC upsizing linkage.

### Owner's 7 filter corrections applied

1. Generic hydroboost instructions (CS-46) → EngineeringBackground /
   NeedsFordExactSource / NotForFinalRule.
2. Hydrosteer (CS-47) → ModelingFramework / NeedsFordExactSource.
3. Hang Tight / Dodge EHPS (CS-48) → LeadOnly /
   SupplierCandidatePath / NeedsDatasheet.
4. **TOP 2-2-607 reclassified** — it is a COOLING doc; batch_21
   mis-cited it as the brake/steering AND FMVSS source. Rejected for
   Gate 04; TestContextBackground only (CS-45 note added). **This is a
   self-citation error: the batch cited a source for something the
   source does not cover.**
5. **FMVSS 105 added as the primary brake regulation lane** (CS-49) —
   hydraulic + electric service brakes, normal + emergency
   performance; locator pending (B-002).
6. **PATS language re-corrected** — see escalation below.
7. OpenGaps created (Ford pump pressure, Ford pump flow, hydroboost
   accumulator capacity, steering-gear requirements, EHPS
   pressure-flow-current curves, DC-DC load, FMVSS 105 test mapping).

### PATS-language RECURRENCE — escalation

Batch_21's Gate 05 roadmap said: *"Developing digital bypass
frameworks for the Ford Passive Anti-Theft System (PATS)…"* — the
**exact "bypass" framing corrected one batch earlier (review_17,
standing terminology rule).** Re-corrected to authorized
Ford-compatible controls integration / immobilizer-safe architecture /
serviceability / diagnostic compatibility.

**This is the first correction to recur across consecutive batches
after being made a standing rule** — and it is the highest-stakes one
(security-defeat framing). Recorded as the leading candidate for the
M10 mechanical guardrail: a **forbidden-phrase scanner** (blocklist:
"bypass", "override", "defeat" applied to anti-theft/PATS/immobilizer
contexts; plus the "Validated"/"validated" reserved-vocabulary check
from batch_19/20). Human review has caught it twice; a string check
should catch it the third time. Proposed for the D-004 hash-era M10
tooling — owner decision to formalize.

### Gate 04 v0.1 — still open

Missing before closure (owner list): Ford F-450/F-550 factory pump
pressure + flow; stock hydroboost operating pressure; steering-gear
pressure/flow; relief-valve pressure; return/reservoir; accumulator
reserve capacity; manual steering torque without assist; candidate
EHPS pressure-flow-current curve; EHPS duty cycle + thermal derating;
required DC-DC output; FMVSS 105 brake-test mapping; loaded low-speed
steering test procedure. Next payload (owner prompt): Ford-specific +
supplier-specific only — generic hydroboost is EngineeringBackground,
Dodge/Mopar is LeadOnly-until-datasheet, no FMVSS-compliance claim, no
PATS-bypass language.

---

## 30. Batch 22 + owner review_19 — Brake/Steering Gate v0.2 (2026-07-15)

Raw sources:
`docs/research/raw/research_hunter/batch_22_brake_steering_ehps_pumps.md`
and `docs/research/raw/owner_reviews/review_19_batch_22_verdict.md`.
Row additions: CS-51/52, RC-79..81. **Owner label adopted:
Brake/Steering Gate v0.2 — architecture problem proven; replacement
system NOT yet proven.**

### PATS recurrence did NOT repeat — the standing rule held

Batch_22's Gate 05 roadmap reads "CAN Bus Integration & Digital
Cluster Interface Gate" with **no bypass/override language.** After the
review_18 escalation, the correction held on the very next batch.
Recorded as evidence the terminology rule works when carried in the
handoff — though the M10 forbidden-phrase scanner proposal stands
(human vigilance caught it twice; automation should be the backstop).

### First Ford-adjacent numbers — held at the right altitude

Three pressure/flow data points now on file, none a verified Ford OEM
value: generic hydroboost minimum 2 GPM/1200 psi (RC-75); Ford-**style**
1750 psi/3.25 GPM (RC-79); medium-duty 2683 psi/6.30 GPM (RC-80). The
Lee page's own admission ("Ford used many pressure/flow settings")
is the reason RC-79 stays SupplierBackground, not an OEM spec.

### Owner corrections applied

- Lee (CS-51/RC-79) → SupplierBackground / Ford-StyleComponentCandidate
  / NeedsFordExactSource — not "the native Ford Super Duty
  specification."
- HotRods hydroboost (CS-46) → EngineeringBackground /
  HydroboostPrincipleCandidate / NeedsFordExactSource (unchanged).
- TRW (CS-52/RC-80) → **HydraulicPumpCandidate /
  NeedsElectricMotorDriveData** — a pump *end*, not a complete EHPS.
- "will not bottleneck or overheat" → **NeedsEngineeringReview**
  (softened to: hydraulic capacity is *evaluable*, suitability depends
  on motor drive/duty/plumbing/reservoir/fluid temp/Ford req).
- **Promoted:** vacuum-pump rejection = RuleCandidate; simultaneous
  brake+steering demand = NoGoConditionCandidate (RC-74, reaffirmed);
  DC-DC load impact = OpenGap/RuleInput (RC-81).

### The Gate 04 → Gate 01 loop-back (important)

RC-81 records that brake/steering is no longer purely hydraulic — an
EHPS at ~2–3.5 kW is a 160–290 A event on a 12 V bus, which feeds back
into DC-DC converter sizing and 12 V buffering. Note: the batch cited
"SAE J134 baseline" for the kW figure **without a verified quote** —
the kW/amp numbers are engineering estimates (fenced), not sourced
values; a real EHPS datasheet closes them.

### Gate 04 v0.2 — still blocked

Exact Ford F-450/F-550 pump curve; Ford steering-gear requirement;
hydroboost accumulator reserve; a COMPLETE EHPS motor+controller
dataset (voltage, cont./peak current, flow & pressure curves, relief,
duty cycle, thermal derating, control method, reservoir, fluid, ports,
faults, mounting, medium-duty suitability); DC-DC sizing; FMVSS 105
test mapping; loaded low-speed steering test. Next payload (owner
prompt): **complete EHPS systems** — hydraulic-pump-only data is
explicitly not enough.


---

## 31. Batch 23 + owner review_20 — Brake/Steering Gate v0.4 (complete EHPS candidate) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_23_ehps_complete_candidates.md`
and `docs/research/raw/owner_reviews/review_20_batch_23_verdict.md`.
Row additions: CS-53, CS-54; RC-82..RC-87. **Owner label adopted:
Brake/Steering Gate v0.4 — the architecture is strong and a *complete*
EHPS candidate now exists, but the replacement system is NOT proven and
final selection is halted.** (Owner numbered the gate v0.4, up from the
v0.2 of batch_22; label applied verbatim.)

### What advanced

- **First complete EHPS candidate on file (CS-53 / RC-82):** the ZF
  Race Engineering EPHS MPU 100-C — a self-contained motor+pump+reservoir
  unit, 5–12 L/min (1.32–3.17 GPM), 113–124.5 bar (~1639–1806 psi),
  2500–6000 rpm, −40…+120 °C. This is a genuine step past batch_22's
  hydraulic-pump-only rows: it is in the same general hydraulic range as
  the Ford-style hydroboost target (3.25 GPM / 1750 psi).

### Owner corrections — applied verbatim

1. **Biggest correction — the ZF "CAN control" claim is refuted by its
   own source (RC-83).** The batch said "6000 RPM CAN control" and "DTCs
   broadcast over CAN," but the ZF factsheet states **"No connection to
   the CAN bus required."** Control mode, fault outputs, and diagnostics
   are therefore **NeedsSupplierData** — do not ask ZF for a DBC/CAN map
   unless a different controller variant with CAN diagnostics is
   confirmed. (Recorded as a Hunter defect-catch: source-contradicting
   claim.)
2. **ZF is a motorsport pump, not proven commercial-duty (RC-84).** The
   ZF document positions this as an **EPHS motorsport** steering pump,
   not a Class 4/5 commercial-truck hydroboost unit → status
   **MotorsportSupplierCandidate / NeedsCommercialDutyReview**; the
   "designed for commercial vehicle validation" framing is removed.
   Full ZF status: **CompleteEHPSCandidate / MotorsportSupplierCandidate
   / NeedsCommercialDutyReview / NeedsHydroboostCompatibilityReview /
   NeedsCurrentMap / NeedsThermalDeratingData.**
3. **Lee is still not final Ford proof.** The Lee CII-HB re-cite
   (existing CS-51 / RC-79) is reaffirmed as a **FordStyleHydroboost
   PumpReference / SupplierBackground / NeedsFordExactSource** — the
   1750 psi / 3.25 GPM value is a strong Ford-**style** benchmark, not
   the verified 2020–2026 F-450/F-550 factory requirement (the page
   itself says Ford used many pressure/flow settings). No new CS row;
   the owner's added label "FordStyleHydroboostPumpReference" is recorded
   against CS-51.
4. **Power/current numbers are estimates only (RC-85).** The ~2.5–3.3 kW
   / ~250–300 A warning is directionally right and important, but it is
   **EngineeringEstimate / NeedsZFCurrentMap** — the batch is even
   internally inconsistent (90–110 A in item 1 vs 275–300 A in Part 2).
   **The Build Engine must not size the DC-DC converter from this
   estimate alone** (feeds the RC-81 DC-DC OpenGap).
5. **FMVSS 105 test-map scope expanded (RC-87).** FMVSS 105 stays the
   primary brake-testing lane, but the test map must cover **partial-
   failure behavior, fade/recovery, water recovery, stability/control
   during braking, parking brake, and warning-lamp requirements** — not
   just stopping distance. Exact 49 CFR 571.105 locators still needed.
6. **Ford return-line hose (CS-54 / RC-86)** is a **FordProductReference
   / NeedsFordExactSource** — it corroborates the ~1750 psi system-
   pressure envelope for hydroboost/commercial use, but it is a hose
   spec, **not** the OEM pump pressure/flow curve; its batch "Exact
   Quote" is garbled → **NeedsExactQuote** before any use.

### Gate 04 v0.4 — corrected state (owner verbatim)

- **Known:** vacuum-pump path rejected; hydroboost + steering share the
  hydraulic supply; EHPS is the correct replacement lane; the ZF EPHS
  MPU 100-C is a promising complete EHPS candidate; the 12 V electrical
  load may be severe.
- **Not proven:** that ZF can support F-450/F-550 hydroboost + steering
  simultaneously; that ZF survives commercial-duty high-load cycles;
  that Lee's 1750 psi / 3.25 GPM is the exact 2020–2026 F-450/F-550
  factory value; that DC-DC sizing is final; that the FMVSS 105 test
  plan is mapped.

### Owner action items recorded (not agent actions)

- **ZF supplier packet drafted:** the owner supplied a 10-question ZF
  inquiry (current-vs-pressure/flow, continuous + peak current + peak
  duration, duty cycle at 12 L/min & 124.5 bar, thermal derating curve,
  hydroboost+steering suitability, simultaneous panic-brake + low-speed
  lock, reservoir/hose/port/fluid, fault/diagnostic outputs given
  "no CAN required," and fuse/relay/wiring/supply sizing). Captured as
  a **DRAFT** outreach letter `SUPPLIER_INQUIRY_ZF_01.md`, awaiting
  owner approval before sending (sending is an owner action).
- **Next research (owner):** FMVSS 105 brake test mapping and the loaded
  low-speed steering test procedure, while the ZF/Ford/Lee supplier
  questions wait.

### Standing checks

- PATS "bypass/override" language did **not** appear in batch_23
  (Gate 05 roadmap remains clean — second consecutive clean batch).
- Nothing ingested; nothing marked Confirmed; no compliance claimed;
  ODRs untouched.

---

## 32. Batch 24 + owner review_21 — Gate 04 v0.4 supplier-inquiry prep + regression catch (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_24_ehps_supplier_inquiry_prep.md`
and `docs/research/raw/owner_reviews/review_21_batch_24_verdict.md`.
**Row additions: none — no new sources.** The batch re-cited ZF (CS-53)
and Lee (CS-51) and prepared two supplier-inquiry packets. Its value to
the register is (a) a **defect recurrence** the filter must catch and
(b) two owner-issued **gate-state transitions**.

### Regression caught (owner review_21)

The payload **re-asserted two claims already corrected one batch
earlier** in review_20:

1. **"Delivers up to 3.17 GPM at 1,805 PSI via 6,000 RPM CAN control"** —
   the ZF factsheet says **"No connection to the CAN bus required."** The
   ZF supplier packet in the same payload also again demanded a **`.dbc`
   CAN database file** (Q9). Both re-corrected: ZF control/fault output
   details are **NeedsSupplierData**; do not claim CAN control, DBC
   files, or CAN diagnostics from this factsheet. (RC-83 updated with the
   recurrence marker.)
2. **"Designed for commercial vehicle validation"** (duty-cycle field) —
   ZF is a **motorsport** EPHS pump, not a proven Class 4/5 commercial
   hydroboost unit. Re-corrected to **MotorsportSupplierCandidate /
   NeedsCommercialDutyReview**. (RC-84 updated with the recurrence
   marker.)

This is the **second corrected-claim recurrence pattern** in the project
(the first was the PATS "bypass" language, batches 20→21). Both are now
recorded as the leading use-cases for the proposed **M10 forbidden-
phrase + corrected-claim regression scanner** (owner formalization still
pending): a mechanical check that flags when a claim the owner has
already downgraded/corrected reappears in a later batch at its old
altitude.

Unchanged owner corrections re-affirmed: Lee CS-51 =
**FordStyleHydroboostPumpReference / SupplierBackground /
NeedsFordExactSource** (not the final F-450/F-550 value); the
~2.5–3.3 kW / ~250–300 A figure stays **EngineeringEstimate /
NeedsZFCurrentMap** — *do not hard-code 250–300 A* until ZF supplies a
current-vs-pressure map (RC-85); FMVSS 105 stays the brake-testing lane
but needs a brake engineer / test plan before any compliance claim
(RC-87).

### Gate-state transitions (owner review_21)

- **Gate 04 status flags set:** `CANDIDATE_EHPS_FOUND`,
  `FINAL_SELECTION_HALTED`, `BLOCKED_PENDING_SUPPLIER_RESPONSE`. The
  gate stays at **v0.4** (no version bump this batch); the candidate
  path is found but unproven, and the gate now formally waits on the ZF
  and Ford/Lee supplier answers.
- **New sub-gate opened — Gate 04B:** *FMVSS 105 Brake Test Mapping +
  Loaded Low-Speed Steering Test Procedure.* This is the **next research
  target** — owner instruction: **"the next research should not be more
  generic hydroboost"**; it should be supplier confirmation plus
  brake/steering validation testing.

### Outreach status

- **ZF packet:** already drafted as
  `docs/research/outreach/SUPPLIER_INQUIRY_ZF_01.md` (review_20) — the
  batch's ZF questions mirror it; the one divergence is the batch's Q9
  DBC demand, which the drafted letter correctly avoids (asks what
  diagnostic/warning outputs exist given "no CAN required"). No change
  needed to the ZF draft.
- **Ford/Lee/steering-specialist packet:** newly drafted as
  `docs/research/outreach/SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`
  (DRAFT, awaiting owner approval) from the owner's 5-question Ford/Lee
  template (factory pump flow-vs-RPM + relief, steering-gear flow/
  pressure demand at max GAWR, hydroboost panic-brake displacement,
  return-line backpressure limit, accumulator internal volume + N₂
  pre-charge). Sending remains an owner action.

### Standing checks

- PATS "bypass/override" language did **not** appear in batch_24.
- Nothing ingested; nothing marked Confirmed; no compliance claimed;
  ODRs untouched.

---

## 33. Batch 25 + owner review_22 — Gate 04B/04C/05/06 first pass (parallel research) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_25_gate04b_04c_05_06_testplan.md`
and `docs/research/raw/owner_reviews/review_22_batch_25_verdict.md`.
Row additions: CS-55..CS-59; RC-88..RC-98. **First "do-not-wait"
payload** (directive_01) — it covers four gates at once (04B, 04C, 05,
06) with supplier-only values parked, and it is the first batch since the
park-and-proceed rule.

### Regression finally resolved

The ZF "6000 RPM CAN control" line — caught in review_20 and again in
review_21 (RC-83/RC-84) — is **corrected in the payload itself** this
time (Part 2 reads "no active CAN connection is required," control/fault
= NeedsSupplierData). The corrected-claim recurrence is closed for ZF;
the regression-scanner proposal stands for future catches.

### Owner's 5 corrections — applied verbatim

1. **Follow-up dates must be real, not "Q3 2026."** The Hunter's own
   ledger used a vague quarter; the standing cadence is **7 days (first
   follow-up) → 14 days (second) → 21 days (escalate / contact the
   distributor or engineering rep)**. Applied to
   `docs/status/BLOCKED_QUESTIONS_LEDGER.md`.
2. **FMVSS 105 is regulatory, not just modeling (CS-55 / RC-88/89).**
   Status **RegulatoryTestSource / NeedsBrakeEngineerMapping.** The exact
   **400 ft / 150 lb** inoperative-assist figure must **not** be
   hard-coded until the specific 49 CFR §571.105 table row is parsed and
   matched to the vehicle category / GVWR / brake condition. (The cited
   copy is the harmonized Transport Canada TSD 105 Rev 6 — useful, but US
   application confirms against the CFR text.)
3. **Gate 04C vendor sources downgraded (CS-57/58, RC-92/93).** BenchForce
   and FS1Inc → **TechnicalBackground / LeadOnly / NotForFinalRule**; they
   may not create low-voltage safety rules. The **real Gate 04C anchor is
   the Ford General BBLB electrical-load rule** (RC-91): load analysis
   before adding loads, respect OEM fused-circuit limits, don't overload
   BCM outputs, feed high-demand circuits directly from the 12 V battery /
   an added battery through relays.
4. **Scribd downgraded (CS-59, RC-95/98).** The 2026 Super Duty BBLB via
   Scribd is **CandidateSourcePath / NeedsOfficialFordCopy** — page-number
   aid only; prefer the official Ford Pro Upfitter / BBAS / NHTSA-hosted
   copy (CS-05) before any claim is treated as OEM.
5. **Gate 05 framing (RC-94).** Not "clearing dashboard lights" — frame it
   as **authorized serviceable integration that preserves diagnostics,
   warning lamps, ABS/stability behavior, and scan-tool visibility.** The
   Ford General BBLB is explicit: do **not** modify OEM PCM wiring, do
   **not** alter the ignition circuit, and stop-lamp switch splices can
   interfere with the PCM, speed control, and ABS.

### Provenance defect caught

The three "Ford General BBLB" rows (RC-91/94/96/97) were cited by the
batch via `static.nhtsa.gov/odi/inv/2024/INRD-PE24023-21075.pdf` — an
**NHTSA ODI investigation PDF, not the Body Builder Layout Book**
(title/URL mismatch, same failure class as the batch_02 row-4 mismatch).
All four are anchored to the real General BBLB (CS-07) and flagged
**NeedsOfficialFordCopy / NeedsExactQuote**; the frame rule (RC-97)
refines the existing RC-22 (same 1.5 in / 0.75 in limits). Nothing from
this source may become a rule until the official BBLB page is obtained
and parsed.

### Gate-state flags (owner review_22)

- **Gate 04 — Brake / Steering:** `BLOCKED_PENDING_SUPPLIER_RESPONSE`;
  continue 04B + 04C research. (Hunter self-labeled "v0.5"; owner's clean
  status uses the flag set below, so **no version bump adopted** — no new
  proof landed.)
- **Gate 04B — Brake Test Mapping:** `REGULATORY_TEST_SOURCE_FOUND` /
  `NEEDS_BRAKE_ENGINEER_MAPPING`.
- **Gate 04C — Low-Voltage Architecture:** `OEM_ELECTRICAL_RULE_SOURCE_FOUND`
  / `DC_DC_SIZING_OPEN`.
- **Gate 05 — CAN / Controls:** `STARTED` /
  `NEEDS_OFFICIAL_FORD_SUPER_DUTY_SOURCE` / **NO SECURITY-BYPASS LANGUAGE**.
- **Gate 06 — Mechanical Mounting:** `OFFICIAL_FRAME_RULE_CANDIDATES_FOUND`
  / `NEEDS_PLATFORM_SPECIFIC_CONFIRMATION` / `NEEDS_STRUCTURAL_ENGINEER_REVIEW`.

### Next

Owner: **do Gate 07 next — Weight / Axle Load / Center of Gravity**
(prove the truck carries the battery weight without exceeding GVWR /
front+rear GAWR / payload / tire+wheel rating / CG limits; physical scale
ticket overrides estimates; all estimates NominalAssumption until
measured). Verbatim prompt added to `GATE_RESEARCH_QUEUE.md`. Gates
04B/04C/05/06 got a first pass and stay open with the follow-ups above.

### Standing checks

- PATS "bypass/override" language did **not** appear in batch_25; Gate 05
  framing corrected pre-emptively.
- Nothing ingested; nothing marked Confirmed; no compliance claimed; no
  "vehicle is safe" statement; ODRs untouched.

---

## 34. Batch 26 + owner review_23 — Gate 07 v0.1 (Weight / Axle Load / CG) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_26_gate07_weight_axle_cg.md`
and `docs/research/raw/owner_reviews/review_23_batch_26_verdict.md`.
Row additions: CS-60, CS-61; RC-99..RC-102. **Owner label adopted:
Gate 07 — Weight / Axle Load / CG v0.1 — properly structured around the
right truth source (door label + scale tickets + component mass ledger),
not closed.**

### What is strong (owner)

The truth hierarchy is correct: **certified physical scale data overrides
estimates; the VIN door-label GVWR/GAWR overrides generic online values;
GVWR / front GAWR / rear GAWR / tire / wheel ratings are hard no-go
boundaries.** The Ford General BBLB definitions anchor it (RC-102): GAWR
= a single axle's rated capacity, GVWR = the vehicle's rated loaded
weight — so the actual door label is the governing input.

### Big correction — 6.7L diesel vs 7.3L gas (platform split)

The Hunter's ledger referenced a **6.7L Power Stroke V8 + 10R140**, but
the active donor direction is the **7.3L gas** chassis cab. Split the
platform and **do not mix diesel engine/trans weight or CG into the gas
model unless the donor truck is actually diesel** (recorded as **D-006**):

- **Platform 001A — F-450/F-550 7.3L gas** (the active build direction).
- **Platform 001B — F-450/F-550 6.7L diesel** (separate; only if the
  donor is diesel).

### Source corrections (owner)

1. **Scribd 2026 BBLB (CS-59, RC-99)** → **CandidateSourcePath /
   NeedsOfficialFordCopy** — page-number aid only; prefer the Ford Pro
   Upfitter / BBAS official copy.
2. **RC Lacy dealer page (CS-61, RC-101)** → **FleetBackground /
   DoorLabelReminder / NotForFinalRule** — orientation only; not the
   source of truth for a specific donor.
3. **Work Truck / NTEA method (CS-60, RC-100)** → **ModelingFramework
   Candidate / AxleMomentMethod / NeedsPhysicalMeasurements** — a good
   axle-moment modeling method, simulation-only until scale tickets
   verify.

### Ledger corrections (owner)

- **Real follow-up dates** for the Gate 07 blocked questions: **first
  Jul 17, 2026 · second Jul 24, 2026 · escalation Jul 31, 2026** (not
  "Q3 2026"). Applied to the Blocked Questions Ledger (BQ-13/BQ-14).
- **Factory engine/trans CG height is NOT supplier-only:**
  **NominalAssumption allowed for simulation; physical removed-component
  weighing required before final layout; supplier data preferred, not
  mandatory** to keep research moving. (Demoted from the Hunter's
  NeedsSupplierData.)

### Gate 07 split into three sub-gates (owner)

- **Gate 07A — Door Label + Baseline Scale Ticket** (the real first
  closure step): capture VIN, wheelbase, cab config, GVWR, front/rear
  GAWR, tire size/load rating, wheel rating, and baseline front/rear/
  total curb weights.
- **Gate 07B — Removed / Added Mass Ledger** (next research target):
  removed (engine, transmission, fuel tank/fuel, exhaust/aftertreatment,
  radiator/cooling, DEF if diesel, accessories) vs added (battery packs,
  enclosures, brackets, motor/inverter, HV cables, coolant loops,
  radiator/chiller, EHPS pump, DC-DC converter).
- **Gate 07C — Axle Moment Calculator** (RC-100): simulation-only until
  physical scale tickets verify.

### Structural tie-in (owner)

Any battery-enclosure mounting plan must link Gate 07 weight results back
into the **Gate 06 frame rules (RC-97/RC-22)**: use existing holes where
possible; no top/bottom flange drilling; web holes ≥38 mm / 1.5 in from
the flange; max added hole 19 mm / 0.75 in.

### Gate 07 v0.1 — still blocked (owner)

Actual donor VIN/door label; baseline scale ticket; removed component
weights; added component weights; final battery placement coordinates;
post-build scale ticket; tire/wheel/suspension load check.

### Next

Owner: **do Gate 07B next — the Removed / Added Mass Ledger + scale-ticket
procedure** (verbatim prompt in `GATE_RESEARCH_QUEUE.md`). Hard rules:
physical scale values override estimates; estimates are NominalAssumption
only; final validation requires certified front-axle, rear-axle, and
total scale tickets.

### Standing checks

- No supplier value invented; the GVWR bands are a range, not the donor
  door-label value; the axle-moment method is a framework, not numbers.
- Nothing ingested; nothing marked Confirmed; no weight condition marked
  safe; no compliance claim; ODRs untouched.

---

## 35. Batch 27 + owner review_24 — Gate 07B v0.2 (Removed / Added Mass Ledger) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_27_gate07b_mass_ledger.md`
and `docs/research/raw/owner_reviews/review_24_batch_27_verdict.md`.
Row additions: RC-103..RC-106 (no new CS — all anchored to the Ford
General BBLB, CS-07). **Deliverable: the living
`docs/status/MASS_LEDGER.md`** (RM-01..06 removed tracker, AM-01..05
added tracker, 3-phase scale procedure, operating-state cases, release
gate). Owner label: **Gate 07B — Removed / Added Mass Ledger v0.2.**

### What is strong (owner)

The workflow moved from "estimated truck weight" to a real mass ledger +
scale-ticket process: certified scale tickets + door label override
generic specs; estimates are NominalAssumption only; every part carries a
measurement method, data class, axle-moment relationship, and
verification status — "how you keep the system from lying to itself." The
three-phase scale process (baseline → stripped → final) gives real
before/after evidence.

### D-006 recurrence — gas vs diesel (again)

The ledger was **again built on the 6.7L diesel** (DEF + DPF/SCR), one
gate after D-006 established the donor is **7.3L gas**. The received
removal ledger (RM-01..06) is therefore tagged **Platform 001B (diesel)**
in `MASS_LEDGER.md`, and the **Platform 001A (gas) removal ledger is
flagged OUTSTANDING** (gas engine/exhaust/cooling/fuel weights; no
DEF/DPF). **Third corrected-claim recurrence pattern** in the project
(PATS batches 20→21; ZF-CAN/duty 20→21→resolved; now gas/diesel 26→27) —
another data point for the M10 regression-scanner proposal.

### Owner's 5 corrections — applied

1. **Split gas vs diesel** (above; D-006) — do not mix the diesel removal
   ledger into the gas model.
2. **"Three-pad" is wrong (RC-103).** The diagram shows two axle pads.
   Use a **certified axle scale (front + rear + total)** minimum and
   **four-corner (LF/RF/LR/RR)** preferred; BBLB: front = LF+RF, rear =
   LR+RR.
3. **Add left/right balance (RC-104).** LF/RF/LR/RR wheel loads +
   transverse-CG estimate + side-to-side balance warning (BBLB transverse
   CG from four-corner + track widths).
4. **Real milestone dates.** Physical captures keyed to **pre-teardown
   (before first wrench) / mid-build (before final bracket welding) /
   final (before road test)**; supplier items 7/14/21-day cadence.
   Applied to the mass ledger + BQ-15.
5. **Operating-state payload/passenger cases (RC-105).** Judge loaded,
   not curb-only: curb EV + driver/passenger + tools + fleet payload +
   body/upfit + coolant/washer full + LV battery + spare. BBLB FMVSS 105
   passenger load = **500 lb for >10,000 lb GVWR**.

### New release-gate rule (RC-106)

**No road test until:** final front-axle ≤ front GAWR; rear ≤ rear GAWR;
total ≤ GVWR; each tire/wheel ≤ rated; side-to-side reviewed; scale
ticket archived; engineering signoff complete. A NoGoCondition / release
gate — **not** a safety claim.

### Gate 07B v0.2 — still blocked

Donor VIN/door label; baseline, stripped, and final scale tickets;
four-corner data; actual removed weights (per platform); actual added
weights; final battery-enclosure CG (X/Y/Z); tire/wheel/suspension load
check. (BQ-13..15 hold the supplier-preferred items.)

### Next

Owner: **Gate 07C — Axle Moment Calculator + CG Calculation Method**
(verbatim prompt in `GATE_RESEARCH_QUEUE.md`): front/rear axle-moment
equations, four-corner method, longitudinal + transverse + vertical CG,
tilt-table/lift CG-height method, removed/added mass modeling,
GVWR/GAWR/tire/wheel overload flags, and the CG→FMVSS-105/stability link
— with allowed equations, required/blocked input fields, nominal
assumptions, physical-verification steps, and pass/block logic.

### Standing checks

- No weight is a donor-truck value; all RM/AM figures are
  NominalAssumption placeholders; four-corner + CG numbers await physical
  measurement.
- Nothing ingested; nothing marked Confirmed; no weight marked safe; no
  compliance claim; ODRs untouched.

---

## 36. Batch 28 + owner review_25 — Gate 07C v0.3 (Axle Moment + CG Calculator) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_28_gate07c_axle_moment_cg.md`
and `docs/research/raw/owner_reviews/review_25_batch_28_verdict.md`.
Row additions: CS-62; RC-107..RC-112. **Deliverable: the living
`docs/status/AXLE_CG_CALCULATOR.md`.** Owner label: **Gate 07C — Axle
Moment / CG Calculator v0.3 — a good calculator architecture, NOT a
verified CG system; calculation-ready, not road-test-ready.**

### What is strongest (owner)

The donor split is now honored **in the payload** — the removed-ICE mass
profiles carry **both** branches (001A gas: engine ~540 lb, exhaust
~65 lb; 001B diesel: engine ~1,100 lb, DPF/SCR ~180 lb, DEF ~70 lb, all
NominalAssumption). **The D-006 gas/diesel recurrence is resolved
in-payload** (the gas figures now populate the 001A removal set in
`MASS_LEDGER.md`). Four-corner scale data (LF/RF/LR/RR) is required, per
the Ford BBLB axle/CG definitions.

### Owner's corrections — applied

1. **Explicit equations filled in (RC-107/108):** W, F, R, CGh=(R×WB)/W,
   component ΔR/ΔF (removed = negative w), and the corrected transverse
   CGt=[(RF−LF)·Tf/2+(RR−LR)·Tr/2]/W (right +/left −; DRW rear track to
   the wheel-pair center). Simulation-only.
2. **Vertical CG stays BLOCKED (RC-109):** the rear-lift method must
   follow an **approved CG-height test procedure** (Ford Transit
   BEMM/BBAS), certified facility / qualified technician; "raise ≥10 in"
   is a candidate setup, not a rule.
3. **IVM CGv Min/Max, not one threshold (RC-110):** replace the generic
   `Factory_Maximum_Allowable_Height_Threshold` with the Ford IVM
   statement-of-conformity **Min/Max CGv equations** (function of CGh +
   WB; CGv must fall between for all loading conditions) — else
   `NEEDS_IVM_OR_ENGINEERING_REVIEW`.
4. **Honest status labels (RC-112):** `Final_Safety_Compliance_Status` →
   **`Weight_CG_Gate_Status`**; `OPERATIONAL_ALPHA` →
   **`NOMINAL_CALCULATION_PASS / PHYSICAL_VERIFICATION_REQUIRED`**. **The
   Build Engine must not claim compliance.**
5. **500 lb is the FMVSS-105 lightly-loaded allowance (RC-111):**
   unloaded + 500 lb for >10,000 lb GVWR (incl. driver + instrumentation)
   — a **RegulatoryTestInput / NeedsVehicleCategoryMapping**, not a
   universal fleet payload (refines RC-105); the ~2,500 lb fleet-payload
   figure is a separate placeholder.

### Pass/block logic (RC-112, recorded in the calculator)

BLOCK on GVWR/GAWR/tire-wheel overload, missing door-label or final scale
ticket, or missing/violated IVM CGv. WARNING on >5% side imbalance, low
front-axle %, NominalAssumption battery location, or axle-only (no
four-corner) data. ALLOW SIMULATION ONLY when all values are estimates /
no scale ticket / CGv approximated → `NOMINAL_CALCULATION_PASS /
PHYSICAL_VERIFICATION_REQUIRED`.

### Gate 07C v0.3 — still blocked

Actual donor door label; wheelbase + track measurements; baseline +
final four-corner scale tickets; official IVM CGv equations; vertical-CG
physical test; final battery-enclosure CG. (BQ-16/17 hold the
supplier/official-method items.)

### Next

Owner: **Gate 08 — Failure Modes + Test Procedures** (HV, powertrain,
cooling, brake/steering, and weight gates are now all structured with
blockers). Verbatim prompt to be supplied; queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- No CG or weight value is verified; the equations are simulation
  frameworks; vertical CG and IVM limits are OpenGaps.
- Nothing ingested; nothing marked Confirmed; no compliance claim; no
  "vehicle is safe"; ODRs untouched.

---

## 37. Batch 29 + owner review_26 — Gate 07C v0.4 refinement + two recurrences (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_29_gate07c_v04_refinement.md`
and `docs/research/raw/owner_reviews/review_26_batch_29_verdict.md`.
Row additions: RC-113, RC-114 (no new CS). The Hunter re-delivered the
Gate 07C calculator with the **explicit equations now shown** (W/F/R, CGh,
ΔR/ΔF, transverse CGt). Owner label: **Gate 07C v0.4 —
CALCULATOR_FRAMEWORK_READY / PHYSICAL_DATA_REQUIRED /
NO_ROAD_TEST_CLEARANCE** (RC-114).

### Two recurrences caught

The payload re-introduced two items corrected one batch earlier
(review_25):

1. **`Final_Safety_Compliance_Status` / `OPERATIONAL_ALPHA`** — the
   compliance-language the owner already renamed to `Weight_CG_Gate_Status`
   / `NOMINAL_CALCULATION_PASS / PHYSICAL_VERIFICATION_REQUIRED` (RC-112,
   recurrence marker added).
2. **`IF CG_v > Max_Allowable_Height → BLOCK`** — the naive single-threshold
   vertical-CG check the owner already replaced with the Ford IVM Min/Max
   CGv equations (RC-110, recurrence marker added).

Both re-corrected; the deliverable `AXLE_CG_CALCULATOR.md` already holds
the honest labels and the IVM logic, so **nothing regressed in the
register** — only the incoming payload did. These join the PATS,
ZF-CAN/duty, and gas/diesel recurrences as data points for the proposed
M10 corrected-claim regression scanner (now four distinct recurring
items).

### Genuine refinements (owner)

1. **Track widths are not supplier-only (RC-113).** Tf/Tr can come from
   the official Ford BBLB/BBAS, physical measurement, or the door/VIN
   config → **NeedsOfficialFordSource OR PhysicalMeasurement** (BQ-18),
   not NeedsSupplierData.
2. **Regen/ABS/ESC dynamic fault-injection belongs in Gate 08, not 07C.**
   Moved to the Blocked Questions Ledger under Gate 08 (BQ-19); Gate 07C
   stays focused on weight, axle load, CG, tire/wheel loading, and
   physical scale proof.

### Calculator updates

`AXLE_CG_CALCULATOR.md` bumped to v0.4: park-status flags added; the
pass/block WARNING list gained "diesel/gas branch mismatch" and the
SIMULATION-ONLY list gained "generic track widths"; the recurrence note
records that the honest labels + IVM logic are held.

### Roadmap (owner-confirmed)

Gate 07C → **Gate 08 (Failure Modes + Test Procedures)** → Gate 05 deep
dive → Gate 06 deep dive → Gate 09 (3D scan) → Gate 10 (supplier
second-source) → Gate 11 (fleet readiness).

### Standing checks

- Gate 07C proves neither safety nor compliance; road-test clearance stays
  blocked (RC-106) pending physical scale + IVM CG review.
- Nothing ingested; nothing marked Confirmed; no compliance claim; ODRs
  untouched.

---

## 38. Batch 30 + owner review_27 — Gate 08 v0.1 transition (Failure Modes + Test Procedures) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_30_gate08_failure_modes.md`
and `docs/research/raw/owner_reviews/review_27_batch_30_verdict.md`.
Row additions: RC-115..RC-119 (no new CS). **Deliverable: the living
`docs/status/FMEA_REGISTRY.md`.** Owner label: **Gate 08 —
FMEA_FRAMEWORK_STARTED** (started, not open); Gate 07C parked
(CALCULATOR_FRAMEWORK_READY / PHYSICAL_SCALE_DATA_REQUIRED /
VERTICAL_CG_TEST_REQUIRED / NO_ROAD_TEST_CLEARANCE — RC-114).

### Two safety-critical defects caught (owner review_27)

1. **Fabricated 200 ms HVIL limit (RC-116).** The payload's
   `IF HVIL_LOOP_INTERRUPT_TIMING > 200 → BLOCK` invents a disconnect-
   latency threshold with no source → **`NeedsExactSource`**. This is the
   Constitution's core prohibition (never invent engineering values); the
   filter fenced it. FMVSS 305a is the HV-safety lane but no numeric HVIL
   threshold may be derived from it without exact text/test mapping.
2. **Unsafe live-HV fault-test wording (RC-117).** "Manually trigger a LV
   circuit opening at an inverter service plug" and "force a total inverter
   shutdown during low-speed closed-track" are **not** early physical
   steps. Replaced with staged testing: **Stage 1 bench/HIL (LV mock) →
   Stage 2 component test HV-isolated → Stage 3 supervised integrated test
   only after engineering safety plan + LOTO + PPE + test boundary +
   emergency shutdown**. Simulation pass ≠ physical pass; HIL pass ≠
   road-test approval.

### Other corrections (owner)

- **Weight/CG checks belong to Gate 07C, not Gate 08 (RC-119).** The
  payload's CHECK 1 (weight validation) and CHECK 2 (vertical-CG gate) are
  07C checks; Gate 08 references them as **prerequisites** only.
- **Regen/ABS/ESC test staging (RC-118):** simulation → HIL → dyno/
  wheel-lift → closed-course → loaded only after brake-engineer review.
- **`GATE_08_OPEN` → `FMEA_FRAMEWORK_STARTED`** (RC-119) — Gate 08 is not
  cleared.
- **Gate 08 must be a proper FMEA registry (RC-115):** subsystem, failure
  event, cause, hazard, detection, response, driver warning, test method,
  proof artifact, pass/block, source, verification status.

### Positive notes

- Track-width sourcing correction from review_26 **held** (Ford Pro / OR
  physical measurement, not supplier-only) — BQ-18.
- The equation core (W/F/R, CGh, CGt, ΔR/ΔF) is now clean and parked with
  the Gate 07C calculator.
- No compliance-label recurrence in the Gate 08 status this batch (the
  Hunter used `GATE_08_OPEN`, corrected to `FMEA_FRAMEWORK_STARTED`).

### Next

Owner supplied the **15-failure-mode FMEA prompt** (HVIL open, isolation
fault, contactor weld, pre-charge failure, battery overcurrent, inverter
shutdown during regen, ABS/ESC × regen loss, EHPS pump failure, brake-
assist pressure loss, steering-assist pressure loss, LV DC-DC brownout,
coolant-pump failure, battery/inverter/motor overtemperature, CAN loss,
water intrusion / IP seal failure), each with the full FMEA columns. Hard
rules: **no live HV tests; nothing Confirmed; no compliance claim; no
invented timing thresholds.** Verbatim prompt in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- The 200 ms limit is fenced, never a rule; all timing limits stay
  NeedsExactSource; no live-HV or track testing approved.
- Nothing ingested; nothing marked Confirmed; no compliance claim; ODRs
  untouched.

---

## 39. Batch 31 + owner review_28 — Gate 08 FMEA registry (15 modes) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_31_gate08_fmea_registry.md`
and `docs/research/raw/owner_reviews/review_28_batch_31_verdict.md`.
Row additions: RC-120..RC-126 (no new CS). **Deliverable: the populated
`docs/status/FMEA_REGISTRY.md` (15 modes).** Owner: "the best Gate 08
structure so far" — the right format (failure mode → trigger → hazard →
detection → response → warning → test method → proof artifact →
pass/block → missing data). Status relabelled (RC-126):
**FMEA_REGISTRY_CREATED / TEST_SEQUENCE_MAPPED / SUPPLIER_DATA_REQUIRED /
NO_LIVE_HV_TESTING_APPROVED / NO_TRACK_TESTING_APPROVED /
NO_COMPLIANCE_CLAIMS.**

### What held (no recurrence)

- **The 200 ms HVIL limit did NOT return** — HVIL timing stayed
  `NeedsExactTimingSource` (the review_27 correction held).
- The staged test ladder (sim → HIL → bench/dyno → low-speed
  closed-course) and the LOTO/PPE/engineering-signoff mandate held.

### Owner's 6 corrections — applied

1. **Invented dashboard messages → `DriverWarningCandidate /
   NeedsControlsIntegration`** (RC-121) — draft UI only, not Ford-confirmed.
2. **Isolation Riso thresholds → `RegulatoryReferenceCandidate /
   NeedsSystemContext / NeedsSupplierBMSMapping`** (RC-122) — 100 Ω/V DC /
   500 Ω/V AC are reference lanes, split by context, not one universal
   threshold (echoes the batch_10 500 Ω/V correction).
3. **HVIL timing stays `NeedsExactTimingSource / NeedsSupplierFirmwareData`**
   — no number without a supplier/standard.
4. **FM-09 subsystem = Auxiliary HYDRAULIC Brake Assist**, not
   "pneumatic/hydraulic" (RC-123) — hydroboost is hydraulic.
5. **FM-06 regen-loss response reworded** (RC-124) — "friction braking
   remains available… without destabilizing brake balance," NOT
   "seamless blend."
6. **FMVSS 105 stays a test-mapping lane** (RC-125) —
   `FMVSS_105_TEST_MAPPING_REQUIRED / BrakeEngineerReviewRequired`, never
   "compliance satisfied."

Stronger BLOCK/WARNING/SIMULATION-ONLY pass/block logic added to the
registry (RC-126).

### Next

Owner: **Gate 08B — source-backed test-procedure mapping** (verbatim
prompt in `GATE_RESEARCH_QUEUE.md`): for each of the 15 modes, the best
source + exact quote + test stage + required equipment + proof artifact +
pass/block candidate + missing supplier data + verification status. Hard
rules unchanged (no live HV; nothing Confirmed; no compliance; no invented
timing thresholds). After Gate 08B → Gate 05 CAN/Controls deep dive.

### Standing checks

- Every FMEA row is a candidate; all timing/threshold values
  `NeedsExactSource`; no live-HV or track testing approved; no compliance
  claimed.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 40. Batch 32 + owner review_29 — Gate 08B source-backed test-procedure mapping (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_32_gate08b_test_procedure_mapping.md`
and `docs/research/raw/owner_reviews/review_29_batch_32_verdict.md`.
Row additions: RC-127..RC-132 (no new CS — the mapped standards are
candidate leads at `NeedsExactQuote`, not verified sources). Recorded in
`docs/status/FMEA_REGISTRY.md` (new Gate 08B section). Owner: "the
structure is excellent — the issue is source authority, not the
workflow."

### The big correction — "Exact Quote" is not verified (RC-127)

The Hunter gave a "best source" + "exact quote" for each of the 15 modes,
but the quoted standard language is a **paraphrase**, not verified text.
Standing rule: any standard quote stored without the official PDF in hand
is a **`Claim Summary / NeedsExactQuote / NeedsPageSectionTable`** —
upgrade to `ExactQuoteVerified` only after the official (often paid)
standard is obtained and the exact page/section/table is cited. No
standard quote is a final rule until then.

### The other big correction — "COMPLETED" rejected (RC-132)

The payload marked Gate 08B **COMPLETED**. Owner rejected it: Gate 08B is
**`SOURCE_CANDIDATES_MAPPED / NOT_FINAL / NEEDS_EXACT_QUOTES /
NEEDS_PAGE_SECTION_TABLE / NEEDS_SUPPLIER_THRESHOLDS / NO_LIVE_HV /
NO_TRACK / NO_COMPLIANCE`**; **Gate 08C = NOT STARTED**. **08B is parked,
not closed — move to Gate 05 in parallel** while waiting on exact
standards, supplier data, and engineering review.

### Wrong/weak source matches downgraded (RC-129)

- **EHPS → ISO 5010** (earth-moving machinery) = **NeedsBetterSource** —
  better = Ford steering + ZF EHPS data + hydroboost specialist. Failure
  mode correct, source wrong.
- **Coolant pump → IEC 60529 / ISO 16750-4** (environmental) =
  **NeedsThermalSupplierData** — better = pump datasheet + thermal
  derating + controller diagnostic + flow-sensor data.
- **Regen → ISO 26262-4** = **FunctionalSafetyFrameworkCandidate** — a
  functional-safety framework, not a brake test; needs brake-engineer
  mapping + torque-decay data + VCU safety concept + dyno plan.
- **ABS/ESC → ECE R13-H** = **ContextCheckNeeded** — passenger-car
  braking; Class 4/5 needs FMVSS 105 + heavy-vehicle review. FM-07
  response reworded (RC-130).
- **Steering → SAE J2672** = **NeedsExactStandardVerification**.

### Held / strong (owner)

- Isolation Riso context-split held (100 Ω/V DC / 500 Ω/V AC =
  RegulatoryReferenceCandidate; BMS threshold NeedsSupplierData).
- FMVSS 105 (brake assist) = one of the strongest rows
  (RegulatoryTestLane / NeedsBrakeEngineerMapping).
- ISO 16750-2 (LV brownout) = StrongTestFrameworkCandidate.
- ISO 20653 (water/IP) = StrongSourceLane — but **pressure-decay ≠
  IP67/IP69K cert** (ProductionScreenCandidate / NeedsCorrelationToIPTest,
  RC-131).
- The test ladder (sim → HIL → bench/dyno → low-speed closed-course) and
  the no-live-HV mandate held.

### Next

Owner: **move to Gate 05 — CAN / Controls deep dive in parallel** (08B
stays parked). Gate 05 prompt already queued in `GATE_RESEARCH_QUEUE.md`
(review_22, authorized Ford-compatible integration, NEVER "PATS bypass").

### Standing checks

- No standard quote is verified; every Gate 08B row is a
  SourceCandidate/NeedsExactQuote/NeedsSupplierData; nothing "Completed."
- Nothing ingested; nothing marked Confirmed; no compliance claim; no
  live-HV/track testing; ODRs untouched.

---

## 41. Batch 33 + owner review_30 — Gate 08C draft validation + Gate 05 initiation (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_33_gate08c_draft_validation_gate05_init.md`
and `docs/research/raw/owner_reviews/review_30_batch_33_verdict.md`.
Row additions: RC-133..RC-137 (no new CS). **Deliverables:
`docs/status/DRAFT_VALIDATION_08C.md` (Gate 08C sweep engine) and
`docs/status/GATE05_CONTROLS.md` (Gate 05 authorized-controls).** The
owner directive: keep building Gate 08C logic with placeholders (the logic
can be **built** without supplier data; it can only be **approved** with
it) and start Gate 05 in parallel.

### Correction 1 — placeholders have no gate authority (RC-133/134/135)

The payload's `IF SIM_PARAM_HVIL_DELAY_MS <= 50.0 ms → PASS` made 50 ms
act like a real boundary. Under the strict rules a nominal value **cannot
create a PASS/BLOCK** → `ASSUMPTION_STRESS_RESULT_ONLY / GATE_AUTHORITY =
NONE / PHYSICAL_TEST_CLEARANCE = BLOCKED`. The numeric fields are
reformatted as **sweep inputs** (Default null + Exploratory values +
Authority none + Upgrade Required), and the engine reports **Simulation
Sweep Result (stable / unstable / needs-review / missing-source /
supplier-data-required)** instead of PASS/BLOCK. PASS/BLOCK is reserved
for `SupplierConfirmed` / `PhysicallyVerified`. Gate 08C status =
`DRAFT_VALIDATION_STARTED / SIMULATION_ONLY /
PLACEHOLDER_VALUES_ALLOWED_FOR_STRESS_TESTING /
NO_PLACEHOLDER_PASS_BLOCK_AUTHORITY / SUPPLIER_DATA_PENDING /
NO_PHYSICAL_TEST_CLEARANCE / NO_COMPLIANCE_CLAIMS`.

### Correction 2 — Gate 05 safety framing (RC-136/137)

The batch's ledger row "Ford proprietary CAN DBC arbitration IDs via a
**Vehicle Reverse Engineering Group** / signal **sniffing**" is a
security-framing hazard — the same class as the standing PATS-bypass
prohibition. Corrected to the **authorized, listen-only** lane: authorized
Ford-compatible integration, listen-only capture, public/authorized
J1939/OBD-II, upfitter docs, supplier DBC files. **BLOCKED: proprietary-
DBC assumptions, anti-theft bypass, fake/spoofed ABS/ESC messages,
transmitting onto factory Ford safety buses without approval.** The DBC-ID
row → **NeedsAuthorizedSource** (BQ-25). The candidate network topology +
4-channel matrix are recorded as **ListenOnlyCandidate / NeedsAuthorized
Source** (no Ford-side ID/rate verified; diagnostic slots are for
listening, not injecting).

### Gate 05 started (parallel)

Gate 05 = **STARTED / AUTHORIZED_CONTROLS_CAN_DEEP_DIVE**, running in
parallel with the Gate 08C sweep engine and the parked Gate 08B. Gate 08C
tells us *what* signals/faults matter; Gate 05 maps *how* they move
through VCU/BMS/inverter/ABS-ESC/cluster/service tools.

### Standing checks

- No placeholder value has pass/block authority; no compliance/physical
  clearance from nominal values; Gate 05 stays authorized/listen-only —
  no bypass, no spoofing factory safety buses.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 42. Batch 34 + owner review_31 — Gate 08C sweep cleanup + Gate 05 signal candidates (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_34_gate08c_sweep_gate05_signals.md`
and `docs/research/raw/owner_reviews/review_31_batch_34_verdict.md`.
Row additions: RC-138..RC-142 (no new CS). Owner: "much cleaner — you
fixed the biggest issue: placeholders are simulation-sweep inputs, not
pass/block authority." Two deliverables updated:
`docs/status/DRAFT_VALIDATION_08C.md` (Gate 08C) and
`docs/status/GATE05_CONTROLS.md` (Gate 05).

### Gate 08C — wording cleanup (RC-138/139)

The sweep-result vocabulary "stable/unstable" still read as an engineering
approval → replaced with **Simulation Response Category: `Model Accepts` /
`Model Needs Review` / `Model Stress Failure` / `Supplier Data Required`**,
each carrying **`No Gate Authority`** (e.g. "[100 ms]: Model Stress
Failure / No Gate Authority"). Status → `DRAFT_VALIDATION_STARTED /
SIMULATION_SWEEP_ACTIVE / PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY /
SUPPLIER_THRESHOLDS_REQUIRED / NO_PHYSICAL_TEST_CLEARANCE /
NO_COMPLIANCE_CLAIMS`. The no-placeholder-authority rule (RC-133) held.

### Gate 05 — biggest correction: Ford signals are candidates (RC-140/141)

The Hunter listed specific Ford PGNs/byte-maps (PGN 61444 engine speed,
61443 accel-pedal, 65265 wheel speed, UIM ignition-key byte, CAN_1 500 k
J1939) as if usable. They are **candidates only** →
**`J1939SignalCandidate / NeedsOfficialFordUIMSource / ListenOnlyCandidate
/ NoTransmitAuthority`** until official Ford/UIM docs prove the exact
mapping. Ford Pro's upfit-integration J1939 path makes the *research
direction* reasonable, but no PGN/byte/rate is confirmed. **Accel-pedal
correction (RC-141):** "scaled directly into the EV inverter torque loop"
→ the pedal may only **inform** a VCU torque-demand model; final torque
needs pedal-plausibility + brake-override + fault-handling +
controls-engineer review. Never drive inverter torque directly from an
unverified Ford signal.

### Gate 05 — transmit rule + VCU boundary + labels (RC-142)

**Transmit stays BLOCKED** until Ford/UIM docs allow the exact message /
bus / address / use case. **VCU boundary:** read authorized signals;
command **only conversion-side** unless Ford permits; **factory safety
modules remain authoritative** for ABS/ESC/brake. Labels: `STARTED /
LISTEN_ONLY_RESEARCH / AUTHORIZED_CHANNELS_ONLY /
NO_FACTORY_SAFETY_BUS_TRANSMIT / NO_IMMOBILIZER_OR_SECURITY_BYPASS /
NO_PROPRIETARY_DBC_ASSUMPTIONS`. The listen-only doctrine (RC-136) held.

### Next

Owner: **Gate 05A — Source-Backed Signal Registry** (per signal: name,
source document, bus/channel, protocol, PGN/ID, byte/bit, direction
[listen-only/receive/transmit], allowed use, blocked use, verification
status, proof artifact). First task: find official Ford UIM / BBAS /
J1939 documentation. Verbatim prompt in `GATE_RESEARCH_QUEUE.md`. Gate 08C
sweeps continue in parallel.

### Standing checks

- No placeholder value has gate authority; no Ford PGN/byte/rate is
  confirmed; transmit onto factory safety buses stays blocked; no
  bypass/spoofing.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 43. Batch 35 + owner review_32 — Gate 08C parked + Gate 05A signal registry (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_35_gate08c_parked_gate05a_signal_registry.md`
and `docs/research/raw/owner_reviews/review_32_batch_35_verdict.md`.
Row additions: RC-143..RC-147 (no new CS). Owner: "one of the cleanest
versions so far." Deliverables: `docs/status/DRAFT_VALIDATION_08C.md`
(parked) and the new `docs/status/GATE05A_SIGNAL_REGISTRY.md`.

### Gate 08C — parked (RC-143)

The sweep matrix is clean (Simulation Response Category applied, no gate
authority). Parked: **`SIMULATION_SWEEP_MATRIX_CREATED` /
`PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY` / `SUPPLIER_THRESHOLDS_REQUIRED`
/ `NO_PHYSICAL_TEST_CLEARANCE` / `NO_COMPLIANCE_CLAIMS` /
`PARKED_FOR_SUPPLIER_DATA`** — "done enough to keep moving." One more
tightening: **"Model Accepts" → "Within Draft Stress Envelope / No Gate
Authority"** so it is never read as approval.

### Gate 05A — signal registry started (RC-144/145/146/147)

The 6-signal registry is structured correctly; the corrections are about
**source authority and control safety**:

- **DBC reality (RC-144):** Ford may not give a clean proprietary DBC →
  Ford factory systems = **AuthorizedSourcePending / ListenOnlyCandidate /
  NoTransmitAuthority**; EV-side DBCs (BMS/inverter/VCU/DC-DC/charger) are
  realistic + owned. "Authorized Ford UIM/J1939 documentation" unlocks a
  **listen-only registry + receive-only VCU state awareness + authorized
  upfitter mapping**, not "custom VCU transmit configs"; transmit stays
  blocked (RC-142).
- **Signal labels (RC-145):** the public J1939 rows (S1 wheel-speed
  PGN 65215, S2 accel-pedal 61443, S3 brake-switch 61441, S4 ignition) are
  **Public/Standard J1939 Candidate / UnverifiedStage / NeedsExactStandardText
  / NeedsVehicleCapture / Listen-Only / No control authority** — they may
  *inform* the VCU model but not command torque/braking/pre-charge/safety
  until proven. EV-side S5 (inverter, CAN_2) and S6 (BMS SOC, CAN_3) are
  owned isolated loops.
- **Use restrictions (RC-146):** accel-pedal Allowed = compare
  driver-demand trend **in simulation**; Blocked = direct inverter torque
  command / physical torque arbitration / road-test torque control.
  brake-switch Allowed = **simulation-only** regen-decay study; Blocked =
  physical regen disable / braking validation / safety control without a
  confirmed source + debounce + brake-engineer review.
- **Status (RC-147):** `SIGNAL_REGISTRY_STARTED / LISTEN_ONLY_RESEARCH /
  UNVERIFIED_STAGE / NO_ACTIVE_TRANSMISSIONS / NO_FACTORY_SAFETY_BUS_CONTROL`.

### Next

Owner: **Gate 05B — Controls Dependency Map** — map Ford-side signals
needed, EV-side signals needed, VCU decisions, driver warnings, fault
states, what is receive-only, what is transmit-only on the EV side, and
what is completely blocked. Queued in `GATE_RESEARCH_QUEUE.md`. Gate 08C
stays parked; Gate 05 continues.

### Standing checks

- No placeholder value has gate authority; no Ford signal is confirmed;
  transmit onto factory buses stays blocked; unverified Ford signals are
  never torque/brake authority.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 44. Batch 36 + owner review_33 — Gate 05B Controls Dependency Map (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_36_gate05b_controls_dependency_map.md`
and `docs/research/raw/owner_reviews/review_33_batch_36_verdict.md`.
Row additions: RC-148..RC-153 (no new CS). Owner: "very strong now."
Deliverable: `docs/status/GATE05B_CONTROLS_DEPENDENCY_MAP.md`; Gate 05A
registry updated (S7–S11 EV-side receive signals added; status +
`NO_PROPRIETARY_DBC_ASSUMPTIONS`).

### Gate 05A — transmit-config recurrence (RC-148)

The ledger line "unlocks custom VCU configurations on the body-builder
bus" reappeared → re-corrected to **authorized receive/listen-only VCU
awareness; transmit blocked unless Ford docs allow the exact
message/address/timing/bus/use case.** A recurrence of the RC-142/144
transmit rule (data point for the M10 regression scanner). Status gained
`NO_PROPRIETARY_DBC_ASSUMPTIONS`.

### Gate 05B — the authority corrections (RC-149..153)

The dependency map is well-structured; the corrections are all about
**where control authority actually lives**:

- **VCU decisions = SimulationOnly (RC-150).** Torque arbitration,
  pre-charge, and thermal derating all carry authority conditions.
  **Critically: do NOT assume the VCU controls contactors / pre-charge —
  that authority may belong to the BMS/PDU safety controller** (BQ-27).
- **Driver warnings (RC-151):** EV-side display / service laptop /
  prototype dashboard only; **factory cluster integration =
  `BLOCKED_PENDING_AUTHORIZED_FORD_INTERFACE`.**
- **Emergency shutdown (RC-152):** Fault Level 3 **requests** EV-side
  contactor open / torque inhibit / restart lockout **through the
  authorized BMS-PDU safety architecture**; the VCU does not
  automatically own final HV shutdown.
- **Directionality held:** Ford-side receive-only; EV-side transmit
  isolated to CAN_2/CAN_3; no CAN_1→CAN_2 routing of unverified Ford data;
  no packet injection onto factory safety buses; no unauthorized J1939 /
  upfitter overrides.

### Next

Owner: **Gate 05C — Controls State Machine** — 11 states (OFF, ACCESSORY,
READY_REQUEST, PRECHARGE_REQUEST, READY_TO_DRIVE, DRIVE_ENABLED, DERATE,
FAULT_LATCHED, SERVICE_MODE, CHARGE_CONNECTED, EMERGENCY_SHUTDOWN), each
with required inputs, allowed EV-side outputs, blocked Ford-side outputs,
fault transitions, proof artifact, verification status. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Ford-side signals inform the model only; EV-side authority stays
  isolated until sources + DBCs + supplier ownership + test paths are
  proven; no factory-cluster injection; no VCU-owned HV shutdown yet.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 45. Batch 37 + owner review_34 — Gate 05C Controls State Machine (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_37_gate05c_state_machine.md`
and `docs/research/raw/owner_reviews/review_34_batch_37_verdict.md`.
Row additions: RC-154..RC-159 (no new CS). Owner: "strong Gate 05C
draft." Deliverable: `docs/status/GATE05C_STATE_MACHINE.md` (11 states).

### The biggest upgrade — ownership labels (RC-158)

Every state now carries an **Owner** (VCU / BMS / PDU / Inverter /
Charger / Ford module / Hardwired safety circuit / Unknown-Pending), a
**VCU Role**, and an **Authority Status**. The VCU may **coordinate** the
state machine but cannot assume ownership of contactors, pre-charge, HV
shutdown, factory signals, or cluster warnings until supplier/Ford docs
prove it. PRECHARGE_REQUEST, READY_TO_DRIVE, and EMERGENCY_SHUTDOWN are
owned by the **BMS/PDU/safety controller — pending supplier
architecture** (BQ-27); the VCU role is request/monitor only.

### Other corrections (owner)

- **Ford-side signals are not hard Required Inputs (RC-155):**
  listen-only Ford signals (ignition, brake) are `SimulationOnly /
  CandidateSignal` — not real state-transition authority until an
  official Ford/UIM source or verified capture exists.
- **Pre-charge ">95%/timeout" → ParameterPending (RC-156):** FAULT_LATCHED
  if pre-charge fails the **supplier-defined** target within the
  **supplier-defined** timeout (no invented number).
- **Emergency shutdown + service mode (RC-157):** E-shutdown **requests**
  through the authorized BMS/PDU safety architecture (final HV isolation
  authority pending); SERVICE_MODE diagnostics only after **HV
  de-energized + LOTO + service disconnect removed + absence-of-voltage
  verification** — opening HVIL is never a routine software action.
- **DRIVE_ENABLED** now carries the full pre-drive input set (charger
  disconnected, HVIL/isolation valid, no fault latch, pre-charge complete,
  contactors confirmed by the safety controller, brake override + accel
  plausibility, LV rail healthy, BMS allows discharge, inverter ready).

### Next

Owner: **Gate 05D — State Transition + Ownership Matrix** — per state:
state, owner, entry conditions, exit conditions, allowed outputs, blocked
outputs, fault transitions, required proof artifact, authority status,
supplier data needed. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- The VCU coordinates but owns nothing safety-critical yet; Ford signals
  don't gate real transitions; no invented pre-charge number; no
  factory-cluster injection; opening HVIL is not a routine software step.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 46. Batch 38 + owner review_35 — Gate 05D State Transition + Ownership Matrix (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_38_gate05d_ownership_matrix.md`
and `docs/research/raw/owner_reviews/review_35_batch_38_verdict.md`.
Row additions: RC-160..RC-163 (no new CS). Owner: "major upgrade … VCU
god-controller risk reduced." Deliverable:
`docs/status/GATE05D_OWNERSHIP_MATRIX.md` (11-state ownership matrix +
Final Responsibility Matrix).

### Permanent doctrine promoted (Decision Register D-007)

The owner elevated the coordination principle to **"a permanent Build
Engine doctrine line":** **Coordinator ≠ Owner · Requesting ≠ Commanding ·
Monitoring ≠ Approving · Seeing a signal ≠ having authority to act on it.**
Paired with the **Build Engine Authority Law** ("No state transition may
become physical-control authority until every action inside that
transition has an assigned owner, allowed requester, blocked-controller
list, and proof artifact; if ownership is unknown, the VCU may simulate,
monitor, or request only — it may not directly control"). Recorded as
**D-007** in `docs/DECISION_REGISTER.md`.

### Owner corrections (verbatim intent)

- **READY_TO_DRIVE (RC-160):** must not command torque — torque stays
  strictly in DRIVE_ENABLED; READY_TO_DRIVE only requests drive-enable
  state confirmation.
- **OFF (RC-161):** MONITOR only if a low-power supervisor mode is awake,
  otherwise dormant; sleep-state monitoring may belong to the LV
  supervisor / BMS keep-alive.
- **ACCESSORY (RC-162):** thermal pumps may run only if LV power budget +
  pump ownership + thermal-controller authority are verified.
- **SERVICE_MODE (RC-163):** physical maintenance requires HV
  de-energized + LOTO active + service disconnect removed +
  absence-of-voltage verification + technician signoff.
- **EMERGENCY_SHUTDOWN:** "de-energize HV system" → "**request** HV
  de-energization through the authorized BMS/PDU/hardwired safety
  architecture" (extends RC-157 — VCU may not own final HV isolation).

### Gate 05D status (owner review_35)

`STATE_OWNERSHIP_MATRIX_CREATED` / `VCU_ROLE_LIMITS_DEFINED` /
`FORD_SIDE_CONTROL_BLOCKED` / `EV_SIDE_CONTROL_ISOLATED` /
`CONTACTOR_OWNER_PENDING` / `PRECHARGE_OWNER_PENDING` /
`HV_SHUTDOWN_OWNER_PENDING` / `TORQUE_AUTHORITY_PENDING` /
`SERVICE_MODE_PHYSICAL_SAFETY_PENDING` / `SIMULATION_ONLY`. Owner bottom
line: **CREATED / SIMULATION_ONLY / OWNERSHIP PENDING.**

### Next

Owner: **Gate 05E — Interface Control Document / Signal Authority Table** —
per signal: signal, source controller, destination controller, bus,
direction, owner, requester, allowed use, blocked use, physical authority,
verification status, proof artifact. Gate 05D says *who owns what*; Gate
05E says *what signal may cross which boundary*. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- The VCU coordinates but owns nothing safety-critical (contactors,
  pre-charge, HV shutdown, torque authority all PENDING supplier
  architecture, BQ-27); Ford-side control BLOCKED, EV-side ISOLATED; no
  invented threshold; no factory-cluster injection; SERVICE_MODE requires
  LOTO / absence-of-voltage.
- Nothing ingested; nothing marked Confirmed; ODRs untouched.

---

## 47. Batch 39 + owner review_36 — Gate 05E Interface Control Document / Signal Authority Table (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_39_gate05e_icd_signal_authority.md`
and `docs/research/raw/owner_reviews/review_36_batch_39_verdict.md`.
Row additions: RC-164..RC-168 (no new CS). Deliverable:
`docs/status/GATE05E_ICD_SIGNAL_AUTHORITY.md` (10-row signal-authority
table after the owner's splits + the ICD gate rule). Owner: "strong Gate
05E draft."

### The ICD gate rule (owner: "exactly right")

`IF authority_status == UNVERIFIED_STAGE OR owner == PENDING →
PHYSICAL_HARDWARE_DRIVE = BLOCKED, BUS_TRANSMISSION_FACTORY = BLOCKED,
EVALUATION_MODE = SIMULATION_ICD_VERIFICATION_ONLY`. A signal never jumps
from "mapped in software" to "allowed to control hardware."

### Owner corrections

- **Split pre-charge into three signals (RC-164):** request / status /
  relay-coil control — only the supplier controller may own the coil
  control; the VCU may not energize it unless supplier architecture
  explicitly assigns that authority.
- **Split emergency shutdown into four signals + drop "inhibit" (RC-165):**
  torque-zero request / shutdown request to BMS / hardwired E-stop open
  (no software override) / contactor-open status — torque inhibit stays
  separate from HV de-energization.
- **Ford source controllers stay generic (RC-166):** "Ford factory module
  / UIM path — pending verification," not a named Ford PCM/ABS module,
  until proven.
- **Listen-only proof requirement (RC-167):** silent/listen-only mode + no
  ACK participation + no transmit mailbox + capture log + hardware-config
  screenshot.
- **Signal-decomposition doctrine (RC-168):** a signal cannot be both a
  request and a hardware actuation unless the source document explicitly
  says so; every safety-critical action decomposes into request · status ·
  feedback · hardware-actuation · fault.

### Gate 05E status (owner review_36)

`ICD_SIGNAL_BOUNDARIES_MAPPED` / `SIMULATION_ONLY` /
`FORD_SIDE_LISTEN_ONLY` / `EV_SIDE_ISOLATED_CONTROL_PENDING` /
`PRECHARGE_SIGNALS_NEED_SPLIT` / `SHUTDOWN_SIGNALS_NEED_SPLIT` /
`NO_FACTORY_BUS_TRANSMISSION` / `NO_PHYSICAL_HARDWARE_DRIVE`. The
pre-charge and shutdown splits are applied in the deliverable.

### Next

Owner: **Gate 05F — Network Boundary / Gateway Safety Rules** — define what
the gateway is physically and logically allowed to do: which buses are
physically isolated / listen-only / transmit-capable; which signals may
cross Ford-side → EV-side and which are forbidden; gateway-crash behavior;
CAN_2/CAN_3-silent behavior; proof that CAN_1 never transmits. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Ford-side signals listen-only (no torque/braking authority); Ford
  cluster + safety networks BLOCKED; EV torque on isolated CAN_2 only;
  pre-charge / contactors PENDING supplier ownership (BQ-27); shutdown
  split-ownership; hardwired E-stop takes no software override.
- Nothing ingested; nothing marked Confirmed; no factory-bus transmission;
  no physical-hardware drive; ODRs untouched.

---

## 48. Batch 40 + owner review_37 — Gate 05F Network Boundary / Gateway Safety Rules (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_40_gate05f_network_boundary_gateway_rules.md`
and `docs/research/raw/owner_reviews/review_37_batch_40_verdict.md`.
Row additions: RC-169..RC-173 (no new CS). Deliverable:
`docs/status/GATE05F_NETWORK_BOUNDARY.md` (3-bus isolation architecture,
routing rules, failure protocols, listen-only proof dossier, gateway gate
rule). Owner: "excellent structurally … very good."

### Recurrence caught — invented timing acting as gate logic (RC-169)

The batch re-introduced hard `50 ms` (inverter zero-torque) / `100 ms`
(CAN_2, CAN_3 silence) timeouts as if they were sourced safety boundaries —
the **same defect family** as the fabricated 200 ms HVIL limit (RC-116) and
the Gate 08C placeholder-authority problem (RC-133). Downgraded to
`SupplierDataPending` sweep-only placeholders labeled **No Gate Authority**;
Protocols A/B/C reworded to supplier-defined timeouts. A general rule
(RC-173) now forbids any timeout / heartbeat / alive-counter / torque-zero /
shutdown / contactor-open timing from becoming physical gate logic until
supplier docs or HIL/bench proof confirm it. **Recommended for the M10
regression scanner** (owner decision pending) alongside the other recurring
patterns.

### Other corrections

- **Authority-chain language (RC-170):** "academic engineering wiring
  protocol" / "manual OEM academic research protocol" → "supplier wiring
  diagram + ICD + controls-engineer review confirm request authority."
- **Signal-owner vs action-owner (RC-171):** `VCU_Precharge_Request` +
  `VCU_Shutdown_Request_To_BMS` — Signal Owner = VCU (request generation),
  Action Owner = BMS/PDU/hardwired safety (execution), VCU Authority =
  requester only.
- **CAN_1 hardware language (RC-172):** "transceiver must be modified" →
  "selected, wired, or configured for listen-only / silent monitoring with
  no transmit capability enabled."

### Architecture kept (owner: "the architecture is right")

CAN_1 = Ford listen-only / no transmit; CAN_2 = isolated VCU↔inverter;
CAN_3 = isolated VCU↔BMS/PDU. Forbidden crossings (EV torque, HV metrics,
thermal alerts, any Ford PCM/ABS/ESC/airbag ID spoof) held. The gateway
gate rule kept verbatim: `listen_only_proof == MISSING OR isolation_status
== UNVERIFIED → GATEWAY_DEPLOYMENT = BLOCKED, PHYSICAL_INJECTION_TEST =
FORBIDDEN, EXECUTION_MODE = SIMULATION_BOUNDARY_LOGIC_ONLY`.

### Gate 05F status (owner review_37)

`NETWORK_BOUNDARY_RULES_CREATED` / `CAN_1_LISTEN_ONLY_REQUIREMENT_DEFINED` /
`EV_SIDE_BUSES_ISOLATED` / `PRECHARGE_SIGNAL_DECOMPOSED` /
`SHUTDOWN_SIGNAL_DECOMPOSED` / `TIMEOUT_VALUES_PENDING_SUPPLIER_DATA` /
`NO_FACTORY_BUS_TRANSMISSION` / `NO_PHYSICAL_GATEWAY_DEPLOYMENT` /
`SIMULATION_ONLY`.

### Next

Owner: **Gate 05G — Fault Containment and Gateway Failsafe Matrix** — what
happens when something fails: VCU crash, CAN_1 accidental transmit,
CAN_2/CAN_3 silent, gateway power loss, gateway stuck dominant/recessive,
bad checksum / alive-counter, message replay, wrong source address, BMS
says no-discharge, inverter ignores torque-zero, E-stop asserted. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- CAN_1 listen-only (no transmit); EV-side buses isolated; no timeout has
  physical authority (RC-173); pre-charge + shutdown decomposed with
  signal-owner ≠ action-owner (RC-171); no EV torque / HV metric crosses to
  the Ford side; no Ford ID spoofing.
- Nothing ingested; nothing marked Confirmed; no factory-bus transmission;
  no physical gateway deployment; ODRs untouched.

---

## 49. Batch 41 + owner review_38 — Gate 05G Fault Containment / Gateway Failsafe Matrix (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_41_gate05g_fault_containment_failsafe_matrix.md`
and `docs/research/raw/owner_reviews/review_38_batch_41_verdict.md`.
Row additions: RC-174..RC-179 (no new CS). Deliverable:
`docs/status/GATE05G_FAILSAFE_MATRIX.md` (13-row failsafe matrix + the
failsafe gate rule + default-safe rule). Owner: "strong … architecture
right, failsafe categories right."

### Recurrence caught — invented timing acting as gate logic, again (RC-174)

**Third recurrence** of the invented-timing defect family (RC-116 200 ms
HVIL, RC-133 Gate 08C placeholder-authority, RC-169/173 Gate 05F 50/100 ms):
the batch's `50 ms` (inverter zero-torque), `100 ms` (CAN_2/CAN_3 silence),
and `2 ms` (dominant-timeout DTO) numbers still read like sourced timing.
Downgraded to `SupplierDataPending / SimulationSweepOnly`
(`TransceiverSupplierDataPending` for the DTO); rows reworded to
supplier-defined behavior pending inverter docs + HIL. **Strongly
recommended for the M10 regression scanner** — this defect has now recurred
across four gates.

### Other corrections

- **No "instant" for mechanical / E-stop actions (RC-175):** contactor
  opening time is supplier-defined + bench/HIL-verified (coil decay, spring
  travel, arc suppression, contact separation), never "instant."
- **CAN_1 transmit-attempt failure type (RC-176):** rejected by firmware
  policy AND physically unable to drive the bus; five-part proof pack.
- **Bad-checksum stale-data caution (RC-177):** bad data cannot preserve
  torque authority; stale value only as an explicit safe fallback within a
  supplier-defined timeout, else torque zero / FAULT_LATCHED.
- **Wrong-source-address de-escalated (RC-178):** reject + log; latch only
  on repeat / safety-critical / forbidden-pattern; threshold pending
  controls-security review.
- **Failsafe default-safe rule (RC-179):** no failsafe timing controls
  hardware until SupplierConfirmed / BenchVerified; any torque / contactor /
  BMS-discharge / HVIL / isolation / e-stop fault defaults toward torque
  inhibit + restart lockout + engineering review.

### Kept (owner: "critical containment rows")

- **BMS no-discharge** → VCU clamps inverter torque request to zero.
- **Inverter ignores torque-zero** → VCU escalates to a shutdown request
  over CAN_3 + FAULT_LATCHED on current/torque-feedback conflict.
- The failsafe gate rule verbatim: `failsafe_timing_confirmed == FALSE OR
  hil_bench_proof == MISSING → PHYSICAL_HARDWARE_INTEGRATION = BLOCKED,
  SYSTEM_EXECUTION_MODE = SIMULATION_FAULTS_ONLY`.

### Gate 05G status (owner review_38)

`FAILSAFE_MATRIX_MAPPED` / `SIMULATION_ONLY` /
`TIMEOUT_VALUES_PENDING_SUPPLIER_DATA` / `HIL_BENCH_PROOF_REQUIRED` /
`CAN_1_LISTEN_ONLY_PROOF_REQUIRED` / `NO_PHYSICAL_GATEWAY_DEPLOYMENT` /
`NO_FACTORY_BUS_TRANSMISSION` / `NO_PLACEHOLDER_TIMING_AUTHORITY`.

### Next

Owner: **Gate 05H — Gateway Proof Plan / HIL Bench Test Matrix** — how to
**prove** the failsafe behavior without putting it in a vehicle yet: CAN_1
silent-mode proof, CAN_2 inverter-timeout test, CAN_3 BMS heartbeat-dropout
test, bad-checksum injection, wrong-source-address rejection, torque-zero
command trace, BMS no-discharge response, e-stop loop bench proof, gateway
power-loss behavior, watchdog-reset behavior. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- CAN_1 listen-only (proof required); CAN_2/CAN_3 isolated; no timeout has
  physical authority (RC-174/179); every torque / contactor / BMS-discharge
  / HVIL / isolation / e-stop fault defaults toward torque inhibit +
  restart lockout + engineering review.
- Nothing ingested; nothing marked Confirmed; no placeholder timing has
  gate authority; no factory-bus transmission; no physical gateway
  deployment; ODRs untouched.
