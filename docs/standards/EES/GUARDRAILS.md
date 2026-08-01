# GUARDRAILS — EES (`ELEK-QUAL-STD-0000`)

Non-negotiable negative constraints protecting the integrity of this volume, per EES
§6.1. "Never do these things."

## Master Enterprise Guardrails (from EES §6.1, apply across all volumes)

- **NEVER** delete raw evidence files (`EVI-*`) or overwrite historical test logs.
- **NEVER** reuse a Battery Passport ID (`BATT-*`) or Vehicle ID (`VEH-*`).
- **NEVER** modify a VALIDATED v1.0 document, BOM, or code module without executing a
  formal Engineering Change Order (ECO).
- **NEVER** commit hardcoded values, calibration parameters, or connection
  credentials directly into source repositories; all configuration must use
  declarative manifests (`.yaml`/`.json`).
- **NEVER** bypass high-voltage safety isolation checks (`EVI-LAB`) prior to pack
  energization.
- **NEVER** treat BASELINE v0.1 cost, weight, or range figures as committed
  production values.

## Volume-specific guardrails (EES governance)

- **NEVER** treat the hosted or `generated/` HTML as the canonical source. The
  Markdown master is authoritative; the HTML is derived.
- **NEVER** mark this standard `VALIDATED` (or set `document_version` to a `1.x.x`
  release line) unless all three §7.2 approvals are recorded in
  `document-metadata.json` **and** validation evidence is attached. Absent evidence, a
  "Validated" label is a prohibited fabricated approval.
- **NEVER** edit the authored doctrine text to resolve an ambiguity (e.g. EASB vs
  ERB) silently — surface it in `KNOWN_LIMITATIONS.md` and change only by proposal.
- **NEVER** add, rename, or move a repository directory to house EES content without a
  Decision Register entry and paired `STRUCTURE_FREEZE.md` + `README.md` updates
  (structure freeze D-016).
- **NEVER** duplicate the standard's content into a second file or store — one source
  of truth (Principle 2). Reference `ELEK-QUAL-STD-0000.md`; do not copy from it.
- **NEVER** invent an engineering value, supplier figure, or approval to "complete" a
  section. Unknown → leave unstated / null and record it.
