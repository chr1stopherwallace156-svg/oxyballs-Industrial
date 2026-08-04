import Foundation

/// Phase4EInput — decodes the hardened `phase_4e_input.v1.0.0.schema.json`.
/// (JSON-Schema `additionalProperties:false` is enforced by the companion schema check;
/// Codable focuses on typed structure for the semantic validators.)
public struct Phase4EInput: Codable, Equatable, Sendable {
  public let schemaVersion: String
  public let sourcePhase4D: SourcePhase4D
  public let device: Device
  public let declaredOperatingEnvelope: OperatingEnvelope
  public let scaleAnchors: [ScaleAnchor]
  public let datums: [Datum]
  public let physicalControls: [PhysicalControl]
  public let manualMeasurements: [ManualMeasurement]

  enum CodingKeys: String, CodingKey {
    case schemaVersion = "schema_version"
    case sourcePhase4D = "source_phase_4d"
    case device
    case declaredOperatingEnvelope = "declared_operating_envelope"
    case scaleAnchors = "scale_anchors"
    case datums
    case physicalControls = "physical_controls"
    case manualMeasurements = "manual_measurements"
  }

  public struct SourcePhase4D: Codable, Equatable, Sendable {
    public let surfaceID: String
    public let canonicalMeshSHA256: String
    public let phase4DOutputClosureSHA256: String
    public let phase4DAlgorithmID: String
    public let phase4DConfigurationDigest: String
    enum CodingKeys: String, CodingKey {
      case surfaceID = "surface_id"
      case canonicalMeshSHA256 = "canonical_mesh_sha256"
      case phase4DOutputClosureSHA256 = "phase_4d_output_closure_sha256"
      case phase4DAlgorithmID = "phase_4d_algorithm_id"
      case phase4DConfigurationDigest = "phase_4d_configuration_digest"
    }
  }

  public struct Device: Codable, Equatable, Sendable {
    public let manufacturer, modelIdentifier, marketingName, osVersion, sensorProfileID, calibrationProfileID: String
    enum CodingKeys: String, CodingKey {
      case manufacturer, osVersion = "os_version"
      case modelIdentifier = "model_identifier", marketingName = "marketing_name"
      case sensorProfileID = "sensor_profile_id", calibrationProfileID = "calibration_profile_id"
    }
  }

  public struct OperatingEnvelope: Codable, Equatable, Sendable {
    public let envelopeID: String
    public let workingDistanceRangeMeters: [Double]
    public let ambientLuxRange: [Double]
    public let maxIncidenceAngleDeg: Double
    enum CodingKeys: String, CodingKey {
      case envelopeID = "envelope_id"
      case workingDistanceRangeMeters = "working_distance_range_meters"
      case ambientLuxRange = "ambient_lux_range"
      case maxIncidenceAngleDeg = "max_incidence_angle_deg"
    }
  }

  public enum AnchorType: String, Codable, Sendable {
    case calibrationBar = "CALIBRATION_BAR"
    case distributedTargetArray = "DISTRIBUTED_TARGET_ARRAY"
    case intrinsicSensorScale = "INTRINSIC_SENSOR_SCALE"
  }

  public struct NominalFeature: Codable, Equatable, Sendable {
    public let featureID: String
    public let positionMM: [Double]
    public let standardUncertaintyMM: [Double]
    enum CodingKeys: String, CodingKey {
      case featureID = "feature_id", positionMM = "position_mm", standardUncertaintyMM = "standard_uncertainty_mm"
    }
  }

  public struct ScaleAnchor: Codable, Equatable, Sendable {
    public let anchorID: String
    public let anchorType: AnchorType
    public let calibrationCertificateID: String?
    public let calibrationState: String?
    public let validUntil: String?
    public let sensorProfileID: String?
    public let deviceCalibrationState: String?
    public let nominalFeatures: [NominalFeature]?
    enum CodingKeys: String, CodingKey {
      case anchorID = "anchor_id", anchorType = "anchor_type"
      case calibrationCertificateID = "calibration_certificate_id", calibrationState = "calibration_state"
      case validUntil = "valid_until", sensorProfileID = "sensor_profile_id"
      case deviceCalibrationState = "device_calibration_state", nominalFeatures = "nominal_features"
    }
  }

  public struct Datum: Codable, Equatable, Sendable {
    public let datumID: String
    public let referenceFeatures: [String]
    enum CodingKeys: String, CodingKey { case datumID = "datum_id", referenceFeatures = "reference_features" }
  }

  public enum ControlUseRole: String, Codable, Sendable {
    case fittingOnly = "FITTING_ONLY", validationOnly = "VALIDATION_ONLY", excluded = "EXCLUDED"
  }

  public struct PhysicalControl: Codable, Equatable, Sendable {
    public let controlID, featureAID, featureBID: String
    public let measuredAt: String
    public let useRole: ControlUseRole
    enum CodingKeys: String, CodingKey {
      case controlID = "control_id", featureAID = "feature_a_id", featureBID = "feature_b_id"
      case measuredAt = "measured_at", useRole = "use_role"
    }
  }

  public struct ManualMeasurement: Codable, Equatable, Sendable {
    public let measurementID, featureAID, featureBID, regionID, measuredAt: String
    enum CodingKeys: String, CodingKey {
      case measurementID = "measurement_id", featureAID = "feature_a_id", featureBID = "feature_b_id"
      case regionID = "region_id", measuredAt = "measured_at"
    }
  }
}
