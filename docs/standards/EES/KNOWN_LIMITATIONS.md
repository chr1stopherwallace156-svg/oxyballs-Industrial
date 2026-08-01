# KNOWN LIMITATIONS — EES (`ELEK-QUAL-STD-0000`)

Honest gap analysis for the EES volume. Assumptions, unresolved questions, and pending
validation. Recording a limitation does not resolve it.

## 1. EASB vs ERB naming inconsistency (authored) — RESOLVED (D-019, EES-ADR-0005)

*Historical:* the masthead named the owner **Enterprise Architecture & Standards Board
(EASB)** while §7 named the governing body **Enterprise Architecture Review Board
(ERB)**. *Resolution:* standardized exclusively on **EASB** across the canonical
master, metadata, and generated HTML. The verifier's EASB-consistency check now
enforces it. Historical records are preserved (repository D-018, EES-ADR-0004,
`LESSONS_LEARNED.md`).

## 2. Not Validated — no approval evidence (still open)

The document is a **CONTROLLED_BASELINE (v0.1.0, PENDING_VALIDATION)**, not VALIDATED.
The §7.2 sign-off chain (Author → Director of Quality → EASB) has not run and no
validation evidence is attached; all `approvals` are `null`. The authored "Validated
Release (v1.0)" remains a *target*, not an achieved state.

## 3. Self-referential bootstrap (still open)

The EES defines the approval process (§7.2) required to validate the EES itself.
Promoting it to VALIDATED v1.0 requires seating/acting as the EASB and recording the
first sign-off chain with evidence — a governance bootstrap that has not occurred. The
current CONTROLLED_BASELINE was promoted under the honest interim **Founder / Acting
Enterprise Architecture Authority** (D-019), which does not substitute for that chain.

## 4. `ELEK-ID` template is derived, not authored

The literal format `ELEK-<DOM>-<SUB>-<SEQ>-v<VERSION>` is inferred from the issued
examples (§2.1). If the intended template differs, §2.1 must be corrected. Flagged
in-line in the master.

## 5. Schema enforcement — ADDRESSED (D-019), with a caveat

`make standards-verify` (and CI) now validates `document-metadata.json` against its
schema and checks OBJ-ID formats on every run, so metadata/ID drift fails the gate.
*Caveat:* the validator in `scripts/verify_standards_checks.py` implements a **draft-07
subset** (type, required, additionalProperties, enum, pattern, items, oneOf, $ref,
format=date), not a full JSON-Schema engine. It covers the constructs these schemas
use; exotic keywords would be silently ignored.

## 6. Regex encodings are pragmatic, not exhaustive

`canonical-object-id.schema.json` encodes the OBJ-ID patterns from the §2.2 examples
(e.g. hex/decimal widths inferred from samples). Real-world IDs may reveal cases the
patterns do not yet cover; treat the schema as a first approximation to be tightened
against real data.

## 7. Presentation HTML drift — RESOLVED (D-019)

The HTML is now produced by the deterministic generator
`scripts/generate_standards_html.py` and byte-compared against a fresh regeneration in
check 11 of `make standards-verify`. A hand-edit to the HTML, or a master/metadata edit
committed without regenerating, fails the gate — so source and presentation cannot
silently diverge. The generator renders a bounded Markdown subset (the constructs the
master uses); adding new Markdown constructs to the master may require extending it.

## 8. Scope boundary

This volume governs documentation discipline only. It makes **no** engineering,
approval, procurement, certification, or safety claim, and changes no Build Engine
value or Open Data Requirement.
