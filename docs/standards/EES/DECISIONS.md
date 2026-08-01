# DECISIONS — EES (`ELEK-QUAL-STD-0000`)

Architecture Decision Record (ADR) index for the EES volume, per EES §2.3. Volume-
scoped decisions are recorded here; repository-wide decisions live in
[`docs/DECISION_REGISTER.md`](../../DECISION_REGISTER.md) (this volume was introduced
by **D-018** there).

Entries are append-only and immutable; a decision is superseded, never edited.

---

## EES-ADR-0001 — Land the EES as version-controlled Markdown, HTML is derived

- **Status:** ACCEPTED
- **Date:** 2026-08-01
- **Context:** The EES existed only as an owner-pasted document and a hosted HTML
  artifact. A hosted page has no history, review, changelog, approvals, or handoff —
  it cannot be the authoritative source.
- **Options considered:**
  1. Keep the hosted HTML as the master. *(Rejected — violates Principles 2 and 6.)*
  2. Store only the Markdown, discard the HTML. *(Rejected — the HTML is a useful
     presentation layer.)*
  3. Markdown master in Git as canonical; HTML retained as a labeled, derived
     presentation artifact under `generated/`. **[CHOSEN]**
- **Decision:** Adopt option 3. The Markdown master is authoritative; the HTML is
  regenerated from it and marked non-authoritative.
- **Consequences:** The standard is now diffable, reviewable, and attributable. The
  HTML must be regenerated when the master changes (currently manual).

## EES-ADR-0002 — Record lifecycle state as DRAFT, not Validated

- **Status:** ACCEPTED
- **Date:** 2026-08-01
- **Context:** The authored document declares "Validated Release (v1.0)", but the
  EES's own §3.1/§7.2 reserve VALIDATED for evidenced, ERB-approved designs.
- **Options considered:**
  1. Honor the authored "Validated v1.0". *(Rejected — no evidence; violates
     Principle 1 and the repository rule against faking approval/pass.)*
  2. Mark DRAFT and preserve the authored text as the *target*. **[CHOSEN]**
- **Decision:** `lifecycle_state = DRAFT`, all §7.2 approvals `null`; authored text
  preserved with a governance banner explaining the distinction.
- **Consequences:** Promotion to VALIDATED requires the three §7.2 sign-offs plus
  attached evidence, recorded via a future decision/ECO.

## EES-ADR-0003 — Co-locate schemas and generated output inside the volume

- **Status:** ACCEPTED
- **Date:** 2026-08-01
- **Context:** The correction sketch showed top-level `schemas/` and `site/`. The
  repository is under structure freeze D-016.
- **Options considered:**
  1. Add top-level `schemas/` and `site/`. *(Deferred — two more freeze exceptions for
     marginal benefit now.)*
  2. Co-locate `schemas/` and `generated/` under `docs/standards/EES/`. **[CHOSEN]**
- **Decision:** Keep the volume self-contained; add only the single second-level
  directory `docs/standards/` (D-018).
- **Consequences:** Minimal freeze churn; a future decision may promote shared schemas
  to a repository-wide location if other volumes need them.

## EES-ADR-0004 — Preserve authored inconsistencies; surface, don't rewrite

- **Status:** ACCEPTED
- **Date:** 2026-08-01
- **Context:** The authored text names the owner **EASB** in the masthead and **ERB**
  in §7; it also states the registries without a literal `ELEK-ID` template.
- **Decision:** Preserve authored wording verbatim; record the EASB/ERB question in
  `KNOWN_LIMITATIONS.md` and `HANDOFF.md`; add the derived `ELEK-ID` template only with
  an explicit "derived from examples" flag.
- **Consequences:** Doctrine is never silently altered; owner resolves the naming
  question before VALIDATED promotion.

## EES-ADR-0005 — Standardize the governing body as EASB; promote to CONTROLLED_BASELINE

- **Status:** ACCEPTED (supersedes EES-ADR-0004's *deferral* of the naming question)
- **Date:** 2026-08-01
- **Context:** Phase 0 closure (repository decision D-019). The owner directed
  standardizing exclusively on **Enterprise Architecture & Standards Board (EASB)** and
  promoting the document to a controlled baseline with an honest interim authority.
- **Options considered:**
  1. Keep both names / keep deferring. *(Rejected — violates Principle 2; leaves a
     governance ambiguity in doctrine.)*
  2. Standardize on EASB; treat prior ERB usage as the same body; preserve history.
     **[CHOSEN]**
- **Decision:**
  - Replace `ERB` with `EASB` (`Enterprise Architecture & Standards Board`) in the
    canonical master, `document-metadata.json`, and the generated HTML. Rename the
    metadata approval key `final_approval_erb` → `final_approval_easb`.
  - Set `version 0.1.0`, `lifecycle_state CONTROLLED_BASELINE`,
    `validation_state PENDING_VALIDATION`; record the promoting authority as
    `Founder / Acting Enterprise Architecture Authority`.
  - Do **not** rewrite historical records (repository D-018 entry, EES-ADR-0004,
    `LESSONS_LEARNED.md`): they legitimately record the prior discrepancy.
- **Consequences:** The EASB/ERB ambiguity is resolved going forward; the verifier's
  EASB-consistency check enforces it on canonical/metadata/HTML. VALIDATED still
  requires the §7.2 chain + evidence. `KNOWN_LIMITATIONS.md` #1 is marked RESOLVED.
