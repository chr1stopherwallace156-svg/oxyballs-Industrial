import Foundation

/// CLI exit-code taxonomy (spec §7). System execution status is separate from
/// engineering policy outcomes (which live inside the JSON report, never the exit code).
public enum Phase4EExitCode: Int32, Sendable {
  case executionSuccess = 0
  case inputSchemaInvalid = 10
  case inputHashMismatch = 11
  case referenceIntegrityFailure = 12
  case controlDependencyInvalid = 20
  case calibrationEvidenceInvalid = 21
  case datumUnresolved = 30
  case scaleUnresolved = 31
  case uncertaintyModelInvalid = 40
  case numericalFailure = 41
  case policySchemaInvalid = 50
  case outputWriteFailure = 60
}
