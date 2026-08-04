# CURRENT STATE

**Honest truth ledger.** No fluff, no future promises — runtime and documentation reality tied to a specific `main` tip.

```text
source_main_baseline_sha     = 2796e7d14c29f9701aeba441c51f018c35fbd936
state_change_pr              = Sprint 3.7 identity/recovery/resilience (this PR)
state_change_status          = PROPOSED_IN_DRAFT_PR
updated_at                   = 2026-08-04T01:04:00Z
maintained_by                = Industrial Phase 3 maintainers
update_trigger               = DRAFT_PR_EVIDENCE_PROPOSED
```

## Dual status planes (Phase 3)

```text
IMPLEMENTATION_STATE           = SOURCE_IMPLEMENTED (Sprint 3.7 identity/journal/resilience)
VALIDATION_STATE               = LINUX_FIXTURE_VALIDATED
MAC_COMPILATION                = PENDING (Sprint 3.6B)
PHYSICAL_DEVICE_RUNTIME        = PENDING (Sprint 3.6B)
APPLE_SECURITY_STATE           = SOURCE_CANDIDATES_UNVALIDATED
PRODUCTION_VALIDATION_CLAIM    = FORBIDDEN
SECURITY_CLAIM                 = NO_HARDWARE_ATTESTATION_CLAIM_UNTIL_PHYSICAL_EXECUTION
```

Sprint 3.6A merged as Validation Readiness Complete (`2796e7d14c29f9701aeba441c51f018c35fbd936` / PR #61).  
Sprint 3.6B physical Apple hardware execution remains pending Mac/iPhone.

See `Docs/Architecture/PHASE_3_VALIDATION_BACKLOG.md`.

## Subsystem ledger

| Subsystem | Current reality | Blockers / notes |
|---|---|---|
| **Capture iOS** | Sprint 3.7 source foundation proposed: signatures, enrollment, App Attest envelopes, journal recovery, thermal policy, telemetry. Fixtures `SPKG-FIXTURE-JOURNALED-*` / `SPKG-FIXTURE-RESILIENT-*`. | No hardware attestation claim. Sprint 3.6B still required for `SPKG-DEVICE-000001`. No Phase 4. |
