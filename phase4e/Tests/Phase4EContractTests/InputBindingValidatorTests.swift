import XCTest
@testable import Phase4EContracts
@testable import Phase4ECore

/// Mirrors the reference-oracle fixtures. Expected exit codes are the behavioral contract.
final class InputBindingValidatorTests: XCTestCase {
  func decode(_ name: String) throws -> Phase4EInput {
    let url = URL(fileURLWithPath: "fixtures/\(name)")
    return try JSONDecoder().decode(Phase4EInput.self, from: Data(contentsOf: url))
  }
  func testNominalIsClean() throws {
    let r = InputBindingValidator().validate(try decode("FIX-4E-01_nominal.input.json"))
    XCTAssertEqual(r.code, .executionSuccess)
  }
  func testCircularControlBlocks20() throws {
    let r = InputBindingValidator().validate(try decode("FIX-4E-05_circular_control.input.json"))
    XCTAssertEqual(r.code, .controlDependencyInvalid)
  }
  func testExpiredCalibrationBlocks21() throws {
    let r = InputBindingValidator().validate(try decode("FIX-4E-14_expired_cal.input.json"))
    XCTAssertEqual(r.code, .calibrationEvidenceInvalid)
  }
  func testUnresolvedFeatureBlocks12() throws {
    let r = InputBindingValidator().validate(try decode("FIX-4E-12ref_unresolved.input.json"))
    XCTAssertEqual(r.code, .referenceIntegrityFailure)
  }
  func testHashMismatchBlocks11() throws {
    let r = InputBindingValidator().validate(try decode("FIX-4E-01_nominal.input.json"),
                                             expectedMeshSHA256: String(repeating: "b", count: 64))
    XCTAssertEqual(r.code, .inputHashMismatch)
  }
}
