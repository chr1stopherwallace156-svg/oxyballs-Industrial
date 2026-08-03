# APPROVAL_GATES.md

Owner approval records for gate transitions that require sign-off.

## Required approvals

| Gate | Trigger | Status |
|------|---------|--------|
| L00 Reference Lock | DT-D001 provisional → locked | **Pending** |
| Reference change | Any superseding DT-D decision | — |
| Public demo (L10) | External deployment of twin | — |

---

## Pending: L00 Reference Lock (DT-D001)

**Proposed lock:** 2019 Ford F-450 Super Duty Regular Cab, 8 ft DRW, 4x2, 6.7L diesel  
**Document:** [layers/L00_REFERENCE_LOCK.md](layers/L00_REFERENCE_LOCK.md)  
**Requested:** 2026-07-16

| Field | Value |
|-------|-------|
| Approver | _pending_ |
| Date | _pending_ |
| Decision | approve / revise / reject |
| Notes | _pending_ |

Use [templates/APPROVAL_RECORD.md](templates/APPROVAL_RECORD.md) when recording.

---

## Approval history

_None yet._

---

## Related doctrine (not an owner approval yet)

### HV commissioning chain (DT-D052)

**Package:** [`build_engine/gates/hv_commissioning/`](build_engine/gates/hv_commissioning/)

| Gate | Doctrine status | Live execution |
|------|-----------------|----------------|
| 05L-B | Wording cleaned | **Not authorized** — needs LIVE_HV_TEST_PLAN_APPROVAL |
| 05L-C | Cleaned & defined | **Not authorized** — must complete before any 05M |
| 05M-A | Draft (torque-disabled readiness) | **Not authorized** — after 05L-C only |
| 05M-B / 05M-C | Staged outlines | **Blocked** until prior gate exit |

Owner sign-off for live HV remains separate from doctrine acceptance (DT-D052).
