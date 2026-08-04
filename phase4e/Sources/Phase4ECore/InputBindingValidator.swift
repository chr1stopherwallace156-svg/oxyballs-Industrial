import Foundation
import Phase4EContracts

/// Tier-1A semantic & referential integrity validator. Mirrors the runnable reference
/// oracle (bin/phase4e-input-oracle.mjs), which is the byte-for-byte behavioral spec.
/// Read-only; never mutates Phase 4D geometry.
public struct InputBindingValidator {
  public struct Finding: Equatable { public let code: Phase4EExitCode; public let message: String }
  public init() {}

  private func iso(_ s: String) -> Date? { ISO8601DateFormatter().date(from: s) }

  /// Returns the first (lowest, most fundamental) blocking exit code, or executionSuccess.
  public func validate(_ input: Phase4EInput, expectedMeshSHA256: String? = nil) -> (code: Phase4EExitCode, findings: [Finding]) {
    var findings: [Finding] = []

    // 11: hash mismatch (only if an expected mesh sha is supplied)
    if let expect = expectedMeshSHA256, input.sourcePhase4D.canonicalMeshSHA256 != expect {
      findings.append(.init(code: .inputHashMismatch, message: "canonical_mesh_sha256 != expected"))
    }

    // declared feature sources = anchor nominal_features + datum reference_features
    var features = Set<String>()
    for a in input.scaleAnchors { for nf in a.nominalFeatures ?? [] { features.insert(nf.featureID) } }
    for d in input.datums { for f in d.referenceFeatures { features.insert(f) } }

    // uniqueness (anchor/datum/control/measurement)
    func firstDuplicate(_ ids: [String]) -> String? {
      var seen = Set<String>(); for i in ids { if seen.contains(i) { return i }; seen.insert(i) }; return nil
    }
    for (label, ids) in [("anchor", input.scaleAnchors.map { $0.anchorID }),
                         ("datum", input.datums.map { $0.datumID }),
                         ("control", input.physicalControls.map { $0.controlID }),
                         ("measurement", input.manualMeasurements.map { $0.measurementID })] {
      if let dup = firstDuplicate(ids) {
        findings.append(.init(code: .referenceIntegrityFailure, message: "duplicate \(label) id: \(dup)"))
      }
    }

    // 12: referential resolution — control feature refs must resolve to declared features
    for c in input.physicalControls {
      for f in [c.featureAID, c.featureBID] where !features.contains(f) {
        findings.append(.init(code: .referenceIntegrityFailure, message: "unresolved feature ref \(c.controlID):\(f)"))
      }
    }

    // 20: circular control — a fitting feature-pair must not also be a validation feature-pair
    func pairKey(_ a: String, _ b: String) -> String { [a, b].sorted().joined(separator: "|") }
    let fittingPairs = Set(input.physicalControls.filter { $0.useRole == .fittingOnly }.map { pairKey($0.featureAID, $0.featureBID) })
    let validationPairs = Set(input.physicalControls.filter { $0.useRole == .validationOnly }.map { pairKey($0.featureAID, $0.featureBID) })
    for p in fittingPairs where validationPairs.contains(p) {
      findings.append(.init(code: .controlDependencyInvalid, message: "fitting pair reused for validation: \(p)"))
    }

    // 21: calibration evidence — non-intrinsic anchors must be valid at latest capture time
    let captureDates = (input.physicalControls.map { $0.measuredAt } + input.manualMeasurements.map { $0.measuredAt })
      .compactMap(iso)
    let latestCapture = captureDates.max()
    for a in input.scaleAnchors where a.anchorType != .intrinsicSensorScale {
      if a.calibrationState == "EXPIRED" {
        findings.append(.init(code: .calibrationEvidenceInvalid, message: "\(a.anchorID) EXPIRED"))
      } else if let cap = latestCapture, let vu = a.validUntil.flatMap(iso), vu < cap {
        findings.append(.init(code: .calibrationEvidenceInvalid, message: "\(a.anchorID) valid_until < capture"))
      }
    }

    let code = findings.map { $0.code.rawValue }.filter { $0 > 0 }.min().map { Phase4EExitCode(rawValue: $0)! } ?? .executionSuccess
    return (code, findings)
  }
}
