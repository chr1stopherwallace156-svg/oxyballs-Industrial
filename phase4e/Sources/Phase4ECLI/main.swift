import Foundation
import Phase4EContracts
import Phase4ECore

// phase4e input-validate <input.json> [--expect-mesh-sha256 <hex>]
// Prints findings; exits with the taxonomy code. Engineering outcomes are NOT expressed
// via exit codes — only system-execution status is.
let args = CommandLine.arguments
guard args.count >= 2 else {
  FileHandle.standardError.write(Data("usage: phase4e input-validate <input.json> [--expect-mesh-sha256 <hex>]\n".utf8))
  exit(2)
}
let inputPath = args[1]
var expected: String? = nil
if let i = args.firstIndex(of: "--expect-mesh-sha256"), i + 1 < args.count { expected = args[i + 1] }

do {
  let data = try Data(contentsOf: URL(fileURLToPath: inputPath))
  let input = try JSONDecoder().decode(Phase4EInput.self, from: data)
  let (code, findings) = InputBindingValidator().validate(input, expectedMeshSHA256: expected)
  for f in findings { print("  EXIT_\(f.code.rawValue) \(f.message)") }
  print(code == .executionSuccess ? "RESULT: EXECUTION_SUCCESS (exit 0)" : "RESULT: BLOCKED (exit \(code.rawValue))")
  exit(code.rawValue)
} catch {
  // Decode failure ≈ schema-invalid at this layer (companion JSON-Schema check is authoritative).
  FileHandle.standardError.write(Data("INPUT_SCHEMA_INVALID: \(error)\n".utf8))
  exit(Phase4EExitCode.inputSchemaInvalid.rawValue)
}

private extension URL { init(fileURLToPath p: String) { self = URL(fileURLWithPath: p) } }
