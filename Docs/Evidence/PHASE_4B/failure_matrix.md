# Phase 4B Failure Matrix

| Failure | Expected | Covered by |
|---|---|---|
| Missing feature descriptor | match reject `MISSING_DESCRIPTOR` | `testMissingFeatureDescriptorRejected` |
| Non-finite descriptor | match reject `NON_FINITE_DESCRIPTOR` | `testNonFiniteDescriptorRejected` |
| Unsupported descriptor format | match reject `UNSUPPORTED_DESCRIPTOR_FORMAT` | `testUnsupportedDescriptorFormatRejected` |
| Ambiguous / ratio / mutual rejection | deterministic reject | `testAmbiguousAndRatioAndMutualRejection` |
| Geometric outlier | outlier set | `testGeometricOutlierRejection` |
| Cross-epoch matching | `CROSS_EPOCH_MATCH` | `testCrossEpochMatchingRejected` |
| Cross-session matching | `CROSS_SESSION_MATCH` | `testCrossSessionMatchingRejected` |
| Contradictory track merge | `CONTRADICTORY_MERGE` | `testContradictoryFeatureTrackMerge` |
| Disconnected pose graph | validation fail | `testInvalidAndDisconnectedPoseGraph` |
| Insufficient constraints | `INSUFFICIENT_CONSTRAINTS`, no refined graph | `testInsufficientConstraintsNoRefinedPose` |
| Divergence / forced failure | no refined pose | `testForcedDivergenceEmitsNoRefinedPose` |
| Source package mutation | ingest ineligible | `testSourceMutationAltersDerivedDigests` |
| Source pose immutability | proof true | `testSourcePosesRemainUnchanged` |
| Output nondeterminism | identical digests | `testDeterministicReplayIdentical` |
| Orphan outputs | inventoried | `testAllOutputsInventoriedNoOrphans` |

Notes: fixture convergence is not production photogrammetry; refined poses are `RECONSTRUCTION_ESTIMATE` only.
