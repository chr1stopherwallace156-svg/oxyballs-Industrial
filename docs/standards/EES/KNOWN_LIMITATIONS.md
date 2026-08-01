# KNOWN LIMITATIONS — EES (`ELEK-QUAL-STD-0000`)

Honest gap analysis for the EES volume. Assumptions, unresolved questions, and pending
validation. Recording a limitation does not resolve it.

## 1. EASB vs ERB naming inconsistency (authored)

The masthead names the owner **ELEKTRON Enterprise Architecture & Standards Board
(EASB)**; §7.1/§7.2 name the governing body **Enterprise Architecture Review Board
(ERB)**. It is unclear whether these are the same body (a typo) or two distinct
bodies. Preserved as-authored; **owner must resolve** before VALIDATED promotion.

## 2. Not Validated — no approval evidence

The document is DRAFT. The §7.2 sign-off chain (Author → Director of Quality → ERB)
has not run and no validation evidence is attached. All `approvals` are `null`. The
authored "Validated Release (v1.0)" is a *target*, not an achieved state.

## 3. Self-referential bootstrap

The EES defines the approval process (§7.2) required to validate the EES itself.
Promoting it to v1.0 requires the owner to seat/act as the ERB and record the first
sign-off — a governance bootstrap that has not occurred.

## 4. `ELEK-ID` template is derived, not authored

The literal format `ELEK-<DOM>-<SUB>-<SEQ>-v<VERSION>` is inferred from the issued
examples (§2.1). If the intended template differs, §2.1 must be corrected. Flagged
in-line in the master.

## 5. Schemas are advisory, not enforced

`schemas/*.json` exist but no CI runs them. Metadata and OBJ-IDs could drift from the
schemas without a build failure until enforcement is added (see `FUTURE_WORK.md` /
`ROADMAP.md`).

## 6. Regex encodings are pragmatic, not exhaustive

`canonical-object-id.schema.json` encodes the OBJ-ID patterns from the §2.2 examples
(e.g. hex/decimal widths inferred from samples). Real-world IDs may reveal cases the
patterns do not yet cover; treat the schema as a first approximation to be tightened
against real data.

## 7. Presentation HTML can drift

`generated/…​.html` was hand-authored to match the master, not produced by a
deterministic generator. Until a generator exists, edits to the master require a
manual HTML refresh, and the two can silently diverge.

## 8. Scope boundary

This volume governs documentation discipline only. It makes **no** engineering,
approval, procurement, certification, or safety claim, and changes no Build Engine
value or Open Data Requirement.
