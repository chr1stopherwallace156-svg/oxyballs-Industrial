# Sprint 3.5 Failure Matrix

| Case | Expected |
|---|---|
| Full guided capture | SUFFICIENT_FOR_PACKAGE_FINALIZATION |
| Missing required region | CONTINUE_CAPTURE + RETURN_TO_REGION |
| Persistent severe blur | RECAPTURE_REQUIRED |
| Required stream failure | FAILED_REQUIRED_POLICY |
| Optional depth unavailable | DEPTH_UNAVAILABLE; may complete |
| Tracking degradation | TRACKING_DEGRADED |
| Storage pressure | STORAGE_PRESSURE; PAUSE_AND_RECOVER |
| Cancellation | CANCELLED; no sealed package |
| Conflicting guidance | deterministic priority; no duplicate ACTIVE |
| Non-finite quality value | rejected |
| Cross-session / cross-epoch coverage | rejected |
| Engineering-completeness language | forbidden |
