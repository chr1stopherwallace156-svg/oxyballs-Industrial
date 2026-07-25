# CAPTURE QUALITY POLICY

**Document ID:** EC-V2-SPEC-006  
**Status:** `DRAFT_FOR_BASELINE_REVIEW` — correction pass applied  
**Applies To:** Capture v2.0C and policy consumers introduced earlier  
**Gate:** `BASELINE_APPROVAL_PENDING_CORRECTION_PASS`  
**Depends on:** EC-V2-SPEC-001, EC-V2-SPEC-002, EC-V2-SPEC-005  
**Production code:** None

## 1. Purpose

This specification defines deterministic evidence-quality evaluation,
policy rollout, threshold versioning, user feedback, and capture/export
enforcement.

The quality system evaluates measurable capture conditions. It does not infer
component identity, damage, correctness of repair, or vehicle condition.

## 2. Governing Principles

1. Every quality decision must be reproducible from declared inputs.
2. Every metric must have a versioned algorithm identifier.
3. Every threshold must have a versioned policy identifier.
4. Metrics and enforcement decisions must remain separate.
5. Immutable evidence must not be modified to improve a quality score.
6. A blocked candidate frame must not become a committed artifact unless an
   authorized override contract explicitly permits it.
7. Quality policy must preserve uncertainty and unavailable measurements.
8. Learned models are prohibited from producing enforcement decisions.

## 3. Evaluation Layers

### 3.1 Capture-Level Evaluation

`PASS` · `WARN` · `BLOCK_CAPTURE` — single candidate attempt before commitment.

### 3.2 Capture-Point Completeness

`POINT_COMPLETE` · `POINT_COMPLETE_WITH_WARNINGS` · `POINT_INCOMPLETE`

### 3.3 Session-Level Evaluation

`COMPLETE` · `COMPLETE_WITH_WARNINGS` · `INCOMPLETE`

### 3.4 Export-Level Evaluation

`EXPORT_ALLOWED` · `EXPORT_ALLOWED_WITH_WARNINGS` · `BLOCK_EXPORT`

`BLOCK_EXPORT` is an export-policy decision, **not** a session lifecycle state.

## 4. Policy Rollout Modes

`OBSERVE_ONLY` → `WARN_ONLY` → `BLOCK_ELIGIBLE` → `BLOCK_ACTIVE`

A policy must not enter `BLOCK_ACTIVE` without an approved validation record.

## 5. Metric Contract

Each `QualityMetricResult` contains:

- `metricID` / `metricVersion`
- `inputArtifactIDs` / `inputTelemetryRecordIDs`
- `computedValue` / `normalizedValue` / `unit` (as `EvidenceValue` where optional)
- `availabilityState`
- `thresholdPolicyID` / `thresholdVersion`
- `evaluationTimestamp`
- `processorBuildID`
- `determinismProfile`
- `resultFlags`

### Determinism profile (required for enforcement-eligible metrics)

- `numericRepresentation`
- `roundingMode`
- `overflowBehavior`
- `nanInfinityBehavior`
- `normalizationPrecision`
- `comparisonTolerance`

Byte-oriented metrics may assert identical output for identical canonical input
bytes. Floating-point / motion metrics must characterize architecture variance
via the fields above; they must not claim bit-identical cross-CPU results unless proven.

## 6. Initial Deterministic Metrics

Sharpness (versioned normalized score — algorithm not permanently fixed),
luminance statistics, histogram completeness, motion stability (unavailable when
required telemetry missing — never default PASS), and metadata completeness.

## 7. `QualityThresholdPolicy`

Required: `policyID`, `policyVersion`, `scope`, `workflowType`, `capturePointType`,
`requiredMetrics`, warning/blocking thresholds, `missingMetricBehavior`,
`overridePolicy`, `effectiveDate`, `validationEvidenceReference`.

Thresholds must not be hard-coded solely in UI logic.

## 8. Missing Metric Behavior

Per required metric (workflow-owned, not global by sensor type):

- `WARN_IF_UNAVAILABLE`
- `BLOCK_CAPTURE_IF_UNAVAILABLE`
- `MARK_POINT_INCOMPLETE`
- `BLOCK_EXPORT_IF_UNAVAILABLE`
- `NOT_APPLICABLE`

## 9. Overrides — authority boundaries

Any permitted override must record:

- actor / user initiating override
- timestamp
- original decision
- override reason code
- free-text explanation when required
- policy authorizing the override
- resulting artifact status
- `overrideScope`
- `authorizedRole`
- `authorizationPolicyVersion`
- `authenticationContext`
- `overrideSignatureOrAuditID`

An override does **not** convert a failed metric into a pass; it records that
commitment or export was authorized despite the recorded result.

### Never-overridable failures

The following integrity failures **cannot** be overridden by operator policy:

- `HASH_MISMATCH`
- `MANIFEST_INTEGRITY_FAILURE`
- `MISSING_REQUIRED_IMMUTABLE_PAYLOAD`
- `UNDECLARED_PACKAGE_FILE`

An operator may override image sharpness policy. They must never override
cryptographic or package-integrity corruption.

## 10. Supersession and Retakes

Quality failure may lead to a new `CaptureAttempt`. Previous committed evidence
remains immutable. Selection uses supersession records — never deletion.

## 11. Determinism Requirements

A metric is eligible for enforcement only when:

- identical canonical input bytes yield identical output **or** the determinism
  profile fully specifies numeric/rounding/tolerance behavior;
- algorithm and policy versions are recorded;
- platform-dependent behavior is characterized;
- test vectors exist;
- unsupported input conditions fail explicitly;
- replay verification is available.

## 12. Validation Ladder

Before `BLOCK_ACTIVE`: unit tests → golden replay → cross-device → OS-version →
false-block review → `OBSERVE_ONLY` field observation → `BLOCK_ELIGIBLE` shadow →
formal activation approval.

## 13. Acceptance Criteria

This specification passes review when:

- metric calculation and policy enforcement are separate;
- capture, point, session, and export outcomes are distinct;
- thresholds are versioned;
- unavailable values are explicit;
- overrides preserve the original failure and carry authority fields;
- never-overridable integrity failures are enforced;
- floating-point determinism is characterized;
- no learned inference can create quality decisions.
