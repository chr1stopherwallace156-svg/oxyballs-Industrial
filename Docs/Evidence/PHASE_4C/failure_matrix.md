# Phase 4C Failure Matrix

| Failure | Expected | Covered by |
|---|---|---|
| Unconverged refinement | `INELIGIBLE_REFINEMENT_NOT_CONVERGED` | `testUnconvergedRefinementIneligible` |
| Invalid confidence / non-finite / duplicate ID | eligibility reasons | `testInvalidConfidenceAndNonFiniteAndDuplicateID` |
| Coordinate / unit mismatch | `INELIGIBLE_COORDINATE_MISMATCH` | `testCoordinateMismatchIneligible` |
| Zero voxel size | invalid configuration | `testZeroVoxelSizeRejected` |
| Voxel-count limit | `voxelLimitExceeded` | `testResourceBoundsVoxelLimit` |
| Isolated outlier (k-NN) | `REJECTED_ISOLATED_OUTLIER` | `testKnownOutliersRejectedAndConflictsRecorded` |
| Contradictory observations | `DEPTH_CONFLICT` + quarantine | `testKnownOutliersRejectedAndConflictsRecorded` |
| Low-confidence retained | `LOW_CONFIDENCE_RETAINED` | `testLowConfidenceRetainedExplicit` |
| Degenerate / insufficient normals | PCA validity classes | `testNormalEstimationValidAndDegeneratePaths`, `testPCADegenerateCollinearNeighborhood` |
| Angle weight unavailable | neutral factor when policy allows | `testWeightFormulaUsesDepthPoseAngleGamma` |
| Cancellation during fusion | no sealed closure | `testCancellationCreatesNoSealedOutput` |
| Source mutation | fail-closed | `testSourceMutationAltersDerivedDigests` |
| Replay nondeterminism | identical digests | `testDeterministicVoxelAssignmentAndReplay` |
| Missing fixture truth | `fixture_truth.json` verified | `testFixtureTruthFileLoadedAndVerified` |
| Broken lineage | 100% source ID map | `testLineageCompletenessAllFusedPointsMapToSources` |

Notes: fixture density ≠ vehicle density; fused points are `RECONSTRUCTION_ESTIMATE` only; no production mesh.
