# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-15
- Reason for handoff: task complete (batch 13 + review_08 reconciled);
  awaiting owner decisions and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `330cb9e` — Reconcile RH batch 12 + owner review_07
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed:
  `docs/research/raw/research_hunter/batch_13_hv_wiring_precharge_50mm.md`
  and `docs/research/raw/owner_reviews/review_08_batch_13_verdict.md`
  (new, verbatim — committed separately as `898707e`),
  `docs/research/raw/research_hunter/PROVENANCE.md`,
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-30..34;
  RC-50..54; section 20), `docs/research/RESEARCH_MAP.md` (L5 →
  CANDIDATE ARCHITECTURE STAGE), `docs/CHANGELOG.md`, handoff files
- Summary: batch 13 + review_08 reconciled — 5 of the owner's 6 ask
  items delivered; **HV connectors are the only untouched item**.
  New: Miba pre-charge formulas (CandidateRule; resistor part =
  OpenGap), TE Mini K pre-charge relay (**voltage-suitability OpenGap
  — 400/450 VDC vs unknown pack voltage**), Coroflex 50 mm² datasheet
  (closes the 50 mm² gap at candidate level), TONFUL IP explainer
  (TechnicalBackground; ISO 20653 stays the gate), Metrel MI3132
  (**InstrumentationCandidate/TestMethodCandidate** per owner). All 7
  owner corrections applied — including reverting "Marked Closed"/
  "selection locked" status inflation and rejecting Sendyne "absolute"
  phrasing. Conduct: status-inflation language is the dominant
  residual defect (4th packaging-drift variant); none entered the
  register. **Nothing ingested; nothing Confirmed; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_13/review_08 archives are 1:1 against the
  owner's chat message ("13:75"); all quotes Hunter-supplied and
  unverified (B-002); no component was selected and no supplier or
  regulatory value entered any rule or parameter

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion — ~70 batches outstanding); B-002
  (.gov/CARB extraction blocked)
- Open owner decisions (accumulated): (1) elektron-os-clean
  two-universe question (Audit 01 §0/§11.1); (2) index.html
  disposition (Audit 01 §10); (3) L2 regulatory module mapping;
  (4) L4 mechanical/structural module (new gap); (5) L6
  battery/BMS/thermal module (new gap); (6) L9 lane name confirmation
  ("Supplier b" truncation); (7) Artifact Intake Form definition.

## Next exact action

On the next research delivery: diff against existing raw batches; if
new, archive 1:1, update PROVENANCE, commit, then reconcile into the
filter register **and bucket each row against a Research Map lane
(L1–L10)** in a separate commit. If the owner answers the open
decisions instead, apply them (module creation requires owner wording
or explicit approval).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence.
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows (RC-19/20 truncated; RC-22..26 locator-pending)
  or fenced values (J1673 4×/6×; rejected supplier numbers).
- Do not let quantum-inspired material gate or approve anything.
- Do not implement M10, M11, or any production code; do not resolve
  ODR-001..ODR-003.

## Receiving-agent checklist (complete BEFORE modifying any file)

- [ ] **Agent owner field names ME** — if not, do not edit
- [ ] `git status` — clean tree, expected branch
- [ ] `git log -1` — HEAD matches end commit above
- [ ] Active spec checked (`docs/specifications/Revision_07.md`,
      `rev07/00_BASELINE_INDEX.md`)
- [ ] Claimed tests re-run and results compared (or absence of a test
      suite verified explicitly)
- [ ] `docs/status/CURRENT_PHASE.md` and `docs/status/BLOCKERS.md` read
