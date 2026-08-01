# CHANGELOG — EES (`ELEK-QUAL-STD-0000`)

Change history for the ELEKTRON Enterprise Standards volume. Append-only; newest
first. System-impact classes noted per EES §6 (Hardware / Software / Safety / Docs).

---

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
