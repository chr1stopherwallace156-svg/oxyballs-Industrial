# DESIGN_PHILOSOPHY.md — EDTS Principles

Purpose: define non-negotiable principles that guide every decision in the Elektron Digital Twin System (EDTS).

Principle 1 — Reality before appearance
- A visually impressive model that is dimensionally wrong is unacceptable.
- Verified dimensions outrank aesthetic fidelity.

Principle 2 — Evidence before automation
- The system must distinguish VERIFIED knowledge from ASSUMPTION.
- Unknowns are documented as RESEARCH_REQUIRED; nothing is silently filled.

Principle 3 — Layers before complexity
- No feature may be added until its foundation layer is complete and has passed all gates.

Principle 4 — 3D is an interface, not the source of truth
- The model visualizes truth held in sources (OEM tables, scans, measured data, decisions).
- Data lineage is preserved; meshes reference provenance.

Principle 5 — Every object has an identity
- Nothing is “just a mesh.” Each object becomes a component, a procedure target, a service item, a diagnostic location, or a historical record.
- Stable identifiers are assigned and managed per DATA_MODEL.

Principle 6 — Reversibility and auditability
- Decisions are append-only with explicit supersession.
- Gate results, provenance, and approvals are reviewable at any time.

Principle 7 — Licensing compliance
- OEM CAD is used internally per license; public artifacts are derived and reviewed.

