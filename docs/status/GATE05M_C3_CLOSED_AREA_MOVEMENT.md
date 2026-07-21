# CONTROLLED CLOSED-AREA LOW-SPEED MOVEMENT (Gate 05M-C3)

The final rung of the split 05M-C traction phase in the post-bench gate ladder
(Decision Register D-008, amended review_65) for the F-450/F-550 EV conversion
(Gate 05M-C3, batch_68 + owner review_65). Gate 05M-C3 is **controlled
closed-area low-speed movement** — the first time the vehicle drives under its
own power in a closed test area, only after Gate 05M-C2 (05M-C2A flat-ground
creep → 05M-C2B incline/rollback → 05M-C2C faulted-creep recovery) is proven. It
is built as **five linear modular subgates**, NOT one large "track movement"
gate (owner review_65), so straight-line propulsion, braking, regeneration,
steering, and fault behaviour are never approved together prematurely.

**Status (owner review_65/66/67/68/69/70): `FORMAL_BASELINE_CANDIDATE` /
`CORE_GOVERNANCE_ARCHITECTURE_MATURE` / `REVISION_06_APPLIED` /
`READY_FOR_CONTROLLED_SPECIFICATION_FREEZE` / `MODULAR_ARCHITECTURE_DEFINED` /
`GLOBAL_AUDIT_SCHEMA_DEFINED` / `TELEMETRY_PACKET_DEFINED` /
`TELEMETRY_SYNC_DEFINED` / `CONFIGURATION_VALIDITY_RULE_DEFINED` /
`IMMUTABLE_EVIDENCE_PRESERVATION_DEFINED` / `LEDGER_LIFECYCLE_DEFINED` /
`HISTORICAL_EVIDENCE_RETENTION_REQUIRED` / `STEPPED_CELL_ESCALATION_DEFINED` /
`TEST_CELL_AUTHORIZATION_SCHEMA_DEFINED` / `AUTHORIZATION_TRANSITION_RULES_DEFINED` /
`PROCEDURE_SIGNATURE_REQUIRED` / `RUNOUT_SCHEMA_DEFINED` /
`RUNOUT_EQUATION_DEFINED` / `DISTANCE_OVERLAP_ACCOUNTING_DEFINED` /
`RUNOUT_CALCULATION_REQUIRED` / `C3A_STRAIGHT_LINE_DEFINED` /
`C3A_C3B_DEPENDENCY_RESOLVED` / `C3A_EXTERNAL_CONTROL_INTEGRATION_LOCKED` /
`C3B_FOUNDATION_BRAKE_BASELINE_DEFINED` / `C3C_REGEN_COEXISTENCE_DEFINED` /
`C3C_COORDINATED_BLENDING_LOCKED` / `C3C_REGEN_FAULT_OWNERSHIP_DEFINED` /
`REGEN_RESIDUAL_INITIAL_TARGET_ONLY` / `C3D_STEERING_STATE_MATRIX_DEFINED` /
`C3D_SIGNAL_FRESHNESS_MODEL_DEFINED` / `C3E_FAULT_HIERARCHY_DEFINED` /
`C3E_EXECUTION_DOMAINS_DEFINED` /
`C3E_DOMAIN_TRANSITIONS_REQUIRE_SEPARATE_AUTHORIZATION` /
`MULTI_FAULT_AUTHORIZATION_SCHEMA_DEFINED` /
`AUTHORIZATION_FIELD_UNITS_AND_VALIDATION_DEFINED` /
`AUTHORIZATION_TRANSITION_AUDIT_DEFINED` /
`COMPLETED_NOT_SIGNED_PASS_RULE_DEFINED` /
`RUNOUT_AGGREGATION_RESULT_SCHEMA_DEFINED` /
`DISTANCE_GEOMETRY_VALIDATION_DEFINED` / `APPEND_ONLY_ANNOTATION_RULE_DEFINED` /
`REGEN_RESIDUAL_OPERATING_STATE_CONDITIONED` /
`C3A_ESTOP_SEPARATE_OUTCOMES_DEFINED` /
`C3D_STATE_PRECEDENCE_AND_RECOVERY_DEFINED` /
`FAULT_EXECUTION_AUTHORIZATION_SCHEMA_DEFINED` /
`PAIRED_FAULT_LIFECYCLE_FIELDS_DEFINED` / `NO_CLAIM_RULE_DEFINED` /
`RUNOUT_BLOCK_RULES_DEFINED` / `UNIT_ENUM_AND_CANONICAL_CONVERSION_DEFINED` /
`STEERING_BAND_BOUNDED_RECORD_DEFINED` / `AUTHORIZATION_ACTIVATION_RULES_DEFINED` /
`AUTHORIZATION_EXPIRY_STATE_DEFINED` / `RESULT_STATUS_SEPARATED` /
`PROCEDURE_APPROVAL_RECORD_DEFINED` / `ESTOP_RAW_TRACE_DEFINED` /
`INDEPENDENT_SENSOR_HEALTH_SCHEMA_DEFINED` /
`STEERING_RESOLUTION_DETERMINISTIC_DEFINED` / `STEERING_RECOVERY_MODEL_DEFINED` /
`FAULT_EXECUTION_LIFECYCLE_FIELDS_DEFINED` / `PAIRED_FAULT_EXACT_FAULT_IDS_DEFINED` /
`DATABASE_FOREIGN_KEY_ENFORCEMENT_DEFINED` / `SCOPE_LIMITATION_NO_REUSE_DEFINED` /
`NUMERIC_LIMITS_INITIAL_TARGET_PROFILE` / `FORMAL_ENGINEERING_REVIEW_REQUIRED` /
`NO_ACTIVE_ABS_ESC_AUTHORITY` / `NO_TORQUE_VECTORING_AUTHORITY` /
`NO_PUBLIC_ROAD` / `NO_CUSTOMER_OPERATION` / `NO_NORMAL_DRIVING_AUTHORITY`.**
After the fourteen review_65 corrections (RC-313..326), the thirteen review_66
corrections (RC-327..339, Revision 02), the eleven review_67 corrections
(RC-340..350, Revision 03), the thirteen review_68 corrections (RC-351..363,
Revision 04), the fourteen review_69 corrections (RC-369..382, Revision 05 —
items 1 & 5 already clean) and the fifteen review_70 corrections (RC-383..397,
Revision 06 — owner items 1 & 3 targeted the Hunter's OCR/typographical text only,
already clean/canonical here) the gate labels
`GATE_05M_C3_REVISION_06_READY_FOR_CONTROLLED_SPECIFICATION_FREEZE` —
**the controlled-validation architecture is mature and ready to freeze the
specification, while all physical pass claims remain correctly unproven; it does
NOT mean any vehicle / calibration / brake system / regeneration strategy / moving
fault test has physically passed** (nothing Confirmed). The owner's downstream
sequence — `DATABASE_SCHEMA_IMPLEMENTATION → RULE_ENGINE_TESTS → HIL_VALIDATION` —
is M10/production work and is **NOT performed during Rev 07 ingestion**.
Ladder: **… → 05M-C2 (05M-C2A → 05M-C2B → 05M-C2C) → 05M-C3 (THIS GATE — 05M-C3A
→ 05M-C3B → 05M-C3C → 05M-C3D → 05M-C3E)** (D-008, amended review_70).

## Linear progression (owner review_65) — HARD BLOCK

Progression is **strictly linear**; no downstream subgate unlocks until the
preceding subgate reaches `SIGNED_PASS` across all ledger items:

1. **05M-C3A — Straight-Line Low-Speed Tracking** — prove straight travel,
   predictable acceleration, speed-limit enforcement, pedal tracking,
   forward/reverse direction, path deviation, brake override, neutral interrupt,
   remote E-stop, assist-system stability, no unexpected wheel-speed
   disagreement. **Steering and cornering do not unlock until a signed C3A pass.**
2. **05M-C3B — Coast-Down + Foundation Brakes** — mechanical-brake and natural-
   drag baseline; **regen disabled (0 Nm target)**.
3. **05M-C3C — Restricted Regeneration** — only after C3B `SIGNED_PASS`; regen is
   **supplemental deceleration only**, foundation brakes remain primary.
4. **05M-C3D — Steering-Angle / Propulsion-Envelope Map** — steering angle is an
   **observation and derating input only, NOT active torque-vectoring / stability
   authority** (`NO_TORQUE_VECTORING_AUTHORITY`); factory ABS/ESC stays
   authoritative (`NO_ACTIVE_ABS_ESC_AUTHORITY`).
5. **05M-C3E — Closed-Area Fault + Abort Sequences** — integrated compound-fault
   behaviour, cell-escalated (RC-324).

## Global governance (carried into every subgate)

- **Four-field approval/execution record (RC-299/307..312):** every row carries
  `Required Approver` · `Procedure Approval Status` (`APPROVAL_REQUIRED` →
  `APPROVED_FOR_CONTROLLED_EXECUTION`) · `Execution Status` (`NOT_EXECUTED` →
  `PENDING_EXECUTION` → `EXECUTED`) · `Result Signoff Status` (`NOT_ELIGIBLE` →
  `SIGNED_PASS` / `SIGNED_FAIL` / `NEEDS_REVIEW` / `INVALID_TEST`). "Approved by"
  alone is forbidden. **No `SIGNED_PASS` exists — nothing has been executed.**
- **Procedure approval requires real signatures (owner review_68, RC-355):**
  `Procedure Approval Status: APPROVED_FOR_CONTROLLED_EXECUTION` is valid **ONLY**
  after an actual named approver, timestamp, and revision signature exist —
  captured as `procedure_revision` · `procedure_approver_identity` ·
  `approval_timestamp` · `approval_signature_record` · `approval_scope` ·
  `approval_expiry`. **Until those exist every row stays `Procedure Approval
  Status: APPROVAL_REQUIRED` · `Execution Status: NOT_EXECUTED` · `Result Signoff
  Status: NOT_ELIGIBLE`** (no procedure is pre-approved on paper). The subgate
  matrices show the target field layout, not a granted approval.
- **Procedure approval is a signed record, not a document default (owner
  review_70, RC-389):** `PAS: APPROVED_FOR_CONTROLLED_EXECUTION` may be populated
  ONLY from a **`ProcedureApproval_ID`** record — `test_id` · `procedure_revision`
  · `approver_identity` · `approval_scope` · `approval_timestamp` ·
  `signature_hash` · `authorization_expiry` · `linked_hazard_analysis` · `status`.
  **Until that record exists every row stays `PAS: APPROVAL_REQUIRED` / `ES:
  NOT_EXECUTED` / `RSS: NOT_ELIGIBLE`.** The prefilled
  `APPROVED_FOR_CONTROLLED_EXECUTION` values in the Revision-05 matrices are the
  *target* state, populated only from a signed `ProcedureApproval_ID`.
- **Numeric Threshold Authority Rule (RC-267/293/300):** every number here
  (`V_max` ≤15 km/h, ≤40 Nm/sec ramp, ≤80 Nm traction, ≤5 Nm min-regen, ≤10 Nm
  regen cap, ≤5% parity, and all C3D cell values) is `INITIAL_TARGET_PROFILE`
  with no pass / fail / block / movement / release authority until linked to the
  applicable hardware/software configuration + an artifact source or engineering
  calculation + a calibrated measurement method + measurement tolerance and
  uncertainty + a proof artifact + an approved procedure revision + signed
  engineering authorization.
- **E-stop is architecture-dependent (RC-309):** the hardwired safety loop forces
  the supplier-defined emergency torque-inhibit + HV-isolation response;
  contactor coil-supply interruption only where the approved architecture
  requires it. **A path deviation or software fault must NOT automatically open
  the HV contactors** unless the approved emergency architecture dictates
  isolation for that fault class — controlled torque removal + foundation braking
  is the baseline mitigation path.
- **Neutral by zero propulsion torque (RC-310); no "instant"/"immediate" wording —
  supplier/engineering response windows (RC-288/320); CAN_1 stays electrically
  passive (RC-304); wheel-speed read-only (RC-282); never "certified safe"
  (RC-224).**

## Telemetry Synchronicity Packet (owner review_65) — required every run

Every C3 run continuously logs a synchronous array: **vehicle_speed ·
commanded_torque · reported_inverter_torque · phase_current · DC-bus_current ·
longitudinal_acceleration · steering_angle · steering_angle_rate ·
individual_wheel_speeds (×4) · motor_speed · brake_state · APPS_channels (×2) ·
12V_aux_voltage · brake-assist_pressure/status · steering-assist_pressure/current/status
· gear_state · fault_state · E-stop_state · test-area_boundary_position.**
**Torque request and longitudinal acceleration are separate but related
quantities** — vehicle mass and drivetrain ratio make the same motor torque
produce different acceleration across platforms, so neither is a proxy for the
other.

### Data-synchronization requirement (owner review_65, RC-326) — HARD BLOCK

The packet is not evidence until synchronization is proven. **All channels must
share an approved common clock or a documented time-alignment method**, with:
per-signal sampling rates · timestamp source · maximum synchronization error ·
dropped-frame detection · sensor-latency compensation · start/stop event markers.
Otherwise a brake event, torque removal, phase-current decay, and actual
deceleration may appear incorrectly ordered.

### RunoutCalculation_ID artifact schema (owner review_65/66, RC-313/327) — HARD BLOCK

The fixed 50 m fallback is deprecated (RC-313). No track movement occurs without
a linked `RunoutCalculation_ID` artifact whose **required fields (owner
review_66, RC-327)** are: vehicle test mass · front and rear axle loading ·
authorized test-cell speed · authorized traction torque · authorized torque ramp
rate · maximum expected acceleration · driver response allowance ·
software/control response allowance · torque-removal coast distance ·
foundation-brake stopping distance · surface grade · surface condition +
estimated friction range · tire size / pressure / condition / temperature ·
wind + ambient conditions where relevant · position-measurement uncertainty ·
braking-distance measurement uncertainty · required containment margin ·
acceleration zone length · stabilization zone length · braking target zone ·
post-target runout · physical restraint / barrier plan · engineering calculation
revision · required approver + signed authorization.

**The `L_min` equation (owner review_67, RC-340):**

```
L_min = L_acceleration
      + L_stabilization
      + L_braking_target
      + L_worst_case_coast_or_stop
      + L_response_allowance
      + L_measurement_uncertainty
      + L_containment_margin
```

**No physical distance may be double-counted (RC-340):** e.g. if
`foundation_brake_stopping_distance` already includes the driver/control response
distance, the Build Engine must NOT add `L_response_allowance` again. Every
distance component carries a **`distance_component_method`** of `MEASURED` /
`CALCULATED` / `SUPPLIER_DEFINED` / `ENGINEERING_APPROVED` /
`INITIAL_TARGET_PROFILE`. **No `RunoutCalculations_ID` may authorize movement if
any required distance component is `MISSING_SOURCE`, `UNVERIFIED`, or
`INITIAL_TARGET_PROFILE_ONLY`.**

**Overlap is handled by preserving component values, NOT by zero-clamping (owner
review_68, RC-351):** a component that overlaps another must NEVER be "clamped to
zero" — that would destroy the original response-distance calculation. Every
component retains its calculated/measured value; the aggregation record declares
whether it is `INCLUDED_SEPARATELY` / `INCLUDED_IN_OTHER_COMPONENT` /
`NOT_APPLICABLE` / `BLOCKED_PENDING_REVIEW`, via the fields
`distance_component_value` · `distance_component_method` · `included_in_L_min` ·
`included_within_component_id` · `overlap_review_status` · `overlap_review_approver`
(e.g. `L_response_allowance = 2.4 m`, `included_in_L_min = false`,
`included_within_component_id = L_worst_case_coast_or_stop`).

**Distance Accounting Integrity Rule (owner review_68, RC-352) — HARD BLOCK:**
**every physical metre may be counted only once in the `L_min` summation.** The
components that may overlap — planned braking target · foundation-brake stopping
distance · worst-case coast/stop allowance · driver response distance · control
response distance · post-target runout · containment margin — each carry a full
component record: `component_id` · `zone_start_reference` · `zone_end_reference` ·
`distance_m` · `method` · `uncertainty_m` · `included_in_total` ·
`parent_component_id` · `overlap_status` · `proof_artifact_id` · `authority_status`.

**Runout aggregation result record (owner review_69, RC-372) — HARD BLOCK:**
beyond the per-component records, one computed summary is stored — a
**`RunoutAggregationResult`**: `RunoutCalculations_ID` · `ConfigurationPacket_ID` ·
`TestCellAuthorization_ID` · `component_ids[]` · `calculated_L_min` ·
`available_track_length` · `remaining_margin` · `overlap_check_result` ·
`unit_consistency_result` · `required_component_completion_result` ·
`calculation_version` · `calculation_hash` · `required_approvers` ·
`authorization_status`. Movement is **hard-blocked** if
`available_track_length < calculated_L_min`, and also if
`remaining_margin < approved_minimum_margin`, `unit_consistency_result != PASS`,
or `overlap_check_result != PASS`.

**Boundary ordering + geometry validation (owner review_69, RC-373) — HARD
BLOCK:** for every distance component `zone_end_reference >= zone_start_reference`
and `distance_component_value ≈ (zone_end_reference − zone_start_reference)` within
the approved measurement tolerance. A component marked
`INCLUDED_IN_OTHER_COMPONENT` must have `included_in_L_min = false` and
`included_within_component_id != null`; a component marked `INCLUDED_SEPARATELY`
must have `included_in_L_min = true` and `included_within_component_id = null`. The
database **rejects** any inconsistent combination.

**Complete overlap enforcement + full movement-block conditions (owner review_70,
RC-383) — HARD BLOCK.** The overlap rules are enforced in full, not left as
schema shape:

```
IF overlap_review_status = INCLUDED_IN_OTHER_COMPONENT:
  included_in_L_min             = false
  included_within_component_id  IS NOT NULL
  referenced host component     EXISTS
  host component belongs to the SAME RunoutCalculations_ID
IF overlap_review_status = INCLUDED_SEPARATELY:
  included_in_L_min             = true
  included_within_component_id  IS NULL
```

**`PHYSICAL_MOVEMENT_BLOCKED` if ANY of:** `available_track_length <
calculated_L_min` · `remaining_margin < approved_minimum_margin` ·
`overlap_check_result != PASS` · `unit_consistency_result != PASS` ·
`required_component_completion_result != PASS` · `authorization_status !=
SIGNED_RELEASE` · a `ConfigurationPacket_ID` mismatch exists · the
`TestCellAuthorization_ID` is not `ACTIVE` · any required component is
`MISSING_SOURCE`, `UNVERIFIED`, `INITIAL_TARGET_PROFILE_ONLY`, or
`BLOCKED_PENDING_REVIEW`. The schemas are not "complete" until these enforcement
lines exist.

### Test Configuration Lock Rule (owner review_65, RC-325) — HARD BLOCK

Every C3 run archives: **VCU firmware hash · inverter firmware/version ·
BMS/PDU firmware/version · calibration-file hash · DBC/version hash · active
test-cell limits · vehicle mass + axle-load record · tire size/pressure/condition
· ambient + surface conditions · instrumentation IDs + calibration status.** Any
change invalidates reuse of a previous result unless an engineering impact review
explicitly allows it.

### Test Result Validity Rule (owner review_66/67, RC-339/349) — HARD BLOCK

Because configurations are locked, **a signed result applies ONLY to the archived
hardware configuration · firmware/software hashes · calibration hashes · active
DBC version · test-cell limits · vehicle mass/loading · tire configuration ·
instrumentation set · environmental window.** Any change triggers
`IMPACT_REVIEW_REQUIRED`, after which the prior result is graded **`REUSABLE` /
`PARTIALLY_REUSABLE` / `REPEAT_TEST_REQUIRED` /
`INVALIDATED_FOR_CURRENT_CONFIGURATION`.** **Invalidated evidence is NEVER
deleted or "cleared" (owner review_67, RC-349, Constitution Art. I):** the old
result stays archived and traceable but cannot authorize the new configuration.

**The immutable result lifecycle (owner review_68, RC-353) — HARD BLOCK:**

```
SIGNED_RESULT
  → CONFIGURATION_CHANGE_DETECTED
  → IMPACT_REVIEW_REQUIRED
  → REUSABLE | PARTIALLY_REUSABLE | REPEAT_TEST_REQUIRED
    | INVALIDATED_FOR_CURRENT_CONFIGURATION
  → REPLACEMENT_TEST_LINKED
  → SUPERSEDED_FOR_CURRENT_CONFIGURATION
```

**Historical evidence remains immutable and searchable at every stage;
"invalidated" means unusable for the current configuration — NOT deleted**
(`IMMUTABLE_EVIDENCE_PRESERVATION_DEFINED` / `LEDGER_LIFECYCLE_DEFINED`). This
governs firmware updates and inverter swaps.

**Append-only evidence — immutable ≠ un-annotatable (owner review_69, RC-374) —
HARD BLOCK:** "completely unchanged" means the source evidence is immutable, not
that no later review may ever attach metadata. **Raw artifacts and signed result
records are immutable. Corrections, annotations, applicability changes,
supersession records, and engineering interpretations must be appended as new
linked records; they must never overwrite original evidence.** This enables error
correction without rewriting history (Constitution, Article I).

### TestCellAuthorization_ID schema (owner review_67/68, RC-350/354) — HARD BLOCK

Because cell progression is fundamental (RC-314), each cell is authorized by an
explicit **`TestCellAuthorization_ID`** record: `subgate_id` · `cell_number` ·
`maximum_speed` · `maximum_positive_torque` · `maximum_negative_torque` ·
`maximum_torque_rate` · `maximum_jerk` · `maximum_test_distance` · allowed
steering band · allowed regen state · allowed fault set · `RunoutCalculations_ID`
· `ConfigurationPacket_ID` · `previous_cell_signed_result` ·
`thermal_state_requirement` · surface/environmental window · authorization expiry
· required approvers · **status** (`DRAFT` / `APPROVAL_REQUIRED` / `AUTHORIZED` /
`ACTIVE` / `SUSPENDED` / `COMPLETED` / `REVOKED` / `SUPERSEDED`). Passing a lower
cell is evidence only; it does not auto-authorize the next cell.

**Every numeric authorization field carries units + provenance + hard validation
(owner review_69, RC-369) — HARD BLOCK:** each numeric field records `value` ·
`unit` · `authority_class` · `source_artifact_id` ·
`measurement_or_calculation_uncertainty` · `effective_revision` (e.g.
`maximum_speed: value / unit m/s / authority_class ENGINEERING_APPROVED /
source_artifact_id …`) so one software layer can never interpret km/h while
another expects m/s. The record is rejected unless **all** of these hold:
`maximum_speed > 0` · `maximum_test_distance <= authorized_track_distance` ·
`maximum_positive_torque >= 0` · `maximum_negative_torque <= 0` ·
`authorization_expiry > activation_timestamp` ·
`RunoutCalculations.ConfigurationPacket_ID == TestCellAuthorization.ConfigurationPacket_ID`.

**`unit` is a controlled enum + canonical-SI comparison (owner review_70, RC-385)
— HARD BLOCK:** `unit` is NOT an unrestricted string. It is drawn from a
controlled enum — **`m` · `m/s` · `m/s^2` · `m/s^3` · `Nm` · `Nm/s` · `Nm/s^2` ·
`deg` · `deg/s` · `rad` · `rad/s` · `A` · `A/s` · `V` · `V/s` · `Pa` · `kPa` ·
`bar` · `ms` · `s` · `kg` · `percent`** — and every value is converted to internal
**canonical SI units before any comparison.** The **display unit may vary; the
database comparison unit must be canonical**, so a value stored/displayed in km/h
is compared in m/s and never mixed.

**`allowed_steering_band` is a bounded record, not one number (owner review_70,
RC-384) — HARD BLOCK:** a steering band needs lower and upper boundaries and an
explicit angle frame — `minimum_angle` · `maximum_angle` · `unit` ·
`reference_frame` · `authority_class` · `source_artifact_id` · `uncertainty`. The
angle type is declared as **`STEERING_WHEEL_ANGLE` / `ROAD_WHEEL_ANGLE` /
`DERIVED_ROAD_WHEEL_ANGLE`** (RC-323) so steering-wheel degrees and road-wheel
degrees are never accidentally mixed in the same field.

**Every authorization transition is an immutable audit event (owner review_69,
RC-370) — HARD BLOCK:** a status change may never be silently overwritten. Each
transition creates an `AuthorizationTransition_ID` record: `TestCellAuthorization_ID`
· `from_status` · `to_status` · `transition_reason` · `actor_identity` ·
`timestamp` · `signature_record` · `linked_evidence`. **`SUSPENDED → AUTHORIZED`
requires explicit revalidation of** configuration · runout · environment · thermal
state · procedure revision · authorization expiry — a suspended authorization
never silently resumes.

**`COMPLETED` does not mean passed (owner review_69, RC-371) — HARD BLOCK:** three
statuses stay strictly separate — **Authorization status** (`… COMPLETED`) ·
**Execution status** (`EXECUTED`) · **Result status**
(`SIGNED_PASS` / `SIGNED_FAIL` / `NEEDS_REVIEW` / `INVALID_TEST`). A completed test
session may still fail or be invalid. **`COMPLETED` SHALL NOT CLEAR A GATE. Only a
matching `SIGNED_PASS` result may satisfy a gate requirement.**

**Permitted status transitions (owner review_68, RC-354) — software must NOT jump
directly from `DRAFT` to `ACTIVE`:**

```
DRAFT             → APPROVAL_REQUIRED
APPROVAL_REQUIRED → AUTHORIZED | DRAFT
AUTHORIZED        → ACTIVE | SUSPENDED | REVOKED
ACTIVE            → COMPLETED | SUSPENDED | REVOKED
SUSPENDED         → AUTHORIZED | REVOKED
COMPLETED         → SUPERSEDED
REVOKED           → SUPERSEDED
```

- **`ACTIVE`** — the authorization is currently in use for **one** controlled
  execution session.
- **`COMPLETED`** — the authorized execution scope has ended; **result signoff
  remains a separate step**.
- **`REVOKED`** — the authorization may no longer be used.
- **`SUPERSEDED`** — a newer authorization replaces it, but the historical record
  remains.

**Revision 06 status-model refinement (owner review_70, RC-387) — HARD BLOCK:**
`COMPLETED` belongs to **execution**, not authorization, so the three concepts
each carry their own enum and are never conflated:

```
Authorization Status : DRAFT · APPROVAL_REQUIRED · AUTHORIZED · ACTIVE ·
                       SUSPENDED · REVOKED · SUPERSEDED · EXPIRED
Execution Status     : NOT_STARTED · PENDING · EXECUTING · EXECUTED ·
                       ABORTED · COMPLETED
Result Status        : NOT_ELIGIBLE · NEEDS_REVIEW · INVALID_TEST ·
                       SIGNED_FAIL · SIGNED_PASS
```

The RC-354 transition diagram above is retained as the prior-revision baseline;
under RC-387 the terminal `COMPLETED` node is read as the **execution** session
ending (Execution Status = `COMPLETED`) while the authorization itself moves
`ACTIVE → SUPERSEDED | EXPIRED`. `COMPLETED` still never clears a gate (RC-371).

**`EXPIRED` authorization state (owner review_70, RC-388) — HARD BLOCK:** because
each authorization carries an `authorization_expiry`, expiry is an explicit state.
**When `current_time >= authorization_expiry`, `AUTHORIZED` or `SUSPENDED` →
`EXPIRED`.** An `EXPIRED` record **cannot become `ACTIVE`** without a new approval
or a superseding authorization.

**Authorization activation preconditions (owner review_70, RC-386) — HARD BLOCK:**
`AUTHORIZED → ACTIVE` is permitted **only if ALL** hold — the current timestamp is
before `authorization_expiry` · `ConfigurationPacket_ID` is unchanged ·
`RunoutAggregationResult = SIGNED_RELEASE` · the environmental window is valid ·
the thermal state is valid · a prior-cell `SIGNED_PASS` exists where required · the
required procedure approval exists · required personnel are assigned · emergency
and containment systems are ready. **Only one `TestCellAuthorization_ID` may be
`ACTIVE` for the same vehicle / subgate / test session at one time** — no
conflicting active operating limits.

### Cell-by-cell operating-envelope escalation (owner review_65, RC-314) — HARD BLOCK

C3A (and every subgate) does **not** begin at the maximum provisional cell even
though 15 km/h / 80 Nm / 40 Nm/sec are `INITIAL_TARGET_PROFILE`. Authorization is
stepped — **Envelope Cell 1 (minimal authorized speed/torque) → Cell 2 (expanded
straight-line) → Cell 3 (higher approved)** — and **passing one cell does not
automatically unlock the next; each cell requires a separate
`TestCellAuthorization` record.**

## Critical Abort / Stop Authority Hierarchy (owner review_65)

- **Driver** — immediate manual service-brake application + mechanical steering
  control.
- **VCU** — software request removal, torque clamp, non-volatile fault latch.
- **Inverter** — supplier-defined safe torque-disabled / zero-torque response.
- **BMS/PDU** — supplier-defined HV-isolation sequence **where required by the
  architecture** (not automatic).
- **Hardwired E-stop** — supplier-defined emergency torque-inhibit / HV-isolation
  path.
- **Track team** — test-area boundary enforcement, physical containment, recovery.

---

## Subgate 05M-C3A — Straight-Line Low-Speed Tracking

Pure, non-turning, straight-line tracking on flat ground to isolate
forward/reverse propulsion, velocity limits, and VCU command interrupts **before
any steering-angle envelope or regeneration is introduced.** Independent tracking
infrastructure (survey markers / external camera / calibrated positioning)
cross-verifies path deviation alongside internal steering telemetry. Global
constraints (all `INITIAL_TARGET_PROFILE`, per-cell authorized): `V_max` ≤15
km/h · ramp ≤40 Nm/sec · traction ≤80 Nm.

**Until a real named-approver signature record exists for each procedure (owner
review_68, RC-355), every row below sits at `Procedure Approval Status:
APPROVAL_REQUIRED` · `Execution Status: NOT_EXECUTED` · `Result Signoff Status:
NOT_ELIGIBLE` (nothing pre-approved, nothing executed)** — the
`APPROVED_FOR_CONTROLLED_EXECUTION` value below is the *target* state each row
reaches only once `procedure_revision` + `procedure_approver_identity` +
`approval_timestamp` + `approval_signature_record` are captured. **C3A-009B is a
harder case: it stays `APPROVAL_REQUIRED` / `LOCKED` / `NOT_ELIGIBLE`
irrespective of signatures until external-tracking control authority is
established (RC-328/358).**

| Test | Element | Procedure | Expected safe output | Blocked (MUST NEVER OCCUR) | Required Approver |
|---|---|---|---|---|---|
| C3A-001 | pre-run controls + route | pre-flight VCU diagnostic sweep; verify track clearance + runout buffers. **The required clear path + post-target runout is set by the approved Runout Calculation Record for the exact test cell (RC-313); a fixed 50 m is an `INITIAL_FACILITY_TARGET` only and cannot authorize execution by itself.** Artifact: `RunoutCalculation_ID` (test mass · authorized speed · authorized torque/ramp · coast distance · foundation-brake distance · response allowance · surface/grade · measurement uncertainty · safety margin · approved containment plan) | baseline systems clear; runout established by the Runout Calculation Record | execution with spotters in path / inadequate runout / no `RunoutCalculation_ID` | Test Lead |
| C3A-002 | straight-line forward | commanded forward path (per the authorized cell) with steering centred; track drift via external markers vs VCU coordinates | stable linear path; tracking predictable | abrupt lateral pull / uncommanded yaw | Chassis Dynamics Lead |
| C3A-003 | straight-line reverse | commanded reverse path (per the authorized cell) with steering centred; verify reverse-direction register + tracking | rearward path predictable; velocity registers match command | commanded↔actual vector discrepancy | Test Lead |
| C3A-004 | speed-ceiling enforcement | **prove the governor FIRST via HIL/SIL, lifted-wheel/dyno, or a temporarily lowered physical ceiling; then on track issue a commanded speed/torque request exceeding the currently authorized ceiling while approaching from below and verify torque attenuation begins before physical speed crosses the authorized limit (RC-315 — do NOT depend on nearly crossing the highest permitted speed)** | attenuation begins before the boundary; speed capped at the authorized ceiling | velocity overshoot past the authorized governor / first confirmation attempted only at the max cell | Systems Safety Lead |
| C3A-005 | torque command envelope + accel correlation | step pedal per the authorized cell; check the command trajectory against the approved envelope; map against physical acceleration (separate but related quantities) | **commanded torque remains within the approved time-domain command envelope, including torque-rate and jerk limits where applicable (owner review_66, RC-329 — the approved profile may be a nonlinear rate/jerk limiter, S-curve, speed-dependent map, or filtered ramp; NOT "commands rise linearly"); track `T_command`, `dT/dt`, `d²T/dt²`, reported torque, phase current, longitudinal acceleration, jerk** | sudden step-function commands bypassing the rate/jerk filter | Systems Engineer |
| C3A-006 | brake override (straight) | while tracking forward, firmly apply the service brake | **C3A BOS acceptance (owner review_66/67/68, RC-330/342/357 — NO dependency on downstream C3B evidence): the traction command is removed within the approved response window · torque feedback + phase current decay within the approved envelope · **driver brake input, brake-assist state, and hydraulic pressure remain within the approved C3A operating envelope throughout the event (RC-357 — measured pedal state / hydraulic pressure / assist availability / deceleration, not an unmeasured "driver maintains braking control")** · no propulsion opposition to braking.** The separate **C3A/C3B correlation review** (compare this run against the *signed* C3B foundation-brake stopping envelope) happens only AFTER C3B is signed | inverter commanding drive current against active brakes / C3A execution blocked on a not-yet-existent C3B envelope (RC-342) | Controls Director |
| C3A-007 | neutral interruption | at straight-line forward crawl, shift PRND → Neutral | **propulsion torque remains within the supplier-defined Neutral zero-propulsion envelope (owner review_67, RC-345 — not "torque → zero", which is not a supplier-verified reading); torque-producing current drops within the window** | **active propulsion request still asserted · torque-producing current exceeds the approved Neutral envelope · inverter state contradicts supplier-defined Neutral behaviour · unintended vehicle acceleration persists (RC-345/310)** | Test Lead |
| C3A-008 | E-stop / torque removal | at steady forward speed, actuate the remote/hardwired E-stop | **hardwired loop forces the supplier-defined emergency torque-inhibit + HV-isolation response (RC-309, architecture-dependent); inverter current decays within the approved window. Record separate outcomes (owner review_69, RC-376) — E-stop evidence is NOT one combined result, because torque removal, HV isolation, and vehicle stopping are distinct: `torque_inhibit_response` · `phase_current_decay` · `inverter_state_transition` · `HV_isolation_response_if_required` · `contactor_feedback_if_required` · `DC_bus_decay_if_required` · `vehicle_coast_or_brake_response` · `fault_latch_behavior` · `automatic_retry_behavior`** | delayed torque removal / uncoordinated loop response / auto contactor-open outside the approved fault class | Safety Director |
| C3A-009A | path-deviation **observation** (`PENDING_EXECUTION`) | external survey/camera system records deviation vs internal steering signals and provides a **test-team abort indication** | deviation is logged; the test team can abort manually | reliance on a steering-angle signal alone for deviation (RC-316) | Systems Safety Lead |
| C3A-009B | path-deviation **torque-inhibit integration** — **`LOCKED`** | **`Procedure Approval Status: APPROVAL_REQUIRED` · `Execution Status: LOCKED` · `Result Signoff Status: NOT_ELIGIBLE` · `BlockReason: EXTERNAL_TRACKING_CONTROL_AUTHORITY_NOT_ESTABLISHED` (owner review_66/68, RC-328/358).** Unlock prerequisites (ALL required, RC-358): interface architecture approved · signal-integrity analysis complete · latency budget approved · stale/missing-data behaviour approved · failure-mode analysis complete · independent control-authority review signed · HIL validation passed. Only then may the external system drive an automatic VCU torque-inhibit | VCU drops torque to zero on a validated path error — **only once all unlock prerequisites are met** | any automatic VCU authority granted to the external system before its interface/latency/validity/failure-modes/authority are approved (RC-316/328/358) | Systems Safety Lead + Controls Director |
| C3A-010 | repeated-run consistency | 5 consecutive straight-line accel/decel sequences within the authorized cell | metrics tightly grouped within approved boundaries | tracking-latency drift / thermal accumulation / erratic response | Calibration Engineer |

**External tracking is EVIDENCE + human-abort support, not automatic VCU
authority, until C3A-009B's interface is formally approved (RC-316). Path
deviation is measured by independent means (survey marks / camera / calibrated
positioning), not a steering-angle signal alone.**

**C3A-008 E-stop keeps the raw trace, not a single slope (owner review_70,
RC-390) — HARD BLOCK.** The RC-376 separate-outcome fields are recorded as
**timestamps + profile artifacts, not reduced to one rate** — a single
`phase_current_decay` (A/ms) or `DC_bus_decay` (V/ms) slope does not fully
describe behaviour. Store: `event_trigger_timestamp` ·
`torque_inhibit_request_timestamp` · `phase_current_below_threshold_timestamp` ·
`phase_current_peak_after_event` · `phase_current_decay_profile_artifact_id` ·
`inverter_state_before` · `inverter_state_after` · `HV_isolation_start_timestamp` ·
`contactor_feedback_open_timestamp` · `DC_bus_voltage_profile_artifact_id` ·
`vehicle_speed_at_event` · `vehicle_stop_or_controlled_deceleration_result`. The
raw trace is retained rather than collapsed into a single number.

## Subgate 05M-C3B — Coast-Down + Foundation Brakes

Establishes the pure mechanical-deceleration + natural-drag baseline. **Regen is a
control state, not a literal measurement value (owner review_66/67/68,
RC-331/341/356): `Regeneration Command State: ZERO_REGEN_REQUEST`; measured
torque feedback, phase-current behaviour, AND DC-bus current must remain within
the supplier-defined or engineering-approved zero-regeneration tracking
envelope** (measurement noise, drag torque, inverter estimation error, and
supplier-defined switching behaviour still exist — "0 Nm" is a command, not a
guaranteed reading). **The ±2 Nm residual is strictly non-authoritative
(RC-341/356)** — carried only as `ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE`
with `NO_PASS_FAIL_AUTHORITY`; it cannot be fixed across inverters / current
sensors / motor sizes / torque estimators / speeds / field-control states. **"Reactive
field-weakening" is removed as a general justification (RC-356)** unless the
chosen inverter supplier documents that behaviour in this low-speed test region
(at low vehicle speed field weakening may not be relevant). **The zero-regen
residual envelope is conditioned by operating state (owner review_69, RC-375):** a
`ZERO_REGEN_RESIDUAL_INITIAL_TARGET_PROFILE` is not a single fixed number — it is
qualified by **motor speed · DC-bus voltage · pack charge permission · inverter
temperature · motor temperature · gear state · sampling/filtering mode ·
torque-estimator version · firmware/calibration hash**, because a zero-regen
residual may change with operating conditions. The command state is written as the
precise **`ZERO_REGEN_REQUEST` command state**, NOT a "zero-torque profile" —
drivetrain drag or inverter-reported residual torque may still exist. Covers:
C3B-001 zero-torque coast-down
(rolling-resistance / drag model) · C3B-002 foundation-brake stops (mechanical
friction only) · C3B-003 brake-assist stability under repeated stops (no 12 V
brownout) · **C3B-004 (rewritten, RC-317)** · C3B-005 stopping-distance
repeatability · C3B-006 brake-temperature observation.

**C3B-004 — Brake Override with Minimal Authorized Propulsion Request (owner
review_65, RC-317).** The brakes must NOT be required to fight sustained
propulsion torque: (1) apply the **lowest approved propulsion request for the
test cell**; (2) apply the service brake; (3) verify BOS removes the torque
command within the approved response window; (4) **after command removal**,
independently measure foundation-brake stopping; (5) a simulated BOS-latency
fault is evaluated **in HIL or another bounded method, never on a physically
moving vehicle.** Blocked: sustained propulsion torque after a brake request ·
phase current outside the decay envelope · foundation brakes forced to stall a
persistent motor output · any physical simulation of a hazardous BOS delay during
motion.

**C3B-006 — Brake temperature (owner review_65, RC-318):** the thermal authority
is **calibrated contact thermocouples or approved embedded sensors**; infrared is
**supplemental** — IR-only results are labelled `SCREENING_EVIDENCE` /
`NOT_FINAL_THERMAL_AUTHORITY` (emissivity / angle / airflow / shielding / rotor
construction / timing distort IR).

## Subgate 05M-C3C — Restricted Regeneration

Only after C3B `SIGNED_PASS`. **Regeneration Dominance Rule:** regen is
**supplemental deceleration only**; the mechanical foundation brakes remain the
primary, fully-validated stopping authority; **no regen strategy or blend may
reduce, delay, or interfere with required mechanical-brake authority.** Covers:
C3C-001 minimum regen request (≤5 Nm target) · C3C-002 pedal-lift regen response
(≤10 Nm target) · C3C-003 brake-blend boundary · C3C-004 regen inhibit at high
SOC · C3C-005 regen inhibit under BMS restriction · C3C-006 regen removal under
ABS/ESC-related condition · C3C-007 regen fault → foundation braking.

- **ABS/ESC regen-removal two-lane rule (owner review_65, RC-319):** factory
  ABS/ESC stays authoritative, but that does not authorize Elektron to consume
  every observed message as a safety command. **Lane A — approved factory status
  path:** usable **only if Ford-authorized documentation and formal interface
  approval exist.** **Lane B — conversion-side independent wheel-slip
  plausibility:** approved independent sensors or bounded simulation inhibit
  regen **without transmitting to or impersonating ABS/ESC** (extends RC-282).
- **No "instant"/"immediate" regen wording (owner review_65, RC-320):** regen
  inhibit at high SOC / under BMS restriction / on an ABS-ESC condition occurs
  **within the supplier-defined or engineering-approved regen-inhibit response
  window**, not "instantly".
- **Brake-blend is not assumed "linear" (owner review_65, RC-321):** the
  crossover transition must stay **within the approved deceleration continuity,
  pedal-response, pressure-response, and jerk envelope** (blending may be
  nonlinear by design). Track separately: requested regen torque · actual regen
  torque · hydraulic pressure · vehicle deceleration · deceleration jerk · pedal
  position · wheel-speed disagreement · BMS charge-current limit.
- **C3C-003 is coexistence observation, not integrated brake blending (owner
  review_66, RC-332):** the crossover row is renamed **Brake/Regeneration
  Coexistence Observation** — "master-cylinder pressure overlays with inverter
  braking torque" must not imply an integrated blend controller already exists.
  **Lane 1 — independent regen + normal friction braking: observe coexistence
  only. Lane 2 — coordinated brake blending: `BLOCKED` until the pedal model,
  pressure model, deceleration target, failure modes, and control ownership are
  formally approved.**
- **C3C-004 regen availability is BMS-permission-bounded, not a generic high SOC
  (owner review_66, RC-333):** regen availability is bounded by the **active BMS
  charge-power/current permission, pack voltage, cell-voltage ceiling,
  temperature state, contactor state, and supplier-defined operating limits** —
  the authority is the BMS permission, not a generic SOC percentage.
- **C3C-005 uses no arbitrary bus injection (owner review_66, RC-334):** a
  charge-acceptance restriction is asserted via a **supplier-supported test mode,
  an approved signal-substitution fixture, a HIL interface, or bounded
  conversion-side simulation — NO guessed or unauthorized BMS message injection**
  (extends the bounded fault-injection rule RC-297).
- **C3C-007 needs an explicit driver/brake response (owner review_66, RC-335):**
  on a simulated inverter comms fault during regen — **regen request removed · no
  lingering torque-producing or braking current outside the approved decay
  envelope · driver warning asserted · foundation-brake authority remains
  available · the driver applies the service brake per the test plan · the fault
  latches · no automatic regen restoration.** Do NOT imply an automatic transition
  to mechanical braking unless a validated automatic brake-actuation system
  actually exists.
- **C3C-007 fault-latch ownership — not "latches natively" (owner review_67,
  RC-346):** ownership is explicit — **the Inverter reports its comms/fault state
  where supported; the VCU removes the regen request and records the operational
  fault latch; the Build Engine stores the event, evidence, and clearance
  authorization; automatic regeneration restoration is blocked until the
  supplier-defined recovery conditions and the approved service-clear process are
  satisfied.** An **inverter communication loss is distinct from a verified
  inverter shutdown** — if comms disappear the VCU cannot assume what the inverter
  is physically doing, so independent current/torque evidence is required.
- **C3C-007 independent physical-state evidence (owner review_68, RC-359):** a
  loss of inverter communication is an **unknown-state condition** until
  independent evidence establishes torque/current behaviour. Evidence includes,
  as applicable: **phase-current measurement · DC-bus current · motor
  acceleration/deceleration · shaft or wheel-speed response · inverter hardware
  fault output · contactor state where relevant.** **Never rely only on a
  reported torque value from the link that just failed.**
- **C3C-007 wording carries measurement uncertainty + channel health (owner
  review_69, RC-377):** the finding is phrased **"independent evidence establishes
  torque/current behaviour within the approved measurement uncertainty and
  detection envelope"** — NOT "definitively" (an unqualified certainty claim). The
  independent channel is only usable when its health is confirmed: **current-probe
  range and calibration valid · DC-bus sensor valid · speed sensor valid · time
  synchronization valid · no saturation or dropped data.** An "independent" sensor
  that is out of range or unsynchronized is not evidence.
- **`IndependentSensorHealthResult` is a formal record (owner review_70,
  RC-391) — HARD BLOCK:** channel health is captured, not left as an open
  question — `current_probe_calibration_status` · `current_probe_range_valid` ·
  `DC_bus_sensor_status` · `DC_bus_sensor_range_valid` · `motor_speed_sensor_status`
  · `wheel_speed_sensor_status` · `time_sync_status` · `maximum_time_sync_error` ·
  `dropped_frame_count` · `dropped_frame_rate` · `saturation_detected` ·
  `clipping_detected` · `sensor_fault_detected` · `result_status`. **If any
  required independent channel is invalid, `INVERTER_PHYSICAL_STATE = UNKNOWN` and
  `TEST_RESULT = INVALID_TEST` or `NEEDS_REVIEW`** — an unhealthy channel cannot
  resolve the comms-loss unknown state (RC-359).

## Subgate 05M-C3D — Steering-Angle / Propulsion-Envelope Map

**Steering angle is an observation + derating envelope input ONLY — it does not
act as active torque-vectoring / stability control (`NO_TORQUE_VECTORING_AUTHORITY`);
factory ABS/ESC stays authoritative over wheel slip
(`NO_ACTIVE_ABS_ESC_AUTHORITY`).** The map defines a *maximum permitted request*
envelope. Boundaries are partitioned into distinct test cells.

**No numeric angles, speeds, or torque limits are populated until linked to track
geometry, tire sizing, axle ratios, supplier boundaries, and formal engineering
approval (owner review_65/66, RC-322/336):** the wheel-speed envelope reads
`KINEMATIC_MODEL_PENDING_APPROVAL`; Max Regen Request reads
`DISABLED_COMMAND_STATE`; the Abort Response reads
`TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW` (no "Immediate"); Max Traction
Request / Max Ramp Rate read `TEST_CELL_VALUE_PENDING_APPROVAL`. No `≤5% parity`,
literal `0 Nm`, "Hard Clamped", or "Immediate Torque Cutout" appears in the cell
table (RC-336).

| Speed band | Steering-angle band | Max traction / ramp | Max regen request | Wheel-speed envelope | Abort response | Authority status |
|---|---|---|---|---|---|---|
| initial low-speed cell | near-center | `TEST_CELL_VALUE_PENDING_APPROVAL` | `DISABLED_COMMAND_STATE` | `KINEMATIC_MODEL_PENDING_APPROVAL` | `TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW` | `INITIAL_TARGET_PROFILE` |
| initial low-speed cell | moderate turn | `TEST_CELL_VALUE_PENDING_APPROVAL` (further derated) | `DISABLED_COMMAND_STATE` | `KINEMATIC_MODEL_PENDING_APPROVAL` | `TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW` | `INITIAL_TARGET_PROFILE` |
| initial low-speed cell | high steering angle | minimum / blocked pending proof | `DISABLED_COMMAND_STATE` | `KINEMATIC_MODEL_PENDING_APPROVAL` | `TORQUE_INHIBIT_WITHIN_APPROVED_RESPONSE_WINDOW` | `BLOCKED_PENDING_TEST` |
| any band | implausible steering signal | zero propulsion request | zero regen request | n/a | `HARD_BLOCK` | `HARD_BLOCK` |

**C3D kinematic inputs (owner review_65, RC-323) — road-wheel geometry, not
steering-wheel angle alone:** steering-wheel angle · steering ratio · measured or
derived road-wheel angle · wheelbase · front/rear track width · tire rolling
radius · axle ratio · differential type · expected inner/outer wheel-speed ratio
· vehicle yaw rate (if independently measured). For a chassis-cab platform,
body/upfit loading affects tire deflection and tracking.

**C3D steering-signal validity state matrix (owner review_66/67, RC-337/343/344)
— a frozen/old steering value must NOT keep authorizing torque; no "immediate"
wording (response windows only, RC-343):**

| Steering-signal state | Authority |
|---|---|
| `VALID` | operate within the approved cell |
| `DEGRADED` | derating occurs **within the approved degraded-state response window** and envelope progression is inhibited (RC-343 — not "immediate") |
| `IMPLAUSIBLE` | a torque-inhibit request occurs **within the approved steering-fault response window** and a non-volatile fault is latched (RC-343) |
| `UNAVAILABLE` | no steering-dependent envelope expansion |
| `STALE` | **judged by signal freshness, NOT an unchanged value (owner review_67, RC-344):** the timestamp age / alive counter / update cadence / freshness indicator exceeds its approved limit → treat as invalid and drop propulsion authority. **A constant but freshly-updated valid value is NOT stale** (a steering signal can legitimately stay unchanged while driving straight) |

**Validity and freshness are SEPARATE axes (owner review_68, RC-360):** the
record carries a `signal_validity_state` AND a `signal_freshness_state` — a fresh
signal can still be implausible, and an otherwise plausible value can be stale.
The combined evaluation resolves to one of **`VALID_AND_FRESH` /
`VALID_BUT_DEGRADED` / `IMPLAUSIBLE_BUT_FRESH` / `STALE` / `UNAVAILABLE`.**

**Deterministic state precedence (owner review_69, RC-378) — HARD BLOCK:** when a
signal is simultaneously stale AND implausible the resolution must be
deterministic, not ambiguous. The resolved state follows a fixed
engineering-approved precedence — **`UNAVAILABLE` > `STALE` >
`IMPLAUSIBLE_BUT_FRESH` > `VALID_BUT_DEGRADED` > `VALID_AND_FRESH`** — OR validity
and freshness are computed independently and mapped through an engineering-approved
decision table. The exact priority is engineering-approved, but it **must be
deterministic** (the same inputs always resolve to the same state).

**Deterministic three-axis resolution — no catch-all row (owner review_70,
RC-392) — HARD BLOCK:** the earlier "Any/Any → UNAVAILABLE" style row would
technically override every other row, so the resolution is computed from three
explicit input axes and a fixed order, not a lookup row: `availability_state`
(`AVAILABLE` / `UNAVAILABLE`) · `freshness_state` (`FRESH` / `STALE`) ·
`validity_state` (`VALID` / `DEGRADED` / `IMPLAUSIBLE`).

```
if   availability_state == UNAVAILABLE: UNAVAILABLE
elif freshness_state    == STALE:       STALE
elif validity_state     == IMPLAUSIBLE: IMPLAUSIBLE_BUT_FRESH
elif validity_state     == DEGRADED:    VALID_BUT_DEGRADED
else:                                   VALID_AND_FRESH
```

This is directly hard-codable and testable, and it removes the catch-all
ambiguity while preserving the RC-378 precedence order.

**Steering fault recovery rules (owner review_69, RC-379) — HARD BLOCK:** **no
steering fault state may automatically restore propulsion authority.** Recovery
requires **ALL** of: signal freshness restored · plausibility restored for the
approved stabilization interval · fault-source review · an approved recovery state
transition · no active conflicting fault · test-lead authorization where required.
**For latched faults, a service clear is required — never automatic recovery.**

**Per-state recovery model — temporary derating vs latched (owner review_70,
RC-393) — HARD BLOCK:** recovery differs by resolved state, and **no state
silently restores propulsion authority while a conflicting fault remains
active**:

- **`VALID_BUT_DEGRADED`** — may return after the approved stabilization interval
  **if not latched**.
- **`IMPLAUSIBLE_BUT_FRESH`** — **latched**; requires diagnostic review + an
  approved clear.
- **`STALE`** — requires freshness recovery + stabilization; a **service clear**
  is required if the fault policy marks it latched.
- **`UNAVAILABLE`** — movement stays blocked until the source is restored and
  verified.

## Subgate 05M-C3E — Closed-Area Fault + Abort Sequences

Integrates the prior blocks under compound-fault conditions via
**simulation-controlled or supplier-supported methods only** (RC-297). Passes
only if faults latch cleanly into NVM, traction torque is removed via the
designated abort hierarchy, and all automated retry / unvalidated re-power is
blocked pending an engineering diagnostic clear (RC-290).

**Cell-based fault escalation (owner review_65, RC-324) — HARD BLOCK.** Faults
begin at the **lowest signed operating-envelope cell**, NOT automatically at 15
km/h. No fault repeats at a higher cell until: the lower cell has `SIGNED_PASS` ·
fault containment is proven · runout remains valid · thermal state is acceptable
· the test lead separately authorizes escalation.

**C3E Fault Escalation Hierarchy (owner review_66, RC-338) — the hierarchy is now
listed, not just announced:**

- **Level 1 — single fault:** APPS plausibility fault · steering signal
  invalid/stale · wheel-speed disagreement · inverter heartbeat loss · BMS
  charge-permission removal · brake-assist-not-ready · steering-assist-not-ready ·
  auxiliary-voltage low · test-boundary alert · E-stop activation.
- **Level 2 — repeated single fault:** repeat each approved Level 1 fault across
  the permitted cells; verify latch consistency · no auto-retry · thermal/recovery
  state.
- **Level 3 — approved paired fault:** signal fault + communication loss · assist
  fault + torque request · regen request + charge-permission removal · steering
  plausibility fault + wheel-speed disagreement · low-voltage event + active
  propulsion request.
- **Level 4 — compound fault:** only after Level 1–3 signed passes **and a formal
  hazard review**; every pair needs an approved rationale — **faults are never
  combined randomly.**

**Fault-execution-domain classification (owner review_67, RC-347) — HARD BLOCK.**
**A fault being listed in C3E does NOT automatically authorize its physical
injection during vehicle movement.** Every listed fault carries a
`FAULT_EXECUTION_DOMAIN` of `SIL_ONLY` / `HIL_ONLY` / `STATIC_VEHICLE_ONLY` /
`LIFTED_WHEEL_ONLY` / `LOWEST_MOVING_CELL_ALLOWED` /
`HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS`. Examples: an APPS plausibility fault runs
HIL → static vehicle → lowest moving cell if approved; **brake-assist-not-ready
and steering-assist-not-ready are proven in HIL/static inhibition first and
steering assistance is never intentionally removed while moving**; a low-voltage
fault runs HIL/bounded-supply first, with moving execution only after
voltage-transition containment is proven.

**Execution Domain Progression Rule (owner review_68, RC-361) — HARD BLOCK: a
domain arrow is a possible REVIEW PATH, NOT automatic authorization.** Each
domain transition (e.g. HIL → static → lowest moving cell) requires **ALL** of:
the prior-domain `SIGNED_PASS` · an approved injection method · an updated hazard
analysis · a valid runout calculation · an active `TestCellAuthorization` · a
configuration lock · test-lead authorization.

**Each specific fault execution needs its own authorization record (owner
review_69, RC-380) — HARD BLOCK.** A general execution-domain matrix is useful,
but the specific fault execution still needs its own **`FaultExecutionAuthorization_ID`**
record: `fault_id` · `execution_domain` · `injection_method` ·
`previous_domain_signed_result` · `HazardAnalysis_ID` · `ConfigurationPacket_ID` ·
`TestCellAuthorization_ID` · `RunoutCalculations_ID` · `expected_response` ·
`abort_conditions` · `containment_method` · `required_approvers` · `status`.

**`FaultExecutionAuthorization_ID` also carries execution/result lifecycle fields
(owner review_70, RC-394) — HARD BLOCK:** so a single-fault record is governed as
tightly as a paired-fault record, it additionally carries `procedure_revision` ·
`procedure_approval_status` · `execution_status` · `result_signoff_status` ·
`authorization_expiry` · `configuration_impact_status` · `supersession_id` ·
`injection_fixture_id`.

**Tighter moving-fault limits (owner review_68, RC-362) — HARD BLOCK.**
**Brake-assist-not-ready:** moving execution is blocked by default; a moving test
occurs only if engineering can **simulate the status input WITHOUT physically
removing actual braking assistance.** **Steering-assist-not-ready:** assist is
**never removed while moving** — any moving evaluation uses a bounded logical
status simulation while real steering assistance stays physically available.
**Auxiliary-voltage low:** a bounded moving supply test requires a minimum
guaranteed brake-assist voltage · a minimum guaranteed steering-assist voltage ·
independent supply protection · hardware undervoltage limits · an abort threshold
· defined recovery behaviour — **the test must never intentionally cross into an
actual loss of steering or brake assistance.**

**Paired/compound-fault prerequisites (owner review_67/68, RC-348/363) — HARD
BLOCK.** Level 3/4 need more than a general rationale — each requires a full
**`PairedFaultAuthorization_ID`** record: `primary_fault_id` · `secondary_fault_id`
· `fault_order` · `inter_fault_delay_ms` · `injection_method` ·
`expected_state_sequence` · `abort_trigger` · `abort_owner` · `containment_method`
· `allowed_execution_domain` · `active_test_cell` · `HazardAnalysis_ID` ·
`ConfigurationPacket_ID` · `RunoutCalculations_ID` · `required_approvers` ·
`status`. **Fault order + timing offsets are stored, and the reverse ordering is
a SEPARATE record** — `LOW_VOLTAGE_THEN_CAN_LOSS` ≠ `CAN_LOSS_THEN_LOW_VOLTAGE`
(RC-363).

**Paired-fault result + lifecycle fields (owner review_69, RC-381) — HARD
BLOCK:** the `PairedFaultAuthorization_ID` record additionally carries
`allowed_execution_domain` · `active_test_cell_id` · `injection_fixture_id` ·
`procedure_revision` · `procedure_approval_status` · `execution_status` ·
`result_signoff_status` · `authorization_expiry` · `configuration_impact_status` ·
`replacement_or_supersession_id`. The **`expected_response_sequence_map` must be
versioned and validated — NOT arbitrary ungoverned JSON.**

**Paired faults are keyed by exact fault IDs, not only component IDs (owner
review_70, RC-395) — HARD BLOCK:** because one component can exhibit many distinct
failure modes, the record carries **`fault_1_id` · `fault_2_id`** (optionally
retaining `fault_1_component_id` · `fault_2_component_id`). The `fault_1_id` /
`fault_2_id` combination must identify the exact failure mode, not merely the
affected component.

**Database foreign-key enforcement — no orphaned references (owner review_70,
RC-396) — HARD BLOCK:** all critical IDs are foreign-key constrained —
`RunoutCalculations_ID` · `ConfigurationPacket_ID` · `TestCellAuthorization_ID` ·
`HazardAnalysis_ID` · `previous_cell_signed_result_id` · `source_artifact_id` ·
`proof_artifact_id` · `ProcedureApproval_ID` · `FaultExecutionAuthorization_ID` ·
`PairedFaultAuthorization_ID`. **A record with an orphaned reference is
hard-blocked** (this is doctrine for the eventual M10 schema, not production code
built during ingestion).

## No-claim rule (owner review_69, RC-382) — HARD RULE

**Completion of Gate 05M-C3 does NOT establish:** public-road approval ·
regulatory compliance · production release · customer-operation authority ·
full-speed validation · durability validation · crashworthiness · certified brake
performance. **It only establishes performance within the exact signed
closed-area test envelope and configuration.**

**Scope limitation, restated for the schema (owner review_70, RC-397):** a
`SIGNED_PASS` within Gate 05M-C3 proves **only that the exact archived vehicle
configuration performed within the signed closed-area operating envelope under the
recorded conditions.** It does not establish public-road authorization ·
regulatory compliance · production release · customer-operation authorization ·
full-speed performance · durability · crashworthiness · certified braking
compliance · **and NO reuse on another vehicle or configuration** (a signed result
is configuration-bound, RC-339/349; platform separation, D-006).

## Standing checks

- **Controlled closed-area low-speed movement only, engineer-gated, live-HV,
  closed area only, no public road / no customer / no normal-driving authority.**
  Built as five linear subgates (C3A→C3E); each expansion needs separate evidence
  + signoff. Every number is `INITIAL_TARGET_PROFILE` with no authority until
  fully linked (RC-300); the four-field approval record separates procedure
  approval from result signoff (RC-299); nothing is `SIGNED_PASS`.
- **Steering angle is observation/derating only, never torque-vectoring authority
  (RC-323); factory ABS/ESC stays authoritative and is never consumed as a
  control command without Ford-authorized docs + engineering approval (RC-282/319);
  CAN_1 electrically passive (RC-304); wheel-speed read-only (RC-282); a path
  deviation / software fault does not auto-open HV contactors unless the approved
  architecture dictates (RC-309); regen is supplemental, foundation brakes primary
  (RC-321); no "instant/immediate" wording (RC-288/320); never "certified safe"
  (RC-224).**
- **Revision 02 record-integrity cleanups (owner review_66, RC-327..339):** the
  full `RunoutCalculation_ID` field list + `L_min` equation (RC-327); C3A-009B
  stays `LOCKED` until external-tracking control authority is established
  (RC-328); the torque command is judged against an approved time-domain envelope
  (torque-rate + jerk), not "linear" (RC-329); BOS torque removal is separate from
  the foundation-brake stop (RC-330); regen-disabled is a command state, not a
  literal 0 Nm reading (RC-331); C3C-003 is coexistence observation, with true
  brake blending BLOCKED until modelled (RC-332); regen availability is
  BMS-permission-bounded, not a generic high SOC (RC-333); no arbitrary bus
  injection — supplier/HIL/fixture/bounded-sim only (RC-334); C3C-007 has an
  explicit driver/brake response, no assumed auto-brake (RC-335); C3D carries no
  premature numbers / no "immediate" (RC-336); steering-signal validity states
  VALID/DEGRADED/IMPLAUSIBLE/UNAVAILABLE/STALE (RC-337); the C3E fault hierarchy
  is listed L1–L4 (RC-338); the Test Result Validity Rule ties a signed result to
  its archived configuration (RC-339).
- **Revision 03 baseline-candidate cleanups (owner review_67, RC-340..350):** the
  explicit `L_min` equation + no-double-count warning + `distance_component_method`
  enum + movement-authorization gate (RC-340); the ±2 Nm zero-regen residual is a
  candidate, not a universal constant (RC-341); the circular C3A→C3B dependency is
  removed — C3A BOS acceptance stands alone, C3A/C3B correlation is a later review
  (RC-342); "immediate" removed from the steering states → response windows
  (RC-343); `STALE` is judged by signal freshness, not an unchanged value (RC-344);
  C3A-007 uses the supplier-defined Neutral zero-propulsion envelope (RC-345);
  C3C-007 fault ownership is explicit (Inverter/VCU/Build Engine) and comms-loss ≠
  verified shutdown (RC-346); the C3E `FAULT_EXECUTION_DOMAIN` classification means
  a listed fault does not authorize physical injection during motion (RC-347);
  paired/compound faults need a `PairedFaultAuthorization_ID` + `HazardAnalysis_ID`
  + fault-order/timing (RC-348); invalidated evidence is preserved as
  `INVALIDATED_FOR_CURRENT_CONFIGURATION`, never cleared (RC-349); and the full
  `TestCellAuthorization_ID` schema + lifecycle is defined (RC-350). C3A-009B stays
  `LOCKED` (RC-328, re-affirmed review_67).
- **Revision 04 database-semantics cleanups (owner review_68, RC-351..363):**
  overlap is handled by preserving component values, never zero-clamping (RC-351);
  the Distance Accounting Integrity Rule + component schema counts every metre
  once (RC-352); the immutable result lifecycle is spelled out
  (`SIGNED_RESULT → … → SUPERSEDED_FOR_CURRENT_CONFIGURATION`, evidence never
  deleted, RC-353); `TestCellAuthorization` status transitions are constrained
  (no `DRAFT`→`ACTIVE` jump, RC-354); procedure approval requires a real
  named-approver signature, otherwise `APPROVAL_REQUIRED` (RC-355); the ±2 Nm
  residual is strictly non-authoritative + DC-bus current tracked + field-weakening
  justification removed (RC-356); C3A-006 measures brake input / assist state /
  hydraulic pressure, not "maintains braking control" (RC-357); C3A-009B carries
  a `BlockReason` + seven unlock prerequisites (RC-358); after inverter comms loss
  independent physical evidence is required (RC-359); steering validity and
  freshness are separate axes (RC-360); execution-domain arrows are review paths,
  not automatic authorization (RC-361); moving brake/steering-assist + aux-voltage
  faults have tighter limits (RC-362); the full `PairedFaultAuthorization_ID`
  schema + reverse-order-is-a-separate-record rule (RC-363).
- **Revision 05 controlled-validation-architecture cleanups (owner review_69,
  RC-369..382):** every numeric authorization field carries unit + provenance +
  hard validation constraints (RC-369); every authorization transition is an
  immutable `AuthorizationTransition_ID` audit event and `SUSPENDED → AUTHORIZED`
  requires revalidation (RC-370); `COMPLETED` is separated from `SIGNED_PASS` and
  never clears a gate (RC-371); a `RunoutAggregationResult` summary hard-blocks on
  track length / margin / unit / overlap (RC-372); boundary ordering + geometry
  consistency is validated and inconsistent overlap combinations are rejected
  (RC-373); evidence is append-only — annotations are new linked records, never
  overwrites (RC-374); the zero-regen residual envelope is conditioned by operating
  state and written as the `ZERO_REGEN_REQUEST` command state (RC-375); C3A-008
  E-stop records separate outcomes for torque removal / HV isolation / stopping
  (RC-376); C3C-007 carries measurement uncertainty + channel-health instead of
  "definitively" (RC-377); steering-state resolution is deterministic by approved
  precedence (RC-378); steering faults never auto-restore propulsion and latched
  faults need a service clear (RC-379); each specific fault execution needs its own
  `FaultExecutionAuthorization_ID` (RC-380); the paired-fault record gains result +
  lifecycle fields and a versioned `expected_response_sequence_map` (RC-381); and
  the explicit no-claim rule bounds any completion to the signed closed-area
  envelope (RC-382).
- **Revision 06 implementation-correctness cleanups (owner review_70,
  RC-383..397):** the overlap rules + full `PHYSICAL_MOVEMENT_BLOCKED` conditions
  are enforced in text, not just schema-shaped (RC-383); `allowed_steering_band` is
  a bounded min/max record with an explicit angle frame (RC-384); `unit` is a
  controlled enum with canonical-SI comparison (RC-385); `AUTHORIZED → ACTIVE`
  carries activation preconditions + a single-ACTIVE rule (RC-386); `COMPLETED` is
  an execution state and the three status enums are separated (RC-387); an
  `EXPIRED` authorization state is added (RC-388); procedure approval is a signed
  `ProcedureApproval_ID` record (RC-389); C3A-008 E-stop keeps the raw trace +
  timestamps, not a single slope (RC-390); `IndependentSensorHealthResult` is a
  formal record and an invalid channel forces `INVERTER_PHYSICAL_STATE = UNKNOWN`
  (RC-391); steering resolution is a deterministic three-axis computation with no
  catch-all row (RC-392); a per-state recovery model separates temporary derating
  from latched faults (RC-393); `FaultExecutionAuthorization_ID` gains
  execution/result lifecycle fields (RC-394); paired faults are keyed by exact
  `fault_1_id`/`fault_2_id` (RC-395); all critical IDs are foreign-key constrained
  with orphaned references hard-blocked (RC-396); and the scope limitation adds the
  explicit no-reuse-on-another-configuration clause (RC-397). Owner items 1
  (`L_min` OCR text) and 3 (typographical field-name corruption) targeted the
  Hunter's delivered text only — already clean/canonical here (RC-340/351 + the
  canonical field names throughout).
- **Nothing ingested; nothing Confirmed; no normal driving; no public road; no
  customer operation; no "certified safe"/compliance claim; ODRs untouched; no
  production code / no M10 during ingestion (the owner's downstream
  `DATABASE_SCHEMA_IMPLEMENTATION → RULE_ENGINE_TESTS → HIL_VALIDATION` is deferred
  M10/production work).**

## Next — controlled specification freeze

After the fourteen review_65 corrections (RC-313..326), the thirteen review_66
corrections (Revision 02, RC-327..339), the eleven review_67 corrections
(Revision 03, RC-340..350), the thirteen review_68 corrections (Revision 04,
RC-351..363), the fourteen review_69 corrections (Revision 05, RC-369..382 —
items 1 & 5 already clean) and the fifteen review_70 corrections (Revision 06,
RC-383..397 — owner items 1 & 3 targeted the Hunter's OCR/typographical text only)
the gate labels
`GATE_05M_C3_REVISION_06_READY_FOR_CONTROLLED_SPECIFICATION_FREEZE` — the
controlled-validation architecture is mature and ready to freeze the specification,
while all physical pass claims remain correctly unproven; it does **not** mean any
vehicle / calibration / brake system / regeneration strategy / moving fault test
has physically passed. **The owner's downstream sequence — controlled
specification freeze → `DATABASE_SCHEMA_IMPLEMENTATION` → `RULE_ENGINE_TESTS` →
`HIL_VALIDATION` — is M10/production work and is NOT performed during Rev 07
ingestion** (CLAUDE.md); the frozen specification stays a governance document until
the owner opens the production phase. Subgate execution and cell authorizations
(each a `TestCellAuthorization_ID`, RC-350/354, with per-field units + validation
RC-369/385, immutable transitions RC-370, activation preconditions RC-386, and the
`EXPIRED` state RC-388) are defined when the owner sends those batches; supplier
data (Ford ABS/ESC interface, inverter/BMS regen + isolation architecture,
tire/axle/geometry, thermal sensors) remains NeedsSupplierData.
