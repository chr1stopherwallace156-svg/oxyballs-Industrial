# M11 — OPEN DATA REGISTER

**Status:** Deferred — do not implement until M10 is complete and its
completion is recorded in the [Changelog](../CHANGELOG.md).
**Governed by:** [Engineering Constitution](../ENGINEERING_CONSTITUTION.md)

---

## Intent

Turn the OpenDataRequirement discipline (Constitution, Article VII)
from a documentation practice into a first-class system feature: unknown
engineering data is captured as a structured register entry that blocks
dependent validation until real evidence resolves it.

## Scope (to be detailed when M11 becomes current)

- Structured OpenDataRequirement records persisted in the M10 database
  layer.
- Blocking semantics: validations that depend on an open requirement
  cannot pass.
- Resolution flow: a requirement is resolved only by recorded evidence,
  and resolution is itself evidence (immutable, versioned).
- Migration of existing entries from
  [`research/OpenResearchRegister.md`](../research/OpenResearchRegister.md).

## Dependencies

- M10 — Database Implementation (all completion criteria met).

This roadmap is intentionally thin. It is detailed and approved when M10
completes; detailing it earlier invites building ahead of the baseline.
