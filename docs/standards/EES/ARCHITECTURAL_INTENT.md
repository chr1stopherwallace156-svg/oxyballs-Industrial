# ARCHITECTURAL INTENT — EES (`ELEK-QUAL-STD-0000`)

Why the EES is shaped the way it is, and the trade-offs taken when landing it in the
repository.

## Intent of the standard

The EES exists to make ELEKTRON's engineering **legible and durable** as it scales
from prototypes to serial production. Its eight principles reduce to one idea:
*nothing is real until it is evidenced, single-sourced, and attributable.* Every later
section is a mechanism serving that idea — identifiers (§2) so things can be referred
to unambiguously, lifecycle states (§3) so status is never vague, traceability (§4) so
claims can be walked back to requirements, evidence types (§5) so gates cannot be
passed on assertion, the companion ecosystem (§6) so context is never lost, and
governance (§7) so change is controlled.

## Intent of the in-repo landing (this directory)

The correction that produced this directory is itself an application of the standard:

- **Principle 2 (One Source of Truth):** the standard now has exactly one canonical
  home — the Markdown master — instead of living as a hosted page with no history.
- **Principle 5 (Documentation is Part of the Product):** the standard ships with its
  full companion ecosystem, not as a lone file.
- **Principle 6 (Every Change Must Be Attributable):** it lands on a branch, through
  commits, referenced by a Decision Register entry.
- **Principle 1 (Evidence Before Assumption):** it is marked DRAFT, not Validated,
  because no approval evidence exists yet.

## Key trade-offs

1. **Placement under `docs/standards/` vs a new top-level tree.** The correction's
   sketch showed a standalone `elektron-enterprise-architecture/` repo root with
   top-level `schemas/` and `site/`. This repository is under a **structure freeze
   (D-016)**: new top-level/second-level directories require a Decision entry. Landing
   the EES under `docs/standards/EES/` adds a **single** new second-level directory
   (formalized as D-018) and co-locates `schemas/` and `generated/` inside the volume.
   This keeps freeze churn minimal, keeps the volume self-contained, and matches the
   deeper part of the sketched tree exactly. Promoting `schemas/`/`site/` to
   repository-wide top-level directories later remains a separate, deliberate decision.

2. **Preserve authored content vs. correct inconsistencies.** The authored document
   has an internal EASB/ERB naming inconsistency and declares itself "Validated." The
   chosen approach preserves the authored words (so the source of truth is what the
   owner wrote) and surfaces the issues through governance framing and
   `KNOWN_LIMITATIONS.md`, rather than silently editing doctrine — consistent with the
   repository rule *"update by proposal, never silently."*

3. **DRAFT vs BASELINE as the starting state.** DRAFT was chosen as the most honest
   floor: the content is complete but has had no in-repo review cycle. BASELINE (a
   reviewed working target) is a reasonable owner-elected promotion; VALIDATED is not,
   absent the §7.2 chain.

4. **Deriving the `ELEK-ID` format string.** §2.1 of the authored text names the
   registries but does not print the literal template. The template
   `ELEK-<DOM>-<SUB>-<SEQ>-v<VERSION>` is inferred from the issued examples and is
   explicitly flagged as derived, so a reader never mistakes inference for doctrine.

## Non-goals

- Not changing any engineering value, ODR, or Build Engine behavior.
- Not asserting any approval, certification, procurement, or safety claim.
- Not building enforcement tooling in this change (see `FUTURE_WORK.md`).
