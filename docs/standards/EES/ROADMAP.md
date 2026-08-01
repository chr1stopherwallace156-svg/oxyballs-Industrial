# ROADMAP — EES (`ELEK-QUAL-STD-0000`)

Planned development for the EES volume. Nothing here is committed or approved; items
advance only by owner direction and (for VALIDATED promotion) the §7.2 chain.

## Done in Phase 0 (D-019)

- ~~EASB vs ERB naming~~ — **resolved**; standardized on EASB (EES-ADR-0005).
- ~~Elect starting state~~ — promoted to **CONTROLLED_BASELINE / v0.1.0**.
- ~~Schema/OBJ-ID/HTML enforcement in CI~~ — **`make standards-verify`** (12 checks) +
  `.github/workflows/lint-standards.yml`.
- ~~Deterministic HTML generator~~ — `scripts/generate_standards_html.py`; byte-compared
  in verifier check 11.
- ~~Fail VALIDATED with any `null` approval~~ — enforced by verifier check 5.

## Near-term (unblocks VALIDATED)

- Seat / designate the EASB and record the first §7.2 sign-off chain (Author →
  Director of Quality → EASB) in `document-metadata.json`.
- Attach the validation evidence artifact that backs the promotion, then promote to
  **VALIDATED v1.0** via an ECO / Decision entry (the verifier enforces the honesty
  rule until then).

## Medium-term (hardening)

- Tighten `canonical-object-id.schema.json` patterns against real issued IDs
  (`KNOWN_LIMITATIONS.md` #6).
- Extend the generator/validator only as the master gains new Markdown constructs or
  the schema gains new keywords (`KNOWN_LIMITATIONS.md` #5, #7).

## Long-term (scale to the full EEA)

- Stand up the remaining EEA volumes (II–VIII), each with its own 11-artifact
  companion ecosystem, all governed by this EES.
- A repository-wide document registry indexing every `ELEK-ID` and its lifecycle
  state.
- Evaluate promoting shared schemas to a repository-wide location once a second volume
  needs them (supersedes EES-ADR-0003 if taken).
