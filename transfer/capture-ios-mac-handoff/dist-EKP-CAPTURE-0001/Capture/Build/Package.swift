// swift-tools-version: 5.9
import PackageDescription

/// Foundation + Phase 1 still-capture runtime for elektron-capture-ios.
/// Hardware adapters beyond Phase 1 remain scaffolding (README-only) until their phase.
let package = Package(
  name: "ElektronCapture",
  platforms: [
    .iOS(.v16),
    .macOS(.v13),
  ],
  products: [
    .library(name: "ElektronCapture", targets: ["ElektronCapture"]),
  ],
  targets: [
    .target(
      name: "ElektronCapture",
      path: "App",
      exclude: [
        "UI",
        "Capture/DepthCapture",
        "Capture/PhotoCaptureCoordinator",
        "Capture/OriginalArtifactWriter",
        "Capture/README.md",
        "Capture/AVFoundation/README.md",
        "Spatial",
        "Motion",
        "Calibration",
        "Quality",
        "Provenance/SecureEnclave",
        "Provenance/AppAttest",
        "Provenance/ManifestSigner",
        "Storage/LocalEvidenceStore",
        "Storage/UploadQueue",
        "Storage/Recovery",
      ]
    ),
    .testTarget(
      name: "ElektronCaptureTests",
      dependencies: ["ElektronCapture"],
      path: "Tests/Unit",
      resources: [
        .copy("Fixtures"),
      ]
    ),
    .testTarget(
      name: "ElektronCaptureGoldenTests",
      dependencies: ["ElektronCapture"],
      path: "Tests/GoldenFiles"
    ),
  ]
)
