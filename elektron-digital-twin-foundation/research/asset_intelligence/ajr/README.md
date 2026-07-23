# Acquisition Justification Report (AJR)

**Schema:** `schemas/acquisition-justification-report.schema.json`  
**Register:** `AJR_REGISTER.json`  
**Decision:** DT-D043

## Gate

```text
[Discovered AID]
      │
Does it add new engineering data? ──NO──► REJECT_AS_CANDIDATE
      │ YES / UNKNOWN→research
Duplication check ──DUPLICATE──► REJECT_AS_CANDIDATE
      │ UNIQUE
Resolves priority gaps? ──NO──► HOLD_IN_CANDIDATE_QUEUE
      │ YES
[purchase_clearance=CLEARED] → acquire → EAE ingest
```

Missing listing URL ⇒ **BLOCKED** / `NOT_CLEARED` (Hard Rule 6).
