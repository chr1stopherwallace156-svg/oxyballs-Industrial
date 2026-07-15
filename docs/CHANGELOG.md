# CHANGELOG

Documented history of changes to doctrine, structure, schemas, and
milestones. Append-only; newest entries first.

---

## 2026-07-15 — RH batch 09 (HV wiring gap closure) + review_04 reconciled

- Archived batch_09 (first single-gap payload) and review_04 (owner
  gap-package checklists + gap-closure prompt template + verdict) 1:1.
- Owner instructions applied: Sendyne SIM100MLP promoted
  (SupplierCandidate/MetricCandidate — CS-20/RC-38, with the **100 Ω/V
  figure fenced**: datasheet safety discussion, not a system threshold
  until cross-checked vs FMVSS 305a / ISO 6469-3 / selected
  components); ALL Lectromec-derived rows (RC-27/28/39) downgraded to
  TechnicalBackground/NeedsExactSource; fifth Chilye rule candidate
  added (service accessibility); standing rejections extended.
- Candidate Build Engine items table added (3 RuleCandidates, 1
  MetricCandidate, 1 TestCandidate, 4 OpenGaps) — all pre-rule.
- Research Map updated: gap-closure mode with owner's execution order;
  L5 HV wiring EMPTY → PARTIALLY MAPPED with the 15-item still-missing
  list; detailed checklists recorded for all six gap packages.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 08 + owner review_03 archived and reconciled

- Archived batch_08 (first focused payload, gaps 1–6) and review_03
  1:1. Priorities 1/3/4 advanced; 2/5/6 honestly reported empty.
- Owner instructions applied verbatim: promoted Chilye MSD
  (SupplierCandidate + NeedsEngineeringReview), Brogen EHPS
  (SupplierCandidate / CP#1 candidate, EngineeringReviewRequired +
  PhysicalVerificationRequired), Ford Q-251R2 (CandidateSource for UIM
  behavior ONLY), ISO 6469-3 (CandidateSourcePath / NeedsExactSource);
  downgraded SAE J1742-via-Scribd (NeedsOfficialSource) and EV West
  EPS (BackgroundSupplier / WrongPlatformRisk).
- UIM inference split: "PCM delete requires mimicking 28 messages"
  recorded as unsupported inference (EngineeringReviewRequired /
  MISSING_SOURCE) — no claim row created; UIM-behavior quote promoted
  as RC-36.
- New rows CS-14..CS-19, RC-32..RC-37; MSD candidate rules recorded
  component-family-scoped; supplier numbers fenced as non-design
  values; CP#1 10-item missing list recorded on CS-17.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 07 + owner review_02 archived and reconciled

- Archived batch_07 ("Comprehensive Research Discovery Map") and the
  owner verdict (review_02) 1:1 (same-message delivery noted).
- Owner directives applied: batch-07 FMVSS row marked
  `NeedsURLCorrection` (2025-02584 is the wrong FR document — verified
  citations CS-02/CS-03 stand); Lectromec stays TechnicalBackground/
  NeedsExactSource; xr793 mirror lead-only; EngineCert background-only/
  NeedsSupplierData.
- New sources CS-10 (Q-356R2 — first Super-Duty-specific OEM document
  path), CS-11 (HVIP Solicitation 2026-03), CS-12/CS-13 (third-party
  mirror / background explainer — held as leads). New claims RC-30 (Q-356R2 MIL/box-
  removal — CP#2-relevant), RC-31 (Appendix C reference — **B-vs-C
  discrepancy flag** vs RC-25).
- Regression flagged: NPRM "Proposed…" quote under a Final Rule title
  (third proposal/final mix). Third bend-radius variant fenced.
- Owner's six focused research priorities added to the Research Map.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 06 archived and reconciled (first lane-bucketed batch)

- Archived batch_06 ("Deep-Dive Source Payload") 1:1.
- Register: RC-01 completed with full CARB applicability quote (MY2021+,
  "may be certified" nuance flagged); RC-04 summary language attributed
  to 90 FR 9609 (confirms §9 splice finding); added CS-08 (Lectromec
  J1673 review — secondary, LeadOnly-class) and CS-09 (Transit BEMM via
  **unofficial mirror** — provenance concern, official copy required);
  added RC-27..RC-29 (cable-sizing factors, splice avoidance,
  cross-member rule with cross-match flag).
- Held: FR doc URL 2025-02584 (conflicts with verified 2025-02582);
  second CARB PDF URL (governing-version question opened); derived
  Sept-1-2029 compliance date (arithmetic + unestablished alterer
  classification); cert-family-split inference; zero-splice rule
  proposal; 6×–8× bend multiplier (contradicts batch_05's fenced
  4×/6× — both fenced).
- All rows lane-bucketed per the Research Map (first batch under the
  lane system). Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Research Map established (10 required lanes)

- Added `docs/research/RESEARCH_MAP.md` per owner instruction: L1
  OEM/Ford, L2 regulatory/certification/incentive, L3 core EV
  conversion engineering, L4 mechanical/structural/bracket/frame/
  fatigue, L5 electrical/HV wiring, L6 battery/BMS/thermal, L7
  controls/CAN/diagnostics, L8 quantitative modeling/simulation, L9
  supplier data, L10 physical truck measurements — all required, none
  optional. Quantum-inspired optimization fenced as FUTURE ONLY
  outside the numbered lanes.
- Standing rules encoded: quantum cannot approve engineering; sim
  cannot replace physical proof; academic → PrincipleCandidate unless
  tied to Rule/Metric/Test/NoGo; supplier datasheets →
  NeedsVerification; OEM/regulatory outrank academic; full claim field
  requirements.
- Current coverage mapped per lane (most lanes empty). Mapping gaps
  escalated to owner: L2 regulatory module (standing), L4 mechanical
  module (new gap), L6 battery/thermal module (new gap), L9 lane-name
  truncation ("Supplier b") to confirm.

## 2026-07-15 — System Audit 01 recorded

- Added `docs/audits/AUDIT_01_2026-07-15_SYSTEM_STATUS.md`: full
  status check against what verifiably exists. Headlines: repo safety
  PASS; build/database/StageGate/M8/FinalVerification NOT PRESENT (no
  software exists — expected in ingestion phase); research ingestion
  PASS at document level (7 CS / 26 RC rows, 0 Confirmed, 4 guardrail
  catch types with evidence); forbidden-language scan: docs PASS,
  **index.html FAIL** (certified/warranty/turnaround/pricing claims
  unsupported by any evidence); scope mismatch flagged — audit brief
  references an `elektron-os-clean` repo that does not exist here
  (owner decision required); verification debt (B-002) and
  self-verifying-agent risk recorded.
- No files outside `docs/audits/` modified; nothing marked Confirmed;
  ODRs untouched.

## 2026-07-15 — Handoff protocol amended (D-004)

- Added operational fallback triggers (batch completed / meaningful
  commit / two hours / unresolved contradiction / dirty tree before
  agent switch) so continuity does not depend on predicting usage
  limits.
- Added branch single-writer rule with `Agent owner` field in the
  handoff (template + live handoff updated; receiving-agent checklist
  now verifies ownership first). Mirrored in AGENTS.md, the Cursor
  rule, and AI_INSTRUCTIONS.md.
- Handoff validity hashes deferred to M10 start (recorded in AGENTS.md
  and the M10 roadmap; not implemented now, per owner instruction).

## 2026-07-15 — Owner review of batch 05 archived and applied (verdict: filter yes, ingestion no)

- Archived `docs/research/raw/owner_reviews/review_01_batch_05_verdict.md`
  1:1 (citation markers stripped in transit noted in provenance).
- Applied owner instructions: per-claim statuses explicit;
  `NeedsVehicleSpecificBBLB` vocabulary adopted; CS-07 scope corrected
  to general Ford guidance (not Super Duty); FMVSS rows fenced to
  "requirements must be mapped" (never "we comply"); HVIP rows fenced
  to "path requires EO/eligibility review" (never voucher promises).
- New owner-relayed candidate claims RC-22..RC-26 (frame-rail web
  drilling limits, flange welding prohibition, HVIP ZEV Conversions
  section, Appendix B exemption-EO requirement, fleet-class
  restriction) — all locator-pending, unusable until located.
- Frame-rail downgrade upgraded `NeedsExactSource` →
  `NeedsVerification` + `NeedsVehicleSpecificBBLB` (content candidates
  on file; exact quote/page still required).
- Section 12 adds the owner-requested outputs: Rule/Metric/Test/NoGo
  candidate preview, holds, needs-vehicle-specific list, engineering
  review list. "Artifact Intake Form" noted as future step, not built.
- Still: nothing ingested, nothing Confirmed, no SQLite, no StageGate
  changes, ODRs untouched.

## 2026-07-15 — RH batch 05 archived and reconciled into filter register

- Archived batch_05 ("un-paraphrased data payload") 1:1.
- Register updates: RC-02 extended with EO-per-family clause; RC-07
  gains part 561 quote + Executive Summary locator; RC-08 upgraded to
  the full per-class DATES sentence — 2027/2028 structure resolved at
  candidate level (2027 ≤ 4,536 kg; 2028 > 4,536 kg), with the "For
  all other requirements" prefix flagged as an open nuance.
- New candidate claims RC-17..RC-21: BBLB cross-member prohibition,
  fastener grades, welding precautions (truncation flag), CARB §2.2.1
  ESS fragment (truncation flag), first HVIP Manual-internal quote
  (fleet-level access, not conversion eligibility).
- Section 11: frame-rail downgrade explicitly NOT upgraded (quote
  covers cross members only); J1673 "4×/6×" example multipliers fenced
  as non-values; hydroboost gains PhysicalVerificationRequired; PATS
  upgrade path named (real-vehicle CAN capture).
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Delivery "4:75" verified as exact duplicate of batch 03

- Diff-verified byte-identical to `batch_03_finalized_output.md`; not
  duplicated on disk — receipt recorded in the raw archive's
  PROVENANCE.md, duplicate notice added to the filter file (section 10).
- No register changes; flagged to owner as possible mis-send.

## 2026-07-15 — RH batch 03 archived and reconciled into filter register

- Archived batch_03 ("Finalized Research Hunter Output" — the run the
  owner graded PASS) 1:1 under `docs/research/raw/research_hunter/`.
- Filter register updates: candidate citation **89 FR 104318** attached
  to CS-02 (missing-source 3 candidate-resolved); RC-08/RC-09 now carry
  Hunter-supplied DATES-section quotes and locators (verification flags
  remain — B-002); RC-10 locator set to 90 FR 9609 DATES; RC-09 scope
  widened to include small-volume manufacturers per the quoted text.
- Section 9 reconciliation: rejected sentence did not recur; NPRM
  framing and date conflation superseded; flags recorded for the
  spliced Claim-1 paraphrase, the BBAS title/URL mismatch, the dropped
  (but retained) Appendix B locator, the deferred Part 561 template
  next-action, and the non-authoritative "un-hallucinated"
  self-assessment.
- Nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH batch 02 archived and reconciled into filter register

- Archived batch_02 ("Strict Technical Source Map") 1:1 under
  `docs/research/raw/research_hunter/`; PROVENANCE updated.
- Filter register updates: added CS-06 (FMVSS 305a NPRM —
  supplementary, proposal-stage only) and CS-07 (Ford General BBLB);
  attached Hunter-supplied quotes as **candidate locators** to
  RC-02/RC-03 (CARB cert-family, monitoring/diagnostics), RC-09
  (NPRM corroboration), RC-11 (FAQ verbatim); added RC-13..RC-16.
- Section 8 reconciliation: re-rejected the recurring broad incentive
  sentence; rejected the "Sept 1, 2027 effective date" conflation
  (effective date was 2025-03-20 per delay notice; 2027-09-01 is
  mandatory-applicability language — RC-08 flag stays open); rejected
  the ELK-BuildEngine-Doctrine-StageGate.pdf upload suggestion as a
  research action (internal doctrine enters only via owner ingestion).
- Missing-source list: added hydroboost bracket metrology
  (measurement-only) and ISO 6469-3 alternate; sharpened the UIM item.
- All Hunter quotes remain unverified against source PDFs (B-002);
  nothing ingested; nothing Confirmed; ODRs untouched.

## 2026-07-15 — Raw RH-01 Research Hunter output archived 1:1

- Archived the raw RH-01 "Research Map & Candidate Ingestion" document
  unchanged at `docs/research/raw/research_hunter/batch_01_research_map.md`,
  with `PROVENANCE.md`; resolves missing-source item 1 of the RH-01
  filter file.
- Added delta-review addendum to `RH01_SECOND_STAGE_FILTER.md`:
  rejected the *Internal NDA* supplier-datasheet row (unverifiable
  values — potential invented engineering values), the Hunter's
  self-asserted "filter evaluation" and direct-ingestion routing, and
  the raw document's incorrect FMVSS 305a subtitle; retained "Appendix
  B" as a candidate locator for the HVIP claim; listed unfiltered
  candidate topics (HVIL, UL 2580, fasteners, IVM/SVE, BAR/DMV, ACF,
  hydroboost CP#1, metrology, QUBO-future-only).
- Still nothing ingested into rev07; nothing Confirmed; ODRs untouched.

## 2026-07-15 — RH-01 second-stage research filter output recorded

- Added `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`:
  5 CandidateSource rows (CARB ZEP procedure; FMVSS 305a final rule;
  FMVSS 305a delay notice, 90 FR 9609–9610; HVIP FAQ/Manual as
  RegulatoryCandidate; Ford BBAS as CandidateSourcePath), 12 candidate
  claim rows (none Confirmed), 4 claims kept downgraded, 2 rejections,
  missing-source list, next-action list.
- **Nothing ingested into rev07; no database writes; ODRs untouched;
  SourceClaims.md untouched.**
- Filed B-002: verbatim .gov/CARB source extraction blocked by the
  current environment's network policy.

## 2026-07-15 — Cross-agent handoff protocol installed (D-003)

- Added `AGENTS.md` (cross-agent rules) and
  `.cursor/rules/elektron-build-engine.mdc` (Cursor mirror) — Claude
  Code and Cursor use the same handoff format.
- Added `docs/handoffs/`: `CURRENT_HANDOFF.md` (initialized with real
  repository state), append-only `HANDOFF_LOG.md`, and
  `templates/HANDOFF_TEMPLATE.md`.
- Added `docs/status/`: `CURRENT_PHASE.md` (phase source of truth),
  `IMPLEMENTATION_LEDGER.md` (claimed vs verified; L-001),
  `BLOCKERS.md` (B-001).
- Wired the protocol into `CLAUDE.md`, `docs/AI_INSTRUCTIONS.md`, and
  the README layout map.
- No specification content ingested; no production code; ODRs remain
  Open.

## 2026-07-15 — Revision 07 modularized; ingestion phase opened (D-002)

- Split Revision 07 into modules `docs/specifications/rev07/00..12`
  (all shells, status `AWAITING SOURCE INGESTION`); `Revision_07.md`
  is now the ACTIVE_SPECIFICATION index over them.
- Added `roadmaps/REV07_SOURCE_INGESTION.md` — current phase: per-batch
  archive → consolidate → extract procedure, consolidation quality bar,
  and the ODR-001..ODR-003 resolution gate (requires explicit owner
  approval).
- Added `docs/research/raw/` archive with immutability rules.
- Updated README baseline (Current Phase → Revision 07 Source Ingestion
  and Consolidation), AI_INSTRUCTIONS and CLAUDE.md roadmap pointers,
  and M10 entry conditions.
- ODR-001..ODR-003 remain **Open**; register now carries the resolution
  gate.

## 2026-07-15 — Documentation structure established

- Restructured repository documentation: README reduced to an entry
  point; doctrine moved under `/docs`.
- Added Engineering Constitution (Articles I–VIII).
- Added AI Instructions (permanent operating manual for AI tooling).
- Added Decision Register (D-001) and this Changelog.
- Added `specifications/Revision_07.md` as `ACTIVE_SPECIFICATION`
  (governance shell; doctrine content to be imported — see
  OpenDataRequirements ODR-001..ODR-003).
- Added roadmaps: `M10_IMPLEMENTATION.md` (current),
  `M11_OPEN_DATA_REGISTER.md` (deferred).
- Added research registers: `OpenResearchRegister.md`,
  `SourceClaims.md`.
