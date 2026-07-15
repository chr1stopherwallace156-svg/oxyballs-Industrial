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

**Traceability gap (see Missing-source list):** the raw RH-01 output
document itself is not archived in this repository. Until it is
committed under `docs/research/raw/`, traceability for this filter run
terminates at this file.

---

## 1. Approved CandidateSource rows

| ID | Type | Document | Publisher / identifier | Exact URL | Status |
|---|---|---|---|---|---|
| CS-01 | CandidateSource | *California Standards and Test Procedures for New 2021 and Subsequent Model Heavy-Duty Zero-Emission Powertrains* | CARB; program page: Zero-Emission Powertrain Certification | Procedure PDF: <https://ww2.arb.ca.gov/sites/default/files/2020-05/ADA__California%20Standards%20And%20Test%20Procedures%20For%20New%202021%20And%20Subsequent%20Model%20Heavy-Duty%20Zero-Emission%20Powertrains.pdf> · Program: <https://ww2.arb.ca.gov/our-work/programs/zero-emission-powertrain-certification> | Candidate |
| CS-02 | CandidateSource | *FMVSS; FMVSS No. 305a Electric-Powered Vehicles: Electric Powertrain Integrity; GTR No. 20 Incorporation by Reference* — Final rule, published 2024-12-20, FR Doc. 2024-28707 (89 FR start page: pending extraction) | NHTSA / Federal Register | <https://www.federalregister.gov/documents/2024/12/20/2024-28707/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain> | Candidate |
| CS-03 | CandidateSource | Same title — *Delay of effective date*, published 2025-02-14, FR Doc. 2025-02582, **90 FR 9609–9610** | NHTSA / Federal Register | <https://www.federalregister.gov/documents/2025/02/14/2025-02582/federal-motor-vehicle-safety-standards-fmvss-no-305a-electric-powered-vehicles-electric-powertrain> | Candidate |
| CS-04 | **RegulatoryCandidate** (not final eligibility) | *FAQs — Clean Truck and Bus Voucher Incentive Project (California HVIP)*; details deferred to *HVIP Implementation Manual* (FY23-24, updated 2024-10-31) | CALSTART / CARB | FAQ: <https://californiahvip.org/faqs/> · Manual PDF: <https://californiahvip.org/wp-content/uploads/2024/10/FY23-24-HVIP-Implementation-Manual-103124.pdf> | Candidate — eligibility NOT concluded until the Manual's conversion section is extracted |
| CS-05 | **CandidateSourcePath** (path only, no claims) | *Ford Pro Body Builder Advisory Service (BBAS)* — portal to BBLBs, BEMM, CAD files | Ford Pro | BBAS: <https://www.fordpro.com/en-us/upfit/bbas/> · Publications: <https://www.fordpro.com/en-us/upfit/publications/> | Candidate path — **no physical frame claims** until the vehicle-specific Super Duty (F-450/F-550) BBLB is obtained and parsed |

## 2. Candidate SourceClaim rows

Status legend: `Candidate` = passed second-stage filter, exact
URL + title present, **not Confirmed**. `Locator` = page/section/table.
Locator extraction from .gov/CARB/Cornell hosts is currently blocked in
this execution environment (HTTP 403 via network proxy) — see B-002.

| ID | Claim (stated narrowly) | Source | Locator | Status |
|---|---|---|---|---|
| RC-01 | The CARB ZEP certification procedure applies to battery-electric and hydrogen fuel-cell powertrains for heavy-duty vehicles > 14,000 lb GVWR and incomplete medium-duty vehicles 8,501–14,000 lb GVWR | CS-01 | Applicability section — **verbatim not yet extracted** | Candidate |
| RC-02 | The procedure defines powertrain/battery certification-family provisions (family naming and Executive Order per ZEP family) | CS-01 | Pending extraction | Candidate |
| RC-03 | The procedure includes monitoring/diagnostics information requirements | CS-01 | Pending extraction | Candidate |
| RC-04 | FMVSS No. 305a replaces FMVSS No. 305 ("Electric-powered vehicles: electrolyte spillage and electrical shock protection") | CS-02, corroborated by CS-03 summary | Final rule SUMMARY | Candidate |
| RC-05 | FMVSS No. 305a expands applicability to vehicles with GVWR > 4,536 kg (10,000 lb) ("heavy vehicles") | CS-02 | Final rule SUMMARY / S2 Application | Candidate |
| RC-06 | FMVSS No. 305a adds REESS performance requirements applying to all vehicles regardless of GVWR | CS-02 | Pending extraction | Candidate |
| RC-07 | The final rule establishes 49 CFR part 561, "Documentation for Electric-powered Vehicles": risk-mitigation documentation submitted at NHTSA request, plus emergency-response information for first/second responders (REESS fires, stranded energy) | CS-02 | Pending extraction | Candidate |
| RC-08 | Heavy vehicles have a September 1, 2028 compliance date | CS-02 | DATES section — **not independently re-verified in this environment**; note the codified section heading (49 CFR 571.305a, eCFR) reads "mandatory applicability begins on September 1, 2027" — the per-class date structure must be reconciled verbatim | Candidate — **verification flag** |
| RC-09 | Final-stage manufacturers and alterers receive an additional year for the referenced (part 561) documentation requirements | CS-02 | DATES section — not independently re-verified in this environment | Candidate — **verification flag** |
| RC-10 | The effective date of the 2024-12-20 final rule was delayed until March 20, 2025 (per the 2025-01-20 "Regulatory Freeze Pending Review" memorandum) | CS-03 | 90 FR 9609–9610 (2-page notice) | Candidate |
| RC-11 | The HVIP FAQ states that retrofits or conversions of trucks and buses from internal combustion to zero-emission can be funded through HVIP, and refers to the Implementation Manual for details | CS-04 | FAQ page; specific FAQ entry anchor pending | Candidate — **RegulatoryCandidate; NOT an eligibility conclusion** |
| RC-12 | *(Replacement for rejected R-01, owner-approved wording)* "CARB ZEPCert is a candidate regulatory path that **may** be required for certain California commercial retrofit/conversion incentive eligibility. Exact HVIP/ZEPCert relationship must be verified against the current HVIP Implementation Manual and CARB guidance." | Hypothesis over CS-01 + CS-04 | n/a — hypothesis, not a source claim | RegulatoryHypothesis — verification required |

## 3. Downgraded claims (kept downgraded — NOT SourceClaims)

| Claim | Status | What would upgrade it |
|---|---|---|
| Ford frame alteration limits (drilling/welding restrictions) | `NeedsExactSource` | Vehicle-specific Super Duty (F-450/F-550) BBLB obtained, archived, and parsed with page/section |
| U-joint operating angle ≤ 3° | `EngineeringReviewRequired` | Exact source (manufacturer/SAE document + section) **and** engineering review — no promotion on source alone |
| PATS handshake / cluster blanking; UIM CAN bus integration | `EngineeringReviewRequired` / `MISSING_SOURCE` | Official Ford documentation (BEMM/UIM section) archived + engineering review |
| SAE J1673 HV cable claim | `NeedsExactSource` | SAE J1673 document obtained; claim restated with clause/table reference |

## 4. Rejected

| Item | Reason |
|---|---|
| "A vehicle conversion cannot access primary California incentive networks without matching these identical testing boundaries." | Broad compliance/incentive conclusion not directly supported by source text. Replaced by RC-12 (narrow, verification-required hypothesis). |
| Any claim lacking exact source URL + document title + page/section/table | Categorical filter rule — such claims may re-enter only via the downgraded lists above with a concrete upgrade path. |

## 5. Missing-source list

1. **Raw RH-01 output document** — not archived in this repository;
   owner to supply the original file for `docs/research/raw/`.
2. **FMVSS 305a final rule verbatim DATES/S2 text** (RC-05, RC-06,
   RC-08, RC-09) — retrieval blocked in this environment (B-002).
3. **89 FR start page** of the final rule (CS-02 citation completeness).
4. **CARB ZEP procedure verbatim applicability / cert-family /
   monitoring-diagnostics text with section numbers** (RC-01..RC-03).
5. **HVIP Implementation Manual (FY23-24) conversion/retrofit section**
   — required before CS-04 can move beyond RegulatoryCandidate.
6. **Ford Super Duty F-450/F-550 BBLB** — required for any physical
   frame claim.
7. **SAE J1673** document.
8. **Ford BEMM/UIM documentation** for PATS/CAN integration claims.

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
