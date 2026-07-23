# REFERENCE_APPROVAL.md — L00 Owner Approval Record

**Reconciliation result:** `REFERENCE_CONFIGURATION_BLOCKED`  
**Decision:** DT-D001 **BLOCKED** — see [CONFIGURATION_RECONCILIATION.md](CONFIGURATION_RECONCILIATION.md)

## Proposed lock under review (NOT APPROVED — do not use)

2019 Ford F-450 Super Duty Regular Cab, DRW, 8 ft bed, 4×2, 6.7L diesel

**Finding:** This description mixes pickup framing with unresolved platform type. Not approved.

---

## Approval checklist

Layer 0 cannot be approved until **all** are satisfied:

- [ ] **Configuration reconciliation resolved** — owner selects Candidate C1, P1, or P2
- [ ] **Platform type explicitly locked** — chassis cab vs pickup stated
- [ ] Reference vehicle locked (model year, cab, 4×2/4×4, wheelbase/CA, body/upfit, engine, wheel/tire)
- [ ] Dimensions documented in DIMENSION_DATABASE.md with per-row source, confidence, verification status
- [ ] Geometry acquisition strategy selected (GEOMETRY_OPTIONS.md)
- [ ] Licensing documented (LEGAL_LICENSES.md) — COUNSEL_REVIEW_REQUIRED acceptable; APPROVED only after counsel
- [ ] Unknowns documented — no silent assumptions
- [ ] Exterior hierarchy approved for **locked** configuration
- [ ] DESIGN_PHILOSOPHY.md and VISION.md in place
- [ ] STATUS.json updated; L00 gates pass

---

## Approval fields

| Field | Value |
|-------|-------|
| Approver | _pending_ |
| Date | _pending_ |
| Decision | approve / revise / reject |
| Selected candidate | C1 / P1 / P2 / other |
| Notes | _pending_ |

On approval: set `reference_vehicle.status` to `locked` in STATUS.json. Do not advance to L01 until checklist complete.
