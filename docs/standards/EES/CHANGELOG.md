# CHANGELOG — EES (`ELEK-QUAL-STD-0000`)

Change history for the ELEKTRON Enterprise Standards volume. Append-only; newest
first. System-impact classes noted per EES §6 (Hardware / Software / Safety / Docs).

---

## 2026-08-01 — Phase 0 closure: CONTROLLED_BASELINE + verifiable derivation (D-019) · Docs

**What changed.** Closed Phase 0. Promoted the repository status from DRAFT to a
change-controlled baseline, resolved the governing-body naming, and made the derived
HTML provably reproducible under a local-first verification gate.

**Why it changed.** DRAFT understated the work's structural completeness while
"Validated v1.0" would overstate it; a distinct CONTROLLED_BASELINE / PENDING_VALIDATION
vocabulary separates the two honestly. The HTML needed to be a *provable* derivation,
not a hand-kept copy that can silently drift.

**Changes.**
- **Lifecycle**: distinct metadata fields `version 0.1.0`,
  `lifecycle_state CONTROLLED_BASELINE`, `validation_state PENDING_VALIDATION`;
  authority recorded as `Founder / Acting Enterprise Architecture Authority`
  (`baseline_promotion`). §7.2 approvals remain `null`; still not VALIDATED.
- **Terminology**: `ERB` → **EASB (Enterprise Architecture & Standards Board)** in the
  canonical master, metadata, and generated HTML (EES-ADR-0005 supersedes -0004).
  Historical mentions in this changelog's prior entry, the immutable ADRs, and
  `LESSONS_LEARNED.md` are preserved.
- **Generator**: added `scripts/generate_standards_html.py`; the generated file is
  renamed `generated/ELEK-QUAL-STD-0000.html` and now carries canonical path, doc
  ID/version, source commit SHA, and a "DERIVED — DO NOT EDIT" notice.
- **Verifier**: added `scripts/verify_standards.sh` (+ `verify_standards_checks.py`),
  the `make standards-verify` command, and `.github/workflows/lint-standards.yml`.
- **Schema**: added `version`, `authority`, `baseline_promotion`; enum extended with
  `CONTROLLED_BASELINE` / `PENDING_VALIDATION`; `final_approval_erb` → `final_approval_easb`.
- **Metadata schema fields** now enforce that a `0.x` version cannot be VALIDATED and
  VALIDATED requires all §7.2 approvals.

**Result.** `make standards-verify` = 12/12 PASS →
`PHASE_0_EES_CONTROLLED_BASELINE_COMPLETE`.

**What remains incomplete.** §7.2 approvals + validation evidence (for any future
VALIDATED promotion). Volume I not begun.

## 2026-08-01 — Initial in-repo canonical source (DRAFT) · Docs

**What changed.** The EES was established as version-controlled canonical source
inside the repository. Prior to this it existed only as an owner-pasted document and a
hosted HTML presentation artifact — neither of which is an authoritative, diffable,
reviewable source.

**Why it changed.** A hosted HTML page is a presentation layer, not a governed source:
it has no branch history, no pull-request review, no changelog, no approvals, and no
handoff trail. The canonical source must live in Git so that changes are attributable
and reviewable (Principle 6) and the standard has a single home (Principle 2).

**Files added.**
- `ELEK-QUAL-STD-0000.md` — master standard (faithful Markdown of the authored
  content; Sections 1–8 + executive summary + glossary), with a repository-governance
  banner.
- `document-metadata.json` — machine-readable governance metadata.
- `schemas/document-metadata.schema.json`, `schemas/canonical-object-id.schema.json`.
- The 11-artifact companion ecosystem (`README`, `ARCHITECTURAL_INTENT`, this
  `CHANGELOG`, `DECISIONS`, `GUARDRAILS`, `HANDOFF`, `ROADMAP`, `FUTURE_WORK`,
  `KNOWN_LIMITATIONS`, `TRACEABILITY`, `LESSONS_LEARNED`).
- `generated/ELEK-QUAL-STD-0000.v1.0.html` — the presentation artifact, re-labeled as
  derived/non-authoritative, plus `generated/README.md`.

**Governance.**
- New second-level directory `docs/standards/` admitted to the frozen structure via
  Decision **D-018** (paired `STRUCTURE_FREEZE.md` + `README.md` updates).
- Lifecycle state set to **DRAFT**, not "Validated v1.0": the §7.2 approval chain has
  not run in-repo and no validation evidence is attached. The authored "Validated
  Release (v1.0)" text is preserved as the document's *target* status only.

**What remains incomplete.** §7.2 approvals (Author → Director of Quality → ERB);
attachment of validation evidence; any automated schema-validation CI. See
`KNOWN_LIMITATIONS.md` and `HANDOFF.md`.

**Content changes to the standard itself.** None — the authored text is preserved
verbatim in meaning. The only additions are governance framing (status banner,
derived-format labels) and the explicit `ELEK-ID` format string, which is *derived*
from the authored examples and flagged as such in §2.1.
