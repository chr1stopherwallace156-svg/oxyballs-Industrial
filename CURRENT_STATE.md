# CURRENT STATE

**Honest truth ledger.** No fluff, no future promises — runtime and documentation reality tied to a specific `main` tip.

```text
source_main_baseline_sha     = 1213526724b926fed6663b2f0e7b7c096faa64c4
state_change_pr              = 57
state_change_status          = PROPOSED_IN_DRAFT_PR
updated_at                   = 2026-08-03T12:55:00Z
maintained_by                = Industrial Phase 3 maintainers
update_trigger               = DRAFT_PR_EVIDENCE_PROPOSED
```

## Dual status planes (Phase 3)

```text
IMPLEMENTATION_STATE           = SOURCE_IMPLEMENTED (Sprint 3.2 proposed)
VALIDATION_STATE               = LINUX_FIXTURE_VALIDATED
MAC_COMPILATION                = PENDING
PHYSICAL_DEVICE_RUNTIME        = PENDING
PRODUCTION_VALIDATION_CLAIM    = FORBIDDEN
```

Sprint 3.1 merged as `SOURCE_FOUNDATION_MERGED` / `APPLE_RUNTIME_UNVALIDATED` (`1213526`, PR #56).

See `Docs/Architecture/PHASE_3_VALIDATION_BACKLOG.md`.

## Reality check (split readiness)

```text
MANUAL_STAGE_1_EVIDENCE_PILOT              = AUTHORIZED
CAPTURE_APP_VALIDATED_STAGE_1_EXECUTION    = PENDING_SPRINT_3_6_APPLE_VALIDATION
READY_FOR_COMPLETE_DIGITAL_TWIN            = NO
```

### Pilot identities (do not collapse)

```text
vehicle_id             = VEH-000001
pilot_id               = PILOT-000001
pilot_classification   = VEHICLE_REFERENCE_PILOT
current_stage          = STAGE_1_EVIDENCE_ONLY
```

## Subsystem ledger

| Subsystem | Current reality | Blockers / notes |
|---|---|---|
| **Capture iOS** | Sprint 3.1 RGB/motion fixture foundation merged. Sprint 3.2 pose/clocks/frames + domain refinements proposed (draft PR #57; fixture SPKG-FIXTURE-CAMERA-POSE-000001). | ARKit = `APPLE_POSE_SOURCE_CANDIDATE_UNCOMPILED` until Sprint 3.6. No LiDAR/Phase 4. |

Capture delivery via versioned `DOWNLOAD-elektron-capture-ios-*.zip` (+ `.sha256`).
