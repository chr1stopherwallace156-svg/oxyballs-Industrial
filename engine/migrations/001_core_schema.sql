-- M10A — Schema normalization (frozen source spec: Gate 05M-C3 Revision 08, RC-313..425)
-- Article VI (version everything): applied via schema_migrations; no destructive
-- migration against evidence-bearing tables. All enums are CHECK-constrained.
-- No engineering values are stored here — only structure.

-- ─────────────────────────────────────────────────────────────────────────────
-- Identity / configuration (RC-325/409/421, D-006 platform separation)
-- ─────────────────────────────────────────────────────────────────────────────

-- IndividualVehicle 1:N VehicleBuild 1:N ConfigurationPacket (review_73 pt 5):
-- a vehicle may undergo multiple builds/configuration revisions over time.
CREATE TABLE IndividualVehicle (
  individual_vehicle_id       TEXT PRIMARY KEY,
  vin                         TEXT,
  platform_id                 TEXT NOT NULL,
  status                      TEXT NOT NULL DEFAULT 'DRAFT'
);

CREATE TABLE VehicleBuild (
  vehicle_build_id            TEXT PRIMARY KEY,
  individual_vehicle_id       TEXT NOT NULL REFERENCES IndividualVehicle(individual_vehicle_id),
  platform_configuration_id   TEXT NOT NULL,
  description                 TEXT,
  build_timestamp             TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT'
);

CREATE TABLE ConfigurationPacket (
  configuration_packet_id     TEXT PRIMARY KEY,
  individual_vehicle_id       TEXT NOT NULL REFERENCES IndividualVehicle(individual_vehicle_id),
  vehicle_build_id            TEXT NOT NULL REFERENCES VehicleBuild(vehicle_build_id),
  platform_configuration_id   TEXT NOT NULL,
  config_hash                 TEXT NOT NULL,
  vcu_firmware_hash           TEXT,
  inverter_firmware_hash      TEXT,
  bms_pdu_firmware_hash       TEXT,
  calibration_hash            TEXT,
  dbc_hash                    TEXT,
  status                      TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at                  TEXT NOT NULL
);

CREATE TABLE VehicleComponentInstance (
  component_id                TEXT PRIMARY KEY,
  subsystem_name              TEXT NOT NULL CHECK (subsystem_name IN
                                ('VCU','INVERTER','BMS','PDU','APPS','BRAKE_ASSIST_UNIT',
                                 'STEERING_ASSIST_UNIT','DC_DC_CONVERTER','WHEEL_SPEED_SENSOR')),
  serial_number               TEXT,
  hardware_revision           TEXT,
  -- RC-420: configuration linkage (serial + hw rev alone do not establish config)
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  individual_vehicle_id       TEXT NOT NULL REFERENCES IndividualVehicle(individual_vehicle_id),
  platform_id                 TEXT NOT NULL,
  installation_location       TEXT,
  software_or_firmware_version TEXT,
  supplier_part_number        TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Evidence / governance primitives
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE DocumentArchive (
  document_archive_id         TEXT PRIMARY KEY,
  artifact_type               TEXT NOT NULL,
  content_hash                TEXT NOT NULL,
  storage_path                TEXT,
  created_at                  TEXT NOT NULL
);

CREATE TABLE SignoffRecord (
  signoff_record_id           TEXT PRIMARY KEY,
  signer_identity             TEXT NOT NULL,
  signature_hash              TEXT NOT NULL,
  scope                       TEXT,
  timestamp                   TEXT NOT NULL
);

CREATE TABLE HazardAnalysis (
  hazard_analysis_id          TEXT PRIMARY KEY,
  description                 TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT',
  revision                    TEXT
);

CREATE TABLE TelemetryLog (
  telemetry_log_id            TEXT PRIMARY KEY,
  packet_hash                 TEXT NOT NULL,
  created_at                  TEXT NOT NULL
);

-- RC-391/403: instrumentation / independent-sensor health
CREATE TABLE InstrumentationRecord (
  instrumentation_record_id   TEXT PRIMARY KEY,
  current_probe_calibration_status TEXT NOT NULL CHECK (current_probe_calibration_status IN ('VALID','INVALID')),
  current_probe_range_valid   TEXT NOT NULL CHECK (current_probe_range_valid IN ('PASS','FAIL')),
  dc_bus_sensor_status        TEXT NOT NULL CHECK (dc_bus_sensor_status IN ('VALID','INVALID')),
  dc_bus_sensor_range_valid   TEXT NOT NULL CHECK (dc_bus_sensor_range_valid IN ('PASS','FAIL')),
  motor_speed_sensor_status   TEXT NOT NULL CHECK (motor_speed_sensor_status IN ('VALID','INVALID')),
  wheel_speed_sensor_status   TEXT NOT NULL CHECK (wheel_speed_sensor_status IN ('VALID','INVALID')),
  time_sync_status            TEXT NOT NULL CHECK (time_sync_status IN ('SYNCHRONIZED','UNSYNCHRONIZED')),
  dropped_frame_count         INTEGER NOT NULL DEFAULT 0,
  saturation_detected         INTEGER NOT NULL DEFAULT 0,
  clipping_detected           INTEGER NOT NULL DEFAULT 0,
  sensor_fault_detected       INTEGER NOT NULL DEFAULT 0,
  result_status               TEXT NOT NULL CHECK (result_status IN ('VALID','INVALID'))
);

-- RC-419: FaultDefinition registry (layer-1 parent for fault_id; ties to D-009)
CREATE TABLE FaultDefinition (
  fault_id                    TEXT PRIMARY KEY,
  fault_code                  TEXT NOT NULL,
  fault_name                  TEXT NOT NULL,
  fault_domain                TEXT,
  description                 TEXT,
  detection_method            TEXT,
  default_severity            TEXT,
  default_execution_domain    TEXT CHECK (default_execution_domain IN
                                ('SIL_ONLY','HIL_ONLY','STATIC_VEHICLE_ONLY','LIFTED_WHEEL_ONLY',
                                 'LOWEST_MOVING_CELL_ALLOWED','HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS')),
  default_latch_policy        TEXT,
  required_evidence_profile_id TEXT,
  applicability_scope         TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT',
  revision                    TEXT
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Typed numeric fields (RC-369/385/412) — unit is a controlled enum; every value
-- carries provenance; canonical-SI comparison is done in the service layer.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE TypedNumericField (
  typed_numeric_field_id      TEXT PRIMARY KEY,
  value                       REAL NOT NULL,
  unit                        TEXT NOT NULL CHECK (unit IN
                                ('m','m/s','m/s^2','m/s^3','Nm','Nm/s','Nm/s^2','deg','deg/s',
                                 'rad','rad/s','A','A/s','V','V/s','Pa','kPa','bar','ms','s','kg','percent')),
  authority_class             TEXT NOT NULL CHECK (authority_class IN
                                ('MEASURED','CALCULATED','SUPPLIER_DEFINED','ENGINEERING_APPROVED','INITIAL_TARGET_PROFILE')),
  source_artifact_id          TEXT REFERENCES DocumentArchive(document_archive_id),
  measurement_or_calculation_uncertainty REAL,
  effective_revision          TEXT
);

CREATE TABLE AllowedSteeringBand (
  allowed_steering_band_id    TEXT PRIMARY KEY,
  minimum_angle_field_id      TEXT NOT NULL REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_angle_field_id      TEXT NOT NULL REFERENCES TypedNumericField(typed_numeric_field_id),
  reference_frame             TEXT NOT NULL CHECK (reference_frame IN
                                ('STEERING_WHEEL_ANGLE','ROAD_WHEEL_ANGLE','DERIVED_ROAD_WHEEL_ANGLE')),
  authority_class             TEXT NOT NULL CHECK (authority_class IN ('ENGINEERING_APPROVED','SUPPLIER_DEFINED')),
  source_artifact_id          TEXT REFERENCES DocumentArchive(document_archive_id),
  uncertainty_rad             REAL
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Runout (RC-340/352/372/373/383/401/402)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE RunoutCalculations (
  runout_calculations_id      TEXT PRIMARY KEY,
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  calculation_revision        TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT',
  created_at                  TEXT NOT NULL
);

CREATE TABLE DistanceComponent (
  distance_component_id       TEXT PRIMARY KEY,
  runout_calculations_id      TEXT NOT NULL REFERENCES RunoutCalculations(runout_calculations_id),
  zone_start_reference        REAL NOT NULL,
  zone_end_reference          REAL NOT NULL,
  distance_component_value     REAL NOT NULL,
  distance_component_method    TEXT NOT NULL CHECK (distance_component_method IN
                                ('MEASURED','CALCULATED','SUPPLIER_DEFINED','ENGINEERING_APPROVED','INITIAL_TARGET_PROFILE')),
  -- review_73 pt 10: the canonical L_min term this component represents
  distance_component_type      TEXT CHECK (distance_component_type IN
                                ('L_acceleration','L_stabilization','L_braking_target','L_worst_case_coast_or_stop',
                                 'L_response_allowance','L_measurement_uncertainty','L_containment_margin','OTHER')),
  uncertainty_m               REAL NOT NULL DEFAULT 0,
  included_in_l_min           INTEGER NOT NULL CHECK (included_in_l_min IN (0,1)),
  included_within_component_id TEXT REFERENCES DistanceComponent(distance_component_id),
  overlap_review_status       TEXT NOT NULL CHECK (overlap_review_status IN
                                ('INCLUDED_SEPARATELY','INCLUDED_IN_OTHER_COMPONENT','NOT_APPLICABLE','BLOCKED_PENDING_REVIEW')),
  overlap_review_approver_id  TEXT REFERENCES SignoffRecord(signoff_record_id),
  proof_artifact_id           TEXT REFERENCES DocumentArchive(document_archive_id),
  authority_status            TEXT NOT NULL CHECK (authority_status IN
                                ('DRAFT','MISSING_SOURCE','UNVERIFIED','INITIAL_TARGET_PROFILE_ONLY',
                                 'ARTIFACT_DEFINED','ENGINEERING_APPROVED','REVOKED','SUPERSEDED')),
  -- RC-373 geometry: end >= start
  CHECK (zone_end_reference >= zone_start_reference),
  -- review_73 pt 9: value ≈ (end - start) within uncertainty, enforced at the schema
  CHECK (abs(distance_component_value - (zone_end_reference - zone_start_reference)) <= uncertainty_m + 0.000001),
  -- RC-373 overlap consistency
  CHECK (
    (overlap_review_status = 'INCLUDED_IN_OTHER_COMPONENT' AND included_in_l_min = 0 AND included_within_component_id IS NOT NULL)
    OR (overlap_review_status = 'INCLUDED_SEPARATELY' AND included_in_l_min = 1 AND included_within_component_id IS NULL)
    OR (overlap_review_status IN ('NOT_APPLICABLE','BLOCKED_PENDING_REVIEW'))
  ),
  -- review_73 pt 8: ARTIFACT_DEFINED requires a linked proof artifact
  CHECK (authority_status != 'ARTIFACT_DEFINED' OR proof_artifact_id IS NOT NULL)
);

CREATE TABLE RunoutAggregationResult (
  runout_aggregation_result_id TEXT PRIMARY KEY,
  runout_calculations_id      TEXT NOT NULL REFERENCES RunoutCalculations(runout_calculations_id),
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  test_cell_authorization_id  TEXT,   -- FK added after TestCellAuthorization exists (see below)
  calculated_l_min            REAL,
  available_track_length      REAL,
  remaining_margin            REAL,
  approved_minimum_margin     REAL,
  overlap_check_result        TEXT CHECK (overlap_check_result IN ('PASS','FAIL')),
  unit_consistency_result     TEXT CHECK (unit_consistency_result IN ('PASS','FAIL')),
  required_component_completion_result TEXT CHECK (required_component_completion_result IN ('PASS','FAIL')),
  calculation_version         TEXT,
  calculation_hash            TEXT,
  authorization_status        TEXT NOT NULL DEFAULT 'DRAFT' CHECK (authorization_status IN
                                ('DRAFT','SIGNED_RELEASE','REVOKED','REVOKED_PENDING_RECALCULATION'))
);

-- RC-400/417: junction with composite PK (frozen calculation snapshot, RC-401)
CREATE TABLE RunoutAggregationComponent (
  runout_aggregation_result_id TEXT NOT NULL REFERENCES RunoutAggregationResult(runout_aggregation_result_id),
  distance_component_id        TEXT NOT NULL REFERENCES DistanceComponent(distance_component_id),
  PRIMARY KEY (runout_aggregation_result_id, distance_component_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Test-cell authorization (RC-350/354/384/386/387/388/408/413/418)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE ProcedureApproval (
  procedure_approval_id       TEXT PRIMARY KEY,
  test_id                     TEXT NOT NULL,
  procedure_revision          TEXT NOT NULL,
  approver_identity           TEXT,
  signature_hash              TEXT,
  approval_timestamp          TEXT,
  approval_scope              TEXT,
  authorization_expiry        TEXT,
  linked_hazard_analysis      TEXT REFERENCES HazardAnalysis(hazard_analysis_id),
  status                      TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','APPROVED'))
);

CREATE TABLE TestCellAuthorization (
  test_cell_authorization_id  TEXT PRIMARY KEY,
  subgate_id                  TEXT NOT NULL,
  cell_number                 INTEGER NOT NULL,
  maximum_speed_field_id           TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_positive_torque_field_id TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_negative_torque_field_id TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_torque_rate_field_id     TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_jerk_field_id            TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  maximum_test_distance_field_id   TEXT REFERENCES TypedNumericField(typed_numeric_field_id),
  allowed_steering_band_id    TEXT REFERENCES AllowedSteeringBand(allowed_steering_band_id),
  allowed_regen_state         TEXT CHECK (allowed_regen_state IN
                                ('ZERO_REGEN_REQUEST','REGEN_MONITOR_ONLY','RESTRICTED_REGEN_ALLOWED',
                                 'COEXISTENCE_OBSERVATION_ALLOWED','COORDINATED_BLEND_BLOCKED','REGEN_PROHIBITED')),
  runout_calculations_id      TEXT REFERENCES RunoutCalculations(runout_calculations_id),
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  runout_aggregation_result_id TEXT REFERENCES RunoutAggregationResult(runout_aggregation_result_id),
  procedure_approval_id       TEXT REFERENCES ProcedureApproval(procedure_approval_id),
  -- review_73 pt 7: FK to TestResult (SQLite permits a forward reference; the parent
  -- table is created later in this same migration and the FK is enforced at INSERT).
  previous_cell_signed_result_id TEXT REFERENCES TestResult(test_result_id),
  requires_previous_signed_pass INTEGER NOT NULL DEFAULT 0 CHECK (requires_previous_signed_pass IN (0,1)),
  thermal_state_requirement   TEXT,
  surface_environmental_window TEXT,
  authorized_track_distance   REAL,
  available_track_length      REAL,
  environmental_window_valid  INTEGER NOT NULL DEFAULT 0 CHECK (environmental_window_valid IN (0,1)),
  thermal_state_valid         INTEGER NOT NULL DEFAULT 0 CHECK (thermal_state_valid IN (0,1)),
  personnel_assigned          INTEGER NOT NULL DEFAULT 0 CHECK (personnel_assigned IN (0,1)),
  containment_ready           INTEGER NOT NULL DEFAULT 0 CHECK (containment_ready IN (0,1)),
  individual_vehicle_id       TEXT NOT NULL REFERENCES IndividualVehicle(individual_vehicle_id),
  vehicle_build_id            TEXT NOT NULL REFERENCES VehicleBuild(vehicle_build_id),
  platform_configuration_id   TEXT NOT NULL,
  test_session_id             TEXT,
  activation_timestamp        TEXT,
  authorization_expiry        TEXT,
  status                      TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN
                                ('DRAFT','APPROVAL_REQUIRED','AUTHORIZED','ACTIVE','SUSPENDED','REVOKED','SUPERSEDED','EXPIRED'))
);

CREATE TABLE TestCellRequiredApprover (
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  approver_role_id            TEXT NOT NULL,
  approval_record_id          TEXT REFERENCES SignoffRecord(signoff_record_id),
  PRIMARY KEY (test_cell_authorization_id, approver_role_id)
);

CREATE TABLE TestCellAllowedFault (
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  fault_id                    TEXT NOT NULL REFERENCES FaultDefinition(fault_id),
  PRIMARY KEY (test_cell_authorization_id, fault_id)
);

CREATE TABLE AuthorizationTransition (
  authorization_transition_id TEXT PRIMARY KEY,
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  from_status                 TEXT NOT NULL,
  to_status                   TEXT NOT NULL,
  transition_reason           TEXT,
  actor_identity              TEXT NOT NULL,
  timestamp                   TEXT NOT NULL,
  signature_record            TEXT REFERENCES SignoffRecord(signoff_record_id)
);

CREATE TABLE AuthorizationTransitionEvidence (
  authorization_transition_id TEXT NOT NULL REFERENCES AuthorizationTransition(authorization_transition_id),
  artifact_id                 TEXT NOT NULL REFERENCES DocumentArchive(document_archive_id),
  PRIMARY KEY (authorization_transition_id, artifact_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Execution + results (RC-406/407/416) — one authorization : many executions;
-- one execution : one signed result (revisions append, never overwrite).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE TestSession (
  test_session_id             TEXT PRIMARY KEY,
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  individual_vehicle_id       TEXT NOT NULL REFERENCES IndividualVehicle(individual_vehicle_id),
  description                 TEXT,
  status                      TEXT NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE TestExecution (
  test_execution_id           TEXT PRIMARY KEY,
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  test_session_id             TEXT NOT NULL REFERENCES TestSession(test_session_id),
  procedure_revision          TEXT,
  attempt_number              INTEGER NOT NULL,
  execution_status            TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (execution_status IN
                                ('NOT_STARTED','PENDING','EXECUTING','EXECUTED','ABORTED','COMPLETED')),
  start_timestamp             TEXT,
  end_timestamp               TEXT,
  operator_id                 TEXT,
  telemetry_packet_id         TEXT REFERENCES TelemetryLog(telemetry_log_id),
  abort_reason_id             TEXT
);

CREATE TABLE TestResult (
  test_result_id              TEXT PRIMARY KEY,
  test_execution_id           TEXT NOT NULL REFERENCES TestExecution(test_execution_id),
  attempt_number              INTEGER NOT NULL,
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  procedure_revision          TEXT,
  telemetry_packet_id         TEXT REFERENCES TelemetryLog(telemetry_log_id),
  execution_start             TEXT,
  execution_end               TEXT,
  result_status               TEXT NOT NULL CHECK (result_status IN
                                ('NOT_ELIGIBLE','NEEDS_REVIEW','INVALID_TEST','SIGNED_FAIL','SIGNED_PASS')),
  signoff_record_id           TEXT REFERENCES SignoffRecord(signoff_record_id),
  applicability_status        TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (applicability_status IN
                                ('ACTIVE','INVALIDATED_BY_CONFIGURATION_CHANGE','DEPRECATED')),
  superseded_by_result_id     TEXT REFERENCES TestResult(test_result_id)
);

CREATE TABLE TestResultAnnotation (
  test_result_annotation_id   TEXT PRIMARY KEY,
  test_result_id              TEXT NOT NULL REFERENCES TestResult(test_result_id),
  annotation_type             TEXT NOT NULL CHECK (annotation_type IN
                                ('ANNOTATION','SUPERSESSION','APPLICABILITY_CHANGE','IMPACT_REVIEW')),
  body                        TEXT,
  actor_identity              TEXT NOT NULL,
  timestamp                   TEXT NOT NULL
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Faults (RC-363/380/381/394/395/405)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE FaultExecutionAuthorization (
  fault_execution_authorization_id TEXT PRIMARY KEY,
  fault_id                    TEXT NOT NULL REFERENCES FaultDefinition(fault_id),
  execution_domain            TEXT NOT NULL CHECK (execution_domain IN
                                ('SIL_ONLY','HIL_ONLY','STATIC_VEHICLE_ONLY','LIFTED_WHEEL_ONLY',
                                 'LOWEST_MOVING_CELL_ALLOWED','HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS')),
  injection_method            TEXT,
  injection_fixture_id        TEXT,
  previous_domain_signed_result_id TEXT REFERENCES TestResult(test_result_id),
  hazard_analysis_id          TEXT NOT NULL REFERENCES HazardAnalysis(hazard_analysis_id),
  configuration_packet_id     TEXT NOT NULL REFERENCES ConfigurationPacket(configuration_packet_id),
  test_cell_authorization_id  TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  runout_calculations_id      TEXT REFERENCES RunoutCalculations(runout_calculations_id),
  expected_response           TEXT,
  containment_method          TEXT,
  required_approvers_group_id TEXT,
  procedure_revision          TEXT,
  procedure_approval_status   TEXT NOT NULL DEFAULT 'DRAFT' CHECK (procedure_approval_status IN ('DRAFT','APPROVED')),
  execution_status            TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (execution_status IN
                                ('NOT_STARTED','PENDING','EXECUTING','EXECUTED','ABORTED','COMPLETED')),
  result_signoff_status       TEXT NOT NULL DEFAULT 'NEEDS_REVIEW' CHECK (result_signoff_status IN
                                ('NEEDS_REVIEW','INVALID_TEST','SIGNED_FAIL','SIGNED_PASS')),
  authorization_expiry        TEXT,
  configuration_impact_status TEXT NOT NULL DEFAULT 'VALID' CHECK (configuration_impact_status IN
                                ('VALID','INVALIDATED_FOR_CURRENT_CONFIGURATION')),
  supersession_id             TEXT REFERENCES FaultExecutionAuthorization(fault_execution_authorization_id),
  status                      TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN
                                ('DRAFT','APPROVAL_REQUIRED','AUTHORIZED','ACTIVE','SUSPENDED','REVOKED','SUPERSEDED','EXPIRED'))
);

CREATE TABLE FaultAuthorizationAbortCondition (
  fault_execution_authorization_id TEXT NOT NULL REFERENCES FaultExecutionAuthorization(fault_execution_authorization_id),
  abort_condition_id          TEXT NOT NULL,
  PRIMARY KEY (fault_execution_authorization_id, abort_condition_id)
);

CREATE TABLE PairedFaultAuthorization (
  paired_fault_authorization_id TEXT PRIMARY KEY,
  hazard_analysis_id          TEXT NOT NULL REFERENCES HazardAnalysis(hazard_analysis_id),
  allowed_execution_domain    TEXT NOT NULL CHECK (allowed_execution_domain IN
                                ('SIL_ONLY','HIL_ONLY','STATIC_VEHICLE_ONLY','LIFTED_WHEEL_ONLY',
                                 'LOWEST_MOVING_CELL_ALLOWED','HIGHER_CELL_ALLOWED_AFTER_SIGNED_PASS')),
  active_test_cell_id         TEXT NOT NULL REFERENCES TestCellAuthorization(test_cell_authorization_id),
  injection_fixture_id        TEXT,
  -- review_73 pt 20: fault ids reference the FaultDefinition registry;
  -- component ids reference the vehicle-component registry (RC-405).
  fault_1_id                  TEXT NOT NULL REFERENCES FaultDefinition(fault_id),
  fault_1_component_id        TEXT REFERENCES VehicleComponentInstance(component_id),
  fault_2_id                  TEXT NOT NULL REFERENCES FaultDefinition(fault_id),
  fault_2_component_id        TEXT REFERENCES VehicleComponentInstance(component_id),
  target_injection_order      TEXT NOT NULL CHECK (target_injection_order IN ('FAULT_1_THEN_FAULT_2','FAULT_2_THEN_FAULT_1')),
  inter_fault_timing_offset_ms REAL,
  expected_response_sequence_map_id TEXT REFERENCES DocumentArchive(document_archive_id),
  primary_driver_abort_method TEXT,
  independent_containment_boundary_id TEXT,
  runout_validity_confirmation INTEGER NOT NULL DEFAULT 0 CHECK (runout_validity_confirmation IN (0,1)),
  thermal_state_confirmation  INTEGER NOT NULL DEFAULT 0 CHECK (thermal_state_confirmation IN (0,1)),
  procedure_revision          TEXT,
  procedure_approval_status   TEXT NOT NULL DEFAULT 'DRAFT' CHECK (procedure_approval_status IN ('DRAFT','APPROVED')),
  execution_status            TEXT NOT NULL DEFAULT 'NOT_STARTED' CHECK (execution_status IN
                                ('NOT_STARTED','PENDING','EXECUTING','EXECUTED','ABORTED','COMPLETED')),
  result_signoff_status       TEXT NOT NULL DEFAULT 'NOT_ELIGIBLE' CHECK (result_signoff_status IN
                                ('NOT_ELIGIBLE','NEEDS_REVIEW','INVALID_TEST','SIGNED_FAIL','SIGNED_PASS')),
  authorization_expiry        TEXT,
  configuration_impact_status TEXT NOT NULL DEFAULT 'VALID' CHECK (configuration_impact_status IN
                                ('VALID','INVALIDATED_FOR_CURRENT_CONFIGURATION')),
  replacement_or_supersession_id TEXT REFERENCES PairedFaultAuthorization(paired_fault_authorization_id),
  configuration_packet_hash   TEXT,
  common_cause_failure_assessment_id TEXT
);

-- review_73 pt 15: DB-level defence-in-depth — at most one ACTIVE cell per
-- (vehicle, subgate, session). A partial UNIQUE index enforces it for non-NULL
-- sessions; the service check (assertSingleActive) also covers the NULL-session case.
CREATE UNIQUE INDEX ux_single_active_cell
  ON TestCellAuthorization (individual_vehicle_id, subgate_id, test_session_id)
  WHERE status = 'ACTIVE' AND test_session_id IS NOT NULL;

-- Join indexes (review_73 §3.4 parity)
CREATE INDEX idx_dist_comp_calc ON DistanceComponent(runout_calculations_id);
CREATE INDEX idx_runout_agg_calc ON RunoutAggregationResult(runout_calculations_id);
CREATE INDEX idx_test_result_exec ON TestResult(test_execution_id);
CREATE INDEX idx_test_exec_session ON TestExecution(test_session_id);
CREATE INDEX idx_auth_transition_tca ON AuthorizationTransition(test_cell_authorization_id);
