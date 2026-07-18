# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-16
- Reason for handoff: task complete (batch 31 + review_28 — Gate 08 FMEA
  registry, 15 modes); awaiting the Gate 08B batch or a supplier reply

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `f626e91` — Archive raw RH batch 31 + review_28 1:1
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed (reconciliation commit):
  `docs/status/FMEA_REGISTRY.md` (relabelled status; **15-mode registry
  populated**; owner's 6 corrections; stronger pass/block logic),
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (RC-120..126;
  RC-119 superseded; section 39 — no new CS),
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-21 Riso, BQ-22 hydraulic
  reserve), `docs/research/RESEARCH_MAP.md` ("next" → Gate 08B),
  `docs/roadmaps/GATE_RESEARCH_QUEUE.md` (Gate 08 FMEA_REGISTRY_CREATED;
  Gate 08B promoted to NEXT with verbatim prompt), `docs/CHANGELOG.md`,
  handoff files.
  (Raw archives `batch_31_gate08_fmea_registry.md`,
  `review_28_batch_31_verdict.md`, PROVENANCE committed separately as
  `f626e91`.)
- Summary: the full **Gate 08 FMEA registry** — all 15 failure modes
  populated with subsystem/trigger/hazard/detection/response/warning/
  staged-test/proof-artifact/pass-block/source/status/missing-data.
  Owner: "the best Gate 08 structure so far." **No recurrence** — the
  200 ms HVIL limit did not return (timing kept `NeedsExactTimingSource`);
  staged testing + LOTO/PPE held. Owner's 6 corrections applied: invented
  dashboard messages → `DriverWarningCandidate` (RC-121); isolation Riso
  100/500 Ω/V → `RegulatoryReferenceCandidate` context-split (RC-122);
  HVIL timing stays `NeedsExactTimingSource`; brake assist = **hydraulic,
  not pneumatic** (RC-123); regen-loss wording softened (no "seamless
  blend", RC-124); FMVSS 105 = **test-mapping lane** (RC-125). Status
  relabelled (RC-126): FMEA_REGISTRY_CREATED / TEST_SEQUENCE_MAPPED /
  SUPPLIER_DATA_REQUIRED / NO_LIVE_HV_TESTING_APPROVED /
  NO_TRACK_TESTING_APPROVED / NO_COMPLIANCE_CLAIMS. **Nothing ingested;
  nothing Confirmed; no compliance claim; no invented thresholds; no
  live-HV/track testing approved; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_31/review_28 archives are 1:1 against the
  owner's chat ("31:75"); every FMEA row is a candidate; all
  timing/threshold values NeedsExactSource; driver-warning strings are
  drafts; nothing marked Confirmed

## State

- Current phase: Revision 07 Source Ingestion and Consolidation
- Blockers: B-001 (ingestion); B-002 (.gov/CARB); B-003/B-004
  (BLOCKED_PENDING_SUPPLIER_DATA); Gate 04 BLOCKED_PENDING_SUPPLIER_
  RESPONSE. Supplier-only values parked in
  `docs/status/BLOCKED_QUESTIONS_LEDGER.md` (BQ-01..BQ-22).
- Gate-state snapshot: 04B/04C/05/06 first pass (batch_25); 07 v0.1; 07B
  v0.2 (`MASS_LEDGER.md`); 07C v0.4 PARKED (`AXLE_CG_CALCULATOR.md`); **08
  FMEA_REGISTRY_CREATED (`FMEA_REGISTRY.md`, 15 modes) — SUPPLIER_DATA_
  REQUIRED / NO_LIVE_HV / NO_TRACK / NO_COMPLIANCE.** Order: Gate 08B →
  05 deep dive → 06 deep dive → 09 → 10 → 11.
- Build artifacts: `MASS_LEDGER.md`, `AXLE_CG_CALCULATOR.md`,
  `FMEA_REGISTRY.md`.
- Open owner decisions (accumulated): (1) elektron-os-clean two-universe;
  (2) index.html; (3) L2 regulatory module; (4) L4 mechanical/structural
  module; (5) L6 battery/BMS/thermal module; (6) L9 lane name; (7)
  Artifact Intake Form; (8) M10 forbidden-phrase + regression scanner
  (recurring items: PATS, ZF-CAN, gas/diesel, compliance-label/naive-CGv);
  (9)(10)(11) approve/send Dana / ZF / Ford-Lee letters; (12) supplier
  reminder; (13) official Ford BBLB + IVM statement + **FMVSS 305a exact
  text** (Riso thresholds) + **FMVSS 105 text**; (14) brake engineer for
  FMVSS 105; (15) confirm donor is 7.3L gas (001A) + donor data; (16)
  inverter/BMS firmware timing + HV safety plan + LOTO/PPE before any HV
  testing.

## Next exact action

Expected next inputs, in any order: (a) the **Gate 08B batch** —
source-backed test-procedure mapping for each of the 15 FMEA modes
(verbatim prompt in `GATE_RESEARCH_QUEUE.md`; registry in
`docs/status/FMEA_REGISTRY.md`). Reconcile with the hard rules: **no live
HV tests; nothing Confirmed; no compliance claim; no invented timing
thresholds — every limit `NeedsExactSource`;** for each mode expect best
source + exact quote + test stage + equipment + proof artifact +
pass/block candidate + missing supplier data + verification status. After
08B → Gate 05 CAN/Controls deep dive. (b) Gate 07A/07C field data if the
owner has the donor. (c) A supplier reply — archive 1:1, reconcile, move
the matching BQ to the Resolution log. (d) The owner approves/sends a
letter — record Sent + date, start that BQ's 7/14/21-day clock. Enforce
throughout: nothing Confirmed; no compliance/"safe" claim; NEVER "PATS
bypass"; **NEVER invent a timing/threshold value**; keep diesel data out
of the 001A gas model (D-006); official Ford source beats Scribd.

## Forbidden actions

- Do not edit `index.html` without explicit owner instruction.
- Do not edit any file under `docs/research/raw/` — immutable evidence
  (incl. `owner_directives/`).
- Do not create rev07 modules 13/14/15 without owner approval.
- Do not ingest candidate rows into rev07; nothing gets marked
  Confirmed; no SourceClaims.md promotion before locator verification
  + owner approval.
- Do not use held rows or fenced values (RC-19/20; RC-22..26; J1673
  4×/6×; ZF RC-83/84/85; FMVSS 400 ft/150 lb RC-88; BenchForce/FS1Inc
  RC-92/93; BBLB-via-ODI-URL RC-91/94/96/97; GVWR bands RC-99; any
  NominalAssumption weight as a donor value; **the 200 ms HVIL limit
  RC-116** or any invented timing threshold; draft driver-warning strings
  RC-121).
- Do not mix 6.7L diesel weight/CG into the 7.3L gas model (D-006).
- Do not recommend or run live-HV fault testing; no track testing;
  staged testing only (RC-117) with LOTO/PPE/engineering signoff.
- Do not let the Build Engine claim compliance or mark anything safe;
  FMVSS 105 is a test-mapping lane, not a compliance verdict.
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
