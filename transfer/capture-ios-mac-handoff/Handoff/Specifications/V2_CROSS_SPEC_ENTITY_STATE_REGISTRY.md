# Capture v2 — Cross-Spec Entity & State Registry

| Field | Value |
|---|---|
| Status | Generated after correction pass |
| Gate | `BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW` |
| Specs | EC-V2-SPEC-001 … 006 |

## 1. Entity ownership

| Entity | Authoritative owner | Also referenced by |
|---|---|---|
| `InspectionSession` | Spec 2 | Specs 1, 4, 5, 6 |
| `GuidedSequence` / `CapturePoint` | Spec 2 | Spec 6 |
| `CaptureAttempt` / `CandidateFrame` / `CommittedArtifact` | Spec 2 | Specs 5, 6 |
| `SupersessionRecord` | Spec 2 | Spec 6 |
| `EvidencePackage` | Spec 2 | Spec 1 (compatibility) |
| `EvidenceSensor` / `SensorPayload` | Spec 3 | Specs 4, 5 |
| `DeviceCapabilitySnapshot` / `CapabilityValue` | Spec 4 | Specs 2, 3 |
| `ClockAnchor` / timestamp types / `EvidenceValue` | Spec 5 | Specs 1, 3 |
| `TelemetryRecord` | Spec 5 | Specs 2, 3, 6 |
| `QualityMetricResult` / `QualityThresholdPolicy` / `QualityAssessment` | Spec 6 | Specs 1, 2 |
| Constitution / processing classes / ML ban | Spec 1 | all |

## 2. State machines (non-overlapping meanings)

| Machine | States | Owner |
|---|---|---|
| Session lifecycle | `draft` → `active` → `paused` → `completed` → `exported` | Spec 2 |
| Sensor lifecycle | `UNDISCOVERED` → `DISCOVERED` → `CONFIGURED` → `RUNNING` → `INTERRUPTED` → `STOPPED` → `FAILED` → `RECOVERING` | Spec 3 |
| Evidence operation | `REQUEST` → `ACQUIRE` → `ASSOCIATE` → `VERIFY` → `COMMIT` | Spec 3 (+ packaging) |
| Capture-level quality | `PASS` · `WARN` · `BLOCK_CAPTURE` | Spec 6 |
| Point completeness | `POINT_COMPLETE` · `POINT_COMPLETE_WITH_WARNINGS` · `POINT_INCOMPLETE` | Spec 6 |
| Session completeness | `COMPLETE` · `COMPLETE_WITH_WARNINGS` · `INCOMPLETE` | Spec 6 |
| Export policy | `EXPORT_ALLOWED` · `EXPORT_ALLOWED_WITH_WARNINGS` · `BLOCK_EXPORT` | Spec 6 |
| Capability `supportState` | `SUPPORTED` · `UNSUPPORTED` · `UNAVAILABLE_DURING_CURRENT_STATE` · `QUERY_FAILED` · `UNKNOWN` | Spec 4 |
| Measurement availability | `AVAILABLE` · `NOT_SUPPORTED` · `NOT_AUTHORIZED` · `TEMPORARILY_UNAVAILABLE` · `SENSOR_ERROR` · `NOT_REQUESTED` · `UNKNOWN` | Spec 5 |
| Policy rollout | `OBSERVE_ONLY` → `WARN_ONLY` → `BLOCK_ELIGIBLE` → `BLOCK_ACTIVE` | Spec 6 |

**Rule:** `BLOCK_EXPORT` is never a session lifecycle state. `VERIFY`/`COMMIT` are never sensor lifecycle states.

## 3. Processing & observation vocabularies

| Vocabulary | Values | Owner |
|---|---|---|
| Processing class | `SENSOR_REPORTED` · `FRAMEWORK_FUSED` · `CAPTURE_DERIVED` · `EXTERNAL_DERIVED` | Spec 1 / Spec 5 |
| Observation authority | `DIRECT_RUNTIME_QUERY` · `STATIC_REFERENCE_ONLY` · `EXTERNAL_SENSOR_DECLARATION` · `UNKNOWN_AUTHORITY` | Spec 4 |
| Wall-clock source | `SYSTEM_WALL_CLOCK` · `EXTERNAL_NETWORK_TIME_MEASUREMENT` · `EXTERNAL_GNSS_TIME_MEASUREMENT` · `EXTERNAL_SENSOR_CLOCK` · `UNKNOWN` | Spec 5 |
| Semantic mattes | `SEMANTIC_MATTE_CAPABILITY_DETECTED_BUT_PRODUCTION_USE_PROHIBITED` | Spec 4 / Spec 1 |
| Never-overridable quality/integrity | `HASH_MISMATCH` · `MANIFEST_INTEGRITY_FAILURE` · `MISSING_REQUIRED_IMMUTABLE_PAYLOAD` · `UNDECLARED_PACKAGE_FILE` | Spec 6 |

## 4. Terminology review notes

| Topic | Decision |
|---|---|
| `CapabilitySnapshot` | Alias of `DeviceCapabilitySnapshot` (Spec 4 authoritative) |
| `SensorRecord` vs `TelemetryRecord` | Framework-facing vs packaged; Spec 5 owns packaged shape |
| `confidence` on capabilities | **Removed**; use `observationAuthority` / completeness / `queryResult` |
| Uncalibrated RAW accel | **Forbidden assumption**; use processing class + source API |
| Per-sample wall-clock on IMU | **Not required**; anchor + derived projection when needed |

## 5. Gate after this registry

```text
V2_SPECIFICATIONS_4_TO_6_DRAFTED
CROSS_SPEC_REVIEW_COMPLETED_WITH_REQUIRED_CORRECTIONS
CORRECTION_PASS_APPLIED
CROSS_SPEC_ENTITY_STATE_REGISTRY_GENERATED
BASELINE_APPROVAL_PENDING_FINAL_ARCHITECTURAL_REVIEW
```

**Not yet:** `V2_SPECIFICATIONS_1_TO_6_BASELINE_APPROVED` · `AUTHORIZED_FOR_IR_0001_EXECUTION` (future `CHANGE-0003`)
