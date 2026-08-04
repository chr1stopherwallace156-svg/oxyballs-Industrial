// swift-tools-version: 5.9
// AUTHORED, NOT COMPILED on the authoring host (no Swift toolchain). Build/test on a
// Swift host: `swift build && swift test`. Pure Foundation — no Apple UI/AR frameworks.
import PackageDescription

let package = Package(
  name: "ElektronPhase4E",
  targets: [
    .target(name: "Phase4EContracts"),
    .target(name: "Phase4ECore", dependencies: ["Phase4EContracts"]),
    .executableTarget(name: "Phase4ECLI", dependencies: ["Phase4EContracts", "Phase4ECore"]),
    .testTarget(name: "Phase4EContractTests", dependencies: ["Phase4EContracts", "Phase4ECore"]),
  ]
)
