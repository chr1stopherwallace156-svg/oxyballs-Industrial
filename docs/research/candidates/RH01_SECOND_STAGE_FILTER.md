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
| RC-180 | **HIL timing values are not limits (owner review_39, FOURTH recurrence of the invented-timing defect — cf. RC-116/133/169/174)**: the batch_42 Gate 05H `10 ms / 20 ms / 50 ms / 100 ms / 2 ms / 3-cycle-30 ms` values in the fault-injection matrix + scripts read like real pass/fail limits → **`SimulationSweepOnly / SupplierDataPending`**; matrix header "Pass Criteria Metric" → **"HIL Observation Metric / Candidate Pass Criteria"** + Authority Status row ("No physical gate authority until supplier timing boundary or bench/HIL requirement is approved"); measure + record observed latency, HIL result only, not vehicle approval | batch_42 (invented timing) | n/a — parameter / test rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7/L8 |
| RC-181 | **HIL result language, not "PASS" (owner review_39)**: the scripts' `[PASS]` / `return "VERIFICATION_STAGE_PASSED_SIM"` can sound like final vehicle approval → use **`[HIL_OBSERVED]` … return `"HIL_OBSERVED_NO_GATE_AUTHORITY"`**; result category = **HIL observed / needs review / model stress failure** (echoes the Gate 08C Simulation Response Category RC-131) | batch_42 (approval-sounding language) | n/a — test rule | **ControlsSafety / NoGateAuthority** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7/L8 |
| RC-182 | **CAN_1 fault-injection bench boundary (owner review_39)**: the "FIU forces physical short CAN-H↔CAN-L" test may run **only on simulated OEM nodes or bench-harness replicas — forbidden on a live Ford factory network**; the strongest CAN_1 proof is not the short test but **silent-mode register dump + no TX mailbox allocation + no ACK participation + protocol-analyzer capture + oscilloscope confirmation of no dominant-bit drive** | batch_42 (unsafe-if-on-live-bus) | n/a — test boundary rule | **ControlsSafety / ProofRequirement** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-183 | **Power-loss safe-state is measured, not assumed (owner review_39)**: "all VCU low-side/high-side driver pins float open within <2 ms" is too absolute — pins do not become safe unless the circuit is designed that way → **measure driver-output behavior after power loss; the expected safe state depends on output-stage design, pull-ups/pull-downs, relay topology, and hardware fail-safe design; timing + final expected state require bench proof** | batch_42 (unproven hardware assumption) | n/a — test rule | **NeedsHardwareProof / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7/L8 |
| RC-184 | **Per-HIL-run proof-artifact package (owner review_39, new rule)**: every HIL run must record **HIL Run ID · firmware version · VCU hardware revision · test-script version · bench wiring diagram · simulated-node config · fault injected · raw CAN log · oscilloscope capture · power-rail log · state-transition log · observed latency · expected response · result category · authority status · engineer reviewer** (makes each bench run reusable evidence); Script B timeout must be **configurable** (`hil.get_config(...)`), not a hardcoded 100 ms max | owner-promoted | n/a — proof rule | **ProofRequirement / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-185 | **Gate 05H is bench/HIL evidence, not "simulation only" (owner review_40)**: a real VCU DUT + real transceivers + supply + oscilloscope + FIU is bench evidence → split into **Gate 05H-A (simulation script draft, `SIMULATION_SCRIPT_DRAFT`), Gate 05H-B (low-voltage HIL bench execution with real VCU, `HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE`), Gate 05I (physical bench proof with production-like harness/components, NOT STARTED)**; a real HIL run returns **`HIL_OBSERVED_VALID / NO_LIVE_HV / NO_VEHICLE_CLEARANCE / NO_COMPLIANCE_AUTHORITY`**, not just SIMULATION_ONLY | owner-promoted | n/a — gate-structure rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-186 | **ACK / listen-only proof must watch the TX line (owner review_40)**: a shared-slot CAN analyzer cannot prove which node asserted the ACK → truly-silent CAN_1 proof requires **register dump (listen-only) + zero TX mailbox + TX pin disabled/disconnected/hardware-gated + oscilloscope probe on the VCU TX/TXD line + controlled bench bus with known ACK-capable nodes + analyzer log showing no VCU-originated frames**; criterion = **"VCU_TXD line remains inactive during the ACK slot and all frame periods"**, not the decoded `f.is_ack_asserted` flag | batch_43 (weak ACK proof) | n/a — proof rule | **ProofRequirement / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (strengthens RC-167/182) — lanes L7 |
| RC-187 | **CAN-H/CAN-L short test is bench-only (owner review_40, hard warning)**: the FIU 500 ms CAN-H↔CAN-L short is **forbidden on a live Ford factory network**; it may run **only on a bench harness or simulated OEM-node network** | batch_43 (unsafe-if-on-live-bus) | n/a — test boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (reinforces RC-182) — lanes L7 |
| RC-188 | **Timing Authority field + script return language (owner review_40)**: every HIL timing carries a **Timing Authority** label `SimulationSweepOnly / SupplierDataPending / HILObservedOnly` ("we observed 42.17 ms under this bench setup; this does not become the official safety limit"); scripts return **`HIL_OBSERVED_VALID_NO_GATE_AUTHORITY`** and **`HIL_NEEDS_REVIEW_NO_GATE_AUTHORITY`** (the latter replacing `MODEL_STRESS_FAILURE` unless the script crashed or violated a hard bench safety rule) | batch_43 (unlabeled timing / approval-sounding return) | n/a — parameter / test rule | **NoGateAuthority / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (extends RC-180/181) — lanes L7/L8 |
| RC-189 | **LV bench-profile status labels (owner review_40)**: the HIL LV rail profiles (11.8–14.2 V, ≥20 V/ms slew, 0–5 V APPS) are plausible test setups but must be labeled **`TestBenchProfileCandidate / NotFinalVehicleRequirement / NeedsComponentSpec`** so they guide HIL setup without becoming final vehicle electrical requirements | batch_43 (unlabeled bench profile) | n/a — parameter rule | **NeedsSupplierData / TestBenchProfileCandidate** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7/L8 |
| RC-190 | **HIL evidence is real but not vehicle authority (owner review_41)**: "timing limits, thresholds, and electrical behaviors mapped here constitute real HIL and bench tracking evidence" → **"measured here constitute real low-voltage HIL / bench evidence for this DUT, firmware version, harness, and simulated-node setup; they do not become vehicle-level control authority, live-HV approval, road-test approval, or compliance proof without engineering review, supplier confirmation where required, and later physical bench / vehicle gates"** | batch_44 (over-broad authority framing) | n/a — evidence-boundary rule | **ControlsSafety / NoVehicleAuthority** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-191 | **Stricter HIL result categories (owner review_41)**: `HIL_OBSERVED_VALID` → **`HIL_OBSERVED_VALID_NO_VEHICLE_AUTHORITY`**; review cases → **`HIL_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY`** (incl. measured latency exceeding the configured threshold); dangerous bench violations (CAN_1 TXD activity, factory-bus transmit leakage) → **`HIL_HARD_BLOCK`**; missing artifact package → **`HIL_INVALID_RUN`** | batch_44 (approval-sounding categories) | n/a — test rule | **NoGateAuthority / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (extends RC-181/188) — lanes L7 |
| RC-192 | **CAN-H/CAN-L 500 ms short is bench-only (owner review_41, hard rule)**: permitted **only on a protected HIL bench harness with simulated OEM nodes, current-limited equipment, and replaceable/protected transceivers**; **forbidden on a live Ford factory network or customer vehicle** | batch_44 (unsafe-if-on-live-bus) | n/a — test boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (strengthens RC-182/187) — lanes L7 |
| RC-193 | **TX-pin fault must be non-destructive (owner review_41)**: "FIU shorts the VCU transceiver TX pin directly to Ground" → **"FIU injects a controlled stuck-dominant / stuck-TXD fault through a protected fault-injection path approved for the transceiver circuit"**; **direct destructive shorting of MCU/transceiver pins is forbidden unless the bench fixture is designed for that fault mode** (test the failure behavior, don't destroy hardware) | batch_44 (destructive test method) | n/a — test-safety rule | **ControlsSafety / HardwareSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-194 | **Instrument calibration records in the artifact package (owner review_41)**: since calibrated lab instruments are cited, every HIL run must record **oscilloscope serial/calibration date · CAN-analyzer serial/firmware · programmable-supply serial/calibration date · FIU hardware revision** | owner-promoted (extends RC-184) | n/a — proof rule | **ProofRequirement** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-195 | **Mandatory Gate 05H pre-test safety checklist (owner review_41, new rule)**: before any 05H run — **no live HV connected · no real battery pack · no real contactor coil unless explicitly part of the LV bench test · current-limited supply active · bench E-stop available · fused DUT supply · test-bench wiring reviewed · firmware hash recorded · CAN_1 connected only to simulated/bench OEM nodes · raw logging enabled before fault injection** | owner-promoted | n/a — bench-safety rule | **ControlsSafety / HardwareSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` — lanes L7 |
| RC-196 | **Gate 05I is low-voltage only (owner review_41)**: Gate 05I (Physical Bench Integration) must **not** jump to live HV or vehicle testing → it means **production-like low-voltage bench integration** (real harness, real VCU, real or supplier-representative BMS/PDU controller, real inverter controller if possible) with **no traction-battery HV, no vehicle road testing, no Ford factory bus transmission** | owner-promoted | n/a — gate-scope rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`; scoped in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-197 | **Gate 05I result categories are BENCH, not HIL (owner review_42)**: in Gate 05I `HIL_OBSERVED_VALID` → **`BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY`** / **`BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY`** / **`BENCH_HARD_BLOCK`** / **`BENCH_INVALID_RUN`** — Gate 05H = HIL, Gate 05I = production-like LV bench integration | batch_45 (wrong-layer result label) | n/a — test rule | **NoVehicleAuthority / ControlsSafety** — recorded in `docs/status/GATE05I_BENCH_INTEGRATION.md` (extends RC-191) — lanes L7 |
| RC-198 | **No "instant" for the bench E-stop (owner review_42)**: "instant physical path break / immediate mechanical drop-out / coil voltage drops to 0 V" → **"E-stop removes the LV control path through the approved hardwired safety loop; coil-voltage decay, relay drop-out time, and output behavior must be measured and compared against the verified schematic + component datasheets"** (even LV relays/contactors have real physical delay) | batch_45 (unsafe timing word) | n/a — bench-safety rule | **NeedsSupplierData / ControlsSafety** — recorded in `docs/status/GATE05I_BENCH_INTEGRATION.md` (extends RC-175) — lanes L7/L8 |
| RC-199 | **Production-intent harness, not production-spec (owner review_42)**: "final production-spec wiring harness" is too final → **"production-intent bench harness"**, `Harness Status: PRODUCTION_INTENT / NOT_RELEASED_FOR_VEHICLE_INSTALL` (upgrades to "production-released" only later) | batch_45 (over-final label) | n/a — status rule | **ControlsSafety / GateStatus** — recorded in `docs/status/GATE05I_BENCH_INTEGRATION.md` — lanes L7 |
| RC-200 | **CAN_1 fault injection is protected-bench-only (owner review_42, hard rule)**: CAN_1 stuck-dominant/stuck-TXD fault injection is permitted **only on a protected bench harness or simulated OEM network**; **forbidden on a live Ford vehicle network** | batch_45 (unsafe-if-on-live-bus) | n/a — test boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05I_BENCH_INTEGRATION.md` (extends RC-182/187/192) — lanes L7 |
| RC-201 | **Driver-safety verification stays bench-level (owner review_42)**: Gate 05I driver-safety work opens as sub-gate **Gate 05I-A — Low-Voltage Driver Safety Logic Verification** (not real driver-safety approval) — allowed bench tests (accel/brake plausibility, brake override, shift-state inhibit, charger-plug drive lockout, E-stop response, HVIL open detection, BMS no-discharge, inverter fault response, LV brownout, fault-latch persistence, service-clear routine, EV-display warning, CAN_1 listen-only maintained); **blocked: real propulsion, live HV, wheels-on-ground movement, Ford ABS/ESC intervention, factory-cluster injection, road-test driver-safety claims** | owner-promoted | n/a — gate-scope rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05I_BENCH_INTEGRATION.md`; scoped in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-202 | **Gate 05I-A timing/percentages are bench-target profiles (owner review_43, sixth+ recurrence of the invented-timing family — cf. RC-116/133/169/174/180/188)**: the batch's >10% APPS skew, >25% accel, >5% APPS, 13.5→8.5 V, ≥20 V/ms, 50 ms APPS-fault, 50 ms brake-override window, 15 ms coil delay, 10 ms relay drop-out must be labeled **`BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`** — configurable sweep, initial bench target only, **final threshold pending controls-engineer review + APPS source verification + supplier documentation**; the brake-override script window must be configurable (`bench.get_config(...)`) | batch_46 (invented timing/percentages) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` — lanes L7/L8 |
| RC-203 | **Expected-safe-output vs blocked-outputs (owner review_43)**: the batch put the safe response ("CAN_2 torque payload set to 0x0000") in the **Blocked Outputs** column — a torque-zero response is the **expected safe output**, not a blocked output → split into **Expected Safe Output** (torque → zero) vs **Blocked Outputs** (non-zero torque request, CAN_1 transmit activity, factory-cluster injection, auto-clear of active fault) for tests 001/002/004/007/008/010 | batch_46 (mislabeled column) | n/a — schema rule | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` — lanes L7 |
| RC-204 | **No "immediate" for the driver-safety responses (owner review_43)**: "command immediate zero-torque state" → **"command zero-torque state within the configured bench target window; final timing pending controls review + supplier/HIL/bench evidence"** (measured latency, not "instant"); applies to brake override, E-stop, and charger-plug lockout | batch_46 (unsafe timing word) | n/a — controls-safety rule | **ControlsSafety / NeedsSupplierData** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (extends RC-175/198) — lanes L7/L8 |
| RC-205 | **HVIL row ownership cleanup (owner review_43)**: "VCU commands open sequence to control lines" → **"VCU requests shutdown / torque inhibit / fault latch; the BMS/PDU/hardwired safety loop owns physical contactor or isolation execution"** — keeps the VCU from owning HV isolation | batch_46 (VCU over-ownership) | n/a — controls-safety rule | **ControlsSafety** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (extends D-007; links BQ-27) — lanes L7 |
| RC-206 | **Service-clear stricter rule (owner review_43)**: a UDS Clear (0x14) may clear **software diagnostic records only** — it **must not clear active hardwired faults, active HVIL faults, active E-stop, BMS no-discharge, isolation fault, or an unresolved safety latch**; service clear requires **no active fault input + zero torque command + charger disconnected + safe/neutral state + technician authorization + fault source reviewed**; a diagnostic command alone must not restore drive readiness | batch_46 (over-permissive clear) | n/a — controls-safety rule | **NoGoConditionCandidate / ControlsSafety** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` — lanes L7/L8 |
| RC-207 | **Failsafe block should be reviewable, not permanent (owner review_43)**: `VEHICLE_COMMISSIONING_APPROVAL = "PERMANENTLY_BLOCKED"` is too permanent → **`HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW`** + `SAFETY_CONFLATION_HALT`, then require **root-cause analysis + corrective action + repeat bench test + engineering signoff + versioned record** | batch_46 (over-permanent block) | n/a — process rule | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` — lanes L7 |
| RC-208 | **Bench values are target profiles / criteria (owner review_44, RECURRENCE of RC-202/203 — the Hunter re-emit did not apply them, and it adds new 05I-B criteria)**: the 05I-A values (>10% APPS skew, >25% accel, >5% shift, 13.5→8.5 V, ≥20 V/ms, 50 ms) STILL need `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`, and the new 05I-B criteria (**<0.1 Ω** E-stop contact, **<0.02 Ω** ground, **≤20 ms** relay dropout, **5 A/10 A** fuses) need `TARGET_BENCH_CRITERIA / NEEDS_COMPONENT_DATASHEET / NEEDS_ENGINEERING_REVIEW` — "initial bench target only; final value pending supplier datasheet + controls-engineer review + bench evidence". Also the **"Blocked Outputs" column recurred mis-used** → Expected Safe Output (torque → zero) vs Blocked Outputs (non-zero torque after fault, CAN_1 transmission, factory-cluster injection, automatic fault clear, **direct contactor control by VCU**) | batch_47 (invented values / mislabeled column, recurrence) | n/a — parameter + schema rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` + `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (extends RC-202/203) — lanes L7/L8 |
| RC-209 | **05I-B breach logic must not hard-code limits (owner review_44)**: `IF ground_resistance_ohms >= 0.02 OR safety_relay_dropout_ms > 20.0` → **`IF ground_resistance_ohms >= approved_ground_limit OR safety_relay_dropout_ms > approved_datasheet_limit`** (limits are variables set from the approved datasheet / engineering review, not universal constants) → `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` | batch_47 (hard-coded limits) | n/a — gate-logic rule | **GateLogic / NoGateAuthority** — recorded in `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (extends RC-207/208) — lanes L7/L8 |
| RC-210 | **Gate 05I-C intro over-claims validation (owner review_45)**: "With safety logic and physical interlocks validated…" → **"After Gate 05I-A and 05I-B matrices are defined and bench evidence is collected…"** — the status is `MATRIX_CREATED / BENCH_EVIDENCE_PENDING`, not "validated" | batch_48 (over-claimed status) | n/a — status-language rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` — lanes L7 |
| RC-211 | **"immediate" STILL present (owner review_45, RECURRENCE of RC-175/198/204)**: "command immediate zero-torque state", "trigger immediate shift to Neutral/Safe", "hardwired loop opens immediately", "immediate continuity break" → **"within configured bench target window / measured & compared against the approved target profile / final timing pending supplier datasheet + controls review + bench proof"** (measured behavior, not "instant") | batch_48 (unsafe timing word, recurrence) | n/a — controls-safety rule | **ControlsSafety / NeedsSupplierData** — recorded in `docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` + `docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` — lanes L7/L8 |
| RC-212 | **Hard values STILL act like rules (owner review_45, RECURRENCE of RC-202/208 — ninth artifact — + new values)**: >10% APPS, >25% accel, >5% shift, 13.5→8.5 V, ≥20 V/ms, 50 ms, <0.1 Ω, <0.02 Ω, ≤20 ms, plus **>75% bus utilization** + **>100 ms heartbeat timeout** = `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / ENGINEERING_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`; breach limits are variables (`approved_ground_limit` / `approved_datasheet_limit` / `approved_heartbeat_window`), not hard-coded constants | batch_48 (invented values, recurrence) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-202/208/209) — lanes L7/L8 |
| RC-213 | **DBC terminology + rejection set (owner review_45)**: "wrong-DTC, wrong-ID, or corrupted DBC packet rejection" is wrong — **a DBC is a database/map that explains how to decode packets, not a packet** → verify rejection of **wrong arbitration ID / wrong PGN-source address / wrong DBC version / bad checksum / rolling-counter mismatch / out-of-range signal scaling / unexpected diagnostic request**; heartbeat line → "VCU torque command transitions toward zero after a configured heartbeat-loss target window; final timeout pending supplier docs + controls review + bench evidence" | batch_48 (terminology error) | n/a — controls rule | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` — lanes L7 |
| RC-214 | **Gate 05I-C must include sleep/wake (owner review_45)**: split into **Gate 05I-C1 — Communication Network Integrity** (CAN_2/CAN_3, display, diagnostic/UDS, DBC version matching, heartbeat loss, wrong-ID rejection, checksum/rolling-counter rejection, high bus-load stress, CAN_1 no-leakage proof) + **Gate 05I-C2 — Sleep/Wake/Parasitic Drain** (key-off sleep entry, charger-plug/service-tool/fault-event wake, BMS/PDU + inverter + display sleep behaviour, stuck-awake detection, brownout recovery, total sleep-current measurement, no unauthorized CAN_1 wake/transmit) | owner-promoted | n/a — gate-scope rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`; scoped in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-215 | **Gate 05I-C values are bench-target profiles (owner review_46, RECURRENCE of RC-212 — tenth artifact)**: >15 ms latency, >100 ms heartbeat, 50 ms UDS, ≤2.0 s sleep transition, ≤1.0 mA sleep current, ≤200 ms wakeup, 75-90% bus load, 10 m harness, 110 turns/m, V_cell >4.5 V, Temp >150 °C = `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY` (heartbeat: "initial bench target 100 ms; final timeout pending supplier docs + controls review + bench evidence"); **sleep current is per-node + total-system** (`VCU_/BMS_logic_/Inverter_logic_/Display_/Total_system_sleep_current_target` — ≤1.0 mA may be too aggressive for the whole system; final limits require supplier datasheets + parasitic-drain budget); the isolation IF logic uses `approved_latency_limit_ms` / `approved_bus_load_target` variables, not hard-coded 15.0/75.0 | batch_49 (invented values, recurrence) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-202/208/212) — lanes L7/L8 |
| RC-216 | **CAN_1 ACK proof must probe the VCU TXD path (owner review_46)**: "zero ACK bits" is imprecise (CAN ACK is a shared bus slot) → **"the VCU CAN_1 shall not transmit frames, assert TXD dominant, participate in ACK, or emit active error frames; ACK behaviour must be verified by probing the VCU TXD / transceiver path, not only by decoded bus logs"** — other simulated OEM nodes may ACK; the point is that the VCU does not | batch_49 (imprecise ACK proof) | n/a — proof rule | **ProofRequirement / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-186) — lanes L7 |
| RC-217 | **Frame-fault layering — controller vs application (owner review_46)**: **physical/protocol faults** (bad CRC, bit-stuffing error, bus error, DLC mismatch) are expected to be rejected by the **CAN controller hardware before application parsing**; **application/data faults** (wrong ID, wrong source address, wrong DBC version, bad alive counter, bad app checksum, out-of-range decoded values) are **application-layer validation tests** — do not conflate the two | batch_49 (layering conflation) | n/a — controls rule | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` — lanes L7 |
| RC-218 | **DBC version hash/checksum required (owner review_46)**: the DBC version hash/checksum must be **stored in the Build Engine**; the **VCU firmware build declares its expected DBC version**; the **bench run logs the actual DBC version** used by the test tools; a **mismatch = `BENCH_HARD_BLOCK_PENDING_REVIEW`** — prevents the classic silent-nonsense-decode when the inverter/BMS DBC changes | owner-promoted | n/a — proof rule | **ProofRequirement / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-213) — lanes L7 |
| RC-219 | **CAN_1 bench interface is simulated/protected only (owner review_46)**: the topography diagram's "Production CAN_1" must not imply a real Ford-bus connection → **"CAN_1 bench interface uses simulated OEM traffic or a protected bench harness only; no live Ford vehicle network connection is allowed during 05I-C"** | batch_49 (ambiguous diagram language) | n/a — test boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-182/187/192/200) — lanes L7 |
| RC-220 | **Gate 05I-C v2 values are bench-target profiles + explicit per-node sleep current (owner review_47, RECURRENCE of RC-215 — eleventh artifact)**: ≤100 ms heartbeat, >15 ms latency, 50 ms UDS, ≤2.0 s sleep, ≤4.0 mA total sleep, ≤200 ms wakeup, ≤5.0 s stuck-awake, 6.0 V/9.0 V brownout, 75/90% bus load = `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`; the (formatting-damaged) sleep-current list becomes explicit per node **`VCU_ / BMS_logic_ / PDU_logic_ / Inverter_logic_ / Display_ / Total_system_sleep_current_target`**, all bench-target-profile, final values pending supplier datasheets + parasitic-drain budget + engineering review | batch_50 (invented values, recurrence) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-202/208/212/215) — lanes L7/L8 |
| RC-221 | **"Production CAN_1" diagram → simulated/protected only (owner review_47)**: "[Production CAN_1] → physical cut → VCU CAN_1 Transceiver" could read as a real Ford network nearby → **"[Simulated OEM CAN_1 Traffic / Protected Bench Harness] … physical isolation barrier … VCU CAN_1 Transceiver — passive listen-only, TXD monitored"** + **"No live Ford vehicle network may be connected during Gate 05I-C"** | batch_50 (misleading diagram) | n/a — test boundary rule | **ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (reinforces RC-219) — lanes L7 |
| RC-222 | **Physical/protocol vs application fault-injection wording (owner review_47)**: bad CRC / bit-stuffing / form / bit errors are **physical/protocol-layer faults injected with a CAN fault-injection tool capable of corrupting frames below the application layer** (rejected by the CAN controller hardware); wrong ID / wrong source address / wrong DLC / bad alive counter / bad app checksum / out-of-range decoded values are **application-layer validation tests** — do not conflate the two test types | batch_50 (test-layer conflation) | n/a — controls rule | **GateLogic / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (reinforces RC-217) — lanes L7 |
| RC-223 | **Brownout NVM-save needs early-warning hardware (owner review_47)**: "VCU must save NVM variables before 6.0 V shutdown" only works with adequate warning/time/energy reserve → **"VCU shall preserve NVM integrity during brownout; if a graceful save is required, the early-warning threshold + hold-up capacitance + write-time budget + memory endurance must be verified"**; initial bench profile 6.0 V drop / 9.0 V recovery; final values pending VCU hardware design + bench proof | batch_50 (unproven hardware assumption) | n/a — hardware rule | **NeedsHardwareProof / ControlsSafety** — recorded in `docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (extends RC-183) — lanes L7/L8 |
| RC-224 | **Never "certified safe" — Gate 05I-D exit language (owner review_48)**: "the low-voltage bench assembly is **certified safe for installation** into the physical vehicle chassis" is too strong → **"the assembly becomes eligible for engineering review for controlled physical vehicle fitment; successful Gate 05I-D completion permits engineering review for controlled low-voltage vehicle fitment only"** — it does **not** authorize live HV connection / vehicle movement / road testing / chassis-dyno testing / customer operation / factory Ford bus transmission / compliance or certification claims | batch_51 (overclaimed "certified safe") | n/a — compliance-language rule | **NoComplianceClaim / ControlsSafety** — recorded in `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md`; links D-008 — lanes L7 |
| RC-225 | **Gate 05I-D test-ID naming + timing labels + no "immediate" (owner review_48, RECURRENCE of RC-220/215 — twelfth artifact — + RC-211)**: test IDs **`05D-###` → `05I-D-###`** (gate-naming consistency); the timings (≤100 ms, ≤50 ms, ≤20 ms, <10 ms, ≤5.0 s, ≤1.0 mA) = `BENCH_TARGET_PROFILE / SUPPLIER_DATA_PENDING / ENGINEERING_REVIEW_REQUIRED / NO_VEHICLE_AUTHORITY`; **"immediately override/drops/suspended" → "within the configured bench target window; measured by timestamped CAN/scope trace; pending approved timing threshold"** | batch_51 (naming + invented timing + "immediate", recurrence) | n/a — parameter / naming rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` (extends RC-215/220/211) — lanes L7/L8 |
| RC-226 | **Charger-plug-during-drive: detect + reject, not "ignore" (owner review_48)**: "VCU ignores charger pilot" → **"the VCU recognizes charger-plug active during the drive-state simulation, declares an illegal-state fault, drops the torque request to zero, blocks drive-enable logic, and blocks charge-path enablement until safe state is restored"** — you want it to detect and reject the impossible state, not ignore it | batch_51 (ignore vs reject) | n/a — controls-safety rule | **ControlsSafety** — recorded in `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` — lanes L7 |
| RC-227 | **E-stop cascade ownership cleanup (owner review_48)**: "direct hardware drop-out of all contactor logic power … VCU commands 0 Nm via software" must not imply software creates the physical safety → **"the hardwired E-stop loop owns the physical low-voltage interruption; the VCU observes feedback loss, commands torque-zero on isolated CAN_2 if still powered, logs the E-stop fault, and latches restart lockout"** | batch_51 (VCU over-ownership) | n/a — controls-safety rule | **ControlsSafety** — recorded in `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` (extends RC-205) — lanes L7 |
| RC-228 | **Sleep-current node vs total-system consistency (owner review_48)**: 05I-D-010's "≤1.0 mA" is the **VCU node** target, but the earlier section set the **total system** at ≤4.0 mA → keep **`VCU_sleep_current_target ≤1.0 mA`** separate from **`Total_system_sleep_current_target ≤4.0 mA`** (do not mix node-level and total-system targets); both bench-target-profiles | batch_51 (node/total conflation) | n/a — parameter rule | **NeedsSupplierData** — recorded in `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md` (extends RC-220) — lanes L7/L8 |
| RC-229 | **Gate 05J is fitment + passive/no-HV verification, not commissioning (owner review_49)**: "before any low-voltage power-on checks are executed on-vehicle" conflicts with 05J already doing parasitic draw + CAN_1 silence with ignition on → **"Gate 05J verifies controlled physical installation and passive/no-HV in-chassis checks; it does not authorize active conversion control, traction enable, live HV, vehicle movement, or road testing"**; **Gate 05K is the first formal LV vehicle power-on / no-HV commissioning gate** | batch_52 (over-scoped gate) | n/a — gate-scope rule | **GateStatus / ControlsSafety** — recorded in `docs/status/GATE05J_VEHICLE_FITMENT.md`; links D-008 — lanes L7 |
| RC-230 | **CAN_1 live-Ford connection precondition + passive-only rule (owner review_49)**: connecting the VCU CAN_1 transceiver to the **live OEM Ford CAN_1 network** (first done at Gate 05J) is permitted **only** after **Gate 05H listen-only proof + Gate 05I-C CAN_1 silence proof + TXD pin monitored + no TX mailboxes + silent register verified + no ACK on bench + Ford baseline scan before connection**; procedure = **Ford baseline scan → connect VCU passive listen-only → Ford post-connection scan → compare before/after DTCs/errors/warnings** (a "clean cluster" alone is insufficient — capture baseline + post scan + TXD scope + CAN analyzer log + firmware/register dump); the VCU may **only** connect **passive listen-only** — no transmit path / no ACK / no active error frames / no wake commands / no spoofed Ford modules | batch_52 (unguarded live-bus connection) | n/a — controls-safety rule | **ControlsSafety / ProofRequirement** — recorded in `docs/status/GATE05J_VEHICLE_FITMENT.md` (extends RC-136/142/148/186/216) — lanes L7 |
| RC-231 | **Parasitic-draw must separate OEM/conversion/total (owner review_49)**: the ≤4.0 mA is the **conversion-added** target, not the whole truck (the Ford chassis has its own OEM sleep draw) → measure + log **`OEM_baseline_sleep_current` / `conversion_added_sleep_current` (≤4.0 mA target) / `total_vehicle_sleep_current`** separately; report Elektron's addition against the OEM baseline, not the whole-vehicle draw | batch_52 (draw conflation) | n/a — parameter rule | **NeedsSupplierData / ControlsSafety** — recorded in `docs/status/GATE05J_VEHICLE_FITMENT.md` — lanes L7/L8 |
| RC-232 | **Gate 05J fitment values are target profiles + "live OEM Ford" wording (owner review_49, RECURRENCE — thirteenth artifact)**: 50 mm / 100 mm clearance, <0.1 Ω ground bond, ≤4.0 mA, ≤2.0 s = `INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_REQUIRED / FINAL_LIMIT_PENDING_SOURCE-TEST-VEHICLE-PACKAGE / NO_HV_AUTHORITY` (the real clearance rule depends on temperature / abrasion / movement-envelope / protection method); "production-level Ford network channels" → **"live OEM Ford CAN_1 network"** | batch_52 (invented values + naming) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05J_VEHICLE_FITMENT.md` (extends RC-220/225) — lanes L7/L8 |
| RC-233 | **Duplicate Gate 05K sections — keep the second (owner review_50)**: the Hunter delivered two Gate 05K sections; the earlier 5-test version (05K-001..005) conflicts with the cleaner 9-test second version (05K-001..009: ignition-off quiescent draw, accessory transition, key-on/run wake, CAN_1 passive monitoring, isolated CAN_2/CAN_3 comms, UDS session access, HV lockout enforcement, Ford system error immunity, in-chassis fault-latch survival) → **keep the second version; the first is archived-superseded** to avoid conflicting requirements | batch_53 (duplicate/conflicting spec) | n/a — evidence-hygiene rule | **EvidenceHygiene / GateStatus** — the deliverable `docs/status/GATE05K_VEHICLE_POWER_ON.md` uses the 9-test version; the first is preserved 1:1 in the raw archive only — lanes L7 |
| RC-234 | **05J-003 parasitic-draw row must use the split wording (owner review_50, RECURRENCE of RC-231)**: the 05J-003 matrix row still read "Total sleep current draw must be ≤4.0 mA" → **`conversion_added_sleep_current` ≤4.0 mA initial chassis target; `OEM_baseline_sleep_current` and `total_vehicle_sleep_current` measured + logged separately** (`total_vehicle = OEM_baseline + conversion_added`) | batch_53 (draw conflation recurrence) | n/a — parameter rule | **NeedsSupplierData / ControlsSafety** — fixed in `docs/status/GATE05J_VEHICLE_FITMENT.md` 05J-003 (realizes RC-231 into the row) — lanes L7/L8 |
| RC-235 | **Gate 05J/05K hard numbers are still target profiles (owner review_50, RECURRENCE — fourteenth artifact)**: 50 mm / 100 mm clearance, <0.1 Ω, ≤4.0 mA, ≤2.0 s, **≤200 ms module wake, ≤500 ms display wake, ≤50 ms UDS response, ≤0.5 V rail drop, ≤5% APPS channel correlation, ≤100 ms brake override** = `INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_REQUIRED / NO_HV_AUTHORITY / NO_VEHICLE_MOTION_AUTHORITY` — none is a universal final rule until sourced, measured, reviewed, and tied to the actual hardware | batch_53 (invented values — 05K set) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05K_VEHICLE_POWER_ON.md` (extends RC-220/225/232) — lanes L7/L8 |
| RC-236 | **Gate 05K must explicitly block real HV contactor closure (owner review_50)**: even with the HV battery disconnected, the system must not practice real contactor actuation → **"All HV contactor coils must remain disconnected, replaced with approved dummy loads, or verified mechanically unable to close; no real HV contactor closure is permitted in Gate 05K"**; contactor drive pins monitored and held at 0.0 V under every driver input / illegal-state request | batch_53 (unguarded contactor actuation) | n/a — controls-safety rule | **ControlsSafety / HardBlock** — recorded in `docs/status/GATE05K_VEHICLE_POWER_ON.md` (05K-007; extends RC-150/152/157/158/171/205) — lanes L7 |
| RC-237 | **Gate 05L must not open with "exact HV pre-charge timing" — split into 05L-A authorization first (owner review_50, amends D-008)**: Gate 05L is the first live-HV risk category → the ladder's 05L rung begins with **Gate 05L-A — HV First-Energization Authorization & Safety Readiness** (qualified HV personnel · written test plan · LOTO · PPE + insulated tools · emergency-stop plan · rescue/emergency-response plan · fire watch/exclusion zone · absence-of-voltage verification · HV connector/cable inspection · isolation-monitor readiness · pre-charge ownership confirmation · contactor ownership confirmation · test-instrument calibration · supplier documentation · hard-stop conditions · proof artifacts · signoff) **before** any energization sequence; no final pre-charge/voltage/insulation/contactor timing unless supplier docs or engineering review provide them; owner cited **OSHA LOTO** (authorized-employee lockout; circuits energized until LOTO/de-energize/ground; only qualified persons on energized parts) + **NHTSA EV HV-hazard** guidance (assume HV components energized) | batch_53 (premature HV timing) | OSHA 1910.147 / 1910.333 + NHTSA EV guidance — **NeedsExactSource** (owner-paraphrased, not archived) | **ControlsSafety / RegulatoryCandidate** — amends D-008; queued as Gate 05L-A NEXT in `GATE_RESEARCH_QUEUE.md` — lanes L5/L7 |
| RC-238 | **"certified HV technicians" → "qualified / authorized HV personnel" (owner review_51)**: "certified" is ambiguous without a certification body → **minimum two qualified and authorized HV personnel** with role evidence: documented HV training · task authorization · equipment-specific training · emergency-response briefing · assigned lead technician · assigned safety observer/safety buddy; fits OSHA's qualified-person work-practice language | batch_54 (ambiguous credential) | OSHA 1910.333/1910.332 qualified-person — **NeedsExactSource** (owner-paraphrased) | **ControlsSafety / RegulatoryCandidate** — recorded in `docs/status/GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-001) — lanes L5 |
| RC-239 | **PPE must be voltage-matched, not universal Class 0 (owner review_51)**: Class 0 (1000 V) is directionally right only for systems at/below that rating → **Class 0 minimum only if system max + task exposure are within rating; final PPE + tool + meter class must match pack max voltage, possible transient voltage, and the site electrical-safety review; if the system exceeds the glove/tool rating the gate must block** | batch_54 (universal PPE rating) | OSHA insulating-glove voltage-rating guidance — **NeedsExactSource** (owner-paraphrased) | **ControlsSafety / RegulatoryCandidate** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-002 + value doctrine) — lanes L5 |
| RC-240 | **Fire/emergency response is not simply "Class D" (owner review_51)**: lithium-ion EV fire response is not a single extinguisher class → **assets selected by the facility safety officer / AHJ / fire marshal per battery chemistry, pack size, test configuration, and supplier emergency response guide**; the fire watch must include emergency shutoff plan · evacuation route · upwind/uphill staging (where applicable) · direct 911/fire-department protocol · battery supplier ERG · post-event quarantine/re-ignition monitoring plan; NHTSA: assume HV components energized, toxic/flammable gases + delayed re-ignition possible | batch_54 (over-simple fire spec) | NHTSA EV emergency-response guidance — **NeedsExactSource** (owner-paraphrased) | **ControlsSafety / RegulatoryCandidate** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (§1 fire/emergency) — lanes L5 |
| RC-241 | **Live-Dead-Live must not rely only on a 12 V source; absence threshold is resolution-aware (owner review_51, invented-values RECURRENCE — fifteenth artifact)**: proving on 12 V proves the meter alive but may not verify meter/range for HV → **use an approved proving/known source appropriate to the meter function + range per the site electrical-safety procedure**; "0.0 V exactly" → **"below the approved absence-of-voltage threshold, considering meter resolution/noise; any unexpected non-zero voltage triggers hard stop"**; the >0.5 V abort = `INITIAL_AVV_ABORT_TARGET / ENGINEERING_REVIEW_REQUIRED` (with ≥3 m radius, ±5% pre-charge R, >0.2 V leakage, ≥800 V reference as target profiles) | batch_54 (AVV method + invented threshold) | site electrical-safety procedure / OSHA verification-of-de-energization — **NeedsExactSource** | **ControlsSafety / NoGateAuthority** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-004 + value doctrine; extends RC-235) — lanes L5/L7 |
| RC-242 | **Add a stored-energy discharge-wait rule (owner review_51)**: inverter DC-link capacitors can remain charged after the battery is isolated → **after any HV exposure or failed energization attempt, wait the supplier-defined discharge interval before touching/measuring internal HV nodes, then re-verify bus voltage with Live-Dead-Live before access** | batch_54 (missing stored-energy rule) | n/a — controls-safety rule (supplier discharge interval PENDING) | **ControlsSafety / NeedsSupplierData** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (§3 stored-energy) — lanes L5 |
| RC-243 | **IMD insulation status needs a supplier-defined threshold (owner review_51)**: "asserts high insulation resistance status / nominal" is a concept, not a rule → **"IMD reports no internal error and measured isolation status within the supplier-defined acceptable range; final insulation thresholds pending IMD supplier manual + system voltage + engineering review + applicable safety-standard mapping"** | batch_54 (unsourced insulation threshold) | IMD supplier manual + safety standard — **NeedsSupplierData / NeedsExactSource** | **NeedsSupplierData / ControlsSafety** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-005) — lanes L5/L9 |
| RC-244 | **Pre-charge loop test in 05L-A is low-voltage logic/coil verification only (owner review_51)**: the pre-charge control-relay check is OK only with no HV present → **"pre-charge control response in 05L-A is low-voltage logic/coil verification only; no HV bus charging, no DC-link rise, and no live pre-charge event occurs in 05L-A"** (the live current-limited pre-charge belongs to Gate 05L-B) | batch_54 (premature pre-charge actuation) | n/a — gate-scope rule | **ControlsSafety / HardBlock** — recorded in `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-007; any DC-link rise = abort) — lanes L5/L7 |
| RC-245 | **Gate 05L-B pre-charge/contactor thresholds are initial bench targets, not final gate logic (owner review_52, RECURRENCE — sixteenth artifact)**: ≥95% pre-charge completion, ≤500 ms timeout, ≤50 ms contactor-feedback mirror, ≤60 V discharge, ≤5% ΔV = `INITIAL_BENCH_TARGET / SUPPLIER_DATA_PENDING / ENGINEERING_REVIEW_REQUIRED` → operative rule "V_caps reaches the **supplier-defined** pre-charge completion threshold within the **supplier-defined** timeout; V_caps near pack voltage with acceptable ΔV before main-positive closure"; final thresholds pending supplier pre-charge docs + contactor datasheet + inverter DC-link capacitance + BMS/PDU control manual + engineering review | batch_55 (invented HV timing/voltage) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` (extends RC-235/241) — lanes L5/L7/L9 |
| RC-246 | **Contactor sequence is supplier-specific, not universal (owner review_52)**: "main-negative first → pre-charge → main-positive after ΔV" is one architecture, not a rule → **the Build Engine may model negative-first / positive-first / pre-charge-first / integrated BDU/PDU-managed topologies; the final sequence requires the BMS/PDU supplier wiring diagram + controls-engineer approval** | batch_55 (universal contactor order) | BMS/PDU supplier wiring diagram — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (authority split; BQ-27) — lanes L7/L9 |
| RC-247 | **VCU does not own contactor/pre-charge closure unless the supplier architecture assigns it (owner review_52, extends RC-205/227)**: the draft "VCU commands main-negative/main-positive/pre-charge" over-claims → **VCU = REQUESTER / MONITOR unless documented; BMS/PDU is the likely owner of contactor/pre-charge execution; the hardwired safety loop owns the emergency-interruption path**; split each 05L-B test into request signal / actual owner / feedback signal / measured HV response / abort condition | batch_55 (VCU authority over-claim) | n/a — controls-authority rule (D-007) | **ControlsSafety / OwnershipRule** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (per-test ownership split; BQ-27) — lanes L7 |
| RC-248 | **"Current-limited" needs a real current-limit definition (owner review_52)**: the title claims current limiting but never defines it → **current-limit source `SUPPLIER_DEFINED / ENGINEERING_APPROVED`; required before 05L-B: pre-charge resistor resistance · resistor pulse-energy rating · DC-link capacitance · pack max voltage · expected peak pre-charge current · resistor thermal-recovery interval · pre-charge retry limit — without these 05L-B stays BLOCKED** | batch_55 (undefined current limit) | supplier pre-charge/resistor datasheets — **NeedsSupplierData** | **NeedsSupplierData / HardBlock** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (blocking prerequisites) — lanes L5/L9 |
| RC-249 | **Add a manual E-stop abort row for the first live-HV gate (owner review_52)**: timeout + weld sim are not enough — the first live-HV gate must prove the human abort path → **05L-B-007 Manual Abort During Pre-Charge: press E-stop during pre-charge → the hardwired loop interrupts the contactor/pre-charge control path, the VCU logs the abort if still powered, the BMS/PDU goes to its supplier-defined safe state, NO automatic retry**; proof = control-line-drop scope trace + CAN log + HV bus decay + E-stop timestamp | batch_55 (missing human abort proof) | n/a — controls-safety rule | **ControlsSafety / ProofRequirement** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-007; extends RC-205/227) — lanes L7 |
| RC-250 | **Do not jump to Gate 05M after 05L-B — insert Gate 05L-C first (owner review_52, amends D-008 ladder)**: after first energization the next gate is **Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization Repeatability** (normal shutdown · emergency shutdown · stored-energy discharge · restart lockout · pre-charge retry limits · IMD fault response · contactor-feedback consistency · no weld false negatives · repeat-cycle stability); inverter enable / motor spin (Gate 05M) only after 05L-C | batch_55 (premature jump to spin) | n/a — gate-ladder rule | **GateStatus / ControlsSafety** — amends D-008; queued as Gate 05L-C NEXT in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-251 | **IMD insulation thresholds remain candidate/pending (owner review_52, extends RC-243)**: the Hunter's "final insulation resistance thresholds (e.g., 100 Ω/V or 500 Ω/V)" are **candidate values, not rules** → pending the IMD supplier operational manual + absolute system operating voltage + internal engineering review + applicable safety-standard mapping (FMVSS 305 or ISO 6469-3); IMD must report zero internal errors + isolation within the supplier-defined range | batch_55 (unsourced insulation numbers) | IMD supplier manual + FMVSS 305 / ISO 6469-3 — **NeedsSupplierData / NeedsExactSource** | **NeedsSupplierData / RegulatoryCandidate** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (value doctrine) + `GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md` (05L-A-005) — lanes L5/L9 |
| RC-252 | **Gate 05L-B/05L-C timing/voltage numbers are target profiles, not final gate logic (owner review_53, RECURRENCE — seventeenth artifact)**: ≤50 ms contactor feedback, ΔV ≤5%, ≥95% V_batt, ≤500 ms pre-charge timeout, >60 V discharge, ≤20 ms E-stop dropout, ≤2 retry attempts, 10 repeat cycles = `INITIAL_TARGET_PROFILE / SUPPLIER_DATA_REQUIRED / ENGINEERING_REVIEW_REQUIRED / LIVE_HV_AUTHORITY_PENDING` → "final thresholds are supplier-defined and engineering-approved; initial target values may be used for observation and test planning only" | batch_56 (invented HV timing/voltage) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `GATE05L_B_HV_FIRST_ENERGIZATION.md` + `docs/status/GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (extends RC-245) — lanes L5/L7/L9 |
| RC-253 | **05L-B-001 must not require V_caps = 0.0 V (owner review_53)**: depending on inverter/PDU topology, sensing, leakage paths, or measurement reference, exact zero may not hold → **"no unintended DC-link rise beyond the approved leakage/noise threshold; V_caps behaviour must match supplier-defined topology expectations"** (safer than demanding exactly zero) | batch_56 (impossible exact-zero) | n/a — parameter rule (extends RC-241) | **ControlsSafety / NeedsSupplierData** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-001) — lanes L5/L7 |
| RC-254 | **05L-B-004 timeout wording is backwards (owner review_53)**: "time counter crosses ≤500 ms timeout limit" is inverted — a timeout is when elapsed time **exceeds** the limit → **"if V_caps fails to reach the supplier-defined pre-charge completion threshold before the supplier-defined timeout expires, the BMS/PDU aborts, opens contactor/pre-charge outputs, logs the pre-charge-timeout DTC, and blocks retry per approved policy; initial observation target 500 ms, final timeout supplier-defined"** | batch_56 (inverted timeout logic) | n/a — logic-correctness rule | **Correctness / ControlsSafety** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-004) — lanes L7 |
| RC-255 | **E-stop must not say "instantly" (owner review_53, "instant/immediate" RECURRENCE)**: "all contactors drop out instantly" → **"the hardwired safety loop interrupts the contactor/pre-charge coil supply; dropout timing is measured and compared against the supplier-approved dropout target; no automatic retry is permitted"** ("instant" is never a clean engineering word) | batch_56 ("instant" wording) | n/a — measurement rule | **ControlsSafety / NoGateAuthority** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-007; extends RC-175/198/204/211/225) — lanes L7 |
| RC-256 | **05L-C IMD fault injection needs strict fixture language (owner review_53)**: "inject a resistance path between DC+ and chassis ground" must not read like manually attaching a resistor to a live HV rail → **"isolation fault injection may only be performed using an approved, rated, current-limited HV isolation-test fixture or the IMD supplier-supported test method; manual ad-hoc resistance insertion onto live HV rails is forbidden"** (NHTSA: assume HV energized; exposed HV components present shock hazards) | batch_56 (dangerous ad-hoc injection) | NHTSA EV HV-hazard — **NeedsExactSource** (owner-paraphrased) | **ControlsSafety / HardBlock** — recorded in `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (05L-C-004) — lanes L5/L7 |
| RC-257 | **05L-C-001 shutdown order is supplier-specific (owner review_53, extends RC-246)**: "main-positive first, then main-negative" is one architecture, not universal → **"the contactor opening sequence must follow the BMS/PDU supplier-defined shutdown architecture; initial expected sequence supplier-defined; blocked: any sequence that violates supplier contactor/PDU documentation, creates unintended DC-link persistence, or leaves an unsafe energized path"** | batch_56 (universal shutdown order) | BMS/PDU supplier shutdown architecture — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — recorded in `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (05L-C-001; BQ-27) — lanes L7/L9 |
| RC-258 | **05L-C-005 weld test is mislabeled — split false-positive vs false-negative (owner review_53)**: the title "No Weld Detection False Negatives" but the criterion tested false positives → **two tests: 05L-C-005A Weld-Detection False Positive (normal contactor bounce must not falsely trigger a weld fault) + 05L-C-005B Weld-Detection False Negative (a simulated welded feedback state is always detected and blocks re-energization)** | batch_56 (conflated weld test) | n/a — test-design rule | **TestCoverage / ControlsSafety** — recorded in `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (05L-C-005A/B) — lanes L7 |
| RC-259 | **The 05M traction phase must be STAGED — the first 05M gate is not "low-speed traction" (owner review_53, amends D-008 ladder)**: after 05L-C the traction phase splits **05M-A — Inverter Enable Readiness / Zero-Torque Validation → 05M-B — No-Load Motor Spin Validation → 05M-C — Controlled Low-Speed Traction Readiness**; the **first traction-inverter gate proves inverter enable with ZERO torque and ZERO rotation before any spin** — do not call the first 05M gate "low-speed traction" | batch_56 (premature traction naming) | n/a — gate-ladder rule | **GateStatus / ControlsSafety** — amends D-008; queued as Gate 05M-A NEXT in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-260 | **All numeric thresholds in Gates 05L-B/05L-C/05M-A are target profiles (owner review_54, RECURRENCE — eighteenth artifact)**: ≤50 ms contactor feedback, ΔV ≤5%, ≥95% V_batt, 500 ms pre-charge timeout, >60 V discharge, ≤20 ms E-stop dropout, ≤2 retry, 10 cycles, **50 ms inverter watchdog, 0 A phase current, 0% PWM, zero resolver drift** = `INITIAL_TARGET_PROFILE`; final limits require `SUPPLIER_DATA + ENGINEERING_REVIEW + LIVE_HV_TEST_PLAN_APPROVAL + BENCH/CHASSIS PROOF` | batch_57 (invented HV/inverter values) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` + `GATE05L_B_HV_FIRST_ENERGIZATION.md` (extends RC-245/252) — lanes L5/L7/L9 |
| RC-261 | **Pre-charge RC-curve wording is too perfect (owner review_54)**: real systems show pack sag, sensor filtering, capacitance tolerance, leakage, bleeders, BMS/PDU measurement delays → **"V_caps rise must fall within the supplier-approved expected pre-charge envelope based on R_pre, C_link, V_batt, measurement tolerance, leakage paths, and BMS/PDU sampling delay; a simple RC curve V_caps(t)=V_batt(1−e^(−t/RC)) may be used as the first-order comparison model only"** | batch_57 (over-idealized curve) | supplier pre-charge envelope — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-002) — lanes L5/L7 |
| RC-262 | **05L-B-007 E-stop failure wording must be explicit (owner review_54)**: the abort condition should read **"blocked / failure: automatic retry occurs after manual E-stop · dropout timing exceeds the supplier-approved target · contactor/pre-charge coil supply remains energised after E-stop"** — **no automatic retry after E-stop, ever** | batch_57 (vague abort wording) | n/a — controls-safety rule | **ControlsSafety / HardBlock** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-007; extends RC-249) — lanes L7 |
| RC-263 | **05L-C-001 shutdown order is STILL supplier-specific (owner review_54, RECURRENCE of RC-257 — Hunter re-emitted unfixed)**: "main-positive first, then main-negative" is not universal → **"the normal shutdown contactor sequence must follow the BMS/PDU supplier-defined shutdown architecture; blocked: any sequence that violates supplier documentation, leaves an unintended energized path, or prevents verified DC-link discharge"** | batch_57 (regression of RC-257) | BMS/PDU supplier shutdown architecture — **NeedsSupplierData** | **NeedsSupplierData / RegressionWatch** — `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` already holds the corrected wording (batch_56); M10 regression-scanner case — lanes L7/L9 |
| RC-264 | **05L-C IMD fault injection STILL needs safe fixture wording (owner review_54, RECURRENCE of RC-256 — Hunter re-emitted unfixed)**: "inject a resistance path between DC+ and chassis ground" → **"isolation fault injection may only be performed using an approved, rated, current-limited HV isolation-test fixture or the IMD supplier-supported test method; manual ad-hoc resistance insertion onto live HV rails is forbidden"** (hard rule; NHTSA: assume HV energized) | batch_57 (regression of RC-256) | NHTSA EV HV-hazard — **NeedsExactSource** | **ControlsSafety / RegressionWatch** — `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` already holds the corrected wording (batch_56); M10 regression-scanner case — lanes L5/L7 |
| RC-265 | **Gate 05M-A must not assume 0% PWM / enable real inverter switching (owner review_54)**: inverters define "enabled/ready/gate-enabled/torque-enabled/PWM-active" differently and **some switch even at zero torque** → **"Gate 05M-A validates the supplier-defined inverter ready / torque-disabled state; no traction torque command · no intentional motor rotation · no vehicle movement · no driver torque authority · no power-stage switching unless the supplier documentation explicitly defines it as part of a safe zero-torque readiness state and engineering approves it"** | batch_57 (assumed inverter safe state) | inverter supplier state definitions — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — recorded in `GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (inverter-state rule + 05M-A-004) — lanes L7/L9 |
| RC-266 | **Gate 05M-A is readiness, not spin (owner review_54)**: 05M-A proves the inverter boots with a live DC bus, the VCU/inverter handshake is aligned, the inverter stays torque-disabled, phase-current sensors read within supplier offset limits, resolver feedback is plausible, watchdog loss forces the supplier-defined safe state, and **no unintended torque/rotation/current occurs**; **do not jump to 05M-B until 05M-A is proven** (05M-B is the first controlled no-load spin) | batch_57 (readiness-vs-spin scope) | n/a — gate-scope rule | **GateStatus / ControlsSafety** — recorded in `GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (what-05M-A-proves + exit) — lanes L7 |
| RC-267 | **Global target-profile rule for Gates 05L-B/05L-C/05M-A/05M-B (owner review_55, RECURRENCE — nineteenth artifact)**: all numeric values (≤50 ms, ≤500 ms, ΔV ≤5%, >60 V, ≤20 ms, ≤2 attempts, 10 cycles, ≤50 ms watchdog, ≤2% torque, 500 RPM, ±1.0° electrical, ≤3% phase balance, 0.0 A, 0 RPM) are `INITIAL_TARGET_PROFILE` unless explicitly upgraded to `SUPPLIER_DEFINED`/`ENGINEERING_APPROVED`; **no numeric threshold may create gate authority until tied to supplier documentation + engineering review + test-instrument method + raw proof artifact + signed approval** | batch_58 (false precision) | n/a — parameter rule | **NeedsSupplierData / NoGateAuthority** — recorded in `docs/status/GATE05M_B_NO_LOAD_MOTOR_SPIN.md` (global value doctrine) + across the 05L-B/05L-C/05M-A/05M-B deliverables (extends RC-245/252/260) — lanes L5/L7/L9 |
| RC-268 | **05L-C-001 shutdown order is STILL supplier-specific (owner review_55, THIRD occurrence of RC-257/263)**: the Hunter re-emitted "main-positive first, then main-negative ≤50 ms" a third time → **"the normal shutdown contactor sequence must follow the supplier-defined BMS/PDU shutdown architecture; blocked: any sequence that violates supplier documentation, leaves an unintended energized path, prevents verified DC-link discharge, or shows a command↔auxiliary-contact feedback mismatch"**; exit criteria reworded to "normal coordinated shutdowns follow the supplier-defined contactor opening sequence" | batch_58 (third regression of RC-257) | BMS/PDU supplier shutdown architecture — **NeedsSupplierData** | **NeedsSupplierData / RegressionWatch** — `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` holds the corrected wording + the added feedback-mismatch block; strongest M10 regression-scanner case (3× recurrence) — lanes L7/L9 |
| RC-269 | **05L-B pre-charge RC curve is STILL too perfect (owner review_55, SECOND occurrence of RC-261)**: the Hunter re-emitted V_caps(t)=V_batt(1−e^(−t/RC)) as the pass condition → **"the first-order RC curve is a comparison model only; the accepted pre-charge envelope must be supplier-approved and account for R_pre tolerance, C_link tolerance, pack voltage sag, measurement filtering, leakage paths, bleeder paths, and BMS/PDU sampling delay; pass = V_caps rise remains within the supplier-approved pre-charge envelope"** | batch_58 (second regression of RC-261) | supplier pre-charge envelope — **NeedsSupplierData** | **NeedsSupplierData / RegressionWatch** — `GATE05L_B_HV_FIRST_ENERGIZATION.md` holds the corrected wording (05L-B-002); M10 regression-scanner case — lanes L5/L7 |
| RC-270 | **Gate 05M-A needs tolerance wording, not perfect zero (owner review_55)**: "0.0 A / zero signal deviation / zero coupled EMI" is physically impossible (sensors always have noise) → **"within the supplier-defined zero-current threshold / within the supplier-defined resolver noise-drift tolerance / no torque-producing current beyond the approved threshold / no unintended shaft movement"** — bounded, explainable, supplier-approved noise | batch_58 (impossible perfect zero) | supplier sensor/resolver tolerances — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — fixed in `GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (05M-A-003/004) — lanes L7/L9 |
| RC-271 | **Gate 05M-A must not say "Ready-to-Drive" (owner review_55)**: "step vehicle into an active Ready-to-Drive state" sounds like propulsion authority → **"step the inverter into its supplier-defined ready / torque-disabled state; driver torque authority remains masked; no traction command is enabled"** (keeps 05M-A clearly non-propulsive) | batch_58 (propulsion-sounding wording) | n/a — controls-safety wording rule | **ControlsSafety / NoGateAuthority** — fixed in `GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (05M-A-004) — lanes L7 |
| RC-272 | **Gate 05M-B physical boundary must be stronger (owner review_55)**: "uncoupled from driveshafts/axles/gearboxes" is right but insufficient → 05M-B requires a **guarded rotating shaft · no driveline attachment · no wheel torque path · no vehicle-movement path · emergency stop active · exclusion zone active · supplier-defined spin profile only · no cabin driver pedal authority**; the ≤2% torque and 500 RPM values are **initial spin-profile targets pending supplier approval**, not final | batch_58 (weak spin boundary) | supplier spin profile — **NeedsSupplierData** | **ControlsSafety / HardBlock** — recorded in `GATE05M_B_NO_LOAD_MOTOR_SPIN.md` (physical boundary + matrix) — lanes L7/L9 |
| RC-273 | **05L-B-005 must not use "absolute 0.0 V"/"immediately" (owner review_56, extends RC-270)**: literal zero + "immediate" violate the no-absolute-zero telemetry rule → **"coil drive lines remain in the supplier-defined OFF state and below the approved off-state leakage threshold; the power-up sequence is blocked before any coil-output enable command is issued"** | batch_59 (absolute-zero telemetry) | supplier off-state leakage threshold — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — fixed in `GATE05L_B_HV_FIRST_ENERGIZATION.md` (05L-B-005) — lanes L5/L7 |
| RC-274 | **05L-C-004 must not say "immediate" isolation shutdown (owner review_56, "instant/immediate" RECURRENCE)**: IMD detection has real measurement time, filtering, CAN timing, and BMS/PDU decision delay → **"system isolation shutdown within the supplier-defined IMD/BMS/PDU response window"** (not "immediate") | batch_59 ("immediate" wording) | supplier IMD/BMS/PDU response window — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — fixed in `GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (exit criterion 3; extends RC-175/198/204/211/225/255) — lanes L5/L7 |
| RC-275 | **05M-A STILL says "Ready-to-Drive" (owner review_56, RECURRENCE of RC-271)**: the Hunter re-emitted "step vehicle into an active Ready-to-Drive state" → **"step the inverter into its supplier-defined ready / torque-disabled state; driver torque authority remains masked; no traction command is enabled; no intentional motor rotation is permitted"** ("Ready-to-Drive" sounds like propulsion authority) | batch_59 (regression of RC-271) | n/a — controls-safety wording rule | **ControlsSafety / RegressionWatch** — `GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (05M-A-004) already holds the corrected wording; M10 regression-scanner case — lanes L7 |
| RC-276 | **05M-B watchdog blocked-state is wrong — coasting is not the failure (owner review_56)**: "motor continuing to spin" is not a failure (an uncoupled shaft coasts from inertia after torque is removed) → blocked = **"the inverter continues actively driving the motor · phase current persists beyond the approved decay window · torque command remains active after watchdog loss · the inverter fails to enter its supplier-defined safe state"**; coasting is fine, **continuing to be powered is the failure** | batch_59 (wrong failure condition) | n/a — logic-correctness rule | **Correctness / ControlsSafety** — fixed in `GATE05M_B_NO_LOAD_MOTOR_SPIN.md` (05M-B-005) — lanes L7 |
| RC-277 | **05M-B over-speed test must be supplier-supported (owner review_56)**: "temporarily lower the software over-speed limit below current RPM" reads like casually editing a safety limit while spinning → **"use a supplier-supported test mode or pre-approved calibration profile to trigger over-speed protection at a controlled low RPM; live safety-limit modification during uncontrolled rotation is forbidden"** | batch_59 (unsafe live-limit edit) | supplier test mode / calibration profile — **NeedsSupplierData** | **ControlsSafety / HardBlock** — fixed in `GATE05M_B_NO_LOAD_MOTOR_SPIN.md` (05M-B-004) — lanes L7/L9 |
| RC-278 | **Gate 05M-C must be SPLIT before any real movement (owner review_56, amends D-008 ladder)**: the Hunter's 05M-C "wheels + gear reductions fully linked" jumps to open-floor movement → split **05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness → 05M-C2 — Restricted Creep Torque Validation → 05M-C3 — Controlled Closed-Area Low-Speed Movement**; the first coupled test (05M-C1) proves mechanical coupling, driveline backlash, wheel-speed sensing, brake override, and torque clamp **with the wheels lifted** before any open-floor operation | batch_59 (premature open-floor movement) | n/a — gate-ladder rule | **GateStatus / ControlsSafety** — amends D-008; queued as Gate 05M-C1 NEXT in `GATE_RESEARCH_QUEUE.md` — lanes L7 |
| RC-279 | **"Hand-lock one lifted wheel" is forbidden (owner review_57, SAFETY-CRITICAL)**: manual hand restraint near rotating driveline components is dangerous → **"use an approved mechanical wheel restraint / differential test fixture / rated hub-locking fixture; manual hand restraint near rotating driveline components is forbidden — no hands near rotating wheels, shafts, hubs, belts, or couplers, ever"** | batch_60 (dangerous manual restraint) | n/a — controls-safety rule (rotating-machinery guarding) | **ControlsSafety / HardBlock** — recorded in `docs/status/GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` (05M-C1-005 + no-manual-restraint rule) — lanes L4/L7 |
| RC-280 | **Gate 05M-C1 Lifted Chassis Safety Rule (owner review_57)**: the vehicle coupled to lifted wheels is a major mechanical hazard → 05M-C1 may **only** run on a **rated chassis lift or rated heavy-duty stands approved for the vehicle GVWR/axle load**; secured against roll; suspension droop accounted for; wheel-rotation zones guarded; **no personnel inline with rotating tires/shafts/hubs; no person may be under the vehicle while energized rotation tests are active**; E-stop + exclusion zone active | batch_60 (missing lift safety) | rated-lift/stand + rotating-machinery guarding — **NeedsExactSource** (owner-paraphrased) | **ControlsSafety / HardBlock** — recorded in `GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` (Lifted Chassis Safety Rule) — lanes L4/L7 |
| RC-281 | **05M-C1 brake-override must not say "instantly"/"immediately" (owner review_57, "instant/immediate" RECURRENCE)**: "the VCU must instantly clear traction torque / brake activation immediately overrides" → **"the VCU clears traction torque commands within the approved brake-override response window; inverter phase current decays within the approved threshold; the mechanical brakes slow/stop the lifted wheels without the inverter fighting the service brakes"** | batch_60 ("instantly" wording) | supplier/engineering brake-override response window — **NeedsSupplierData** | **NeedsSupplierData / ControlsSafety** — fixed in `GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` (05M-C1-003; extends RC-175/198/204/211/225/255/274) — lanes L7 |
| RC-282 | **Wheel-speed data is read-only, not control authority (owner review_57, extends RC-172/230)**: "the VCU pulls speed data independently from ABS/wheel encoders" conflicts with CAN_1 listen-only / no-factory-injection → **"wheel-speed data may be observed only through an authorized read-only path, passive logging path, or independent external instrumentation; factory ABS/ESC data must not become traction-control authority unless Ford-authorized documentation + engineering review approve it"**; for now wheel-speed parity is **verification, not control authority** | batch_60 (factory-bus control authority) | Ford ABS/ESC authorization — **NeedsExactSource / NeedsVehicleSpecificBBLB** | **ControlsSafety / ProofRequirement** — recorded in `GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` (wheel-speed read-only rule + 05M-C1-002) — lanes L7 |
| RC-283 | **Gate 05M-C2 must not default to a "low-friction surface" (owner review_57)**: low-friction causes wheel slip / weird ABS/ESC reactions / poor steering-brake feedback → for first ground movement use **"a flat, controlled, closed test surface with predictable traction, clear runout distance, wheel chocks/barriers staged, spotters positioned outside the movement path, and remote E-stop available"**; intentional low-friction testing is a **separate future gate** | batch_60 (unsafe default surface) — **RE-DEFAULTED in the batch_61 05M-C2 body (recurrence)** | n/a — controls-safety rule | **ControlsSafety / RegressionWatch** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (test-surface rule) + `GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` — lanes L7 |
| RC-284 | **Torque ramp-rate is `dT/dt`, not `dQ/dt` (owner review_58)**: "Q" reads as charge/heat/generalized quantity; the torque-command slope is **`dT_command/dt`** → "Torque Ramp-Rate Filter: `dT_command/dt`; rapid APPS input is permitted only as a controlled test input; the VCU torque output rises per the approved ramp-rate limiter, not raw pedal slope"; the ≤20 Nm/sec ramp + ≤30 Nm clamp are `INITIAL_TARGET_PROFILE` | batch_61 (wrong ramp-rate symbol + raw-pedal-slope) | n/a — notation + control-logic rule | **Correctness / ControlsSafety** — recorded in `docs/status/GATE05M_C2_RESTRICTED_CREEP.md` (ramp-rate doctrine; 05M-C2A-006) — lanes L7 |
| RC-285 | **Ground Movement Precondition before any creep torque (owner review_58)**: this is the first time the vehicle can actually roll → **no creep torque may be commanded unless service-brake function + brake assist + steering assist are verified, the E-stop is armed + the remote E-stop active, spotters + runout path clear, the torque clamp + ramp-rate limit active, and the engineer/test-lead gives explicit start authorization** | batch_61 (missing movement precondition) | n/a — controls-safety hard-block | **ControlsSafety / HardBlock** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (Ground Movement Precondition) — lanes L7 |
| RC-286 | **Gate 05M-C2 must be SPLIT — rollback/incline out of the first ground-contact gate (owner review_58, amends D-008 ladder)**: → **05M-C2A Flat-Ground Restricted Creep → 05M-C2B Controlled Incline / Rollback Hold Validation → 05M-C2C Faulted Creep Recovery**; do flat-ground creep first, mark rollback/incline PROVISIONAL until 05M-C2A passes | batch_61 (rollback in first gate) | n/a — gate-ladder rule | **GateStatus / ControlsSafety** — amends D-008; recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A/B/C structure) — lanes L7 |
| RC-287 | **Breakaway-torque above the clamp is NEEDS_REVIEW, not an auto "mechanical binding" diagnosis (owner review_58)**: 05M-C2-002 "breakaway >30 Nm indicates mechanical binding" → **"breakaway above the approved creep clamp triggers `NEEDS_REVIEW` / `MECHANICAL_BINDING_CHECK`, not an automatic final diagnosis"** — it could be tire pressure, slope, brake drag, gear ratio, curb weight, axle load, or calibration | batch_61 (premature auto-diagnosis) | n/a — diagnostic-logic rule | **Correctness / ControlsSafety** — fixed in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-003) — lanes L7/L10 |
| RC-288 | **05M-C2 must drop "absolute 0 Nm" + "instantly" wording (owner review_58, no-absolute-zero + instant/immediate RECURRENCE)**: 05M-C2-001 "absolute 0 Nm" → "torque request remains within the supplier-defined zero-torque threshold"; 05M-C2-005 E-stop "torque drops to zero instantly" → "the inverter torque command transitions to zero and phase current decays within the supplier-approved response window; the vehicle coasts or is braked manually per the test plan" | batch_61 (absolute-zero + instant wording) — **RE-EMITTED again in batch_62 (full-draft regression)** | supplier zero-torque threshold / response window — **NeedsSupplierData** | **NeedsSupplierData / RegressionWatch** — fixed in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-002/008; extends RC-270/273/281) — lanes L7 |
| RC-289 | **Gate 05M-C2 matrix needs Proof Artifact + Authority Status + Build Engine Status columns (owner review_59)**: the 05M-C2 matrix must carry the same evidence structure as earlier gates → each row gets a **Proof Artifact** (time-synced APPS/brake/CAN torque-command log + phase-current-decay trace + vehicle-speed trace + video record + test-lead signoff), an **Authority Status** (`RESTRICTED_CREEP_ONLY / NO_NORMAL_DRIVING_AUTHORITY`), and a **Build Engine Status** (candidate/target — nothing Confirmed) | batch_62 (missing evidence structure) | n/a — evidence-structure rule | **EvidenceHygiene / ProofRequirement** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (status block + matrix) — lanes L7 |
| RC-290 | **A "hard reset" is too weak for a failed-creep / motion-related fault (owner review_59)**: "blocks re-energization or creep retries until a hard reset occurs" → **"blocks re-energization or creep retries until diagnostic review + fault-source correction + approved service clear + engineering/test-lead authorization"** — a hard reset alone must not clear a motion fault | batch_62 (weak fault recovery) | n/a — controls-safety rule | **ControlsSafety / HardBlock** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2C + exit criterion 8; extends RC-163/206/207) — lanes L7 |
| RC-291 | **Gate 05M-C2 must not automatically "unlock 15 km/h" (owner review_59)**: "unlocking track-surface speeds up to 15 km/h" is too strong → **"permits engineering review for Gate 05M-C3 controlled closed-area low-speed movement; any speed ceiling in 05M-C3 remains `INITIAL_TARGET_PROFILE` until engineering-approved"** — 15 km/h is not automatic just because 05M-C2 passed | batch_62 (auto speed-unlock) | supplier/engineering speed ceiling — **NeedsSupplierData** | **GateStatus / NoGateAuthority** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (exit authorization) — lanes L7 |
| RC-292 | **The `Authority Status` column must NOT read "Approved by &lt;role&gt;" (owner review_61)**: none of the 05M-C2A/05M-C2B tests has been executed, so "Approved by Lead Controls Engineer / Safety Director / …" falsely implies a passed/signed result → each row instead names a **`Required Approver: <role>`** and carries **`Authority Status: SIGNOFF_REQUIRED / NOT_EXECUTED`** + **`Build Engine Status: PENDING_EXECUTION`** | batch_64 (premature "Approved by" wording) | n/a — evidence-hygiene rule | **EvidenceHygiene / NoPrematureSignoff** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (evidence-structure block + status: `REQUIRED_APPROVERS_DEFINED`) — extends RC-289 — lanes L7 |
| RC-293 | **The Numeric Threshold Authority Rule applies to Gate 05M-C2A / 05M-C2B (owner review_61, extends RC-267)**: all numeric values — 0–5% APPS dead-band, ≤20 Nm/sec `dT_command/dt`, ≤30 Nm creep clamp, 15–25 Nm breakaway, ≤5% parity, ≤10 Nm brake-hold request, ≤1 m creep distance, <2° incline — are `INITIAL_TARGET_PROFILE` unless upgraded to `SUPPLIER_DEFINED`/`ENGINEERING_APPROVED`. **No threshold creates gate authority until tied to supplier data + calibrated measurement method + proof artifact + engineering signoff** | batch_64 (rule needed above the new split) | supplier/engineering thresholds — **NeedsSupplierData** | **ThresholdAuthority / NoGateAuthority** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (Numeric Threshold Authority Rule) — extends RC-267/284 — lanes L7 |
| RC-294 | **15–25 Nm breakaway is an EXPECTED range, NOT a final pass envelope (owner review_61, extends RC-287)**: for a heavy F-450/F-550 15–25 Nm may be too light depending on gearing, tire load, brake drag, axle ratio, grade, tire pressure, drivetrain config → "confirming controlled steps within the 15–25 Nm breakaway envelope" becomes **"mapping the actual breakaway torque baseline; values outside the initial expected range trigger NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not automatic failure"** | batch_64 (range treated as pass gate) | supplier/engineering breakaway baseline — **NeedsSupplierData** | **MeasurementDoctrine / NoAutoFail** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-003 + exit criterion 1) — extends RC-287 — lanes L7 |
| RC-295 | **Replace "absolute control" / "completely active" with measurable thresholds (owner review_61, extends RC-288)**: "vehicle crawls forward under absolute control" → **"within approved creep-speed, torque, and runout limits"**; "full steering and braking assistance remains completely active" → **"steering and braking assist remain within approved pressure, voltage, and response thresholds"** — no unmeasurable absolutes in a safety-critical spec | batch_64 (unmeasurable absolutes) | n/a — measurement-language rule | **MeasurementDoctrine / NoAbsolutes** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-003 + 05M-C2A-011) — extends RC-288 — lanes L7 |
| RC-296 | **Static brake-hold needs a measurable displacement threshold (owner review_61)**: "mechanical service brakes must completely hold the vehicle static" → **"vehicle displacement remains below the approved measurement threshold during the brake-hold torque request"** — measurable via wheel-speed / hub marker / video / external position sensor, not an unmeasurable "completely hold static" | batch_64 (unmeasurable brake-hold) | supplier/engineering displacement threshold — **NeedsSupplierData** | **MeasurementDoctrine / MeasurableThreshold** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-001 + exit criterion 1) — lanes L7 |
| RC-297 | **Bounded fault-injection rule (owner review_63)**: "artificially inject a minor tracking fault" must not imply random live fault creation on a moving vehicle → **"use a pre-approved, supplier-supported, or simulation-controlled fault-injection method to create a bounded tracking fault during restricted creep"**; random live hardware fault creation or uncontrolled wiring disconnection while moving is strictly forbidden | batch_66 (unsafe fault injection wording) | n/a — test-safety rule | **TestSafety / BoundedFaultInjection** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (bounded fault-injection rule + 05M-C2C + status `CONTROLLED_FAULT_INJECTION_ONLY`) — lanes L7 |
| RC-298 | **Brake + steering assist are a pre-movement HARD interlock, not just a check (owner review_63)**: **"no creep torque may be commanded by the VCU or executed by the inverter until brake assist and steering assist have passed formal pre-movement verification"** — auxiliary power / booster / steering-assist status registers are active soft-start prerequisites; the same channels are continuously monitored during creep for voltage sag / pressure drop | batch_66 (assist was verify-only) | supplier/engineering assist thresholds — **NeedsSupplierData** | **ControlsSafety / PreMovementInterlock** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (Pre-Movement Assistance Interlock + 05M-C2A-002/003/011 + status `BRAKE_ASSIST_INTERLOCK_REQUIRED`/`STEERING_ASSIST_INTERLOCK_REQUIRED`) — extends RC-285 — lanes L7 |
| RC-299 | **Separate procedure approval from result signoff — four-field approval model (owner review_63, GLOBAL Build Engine rule, extends RC-292)**: a row marked `PENDING_EXECUTION`/`STAGED FOR LOG` that also says "Approved by <role>" is a contradictory record → each row carries **`Required Approver`** + **`Procedure Approval Status`** (`APPROVAL_REQUIRED` → `APPROVED_FOR_CONTROLLED_EXECUTION`) + **`Execution Status`** (`NOT_EXECUTED` → `PENDING_EXECUTION` → `EXECUTED`) + **`Result Signoff Status`** (`NOT_ELIGIBLE` → `SIGNED_PASS`/`SIGNED_FAIL`/`NEEDS_REVIEW`); no `SIGNED_PASS` exists until executed | batch_66 ("Approved by" on unexecuted tests) | n/a — evidence-hygiene rule | **EvidenceHygiene / ApprovalVsSignoff** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (approval/execution record model + status `NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`) — extends RC-292 — lanes L7 |
| RC-300 | **Numeric Threshold Authority Rule expanded linkage (owner review_63, extends RC-267/293)**: no threshold has **pass, fail, block, or movement authority** until linked to **a source or engineering calculation + the applicable hardware/software configuration + a calibrated measurement method + an uncertainty/tolerance + a proof artifact + an approved procedure revision + a signed engineering authorization** — until then the value is a target, never a criterion | batch_66 (values sound final) | supplier/engineering thresholds — **NeedsSupplierData** | **ThresholdAuthority / FullLinkage** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (Numeric Threshold Authority Rule) — extends RC-267/293 — lanes L7 |
| RC-301 | **Rename "Absolute Creep Torque Clamp" → "Restricted Creep Torque Clamp" (owner review_63)**: "hard-clamped at a defensive boundary" → **"software-limited to the approved restricted-creep boundary"**, and "breaking past the hard safety clamp" → **"exceeding the approved restricted-creep torque limit"** — "hard clamp" wrongly implies a hardware-independent safety mechanism when it is a VCU software limit | batch_66 (misleading "hard/absolute clamp") | n/a — nomenclature rule | **Nomenclature / SoftwareLimitNotHardClamp** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (clamp doctrine + 05M-C2A-005) — lanes L7 |
| RC-302 | **APPS Dead-Band Acceptance Rule — dual-channel plausibility (owner review_63)**: a normalized pedal percentage alone cannot authorize torque → zero-torque eligibility requires **both APPS channels within approved idle ranges + channel correlation within tolerance + no stuck-high/implausible-transition fault + the approved idle-stabilization time + valid brake/steering preconditions** | batch_66 (single-% dead-band) | supplier APPS channel spec — **NeedsSupplierData** | **ControlsSafety / DualChannelPlausibility** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (APPS Dead-Band Acceptance Rule + 05M-C2A-002) — lanes L7 |
| RC-303 | **Separate torque-rate validation from phase-current-response validation (owner review_63)**: "inverter phase current development slope must reflect the linear ≤20 Nm/sec constraint" conflates two things → **"VCU commanded torque must remain within the approved `dT_command/dt` envelope; measured inverter torque feedback and phase-current response must remain within the supplier-approved tracking envelope for that command profile"** (torque estimate, current-loop behaviour, motor constants, speed, filtering, saturation differ); store commanded slope + reported torque slope + phase-current rise/decay + DC-bus current + vehicle acceleration | batch_66 (torque slope = current slope) | supplier tracking envelope — **NeedsSupplierData** | **MeasurementDoctrine / TorqueVsCurrent** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-006) — lanes L7 |
| RC-304 | **Define CAN_1 passivity electrically, not "zero errors" (owner review_63)**: a listen-only analyzer may observe pre-existing OEM network errors it did not cause → "zero network collisions or errors are injected" → **"instrumentation produces no dominant-bit transmission, acknowledgement, error flag, wake request, diagnostic request, or other active influence on CAN_1; any observed OEM network errors are separately logged and attributed — their mere presence does not prove instrumentation transmission"** | batch_66 (imprecise passivity) | n/a — network-integrity rule | **NetworkIntegrity / ElectricalPassivity** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-012) — extends RC-172/230/282 — lanes L7 |
| RC-305 | **C2B Rollback Containment Rule + hill-hold ≠ parking-hold (owner review_63)**: before any incline service-brake release, **downhill runout clear + independent secondary restraint/capture + remote E-stop active + driver ready to reapply brake + max rollback distance defined + max hold duration defined + thermal limits defined + no reliance on traction torque as the sole parking restraint**; temporary hill-hold assistance and a parking-hold function are NOT the same — the traction system must not substitute for a mechanical parking brake unless formally designed and approved | batch_66 (unbounded incline rollback test) | supplier/engineering rollback + hold limits — **NeedsSupplierData** | **ControlsSafety / RollbackContainment** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2B + status `ROLLBACK_CONTAINMENT_PLAN_REQUIRED`/`SECONDARY_RESTRAINT_REQUIRED`/`TEMPORARY_HILL_HOLD_ONLY`/`PARKING_HOLD_AUTHORITY_NOT_GRANTED`) — lanes L7 |
| RC-306 | **Prove the assistance interlock inhibits torque — new test 05M-C2A-010B (owner review_63)**: verifying assistance is present is not enough → via an approved bounded simulation / low-voltage method, assert brake-assist-not-ready · steering-assist-not-ready · aux-voltage-below-approved-window and require **the VCU stays torque-inhibited and records the specific blocking reason**; any traction enable while a required assistance-ready state is invalid is blocked — the prerequisite becomes a tested interlock, not an assumption | batch_66 (interlock assumed, not tested) | supplier assist-ready registers — **NeedsSupplierData** | **ControlsSafety / TestedInterlock** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-011B) — extends RC-298 — lanes L7 |
| RC-307 | **"Completely valid" is not measurable — APPS preconditions need operating windows (owner review_64, extends RC-295)**: "all brake/steering preconditions remain completely valid" → **"all required brake-assist, steering-assist, auxiliary-voltage, and motion-authority prerequisites remain within their approved operating windows"** — the measurability rule (RC-295) applies to the new dual-channel APPS rule too | batch_67 (unmeasurable "completely valid") | supplier assist operating windows — **NeedsSupplierData** | **MeasurementDoctrine / OperatingWindows** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (APPS Dead-Band Acceptance Rule) — extends RC-295/302 — lanes L7 |
| RC-308 | **Current-loop latency belongs inside an approved envelope, not "without lagging" (owner review_64, extends RC-303)**: "phase current rise must dynamically map to `dT_command/dt` without lagging or oscillating" is too direct — lag from command filtering, current-loop bandwidth, torque estimation, bus voltage, motor speed, and sampling delay is expected → **"measured inverter torque feedback and phase-current response must remain within the supplier-approved dynamic tracking envelope for the commanded `dT_command/dt` profile; expected latency, filtering, current-loop bandwidth, and measurement delay are included in the acceptance envelope"**; blocked = phase-current overshoot beyond envelope / sustained oscillation / unexplained delay beyond the response window / torque-feedback divergence / command-current polarity mismatch | batch_67 (over-strict current tracking) | supplier tracking envelope + latency spec — **NeedsSupplierData** | **MeasurementDoctrine / LatencyEnvelope** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-006B) — extends RC-303 — lanes L7 |
| RC-309 | **E-stop response is architecture-dependent, not a universal contactor interruption (owner review_64)**: "hardwired safety loop interrupts contactor/control supply path" wrongly universalises one architecture → **"the hardwired safety loop forces the supplier-defined emergency torque-inhibit and HV-isolation response; where the approved architecture requires contactor coil-supply interruption, the hardwired loop performs that within the approved response window"** — avoids conflicting with a supplier's inverter/BMS/PDU shutdown sequencing | batch_67 (universal contactor-open rule) | supplier E-stop / shutdown architecture — **NeedsSupplierData** | **ControlsSafety / ArchitectureDependent** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-008) — extends D-007 / RC-247/265 — lanes L7 |
| RC-310 | **Neutral is defined by zero propulsion torque, not a universal ban on bridge switching (owner review_64)**: blocking "any bridge switching while in Neutral" is wrong — supplier logic may switch for controlled zero-torque / diagnostics / field control → block **torque-producing current while Neutral is valid · active drive command still asserted · propulsion torque persisting · inverter state inconsistent with the supplier-defined Neutral behaviour** | batch_67 (over-broad Neutral block) | supplier-defined Neutral behaviour — **NeedsSupplierData** | **ControlsSafety / NeutralDefinition** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-009) — lanes L7 |
| RC-311 | **C2B needs a rollback test abort rule (owner review_64, extends RC-305)**: if rollback exceeds the approved distance or speed threshold → **driver reapplies the service brake · independent restraint captures movement if required · torque command is removed · the test is latched `FAIL` / `NEEDS_REVIEW` · and no automatic second attempt is permitted** | batch_67 (no rollback abort path) | supplier/engineering rollback distance + speed limits — **NeedsSupplierData** | **ControlsSafety / RollbackAbort** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2B abort rule + status `ROLLBACK_ABORT_RULE_REQUIRED`) — extends RC-305 — lanes L7 |
| RC-312 | **"Full torque application" → "approved brake-hold test torque profile" (owner review_64)**: the static brake-hold uses a restricted ≤10 Nm request, not full motor torque, so "during full torque application" is misleading → **"during the approved brake-hold test torque profile"** | batch_67 (ambiguous "full torque") | supplier/engineering brake-hold torque profile — **NeedsSupplierData** | **Nomenclature / TestTorqueNotFullTorque** — recorded in `GATE05M_C2_RESTRICTED_CREEP.md` (05M-C2A-001) — lanes L7 |
| RC-313 | **Runout distance needs an approved Runout Calculation Record, not a hard-coded 50 m (owner review_65)**: C3A-001 "clear linear runway ≥50 m past braking target" → **"the required clear path + post-target runout is established by the approved Runout Calculation Record for the exact test cell; a 50 m path is an `INITIAL_FACILITY_TARGET` only and cannot authorize execution by itself"**; add a `RunoutCalculation_ID` artifact (test mass · authorized speed · torque/ramp · coast distance · foundation-brake distance · response allowance · surface/grade · uncertainty · safety margin · containment plan) | batch_68 (hard-coded runout) | facility/engineering runout calc — **NeedsSupplierData** | **TestSafety / RunoutCalculation** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-001) — extends RC-300 — lanes L7 |
| RC-314 | **Cell-by-cell operating-envelope escalation (owner review_65)**: C3A must not begin at the max provisional cell (15 km/h / 80 Nm / 40 Nm/sec are `INITIAL_TARGET_PROFILE`) → stepped authorization **Envelope Cell 1 (minimal) → Cell 2 (expanded) → Cell 3 (higher)**, and **passing one cell does not unlock the next — each needs a separate `TestCellAuthorization`** | batch_68 (start at max cell) | engineering cell authorization — **NeedsSupplierData** | **GateStatus / StepwiseEnvelope** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (cell-escalation rule) — lanes L7 |
| RC-315 | **Speed-governor test must not depend on nearly crossing the max speed (owner review_65)**: "maintain full safe pedal input until the VCU approaches 15 km/h" → **"issue a commanded speed/torque request exceeding the authorized ceiling while approaching from below; verify torque attenuation begins before physical speed crosses the authorized limit"**; prove the governor FIRST via HIL/SIL, lifted-wheel/dyno, or a temporarily lowered ceiling, then controlled track confirmation | batch_68 (aggressive governor test) | supplier/engineering governor cal — **NeedsSupplierData** | **TestSafety / GovernorProof** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-004) — lanes L7 |
| RC-316 | **Separate path-deviation OBSERVATION from automatic VCU torque authority (owner review_65)**: an external tracking system may drive an automatic VCU torque-inhibit only if it is integrated into the safety loop and validated for timing/integrity/failure-detection/authority → split **C3A-009A Path-Deviation Observation** (external system = evidence + human-abort support) and **C3A-009B Path-Deviation Torque-Inhibit Integration** (only after the interface, latency, signal validity, failure modes, and control authority are formally approved); external cameras/survey are not automatic VCU authority until then | batch_68 (external system given control authority) | interface validation + engineering approval — **NeedsSupplierData** | **ControlsSafety / ObservationVsAuthority** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-009A/009B) — lanes L7 |
| RC-317 | **Brakes must not fight sustained propulsion torque — C3B-004 rewrite (owner review_65, SAFETY-CRITICAL)**: "apply 40 Nm traction, then brake, prove brakes stall the motor even with simulated VCU latency" → **"Brake Override with Minimal Authorized Propulsion Request": apply the lowest approved request → apply the service brake → verify BOS removes the torque command within the approved response window → after removal, independently measure foundation-brake stopping; a simulated BOS-latency fault is evaluated in HIL / another bounded method, NEVER on a physically moving vehicle**; blocked = sustained propulsion torque after a brake request / phase current outside the decay envelope / foundation brakes forced to stall a persistent motor output / physical simulation of a hazardous BOS delay during motion | batch_68 (brakes vs sustained torque) | supplier BOS response spec — **NeedsSupplierData** | **TestSafety / NoBrakeVsTorque** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3B-004) — lanes L7 |
| RC-318 | **Brake temperature: contact thermocouples are the authority, IR is supplemental (owner review_65)**: infrared alone is distorted by emissivity / angle / airflow / shielding / rotor construction / timing → **calibrated contact thermocouples or approved embedded sensors are the thermal authority; IR is supplemental and IR-only results are labelled `SCREENING_EVIDENCE` / `NOT_FINAL_THERMAL_AUTHORITY`** | batch_68 (IR-only thermal) | calibrated thermal sensors — **NeedsSupplierData** | **MeasurementDoctrine / ThermalAuthority** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3B-006) — lanes L7 |
| RC-319 | **ABS/ESC-related regen removal — two-lane rule, factory signals are not automatic control inputs (owner review_65, extends RC-282)**: "factory traction-control flag commands regen to zero" implies consuming factory signals as control → **Lane A (approved factory status path) usable only with Ford-authorized documentation + formal interface approval; Lane B (conversion-side independent wheel-slip plausibility) via approved independent sensors / bounded simulation, without transmitting to or impersonating ABS/ESC**; factory ABS/ESC stays authoritative but Elektron may not consume every observed message as a safety command | batch_68 (factory flag as control) | Ford ABS/ESC interface authorization — **NeedsSupplierData** | **NetworkIntegrity / FactorySignalAuthority** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C two-lane rule) — extends RC-282 — lanes L7 |
| RC-320 | **Remove "instantly"/"immediately" from C3C regen inhibit (owner review_65, extends RC-288)**: "pulls back regeneration requests instantly" / "immediately commands regen to zero" → **"within the supplier-defined or engineering-approved regen-inhibit response window"** | batch_68 (instant regen inhibit) | supplier regen-inhibit response window — **NeedsSupplierData** | **MeasurementDoctrine / ResponseWindow** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-005/006) — extends RC-288 — lanes L7 |
| RC-321 | **Brake blending is not assumed "linear" (owner review_65)**: "transition states remain smooth and linear" → **"the transition remains within the approved deceleration continuity, pedal-response, pressure-response, and jerk envelope"** (blending may be nonlinear by design); track requested regen torque · actual regen torque · hydraulic pressure · vehicle deceleration · deceleration jerk · pedal position · wheel-speed disagreement · BMS charge-current limit | batch_68 (assumed-linear blend) | supplier brake-blend envelope — **NeedsSupplierData** | **MeasurementDoctrine / BlendContinuity** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-003) — lanes L7 |
| RC-322 | **Remove premature numbers from the C3D map (owner review_65, extends RC-300)**: the C3D cell table populated ≤40 Nm / ≤40 Nm/s / ≤20 Nm/s / ≤5% while the paragraph says none should be populated → **`CELL_VALUE_PENDING_APPROVAL` for Max Traction Request + Max Ramp Rate, `KINEMATIC_MODEL_PENDING` for the wheel-speed envelope**; "Immediate Torque Cutout" → **"torque-inhibit response within the approved response window"** | batch_68 (premature C3D numbers) | engineering cell values — **NeedsSupplierData** | **ThresholdAuthority / CellPendingApproval** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D map) — extends RC-300 — lanes L7 |
| RC-323 | **C3D needs road-wheel geometry, not steering-wheel angle alone (owner review_65)**: the steering map needs **steering-wheel angle · steering ratio · measured or derived road-wheel angle · wheelbase · front/rear track width · tire rolling radius · axle ratio · differential type · expected inner/outer wheel-speed ratio · vehicle yaw rate (if independently measured)**; chassis-cab body/upfit loading affects tire deflection and tracking; steering angle stays an observation/derating input, NOT torque-vectoring authority | batch_68 (SWA-only steering map) | vehicle geometry + tire/axle data — **NeedsSupplierData** | **ControlsSafety / RoadWheelKinematics** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D kinematic inputs) — lanes L7 |
| RC-324 | **C3E faults start at the lowest signed cell, not automatically at 15 km/h (owner review_65)**: → **cell-based escalation: faults begin at the lowest signed operating-envelope cell; no fault repeats at a higher cell until the lower cell has `SIGNED_PASS` + fault containment proven + runout valid + thermal acceptable + test-lead authorization**; fault order single → repeated single → paired → compound, never a jump to multiple faults at the highest provisional speed | batch_68 (all faults at max speed) | engineering escalation authorization — **NeedsSupplierData** | **TestSafety / CellEscalation** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3E escalation) — lanes L7 |
| RC-325 | **Test Configuration Lock Rule (owner review_65)**: every C3 run archives **VCU firmware hash · inverter firmware/version · BMS/PDU firmware/version · calibration-file hash · DBC/version hash · active test-cell limits · vehicle mass + axle-load · tire size/pressure/condition · ambient + surface conditions · instrumentation IDs + calibration status**; any change invalidates reuse of a previous result unless an engineering impact review explicitly allows it | batch_68 (no config lock) | config/firmware records — **NeedsSupplierData** | **EvidenceHygiene / ConfigurationLock** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Test Configuration Lock Rule) — extends RC-213/218 — lanes L7 |
| RC-326 | **Telemetry data-synchronization proof (owner review_65)**: the telemetry packet is not evidence until synchronized → **all channels share an approved common clock or documented time-alignment**, with per-signal sampling rates · timestamp source · maximum synchronization error · dropped-frame detection · sensor-latency compensation · start/stop event markers — otherwise a brake event, torque removal, phase-current decay, and actual deceleration may appear incorrectly ordered | batch_68 (unsynchronized telemetry) | instrumentation time-base spec — **NeedsSupplierData** | **EvidenceHygiene / TimeSynchronization** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (data-synchronization requirement) — lanes L7 |
| RC-327 | **Complete the RunoutCalculation_ID field list + `L_min` equation (owner review_66, extends RC-313)**: Revision 02 said the artifact "must map the following parameters" but the list was incomplete → full field set (vehicle test mass · front/rear axle loading · authorized speed/torque/ramp · maximum expected acceleration · driver + software/control response allowances · torque-removal coast distance · foundation-brake stopping distance · surface grade + condition/friction range · tire size/pressure/condition/temperature · wind/ambient · position + braking-distance measurement uncertainty · required containment margin · acceleration/stabilization/braking-target/post-target zones · restraint/barrier plan · engineering calc revision · required approver + signed authorization) and **`L_min` = acceleration zone + stabilization zone + planned braking distance + worst-case coast/stop allowance + uncertainty allowance + approved containment margin** | batch_70 (incomplete runout schema) | facility/engineering runout calc — **NeedsSupplierData** | **TestSafety / RunoutSchema** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (RunoutCalculation_ID schema) — extends RC-313 — lanes L7 |
| RC-328 | **C3A-009B must stay LOCKED until external-tracking control authority is established (owner review_66, extends RC-316)**: the Hunter gave 009B `APPROVED_FOR_CONTROLLED_EXECUTION`/`PENDING_EXECUTION`, but the text requires the external interface/latency/integrity/failure-modes to be approved first → **`Procedure Approval Status: APPROVAL_REQUIRED` · `Execution Status: LOCKED` · `Result Signoff Status: NOT_ELIGIBLE` · Build-Engine block `EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED`** (009A observation may proceed; 009B is not automatic VCU authority yet) | batch_70 (009B prematurely approved) | interface validation + engineering approval — **NeedsSupplierData** | **ControlsSafety / LockedUntilValidated** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-009B) — extends RC-316 — lanes L7 |
| RC-329 | **"Commands rise linearly" is too rigid (owner review_66, extends RC-303)**: the approved torque profile may be a nonlinear rate/jerk limiter, S-curve, speed-dependent map, or filtered ramp → **"commanded torque remains within the approved time-domain command envelope, including torque-rate and jerk limits where applicable"**; track `T_command`, `dT/dt`, `d²T/dt²`, reported torque, phase current, longitudinal acceleration, jerk | batch_70 (rigid "linear" command) | supplier torque-command envelope — **NeedsSupplierData** | **MeasurementDoctrine / CommandEnvelope** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-005) — extends RC-303 — lanes L7 |
| RC-330 | **Separate BOS torque removal from the foundation-brake stop (owner review_66)**: C3A-006 "vehicle stops" over-claims — a BOS test proves torque removal + controlled deceleration, not a guaranteed complete stop → **BOS result: the traction request is removed within the approved response window; foundation-brake result: the vehicle decelerates/stops within the approved C3B-derived distance envelope** | batch_70 (BOS ≠ stop conflated) | supplier BOS + brake-distance spec — **NeedsSupplierData** | **MeasurementDoctrine / BOSvsStop** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-006) — lanes L7 |
| RC-331 | **Regen-disabled is a command state, not a literal 0 Nm (owner review_66)**: C3B "regen 0 Nm" → **`Regeneration Command State: DISABLED`; allowed negative torque within the supplier-defined zero-regen / no-command tolerance only** — measurement noise, drag torque, inverter estimation error, and supplier-defined switching behaviour still exist | batch_70 (literal-0-Nm regen) | supplier zero-regen tolerance — **NeedsSupplierData** | **MeasurementDoctrine / CommandState** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3B regen state) — extends RC-288 — lanes L7 |
| RC-332 | **Separate brake/regen coexistence observation from true brake blending (owner review_66, extends RC-321)**: C3C-003 "master-cylinder pressure overlays with inverter braking torque" implies an integrated blend controller → rename **Brake/Regeneration Coexistence Observation**; **Lane 1** independent regen + normal friction braking (observe only); **Lane 2** coordinated brake blending **`BLOCKED`** until the pedal model, pressure model, deceleration target, failure modes, and control ownership are formally approved | batch_70 (assumed blend controller) | supplier blend-control ownership — **NeedsSupplierData** | **ControlsSafety / CoexistenceVsBlending** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-003) — extends RC-321 — lanes L7 |
| RC-333 | **Regen availability is BMS-permission-bounded, not a generic high SOC (owner review_66)**: C3C-004 → **regen availability bounded by the active BMS charge-power/current permission, pack voltage, cell-voltage ceiling, temperature state, contactor state, and supplier-defined operating limits** — the authority is the BMS permission, not a generic SOC percentage | batch_70 (generic high-SOC boundary) | supplier BMS charge-permission spec — **NeedsSupplierData** | **ControlsSafety / BMSPermission** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-004) — lanes L7 |
| RC-334 | **No arbitrary internal-bus fault-message injection (owner review_66, extends RC-297)**: C3C-005 "manually simulate over the internal bus" → **use a supplier-supported test mode, an approved signal-substitution fixture, a HIL interface, or bounded conversion-side simulation to assert a charge-acceptance restriction; NO guessed or unauthorized BMS message injection** | batch_70 (arbitrary bus injection) | supplier test-mode / fixture — **NeedsSupplierData** | **TestSafety / NoArbitraryInjection** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-005) — extends RC-297 — lanes L7 |
| RC-335 | **C3C-007 needs an explicit driver/brake response after regen loss (owner review_66)**: an inverter comms fault during regen may abruptly lose deceleration → **regen request removed · no lingering torque-producing or braking current outside the approved decay envelope · driver warning asserted · foundation-brake authority remains available · driver applies the service brake per the test plan · fault latches · no automatic regen restoration**; do NOT imply an automatic transition to mechanical braking unless a validated automatic brake-actuation system exists | batch_70 (assumed auto brake) | supplier fault-response + warning spec — **NeedsSupplierData** | **ControlsSafety / DriverBrakeResponse** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-007) — lanes L7 |
| RC-336 | **Remove remaining premature C3D numbers + "immediate" (owner review_66, extends RC-322)**: the C3D cell table still carried ≤5% parity / literal 0 Nm / "Immediate Torque Cutout" / "Hard Clamped" → **`Wheel-Speed Envelope: KINEMATIC_MODEL_PENDING_APPROVAL`, `Maximum Regen Request: DISABLED_COMMAND_STATE`, `Abort Response: TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW`, `Maximum Torque/Ramp: TEST_CELL_VALUE_PENDING_APPROVAL`**; "Immediate" removed again | batch_70 (residual C3D numbers) | engineering cell values — **NeedsSupplierData** | **ThresholdAuthority / CellPendingApproval** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D map) — extends RC-322 — lanes L7 |
| RC-337 | **Steering-signal validity state matrix (owner review_66)**: a frozen/old steering value must not keep authorizing torque → **`VALID` operate within the approved cell · `DEGRADED` further derate or inhibit progression · `IMPLAUSIBLE` torque-inhibit request + fault latch · `UNAVAILABLE` no steering-dependent envelope expansion · `STALE` treat as invalid after the approved timeout** | batch_70 (no steering failure handling) | supplier steering-signal spec — **NeedsSupplierData** | **ControlsSafety / SteeringValidity** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D validity matrix) — extends RC-323 — lanes L7 |
| RC-338 | **Complete the C3E fault escalation hierarchy (owner review_66, extends RC-324)**: the hierarchy was announced but not listed → **Level 1 single fault** (APPS plausibility · steering invalid/stale · wheel-speed disagreement · inverter heartbeat loss · BMS charge-permission removal · brake/steering-assist-not-ready · aux-voltage low · test-boundary alert · E-stop) → **Level 2 repeated single** (latch consistency · no auto-retry · thermal/recovery) → **Level 3 approved paired** (signal+comms loss · assist+torque request · regen+charge-permission removal · steering-plausibility+wheel-speed disagreement · low-voltage+propulsion request) → **Level 4 compound** (only after L1–3 signed passes + formal hazard review; approved rationale per pair, no random combining) | batch_70 (hierarchy missing) | engineering hazard review — **NeedsSupplierData** | **TestSafety / FaultHierarchy** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3E hierarchy) — extends RC-324 — lanes L7 |
| RC-339 | **Test Result Validity Rule (owner review_66, extends RC-325)**: a signed result applies ONLY to the archived hardware config / firmware-software hashes / calibration hashes / DBC version / test-cell limits / vehicle mass-loading / tire configuration / instrumentation set / environmental window → any change triggers **`IMPACT_REVIEW_REQUIRED`**, after which the prior result is graded **`REUSABLE` / `PARTIALLY_REUSABLE` / `REPEAT_TEST_REQUIRED` / `INVALIDATED`** (governs firmware updates + inverter swaps) | batch_70 (no result-validity binding) | n/a — evidence-hygiene rule | **EvidenceHygiene / ResultValidity** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Test Result Validity Rule) — extends RC-325 — lanes L7 |
| RC-340 | **Insert + govern the actual `L_min` equation (owner review_67, extends RC-313/327)**: Revision 03 said "calculated via the following structural model" without full governance → **`L_min = L_acceleration + L_stabilization + L_braking_target + L_worst_case_coast_or_stop + L_response_allowance + L_measurement_uncertainty + L_containment_margin`**, with a **no-double-counting** rule (if foundation-brake stopping distance already includes driver/control response, don't add it again), a `distance_component_method` enum (`MEASURED` / `CALCULATED` / `SUPPLIER_DEFINED` / `ENGINEERING_APPROVED` / `INITIAL_TARGET_PROFILE`), and **no `RunoutCalculations_ID` may authorize movement if any required distance component is `MISSING_SOURCE` / `UNVERIFIED` / `INITIAL_TARGET_PROFILE_ONLY`** | batch_71 (equation governance thin) | facility/engineering runout calc — **NeedsSupplierData** | **TestSafety / RunoutEquation** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (RunoutCalculation_ID schema — `L_min`) — extends RC-313/327 — lanes L7 |
| RC-341 | **The ±2 Nm zero-regen residual is a candidate, not a universal constant (owner review_67, extends RC-331)**: a fixed ±2 Nm cannot apply across inverters / current sensors / motor sizes / torque estimators / speeds / field-control states → **`Regeneration Command State: ZERO_REGEN_REQUEST`; measured torque feedback + phase-current must remain within the supplier-defined or engineering-approved zero-regeneration tracking envelope**; classify ±2 Nm as `ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE`; "active field weakening" is a higher-speed strategy whose relevance to this low-speed gate depends on the actual inverter/motor strategy | batch_71 (universal ±2 Nm) | supplier zero-regen tracking envelope — **NeedsSupplierData** | **MeasurementDoctrine / ResidualCandidate** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3B regen baseline) — extends RC-331 — lanes L7 |
| RC-342 | **Remove the circular C3A→C3B evidence dependency (owner review_67, extends RC-330)**: C3A-006 "decelerates within the approved C3B-derived envelope" references an envelope that does not exist during the FIRST C3A run → split **C3A BOS acceptance** (traction command removed within the response window · torque feedback + phase current decay within the approved envelope · driver maintains foundation-brake control · no propulsion opposition to braking) from a later **C3A/C3B correlation review** (compare against the *signed* C3B stopping envelope); C3A must not depend on downstream-gate evidence to execute | batch_71 (circular gate dependency) | supplier BOS + brake-distance spec — **NeedsSupplierData** | **GateSequencing / NoCircularDependency** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-006) — extends RC-330 — lanes L7 |
| RC-343 | **Remove "immediate" from the steering-state matrix → response windows (owner review_67, extends RC-337)**: "immediate further derating" / "immediate torque-inhibit request" conflict with the response-window doctrine → **`DEGRADED`: derating within the approved degraded-state response window; `IMPLAUSIBLE`: torque-inhibit within the approved steering-fault response window + NVM latch** | batch_71 ("immediate" reintroduced) | supplier steering-fault response window — **NeedsSupplierData** | **MeasurementDoctrine / ResponseWindow** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D steering matrix) — extends RC-288/337 — lanes L7 |
| RC-344 | **Define `STALE` by signal freshness, not an unchanged value (owner review_67, extends RC-337)**: → `STALE` = timestamp age / alive counter / update cadence / freshness indicator exceeds its approved limit; **a constant but freshly-updated valid steering value is NOT stale** (a steering signal can legitimately stay unchanged while driving straight) | batch_71 (unchanged-value = stale) | supplier steering-signal freshness spec — **NeedsSupplierData** | **ControlsSafety / SignalFreshness** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D STALE) — extends RC-337 — lanes L7 |
| RC-345 | **C3A-007 uses the supplier-defined Neutral zero-propulsion envelope (owner review_67, extends RC-310)**: "propulsion torque falls to zero" → **"propulsion torque remains within the supplier-defined Neutral zero-propulsion envelope"**; blocked = active propulsion request still asserted · torque-producing current exceeds the approved Neutral envelope · inverter state contradicts supplier-defined Neutral behaviour · unintended vehicle acceleration persists | batch_71 (literal-zero Neutral) | supplier Neutral envelope — **NeedsSupplierData** | **ControlsSafety / NeutralEnvelope** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-007) — extends RC-310 — lanes L7 |
| RC-346 | **C3C-007 fault-latch ownership, not "latches natively" (owner review_67, extends RC-335)**: define ownership → **the Inverter reports its comms/fault state where supported; the VCU removes the regen request + records the operational fault latch; the Build Engine stores the event/evidence/clearance authorization; automatic regen restoration is blocked until the supplier-defined recovery + approved service-clear**; an **inverter communication loss is distinct from a verified inverter shutdown** — if comms disappear the VCU cannot assume what the inverter is physically doing (independent current/torque evidence required) | batch_71 ("latches natively" ambiguous) | supplier fault-latch + recovery spec — **NeedsSupplierData** | **ControlsSafety / FaultOwnership** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-007 ownership) — extends RC-335 — lanes L7 |
| RC-347 | **C3E fault-execution-domain classification (owner review_67)**: **a fault being listed in C3E does NOT automatically authorize its physical injection during vehicle movement** → every listed fault carries a `FAULT_EXECUTION_DOMAIN` of `SIL_ONLY` / `HIL_ONLY` / `STATIC_VEHICLE_ONLY` / `LIFTED_WHEEL_ONLY` / `LOWEST_MOVING_CELL_ALLOWED` / `HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS` (brake/steering-assist-not-ready proven HIL/static first, steering assist never intentionally removed while moving; low-voltage HIL/bounded first) | batch_71 (listed = injectable-while-moving) | engineering execution-domain approval — **NeedsSupplierData** | **TestSafety / ExecutionDomain** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3E execution-domain) — extends RC-324 — lanes L7 |
| RC-348 | **Paired/compound-fault prerequisites + order/timing (owner review_67, extends RC-324)**: Level 3/4 need more than a general rationale → a `PairedFaultAuthorization_ID` + `HazardAnalysis_ID` + fault-order definition + common-cause assessment + expected response sequence + abort method + independent containment + runout-validity + thermal-state + configuration hash + required approvers; **fault order + timing offsets are stored** (`low-voltage → comms-loss` may differ from `comms-loss → low-voltage`) | batch_71 (no paired-fault prereqs) | engineering hazard review — **NeedsSupplierData** | **TestSafety / PairedFaultAuthorization** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3E paired/compound prereqs) — extends RC-324 — lanes L7 |
| RC-349 | **Invalidated results are preserved, not "cleared" (owner review_67, extends RC-339 + Constitution Art. I)**: "INVALIDATED — Data cleared" would delete evidence → **`INVALIDATED_FOR_CURRENT_CONFIGURATION`** — the old result stays archived + traceable but cannot authorize the new configuration; lifecycle historical result preserved → applicability revoked → replacement testing linked → supersession chain recorded | batch_71 (invalidated = cleared) | n/a — evidence-immutability rule | **EvidenceHygiene / NoEvidenceDeletion** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Test Result Validity Rule) — extends RC-339 — lanes L7 |
| RC-350 | **Full `TestCellAuthorization_ID` schema (owner review_67, extends RC-314)**: cell progression is fundamental, so define the record → `subgate_id` · `cell_number` · max speed/positive-torque/negative-torque/torque-rate/jerk/test-distance · allowed steering band · allowed regen state · allowed fault set · `RunoutCalculations_ID` · `ConfigurationPacket_ID` · `previous_cell_signed_result` · `thermal_state_requirement` · surface/environmental window · authorization expiry · required approvers · **status** (`DRAFT` → `APPROVAL_REQUIRED` → `AUTHORIZED` → `ACTIVE` → `SUSPENDED` → `COMPLETED` → `REVOKED` → `SUPERSEDED`) | batch_71 (cell record undefined) | engineering cell authorization — **NeedsSupplierData** | **GateStatus / CellAuthorizationSchema** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (TestCellAuthorization_ID schema) — extends RC-314 — lanes L7 |
| RC-351 | **Preserve distance-component values — do NOT zero-clamp overlaps (owner review_68, extends RC-340)**: "clamp `L_response_allowance` to zero" would destroy the original response-distance calculation → every component retains its measured/calculated value; the aggregation record declares `INCLUDED_SEPARATELY` / `INCLUDED_IN_OTHER_COMPONENT` / `NOT_APPLICABLE` / `BLOCKED_PENDING_REVIEW` via `distance_component_value` · `distance_component_method` · `included_in_L_min` · `included_within_component_id` · `overlap_review_status` · `overlap_review_approver` (e.g. `L_response_allowance = 2.4 m`, `included_in_L_min = false`, `included_within_component_id = L_worst_case_coast_or_stop`) | batch_72 (zero-clamp destroys value) | facility/engineering runout calc — **NeedsSupplierData** | **EvidenceHygiene / NoValueDestruction** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (RunoutCalculation_ID overlap fields) — extends RC-340 — lanes L7 |
| RC-352 | **Distance Accounting Integrity Rule + component schema (owner review_68, extends RC-340)**: every physical metre counted only once in the `L_min` summation; the overlapping components (planned braking target · foundation-brake stopping distance · worst-case coast/stop · driver response · control response · post-target runout · containment margin) each carry `component_id` · `zone_start_reference` · `zone_end_reference` · `distance_m` · `method` · `uncertainty_m` · `included_in_total` · `parent_component_id` · `overlap_status` · `proof_artifact_id` · `authority_status` | batch_72 (overlap under-specified) | facility/engineering runout calc — **NeedsSupplierData** | **EvidenceHygiene / DistanceAccounting** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Distance Accounting Integrity Rule) — extends RC-340 — lanes L7 |
| RC-353 | **Insert the immutable result lifecycle (owner review_68, extends RC-339/349)**: the ledger sentence ended without the lifecycle → **`SIGNED_RESULT → CONFIGURATION_CHANGE_DETECTED → IMPACT_REVIEW_REQUIRED → REUSABLE | PARTIALLY_REUSABLE | REPEAT_TEST_REQUIRED | INVALIDATED_FOR_CURRENT_CONFIGURATION → REPLACEMENT_TEST_LINKED → SUPERSEDED_FOR_CURRENT_CONFIGURATION`**; historical evidence stays immutable + searchable, "invalidated" ≠ deleted | batch_72 (lifecycle not shown) | n/a — evidence-immutability rule | **EvidenceHygiene / ResultLifecycle** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Test Result Validity Rule lifecycle) — extends RC-339/349 — lanes L7 |
| RC-354 | **`TestCellAuthorization` status transition rules + state definitions (owner review_68, extends RC-350)**: software must NOT jump `DRAFT`→`ACTIVE` → permitted transitions `DRAFT→APPROVAL_REQUIRED`; `APPROVAL_REQUIRED→AUTHORIZED|DRAFT`; `AUTHORIZED→ACTIVE|SUSPENDED|REVOKED`; `ACTIVE→COMPLETED|SUSPENDED|REVOKED`; `SUSPENDED→AUTHORIZED|REVOKED`; `COMPLETED→SUPERSEDED`; `REVOKED→SUPERSEDED`; define `ACTIVE` (one controlled execution session), `COMPLETED` (scope ended, signoff separate), `REVOKED` (no longer usable), `SUPERSEDED` (newer replaces, history remains) | batch_72 (transitions undefined) | n/a — state-machine rule | **GateStatus / AuthorizationTransitions** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (TestCellAuthorization transitions) — extends RC-350 — lanes L7 |
| RC-355 | **Procedure approval requires real signatures (owner review_68, extends RC-299)**: `PAS: APPROVED_FOR_CONTROLLED_EXECUTION` is valid ONLY after a named approver + timestamp + revision signature exist → add `procedure_revision` · `procedure_approver_identity` · `approval_timestamp` · `approval_signature_record` · `approval_scope` · `approval_expiry`; until then every row stays `PAS: APPROVAL_REQUIRED / ES: NOT_EXECUTED / RSS: NOT_ELIGIBLE` (no procedure pre-approved on paper) | batch_72 (PAS prefilled) | n/a — evidence-hygiene rule | **EvidenceHygiene / SignatureRequired** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (global governance + C3A matrix header) — extends RC-299 — lanes L7 |
| RC-356 | **Keep the ±2 Nm regen residual strictly non-authoritative + refine rationale (owner review_68, extends RC-341)**: `ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE` + `NO_PASS_FAIL_AUTHORITY`; measured torque feedback + phase-current + **DC-bus current** must remain within the supplier/engineering zero-regeneration tracking envelope; **remove "reactive field-weakening" as a general justification** unless the inverter supplier documents it in this low-speed region | batch_72 (field-weakening over-claim) | supplier zero-regen tracking envelope — **NeedsSupplierData** | **MeasurementDoctrine / NonAuthoritativeResidual** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3B regen baseline) — extends RC-341 — lanes L7 |
| RC-357 | **C3A-006 measurable braking control (owner review_68, extends RC-330)**: "driver maintains braking control" is unmeasured → **"driver brake input, brake-assist state, and hydraulic pressure remain within the approved C3A operating envelope throughout the event"** (measure pedal state / hydraulic pressure / assist availability / vehicle deceleration) | batch_72 (unmeasured braking claim) | supplier brake-assist + pressure spec — **NeedsSupplierData** | **MeasurementDoctrine / MeasurableBraking** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-006) — extends RC-330 — lanes L7 |
| RC-358 | **C3A-009B formal block prerequisites (owner review_68, extends RC-328)**: add `BlockReason: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED` + seven unlock prerequisites — interface architecture approved · signal-integrity analysis complete · latency budget approved · stale/missing-data behaviour approved · failure-mode analysis complete · independent control-authority review signed · HIL validation passed | batch_72 (block prereqs absent) | interface validation + engineering approval — **NeedsSupplierData** | **ControlsSafety / BlockPrerequisites** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3A-009B) — extends RC-328 — lanes L7 |
| RC-359 | **C3C-007 independent physical-state evidence after inverter comms loss (owner review_68, extends RC-346)**: a loss of inverter communication is an **unknown-state condition** until independent evidence establishes torque/current behaviour → phase-current measurement · DC-bus current · motor accel/decel · shaft/wheel-speed response · inverter hardware fault output · contactor state; **never rely only on the reported torque value from the link that just failed** | batch_72 (assumed inverter state) | supplier inverter fault-output spec — **NeedsSupplierData** | **ControlsSafety / UnknownStateEvidence** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3C-007 evidence) — extends RC-346 — lanes L7 |
| RC-360 | **Separate steering signal validity from freshness (owner review_68, extends RC-337/344)**: a fresh signal can be implausible and a plausible value can be stale → carry a `signal_validity_state` AND a `signal_freshness_state`, resolving to `VALID_AND_FRESH` / `VALID_BUT_DEGRADED` / `IMPLAUSIBLE_BUT_FRESH` / `STALE` / `UNAVAILABLE` | batch_72 (validity/freshness conflated) | supplier steering-signal spec — **NeedsSupplierData** | **ControlsSafety / ValidityVsFreshness** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (C3D validity/freshness) — extends RC-337/344 — lanes L7 |
| RC-361 | **Execution-domain arrows are review paths, not automatic authorization (owner review_68, extends RC-347)**: `HIL → STATIC_VEHICLE_ONLY → LOWEST_MOVING_CELL_ALLOWED` could be misread as auto-authorization → the Execution Domain Progression Rule: each transition requires the prior-domain `SIGNED_PASS` + approved injection method + updated hazard analysis + valid runout calc + active `TestCellAuthorization` + configuration lock + test-lead authorization | batch_72 (arrows imply auto-progression) | engineering domain approval — **NeedsSupplierData** | **TestSafety / DomainProgression** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (Execution Domain Progression Rule) — extends RC-347 — lanes L7 |
| RC-362 | **Tighter moving-fault limits (owner review_68, extends RC-347)**: brake-assist-not-ready moving is blocked by default (only via a simulated status input, **never physically removing actual braking assistance**); steering-assist-not-ready is **never removed while moving** (bounded logical status simulation while real assist stays physically available); aux-voltage-low moving supply tests need a minimum guaranteed brake-assist voltage + minimum guaranteed steering-assist voltage + independent supply protection + hardware undervoltage limits + abort threshold + recovery behaviour, **never crossing into actual loss of steering/brake assistance** | batch_72 (moving-fault under-bounded) | supplier assist + supply spec — **NeedsSupplierData** | **TestSafety / MovingFaultLimits** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (tighter moving-fault limits) — extends RC-347 — lanes L7 |
| RC-363 | **Full `PairedFaultAuthorization_ID` field schema + reverse-order-is-separate (owner review_68, extends RC-348)**: `primary_fault_id` · `secondary_fault_id` · `fault_order` · `inter_fault_delay_ms` · `injection_method` · `expected_state_sequence` · `abort_trigger` · `abort_owner` · `containment_method` · `allowed_execution_domain` · `active_test_cell` · `HazardAnalysis_ID` · `ConfigurationPacket_ID` · `RunoutCalculations_ID` · `required_approvers` · `status`; the reverse ordering is a SEPARATE record (`LOW_VOLTAGE_THEN_CAN_LOSS` ≠ `CAN_LOSS_THEN_LOW_VOLTAGE`) | batch_72 (paired-fault fields undefined) | engineering hazard review — **NeedsSupplierData** | **TestSafety / PairedFaultSchema** — recorded in `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` (PairedFaultAuthorization_ID schema) — extends RC-348 — lanes L7 |

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

---

## 50. Batch 42 + owner review_39 — Gate 05H HIL / Bench Test Protocol (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_42_gate05h_hil_bench_test_protocol.md`
and `docs/research/raw/owner_reviews/review_39_batch_42_verdict.md`.
Row additions: RC-180..RC-184 (no new CS). Deliverable:
`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md` (HIL harness architecture,
fault-injection matrix HIL-05G-001..006, two illustrative Python scripts,
per-run proof-artifact package). Owner: "strong first draft … the right
Gate 05H direction."

### Recurrence caught — invented timing acting as gate logic, FOURTH gate (RC-180)

Fourth recurrence of the invented-timing defect family (RC-116 200 ms HVIL,
RC-133 Gate 08C, RC-169/173 Gate 05F, RC-174 Gate 05G): the HIL matrix +
scripts embedded `10/20/50/100/2 ms` and `3-cycle/30 ms` as real pass/fail
limits. Downgraded to `SimulationSweepOnly / SupplierDataPending`; the matrix
header "Pass Criteria Metric" → "HIL Observation Metric / Candidate Pass
Criteria" + an Authority Status row. **This defect has now recurred across
five artifacts — the single strongest case for the M10 regression scanner
(owner decision pending).**

### Other corrections

- **HIL-result language (RC-181):** `[HIL_OBSERVED]` /
  `HIL_OBSERVED_NO_GATE_AUTHORITY`, never `[PASS]` /
  `VERIFICATION_STAGE_PASSED_SIM`; result category = HIL observed / needs
  review / model stress failure.
- **CAN_1 fault-injection bench boundary (RC-182):** short test on
  simulated OEM nodes / bench replicas only, forbidden on a live Ford
  network; strongest proof = silent-mode register dump + no TX mailbox + no
  ACK + analyzer capture + oscilloscope no-dominant-bit.
- **Power-loss safe-state measured, not assumed (RC-183):** depends on
  output-stage design / pull-ups-downs / relay topology / hardware
  fail-safe; timing + final state require bench proof.
- **Proof-artifact package + configurable script timeout (RC-184):** every
  HIL run records the full evidence set; Script B timeout comes from config,
  not a hardcoded 100 ms.

### Kept (owner: "keep")

HIL architecture, fault-injection matrix, listen-only proof, automation
scripts, proof artifacts, and the HIL gate rule (`logic_trace_captured ==
FALSE OR script_execution_status == UNRUN → BENCH_INTEGRATION_APPROVAL =
BLOCKED, MONITOR_MODE = SIMULATION_SCRIPTS_ONLY`). Scripts remain
illustrative pseudocode (no firmware exists yet), not production code.

### Gate 05H status (owner review_39)

`HIL_TEST_PROTOCOL_DRAFTED` / `LOW_VOLTAGE_BENCH_ONLY` / `NO_LIVE_HV` /
`NO_VEHICLE_TESTING` / `NO_FACTORY_BUS_TRANSMISSION` /
`TIMING_VALUES_SIMULATION_SWEEP_ONLY` / `HIL_PROOF_ARTIFACTS_DEFINED` /
`BENCH_EXECUTION_NOT_STARTED`.

### Next

The owner did not name a Gate 05I. Expected next inputs: the owner's next
batch (a further Gate 05 proof step or the return to the Gate 06 deep dive
per the roadmap order 06 → 09 → 10 → 11), or a supplier reply / Gate
08B–08C reopen / Gate 07 field data.

### Standing checks

- Low-voltage bench only; no live HV; no vehicle testing; CAN_1 listen-only
  (simulated, proof required); no HIL timing becomes a gate limit until a
  source/HIL-approved requirement upgrades it; bench execution not started.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; ODRs untouched.

---

## 51. Batch 43 + owner review_40 — Gate 05H v2 (HIL refinement; 05H-A/05H-B/05I split) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_43_gate05h_v2_hil_refinement.md`
and `docs/research/raw/owner_reviews/review_40_batch_43_verdict.md`.
Row additions: RC-185..RC-189 (no new CS). Deliverable **updated**:
`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`. Owner: "strong Gate 05H
draft … the right direction." (The Hunter had already applied the review_39
fixes in-payload — configurable timeout, HIL-observed result categories, the
measured-power-loss row, the artifact dossier — so this batch is the owner's
next-level cleanup.)

### The main structural upgrade — 05H is not "simulation only" (RC-185)

A real VCU DUT + real transceivers + supply + oscilloscope + FIU is
**bench/HIL evidence**. Gate 05H splits into **05H-A** (simulation script
draft), **05H-B** (low-voltage HIL bench execution with a real VCU →
`HIL_BENCH_OBSERVED / NO_VEHICLE_CLEARANCE`), and **05I** (physical bench
proof with production-like harness/components — NOT STARTED). A real run
returns `HIL_OBSERVED_VALID / NO_LIVE_HV / NO_VEHICLE_CLEARANCE /
NO_COMPLIANCE_AUTHORITY`, never just SIMULATION_ONLY or PASS.

### Other corrections

- **ACK/listen-only proof must watch the TX line (RC-186):** a shared-slot
  CAN analyzer can't prove which node ACKed → oscilloscope on the VCU
  TX/TXD line + register dump + zero TX mailbox + TX-pin gated + controlled
  bench bus + analyzer log; criterion = "VCU_TXD inactive during the ACK
  slot and all frame periods," not `f.is_ack_asserted`.
- **CAN-H/CAN-L short is bench-only (RC-187):** forbidden on a live Ford
  network; bench harness / simulated OEM nodes only (reinforces RC-182).
- **Timing Authority field + return language (RC-188):** every timing =
  SimulationSweepOnly / SupplierDataPending / HILObservedOnly; scripts
  return `HIL_OBSERVED_VALID_NO_GATE_AUTHORITY` /
  `HIL_NEEDS_REVIEW_NO_GATE_AUTHORITY` (the latter replacing
  MODEL_STRESS_FAILURE unless the script crashed / violated a hard bench
  safety rule). (Fourth-gate recurrence of the invented-timing family,
  RC-116/133/169/174/180.)
- **LV bench-profile labels (RC-189):** 11.8–14.2 V, ≥20 V/ms, 0–5 V APPS =
  `TestBenchProfileCandidate / NotFinalVehicleRequirement / NeedsComponentSpec`.

### Gate 05H status (owner review_40)

`HIL_TEST_PROTOCOL_DRAFTED` / `LOW_VOLTAGE_HIL_ONLY` / `REAL_VCU_DUT_ALLOWED`
/ `NO_LIVE_HV` / `NO_VEHICLE_TESTING` / `NO_FACTORY_BUS_TRANSMISSION` /
`TIMING_VALUES_NOT_GATE_AUTHORITY` / `ARTIFACT_PACKAGE_DEFINED` /
`BENCH_EXECUTION_PENDING`. After a real run, Gate 05H-B = `HIL_RUN_OBSERVED /
RAW_LOGS_CAPTURED / NO_VEHICLE_CLEARANCE / READY_FOR_ENGINEERING_REVIEW`.

### Next

Owner: **Gate 05I — Physical Bench Proof** (production-like wiring / harness
/ components; runs only after 05H-B HIL bench observation + engineering
review; still no vehicle, no live HV without a staged safety plan +
LOTO/PPE). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Low-voltage HIL only; real VCU DUT allowed but no live HV / no vehicle /
  no compliance authority; CAN_1 listen-only (bench/simulated, TXD-line
  proof); no HIL timing becomes a gate limit until a source/HIL requirement
  upgrades it; bench execution pending.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; ODRs untouched.

---

## 52. Batch 44 + owner review_41 — Gate 05H v3 (physical HIL/bench evidence) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_44_gate05h_v3_physical_hil_evidence.md`
and `docs/research/raw/owner_reviews/review_41_batch_44_verdict.md`.
Row additions: RC-190..RC-196 (no new CS). Deliverable **updated**:
`docs/status/GATE05H_HIL_BENCH_TEST_PROTOCOL.md`. Owner: "the best Gate 05H
version so far … the direction is right." (The Hunter had folded the
review_40 fixes into the payload — the 05H-A/05H-B/05I framing, the physical
DUT, the TXD-line scope proof, the configurable timeout — so this batch is
the owner's honest-language + bench-safety cleanup.)

**Note — duplicate "43:75" re-send handled just before this batch:** the
owner re-sent the "43:75" message byte-identical; recorded as a
duplicate-delivery note in PROVENANCE (no new evidence/rows/section), commit
`58d155b`.

### The upgrade — HIL is now real bench evidence, cleaned of vehicle-approval language

- **Evidence boundary (RC-190):** HIL results are real low-voltage HIL /
  bench evidence **scoped to this DUT / firmware / harness / simulated-node
  setup** — never vehicle-level control authority, live-HV approval,
  road-test approval, or compliance proof without engineering review +
  supplier confirmation + later gates.
- **Result categories (RC-191):** `…_NO_VEHICLE_AUTHORITY`,
  `HIL_HARD_BLOCK` (CAN_1 TXD activity / factory-bus transmit leakage),
  `HIL_INVALID_RUN` (missing artifact package).

### Bench-safety corrections

- **CAN short bench-only hard rule (RC-192):** protected harness, simulated
  OEM nodes, current-limited; forbidden on a live Ford network / customer
  vehicle.
- **Non-destructive TX fault (RC-193):** controlled stuck-dominant/TXD fault
  through a protected path; no destructive MCU/transceiver-pin shorting
  unless the fixture is designed for it.
- **Calibration records (RC-194)** + **mandatory pre-test safety checklist
  (RC-195):** no live HV / no battery pack / no contactor coil unless part
  of the LV test / current-limited supply / bench E-stop / fused DUT /
  wiring reviewed / firmware hash / CAN_1 to sim nodes only / raw logging
  before fault injection.
- **Gate 05I is low-voltage only (RC-196):** production-like LV bench
  integration (real harness/VCU/BMS-PDU/inverter controller); no
  traction-battery HV, no vehicle road test, no Ford factory bus transmit.

### Gate 05H status (owner review_41)

`HIL_VALIDATION_PROTOCOL_CREATED` / `REAL_VCU_DUT_ALLOWED` /
`LOW_VOLTAGE_HIL_ONLY` / `PHYSICAL_TRANSCEIVER_EVIDENCE_REQUIRED` /
`CAN_1_LISTEN_ONLY_PROOF_REQUIRED` / `NO_LIVE_HV` / `NO_REAL_VEHICLE_NETWORK`
/ `NO_VEHICLE_TESTING` / `NO_COMPLIANCE_AUTHORITY` /
`PENDING_ENGINEERING_REVIEW`. After a real run, Gate 05H-B =
`HIL_RUN_OBSERVED / RAW_LOGS_CAPTURED / ARTIFACT_PACKAGE_COMPLETE /
ENGINEERING_REVIEW_PENDING / NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05I — Physical (low-voltage) Bench Integration** (RC-196
scope). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Low-voltage HIL only; real VCU DUT but no live HV / no real vehicle
  network / no vehicle testing / no compliance authority; CAN_1 listen-only
  (TXD-line proof); destructive fault injection only on a fixture designed
  for it; no HIL timing becomes a gate limit until engineering review /
  supplier confirmation upgrades it.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; ODRs untouched.

---

## 53. Batch 45 + owner review_42 — Gate 05I Physical Bench Integration (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_45_gate05i_bench_integration.md`
and `docs/research/raw/owner_reviews/review_42_batch_45_verdict.md`.
Row additions: RC-197..RC-201 (no new CS). Deliverable:
`docs/status/GATE05I_BENCH_INTEGRATION.md`. Owner: "yes, begin Gate 05I —
but keep it low-voltage physical bench integration only; **do not move to
Gate 05J / live vehicle commissioning yet**."

### Scope kept (owner: "excellent")

HV traction battery forbidden (LV aux 12 V only, HV isolated); vehicle road
testing forbidden; live Ford factory-bus injection forbidden; supplier
BMS/PDU + inverter controller logic only; production-like harness; real
E-stop/interlock loop; calibration records; raw CAN logs; oscilloscope
captures; harness part numbers; firmware versions. Gate 05I is real bench
evidence, not software evidence.

### Owner corrections

- **BENCH result categories (RC-197):** Gate 05I reports
  `BENCH_OBSERVED_VALID_NO_VEHICLE_AUTHORITY` /
  `BENCH_NEEDS_REVIEW_NO_VEHICLE_AUTHORITY` / `BENCH_HARD_BLOCK` /
  `BENCH_INVALID_RUN` — not HIL labels (Gate 05H = HIL, Gate 05I = LV bench).
- **E-stop measured, not "instant" (RC-198):** coil decay + relay drop-out
  time measured against the schematic + component datasheets.
- **Production-intent harness (RC-199):** `PRODUCTION_INTENT /
  NOT_RELEASED_FOR_VEHICLE_INSTALL`, not "production-spec/released."
- **CAN_1 fault-injection protected-bench-only (RC-200):** forbidden on a
  live Ford vehicle network.
- **Driver-safety stays bench-level (RC-201):** opens sub-gate **Gate 05I-A
  — Low-Voltage Driver Safety Logic Verification** (blocked: real
  propulsion, live HV, wheels-on-ground, Ford ABS/ESC, cluster injection,
  road-test claims).

### Gate 05I status (owner review_42)

`LOW_VOLTAGE_BENCH_INTEGRATION_STARTED` / `PRODUCTION_INTENT_HARNESS_REQUIRED`
/ `REAL_VCU_REQUIRED` / `SUPPLIER_LOGIC_NODES_REQUIRED` /
`HARDWIRED_ESTOP_REQUIRED` / `NO_HV_TRACTION_BATTERY` /
`NO_VEHICLE_ROAD_TESTING` / `NO_LIVE_FORD_BUS_TRANSMISSION` /
`NO_VEHICLE_CLEARANCE` / `PENDING_ENGINEERING_REVIEW`. **Gate 05J / live
vehicle commissioning explicitly NOT YET.**

### Next

Owner: **Gate 05I-A — Low-Voltage Driver Safety Logic Verification**
(bench-only; owner supplied the verbatim 13-test prompt + per-test field
list + hard rules). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Low-voltage bench only; HV traction battery forbidden + isolated; no
  vehicle road testing; no live Ford-bus transmission; CAN_1 listen-only
  (protected/simulated fault injection only); non-destructive fault
  injection; no vehicle clearance; pending engineering review.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 54. Batch 46 + owner review_43 — Gate 05I-A Low-Voltage Driver Safety Logic Verification (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_46_gate05ia_driver_safety_logic.md`
and `docs/research/raw/owner_reviews/review_43_batch_46_verdict.md`.
Row additions: RC-202..RC-207 (no new CS). Deliverable:
`docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (13-row driver-safety
verification matrix + brake-override script + calibration record). Owner:
"the correct next subgate … very strong."

### Scope kept (owner: "a serious bench safety-logic package")

The three CRITICAL_RESTRICTIONs (zero vehicle motion, zero live HV, zero
road-test approval) + the 13 driver-safety logic checks (APPS plausibility,
brake override, shift inhibit, charger-plug drive lockout, E-stop, HVIL
open, BMS no-discharge, inverter fault, LV brownout, fault-latch
persistence, service clear, isolated EV warning display, CAN_1 listen-only).

### Recurrence caught — invented timing/percentages, sixth+ artifact (RC-202)

The batch embedded >10% / >25% / >5% APPS thresholds, 13.5→8.5 V / ≥20 V/ms,
and 50/15/10 ms timings as if they were rules — same defect family as
RC-116/133/169/174/180/188. Downgraded to `BENCH_TARGET_PROFILE /
SUPPLIER_DATA_PENDING / CONTROLS_REVIEW_REQUIRED`; script window made
configurable. **The invented-timing family has now recurred across seven
artifacts — the strongest standing case for the M10 regression scanner.**

### Other corrections

- **Expected-safe-output vs blocked-outputs (RC-203):** a torque-zero
  response is the safe output, not a "blocked output" (tests 001/002/004/
  007/008/010).
- **No "immediate" (RC-204):** zero-torque within the configured window;
  measured latency (brake override, E-stop, charger lockout).
- **HVIL ownership (RC-205):** VCU requests; BMS/PDU/hardwired loop owns
  isolation execution.
- **Service-clear rule (RC-206):** software records only; never active
  hardwired/HVIL/E-stop/BMS/isolation faults or a live latch; requires
  safe/neutral + technician authorization + fault source reviewed.
- **Reviewable block, not permanent (RC-207):**
  `HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW` + root-cause / corrective-action /
  re-test / signoff / versioned record.
- Script returns BENCH categories (RC-197), never HIL/PASS.

### Gate 05I-A status (owner review_43)

`BENCH_TEST_MATRIX_CREATED` / `LOW_VOLTAGE_BENCH_ONLY` /
`DRIVER_INPUT_LOGIC_UNDER_TEST` / `NO_LIVE_HV` / `NO_VEHICLE_MOTION` /
`NO_LIVE_FORD_CAN_TRANSMISSION` / `TIMING_VALUES_TARGET_PROFILE_ONLY` /
`BENCH_EVIDENCE_PENDING` / `NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05I-B — Mechanical Interlocks & Physical Safety Loop
Verification** (E-stop circuit, HVIL connectors, service-disconnect state,
charge-port interlock, contactor-simulator coil path, safety-relay dropout,
fuse/power-distribution, LV harness strain relief, connector keying, ground
continuity, shield continuity, bench LOTO verification). Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Low-voltage bench only; no live HV; no vehicle motion; no live Ford-bus
  transmission; CAN_1 listen-only; the VCU requests but does not own HV
  isolation (BQ-27); no bench timing/percentage becomes a rule until
  controls review + supplier confirmation upgrades it.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 55. Batch 47 + owner review_44 — Gate 05I-A (revised) + Gate 05I-B Mechanical Interlocks (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_47_gate05ia_revised_gate05ib_interlocks.md`
and `docs/research/raw/owner_reviews/review_44_batch_47_verdict.md`.
Row additions: RC-208..RC-209 (no new CS). Deliverables:
`docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (updated) +
`docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (new). Owner: "a very strong
05I-A + 05I-B package … serious bench-validation structure; still not
vehicle/HV/road-test approval."

### 05I-A review_43 fixes realized in the re-emit

The Hunter applied HVIL ownership (RC-205 — VCU requests, BMS/PDU/hardwired
loop owns isolation), the **Service Clear Operational Law** (RC-206 — UDS
0x14 clears software records only, six preconditions), and the 4-step
RCA/corrective-action/repeat-test/engineering-signoff flow (RC-207 —
`HARD_BLOCKED_PENDING_ROOT_CAUSE_REVIEW`). Owner: "the Service Clear
Operational Law is excellent … protects the system from a laptop 'clear'
becoming a fake safety reset."

### Recurrence caught + new criteria (RC-208)

The re-emitted 05I-A matrix STILL carried hard timing/percentages and the
mis-used "Blocked Outputs" column (RC-202/203 not applied by the Hunter),
and 05I-B added new numeric criteria (<0.1 Ω / <0.02 Ω / ≤20 ms / 5 A-10 A).
All labeled `BENCH_TARGET_PROFILE` (05I-A) / `TARGET_BENCH_CRITERIA /
NEEDS_COMPONENT_DATASHEET / NEEDS_ENGINEERING_REVIEW` (05I-B); the safe
torque-zero response is an **Expected Safe Output**, not a blocked output;
**"direct contactor control by VCU"** added to the blocked-outputs set. This
is the invented-values family's eighth artifact (RC-116/133/169/174/180/188/
202/208).

### 05I-B breach logic must not hard-code limits (RC-209)

`IF ground_resistance_ohms >= 0.02 OR safety_relay_dropout_ms > 20.0` →
`approved_ground_limit` / `approved_datasheet_limit` variables.

### Status (owner review_44)

Gate 05I-A adds `SERVICE_CLEAR_RULES_DEFINED / ROOT_CAUSE_FLOW_DEFINED`.
Gate 05I-B = `MECHANICAL_INTERLOCK_MATRIX_CREATED /
PHYSICAL_SAFETY_LOOP_TESTS_DEFINED / PRODUCTION_INTENT_HARNESS_REQUIRED /
BENCH_LOTO_REQUIRED / TARGET_CRITERIA_PENDING_SOURCE_REVIEW / NO_LIVE_HV /
NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05I-C — Low-Voltage Communications Integration** (CAN_2
VCU↔inverter, CAN_3 VCU↔BMS/PDU, display-node comm, diagnostic-tool comm,
heartbeat, message filtering, DBC version matching, wrong-DTC/wrong-ID
rejection, bus load under max frame density, no CAN_1 leakage during all
comm tests). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; production-intent harness; bench LOTO; the VCU requests but
  does not own HV isolation (BQ-27); no bench criterion becomes a rule until
  component datasheet + engineering review confirms it.
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 56. Batch 48 + owner review_45 — Gate 05I-A (final baseline) + 05I-B (refined) + 05I-C (Comms, split C1/C2) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_48_gate05ia_final_gate05ib_gate05ic_comms.md`
and `docs/research/raw/owner_reviews/review_45_batch_48_verdict.md`.
Row additions: RC-210..RC-214 (no new CS). Deliverables:
`docs/status/GATE05I_A_DRIVER_SAFETY_LOGIC.md` (updated),
`docs/status/GATE05I_B_MECHANICAL_INTERLOCKS.md` (updated),
`docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md` (new). Owner: "very strong … Gate
05I-C is the correct next move; the table structure is now the right Build
Engine format; the Service Clear Operational Law is excellent — keep it
permanently."

### The good — the blocked-outputs column split finally landed (RC-203/208 realized)

The re-emitted 05I-A + 05I-B matrices now separate **Expected Safe Output**
(e.g. "CAN_2 torque → zero") from **Blocked Outputs (MUST NEVER OCCUR)**
(non-zero torque post-fault, CAN_1 transmission, factory-cluster injection,
automatic fault clear, direct contactor control by VCU). Owner: "that is the
right Build Engine format."

### Recurrences caught

- **"immediate" wording (RC-211, recurrence of RC-175/198/204):** "command
  immediate zero-torque", "trigger immediate shift", "loop opens
  immediately", "immediate continuity break" → measured-within-a-configured-
  window language.
- **Hard values acting as rules (RC-212, ninth artifact of the
  invented-values family):** all the 05I-A/05I-B numbers + the new **>75%
  bus utilization** and **>100 ms heartbeat** → `BENCH_TARGET_PROFILE /
  SUPPLIER_DATA_PENDING / ENGINEERING_REVIEW_REQUIRED`; breach limits are
  variables.

### Other corrections

- **05I-C intro over-claim (RC-210):** "…validated" → "…matrices defined and
  bench evidence collected" (status is MATRIX_CREATED / BENCH_EVIDENCE_
  PENDING).
- **DBC terminology (RC-213):** a DBC is a database/map, not a packet; reject
  wrong-arbitration-ID / wrong-PGN / wrong-DBC-version / bad-checksum /
  rolling-counter / out-of-range / unexpected-diagnostic-request; heartbeat
  is a configured target window pending source review.
- **Sleep/wake sub-gate (RC-214):** Gate 05I-C splits into **05I-C1**
  (Communication Network Integrity) + **05I-C2** (Sleep/Wake/Parasitic
  Drain).

### Status (owner review_45)

05I-A = `FINAL_BASELINE_MATRIX_CREATED / BENCH_EVIDENCE_PENDING`; 05I-B =
`MECHANICAL_INTERLOCK_MATRIX_CREATED / BENCH_EVIDENCE_PENDING`; 05I-C =
`STARTED / LOW_VOLTAGE_BENCH_ONLY / NETWORK_INTEGRITY_MATRIX_PENDING /
SLEEP_WAKE_MATRIX_PENDING / DBC_VERSION_CONTROL_REQUIRED /
HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`. Chain: logic →
interlocks → communications → sleep/wake → later physical bench integration
review.

### Next

Owner: **Gate 05I-C1 — Communication Network Integrity** (then 05I-C2
Sleep/Wake/Parasitic Drain). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + no leakage during any comm test; a DBC
  is a database not a packet; no bench value becomes a rule until controls
  review + supplier/DBC confirmation upgrades it; the VCU requests but does
  not own HV isolation (BQ-27).
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 57. Batch 49 + owner review_46 — Gate 05I-C full comms + sleep/wake matrix ("48:75 B follow-up") (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_49_gate05ic_comms_matrix.md`
and `docs/research/raw/owner_reviews/review_46_batch_49_verdict.md`.
Row additions: RC-215..RC-219 (no new CS). Deliverable updated:
`docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`. Delivered as the "48:75 B
follow-up" — the full Gate 05I-C matrix realizing the queued 05I-C1
(Communication Network Integrity) + 05I-C2 (Sleep/Wake). Owner: "exactly the
right next gate … the real hidden-failure layer."

### Scope kept (owner: "very good test coverage")

CAN_1 silent mode, CAN_2 inverter comm, CAN_3 BMS/PDU comm, DBC mismatch,
wrong-ID rejection, bad-checksum/DLC, heartbeat loss, UDS sessions,
sleep/wake, bus-load stress, quiescent current — the 8-row matrix + stress
profiles (120 Ω 1% termination, twisted-shielded 110 turns/m, ≥10 m harness,
0-30/30-75/75-90% bus stress) + DBC version control + sleep/wake transition.

### Recurrence caught — invented values, tenth artifact (RC-215)

All the timings/percentages/currents (>15 ms, 100 ms, 50 ms, ≤2.0 s, ≤1.0 mA,
≤200 ms, 75-90%, 10 m, 110 turns/m, >4.5 V, >150 °C) labeled
`BENCH_TARGET_PROFILE`; sleep current split per-node + total-system; IF logic
made variable (`approved_latency_limit_ms` / `approved_bus_load_target`).

### Other corrections

- **CAN_1 ACK proof (RC-216):** probe the VCU TXD/transceiver path (not just
  decoded bus logs); other sim OEM nodes may ACK, the VCU must not.
- **Frame-fault layering (RC-217):** bad CRC/DLC = controller-level;
  wrong-ID/source/DBC/counter/checksum/out-of-range = app-level.
- **DBC version hash (RC-218):** stored in the Build Engine + declared by
  firmware + logged by the bench; mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW.
- **CAN_1 bench boundary (RC-219):** simulated OEM / protected bench only; no
  live Ford network during 05I-C.

### Gate 05I-C status (owner review_46)

`NETWORK_INTEGRITY_MATRIX_CREATED / SLEEP_WAKE_VALIDATION_INCLUDED /
LOW_VOLTAGE_BENCH_ONLY / CAN_1_LISTEN_ONLY_PROOF_REQUIRED /
DBC_VERSION_CONTROL_REQUIRED / HEARTBEAT_TARGETS_PENDING_SOURCE_REVIEW /
SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated Fault
Sequence** — test everything together as a combined sequence (driver input,
brake override, E-stop, HVIL open, BMS no-discharge, inverter fault, CAN
heartbeat loss, display warning, diagnostic lockout, sleep/wake recovery,
CAN_1 silence), not isolated tests. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only + no leakage; DBC version hash enforced; no
  bench value becomes a rule until controls review + supplier/DBC
  confirmation upgrades it; the VCU requests but does not own HV isolation
  (BQ-27).
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 58. Batch 50 + owner review_47 — Gate 05I-C v2 (full 05I-C1 + 05I-C2) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_50_gate05ic_v2_c1_c2.md`
and `docs/research/raw/owner_reviews/review_47_batch_50_verdict.md`.
Row additions: RC-220..RC-223 (no new CS). Deliverable updated:
`docs/status/GATE05I_C_COMMS_SLEEP_WAKE.md`. Owner: "a strong Gate 05I-C
draft … now a real bench network-integrity gate; the DBC version hash +
TXD-pin proof are excellent."

### review_46 fixes realized in the re-emit

The Hunter applied: the C1/C2 split; the CAN_1 TXD-pin ACK proof (RC-216);
the physical/protocol vs application-layer fault split (RC-217); the DBC
version hash/checksum stored in the Build Engine + firmware-declared +
bench-logged, mismatch = BENCH_HARD_BLOCK_PENDING_REVIEW (RC-218); per-node
sleep-current targets. Owner: "excellent — prevents the classic silent
wrong-scale/byte-order decode; the TXD-pin proof is the correct proof level."

### Recurrence + new corrections

- **Values still act like rules (RC-220, eleventh artifact):** all the 05I-C
  timings/percentages/currents → `BENCH_TARGET_PROFILE`; the
  formatting-damaged sleep-current list made explicit per node
  (VCU/BMS/PDU/Inverter/Display/Total_system).
- **CAN_1 diagram simulated/protected only (RC-221):** "Production CAN_1" →
  "Simulated OEM CAN_1 Traffic / Protected Bench Harness"; no live Ford
  network during 05I-C.
- **Fault-injection wording (RC-222):** bad CRC/bit-stuffing via a CAN
  fault-injection tool below the app layer; wrong-ID/DBC/counter are
  app-layer.
- **Brownout early-warning hardware (RC-223):** NVM save needs verified
  early-warning threshold + hold-up capacitance + write-time budget +
  memory endurance; 6.0 V/9.0 V are bench profile pending hardware design +
  bench proof.

### Gate 05I-C status (owner review_47)

`NETWORK_INTEGRITY_MATRIX_CREATED / SLEEP_WAKE_MATRIX_CREATED /
LOW_VOLTAGE_BENCH_ONLY / CAN_1_LISTEN_ONLY_PROOF_REQUIRED /
DBC_VERSION_HASH_REQUIRED / APPLICATION_LAYER_VALIDATION_DEFINED /
PHYSICAL_CAN_FAULT_INJECTION_DEFINED /
SLEEP_CURRENT_TARGETS_PENDING_SOURCE_REVIEW /
HEARTBEAT_TIMEOUTS_PENDING_SOURCE_REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION /
NO_LIVE_FORD_CAN_TRANSMISSION / NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05I-D — Low-Voltage End-to-End Bench Run / Integrated Fault
Cascades** (12 cascades: accel+brake override, torque+HVIL open, torque+BMS
no-discharge, torque+inverter fault, torque+CAN_2 heartbeat loss, charge-plug
during drive, E-stop during active torque, brownout during fault latch,
service-clear during active fault, sleep with stuck-awake node, CAN_1 silence
during every cascade, display warning during every cascade). Owner approved
detailing 05I-D next. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Bench-only; no live HV; no vehicle motion; no Ford factory-bus
  transmission; CAN_1 listen-only (TXD-pin proof) + no leakage during any
  cascade; DBC version hash enforced; no bench value becomes a rule until
  controls review + supplier/DBC confirmation upgrades it; the VCU requests
  but does not own HV isolation (BQ-27).
- Nothing ingested; nothing marked Confirmed; scripts are illustrative
  pseudocode, not production code; Gate 05J NOT YET; ODRs untouched.

---

## 59. Batch 51 + owner review_48 — Gate 05I-D Integrated Fault Cascades + the post-bench gate ladder (D-008) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_51_gate05id_integrated_fault_cascades.md`
and `docs/research/raw/owner_reviews/review_48_batch_51_verdict.md`.
Row additions: RC-224..RC-228 (no new CS). Decision **D-008** added.
Deliverable: `docs/status/GATE05I_D_INTEGRATED_FAULT_CASCADES.md`. Owner:
"the correct next gate … you are now testing the system as a system."

### Gate 05I-D — the integration layer

A 10-row integrated-fault-cascade matrix (accel+brake override, torque+HVIL
open, torque+BMS no-discharge, torque+inverter fault, torque+CAN_2 heartbeat
loss, charge-plug during drive, E-stop during active torque, brownout during
fault latch, service-clear during fault, sleep with stuck-awake node) under
the global constraint **CAN_1 silence (TXD pin at Vcc, 0 frames) logged
across every cascade**, + exit criteria.

### The critical correction — never "certified safe" (RC-224 + D-008)

The Hunter's exit line "the low-voltage bench assembly is **certified safe
for installation** into the physical vehicle chassis" was rejected →
"eligible for **engineering review for controlled low-voltage vehicle
fitment only**; does not authorize live HV / vehicle movement / road testing
/ chassis-dyno / customer operation / factory Ford bus transmission /
compliance or certification claims." The owner then defined a **staged
post-bench gate ladder (Decision Register D-008): Gate 05J** (Controlled
Vehicle Fitment / No-HV Installation Readiness — no HV battery, no traction
enable, CAN_1 listen-only, verify grounds/shields/routing/no-chafing/service-
access/LOTO/12 V parasitic draw/no Ford bus disturbance) **→ Gate 05K**
(LV Vehicle Power-On / No-HV Commissioning) **→ Gate 05L** (Controlled HV
First-Energization, engineer-approved only). This redefines the old "Gate
05J = live vehicle commissioning" placeholder — HV is now Gate 05L, behind
two no-HV gates.

### Other corrections

- **Test IDs + timing labels + no "immediate" (RC-225, twelfth artifact):**
  `05D-###` → `05I-D-###`; all timings BENCH_TARGET_PROFILE; measured
  windows.
- **Charger-plug detect + reject (RC-226):** the VCU recognizes and rejects
  the illegal state, never "ignores" it.
- **E-stop ownership (RC-227):** the hardwired loop owns physical
  interruption; the VCU observes/commands-torque-zero/logs/latches.
- **Sleep-current node vs total (RC-228):** VCU node ≤1.0 mA separate from
  total-system ≤4.0 mA.

### Gate 05I-D status (owner review_48)

`INTEGRATED_FAULT_SEQUENCE_MATRIX_CREATED / LOW_VOLTAGE_BENCH_ONLY /
REAL_VCU_DUT_REQUIRED / SUPPLIER_LOGIC_BOARDS_REQUIRED /
CAN_1_SILENCE_REQUIRED_DURING_ALL_CASCADES / TIMING_TARGETS_PENDING_SOURCE_
REVIEW / NO_LIVE_HV / NO_VEHICLE_MOTION / NO_LIVE_FORD_CAN_TRANSMISSION /
NO_VEHICLE_CLEARANCE`.

### Next

Owner: **Gate 05J — Controlled Vehicle Fitment / No-HV Installation
Readiness** (D-008 ladder). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Bench-only through 05I-D; the ladder to HV is staged + engineer-gated
  (D-008); never "certified safe" (RC-224); CAN_1 silent + logged during
  every cascade; the hardwired E-stop loop owns physical interruption; no
  bench value becomes a rule until controls review + supplier confirmation
  upgrades it; the VCU requests but does not own HV isolation (BQ-27).
- Nothing ingested; nothing marked Confirmed; no compliance/certification
  claim; scripts are illustrative pseudocode, not production code; ODRs
  untouched.

---

## 60. Batch 52 + owner review_49 — Gate 05I-D (final) + Gate 05J Controlled Vehicle Fitment (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_52_gate05id_final_gate05j_fitment.md`
and `docs/research/raw/owner_reviews/review_49_batch_52_verdict.md`.
Row additions: RC-229..RC-232 (no new CS). Deliverable:
`docs/status/GATE05J_VEHICLE_FITMENT.md`. Owner: "the right next boundary:
controlled vehicle fitment with no HV connected."

### 05I-D finalized

The re-emit applied the review_48 fixes (05I-D-### IDs, no "immediate",
charger-plug detect+reject, E-stop hardwired-loop ownership, VCU/total
sleep-current separated, "permits engineering review for controlled
low-voltage vehicle fitment only" exit language) — RC-224..228 realized.

### Gate 05J — first physical-vehicle touch (NO HV)

The conversion physically touches the vehicle for the first time (no HV
connected/energized): mechanical/routing verification, grounding/shielding,
in-chassis parasitic draw, HV LOTO, and — notably — the **first connection of
the VCU CAN_1 transceiver to the live OEM Ford CAN_1 network in passive
listen-only**. 5-row matrix + exit criteria.

### Owner corrections

- **05J is fitment, not commissioning (RC-229):** passive/no-HV in-chassis
  checks only; Gate 05K is the first formal LV power-on gate.
- **CAN_1 live-Ford connection precondition + passive-only (RC-230):** only
  after the Gate 05H + 05I-C listen-only/silence proofs; Ford baseline scan →
  connect passive → post-connection scan → compare; VCU passive listen-only
  only (no transmit/ACK/error frames/wake/spoof). A clean cluster alone is
  insufficient.
- **Parasitic draw separated (RC-231):** OEM_baseline vs conversion_added
  (≤4.0 mA target) vs total_vehicle.
- **Fitment values are target profiles + "live OEM Ford" wording (RC-232,
  thirteenth artifact):** 50/100 mm, <0.1 Ω, ≤4.0 mA, ≤2.0 s =
  INITIAL_TARGET_PROFILE / ENGINEERING_REVIEW_REQUIRED.

### Gate 05J status (owner review_49)

`CONTROLLED_VEHICLE_FITMENT_STARTED / NO_HV_CONNECTED / NO_TRACTION_ENABLE /
NO_VEHICLE_MOTION / PASSIVE_CAN1_ONLY / VCU_HARNESS_FITMENT_UNDER_REVIEW /
GROUNDING_AND_SHIELDING_UNDER_REVIEW /
IN_CHASSIS_PARASITIC_DRAW_BASELINE_REQUIRED / FORD_BASELINE_SCAN_REQUIRED /
NO_ROAD_TEST_AUTHORITY / NO_CUSTOMER_OPERATION`. Permits **Gate 05K only**;
does not authorize live HV / traction enable / vehicle movement / chassis-dyno
/ road testing / customer operation / compliance claims.

### Next

Owner: **Gate 05K — Low-Voltage Vehicle Power-On / No-HV Commissioning**
(ignition off/accessory/key-on/run, VCU + display wake, CAN_1 passive
monitoring, CAN_2/CAN_3 isolated activity, diagnostic access, no HV contactor
activity, no torque command, no Ford DTCs, parasitic draw after sleep,
fault-latch behaviour in chassis). Then Gate 05L — Controlled HV
First-Energization (engineer-approved only, D-008). Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- No HV connected/energized through 05J-05K; the VCU connects to the live
  OEM Ford CAN_1 only in passive listen-only after the bench proofs (RC-230);
  parasitic draw separated OEM/conversion/total (RC-231); never "certified
  safe" (RC-224); no fitment value becomes a rule until engineering review +
  the vehicle package confirm it (RC-232); the VCU requests but does not own
  HV isolation (BQ-27).
- Nothing ingested; nothing marked Confirmed; no compliance/certification
  claim; ODRs untouched.

## 61. Batch 53 + owner review_50 — Gate 05J cleanups + Gate 05K Low-Voltage Vehicle Power-On (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_53_gate05j_cleanups_gate05k_power_on.md`
and `docs/research/raw/owner_reviews/review_50_batch_53_verdict.md`.
Row additions: RC-233..RC-237 (no new CS). Deliverables:
`docs/status/GATE05K_VEHICLE_POWER_ON.md` (new) +
`docs/status/GATE05J_VEHICLE_FITMENT.md` (cleanups applied). Owner: "a strong
Gate 05J → 05K transition … fitment first, low-voltage vehicle power-on
second, HV later."

### Gate 05J cleanups realized

The Hunter re-emitted the Gate 05J CAN_1 connection prerequisites, the
dual-stage Ford scan protocol (baseline → passive connect → post-connection
scan → differential DTC/U-code analysis), and the parasitic-draw
disambiguation (`OEM_baseline` / `conversion_added` ≤4.0 mA / `total_vehicle`
with the sum equation) — RC-230/231 realized. Owner praised the CAN_1
prerequisite section and the parasitic split as the strongest parts.

### Gate 05K — first formal LV vehicle power-on (NO HV)

The first power-on of the conversion inside the chassis, HV under LOTO. Built
from the owner-preferred 9-test version (05K-001..009): ignition-off quiescent
draw, accessory transition, key-on/run wake, CAN_1 passive monitoring, isolated
CAN_2/CAN_3 comms, UDS session access, HV lockout enforcement, Ford system
error immunity, in-chassis fault-latch survival across a power cycle — under
the global precondition CAN_1 strictly listen-only (register + TXD proof).

### Owner corrections

- **Delete the duplicate older Gate 05K — keep the second 9-test version
  (RC-233):** the earlier 5-test version conflicts; the deliverable uses the
  9-test version, the first is archived-superseded (raw only).
- **05J-003 parasitic-draw row wording (RC-234, recurrence of RC-231):**
  "Total sleep current draw ≤4.0 mA" → conversion_added ≤4.0 mA + OEM_baseline
  + total_vehicle measured/logged separately. Fixed in the 05J matrix row.
- **Hard numbers still target profiles (RC-235, fourteenth artifact):** the
  05K timings (≤200 ms wake, ≤500 ms display, ≤50 ms UDS, ≤0.5 V drop, ≤5%
  APPS, ≤100 ms brake override) join the 05J set → INITIAL_TARGET_PROFILE /
  ENGINEERING_REVIEW_REQUIRED / NO_HV_AUTHORITY / NO_VEHICLE_MOTION_AUTHORITY.
- **05K must block real HV contactor closure (RC-236):** coils disconnected /
  dummy loads / mechanically unable to close; no real contactor closure in
  05K; drive pins held at 0.0 V.
- **Gate 05L split — 05L-A authorization first (RC-237, amends D-008):** don't
  open 05L with exact pre-charge timing; begin with Gate 05L-A HV
  First-Energization Authorization & Safety Readiness (qualified personnel,
  LOTO, PPE, insulated tools, e-stop, exclusion zone, fire/emergency plan,
  absence-of-voltage verification, supplier docs, engineer signoff). Owner
  cited OSHA LOTO + NHTSA EV HV-hazard guidance (NeedsExactSource —
  owner-paraphrased, not archived).

### Gate 05J / 05K status (owner review_50)

- 05J: `CONTROLLED_VEHICLE_FITMENT_DEFINED / NO_HV_CONNECTED /
  NO_TRACTION_ENABLE / NO_VEHICLE_MOTION / CAN_1_PASSIVE_ONLY /
  FORD_BASELINE_SCAN_REQUIRED / FORD_POST_CONNECTION_SCAN_REQUIRED /
  CONVERSION_ADDED_PARASITIC_DRAW_TRACKED / GROUNDING_AND_SHIELDING_UNDER_REVIEW
  / NO_ROAD_TEST_AUTHORITY`.
- 05K: `LOW_VOLTAGE_VEHICLE_POWER_ON_DEFINED / NO_HV_CONNECTED /
  NO_REAL_HV_CONTACTOR_CLOSURE / NO_TRACTION_ENABLE / NO_VEHICLE_MOTION /
  CAN_1_PASSIVE_MONITORING_ONLY / IN_CHASSIS_DRIVER_INPUTS_UNDER_TEST /
  IN_CHASSIS_FAULT_LATCH_UNDER_TEST / FORD_DTC_DELTA_REQUIRED /
  NO_ROAD_TEST_AUTHORITY`. Permits **Gate 05L-A only**.

### Next

Owner verbatim next prompt: **Gate 05L-A — Controlled HV First-Energization
Authorization & Safety Readiness** — a pre-energization authorization gate; no
final pre-charge/voltage/insulation/contactor timing unless supplier docs or
engineering review provide them; no vehicle movement / road testing / customer
operation / compliance claim; live HV only after engineer signoff +
safety-protocol activation. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- No HV connected/energized; no real HV contactor closure at 05K (RC-236); the
  VCU connects to the live OEM Ford CAN_1 only in passive listen-only after the
  bench proofs (RC-230); parasitic draw separated OEM/conversion/total
  (RC-231/234); never "certified safe" (RC-224); no 05J/05K value becomes a
  rule until engineering review + supplier/hardware confirm it (RC-235); Gate
  05L is engineer-gated and begins with the 05L-A authorization gate
  (RC-237/D-008); the VCU requests but does not own HV isolation (BQ-27).
- Nothing ingested; nothing marked Confirmed; no compliance/certification
  claim; ODRs untouched.

## 62. Batch 54 + owner review_51 — Gate 05L-A HV First-Energization Authorization & Safety Readiness (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_54_gate05la_hv_authorization.md`
and `docs/research/raw/owner_reviews/review_51_batch_54_verdict.md`.
Row additions: RC-238..RC-244 (no new CS). Deliverable:
`docs/status/GATE05L_A_HV_ENERGIZATION_AUTHORIZATION.md`. Owner: "the right
move … a strong safety-readiness gate … keep 05L-A as authorization only. It
does not energize."

### Gate 05L-A — first gate that contemplates live HV (NO energization)

The first rung of the split Gate 05L: a strict **pre-energization
authorization gate**. Permanent rule (owner): *no high-voltage potential may
be introduced to the vehicle chassis until every line item is physically
verified, signed off, and archived.* Prerequisites across personnel/PPE/
tooling/exclusion-zone/AVV/IMD/E-stop/pre-charge-ownership + a 7-row matrix
(05L-A-001..007) with hard-stop columns + a 12-item hard-stop list. It decides
only whether the system is allowed to *attempt* Gate 05L-B; it does not
energize.

### Owner corrections (safety, grounded in OSHA + NHTSA — NeedsExactSource)

- **Qualified/authorized HV personnel, not "certified technicians" (RC-238):**
  role evidence (documented HV training, task authorization, equipment-
  specific training, emergency-response briefing, assigned lead + safety
  observer).
- **Voltage-matched PPE, not universal Class 0 (RC-239):** final PPE/tool/meter
  class matches pack max + transient voltage + site review; the gate blocks
  above their rating.
- **Fire/emergency response is AHJ/supplier-ERG-selected (RC-240):** lithium-
  ion is not simply "Class D"; fire watch adds shutoff plan, evacuation,
  upwind/uphill staging, 911 protocol, supplier ERG, re-ignition monitoring.
- **Live-Dead-Live via an approved proving source; resolution-aware threshold
  (RC-241, fifteenth artifact):** not just a 12 V source; "0.0 V" → "below the
  approved AVV threshold, meter resolution/noise considered"; >0.5 V =
  INITIAL_AVV_ABORT_TARGET.
- **Stored-energy discharge wait (RC-242):** DC-link caps stay charged after
  isolation → wait the supplier-defined interval, re-verify with Live-Dead-
  Live.
- **IMD threshold is supplier-defined (RC-243):** not "nominal high insulation";
  final thresholds pending supplier manual + system voltage + engineering
  review + standard mapping.
- **Pre-charge loop test is low-voltage-only (RC-244):** no HV bus charging,
  no DC-link rise, no live pre-charge event in 05L-A.

### Gate 05L-A status (owner review_51)

`HV_AUTHORIZATION_GATE_CREATED / NO_HV_ENERGIZATION / QUALIFIED_PERSONNEL_
REQUIRED / LOTO_REQUIRED / LIVE_DEAD_LIVE_REQUIRED / PPE_VOLTAGE_RATING_REVIEW_
REQUIRED / INSULATED_TOOLING_REQUIRED / IMD_READINESS_REQUIRED / ESTOP_
HARDWIRED_PROOF_REQUIRED / PRECHARGE_OWNERSHIP_PENDING_CONFIRMATION / CONTACTOR_
OWNERSHIP_PENDING_CONFIRMATION / SUPPLIER_DOCS_REQUIRED / EMERGENCY_RESPONSE_
PLAN_REQUIRED / ENGINEERING_SIGNOFF_REQUIRED`. Permits **Gate 05L-B only**
after signed engineering authorization; authorizes no energization by itself.

### Next

Owner: **Gate 05L-B — Controlled HV First-Energization / Current-Limited
Pre-Charge Observation** — the first controlled live-HV sequence, but not with
final timing values: start with supplier-defined pre-charge target +
supplier-defined timeout + current-limited setup + remote observation; no
vehicle movement / wheels-on-ground drive / road test / traction command /
customer operation. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- NO HV energized in this gate (authorization only); personnel qualified/
  authorized not vaguely "certified" (RC-238); PPE/tools voltage-matched, gate
  blocks above rating (RC-239); fire assets AHJ/supplier-ERG-selected (RC-240);
  Live-Dead-Live via approved proving source, resolution-aware threshold
  (RC-241); stored-energy discharge wait (RC-242); IMD supplier-defined
  thresholds (RC-243); pre-charge test low-voltage-only (RC-244); the VCU
  requests but the hardwired loop owns physical interruption (RC-205/227;
  BQ-27); OSHA/NHTSA citations NeedsExactSource (RC-237..244); never
  "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no compliance/certification
  claim; no HV energization; ODRs untouched.

## 63. Batch 55 + owner review_52 — Gate 05L-B Controlled HV First-Energization / Current-Limited Pre-Charge Observation (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_55_gate05lb_hv_first_energization.md`
and `docs/research/raw/owner_reviews/review_52_batch_55_verdict.md`.
Row additions: RC-245..RC-251 (no new CS). Deliverable:
`docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md`. Owner: "the right next
direction, but too aggressive in a few spots … do not proceed to 05M yet."

### Gate 05L-B — the first gate with LIVE HV PRESENT (observational only)

The first physical LOTO-pin removal + MSD connect + software-controlled
current-limited pre-charge closure — but **purely observational: no inverter
switching, zero motor RPM, no vehicle movement**, attempted only after a signed
Gate 05L-A authorization. Pre-charge/delta-V rules (RC curve, ΔV lockout, ≥95%
within timeout), contactor weld-detection, a 7-row matrix (05L-B-001..007 after
the added abort row), and exit criteria. First 05L-A cleanups were re-emitted
(stored-energy discharge mandate — RC-242 realized; IMD isolation-resistance
disambiguation — RC-243 realized + candidate 100/500 Ω/V thresholds RC-251).

### Owner corrections

- **Thresholds are initial bench targets, not final gate logic (RC-245,
  sixteenth artifact):** 95% / ≤500 ms / ≤50 ms / ≤60 V / ≤5% ΔV →
  supplier-defined completion threshold + timeout; SUPPLIER_DATA_PENDING /
  ENGINEERING_REVIEW_REQUIRED.
- **Contactor sequence is supplier-specific (RC-246):** model negative-first /
  positive-first / pre-charge-first / integrated BDU-PDU; final needs the
  supplier wiring diagram + controls-engineer approval.
- **VCU does not own contactor/pre-charge closure unless assigned (RC-247):**
  VCU = REQUESTER/MONITOR; BMS/PDU likely owns execution; hardwired loop owns
  emergency interruption; split each test request/owner/feedback/response/
  abort.
- **"Current-limited" needs a real current-limit definition (RC-248):** source
  SUPPLIER_DEFINED/ENGINEERING_APPROVED; required inputs (resistor R, pulse
  energy, DC-link C, pack max V, peak pre-charge current, thermal-recovery
  interval, retry limit); 05L-B blocked without them.
- **Add a manual E-stop abort row (RC-249):** 05L-B-007 — hardwired loop
  interrupts, VCU logs if powered, BMS/PDU → safe state, no auto retry; the
  first live-HV gate must prove the human abort path.
- **Do not jump to Gate 05M — insert Gate 05L-C first (RC-250):** Controlled HV
  Shutdown, Discharge, and Re-Energization Repeatability; inverter/spin only
  after 05L-C.
- **IMD thresholds remain candidate/pending (RC-251):** 100/500 Ω/V pending IMD
  supplier manual + system voltage + engineering review + FMVSS 305/ISO
  6469-3.

### Gate 05L-B status (owner review_52)

`DRAFT_CREATED / LIVE_HV_PRESENT / QUALIFIED_PERSONNEL_REQUIRED /
SUPPLIER_PRECHARGE_DATA_REQUIRED / CONTACTOR_SEQUENCE_PENDING_SUPPLIER_
ARCHITECTURE / VCU_AUTHORITY_REQUESTER_ONLY_UNLESS_DOCUMENTED /
NO_INVERTER_SWITCHING / ZERO_MOTOR_RPM / NO_VEHICLE_MOVEMENT / NO_ROAD_TEST /
NO_TRACTION_COMMAND / TIMING_THRESHOLDS_TARGET_ONLY / ENGINEERING_REVIEW_
REQUIRED`. Permits **Gate 05L-C only**; does not authorize motor spin /
inverter switching / traction command / vehicle movement / chassis dyno / road
testing / customer operation.

### Next

Owner: **Gate 05L-C — Controlled HV Shutdown, Discharge, and Re-Energization
Repeatability** (normal + emergency shutdown, stored-energy discharge, restart
lockout, pre-charge retry limits, IMD fault response, contactor-feedback
consistency, no weld false negatives, repeat-cycle stability). Inverter
enable / motor spin (Gate 05M) only after 05L-C. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- LIVE HV present — engineer-gated, observational only (no inverter switching,
  zero motor RPM, no vehicle movement, RC-245..250); no threshold is final
  gate logic until supplier docs + engineering review upgrade it (RC-245); the
  current-limit definition must be on file first (RC-248); the contactor
  sequence is supplier-specific (RC-246); the VCU requests/monitors but the
  BMS/PDU owns execution and the hardwired loop owns emergency interruption
  (RC-247/205/227; BQ-27); stored-energy discharge wait (RC-242); IMD
  thresholds supplier/standard-pending (RC-243/251); human E-stop abort proven,
  no auto retry (RC-249); never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no motor spin; no compliance/
  certification claim; ODRs untouched.

## 64. Batch 56 + owner review_53 — Gate 05L-B ownership realization + Gate 05L-C Shutdown/Discharge/Repeatability (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_56_gate05lb_ownership_gate05lc_repeatability.md`
and `docs/research/raw/owner_reviews/review_53_batch_56_verdict.md`.
Row additions: RC-252..RC-259 (no new CS). Deliverables:
`docs/status/GATE05L_C_HV_SHUTDOWN_REPEATABILITY.md` (new) +
`docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` (ownership realized +
cleanups). Owner: "a big improvement … you corrected the ownership problem,
fixed the jump from 05L-B to 05L-C."

### Gate 05L-B ownership + current-limit realized

The Hunter re-emitted the control-ownership partition (VCU = Requester/Monitor;
**BMS/PDU owns the contactor + pre-charge execution state machines**; hardwired
loop owns the emergency-interruption path — RC-247 realized), the pre-charge
current-limit prerequisites (R_pre, E_pulse, C_link, V_batt_max, I_peak,
thermal-recovery interval, retry ≤2 — RC-248 realized), and the 05L-B matrix
recast per-test into Request/Owner/Feedback/Measured-HV/Abort columns incl. the
added 05L-B-007 manual-abort row (RC-249 realized). 05L-B status →
`DRAFT_READY_WITH_REVISIONS`.

### Gate 05L-C — shutdown/discharge/repeatability before motor spin

Repeat-cycle stability + off-nominal fault handling of the HV sequencing loop,
live-HV but **zero motor RPM**: normal shutdown, retry-limit lockout, thermal
cool-down, live IMD fault isolation, weld-detection over cycles. 6-row matrix
(05L-C-001..004, 005A/005B after the split).

### Owner corrections

- **Numbers are target profiles (RC-252, seventeenth artifact):** ≤50 ms, ΔV
  ≤5%, ≥95%, ≤500 ms, >60 V, ≤20 ms E-stop, ≤2 retry, 10 cycles →
  INITIAL_TARGET_PROFILE / SUPPLIER_DATA_REQUIRED / ENGINEERING_REVIEW_REQUIRED
  / LIVE_HV_AUTHORITY_PENDING.
- **05L-B-001 must not require V_caps = 0.0 V (RC-253):** no unintended DC-link
  rise beyond the approved leakage/noise threshold; match supplier topology.
- **05L-B-004 timeout wording backwards (RC-254):** a timeout = elapsed exceeds
  the limit; fail-to-reach-threshold-before-expiry → abort/open/log/block.
- **E-stop not "instantly" (RC-255):** measured dropout vs the supplier-approved
  target; no auto retry.
- **05L-C IMD fault injection via approved fixture only (RC-256):** no ad-hoc
  resistor on a live rail.
- **05L-C-001 shutdown order supplier-specific (RC-257):** not universal
  main-positive-first; blocked if it creates DC-link persistence / unsafe path.
- **05L-C-005 weld test split (RC-258):** 005A false-positive (bounce) + 005B
  false-negative (simulated weld always detected, blocks re-energization).
- **Stage the 05M phase (RC-259):** 05M-A inverter-enable/zero-torque → 05M-B
  no-load spin → 05M-C low-speed traction; the first 05M gate proves inverter
  enable with ZERO torque + ZERO rotation, not "low-speed traction."

### Gate 05L-B / 05L-C status (owner review_53)

- 05L-B: `DRAFT_READY_WITH_REVISIONS / LIVE_HV_PRESENT /
  BMS_PDU_CONTACTOR_OWNER_DEFINED / VCU_REQUESTER_MONITOR_ONLY /
  HARDWIRED_SAFETY_LOOP_OWNER_DEFINED / PRECHARGE_CURRENT_LIMIT_REQUIRED /
  TIMING_THRESHOLDS_TARGET_ONLY / NO_INVERTER_SWITCHING / ZERO_MOTOR_RPM / …`.
- 05L-C: `CORRECT_NEXT_GATE / LIVE_HV_PRESENT / ZERO_MOTOR_RPM /
  NO_INVERTER_SWITCHING / SHUTDOWN_SEQUENCE_PENDING_SUPPLIER_ARCHITECTURE /
  DISCHARGE_WINDOW_PENDING_SUPPLIER_DATA / IMD_FAULT_INJECTION_FIXTURE_REQUIRED
  / RETRY_LIMIT_TARGET_ONLY / THERMAL_RECOVERY_TIMER_REQUIRED / …`. Permits
  **Gate 05M-A only**.

### Next

Owner: **Gate 05M-A — Inverter Enable Readiness / Zero-Torque Validation** (the
first traction-inverter gate — inverter enable with ZERO torque + ZERO rotation
before any spin) → 05M-B (no-load spin) → 05M-C (low-speed traction). Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Live-HV, zero motor RPM, no inverter switching, no vehicle movement through
  05L-B/05L-C (RC-252..259); numbers are targets not rules (RC-252); the
  BMS/PDU owns execution, VCU requests/monitors, hardwired loop owns emergency
  interruption (RC-247/205/227; BQ-27); IMD injection via approved fixture only
  (RC-256); shutdown sequence supplier-specific (RC-257); weld detection split
  FP/FN (RC-258); no motor spin until Gate 05M (staged, after 05L-C, RC-259);
  never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no motor spin; no compliance/
  certification claim; ODRs untouched.

## 65. Batch 57 + owner review_54 — Gate 05L-B/05L-C wording cleanups + Gate 05M-A Inverter Enable / Zero-Torque (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_57_gate05lbc_cleanups_gate05ma_inverter_enable.md`
and `docs/research/raw/owner_reviews/review_54_batch_57_verdict.md`.
Row additions: RC-260..RC-266 (no new CS). Deliverables:
`docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (new) +
`docs/status/GATE05L_B_HV_FIRST_ENERGIZATION.md` (RC-261/262 wording). Owner:
"the best version so far … the correct chain: 05L-A → 05L-B → 05L-C → 05M-A →
05M-B."

### Gate 05L-B/05L-C cleanups (three realized, two RECURRED)

The Hunter realized RC-253 (05L-B-001 no V_caps=0.0 V), RC-254 (05L-B-004
corrected timeout), RC-255 (dropout measured not "instant"), and RC-258 (weld
005A/005B split). **But it RE-EMITTED RC-257 and RC-256 unfixed** — 05L-C-001
still said "main-positive first" (RC-263) and 05L-C-004 still said "inject a
resistance path … via test fixture" (RC-264). The `GATE05L_C_*` deliverable
already held the corrected wording from batch_56, so no deliverable regressed;
recorded as the two strongest M10 regression-scanner cases in the HV series.

### Gate 05M-A — inverter enable readiness / zero-torque (NOT spin)

The boundary between static HV distribution and dynamic inverter drive: HV bus
live, inverter gating locked by software+hardware, handshake/sensor/zero-torque
focus. 5-row matrix (05M-A-001 handshake, 002 phase-current offset, 003 static
resolver baseline, 004 supplier-defined torque-disabled, 005 watchdog →
Safe-Off).

### Owner corrections

- **All 05L-B/05L-C/05M-A numbers are target profiles (RC-260, eighteenth
  artifact):** adds 50 ms watchdog, 0 A phase current, 0% PWM, zero resolver
  drift; final limits require SUPPLIER_DATA + ENGINEERING_REVIEW +
  LIVE_HV_TEST_PLAN_APPROVAL + BENCH/CHASSIS PROOF.
- **RC-curve wording too perfect (RC-261):** supplier-approved pre-charge
  envelope; RC curve is a first-order comparison model only.
- **05L-B-007 E-stop failure wording explicit (RC-262):** no automatic retry
  after E-stop, ever; coil supply must not remain energised.
- **05L-C-001 shutdown order still supplier-specific (RC-263, RC-257
  recurrence).**
- **05L-C IMD fault injection still needs approved-fixture wording (RC-264,
  RC-256 recurrence).**
- **05M-A must not assume 0% PWM / real switching (RC-265):** validates the
  supplier-defined inverter ready/torque-disabled state; no power-stage
  switching unless the supplier defines it as safe + engineering approves.
- **05M-A is readiness, not spin (RC-266):** proves boot/handshake/torque-
  disabled/sensors/watchdog with no unintended torque/rotation/current; do not
  jump to 05M-B until proven.

### Gate 05M-A status (owner review_54)

`DRAFT_CREATED / LIVE_HV_PRESENT / INVERTER_READY_STATE_UNDER_TEST /
TORQUE_DISABLED_STATE_REQUIRED / NO_INTENTIONAL_MOTOR_ROTATION /
NO_VEHICLE_MOVEMENT / NO_DRIVER_TORQUE_AUTHORITY /
SUPPLIER_INVERTER_STATE_DEFINITIONS_REQUIRED / WATCHDOG_TARGETS_PENDING_
SUPPLIER_DATA / PHASE_CURRENT_OFFSET_CHECK_REQUIRED / RESOLVER_BASELINE_CHECK_
REQUIRED / NO_ROAD_TEST_AUTHORITY`. Permits **Gate 05M-B only**.

### Next

Owner: **Gate 05M-B — No-Load Motor Spin Validation** (first controlled no-load
spin, motor uncoupled from the drivetrain: resolver offset-angle calibration,
phase-rotation-sequence verification, phase-current harmonic monitoring,
over-current protection). Only after 05M-A is proven. Then Gate 05M-C
(Controlled Low-Speed Traction Readiness). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- HV bus live, zero intentional rotation, torque-disabled at 05M-A
  (RC-260..266); numbers are targets (RC-260); inverter state definitions
  supplier-specific, no assumed 0% PWM (RC-265); VCU requests/monitors, the
  inverter owns gating, BMS/PDU owns contactors/pre-charge, hardwired loop owns
  emergency interruption (RC-247/205/227; BQ-27); no motor spin until Gate
  05M-B, after 05M-A proven (RC-266); RC-263/264 regression watch; never
  "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no motor spin; no compliance/
  certification claim; ODRs untouched.

## 66. Batch 58 + owner review_55 — Gate 05L-B/05L-C/05M-A cleanups + Gate 05M-B No-Load Motor Spin (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_58_gate05lbc_ma_cleanups_gate05mb_spin.md`
and `docs/research/raw/owner_reviews/review_55_batch_58_verdict.md`.
Row additions: RC-267..RC-272 (no new CS). Deliverables:
`docs/status/GATE05M_B_NO_LOAD_MOTOR_SPIN.md` (new) +
`docs/status/GATE05M_A_INVERTER_ENABLE_ZERO_TORQUE.md` (RC-270/271) +
status-label updates on `GATE05L_B/05L_C`. Owner: "very strong now … the
correct order … the only things I'd fix before baselining."

### Cleanups (three realized, two RECURRED a further time)

The Hunter realized RC-262 (05L-B-007 E-stop failure conditions), RC-264
(05L-C-004 rated IMD fixture), and RC-265 (05M-A torque-disabled constraints).
**But it re-emitted the 05L-C "main-positive first" shutdown order a THIRD time
(RC-257→263→268) and the perfect RC curve a SECOND time (RC-261→269)**, and
introduced 05M-A "Ready-to-Drive" (RC-271) + "0.0 A / zero deviation / zero
EMI" (RC-270). The `GATE05L_B/05L_C` deliverables already held the corrected
wording — no deliverable regressed.

### Gate 05M-B — first physical rotation (motor uncoupled)

The first physical motor rotation, **shaft uncoupled from
driveshafts/axles/gearboxes**: resolver offset-angle calibration, phase-rotation
verification, balanced three-phase sine/THD audit, over-speed + watchdog trips.
5-row matrix (05M-B-001..005).

### Owner corrections

- **Global target-profile rule (RC-267, nineteenth artifact):** all
  05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE; no threshold
  creates gate authority until tied to supplier docs + engineering review +
  test-instrument method + raw proof artifact + signed approval.
- **05L-C shutdown order still supplier-specific (RC-268, THIRD recurrence):**
  + added the command↔aux-contact feedback-mismatch block.
- **05L-B RC curve is a comparison model only (RC-269, SECOND recurrence):**
  supplier-approved pre-charge envelope.
- **05M-A tolerance wording (RC-270):** supplier zero-current threshold +
  resolver noise-drift tolerance, not perfect zero.
- **05M-A not "Ready-to-Drive" (RC-271):** supplier-defined ready/torque-
  disabled state; driver torque authority masked.
- **05M-B stronger physical boundary (RC-272):** guarded shaft, no driveline
  attachment, no wheel torque path, no vehicle-movement path, E-stop +
  exclusion zone active, supplier-defined spin profile only, no cabin pedal
  authority; ≤2% torque / 500 RPM are initial targets pending supplier
  approval.

### Corrected status labels (owner review_55)

- 05L-B `CONTROLLED_HV_PRECHARGE_OBSERVATION_READY_WITH_SUPPLIER_LIMITS_PENDING
  / LIVE_HV_PRESENT / … / VCU_REQUESTER_MONITOR_ONLY / BMS_PDU_EXECUTION_OWNER /
  …`.
- 05L-C `HV_SHUTDOWN_DISCHARGE_REPEATABILITY_DEFINED /
  SUPPLIER_SHUTDOWN_SEQUENCE_REQUIRED / RATED_IMD_FIXTURE_REQUIRED /
  THERMAL_RECOVERY_REQUIRED / …`.
- 05M-A `INVERTER_READY_ZERO_TORQUE_VALIDATION_DEFINED / LIVE_HV_PRESENT /
  TORQUE_DISABLED_STATE_REQUIRED / …`.
- 05M-B `NO_LOAD_MOTOR_SPIN_DRAFTED / MOTOR_UNCOUPLED_REQUIRED /
  GUARDED_SHAFT_REQUIRED / SUPPLIER_SPIN_PROFILE_REQUIRED /
  NO_DRIVELINE_TORQUE_PATH / NO_VEHICLE_MOVEMENT`.

### Next

Owner: **Gate 05M-C — Controlled Low-Speed Traction Readiness** (the first
point a wheel torque path is contemplated, engineer-gated, staged; no road
testing / no customer operation until proven). Only after 05M-B. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Motor uncoupled/guarded, live-HV, supplier-defined low-torque spin, no
  wheel/vehicle-movement path, no cabin pedal authority at 05M-B (RC-267..272);
  numbers are targets (RC-267); shutdown sequence supplier-specific (RC-268);
  RC curve is a comparison model (RC-269); 05M-A uses tolerances not perfect
  zero (RC-270) and never says "Ready-to-Drive" (RC-271); the inverter owns
  gating, BMS/PDU owns contactors/pre-charge, hardwired loop owns emergency
  interruption, VCU requests/monitors (RC-247/265/205/227; BQ-27); never
  "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no wheel torque path; no vehicle
  movement; no compliance/certification claim; ODRs untouched.

## 67. Batch 59 + owner review_56 — Gate 05L-B/05L-C/05M-A/05M-B cleanups + Gate 05M-C split (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_59_gate05lbc_ma_mb_cleanups_gate05mc_preview.md`
and `docs/research/raw/owner_reviews/review_56_batch_59_verdict.md`.
Row additions: RC-273..RC-278 (no new CS). No new deliverable — cleanups to
`GATE05L_B/05L_C/05M_A/05M_B` + the 05M-C split into 05M-C1/C2/C3. Owner: "very
strong … the architecture is now in the right order … a solid baseline path."

### Cleanups realized + recurrence

The Hunter realized RC-268 (05L-C supplier shutdown + feedback-mismatch),
RC-269 (05L-B pre-charge envelope), RC-270 (05M-A supplier tolerances), RC-272
(05M-B guarded/uncoupled boundary), and added the four amendment rules. **But
05M-A-004 re-emitted "Ready-to-Drive" (RC-271→275 regression)**, and it left
"absolute 0.0 V"/"immediately" (05L-B-005), "immediate" (05L-C-004 exit),
"motor continuing to spin" (05M-B-005), and the live over-speed-limit edit
(05M-B-004). The deliverables already held the corrected 05M-A-004 wording.

### Owner corrections

- **Global Numeric Threshold Authority Rule (RC-267 formalized):** all
  05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE; no gate authority
  until tied to supplier docs + engineering review + calibrated measurement
  method + raw proof + signed approval. Added as a header rule to the
  deliverables.
- **05L-B-005 no "absolute 0.0 V"/"immediately" (RC-273):** supplier-defined
  OFF state below the approved off-state leakage threshold; blocked before any
  coil-output enable command.
- **05L-C-004 no "immediate" (RC-274):** isolation shutdown within the
  supplier-defined IMD/BMS/PDU response window.
- **05M-A "Ready-to-Drive" recurrence (RC-275):** supplier-defined
  ready/torque-disabled state; driver torque authority masked.
- **05M-B watchdog blocked-state (RC-276):** coasting is not the failure —
  continuing to be powered (inverter actively driving / phase current beyond
  decay window / torque active after watchdog loss / fails to reach safe state)
  is.
- **05M-B over-speed supplier-supported (RC-277):** supplier test mode /
  pre-approved calibration profile at a controlled low RPM; no live safety-limit
  edit during rotation.
- **Gate 05M-C split (RC-278):** 05M-C1 (coupled driveline static /
  lifted-wheel readiness) → 05M-C2 (restricted creep) → 05M-C3 (controlled
  closed-area low-speed movement); the first coupled test proves coupling,
  backlash, wheel-speed sensing, brake override, and torque clamp with wheels
  lifted before any open-floor operation.

### Corrected status labels (owner review_56)

05L-B `CONTROLLED_HV_PRECHARGE_OBSERVATION_READY / SUPPLIER_LIMITS_REQUIRED /
…`; 05L-C `HV_SHUTDOWN_DISCHARGE_REPEATABILITY_READY /
SUPPLIER_SHUTDOWN_SEQUENCE_REQUIRED / RATED_IMD_FIXTURE_REQUIRED / …`; 05M-A
`INVERTER_READY_ZERO_TORQUE_VALIDATION_READY / TORQUE_DISABLED_STATE_ONLY / …`;
05M-B `NO_LOAD_MOTOR_SPIN_READY_FOR_DETAILING / GUARDED_SHAFT_REQUIRED /
MOTOR_UNCOUPLED_REQUIRED / …`.

### Next

Owner: **Gate 05M-C1 — Coupled Driveline Static / Lifted-Wheel Readiness** (the
first coupled test, wheels lifted, before any creep movement). Queued in
`GATE_RESEARCH_QUEUE.md`. Then 05M-C2 (restricted creep) → 05M-C3 (controlled
closed-area low-speed movement).

### Standing checks

- All 05L-B/05L-C/05M-A/05M-B numbers are INITIAL_TARGET_PROFILE (RC-267); no
  "absolute zero"/"immediate" wording (RC-273/274); 05M-A never "Ready-to-Drive"
  (RC-275); coasting is not the 05M-B failure (RC-276); over-speed via a
  supplier-supported test mode only (RC-277); 05M-C split — wheels lifted before
  any open-floor movement (RC-278); the inverter owns gating, BMS/PDU owns
  contactors/pre-charge, hardwired loop owns emergency interruption, VCU
  requests/monitors (RC-247/265/205/227; BQ-27); never "certified safe"
  (RC-224).
- Nothing ingested; nothing marked Confirmed; no wheel torque path; no vehicle
  movement; no compliance/certification claim; ODRs untouched.

## 68. Batch 60 + owner review_57 — Gate 05M-B cleanup + Gate 05M-C1 Coupled Driveline / Lifted-Wheel Readiness (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_60_gate05mb_cleanup_gate05mc1_lifted.md`
and `docs/research/raw/owner_reviews/review_57_batch_60_verdict.md`.
Row additions: RC-279..RC-283 (no new CS). Deliverable:
`docs/status/GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` (new) + `GATE05M_B` status
label. Owner: "a strong next stage … the right risk progression: 05M-B
uncoupled → 05M-C1 coupled but wheels lifted → 05M-C2 first restricted ground
creep."

### Gate 05M-B watchdog realized

The Hunter realized RC-276 (05M-B-005 coasting-not-failure blocked states). But
05M-B-004 re-emitted "temporarily lower the software over-speed limit" (RC-277
recurrence); the `GATE05M_B` deliverable already held the supplier-supported
wording.

### Gate 05M-C1 — first coupled test, wheels LIFTED

The traction motor coupled to gearbox/half-shafts/hubs/wheels, but the **driven
axle lifted + locked, zero ground contact**: backlash/drag mapping,
wheel-speed-parity audit, micro-scale torque clamp (≤5%), brake-override
interlock. 5-row matrix (05M-C1-001..005).

### Owner corrections

- **BIGGEST — "hand-lock one lifted wheel" forbidden (RC-279, SAFETY-CRITICAL):**
  rated mechanical wheel restraint / differential fixture / hub-locking fixture
  only; no hands near rotating wheels/shafts/hubs/belts/couplers, ever.
- **Lifted Chassis Safety Rule (RC-280):** rated lift/heavy-duty stands
  approved for the GVWR/axle load; secured against roll; suspension droop
  accounted; guarded rotation zones; no personnel inline; no one under the
  vehicle during energized rotation.
- **No "instantly"/"immediately" in brake override (RC-281):** within the
  approved brake-override response window; phase current decays within the
  approved threshold.
- **Wheel-speed data is read-only (RC-282):** authorized read-only / passive
  logging / independent instrumentation; factory ABS/ESC not traction-control
  authority without Ford-authorized docs + engineering review; verification not
  control.
- **05M-C2 not default "low-friction" (RC-283):** flat, controlled, closed
  surface with predictable traction, runout, chocks/barriers, spotters outside
  the path, remote E-stop; low-friction is a separate future gate.
- **Numeric Threshold Authority Rule applies (RC-267):** ≤1% pulse, 100 RPM,
  ≤5% wheel-speed tolerance, ≤5% torque clamp are INITIAL_TARGET_PROFILE.

### Corrected status labels (owner review_57)

05M-B `NO_LOAD_MOTOR_SPIN_VALIDATION_DEFINED / MOTOR_UNCOUPLED_REQUIRED / …`;
05M-C1 `COUPLED_DRIVELINE_LIFTED_WHEEL_READINESS_DEFINED /
RATED_LIFT_OR_STANDS_REQUIRED / ROTATING_WHEEL_GUARDS_REQUIRED / NO_GROUND_CONTACT
/ NO_OPEN_FLOOR_MOVEMENT / NO_CAN_1_CONTROL_AUTHORITY / BRAKE_OVERRIDE_REQUIRED /
MICRO_TORQUE_LIMIT_TARGET_ONLY`; 05M-C2 `RESTRICTED_CREEP_TORQUE_CONCEPT_STARTED
/ GROUND_CONTACT_PRESENT / CLOSED_CONTROLLED_TEST_AREA_REQUIRED /
REMOTE_ESTOP_REQUIRED / SPOTTERS_REQUIRED / NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION`.

### Next

Owner: **Gate 05M-C2 — Restricted Creep Torque Validation** (the first ground
contact, restricted low-speed creep, on a controlled closed surface with
predictable traction). Only after 05M-C1. Then Gate 05M-C3 (Controlled
Closed-Area Low-Speed Movement). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Driven axle lifted, zero ground contact, no open-floor movement at 05M-C1
  (RC-279..283); rated lift/stands + guards + no personnel inline / under the
  vehicle (RC-280); no manual restraint of rotating parts (RC-279); wheel-speed
  read-only not control (RC-282); brake override within the approved window
  (RC-281); every value INITIAL_TARGET_PROFILE (RC-267); the inverter owns
  gating, BMS/PDU owns contactors/pre-charge, hardwired loop + service brakes
  own the stopping path, VCU requests/monitors (RC-247/265/205/227; BQ-27);
  never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no ground contact; no open-floor
  movement; no compliance/certification claim; ODRs untouched.

## 69. Batch 61 ("59A") + owner review_58 — Gate 05M-C1 re-emit + Gate 05M-C2 Restricted Creep Torque Validation (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_61_gate05mc1_reemit_gate05mc2_creep.md`
and `docs/research/raw/owner_reviews/review_58_batch_61_verdict.md`.
Row additions: RC-284..RC-288 (no new CS). Deliverable:
`docs/status/GATE05M_C2_RESTRICTED_CREEP.md` (new, structured 05M-C2A/B/C).
Owner: "yes, proceed with Gate 05M-C2 — but this draft needs a few important
corrections … this is now the first powered ground-contact movement gate."

### CRITICAL regression — "hand-lock one lifted wheel" re-emitted

The Hunter re-emitted the 05M-C1-005 "Hand-lock one lifted wheel safely" line —
the exact SAFETY-CRITICAL instruction the owner rejected in review_57 (RC-279).
The `GATE05M_C1_*` deliverable already holds the corrected rated-fixture-only
wording and did NOT regress. Recorded as the strongest safety-critical M10
regression-scanner case. The low-friction-surface default (RC-283) also
re-appeared in the 05M-C2 body.

### Gate 05M-C2 — first powered ground-contact movement gate

Tires touch the ground under live traction for the first time — restricted
creep only, not normal driving. **Split (RC-286): 05M-C2A Flat-Ground
Restricted Creep → 05M-C2B Controlled Incline/Rollback Hold → 05M-C2C Faulted
Creep Recovery.**

### Owner corrections

- **Predictable-traction surface, not low-friction (RC-283 re-emphasized):**
  flat/controlled/closed with runout, chocks/barriers, spotters outside the
  path, remote E-stop; low-friction is a separate future gate.
- **`dT/dt` not `dQ/dt` (RC-284):** torque ramp rate; the limiter acts on VCU
  torque output, not raw pedal slope.
- **All numbers INITIAL_TARGET_PROFILE (RC-267):** dead-band, ramp, clamp,
  breakaway, slip, creep, incline.
- **Ground Movement Precondition (RC-285):** no creep torque unless brake/brake-
  assist/steering-assist verified, E-stop armed + remote active, spotters +
  runout clear, clamp + ramp active, engineer/test-lead explicit start
  authorization.
- **Split 05M-C2A/B/C — rollback/incline out of the first gate (RC-286).**
- **Breakaway above the clamp → NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not an
  auto diagnosis (RC-287).**
- **No "absolute 0 Nm"/"instantly" wording (RC-288):** supplier zero-torque
  threshold + response window.

### Gate 05M-C2 status (owner review_58)

`FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE / LIVE_HV_PRESENT /
GROUND_CONTACT_PRESENT / RESTRICTED_CREEP_ONLY /
PREDICTABLE_TRACTION_SURFACE_REQUIRED / REMOTE_ESTOP_REQUIRED / SPOTTERS_REQUIRED
/ BRAKE_ASSIST_VERIFICATION_REQUIRED / STEERING_ASSIST_VERIFICATION_REQUIRED /
TORQUE_CLAMP_INITIAL_TARGET_ONLY / RAMP_RATE_INITIAL_TARGET_ONLY / NO_PUBLIC_ROAD
/ NO_CUSTOMER_OPERATION / NO_NORMAL_DRIVING_AUTHORITY`. Permits **Gate 05M-C3
only** (after 05M-C2A/B/C).

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement** (the Hunter's
"track-surface speeds up to 15 km/h" is INITIAL_TARGET_PROFILE pending supplier
+ engineering approval). Only after 05M-C2 (05M-C2A → 05M-C2B → 05M-C2C).
Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- First powered ground contact, restricted creep only, flat predictable-
  traction closed surface (not low-friction, RC-283), Ground Movement
  Precondition gates every creep command (RC-285), torque clamped + ramp-limited
  `dT_command/dt` (RC-284), rollback/incline deferred to 05M-C2B (RC-286),
  breakaway → NEEDS_REVIEW not auto-diagnosis (RC-287), no absolute-zero/instant
  wording (RC-288), wheel-speed read-only (RC-282), CAN_1 listen-only
  (RC-172/230), no auto retry after E-stop (RC-262), every number
  INITIAL_TARGET_PROFILE (RC-267); the inverter owns gating, BMS/PDU owns
  contactors/pre-charge, hardwired loop + service brakes own the stopping path,
  VCU requests/monitors (RC-247/265/205/227; BQ-27); never "certified safe"
  (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 70. Batch 62 ("60:60") + owner review_59 — Gate 05M-C2 re-emit (full-draft regression) + 3 new cleanups (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_62_gate05mc2_reemit_regression.md`
and `docs/research/raw/owner_reviews/review_59_batch_62_verdict.md`.
Row additions: RC-289..RC-291 (no new CS). No new deliverable — cleanups to
`GATE05M_C2_RESTRICTED_CREEP.md`. Owner: "Gate 05M-C2 is the right next gate …
strong … but it still has a few cleanup items before it becomes baseline."

### FULL-DRAFT REGRESSION — strongest M10 regression-scanner case

The Hunter re-answered the Gate 05M-C2 question with a draft that **lost ALL
the review_58 corrections at once**: low-friction surface (RC-283), `dQ/dt`
(RC-284), "absolute 0 Nm" + "immediate stop" (RC-288), rollback in the first
gate (RC-286), and the 05M-C1 "hand-lock one lifted wheel" line (RC-279 —
SAFETY-CRITICAL). The owner re-issued every correction. The `GATE05M_C2_*` +
`GATE05M_C1_*` deliverables already hold the corrected wording and did NOT
regress. This is the strongest case yet for the M10 regression scanner (an
entire gate reverting to a pre-correction version).

### New owner corrections (beyond the re-issued ones)

- **Proof/Authority/Build-Engine-Status columns (RC-289):** the 05M-C2 matrix
  carries the same evidence structure as earlier gates — Proof Artifact
  (time-synced APPS/brake/CAN log + phase-current-decay trace + speed trace +
  video + test-lead signoff), Authority Status (RESTRICTED_CREEP_ONLY /
  NO_NORMAL_DRIVING_AUTHORITY), Build Engine Status (candidate/target).
- **Failed-creep recovery needs review, not a hard reset (RC-290):**
  re-energization/creep retries stay blocked until diagnostic review +
  fault-source correction + approved service clear + engineering/test-lead
  authorization.
- **No auto "unlock 15 km/h" (RC-291):** permits engineering review for 05M-C3
  only; any speed ceiling remains INITIAL_TARGET_PROFILE until
  engineering-approved.

### Gate 05M-C2 status (owner review_59)

Adds `CAN_1_PASSIVE_ONLY` + `FAULT_LATCH_REQUIRED` to the review_58 set:
`FIRST_GROUND_CONTACT_POWERED_MOVEMENT_GATE / … / CAN_1_PASSIVE_ONLY /
TORQUE_CLAMP_INITIAL_TARGET_ONLY / RAMP_RATE_INITIAL_TARGET_ONLY /
FAULT_LATCH_REQUIRED / NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION /
NO_NORMAL_DRIVING_AUTHORITY`. Permits **Gate 05M-C3 only** (after 05M-C2A/B/C).

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement** (unchanged;
15 km/h is INITIAL_TARGET_PROFILE, RC-291). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- The full-draft regression changed no deliverable — the corrected 05M-C2/05M-C1
  wording holds (RC-279/283/284/286/288); new: proof/authority columns (RC-289),
  failed-creep recovery needs authorized clear not a hard reset (RC-290), no auto
  speed-unlock (RC-291); first powered ground contact, restricted creep only,
  predictable-traction closed surface, Ground Movement Precondition (RC-285),
  CAN_1 listen-only (RC-172/230), wheel-speed read-only (RC-282), no auto retry
  after E-stop (RC-262), every number INITIAL_TARGET_PROFILE (RC-267); the
  inverter owns gating, BMS/PDU owns contactors/pre-charge, hardwired loop +
  service brakes own the stopping path, VCU requests/monitors (RC-247/265/205/
  227; BQ-27); never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 71. Batch 63 ("61:75") + owner review_60 — Gate 05M-C1/05M-C2 re-emit (continued regression, NO new corrections) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_63_gate05mc1_mc2_reemit_regression.md`
and `docs/research/raw/owner_reviews/review_60_batch_63_verdict.md`.
**Row additions: NONE.** No new deliverable, no new RC rows, no deliverable
changes. Owner: "the direction is right, but this draft did not fully apply the
last cleanup yet … a few hard safety wording issues that need to be fixed
before baselining 05M-C2."

### Continued regression — no new corrections

The Hunter re-emitted Gate 05M-C1 + Gate 05M-C2 and **still carries the same
previously-corrected defects**: 05M-C1-005 "hand-lock one lifted wheel"
(RC-279 — SAFETY-CRITICAL, its **third recurrence** in the ground-movement
series), `dQ/dt` (RC-284), "absolute 0 Nm" (RC-288), the E-stop "immediate
stop" (RC-288), the neutral-interrupt "immediately revoke" (RC-288), "hard
reset" recovery (RC-290), rollback inside the first gate (RC-286), and no
Proof/Authority/Build-Engine-Status columns (RC-289). The Hunter DID apply
wheel-speed read-only (RC-282) and a couple of response-window phrasings. The
owner re-issued the **identical eight corrections** — every one already applied
to the deliverables. **No RC rows are added (they would be duplicates of
RC-279/282/283/284/286/288/289/290/291); the deliverables
`GATE05M_C1_COUPLED_DRIVELINE_LIFTED.md` + `GATE05M_C2_RESTRICTED_CREEP.md`
already hold the corrected wording and did NOT regress.**

### Regression-scanner significance (M10)

This is now the third time RC-279 (a genuine physical-safety hazard —
"hand-lock one lifted wheel") has recurred in the ground-movement series, and
the second consecutive full-draft regression of Gate 05M-C2. The corrected
wording lives only in the deliverables, not in the Hunter output — the strongest
standing case for the owner's M10 forbidden-phrase/regression scanner. Recorded
here (and in PROVENANCE) as an evidence-tracked recurrence, with no register
inflation.

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement** (unchanged;
15 km/h is INITIAL_TARGET_PROFILE, RC-291 — no auto-unlock). Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- No deliverable changed; the corrected 05M-C1/05M-C2 wording holds
  (RC-279/282/283/284/286/288/289/290/291); first powered ground contact,
  restricted creep only, predictable-traction closed surface, Ground Movement
  Precondition (RC-285), CAN_1 listen-only (RC-172/230), wheel-speed read-only
  (RC-282), no auto retry after E-stop (RC-262), every number
  INITIAL_TARGET_PROFILE (RC-267); never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 72. Batch 64 ("62:75") + owner review_61 — Gate 05M-C1/05M-C2A/05M-C2B corrected re-emit + 5 pre-baseline cleanups (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_64_gate05mc1_mc2ab_corrected.md`
and `docs/research/raw/owner_reviews/review_61_batch_64_verdict.md`.
**Row additions: RC-292..RC-296 (no new CS).** No new deliverable — five
corrections applied to `GATE05M_C2_RESTRICTED_CREEP.md`. Owner: "this is much
better … you applied the big safety fixes correctly."

### Regression finally cleared

After three batches of re-emitting the same defects (§§70–71), the Hunter
**finally applied all eight previously-corrected fixes**: the RC-279 hand-lock
line is removed (→ "approved mechanical wheel restraint, rated hub-locking
fixture, or differential test fixture" + "manual hand restraint … strictly
forbidden"); `dT_command/dt` (RC-284); the supplier zero-torque threshold on
the dead-band (RC-288); response-window language on E-stop / brake-override /
neutral (RC-288); diagnostic-review-not-hard-reset fault latching (RC-290);
rollback split into a PROVISIONAL 05M-C2B (RC-286); the `Proof Artifact` +
`Authority Status` + `Build Engine Status` columns (RC-289); and no auto
"unlock 15 km/h" (RC-291). The owner confirmed the big safety fixes are
correct.

### Five new pre-baseline cleanups (RC-292..296)

1. **RC-292 — no premature "Approved by."** The new Authority Status column
   read "Approved by Lead Controls Engineer / Safety Director / …", but no test
   has been executed → each row names a `Required Approver: <role>` with
   `Authority Status: SIGNOFF_REQUIRED / NOT_EXECUTED` + `Build Engine Status:
   PENDING_EXECUTION`. Status adds `REQUIRED_APPROVERS_DEFINED` +
   `PROOF_ARTIFACTS_DEFINED`.
2. **RC-293 — Numeric Threshold Authority Rule over the new split.** 0–5% APPS,
   ≤20 Nm/sec `dT_command/dt`, ≤30 Nm clamp, 15–25 Nm breakaway, ≤5% parity,
   ≤10 Nm brake-hold, ≤1 m creep, <2° incline all `INITIAL_TARGET_PROFILE`
   until sourced (extends RC-267).
3. **RC-294 — 15–25 Nm breakaway is an expected range, not a pass envelope.**
   May be too light for an F-450/F-550; map the actual baseline, out-of-range →
   NEEDS_REVIEW / MECHANICAL_BINDING_CHECK, not auto-fail (extends RC-287).
4. **RC-295 — measurable thresholds replace absolutes.** "absolute control" →
   "within approved creep-speed, torque, and runout limits"; "completely active"
   → "within approved pressure, voltage, and response thresholds" (extends
   RC-288).
5. **RC-296 — brake-hold displacement threshold.** "completely hold static" →
   "displacement remains below the approved measurement threshold" (measurable
   via wheel-speed / hub marker / video / external position sensor).

### Regression-scanner significance (M10)

The three-batch regression chain (§§70–71: 3× RC-279 safety-critical + two
full-draft 05M-C2 regressions) is now **cleared** — the Hunter converged on the
corrected wording. The chain remains the strongest standing case for the owner's
M10 forbidden-phrase/regression scanner (it took three re-issues to land), but
this batch is convergence, not regression.

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement** (speed/ramp
still `INITIAL_TARGET_PROFILE` only, RC-291/293 — no auto-unlock). 05M-C2A/C2B
is "clean enough to baseline" after these five. Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Five corrections applied verbatim to `GATE05M_C2_RESTRICTED_CREEP.md`
  (RC-292..296); the corrected 05M-C1/05M-C2A/05M-C2B wording holds
  (RC-279/282/283/284/286/288/289/290/291); Required Approver not "Approved by"
  (RC-292); every number INITIAL_TARGET_PROFILE (RC-267/293); breakaway a range
  not a pass gate (RC-294); measurable thresholds not absolutes (RC-295/296);
  first powered ground contact, restricted creep only, Ground Movement
  Precondition (RC-285), CAN_1 listen-only (RC-172/230), wheel-speed read-only
  (RC-282), no auto retry after E-stop (RC-262); never "certified safe"
  (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 73. Batch 65 ("63:75") + owner review_62 — Gate 05M-C2A/05M-C2B convergence re-emit (corrections 3/4/5 applied, NO new corrections) (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_65_gate05mc2ab_convergence.md`
and `docs/research/raw/owner_reviews/review_62_batch_65_verdict.md`.
**Row additions: NONE.** No new deliverable, no new RC rows, no deliverable
changes. Owner: "Gate 05M-C2A / C2B is clean enough to baseline, and the next
gate should be 05M-C3."

### Convergence — corrections 3/4/5 applied

The owner re-issued review_61 corrections 3/4/5 and the Hunter **applied all
three** in this draft (already applied to `GATE05M_C2_RESTRICTED_CREEP.md` in
batch 64):

- **RC-294** — 05M-C2A-002 now "map the empirical breakaway torque baseline;
  values outside expected targets trigger MECHANICAL_BINDING_CHECK" (an expected
  range, not a pass envelope).
- **RC-295** — 05M-C2A-002 "crawls forward within approved creep-speed, torque,
  and runout limits" + 05M-C2A-010 "steering and braking assist remain within
  approved pressure, voltage, and response thresholds" (no "absolute control" /
  "completely active").
- **RC-296** — 05M-C2A-001 "vehicle displacement remains below approved
  measurement threshold during brake-hold torque request."

The E-stop / neutral / fault-latch rows keep the response-window +
diagnostic-review wording (RC-288/290) and rollback stays in the PROVISIONAL
05M-C2B (RC-286). **No new corrections → no new RC rows; the deliverable already
holds RC-294/295/296 and did not change.**

### Residual (evidence-tracked, no new RC row)

The Hunter's `Authority Status` column **still reads "Approved by &lt;role&gt;"** —
the RC-292 Required-Approver correction (review_61: no "Approved by" because no
test is executed yet → `Required Approver` + `SIGNOFF_REQUIRED / NOT_EXECUTED` +
`PENDING_EXECUTION`) is **not applied in this draft**, and the draft carries no
explicit Numeric Threshold Authority Rule statement (RC-293). **The deliverable
already carries both and is ahead of the Hunter output; no register inflation
(RC-292/293 already exist).** This is a partial-application note for the M10
scanner, not a regression: the safety-critical wording (RC-294/295/296) landed;
only the evidence-hygiene "Approved by" label lags.

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement** (speed/ramp
still `INITIAL_TARGET_PROFILE` only, RC-291/293 — no auto-unlock). 05M-C2A/C2B
is baseline-ready. Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- No deliverable changed; the corrected 05M-C2A/05M-C2B wording holds
  (RC-286/288/290/292/293/294/295/296); corrections 3/4/5 (RC-294/295/296) are
  now mirrored in the Hunter output; the "Approved by" residual (RC-292) is
  recorded, not re-registered; first powered ground contact, restricted creep
  only, Ground Movement Precondition (RC-285), CAN_1 listen-only (RC-172/230),
  wheel-speed read-only (RC-282), no auto retry after E-stop (RC-262); every
  number INITIAL_TARGET_PROFILE (RC-267/293); never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 74. Batch 66 ("64:75") + owner review_63 — Gate 05M-C2A/05M-C2B baseline-candidate + 10 record-integrity/measurement-authority corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_66_gate05mc2ab_baseline_candidate.md`
and `docs/research/raw/owner_reviews/review_63_batch_66_verdict.md`.
**Row additions: RC-297..RC-306 (no new CS).** No new deliverable — ten
corrections applied to `GATE05M_C2_RESTRICTED_CREEP.md`. Owner: "this is
essentially at baseline-candidate quality now … the actual gate logic is no
longer the main weakness."

### Framing corrections applied (become doctrine)

The Hunter applied the owner's framing corrections 4/5/6: the "hard safety
clamp" → "exceeding the approved restricted-creep torque limit" (folded into
RC-301); **bounded / supplier-supported / simulation-controlled fault
injection** (RC-297); and **brake/steering assist as a pre-movement interlock +
monitored check** (RC-298). The owner: "no creep torque before brake and
steering assist verification" and "no random live hardware fault creation while
the vehicle is moving" — "those close two major holes."

### Eight verdict corrections (RC-299..306)

1. **RC-299 — four-field approval model (GLOBAL rule).** "Approved by <role>" on
   an unexecuted row is contradictory → `Required Approver` + `Procedure Approval
   Status` + `Execution Status` + `Result Signoff Status`; no `SIGNED_PASS` until
   `EXECUTED`.
2. **RC-300 — expanded Numeric Threshold Authority linkage.** No threshold has
   pass/fail/block/movement authority until linked to source-or-calc + hw/sw
   config + calibrated method + uncertainty + proof + procedure revision + signed
   authorization.
3. **RC-301 — rename the clamp.** "Absolute/Hard Creep Torque Clamp" → software
   "Restricted Creep Torque Clamp" (a VCU software limit, not a
   hardware-independent mechanism).
4. **RC-302 — dual-channel APPS plausibility.** A single normalized % cannot
   authorize torque; both channels + correlation + no stuck-high + idle-stab time
   + valid brake/steering preconditions.
5. **RC-303 — torque-rate ≠ current-response.** Commanded torque within the
   `dT_command/dt` envelope; measured torque feedback + phase current within the
   supplier tracking envelope; store both slopes + DC-bus current + accel.
6. **RC-304 — CAN_1 passivity defined electrically.** No dominant-bit tx / ACK /
   error flag / wake / diag request; observed OEM errors logged + attributed, not
   assumed to be instrumentation.
7. **RC-305 — C2B Rollback Containment Rule.** Runout clear + secondary restraint
   + remote E-stop + driver ready + max rollback distance/hold duration/thermal
   limits + no traction-torque-as-sole-parking-restraint; hill-hold ≠
   parking-hold.
8. **RC-306 — Assistance Interlock Inhibition test (05M-C2A-010B).** Assert
   assist-not-ready / aux-voltage-low → VCU stays torque-inhibited and records the
   blocking reason; the interlock is tested, not assumed.

Corrected status: 05M-C2A adds `BASELINE_CANDIDATE / PROCEDURE_REVIEW_REQUIRED /
BRAKE_ASSIST_INTERLOCK_REQUIRED / STEERING_ASSIST_INTERLOCK_REQUIRED /
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE / CONTROLLED_FAULT_INJECTION_ONLY /
NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`; 05M-C2B adds
`UNLOCKS_ONLY_AFTER_C2A_SIGNED_PASS / ROLLBACK_CONTAINMENT_PLAN_REQUIRED /
SECONDARY_RESTRAINT_REQUIRED / TEMPORARY_HILL_HOLD_ONLY /
PARKING_HOLD_AUTHORITY_NOT_GRANTED`. Post-edit label:
`GATE_05M_C2A_C2B_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — a **procedure
baseline, not evidence that the physical vehicle has passed** (nothing
Confirmed).

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement**, "but only as
controlled closed-area movement with speed/ramp targets still under engineering
manual and artifact" (RC-291/293/300 — no auto-unlock; explicit manual
calibration + completed proof artifacts). Queued in `GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Ten corrections applied verbatim to `GATE05M_C2_RESTRICTED_CREEP.md`
  (RC-297..306); four-field approval record (RC-299), expanded numeric-authority
  linkage (RC-300), software Restricted Creep Torque Clamp (RC-301), dual-channel
  APPS (RC-302), torque-rate ≠ current-response (RC-303), electrical CAN
  passivity (RC-304), C2B rollback containment + hill-hold ≠ parking-hold
  (RC-305), tested assistance interlock (RC-298/306), bounded fault injection
  (RC-297); nothing marked `SIGNED_PASS` (`NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`);
  every number INITIAL_TARGET_PROFILE (RC-267/293/300); never "certified safe"
  (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 75. Batch 67 ("65:75") + owner review_64 — Gate 05M-C2A/05M-C2B procedure baseline + 6 pre-lock corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_67_gate05mc2ab_procedure_baseline.md`
and `docs/research/raw/owner_reviews/review_64_batch_67_verdict.md`.
**Row additions: RC-307..RC-312 (no new CS); `INVALID_TEST` folded into
RC-299.** No new deliverable — corrections applied to
`GATE05M_C2_RESTRICTED_CREEP.md`. Owner: "this is now legitimately strong enough
to call a formal baseline candidate … the technical architecture is largely
there."

### Convergence on the batch_66 corrections

The Hunter now carries all of RC-297..306: the software Restricted Creep Torque
Clamp (RC-301), the Dual-Channel APPS Plausibility Framework (RC-302), the
electrical CAN passivity rule (RC-304), the C2B Rollback Containment Rule
(RC-305), the **split 05M-C2A-005A (torque-command ramp-rate) / 005B
(phase-current response)** rows (RC-303), the 05M-C2A-010B assistance-interlock
inhibition test (RC-306), the pre-movement assistance interlock (RC-298), and
bounded fault injection (RC-297).

### Two residuals (recorded, RC-299/300 already in the deliverable)

The Hunter's draft **still shows "Approved by <role>"** (RC-299 four-field
approval model not applied in the draft) and **still lacks an explicit Numeric
Threshold Authority Rule** (RC-300). Both are already applied in the
deliverable — it is ahead of the draft. The owner extended RC-299 with a new
**`INVALID_TEST`** Result-Signoff value (folded into the deliverable's approval
model, no new RC number) and extended RC-300's authority list with "release"
authority.

### Six new pre-lock corrections (RC-307..312)

1. **RC-307** — "completely valid" → "within their approved operating windows"
   (measurability rule applied to the new APPS dual-channel rule).
2. **RC-308** — current-loop latency belongs inside the supplier-approved
   tracking envelope (expected lag from filtering / bandwidth / estimation /
   sampling), with explicit overshoot/oscillation/delay/divergence/polarity
   blocked states.
3. **RC-309** — E-stop forces the supplier-defined torque-inhibit + HV-isolation
   response; contactor coil-supply interruption only where the architecture
   requires it (not a universal rule).
4. **RC-310** — Neutral defined by zero propulsion torque, not a universal ban on
   bridge switching (supplier logic may switch for zero-torque / diagnostics /
   field control).
5. **RC-311** — C2B rollback abort rule: exceed the approved distance/speed →
   driver reapplies brake · restraint captures · torque removed · latch
   `FAIL`/`NEEDS_REVIEW` · no automatic second attempt.
6. **RC-312** — brake-hold uses the "approved test torque profile" (≤10 Nm), not
   "full torque application".

Corrected status: 05M-C2A upgrades `PROCEDURE_REVIEW_REQUIRED` →
`FORMAL_ENGINEERING_REVIEW_REQUIRED` and adds
`DUAL_CHANNEL_APPS_PLAUSIBILITY_REQUIRED / CAN_1_ELECTRICALLY_PASSIVE_ONLY /
PROCEDURE_APPROVAL_REQUIRED / EXECUTION_NOT_YET_PROVEN /
RESULT_SIGNOFF_NOT_YET_ELIGIBLE`; 05M-C2B adds `ROLLBACK_ABORT_RULE_REQUIRED /
PARKING_RESTRAINT_AUTHORITY_NOT_GRANTED`. Post-edit label:
`GATE_05M_C2A_C2B_PROCEDURE_BASELINE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — "the
procedure is ready to be reviewed and controlled, not that the physical vehicle
has passed it."

### Next

Owner: **Gate 05M-C3 — Controlled Closed-Area Low-Speed Movement**, speed/ramp
under strict engineering restriction, managed by explicit manual calibration +
completed proof artifacts only (RC-291/293/300 — no auto-unlock). Queued in
`GATE_RESEARCH_QUEUE.md`.

### Standing checks

- Six corrections applied verbatim to `GATE05M_C2_RESTRICTED_CREEP.md`
  (RC-307..312) + `INVALID_TEST` (RC-299 ext.); measurable APPS windows
  (RC-307), current-loop latency envelope (RC-308), architecture-dependent
  E-stop (RC-309), zero-propulsion-torque Neutral (RC-310), rollback abort rule
  (RC-311), test-torque-not-full-torque brake-hold (RC-312); nothing marked
  `SIGNED_PASS` (`NO_PHYSICAL_PASS_CLAIM_UNTIL_EXECUTED`); every number
  INITIAL_TARGET_PROFILE (RC-267/293/300); never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 76. Batch 68 ("66:75") + owner review_65 — NEW GATE 05M-C3 (Closed-Area Movement, modular C3A–C3E) + 14 corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_68_gate05mc3_modular_sequence.md`
and `docs/research/raw/owner_reviews/review_65_batch_68_verdict.md`.
**Row additions: RC-313..RC-326 (no new CS). NEW deliverable
`GATE05M_C3_CLOSED_AREA_MOVEMENT.md`.** Owner: "this is a major improvement and
the C3 architecture is now correctly modular … the biggest remaining issues are
concentrated in a few test procedures."

### New gate — Gate 05M-C3, modular subgates

The Hunter applied the batch_67 corrections (RC-307..312) globally and delivered
**Gate 05M-C3 (Closed-Area Low-Speed Movement) as five linear subgates** the
owner recommended: **05M-C3A** straight-line tracking (10-row matrix,
four-field per row) → **05M-C3B** coast-down + foundation brakes (regen disabled)
→ **05M-C3C** restricted regeneration (supplemental only) → **05M-C3D**
steering-angle / propulsion-envelope map (steering angle as observation/derating,
NOT torque-vectoring; ABS/ESC factory-authoritative) → **05M-C3E** closed-area
fault + abort sequences. Progression is strictly linear (no unlock without the
prior subgate's `SIGNED_PASS`). Includes the Telemetry Synchronicity Packet and
the Critical Abort Hierarchy (Driver / VCU / Inverter / BMS-PDU / Hardwired
E-stop / Track team; a path deviation must not auto-open contactors unless the
approved architecture dictates isolation).

### Fourteen corrections (RC-313..326)

1. **RC-313** — C3A-001 runout: an approved Runout Calculation Record +
   `RunoutCalculation_ID`, not a hard-coded 50 m.
2. **RC-314** — cell-by-cell operating-envelope escalation; each cell a separate
   `TestCellAuthorization`, passing one does not unlock the next.
3. **RC-315** — governor test proven first via HIL/SIL / lifted-wheel/dyno /
   lowered ceiling; verify attenuation before crossing, not by approaching the
   max.
4. **RC-316** — split path-deviation observation (C3A-009A, evidence + human
   abort) from torque-inhibit integration (C3A-009B, only after interface
   approval).
5. **RC-317** — SAFETY-CRITICAL: C3B-004 rewritten so brakes never fight
   sustained propulsion torque; BOS-latency fault only in HIL/bounded, never on a
   moving vehicle.
6. **RC-318** — contact thermocouples / embedded sensors are the thermal
   authority; IR is `SCREENING_EVIDENCE` / `NOT_FINAL_THERMAL_AUTHORITY`.
7. **RC-319** — ABS/ESC regen-removal two-lane rule (Lane A Ford-authorized
   factory path; Lane B conversion-side plausibility, no transmit/impersonate).
8. **RC-320** — remove "instant/immediate" from C3C regen inhibit → response
   window.
9. **RC-321** — brake blending is not "linear" → continuity / pedal / pressure /
   jerk envelope.
10. **RC-322** — remove premature C3D numbers → `CELL_VALUE_PENDING_APPROVAL` /
    `KINEMATIC_MODEL_PENDING`; "Immediate Torque Cutout" → response window.
11. **RC-323** — C3D needs road-wheel geometry (steering ratio, road-wheel angle,
    wheelbase, track, tire radius, axle ratio, diff type, inner/outer wheel-speed
    ratio, yaw rate), not SWA alone.
12. **RC-324** — C3E cell-based fault escalation from the lowest signed cell;
    single → repeated → paired → compound.
13. **RC-325** — Test Configuration Lock Rule (firmware/calibration/DBC hashes +
    cell limits + mass/axle + tire + ambient/surface + instrumentation).
14. **RC-326** — telemetry data-synchronization proof (common clock, sampling
    rates, timestamp source, max sync error, dropped-frame detection, latency
    compensation, start/stop markers).

Status: `MODULAR_ARCHITECTURE_DEFINED / GLOBAL_AUDIT_SCHEMA_DEFINED /
TELEMETRY_PACKET_DEFINED / CONFIGURATION_LOCK_REQUIRED /
TIME_SYNCHRONIZATION_REQUIREMENTS_PENDING / C3A_STRAIGHT_LINE_PROCEDURE_DRAFTED /
C3B_FOUNDATION_BRAKE_PROCEDURE_NEEDS_REVISION / C3C_REGEN_INTERFACE_AUTHORITY_PENDING
/ C3D_KINEMATIC_CELL_VALUES_PENDING / C3E_FAULT_ESCALATION_MATRIX_PENDING /
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE / RUNOUT_CALCULATION_REQUIRED /
NO_ACTIVE_ABS_ESC_AUTHORITY / NO_TORQUE_VECTORING_AUTHORITY / NO_PUBLIC_ROAD /
NO_CUSTOMER_OPERATION / NO_NORMAL_DRIVING_AUTHORITY`. Post-edit label:
`GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW` — "not
physically passed, but the roadmap itself mature enough for disciplined
engineering review."

### Next

Owner: proceed to **subgate execution / cell authorizations** when the owner
sends those batches (C3A first). Ford ABS/ESC interface, inverter/BMS regen +
isolation architecture, tire/axle/geometry, and thermal-sensor data remain
NeedsSupplierData.

### Standing checks

- New gate deliverable `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`; 14 corrections
  applied verbatim (RC-313..326); steering angle observation/derating only, never
  torque-vectoring (RC-323); factory ABS/ESC never consumed as control without
  Ford authorization (RC-282/319); CAN_1 electrically passive (RC-304); no
  auto-contactor-open on a fault unless the architecture dictates (RC-309); regen
  supplemental, foundation brakes primary (RC-321); brakes never fight sustained
  torque (RC-317); no "instant/immediate" wording (RC-288/320); every number
  INITIAL_TARGET_PROFILE (RC-267/293/300); nothing `SIGNED_PASS`; never "certified
  safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 77. Delivery "67:75" + owner review (duplicate re-send of batch 68 — NO new corrections, NO new RC rows) (2026-07-16)

Raw source: **no separate file** — content-identical to batch 68, preserved 1:1
in `docs/research/raw/research_hunter/batch_68_gate05mc3_modular_sequence.md` +
`docs/research/raw/owner_reviews/review_65_batch_68_verdict.md` (see the
PROVENANCE "no separate file" note for delivery "67:75").
**Row additions: NONE.** No new deliverable, no new RC rows, no deliverable
changes.

### Duplicate re-send

The "67:75" delivery re-sends the batch_68 Gate 05M-C3 message verbatim: the same
owner framing (QUESTION ASKED — the review_64 items + the C3 subgate
recommendation), the same RESEARCHER RESPOND (the Gate 05M-C3 modular sequence
C3A–C3E, still carrying the 14 uncorrected items — C3A-001 "≥50 m", C3B-004
"40 Nm then brake", C3C-005/006 "instantly"/"immediately", the premature C3D
numbers, C3E "faults at 15 km/h"), and the same "MY responds" verdict (the
identical 14 corrections). **All 14 corrections (RC-313..326) were already
applied to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md` in batch 68**, so there is
nothing new to register or correct: the deliverable already holds the approved
Runout Calculation Record (RC-313), cell-by-cell escalation (RC-314), the
off-track governor proof (RC-315), the observation/torque-inhibit split (RC-316),
the SAFETY-CRITICAL C3B-004 rewrite (RC-317), contact-thermocouples-over-IR
(RC-318), the ABS/ESC two-lane rule (RC-319), response-window regen (RC-320), the
brake-blend continuity/jerk envelope (RC-321), `CELL_VALUE_PENDING_APPROVAL`
(RC-322), road-wheel geometry (RC-323), cell-based C3E escalation (RC-324), the
Test Configuration Lock Rule (RC-325), and telemetry time-synchronization
(RC-326). Flagged to the owner as a likely mis-send / duplicate paste. Recorded
here (and in PROVENANCE) as an evidence-tracked duplicate delivery, with no
register inflation and no re-archive.

### Next

Unchanged — **05M-C3A execution + Envelope Cell 1 authorization** (owner
review_65). Gate 05M-C3 remains
`GATE_05M_C3_PROCEDURE_ARCHITECTURE_READY_FOR_FORMAL_ENGINEERING_REVIEW`.

### Standing checks

- No deliverable changed; the corrected Gate 05M-C3 wording holds
  (RC-313..326); duplicate delivery recorded, not re-registered; steering angle
  observation/derating only, never torque-vectoring (RC-323); factory ABS/ESC
  never consumed as control without Ford authorization (RC-282/319); brakes never
  fight sustained torque (RC-317); every number INITIAL_TARGET_PROFILE
  (RC-267/293/300); nothing `SIGNED_PASS`; never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 78. Batch 70 ("68:75") + owner review_66 — Gate 05M-C3 Revision 02 + 13 pre-baseline corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_70_gate05mc3_revision02.md`
and `docs/research/raw/owner_reviews/review_66_batch_70_verdict.md`.
**Row additions: RC-327..RC-339 (no new CS).** No new deliverable — corrections
applied to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. Owner: "Revision 02 is very
strong and materially safer … mature enough for formal engineering review."

### Revision 02 — the 14 batch_68 corrections applied

The Hunter delivered Gate 05M-C3 Revision 02, which applies RC-313..326: the
RunoutCalculations_ID artifact, the Test Configuration Lock Rule, the Telemetry
Clock & Sync Mandate, the Stepped Operating-Envelope Escalation (Cell 1→2→3,
separate `TestCellAuthorization`), the C3A-009A/009B observation-vs-torque-inhibit
split, the revised governor test (C3A-004), the rewritten C3B-004 (brakes never
fight sustained torque), contact-thermocouples-over-IR (C3B-006), the C3C
two-lane ABS/ESC rule + response-window regen, road-wheel-geometry C3D inputs,
and cell-based C3E fault escalation.

### Thirteen pre-baseline corrections (RC-327..339)

1. **RC-327** — complete the RunoutCalculation_ID field list + `L_min` equation
   (the artifact section said "must map" but the list was incomplete).
2. **RC-328** — C3A-009B stays `LOCKED` (`APPROVAL_REQUIRED` / `LOCKED` /
   `NOT_ELIGIBLE`, block `EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED`).
3. **RC-329** — "commands rise linearly" → approved time-domain command envelope
   (torque-rate + jerk); track T/dT/d²T, reported torque, current, accel, jerk.
4. **RC-330** — separate the BOS result (torque removed) from the foundation-brake
   result (stops within the C3B-derived distance envelope).
5. **RC-331** — regen-disabled is a `Regeneration Command State: DISABLED`, not a
   literal 0 Nm reading.
6. **RC-332** — C3C-003 is Brake/Regeneration Coexistence Observation; true
   coordinated blending is `BLOCKED` until modelled.
7. **RC-333** — regen availability is BMS-permission-bounded, not a generic high
   SOC.
8. **RC-334** — no arbitrary internal-bus injection; supplier/HIL/fixture/bounded
   sim only.
9. **RC-335** — C3C-007 explicit driver/brake response after regen loss; no
   assumed auto-brake.
10. **RC-336** — remove residual C3D numbers + "immediate" →
    `KINEMATIC_MODEL_PENDING_APPROVAL` / `DISABLED_COMMAND_STATE` /
    `TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW` /
    `TEST_CELL_VALUE_PENDING_APPROVAL`.
11. **RC-337** — steering-signal validity matrix VALID/DEGRADED/IMPLAUSIBLE/
    UNAVAILABLE/STALE; a frozen value must not keep authorizing torque.
12. **RC-338** — complete the C3E fault hierarchy L1 single → L2 repeated → L3
    approved paired → L4 compound (formal hazard review, no random combining).
13. **RC-339** — Test Result Validity Rule: a signed result binds to its archived
    configuration; any change → `IMPACT_REVIEW_REQUIRED` → REUSABLE /
    PARTIALLY_REUSABLE / REPEAT_TEST_REQUIRED / INVALIDATED.

Status: `PROCEDURE_ARCHITECTURE_MATURE / REVISION_02_APPLIED /
RUNOUT_ARTIFACT_SCHEMA_INCOMPLETE / CONFIGURATION_LOCK_DEFINED /
TELEMETRY_SYNC_DEFINED / CELL_ESCALATION_DEFINED / C3A_PATH_OBSERVATION_READY /
C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED / C3B_FOUNDATION_BRAKE_BASELINE_DEFINED /
C3C_REGEN_CONTROL_OWNERSHIP_PARTIALLY_PENDING / C3D_CELL_VALUES_PENDING_APPROVAL /
C3E_FAULT_HIERARCHY_INCOMPLETE / NUMERIC_LIMITS_INITIAL_TARGET_PROFILE /
FORMAL_ENGINEERING_REVIEW_REQUIRED / NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION /
NO_NORMAL_DRIVING_AUTHORITY`. Post-edit label:
`GATE_05M_C3_REVISION_02_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` — "the
procedure architecture is mature, not that any physical vehicle has passed it."

### Next

Owner: proceed toward **05M-C3A execution + Envelope Cell 1 authorization** and
the formal engineering baseline review. Ford ABS/ESC interface, inverter/BMS
regen + isolation architecture, tire/axle/geometry, and thermal-sensor data
remain NeedsSupplierData.

### Standing checks

- 13 corrections applied verbatim to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  (RC-327..339); C3A-009B LOCKED until validated (RC-328); command envelope not
  "linear" (RC-329); BOS ≠ stop (RC-330); regen a command state (RC-331);
  coexistence ≠ blending (RC-332); BMS-permission not high-SOC (RC-333); no
  arbitrary injection (RC-334); driver/brake response after regen loss (RC-335);
  no premature C3D numbers (RC-336); steering-validity states (RC-337); listed
  C3E hierarchy (RC-338); result-validity binding (RC-339); steering angle
  observation-only (RC-323); factory ABS/ESC never consumed as control without
  Ford authorization (RC-282/319); every number INITIAL_TARGET_PROFILE
  (RC-267/293/300); nothing `SIGNED_PASS`; never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 79. Batch 71 ("69:75") + owner review_67 — Gate 05M-C3 Revision 03 + 11 pre-baseline corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_71_gate05mc3_revision03.md`
and `docs/research/raw/owner_reviews/review_67_batch_71_verdict.md`.
**Row additions: RC-340..RC-350 (no new CS).** No new deliverable — corrections
applied to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. Owner: "Revision 03 is the
strongest version so far … I would now call it a formal engineering baseline
candidate, but not quite baseline-locked yet."

### Revision 03 — the 13 batch_70 corrections applied

The Hunter delivered Gate 05M-C3 Revision 03, which applies RC-327..339: the full
RunoutCalculations_ID field tree, the Test Result Validity & Configuration Lock
Rule, the Regenerative Command Baseline, the stepped-cell pipeline, the C3A-005
command envelope, the split C3A-006 BOS/foundation-brake result, C3A-009B marked
LOCKED, the C3C coexistence/blending lanes, the C3C-004 BMS authority, the
no-arbitrary-injection C3C-005, the C3C-007 driver/brake response, the
steering-signal state matrix, and the listed C3E fault hierarchy.

### Eleven pre-baseline corrections (RC-340..350)

1. **RC-340** — insert + govern the actual `L_min` equation (7 terms) with a
   no-double-count rule, a `distance_component_method` enum, and a
   movement-authorization gate.
2. **RC-341** — the ±2 Nm zero-regen residual is a candidate
   (`ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE`), not a universal constant;
   `ZERO_REGEN_REQUEST` + supplier zero-regeneration tracking envelope.
3. **RC-342** — remove the circular C3A→C3B evidence dependency; C3A BOS
   acceptance stands alone, C3A/C3B correlation is a later review.
4. *(owner item 4 — C3A-009B contradictory status)* already applied via RC-328
   (`APPROVAL_REQUIRED`/`LOCKED`/`NOT_ELIGIBLE`, block
   `EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED`, dual approver) — **no
   new RC row.**
5. **RC-343** — remove "immediate" from the steering states → approved
   degraded-state / steering-fault response windows.
6. **RC-344** — define `STALE` by signal freshness (timestamp age / alive counter
   / cadence), not an unchanged value.
7. **RC-345** — C3A-007 uses the supplier-defined Neutral zero-propulsion envelope
   (+ blocked states), not "torque → zero".
8. **RC-346** — C3C-007 fault-latch ownership (Inverter/VCU/Build Engine) +
   comms-loss ≠ verified shutdown, not "latches natively".
9. **RC-347** — C3E `FAULT_EXECUTION_DOMAIN` classification: a listed fault does
   not authorize physical injection during motion.
10. **RC-348** — paired/compound-fault prerequisites (`PairedFaultAuthorization_ID`
    + `HazardAnalysis_ID` + fault-order/timing).
11. **RC-349** — invalidated evidence is preserved
    (`INVALIDATED_FOR_CURRENT_CONFIGURATION`), never cleared (Constitution Art. I).
12. **RC-350** — full `TestCellAuthorization_ID` schema + lifecycle
    (`DRAFT`→…→`SUPERSEDED`).

Status: `FORMAL_BASELINE_CANDIDATE / REVISION_03_APPLIED / RUNOUT_SCHEMA_DEFINED /
RUNOUT_EQUATION_DEFINED / CONFIGURATION_VALIDITY_RULE_DEFINED /
HISTORICAL_EVIDENCE_RETENTION_REQUIRED / STEPPED_CELL_ESCALATION_DEFINED /
TEST_CELL_AUTHORIZATION_SCHEMA_DEFINED / C3A_C3B_DEPENDENCY_RESOLVED /
C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED / C3C_REGEN_COEXISTENCE_DEFINED /
C3C_COORDINATED_BLENDING_LOCKED / C3D_STEERING_STATE_MATRIX_DEFINED /
C3E_FAULT_HIERARCHY_DEFINED / C3E_EXECUTION_DOMAIN_CLASSIFICATION_DEFINED /
NUMERIC_LIMITS_INITIAL_TARGET_PROFILE / FORMAL_ENGINEERING_REVIEW_REQUIRED /
NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION / NO_NORMAL_DRIVING_AUTHORITY`. Post-edit
label: `GATE_05M_C3_REVISION_03_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` —
"the procedure architecture is ready for controlled multidisciplinary review, not
that physical movement/braking/regen/fault validation has passed."

### Next

Owner: proceed toward **05M-C3A execution + Envelope Cell 1 authorization** (each
a `TestCellAuthorization_ID`, RC-350) and the formal engineering baseline review.
Ford ABS/ESC interface, inverter/BMS regen + isolation architecture,
tire/axle/geometry, and thermal-sensor data remain NeedsSupplierData.

### Standing checks

- 11 corrections applied verbatim to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  (RC-340..350); `L_min` equation + governance (RC-340); ±2 Nm a candidate
  (RC-341); no circular C3A→C3B dependency (RC-342); no "immediate" steering
  wording (RC-343); `STALE` by freshness (RC-344); supplier Neutral envelope
  (RC-345); explicit fault ownership + comms-loss ≠ shutdown (RC-346); C3E
  execution-domain classification (RC-347); paired-fault prerequisites (RC-348);
  invalidated evidence preserved (RC-349); `TestCellAuthorization_ID` schema
  (RC-350); C3A-009B stays LOCKED (RC-328); every number INITIAL_TARGET_PROFILE
  (RC-267/293/300); nothing `SIGNED_PASS`; never "certified safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.

## 80. Batch 72 ("70:75") + owner review_68 — Gate 05M-C3 Revision 04 + 13 pre-baseline corrections (2026-07-16)

Raw sources:
`docs/research/raw/research_hunter/batch_72_gate05mc3_revision04.md`
and `docs/research/raw/owner_reviews/review_68_batch_72_verdict.md`.
**Row additions: RC-351..RC-363 (no new CS).** No new deliverable — corrections
applied to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`. Owner: "Revision 04 is very
strong and is now close to a controlled engineering baseline … the big
architecture problems are largely resolved."

### Revision 04 — the 11 batch_71 corrections applied

The Hunter delivered Gate 05M-C3 Revision 04, which applies RC-340..350: the
`L_min` equation (with visible transcription errors, archived 1:1), the
`distance_component_method` enum, the movement-authorization gate, the
`TestCellAuthorization_ID` archetype + status enum,
`INVALIDATED_FOR_CURRENT_CONFIGURATION`, the ±2 Nm "Initial Residual Candidate",
the split C3A-006 + the C3A/C3B post-run correlation review, the supplier-defined
Neutral envelope, the C3C-007 ownership matrix + comms-loss cross-validation, the
steering freshness/frame-counter STALE rule, the `FAULT_EXECUTION_DOMAIN`
categories with per-fault domain tags, and the paired-fault prerequisites.
C3A-009B is now cleanly `APPROVAL_REQUIRED / LOCKED / NOT_ELIGIBLE`.

### Thirteen pre-baseline corrections (RC-351..363)

1. **RC-351** — preserve distance-component values, never zero-clamp overlaps
   (`INCLUDED_SEPARATELY`/`INCLUDED_IN_OTHER_COMPONENT`/… + the field set).
2. **RC-352** — Distance Accounting Integrity Rule + component schema (every
   metre counted once).
3. **RC-353** — insert the immutable result lifecycle
   (`SIGNED_RESULT → … → SUPERSEDED_FOR_CURRENT_CONFIGURATION`).
4. **RC-354** — `TestCellAuthorization` status transition rules + `ACTIVE`/
   `COMPLETED`/`REVOKED`/`SUPERSEDED` definitions (no `DRAFT`→`ACTIVE` jump).
5. **RC-355** — procedure approval requires a real named-approver signature;
   otherwise `APPROVAL_REQUIRED` / `NOT_EXECUTED` / `NOT_ELIGIBLE`.
6. **RC-356** — ±2 Nm residual strictly non-authoritative + DC-bus current
   tracked; remove "reactive field-weakening" justification.
7. **RC-357** — C3A-006 measures brake input / assist state / hydraulic pressure,
   not "maintains braking control".
8. **RC-358** — C3A-009B `BlockReason` + seven unlock prerequisites.
9. **RC-359** — after inverter comms loss, independent physical-state evidence is
   required (unknown-state until proven).
10. **RC-360** — steering validity and freshness are separate axes
    (`VALID_AND_FRESH` / `VALID_BUT_DEGRADED` / `IMPLAUSIBLE_BUT_FRESH` / `STALE`
    / `UNAVAILABLE`).
11. **RC-361** — execution-domain arrows are review paths, not automatic
    authorization (Execution Domain Progression Rule).
12. **RC-362** — tighter moving-fault limits (never physically remove brake/steer
    assist while moving; bounded aux-voltage supply tests).
13. **RC-363** — full `PairedFaultAuthorization_ID` schema; reverse ordering is a
    separate record.

*(Owner item 1 — the `L_min` equation transcription cleanup — was already clean
in the deliverable; no new RC row.)*

Status: `FORMAL_BASELINE_CANDIDATE / REVISION_04_APPLIED / … /
IMMUTABLE_EVIDENCE_PRESERVATION_DEFINED / LEDGER_LIFECYCLE_DEFINED /
AUTHORIZATION_TRANSITION_RULES_DEFINED / PROCEDURE_SIGNATURE_REQUIRED /
DISTANCE_OVERLAP_ACCOUNTING_DEFINED / C3D_SIGNAL_FRESHNESS_MODEL_DEFINED /
C3E_EXECUTION_DOMAINS_DEFINED / C3E_DOMAIN_TRANSITIONS_REQUIRE_SEPARATE_AUTHORIZATION
/ MULTI_FAULT_AUTHORIZATION_SCHEMA_DEFINED / NO_PUBLIC_ROAD / NO_CUSTOMER_OPERATION
/ NO_NORMAL_DRIVING_AUTHORITY`. Post-edit label:
`GATE_05M_C3_REVISION_04_READY_FOR_FORMAL_ENGINEERING_BASELINE_REVIEW` — "the
controlled procedure architecture is ready for multidisciplinary engineering
review; it does not mean any vehicle / calibration / brake system / regeneration
strategy / moving fault test has physically passed."

### Next

Owner: proceed toward **05M-C3A execution + Envelope Cell 1 authorization** (each
a signed `TestCellAuthorization_ID`, RC-350/354) and the formal engineering
baseline review. Ford ABS/ESC interface, inverter/BMS regen + isolation
architecture, tire/axle/geometry, and thermal-sensor data remain NeedsSupplierData.

### Standing checks

- 13 corrections applied verbatim to `GATE05M_C3_CLOSED_AREA_MOVEMENT.md`
  (RC-351..363); overlap by value preservation not zero-clamp (RC-351); distance
  accounting integrity (RC-352); immutable result lifecycle (RC-353);
  authorization transitions (RC-354); procedure signatures required (RC-355);
  ±2 Nm non-authoritative (RC-356); measurable C3A-006 braking (RC-357); C3A-009B
  block prerequisites (RC-358); unknown-state evidence after comms loss (RC-359);
  validity ≠ freshness (RC-360); domain arrows are review paths (RC-361); tighter
  moving-fault limits (RC-362); paired-fault schema (RC-363); every number
  INITIAL_TARGET_PROFILE (RC-267/293/300); nothing `SIGNED_PASS`; never "certified
  safe" (RC-224).
- Nothing ingested; nothing marked Confirmed; no normal driving; no public road;
  no customer operation; no compliance/certification claim; ODRs untouched.
