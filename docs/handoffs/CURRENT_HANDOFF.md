# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 22 + review_19 — Brake/Steering
  Gate v0.2, EHPS pumps); awaiting owner decisions and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `6a57c95` — Archive raw RH batch 22 (Gate 04 EHPS pumps)
  + owner verdict (review_19) 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-51, CS-52;
  RC-79, RC-80, RC-81; section 30), `docs/research/RESEARCH_MAP.md`
  (Gate 04 v0.2 status), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_22_brake_steering_ehps_pumps.md`,
  `review_19_batch_22_verdict.md`, and the PROVENANCE update were
  committed separately as `6a57c95`.)
- Summary: batch 22 (Gate 04 EHPS/hydraulic pumps) + review_19
  reconciled. Owner label: **Brake/Steering Gate v0.2** — the
  architecture problem is proven, the replacement system is NOT yet
  proven. Hydroboost dependency mapped; vacuum path rejected; EHPS path
  confirmed correct; Ford-specific final values still missing; EHPS
  final candidate not selected. Owner's corrections applied verbatim:
  CS-51 Lee (SupplierBackground / Ford-StyleComponentCandidate /
  NeedsFordExactSource — **not** the native Ford Super Duty spec);
  CS-52 TRW 14-20358-010 (HydraulicPumpCandidate /
  NeedsElectricMotorDriveData — a pump end, not a complete EHPS);
  RC-80 "will not bottleneck or overheat" downgraded to
  NeedsEngineeringReview; RC-81 DC-DC load linkage (OpenGap / RuleInput,
  ~2–3.5 kW → ~160–290 A at 12 V — loops Gate 04 back to Gate 01
  low-voltage architecture). Eight OpenGaps carried. **PATS-language did
  NOT recur** in batch_22 (held one batch after the escalation).
  **Nothing ingested; nothing Confirmed; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_22/review_19 archives are 1:1 against the
  owner's chat message ("22:75"); every source labeled by
  Ford-specificity per owner; no aftermarket/hydraulic-pump value became
  a rule; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion — ~53 batches outstanding); B-002
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
  the Dana supplier letter.

## Next exact action

Expected next inputs, in any order: (a) the owner approves/edits the
Dana letter (then flip its status to READY_TO_SEND); (b) the owner
sends either letter (record "Sent" + date; start the 7-day follow-up
clock — cadence sections are in both outreach files); (c) a supplier
reply arrives (archive 1:1 under `docs/research/raw/supplier_replies/`,
then reconcile — first evidence that can resolve the
BLOCKED_PENDING_SUPPLIER_DATA gate); (d) the next research batch — by
the review_19 prompt, the **complete-EHPS-systems payload**: for each
candidate extract manufacturer, exact model, voltage (12/24/HV),
continuous + peak current, hydraulic flow curve, pressure curve, relief
pressure, duty cycle, thermal derating, control method (PWM/CAN/analog/
fixed), reservoir, fluid type, ports, fault outputs, mounting, and
whether it supports simultaneous hydroboost + steering. Also Ford/OEM
sources for F-450/F-550 factory pump pressure/flow, steering-gear req,
hydroboost accumulator reserve, loaded low-speed steering test, FMVSS
105 mapping. Enforce: **hydraulic-pump data alone is not enough**; a
Dodge/Mopar EHPS example is LeadOnly until pressure/flow/current/duty
are proven; no FMVSS-compliance claim; nothing Confirmed; **NEVER "PATS
bypass/override"** (authorized Ford-compatible integration only). Lane
doctrine still applies (modeling statuses, NeedsExactQuote, name the
supplier data).

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
