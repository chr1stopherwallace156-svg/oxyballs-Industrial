# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 32 + review_29 — Gate 08B
  source-backed test mapping, parked); awaiting the Gate 05 CAN/Controls
  deep-dive batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `6731d62` — Archive raw RH batch 32 + review_29 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/status/FMEA_REGISTRY.md` (new Gate 08B source-mapping section +
  status), `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`
  (RC-127..132; section 40 — no new CS),
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-23/24),
  `docs/research/RESEARCH_MAP.md` ("next" → Gate 05 deep dive),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 08B parked; Gate 05 → NEXT
  deep dive), `docs/CHANGELOG.md`, handoff files.
  (Raw archives `batch_32_gate08b_test_procedure_mapping.md`,
  `review_29_batch_32_verdict.md`, PROVENANCE committed separately as
  `6731d62`.)
- Summary: Gate 08B mapped all 15 FMEA modes to candidate standards, but
  the owner rejected the Hunter's "COMPLETED" — **the structure is right,
  source authority is the gap.** Big correction (RC-127): every standard
  "Exact Quote" is a **`Claim Summary / NeedsExactQuote /
  NeedsPageSectionTable`** until the official PDF + exact page/section is
  in hand. Wrong/weak source matches downgraded (RC-129): EHPS→ISO 5010
  (earth-moving); coolant→IEC 60529/ISO 16750-4 (environmental);
  regen→ISO 26262-4 (functional-safety framework, not a brake test);
  ABS/ESC→ECE R13-H (passenger-car, ContextCheckNeeded);
  steering→SAE J2672 (NeedsExactStandardVerification). FM-07 wording
  reworded (RC-130); water pressure-decay ≠ IP67/IP69K cert (RC-131).
  **Gate 08B = SOURCE_CANDIDATES_MAPPED / NOT_FINAL / NEEDS_EXACT_QUOTES /
  … ; Gate 08C = NOT STARTED; 08B parked, move to Gate 05 in parallel**
  (RC-132). **Nothing ingested; nothing Confirmed; no verified standard
  quote; no compliance claim; no live-HV/track testing; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_32/review_29 archives are 1:1 against the
  owner's chat ("32:75"); no standard quote is treated as verified (all
  NeedsExactQuote); no CS rows minted from the mapped standards; the
  Hunter's "COMPLETED" was rejected; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-24).
- Gate-state snapshot: 04B/04C/06 first pass; **05 NEXT (deep dive)**; 07
  v0.1 / 07B (`MASS_LEDGER.md`) / 07C v0.4 PARKED
  (`AXLE_CG_CALCULATOR.md`); 08 FMEA_REGISTRY_CREATED (15 modes,
  `FMEA_REGISTRY.md`); **08B SOURCE_CANDIDATES_MAPPED — PARKED**; 08C NOT
  STARTED. Order: 05 → 06 deep dive → 09 → 10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md` (FMEA + Gate 08B source map).
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner;
  (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters; (12) supplier
  reminder; (13) official Ford BBLB + IVM + FMVSS 305a/105 text + **the
  paid Gate 08B standards (SAE/ISO/UL) for ExactQuote verification**;
  (14) brake engineer for FMVSS 105; (15) confirm donor is 7.3L gas
  (001A) + donor data; (16) inverter/BMS firmware timing + HV safety plan
  + LOTO/PPE before any HV testing.

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05 CAN/Controls
deep-dive batch** (verbatim prompt in `GATE_RESEARCH_QUEUE.md`) — run in
parallel while Gate 08B is parked. Reconcile with: **authorized
Ford-compatible controls integration, immobilizer-safe architecture,
diagnostic/cluster serviceability; NEVER "PATS bypass/override"; forum
posts LeadOnly; Ford/OEM/service docs preferred; nothing Confirmed; no
OEM-compatibility claim.** (b) A Gate 08B reopen if official standard PDFs
+ supplier thresholds + an engineering test plan arrive (upgrade
NeedsExactQuote → ExactQuoteVerified). (c) Gate 07A/07C field data if the
owner has the donor. (d) A supplier reply — archive 1:1, reconcile, move
the matching BQ to the Resolution log. (e) The owner approves/sends a
letter — record Sent + date, start that BQ's 7/14/21-day clock. Enforce
throughout: nothing Confirmed; no compliance/"safe" claim; NEVER "PATS
bypass"; NEVER invent a timing/threshold value; no standard quote is
final until ExactQuoteVerified; keep diesel data out of the 001A gas
model (D-006).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval; **no standard quote is a rule until ExactQuoteVerified
  (RC-127)**.
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight as a donor value; the 200 ms HVIL limit RC-116;
  draft driver-warning strings RC-121; Gate 08B standard "quotes").
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- Do not recommend or run live-HV fault testing; no track testing;
  staged testing only (RC-117) with LOTO/PPE/engineering signoff.
- Do not let the Build Engine claim compliance or mark anything safe.
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
- [ ] `docs/status/CURRENT_PHASE.md`, `docs/status/BLOCKERS.md`,
      `docs/status/BLOCKED_QUESTIONS_LEDGER.md`, `docs/status/MASS_LEDGER.md`,
      `docs/status/AXLE_CG_CALCULATOR.md`, and `docs/status/FMEA_REGISTRY.md`
      read
