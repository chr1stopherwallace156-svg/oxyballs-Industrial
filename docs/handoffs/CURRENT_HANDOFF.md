# CURRENT HANDOFF

## Session

- From agent: Claude Code
- Date (UTC): 2026-07-15
- Reason for handoff: task complete (batch 12 + review_07 reconciled);
  awaiting owner decisions and/or next batch

## Git state

- Branch: `claude/docs-structure-large-projects-b6vxx5`
- **Agent owner: Claude Code** (single-writer rule, AGENTS.md)
- Start commit: `b429163` — Reconcile RH batch 11 + owner review_06
- End commit: the commit containing this handoff update — verify with
  `git log -1`
- Working tree at handoff: clean (everything committed)

## Work performed

- Files changed:
  `docs/research/raw/research_hunter/batch_12_hv_wiring_datasheets.md`
  and `docs/research/raw/owner_reviews/review_07_batch_12_verdict.md`
  (new, verbatim — committed separately as `3678ebd`),
  `docs/research/raw/research_hunter/PROVENANCE.md`,
  `docs/research/candidates/RH01_SECOND_STAGE_FILTER.md` (CS-26..29;
  RC-46..49; section 19), `docs/research/RESEARCH_MAP.md` (L5 narrow
  6-item remaining ask), `docs/CHANGELOG.md`, handoff files
- Summary: batch 12 + review_07 reconciled. New: Eaton EV fuse
  catalogue — the real **main-fuse family lane** (no size selected
  until battery/fault data exists); EV200 make/break duty → pre-charge
  **NO-GO candidate** (650 A max make; 80–90% completion before close;
  owner correction applied: curves set the completion target, they do
  NOT size the resistor — sizing stays OpenGap); Coroflex 35 mm²
  datasheet (part-scoped); **UNECE GTR 20 — first official-server
  standard PDF** (≤0.1 Ω bonding Test+Metric candidates, p.60);
  ISO 20653 path opened. Held: unsourced matrix cells (50 mm² bend
  radius — cross-gauge transfer forbidden; Amphenol connector — no
  datasheet; pre-charge relay — conflated cell). **New standing flag:
  GTR ≤0.1 Ω bonding vs FMVSS <0.2 Ω exposed-part figures are
  context-distinct — never merge.** **Nothing ingested; nothing
  Confirmed; ODRs untouched.**

## Verification

- Tests run: none — no test suite exists in this repository
- Test results: n/a
- Verified vs claimed: batch_12/review_07 archives are 1:1 against the
  owner's chat message ("12:75"); all quotes Hunter-supplied and
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
