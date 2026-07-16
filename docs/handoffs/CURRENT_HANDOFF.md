# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 24 + review_21 — Gate 04 v0.4
  supplier-inquiry prep + regression catch); awaiting owner decisions
  and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `5abd8a8` — Archive raw RH batch 24 (Gate 04
  supplier-inquiry prep) + owner verdict (review_21) 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-83/RC-84
  recurrence markers; section 32 — **no new CS/RC rows**),
  `docs/research/RESEARCH_MAP.md` (Gate 04 state flags + new Gate 04B
  sub-gate), `docs/research/outreach/SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`
  (new, DRAFT), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_24_ehps_supplier_inquiry_prep.md`,
  `review_21_batch_24_verdict.md`, and the PROVENANCE update were
  committed separately as `5abd8a8`.)
- Summary: batch 24 (supplier-inquiry prep) + review_21 reconciled. **No
  new sources** — the batch re-cited ZF (CS-53) and Lee (CS-51) and
  prepared two supplier packets. Its register value is a **defect
  recurrence** and two **gate-state transitions**:
  - **Regression:** the payload re-asserted two claims corrected one
    batch earlier — "6000 RPM CAN control" (factsheet: "No connection to
    the CAN bus required"; Q9 again demanded a `.dbc` file) and
    "Designed for commercial vehicle validation" (ZF is a motorsport
    pump). Both re-corrected (RC-83/RC-84). This is the **second
    corrected-claim recurrence** (after PATS, batches 20→21) — leading
    use-case for the proposed M10 corrected-claim regression scanner.
  - **Gate 04 flags:** `CANDIDATE_EHPS_FOUND` / `FINAL_SELECTION_HALTED`
    / `BLOCKED_PENDING_SUPPLIER_RESPONSE` (stays v0.4).
  - **New sub-gate Gate 04B:** FMVSS 105 brake test mapping + loaded
    low-speed steering test procedure — the next research target.
  - Ford/Lee/steering-specialist supplier packet drafted (DRAFT); ZF
    packet already on file. **Nothing ingested; nothing Confirmed; ODRs
    untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_24/review_21 archives are 1:1 against the
  owner's chat message ("24:24"); no new value entered the register; the
  recurrence is recorded, not silently dropped; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion — outstanding); B-002 (.gov/CARB
  extraction blocked); **B-003 + B-004 unified under
  BLOCKED_PENDING_SUPPLIER_DATA (research/modeling allowed; final
  numbers wait)**; Gate 04 now also carries
  `BLOCKED_PENDING_SUPPLIER_RESPONSE` (ZF + Ford/Lee)
- Open owner decisions (accumulated): (1) elektron-os-clean
  two-universe question (Audit 01 §0/§11.1); (2) index.html
  disposition (Audit 01 §10); (3) L2 regulatory module mapping;
  (4) L4 mechanical/structural module; (5) L6 battery/BMS/thermal
  module; (6) L9 lane name confirmation; (7) Artifact Intake Form
  definition; (8) **formalize the M10 forbidden-phrase + corrected-claim
  regression scanner** (now two documented recurrences: PATS + ZF-CAN/
  duty); (9) approve/edit the Dana letter; (10) approve/edit the ZF
  letter; (11) **approve/edit the new Ford/Lee/steering letter**
  (`SUPPLIER_INQUIRY_FORD_LEE_STEERING_01.md`, DRAFT).

## Next exact action

Expected next inputs, in any order: (a) the owner approves/edits any of
the three supplier letters (Dana / ZF / Ford-Lee — then flip status to
READY_TO_SEND); (b) the owner sends any letter (record "Sent" + date;
start the 7-day follow-up clock — cadence sections are in each outreach
file); (c) a supplier reply arrives (archive 1:1 under
`docs/research/raw/supplier_replies/`, then reconcile — first evidence
that can lift `BLOCKED_PENDING_SUPPLIER_RESPONSE` / the ZF NeedsCurrentMap
and Ford NeedsFordExactSource holds); (d) the next research batch — by
review_21, **Gate 04B: FMVSS 105 brake test mapping + the loaded
low-speed steering test procedure** (NOT more generic hydroboost).
Enforce: FMVSS 105 needs exact 49 CFR 571.105 locators and a brake
engineer / test plan before any compliance claim (partial-failure,
fade/recovery, water recovery, stability/control, parking brake, warning
lamp); a Dodge/Mopar EHPS example is LeadOnly until pressure/flow/
current/duty are proven; nothing Confirmed; **NEVER "PATS bypass/
override"**; **watch for the ZF "CAN control"/"commercial-duty" claims
recurring again** (already recurred once). Lane doctrine still applies
(modeling statuses, NeedsExactQuote, name the supplier data).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence.
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows (RC-19/20 truncated; RC-22..26 locator-pending)
  or fenced values (J1673 4×/6×; rejected supplier numbers; ZF current
  estimate RC-85; ZF "CAN control" claim RC-83; ZF "commercial-duty
  validated" claim RC-84).
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
