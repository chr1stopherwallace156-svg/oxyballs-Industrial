# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 23 + review_20 — Brake/Steering
  Gate v0.4, first complete EHPS candidate); awaiting owner decisions
  and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `0508bce` — Archive raw RH batch 23 (Gate 04 complete EHPS
  candidates) + owner verdict (review_20) 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-53, CS-54;
  RC-82..RC-87; section 31; CS-51 reaffirmed; **orphaned truncated
  section-28 duplicate removed** — see below),
  `docs/research/RESEARCH_MAP.md` (Gate 04 v0.4),
  `docs/research/outreach/SUPPLIER_INQUIRY_ZF_01.md` (new, DRAFT),
  `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_23_ehps_complete_candidates.md`,
  `review_20_batch_23_verdict.md`, and the PROVENANCE update were
  committed separately as `0508bce`.)
- Summary: batch 23 (complete EHPS candidates) + review_20 reconciled.
  Owner label: **Brake/Steering Gate v0.4** — architecture strong, a
  **complete** EHPS candidate now exists (ZF EPHS MPU 100-C, CS-53), but
  the replacement system is not proven and final selection is halted.
  Owner corrections applied verbatim: (1) the batch's "6000 RPM CAN
  control" claim is **refuted** by the ZF factsheet's "No connection to
  the CAN bus required" → RC-83 control/diagnostics = NeedsSupplierData;
  (2) ZF is a **motorsport** pump, not proven commercial-duty → RC-84
  MotorsportSupplierCandidate/NeedsCommercialDutyReview; (3) Lee CS-51
  reaffirmed as FordStyleHydroboostPumpReference/NeedsFordExactSource;
  (4) ~2.5–3.3 kW / ~250–300 A → RC-85 EngineeringEstimate/
  NeedsZFCurrentMap (do NOT size DC-DC from it alone); (5) FMVSS 105
  test map must cover partial-failure/fade-recovery/water-recovery/
  stability/parking-brake/warning-lamp, not just stopping distance
  (RC-87); (6) Ford return-line hose = FordProductReference (CS-54/RC-86,
  not the pump curve). ZF supplier packet drafted (`SUPPLIER_INQUIRY_
  ZF_01.md`, DRAFT). **PATS "bypass" language did NOT recur (2nd clean
  batch). Nothing ingested; nothing Confirmed; ODRs untouched.**
- **Register cleanup note:** the reconciliation removed an orphaned,
  truncated duplicate of section 28 that had been appended after
  section 30 (an earlier draft, cut off mid-word "Theo"). The canonical
  section 28 at its proper position (Cooling Modeling Framework v0.1) is
  complete and unchanged; no evidence was lost (raw evidence lives under
  `docs/research/raw/`). Sections now run 1..31 without duplication.

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_23/review_20 archives are 1:1 against the
  owner's chat message ("23:75"); the ZF row is held at candidate
  altitude with the source-contradiction (CAN) recorded as a defect; no
  motorsport/estimate value became a rule; nothing marked Confirmed;
  section numbering re-checked (28/29/30/31 unique)

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion — ~52 batches outstanding); B-002
  (.gov/CARB extraction blocked); **B-003 + B-004 unified under
  BLOCKED_PENDING_SUPPLIER_DATA (research/modeling allowed; final
  numbers wait)**
- Open owner decisions (accumulated): (1) elektron-os-clean
  two-universe question (Audit 01 §0/§11.1); (2) index.html
  disposition (Audit 01 §10); (3) L2 regulatory module mapping;
  (4) L4 mechanical/structural module; (5) L6 battery/BMS/thermal
  module; (6) L9 lane name confirmation; (7) Artifact Intake Form
  definition; (8) formalize the M10 forbidden-phrase scanner
  (bypass/override/defeat + Validated reserved-vocab); (9) approve/edit
  the Dana supplier letter; (10) **approve/edit the new ZF supplier
  letter** (`SUPPLIER_INQUIRY_ZF_01.md`, DRAFT).

## Next exact action

Expected next inputs, in any order: (a) the owner approves/edits the
Dana or ZF letter (then flip its status to READY_TO_SEND); (b) the owner
sends any letter (record "Sent" + date; start the 7-day follow-up clock —
cadence sections are in each outreach file); (c) a supplier reply arrives
(archive 1:1 under `docs/research/raw/supplier_replies/`, then reconcile —
first evidence that can resolve the BLOCKED_PENDING_SUPPLIER_DATA / ZF
NeedsCurrentMap holds); (d) the next research batch — by the review_20
prompt, **FMVSS 105 brake test mapping + the loaded low-speed steering
test procedure** (not more generic hydroboost). Enforce: FMVSS 105 test
map must include partial-failure/fade-recovery/water-recovery/stability/
parking-brake/warning-lamp behavior with exact 49 CFR 571.105 locators —
no compliance claim; hydraulic-pump data alone is not enough; a
Dodge/Mopar EHPS example is LeadOnly until pressure/flow/current/duty are
proven; nothing Confirmed; **NEVER "PATS bypass/override"** (authorized
Ford-compatible integration only). Lane doctrine still applies (modeling
statuses, NeedsExactQuote, name the supplier data).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence.
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows (RC-19/20 truncated; RC-22..26 locator-pending)
  or fenced values (J1673 4×/6×; rejected supplier numbers; ZF current
  estimate RC-85; ZF "CAN control" claim RC-83).
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
