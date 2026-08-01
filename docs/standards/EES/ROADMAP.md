# ROADMAP — EES (`ELEK-QUAL-STD-0000`)

Planned development for the EES volume. Nothing here is committed or approved; items
advance only by owner direction and (for VALIDATED promotion) the §7.2 chain.

## Near-term (unblocks VALIDATED)

- Owner resolves the **EASB vs ERB** naming question (`KNOWN_LIMITATIONS.md` #1).
- Owner elects the true starting state: keep **DRAFT** or promote to **BASELINE**
  (reviewed working target).
- Seat / designate the ERB and record the first §7.2 sign-off chain (Author →
  Director of Quality → ERB) in `document-metadata.json`.
- Attach the validation evidence artifact that backs the promotion, then promote to
  **VALIDATED v1.0** via an ECO / Decision entry.

## Medium-term (enforcement + tooling)

- CI check: validate `document-metadata.json` against
  `schemas/document-metadata.schema.json` on every push.
- CI check: validate any committed OBJ-IDs against
  `schemas/canonical-object-id.schema.json`.
- Deterministic HTML generator: regenerate `generated/…​.html` from the Markdown
  master so the presentation artifact can never drift from source.
- Lint: fail a build that marks a document VALIDATED with any `null` §7.2 approval.

## Long-term (scale to the full EEA)

- Stand up the remaining EEA volumes (II–VIII), each with its own 11-artifact
  companion ecosystem, all governed by this EES.
- A repository-wide document registry indexing every `ELEK-ID` and its lifecycle
  state.
- Evaluate promoting shared schemas to a repository-wide location once a second volume
  needs them (supersedes EES-ADR-0003 if taken).
