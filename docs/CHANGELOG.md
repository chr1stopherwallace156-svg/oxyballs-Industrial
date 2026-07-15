# CHANGELOG

Documented history of changes to doctrine, structure, schemas, and
milestones. Append-only; newest entries first.

---

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
