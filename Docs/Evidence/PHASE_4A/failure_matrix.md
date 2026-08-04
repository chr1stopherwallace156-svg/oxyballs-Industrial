# Phase 4A Failure Matrix

| Failure | Expected outcome | Covered by |
|---|---|---|
| Invalid package closure | `INELIGIBLE_INVALID_PACKAGE` | `testInvalidPackageClosure` |
| Missing manifest | `INELIGIBLE_INVALID_PACKAGE` | `testMissingManifest` |
| Missing camera artifact | `INELIGIBLE_INVALID_PACKAGE` | `testMissingCameraArtifact` |
| Missing depth artifact | `INELIGIBLE_INVALID_PACKAGE` | `testMissingDepthArtifact` |
| Missing pose sample/artifact | `INELIGIBLE_INVALID_PACKAGE` | `testMissingPoseSample` |
| Missing calibration | `INELIGIBLE_MISSING_CALIBRATION` | `testMissingCalibration` |
| Invalid calibration | `INELIGIBLE_MISSING_CALIBRATION` | `testInvalidCalibration` |
| Broken camera/depth association | `INELIGIBLE_BROKEN_ASSOCIATION` | `testBrokenCameraDepthAssociation` |
| Broken camera/pose association | `INELIGIBLE_BROKEN_ASSOCIATION` | `testBrokenCameraPoseAssociation` |
| Missing clock correlation | `INELIGIBLE_BROKEN_ASSOCIATION` | `testMissingClockCorrelation` |
| Stale clock correlation | `INELIGIBLE_BROKEN_ASSOCIATION` | `testStaleClockCorrelation` |
| Missing transform path | `INELIGIBLE_BROKEN_ASSOCIATION` | `testMissingTransformPath` |
| Ambiguous transform path | `INELIGIBLE_BROKEN_ASSOCIATION` | `testAmbiguousTransformPath` |
| Cross-epoch join | registration throw | `testCrossEpochRegistrationRejected` |
| Non-finite depth | invalid points | `testNonFiniteDepthRegistrationMarksInvalid` |
| Unsupported depth format | registration throw | `testUnsupportedDepthFormatRejectedByRegistration` |
| Insufficient observations | `INELIGIBLE_INSUFFICIENT_OBSERVATIONS` | `testInsufficientFrameCount` |
| All frames rejected | empty selection | `testAllFramesRejected` |
| Duplicate frame identity | reject with `DUPLICATE_FRAME` | `testDuplicateFrameIdentityRejected` |
| Privacy forbids reconstruction | `INELIGIBLE_PRIVACY_POLICY` | `testPrivacyPolicyForbidsReconstruction` |
| Source artifact mutation | `INELIGIBLE_INVALID_PACKAGE` | `testSourcePayloadMutationChangesReconstructionOutput` |
| Lineage metadata mutation | digest change | `testMetadataMutationChangesLineageDigest` |
| Deterministic replay mismatch | identical digests | `testDeterministicReplayIdentical` |

Notes: fixture thresholds are `DETERMINISTIC_TEST_FIXTURE` / `NO_SYSTEM_TOLERANCE_ASSIGNED`. Not engineering metrology.
