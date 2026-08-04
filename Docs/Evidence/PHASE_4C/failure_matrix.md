# Phase 4C Failure Matrix

| Failure | Expected | Covered by |
|---|---|---|
| Unconverged refinement | `INELIGIBLE_REFINEMENT_NOT_CONVERGED` | `testUnconvergedRefinementIneligible` |
| Invalid confidence | `INELIGIBLE_INVALID_CONFIDENCE` | `testInvalidConfidenceAndNonFiniteAndDuplicateID` |
| Non-finite point | reason `NON_FINITE_POINT` | `testInvalidConfidenceAndNonFiniteAndDuplicateID` |
| Duplicate point ID | reason `DUPLICATE_POINT_ID` | `testInvalidConfidenceAndNonFiniteAndDuplicateID` |
| Coordinate / unit mismatch | `INELIGIBLE_COORDINATE_MISMATCH` | `testCoordinateMismatchIneligible` |
| Zero voxel size | invalid configuration / eligibility | `testZeroVoxelSizeRejected` |
| Voxel-count limit | `voxelLimitExceeded` | `testResourceBoundsVoxelLimit` |
| Isolated outlier | `REJECTED_ISOLATED_OUTLIER` | `testKnownOutliersRejectedAndConflictsRecorded` |
| Contradictory observations | `DEPTH_CONFLICT` + quarantine | `testKnownOutliersRejectedAndConflictsRecorded` |
| Low-confidence retained | `LOW_CONFIDENCE_RETAINED` | `testLowConfidenceRetainedExplicit` |
| Degenerate normals | `INSUFFICIENT_NEIGHBORHOOD` | `testNormalEstimationValidAndDegeneratePaths` |
| Cancellation during fusion | no sealed `output_closure.json` | `testCancellationCreatesNoSealedOutput` |
| Source mutation | fail-closed / digest change | `testSourceMutationAltersDerivedDigests` |
| Output nondeterminism | identical digests | `testDeterministicVoxelAssignmentAndReplay` |
| Orphan outputs | inventoried / present | `testAllOutputsInventoriedNoOrphans` |

Notes: fixture density is not vehicle density; fused points are `RECONSTRUCTION_ESTIMATE` only; no production mesh.
