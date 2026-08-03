# Sprint 3.3 Failure Matrix (Linux fixtures)

| Case | Expected |
|---|---|
| zero width/height depth | rejected |
| invalid row stride | rejected |
| NaN (unless NAN_SENTINEL) | rejected |
| infinity | rejected |
| truncated payload | rejected |
| artifact hash mismatch | rejected |
| calibration dimension mismatch | rejected |
| non-finite intrinsics | rejected |
| cross-epoch calibration | rejected |
| missing/wrong correlation | rejected |
| duplicate association | rejected |
| cross-epoch association | rejected |
| UNAVAILABLE_DEVICE | no depth evidence |
| NOT_REQUESTED ≠ UNAVAILABLE_DEVICE | distinct |
| activation failed | no acquisition claim |
| Apple depth on Linux | APPLE_DEPTH_SOURCE_CANDIDATE_UNCOMPILED |
