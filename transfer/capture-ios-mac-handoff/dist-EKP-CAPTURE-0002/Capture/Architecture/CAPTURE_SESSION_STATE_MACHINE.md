# CAPTURE_SESSION_STATE_MACHINE.md

| Field | Value |
|---|---|
| Status | **DRAFT** |
| Version | 1.0.0 |
| Owner | elektron-capture-ios |
| Last Updated | 2026-07-23 |
| Applies To | CaptureSession lifecycle |
| Supersedes | (none) |

## States

`CREATED` → `DEVICE_CHECK` → `VEHICLE_IDENTITY_PENDING` → `VEHICLE_IDENTITY_CONFIRMED` → `CALIBRATION_CHECK` → `CAPTURE_PLAN_READY` → `CAPTURING` ↔ `PAUSED` → `QUALITY_REVIEW` → `TECHNICIAN_REVIEW` → `READY_FOR_SEALING` → `SEALED` → `UPLOAD_PENDING` → `UPLOADING` → `UPLOADED` → `SERVER_VERIFIED`

Terminal / exception: `REJECTED` · `RECOVERY_REQUIRED` · `CANCELLED`

## Rules

- Transitions are explicit and logged (actor, reason, timestamp, software version).
- UI must not privately infer state from scattered Booleans.
- `SEALED` sessions are immutable; corrections require `SessionAmendment`.
- Implementation: `App/Domain/Models/CaptureSessionState.swift`.
