# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 26 + review_23 — Gate 07 v0.1,
  Weight / Axle Load / CG); awaiting the next research batch (Gate 07B) or
  a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `ab5c16b` — Archive raw RH batch 26 + review_23 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-60/61;
  RC-99..102; section 34), `docs/DECISION_REGISTER.md` (**D-006** platform
  split), `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (Gate 07 BQ-13/BQ-14,
  real dates), `docs/research/RESEARCH_MAP.md` (Gate 07 v0.1 + sub-gates;
  "next" → Gate 07B), `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 07
  first-pass-done; 07A/07B/07C; 07B promoted to NEXT with verbatim
  prompt), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_26_gate07_weight_axle_cg.md`,
  `review_23_batch_26_verdict.md`, PROVENANCE committed separately as
  `ab5c16b`.)
- Summary: Gate 07 (Weight / Axle Load / CG) opened at **v0.1** — set up
  correctly around the right truth source. Truth hierarchy: certified
  scale data > VIN door-label GVWR/GAWR > marketing/dealer charts; GVWR /
  front GAWR / rear GAWR / tire / wheel are hard no-go boundaries
  (RC-99/102). **Big correction → D-006 platform split:** the Hunter used
  6.7L diesel + 10R140 data, but the donor is **7.3L gas** → Platform
  001A (gas, active) vs 001B (diesel); no diesel weight/CG in the gas
  model. Source downgrades applied verbatim (Scribd BBLB →
  NeedsOfficialFordCopy; RC Lacy dealer → FleetBackground; Work Truck/NTEA
  → ModelingFrameworkCandidate/AxleMomentMethod). Ledger dates made real
  (Jul 17/24/31); **factory engine CG demoted from supplier-only to
  NominalAssumption-allowed** (BQ-13). Gate 07 split into **07A** (door
  label + baseline scale), **07B** (removed/added mass ledger — next),
  **07C** (axle-moment calculator, simulation-only). **Nothing ingested;
  nothing Confirmed; no weight marked safe; no compliance claim; ODRs
  untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_26/review_23 archives are 1:1 against the
  owner's chat ("26:75"); the GVWR bands are held as a range not the
  donor door-label value; the axle-moment method is a framework not
  numbers; diesel data quarantined from the gas platform (D-006); nothing
  marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-14).
- Gate-state snapshot: 04B REGULATORY_TEST_SOURCE_FOUND/NEEDS_BRAKE_
  ENGINEER_MAPPING; 04C OEM_ELECTRICAL_RULE_SOURCE_FOUND/DC_DC_SIZING_
  OPEN; 05 STARTED/NEEDS_OFFICIAL_FORD_SUPER_DUTY_SOURCE; 06 OFFICIAL_
  FRAME_RULE_CANDIDATES_FOUND/NEEDS_PLATFORM_SPECIFIC_CONFIRMATION/NEEDS_
  STRUCTURAL_ENGINEER_REVIEW; 07 v0.1 (07A/07B/07C; 07B next).
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner;
  (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters; (12) supplier
  follow-up reminder; (13) official Ford BBLB copy (lifts
  NeedsOfficialFordCopy on RC-91/94/95/96/97/98/99/102); (14) brake
  engineer for FMVSS 105 (Gate 04B); (15) **confirm the donor is 7.3L
  gas** (Platform 001A) and, when available, provide the donor VIN +
  door-label + baseline scale ticket (Gate 07A).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 07B research batch** —
the Removed / Added Mass Ledger + scale-ticket procedure (verbatim prompt
in `docs/roadmaps/GATE_RESEARCH_QUEUE.md`). Reconcile with the hard rules:
**physical scale values override estimates; estimates are NominalAssumption
only; final validation requires certified front-axle, rear-axle, and total
scale tickets;** tag removed-component weights to Platform 001A (gas) per
D-006. (b) Gate 07A field data if the owner has the donor (VIN, door
label, baseline scale ticket) — resolves BQ toward closure. (c) A supplier
reply — archive 1:1 under `docs/research/raw/supplier_replies/`,
reconcile, move the matching BQ to the Resolution log. (d) The owner
approves/sends a letter — record Sent + date, start that BQ's 7/14/21-day
clock. Enforce throughout: nothing Confirmed; no compliance/"safe" claim;
NEVER "PATS bypass"; official Ford source beats Scribd; dealer pages +
vendor blogs are background only.

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF estimate RC-85; ZF "CAN control" RC-83; ZF "commercial-duty"
  RC-84; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc RC-92/93;
  BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99 as a donor value).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- Do not select final parts, claim compliance, mark any weight safe, or
  state the vehicle is safe during interim research.
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
- [ ] `docs/status/CURRENT_PHASE.md`, `docs/status/BLOCKERS.md`, and
      `docs/status/BLOCKED_QUESTIONS_LEDGER.md` read
