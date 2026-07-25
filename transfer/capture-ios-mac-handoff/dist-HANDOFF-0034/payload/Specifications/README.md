# Specifications — Elektron Capture v2+

**Not** compiled by SPM. No production v2 actor/camera code until baseline sign-off + IR-0001 measured results + implementation directive.

## Gate status

| Gate | State |
|---|---|
| `V2_CORE_SPECS_1_TO_3_HARDENED` | Done |
| `V2_SPECIFICATIONS_4_TO_6_DRAFTED` | Done |
| `CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS` | Done |
| `CORRECTION_PASS_APPLIED` | Done |
| Cross-spec entity/state registry | `V2_CROSS_SPEC_ENTITY_STATE_REGISTRY.md` |
| `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW` | **Current** |
| `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` | **Not yet** (future `CHANGE-0003`) |
| `AUTHORIZED_FOR_IR_0001_EXECUTION` | **Not yet** |
| Phase 1 freeze `v1.0.0-phase1c` | Separate — freeze-prep branch |

## Documents

1. `ELEKTRON_CAPTURE_V2_SPEC.md` — EC-V2-SPEC-001  
2. `CAPTURE_V2_DOMAIN_MODEL.md` — EC-V2-SPEC-002  
3. `CAPTURE_SENSOR_FRAMEWORK.md` — EC-V2-SPEC-003  
4. `CAPTURE_DEVICE_CAPABILITY_MATRIX.md` — EC-V2-SPEC-004 — `DRAFT_FOR_BASELINE_REVIEW`  
5. `CAPTURE_TELEMETRY_CONTRACT.md` — EC-V2-SPEC-005 — `DRAFT_FOR_BASELINE_REVIEW`  
6. `CAPTURE_QUALITY_POLICY.md` — EC-V2-SPEC-006 — `DRAFT_FOR_BASELINE_REVIEW`  
7–10. Spatial / external / IR template — pending or template-only  

## Branch role

This tip is **Commit B+ staging** on `cursor/phase1c-evidence-library-handoff-d881`.  
Spike authorization: `IR_0001_EXECUTION_NOT_YET_AUTHORIZED`.  
Freeze tag must use `cursor/phase1c-freeze-commit-a-d881` (Phase 1 only).
