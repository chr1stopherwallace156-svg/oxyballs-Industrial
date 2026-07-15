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

## 2. Candidate SourceClaim rows

Status legend: `Candidate` = passed second-stage filter, exact
URL + title present, **not Confirmed**. `Locator` = page/section/table.
Locator extraction from .gov/CARB/Cornell hosts is currently blocked in
this execution environment (HTTP 403 via network proxy) — see B-002.

| ID | Claim (stated narrowly) | Source | Locator | Status |
|---|---|---|---|---|
| RC-01 | The CARB ZEP certification procedure applies to battery-electric and hydrogen fuel-cell powertrains for heavy-duty vehicles > 14,000 lb GVWR and incomplete medium-duty vehicles 8,501–14,000 lb GVWR | CS-01 | Applicability section — verbatim not yet independently extracted (weight classes restated in batch_02 without quote) | Candidate |
| RC-02 | The procedure defines battery certification families: "Each substantially similar battery pack, based on cell chemistry, module construction …, the battery management system, and battery thermal management systems … constitutes a certification family **and each family is required to obtain its own Executive Order.**" *(Hunter-supplied; batch_05 extends the batch_02 quote with the EO-per-family clause)* | CS-01 | **Candidate locator (batch_02/05): Page 1, Section 1** — quote unverified against the PDF (B-002) | Candidate |
| RC-03 | The procedure requires system monitoring and diagnostics information: "For each test group, a powertrain manufacturer must provide information … related to the system monitoring and diagnostics components and software strategies of the zero-emission powertrain." *(Hunter-supplied quote)* | CS-01 | **Candidate locator (batch_02): Section 2.2, System Monitoring and Diagnostics** — quote unverified against the PDF (B-002) | Candidate |
| RC-04 | FMVSS No. 305a replaces FMVSS No. 305 ("Electric-powered vehicles: electrolyte spillage and electrical shock protection") | CS-02, corroborated by CS-03 summary | Final rule SUMMARY | Candidate |
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
