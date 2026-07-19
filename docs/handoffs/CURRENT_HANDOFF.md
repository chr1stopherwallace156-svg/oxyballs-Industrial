# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 34 + review_31 — Gate 08C sweep
  cleanup + Gate 05 signal candidates); awaiting the Gate 05A
  source-backed signal registry batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `49f6e59` — Archive raw RH batch 34 + review_31 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/status/DRAFT_VALIDATION_08C.md` (Simulation Response Category
  vocabulary + status), `docs/status/GATE05_CONTROLS.md` (corrected
  labels; J1939 PGN candidates; accel-pedal caution; transmit rule + VCU
  boundary), `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md`
  (RC-138..142; section 42 — no new CS),
  `docs/research/RESEARCH_MAP.md` ("next" → Gate 05A),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 08C SIMULATION_SWEEP_ACTIVE;
  Gate 05A → NEXT with verbatim prompt), `docs/CHANGELOG.md`, handoff
  files.
  (Raw archives `batch_34_gate08c_sweep_gate05_signals.md`,
  `review_31_batch_34_verdict.md`, PROVENANCE committed separately as
  `49f6e59`.)
- Summary: Gate 08C sweep format is now clean (owner: "much cleaner") and
  Gate 05's Ford signals are correctly held as candidates. **Gate 08C
  (RC-138/139):** "stable/unstable" → **Simulation Response Category
  (Model Accepts / Model Needs Review / Model Stress Failure / Supplier
  Data Required)**, each "No Gate Authority"; status
  SIMULATION_SWEEP_ACTIVE / PLACEHOLDER_VALUES_HAVE_NO_GATE_AUTHORITY /
  SUPPLIER_THRESHOLDS_REQUIRED. **Gate 05 (RC-140/141/142):** the Ford
  PGNs/byte-maps (61444/61443/65265/UIM ignition/CAN_1) are
  **J1939SignalCandidate / NeedsOfficialFordUIMSource / ListenOnlyCandidate
  / NoTransmitAuthority**; accel-pedal may only **inform** a VCU
  torque-demand model (never drive inverter torque directly); **transmit
  BLOCKED** until Ford/UIM docs allow the exact message/bus/address/use
  case; VCU reads authorized signals, commands only conversion-side;
  factory safety modules authoritative. **Nothing ingested; nothing
  Confirmed; no placeholder authority; no confirmed Ford signal; no
  transmit/bypass; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_34/review_31 archives are 1:1 against the
  owner's chat ("34:75"); the sweep vocabulary no longer implies
  approval; every Ford PGN/byte/rate is a candidate; nothing marked
  Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-26).
- Gate-state snapshot: 04B/04C/06 first pass; **05 STARTED (deep dive) —
  05A source-backed signal registry NEXT**; 07 v0.1 / 07B
  (`MASS_LEDGER.md`) / 07C v0.4 PARKED (`AXLE_CG_CALCULATOR.md`); 08
  FMEA_REGISTRY_CREATED (15 modes); 08B SOURCE_CANDIDATES_MAPPED PARKED;
  **08C SIMULATION_SWEEP_ACTIVE (`DRAFT_VALIDATION_08C.md`, no placeholder
  authority)**; 08C-final NOT started. Order after 05: 06 deep dive → 09 →
  10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md`, `DRAFT_VALIDATION_08C.md`, `GATE05_CONTROLS.md`.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner;
  (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters; (12) supplier
  reminder; (13) official Ford BBLB + IVM + FMVSS 305a/105 text + paid
  Gate 08B standards + **official Ford UIM / BBAS / J1939 docs + supplier
  BMS/inverter DBC files** (Gate 05/05A); (14) brake engineer for FMVSS
  105; (15) confirm donor is 7.3L gas (001A) + donor data; (16)
  inverter/BMS firmware timing + HV safety plan; (17) lead-systems-
  engineer firmware signoff (Gate 08C final, BQ-26).

## Next exact action

Expected next inputs, in any order: (a) the **Gate 05A source-backed
signal registry batch** (verbatim prompt in `GATE_RESEARCH_QUEUE.md`;
doctrine in `docs/status/GATE05_CONTROLS.md`) — per signal: name, source
document, bus/channel, protocol, PGN/ID, byte/bit, direction
[listen-only/receive/transmit], allowed/blocked use, verification status,
proof artifact. **All Ford PGN/byte/rate mappings stay
`J1939SignalCandidate / NeedsOfficialFordUIMSource` until an official
source proves them; transmit stays blocked; NEVER "PATS bypass" or
spoofing factory safety buses; accel-pedal never drives inverter torque
directly.** (b) A Gate 08C sweep continuation (more exploratory values /
HIL script templates) — Simulation Response Category only, no gate
authority. (c) Gate 08B reopen if official standard PDFs + supplier
thresholds arrive. (d) Gate 07A/07C field data if the owner has the
donor. (e) A supplier reply — archive 1:1, reconcile, move the matching
BQ to the Resolution log. (f) The owner approves/sends a letter — record
Sent + date, start that BQ's 7/14/21-day clock. Enforce throughout:
nothing Confirmed; no compliance/"safe" claim; NEVER "PATS bypass" or bus
spoofing; NEVER invent a threshold or grant a placeholder pass/block; no
Ford signal is confirmed until an official source proves it; keep diesel
data out of the 001A gas model (D-006).

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval; no standard quote is a rule until ExactQuoteVerified
  (RC-127); no Ford PGN/byte/rate is a rule until NeedsOfficialFordUIMSource
  is resolved (RC-140).
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight/CGv as a donor value; the 200 ms HVIL limit
  RC-116; draft driver-warning strings RC-121; Gate 08B standard "quotes";
  any Gate 08C placeholder value as a pass/block — RC-133; unverified
  Ford-side CAN IDs/rates/PGNs RC-137/140).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- **Gate 05: authorized/listen-only only — no anti-theft bypass, no
  fake/spoofed ABS/ESC messages, no transmit onto factory Ford safety
  buses without approval (RC-136/142); accel-pedal never drives inverter
  torque directly (RC-141).**
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
      `docs/status/AXLE_CG_CALCULATOR.md`, `docs/status/FMEA_REGISTRY.md`,
      `docs/status/DRAFT_VALIDATION_08C.md`, and
      `docs/status/GATE05_CONTROLS.md` read
