# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-15
- Reason for handoff: task complete (batch 21 + review_18 — Brake/Steering Gate v0.1);
  awaiting owner decisions and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `f0cc932` — Reconcile RH batch 20 + owner review_17
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed:
  `docs/research/raw/research_hunter/batch_21_brake_steering_gate04.md`
  and `docs/research/raw/owner_reviews/review_18_batch_21_verdict.md`
  (new, verbatim — committed separately as `400e9a4`),
  `docs/research/raw/research_hunter/PROVENANCE.md`,
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-46..50;
  RC-74..78; section 29), `docs/research/RESEARCH_MAP.md` (Gate 04
  v0.1 status), `docs/CHANGELOG.md`, handoff files
- Summary: batch 21 (Gate 04 brake/steering) + review_18 reconciled.
  Owner label: **Brake/Steering Gate v0.1** — hydraulic dependency
  identified, vacuum-pump path rejected, EHPS path opened,
  Ford-specific data still missing. First CP#1 physical-safety gate.
  Core candidate: RC-74 combined brake+steering demand NoGo (never
  size steering alone). Owner's 7 corrections applied: generic/
  aftermarket sources → EngineeringBackground/NeedsFordExactSource;
  **TOP 2-2-607 rejected for Gate 04 (self-citation error — cooling
  doc mis-cited as brake/steering + FMVSS)**; **FMVSS 105 added as the
  primary brake regulation lane (CS-49)**; OpenGaps created.
  **PATS-language RECURRENCE escalated:** batch_21 repeated "digital
  bypass frameworks for PATS" one batch after review_17 made it a
  standing rule — re-corrected; recorded as the leading candidate for
  an M10 forbidden-phrase scanner (bypass/override/defeat on
  anti-theft contexts + Validated reserved-vocab). **Nothing ingested;
  nothing Confirmed; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_21/review_18 archives are 1:1 against the
  owner's chat message ("21:75"); every source is labeled by
  Ford-specificity per owner; no aftermarket value became a rule;
  nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion — ~70 batches outstanding); B-002
  (.gov/CARB extraction blocked); **B-003 + B-004 unified under
  BLOCKED_PENDING_SUPPLIER_DATA (research/modeling allowed; final
  numbers wait)**
- Open owner decisions (accumulated): (1) elektron-os-clean
  two-universe question (Audit 01 §0/§11.1); (2) index.html
  disposition (Audit 01 §10); (3) L2 regulatory module mapping;
  (4) L4 mechanical/structural module (new gap); (5) L6
  battery/BMS/thermal module (new gap); (6) L9 lane name confirmation
  ("Supplier b" truncation); (7) Artifact Intake Form definition.

## Next exact action

Expected next inputs, in any order: (a) the owner approves/edits the
Dana letter (then flip its status to READY_TO_SEND); (b) the owner
sends either letter (record "Sent" + date; **start the 7-day
follow-up clock** — cadence sections are in both outreach files);
(c) a supplier reply arrives (archive 1:1 under
`docs/research/raw/supplier_replies/`, then reconcile — first evidence
that can resolve the BLOCKED_PENDING_SUPPLIER_DATA gate); (d) the next
research batch — by the owner prompt, the **Ford-specific Gate 04
closure payload** (Ford F-450/F-550 pump pressure/flow, hydroboost
accumulator, steering-gear req, EHPS pressure-flow-current curves,
DC-DC sizing, FMVSS 105 mapping). Enforce: generic hydroboost =
EngineeringBackground only; Dodge/Mopar EHPS = LeadOnly until a
datasheet proves pressure/flow/current/duty; no FMVSS-compliance
claim; **NEVER "PATS bypass/override" (recurred in batch_21 — watch
it)**; Gate 04 is hydroboost/EHPS not vacuum. Lane doctrine still
applies (modeling statuses, NeedsExactQuote, name the supplier data).

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
