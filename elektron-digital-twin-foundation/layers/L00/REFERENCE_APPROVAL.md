# REFERENCE_APPROVAL.md — L00 Owner Approval Record

Decision: DT‑D001 — Provisional L00 reference vehicle → LOCK

Proposed lock:\n
- 2019 Ford F‑450 Super Duty Regular Cab, DRW, 8 ft bed, 4x2, 6.7L diesel

Approval checklist (Layer 0 cannot be approved until ALL are satisfied):\n
- [ ] Reference vehicle locked (model year, cab, 4×2/4×4, wheelbase, body/upfit, engine config, wheel/tire package)\n
- [ ] Dimensions documented (DIMENSION_DATABASE.md) with source, confidence, and verification status for each entry\n
- [ ] Geometry acquisition strategy selected (GEOMETRY_OPTIONS.md) with rationale\n
- [ ] Licensing reviewed (LEGAL_LICENSES.md) and OEM BBAS terms acknowledged\n
- [ ] Unknowns documented (REFERENCE_SOURCES.md + DIMENSION_DATABASE.md) as UNVERIFIED/RESEARCH_REQUIRED — none silently assumed\n
- [ ] Exterior object hierarchy approved (EXTERIOR_OBJECT_HIERARCHY.md)\n
- [ ] Design philosophy and vision in place (DESIGN_PHILOSOPHY.md, VISION.md)\n
- [ ] STATUS.json updated; Documentation gate = pass; other gates as applicable\n

Approval fields:\n
- Approver: ___________________\n
- Date: ___________________\n
- Decision: approve / revise / reject\n
- Notes: ______________________________________________\n

On approval: flip `reference_vehicle.status` to `locked` in STATUS.json and advance to L01.\n

