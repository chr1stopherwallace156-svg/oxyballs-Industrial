# Sprint 3.4 Failure Matrix

| Case | Expected |
|---|---|
| Full coordinated session | PACKAGED |
| Optional depth UNAVAILABLE_DEVICE | degraded sealed package |
| Optional pose interrupted | degraded sealed package |
| Required motion activation failure | FAILED, no sealed package |
| Cancellation during capture | CANCELLED, no sealed package |
| Duplicate start | rejected |
| Stop before start | cancelled without package |
| Invalid state transition | rejected |
| Sample after stop | rejected |
| Duplicate sample ID | rejected |
| Timestamp regression | rejected |
| Finalization with active adapter | rejected |
| Checkpoint recovery | no duplicate sample IDs |
