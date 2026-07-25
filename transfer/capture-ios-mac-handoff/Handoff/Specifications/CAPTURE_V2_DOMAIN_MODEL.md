# CAPTURE V2 DOMAIN MODEL SPECIFICATION

| Field | Value |
|---|---|
| Document ID | EC-V2-SPEC-002 |
| Status | **V2_CORE_SPECS_1_TO_3_HARDENED** |
| Gate | `BASELINE_APPROVAL_PENDING_CORRECTION_PASS` |
| Depends on | `ELEKTRON_CAPTURE_V2_SPEC.md` |
| Next | `CAPTURE_SENSOR_FRAMEWORK.md` |

## 1. Complete Entity Map

```text
InspectionSession (sessionID, temporaryVehicleRef)
    └── GuidedSequence (sequenceID)
            └── CapturePoint (pointID, isRequired)
                    └── CaptureAttempt (attemptID, attemptIndex)
                            ├── CandidateFrame (in-memory)
                            └── CommittedArtifact (immutable, hashed)
                                    └── SupersessionRecord (supersededByID)
```

Supporting records (bound to session / attempt):

- `SensorRecord` / `TelemetryRecord` — timebase-aligned; reference `attemptID` (owner: Spec 5)
- `QualityAssessment` / `QualityMetricResult` — layered outcomes (owner: Spec 6)
- `DeviceCapabilitySnapshot` — immutable capability records; **initial** at session start plus **additional** snapshots after material hardware changes (owner: Spec 4). Alias: `CapabilitySnapshot`.
- `EvidencePackage` — canonical `.edts-pkg` (manifest, RAW payloads, derived telemetry)

## 2. Enforceable Retake Invariant

```text
CaptureAttempt A (attemptIndex: 1)
  └── CommittedArtifact A (SHA-256: <full 64-char digest>)

[User initiates Retake at CapturePoint]

CaptureAttempt B (attemptIndex: 2)
  └── CommittedArtifact B (SHA-256: <different full digest>)
  └── SupersessionRecord (supersedes: Artifact A, reason: "…")

Result: Artifact A remains untouched, locked, and fully hash-verifiable in the manifest.
```

**Invariant:** Retakes never overwrite or delete prior RAW bytes. Supersession is additive lineage only.

## 3. `InspectionSession`

| Field | Notes |
|---|---|
| `sessionID` | UUIDv4 — primary identity |
| `temporaryVehicleReference` | Optional human label |
| `observedVIN` / `verifiedVIN` / `vehicleUnitID` | Optional; **session identity never depends on VIN** |
| Lifecycle | `draft` → `active` → `paused` → `completed` → `exported` |
| `activeCapabilitySnapshotID` | Current immutable `DeviceCapabilitySnapshot` |
| `capabilitySnapshotHistory` | Ordered list of snapshot IDs for the session (never overwritten) |

Session state must persist across interruption and recover without mutating RAW artifacts.

Export eligibility uses Spec 6 export-level outcomes (`EXPORT_ALLOWED` / `EXPORT_ALLOWED_WITH_WARNINGS` / `BLOCK_EXPORT`), distinct from session lifecycle and session completeness.

## 4. `GuidedSequence` & `CapturePoint`

| Entity | Fields / rules |
|---|---|
| `GuidedSequence` | `sequenceID`; ordered list of `CapturePoint` |
| `CapturePoint` | `pointID`; `requirementLevel`: `REQUIRED_POINT` \| `OPTIONAL_POINT` |
| Ordering | Stable step index for UI (“Step 3/8: Battery Bay”) |

`REQUIRED_POINT` incompleteness contributes to session `INCOMPLETE` / may `BLOCK_EXPORT`.  
`OPTIONAL_POINT` skip may `WARN` without blocking export unless policy says otherwise.

## 5. `CaptureAttempt`

| Field | Notes |
|---|---|
| `attemptID` | UUIDv4 |
| `attemptIndex` | Monotonic per `CapturePoint` (1, 2, …) |
| Binding | Owns zero or one committed optical artifact plus related sensor/telemetry records |

Each shutter/commit cycle that freezes evidence is a new attempt — never a mutation of a prior attempt’s RAW.

## 6. `CandidateFrame` vs `CommittedArtifact`

| Type | Mutability | Quality | Persistence |
|---|---|---|---|
| `CandidateFrame` | Ephemeral / in-memory | Evaluated by `CaptureQualityPolicy` (capture-level) | Not evidence until commit |
| `CommittedArtifact` | Immutable | `QualityAssessment` recorded | Hashed; library + package reference |

Commit is the `RAW_EVIDENCE` freeze boundary (aligned with Phase 1 still-capture freeze semantics).

## 7. `SupersessionRecord`

| Field | Notes |
|---|---|
| `supersedesArtifactID` | Prior committed artifact |
| `supersededByArtifactID` | Newer committed artifact |
| `reason` | Operator- or policy-supplied string |
| Rule | Preserves raw capture lineage; never deletes historical evidence |

Manifest / inventory list **both** artifacts.

## 8. `SensorRecord` & `TelemetryRecord`

- Bound to session monotonic timeline and `attemptID` (when applicable)
- Carry precision timebase fields per Spec 3 / Spec 5 (`monotonicTimestamp`, `wallClockTimestamp`, `sensorNativeTimestamp`, `clockAnchorID`)
- Optional sensor failure → `WARN` + error record; continue capture
- Required-for-point failure → `BLOCK_CAPTURE` / `POINT_INCOMPLETE`; required-for-export → Spec 6 export `BLOCK_EXPORT` (workflow policy owns required/optional)

## 9. `QualityAssessment`

Authoritative outcome layers and metric contract: **Spec 6**. Domain model retains the assessment entity attached to attempts / points / sessions / export requests. Never a learned classifier label.

## 10. `DeviceCapabilitySnapshot` (alias: `CapabilitySnapshot`)

Authoritative schema and snapshot reasons: **Spec 4**.

- An **initial** immutable snapshot is required at session initialization (before streaming claims capabilities).
- **Additional** immutable snapshots are required after material hardware / configuration changes (lens switch, format switch, interruption recovery, external-sensor reconnection, thermal restriction, media-services reset, etc.).
- Prior snapshots remain preserved; capability changes must not overwrite history.
- UI and policy may only offer controls present in the **active** snapshot; `UNKNOWN` must never be collapsed to `UNSUPPORTED`.

## 11. `EvidencePackage`

Canonical `.edts-pkg` output: manifest, `RAW_EVIDENCE` payloads, `DERIVED_EVIDENCE` with RAW ID + pipeline version references, inventory under Canonical Identity path keys. Extends Phase 1 only via versioned compatible contracts.

## 12. Compatibility with Phase 1C Evidence Library

Phase 1C local library remains the durable still-photo store. v2 sessions may reference library capture IDs; they must not break write-once `artifact_original.jpg` or Canonical Identity path keys.
