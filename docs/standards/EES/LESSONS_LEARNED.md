# LESSONS LEARNED — EES (`ELEK-QUAL-STD-0000`)

Empirical findings from establishing this volume. Updated after milestones.

## From the initial landing (2026-08-01)

- **A hosted artifact is not a source of truth.** The EES first appeared as a polished
  hosted HTML page. It looked finished but had no history, review, approvals, or
  handoff — the exact gaps the EES itself forbids (Principles 2 and 6). Lesson:
  presentation and canonical source are different roles; publish *from* the repo, don't
  govern *in* the publication.

- **"Validated" is a claim that needs evidence.** The authored text declared itself
  Validated v1.0. Accepting that at face value would have fabricated an approval. The
  EES's own §3.1/§7.2 gave the exact, self-consistent reason to hold it at DRAFT.
  Lesson: when a document asserts its own status, check that status against the
  document's own rules before recording it.

- **Preserve, then surface — don't silently fix.** The EASB/ERB inconsistency was
  tempting to "correct." Preserving the authored words and surfacing the question kept
  the owner as the source of doctrine and avoided an untracked change. Lesson: for
  doctrine, ambiguity is a ticket, not an edit.

- **A structure freeze is a feature, not friction.** D-016 forced the new directory
  through a decision + paired README/freeze update. That is exactly the attributable,
  reviewable change the EES wants. Lesson: existing governance already models the
  behavior new governance documents preach — reuse it (Principle 8).

- **Derive explicitly.** The `ELEK-ID` template wasn't printed in the source; it was
  inferred. Labeling it "derived" prevents a future reader from treating inference as
  doctrine. Lesson: mark the seam between authored and inferred content.

## From Phase 0 closure (2026-08-01, D-019)

- **Separate the axes of "done".** Collapsing structural completeness and empirical
  validation into one label (DRAFT vs "Validated v1.0") forced a false choice. Distinct
  fields — `version` / `lifecycle_state` / `validation_state` — let the status be
  honest: complete *and* unvalidated. Lesson: give independent facts independent fields.

- **A derived artifact is only trustworthy if it's reproducible.** Hand-keeping the HTML
  made "is this current?" unanswerable. A deterministic generator + a byte-compare in CI
  turns "derived" from a claim into a checkable property. Lesson: prove derivation,
  don't assert it.

- **Keep the check where the developer is.** Putting all rules in `make standards-verify`
  and having CI call only that means a contributor sees exactly what CI sees, before
  pushing. Lesson: CI should invoke the local gate, not reimplement it.

- **Resolve by decision, preserve by default.** The EASB/ERB fix changed doctrine going
  forward (D-019) while leaving the historical record intact. Lesson: a resolution and
  an erasure are not the same thing.
